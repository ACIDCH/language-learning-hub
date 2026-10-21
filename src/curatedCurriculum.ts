/** Curated textbook content for two source-matched private manuscripts.
 * Keep original manuscripts immutable; authored practice examples are not quotations.
 * A content match must be checked before any of these units is shown. */
export type SentencePair={target:string;zh:string;why:string;origin?:'source'|'example'};
export type Practice={question:string;answer:string;explanation:string};
export type GrammarTopic={title:string;principle:string;pattern:string;examples:SentencePair[]};
export type VocabularyTopic={word:string;zh:string;collocation:string;note:string};
export type CuratedUnit={
 id:'french-articles'|'study-spaces';language:'fr'|'en';
 prerequisite:string;goal:string;scenario:string;scene:SentencePair[];
 grammar:GrammarTopic[];vocabulary:VocabularyTopic[];
 reading:{title:string;instruction:string;pairs:SentencePair[];note:string};
 practice:Partial<Record<0|1|2|3|5,Practice[]>>;
 output:{task:string;steps:string[];model:SentencePair[];checklist:string[]};
};
const fr=(target:string,zh:string,why:string):SentencePair=>({target,zh,why,origin:'example'});
const en=(target:string,zh:string,why:string,origin:'source'|'example'='example'):SentencePair=>({target,zh,why,origin});
export const FRENCH_ARTICLES:CuratedUnit={
 id:'french-articles',language:'fr',
 prerequisite:'认识法语单数与复数名词，知道名词通常具有阳性或阴性；尚未掌握冠词的学习者也能从本课起步。',
 goal:'能介绍房间内的物品，区分不定／定冠词、c’est／ce sont、il y a／il n’y a pas de，并写出连贯的 5—6 句描述。',
 scenario:'你向一位第一次来访的朋友介绍书桌旁的物品：先介绍新物品，再指出已知物品的位置，最后说明房间里没有什么。',
 scene:[
  fr('Voici ma chambre.','这是我的房间。','用 voici 指示眼前的房间，先建立共同语境。'),
  fr('Il y a une table près de la fenêtre.','窗户旁有一张桌子。','第一次引入桌子：阴性单数用 une。'),
  fr('Le livre est sur la table.','那本书在桌子上。','双方已知道的桌子用 la；已指明的书用 le。'),
  fr('Ce sont des livres.','这些是一些书。','介绍复数物品：ce sont + des + 复数名词。'),
  fr("Il n'y a pas de stylo ici.",'这里没有笔。','否定“有”：il n’y a pas de + 名词。')
 ],
 grammar:[
  {title:'1. 不定冠词：un / une / des',principle:'第一次引入未特指的物品，通常用不定冠词。un 修饰阳性单数；une 修饰阴性单数；des 用于复数。名词的语法性别不是物品的自然性别，必须和词一起记忆。',pattern:'un + 阳性单数 / une + 阴性单数 / des + 复数',
   examples:[fr('C’est un livre.','这是一本书。','livre 是阳性单数。'),fr('C’est une table.','这是一张桌子。','table 是阴性单数。'),fr('Ce sont des livres.','这些是一些书。','livres 复数，前面使用 des。')]},
  {title:'2. 定冠词：le / la / les / l’',principle:'前文已经提到、双方能够确定或用来泛指整个类别时常用定冠词：le 阳性单数、la 阴性单数、les 复数；元音或哑音 h 开头的单数名词前，le/la 一般省音为 l’。不能简单理解为“第二次提到才允许用定冠词”。',pattern:'le livre / la table / les livres / l’ordinateur',
   examples:[fr('Il y a un livre sur la table.','桌子上有一本书。','首次引入“书”，而桌子是当前语境中能确定的。'),fr('Le livre est rouge.','那本书是红色的。','再次指向已确定的书。'),fr("L'ordinateur est sur la table.",'电脑在桌子上。','ordinateur 阳性单数，元音前用 l’。'),fr("J'aime les livres.",'我喜欢书。','泛指整个类别也可以用 les，不要求先提到。')]},
  {title:'3. 指认 c’est / ce sont 与存在 il y a',principle:'c’est / ce sont 侧重回答“这是什么／这些是什么”；il y a 回答“某处有什么”。规范的入门表达中 c’est 常接单数名词词组，ce sont 接复数词组；日常口语中也能听到 c’est + 复数，但书面练习先掌握标准区分。',pattern:'C’est + 单数名词词组 / Ce sont + 复数名词词组 / Il y a + 名词词组 + 位置',
   examples:[fr('C’est une chaise.','这是一把椅子。','指认眼前的单件物品。'),fr('Ce sont des chaises.','这些是一些椅子。','指认多件物品。'),fr('Il y a des chaises dans la salle.','房间里有一些椅子。','表达存在，句子不需要指向手里的物品。')]},
  {title:'4. 否定与冠词变化：ne … pas de / d’',principle:'在表示“没有”的普通否定中，不定冠词 un/une/des 通常变成 de，元音前为 d’。但这不是所有否定句的统一规则：être 后作表语的不定冠词一般保留；定冠词表示确定对象或泛指类别时也不直接换 de。',pattern:"Il n’y a pas de + 名词 / Il n’y a pas d’ + 元音名词",
   examples:[fr("Il n'y a pas de livre ici.",'这里没有书。','Il y a un livre → Il n’y a pas de livre。'),
    fr("Il n'y a pas de stylo ici.",'这里没有笔。','stylo 是辅音开头名词，普通否定存在句用 pas de stylo。'),fr("Il n'y a pas d'ordinateur.",'这里没有电脑。','de 在元音前省音成为 d’。'),fr("Ce n'est pas un livre.",'这不是一本书。','être 的表语不定冠词 un 保留，不是 de livre。'),fr("Je n'aime pas les livres.",'我不喜欢书。','les 在这里表示书这一类别，否定后仍是 les。')]},
  {title:'5. 用连接关系写完整描述',principle:'房间描述通常先建立场景，再介绍新物品，随后用已知名词定位，最后表达不存在的物品。sur（在上面）、sous（在下面）、près de（在旁边）之间不能混淆。',pattern:'Voici … → Il y a … → Le/La … est … → Il n’y a pas de …',
   examples:[fr('Il y a une lampe sur le bureau.','书桌上有一盏灯。','先引入新物品 lampe。'),fr('La lampe est près de l’ordinateur.','那盏灯在电脑旁边。','第二句的 la lampe 是已指明的物品。')]}
 ],
 vocabulary:[
  {word:'un livre',zh:'一本书；阳性名词',collocation:'le livre / des livres',note:'首见用 un；特指用 le；复数用 des 或 les。'},
  {word:'une table',zh:'一张桌子；阴性名词',collocation:'la table / sur la table',note:'与 sur 组成位置语块。'},
  {word:'un bureau',zh:'一张书桌；阳性名词',collocation:'sur le bureau',note:'bureau 指书桌时为阳性。'},
  {word:'une chaise',zh:'一把椅子；阴性名词',collocation:'sous la chaise',note:'sous 表示在……下方。'},
  {word:'un stylo',zh:'一支笔；阳性名词',collocation:'pas de stylo',note:'否定存在时使用 de。'},
  {word:'un ordinateur',zh:'一台电脑；阳性名词',collocation:"l'ordinateur / pas d'ordinateur",note:'练习 l’ 和 d’ 的省音。'},
  {word:'près de',zh:'在……附近',collocation:'près de la fenêtre',note:'后接参照物时注意其冠词。'},
  {word:'sur / sous',zh:'在……上面／下面',collocation:'sur la table / sous la table',note:'改变介词会改变实际位置。'},
  {word:'il y a',zh:'有；存在',collocation:'Il y a une table.',note:'描述某处存在。'},
  {word:"il n'y a pas de",zh:'没有',collocation:"Il n'y a pas de livre.",note:'表示普通否定存在。'}
 ],
 reading:{title:'从逐句判断到完整房间介绍',instruction:'第一次读只判断“介绍、定位、否定”三类功能；第二次读圈出每个冠词及其对应名词；最后看中文翻译核对。',
  pairs:[
   fr('Voici ma chambre.','这是我的房间。','开头建立场景。'),
   fr('Il y a un bureau près de la fenêtre.','窗户旁有一张书桌。','un bureau 首次引入阳性单数名词。'),
   fr('Il y a aussi une lampe sur le bureau.','书桌上还有一盏灯。','une lampe 首次引入阴性名词；le bureau 已明确。'),
   fr('La lampe est blanche.','那盏灯是白色的。','第二次提到灯，用 la；blanche 与阴性名词配合。'),
   fr('Ce sont des livres sur la table.','这些是桌上的一些书。','复数指认：ce sont des livres。'),
   fr("Il n'y a pas d'ordinateur dans ma chambre.",'我的房间里没有电脑。','没有 + 元音开头名词：pas d’ordinateur。'),
   fr("Mais ce n'est pas un problème.",'但这并不是一个问题。','être 表语保留 un，形成否定规则的反例。')
  ],note:'思考：为什么第二句用 un bureau、第三句用 le bureau？为什么没有电脑写 d’ordinateur，而“这不是问题”仍写 un problème？'},
 practice:{
  0:[{question:'“Il y a une table près de la fenêtre.” 是在指认物品，还是介绍某处存在的物品？',answer:'介绍存在：窗户旁有一张桌子。',explanation:'il y a 表示存在，près de la fenêtre 补充位置。'}],
  1:[
   {question:'填空：C’est ___ chaise.（一把椅子）',answer:'une',explanation:'chaise 是阴性单数；首次引入使用 une。'},
   {question:'填空：___ livres sont sur la table.（那些书）',answer:'Les',explanation:'名词 livres 为复数；说话双方已知或明确时用 les。'},
   {question:"改错：Il n'y a pas des stylos ici.",answer:"Il n'y a pas de stylos ici.",explanation:'表示没有物品的普通否定，des 通常变成 de。'},
   {question:"改错：Ce n'est pas de livre.",answer:"Ce n'est pas un livre.",explanation:'在 être 后作表语的 un 不按普通否定存在句的规则变 de。'},
   {question:'判断：Je n’aime pas les livres. 是否需要把 les 改为 de？',answer:'不需要。',explanation:'这里 les 泛指书这一类别；是否定 aimer，而非否定存在或数量。'}],
  2:[{question:'怎样一起记忆 ordinateur 的定冠词及否定存在形式？',answer:"l'ordinateur；pas d'ordinateur",explanation:'单数定冠词 le 在元音前一般省音成 l’；de 在元音前变为 d’。'}],
  3:[
   {question:'根据阅读材料，桌子附近有什么？',answer:'一张书桌靠窗，书桌上还有一盏灯。',explanation:'第二、三句依次引入 bureau 和 lampe；注意也可以用原文复述。'},
   {question:'文章末尾哪两句的否定冠词不同？为什么？',answer:"Il n'y a pas d'ordinateur / Ce n'est pas un problème.",explanation:'前者是“没有”的存在句，后者用 être 进行判断，保留 un。'}],
  5:[{question:'把“房间里没有电脑，但这不是问题”翻译成两句法语。',answer:"Il n'y a pas d'ordinateur dans ma chambre. Mais ce n'est pas un problème.",explanation:'第一句 d’ordinateur 属于否定存在；第二句 un problème 是 être 的表语。'}]
 },
 output:{task:'写 5—6 句法语介绍一个房间。必须包含一种首次引入的物品、一种已经明确的物品、一个方位语块、一句 ce sont 和一句否定存在句。',
  steps:['先写 Voici … 交代地点。','用 Il y a + un/une/des 引入两件物品。','用 le/la/les 和 sur、sous 或 près de 描述已知物品。','写 ce sont + des + 复数名词。','最后添加 il n’y a pas de/d’ 并逐词检查。'],
  model:[
   fr('Voici ma chambre.','这是我的房间。','第 1 步：建立场景。'),
   fr('Il y a un bureau près de la fenêtre.','窗边有一张书桌。','第 2 步：首次引入 un bureau。'),
   fr('Une lampe est sur le bureau.','一盏灯在书桌上。','第 3 步：新物品 + 已知书桌。'),
   fr('La lampe est blanche.','那盏灯是白色的。','第 4 步：la lampe 指向已知的灯。'),
   fr('Ce sont des livres sur la table.','这些是桌子上的一些书。','第 5 步：用 ce sont 指认复数。'),
   fr("Il n'y a pas d'ordinateur ici.",'这里没有电脑。','第 6 步：否定存在与元音省音。')
  ],checklist:['名词性别和单复数是否与冠词一致？','首次引入和已知对象是否区分清楚？','是否区分 c’est / ce sont 与 il y a？','是否正确使用 pas de/d’，且未误改 être 的表语冠词？','至少两句在意义上承接前句，而不是孤立堆砌。']}
};
export const STUDY_SPACES:CuratedUnit={
 id:'study-spaces',language:'en',
 prerequisite:'已能识别基本英语主谓宾结构和 because / but；本课重点在讲座组织、证据力度及准确复述，不要求记忆学术专有数据。',
 goal:'听出讲座的开题、测量、举例、限制与结论；区分 occupancy 与 learning outcomes；写出 80—120 词、有原文依据且不过度推断的英文概要。',
 scenario:'一位讲者讨论学校是否应提供更多学习空间。他先提出一个研究问题，再介绍使用量的观察方法、不同学生的使用需求，最后提醒听众不要用使用人数直接证明学习成绩的提升。',
 scene:[
  en('The lecture considers whether providing study spaces leads to better learning.','这场讲座讨论：提供学习空间是否能够改善学习。','whether 标记研究问题，尚未得出肯定结论。','source'),
  en('Its first section describes how room occupancy can be observed, while the second uses examples to show that students’ schedules and preferences differ.','第一部分介绍如何观察空间占用情况，第二部分通过实例说明学生的时间安排和偏好并不相同。','while 此处对照讲座两个部分的功能。','source'),
  en('The speaker then explains a critical limitation: usage figures indicate when spaces are occupied, but they do not measure academic achievement.','随后讲者指出关键局限：使用量数据能表明空间何时被占用，却不能衡量学业成绩。','but 将观察指标与学习结果分开。','source')
 ],
 grammar:[
  {title:'1. Signposting：开题、举例、限定与总结',principle:'话语标记词的作用是提示听众“接下来是什么功能”，并不天然证明命题成立。To begin with 引出初始环节；Let me illustrate this 引入说明性例子；However 常标示对比或限定；To sum up 引出概括。必须结合相邻句判断其具体作用。',pattern:'opening → illustration → qualification → synthesis',
   examples:[
    en('To begin with, we need to define what room occupancy measures.','首先，我们需要定义空间占用率究竟衡量什么。','to begin with：引入第一部分。'),
    en('Let me illustrate this with two students who use the library at different times.','让我以两个在不同时段使用图书馆的学生为例。','illustrate：举例说明，不是研究测量结果。'),
    en('However, a busy room does not necessarily mean that learning has improved.','然而，房间繁忙并不必然意味着学习有所改善。','however：限制可能的错误推论。'),
    en('To sum up, usage should be considered alongside evidence of learning.','总而言之，使用情况应与学习成效的证据结合考虑。','总结时保留证据边界。')]},
  {title:'2. Stance and modality：语气不能强于证据',principle:'may 和 could 常表达可能性；appears to 通常表示从现有迹象看来；is consistent with 表示“与……相符”，并不证明唯一原因；demonstrates 语气更强。复述时不可将 may 改成 definitely，或将关联直接改写为因果。',pattern:'may / could / appears to / is consistent with ≠ proves / guarantees',
   examples:[
    en('Extra spaces may help some students study more comfortably.','额外的学习空间可能帮助部分学生更舒适地学习。','may：保留可能性，限定部分学生。'),
    en('The pattern is consistent with demand at peak times.','这种模式与高峰时段的需求相符。','与某解释相符，不是因果证明。'),
    en('Occupancy figures do not demonstrate improved grades.','占用率数据不能证明成绩得到提高。','用否定来界定证据能力。')]},
  {title:'3. Question, method, evidence and conclusion',principle:'研究问题（whether）与观察方法（how occupancy is observed）不是同一种信息。方法只说明怎样收集指标；结果说明指标发现了什么；讨论局限时必须说明它无法回答什么。不要把说明性案例作为实测结论。',pattern:'research question → observation method → illustrative example → limitation → cautious conclusion',
   examples:[
    en('The lecture considers whether providing study spaces leads to better learning.','讲座考察提供学习空间是否改善学习。','这是问题。','source'),
    en('Room occupancy can be observed at different times.','可以在不同时段观察空间占用情况。','这是测量方案的描述，非学习结果。'),
    en('A crowded room is not direct evidence of better examination scores.','拥挤的房间不是考试分数提高的直接证据。','正确区分测量指标与结果。')]},
  {title:'4. Paraphrase：准确保留范围、方法和限定',principle:'改写不能只替换近义词。原文 access / availability 指“可以使用／可获得”，不等于 successful learning；usage / occupancy 指空间利用，并非 examination results。概括时保留人群、方法、限定条件和讲者态度。',pattern:'source meaning + population + evidence type + limitation',
   examples:[
    en('Usage figures indicate when spaces are occupied, but they do not measure academic achievement.','使用量数据显示空间何时有人使用，但不能测量学业表现。','完整改写必须保留 but 后的限制。','source'),
    en('The number of users describes facility use, not learning outcomes.','使用人数描述的是设施利用情况，而不是学习成果。','这是等义概括，不新增因果关系。')]},
  {title:'5. Five-cell lecture map：让结构成为复述依据',principle:'五格笔记法将材料分入 opening、measurement、illustration、limitation、conclusion。遇到 however 或 but 时优先核对“限定了什么”，遇到例子时先记录其用途，再判断是否真的有结果测量。',pattern:'Opening | Measurement | Illustration | Limitation | Conclusion',
   examples:[
    en('Opening: whether study spaces improve learning.','开题：学习空间是否改善学习。','保留问句性质。'),
    en('Limitation: occupancy does not measure grades.','局限：占用率不衡量成绩。','不能误写成“空间使成绩提高”。')]}
 ],
 vocabulary:[
  {word:'signpost',zh:'话语结构标记',collocation:'signpost a transition / conclusion',note:'理解词的功能，而非机械判定论点。'},
  {word:'to begin with',zh:'首先；开始时',collocation:'To begin with, …',note:'用于开头或列举第一项。'},
  {word:'illustrate',zh:'举例阐明',collocation:'Let me illustrate this.',note:'说明性例子不是自动等于统计证据。'},
  {word:'however',zh:'然而；不过',collocation:'However, …',note:'通常标示转折、对照或限定，需看上下文。'},
  {word:'to sum up',zh:'概括而言',collocation:'To sum up, …',note:'引出综合结论。'},
  {word:'occupancy',zh:'占用状态；占用率',collocation:'room occupancy / occupancy figures',note:'衡量空间是否有人，不是考试成绩。'},
  {word:'measurement',zh:'测量；衡量',collocation:'measurement of facility usage',note:'问清楚测量的是哪个变量。'},
  {word:'limitation',zh:'局限；限制条件',collocation:'a critical limitation',note:'考试听力中重点捕捉的论证边界。'},
  {word:'academic achievement',zh:'学业成就；学业表现',collocation:'measure academic achievement',note:'不同于空间使用频率。'},
  {word:'is consistent with',zh:'与……相符',collocation:'is consistent with higher demand',note:'不能擅自改写成 proves。'}
 ],
 reading:{title:'按讲座逻辑精读四句原文示范摘要',instruction:'先不看中文：给四句分别贴上“问题／方法与示例／证据局限／审慎结论”的标签；再用中文逐句核对。听力第一遍只记五格标题，第二遍补充证据与限定。',
  pairs:[
   en('The lecture considers whether providing study spaces leads to better learning.','讲座讨论：提供学习空间是否会改善学习。','研究问题，不是研究结论。','source'),
   en('Its first section describes how room occupancy can be observed, while the second uses examples to show that students’ schedules and preferences differ.','第一部分解释如何观察空间占用情况，第二部分通过例子说明学生的时间安排和偏好有差异。','前半是观察方式，后半是说明性例子。','source'),
   en('The speaker then explains a critical limitation: usage figures indicate when spaces are occupied, but they do not measure academic achievement.','讲者随后指出关键局限：使用量数据显示空间何时被占用，但无法衡量学业成就。','核心测量边界：occupancy 不是 learning outcome。','source'),
   en('The central message is that decisions about learning facilities should consider diverse needs and collect appropriate evidence rather than infer a causal educational benefit from occupancy alone.','核心观点是：学习设施的决策应考虑多样化需求并收集适当证据，而不应仅凭占用情况推断教育收益的因果关系。','结论为建议如何决策，并非已证明成绩提高。','source')
  ],note:'把 opening / measurement / illustration / limitation / conclusion 各用一格笔记记录。第二句兼含测量与说明性示例，因此五格是逻辑标注，不一定一格恰好一句。'},
 practice:{
  0:[{question:'讲座要解决的研究问题是什么？有没有直接宣布答案？',answer:'提供学习空间是否改善学习；没有直接宣布肯定结果。',explanation:'whether 引出研究问题，不能当成“已经证明”。'}],
  1:[
   {question:'To begin with、Let me illustrate this、However、To sum up 分别提示什么功能？',answer:'开题或起始、说明性例子、转折或限定、总结概括。',explanation:'这些词只标记论证功能，含义仍须结合语境。'},
   {question:'改错：The lecturer says occupancy proves higher grades.',answer:'The lecturer says that occupancy shows facility use but does not measure academic achievement.',explanation:'原文只说占用情况可被观察；不能根据使用量证明成绩提高。'},
   {question:'把 “Spaces may improve learning” 改成 “Spaces definitely improve learning” 是否可以？',answer:'不可以。',explanation:'may 表可能性，definitely 表确定性，会夸大证据强度。'}],
  2:[{question:'填空：Room ___ describes facility use; academic ___ refers to learning outcomes.',answer:'occupancy; achievement',explanation:'两者属于不同变量，不能把前者当成后者的测量值。'}],
  3:[
   {question:'五格笔记中 measurement 一格填什么？',answer:'How room occupancy can be observed; usage figures show when spaces are occupied.',explanation:'方法和指标涉及空间使用情况，不是成绩测试。'},
   {question:'第二部分的学生日程与偏好属于数据测量结果还是说明性例子？',answer:'说明性例子（illustration）。',explanation:'原摘要说 uses examples，不能擅自声称测得成绩变化。'},
   {question:'作者认为应该怎样作出设施决策？',answer:'Consider diverse needs and collect appropriate evidence; do not infer causality from occupancy alone.',explanation:'最后一句强调多样需求和证据，反对仅凭占用率作因果推断。'}],
  5:[{question:'把“占用率能显示空间什么时候被使用，却不能证明成绩提高”写成一句英语。',answer:'Occupancy figures can show when spaces are used, but they cannot prove that grades have improved.',explanation:'使用 but 表明证据局限，并保留 cannot。'}]
 },
 output:{task:'写一段 80—120 词的英文讲座概要。先完成五格结构笔记，随后按研究问题—方法与示例—证据局限—建议的顺序组织段落；不得加入原文没有支持的成绩数据。',
  steps:['Opening：用 examines whether… 标明待研究的问题。','Measurement：交代 room occupancy 能观察到什么。','Illustration：说明不同学生的安排和需求，并避免将例子冒充结果。','Limitation：使用 however / but 明示占用率无法证明成绩提高。','Conclusion：提出符合讲者观点的审慎决策建议，最后检查词数和原文证据。'],
  model:[
   en('The lecture examines whether providing study spaces leads to better learning.','讲座考察增加学习空间是否改善学习。','以待验证的问题开篇。'),
   en('It first explains how room occupancy can be observed, and then uses examples to illustrate differences in students’ schedules and preferences.','它先解释如何观察空间占用情况，再用例子说明学生日程与偏好上的差异。','保留方法与例子的不同用途。'),
   en('However, occupancy figures reveal when facilities are used, not whether academic achievement has improved.','然而，占用率只能说明设施何时被使用，而不能说明学业表现是否提高。','转折清楚标注证据边界。'),
   en('The speaker therefore argues that facilities planning should consider diverse needs and gather appropriate evidence before making claims about educational benefits.','因此讲者主张：设施规划应考虑不同需求，并在声称教育收益前收集合适的证据。','审慎归纳，避免因果夸大。'),
   en('A busy study area alone is not proof that grades will rise.','仅有繁忙的学习空间，并不能证明成绩会提高。','最后再次明确结论界限。')
  ],checklist:['是否是研究问题，而非直接宣布肯定结论？','是否正确区分 occupancy、illustration 与 academic achievement？','however 和 may 等语气是否符合原文限制？','是否避免编造样本规模、成绩变化或因果证据？','英文是否连贯且在 80—120 词范围内？']}
};
export function curatedUnitForSource(courseId:string,sourceText:string,privateSource:boolean):CuratedUnit|null{
 if(!privateSource||!sourceText.trim())return null;
 const normalized=sourceText.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
 if(courseId.startsWith('fr-')&&normalized.includes('un/une/des')&&normalized.includes('il y a'))return FRENCH_ARTICLES;
 if(courseId.startsWith('en-')&&/study spaces|room occupancy/.test(normalized)&&/better learning|academic achievement/.test(normalized))return STUDY_SPACES;
 return null;
}
