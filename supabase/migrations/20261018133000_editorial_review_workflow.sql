-- Reviewer annotations are user-scoped; do not auto-approve imported lessons.
create table if not exists public.lesson_editorial_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete cascade,
  grammar_checked boolean not null default false,
  exercises_checked boolean not null default false,
  level_checked boolean not null default false,
  stages_checked boolean not null default false,
  source_checked boolean not null default false,
  reviewer_notes text not null default '' check (char_length(reviewer_notes)<=10000),
  reviewed_at timestamptz not null default now(),
  primary key (user_id,course_id)
);
alter table public.lesson_editorial_reviews enable row level security;
revoke all on public.lesson_editorial_reviews from anon,public;
grant select,insert,update on public.lesson_editorial_reviews to authenticated;
drop policy if exists personal_lesson_reviews_select on public.lesson_editorial_reviews;
create policy personal_lesson_reviews_select on public.lesson_editorial_reviews
  for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists personal_lesson_reviews_insert on public.lesson_editorial_reviews;
create policy personal_lesson_reviews_insert on public.lesson_editorial_reviews
  for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists personal_lesson_reviews_update on public.lesson_editorial_reviews;
create policy personal_lesson_reviews_update on public.lesson_editorial_reviews
  for update to authenticated using ((select auth.uid())=user_id)
  with check ((select auth.uid())=user_id);

create table if not exists public.audio_editorial_reviews (
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_id text not null references public.course_audio_index(asset_id) on delete cascade,
  listened boolean not null default false,
  text_matched boolean not null default false,
  clarity_ok boolean not null default false,
  reviewer_notes text not null default '' check (char_length(reviewer_notes)<=3000),
  reviewed_at timestamptz not null default now(),
  primary key(user_id,asset_id)
);
alter table public.audio_editorial_reviews enable row level security;
revoke all on public.audio_editorial_reviews from anon,public;
grant select,insert,update on public.audio_editorial_reviews to authenticated;
drop policy if exists personal_audio_reviews_select on public.audio_editorial_reviews;
create policy personal_audio_reviews_select on public.audio_editorial_reviews
 for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists personal_audio_reviews_insert on public.audio_editorial_reviews;
create policy personal_audio_reviews_insert on public.audio_editorial_reviews
 for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists personal_audio_reviews_update on public.audio_editorial_reviews;
create policy personal_audio_reviews_update on public.audio_editorial_reviews
 for update to authenticated using ((select auth.uid())=user_id)
 with check ((select auth.uid())=user_id);
