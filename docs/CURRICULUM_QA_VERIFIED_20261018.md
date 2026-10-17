# 2026-10-18 curriculum QA: verified structural markers, NOT final pedagogical approval

## Direct Supabase snapshot

| Metric | Verified count | Interpretation |
|---|---:|---|
| Course catalog / signed-in manuscript snapshots | 108 / 108 | Stored, not necessarily approved |
| English IELTS B1–C1 skill lessons | 48 | No full English A0–A2 foundation curriculum in the current catalog |
| French CEFR A1–C2 manuscripts | 60 | Structured original drafts |
| Six stage markers (①–⑥) | 108 | Presence only, not necessarily teaching quality |
| Answer/solution-related words (multilingual) | 108 | **A word hit; not verification of complete/correct answer keys** |
| SHA-256 metadata present | 108 | Hash recorded, not a fresh raw-byte independent comparison |
| Human editorial approvals | 0 | All remain draft |
| Audio reviewer approvals | 0 | 24 first-party MP3 are stored, none human listened/approved |

### Why 11 "missing answer" alerts disappeared

The older `lesson_qa_structure` view only recognized `答案`, exact-case `Réponse`, English `answer`, and `solution`. Eleven French B2/C2 lessons use the term `corrigé` / `corrigés`; the previous automated rule missed it. Querying actual source text verified the word family appears in the B2/C2 units, and the migrated view now recognizes it.

**Important**: This corrects a regex/keyword false positive; it does *not* prove that the associated practice answer keys are accurate, complete, or suitable for CEFR levels. The UI now separates machine marker coverage from explicit human approval.

## Acceptance plan for all 108 lessons

The existing owner-only five-step checklists record: grammar/examples, exercise/answer quality, level progression, six-stage coherence, and source provenance. Only actual human sign-off changes the private manuscript `qa_status` to approved. Each step requires checking original text, not only a keyword search. This includes all 108 lessons; lower-level listening transcripts, licensed media and accurate language progression remain separate gates.

The system should not claim the user has learned a level, achieved an IELTS band, or that all lessons have passed expert language review because a draft was imported or because 108 stage markers exist.

Automated reports are useful for triage and repeatability; they cannot replace semantic review by a French/English teacher or recorded-audio listening.
