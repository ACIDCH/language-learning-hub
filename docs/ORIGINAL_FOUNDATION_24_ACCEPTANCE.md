# Original foundational teaching bridge — 24 lessons (2026-10-18)

## Scope and status

This release adds **12 English + 12 French original supplementary units**, independent of the 108 V4 full-manuscript records. Existing canonical courses, French A1 original MP3, full manuscript QA, AI tutor and Codex pronunciation V3 are unchanged.

The optional progression in each language starts with letter-vs-speech distinctions, phonics, everyday vocabulary, simple sentences, phrases, reading/short passages and original written production. A six-stage interactive player exposes context, language rules, vocabulary, listening/reading, pronunciation prompts and two formative self-check questions with reasoned answer keys.

- **English:** 26 letters versus spoken sounds; vowels /ɪ/–/iː/; /θ/–/ð/ and final voiced consonants; word stress; numbers; be; articles and existence; present simple; do/does; text connectors; past/future; organized paragraphs.
- **French:** alphabet and accents; /i u y/; nasal vowels /ɑ̃ ɔ̃ ɛ̃/; silent finals and liaison; greetings/tu–vous; 0–30 and age; être/avoir; articles and grammatical gender; -er verbs; ne ... pas and questions; partitives; past events and futur proche paragraphs.
- Audio in these supplementary units is the user's own browser **TTS**, not 24 original A1 recordings, natural native-speaker narration, confirmed phonetic scores, or timed interactive captions.
- **Question answers** have explicit feedback and references to rule explanations. They are formative recall checks, not IELTS/CEFR proficiency tests.
- The 24 units remain a **bridge**, not proof that a full English A0–A2 or French A0–A2 complete multi-skill course is professionally finished. Current English 48 IELTS units are still at B1–C1.
- All authored contents are original project text. No commercial textbook passages copied or third-party recordings republished.
- The learner must press save or mark completion. Signed-in progress is stored in `foundation_progress` with owner-scoped RLS. Each language/unit has separate answers, notes, completion state and updated timestamp. This does not change the 108 existing `learning_progress` rows.

## Manual editorial and browser acceptance

1. Log in to `/cloud/`, open **零基础补充**, choose English/French, select unit, navigate six teaching stages and check hints/answers.
2. Confirm two different units have independent notes and saved self-checks after browser refresh; no cross-account data access.
3. Verify TTS produces the intended language where local voices are installed. If browser cannot synthesize French/English voice accurately, expose that limitation; don't use browser TTS as pronunciation certification.
4. Check different device sizes and accessibility, especially six-tab navigation, question focus, article text and answer visibility.
5. Human reviewers still need to check every new lesson for CEFR placement, grammatical accuracy and spoken naturalness, especially French nasalized vowels and liaison.
6. No overall pronunciation score, AI API key, or paid services are necessary.
7. The main 108-course reviewer backlog, human checks of all 24 uploaded MP3, account signup email delivery and Codex V3 remain separately tracked in `docs/DELIVERY_LEDGER_20261018.md`.

## Deployment

Apply `supabase/migrations/20261018165000_foundation_progress.sql` to the existing Supabase project, then merge the feature branch only after the new `foundationCurriculum` test, TypeScript/Pages build, and Worker checks pass. No new Cloudflare environment variable is required.
