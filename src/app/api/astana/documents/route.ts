import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
        return NextResponse.json({ documents: [], profile: null });
    }

    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('full_name, company_name, email, case_status')
        .eq('id', userId)
        .single();

    const { data: documents, error } = await supabaseAdmin
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .eq('office', 'astana')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching documents in API:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: applications } = await supabaseAdmin
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .eq('office', 'astana')
        .order('created_at', { ascending: false });

    return NextResponse.json({
        documents: documents || [],
        profile: profile || null,
        applications: applications || []
    });

  } catch (error: any) {
    console.error('Documents API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
