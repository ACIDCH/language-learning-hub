# Course reader & audio delivery phase — October 2026

## Verified live baseline

- 108 course_catalog records; 108 **private, owner-scoped** text snapshots (96 imported from V4 archive + 12 A1 Drive manuscript copies).
- All snapshots have `qa_status='draft'`: imported text is not proof of editorial correctness or a final released lesson.
- 377 course_audio_index entries: 353 `open_reference` decoded resources with **no course_id mapping**, plus 24 `synthetic_practice` decoded entries mapped to 12 French A1 lessons. **None** marked listened or audio_verified.
- Learner has successfully tested real Supabase login and cross-reload progress save/restore; live UX changes from this PR still require browser check.

## This PR

- Six-stage reader, preserving every character of each manuscript. Stable chapter tabs, previous/next stage, optional full manuscript display, and zero-loss fallback when an imported lesson lacks an exact stage pattern. No rendering imported text as HTML.
- Course search by name, level and unit ID.
- Authenticated `GET /v1/audio-index/{courseId}` returns only metadata, no Google Drive URL, no claimed playback readiness. A1 course metadata appears as **waiting for human listen-through and verified streaming**.
- Existing local draft-progress protection and save-to-Supabase remain unchanged.

## Next audio implementation

Original audio remains in private YUNPAN. A browser cannot fetch private Drive documents merely because ChatGPT's Drive connector has access: Cloudflare Workers must receive a separate authorised file access mechanism. Do not paste Drive OAuth refresh tokens into a public repo or expose private Drive links.

Recommended small-cost option: preserve masters in Drive, convert only lawful original/practice teaching MP3/Opus to a **private** Supabase Storage bucket (free tier subject to quota), serve through user-scoped signed/authorized links, and inspect checksums + media decode before marking assets `audio_verified`. An alternative is per-user Drive OAuth and Worker proxy, which requires a separate consent flow and durable token rotation. Neither option should be called live until the actual files and authorization have been checked.

No retention of video, microphone practice recordings, or lossless audio is needed. At ordinary 48 kb/s mono, a minute of MP3 audio is about 360 KB; quota budgets should reflect actual asset count and lengths.

## Remaining gates

1. Node/TypeScript and Cloudflare Worker endpoint tests green.
2. Live /cloud/ reader: stage navigation, 108-course search, two-device progress sync.
3. Private audio file availability, delivery authorization, metadata mapping and human listen-through.
4. Per-unit content and pronunciation QA; retain `draft` flags until explicit checks pass.
