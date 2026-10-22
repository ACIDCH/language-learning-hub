import {FRENCH_ARTICLES,STUDY_SPACES} from './curatedCurriculum';
import {EXPANDED_SPECIALTIES} from './expandedSpecialties';
import {FRENCH_GRAMMAR_EXPANSION} from './frenchGrammarExpansion';
import {FRENCH_PATH_GRAMMAR} from './frenchPathGrammar';
import {FRENCH_PATH_VOCABULARY} from './frenchPathVocabulary';
import {ENGLISH_PATH_SPECIALTIES} from './englishPathSpecialties';
import {FRENCH_GRAMMAR_CONTINUITY} from './frenchGrammarContinuity';
import {REMAINING_LANGUAGE_CONTINUITY} from './remainingLanguageContinuity';
import {INTERMEDIATE_FRENCH_SPECIALTIES} from './intermediateFrenchSpecialties';
import {IELTS_ARGUMENT_SPECIALTIES} from './ieltsArgumentSpecialties';
import {ADVANCED_FRENCH_SPECIALTIES} from './advancedFrenchSpecialties';
import {NEXT_CURRICULUM_CONTINUITY} from './nextCurriculumContinuity';
import {FRENCH_EXAM_WRITING_CONTINUITY} from './frenchExamWritingContinuity';
import {FRENCH_MEDIA_READING_CONTINUITY} from './frenchMediaReadingContinuity';
import {A1_QUESTIONS_LISTENING_PARAPHRASE} from './a1QuestionsListeningParaphrase';
import {FR_A1_LEISURE_GRAMMAR} from './frA1LeisureGrammar';
import {NEXT_CORE_TEACHING_WAVE} from './nextCoreTeachingWave';
import {HOME_PLANS_READING_HEADINGS} from './homePlansReadingHeadingsWave';
import {A1_PAST_AND_READING_EVIDENCE} from './a1PastAndReadingEvidenceWave';
import {IELTS_READING_GRAMMAR_U05_U08} from './ieltsReadingGrammarU05U08';
import {IELTS_READING_LEXICON_U05_U08} from './ieltsReadingLexiconU05U08';
import {IELTS_READING_U01_PLATFORM_VOCAB} from './ieltsReadingU01PlatformVocabulary';
import {IELTS_LISTENING_U04_U06_SPECIALTIES} from './ieltsListeningU04U06Specialties';
import {FR_A2_REPAIR_SPECIALTIES} from './frA2NextRepairSpecialties';
import {IELTS_LISTENING_U07_U08_SPECIALTIES} from './ieltsListeningU07U08Specialties';
import {IELTS_TASK1_U03_U04_SPECIALTIES} from './ieltsTask1U03U04Specialties';
import {IELTS_TASK1_U01_U02_SPECIALTIES} from './ieltsTask1U01U02Specialties';

