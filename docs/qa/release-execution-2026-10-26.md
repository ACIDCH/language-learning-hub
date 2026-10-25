# Release execution evidence — 2026-10-26

Scope: PR #50 preview and release-gate verification. This record distinguishes automated/Codex checks from independent human acceptance.

## Content and release inventory

- Automated V4.4 validator: 156/156 non-empty learning pages (`108` main + `48` foundation), including 101 bundled drafts, 7 retained main originals and 48 foundation units.
- Machine-generated specialty inventory: 327/327 routed topics with current content SHA-256 fingerprints.
- Independent human course approval: 0/156. Independent human specialty approval: 0/327.
- Licensed, source-aligned, human-listened natural course audio: 0/156.
- Structural completeness is not treated as semantic approval or publication authority.

## Real preview checks performed by Codex

Preview checked: `https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/`.

- Public catalog loaded and exposed all 156 courses plus language/level filters.
- English `en-ielts-listening-u01` opened. Context and grammar stages rendered bilingual teaching, four grammar specialties, five vocabulary specialties, exercises and local guest notes.
- French `fr-a1-u01` opened. The A1 context rendered French/Chinese sentence mapping and its five-stage navigation.
- Legacy deep link `/speech-lab#ipa-studio` resolved to the full-text IPA tool. The supplied French passage generated visible per-word reference IPA.
- Preview Pages root, fixed Pages build, Worker `/health`, and Worker `/v1/status` returned HTTP 200. Worker reported the integration stage and configured catalog/progress modules.

These are real preview browser checks, but they do not establish microphone quality, audible TTS quality, authenticated private data restoration, real provider inference, or two-device acceptance.

## Automated evidence

- TypeScript check, V4.4 suite, speech suite, production preview build, Worker syntax/tests, source-integrity gate, and release queue were executed for the final commit.
- Worker suite covers 28 cases including authenticated/RLS progress paths, size rejection, CAS conflicts, monotonic revisions, provider-key isolation and restricted CORS.
- `release:check` remains intentionally blocked while human/device evidence is absent.

## Owner action required

1. Enable leaked-password protection in Supabase Dashboard → Authentication → Security/Password protection, then re-run the security advisor.
2. Use two independent physical devices and the same real account to verify save, refresh, sign-out/sign-in restore, and a deliberate concurrent-write conflict without data loss.
3. On desktop and mobile, listen to real English and French device voices, test pause/resume/rate/fallback, and confirm that the UI labels the output as device TTS rather than natural course audio.
4. Test configured OpenRouter/DeepSeek/Gemini accounts with the owner's own keys and quotas. Do not place keys in issue comments or evidence files.
5. Independent reviewers must sign the 156 course and 327 specialty review packets before production authorization.

Disposition: **ENGINEERING READY / RELEASE BLOCKED**. No main merge or stable deployment was performed.
