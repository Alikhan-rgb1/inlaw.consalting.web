-- 1. Enable pgcrypto extension for password hashing
create extension if not exists pgcrypto;

-- 2. Define variables
do $$
declare
  new_user_id uuid := gen_random_uuid();
  user_email text := 'admin@gmail.com';
  user_password text := 'inlawconsulting2026';
begin
  -- 3. Insert into auth.users
  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) values (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Super Admin","company_name":"InLaw Consulting","role":"admin"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- 4. Insert into public.profiles (since trigger might not fire or we want to be sure)
  insert into public.profiles (
    id,
    email,
    full_name,
    company_name,
    role
  ) values (
    new_user_id,
    user_email,
    'Super Admin',
    'InLaw Consulting',
    'admin'
  )
  on conflict (id) do update set
    role = 'admin';

end $$;
