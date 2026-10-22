# Language Learning Hub｜Codex 交接后第一批教材与真实学习流修复
日期：2026-10-22（NZ）｜PR #50，开发分支 feat/v44-full-ui-curriculum-one-shot

## 当前范围（以 GitHub 源代码为准）

| 项目 | PR #50 交接时 | 本轮改动 | 当前覆盖 |
|---|---:|---|---:|
| 主课程 + 基础/衔接课程 | 108 + 48 | ID/原教材保留 | 156 |
| 完整语法/词汇专题 | 60 | 新增4（语法2、词汇2） | **64（36语法、28词汇）** |
| 至少绑定一个专题的课程 | 39 | 新增 fr-a1-u07、en-ielts-listening-u03 | 41 |
| 无绑定专题的规划课程 | 117 | -2 | **115** |
| 完整分段双语听读 | 4 | 新增 fr-a1-u06、en-ielts-listening-u03 | **6** |
| 人工独立语义 QA / 自然音轨验证 / 正式可发布 | 0 | 本轮未提升 | **均未批准** |

### 本轮新教材与原稿映射

1. **fr-a1-u06：Questions et échanges**。保留已有语法 fr-questions-a1，**没有新建重复疑问句语法课**。新增词汇专题 fr-a1-clarification-lexicon：疑问词与回答类型、楼层/方向的介词、开始/结束/持续、重复/确认的礼貌搭配。新增四段原创校园问路双语听读（236 法语词），从楼层→十点半开课→老师姓名→重复确认顺序构成完整对话。
2. **fr-a1-u07：Goûts et loisirs**。新增语法专题 fr-a1-leisure-verbs：泛指喜好 + 定冠词，faire de 与 jouer à／jouer de 的区别，去处 aller à，否定语义及缩合冠词，4章+4题+8句连贯表达。没有将相似旧专题复制覆盖。
3. **en-ielts-listening-u03：Paraphrase in speech and note-taking**。新增语法 en-listening-paraphrase-scope：小幅下降/大幅崩跌、最大容量/平均出席、考虑/确定、报道来源/因果的区别；新增词汇 en-listening-note-lexicon：attendance、capacity、venue、extra bus journey、monthly proposal 的准确搭配。另加 4 段 372 词原创英文讲座、全段中文翻译、4 个按 P1–P4 定位的证据题与中英摘要。没有冒称 IELTS 官方听力录音或已完成真人音轨。

### 内容与运行时边界

- 所有新专题都走现有 SpecialtyLibraryView / CourseSpecialtyStage 及 useStudyResponses，与对应原主课程 ID 共享输入，不另建不相干入口。
- 两篇新增听读使用已有 ReceptionStudy：按段阅读、TTS 回听、暂停/继续（具体依赖浏览器），分段证据题与写作摘要的输入储存机制沿用既有代码。
- A1 阅读篇幅不应按 B2–C1 的 350+ 词门槛硬性拉长；目前 A1 为 236 词、句法基础且上下文完整，B2 IELTS 为 372 词。测试按教学等级应用篇幅标准。
- 修复中文段落完整程度与答案解析准确性；**不以填充废话凑长度**，不用“草稿等待授权”等研发状态占用学生正文。
- 本轮未改进需要账号的 Supabase 二次会话真实存储验收，未给阅读课绑定真人录音、音频时间戳或课程全面人工语言审校。设备 TTS 仍只作为回退朗读。
- 仍无任何 main 合并或生产 stable 部署批准。

### 验收对象

- tests/specialtyLibrary.test.tsx：64 课 ID 唯一、两条学科路径互相配对、4章+表+双语例句+题解+连贯范文、法语 faire/jouer 介词及英语报告数字上限不被篡改。
- tests/curriculumAcceptance.test.tsx：两个新增 ReceptionLesson 4段/4证据题、中文映射、实际原课程 ID、A1 时间和 IELTS up to thirty / 尚未批准的状态。
- tests/curriculumInteractions.test.tsx：按 A1 和 B2/C1 区别验收阅读篇幅，所有段落中文、证据 ID、真实播放生命周期保留。
- scripts/browser-visual-smoke.mjs：新增 4 个专题与 3 个原课程视口路由，在 390/1024/1440/1920px 验证原课程内章节、4段听读、答案/结构表和水平溢出。
- docs/qa/curriculum-gap-matrix.json 已按真实源文件更新为 64/6；它是覆盖状态索引，未提升 pending QA 状态。

### 后续实际优先级（不得因为当前 64 节停在专题计数）

P0：用真实个人账号完成“主课程答题→手动保存云端→刷新→退出→复登→恢复”，尤其测试基础课的 3500B JSONB 警戒和失败时保留本机原文。无授权账号时准确保留受阻，不使用 mock 冒充跨会话成功。

P1：按课程先修路径继续补原稿中无完整专题的 A1/A2（如 fr-a1-u07 词汇、fr-a1-u08 咖啡/市场、fr-a1-u12 过去叙事），同时推进英语 IELTS Reading u02–u08 的阅读证据定位和中文对照；避免覆盖已有的 60+ 专题。

P2：把可使用的授权音轨与具体课程、段落 ID、原文转写和时间戳逐条绑定；优先 fr-b2-u03、fr-c1-u07、en-ielts-listening-u02/u03，保持设备 TTS 明确标记。

P3：独立逐句教学审校（法语性数/介词/时态、英语限定词及因果、中文通顺、题目和证据一致），复查宽屏留白、卡片重复和手机当前标签。新内容的原文和翻译可查不等于已获独立教师批准。

## 依据

- 既有实际课程草稿：content/lesson-drafts/fr-a1-u06.json、content/lesson-drafts/en-ielts-listening-u03.json，以及 config/curriculum/units.v2.json。
- Tex's French Grammar（疑问句、否定、常用介词）：https://www.laits.utexas.edu/tex/gr/
- IELTS Listening 官方题型及单词数限制：https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening
- 本批内容是新写教学实例和原稿延展，禁止将其标为 IELTS 官方试题、真人音频或已获人工终审的正式教材。
