# Language Learning Hub · Oracle Cloud A1 Always Free 实际部署手册（2026-10-20）

> 仓库 `ACIDCH/language-learning-hub` · 仅从 PR #50 的 `feat/v44-full-ui-curriculum-one-shot` 代码部署**独立语音推理服务**；不合并 main、不改变现有正式站、不新建额外收费资源。首次模型运行仍需在你自己的 ARM VM 验证。

## A. 先确认免费条件

- 参考 Oracle 官方最新详细 Free Tier 清单（2026-06-12）：`VM.Standard.A1.Flex`、每月 1,500 OCPU 小时和 9,000 GB 小时；对 Always Free 账户约等于持续 2 OCPU / 12 GB RAM。官方部分其他介绍页仍写 3,000/18,000；实际下单必须以本**账户的 Free Tier 配额和创建确认页**为准。
- 创建前的规格：单实例 2 OCPU、12 GB RAM、Ubuntu 24.04 ARM64、60 GB 引导盘（A1 最低引导盘约 47 GB；总免费块存储约 200 GB，需扣除已有占用）、公共 IPv4、只开 22/80/443 端口。
- Always Free 仅可在注册时选定且之后不可更改的 **Home Region** 使用，选区前核对地区是否有 A1 资源。Oracle 免费实例可能因空闲策略回收；若报 Out of host capacity，请等候或换可用域，不要为了创建而升级 Pay As You Go。
- 创建账户可能需要电话/信用卡验证；不要提供银行卡或登录密码给开发者/聊天。Oracle Free Trial 试用积分不等于 Always Free 永久资源。若要绝不承担费用，保持 Free 帐户、资源仅选 Always Free、禁用多余服务；设置预算提醒并定期检查实际成本（预算提醒不是硬停机）。
- 官方来源：
  - https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
  - https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm
  - https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm
  - https://docs.oracle.com/en-us/iaas/Content/Billing/Concepts/budgetsoverview.htm

## B. 用浏览器创建 Oracle A1 免费实例

1. 打开 https://www.oracle.com/cloud/free/ → Start for free，创建 Oracle Cloud 账号；正确选择 Home Region（创建后不能改）。只有 Free 账号且符合 Always Free 条件时执行下文。
2. 登录 https://cloud.oracle.com → 左上角菜单 → **Compute → Instances → Create instance**。
3. Instance Name：`llh-speech-a1`；Image → Canonical Ubuntu 24.04 aarch64（必须兼容 A1 并标注 Always Free eligible）；Shape → Change shape → Ampere → `VM.Standard.A1.Flex`，2 OCPUs / 12GB RAM。
4. Networking：使用现有或新建 VCN + Public Subnet，Assign public IPv4 = Yes（公网地址用于 SSH、DNS 和浏览器）。
5. SSH：Generate SSH key pair → Download private key → 保存到 Windows 的私有目录，不要交给聊天；或者上传你自己生成的公钥。Boot volume = 60GB，不勾选可能收费的高性能盘、备份或其他附加服务。
6. 核查每项 Always Free 标记、确认没有超过余量，再 Create。等状态 Running，记下 Public IPv4（不是 private IP）。

## C. Windows PowerShell 通过 SSH 登录

Oracle 生成的私钥文件假设保存为 `C:\Users\你的Windows用户名\Downloads\ssh-key-....key`。在 Windows **PowerShell** 中运行（先用实际路径与实际公网 IP 替换占位符）：

```powershell
ssh -i "C:\Users\你的Windows用户名\Downloads\你的私钥.key" ubuntu@你的公网IP
```

Ubuntu 官方 Oracle 镜像通常 SSH 用户名是 `ubuntu`；Oracle Linux 是 `opc`（请以创建页提示为准）。

进入服务器后：

```bash
uname -m
free -h
df -h /
```

CPU 架构必须看到 `aarch64`（或 `arm64`）；内存约 12GiB。如果不是，不要尝试 x86 镜像。

## D. 开放仅需的入口网络

