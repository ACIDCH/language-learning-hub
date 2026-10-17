import type {FoundationUnit} from './foundationTypes';
export const frenchFoundation:FoundationUnit[]=[
{
id:'fr-fnd-01',language:'fr',level:'Pre-A1',phase:0,title:'26 个字母、重音符号与拼写',
goal:'认识法语字母名称、重音符号及拼写方式，不把书写符号误当成独立字母。',
concepts:['现代法语字母表使用 26 个基本拉丁字母；é、è、ê、ç 等是附加符号或带符号字母形式，不是额外的基本字母。','é 的重音符号叫 accent aigu，è 常带 accent grave；ç 下方的是 cédille。','法语拼写时字母名称与单词实际发音是不同层次。'],
examples:['Bonjour ! Je m’appelle Léa.','Comment ça s’écrit ?','Mon prénom est Émilie.'],
vocab:[['lettre','字母'],['prénom','名字'],['écrire','写、拼写'],['bonjour','你好']],
listening:'Bonjour, je m’appelle Léa. Mon prénom s’écrit L-É-A.',
reading:'Léa écrit son prénom sur une carte. Son ami demande : « Comment ça s’écrit ? » Elle répond : « L-É-A. »',
questions:[{prompt:'法语基本字母表通常有多少个字母？',choices:['26','30','36'],answer:0,explanation:'法语的基本字母表有 26 个字母；附加重音符号不另算基本字母。'},{prompt:'Quel mot contient une cédille ?',choices:['café','français','père'],answer:1,explanation:'français 中的 ç 带有 cédille。'}],
production:'写出自己的名字，再尝试说出字母及可能的重音符号。',pronunciation:'请听字母名称与实际单词发音的差异，避免直接套用英语拼字读法。',commonMistake:'误认为 é 是法语第 27 个基本字母。'
},
{
id:'fr-fnd-02',language:'fr',level:'Pre-A1',phase:0,title:'法语口腔元音与拼写',
goal:'初步听辨 /i/、/u/、/y/，理解法语元音与拼写的关系。',
concepts:['法语常见 /i/ 如 si，/u/ 如 vous，/y/ 如 tu；/y/ 可理解为保持 /i/ 舌位并圆唇。','ou 通常读 /u/，单个 u 在标准发音中常为 /y/；具体音节与地区口音要结合词看。','法语元音训练不能只依靠浏览器转写文字判定音素准确。'],
examples:['Tu vas bien ?','Oui, vous aussi.','Il lit un livre.'],
vocab:[['tu','你（熟悉）'],['vous','您／你们'],['lire','读'],['oui','是的']],
listening:'Tu lis un livre ? Oui, je lis un livre.',
reading:'Luc lit un livre. Il dit bonjour à Julie. Julie demande : « Tu lis quoi ? » Luc répond : « Un livre de français. »',
questions:[{prompt:'标准法语中 vous 的 ou 常对应哪个音？',choices:['/y/','/u/','/i/'],answer:1,explanation:'vous 的 ou 通常发 /u/。'},{prompt:'tu 的 u 在常见标准发音中通常是？',choices:['/y/','/u/','/a/'],answer:0,explanation:'tu 通常发 /ty/；它与英语 two 并非同一元音。'}],
production:'练读 tu/vous 与 si/sous，写一句同时含 tu 和 vous 的短句并解释适用场景。',pronunciation:'练 /y/ 时先发 /i/、再保持舌位收圆双唇；法语元音听感受说话人影响。',commonMistake:'直接把法语 u 读成英语 /uː/。'
},
{
id:'fr-fnd-03',language:'fr',level:'Pre-A1',phase:0,title:'鼻化元音 /ɑ̃/、/ɔ̃/、/ɛ̃/',
goal:'认识三个重要法语鼻化元音及典型拼写，避免一律读成元音加 n。',
concepts:['an/en 在部分语境中与 /ɑ̃/ 相关，例如 sans；on 常见 /ɔ̃/，例如 bon。','in/ain 常见 /ɛ̃/，例如 pain；不同地区口音（包括部分加拿大法语）会存在差异。','鼻化元音不是简单地在元音后清晰加一个 /n/；后接元音等条件可能使 n 成为独立辅音。'],
examples:['C’est bon.','Je voudrais du pain.','Sans sucre, s’il vous plaît.'],
vocab:[['pain','面包'],['bon','好的'],['sans','没有／不加'],['sucre','糖']],
listening:'Je voudrais du pain. C’est bon, mais sans sucre.',
reading:'Au café, Nina demande du pain. Le serveur répond : « Très bien. » Nina ajoute : « Et un thé sans sucre, s’il vous plaît. »',
questions:[{prompt:'bon 中的 on 在标准法语中常对应？',choices:['/ɑ̃/','/ɔ̃/','/ɛ̃/'],answer:1,explanation:'bon 通常 /bɔ̃/。'},{prompt:'pain 常含哪类鼻化元音？',choices:['/ɛ̃/','/u/','/i/'],answer:0,explanation:'pain 通常 /pɛ̃/；地区口音可能有所区别。'}],
production:'用 pain、bon、sans 写三句简短情境句，并逐词听范读；把听不清的词标记复练。',pronunciation:'先对比三个元音的口型与共振，再读短语；不使用未经校准的 IPA 专业评分。',commonMistake:'将 bon 明显读成 /bon/，或将所有 an/on/in 都读成相同鼻化元音。'
},
{
id:'fr-fnd-04',language:'fr',level:'Pre-A1',phase:0,title:'词末静音、连诵与语流',
goal:'理解部分词末辅音不发音及基本的 liaison 现象。',
concepts:['法语部分词末辅音在单独发音时往往不读，例如 les /le/；但不能把“所有词末辅音都静音”作为规则。','常见联诵：les amis 中 les 与 amis 之间出现 /z/，帮助听者识别复数形式。','法语的连诵有必须、可选和通常禁止的情形，需要随语法结构练习。'],
examples:['les amis','vous avez','un petit ami'],
vocab:[['ami','朋友'],['les','定冠词复数'],['avez','有（vous）'],['petit','小的']],
listening:'Vous avez des amis ici ? Oui, mes amis sont ici.',
reading:'Les amis de Léa sont à l’école. Elle dit : « Vous avez un cours ? » Ils répondent : « Oui, à neuf heures. »',
questions:[{prompt:'les amis 的连诵中常听到哪个辅音？',choices:['/z/','/p/','/ʃ/'],answer:0,explanation:'les amis 常见连诵 /lezami/。'},{prompt:'Which statement is more accurate?',choices:['Every final French consonant is silent.','Liaison depends on context and grammar.','Every word must have liaison.'],answer:1,explanation:'连诵由具体语法与风格决定，不能机械套用。'}],
production:'写两句含 les amis 或 vous avez 的句子；慢速朗读再连成自然语速。',pronunciation:'先学明确例句；对不确定的连诵选择不打分，只提供语法线索。',commonMistake:'认为任何两个词都可以连诵，或所有词末辅音都不能发音。'
},
{
id:'fr-fnd-05',language:'fr',level:'A1',phase:1,title:'问候、礼貌与正式／非正式称呼',
goal:'区别 tu 和 vous，能进行基础见面与告别对话。',
concepts:['tu 用于较熟悉或非正式的单数称呼，vous 可用于正式单数或复数；具体用法随情境和社群而变化。','Bonjour 较常用于白天问候，Bonsoir 常用于傍晚／晚上见面时。','Je m’appelle… 用来介绍名字；Enchanté/Enchantée 的书写变化与使用者有关。'],
examples:['Bonjour, je m’appelle Marie.','Comment vous appelez-vous ?','Salut ! Ça va ?'],
vocab:[['bonjour','您好'],['salut','嗨／再见（非正式）'],['merci','谢谢'],['au revoir','再见']],
listening:'Bonjour, Madame. Comment allez-vous ? Très bien, merci. Et vous ?',
reading:'À la bibliothèque, une étudiante dit : « Bonjour, Madame. » Plus tard, elle retrouve son amie et dit : « Salut ! Ça va ? »',
questions:[{prompt:'对不熟悉的老师较常使用哪种称呼？',choices:['tu','vous','仅使用 prénom'],answer:1,explanation:'正式或礼貌情境常用 vous。'},{prompt:'How to say “My name is Léa”?',choices:['Je suis appelle Léa.','Je m’appelle Léa.','J’ai Léa.'],answer:1,explanation:'s’appeler 为代词式动词，第一人称 Je m’appelle。'}],
production:'写一个 4 轮正式问候对话，再写一个 4 轮朋友间对话。',pronunciation:'练习 Bonjour、Bonsoir 的鼻化元音；不要只凭字母拼写机械朗读。',commonMistake:'对任何人都统一使用 tu，忽视礼貌关系。'
},
{
id:'fr-fnd-06',language:'fr',level:'A1',phase:1,title:'0–30 数字、年龄与价格',
goal:'正确识别数字 0–30，能询问年龄和简单价格。',
concepts:['重要数字：zéro, un, deux, trois, dix, onze, douze, treize, vingt, trente。','21 常写 vingt et un；22 为 vingt-deux；30 为 trente。','法语通常用 avoir 表示年龄：J’ai vingt ans，而不是 Je suis vingt ans。'],
examples:['J’ai vingt ans.','Ça coûte quinze euros.','Il y a vingt et un étudiants.'],
vocab:[['vingt','二十'],['trente','三十'],['coûter','花费'],['avoir','有']],
listening:'Bonjour. Ça coûte combien ? Vingt-deux euros. Merci !',
reading:'Léa a vingt ans. Elle achète un livre à quinze euros. Son amie a vingt et un ans et achète deux stylos.',
questions:[{prompt:'“我 20 岁”应如何说？',choices:['Je suis vingt ans.','J’ai vingt ans.','Je fais vingt ans.'],answer:1,explanation:'法语表达年龄用 avoir。'},{prompt:'vingt-deux 表示多少？',choices:['12','20','22'],answer:2,explanation:'vingt-deux 是 22。'}],
production:'写出自己年龄，构造 3 个虚拟商品价格，再用完整句回答 Ça coûte combien ?。',pronunciation:'练 vingt、vingt et un、trente 的词末与鼻化元音；先听数字再听完整价格。',commonMistake:'把英语“我 ... 岁”的 be 结构直接翻译成 Je suis ... ans。'
},
{
id:'fr-fnd-07',language:'fr',level:'A1',phase:2,title:'主语人称与 être / avoir',
goal:'使用最常见的两组动词变位描述身份、状态和拥有物。',
concepts:['être：je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont。','avoir：j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont。','法语主语通常保留，动词随人称变位；j’ai 是 je 在元音前省音。'],
examples:['Je suis étudiant.','Elle a un livre.','Nous sommes à la maison.'],
vocab:[['être','是／处于'],['avoir','有'],['étudiant','学生'],['maison','家']],
listening:'Je suis étudiant. Tu es étudiante ? Oui, et j’ai un livre de français.',
reading:'Camille est étudiante. Elle a un petit dictionnaire. Ses amis sont au café et ils ont des livres.',
questions:[{prompt:'Complete: Nous ___ étudiants.',choices:['sont','sommes','êtes'],answer:1,explanation:'nous 对应 sommes。'},{prompt:'Complete: Ils ___ un livre.',choices:['ont','avons','a'],answer:0,explanation:'ils 对应 avoir 的 ont。'}],
production:'用 être 写三句身份或位置描述，用 avoir 写两句物品描述。',pronunciation:'对比 ils ont 的 /z/ 连诵与 ils sont 的起始 /s/；避免单看拼写判断语音。',commonMistake:'把 je a 写成两个词，而不是正确的 j’ai。'
},
{
id:'fr-fnd-08',language:'fr',level:'A1',phase:2,title:'阴阳性、冠词与简单复数',
goal:'能够使用 un/une、le/la/les 与名词基本搭配。',
concepts:['法语名词有语法性别，例如 un livre（阳性）、une table（阴性）；它与物体是否有生物性别无必然关系。','le/la 在元音或哑音 h 前常省音为 l’，例如 l’école；les 是定冠词复数。','许多名词复数加 -s，词尾 -s 常不单独发音，但存在特殊复数形式。'],
examples:['un livre, une table','l’école est ouverte','les livres sont ici'],
vocab:[['livre','书（阳性）'],['table','桌子（阴性）'],['école','学校（阴性）'],['les','复数定冠词']],
listening:'La table est ici. Le livre est sur la table. Les étudiants arrivent.',
reading:'Dans une classe, il y a une table, un livre et deux chaises. Les élèves arrivent à l’école.',
questions:[{prompt:'Which phrase is correct?',choices:['une livre','un livre','un école'],answer:1,explanation:'livre 通常是阳性名词；école 前通常写 une école。'},{prompt:'Quel article défini utilise-t-on devant école ?',choices:['la école','le école','l’école'],answer:2,explanation:'定冠词在元音前省音为 l’。'}],
production:'为你的房间写 5 个名词短语（含冠词），再挑 2 个写完整句。',pronunciation:'练 la table / le livre / l’école 的语流，留意 les amis 的连诵。',commonMistake:'认为以 -e 结尾的所有法语名词必然为阴性。'
},
{
id:'fr-fnd-09',language:'fr',level:'A1',phase:2,title:'规则 -er 动词与日常活动',
goal:'用 parler、travailler、étudier 描述简单习惯。',
concepts:['第一组动词如 parler 一般现在时：je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent。','一些词尾拼写虽不同，但 je/tu/il/ils 在标准口语中部分词形读音相同。','时间频率可加 tous les jours、souvent、parfois。'],
examples:['Je parle français.','Nous étudions le soir.','Elle travaille le lundi.'],
vocab:[['parler','说话'],['étudier','学习'],['travailler','工作'],['souvent','经常']],
listening:'Je parle français avec mes amis. Nous étudions ensemble.',
reading:'Nina étudie le français le matin. L’après-midi, elle travaille au café. Le soir, elle parle avec une amie.',
questions:[{prompt:'Complete: Nous ___ français.',choices:['parlez','parlons','parlent'],answer:1,explanation:'nous + parler：nous parlons。'},{prompt:'Complete: Elle ___ le matin.',choices:['travaille','travaillons','travaillent'],answer:0,explanation:'elle 的第三人称单数用 travaille。'}],
production:'写出自己或一个虚构人物一日的 5 句习惯活动。',pronunciation:'对比 parlez /paʁle/ 和 parlons /paʁlɔ̃/ 的结尾元音。',commonMistake:'把 nous parle 作为正常标准变位。'
},
{
id:'fr-fnd-10',language:'fr',level:'A1',phase:2,title:'否定句与基础提问',
goal:'能用 ne...pas 否定句子，并以 intonation 或 est-ce que 提问。',
concepts:['标准书面语中的否定通常用 ne ... pas 包围变位动词：Je ne parle pas。','口语中 ne 经常省略，但初学书面表达可先练完整结构。','疑问形式可用语调、est-ce que 或倒装；不同正式度下习惯不同。'],
examples:['Je ne sais pas.','Est-ce que vous parlez français ?','Tu étudies aujourd’hui ?'],
vocab:[['pas','不（否定成分）'],['savoir','知道'],['aujourd’hui','今天'],['question','问题']],
listening:'Est-ce que tu étudies le français ? Oui, mais je ne parle pas très bien.',
reading:'Paul cherche une salle. Il demande : « Est-ce que vous avez un plan ? » Son amie répond : « Non, je n’ai pas de plan. »',
questions:[{prompt:'书面否定句是哪一个？',choices:['Je pas parle.','Je ne parle pas.','Je parle ne pas.'],answer:1,explanation:'ne ... pas 通常包围变位动词。'},{prompt:'哪一个是自然的 est-ce que 问句？',choices:['Est-ce que vous étudiez ?','Est-ce que étudiez vous ?','Vous est-ce étudiez ?'],answer:0,explanation:'est-ce que 后常接普通陈述句语序。'}],
production:'将 Je parle français 和 Tu as un livre 改成否定句，再各提出一个问句。',pronunciation:'口语否定 ne 可能弱化或省略；先保证理解和书面语正确。',commonMistake:'将 ne...pas 两个成分固定放在主语和动词之前。'
},
{
id:'fr-fnd-11',language:'fr',level:'A1',phase:3,title:'食物、部分冠词与日常购物',
goal:'正确使用 du/de la/de l’ 及简单的购物对话。',
concepts:['部分冠词表达不定量：du pain、de la soupe、de l’eau；名词性别和发音决定形式。','否定结构中常出现 de/d’：Je ne bois pas de café；这是一条有例外的常见规则。','Je voudrais 表示礼貌请求，比直接命令适合一般购物情境。'],
examples:['Je voudrais du pain, s’il vous plaît.','Elle boit de l’eau.','Je ne veux pas de sucre.'],
vocab:[['pain','面包'],['soupe','汤'],['eau','水'],['sucre','糖']],
listening:'Bonjour. Je voudrais du pain et de l’eau, s’il vous plaît.',
reading:'Au marché, Karim achète du pain et de la soupe. Il demande aussi de l’eau. Il ne veut pas de sucre.',
questions:[{prompt:'Which phrase is correct?',choices:['du eau','de l’eau','de la eau'],answer:1,explanation:'eau 以元音开始，使用 de l’。'},{prompt:'Complete: Je ne veux pas ___ sucre.',choices:['du','de','de la'],answer:1,explanation:'一般否定不定量宾语常用 de。'}],
production:'编写 6 轮超市或咖啡店对话，包含礼貌请求和一项否定。',pronunciation:'听 du 与 de 的不同元音；在简单食物短句中练停顿和重音组。',commonMistake:'所有不定量食物都统一用 du，忽略阴性及元音开头形式。'
},
{
id:'fr-fnd-12',language:'fr',level:'A1–A2',phase:4,title:'短段落：过去经历与未来计划',
goal:'把自我介绍、日常活动、基础过去与计划组合成一段真实可用的文字。',
concepts:['futur proche：aller（变位）+ 动词不定式，如 Je vais étudier demain。','passé composé 入门：avoir + 过去分词，如 J’ai étudié hier；部分动词使用 être，并需留意性数配合。','用 d’abord、ensuite、puis、enfin 将短句有序组织成段落，保持时间与人称一致。'],
examples:['Hier, j’ai étudié le français.','Demain, je vais aller à la bibliothèque.','Ensuite, je vais rencontrer une amie.'],
vocab:[['hier','昨天'],['demain','明天'],['ensuite','然后'],['enfin','最后']],
listening:'Hier, j’ai lu un texte. Demain, je vais étudier le français avec Léa.',
reading:'Hier, Camille a étudié à la bibliothèque. Ensuite, elle a acheté du pain. Aujourd’hui, elle travaille chez elle. Demain, elle va rencontrer ses amis et pratiquer le français.',
questions:[{prompt:'哪一个表示已经完成的过去事件？',choices:['J’ai étudié hier.','Je vais étudier demain.','J’étudie tous les jours.'],answer:0,explanation:'passé composé 在这里表示过去已完成事件。'},{prompt:'Which expresses a future plan?',choices:['J’ai parlé hier.','Je vais parler demain.','Je parle hier.'],answer:1,explanation:'aller + 不定式表达近期未来或计划。'}],
production:'写 60–90 词法语自述，按“我是谁—平时做什么—昨天做了什么—明天计划”组织；最后自行检查冠词、人称变位和连接词。',pronunciation:'先按句听范读，再自行朗读段落；语音识别文本匹配不等于语音/鼻化元音的专业评分。',commonMistake:'把 Je vais étudié 写成 futur proche；aller 后须用动词原形 étudier。'
}
];