# Language Learning Hub — free-first dual cloud speech deployment

**Status: integration adapters prepared, no Cloudflare AI binding, Modal account or remote deployment verified.**

## Delivery architecture

- Existing React/Cloudflare Pages frontend and Supabase Auth remain the only login system.
- Ordinary English/French shadowing: optional Cloudflare Workers AI Whisper `/speech/transcribe` for **transcript evidence only**. Browser Web Speech remains the free fallback. Whisper text similarity is never an IPA or accent grade.
- Phoneme practice: existing authenticated `speech_service/cloud_app.py` + Modal `speech_service/modal_app.py`. Server loads the pinned Wav2Vec2 model from a persisted Modal Volume. Existing IPA and uncalibrated practice_reference are preserved.
- Both cloud routes require a signed-in Supabase user. No learner machine installs Torch or downloads 1.26GB weights.

## Deployment checklist

1. **Cloudflare:** Deploy `worker/speech-transcribe.ts` through an existing Worker route, configure Workers AI binding named `AI`, and use the existing Supabase publishable key and URL. Add `VITE_SPEECH_TRANSCRIBE_URL` as the exact HTTPS endpoint URL to the frontend build. This standalone module is an integration adapter; it must be imported by the project's existing Worker router before it is reachable.
2. **Modal:** Sign in to Modal, create the Modal secret `language-hub-speech` with `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `LLH_SPEECH_ORIGINS` (actual HTTPS frontend origin). Run `modal deploy -m speech_service.modal_app` from repo root. Verify volume/model load, service HTTPS URL, latency and monthly spend. The app may incur fees beyond free credits.
3. **Frontend:** Set `VITE_SPEECH_API_URL` to the Modal HTTPS root, rebuild the site, then log in to activate the remote phoneme option. Set `VITE_SPEECH_TRANSCRIBE_URL` only after the Cloudflare route is live. A missing endpoint must not trigger an upload.
4. **Acceptance:** Test Chrome/Edge microphones, French and English, one second device, 401 unauthorized, 403 origin, rate-limit, server cold start, error fallback and 0–100 index disclaimers.
5. **Budget:** Cloudflare Workers AI has free daily usage but neuron costs vary by model; Modal has monthly compute credits but is not a guaranteed free always-on host. Never promise unlimited free speech minutes.

## Invariants

Cloud transcription returns `{transcript}` only, not a professional pronunciation score. Acoustic index is `practice_reference.percent` with `calibrated:false`, `canScore:false`. No automatic paid API usage without enabling a configured endpoint. The model's audio is held in memory and not stored in Supabase or Drive.
