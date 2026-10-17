-- RLS-invoker view: low-cost structural checks, NOT pedagogical certification.
create or replace view public.lesson_qa_structure
with (security_invoker=true) as
select
  user_id, course_id,source_version,qa_status,
  char_length(content_body) as char_count,
  (strpos(content_body,'①')>0 and strpos(content_body,'②')>0 and
   strpos(content_body,'③')>0 and strpos(content_body,'④')>0 and
   strpos(content_body,'⑤')>0 and strpos(content_body,'⑥')>0) as has_six_stage_markers,
  (strpos(content_body,'答案')>0 or
   strpos(content_body,'Réponse')>0 or
   strpos(lower(content_body),'answer')>0 or
   strpos(lower(content_body),'solution')>0) as has_answer_markers,
  (char_length(content_body)>=5000) as has_extended_text,
  (content_sha256 is not null) as hash_recorded
from public.private_lesson_content;
revoke all on public.lesson_qa_structure from anon,public;
grant select on public.lesson_qa_structure to authenticated;
comment on view public.lesson_qa_structure is
 'Automated text structural signals only, not final source, grammar, pronunciation or pedagogical QA.';
