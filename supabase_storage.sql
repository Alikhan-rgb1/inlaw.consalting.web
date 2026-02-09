-- 1. Create the storage bucket 'client-documents'
insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

-- 2. Remove old policies to avoid conflicts
drop policy if exists "Authenticated users can upload files" on storage.objects;
drop policy if exists "Users can view their own files" on storage.objects;
drop policy if exists "Service role can do everything" on storage.objects;

-- 3. Allow authenticated users to upload files
create policy "Authenticated users can upload files"
on storage.objects for insert
with check (
  bucket_id = 'client-documents' 
  and auth.role() = 'authenticated'
);

-- 4. Allow users to view/download their own files
create policy "Users can view their own files"
on storage.objects for select
using (
  bucket_id = 'client-documents' 
  and auth.uid() = owner
);

-- 5. Allow Admin (Service Role) to view/manage all files
create policy "Service role can do everything"
on storage.objects
using ( auth.role() = 'service_role' )
with check ( auth.role() = 'service_role' );
