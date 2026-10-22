import type {ChineseLessonNotes} from './bilingualTeachingNotes';
/** Original source-backed companion explanations for the four legacy English model units. */
export const ENGLISH_ORIGINAL_BILINGUAL:Record<string,ChineseLessonNotes>={
 'en-ielts-reading-u01':{
  situation:'阅读一篇有关大学线上与线下学习模式的学术评论，判断作者的论点、限制和实质建议。',
  goal:'区分 access（获取学习资源）与 participation（真正参与）；用原文证据解释“有资源不等于效果必然更好”。',
  dialogue:[
   {target:'Flexible classes can improve access for working students.',zh:'灵活课程可以改善在职学生获取教育的机会。',note:'can 表达潜在益处，working students 限定适用对象。'},
   {target:'Although recorded lectures are convenient, they may reduce live discussion.',zh:'虽然录播讲座很方便，但它们可能减少实时讨论。',note:'although 引出让步；may 保留不确定性。'},
   {target:'However, access does not guarantee participation.',zh:'然而，能够获得资源并不保证真正参与学习。',note:'全文核心区别，不能把 access 改成 engagement。'}
  ],
  grammar:[
   {title:'区分证据与推断',explain:'文本说某方法 may be useful，表示可能有帮助；不能改述为 always works。未给出参与变化的数字时，不能自行推算提高了多少。',
    examples:[{target:'However, access does not guarantee participation.',zh:'可以访问资料不等于真正参与。',note:'作者反驳一种过强的推断。'}]},
   {title:'让步与对照的功能',explain:'although、however、whereas 用来安排论证关系。段落可能先陈述好处，再加入局限，准确标题需包含这两面。',
    examples:[{target:'Some students prefer classroom discussion, whereas others value flexibility.',zh:'有些学生更喜欢课堂讨论，而另一些学生看重灵活性。',note:'whereas 并列对照不同群体。'}]},
   {title:'定语从句限定对象',explain:'students who work part-time 是兼职学生，不是所有学生。学术阅读必须保留对象、范围和证据语气。',
    examples:[{target:'Students who work part-time may prefer asynchronous lessons.',zh:'兼职学生可能更喜欢异步课程。',note:'两个限制：who 指定群体，may 表示可能。'}]}
  ],
  vocabulary:[
   {word:'asynchronous delivery',meaning:'异步授课',collocation:'asynchronous lessons：非同步课程'},
   {word:'peer interaction',meaning:'同伴互动',collocation:'opportunities for peer interaction'},
   {word:'learning engagement',meaning:'学习参与程度',collocation:'support engagement'},
   {word:'provide feedback',meaning:'提供反馈',collocation:'opportunities for feedback'},
   {word:'be associated with',meaning:'与……相关',collocation:'不能自动读作因果关系'},
   {word:'context-dependent',meaning:'视情境而定',collocation:'a context-dependent outcome'}
  ],
  reading:{title:'学术评论的三层论点',pairs:[
   {target:'Supporters argue that recorded lectures give students greater control over when and how often they revisit complex information.',zh:'支持者认为录播讲座使学生更能自行决定何时及多频繁地复习复杂信息。',note:'支持者的观点，不必等于作者全盘赞成。'},
   {target:'Critics, however, note that access to recordings does not automatically produce meaningful participation.',zh:'但批评者指出，能够访问录播内容并不会自动带来有意义的参与。',note:'however 带出核心限制。'},
   {target:'Rather than treating online and classroom teaching as opposing choices, institutions could examine which activities are most effective in each format.',zh:'与其把线上和线下教学看成对立选择，院校可以研究不同形式最适合哪些活动。',note:'作者提出的方法性建议。'}
  ],technique:'用三种标记分别划出支持者、批评者和作者的最终建议；不要把别人的观点错归给作者。'},
  output:{task:'先用中文写出 3 句论证梗概，再用 100—140 词英文回答：线上课程的优势、局限和作者的建议分别是什么？',
   frame:[
    {target:'Recorded lectures may improve access for some students.',zh:'录播可能改善部分学生获取资源的机会。',note:'优势与范围。'},
    {target:'However, access alone does not guarantee meaningful participation.',zh:'但资源可用不等于有效参与。',note:'局限。'},
    {target:'A blended approach may work better for different learning activities.',zh:'混合形式可能更适合不同学习活动。',note:'谨慎建议。'}],
   review:['能识别作者与受访/对立观点','保留 some/may 等限定','每个判断有原文依据']}
 },
 'en-ielts-reading-u02':{
  situation:'阅读一个有关大学图书馆延时开放的案例：到访次数增加，能否据此推断学生成绩改善？',
  goal:'用“对象—时段—数值—测量范围”四项线索定位证据，准确区分 visits 与 students、相关与因果。',
  dialogue:[
   {target:"The new hours clearly improved students' grades.",zh:'新开放时段显然提高了学生成绩。',note:'这是讨论中的过强主张，原始证据并未测量成绩。'},
   {target:'Which sentence gives evidence about grades?',zh:'哪一句提供了关于成绩的证据？',note:'追问证据和指标是否一致。'},
   {target:'That supports a claim about library use.',zh:'那只能支持图书馆使用情况的主张。',note:'访问量变化不等于学习成绩变化。'}
  ],
  grammar:[
   {title:'限制性关系从句锁定群体',explain:'Students who worked after class 仅指课后工作的学生。抓住 who 引导的限定，避免将结论扩大为全体学生。',
    examples:[{target:'Students who worked after class were more likely to use the late sessions.',zh:'课后工作的学生更可能使用晚间时段。',note:'who 限定了特定群体。'}]},
   {title:'from / to / by 和数据单位',explain:'Visits rose from 80 to 120：起点 80、终点 120、增加 40。即使记录 120 visits，也不代表 120 个不同学生。',
    examples:[{target:'Visits increased by 40.',zh:'到访次数增加了 40 次。',note:'by 后是差值，不是终值。'}]},
   {title:'没有测量，不等于测量后未改善',explain:'did not measure grades 表示没有收集成绩指标，而 found no improvement 表示实际进行了测量但没有发现改善；两者不能混用。',
    examples:[{target:'Although visits increased, the report did not measure learning.',zh:'虽然到访次数增加，但报告没有测量学习效果。',note:'让步与指标边界同时存在。'}]}
  ],
  vocabulary:[
   {word:'respondents',meaning:'受访者',collocation:'60 respondents：60 名答卷人'},
   {word:'visits',meaning:'访问次数',collocation:'不是不同访问者的人数'},
   {word:'staffing',meaning:'人员配备',collocation:'staffing stayed constant：员工人数未变'},
   {word:'may indicate',meaning:'可能意味着',collocation:'比 demonstrates 语气弱'},
   {word:'comparison baseline',meaning:'比较基准',collocation:'compared with the first period'},
   {word:'evidence',meaning:'证据',collocation:'evidence about learning outcomes'}
  ],
  reading:{title:'证据定位与越界识别',pairs:[
   {target:'Sixty visits were recorded.',zh:'记录了六十次到访。',note:'次数，不等于六十个不同的人。'},
   {target:'Some participants preferred quiet rooms.',zh:'部分参与者偏好安静房间。',note:'some 不能改写成 all。'},
   {target:'The report did not compare grades.',zh:'报告没有比较成绩。',note:'不比较不意味着成绩完全相同。'}
  ],technique:'每找到一个数字，都问：统计对象是什么，单位是什么，和谁比较，有哪些未测量的结果？'},
  output:{task:'从文章找出两条真实支持的判断及两条过度推断，逐句给出英文证据和中文解释。',
   frame:[
    {target:'The report shows an increase in visits.',zh:'报告显示到访次数上升。',note:'支持的结论。'},
    {target:'It does not show that grades improved.',zh:'它没有证明成绩提高。',note:'限制。'}],
   review:['不把 visits 改成 students','不把 may 改成 demonstrates','不从没测量推断没有效果']}
 },
 'en-ielts-writing-task1-u01':{
  situation:'依据一组虚构大学图书馆的借阅统计，写出数值准确的英语图表描述：2021–2024 数字借阅上升、纸质借阅下降。',
  goal:'理解 overview、from/to/by 的区别，准确描述 2023 年数字借阅超过纸质借阅的交叉点。',
  dialogue:[
   {target:'Digital loans rose steadily over the four-year period.',zh:'数字借阅量在四年间持续上升。',note:'每年依次 48、63、76、91（千次），符合方向描述。'},
   {target:'Printed loans declined each year.',zh:'纸质借阅量逐年下降。',note:'对应 82、78、70、62（千次）。'},
   {target:'In 2024, digital loans exceeded printed loans.',zh:'在 2024 年数字借阅量超过纸质借阅。',note:'这句虽为真，但首次超过发生在 2023 年。'}
  ],
  grammar:[
   {title:'from / to 是起终值，by 是变化量',explain:'digital 由 48 千增加到 91 千，终值 91 千，增长量 43 千。不要把 rose by 91 thousand 当作 rose to 91 thousand。',
    examples:[{target:'Digital borrowing increased by 43 thousand loans.',zh:'数字借阅增加了 4.3 万次。',note:'91−48=43（千）。'}]},
   {title:'while 与 whereas 对照相反趋势',explain:'同一时间段内数字借阅增加、纸质借阅下降，overview 应概括对照，而不是堆砌四组原始数据。',
    examples:[{target:'Overall, the two categories followed opposite trends.',zh:'总体而言，两类借阅呈相反趋势。',note:'总览抽象层次高于单年数值。'}]},
   {title:'严查交叉点与最大值',explain:'首次交叉在 2023 年（76 对 70）；数字借阅年增长分别为 15、13、15 千，不能错误宣称 2023–2024 为唯一最大增幅。',
    examples:[{target:'Digital loans overtook printed loans in 2023.',zh:'数字借阅量在 2023 年首次超过纸质借阅。',note:'一定要对照两列真实数字。'}]}
  ],
  vocabulary:[
   {word:'overall trend',meaning:'总体趋势',collocation:'overview 段落常用'},
   {word:'rose by',meaning:'增加了……（差值）',collocation:'rose by 43 thousand'},
   {word:'rose to',meaning:'增加到……（终值）',collocation:'rose to 91 thousand'},
   {word:'overtake',meaning:'超过',collocation:'digital loans overtook printed loans'},
   {word:'decline',meaning:'下降',collocation:'printed borrowing declined'},
   {word:'year-on-year',meaning:'同比／逐年比较',collocation:'annual increase'}
  ],
  reading:{title:'四年数据的中外文概要',pairs:[
   {target:'Overall, digital borrowing rose consistently while printed borrowing declined.',zh:'总体上，数字借阅持续上升，而纸质借阅下降。',note:'这是概览，不逐年罗列。'},
   {target:'Digital loans overtook printed loans in 2023 and the difference widened the following year.',zh:'数字借阅量于 2023 年超过纸质借阅量，此后一年差距进一步扩大。',note:'2023 年 76 对 70，2024 年 91 对 62（千次）。'}
  ],technique:'做题时先列 4 年 × 2 类别的小表，再核对净增长、交叉点和最大年度增量，最后写英文；不能先套模板再找数字。'},
  output:{task:'根据源数据写一段 150—190 词的英语 Task 1 风格报告：1 句引入、2 句 overview、两段数据比较。',
   frame:[
    {target:'Overall, digital borrowing rose while printed borrowing declined.',zh:'总体上，数字借阅增加，而纸质借阅下降。',note:'概览核心。'},
    {target:'Digital borrowing increased by 43 thousand loans.',zh:'数字借阅增加 4.3 万次。',note:'报告真实差值。'},
    {target:'Digital loans first overtook printed loans in 2023.',zh:'数字借阅于 2023 年首次超过纸质借阅。',note:'交叉年份。'}],
   review:['各数据与单位正确','by 和 to 区分','2023 年为首次交叉','不编造原因或唯一最大增幅']}
 },
 'en-ielts-writing-task2-u01':{
  situation:'以大学线上课程为议题，从优势、风险和适用条件出发，写出清晰、有限定的英语论证。',
  goal:'写出一段具有立场、理由、具体例子、让步与限定的完整学术观点；避免空泛结论。',
  dialogue:[
   {target:'Online education is always better.',zh:'在线教育总是更好。',note:'原稿把它作为不宜使用的绝对化论断。'},
   {target:'Although online delivery can widen access, students may struggle to obtain immediate feedback.',zh:'尽管线上授课有助于扩大机会，学生却可能难以及时得到反馈。',note:'让步和风险可以在一句内明确对照。'},
   {target:'Online delivery removes commuting time, but whether students learn more depends on course design and access to support.',zh:'线上授课减少通勤时间，但学习是否改善取决于课程设计与支持条件。',note:'不能把方便直接等同于学习效果提高。'}
  ],
  grammar:[
   {title:'限定立场避免绝对化',explain:'can、may、for students who… 帮助明确主张适用对象和证据强度；不鼓励写 always 或 every student。',
    examples:[{target:'For students who live far from campus, well-designed online courses can substantially improve access to education.',zh:'对于住得远的学生，设计良好的线上课程可以显著改善受教育机会。',note:'范围、条件和可能性都得到保留。'}]},
   {title:'原因、结果与证据强度',explain:'because 解释原因；therefore 引出推论；is associated with 只说明相关，不自动表示因果。',
    examples:[{target:'Online courses are convenient; therefore, all students learn better.',zh:'网课方便，所以所有学生学得更好。',note:'这是原稿列出的不恰当推论，不应作为正确范例。'}]},
   {title:'although 组织权衡',explain:'although 从句承认一个事实，主句提出另一面；同一语法关系中通常不要直接写 although… but…。',
    examples:[{target:'Although online delivery can widen access, students may struggle to obtain immediate feedback.',zh:'尽管线上教学可以拓宽机会，学生可能无法即时获得反馈。',note:'承认好处并指出风险。'}]}
  ],
  vocabulary:[
   {word:'face-to-face interaction',meaning:'面对面互动',collocation:'reduce face-to-face interaction'},
   {word:'flexible scheduling',meaning:'弹性时间安排',collocation:'benefit from flexible scheduling'},
   {word:'student engagement',meaning:'学生参与度',collocation:'maintain student engagement'},
   {word:'academic support',meaning:'学术支持',collocation:'seek academic support'},
   {word:'digital divide',meaning:'数字鸿沟',collocation:'widen the digital divide'},
   {word:'outweigh',meaning:'（利弊）超过',collocation:'benefits outweigh the drawbacks'}
  ],
  reading:{title:'先辨认优势，再找出必要限定',pairs:[
   {target:'Distance learning has made university education more accessible to people who cannot relocate or attend lectures at fixed times.',zh:'远程学习让无法搬迁或无法按固定时间上课的人更容易获得大学教育。',note:'明确获益群体。'},
   {target:'However, flexibility alone does not guarantee effective learning.',zh:'然而，仅有灵活性并不能保证有效学习。',note:'文章核心局限。'},
   {target:'Some students struggle to remain engaged when feedback is delayed or group activities are poorly designed.',zh:'如果反馈不及时或小组活动设计欠佳，部分学生很难保持参与。',note:'解释局限发生的条件。'}
  ],technique:'对每段标注 claim、reason、illustration、qualification，而非只记高级连接词。'},
  output:{task:'围绕“大学是否应增加网课”写一个完整论证段落，明确一个优点、一个缺点及你的有条件立场。',
   frame:[
    {target:'Online courses can widen access for students who cannot attend in person.',zh:'网课可为无法到现场的学生扩大教育机会。',note:'优点与范围。'},
    {target:'However, timely feedback remains essential to meaningful learning.',zh:'但及时反馈仍是有意义学习的关键。',note:'限制与权衡。'},
    {target:'A balanced approach should consider the subject and the needs of learners.',zh:'合理方案应考虑学科和学习者需求。',note:'有条件结论。'}],
   review:['观点有具体适用范围','because 或机制解释不空泛','让步与反方风险真实回应题目','没有把虚构例子冒充实证']}
 }
};
