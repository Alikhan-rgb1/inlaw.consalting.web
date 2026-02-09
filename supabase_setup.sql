-- 1. Create table if it doesn't exist
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  company_name text,
  phone text,
  country text,
  role text default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- 2. Add missing columns safely (if table existed but was different)
do $$
begin
  -- Check and add company_name
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'company_name') then
    alter table public.profiles add column company_name text;
  end if;

  -- Check and add phone
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'phone') then
    alter table public.profiles add column phone text;
  end if;

  -- Check and add country
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'country') then
    alter table public.profiles add column country text;
  end if;
  
  -- Check and add role
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'role') then
    alter table public.profiles add column role text default 'client';
  end if;
end $$;

-- 3. Enable RLS (safe to run multiple times)
alter table public.profiles enable row level security;

-- 4. Re-create policies (Drop first to avoid "policy already exists" errors)
drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- 5. Create or Replace the Function (handles updates if function changed)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company_name, phone, country, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  )
  -- If profile already exists, update it with new data
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    company_name = excluded.company_name,
    phone = excluded.phone,
    country = excluded.country;
  return new;
end;
$$;

-- 6. Re-create Trigger (Drop first to avoid "trigger already exists" errors)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
