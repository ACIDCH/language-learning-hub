#!/usr/bin/env python3
"""Validate language learning curricula. This validates structure, not teaching quality."""
from __future__ import annotations
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CURRICULUM = ROOT / "config/curriculum/units.v1.json"  # retained path, v2 schema
SOURCES = ROOT / "config/resources/sources.json"
FR = {"A1": 12, "A2": 12, "B1": 10, "B2": 10, "C1": 8, "C2": 8}
EN = {"listening", "reading", "writing-task1", "writing-task2", "speaking", "language-upgrade"}
STEPS = ["context", "grammar", "vocabulary", "reception", "pronunciation", "production"]
FIELDS = {"id","language","level","unit","title","can_do","grammar","vocabulary_domains","pronunciation_focus","performance_task","learning_steps","source_candidates","source_alignment","content_status","optional_revisit","prerequisite_unit"}

def validate() -> list[str]:
    errors=[]
    c=json.loads(CURRICULUM.read_text(encoding="utf-8"))
    src=json.loads(SOURCES.read_text(encoding="utf-8"))
    refs={s["id"] for s in src["sources"]}
    if c.get("schema_version") != 2: errors.append("schema_version must be 2")
    for key in ("no_placement_testing","no_periodic_exams","no_aggregate_pronunciation_score"):
        if c.get(key) is not True:errors.append(key + " must remain true")
    if [s.get("id") for s in c.get("learning_steps",[])]!=STEPS:
        errors.append("six-step teaching chain mismatch")
    units=c.get("units",[])
    if not isinstance(units,list) or len(units)!=108:
        return errors+[f"expected 108 units, got {len(units)}"]
    counts=Counter();seen=set()
    for i,u in enumerate(units):
        ctx=f"unit[{i}]"
        if not isinstance(u,dict): errors.append(ctx+" not object");continue
        missing=FIELDS-set(u)
        if missing: errors.append(ctx+f" missing {sorted(missing)}");continue
        lang=u["language"];idx=u["unit"];level=u["level"]
        if lang=="en":
            track=u.get("track")
            if track not in EN:errors.append(ctx+" invalid IELTS track");continue
            counts[("en",track)]+=1
            expected=f"en-ielts-{track}-u{idx:02d}" if type(idx)==int and 1<=idx<=8 else "BAD"
            previous=f"en-ielts-{track}-u{idx-1:02d}" if type(idx)==int and idx>1 else None
            if level in {"A1","A2"}:errors.append(ctx+" beginner English level must not appear")
        elif lang=="fr":
            if level not in FR:errors.append(ctx+" invalid French level");continue
            counts[("fr",level)]+=1
            expected=f"fr-{level.lower()}-u{idx:02d}" if type(idx)==int and 1<=idx<=FR[level] else "BAD"
            previous=f"fr-{level.lower()}-u{idx-1:02d}" if type(idx)==int and idx>1 else None
        else:errors.append(ctx+" invalid language");continue
        if u["id"]!=expected or u["id"] in seen:errors.append(ctx+" invalid/duplicate unit ID")
        seen.add(u["id"])
        if u["prerequisite_unit"]!=previous:errors.append(ctx+" unexpected prerequisite")
        if u["learning_steps"]!=STEPS:errors.append(ctx+" not six learning steps")
        if u["content_status"]!="outline_only":errors.append(ctx+" must not claim full lesson completion")
        if u["source_alignment"]!="NOT_YET_MAPPED_TO_INDIVIDUAL_SOURCE_LESSONS":errors.append(ctx+" media mapping is unverified")
        if u["optional_revisit"] is not True:errors.append(ctx+" forced revision must not appear")
        for field in ("title","can_do","pronunciation_focus","performance_task"):
            if not isinstance(u[field],str) or not u[field].strip():errors.append(ctx+" empty "+field)
        for field in ("grammar","vocabulary_domains","source_candidates"):
            if not isinstance(u[field],list) or any(not isinstance(k,str) for k in u[field]):
                errors.append(ctx+" invalid "+field)
        if not u["grammar"] or not u["vocabulary_domains"]:errors.append(ctx+" missing grammar/lexis")
        if not set(u["source_candidates"]).issubset(refs):errors.append(ctx+" unknown source")
        if lang=="en" and not u["source_candidates"]:errors.append(ctx+" IELTS source candidates empty")
        if lang=="fr" and level in ("A1","A2","B1","B2") and not u["source_candidates"]:
            errors.append(ctx+" missing French core references")
    for t in EN:
        if counts[("en",t)]!=8:errors.append(f"English {t}: expected 8, got {counts[('en',t)]}")
    for lv,count in FR.items():
        if counts[("fr",lv)]!=count:errors.append(f"French {lv}: expected {count}, got {counts[('fr',lv)]}")
    return errors

if __name__=="__main__":
    issues=validate()
    if issues:
        for err in issues:print("ERROR:",err,file=sys.stderr)
        raise SystemExit(1)
    print("Curriculum v2: English IELTS-style 48 + French CEFR 60 = 108 outline units; structural integrity OK")
