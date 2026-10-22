# Language Learning Hub｜第 4 波教材增补及验收边界

日期：2026-10-22｜开发分支 feat/v44-full-ui-curriculum-one-shot｜PR #50
代码基线：36043a7bb553b20eb804af3411cc2ef475aaa7ef。

## 本轮真实实现

- 法语 fr-a1-u12：保留女性叙述者、弟弟、昨天参观博物馆、花园拍照、十二点午餐、遇见旧友、五点回家及今天看照片等原稿情节。新增语法 fr-a1-first-past-grammar、词汇 fr-a1-yesterday-journey-lexicon，均为四章完整教材、结构表、双语例句、练习解析和连续范文；区分 avoir+visiter/prendre/déjeuner 及 être+aller/rentrer，正确处理 allée、rentrés 与否定助动词位置。
- IELTS Reading en-ielts-reading-u04：保留三家图书馆在 2024 年开展阅读俱乐部的原稿设定。新增 en-ielts-tfng-scope-grammar-u04，与已有 en-reading-evidence-lexicon 配套。重点区分 TRUE、FALSE、NOT GIVEN，不把“两家晚间活动”扩写为“三家”，不把“部分参与者”扩大到全体，不编造经费和运营成本。
- 两篇新增四段双语阅读位于 src/receptionLessons.ts，逐段中文、四题带段落 ID 的答案解析、语言重点及中外文摘要完整。它们属于项目原创，不是官方 IELTS 真题或独立人工认证的正式教材。
- 累计 156 规划单元不变，75 节独立语法/词汇专题（语法 40 / 词汇 35），44 门课程至少关联一个专题，13 门课程具备完整分段双语听读。数量仅说明源码覆盖，不表示正式审校全部完成。
- 不更改已授权草稿的正式发布状态，不合并 main、不替换个人原始教材、不新增独立发音模块和无关按钮。

## 主要外部校验参考

1. Tex French Grammar avoir passé composé：https://www.laits.utexas.edu/tex/gr/tap2.html
2. Tex French Grammar être passé composé：https://www.laits.utexas.edu/tex/gr/tap3.html
3. IELTS Academic Reading 官方 T/F/NG 判定：https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading
4. IELTS 官方样题入口：https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test

## 自动验收与尚未完成

- tests/specialtyLibrary.test.tsx：75 ID 唯一、三节新专题的章节/表格/练习及主课程映射，过去时变形和 T/F/NG 答案正确。
- tests/curriculumAcceptance.test.tsx：两门阅读的四段中外文、四道对应证据题、完整范文、原有 missing_audio 状态。
- scripts/browser-visual-smoke.mjs：三个新专题 URL 与两个主课入口，在多个视口检查章节与听读证据题、无水平溢出。以当前 SHA GitHub Actions 实际结果为准，绝不提前声称 CI 全绿。
- 本批没有真实个人账号二次登录，所以不能声称已验证跨设备或跨会话 Supabase 恢复；自然音轨的许可/解码/逐段时间戳尚未完成，TTS 仍是回退。
- 其他课程的逐句独立语言审校和已覆盖教材最终批准仍保持 pending；下一批优先 IELTS Reading U05/U06 的同义改写、作者态度及相应完整阅读与中文。
