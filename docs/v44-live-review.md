# V4.4 实际使用与最终体验评审

**在线预览（Cloudflare Pages 分支）**：https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev

**预览 API（本站同源）**：https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/api/v1/status

PR：https://github.com/ACIDCH/language-learning-hub/pull/50

## 操作顺序

1. 课程目录：检索、切换英语/法语、等级筛选，检查156节课程。
2. 法语已存在原稿：`/?course=fr-a1-u01&tab=read`；新待审初稿：`/?course=fr-a1-u04&tab=read`。
3. 划词后：朗读、收藏、笔记、IPA、跟读；实际话筒需用户授权。普通浏览器文字识别不是声学音素评分。
4. IPA 兼容旧入口：`/speech-lab#ipa-studio`，新入口：`/?page=ipa`。
5. 外观：切换日常/护眼/黑夜及标准/专注/沉浸，试刷新、逐级返回。
6. 总设置 → 账户：先看“实时服务连接检查”，用本人 Supabase 账户登录。分别给主课、基础课写笔记并**点击保存**，刷新、退出再登录核对。当前并非自动云同步。
7. AI：默认关闭；只有主动启用、填写本人模型密钥、登录后才会发起请求，密钥不应通过聊天或截图提供。
8. `/cloud?panel=resources`、`/cloud?panel=audio`：检查资料导入和音频索引。音频索引存在不意味着全量可听、已审校。
9. 手机端测试菜单、登录按钮、返回、选词窗口等。

## 已核查边界

- Supabase 项目健康，主课目录108条、私有正文108条、音频索引377条，学习进度及 RLS 配置存在。
- Cloudflare Pages 和 Worker 预览由 GitHub 机器人确认部署成功。
- 本次修复固定预览站来源白名单、预览前端→Worker 路由，并提供无凭证只读连通性检查。
- 当前工具环境无法从本机直接请求 Cloudflare 域名或代替用户登录/使用话筒，因此真实登录、跨设备保存、本人 AI 密钥调用及真人语音等仍需你亲测，不虚报通过。
- 101节新增原创课仍是**已授权公开预览的待审初稿**；没有正式教材发布批准。
- `production_deployment=pending_final_acceptance`，**未合并 main，未部署正式站点**。

反馈请按“链接、操作、期待结果、实际结果”记录，可附不含凭证的截图。

## Worker 访问错误修复（2026-10-19）

此前使用独立 `workers.dev` 域名导致用户登录后出现 `Failed to fetch`。GitHub Actions 从自动化环境访问时 Cloudflare 返回 403/1010（这不等于已证实普通浏览器的同一原因）。本轮将**预览网站**的 API 请求改为本站 `/api/v1/*`，由 Cloudflare Pages Functions 复用既有 Worker 的请求处理、Supabase JWT 校验和 RLS；不再从浏览器跨域访问 workers.dev。

如仍出现错误，请直接访问 [本站 API 状态](https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/api/v1/status)，将显示的状态码和无敏感信息的错误文字提供给开发者。使用分支别名访问，不使用一次性哈希域名。

## 云端接口实况与 OpenRouter（2026-10-19）

- 公开课程目录、Supabase 认证、主课程进度、基础课程进度、私有课文读取：已有相应后端和表；后四者需登录才能用。
- 私人音频索引接口存在，但文件是否已上传、是否有可听的签名链接须逐项核实。不可把 377 个索引等同于 377 个可播放文件。
- Google Drive 在线按课拉取、云端音素模型评分尚未部署；私人 ZIP 恢复和浏览器 Web Speech 是目前可用的替代路径。
- 「总设置 → 账户与同步」的逐项状态检查是只读的，不修改个人记录。
- 「总设置 → AI 助学」默认 OpenRouter／`openrouter/free`，AI 仍默认关闭。用户自行在 [OpenRouter 创建密钥](https://openrouter.ai/settings/keys)，仅在浏览器的密码框填写，不发给助手。
- 「验证 OpenRouter API Key」仅调用 OpenRouter `GET /api/v1/key` 获取密钥有效性及非敏感元数据，不请求任何聊天生成，不消耗模型推理 Token。验证成功不代表实际模型请求必然成功或没有其他额度限制。
- 用户主动开启 AI 并点击生成后，才向 `/api/v1/ai/assist` 请求答案；具体服务费/免费限额以 OpenRouter 当时的账户实际情况为准。
