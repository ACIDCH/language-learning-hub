# Language Learning Hub — 主课程与独立教材融合，DELF/DALF 写作（2026-10-21）

## 完成范围

- 从 **56** 节独立专题增加到 **58** 节；**语法 33**、**词汇 25**。
- 新增两节课程：
  - fr-b2-formal-argument-writing → **fr-b2-u06**（Écriture professionnelle）：正式提议信、交际对象、事实与论据、让步与实施方案。原创正式信函模型 **347 法语词**（按空格分隔计算），DELF B2 正式写作需至少 250 词。
  - fr-c1-cross-source-synthesis → **fr-c1-u03**（Synthèse de sources）：原创虚构文本 A/B，真实需要/运营成本/学生咨询的信息矩阵、名词化及忠实改写、主题式综合；原创 synthèse 正文 **232 法语词**（不含标题），位于 DALF C1 官方 200–240 词范围内。
- 两份模拟材料都明确是项目新编写的教学材料。无官方真题、真实研究统计、原教材已审核或官方评分的冒称。课程练习不把“部分学生”改写为“所有学生”，不把建议写为已证实的效果。

## 融合到原主课程的实际实现

以前：CourseReader 只提供“系统学习本课语法/词汇”的外部专题跳转，StructuredLesson 的语法/词汇五阶段正文仍展示原大纲、简短词表和重复说明。

现在：

1. StructuredLesson 在加载主课程时，使用 **真实 course.id** 与 linkedSpecialties('grammar'/'vocabulary', id) 严格匹配已编写专题。
2. 对有对应完整专题的课程，语法／词汇阶段使用 **CourseSpecialtyStage** 在原课程内直接展示对应四章的规则、结构与搭配、参考表格、逐句外文及中文、具体辨析。
3. 原正文中相同阶段的简略规则/词表和重复的 BilingualTeaching 面板被替换；不叠加在完整教材后。
4. 每节课堂保留可切换章节、朗读、带答案解析的问答、完整表达、折叠的连续中外文范文、写作输入和“加入本课笔记”。
5. 未编写独立专题的课程**保留原来的教学内容**；不会自动贴入其他单元的知识点，也不会标记为空的“已完成”章节。
6. CourseReader 的五阶段课时、原始听读、语音跟读、选词工具、笔记和云端学习进度不被移除；本轮未证明真实云端持久化的端到端用户会话。
7. 长篇作文在正文中按自然段显示，中外文对照分段，避免几十张单句卡片挤占桌面或手机屏幕；各知识点支持独立展开与练习。

## 课程结构、字数及资料来源

| 场景 | 结构 | 采用的官方依据 |
|---|---|---|
| DELF B2 正式作文 | 任务情境 → 收件人及形式 → 事实与影响 → 让步和成本 → 可评估的方案 → 正式结尾；不少于 250 词 | [France Éducation international: DELF B2 官方考试介绍](https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-b2)；[官方 B2 写作评分解释](https://www.france-education-international.fr/document/explic-grille-pe-b2) |
| DALF C1 客观 synthèse | 阅读两份原创材料 → 信息提取矩阵 → 归纳共同议题及差异 → 改写重组 → 200–240 词源限定综合 | [官方 DALF C1 synthèse 指令](https://www.france-education-international.fr/document/dalf-c1-peexercice-1-con)；[官方综合写作表现说明](https://www.france-education-international.fr/document/descript-perf-pe-c1) |

严格区分课程“真实起点内容”和基于公开规则自主撰写的教学扩展。此次新增的全部例句、模拟材料和作文为原创，不直接引用外部教材整段原文。

## 自动验收

- 专题课时数量、语言和 type、真实课程 ID、章节数、例句双语覆盖、答案解析，以及五阶段完整内容的无重复替换。
- DELF 正式信函模型至少 250 词；DALF synthèse 正文（标题除外）位于 200–240 词；并检查不出现明显的个人立场套语。
- 主课程实际渲染：法语 B1 时态、IELTS 地图、DELF B2 和 DALF C1 主课程阶段均可以导航学习并填写、保存表达。
- 移动、平板、1440 和 1920 宽屏布局：完整知识表和长篇作文不应引起页面水平溢出。
- 自动化检查通过只能证明代码中的结构与浏览器条件，不等于完整语义审校；真实账户测试、全部 156 个规划课程逐篇审核及正式图像试题输入尚未完成。
