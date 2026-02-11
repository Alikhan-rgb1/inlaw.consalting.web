import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get User ID
  let userId = (session.user as any).id;
  if (!userId) {
     const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', session.user.email)
      .single();
     if (profile) userId = profile.id;
  }

  if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
      const body = await request.json();
      const { formData } = body;

      const { data, error } = await supabaseAdmin
          .from('applications')
          .insert({
              user_id: userId,
              status: 'In Progress', // Default status is now 'In Progress'
              form_data: formData
          })
          .select()
          .single();
      
      if (!error) {
         // Also update profile status to In Progress
         await supabaseAdmin
            .from('profiles')
            .update({ case_status: 'In Progress' })
            .eq('id', userId);
      }

      if (error) throw error;

      return NextResponse.json({ success: true, application: data });
  } catch (error: any) {
      console.error('Create Application Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    // Get User ID
    let userId = (session.user as any).id;
    if (!userId) {
        const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', session.user.email)
        .single();
        if (profile) userId = profile.id;
    }

    try {
        const { error } = await supabaseAdmin
            .from('applications')
            .delete()
            .eq('id', id)
            .eq('user_id', userId); // Ensure user owns the application

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Delete Application Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
