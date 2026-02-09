const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = 'admin@gmail.com';
  const password = 'inlawconsulting2026';

  console.log(`Creating admin user: ${email}...`);

  // 1. Create user in Auth
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: 'Super Admin',
      company_name: 'InLaw Consulting',
      role: 'admin' // Important: Set role to admin immediately
    }
  });

  if (error) {
    console.error('Error creating user:', error.message);
    return;
  }

  console.log('User created successfully:', user.user.id);

  // 2. Ensure profile exists and has admin role (in case trigger missed it or to be double sure)
  // The trigger 'on_auth_user_created' should handle this, but we can update explicitly to be safe.
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.user.id);

  if (profileError) {
    console.error('Error updating profile role:', profileError.message);
  } else {
    console.log('Profile role updated to admin.');
  }

  console.log('\nDone! You can now login with:');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

createAdminUser();
