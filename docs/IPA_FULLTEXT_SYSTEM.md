# Full-text IPA reading system — English & French

## Product requirement (2026-10-18)

An English/French learner encountering an unfamiliar word must see an approximate **International Phonetic Alphabet** reading in-context. The system must cover **whole foreign-language lesson text** on demand, not just fixed alphabet tables or a handful of vocabulary examples, and remain useful after switching computers. The user specifically requested this as a standing learning-system requirement.

## Implementation (no new server, ASR or TTS)

- Browser-side **@piper-plus/g2p 0.4.2**, MIT-licensed rule-based English/French grapheme-to-phoneme library. Lazy-loaded only after enabling IPA, no external phonemization API. No Wav2Vec2 model or Whisper inference needed for reference IPA text.
- Original text remains untouched; Unicode-aware tokenization finds Latin-script words, generates IPA for each word and keeps punctuation, whitespace, accents, apostrophes, headings and Chinese pedagogic commentary intact. Unlike a heuristic source-map reconstruction, each IPA token is guaranteed to display next to **that original word**.
- Long manuscripts are processed in chunks with incremental rendering, small in-memory word cache, and clear plain-text fallback if a browser cannot load the module or lacks a conversion.
- The main 108-course manuscript reader gets an IPA toggle in each six-stage page and complete original view.
- The 48-course foundation/A2 learning system gets an IPA toggle for vocabulary, examples, listening transcripts and reading passages.
- Existing native Web Speech practice gets instant IPA for its editable target. A separate free IPA reading lab at `/speech-lab#ipa-studio` accepts pasted EN/FR passages of up to 40,000 characters.
- English and French IPA phoneme charts include learner-friendly articulation hints and example-word playback using **existing browser SpeechSynthesis**, never by directly asking a TTS engine to pronounce isolated IPA symbols.
- No new speech-recognition service, paid model endpoint, back-end account, storage table or cloud server. Actual audio/pronunciation scoring remains separate.

## Limits, honesty and teaching safeguards

The project uses **rule-based automatically generated approximations**, not a phonetics dictionary individually reviewed by professional linguists.

- English spelling is irregular; homographs such as *read, lead, wind, record* can vary by context. A word-level G2P cannot always infer the correct lexical reading. Do not display pronunciation confidence or invent professional accuracy percentages.
- French **liaison**, *enchaînement*, schwa deletion and elision are context-sensitive. Per-word IPA illustrates a word's sound inventory but may not capture its realized pronunciation inside the exact spoken sentence.
- English IPA is currently **one unified English rule set** in this library; selecting US vs GB changes browser TTS accent but **does not generate independently verified American/British phonetic forms**. This must be clear in interface labels.
- Browser SpeechSynthesis TTS and the G2P engine are independent; their accents can differ, especially for unusual words.
- Unknown proper nouns and loanwords can be mistaken. If a conversion fails or looks non-IPA, keep the source plain rather than fabricating a notation.
- Static IPA teaching symbols are examples; phonological variation among dialects is normal.
- Do not derive phoneme pronunciation *scores* from spelling or transcribed text matches. Those belong only to a separately validated acoustic scoring engine.

## Verification and acceptance

1. Open the six-stage main reader, enable IPA, then switch to “查看完整原稿” and verify original content and English/French IPA remain matched.
2. Use the foundation vocabulary table, English/French examples, reading passage and listening transcript, including diacritics such as *étudiant, sœur, français, l’école*.
3. Edit a native speech practice target: its text and IPA update together; basic Web Speech and TTS continue working if IPA fails.
4. Paste a complete unfamiliar article into `/speech-lab#ipa-studio` and confirm incremental annotation; do not upload text to any endpoint.
5. Re-check at least 50 common English and 50 common French dictionary pronunciations, document wrong predictions and create correction dictionary overrides. CI tests demonstrate structural integration only; real linguistics QA remains necessary.
6. Verify Chrome, Edge and a second physical computer with real TTS and IPA browser module loading. No actual real-device browser test is claimed until performed.

## Source, license and dependency status

- [@piper-plus/g2p](https://github.com/ayutaz/piper-plus/tree/dev/src/wasm/g2p), version **0.4.2**, **MIT**.
- No GPL/eSpeak runtime bundled in this final implementation. Unlike the initial research branch, this does **not** require relicensing the whole frontend under GPL.
- The separate existing acoustic evaluation project still uses its independent licensed ML resources, unrelated to IPA text conversion.
- If a more complete pronunciation dictionary becomes necessary, use per-language permissive English lexicons and a verified French dictionary with its specific attribution/license. **Avoid presenting automatic rules as dictionary-certified IPA.**
