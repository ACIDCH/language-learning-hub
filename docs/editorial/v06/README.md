# Editor-owned detailed course manuscripts · V0.6

**Updated 2026-10-16.** This is an integration/quality-status manifest, not the actual completed textbook bundle. Original unabridged manuscript text lives in the owner's **private** YUNPAN Google Drive, where it has been read back after creation.

## Actual work completed

- **French A2 U01–U12**: 12 topic-specific original six-stage textual drafts, including substantial grammar explanations, practical contextual dialogues, vocabulary and collocations, original reading texts, question-specific answer keys, pronunciation targets and applied writing/speaking examples.
- **English IELTS-style**: six distinct detailed textual drafts mapped to:
  - `en-ielts-listening-u03` — paraphrase in academic listening and notes;
  - `en-ielts-reading-u03` — matching headings by paragraph function;
  - `en-ielts-writing-task1-u02` — accurate trend reporting from original fictional data;
  - `en-ielts-writing-task2-u02` — claim, reason, example, qualification;
  - `en-ielts-speaking-u02` — extending answers with coherent evidence, not filler;
  - `en-ielts-language-upgrade-u02` — tense and aspect for evidence-sensitive reports.
- **18 unique course unit IDs** newly deepened and indexed. Existing Codex V0.4 lesson content, public React/frontend branches and original/open licensed media remain untouched.

The owner-visible private Google Doc **EDITORIAL INDEX — 18 Deepened Units V0.6 — Source and QA Registry** maps the exact Drive document identifiers to these stable course IDs. Never copy that map or private original manuscript files into this public repo.

## Precisely what the completion numbers mean

`six_stages_present=true` proves the draft has all six instructional categories; **it does not prove** that licensed media has been aligned, that every source-textbook page is accounted for, that independent language review passed, or that a lesson can be published.

Current editorial-batch states:
- 18/18 IDs present, substantive original six-stage text drafted and Drive-readback verified.
- 0/18 have verified exact relevant media alignments in *this batch*.
- 0/18 have independent qualified subject/language QA approval recorded in *this batch*.
- 0/18 marked fully `text_complete` or `publishable`.

Do not add the 18 to Codex's separately reported 19 substantive drafts without **deduplicating by unit ID**. Do not claim there are now 37 independent finished classes.

## How Codex/front-end can safely ingest these drafts

1. Authenticate the owner and retrieve the **private index** through a credentialled, server-side Google Drive integration.
2. Select the revision for each `unit_id`. For French A2 U07–U12 split the single compiled Google Doc using explicit `fr-a2-uXX` section boundaries, **including the last unit and appendices**.
3. Compare the complete current Codex-author draft, source textbook and newly authored V0.6 content side by side. Keep all versions rather than destructively replacing the earlier V0.4.
4. Diff and reconcile content: correct inaccuracies, check vocabulary and naturalness, compare all exercises/answers, record precise references. Resolve conflicting statements through review, not silent overwrite.
5. Match source materials by chapter/page and audio by asset hash, track number, transcript content, language, recording rights and listen-through verification. A decodable MP3 is not an aligned, reviewed audio lesson.
6. Preserve **all original content** in the lesson reader: text, activities, answer keys, images, audio references and appendices. AI explanations are derivatives, not replacements.
7. Subject-expert review must validate language, accuracy, difficulty, audio and permissions before the unit state advances through `text_complete`, `audio_verified`, `QA_approved`, `publishable`.
8. Publish via a separate reviewed integration PR after Codex's current source branches are reconciled. Never edit `ACIDCH.github.io`.

## QA priorities

- FR A2: check passé composé vs imparfait; object-pronoun referents and agreement; prepositions; indirect questions; subtle register choices; future vs conditional; indirect speech and pronoun `en` contexts.
- IELTS-style English: data integrity, evidence scope, paragraph-function matches, avoiding false causality, reference cohesion, idiomatic collocations, natural spoken answer progression.
- Rights: school-provided Inspire material can be saved and used as specifically authorised; do not infer blanket public redistribution of commercial audio/book PDFs.
- Voice: no unearned aggregate pronunciation score or fabricated phoneme diagnostics.
- Privacy: no Google Drive private document IDs, OAuth refresh tokens, model secrets or personal learner records in a public React bundle.

## Safe concurrent development

This PR owns only `docs/editorial/v06` and its dedicated validation workflow, **no `src`, `config`, `public`, `supabase` or media binaries**. It is not a production deployment and does not alter Codex's running source branch. The last confirmed app prototype PR #3 remains a separate review target.
