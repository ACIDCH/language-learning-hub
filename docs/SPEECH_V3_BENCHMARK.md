# Speech Practice V3 — experimental prototype and benchmark

Date: 2026-10-18 (Pacific/Auckland). Related: [Issue #20](https://github.com/ACIDCH/language-learning-hub/issues/20).

**Draft for review. No professional pronunciation score, human accuracy approval, Chrome/Edge E2E approval or production deployment is claimed.**

## Delivered and scope boundaries

- The existing browser ASR mode remains the free default. Its result is transcript-only, with three alternatives and text differences; confidence is not used as a pronunciation score.
- An optional, explicitly started loopback service performs real Wav2Vec2 inference and returns IPA candidates, approximate CTC emission times and an edit alignment against an eSpeak-generated reference. The UI labels this experimental/un-calibrated, always `canScore: false`.
- Articulation hints cover French nasal vowels, /y/–/u/, English /ɪ/–/iː/, /θ/–/ð/ and other contrasts. These are practice guidance, not confirmed learner diagnoses.
- Word → sentence → paragraph selections derive from the current manuscript. Chinese instructions and obvious metadata are excluded. `/speech-lab` is a no-account practice entry.
- Recording is limited to short utterances, with cancellation, bounded requests, signal rejection and a disabled remote adapter. Local mode is currently limited to loopback preview port 5174; public Cloudflare pages retain browser ASR.
- The current main branch's navigation/resource fixes are preserved. `CloudWorkspace` passes the current lesson text into `SpeechPractice` and explicitly imports `CourseGuide.tsx` to avoid the latest main branch's Windows extension-resolution ambiguity; no guide behavior changes. AI teacher/provider configuration, curriculum, stored A1 MP3s, Supabase progress, Workers and other projects are unchanged.

## Models, versions and licenses

| Evaluated route | Immutable revision / runtime | License | Capability and cost |
|---|---|---|---|
| `Systran/faster-whisper-tiny` | `d90ca5fe260221311c53c58e660288d3deb8d356`; faster-whisper 1.2.1, CTranslate2 4.8.3; CPU int8, beam 1 | Model card MIT; faster-whisper MIT | Text transcription only. Free local inference after download; benchmark comparator, not integrated as a pronunciation scorer. |
| `facebook/wav2vec2-xlsr-53-espeak-cv-ft` | `2c733782da5604684829819a5eb744c193fe9398`; Transformers 4.57.1, Torch 2.8.0+cpu; FP32 | Model card Apache-2.0 | Multilingual acoustic phone labels at 16 kHz. Real local prototype, no paid API or registration; substantial download/RAM and uncalibrated phone errors. |
| Existing Web Speech | Browser/vendor-dependent, not a pinned model | Browser/vendor terms; not an open model guarantee | Free app entry, potentially vendor-side recognition. Browser accuracy/latency were not measured in this run. |

Primary sources: [Whisper conversion/model card](https://huggingface.co/Systran/faster-whisper-tiny), [faster-whisper](https://github.com/SYSTRAN/faster-whisper), [phoneme model card](https://huggingface.co/facebook/wav2vec2-xlsr-53-espeak-cv-ft).

G2P and synthetic test generation use Piper 1.8.0 / eSpeak NG. These are GPL components, unlike the acoustic model's Apache license; do not describe the entire optional Python stack as permissively licensed. A redistributed service bundle needs its GPL/source obligations assessed. The React bundle contains no model weights or Python runtime. Sources: [Piper GPL project](https://github.com/OHF-Voice/piper1-gpl), [eSpeak NG license](https://github.com/espeak-ng/espeak-ng/blob/master/COPYING).

All downloaded acoustic model files and synthetic voice weights have SHA-256/size records in [`reports/speech-v3-summary.json`](../reports/speech-v3-summary.json). The 75,538,270-byte Whisper weight file is stored FP16 and loaded with int8 compute; its complete local model files total 78,203,619 bytes. Wav2Vec2's weight file is 1,263,535,127 bytes; complete local files total 1,263,541,832 bytes. These are payload sizes, not an end-to-end first-install measurement: Python packages, Torch and test TTS voices add substantial disk/network cost. Model download time was not benchmarked.

Transformers.js/ONNX Runtime Web and whisper.cpp/WASM were researched as alternatives, not executed benchmarks. Their Whisper route still produces STT rather than calibrated phoneme judgments. A browser phoneme port would require compatible conversion, download/RAM and mobile validation; no such performance is claimed here. See [Transformers.js Whisper example](https://huggingface.co/Xenova/whisper-tiny) and [whisper.cpp](https://github.com/ggml-org/whisper.cpp). The free Worker is not asked to load acoustic weights.

## Corpus and measurement method

There are **30 unique text cases: 15 French and 15 English**, in [`tests/fixtures/speech-v3-cases.json`](../tests/fixtures/speech-v3-cases.json). They cover short words, liaison/linking contexts, nasal/vowel contrasts and longer phrase groups.

Each text has three **synthetic** conditions, giving **90 distinct audio files**, not 90 distinct sentences:

1. Clean Piper synthesis, `fr_FR-siwis-medium` / `en_US-lessac-medium`.
2. The clean waveform plus deterministic Gaussian noise at nominal 10 dB SNR (before clipping).
3. Piper `length_scale=1.35`, rather than a recording of a non-native speaker.

Audio is resampled with `scipy.signal.resample_poly` to mono 16 kHz PCM16 and padded by 100 ms at each end. Reusing these 90 files across three model/thread configurations yields 270 inference observations; it does not enlarge the corpus. Generated fixtures remain outside Git. **Human recordings: 0. Human phoneme labels: 0. Accent/non-native human coverage: pending.** Intended focus descriptions are not phoneme ground truth; e.g. `en haut` needs contextual h-aspiré/liaison review.

Machine: Windows 11 build 26300, AMD Ryzen 7 8745H, 8 physical/16 logical cores, 12,662,538,240 bytes physical RAM. No GPU inference. One process per configuration, sequential cases. The device also had normal desktop applications running; this is a small development benchmark, not an isolated repeated performance study.

Whisper: language forced to `fr`/`en`, beam size 1, `condition_on_previous_text=False`, `vad_filter=False`. WER/CER use Levenshtein edit counts divided by reference word/character counts, aggregated by total reference units. Text is lowercased, curly apostrophes normalized, punctuation replaced by spaces, whitespace collapsed; accents are retained, and CER includes resulting spaces. Numbers are not expanded (`six` vs `6` can count as a text error). The TTS prompt is the reference text, not a human-verified transcript of the waveform.

Wav2Vec2: mean/variance normalization, greedy CTC decode, eSpeak reference phone sequence with stress removed. `g2p_phone_edit_proxy` in raw reports is a disagreement diagnostic against generated G2P, **not PER against human labels, accuracy, or a pronunciation score**. WER/CER are **N/A** because this route has no word decoder.

Timings use `perf_counter` around each inference call; disk reading is excluded. Load time includes Python/model imports and model loading. RSS is sampled every 50 ms and includes the Python process, not browser memory; peaks can be missed between samples. P95 is the nearest-rank percentile across 90 observations. Browser decode/network/render/permission latency is not part of these numbers.

## Measured results

| Route | Median inference | P95 | Maximum | Import + load | Sampled peak RSS | Execution exceptions |
|---|---:|---:|---:|---:|---:|---:|
| Whisper tiny, 4 CPU threads | 283.3 ms | 802.0 ms | 910.2 ms | 2.93 s | 300.4 MB | 0 / 90 |
| Wav2Vec2, 4 CPU threads | 432.1 ms | 1150.0 ms | 1379.8 ms | 6.43 s | 1712.6 MB | 0 / 90 |
| Wav2Vec2, 1 CPU thread | 829.6 ms | 2211.2 ms | 2831.3 ms | 6.27 s | 1878.4 MB | 0 / 90 |

Four threads are the prototype default based on this observed latency difference. This was not repeated enough to establish a universal speedup or a memory advantage. No execution exception does **not** mean a correct result: Wav2Vec2 produced one empty phone sequence per 90-file run.

Whisper **synthetic prompt agreement**:

| Language | Condition | Files | WER | CER |
|---|---|---:|---:|---:|
| French | all three conditions | 45 | 48.00% | 24.49% |
| French | clean | 15 | 34.00% | 14.35% |
| French | 10 dB noise | 15 | 64.00% | 35.22% |
| French | slow synthesis | 15 | 46.00% | 23.91% |
| English | all three conditions | 45 | 14.14% | 9.46% |
| English | clean | 15 | 10.61% | 7.43% |
| English | 10 dB noise | 15 | 19.70% | 12.50% |
| English | slow synthesis | 15 | 12.12% | 8.45% |

These error rates do not measure human accent recognition, learner pronunciation, or superiority to Web Speech. Three variants of the same sentence are correlated observations. Both TTS and recognition artifacts can affect the result.

Raw evidence: [Whisper 4 threads](../reports/speech-v3-whisper-4threads.json), [Wav2Vec2 4 threads](../reports/speech-v3-phoneme-4threads.json), [Wav2Vec2 1 thread](../reports/speech-v3-phoneme-1threads.json), [summary and artifact hashes](../reports/speech-v3-summary.json).

## Preserved defects and limitations

- Clean synthetic `pain` was transcribed as `Bye!` by Whisper and as `b a` by the phone model. This is an observed system disagreement, not proof that a human nasal vowel was wrong.
- Clean `un` produced no phones. The current core still returns `experimental` rather than `unscorable` for that empty decode; this gate requires improvement before promotion.
- Clean `ship` became `Cheers.` in Whisper; phone output was `ɕ eː p`. Short isolated words are particularly unreliable in this tiny corpus.
- Clean `Vous êtes ici.` yielded `v u z e d z iː s iː`; strict sequence alignment can flag valid/synthetic variants and misassign errors.
- The alignment is edit distance between generated G2P and predicted phone tokens. It is not forced alignment, word-localized evidence, GOP, or independently measured phone boundaries. Missing-phone rows have no reliable acoustic timestamp.
- G2P choices, French /œ̃/–/ɛ̃/ merger, schwa, accents, vowel length and allophones can create false differences. Local references currently use French and US English regardless of the browser-mode regional selection.
- Stress is stripped from the reference; lexical stress, rhythm quality, liaison correctness, noise robustness and pedagogical effectiveness have not been validated. Low-energy duration is only an energy measure.
- The basic browser adapter remains the existing browser lifecycle plus a normalized result; remote evaluation is intentionally disabled. The prototype is not a complete interchangeable service framework.
- There is no automatic protected A1-player-to-practice cue linkage yet. Current lesson text provides practice selections; the existing authenticated A1 player remains available in its audio panel without changes.
- No live microphone, real browser latency/heap, Chrome/Edge E2E, physical mobile device or Cloudflare preview acceptance is claimed. No user audio was used for these model runs.

## Automated validation

`npm ci --no-fund`, production build/typecheck, 14 Vitest lifecycle/privacy/fallback tests, 4 Python endpoint/alignment tests and 45 existing Node regression tests passed after integrating main `44f3022` (implementation `5c8a2e4`). The Node tests cover transcript comparison, course parsing, audio ZIP, cloud configuration, learning progress, resource inventory, learning roadmap, reference catalog, QA markers, foundation curriculum, course guidance and stage audit. See the [local automation report](../reports/speech-v3-automation.json) and PR Checks; local success does not imply a remote CI pass.

The local service tests inject a fake evaluator for API behavior; they do not replace the separate real-model benchmark. Microphone events in Vitest are simulated, not real-browser microphone testing. No UI screenshot from the blocked run is evidence of a successful V3 session.

## Reproduce locally and perform manual browser acceptance

Use Node 22.18+ and Python 3.12. Run commands at repository root in PowerShell. Keep models, environments and generated fixtures outside Git; do not reuse/change the existing AI service environment.

```powershell
npm ci --no-fund
python -m venv ../speech-runtime
../speech-runtime/Scripts/python.exe -m pip install torch==2.8.0 --index-url https://download.pytorch.org/whl/cpu
../speech-runtime/Scripts/python.exe -m pip install -r speech_service/requirements.txt
../speech-runtime/Scripts/python.exe -m scripts.speech.download_models --engine phoneme
../speech-runtime/Scripts/python.exe -m speech_service.app
```

In a second terminal:

```powershell
npm run dev -- --port 5174
```

Open `http://127.0.0.1:5174/speech-lab` manually in Chrome and Edge. The acoustic service is `127.0.0.1:8776`, with no cloud origins allowed. `/health` should report `ready: true`. Existing users of this workspace already have the environment/model files; they can skip installation/download and run the last two commands. A future packaged installer is not included.

Manual acceptance, **currently pending**:

1. Record browser version, OS, microphone, CPU/RAM and ambient noise description. Check the free browser mode without any account/API key. Exercise recognition success, no speech, denied permission, retry and language change. Record WER/CER only when a consenting speaker has a known prompt and a human-verified transcript; do not infer phone errors from WER.
2. Select local experimental mode, enter a short French or English prompt, allow the microphone and stop within 12 seconds. Confirm IPA observations appear with an uncalibrated warning and no pronunciation score. A silent attempt should request retry.
3. Check cancel, target/language change during an attempt, disconnecting the service, and a late microphone permission response. Confirm the microphone indicator turns off and a browser fallback remains available.
4. Repeat short French/English attempts at least ten times per browser. Expand **本次运行信息**; record aggregate total latency, maximum frame gap and JS heap (if provided). These frontend measurements are implemented but not yet verified in a real browser. Do not equate JS heap with local model RSS.
5. In `/cloud`, use the existing user-controlled login, select a course and open the speech panel. Check current-course word/sentence/paragraph selection, accents/apostrophes and exclusion of Chinese instructions. Play the existing A1 audio from the audio panel, then return to practice. Verify that progress/audio behavior remains intact; do not mark it retested merely because this PR does not change those services.
6. Inspect network destinations: local acoustic attempts should reach only `127.0.0.1:8776/evaluate`, never Supabase/Drive/Worker. Do not export HAR bodies or save user recordings. Application capture is ephemeral memory only; browser ASR vendor handling follows its own terms. Close/reopen the practice panel and confirm prior local results are not restored from persistence.
7. On a public Cloudflare preview, verify browser mode and the explicit local-mode limitation. Do not enable a remote evaluator or weaken browser protections to make loopback work. Preview availability/deployment must be verified separately by the reviewer; this task does not publish production.

Windows Computer Use stopped because it could not reliably identify the current browser URL for its safety checks. That restriction was not bypassed. Chrome/Edge steps above are assigned to manual review and remain release gates.

For synthetic benchmark reproduction only:

```powershell
../speech-runtime/Scripts/python.exe -m scripts.speech.download_models --engine both
../speech-runtime/Scripts/python.exe -m piper.download_voices fr_FR-siwis-medium en_US-lessac-medium --download-dir ../models
../speech-runtime/Scripts/python.exe -X utf8 -m scripts.speech.benchmark --engine generate
../speech-runtime/Scripts/python.exe -X utf8 -m scripts.speech.benchmark --engine whisper --threads 4
../speech-runtime/Scripts/python.exe -X utf8 -m scripts.speech.benchmark --engine phoneme --threads 4
../speech-runtime/Scripts/python.exe -X utf8 -m scripts.speech.benchmark --engine phoneme --threads 1
```

The TTS download command uses upstream voice names; compare weight hashes with the committed summary before comparing runs. If upstream voices change, record that as a different experiment. Do not replace the benchmark fixture corpus with retained user recordings.

## Review decision and next evidence required

Keep the free browser mode as default. Retain the local phone route only as an opt-in experimental observation tool; do not auto-promote it based on successful execution or text agreement. Whisper tiny is a useful lightweight comparator but the observed French/short-word results do not justify replacing the default or treating it as assessment.

Before any quality claim: obtain consented, transient human samples and expert labels across normal/hard/incorrect cases and regional variants; measure false positives, missed errors and calibration separately from transcription; improve G2P/word alignment and empty-output gating; complete Chrome/Edge and audio/progress regression. If a specialized model or forced-alignment route is proposed later, compare the same human labels, license obligations and measured resource costs. No paid/remote evaluator or AI teacher changes are part of this draft.
