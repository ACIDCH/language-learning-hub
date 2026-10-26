import type {SpecialtyLesson,LearningSection,LearningExample,LearningTable} from './specialtyLibrary';

const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Distinct original explanations and examples; the external references are for grammar verification only. */
export const FRENCH_GRAMMAR_EXPANSION:SpecialtyLesson[]=[
 {
  id:'fr-questions-a1',type:'grammar',language:'fr',level:'A1',
  title:'法语疑问句：est-ce que、语调、疑问词',
  subtitle:'从问候发展到能够询问地点、时间、人物与原因',
  unitLink:'fr-a1-u06',
  prerequisite:'掌握常见主语代词、être / avoir、基本 -er 现在时和简单陈述句。',
  objective:'能够在口语与书面语中构造是非疑问句和特殊疑问句，区分语调、est-ce que 与倒装，并正确使用常见疑问词。',
  sections:[
   s('01 同一个问题的三种表达',
    '法语通常可以通过句末升调、在句首加 est-ce que 或主谓倒装提出是非疑问句。口语语调问句保持陈述句词序；est-ce que 后面仍是正常主语＋谓语；倒装结构用连字符连接动词与主语代词，较常见于正式、书面或固定表达。',
    'Tu parles français ? / Est-ce que tu parles français ? / Parles-tu français ?',[
     e('Tu parles français ?','你说法语吗？','保留陈述句词序，用问号表示疑问，口语常用。'),
     e('Est-ce que tu parles français ?','你说法语吗？','est-ce que + 主语 tu + 动词 parles。'),
     e('Parles-tu français ?','你说法语吗？','倒装 parles-tu 用连字符连接，风格较正式。'),
     e('Est-ce que vous êtes professeur ?','您是教师吗？','est-ce que 后继续使用 vous êtes，而不是额外倒装。')
    ],'不能写 Est-ce que parles-tu français ?；这把 est-ce que 和倒装两套疑问句结构错误叠加。',
    {title:'是非问句三种结构',columns:['形式','结构','使用场景'],
     rows:[['语调','Tu viens ?','日常口语'],['est-ce que','Est-ce que tu viens ?','中性、通用'],['倒装','Viens-tu ?','较正式、书面']],
     note:'三种句式可表达同一个问题，但语体和常见场景有所不同；不需要每次都用倒装。'}),
   s('02 où、quand、comment 与 pourquoi',
    '特殊疑问句要求对方给出具体信息。où 问位置；quand 问时间；comment 问方式或状态；pourquoi 问原因。疑问词可以位于 est-ce que 结构之前，也可能在日常口语中置于句末。回答时不要只机械重复问题中的疑问词，应提供所询问的事实。',
    'Où est-ce que tu habites ? / Tu habites où ?',[
     e('Où est-ce que tu habites ?','你住在哪里？','où 要求回答地点。'),
     e('Tu habites où ?','你住哪里？','疑问词置于句末，是较口语化的提问方式。'),
     e('Quand est-ce que vous commencez ?','您什么时候开始？','quand 对应时间信息。'),
     e('Pourquoi est-ce que tu apprends le français ?','你为什么学法语？','pourquoi 对应原因，通常可用 parce que 引出回答。')
    ],'où（哪里）和 ou（或者）不相同；quand（什么时候）不能替代 pourquoi（为什么）。'),
   s('03 combien、quel / quelle 与数量',
    '询问数量可以用 combien，后接名词时常用 combien de / d’ + 名词。quel 是随所修饰名词性数变化的疑问限定词：quel、quelle、quels、quelles。入门阶段先掌握与 âge、heure、langues 常用的固定问法，再逐渐扩展。',
    'Combien de + nom ? / quel, quelle, quels, quelles + nom ?',[
     e('Combien de livres est-ce que tu as ?','你有多少本书？','combien de 修饰复数名词 livres。'),
     e("Combien d'amis as-tu ?",'你有多少位朋友？','de 在元音开头的 amis 前省音为 d’。'),
     e('Quel âge as-tu ?','你多大了？','âge 是阳性单数，因此用 quel。'),
     e('Quelle heure est-il ?','现在几点？','heure 是阴性单数，因此用 quelle。'),
     e('Quelles langues parles-tu ?','你会说哪些语言？','langues 为阴性复数，因此用 quelles。')
    ],'不能写 Quelle âge 或 Combien des livres 来表达一般的“多少本书”；注意修饰名词的性数及数量结构。'),
   s('04 在真实对话中连续提问与澄清',
    '自然交流不是一串互不相干的问句。先用问候开启话题，再按对方回答补充地点、时间、目的等问题。没有听清楚时可以用 Pardon ?、Pouvez-vous répéter ? 请求重述。选择 tu / vous 也应遵循双方关系和语境，而不是简单按初次见面判定。',
    'Bonjour → question → réponse → relance → clarification',[
     e('Bonjour ! Vous habitez dans ce quartier ?','您好！您住在这个街区吗？','以问候和您称开启交流。'),
     e('Oui, j’habite près de la gare.','是的，我住在火车站附近。','回答地点，同时引出下一问。'),
     e('Depuis quand habitez-vous ici ?','您从什么时候开始住在这里的？','这句可作为进阶可识别表达；核心目标是理解问时间。'),
     e('Pardon, pouvez-vous répéter, s’il vous plaît ?','抱歉，您可以再说一遍吗？','用礼貌请求处理未听清的情况。')
    ],'连续提问应基于上一句回答；不要在语境需要 vous 时无意识地改成 tu。')
  ],
  questions:[
   {question:'把 Tu étudies le français. 改为使用 est-ce que 的问句。',answer:'Est-ce que tu étudies le français ?',why:'est-ce que 置于句首，后面主语 tu 与变位动词 étudies 顺序不变。'},
   {question:'纠错：Est-ce que parles-tu anglais ?',answer:'Est-ce que tu parles anglais ? / Parles-tu anglais ?',why:'两种疑问句结构不能混用：est-ce que 后保持陈述语序，倒装则不加 est-ce que。'},
   {question:'填空：___ heure est-il ?',answer:'Quelle',why:'heure 为阴性单数名词，疑问限定词应采用 quelle。'},
   {question:'用法语问“你有多少位朋友”？',answer:"Combien d'amis est-ce que tu as ? / Combien d'amis as-tu ?",why:'combien de + 名词，amis 以元音开头，因此 de 缩写为 d’。'}
  ],
  output:'写一段 8 轮法语初次交流：问候、询问姓名、居住地点、学习语言、学习原因，最后请求重复一句未听清的回答。至少使用三种疑问词和一种 est-ce que 结构。',
  model:[
   e('Bonjour, comment vous appelez-vous ?','您好，请问您叫什么名字？','问候与正式问名。'),
   e("Je m'appelle Camille. Et vous ?",'我叫卡米耶。您呢？','回答后继续交流。'),
   e('Où est-ce que vous habitez ?','您住在哪里？','地点问题，用 est-ce que 结构。'),
   e('J’habite près de la gare.','我住在火车站附近。','回答地点。'),
   e('Pourquoi apprenez-vous le français ?','您为什么学习法语？','继续问原因。'),
   e('Pardon, pouvez-vous répéter ?','抱歉，您可以再说一遍吗？','请求澄清。')
  ],
  referenceUrls:[
   'https://www.gymglish.com/zh/frantastique/french-grammar/poser-une-question',
   'https://www.gymglish.com/zh/frantastique/french-grammar/les-mots-interrogatifs',
   'https://grammarmama.com/zh/learn/french/a1/'
  ],
  sourceNote:'对应现存 fr-a1-u06 的问句与对话学习目标；规则经 Frantastique 与 GrammarMama A1 章节交叉核实，例句及练习新写。'
 },
 {
  id:'fr-adjective-agreement-a1',type:'grammar',language:'fr',level:'A1',
  title:'法语形容词：性数配合与前后位置',
  subtitle:'从描述人物、国籍到完整介绍房间',
  unitLink:'fr-a1-u10',
  prerequisite:'已经掌握名词的阳性、阴性、单数、复数；会使用 être、un / une 和 le / la。',
  objective:'能够让常见形容词与名词性数一致，区分多数组合的后置位置与 petit / grand 等常见前置位置，并在描述房间时检查一致性。',
  sections:[
   s('01 为什么形容词要随名词变化',
    '法语形容词通常与它所描述的名词在语法性别和数上保持一致；与英语不同，许多形容词会改变拼写。规则例子 grand：阳性单数 grand，阴性单数 grande，阳性复数 grands，阴性复数 grandes。不是所有形容词都只加 e 或 s，后续还需学习特殊变形。',
    'grand / grande / grands / grandes',[
     e('Le salon est grand.','客厅很大。','salon 阳性单数，对应 grand。'),
     e('La chambre est grande.','房间很大。','chambre 阴性单数，对应 grande。'),
     e('Les salons sont grands.','这些客厅很大。','salons 阳性复数，对应 grands。'),
     e('Les chambres sont grandes.','这些房间很大。','chambres 阴性复数，对应 grandes。')
    ],'不能写 La chambre est grand，也不能认为词尾没有明显变化就不存在配合；形容词也有不规则形式。',
    {title:'grand · 形容词性数配合',columns:['名词性数','形式','示例'],
     rows:[['阳性单数','grand','un grand salon'],['阴性单数','grande','une grande chambre'],['阳性复数','grands','de grands salons'],['阴性复数','grandes','de grandes chambres']],
     note:'先确定形容词所描述的名词，再决定形容词拼写。de grands salons 中的 de 是复数不定冠词在前置形容词前的常见形式。'}),
   s('02 先辨名词，再选择正确的形容词',
    '房间或人物的自然属性不决定法语名词的语法性别。例如 table 是阴性名词、bureau 是阳性名词。最可靠的方法是带冠词记名词，在构句时根据名词或主语判断形容词形式。部分以 -e 结尾的形容词，如 calme，在普通阳性和阴性单数中形式相同。',
    'une table ronde / un bureau rond / une chambre calme',[
     e('La table est ronde.','桌子是圆的。','table 阴性单数，rond 变 ronde。'),
     e('Le bureau est rond.','书桌是圆的。','bureau 阳性单数，使用 rond。'),
     e('Ma chambre est calme.','我的房间很安静。','calme 在阴性单数中保持原拼写。'),
     e('Mes voisins sont sympathiques.','我的邻居们很友好。','复数主语对应 sympathiques。')
    ],'不能把中文“桌子”“书桌”的概念相似当作二者语法性别相同；calme 不因阴性另写成 calmee。'),
   s('03 形容词在名词前还是后',
    '许多描述颜色、形状、国籍的形容词通常放在名词后面，如 une table blanche、une table ronde。petit、grand、beau、joli 等常见形容词经常放在名词前面。位置不仅是排版：某些形容词换位置会改变含义，A1 阶段先记忆高频自然搭配。',
    'une petite chambre / une chambre blanche',[
     e('C’est une petite chambre.','这是一间小房间。','petite 常置于名词 chambre 前面。'),
     e('C’est une chambre blanche.','这是一间白色的房间。','blanche 表示颜色，通常后置。'),
     e('Il habite dans un grand appartement.','他住在一套大公寓里。','grand 常放在名词前面。'),
     e('Elle porte une robe rouge.','她穿着一条红裙子。','rouge 是颜色形容词，通常后置。')
    ],'不应把“法语形容词全部后置”当成绝对规律；例如 une petite chambre 中 petite 在名词前。'),
   s('04 与 être 合用，组成连贯的空间描述',
    '当形容词通过 être 作表语时，仍需与主语保持性数一致。介绍房间时可以先用 il y a 引入物品，再用 le / la 指回物品并补充它的特点；这样形成自然段落，而不是把十个形容词随意堆在一个名词前。',
    'Il y a une table. La table est blanche.',[
     e('Il y a une table près de la fenêtre.','窗边有一张桌子。','先用 une table 引入新物品。'),
     e('La table est blanche et ronde.','那张桌子是白色且圆的。','指回阴性名词 table，两个形容词均使用阴性形式。'),
     e('Les chaises sont petites mais confortables.','这些椅子很小，但坐起来很舒服。','复数名词 chaises 对应 petites、confortables。'),
     e('Ma chambre est petite, mais elle est lumineuse.','我的房间很小，但很明亮。','petite 与 lumineuse 均对应阴性单数 chambre。')
    ],'La table est blanc 中 blanc 未与 table 的阴性一致；不能忽略长句中 elle 所指的原名词。')
  ],
  questions:[
   {question:'选词：La chambre est grand / grande.',answer:'grande',why:'chambre 是阴性单数名词，grand 的对应形式是 grande。'},
   {question:'改错：Le bureau est ronde.',answer:'Le bureau est rond.',why:'bureau 是阳性单数名词，需要 rond；ronde 为阴性形式。'},
   {question:'改错：C’est une blanche chambre.',answer:'C’est une chambre blanche.',why:'一般颜色形容词 blanche 通常位于名词后，且与 chambre 的阴性一致。'},
   {question:'复数改写：La chaise est petite.',answer:'Les chaises sont petites.',why:'名词 chaise 变复数 chaises；动词 est 变 sont，形容词 petite 变 petites。'}
  ],
  output:'写 6–8 句法语介绍家里的一个房间：先列出两件物品，再分别描述颜色、大小与空间位置。至少包含两个阴性名词、一个复数名词、一次前置形容词和一次后置形容词。',
  model:[
   e('Voici ma chambre.','这是我的房间。','开头交代空间。'),
   e('Il y a une petite table près de la fenêtre.','窗边有一张小桌子。','petite 前置，table 阴性。'),
   e('La table est blanche et ronde.','那张桌子是白色的、圆的。','表语与 table 一致。'),
   e('Les chaises sont confortables.','椅子们很舒服。','复数一致。'),
   e('Ma chambre est petite, mais lumineuse.','我的房间小，但是明亮。','省略重复谓语后的两个形容词都与 chambre 一致。')
  ],
  referenceUrls:[
   'https://www.laits.utexas.edu/tex/gr/',
   'https://grammarmama.com/zh/learn/french/a1/',
   'https://www.gymglish.com/zh/frantastique/french-grammar'
  ],
  sourceNote:'与课程 fr-a1-u10 的房间/家庭描述对应；依据 GrammarMama A1 形容词分类与 Tex 语法项目整理，例句与练习均为新写。'
 }
];