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
 }
};
