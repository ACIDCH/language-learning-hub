# Language Learning Hub｜项目交接与未完成工作清单
整理日期：2026-10-21｜供 Codex 执行｜执行指令：CODEX_EXECUTION_INSTRUCTIONS_2026-10-21.md

## 1. 仓库、分支、发布与验收基线

| 字段 | 已核实状态 |
|---|---|
| GitHub | https://github.com/ACIDCH/language-learning-hub |
| 开放 PR | https://github.com/ACIDCH/language-learning-hub/pull/50 |
| 工作分支 | feat/v44-full-ui-curriculum-one-shot |
| 已验收的功能代码 HEAD | c4ace07ec4d7a3249ef6fb9594874fa2310f8482 |
| 当前合并状态（取档日） | PR 开放、未合并 main、未批准稳定版发布 |
| 预览站点 | https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/ |
| 最近成功的布局工作流 | https://github.com/ACIDCH/language-learning-hub/actions/runs/39572949746 |
| 机器检查 | 该功能代码 HEAD 的 8/8 GitHub Actions 成功；Chromium 172 组页面与视口检查、0 个自动检出问题 |
| 线上版本限制 | GitHub CI 成功不等于已经独立确认 Cloudflare 预览站点同步到该 commit，也不是实机全功能验收 |
| 交接文件的提交 | 本文件及配套指令为**文档提交**；Codex 启动时应再读取 PR 最新 HEAD，而不是盲目重置到上述旧 SHA |

### 数量的准确含义

- 既有课程规划：**108 个主课程单元**（法语 60、英语 48）加上 **48 个基础/衔接单元**，合计 **156 个规划单元**。
- 单独设计并编写的语法/词汇专题：**60 节（语法 34、词汇 26）**。专题可与某个主课程 ID 绑定，**不可和主课程数量相加，亦不可视作 60 个完整审校主课**。
- content/v44-main-index.json 当前 108 个主课程索引：existing_original **7**、original_draft **101**；text_complete=true 为 **108/108**（结构性正文检查），qa_status=pending、reviewed=false、audio_status=missing_audio 均为 **108/108**。这是元数据状态而非对每条教材质量的独立认定。
- 前一阶段资源完整性报告区分：156 个规划单元结构上存在可显示文本，**人工教学审校 0、已核验音轨绑定 0、正式可发布课程 0**；这些统计须由 Codex 重新从实际文件/日志核对后才能更新。
- content/v44-draft-publication.json 对 101 份项目原创草稿授予**公开预览**授权，未表示完成人工审校、授予第三方内容再分发许可或批准 production release。不要随意在学生正文展示原有冗长开发提示。

## 2. 所有者反复强调的实际体验问题（不得遗漏）

### A. 教材内容（第一要求）

1. 语法和词汇是最重要的教学板块，应该有独立的深度知识组织，又必须实际融入每节原课程。不能只有几行解释、混乱词表和范例碎片。
2. 内容要**饱满、准确、连贯、自然且具有教学逻辑**。词汇不仅是“外语=中文”，还需有冠词/性数、动词构型、语域、搭配、反义辨析、句子中的作用、跨句使用；语法必须解释“什么时候用/什么时候不用/为何不能互换”。
3. 必须有中法/中英双语对照，尤其语法、词汇、情境、表达、听读、练习答案；中文应符合自然表达，不可照词逐字硬译。
4. 从基础逐步建立能力：发音识别（通过选词和朗读实现）→ 词 → 短句 → 段落 → 长难句 → 实际写作或听读。CEFR/IELTS 必须以真实课程目标组织，不得每节独立重复相同短例句。
5. 结合已入库课本与相关外部资料完善，但要如实区分原课已核对、已授权资料、参考链接与自编内容，不把未经实际读到的课本或音频写成“已逐页核对”。
6. 不允许教材充斥“AI 味”“原创完整样课 v0.1”“草稿已经编写”“待核对授权”“开发中”“课程导入”等与学习无关的陈述或过程卡。页面用语简洁、清晰、真实有用。

### B. 页面排版和交互（第二要求）

1. 用户多次指出右上角/右侧存在巨大留白；大量内容挤在中央小块，阅读不舒适。桌面宽度与侧栏应真正利用可用空间；并兼顾 390px 手机和横向表格。
2. 不要在主课程、独立专题及右侧工具栏重复同一段规则、易错点、例句和教学状况；有内容才显示辅栏。知识可以拆出专题页供查阅，但主课程必须能直接完整学习。
3. 在侧栏或随选文字浮层中实现单词/句子选取、朗读与查看解释；用户**明确要求删除独立发音板块**，不接受仅换名称继续出现的发音大模块。
4. 删除无意义的“课程导入/课程素材导入”菜单和指向旧版的平台入口。学生真实课程具有情境、语法、词汇、听读、表达连续体验，不应靠不断新建标签页凑功能。
5. 双语文章要保留段落结构；长篇范文不能被拆成一二十张孤立卡；需要完整阅读排版、对应中文和可折叠的逐句解析。交互按钮必须能真正操作。
6. 课程进度、笔记、学习资料、云端同步、英语与法语切换等已存在功能不能被新排版破坏。

