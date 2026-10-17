# Account workflows and cross-device acceptance (work in progress)

This document accompanies `feature/account-email-otp-ui-v1`, which is based on PR #8 commit `1f55795`. It does not change the source manuscripts, audio inventory, AI providers or existing 108-course acceptance ledger.

## Existing account compatibility

- Existing Supabase Auth users log in with the same email and password as before.
- Existing `learning_progress` rows and RLS policies are unchanged.
- New accounts are created by Supabase Auth, never by writing directly to `auth.users`.
- Local state still saves automatically; the **同步学习进度** action is manual.
- No service-role credential or user's password belongs in the frontend code, GitHub, reports or chat.

## Before enabling email OTP signup

1. Dashboard > Authentication > Providers > Email: turn on **Confirm email** for this project.
2. Dashboard > Authentication > Email Templates > **Confirm signup**: the email body must contain `{{ .Token }}` (six-digit OTP), not just the default confirmation link.
3. Use **Authentication > SMTP Settings** to configure and test an approved SMTP provider if sending to any address beyond project-team addresses. The built-in Supabase email sender has significant recipient and rate limitations; it is not a production email solution.
4. For forgot-password email links, allowlist the actual frontend URL(s) in Authentication > URL Configuration, e.g. the local Vite path, and ensure the sender can deliver the recovery email.
5. Use only the Supabase project URL and publishable key on the client. Verify that the existing project has the expected `learning_progress` RLS policies.

## UI test matrix (pending actual browser/email tests)

| Check | Expected outcome |
| --- | --- |
| Pre-existing account login | Login succeeds; email displayed; previous progress remains |
| Signup using fresh test address | Supabase sends OTP, confirmation required |
| OTP success | Confirmed Auth user and logged-in session |
| Wrong / expired OTP | Explicit error; no successful verification |
| OTP resend | Disabled by frontend cooldown; server rate limits still apply |
| Repeated email registration | No account duplication; an actionable provider response |
| Supabase connection missing | UI shows configuration error, no false success |
| Forgot password | A recovery email can be received; correct URL redirect |
| Password recovery link | Auth event brings up new password form |
| Set new password | Existing account can log in with its new password |
| Refresh / sign-out / sign-in | Session state matches Supabase, local progress stays |
| Manual cloud sync | Authenticated user's own records are synced, preserving existing conflict safeguards |
| Network off / rate-limited SMTP | User-facing error; no false 'sent successfully' claim |
| Mobile viewport | Inputs, message, tab controls and buttons are usable |

Do **not** mark any email or second-device acceptance as passed from unit tests or code review alone.

## Two-device reality check

The current FastAPI private-material backend binds to `127.0.0.1:8765` and the Vite frontend to local `127.0.0.1:5173`. Thus entering the first computer's localhost URL on a second computer or phone will not work. The cloud `learning_progress` table synchronizes **progress**, not private course text or source media.

To validate without exposing private books:
1. If both devices have a local backend with the same course IDs, start the approved local service on each one.
2. Login to the same Supabase account using each device.
3. Change one test course's notes/progress on A, save locally, click manual cloud sync.
4. On B click manual cloud sync and verify remote state and original `updated_at` are restored, not replaced with the time of download.
5. Make a newer edit on B and sync; verify older A copies cannot silently overwrite a newer remote update.
6. Test sign out, sign in, browser reload, intermittent connectivity; remove only the isolated test record after capturing results.
7. Record actual device/browser, timestamp, redacted screenshots and **pass/fail** separately for cloud-state sync and private-book access.

A browser's second profile is helpful for preliminary session isolation but is not equivalent to a second physical device. Future remotely accessible UI/asset serving requires a separate deliberate deployment/authorization design and should not be called 'completed' until tested.

## Integration

The account work is isolated from Codex's editorial/AI work. The account feature PR should target `integration/personal-learning-v4` and remain draft until build, real OTP delivery, password recovery, and cloud-sync regression checks pass. After both tracks pass, merge the feature into the integration branch before merging the integration PR into `main`. Resolve concurrent conflicts rather than force-pushing either branch.
