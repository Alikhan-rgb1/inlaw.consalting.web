-- Replace 'YOUR_ADMIN_EMAIL' with the email you registered with
-- Example: 'admin@inlaw.kz'

update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL';

-- Verify the change
select * from public.profiles where role = 'admin';
