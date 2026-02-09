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

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename and path
    // Path: email/docId_timestamp.ext
    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.email}/${docId}_${Date.now()}.${fileExt}`;

    // Upload using Admin client (bypasses RLS)
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

    // Insert record into documents table
    // We need user ID. Since we are in an API route with admin access, we can get it from session or query profiles.
    // authOptions session callback usually puts user id in session.user.id
    let userId = (session.user as any).id;

    // Fallback: If userId is missing in session (sometimes happens), fetch from profiles by email
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
                status: 'Uploaded'
            });
        
        if (dbError) {
            console.error('Database insert error:', dbError);
            // If the error is foreign key violation, it means profile doesn't exist
            if (dbError.code === '23503') { // foreign_key_violation
                 // Try to create a profile on the fly (auto-healing)
                 await supabaseAdmin.from('profiles').insert({
                     id: userId,
                     email: session.user.email,
                     full_name: session.user.name || 'Unknown',
                     role: 'client'
                 });
                 // Retry insert
                 await supabaseAdmin.from('documents').insert({
                    user_id: userId,
                    file_name: file.name,
                    file_path: data.path,
                    doc_type: docId,
                    status: 'Uploaded'
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
