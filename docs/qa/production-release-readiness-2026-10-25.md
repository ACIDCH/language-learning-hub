# Language Learning Hub｜正式上线验收基线（PR #50）

更新：2026-10-25 NZDT。目标是**正式上线**，不是简单合并绿色 CI。此文件基于分支 `feat/v44-full-ui-curriculum-one-shot` 的当前证据；不声明人工或实机验收已完成。

## 已具备的可重复检查

- 原始课程 ID 结构：108 主课程 + 48 基础衔接，156 课；327 个挂接语法/词汇专题。结构测试和源文 SHA-256 已在 `docs/qa/curriculum-gap-matrix.json` 留证。
- 前几轮作者级扩展：39 课共 156 道题补齐双语证据；检查完整中文、原语言答案与证据段落关联。**不等于**全 156 课人工语义审校。
- 双语证据题 UI：原语言题目及参考答案与中文解释分行显示；原有 IELTS `TRUE / FALSE / NOT GIVEN` 选项不应被误拆。回归见 `tests/curriculumInteractions.test.tsx`。
- 参考录音播放器：课程切换清除 A/B 片段、错误、循环和速度状态；`tests/audioCoverage.test.tsx` 有回归。参考录音只表示教材词汇材料，**不是**本课完整课文授权配音。
- 学习进度、云端认证及持久化已有模拟和浏览器测试，但仍须补本人独立双设备与真实媒体播放验收。

## 发布门槛（必须全满足）

| 门槛 | 预期 | 目前已证实 |
|---|---|---|
| 结构可复现 | 156 课／327 专题，源哈希一致 | 已有结构及单测；后续更改仍需回归 |
| 逐课内容／中译人工核验 | 156/156，按段落目标和中文哈希签署 | **0/156** |
| 语法与词汇逐专题人工核验 | 327/327，能追溯每条审核证据 | **0/327** |
| 全文与原音轨逐段对应、许可、试听 | 156/156，P1–P4（部分课为其他段落 ID）逐段有效 | **0/156** |
| 真实两设备刷新与重新登录恢复 | 至少两台设备、成绩／习题／设置不串课 | 本轮未独立复验 |
| 真实桌面及手机课程／媒体验收 | 全链关键页与音频正常，人工录入结果 | 本轮未独立复验 |

上述“0”是**缺少有效人工验收证据**，并不是断言课程文本全错或现有浏览器 TTS 不可使用。部分课虽已完成作者级编辑，也不能自动当作通过独立审校。

### 可执行命令

```bash
npm ci
npm run build
npm run release:report  # 输出可复核的未完成项；未完成时仍返回 0
npm run release:check   # 任一发布条件不符合便返回非 0；正式发布须此命令成功
npm run release:queue   # 按课时、教学专题、音轨输出未完成审校队列；可加 -- --json
```

基于现有零份人工签核证据，`release:queue` 当前列出 **639 个按课可追溯审核项**：156 个课程内容、327 个语法词汇专题、156 个逐段音轨；另有双设备恢复和桌面／手机实测两项验收。队列不是已审校证明，源文更改后仍须以 `release:check` 重新校验哈希与签核。正式 Worker 部署使用 `node ../../scripts/deploy-worker.mjs`（在 `cloudflare/learning-api` 目录执行），不得直接运行绕过门禁的 Wrangler 命令。

另有手动触发的 GitHub Actions 工作流 `Production readiness — evidence gate`，不会在门禁失败时执行部署。主发布流程必须在正式合并和生产发布之前调用相同的 `release:check`。

### 人工验收证据如何落库

位置：`config/release/evidence.json`。保持 `courseReviews`、`specialtyReviews`、`audioReviews`、`deviceRestore`、`browserAcceptance` 的原结构。

每课审核需提供 `courseId`、人类审核者 `reviewer`、`reviewerRole: human`、`status: approved`、时间 `reviewedAt`、实际复核证据定位 `evidenceRef`，及全部段落 `id / targetSha256 / chineseSha256`；源文或中译变化会自动使旧审批无效。

每专题同样使用相应专题 ID 和具备证据的独立人工审核记录。每课正式音轨需列全部段落 ID、目标语音文本哈希、录音资产 `assetRef`、来源授权 `rightsRef`、有效时长 `durationSeconds` 及真实试听 `humanListened: true`；不得拿 MyMemory、Chrome TTS、旧版本练习 MP3 或参考词汇录音冒充现行四段朗读。

双设备与浏览器验收另存真实结果；不要凭自动化通过便人工填入成功或创建虚假证据引用。上述记录没有建立前，`release:check` 明确返回失败。

## 剩余实际工作队列

1. 按优先级检修尚未逐题中法/中英对照的其余课程；对 156 课关键逻辑、时态、数字、任务要求及完整示范进行逐篇审核。
2. 将 327 个语法／词汇专题按 CEFR 先修关系校对实际内容，补足语法条件、常见错误、精准中文解释与复习题；源文件不能被标题级“完成”代替。
3. 在许可范围内落实原文匹配的真人或授权自然音轨，逐段试听并记载文本哈希；不能引用不匹配的参考音频直接通关。
4. 在桌面、手机及两设备账户之间进行真实交互与保存恢复验收，记录可复现的缺陷，修复后复测。
5. **仅在发布闸门成功后**把 PR #50 改为 Ready for review、合并 main 并接入正式 Cloudflare 发布流程。此前均保留 Draft/Open，不触碰现行生产状态。
