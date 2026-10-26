import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Original chapters mapped to the actual V4.4 manuscript IDs. */
export const HOME_PLANS_READING_HEADINGS:SpecialtyLesson[]=[
{
 id:'fr-a1-shared-home-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u10',
 title:'合租住房：房间、日常频率与共同规则',subtitle:'用准确的冠词、物主词和动词搭配介绍居所',
 prerequisite:'已经认识单复数、le/la/les、être/avoir 与基本 -er 现在时。',
 objective:'说清客厅朝向、厨房共用、餐后整理、钥匙位置与周末分工，并正确选择 mon/ma/mes、notre、souvent、chacun。',
 sections:[
 sec('01 房间和家具：名词性别决定限定词',
 'le salon 是阳性名词，所以说 mon salon；la cuisine 是阴性名词，所以说 ma cuisine；复数钥匙要说 mes clés。物主限定词由后面的被修饰名词决定，不是按照房主的性别选择。',
 'mon salon / ma cuisine / mes clés / notre appartement',[
 e('Notre salon donne sur un jardin.','我们的客厅朝向一座花园。','donner sur 表房间窗户面向何处。'),
 e('Ma cuisine est petite, mais pratique.','我的厨房不大，但很实用。','cuisine 阴性，使用 ma 与 petite。'),
 e('Mes clés sont près de la porte.','我的钥匙在门附近。','clés 复数，使用 mes；près de 表位置。')
 ],'不能因为说话者是女性就写 ma salon；必须先判断 salon 的语法性别。',
 {title:'房间与限定词',columns:['名词','正确搭配','辨析'],rows:[['le salon','mon salon','阳性单数'],['la cuisine','ma cuisine','阴性单数'],['les clés','mes clés','复数'],['l’appartement','notre appartement','共同住所']],note:'元音开头的阴性单数名词在某些物主形式中也使用 mon，例如 mon amie；本节先掌握实际房间搭配。'}),
 sec('02 共用与房屋位置：partager、près de、donner sur',
 'partager + 名词表示共用空间或物品；donner sur + 地点说明房间、窗户朝向；près de 表靠近，后面要接参照物。如果说钥匙在门附近，不表示就在门上，sur la porte 才是“在门表面”。',
 'partager un appartement / donner sur un jardin / près de la porte',[
 e('Nous partageons un petit appartement.','我们合租一套小公寓。','partager 直接接宾语，不加 de。'),
 e('Le salon donne sur le jardin.','客厅朝着花园。','donner sur 描述方向或视野。'),
 e('La clé est près de la porte.','钥匙在门附近。','près de 的参照点是门。')
 ],'près de la porte 和 sur la porte 含义不同；不能把“靠近门”直接写成“在门上”。'),
 sec('03 频率与家庭事务：toujours、souvent、parfois',
 'souvent 表经常，parfois 表有时，toujours 依语境可表示总是或仍然。频率词修饰习惯，不构成一次性事件的准确日期。on 在口语中常指我们，但动词保持第三人称单数。',
 'on prépare souvent / chacun range / faire les courses',[
 e('Dans la cuisine, on prépare souvent le dîner ensemble.','我们经常在厨房一起做晚饭。','on 用第三人称单数 prépare。'),
 e('Après le repas, chacun range son assiette.','饭后每个人都收好自己的盘子。','chacun 单数，range 与 son 相配。'),
 e('Le dimanche, je fais les courses.','星期天我去采购日用品。','faire les courses 表采购，不是上课。')
 ],'不能写 on préparons；on 即使表示“我们”，变位仍采用第三人称单数。'),
 sec('04 分工、关系和完整的房屋介绍',
 'une colocataire 是女室友，un colocataire 是男室友；chacun 强调每一个人，ensemble 强调共同完成；après le repas 给出行动时间，le dimanche 表习惯性的星期日。一次口头介绍应按照居所→空间→规则→个人日常的顺序展开。',
 'ma colocataire / ensemble / chacun / le dimanche',[
 e('Ma colocataire travaille le dimanche.','我的女室友星期天工作。','colocataire 的冠词与修饰词标示称呼对象。'),
 e('Nous faisons la cuisine ensemble.','我们一起做饭。','ensemble 指共同完成。'),
 e('Chacun range son assiette après le repas.','饭后每个人都把自己的盘子收好。','chacun 强调各自承担职责。')
 ],'“我们一起做饭”不等于“每次所有人都做饭”；频率与职责的范围需要保持。')
 ],
 questions:[
 {question:'改错：ma salon donne sur un jardin。',answer:'Mon salon donne sur un jardin.',why:'salon 是阳性单数名词，使用 mon，不取决于说话人的性别。'},
 {question:'“我家的钥匙在门附近”中正确位置词组是什么？',answer:'Mes clés sont près de la porte.',why:'près de 表靠近，sur la porte 才表示在门的表面。'},
 {question:'改错：On préparons souvent le dîner。',answer:'On prépare souvent le dîner.',why:'on 虽可代表“我们”，但动词仍用第三人称单数 prépare。'},
 {question:'谁在饭后收拾盘子？“chacun range son assiette”表示什么？',answer:'Chaque personne range sa propre assiette.',why:'chacun 指每个人，并非某一位室友单独替大家收拾。'}
 ],
 output:'按“住处、房间、共用习惯、餐后分工、钥匙位置、星期天安排”写八句法语介绍合租生活，逐句给出自然中文译文。',
 model:[
 e('Nous partageons un petit appartement.','我们合租一套小公寓。','从住处开始。'),
 e('Notre salon donne sur un jardin.','客厅面朝花园。','交代空间。'),
 e('Ma cuisine est petite, mais agréable.','我的厨房不大，却很舒适。','名词性数一致。'),
 e('On prépare souvent le dîner ensemble.','我们经常一起做晚饭。','on 的第三人称变位。'),
 e('Après le repas, chacun range son assiette.','饭后大家各自收盘子。','明确职责。'),
 e('Mes clés sont près de la porte.','我的钥匙在门旁边。','准确方位。'),
 e('Le dimanche, ma colocataire travaille.','星期天我的室友上班。','说明另一人安排。'),
 e('Moi, je fais les courses pour la semaine.','我则为这一周采购物品。','收束分工。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/det6.html','https://www.laits.utexas.edu/tex/gr/pre1a.html'],
 sourceNote:'围绕 fr-a1-u10 原始合租场景中 le salon、la cuisine、mes clés、le dimanche 逐点扩展，所用句子均为项目原创。'
},
{
 id:'fr-a1-near-future-planning-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u11',
 title:'近期计划：约定时间、邀请、天气和备用准备',subtitle:'区别目的地、集合地点、购买动作与未来的不确定性',
 prerequisite:'掌握 aller 现在时变位和动词原形，能够理解 demain、ce soir、à neuf heures。',
 objective:'将 aller + infinitif 与 acheter、préparer、retrouver、visiter、venir 等实际语块结合，说清何时集合、在哪里参观、天气可能发生什么以及如何应对。',
 sections:[
 sec('01 计划语块：aller + 原形，动作不能双重变位',
 '近期将来时是 aller 现在时 + 不定式；je vais acheter、nous allons visiter 里只有 aller 变位。demain、ce soir、après la visite 等短语确定动作的时间与顺序。带否定时 ne…pas 围绕 aller，而不是随意移到动词原形前。',
 'je vais acheter / nous allons visiter / nous n’allons pas rester',[
 e('Demain, nous allons visiter le musée.','明天我们打算参观博物馆。','visiter 保持原形。'),
 e('Je vais acheter les billets ce soir.','我打算今晚购买门票。','acheter 的未来动作与 ce soir 对应。'),
 e('Nous n’allons pas rester à la maison.','我们不打算待在家里。','n’…pas 围绕 allons。')
 ],'je vais visite 与 nous allons préparons 错在第二动词被额外变位。',{title:'计划表达的结构',columns:['主语','aller 形式','动作原形'],rows:[['je','vais','acheter'],['tu','vas','venir'],['nous','allons','visiter'],['ils','vont','préparer']],note:'不定式也可包含自反代词，例如 nous allons nous retrouver；不把第二个动词变成 retrouvons。'}),
 sec('02 地点：visiter 与 se retrouver 的不同对象',
 'visiter + 一个场所表示参观；se retrouver devant + 场所表示在外部位置碰面；aller dans/au + 场所表示移动目的地。课程里博物馆是参观地点，车站前才是集合地点。',
 'visiter le musée / se retrouver devant la gare / manger dans le parc',[
 e('Nous allons visiter le musée de la ville.','我们打算参观城市博物馆。','参观目的地为 musée。'),
 e('Nous allons nous retrouver devant la gare.','我们打算在车站前碰头。','devant la gare 是集合地点。'),
 e('Après la visite, nous allons manger dans le parc.','参观之后，我们打算在公园吃东西。','dans le parc 是活动发生的位置。')
 ],'原文说集合地点在 gare 前，不能在摘要中把它替换成博物馆门口。'),
 sec('03 邀请和时间安排要成对出现',
 'Tu veux venir avec nous ? 是自然的邀请；un rendez-vous 是约定的会面，à neuf heures 给出具体时刻。邀请对象可能拒绝，所以“邀请”不自动等于“对方已经同意”。',
 'Tu veux venir avec nous ? / se retrouver à neuf heures / préparer un pique-nique',[
 e('Tu veux venir avec nous demain ?','你明天想跟我们一起去吗？','直接但自然的口头邀请。'),
 e('Nous allons nous retrouver à neuf heures.','我们打算九点集合。','à + 时刻。'),
 e('Ma sœur va préparer un petit pique-nique.','我姐姐打算准备一份简餐。','préparer 后接具体活动或物品。')
 ],'发出邀请只是提出参与机会，不能写成对方确认到场，除非后文明确回答。'),
 sec('04 天气可能性与备用物品',
 'peut-être 表“可能”，il va pleuvoir 表将会下雨；两者连用 il va peut-être pleuvoir，仍然不是天气预报已经证实必下雨。prendre un parapluie 是针对天气可能变化的预防准备。',
 'il va peut-être pleuvoir / prendre un parapluie / alors',[
 e('Il va peut-être pleuvoir demain.','明天可能会下雨。','peut-être 保留不确定性。'),
 e('Alors, je vais prendre un parapluie.','因此我会带把雨伞。','aller + infinitif 表计划。'),
 e('S’il pleut, nous pourrons changer de programme.','如果下雨，我们可以调整计划。','条件句表达可能的后续应对，不表示已改计划。')
 ],'peut-être 不可省略后再声称天气确定；“准备雨伞”也不证明雨已经下了。')
 ],
 questions:[
 {question:'改错：Nous allons préparons un pique-nique。',answer:'Nous allons préparer un pique-nique.',why:'aller 已经变位，第二动词必须保留不定式 préparer。'},
 {question:'在原课里 rendez-vous 位于哪里？',answer:'Devant la gare, à neuf heures.',why:'九点在车站前集合，博物馆是之后参观的场所。'},
 {question:'“明天可能下雨”必须保留哪个语义词？',answer:'Il va peut-être pleuvoir.',why:'peut-être 保留可能性，不能改写为已确定会下雨。'},
 {question:'Tu veux venir avec nous ? 是否意味着已接受邀请？',answer:'Non. Il s’agit d’une invitation, pas encore d’une acceptation.',why:'询问加入意愿不等于对方已经承诺到场。'}
 ],
 output:'用八句法语写明天的行程：今晚买票、明天参观博物馆、九点车站前集合、姐姐备野餐、参观后公园用餐、可能下雨和带伞、邀请朋友。',
 model:[
 e('Ce soir, je vais acheter les billets du musée.','今晚我打算买博物馆门票。','购买时间。'),
 e('Demain, nous allons visiter le musée de la ville.','明天我们打算参观城市博物馆。','出行目标。'),
 e('Nous allons nous retrouver devant la gare à neuf heures.','我们打算九点在车站前碰头。','地点和时刻。'),
 e('Ma sœur va préparer un petit pique-nique.','我姐姐准备一份简单的野餐餐食。','人物与活动。'),
 e('Après la visite, nous allons manger dans le parc.','参观完我们打算在公园吃东西。','活动顺序。'),
 e('Il va peut-être pleuvoir.','可能会下雨。','预测保留不确定性。'),
 e('Je vais donc prendre un parapluie.','因此我准备带雨伞。','合理准备。'),
 e('Tu veux venir avec nous ?','你想和我们一起去吗？','结尾自然邀请。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/taf1.html','https://www.laits.utexas.edu/tex/gr/pre1a.html'],
 sourceNote:'以 fr-a1-u11 原教材的 musée、billets、devant la gare、neuf heures、pique-nique 和 parapluie 作为事实边界。'
},
{
 id:'en-ielts-heading-paragraph-function-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u03',
 title:'IELTS Reading｜Matching Headings：段落功能与词汇衔接',
 subtitle:'用整段论述作用选择标题，而不被高频名词误导',
 prerequisite:'读过定语从句、however/yet/therefore 等逻辑词，能用一句话总结段落。',
 objective:'从种子库原稿出发，区分介绍背景、说明限制、提出必要补充和比较方案的段落功能；根据主题句与支撑句选择覆盖整段的标题。',
 sections:[
 sec('01 topic、function 和 heading 是三件事',
 'topic 表一段谈的对象；function 表作者用这段完成什么论证任务；heading 需要总结段落的主旨及功能。一段反复出现 seed banks 可能是在批判单一方案的限制，而不是“介绍所有种子库的历史”。',
 'topic: seed banks / function: qualify a claim / heading: limits of one method',[
 e('The paragraph discusses seed banks.','这一段的主题是种子库。','只确认主题，还没说明用途。'),
 e('It examines the limits of storing seeds alone.','该段分析仅储存种子这一方式的局限。','点明功能，比单纯主题更精确。'),
 e('The heading should cover the whole paragraph.','标题应覆盖整段内容。','不能只反映某个具体例子。')
 ],'标题含 seed 或 archives 并不意味着正确；匹配时必须检查它是否准确代表整段的论证动作。',
 {title:'概念的功能区别',columns:['术语','回答的问题','例子'],rows:[['topic','这段谈什么？','seed conservation'],['function','作者在干什么？','identify practical limits'],['evidence','用什么支持？','drying and periodic testing'],['heading','如何概括主旨？','Why one method is insufficient']],note:'题型中的标题与正文往往用不同词表达同一段落意思，关键词完全相同反而可能只是局部对应。'}),
 sec('02 discourse markers 显示作者转向',
 'yet、however、nevertheless 表转折；therefore 表前文支持的总结，但不是自动保证推理正确。原始短文先提安全档案印象，再用 Yet 指出不能无限期保存，最后用 therefore 明确该段功能是讨论单一方案的限制。',
 'often described as… yet… / these limits… therefore…',[
 e('Seed banks are often described as secure archives.','种子库常被描述为安全的储备档案。','先引出常见印象，不是作者最后观点。'),
 e('Yet storing seeds does not preserve every crop indefinitely.','然而储存种子并不能无限期保存每种作物。','yet 引出核心限制。'),
 e('The paragraph therefore examines the limits of one method.','因此该段讨论一种方法的局限。','therefore 总结段落功能。')
 ],'若标题只写“安全保存所有作物”，就与 Yet 后面明确的限制相冲突。'),
 sec('03 exemplification 不等于整段主旨',
 'germinate 是萌发，drying 是干燥处理，periodic testing 是定期检测，replenish a collection 是补充收藏。这些是支撑限制的具体事实，不能因为某一个例子很详细就用它替代整段主旨。',
 'germination / tolerate drying / periodic testing / replenish',[
 e('Some species tolerate drying poorly.','有些物种不耐受干燥处理。','这是储存方法限制的一个例子。'),
 e('Suitable seeds still require periodic testing.','即使适宜保存的种子仍需定期检测。','检测要求进一步支撑限制。'),
 e('Staff may need to grow plants to replenish collections.','工作人员可能需要种植新植株来补充收藏。','说明管理成本而非“种子库毫无用途”。')
 ],'种子无法干燥保存与种子库完全无效并不等价；例子的限制不能扩大为对整种保护方式的否定。'),
 sec('04 对照标题、涵盖范围并排除干扰项',
 '候选标题可以因内容过窄、范围过大或与原文冲突被排除。过窄如 Periodic testing 只覆盖一条证据；过大如 A permanent solution for all crops 被原文否定。恰当标题概括作者的中心动作，例如 The limits of a single conservation method。',
 'too narrow / contradicted / whole-paragraph function',[
 e('Periodic testing of stored seeds','储存种子的定期检测','仅覆盖一条例子，太窄。'),
 e('A permanent solution for every crop','适用于所有作物的永久方案','与原文明确限制相反。'),
 e('Why a single conservation method is insufficient','为何单一保护方法不足以覆盖所有情况','能够概括限制和补充方案。')
 ],'不要用常识为标题补上文章没有论证的主张，必须依靠文本中每个支撑句共同指向的功能。')
 ],
 questions:[
 {question:'What is the topic and main function of the original seed-bank paragraph?',answer:'Topic: seed banks; function: explaining the limits of a single conservation method.',why:'seed banks 是对象，但整段通过转折、具体限制和替代方案指出单一方法不足。'},
 {question:'Why is Periodic testing of stored seeds too narrow a heading?',answer:'It covers only one example, not the drying limits, replenishment or alternatives.',why:'一个例子不能代替整段概括；还需覆盖局限及补充措施。'},
 {question:'Which marker in the original paragraph introduces a limitation?',answer:'Yet.',why:'Yet 将“安全档案”的常见说法转向种子无法永久保存的限制。'},
 {question:'Does the text say seed banks are useless?',answer:'No. It explicitly says that these limits do not make seed banks useless.',why:'原文承认局限但同时保留这一方式的价值，否定绝对化判断。'}
 ],
 output:'用八句英语说明原课种子库段落：区别 topic、function、具体例子和合适标题；解释另外两个备选标题为何过窄或与原文冲突，附逐句中文对照。',
 model:[
 e('The topic of the original paragraph is seed banking.','原段落的主题是种子库。','先找对象。'),
 e('It begins with a common claim about secure storage.','它以安全保存的常见说法开头。','认出引入的印象。'),
 e('However, not all seeds tolerate drying.','但不是所有种子都耐受干燥。','第一条限制。'),
 e('Other collections require repeated testing and replenishment.','其他收藏仍需反复检测和补充。','更多证据。'),
 e('These requirements create demands for labour and space.','这些要求增加人员和场地需求。','限制背后的资源成本。'),
 e('The paragraph does not describe seed banks as useless.','原文并没有说种子库毫无价值。','防止错误推断。'),
 e('It argues that additional strategies may be necessary.','它说明可能仍需其他保护策略。','补充方案。'),
 e('A suitable heading summarises the limits of one method.','适当的标题概括单一方法的局限。','符合整段功能。')
 ],
 referenceUrls:['https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading'],
 sourceNote:'直接沿 en-ielts-reading-u03 原有 seed banks 七句阅读和两个备选标题扩写。不是 IELTS 正式试卷或真实种子保存研究结果。'
}
];