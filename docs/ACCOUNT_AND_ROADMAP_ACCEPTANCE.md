# Accounts and learning roadmap: deployment gates

- Cloud account login, 108 owner-scoped manuscripts and progress sync are the production baseline. Existing password accounts are unaffected.
- New `/cloud/` UI offers optional `signUp`, `verifyOtp(type='signup')`, email resend (60s client cooldown), `resetPasswordForEmail` and `updateUser` after a `PASSWORD_RECOVERY` Supabase Auth event.
- The email confirmation template must supply a six-digit `{{ .Token }}` if users are expected to enter a code. Supabase may instead send a clickable confirmation link; both are distinct from proof of successful email delivery.
- Recovery redirect URL: `https://language-learning-hub.pages.dev/cloud/`. This path must be allowed in Supabase Authentication → URL Configuration. Public built-in email limits may prevent delivery to non-team recipients; configure and verify SMTP if needed. No mail is sent by merely deploying UI.
- Never put service-role keys, user passwords or SMTP credentials in a public repository.
- Browser acceptance still required: existing account login, real registration/confirmation code or link, expiry/resend errors, recovery email, valid reset, sign-out and reload.
- The new learning path groups *existing* 60 French units A1–C2 and 48 IELTS English skill units. It does not invent English A0–A2 foundation lessons. Six stepping stones (sounds, words, sentences, paragraphs, complex sentences, tasks) are navigation suggestions rather than proof of authored or QA-approved independent modules.
- Existing Supabase course progress drives completion. No new database tables and no personal-record changes are needed.
- The separate Codex Issue #20 pronunciation V3 and AI teacher code are untouched.


## Registration / recovery reliability update (2026-10-20)
- Existing Supabase Auth default mail service is **not a public transactional SMTP**. Supabase official rule: send only to authorized organization/team member addresses; as of October 2026 built-in mail quota is 2/hour across project. A 200 from `/signup` is **not delivery confirmation**. Auth logs show one `/signup` 200 within the inspected 24h; do not disclose recipient address or infer inbox delivery.
- Fix account pages to avoid claiming successful delivery; display errors for `email_address_not_authorized`, rate-limit, OTP expiry, non-allowlisted redirect, and unconfirmed emails. Signup offers link/6-digit verification and resend; password recovery offers link, 6-digit recovery OTP, resend, and authenticated password change.
- Support confirmed `token_hash` callbacks on reviewed account route as well as standard Supabase Auth implicit flow. Consume token hash from address bar without sending it to logs. Supabase URL Configuration must allow exactly `https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/**`; production origin separate and untouched.
- **SMTP external prerequisite:** account owner configures verified sender/domain and provider SMTP (e.g. Brevo Free: 300/day; Resend Free: 3,000/month and 100/day) in Supabase Dashboard > Authentication > SMTP Settings. Authenticate sender via DNS DKIM/SPF and adjust rate limits. NO credentials in GitHub, browser or chats.
- End-to-end completion requires two **real inboxes** and a recovery test of an authorized spare account. Check provider delivery logs, arrival, redirect, expiration, login and signout. CI cannot validate SMTP delivery, and no email is sent by building code. Do not bypass email verification by auto-confirming users.

### Ready-to-paste email templates (2026-10-20)
- `docs/auth_templates/confirmation.html` → Dashboard Authentication → Email Templates → Confirm signup.
- `docs/auth_templates/recovery.html` → Dashboard Authentication → Email Templates → Reset password.
- Both retain the official Supabase `{{ .ConfirmationURL }}` button and `{{ .Token }}` six-digit OTP for optional recovery/verification via UI. The link redirects to the **allowlisted** Pages account origin set in `emailRedirectTo` / `redirectTo`; it does not hardcode production or test tokens.
- These are source templates and must be pasted/applied by the project owner in Supabase Dashboard; GitHub merge or CI alone does not mutate Auth email templates. Do not configure a custom `{{ .TokenHash }}` redirect unless its verification route is explicitly reviewed.
