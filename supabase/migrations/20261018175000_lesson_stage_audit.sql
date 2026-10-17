-- Heuristic, authenticated stage-section audit, not manuscript approval.
-- Positions are character offsets in the exact owner's text. Stage header
-- headings remain included in length estimates; these are triage signals.
create or replace view public.lesson_stage_audit
with (security_invoker=true) as
with marks as (
 select user_id,course_id,qa_status,char_length(content_body) total_chars,
 strpos(content_body,'①') p1,
 strpos(content_body,'②') p2,
 strpos(content_body,'③') p3,
 strpos(content_body,'④') p4,
 strpos(content_body,'⑤') p5,
 strpos(content_body,'⑥') p6
 from public.private_lesson_content
)
select user_id,course_id,qa_status,total_chars,
 (p1>0 and p2>p1 and p3>p2 and p4>p3 and p5>p4 and p6>p5) as stages_in_order,
 greatest(0,p2-p1) as context_chars,
 greatest(0,p3-p2) as grammar_chars,
 greatest(0,p4-p3) as vocabulary_chars,
 greatest(0,p5-p4) as reading_chars,
 greatest(0,p6-p5) as pronunciation_chars,
 greatest(0,total_chars-p6) as production_chars,
 ((total_chars<4000)::int
  +(p2-p1<200)::int
  +(p3-p2<180)::int
  +(p4-p3<180)::int
  +(p5-p4<200)::int
  +(p6-p5<130)::int) as review_signal_count
from marks;
revoke all on public.lesson_stage_audit from anon,public;
grant select on public.lesson_stage_audit to authenticated;
comment on view public.lesson_stage_audit is
 'Per-stage character-length triage only; does not verify grammar, pedagogical correctness, native-speaker audio, completeness or CEFR/IELTS level.';
