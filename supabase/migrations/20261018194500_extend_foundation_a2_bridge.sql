-- Preserve existing 24 original foundation draft records; extend IDs for A2 bridge.
-- No row deletion or automatic completion/approval.
alter table public.foundation_progress
  drop constraint if exists foundation_progress_lesson_id_check;
alter table public.foundation_progress
  add constraint foundation_progress_lesson_id_check
  check (lesson_id ~ '^(en|fr)-fnd-(0[1-9]|1[0-9]|2[0-4])$');
comment on table public.foundation_progress is
 'Owner-scoped learning progress for 48 draft foundational courses, 24 per language. Completion is a self-declared learning action, not a CEFR certificate.';
