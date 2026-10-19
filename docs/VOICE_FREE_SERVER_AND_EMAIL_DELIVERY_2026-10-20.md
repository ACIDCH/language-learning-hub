# LLH V4.4 — 账户邮件恢复与云端声学推理资源（2026-10-20）

## 0. 边界

只更新 PR #50；不合并 main、不正式部署、不花钱开通云服务、不关闭邮箱确认。
用户名、学习进度、156节课程、Vault AI Key、私人资源保持不变。
本方案包含真正的账户回调/表单逻辑与免费的可部署容器脚手架，但外部 SMTP 和云主机授权仍必须由账户所有者执行。

## 1. 当前新邮箱注册不收信：证据与执行

Supabase 项目 `szukmwvyyvjajdjoltzy` 为 ACTIVE_HEALTHY。只读 Auth 最近日志包含 1 次 /signup 200，但 **Auth 接受请求 ≠ 邮件已投递**，并没有访问对方收件箱。本项目的当前 SMTP 配置不能从现有连接器读取，因此绝不称已确认自定义 SMTP 已启用。

官方 Supabase 内置 SMTP（2026-10）仅投递到项目团队预授权邮件、全项目 2 emails/hour；新用户任意邮箱要配置外部 SMTP。见：
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/auth/rate-limits

### 免费可选邮件供应商
- Brevo Free：约 300 封/日，SMTP 交易邮件额度，供应商账户需完成发件人验证及符合邮箱服务商要求的域名身份验证。https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans
- Resend Free：3,000/月，每日 100 封，支持 SMTP，需验证发信域名。https://resend.com/pricing
- 若**没有自己可控域名**，公共邮箱发信的 DKIM/DMARC 与可靠投递无法保证，建议先取得一个能控制 DNS 的域名，或暂只用 Supabase 团队授权邮箱测试。不要把任意 Gmail 地址设置成未验证的发件人。
- 邮件免费额度 ≠ 域名一定免费，实际开通资源、提供 SMTP 凭据由本人完成。

### 必须在 Supabase Dashboard 实际执行
1. Authentication → SMTP Settings：开启 Custom SMTP，填写所选服务商的 Host、TLS/Port、SMTP Username / Password、已经验证的 From 地址和 Sender name。**这些敏感项不要提交 GitHub、网页本地设置、聊天消息。**
2. Authentication → URL Configuration：在 **Redirect URLs** 中允许 `https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/**`，不改变 `main` 正式站点。Site URL 另按最终正式部署时设置。
3. Authentication → Email Templates：Signup 模板保留有效的 `{{ .ConfirmationURL }}` 或六位数字 `{{ .Token }}`；Recovery 模板包含对应的恢复链接或者 `{{ .Token }}`。如果采用自定义回调链接，请遵循官方 `{{ .TokenHash }}` 与 `{{ .RedirectTo }}` 变量格式，和站点查询参数匹配；不要在页面上显示真实 token。
4. Authentication → Rate Limits：自定义 SMTP 后再按个人实际用量设置发信限额；默认 2/h 不足以支持任意新用户。
5. 真实验收：新邮箱注册 → 收件箱收到链接或验证码 → 邮箱验证 → 密码登录 → 发起找回密码 → 收到新的恢复链接或验证码 → 验证后更新密码 → 新密码重新登录。记录发件服务商 Delivered/Bounced/Rejected，不能凭前端 HTTP 200 报告成功。

当前新前端 `src/AccountAccess.tsx`、`src/authMailFlow.ts` 与 `src/AppShell.tsx` 已支持：六位注册 OTP、六位恢复 OTP、邮件链接/TokenHash 回调、过期/频率/未授权发件地址提示、重发冷却及真正的密码更新状态。

## 2. 声学计算服务器：真实配比

现有 `speech_service` 采用约 1.26GB Wav2Vec2 权重，CPU 进程旧实测内存峰值约 1.7GB。它还需要 Python、Torch、浏览器请求接收与 Caddy HTTPS 代理；**最低建议 2 vCPU、4GB RAM，实际为稳定留余量推荐 2 vCPU、8-12GB RAM、50-60GB 磁盘**。单次 0.35–12 秒音频顺序分析，不运行多用户并发推理。

