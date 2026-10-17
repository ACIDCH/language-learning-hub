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
