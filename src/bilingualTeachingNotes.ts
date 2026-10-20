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
  situation:'第一次向新同学介绍自己，并说明房间中有什么物品。先学会辨认物品，再学会完整造句。',
  goal:'能够用 C’est / Ce sont 介绍物品，用 Il y a 说明存在，用 un/une/des 和 le/la/les 区分首次提及与双方已知的对象。',
  dialogue:[
   {target:'Bonjour ! Je m’appelle Marie.',zh:'你好！我叫玛丽。',note:'Je m’appelle… 用于自我介绍。'},
   {target:'C’est une table.',zh:'这是一张桌子。',note:'用 C’est + 单数名词词组辨认物品。'},
   {target:'Il y a des livres sur la table.',zh:'桌子上有一些书。',note:'Il y a 说明“有”；sur 表示在上面。'},
   {target:'Il n’y a pas de stylo ici.',zh:'这里没有钢笔。',note:'否定存在时常使用 pas de。'}
  ],
  grammar:[
   {title:'不定冠词：un / une / des',explain:'首次介绍尚未明确指认的名词时，阳性单数用 un，阴性单数用 une，复数用 des。冠词并非英语 a/an 的机械替代；需连同名词的性数一起记。',
    examples:[
     {target:'C’est un livre.',zh:'这是一本书。',note:'livre 为阳性单数，因此用 un。'},
     {target:'C’est une table.',zh:'这是一张桌子。',note:'table 为阴性单数，因此用 une。'},
     {target:'Ce sont des livres.',zh:'这些是书。',note:'复数名词用 des；主语展示句使用 Ce sont。'}]},
   {title:'定冠词：le / la / les / l’',explain:'当所指对象已经明确或双方已知时，阳性单数用 le，阴性单数用 la，复数用 les；元音或哑音 h 前，单数常缩合为 l’。',
    examples:[
     {target:'Le livre est sur la table.',zh:'那本书在桌子上。',note:'这本书和桌子在语境里已有明确所指。'},
     {target:'L’ordinateur est ici.',zh:'电脑在这里。',note:'ordinateur 以元音起首，所以是 l’ordinateur。'}]},
   {title:'C’est 与 Il y a 的不同作用',explain:'C’est 用来指认“这是什么”；Il y a 用来说明某处“有什么”。否定 Il y a 时通常变成 Il n’y a pas de + 名词。',
    examples:[
     {target:'C’est une table.',zh:'这是一张桌子。',note:'回答“这是什么？”'},
     {target:'Il y a une table dans la chambre.',zh:'房间里有一张桌子。',note:'回答“房间里有什么？”'},
     {target:'Il n’y a pas de livre.',zh:'没有书。',note:'否定不定冠词通常用 de，而不是 des。'}]}
  ],
  vocabulary:[
   {word:'une table',meaning:'桌子',collocation:'sur la table：在桌上'},
   {word:'un livre',meaning:'书',collocation:'le livre：那本书'},
   {word:'un stylo',meaning:'钢笔',collocation:'pas de stylo：没有笔'},
   {word:'un ordinateur',meaning:'电脑',collocation:'l’ordinateur：这台电脑'},
   {word:'une chambre',meaning:'房间／卧室',collocation:'dans la chambre：在房间里'}
  ],
  reading:{title:'从单词到句子，再到三句描述',pairs:[
   {target:'C’est une chambre.',zh:'这是一间房间。',note:'先建立描述对象。'},
   {target:'Il y a une table dans la chambre.',zh:'房间里有一张桌子。',note:'然后引入新物品。'},
   {target:'Le livre est sur la table.',zh:'那本书在桌子上。',note:'最后用已知名词说明位置。'}
  ],technique:'观察三句的衔接：第一句介绍场景，第二句使用不定冠词加入新信息，第三句用定冠词回指已有物品。'},
  output:{task:'用法语写五句话介绍房间：至少包含两种名词性别、一次定冠词、一次 Il y a，以及一个否定句。',
   frame:[
    {target:'Voici ma chambre.',zh:'这是我的房间。',note:'开场。'},
    {target:'Il y a une table et un livre.',zh:'有一张桌子和一本书。',note:'介绍新物品。'},
    {target:'Le livre est sur la table.',zh:'那本书在桌上。',note:'回指并描述位置。'},
    {target:'Il n’y a pas de télévision.',zh:'没有电视机。',note:'使用否定存在结构。'}],
   review:['逐一核对 un/une 与名词性别','区分首次提到与明确所指','否定 Il n’y a pas de 的 de 不漏写','句子之间有同一房间的语义衔接']}
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
 }
};
