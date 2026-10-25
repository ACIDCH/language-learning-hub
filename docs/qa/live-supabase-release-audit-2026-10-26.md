# Live Supabase release audit — 2026-10-26

Project: `szukmwvyyvjajdjoltzy` (`language-learning-hub`)

Scope: read-only release audit. No schema, policy, Auth setting, secret, or user row was changed.

## Observed controls

- All 14 exposed `public` tables have RLS enabled.
- Owner-scoped progress, settings, Drive, favorites, private lesson content, and editorial review tables have policies. `user_ai_credentials` intentionally has no direct table policy: access is through the three authenticated Vault RPCs.
- `get_my_ai_key`, `set_my_ai_key`, and `delete_my_ai_key` are `SECURITY DEFINER`, pin an empty `search_path`, require `auth.uid()`, constrain provider names, and scope every credential row to that user. Their authenticated execute grants are therefore intentional for the existing client flow. No key values were queried or logged.

## Current advisor findings

- Security: one informational `rls_enabled_no_policy` finding for `user_ai_credentials`; three warnings for the intentional authenticated Vault RPCs described above; leaked-password protection is disabled.
- Performance: missing covering indexes on foreign keys in `audio_editorial_reviews.asset_id`, `lesson_editorial_reviews.course_id`, and `private_lesson_content.course_id`.

## Release disposition

- RLS and credential isolation show no newly demonstrated release-blocking defect in this read-only review.
- Leaked-password protection should be enabled by the project owner in Supabase Auth before a public production release. This is an external console setting and was not changed without authorization.
- The three foreign-key indexes are worthwhile before growth, but are not applied here because this task does not authorize production schema mutation and the current system is personal/small-volume.
- Re-run Supabase security/performance advisors after any authorized database change.

References: Supabase Row Level Security, API-key, password-security, and database-linter documentation queried on 2026-10-26; current Supabase changelog was also checked before this audit.
