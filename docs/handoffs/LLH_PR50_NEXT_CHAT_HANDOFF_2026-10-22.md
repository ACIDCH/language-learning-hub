# Language Learning Hub｜PR #50 下一聊天窗口完整交接（2026-10-22）

> **用途**：本文件交给新一轮 ChatGPT / Codex / 开发 AI，继续执行现有项目开发与教材质量提升。**不是**课程学生页文案，不得把此研发说明渲染给学生。  
> **核心要求**：持续执行、少量必要进度提示、完成相对完整的工作批次后统一汇报；省 Token 但不牺牲真实教材、中文对照、语法准确性和浏览器验收。

## A. 工作入口、最新真实状态（先核对再修改）

- 仓库：**ACIDCH/language-learning-hub**，https://github.com/ACIDCH/language-learning-hub
- 现有审查分支：**feat/v44-full-ui-curriculum-one-shot**
- PR：**#50**，https://github.com/ACIDCH/language-learning-hub/pull/50
- **2026-10-22 交接核查时的业务代码 HEAD**：\`1e59fc7ac12e59c1624789929e1ec2838eadf67f\`
- 在该 HEAD 下 PR 状态：**open、未合并 main、非草稿 PR**；**未获得 stable/生产发布批准**。
- 以下信息只对该 SHA 有效。**本交接文档提交自身会生成新的文档 SHA，且其他 AI 也可能并行提交。新窗口必须再读取 PR 的实时 HEAD、最新差距矩阵和 Actions，不得盲目使用这里的历史 SHA 覆盖工作。**
- 之前用过的 Cloudflare 预览入口：\`https://ae0421b8.language-learning-hub.pages.dev/?course=fr-c1-u07&tab=read\`；这是 **2a0fc8e 时期的预览**，不得称为最新 HEAD 的部署证据。新窗口须核对实际 deployment commit 与预览 URL 再提供试用链接。
- 最新差距矩阵：\`docs/qa/curriculum-gap-matrix.json\`；这是事实盘点的主要起点。较旧 \`docs/qa/final-curriculum-acceptance.md\` 明确是 **2a0fc8e 历史基线**，不是当前结论。

### 真实课程与专题数量（已从 PR HEAD 实际文件读取）

| 指标 | 截至业务 HEAD 1e59fc7 |
|---|---:|
| 主课程 | 108 |
| 基础/衔接单元 | 48 |
| 规划课程总数 | **156**（其中法语 84、英语 72） |
| 另外编写的完整语法+词汇专题 | **84**（语法 44、词汇 40） |
| 至少绑定一个独立专题的课程 | **48** |
| 未绑定独立专题的规划课程 | **108** |
| 已拥有四段式双语补充听读的课程 | **19** |
| 无这种特定四段式补充听读的规划课程 | **137** |
| \`semanticQA=pending\` | **156** |
| \`audioVerified=false\` | **156** |
| \`publishable=false\` | **156** |
| 差距矩阵标有 \`complete_chinese_mapping\` 缺口 | **147** |
| 缺独立语法专题映射的矩阵条目 | **117** |
| 缺独立词汇专题映射的矩阵条目 | **123** |

**极重要的解释**：
1. 156 是课程规划单元数，84 是**另一个维度**的独立语法/词汇专题数；两者不能相加宣称 240 门课程，也不能把“结构存在”当作“已专业审校”。
2. “未绑定专题”“未有四段补充听读”“完整中文映射待审核”**均不意味着相关原课程毫无课文或练习**；很多原始教材、短阅读、授权草稿、音频素材已经存在，必须先查具体 ID 再补。
3. 19 门补充听读属于教学正文与中文译文、题目证据链的**源码覆盖**；尚未逐篇完成独立审校和真人自然音轨对齐。
4. 此前 101 份项目原创草稿获得的是**公开预览展示授权**，不代表教学审校完成、正式教材发布许可或者第三方再分发许可；保留原有课文与合法素材。

## B. **最优先处理的明确阻断：最新 Chromium CI 失败**

在 \`1e59fc7\` 的 GitHub Actions：
- 8 个 workflow 中 **7 个成功、1 个失败**。React frontend build、课程框架、source registry、resource ingestion、public assets、learning service、Cloudflare Git readiness 均成功。
- 失败工作流：**Visual layout smoke**，run **39700055557**，https://github.com/ACIDCH/language-learning-hub/actions/runs/39700055557
- 它实际完成 **396 组页面/视口检查，有 8 个发现**：两个问题各影响 desktop、wide、tablet、mobile 四种视口。运行产物 screenshot artifact：\`https://github.com/ACIDCH/language-learning-hub/actions/runs/39700055557/artifacts/12392462071\`（GitHub artifact 有保留期限）。

**失败组 1：\`enLearningEvidenceVocab\`，4/8 项。**
- 真实渲染上 \`.specialty-grammar-table\` 共 **8 行**，脚本仍强制期待 4 行。
- 位置：\`scripts/browser-visual-smoke.mjs\`，route \`enLearningEvidenceVocab\` 和 \`expected complete instructional table rows\` 判定。
- 先核对对应 \`en-reading-u01-learning-evidence-lexicon\` 的 **两个表各 4 行**是否设计正确；如果真实内容确实应显示 8 行，精确更新**此 route 的预期**，不要删掉知识表，也不要对所有课程粗暴放宽断言。

**失败组 2：\`enReadingU01Integrated\`，4/8 项。**
- 访问 \`/?course=en-ielts-reading-u01&tab=read\` 后浏览器检测到：\`{"topic":false,"source":false,"questions":0}\`。
- 现有脚本预期该原课程语法页含 \`.course-specialty-topic\`、\`.course-enrichment details\` 和至少 4 道 \`.course-specialty-question\`。
- 必须区分是**实际主课导入/原稿渲染 bug**、选错阶段、内容来源加载异常还是脚本 selector 旧。检查 \`src/LessonReader.tsx\`、\`src/CourseReader.tsx\`、课程资源索引与 \`scripts/browser-visual-smoke.mjs\`。
- 之前对 \`en-ielts-reading-u02\` 做过原始课程内嵌修复，但要**保留私人原始教材与公共课程的隔离**，不能为通过 U01 验收将所有私人/非匹配稿件统一替换为专题。
- 只有真实课程内容与问题按钮可操作，且原来源保留时才能判通过；**禁止仅删除或跳过失败路由**。

**修复后先跑针对性 Vitest、构建和上述 2 条浏览器路由，再跑整个 CI；失败日志只取关键行。** 当前不是“全部 CI 通过”，新窗口不得复制旧报告里的全绿说法。

## C. 此聊天实际完成的代码和课程批次（勿重复实施）

### C1. Codex 交接后的基础批：60 → 64 专题，4 → 6 分段听读

- \`fr-a1-u06\`：保留原有疑问句语法 \`fr-questions-a1\`，**避免重复**；新增 \`fr-a1-clarification-lexicon\`：问答词、楼层、时刻、重复与确认；原创四段校园问路双语听读。
- \`fr-a1-u07\`：新增 \`fr-a1-leisure-verbs\`（aimer + 定冠词、不定式、faire de / jouer à / jouer de、aller à）。
- \`en-ielts-listening-u03\`：新增 \`en-listening-paraphrase-scope\` 和 \`en-listening-note-lexicon\`，突出“small decline ≠ collapse；capacity ≠ attendance；考虑 ≠ 决定；相关 ≠ 因果”；配四段 372 词左右双语听读。
- 文件：\`src/a1QuestionsListeningParaphrase.ts\`、\`src/frA1LeisureGrammar.ts\`、\`src/receptionLessons.ts\`，本批报告：\`docs/qa/curriculum-next-wave-2026-10-22.md\`。

### C2. 第二批：64 → 69 专题，6 → 8 分段听读

- \`fr-a1-u07\` 补 \`fr-a1-leisure-choice-vocabulary\` 及四段周末安排与天气双语课，前后与已有语法配对。
- \`fr-a1-u08\` 补 \`fr-a1-market-quantities-grammar\`、\`fr-a1-market-service-vocabulary\` 和市场/咖啡馆双语故事；正确区分 \`du pain\`、\`une bouteille d’eau\`、\`un kilo de pommes\`、\`pas de sucre\`，**苹果三欧元每公斤**和**茶+面包五欧元**不是同一价格。
- \`en-ielts-reading-u02\` 补 \`en-reading-evidence-scope-u02\`、\`en-reading-research-evidence-lexicon-u02\`，**复用已有完整原创 A–F 阅读** \`public/learning-assets/en-ielts-reading-u02-v1.txt\`，不重复造课文；80→120 是入馆次数增长 40 **次**，不是新增 40 人或成绩进步。
- 关键修复：\`src/LessonReader.tsx\` 使**公开的原始课程**也能嵌入匹配的完整专题；保留原稿，并保护登录用户的私人文稿不被公共专题误替换。
- 文件：\`src/nextCoreTeachingWave.ts\`、\`src/receptionLessons.ts\`；报告 \`docs/qa/curriculum-wave2-a1-market-ielts-reading-2026-10-22.md\`。

### C3. 第三批：69 → 72 专题，8 → 11 分段听读

- \`fr-a1-u10\`：\`fr-a1-shared-home-lexicon\`、合租生活阅读；\`mon salon/ma cuisine/mes clés\`、\`donner sur\`、\`on prépare\`、\`chacun\`。
- \`fr-a1-u11\`：\`fr-a1-near-future-planning-lexicon\`、近期计划阅读；\`aller + infinitif\`、九点**车站前**集合而非博物馆、天气 \`peut-être\` 的不确定性、**邀请不等于已接受**。
- \`en-ielts-reading-u03\`：\`en-ielts-heading-paragraph-function-lexicon\`、四段种子库原创阅读与逐段中文；**6 个备选标题匹配 4 段（2 个干扰项）**，区别整段论证功能和局部例子。
- 文件：\`src/homePlansReadingHeadingsWave.ts\`；报告 \`docs/qa/curriculum-wave3-home-future-ielts-headings-2026-10-22.md\`。

### C4. 第四批：72 → 75 专题，11 → 13 分段听读

- \`fr-a1-u12\`：\`fr-a1-first-past-grammar\`、\`fr-a1-yesterday-journey-lexicon\` 及四段昨天外出、今天看照片的双语课。重点：女性说话者 \`je suis allée\`、同弟弟回来 \`nous sommes rentrés\`，及 \`avoir + visité/pris/déjeuné\`，ne...pas 包围助动词；**中午午餐，五点回家**。已简化不适合 A1 的未经讲授的复杂过去时。
- \`en-ielts-reading-u04\`：\`en-ielts-tfng-scope-grammar-u04\` 及四段 2024 年三家图书馆阅读俱乐部原创阅读。**两家晚间、第三家仅周六上午**，TRUE/FALSE/NOT GIVEN；经费、成本未披露，不可虚构。
- 文件：\`src/a1PastAndReadingEvidenceWave.ts\`、\`src/receptionLessons.ts\`；报告 \`docs/qa/curriculum-wave4-a1-past-ielts-tfng-2026-10-22.md\`。
- 上一窗口的最后业务测试提交曾为 \`200db806905517bb492ee5205a35dc6c26797204\`，**现已过时**，不可作为最新 HEAD。

### C5. **本聊天末尾之后，分支又新增了实际代码：75 → 84 专题，13 → 19 分段听读**

这是本次交接**重新读取 GitHub 后确认的新增现状**，不能继续按照“下一步再做 U05–U08”盲目重复：
- \`src/ieltsReadingGrammarU05U08.ts\` 与 \`src/ieltsReadingLexiconU05U08.ts\`：**IELTS Reading U05、U06、U07、U08 已各新增一条语法和一条词汇**（共 8 节）。涵盖 reference logic、hedging/inference、information matching、two-source synthesis；retrofit、science caution、survey methods、access/equity 词汇。
- \`src/ieltsReadingU01PlatformVocabulary.ts\`：阅读 U01 对应的新词汇 \`en-reading-u01-learning-evidence-lexicon\`（这正关联前述 CI 的两张表和主课程内嵌错误）。
- \`src/receptionLessons.ts\` 已有 19 门四段补充听读；新增的覆盖包括 **en-ielts-reading-u05～u08** 和 **fr-a1-u05、fr-a1-u09**。
- 上述源码变更已提交，但 **Chromium 集成未过**。不能把 84/19 当作完整实机验收通过，也不能重复编写这些模块后简单增加统计数。
- 相应源课程内容与专项测试可从 \`src/specialtyLibrary.ts\`、\`src/specialtyLearningPath.ts\`、\`tests/specialtyLibrary.test.tsx\`、\`tests/curriculumAcceptance.test.tsx\` 查看。

## D. 用户反复强调的产品和教学要求（不可淡化）

1. **语法与词汇是教材建设的最高优先级。** 每节课程应沿“先修概念 → 规则或词义 → 变形、搭配、适用范围 → 真实语境例句 → 易混点/典型错误 → 有依据的习题与中文解析 → 完整、连贯输出”的顺序编写。必须实质饱满、逻辑通顺，不能只是 5 个标签、短句堆砌和目录列表。
2. **准确、自然的中外文双语对照**：法语/英语的语法、词汇、情境、表达、阅读、答案、理由，都要对应自然中文。外文形态、冠词性数、介词、搭配、时态和汉语译义须逐句校核；不允许机械直译、范文不对应题干或凭空推断事实。
3. **教学链条连续**：从音与词的识别、词组到句子、段落、长阅读、写作/听力理解，符合 A1→A2→B1→B2→C1 的先修顺序。根据课程真实目标决定文本篇幅，**A1 不用强制拉到 350+ 词**；B2/C1 不得用只有几十词的微练习冒充完整考试练习。
4. **原课程直接学习**：五个可见阶段“情境、语法、词汇、听读、表达”，语法/词汇既允许独立深入查询，也必须在原课程中**真正显示完整章节、表格、题目和范文**；避免跳另一个页才能看到内容。按准确 \`course.id\` 映射；无专题时保留原有正文，不插错课。
5. **学生页杜绝 AI 废话或研发说明**：不得出现“原创完整样课 v0.1”“草稿已编写”“等待授权”“导入课程”“本轮已完成”“尚待发布”“来源登记”“本系统下一阶段”等研发状态和重复宣传性文字；学生要看到教材、实质讲解与练习。项目研发状态放 \`docs/\` 或元数据。
6. **排版不能只挤在中间，右上和右侧大片空白**：在 390、768/1024、1440、1920px 等尺寸中合理使用宽屏；正文、目录、工具栏按有用内容分配；侧栏没内容自动收起。阅读行长仍需舒适，不能把长段拉满整个 1920px；双语文章应保留连贯段落而不是拆成十几张孤立卡片。需要检查常规与沉浸式/宽正文模式和明暗主题。
7. **禁止恢复用户拒绝的 UI**：无意义“课程导入”板块、独立发音学习大面板、伪专业发音评分。选中单词/句子时通过现有侧栏朗读和解释即可；不堆新开关、分类入口、空卡片和无效按钮。
8. **真实可用优于功能数量**：语法/词汇切换、选词朗读、四段听读、答案解析、正文宽度、手机标签滚动定位、原课程→专题共享作答记录、进度与笔记、登录与云端保存需要在浏览器中实际使用。修复根因后测“写入→刷新→退出→再登录→恢复”闭环；单测、接口 mock 不等于真实用户会话成功。
9. **资料利用**：优先用已有课程资料及 Drive / 源文档，核对原课程人物、时间、数字、场所、题型；再参考可靠官方/大学来源来**交叉校验语法和考试标准**。不得把项目原创阅读伪装为 IELTS 官方真题或真实科学研究。对有版权的完整教材和官方图题，应以合法使用或外链为主，不整篇照搬。
10. **发布安全边界**：保留现有 PR #50，**不合并 main、不正式部署 stable、不得覆盖原资料或其他项目仓库（尤其 PIT 翻译插件）**。不需要写无关冗长的权限设计，但也不能暴露任何访问令牌或真实密钥。

## E. 现存核心组件与数据路径（减少乱读和重复建设）

- \`config/curriculum/units.v2.json\`：规划单元/学习目标。注意底层曾有六步数据模型，但 UI 仍五阶段；不应借此重新塞回“发音大板块”。
- \`content/v44-main-index.json\`：108 门主课程及教材草稿/来源状态；很多原稿在 \`content/lesson-drafts/<course-id>.json\`。
- \`src/specialtyLibrary.ts\`：专题类型、汇总注册和 \`linkedSpecialties(type,courseId)\`；**编辑新专题后更新这一总入口**。
- \`src/specialtyLearningPath.ts\`：独立语法/词汇的先修排列。
- \`src/SpecialtyLibraryView.tsx\`、\`src/CourseSpecialtyStage.tsx\`、\`src/StructuredLesson.tsx\`：独立专题及主课程内嵌呈现。
- \`src/LessonReader.tsx\`、\`src/CourseReader.tsx\`：旧/原创原稿与结构化课程的加载分支；特别关注公开原稿与私人用户教材不同优先级，及 **en-ielts-reading-u01** 的当前失败。
- \`src/receptionLessons.ts\`、\`src/ReceptionStudy.tsx\`：四段原创双语听读、P1–P4 证据题、双语范文及浏览器朗读。
- \`src/Task1VisualEvidence.tsx\`：原有 IELTS Task 1 六步流程 SVG、新旧地图 SVG，与示范答案核对；**已有，不要重复造图**。
- \`docs/qa/curriculum-gap-matrix.json\`：156 课状态追踪，专题/听读/中文、音频和独立 QA 映射；更新新课程后同步，但**不得无证据更改 QA publishable**。
- \`tests/specialtyLibrary.test.tsx\`：专题数、唯一 ID、结构与语义检查；注意历史 \`toHaveLength(60/64/69/72/75)\` 断言已被改动，必须针对当前 84；旧测试不能当作永久课程缺口事实。
- \`tests/curriculumAcceptance.test.tsx\`、\`tests/curriculumInteractions.test.tsx\`、\`tests/curriculumStructure.test.tsx\`：段落证据与阅读互动、课程结构。
- \`scripts/browser-visual-smoke.mjs\`：大量页面、屏幕宽度及图示验收；运行目录 \`artifacts/visual-smoke\`，上传截图。**先解决当前 8 个失败点**。

## F. 未完成项目，按下一阶段可执行优先级排序

**P0 · 立即：修复最新 CI 的 8 个 Chromium 发现。** 先对齐 8 行词汇表的正确预期，再找到 IELTS Reading U01 原稿/专题未入页的真正原因；不要破坏私人教材模式。定向测过以后整体 CI 全绿才可进入下一轮内容批次。

**P1 · 最重要：已有 84 节的教材质量与主课程整合。** 对 U05–U08 及 U01 新增模块先审核“双语翻译、语义边界、例句真实性、题目证据、表格准确、可见顺序”，避免只看数量；继续完善其他有原稿但缺完整专题的高优先级课程。检查语法/词汇有没有真正替换只含概览的旧阶段，而非新的专题在另一个页面孤立存在。

**P2 · 156 课逐篇补齐及独立审核**。以矩阵定位实际缺口，沿 A1/A2 基础→B1→B2/C1 进阶和 IELTS Reading/Listening/Writing 的逻辑排序逐批做完整教学正文、语法表/词汇搭配、错误边界、练习和答案依据，逐句查中文；优先精修已有文本而不是重复创作已完备部分。应单独区分“作者检查”与“独立人工/专业教学审校”；没有人员实际审校不得标记 \`semanticQA=passed\`。

**P3 · 自然音轨、合法来源及真实听读**。检查已有资源库/授权音轨（此前项目曾入库 353 轨，但**资源存在≠某课段落已匹配**），按 \`courseId + paragraphId + transcript + timestamp + source + language\` 做真实绑定、解码验证、播放/暂停/拖动/重复与文本同步。仅有系统 TTS 时明确为回退，不冒充真人录音。不要用不必要的独立发音模块替代核心听读。

**P4 · 云端存储真实验收**。实际账号填写答案、记笔记→保存→刷新→退出→重新登录→恢复；主课和专题共享、基础课 JSONB \`__learning\` 命名空间，原有 4KB 限制和 3500B 保守阈值需测试失败保护。无账号/授权就列 blocked，不用 mock 冒充远程跨会话恢复已通过。

**P5 · IELTS / DELF / DALF 完整训练**。对 IELTS Task 1 流程/地图/统计图、Task 2 立场与论据、Reading 各题型、DELF B2/DALF C1 练习核对真实视觉数据/段落来源/词数及难度；保留已存在的 SVG，不要重复建。短篇技能微练习必须与完整官方规格区分。真实评分反馈只能教学用，不能冒称官方 Band/专业认证。

**P6 · UI 与多设备最后验收**。真实检查右侧留白、正文可读宽度、移动端标签、双语阅读、错位、弹层、深色/沉浸式/常规模式。无意义重复内容和工作流描述全部从学生页面移除。待 P0–P5 足够完成后再提交完整浏览器证据、对照截图、错项列表和最终 PR 审核报告。

## G. 已核查的外部教学标准入口（按需取细节，不重复全网研究）

- Tex's French Grammar, Texas：\`https://www.laits.utexas.edu/tex/gr/\`；过去时 avoir/être 分别 \`tap2.html\`、\`tap3.html\`，动词过去分词与 être 主语配合需核对。
- 用户提供的法语语法参考：\`https://www.gymglish.com/zh/frantastique/french-grammar\`；\`https://grammarmama.com/zh/learn/french/\`；Scribd 文档 \`https://www.scribd.com/document/769277033/\`（用户给出的中文标题《法语语法结构表完整》）；第三方页面只能作为选题/结构线索，逐项用可靠语法来源核对，不能照搬受保护原文。
- CEFR 描述：\`https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors\`。
- IELTS Academic Reading 官方格式：\`https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading\`。**FALSE = contradicted；NOT GIVEN = neither agrees nor contradicts；Matching Headings 概括整个段落主旨，多余标题不能重复使用。**
- IELTS Academic 官方样题：\`https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test\`。
- IELTS Academic Writing：\`https://ielts.org/take-a-test/preparation-resources/writing-test-resources\`。完整 Task 1 至少 150 词；Task 2 至少 250 词。
- France Éducation international DELF B2：\`https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-b2\`。B2 正式写作至少 250 词。
- DALF C1 synthèse 官方说明：\`https://www.france-education-international.fr/document/dalf-c1-peexercice-1-con\`。要求 200–240 词，跨材料重组，不加入个人评价与未经提供的事实。
- 已给来源 URL 只是导航入口，不代表本窗口逐页阅读全文或有转载许可。

## H. **省 Token 执行协议（强制）**

1. 第一次只读取 **PR HEAD、最新 Actions 失败摘要、课程差距矩阵、受影响源码及受影响 tests**。不要全仓全文输出 156 课、音频列表、几十篇报告；相关章节需要时再按具体 ID 取。
2. 当前目标单元优先查 \`course.id\`、topic.id、原稿与差距矩阵，先避免重复，再做修复。**复用现有组件、课程元数据和官方链接；不为每门课程复制 UI、状态管理或音频服务。**
3. 一次组织好能形成学习闭环的批次（例如 3–6 门相关单元）；沿用相同模板/工具函数写入，但正文、例句、中文和习题仍需独立语义校核。**不应因节省 Token 使用垃圾模板堆段落。**
4. **先定向 Vitest + 类型/构建，再批次浏览器测试，最后全量 Actions**。只有失败才读取 job 关键错误片段；不要无休止查询成功日志，或每编辑一行触发重复全量回归。
5. 尽量不用公开网站搜索重复内容：仓库已给 source URLs 和文档参考优先；新事实、新术语或专业考试规格需要核查时，做一次范围精准的批量搜索。
6. 若并行有人改 PR，每次写文件前读取最新 blob SHA，避免用旧快照覆盖。小规模增量提交，基于现有分支，不另开一套项目、不触碰 PIT 或个人网站仓库。
7. 不要每完成一两节课程就向用户报告，**连续推进 P0→后续高优先级任务**；结束时统一一份简洁而完整的报告：旧 HEAD→新 HEAD、真实改动、按课程覆盖、测试数量、缺口与受阻项、PR/预览链接。必要的阻断才问用户，且仅问无法通过现有资源解决的精确信息。
8. 不把一次 CI 全绿说成全部教学验收；分开列**代码测试通过 / 浏览器实测通过 / 用户账号云恢复通过 / 自然音轨对齐 / 人工语义审校 / 正式发布批准**六个状态。

## I. 新聊天窗口的第一条指令（可直接复制）

> 请接手 GitHub \`ACIDCH/language-learning-hub\` 的 PR #50，先阅读 \`docs/handoffs/LLH_PR50_NEXT_CHAT_HANDOFF_2026-10-22.md\`。此项目的核心是 156 课真实系统教材质量，尤其语法、词汇、中外双语及原课程五阶段完整学习，不允许 AI 废话、右侧大面积无用留白或重复功能入口；保留现有数据、音轨与用户进度，不合并 main、不部署 stable。
>
> **首先读取 PR 最新 HEAD 和 GitHub Actions**。交接时业务 HEAD \`1e59fc7\` 的 Visual layout smoke 曾经 396 组检查发现 8 项问题：\`enLearningEvidenceVocab\` 预期 4 行但渲染 8 行，以及 \`enReadingU01Integrated\` 原稿/专题未真实入页；务必先修复并验证，不得跳过失败测试。当前仓库已有 **84 节语法词汇专题、19 门四段式双语听读、156 规划单元**，不要沿用早期 75/13 基线，更不要重复造 Reading U05–U08。
>
> 之后按课程差距矩阵持续校订和补齐真实课程：教材正文逻辑、准确自然中文、真实练习与证据、先修顺序、自然音轨对应和真实账号云端恢复。遵守文件内省 Token 协议，在同一 PR 按有完整学习闭环的批次推进，只在完成相对完整阶段后统一汇报，未经确认不得合并或正式发布。

## J. 交接状态诚实声明

- 本交接执行了**实时 GitHub PR、矩阵、源码、GitHub Actions logs 的读取核查**，没有替代开发者修复 P0 失败，也没有宣称完成所有课程。
- **必须由新窗口开始继续**：修复当前两个 Chromium 问题、复核并行新增的 9 节专题与 6 门听读、按矩阵继续校订余下教材、真音轨、真实账号恢复、逐篇专业审核。
- 如交接文件提交引起新的 CI 运行，其结论必须另查；本文件的「7/8」属于业务 SHA \`1e59fc7\` 的检查快照，不应改写成最新文档提交成功。
