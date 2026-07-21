import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const docId = formData.get('docId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = file.name.split('.').pop();
    // Namespaced under astana/ so it doesn't collide with the Dubai office's files in the same bucket
    const fileName = `astana/${session.user.email}/${docId}_${Date.now()}.${fileExt}`;

    const { data, error } = await supabaseAdmin
      .storage
      .from('client-documents')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let userId = (session.user as any).id;

    if (!userId) {
        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', session.user.email)
            .single();
        if (profile) {
            userId = profile.id;
        }
    }

    if (userId) {
        const { error: dbError } = await supabaseAdmin
            .from('documents')
            .insert({
                user_id: userId,
                file_name: file.name,
                file_path: data.path,
                doc_type: docId,
                status: 'Uploaded',
                office: 'astana'
            });

        if (dbError) {
            console.error('Database insert error:', dbError);
            if (dbError.code === '23503') {
                 await supabaseAdmin.from('profiles').insert({
                     id: userId,
                     email: session.user.email,
                     full_name: session.user.name || 'Unknown',
                     role: 'client',
                     office: 'astana'
                 });
                 await supabaseAdmin.from('documents').insert({
                    user_id: userId,
                    file_name: file.name,
                    file_path: data.path,
                    doc_type: docId,
                    status: 'Uploaded',
                    office: 'astana'
                });
            }
        }
    } else {
        console.error("Could not find User ID for email:", session.user.email);
    }

    return NextResponse.json({ success: true, path: data.path });

  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
