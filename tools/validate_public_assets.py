#!/usr/bin/env python3
"""Validate PUBLIC learning assets only. Human licensing review is still required."""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "public" / "learning-assets"
MANIFEST = ASSET_DIR / "manifest.json"
MAX_ASSET_BYTES = 5 * 1024 * 1024
MAX_TOTAL_BYTES = 200 * 1024 * 1024
ALLOWED_SUFFIXES = {".mp3", ".m4a", ".ogg", ".pdf", ".txt", ".md", ".vtt", ".json"}
ALLOWED_LICENSES = {
    "CC0-1.0", "CC-BY-3.0", "CC-BY-4.0",
    "CC-BY-SA-3.0", "CC-BY-SA-4.0", "Public-Domain", "Project-Owned-Public-Display",
}
REQUIRED_FIELDS = {
    "id", "path", "title", "language", "author", "source_url",
    "license", "license_url", "attribution", "verified_at",
    "reviewed_by", "modified", "sha256", "bytes",
}
IGNORE_FILENAMES = {"README.md", "manifest.json"}
PRIVATE_MEDIA_SUFFIXES = {".wav", ".flac", ".mp3", ".ogg", ".m4a", ".mp4", ".pdf", ".zip"}


def _is_https(url: object) -> bool:
    if not isinstance(url, str):
        return False
    parsed = urlparse(url)
    return parsed.scheme == "https" and bool(parsed.netloc)


def validate(root: Path = ROOT) -> list[str]:
    problems: list[str] = []
    asset_dir = root / "public" / "learning-assets"
    manifest_path = asset_dir / "manifest.json"
    if not manifest_path.is_file():
        return ["Missing public/learning-assets/manifest.json"]
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        return [f"Invalid asset manifest: {e}"]
    if set(manifest) != {"manifest_version", "assets"} or manifest["manifest_version"] != 1:
        problems.append("Manifest requires manifest_version: 1 and assets")
    items = manifest.get("assets")
    if not isinstance(items, list):
        return problems + ["assets must be a list"]

    seen_paths: set[str] = set()
    seen_ids: set[str] = set()
    total_bytes = 0
    for index, entry in enumerate(items):
        context = f"assets[{index}]"
        if not isinstance(entry, dict):
            problems.append(f"{context}: expected object")
            continue
        missing = REQUIRED_FIELDS - entry.keys()
        if missing:
            problems.append(f"{context}: missing fields {sorted(missing)}")
            continue
        if not isinstance(entry["id"], str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]{1,80}", entry["id"]):
            problems.append(f"{context}: invalid stable ID")
        if entry["id"] in seen_ids:
            problems.append(f"{context}: duplicate ID")
        seen_ids.add(entry["id"])
        path_text = entry["path"]
        if not isinstance(path_text, str):
            problems.append(f"{context}: path must be a string")
            continue
        path = Path(path_text)
        if (path.is_absolute() or ".." in path.parts or
                path.as_posix() != path_text or
                path.parts[:2] != ("public", "learning-assets") or
                len(path.parts) < 3):
            problems.append(f"{context}: invalid public asset location: {path_text}")
            continue
        if path_text in seen_paths:
            problems.append(f"{context}: duplicate path")
        seen_paths.add(path_text)
        if path.suffix.lower() not in ALLOWED_SUFFIXES:
            problems.append(f"{context}: unsupported media type")
        if entry["language"] not in ("en", "fr", "mul"):
            problems.append(f"{context}: unsupported language")
        if entry["license"] not in ALLOWED_LICENSES:
            problems.append(f"{context}: license not cleared for default public policy")
        if not _is_https(entry["source_url"]) or not _is_https(entry["license_url"]):
            problems.append(f"{context}: official source and license links must be HTTPS")
        for key in ("title", "author", "attribution", "reviewed_by"):
            if not isinstance(entry[key], str) or not entry[key].strip():
                problems.append(f"{context}: missing {key}")
        if type(entry["modified"]) is not bool:
            problems.append(f"{context}: modified must be boolean")
        try:
            date.fromisoformat(entry["verified_at"])
        except (TypeError, ValueError):
            problems.append(f"{context}: verified_at requires YYYY-MM-DD")
        if not isinstance(entry["sha256"], str) or not re.fullmatch(r"[a-f0-9]{64}", entry["sha256"]):
            problems.append(f"{context}: sha256 must be lowercase hex")
        p = root / path
        if not p.is_file() or p.is_symlink():
            problems.append(f"{context}: missing file or unsafe symlink: {path_text}")
            continue
        file_size = p.stat().st_size
        if type(entry["bytes"]) is not int or entry["bytes"] != file_size:
            problems.append(f"{context}: declared size differs from file")
        if file_size > MAX_ASSET_BYTES:
            problems.append(f"{context}: file exceeds 5 MiB limit")
        if hashlib.sha256(p.read_bytes()).hexdigest() != entry["sha256"]:
            problems.append(f"{context}: SHA-256 mismatch")
        total_bytes += file_size

    if total_bytes > MAX_TOTAL_BYTES:
        problems.append("Public assets exceed 200 MiB total budget")
    for p in asset_dir.rglob("*"):
        if p.is_symlink():
            problems.append(f"Asset folder contains symlink: {p.relative_to(root)}")
        if not p.is_file() or p.name in IGNORE_FILENAMES:
            continue
        if p.relative_to(root).as_posix() not in seen_paths:
            problems.append(f"Unmanifested public asset: {p.relative_to(root)}")

    # No binary teaching materials may be committed outside the approved public area.
    try:
        tracked = subprocess.run(
            ["git", "ls-files", "-z"], cwd=root, check=True,
            capture_output=True, text=False,
        ).stdout.decode("utf-8").split("\0")
        for tracked_path in filter(None, tracked):
            path = Path(tracked_path)
            if path.suffix.lower() in PRIVATE_MEDIA_SUFFIXES and tracked_path not in seen_paths:
                problems.append(f"Binary resource outside approved manifest: {tracked_path}")
    except (FileNotFoundError, subprocess.CalledProcessError) as e:
        problems.append(f"git ls-files unavailable: {e}")
    return problems


if __name__ == "__main__":
    errors = validate()
    if errors:
        for error in errors:
            print("ERROR:", error, file=sys.stderr)
        raise SystemExit(1)
    print("Public asset manifest and repository media placement: OK")