OCI Console → Networking → Virtual Cloud Networks → 找到该 VM 使用的 VCN → Security Lists（或所属 NSG）→ Ingress Rules：

| Protocol | Source CIDR | Destination Port | Purpose |
|---|---|---|---|
| TCP | 你的公网 IPv4/32（若地址经常变化，临时 /0 并及时收窄） | 22 | Windows SSH |
| TCP | 0.0.0.0/0 | 80 | Caddy 自动证书申请和 HTTPS 跳转 |
| TCP | 0.0.0.0/0 | 443 | 加密音素推理接口 |

不开放 `7860`（应用只允许容器内部网访问）。`80/443` 需同时允许 VM 系统的防火墙；`sudo ufw status` 可核实，若 UFW active，则用 `sudo ufw allow 80/tcp`、`sudo ufw allow 443/tcp`，不要在没允许 SSH 时启用 ufw。Oracle 镜像还可能另有 iptables 规则，需要逐项排查。Docker 端口映射可能绕过 UFW，请始终先使用 VCN/NSG 白名单。

## E. 安装 Docker Engine 和 Compose（Ubuntu 24.04 ARM64）

官方步骤：https://docs.docker.com/engine/install/ubuntu/

```bash
sudo apt update
sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker version
sudo docker compose version
sudo docker run --rm hello-world
```

执行失败时先排除系统版本、APT 防火墙及 ARM Docker 包问题，不要重复付费创建 VM。

## F. 准备无需付费的 HTTPS 域名

Caddy 的 HTTPS 需要一个解析到 VM 公网 IP 的域名。优先使用自己已有的子域名（如 `speech.example.com`）；**没有自有域名**，可申请免费第三方 DuckDNS 子域名：https://www.duckdns.org 。在 DuckDNS 中填入 Oracle VM 的公网 IPv4，形成 `你选择的名字.duckdns.org`。若 OCI 公网 IPv4 后来变化，需要在 DNS 中更新 IP。

在 Windows PowerShell 或服务器执行 `nslookup 你的子域名.duckdns.org`，必须返回当前 VM 公网 IP。确认 OCI 80/443 已开放后，Caddy 才能完成 TLS 自动签发；如果 DNS/证书未就绪，直接访问公网 IP `https://IP/health` 不能代替域名 HTTPS 检查。

## G. 从原 PR #50 拉取语音服务，填入配置

在 **Oracle VM 的 Ubuntu SSH 命令行**，不是 Windows 中：

```bash
git clone --branch feat/v44-full-ui-curriculum-one-shot --single-branch \
  https://github.com/ACIDCH/language-learning-hub.git
cd language-learning-hub/speech_service
cp .env.example .env
nano .env
```

按下列规则修改 `.env`，不要把实际密钥或个人 Token 发给别人：

```ini
SUPABASE_URL=https://szukmwvyyvjajdjoltzy.supabase.co
SUPABASE_PUBLISHABLE_KEY=粘贴本项目Supabase公开PublishableKey
LLH_SPEECH_ORIGINS=https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev
SPEECH_HOST=你的域名.duckdns.org
```

- 公开 `SUPABASE_PUBLISHABLE_KEY` 从 Supabase Dashboard → Project Settings → API Keys 获取，严禁使用 `service_role` 或 `sb_secret_`；本语音服务借助 Supabase Auth 验证用户登录状态。
- `SPEECH_HOST` 仅域名，不带 `https://` 或端口。
- 其他配置固定指向当前 PR 预览站的 Origin，不需要通配符。
- 在 `nano` 中：Ctrl+O → 回车保存，Ctrl+X 退出。用 `chmod 600 .env` 限制文件权限。

在服务器运行：

```bash
chmod 600 .env
sudo docker compose --env-file .env -f docker-compose.free.yml config --quiet
sudo docker compose --env-file .env -f docker-compose.free.yml up -d --build
sudo docker compose --env-file .env -f docker-compose.free.yml ps
```

