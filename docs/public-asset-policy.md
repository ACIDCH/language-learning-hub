# Public learning asset policy (draft)

## Purpose

This repository is **public**. Small, **individually verified, legally redistributable** English/French learning content may be committed into `public/learning-assets/` and served with the independent GitHub Pages project site. This does not change the privacy of Google Drive or Supabase.

## Storage decision

| Classification | Canonical location | Examples |
| --- | --- | --- |
| `github_public` | `public/learning-assets/` | Project-original public educational material with explicit project display terms; individually cleared CC0 / CC BY / compatible CC BY-SA / verified public-domain texts and compressed audio |
| `google_drive_private` | Dedicated YUNPAN / `Language-Learning-Hub` | Personally owned PDFs, commercial textbooks (including Hachette Inspire), private audio, personal notes, recordings if explicitly saved, generated private lessons |
| `external_link` | Official provider URL, indexed in Supabase | Copyrighted material that can lawfully be linked but **not** republished; large licensed media where provider terms permit linking |

An item's `storage_kind` controls how it is retrieved. Supabase stores asset metadata, ownership, licence terms and location, **not the file itself**. GitHub and Drive are not mirrored automatically.

## Boundary between curriculum drafts and deployable teaching assets

Project-authored **review-only sample lessons and course frameworks** may live in `docs/curriculum/` or `config/curriculum/` as source specifications. They are already public GitHub text, so must not contain private learning data or third-party restricted passages. Once a lesson's text/audio becomes a **deployable public site asset**, it must be placed in `public/learning-assets/` and added to the manifest with a per-item provenance and file hash. GitHub documentation drafts are not equivalent to published lessons.

## Public project-original educational texts

The course author/owner approved publishing non-personal original sample lessons for website review. They are registered as `Project-Owned-Public-Display`, meaning **publicly visible on the independent learning site** but this code does not claim the owner has granted a broad CC BY or public-domain license. Do not relicense these texts automatically. Any future private/individual AI-generated content is excluded until the owner explicitly authorizes that content's publication. Always keep private Drive as the master source; these static text copies are reviewed publication snapshots with SHA-256 integrity metadata. Updates require keeping the Drive master and website publication snapshot aligned (manual QA currently; no background sync is configured).

## Mandatory verification before adding a public file

### V4.4 PR #50 original preview exception — awaiting owner decision

The 101 `original_draft` entries are project-authored drafts, not cleared publication snapshots. Their common policy is `content/v44-draft-publication.json`; each ID, source path and SHA-256 is in `content/v44-main-index.json`, and each source retains its version and authorship statement. No teaching text is changed by this status record. Earlier sample-lesson approval does **not** approve these new drafts.

Public preview permission (`pending_owner_confirmation`), human teaching review (`pending`) and formal textbook release (`not_approved`) are independent. The owner must explicitly approve preview use, with a recorded approval reference, before this branch can be deployed to the production site. This does not approve teaching quality, grant a redistribution licence, or waive the formal manifest/individual-review requirements below.

The existing Vite build now fails for Cloudflare production branch `CF_PAGES_BRANCH=main`, or a manual production build with `LLH_DEPLOY_TARGET=production`, while preview permission lacks approval/evidence. Normal local/CI builds and PR review previews remain available. This is a deployment gate, **not secrecy or DRM**: these JSON files, Git history and branch preview are already public. Do not promote an existing preview artifact to production to evade the gate. Keep PR #50 unmerged pending owner approval. If confidentiality is required instead, a separate private-storage migration and public-history/exposure assessment is necessary; deleting a UI link or splitting JS chunks cannot make existing copies private.

## Per-file public asset verification

1. Confirm the **individual audio/text file's** copyright status. Free-to-access, open-source software, and educational use do **not** automatically confer redistribution rights. Check for any third-party components, performances, translations, images and sublicensing restrictions.
2. Prefer the file's original source and an explicit license or public-domain notice. Do not take materials from unofficial textbook PDF/MP3 mirrors.
3. Confirm both **redistribution** and any proposed alteration/format conversion rights. CC BY requires author/source/license attribution and modification notice. CC BY-SA may require ShareAlike licensing for derivatives; CC BY-NC / ND and ambiguously licensed content require separate evaluation and default to Drive/external link.
4. Populate `public/learning-assets/manifest.json` before the commit with stable ID, repository relative path, language, title, author, HTTPS original URL, license code and HTTPS license or official rights URL, attribution, source review date, human reviewer, whether modified, byte size, SHA-256. One manifest record per file. No "approved" based merely on AI inference.
5. Use `python3 tools/validate_public_assets.py` and ensure the GitHub Actions check passes. The validator checks metadata and file integrity; it **cannot** determine legal rights by itself, so PR human review remains mandatory.
6. Keep app code and educational assets' licenses **separate**. Never assume a source-code license extends to someone else's media. Preserve attribution where the material is displayed.

## Concrete sourcing priorities

- **VOA Learning English**: its official [reuse policy](https://learningenglish.voanews.com/p/6861.html) says original Learning English texts and MP3s can be reused with credit, but specifically excludes AP, Reuters, AFP and other third-party copyrighted agency content. Check individual file/page and link to this policy in manifest.
- **Creative Commons CC0 or CC BY open educational resources**: use only items with explicit media-level rights and attribution. For French materials, some open textbooks have embedded third-party content, so **check each component**.
- **Hachette Inspire A1 / Cosmopolite and other commercial textbooks**: publisher downloadable audio is NOT automatically redistributable. Keep personal lawful files in private Drive; public site can display appropriate links and original explanations without reproducing protected passages.

## Limits and controls

- Initial public learning-asset budget: **200 MiB total**; **5 MiB maximum per individual file**, unless the owner approves a different limit and updates the validator. These are our own conservative project limits, not the GitHub hard limits.
- GitHub Pages itself has a **1 GB published-site size limit** and approximately **100 GB/month soft bandwidth limit**; recommended source repository size is ~1 GB. Avoid large archives, raw corpora and ML model weights in Pages.
- Public binary media become part of Git history; replacing or deleting files does not automatically reclaim all history size. Do not use Git LFS expecting it to bypass Pages size/hosting restrictions.
- Never include private course files, user recordings, access/refresh tokens, API secrets, unreviewed AI-generated personalized content, or Supabase service-role keys in GitHub.
- Repository-only assets remain publicly downloadable regardless of website login. If the owner wants to restrict access, the asset belongs in private Drive, not public GitHub.
- Review PRs before merge. On rights uncertainty, omit the binary and retain only a citation and external link.

## References

- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://creativecommons.org/licenses/by/4.0/
- https://learningenglish.voanews.com/p/6861.html
