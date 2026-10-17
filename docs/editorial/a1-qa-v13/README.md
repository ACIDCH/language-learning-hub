# A1 quality and audio verification V1.3

**Actual work verified 2026-10-16:** Read source A1 U01, U02, U03 independent native Google Docs and the combined nine-section A1 U04–U12 original native Google Doc. All **12 unit sections** include all six teaching-stage headings; U04–U12 each contain four visible reading/grammar answer entries. This checks *structure and answer presence*, not answer correctness for every prompt or completion readiness.

## Specific source issues discovered
- U03: old /ɛ̃/ for `dans` still visible despite a v0.2 correction; `parents` /pa.ʁɑ̃/ was wrongly described as having the nasal vowel in the first syllable; a negation blank expects `n'ai` after already printing `Je ne`, producing duplicated negation.
- U07: `fais` and `fait` are pronounced alike /fɛ/ in common standard usage, contrasting with `font` /fɔ̃/.
- U08: distinguish partitive singular mass-noun usage from plural indefinite `des` for count nouns; some linguistic frameworks also include a plural partitive category. Teach meaning and use, not a dogmatic label.
- U01: refine `tu/vous` peer/formal situational choice.
- U10: reconcile the lesson title “home **and habits**” with scarce habit-specific sentences.
- Other A1 units have still NOT been certified free of errors by a qualified French language reviewer.

Reference sources for high-confidence phonetic findings:
- French parents: https://fr.wiktionary.org/wiki/parents
- Fais: https://fr.wiktionary.org/wiki/fais ; fait: https://fr.wiktionary.org/wiki/fait
- French partitive, ULB grammatical reference: https://multigram.ulb.ac.be/fra/Article_partitif
- COERLL open grammar reference: https://coerll.utexas.edu/coerll/oer/texs-french-grammar/

**All original v0.1/v0.2 manuscripts remain unchanged.** The owner-private A1 V1.3 editorial review and teacher-ready replacement text record exact corrections to merge after checking older Codex drafts. A new public GitHub appendix has only small quotations needed for error identification; no third-party proprietary textbook or media content, original documents, private Google Drive IDs or personal content appears.

## Audio source inventory vs verified matching

Metadata listing confirmed three independent archive families: 14 `pho_00`–`pho_13` pronunciation archives, 14 `voc_00`–`voc_13` vocabulary archives, and three Inspire A1 audio archives, **31 ZIP files in all**. Their existence, sizes, MIME types and folder membership do NOT prove that any inside track matches our original A1 dialogues or readings.

For **all 12 A1 lessons**, the exact audio match remains unverified, with no associated source license determination, asset SHA-256, word/sentence aligned transcript, duration or real playback acceptance. The machine-check script explicitly prohibits elevating an audio state merely because an archive was listed.

## Gated next steps

1. In an editorial integration PR, compare the proposed corrections against actual source passages and any Codex updates; preserve both versions and all answers.
2. Confirm grammar/prosody/IPA with a proficient FLE reviewer; revisit every question and mark specific answer-key verification.
3. For new original A1 dialogues, create or license exact narration and independently verify exact transcript, SHA-256, duration, rights and playback; unrelated publisher audio must not be auto-bound.
4. Keep `text_complete`, `exact_audio_verified`, `qualified_QA_approved` and `publishable` false until evidence-specific acceptance. No production component, media binary or user-personal website is modified by this PR.
