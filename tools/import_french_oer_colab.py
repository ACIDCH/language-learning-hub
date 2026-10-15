#!/usr/bin/env python3
"""
OWNER-RUN Colab uploader for genuinely open French teaching materials.

Run this script only in a Google Colab session after mounting the target YUNPAN
Google account. It cannot be triggered from the public website and requires no
GitHub/API tokens. It DOES NOT execute automatically in GitHub Actions.

Sources:
  - COERLL / UT Austin, Français interactif, 2019 4th edition,
    https://www.laits.utexas.edu/fi/FrancaisInteractif-textbook.pdf
    This particular PDF says CC BY 4.0. Other catalogues may say CC BY 3.0;
    check each item's own notices and embedded third-party exceptions.
  - Ontario OER repository archive:
    https://openlibrary-repo.ecampusontario.ca/jspui/handle/123456789/438
    (the audio ZIP link path is discovered by matching visible file name
     in the official public item record, NEVER guessed or bypassed).

Safety:
  - No CAPTCHA/login/access-control bypass.
  - No publisher Inspire audio or textbooks are downloaded.
  - No videos; only PDFs and compressed audio ZIPs.
  - Chunked downloads; HTTP status, PDF/ZIP signatures and ZIP integrity checks.
  - No remote file can overwrite an existing local file. Existing matching files
    are re-indexed after SHA-256 verification.
  - Owner must choose the exact Google account in the Colab mount dialogue.
  - No API keys, service account JSON or refresh tokens in this repository.
  - Audios from open collections still require per-asset rights review before
    being distributed from public GitHub.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

DRIVE_ROOT = Path("/content/drive/MyDrive/Language-Learning-Hub/02-French")
BOOK_DIR = DRIVE_ROOT / "00-Complete-Open-Textbooks"
AUDIO_DIR = DRIVE_ROOT / "01-Licensed-Audio-Collections"
SOURCE_PAGE = "https://openlibrary-repo.ecampusontario.ca/jspui/handle/123456789/438"
PDF_URL = "https://www.laits.utexas.edu/fi/FrancaisInteractif-textbook.pdf"
LICENSE = "https://creativecommons.org/licenses/by/4.0/"
MAX_PDF = 150 * 1024 * 1024
MAX_ZIP = 300 * 1024 * 1024
TARGET_AUDIO = ("tex_mp3.zip", "French Audio.zip")
CHUNK_SIZE = 1024 * 1024


def safe_download(url: str, path: Path, max_bytes: int, kind: str):
    if not url.startswith("https://"):
        raise ValueError("Only HTTPS source URLs allowed")
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        print(f"EXISTS: {path} — not overwritten")
        return file_metadata(path, url, kind)
    temp = path.with_suffix(path.suffix + ".part")
    total = 0
    try:
        with requests.Session() as session:
            session.headers.update({"User-Agent": "LanguageLearningHub-PersonalOER/1.0"})
            with session.get(url, timeout=(20, 180), stream=True, allow_redirects=True) as response:
                response.raise_for_status()
                if not response.url.startswith("https://"):
                    raise RuntimeError("Unexpected non-HTTPS redirect")
                content_type = response.headers.get("Content-Type", "").lower()
                if "text/html" in content_type:
                    raise RuntimeError("Remote source returned HTML, not a PDF or ZIP file")
                announced_size = int(response.headers.get("Content-Length", "0") or "0")
                if announced_size > max_bytes:
                    raise RuntimeError("Remote file is too large")
                with temp.open("wb") as f:
                    for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                        if not chunk:
                            continue
                        total += len(chunk)
                        if total > max_bytes:
                            raise RuntimeError("Download exceeds configured file size")
                        f.write(chunk)
        with temp.open("rb") as f:
            head = f.read(8)
        if kind == "pdf" and not head.startswith(b"%PDF-"):
            raise RuntimeError("Downloaded file is not a PDF")
        if kind == "zip" and not head.startswith((b"PK\x03\x04", b"PK\x05\x06")):
            raise RuntimeError("Downloaded file is not a ZIP archive")
        if kind == "zip":
            import zipfile
            with zipfile.ZipFile(temp) as archive:
                bad = archive.testzip()
                if bad:
                    raise RuntimeError("ZIP integrity check failed for " + bad)
                # DO NOT extract third-party files to avoid unsafe paths and bulk duplication.
        temp.replace(path)
        return file_metadata(path, url, kind)
    finally:
        if temp.exists():
            temp.unlink()


def file_metadata(path: Path, source_url: str, kind: str):
    digest = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(CHUNK_SIZE), b""):
            digest.update(block)
    return {
        "filename": path.name,
        "bytes": path.stat().st_size,
        "sha256": digest.hexdigest(),
        "source_url": source_url,
        "type": kind,
        "downloaded_or_checked_utc": datetime.now(timezone.utc).isoformat(),
        "redistribution_review": "per_asset_review_required",
    }


def find_official_archives():
    """Find existing public repository download anchors; do not guess URLs."""
    r = requests.get(SOURCE_PAGE, timeout=(20, 45))
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    found = {}
    for anchor in soup.select("a[href]"):
        label = " ".join(anchor.get_text(" ", strip=True).split()).lower()
        for name in TARGET_AUDIO:
            if name.lower() in label or name.lower() in anchor["href"].lower():
                found.setdefault(name, urljoin(r.url, anchor["href"]))
    return found


def main():
    try:
        from google.colab import drive
    except ImportError as exc:
        raise SystemExit("Please run in Google Colab; see docs/oer-import.md") from exc
    print("Mount the exact Google account that owns YUNPAN / Language-Learning-Hub.")
    drive.mount("/content/drive")
    if not DRIVE_ROOT.is_dir():
        raise SystemExit(
            "Expected YUNPAN / Language-Learning-Hub/02-French directory is absent. "
            "Check the mounted Google account; do NOT create a similarly named folder elsewhere."
        )

    BOOK_DIR.mkdir(exist_ok=True)
    AUDIO_DIR.mkdir(exist_ok=True)
    records = []

    print("1) Downloading the official 2019 complete university textbook PDF...")
    try:
        entry = safe_download(PDF_URL, BOOK_DIR / "FrancaisInteractif_2019_4thEd.pdf", MAX_PDF, "pdf")
        entry.update({
            "authors": ["Karen Kelton", "Nancy Guilloteau", "Carl Blyth"],
            "publisher": "COERLL / University of Texas at Austin",
            "license": "CC BY 4.0 as stated in the 2019 complete PDF",
            "license_url": LICENSE,
        })
        records.append(entry)
    except Exception as exc:
        print("PDF FAILED:", exc)

    print("2) Discovering the authorized audio ZIP links from Ontario OER...")
    try:
        archives = find_official_archives()
    except Exception as exc:
        print("Audio catalogue discovery FAILED:", exc)
        archives = {}

    for name in TARGET_AUDIO:
        if name not in archives:
            print(f"NOT FOUND in the official archive: {name}. Check {SOURCE_PAGE} manually.")
            continue
        try:
            entry = safe_download(archives[name], AUDIO_DIR / name, MAX_ZIP, "zip")
            entry.update({
                "provider": "Français interactif, eCampusOntario public OER mirror",
                "license": "Per-file license and third-party exceptions must be reviewed",
                "source_catalogue": SOURCE_PAGE,
            })
            records.append(entry)
        except Exception as exc:
            print(f"FAILED {name}:", exc)

    index = {
        "project": "Language Learning Hub",
        "source_work": "Français interactif",
        "warning": "Source PDFs/audio rights vary. Never assume third-party media are covered by the main course licence.",
        "items": records,
    }
    index_path = BOOK_DIR / "open_french_oer_download_manifest.json"
    index_path.write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("COMPLETE. Verified files:", len(records))
    for item in records:
        print(item["filename"], item["bytes"], item["sha256"][:12])
    print("Manifest:", index_path)
    if not records:
        print("No downloads verified; please use official resource links in the source registry.")


if __name__ == "__main__":
    main()
