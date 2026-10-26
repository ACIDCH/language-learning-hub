import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const T=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['原始数据或表达','准确中文','判断边界'],rows,note});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(table?{table}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';

export const IELTS_TASK1_U03_U04_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task1-u03-comparison-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u03',
 title:'统计比较句的语法：对象、倍数和让步',subtitle:'严格按照 A/B/C 三校区交通方式比例完成比较',
 prerequisite:'认识比较级、比例百分号，以及 whereas、compared with 的基本用法。',
 objective:'保持比较对象、指标和分母一致，熟练区分 twice as high as、percentage points、whereas 与不存在的数据。',
 sections:[
 S('01 同一校区、同一指标才可以比较','本课虚构表给出自行车和公交两种通勤方式分别占各校区通勤者的比例。比较句先明确校区与交通类别，再给出百分数和对照。campus B 的公交 50% 可以同校区自行车 25% 比较，但不能把来自两个不同群体的比例当作人数。',
 'X% of commuters at campus B used buses, compared with Y% who cycled',[
 E('At campus B, 50% used buses, compared with 25% who cycled.','在 B 校区，50% 的通勤者乘公交，而 25% 骑自行车。','同校区、同样以通勤者为分母。'),
 E('At campus A, cycling accounted for 40%, while buses represented 30%.','在 A 校区，自行车占 40%，公交占 30%。','while 用于并列对照，不暗示时间变化。'),
 E('Campus C recorded 35% for cycling and 20% for bus use.','C 校区骑行比例为 35%，公交比例为 20%。','明确两项百分比属于同一个校区。')
 ],'这组数据不包含每个校区的通勤者总人数；50% 不能译成“五十人”，也不能跨校区直接计算人数差。',
 T('校区与交通方式原始表',[['Campus A: cycle 40%, bus 30%','A 校区骑车 40%，公交 30%','只记录两种方式'],['Campus B: cycle 25%, bus 50%','B 校区骑车 25%，公交 50%','公交最高'],['Campus C: cycle 35%, bus 20%','C 校区骑车 35%，公交 20%','骑行高于公交'],['Remaining modes: unspecified','其他通勤方式未提供','不可自拟具体类别']],'这张虚构校区通勤表不同于页面上可独立练习的借阅渠道统计图。')),
 S('02 倍数是比值，百分点是减法','B 校区公交 50% 对骑行 25%，比值为 2，因此说 twice as high as 或 double the proportion。差额为 50−25=25 percentage points。倍数、百分点与相对百分比描述不同数学关系，不能混作同一种量。',
 'twice as high as / double the proportion / exceed ... by 25 percentage points',[
 E('The bus share at B was twice as high as the cycling share.','B 校区公交比例是自行车比例的两倍。','50÷25=2，明确倍数分母为 25%。'),
 E('Bus use at B exceeded cycling by 25 percentage points.','B 校区公交比例比骑行高 25 个百分点。','50%−25%=25 个百分点。'),
 E('Cycling at A exceeded bus use by 10 percentage points.','A 校区自行车比例比公交高 10 个百分点。','40%−30%=10 个百分点。')
 ],'不能将 25 percentage points 译为“增加 25%”，也不能把 B 校区两项的差额称为时间上的增长。'),
 S('03 whereas、while 和 compared with 的范围','whereas 用来并列两个彼此对照的分句；while 在统计写作中也常表示“而”，不必指同时发生。compared with 后可跟完整名词短语。每个关系词都必须连接与图表相符的比较，不能凭连接词推出原因。',
 'Campus A favoured cycling, whereas campus B favoured buses',[
 E('Cycling was more common at A, whereas buses were more common at B.','A 校区更常见骑行，而 B 校区更常见乘公交。','两校区交通方式的排序相反。'),
 E('The cycling proportion at C was 35%, compared with 20% for buses.','C 校区骑行比例为 35%，相比之下公交为 20%。','compared with 指向清晰的第二对象。'),
 E('While buses led at B, cycling led at both A and C.','B 校区以公交占优，而 A、C 两校区均以骑行占优。','概述保留三个校区的排序差异。')
 ],'不能把 while 误译成时间先后；也不能根据不同校区的统计比例断言政策、偏好变化或其他因果关系。'),
 S('04 overview 概括模式，不枚举无证据类别','一段好的概述先指出最显著的对照：B 校区公交最高，A/C 校区骑行更高。之后主体段再选 50/25、40/30、35/20 的数据证明概述。全表只提供两类方式，即使两项相加不到 100%，也不能捏造“其余全部开车”。',
 'Overall, buses dominated at B, whereas cycling was higher at A and C',[
 E('Overall, bus use was highest at campus B.','总体而言，B 校区公交比例最高。','只比较三校区已给出的公交比例。'),
 E('Cycling was more prevalent than bus use at the other two campuses.','另外两个校区的骑行比例均高于公交。','符合 A:40>30、C:35>20。'),
 E('The table does not identify the other modes of commuting.','该表并未说明其他通勤方式是什么。','对于缺失类别须明确证据边界。')
 ],'绝不可把每校区的两项加总误认为涵盖所有通勤方式，也不能写“私家车占其余比例”作为已知事实。')
 ],
 questions:[
 Q('B 校区公交比例是骑行的几倍，差多少个百分点？','Twice as high; a difference of 25 percentage points.','原表 B 校区公交为 50%，骑行为 25%；50÷25=2 且 50−25=25 个百分点，两种单位不可互换。'),
 Q('将“B 校区乘公交最多，A、C 校区骑行占优”写成 overview。','Overall, buses dominated at campus B, whereas cycling was more common at campuses A and C.','B 的公交 50>25；A 的骑行 40>30；C 的骑行 35>20，概述只使用这些明确关系。'),
 Q('Can the unspecified share be called car commuting?','No. The other transport categories are not identified.','表中只列公交和骑行，没有说明其余方式的名称，剩余比例不能自动归于汽车。'),
 Q('Why is a rise in cycling at A an invalid claim?','The table compares campuses, not different years.','单一时间截面的校区对照不构成时间序列；rise 需要时间前后两个测量点。')
 ],
 output:'用英文完成一个 overview 与两段比较细节；如进行完整 IELTS Academic Task 1 模拟，全文不少于 150 词，逐段附中文。不得使用不存在的时间序列或通勤人数。',
 model:[
 E('The table compares two commuting modes across three fictional campuses.','该表对比三个虚构校区的两种通勤方式。','开头交代范围。'),
 E('It reports percentages rather than absolute numbers of commuters.','数据是百分比而非通勤者的绝对人数。','强调分母信息限制。'),
 E('Overall, buses were the leading listed mode at B.','总体而言，公交在 B 校区列出的方式中占首位。','概述一。'),
 E('By contrast, cycling led at both A and C.','相反，在 A 和 C 校区骑行均高于公交。','概述二。'),
 E('At B, the bus share was 50%, twice the 25% share for cycling.','B 校区公交比例为 50%，是骑行 25% 的两倍。','比值正确。'),
 E('At A, cycling reached 40%, compared with 30% for buses.','A 校区骑行占 40%，公交占 30%。','十个百分点之差。'),
 E('At C, cycling stood at 35% and bus use at 20%.','C 校区骑行占 35%，公交占 20%。','十五个百分点之差。'),
 E('Other transport categories are not specified in the table.','表格没有列出其他交通方式的具体类别。','不虚构剩余构成。')
 ],referenceUrls:[REF],sourceNote:'数据只取 content/lesson-drafts/en-ielts-writing-task1-u03.json 的自编 A/B/C 校区通勤表；另一个页面借阅渠道图是独立任务。'
},
{
 id:'en-task1-u03-comparison-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u03',
 title:'图表比较核心搭配：proportion / exceed / percentage point',subtitle:'从读数到自然、准确、有依据的比较段落',
 prerequisite:'能够区分百分号 % 与百分点差，已读过本课 A/B/C 校区数据表。',
 objective:'把 proportions、account for、exceed、commute、gap、respectively 组合成完整比较句，并检查数值及指代。',
 sections:[
 S('01 proportion 与 percentage 是份额，不是人数','proportion 表示整体中所占份额，percentage 为其百分数表示；the proportion of commuters who cycle 必须说明被统计对象。commute 是日常往返通勤，不等同于休闲骑车。写作时始终保留原始指标，避免把“通勤方式使用率”写成“购买率”。',
 'the proportion of commuters / account for 40% / commute by bicycle',[
 E('Cycling accounted for 40% of commuters at A.','A 校区骑自行车通勤者占 40%。','accounted for 后接份额，分母是通勤者。'),
 E('The proportion using buses was highest at B.','乘公交的比例在 B 校区最高。','与 A、C 的公交比例比较。'),
 E('The figures describe commuting modes.','这些数字描述的是通勤方式。','并非各校区总人口或出行次数。')
 ],'the number of commuters 与 the proportion of commuters 不是同义词；没有总人数不能由百分数还原人数。',
 T('图表词汇与使用场景',[['account for 40%','占 40%','适合份额'],['the proportion of commuters','通勤者所占比例','先明确分母'],['exceed ... by 10 percentage points','高出 10 个百分点','绝非 10% 增速'],['twice the share','份额为两倍','保持同一校区指标']],'比例搭配应与源表中的指标同时出现。')),
 S('02 exceed / lead / follow 表达排名而非因果','exceed 表示数值超过，be higher than 是中性比较，lead 表示在所列项目里占优。使用 lead 时应限定为题面已列方式；本表没有覆盖所有类别，不能说某种方式一定是整个校区最普遍的交通工具。',
 'exceed ... by / be higher than / the leading listed mode',[
 E('At C, cycling exceeded bus use by 15 percentage points.','C 校区骑行比例比公交高出 15 个百分点。','35−20=15。'),
 E('At B, buses led among the two modes shown.','在 B 校区已列的两种方式中，公交居首。','限定 among the two modes shown。'),
 E('At A, buses followed cycling in the table.','在 A 校区，这张表中公交比例低于骑行。','不暗示其他方式的真实排名。')
 ],'如果将 leading listed mode 简写成 the most common mode of transport，读者会误以为所有类别都被统计。'),
 S('03 gap 与 percentage point 的词义边界','gap 可以表示两项百分比的差额，percentage point 是百分比相减的结果单位。relative increase 则是以基期数据为分母计算变动率；本课没有时间信息，不能使用 increase 或 decline 来描述各校区之间的差。',
 'a gap of 15 percentage points / a difference between proportions',[
 E('The gap at A was 10 percentage points.','A 校区两项差额为 10 个百分点。','40%−30%。'),
 E('The gap at B was 25 percentage points.','B 校区两项差额为 25 个百分点。','50%−25%。'),
 E('No year-on-year change is reported.','题目没有提供同比变化。','空间横向比较不等于时间变化。')
 ],'25 percentage points 不等于 a 25% increase；源表没有任何年份，不能虚构增长趋势。'),
 S('04 whereas / respectively 用于清晰的信息配对','respectively 意为“分别”，必须保证前后项目顺序一一对应。whereas 用于两组确实不同的数据。并列多个百分比时，可以将校区、方式和数字放在同一完整句子中，减少误指或把 A 的值归给 C。',
 'A and C recorded 40% and 35% for cycling, respectively',[
 E('Cycling stood at 40% and 35% at A and C, respectively.','A、C 校区骑行比例分别为 40% 和 35%。','顺序为 A=40、C=35。'),
 E('B recorded 50% for buses, whereas A recorded 30%.','B 校区公交占 50%，而 A 校区占 30%。','同一种方式的跨校区对照。'),
 E('At C, the respective figures for cycling and buses were 35% and 20%.','C 校区骑行和公交的对应比例分别为 35% 和 20%。','先后指代不可颠倒。')
 ],'respectively 两边的顺序必须严格相同，错误的词序会把正确数字写成错误事实。')
 ],
 questions:[
 Q('用 account for 写 A 校区骑行占 40%。','Cycling accounted for 40% of commuters at campus A.','account for 接 40% 且点明统计的通勤者。'),
 Q('What is the gap at campus C?','15 percentage points between cycling and bus use.','35%−20%=15 个百分点，不能写成十五人的差。'),
 Q('Why must lead be qualified in this task?','Only cycling and bus use are listed; other transport modes are unspecified.','对列出的类别排名，不意味着全部方式排名。'),
 Q('写一句 respectively 描述 A、C 两校区骑行比例。','Cycling accounted for 40% at A and 35% at C, respectively.','A 对应 40%，C 对应 35%，配对方向不得颠倒。')
 ],
 output:'写一个七至十句的图表说明，至少自然使用 proportion、account for、exceed、percentage points、respectively，逐句配中文并对照校区通勤表。',
 model:[
 E('The table gives the proportions of commuters using two modes.','表格给出使用两种通勤方式的人所占比例。','指标定义。'),
 E('The three locations are fictional campuses A, B and C.','三个地点是虚构的 A、B、C 校区。','来源限定。'),
 E('At A, cycling accounted for 40%.','A 校区骑行占 40%。','份额。'),
 E('Bus use there stood at 30%.','该校区公交占 30%。','there 指 A。'),
 E('At B, the bus proportion reached 50%.','B 校区公交比例达到 50%。','校区 B。'),
 E('It exceeded cycling by 25 percentage points.','公交比例比骑行高 25 个百分点。','50−25。'),
 E('At C, cycling and buses accounted for 35% and 20%, respectively.','C 校区骑行和公交分别占 35% 与 20%。','两项按顺序配对。'),
 E('The other commuting categories are not identified.','未说明其他通勤方式的具体类别。','明确数据边界。')
 ],referenceUrls:[REF],sourceNote:'百分比取自本项目 Task 1 U03 原始虚构校区表，不与另一独立借阅渠道图混用。'
},
{
 id:'en-task1-u04-shares-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u04',
 title:'比例变化不等于金额变化：时间、分母与限定语',subtitle:'2020/2025 虚构预算：研究、教学与设施的份额变动',
 prerequisite:'已学习同一指标横向比较，并理解百分比、百分点与基期的差别。',
 objective:'能解释份额变化，区分 percentage points 与 relative percentage change，避免把未知总预算推断为确定的货币支出。',
 sections:[
 S('01 同一类别跨年比较需要指出年份','题目给出 2020 和 2025 两组份额：研究 30%→40%，教学 50%→45%，设施 20%→15%。由于三类在每个年份都合计 100%，可以比较预算内部的分配结构；但题目没有给出任一年的预算总额。',
 'The share allocated to research rose from 30% in 2020 to 40% in 2025',[
 E('Research accounted for 30% in 2020 and 40% in 2025.','研究经费份额在 2020 年为 30%，2025 年为 40%。','两个时间点与同一预算类别配对。'),
 E('Teaching remained the largest category in both years.','教学在这两个年份均是份额最大的类别。','50% 与 45% 都高于同期其他份额。'),
 E('Facilities declined from a 20% share to 15%.','设施的预算份额从 20% 降到 15%。','下降的是份额，不一定是支出金额。')
 ],'必须保留“share/份额”；只写 spending rose 或 received less money 会超出表格提供的信息。',
 T('课程预算份额表',[['Research 2020/2025: 30%/40%','研究：30%/40%','增加 10 个百分点'],['Teaching 2020/2025: 50%/45%','教学：50%/45%','减少 5 个百分点'],['Facilities 2020/2025: 20%/15%','设施：20%/15%','减少 5 个百分点'],['Budget totals: unknown','两年预算总额均未知','不能确定绝对金额变化']],'2020 合计 100%，2025 也合计 100%；不代表两个年度的总预算相同。')),
 S('02 percentage points 与百分比变化的计算','研究份额由 30% 变为 40%，绝对差为 10 percentage points；相对原份额增长为 (40−30)÷30≈33.3%。教学份额下降 5 个百分点，相对其原份额为 10%。这两类数据用途不同，写作中应该注明计算基准。',
 'increase by 10 percentage points / a relative increase of about 33.3%',[
 E('The research share increased by 10 percentage points.','研究份额增加了 10 个百分点。','40−30=10。'),
 E('This represents about a 33.3% rise relative to its earlier share.','相对于原份额，这相当于约 33.3% 的增长。','10÷30≈0.333；不是预算金额。'),
 E('The teaching share fell by 5 percentage points.','教学份额下降了 5 个百分点。','50−45=5，不说总经费下降。')
 ],'不能将百分比的相对变化直接解释成钱的变动率，也不能将 10 个百分点写作 10% 而不说明基准。'),
 S('03 份额的分母变了，金额可能朝相反方向','share = category amount ÷ total budget。假设某类份额下降而总预算大幅提高，该类实际金额仍可能增加；反之亦然。本题不提供总预算，因而只能描述内部预算结构的变化。',
 'a declining share does not necessarily mean lower spending',[
 E('Teaching took a smaller share in 2025.','2025 年教学占预算的份额更小。','有证据支持的结构性表述。'),
 E('This does not prove that teaching received less money.','这不能证明教学得到的资金变少。','两年总额未知。'),
 E('The total budget may have changed between the two years.','两年的总预算可能发生变化。','may 保留未知性。')
 ],'本节涉及不同总额只是说明逻辑可能性，并不是新增的历史事实；不能为题目编造任何实际预算金额。'),
 S('04 Overview 中的 remained 与 despite','remained the largest 强调跨年保持排名；although / despite 强调份额虽下降却依旧领先。先写全局特征，再在细节段列年份和百分点，能形成逻辑连贯的概述与证据结构。',
 'Although its share fell, teaching remained the largest allocation',[
 E('Although the teaching share fell, it remained the largest.','虽然教学份额下降，但仍占最大比例。','让步关系与两年排序相符。'),
 E('Research took a larger share in 2025 than in 2020.','2025 年研究所占份额高于 2020 年。','时间比较精准。'),
 E('Overall, the allocation shifted towards research.','总体而言，预算份额向研究倾斜。','仅概括结构变化，不推断金额。')
 ],'不能把 shifted towards research 理解为政府政策或校方决定的具体原因；题目未提供解释性资料。')
 ],
 questions:[
 Q('研究份额增加了多少个百分点？','10 percentage points, from 30% to 40%.','2025 年 40% 减去 2020 年 30% 等于 10 个百分点。'),
 Q('研究份额的相对增幅是多少？','Approximately 33.3% relative to the 2020 research share.','(40−30)÷30≈33.3%，但不代表研究实际金额增长 33.3%。'),
 Q('Can we say that teaching received less money in 2025?','No. The total budgets for 2020 and 2025 are unknown.','教学预算比例从 50% 降至 45%，由于分母未知，实际货币金额可能升、降或不变。'),
 Q('Write a cautious overview covering the ranking and main change.','Teaching remained the largest category, while the budget share allocated to research increased.','两年教学均为最大份额；研究上升，其他两类份额下降。')
 ],
 output:'独立完成不少于 150 词的 Task 1 份额变化报告，包含 overview、同一类别跨年的细节比较，以及对总预算未知的严谨措辞，并逐段翻译成中文。',
 model:[
 E('The table compares the percentage allocation of a fictional budget in 2020 and 2025.','该表比较一份虚构预算在 2020 年与 2025 年的百分比分配。','任务范围。'),
 E('It covers research, teaching and facilities, rather than monetary totals.','该表列出研究、教学和设施三类份额，而非货币总额。','解释数据类型。'),
 E('Overall, teaching retained the largest share in both years.','总体上，教学在两个年份都保持最大的预算份额。','主特征。'),
 E('Research was the only category to gain share.','研究是唯一份额增加的类别。','三类比较。'),
 E('In 2020, teaching stood at 50%, research at 30% and facilities at 20%.','2020 年教学占 50%，研究占 30%，设施占 20%。','原始年份。'),
 E('By 2025, research had risen to 40%, an increase of 10 percentage points.','到 2025 年，研究份额升至 40%，增加 10 个百分点。','正确差额。'),
 E('Teaching fell to 45%, while facilities declined to 15%.','教学份额降至 45%，设施份额降至 15%。','两项下降。'),
 E('The figures do not show whether any category received more or less money.','这些数字不能说明任何一类实际获得的金额是增加还是减少。','未知总额边界。')
 ],referenceUrls:[REF],sourceNote:'数字只取 content/lesson-drafts/en-ielts-writing-task1-u04.json 的虚构预算，未创造任何总预算或绝对支出。'
},
{
 id:'en-task1-u04-allocation-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u04',
 title:'预算图表词汇：allocation / share / account for / relative',subtitle:'准确说清分配结构与绝对金额的差别',
 prerequisite:'已掌握 Task 1 U04 两年三类别的预算份额及数字证据。',
 objective:'能使用 allocation、share、account for、remain、respectively、absolute/relative 来组织预算变化报告，避免超出原始数据范围。',
 sections:[
 S('01 allocation / share：强调分配的比例结构','allocation 可以指资源分配，在图表描述中 budget allocation 是预算分配。share 是其中一个类别的占比，可以与 total budget 搭配。绝不能在总额未知时，把 allocation 的 45% 擅自转换成货币数额。',
 'budget allocation / the share of the budget / account for 45%',[
 E('Teaching accounted for half the budget in 2020.','2020 年教学占总预算的一半。','50% 是该年度预算份额。'),
 E('The allocation to research represented 40% in 2025.','2025 年分配给研究的份额为 40%。','仍是比例，并非金额。'),
 E('Both years have three reported budget categories.','两个年份都列出三类预算项目。','不暗示类别之外的实际支出。')
 ],'a share of the budget 不等同于 the amount of money；总预算未知时不能提出金额增长的肯定判断。',
 T('精确搭配表',[['allocate a share to research','将一部分预算份额分配给研究','对象是类别'],['account for 45%','占 45%','不是 45 货币单位'],['relative increase','相对增幅','需要明确基期分母'],['absolute expenditure','实际货币支出','本表没有给出']],'每个表达都应绑定它能证明的量。')),
 S('02 rise、fall 与 remain 区分方向和稳定排序','rise/fall 可以修饰 share，也可以修饰 spending，但两者的证据要求不同。remain the largest 指排序保持，不代表份额持平。教学的份额从 50% 到 45%，因此既 remained the largest 又 fell 是可以同时成立的。',
 'a share rose / a share fell / remained the largest category',[
 E('The research share rose to 40%.','研究份额升至 40%。','到 2025 年的结果。'),
 E('The teaching share fell by five percentage points.','教学份额下降五个百分点。','份额下降而非支出额确定下降。'),
 E('Teaching remained the largest allocation.','教学仍然是预算份额最大的类别。','最大不等于不变。')
 ],'remain largest 并非 remain unchanged；不能遗漏时间范围或把比例趋势转换为实际金额趋势。'),
 S('03 respectively 与三类预算的对应次序','respectively 把前后顺序逐一配对。介绍 2025 年三类项目时，research/teaching/facilities 分别对应 40/45/15，改动任何一边的顺序都将改变陈述事实。',
 'Research, teaching and facilities accounted for 40%, 45% and 15%, respectively',[
 E('Research, teaching and facilities accounted for 40%, 45% and 15% in 2025, respectively.','2025 年研究、教学与设施分别占 40%、45% 与 15%。','顺序严格一一对应。'),
 E('In 2020, their respective shares were 30%, 50% and 20%.','2020 年它们对应的份额分别为 30%、50% 与 20%。','their 回指研究、教学和设施。'),
 E('Teaching took a larger share than research in both years.','教学在两个年份中的份额均高于研究。','50>30、45>40。')
 ],'respectively 的顺序错位会产生没有来源的数据，不能以语法流畅为由忽略事实不对应。'),
 S('04 absolute 与 relative：未知信息也是结论边界','relative 指相对基期或整体的比例，absolute 指绝对数量。预算份额全部是相对值；由于每年 total budget 缺失，不能确定 absolute expenditure。概述要把所知的份额重分配与未知金额分开写。',
 'relative share / absolute spending / unknown total budget',[
 E('The chart reports relative shares.','图表报告的是相对份额。','每类占全年总额的百分比。'),
 E('Absolute spending is not provided.','没有给出绝对支出金额。','准确注明缺失。'),
 E('A smaller share need not mean a smaller amount.','份额变小未必意味着金额减少。','分母变化时可能产生不同方向。')
 ],'不能把 speculative monetary amounts 加入范文；写清数据边界是严谨，不是要求猜测。')
 ],
 questions:[
 Q('用 account for 表达 2025 年研究占 40%。','Research accounted for 40% of the budget in 2025.','account for + 份额，不把百分比改成金额。'),
 Q('Why can remain largest coexist with a falling share?','Teaching fell from 50% to 45% but still exceeded both other categories.','remained 是相对排名保持，份额本身从 50% 降到 45%。'),
 Q('2025 年研究、教学、设施按顺序各占多少？','40%, 45% and 15%, respectively.','2025 年原始表三项数据按 research/teaching/facilities 顺序配对。'),
 Q('What information is missing for a claim about spending amounts?','The total budget in each year.','实际金额等于份额乘以各年预算总额，这两个分母未提供。')
 ],
 output:'写 8–10 句双语数据报告，至少使用 allocation、share、account for、remain、respectively、relative/absolute，并确保年份与类别一一对应。',
 model:[
 E('The figures concern budget allocations in two years.','数据涉及两个年份的预算分配。','背景。'),
 E('Research accounted for 30% of the 2020 budget.','2020 年研究占预算的 30%。','起始值。'),
 E('Teaching represented 50% in the same year.','同年教学占 50%。','最大值。'),
 E('Facilities took the remaining 20%.','设施占剩余的 20%。','2020 合计 100%。'),
 E('By 2025, their respective shares were 40%, 45% and 15%.','到 2025 年，三类相应份额分别为 40%、45% 与 15%。','顺序按研究、教学、设施。'),
 E('Teaching remained the largest category.','教学仍然是份额最大的类别。','排序。'),
 E('The relative share devoted to research increased.','研究所占的相对份额增加。','只说比例。'),
 E('Absolute expenditure cannot be inferred without budget totals.','没有预算总额便无法推断绝对支出金额。','证据限制。')
 ],referenceUrls:[REF],sourceNote:'沿用本项目 U04 虚构预算比例与词义标准；此单元不报告任何未经提供的货币总数。'
}
];
