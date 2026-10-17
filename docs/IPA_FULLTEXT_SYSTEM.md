# Full-text IPA reading system — English & French

## Product requirement (2026-10-18)

Learners must be able to encounter an unfamiliar English or French word anywhere in their lesson and obtain a **useful IPA reading cue** beside the printed text, without leaving the lesson or submitting each word to an AI model. Cover **the whole displayed foreign-language passage**, not merely a fixed beginner alphabet chart. Follow the same behavior in 108 main course reading stages, 48 foundation/A2 units (vocabulary, examples, reading and listening transcript), and native Web Speech shadowing practice.

## Architecture and implementation

- Browser-only on-demand **eSpeak NG phonemizer**, via pinned **ephone 1.0.2** WASM. Original project: https://github.com/sjmik/ephone-js. English language pack `en_all` supplies American and British variants; `roa` supplies France French. Loaded only after the IPA toggle is switched on.
- Asynchronous chunking updates long passages progressively, with bounded in-memory cache, while keeping the original manuscript characters unchanged; Chinese annotations remain plain text and are never sent to an English or French phonemizer.
- Shows original letters and generated IPA in `<ruby><rt>` annotations when the eSpeak source alignment is consistent. If its source mapping fails, **never place an IPA under the wrong graphemes**: display the source and one separately identified phrase transcription instead.
- Clicking IPA source text or symbol chart's example word uses **existing browser SpeechSynthesis**, not a new TTS service. Playable audio is the orthographic text, not fabricated IPA pronunciation.
- The English/France French IPA learning reference covers consonants, vowel types, nasal vowels and glide contrasts, with example words.
- Normal manuscript and speech exercise reading is unchanged by default; learners explicitly enable IPA overlay. If WASM fails to load, original lesson and normal browser reading remain available.
- No Cloudflare Workers AI, Whisper, new login system, phoneme cloud server, paid API or backend storage is required for generating reference symbols. Optional independent acoustic practice remains a separate feature.

## Teaching quality and limitations

This is **automatic grapheme-to-phoneme (G2P)**, not a pronunciation dictionary whose every headword has been manually verified. In context:
- English spelling is not one-to-one with pronunciation. Homographs such as *read*, *lead*, *wind*, *record* require grammatical or temporal context. No guarantee that the synthetic engine chooses correctly.
- English accent can be switched American/British in the speech target; main manuscript defaults to American English unless course language indicates otherwise. Regional differences include rhotic /r/, merged vowels and stress.
- French words can change in connected speech (liaison, elision, schwa deletion, resyllabification); generated IPA is a learning reference, not an authoritative narrow transcription of every speaker.
- eSpeak output and browser system TTS come from **different engines** and may choose slightly different accent or lexical pronunciations.
- A written IPA hint cannot grade the learner's actual pronunciation. Existing Web Speech transcript matching and optional separately hosted acoustic experiment must remain distinct.
- Do not fill missing transcriptions using guessed hand-written rules while labeling them 'standard IPA.' If the source cannot be aligned, use explicit whole-phrase fallback, or leave plain text.

## Explicit rollout and acceptance checks

1. Enable `显示 IPA` in a French/English main course and use "查看完整原稿" to verify the entire foreign-language manuscript receives reference IPA and Chinese commentary remains intact.
2. Check 48 foundation/A2 courses' vocabulary / examples / reading and listening scripts, and native shadowing target editing for on-the-fly IPA updates.
3. Validate diacritics/Unicode: Chloé, l'école, sœur, étudiant, français; and English stress/homograph cases.
4. Force unsupported WASM/network failure and verify **no blank lesson or crash**.
5. Compare at least 50 EN + 50 FR high-frequency words with authoritative dictionary IPA, document mismatches and pronunciation lexicon correction strategy before claiming full coverage or dictionary-grade reliability. Current unit/integration tests are structural, **not** linguistic accuracy validation.
6. Run Chrome/Edge browser manual tests on Windows and another computer; only after verification may this be advertised as production-ready.

## Licensing and distribution requirements

**Important:** `ephone` and eSpeak NG are **GPL-3.0-or-later**, unlike the original author's code-only MIT packages. The browser bundle includes this runtime when IPA is enabled, so publishing/distributing the compiled frontend triggers copyleft license and source/notice obligations. The existing public project README does not grant permission to relicense separately owned material. **Do not merge or deploy this implementation to the public site before the project owner accepts the consequences and confirms license compatibility.** The feature lives in a review PR until this is resolved.

- Upstream ephone source: https://github.com/sjmik/ephone-js
- Upstream eSpeak-NG: https://github.com/espeak-ng/espeak-ng
- Upstream GPL full license: https://www.gnu.org/licenses/gpl-3.0.html
- Pinned `package-lock.json` must be regenerated from the registry with integrity checks in the final merge.
- If GPL integration is not acceptable, replace this adapter with a permissively licensed or hosted G2P component and reconfirm word-source alignment and full-text coverage; the React IPA interface need not change.

This feature provides a browser-native G2P **candidate**, not a human-validated multilingual dictionary.
