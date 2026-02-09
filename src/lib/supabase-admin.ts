import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// WARNING: This key allows bypassing RLS. Never expose to client!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  // Warn but don't crash immediately, though operations will fail
  console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will fail.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
