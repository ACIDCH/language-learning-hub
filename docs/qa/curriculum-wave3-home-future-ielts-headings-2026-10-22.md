# Language Learning Hub｜后续课程波次：A1 住房／近期计划，IELTS 段落标题

记录日期：2026-10-22（NZ）  
开发仓库：ACIDCH/language-learning-hub  
审查入口：PR #50，工作分支 feat/v44-full-ui-curriculum-one-shot

## 真实增量

| 课程 ID | 新专题 | 阅读资料与证据题 |
|---|---|---|
| fr-a1-u10 | fr-a1-shared-home-lexicon：房间及物主限定词、partager/donner sur/près de、频率、合租分工 | 原创 4 段、279 法语词，逐段中文、4 道 P1–P4 定位题、双语完整范文 |
| fr-a1-u11 | fr-a1-near-future-planning-lexicon：aller + infinitif、集合/目的地、邀请、天气不确定性 | 原创 4 段、284 法语词，逐段中文、4 道 P1–P4 定位题、双语完整范文 |
| en-ielts-reading-u03 | en-ielts-heading-paragraph-function-lexicon：主题与论证功能、转折、例证与标题范围 | 原创 4 段、430 英文词、逐段中文；6 个候选标题匹配 4 段（2 个干扰项），证据与完整总结 |

累计：156 个规划课程（108 主课+48 基础/衔接）不变；独立语法/词汇专题从 69 增为 **72（语法 38、词汇 34）**；至少关联一个专题的课程 **43**；完整分段双语听读从 8 增至 **11**。三个目标原课程此前已经有语法专题，因此没有重复创建语法课。

## 教学与来源关系

- fr-a1-u10 保留合租公寓、客厅朝花园、厨房共用、饭后收拾盘子、钥匙在门旁、星期日购物的原稿要素。物主限定词随被修饰名词性数变化，不能依说话者性别决定 mon/ma/mes；参阅 https://www.laits.utexas.edu/tex/gr/det6.html 和 https://laits.utexas.edu/tex/gr/pre1a.html。
- fr-a1-u11 保留博物馆、买门票、九点车站前集合、野餐、可能下雨和雨伞的原稿要素。aller 现在时 + infinitif 构成近期将来时，ne…pas 放在 aller 两边；参阅 https://laits.utexas.edu/tex/gr/taf1.html。
- en-ielts-reading-u03 沿用既有种子库阅读的论证功能与两个备选标题，扩展为四段真实可做标题匹配的原创教材。官方 IELTS Reading Matching Headings 关注整段主旨，备选标题多于段落；本练习设六选五以外的四段标题匹配，并标明非官方真题。参阅 https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading。
- 新增源材料是项目自主编写的教学案例。不得声称属于真实科学试验、FEI/IELTS 官方试题或已经过独立人工审校。原有课程草稿与公开附录仍保留。
- 阅读原始段落、完整中文、外语形式辨析、答案依据、双语写作范文和存档操作沿用原主课程组件；不另建新菜单入口。

## 自动验收边界

- tests/specialtyLibrary.test.tsx：72 节完整专题唯一 ID，三节新专题每节四章、表格、4 个练习、八句示范、真实 course.id 和双语质量门槛。
- tests/curriculumAcceptance.test.tsx：新阅读 4 段/4 证据题、中外文对齐、发音提示语义、原音频状态仍为 missing_audio；种子库 6 个标题中有 2 个干扰项。
- scripts/browser-visual-smoke.mjs：3 个新专题 + 3 个原课程入口，各桌面、手机视口中的章节/阅读/练习可见性和横向溢出检查。
- docs/qa/curriculum-gap-matrix.json 更新到 72 专题与 11 完整分段阅读，不改变其余 156 课程质量或正式发布状态。
- GitHub CI 绿灯只证明所列自动条件；真人音轨与片段时间戳未核验、真人账号退出后云端复登未完成、教材逐篇独立语言审校未完成，均继续保持 pending。
- PR #50 不合并 main、不发布 stable。后续优先 fr-a1-u12、IELTS Reading U04–U08 的真实语义缺口，以及使用既有授权音轨的可复现浏览器播放验收。

本文件为当前批次的审计文档，最终结果必须以最新 GitHub HEAD 关联 Actions 记录为准，不能预先宣称所有 CI 通过。
