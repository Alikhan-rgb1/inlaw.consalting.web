-- 1. Disable RLS momentarily to clear bad state
alter table public.documents disable row level security;
alter table public.documents enable row level security;

-- 2. Drop ALL existing policies (start fresh)
drop policy if exists "Users can view own documents" on public.documents;
drop policy if exists "Users can insert own documents" on public.documents;
drop policy if exists "Service role full access" on public.documents;
drop policy if exists "Admins can view all documents" on public.documents;
drop policy if exists "Admins can update all documents" on public.documents;

-- 3. Policy: Users see THEIR OWN documents
create policy "Users can view own documents"
on public.documents for select
using ( auth.uid() = user_id );

-- 4. Policy: Users insert THEIR OWN documents
create policy "Users can insert own documents"
on public.documents for insert
with check ( auth.uid() = user_id );

-- 5. Policy: Admins can view ALL documents
-- Checks if the current user has 'admin' role in profiles table
create policy "Admins can view all documents"
on public.documents for select
using ( 
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

-- 6. Policy: Admins can update ALL documents
create policy "Admins can update all documents"
on public.documents for update
using ( 
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

-- 7. Policy: Service Role (API) can do ANYTHING (Critical for backend)
create policy "Service role full access"
on public.documents
for all
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );
