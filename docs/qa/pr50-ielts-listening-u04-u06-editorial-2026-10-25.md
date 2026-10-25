# PR #50｜IELTS Listening U04–U06 定向中英语义校勘（2026-10-25）

本轮是**作者级、源文对照的局部语义纠错**，不是三节课全部内容通过独立教师审核。原始课程 ID、英文阅读、答案、音频资产、账号及数据表均未修改。

| 课程 / 位置 | 英文证据 | 发现的中文风险 | 修复和理由 | 回归 |
| --- | --- | --- | --- | --- |
| en-ielts-listening-u04 / P1 | “the entrance used by visitors today” | 旧译“今天访客都从这里入园”将入口用途扩展为“所有访客”这一未经原句确认的全称命题 | 改为“这是今天供访客入园的入口”；保留南门、左侧办公室和对面池塘的原有方位关系 | `tests/sourceReception.test.ts` |
| en-ielts-listening-u05 / P3 | “pay a deposit of thirty pounds by Friday” | “周五前”容易被理解为不包含周五当天，改变付款期限 | 改为“最迟在周五当天缴纳”；同时保留 **£30 是订金而非总价** | 同上 |
| en-ielts-listening-u05 / P4、modelZh | “A thirty-pound deposit is due by Friday” | 小结和示范仍沿用同样有歧义的期限，形成跨段误学 | 统一改为“最迟须在周五支付”，日期不是被提前到周四 | 同上 |
| en-ielts-listening-u06 / languageNotes | “measurement method as well as the result”; “If the result has not yet been measured, students should not fabricate a value” | 旧说明“两栏都必填”可能诱发学习者为未测结果编造数字 | 要求保留结果字段、标记“待测”，不填写虚构结果；与 P4 的条件要求保持一致 | 同上 |

**教材范围与证据界限**

- 英文正文和题目均未改写；修改集中于四处中文语义单元（U04 一处，U05 三处，U06 一处语法／词汇注释，其中 U05 的同句同时出现在示范中文）。变更的是三节课的局部解释，**不是三节课完整审核通过**。
- `docs/qa/curriculum-gap-matrix.json` 中 U04 P1、U05 P3/P4 的 `chineseSha256` 已随实际译文更新；课程 `semanticQAApproved`、`audioVerified` 和 `publishable` 仍为 **0**，并未提高门禁。
- `tests/sourceReception.test.ts` 添加英语源限定、`by Friday` 中文期限、样品待测值的回归断言。该测试已在现有 `vitest.v44.config.ts` 的 include 列表中。
- 尚未逐句审完 Listening U01–U08 的全部 P1–P4；未覆盖 Reading、Task 1/2 和 327 专题的完整教师审校。此处没有经过真人音轨试听，不能声明音频验收。
- 改动后 GitHub Actions 的**新 HEAD** 实际结论应以 Checks 为准，不能引用上一 HEAD 的 8/8 通过作为新提交的验收结果。

**下一步接续点：** 优先按相同方式对 Listening U01–U08 剩余段落和 Reading U01–U08 逐段检查数字、条件、对照中文、问题答案与源证据；再进入 Writing Task 1/2 的可视数字单位和范文字数。逐项记录真实缺陷，不因为此次几个修补提高 156 课人工批准数。


## 同轮追加：IELTS Writing Task 1 U05 / U07

| 课程 / 位置 | 原文依据 | 修复前的教学风险 | 精确改动 |
| --- | --- | --- | --- |
| en-ielts-writing-task1-u07 / P3 | 仅提供两组借阅**份额**，没有借阅总次数 | 示例英文 “Paper borrowing declined, while digital borrowing increased” 及中译会将**占比变化**误导成**借阅绝对量变化**，与本课 P1/P4 的数据局限相矛盾 | 英文改为 “The paper-borrowing share declined, while the digital-borrowing share increased”；中译改成“纸本借阅占比下降，而数字借阅占比上升”；不修改原始统计数据 |
| en-ielts-writing-task1-u05 / P3 | 原始废纸处理流程将 pressing（压出水分）与 drying（干燥）分开 | 六阶段概述中的“压干”把两个处理动作混成一个词，不利于 Task 1 工序顺序训练 | 改为“压出水分并干燥”，保留完整六阶段分组，最终步骤仍为“裁切再利用” |

- 同步更新了矩阵中 U07 P3 的英文、中文哈希，以及 U05 P3 的中文哈希；所有正式验收批准数不变。
- `tests/sourceReception.test.ts` 新增 U07 份额≠借阅总次数以及 U05 压水、干燥的证据检查。
- 本轮共涉及 **5 个课程 ID**（Listening 3 + Writing Task 1 2）；这是对指定事实点的作者级纠错，不是五节课程的完整教师审校。
