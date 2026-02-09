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

    const { docId, filePath } = await request.json();

    if (!docId || !filePath) {
      return NextResponse.json({ error: 'Missing document ID or path' }, { status: 400 });
    }

    // Verify ownership: Check if the document belongs to the current user (via email or ID)
    // We fetch the doc first to check user_id
    const { data: doc, error: fetchError } = await supabaseAdmin
        .from('documents')
        .select('user_id')
        .eq('id', docId)
        .single();

    if (fetchError || !doc) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Get current user ID (securely)
    let currentUserId = (session.user as any).id;
    if (!currentUserId) {
         const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', session.user.email)
            .single();
         if (profile) currentUserId = profile.id;
    }

    // Strict check: Only allow deletion if user owns the file OR is admin
    const isAdmin = (session.user as any).role === 'admin';
    if (doc.user_id !== currentUserId && !isAdmin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 1. Delete from Storage
    const { error: storageError } = await supabaseAdmin
        .storage
        .from('client-documents')
        .remove([filePath]);

    if (storageError) {
        console.error("Storage delete error:", storageError);
        // We continue to delete from DB even if storage fails (orphan file is better than broken UI)
        // Or we could return error. Let's return error to be safe.
        return NextResponse.json({ error: 'Failed to delete file from storage' }, { status: 500 });
    }

    // 2. Delete from Database
    const { error: dbError } = await supabaseAdmin
        .from('documents')
        .delete()
        .eq('id', docId);

    if (dbError) {
        console.error("DB delete error:", dbError);
        return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Delete API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
