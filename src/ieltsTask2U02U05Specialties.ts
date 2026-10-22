import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const ex=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,rows?:string[][]):LearningSection=>({
 title,concept,pattern,examples,caution,...(rows?{table:{title:'本课语义与证据核对表',columns:['英文概念／观点','准确中文','判断边界'],rows,note:'全部范例为本项目原创教学假设，不是已验证研究发现。'} as LearningTable}:{})
});
const q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK2_U02_U05_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-u02-reasoning-chain-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u02',
 title:'议论文解释链：主张、机制、假设例子和边界',subtitle:'Claim → mechanism → hypothetical example → qualification',
 prerequisite:'能区分主句、because 从句和举例句，了解例子不等于研究证据。',
 objective:'将公共空间与邻里交流的观点写成可追踪的解释链，辨认循环论证及把虚构庭院误当实测结果的错误。',
 sections:[
 sec('01 理由必须说明如何发生','主张 accessible public spaces can support neighbour contact 并不能靠“because they are beneficial”证明。mechanism 必须说明共同空间让居民停留并产生交谈机会，清楚连接环境与可能结果。','claim → because + specific mechanism',[
 ex('Shared spaces may create opportunities for neighbours to meet.','公共共享空间可能创造邻里相遇的机会。','这是有条件的主张，不是统计结论。'),
 ex('Seating gives people a reason to remain nearby rather than walk past.','座椅使人们有理由停留，而不是只是经过。','具体行为机制是停留增加。'),
 ex('This additional time could allow informal conversations to begin.','额外的停留时间可能使非正式交谈开始。','说明接触机会如何转化为交流。')
 ],'“公共空间重要，因为它们很重要”只重复判断，没有解释行为路径。',[
 ['Claim: accessible public spaces','主张：易使用的公共空间有益','尚未证明适用于所有人'],
 ['Mechanism: people linger','机制：更多机会停留','须说明与交流的关系'],
 ['Example: hypothetical courtyard','例子：假设有座椅的庭院','不是已观察数据'],
 ['Qualification: maintenance matters','限制：维护与设计条件','不能保证所有场所奏效']
 ]),
 sec('02 because 与 therefore 各自承担证据关系','because 提供原因或解释路径；therefore 适用于前文已足以支持的推论。若从“设有座椅”直接跳到“社区信任一定增加”，中间缺少接触、谈话和后续关系的论证。','X may happen because Y enables Z / Y may lead to Z, provided that...',[
 ex('Residents might stop because seating is available.','居民可能因为有座椅而停留。','原因与行为之间有具体联系。'),
 ex('More time in the same place may permit brief exchanges.','在同一个地方停留更久可能促成短暂交流。','使用 may 避免把机制说成必然。'),
 ex('It does not follow that every visit builds trust.','但不能由此得出每次到访都会建立信任。','指出推理的外推限度。')
 ],'therefore 不能修复缺失的中间推理，连接副词不等于逻辑证据。'),
 sec('03 假设例子要标明 hypothetical','自编庭院里孩子玩耍、照护者交谈的情境可以用 for example, imagine... 呈现。它说明机制如何可能运作，不能写 research shows 或 a survey found；后者假装存在实际调查。','For example, imagine a courtyard... / in this hypothetical case...',[
 ex('Imagine a courtyard with benches beside a play area.','设想一个游乐区旁设有长椅的庭院。','明确是想象例子。'),
 ex('Carers might converse while children play nearby.','孩子在旁边玩耍时，照护者可能交谈。','示例解释接触场景。'),
 ex('This illustration is not evidence that every courtyard succeeds.','这个示例不能证明所有庭院都有效。','假设例子不冒充经验研究。')
 ],'不能使用“研究表明”引出完全自编的庭院，也不能把假设情境当成普遍因果证明。'),
 sec('04 qualification 不是撤销主张','指出维护不良或设计排斥会妨碍交流，是限定结论成立条件，并非取消全部论点。可用 provided that、unless 和 may fail where 将条件放在推论之后。','This benefit may depend on ... / where maintenance is poor, ...',[
 ex('The potential benefit depends partly on maintenance.','潜在收益部分取决于维护情况。','提出条件而非绝对否定。'),
 ex('An unwelcoming design may discourage people from staying.','不友好的设计可能使人们不愿停留。','为机制列出反向影响。'),
 ex('The argument is strongest when it acknowledges such limits.','承认这类限制能使论点更有说服力。','把判断范围与理由相配。')
 ],'qualification 必须与当前机制相关，不能突然添加无关的政治或经济争议。')
 ],
 questions:[
 q('Which sentence adds a mechanism rather than restating the claim?','Seating gives people a reason to remain nearby rather than pass straight through.','该句通过停留机会连接公共空间与邻里交流，而不是重复“空间重要”。'),
 q('Can the imaginary courtyard be described as observed research?','No. It is an explicitly hypothetical illustration.','源稿将庭院设为自编示例，没有调查样本、研究设计或实测结果。'),
 q('What might prevent the potential social benefit?','Poor maintenance or an unwelcoming design may discourage people from staying.','该条件恰好作用于论证中的停留与交流机制，并非无关免责声明。'),
 q('Is “spaces matter because they matter” an adequate explanation?','No. It is circular and gives no causal or behavioural mechanism.','同义重复并未说明共享空间如何改变人们的行为或交往机会。')
 ],
 output:'写一个约120词的 claim→mechanism→hypothetical example→qualification 英文段落并逐句中文，随后写不少于250词的完整 Task 2 模拟议论文。',
 model:[
 ex('Accessible shared spaces may help neighbours communicate more easily.','便利的共享空间可能帮助邻里更容易交流。','主张保持可能性。'),
 ex('Such places allow people to stay close to one another without arranging formal meetings.','这些场所让人们无需正式约见也能在附近停留。','提出机制。'),
 ex('Benches and sheltered areas may encourage visitors to remain longer.','长椅和遮蔽处可能使访客停留更久。','机制具体化。'),
 ex('For example, imagine carers waiting beside a small play area.','例如设想照护者在小型游乐区旁等候。','假设例子标识。'),
 ex('They might begin conversations while children play.','孩子玩耍时，他们可能开始交谈。','展示行为途径。'),
 ex('That imagined exchange does not establish a measured social effect.','这一设想交流并不构成实测的社会效果。','证据边界。'),
 ex('Maintenance and accessibility can determine whether people use the space.','维护与可达性会影响人们是否使用空间。','加入条件。'),
 ex('The claim is therefore plausible but not universal.','因此该主张有合理性，却不能一概而论。','审慎结论。')
 ],referenceUrls:[REF],sourceNote:'准确使用 U02 原创公共空间与假设庭院源稿，不制造实证研究。'
},
{
 id:'en-task2-u03-fair-rebuttal-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u03',
 title:'反驳词汇：concede、consistency、capture、complement',subtitle:'不稻草人化：先承认标准化考试的可比性，再限定其测量范围',
 prerequisite:'了解 although、however、whereas 与原课程论证/反驳段。',
 objective:'区分 concede 与 agree entirely、consistent marking 与 comprehensive assessment、complement 与 abolish。',
 sections:[
 sec('01 concede 是承认有效的一部分','concede 不是投降，而是承认对方有强理由：共同考试任务使不同学校申请人更容易按同一标准比较。评价这项优势后，再指出它与能力测量全面性是不同问题。','concede a genuine advantage / acknowledge the value of common tasks',[
 ex('It is reasonable to concede the value of common tests.','承认统一考试的价值是合理的。','保留对方最强论据。'),
 ex('Shared tasks can make comparisons more consistent.','共同任务能够提高比较的一致性。','不夸大为完全公平。'),
 ex('This advantage does not settle the whole assessment question.','这一优势无法解决全部评价问题。','从让步转向争议点。')
 ],'不应把“考试有比较优势”歪曲为“对方认为考试可以评价一切”。',[
 ['concede','承认有根据的部分','不等于完全同意'],
 ['consistency','评分或比较的一致性','不等于覆盖所有能力'],
 ['capture an ability','测量或体现某项能力','需明确测量范围'],
 ['complement','补充既有方式','不等于 abolish']
 ]),
 sec('02 consistent 不等于 complete','consistent 描述评分或比较做法较一致；complete / comprehensive 指覆盖范围充分。一个工具可能使评分一致，却不能充分观察合作能力、修订过程和长期探究。','consistent comparison ≠ comprehensive evidence',[
 ex('A test may be scored consistently.','考试可能获得一致的评分。','讨论评分特征。'),
 ex('It may still fail to capture sustained inquiry.','但它仍可能无法测量持续探究能力。','讨论能力覆盖范围。'),
 ex('These two evaluations need different evidence.','这两个判断需要不同证据。','不混淆一致与全面。')
 ],'不能把 reliably scored 直接推导为 accurately measures every relevant competence。'),
 sec('03 complement 与 replace 指向不同政策','complement 指额外加入能覆盖盲点的评价；replace 是完全取代；abolish 则要求取消。在本课源文中结论明确是补充任务，而非废除所有考试。','complement tests with assessed projects / not abolish all tests',[
 ex('Projects could complement standardised examinations.','项目任务可以补充标准化考试。','并用而非互斥。'),
 ex('Collaborative tasks may reveal skills tests overlook.','合作任务可能展示考试忽略的能力。','解释为何补充。'),
 ex('This does not require abolishing formal tests.','这不意味着必须废除正式考试。','明确结论范围。')
 ],'不能把作者支持 complementary evidence 误写成作者要求彻底取消考试。'),
 sec('04 rebuttal 的动词必须准确指向薄弱环节','反驳可以 challenge a claim、question its scope、limit a conclusion，不能简单 label it absurd。准确表达对方观点后，提出可执行的额外项目并说明可补哪些能力。','challenge the inference / limit the conclusion / add evidence',[
 ex('The rebuttal challenges the scope of the conclusion.','反驳针对的是结论适用范围。','不否认考试所有作用。'),
 ex('It questions whether common tasks measure every skill.','它质疑共同任务能否衡量所有能力。','明确争议命题。'),
 ex('A combined approach addresses this specific concern.','组合评价方式回应了这一具体问题。','方案与问题相连。')
 ],'不使用 all、never、only 等绝对词来捏造对方没有提出的极端主张。')
 ],
 questions:[
 q('What does the writer concede about standardised tests?','They allow more consistent comparisons through common tasks.','源文首先承认共同任务的一致比较价值，这是被认可的对方理由。'),
 q('Does consistent scoring imply measuring every ability?','No. Collaboration, revision and sustained inquiry can require other evidence.','比较一致性与能力覆盖范围是两个不同的评价维度。'),
 q('Does the rebuttal advocate abolishing tests?','No. It advocates complementing them with carefully designed additional tasks.','源稿明确主张补充证据而不是一概废除考试。'),
 q('What is a fair rebuttal aimed at?','The inference that consistent comparisons alone capture every relevant ability.','反驳针对推论过度延伸，而非改写或嘲讽对方观点。')
 ],
 output:'对标准化考试观点写一段先让步后限定的英文反驳并中译；另写至少250词完整议论文，结论保持“补充而非废除”。',
 model:[
 ex('Common tests can offer consistent comparisons.','统一考试可提供更一致的比较。','公允引入对方理由。'),
 ex('That is a genuine benefit when applicants come from different schools.','申请人来自不同学校时，这是一个真实优势。','限定情境。'),
 ex('However, scoring consistency does not guarantee broad coverage.','然而评分一致不保证测量范围全面。','找出逻辑差别。'),
 ex('Some abilities require evidence accumulated over time.','有些能力需要长期积累的证据。','争议点。'),
 ex('Collaborative work and revision are possible examples.','合作与修订能力是可能的例子。','具体补充领域。'),
 ex('The answer is not necessarily to abolish common tests.','解决方式未必是废除统一考试。','不歪曲为极端立场。'),
 ex('Schools could complement tests with carefully assessed tasks.','学校可以用经过审慎设计的任务补充考试。','提出替代方案。'),
 ex('This response preserves comparability while broadening evidence.','这种回应保留可比性，同时拓宽评价证据。','回扣强论点。')
 ],referenceUrls:[REF],sourceNote:'忠实延展 Task2 U03 对统一考试公平反驳的原稿；维持原有语法专题 en-task2-contrast-cohesion 不变。'
},
{
 id:'en-task2-u04-discussion-stance-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u04',
 title:'Discuss both views：充分解释双方与明确有条件立场',subtitle:'职业训练与广博教育的共同目标及不同路径',
 prerequisite:'已学习原因与反驳，能识别 university programmes、vocational、transferable reasoning。',
 objective:'使用 one view holds that、by contrast、while、I would therefore 支撑双方立场和自己的评价标准，不用“双方都对”替代结论。',
 sections:[
 sec('01 讨论双观点不能只列名称','题目涉及大学是否更优先职业训练还是广泛教育。解释职业观点时要说课程如何帮助学生走向就业，解释广博观点时要说专业技能可能过时、迁移能力如何应对新问题。','One view holds that... because... / Another view emphasises... since...',[
 ex('One view prioritises vocational preparation because graduates need usable skills.','一种观点优先职业准备，因为毕业生需要可应用的技能。','解释为什么，而非只说支持实践。'),
 ex('Another view values broad education because particular skills can become outdated.','另一种观点重视广博教育，因为特定技能可能过时。','另一方也有完整理由。'),
 ex('Both positions are concerned with students’ futures.','双方都关心学生的未来。','指出共同目的不代表相同方案。')
 ],'不能一段充分论证职业课程、另一段仅写“有人喜欢理论”，这样没有真正讨论双方观点。',[
 ['Vocational view','就业技能与专业责任','需要解释直接实操的理由'],
 ['Broad education view','迁移性的推理与学习能力','需要解释长期适应'],
 ['Shared concern','学生未来发展','不是两方一致的手段'],
 ['Writer’s position','按课程性质结合两者','没有固定万能百分比']
 ]),
 sec('02 while 对照不等于一方完全错误','while、whereas 可以对照优先事项；although 可以承认不同课程需求。要明确有直接专业责任的课程可需要更多实践，但所有学生都需要对陌生证据进行判断。','while some programmes require..., all students benefit from...',[
 ex('Professional courses may require substantial supervised practice.','专业课程可能需要较多受监督的实践。','限定到具有直接专业责任的项目。'),
 ex('Broad reasoning skills remain useful across disciplines.','广泛的推理能力在不同学科都有用。','不能将广博教育定义为纯理论。'),
 ex('The priorities differ, while their educational goals overlap.','优先事项不同，但教育目标有重合。','对照两边的作用。')
 ],'不能把 broad education 错说成 completely unrelated subjects，也不能推断所有专业需要相同实践比例。'),
 sec('03 my view 需要判准而非空泛折中','明确个人观点应回答哪一种培养体系更适合。原稿立场是将专业实践和可迁移推理结合，比例由具体课程决定，而不是对所有大学宣布 50/50。','I favour a curriculum that connects... / the balance should depend on...',[
 ex('I favour connecting specialised practice with transferable reasoning.','我支持结合专业实践与可迁移推理。','立场明确。'),
 ex('The balance should depend on the responsibilities of each programme.','两者比例应视各专业责任而定。','给出判断标准。'),
 ex('A universal percentage would ignore meaningful differences.','统一百分比会忽略重要差异。','说明反对固定比例的原因。')
 ],'“both views have merits” 只是礼貌套话，没有说明怎样分配优先级和为什么。'),
 sec('04 结论回应问题而不加新政策','结尾重申对于两种教育方向的判断，以及何种条件决定权重。无需添加未经前文讨论的学费、贷款或移民政策。','In conclusion, universities should... with a balance informed by...',[
 ex('In conclusion, both forms of learning serve distinct purposes.','总之，两种学习方式承担不同作用。','收束双方讨论。'),
 ex('Practical demands should shape the amount of specialist training.','实践要求应影响专业训练所占比重。','对应评价标准。'),
 ex('Reasoning across unfamiliar problems should remain a shared goal.','应对陌生问题的推理能力应是共同目标。','最终立场清晰。')
 ],'结尾不能引入全新理由，也不能凭空捏造各专业固定课程比例。')
 ],
 questions:[
 q('What shared aim links both educational views?','Preparing students for their futures.','双方都关注未来适应，只是分别强调当前就业技能和可迁移能力。'),
 q('Why might some programmes need more practice?','Direct professional responsibilities may require substantial supervised practical training.','源文将更多实践与专业责任相连，并未提出所有大学统一比例。'),
 q('Does the writer favour a fixed 50/50 split?','No. The balance should depend on the particular programme.','源稿明确强调按项目特点确定组合比例，不支持统一百分比。'),
 q('What is a clear personal position for the essay?','Connect specialised practice and transferable reasoning, with programme-specific weighting.','同时指出选择方向及衡量标准，超越空泛的两方都有道理。')
 ],
 output:'写 discuss both views + own opinion 至少250词英文原创议论文，双方理由各有机制，观点有具体判准；附完整中文译文。',
 model:[
 ex('Vocational preparation can equip graduates with skills required for immediate employment.','职业准备能帮助毕业生掌握即时就业所需技能。','职业观点。'),
 ex('This is especially important in courses with direct professional responsibilities.','在承担直接专业责任的课程中尤其重要。','适用范围。'),
 ex('Practical training can expose students to the demands of real tasks.','实践训练可以让学生接触真实任务要求。','理由机制。'),
 ex('By contrast, broad education may prepare learners to handle unfamiliar problems.','相比之下，广博教育可帮助学习者应对陌生问题。','另一方观点。'),
 ex('Specific workplace techniques may become outdated.','特定工作技术可能会过时。','长期适应理由。'),
 ex('Analysing evidence can remain useful across many fields.','分析证据在许多领域都很有用。','可迁移能力。'),
 ex('I favour combining practical expertise with transferable reasoning.','我支持结合实践专长和可迁移推理能力。','明确立场。'),
 ex('The right balance should depend on the programme rather than a universal percentage.','适当比例应因专业而异，而不是一刀切。','判准。')
 ],referenceUrls:[REF],sourceNote:'原样保留 Task2 U04 职业与广博教育两方论据及课程依赖的有条件结论，不引入实测就业统计。'
},
{
 id:'en-task2-u04-curriculum-judgement-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u04',
 title:'双观点关键词：vocational、obsolete、transferable、curriculum',subtitle:'术语从具体专业责任延伸到适应陌生问题',
 prerequisite:'熟悉职前训练与广博教育两种观点的原始英语段落。',
 objective:'理解词语所限定的教育目标，正确连接 curriculum、specialised training、transferable reasoning，不让同义替换改变论点。',
 sections:[
 sec('01 vocational 与 employability 区别','vocational 侧重为具体职业训练，employability 更广泛地指获得工作的相关能力。原稿认为职业准备具有实践价值，但并没有提供所有职业技能都能保证就业的证据。','vocational preparation / professional responsibilities / practical training',[
 ex('Vocational courses focus on practical professional preparation.','职业型课程着重实际专业准备。','强调训练方向。'),
 ex('Such training can support routes into employment.','这种训练可以支持通向就业的路径。','can 而不是 guarantees。'),
 ex('Some responsibilities require supervised practice.','部分专业责任需要受监督的实践。','根据任务特征限制范围。')
 ],'不把 vocational training 误写成所有毕业生 guaranteed jobs，也不能推断任何特定行业就业率。',[
 ['vocational preparation','职业准备','不保证就业结果'],
 ['obsolete techniques','可能过时的技术','具体技术，不代表所有知识'],
 ['transferable reasoning','可迁移的推理能力','可跨情境运用'],
 ['programme-specific balance','因专业而异的组合比例','无统一百分比']
 ]),
 sec('02 obsolete 强调特定技能过时','obsolete 表示某项具体技术不再合适或通行，原稿的论点不是“所有职业能力都会无用”。可用 become outdated 作为自然替换，并把影响连接到更广泛的学习能力。','some specialised techniques may become obsolete / outdated',[
 ex('Specific techniques may become obsolete over time.','某些专业技术可能随着时间过时。','some 与 may 避免绝对化。'),
 ex('Adaptable reasoning can help graduates learn new methods.','可适应的推理能力能帮助毕业生学习新方法。','解释广博教育的价值。'),
 ex('This does not make practical skills worthless.','这不意味着实践技能没有价值。','避免稻草人式反驳。')
 ],'不能把“特定技能可能过时”扩大为“大学完全不该传授专业技能”。'),
 sec('03 transferable ≠ purely theoretical','transferable 指可跨任务迁移；reasoning、evidence evaluation 都可以在实践中使用。不能为了对立写作而把 broad learning 说成与职业活动毫无关联的纯抽象理论。','transferable skills / evaluate unfamiliar evidence / apply across contexts',[
 ex('Evaluating evidence is a transferable skill.','评估证据是一项可迁移能力。','同一方法可用于不同专业。'),
 ex('It can complement rather than replace practical training.','它可以补充而非取代实践训练。','准确表达立场。'),
 ex('A well-designed curriculum can develop both.','合理设计的课程能够培养两者。','承接方案。')
 ],'broad education 不等于缺乏应用，transferable 也不等于脱离实际。'),
 sec('04 balance 需要具体标准','balance 是两类学习的合理组合，不代表各占一半。应使用 depend on、vary by、be guided by 说明比例跟课程性质及职业责任相连。','the balance should vary by programme / be guided by professional needs',[
 ex('The balance can vary by programme.','组合比例可因专业而变。','不存在统一份额。'),
 ex('Direct responsibilities may justify more supervised practice.','直接专业责任可能使更多督导实践成为合理选择。','条件清晰。'),
 ex('All students can still benefit from broad reasoning.','所有学生仍可从广泛推理训练中获益。','保持共通学习目标。')
 ],'不要编造 60/40 或 50/50 等比重；原文没有任何大学课程比例数据。')
 ],
 questions:[
 q('What does vocational primarily describe?','Preparation for particular occupations through relevant practical training.','该词涉及专业定向的训练方式，并不保证所有学员立即获得工作。'),
 q('Does obsolete mean every practical skill is worthless?','No. Some specific techniques may become outdated.','源文仅说明部分具体技能可能过时，没有贬低所有实践。'),
 q('Why is evidence evaluation called transferable?','It can help learners assess unfamiliar problems across different contexts.','迁移性来自能力可以用于新的问题，而不是“毫无专业内容”。'),
 q('Is balance the same as an equal 50/50 division?','No. It should vary according to programme needs.','原稿明确反对给所有课程设置同一个固定比重。')
 ],
 output:'用四段英文分别界定 vocational、obsolete、transferable 和 curriculum balance，配逐句中文；写不少于250词双方观点作文。',
 model:[
 ex('Vocational preparation focuses on relevant occupational tasks.','职业准备着重相关职业任务。','界定词义。'),
 ex('Its value may be especially clear in professionally regulated fields.','在涉及专业规范的领域，其价值可能更明显。','提出条件，不编造行业研究。'),
 ex('However, certain techniques may become obsolete.','但某些技术可能过时。','限定对象。'),
 ex('Transferable reasoning helps learners respond to unfamiliar demands.','可迁移推理帮助学习者应对陌生要求。','机制。'),
 ex('Broad learning does not have to be detached from practice.','广博学习并不需要脱离实践。','澄清误区。'),
 ex('A curriculum may combine specialist and general goals.','课程体系可以结合专门和一般目标。','组合。'),
 ex('The balance should depend on each programme.','比例应视各课程项目而定。','无万能数值。'),
 ex('The aim is preparation for changing future responsibilities.','目标是准备好应对不断变化的未来责任。','归纳。')
 ],referenceUrls:[REF],sourceNote:'严格映射原 Task2 U04 的职业与广博教育对照；没有任何实际就业率、课程预算或调查数字。'
},
{
 id:'en-task2-u05-outweigh-conditions-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u05',
 title:'Outweigh 论证：严重程度、受影响人群与成立条件',subtitle:'远程公共服务：便利性 vs 排除数字能力或联网困难者',
 prerequisite:'掌握 although/while 与比较句，理解 claim 与例子的区别。',
 objective:'评估远程公共服务的收益能否超过数字排斥成本，解释评价标准并用 if/provided that 给出保障性判断。',
 sections:[
 sec('01 outweigh 不是数观点的数量','源文提出线上常规服务减少旅行与等待；缺点是纯数字渠道会排除部分用户。优势是否超过缺点，需衡量覆盖人群、影响严重程度和持续时间，而不是列出三个小优点压过一个重大损害。','benefits may outweigh drawbacks if ... / severity matters more than count',[
 ex('Online routine services can reduce travel and waiting.','常规服务线上化可以减少出行和等候。','报告潜在收益。'),
 ex('A digital-only channel could exclude some residents.','只有线上渠道可能排除部分居民。','指出对基本服务的严重影响。'),
 ex('The weight of each effect matters more than the number of points.','各项影响的重要程度比论点数量更关键。','定义权衡逻辑。')
 ],'不能因为写出了三个优点和一个缺点就自动认定 advantages outweigh disadvantages。',[
 ['Convenience','减少奔波和等待','远离办事处者可能获益较大'],
 ['Access barrier','缺少网络或填表信心','关键公共服务可能无法使用'],
 ['Evaluation','覆盖范围与严重程度','不能机械数条目'],
 ['Safeguard','保留协助与非数字渠道','判断成立的前提']
 ]),
 sec('02 while / although 表示真实让步','while 连接相互制约的两个方面，although 承认收益后说明严峻例外。若一句话只讲便利、一句只讲成本却不给出关系，就没有形成权衡论证。','While online systems reduce travel, a digital-only design can exclude...',[
 ex('While remote services save travel time, they can create barriers.','远程服务虽节省出行时间，却也可能形成障碍。','同一句建立对照。'),
 ex('Although many users may benefit, some still require help.','尽管不少用户可能获益，部分人仍需要协助。','同时保留两方。'),
 ex('The judgement depends on how serious the barriers are.','结论取决于这些障碍的严重程度。','给出评价标准。')
 ],'不能把数字排斥描写成所有用户均无法上网，也不能假定线上服务毫无益处。'),
 sec('03 provided that 指明正面结论的保障','原稿的立场是：如果保留辅助办理和非数字渠道，收益可能超过缺点。provided that 是条件，不能当作已实施的事实，也不能删除保障之后仍声称结论完全相同。','The benefits may outweigh the costs, provided that assisted access remains available',[
 ex('The benefits can outweigh the drawbacks if alternatives remain.','如果替代办理渠道仍可使用，收益可能超过缺点。','条件性判断。'),
 ex('Assisted services can help users complete complex forms.','协助服务能够帮助用户填写复杂表格。','针对实际障碍。'),
 ex('Maintaining these routes also requires resources.','维持这些渠道也需要资源。','不隐瞒保障成本。')
 ],'provided that alternatives remain 不等于原系统已经配备这些措施；要用 proposed/suggested 与事实区分。'),
 sec('04 结论不应无条件夸奖技术','结尾需要直接回答 outweigh 问题，并重申判断为何有条件。可以写 benefits may outweigh drawbacks under an inclusive design，不应写 technology is always good。','On balance, ... provided that ... / otherwise ...',[
 ex('On balance, the gains may justify the costs under an inclusive design.','总体衡量后，包容性设计下的收益可能足以抵消成本。','结论有依据。'),
 ex('Without alternative channels, exclusion could become decisive.','没有替代渠道时，排斥问题可能成为决定性因素。','说明条件失效。'),
 ex('The conclusion is not a universal endorsement of digital-only services.','结论不是对纯数字服务的无条件认可。','范围明确。')
 ],'用“科技发展不可避免”替代利弊比较会偏离题型，也没有回应数字排斥。')
 ],
 questions:[
 q('Which benefit may matter most to people far from an office?','Reduced travel and waiting for routine services.','原文明确指出对住得远的人而言，省去路程可能是实质性的便利。'),
 q('Why cannot three small benefits automatically outweigh one drawback?','Impacts must be weighed by scope, seriousness and duration rather than count.','一项对基本服务的严重排斥可能比多个轻微便利影响更大。'),
 q('What condition supports the writer’s positive judgement?','Assisted and non-digital channels remain available.','原文将保留替代渠道作为收益可能大于缺点的前提。'),
 q('Does the source say alternatives have zero cost?','No. Maintaining them carries a cost but protects access.','原文明确承认双渠道存在支出，却强调保障基本服务可达性。')
 ],
 output:'围绕是否值得把常规公共服务转为线上写不少于250词利弊权衡作文；给出严重程度判准、保留非数字渠道条件，附完整中文。',
 model:[
 ex('Remote services can make routine transactions faster.','远程服务可以让日常事项办理更快捷。','优点。'),
 ex('This may be particularly valuable for people who live far away.','这对居住较远的人可能特别重要。','具体受益群体。'),
 ex('However, digital-only provision can exclude users without access or confidence.','但纯数字办理可能排除缺乏网络或信心的用户。','严重缺点。'),
 ex('Such exclusion is more serious when essential services are involved.','涉及基本服务时，这类排斥会更加严重。','严重程度判准。'),
 ex('The number of arguments is not a reliable way to weigh them.','论据条数不能作为可靠的权衡方法。','方法论。'),
 ex('Assisted and offline routes can protect people who need alternatives.','协助与线下渠道能保护需要其他选择的人。','保障性措施。'),
 ex('These options have costs, but they preserve access.','这些选择有成本，却维护服务可达性。','承认成本。'),
 ex('I therefore favour online expansion only where meaningful alternatives remain.','因此我仅支持在真正保留替代渠道的条件下扩展线上服务。','明确有条件结论。')
 ],referenceUrls:[REF],sourceNote:'取自 Task2 U05 虚构远程公共服务的利弊示例，没有网络覆盖率、成本或用户比例的实测数据。'
},
{
 id:'en-task2-u05-public-access-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u05',
 title:'远程公共服务词汇：access、exclude、assistance、safeguard',subtitle:'不是 technology good / technology bad，而是基本服务可达性',
 prerequisite:'理解线上办理带来的出行便利及数字排斥风险。',
 objective:'区分 access、availability、confidence、exclusion、assisted route、essential service，并准确表达条件性权衡。',
 sections:[
 sec('01 accessibility 和 availability 不完全相同','availability 表示服务存在，accessibility 强调目标人群能否真正使用。如果线上平台开放，却要求用户具有可靠网络和复杂表格填写能力，并不等于对每个人都可达。','available online / accessible to users / reliable connection',[
 ex('A service may be available online but inaccessible to some users.','服务虽已上线，却仍可能对某些用户不可达。','区分存在和可使用。'),
 ex('A reliable connection is not available to everyone.','并非人人都有可靠网络。','不编造具体覆盖率。'),
 ex('Complex forms may create an additional barrier.','复杂表格可能造成另一项障碍。','数字能力也是因素。')
 ],'不得把网上能打开页面直接改写成所有居民均能完成办理。',[
 ['available online','线上有该服务','不保证实际可达'],
 ['accessible to users','用户能真正使用','需要网络和办理能力'],
 ['excluded users','被排除的群体','可能缺乏连接或协助'],
 ['assisted route','有人协助的办理途径','不同于只放教程']
 ]),
 sec('02 exclude、barrier 与 confidence','exclude 表示排除在渠道外；barrier 是造成排除的实际障碍。lack confidence 在原文指完成复杂表格的信心，不该简单解释为“不愿意学习新技术”。','exclude people without ... / barriers to access / confidence with complex forms',[
 ex('A digital-only system can exclude residents without reliable access.','纯数字系统可能排除缺乏可靠网络的居民。','条件具体。'),
 ex('Limited confidence with forms can be another barrier.','缺少填写表格的信心也可能形成障碍。','不是道德评价。'),
 ex('Offering assistance may reduce this particular barrier.','提供协助可能减少这一具体障碍。','解决方案针对机制。')
 ],'不能把缺乏网络条件归咎于个人懒惰，也不能认为所有线上用户都无法使用。'),
 sec('03 routine 与 essential 可同时存在','routine services 是日常办理项目；essential services 是不可轻易放弃的重要服务。一项服务可以同时常规而重要。讨论影响严重程度时，应具体解释为什么排斥影响服务可达性。','routine transactions / essential public services / continued access',[
 ex('Routine applications may be quicker online.','日常申请在线办理可能更快捷。','说明便利的对象。'),
 ex('Some applications are also essential for everyday life.','部分申请也关系日常基本需要。','说明可能的严重后果。'),
 ex('Exclusion from an essential service carries greater weight.','被排除在基本服务外的影响更重大。','对应权衡标准。')
 ],'不能把 routine 错译为 insignificant；常规程序并非必然不重要。'),
 sec('04 safeguarding access 需要真正的替代路径','assisted channel 指可获得人工协助，non-digital route 指不依赖在线表格的途径。文中两个保障一起出现，保留线下途径并不意味着保证完全免费或无需额外人员。','retain assisted access / provide non-digital alternatives / safeguard participation',[
 ex('Assisted routes can support people completing complex forms.','协助渠道可支持用户填写复杂表格。','针对信心或能力问题。'),
 ex('Non-digital routes can assist those without reliable connectivity.','非数字渠道可帮助网络条件不足的人。','针对技术条件。'),
 ex('Maintaining both can safeguard access at an additional cost.','维持两者可能以增加成本为代价保障可达性。','承认资源约束。')
 ],'替代渠道的建议不是原稿中已经测得的实施效果，不能虚构利用率或实际预算。')
 ],
 questions:[
 q('How is accessible different from available online?','Available means offered; accessible means people can actually use it.','源稿的数字排斥说明线上提供服务不保证所有人可实际完成办理。'),
 q('What does confidence refer to here?','A person’s confidence in completing complex online forms.','这一情境涉及复杂表格操作，并非笼统否定人的学习动机。'),
 q('Can routine services also be essential?','Yes. Frequency or familiarity does not imply that access is unimportant.','日常手续也可能是基本服务，排斥造成的严重程度不能按 routine 忽略。'),
 q('Which two routes safeguard inclusion?','Assisted services and non-digital options.','源稿的条件性正面立场依赖这两种替代渠道继续可用。')
 ],
 output:'写一个中英对照的服务可达性词汇图，再撰写完整至少250词 Task2 利弊权衡作文，切实说明非数字渠道。',
 model:[
 ex('Availability alone does not ensure accessibility.','提供服务不等于确保可使用。','词义。'),
 ex('A person may lack a reliable internet connection.','有人可能没有可靠网络。','技术障碍。'),
 ex('Another user may need help with complex forms.','另有人可能需要复杂表格方面的协助。','能力障碍。'),
 ex('A digital-only policy could exclude both groups.','纯数字政策可能排除这两类人。','排斥机制。'),
 ex('Routine services may still be essential.','常规服务仍可能非常重要。','影响严重程度。'),
 ex('Assisted channels can help with completion.','人工协助渠道能帮助完成办理。','保障方式一。'),
 ex('Offline routes support people without connectivity.','线下渠道支持缺少网络的人。','保障方式二。'),
 ex('An inclusive policy should weigh access alongside efficiency.','包容性政策应在效率之外同时考虑可达性。','整体评价。')
 ],referenceUrls:[REF],sourceNote:'所有情境来自原创 Task2 U05，数字可达性与公共服务只为教材议论文主题，不声称官方研究结论。'
}
];