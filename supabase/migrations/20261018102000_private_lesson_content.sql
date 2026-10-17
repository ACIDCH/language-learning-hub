-- Private owner-scoped instructional text synced from authorized personal Drive.
-- Preserves the original Drive files; does not change public course publish flags.
create table if not exists public.private_lesson_content (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete cascade,
  content_body text not null check (char_length(content_body) between 1 and 200000),
  source_format text not null default 'text/markdown'
    check (source_format in ('text/markdown','text/plain')),
  source_drive_file_id text,
  source_version text not null default 'v4-draft',
  content_sha256 text check (content_sha256 is null or content_sha256 ~ '^[a-f0-9]{64}$'),
  qa_status text not null default 'draft'
    check (qa_status in ('draft','editorial_review','approved')),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);
comment on table public.private_lesson_content is
  'Personal, owner-only manuscript text copies from YUNPAN for authenticated reading. Original files remain in Drive; not publicly publishable or QA-approved by import.';
alter table public.private_lesson_content enable row level security;
revoke all on public.private_lesson_content from anon, public;
grant select, insert, update, delete on public.private_lesson_content to authenticated;
drop policy if exists private_lesson_owner_select on public.private_lesson_content;
create policy private_lesson_owner_select on public.private_lesson_content
 for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists private_lesson_owner_insert on public.private_lesson_content;
create policy private_lesson_owner_insert on public.private_lesson_content
 for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists private_lesson_owner_update on public.private_lesson_content;
create policy private_lesson_owner_update on public.private_lesson_content
 for update to authenticated using ((select auth.uid()) = user_id)
 with check ((select auth.uid()) = user_id);
drop policy if exists private_lesson_owner_delete on public.private_lesson_content;
create policy private_lesson_owner_delete on public.private_lesson_content
 for delete to authenticated using ((select auth.uid()) = user_id);
