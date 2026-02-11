-- Create applications table to store form submissions
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'New', -- New, In Progress, Done, Rejected
  form_data jsonb default '{}'::jsonb, -- Stores all form fields as JSON
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.applications enable row level security;

-- Policies
create policy "Users can view own applications"
  on public.applications for select
  using ( auth.uid() = user_id );

create policy "Users can insert own applications"
  on public.applications for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own applications"
  on public.applications for delete
  using ( auth.uid() = user_id );

-- Admins can view all applications (if you have admin policies setup, otherwise use service role key in code)
-- create policy "Admins can view all applications" ...
