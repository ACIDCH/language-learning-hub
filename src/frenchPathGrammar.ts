import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Original bilingual lessons aligned to existing A1/A2 units. Links are fact-check references, not source text. */
export const FRENCH_PATH_GRAMMAR:SpecialtyLesson[]=[
{
 id:'fr-futur-proche-a1',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u11',
 title:'最近将来时 futur proche：安排、计划和否定',
 subtitle:'从现在时 aller 进入“即将做什么”的完整表达',
 prerequisite:'已学习 aller 现在时、常见活动动词的不定式及 ne…pas。',
 objective:'能用 aller + 动词原形说明近期计划，准确放置否定词与时间信息，区别去某地和将做某事。',
 sections:[
 sec('01 aller 的变位决定句子主语',
 'futur proche 由 aller 的直陈式现在时加另一个动词的原形构成。第二个动词不再随主语变位。先核对 je vais、tu vas、il/elle va、nous allons、vous allez、ils/elles vont，随后根据准备进行的动作补入不定式。',
 '主语 + aller（现在时）+ 动词原形',[
 e('Je vais étudier ce soir.','我今晚打算学习。','vais 已按 je 变位，étudier 保持原形。'),
 e('Nous allons visiter le musée samedi.','我们周六打算参观博物馆。','nous 对应 allons，visiter 不变位。'),
 e('Ils vont préparer le dîner.','他们准备做晚饭。','ils 对应 vont，préparer 为动词原形。')
 ],'Je vais étudie 不符合此结构：aller 已经承担人称变位，后面的动作动词必须是不定式。',
 {title:'aller · 现在时',columns:['主语','aller','组合示范'],rows:[['je','vais','je vais partir'],['tu','vas','tu vas partir'],['il / elle / on','va','elle va partir'],['nous','allons','nous allons partir'],['vous','allez','vous allez partir'],['ils / elles','vont','ils vont partir']],note:'不能按规则 -er 词尾推算 aller；这是单独记忆的不规则动词。'}),
 sec('02 表达明确时间与计划次序',
 'futur proche 常表示说话时已经形成的安排、意图或可预见的动作，但不要求事件在下一分钟发生。明天、周末、下周等时间短语可以放句末，也可放句首以组织时间顺序。',
 'demain / ce week-end / la semaine prochaine + aller + infinitif',[
 e('Demain, je vais appeler ma sœur.','明天我准备给姐姐打电话。','句首时间词先交代计划发生的日期。'),
 e('Samedi matin, nous allons faire les courses.','周六早上我们打算采购。','faire les courses 是采购用品的固定搭配。'),
 e('Après le déjeuner, elle va réviser ses notes.','午饭后，她将复习笔记。','après le déjeuner 串联同一天的事件。')
 ],'futur proche 不等于固定“马上就要”；应根据上下文和时间表达理解远近。'),
 sec('03 否定、疑问与两个动词的位置',
 '否定 futur proche 时，ne…pas 围绕变位的 aller，不能围绕后面的不定式。用 est-ce que 提问时，先保留完整的主语 + aller + 不定式序列。表达“打算去某个地方”时，aller 后接地点，而不是自动再补第二个 aller。',
 'ne / n’ + aller + pas + infinitif；Est-ce que + 主语 + aller + infinitif ?',[
 e('Je ne vais pas travailler dimanche.','周日我不打算工作。','pas 紧跟变位的 vais，而不在 travailler 后。'),
 e("Elle ne va pas acheter de pain.",'她不打算买面包。','否定包围 va；这里 de pain 源于否定直接宾语。'),
 e('Est-ce que vous allez venir demain ?','您明天会来吗？','est-ce que 后仍按 vous allez venir 排列。')
 ],'“Je vais au marché”是去市场，“Je vais acheter du pain”是打算买面包；aller + 地点与 aller + 动词原形不可混作同一结构。'),
 sec('04 从短句组成一段周末安排',
 '描述计划时先说时间和主要活动，再补人物、地点与原因。两到四个清楚的句子比连续重复 je vais 更自然；必要时用 puis、ensuite、mais 衔接先后或转折。每句都应具有可辨认的主语与变位动词。',
 'samedi → d’abord → ensuite → mais → dimanche',[
 e('Samedi, je vais prendre le bus pour aller au centre-ville.','周六我准备乘公共汽车去市中心。','prendre le bus 是主要动作，pour aller 说明目的。'),
 e('Ensuite, nous allons déjeuner avec des amis.','然后我们打算和朋友一起吃午饭。','ensuite 表示紧接前一步。'),
 e('Mais dimanche, je ne vais pas sortir.','不过周日我不打算出门。','mais 引出计划变化，否定仍围绕 vais。')
 ],'不能把一段计划写成多个无主语的 infinitif 列表；原形只有依附于变位 aller 才组成最近将来时。')
 ],
 questions:[
 {question:'完成：Nous ___ (aller) visiter le musée demain.',answer:'allons',why:'nous 对应 aller 的现在时 allons，visiter 保持原形。'},
 {question:'纠错：Je vais étudie demain.',answer:'Je vais étudier demain.',why:'第二个动词应采用不定式 étudier，不能再次变位。'},
 {question:'否定：Elle va sortir ce soir.',answer:'Elle ne va pas sortir ce soir.',why:'ne…pas 围绕变位动词 va，原形 sortir 在后。'},
 {question:'把“您下周会来吗”改成 est-ce que 问句。',answer:'Est-ce que vous allez venir la semaine prochaine ?',why:'先使用 Est-ce que，再接 vous allez venir 和时间状语。'}
 ],
 output:'写六句法语介绍周末计划：包含两种时间表达、三种不同动作、一次否定、一句疑问和至少一个先后连接词。',
 model:[
 e('Samedi matin, je vais aller au marché.','周六早晨我准备去市场。','表达活动与时间。'),
 e('Je vais acheter des légumes et du pain.','我打算买蔬菜和面包。','并列采购对象。'),
 e('Ensuite, nous allons préparer le déjeuner.','然后我们准备午饭。','ensuite 连贯安排。'),
 e('Dimanche, je ne vais pas travailler.','周日我不打算工作。','否定包围 aller。'),
 e('Est-ce que tu vas venir avec nous ?','你准备和我们一起来吗？','是非疑问句。')
 ],
 referenceUrls:['https://laits.utexas.edu/tex/gr/taf1.html','https://www.gymglish.com/en/frantastique/french-lesson'],
 sourceNote:'对应既有 fr-a1-u11 的最近将来时及周末活动目标；对照 Tex futur proche 规则，所有中法例句重新编写。'
},
{
 id:'fr-imparfait-a2',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u02',
 title:'未完成过去时 imparfait：背景、习惯与事件对比',
 subtitle:'从过去的日常状态过渡到完整叙事',
 prerequisite:'已掌握现在时 nous 变位、passé composé 的助动词和过去分词结构。',
 objective:'能从 nous 现在时提取词干形成 imparfait；在叙述中区分背景或重复动作与一次完成事件。',
 sections:[
 sec('01 由 nous 的现在时得到词干',
 '常见 imparfait 构词方式是取直陈式现在时 nous 的词干（去掉 -ons），再加 -ais、-ais、-ait、-ions、-iez、-aient。parler：nous parlons → parl-；finir：nous finissons → finiss-。être 是重要例外，词干为 ét-。',
 'nous parlons → parl- → je parlais / nous parlions',[
 e('Quand j’étais enfant, je parlais souvent avec ma grand-mère.','小时候，我经常和奶奶聊天。','étais 表示过去状态，parlais 表示过去习惯。'),
 e('Nous finissions toujours les devoirs avant le dîner.','我们过去总在晚饭前完成作业。','finir 的词干为 finiss-，nous imparfait 为 finissions。'),
 e('Ils habitaient près de la gare.','他们以前住在车站附近。','habitaient 表示过去延续的居住状态。')
 ],'être 不能照 nous sommes 推出 somm-：正确形式是 j’étais、nous étions。',
 {title:'parler · 未完成过去时',columns:['主语','词尾','parler 变位'],rows:[['je','-ais','parlais'],['tu','-ais','parlais'],['il / elle','-ait','parlait'],['nous','-ions','parlions'],['vous','-iez','parliez'],['ils / elles','-aient','parlaient']],note:'请和过去分词 parlé 区分：je parlais 是一个变位动词；j’ai parlé 是由助动词和过去分词组成的复合过去时。'}),
 sec('02 过去的重复动作和长期状态',
 'imparfait 常交代过去的习惯、背景环境、年龄、天气、感受和进行中的情况。tous les étés、souvent、à cette époque 等时间短语可帮助判断，但选择时态仍取决于要表达的视角，不能只凭某个时间副词机械决定。',
 'à cette époque / tous les jours / souvent + imparfait',[
 e('À cette époque, j’habitais à Lyon.','那时候我住在里昂。','habitais 交代较长期的过去状态。'),
 e('En hiver, il faisait souvent froid.','过去冬天常常很冷。','faisait 描述天气背景。'),
 e('Nous allions à la piscine chaque mercredi.','我们以前每周三都去游泳池。','allions 是反复发生的旧习惯。')
 ],'“hier”不意味着只能用 passé composé；昨天某个动作发生时的天气背景仍可用 imparfait。'),
 sec('03 passé composé 与 imparfait 分工',
 '叙事时 imparfait 可以设置正在发生的背景，passé composé 推动某个边界清楚的事件。两种时态并非“长动作/短动作”的简单换算；持续很久的动作也可能作为完整事件用 passé composé 呈现。',
 '背景（imparfait） + 发生事件（passé composé）',[
 e('Je lisais quand le téléphone a sonné.','电话响时，我正在看书。','lisais 构成背景，a sonné 是推进故事的新事件。'),
 e('Il pleuvait quand nous sommes sortis.','我们出门时正下着雨。','pleuvait 是天气背景，sommes sortis 是发生的事件。'),
 e('Hier, j’ai étudié pendant trois heures.','昨天我连续学习了三个小时。','尽管历时三小时，动作整体完成，因此可以用 passé composé。')
 ],'不能仅依时间长度选择过去时：Je lisais 和 J’ai lu 的差别在叙述视角与时间边界。'),
 sec('04 串联背景、转折与结果',
 '完整小故事先用 imparfait 交代地点、习惯或天气，再用 passé composé 引出主要事件，最后描述结果。对于已经完成的个别事件优先检查复合过去时及助动词是否正确，避免将所有动词统一改成 imparfait。',
 'au début（背景） → soudain（事件） → ensuite（结果）',[
 e('Il faisait beau et nous marchions dans le parc.','天气很好，我们正走在公园里。','天气和行走是故事起点的背景。'),
 e('Soudain, nous avons rencontré une amie.','突然，我们遇见了一位朋友。','avons rencontré 是明确的新事件。'),
 e('Ensuite, nous avons pris un café ensemble.','之后，我们一起喝了咖啡。','第二个完成事件推进叙事。')
 ],'soudain 常提示一个突发事件，但不是语法硬性规则；仍要核实说话者表达的是背景还是发生事件。')
 ],
 questions:[
 {question:'完成：nous parlons → je ___（imparfait）',answer:'parlais',why:'去掉 nous parlons 的 -ons 得到 parl-，je 加 -ais。'},
 {question:'填空：À cette époque, nous ___ (être) étudiants.',answer:'étions',why:'être 的未完成过去时词干是 ét-，nous 对应 -ions。'},
 {question:'填空：Je ___ (lire) quand elle ___ (arriver).',answer:'lisais ; est arrivée',why:'lisais 是进行中的背景；arriver 是完成事件且此处用 être，主语 elle 对应 arrivée。'},
 {question:'分析：Hier, j’ai travaillé pendant quatre heures. 为什么可用 passé composé？',answer:'说话者将四小时的工作视为一次已完成的整体事件。',why:'时态选择取决于叙事视角，不是把超过某个时长的动作强行写成 imparfait。'}
 ],
 output:'写一篇 7–9 句法语短故事：至少两句交代过去环境或习惯、两句描述发生事件，并用 quand、soudain、ensuite 组织事件时间线。',
 model:[
 e('Quand j’étais enfant, j’habitais près de la mer.','小时候我住在海边。','交代持续的过去状态。'),
 e('Chaque été, nous allions souvent à la plage.','每年夏天我们经常去海滩。','说明重复习惯。'),
 e('Un jour, il faisait très chaud.','有一天，天气很热。','天气背景。'),
 e('Soudain, nous avons vu un dauphin.','突然，我们看见了一只海豚。','一次明确的发生事件。'),
 e('Ensuite, nous avons raconté cette histoire à nos amis.','之后，我们把这件事讲给了朋友。','用完成动作收尾。')
 ],
 referenceUrls:['https://grammarmama.com/fr/learn/french/a2/','https://www.laits.utexas.edu/tex/gr/'],
 sourceNote:'对应 fr-a2-u02“Habitudes d’autrefois”；参照 A2 时态目录与 Tex 法语语法的过去时体系，例句和练习原创。'
},
{
 id:'fr-object-pronouns-a2',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u04',
 title:'直接与间接宾语代词：le/la/les 与 lui/leur',
 subtitle:'把重复名词替换为代词，同时保留动词所需的介词关系',
 prerequisite:'能辨认主语和动词；已学习 à + 人和常见及物动词，掌握简单否定句。',
 objective:'能判断直接宾语与 à + 人的间接宾语，使用 le/la/les、lui/leur，并在否定句和双动词句中正确安排位置。',
 sections:[
 sec('01 先看动词后有没有介词',
 '直接宾语回答“看见谁/什么、认识谁/什么”，动词与宾语之间一般没有介词；间接宾语可以是动词后 à + 人，常见动词有 parler à、téléphoner à、écrire à。先分析动词结构，不能根据中文“给”或“对”孤立判断。',
 'regarder quelqu’un → le / la；parler à quelqu’un → lui',[
 e('Je connais Sophie. → Je la connais.','我认识索菲。→ 我认识她。','connaître 后直接接人，用 la 替换。'),
 e('Je parle à Sophie. → Je lui parle.','我和索菲说话。→ 我和她说话。','parler à + 人，用间接宾语代词 lui。'),
 e('Tu regardes les photos ? → Tu les regardes ?','你在看这些照片吗？→ 你在看它们吗？','photos 是复数直接宾语，替换为 les。')
 ],'Je parle Sophie 和 Je la parle 都不适用于表达“和索菲说话”；parler à Sophie 应为 Je lui parle。',
 {title:'最常用第三人称对照',columns:['动词结构','单数','复数'],rows:[['直接宾语（无 à）','le / la','les'],['间接宾语（à + 人）','lui','leur']],note:'lui 既可指“给他”也可指“给她”；leur 表示“给他们/她们”，不按性别变化。'}),
 sec('02 代词通常位于变位动词前',
 '在一般肯定句中，宾语代词放在已经变位的动词前；le / la 遇元音或哑音 h 常省音为 l’。改写前确定名词的单复数以及语法性别，否则即使语序对了仍可能指错对象。',
 '主语 + 代词 + 变位动词',[
 e('Le livre ? Je le lis maintenant.','那本书？我现在读它。','livre 阳性单数，用 le。'),
 e('La lettre ? Je la lis ce soir.','那封信？我今晚读它。','lettre 阴性单数，用 la。'),
 e("Ce film ? Je l'aime beaucoup.",'那部电影？我很喜欢。','aime 以元音开头，le 省音为 l’。'),
 e('J’écris à mes parents. → Je leur écris.','我给父母写信。→ 我给他们写信。','à mes parents 是复数间接宾语，用 leur。')
 ],'不能把宾语代词沿用英语顺序写为 Je connais la（意为“我认识她”）；正确为 Je la connais。'),
 sec('03 否定句与 aller + 不定式',
 '单一变位动词的否定句由 ne…pas 包围代词与动词组成的整体；有 aller、vouloir、pouvoir 等加不定式时，若代词是第二个动词的宾语，通常放在不定式前，而不是放在 aller 前。',
 'Je ne le connais pas. / Je vais le voir.',[
 e('Je ne la connais pas.','我不认识她。','ne 位于代词 la 前，pas 在 connais 后。'),
 e('Je vais le revoir demain.','我明天准备再次见到他。','le 是 revoir 的宾语，置于不定式前。'),
 e('Nous voulons lui écrire ce soir.','我们今晚想给他/她写信。','lui 是 écrire à 的间接宾语，紧邻 écrire 前。')
 ],'Je le vais voir 错把宾语代词放在 aller 前；在 Je vais le voir 中，le 修饰 voir 而非 vais。'),
 sec('04 从重复名词到自然对话',
 '实际对话应先明确被谈论的人或物，再用代词承接。第一次提到名词时不要让听者猜测 le 指谁；当话题切换为另一个人物时，重复名词可能比连续使用代词更清楚。',
 '提到对象 → 用代词回应 → 补充时间或原因',[
 e('Tu connais la nouvelle professeure ?','你认识那位新老师吗？','问题明确引入对象 professeure。'),
 e('Oui, je la connais et je lui écris parfois.','认识，我有时还会给她写信。','la 是 connaître 的直接宾语，lui 是 écrire à 的间接宾语。'),
 e('Je vais lui envoyer un message demain.','我明天准备给她发一条消息。','lui 紧贴 envoyer，不在 aller 前。')
 ],'同一个人物在不同动词后可以分别用 la 和 lui：关键是动词的配价结构，不是人物性别发生变化。')
 ],
 questions:[
 {question:'改写：Je connais Marie. → Je ___ connais.',answer:'la',why:'connaître 后无介词，Marie 是阴性单数直接宾语，选 la。'},
 {question:'改写：Je parle à Marie. → Je ___ parle.',answer:'lui',why:'parler à + 人属于间接宾语结构，使用 lui，不是 la。'},
 {question:'纠错：Je le vais voir demain.',answer:'Je vais le voir demain.',why:'代词是 voir 的宾语，在 aller + 不定式结构中放在 voir 前。'},
 {question:'改写否定：Je connais ces étudiants.',answer:'Je ne les connais pas.',why:'ces étudiants 为复数直接宾语 les；ne 放在代词前，pas 位于变位动词后。'}
 ],
 output:'写 6–8 句法语人物联系场景：先用名词介绍两个人，随后至少使用三次 le/la/les，一次 lui/leur，一句否定及一条最近将来时。',
 model:[
 e('Tu connais Marc et Sophie ?','你认识马克和索菲吗？','开篇明确两个人。'),
 e('Oui, je les connais.','认识，我认识他们。','les 替换复数直接宾语。'),
 e('Je parle souvent à Sophie et je lui écris chaque semaine.','我经常和索菲说话，每周给她写信。','parler à / écrire à 都保留间接宾语结构。'),
 e('Je ne vois pas Marc aujourd’hui.','我今天见不到马克。','否定句表达今天的情况。'),
 e('Mais je vais le voir demain.','不过我明天打算见他。','代词 le 紧靠不定式 voir。')
 ],
 referenceUrls:['https://grammarmama.com/learn/french/a2/direct-object-pronouns/','https://laits.utexas.edu/tex/gr/pro8.html','https://laits.utexas.edu/tex/gr/pro9.html'],
 sourceNote:'对应 fr-a2-u04“Relations et messages”，从动词补语关系进入代词位置，再过渡到实际联系人对话，案例重新撰写。'
}
];