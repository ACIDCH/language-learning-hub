# Audio vault, AI tutor and speech practice — staged delivery

## Already confirmed
- 108 course text snapshots stored under the current owner's Supabase account; no unit has editorial `approved` status.
- YUNPAN holds 24 genuine A1 synthetic/practice MP3 files (12 units × 2, ~1.96 MB). The 24 filenames and SHA-256 identifiers are cataloged in `public.course_audio_index`; this is not proof of native accent quality.
- 353 other indexed open-reference recordings are not associated with course IDs, and are NOT included in this package or implicitly licensed for redistribution.

## New private media
- `lesson-audio-private` is a *private*, owner-scoped Supabase Storage bucket with a 512 KB per-file cap and MP3-only restriction.
- The owner can upload the locally downloaded `language-hub-a1-audio-24-verified.zip` in one action inside `/cloud/`. ZIP is **not** committed to GitHub or served through Cloudflare Pages.
- Every MP3 is SHA-256 checked against the preexisting audio index **before** any upload, then uploaded under `<auth.user.id>/<asset_id>.mp3`. Existing assets are left untouched.
- Authenticated learner obtains a 15-minute signed URL on demand. The player only appears when a file exists; no false 'audio verified' flag is applied on upload.
- Original MP3s remain in private YUNPAN. The new copy is for authenticated playback only.

## Optional AI teaching
- Gateway `POST /v1/ai/assist` supports OpenAI-compatible endpoints: DeepSeek, Gemini, OpenRouter, OpenAI, HTTPS custom.
- User must explicitly check 'enable AI' and provide their **own** model name and API Key in the browser. These credentials stay in React memory and are sent only per request to Workers; no DB/Drive/log persistence code.
- Worker requires a valid Supabase bearer session, hard-limits body size/context, timeouts and tokens, and never returns provider error bodies or key contents.
- AI is disabled by default and may be **paid** depending on model/provider. Outputs are teaching suggestions, not verified course facts or certified exam grades.

## Pronunciation entry level
- Browser speechSynthesis reads user-entered phrases, offers adjustable playback speed.
- Where supported, browser SpeechRecognition recognizes speech on direct user action; the browser/vendor may process microphone audio remotely; the app itself doesn't store the raw recording.
- LCS-based word/phrase transcript match is specifically NOT an acoustic/phoneme pronunciation score. A credible pronunciation assessment service remains a separate dependency.

## Validation and remaining gates
1. Supabase table schema and RLS policy tests; Worker AI mock integration; TypeScript build and Pages/Workers previews.
2. Sign in to /cloud; select the audio ZIP **once** and confirm all 24 SHA checks pass; listen to individual recordings in Chrome and mobile.
3. Compare recordings against the manuscript text; mark `audio_verified` only after actual listening/editorial review (not automated).
4. Configure a real AI model key in UI, explicitly opt in, and verify results/cost. No key needs to be pasted in ChatGPT or GitHub.
5. Browser speech feature is not equivalent to medical or linguistic-certified acoustic scoring; real phoneme feedback remains pending specialized service.
6. Audit 108 lesson text for meaningful progression, exercise correctness, naturalness, and source compliance before marking editorial approval.
