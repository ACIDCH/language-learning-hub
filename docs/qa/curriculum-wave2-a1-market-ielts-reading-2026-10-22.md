# Language Learning Hub｜A1 兴趣、购物与 IELTS Reading U02 增量交接

日期：2026-10-22（NZ）｜仓库 ACIDCH/language-learning-hub，PR #50
基线：64 节专题、6 门有完整分段双语听读；本轮保留 108 主课程与 48 基础衔接单元，没有合并 main。

## 实际新增（按源课程 ID）

- fr-a1-u07：新增词汇专题 fr-a1-leisure-choice-vocabulary，与已有语法 fr-a1-leisure-verbs 配套。四章依次训练活动搭配、偏好程度、天气限制、九十分钟喜剧与茶后的交流。新增 266 法语词、4 段中法对照故事和 4 道定位题，保留 Léa/Hugo 的原课程情节。
- fr-a1-u08：新增语法 fr-a1-market-quantities-grammar，区分 du/de la/de l’、une bouteille d’eau、un kilo de pommes、pas de sucre 和礼貌询价；新增词汇 fr-a1-market-service-vocabulary，覆盖交易单位、器具、报价、付款和礼貌表达。新增 293 法语词、4 段中法对照市场/咖啡馆故事和 4 道源段落证据题。苹果三欧元是每公斤单价，茶/面包五欧元是另一项合计；不能混为同一价格。
- en-ielts-reading-u02：新增语法 en-reading-evidence-scope-u02（限定从句、比较基准、未测量与 TRUE/FALSE/NOT GIVEN），词汇 en-reading-research-evidence-lexicon-u02（weekly visits/unique visitors/respondents、reference period、alternative explanations、data strength）。
- EN Reading U02 已有完整原创 A–F 阅读正文 public/learning-assets/en-ielts-reading-u02-v1.txt，因此没有复制和重编替代文本。80→120 是六到八点的平均每周入馆次数，增加 40 次；不是新增 40 人，也不是成绩提高。

## 课程矩阵与教学界限

- docs/qa/curriculum-gap-matrix.json 更新为 156 门规划课程、69 节独立专题（语法 38 / 词汇 31）、43 门至少关联一节完整专题的课程、8 门有完整 4 段对照听读的课程。
- 阅读原文、每段中文、章节双语实例、练习答案依据和连续表达对照均可从主课程直接阅读。未匹配课程保持已有内容。
- A1 正文按学生真实交流难度组织（不强制超过 350 词），保留必要的具体数字和时序，不用无意义句子填充篇幅。
- IELTS TRUE/FALSE/NOT GIVEN 的边界以 IELTS 官方 Academic Reading 为准：FALSE=原文矛盾，NOT GIVEN=既无支持也无反驳。不得把“没有测量成绩”改写为“成绩不变”。
- 法语部分冠词及数量结构以 Tex's French Grammar 的 determiners: partitive articles 和 definite articles 交叉核查。
- 以上新增内容均为项目原创教材或既有原文的解释扩写，非官方 IELTS 真题、外部真实研究或已通过独立人工审校的正式教材。
- 自然音轨逐段绑定、两次真实登录的 Supabase 恢复与整体人工审校仍未完成；保留用户个人学习数据和原始资料，不提升发布批准。

## 验收内容与剩余任务

- tests/specialtyLibrary.test.tsx：69 节 ID 唯一、5 节新专题四章、中文、表格、练习、模型及原课程映射。
- tests/curriculumAcceptance.test.tsx 与 tests/curriculumInteractions.test.tsx：新增两门 A1 完整对照阅读、题目证据 P1–P4、适当分级篇幅。
- scripts/browser-visual-smoke.mjs：新增 5 个独立专题、2 个新源课程路由，验证语法/词汇与四段听读在移动及宽屏可读、无横向溢出。
- GitHub CI 需以最新提交的实际 Actions 为准，本文不预先宣布全绿或真实云端验收。
- 下一轮优先补原课未匹配的法语 A1/A2、IELTS 阅读 U03–U08 长文证据练习，之后落实自然音轨及个人账号复登验证；继续保持 PR #50 不合并。
