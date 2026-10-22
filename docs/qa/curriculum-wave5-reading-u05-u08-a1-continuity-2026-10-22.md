# Language Learning Hub｜第 5 轮：IELTS Reading U05–U08 + 法语 A1 连续阅读

日期：2026-10-22（NZ）｜分支 feat/v44-full-ui-curriculum-one-shot｜PR #50，未合并 main。

## 实际源码交付

### IELTS Reading 后四课（新增 8 节完整专题；另补 Reading U01 词汇一节）

| 原课程 ID | 新语法／阅读策略 | 新词汇及表达 | 新双语阅读 |
|---|---|---|---|
| en-ielts-reading-u05 | en-reading-u05-reference-logic：this intervention 回指、目的与效果、eligible/not every | en-reading-u05-retrofit-lexicon：insulation/retrofit/grant 与责任边界 | 旧宅隔热补助；4 段、419 词 |
| en-ielts-reading-u06 | en-reading-u06-hedging-inference：观察与因果、consistent with、tentative、混杂因素 | en-reading-u06-science-caution-lexicon：observational/replicate/account for/controlled comparison | 路边植物叶片观察；4 段、407 词 |
| en-ielts-reading-u07 | en-reading-u07-information-matching-logic：定义、方法、局限与建议的段落定位 | en-reading-u07-survey-method-lexicon：respondent、sampling coverage、underrepresent、remote option | 社区问卷的 Section A/B/C；4 段、429 词 |
| en-ielts-reading-u08 | en-reading-u08-two-source-synthesis：汇总到访增长与局部交通不便的证据综合 | en-reading-u08-access-equity-lexicon：aggregate、indicator、qualitative、representative、reconcile | A/B 双来源可达性综合；4 段、458 词 |

每节新专题都包含四章教材、解释性中英例句、四道题和准确理由、完整八句示范，直接绑定现有原课程 course ID，按语法→词汇→阅读→表达衔接，不创建额外无关菜单。

四篇新阅读都是项目原创，在 src/ieltsReadingU05U08Reception.ts 中按 P1–P4 存储，中英逐段对应，四道题均可回查 source paragraph ID。内容以原有短文主张和人物/情景为依据扩写，未添加不可核对的真实研究、统计值、申请获批状况或资助金额。

### 法语 A1 连续学习（再补 2 篇正文）

- fr-a1-u05：现有规则 -er 现在时与日常词汇专题保留；新增四段 277 词中法双语完整阅读，从九点上班→中午午餐→下午整理桌椅→晚上学法语及周五提前下班。四道题按 P1–P4 定位。
- fr-a1-u09：现有命令式和指路词汇专题保留；新增四段 299 词中法双语完整阅读：出车站直走→第一盏信号灯左转→穿过小广场→图书馆在博物馆对面、入口在药房与咖啡馆之间，步行约十分钟。四道题有源段落定位，方向与时间不互换。
- 两篇 A1 阅读按初级语言程度控制长度，不以 B2/C1 的 350+ 词门槛强制堆砌语言。
- en-ielts-reading-u01 原稿 public/learning-assets/en-ielts-reading-u01.txt 包含两篇完整原创长文。本批补入一节语法/词汇链的缺失一环 en-reading-u01-learning-evidence-lexicon（四章、双语解释、题目、范文），保留旧文本和原有语法 en-academic-passive，不再造一份重复正文。

### 最新矩阵（仅为实际源码覆盖）

- 总规划课程：**156**（108 主课 + 48 基础／衔接）。
- 独立完整语法／词汇专题：**84**（语法 44 + 词汇 40；上轮 75，本轮 +9）。
- 至少有一个完整专题的课程：**48**；无专题关联课程仍有 **108**。
- 具备完整四段双语听读：**19**（上轮 13，本轮 +6）。其他 137 门尚无对应的整篇四段 Reception 教材，但部分已有其他形式正文，不等于“内容完全为空”。
- en-ielts-reading-u01–u08 均已有对应的完整语法和词汇专题。U01、U02 保留各自完整的已有公开原创长文；U03–U08 另外具有四段双语阅读。U01 新增 en-reading-u01-learning-evidence-lexicon，按 access logs、engagement、feedback 与 proxy indicator 的证据边界链接原有两篇长文；不能把专题关联误当作独立审校完成。
- 每课源文件 source、reading、特殊专题和 pending gaps 见 docs/qa/curriculum-gap-matrix.json。新增阅读的完整中文映射不代表原课程所有旧阶段已彻底审校，因此保留 legacy complete_chinese_mapping 等未完成标记。

## 使用的公共资料及界限

- IELTS Academic Reading 官方题型与信息定位、writer claims、sentence/summary completion：https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading
- IELTS 官方样题目录（用于核查题型特点，新增材料不复制真题）：https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test
- U05–U08 原始草稿：content/lesson-drafts/en-ielts-reading-u05.json 至 u08.json。
- 法语 U05、U09 原始草稿：content/lesson-drafts/fr-a1-u05.json、fr-a1-u09.json。
- 归纳均保留原稿数据边界：U05 planned != measured；U06 compatible != proven；U07 market sample != community-wide；U08 aggregate increase != equal gains。新增原文均为原创虚构教学案例，不得当真实研究报道或官方考试材料。

## 验收方式及未解项

- tests/specialtyLibrary.test.tsx：83 个唯一 ID，九节完整新专题的实际源课程关联、结构表、知识章节、练习和语义限定；
- tests/curriculumAcceptance.test.tsx：6 篇四段双语阅读、篇幅按课程等级、证据 ID、足量答案释义和示范；
- scripts/browser-visual-smoke.mjs：八个新专题页面 + 六个新课程页面，各个预设视口的语法词汇、阅读证据、课文宽度及横向溢出，最终以该 HEAD 的 GitHub Actions 实际状态为准；
- 设备 TTS 只是回退朗读。未取得逐段原始授权自然录音及时间戳，不提升 audioVerified。
- 未执行真实身份提供者的「保存→退出→新会话登录→云端恢复」，不以 mock 或浏览器同会话测试冒充跨登录成功。
- 未完成对全部 156 门课程的独立人工语言教学审校和 137 门未具备四段双语 Reception 阅读的逐篇编写；所有 publishable 状态保持 false，PR #50 不合并 main、不发布 stable。

## 后续真实优先顺序

1. IELTS Reading U01–U08 的语法与词汇专题已配对；接下来重点对 U01、U02 原公开长文做逐段中文映射及独立审校，不重复改写原始资料；
2. 补法语 A1 U01–U04 尚缺的完整双语阅读（优先源文件真实内容，不写占位模板），然后清查 A2 与 B1；
3. 对 156 课按 source ID 逐项做独立语义审校，重点核查法语性数、时态与中文对应、英语数值/时间/范围以及阅读题证据；
4. 真实账号退出再登录云端恢复测试与授权音轨匹配后，再决定能否推进正式发布。

此文只记录已经写入分支的内容；测试通过数量必须由最新提交关联 GitHub Actions 实测确定。
