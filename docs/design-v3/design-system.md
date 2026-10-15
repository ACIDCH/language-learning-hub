# Design system V3 — approved academic clean

Design criteria: **high information density without clutter**, long-form reading first, no large marketing hero images or unnecessary mottos.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--canvas` | `#F3F7FB` | neutral workspace background |
| `--surface` | `#FFFFFF` | panels and reader |
| `--surface-muted` | `#EDF3F8` | low-emphasis groupings |
| `--ink` | `#17344D` | primary text |
| `--ink-muted` | `#556F83` | metadata |
| `--navy` | `#173E64` | headers and strong actions |
| `--blue` | `#0C689B` | active navigation/links |
| `--border` | `#DCE6EF` | component separation |
| `--focus` | `#176FB1` | focus ring |
| `--positive` | `#256C46` | ready/confirmed status |
| `--warning` | `#9C651F` | media missing, review required |
| `--danger` | `#AF3A3A` | real errors only |

Typography: UI Segoe UI / system sans / Noto Sans CJK fallback; body 14–16 px, line-height >= 1.65, full lesson 15–16 px with line-height 1.85; headings at 18–26 px; muted metadata >= 12 px. Avoid decorative fonts and uppercase paragraphs.

Spacing scale: 4 / 8 / 12 / 16 / 24 / 32; maximum readable prose width around 80 characters, with line wrapping and full original text intact. Controls min-height roughly 40–44 px on mobile.

## Components and responsibilities

- `AppShell`: nav, auth status, responsive grid only
- `LanguageSwitcher`: chooses `en`, `fr` or future custom language, preserves per-language recent selection
- `CourseTree` + `UnitList`: levels/tracks, titles, readiness badges
- `LessonReader`: all content blocks, stable anchor IDs, tables/media/footnotes, unabridged
- `SixStageNav`: jump/scroll, not a lossy data filter; active stage announced
- `SourceReference`: full provenance info, direct legitimate source link
- `AssetStatus`: verified, incomplete, unavailable, missing rights
- `MaterialUploader` + `DriveInboxCard` + `ImportReview`: status-driven import UI
- `AudioPlayer`: only if actual playable asset and permitted stream; transcript/track mapping
- `PronunciationTokens`: accessible label as well as color, neutral/uncertain
- `AIAssistantPanel`: context-grounded explanation; model/rate limit errors

## Prototype interaction boundaries

The standalone demo contains only **local, explicitly mocked states**. A file picker may display filenames selected in the browser, but it does not upload them. “Open Drive Inbox” is a real navigation to the verified Drive folder. The preview's lesson snippets are demonstration text and are **not** represented as the completed curriculum. No external UI library code is copied.

## Open-source compatibility

Review `shadcn-ui/ui` (MIT) for accessible component patterns; use only if compatible with Codex's actual React/CSS stack. Consider H5P (e.g. MIT-licensed interactive content modules) later for optional self-practice but not as a new learning system dependency by default. Open edX Learning MFE (AGPLv3) is architecture inspiration only; do not paste its implementation.

## Visual QA

Check line breaks in Chinese, French accents, IPA, long URLs and mixed-language tables. Verify light theme contrast in actual browser rather than claiming WCAG conformance merely from token definitions. Capture screenshots after real implementation, not before.
