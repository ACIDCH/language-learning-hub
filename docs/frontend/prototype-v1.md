# Frontend prototype: academic-clean learning interface

**Status:** Phase 02 branch for user review. Public lesson texts are snapshots copied verbatim from the owner-controlled, private YUNPAN course documents on 2026-10-16.

## User-approved decisions

- Academic-clean colors: navy / soft blue / white; responsive desktop/tablet/mobile.
- Remove generic marketing statements from the application home page (no "Develop your academic English", no "从学术语言到自然表达").
- Distinguish actual authored lessons from planned unit specifications.
- Never hide, shorten, paraphrase, or truncate the body of an authored lesson for UI convenience; preserve all headings, examples, practice questions, answers, notes, addenda, and original references.
- Six stage buttons locate the corresponding position in the **full** text; they do not filter out other sections.
- English = IELTS Academic-style structured skills; 48 planned units across 6 tracks.
- French = A1-to-C2 path; 60 planned units, starting from French A1 zero basics.
- Do not present placement tests, regular exams, or sentence-wide pronunciation scores.

## Current frontend behavior

1. Switch English/French without cross-contamination of existing site content.
2. Choose one of 6 English skill tracks or French A1–C2 level.
3. Search within the selected category and see each unit's title.
4. Open one of 6 authored **non-personal** public sample lesson snapshots and read the entire original text, including appended V0.2 supplements.
5. For 102 outlined units without course material, show only the full learning specification and clear "not yet authored" state; never fabricate media.
6. Browse 32 curated source entries and open original provider websites.
7. Use accessible desktop/mobile navigation; no credentials or Supabase secrets are baked into the frontend.

## Source-of-truth and publication model

- Original project-owned complete lesson documents are in **private** Google Drive/YUNPAN and remain authoritative working sources.
- The 6 project-original **non-personal sample** full-text snapshots are stored in public `public/learning-assets/` as approved teaching-site publication assets. They have a manifest, explicit `Project-Owned-Public-Display` legal tag, SHA-256 and a source audit note. This does **not** apply a CC BY licence to the owner's content.
- The app loads each static text with fetch using the GitHub Pages base path. It renders every line with `text.split(/\r?\n/).map(...)` without `slice` or a maximum height, and displays an error if the file cannot be loaded.
- Updating a master Google Doc does not yet update the static public snapshot automatically; the authoring agent will need a deliberate per-asset content sync with permission review and full-file comparison in a later phase.
- Individual personalised lesson data, Google Drive OAuth tokens, and any course files not approved as public examples **must never** be copied into this public folder.

## Functional limits

- Current site is a static front-end prototype, not an authenticated Supabase learning application.
- Google Drive/Supabase integrations require separate OAuth/Auth and RLS implementation.
- 6 authored sample lessons are full text but don't yet have individually cleared real audio files. The app shows the actual absence of audio and never a fake playback button.
- 108 total planned units **does not** imply 108 full lessons; 102 remain outline-only.
- Private user notes, learning progress, pronunciation engine, multi-AI provider, audio playback, and deployment are not in this PR.

## GitHub Pages

When owner approves this PR, deploy the independent **project site** `/language-learning-hub/`, not the `ACIDCH.github.io` root site. Vite base is configured accordingly. Project page hosting itself is a later explicit step; do not modify any other repository.

## Verification gates

- `npm run build` executes TypeScript checks and Vite bundling on GitHub Actions.
- Static public asset validator checks exact file hashes, total budget, allowed locations and manifest.
- Curriculum validator ensures the English 48 / French 60 structure is not accidentally changed.
- Source registry validator ensures official source entry references stay consistent.
- Visual, keyboard, and browser quality still need human review; automated build success alone is insufficient.
