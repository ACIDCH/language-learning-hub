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
- 当前工具环境无法从本机直接请求 Cloudflare 域名或代替用户使用话筒。用户已实际确认 Supabase 登录、主课进度云端保存与恢复，以及 OpenRouter 浏览器直连、Key 检查和一次模型生成成功；跨设备及其他功能的真实验收状态仍需分别记录，不以 CI 冒充。
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
- 用户主动开启 AI 并点击生成后，默认浏览器直连 OpenRouter 官方 `/api/v1/chat/completions`；关闭直连选项时才使用同源 `/api/v1/ai/assist`。具体服务费/免费限额以 OpenRouter 当时的账户情况为准。

## OpenRouter 密钥验证交互改进（2026-10-19）
- AI 默认关闭时，仍可输入和验证 OpenRouter Key；不会执行模型推理。
- 验证需要的是创建时复制的完整 API Key，不是后台列表的 Key 名称或括号内的简短标识。
- Key limit 为密钥的消费上限，不代表赠送余额；$0 的限额不等于密钥本身失效，收费请求会受到限制。
- 只有主动启用全局 AI，并点击生成按钮后才会请求模型。

## OpenRouter 网络诊断（2026-10-19）

- 账户的 `Key limit $100` 为单个 Key 的最高消费上限，不是默认赠送的余额。
- 旧版「检测 OpenRouter 网络（不需要 Key）」曾检查 Cloudflare 后端，用户实际遇到 `transport`。当前版本改为浏览器直接 GET OpenRouter `/api/v1/models`，不调用推理、不消耗 Token。
- Key 验证响应区分 OpenRouter 401（Key 不可用）、403（被拒绝访问，未必是 Key 错误）、429（限流）和后端网络异常（timeout/dns/connection/transport），不泄露 Key 或原始上游异常。

## OpenRouter 浏览器直连预览（2026-10-19）

- 用户实测 Cloudflare → OpenRouter 的无 Key 和 Key 检测均为 `transport`，因此问题在服务端出站请求，不是凭此证明 Key 有误。
- 现有 AI 设置页从浏览器直接探测官方 `GET /models`、验证 `GET /key`，且原服务端 API 仍保留作为 Key 校验的备用路径。**2026-10-19 用户已在真实浏览器确认直连 HTTP 200、Key 验证成功，并报告一次 AI 生成成功**；此前 CI mock 不是这一结论的证据。
- **仅当用户主动启用 AI、填写提示词并点击生成**，才使用官方 `POST /chat/completions`；默认 OpenRouter 浏览器直连可手动取消，取消后恢复原服务端调用。不会因配置、检查 Key、切换页面而自动产生模型推理。
- AI Key 在浏览器内存用于模型调用，并可由用户选择加密保存到 Supabase Vault；用户本机 Network 记录可看到发往官方 OpenRouter 的授权请求，不宜在共享设备使用。
- 如出现浏览器 CORS/网络错误，应报告界面错误文案；不要重复新建密钥。

## OpenRouter P0 用户真实验收记录（2026-10-19）

证据类型：**用户提供的浏览器截图与本人操作反馈**，不是本工具环境独立完成的浏览器端到端测试。

1. 在 V4.4 AI 设置页，浏览器直接检测 OpenRouter 网络：**HTTP 200，成功**。
2. 通过浏览器直连 OpenRouter `GET /api/v1/key`：**Key 验证成功，显示免费方案**；界面显示 Key 剩余消费限额 **0.00 美元**。这是 Key 消费限额信息，不能当作账户余额；不能据此推断收费模型可用。
3. 用户明确反馈已主动尝试一次 `openrouter/free` AI 生成，**调用成功**。没有在聊天中披露 API Key 或粘贴模型原始回复。此项记录为「用户亲测成功」；不声称独立重放了该请求或验证所有模型。
4. **P0 浏览器直连路径验收通过**。此前 Cloudflare 服务端 `transport` 不代表原服务端出站故障已恢复；直连路径正常已足够解锁当前 AI 使用。
5. 后续按模块继续检查私有教材、基础课进度、单条私人音频实际可播性等未验收项。不得修改课程原稿或现有个人学习记录。PR #50 仍为 Open，禁止合并 main 或正式部署。

## P1 账户设置同步与 AI Key 加密保存（2026-10-19）

