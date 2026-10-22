import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,rows?:string[][]):LearningSection=>({title,concept,pattern,examples,caution,...(rows?{table:{title:'本课论证与证据边界',columns:['来源内要素','中文说明','适用限制'],rows,note:'原创城市交通议论文情境；不含可引用的真实城市统计。'} as LearningTable}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK2_U06_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-u06-cause-mechanism-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u06',
 title:'原因与方案句法：拥堵峰值、出行选择和条件推论',
 subtitle:'集中通勤时段与驾车替代不足对应两套不同的措施',
 prerequisite:'已学 Task2 的解释链与条件立场，能理解 if、provided that、could 与 would。',
 objective:'分别追踪两个拥堵机制和相应解决方案，使用条件句表达限制，不将症状当原因，不虚构交通成效。',
 sections:[
 S('01 cause、symptom、consequence 的逻辑位置','peak-hour congestion 是被解释的问题或症状；work/school schedules overlap 和 limited alternatives to driving 是可能的原因。更长等候时间可以是后果，但本原稿没有测得具体的分钟数。','Congestion may reflect ... / one possible cause is ...',[
 E('Peak-hour congestion may reflect overlapping schedules.','高峰拥堵可能反映上下班、上下学时段集中。','原因假设是出行同时发生。'),
 E('Limited alternatives can make driving the practical option.','替代交通方式不足可能使驾车成为较实际的选择。','另一个独立机制是出行方式有限。'),
 E('Congestion itself is not an explanation of why roads are busy.','拥堵本身不能解释道路为何繁忙。','用问题重复问题是循环论证。')
 ],'不能把增加车道当成这两个潜在根因，也不能声称已测得某座真实城市的拥堵时长。',[
 ['Problem: peak-hour congestion','问题：高峰拥堵','未给某真实城市车流量'],
 ['Cause A: concentrated schedules','机制A：出行时间集中','不是所有时段都繁忙'],
 ['Cause B: limited modal alternatives','机制B：替代出行方式不足','不是只有道路宽度问题'],
 ['Consequence: inconvenience','潜在后果：出行不便','没有实测延误分钟数']
 ]),
 S('02 if 与 provided that 表达方案条件','错峰上下学或工作时间可以降低同一时刻的出行量，但前提是雇主和学校能够协调。if / provided that 不是修辞装饰，而是明确结论依赖哪些条件。','Staggering start times could help if employers and schools coordinate',[
 E('Staggered start times could reduce simultaneous travel.','错峰开始时间可能降低同时出行人数。','直接针对时间集中原因。'),
 E('This could work provided that employers and schools coordinate.','前提是用人单位与学校能够协调，这一措施才可能奏效。','明确实施主体与条件。'),
 E('It would not remove the need for transport alternatives.','这并不能消除增加替代出行方式的需要。','错峰不解决所有交通问题。')
 ],'不能把 could reduce 写成 would eliminate，也不可以把现实协调条件当作已经实现的事实。'),
 S('03 could make feasible 不等于保证选择改变','更频繁的公共交通可能使部分通勤者能够改用其他方式。feasible 只说明选择变得可行，不意味着所有人必然改乘，也不能证明拥堵一定消失。','More frequent services could make an alternative feasible for some commuters',[
 E('More frequent buses could offer a workable alternative.','班次更频繁的公交可能提供可行的替代选择。','针对缺少驾车替代方式。'),
 E('Some commuters might then choose another mode.','部分通勤者随后可能选择其他交通方式。','保留人群与可能性限制。'),
 E('This does not establish that traffic would disappear.','这并不能证明交通拥堵将彻底消失。','避免结果过强。')
 ],'原稿没有提供公交覆盖率、票价、道路通行容量或改乘比例，不能用具体数字装作有证据。'),
 S('04 解决方案完整句要同时回答谁、如何、如何检验','完整建议应包含针对哪个原因、由谁实施、如何产生作用以及以后如何评估。比较试行前后同一时段的旅行量可能是一种建议，但教材没有真实测量结果。','To address X, actor Y could do Z, and success could be checked by...',[
 E('Transport authorities could assess whether more frequent services attract users.','交通管理部门可以评估加密班次是否吸引用户。','提出可检验方案，并非报告已实现效果。'),
 E('Schools and employers would need to coordinate start times.','学校和雇主需要协调开始时间。','明确行动者。'),
 E('A credible proposal states the cause, actor and evaluation method.','可信方案须交代原因、责任方与评估方式。','完成因果到措施的闭环。')
 ],'“提高交通意识”若不说明具体如何改变通勤选择及由谁执行，仍然是空泛建议。')
 ],
 questions:[
 Q('What underlying problem does staggering start times address?','Concentrated work and school travel at the same time.','错峰直接针对出行时间集中，不会自动补足公共交通选择。'),
 Q('Why is “more roads will eliminate congestion” not a valid conclusion?','Road capacity alone does not address overlapping schedules or limited alternatives completely.','原稿明确道路扩容不能全面解决两个已讨论的原因。'),
 Q('Which conditional actors must coordinate staggered schedules?','Employers and schools must coordinate their starting times.','原稿的错峰建议明确有学校和雇主协调这一前提。'),
 Q('How should a proposed intervention be made assessable?','State its target cause, responsible actors and a way to check the effect.','可执行的解决方案必须能从原因追溯到行动者和评估指标。')
 ],
 output:'写至少250词的 Task2 原创原因与解决方案议论文，精确对齐两类交通根因、两个措施和保障条件，附完整自然中文，严禁虚构交通统计。',
 model:[
 E('Peak-hour congestion may arise from overlapping schedules and limited alternatives.','高峰拥堵可能来自通勤时间重叠及替代方式不足。','先识别两类原因。'),
 E('The first mechanism concentrates many journeys into the same period.','第一个机制把大量行程集中于同一时段。','解释原因。'),
 E('Staggered start times could spread those journeys over more hours.','错峰开始时间可能让行程分散到更长时段。','措施与机制匹配。'),
 E('Such a policy depends on cooperation between schools and employers.','这一政策依赖学校与雇主之间的协作。','保留条件。'),
 E('A second problem is that some commuters have few options besides driving.','另一问题是部分通勤者除驾车外选择很少。','区分另一机制。'),
 E('More frequent public transport could make a different mode feasible.','更密集的公共交通班次可能使其他方式可行。','针对选择不足。'),
 E('Neither proposal is suitable everywhere or free of cost.','两项建议都不是处处适用或没有成本。','真实限制。'),
 E('Their effects should be checked before claiming they have solved congestion.','宣称已经解决拥堵之前，应先核查措施效果。','证据边界。')
 ],referenceUrls:[REF],sourceNote:'完全以 en-ielts-writing-task2-u06.json 原稿的两种可能原因和两种条件性措施为据；无真实交通调查或政策成效。'
},
{
 id:'en-task2-u06-solution-evaluation-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u06',
 title:'城市交通与执行词汇：peak hour、stagger、feasible、evaluate',
 subtitle:'从症状陈述扩展到可实施、可检验的方案',
 prerequisite:'能用英文描述交通高峰、公交替代与同时出行。',
 objective:'区分 road capacity、public transport frequency、staggered schedules、feasible 和 coordination，避免把建议说成已验证的公共政策。',
 sections:[
 S('01 peak-hour congestion 与 capacity','peak hour 是出行集中的时段，congestion 是交通拥堵；road capacity 是道路容纳能力。扩容是可能采取的措施，不等于造成拥堵的唯一原因。','peak-hour congestion / road capacity / concentrated demand',[
 E('The problem occurs during peak commuting hours.','问题发生于通勤高峰时段。','原稿讨论时间集中。'),
 E('Road capacity alone is not a complete explanation.','道路通行能力本身不是完整解释。','还要考虑出行时间与替代方式。'),
 E('Expanding capacity would not automatically change school schedules.','扩容不会自动改变学校的时间安排。','区分方案作用目标。')
 ],'不能把 peak-hour congestion 翻译成“全天道路都拥堵”，也不能增加具体每日车流量。',[
 ['peak-hour congestion','高峰拥堵','强调时段集中'],
 ['staggered starting times','错峰开始时间','要求学校和雇主协调'],
 ['frequent public transport','更密集的公交服务','针对替代选择不足'],
 ['evaluation of effects','效果评估','只是拟议核查，非实测结果']
 ]),
 S('02 stagger 与 coordinate 是不同动作','stagger 表示把开始时间错开，coordinate 表示多个组织之间协调以便实际执行。一个机构自行改时间，未必产生全区域交通改善。','stagger start times / coordinate between employers and schools',[
 E('Schools could stagger the beginning of classes.','学校可以错开课程开始时间。','stagger 描述安排变化。'),
 E('Employers may need to coordinate their own schedules.','雇主可能需要协调各自的时间安排。','主体不同但需要合作。'),
 E('Coordination is a condition for the proposed benefit.','协调是提出收益的成立条件。','不当作已落实。')
 ],'不能把协调条件删除后仍写成该措施无论如何都会奏效；学校和雇主是否配合仍需实际确认。'),
 S('03 feasible 与 effective 的证据要求不同','feasible 表示在一定条件下实际可选，effective 指措施达到预期结果。公交增班可能让一部分通勤者改乘变得 feasible，但还需要观测才能证实 effective。','make another mode feasible / assess whether it is effective',[
 E('Frequent buses might make a switch feasible.','班次更密集可能使换乘公交成为可行选择。','指有条件可做。'),
 E('Actual uptake would need to be evaluated.','实际选择公交的人数变化仍需评估。','未提供实测数据。'),
 E('Feasibility does not establish the scale of an effect.','可行性并不能证明效果大小。','避免越界推断。')
 ],'不可把 possible improvement 翻译成“拥堵必然消失”；原文没有实际试点结果。'),
 S('04 evaluate 与 eliminate 代表不同确信程度','evaluate 意味着调查效果，eliminate 是彻底消除。原稿只建议评估和可能缓解问题，不支持任何政策能完全消除道路拥堵的绝对表达。','evaluate outcomes / may reduce / cannot be said to eliminate',[
 E('Authorities should evaluate the effect of the changes.','相关部门应评估措施影响。','这是行动建议。'),
 E('The measures could help reduce peak-hour pressure.','措施可能缓解高峰压力。','could help 为谨慎判断。'),
 E('There is no basis for claiming congestion would be eliminated.','没有依据声称拥堵会被彻底消除。','绝对结论未被支持。')
 ],'不能把“提高认识”当作独立完整方案，必须说明对象、责任方和可验证的行为改变。')
 ],
 questions:[
 Q('What is staggered in the proposed transport policy?','Starting times for work and school travel are staggered.','错开的不是道路位置，而是工作与学校的开始时间，从而针对同时出行。'),
 Q('What does feasible mean in this reading?','A different transport mode could become practically possible for some commuters.','可行并不等于所有人都会选择这种方式或拥堵已减少。'),
 Q('Are road capacity and limited driving alternatives the same thing?','No. Road capacity concerns space for traffic; alternatives concern available travel modes.','两者作用于不同机制，原稿说扩容不能完整解决问题。'),
 Q('Which verb requires stronger measured evidence, reduce or eliminate?','Eliminate, because it claims the problem has been removed completely.','彻底消除需要比可能缓解更强的效果证据，而原文没有提供。')
 ],
 output:'将八个交通词汇写成针对原因的双语方案说明，再写至少250词原因与解决方案作文，区分建议、条件和已证实效果。',
 model:[
 E('Peak-hour congestion is the problem described in the scenario.','本情境的问题是高峰期拥堵。','识别症状。'),
 E('Overlapping work and school times may concentrate demand.','上下班与上下学时间重叠可能集中需求。','机制一。'),
 E('Staggered schedules could spread travel across time.','错峰安排可能使出行时间分散。','措施一。'),
 E('Implementation would require coordination among institutions.','实施需要机构之间的协调。','条件。'),
 E('Limited public-transport alternatives may encourage driving.','公共交通替代选择不足可能鼓励驾车。','机制二。'),
 E('Additional services could make another mode feasible.','增加班次可能使其他方式可行。','措施二。'),
 E('Evaluation must identify what each measure actually changes.','评估应识别各项措施实际改变的内容。','验证。'),
 E('Neither option can be assumed to eliminate all congestion.','不能假设任何一项措施消除全部拥堵。','结论范围。')
 ],referenceUrls:[REF],sourceNote:'本课是虚构城市交通写作情境，仅传授词义、方案对接和核验标准，不代表政策效果。'
}
];