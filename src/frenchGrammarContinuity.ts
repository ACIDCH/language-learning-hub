import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const ex=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Chapter explanations, examples and answers are newly authored; references validate the individual language rules. */
export const FRENCH_GRAMMAR_CONTINUITY:SpecialtyLesson[]=[
{
 id:'fr-possessive-determiners-a1',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u03',
 title:'物主限定词：mon / ma / mes 与所有者表达',subtitle:'由名词阴阳性进入家庭成员和所属关系',
 prerequisite:'会辨认名词的阴阳性、单复数；认识 je、tu、il/elle、nous 和 vous。',
 objective:'准确选择 mon/ma/mes、son/sa/ses 等形式，解释它们如何与被拥有的名词配合，并用完整句介绍人物关系。',
 sections:[
 sec('01 先看被拥有的名词，再看谁拥有',
 'mon、ma、mes 分别修饰阳性单数、阴性单数和复数名词；形容词形式不能由中文“我的”统一决定。选择时先确定物主是谁，再检查紧接着的名词的性、数。',
 'mon frère / ma sœur / mes amis',[
 ex('Mon frère habite à Lyon.','我的兄弟住在里昂。','frère 为阳性单数，用 mon。'),
 ex('Ma sœur étudie le droit.','我姐姐学习法律。','sœur 为阴性单数，用 ma。'),
 ex('Mes amis viennent demain.','我的朋友们明天来。','amis 为复数，选 mes，不分阴阳性。')
 ],'不能写 ma frère 或 mon sœurs；必须看名词的性数，而不是看物主的性别。',
 {title:'物主限定词常用形式',columns:['物主','阳性单数','阴性单数','复数'],
 rows:[['je','mon','ma','mes'],['tu','ton','ta','tes'],['il / elle','son','sa','ses'],['nous','notre','notre','nos'],['vous','votre','votre','vos'],['ils / elles','leur','leur','leurs']],
 note:'son frère 可以是“他的兄弟”也可以是“她的兄弟”；性数标记修饰的是 frère。'}),
 sec('02 son / sa 不说明所有者的性别',
 'son、sa、ses 可以对应“他的、她的、它的”，关键取决于所属名词的语法性别和数量。法语使用上下文辨明所有者；只看到 sa mère 无法判断是“他的母亲”还是“她的母亲”。',
 'son père / sa mère / ses parents',[
 ex('Paul parle avec sa mère.','保罗正在和他的母亲交谈。','mère 阴性，因此用 sa；所有者由 Paul 确定。'),
 ex('Marie présente son père.','玛丽介绍自己的父亲。','père 阳性，即使所有者是 Marie 也用 son。'),
 ex('Ils visitent leurs grands-parents.','他们探望祖父母。','多个祖父母属于复数，用 leurs。')
 ],'sa 不等于英语 her；例如 Marie parle à son frère 仍指玛丽的兄弟。'),
 sec('03 元音前的 mon、ton、son',
 '阴性单数名词若以元音或哑音 h 开头，为避免相邻元音，通常使用 mon、ton、son，而不是 ma、ta、sa；名词的性别并未改变。书写时要同时考虑词语拼写和常见连读。',
 'mon amie / ton école / son histoire',[
 ex('Mon amie arrive à midi.','我的一位女性朋友中午到达。','amie 是阴性单数，元音开头，仍选 mon。'),
 ex('Ton école est près de la gare.','你的学校在车站附近。','école 为阴性单数且元音开头，用 ton。'),
 ex('Son histoire est intéressante.','他／她讲的故事很有意思。','histoire 是哑音 h 开头的阴性名词，用 son。')
 ],'不能因 mon amie 中有 mon 就把 amie 误判为阳性；可用 une amie 检查其阴性。'),
 sec('04 写连贯人物介绍，避免指代混乱',
 '先介绍一个明确的人物及其家庭关系，再用物主限定词补充职业、住址或习惯。如果段落中出现两名以上可能的所有者，重复姓名比连续使用 son、sa 更能消除歧义。',
 '姓名与关系 → 所属名词 → 地点或活动 → 复述确认',[
 ex('Voici Léa et son frère Thomas.','这是莱娅和她的兄弟托马。','明确 Léa 是所有者。'),
 ex('Leurs parents habitent à Nantes.','他们的父母住在南特。','leurs 表示复数所拥有的人。'),
 ex('Thomas aime son école, mais Léa préfère la sienne.','托马喜欢他的学校，而莱娅更喜欢她自己的学校。','son école 是物主限定词；la sienne 是替代名词的物主代词，两者不同。')
 ],'la sienne 不能直接放在 école 前当限定词；它是代词。A1 重点先掌握 mon/ma/mes 等修饰名词的形式。')
 ],
 questions:[
 {question:'填空：___ sœur est étudiante.（我的）',answer:'Ma',why:'sœur 为阴性单数且以辅音开头，使用 ma。'},
 {question:'填空：Marie téléphone à ___ frère.（她的）',answer:'son',why:'frère 为阳性单数；即使所有者是 Marie 也用 son。'},
 {question:'纠错：Ma amie travaille ici.',answer:'Mon amie travaille ici.',why:'amie 是阴性但元音开头，物主限定词用 mon。'},
 {question:'填空：Nous visitons ___ amis.（我们的）',answer:'nos',why:'nous 的复数物主限定词为 nos，与 amis 的复数配合。'}
 ],
 output:'用六至八句法语介绍两名家人及其生活，正确使用 mon/ma/mes 和 son/sa/ses，并至少解释一次指代的所有者。',
 model:[
 ex('Voici ma sœur Élise et mon frère Hugo.','这是我的姐姐埃莉丝和弟弟雨果。','阴性和阳性名词交替出现。'),
 ex('Ma sœur travaille à Toulouse.','我姐姐在图卢兹工作。','名词明确主语。'),
 ex('Son bureau est près de la gare.','她的办公室靠近车站。','此处 son 指代 Élise 的办公室。'),
 ex('Mon frère est étudiant.','我弟弟是学生。','重现姓名关系，避免误指。'),
 ex('Ses amis étudient avec lui.','他的朋友们和他一起学习。','ses 根据 amis 的复数确定。'),
 ex('Notre famille se retrouve le dimanche.','我们一家星期日聚在一起。','notre + 阴性单数 famille。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/det6.html','https://www.laits.utexas.edu/tex/gr/pro12.html'],
 sourceNote:'对应 fr-a1-u03 的 possessifs 与家庭介绍。六列配合及元音例外经 Tex 规则核查；例句和中文释义独立编写。'
},
{
 id:'fr-imperative-directions-a1',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u09',
 title:'祈使式：指路、建议与礼貌请求',subtitle:'tu / nous / vous 三种形式和动作顺序',
 prerequisite:'已学习现在时常见动词、tu / vous 区别和地点、方向语块。',
 objective:'构造 tu、nous、vous 祈使式，区分 -er 动词 tu 词尾与 vas-y 等形式，结合地点和方向说明完整路线。',
 sections:[
 sec('01 去掉主语，保留正确的动词形式',
 '祈使式表达指令或共同建议，主要使用 tu、nous、vous 三种人称。形式通常来自现在时并去掉主语代词。对陌生人指路时，vous 形式通常比直接用 tu 更得体。',
 'Tourne ! / Tournons ! / Tournez !',[
 ex('Tournez à droite au carrefour.','请在十字路口右转。','vous 的祈使式 tournez 用于礼貌指路。'),
 ex('Tournons à gauche ici.','我们在这里左转吧。','nous 的形式 tournons 带共同提议的语气。'),
 ex('Écoute bien les indications.','认真听说明。','tu 的 -er 规则祈使式通常去掉结尾 -s。')
 ],'不能写 Tu tournez 或 Tournes à droite 作为规则 -er 的普通 tu 祈使式。',
 {title:'tourner 的三种人称',columns:['人称','陈述现在时','祈使式'],
 rows:[['tu','tu tournes','tourne'],['nous','nous tournons','tournons'],['vous','vous tournez','tournez']],
 note:'tu 的普通 -er 祈使式一般不带 -s，但 en/y 等代词连用时需另看结构。'}),
 sec('02 tu 形式的词尾与特殊提示',
 '规则 -er 动词以及 aller 的 tu 祈使式通常不保留现在时的 -s：regarde、va。与 y 或 en 连接时常重新出现 -s，如 vas-y、parles-en，用来改善读音；不能把这一特殊形式当成全部 -er 指令的默认词尾。',
 'Va ! → Vas-y ! / Parle ! → Parles-en !',[
 ex('Va à la gare, puis prends le bus.','去车站，然后乘公共汽车。','va 是 aller 的 tu 祈使式；prends 是 prendre 的 tu 祈使式。'),
 ex('Vas-y maintenant.','现在就去吧。','y 附于 va 后，书写为 vas-y。'),
 ex('Parles-en avec ton professeur.','和你的老师谈谈这件事。','en 附于 parle 后，使用 parles-en。')
 ],'普通 Va à la gare 不写 Vas à la gare；只有合适的代词结构才写 vas-y。'),
 sec('03 肯定与否定指令的位置',
 '基本否定祈使式用 ne…pas 包围动词；肯定祈使句若后接代词，位置可能与普通陈述句不同。初级路线表达先使用不带宾语代词的清晰形式，再在 vas-y / n’y va pas 等常见句中识别位置变化。',
 'Ne tournez pas ! / Vas-y ! / N’y va pas !',[
 ex('Ne tournez pas à gauche.','不要左转。','ne…pas 包围 tournez，方向词在后。'),
 ex('N’y va pas seul.','不要独自去那里。','否定时 y 回到动词前，写 n’y va pas。'),
 ex('Prenez la première rue à droite.','请走右侧第一条街。','肯定祈使句直接补充宾语和方向。')
 ],'不要把 Vas-y 的顺序直接搬到否定句写成 Ne vas-y pas；应使用 N’y va pas。'),
 sec('04 把指令组合成能走通的路线',
 '完整指路包括起点、行动顺序、转弯位置和终点。先明确对方要去哪里，再用 allez tout droit、tournez、continuez 等动词给出可执行动作；至少提供一个地标帮助确认目的地。',
 'Allez tout droit → Tournez → Continuez → Vous arrivez…',[
 ex('Allez tout droit jusqu’au feu.','一直走到红绿灯处。','jusqu’au 指出第一阶段终点。'),
 ex('Tournez à gauche, puis continuez pendant deux minutes.','左转，然后继续走两分钟。','tournez 与 continuez 均为 vous 祈使式。'),
 ex('La pharmacie se trouve en face de la bibliothèque.','药店就在图书馆对面。','用静态位置完成路线交代。')
 ],'只有 Tournez ! 不足以准确指路；缺少参照地点与先后次序，听者可能无法执行。')
 ],
 questions:[
 {question:'把 Vous tournez à gauche. 改成祈使句。',answer:'Tournez à gauche.',why:'vous 祈使式去掉主语，保留 tournez。'},
 {question:'纠错：Tournes à droite !（对熟人）',answer:'Tourne à droite !',why:'普通规则 -er 动词的 tu 祈使式通常去掉 -s。'},
 {question:'将 Va ! 加入表示“那里”的代词 y。',answer:'Vas-y !',why:'va 与 y 连用时出现连接 -s，并用连字符。'},
 {question:'把 Tournez à droite. 改成否定祈使句。',answer:'Ne tournez pas à droite.',why:'基本否定用 ne…pas 包围祈使式动词 tournez。'}
 ],
 output:'写六轮法语问路对话：问目的地、两条转向指令、一次不要走错路的否定提示和终点确认；统一使用 vous。',
 model:[
 ex('Excusez-moi, comment aller à la gare ?','打扰一下，怎样去火车站？','礼貌询问目的地。'),
 ex('Allez tout droit jusqu’au feu.','直走到红绿灯处。','第一步。'),
 ex('Puis tournez à gauche.','然后左转。','第二步。'),
 ex('Ne prenez pas la rue à droite.','不要走右边那条路。','否定提醒。'),
 ex('Continuez jusqu’à la pharmacie.','继续走到药店。','用地标核实路线。'),
 ex('La gare est juste en face.','车站就在正对面。','给出终点。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tai1.html','https://www.laits.utexas.edu/tex/gr/tai2.html'],
 sourceNote:'对应 fr-a1-u09 指路主题。祈使式人称、tu -s 省略及 y/en 位置据 Tex 核验，场景对话原创。'
},
{
 id:'fr-comparisons-a2',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u06',
 title:'比较级与最高级：价格、质量和选择',subtitle:'plus / moins / aussi…que 与 meilleur / mieux',
 prerequisite:'认识形容词性数配合，能描述物品特点和基本价格。',
 objective:'能比较至少两种商品或服务，正确区别形容词与副词比较，使用最高级提出有依据的选择。',
 sections:[
 sec('01 先选比较方向，再检查形容词配合',
 '形容词比较常用 plus…que（更）、moins…que（更不）、aussi…que（一样）。形容词仍与被描述的名词性数配合；比较对象在 que 后。选择方向必须由情境事实决定。',
 'plus / moins / aussi + adjectif + que',[
 ex('Ce sac est plus léger que celui-là.','这个包比那个轻。','léger 形容阳性 sac。'),
 ex('Cette veste est moins chère que l’autre.','这件外套比另一件便宜。','chère 与阴性 veste 配合。'),
 ex('Ces chaussures sont aussi confortables que les autres.','这双鞋和其他鞋同样舒适。','chaussures 复数，confortables 随之变化。')
 ],'不能写 Cette veste est moins cher；形容词必须与 veste 的阴性一致。',
 {title:'三种比较关系',columns:['比较关系','构造','示例'],rows:[['更…','plus + 形容词 + que','plus léger que'],['不如…','moins + 形容词 + que','moins cher que'],['和…一样','aussi + 形容词 + que','aussi grand que']],note:'表中是比较结构，具体比较是否成立仍由实际商品信息决定。'}),
 sec('02 形容词 bon 与副词 bien 不同',
 'bon 修饰名词，其不规则比较级是 meilleur；bien 描述动作或表现，其比较级是 mieux。不能因为中文都译成“好、更好”就交换。形容词 meilleur 还要随名词变化为 meilleure、meilleurs、meilleures。',
 'un meilleur choix / elle travaille mieux',[
 ex('Ce restaurant est meilleur que l’autre.','这家餐厅比另一家更好。','restaurant 阳性，用 meilleur。'),
 ex('Cette solution est meilleure.','这个方案更好。','solution 阴性，用 meilleure。'),
 ex('Aujourd’hui, je travaille mieux qu’hier.','今天我比昨天工作得更好。','mieux 修饰 travailler 的方式。')
 ],'不能写 plus bon 或 plus bien 表示常见的“更好”；通常分别用 meilleur、mieux。'),
 sec('03 从两者比较到群体最高级',
 '最高级通常用 le / la / les plus（最）或 le / la / les moins（最不）+ 形容词；范围常由 de + 群体表示。形容词的位置有时影响冠词位置，初级先使用常见的表语结构以保持清晰。',
 'le / la / les plus + adjectif + de + groupe',[
 ex('C’est le magasin le moins cher du quartier.','这是街区里最便宜的商店。','le moins cher 需要明确比较范围。'),
 ex('Cette bibliothèque est la plus calme de la ville.','这家图书馆是城里最安静的。','la 与阴性 bibliothèque 对应。'),
 ex('Ce sont les options les plus pratiques.','这些是最方便的选项。','les plus pratiques 修饰复数 options。')
 ],'“最好”只有明确同类比较范围才有意义；不能把 le meilleur 当作无需语境的客观认证。'),
 sec('04 用实际指标比较，再提出条件化建议',
 '比较商品或服务时，先说价格、距离、时间等可核对指标，再说明权衡。便宜不必然最合适，可以依据出行时间、质量或其他要求给出有条件的建议。',
 'prix → comparaison → limite → choix',[
 ex('Le bus est moins cher que le taxi.','公交车比出租车便宜。','先明确价格维度。'),
 ex('Cependant, le taxi peut être plus rapide le soir.','不过晚上出租车可能更快。','peut être 表示条件下的可能性。'),
 ex('Si nous avons le temps, le bus est un meilleur choix pour notre budget.','如果时间充裕，考虑预算公交车是更好的选择。','将结论限制在预算条件下。')
 ],'plus rapide 不是“绝对最好”；应保留时间与费用等实际选择条件。')
 ],
 questions:[
 {question:'填空：Cette robe est plus ___ (cher) que l’autre.',answer:'chère',why:'robe 是阴性单数，cher 需变 chère。'},
 {question:'选择：Il travaille meilleur / mieux qu’avant.',answer:'mieux',why:'修饰动词 travailler 的表现需要副词 mieux。'},
 {question:'改错：Ce restaurant est plus bon.',answer:'Ce restaurant est meilleur.',why:'bon 的不规则比较级为 meilleur。'},
 {question:'翻译：这是这里最安静的房间。',answer:'C’est la chambre la plus calme d’ici.',why:'chambre 为阴性，最高级用 la plus；d’ici 界定范围。'}
 ],
 output:'用六至八句法语比较两种交通方式或商店，明确价格、便利性、质量各至少一项，使用比较级、最高级及有条件的最终选择。',
 model:[
 ex('Je compare deux moyens de transport.','我比较两种交通方式。','设定比较对象。'),
 ex('Le bus est moins cher que le taxi.','公交车比出租车便宜。','价格维度。'),
 ex('Le taxi est parfois plus rapide.','出租车有时候更快。','速度维度和限定。'),
 ex('Pour ce trajet court, le bus est aussi confortable que le taxi.','对于这段短途，公交车和出租车一样舒适。','在特定路程内比较舒适度。'),
 ex('À mon avis, le bus est le meilleur choix pour notre budget.','在我看来，考虑预算公交车是最佳选择。','最高级与条件衔接。'),
 ex('Mais si nous sommes pressés, je préfère prendre un taxi.','不过如果我们赶时间，我更愿意打车。','最终根据条件选择。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/adj6.html','https://www.laits.utexas.edu/tex/gr/adj7.html','https://grammarmama.com/fr/learn/french/a2/superlative-adjectives/'],
 sourceNote:'对应 fr-a2-u06 比较级/最高级、价格和服务。规则据 Tex/GrammarMama 交叉核对，表格与对话为新稿。'
},
{
 id:'fr-futur-simple-a2',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u07',
 title:'简单将来时：词干、结尾与预测',subtitle:'从最近将来时进阶到清晰的将来陈述',
 prerequisite:'会使用 aller + 不定式的最近将来时；认识 -er、-ir、-re 词典形式。',
 objective:'能形成六个人称的简单将来时，识别常见不规则词干，并区分语体与时间表达。',
 sections:[
 sec('01 所有动词共享一套将来时词尾',
 '简单将来时的词尾为 -ai、-as、-a、-ons、-ez、-ont。规则 -er、-ir 动词通常以整个不定式作词干；规则 -re 动词先去掉末尾 -e。变位后无需再添加 aller。',
 'parler → parlerai / finir → finira / vendre → vendrons',[
 ex('Je parlerai au professeur demain.','我明天会和老师谈。','parler + -ai 形成 parlerai。'),
 ex('Elle finira ses devoirs ce soir.','她今晚会完成作业。','finir + -a 形成 finira。'),
 ex('Nous vendrons notre voiture l’année prochaine.','我们明年将卖掉汽车。','vendre 去掉末尾 e，再加 -ons。')
 ],'不能写 je parlera 或 je vendreons；首先核查主语对应的词尾，再决定词干。',
 {title:'parler 简单将来时',columns:['主语','词尾','变位'],rows:[['je','-ai','parlerai'],['tu','-as','parleras'],['il / elle','-a','parlera'],['nous','-ons','parlerons'],['vous','-ez','parlerez'],['ils / elles','-ont','parleront']],note:'-ai/-as/-a 等是将来时词尾，与 avoir 的现在时对应，但不能把它们当作额外助动词。'}),
 sec('02 常见不规则词干必须和词尾分开记',
 'être、avoir、aller、faire 等常用动词改变将来词干，但词尾仍是同一套。先识别 ser-、aur-、ir-、fer-，再按主语选择词尾；pouvoir→pourr-、vouloir→voudr- 也常出现于未来安排与礼貌说明。',
 'ser- / aur- / ir- / fer- + 将来时词尾',[
 ex('Je serai disponible lundi.','我星期一有空。','être → ser-，je 对应 -ai。'),
 ex('Nous aurons plus de temps demain.','我们明天会有更多时间。','avoir → aur-，nous 对应 -ons。'),
 ex('Ils iront à Paris en été.','他们夏天会去巴黎。','aller → ir-，ils 对应 -ont。'),
 ex('Vous pourrez confirmer plus tard.','您可以稍后确认。','pouvoir → pourr-，vous 对应 -ez。')
 ],'不能凭 être 的现在时 suis 机械推算未来时；应该记住 je serai、nous serons。'),
 sec('03 futur proche 与 futur simple 的主要差别',
 '最近将来时 aller + 不定式常见于日常口语的计划和意图，简单将来时常见于书面、正式说明及预测。两者都可表示近或远的将来，不能规定“最近将来只用于今天，简单将来只能用于明年”。',
 'je vais partir ↔ je partirai',[
 ex('Je vais appeler ma sœur ce soir.','我今晚打算给姐姐打电话。','口语中自然表达已有计划。'),
 ex('Je l’appellerai ce soir.','我今晚会打电话给她。','简单将来时也可说明今晚的行动。'),
 ex('La semaine prochaine, nous visiterons le musée.','下周我们将参观博物馆。','正式陈述未来安排。')
 ],'二者的差异不是由日历天数决定，而由语境、语体和说话意图共同决定。'),
 sec('04 将时间、条件和未来行动组合成段落',
 '明确未来安排通常需要时间、行动、结果或限制。对将来情况作出预测时保留可能性与前提，不需要为每个句子重复 demain。使用 quand 引导未来事件时，法语标准表达常在从句中使用将来时。',
 '时间 → futur simple → 条件或后续行动',[
 ex('Quand nous arriverons, nous chercherons un hôtel.','我们抵达后会找一家酒店。','quand 后表示将来的 arriverons。'),
 ex('Si nous avons le temps, nous visiterons aussi le musée.','如果时间允许，我们还会参观博物馆。','si 的现实条件从句用现在时，主句用将来时。'),
 ex('Nous rentrerons dimanche soir.','我们星期日晚上会回来。','结尾说明计划时间。')
 ],'现实条件句不能机械写成 Si nous aurons le temps；此处 si 后应为现在时 avons。')
 ],
 questions:[
 {question:'完成：Nous ___ (finir) demain.',answer:'finirons',why:'规则 -ir 动词保留 finir- 加 nous 的 -ons。'},
 {question:'填空：Je ___ (être) libre lundi.',answer:'serai',why:'être 的将来词干为 ser-，je 词尾是 -ai。'},
 {question:'改错：Je vais parlerai demain.',answer:'Je vais parler demain. / Je parlerai demain.',why:'最近将来时与简单将来时不能叠加；前者 aller + 不定式，后者单一变位。'},
 {question:'改错：Si nous aurons le temps, nous irons au musée.',answer:'Si nous avons le temps, nous irons au musée.',why:'现实未来条件句 si 后用现在时，主句可以用将来时。'}
 ],
 output:'写六至八句法语介绍下周行程，包含至少四个简单将来时、一个不规则词干、一个 si 条件句和一个 quand 时间句。',
 model:[
 ex('Lundi, je serai disponible après les cours.','周一课后我有空。','être 的将来时。'),
 ex('Mardi, nous préparerons notre visite.','周二我们会准备参观活动。','规则 -er 将来时。'),
 ex('Nous prendrons le train vendredi matin.','周五上午我们将乘火车。','prendre 的将来时。'),
 ex('Quand nous arriverons, nous déjeunerons ensemble.','抵达后我们一起吃午饭。','未来时间从句。'),
 ex('Si nous avons le temps, nous visiterons un musée.','若有时间我们会参观博物馆。','si 现在时 + 主句将来时。'),
 ex('Nous rentrerons dimanche soir.','我们周日晚上回来。','行程收尾。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/taf2.html','https://www.laits.utexas.edu/tex/gr/taf3.html','https://www.laits.utexas.edu/tex/gr/taf4.html'],
 sourceNote:'对应 fr-a2-u07 futur simple 与邀请。规则核查 Tex simple future 三篇；教学例句和计划段落新写。'
},
{
 id:'fr-negative-scope-a2',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u11',
 title:'否定表达的范围：plus、jamais、rien、personne',subtitle:'从简单“不”到“不再”“从不”“没有东西/人”',
 prerequisite:'能够构造 ne…pas、常见现在时和 passé composé，认识代词与宾语。',
 objective:'根据语义选择 ne…plus/jamais/rien/personne，区分其否定范围，并在复合过去时与代词结构中正确安排位置。',
 sections:[
 sec('01 不同的否定词回答不同问题',
 'ne…plus 表示某状态或动作不再延续；ne…jamais 表示从不；ne…rien 表示没有任何事物；ne…personne 表示没有任何人。不能只根据汉语“不”选择同一个表达，必须先判断否定对象与时间。',
 'ne…plus / ne…jamais / ne…rien / ne…personne',[
 ex('Je ne travaille plus ici.','我不再在这里工作。','plus 表示过去有、现在不再持续。'),
 ex('Je ne prends jamais le bus.','我从不乘公交车。','jamais 否定发生频率。'),
 ex('Je ne vois rien dans cette pièce.','我在这间房里什么也看不见。','rien 否定物。'),
 ex('Je ne connais personne dans cette ville.','这座城里我一个人也不认识。','personne 否定人。')
 ],'plus 并非 jamais 的同义词；前者含状态改变，后者否定频率。',
 {title:'基本否定范围',columns:['形式','主要含义','正常回答对象'],rows:[['ne…pas','不','普通判断'],['ne…plus','不再','停止延续'],['ne…jamais','从不','频率'],['ne…rien','什么也不','事物'],['ne…personne','谁也不','人物']],note:'否定范围取决于动词、宾语和上下文；不能只看一个汉字翻译。'}),
 sec('02 两部分的位置与复合过去时',
 '在简单时态中 ne 通常在变位动词前，plus / jamais / rien 多放在变位动词后；在复合过去时中，它们通常放在助动词后、过去分词前。personne 作宾语时常放在过去分词之后。',
 'Je n’ai jamais vu… / Je n’ai rien trouvé. / Je n’ai vu personne.',[
 ex('Je n’ai jamais visité Bordeaux.','我从未去波尔多游览过。','jamais 放在助动词 ai 后面。'),
 ex('Nous n’avons rien trouvé.','我们什么也没找到。','rien 放在 avons 与 trouvé 之间。'),
 ex('Je n’ai rencontré personne hier.','我昨天谁也没遇到。','personne 作宾语通常放过去分词后面。')
 ],'不能把所有否定词按同一位置套用；尤其要区分 rien 与 personne 在复合过去时中的常见位置。'),
 sec('03 否定主语与单独回答',
 'personne 和 rien 也能充当句子主语：Personne n’est venu、Rien n’a changé。作为主语时，否定词位于句首，动词前仍有 ne / n’。短答“Personne.”“Rien.”本身成立，不需要强行补 pas。',
 'Personne ne… / Rien ne… / réponse : Rien.',[
 ex('Personne ne répond au téléphone.','没有人接电话。','personne 作主语。'),
 ex('Rien n’a changé depuis hier.','从昨天以来什么也没变。','rien 作主语，复合过去时前有 n’。'),
 ex('Tu as vu quelque chose ? — Rien.','你看到什么了吗？——什么也没有。','rien 可作为简短回答。')
 ],'不能写 Personne pas répond；标准书面表达需要 Personne ne répond。'),
 sec('04 用否定回答实际问题，不改变原问题范围',
 '选择否定表达前，先确认对方问的是还做不做、有没有做过、有没有见到人或发现物。回答可以先直接陈述，再补原因或时间，避免把“没有做过”误说成“以后不再做”。',
 '问题 → 否定词 → 事实补充',[
 ex('Tu prends encore ce bus ? — Non, je ne le prends plus.','你还坐这趟公交车吗？——不了，我不再坐了。','encore 与 plus 构成持续状态的对照。'),
 ex('Tu as déjà visité cette ville ? — Non, je ne l’ai jamais visitée.','你去过这座城市吗？——没有，我从来没去过。','jamais 否定到目前为止的经历；visitée 与前置阴性直接宾语配合。'),
 ex('Tu attends quelqu’un ? — Non, je n’attends personne.','你在等人吗？——没有，我没在等任何人。','personne 否定等待的对象。')
 ],'“从未去过”不能用 ne…plus 表达，否则会暗示以前可能曾去过。')
 ],
 questions:[
 {question:'翻译：我不再在这家咖啡馆工作。',answer:'Je ne travaille plus dans ce café.',why:'plus 表示过去做过而现在已经停止。'},
 {question:'填空：Je n’ai ___ vu ce film.（从未）',answer:'jamais',why:'过去经历中的从未用 jamais，位于助动词 ai 后面。'},
 {question:'改错：Je n’ai personne rencontré.',answer:'Je n’ai rencontré personne.',why:'personne 作动词宾语时常位于复合过去时的过去分词后。'},
 {question:'填空：___ ne répond.（没有任何人）',answer:'Personne',why:'personne 可以在句首充当否定主语，动词前保留 ne。'}
 ],
 output:'写六轮法语日常问答，分别表达不再、从未、什么也没发现、谁也没遇到，并用两句说明改变的原因。',
 model:[
 ex('Tu prends encore le train ?','你还坐火车吗？','围绕持续习惯提问。'),
 ex('Non, je ne le prends plus.','不，我现在不坐了。','ne…plus。'),
 ex('Tu as déjà visité Nice ?','你去过尼斯吗？','围绕经历提问。'),
 ex('Non, je n’ai jamais visité cette ville.','不，我从没去过这座城市。','ne…jamais。'),
 ex('Tu as trouvé tes clés ? — Non, je n’ai rien trouvé.','你找到钥匙了吗？——没有，我什么也没找到。','ne…rien。'),
 ex('Tu attends quelqu’un ? — Non, je n’attends personne.','你在等人吗？——没有，我不等任何人。','ne…personne。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/neg3.html','https://www.laits.utexas.edu/tex/gr/neg5.html'],
 sourceNote:'复合过去时与多种否定结构的对照，关联 fr-a2-u11 日常新闻及交流；规则用 Tex 核查，中文解析原创。'
}
];