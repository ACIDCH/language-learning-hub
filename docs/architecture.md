# Architecture Decision Record — Phase 00

**Status:** Proposed, awaiting owner review. Not a deployed design.

## 1. Isolation and ownership

| Platform | Responsibility | Boundaries |
| --- | --- | --- |
| GitHub: `ACIDCH/language-learning-hub` | Frontend, technical specs, versioned code, tests, CI | No course files, audio, user recordings, credentials, or modifications to existing websites |
| Google Drive: YUNPAN / Language-Learning-Hub | Authoritative course assets, legal/licensed recordings, personal notes, generated learning content, exported backups | Private by default; do not treat Drive as high-frequency relational storage |
| Supabase: `language-learning-hub`, region `ap-southeast-2` | Auth, Postgres metadata and user learning state, Edge Functions, agent job/audit records | Separate from other projects; no original textbook PDFs/media binaries stored in Postgres |
| Third-party models and open source | ASR, forced alignment, pronunciation evaluation, grammar and LLM assistance | Adapters and explicit cost/privacy controls; evaluate licences |

Existing site `ACIDCH/ACIDCH.github.io` is out of scope and must never be changed by this project.

## 2. Runtime flow

1. React/TypeScript frontend loads catalog and user state from Supabase.
2. An asset index resolves a lesson's authorized Google Drive ID and revision into a retrieval operation.
3. Drive OAuth grants limited access; browser-side reads are preferred for interactive user-owned files, or a server-side authorized flow is used for unattended agents.
4. Course content and audio stream from Drive or a properly licensed external source. IndexedDB caches permitted assets.
5. Text / personal learning requests route through an authenticated Edge Function to an AI Provider Adapter. Secrets remain in server-side secret storage.
6. Speech practice records only a short temporary audio segment. ASR / alignment and an independently validated pronunciation engine return word spans and error levels.
7. Frontend renders word colors and correction suggestions. No aggregate score, no placement test, no recurring language exam.
8. Content agent produces drafts linked to authoritative sources. Only validated, approved assets become permanent Google Drive files; Supabase stores metadata and index.
9. Engineering agent operates only against this repository through a reviewable branch and pull request.

## 3. Content data design

Source of truth: **Google Drive files**. Postgres records IDs and relationships, not duplicate course documents.

Proposed tables (schema not yet deployed):

- `courses`: id, language, CEFR level, title, status
- `lessons`: id, course_id, sequence, title, source_reference_id, content_asset_id
- `grammar_points`: id, language, slug, level, prerequisites
- `lesson_grammar`: lesson_id, grammar_point_id
- `content_assets`: id, drive_file_id, asset_type, checksum/revision, media_duration, copyright_status
- `source_registry`: id, organization, canonical_url, author, license, restrictions, verified_at
- `learning_progress`: user_id, lesson_id, last_position, updated_at
- `pronunciation_feedback`: user_id, lesson_id, word_text, word_start_ms, word_end_ms, color_category, issue_code, confidence, model_version, created_at (NO raw audio by default)
- `generated_content`: id, user_id, lesson_id, drive_file_id, provider/model, provenance, approval_state, revision
- `ai_jobs` / `audit_logs`: user/actor, task type, state, changes, timestamps and errors without secrets

All tables exposed to clients require Row-Level Security and restrictive ownership policies. Avoid `service_role` keys in clients. Do not authorize based on client-editable user metadata.

## 4. Drive folders

- `00-System/` configs, index exports and backup manifests
- `01-English/` authoritative English materials
- `02-French/` authoritative French materials (Inspire 1 A1 as a curriculum reference)
- `03-Personal/` user-supplied lawful course files and notes
- `04-AI-Generated/` model-generated drafts and approved user content
- `05-Learning-Records/` export/backup files (not a database replica for live reads)
- `06-Source-Registry/` licenses and content-origin records

Each indexed item has a stable internal UUID, Drive ID, source, legal-use indicator, revision, language, level, format and relationship to a lesson. No unauthorized mass redistribution of commercial texts/media.

## 5. Pronunciation design

Input: language, expected text, short temporary recorded audio, variant (e.g. en-US / fr-FR). Processing: ASR for transcript aid, forced alignment for temporal localization, validated mispronunciation detection for deviations. Output: word spans, color class `green|yellow|orange|red|neutral`, optional evidence-backed phoneme issues and corrective hints.

Do not treat ASR transcript equality as evidence of correct pronunciation. Normal regional/foreign accent variations must not automatically be marked wrong. The decision thresholds and false-positive rates must be evaluated independently per language. When uncertain use neutral, never fabricate actual phoneme labels.

Candidate modules: OpenPronounce, GOPT, Montreal Forced Aligner and optional professional pronunciation assessment API; all remain hypotheses until practical tests.

## 6. Security and cost controls

- Only authenticated users may access protected learning records and agent APIs.
- Secrets/refresh tokens stay in platform secret managers, never in GitHub files, Drive learning folders, HTML bundles or JS.
- Drive OAuth scopes must be minimal and consent-driven; long-lived background access requires a separate secure authorization flow.
- AI provider adapters enforce allowlisted endpoints, per-provider spending limits, request quotas, timeouts, logs with redaction and fallbacks.
- A code agent can open PRs and run tests; important changes require human approval before merge and deploy. Never mutate the existing personal website repo.
- Speech uploads should be memory/transient only by default; establish explicit retention/consent for any recording storage.
- To stay within 15GB shared Google-account space: plan around 1GB initial, alert at 3GB project use, target cap 5GB; verify actual free account space before adding large audio sets.
- Supabase free plan quotas, database inactivity policy, model/API fees and static hosting entitlement must be verified before launch.

## 7. Deployment caveat

The new GitHub repository is PRIVATE. GitHub Pages on private repositories is not offered to GitHub Free personal accounts. Do not change repo visibility without owner approval. Later choose GitHub Pages when entitlement permits, or private-repo-compatible static hosting, preserving the existing site's independence.

## 8. Delivery gates

00 — Isolation completed; architecture, database design, API contracts and security permissions reviewed.
01 — UX prototype reviewed by owner before coding core UI.
02 — One French + one English representative lesson with source+audio mapping and legal provenance.
03 — Grammar/audio/player/personal file learning paths work.
04 — Speech evaluator shows calibrated word colors without aggregate scores.
05 — Provider adapters and content agent generate source-linked draft lessons.
06 — Engineering agent limited to new-branch reviewable PR.
07 — End-to-end, cost, sync and privacy verification before production publishing.
