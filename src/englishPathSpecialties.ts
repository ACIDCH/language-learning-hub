import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** IELTS-facing language lessons. Sentences are original illustrative exercises, not invented source results. */
export const ENGLISH_PATH_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-academic-passive',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u01',
 title:'学术语篇中的被动语态：焦点、时态和证据来源',
 subtitle:'从主动句到准确交代研究操作的客观陈述',
 prerequisite:'掌握 be 的基本时态、过去分词和主谓宾结构。',
 objective:'判断何时应突出对象或过程，并正确使用 be + 过去分词的基本时态，避免通过被动语态隐藏必要的证据来源。',
 sections:[
 sec('01 被动语态改变信息焦点',
 '主动语态通常以动作执行者为主语，被动语态可以把被处理、被观察或被测量的对象放在句首。研究方法与流程描述经常需要强调被测对象；但涉及信息来源的判断仍应明确谁提出了结论。',
 'active: researchers measured usage → passive: usage was measured',[
 e('Researchers collected the responses.','研究人员收集了回答。','主动语态突出研究人员。'),
 e('The responses were collected by researchers.','回答由研究人员收集。','被动语态突出数据对象。'),
 e('The rooms were checked at regular intervals.','房间按固定间隔接受检查。','执行者不是当前重点，省略 by 短语是可以的。')
 ],'被动语态不能使一条未经验证的因果主张变成证据：It was proved that… 仍需要说明实际支持程度。',
 {title:'信息焦点变化',columns:['主动句','被动句','主要关注点'],rows:[['The team checked the rooms.','The rooms were checked.','房间和检查过程'],['The team recorded usage.','Usage was recorded.','记录的指标'],['The team reviewed the notes.','The notes were reviewed.','受处理材料']],note:'被动语态把原宾语提升为新主语，但并不自动解释动作的可靠性。'}),
 sec('02 be 随时态变化，分词保持一致',
 '被动语态的基本结构是 be + past participle。现在时用 is/are，过去时用 was/were，现在完成时用 has/have been。选择时态必须由报告描述的时间决定，不因想让文章听起来学术就任意改变时态。',
 'is/are measured · was/were measured · has/have been measured',[
 e('The library is cleaned every morning.','图书馆每天早晨都会打扫。','一般现在时被动描述常规工作。'),
 e('The equipment was tested yesterday.','设备昨天接受了测试。','过去时 was tested 与明确过去时间对应。'),
 e('Several methods have been compared.','几种方法已经得到比较。','现在完成被动结构 have been compared。')
 ],'The equipment was test 缺少过去分词 tested；has been compare 也不正确。',
 {title:'常见被动时态',columns:['时态','结构','示例'],rows:[['一般现在','is / are + p.p.','is measured'],['一般过去','was / were + p.p.','was measured'],['现在完成','has / have been + p.p.','has been measured'],['一般将来','will be + p.p.','will be measured']],note:'这里只列常用形式；更复杂的被动时态应依据具体上下文学习。'}),
 sec('03 报告观察和报告结论不是同一行为',
 'measure、record、compare 表示研究过程或数据操作；suggest、indicate、demonstrate 描述证据与结论的关系。即使方法句采用被动语态，仍必须区分测量值与被讨论的学习成果。',
 'were observed / were recorded / the evidence suggests',[
 e('Room occupancy was recorded during the observation.','观察期间记录了房间占用情况。','说明测量过程而非学习成绩。'),
 e('The observations were compared across time periods.','不同时间段的观察结果得到比较。','跨时段比较不等于做因果实验。'),
 e('These observations alone do not demonstrate improved achievement.','这些观察本身不足以证明学业成绩改善。','明确维持证据限制。')
 ],'The effect was proven 不能凭被动形式替代原材料中的 uncertain / may / suggests 等限定词。'),
 sec('04 从研究方法句到谨慎的小段落',
 '准确的学术复述一般依次交代研究问题、实际观察内容和能够支持的结论。被动句可以减少重复的人名或主体，但如果报告的是讲者自己的观点，应明确使用 The lecturer suggests / argues 等归属表达。',
 'question → method (passive) → result (reported carefully) → limitation',[
 e('The lecture asks whether additional study areas could improve learning.','讲座提出增设学习区是否能改善学习的问题。','whether 保留开放研究问题。'),
 e('Facility use was observed at different times.','在不同时段观察了设施使用情况。','被动语态交代方法。'),
 e('However, these observations do not measure academic outcomes.','但是这些观察并不能衡量学业成果。','保留指标与结论的界限。')
 ],'不能把 an observed association 写成 a demonstrated cause；语态改变不授权提升证据强度。')
 ],
 questions:[
 {question:'把 Researchers checked the rooms yesterday. 改成被动句。',answer:'The rooms were checked yesterday.',why:'一般过去时 be 用 were，check 的过去分词为 checked。'},
 {question:'填空：The results have ___ reviewed.',answer:'been',why:'现在完成时被动结构为 have/has been + 过去分词。'},
 {question:'纠错：The data was record last week.',answer:'The data were recorded last week.',why:'这里 data 采用正式复数用法，用 were；record 需要过去分词 recorded。'},
 {question:'The rooms were measured 是否可以推出成绩提高？',answer:'不能；该句只说明执行了测量，并未给出学业成果证据。',why:'研究操作、观察结果和因果结论是不同的论证层级。'}
 ],
 output:'写 90–120 词学术方法摘要：清楚交代研究问题、两项数据操作、一个实际可观察变量和一项证据限制。至少使用两处被动结构。',
 model:[
 e('The lecture examines a question about study-space provision.','讲座讨论学习空间供给的问题。','说明研究主题，不预判结论。'),
 e('Room occupancy was recorded at different times.','不同时间段的房间占用情况得到记录。','被动句描述观察。'),
 e('Patterns of facility use were then compared.','随后比较了设施使用的模式。','被动句描述比较操作。'),
 e('However, such data do not directly measure educational achievement.','但这些数据无法直接测量教育成绩。','结论只限定到指标边界。'),
 e('Further evidence would be needed before drawing causal conclusions.','作因果结论前仍需要更多证据。','语气保留审慎条件。'),
 e("The first observation concerns whether the rooms were occupied, not whether students achieved higher scores.","第一种观察涉及房间是否有人使用，而非学生成绩是否更高。","区分使用指标和学习结果。"),
 e("Because the measures address different questions, the proposed educational benefit cannot be inferred from usage alone.","由于测量回答的是不同问题，不能单凭使用量推断教育收益。","because 引出方法与结论不匹配的原因。"),
 e("Any interpretation must therefore be limited to the information that was actually collected.","因此，所有解释都必须限制在实际收集的信息范围内。","结论限定在数据边界内。"),
 e("If learning outcomes are assessed later, those findings should be reported separately and attributed to the relevant source.","如果之后评估学习成果，相关发现应独立报告并注明实际来源。","假设未来情形，不声称已发生。"),
 e("This separation allows a report to describe the procedure accurately without exaggerating the strength of its conclusions.","这种区分使报告能够准确描述方法，又不夸大结论的证据力度。","归纳方法与表达关系。")
 ],
 referenceUrls:['https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives','https://englishprofile.org/?menu=english-vocabulary-profile'],
 sourceNote:'按 en-ielts-reading-u01 的研究阅读和语法拆解目标重写；使用 British Council 被动结构说明作语法核验。'
},
{
 id:'en-relative-clauses',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u03',
 title:'限制性与非限制性定语从句：定位对象、补充信息',
 subtitle:'从识别名词所指到理解长句中的限定范围',
 prerequisite:'认识简单句中的主语和宾语；已使用 who、which、that 构造基本修饰语。',
 objective:'能区分识别对象所必需的信息与附加说明，正确处理 who/which/that、关系代词省略和非限制性从句标点。',
 sections:[
 sec('01 从句决定“指的是哪一个”',
 '限制性定语从句提供识别先行词所必需的信息，通常不使用逗号。who 修饰人，which 修饰物，that 可在多数限制性从句中指人或物。读长句时先找到核心名词，再判定从句说明的是哪个对象。',
 'the students who attended / the report that describes usage',[
 e('The students who attended the lecture took notes.','参加讲座的学生做了笔记。','who attended the lecture 说明是哪些学生。'),
 e('The report that discusses occupancy has three sections.','讨论占用率的报告有三个部分。','that 引出限制性修饰信息。'),
 e('The method which the lecturer described was simple.','讲者介绍的那种方法很简单。','which the lecturer described 补充识别方法的信息。')
 ],'不能将限制性从句随意加逗号；标点会改变信息是必需限定还是附加说明。'),
 sec('02 关系代词是主语还是宾语',
 '如果关系代词在从句中充当主语，通常不可省略；如果它作动词宾语，在限制性从句中常可省略。区分的简便方法是观察关系代词后是否已经出现另一个明确主语。',
 'the source (that) we checked / the source that supports the claim',[
 e('The paper that explains the method is useful.','解释该方法的论文很有用。','that 是 explains 的主语，不能省略。'),
 e('The paper (that) we discussed is useful.','我们讨论过的那篇论文很有用。','we 是从句主语，that 作宾语可省略。'),
 e('The figures which were collected last week are incomplete.','上周收集的数据不完整。','which 承担从句主语位置，不能省略。')
 ],'The paper explains the method is useful 不能作为省掉主语关系代词后的正常限制性从句。'),
 sec('03 非限制性从句补充而不筛选',
 '非限制性从句用逗号将补充说明和主句区分开来，信息不是确定所指对象所必须的。常用 who、which、whose；这种从句不使用 that，也不能把关系词省略。将是否有逗号误读，可能改变研究对象范围。',
 'The survey, which was anonymous, included several questions.',[
 e('The report, which was published recently, discusses facility use.','该报告近期发表，内容涉及设施使用情况。','报告对象已经确定，which 引出附加背景。'),
 e('The lecturer, who studies student services, described the method.','那位研究学生服务的讲者介绍了方法。','who 引入额外信息，不再筛选是哪位讲者。'),
 e('The author, whose work focuses on education, raised a limitation.','那位研究重点是教育的作者指出了一项局限。','whose 表示所属关系。')
 ],'非限制性从句不能写 The report, that was published recently, …；应用 which 并保留逗号。'),
 sec('04 读学术长句时先还原主干',
 '面对多层修饰语，先圈出主句主语与谓语，再分别解释限制性和非限制性从句。最后核查从句的逻辑对象：某项解释究竟修饰 data、method 还是 people，决定了所能推出的结论。',
 '主句 → 先行词 → 从句功能 → 范围是否变化',[
 e('The observations that concern room usage were reviewed.','涉及房间使用情况的观察记录得到复核。','限定 which observations 而非全部观察。'),
 e('Those observations, which were collected in the evening, were limited.','那些观察记录是在晚间收集的，因此范围有限。','which 提供附加的时间背景。'),
 e('The conclusion that follows from the data is modest.','从这些数据得出的结论是审慎的。','that follows from the data 限定是哪一个结论。')
 ],'阅读时不要把从句省略后把所有观察都解释为同一研究结论，尤其要保留 only、some、that 等范围限制。')
 ],
 questions:[
 {question:'哪句强调“符合条件的那些学生”：The students who joined the seminar… / The students, who joined the seminar,… ?',answer:'The students who joined the seminar…',why:'无限定逗号的从句缩小对象范围，用于识别哪些学生。'},
 {question:'改错：The report, that was released yesterday, is useful.',answer:'The report, which was released yesterday, is useful.',why:'非限制性定语从句不能使用 that，应使用 which。'},
 {question:'是否可省略：The paper that we read was relevant.',answer:'可以写 The paper we read was relevant.',why:'we 已经是从句主语，that 作宾语可省略。'},
 {question:'是否可省略：The paper that explains the method is relevant.',answer:'不可以省略 that。',why:'that 是 explains 的主语，省略会破坏关系从句结构。'}
 ],
 output:'写 7–9 句英文说明一篇虚构研究报告：至少两个限制性从句、一个非限制性从句和一个对结论范围的限定。',
 model:[
 e('I read a report that examined how students use shared study areas.','我读了一份研究学生如何使用共享学习区域的报告。','限制性从句限定是哪份报告。'),
 e('The observations that concerned evening usage were discussed separately.','晚间使用情况的观察记录单独讨论。','限定观察子集。'),
 e('The report, which was intended as an illustration, did not claim a causal effect.','该报告意在说明问题，没有提出因果效应主张。','非限制性从句提供背景。'),
 e('The conclusion was restricted to the patterns that the observations supported.','结论仅限于观察能够支持的模式。','who/that 范围限定与证据边界。'),
 e("Those students who used the rooms during the observation period were not necessarily representative of everyone on campus.","在观察期使用房间的学生并不一定能代表全校学生。","限制性从句明确对象，同时保留代表性限制。"),
 e("The researchers, whose original aim was to describe usage, did not set out to measure examination results.","这些研究者原本旨在描述使用情况，并未计划测量考试结果。","非限制性 whose 从句解释研究目的。"),
 e("For this reason, a claim that describes facility demand is narrower than a claim about educational improvement.","因此，描述设施需求的主张比描述教育改善的主张范围更窄。","that describes 是限制性定语从句。"),
 e("When reading such a report, I would identify the main clause first and then check which information each relative clause adds.","阅读这类报告时，我会先识别主句，再核查每个关系从句增加了什么信息。","说明解读策略，避免修饰关系错位。")
 ],
 referenceUrls:['https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-non-defining-relative-clauses'],
 sourceNote:'与 en-ielts-reading-u03 的段落主旨及长句定位相匹配；本项目重写例句，按 British Council 的定语从句规则交叉校验。'
},
{
 id:'en-task1-trend-lexicon',type:'vocabulary',language:'en',level:'B1',unitLink:'en-ielts-writing-task1-u02',
 title:'图表趋势词汇：升降、稳定、波动与程度',
 subtitle:'从读懂走势到写出证据充分的对比句',
 prerequisite:'认识基本过去时和数字、百分比、年份表达。',
 objective:'能区分 increase/rise、decrease/fall、remain stable、fluctuate 以及幅度副词，准确描述图表实际提供的信息。',
 sections:[
 sec('01 升降：动词与名词搭配不能混用',
 'increase、rise、fall、decrease 既可能用作动词也可能用作名词，但构句形式不同。the rate rose 与 there was a rise in the rate 表达同一方向，不能误把 in 放到动词 rise 后当作宾语。具体数字必须来自实际图表。',
 'rose from A to B / a rise in N / fell by X',[
 e('The proportion rose from 20% to 30%.','该比例由20%升至30%。','from…to… 明确起点和终点；此为语言演示数字。'),
 e('There was a rise in the proportion.','这一比例出现了上升。','a rise 是名词结构，通常接 in + 指标。'),
 e('The figure fell by ten percentage points.','这一数值下降了十个百分点。','by 交代变化量，percentage points 不等于 percent。')
 ],'从 20% 到 30% 是增加 10 个百分点，相对增幅则为 50%；不能把 percentage points 和 percent 混写。',
 {title:'方向与句型对应',columns:['表达类型','典型搭配','中文'],rows:[['动词上升','rise from A to B','从A上升到B'],['名词上升','a rise in the rate','比率的上升'],['动词下降','fall by 5 units','下降5个单位'],['名词下降','a fall of 5 units','下降5个单位']],note:'示例数字用于语言教学，不能作为任何真实统计图表的数据。'}),
 sec('02 稳定与波动并不等于没有变化',
 'remain stable 表示整体保持稳定；level off 可以表示经历变化后趋于平稳；fluctuate 表示有升有降。选择哪一个词必须检查时间顺序：一条有起伏但总体不变的线，也不宜只写 the figure remained stable。',
 'remained stable / levelled off / fluctuated between A and B',[
 e('The figure remained stable during the final period.','这一数值在最后一段时间保持稳定。','稳定指所描述区间内变化很小。'),
 e('After an initial rise, the trend levelled off.','最初上升后，走势趋于平稳。','level off 说明前后阶段改变。'),
 e('The value fluctuated between two levels.','这个数值在两个水平之间波动。','fluctuate 强调反复升降。')
 ],'fluctuate 并不等于持续增加；如果只有一次上升，通常不能称其为反复波动。'),
 sec('03 程度副词与客观幅度',
 'slightly、gradually、steadily、sharply 等修饰趋势，但它们代表不同信息：slightly 是幅度较小，gradually 是发生过程逐渐展开，steadily 表示变化连续相对稳定，sharply 常指短期或明显的大幅变化。不要只凭最终差值臆断走势是否持续稳定。',
 'increase slightly / rise gradually / fall sharply / grow steadily',[
 e('The proportion increased slightly in the final year.','该比例在最后一年小幅增长。','slightly 描述增幅。'),
 e('The number rose gradually throughout the period.','这一数量在整个时期逐渐增长。','gradually 描述上升过程。'),
 e('The figure dropped sharply at the end.','该数值在末期急剧下降。','sharply 是大幅度下降的修饰语。')
 ],'steadily 表示变化比较稳定，不等于 rapidly；需要根据曲线实际形态选词。'),
 sec('04 从总体概述到具体比较',
 'Task 1 报告中先识别最重要的总体特征，再挑选两到三个确有数据支持的比较。句子必须交代指标、时间段、变化方向；没有具体数值时可以写定性概述，不能捏造百分比。',
 'overview → main change → comparison → measured detail',[
 e('Overall, one category increased while the other declined.','总体而言，一类上升，另一类下降。','总览只对比方向，不虚构数字。'),
 e('The first category was consistently higher than the second.','第一类在整个时期一直高于第二类。','consistently higher 需要图上每个相应时段都支持。'),
 e('By the end of the period, the gap had narrowed.','到这个时期结束时，二者差距已经缩小。','narrowed 描述类目间差距。')
 ],'不应为了“高级词汇”而写 dramatically、approximately 或 doubled，除非图表数据确实支持。')
 ],
 questions:[
 {question:'从 20% 到 30% 增加了多少百分点？',answer:'10 percentage points.',why:'30 减 20 等于 10 个百分点；相对增幅另按起点计算。'},
 {question:'把 The rate rose. 改成 a rise 的名词句。',answer:'There was a rise in the rate.',why:'名词 rise 通常与 in the rate 组合。'},
 {question:'哪种表达适合“先涨后保持稳定”？',answer:'The figure rose initially and then levelled off.',why:'level off 表达变化阶段结束后的趋稳状态。'},
 {question:'解释 fluctuate 与 rise steadily 的差别。',answer:'fluctuate 是多次上下波动；rise steadily 是持续、相对稳定地增长。',why:'前者不表示单向走势，后者体现较稳定的上升。'}
 ],
 output:'假设有两条不同走势的示意曲线，为其编写 100–130 词英文 Task 1 报告；不可虚构来源数据。包含总览、至少两项比较和三种不同趋势搭配。',
 model:[
 e('The two categories followed different overall patterns.','两类指标总体呈现不同的走势。','概述先描述方向。'),
 e('The first category increased steadily throughout the period.','第一类在整个时期稳定增长。','使用 steadily 限定形态。'),
 e('By contrast, the second category fluctuated before levelling off.','相比之下，第二类先波动，然后趋于平稳。','fluctuate 与 level off 描述不同阶段。'),
 e('The comparison should be supported by the figures shown in the chart.','具体比较应由图表中展示的数据支持。','示范侧重语言组织，不伪装成真实报告。'),
 e("In the illustrative first series, the increase appears gradual rather than sudden.","在示意的第一条序列中，上升显得逐步发生而非突变。","仅描述假想走势，不声称有外部图表。"),
 e("The second series shows short-term changes in both directions, so it would be inaccurate to describe it as a continuous rise.","第二条序列短期内上下变化，因此不能说它一直在上升。","解释 fluctuate 的实际含义。"),
 e("Once the second series becomes more stable, the phrase levelled off is more suitable than continued to fluctuate.","当第二条序列逐渐稳定后，用 levelled off 比 continued to fluctuate 更合适。","词汇选择依据阶段变化。"),
 e("The overview should present these contrasting patterns before any supporting measurements are introduced.","在列出具体测量值之前，总览应先交代这两条对照走势。","说明总体描述顺序。"),
 e("If exact values are available, the final sentences should state the relevant units, start and end points, and differences.","如果有精确数值，最后几句应说明相应单位、起止值及差异。","明确数值写作的证据要求。"),
 e("Without those values, numerical percentages or comparisons must not be invented.","若缺乏这些数据，不能凭空编写百分比或数值比较。","与实际图表保持一致。")
 ],
 referenceUrls:['https://englishprofile.org/?menu=english-vocabulary-profile','https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA'],
 sourceNote:'对应既有 Task1 U02 趋势描述主题，原创的百分比仅为词汇形式演示，未声称课程提供某份真实图表。'
},
{
 id:'en-reading-evidence-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u04',
 title:'阅读论证词汇：证据、范围、反证与推断',
 subtitle:'把关键词分成“提出主张—支持—限定—反驳”四类',
 prerequisite:'能够识别简单主谓结构及 although、however、because 等连接词。',
 objective:'能区分 claim、evidence、suggest、demonstrate、qualify、contradict、not necessarily，并在阅读题中保留证据范围。',
 sections:[
 sec('01 先识别主张，而不是直接判定真伪',
 'claim 是某人提出的主张，未必为真；argue 强调论证某立场；suggest 可表达线索支持但尚不确定的解释。做阅读判断时应先确定陈述归属于作者、讲者还是被引用研究，而不是把所有说法当成客观事实。',
 'make a claim / argue that / suggest that',[
 e('The author makes a claim about access to facilities.','作者提出了一项有关设施可及性的主张。','make a claim 不自带已证实含义。'),
 e('The passage argues that convenience matters.','文章论证便利性很重要。','argues that 表明论述立场。'),
 e('The findings suggest a possible association.','这些发现提示可能存在关联。','suggest 和 possible 都限制结论力度。')
 ],'argues 或 claims 不能直接替换为 proves，后者语义力度明显更强。'),
 sec('02 evidence、data 与 observation 不同',
 'data 指数据，observation 指观察或观察结果，evidence 指可用于支持某项判断的证据。同一数据可能适合回答“房间什么时候有人”，却不适合回答“学习成绩是否提升”。学习这些词必须同时记住研究问题和所测量的变量。',
 'collect data / make observations / provide evidence / support a claim',[
 e('The team collected data on room usage.','团队收集了有关房间使用情况的数据。','on room usage 指定了所测变量。'),
 e('The observations were limited to weekdays.','观察仅限于工作日。','limited to 交代适用范围。'),
 e('The evidence does not support the stronger claim.','这些证据不足以支持更强的主张。','support a claim 是证据与断言间的关系。')
 ],'evidence 在一般含义下不可数，通常说 some evidence 或 a piece of evidence，不说 an evidence。',
 {title:'论证词组与语义层级',columns:['词组','主要功能','中文'],rows:[['collect data','收集信息','收集数据'],['make an observation','描述观察','进行一次观察'],['provide evidence','支持判断','提供证据'],['support a claim','建立支持关系','支持主张'],['contradict a claim','出现相反证据','反驳或与主张矛盾']],note:'词组本身不能替代对原文证据的判读；支持或反驳须依赖实际材料。'}),
 sec('03 限定范围的词往往决定题目答案',
 'some、only、at least、at most、may、not necessarily 都改变命题可适用的对象或证据力度。阅读 True/False/Not Given 时，题干若从 some students 变为 all students，就产生了额外的普遍化条件；不能凭两个句子共享大部分关键词便认为意思相同。',
 'some / only / not necessarily / may / at least',[
 e('Some students preferred quiet rooms.','部分学生更喜欢安静的房间。','some 不能自动扩展为 all。'),
 e('Occupancy does not necessarily indicate better learning.','占用情况不一定意味着学习效果更好。','not necessarily 否定必然性，不等于否定一切关联。'),
 e('The observation covered only two evenings.','这项观察只涵盖两个晚上。','only 限定时间和样本范围。')
 ],'not necessarily 与 definitely not 不同：前者是“不能保证”，后者是“确定不成立”。'),
 sec('04 同义改写必须保留逻辑关系',
 '近义词替换不是简单词面替换。indicate、suggest 和 demonstrate 证据强度不同；associated with 不等于 caused by。完整阅读判断还应确认作者是否确实提到了对应变量与结论，缺失的信息应与明确矛盾的信息区分。',
 'associated with ≠ caused by；suggest ≠ prove',[
 e('Room use may be associated with exam schedules.','房间使用情况可能与考试安排相关。','associated with 表达关联，不保证因果。'),
 e('The data do not establish a causal effect.','这些数据并未确立因果效应。','没有证明不能反向推断效应一定不存在。'),
 e('Further evidence would be needed to evaluate outcomes.','还需要更多证据才能评估结果。','would be needed 表示尚需进一步证据。')
 ],'“没有证据证明改善”不等于“有证据证明没有改善”，这是阅读判断中非常重要的语义区别。')
 ],
 questions:[
 {question:'some students 是否可改写为 all students？',answer:'不能。',why:'some 只表明部分对象，不支持扩大为全体。'},
 {question:'改错：The study provides an evidence.',answer:'The study provides evidence. / The study provides a piece of evidence.',why:'一般意义下 evidence 不可数，数量单位用 a piece of evidence。'},
 {question:'associated with 是否必然意味着 caused by？',answer:'不意味着。',why:'关联关系和因果关系的论证要求不同。'},
 {question:'“The evidence does not prove X” 是否等于 “The evidence proves not-X”？',answer:'不等于。',why:'缺乏足够支持与有证据支持相反命题，属于不同的逻辑状态。'}
 ],
 output:'读一段包含 may、only、some 和 not necessarily 的研究陈述，用英语写 90–110 词评价：作者主张、具体证据、范围限定和仍然未知的事项。',
 model:[
 e('The author reports observations about study-space usage.','作者报告了有关学习空间使用的观察。','先明确信息来源。'),
 e('The figures indicate when some rooms were occupied.','数字表明部分房间何时有人使用。','限定观察对象。'),
 e('However, this information does not necessarily measure learning outcomes.','但这类信息不一定能衡量学习结果。','保留 not necessarily。'),
 e('The evidence therefore supports a narrower conclusion about usage, not a causal claim about achievement.','因此，证据能支持的是使用情况的较窄结论，而不是学业表现的因果断言。','将 claim 范围限制到可证实部分。'),
 e("A statement about all students would go beyond these observations if the original sample included only some students.","如果原样本只包括部分学生，关于全体学生的陈述就会超出这些观察。","some 与 all 改变命题范围。"),
 e("Similarly, a report of correlation does not demonstrate that one change caused another.","同样，相关性报告不能证明一种变化导致另一种变化。","关联与因果应区别。"),
 e("The words may and not necessarily are therefore important because they preserve the strength of the original argument.","因此 may 和 not necessarily 非常重要，因为它们保留了原论证的确定程度。","保留限定语。"),
 e("If a detail is absent from the passage, the reader should not invent it or treat the omission as a direct contradiction.","如果文章没有某项信息，读者不能自行编造或把缺失当作直接矛盾。","区分信息不足与反证。"),
 e("Accurate paraphrasing depends on the relationships between claims, observations and limitations, not simply on repeated keywords.","准确改写取决于主张、观察和限制之间的关系，而不只是关键词重复。","从单词辨认升级为逻辑理解。")
 ],
 referenceUrls:['https://englishprofile.org/?menu=english-vocabulary-profile','https://www.cambridge.org/core/journals/english-profile-journal/article/completing-the-english-vocabulary-profile-c1-and-c2-vocabulary/418955FC7ED2455E98A499BC40C2C816'],
 sourceNote:'对接现有 en-ielts-reading-u04 True/False/Not Given 的范围识别任务，例句与解析原创，参考 Cambridge EVP 的义项/语块组织原则。'
}
];