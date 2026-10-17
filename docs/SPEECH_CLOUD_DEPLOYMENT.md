# 云端音素练习服务部署与跨设备登录

状态：**具备 Docker 与身份验证代码，但并不意味着已租用计算实例或已上线域名。**
面向在不同电脑/手机登录同一个 Language Learning Hub 的学习者。使用既有 Supabase 登录账号；不需要在每台设备安装 1.26GB 模型。

## 基本架构

```
任意电脑/手机的浏览器（登录 Supabase Auth）
    ├── 免费浏览器 Web Speech + TTS（默认，无需云端模型）
    └── 云端音素练习（手动选择）
          │ HTTPS + Bearer(现有 Supabase Session)
          ▼
      独立 Docker CPU/GPU 推理服务
          │ ├ 验证 JWT 会话：GET Supabase /auth/v1/user
          │ ├ 内存中解码短音频（0.35–12 秒）
          │ ├ 加载一次 Wav2Vec2 + eSpeak 音素模型
          │ ├ 返回 IPA 差异和未校准练习参考值
          │ └ 不存储用户音频、转写或参考值
          ▼
    云端 React 页面展示练习反馈
```

既有 Cloudflare 网站、Supabase 数据库/登录、Google Drive YUNPAN 文件归档均不需要迁移。Drive 可备份模型，但**存储文件不等于提供运行模型所需的 RAM/CPU**。专业级发音成绩仍未校准，返回 `canScore:false`。

## 资源需求与平台选择

- 模型文件约 **1.26GB**，旧实测推理进程 RAM 峰值在 **1.7GB 左右**，建议至少 **4GB RAM**（预留容器与系统空间）、**2 vCPU**，可先用 CPU 运行，无需 GPU。
- **Cloudflare Workers** 仅约 128MB 内存；**Supabase Edge Functions** 为 256MB 内存、单请求约 2s CPU，**都不能直接运行该模型**；它们仅适合作为前端/API 网关。
- **Hugging Face Spaces** 支持 Docker 和 FastAPI，CPU Basic 给 2 vCPU/16GB，硬件本身标价 $0/h；但截至 2026-10 官方文档明确表示**新建使用 CPU 计算的 Spaces 需要付费账户计划**。免费静态 Space 不提供 Python 模型计算。请先核实账号资格、休眠规则、费用和当地访问速度。
- 其它能运行 Docker 的云主机/容器服务也可部署，只要持续支持约 4GB RAM、HTTPS 域名与模型镜像；服务器是可替换的，不要把系统绑定到单一供应商。
- 对价格、冷启动、GPU 成本与服务 SLA 不作承诺。高频、低延迟、无休眠服务可能需要付费云资源。

## 已准备的文件

- `speech_service/Dockerfile.cloud`：CPU Torch、FastAPI、固定版本 Wav2Vec2 权重、eSpeak phonemizer 均打包在**服务器容器**。构建 Docker 镜像时下载模型一次，每台客户端不用下载。固定权重 revision `2c733782da5604684829819a5eb744c193fe9398`。
- `speech_service/cloud_app.py`：公开 HTTPS 后的服务端 `/evaluate`、`/health` 接口，Supabase 用户验证、CORS、请求大小限制、单用户音素推理队列忙时返回 429。
- `speech_service/test_cloud_app.py`：不下载模型的身份验证、越权 Origin、音频内存释放和模拟推理测试。
- `src/speechEngines.ts` + `src/LocalPronunciation.tsx`：登录后可选的远程音素模式；仅 `VITE_SPEECH_API_URL` 是合法 HTTPS origin 且 Supabase 会话存在时显示为可选择。
- `src/CloudWorkspace.tsx`、`src/FoundationStudio.tsx`：主课程和 48 节基础/A2 衔接课继承同一学习登录令牌。无需第二套账号。

## 部署步骤（在已有 Docker CPU/GPU 云服务中执行）

