-- Handle source introductions that list the symbols ①②③④⑤⑥
-- before the real six line-anchored section headings (FR A2 U07-U12).
-- First substring occurrence is not equivalent to the first lesson section.
create or replace view public.lesson_stage_audit
with (security_invoker=true) as
with marks as (
 select user_id,course_id,qa_status,char_length(content_body) total_chars,
 regexp_instr(content_body,'^[[:blank:]]*①',1,1,0,'n') p1,
 regexp_instr(content_body,'^[[:blank:]]*②',1,1,0,'n') p2,
 regexp_instr(content_body,'^[[:blank:]]*③',1,1,0,'n') p3,
 regexp_instr(content_body,'^[[:blank:]]*④',1,1,0,'n') p4,
 regexp_instr(content_body,'^[[:blank:]]*⑤',1,1,0,'n') p5,
 regexp_instr(content_body,'^[[:blank:]]*⑥',1,1,0,'n') p6
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
comment on view public.lesson_stage_audit is
 'Character-length prioritization only, using anchored stage headings rather than in-text symbol lists. Not a linguistic QA grade, exam score or proof of completeness.';