export type SpecialtyKind='grammar'|'vocabulary';
export type SpecialtyLanguage='fr'|'en';
export type SpecialtyLevel='A1'|'A2'|'B1'|'B2'|'C1';
export type LearningExample={target:string;zh:string;analysis:string};
export type LearningTable={title:string;columns:string[];rows:string[][];note:string};
export type LearningSection={title:string;concept:string;pattern:string;examples:LearningExample[];caution:string;table?:LearningTable};
export type LearningQuestion={question:string;answer:string;why:string};
export type SpecialtyLesson={
 id:string;type:SpecialtyKind;language:SpecialtyLanguage;level:SpecialtyLevel;
 title:string;subtitle:string;unitLink:string;prerequisite:string;objective:string;
 sections:LearningSection[];questions:LearningQuestion[];
 output:string;model:LearningExample[];
 /** Segment indices for full essays; ordinary lesson examples remain sentence cards. */
 modelParagraphStarts?:number[];
 referenceUrls:string[];sourceNote:string;
};
const F='https://laits.utexas.edu/tex/gr/';
const BC='https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2';
const EVP='https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA';
const pair=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const section=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Group sourced vocabulary by communicative function, not into an isolated word-per-page list. */
function curatedVocabularySections(source:typeof FRENCH_ARTICLES):LearningSection[]{
 const french=source.language==='fr';
 const specs=french?[
  {name:'01 物品名词与冠词一起学习',indexes:[0,1,2],examples:[1,2,4],meaning:'先确定名词语法性别，再给首次引入的物品选择 un / une / des。说话双方已经确定的对象则可能改用 le / la / les。学习这些词时始终保留冠词，而不是只背中文物品名称。'},
  {name:'02 家具、电脑和否定存在',indexes:[3,4,5],examples:[0,5,6],meaning:'从句子实际功能辨认“有”和“没有”。引入一件物品可用不定冠词；普通否定存在中常用 de / d’，但 c’est 的否定表语通常仍保留 un / une。'},
  {name:'03 空间参照：près de / sur / sous',indexes:[6,7],examples:[1,2,3],meaning:'方位词是空间关系而不只是中文翻译。先找位置被描述的物品，再找参照物，辨明是在……上、在……下还是在……附近；位置颠倒会使句意改变。'},
  {name:'04 以 il y a 连成一段',indexes:[8,9],examples:[1,5,6],meaning:'把存在表达、冠词与方位信息串在一段真实的房间说明中。先交代场景、再引入新的物品、最后补充方位和缺少的物品，写出清楚连贯的描述。'}
 ]:[
  {name:'01 引入研究问题与讲座开篇',indexes:[0,1,2],examples:[0,1],meaning:'结构标记用于帮助听众预测讲座的下一步，而不自动证明后面命题正确。先识别开题和说明性例子的功能，再写进笔记的对应位置。'},
  {name:'02 转折、限制与结论',indexes:[3,4],examples:[2,3],meaning:'however 引出限制或对照；to sum up 表示归纳。这类词决定信息关系，但并不改变证据本身，复述时不可把说明性例子误认作研究测量结果。'},
  {name:'03 指标、方法与研究局限',indexes:[5,6,7],examples:[1,2],meaning:'occupancy 与 measurement 指向空间占用的观察方法；limitation 让读者意识到指标能回答的范围。这些词必须放到研究问题、方法和数据解释中一起理解。'},
  {name:'04 结果词汇与谨慎推论',indexes:[8,9],examples:[2,3],meaning:'academic achievement 是学习结果，而 is consistent with 表示与某种解释相符，不能直接表示因果成立。总结时用清晰的词义边界限制结论力度。'}
 ];
 return specs.map(spec=>{
  const vocab=spec.indexes.map(i=>source.vocabulary[i]);
  const passage=spec.examples.map(i=>source.reading.pairs[i]);
  return section(spec.name,spec.meaning,
   vocab.map(x=>x.word+' → '+x.collocation).join('；'),
   passage.map(e=>pair(e.target,e.zh,e.why)),
   french?['un / une 与 le / la 的差别取决于名词性数和指称是否确定，不能只靠汉语翻译选冠词。','否定 il n’y a pas de 和 c’est 的否定表语结构不同：Ce n’est pas un livre。','sur（上方）、sous（下方）、près de（附近）的空间关系不同，尤其要核对参照物。','描述段落首次提到物品与随后指回物品时，冠词可能从 un / une 变成 le / la。'][specs.indexOf(spec)]:['开篇信号与举例信号的功能不同，不能把 To begin with 或 Let me illustrate this 当作研究结论。','However 引出的限制不能省略；to sum up 表示总结，不自动表明前文证据充分。','occupancy 测量空间占用，不直接测量学习成绩；limitation 指证据使用范围。','is consistent with 表示“与……相符”，不能替换为 proves 或 causes。'][specs.indexOf(spec)]);
 });
}
const CURATED_GRAMMAR_CAUTIONS:Record<SpecialtyLanguage,string[]>={
 fr:[
  'un / une / des 不是所有名词的默认冠词；说话双方已知、明确限定的物品或泛指类别时可能需要定冠词。',
  'le / la 在元音或哑音 h 前通常写 l’；泛指“喜欢某类事物”也常用定冠词，例如 J’aime les livres。',
  'c’est / ce sont 用来指认；il y a 用来陈述某处存在。不能把 C’est un livre 与 Il y a un livre 当成完全同一种句子。',
  'Il n’y a pas de livre 是否定存在；Ce n’est pas un livre 仍保留 un，Je n’aime pas les livres 也保留 les。',
  'sur 与 sous 方向相反；près de 后的名词仍有自己的冠词。介绍物品时要让后一句能准确指向前一句。'
 ],
 en:[
  'To begin with 只提示讲座的第一步；However 提示转折，但两者都不等于研究数据或论证已经成立。',
  'may / might / could 不能人为赋予固定百分比；报告研究观点时要区分可能性、观察结果和已经证实的事实。',
  'occupancy 是设施使用指标，不是 academic achievement；观察到需求差异也不能自动推断新增空间提升成绩。',
  '复述时需要保留 whether、not necessarily、however 等限制性措辞，不应把“可能”改成“必然”。',
  '五格笔记分别标记问题、观察/方法、举例、限制与审慎结论；不能把 illustration 和 measurable evidence 合并。'
 ]
};
function fromCurated(type:SpecialtyKind,source:typeof FRENCH_ARTICLES,id:string,title:string,subtitle:string,course:string,level:SpecialtyLevel,referenceUrls:string[]):SpecialtyLesson{
 return {id,type,language:source.language,level,title,subtitle,unitLink:course,prerequisite:source.prerequisite,objective:source.goal,
 sections:type==='grammar'?source.grammar.map((x,i)=>section(x.title,x.principle,x.pattern,x.examples.map(e=>pair(e.target,e.zh,e.why)),CURATED_GRAMMAR_CAUTIONS[source.language][i])):
 curatedVocabularySections(source),
 questions:[...(source.practice[type==='grammar'?1:2]||[]),...(type==='vocabulary'?(source.practice[1]||[]).slice(0,2):[])].map(x=>({question:x.question,answer:x.answer,why:x.explanation})),
 output:source.language==='en'
  ?'按原始 IELTS Listening U01 任务：先标记 opening、measurement、illustration、limitation、conclusion；第二遍形成五格讲座地图，然后写出 100–130 词的英语口头或书面综合摘要，明确保留讲者的限制条件且不虚构成绩改善。'
  :source.output.task,model:source.output.model.map(e=>pair(e.target,e.zh,e.why)),referenceUrls,
 sourceNote:'以仓库内既有课程专题数据为教学基础；第三方资料仅用于规则交叉核查。'};
}
const hand:SpecialtyLesson[]=[
 {id:'fr-etre',type:'grammar',language:'fr',level:'A1',title:'être、s’appeler 与人称代词',subtitle:'从自我介绍进入法语最基本的谓语结构',unitLink:'fr-a1-u01',prerequisite:'认识法语字母，能朗读 Bonjour 和简单名字。',objective:'能用 je / tu / vous 搭配正确变位，区分身份、指认、正式与非正式称呼。',
 sections:[
 section('01 主语代词决定动词形式','法语动词不是固定不变的词。主语改变，动词形式也可能改变。记忆 être 时必须把人称和变位一起背，不应将英语 am/is/are 的固定顺序直接套入。','je suis · tu es · il/elle/on est · nous sommes · vous êtes · ils/elles sont',[
 pair('Je suis étudiante.','我是学生（女性说话者）。','je 对应 suis；étudiante 的词尾标记女性身份。'),
 pair('Vous êtes professeur ?','您是老师吗？','vous 对应 êtes，即使只对一位成年人说话也一样。'),
 pair('Nous sommes dans la même classe.','我们在同一个班里。','nous 后固定使用 sommes。')],'Je est、vous es 都错误；不能把动词“是”原样放在不同主语后。'),
 section('02 s’appeler：介绍姓名','s’appeler 是代词式动词，姓名前的 m’/t’/s’/nous/vous 与主语配套。起步优先掌握 je m’appelle、tu t’appelles、vous vous appelez。','Je m’appelle + prénom ; Comment tu t’appelles ? ; Comment vous appelez-vous ?',[
 pair("Je m'appelle Camille.",'我叫卡米耶。','反身代词 m’ 不可省略，且动词拼写含双 l。'),
 pair("Comment tu t'appelles ?",'你叫什么名字？','口语自然，适用于彼此使用 tu 的场合。'),
 pair('Comment vous appelez-vous ?','您叫什么名字？','较正式的倒装问句；vous 还可能指“你们”。')],'不能写 Je appelle Camille；倒装问句的书面形式也不能误当成所有场景唯一正确说法。'),
 section('03 Je suis 与 C’est','Je suis 常用来介绍自己的身份、职业或国籍，后接无冠词的职业名词很常见。C’est 常用于指认或介绍眼前人物，后面的单数名词组可带冠词。两者并非逐词替换。','Je suis + profession / C’est + un(e) + profession',[
 pair('Je suis étudiant.','我是学生。','普通身份介绍通常不带 un。'),
 pair("C'est un étudiant.",'这是一名学生。','指认人物，名词词组带不定冠词。'),
 pair('Elle est française.','她是法国人。','国籍形容词与女性主语配合。')],'Je suis un étudiant 并非一切语境都错；入门阶段应先区分功能，而不是机械地宣布绝对禁用冠词。'),
 section('04 tu / vous：根据关系选择','vous 用于礼貌单数、正式关系，也用于复数。tu 用于熟悉对象，也常见于同龄同学之间，即使是第一次见面。正式程度取决于关系、地域和场合。','professeur / administration → souvent vous ; camarades → souvent tu',[
 pair('Bonjour, Madame. Comment vous appelez-vous ?','您好，女士，请问您叫什么名字？','正式、礼貌情境。'),
 pair('Salut ! Tu étudies le français ?','嗨！你学法语吗？','同龄同学的非正式情境。')],'不能规定“所有初次见面必须 vous”；这是原课程校订记录明确要求纠正的过度概括。')],
 questions:[{question:'填空：Nous ___ étudiants.',answer:'sommes',why:'nous 对应 être 的 nous sommes。'},{question:"改错：Je appelle Lina.",answer:"Je m'appelle Lina.",why:'s’appeler 的第一人称必须用 m’。'},{question:'同龄新同学第一次见面能否用 tu？',answer:'可以，很多场合自然使用 tu；若在正式关系则可能用 vous。',why:'选择依关系及礼貌程度，而非只看是否首次见面。'}],
 output:'分别写两段 4 句对话：一段向老师正式自我介绍，一段向同龄同学打招呼；必须出现 je suis、je m’appelle 及合适的 tu/vous。',model:[
 pair("Bonjour Madame, je m'appelle Léa.",'您好，女士，我叫莱娅。','正式场合。'),
 pair('Je suis étudiante en français.','我是法语专业的学生。','身份介绍。'),
 pair('Et vous, comment vous appelez-vous ?','那您呢，您叫什么名字？','正式询问。')],
 referenceUrls:[F+'ver1.html',F+'pro2.html','https://opentextbc.ca/francaisinteractif/chapter/04-contenus-dapprentissage/'],
 sourceNote:'依据私人 FR A1 U01 原始教材、A1 12 单元路线图及 V1.3 审校记录；此处为独立编写的教学讲解。'},
 {id:'fr-avoir',type:'grammar',language:'fr',level:'A1',title:'avoir、年龄与物主限定词',subtitle:'从介绍家人学习“拥有”与“年龄”',unitLink:'fr-a1-u03',prerequisite:'掌握基本主语代词及 être 的现在时。',objective:'能表达拥有关系与年龄，并按被修饰名词选择 mon / ma / mes。',
 sections:[
 section('01 avoir 的完整人称变位','avoir 有“拥有”的常用义，也是许多固定表达的动词。它与 être 一样是不规则动词，必须将每个主语和对应形式配对记忆。','j’ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont',[
 pair("J'ai une sœur.",'我有一个姐姐／妹妹。','j’ai 为 je + ai 的省音。'),
 pair('Nous avons deux livres.','我们有两本书。','nous 配 avons。'),
 pair('Ils ont une voiture.','他们有一辆车。','ils 配 ont。')],'不能说 je avoir；ils ont 与 ils sont 是两个不同动词。'),
 section('02 法语年龄用 avoir','法语表达“多少岁”通常是 avoir + 数量 + ans。中文和英语说法相似，但法语使用“有”，而不是 être。','personne + avoir + nombre + ans',[
 pair("J'ai vingt ans.",'我二十岁。','不用 Je suis vingt ans。'),
 pair('Quel âge as-tu ?','你多大？','提问以 avoir 为核心。'),
 pair('Ma sœur a dix-huit ans.','我的姐妹十八岁。','第三人称单数 a。')],'Je suis vingt ans 错在使用 être；记忆整句比只背 vingt 更有效。'),
 section('03 mon / ma / mes 根据名词选','所有限定词的形式依据后面的名词性别及数量，而非拥有者的性别：mon 阳性单数，ma 阴性单数，mes 复数。元音或哑音 h 开头的阴性单数名词前，出于发音便利通常用 mon。','mon père · ma mère · mes parents · mon amie',[
 pair('Mon père est médecin.','我父亲是一名医生。','père 阳性单数。'),
 pair('Ma mère parle français.','我母亲说法语。','mère 阴性单数。'),
 pair('Mon amie habite ici.','我的女性朋友住在这里。','amie 虽为阴性，元音前使用 mon。')],'不能因说话者是女性就都使用 ma；也不要写 ma amie。')],
 questions:[{question:"填空：Je n'___ pas de frère.",answer:'ai',why:'ne 已缩写在 n’ 中，只填 ai；不要再写 n’ai 造成重复 n’。'},{question:'填空：___ amie est française.（我的女性朋友）',answer:'Mon',why:'阴性单数元音开头的 amie 前使用 mon。'},{question:'把“她 20 岁”译为法语',answer:'Elle a vingt ans.',why:'avoir 不是 être。'}],
 output:'介绍一位家人，写五句，至少包括年龄、一个 mon/ma/mes、一个 avoir 的否定形式。',model:[
 pair("J'ai une sœur.",'我有一个姐妹。','j’ai 表示拥有。'),pair('Ma sœur a vingt ans.','我的姐妹二十岁。','年龄用 a。'),pair("Je n'ai pas de frère.",'我没有兄弟。','否定有 + de。')],
 referenceUrls:[F+'ver2.html',F+'det6.html'],sourceNote:'结合私人 FR A1 U03 路线及 V1.3 编辑纠错（避免 n’ 的重复）。'},
 {id:'fr-er',type:'grammar',language:'fr',level:'A1',
 title:'第一组 -er 动词：现在时、日常作息与否定',
 subtitle:'parler / étudier / aimer：从变位表到完整句子',
 unitLink:'fr-a1-u05',
 prerequisite:'认识 je、tu、il/elle、nous、vous、ils/elles，并掌握 être 和 avoir 的基本变位。',
 objective:'独立变位 parler 等规则 -er 动词；描述自己的学习、时间和习惯；写出否定句，并辨别常见拼写变化。',
 sections:[
 section('01 六个人称与现在时词尾',
 '法语的动词不定式相当于词典形式，例如 parler（说）。规则第一组 -er 动词在直陈式现在时的变位分两步：去掉不定式词尾 -er 得到词干 parl-，再按主语加上 -e、-es、-e、-ons、-ez、-ent。书面变位必须保留对应词尾；je、tu、il、ils 的词尾通常不单独发音，但拼写不同。',
 'parler → parl- + e / es / e / ons / ez / ent',[
 pair('Je parle français avec Marie.','我和玛丽用法语交谈。','je 对应 -e；avec Marie 说明交谈对象。'),
 pair('Nous parlons français en classe.','我们在课堂上说法语。','nous 加 -ons；en classe 表示发生地点。'),
 pair('Vous parlez très clairement.','您（或你们）说得很清楚。','vous 加 -ez；用于礼貌单数或复数。'),
 pair('Ils parlent souvent ensemble.','他们经常一起交谈。','ils 加 -ent，不能因为读音近似 parle 就漏写 -ent。')
 ],'aller 虽以 -er 结尾，却是不规则动词：je vais、nous allons。这里的变位表只针对规则 -er 动词。',
 {title:'parler · 直陈式现在时',columns:['主语','变位','中文含义'],
 rows:[['je','parle','我说'],['tu','parles','你说'],['il / elle / on','parle','他／她／人们说'],['nous','parlons','我们说'],['vous','parlez','您／你们说'],['ils / elles','parlent','他们／她们说']],
 note:'书写时看主语选词尾。parle、parles、parlent 的结尾字母一般不读出来，但不能互换。'}),
 section('02 把 -er 动词放进完整句子',
 '先找主语，再用适当形式的变位动词作谓语，最后补全宾语或必要的介词短语。étudier（学习）和 travailler（工作）遵循基本词尾；aimer（喜欢）与 écouter（听）的词干以元音开头，je 在其前写作 j’。不同动词所需的介词不能只靠中文翻译猜测。',
 '主语 + 变位动词 + 宾语／介词短语',[
 pair("J'étudie le français à l'université.",'我在大学学习法语。','je 在元音前省音，写作 j’étudie；à l’université 表示地点。'),
 pair("J'aime la musique française.",'我喜欢法国音乐。','je + aime 变为 j’aime；aimer 的宾语采用名词词组。'),
 pair("Tu écoutes la radio ?",'你听广播吗？','écouter 是及物动词，这里直接接 la radio。'),
 pair('Elle travaille dans une bibliothèque.','她在一家图书馆工作。','elle 对应 travaille；dans une bibliothèque 表示工作地点。')
 ],'不能写 je étudie 或 je aime，也不能把“听某物”机械翻成 écouter à quelque chose。'),
 section('03 时间、副词与叙述顺序',
 '现在时既可以说明此刻的动作，也可以描述经常发生的习惯。先用一句说主要活动，再通过 le matin（早晨）、le soir（晚上）、tous les jours（每天）、souvent（经常）和 parfois（有时）补充时间。频率副词通常放在变位动词后；时间短语可置于句首。',
 'Le matin, je travaille. / Je travaille souvent le soir.',[
 pair('Le matin, je travaille à la maison.','早晨我在家工作。','le matin 表示经常性的早晨习惯。'),
 pair('Elle étudie souvent après le dîner.','她经常晚饭后学习。','souvent 放在变位动词 étudie 之后。'),
 pair('Nous regardons parfois un film le week-end.','我们周末有时看电影。','parfois 表示有时；le week-end 描述时间。')
 ],'Je souvent étudier le soir 缺少变位，且把频率副词放到不自然的位置。应写 J’étudie souvent le soir。'),
 section('04 普通否定与代词式动词',
 '在规范书面法语中，ne…pas 一般围绕已经变位的动词：Je ne parle pas。动词以元音开头时 ne 变成 n’，如 Je n’étudie pas。代词式动词必须保留反身代词；se lever（起床）的现在时是 je me lève，否定句为 je ne me lève pas，不能把 me 删掉。',
 'ne / n’ +（反身代词）+ 变位动词 + pas',[
 pair('Je ne travaille pas le dimanche.','我星期日不工作。','ne 位于 travaille 前，pas 位于其后。'),
 pair("Je n'étudie pas ce soir.",'我今晚不学习。','étudie 以元音开头，ne 缩写为 n’。'),
 pair('Je me lève à sept heures.','我七点起床。','me 是 se lever 必需的反身代词。'),
 pair('Je ne me lève pas tôt.','我不早起。','ne 位于 me 之前，pas 位于变位动词 lève 之后。')
 ],'Je ne lève pas tôt 不等于 Je ne me lève pas tôt：省掉 me 会改变动词结构和意义。'),
 section('05 常见词干拼写变化：-ger / -cer 与例外',
 '基本词尾规则不能覆盖所有拼写。manger 和 commencer 在 nous 形式中分别写 mangeons、commençons，以保留词干辅音的读音；其他人称仍按基本现在时规律。appeler 和 acheter 还涉及其他人称的词干变化，起步先识别它们，不要强行套用 parler 的不变词干。aller 归入不规则变位，应另学。',
 'manger → nous mangeons；commencer → nous commençons；aller → nous allons',[
 pair('Nous mangeons ensemble à midi.','我们中午一起吃饭。','manger 在 nous 后保留 e，写 mangeons。'),
 pair('Nous commençons le cours à neuf heures.','我们九点开始上课。','commencer 在 nous 后用 ç，写 commençons。'),
 pair("J'appelle mon ami.",'我给朋友打电话。','appeler 的这个人称形式写 appelle；不同人称词干可能变化。'),
 pair('Nous achetons du pain.','我们买面包。','acheter 的 nous 形式保留 achet-，与 j’achète 对照学习。')
 ],'不能写 nous mangons 或 nous commencons；也不能由“以 -er 结尾”推断 aller 必然规则变位。')
 ],
 questions:[
 {question:'完成变位：Nous ___ (parler) français.',answer:'parlons',why:'去掉 -er 得到 parl-，nous 配 -ons，合成 parlons。'},
 {question:'完成变位：Ils ___ (étudier) le soir.',answer:'étudient',why:'ils 使用 -ent；étudier 的词干是 étudi-，拼写为 étudient。'},
 {question:'改错：Je aime étudier.',answer:"J'aime étudier.",why:'主语 je 在以元音开头的 aime 前省音为 j’。'},
 {question:'改写否定句：Je me lève tôt.',answer:'Je ne me lève pas tôt.',why:'代词式动词保留 me；ne 位于 me 之前，pas 在 lève 之后。'},
 {question:'改错：Nous mangons ensemble et nous commencons à huit heures.',answer:'Nous mangeons ensemble et nous commençons à huit heures.',why:'manger 的 nous 形式保留 e；commencer 的 nous 形式使用 ç，维持正确辅音发音。'}
 ],
 output:'写 7–9 句法语介绍一天的学习和生活：先描述早晨，再描述课堂及晚上；至少使用四种 -er 动词、一组频率副词、一个否定句和一个时间连接词。',
 model:[
 pair('Le matin, je me lève à sept heures.','早晨我七点起床。','代词式动词 + 时间表达。'),
 pair("J'étudie le français à l'université.",'我在大学学习法语。','j’ 省音；学习地点。'),
 pair('Nous commençons le cours à neuf heures.','我们九点开始上课。','commencer 的 nous 形式含 ç。'),
 pair('Je parle souvent avec mes camarades.','我经常与同学交谈。','频率副词 + avec 的搭配。'),
 pair('Le soir, je ne regarde pas la télévision.','晚上我不看电视。','规范书面否定和时间结构。')
 ],
 referenceUrls:[
 'https://www.laits.utexas.edu/tex/gr/ver1.html',
 'https://www.gymglish.com/zh/frantastique/french-grammar/er-ir',
 'https://grammarmama.com/zh/learn/french/a1/'
 ],
 sourceNote:'保留原 A1 U05 的学习目标和 se lever 否定注意事项，依 Tex / Frantastique 核验规则与例外；新例句、变位表及解析为本项目重新编写。'},
 {id:'en-contrast',type:'grammar',language:'en',level:'B1',title:'because、because of、although、however',subtitle:'原因、让步、转折的句法边界',unitLink:'en-ielts-listening-u01',prerequisite:'理解简单从句和完整主谓结构。',objective:'能按照后接结构正确选择连词、介词短语和句子连接副词。',
 sections:[
 section('01 because 与 because of 的不同','because 后接含主谓的从句；because of 后常接名词词组或动名词形式。两者都说明原因，但句法身份不同。','because + clause / because of + noun phrase',[
 pair('The lecture was delayed because the speaker was ill.','讲座推迟了，因为主讲人病了。','because 后为完整从句。'),pair('The lecture was delayed because of illness.','讲座因为疾病而推迟。','because of 后面是名词 illness。')],'The lecture was delayed because of the speaker was ill 不合常规结构。'),
 section('02 but 与 however 如何承接','but 是协调连词，连接两个并列成分或分句；however 表示转折，是连接副词，通常用标点与完整句子搭配，可放在句首或句中插入位置。','clause, but clause. / Sentence. However, sentence.',[
 pair('The room is busy, but usage is not proof of learning.','房间很繁忙，但使用量并不能证明学习效果。','but 连两个并列分句。'),pair('The room is busy. However, we need other evidence.','房间很繁忙。然而，我们还需要其他证据。','however 另起一句，后面一般有逗号。')],'正式写作中避免使用纯逗号连接两个独立分句，例如 The room is busy, however it is not effective.'),
 section('03 although / even though 与 despite','although、even though 后接完整从句；despite、in spite of 后接名词、代词或 -ing 形式。even though 一般让步感更强。','although + clause / despite + noun or -ing',[
 pair('Although the room is full, we cannot assume learning improved.','虽然房间坐满了，我们不能据此假设学习改善。','although 引导让步从句。'),pair('Despite high occupancy, the evidence remains limited.','尽管占用率很高，证据仍然有限。','despite 后用名词词组。')],'一般不写 Despite the room is full；应说 Despite the room being full 或 Although the room is full。')],
 questions:[{question:'填空：The plan changed ___ the budget was reduced.',answer:'because',why:'后接 the budget was reduced（完整从句）。'},{question:'填空：The plan changed ___ budget cuts.',answer:'because of',why:'后接名词词组 budget cuts。'},{question:'修正：The room is busy, however it proves nothing.',answer:'The room is busy. However, it proves nothing.',why:'两个独立句通常不能仅用一个逗号 + however 连接。'}],
 output:'写 80—100 词短文，解释学习空间需求为何可能上升，但为何仍不能直接推断成绩提高；使用 because、however 与 although 各一次。',model:[
 pair('Some students use shared rooms because they need a quiet place.','一些学生使用共享教室，因为需要安静的地方。','原因从句。'),pair('However, occupancy is not a measure of achievement.','然而，占用率不是学业表现指标。','转折 + 证据界限。')],
 referenceUrls:[BC+'/contrasting-ideas-although-despite-others'],sourceNote:'结合英语 Academic lecture structure and signposting 现有课程与 British Council 对比结构教程重新编写。'},
 {id:'en-modals',type:'grammar',language:'en',level:'B2',title:'may / could / appears to 与学术立场',subtitle:'用证据支持程度决定措辞',unitLink:'en-ielts-listening-u01',prerequisite:'掌握一般现在时、情态动词的基础结构与简单论证。',objective:'能区分事实、可能性、推测与因果声明，复述时保留作者态度。',
 sections:[
 section('01 may 与 could：可能性不是事实','may 常指某事有可能；could 可表达可能结果或条件性潜力。两者都不能自动当成“已经发生”。学术复述须保存原文的保留语气。','subject + may / could + base verb',[
 pair('Additional rooms may improve access for some students.','新增房间可能改善部分学生的使用机会。','may + 原形 improve。'),pair('The change could reduce waiting times.','这一变化可能缩短等待时间。','could 不表示等待时间已经缩短。')],'不要将 may help 改成 definitely improves；也不能把 could 提升为已被证实的因果结果。'),
 section('02 appears to / seems to / is consistent with','appears to 和 seems to 表示说话人基于观察的判断，不代表确证。is consistent with 表明与某种解释相符，但同时可能存在别的解释。','appears to + verb / is consistent with + noun phrase',[
 pair('Demand appears to increase before exams.','考试前需求似乎有所增加。','appears to 带有观察性限定。'),pair('The pattern is consistent with seasonal demand.','这一模式与季节性需求相符。','不能据此证明唯一原因。')],'不能把 is consistent with 译为“充分证明由……导致”。'),
 section('03 observation、association、causation','观察结果回答观察到什么；相关关联表示变量一同变化；因果主张则需要更强设计和证据。词汇上 avoid proves、demonstrates 因为数据只描述占用率。','measurement ≠ learning outcome ≠ causal proof',[
 pair('Occupancy figures show when rooms are used.','占用率数据表明房间何时被使用。','测量变量是占用情况。'),pair('They do not demonstrate that grades improved.','它们并不能证明成绩提高。','无法用设施使用指标直接推出学习收益。')],'如果没有成绩数据，不可编造 improved grades 或确证结果。')],
 questions:[{question:'判断：may help 可以改写为 will definitely help 吗？',answer:'不能。',why:'前者表达可能性，后者表示确定性。'},{question:'is consistent with 等于 proves caused by 吗？',answer:'不等于。',why:'一致性不代表排除其他原因。'}],
 output:'用四句英语总结一项观察：研究问题、观察方法、可能性与局限各一句，并保留谨慎语气。',model:[
 pair('The speaker asks whether usage may improve learning.','讲者提出使用情况是否可能改善学习的问题。','问题性质。'),pair('The figures show occupancy, not academic achievement.','数据衡量的是占用情况，而非学业成绩。','证据界限。')],
 referenceUrls:[BC+'/modals-deductions-about-present'],sourceNote:'以原有英语讲座专题中的 evidence strength 与 modality 说明为核心，并外部交叉参考情态动词用法。'},
 {id:'en-conditionals',type:'grammar',language:'en',level:'B1',title:'条件句：真实条件与假设结果',subtitle:'从 if + present 到 if + past 的意义变化',unitLink:'en-ielts-language-upgrade-u01',prerequisite:'掌握一般现在时、过去式和 will。',objective:'能区分真实可能条件与假设条件，避免 If I will… 的常见误用。',
 sections:[
 section('01 第一条件句：现实中可能发生','当条件有实际可能发生时，英语常使用 if + 一般现在时，主句用 will / can / may 表达结果或可能性。时间指向未来并不意味着 if 从句必须用 will。','If + present simple, will/can/may + base verb',[
 pair('If the library opens early, I will study there.','如果图书馆早开门，我就在那里学习。','if 从句用 opens，主句 will study。'),pair('If we collect better data, we may reach a clearer conclusion.','如果收集更好的数据，我们可能得出更明确的结论。','主句 may 保留可能性。')],'入门规则中不要写 If the library will open early；但 will 在 if 从句中有特殊意愿含义时另当别论。'),
 section('02 第二条件句：假设与当前距离','假设不太可能、与事实相反或纯想象的情况时，常用 if + 过去式，主句 would + 原形。它表示与现实的距离，而非单纯过去发生的事。','If + past simple, would + base verb',[
 pair('If I had more time, I would read every day.','如果我有更多时间，我会每天阅读。','实际可能没有这么多时间。'),pair('If the campus were quieter, students might concentrate better.','假如校园更安静，学生可能更容易集中注意力。','were 常用于正式假设，might 表可能性。')],'不能把 would 随意放进普通 if 条件从句；先判断现实性，再选结构。'),
 section('03 零条件句：普遍规律与每次重复发生的结果','零条件句常用于普遍规律或反复出现的结果，条件与结果两个分句一般都用现在时。它不同于第一条件句：第一条件句谈某个将来可能发生的情境及其结果，而零条件句讨论通常成立的关系。','If + present simple, present simple',[
 pair('If a student studies regularly, their vocabulary usually grows.','如果学生经常学习，词汇量通常会增长。','现在时表示一般习惯性趋势，不是对某个学生的准确保证。'),
 pair('If the library closes early, students need another place to study.','如果图书馆关门早，学生就需要别的学习地点。','可表达反复出现的实际问题，取决于语境。')
 ],'不要把零条件句误当成所有带 if 的句子都必须表达绝对科学事实；也不要把它和将来一次性的第一条件句混为一谈。')],
 questions:[{question:'填空：If it ___ (rain), we will stay inside.',answer:'rains',why:'第一条件句 if 从句使用现在时。'},{question:'填空：If I ___ (have) more time, I would study French.',answer:'had',why:'第二条件句 if + 过去式。'}],
 output:'写两组对比：一个真实可行的学习计划、一个理想化学习安排，各写两句。',model:[
 pair('If I finish my work, I will review the vocabulary tonight.','如果做完工作，我今晚会复习词汇。','现实可能。'),pair('If I had more free time, I would practise speaking daily.','如果有更多空闲，我就会每天练习口语。','假设条件。')],
 referenceUrls:[BC],sourceNote:'结合现有英语 language-upgrade 单元与 British Council B1–B2 系列框架重新编写，非官方课程文本。'},
 {id:'fr-greetings',type:'vocabulary',language:'fr',level:'A1',title:'问候、介绍与礼貌用语',subtitle:'把词汇变成真实见面和告别的语块',unitLink:'fr-a1-u01',prerequisite:'认识基础法语字母及 Je m’appelle。',objective:'能区分时间、熟悉程度与使用场景，完整开展初次见面和道别。',
 sections:[
 section('01 见面用语：时间和场合','Bonjour 多用于白天的普遍问候，Bonsoir 用于夜晚或傍晚的见面问候；Salut 常用于非正式关系，可以用于见面或告别。选词首先取决于语域，不是简单的字面翻译。','bonjour / bonsoir / salut',[
 pair('Bonjour, Madame Dupont.','您好，杜邦女士。','正式称呼可用 Bonjour。'),pair('Bonsoir, Monsieur.','晚上好，先生。','晚上会面时使用。'),pair('Salut, Camille !','嗨，卡米耶！','同伴间自然使用。')],'不要把 bonsoir 和 bonne nuit 当成完全相同的开场招呼；后者常用于睡前告别。'),
 section('02 交换姓名与身份','Je m’appelle 后接姓名；Et vous ? / Et toi ? 让对话自然往返。Enchanté(e) 表示认识对方的愉快心情，其书写形式与说话者性别有关。','Je m’appelle… / Et toi ? / Enchanté(e) !',[
 pair("Je m'appelle Lina. Et vous ?",'我叫莉娜。您呢？','正式场合用 vous。'),pair('Moi, c’est Hugo. Et toi ?','我叫雨果。你呢？','口语非正式，toi 对应 tu。'),pair('Enchantée de vous rencontrer.','很高兴认识您（女性说话者）。','enchantée 的末尾 e 为性别配合。')],'初次遇见同龄同学也可能直接说 tu，不能一律判为无礼。'),
 section('03 道别与礼貌请求','Au revoir 为常用道别；À bientôt 表示希望不久再见；S’il vous plaît 用于正式或复数，S’il te plaît 用于非正式单数。','Au revoir / à bientôt / s’il vous plaît',[
 pair('Au revoir, à bientôt !','再见，回头见！','自然道别。'),pair("Un café, s'il vous plaît.",'请给我一杯咖啡。','礼貌提出请求。')],'请不要把 s’il te plaît 直接用于所有人；tu/vous 的一致性要贯穿句子。')],
 questions:[{question:'正式向新老师问好，应优先选 Bonjour 还是 Salut？',answer:'Bonjour',why:'正式语境更适合 Bonjour。'},{question:'填空：Je m’___ Camille.',answer:'appelle',why:'固定表达为 Je m’appelle。'}],
 output:'写一段正式对话和一段同龄同学对话，各包含问候、介绍、问对方姓名和道别。',model:[
 pair("Bonjour, je m'appelle Lina.",'您好，我叫莉娜。','正式开头。'),pair('Et vous, comment vous appelez-vous ?','那您呢，您叫什么名字？','礼貌提问。')],
 referenceUrls:['https://opentextbc.ca/francaisinteractif/chapter/04-contenus-dapprentissage/'],sourceNote:'由私人 FR A1 U01 原始对话与校订记录重写例句，扩展语域差异。'},
 {id:'fr-family',type:'vocabulary',language:'fr',level:'A1',title:'家庭、关系、年龄与人物介绍',subtitle:'以冠词和物主限定词搭配记忆人物名词',unitLink:'fr-a1-u03',prerequisite:'掌握 avoir 和 mon / ma / mes 的基础形式。',objective:'能介绍家庭成员、年龄和人际关系，避免孤立背单词。',
 sections:[
 section('01 家庭成员须连同限定词','un père / une mère / une sœur / un frère 等名词需同时记忆其语法性别；mes parents 表示父母，与 parent 单数不同。','mon père / ma mère / mes parents / une sœur',[
 pair('Mon père parle français.','我父亲说法语。','mon 修饰阳性单数。'),pair('Ma sœur habite à Lyon.','我的姐妹住在里昂。','sœur 为阴性。'),pair('Mes parents travaillent ici.','我的父母在这里工作。','复数配 mes，动词也用复数。')],'不要把所有家庭名词译成男女不分的中性单词；法语冠词提供重要信息。'),
 section('02 关系与年龄：完整短句','使用 avoir 介绍年龄，使用 s’appeler 指名，用 habiter 描述居住地点。按“人物 → 关系 → 年龄 → 住处”的逻辑组成完整段落。','X s’appelle… / X a … ans / X habite à…',[
 pair('Ma sœur s’appelle Amélie.','我姐妹叫阿梅莉。','第三人称反身动词 s’appelle。'),pair('Elle a dix-neuf ans.','她十九岁。','年龄使用 avoir。'),pair('Elle habite à Montréal.','她住在蒙特利尔。','habiter + à + 城市。')],'不要把 Elle est vingt ans 当年龄表达。'),
 section('03 扩展“朋友”的性数','un ami / une amie、mes amis / mes amies 中单复数及性别有书面变化；mon amie 虽然指女性朋友，但由于元音起始，用 mon。','un ami / une amie / mon amie / mes amis',[
 pair('Mon amie est étudiante.','我的女性朋友是学生。','mon amie 的阴性名词以元音开头。'),pair('Mes amies sont étudiantes.','我的女性朋友们都是学生。','复数名词、主语和形容词同步。')],'不要写 ma amie。')],
 questions:[{question:'填空：___ parents sont ici.',answer:'Mes',why:'parents 复数，使用 mes。'},{question:'填空：___ amie habite ici.',answer:'Mon',why:'阴性元音开头，使用 mon。'}],
 output:'写 6 句介绍自己与两位家人，包含人物姓名、年龄、居住城市和至少三种不同词组搭配。',model:[
 pair("J'ai un frère et une sœur.",'我有一个兄弟和一个姐妹。','冠词随名词性别。'),pair('Mon frère a dix-huit ans.','我的兄弟十八岁。','人际关系 + 年龄。')],
 referenceUrls:[F+'det6.html'],sourceNote:'取自私人 FR A1 U03 原有主题，搭配和中文解释重新编写。'},
 {id:'fr-room',type:'vocabulary',language:'fr',level:'A1',title:'房间物品、方位与空间描述',subtitle:'将名词、冠词与空间介词一起掌握',unitLink:'fr-a1-u04',prerequisite:'知道法语名词性数和 il y a。',objective:'能介绍房间里的物品并说明空间关系。',
 sections:[
 section('01 先学名词加冠词','table 为阴性，bureau / ordinateur / livre / stylo 为阳性；物品第一次出现常配不定冠词。一个词的中文含义不足以决定如何造句。','une table / un bureau / un ordinateur / un livre',[
 pair('Il y a une table dans la pièce.','房间里有一张桌子。','une + table。'),pair('Un livre est sur le bureau.','一本书在书桌上。','un livre 和 le bureau 不同指称。')],'l’ordinateur 为定冠词省音，不是独立的不定冠词 l’。'),
 section('02 方位表达要有参照物','sur 表示“在……上方表面”，sous 表示“在……下方”，près de 表示“在……附近”。à côté de 表示“在……旁边”，更强调相邻。完整描述需指出物品和参照物。','sur la table / sous la chaise / près de la fenêtre',[
 pair('Le sac est sous la chaise.','包在椅子下面。','sous。'),pair('La lampe est sur le bureau.','灯在书桌上。','sur。'),pair('Le bureau est près de la fenêtre.','书桌靠近窗户。','près de。')],'物品位置方向弄反会改变事实，不是小的语言风格差异。'),
 section('03 指认和存在串成一段','用 Voici 介绍场景，用 il y a 引入物品，再用 le/la 指回上文物品，最终写一句否定。这种信息推进能把词汇变成连贯短文。','Voici… → Il y a… → Le/La… est… → Il n’y a pas de…',[
 pair('Voici ma chambre.','这是我的房间。','建立场景。'),pair('Il y a un bureau.','有一张书桌。','引入物品。'),pair('Le bureau est près de la fenêtre.','书桌靠近窗户。','特指已引入的物品。')],'Il n’y a pas de 与 Ce n’est pas un 的冠词机制不同。')],
 questions:[{question:'翻译“在椅子下面”',answer:'sous la chaise',why:'sous 表下方，chaise 阴性用 la。'},{question:'“这里没有书”该说 Il n’y a pas ___ livre ici.',answer:'de',why:'普通否定存在的 un 通常变 de。'}],
 output:'描述学习空间，使用至少六个不同物品名词、两个方位词，并以完整句子构建段落。',model:[
 pair('Il y a un bureau près de la fenêtre.','窗边有一张书桌。','介绍存在和位置。'),pair('Le livre est sur le bureau.','书在书桌上。','用已知的 bureau 作参照物。')],
 referenceUrls:[F+'det4.html',F+'no4.html'],sourceNote:'取自私人 FR A1 U04 的物品场景与既有法语冠词深度样板。'},
 {id:'en-signpost-vocab',type:'vocabulary',language:'en',level:'B1',title:'学术讲座结构信号与连接语块',subtitle:'辨认开篇、推进、转折、结论和举例功能',unitLink:'en-ielts-listening-u01',prerequisite:'理解完整句子，认识 because 和 but。',objective:'能听出结构标记，在笔记中定位讲话阶段而不误判其为研究证据。',
 sections:[
 section('01 开篇和顺序信号','to begin with、first、next、finally 等提示讲者的内容组织顺序。这类词可以成为听力笔记中的段落锚点，但本身不包含论据。','to begin with / first / next / finally',[
 pair('To begin with, the speaker explains the research question.','首先，讲者解释研究问题。','开篇标记。'),pair('Next, the lecture describes how occupancy is measured.','接下来，讲座介绍如何测量占用情况。','进入方法段。')],'finally 不一定表示已经证实结论，只表篇章顺序。'),
 section('02 举例与转折信号','for example、let me illustrate this 标记例子；however、nevertheless、on the other hand 带来限制、反驳或对比。复述时先问：句子是在举例还是陈述经过测量的事实？','for example / however / in contrast',[
 pair('For example, students may prefer different study times.','例如，学生可能偏好不同时段的学习。','举例，不自动成为样本测量。'),pair('However, high usage does not prove better grades.','然而，高使用量不能证明成绩更高。','限制推论。')],'on the other hand 依语境构成另一方面的对照，并非单纯任何“但是”都适用。'),
 section('03 结论性语块','to sum up、in conclusion、overall 常提示总结；谨慎总结应包含先前论据的范围、限制和立场，不额外引入新数据。','to sum up / in conclusion / overall',[
 pair('To sum up, facilities should serve different student needs.','总而言之，设施应满足学生不同需求。','总结重点。'),pair('Overall, the figures describe usage, not learning outcomes.','总体来看，数据说明使用情况，而非学习成果。','保留限定。')],'不能把总结语块机械地贴在任意位置而使段落逻辑中断。')],
 questions:[{question:'听到 However 时应优先标记哪种功能？',answer:'对比、转折或限定。',why:'需要进一步听它限制哪项陈述。'},{question:'Let me illustrate this 表示统计结论吗？',answer:'不一定，它首先表示要举例。',why:'例子是否有证据价值需另行判断。'}],
 output:'制作一份“开篇—方法—举例—限制—结论”的五格笔记，填入不同连接标记和一条有效语句。',model:[
 pair('To begin with, we will define occupancy.','首先我们将定义占用情况。','开篇。'),pair('However, usage alone cannot establish causation.','然而，仅凭使用量不能确立因果关系。','限制。')],
 referenceUrls:[EVP],sourceNote:'结合原学术讲座课程与 Cambridge 关于词组 / chunks 的词汇教学描述。'},
 {id:'en-evidence-vocab',type:'vocabulary',language:'en',level:'B2',title:'研究方法、证据力度与学术词组',subtitle:'不把 usage、evidence、causation 混成同一个概念',unitLink:'en-ielts-listening-u01',prerequisite:'掌握学术讲座常用结构标记。',objective:'能够分清 observation、measurement、evidence、outcome 和 causation。',
 sections:[
 section('01 measurement 与 observation','observe 指观察，measurement 指测量过程或衡量所得信息。room occupancy 衡量空间占用，不能因为数字精确就默认指标与研究问题相同。','observe room occupancy / measure usage',[
 pair('Researchers observed occupancy at different times.','研究人员观察了不同时段的房间占用情况。','说明观察对象。'),pair('Usage figures indicate when rooms are occupied.','使用量数据显示房间何时被使用。','衡量使用而不是学习成果。')],'occupancy 不能直接等同 academic achievement。'),
 section('02 evidence 和 limitation 的搭配','collect evidence 是收集证据；identify a limitation 是明确局限；illustrative example 是说明例子。一个观点是否强，取决于具体证据如何产生和它是否回答了核心问题。','collect appropriate evidence / a critical limitation / illustrative example',[
 pair('The lecturer identifies a critical limitation.','讲者指出了一项关键局限。','与原课程论证路径对应。'),pair('An illustrative example is not a measured result.','说明性的例子不等于测量结果。','不同来源的信息不能混淆。')],'不能用 illustrative example 代替 experimentally demonstrated result。'),
 section('03 causation 与 association','cause / lead to 用于因果措辞，be associated with 表示相关，is consistent with 表示与现象一致。遇到强因果措辞要检查是否具备支持证据。','be associated with / be consistent with / establish causation',[
 pair('High usage may be associated with examination periods.','高使用量可能与考试时段有关。','谨慎表达相关。'),pair('This does not establish causation.','这不能确立因果关系。','结论不能超过证据。')],'is consistent with 不是 caused by。')],
 questions:[{question:'把“收集恰当证据”翻译为英语',answer:'collect appropriate evidence',why:'appropriate 指符合研究目标和方法。'},{question:'room occupancy 能直接测量 academic achievement 吗？',answer:'不能。',why:'前者为空间使用指标，后者为学习结果。'}],
 output:'写 80–100 词摘要，至少使用 collect evidence、a limitation、is consistent with 和 cannot establish causation。',model:[
 pair('The observations describe room occupancy.','这些观察描述房间占用情况。','观察变量。'),pair('They do not establish a causal benefit for learning.','它们不能确立学习收益的因果作用。','审慎结论。')],
 referenceUrls:[EVP],sourceNote:'围绕现有英语 B1–B2 学术听力课程关键词进行独立词义与搭配教学。'},
 {id:'en-study-vocab',type:'vocabulary',language:'en',level:'B1',title:'大学学习、空间与时间管理',subtitle:'把 study habits 转换成自然的词汇搭配',unitLink:'en-ielts-listening-u01',prerequisite:'掌握日常学习和时间表达。',objective:'使用 facilities、schedule、availability、concentrate、deadline 组成连贯学习建议。',
 sections:[
 section('01 facilities 与 study spaces','facility 更侧重设施或场所的功能，study space 指供学习使用的具体空间。available 指可用，accessible 可强调可进入或可利用；两者与 actual learning outcome 不等价。','study spaces / learning facilities / availability of rooms',[
 pair('The university provides quiet study spaces.','大学提供安静的学习空间。','study spaces 复数可数。'),pair('The availability of rooms varies by time.','房间可用情况随时间变化。','availability of + 名词。')],'availability of spaces 不等于 guaranteed successful learning。'),
 section('02 schedules 与时间管理搭配','meet a deadline 指在截止时间前完成任务；manage a schedule 指管理安排；set aside time for 表示专门留出时间。词汇应作为语块投入实际自我管理中。','manage a schedule / meet a deadline / set aside time for',[
 pair('I set aside an hour for revision each evening.','我每天晚上留出一小时复习。','set aside time for + 名词。'),pair('We need to meet the assignment deadline.','我们需要赶上作业截止日期。','deadline 常与 meet 搭配。')],'meet a deadline 不等同于 arrange a deadline；不同动词搭配的自然度不同。'),
 section('03 concentration 与学习方式','concentrate on + 名词/-ing 表示专注；revise vocabulary 表示复习词汇（英式英语常用）；review 在各英语变体中也广泛使用。学生要按句子和任务应用。','concentrate on / revise vocabulary / review notes',[
 pair('I concentrate better in a quiet room.','在安静的房间里我更能集中注意力。','concentrate 可与 better 搭配。'),pair('She reviews her notes after each lecture.','她每次讲座结束后复习笔记。','review notes 为常见词组。')],'concentrate to my notes 不符合常见搭配，优先使用 concentrate on my notes。')],
 questions:[{question:'填空：I need to ___ a deadline.',answer:'meet',why:'meet a deadline 是固定搭配。'},{question:'填空：She needs to concentrate ___ her work.',answer:'on',why:'concentrate on。'}],
 output:'写 5–7 句个人学习计划，使用四个不同搭配、一个实际时间安排和一项可能遇到的困难。',model:[
 pair('I set aside time for revision every evening.','我每天晚上留时间复习。','时间管理。'),pair('I concentrate better in the library.','我在图书馆能更集中注意力。','地点 + 学习习惯。')],
 referenceUrls:['https://learnenglish.britishcouncil.org/free-resources/vocabulary/b1-b2'],sourceNote:'与现有学习空间讲座的场景衔接，词汇句子为本项目重新编写。'}
];
export const SPECIALTY_LESSONS:SpecialtyLesson[]=[
 fromCurated('grammar',FRENCH_ARTICLES,'fr-articles','法语冠词与存在句','不定冠词、定冠词、否定及 c’est / il y a','fr-a1-u04','A1',[F+'det4.html',F+'det2.html',F+'virr3.html']),
 fromCurated('grammar',STUDY_SPACES,'en-signposts','学术讲座结构标记与语气','从 signposting 到 evidence strength','en-ielts-listening-u01','B2',[BC,EVP]),
 fromCurated('vocabulary',FRENCH_ARTICLES,'fr-objects','生活物品名词与冠词组合','10 个空间物品语块与否定形式','fr-a1-u04','A1',[F+'det4.html']),
 fromCurated('vocabulary',STUDY_SPACES,'en-lecture-terms','讲座关键词与论证词组','occupancy、limitation、measurement 与句意','en-ielts-listening-u01','B2',[EVP]),
 ...hand,
 ...EXPANDED_SPECIALTIES,
 ...FRENCH_GRAMMAR_EXPANSION,
 ...FRENCH_PATH_GRAMMAR,
 ...FRENCH_PATH_VOCABULARY,
 ...ENGLISH_PATH_SPECIALTIES,
 ...FRENCH_GRAMMAR_CONTINUITY,
 ...REMAINING_LANGUAGE_CONTINUITY,
 ...INTERMEDIATE_FRENCH_SPECIALTIES,
 ...IELTS_ARGUMENT_SPECIALTIES,
 ...ADVANCED_FRENCH_SPECIALTIES,
 ...NEXT_CURRICULUM_CONTINUITY,
 ...FRENCH_EXAM_WRITING_CONTINUITY,
 ...FRENCH_MEDIA_READING_CONTINUITY,
 ...A1_QUESTIONS_LISTENING_PARAPHRASE,
 ...FR_A1_LEISURE_GRAMMAR,
 ...NEXT_CORE_TEACHING_WAVE,
 ...HOME_PLANS_READING_HEADINGS,
 ...A1_PAST_AND_READING_EVIDENCE,
 ...IELTS_READING_GRAMMAR_U05_U08,
 ...IELTS_READING_LEXICON_U05_U08,
 ...IELTS_READING_U01_PLATFORM_VOCAB,
 ...IELTS_LISTENING_U04_U06_SPECIALTIES,
 ...FR_A2_REPAIR_SPECIALTIES,
 ...IELTS_LISTENING_U07_U08_SPECIALTIES,
 ...IELTS_TASK1_U03_U04_SPECIALTIES,
 ...IELTS_TASK1_U01_U02_SPECIALTIES
];
export function specialtyRoute(type:SpecialtyKind,language?:string,topic?:string,returnTo?:string){
 const params=new URLSearchParams({page:'specialties',type});
 if(language)params.set('language',language);
 if(topic)params.set('topic',topic);
 if(returnTo&&/^\/\?course=[^#]+$/.test(returnTo))params.set('returnTo',returnTo);
 return '/?'+params.toString();
}
export function linkedSpecialties(type:SpecialtyKind,courseId:string):SpecialtyLesson[]{
 return SPECIALTY_LESSONS.filter(x=>x.type===type&&x.unitLink===courseId);
}
export function linkedSpecialty(type:SpecialtyKind,courseId:string):SpecialtyLesson|undefined{
 return linkedSpecialties(type,courseId)[0];
}
export function specialtyQuality(unit:SpecialtyLesson){
 const ex=unit.sections.flatMap(s=>s.examples);
 return unit.sections.length>=3&&unit.questions.length>=2&&unit.model.length>=2&&
 ex.length>=6&&unit.sections.every(s=>s.concept.length>=35&&s.caution.length>=12&&s.pattern.length>4&&s.examples.every(e=>e.zh.length>3&&e.target.length>8&&e.analysis.length>3))&&
 unit.questions.every(q=>q.answer.length>0&&q.why.length>=12);
}
