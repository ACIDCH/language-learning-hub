export type UpgradeExample=[string,string,string];
/** Two analysed examples for each of the three source-analysis chapters. */
export const UPGRADE_GRAMMAR_EXAMPLES:Record<string,UpgradeExample[]>={
 '01':[
 ['Students who arrived early found seats.','早到的学生找到了座位。','who 从句限定哪一部分学生，不说明其他人。'],
 ['Students who needed help attended a workshop.','需要帮助的那群学生参加了工作坊。','用于限定群体；若只知道其中一些参加，应另加 some of。'],
 ['The students, who arrived early, found seats.','这群学生早早到了，并找到了座位。','群体已经确定，逗号内补充共同情况。'],
 ['My tutor, who arrived early, opened the room.','我的导师早早到达，打开了房间。','补充既定导师的信息，不用于区分多位导师。'],
 ['Although the room was crowded, we found seats.','虽然房间拥挤，我们仍找到了座位。','让步例句新增拥挤条件，不是原稿已报告事实。'],
 ['Because we arrived early, we found seats.','因为早到，我们找到了座位。','因果练习句；关系从句本身不能证明这个原因。']],
 '02':[
 ['In 2020, the team collected travel diaries.','2020 年，团队收集了出行日记。','明确已结束时间与过去时 collected 相配。'],
 ['The diaries covered one working week.','日记覆盖一个工作周。','限定观察时间，不是全年出行记录。'],
 ['Since then, the team has expanded its questions.','此后，团队扩展了研究问题。','since then 连接过去到当前范围。'],
 ['The present report compares two designs.','本报告比较两种设计。','现在时说明当前文本的功能。'],
 ['The sample did not represent every commuter.','样本并不代表所有通勤者。','保留原稿的人群边界。'],
 ['A correct tense does not establish a reliable finding.','时态正确不能确立可靠的研究发现。','语法与方法证据是不同层面的检查。']],
 '03':[
 ['The team analysed the observations.','团队分析了观察记录。','analysed 为谓语动词。'],
 ['The analysis focused on completed tasks.','分析关注完成的任务。','analysis 为名词主语，不用 analyse 替代。'],
 ['The team conducted research into shared workspaces.','团队研究了共享工作空间。','conduct research 是自然搭配，一般 research 不可数。'],
 ['They carried out a study of workspace use.','他们开展了一项空间使用研究。','study 可数，使用 a study。'],
 ['An analytical approach requires clear categories.','分析性方法需要清楚的类别。','analytical 是形容词，修饰 approach。'],
 ['The findings raised a question about collaboration.','这些发现引出了协作方面的问题。','raise a question 不等于 solve a problem。']],
 '04':[
 ['Some respondents reported lower stress.','一些受访者报告压力较低。','some 不能换成 all workers。'],
 ['A portion of those surveyed linked flexibility to lower stress.','部分受访者把灵活性与较低压力联系起来。','保留受访人群及有限范围。'],
 ['Lower stress does not mean no stress.','压力较低不意味着没有压力。','比较程度与完全消除不同。'],
 ['An association does not establish causation.','关联不能确立因果。','两个名词表达不同证据关系。'],
 ['Flexible hours were linked to lower stress by some respondents.','部分受访者把弹性工时与较低压力联系起来。','被动结构保留了报告者。'],
 ['Some respondents associated flexible hours with lower stress.','一些受访者将弹性工时与较低压力关联。','主动结构与前句保持对象和关系。']],
 '05':[
 ['The lower error rate suggests a possible improvement.','较低错误率提示可能有改善。','suggests 不等于 proves。'],
 ['The participants also received more time.','参与者还获得了更多时间。','also 标记另一个变化因素。'],
 ['The improvement could reflect either change.','改善可能反映任一变化。','could 表认识上的可能，而非能力。'],
 ['We can favour the revision provisionally.','我们可以暂时倾向采用修订版。','暂时选择仍可随证据复查。'],
 ['Hold timing constant in a further comparison.','在后续比较中保持时间不变。','研究建议，不是已完成实验记录。'],
 ['The revision may help, but extra time offers another explanation.','修订可能有帮助，但额外时间提供了另一解释。','一个清楚限定比堆叠多个 perhaps 更有效。']],
 '06':[
 ['The team revised the form.','团队修订了表格。','保留施事、动作和对象，减少名词层次。'],
 ['Staff implemented the change.','工作人员实施了改变。','implemented 直接表达动作。'],
 ['This revision reduced the number of compulsory fields.','这次修订减少了必填项数量。','revision 回指前句动作，建立衔接。'],
 ['The change became the focus of the next discussion.','这项改变成为下一次讨论的焦点。','名词可把已知动作作为新话题；这是迁移例句。'],
 ['The form was revised by the team.','表格由团队修订。','被动版仍保留执行者，不必一律判错。'],
 ['Changes happened.','发生了变化。','不适合作等值改写，主体和具体对象均丢失。']],
 '07':[
 ['The planning team revised the proposal.','规划团队修订了提案。','明示执行者，避免代词多指。'],
 ['The council consulted residents after the planning team revised it.','规划团队修订提案后，委员会征询居民意见。','it 要有上文 proposal 作为清楚所指。'],
 ['This change addressed one concern.','这项改变回应了一项顾虑。','this change 回指更安静的通道，而非咨询本身。'],
 ['The road revision did not resolve maintenance funding.','道路修订没有解决养护资金问题。','效果范围有限，不扩大成所有问题解决。'],
 ['The funding question requires separate consideration.','资金问题需要单独考虑。','用于练习续写，不是原稿已经采取行动的记录。'],
 ['The addition of a quieter road addressed that concern.','加入更安静的道路回应了那项顾虑。','用具体名词短语替代可能含糊的 this。']],
 '08':[
 ['The number of visitors has increased.','访客数量增加了。','the number of 的中心词为单数 number。'],
 ['A number of visitors have arrived.','若干访客已经到达。','a number of 意为若干，采用复数一致。'],
 ['The number of applications has increased.','申请数量增加了。','迁移中心词识别，不受 applications 复数干扰。'],
 ['A number of applications have arrived.','若干申请已送达。','与前句对照，检验规则的适用条件。'],
 ['A formal synonym may change the meaning.','正式近义词可能改变意思。','风格选择必须检查语义与搭配。'],
 ['Correcting the verb does not verify the reported increase.','改对动词不会验证所报告的增长。','语法纠错不替代事实核查。']],
};