- PR 分支新增 `public.user_settings`：仅保存白名单内的外观、布局、阅读、语言及非敏感 AI 选项；独立于主课与基础课进度，不覆盖课文、笔记或音频索引。
- 新增 `public.user_ai_credentials`：仅保存用户/服务商和 Vault UUID，不保存 Key 明文；前端没有直接读取该表的权限。Key 由 Supabase Vault 加密，使用 `set_my_ai_key`、`get_my_ai_key`、`delete_my_ai_key` 三个经过 `auth.uid()` 校验的函数操作。
- 账户登录：先读取本人云端设置、恢复常规偏好，再按所选 AI 服务商获取 Key；避免将本地默认值覆盖既存云端设置。账户退出会清空前端 AI Key 内存，但不删除本人已保存的云端 Key。自动同步有延时合并，以减少频繁输入导致的写入。
- OpenRouter Key **通过验证成功后自动尝试加密保存**；其他服务商可点「保存当前服务商 API Key 到云端」，也可独立删除。历史上只存在当前页面内存的 Key **不能自动迁移**，需要本人首次再输入/保存一次。请勿把 Key 发到聊天或提交到 GitHub。
- UI 与数据表迁移、定向测试已提交原 PR #50。Supabase 新增迁移 `user_cloud_settings_vault` 已应用到当前项目；新表初始均为 0 行，还需用户真实账户登录做首次写入及退出/重新登录回读测试。
- 已通过 7/7 GitHub CI；Cloudflare Pages 和 Worker Preview 构建成功（提交 `704a6e6`）。**这些并不等于本人跨设备同步和 Vault 恢复已经真实验收。**
- 只读数据库复核：主课目录 108 条、私人正文 108 条、进度记录 5 条、基础课进度 0 条、私人音频 Storage 对象 24 条。Storage 对象存在不等于 24 条全部可播放。课程与既有学习记录均未覆盖。
- PR 不合并，不部署正式版；待用户真实登录后验证新同步逻辑与私人音频试听。

## P1 私人教材、基础课进度与私人音频定位（2026-10-20）

- 云端**只读**核查：私人课文记录 108 条；基础课程进度记录 0 条（尚无本账号写入验收证据）；24 个私人音频 Storage 对象属于一个用户目录，24/24 均能匹配索引 ID、扩展名 `.mp3`、MIME `audio/mpeg`，文件大小 62,136–106,492 字节。377 条总音频索引不等于 377 个私人文件。
- 因本工具没有本人的登录 JWT 或真实浏览器媒体解码环境，**不能宣称已亲自通过账号私有正文读取、完成基础课保存/恢复，或听到了音频**。这些需要本人操作界面。
- 定向修复：`AudioVault.tsx` 仅在浏览器 `canplay` 后报告可解码、`playing` 后报告实际开始播放；签名 URL 成功只标注为临时地址已获得，`error` 和 `stalled` 明确提示。不会因为 Storage 对象存在就宣称人工试听成功。
- 定向修复：`CloudWorkspace.tsx` 的主课进度远端读取失败时，保留已有本机草稿仅供查看，但**锁定写回**避免覆盖远端记录；提供重新读取按钮。原来单独的 `useCourseProgress.ts` 已具备同样保护，本次不重复改动。
- 前端新增音频事件的模拟回归测试；音频能否在真实设备播放，仍需用户亲测。私人教材和 48 节基础课原稿均没有修改；个人记录没有新增或覆盖。

## P1 CloudWorkspace 同源 API 误判修复（2026-10-20）

- 用户实际反馈：进入 `/cloud?panel=foundation` / `audio` 时显示「尚未启用云端连接」，尽管 `/?page=settings&section=account` 已成功登录与同步。
- 实际根因：`src/CloudWorkspace.tsx` 用 `/^https:\/\//` 判断 API 地址为启用条件；已部署的 Cloudflare Pages 同源 API 实际是 `/api`，因此即使 Supabase 客户端存在，也被前端错误禁用。本次修复直接使用已经建立的 Supabase 客户端和 `src/previewWorker.ts` 的受限接口类型判断，并新增分支预览 `/cloud` 的定向回归断言。
- 这是前端判定错误而非 Supabase 数据库 / Worker 缺失；不应要求重新配置 API 密钥、改 Cloudflare 或再次上传已经保存的私人教材、音频。
- 更新只通过原 PR #50 预览分支；仍需实际 Chrome/Edge 浏览器再次确认 `/cloud` 内课程、基础课、音频三个模块正常出现。没有更改现有用户学习进度、教学内容、音频对象、Supabase 表或生产部署门禁。

## P1 我的收藏跨设备同步（2026-10-20）

- 新增 Supabase `user_favorites` 账号独立 RLS 表。初次登录进入「我的收藏」时读取本人云端记录，旧 `llh-v44-favorites:<uid>` 本地条目只做**去重补齐**，不覆盖其他设备已经同步的收藏；未能上传时仍保留原本地条目。
- 课程中点击收藏时先保存本地副本，再尝试写入本人 Supabase；界面分别显示已同步与待同步。删除有独立的云端错误提示，云端未成功删除时不先清除本地。
- 此功能不修改私人正文或学习进度，也不会把未人工审校的课程当成正式出版教材。自动化测试只验证本地与云端结果合并规则；真实跨设备往返仍需用户账号验收。
