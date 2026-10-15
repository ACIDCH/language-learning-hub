# Architecture Decision Record — Phase 00

**Status:** Proposed, awaiting owner review. Not a deployed design.

## 1. Isolation and ownership

| Platform | Responsibility | Boundaries |
| --- | --- | --- |
| GitHub: `ACIDCH/language-learning-hub` (PUBLIC) | Frontend, public documentation, versioned code, tests, CI, and **small, individually license-verified open learning assets** | No commercial course scans, private files, recordings, secrets, or changes to existing websites |
| Google Drive: YUNPAN / Language-Learning-Hub | **Private** source-of-truth: personal/licensed private course assets, notes, AI personalized content, exported backups | Private by default; do not treat Drive as high-frequency relational storage |
| Supabase: `language-learning-hub`, region `ap-southeast-2` | Auth, Postgres metadata and user learning state, Edge Functions, agent job/audit records | Separate from other projects; no original textbook PDFs/media binaries stored in Postgres |
| Third-party models and open source | ASR, forced alignment, pronunciation evaluation, grammar and LLM assistance | Adapters and explicit cost/privacy controls; evaluate licences |

Existing site `ACIDCH/ACIDCH.github.io` is out of scope and must never be changed by this project.

## 2. Runtime flow

1. React/TypeScript frontend loads catalog and user state from Supabase.
2. The asset index resolves each lesson asset to one of three locations: `github_public` (approved distributable and small), `google_drive_private` (private or personally licensed) or `external_link` (licensed remote resource); a revision and provenance always travel with the reference.
3. Approved GitHub public assets load without OAuth; Google Drive private assets require limited OAuth (or a separate authorized server-side flow for unattended agents).
4. Course content and audio load only from their authorized location. IndexedDB caches assets if their license and privacy classification permit.
5. Text / personal learning requests route through an authenticated Edge Function to an AI Provider Adapter. Secrets remain in server-side secret storage.
6. Speech practice records only a short temporary audio segment. ASR / alignment and an independently validated pronunciation engine return word spans and error levels.
7. Frontend renders word colors and correction suggestions. No aggregate score, no placement test, no recurring language exam.
8. Content agent produces drafts linked to authoritative sources. Only validated, approved assets become permanent Google Drive files; Supabase stores metadata and index.
9. Engineering agent operates only against this repository through a reviewable branch and pull request.

## 3. Content data design

**Split file ownership:** private/personal learning resources belong to Google Drive; small publicly redistributable content can belong to this public GitHub repository. Supabase only indexes resources and their stable version/provenance, and never contains duplicate textbook/audio binaries. Each asset has exactly one canonical location (avoid unnecessary duplication).

Proposed tables (schema not yet deployed):

- `courses`: id, language, CEFR level, title, status
- `lessons`: id, course_id, sequence, title, source_reference_id, content_asset_id
- `grammar_points`: id, language, slug, level, prerequisites
- `lesson_grammar`: lesson_id, grammar_point_id
- `content_assets`: id, storage_kind (`google_drive_private|github_public|external_link`), storage_locator (Drive file ID, repository-relative path, or external URL), asset_type, checksum/revision, media_duration, attribution/license_status
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

Each indexed item has a stable UUID, storage kind and locator, canonical source, individual license/usage restrictions, revision, language, level, format and lesson relationship. No unauthorized mass redistribution of commercial texts/media.

## 4a. Public learning assets in GitHub

- Only in `public/learning-assets/`, and only after per-item checks recorded in the `manifest.json` (original source URL, creator, permission, license URL, attribution, verification date, checksum and size). The repository being public, free-to-view, or free-to-download does **not** grant redistribution rights.
- Prioritize small self-authored examples, public-domain materials (e.g. qualifying VOA Learning English original media, **excluding** third-party AP/Reuters/AFP media), and clearly attributed CC0/CC BY or compatible share-alike assets. Do not upload Hachette Inspire/Cosmopolite textbooks or publisher audio without separate express redistribution permission.
- Initial governance budget: public learning assets <= 200 MB total; <= 5 MiB per file without a specific exception. Aim below GitHub Pages' 1GB published-site ceiling; large archives and model weights remain outside the Pages build.
- Do not put user recordings, personalized AI responses containing private material, OAuth tokens, private PDFs, or entire raw speech corpora in GitHub. 
- Public source code and included third-party educational content may have **different licenses**. Preserve attribution next to the resource; converting/remixing a work may impose ShareAlike conditions.
- Changes to public assets must pass manifest/hash checks and a human review before merging. See `docs/public-asset-policy.md`.

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

## 7. Deployment model

The new GitHub repository is now **PUBLIC** by the owner's choice. It may use GitHub Pages on a Free plan. Host it as a distinct *project* site under `/language-learning-hub/`, not as a replacement for `ACIDCH.github.io`; build output must use the project base path. GitHub Pages is static hosting; secrets, Google Drive private resources and Supabase service-role credentials must NEVER be included in the deployment artifact. Proposed Pages setup is not yet enabled, nor is the application deployed.

## 8. Delivery gates

00 — Isolation completed; architecture, database design, API contracts and security permissions reviewed.
01 — UX prototype reviewed by owner before coding core UI.
02 — One French + one English representative lesson with source+audio mapping and legal provenance.
03 — Grammar/audio/player/personal file learning paths work.
04 — Speech evaluator shows calibrated word colors without aggregate scores.
05 — Provider adapters and content agent generate source-linked draft lessons.
06 — Engineering agent limited to new-branch reviewable PR.
07 — End-to-end, cost, sync and privacy verification before production publishing.
