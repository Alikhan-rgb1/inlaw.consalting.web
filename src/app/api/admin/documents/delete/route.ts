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

    const { docId } = await request.json();

    if (!docId) {
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    const { data: doc, error: fetchError } = await supabaseAdmin
      .from('documents')
      .select('file_path, uploaded_by')
      .eq('id', docId)
      .single();

    if (fetchError || !doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    if (doc.uploaded_by !== 'admin') {
      return NextResponse.json({ error: 'Only admin-uploaded documents can be removed here' }, { status: 403 });
    }

    const { error: storageError } = await supabaseAdmin
      .storage
      .from('client-documents')
      .remove([doc.file_path]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
      return NextResponse.json({ error: 'Failed to delete file from storage' }, { status: 500 });
    }

    const { error: dbError } = await supabaseAdmin
      .from('documents')
      .delete()
      .eq('id', docId);

    if (dbError) {
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin delete handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
