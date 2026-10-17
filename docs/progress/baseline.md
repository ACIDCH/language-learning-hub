# Baseline — 16 October 2026

Scope: ACIDCH/language-learning-hub only. This branch starts at PR #3's `7ac38c7afd685f41aa5ab81da395138686fb59b3`, not the unrelated personal website. PR #3 was open, unmerged and passing four checks at inspection. PR #4 supplied an earlier ingestion proposal, not evidence of binary uploads.

The curriculum registry contains 48 English and 60 French units. Private Drive contained 37 relevant documents: course masters, roadmaps, resource lists and indexes. Eighteen units had substantive six-section teaching drafts (French A1 U01–U12 and the first unit of each English track). The other 90 had expanded outlines with recurring scaffolding. Headings alone do not establish complete teaching content.

The frontend had six original public text snapshots. All six are preserved byte-for-byte against the baseline Git SHA-256 values. Drive masters and these snapshots are different versions; normalized full-text equality is false, so they have not been silently replaced. The private text backup preserves every fetched document, its title, modification time and full UTF-8 text with hashes; it is a text backup, not a lossless backup of Google Docs formatting or history.

The dedicated Supabase project was healthy in Sydney, with no public tables or Edge Functions. No migrations, secrets or production data were changed. Drive root permissions showed only the owner. Available connector metadata did not expose remaining storage quota: capacity remains unverified.

Machine-readable per-unit baseline and gaps: `reports/baseline.csv`, `reports/content-gaps.csv`. Current status: `config/course-completeness.json`.