第一次下载 ARM64 CPU PyTorch、Wav2Vec2 和 Piper 依赖，可能要数分钟以上，镜像需要几 GB 空间。项目所需模型由 `speech_service/Dockerfile.cloud` 内的固定 Hugging Face revision 下载；**当前尚未在用户自己的 Oracle ARM VM 完成真实 Docker build**，如果实际 ARM wheel/依赖不兼容，请保存错误后在 PR #50 定向修复。不要把模拟 CI 成功当成 ARM 运行成功。

查看故障而不打印敏感配置：

```bash
sudo docker compose --env-file .env -f docker-compose.free.yml logs --tail=80 speech
sudo docker compose --env-file .env -f docker-compose.free.yml logs --tail=50 proxy
```

注意：不要执行 `docker compose down -v` 删除 TLS 数据卷；普通 `down` 则会停止服务，应用断联。

## H. 验证 API 并连接学习系统

先在服务器自身验证服务处于 Ready（容器名可通过 `docker compose ps` 查看）：

```bash
sudo docker compose --env-file .env -f docker-compose.free.yml exec speech \
  python -c "import urllib.request;print(urllib.request.urlopen('http://127.0.0.1:7860/health', timeout=20).read().decode())"
```

正确响应包含 `"ready": true`、`"max_seconds": 12`、`"retention": "memory-only"`。如果 `ready:false`、报错或连接超时，则**模型仍未就绪**。

通过任意浏览器（不需要上传 JWT 或录音）访问：

```
https://你的域名.duckdns.org/health
```

必须为合法 HTTPS（没有浏览器证书警告）且返回 `ready:true`。

登录 Language Hub 原 PR 预览：

```
https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/?page=settings&section=learning
```

在「声学服务 HTTPS Origin」填入 `https://你的域名.duckdns.org`，点击「真实检测 /health」，检测成功后点击学习系统「跟读练习」，选择云端模型并主动录音测试。此时 `/evaluate` 还需实际登录 JWT、12 秒内的英文/法文 PCM16、正常往返响应。**目前 `canScore:false` 表示参考音素差异，不代表经过校准的专业评分。**

## I. 维护 / 零成本风险控制

- OCI 的 A1 Always Free 可能资源不足；换可用域或等待。首页区域不可更改，不要升级成 PAYG 只为抢占 A1。
- 新账号创建后在 Billing & Cost Management → Budgets 建一个小预算，例如 US$1，设置 50% 和 100% 警报；预算是通知不是硬封顶，运行期定期在 Cost Analysis 检查是否出现收费。
- 仅用允许免费用量的 VM/存储，不使用收费 IP/付费负载均衡/额外托管磁盘；若已有资源占用，应从总额度中扣除。
- 一台无访问量的 Always Free VM 可能被 Oracle 按空闲回收（官网列 7 日观测规则）；不要通过虚假 CPU 负载刷利用率规避平台策略，正确做法是为重要代码和设置保留 GitHub/加密备份，可重新部署。
- 更新代码：`cd ~/language-learning-hub && git pull --ff-only`（仅 PR 分支），`cd speech_service && sudo docker compose --env-file .env -f docker-compose.free.yml up -d --build`。保持原部署 branch/main 分离。
- 关闭语音服务：`sudo docker compose --env-file .env -f docker-compose.free.yml down`；要**停止 OCI 计费资源/释放资源**，还需在 Oracle Console 停止或删除实际实例（Always Free 内应为免费）。
- 隐私：仅浏览器主动录音才会经 HTTPS 传往服务端，不保存音频或文本记录；用 JWT 校验学习系统账号，严禁日志打印 Supabase Token。

## J. 仅保留现有账号登录入口

PR #50 已将 `src/AccountAccess.tsx` 改为现有账号的邮箱+密码登录表单，主菜单不再显示「注册」，原有账户和学习进度保留。
如果还希望禁止用户直接绕过前端发送注册请求，应由项目管理员在 Supabase Dashboard → Authentication → General Configuration 关闭 **Allow new users to sign up**，这不会删除已有账号。现有连接器不支持读取或修改该 Auth 管理配置，不能宣称后端已关闭注册。
官方：https://supabase.com/docs/guides/auth/general-configuration
