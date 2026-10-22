# Language Learning Hub V4.4 · P2 自执行开发 Prompt (2026-10-20)

工作仓库 ACIDCH/language-learning-hub；仅在 PR #50 当前分支继续，不合并 main、不部署生产、不覆盖 156 节课程或本人进度。复用现有测试和云服务。

目标：把三个长久「待接线」转成可验证的具体工作流，而非改变状态文案：
1. **Google Drive 在线资源**：账户在网站内主动 Google OAuth 授权，只读浏览已授权 Drive（文件夹可切换）、按课程关联 TXT/MD/Google Docs 文本和 MP3、在线获取与播放。已授权账户列表及课程关联跨设备存入本人 Supabase RLS，所有 Google Access Token 仅驻留内存。允许随时换 Google 账号、替换文件夹或单课资源；不删除原始 Google Drive 文件，不自动覆盖已入库个人原稿。缺少 Google OAuth Client ID 时明确展示接线步骤，不声称完成授权。
2. **发音**：保留免费浏览器识别/IPA/TTS，同时接入已有 FastAPI/Wav2Vec2 音素推理 HTTP 服务的可配置 HTTPS 地址、真实健康检测和有证据的声学对照；由于已有模型未人工校准，禁止称专业客观分数；无运行中的 4GB+ 推理容器不得显示成功。登录 JWT 身份验证，限制 12 秒录音，不留原始音频。
3. **音频**：统一展示 Supabase 私人文件、Drive 授权音频和公开合法参考录音。按索引核对存在性、签名/授权、浏览器 canplay/playing/ended/error，不把 377 条索引等同于 377 个可播放文件；给出逐课缺失原因、按需/批量选择资源，支持更换 Drive 后重新绑定；不得擅自复制第三方录音或将未审校音频标成正式音频。
4. **验收**：分离配置完成、接口可读、用户浏览器实际听到声音、声学模型真实推理、人工内容审校。增加定向单测、构建和 GitHub CI；检查数据库 RLS 和账户写入；交付预览链接、具体未完成的外部授权/容器条件。
5. Token 预算：只检查相关代码，尽可能定向改动，直到本轮能执行的工作完成后统一报告。不重复课程全量审计、保留 P0 OpenRouter 和 V4.4 正式前端。

## 本轮实施与核对（GitHub PR #50，不允许把 CI 当本人 UAT）

### 一、Google Drive 多账号与完整教材

- 浏览器 Google Identity Services OAuth 授权（`drive.readonly` + `userinfo.email`），`src/googleDriveClient.ts` 的访问令牌只保存在当前页面模块内存。登出 Hub 或换 Hub 账号时清理全部该账号 Google token。已注册 Google 来源、所选来源、教材根目录、课程文件绑定保存在 Supabase `user_drive_settings`、`user_drive_profiles`、`user_drive_bindings`；多个音频独立记录在 `user_drive_media`，均通过本人 RLS。
- 在 `/cloud?panel=resources` 里：录入一次 Google **OAuth Web Client ID**，打开 Google 授权选择账号；可以通过下拉切换不同 Google 账号、替换根目录 ID、进入子文件夹、按文件名跨子目录搜索，并将文本／音频文件绑定到具体课程。已绑定资源与文件名跨设备同步，OAuth 访问令牌**不**跨设备同步（需要 Google 重新授权）。
- 按需 GET Google Drive v3 /files（含下载限制和大小限制）。TXT、Markdown、Google Docs 导出为文本；原版 PDF 读取整个文件并交给浏览器原生 PDF 阅读器（最高 75MB），不限制八页；MP3/WAV 等合法音频通过内存 Blob URL 给播放器，显示 `canplay`、`playing`、`ended`、`error`。
- 本课可关联**多个** Drive 音轨，并从搜索/目录结果按准确 `course-id-` 前缀批量关联，不会伪造没有明确课程 ID 的外部音轨所属课程。替换来源仅改关联元数据，不会删除 Google 原始文件、已入库 Supabase 私人正文或个人学习进度。

### 二、Google OAuth 首次接线步骤（需账号所有者授权）

1. 进入 [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)，创建或选择自己的 Google Cloud 项目，启用 [Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com)。
2. 在 OAuth consent / Branding 中设置应用与测试用户；建立 **Web application OAuth Client ID**，在 Authorized JavaScript origins 加入：
   `https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev`。
