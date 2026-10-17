# Foundation listening + cross-course review acceptance (2026-10-18)

## Source protection

This enhancement covers all 48 English/French foundation and A1-to-A2 bridge units (24 per language). The original 24 units reside in src/foundationEnglish.ts and src/foundationFrench.ts; the additional 24 units use the corresponding Bridge modules. It does not replace the 108 owner-scoped V4 manuscripts, re-encode 24 private A1 MP3 recordings, or touch Codex's acoustic V3 work (#30).

The dictation passage for every foundation lesson is precisely that lesson's own listening text. Device Web Speech TTS is explicitly labelled as synthesized audio. Written attempts are compared locally using word-level Levenshtein edits after case and punctuation normalization; French accents remain significant. This is not ASR, forced alignment, pronunciation grading or linguistic approval.

## Learner acceptance sequence

1. Sign in to Cloud Workspace, select Foundations, then English or French. Open any of the 48 lessons.
2. In 听读, play the TTS prompt, type an attempt under 听写训练 and choose 核对书面文本. Verify differences appear as word edit operations, never as a proficiency score.
3. Verify capitalization and punctuation do not affect matching. In French, a missing accent should still count as different. Revealing the reference must not erase the input.
4. Add the dictation result to the lesson note, go to 练习, save to Supabase and reload to confirm persistence. At the 5000-character limit, insertion should be rejected without loss of existing note content.
5. Reopen 跨课程复习建议. Never-started lessons should not be overdue; incorrect or missing self-checks should appear immediately; completed lessons reappear after around 72 hours.
6. Change language and lesson to confirm independent answers, notes and completion, and verify unsaved notes block review navigation.
7. Repeat on a narrow mobile viewport, then on a second signed-in device to check cloud progress.

## Automated checks

- node --experimental-strip-types --test tests/foundationDictation.test.mjs
- node --experimental-strip-types --test tests/foundationReview.test.mjs
- npm run build plus existing workflows in .github/workflows/frontend.yml

## Outstanding independent gates

Human editorial review of 108 master manuscripts, 24 real-audio listening checks, library rights/source alignment, actual OTP delivery, cross-device browser tests, AI provider acceptance and Codex pronunciation V3 PR #30 remain separate. Passing CI does not close any of these.