### C. 实际真实性（第三要求）

- 禁止用“已编写 156 单元”替代实质性教材审校；禁止把写作范文没有引用的假设数字伪装为真实研究。
- “通过 TypeScript/单测”不代表音频自动对齐、真实用户云端保存、官方 IELTS 练习、全课程已核对或真正浏览器可用。
- 对“尚未完成/尚未确认/无法访问”的模块给出诚实状态，优先修复教学可用性而非堆叠数量。

## 3. 已真实提交的工作（勿重做）

### 已有主课程融合及交互

- src/StructuredLesson.tsx：可见五阶段“情境/语法/词汇/听读/表达”；按原课程 course.id 判断是否有完整专题。
- src/CourseSpecialtyStage.tsx：主课程内阅读实际匹配专题，章节切换、结构表、中外双语例句、朗读、练习解析、完整输出、折叠范文、加入本课笔记；未匹配时保留原稿。
- src/SpecialtyLibrary.tsx + src/specialtyLibrary.ts + src/specialtyLearningPath.ts：独立知识专题的检索/阅读/顺序/原课程映射；共 60 篇，法语和英语。
- src/CourseReader.tsx 与学习进度相关模块：现有课程页、用户输入、笔记、选词和云端入口。此前代码显示“加入本课笔记”与“保存到 Supabase”是**不同动作**，真实两次会话持久化尚需用户态测试。
- config/curriculum/units.v2.json 仍用六步数据模型（context / grammar / vocabulary / reception / pronunciation / production），但现行前端呈现五阶段；需要在不恢复用户否定的独立发音模块前提下修正语义映射/缺口提示。

### 已有深化课程

- 法语 A1/A2：物主限定词、祈使式、地名与语言、冠词、形容词、比较级、简单将来、否定及购物服务等。
- 法语 B1：愈过去时与 passé composé/imparfait 对照，条件式现在时、关系代词、虚拟式，观点与论据语块。
- 法语 B2：过去条件式、语气与让步、DELF 正式论证与新闻转述；对应 fr-b2-u03（新闻报道）、fr-b2-u06（正式写作）。
- 法语 C1：书面语词汇与搭配、DALF 综合写作、媒体报道证据比较；fr-c1-u03 synthèse 和 fr-c1-u07 媒体阅读。
- 英语 IELTS：听力转述/讲者态度、Task 2 论证连接、语言证据与至少 250 词讨论作文；Task 1 的 6 步流程和新旧地图完整语言教材（150+ 词教学范文）。
- src/Task1VisualEvidence.tsx + src/task1VisualEvidence.css：目前已存在**原创可视化**：六步骤纸张流程 SVG，前后地图 SVG（图书馆、花园→学习室、停车场扩建、步道保留），专题页和原课程页显示。明确不是官方真题，**不要重复造相同图**。
- 各教材文件按主题拆分，如 src/frenchExamWritingContinuity.ts、src/frenchMediaReadingContinuity.ts、src/nextCurriculumContinuity.ts、src/advancedFrenchSpecialties.ts 等。

### 已有测试与相关报告

- tests/specialtyLibrary.test.tsx；tests/curriculumStructure.test.tsx；scripts/browser-visual-smoke.mjs；GitHub Actions 8 个门禁。
- docs/curriculum/58-unit-real-course-integration-2026-10-21.md：58 阶段主课融合记录。
- docs/curriculum/60-specialty-b2-c1-reading-task1-visual-2026-10-21.md：最新 B2/C1 媒体读写与 IELTS 原创 SVG 记录。
- 前一轮成功检验：172 组页面/视口无自动问题，仅说明自动布局和关键路由满足现有断言，**没有证明大屏留白的主观排版质量已经达标**。

## 4. 下一步任务完整清单（按真实交付优先级）

| 顺序 | 工程内容 | 当前问题/为什么要做 | 最低验收证据 |
|---|---|---|---|
| P0 | 建立逐课缺口表与现状基线 | 156 结构完整与真实教材深度不等价；60 专题覆盖不等于 60 审校课程 | 每 ID 原来源、内容状态、语言对照、音频、实际练习、缺口/优先级 |
| P1 | 修复大屏留白与重复 UI，完成主课程直接学习 | 用户实机截图中右侧/右上大片空白，旧摘要重复；需按实际视口修布局 | 390/768/1440/1920 代表课程宽度截图、正文完整、关键按钮功能 |
| P2 | 语法/词汇内容全文校订及未覆盖主课填充 | 仍有课程只具有概要，法语规则/中文自然性/练习链需逐篇校验 | 已修 ID 清单、原文依据、重点易错规则/译文/习题一致，未审 ID 单列 |
| P2 | B2–C2 长篇阅读与论证/综合的实质增补 | 现有 B2/C1 原创媒体文章是技能短文，不是完整 DELF/DALF 规格 | 篇章足够、问题指向文本、答案证据、两语言解析、真实时态/语域 |
| P3 | 教材与自然音频/听读逐段绑定、选词侧栏 | 主课程索引 108 条 audio_status=missing_audio，已验轨零；不可冒称已实测 | 原轨 ID/许可/转写/段落时间戳、真实浏览器播放及可用回退 |
| P4 | IELTS Task 1 真实看图训练扩展 | 已有流程与地图图示；统计图/表格及源数据闭环仍欠完整 | 图示↔数据↔示例↔答题反馈一致；Task1 150+ / Task2 250+ |
| P4 | DELF B2/DALF C1 高级教学质量 | 已有正式写作和 C1 双资料综合，还要拓展完整听读及来源边界 | B2 250+、C1 synthèse 200–240、对照原始材料、无个人评论 |
| P5 | 练习保存/重新登录核查、浏览器和预览验证 | 自动测试无法证明个人账号云端长期保存；Cloudflare 更新未知 | 两次会话保存证据、无 UI 回退、全量 CI、部署 commit 标识 |
| P5 | 最终文档/PR 与分级验收 | 避免“已提交即已完成” | PR commit、差距表、测试/截图、受阻项、人工需确认事项 |

