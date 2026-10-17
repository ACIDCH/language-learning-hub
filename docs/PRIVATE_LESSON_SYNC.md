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
