-- Multiple authored/private audio tracks may be attached per course and per Google Drive source.
-- Metadata only; audio content remains under the user's Google Drive access controls.
create table if not exists public.user_drive_media(
 user_id uuid not null references auth.users(id) on delete cascade,
 google_subject text not null,
 course_id text not null check (char_length(course_id) between 3 and 100),
 file_id text not null check (char_length(file_id) between 2 and 200),
 file_name text not null check (char_length(file_name)<500),
 mime_type text not null check (mime_type like 'audio/%' or lower(file_name) ~ '\.(mp3|wav|m4a|ogg|webm)$'),
 added_at timestamptz not null default now(),
 primary key(user_id,google_subject,course_id,file_id),
 foreign key(user_id,google_subject)
  references public.user_drive_profiles(user_id,google_subject) on delete cascade
);
alter table public.user_drive_media enable row level security;
revoke all on public.user_drive_media from public, anon;
grant select,insert,delete on public.user_drive_media to authenticated;
create policy drive_media_owner_read on public.user_drive_media for select to authenticated
 using (user_id=(select auth.uid()));
create policy drive_media_owner_insert on public.user_drive_media for insert to authenticated
 with check (user_id=(select auth.uid()));
create policy drive_media_owner_delete on public.user_drive_media for delete to authenticated
 using (user_id=(select auth.uid()));
comment on table public.user_drive_media is
 'Per-course many-to-one Google Drive audio associations, no media bytes, no OAuth tokens.';
