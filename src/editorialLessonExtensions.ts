/**
 * Additional, source-specific pedagogical worked examples. They complement the original
 * manuscripts; they do not modify them or assert human editorial approval.
 */
export type AnalysisPoint={label:string;evidence:string;teaching:string};
export type LessonExtension={
 rationale:string;
 analysis:AnalysisPoint[];
 modelTitle:string;
 model:string;
 exercise:string;
 check:string[];
};
export const LESSON_EXTENSIONS:Record<string,LessonExtension>={
 'en-ielts-listening-u01':{
  rationale:'这节课先训练讲座的“结构判断”，再记录细节。听到连接词时，先判断它是在开题、转折还是收束，不急着逐字抄写。',
  analysis:[
   {label:'To begin with — 开题',
    evidence:'To begin with, we need to distinguish planting a tree from maintaining it.',
    teaching:'这句提出核心区分：种下一棵树和维持其生长不是同一件事。笔记可以用 planting ≠ maintenance。'},
   {label:'However — 条件与限制',
    evidence:'However, this benefit depends partly on water, space and the choice of species.',
    teaching:'however 在这里限定树荫降温效果的条件，不是说前文的好处完全不存在。'},
   {label:'Finally — 后续问题',
    evidence:'Finally, we will ask how a council can report survival rates instead of simply counting newly planted trees.',
    teaching:'最后转向如何衡量项目结果：存活率和种植数量是不同指标。不要把 finally 自动当成“最重要”。'}
  ],
  modelTitle:'讲座结构笔记示范',
  model:'主题：urban tree programmes\n开题：planting 与 maintenance 有区别\n潜在效果：canopy grows → shade → less pavement heat (may)\n条件：water / space / suitable species\n最后问题：report survival rates, not just number planted',
  exercise:'不看讲座原文，用三句话复述：① 讲座开头区分了什么？② however 后列出哪些条件？③ 最后要比较哪两种统计指标？每句都标出依据。',
  check:['不要把 may 改成 must','转折并不等于否定全部前文','最后问题关注 survival rate 而非只看种植数量']
 },
 'fr-a1-u04':{
  rationale:'先识别房间里的物品，再判断它们的位置。回答“有什么”和“在哪里”需要不同句型。',
  analysis:[
   {label:'Il y a — 说“有”',
    evidence:'Il y a un bureau près de la fenêtre.',
    teaching:'il y a 表示某处存在一个物品；un bureau 是首次介绍的阳性名词。'},
   {label:'Être + sur / sous — 说位置',
    evidence:'Un livre est sur le bureau. Mon sac est sous la chaise.',
    teaching:'sur 表示在上面，sous 表示在下面；句子主语应当是你要定位的物品。'},
   {label:'un / une / des — 名词数量和性',
    evidence:'Sur l’étagère, il y a trois cahiers et une petite lampe.',
    teaching:'une lampe 是阴性单数；des 可用于首次介绍复数物品，但在具体数字 trois 前直接写 trois cahiers。'}
  ],
  modelTitle:'房间描述示范',
  model:'Voici ma chambre. Il y a un bureau près de la fenêtre. Le livre est sur le bureau. Mon sac est sous la chaise.',
  exercise:'用自己房间里的三个物品造三句法语：第一句用 Il y a；第二句用 sur；第三句用 sous。注意名词的性与冠词。',
  check:['un/une 是否与名词性别相符','是否区分 il y a 与 est 的用途','sur 和 sous 的位置关系是否准确']
 },

 'en-ielts-reading-u03':{
  rationale:'匹配段落标题时先找段落在论证什么，不以出现次数最多的关键词代替主旨。',
  analysis:[
   {label:'主题不等于段落功能',evidence:'Seed banks are often described as secure archives of future crops.',teaching:'这一句引出种子银行，但整段随后讨论它的限制。'},
   {label:'yet 引入关键转折',evidence:'Yet storing seeds is not equivalent to preserving a crop indefinitely.',teaching:'保存种子不等于任何作物都能够无限期保留。'},
   {label:'作者并未全盘否定',evidence:'These practical limits do not make seed banks useless.',teaching:'标题要覆盖条件和补充方案，不能夸大为完全无用。'}
  ],
  modelTitle:'段落标题判断',
  model:'主题：seed banks\n功能：指出单一保育方式的局限\n合适标题：Why one conservation method is insufficient\n不合适：A secure solution for every crop',
  exercise:'比较两个备选标题，引用原文两句话说明为什么第二个标题范围过宽。',
  check:['概括整段而非一个例子','区分局限与彻底否定','选择有文本证据']
 },
 'en-ielts-writing-task1-u02':{
  rationale:'先读总体趋势，再比较准确的起点、终点和差值；先降后升不能描述成 steadily increased。',
  analysis:[
   {label:'from…to… 是起终值',evidence:'Monthly visits declined from 1,200 in 2020 to 900 in 2021.',teaching:'1200 和 900 是两个年份的访问量，不是下降幅度。'},
   {label:'by… 是差值',evidence:'They then increased to 1,500 in 2022 and reached 1,800 in 2023.',teaching:'2022 到 2023 增加 300，不能写 rose by 1,800。'},
   {label:'overall 要概括全期',evidence:'Overall, the final figure was 600 higher than the initial one.',teaching:'全期净增长 600，但中间有下滑，因此不能称全期持续上升。'}
  ],
  modelTitle:'四年数据简要描述',
  model:'Overall, visits fell in 2021 before recovering. They dropped from 1,200 in 2020 to 900, then rose to 1,500 in 2022 and 1,800 in 2023. The final figure was 600 higher than the initial figure.',
  exercise:'用 80—120 词描述给定四年数据，先写总体，再比较数字，不推测原因。',
  check:['全期净增 600','2022—2023 增量 300','没有夸大为 steadily','不编造原因']
 },
 'en-ielts-writing-task2-u02':{
  rationale:'写出可验证的论证链，而不是反复表达同一观点：主张、机制、例子、限定。',
  analysis:[
   {label:'claim',evidence:'Accessible public spaces can support informal contact between neighbours.',teaching:'can 表示可能，不是必然。'},
   {label:'mechanism',evidence:'A shared place gives people a reason to remain nearby rather than pass each other without speaking.',teaching:'解释邻里接触机会为什么会产生。'},
   {label:'hypothetical example',evidence:'For example, a hypothetical courtyard with seating might allow carers to talk while children play.',teaching:'这是假设场景，不是观察到的研究结果。'}
  ],
  modelTitle:'四句论证段落',
  model:'Shared public spaces may encourage contact between neighbours. People can spend time together rather than merely passing by. For example, a hypothetical courtyard with seating might help carers start conversations. However, poorly maintained spaces may not offer this benefit.',
  exercise:'以学习空间为题，分别写一句 claim、mechanism、hypothetical example 和 qualification。',
  check:['机制确实解释主张','不把假设当研究证据','结论包含条件']
 },
 'en-ielts-speaking-u01':{
  rationale:'口语意见先有明确答案，再给具体理由和合理限定；it depends 不能代替回答。',
  analysis:[
   {label:'明确倾向',evidence:'I generally prefer studying in a library because the setting helps me separate work from home.',teaching:'直接表达倾向，并给出因果解释。'},
   {label:'自然限定',evidence:'That said, the best place depends on the task.',teaching:'限定适用条件，不会推翻主要偏好。'},
   {label:'具体例外',evidence:'If I need to practise a presentation aloud, a quiet library desk is not suitable.',teaching:'演讲练习这个具体任务支持例外。'}
  ],
  modelTitle:'45 秒口语回答',
  model:'I usually choose the library for reading because it helps me concentrate. That said, the best location depends on the task. For practising a presentation, I prefer home, where I can speak aloud.',
  exercise:'录制 45 秒回答“Where do you prefer to study?”；必须包含具体理由和一个例外。',
  check:['先回答问题','例外有具体任务支撑','理由并非重复立场']
 },
 'en-ielts-language-upgrade-u01':{
  rationale:'复杂句训练首先要求关系准确：限制性从句说明对象范围，而不是追求句子长度。',
  analysis:[
   {label:'限制一部分学生',evidence:'Students who arrived early found seats near the front.',teaching:'who arrived early 限定学生子集，并未指所有学生。'},
   {label:'逗号影响意义',evidence:'If the clause were set off by commas, the sentence would present early arrival as additional information about the students already identified.',teaching:'非限制性从句通常是补充信息。'},
   {label:'准确性更重要',evidence:'A longer sentence is therefore not automatically a more accurate one.',teaching:'语法复杂度不能代替语义准确度。'}
  ],
  modelTitle:'合并句示范',
  model:'Some students arrived early. Those students found seats near the front. → Students who arrived early found seats near the front.',
  exercise:'用 who 合并“Some students needed help / They attended the workshop”，并说明所指的人是否是全体学生。',
  check:['关系词有明确先行词','逗号使用符合含义','不把部分说成全部']
 },
 'fr-a2-u01':{
  rationale:'叙述周末行程先确定事件顺序，再区分复合过去时中 avoir 与 être 的助动词。',
  analysis:[
   {label:'être 与 partir',evidence:'Samedi, Manon et sa sœur sont parties pour Nantes.',teaching:'partir 这里用 être；复数阴性主语对应 parties。'},
   {label:'avoir 与 réserver',evidence:'Elles ont réservé deux lits dans une auberge près de la gare.',teaching:'avoir 与过去分词 réservé；此句没有主语性别配合。'},
   {label:'d’abord 排列顺序',evidence:'D’abord, elles ont déposé leurs sacs.',teaching:'时间连接词先组织清楚事件发生次序。'}
  ],
  modelTitle:'周末经历示范',
  model:'Samedi, je suis parti(e) en ville. D’abord, j’ai visité un musée. Puis, j’ai déjeuné dans un café. Enfin, je suis rentré(e).',
  exercise:'用 d’abord、puis、enfin 讲三个已完成动作，圈出助动词并解释一次过去分词配合。',
  check:['avoir/être 正确','être 对应主语配合','顺序词合理']
 },
 'fr-b1-u01':{
  rationale:'讲述行程意外时，要分清过去的背景、突发事件与发生得更早的动作。',
  analysis:[
   {label:'背景 imparfait',evidence:'Nous roulions vers la côte lorsque le moteur s’est arrêté.',teaching:'roulions 是当时进行的背景。'},
   {label:'突发事件 passé composé',evidence:'Le dépanneur est arrivé une heure plus tard et nous a conduits dans un village voisin.',teaching:'这些动作推进叙事时间线。'},
   {label:'更早过去 plus-que-parfait',evidence:'Le garagiste avait pourtant vérifié la voiture la veille.',teaching:'检查发生在故障之前。'}
  ],
  modelTitle:'三层时间叙事示范',
  model:'Nous roulions vers la côte quand le moteur s’est arrêté. Le garagiste avait vérifié la voiture la veille. Nous avons donc appelé l’assistance.',
  exercise:'写五句旅行意外的故事，分别标明背景、事件和更早完成的一项动作。',
  check:['先后顺序清晰','背景与事件选对时态','更早过去有参照点']
 }

};
