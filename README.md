# Language Learning Hub

An independent English–French learning platform. **Public code and individually approved open assets; private personal learning data.**

## Status
**Phase 00 — infrastructure and architecture (in progress).** The project is not deployed and does not yet have learning features.

## Architecture boundaries
- **This public GitHub repository:** source code, tests, technical specifications, CI/CD and small **license-verified, redistributable** learning assets in `public/learning-assets/` only.
- **Google Drive (YUNPAN):** private source-of-truth for commercial/personal course files, private audio, personal materials and AI-generated learning documents. Root folder: `Language-Learning-Hub`.
- **Dedicated Supabase project:** `language-learning-hub` (Sydney region); authentication, relational metadata, learning state, job audit trails and secure API endpoints. **Do not upload textbook/audio binaries to the database.**
- **Third-party/open-source engines:** only via replaceable adapters; pronunciation assessment must be independently validated for English and French.
- **AI agents:** separate content and engineering agents. Engineering agent changes require a branch, tests and an approved pull request.

## Product rules
1. **English:** IELTS Academic-style integrated skills for an established English learner (48 planned units across Listening, Reading, Writing Task 1, Writing Task 2, Speaking and Language Upgrade); **no compulsory beginner alphabet, numbers or greeting lessons**. **French:** systematic A1-to-C2 learning (60 planned units) starting with authentic A1 foundations. Both follow the same six-segment learning chain.
2. No placement tests, scheduled learning exams or overall pronunciation scores.
3. Pronunciation feedback is word-level color highlighting (green, yellow, orange, red), plus a neutral "uncertain" state. Phoneme explanations require adequate evidence.
4. Personal content remains private. Public third-party audio/text requires **item-level redistribution rights**, license compliance and attribution (see `docs/public-asset-policy.md`).
5. Content is grounded in traceable sources; AI additions are versioned and kept separate from authoritative materials.
6. Never commit API keys, OAuth credentials, refresh tokens, personal recordings or private course files.

## Curriculum and storage status (October 2026)
- `config/curriculum/units.v2.json`: 108 planned unit outlines (English IELTS 48, French CEFR 60), **not completed lessons**.
- `config/resources/sources.json`: 32 curated source-entry candidates. Third-party content is normally linked, not reproduced.
- Private YUNPAN Google Drive stores the two curriculum documents and two **original draft learning lessons**. There are no production-integrated audio lessons yet.
- The public repository contains no personal learning data, API keys, proprietary textbooks, or copied IELTS practice tests.
- Frontend design remains review-first: examples, then user approval, then a separate PR and deployment.

## Delivery sequence
00. Platform isolation, permissions, architecture and interface contracts
01. Frontend prototype for review (no deployment without approval)
02. IELTS-style English (48-unit outline) and foundational French (60-unit outline), independent private Google Drive lesson storage, official source indexing
03. Grammar, listening, playback and personal learning
04. Pronunciation alignment, quality validation and word color feedback
05. Multiple AI API providers and learner content agent
06. Engineering maintenance agent (PR-only changes)
07. End-to-end testing, security, backup and optimization

## Deployment notice
Repository visibility is **PUBLIC** as approved by the owner. Future deployment may use GitHub Pages at a dedicated project path. This repo does **not** replace `ACIDCH.github.io`. No Pages site or learning app has been deployed yet. Approved public assets are capped at a conservative initial 200 MB (5 MiB each by default). Private data belongs in Drive; only non-secret identifiers and metadata belong in Supabase.

## Isolation
Do **not** write project files into `ACIDCH/ACIDCH.github.io` or `ACIDCH/ACIDCH`. No operational dependency on either existing repository is permitted.
