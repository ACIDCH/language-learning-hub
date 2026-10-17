# Reproducible ingestion and resume

Run from the repository. Keep the private work directory outside the repository. The commands below use the sibling `../` layout used for this batch. The scripts reuse verified existing downloads; they do not silently mark a URL as an uploaded file.

```sh
python -m pip install -r scripts/requirements.txt
python scripts/ingest_resources.py --output ../oer
python scripts/ingest_inspire.py --output ../inspire
python scripts/split_inspire.py --private-work ..
python scripts/gather_transcripts.py --private-work ..
python scripts/build_lesson_mapping.py --private-work ..
python scripts/decode_audio.py --private-work ..
python scripts/build_review_assets.py
python scripts/generate_inventory.py --private-work .. --outputs ../../outputs
python -m unittest discover -s scripts/tests -v
python scripts/validate_course_content.py
python tools/validate_public_assets.py
npm ci --no-audit --no-fund
npm run build
```

`generate_inventory.py` requires the private `drive-baseline.json`, `upload-receipts-8.json`, `verified-batch*.json` and decode report produced during the authorised connected Drive session. It intentionally fails if any upload lacks raw SHA-256 readback evidence. A fresh clone cannot fabricate those receipts. Do not add them, signed download URLs or a Drive credential file to Git.

For routine resume after this batch, start with `generate_inventory.py` and validation, not another upload. Connected Drive upload must first inspect the private manifest and destination folder; skip files with the same filename/hash and verified receipt, then upload only missing items. Check parent, size, permissions and raw downloaded SHA-256 before saving a receipt. The scripts do not perform account authentication or claim a standalone Drive sync service.

Existing Inspire split ZIPs are checked byte-for-byte against their source members and retained. Newly generated ZIP containers may have different archive hashes from older copies because of ZIP metadata; compare member hashes and never overwrite verified receipts with a new container hash.

Next content work: expand the remaining English and French manuscripts one lesson at a time, create a distinct revision, add the public snapshot only after privacy/provenance review, upload the full original master privately, and update the per-unit evidence. Do not change `publishable` merely because text or a vocabulary clip exists. Deployment and merging remain separate owner decisions.
