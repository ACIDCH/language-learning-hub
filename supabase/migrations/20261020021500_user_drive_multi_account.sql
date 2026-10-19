-- Account-scoped metadata for interchangeable Google Drive accounts/folders and per-course files.
-- No Google access/refresh token and no document bytes in database.
create table if not exists public.user_drive_settings(
 user_id uuid primary key references auth.users(id) on delete cascade,
 oauth_client_id text not null default '' check(char_length(oauth_client_id)<300),
 active_subject text not null default '' check(char_length(active_subject)<250),
 updated_at timestamptz not null default now()
);
create table if not exists public.user_drive_profiles(
 user_id uuid not null references auth.users(id) on delete cascade,
 google_subject text not null check(char_length(google_subject) between 2 and 250),
 email text not null check(char_length(email)<320),
 folder_id text not null default 'root' check(char_length(folder_id)<200),
 label text not null default '' check(char_length(label)<200),
 updated_at timestamptz not null default now(),
 primary key(user_id, google_subject)
);
create table if not exists public.user_drive_bindings(
 user_id uuid not null references auth.users(id) on delete cascade,
 google_subject text not null,
 course_id text not null check(char_length(course_id) between 3 and 100),
 kind text not null check(kind in ('lesson','audio')),
 file_id text not null check(char_length(file_id) between 2 and 200),
 file_name text not null check(char_length(file_name)<500),
 mime_type text not null check(char_length(mime_type)<150),
 updated_at timestamptz not null default now(),
 primary key(user_id,google_subject,course_id,kind),
 foreign key(user_id,google_subject) references public.user_drive_profiles(user_id,google_subject) on delete cascade
);
do $$ declare t text; begin
 foreach t in array array['user_drive_settings','user_drive_profiles','user_drive_bindings'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('revoke all on public.%I from public, anon',t);
  execute format('grant select,insert,update,delete on public.%I to authenticated',t);
  execute format('create policy %I on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))','owner_'||t,t);
 end loop;
end $$;
comment on table public.user_drive_settings is 'Google OAuth public client ID and selected account only; never store authorization tokens.';
comment on table public.user_drive_profiles is 'Account-owned external Drive metadata. Google OAuth must be reauthorized in the browser.';
comment on table public.user_drive_bindings is 'Selected file references only. Existing manuscripts and audio are never overwritten.';
