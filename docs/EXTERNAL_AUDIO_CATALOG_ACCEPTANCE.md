# 353 external reference recordings: inventory and rights

This feature exposes **source metadata only** from existing `public.course_audio_index` for the signed-in owner. It does not upload any third-party ZIP or MP3.

| Family | Indexed rows | Rights / use |
|---|---:|---|
| Français interactif legacy phonetics | 83 | CC BY 3.0 baseline; verify embedded exceptions |
| Français interactif legacy vocabulary | 104 | CC BY 3.0 baseline; 12 specifically mapped supplemental examples |
| Inspire 1 A1 companion | 166 | Hachette commercial licensed material, **no public rehosting** |
| Total | 353 | 352 unique SHA-256 media files; metadata and technical MP3 decode only; zero verified full-lesson matches |

Source evidence is previously recorded in `docs/reports/licence-audit.md` and `reports/rights-ledger.csv`. The 12 direct FI vocabulary streams with real source URLs, vocabulary table transcriptions and attribution are in `config/assets/lesson-audio.json`. These supplement, but do not replace, original A1 per-lesson recordings.

The cloud tab now:
1. Displays all 353 index entries via authenticated metadata query with paging and family filters.
2. Links publisher-specific rights pages rather than guessing a direct MP3 URL for each archive member.
3. Plays 12 specific verified, publisher-hosted FI vocabulary supplements through existing `ReferenceAudio` (separate from the 24 owner-uploaded original synthetic practice MP3).
4. Discloses **0 actual source-matched complete lesson tracks**, unreviewed human listening, and commercial recording restrictions.

Remaining gates: human matching each clip to the intended lesson segment, verifying source-specific rights and checking reference audio URLs in a real browser. Do not mark `audio_verified` or `course_id` merely from ZIP chapter or filename. Pronunciation V3 remains under Codex Issue #20; no speech/AI files changed here.

Source duplicate verified in the Supabase audio index: `voc_08.zip/voc_08/073.mp3` and `voc_09.zip/voc_09/073.mp3` share SHA-256 `72acce56d9367585e8d81e844cbbc13946f12a3cd64dc84978313773bb875fea`. Count them as two archive entries but one unique recording; do not delete either archival provenance row.
