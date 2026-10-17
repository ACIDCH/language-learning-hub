# Learning Hub delivery ledger — 2026-10-18

This is a **verified implementation and acceptance ledger**, not a claim of full pedagogical accreditation.

## Completed, merged and CI verified

| PR | Function | Production CI |
| --- | --- | --- |
| #14 | Public-only Cloudflare Pages→Worker→Supabase connection | Pass |
| #15 | Owner-scoped V4 manuscript reader/import, 108 text snapshots | Pass |
| #16 | Six-stage manuscript reader, search, truthful audio status | Pass |
| #17 | Owner-only MP3 Storage, signed playback path, optional AI prototype and transcription exercise | Pass |
| #18 | User-owned human editorial and audio-review checklists | Pass |
| #19 | Browser speech transcription UX V2, text word alignment | Pass |
| #21 | Cloud study workbench tabs, resume previous lesson, stale-progress guards | Pass |
| #22 | Owner-synced 108-course resource status and stale audio-url guards | Pass |
| #23 | Signup/confirmation/recovery UI, accurate CEFR/IELTS learning roadmap | Pass |
| #24 | External-audio rights catalog and 12 official FI vocabulary supplements | Pass |
| #25 | Fixed French corrigé keyword false positives; QA remains manual | Pass |

## Source-of-truth snapshots directly checked in Supabase

- `public.course_catalog`: **108** IDs = 60 French CEFR A1–C2 + 48 English IELTS B1–C1 skill lessons.
- `public.private_lesson_content`: **108** owner-scoped draft manuscripts; **0** human-approved.
- `public.lesson_qa_structure`: **108/108** six-stage symbol sets, **108/108** multilingual words suggesting answer/correction sections, **108/108** SHA-256 metadata recorded. Keyword hits do *not* verify exercises or linguistic correctness.
- `public.course_audio_index`: **377** rows. Exactly **24** original A1 synthetic-practice records mapped to 12 lessons; **353** external references are unmapped in the database (83 FI phonetics, 104 FI vocabulary archive rows, 166 publisher Inspire). Among those external rows **352** unique SHA-256 values; the same vocabulary recording exists in both `voc_08.zip` and `voc_09.zip`.
- `storage.objects` private bucket `lesson-audio-private`: **24** MP3 objects, zero missing expected or unexpected names. Human audio approval remains **0**.
- `public.learning_progress`: progress persists independently of QA. The end user previously confirmed live sign-in/save/refresh success.
- New owner RLS review tables are in place; no course or audio has been auto-approved.

## Real acceptance not achievable from CI alone

1. **Human course QA**: substantive correctness of all 108 lessons, actual answers, level difficulty, evidence/attribution, and linguistic expert approval. Automated marker detection cannot replace reviewer confirmation.
2. **Human listening QA**: check each of 24 own A1 MP3s plays from the private signed URL, speaks the intended text, has natural pronunciation, and is usable. Stored binary evidence does not mean all were listened to.
3. **Additional reference audio**: the 12 specifically mapped FI official vocabulary clips are supplementary references; source-specific rights and real playback must be honored. 353 external archived references are **not** 353 verified course tracks. Inspire is a copyrighted commercial resource and is never mirrored as public content.
4. **Auth email UAT**: new registration, actual OTP or signup link delivery, password recovery and second-physical-device tests require live user inbox + Supabase email/redirect configuration. UI code/CI does not show emails arrived. Old unmerged PR #9 was superseded and closed.
5. **Acoustic pronunciation V3**: Codex Issue #20 is responsible for real ASR/phoneme evaluation. On last GitHub check, `feat/pronunciation-v3-issue-20` was **not pushed remotely**, so source audit, actual browser tests and PR merge remain pending. Experimental IPA/timing are not calibrated professional scores.
6. **AI teacher**: paused until the user's last phase. Existing opt-in prototype is untouched by this release; without a real API key it has not passed provider end-to-end testing and may incur charges.
7. **Beginner English**: current 48 English lessons are IELTS-oriented B1–C1, not a complete alphabet/phonics-to-A2 syllabus. The learning ladder accurately describes the desired didactic sequence but does not imply missing courses already exist.
8. **Browser verification**: GitHub/Cloudflare deploy checks completed, but automated check success is not equivalent to authenticated browser interaction and cross-device QA. Browser access may be constrained by tooling.

## Integration boundaries

- The repo for the owner's public personal website and the separate immersive translation plugin were not modified.
- No private Google Drive original books/files were deleted; no service-role, provider API secrets, user passwords, or pronunciation recordings are committed.
- Codex should rebase a future **draft** pronunciation V3 PR onto current `main`, keeping acoustic tests and unsupported browser actions explicit. No forced merge or override of current course/progress/auth states.
