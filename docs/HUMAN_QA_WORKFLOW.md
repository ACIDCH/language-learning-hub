# Manual course and audio QA completion workflow

Structural QA is only a triage aid. The Supabase `lesson_qa_structure` view currently shows 108/108 draft lessons with all six stage symbols, 97/108 with recognizable answer/solution markers, and 0/108 approved.

## Reviewer controls
- Each signed-in lesson has a private review record: grammar and examples, exercises/answers, CEFR/IELTS level, six-stage instructional flow, and source provenance.
- Checklists and notes can be saved without changing `qa_status`.
- When all five boxes have been verified, the learner must additionally check a separate explicit approval checkbox and press an approval button. Only then does the account-owned copy of `private_lesson_content.qa_status` become `approved`. AI model reviews never auto-approve.
- Audio playback requires a real private file and signed URL. A separate review record then tracks listened, audio/text match, intelligibility and notes. This personal review does **not** silently set the shared `course_audio_index.audio_verified` flag.

## Current exact exceptions
Answer-marker heuristics did not detect a solution in:
`fr-b2-u03`, `fr-b2-u04`, `fr-b2-u05`, `fr-c2-u01` through `fr-c2-u08`.
This does **not** prove that answers are absent. Review actual examples and exercise keys before marking them deficient.

## Remaining real-world acceptance
- Only 24 original synthetic A1 MP3 are available in YUNPAN, and the secure Storage bucket was created empty. A single authenticated ZIP upload is required before the player can serve these files; quality/listen-through then requires the owner.
- 353 external reference recordings are unmapped to lessons and may carry third-party usage restrictions. Do not upload/relicense blindly.
- AI tutor/essay coach requires a valid end-user provider key and quota. Mocked provider tests are not genuine provider acceptance.
- SpeechRecognition supplies transcription matching, NOT validated phoneme-level scoring. Advanced acoustic feedback requires a dedicated model/service and separate tests.
