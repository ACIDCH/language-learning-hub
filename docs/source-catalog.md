# English and French online learning source registry (Phase 01)

**Status:** curated, verified at source-page level; not yet imported into any learning database or Google Drive. The registry is a discovery/index of public teaching resources, not a claim to redistribute their contents.

## Principles

1. All accessible public web learning sources can be considered for **discovery and navigational linking**; keep source links, creator, topic and CEFR metadata. We do not need every publisher to release its media under an open license to link to legitimate official pages.
2. **Copying/rehosting** PDF, MP3, course videos and entire exercises into public GitHub requires **specific redistribution rights**. Attribution alone does not grant these rights; a CC BY/CC0/public-domain or explicit permission applies subject to its conditions. Respect embeds, access controls and anti-scraping restrictions.
3. **Private personal materials** and authorized personal copies belong in Google Drive, not public GitHub; Google Drive storage must still respect the file's applicable license/terms.
4. Avoid forced tests: source pages may offer placement tests or quizzes, but our learning system does **not** impose any placement or scheduled examinations.
5. Use original teacher/publisher content as a reference, original explanations for user-facing summaries, and the user's own AI API for supplementary *clearly labeled* study content.
6. Only import a public audio file after adding an asset-specific license/sha256/attribution record under `public/learning-assets/manifest.json` and passing the existing CI.

## English sources

| Source | Suitable features | Audio | Integration |
| --- | --- | --- | --- |
| [British Council LearnEnglish Grammar](https://learnenglish.britishcouncil.org/free-resources/grammar) | Structured A1-C1 grammar explanations | Not central to grammar pages | Link only |
| [Cambridge English activities](https://www.cambridgeenglish.org/learning-english/activities-for-learners/) | Grammar, pronunciation, listening and other skill practice | Some lessons | Link only |
| [VOA Learning English](https://learningenglish.voanews.com/) | Slow English listening, reading and spoken examples | Yes | Official link; review original vs third-party rights per asset before copying |
| [Everyday Conversations](https://americanenglish.state.gov/resources/everyday-conversations-learning-american-english) | Real-world dialogue, beginner listening | Yes, MP3 | Official link; review media rights per file before copying |
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Audio) | Individual word/phrase audio | File-dependent | Check each media-file license before rehosting |
| [Mozilla Common Voice](https://commonvoice.mozilla.org/en/datasets) | Open research voice corpora (not a course or teacher-verified standard) | Yes | Use for ASR research only; avoid large bulk download to GitHub |

## French sources

| Source | Suitable features | Audio | Integration |
| --- | --- | --- | --- |
| [Inspire 1 A1 official audio](https://inspire.hachettefle.fr/inspire-1_livre-de-l-eleve_fr.html) | Familiar A1 curricular reference and audio sequence | Yes | Official links; no public copying of Hachette textbook/audio by default |
| [TV5MONDE Apprendre le français](https://apprendre.tv5monde.com/fr/collection-all) | Levelled French comprehension with authentic media | Yes, videos with speech | Link only or officially authorized embed |
| [Français interactif](https://coerll.utexas.edu/coerll/oer/francais-interactif/) | Open first-year curriculum, phonetics and grammatical scaffolding | Yes | Per-item CC BY review |
| [Tex’s French Grammar](https://coerll.utexas.edu/coerll/oer/texs-french-grammar/) | Clear grammar explanations and audio dialogues | Yes | Per-item CC BY review |
| [COERLL French OER collection](https://coerll.utexas.edu/coerll/materials/language/french/) | More intermediate reading, grammar and conversation | Depends on work | License varies: CC BY, CC BY-SA, CC BY-NC-SA |
| [Wikimedia Commons French pronunciation](https://commons.wikimedia.org/wiki/Category:French_pronunciation) | Word pronunciation and pronunciation contrasts | Individual clips | Verify and attribute each media file |
| [Mozilla Common Voice French](https://commonvoice.mozilla.org/fr/datasets) | French ASR/accent corpus research | Yes | Version-level rights; not pedagogical gold-standard |

## Technical ingest contract

Machine-readable discovery seeds: `config/resources/sources.json`.

Each entry contains `id, language, title, organization, url, levels, topics, audio, access, ingestion, license_note`, with optional `rights_url`.

- `ingestion: link_only`: publish link, do not download and rehost media.
- `ingestion: per_item_review_for_public_asset`: review *each* candidate file's rights before hosting, never infer approval from the provider's open-access status.
- `audio: true`: indicates the source includes audio **somewhere**, not every lesson.
- `levels: []`: non-curricular dataset; do not present as a graded course.

After database-schema approval, the indexer will map resources to specific CEFR and grammar point IDs, track canonical URL, source provenance, revision and `github_public|google_drive_private|external_link` for each individual asset. Every public rehosted file must have a manifest record with a checksum, actual license, reviewer and attribution.

## References

- https://learningenglish.voanews.com/p/6861.html
- https://coerll.utexas.edu/coerll/materials/language/french/
- https://inspire1.parcoursdigital.fr/home/mentions_legales
- https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/licenses
