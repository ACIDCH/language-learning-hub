# 语法与词汇专项：资料来源与内容交接（2026-10-21）

## 第一批完整教材（16 个）

法语语法：fr-etre、fr-avoir、fr-articles、fr-er。英语语法：en-signposts、en-contrast、en-modals、en-conditionals。
法语词汇：fr-greetings、fr-family、fr-objects、fr-room。英语词汇：en-lecture-terms、en-signpost-vocab、en-evidence-vocab、en-study-vocab。

所有专题在 src/specialtyLibrary.ts 中有独立内容数据。每个知识点包含规则解释、搭配结构、实际外语例句、完整中文对照、用法说明与易错纠正。每章有理解核对、答案解析与综合输出任务。通过 tests/specialtyLibrary.test.tsx 审核最低质量门槛。

## 实际使用的已有教材材料

- 仓库现有公开课程、结构化中文笔记、curatedCurriculum 中的原创法语冠词及英语学术讲座样板。
- YUNPAN 里实际读取的 “FR - A1 Complete Roadmap V2 (原创12单元)”、“FR - A1 Unit 01 - Saluer et se presenter” 和 “FR A1 U01–U12 — Original Manuscript Editorial Audit and Corrections V1.3” 的段落。
- 个人教材仍归 YUNPAN，仓库不复制其全文，也不将非官方补充当作出版商原文。

## 私人课程 QA 必须保留的纠错

FR A1 U01：tu/vous 应依正式程度、年龄与关系区分，同龄学生初次见面仍可能用 tu。
FR A1 U03：填空 “Je n'___ pas de frère.” 的答案是 ai，不是 n'ai；后者会重复否定中的 n'。
FR A1 U05：se lever 是代词式动词；应讲解 je me lève 和 je ne me lève pas。
FR A1 U04：c'est 与 se 不是同音。仅在实测验证后才能展示发音评分。

## 公开材料交叉核实

- Tex's French Grammar：https://laits.utexas.edu/tex/gr/ （名词、限定词、动词、否定）
- 法语冠词：https://www.laits.utexas.edu/tex/gr/det4.html 与 https://www.laits.utexas.edu/tex/gr/det2.html
- Français interactif：https://open.umn.edu/opentextbooks/textbooks/248
- British Council Grammar：https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2
- Cambridge English Vocabulary Profile：https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA
- CEFR：https://www.coe.int/en/web/common-european-framework-reference-languages
- 间隔回忆与主动检索：https://www.learningscientists.org/blog/2020/8/13-1

以上链接用于知识交叉验证，不把第三方完整讲义复制到项目里。专题等级是我们自己的课程编排，不宣称获得 Cambridge/CEFR 外部认证。

## 发布与覆盖边界

该次实现只是首批 16 个完整专题样板，并不代表 156 门课程及 A1–C2 全等级已逐节重构、音频已逐条合法配对或获得专业人工教学审校。保留 main 不变，继续在现有 PR #50 开发分支评审。专题中的练习为会话临时编辑，不声称自动同步 Supabase 或长期间隔复习调度已经实现。

下一步按当前等级路标扩展独立专题的全面覆盖，记录每个课程对应的专题学习路径，并进一步逐课完成校订。
