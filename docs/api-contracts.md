# Module Contracts v0.1 — Design only

No endpoint listed here is deployed. Schemas are deliberately provider-independent.

## Catalog service

- `GET /v1/courses?language=en|fr` => courses list + CEFR levels + source metadata.
- `GET /v1/lessons/{lessonId}` => lesson metadata; links to authorized content assets; grammar associations.
- `GET /v1/assets/{assetId}/metadata` => mime type, Drive ID reference, revision, license, duration and allowed usage; no public bearer-token leakage.
- `GET /v1/progress/{lessonId}` and `PUT /v1/progress/{lessonId}` => authenticated user's learning position only.

## AI Provider Adapter

`POST /v1/ai/explain`: input `{language, lessonId, query, providerId?, style?}`.
Output `{text, citedSourceIds, modelId, generatedAt}`.

`POST /v1/ai/content-drafts`: input `{language, lessonId, objective, providerId?}`.
Output `{draftId, sections, provenance, verificationFlags, status:"draft"}`.

`POST /v1/ai/content-drafts/{draftId}/approve`: protected write — validates origin/licensing and generates Drive file + Supabase index update. Errors are idempotently retryable to prevent orphan references.

## Pronunciation adapter

`POST /v1/pronunciation/evaluate` accepts authenticated temporary audio plus target text, language `en|fr`, and optional dialect. Request size/duration bounded.

Illustrative response:

```json
{
  "language": "en",
  "words": [
    {
      "text": "think",
      "startMs": 80,
      "endMs": 640,
      "color": "orange",
      "reason": "possible initial consonant mismatch",
      "phoneme": null,
      "confidenceBand": "medium"
    }
  ],
  "engine": "candidate-engine",
  "engineVersion": "pending-validation",
  "audioRetention": "none"
}
```

No sentence total score, percentage or forced phoneme diagnosis. `neutral` is allowed when model confidence is insufficient. Color mappings and mispronunciation calibration must be validated for each language.

## Drive sync adapter

`POST /v1/content/reindex`: authenticated, explicit file IDs from a user-authorized root; upsert metadata and checksum to Supabase. Use constrained Drive scopes, verify ownership/access, enforce maximum file sizes.

`GET /v1/jobs/{jobId}`: returns task status without private prompt or credentials.

## Auth and access

Supabase Auth user token for per-user APIs; separate server-side authorization for unattended agents. All client-facing tables use RLS. All API keys are server-side.

## Failure semantics

- `401/403`: authentication / authorization failure
- `404`: unknown or inaccessible resource
- `409`: stale content revision or concurrent update conflict
- `413`: oversized upload
- `429`: request/cost quota exceeded
- `503`: third-party model unavailable

Design target: auditable requests, bounded retries, clear user feedback, and no silent rewriting of licensed source content.
