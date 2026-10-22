import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const table=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['英文语块','中文对应','不能推断'],rows,note});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,t?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(t?{table:t}:{})});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';
export const IELTS_LISTENING_U07_U08_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-u07-dialogue-reference-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u07',
 title:'多说话者观点变化：局部同意、回指和最后方案',subtitle:'Maya 与 Leon 从五十次访谈协商为问卷加六名后续访谈',
 prerequisite:'熟悉 but / however / instead，能判断主语、建议与不同人的回答。',
 objective:'追踪 speaker→proposal→limitation→revision，辨认局部同意和代词回指，并区分最初建议与双方最后同意的方案。',
 sections:[
 sec('01 I agree, but 并非完全赞成','I agree that interviews provide detail 后接 but he doubts the deadline，意味着里昂赞同方法可以得到细节，却不接受“五十次访谈在截止前可完成”的可行性推断。考试笔记要拆成两列，分别写“认可哪一点”和“保留哪一点”。','I agree that X, but I doubt Y',[
 e('I agree that interviews can provide detail.','我同意访谈能提供细节。','同意方法的潜在价值。'),
 e('But fifty interviews may not be feasible before the deadline.','但截止前完成五十次访谈可能不可行。','限制在时间和规模。'),
 e('Leon does not reject interviewing altogether.','里昂没有完全反对访谈。','把局部意见误当全盘否定是不准确的。')
 ],'不能把 I agree, but 缩成“Leon agrees with Maya”或“Leon rejects interviews”；两者都丢失了范围。',
 table('人物—立场—范围',[['Maya proposes fifty interviews','玛雅初提五十次访谈','未定稿'],['Leon agrees interviews are detailed','里昂赞同细节价值','不表示接受人数'],['Leon doubts feasibility','里昂怀疑可行性','只涉及期限和规模'],['They agree on a mixed plan','两人同意混合方案','最终方案与最初不同']],'先保存“谁说了什么、针对什么”的说话者证据。')),
 sec('02 that / this approach 回指哪项建议','听力对话里 that、it、this approach 往往回指最近一项完整提议。不能只靠最近的名词认定所指；需要结合说话者当前回应。Leon suggests a questionnaire；Maya objects to fixed-choice answers，针对的是问卷的形式而不是访谈本身。','this approach refers to the questionnaire / that limitation',[
 e('Leon suggests a shorter questionnaire instead.','里昂改为建议使用短问卷。','instead 标记替代方案。'),
 e('Maya says fixed answers might miss unexpected reasons.','玛雅说固定选项可能遗漏意外原因。','限制指问卷设计。'),
 e('That limitation does not make interviews unnecessary.','这一限制并不表示访谈没有必要。','that 回指问卷的固定答案问题。')
 ],'若不记录当下说话者及提议对象，this approach 容易被误认成最初的五十次访谈。'),
 sec('03 eventually agree 表示最终协商结果','eventually / finally / they agree to 将对话从提议推进到暂定共识。最终方案是较广泛问卷加六名志愿者访谈；问卷对象的精确人数没有给出，不能将 six 误分配给问卷部分。','they eventually agree to + verb / survey + six interviews',[
 e('They eventually agree to survey a larger group.','他们最终同意先调查更广泛的群体。','l arger 未给人数。'),
 e('They will interview six volunteers afterwards.','之后将访谈六名志愿者。','six 仅修饰访谈对象。'),
 e('The interviews will explore issues raised by the survey.','访谈将追问问卷发现的问题。','用途不是机械重复问卷。')
 ],'50 指最初拟访谈人数，six 指最终拟访谈人数，larger group 不能无证据补成某个具体样本量。'),
 sec('04 would / might 与没有发生的研究','would provide、might miss 表示设想的价值或风险；will interview 描述打算实施的步骤。整段材料是讨论研究设计，不是研究已经进行并得出调查数据。词语强度必须保留。','might miss / would provide / not yet observed',[
 e('Fixed choices might miss unexpected reasons.','固定选项可能遗漏意料外的理由。','might 保留可能性。'),
 e('Interviews would provide more detail.','访谈有望提供更多细节。','讨论预计作用。'),
 e('No completed survey results are reported.','没有报告已完成的问卷结果。','计划不能冒充观察结果。')
 ],'不能把 might miss 改写成 always misses，也不能从方法讨论断言居民行为已经被证实。')
 ],
 questions:[
 {question:'Leon 完全反对访谈吗？请保留他的两个态度。',answer:'No. He values interview detail but doubts the feasibility of fifty before the deadline.',why:'他认可访谈细节，同时担忧时间约束下的工作量。'},
 {question:'Maya 所说 fixed answers 的限制针对什么？',answer:'A short questionnaire might miss unexpected travel reasons.',why:'她批评的是问卷固定选项，不是所有问卷都无价值。'},
 {question:'最终方案中“六名”对应什么？',answer:'Six volunteer follow-up interviews, not the questionnaire sample.',why:'必须按语法修饰关系和对话最后共识分配数字。'},
 {question:'What does eventually agree indicate?',answer:'The two speakers reach a revised joint proposal.',why:'标记协商完成，与任何一人的初始提议不同。'}
 ],
 output:'做四列观点发展笔记（Maya / Leon / limitation / final decision），然后写一段英文摘要，每句附中文，不编问卷人数。',
 model:[
 e('Maya initially proposed fifty interviews.','玛雅起初建议五十次访谈。','最初方案。'),
 e('Leon valued interviews but doubted the deadline.','里昂认可访谈，却担心截止期限。','部分赞同。'),
 e('He suggested a shorter questionnaire.','他提议改用短问卷。','替代方案。'),
 e('Maya argued that fixed answers might miss reasons.','玛雅认为固定选项可能遗漏原因。','局限。'),
 e('They agreed to survey a broader group first.','两人最终同意先做更广泛问卷。','最终共同方案。'),
 e('They would then interview six volunteers.','随后再访谈六名志愿者。','最终数量。'),
 e('The proposal combines breadth and limited depth.','方案结合覆盖广度与有限深入解释。','结论范围。')
 ],
 referenceUrls:[REF],sourceNote:'数字与顺序严格依照 en-ielts-listening-u07 原稿；讨论的是设计，尚无实测调查结果。'
},
{
 id:'en-u07-method-negotiation-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u07',
 title:'研究讨论词汇：proposal / feasible / recruit / revise',subtitle:'让“建议—限制—修改—折中方案”成为可用于讨论的语块',
 prerequisite:'已经理解 U07 两名研究生的不同提议和最终选择。',
 objective:'区别 propose、feasible、recruit、constraint、scope、revise、volunteer、follow-up interview，并在学术讨论中自然使用搭配。',
 sections:[
 sec('01 proposal 和 proposal revision','propose 是提出建议，revise 是在反馈后修订；两者不能同义替换。原稿先由 Maya 提议五十次访谈，随后经过讨论改成问卷加六次跟进访谈。','propose a plan / revise a proposal / reach agreement',[
 e('Maya proposes interviewing fifty residents.','玛雅提议访谈五十名居民。','初始动作。'),
 e('They revise the research proposal.','他们修订研究方案。','保留最初与最终的变化。'),
 e('They reach an agreement on a mixed design.','他们就混合研究设计达成一致。','最终共识。')
 ],'proposal 与 result 的区别很关键：研究计划尚未执行，不能将建议改写成已发现的规律。',
 table('协商词义',[['a proposal','一项提案','尚未实施'],['a constraint','一项约束条件','不等于彻底禁止'],['feasible','可行的','须考虑工作量和时间'],['revise the plan','修订方案','不是已经实施研究']],'学术讨论先确认行动处于什么阶段。')),
 sec('02 feasible 不等于 accurate','feasible 主要指资源、时间与工作量允许实施；accurate 是准确。里昂认为五十次访谈或许有研究价值，但 deadline 使其执行困难；这不是在断言访谈本身不准确。','a feasible design / meet a deadline / time constraints',[
 e('Fifty interviews may not be feasible before the deadline.','截止前完成五十次访谈可能不可行。','可行性约束。'),
 e('The interviews could still provide useful detail.','访谈仍可能提供有用细节。','研究价值与执行条件分离。'),
 e('A shorter questionnaire may be more manageable.','短问卷可能更容易安排。','方案权衡，而非质量保证。')
 ],'不能因为执行困难就推断受访者不诚实、访谈数据错误或某种方法永远低效。'),
 sec('03 recruit、survey、volunteer 的对象','recruit participants 指招募参与者，survey a group 指对群体进行问卷调查，volunteer interview 指志愿者访谈。记笔记需留意数量所修饰的名词，不是听到 six 就填在任何空格。','recruit residents / survey a group / interview volunteers',[
 e('The team needs to recruit participants.','团队需要招募参与者。','尚未说明已经招到。'),
 e('They plan to survey a larger group.','他们计划调查更广泛的人群。','群体规模未知。'),
 e('Six volunteers will be interviewed later.','之后计划访谈六位志愿者。','六人只对应后续访谈。')
 ],'larger group 没有具体人数；六名志愿者也不意味着随机抽样或足以代表全体。'),
 sec('04 breadth、depth 与 follow-up','breadth 表覆盖范围广，depth 表深入探索；follow-up interview 是根据第一阶段结果继续追问的访谈。设计上的互补不等于已经证明方法的统计有效性。','breadth of responses / depth of explanation / follow-up interview',[
 e('The questionnaire provides breadth.','问卷提供覆盖广度。','概括预期作用。'),
 e('Follow-up interviews may add depth.','后续访谈可能增加解释深度。','may 保留不确定性。'),
 e('The design has limitations.','这种研究设计仍存在局限。','不把折中方案当完美方案。')
 ],'两种方法相结合不自动消除选择偏差、样本有限性或因果识别问题。')
 ],
 questions:[
 {question:'recruit fifty residents 与 interview six volunteers 的对象和阶段相同吗？',answer:'No. They refer to different proposals and interview stages.',why:'前者对应最初五十次访谈的招募设想，后者对应最终计划。'},
 {question:'feasible 强调准确性还是实施可行性？',answer:'Feasibility under time and resource constraints.',why:'原稿讨论截止期限和工作量，不涉及测量准确率。'},
 {question:'为什么 follow-up interviews 不需重复全部问卷？',answer:'They explore selected issues raised by the survey.',why:'原文明确限制后续访谈用途是解释特定问题。'},
 {question:'breadth 和 depth 在最终方案中分别指什么？',answer:'Breadth from a broader questionnaire; limited depth from six interviews.',why:'两个词分别描述覆盖范围和有限的解释程度。'}
 ],
 output:'用七句英文描述方法选择与修订，至少准确使用 propose、feasible、recruit、revise、follow-up、breadth、depth，并逐句中文。',
 model:[
 e('Maya proposed interviews with fifty residents.','玛雅建议访谈五十位居民。','提案。'),
 e('Leon questioned whether this was feasible.','里昂质疑这种计划是否可行。','实施约束。'),
 e('The researchers need to recruit participants.','研究人员需要招募参与者。','程序。'),
 e('They revised their proposal.','他们修订了提案。','变更。'),
 e('A broader questionnaire will provide breadth.','更广泛的问卷将提供覆盖广度。','首阶段。'),
 e('Six follow-up interviews may provide depth.','六次后续访谈可能提供深入解释。','第二阶段。'),
 e('The method remains subject to limitations.','方法仍然存在限制。','谨慎总结。')
 ],
 referenceUrls:[REF],sourceNote:'词汇与协商事件均基于 en-ielts-listening-u07 既有原创讲义。'
},
{
 id:'en-u08-evidence-hedging-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u08',
 title:'长讲座的证据强度：may、depends on、rather than',subtitle:'认识感与真正回忆、纠错反馈、间隔和跨情境迁移',
 prerequisite:'掌握基础对比连接词，能够识别 may / can / must 表达不同确定性。',
 objective:'对讲座主旨进行谨慎概括，准确理解 may / depends on / although、rather than 和否定范围，不把教学举例当作实验结果。',
 sections:[
 sec('01 may 与“确定能提高成绩”不同','may support retention 是一种有条件的可能性表达。讲座没有给出试验或得分数值，因此不能改写成 definitely improves results。谨慎措辞并非作者没有观点，而是在保留结论适用边界。','may support / might help / does not prove',[
 e('Spacing may support retention.','间隔练习可能有助于保持记忆。','may 不等于一定。'),
 e('The useful interval depends on the learning goal.','有用的时间间隔取决于学习目标。','明确依赖条件。'),
 e('The script does not report an improvement rate.','脚本没有报告进步率。','禁止虚构数字。')
 ],'may improve 不能翻译成“已经提高”，教学示例也不能被当作经过验证的普遍效应。',
 table('限定词的证据边界',[['may support','可能有助于','非必然改善'],['depends on','取决于','没有统一条件'],['can be difficult','可能有困难','不能概括为永远不行'],['rather than','而不是','表示比较选择，不排除另一方法全部价值']],'区分作者的建议与实证观察。')),
 sec('02 even when 引出表象与能力的对照','feel easy even when one cannot explain 表示材料读起来熟悉，即便学习者脱离提示后解释不了。even when 强调同一个人可能同时存在熟悉感与解释困难，两者不矛盾。','familiar even when recall is weak / recognition versus explanation',[
 e('The passage feels easy even when recall is poor.','即使回忆不佳，段落读起来也可能容易。','even when 呈现并存反差。'),
 e('Recognising material is not the same as explaining it.','认得出材料与能解释材料不同。','两个指标边界。'),
 e('Rereading can still clarify an unclear point.','重读仍可能澄清不明白的地方。','并非全面否定重读。')
 ],'作者反对的是以熟悉感代替学习质量的单一指标，不是在说任何重读都无效。'),
 sec('03 rather than 连接推荐选择','rather than judge progress by rereading fluency 描述作者建议采用什么判断方式。结合全文，重点是 recall + feedback + varied use，而非单纯增加学习次数。保持 than 两侧对象的逻辑层级。','combine X, Y and Z rather than rely on W',[
 e('Use recall, feedback and varied practice.','结合回忆、反馈和多样化练习。','建议机制。'),
 e('Do not judge progress by rereading fluency alone.','不要仅凭重读流畅感判断进步。','alone 限定否定范围。'),
 e('Practise in contexts different from the original exercise.','在不同于原练习的情境中练习。','用于检验知识迁移。')
 ],'rather than rely only on rereading 不能省略 only，省略会把“不要只依赖”变成“完全不要重读”。'),
 sec('04 although 维护建议中的例外与限制','although the best interval depends on material and goals 让段落同时提出建议和限制；课堂演示只是说明流程，不代表单一时间表获得跨群体验证。摘要需保留这一限定，而不能摘取一句“spacing helps”后忽略例外。','may help, although ... / a demonstration rather than proof',[
 e('Spacing may help, although the best interval varies.','间隔可能有帮助，但最佳间隔会变化。','正面作用与限定并存。'),
 e('A classroom demonstration illustrates a routine.','课堂示例展示一套流程。','展示不等于验证。'),
 e('No universal schedule is established in the text.','课文没有确立普遍适用的时间表。','不猜测天数。')
 ],'只有计划、示范和主张的课文不能升格为证明所有学习者有效的临床或教育实验。')
 ],
 questions:[
 {question:'may support retention 的强度相当于 always improves retention 吗？',answer:'No. It expresses a possibility, not a guaranteed effect.',why:'may 明确保留不确定性，原稿没有提供实测百分比。'},
 {question:'rather than rely on rereading alone 是否否定重读的所有用途？',answer:'No. It discourages exclusive reliance, not useful clarification.',why:'alone 限制否定范围，作者承认重新查看材料可以澄清难点。'},
 {question:'why does the best interval depend on the material and goal?',answer:'Different learning tasks can require different practice schedules.',why:'讲座拒绝统一间隔，需同时保留材料和目标两个条件。'},
 {question:'课堂范例能否证明适用于所有人的间隔时间？',answer:'No. An illustration is not universal experimental validation.',why:'说明一种方法如何做与通过独立证据证明普遍有效是不同事实。'}
 ],
 output:'写一个 120–150 词的英文讲座摘要，必须正确使用 may、depends on、although、rather than，附中文，不造数字。',
 model:[
 e('Familiarity does not guarantee independent understanding.','熟悉感不保证独立理解。','主旨。'),
 e('Retrieval practice tests whether learners can recall an idea.','提取练习检查学习者能否回忆观点。','机制。'),
 e('Learners should check their answers and correct errors.','学习者应核对答案并纠错。','反馈。'),
 e('Spacing may help, although the best interval varies.','间隔可能有帮助，但最佳间隔有所不同。','限定。'),
 e('The timing depends on the material and goal.','时间安排取决于材料和目标。','条件。'),
 e('Knowledge should be used in varied contexts.','知识还应运用于不同情境。','迁移。'),
 e('The speaker recommends this combination rather than judging progress by smooth rereading alone.','讲者建议综合这些做法，而不是只凭重读流畅感判断进步。','整体结论。')
 ],
 referenceUrls:[REF],sourceNote:'校核 en-ielts-listening-u08 原稿中的谨慎限定，不引入未报告的教育实验数据。'
},
{
 id:'en-u08-memory-synthesis-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u08',
 title:'学术学习词汇：retrieval / retention / spacing / transfer',subtitle:'将认识、回忆、纠错、保持与迁移连接为完整论证链',
 prerequisite:'已完成本课的主旨理解和谨慎限定语法。',
 objective:'区分 exposure、familiarity、retrieval、feedback、retention、spacing、transfer；能正确解释各词在讲座中的功能与限制。',
 sections:[
 sec('01 exposure 与 familiarity 只是输入与感受','exposure 是接触材料，familiarity 是熟悉感；二者不能直接证明 independent recall。第一段讨论重读时的流畅，并明确不要以此代表灵活学习能力。','repeated exposure / feel familiar / recall without prompts',[
 e('Repeated exposure can make a passage familiar.','反复接触会使段落变熟悉。','输入次数与主观感受。'),
 e('Familiarity is not proof of independent recall.','熟悉感不是独立回忆能力的证明。','不能以感受代替能力。'),
 e('Learners may struggle without prompts.','没有提示时学习者仍可能难以作答。','条件限制。')
 ],'recognise 认出不等于 recall 回忆；题目问未看原文能否解释时，不能以阅读流畅作答。',
 table('学习证据四层',[['exposure','接触材料','仅有输入'],['familiarity','熟悉感','不等于理解'],['retrieval','主动提取','检验离开提示能否想起'],['transfer','迁移运用','检验新情境中的使用']],'按从接触到迁移的层次整理，而不是把四者译作“复习”。')),
 sec('02 retrieval 需要 feedback','retrieval practice 是先凭记忆作答、再检查原文；feedback 包括找出遗漏和纠正错误。只记得答案的感觉不够，若错误没有被纠正，后续练习可能重复同样的误解。','retrieve from memory / check the source / correct errors',[
 e('Close the notes and retrieve the answer.','合上笔记，凭记忆提取答案。','先产出。'),
 e('Reopen the source and check the explanation.','重新打开原文并核对解释。','再核对。'),
 e('Feedback helps identify mistakes.','反馈帮助发现错误。','不保证每次练习都完全正确。')
 ],'retrieval 不是无反馈重复默写；原讲座强调 check mistakes，因此核对是学习闭环的一部分。'),
 sec('03 spacing 与 retention 相关但非定律','spacing 是把练习分散在不同时间；retention 是对信息的保持。讲座只表示分散练习可能有帮助，合适间隔受内容和目标影响，没有统一天数或提升率。','space attempts across days / support retention / the best interval varies',[
 e('We space retrieval attempts across several days.','我们把提取练习分散到几天内。','举例，不是必须固定几天。'),
 e('Spacing may support retention.','间隔练习可能帮助保持记忆。','可能性表述。'),
 e('A suitable interval depends on the goal.','合适的间隔取决于目标。','不普遍指定。')
 ],'绝不能凭 across several days 推导必须恰好相隔三天，也不能生成没有来源的记忆提升百分比。'),
 sec('04 transfer 检验语境变化后是否能用','transfer 指知识迁移到新的应用场景，而不是重复同一套提示。varied practice 表多样化使用，context 是具体情境。讲座最终建议 recall、feedback 与 varied use 结合。','apply knowledge in new contexts / varied use / flexible learning',[
 e('Apply the concept in a different context.','把概念用于不同的情境。','知识迁移。'),
 e('Varied practice tests flexible use.','多样化练习检验灵活应用。','不同于原题重复。'),
 e('The lecture recommends recall, feedback and transfer together.','讲座建议同时结合回忆、反馈和迁移。','综合结论。')
 ],'做很多道几乎一样的题不必然等于 transfer；需验证在情境变化后概念是否仍准确。')
 ],
 questions:[
 {question:'retrieval 与 exposure 哪个要求不看原稿主动产出答案？',answer:'Retrieval practice.',why:'exposure 是接触，retrieval 需要从记忆中产出。'},
 {question:'feedback 在此讲座中的重要动作是什么？',answer:'Check the recalled answer against the source and correct mistakes.',why:'核对错误防止把自信却错误的答案当作已掌握。'},
 {question:'spacing 一定对应统一的间隔天数吗？',answer:'No. The interval depends on the subject and the goal.',why:'原稿没有普遍适用的时间表。'},
 {question:'transfer 是否只指重复原练习？',answer:'No. It requires applying knowledge in different contexts.',why:'迁移强调情境变化，不能只重复原题。'}
 ],
 output:'写七到十句英文，按 exposure→familiarity→retrieval→feedback→spacing→transfer 的顺序说明学习循环，逐句配中文。',
 model:[
 e('Repeated exposure makes the material familiar.','反复接触使材料熟悉。','起点。'),
 e('Familiarity alone does not show recall.','仅有熟悉感不能证明能回忆。','限制。'),
 e('Retrieval requires an answer from memory.','提取需要凭记忆作答。','主动产出。'),
 e('Feedback checks and corrects mistakes.','反馈帮助核对与纠错。','闭环。'),
 e('Spacing may support retention.','间隔练习可能有助于记忆保持。','有条件。'),
 e('The useful interval depends on the learning goal.','有用的间隔取决于学习目标。','限定。'),
 e('Transfer means using knowledge in new contexts.','迁移意味着在新情境中运用知识。','目标。'),
 e('A good summary retains all these distinctions.','好的摘要保留这些差异。','核对语义。')
 ],
 referenceUrls:[REF],sourceNote:'来源为现有 en-ielts-listening-u08 原创教材，绝不伪装实验性数据。'
}
];