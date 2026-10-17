create table public.course_catalog (
 id text primary key, language text not null check(language in ('fr','en')),
 level text not null, track text, title text not null, unit integer not null,
 text_complete boolean not null default false, audio_verified boolean not null default false,
 "QA_approved" boolean not null default false, publishable boolean not null default false,
 check (not publishable or (text_complete and audio_verified and "QA_approved"))
);
alter table public.course_catalog enable row level security;
create policy catalog_read on public.course_catalog for select to anon, authenticated using (true);
grant select on public.course_catalog to anon, authenticated;
create table public.learning_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_id text not null references public.course_catalog(id),
 state jsonb not null default '{}'::jsonb check (jsonb_typeof(state) = 'object'),
 updated_at timestamptz not null default now(),
 primary key (user_id, course_id)
);
create index learning_progress_course_id_idx on public.learning_progress(course_id);
alter table public.learning_progress enable row level security;
create policy progress_select on public.learning_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy progress_insert on public.learning_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy progress_update on public.learning_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy progress_delete on public.learning_progress for delete to authenticated using ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.learning_progress to authenticated;
revoke all on public.learning_progress from anon;
create table public.course_audio_index (
 asset_id text primary key, course_id text references public.course_catalog(id),
 filename text not null, sha256 text not null check(length(sha256)=64),
 duration_seconds double precision not null check(duration_seconds>0),
 source_kind text not null check(source_kind in ('open_reference','synthetic_practice')),
 decoded boolean not null default false, exact_text boolean not null default false,
 listened boolean not null default false, audio_verified boolean not null default false,
 check (not audio_verified or (decoded and exact_text and listened))
);
create index course_audio_index_course_id_idx on public.course_audio_index(course_id);
alter table public.course_audio_index enable row level security;
create policy audio_metadata_read on public.course_audio_index for select to authenticated using (true);
grant select on public.course_audio_index to authenticated;
comment on table public.learning_progress is 'Personal learning state. No manuscript text, API secrets or audio bytes.';
comment on table public.course_audio_index is 'Metadata only. Full text and media remain in private Drive/local storage.';
