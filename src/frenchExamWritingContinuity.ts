import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Original exercises consistent with FEI requirements; not copied official examination materials. */
export const FRENCH_EXAM_WRITING_CONTINUITY:SpecialtyLesson[]=[
{
 id:'fr-b2-formal-argument-writing',type:'grammar',language:'fr',level:'B2',unitLink:'fr-b2-u06',
 title:'B2 正式论证写作：陈述事实、提出方案与回应反对意见',
 subtitle:'完整正式信函的语域、论证次序与 250 词以上表达',
 prerequisite:'掌握 conditionnel、subjonctif、比较和让步结构；已能围绕社会或校园事务提出有依据的观点。',
 objective:'针对明确的收件人及现实问题写有事实、理由、让步与可执行方案的正式法语信函，检查文体及最低词数。',
 sections:[
 sec('01 明确收件人、写信目的和具体事实',
 '正式写作先明确向谁写、为什么写，以及什么具体情况需要处理。申诉与提议不同：je souhaite attirer votre attention sur… 提请注意，je vous propose de… 提出可执行方案；避免用情绪判断代替可核实事实。',
 'Madame la Directrice, / Je me permets de vous écrire au sujet de…',[
 e('Madame la Directrice, je vous écris au sujet des horaires de la bibliothèque.','尊敬的主任女士，我写信是为了讨论图书馆开放时间。','收件人和主题在开头明确。'),
 e('Actuellement, plusieurs étudiants doivent quitter les salles avant la fin de leur travail.','目前，一些学生不得不在完成工作前离开学习室。','用场景描述问题，不虚构统计数字。'),
 e('Je souhaiterais proposer un essai d’ouverture prolongée.','我希望提议试行延长开放时间。','条件式 souhaiterais 使提议更礼貌。')
 ],'Je veux que vous changiez tout immédiatement! 语气过强且没有具体论据，通常不适合写给学校管理者的正式提案。',
 {title:'正式信函的实际功能',columns:['写作环节','惯用句型','需要提供的信息'],rows:[['称呼','Madame la Directrice,','收件人身份'],['背景','Je vous écris au sujet de…','写作目的'],['理由','En effet, … / De plus, …','具体依据'],['让步','Certes, … Cependant, …','成本或反方考虑'],['提议','Je vous propose de…','可执行措施'],['结尾','Je vous remercie de votre attention.','正式结束']],note:'根据真实收件人调整称谓和敬语；此处使用自拟校园情景，不是官方试题。'}),
 sec('02 段落中的论据不能只列“首先、其次”',
 '一段论证包括待解决的问题、产生的影响、可能措施及其作用机制。句子应真实解释为什么需要调整，而不是连续使用 premièrement、deuxièmement。可用 en effet 解释原因，用 ainsi 提出可能结果，用 par conséquent 连接推论。',
 'fait → conséquence → justification → action',[
 e('Les horaires actuels limitent l’accès aux salles en soirée.','现有开放时段限制了晚间学习室的使用。','具体描述问题。'),
 e('Or certains étudiants terminent leurs cours tard et ont besoin d’un espace calme.','然而，部分学生下课较晚，需要安静场所。','提出原因与受影响人群。'),
 e('Une ouverture plus longue pourrait répondre à ce besoin.','延长开放时间可能回应这种需要。','pourrait 保留提案效果的不确定性。')
 ],'Une extension améliorera forcément les résultats scolaires 缺乏足够支持；可陈述合理预期，但不能保证成绩一定改善。'),
 sec('03 主动承认成本，并给出边界明确的方案',
 'B2 议论文需要合理回应另一方的顾虑。承认成本或实施限制时，使用 certes…mais、bien que、toutefois，随后给出一个具体折衷方案，例如限定周数、开放区域或反馈方式；不能只写“虽然有困难，但必须同意”。',
 'Certes + objection ; toutefois + limited proposal',[
 e('Certes, prolonger les horaires pourrait entraîner des frais supplémentaires.','诚然，延长开放时间可能产生额外费用。','先承认现实成本。'),
 e('Toutefois, un essai limité à certaines soirées permettrait d’évaluer la demande.','不过，只在部分晚间试行有助于评估需求。','提出可检验的小规模方案。'),
 e('Je propose que l’établissement recueille les avis des usagers.','我提议学校收集使用者意见。','proposer que + subjonctif recueille。')
 ],'让步后必须回应刚提出的反方问题；不能直接跳回原结论而忽略费用或人员安排。'),
 sec('04 结尾保持礼貌，全文满足正式表达与长度要求',
 'DELF B2 正式写作要求至少 250 词；要充分回应题目的交际对象、文本类型与任务内容。结尾应总结请求、表达愿意沟通并采用恰当礼貌用语。这里展示的是原创教学任务和范文，不是官方试题或经人工评分的 Band/等级范文。',
 'Je vous remercie… / Je reste à votre disposition… / Veuillez agréer…',[
 e('Je reste à votre disposition pour discuter de cette proposition.','如需讨论这项建议，我愿意进一步沟通。','结束时留下沟通空间。'),
 e('Je vous remercie de l’attention portée à cette demande.','感谢您关注这一请求。','正式而清晰的致谢。'),
 e('Je vous prie d’agréer, Madame la Directrice, l’expression de mes salutations distinguées.','此致敬礼（正式法语信函惯用句）。','正式称呼与信末敬语一致。')
 ],'信函全文不能只有问候和签名，却缺少事实和论证；也不要把日常聊天的 Salut! 当成写给校方的正式开头。')
 ],
 questions:[
 {question:'将 Je veux changer les horaires. 改成向主任提出的礼貌建议。',answer:'Je souhaiterais proposer une modification des horaires.',why:'条件式 souhaiterais 减弱要求语气，proposer 明确这是方案。'},
 {question:'选择更符合论证的表达：Cela améliorera forcément les notes / Cela pourrait répondre aux besoins.',answer:'Cela pourrait répondre aux besoins.',why:'没有实际结果证据时，使用 pourrait 保留可能性。'},
 {question:'填空：Je propose que l’établissement ___ (recueillir) les avis.',answer:'recueille',why:'proposer que 后使用虚拟式 recueille，表达建议中的动作。'},
 {question:'DELF B2 的这一项完整写作任务至少多少词？',answer:'250 mots minimum',why:'法国教育国际中心 DELF B2 官方说明该书面表达任务的最低长度为 250 词。'}
 ],
 output:'原创情境：大学图书馆晚间较早关闭。请以学生代表身份写一封至少 250 词的正式法语信函给图书馆主任，交代事实、受影响学生的需要、成本顾虑、一个小范围可评估的试行方案，并使用恰当称呼和结尾。',
 modelParagraphStarts:[0,3,8,13,18],
 model:[
 e('Madame la Directrice,','尊敬的主任女士：','正式称呼。'),
 e('Je me permets de vous écrire au nom de plusieurs étudiants pour vous proposer une adaptation des horaires de la bibliothèque universitaire.','我代表一些学生写信，希望建议调整大学图书馆开放时间。','明确身份、受众和目的。'),
 e('Cette demande concerne principalement les soirées pendant lesquelles de nombreux cours se terminent tard, alors que les salles de travail ferment peu après.','这一请求主要涉及晚间不少课程结束较迟、学习室随后即关闭的情况。','限定当前问题而不杜撰统计值。'),
 e('La situation pose une difficulté particulière aux étudiants qui partagent un logement ou qui disposent de peu d’espace pour étudier chez eux.','这种情况对合住或家中学习空间有限的学生尤其困难。','说明受影响群体。'),
 e('Après les cours, ces étudiants ont parfois besoin de relire leurs notes, de préparer une présentation ou de travailler en groupe.','下课后，这些学生有时需要复习笔记、准备展示或进行小组作业。','用学习活动提供具体说明。'),
 e('Une fermeture trop précoce réduit donc leurs possibilités de choisir un environnement adapté.','过早关闭会减少他们选择适合学习环境的机会。','把事实与后果连接。'),
 e('Il ne s’agit pas de demander que tous les bâtiments restent ouverts toute la nuit, mais de réfléchir à une solution proportionnée.','这并不是要求所有建筑整夜开放，而是希望讨论适度方案。','澄清主张边界。'),
 e('Une extension de deux heures certains soirs pourrait constituer un premier pas raisonnable.','某些晚间延长两小时可能是合理的第一步。','提出可执行的小范围行动。'),
 e('Certes, une telle mesure entraînerait probablement des coûts supplémentaires liés à la présence du personnel et à l’entretien des locaux.','诚然，此举可能增加人员及场地维护成本。','公平承认成本。'),
 e('Je comprends pleinement ces contraintes et je ne souhaite pas les minimiser.','我充分理解这些限制，并不希望低估它们。','强调对对方立场的理解。'),
 e('Toutefois, il serait possible de mener un essai limité à quelques semaines dans une partie seulement de la bibliothèque.','不过，可以在图书馆部分区域试行数周。','为顾虑提供限定性替代方案。'),
 e('La fréquentation pourrait être relevée chaque soir afin de déterminer si le service répond réellement à une demande suffisante.','可以每晚记录使用情况，以判断服务是否真正满足足够的需求。','提出可核查指标。'),
 e('Les étudiants pourraient également répondre à un court questionnaire sur leurs besoins et leurs habitudes de travail.','还可以邀请学生填写简短问卷，了解需求和学习习惯。','加入与使用量互补的反馈方式。'),
 e('Ces informations permettraient ensuite de comparer les avantages attendus aux ressources mobilisées avant toute décision définitive.','这些资料可以帮助在做最终决定前比较预期收益与所需资源。','连接试验和政策评估。'),
 e('Si les résultats montraient une utilisation faible, nous accepterions naturellement que la proposition soit réexaminée.','如果结果显示使用量较低，我们自然接受重新审视提案。','提出有条件的退出机制。'),
 e('En revanche, une fréquentation régulière justifierait une réflexion plus approfondie sur les horaires.','相反，持续稳定的使用情况将支持进一步讨论开放时间。','说明何时值得继续。'),
 e('Cette démarche progressive me semble préférable à une décision prise sans observation préalable.','我认为循序渐进比没有事先观察就决策更可取。','总结权衡原则。'),
 e('Elle permettrait de tenir compte à la fois des besoins des étudiants et des responsabilités de l’établissement.','这种方法能同时考虑学生需求与学校责任。','重新连接双方面利益。'),
 e('Je vous remercie de l’attention que vous voudrez bien porter à cette demande.','感谢您愿意关注这一请求。','正式致谢。'),
 e('Je reste à votre disposition pour vous présenter la proposition plus en détail ou participer à une rencontre avec les services concernés.','如需详述提案或与相关部门会谈，我愿随时配合。','表明后续行动。'),
 e('Je vous prie d’agréer, Madame la Directrice, l’expression de mes salutations distinguées.','谨致诚挚敬意（正式结尾）。','规范的正式信函结束语。')
 ],
 referenceUrls:['https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-b2','https://www.france-education-international.fr/document/explic-grille-pe-b2'],
 sourceNote:'对应 fr-b2-u06 的专业书面表达；法国教育国际中心正式任务和评价标准用于校核结构。题目与范文原创，非官方样题。'
},
{
 id:'fr-c1-cross-source-synthesis',type:'vocabulary',language:'fr',level:'C1',unitLink:'fr-c1-u03',
 title:'C1 多资料综合：提取共识、分歧和信息边界',subtitle:'由两份原始文本写出 200–240 词客观 synthèse',
 prerequisite:'会 paraphraser、nominaliser、使用关系代词和书面连接语；能够识别来源的范围限制。',
 objective:'将两份文本的事实按共同主题重新组织，准确标明相同与不同观点，不引入个人评价或材料没有的信息，并控制在 200–240 词。',
 sections:[
 sec('01 阅读两份材料时先抽取共同议题',
 'DALF C1 的 synthèse 是一个统一、连贯的新文本，不是将两份摘要首尾拼接；应提取两份资料中的共同问题、核心信息和不同侧重。本课以下资料 A 与 B 均为原创虚构教学文本，不是官方考试材料，也不代表真实统计研究。',
 'thème commun → informations A/B → regroupement',[
 e('Document A — La bibliothèque universitaire propose des places individuelles et plusieurs salles de travail collectif. Leur utilisation varie cependant selon les horaires. Une partie des salles reste peu fréquentée à certains moments de la journée, alors que les soirées suivant les cours peuvent attirer davantage d’étudiants. Le service chargé des bâtiments souligne que prolonger l’ouverture de tous les espaces mobiliserait du personnel et entraînerait des dépenses de fonctionnement supplémentaires. Il ne dispose pas encore d’une évaluation permettant de comparer ces dépenses à la demande effective. Avant de modifier durablement les horaires, le service suggère donc de relever la fréquentation par créneau et de distinguer les différentes catégories de salles. Cette observation pourrait permettre de préciser les moments où les locaux existants répondent déjà aux besoins et ceux où leur disponibilité pose problème. Aucune amélioration des résultats universitaires n’est affirmée dans ce document.','材料 A：大学图书馆有多间学习室，但需求随时段变化；部分晚间使用较多，其他时段却不充分。全面延时有成本，因此服务部门建议先测量使用量。','提取可观察对象：时段差异、运营成本、先测量后调整。'),
 e('Document B — Un groupe d’étudiants considère que le nombre de places disponibles ne suffit pas à décrire les conditions d’étude. Certains possèdent un ordinateur et peuvent consulter des supports numériques, mais partagent un logement où les interruptions rendent difficile un travail prolongé. D’autres préfèrent accéder aux cours et aux ressources à distance, notamment lorsque le trajet jusqu’au campus prend beaucoup de temps. Les attentes varient aussi selon les activités : une personne qui prépare seule un examen ne cherche pas forcément le même espace qu’un groupe travaillant sur une présentation. Pour mieux comprendre cette diversité, le groupe demande que les étudiants soient consultés sur leurs horaires, leurs habitudes et les obstacles qu’ils rencontrent. Il souhaite que les décisions portent à la fois sur les espaces sur place et sur les ressources accessibles en ligne. Le texte ne soutient pas que tous les étudiants aient les mêmes préférences.','材料 B：学生指出需求不限于座位数量。有些人已有线上资源，却缺乏安静空间；另一些人因为通勤而选择远程学习。学生团体要求征求意见，以匹配不同情形。','提取需求的类型差异、线上与实体资源、参与咨询。'),
 e('Sujet commun : comment adapter les ressources d’étude aux besoins réels ?','共同主题：如何根据真实学习需求调整资源？','本句是两段材料共同问题的概括，不是第三份来源。')
 ],'不能写“调查证明延时一定改善成绩”或“全体学生支持延时”：两份文本都没有提供这些结论。',
 {title:'源材料信息矩阵',columns:['问题','材料 A','材料 B'],rows:[['现有问题','不同时段使用量不均','学生学习环境和通勤条件不同'],['资源选择','延时有额外成本','实体空间与线上资源皆有用途'],['建议','测量场所使用情况','征求学生意见'],['能够推出什么','需要评估运营需求','需要区分学习者需求']],note:'正式 synthèse 只能据文中实际信息改写。该矩阵是从本课两份原创文本提取，不是外部研究事实。'}),
 sec('02 改写与名词化不能改变信息力度',
 '可以用名词化或上位词合并相近信息，例如 mesurer la fréquentation → une évaluation de la fréquentation。改写不能把 suggérer（建议）强化为 prouver（证明），也不能把 certains（一些）扩大为 tous（全部）。',
 'suggérer → proposer une évaluation / certains → une partie des étudiants',[
 e('Les horaires attirent des publics différents. → La fréquentation varie selon les horaires.','不同时间段吸引不同人群。→ 使用情况随开放时段变化。','提炼共同意思，同时保留变量。'),
 e('Le service suggère de mesurer la fréquentation. → Une évaluation préalable est préconisée.','部门建议先测量使用量。→ 建议事先进行评估。','名词化后仍是建议而非已执行。'),
 e('Certains étudiants manquent d’un lieu calme. → Une partie des étudiants ne dispose pas d’un espace silencieux.','部分学生缺少安静场所。→ 一部分学生没有安静空间。','保留 certains 的非普遍性。')
 ],'不能把 une évaluation est préconisée 改成 une évaluation a démontré；这将尚未实施的建议误写为已完成的实证结果。'),
 sec('03 重新排序材料，而不是逐篇复述',
 '可以先介绍资源供需错位，再讨论场所运营成本和学习者差异，最后综合两类评估方案。文章不必采用材料 A 然后材料 B 的顺序；允许同一段综合两份材料支持的共同主题。',
 'thème → contraintes → diversité des besoins → propositions',[
 e('Les deux documents traitent de l’adaptation des ressources universitaires aux pratiques d’étude.','两份材料都讨论大学资源如何适应学习方式。','以共同问题开篇。'),
 e('L’un souligne les écarts de fréquentation et les coûts; l’autre décrit les besoins liés au calme et à la distance.','一份侧重使用量差异与费用；另一份描述安静环境和距离带来的需求。','合并比较而非复述原顺序。'),
 e('Les pistes proposées associent observation des usages et consultation des étudiants.','建议将使用情况观察与学生咨询相结合。','合并两份文本的行动建议。')
 ],'synthèse 不应出现 À mon avis 或 J’estime；任务要求客观转述来源信息，不是讨论作文。'),
 sec('04 控制 200–240 词，保留范围与客观语气',
 '官方 DALF C1 synthèse 要求 200–240 词，词数按照空格分隔的单位计。范文需要一个共同标题和组织连贯的文本；不能引入第三方资料、独立评论或未被提供的数字。下列完整范文仅基于本课虚构材料 A/B。',
 'titre commun → organisation thématique → reformulation sans jugement',[
 e('L’écart entre les horaires d’utilisation et les besoins individuels constitue le thème partagé.','使用时段与个体需求之间的差距是两份材料的共同主题。','概括材料一致的议题。'),
 e('Le service recommande d’observer les usages; les étudiants souhaitent également faire connaître leurs contraintes.','服务部门建议观察使用情况，学生也希望说明自己的现实限制。','忠实综合两方建议。'),
 e('Les deux démarches peuvent éclairer la répartition des ressources sans présumer du résultat.','两项做法可以帮助了解资源配置，而不预设结论。','不推断尚未出现的结果。')
 ],'不能在 synthèse 结尾加入个人建议或学校应该如何做的独立判断；应止于对两份文本现有观点的客观整合。')
 ],
 questions:[
 {question:'为何不能将两份资料的摘要直接首尾相接？',answer:'synthèse 要求围绕共同主题重组、分类并改写信息，形成一篇新的连贯文本。',why:'法国教育国际中心官方任务明确要求统一文本，而不是依次复述两份材料。'},
 {question:'材料 A 是否声称延时已被证实改善学习成绩？',answer:'没有；材料 A 只指出时段使用差异、成本和先调查的建议。',why:'不得自行加入文中没有的研究成果或因果结论。'},
 {question:'材料 B 中是 tous les étudiants 还是 certains étudiants？',answer:'certains étudiants',why:'一些学生和全体学生的语义范围不同；不能夸大样本。'},
 {question:'DALF C1 synthèse 的规定字数是多少？',answer:'200 à 240 mots',why:'官方样卷要求综合摘要控制在 200–240 词，而且需要保持客观。'}
 ],
 output:'请仅根据本课原创虚构材料 A 与 B，完成 200–240 词的法语 synthèse。采用自己的组织顺序，呈现共同问题、各方关注、可兼容的信息与原文建议；不要添加个人立场、外部数据或臆测结论。',
 modelParagraphStarts:[0,1,3,7,11],
 model:[
 e('Adapter les ressources universitaires aux usages','使大学学习资源适应实际使用。','共同标题，不计入正文练习词数时应遵循实际考试的计数规则。'),
 e('Les documents examinent l’organisation des ressources universitaires selon les usages étudiants.','两份文本探讨大学如何依据学生学习习惯组织学习资源。','说明共同议题。'),
 e('Ils mettent en évidence un décalage entre les dispositifs disponibles et des besoins qui diffèrent selon les moments et les personnes.','它们指出已有资源与不同时间、不同人群需求之间存在差距。','概括共同问题。'),
 e('Du côté des espaces physiques, le service de la bibliothèque observe que la fréquentation n’est pas constante au cours de la journée.','在实体空间方面，图书馆部门观察到一天中的使用量并不恒定。','依据材料 A。'),
 e('Certaines soirées connaissent une demande importante, alors que plusieurs salles sont moins utilisées à d’autres horaires.','某些晚间需求较多，其他时段却有学习室使用不足。','继续保留材料 A 的时段差异。'),
 e('Une prolongation générale de l’ouverture pourrait toutefois accroître les dépenses liées au fonctionnement des locaux.','全面延长开放可能增加场地运营费用。','材料 A 的成本担忧。'),
 e('Le service privilégie donc une observation préalable de la fréquentation plutôt qu’une modification décidée sans mesure des usages.','因此部门主张先观察使用量，而非未经测量就调整。','来源建议，未写为已执行。'),
 e('L’autre texte souligne des besoins dépassant le nombre de places.','另一份材料强调问题不限于座位数量。','转向材料 B。'),
 e('Une partie des étudiants possède déjà des outils numériques, mais ne dispose pas nécessairement d’un environnement calme à domicile.','部分学生已有数字工具，却不一定有安静的家中环境。','依据材料 B，保留一部分而非全部。'),
 e('D’autres souhaitent conserver la possibilité de travailler à distance, notamment lorsque leurs déplacements prennent du temps.','另一些学生希望保留远程学习机会，尤其在通勤耗时的情况下。','说明不同需求。'),
 e('Les ressources en ligne et les espaces sur place répondent ainsi à des situations distinctes.','因此线上资源和现场空间满足不同情况。','综合材料 B 的对照。'),
 e('Le groupe d’étudiants propose une consultation pour mieux connaître les contraintes et les préférences des usagers.','学生团体提议开展咨询，以了解使用者条件和偏好。','忠实转述材料 B 建议。'),
 e('Les deux textes envisagent donc une adaptation des services fondée sur une meilleure connaissance de leur utilisation.','因此两份资料都主张基于更充分了解实际使用来调整服务。','跨来源的共同建议。'),
 e('Le premier insiste sur la mesure de la fréquentation et les coûts, tandis que le second demande une prise en compte des conditions personnelles.','前者侧重测量使用情况和成本；后者要求关注个人条件。','准确区分来源的不同侧重。'),
 e('Ces approches portent sur des aspects complémentaires de la même organisation universitaire.','两种方法关注大学资源组织的互补方面。','仅归纳互补关系，不增加个人评论。')
 ],
 referenceUrls:['https://www.france-education-international.fr/document/dalf-c1-peexercice-1-con','https://www.france-education-international.fr/document/descript-perf-pe-c1'],
 sourceNote:'关联 fr-c1-u03 多资料综合的现有目标；两份微型来源和完整 synthèse 均为原创教学文本，标准依据 FEI DALF C1。'
}
];