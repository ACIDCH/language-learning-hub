# Frontend pages and states — V3

## Information architecture (site navigation)

**Desktop:** compact fixed header + 236 px left primary navigation + adaptive work area; optional right lesson tools panel on wide screens.  
**Mobile:** header, compact tab navigation, drawer course outline and stacked lesson segments.  
**No hero banner, learning score leaderboard, social feed or generic promotional copy.**

| Path / screen | Primary objects | Actions | Empty / error state |
| --- | --- | --- | --- |
| `/courses` | Languages, tracks/levels, unit cards, ready vs outline states | Choose a language; continue; search or filter | “No matching lessons” or “Only an outline is ready” |
| `/courses/:lang/:unitId` | Full original lesson, 6-step location navigation, authorized media and sources | Jump to a section, playback, edit notes, cite origin | Missing asset preserves unit metadata, offers retry; never displays synthetic content |
| `/library` | Personal items, authorized open resources and provider websites | Filter, inspect metadata and attribution | “No resources yet” |
| `/materials/import` | Uploader, Drive Inbox link, queued import jobs | Choose files, scan, preview mapping, approve/reject | Explicit “not uploaded,” upload failure, partial extraction, needs review |
| `/materials/:id` | Full original, extracted chapters, companion media, versions, rights | Compare import and source; approve mapping | Missing original must block publishing |
| `/practice` | User selected exercises, prior written drafts and feedback | Draft and revise freely | No compulsory exam or numeric test performance |
| `/ai-tutor` | Contextual selected paragraph/question with source citations | Ask for an explanation or original exercise | Model unavailable, quota exceeded, source missing |
| `/settings` | Language/locale, AI Provider choice, consent, Drive sync scope | Change user preferences | Clearly show disconnected Drive and unverified identity |

Use route aliases or nested tabs if Codex already has existing paths. Keep **stable public URLs** for units, independent of asset storage provider.

## Page 01 — course workspace

1. Header: site name, top-level “课程 / 我的资料 / AI 助手 / 设置” and signed-in status. Do not hide whether login is configured.
2. Left: English (IELTS six skill tracks), French (CEFR A1–C2), additional languages from configuration. In each course level, title and explicit maturity: `outline`, `draft`, `media_pending`, `reviewed`, `published`.
3. Main: learning objectives, previous/next navigation, 6-stage anchor bar, **entire original body** (including appendices and answer keys). Long text is scannable through headings, not shortened.
4. Right (optional): exact asset source, page citations, reference audio, vocabulary notes and AI “explain selected passage”. The right panel can collapse but may never cover the source text.
5. At < 900 px use a collapsible lesson directory instead of 3 columns. At < 600 px stack all controls and enlarge tap targets.

### Full-content invariants

- Render every block with its original `blockId`, `sourceSpan`, `chapter`, `page`, order and asset ID.
- Text extraction may include warnings for uncertain OCR, charts and tables; **never silently drop** pages, exercises, footnotes or end-of-book answer sections.
- A “simplified explanation” is an **additional derivative**, not a replacement for the original.
- Authorised original PDF reading always remains accessible next to converted structured content.
- Scrolling section does not mean fetching only excerpts permanently; progressive loading is permitted if **all blocks can be retrieved and checked** and there is a visible complete-content mode.
- Empty audio files must not generate clickable fake playback controls; show “录音尚未匹配”.

## Page 02 — personal materials import

Entry methods:
- **Website uploader:** PDF, DOCX, EPUB, TXT/MD, legal HTML exports, MP3/M4A/OGG/WAV, SRT/VTT, ZIP (validated on server).
- **Drive inbox:** open only the dedicated folder `03-Personal/00-Inbox`; scan is user-initiated initially. Agent-driven cron sync is opt-in with constrained Drive OAuth and audit log.
- **Manual file mapping:** book/chapter ↔ MP3/track ↔ transcript ↔ exercises/answers; no guessed assignments promoted without review.

Flow: local file selection → type/size validation → authenticated private upload → `uploaded` → virus/archive validation → extract with provenance → identify language/book structure → match audio by metadata/sequence/transcript → **review diff and missing-content report** → user approval → import to private course library → library index/progress ready.

Never move/delete `00-Inbox` originals automatically, and never copy the uploaded material into this public GitHub repository. `01-Originals` stores an immutable or versioned copy; `02-Converted` stores structured output; `03-Import-Reports` stores per-job quality reports.

### Conversion preview

Show side-by-side **Original (source chapter/page)** and **Structured lesson**. Allow:
- Chapter title correction and language classification
- Audio-to-chapter and transcript alignment adjustment
- Split/merge/rename lesson segments without discarding text
- Flagging missing pages, transcript, images, unknown font, unreadable scans and uncertain text extraction
- Copyright/privacy classification review
- Approve or reject import; partial approved imports remain labelled incomplete

## Page 03 — AI and pronunciation

AI:
- Input is selected lesson passage + provenance refs; outputs a separately labelled explanation and optional original exercises.
- Reject unsupported citations, sanitize displayed HTML/Markdown, and do not submit full commercial books to third-party providers without permission/privacy review.
- AI API credentials remain server-side, with per-model limits and disclosure of usage.

Pronunciation:
- Short opt-in recording only; inspect permissions before capture.
- Reference text/clip visible, per-word `green|yellow|orange|red|neutral` only after validated assessment.
- No overall sentence score and no automatically mandated repeat loop.
- Accessibility: don't convey correctness with color alone; show text labels and uncertainty.

## Required states

`idle`, `loading`, `empty`, `error`, `unauthorized`, `offline`, `needs_review`, `incomplete`, `ready`. These are not interchangeable; the UI must never silently turn an error into blank content.

## Accessibility and UX acceptance

- Semantic landmarks; skip-to-content; visible focus; keyboard-operable tabs; correctly labelled file picker; `aria-live` for asynchronous updates.
- WCAG AA text contrast target; large clickable controls; don't rely on color-only feedback.
- Respect prefers-reduced-motion and browser text zoom.
- Audio playback: captions/transcripts when lawful and available, speed control, seek bar and keyboard controls.
- Support Chinese language UI with original English/French lesson text, preserving accents and IPA.
- Test content at mobile 360 px, tablet 768 px, desktop 1280/1440 px.
