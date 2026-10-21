import type {SpecialtyLesson,LearningSection,LearningExample,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Thematic lexicon is taught as noun phrases, valency and complete situations rather than isolated translations. */
export const FRENCH_PATH_VOCABULARY:SpecialtyLesson[]=[
{
 id:'fr-routines-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u05',
 title:'一天的活动：时间、频率与动词搭配',
 subtitle:'从单个活动词到有先后关系的日常生活段落',
 prerequisite:'会说简单的时钟时间；认识 je、nous、être/avoir 和规则 -er 的现在时。',
 objective:'能按早晨—白天—晚上的顺序讲述学习和生活，区分起床、上课、复习与休息的自然动词搭配。',
 sections:[
 sec('01 从动作搭配入手，而不是孤立背动词',
 '每个活动词都与特定宾语或介词组合：prendre le petit déjeuner 是吃早餐，aller en cours 是去上课，rentrer chez soi 是回家。se lever 和 se coucher 属于代词式动词，主语改变时反身代词也改变。',
 'se lever · prendre le petit déjeuner · aller en cours · rentrer chez soi',[
 e('Je me lève à sept heures.','我七点起床。','me 和 je 对应，不可省略。'),
 e('Je prends mon petit déjeuner à la maison.','我在家吃早餐。','prendre le petit déjeuner 为固定动词搭配。'),
 e('À huit heures, je vais en cours.','八点我去上课。','aller en cours 表示去上课，而不是去某个具体房间。'),
 e('Nous rentrons chez nous après les cours.','下课后我们回家。','chez nous 表达回到我们自己家。')
 ],'不能把 je me lève 简化成 je lève 表示“我起床”；也不能把“回家”机械写为 rentrer à maison。',
 {title:'日常活动高频语块',columns:['法语表达','中文','构句要点'],
 rows:[['se lever','起床','je me lève'],['prendre le petit déjeuner','吃早餐','je prends'],['aller en cours','去上课','je vais'],['déjeuner','吃午饭','nous déjeunons'],['réviser ses notes','复习笔记','je révise mes notes'],['rentrer chez soi','回家','je rentre chez moi']],note:'“去上课”“回家”分别涉及 en cours、chez moi 等介词表达，不能只记动词。'}),
 sec('02 表达时间、频率和前后顺序',
 '表达生活规律时，à sept heures 表示具体时刻；le matin、le soir 表示常规时段；tous les jours 表示每天；souvent 和 parfois 表示发生频率。先决定句子在讲“几点发生”还是“经常发生”，再选择相应状语。',
 'à + 时间点 / le matin / tous les jours / souvent / parfois',[
 e('Je pars à huit heures tous les jours.','我每天八点出门。','具体时间与频率可以同时出现。'),
 e('Le soir, je révise souvent mes notes.','晚上我经常复习笔记。','le soir 是时间段，souvent 描述频率。'),
 e('Après le dîner, je lis pendant trente minutes.','晚饭后我阅读三十分钟。','après 表示先后，pendant 表示持续时间。')
 ],'le matin 表示惯常发生的“早晨”，ce matin 指“今天早晨”；不能一律当成同一个时间状语。'),
 sec('03 课堂与学习词汇的准确搭配',
 '讨论学习要区分 apprendre（学会、学习新东西）、étudier（学习某学科）、réviser（复习）和 pratiquer（练习）。这些词在部分场景可互通，但不能不看宾语任意替换；例如 réviser une leçon 与 apprendre une nouvelle règle 在学习阶段上不同。',
 'apprendre une règle / étudier le français / réviser une leçon / pratiquer une langue',[
 e("J'apprends une nouvelle règle de grammaire.",'我在学习一条新的语法规则。','apprendre 表示接触、掌握新内容。'),
 e("J'étudie le français à l'université.",'我在大学学习法语。','étudier 后直接接学科。'),
 e('Je révise cette leçon avant le cours.','我上课前复习这一课。','réviser 指对已学内容再次学习。'),
 e('Nous pratiquons le français avec des amis.','我们与朋友练习法语。','pratiquer 强调实际使用和练习。')
 ],'Je révise une règle inconnue 可能与“首次学习”的意思不匹配；应先判断新学还是复习。'),
 sec('04 写出有连续关系的一天',
 '完整段落不只列出活动词，还要交代顺序与场所。最简单的结构是早晨起床和出门、白天学习、晚上复习与休息，用 puis、ensuite、après les cours 和 enfin 连接。',
 'le matin → puis → après les cours → le soir → enfin',[
 e('Le matin, je me lève à sept heures et je prends mon petit déjeuner.','早晨我七点起床，接着吃早餐。','同一时段的两个动作组合成一句。'),
 e('Ensuite, je vais en cours et j’étudie le français.','然后我去上课并学习法语。','ensuite 连接一天的下一步。'),
 e('Le soir, je révise mes notes, puis je me couche à onze heures.','晚上我复习笔记，之后十一点睡觉。','先后动作与代词式动词结合。')
 ],'只写 Je mange. Je vais. Je révise. 信息不足，无法交代时间或行动之间的关系。')
 ],
 questions:[
 {question:'选择搭配：Je prends / fais mon petit déjeuner.',answer:'Je prends mon petit déjeuner.',why:'表达吃早餐常用 prendre le petit déjeuner。'},
 {question:'补全：Je ___ lève à sept heures.',answer:'me',why:'se lever 为代词式动词，je 对应反身代词 me。'},
 {question:'翻译：我每天晚上复习笔记。',answer:'Je révise mes notes tous les soirs.',why:'réviser ses notes 表示复习笔记，tous les soirs 表示每晚。'},
 {question:'解释 apprendre une règle 与 réviser une leçon 的学习阶段区别。',answer:'前者偏向学习新规则，后者偏向复习已学课程。',why:'搭配不仅涉及词形，还携带学习行为处于哪个阶段的信息。'}
 ],
 output:'写 8 句法语介绍平日：必须涉及起床、早餐、上课、复习和休息，使用三个时间表达、两个连接词和一个频率副词。',
 model:[
 e('Le matin, je me lève à sept heures.','早晨我七点起床。','时间和动作。'),
 e('Puis je prends mon petit déjeuner.','之后我吃早餐。','时间连接。'),
 e('À huit heures, je vais en cours.','八点我去上课。','明确的时刻。'),
 e('À midi, je déjeune avec mes camarades.','中午我和同学一起吃午饭。','时间段从早晨过渡到中午。'),
 e("J'étudie le français et je pratique la langue avec mes amis.",'我学习法语并和朋友练习这门语言。','区分学习和实践。'),
 e('Après les cours, je rentre chez moi.','课后我回家。','补充课堂结束与回家这一生活步骤。'),
 e('Le soir, je révise souvent mes notes.','晚上我经常复习笔记。','复习 + 频率。'),
 e('Enfin, je me couche vers onze heures.','最后我大约十一点睡觉。','完成日常段落。')
 ],
 referenceUrls:['https://www.gymglish.com/en/frantastique/french-lesson','https://grammarmama.com/learn/french/'],
 sourceNote:'对应既有 fr-a1-u05（日常习惯），全套时间与活动语块例句由项目撰写；语法结构对照原 A1 课程及外部语法索引。'
},
{
 id:'fr-directions-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u09',
 title:'城市与问路：地点、交通和方向搭配',
 subtitle:'从识别路标到完成一次清楚的问路对话',
 prerequisite:'会用 où 提问；已接触 aller、être 与基本地点介词。',
 objective:'能询问车站、图书馆和市中心的位置，理解直行/左转/右转及交通方式，清楚解释路线。',
 sections:[
 sec('01 先说地点，再问它在哪里',
 '问路时地点名词一般连同冠词学习：la gare（火车站）、la bibliothèque（图书馆）、la pharmacie（药店）、le centre-ville（市中心）。询问位置常用 Où est… ?；询问到达方式则可用 Comment aller à… ?，并注意 à 与定冠词结合形成 au / à la / à l’ / aux。',
 'Où est la gare ? / Comment aller au centre-ville ?',[
 e('Excusez-moi, où est la gare ?','打扰一下，火车站在哪里？','先用礼貌表达，再用 où 问地点。'),
 e('Comment aller à la bibliothèque ?','怎样去图书馆？','bibliothèque 阴性单数，搭配 à la。'),
 e('Je vais au centre-ville.','我去市中心。','à + le 合成 au。'),
 e("Nous allons à l'université.",'我们去大学。','元音开头的 université 使用 à l’。')
 ],'不能写 à le centre-ville；应使用 au。也不要把 Où est la gare ? 与 Comment aller à la gare ? 当成完全同一问法。',
 {title:'地点名词与方向词',columns:['表达','中文','常见搭配'],
 rows:[['la gare','火车站','près de la gare'],['la bibliothèque','图书馆','à la bibliothèque'],['la pharmacie','药店','devant la pharmacie'],['le centre-ville','市中心','au centre-ville'],['le carrefour','十字路口','au carrefour'],['la station de métro','地铁站','à la station de métro']],note:'地点名称不应脱离冠词记忆；介词与定冠词会构成 au、aux 等形式。'}),
 sec('02 动作方向与参照位置的区别',
 '继续往前走的动作常用 aller tout droit；转弯用 tourner à gauche / à droite；描述某处静态位置可用 en face de、à côté de、près de、entre。先区分“该怎么走”和“地点在哪里”，才能给出不会误导听者的路线。',
 'allez tout droit / tournez à gauche / en face de / à côté de',[
 e('Allez tout droit jusqu’au carrefour.','一直走到十字路口。','jusqu’au 表示到达终点，carrefour 前为 au。'),
 e('Tournez à droite après la banque.','过了银行后右转。','après la banque 是参照地标。'),
 e('La pharmacie est en face de la gare.','药店在火车站对面。','en face de 表示相对位置，不是移动方向。'),
 e('La bibliothèque est à côté du musée.','图书馆就在博物馆旁边。','de + le 合成 du。')
 ],'à gauche 是“向左”，en face de 是“在对面”；二者不能互换。'),
 sec('03 公交、步行和到达用语',
 '交通方式可以用 à pied（步行）、en bus（乘公共汽车）、en métro（乘地铁），还可用 prendre le bus（乘车）。directions 说明途中动作，arriver 表达抵达；换乘和车站名称通常还需要补充数字与目的地信息。',
 'à pied / en bus / prendre le bus / descendre à',[
 e('Vous pouvez y aller à pied.','您可以步行去那里。','à pied 是固定交通方式表达。'),
 e('Prenez le bus numéro dix.','请乘坐十路公共汽车。','prendre + 交通工具。'),
 e('Descendez à la troisième station.','请在第三站下车。','descendre à + 下车地点。'),
 e('Vous arrivez devant le musée.','您会到博物馆门口。','devant le musée 说明抵达位置。')
 ],'不能将“步行去”写成 en pied；惯用表达是 à pied。'),
 sec('04 从问题到可执行的完整指路',
 '完整路线包含起点、方向、转弯位置和目的地四种信息；只有“走过去”或“坐车”不足以让听者真正找到地方。回应时可先估算步行时间，再分句交代行动顺序。',
 '起点 → 直行 → 转弯 → 目的地',[
 e('La gare est à dix minutes à pied.','火车站步行约十分钟。','先说明距离或预计耗时。'),
 e('Allez tout droit, puis tournez à gauche au carrefour.','一直走，然后在十字路口左转。','两个行动按照顺序连接。'),
 e('La gare est en face de la pharmacie.','车站在药店对面。','以熟悉地标核实终点。')
 ],'路线说明必须保持方向顺序：先右转再左转与先左转再右转可能是不同路线。')
 ],
 questions:[
 {question:'填空：Je vais ___ centre-ville.',answer:'au',why:'à + le 缩合为 au；centre-ville 前使用 le。'},
 {question:'把“图书馆在药店对面”翻译成法语。',answer:'La bibliothèque est en face de la pharmacie.',why:'静态对面位置使用 en face de，而不是 tourner。'},
 {question:'改错：Je vais en pied à la gare.',answer:'Je vais à pied à la gare.',why:'步行用惯用表达 à pied，不能使用 en pied。'},
 {question:'安排路线：à gauche / tout droit / au carrefour，写出两步。',answer:'Allez tout droit, puis tournez à gauche au carrefour.',why:'先用 aller tout droit 表示直行，再用 tourner à gauche 表示转向。'}
 ],
 output:'写一段 6–8 轮问路对话：包括礼貌询问、地点、步行或公交方式、两步方向说明、最终地标及致谢。',
 model:[
 e('Excusez-moi, où est la bibliothèque ?','打扰一下，请问图书馆在哪里？','提问地点。'),
 e('Elle est à environ cinq minutes à pied.','步行大约五分钟。','先回答距离。'),
 e('Allez tout droit jusqu’au carrefour.','一直走到十字路口。','第一步方向。'),
 e('Puis tournez à droite.','然后右转。','下一步方向。'),
 e('La bibliothèque est à côté de la pharmacie.','图书馆就在药店旁边。','提供终点地标。'),
 e('Merci beaucoup !','非常感谢！','礼貌结束。')
 ],
 referenceUrls:['https://www.gymglish.com/en/frantastique/french-grammar','https://grammarmama.com/learn/french/'],
 sourceNote:'对应 fr-a1-u09“Se déplacer”；地点、方位和行动指令按真实问路任务组织，非外部教材逐句引用。'
},
{
 id:'fr-past-events-lexicon',type:'vocabulary',language:'fr',level:'A2',unitLink:'fr-a2-u01',
 title:'旅行与过去经历：事件动词、时间线和感受',
 subtitle:'由一次旅程的词语记录发展为有结果的短叙事',
 prerequisite:'掌握 aller / visiter / partir 的基础形式及 passé composé 的常见结构。',
 objective:'能描述出发、抵达、参观、遇到的问题和个人感受，用恰当时间词组织一段过去经历。',
 sections:[
 sec('01 行程阶段对应不同动词',
 '讲旅行时，partir 表示出发，arriver 表示到达，visiter 后通常接参观的地点，rester 表示停留。rentrer 与 retourner 都可表达返回，但具体返回地点和语义不同。学习时应连同目的地介词和 passé composé 助动词记住这些词。',
 'partir de / arriver à / visiter + lieu / rentrer chez soi',[
 e('Nous sommes partis de Paris lundi matin.','我们周一早晨从巴黎出发。','partir de + 出发地点，复合过去时用 être。'),
 e('Nous sommes arrivés à Lyon à midi.','我们中午到达里昂。','arriver à + 目的地。'),
 e('Nous avons visité un musée l’après-midi.','下午我们参观了一座博物馆。','visiter 直接接地点，不要添加 à。'),
 e('Nous sommes restés deux jours.','我们停留了两天。','rester 使用 être 构成复合过去时。')
 ],'Nous avons arrivé 不正确；arriver 在此复合过去时使用 être。也不能写 visiter à un musée 表示参观博物馆。'),
 sec('02 旅行中的住宿和交通搭配',
 '行程叙述常需要补充 prendre le train、réserver une chambre、passer une nuit à l’hôtel。名词 chambre、billet、train 应和动作一起记忆；prendre 和 réserver 是不同阶段的动作：购票、预订、出发和实际入住。',
 'prendre le train / réserver une chambre / passer une nuit',[
 e('J’ai réservé une chambre pour deux nuits.','我预订了一间房住两晚。','réserver une chambre 强调预订；pour 两晚说明用途。'),
 e('Nous avons pris le train tôt le matin.','我们一早乘了火车。','prendre le train 的复合过去时为 avons pris。'),
 e('Le soir, nous avons passé une nuit à l’hôtel.','晚上我们在酒店过了一夜。','passer une nuit 表示过夜。')
 ],'acheter un billet 不等于 prendre le train：一个是购票，一个是乘车。'),
 sec('03 顺序、副作用与感受',
 '同一段叙述中可以使用 d’abord、ensuite、puis、finalement 标记事件顺序；用 malheureusement 引出不顺利的情况，用 heureusement 表示好转。评价体验时，j’ai aimé + 名词与 c’était + 形容词描述角度不同。',
 'd’abord → ensuite → malheureusement → finalement',[
 e('D’abord, nous avons visité le vieux quartier.','首先我们参观了老城区。','d’abord 开启时间线。'),
 e('Malheureusement, notre train a eu du retard.','不巧，我们的火车晚点了。','avoir du retard 表示晚点。'),
 e('Heureusement, nous avons trouvé un autre train.','幸运的是，我们找到了另一班火车。','heureusement 提供转折后的结果。'),
 e('C’était un voyage intéressant.','那是一次有意思的旅行。','c’était 引出对整体旅行的评价。')
 ],'“晚点”在此不应机械翻为 train était tard；更自然的是 le train a eu du retard。'),
 sec('04 把旅行事实写成段落，而非流水词表',
 '一段简短经历至少回答什么时候、去了哪里、做了什么、发生了什么变化以及感受如何。先交代出发和交通，再用两到三个完成动作推进经过，最后用一句个人评价收尾。',
 '时间地点 → 出发交通 → 事件 → 意外 → 结果感受',[
 e('Le mois dernier, nous sommes allés à Bordeaux en train.','上个月我们乘火车去了波尔多。','第一句交代时间、地点与交通。'),
 e('Nous avons visité le centre-ville et rencontré des amis.','我们参观了市中心，还见到了朋友。','两个完成动作组织经历。'),
 e('Il a plu, mais nous avons passé une bonne journée.','下雨了，但我们仍度过了愉快的一天。','转折同时保留主要结果。')
 ],'不应把 j’ai visité 和 je suis allé 任意互换：前者描述参观，后者描述前往。')
 ],
 questions:[
 {question:'完成：Nous ___ (arriver) à Lyon hier.（混合或男性群体）',answer:'sommes arrivés',why:'arriver 复合过去时用 être，nous 对应 sommes，混合/男性复数过去分词为 arrivés。'},
 {question:'纠错：J’ai visité à un musée.',answer:'J’ai visité un musée.',why:'visiter 是直接及物动词，后面直接接参观地点。'},
 {question:'选择：火车“晚点”用 avoir du retard 还是 prendre une chambre？',answer:'avoir du retard',why:'avoir du retard 表示晚点；réserver une chambre 才表示订房。'},
 {question:'怎样用一句话结束旅行短文并给出感受？',answer:'C’était un voyage intéressant.',why:'c’était + 名词和形容词可对整个事件进行回顾评价。'}
 ],
 output:'写 8 句法语讲述一次旅行：日期、出发和到达地点、交通、至少两个活动、一个小意外、最终结果及个人感受。',
 model:[
 e('Le mois dernier, je suis parti à Bordeaux.','上个月我出发去了波尔多。（男性叙述者）','复合过去时说明出行事件。'),
 e('J’ai pris le train tôt le matin.','我一早乘坐火车。','交通搭配。'),
 e('Je suis arrivé à midi.','我中午抵达。（男性叙述者）','交代抵达时间；arriver 用 être。'),
 e('Ensuite, j’ai visité un musée et le vieux centre-ville.','随后我参观了一座博物馆和旧城区。','连续经历。'),
 e('J’ai pris quelques photos pendant la visite.','参观期间我拍了几张照片。','补充行程中的具体活动。'),
 e('Malheureusement, il a plu dans l’après-midi.','可惜下午下雨了。','说明行程变化。'),
 e('Mais j’ai rencontré une amie et nous avons pris un café.','但我见到了一位朋友，我们一起喝了咖啡。','转折及补充。'),
 e('Finalement, j’ai passé un excellent week-end.','最终我度过了一个很棒的周末。','总结体验。')
 ],
 referenceUrls:['https://grammarmama.com/learn/french/','https://www.gymglish.com/en/frantastique/french-lesson'],
 sourceNote:'对应 fr-a2-u01“Récits au passé”，课文与中文说明按旅行时间线原创，注意 être 与 avoir 的过去时区分。'
},
{
 id:'fr-opinions-lexicon',type:'vocabulary',language:'fr',level:'A2',unitLink:'fr-a2-u08',
 title:'表达观点与理由：同意、让步和建议',
 subtitle:'从“我喜欢”过渡到“我的观点是……因为……”',
 prerequisite:'掌握 parce que、mais 和基本的陈述句；能表达简单的偏好。',
 objective:'能提出观点，使用解释原因、对比、补充和结论的词组，并以尊重他人的方式回应不同意见。',
 sections:[
 sec('01 区分偏好、判断与建议',
 'aimer + 名词描述个人喜好；penser que + 句子陈述观点；trouver + 名词/形容词表示评价；à mon avis 标示个人立场。表达建议可使用 on pourrait + 不定式，比直接命令更委婉。',
 'j’aime / je pense que / je trouve… / à mon avis / on pourrait',[
 e('J’aime les livres, mais je préfère les films.','我喜欢书，但更喜欢电影。','aimer 与 préférer 表示不同层次的偏好。'),
 e('Je pense que ce projet est utile.','我认为这个项目有用。','penser que 后面是一个完整分句。'),
 e('À mon avis, cette solution est plus simple.','在我看来，这个方案更简单。','à mon avis 明确这是个人判断。'),
 e('On pourrait commencer plus tôt.','我们可以早点开始。','pourrait + 不定式表达建议，不是强制命令。')
 ],'Je pense de ce projet est utile 错误地插入 de；表达“我认为……”，此处用 penser que + 完整句。'),
 sec('02 连接理由、对比与结果',
 'parce que 引入一个完整的原因分句；car 也可解释原因，常见于书面或说明性语境；mais 表示转折；donc 提示结论或结果；cependant 可引出更明确的对照。先明确两句话之间的真实关系，再选择连接语。',
 '观点 + parce que 原因；事实 + donc 结果；观点 + mais 对照',[
 e('Je préfère le train parce qu’il est pratique.','我更喜欢火车，因为它方便。','parce que 后跟 il est pratique 的完整谓语结构。'),
 e('Le trajet est long, donc je pars tôt.','路程很长，所以我早点出发。','donc 引出基于前因的决定。'),
 e('Le quartier est calme, mais il est loin du centre.','街区很安静，但离市中心很远。','mais 在优点与局限之间建立对比。')
 ],'parce que 与 donc 在一个简单因果连接中不宜同时机械套用成 parce que … donc …；要先判断原因和结果的方向。'),
 sec('03 表达同意及温和反对',
 '回应观点时，je suis d’accord（我同意）、je ne suis pas tout à fait d’accord（我不完全同意）和 je comprends, mais… 可以明确立场同时保持礼貌。补充另一个观点时可使用 en revanche、d’un autre côté 等，但前后应当确实存在对照。',
 'je suis d’accord / je comprends, mais… / d’un autre côté',[
 e('Je suis d’accord avec toi.','我同意你的观点。','être d’accord avec + 人，不能只记 d’accord。'),
 e('Je comprends, mais le prix est trop élevé.','我理解，不过价格太高了。','先承认对方观点，再提出现实限制。'),
 e('D’un autre côté, cet appartement est plus proche de l’université.','另一方面，这套公寓离大学更近。','引入能影响选择的另一项依据。')
 ],'Je suis d’accord à toi 介词不对；应说 d’accord avec toi / avec vous。'),
 sec('04 由一句理由发展为短讨论',
 '完整讨论需要立场、至少一个支持理由、对不同可能性的回应和结论。比较两种选择时，可分别评价时间、费用及便利性。不要为了使用 however 或 cependant 而随意写出没有实际冲突的两句话。',
 '意见 → 支持理由 → 对比限制 → 建议/结论',[
 e('À mon avis, le bus est une bonne solution.','我认为公交车是一个不错的选择。','明确主张。'),
 e('Il coûte moins cher que le taxi.','它比出租车便宜。','支持观点的比较依据。'),
 e('Cependant, il est parfois moins rapide.','然而，有时它比较慢。','承认局限。'),
 e('On pourrait donc prendre le bus quand on a assez de temps.','所以当时间充裕时我们可以乘公交车。','提出有条件的建议，避免绝对化。')
 ],'价格便宜不等于任何情况下都最好；应把建议限定到具体的时间或交通需求。')
 ],
 questions:[
 {question:'翻译：我认为这个地方很安静。',answer:'Je pense que cet endroit est calme.',why:'penser que 后接完整陈述句 cet endroit est calme。'},
 {question:'填空：Je suis d’accord ___ toi.',answer:'avec',why:'d’accord avec quelqu’un 表示同意某人的观点。'},
 {question:'连接因果：Le train est pratique. Je le préfère.（使用 parce que）',answer:'Je préfère le train parce qu’il est pratique.',why:'parce que 后为原因分句，元音开头 il 前发生省音。'},
 {question:'用一句话委婉提出“我们可以早点出发”。',answer:'On pourrait partir plus tôt.',why:'on pourrait + 动词原形表达建议，语气比祈使句柔和。'}
 ],
 output:'用 8–10 句法语讨论公交车与出租车的选择：立场、两条理由、一个让步、一个比较和带条件的结论。',
 model:[
 e('À mon avis, le bus est plus économique.','我认为公交车更经济。','开头立场。'),
 e('Je le préfère parce qu’il coûte moins cher.','我更喜欢它，因为它价格低。','原因。'),
 e('Cependant, le taxi est parfois plus rapide.','然而出租车有时更快。','承认不同方面。'),
 e('Le trajet en bus prend plus de temps aux heures de pointe.','高峰期乘公交车更费时间。','用具体情境解释速度差异。'),
 e('Je comprends cet argument, mais le prix compte aussi.','我理解这一点，但价格也很重要。','回应他人的观点。'),
 e('En outre, il est plus facile de prévoir les dépenses en bus.','此外，乘公交车更容易预估开支。','添加新的支持理由。'),
 e('Pour un trajet urgent, le taxi peut néanmoins être préférable.','如果行程紧急，出租车可能仍是更好的选择。','承认相反选择有其适用条件。'),
 e('On pourrait donc prendre le bus si nous avons assez de temps.','所以如果时间充裕，我们可以乘公交车。','带条件的建议。')
 ],
 referenceUrls:['https://grammarmama.com/learn/french/','https://www.gymglish.com/en/frantastique/french-grammar'],
 sourceNote:'对应 fr-a2-u08“Opinions et raisons”，依据现有“原因与简单从句”课程目标撰写原创观点对话。'
}
];