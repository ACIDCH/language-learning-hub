# PR #50：真实双设备验收（待人工执行）

本轮没有取得两个独立实机上的本人登录会话。以下步骤和只读探针已准备好；不能用本地 mock、数据库存在或 API 读取代替登录验收。不在聊天中发送密码或访问令牌。

预览：<https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/>。必须先确认 PR 最新提交对应的 Pages 检查成功。数据库长答案迁移 `20261024095927_expand_foundation_learning_answers.sql` 仅随 PR 提交，尚未应用；迁移审批前可验证短答案，长答案云端仍可能被旧限制拒绝，本机草稿会保留。

1. 设备 A 本人登录。在 `en-ielts-reading-u01` 和 `fr-fnd-24` 各记录原有笔记与表达答案，作为恢复备份。不要删除原有内容。
2. 在两课的笔记和表达答案末尾追加同一个唯一标记，例如 `llh-pr50-20261025-owner-check`；点击「保存到 Supabase」，确认出现保存成功，而不是仅保存本机。
3. 刷新并切换课程，核对两个标记及原有内容均完整；打开语法/词汇章节，返回课程，检查所选环节与练习答案恢复。收藏一个原文词句，记录其课程和文本。
4. 在设置退出。本人重新登录后检查以上内容。设备 B 在自己的浏览器登录同一账号，检查相同两课的笔记、答案、环节及收藏；再回到 A 刷新确认一致。记录设备/浏览器、URL、时间和实际结果，不记录密码或令牌。
5. 只移除刚追加的验收标记与新建的测试收藏，保留原有记录；保存并在 B 复核。若他人在此期间编辑，不覆盖其内容。
6. A1 原版私人音频另测：展开课程中的私人练习音频，播放、暂停、跳转、0.75/1.25 倍速、循环及换课停止。该 24 首是旧版 TTS，不作为扩展四段听读配音。只有按原版全文完整试听，才填写该音轨的个人审核表。

## 可重放的只读 API 旁证

`scripts/cloud-roundtrip-probe.mjs` 不登录、不修改记录、不保留音频，也不输出笔记、账号 ID 或令牌；读取现有本人会话的 owner-scoped 两课记录，检查标记同时存在于笔记与作答。仅在本人本机环境中设置 `LLH_E2E_ACCESS_TOKEN`（当前访问令牌）和 `LLH_E2E_MARKER`，运行：

```powershell
node --experimental-strip-types scripts/cloud-roundtrip-probe.mjs
Remove-Item Env:LLH_E2E_ACCESS_TOKEN
```

无需把这些值发到聊天。探针必须在上述 UI 保存之后运行；它只证明当时的远端数据可读，输出明确保留 `twoDeviceBrowserAcceptance=manual_evidence_required`。无凭据时会退出，不会虚报通过。三项自动化测试已覆盖缺失答案、只读与隐私、鉴权失败停止读取。

Windows Chrome/Edge 自动控制仍未执行；没有绕过既有安全限制。Linux CI Chromium 与真实双设备、真人听音是不同验收项目。
