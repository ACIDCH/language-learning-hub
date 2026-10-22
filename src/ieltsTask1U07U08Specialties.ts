import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const T=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['数据／语言证据','准确中文','不得推断'],rows,note});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(table?{table}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK1_U07_U08_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task1-u07-cohesion-scope-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u07',
 title:'连贯不是连接词数量：this shift、while 与稳定类别',subtitle:'线上借阅 10→30%，纸本 80→60%，其他 10→10% 的两组份额',
 prerequisite:'会用 while / whereas 比较，能区分同一个指标中的两项与三个类别。',
 objective:'辨清 this shift 的回指范围，形成总体概述、对照主类和单独稳定类，避免编造没有给出的年份和借阅人数。',
 sections:[
 S('01 this shift 回指两种主要借阅份额的重新分配','线上借阅从 10% 增至 30%，纸本借阅从 80% 降至 60%。this shift 可以概括两者此消彼长，但不能说所有借阅类别都增长。其他类别仍为 10%，因此应与变动的两类区分。','This shift involved paper and digital borrowing, while the other category remained stable',[
 E('Digital borrowing rose from 10% to 30%.','数字借阅份额从 10% 升至 30%。','增加 20 个百分点，两个端点而非具体年份。'),
 E('Paper loans fell from 80% to 60%.','纸本借阅份额从 80% 降至 60%。','减少 20 个百分点。'),
 E('This shift did not affect the remaining category.','这种转变没有影响其余类别。','this shift 仅回指两种主要方式的份额变动。')
 ],'不能把 this shift 译成所有类别整体上涨，也不能把百分比份额的改变当作借阅次数改变。',
 T('本课完整三类别分配',[['Paper: 80% → 60%','纸本从 80% 降至 60%','仍为最大类别'],['Digital: 10% → 30%','线上从 10% 升至 30%','增幅为 20 个百分点'],['Other: 10% → 10%','其他保持 10%','没有任何份额变化'],['Total in each distribution: 100%','两组份额各自加总 100%','没有总借阅数或准确年份']],'仅给出两个端点，不能虚构过渡年份和原因。')),
 S('02 while 合并反向变化','用 while 将同一指标的两个方向连在一句里，能使对照无需赘述。分句要分别对应纸本与线上；避免把两个主语所代表的数据写反。',
 'Paper borrowing fell from 80% to 60%, while digital borrowing rose from 10% to 30%',[
 E('Paper borrowing declined, while digital borrowing increased.','纸本借阅下降，而线上借阅上升。','while 是对照，不代表两个变化发生于已知具体日期。'),
 E('The first remained the larger category.','前者依旧是份额较大的类别。','最终纸本 60%，线上 30%。'),
 E('Other forms of borrowing accounted for 10% in both distributions.','其他借阅形式在两组分配中均占 10%。','独立补充稳定类别。')
 ],'不能用 while 猜测因果关系：线上增长不自动证明纸本下降是由某项技术推广造成。'),
 S('03 remained the largest 不等于 remained unchanged','纸本份额从 80% 降到 60%，仍高于线上 30% 与其他 10%。因此可以写 remained dominant，但绝不可写其份额不变。稳定的只有其他类别。','remained the largest / remained at 10% / fell by 20 percentage points',[
 E('Paper loans remained the dominant category at 60%.','纸本借阅最终仍是最大类别，占 60%。','dominant 描述排名而不是稳定。'),
 E('The other category remained at 10%.','其他类别一直保持在 10%。','remained at 描述数值不变。'),
 E('Digital borrowing gained 20 percentage points.','线上借阅份额增加了 20 个百分点。','30−10，属于百分点而非总量。')
 ],'如果不用 at + 数值限定 remained，不能据此推导该类别没有变化；原稿中稳定的是“其他”，不是纸本。'),
 S('04 连贯段落由分组与信息推进组成','建议先写 overview：纸本仍占最大份额但下降、线上增长、其他保持；细节一组写 80→60 与 10→30 的对照，再写 10→10 的稳定项。不依赖 moreover 等空洞连接词。','Overview → opposing changes → stable category → evidence limit',[
 E('Overall, paper loans remained ahead despite a lower share.','总体上，纸本借阅份额虽下降却仍领先。','概述首句。'),
 E('Digital loans took a larger, though still smaller, share than paper.','线上借阅的份额扩大，但仍低于纸本。','不把增长等于反超。'),
 E('The data do not identify changes in total borrowing volume.','数据没有说明总借阅量发生了什么变化。','只给份额。')
 ],'为了避免重复而将 borrowing 换为 purchasing 会把“借阅”误写成“购买”；准确性优先于同义词变化。')
 ],
 questions:[
 Q('What does “this shift” refer to here?','The decline in paper share and the rise in digital share; other borrowing stayed at 10%.','这一指代涵盖两大类别的反向变化，其他类别始终占 10% 未变。'),
 Q('Did paper borrowing become the smallest category?','No. It remained the largest, at 60% in the second distribution.','纸本从 80% 降到 60%，终点仍大于线上 30% 和其他 10%。'),
 Q('Can we describe growth between particular calendar years?','No. The source gives two distributions but no named calendar years.','原稿只提供“起点→终点”，没有给出任何具体年份，不应自行编造。'),
 Q('Can this source establish an increase in absolute digital loan numbers?','No. It reports percentage shares only, without total loan counts.','线上占比升高 20 个百分点，并不能证明实际借阅次数上涨。')
 ],
 output:'围绕两个端点写完整英文 Task 1 数据报告，形成 overview、对照变化、稳定项和证据边界。每段附中文，不编造年份与绝对借阅量。',
 model:[
 E('The figures compare borrowing shares in two fictional distributions.','数字比较两组虚构借阅份额。','范围。'),
 E('Paper, digital and other loans account for all three categories.','纸本、线上和其他借阅构成三类。','分类。'),
 E('Overall, paper remained dominant despite losing share.','总体上，纸本份额虽下降但依旧占主导。','概述。'),
 E('Digital borrowing gained share over the period shown.','线上借阅在所示比较中增加份额。','不造年份。'),
 E('Paper loans declined from 80% to 60%.','纸本借阅从 80% 降至 60%。','证据。'),
 E('In contrast, digital borrowing grew from 10% to 30%.','相比之下，线上借阅从 10% 升至 30%。','反向。'),
 E('The other category remained unchanged at 10%.','其他类别稳定在 10%。','稳定项。'),
 E('The figures do not reveal borrowing totals or causes.','数据未说明借阅总量及变化原因。','未知范围。')
 ],referenceUrls:[REF],sourceNote:'两组端点百分比严格来自 content/lesson-drafts/en-ielts-writing-task1-u07.json，未假定任何实际年份。'
},
{
 id:'en-task1-u07-borrowing-cohesion-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u07',
 title:'词汇连贯：borrowing / dominant / stable / distribution',subtitle:'保持每一技术名词的含义稳定，再用语块连接变化',
 prerequisite:'能读懂两组 80/10/10 与 60/30/10 的份额分配。',
 objective:'正确区分 borrowing 与 purchasing、digital 与 paper、dominant 与 unchanged、distribution 与 absolute volume。',
 sections:[
 S('01 borrow ≠ purchase：不要为避免重复而改变指标','borrow 是借用而非购买；borrowing、loans 可在本课指借阅活动与记录，但购买不是任何一个统计类别。图表写作需要保留指标名称一致，不能为了词汇“多样性”破坏原数据。','paper borrowing / digital loans / not purchasing',[
 E('Paper borrowing was the largest listed category.','纸本借阅是所列类别中占比最大的。','borrowing 不是纸本销售。'),
 E('Digital borrowing rose to 30% of the distribution.','线上借阅份额升至 30%。','只描述份额。'),
 E('The table gives borrowing, not purchase statistics.','表格给的是借阅统计，不是购买统计。','指标边界。')
 ],'不要使用 paper sales 或 online purchasing 替换原文 borrowing；借阅和交易语义不同。',
 T('功能性词汇与数据',[['borrowing / loans','借阅活动／借阅记录','非购买'],['dominant category','占主导的类别','不表示份额稳定'],['stable at 10%','保持 10%','只适用于其他类别'],['share / distribution','份额／分配构成','无总借阅量']],'用搭配写准确统计句，而不是孤立记单词。')),
 S('02 dominant 与 stable：排名和变化速度不同','dominant 是份额领先，stable 是数值不变。纸本依旧 dominant，但下降 20 个百分点；只有其他类别 stable at 10%。避免将 remain largest 与 remain constant 混为一谈。','remain dominant / remain stable at ...',[
 E('Paper remained dominant at 60%.','纸本最终依然以 60% 占主导。','该比例仍高于另外两类。'),
 E('The other category stayed stable at 10%.','其他类别保持在 10%。','两个端点均为 10%。'),
 E('Dominance does not imply stability.','占主导并不意味着数值稳定。','排名与变动两个维度。')
 ],'不能因为纸本 remains dominant 就写 paper share was unchanged；80→60 本身就是下降。'),
 S('03 shift / contrast 需要明确对象','shift in the distribution 指份额构成发生变化；contrast 引出类别之间的比较。单写 there was a shift 不能让读者知道变了什么，应补上 paper 与 digital 的方向关系。','shift towards digital borrowing / a contrast between paper and digital shares',[
 E('The distribution shifted towards digital borrowing.','份额分配向线上借阅倾斜。','线上占比提升而纸本降低。'),
 E('The main contrast concerns paper and digital formats.','主要对照集中在纸本与线上两类。','对应两项 20 个百分点变动。'),
 E('The stable other category is best reported separately.','稳定的其他类别最好单独报告。','信息分组。')
 ],'shift towards digital borrowing 不等于总借阅量转移了确切数量；需要总量才能得出人数或次数差。'),
 S('04 percentage points 与词汇修饰语','百分数从 10 到 30 是增加 20 个百分点；从 80 到 60 是减少 20 个百分点。相对增长率分别另有分母，任务没有要求用所谓大幅上涨去替代数值核对。',
 'rise by 20 percentage points / fall by 20 percentage points',[
 E('Digital borrowing gained 20 percentage points.','线上借阅份额增加了 20 个百分点。','30−10=20。'),
 E('Paper loans lost 20 percentage points.','纸本借阅份额减少了 20 个百分点。','80−60=20。'),
 E('Other loans accounted for a stable 10%.','其他借阅始终占 10%。','10→10。')
 ],'不能把“增加 20 个百分点”直接改写为“总借阅量增加 20%”，也不能补造统计日期。')
 ],
 questions:[
 Q('Which word would change the source metric: borrowing or purchasing?','Purchasing; the source measures borrowing, not buying.','购买和借阅是不同活动，词汇替换会使本来正确的句子变成数据错误。'),
 Q('What does dominant mean for paper loans here?','Paper loans still represent the largest share, at 60% in the final distribution.','dominant 只指在已列三项中的排序，不意味着纸本份额保持原来的 80%。'),
 Q('What does stable describe in this source?','The other category, unchanged at 10% in both distributions.','其他类别两个端点都是 10%，与两种主要借阅方式变化不同。'),
 Q('What is the difference between a shift in shares and a rise in loan totals?','Shares describe the composition; absolute loan totals are not reported.','题目列出比例但没有各阶段借阅次数总数，不能推断绝对借阅量变化。')
 ],
 output:'写八句双语图表叙述，准确使用 borrowing、dominant、stable、distribution、contrast 与 percentage points；另写完整报告并注明未报告的总量。',
 model:[
 E('The table describes three borrowing categories.','表格描述三种借阅类别。','类别。'),
 E('Paper loans were initially dominant at 80%.','纸本借阅起初以 80% 占主导。','起点。'),
 E('Their share later declined to 60%.','随后其份额降至 60%。','终点。'),
 E('Digital borrowing rose from 10% to 30%.','数字借阅由 10% 增至 30%。','变化。'),
 E('This shift concerns shares, not known numbers of loans.','这项变化涉及份额，并不是已知借阅次数。','统计边界。'),
 E('The other category stayed stable at 10%.','其他类别维持 10%。','不变项。'),
 E('Paper remained the largest despite its decline.','纸本虽下降但仍是最大类别。','排名。'),
 E('Borrowing should not be misreported as purchasing.','借阅不能误写成购买。','词义一致。')
 ],referenceUrls:[REF],sourceNote:'与 Task 1 U07 自编三类别比例原稿一一对应，学习借阅语言而非购买语言。'
},
{
 id:'en-task1-u08-revision-scope-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u08',
 title:'图表修订语法：时间范围、翻倍条件与原因范围',subtitle:'三个连续但未命名年份的周访问量 20→30→40',
 prerequisite:'理解 percentage increase 的分母、double 与 150 词 Task1 概述要求。',
 objective:'核对时间范围后纠正“第二年翻倍”、未经证实的广告原因和不当时态；建立逐项自检顺序。',
 sections:[
 S('01 double：必须比较正确起点和终点','源表只写三个连续年份的每周访问量 20、30、40。第二年 30 对第一年 20 是 1.5 倍，即增加 50%；到第三年才是第一年的 2 倍。这种判断必须标明参照的基期。','30 is 1.5 times 20 / 40 is double 20',[
 E('Visits increased from 20 to 30 in the second year.','第二年周访问量从 20 增至 30。','增加 10，相对起点为 50%。'),
 E('The second-year figure was 50% above the first.','第二年的数值比第一年高 50%。','(30−20)÷20=50%。'),
 E('Visits doubled relative to the first year only in the third year.','相对第一年而言，访问量直到第三年才翻倍。','40÷20=2；不是第二年。')
 ],'不能将 20→30 说成 doubled；不能用 almost 等近似词为错误的倍数辩护。',
 T('三个未命名年份原始数值',[['Year 1: 20 weekly visits','第一年周访问量 20','无具体公历年份'],['Year 2: 30 weekly visits','第二年周访问量 30','比第一年 +50%'],['Year 3: 40 weekly visits','第三年周访问量 40','是第一年两倍'],['Reason / total users: unspecified','原因、独立访客数未知','不得杜撰广告成效']],'原表列的是 weekly visits，不是 annual visits；连续三年并不等于给出了具体公历年份。')),
 S('02 units 与频率名词不能错位','weekly visits 代表每周访问次数，而不是三个年份的年度访问总数。只因为序列跨越三年，不能把纵轴从 weekly 换成 annual；单位不变，比较仍有意义。',
 'weekly visits / the number of visits per week',[
 E('The chart reports weekly visits across three successive years.','图表给出连续三个年份的周访问量。','单位为每周次数。'),
 E('The second observation is 30 visits per week.','第二个观测值是每周 30 次访问。','不等于每年 30 次。'),
 E('No number of unique visitors is provided.','没有提供去重访客人数。','次数不能直接表示人数。')
 ],'将 visits per week 改写为 annual visitors 会同时改变时间计量单位和统计对象。'),
 S('03 因果信息没有出现','图表给出 20→30→40 的单调上升序列，但没有解释原因。广告、政策、新设备等均不能被当成已证实的驱动因素。先核对任何 because、due to 或 caused by 后是否存在来源。',
 'rose throughout the displayed period / no reason was supplied',[
 E('Weekly visits increased in both intervals.','每周访问量在两个区间中都上升。','20→30 和 30→40。'),
 E('The figures do not show why attendance rose.','这些数字没有说明访问量为什么增加。','来源只给测量值。'),
 E('An advertising campaign cannot be inferred from the table.','不能从这张表推断存在广告活动。','广告因果没有任何来源支持。')
 ],'不能将同步上升当成广告或其他干预造成的因果效应。'),
 S('04 修订顺序：数据→概述→范围→语法','最有效的修改先核实每个数值、时间与单位，再检查 overview 是否抓住全程增加。之后核查翻倍只在第三年成立、没有因果信息，最后才修改句法和用词。',
 'verify figures → write overview → check comparisons → edit wording',[
 E('Overall, the weekly figure rose in both reported intervals.','总体上，周访问量在两个已列区间均上升。','无须提供具体年份。'),
 E('It doubled only between the first and final observations.','只有从首次到末次观测值才实现翻倍。','参照范围清晰。'),
 E('The revision removes the unsupported advertising claim.','修订稿删除缺少来源支持的广告归因。','准确性优先。')
 ],'about / approximately 不能使 20→30 的“翻倍”成为合理近似，语言润色必须晚于事实核对。')
 ],
 questions:[
 Q('When do weekly visits first double relative to the initial figure?', 'At the third observation: 40 compared with 20 initially.','40÷20=2；第二年 30÷20=1.5，不能说第二年就翻倍。'),
 Q('What is the rise from first to second as a percentage of the first?', '50%, because (30−20)/20=0.5.','基期为 20，增加 10，10÷20=50%，不是 100%。'),
 Q('Can you name the exact calendar years?', 'No. The source says only three successive years.','题目没有给出 2020 等具体年份，不能自行补造日历日期。'),
 Q('What should be removed from the flawed draft?', 'The claim that visits doubled in year two and the unsupported advertising explanation.','第一个结论倍数错误，第二个结论没有任何因果数据支撑。')
 ],
 output:'对三句错误报告逐项修订，给出真实起点、基期和英文原因说明；最终写不少于150词的双语 Task1报告，避免推断未列年份和广告原因。',
 model:[
 E('The series reports weekly visits across three successive years.','序列列出连续三个年份的周访问量。','统计指标。'),
 E('The observations are 20, 30 and 40, respectively.','三个观测值依次为 20、30 和 40。','顺序。'),
 E('Overall, visits increased in both intervals.','总体上，两个区间的访问量都增长。','趋势。'),
 E('The second figure was 50% higher than the first.','第二个值比第一个高 50%。','正确百分比。'),
 E('The final value was exactly double the starting one.','终值正好是起始值两倍。','40÷20=2。'),
 E('The table does not identify precise calendar years.','表格未标出具体公历年份。','时间范围。'),
 E('It also does not report the cause of the rise.','同样没有报告上涨的原因。','无广告因果。'),
 E('Accurate revision precedes stylistic refinement.','准确的事实修订先于文风润色。','修改原则。')
 ],referenceUrls:[REF],sourceNote:'使用 en-ielts-writing-task1-u08.json 的自编 20/30/40 周访问量；不捏造公历年份或广告效果。'
},
{
 id:'en-task1-u08-precision-editing-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u08',
 title:'编辑核验词汇：precision、verify、estimate、double',subtitle:'词义精确性比高级替换更重要',
 prerequisite:'熟悉周访问量 20、30、40 及源稿中的两个典型错误。',
 objective:'区分 verify、estimate、double、overview、cause、exactly、approximately，并在写作修改中标明哪个句子违反数据。',
 sections:[
 S('01 verify / estimate：证实与估计不同','verify 是用数据核对陈述，estimate 是在允许近似时给出估算。原稿的三个数值准确列为 20、30、40，没有估算依据，就不能把数学错误归入“大致正确”。','verify the values / estimate when supported by source',[
 E('First, verify the three reported values.','首先核验三个报告值。','20、30、40 各属不同观测点。'),
 E('The source gives exact values rather than estimates.','原稿给出准确数值，而非估计值。','不凭空加入约数。'),
 E('An approximation cannot rescue the wrong statement.','使用近似措辞不能挽救错误陈述。','20→30 不接近翻倍。')
 ],'approximately doubled 不应作为 20→30 的替代说法；数字和比较基准先于修辞。'),
 T('编辑词汇核验表',[['verify 20,30,40','核对 20、30、40','均为周访问量'],['double: 20→40','翻倍：20 到 40','跨首尾'],['50% rise: 20→30','增长 50%：20 到 30','第二年不是翻倍'],['cause unknown','原因未知','没有广告数据']],'词汇条目必须绑定其可支持的判断。')),
 S('02 overview / detail：两层不同功能','overview 提炼整体方向与突出特征；detail 提供具体数值对比。全程上升应写在 overview，第二年高 50%、第三年翻倍可放入 detail。若只是堆砌连接词而无论证，会削弱可读性。',
 'overall trend / supporting comparison / detail paragraph',[
 E('The overview states that visits increased throughout.','概述指出访问量全程增加。','不需要遍列 20/30/40。'),
 E('The details report the rise from 20 to 30.','细节段报告从 20 到 30 的增加。','带明确数值。'),
 E('The final comparison shows a doubling.','最后一项比较表明发生翻倍。','相对第一年 40÷20=2。')
 ],'不要仅写 advanced-sounding words 替代清晰 overview；概述须与数据吻合。'),
 S('03 exact / approximately 的使用门槛','exactly 只用于等式精确成立，approximately 适用于来源有估算或合理舍入的数值。20→40 等于两倍，可说 exactly doubled；20→30 的 1.5 倍不可写 approximately double。',
 'exactly double / about half as much again / rise by half',[
 E('The final figure was exactly twice the first.','终值恰好是首值两倍。','40/20=2。'),
 E('The second figure was one and a half times the first.','第二个值是首值的 1.5 倍。','30/20=1.5。'),
 E('The second value was 50% above the first.','第二个值比首值高 50%。','正确等价改写。')
 ],'“接近翻倍”不是每次增幅都能套的模版；具体算术必须先核对。'),
 S('04 claim / evidence / cause：区分描述和解释','claim 是陈述，evidence 是证据；cause 是因果原因。图表的变化本身不提供广告投入信息。修改时要删除任何无支持的解释句，并保留可以直接计算的数值和范围。',
 'unsupported claim / source evidence / causal explanation',[
 E('The advertising explanation is unsupported.','广告解释缺乏证据。','题目无广告统计。'),
 E('The table supports a rising pattern.','表格支持上升趋势的判断。','20→30→40。'),
 E('No cause for the increase is provided.','没有给出增长原因。','不应断言。')
 ],'编辑者不能把“可能”的个人猜测包装成表格事实；没有因果数据便不写原因。')
 ],
 questions:[
 Q('Which word means checking a statement against evidence?', 'Verify.','verify 强调利用原始表格核对陈述是否正确，而不是随意估计。'),
 Q('Is the second-year increase an exact doubling?', 'No. It is a 50% rise from 20 to 30.','精确翻倍必须从 20 到 40；30 只有原值的 1.5 倍。'),
 Q('What belongs in an overview of this series?', 'The overall increase across both intervals.','概述表达大趋势，详细 20、30、40 的算术比较放在主体段。'),
 Q('Why is “visits rose because of advertising” inaccurate?', 'The source provides no evidence about advertising or any other cause.','数据只包含三个连续年份的周访问量，无法通过共同变动证明广告因果。')
 ],
 output:'写一份双语修改清单：至少识别三个正确陈述、两处错误原因及修订方法，并完成至少150词完整数据报告。',
 model:[
 E('The task is to verify a short report against its source.','任务是根据来源核对一份短报告。','目标。'),
 E('The source lists weekly visits of 20, 30 and 40.','源表列出周访问量 20、30 和 40。','数字。'),
 E('The overview should identify an increase throughout.','概述应指出全程上涨。','总体特征。'),
 E('The second figure was 50% higher than the first.','第二个值比第一个高 50%。','正确幅度。'),
 E('The final figure was exactly double the first.','最终值恰好是起点两倍。','正确基期。'),
 E('The exact calendar years are not specified.','具体公历年份未指定。','时间边界。'),
 E('Advertising is not documented as a cause.','没有材料证实广告是原因。','不得归因。'),
 E('A precise report keeps these distinctions clear.','精准报告应保留这些差异。','总结。')
 ],referenceUrls:[REF],sourceNote:'使用 U08 原始编辑练习的 20→30→40 与广告错误句，不伪造其它统计。'
}
];