**执行顺序细则：**先 P0 确认当前真实状态，再在同一分支持续推进 P1/P2；P3/P4 可以并行但不能抢占教材准确性和主课程体验资源；最后集中 P5 验收，不需要每阶段停下来征求无关紧要的选择。

## 5. 辅助参考的正确使用（含用户提供的网站）

### 来自用户的三个语法参考网站

1. Gymglish / Frantastique 语法指南：https://www.gymglish.com/en/frantastique/french-grammar —— 按形容词、副词、冠词、时态、代词、常见错误、句法等分组，可借鉴“主题分类与例句结构”，不可直接照搬文章。
2. GrammarMama 法语学习路径：https://grammarmama.com/learn/french/；中文页面示例：https://grammarmama.com/zh/learn/french/a1/question-words/ —— A1–C2 分级语法路径、重点解释、例句与常见错误可用于核查遗漏，并与本项目既有 syllabus 交叉对照；不能把它的等级主题数当成本项目课程进度。
3. Scribd《法语语法结构表完整》：https://www.scribd.com/document/769277033/%E6%B3%95%E8%AF%AD%E8%AF%AD%E6%B3%95%E7%BB%93%E6%9E%84%E8%A1%A8%E5%AE%8C%E6%95%B4 —— 可用于检索待补语法结构的**目录线索**，但页面含转载、OCR/排版异常和未经独立校核的术语，不应当作终审权威或全文复制到公开代码。

### 规则校验和真实考试标准

- Tex's French Grammar（Texas）：https://www.laits.utexas.edu/tex/gr/
- CEFR can-do 描述符：https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors
- FEI DELF B2：https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-b2 —— 官方完整书面表达最少 250 词。
- FEI DALF C1 synthèse 指令：https://www.france-education-international.fr/document/dalf-c1-peexercice-1-con —— **200–240 词**；整合多个文本、用自己的顺序和表达、不加新信息或个人评论。
- IELTS Writing 官方资源：https://ielts.org/take-a-test/preparation-resources/writing-test-resources —— Task 1 至少 150 词，Task 2 至少 250 词，评价包括 Task Achievement/Response、Coherence & Cohesion、Lexical Resource、Grammatical Range & Accuracy。
- IELTS Academic 官方样题：https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test —— 实际官方视觉题请外链或在合法可用范围使用，不把自画 SVG 称为官方题。

## 6. 交接红线与合理边界

- 保持个人项目的高效工作流，**不增加无关权限/隐私审计长篇流程、无意义模型能力宣言或多轮批准**；仍需避免在代码和回答里暴露 token、密钥及其他真实凭据。
- 原课程有实际来源时优先保留、核对和扩写；没有可访问原始音频/教材内容时应精确说明，不能虚构已核对。
- 文本丰富 ≠ 重复文字，教材长度和教学质量应由学得会、解释通、能作答来评估；完整主课不是 60 节专题数量的简单叠加。
- 新增 UI 必须跟真实操作绑定，先完善已有功能再加新菜单/大卡片；不进行整个网站风格的无端再设计，不触碰单独的 Chrome/PIT 翻译插件仓库。
- 不以自动化测试通关冒充人工语义审校、真实外站链接/音轨验证、登录长期进度同步。所有最终结论只基于实际证据。

## 7. Codex 开始时的顺序

1. 阅读配套执行文件 CODEX_EXECUTION_INSTRUCTIONS_2026-10-21.md 与本交接文档，核查 PR #50 新 HEAD、测试状态和其他并行修改。
2. 按 P0 建立逐课差距矩阵，不丢弃 101 个原创预览内容、不覆盖已有课程或已合并的源。
3. 依 P1 → P2 → P3 → P4 → P5 执行，随进度精准增补测试；涉及受阻资料只做可验证替代并记录。
4. 最后统一提交 PR、差距表、真实验收报告和短篇中文成果汇报。不得直接合并、发布 stable 或删除原有素材。

---
只将上述源文档链接当作需要逐项核查的材料入口；本交接里的历史 HEAD、测试数、审核状态是 2026-10-21 工作快照，所有未来结果以当前仓库和实测记录为准。
