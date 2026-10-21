import type {SpecialtyLesson,LearningSection,LearningTable,LearningExample} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
const T=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['原文形式','实际范围','不能替换为'],rows,note});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
export const IELTS_READING_GRAMMAR_U05_U08:SpecialtyLesson[]=[
{
id:'en-reading-u05-reference-logic',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u05',
title:'指代链与同义改写：先找到 this intervention 的所指',subtitle:'议会住宅隔热补助、申请条件和不予资助的维修必须分别定位',
prerequisite:'能识别 demonstratives、relative clauses、被动式和目的不定式。',
objective:'用名词短语先行词、目的从句、限定范围及对比结构准确追踪住宅节能补助的信息，不把 broader housing subsidies 当成相同计划。',
sections:[
s('01 This intervention 回指哪一整件事？','demonstrative this 加上概括性名词 intervention 通常承接上文一个已描述措施。原文先说议会向旧住宅隔热工程提供补助，后面 This intervention 指该项补助，而不是每一种住房补贴。回指时先问谁提出、提供什么、给谁。','a grant for insulation → this intervention',[
e('The council offered grants for insulation in older homes.','议会为旧住宅的隔热工程提供补助。','先行事件是特定的隔热补助。'),
e('This intervention aimed to reduce winter heating demand.','这一干预旨在减少冬季取暖需求。','this intervention 回指上一句的计划。'),
e('The programme was not a general housing subsidy.','该计划不是一般住房补贴。','根据实施内容限定指称，不能扩大到其他政策。')
],'找先行词不能只看最近的单词 homes；this intervention 回指的是整个行动或计划，而不是房屋这个物体。',
T('指代解读',[['this intervention','前述旧宅隔热补助','所有住房政策'],['these limits','工程范围的限制','所有政策均无效'],['such homes','符合描述的住房','所有房屋'],['the programme','该 retrofit 计划','任何议会计划']],'词语接近不等于所指相同；检查语法和上下文行动范围。')),
s('02 目的表达不是已实现的效果','be intended to / aim to 描述计划目的，而非测量后的结果。reduce winter heating demand 是目标；仅凭 intended 不能写成 proved that demand fell。应用题型时把意图、观察和已验证效果分成三个状态。','was intended to reduce ≠ demonstrated a reduction',[
e('The grants were intended to reduce demand.','补助旨在减少需求。','were intended 说明设计目的。'),
e('The council measured a fall in demand.','议会测量到需求下降。','原稿没有提供测量结果，不可擅自推断。'),
e('Eligible owners could apply for assistance.','符合条件的业主可以申请援助。','could apply 说明申请资格，不代表申请获批。')
],'不要把 could apply 改写成 received grants；申请权利和实际获得资助是两件事。'),
s('03 范围限定：eligible、not every、in particular','eligible 指符合资格，并不覆盖所有住房；not every type of building work 意味着有些工程不受支持，后句将 decorative repairs 明确列为业主责任。要区分“部分项目不包括”和“任何项目都不包括”。','eligible dwellings / did not cover every type / decorative repairs excluded',[
e('Owners of eligible dwellings could apply.','合资格住宅的业主可以申请。','eligible 缩小可申请群体。'),
e('The retrofit programme did not cover every type of work.','改造计划不涵盖所有工程。','not every 不等于 none。'),
e('Decorative repairs remained the owner’s responsibility.','装饰性维修仍由业主承担。','后句提供明确排除项目。')
],'Not every job is covered 不等同于 No jobs are covered；不能忽略范围不同造成的意义反转。'),
s('04 比较中的 both 与 different 必须同时成立','broader housing subsidies 和 retrofit grant 可能都能支持家庭，但资助活动不同。both supports households 给出共同点，but they fund different activities 给出区别；一段摘要需要同时保留二者，不能把共同点扩张成“相同计划”。','Both support households, but their funded activities differ.',[
e('Both schemes offer support to households.','两类计划都向家庭提供支持。','共同点只在支持对象。'),
e('They fund different activities.','它们资助不同的活动。','这是明确的区别。'),
e('They are identical policies.','它们是相同政策。','与原文 different activities 冲突。')
],'共同目标并不表示申请范围、具体经费项目和审批条件相同；比较题必须核对基准。')
],
questions:[
{question:'原文 This intervention 指向什么？',answer:'Council grants for insulation in older homes.',why:'前句介绍的具体干预是旧住宅隔热工程补助，this intervention 不是泛指全部房屋政策。'},
{question:'The grants were intended to reduce heating demand 是否证明取暖需求已经下降？',answer:'No. It expresses an intended aim, not measured results.',why:'intended to 表示计划目的，原稿没有列出实施后能源需求的测量结果。'},
{question:'not every type of work 等价于 no type of work 吗？',answer:'No. Some work may be covered, but decorative repairs are excluded.',why:'not every 是否定全称，no type 是否定所有；后文明确提供一项排除类别。'},
{question:'两项住房支持政策可以直接称为 identical 吗？',answer:'No. Both support households but fund different activities.',why:'原稿同时承认对象共同点与资助活动差异，不可省略后者。'}
],
output:'用八句双语分析隔热补助的先行词、目的、资格、排除范围和与普通住房补助的比较；每个推断分别注明原文是否支持。',
model:[
e('The council offered insulation grants for older homes.','议会为旧住宅提供隔热补助。','明确行动。'),
e('The phrase this intervention refers to that grant scheme.','this intervention 指向该补助计划。','锁定先行词。'),
e('Its stated aim was to reduce winter heating demand.','它陈述的目标是减少冬季取暖需求。','目标非效果。'),
e('The text does not report measured energy savings.','文本没有报告实测节能量。','明确未知。'),
e('Only eligible dwellings could apply for the support.','只有合资格住宅才能申请援助。','申请限定。'),
e('The scheme did not cover every building task.','该计划不涵盖所有建设工程。','范围否定。'),
e('Decorative repairs remained the owner’s responsibility.','装饰性维修仍由业主负责。','具体排除。'),
e('Other housing subsidies also help households, but fund different activities.','其他住房补贴也帮助家庭，但资助的活动不同。','保留双向比较。')
],
referenceUrls:[REF],sourceNote:'以 en-ielts-reading-u05 原始七句 council grant / insulation / eligible dwellings / decorative repairs 课文为唯一叙事实体。'
},
{
id:'en-reading-u06-hedging-inference',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u06',
title:'作者态度与推断：consistent with 不能写成 proves',subtitle:'从路边叶片观察到可能因果机制之间有多少证据？',
prerequisite:'能够区分事实陈述、可能性、否定、让步与条件。',
objective:'按 observable pattern → compatible explanation → alternative factors → future test 四层建立作者态度，保留 may、appears、tentative 与未隔离混杂因素的范围。',
sections:[
s('01 观察事实不等于因果判断','observational study 表观察研究，本课报告繁忙道路旁的植物叶片较小；这与交通污染有关可能是解释之一，但未有实验隔离污染。把 observed、explained、proved 划分为不同证据阶段。','observed smaller leaves ≠ pollution caused them',[
e('Plants near the busy road developed smaller leaves.','繁忙道路旁植物长出了较小的叶片。','这是报告的观察结果。'),
e('The researchers suspected environmental stress.','研究人员怀疑环境胁迫可能相关。','怀疑不能代替证实。'),
e('The study proved pollution caused the change.','研究证明污染导致这一变化。','原文明确没有控制其他因素。')
],'只要存在可替代解释，不能凭空间相关或一次观察推出确定的单一因果。',
T('证据强度',[['observed','测量或记录的模式','已证实机理'],['consistent with','与某一解释相容','仅可能这一解释'],['tentative','尚待验证的推测','明确结论'],['controlled comparison','未来推荐的方法','已完成的试验']],'强度需要沿论证顺序匹配，而不是以某个科学词语本身判断可靠度。')),
s('02 hedging 词改变判断的力度','may、could、appears to、is consistent with 等限制结论的确定性。consistent with 指与某解释相容，并不排除其他解释；will definitely 和 proves 则更强，超出原文。','may / appears to / consistent with ≠ confirms / proves',[
e('The pattern is consistent with environmental stress.','这一模式与环境胁迫的解释相容。','并非唯一解释。'),
e('Pollution may be one contributing factor.','污染可能是促成因素之一。','may 保留不确定性。'),
e('Pollution is the sole proven cause.','污染是唯一经证实的原因。','与研究限制相反。')
],'不能把 appears to 或 might 删掉，因为这些词承载研究者谨慎态度。'),
s('03 识别未控制因素与 plausible alternatives','土壤差异、供水情况和污染一起变化，研究并未 isolate pollution from soil or water availability。这些可能影响叶片的差异使因果解释仍暂定。other factors 不是已经证明的其他原因，而是尚未排除的候选因素。','pollution vs soil / water availability; not isolated',[
e('The researchers did not isolate pollution.','研究人员没有把污染因素单独隔离。','方法局限。'),
e('Soil conditions could differ between sites.','地点之间的土壤条件可能不同。','潜在替代因素。'),
e('Water availability remained a possible explanation.','供水仍然是可能的解释。','不能把备选变量当成已验证机制。')
],'Alternative explanations exist 不等同于 all alternatives caused the effect；保持“可能”和“已证实”的界限。'),
s('04 研究态度与合乎证据的下一步','tentative 表暂定；controlled comparison 表设计可比较条件以评估各因素的相对作用。作者提议未来开展更受控的比较，而非宣布已经复制证实结论。复述逻辑：observed → compatible → unisolated → test。','tentative explanation → controlled comparison → future investigation',[
e('The authors describe the explanation as tentative.','作者将解释描述为暂定。','明确的作者立场。'),
e('A controlled comparison could distinguish possible factors.','受控比较可以帮助区分候选因素。','未来建议，尚未执行。'),
e('The report invites further investigation.','报告提出值得进一步研究。','最终结论是继续研究，不是已确证因果。')
],'把 proposed future comparison 改写成 researchers completed a controlled trial 就会虚构研究设计与完成状态。')
],
questions:[
{question:'路边叶片较小是 observation 还是 proven causal mechanism？',answer:'An observation, not a proven causal mechanism.',why:'文章描述叶片大小模式，但未将污染从土壤或水源差异中分离。'},
{question:'consistent with pollution 允许写成 caused only by pollution 吗？',answer:'No. Consistency does not exclude alternative causes.',why:'consistent with 仅表示相容；不能由此得出唯一解释。'},
{question:'作者称解释 tentative 的关键理由？',answer:'Pollution was not isolated from soil and water availability.',why:'其他变量没有被控制，作者明确保留因果不确定性。'},
{question:'原文支持的下一步研究是什么？',answer:'A controlled comparison to assess different possible factors.',why:'这一比较是提出的未来方向，并非已经完成的复制试验。'}
],
output:'写八句英语研究摘要，将观察、弱结论、潜在混杂和后续建议分段解释，并加逐句中文。不得宣称污染已被证明是唯一原因。',
model:[
e('The observational study reported smaller leaves beside a busy road.','观察研究记录繁忙道路旁的叶片较小。','观察内容。'),
e('The pattern was consistent with environmental stress.','这一模式与环境胁迫相容。','谨慎表达。'),
e('That consistency did not identify a unique cause.','相容性并不能确定唯一原因。','推论边界。'),
e('The researchers had not isolated pollution.','研究人员尚未单独隔离污染因素。','核心局限。'),
e('Soil conditions could also have varied.','土壤条件也可能不同。','一种潜在混杂。'),
e('Water availability was another possible influence.','供水情况是另一潜在影响。','另一种候选变量。'),
e('The authors called the explanation tentative.','作者把这一解释称作暂定。','作者态度。'),
e('They recommended a controlled comparison before stronger claims.','他们建议先做受控比较，再提出更强的主张。','正确研究顺序。')
],
referenceUrls:[REF],sourceNote:'严格沿 en-ielts-reading-u06 的 fictional plant roadside observational text 及未隔离 soil/water 语义边界编写。'
},
{
id:'en-reading-u07-information-matching-logic',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u07',
title:'Matching Information：定位定义、方法、局限和建议',subtitle:'按 Section A/B/C 的论证功能，而非重复名词匹配',
prerequisite:'会找 topic sentence、识别 because / rather than 和段落主语。',
objective:'准确分辨定义、方法实例、覆盖局限与行动建议，并利用原文具体句子匹配 Section A、B、C；不以词频或章节字母猜答案。',
sections:[
s('01 定义通常回答 what is it','Section A 将 community survey 定义为结构化收集居民意见的方法，标准问题集使回答更易比较。定义提供概念及特征，并非实地调查结果。题干可用 structured collection 同义换写 standardized responses。','definition → Section A / shared question set',[
e('A community survey gathers residents’ views in a structured way.','社区调查以结构化方式收集居民意见。','这是定义。'),
e('A shared question set improves comparability.','统一问题集提升可比性。','定义背景的主要性质。'),
e('Volunteers distributed forms at a market.','志愿者在市场发放表格。','这是方法实例，来自 Section B。')
],'不能因为定义和实例都出现 survey 就把它们当成同一个段落功能。',
T('证据功能与位置',[['definition / comparability','Section A','Section B'],['weekend market pilot','Section B','Section A'],['homebound residents absent','Section B','Section C'],['remote option / report who was missed','Section C','Section A']],'同一 Section 可回答不止一题，除非具体题型指示不允许重复。')),
s('02 方法实例回答 how was it done','Section B 说 volunteers distributed forms at a weekend market，是试点的招募方式；样本只接触到场的人，不能推广为全社区。识别方法实例时寻找地点、动作、参与者，而不是只定位名词 survey。','volunteers → forms → weekend market → sample',[
e('Volunteers distributed forms at a weekend market.','志愿者在周末市场发放问卷。','实施方式与地点。'),
e('The responses came from those reached at the market.','回答来自市场上被接触的人。','调查接触范围。'),
e('Everyone in the community completed a form.','社区所有人都填写了表格。','原文无此陈述。')
],'在场参与者不等于全体居民，也不能直接推断未参与者支持或反对何种观点。'),
s('03 局限回答 who was missed','Section B 的 because 从句明确家庭中未外出者没有被接触到，因而问卷可能低估这类人。may underrepresent 表可能覆盖不足，而不是已测定某个具体比例。','because people at home were not approached → may underrepresent',[
e('People who stayed at home were not approached.','待在家中的人没有被接触。','具体招募局限。'),
e('Responses may underrepresent these residents.','回答可能未充分代表这部分人。','may 保留谨慎。'),
e('Exactly half the community was missed.','恰好遗漏社区一半人。','原文没有相应数字。')
],'未覆盖群体已知，但其规模、倾向和遗漏比例均未给出，不能补造数据。'),
s('04 建议回答 what should change','Section C 建议把面对面与远程可访问选项结合，并说明调查未触及的人群。推荐的两条措施既关注提高覆盖率，也关注报告局限；不能偷换成已全面实施或所有人都可在线填写。','combine face-to-face with remote; report who was not reached',[
e('The authors recommend an accessible remote option.','作者建议提供可访问的远程渠道。','recommendation 不等于已执行。'),
e('They also recommend reporting who was not reached.','他们还建议报告哪些人没有被覆盖。','透明披露样本局限。'),
e('The programme has already reached all residents online.','项目已经在线覆盖全部居民。','超出原文信息。')
],'题目若问“建议”的位置，必须找到情态性语义 advises / recommends，而不是任意出现 remote 的地方。')
],
questions:[
{question:'Which section defines a community survey and explains comparability?',answer:'Section A.',why:'A 提供 structured collection 定义和统一问题集，均属于概念说明。'},
{question:'Which section describes the weekend-market pilot?',answer:'Section B.',why:'B 描述志愿者在周末市场分发表格，是具体实施示例。'},
{question:'Which section reveals who could be underrepresented?',answer:'Section B.',why:'B 明示留在家中的人未被接触，可能覆盖不足。'},
{question:'Which section recommends a remote option and disclosure of exclusions?',answer:'Section C.',why:'C 明确提出结合远程渠道并报告未覆盖人群，两项均为建议。'}
],
output:'按 A–C 分别整理概念、方法、局限、建议；以八句英语给出证据与对应中文，说明为何不能用关键词出现次数代替定位。',
model:[
e('Section A defines a community survey.','A 段给出社区调查的定义。','定义功能。'),
e('It explains why shared questions improve comparison.','它解释统一题目为何便于比较。','定义的支撑特征。'),
e('Section B describes a pilot at a weekend market.','B 段描述周末市场试点。','实施方法。'),
e('Volunteers handed out forms there.','志愿者在那里发放问卷。','方法证据。'),
e('Residents who remained at home were not approached.','留在家里的居民未被接触。','遗漏群体。'),
e('The sample may therefore underrepresent them.','因此样本可能未充分代表他们。','谨慎推断。'),
e('Section C recommends an accessible remote option.','C 段建议提供方便使用的远程方式。','行动建议。'),
e('It also asks researchers to disclose who was missed.','它还要求研究者说明哪些人没有被调查。','报告局限。')
],
referenceUrls:[REF],sourceNote:'与 en-ielts-reading-u07 原稿 Section A 定义/B 市场招募及遗漏/C 远程与报告建议一一对应。'
},
{
id:'en-reading-u08-two-source-synthesis',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u08',
title:'双材料综合：aggregate increase 与 uneven access 可以并存',subtitle:'Passage A 的平均增长与 Passage B 的通勤障碍不是直接冲突',
prerequisite:'理解 whereas、both、several、aggregate 与定性访谈的基本用途。',
objective:'保持 Passage A/B 各自主张和指标，说明总体增加与部分居民仍有交通困难可以同时成立；在综合段落中使用符合证据的让步与限定。',
sections:[
s('01 先分别登记来源、对象、指标','Passage A 报道虚构地区延长周末开放后图书馆平均到访量增加，指标是 aggregate visits；Passage B 访谈周六公交提前停运的若干居民，其描述的是个人可达性和实际收益。指标与样本不同，不能互换。','A: aggregate library visits / B: interviewed residents and bus barriers',[
e('Passage A reports an average increase in visits.','材料 A 报告平均到访次数增加。','汇总指标。'),
e('Passage B reports interviews with several residents.','材料 B 报告对若干居民的访谈。','定性来源。'),
e('Both passages measured the same attendance rate.','两份材料都测量了同一个出席率。','原文没有这样的统一测量。')
],'不同指标和样本下的表面“正负”不自动构成矛盾，要先对齐所测量的变量。',
T('跨材料核对',[['Passage A','地区平均到访量','每个社区的增长量'],['Passage B','若干居民的交通体验','全地区出现障碍的比例'],['both','关注延时开放的实际可达性','均测量同一变量'],['synthesis','同时承认增长与分配差异','把一方判为假']],'来源归属是综合写作的前提，不能先选立场再筛证据。')),
s('02 aggregate 不能自动代表每个 neighbourhood','aggregate = 汇总值。地区平均次数上升不排除个别街区没有受益，甚至有一部分人仍难以到达图书馆。every、all、same gain 是更强的主张，需要细分数据。','district average ↑ ≠ every neighbourhood ↑',[
e('Average visits rose across the district.','该地区平均到访量增加。','总体平均。'),
e('Every neighbourhood had the same gain.','每个街区增长幅度相同。','原文没有细分数据。'),
e('An aggregate increase may coexist with uneven benefits.','总体增长可以与受益不均并存。','分布与均值可不同。')
],'不能仅由平均增幅反推全部个人受益或每一个街区都提高同样幅度。'),
s('03 qualitative interviews 揭示机制，不能给出比例','材料 B 描述若干受访居民指出公交周六提前停运，致使新开放时间对他们帮助有限。several 不是总体代表性样本，也没有所需分母；无法由访谈估计交通障碍在全区有多普遍。','several respondents ≠ district-wide frequency',[
e('Several residents described early bus closures.','几位居民提及公交提前停止运营。','只在访谈范围内有效。'),
e('They received little practical benefit from longer hours.','这些受访者从延时开放中获得的实际益处有限。','并不否定其他地区平均增幅。'),
e('The interviews established the precise district-wide proportion.','访谈确定了全地区障碍的准确比例。','原文没有抽样框或相应数据。')
],'qualitative evidence 可以解释可能机制，却不能凭几个案例推算地区人口占比。'),
s('04 综合写作：whereas、although、both 的可靠用法','whereas 对照不同证据，although 承认一方事实后指出限制，both 只总结双方确实支持的共同点。可靠综合不是机械说 contradictory，而是说明整体均值增长与分配不均可同时为真，并标明后续需更有代表性的资料。','Although A shows average gains, B identifies a possible access barrier.',[
e('Although visits increased overall, some residents faced transport barriers.','尽管总体到访次数增长，部分居民仍面临交通阻碍。','两件事可以同时成立。'),
e('Whereas A reports totals, B describes individual experiences.','A 报告汇总量，而 B 描述个人经历。','准确的来源对比。'),
e('More data are needed to estimate how common the barrier is.','仍需更多数据估计这一阻碍的普遍程度。','明确没有给出总体频率。')
],'不可把 B 的若干访谈扩写为多数居民未受益，也不能把 A 的平均增幅写成所有人都已受益。')
],
questions:[
{question:'Passage A 的结果为什么不能保证所有街区均受益？',answer:'It reports an aggregate increase, not separate neighbourhood outcomes.',why:'总平均不能确定各分组实际情况，文章也未给出分区结果。'},
{question:'Passage B 的访谈是否证实全地区公交障碍的比例？',answer:'No. Several interviews do not establish district-wide prevalence.',why:'缺少代表性样本、分母和覆盖范围，不能从部分受访者推断全体比例。'},
{question:'两篇材料是逻辑上的直接矛盾吗？',answer:'No. Average gains can coexist with unequal access for some residents.',why:'A 描述地区汇总增长，B 描述个别人的困难，两者指标及范围不同。'},
{question:'哪种连接词适合保留均值增长和局部限制？',answer:'Although / whereas, with clear source attribution.',why:'让步与对比需同时明确各来源，不能将两者合并为同一个测量结论。'}
],
output:'写 8–10 句完整的双材料对照段落，用 although、whereas、aggregate、interviews 和 more data；逐句中文对照并注明两个来源的不同证据范围。',
model:[
e('Passage A reports a rise in average library visits.','材料 A 报告平均到访次数增长。','归属 A。'),
e('The finding relates to a fictional district.','这一结果涉及一个虚构地区。','对象。'),
e('It does not give separate outcomes for every neighbourhood.','它没有提供各街区的单独结果。','汇总局限。'),
e('Passage B uses interviews with several residents.','材料 B 访谈了若干居民。','归属 B。'),
e('Some respondents described bus services ending early.','部分受访者描述公交提前停运。','个别障碍。'),
e('They reported limited practical benefit from extended hours.','他们认为延时开放的实际收益有限。','影响对象。'),
e('These reports do not contradict a district-wide average gain.','这些报告并不与地区平均增长矛盾。','可并存。'),
e('More representative data are needed to estimate the barrier’s prevalence.','仍需更有代表性的数据估计问题普遍程度。','未知边界。')
],
referenceUrls:[REF],sourceNote:'严格依据 en-ielts-reading-u08 两篇微型原创材料（虚构地区平均到访量/周六末班公交访谈）的比较关系。'
}
];