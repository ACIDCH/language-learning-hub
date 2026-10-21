import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable);
/** IELTS official criteria are used for task scope; original examples are for language learning, not band-rated model scripts. */
export const IELTS_ARGUMENT_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-contrast-cohesion',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u03',
 title:'论证句法：让步、反驳与指代衔接',subtitle:'although / despite / however / whereas 的结构和篇章功能',
 prerequisite:'能够写完整陈述句，掌握 because、but、so，并能区分名词短语和从句。',
 objective:'使用让步从句、名词化让步结构、对照句及回指结构组织理由与反驳，不靠堆砌连接副词制造虚假逻辑。',
 sections:[
 sec('01 although 后是从句，despite 后是名词或 -ing',
 'although/even though 后接带主语和谓语的完整从句；despite/in spite of 后通常接名词、代词或 -ing 形式，也可接 the fact that + 从句。它们表达相近的让步意义，但句法不能互换。',
 'Although + clause, clause. / Despite + noun/-ing, clause.',[
 e('Although online classes are flexible, some learners need face-to-face support.','虽然线上课程灵活，但部分学习者需要面对面支持。','although 后有 online classes are… 的完整从句。'),
 e('Despite their flexibility, online classes are not suitable for everyone.','尽管线上课程很灵活，它们并不适合所有人。','despite 后接名词短语 their flexibility。'),
 e('Despite offering more flexibility, online courses still require self-discipline.','虽然提供更大灵活性，线上课程仍需要自律。','despite 后接动名词短语 offering…。')
 ],'不能写 Despite online courses are flexible；如果保留主语和谓语，应改成 Although online courses are flexible。',
 {title:'让步结构对照',columns:['连接形式','后续成分','完整例子'],rows:[['although','主语 + 谓语','Although the cost is low, …'],['even though','主语 + 谓语','Even though time is limited, …'],['despite','名词 / -ing','Despite the high cost, …'],['in spite of','名词 / -ing','In spite of working late, …']],note:'Despite the fact that + 从句也成立；学习时不要把 despite 简化成只能接名词。'}),
 sec('02 however 连接两项判断，whereas 在句内对照',
 'however 是连接副词，常用句号或分号与前句分开，再用逗号引出新判断。whereas 是引导对照从句的连接词，后接主语及谓语。although 表让步，whereas 表对照，不必为了替换同义词而改变论证关系。',
 'Statement. However, qualification. / A whereas B.',[
 e('Online resources are accessible. However, access does not guarantee effective learning.','线上资源容易获取，但获取资源不保证学习有效。','however 对前句作限定。'),
 e('Digital materials are available remotely, whereas study rooms require physical space.','数字材料可远程使用，而学习室需要实体空间。','whereas 在同一句中比较两种方式。'),
 e('The materials may be affordable; however, some students lack reliable internet access.','材料可能价格合理；但部分学生缺乏稳定网络。','分号与 however 搭配连接两个独立分句。')
 ],'However some students lack access, digital materials… 在此不能当作“虽然”的标准用法；应选择 Although some students lack access,… 或重新构句。'),
 sec('03 指代词必须有清楚、唯一的先行词',
 'this、these、such a measure、this limitation 等可以衔接前句的想法，但抽象的 This is important 若没有明确指代对象，读者无法判断“这”是空间、价格还是学习成果。尽量采用 this approach、these facilities 等明确名词组。',
 'proposal → this approach / challenge → this limitation',[
 e('Some students lack quiet rooms. This shortage can disrupt their study routine.','部分学生缺乏安静的房间。这一短缺可能干扰他们的学习安排。','this shortage 明确指代没有安静空间的问题。'),
 e('Universities can offer digital materials. This provision may help students who study remotely.','大学可以提供数字材料。这种供应有助于远程学习的学生。','this provision 指前述数字资源。'),
 e('Both options involve ongoing costs. Those costs should be considered before funding is allocated.','两种方案都有持续支出。在拨款前应考虑这些成本。','those costs 明确复数回指。')
 ],'如果前一句同时出现“网络”“教室”和“费用”，下一句单独写 This is a problem 往往会造成指代歧义。'),
 sec('04 反方观点先准确转述，再给出有条件的回应',
 '有效反驳不是先写 However 再重复自己的看法。应先准确说明对方最有力的理由，随后指出该理由成立的范围，再说明哪些学生或条件下另一方案更可取；论证连接必须有实质性内容。',
 'opposing reason → concession → boundary → response',[
 e('Supporters of online investment argue that resources can reach students off campus.','支持投资线上资源者认为这些材料能覆盖不在校园的学生。','先准确陈述另一观点。'),
 e('This is a reasonable concern, especially for students with long journeys.','这一担忧有道理，尤其对通勤较远的学生而言。','承认反方理由的适用条件。'),
 e('Nevertheless, remote access cannot always replace a quiet place for concentrated work.','但远程访问未必能代替可供专注学习的安静场所。','回应特定需求，而不是抹杀反方好处。')
 ],'“This proves my view” 不能仅凭一条例子推出必然结论；需说明立场基于什么条件或权衡。')
 ],
 questions:[
 {question:'改错：Despite students have online access, some need quiet rooms.',answer:'Although students have online access, some need quiet rooms.',why:'主语 students + 动词 have 构成从句，应使用 Although。'},
 {question:'填空：Online learning saves travel time, ___ classroom discussion offers immediate interaction.（对照）',answer:'whereas',why:'两个分句直接对照使用 whereas。'},
 {question:'改写：The courses are flexible. But access is uneven.（使用 However）',answer:'The courses are flexible. However, access is uneven.',why:'however 是连接副词，前面通常用句号或分号分隔。'},
 {question:'改进空泛回指：Libraries are crowded. This is a problem. ',answer:'Libraries are crowded. This shortage of quiet space can affect students who need to concentrate.',why:'将 this 明确为 quiet-space shortage，而不是让读者猜测指代。'}
 ],
 output:'这是段落训练，不是完整 IELTS Task 2 试卷作文。写 120–160 词英文段落：准确陈述一个反方观点，用 although 或 despite 让步，以 however 或 whereas 对照，再提出限定条件与结论。',
 model:[
 e('Some people argue that universities should concentrate their budgets on digital resources because these materials can be accessed from home.','有人认为大学应将预算集中在数字资源上，因为学生可以从家中获取这些材料。','先准确报告反方理由。'),
 e('This argument is persuasive for students who live far from campus or who combine their studies with employment.','对于离校较远或边工作边学习的学生，这一观点颇有说服力。','说明适用条件。'),
 e('Although online access can reduce travel time, it does not necessarily provide a suitable environment for sustained concentration.','尽管线上资源可减少通勤时间，却不一定能提供适合长时间集中注意力的环境。','although 引出让步，not necessarily 限定。'),
 e('Some students have noisy homes, whereas others need facilities for group projects.','部分学生家中嘈杂，而其他学生需要小组项目设施。','whereas 对照两种需要。'),
 e('Despite these different circumstances, an effective funding policy need not treat the two options as mutually exclusive.','尽管情况不同，有效的拨款政策不必将两种方案视为互斥。','despite 后是名词短语。'),
 e('Universities could allocate resources according to demonstrated demand rather than assuming that one solution will serve every learner equally well.','大学可以根据实际得到证实的需求分配资源，而不是假设同一方案能同样满足所有学习者。','结论回应两种资源的适用边界。')
 ],
 referenceUrls:['https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others','https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing'],
 sourceNote:'关联现有 Task2 U03 论证和反驳。短段训练不应标识为达到 IELTS 至少 250 词的完整 Task2 作文。'
},
{
 id:'en-task2-reason-evidence-vocab',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u02',
 title:'理由与论据语块：机制、例子、限制及结论',subtitle:'从 make a claim 发展为符合 Task 2 要求的完整讨论',
 prerequisite:'会写观点句、because 句及基本的对比句，理解 Task 2 的不同设问。',
 objective:'使用 reason, illustrate, address, balance, justify 等搭配解释观点，识别虚构例子与真实证据的边界，完成至少 250 词的 Task 2 议论文。',
 sections:[
 sec('01 观点、理由、说明例子属于不同层次',
 'a claim 是提出的观点；a reason 说明为什么支持它；an illustration 帮助读者理解机制，不能仅凭一个假设例子宣称已得到实证证明。正式写作应区分 explain why、give an example、provide evidence 等功能。',
 'make a claim → explain a reason → illustrate a mechanism',[
 e('One argument in favour of study rooms is that they provide predictable working conditions.','支持学习室的一项理由是它们提供可预期的学习环境。','argument in favour of 引出主张。'),
 e('This matters because some learners cannot control noise at home.','这一点重要，因为部分学习者无法控制家中噪音。','because 解释机制。'),
 e('For example, a student sharing a small apartment may struggle to find uninterrupted study time.','例如，一名与他人合住小公寓的学生可能难以找到不被打扰的学习时间。','这是说明性假设例子，不是声称有实测统计。')
 ],'For example 后面的个案不能被写成 A study proves…，除非题目确实提供相关研究来源。',
 {title:'论证表达按功能分类',columns:['功能','高频语块','用途'],rows:[['提出主张','one argument in favour of','引出立场'],['解释机制','this matters because','说明为什么'],['举例','for example / to illustrate','提供具体场景'],['限定','under these circumstances','限制适用情况'],['结论','on balance','完成权衡']],note:'论证好坏取决于内容是否发展充分；连接短语数量不等于论证质量。'}),
 sec('02 避免因果与证据力度过度推断',
 'contribute to、be associated with、cause、demonstrate 的证据要求不同。说明两个因素可能有关时用 may contribute to 或 may be associated with；如果没有研究设计与结果，不要用 prove that 描述举例或个人猜测。',
 'may contribute to / may be associated with ≠ prove',[
 e('Access to quiet rooms may contribute to better study routines.','有安静空间可用可能有助于改善学习规律。','may contribute to 是有条件的可能影响。'),
 e('Busy study spaces do not, by themselves, demonstrate higher grades.','学习场所繁忙本身并不能证明成绩提高。','衡量使用量不等于衡量成绩。'),
 e('The decision should be based on local needs rather than unsupported assumptions.','决策应依据本地需求，而不是缺乏支持的假设。','be based on + 名词是理由来源搭配。')
 ],'must improve grades 是未经证实的绝对断言，不能仅由可能有助于集中注意力直接推出。'),
 sec('03 表述反方利益，不用空洞转折词',
 'supporters of / critics of 表示观点来源；a potential drawback of 指某方案缺点；another consideration is that 可以补充新的决策条件。必须先说明对方真正的利益，再比较不同群体的需求。',
 'supporters of X / a potential drawback of Y / another consideration',[
 e('Supporters of online resources emphasise access for students living off campus.','线上资源的支持者强调校外学生的获取便利。','emphasise access 抓住实际理由。'),
 e('A potential drawback of expanding rooms is the ongoing maintenance cost.','增加学习室的一个潜在缺点是持续维护成本。','a potential drawback of + -ing。'),
 e('Another consideration is whether existing facilities are already underused.','另一个需考虑的问题是现有设施是否已使用不足。','whether 表示尚需调查的决策信息。')
 ],'“Some people disagree” 不等于充分陈述反方；应说明对方认为何种资源适合何种学习需求。'),
 sec('04 明确回答讨论两种观点和个人立场的题目',
 '讨论双方观点的任务要求解释两种立场，并明确自己的判断。段落组织一般应包含主题、两种观点的理由、自己的权衡与结论。IELTS Academic Task 2 的完整答案至少 250 词；下面的自拟题和范文是语言教材，不是官方试题或官方评分样卷。',
 'introduction → view A → view B → evaluation → conclusion',[
 e('Both approaches address genuine needs, but I favour a balanced investment strategy.','两种做法都应对真实需求，但我更赞成平衡投资。','引言里给出清楚立场。'),
 e('On the one hand, quiet study rooms offer an environment that online content cannot itself provide.','一方面，安静学习室能提供线上内容本身无法提供的环境。','支持物理空间的理由。'),
 e('On the other hand, digital materials can extend access beyond campus opening hours.','另一方面，数字材料可让使用不局限于校园开放时段。','公平呈现另一立场。')
 ],'全文不应仅列举两个优点而没有最终立场；Task Response 还要求观点发展及与题目保持相关。')
 ],
 questions:[
 {question:'a claim 与 supporting evidence 是否是同一层次？',answer:'不是。claim 是提出的主张；evidence 是可能支持该主张的资料。',why:'提出观点与提供能够支撑观点的实证材料属于不同的论证步骤。'},
 {question:'把“可能有助于”选择恰当表达：proves / may contribute to。',answer:'may contribute to',why:'没有实证证明时保留可能性，避免使用 prove。'},
 {question:'填空：A potential drawback ___ expanding libraries is maintenance cost.',answer:'of',why:'固定搭配 a potential drawback of + 名词或 -ing。'},
 {question:'IELTS Academic Writing Task 2 完整作文的最低字数是多少？',answer:'250 words',why:'IELTS 官方 Task 2 说明至少 250 词，不能把 120 词的课堂段落练习冒充完整考场作文。'}
 ],
 output:'自拟讨论题：Some people believe universities should invest more in quiet study rooms, while others prefer spending on digital learning resources. Discuss both views and give your own opinion. 请写不少于 250 词的完整 Task 2 作文，说明双方理由、个人判断及其适用条件。',
 model:[
 e('Universities must decide how to divide limited budgets between physical learning spaces and digital resources.','大学必须决定如何在实体学习空间与数字资源之间分配有限的预算。','引言介绍公共决策问题。'),
 e('Some people argue that more quiet study rooms should be the priority, whereas others favour expanding online materials.','一些人认为优先增加安静学习室，另一些人则赞成扩展线上材料。','准确呈现双方观点。'),
 e('In my view, both are necessary, although investment should depend on the circumstances of each institution.','在我看来两者都必要，但投入应取决于各院校自身情况。','给出明确且有条件的立场。'),
 e('Those who support additional study rooms point to the difficulties faced by students who lack a suitable place to work at home.','支持增设学习室的人指出，部分学生在家缺乏合适学习场所。','第一种观点及对象。'),
 e('A shared household may be noisy, making lengthy reading or writing tasks difficult to complete without interruption.','合住环境可能很吵，使长时间阅读或写作难以不受打扰。','具体机制而非编造研究。'),
 e('A university library can provide desks, reliable opening hours and a setting designed for concentration.','大学图书馆能提供座位、可靠的开放时段和专为专注学习设计的环境。','解释实体空间提供的服务。'),
 e('Group rooms may also help learners complete projects that require discussion and access to shared equipment.','小组房间还可以帮助学生完成需要讨论和共用设备的项目。','第二个补充理由。'),
 e('However, constructing and maintaining facilities can be expensive, so new rooms should not be built without investigating demand.','不过建设与维护设施可能昂贵，因此不能不调查需求就增建房间。','承认成本约束。'),
 e('Supporters of digital learning emphasise the advantages of materials that are accessible regardless of location.','数字学习的支持者强调材料可不受地点限制获取的优势。','引入另一种观点。'),
 e('Recorded lectures, electronic texts and practice activities can serve students who work, commute or study at unusual hours.','录播讲座、电子文本和练习活动可以服务工作、通勤或非正常时段学习的学生。','具体列出服务情境。'),
 e('These resources can be updated without requiring every learner to travel to campus for each task.','这些资源可更新，而且学生不必为每个任务专程去校园。','解释便利性。'),
 e('Nevertheless, internet access and personal study conditions are not equally reliable for all students.','然而所有学生的网络连接与个人学习条件并不一样可靠。','承认数字方案的局限。'),
 e('Providing content online therefore does not remove the need for somewhere quiet to use it.','因此提供线上内容并不能消除对安静学习场所的需求。','回应两种资源互补的关系。'),
 e('I would recommend that universities first examine room occupancy, student schedules and actual use of online services.','我建议大学首先调查房间占用、学生时间安排以及线上服务实际使用情况。','提出可执行的决策依据。'),
 e('Where quiet seats are consistently scarce, extending opening hours or adapting existing rooms may be more practical than immediate construction.','如果安静座位持续不足，延长开放时间或改造现有空间可能比立即建设更可行。','为实体方案提出条件性执行方式。'),
 e('Where learners rely heavily on remote access, better digital resources may offer greater benefit for the available funding.','如果学习者高度依赖远程访问，加强数字资源可能更符合可用预算的效益。','为数字方案提出对应条件。'),
 e('The important point is to match expenditure to demonstrated needs rather than treat a single approach as suitable for everyone.','关键是让支出匹配已证实的需求，而非把单一方案当作普遍适用。','概括实施原则。'),
 e('In conclusion, universities should support both spaces and online materials, while deciding the balance through evidence about their own students.','总之大学应支持实体空间与线上材料，并依据本校学生的相关证据决定投入比例。','结论重申立场并呼应双方观点。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others'],
 sourceNote:'将官方 Task 2 字数与 Task Response / Coherence and Cohesion 的要求用于检查范围，不对自拟范文声称任何官方分数。'
}
];