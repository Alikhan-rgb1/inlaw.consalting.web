import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  
  // Check admin permissions
  if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const body = await request.json();
      const { id, status } = body;

      if (!id || !status) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      // 1. Update Application Status
      const { error: appError } = await supabaseAdmin
          .from('applications')
          .update({ status })
          .eq('id', id);

      if (appError) throw appError;

      // 2. Also update User Profile case_status for backward compatibility/dashboard display
      // First get the user_id from the application
      const { data: app } = await supabaseAdmin
        .from('applications')
        .select('user_id')
        .eq('id', id)
        .single();
        
      if (app) {
         await supabaseAdmin
            .from('profiles')
            .update({ case_status: status })
            .eq('id', app.user_id);
      }

      return NextResponse.json({ success: true });
  } catch (error: any) {
      console.error('Update Status Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}