-- Transaction-only identities; nothing is retained in auth.users.
begin;
select set_config('llh.test_owner', gen_random_uuid()::text, true);
select set_config('llh.test_other', gen_random_uuid()::text, true);
insert into auth.users(id, aud, role) values
 (current_setting('llh.test_owner')::uuid, 'authenticated', 'authenticated'),
 (current_setting('llh.test_other')::uuid, 'authenticated', 'authenticated');
insert into public.learning_progress(user_id,course_id,state) values
 (current_setting('llh.test_other')::uuid, 'fr-a1-u01', '{"notes":"other private state"}');
select set_config('request.jwt.claim.sub', current_setting('llh.test_owner'), true);
set local role authenticated;
insert into public.learning_progress(user_id,course_id,state) values
 (current_setting('llh.test_owner')::uuid,'fr-a1-u01','{"stage":3}');
do $$ begin
 if (select count(*) from public.learning_progress) <> 1 then raise exception 'RLS leaked another user'; end if;
 begin
  insert into public.learning_progress(user_id,course_id,state) values
  (current_setting('llh.test_other')::uuid,'fr-a1-u02','{}');
  raise exception 'Cross-owner write unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
end $$;
update public.learning_progress set state='{"stage":4}' where course_id='fr-a1-u01';
do $$ begin
 if (select (state->>'stage')::int from public.learning_progress) <> 4 then raise exception 'Owner update failed'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
 if (select count(*) from public.course_catalog) <> 108 then raise exception 'Catalog count failed'; end if;
 begin
  perform * from public.learning_progress;
  raise exception 'Anonymous progress read unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
