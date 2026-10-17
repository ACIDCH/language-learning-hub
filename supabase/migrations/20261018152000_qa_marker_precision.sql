-- 2026-10-18: Correct an overly narrow answer-key heuristic.
-- B2/C2 authors used French "corrigé/corrigés"; absence of English "answer"
-- or singular "Réponse" is NOT evidence of missing answer keys.
-- The heuristic only detects marker text; it cannot check the answers.
create or replace view public.lesson_qa_structure
with (security_invoker=true) as
select
  user_id,course_id,source_version,qa_status,
  char_length(content_body) as char_count,
  (strpos(content_body,'①')>0 and strpos(content_body,'②')>0 and
   strpos(content_body,'③')>0 and strpos(content_body,'④')>0 and
   strpos(content_body,'⑤')>0 and strpos(content_body,'⑥')>0) as has_six_stage_markers,
  (strpos(content_body,'答案')>0 or
   strpos(lower(content_body),'réponse')>0 or
   strpos(lower(content_body),'answer')>0 or
   strpos(lower(content_body),'solution')>0 or
   strpos(lower(content_body),'corrig')>0) as has_answer_markers,
  (char_length(content_body)>=5000) as has_extended_text,
  (content_sha256 is not null) as hash_recorded
from public.private_lesson_content;
comment on view public.lesson_qa_structure is
 'Owner-scoped structural heuristics. corrigé/réponses/answers are marker matches ONLY; all pedagogical, linguistic, copyright and audio approvals are separate.';
