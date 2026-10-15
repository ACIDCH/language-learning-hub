#!/usr/bin/env python3
"""Validate external learning source registry seeds (format and policy)."""
import json
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "config" / "resources" / "sources.json"
VALID_INGESTION = {"link_only", "per_item_review_for_public_asset"}
VALID_TOPICS = {"grammar","listening","reading","speaking","pronunciation","vocabulary","speech-data"}
LEVELS = {"A1", "A2", "B1", "B2", "C1", "C2"}
REQUIRED = {"id","language","title","organization","url","levels","topics","audio","access","ingestion","license_note"}


def https(s):
    p = urlparse(s) if isinstance(s, str) else urlparse("")
    return p.scheme == "https" and bool(p.netloc)

def check():
    errors=[]
    raw=json.loads(REGISTRY.read_text(encoding="utf-8"))
    if raw.get("schema_version") != 1: errors.append("schema_version must be 1")
    entries=raw.get("sources",[])
    if not isinstance(entries, list) or not entries: errors.append("sources must be a non-empty array");return errors
    ids=set()
    for i,x in enumerate(entries):
        prefix=f"sources[{i}]"
        if not isinstance(x,dict): errors.append(f"{prefix}: expected object");continue
        missing=REQUIRED-set(x)
        if missing: errors.append(f"{prefix}: missing {sorted(missing)}"); continue
        if x["id"] in ids: errors.append(f"{prefix}: duplicate ID")
        ids.add(x["id"])
        if x["language"] not in {"en","fr"}:errors.append(f"{prefix}: invalid language")
        if not https(x["url"]):errors.append(f"{prefix}: non-HTTPS official URL")
        if "rights_url" in x and not https(x["rights_url"]):errors.append(f"{prefix}: non-HTTPS rights URL")
        if x["ingestion"] not in VALID_INGESTION: errors.append(f"{prefix}: unsupported ingestion")
        if not isinstance(x["levels"],list) or not set(x["levels"]).issubset(LEVELS):errors.append(f"{prefix}: invalid CEFR levels")
        if not isinstance(x["topics"],list) or not x["topics"] or not set(x["topics"]).issubset(VALID_TOPICS):errors.append(f"{prefix}: invalid topics")
        if not isinstance(x["audio"],bool): errors.append(f"{prefix}: audio must be boolean")
        if not isinstance(x["license_note"],str) or not x["license_note"].strip():errors.append(f"{prefix}: required license note")
        for key in ("title","organization","access"):
            if not isinstance(x[key],str) or not x[key].strip():errors.append(f"{prefix}: invalid {key}")
    return errors

if __name__ == "__main__":
    issues=check()
    if issues:
        for i in issues: print("ERROR",i,file=sys.stderr)
        raise SystemExit(1)
    print("Learning source registry checks OK")
