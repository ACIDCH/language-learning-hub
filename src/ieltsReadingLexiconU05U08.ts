import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
const table=(rows:string[][],note:string):LearningTable=>({title:'功能词组与中文对应',columns:['词组','含义','作用'],rows,note});
const ref='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
export const IELTS_READING_LEXICON_U05_U08:SpecialtyLesson[]=[
{
id:'en-reading-u05-retrofit-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u05',
title:'Housing retrofit 词汇链：grant、insulation、eligible 与责任边界',subtitle:'从申请对象和改造项目理解介入计划，而非重复背单字',
prerequisite:'理解名词修饰与 be intended to，认识基本住宅和能源词。',
objective:'使用 grants for insulation、eligible dwellings、roof/wall improvements、decorative repairs、owner’s responsibility 准确概括补助内容。',
sections:[
s('01 资助类词组与受助资格','a grant 通常为补助款，apply for help 是提出申请，eligible dwelling 指符合资助条件的住宅。注意 receive a grant 比 apply for a grant 更进一步：申请资格不保证审批成功。','offer grants for / owners of eligible dwellings / apply for help',[
e('The council offered grants for insulation.','议会提供隔热补助。','grant 表资助项目。'),
e('Owners of eligible dwellings could apply.','符合资格的住房业主可以申请。','eligible 限定对象。'),
e('Applying does not guarantee receiving a grant.','申请并不保证拿到补助。','资格、申请与批准三个状态不同。')
],'不能将 eligible 解读为 every owner automatically received assistance。',
table([['grant for insulation','隔热补助','资助项目'],['eligible dwelling','符合资格的住宅','受助资格'],['apply for assistance','申请支持','申请阶段'],['receive funding','收到资助','结果阶段']],'受助资格和实际获得不应混淆。')),
s('02 改造工程：insulation、retrofit 与 heating demand','insulation 是隔热材料/隔热施工；retrofit 是对现有住宅做改造；roof/wall improvements 是原课可申请项目；winter heating demand 是冬季取暖需求，而不是建造新住房的总量。','home insulation / retrofit programme / roof and wall improvements',[
e('The programme supported roof and wall improvements.','计划支持屋顶和墙体改善。','属于隔热改造的工程对象。'),
e('Retrofitting modifies an existing building.','改造是在既有建筑上作调整。','与新建房屋区别。'),
e('Reduced heating demand was an intended benefit.','降低取暖需求是计划期望的收益。','尚无实测效果结果。')
],'retrofit programme 不等于 construction of new homes；original text is about older homes。'),
s('03 支持范围外的项目','decorative repairs 指装饰性维修，remain the owner’s responsibility 表由业主自己承担。in particular 将具体例子和总限制连起来；不能凭原文推出所有维修都由业主付款。','exclude decorative repairs / remain the owner’s responsibility',[
e('Decorative repairs were not covered.','装饰维修不在补助内。','明示排除范围。'),
e('Those repairs remained the owner’s responsibility.','这些维修仍由业主承担。','责任归属。'),
e('Insulation projects and decorative repairs are distinct.','隔热工程与装饰维修不同。','不是全部建筑工作同一类别。')
],'not cover decorative work 不等于 refuse all applications；不能偷换成计划一概不资助。'),
s('04 比较同一问题下不同政策','intervention 表干预/措施，housing subsidy 泛指住房补贴。两类计划都可 support households，但 funded activities 不同。阅读词汇要连同指代和对比关系记忆，避免把名词类别作为精确身份。','this intervention / broader housing subsidies / fund different activities',[
e('This intervention targeted insulation improvements.','这一措施针对隔热改善。','this 回指具体前句。'),
e('Broader subsidies may support other activities.','范围更广的补贴可能支持其他活动。','不能假定相同范围。'),
e('The policies are related but not identical.','两项政策有关联但不相同。','保持共同点和差异。')
],'intervention 是上义词，并不意味着所有具有这个名字的计划是相同政策。')
],
questions:[
{question:'eligible dwellings 是已经收到款项的住房吗？',answer:'No. They qualify to apply; the text does not confirm payment.',why:'eligible 只说明住宅满足提出申请的条件；原文的 could apply 并没有说明所有申请均获批或资金已经发放。'},
{question:'“改造旧住宅”的英语搭配？',answer:'retrofit existing homes / a retrofit programme',why:'retrofit 表对现有建筑实施改善，不是建造新的住宅。'},
{question:'谁承担 decorative repairs？',answer:'The owner remains responsible for decorative repairs.',why:'原文把 decorative repairs 明确列为补助范围之外，并说明这项工程继续由业主自行承担，不等于全部工程都无法申请。'},
{question:'冬季取暖需求属于已测结果还是预期目标？',answer:'An intended objective: reduce winter heating demand.',why:'intended to 是目的；文章不包含节能效果测量结果。'}
],
output:'使用八个固定搭配写明住宅隔热补助的对象、申请、工程范围、排除项目和与一般补贴的差异，写中英对照。',
model:[
e('The council proposed insulation grants for older homes.','议会为旧宅提出隔热补助。','原稿的项目。'),
e('Eligible homeowners could apply for assistance.','符合资格的房主能够申请援助。','申请而非已批准。'),
e('The plan focused on roof and wall improvements.','计划主要关注屋顶及墙面改善。','工程对象。'),
e('It was intended to reduce winter heating demand.','旨在减少冬季取暖需求。','非实测结果。'),
e('The retrofit was not a general building-repair grant.','改造计划不是一般建筑维修补助。','限定范围。'),
e('Decorative repairs remained the owner’s responsibility.','装饰维修仍由业主自己负责。','具体排除。'),
e('Other housing subsidies may support different activities.','其他住房补贴可能支持不同活动。','类别区分。'),
e('The shared aim of support does not make the policies identical.','共同帮助家庭的目标不使政策完全相同。','总结比较。')
],
referenceUrls:[ref],sourceNote:'以 en-ielts-reading-u05 council retrofit 原文六个核心词为唯一事实框架原创扩写。'
},
{
id:'en-reading-u06-science-caution-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u06',
title:'Science evidence 词汇链：observational、tentative、causal、replicate',subtitle:'词语表达的是证据阶段，不是文章听上去是否“科学”',
prerequisite:'理解 may / could、consistent with 和简单研究方法术语。',
objective:'用 observational pattern、compatible explanation、unisolated factors、controlled comparison 与 replicate 正确描述研究的观察、解释和待验证问题。',
sections:[
s('01 观察术语与对象','observational study 是在未控制全部条件下观察；leaf size 是叶片大小；busy road 标明样本位置。observed pattern 描述测到的关系，不代表某机制被证明。','observational study / smaller leaves / alongside a busy road',[
e('The study was observational.','这是一项观察性研究。','研究设计类型。'),
e('Smaller leaves were reported near the road.','路边记录了较小叶片。','描述观察。'),
e('The measured pattern did not isolate a cause.','观察到的模式并未隔离原因。','事实层与解释层分开。')
],'observational 不是 controlled experimental；名称直接影响能否推出因果。',
table([['observational study','观察性研究','记录模式'],['causal mechanism','因果机制','解释变化为何产生'],['confounding factor','潜在混杂变量','可能造成观察差异'],['controlled comparison','受控比较','拟议进一步检验']],'每个词组对应不同证据强度。')),
s('02 解释力度与作者态度','tentative 表暂定，plausible 表可能有道理，compatible with 与…相容。它们都不等于 proven。用词时应标明说话主体和所讨论的解释，而不是只抄 hedge 单词。','tentative explanation / plausible account / compatible with',[
e('The explanation remains tentative.','这一解释仍是暂定的。','作者明确谨慎。'),
e('Environmental stress is a plausible account.','环境胁迫是一种可能合理的解释。','不等于唯一解释。'),
e('The pattern is compatible with several hypotheses.','模式可与若干假设相容。','不排除其他。')
],'tentative conclusion 不能译为“已经确立的结论”；要保留未定性。'),
s('03 潜在变量与研究步骤','pollution、soil conditions、water availability 是有待区分的变量；account for the pattern 可表示解释观察模式，而 account for differences 在本课意为考虑不同影响。replicate 表在后续研究中重复验证，原稿尚未报告重复验证已成功。','isolate pollution / account for variation / replicate findings',[
e('The team did not isolate pollution from soil conditions.','研究团队没有将污染与土壤条件区分隔离。','方法限制。'),
e('Water availability could account for part of the pattern.','供水可能解释一部分模式。','候选解释。'),
e('Replication would test whether the pattern recurs.','重复验证可检验模式是否重现。','未来目标。')
],'replicate 与 report 不是同义：报告一次观察不代表做了重复研究。'),
s('04 总结用两列：已知与未知','已知路边叶片较小；未知的是该模式究竟由哪一具体因素导致。较好的总结还会说明推荐受控比较，而不是从缺少结论得出“研究毫无意义”。','observed → tentative → not isolated → test further',[
e('The observation provides a reason to investigate.','这一观察提供继续研究的理由。','保留研究价值。'),
e('The causal explanation has not been established.','因果解释尚未成立。','准确标明未知。'),
e('A controlled comparison could test alternatives.','受控比较可以检测替代解释。','后续方法。')
],'没有因果结论不意味着没有任何观察数据；研究局限不应被绝对化。')
],
questions:[
{question:'tentative 与 proven 哪个更符合原课态度？',answer:'Tentative.',why:'研究者未隔离污染与土壤/供水因素，因而明确表示解释只是暂定。'},
{question:'replicate findings 在这里表示什么？',answer:'Repeat an investigation to check whether results recur.',why:'replicate 指在其他条件下重复研究以检验结果能否重现；原文章并没有报告实际完成重复试验的数据。'},
{question:'account for the pattern 在研究句中表示？',answer:'Explain or help explain the observed pattern.',why:'account for 在此表解释模式，而不是百分比占有。'},
{question:'哪种术语对应下一个推荐的方法？',answer:'A controlled comparison.',why:'原课建议下一阶段安排 controlled comparison 以区别污染、土壤和水源的影响，这仍是计划而不是已完成的因果检验。'}
],
output:'写 8 句研究说明按方法、观察、解释、混杂因素和未来建议排序，逐句中文对照，不能把假设改为已证实因果。',
model:[
e('An observational study examined plants near a road.','一项观察性研究考察道路旁的植物。','设计。'),
e('It documented a pattern of smaller leaves.','它记录了叶片较小的模式。','观察。'),
e('The result is compatible with environmental stress.','结果与环境胁迫相容。','弱推论。'),
e('The team gave a tentative explanation.','团队提出暂定解释。','作者态度。'),
e('Pollution was not isolated from soil differences.','污染未与土壤差异隔离。','潜在混杂。'),
e('Water availability may also account for the pattern.','供水可能同样解释部分模式。','候选解释。'),
e('A controlled comparison would help identify causes.','受控比较有助识别原因。','未来方向。'),
e('Replication could add confidence if the pattern recurs.','如果模式再现，重复验证可增加信心。','条件限制。')
],
referenceUrls:[ref],sourceNote:'严格限制于 en-ielts-reading-u06 原文的路边叶片、环境胁迫、污染/土壤/水源、受控比较设定。'
},
{
id:'en-reading-u07-survey-method-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u07',
title:'Survey methodology 词汇链：respondent、coverage、distribution 与 limitations',subtitle:'把定义、调查分发和未覆盖人群的关系说完整',
prerequisite:'认识 sample、questionnaire、participant 与定义句。',
objective:'按 section function 使用 structured collection、shared question set、volunteer distribution、underrepresentation 和 accessible remote option，准确说明研究如何实施、谁被遗漏、如何改进。',
sections:[
s('01 调查定义与设计','survey 是有计划地收集看法，respondent 是实际回答的人；shared question set 提供可比较的回答结构。不要把所有居住在区域中的居民自动算成 respondents。','community survey / structured collection / shared question set',[
e('The survey used a structured question set.','调查使用结构化问题集。','方法设计。'),
e('A respondent is a person who answers.','受访者是实际回答的人。','定义区别。'),
e('Shared questions support comparison across responses.','统一问题便于回答之间比较。','解释作用。')
],'respondents 不是全部居民；被调查对象、收到问卷者和答卷者也未必同一集合。',
table([['respondent','实际答卷者','样本主体'],['distribution','问卷发放过程','触达渠道'],['coverage','人群覆盖程度','是否有遗漏'],['recommendation','改进建议','尚未执行措施']],'统计单位和工作环节应分别记录。')),
s('02 现场发放过程','volunteers distributed forms at a weekend market 是参与者、动作、地点及时间构成的完整事实。questionnaire distribution 不等同于 data analysis；收到表格不保证填写和返回。','volunteers distributed / market recruitment / approach respondents',[
e('Volunteers distributed forms at the weekend market.','志愿者在周末市场发放表格。','实际招募渠道。'),
e('Visitors could receive a questionnaire.','到访者有机会领到问卷。','可接触对象。'),
e('The team could not reach residents who stayed home.','团队没能接触留在家中的居民。','发放局限。')
],'distribute 与 complete 不是同义，发放数不能自动等于有效答卷数。'),
s('03 coverage 与 representativeness','coverage 描述抽样渠道覆盖人群的情况；underrepresent 是覆盖不足，may underrepresent 表可能。若没有随机抽样及完整名单，市场调查不应被称为全体社区的代表性样本。','limited coverage / underrepresent homebound residents',[
e('The market method had a coverage limitation.','市场方法存在覆盖范围限制。','具体问题。'),
e('Homebound residents may be underrepresented.','不出门的居民可能被低估。','谨慎措辞。'),
e('The sample represents everyone in the area.','样本代表当地所有人。','不支持这样的总体外推。')
],'“可能少代表”与“已经证实占比多少”不是同一结论；原文没有任何人群比例数字。'),
s('04 改进方案和方法透明度','remote option 是远程答卷渠道，accessible 表便于使用；report who was not reached 指在报告里披露未覆盖群体。两项建议目的不同：提高触达，以及让读者了解剩余限制。','combine face-to-face and remote / disclose non-coverage',[
e('The authors recommend combining distribution channels.','作者建议结合多种发放渠道。','改善覆盖。'),
e('An accessible remote option may reach more people.','易用的远程选项可能触达更多人。','可能改进非保证。'),
e('Researchers should report who was not reached.','研究者应报告哪些群体未被覆盖。','报告透明度。')
],'recommend remote access 不表示已经实施远程调查或得到代表性结果。')
],
questions:[
{question:'respondent 与 resident 是否完全相同？',answer:'No. A respondent answered the survey; a resident may not have been contacted.',why:'只有真正答卷的人才属于 respondents；住户本身未必接触问卷。'},
{question:'谁负责在周末市场发放问卷？',answer:'Volunteers distributed the forms.',why:'志愿者是原文行动主体，weekend market 是地点。'},
{question:'underrepresent 的意思是什么？',answer:'To include too few members of a group relative to that group.',why:'underrepresent 指某一人群在问卷样本中出现不足；仅凭遗漏情况不能推断被遗漏者对调查主题持何种意见。'},
{question:'Section C 有哪两项方法建议？',answer:'Add an accessible remote option and report which residents were not reached.',why:'远程选项希望增加问卷覆盖，披露未接触者则改善报告透明度；C 段只提出这两项建议，未声称完成实施。'}
],
output:'写八句英语解释问卷从设计、分发、样本局限到改进措施的顺序，配中文并区分建议和已实施。',
model:[
e('The community survey used a shared set of questions.','社区调查使用一套相同问题。','设计。'),
e('The aim was to compare residents’ responses.','目的是便于比较居民回答。','目的。'),
e('Volunteers distributed forms at a weekend market.','志愿者在周末市场发问卷。','实施。'),
e('Only people reached through that channel could respond.','只有这一渠道接触的人有机会答卷。','范围。'),
e('Residents who stayed home were not approached.','留在家里的人未被接触。','遗漏。'),
e('They may therefore be underrepresented.','因此他们可能未得到充分代表。','谨慎推断。'),
e('A remote option was proposed to improve coverage.','提出用远程选项改善覆盖。','建议。'),
e('Reporting non-coverage would make the limitation clear.','披露未覆盖者能让局限更清晰。','透明报告。')
],
referenceUrls:[ref],sourceNote:'严格遵循 en-ielts-reading-u07 原始三段 community survey 文章，示例信息均属课程虚构情境。'
},
{
id:'en-reading-u08-access-equity-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u08',
title:'Evidence synthesis 词汇链：aggregate、disparity、indicator、qualitative',subtitle:'平均数与访谈分别能回答什么，不能回答什么',
prerequisite:'理解 averages、several、whereas、not necessarily 和调查样本限制。',
objective:'用 aggregate result、unequal benefit、transport barrier、qualitative interviews、representative data 和 reconcile 两份材料并给出证据有限的总结。',
sections:[
s('01 aggregate 与 neighbourhood 差异','aggregate result 是合并多个地点后的汇总结果，disparity 指差异；不能只看 overall increase 就推断每个 neighbourhood 同样受益。indicator 是所用的观测指标，访客次数与个人交通体验不是同一指标。','aggregate visits / local disparity / measured indicator',[
e('The district recorded an aggregate increase.','地区记录了总体增长。','汇总结果。'),
e('The increase does not describe every neighbourhood.','增长不能代表每个街区。','对空间分布的局限。'),
e('Different indicators require different interpretations.','不同指标需要不同解读。','先核对指标。')
],'overall average 不是每个个人的经历；不能从平均量反推均匀分布。',
table([['aggregate','汇总数据','整体层级'],['disparity','受益差异','分组层级'],['indicator','用以测量的指标','比较对象'],['qualitative interview','定性访谈','机制与体验']],'总体与个别体验并不互相排斥。')),
s('02 transport barrier 与实际可达性','access 不只是建筑是否开放，末班车安排也是可达性条件。bus service ends early 是交通障碍，practical benefit 指现实中的使用价值；运营时间加长可能对无法抵达的人收益有限。','transport barrier / early bus termination / practical benefit',[
e('Bus services ended early on Saturdays.','周六公交提前停运。','交通条件。'),
e('Several residents described limited practical benefit.','一些居民描述实际收益有限。','限定参与者范围。'),
e('Weekend hours alone did not solve their travel barriers.','仅延长周末开放时段未解决这些人的交通障碍。','受访者经历范围。')
],'不能由部分人遭遇交通问题直接认定新开放时间对全部居民毫无价值。'),
s('03 qualitative interviews 与代表性','qualitative 用于理解体验和原因，representative data 更适合推算总体比例。几位受访者能揭示可能存在的障碍，但不能证明全地区多少人有相同困难。','qualitative accounts / representative sample / prevalence',[
e('The interviews identified a possible mechanism.','访谈识别了一种可能机制。','揭示障碍。'),
e('They did not establish district-wide prevalence.','它们没有确定全地区出现该问题的比例。','不是分母估计。'),
e('More representative data would help measure its reach.','更有代表性的数据可评估问题的覆盖范围。','后续研究。')
],'qualitative 不等于不可信；它回答的问题与汇总统计不同。'),
s('04 reconcile 两份材料的有效顺序','reconcile 不是强行让两份来源说相同的话，而是解释不同层级证据为何可以共同成立。先复述 A 的汇总变化，再说明 B 的个别局限，最后指出总体频率未知。','whereas A reports an average, B documents a barrier',[
e('The two passages are not necessarily contradictory.','两份材料不一定相互矛盾。','确认层级不同。'),
e('A general gain can coexist with unequal access.','整体收益可以与获取机会不均并存。','协调解释。'),
e('Further data are required to estimate the barrier’s prevalence.','仍需更多数据估计交通障碍的普遍程度。','结论边界。')
],'不能把“普遍程度尚待调查”写成“多数人都遇到困难”；综合更需要保留缺失信息。')
],
questions:[
{question:'aggregate result 指什么？',answer:'An overall combined result across the district.',why:'aggregate 把地区层面的数合并，不能显示各街区的独立变化。'},
{question:'哪条词组对应末班车形成的问题？',answer:'a transport barrier',why:'交通障碍来自周六公交服务提前结束，受访者虽能面对延时开放的图书馆，却可能难以完成返程。'},
{question:'访谈能计算障碍在全区的确切比例吗？',answer:'No. The interviews do not establish district-wide prevalence.',why:'几位受访居民的叙述可以揭示交通障碍，但没有代表性抽样或全区人数分母，不能用来计算障碍在全区的普遍程度。'},
{question:'reconcile 两份资料的适当结论？',answer:'The overall rise and unequal practical benefits may coexist.',why:'整体增幅与部分人未受益分别发生在不同层级，逻辑上可以同时成立。'}
],
output:'写八句双材料综合说明，先划分来源和指标，再解释收益差异以及仍缺的代表性数据；提供逐句中文译文。',
model:[
e('Passage A reported an aggregate rise in library visits.','材料 A 报告图书馆到访量汇总增长。','整体。'),
e('The result did not identify every neighbourhood’s outcome.','结果不能揭示每个街区的变化。','层级限制。'),
e('Passage B used qualitative interviews.','材料 B 使用定性访谈。','方法。'),
e('Several residents described early bus closures.','几位居民讲述公交提前停运。','受访者范围。'),
e('The transport barrier limited their practical access.','交通障碍限制了他们的实际可达性。','影响机制。'),
e('This does not contradict the district-wide average increase.','这不与地区整体平均增长直接矛盾。','协调解释。'),
e('The prevalence of that barrier remains unknown.','该障碍的普遍程度仍未知。','未知。'),
e('Representative data would help measure unequal benefits.','代表性数据将有助测量受益不均。','后续研究。')
],
referenceUrls:[ref],sourceNote:'原 en-ielts-reading-u08 A/B 双资料为唯一事例，未虚构具体涨幅或障碍覆盖率。'
}
];