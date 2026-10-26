# Language Learning Hub｜教材语义抽检与音轨映射审计（2026-10-25）

> 本报告为本轮来源对照和功能核验，不能替代**独立法语教师审校、本人音轨完整试听、版权授权确认或真人跨设备自动化复验**。所有156课仍按原门禁维持 `semanticQA=pending`、`audioVerified=false`、`publishable=false`。不得只因本记录将审校状态批量改成通过。

## 1. 基础与课程进度验收边界

- 用户已明确反馈“双设备可以通过”，记为 `owner_reported_pass`，尊重本人验收；但因未获得设备环境、课程样本标记和可重复的远端写入记录，技术旁证继续为 `database_write_evidence=pending`。
- 已获授权执行的生产迁移 `expand_foundation_learning_answers` 记录于数据库版本 `20261025041935`；实时约束为 `jsonb_typeof(answers)='object' AND octet_length(answers::text)<=262144`。**不要再次应用仓库中同一逻辑而版本不同的迁移文件。**
- 生产库只读复核：`foundation_progress` 仍为0条，`learning_progress` 有5条，主课最近写入时间为2026-10-19。无需为满足报告而新造记录或覆盖真实内容。

## 2. 法语教材第一轮来源—译文—语法抽检

源稿来自 `content/lesson-drafts/fr-a2-uNN.json`；原稿P1及中文来自 `src/frA2SourceReception.ts` 与 `src/frA2ReceptionAdditions.ts`。已逐项核对原始情境、动词时间、量化与已发生/建议区别：

| 原稿 | 已检查的关键证据 | 判断及限制 |
| --- | --- | --- |
| A2 U01 | 下雨后进入咖啡馆；女店主**推荐**展览 | 中文保留推荐≠已参观；不能编成看过展览 |
| A2 U02 | `grand-mère`；未完成过去时背景与复合过去时发现小船 | 中文不虚构父系/母系和长幼；一次发现不可当重复习惯 |
| A2 U04 | `mon voisin`、`te`、`le` | 把钥匙给邻居；书归还Nora；改约仍在询问，Nora尚未确认 |
| A2 U06 | 蓝包60欧、灰包45欧；蓝包更轻却更小 | 选择灰包因为能装电脑和文件；不能杜撰重量、尺寸和保修 |
| A2 U07 | `si + présent, futur`；`pour que nous puissions prévoir assez de places` | 原专题只讲真实条件句，却出现目的从句虚拟式：已补“为保障预留座位，`puissions` 为 `pouvoir` 虚拟式现在时”；A2理解、B1再系统产出 |
| A2 U08 | 图书馆延长周四开馆建议；每周一个晚上的一个月试点 | 只是提案和未来评价，不可称已实施或已有效 |
| A2 U09 | `la carte est gratuite pour les habitants de la commune` | 免费对象仅本市镇居民；不可扩大为所有访客 |
| A2 U10 | 学管理两年（现仍进行）、去年夏天六周短工（已结束） | 中文不得写成现在仍在小企业任职 |
| A2 U11 | 花园已宣布但工程未完成，预计明春开放 | 不得把宣布、施工和未来开放混成已开园 |
| A2 U12 | 烹饪工作坊展示个别邻居的地方习惯 | 不得从个人体验推断全部居民同样习惯 |

A2 U03（转车）与U05（诊疗预约）本轮核对了原始法语的事实及答案，但不在上述P1中文对照十课抽检内，后续需在各自接入模块逐段独立比对；所有四段扩展正文和所有语法/词汇示例仍需完整系统审校。

**可复核参考：** University of Texas at Austin *Tex's French Grammar*, `https://www.laits.utexas.edu/tex/gr/tas5.html`，其中 `pour que` 表目的，通常引导虚拟式。本次修复只补解释，不修改原始源稿或要求A2学习者提前掌握全部虚拟式体系。

## 3. 音频登记与来源边界

生产数据库 `public.course_audio_index` 只读聚合：

| 项目 | 登记数量 | 实际结论 |
| --- | ---: | --- |
| 开放教学参考音轨 `open_reference` | 353 | 数据库标记可解码，但 **353条 course_id 均为 NULL**，不是已对应156课正文 |
| 旧版合成练习 `synthetic_practice` | 24 | 数据库标记解码通过和**旧版目标文本**相同，按法语 A1 的12课每课2条关联 |
| 全库计数 | 377 | `listened=0`、`audio_verified=0`，独立试听未通过 |
| 音轨个人审核记录 | 0 | `audio_editorial_reviews` 尚无实际用户试听存档 |
| 课程人工审校记录 | 0 | `lesson_editorial_reviews` 尚无独立审核存档 |

- 音频数据库中的“可解码”为已存登记标志，本次只读复核没有重新下载所有原始 MP3 或进行音质试听，不能称本轮亲自重测377条。
- YUNPAN Drive 搜索能找到 `Français interactif` 整本 PDF（仅用于合法个人教材参考），但当前查询 **未定位到 ZIP 类型的独立音轨文件**。不能以此断言其他存储/历史上传没有ZIP；也不能以教材PDF和云盘索引代替MP3逐条匹配与授权审查。
- `Français interactif` 开放教材及单项媒体需分别检查署名/适用授权；`Inspire` 商业教材及音频应保留授权或合法来源凭证。YUNPAN 的既有授权登记簿 `ASSET ACQUISITION - French Full Textbooks and Audio Rights Register` 日期为2026-10-16，属于**旧版状态快照**，不能拿它覆盖后来单独的本地ZIP校验结果。
- 浏览器 TTS 只能作为无授权音轨时的辅助朗读，不得被系统显示为“真人已验证配音”。
- `src/AudioCoverage.tsx` 已把“旧版练习 MP3 上传数量”“未映射公开参考音轨”和“正式验收”分开陈述；`tests/audioCoverage.test.tsx` 回归防止把已上传旧版音频或无关公开资源误算成现行课文配音。

## 4. 真实音轨—课程绑定验收顺序

先为每条音轨保留 `asset_id`、来源及许可、文件校验值、实际转写文本与音轨时长；核对它到底是“词汇词表、教材原版短文、旧版TTS”还是“扩展P1–P4全文”。只对实际匹配的 `course_id` / `paragraph_id` 建立映射，标清全文/词级覆盖范围，未匹配者保留 `course_id=NULL`。需要试听者本人勾选 `listened`、`text_matched`、`clarity_ok` 并写备注；未试听时不能强制变更 `audio_verified`。

## 5. 后续严谨审校与发布门禁

对未审查单元逐项复核：(1) 原文语义与逐段中文一致；(2) 语法/词汇循序渐进、音标准确；(3) 题目有真实段落证据和可解释答案；(4) 模型作文无凭空统计或版权借用；(5) 练习记录与云端稳定；(6) 音轨授权、逐段实际匹配、试听完毕。只有真实证据存在才批准对应审核状态；`CI green` 只说明技术测试通过。

**PR 状态：** 继续 Draft/Open，不合并主分支、不发布 stable。本次未进行任何生产音轨映射写入或批量审核状态更改。
