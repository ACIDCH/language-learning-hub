# Private V4 lesson text cloud sync

Goal: personal access to full authored lesson drafts from a **signed-in** Cloudflare Pages session, while Google Drive YUNPAN remains the canonical document store. The Supabase table is a **small derived text cache**, not a replacement for Drive.

## Authoritative sources and migration

- Drive root: YUNPAN / Language-Learning-Hub / 00-System / 个人系统 V4 — 108课整合与验收 2026-10-17.
- Original V4 backup ZIP contains an editorial snapshot; individual A1 integrated Markdown files are also present. No archive or Drive OAuth token enters the public GitHub repository.
- `supabase/migrations/20261018102000_private_lesson_content.sql` adds `public.private_lesson_content` with `(user_id, course_id)` primary key.
- RLS requires `auth.uid() = user_id`; anonymous access is revoked. A direct read by another signed-in account returns no rows.
- Do **not** change `course_catalog.publishable`, `text_complete` or `QA_approved` simply because a draft body is imported.
- Each imported text retains source Drive file ID, version, content hash, `qa_status='draft'`, timestamp. Those source IDs are never returned from the Worker endpoint.
- Only authored Markdown/text drafts are eligible for snapshot sync. Licensed textbook PDFs and bulk audio stay private in Drive; user voice recordings are not retained.

## API

`GET /v1/private-courses/{course_id}`
- Requires real Supabase Auth `Bearer` session.
- Uses existing `SUPABASE_PUBLISHABLE_KEY` and caller JWT, never service role.
- Uses verified account ID plus PostgreSQL RLS.
- Returns `{lesson:{course_id,content_body,source_version,qa_status,updated_at}}`, `404 lesson_not_synced` when absent, `401` when unauthorized.
- `Cache-Control: no-store`, strict frontend origin; no public CDN caching of private manuscripts.
- No public write/import API yet. Future syncing tools must authenticate, validate content and preserve canonical Drive content. Detailed QA and content provenance remain separate gates.

## Web

`/cloud/` displays personal full text after authentication alongside progress, or a truthful not-synced message; no new subscription or account is required. The original public course page remains unchanged. New frontend pages do not link directly to Google Drive private file URLs.

## Acceptance

1. PR CI (frontend TypeScript build and Worker mock authentication tests).
2. Supabase migration completes without affecting current 108 catalog rows and existing learning progress.
3. Import a verified set of V4 private Markdown drafts, hash and source references included.
4. Live known-user login and content check; test second account cannot read the owner's manuscripts.
5. Confirm cloud progress still persists, the original Drive files remain unchanged, API does not reveal Drive IDs, and a course without a draft shows an honest missing state.
6. Only after these gates, expand import coverage beyond initial A1 drafts and add normal-quality instructional audio by a separate authorized delivery mechanism.

## First private-source import (completed before PR merge)

YUNPAN's 12 `fr-a1-u01` through `fr-a1-u12` integrated V4 Markdown drafts
were read and inserted into the existing owner's private table using the
authorized Supabase management connection. Post-import SQL verification:
12 distinct rows, 53,040 characters, 12 nonempty SHA-256 hashes, all
`qa_status='draft'`. Current public `course_catalog` still contains
108 rows, with zero flagged publishable/QA-approved. The existing progress
records remain in place.

## Fill the remaining courses without a new OAuth/Cloud account

The original YUNPAN V4 ZIP is **not** hosted as a public asset. When the
signed-in owner selects this archive on `/cloud/`, the client:
1. Loads only its `courses.json` entry and caps ZIP input/decompression.
2. Checks exactly 108 unique valid course IDs against the logged-in catalog.
3. Computes SHA-256 for each text draft.
4. Uses the user's own Supabase Auth session and table RLS to insert only
   missing rows in batches of eight. Existing 12 Drive-derived A1 rows
   are never overwritten.
5. Keeps `qa_status='draft'`, does not alter `course_catalog` flags, and
   does not upload ZIP/audio/PDF blobs to Supabase.

This single file-selection action replaces uploading 96 manuscripts manually.
The backup ZIP is around 715 KB; total manuscript text is approximately
580 KB inside courses.json. Import success and cross-device reading must be
verified in a real browser before claiming all 108 are available.
