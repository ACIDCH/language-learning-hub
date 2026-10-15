# Language Learning Hub — English & French instructional framework v1.0

**Phase:** structural curriculum approved for review only; lesson authoring / media attachment / database import not yet complete.

## Design objective

Provide a **coherent, high-quality, detailed bilingual curriculum owned by this project**, not a collection of bookmarks. Ground teaching in the [Council of Europe CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) for communicative outcomes and evaluate French vocabulary/grammar sequencing against [France Éducation international linguistic inventory](https://www.france-education-international.fr/document/cecrl).

There is NO user placement test, compulsory unit test, periodic exam, proficiency score or aggregate pronunciation grade. Learners may freely enter any unit; prerequisites are recommended links, not locked gates.

## Frozen structural coverage

| Level | English units | French units | Intent |
| --- | ---: | ---: | --- |
| A1 | 12 | 12 | Greeting, survival communication, basic grammar and phonetics |
| A2 | 12 | 12 | Everyday experiences, past/future, conversations and practical texts |
| B1 | 10 | 10 | Connected narrative, reasoning, listening comprehension and argument |
| B2 | 10 | 10 | Extended argument, academic/professional communication |
| C1 | 8 | 8 | Precision, synthesis and nuanced discourse (source audit required) |
| C2 | 8 | 8 | Complex synthesis and advanced pragmatics (source audit required) |
| **Total** | **60** | **60** | **120 unit blueprints, not 120 authored full lessons** |

Each unit is made of six integrated **learning segments**:

1. **Situation** — real-world use case, why it matters, measurable can-do description.
2. **Grammar** — accurate structured explanation, formation, use, exceptions, contrasted mistakes and graded self-practice.
3. **Vocabulary** — common words/phrases with part of speech, collocations, meaning, variant and modeled context.
4. **Reception** — source-linked listening and/or reading passages, transcripts when licensed, optional comprehension practice.
5. **Pronunciation** — target phonemes and connected speech, replayable reference audio, shadowing, per-word highlight when calibrated.
6. **Production** — original guided speaking and writing task, in-context self correction and optional AI tutor.

An optional **return to this point** affordance (bookmark or personal error notebook) is allowed, but it is not a scheduled test, placement diagnosis or mandatory revision.

### Key distinction: structural readiness vs material readiness

- **Outline**: an original CEFR-informed unit specification and learning outcome exists (currently **120 units**).
- **Authored lesson**: all six segments have approved original explanations, vocabulary, examples, tasks and references.
- **Media-linked lesson**: actual exact lesson-level permitted audio/readings and usable transcripts are linked (not simply a publisher homepage).
- **Validated lesson**: fact-checked grammar and sources, complete audio mapping, proper attribution and rights, learner review.
- **Released lesson**: website renders it correctly with progress, pronunciation support and privacy controls.

**Do not represent an outline as a complete lesson or all sources as already mapped.** See `config/curriculum/units.v1.json`. The two first original lesson samples are in `docs/curriculum/samples/` and are not released.

## Content quality gate (per authored unit)

Mandatory before publishing any unit:

- CEFR can-do statement; specific learner action; recommend preceding/succeeding knowledge points; free navigation.
- 2-4 primary grammar concepts or fewer if complexity requires, each with explicit form/use, variations, at least 3 contrasting examples and known confusions.
- For A1/A2 typically 12-20 target lexemes/collocations per unit, including meaningful original example usage; adjust density for advanced levels.
- Minimum **8 original example sentences per unit**, checked for idiomatic usage. Include Chinese explanation and accurate FR/EN target-language usage.
- At least one authentic source-linked listening item and one reading item (or documented legal alternatives) **for each published core unit**, not merely a top-level content-provider link. Keep provenance and transcript availability on each asset.
- Original pronunciation goals appropriate to language (English: stress / weak forms / phonemes; French: vowel contrasts / liaison / e muet / group rhythm). Only display phoneme-level defects supported by evaluator evidence; use neutral gray when uncertain.
- A coherent original speaking task and original short writing task with practical scoring-free feedback criteria. Answer keys for close-ended practice are permitted but no forced exam.
- A provenance record for all imported content. Individual permission for public GitHub rehosting; other resources accessed via authorized external link or private Drive.
- Subject-matter review for high-risk grammar inaccuracies, culture-sensitive claims, inappropriate accent discrimination, and accessibility.
- Test content rendering with desktop/mobile keyboard navigation; ensure audio controls also have text alternatives.
- Quality gate fails if lesson audio is missing; the unit may remain in authoring or reading-only draft, not falsely marked fully complete.

## Source hierarchy

**English course spine**

- [VOA Let's Learn English — Level 1 (52 lessons)](https://learningenglish.voanews.com/p/5644.html): strong coherent beginner pathway, dialogue and speech integration; note its own lessons reach some higher structures, so **do not claim one-to-one CEFR equivalence**.
- [VOA Let's Learn English — Level 2 (30 lessons)](https://learningenglish.voanews.com/p/6765.html): coherent intermediate supplement.
- [British Council grammar](https://learnenglish.britishcouncil.org/free-resources/grammar), [graded listening](https://learnenglish.britishcouncil.org/free-resources/listening) and Cambridge resources: validated grammar and levelled authentic input.
- [BBC Learning English](https://www.bbclearningenglish.org/programme/learning-english-grammar): supplementary grammar and later authentic speech. Do not mirror BBC audio by default.
- [British Council graded reading](https://learnenglish.britishcouncil.org/free-resources/reading), [graded speaking](https://learnenglish.britishcouncil.org/free-resources/speaking), and [stories](https://learnenglish.britishcouncil.org/free-resources/general/story-zone) provide diversified input and practice, without copying their copyrighted media.
- [U.S. Department of State Everyday Conversations](https://americanenglish.state.gov/resources/everyday-conversations-learning-american-english): beginner real-life dialogues.

**French course spine**

- [Hachette Inspire A1](https://inspire.hachettefle.fr/inspire-1_livre-de-l-eleve_fr.html): familiar **study-sequence reference** for A1; not a source of freely redistributable audio or textbook scans.
- [UT Austin Français interactif](https://laits.utexas.edu/fi/): original 00-13 chapters covering phonetics, grammar, audio, videos, and vocabulary; each asset's rights must be checked for public hosting.
- [Tex's French Grammar](https://coerll.utexas.edu/coerll/oer/texs-french-grammar/): grammar concept explanations.
- [TV5MONDE Apprendre](https://apprendre.tv5monde.com/fr/collection-all): large, levelled comprehension resource across A1–B2; many useful authentic clips but not an automatic reproduction license.
- [Alliance Française Auckland A1 learning syllabus](https://www.alliance-francaise.co.nz/media/website_pages/learn-french/adults/A1.pdf): evidence that French A1 grammar / communication should be ordered by learning progression.
- [RFI French learning](https://francaisfacile.rfi.fr/fr/): audio/transcripts and bilingual introductory series, including the 13-episode `Les voisins du 12 bis`; link only by default.
- [OpenLearn Getting started with French 1](https://www.open.edu/openlearn/languages/getting-started-french-1): extended beginner learning material; license is generally CC BY-NC-SA with exceptions, so do not publicly mirror by default.
- [France Éducation international](https://www.france-education-international.fr/document/cecrl): linguistic progression inventory. CEFR alignment is a pedagogic design choice, not an official grammatical topic mandate.

**C1/C2:** currently intentionally have **no certified full-coverage French teaching source** in the machine-readable index. Advanced units are a roadmap; advanced source alignment is a separate content-research gate.

## Concept and media relation model

Course → level → unit → learning segment → grammar/vocabulary/pronunciation concept → referenced reading/audio asset.

Specific source mapping unit-by-unit records:
- `source_id`
- `external_lesson_url`
- `exact_asset_id` or canonical media URL if permitted
- `CEFR evidence`
- `language` / `regional variety`
- `media transcript permission`
- `owner` / `license` / `source attribution`
- `provenance verification timestamp`.

Avoid hardcoding a copyrighted work's exact chapter-to-topic mapping without reading the source TOC. For Inspire 1, only the public official resource index's confirmed 8 units and their audio numbers are known so far; **our 12 A1 units are not presented as Inspire's 8 official units**.

## Initial delivery sequence

1. Architectural unit catalog (**implemented as proposal**, 120 outlines).
2. Human-reviewed **English A1 U01 and French A1 U01 original lessons**; attach exact audio assets as a subsequent deliverable.
3. Full A1 authored content in both languages: 12+12 units, concept graph, at least one licensed audio sample per unit.
4. A2 authoring, then B1, B2, then C1/C2 source audit and authoring.
5. Each stage requires both an actual content QA review and a UI prototype review before release. Structural catalogs may be merged separately from user-visible lessons.

## Progress metrics (not learner scores)

- 120/120 units have a planned learning outcome and grammar, lexicon, pronunciation and real-world production goal.
- Fully authored published units: currently **0**.
- Exact per-unit licensed audio/transcript mappings: currently **0**.
- Verified instruction-level source/lesson alignments: currently **0**.
- AI content generated and approved: currently **0**.
- Curated provider/source discovery entries: **25** (including several source indices and research corpora, NOT 25 complete textbook courses).

Reporting must disclose these numbers rather than claiming course completion.
