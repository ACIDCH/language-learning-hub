/**
 * Course-specific bilingual teaching supplements.
 * These are authored Chinese notes/translated examples, not modifications to private originals.
 */
export type ParallelSentence={target:string;zh:string;note:string};
export type ChineseLessonNotes={
 situation:string;goal:string;
 dialogue:ParallelSentence[];
 grammar:{title:string;explain:string;examples:ParallelSentence[]}[];
 vocabulary:{word:string;meaning:string;collocation:string}[];
 reading:{title:string;pairs:ParallelSentence[];technique:string};
 output:{task:string;frame:ParallelSentence[];review:string[]};
};
export const CHINESE_LESSON_NOTES:Record<string,ChineseLessonNotes>={
 'fr-a1-u01':{
  situation:'法语课堂开学日，新同学初次见面，先学习礼貌问候，再介绍姓名、身份和国籍，最后问候对方。',
  goal:'能够用 Bonjour / Enchanté(e) 自然开场；区分 tu 与 vous；正确使用 être 现在时和 Je m’appelle… 完成 30 秒自我介绍。',
  dialogue:[
   {target:"Bonjour ! Je m'appelle Camille.",zh:'你好！我叫卡米耶。',note:'Bonjour 用于日间问候；Je m’appelle 后直接接姓名。'},
   {target:'Et vous, comment vous appelez-vous ?',zh:'那您呢，您叫什么名字？',note:'vous 用于正式或较礼貌的交际场景。'},
   {target:'Enchanté !',zh:'很高兴认识您！',note:'说话者为男性可用 enchanté，女性常写 enchantée。'},
   {target:'Vous êtes étudiant ?',zh:'您是学生吗？',note:'使用 être 的 vous 形式 êtes，不能写 vous es。'}
  ],
  grammar:[
   {title:'être：表示身份或状态的核心动词',explain:'法语“我是一名学生”使用 je suis。être 的现在时需要与主语配合：je suis、tu es、il/elle est、nous sommes、vous êtes、ils/elles sont。学习时应将主语与动词一起记忆。',
    examples:[
     {target:'Je suis étudiant.',zh:'我是一名男学生。',note:'说话者为女性时通常写 étudiante。'},
     {target:'Vous êtes française ?',zh:'您是法国人吗？',note:'vous 对应 êtes；这里形容词配合女性对象。'},
     {target:'Nous sommes étudiants.',zh:'我们是学生。',note:'nous 后的动词是 sommes。'}]},
   {title:'Je m’appelle：姓名介绍',explain:'Je m’appelle + 姓名是自然高频表达，其中 m’ 不可遗漏。询问姓名时可使用 Comment vous appelez-vous ?，熟人之间可说 Comment tu t’appelles ?。',
    examples:[
     {target:"Je m'appelle Samira.",zh:'我叫萨米拉。',note:'不要省略 m’ 写成 Je appelle。'},
     {target:'Comment vous appelez-vous ?',zh:'您叫什么名字？',note:'更正式的提问形式。'}]},
   {title:'tu / vous 与国籍配合',explain:'tu 适合关系熟悉的单数对象；vous 可以表示礼貌单数或复数。形容词可能随性数变化，如 français / française、étudiant / étudiante。',
    examples:[
     {target:'Tu es français ?',zh:'你是法国人吗？',note:'这里用熟人称谓 tu，动词是 es。'},
     {target:'Elle est canadienne.',zh:'她是加拿大人。',note:'canadienne 是与阴性主语配合的形式。'}]}
  ],
  vocabulary:[
   {word:'bonjour',meaning:'你好／您好',collocation:'Bonjour, Madame.：您好，女士'},
   {word:'salut',meaning:'嗨／再见（非正式）',collocation:'Salut !：熟人打招呼'},
   {word:"je m'appelle",meaning:'我叫……',collocation:"Je m'appelle Camille."},
   {word:'enchanté(e)',meaning:'很高兴认识您',collocation:'Enchanté de vous rencontrer.'},
   {word:'étudiant(e)',meaning:'学生',collocation:'Je suis étudiant(e).'},
   {word:'professeur',meaning:'老师',collocation:'notre professeur：我们的老师'},
   {word:'au revoir',meaning:'再见',collocation:'Au revoir, à bientôt !'},
   {word:'à bientôt',meaning:'回头见',collocation:'告别时使用'}
  ],
  reading:{title:'从自我介绍到小段阅读',pairs:[
   {target:"Je m'appelle Léa.",zh:'我叫莱娅。',note:'先介绍姓名。'},
   {target:'Je suis française, et mon ami Thomas est canadien.',zh:'我是法国人，我的朋友托马斯是加拿大人。',note:'比较 française 和 canadien 的性数形式。'},
   {target:"Nous sommes étudiants à l'université.",zh:'我们是大学生。',note:'nous 对应 sommes。'},
   {target:"Notre professeur s'appelle Madame Martin.",zh:'我们的老师叫马丁女士。',note:'第三人称 s’appelle 仍然使用反身结构。'}
  ],technique:'先识别每个句子的主语，再找 être / s’appeler 的变位，最后核对性别、国籍和身份信息。不要逐字按英语词序翻译。',
  output:{task:'模拟开学日的新同学见面：用四至六句法语依次问候、报姓名、说明身份或国籍、询问对方并礼貌告别。',
   frame:[
    {target:"Bonjour, je m'appelle Camille.",zh:'你好，我叫卡米耶。',note:'问候与姓名。'},
    {target:'Je suis étudiant en informatique.',zh:'我学习计算机专业。',note:'身份与学科。'},
    {target:'Et vous, comment vous appelez-vous ?',zh:'那您呢，您叫什么名字？',note:'向对方提问。'},
    {target:'Enchanté, à bientôt !',zh:'很高兴认识您，回头见！',note:'自然结束。'}],
   review:['根据场合正确选择 tu 或 vous','je suis 与 vous êtes 变位一致','自我介绍和国籍的性数配合正确','对话开场、介绍、提问、结束完整']}
 },
 'fr-a1-u04':{
  situation:'学生住宿舍后向朋友描述房间，学习先列举物品再说明它们的位置。',
  goal:'用 Il y a、près de、sur、sous 以及冠词描述至少三个房间物品的空间关系。',
  dialogue:[
   {target:'Voici ma chambre.',zh:'这是我的房间。',note:'Voici 用于介绍眼前的对象。'},
   {target:'Il y a un bureau près de la fenêtre.',zh:'窗户旁边有一张书桌。',note:'Il y a 引入新物品；près de 说明位置。'},
   {target:'Un livre est sur le bureau.',zh:'一本书在书桌上。',note:'sur 表示“在……上面”。'},
   {target:'Mon sac est sous la chaise.',zh:'我的包在椅子下面。',note:'sous 表示“在……下面”。'}
  ],
  grammar:[
   {title:'位置表达：Il y a + 名词 + 地点',explain:'描述某处存在物品：先用 il y a 引入物品，再用地点补充信息，地点词组通常放在句尾。',
    examples:[{target:'Il y a un bureau près de la fenêtre.',zh:'窗户旁边有一张书桌。',note:'重点是有一张书桌。'}]},
   {title:'描述已有物品：主语 + être + 位置',explain:'要告诉别人某物“在哪里”，应让该物作主语，后接 est 及位置词组；注意位置方向，不要颠倒主语。',
    examples:[
     {target:'Un livre est sur le bureau.',zh:'一本书在桌上。',note:'书在上，桌子在下。'},
     {target:'Mon sac est sous la chaise.',zh:'我的包在椅子下面。',note:'包是主语，椅子是参照物。'}]},
   {title:'冠词与名词性数一起学习',explain:'un bureau 是阳性单数，une chaise 是阴性单数；已经明确的对象可能转成 le bureau、la chaise；注意 le/la 与 un/une 用途不同。',
    examples:[
     {target:'Il y a un bureau.',zh:'有一张书桌。',note:'第一次引入物品。'},
     {target:'Le livre est sur le bureau.',zh:'书在那张书桌上。',note:'第二次提到已明确书桌。'}]}
  ],
  vocabulary:[
   {word:'un bureau',meaning:'书桌',collocation:'sur le bureau：在书桌上'},
   {word:'une chaise',meaning:'椅子',collocation:'sous la chaise：在椅子下'},
   {word:'une étagère',meaning:'书架',collocation:'sur l’étagère：在架子上'},
   {word:'un cahier',meaning:'练习本',collocation:'trois cahiers：三本练习本'},
   {word:'sur / sous',meaning:'上面／下面',collocation:'两者构成方向对照'}
  ],
  reading:{title:'房间介绍的语义顺序',pairs:[
   {target:'Voici ma chambre.',zh:'这是我的房间。',note:'交代地点。'},
   {target:'Il y a un bureau près de la fenêtre.',zh:'窗边有一张书桌。',note:'引入主要物品。'},
   {target:'Mon sac est sous la chaise.',zh:'我的包在椅子下面。',note:'补充具体空间关系。'}
  ],technique:'依次画出“房间—书桌—窗户—椅子—包”的位置关系，不能只靠孤立单词记忆。'},
  output:{task:'写四至六句话介绍自己的学习空间，要求至少有三个具体物品和两个不同的方位词。',
   frame:[
    {target:'Voici ma chambre.',zh:'这是我的房间。',note:'情境开场。'},
    {target:'Il y a un bureau près de la fenêtre.',zh:'窗户旁有书桌。',note:'存在句。'},
    {target:'Mon sac est sous la chaise.',zh:'包在椅子下。',note:'位置句。'}],
   review:['先介绍场景，再说明物品','sur、sous、près de 所指关系准确','名词冠词与性数相符']}
 },
 'en-ielts-listening-u01':{
  situation:'听一段关于城市树木养护的学术讲座，先识别讲座思路，再在笔记中记录事实和限制条件。',
  goal:'准确识别 to begin with、however、finally 的话语功能，并用中文整理“论点—条件—衡量方式”。',
  dialogue:[
   {target:'To begin with, we need to distinguish planting a tree from maintaining it.',zh:'首先，我们需要区分种树和持续养护树木。',note:'to begin with 在此标记开题；distinguish A from B 为核心搭配。'},
   {target:'A new tree provides little shade during its first few years.',zh:'新种的树在最初几年提供的树荫很少。',note:'little shade 表示树荫少，与后来树冠长大形成对比。'},
   {target:'However, this benefit depends partly on water, space and the choice of species.',zh:'然而，这一好处部分取决于水、空间和树种选择。',note:'however 引出前述效果的适用条件，而非全面否定。'},
   {target:'Finally, we will ask how a council can report survival rates.',zh:'最后，我们要讨论市政机构应如何报告树木存活率。',note:'finally 标记讨论顺序收束。'}
  ],
  grammar:[
   {title:'话语标记与结构',explain:'to begin with 指出第一部分；however 引入转折或限制；finally 引入最后一项。这些词告诉我们内容在讲座中的位置，不是考试答案本身。',
    examples:[
     {target:'To begin with, we need to distinguish planting a tree from maintaining it.',zh:'首先要区分种树与养护。',note:'开题区分两个概念。'},
     {target:'However, this benefit depends partly on water.',zh:'但这一益处部分取决于水。',note:'限制前文条件。'}]},
   {title:'may 与 must 不能互换',explain:'may 表示一种可能效果，must 通常表达必要性或强推断。如果讲者只说 may help，笔记或复述时不能改成必然会改善。',
    examples:[{target:'As its canopy grows, it may help reduce heat.',zh:'随着树冠生长，它可能有助于降低热量。',note:'保留 may 的不确定程度。'}]},
   {title:'讲座笔记的层级',explain:'不用逐句抄写。以主题为上层，依次记录机制、条件和衡量方式，才能完整复述论证。',
    examples:[{target:'planting → shade → conditions → survival rates',zh:'种植 → 遮阴效果 → 条件 → 存活率',note:'箭头表达结构，而不是英文原文。'}]}
  ],
  vocabulary:[
   {word:'canopy',meaning:'树冠',collocation:'as the canopy grows：随着树冠生长'},
   {word:'retain',meaning:'保留',collocation:'retain moisture：保持水分'},
   {word:'maintenance',meaning:'维护；养护',collocation:'maintenance budget：维护预算'},
   {word:'survival rate',meaning:'存活率',collocation:'report survival rates：报告存活率'},
   {word:'to begin with',meaning:'首先',collocation:'段落开头的结构信号'},
   {word:'however',meaning:'然而',collocation:'引入限制或转折'}
  ],
  reading:{title:'讲座逻辑与中文对应',pairs:[
   {target:'A new tree provides little shade during its first few years.',zh:'新种的树在最初几年几乎没有太多树荫。',note:'背景事实。'},
   {target:'However, this benefit depends partly on water, space and the choice of species.',zh:'但这一收益部分取决于供水、空间及树种。',note:'边界条件。'},
   {target:'Finally, we will ask how a council can report survival rates instead of simply counting newly planted trees.',zh:'最后，讨论如何报告存活率，而不是仅数新种树木。',note:'衡量指标由数量转向结果。'}
  ],technique:'听每段开头的连接词，把笔记整理为“开题—论证—限制—总结”，先理解关系再听具体细节。'},
  output:{task:'根据原文作一份三层结构笔记，随后用英语复述 70—100 词；中文先列“核心论点、条件、结果”，英文保留 may 的语气。',
   frame:[
    {target:'The lecture distinguishes planting trees from maintaining them.',zh:'讲座区分了种树与养护。',note:'主旨。'},
    {target:'However, the benefit depends on several conditions.',zh:'但效果依赖若干条件。',note:'限定。'},
    {target:'Finally, it suggests reporting survival rates.',zh:'最后提出报告存活率。',note:'结论或后续问题。'}],
   review:['是否区分 planting 与 maintenance','however 是否对应条件而非全盘否定','是否保留 may 等不确定表达','是否区分种植总量与存活率']}
 },

 'en-ielts-listening-u01-study-spaces':{
  situation:'学术讲座讨论“提供学习空间是否有助于改善学习”。请先识别讲者介绍的观察方法、结果限制和结论，避免把设施使用量误读为成绩提升。',
  goal:'能区分研究问题、测量方式、示例与推论局限，用中英文完整说明“占用人数不等于学习效果”。',
  dialogue:[
   {target:'The lecture considers whether providing study spaces leads to better learning.',zh:'这场讲座讨论：提供学习空间是否会带来更好的学习效果。',note:'whether 引出待考察的问题，不等于已经得出肯定结论。'},
   {target:'Its first section describes how room occupancy can be observed.',zh:'讲座第一部分说明如何观察房间的使用情况。',note:'occupancy 是空间占用状态，不是学习成绩。'},
   {target:'The speaker then explains a critical limitation.',zh:'随后讲者指出一项关键限制。',note:'then 标记论证推进；limitation 引导证据边界。'},
   {target:'Usage figures indicate when spaces are occupied, but they do not measure academic achievement.',zh:'使用量数据能反映空间何时被占用，却不能测量学业表现。',note:'but 对比可观察事实与不能据此推出的因果结论。'}
  ],
  grammar:[
   {title:'研究问题与结论：whether 并不预设结果',explain:'whether…leads to… 提出待验证的问题；不应把问题直接写成结论“有学习空间就能提高成绩”。',
    examples:[{target:'The lecture considers whether providing study spaces leads to better learning.',zh:'讲座探讨提供学习空间是否改善学习。',note:'只有研究问题，还没有因果结论。'}]},
   {title:'测量指标与研究目的不同',explain:'room occupancy 可由人数或时段记录；academic achievement 则需要学业表现证据。两者不是同一个变量。',
    examples:[{target:'Usage figures indicate when spaces are occupied, but they do not measure academic achievement.',zh:'使用量显示何时有人使用空间，却不衡量学业成绩。',note:'but 提醒听众不要用占用数据代替学习结果。'}]},
   {title:'引用证据时区分强弱',explain:'may、could、appears to 等表达可能性，demonstrates 常表达更强的论据支持；有限的观察不能擅自上升为因果关系。',
    examples:[{target:'An illustrative example is not a measured result.',zh:'说明性例子并不等于测量得到的结果。',note:'要区分 illustration 和 evidence。'}]}
  ],
  vocabulary:[
   {word:'room occupancy',meaning:'房间占用情况',collocation:'observe room occupancy：观察空间使用状态'},
   {word:'measurement',meaning:'测量；衡量',collocation:'a measured result：实际测量的结果'},
   {word:'limitation',meaning:'局限；限制',collocation:'a critical limitation：关键局限'},
   {word:'academic achievement',meaning:'学业表现／成绩',collocation:'measure academic achievement：衡量学业表现'},
   {word:'lecture signpost',meaning:'讲座结构标记',collocation:'opening / illustration / conclusion'}
  ],
  reading:{title:'原文推论层次：研究问题—数据—限制',pairs:[
   {target:'The lecture considers whether providing study spaces leads to better learning.',zh:'讲座提出学习空间是否改善学习的问题。',note:'明确讨论对象。'},
   {target:'Its first section describes how room occupancy can be observed.',zh:'第一部分说明怎样观察房间占用情况。',note:'介绍观察方法。'},
   {target:'Usage figures indicate when spaces are occupied, but they do not measure academic achievement.',zh:'使用量只能衡量空间使用，不能直接衡量学业成绩。',note:'核心论证边界。'}
  ],technique:'听到 measurement、illustration、limitation、conclusion 等结构词时先写它们的功能，再把事实归入对应位置。'},
  output:{task:'根据讲座写一份五格结构图：研究问题／观察方法／举例／局限／结论；再用 80—110 词英语概括，不将占用数据推断成因果证据。',
   frame:[
    {target:'The lecture examines whether study spaces improve learning.',zh:'讲座考察学习空间是否促进学习。',note:'复述问题。'},
    {target:'Room occupancy can show when facilities are used.',zh:'占用数据可显示设施使用时段。',note:'说明指标能够反映什么。'},
    {target:'However, these figures cannot by themselves prove improved grades.',zh:'但这些数据本身不能证明成绩有所提高。',note:'指出结论边界。'}],
   review:['分清 measurement 与 outcome','例子不冒充研究证明','结论强度不能超过证据','五格讲座结构顺序完整']}
 }
,

 'fr-a1-u02':{
  situation:'新同学交流来自哪个国家、住在哪座城市、说什么语言。由 A1 第一课的 être 和自我介绍过渡到 habiter、parler、apprendre。',
  goal:'能用法语介绍居住城市和国籍，正确搭配 à + 城市、en/au/aux + 国家及三种高频动词。',
  dialogue:[
   {target:'Tu habites où ?',zh:'你住在哪里？',note:'熟人之间自然的口语提问。'},
   {target:"J'habite à Auckland.",zh:'我住在奥克兰。',note:'je + habite 缩合为 j’habite；城市前通常用 à。'},
   {target:'Je parle anglais et chinois.',zh:'我会说英语和中文。',note:'parler 后说语言通常不加定冠词。'},
   {target:"J'apprends le français.",zh:'我正在学习法语。',note:'apprendre 这里搭配 le français，与 parler 的用法不同。'}
  ],
  grammar:[
   {title:'habiter：住在某地',explain:'habiter 属常见 -er 动词：j’habite、tu habites、il/elle habite、nous habitons、vous habitez、ils/elles habitent。城市通常用 à；国家要区分 en / au / aux，不能一律用 à。',
    examples:[
     {target:"J'habite à Auckland.",zh:'我住在奥克兰。',note:'城市前用 à。'},
     {target:'Elle habite au Canada.',zh:'她住在加拿大。',note:'Canada 通常搭配 au。'},
     {target:'Ils habitent aux États-Unis.',zh:'他们住在美国。',note:'复数国名 États-Unis 通常搭配 aux。'}]},
   {title:'parler 和 apprendre：语言搭配',explain:'parler + 语言名称，基础表达中通常直接说 Je parle français；apprendre + 语言名称，此处使用 J’apprends le français，不能把两种动词的结构机械混用。',
    examples:[
     {target:'Je parle anglais.',zh:'我说英语。',note:'自然语言能力表达。'},
     {target:"J'apprends le français.",zh:'我学习法语。',note:'表示学习活动。'}]},
   {title:'être + 国籍形容词',explain:'Je suis française 用于女性说话者，Je suis français 用于男性。国籍形容词可能变化：canadien / canadienne；不要误写 Je suis Canada。',
    examples:[
     {target:'Je suis française.',zh:'我是法国人（女性）。',note:'形容词与主语性别一致。'},
     {target:'Je viens du Canada.',zh:'我来自加拿大。',note:'表来源时可用 venir de，但本课先掌握身份句。'}]}
  ],
  vocabulary:[
   {word:'habiter',meaning:'居住',collocation:"j'habite à Auckland"},
   {word:'parler',meaning:'说（语言）',collocation:'je parle français'},
   {word:'apprendre',meaning:'学习',collocation:"j'apprends le français"},
   {word:'une ville',meaning:'城市',collocation:'à + 城市'},
   {word:'un pays',meaning:'国家',collocation:'en France / au Canada'},
   {word:'une nationalité',meaning:'国籍',collocation:'être + 国籍形容词'}
  ],
  reading:{title:'一个人的居住地、语言与学习目标',pairs:[
   {target:"Je m'appelle Nora.",zh:'我叫诺拉。',note:'延续第一课的姓名介绍。'},
   {target:'Je suis étudiante en Nouvelle-Zélande.',zh:'我是在新西兰就读的女学生。',note:'étudiante 与女性主语配合。'},
   {target:"J'habite à Auckland et je parle anglais et chinois.",zh:'我住在奥克兰，会说英语和中文。',note:'居住地与语言能力用两个动词组织。'},
   {target:"En ce moment, j'apprends le français.",zh:'目前，我正在学习法语。',note:'en ce moment 表示目前正在进行的学习。'}
  ],technique:'逐句区分“来自哪里”“住在哪里”“说什么语言”“学习什么语言”，在笔记中将对应动词分列。',
  output:{task:'写 6 句法语介绍自己或虚构同学，包含国籍、城市、会说的语言、学习中的语言和问候语。',
   frame:[
    {target:"Je m'appelle Nora.",zh:'我叫诺拉。',note:'第一句：姓名。'},
    {target:"J'habite à Auckland.",zh:'我住在奥克兰。',note:'第二句：城市。'},
    {target:'Je parle anglais et chinois.',zh:'我说英语和中文。',note:'第三句：已有语言能力。'},
    {target:"J'apprends le français.",zh:'我正在学法语。',note:'第四句：学习中的语言。'}],
   review:['城市和国家介词区分准确','parler/apprendre 结构不混淆','国籍形容词性数正确','不同句子之间形成连贯自我介绍']}
 },
 'fr-a1-u03':{
  situation:'向法国朋友介绍家庭成员，说明自己和家人的年龄、职业、住处，练习 avoir 与 mon/ma/mes。',
  goal:'能正确描述“有几个家人”“某人多少岁”“谁是谁的家人”，在句子中用好 avoir、所有限定词及否定。',
  dialogue:[
   {target:'Tu as des frères et sœurs ?',zh:'你有兄弟姐妹吗？',note:'tu as 是 avoir 的第二人称形式。'},
   {target:"Oui, j'ai une sœur.",zh:'有，我有一个姐姐／妹妹。',note:'j’ai 表示“我有”。'},
   {target:'Elle a vingt ans.',zh:'她二十岁。',note:'法语表达年龄使用 avoir，不使用 être。'},
   {target:'Tes parents habitent ici ?',zh:'你的父母住在这里吗？',note:'tes 对应复数名词 parents。'}
  ],
  grammar:[
   {title:'avoir：表示拥有及年龄',explain:'avoir 现在时分别为 j’ai、tu as、il/elle a、nous avons、vous avez、ils/elles ont。法语说年龄用“有 XX 岁”，不要模仿英语说 Je suis vingt ans。',
    examples:[
     {target:"J'ai un frère.",zh:'我有一个兄弟。',note:'拥有关系。'},
     {target:'Elle a vingt ans.',zh:'她二十岁。',note:'年龄使用 avoir。'},
     {target:'Nous avons deux frères.',zh:'我们有两个兄弟。',note:'nous 对应 avons。'}]},
   {title:'mon / ma / mes 按被修饰名词变化',explain:'mon 通常修饰阳性单数，ma 修饰阴性单数，mes 修饰复数；选择依据是后面名词的性数，并非“我”是男是女。',
    examples:[
     {target:'Mon père travaille à Lyon.',zh:'我父亲在里昂工作。',note:'père 是阳性单数。'},
     {target:'Ma mère parle français.',zh:'我母亲说法语。',note:'mère 是阴性单数。'},
     {target:'Mes amis sont étudiants.',zh:'我的朋友们是学生。',note:'amis 是复数。'}]},
   {title:'元音开头名词与否定',explain:'mon amie 虽然 amie 是阴性单数，但以元音开头，通常用 mon；Je n’ai pas de frère 的否定结构中，不定冠词常变为 de。',
    examples:[
     {target:'Mon amie habite à Paris.',zh:'我的女性朋友住在巴黎。',note:'不是 ma amie。'},
     {target:"Je n'ai pas de frère.",zh:'我没有兄弟。',note:'否定句中常见 pas de。'}]}
  ],
  vocabulary:[
   {word:'une famille',meaning:'家庭',collocation:'dans ma famille：在我的家庭里'},
   {word:'un frère',meaning:'兄弟',collocation:"j'ai un frère"},
   {word:'une sœur',meaning:'姐妹',collocation:"j'ai une sœur"},
   {word:'mes parents',meaning:'我的父母',collocation:'parents 为复数'},
   {word:'avoir',meaning:'有；表示年龄',collocation:'avoir vingt ans：二十岁'},
   {word:'mon / ma / mes',meaning:'我的（按名词性数选择）',collocation:'mon père / ma mère / mes amis'}
  ],
  reading:{title:'介绍家人的小段落',pairs:[
   {target:"Je m'appelle Chloé.",zh:'我叫克洛伊。',note:'用姓名开场。'},
   {target:'Dans ma famille, nous sommes quatre personnes.',zh:'我们家有四个人。',note:'介绍家庭整体。'},
   {target:"J'ai un frère et mes parents habitent à Lille.",zh:'我有一个兄弟，我的父母住在里尔。',note:'区分拥有和居住。'},
   {target:'Mon frère s’appelle Hugo.',zh:'我的兄弟叫雨果。',note:'所有限定词连接人物关系。'},
   {target:'Il a dix-neuf ans.',zh:'他十九岁。',note:'年龄用 avoir。'}
  ],technique:'先找“家庭成员是谁”，再看代词和所有限定词分别指谁；根据原文区分家庭人数与各自年龄。',
  output:{task:'用 6—8 句法语介绍一位真实或虚构家人，至少表达一项年龄、两名家庭成员、两个不同所有限定词及一个否定句。',
   frame:[
    {target:"Dans ma famille, nous sommes quatre personnes.",zh:'我家有四个人。',note:'先介绍整体。'},
    {target:"J'ai une sœur.",zh:'我有一个姐妹。',note:'再介绍人物。'},
    {target:'Elle a vingt ans.',zh:'她二十岁。',note:'补充年龄。'},
    {target:"Je n'ai pas de frère.",zh:'我没有兄弟。',note:'练习否定。'}],
   review:['avoir 的人称变位正确','年龄不使用 être','mon/ma/mes 依据后面的名词','否定结构符合基本法语语序']}
 },

};