### 1. 构建镜像

在仓库根目录：

```bash
docker build -f speech_service/Dockerfile.cloud -t llh-phoneme-cloud:latest .
```

联网构建时镜像下载模型及开源依赖，模型文件不会被提交进 GitHub 的项目仓库。生产环境应使用可持久拉取的镜像仓库或缓存，否则云容器重建可能再次下载镜像。

### 2. 配置服务器环境

以下为**变量名**，不是应公开的私人会话凭证：

```dotenv
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<public browser publishable key>
LLH_SPEECH_ORIGINS=https://<your-study-website>
LLH_SPEECH_THREADS=2
PORT=7860
```

- `LLH_SPEECH_ORIGINS` 必须填写实际用于登录的网页 **HTTPS Origin**（不带尾随路径/斜杠）；多个域名可英文逗号分隔。
- 发布容器时需要平台提供 HTTPS 对外域名，将外部 HTTPS 请求转发到容器内部 TCP 7860；反向代理或云平台负责 TLS。
- 不要把 Supabase `service_role`、用户 access token、个人 Drive OAuth Token 填入网页构建变量或公开代码。后端**只用公开 publishable key 验证用户身份**，用户本人使用既有登录令牌。
- HTTPS 客户端只能对允许的站点 Origin 发送跨域请求；匿名/过期账号无法使用模型推理。
- 请求 JSON 体上限 520KB，单次录音 0.35–12 秒、16 kHz、PCM16。无录音云盘、Postgres 持久化。
- 如果用共享 Docker 平台，可以把本项目的 Dockerfile 内容/相关服务文件同步到该平台的部署仓库；不要求安装在你的个人电脑上。

### 3. 配置学习网站

在 Cloudflare Pages 构建环境设置公开的：

```dotenv
VITE_SPEECH_API_URL=https://<your-speech-service-domain>
```

重新触发站点构建。浏览器只会拿到云端服务的公开 URL，不会获得服务器内部权重或其它管理员密钥。**只有设置 URL 并且服务已真实上线后**，登录后才能在 “识别方式与高级实验功能” 里选择“云端音素练习（登录后使用）”。

无需将 `speech_service` 安装到用户新电脑：新设备仍登录现有 Supabase 账号，原有课表和学习进度从 Supabase 读取，点击云端音素模式即可使用。

### 4. 验收清单

1. 云服务 `GET /health` 返回 `ready:true`（仍不能证明端到端性能）；HTTPS 正常。
2. 未登录和过期 Session 的 `POST /evaluate` 返回 401，错误网站 Origin 返回 403。
3. 登录同一账号的**第二台设备**打开 Cloudflare 网站，可切换云端模式并录音；第一台电脑无需开机。
4. 返回模型 IPA 差异、`practice_reference` 参考值或“不可判定”，永不显示专业声学认证分数。
5. 取消/超时、断网或服务休眠，页面可返回免费文字跟读，课表进度/音频不受影响。
6. 浏览器 Network 检查：短录音仅发送云计算域名；无公开身份凭据或原始录音被写入日志/数据库。
7. 使用 Chrome、Edge 实际设备人工录音测试。已有自动化测试**不能替代真实麦克风验收**。

## 进一步优化

- 若云 CPU 的实际识别延迟无法满足跟读节奏，再评估付费 GPU 或更小量化模型，必须用真实音频比较延迟、误识别与模型体积。
- 可增加服务健康状态、冷启动提示、超时自动切回文字模式、配额和本人使用量统计；但不必让浏览器反复下载权重。
- 专业音素评分不是交付前提；按普通初学者复练体验作为主要验收指标。

官方参考：Hugging Face Spaces [Docker 文档](https://huggingface.co/docs/hub/spaces-sdks-docker)、
[硬件限制](https://huggingface.co/docs/hub/spaces-overview)、
[Supabase Edge Functions limits](https://supabase.com/docs/guides/functions/limits)、
[Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)。
