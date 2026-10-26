import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Fully authored bilingual sequence. Source links validate grammatical rules, not the wording of these examples. */
export const INTERMEDIATE_FRENCH_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'fr-conditional-hypothesis-b1',type:'grammar',language:'fr',level:'B1',unitLink:'fr-b1-u03',
 title:'条件式现在时：假设、建议与礼貌请求',subtitle:'由简单将来时词干进入 si + imparfait 的条件表达',
 prerequisite:'会形成 futur simple 和 imparfait，认识 si + 现在时的现实条件句。',
 objective:'形成条件式六人称变位，区分现实和假设条件，正确使用 si + imparfait → conditionnel 与礼貌请求。',
 sections:[
 s('01 将来词干加未完成过去时词尾',
 '条件式现在时使用与简单将来时相同的词干，加 imparfait 的 -ais、-ais、-ait、-ions、-iez、-aient。规则 -er/-ir 一般保留不定式词干；-re 去末尾 e；être、avoir、aller 等沿用不规则将来词干。',
 'parler- + -ais → parlerais；ser- + -ions → serions',[
 e('Je parlerais français plus souvent.','我会更经常说法语。','parler- + -ais 构成 je parlerais。'),
 e('Nous serions disponibles vendredi.','我们星期五会有空。','être 的不规则词干 ser- + -ions。'),
 e('Ils auraient plus de temps.','他们会有更多时间。','avoir 使用 aur- + -aient。')
 ],'条件式不是将来时词尾：je parlerai 表示将来，而 je parlerais 可表达假设、委婉语气等。',
 {title:'parler 的条件式现在时',columns:['主语','词尾','变位'],rows:[['je','-ais','parlerais'],['tu','-ais','parlerais'],['il/elle','-ait','parlerait'],['nous','-ions','parlerions'],['vous','-iez','parleriez'],['ils/elles','-aient','parleraient']],note:'-as 属于将来时 tu parleras；条件式 tu 的词尾是 -ais。'}),
 s('02 假设条件：si + imparfait',
 '谈论目前并不确定或与现实相反的情形时，常用 si + imparfait，再用 conditionnel présent 描述可能结果。两个部分可前后调换，但 si 从句中不使用条件式。此结构的 imparfait 不一定指过去时间。',
 'Si + imparfait, conditionnel présent',[
 e('Si j’avais plus de temps, je lirais davantage.','如果我时间更多，我会多读书。','avais 表假设，lirais 表可能结果。'),
 e('Nous voyagerions davantage si nous avions plus d’argent.','如果资金更多，我们会更多旅行。','条件置于句末，结构不变。'),
 e('Si tu étais libre, nous pourrions travailler ensemble.','如果你有空，我们就可以一起工作。','pourrions 使用 pouvoir 的不规则词干。')
 ],'不能写 Si j’aurais le temps：在这种假设条件句中，si 后应为 avais，而非 aurais。'),
 s('03 同一情境中的现实条件与假设',
 'si + présent → futur simple 常表达说话人视为现实可能性的未来条件；si + imparfait → conditionnel présent 则将条件设为假想。二者不是按“今天/明天”机械区分。表意不同，不能在改写时只换一个动词词尾。',
 'Si nous avons le temps, nous irons. / Si nous avions le temps, nous irions.',[
 e('Si nous avons le temps, nous visiterons le musée.','如果我们有时间，我们就会去参观博物馆。','现实可实现的未来计划。'),
 e('Si nous avions plus de temps, nous visiterions deux musées.','如果时间更多，我们会参观两座博物馆。','假设时间更充裕。'),
 e('Si j’étais à ta place, je demanderais conseil.','如果我是你，我会征求建议。','典型的非真实假设和委婉建议。')
 ],'Si nous aurons le temps 和 Si nous aurions le temps 都不适用于上述基本条件句。'),
 s('04 礼貌请求、建议与不确定信息',
 '条件式也可减弱语气：je voudrais 表达希望，pourriez-vous 提出礼貌请求，on pourrait 提议某种方案。新闻中的条件式还可能转述未经确认的信息，这时必须保留来源与不确定性，不能当成已证实事实。',
 'Je voudrais… / Pourriez-vous… ? / On pourrait…',[
 e('Je voudrais réserver une table pour deux.','我想预订一张两人餐桌。','voudrais 比直接要求更委婉。'),
 e('Pourriez-vous répéter, s’il vous plaît ?','您能再说一遍吗？','pourriez-vous 是礼貌问句。'),
 e('On pourrait comparer les deux propositions.','我们可以比较这两种方案。','pourrait 表示建议而非命令。')
 ],'条件式并不总是过去时间；“voudrais”可表达此刻的礼貌请求。')
 ],
 questions:[
 {question:'将 je parlerai 改为条件式现在时。',answer:'je parlerais',why:'词干仍为 parler-，je 条件式加 -ais 而非将来时 -ai。'},
 {question:'填空：Si j’___ (avoir) le temps, je ___ (venir).',answer:'avais ; viendrais',why:'si 从句使用 imparfait avais，主句条件式 venir 词干 viendr-。'},
 {question:'改错：Si nous aurions une voiture, nous voyagerions davantage.',answer:'Si nous avions une voiture, nous voyagerions davantage.',why:'B1 假设条件句 si 后用 imparfait，不能用 conditionnel。'},
 {question:'用礼貌句表达“您能帮我吗？”',answer:'Pourriez-vous m’aider ?',why:'pouvoir 条件式 pourriez 与主语 vous 倒装表达委婉请求。'}
 ],
 output:'写八句法语讨论“如果一周有一天自由时间会怎么安排”：提出两个假设、说明至少两个结果、用 pourrais/pourriez-vous 提建议或请求，最后解释偏好。',
 model:[
 e('Si j’avais une journée libre, je commencerais par une promenade.','如果有一天空闲时间，我会先散步。','假设和第一个结果。'),
 e('Je prendrais ensuite un café avec mes amis.','然后我会和朋友喝咖啡。','条件式延续假想安排。'),
 e('Si le temps était mauvais, je resterais à la maison.','如果天气不好，我会待在家里。','条件改变，结果相应变化。'),
 e('Je lirais un livre ou je regarderais un film.','我会读书或看电影。','两个动作使用条件式。'),
 e('On pourrait aussi visiter un musée.','我们也可以参观一座博物馆。','委婉提出建议。'),
 e('Pourriez-vous me recommander un musée intéressant ?','您能给我推荐一家有意思的博物馆吗？','条件式礼貌请求。'),
 e('Je préférerais sortir, car je passe déjà beaucoup de temps chez moi.','我更愿意出门，因为我已经经常待在家里。','表述偏好和原因。'),
 e('Cette journée me permettrait de me reposer.','这一天可以让我休息一下。','归纳设想的意义。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tac1.html','https://www.laits.utexas.edu/tex/gr/'],
 sourceNote:'对应现有 B1 u03 条件式与假设目标。依 Tex conditional 构词规则复核；全部例句与练习新写。'
},
{
 id:'fr-relative-pronouns-b1',type:'grammar',language:'fr',level:'B1',unitLink:'fr-b1-u06',
 title:'关系代词 qui、que、dont、où：合并信息与限定对象',
 subtitle:'先分析从句空缺的是主语、宾语、de 补语还是地点时间',
 prerequisite:'能够辨认名词、动词主语与直接宾语；知道 parler de / avoir besoin de 等搭配。',
 objective:'正确使用 qui、que、dont、où 合并两句话，并核查 de 的来源和过去分词配合。',
 sections:[
 s('01 qui 作从句主语，que 作直接宾语',
 'qui/que 的选择依据关系代词在从句内的句法作用：qui 充当从句主语，后面直接接谓语；que 充当直接宾语，后面通常已有另一个主语。它们都可修饰人或物，不能照英语 who/which 分配。',
 'la personne qui parle / la personne que je connais',[
 e('Je connais une femme qui parle trois langues.','我认识一位会说三门语言的女性。','qui 是 parle 的主语。'),
 e('Voici le livre que tu cherches.','这就是你正在找的书。','tu 已是 cherches 的主语，que 作宾语。'),
 e('Les étudiants qui travaillent ici sont motivés.','在这里工作的学生很积极。','qui 的先行词为 étudiants，谓语 travaillent 用复数。')
 ],'不能根据“人用 qui、物用 que”判断；两者都可指人或物，核心是从句内语法功能。',
 {title:'四类关系代词的判断方法',columns:['代词','从句中的作用','常见构造'],rows:[['qui','主语','la personne qui parle'],['que / qu’','直接宾语','le livre que je lis'],['dont','de 的补语','le sujet dont je parle'],['où','地点或时间状语','la ville où je vis']],note:'先还原完整从句找缺口，避免只凭中文“的”选择词形。'}),
 s('02 dont 对应动词或名词需要的 de',
 '当从句动词或名词结构必须带 de，可以用 dont 代表前面的先行词：parler de、avoir besoin de、être fier de 等。dont 不意味着“地点”，也不能自动代替 à、avec 等不同介词。',
 'parler de ce projet → le projet dont je parle',[
 e('Le film dont tu parles est disponible.','你谈到的那部电影可以观看。','parler de + film，被 dont 接回。'),
 e('Voici le livre dont j’ai besoin.','这就是我需要的书。','avoir besoin de + livre。'),
 e('C’est une collègue dont je respecte le travail.','这是一位我尊重其工作的同事。','dont 表示 le travail de cette collègue 的所属关系。')
 ],'不能写 la personne dont je téléphone 来表示“我给她打电话的人”；téléphoner à 应用 à qui。'),
 s('03 où 用于地点，也可指时间',
 'où 修饰有地点或时间意义的先行词，表达“在……的地方/……的时候”。如果从句缺失的是直接宾语，仍需 que；即使先行词是一座城市，也不能只因它是地点就用 où。',
 'la ville où j’habite / le jour où nous sommes partis',[
 e('C’est la ville où je suis né.','这是我出生的城市。（男性叙述者）','où 表示出生地点。'),
 e('Je me souviens du jour où nous nous sommes rencontrés.','我记得我们相遇的那一天。','où 引出时间。'),
 e('La ville que nous avons visitée était calme.','我们参观过的那座城市很宁静。','visiter 直接接宾语，因此使用 que，而不是 où。')
 ],'La ville où nous avons visitée 把地点名词和直接宾语功能混淆。'),
 s('04 合并句子时检查意义与过去分词配合',
 '先确定两句共享的名词，再还原从句动词的必要成分，最后选择关系代词。que 在复合过去时中如果是前置直接宾语，过去分词在符合条件时要与先行词性数一致；qui 作主语时仍检查谓语与先行词一致。',
 '两句共享名词 → 从句角色 → 关系代词 → 配合',[
 e('J’ai acheté une robe. Tu aimes cette robe. → J’ai acheté une robe que tu aimes.','我买了一条你喜欢的裙子。','que 作 aimes 的直接宾语。'),
 e('La lettre que j’ai écrite est prête.','我写的信已经准备好了。','前置直接宾语 lettre 为阴性，因此 écrite 配合。'),
 e('Les élèves qui sont arrivés tôt attendent ici.','早到的学生们在这里等候。','arrivés 与复数 élèves 配合。')
 ],'que 与 qui 的区别还会影响时态配合；不能只把两句粘起来而不检查从句结构。')
 ],
 questions:[
 {question:'填空：C’est le professeur ___ explique la règle.',answer:'qui',why:'关系代词在 explique 中承担主语，用 qui。'},
 {question:'填空：Voici le livre ___ nous lisons.',answer:'que',why:'nous 是 lisons 的主语，关系代词作宾语。'},
 {question:'填空：C’est le travail ___ elle parle.',answer:'dont',why:'parler de quelque chose，对应 de 的补语由 dont 表示。'},
 {question:'填空：La ville ___ nous avons visitée était belle.',answer:'que',why:'visiter la ville 是直接宾语关系，不能仅因为先行词是地点就用 où。'}
 ],
 output:'写八句法语介绍一座城市和一位同事，至少使用 qui、que、dont、où 各一次，并解释其中两处关系代词为何不能替换。',
 model:[
 e('J’habite dans une ville où il y a plusieurs bibliothèques.','我住在一座有几家图书馆的城市。','où 说明地点。'),
 e('La bibliothèque que je préfère est près de mon bureau.','我最喜欢的图书馆就在办公室附近。','que 充当 préfère 的宾语。'),
 e('Je travaille avec une collègue qui connaît très bien la ville.','我有一位非常熟悉这座城市的同事。','qui 是 connaît 的主语。'),
 e('C’est une personne dont j’apprécie les conseils.','她是一位我很珍视其建议的人。','dont 表达 ses conseils。'),
 e('Elle m’a montré un quartier que je ne connaissais pas.','她带我看了一个我原本不熟悉的街区。','que 作 connaissais 的宾语。'),
 e('Nous y avons trouvé un café où nous pouvons discuter.','我们在那里找到了一家可以交谈的咖啡馆。','où 表示交谈地点。'),
 e('Le projet dont nous parlons concerne ce quartier.','我们讨论的项目与这个街区有关。','parler de ce projet。'),
 e('Ces rencontres rendent mon travail plus intéressant.','这些交流让我的工作更加有趣。','最后总结前面的人与地点。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/pror1.html','https://www.laits.utexas.edu/tex/gr/pror3.html'],
 sourceNote:'依据现有 B1 u06 的 dont/où 教学目标及 Tex 主宾关系代词与 de 补语解释重新编写。'
},
{
 id:'fr-subjunctive-b1',type:'grammar',language:'fr',level:'B1',unitLink:'fr-b1-u04',
 title:'虚拟式现在时：义务、愿望、情感与主语关系',
 subtitle:'从 il faut que、vouloir que 进入 subjonctif présent',
 prerequisite:'熟悉直陈式现在时 ils/nous 形式及 que 引导从句；可表达义务和建议。',
 objective:'形成常见的 subjonctif 现在时，区分 il faut + 不定式与 il faut que + 主语 + subjonctif。',
 sections:[
 s('01 先识别需要虚拟式的句型',
 'il faut que、vouloir que、souhaiter que 等可引导与要求、愿望有关的从句，后面常用虚拟式。il faut + 不定式不需要新主语；il faut que 后应有自己的从句主语。虚拟式表达说话人对事件的态度，不可简单定义为“不真实”。',
 'Il faut que tu viennes. / Il faut venir.',[
 e('Il faut que tu travailles régulièrement.','你需要规律学习。','il faut que 后 tu travailles 使用虚拟式（形式与直陈式相同）。'),
 e('Je veux que nous partions tôt.','我希望我们早点出发。','vouloir que 引导 nous partions。'),
 e('Il faut préparer les documents.','必须准备文件。','il faut 直接接不定式，无新的从句主语。')
 ],'Il faut que partir 缺少从句主语和变位动词；应说 Il faut partir 或 Il faut que nous partions。',
 {title:'parler 的虚拟式现在时',columns:['主语','词尾','变位'],rows:[['que je','-e','parle'],['que tu','-es','parles'],['qu’il/elle','-e','parle'],['que nous','-ions','parlions'],['que vous','-iez','parliez'],['qu’ils/elles','-ent','parlent']],note:'规则动词某些形式与直陈式表面一致，不能据此判断没有虚拟式。'}),
 s('02 词干主要来自 ils 的现在时',
 '多数动词使用直陈式现在时 ils 的词干（去掉 -ent），再加 -e、-es、-e、-ions、-iez、-ent。nous/vous 有时需要不同词干，尤其是 venir、prendre 等动词；être、avoir、aller、faire 等高频动词应单独记。',
 'ils parlent → parl- + -ions；ils finissent → finiss- + -ions',[
 e('Je souhaite que vous finissiez ce travail.','我希望您完成这项工作。','finissent 去掉 -ent 得 finiss-，加 -iez。'),
 e('Il faut que nous soyons prêts.','我们必须做好准备。','être 的 nous 虚拟式是 soyons。'),
 e('Je veux qu’elle fasse une pause.','我希望她休息一下。','faire 的虚拟式形式 fasse，不能用 fait。')
 ],'不能由 ils font 推出 qu’elle fonte；faire 的虚拟式常见词形为 fasse、fassions。'),
 s('03 同一主语常用不定式，不要机械重复 que',
 '在 vouloir、souhaiter 等表达意愿的结构中，两个动作由同一主体执行时，通常使用不定式；由不同主语执行时，常用 que + subjonctif。il faut 既可接原形，也可接完整 que 从句，二者的施事表达不同。',
 'Je veux partir. / Je veux que tu partes.',[
 e('Je veux partir à huit heures.','我想八点出发。','同一主体 je，直接接 partir。'),
 e('Je veux que tu partes à huit heures.','我希望你八点出发。','愿望对象是 tu，用 partes。'),
 e('Nous souhaitons que vous soyez disponibles.','我们希望您到时候有空。','不同主语 nous/vous，使用 soyez。')
 ],'Je veux que je parte 在普通表达个人意愿时通常不如 Je veux partir 自然；但不能把“同一主语禁用 que”当成所有动词的绝对定律。'),
 s('04 区分态度和事实的表达',
 '虚拟式的触发往往与必要性、希望、情感或主观评价有关。肯定的 Je pense que 通常接直陈式；Je ne pense pas que 在表达怀疑时经常接虚拟式。只看 que 这个连接词，无法决定动词语气。',
 'Je pense qu’il vient. / Je ne pense pas qu’il vienne.',[
 e('Je pense que cette solution est utile.','我认为这种方案有用。','肯定判断一般用直陈式 est。'),
 e('Je ne pense pas que cette solution soit suffisante.','我不认为这个方案足够。','否定判断表达怀疑，使用 soit。'),
 e('Je suis content que tu sois ici.','你在这里我很高兴。','情感评价引出 sois。')
 ],'不是所有 que 从句都用虚拟式；例如 Je sais qu’il est ici 表述已知事实，采用直陈式。')
 ],
 questions:[
 {question:'填空：Il faut que nous ___ (être) prêts.',answer:'soyons',why:'être 的 nous 虚拟式现在时为 soyons。'},
 {question:'合并：Je veux partir.（两个动作均由 je 执行）',answer:'Je veux partir.',why:'同一主体的愿望一般直接接动词原形，不需新增 que 从句。'},
 {question:'填空：Je veux que tu ___ (venir) demain.',answer:'viennes',why:'venir 的 tu 虚拟式为 viennes。'},
 {question:'哪个更自然：Je pense qu’il soit ici / Je pense qu’il est ici ?',answer:'Je pense qu’il est ici.',why:'肯定的 penser que 通常接直陈式；不能看到 que 就用虚拟式。'}
 ],
 output:'写八句法语谈团队安排：两条义务、一项建议、一个个人愿望、一项对同事的愿望及一处否定判断；至少使用三个不同的虚拟式动词。',
 model:[
 e('Nous préparons une réunion pour vendredi.','我们正在准备星期五的会议。','交代背景。'),
 e('Il faut que nous soyons prêts avant midi.','我们必须在中午前准备好。','义务 + soyons。'),
 e('Je souhaite que chacun comprenne les objectifs.','我希望每个人都理解目标。','愿望 + comprenne。'),
 e('Il faut envoyer l’ordre du jour demain.','必须明天发送议程。','不定式形式的义务。'),
 e('Je veux que tu viennes plus tôt.','我希望你早点来。','不同主语 + viennes。'),
 e('Pour ma part, je préfère terminer le rapport aujourd’hui.','就我而言，我更愿意今天完成报告。','同一主语用不定式。'),
 e('Je ne pense pas que le temps soit suffisant.','我认为时间不够。','否定判断 + soit。'),
 e('Je suis content que l’équipe travaille ensemble.','我很高兴团队共同协作。','情感评价 + 虚拟式 travaille。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tas1.html','https://www.laits.utexas.edu/tex/gr/tas2.html'],
 sourceNote:'B1 u04 subjonctif 入门，Tex 的规则及不规则形成作为知识校核，教学文本原创。'
},
{
 id:'fr-b1-argument-lexicon',type:'vocabulary',language:'fr',level:'B1',unitLink:'fr-b1-u02',
 title:'表达立场与论据：观点、原因、结果和让步',subtitle:'从 je pense que 进入有依据的短讨论',
 prerequisite:'已经掌握 mais、parce que、donc 和基本比较句。',
 objective:'区分事实、意见和建议，使用支持理由和让步语块构造连贯且不过度概括的论述。',
 sections:[
 s('01 立场与确定程度不要混为一谈',
 'À mon avis 明确主观立场；je pense que 提出判断；il me semble que 更显审慎；être convaincu que 则表达较强确信。换词时必须保留说话人的真实确定程度，不能为书面正式感过度强化。',
 'à mon avis / je pense que / il me semble que / être convaincu que',[
 e('À mon avis, ce projet est utile.','在我看来，这个项目有用。','主观观点，而非已经证实的结果。'),
 e('Il me semble que le budget est limité.','我感觉预算可能有限。','il me semble que 表达保留意见。'),
 e('Je suis convaincu que cette solution est préférable.','我确信这一方案更可取。','convaincu 表达更高的主观确信。')
 ],'il me semble que 与 je suis convaincu que 语气强度不一样，不能当作同义替换。',
 {title:'观点词的语用差别',columns:['表达','功能','使用提醒'],rows:[['à mon avis','标明个人立场','不是证据来源'],['je pense que','提出判断','通常接直陈式'],['il me semble que','表达审慎印象','不要硬写成证明'],['je suis convaincu que','表达较强确信','仍需实际理由']],note:'强烈的主观态度不等于证据较强。'}),
 s('02 原因、结果与目的需要不同连接语',
 'parce que 后接具体原因句；donc 表示结果或推论；pour + infinitif 表示做某事的目的。将三者按真实逻辑排序，不要为了凑连接词在一句里反复解释同一关系。',
 'parce que + cause / donc + conséquence / pour + infinitif',[
 e('Je prends le bus parce qu’il coûte moins cher.','我乘公交车，因为费用更低。','parce que 引出原因。'),
 e('Le trajet est long, donc je pars plus tôt.','路程长，所以我早点出发。','donc 引出由条件产生的行动。'),
 e('Je pars tôt pour éviter la circulation.','我早点出发，是为了避开交通拥堵。','pour + infinitif 是目的，而非已经发生的结果。')
 ],'目的不等于结果：pour réussir 描述期望达到的目标，并不代表已经成功。'),
 s('03 让步不是简单换用 mais',
 'cependant、pourtant 可引出限制或与预期相反的信息；même si + indicatif 可以表达“即使”，bien que + subjonctif 是更高级、偏书面的让步形式。B1 阶段先准确使用然而/尽管的含义，不必用高难度连词堆砌。',
 'cependant / pourtant / même si + indicatif',[
 e('Le train est confortable. Cependant, il est cher.','火车舒适，但价格较贵。','cependant 连接优点与代价。'),
 e('Il pleut. Pourtant, nous sortons.','下雨了，但我们还是出门。','pourtant 表示与预期不一致。'),
 e('Même si le trajet est long, je préfère le train.','即使路程较长，我也更喜欢火车。','même si 在此接直陈式 est。')
 ],'不能只因中文都有“尽管”就把 même si 后的直陈式机械替换成 bien que 后的形式。'),
 s('04 从反方理由发展为合理结论',
 '一段完整意见应先明确立场，给出具体支持理由，再承认一种真实的局限，最后提出依条件成立的结论。结论可以“多数情况下更适合”，不必把自己的选择说成放之四海而皆准。',
 'opinion → justification → concession → qualified conclusion',[
 e('Je préfère les cours en petits groupes, car chacun peut poser des questions.','我更喜欢小组授课，因为每个人都有机会提问。','先提出立场，再补充具体原因。'),
 e('Cependant, ils demandent souvent davantage de temps aux enseignants.','不过，小组课通常需要教师投入更多时间。','承认潜在成本。'),
 e('À mon avis, cette méthode convient surtout aux étudiants qui ont besoin de suivi.','我认为这种方法尤其适合需要更多指导的学生。','缩小结论适用范围。')
 ],'承认一条局限之后不应直接重复原立场；结论要回应刚才提出的具体限制。')
 ],
 questions:[
 {question:'选择表示“我觉得可能”的表达：il me semble que / je suis convaincu que。',answer:'il me semble que',why:'前者表示相对审慎的印象，后者是较强确信。'},
 {question:'填空：Je travaille le soir ___ terminer mon projet.',answer:'pour',why:'pour + infinitif 表达目的，不说明成果已经发生。'},
 {question:'选择：Même si le trajet ___ long, je partirai.',answer:'est',why:'même si 引导现实或让步内容时可用直陈式 est。'},
 {question:'把“他很累，可他还是继续工作”写成法语。',answer:'Il est fatigué. Pourtant, il continue à travailler.',why:'pourtant 连接疲劳与继续工作的反预期关系。'}
 ],
 output:'写九句法语比较线上与线下学习：一种立场、两个具体理由、一个反方观点及一项附带条件的结论。',
 model:[
 e('À mon avis, les cours en présentiel restent utiles.','在我看来，线下课程依然有用。','明确立场。'),
 e('Ils facilitent les échanges entre étudiants.','它们方便学生交流。','第一个具体理由。'),
 e('Les enseignants peuvent aussi répondre immédiatement aux questions.','教师也能立即回答问题。','第二个理由。'),
 e('Cependant, les déplacements prennent parfois beaucoup de temps.','不过，通勤有时耗费很多时间。','承认现实局限。'),
 e('Les cours en ligne offrent davantage de souplesse.','线上课程更灵活。','介绍另一方案的优势。'),
 e('Ils ne conviennent pourtant pas à tous les apprenants.','但线上课程并不适合每位学习者。','限定另一方案。'),
 e('Je préfère donc une formule qui combine les deux méthodes.','因此我更倾向于两种方式相结合。','提出中间方案。'),
 e('Cela permettrait de garder des échanges directs tout en réduisant les trajets.','这样既能保留直接交流，也能减少通勤。','说明条件方案的机制。'),
 e('Le meilleur choix dépend enfin des besoins de chacun.','最后，最佳选择仍取决于个人需求。','有条件的结论。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/','https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors'],
 sourceNote:'对应 B1 u02 观点、原因后果学习目标。论证词功能对照并采用原创真实语用段落。'
}
];