### 免费候选：Oracle Cloud Always Free ARM64

Oracle 2026-06 文档：Ampere A1 Always Free 合计 1,500 OCPU-hours / 9,000 GB-hours 每月，等价于 **2 OCPU、12GB RAM**（不是 4 OCPU/24GB）；Always Free 账户可使用 200GB 合计引导+块存储，典型单 VM 50GB 引导磁盘。仅限账户 **Home Region**，可能没有空余 A1 配额。需要注册 Oracle Cloud Free 帐户和通过实名认证/银行卡验证，但不能保证申请成功或一定长期稳定。

文档：
- https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm

**建议实例**：`VM.Standard.A1.Flex`，2 OCPU / 12GB RAM、Ubuntu 24.04 aarch64、60GB boot volume（包含在总免费存储预算内，确保未超额）；公网 HTTPS 域名解析及 80/443 入站。需要可靠的免费或自有 DNS 域名；若域名额外收费须单独确认。确保 OCI 账单页面始终标注 Always Free 且总用量不超上限。**不要自动升级 PAYG**。

兼容性：当前 PyTorch 2.8 CPU wheel 提供 CPython 3.11 Linux aarch64；`piper-tts==1.8.0` 也有 manylinux aarch64 wheel。模型镜像和所有第三方依赖必须在实际 ARM VM 构建、用真实 /evaluate 请求核实，不能凭 wheels 页面把 ARM 推理测试算通过。
- https://download.pytorch.org/whl/cpu/torch/
- https://pypi.org/project/piper-tts/1.8.0/

### 付费候选：Render

Render Free Web Service 是约 0.1 CPU / 512MB，明显放不下 1.26GB 模型。Render **2c-4g**（旧 Pro 档）为 **2 CPU、4GB、USD 85/月**，非免费。大规模语音并发/频繁调用须评估更高等级费用。2026 官方价格：https://render.com/pricing

## 3. 已备 Docker Compose：但未开云资源

在已**由本人创建**的 OCI ARM64 Ubuntu 实例里：
1. 完成 Docker + Compose 安装；在仓库本 PR #50 的工作分支下，复制 `speech_service/.env.example` → `speech_service/.env`，填入公开 Supabase publishable key、自己真实 DNS 记录指向 VM 的 `SPEECH_HOST`、准确的 Pages HTTPS Origin。不要粘贴 access tokens 或管理员 keys。
2. 保证 DNS 已解析、OCI VCN/instance firewall 仅开放 HTTP 80 / HTTPS 443、SSH 22 管理端口；7800/7860 不直接公开。Caddy 通过 ACME 自动申请 HTTPS。
3. 在 `speech_service` 目录运行：
   ```bash
   docker compose --env-file .env -f docker-compose.free.yml up -d --build
   ```
   初次镜像将联网下载 CPU Torch、模型权重与 Piper 依赖，耗时和带宽不保证。模型在容器启动时加载。
4. 在浏览器请求 `https://<SPEECH_HOST>/health`，应得 `ready:true`；`ready:false` 或 5xx 代表未交付。到 Language Hub「设置 → 学习偏好」填写该 HTTPS Origin，点击真实探测。
5. 使用已登录 Supabase 用户的录音触发 `POST /evaluate`，验证返回音素观察、身份错误/取消/超时与兼容性。当前 `canScore:false` 是正确且必须保留的状态，模型没有校准就不能出具专业发音准确率。

## 4. 验收等级

- **代码层成功**：GitHub CI + Cloudflare PR Preview 构建、离线 API mock 和 Compose 静态检查。
- **外部 SMTP 成功**：服务商已配置并且新邮箱真实收到消息及完成找回；尚待用户配置。
- **真实模型成功**：有实际 VM、Docker 构建及 `/health ready:true`、`/evaluate` 人工录音；目前未启动云服务。
- **专业评分验收**：另需人工标注语音/口音、校准后的误差与稳定性审查；现有 Wav2Vec2 仅支持实验性音素对照。
