-- MASTER FIX SCRIPT
-- Run this in Supabase SQL Editor

-- 1. Grant permissions to service_role (Critical for API/Admin)
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;

-- 2. Reset RLS on PROFILES
alter table public.profiles disable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Service role full access profiles" on public.profiles;

-- Profiles Policies
create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

create policy "Admins can view all profiles" 
on public.profiles for select 
using ( 
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Users can insert their own profile" 
on public.profiles for insert 
with check ( auth.uid() = id );

create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

create policy "Service role full access profiles"
on public.profiles for all
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );


-- 3. Reset RLS on DOCUMENTS (Just to be safe/sure)
alter table public.documents disable row level security;
alter table public.documents enable row level security;

drop policy if exists "Users can view own documents" on public.documents;
drop policy if exists "Users can insert own documents" on public.documents;
drop policy if exists "Admins can view all documents" on public.documents;
drop policy if exists "Admins can update all documents" on public.documents;
drop policy if exists "Service role full access documents" on public.documents;

-- Documents Policies
create policy "Users can view own documents"
on public.documents for select
using ( auth.uid() = user_id );

create policy "Users can insert own documents"
on public.documents for insert
with check ( auth.uid() = user_id );

create policy "Admins can view all documents"
on public.documents for select
using ( 
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Admins can update all documents"
on public.documents for update
using ( 
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Service role full access documents"
on public.documents for all
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );

-- 4. Check data
select count(*) as profiles_count from public.profiles;
select count(*) as documents_count from public.documents;
