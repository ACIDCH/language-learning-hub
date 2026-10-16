# Academic English U05 + French C1 original lesson manuscripts V0.9

Created and read back in owner-authorized private Google Drive on 2026-10-16. This public pull request records **14 distinct curriculum-aligned unit IDs**, not the sensitive full textbooks, private Drive document IDs or audio binaries.

## Written manuscripts

- French C1 U01–U08 (8 units) contains original scenario/dialogue, C1-specific semantic/pragmatic grammar, advanced collocation practice, authored reading passages, **48 worked questions**, pronunciation targets and extended speaking/writing examples.
- English IELTS-style U05 across six tracks (6 units): Listening/detail distractors, Reading/paraphrase reference, Writing Task 1/process passive, Writing Task 2/advantages and disadvantages, Speaking/comparisons and causes, Language Upgrade/hedging and inference. These contain **47 worked questions** and sample outputs.
- C1 docs live only in the private owner folder `02-French/03-Expanded-Lesson-Manuscripts/Assistant-C1-Original-Manuscripts-V0.9-2026-10-16`. IELTS U05 docs live in `01-English/IELTS-Academic/Assistant-IELTS-U05-Original-Manuscripts-V0.9-2026-10-16`.
- No existing Codex content, sound assets, React source, Supabase schema, or user personal-site repository was overwritten.

## Strict truth

`six_stage_original_draft=true` is an authored editorial status, **not** a production completion certificate. Original reference narration has not been aligned with these new passages. No independent French expert / IELTS subject QA approval has been completed.

All `text_complete`, `exact_audio_verified`, `expert_QA_approved` and `publishable` are **false**.

Combining prior draft work: V0.6 18 + V0.7 16 + V0.8 10 + V0.9 14 = **58 different unit IDs** in the editorial pipeline. This is not an official completion percentage; it overlaps Codex's prior 19 substantive drafts and must not be summed with them.

## Integration method

1. Use existing 108-unit catalog as the identity authority.
2. Server-side authenticated access to the private Drive master editorial index maps 14 unit IDs to four complete original Google Docs. Never embed private file identifiers in public JavaScript.
3. Parse distinct `fr-c1-uXX` and `en-ielts-...` markers, preserving each original dialogue, grammar, vocabulary, reading, questions, all answer keys and model outputs.
4. Before advancing states, review grammatical quality and CEFR/IELTS appropriateness, confirm source rights, and obtain accurate, copyright-appropriate original media where needed.
5. Audio ZIPs imported for basic Français interactif or Inspire A1 are **not** matching narrations of original French C1 or English IELTS U05 text. Validate byte hash, transcript match and playback.
6. Keep prior V0.4 and later Codex manuscripts versioned side-by-side; reconcile through editorial review. Do not auto-replace existing content, merge PRs or deploy without owner review.
