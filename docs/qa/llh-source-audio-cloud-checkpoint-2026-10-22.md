# LLH PR #50 — bilingual curriculum, audio and cloud evidence checkpoint (2026-10-22)

> Development and QA record only. **Not learner-facing instructional text.** This checkpoint reports separate evidence categories and **does not grant independent editorial approval**.

## 1. Source-to-lesson review batch

| Course ID | Original-source boundary preserved | Newly written materials | Bilingual coverage in new modules |
|---|---|---|---|
| `en-ielts-listening-u07` | Maya's initial **50 resident interviews**; Leon questions feasibility, not the value of interviews; final **broader survey + 6 volunteer follow-up interviews**, questionnaire size unspecified; no results collected | Four contextual listening paragraphs; full grammar + vocabulary textbooks | 4/4 listening paragraphs, 8 textbook sections with target language + Chinese explanations, 4 evidence questions, Chinese model |
| `en-ielts-listening-u08` | Rereading familiarity is not independent recall; retrieval requires answer checking; spacing **may** help but no universal interval; transfer requires varied contexts; no measured percentage | Four coherent listening paragraphs; full grammar + vocabulary textbooks | Same structure |
| `fr-a2-u03` | Tours direct train cancelled, 11:00 departure via Orléans, change platform; original ticket valid for offered route; next-day travel permits **requesting** reimbursement, not guaranteed acceptance; destination hotel already booked | Four A2-level connected narrative paragraphs; modal/conditional grammar and station-service lexicon | Same structure, A2-appropriate length |
| `fr-a2-u05` | Paul tired for two days, headache; secretary offers an afternoon appointment but **no diagnosis and no exact clock time**; leave-early request, no approval recorded | Four A2-level narrative paragraphs; avoir mal/depuis/advice grammar and appointment lexicon | Same structure, A2-appropriate length |

Original `content/lesson-drafts/<course>.json` files are unchanged. New enrichment is linked through `CourseSpecialtyStage` and `ReceptionStudy` with existing five-phase course navigation, study response persistence, and in-course reading; no new learner-facing navigation entry was added.

**Targeted author-source semantic review:** the four named original transcripts were compared by course ID against question answers, quantities, times, conditions, negations, speaker roles and model-synthesis boundaries. New automated regression tests protect these concrete facts. This is **not** independent human/professional pedagogical QA. All four retain `qa_status=pending`, `audio_status=missing_audio`, and `publishable=false`.

## 2. Coverage method and remaining 156-course Chinese audit

The gap matrix `docs/qa/curriculum-gap-matrix.json` is the source of truth. Following this batch it retains **108 original main + 48 foundation = 156 course IDs**, **98** independent grammar/vocabulary topics (51 grammar + 47 vocabulary), and **26** courses with four-paragraph supplemental bilingual reception. For these four new courses the target-language paragraphs (16 total), their associated Chinese paragraphs, explanatory questions, and summary models are provided, but this does **not** imply every sentence in each original source or the remaining 152 courses has been separately translated and reviewed.

Pre-existing matrix classifications of partial Chinese mapping remain pending where applicable. Do not replace `semanticQA=pending` with `passed` because a test counted translated paragraphs. The next audit must treat native original material, supplementary bilingual reception, grammar/vocabulary tables and exercise answer explanations as distinct coverage categories. Stage completeness is insufficient evidence of idiomatic equivalence.

## 3. Real audio discovery: grounded inventory, not certification

Read-only inspection of the connected project Drive's `Audio` area found:

- A **24-file MP3 collection** labelled `fr-a1-u01` through `fr-a1-u12`, two short files per lesson (`reading` and `dialogue`). Metadata confirms file titles and nonzero sizes, but this pass did **not** download and listen to each file or align it against the current four-paragraph target manuscripts.
- **Three Inspire A1 audio ZIP packages** are stored in the same cloud area. The official A1 course media and the project's own teaching passages are different text sources; their identifiers alone do not establish an alignment, nor automatic permission to publicly redistribute them.
- A previous private audio QA report confirms sampled external phonetics/vocabulary ZIPs contained playable MP3 streams after excluding `__MACOSX` AppleDouble sidecars; it expressly found **no exact original A1 narrative script match** in that sample.

Therefore **zero new natural-voice clip-to-paragraph bindings are approved** for this batch. `ReceptionStudy` continues to disclose device-generated TTS accurately. A valid new binding must contain `courseId`, `paragraphId`, transcript hash, timestamp range/duration, proven readable audio URL or licensed storage reference, codec check, provenance/licensing and listening alignment signoff. Existing audio files are retained; nothing has been mislabelled as professional or natural human speech.

## 4. Cloud account and cross-device recovery verification

The connected **language-learning-hub Supabase project** was queried **read-only**. `foundation_progress` exposes `user_id`, `lesson_id`, JSONB `answers`, `notes`, `completed` and `updated_at`; `user_favorites` exposes owner-linked selected text. Both tables have row-level security enabled, and owner-UID-scoped policies were observed. The main lesson cloud service additionally uses `/v1/progress/<courseId>` as implemented in `useCourseProgress`; this service is not validated by reading only the two Supabase table schemas.

**Not verified:** an authenticated end-to-end write → reload → sign out → authenticate again → retrieve and compare, on two separate browser/device sessions with the same real user account. No user session or real independent browser pair was available through these tools; neither table existence nor mock-based integration tests can prove that scenario. Do not change this gate to passed. No production progress records were modified during this check.

## 5. Next checkpoints

1. Finish the four-course Vitest and Chromium layout acceptance without loosening B2/C1 standards to force A2 word counts; A2 must have meaningful coherent narratives, not arbitrary 350+ word padding.
2. Audit next foundation/A2 course IDs against original examples and instructor corrections; continue 156-course one-by-one Chinese and topic coverage.
3. Download only properly usable candidate audio, verify transcript equality/semantic match and licensed source, then test real playback and switching before any clip mapping is approved.
4. Exercise an actual authorized signed-in user on two sessions; preserve existing work when cloud operations fail. Only then mark cloud acceptance passed.
5. Keep PR #50 open and leave `main` and `stable` untouched.
