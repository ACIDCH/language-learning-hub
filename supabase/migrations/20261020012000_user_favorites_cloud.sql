-- Additive, account-scoped selection favorites. No existing manuscript or progress row is changed.
create table if not exists public.user_favorites (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 course_id text not null check (char_length(course_id) between 3 and 100),
 selection_text text not null check (char_length(selection_text) between 1 and 2000),
 created_at timestamptz not null default now()
);
create unique index if not exists user_favorites_owner_selection_unique
 on public.user_favorites (user_id, course_id, md5(selection_text));
create index if not exists user_favorites_owner_created_idx
 on public.user_favorites (user_id, created_at desc);
alter table public.user_favorites enable row level security;
revoke all on public.user_favorites from public, anon;
grant select,insert,delete on public.user_favorites to authenticated;
create policy favorites_owner_read on public.user_favorites for select to authenticated
 using (user_id=(select auth.uid()));
create policy favorites_owner_insert on public.user_favorites for insert to authenticated
 with check (user_id=(select auth.uid()));
create policy favorites_owner_delete on public.user_favorites for delete to authenticated
 using (user_id=(select auth.uid()));
comment on table public.user_favorites is
 'User-owned selected sentences. Does not contain private course files or change learning progress.';
