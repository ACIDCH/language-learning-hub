# Import authorized French OER textbook and audio into YUNPAN

**Status: import pipeline prepared and submitted for review. It has NOT been run and no third-party PDF/MP3 has been uploaded by this PR.**

## Why this uses an owner-run Google Colab notebook

This ChatGPT-connected Google Drive integration can create/edit native Google Docs, but it cannot ingest arbitrary third-party HTTP download URLs as raw binary uploads. Google Drive authentication available to ChatGPT is also **not automatically available to a GitHub Action**. Never place an OAuth refresh token or service-account credential in the public repository.

A personal Colab session mounting the **specific YUNPAN account** can fetch and store allowed external files without sharing Drive credentials with this public repository.

## Sources this importer handles

1. Full 2019 **Français interactif**, fourth edition, officially hosted 345-page PDF:
   https://www.laits.utexas.edu/fi/FrancaisInteractif-textbook.pdf
   File says CC BY 4.0. Attribution to Karen Kelton, Nancy Guilloteau, Carl Blyth; COERLL / University of Texas. Other editions/catalogues display CC BY 3.0 and may have individual media exceptions. This script stores a manifest; the owner must preserve rights details if republishing.
2. **Only audio ZIPs** found through exact visible links on the public eCampusOntario OER record:
   https://openlibrary-repo.ecampusontario.ca/jspui/handle/123456789/438
   Named `tex_mp3.zip` and `French Audio.zip` (about 149MB and 69MB respectively). Files may become inaccessible if the archive moves; the script will then report NOT FOUND instead of guessing an endpoint.
3. FSI French is **not auto-downloaded** because the site may have a download interaction requiring user-supplied name/email or platform access; its 24-unit/143-audio inventory is already available in the private Google Drive resource index:
   https://www.fsi-language-courses.org/fsi-french-basic-course-revised/

Do **not** upload Hachette Inspire's proprietary audio or textbook to public GitHub merely because it can be heard or downloaded.

## Run (only after reviewing this Pull Request)

1. Open https://colab.research.google.com/ and create a new notebook.
2. Copy these two commands into **one Colab code cell**:

```python
!pip -q install requests beautifulsoup4
!curl -fsSL https://raw.githubusercontent.com/ACIDCH/language-learning-hub/phase-03-approved-oer-import/tools/import_french_oer_colab.py -o /content/import_french_oer_colab.py
!python /content/import_french_oer_colab.py
```

3. Approve Google Drive mount using **the same Google account as YUNPAN**. The code fails without creating a second project root if it cannot find:
   `MyDrive/Language-Learning-Hub/02-French`.
4. The script writes the licensed full PDF to `00-Complete-Open-Textbooks` and available audio ZIPs to `01-Licensed-Audio-Collections`, with a SHA-256 manifest. It does **not** extract video, publish files or overwrite existing local files.
5. Confirm actual files and sizes in Drive and only then update the project's `stored_and_verified` status.
6. If the audio archive URLs are no longer reachable, obtain valid links from the official archive's download buttons manually. Do not bypass login walls or anti-bot protections.

## Technical controls

- HTTPS only, streaming size limit 150 MiB PDF / 300 MiB ZIP.
- Validate PDF `%PDF-` magic; ZIP `PK` signature and CRC checks.
- Do not overwrite existing files; SHA-256 checksum and actual size logged per item.
- No user data, API key, OAuth credentials or refresh tokens committed to Git.
- Public repo contains **only code and source metadata**, not copyrighted or personal source assets.

## Completeness caveat

The source workbook across all 108 units includes detailed editorial drafts but lacks fully audited authentic audio, expert verification and many comprehensive learner-facing explanations. A verified university PDF and audio packs will supply reliable reference material, but it does **not automatically transform** 108 unit outlines into complete bespoke lessons. Each unit remains pending content and audio QA.
