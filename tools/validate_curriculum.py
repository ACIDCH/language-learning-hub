#!/usr/bin/env python3
"""Check bilingual curriculum structural integrity. Does NOT grade content accuracy."""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "config" / "curriculum" / "units.v1.json"
SOURCES = ROOT / "config" / "resources" / "sources.json"
LEVEL_COUNTS = {"A1": 12, "A2": 12, "B1": 10, "B2": 10, "C1": 8, "C2": 8}
STEPS = ["context", "grammar", "vocabulary", "reception", "pronunciation", "production"]
REQUIRED = {
    "id", "language", "level", "unit", "title", "can_do", "grammar",
    "vocabulary_domains", "pronunciation_focus", "performance_task",
    "learning_steps", "source_candidates", "source_alignment",
    "content_status", "optional_revisit", "prerequisite_unit"
}


def validate() -> list[str]:
    errors = []
    c = json.loads(COURSE.read_text(encoding="utf-8"))
    src = json.loads(SOURCES.read_text(encoding="utf-8"))
    source_ids = {i["id"] for i in src["sources"]}
    if c.get("schema_version") != 1:
        errors.append("Invalid curriculum schema version")
    for key in ("no_placement_testing", "no_periodic_exams", "no_aggregate_pronunciation_score"):
        if c.get(key) is not True:
            errors.append(f"{key} must be true")
    steps = c.get("learning_steps", [])
    if not isinstance(steps, list) or [x.get("id") for x in steps] != STEPS:
        errors.append("Six required learning steps do not match")
    units = c.get("units", [])
    if not isinstance(units, list) or len(units) != 120:
        errors.append(f"Expected 120 curriculum outlines; found {len(units)}")
        return errors
    counts = Counter()
    ids = set()
    for i, unit in enumerate(units):
        ctx = f"unit[{i}]"
        if not isinstance(unit, dict):
            errors.append(f"{ctx} must be object")
            continue
        if REQUIRED - unit.keys():
            errors.append(f"{ctx} missing: {sorted(REQUIRED - unit.keys())}")
            continue
        lang, level, number = unit["language"], unit["level"], unit["unit"]
        if lang not in ("en", "fr") or level not in LEVEL_COUNTS:
            errors.append(f"{ctx}: invalid language or CEFR level")
            continue
        counts[(lang, level)] += 1
        if not isinstance(number, int) or number < 1 or number > LEVEL_COUNTS[level]:
            errors.append(f"{ctx}: invalid unit order")
            continue
        expected_id = f"{lang}-{level.lower()}-u{number:02d}"
        if unit["id"] != expected_id or unit["id"] in ids:
            errors.append(f"{ctx}: duplicate/malformed ID")
        ids.add(unit["id"])
        if unit["learning_steps"] != STEPS:
            errors.append(f"{ctx}: missing or out-of-order learning steps")
        if unit["content_status"] != "outline_only":
            errors.append(f"{ctx}: do not claim full course content is complete")
        if unit["source_alignment"] != "NOT_YET_MAPPED_TO_INDIVIDUAL_SOURCE_LESSONS":
            errors.append(f"{ctx}: course-level links do not prove lesson-level media mapping")
        if unit["optional_revisit"] is not True:
            errors.append(f"{ctx}: optional revisit incorrectly disabled")
        if number == 1:
            if unit["prerequisite_unit"] is not None:
                errors.append(f"{ctx}: first unit must have no prerequisite")
        elif unit["prerequisite_unit"] != f"{lang}-{level.lower()}-u{number-1:02d}":
            errors.append(f"{ctx}: unexpected prerequisite")
        for attr in ("title", "can_do", "pronunciation_focus", "performance_task"):
            if not isinstance(unit[attr], str) or not unit[attr].strip():
                errors.append(f"{ctx}: {attr} must be present")
        for attr in ("grammar", "vocabulary_domains", "source_candidates"):
            if not isinstance(unit[attr], list) or any(not isinstance(x, str) or not x.strip() for x in unit[attr]):
                errors.append(f"{ctx}: invalid {attr}")
        if not unit["grammar"] or not unit["vocabulary_domains"]:
            errors.append(f"{ctx}: incomplete teaching targets")
        if not set(unit["source_candidates"]).issubset(source_ids):
            errors.append(f"{ctx}: unknown source reference")
        if not unit["source_candidates"] and level in ("A1", "A2", "B1", "B2"):
            errors.append(f"{ctx}: core course must contain source discovery candidates")
    for lang in ("en", "fr"):
        for level, expected in LEVEL_COUNTS.items():
            if counts[(lang, level)] != expected:
                errors.append(f"{lang} {level}: expected {expected} units, got {counts[(lang, level)]}")
    return errors


if __name__ == "__main__":
    failures = validate()
    if failures:
        for failure in failures:
            print("ERROR:", failure, file=sys.stderr)
        raise SystemExit(1)
    print("Bilingual curriculum outline: 120 units, 6 learning steps per unit, sources and prerequisites OK")
