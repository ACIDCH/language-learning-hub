-- Additive V4.4 account settings + encrypted, account-scoped AI keys.
-- Does not touch course content, learning progress or existing user rows.
create table public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb
    check (jsonb_typeof(preferences)='object' and pg_column_size(preferences)<4096),
  ai_preferences jsonb not null default '{}'::jsonb
    check (jsonb_typeof(ai_preferences)='object' and pg_column_size(ai_preferences)<2048
      and not ai_preferences ?| array['apiKey','api_key','token','secret','authorization']),
  updated_at timestamptz not null default now()
);
alter table public.user_settings enable row level security;
revoke all on public.user_settings from public, anon;
grant select, insert, update on public.user_settings to authenticated;
create policy user_settings_select on public.user_settings for select to authenticated
  using (user_id=(select auth.uid()));
create policy user_settings_insert on public.user_settings for insert to authenticated
  with check (user_id=(select auth.uid()));
create policy user_settings_update on public.user_settings for update to authenticated
  using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
comment on table public.user_settings is
  'Account-owned UI/learning/AI model preferences only. Never store API keys in JSON.';

-- Registry is intentionally unreadable through PostgREST, including to authenticated.
-- Credentials are encrypted by Supabase Vault; only narrow auth.uid() RPCs can read.
create table public.user_ai_credentials (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('openrouter','deepseek','gemini','openai','custom')),
  secret_id uuid not null,
  updated_at timestamptz not null default now(),
  primary key (user_id,provider)
);
alter table public.user_ai_credentials enable row level security;
revoke all on public.user_ai_credentials from public, anon, authenticated;
comment on table public.user_ai_credentials is
  'RLS-denied Vault UUID registry: no plaintext API keys and no direct client grants.';

create or replace function public.set_my_ai_key(p_provider text,p_api_key text)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_user uuid := (select auth.uid()); v_secret uuid;
begin
  if v_user is null then raise exception 'authentication_required'; end if;
  if p_provider not in ('openrouter','deepseek','gemini','openai','custom')
    or p_provider is null then raise exception 'invalid_provider'; end if;
  if p_api_key is null or length(btrim(p_api_key))<5 or length(p_api_key)>500
    then raise exception 'invalid_key_length'; end if;
  select secret_id into v_secret from public.user_ai_credentials
    where user_id=v_user and provider=p_provider for update;
  if v_secret is null then
    v_secret := vault.create_secret(btrim(p_api_key));
    insert into public.user_ai_credentials(user_id,provider,secret_id)
      values(v_user,p_provider,v_secret);
  else
    perform vault.update_secret(v_secret,btrim(p_api_key));
    update public.user_ai_credentials set updated_at=now()
      where user_id=v_user and provider=p_provider;
  end if;
end $$;
create or replace function public.get_my_ai_key(p_provider text)
returns text language plpgsql security definer set search_path = ''
as $$
declare v_user uuid := (select auth.uid()); v_key text;
begin
  if v_user is null then raise exception 'authentication_required'; end if;
  if p_provider not in ('openrouter','deepseek','gemini','openai','custom')
    or p_provider is null then raise exception 'invalid_provider'; end if;
  select d.decrypted_secret into v_key
    from public.user_ai_credentials c
    join vault.decrypted_secrets d on d.id=c.secret_id
   where c.user_id=v_user and c.provider=p_provider;
  return v_key;
end $$;
create or replace function public.delete_my_ai_key(p_provider text)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_user uuid := (select auth.uid()); v_secret uuid;
begin
  if v_user is null then raise exception 'authentication_required'; end if;
  if p_provider not in ('openrouter','deepseek','gemini','openai','custom')
    or p_provider is null then raise exception 'invalid_provider'; end if;
  delete from public.user_ai_credentials
   where user_id=v_user and provider=p_provider returning secret_id into v_secret;
  if v_secret is not null then
    delete from vault.secrets where id=v_secret;
  end if;
end $$;
revoke all on function public.set_my_ai_key(text,text) from public,anon;
revoke all on function public.get_my_ai_key(text) from public,anon;
revoke all on function public.delete_my_ai_key(text) from public,anon;
grant execute on function public.set_my_ai_key(text,text) to authenticated;
grant execute on function public.get_my_ai_key(text) to authenticated;
grant execute on function public.delete_my_ai_key(text) to authenticated;
