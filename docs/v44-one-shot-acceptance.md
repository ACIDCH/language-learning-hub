# V4.4 一次性交付验收

基线：`3399974`；分支：`feat/v44-full-ui-curriculum-one-shot`。PR 地址在本分支交付后补入。2026-10-19。

## 已实现

- V4.4 React 统一目录、阅读、划词工具、账户和总设置。日常/护眼/黑夜与标准/专注/沉浸独立；支持深链接、返回上层、浏览器历史、手机导航及密码显隐。
- 六段阅读保留完整原文、答案和附录；48 个基础单元展示所有教学字段，选择题提供原有答案解析。选词进入现有 SpeechPractice，支持本机收藏、笔记、TTS、IPA 与主动 AI 请求。
- 复用原 Supabase 客户端配置、Auth、Worker 进度接口与 foundation_progress。保存时保留既有状态/答案键，远端读取失败则禁止覆盖；访客修改留在本机。云端保存仍为显式操作，未声称自动云同步。
- 账户私有主课文登录后优先读取，公开原稿/独立初稿仍作为附录保留。未读取或发布私有教材快照；原课程资源、24 轨音频文件、存储与数据库 schema 不变。
- 复用 `/cloud?panel=…` 的资料、导入、音频和基础专项，以及 `/speech-lab`。AI 全局配置仅内存共享，默认关闭；既有服务端与模型路由未改，不保存密钥。

## 内容统计与边界

|来源|单元数|处理|
|---|---:|---|
|现有公开主课程完整原稿|7|全文保留，并接入 12 份 A1 补充材料|
|独立原创主课程初稿|101|每课具体语法/方法、词汇≥6、例句≥4、阅读、两题及答案解析、输出与发音任务|
|现有基础及 A2 衔接课程|48|原数据逐字保留，完整渲染|
|合计|156|108 主课 + 48 基础；唯一 ID，全部实际内容可打开|

机器索引：[`content/v44-content-index.json`](../content/v44-content-index.json)。统计：[`reports/v44-content-completeness.json`](../reports/v44-content-completeness.json)。101 份初稿共 101 段不同阅读，8847 个阅读词。

本分支打包教材的 `text_complete=156` 仅代表结构与非空内容检查；`QA_approved=0`、`audio_verified=0`、`publishable=0`。这不撤销既有云端/音频验收记录。新增初稿全部待人工语言教学审校；TTS、可解码音频或文字识别不计作匹配配音或专业发音评分。

## 实际验证

- `npm ci --no-fund` 一次安装；最终 `npm run build` 通过。保留原有较大 JS 分块提示，未禁用检查。
- `node scripts/validate_v44_content.mjs`：156/156 详情、原19个公开资产哈希、4个基础来源文件、108个原 ID/元数据通过；验证基线保存在小型哈希文件，兼容 CI 浅克隆。
- `npx vitest run --config vitest.v44.config.ts --silent`：11/11，包含实际加载156课、密码切换/Auth调用、深链接、主题与笔记、进度合并/失败保护、重音选择传入真实跟读组件、共享 AI 未配置状态。
- `npx vitest run --config vitest.speech.config.ts --silent`：44/44，既有语音与 IPA 核心回归。
- 真实 IAB 浏览器 1440×1000 / 390×844：目录筛选→已有 fr-a1-u01→原创 fr-a1-u04→六段/IPA/跟读→设置/账户→返回；另抽查 fr-fnd-01 的作答反馈和刷新恢复。法语原创课在手机实际生成141个 ruby 音标，未出现横向溢出；最终浏览器 error 日志为空。
- 真实选择 `Enchanté` 后跟读目标保持重音字符，加入课程笔记成功；主题/布局切换与刷新保留本机笔记，历史前进后退恢复课程；密码显隐保留输入，未提交登录或重置请求。
- 冒烟发现并修复样稿 `!important` 单列覆盖、手机侧栏底部入口隐藏和导航后未收起。没有绕过 Windows 浏览器安全限制。

## 截图

1. [桌面目录](v44-screenshots/01-catalog-desktop.jpg)
2. [既有教材阅读](v44-screenshots/02-reader-desktop.jpg)
3. [真实划词与跟读](v44-screenshots/03-selection-speech.jpg)
4. [夜间账户设置](v44-screenshots/04-settings-night.jpg)
5. [390px 账户设置](v44-screenshots/05-settings-mobile.jpg)
6. [390px 原创课程正文](v44-screenshots/06-draft-mobile.jpg)

## 外部验收与发布注意

本次 IAB 预览没有可用登录会话，因此真实登录、邮件验证/重置、私有课文读取、Supabase 跨设备保存/回读仍待本人账户验收；自动化接口契约测试不能代替此项。未配置 AI 密钥，未发付费请求。未进行真人麦克风/声学模型、原音频全量试听及 Chrome/Edge 实机验收。

手动验收：打开根路径预览→总设置/账户亲自登录→主课与基础课各修改笔记/答案并点击保存→刷新和重新登录核对→访问资料/音频确认既有资源→在 Chrome/Edge 授权麦克风验证跟读；AI 只在自愿启用并填入自己的临时密钥后测试。不要在聊天、PR 或截图公开凭证。

继续使用既有根路径 Cloudflare 构建配置；没有主动部署、数据库迁移或合并 main。PR 完成审查与账户回归后由用户决定最终合并。
