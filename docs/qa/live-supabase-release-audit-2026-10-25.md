# Language Learning Hub — live backend release audit
**Date:** 2026-10-25, Auckland time. **Mode:** Connected Supabase **read-only** project inspections; no schema or user data changes.

## What was actually inspected

- Project **language-learning-hub** reports `ACTIVE_HEALTHY` (Sydney `ap-southeast-2`, PostgreSQL 17).
- Published schema inventory: `course_catalog` 108 rows; `learning_progress` 5 rows; `private_lesson_content` 116 rows; `course_audio_index` 377 rows; `foundation_progress` 0 rows; `lesson_editorial_reviews` 0; `audio_editorial_reviews` 0. These are index/row counts, **not content quality or successful authenticated end-to-end tests**.
- The `expand_foundation_learning_answers` migration is present in database migration history. Actual live `foundation_progress_answers_check` accepts object JSONB up to **262,144 bytes**; the frontend retains its lower **192 KiB** guard. Notes check remains 5000 characters and `(user_id,lesson_id)` remains the primary key.
- All 14 listed `public` application tables have RLS enabled. A separate policy/security inspection is still required for full production certification; a list showing RLS enabled does not prove every user-scoped API flow.
- Audio index: **353 `open_reference`** items decoded, **0 mapped to lessons**, **0 verified**; **24 `synthetic_practice`** items decoded, **24 mapped**, **0 verified**. No reference recording is proven to read a current P1–P4 authored passage.
- Security advisory report: one *INFO* `rls_enabled_no_policy` on `user_ai_credentials`; that table is deliberately not directly exposed to browser writes and is accessed via RPC. Three *WARN* advisories on authenticated `SECURITY DEFINER` Vault CRUD RPCs; read-only inspection confirmed all three guard `auth.uid()`, restrict the provider allowlist and set an empty `search_path`. These advisory signals require acceptance review, not blind removal of the RPCs. Another *WARN*: leaked-password protection is disabled in Supabase Auth settings; enable/review in the dashboard before broad access.

## What this evidence does **not** prove

Authenticated refresh→relogin→two-device persistence is **not** established by the 5 existing `learning_progress` rows. Zero foundation-progress rows means no production record demonstrates foundation answer restore. The 377 decoded audio references are not accepted recording-to-text alignments. Live Pages and Worker URLs were not independently verifiable using this session's external site fetch; no claims of live deployment or browser media playback are made.

## Practical production modes

- The default `verified_natural` release track requires individually signed lesson/paragraph recording references (0/156 currently accepted).
- A separate `device_tts` release track can be reviewed for a **TTS-only** learner version. It requires independently documented English/French voice playback on desktop/mobile, a no-voice fallback check and explicit non-original-audio labelling, **plus** all existing course/topic/editorial/device/browser acceptance. Merely changing a flag cannot pass this gate.
- Keep PR #50 Draft while release evidence is absent. Run `npm run release:report` and `npm run release:queue`, then actual interactive acceptance using a signed-in account, and attach reviewer, date, tested build SHA, defects and resolution evidence.

This report is a snapshot of database and policy metadata on the stated date; it is not a deployment certificate.