3. 复制**公开客户端 ID**（形如 `123456-xyz.apps.googleusercontent.com`），登录 Language Hub，去 `/cloud?panel=resources` 填入并点击「保存 OAuth 应用配置到本人账户」；然后点击「连接／更换 Google 账户」。随后由 Google 官方授权弹窗确定授予哪个 Drive 账号。
4. 选择 `root` 或复制自己 Drive 文件夹链接中的 ID 到「教材根文件夹 ID」，保存后可以遍历内容；选中 TXT/MD/Google Docs/PDF/MP3 并按需打开或绑定。更换 Google Drive 时使用「连接／更换 Google 账户」或在已授权来源列表切换，不必迁移整个 Hub 数据库。
5. 当前 Google Drive `drive.readonly` 是 **restricted scope**。这是完整浏览用户既有私有文件所需的权限；个人测试需要 Google OAuth 测试用户等配置，公开向不特定用户提供该 OAuth 功能可能需要 Google 验证。不应把 ChatGPT 内连接的 Google Drive 插件授权错误地当成本网站 OAuth Client ID。

### 三、音频覆盖矩阵与许可边界

- `src/AudioCoverage.tsx` 对每条 Supabase 音频索引和本用户 Storage 已上传对象分别计数。已经上传的合规原有 MP3 以播放器 `canplay` / `playing` 回馈，索引本身绝不算播放成功；Drive 多音轨列表独立按需读、临时播放，Cloudflare 不托管 Google 原始音轨。
- 当前数据库包括 377 条索引（24 条私人 A1 合成音频，其余是开放或第三方参考索引），此前 Storage 已检查到 24 个有数据的私人 MP3；并未凭索引宣布 377 个文件已上传或具备分发许可。外部教材 / Inspire A1 录音仅为私人授权查看或来源索引，不批量公开托管。

### 四、专业声学推理状态

- `speech_service/cloud_app.py` 和 `speech_service/core.py` 已有 Wav2Vec2 模型（约 1.26GB 权重）+ eSpeak G2P 的声学分析器，真实服务需单独具备至少约 4GB RAM、HTTPS 的 CPU/GPU 容器；当前 Cloudflare Workers / Supabase Edge **不能运行**该模型。
- 现在可以在「总设置 → 学习偏好」输入本人希望使用的声学服务 HTTPS Origin，设置将随账号同步，不需要改 Cloudflare 构建环境；「真实检测 /health」会读取服务端 `ready` 标志，声学客户端仅在有有效 Supabase 登录令牌时开放，录像最长 12 秒，明确显示不可判定情况。
- **该模型只输出机器候选音素和未校准参考匹配指数 `canScore:false`，不是专业发音准确率。** 若要求科学可复核的专业音素评分，还需已部署的计算容器、标注样本、声学强制对齐/模型校准及真人跨口音误差验收。不允许把伪造的数值作为成果。
- 独立服务器 Docker 构建、授权与环境变量见 `docs/SPEECH_CLOUD_DEPLOYMENT.md`。建议先检查预览站和正式禁部署限制，再选择可持续运行的云算力；未经用户确认**不要创建有计费风险的计算资源**。

### 五、交付证据等级

- 真实修改：Google OAuth 只读适配器、账号/文件夹/单课映射 UI、PDF 在线预览、文档读取、多人音轨列表、音频覆盖矩阵、声学服务地址动态配置与健康探测、Supabase 增量表迁移。
- 自动回归：既有 156 课内容与 7 项 GitHub CI、Google REST adapter mock 测试、音频事件与权限单测、Cloudflare Pages + Worker 分支预览构建。
- **未获证据**：本次新 Google OAuth Client ID 未配置，也未完成本人的 Google 授权与在线真实文档/MP3 浏览；当前没有已知运行的 4GB+ 声学推理容器或人工校准数据，专业声学评分**不能称已上线**；所有 353 外部来源索引文件没有完成逐条合法授权、真实取件或试听。相关 UI 应继续显示实际状态，不能全改“成功”。

### 六、保留边界
- 156 节课程（108 主课 + 48 基础）不改稿、不重生成；
- P0 OpenRouter 免费模型调用、Supabase Auth、学习进度及 Vault 密钥功能保持；
- PR #50 保持 Open；不合并 main，不生产部署，不覆盖用户数据。
