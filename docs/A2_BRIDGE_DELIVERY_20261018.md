# English & French A1→A2 bridge — 24 new short lessons

## What has been authored

A new supplementary sequence adds 12 independently written **English** drafts `en-fnd-13`–`en-fnd-24` and 12 **French** drafts `fr-fnd-13`–`fr-fnd-24` to the 24 original beginner lessons, yielding **48** short lessons. Existing 108 main course catalog records, their original/private manuscript text, 24 original private A1 MP3, user progress and all approval flags remain intact.

Each of the 24 new drafts has: a specific communicative goal, 3 rule explanations, 3 model utterances, 4 or more vocabulary items with Chinese meaning, one synthetic-device-TTS listening script, one independent reading passage, 2 explained concept questions, 4 generated vocabulary meaning checks, an output task, a pronunciation focus and a warned common error. Existing tests require unique IDs, all six teaching dimensions and distinct correct answers.

### English bridge outline

13 WH-questions; 14 present simple vs continuous; 15 simple past; 16 irregular past; 17 future plans; 18 countability/shopping; 19 comparisons; 20 modal verbs; 21 directions; 22 introductory present perfect; 23 paragraph cohesion; 24 email/reflective writing.

### French bridge outline

13 negatives and questions; 14 passé composé with avoir; 15 être and participle agreement; 16 imparfait background; 17 futur proche; 18 futur simple; 19 direct/indirect pronouns; 20 partitive and shopping; 21 comparisons; 22 realistic conditional si-clauses; 23 coherence; 24 integrated personal email.

## Data model / progress

- Added only a constraint extension on the existing owner-RLS `foundation_progress.lesson_id`, allowing unit IDs 13–24 for each language. No rows deleted or renamed, and old 01–12 progress remains compatible.
- New units are part of the same `FoundationStudio` content UI, quiz feedback, card recall and private progress flow.
- Voice playback uses the device's browser TTS and does **not** claim actual independently recorded phonetics.
- V3 professional pronunciation work by Codex Issue #20 and optional AI Teacher remain untouched.

## Important limitations

This is 48 **short authored draft units**, not a finished commercial A2 textbook, a new certified CEFR curriculum or 48 human-approved courses. A2 paragraphs, culturally varied audio, listening comprehension, test psychometrics, idiomatic fluency and expert linguistic review still require ongoing work. These 48 supplements are not to be added to the historical 108-course main catalog count. The user-facing total should say **108 main units + 48 separate foundation/bridge units**.

## Acceptance gates

1. TypeScript/Vite CI and unit tests green; no client secret in Pages build.
2. Supabase old progress keys 01–12 remain; new IDs 13–24 may be inserted under owner's RLS without changing any existing progress or main course.
3. Browser: open both EN 24 and FR 24, complete a bridge quiz, save, refresh and confirm the result in owner-scoped Supabase.
4. Content: second-person review each of the new explanations and answer keys; mark drafts as pending, not professionally verified.
