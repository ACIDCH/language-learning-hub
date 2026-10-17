# Real section-level quality triage — 108 imported manuscripts

## Verified 2026-10-18 Supabase results

The original `lesson_qa_structure` view only checked whether a circled ①–⑥ symbol appeared anywhere. A subset of the French A2 V4 manuscript introductions contains an **inline summary of all six symbols before the actual six sections**. Using first-appearance positions mistakenly measured five sections as six characters each. This was a false structural alert.

Revised `lesson_stage_audit` uses *line-anchored headings* with Postgres `regexp_instr`, matching the React `splitLessonStages` behavior. Actual result:

- 108/108 original course manuscripts have all six section headings in ascending order.
- 21/108 are automatically prioritized for closer **human review**, NOT rejected or marked linguistically wrong.
- 20 manuscripts contain fewer than 4,000 characters; this is a heuristic length threshold, not CEFR sufficiency.
- 1 additional manuscript, `fr-a1-u03`, has a relatively brief vocabulary section under the 180-character guide threshold. This does not prove that it has insufficient vocabulary overall.
- All 108 remain `draft` and **0 are approved**; source completeness and exact audio alignment are still manual checks.

## New signed-in QA panel

Under `/cloud/` → `质量审校`, the new section-depth review queue shows each author's six-stage writing lengths and first-priority short sections. It allows opening the existing owner-scoped manuscript and five-item reviewer checklist. It never edits original text, media, grades, or automatically approves a draft.

## Acceptance gates

- Repeat raw SQL checks on source text after any import; ensure numbered introductory summaries do not fool metrics.
- Verify 21 initial review flags, 108 consistent section heading order, and no change to any existing course manuscript SHA-256.
- Have a French/English teaching expert review prioritized 21 units, then all others using actual text, exercises, level fit and legal audio, before manual sign-off.
- Automations do not warrant asserting original native audio has been listened to, or that 108 lesson tasks achieve IELTS/CEFR certification.
