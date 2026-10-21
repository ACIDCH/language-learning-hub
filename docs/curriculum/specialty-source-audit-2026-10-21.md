> **最新独立专题统计（2026-10-21，本轮内容扩展）**：原 24 节 + 11 节可访问完整新稿 = **35 节（语法 18、词汇 17）**。新稿实际课程链接、语言知识顺序及验证来源见 [《Grammar + Vocabulary Content Chain》](./grammar-vocabulary-learning-chain-2026-10-21.md)。以下 24、22、16 节数量为历史阶段快照，不是当前专题总数。未进行所有课程逐页人工审校。

# 语法与词汇专项：资料来源与内容交接（2026-10-21）

> **现行基线更新（2026-10-21）**：在历史 22 节之外新增 fr-questions-a1（关联 fr-a1-u06）与 fr-adjective-agreement-a1（关联 fr-a1-u10），当前 **24 节独立专题：13 语法、11 词汇**。下方 22 / 16 节记录是阶段快照，保留用于追溯，不能当作最新覆盖数。外部资料和改写范围详见 [法语资料核查报告](./french-grammar-source-review-2026-10-21.md)。尚不能声称其它 132 个目录单元均已具备独立专题或人工审校完成。



## 当前实际覆盖基线（更新于 2026-10-21）

- 已有 **22 节可访问的独立专题**：11 节语法、11 节词汇；分为最初 16 节和 src/expandedSpecialties.ts 新增的 6 节。
- 后续新增六节：语法 fr-articles-partitive、fr-passe-compose、en-lecture-hedging；词汇 en-academic-collocations、fr-campus-vocab、fr-food-vocab。
- 22 节具备数据页面、分章节双语示例、自测和答案解析；存在 specialtyQuality 最低门槛及单测，**这不等于人工语言审校通过，也不等于 156 个课程各自有独立专题**。
- 本次检查仅使用现有仓库和公开权威网页。私人 YUNPAN 教材读取状态保留历史审计记录；**本次没有重新逐页打开私人文件**。

### 课程—语法—词汇关系（当前明确 unitLink，非全集自动覆盖）

| 课程 ID | 当前关联语法专题 | 当前关联词汇专题 |
|---|---|---|
| fr-a1-u01 | fr-etre | fr-greetings、fr-campus-vocab |
| fr-a1-u03 | fr-avoir | fr-family |
| fr-a1-u04 | fr-articles | fr-objects、fr-room |
| fr-a1-u05 | fr-er | 暂无独立对应专题 |
| fr-a2-u01 | fr-articles-partitive、fr-passe-compose | fr-food-vocab |
| en-ielts-listening-u01 | en-signposts、en-contrast、en-modals、en-lecture-hedging | en-lecture-terms、en-signpost-vocab、en-evidence-vocab、en-study-vocab、en-academic-collocations |
| en-ielts-language-upgrade-u01 | en-conditionals | 暂无独立对应专题 |

**关联局限**：当前 linkedSpecialty() 只返回一门课程某类型的首条结果。目录仍可进入同一课程的其余专题，但课内尚未显示全部“一课多专题”的关联索引。不能把这张表解读为其余目录单元不存在语法/词汇教学，只能说尚无**独立专题**映射。还未开展 CEFR 外部认证、逐句人工审校、真正间隔复习和专业音频核查。

### 本轮公开参考资料

- 欧洲委员会 CEFR 分级描述符：https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors
- 德州大学 Tex's French Grammar 的冠词与否定等法语语法条目：https://laits.utexas.edu/tex/gr/
- British Council 对 discourse markers 的教学解释：https://www.teachingenglish.org.uk/professional-development/teachers/teaching-knowledge-database/d-h/discourse-markers
- British Council may/might 语法参考：https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/may-might
- Cambridge English Profile Wordlists 对义项/固定语块分级的说明：https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA

以下“第一批完整教材（16 个）”为此前阶段的记录，保留用于追溯，不再代表现行总数。

---

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

该历史阶段只实现首批 16 个独立专题样板（现行基线已扩展为 22），并不代表 156 门课程及 A1–C2 全等级已逐节重构、音频已逐条合法配对或获得专业人工教学审校。保留 main 不变，继续在现有 PR #50 开发分支评审。专题中的练习为会话临时编辑，不声称自动同步 Supabase 或长期间隔复习调度已经实现。

下一步按当前等级路标扩展独立专题的全面覆盖，记录每个课程对应的专题学习路径，并进一步逐课完成校订。
