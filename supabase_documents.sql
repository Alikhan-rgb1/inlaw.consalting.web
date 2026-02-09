-- 1. Add case_status to profiles
alter table public.profiles 
add column if not exists case_status text default 'New';

-- 2. Create documents table
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  doc_type text not null, -- 'passport', 'company_docs', etc.
  status text default 'Uploaded', -- 'Uploaded', 'Reviewing', 'Approved', 'Rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS for documents
alter table public.documents enable row level security;

-- 4. Policies for documents
-- Users can view their own documents
create policy "Users can view own documents"
  on public.documents for select
  using ( auth.uid() = user_id );

-- Users can insert their own documents (usually done via API, but good to have)
create policy "Users can insert own documents"
  on public.documents for insert
  with check ( auth.uid() = user_id );
