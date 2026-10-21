# 法语语法学习资料复核与课程修订（2026-10-21）

## 文献与使用边界

用户提供的链接里，Gymglish 与 GrammarMama 原本被粘贴成一个连续的 URL。研究时分开核对：
- Frantastique / Gymglish：https://www.gymglish.com/zh/frantastique/french-grammar
- GrammarMama：https://grammarmama.com/zh/learn/french/
- Scribd：https://www.scribd.com/document/769277033/法语语法结构表完整

这些站点**只用于知识覆盖与具体语法规则的交叉核验**。代码中的解释、例句、表格、习题是本项目新编写的内容。并未搬运第三方教材原文，也没有声称外部课程与项目课程获得联合认证。

## 核实结论及实际采纳

| 参考资料 | 核实到的实际能力 / 内容 | 采用范围与限制 |
|---|---|---|
| Gymglish / Frantastique | 按具体知识点提供细粒度速查；有 -er/-ir 现在时、疑问句形式、冠词与例外 | 按单一语言现象分节，针对句法条件设计对照，而非把全部主题堆在同一个 A1 页面 |
| GrammarMama A1 | 26 个主题，含人称、être/avoir、冠词、-er/-ir/-re、形容词配合、问句、近将来、命令式 | 借鉴从主语/词形到简单句的顺序。其 26 条**不是**本项目已拥有的独立章节数 |
| GrammarMama A2 | 30 个主题，含复合过去时、未完成过去时、直接/间接宾语代词、数量、比较、关系代词等 | 作为后续课程矩阵的参考，不能在 A1 章节直接灌入所有高阶规则 |
| Scribd 40 页结构表 | 可见动词时态列表、变位表、代词与介词总览 | **仅用作分类结构参考，不作为权威答案来源**。可读页中出现 ils avont、若干错列的变位及无关英语语法复习，不能直接复制 |
| UT Austin Tex's French Grammar | -er 规则现在时的六人称词尾，区分常规变位和例外；定冠词和名词等规则 | 以其具体语法章节核查形式准确性并重新撰写中文说明 |

## 当前改进对应代码

1. 第一组 -er 动词：完整六人称变位表，原形→词干→词尾，j’ 省音，时间与频率副词，代词式动词与否定，-ger/-cer 等拼写差异；已有匹配 fr-a1-u05。
2. 疑问句：语调、est-ce que、倒装、疑问词、combien de、quel/quelle，例句与答案；匹配 fr-a1-u06。
3. 形容词：性数表、名词语法性别、前后位置、être 表语与房间描述，例句与答案；匹配 fr-a1-u10。
4. 原冠词及学术英语样板：删去统一且与知识点不对应的模板式“易错提示”，替换为每章不同的实际语法/语义混淆。
5. 前端：删除重复的开场白、审核/同步状态类废话；主内容采用紧凑标题与宽屏教材结构，右侧只保留当前章节速查、错误对比、隐藏中文与朗读。

## 继续扩展时不应混淆的数目

- 历史交接基线：22 节独立专题（语法 11、词汇 11）。
- 本轮新增两节法语 A1 语法专题：**24 节独立专题（语法 13、词汇 11）**。
- 总目录另有 156 个规划单元。这是**课程目录**而非 156 份经过语言审校的独立教材。
- 原私人教材未在本轮重新逐页打开；来源核对声明不得超过真实已获取内容。

## 官方语言核对入口

- Tex -er：https://www.laits.utexas.edu/tex/gr/ver1.html
- Gymglish 规则 -er/-ir：https://www.gymglish.com/zh/frantastique/french-grammar/er-ir
- Gymglish 疑问句：https://www.gymglish.com/zh/frantastique/french-grammar/poser-une-question
- Gymglish 疑问词：https://www.gymglish.com/zh/frantastique/french-grammar/les-mots-interrogatifs
- GrammarMama A1：https://grammarmama.com/zh/learn/french/a1/
- GrammarMama A2：https://grammarmama.com/zh/learn/french/a2/

待后续完成的质量工作包括：其它法语知识点的独立章节补全、更多课程关联、全部语法例句的专业人工审校和真实账户笔记/练习持久化。此文件记录核查及实际代码范围，不应展示在学生教材主阅读区。
