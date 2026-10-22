import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const T=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['原始数据／结构','中文含义','核验边界'],rows,note});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(table?{table}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK1_U01_U02_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task1-u01-overview-evidence-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u01',
 title:'概述先于细节：交叉趋势、数据核对与时态',subtitle:'原始四年借阅数据 2021–2024，含可追溯的交叉年份',
 prerequisite:'能读懂带单位的统计表，并区分一个时间点和一段时间。',
 objective:'按原表检验 overview、跨年比较、overtake、过去时以及 annual increase 的最大值并列关系。',
 sections:[
 S('01 从四年总体变化写 overview','原表以“千次借阅”为单位：数字借阅持续上升，纸质借阅每年下降。概述应先归纳这两条相反趋势，并写数字借阅在 2023 年首次超过纸质借阅。细节数字可以放在后续正文，不必挤进 overview。',
 'Overall, digital loans rose while printed loans declined; digital loans overtook printed loans in 2023',[
 E('Overall, digital borrowing increased consistently.','总体而言，数字借阅持续增加。','48→63→76→91，每次记录都高于上年。'),
 E('In contrast, printed borrowing fell each year.','相比之下，纸质借阅每年下降。','82→78→70→62；与数字借阅方向相反。'),
 E('Digital loans first exceeded printed loans in 2023.','数字借阅在 2023 年首次超过纸质借阅。','2022 年 63<78，2023 年 76>70。')
 ],'不能沿用早期教材中“2024 年才超过”的口误；交叉年份由 2022 和 2023 两组数据共同确定。',
 T('原始数据：单位为千次借阅',[['2021: digital 48 / printed 82','数字 48 千次／纸质 82 千次','纸质领先 34 千次'],['2022: digital 63 / printed 78','数字 63 千次／纸质 78 千次','纸质领先 15 千次'],['2023: digital 76 / printed 70','数字 76 千次／纸质 70 千次','数字首次领先 6 千次'],['2024: digital 91 / printed 62','数字 91 千次／纸质 62 千次','数字领先 29 千次']],'该表只统计借阅次数；没有用户人数，也没有解释发生变化的原因。')),
 S('02 rose by 与 rose to：增量不能代替终值','from...to... 描述起点和终点；by 表示两个值的差。48 到 91 千次的增量是 43 千次，绝非增长 91 千次。纸质借阅从 82 降至 62 千次，下降了 20 千次。将单位带入全文，避免把 “91 thousand loans” 错译为 91 人。',
 'rose from 48 to 91 thousand / rose by 43 thousand / fell to 62 thousand',[
 E('Digital loans rose from 48,000 to 91,000.','数字借阅从 48,000 次增至 91,000 次。','from/to 对应起始和最终数值。'),
 E('The figure increased by 43,000 loans.','该数字增加了 43,000 次借阅。','91−48=43 千次。'),
 E('Printed loans fell by 20,000 to 62,000.','纸质借阅减少 20,000 次，降至 62,000 次。','82−62=20 千次；by 和 to 可在一句话中各司其职。')
 ],'rose by 91,000 意味着增量为 91,000，与原表不符；rose to 91,000 才是终值。'),
 S('03 最大年度增加可能并列','计算数字借阅的相邻年度差：2021→2022 为 +15，2022→2023 为 +13，2023→2024 为 +15，单位均为千次。最大增长有两个并列区间，写 one of the two joint-largest rises 比误写唯一最大更严谨。',
 'joint-largest increases / a rise of 15,000 / one of two equal peaks in annual gains',[
 E('Digital loans rose by 15,000 between 2021 and 2022.','2021 至 2022 年，数字借阅增加了 15,000 次。','63−48=15 千次。'),
 E('The increase was 13,000 the following year.','随后一年的增量为 13,000 次。','76−63=13 千次。'),
 E('The first and final annual increases were equal.','第一个和最后一个年度区间的增量相等。','2021–2022 与 2023–2024 都是 +15 千次。')
 ],'不能写 the largest increase occurred only in 2023–2024；2021–2022 的增长幅度相同。'),
 S('04 过去数据用过去时，图表介绍可用现在时','the table shows 属于介绍当前正在阅读的图表；具体数据发生于 2021–2024，通常用 rose、fell、overtook。while / whereas 连接确实不同的趋势；approximatively 之类复杂副词不能掩盖不准确的数字。',
 'The table shows... / loans rose... / whereas printed loans fell...',[
 E('The table compares two loan categories over four years.','表格比较四年间两种借阅类别。','当前表格内容可用一般现在时描述。'),
 E('Digital loans overtook printed loans in 2023.','数字借阅在 2023 年超过纸质借阅。','明确过去发生的交叉。'),
 E('Their difference widened in 2024.','两类借阅的差距在 2024 年扩大。','数字领先差从 6 千次变为 29 千次。')
 ],'图表介绍与历史数据的时态可以不同；2021 年起点、2023 年交叉点和 2024 年终点的事实不可互换。')
 ],
 questions:[
 Q('Which year first shows digital loans above printed loans?','2023: 76,000 digital loans versus 70,000 printed loans.','2022 数字 63 千次仍低于纸质 78 千次，直到 2023 年 76>70，首次交叉发生于 2023。'),
 Q('Complete: Digital loans rose ___ 43,000 ___ 91,000.','by; to','增量 91,000−48,000=43,000，by 表增量；to 表终值 91,000。'),
 Q('Was the 2023–2024 rise uniquely the greatest?', 'No. The 2021–2022 and 2023–2024 increases were both 15,000.','先计算相邻差 +15、+13、+15 千次，首尾并列最大，不能把最后一年写成唯一最大。'),
 Q('How much did printed loans change from 2021 to 2024?','They declined by 20,000, from 82,000 to 62,000.','原表单位是千次；82−62=20 千次，不能把 62 当作降幅。')
 ],
 output:'用两句英文 overview 和一段数据细节说明原始借阅表；随后独立完成不少于 150 词的 Task 1 模拟报告，逐段配中文。音轨与参考范文不得标为 IELTS 官方评分。',
 model:[
 E('The table compares digital and printed loans between 2021 and 2024.','表格比较 2021 至 2024 年的数字和纸质借阅。','范围。'),
 E('Figures are reported in thousands of loans.','数据以千次借阅为单位。','不可丢失单位。'),
 E('Overall, digital loans rose steadily.','总体上数字借阅持续上升。','趋势。'),
 E('Printed borrowing declined in every year.','纸质借阅每年下降。','对照。'),
 E('Digital loans overtook printed loans in 2023.','数字借阅于 2023 年超过纸质借阅。','交叉年份。'),
 E('Digital borrowing increased by 43,000 across the period.','这段期间数字借阅增加了 43,000 次。','总增量。'),
 E('Printed loans fell by 20,000 over the same period.','同期纸质借阅减少了 20,000 次。','总降幅。'),
 E('Two separate intervals shared the highest annual rise in digital loans.','两个不同的年度区间并列拥有数字借阅的最大年度增幅。','防止唯一最大值错误。')
 ],referenceUrls:[REF],sourceNote:'只复用仓库公共原创原稿 en-ielts-writing-task1-u01.txt 的 2021–2024 借阅表；同一文稿的 2020/2025 交通比例为另一项练习，不能混入借阅分析。'
},
{
 id:'en-task1-u01-unit-precision-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u01',
 title:'图表语言的精准词汇：overtake、gap、trend 与 thousands',subtitle:'在正确单位及参照对象上学习，而非背诵孤立同义词',
 prerequisite:'掌握源表的 digital/printed loans 和 2021–2024 四年数值。',
 objective:'辨认 overtake、exceed、gap、narrow、widen、steadily、respectively 与 almost twice 的实际含义及使用条件。',
 sections:[
 S('01 loans / thousands / borrowing 的指标边界','loan 在本课指借阅记录，borrowing 指借阅活动；统计量为 thousands of loans，而非借阅读者人数或馆藏册数。digital loans 是数字借阅次数；printed loans 是纸本借阅次数。',
 'digital loans / printed borrowing / measured in thousands',[
 E('Digital loans reached 91 thousand in 2024.','2024 年数字借阅达到 91 千次。','91 是以千次为单位。'),
 E('Printed borrowing accounted for 62 thousand loans.','纸质借阅为 62 千次。','同一年与数字借阅可比较。'),
 E('The source does not report the number of readers.','原表没有报告读者人数。','次数与用户人数不能互换。')
 ],'不能将 the number of loans 翻译成“借阅人数”，也不应将 borrowing 替换成 purchasing（购买）。',
 T('原表词汇与数值锚点',[['digital loans: 48→91 (thousand)','数字借阅 48→91 千次','增量 43 千次'],['printed loans: 82→62 (thousand)','纸质借阅 82→62 千次','降幅 20 千次'],['overtook in 2023','于 2023 年反超','76 对 70'],['gap in 2024: 29 thousand','2024 年领先差 29 千次','91−62=29']],'相同图表指标也要以原始表的实际单位写成句子。')),
 S('02 overtake、exceed：有时间关系与静态关系','exceed 只强调一项数值高于另一项；overtake 更强调从后方追过、排名发生变化。2021 和 2022 年纸质借阅高于数字借阅，2023 年数字借阅领先，故 overtook in 2023 有完整时间依据。',
 'overtake printed loans / exceed the other category by 6,000',[
 E('Digital loans overtook printed loans in 2023.','数字借阅在 2023 年超过纸质借阅。','前两年未超过，2023 年实现交叉。'),
 E('They exceeded printed loans by 6,000 that year.','当年数字借阅比纸质借阅高出 6,000 次。','76−70=6 千次。'),
 E('The lead expanded to 29,000 by 2024.','到 2024 年领先差扩大至 29,000 次。','91−62=29 千次。')
 ],'overtake 不可随意用于只是“本来就更高”的静态排序；首次交叉要求对照前一年。'),
 S('03 gap、narrow 与 widen：要指明方向','gap 是两类数值之差的大小；2021 年纸质领先 34 千次，2022 年纸质领先 15 千次，因此领先差收窄。数字反超以后，2023 年领先 6 千次，2024 年领先 29 千次，数字领先差扩大。',
 'the gap narrowed / the lead widened / a difference of 29,000',[
 E('The printed-loan lead narrowed from 34,000 to 15,000.','纸质借阅的领先差从 34,000 次收窄至 15,000 次。','2021→2022 的两个正向差值。'),
 E('In 2023, digital borrowing took the lead by 6,000.','2023 年数字借阅以 6,000 次优势领先。','首次方向翻转。'),
 E('The digital lead widened to 29,000 in 2024.','2024 年数字借阅的领先差扩大至 29,000 次。','2023 的 6 千次增至 2024 的 29 千次。')
 ],'从负向领先到正向领先时需说明“哪一类领先”；只写 gap increased without context 易混淆差值方向。'),
 S('04 steadily、joint-largest、almost twice','steadily 只有在整个所描述时段的相邻数据都同向时才适用。数字 48→63→76→91 一直上升，纸质一直下降；数字每年增量并不完全一样。91/48≈1.896，所以可说 almost twice，但不能说 exactly doubled。',
 'rose steadily / joint-largest annual rises / almost twice the initial level',[
 E('Digital loans increased steadily across all four observations.','数字借阅在四次年度记录中持续上升。','强调方向始终一致，不要求增量相等。'),
 E('The increases of 15,000 in the first and last intervals were joint-largest.','第一个与最后一个年度区间均增加 15,000 次，并列最大。','中间区间为 13,000 次。'),
 E('The final digital figure was almost twice the first.','数字借阅终值接近起点的两倍。','91÷48≈1.90，不是严格两倍。')
 ],'steadily 不等于每年增加同样数量；almost twice 不等于 exactly twice；两区间并列最大不是唯一最大。')
 ],
 questions:[
 Q('Does borrowing in this source mean readers or recorded loans?','Recorded loans, measured in thousands.','数据来自各年度借阅次数，不包含不重复读者人数。'),
 Q('Why is overtook correct for 2023 rather than 2024?','Digital loans first became higher than printed loans in 2023 (76,000 versus 70,000).','2022 年数字仍落后纸质，2023 年首次领先，overtook 表示顺序逆转。'),
 Q('What is the 2024 lead in actual loans?','29,000 digital loans over printed loans.','2024 年 91−62=29 千次借阅；单位不能漏成 29 次。'),
 Q('Is the increase from 48,000 to 91,000 exactly double?','No; 91,000 is about 1.90 times 48,000.','48×2=96 千次，高于实际 91 千次，因此只能说 nearly/almost twice。')
 ],
 output:'按时间顺序用 8 句英文写出两类借阅的趋势、领先关系和单位，每句附中文；另完成不少于 150 词的完整 Task 1 模拟报告。',
 model:[
 E('The figures are measured in thousands of loans.','数据以千次借阅计。','单位。'),
 E('Digital borrowing rose steadily after 2021.','2021 年以后数字借阅持续上升。','时间和趋势。'),
 E('Printed borrowing declined in each following year.','此后每年纸质借阅均下降。','相反趋势。'),
 E('The initial printed-loan lead narrowed in 2022.','纸质借阅起初的领先优势于 2022 年收窄。','领先差 34→15。'),
 E('Digital loans overtook printed loans in 2023.','数字借阅在 2023 年反超纸质借阅。','76 对 70。'),
 E('They exceeded printed loans by 6,000 that year.','数字借阅当年比纸质多 6,000 次。','千次转实际次数。'),
 E('The lead widened to 29,000 in 2024.','领先差于 2024 年扩大到 29,000 次。','91−62。'),
 E('The final value was almost twice the original level.','终值接近起始水平的两倍。','91÷48≈1.90。')
 ],referenceUrls:[REF],sourceNote:'严格来源于公共原稿 en-ielts-writing-task1-u01.txt，未沿用该原稿明确自我纠正的“唯一最大增幅”错误句。'
},
{
 id:'en-task1-u02-trend-scope-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u02',
 title:'趋势句法：fell from、rose by、recovered to 的证据范围',subtitle:'某虚构图书馆月访问量：2020–2023 年 1200、900、1500、1800',
 prerequisite:'已掌握 Task 1 U01 的 from/to、by 与 overview；能够理解逐年变化。',
 objective:'区分整段趋势与局部趋势、过去时、最小最大、净增量和区间增量，不推断访问量变化原因。',
 sections:[
 S('01 从起点到谷底：fall 与 from/to','2020 年月访问量 1,200，2021 年 900；下降 300。fell from 1,200 to 900 同时说明两端；fell by 300 才是差额。题目称每个年份某个月的访问量，不能自动累计为“全年访问量”。',
 'fell from 1,200 to 900 / fell by 300',[
 E('Monthly visits fell from 1,200 in 2020 to 900 in 2021.','月访问量从 2020 年的 1,200 次降至 2021 年的 900 次。','原表给定四个年份的月访问量数据。'),
 E('The drop was 300 visits.','下降幅度为 300 次访问。','1,200−900=300。'),
 E('The lowest figure was recorded in 2021.','最低值出现在 2021 年。','四个年份 900 最低。')
 ],'不能把 monthly visits 误称为 annual visits 或独立访客人数；表格没有全年总量。',
 T('月访问量原表（虚构）',[['2020: 1,200','2020 年：1,200 次','起始值'],['2021: 900','2021 年：900 次','谷底，比 2020 年少 300'],['2022: 1,500','2022 年：1,500 次','比 2021 年多 600'],['2023: 1,800','2023 年：1,800 次','最高值，比 2022 年多 300']],'四个观测点没有给出原因、调查方法和全年合计。')),
 S('02 然后反弹：rise from / by / to','2021→2022 年访问量从 900 增至 1,500，增加 600；2022→2023 年由 1,500 增至 1,800，再增加 300。两段连续回升，但增量不同；不能把 2022 年的 600 当作整个周期净增量。',
 'rose from 900 to 1,500 / rose by 600 / reached 1,800',[
 E('Visits rose by 600 to 1,500 in 2022.','2022 年访问量增加 600 次，达到 1,500 次。','900→1,500。'),
 E('They rose by another 300 the following year.','次年又增加 300 次。','1,500→1,800。'),
 E('The highest reported level was 1,800 in 2023.','2023 年达到报告期内最高的 1,800 次。','只针对题目所给四个年份。')
 ],'900→1,500 的 600 是单个区间变化；2020→2023 的总变化仍是 1,800−1,200=600，只是恰好数值相同。'),
 S('03 不能用 steadily 描述先降后升的全段','整段 1,200→900→1,500→1,800 不是持续增长。可以说 visits recovered after 2021，或 a fall was followed by two successive increases。steady increase 只可在确实没有下降的指定子区间中有条件使用。',
 'a decline followed by a recovery / increased in the final two intervals',[
 E('The series initially declined before recovering.','这一序列最初下降，随后回升。','忠实保留 2020→2021 的下滑。'),
 E('Visits then rose in two successive intervals.','其后访问量在连续两个区间中上升。','2021→2022 与 2022→2023。'),
 E('It would be wrong to call the whole period a steady increase.','把整个期间称为持续增长是不正确的。','遗漏首段下滑会改变走势。')
 ],'不能只看初值和终值就把中间的下跌删去；起终点净增长不意味着每年都增长。'),
 S('04 overview 与总体净增长的双层结构','概述应体现“先降、后回升、终值高于起点”。整体终值比起点高 600 次，占起点的 50%。这个 50% 是以 2020 年 1,200 次为分母的净变动率，不能认为 2021 年谷底也增加了 50%。',
 'Overall, visits fell initially, recovered afterwards and ended above the starting level',[
 E('Overall, visits dipped before a substantial recovery.','总体而言，访问量先下降，然后明显回升。','包含转折，符合四点数据。'),
 E('The final figure exceeded the initial figure by 600.','终值比起点高 600 次。','1,800−1,200=600。'),
 E('That is a 50% net rise relative to the starting figure.','相对于起点，这相当于净增长 50%。','600÷1,200=50%。')
 ],'题目没有解释访问量为何下降或回升，不能无证据地归因于疫情、政策、教学改革或广告。')
 ],
 questions:[
 Q('How far did monthly visits fall in the first interval?','By 300 visits, from 1,200 to 900.','2020→2021 年的实际差为 1,200−900=300。'),
 Q('How much did visits rise from 2021 to 2022?','By 600, from 900 to 1,500.','1,500−900=600；by 与 to 的用途不同。'),
 Q('Can the whole 2020–2023 period be called a steady increase?','No. Visits fell in 2021 before recovering in 2022 and 2023.','原表先跌后升，应在 overview 中保留谷底。'),
 Q('What is the net increase relative to 2020?','600 visits, equivalent to 50% of the 2020 figure.','1,800−1,200=600；600÷1,200=0.5，分母为初值。')
 ],
 output:'用不少于 150 词描述四年虚构月访问量的变化，包含正确 overview、起点、谷底、恢复、终值和单位；逐段给出中文，不编造外部原因。',
 model:[
 E('The fictional series reports monthly library visits for four years.','该虚构序列报告四个年份的图书馆月访问量。','正确指标。'),
 E('Visits began at 1,200 in 2020.','2020 年访问量从 1,200 次开始。','起点。'),
 E('They declined to 900 in 2021.','2021 年降至 900 次。','谷底。'),
 E('The figure recovered to 1,500 in 2022.','2022 年回升至 1,500 次。','恢复。'),
 E('It subsequently reached 1,800 in 2023.','随后在 2023 年达到 1,800 次。','终值。'),
 E('The overall gain was 600 visits, or 50% of the starting value.','总体增加 600 次，相当于起始值的 50%。','净增长。'),
 E('The increase was not continuous across the full period.','整个期间并非持续增长。','不能删掉 2021 年下滑。'),
 E('The source gives no reason for the change.','源表没有说明变化原因。','禁止归因。')
 ],referenceUrls:[REF],sourceNote:'数据仅来源于 content/lesson-drafts/en-ielts-writing-task1-u02.json；保留现有 en-task1-trend-lexicon 原有词汇章节，不重复创建。'
}
];
