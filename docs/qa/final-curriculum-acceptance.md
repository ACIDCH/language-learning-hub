# PR #50 教材与真实可用性验收

验收更新：2026-10-22（Pacific/Auckland）。

基线：`b7e98ac0172df2308a31c2f9f8af90dd11d37ca2`。分支：`feat/v44-full-ui-curriculum-one-shot`。本报告区分作者核对、自动检查、真实浏览器和独立教学审核；不授予正式发布资格。

## 实际修改

- **P0**：[逐课差距矩阵](curriculum-gap-matrix.json)由 `tests/curriculumAcceptance.test.tsx` 从课程 ID、原稿索引、基础课程、专题与补充正文生成。108 主课、48 基础课保持不变；60 专题实际映射到39个不同主课，并非60个主课审核通过。矩阵包含原有来源、阶段、听读篇幅、双语覆盖、专题、练习、音频及待审项。
- **P1**：专题章节、练习、写作和听读摘要接入既有学习进度；独立专题页与主课使用同一份作答记录及云端保存链路；切换阶段和刷新保留输入。主课使用原进度 JSON，基础课复用既有 answers JSONB 的 `__learning` 命名空间，保留数字选择题答案。不增加数据库服务。基础课云端原有4KB限制仍在，超过保守3500字节阈值时明确报错并保留本机全文。无选词时不再占用空辅栏；手机刷新、切换和改变尺寸时自动将当前阶段标签保持在可见区域（不滚动页面正文）；结构化教材使用整块正文宽度，双语段落和例句在宽屏分栏，连续原稿仍尊重阅读宽度设置。
- **P1**：修复 Windows 大小写不敏感路径下 `SpecialtyLibrary.tsx` 与 `specialtyLibrary.ts` 的解析冲突，组件重命名为 `SpecialtyLibraryView.tsx`，内容不变。
- **P2/P3**：增加下表四篇原创、完整逐段中文对照的听读材料，保留原有课文、练习及范文。答案均指向段落 ID；区分推测与事实、样本与总体、相关与因果、新闻范围与意图、历史档案与文学感受。私有原稿显示分支也能访问同课程补充教材，原私有正文折叠保留。
- **P3**：设备 TTS 提供逐段选择、回听、暂停/继续、停止、下一段和速度调整；旧回调不能覆盖新段落状态，卸载取消，启动超时与失败有可读提示。没有伪造自然音轨、时间戳或听音验收。
- **P4**：复用原流程及地图 SVG；新增统计柱图与精确表格，来自同一数据对象。3课均提供全文作答、源材料核对、四维自查与范文；字数可自动计算，输入中表格未提供的百分比/观测年份及流程、地图未提供的数值会被点名提示核对；这不判定所有数字或语义都正确。内容准确性仍要求逐项对照，不给假 Band 或自动专业评分。新统计范文超过150词。原有 Task 2、DELF B2、DALF C1长度测试保留。

|课程 ID|本轮输入|外语词数（空格计）|完整中文|证据题|音频状态|
|---|---|---:|---|---:|---|
|fr-b2-u03|市政公告与夸大标题，4段|388|4/4段+解析+摘要|4|设备 TTS；无新自然轨|
|fr-c1-u07|图书馆报道的指标、框架与因果，5段|508|5/5段+解析+摘要|4|设备 TTS；无新自然轨|
|fr-c2-u03|保护说明与第一人称叙事对读，4段|438|4/4段+解析+摘要|4|设备 TTS；非C2官方认证|
|en-ielts-listening-u02|导师对接驳车试点的有限认可，4段|372|4/4段+解析+摘要|4|设备 TTS；非官方模拟卷|

图示写作闭环：`en-ielts-writing-task1-u03`（柱图/表格）、`u05`（流程）、`u06`（地图）。数字为虚构练习数据，图、表、比较值与范文在同一模块及测试中核对。作者检查了新增文本和译文，独立语言教师审核仍待完成。

## 测试证据

- 最终代码 `952afac`：V4.4 **145项通过**、发音生命周期回归45项通过，完整前端门禁及TypeScript/生产构建通过。新增测试覆盖私有原稿、基础课JSONB兼容、独立专题↔主课共享作答、语音超时、数字证据核对。
- `npm run build`通过，保留原有大包提示（主包约1.34MB，gzip约421KB），未引入新依赖。
- `git diff --check`、浏览器脚本语法检查通过。
- 本机 IAB 真浏览器确认 B2 听读答案刷新恢复、五阶段切换和四种视口无横向溢出。1440px正文1071.5/文章1133.3px；1920px正文1543.3/文章1612.7px（正文占94.5%/95.7%）。390与768px按单列呈现。原始证据在工作树 `artifacts/acceptance/`。
- GitHub Chromium 沿用既有CI，新增32组代表课宽度测量、12组图示写作输入→核对→刷新恢复和16组明暗/常规/沉浸组合；截图与结果在CI产物 `visual-layout-screenshots`。最终运行及预览提交核验记录在本报告交付记录部分。
- 未获得本次可用账号会话：**登录保存→刷新→退出重新登录/第二会话云端恢复待人工账号验收**。访客恢复和mock测试不能代替此项。

