# Current delivery — French source ingestion and first manuscript expansion

This is an executed batch, not completion of Phases 0–6 or all 108 units.

| Evidence | Actual result |
|---|---:|
| Planned units | 108: English 48, French 60 |
| Substantive six-section drafts | 19 (18 inherited + English Reading U02) |
| `text_complete` / `audio_verified` / `QA_approved` / `publishable` | 0 / 0 / 0 / 0 |
| French vocabulary reference mappings | 12 |
| Verified source files uploaded and downloaded back from private Drive | 54 |
| Bytes uploaded for these 54 files | 301,726,722 |
| MP3 tracks fully decoded | 353; zero decode failures |
| Existing Drive documents backed up as full text | 37 |

`text_complete` is the strict reviewed manuscript gate; it does not mean there is no usable draft. Reference audio supports vocabulary practice and cannot satisfy the complete lesson dialogue/listening gate. Human listening and professional linguistic review remain pending.

## What changed

- Français interactif: complete 2019 fourth-edition book (345 pages), 14 chapter PDFs, 14 vocabulary ZIPs and 14 phonetics ZIPs, including 187 MP3s. Files are private Drive copies, with per-file and per-track hashes.
- Inspire A1: all 166 publisher-offered companion MP3s and eight support PDFs. The original ZIP exceeded the connector's 100 MiB upload limit; three verified archives preserve every MP3 byte. The commercial textbook was not acquired.
- English `en-ielts-reading-u02`: original six-section lesson on locating detailed evidence, with a fictional library study, scoped claims, collocations, grammar contrasts, exercises, reasoned answers, pronunciation practice and output models. It is an authored review draft, with a script but no recording.
- French `fr-a1-u01` through `fr-a1-u12`: new distinct vocabulary listening tasks, grammar boundary explanations, error corrections, answers and expression models. These supplement the existing manuscripts without replacing them.
- Frontend: seven full manuscript snapshots (six preserved + one new), twelve supplementary worksheets, official reference audio controls, speed selection, manually set A/B repetition and complete source vocabulary tables. No fabricated timing alignment or pronunciation scores.
- Reusable download, PDF/ZIP/audio inspection, transcript extraction, archive splitting, decoding and inventory tools; completion-claim validation; dependency lock file; CI.

## Phase status and remaining work

0: baseline and backups done; quota unavailable. 1: FI core book/chapter/audio collection and Inspire A1 companion collection verified; other levels and exact chapter-to-lesson teaching alignment remain. 2: A1 vocabulary references and supplements added; full manuscript deepening, dialogue recordings and human review remain. 3: one additional English lesson drafted, 48-track completion pending. 4: A2–C2 substantive lessons pending. 5: reference player implemented; authenticated backend, private media delivery, learner progress, recording and AI feedback remain. 6: this batch tested; whole-project acceptance pending.

See `docs/reports/` for rights, media and content evidence and `scripts/README.md` for safe resume commands. Nothing has been merged or deployed. No scheduled background completion is configured.
