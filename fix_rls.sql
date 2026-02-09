-- 1. Reset RLS on documents table completely
alter table public.documents disable row level security;
alter table public.documents enable row level security;

-- 2. Drop ALL existing policies to be sure
drop policy if exists "Users can view own documents" on public.documents;
drop policy if exists "Users can insert own documents" on public.documents;
drop policy if exists "Service role full access" on public.documents;
drop policy if exists "Enable read access for all users" on public.documents;
drop policy if exists "Enable insert for authenticated users only" on public.documents;

-- 3. Create SIMPLEST possible policies for debugging
-- Allow users to see their own documents
create policy "Users can view own documents"
on public.documents for select
using ( auth.uid() = user_id );

-- Allow users to insert their own documents
create policy "Users can insert own documents"
on public.documents for insert
with check ( auth.uid() = user_id );

-- Allow Service Role (API) to do EVERYTHING (Insert, Update, Select, Delete)
create policy "Service role full access"
on public.documents
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );

-- 4. Check if data actually exists (for debugging in SQL Editor)
select * from public.documents limit 5;
