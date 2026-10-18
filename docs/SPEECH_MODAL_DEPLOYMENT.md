# 云端音素练习：极简部署方案（Modal 适配器）

**目标：不同电脑登录同一学习账号，继续使用 IPA 音素观察与练习参考值。**

**明确不新增任何常规语音识别服务。** 已实现的浏览器 Web Speech API 负责听写/文字跟读，浏览器 SpeechSynthesis 负责朗读示范。这两项在当前系统中已经可以使用，无须 Cloudflare Workers AI、Whisper 或另一套转写服务。

## 唯一需要云端化的部分

普通跟读（保持现状）：
浏览器麦克风 → Web Speech 文本转写 → 现有文字对照及复练建议。
示范朗读 → 浏览器 SpeechSynthesis。

可选音素练习（有账号时启用）：
浏览器麦克风 → 现有 `src/speechCapture.ts` 短录音转 16kHz PCM → 已存在的 `src/speechEngines.ts` 云端接口 → HTTPS 的 Modal FastAPI 服务 → Wav2Vec2 + eSpeak IPA → 音素差异及未经校准的练习参考值 → 同一页面。

只有用户显式切换“云端音素练习”后才发送短录音至模型服务。
账号验证复用已有 Supabase Session，不新建登录系统。服务器不主动写入学习进度、Supabase 或 Google Drive。参考值不是专业发音评分。

## 已在 main 的代码（无需重复开发）

- `speech_service/cloud_app.py`：基于 Supabase 会话验证的 FastAPI 推理 API。
- `src/speechEngines.ts`：启用 `VITE_SPEECH_API_URL` 后的 HTTPS 云端音素接口；免费浏览器识别仍为默认。
- `src/LocalPronunciation.tsx`：复用录音、实验性音素反馈与练习参考值。
- `src/SpeechPractice.tsx`、`src/FoundationStudio.tsx`、`src/CloudWorkspace.tsx`：现有课程接入，登录后显示可用云端模式。
- `speech_service/Dockerfile.cloud`：通用 Docker 云服务部署方式。

## Modal 仅提供一个可替换的部署入口

`speech_service/modal_app.py`：载入固定版本 Wav2Vec2、eSpeak/Piper G2P，创建名为 `language-hub-phoneme-weights` 的持久 Volume；计算服务运行现有 FastAPI，而不是另写评分实现。

使用条件：Modal 账号、已确认的剩余免费额度、实际 HTTPS endpoint；服务器冷启动、性能和最终费用需实际测试。**仓库代码提交 ≠ Modal 服务已部署。**

### 部署准备

1. 安装 Modal CLI，登录使用者自己的 Modal 账号。
2. 设置 Modal Secret `language-hub-speech`，其中保存：
   - `SUPABASE_URL`: 当前学习系统的 Supabase 项目网址。
   - `SUPABASE_PUBLISHABLE_KEY`: 当前项目公开可用的 publishable key。
   - `LLH_SPEECH_ORIGINS`: 当前 Cloudflare 学习网站的 HTTPS 源地址（origin，无尾随斜杠）。
3. 在项目根目录执行：`modal deploy -m speech_service.modal_app`。
4. 验证服务 HTTPS `/health` 返回 `ready:true`，使用本人登录的短录音测试 `/evaluate`。确认容器加载模型，期间不保存音频。
5. Cloudflare Pages 构建变量添加 `VITE_SPEECH_API_URL=https://<actual-modal-https-domain>`，重新构建网站。该变量只包含 API 的公开地址，不是密钥。
6. 用第二台电脑登录课程账号，展开语音高级模式，选择“云端音素练习”；检查录音和反馈是否可用；失败时切回已有浏览器识别。

参考既有详细说明：[SPEECH_CLOUD_DEPLOYMENT.md](./SPEECH_CLOUD_DEPLOYMENT.md)。

## 验收边界

CI 只能证明接口结构、编译与模拟服务测试；不能证明第三方云主机已开通或真人录音可靠。需要手动验证 Chrome/Edge 麦克风、账号切换、模型启动成功、延迟与费用。仍保留 `canScore:false`、`calibrated:false`，只显示练习辅助指数。

**明确不纳入本次工作：** Cloudflare Whisper、另建 STT 服务、替换现有浏览器识别、自动收费 AI API、专业发音考试评分、任何课程重构。
