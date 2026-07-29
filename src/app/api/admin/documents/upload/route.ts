import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const applicationId = formData.get('applicationId') as string;
    const label = formData.get('label') as string;

    if (!file || !userId || !applicationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: client } = await supabaseAdmin
      .from('profiles')
      .select('email, office')
      .eq('id', userId)
      .single();

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split('.').pop();
    const office = client.office || 'dubai';
    const fileName = `${office}/${client.email}/admin/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('client-documents')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Admin upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: docRow, error: dbError } = await supabaseAdmin
      .from('documents')
      .insert({
        user_id: userId,
        application_id: applicationId,
        file_name: label || file.name,
        file_path: uploadData.path,
        doc_type: 'admin_result',
        status: 'Uploaded',
        office,
        uploaded_by: 'admin',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Admin document DB insert error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, document: docRow });
  } catch (error: any) {
    console.error('Admin upload handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
