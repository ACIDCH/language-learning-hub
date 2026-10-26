-- Review/apply with PR #50; not applied to the live project by this change.
-- Preserve all rows, numeric answers, ownership policies and existing notes limits.
begin;
alter table public.foundation_progress
  drop constraint foundation_progress_answers_check;
alter table public.foundation_progress
  add constraint foundation_progress_answers_check check (
    jsonb_typeof(answers)='object'
    and octet_length(answers::text)<=262144
  );
comment on column public.foundation_progress.answers is
 'Legacy numeric answers plus __learning stage/studyResponses. Object-only, maximum 256 KiB UTF-8 JSON text; no recordings.';
commit;
