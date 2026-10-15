# Parallel implementation and acceptance — frontend UX V3

## Source-control ownership

`main`: production baseline only; no direct frontend/design pushes.  
`phase-02-complete-lessons-frontend` / PR #3: React/Vite initial course interface.  
`phase-03-approved-oer-import`: separate Codex materials/import work (branch existence checked; exact contents not owned or modified here).  
`design/ux-architecture-v3`: **this standalone design/spec/prototype** branch; no shared source paths edited.

**Do not merge this V3 work into Codex implementation prematurely**. Before a joint integration PR, re-read up-to-date branches, identify changed `src/`, `config/`, `supabase/`, `public/` and reconcile feature-by-feature; do not simply force-push or overwrite their code.

## Acceptance gates

### Gate A — design review (this PR)
- User sees and approves course workspace and personal material importer UI.
- Confirm there is no motivational banner or generic slogan.
- Confirm IELTS English doesn't surface English alphabet/numbers/greetings.
- Confirm French A1 starts from foundational learning.
- Confirm all six stages and full-text requirements are explicit.
- Confirm the public prototype has no private data or functional upload pretence.

### Gate B — code integration
- Codex provides actual lesson data and import statuses; verify the contract.
- Convert the approved design tokens/components into current React/Vite app **without deleting original lessons or their sources**.
- Avoid introducing a second router/state system unless required and approved.
- Use actual Supabase Auth/RLS and authorized Drive gateway; all secrets server-side.
- Data fetch states cover `loading/error/offline/needs_review`; no fake media controls.

### Gate C — real browser QA
- Navigate English IELTS, French A1, imported third language, all source links.
- Read a long complete 300-page book without lost chapter/table/exercise/answer content; verify original/converted comparison.
- Test upload from website and import from exact YUNPAN folder, plus 10-30 matching audio files.
- Check keyboard, mobile 360/768/1280 px, reduced motion and minimum contrast.
- Verify no cross-user private data access; test invalid tokens, network failure and malformed ZIP.
- Verify a self-authored language lesson stays complete after AI-generated explanations are added.
- Verify pronunciation colors never appear from empty/ASR-only evidence.

### Gate D — deploy
- After owner approves tests and architecture, merge to main.
- Configure GitHub Pages **project** site `https://acidch.github.io/language-learning-hub/` (planned URL; not claimed live).
- Never change `ACIDCH.github.io` repo or the user's existing root site.
- Auth callbacks and Drive OAuth redirect URLs must match the eventual project path and trusted origins.
- Confirm public build contains **zero** personal documents, OAuth tokens or secret values.

## Definition of done for this design iteration

Deliver `docs/design-v3`, an independently browsable responsive prototype under `design-prototypes/academic-clean`, and an isolated GitHub PR. Auto checks can validate syntax and required states, but actual production frontend and import backend remain Codex integration tasks.

## Suggested PR review order

1. Review this V3 UX design PR and confirm visual/navigation/state interactions.
2. Review or merge PR #3 and Codex import PR(s) in their own priority order after tests.
3. Create a separate V3 **integration** branch from the latest approved main and map contract fields; no direct merge of incompatible app source code.
4. Repeat tests and manual acceptance; deploy only when the user explicitly authorizes publishing.

## Risk log

- **Copyright**: school-provided access is not automatically public reproduction permission; private Drive import rights must be respected.
- **Data loss**: extracted lesson can omit tables or answer pages; require exact source-page comparison and unresolved-error blocking.
- **Drive scope**: OAuth permission can be revoked; show disconnected state and retry safely.
- **Audio alignment**: automatic guessed audio mappings must be reviewable.
- **Long-running workers**: don't assume Edge Functions process multi-hour batch PDF/audio.
- **Public repository**: never commit real personal learning uploads or private course master copies.
- **Concurrent Codex changes**: high conflict risk only when `src/` / `config/` are touched; isolate current branch.
- **Model hallucination**: AI course annotations cannot silently rewrite an instructor-provided textbook passage.

## Open-source reference integration policy

- MIT: shadcn/ui and H5P individual libraries can be evaluated for selective adoption while preserving notices.
- AGPL: Open edX code isn't copied. Document architecture patterns independently and review any adoption separately.
- Avoid adding large frameworks or heavy dependencies for simple route/navigation needs.
