-- Consolidated Supabase schema setup for the client portal (Dubai/IFZA + Astana/AIFC offices).
-- Run this once in the Supabase Dashboard -> SQL Editor for a fresh project.
-- Safe to re-run (idempotent): uses "if not exists" / "or replace" / drop-then-create for policies.

-- ============ 1. PROFILES ============

create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  company_name text,
  phone text,
  country text,
  role text default 'client',
  case_status text default 'New',
  office text default 'dubai', -- 'dubai' (IFZA) or 'astana' (AIFC)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'company_name') then
    alter table public.profiles add column company_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'phone') then
    alter table public.profiles add column phone text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'country') then
    alter table public.profiles add column country text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'role') then
    alter table public.profiles add column role text default 'client';
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'case_status') then
    alter table public.profiles add column case_status text default 'New';
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'office') then
    alter table public.profiles add column office text default 'dubai';
  end if;
end $$;

-- Auto-create/sync a profile row whenever a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company_name, phone, country, role, office)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country',
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    coalesce(new.raw_user_meta_data->>'office', 'dubai')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    company_name = excluded.company_name,
    phone = excluded.phone,
    country = excluded.country,
    office = excluded.office;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Service role full access profiles" on public.profiles;

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

-- ============ 2. DOCUMENTS ============

create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  doc_type text not null,
  status text default 'Uploaded',
  office text default 'dubai',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'documents' and column_name = 'office') then
    alter table public.documents add column office text default 'dubai';
  end if;
end $$;

alter table public.documents enable row level security;

drop policy if exists "Users can view own documents" on public.documents;
drop policy if exists "Users can insert own documents" on public.documents;
drop policy if exists "Admins can view all documents" on public.documents;
drop policy if exists "Admins can update all documents" on public.documents;
drop policy if exists "Service role full access documents" on public.documents;

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

-- ============ 3. APPLICATIONS ============

create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'New', -- New, In Progress, Done, Rejected
  form_data jsonb default '{}'::jsonb,
  office text default 'dubai', -- 'dubai' (IFZA) or 'astana' (AIFC)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'applications' and column_name = 'office') then
    alter table public.applications add column office text default 'dubai';
  end if;
end $$;

alter table public.applications enable row level security;

drop policy if exists "Users can view own applications" on public.applications;
drop policy if exists "Users can insert own applications" on public.applications;
drop policy if exists "Users can delete own applications" on public.applications;
drop policy if exists "Admins can view all applications" on public.applications;
drop policy if exists "Service role full access applications" on public.applications;

create policy "Users can view own applications"
on public.applications for select
using ( auth.uid() = user_id );

create policy "Users can insert own applications"
on public.applications for insert
with check ( auth.uid() = user_id );

create policy "Users can delete own applications"
on public.applications for delete
using ( auth.uid() = user_id );

create policy "Admins can view all applications"
on public.applications for select
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Service role full access applications"
on public.applications for all
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );

-- ============ 4. STORAGE (client-documents bucket) ============

insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

drop policy if exists "Authenticated users can upload files" on storage.objects;
drop policy if exists "Users can view their own files" on storage.objects;
drop policy if exists "Service role can do everything" on storage.objects;

create policy "Authenticated users can upload files"
on storage.objects for insert
with check (
  bucket_id = 'client-documents'
  and auth.role() = 'authenticated'
);

create policy "Users can view their own files"
on storage.objects for select
using (
  bucket_id = 'client-documents'
  and auth.uid() = owner
);

create policy "Service role can do everything"
on storage.objects
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );

-- ============ 5. Sanity check ============
select 'profiles' as table_name, count(*) from public.profiles
union all
select 'documents', count(*) from public.documents
union all
select 'applications', count(*) from public.applications;
