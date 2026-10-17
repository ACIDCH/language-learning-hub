# Personal workspace

The integration branch adds a working personal service to the existing V3 interface. Public course snapshots and the original reference audio player remain available under **开放教材**. Nothing needs a paid AI API for normal study.

## Run locally

Install Python 3.11+, Node 22+, `pip install -r server/requirements.txt` and `npm ci`. Keep private materials outside this repository. By default the service reads `../personal-data/courses.json`; set `LLH_DATA_DIR` for another folder.

On Windows, run `./scripts/start_personal.ps1`. Alternatively start these in two terminals:

```sh
python -m uvicorn server.app:app --host 127.0.0.1 --port 8765
npm run dev
```

Open `http://127.0.0.1:5173/language-learning-hub/`. The service binds to loopback. This configuration does not make the private library accessible from another device or from GitHub Pages. Responsive layout tests do not establish remote access.

## Import existing private course sources

The editorial migration uses existing Drive exports and preserves their full text and per-unit versions. It does not generate replacements for the 108 manuscripts.

```sh
python scripts/integrate_private_courses.py --private-work ..
python scripts/verify_personal_integration.py --data ../personal-data
```

Inputs: `../latest/editorial-all.json`, `../drive-baseline.json`. Outputs: private `courses.json` and `source-versions.json`; public hash/count audit reports. After reimport, rerun the audio attachment command below to repopulate course audio metadata. Original source documents and old public snapshots are retained.

## Audio

```sh
pip install -r server/requirements-audio.txt
python -m piper.download_voices fr_FR-siwis-medium --download-dir ../models
python scripts/generate_a1_narration.py --private-work ..
python scripts/audit_all_audio.py --private-work ..
```

Piper runs locally. The SIWIS model uses the [SIWIS dataset](https://datashare.is.ed.ac.uk/handle/10283/2353), listed as CC BY 4.0 in the [model card](https://huggingface.co/rhasspy/piper-voices/raw/main/fr/fr_FR/siwis/medium/MODEL_CARD). Piper is an external GPL-3.0 tool. Model weights and generated media stay private. Timing cues follow synthesis segments, not independently measured word alignment. Technical decode and script matching do not certify pronunciation or listening quality.

## Personal state and imports

SQLite stores chapter position, answers, self-review decisions, favorites, completion, audio position and notes. Browser backups protect pending saves; updates are serialized. Revision saves append copies; they do not replace source material. Course exercise IDs derive from prompt hashes so adding extracted questions does not shift existing answers.

PDF text extraction, DOCX paragraph/table order, EPUB spine order, UTF-8/GB18030 TXT and MD are implemented. Imports retain original bytes and deduplicate by SHA-256. Scanned PDFs require prior OCR and are rejected with an actionable message; DRM/encrypted documents are not bypassed. Audio imports undergo full FFmpeg decoding. Video imports are rejected. Document reading is paginated with chapter selection.

## Supabase

The migration creates `course_catalog`, `course_audio_index` and `learning_progress`. Catalog metadata is readable anonymously; progress is authenticated and owner-scoped through RLS. Private manuscript text, media bytes and service credentials are not in these tables. Create a personal Supabase Auth user in your project, then sign in through **设置与 AI**. The app does not send signup messages or manufacture an account.

Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`, or put only these public connection values in private `connection.json` as `supabase_url` / `supabase_key`. Never use a service-role key. Manual sync merges by the most recent saved timestamp per course; it does not merge simultaneous edits to individual fields. The personal account has passed real browser login, cloud write, refresh/session persistence and a cloud-to-local restore test. Downloading a remote record preserves its original edit timestamp; newer local saves are protected. Sign-out, user-performed re-login and a second cloud-to-local restore also passed; the temporary record was cleaned up. Evidence is in `reports/authenticated-sync-regression.json`. Testing on another physical device remains pending.

## Optional AI

For a running local Ollama server, set `OLLAMA_MODEL`. For a remote compatible provider, set `LLH_AI_KEY`, `LLH_AI_MODEL` and optionally `LLH_AI_URL` (HTTPS chat-completions endpoint). Alternatively expand **配置学习辅助服务** in settings; model names, endpoint and optional key are saved in private `ai-settings.json` outside the repository. Environment variables take precedence. Keys stay in the local service configuration and are never returned by the settings endpoint. Only the text explicitly submitted in the AI panel is sent. Provider availability and response quality require testing against the configured model; no paid request is made automatically.

## Verification and acceptance

```sh
python -m pytest server/test_app.py scripts/tests -q
python scripts/validate_course_content.py
python scripts/verify_personal_integration.py --data ../personal-data
npm run build
```

`reports/integration-acceptance.csv` is the current per-unit acceptance ledger. `text_complete`, `audio_verified`, `QA_approved`, and `publishable` remain independent. Structural success and the presence of a manuscript never set these flags automatically. Existing editorial reports describe earlier batches and are preserved as historical evidence.
