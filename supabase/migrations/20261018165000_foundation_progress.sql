-- Supplemental, author-written foundation lessons are deployed with the
-- React app; only signed-in learner progress is stored in Postgres.
-- This table deliberately does NOT alter the 108 original catalog entries.
create table if not exists public.foundation_progress(
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id text not null
   check (lesson_id ~ '^(en|fr)-fnd-(0[1-9]|1[0-2])$'),
 answers jsonb not null default '{}'::jsonb
   check (jsonb_typeof(answers)='object' and pg_column_size(answers)<4096),
 notes text not null default '' check(char_length(notes)<=5000),
 completed boolean not null default false,
 updated_at timestamptz not null default now(),
 primary key(user_id,lesson_id)
);
alter table public.foundation_progress enable row level security;
revoke all on public.foundation_progress from anon,public;
grant select,insert,update,delete on public.foundation_progress to authenticated;
drop policy if exists foundation_owner_select on public.foundation_progress;
create policy foundation_owner_select on public.foundation_progress
 for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists foundation_owner_insert on public.foundation_progress;
create policy foundation_owner_insert on public.foundation_progress
 for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists foundation_owner_update on public.foundation_progress;
create policy foundation_owner_update on public.foundation_progress
 for update to authenticated using ((select auth.uid())=user_id)
 with check ((select auth.uid())=user_id);
drop policy if exists foundation_owner_delete on public.foundation_progress;
create policy foundation_owner_delete on public.foundation_progress
 for delete to authenticated using ((select auth.uid())=user_id);
comment on table public.foundation_progress is
 'User-scoped progress for 24 original optional A0–A2 bridge lessons. Not equivalent to course_catalog editorial QA or a certified CEFR level.';
