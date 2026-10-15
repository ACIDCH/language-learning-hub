# Language Learning Hub — UI/UX and frontend integration package V3

**Status:** review-only architectural design and independently runnable static demonstration. The course import/content implementation remains owned by Codex in its own branches. **No production application files were edited.**

## Approved product rules

- **No slogans or decorative filler** on the actual site. The landing experience immediately exposes courses, materials and continuation.
- **English:** IELTS Academic-style six tracks (Listening, Reading, Writing Task 1, Writing Task 2, Speaking, Language Upgrade); no compulsory ABC/numbers/basic greetings.
- **French:** systematic zero-foundation A1 through C2.
- Each lesson keeps the full unabridged original work. All six segments are present: context, grammar, vocabulary, reading/listening, pronunciation, practice/production; answers, notes, original page provenance and media metadata preserved.
- Additional languages via language code and program configuration, without cloning the whole frontend code.
- The owner can add personal materials via upload UI or the dedicated **YUNPAN/Language-Learning-Hub/03-Personal/00-Inbox** folder, with a review and approval gate before conversion to personal lessons.
- **No placement tests, timed compulsory exams or overall pronunciation score.** Pronunciation evaluation must have a neutral/unknown state and only evidence-based word-level feedback.
- Separate modules for individual material management, AI explanation, and engineering maintenance; access to external AI API keys only through authenticated, quota-controlled backend.
- Visually **academic clean**: navy, light gray/blue, white; reading legibility before decoration.
- All source code stays in `ACIDCH/language-learning-hub`. Do not modify existing `ACIDCH.github.io`.

## Files

- [Navigation and page specifications](./pages-and-states.md)
- [Design tokens and UI rules](./design-system.md)
- [Runtime, storage and API architecture](./architecture-and-contracts.md)
- [Safe integration and acceptance plan](./integration-plan.md)
- [Standalone interactive prototype](../../design-prototypes/academic-clean/index.html) — no backend; demo content and actions are explicitly marked.

## Concurrent work rules

1. The review branch starts at `main`; it does **not** incorporate or overwrite PR #3 or Codex's `phase-03-approved-oer-import` branch.
2. This PR **only adds** files inside `docs/design-v3/` and `design-prototypes/academic-clean/`, plus an isolated prototype check workflow if needed. No edits to `src/`, `config/`, `package.json`, `supabase/`, `public/learning-assets/` or existing course documents.
3. After Codex submits its module work, map actual APIs and asset manifests to the V3 contracts, rather than cherry-picking conflicting UI implementation files.
4. Future merger is a **separate owner-approved integration PR**, with versioned API contracts and browser tests.

## Reusable open-source inspiration (no copied third-party code in V3 prototype)

- [shadcn/ui](https://github.com/shadcn-ui/ui) — MIT-licensed accessible React component patterns; evaluate if the app adopts Tailwind/Radix, otherwise retain lightweight native controls. Do not blindly replace existing design.
- [H5P Interactive Video](https://github.com/h5p/h5p-interactive-video) — MIT-licensed exercise/annotation interaction ideas; video integration is not a V1 requirement.
- [Open edX Learning MFE](https://github.com/openedx/frontend-app-learning) — useful **architecture reference only** for course outline/progress/player separation; its source code is AGPLv3, so do not copy code without a considered license compatibility decision.
- Third-party design inspirations do not grant rights to educational texts/audio, which require separate licensing.

## Current truth

V3 prototype has mock navigation and local demo states only. It must never say it uploaded to Drive, created Supabase records or evaluated real audio. Production checks still depend on Codex finishing backend authentication and course import functions.
