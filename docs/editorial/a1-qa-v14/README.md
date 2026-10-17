# A1 V1.4 — Actual compressed-audio inspection, not just folder metadata

Three **specific** YUNPAN ZIP files were fetched as bytes: `pho_00.zip`, `pho_13.zip` and `voc_13.zip`. A native ZIP parser verified CRCs; each actual media track's SHA-256, sample rate, duration and ability to decode an audio stream were checked using ffprobe and ffmpeg.

**Results in these three samples:** 12 authentic MP3 tracks decoded, while six masquerading `__MACOSX/voc_13/._*.mp3` AppleDouble records were correctly excluded. The Mac metadata records each held 82 bytes and were *not playable media*; relying on extensions would incorrectly inflate an asset count.

- pho_00: 1 actual track; recording duration ~65.620 seconds.
- pho_13: 4 actual tracks, durations ~15.752–85.159 seconds.
- voc_13: 7 actual tracks, durations ~4.989–60.682 seconds, plus six AppleDouble pseudo-MP3s.
- Some pho MP3 files generate nonfatal ffmpeg complaints about ID3 comment/lyrics encoding (BOM). Audio decode succeeds, but these warnings should be retained in a media-import health report.

**These results apply only to 3 of the 31 known ZIPs**, not all archives, and do not revise the old report that 353 tracks were earlier decoded: the two sets may differ in inclusion/filtering conventions. A complete new de-duplicated inventory needs the same filtering across all collections.

**Critical publication distinction:** These 12 source recordings are from existing source packages, not verified narrations of newly authored French A1 dialogues. We have *not* compared transcriptions, timecodes, source licenses or permissions with the lessons, so exact-match/per-lesson completed audio remains **0**. Even if the original user has access to licensed publisher audio, public redistribution rights remain a separate question.

## Non-destructive teacher corrections verified on full-length private copies
The owner-private originals U01, U03 and U04–U12 remain intact. Three copies were made in a dedicated private QA folder, and targeted replacements succeeded: U01 `tu/vous` pragmatics; U03 old `dans` vowel error, `parents` vowel location and the negation blank answer; U07 `fais/ fait` homophony; U08 partitive vs plural indefinite wording; U10 habits practice and question examples. The Google Docs copies were read back and compared with original sections: all original six stages, the nine combined unit headings and the existing answer entries were retained.

## Developer use
`inspect_audio_zip.py` supports safe screening of owner-authorised ZIP packages locally. It rejects AppleDouble sidecars and unsafe archive paths, validates ZIP CRC, computes SHA-256, and (with ffprobe and ffmpeg installed) checks actual audio decoding. Reports remain at media-file level and never upgrade course audio flags without transcript/rights review. A self-test uses a synthetic WAV and simulated AppleDouble record; it needs no third-party media or network.

Machine-check `validate.mjs` asserts the strict stats and that no sampled track is incorrectly promoted to a verified original-lesson voice asset.
