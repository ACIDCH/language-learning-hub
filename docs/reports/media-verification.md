# Media verification — actual files

| Collection | PDFs | ZIPs in Drive | MP3 members |
|---|---:|---:|---:|
| Français interactif 2019 / legacy media | 1 full book + 14 chapters | 28 | 187 (104 vocabulary, 83 phonetics) |
| Inspire A1 companion files | 8 | 3 | 166 |
| Total | 23 | 31 | 353 |

All 54 Drive source files were read back as raw bytes and SHA-256 matched their local verified originals. Total size: 301,726,722 bytes. Full FI textbook: 345 pages, 25,032,616 bytes, SHA-256 `7b990fe2688c8d1cd61d3e32cabd53f4db8f1d08c0ea7ec3f84e24c1a8c357ee`.

Checks include HTTP success, official HTTPS host restrictions (also redirects), bounded downloads, PDF magic/page parsing, ZIP CRC, path traversal/symlink/expansion checks, MP3 duration and full ffmpeg decode. All 353 MP3s decoded without failure. Two publisher PDFs emitted parser repair warnings but their pages opened; no bytes were rewritten. This is technical verification, not a claim that a person listened to every recording.

The original Inspire ZIP (115,357,884 bytes; SHA-256 `4cf053071f7270278b8b1f0ba83183428255384b2e8d86fc37804bf94807e072`) failed upload with HTTP 413. The three replacement ZIPs contain 61, 79 and 26 original MP3s respectively. Each member's bytes match the original. The original ZIP itself is not counted as uploaded.

Twelve official streamed vocabulary MP3s matched the downloaded vocabulary archive members exactly. Their hashes, actual durations, complete source tables, lesson IDs and alignment limits are in `config/assets/lesson-audio.json`. Website parsing found 103 vocabulary table blocks versus 104 archived vocabulary MP3s; only the 12 explicitly matched tables are mapped to lessons. Full collection transcript coverage is not claimed.

The private manifest contains Drive locators and raw-readback receipts. Public metadata intentionally omits those locators. The 54 count excludes the two newly uploaded teaching manuscripts and audit/backup files.

Eight audit/rights files were also uploaded. Seven matched raw readback; the FI HTML rights-page copy was normalised during upload (six HTTP resource references became HTTPS). This is explicitly recorded as not byte-identical. A separate `source-rights-evidence.zip` preserves both original HTML rights pages and the rendered PDF licence page and passed raw SHA-256 readback. This HTML issue does not affect any of the 54 source-media files.

Browser verification: the FI U01 stream loaded with duration 119.197 seconds and advanced in playback; 0.75× speed, A/B looping and complete table expansion worked. English Reading U02's 149 rendered lines exactly matched the source text. At a 390-pixel viewport the document width was 375 pixels, with no horizontal overflow or console errors. Human listening assessment remains pending.