## 尚未完成与精确缺口

1. 本轮完整双语补充正文覆盖上述4课；其余152课不据此声明全面双语或人工审校通过。主目录只有9课已有专门中文学习注释，这也不等于全篇翻译。所有逐课缺口见矩阵；尤其117课无匹配完整专题，仍需按目标补齐，不能灌入别课专题。现有60专题保留，已有专项规则测试通过，但没有对每句独立终审。
2. 四篇新材料没有与全文逐字匹配的自然人音轨。所需外部资料为上表课程 ID对应的可用录音、授权来源、准确转写及分段时间；既有24首A1音频和353参考轨不作为它们的匹配证据。新增 `audio_verified=0`，`QA_approved=0`，`publishable=0`；既有发布授权、课程审核状态均未提升。
3. 设备语音依赖浏览器/操作系统语言包。自动生命周期测试不证明实际出声、口音质量或暂停精度；IAB中法语 `fr-b2-u03:P1` 和英语 `en-ielts-listening-u02:P1` 均观察到播放开始与自然结束事件，法语还验证暂停/继续。未人工试听语音质量，不将浏览器事件冒充音轨内容验收。
4. 基础课长文本的云端容量上限需要后续经审核扩展数据库字段/约束；本轮不修改线上表，不截断用户输入。独立专题页与主课程的共同作答已通过真实本机存储的跨组件测试，仍需个人账号完成云端跨会话验收。
5. 未做稳定版部署、未合并main、未修改AI教师、音频存储、课程数量或其他仓库。

## 规则来源与复现

- [Tex si条件句](https://www.laits.utexas.edu/tex/gr/tac3.html)：B2的si+imparfait/conditionnel présent，C1的si+plus-que-parfait/conditionnel passé；新增解释、问题和摘要交叉核对。
- [IELTS Writing官方规则](https://ielts.org/take-a-test/preparation-resources/writing-test-resources)：Task1至少150词、Task2至少250词及四维评价；本系统源材料清单是教学自查，不是官方评分。
- [IELTS Academic样题入口](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)、[CEFR描述](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)。文本为本项目原创，没有复制官方完整试卷。FEI直接PDF本轮返回403，保留既有200–240词C1综合要求与测试，不声称重新读到该PDF。

复现：`npx vitest run --config vitest.v44.config.ts`（同时刷新矩阵）；`npm run build`；Linux现有CI启动4173预览后运行 `node scripts/browser-visual-smoke.mjs`。没有使用本机Windows电脑操作或绕过浏览器安全限制。

人工账号验收：在预览亲自登录，进入上述图示课→表达→输入完整答案并写学习笔记→点击“保存到Supabase”→确认成功→刷新→退出并重新登录，再核对全文、笔记与阶段。请勿在聊天中发送密码。

## 交付记录

- 功能提交：`4a7bf76`（正文/保存/图示）、`8cf4f68`（手机当前标签定位）、`2bcd984`（数字证据反馈）、`952afac`（独立专题共享作答）。
- [最终功能代码构建与145项V4.4测试](https://github.com/ACIDCH/language-learning-hub/actions/runs/39665408482)。
- [Chromium验收运行](https://github.com/ACIDCH/language-learning-hub/actions/runs/39665408455)：**232组全部通过，0个问题**；[最终JSON证据](evidence/chromium-952afac.json)及[390px当前标签定位截图](evidence/390-restored-stage.png)。前次232组检查未覆盖手机当前标签可见性，人工看图发现后已新增断言并修复，不能将前次0告警视为没有缺陷。
- [公开预览：统计图](https://4f4211ed.language-learning-hub.pages.dev/?course=en-ielts-writing-task1-u03&tab=read)；[法语B2](https://4f4211ed.language-learning-hub.pages.dev/?course=fr-b2-u03&tab=read)；[法语C1](https://4f4211ed.language-learning-hub.pages.dev/?course=fr-c1-u07&tab=read)；[英语听力](https://4f4211ed.language-learning-hub.pages.dev/?course=en-ielts-listening-u02&tab=read)。点击对应“听读”或“表达”。Cloudflare检查明确对应 `952afac`，已在IAB实际打开并验证图表与数字反馈。
- 公开预览输入 `Online borrowing reached 90% in 2012.`，分别提示核对90%与2012；刷新后全文恢复；390px下“05表达”位于导航范围34.7–340px内（标签145.3–248.3px），修复后实际可见。
- [三种写作本机恢复结果](evidence/iab-writing-flows.json)、[宽屏双语截图](evidence/1920-bilingual-c1.png)、[统计图截图](evidence/1440-task1-chart.png)。上述两张截图取自功能提交4a7bf76，均为真实CI浏览器渲染；手机标签修复证据另见最终CI。
- [独立专题→关联主课→刷新后的相同答案](evidence/public-shared-answer.json)已在952afac公开预览实测。
- 最终文档提交只补证据，不改变上述功能代码。保留[PR #50](https://github.com/ACIDCH/language-learning-hub/pull/50)等待所有者审查。
