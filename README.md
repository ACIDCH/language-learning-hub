# Language Learning Hub

A private, independent English–French learning platform.

## Status
**Phase 00 — infrastructure and architecture (in progress).** The project is not deployed and does not yet have learning features.

## Architecture boundaries
- **This GitHub repository:** source code, tests, technical specifications and CI/CD only.
- **Google Drive (YUNPAN):** source-of-truth for course files, licensed audio, personal materials and AI-generated learning documents. Root folder: `Language-Learning-Hub`.
- **Dedicated Supabase project:** `language-learning-hub` (Sydney region); authentication, relational metadata, learning state, job audit trails and secure API endpoints. **Do not upload textbook/audio binaries to the database.**
- **Third-party/open-source engines:** only via replaceable adapters; pronunciation assessment must be independently validated for English and French.
- **AI agents:** separate content and engineering agents. Engineering agent changes require a branch, tests and an approved pull request.

## Product rules
1. English and French courses include grammar, vocabulary, listening, reading and speaking.
2. No placement tests, scheduled learning exams or overall pronunciation scores.
3. Pronunciation feedback is word-level color highlighting (green, yellow, orange, red), plus a neutral "uncertain" state. Phoneme explanations require adequate evidence.
4. Personal content remains private. Do not publish third-party copyrighted materials without authorization.
5. Content is grounded in traceable sources; AI additions are versioned and kept separate from authoritative materials.
6. Never commit API keys, OAuth credentials, refresh tokens, personal recordings or private course files.

## Delivery sequence
00. Platform isolation, permissions, architecture and interface contracts
01. Frontend prototype for review (no deployment without approval)
02. English/French course indexing and Google Drive integration
03. Grammar, listening, playback and personal learning
04. Pronunciation alignment, quality validation and word color feedback
05. Multiple AI API providers and learner content agent
06. Engineering maintenance agent (PR-only changes)
07. End-to-end testing, security, backup and optimization

## Deployment notice
The repository is currently private. GitHub Pages availability for private repositories depends on the account plan. Keep hosting decisions separate from repository privacy. Do not make this repository public merely to enable hosting without an explicit privacy review.

## Isolation
Do **not** write project files into `ACIDCH/ACIDCH.github.io` or `ACIDCH/ACIDCH`. No operational dependency on either existing repository is permitted.
