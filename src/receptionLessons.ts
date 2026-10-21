export type ReceptionLesson={title:string;language:'fr'|'en';genre:string;paragraphs:{id:string;target:string;zh:string}[];
 questions:{prompt:string;answer:string;evidence:string[];why:string}[];languageNotes:{target:string;zh:string}[];task:string;model:string;modelZh:string;references:string[]};
/** Original teaching scenarios. Names, institutions and events below are fictional, not reported research. */
export const RECEPTION_LESSONS:Record<string,ReceptionLesson>={
 "fr-a1-u06":{
 "title": "À l’accueil : comprendre un horaire et trouver sa salle",
 "language": "fr",
 "genre": "原创 A1 校园情境听读（设备朗读；无匹配真人录音）",
 "paragraphs": [
  {
   "id": "P1",
   "target": "Léa arrive dans une école de langues. Elle cherche la salle de français. Elle parle à une personne à l’accueil : « Bonjour, excusez-moi. Où est la salle de français ? » La personne répond : « Elle est au deuxième étage, près de l’escalier. » Léa remercie la personne et regarde le plan du bâtiment.",
   "zh": "莉娅到了一所语言学校，正在找法语教室。她向接待处的工作人员询问：“您好，打扰一下，法语教室在哪里？”对方回答：“在二楼，楼梯附近。”莉娅表示感谢，并查看建筑平面图。"
  },
  {
   "id": "P2",
   "target": "Léa demande ensuite : « Est-ce que le cours commence à dix heures ? » La personne répond : « Non, il commence à dix heures et demie et finit à midi. » Léa répète : « À dix heures et demie ? » « Oui, c’est bien ça », confirme la personne. Le cours dure donc une heure et demie.",
   "zh": "莉娅接着问：“课程是十点开始吗？”工作人员回答：“不是，十点半开始，中午十二点结束。”莉娅重复确认：“十点半？”对方说：“对，没错。”因此这节课持续一个半小时。"
  },
  {
   "id": "P3",
   "target": "Devant l’escalier, Léa rencontre Amir. Il cherche aussi la salle, mais il pense que le cours est au premier étage. Léa lui explique : « Non, la salle est au deuxième étage. Elle est près de l’escalier. » Amir demande : « Et qui est le professeur aujourd’hui ? » Léa répond : « C’est Madame Martin. »",
   "zh": "在楼梯前，莉娅遇到了阿米尔。他也在找教室，但以为课程在一楼。莉娅解释：“不是，教室在二楼，靠近楼梯。”阿米尔问：“那么今天谁是老师？”莉娅回答：“是马丁女士。”"
  },
  {
   "id": "P4",
   "target": "Amir n’a pas bien entendu le nom. Il dit : « Pardon, vous pouvez répéter, s’il vous plaît ? » Léa répond lentement : « Madame Martin. » Ils trouvent enfin la salle. Amir vérifie l’heure : « Le cours commence bien à dix heures et demie ? » Léa confirme. Ils entrent dans la classe avant le début du cours.",
   "zh": "阿米尔没有听清名字，于是说：“抱歉，您能再说一遍吗？”莉娅慢慢重复：“马丁女士。”两人终于找到了教室。阿米尔再次确认时间：“课程确实是十点半开始，对吗？”莉娅予以确认。他们在上课前走进教室。"
  }
 ],
 "questions": [
  {
   "prompt": "课程实际几点开始、几点结束？请标明段落。",
   "answer": "À dix heures et demie ; à midi.",
   "evidence": [
    "P2"
   ],
   "why": "P2 先否定 dix heures，再明确 dix heures et demie；结束时间为 midi。"
  },
  {
   "prompt": "教室在几楼？Amir 起初误以为在哪里？",
   "answer": "Au deuxième étage ; Amir pensait qu'elle était au premier étage.",
   "evidence": [
    "P1",
    "P3"
   ],
   "why": "P1 和 P3 均明确为二楼；P3 说明 Amir 起初的误解是一楼。"
  },
  {
   "prompt": "谁是今天的法语教师？哪一段提供姓名？",
   "answer": "Madame Martin.",
   "evidence": [
    "P3",
    "P4"
   ],
   "why": "P3 首次给出老师姓名，P4 因未听清而重复确认。"
  },
  {
   "prompt": "为什么 Amir 请求重复？这是确认时间还是听清姓名？",
   "answer": "Il n'a pas bien entendu le nom de Madame Martin.",
   "evidence": [
    "P4"
   ],
   "why": "P4 明确请求重复的是姓名，随后才另行确认上课时间。"
  }
 ],
 "languageNotes": [
  {
   "target": "Est-ce que le cours commence à dix heures ?",
   "zh": "是非问句使用 est-ce que + 原陈述句顺序；后文否定十点并修正为十点半。"
  },
  {
   "target": "Vous pouvez répéter, s’il vous plaît ?",
   "zh": "向工作人员礼貌请求重复；vous 的称呼保持一致，不能因熟悉名字就自动改 tu。"
  },
  {
   "target": "Il dure une heure et demie.",
   "zh": "durer 说明时长，而 à dix heures et demie 是具体开课时刻，两者不能混淆。"
  }
 ],
 "task": "用 6–8 句法语重新叙述：人物到校→问教室→问时间→否定纠正→确认老师姓名→进入教室；保持所有时刻和楼层准确。",
 "model": "Léa arrive à l’école et cherche la salle de français. À l’accueil, elle apprend que la salle est au deuxième étage. Elle croit d’abord que le cours commence à dix heures, mais il commence à dix heures et demie. Le cours finit à midi. Léa rencontre ensuite Amir, qui pense que la salle est au premier étage. Elle lui explique où aller et lui dit que le professeur s’appelle Madame Martin. Amir demande de répéter le nom. Enfin, les deux étudiants trouvent la salle et entrent avant le début du cours.",
 "modelZh": "莉娅来到学校寻找法语教室。在接待处，她得知教室在二楼。她原本以为课程十点开始，实际是十点半，十二点结束。随后她遇到阿米尔，后者误以为教室在一楼。莉娅告诉他怎么走，并说明老师是马丁女士。阿米尔要求重复姓名。最后两人找到教室，在上课前进入。",
 "references": [
  "https://www.laits.utexas.edu/tex/gr/int2.html",
  "https://www.laits.utexas.edu/tex/gr/neg2.html"
 ]
},
 "en-ielts-listening-u03":{
 "title": "Attendance, venue and a proposed online workshop",
 "language": "en",
 "genre": "原创学术英语听读 · 四段；TTS 非真实 IELTS 录音",
 "paragraphs": [
  {
   "id": "P1",
   "target": "The evening study workshop moved from a room beside the library to a smaller venue across town. According to the organiser, attendance showed a modest decline during the weeks immediately after the move. She described the change as noticeable but not dramatic. However, she warned that the numbers did not establish why fewer people had attended. In particular, she rejected the suggestion that the participants must have lost interest in the subject. The dates of the move and the drop in attendance were known, but the reason for the change had not been measured.",
   "zh": "晚间学习工作坊从图书馆旁的房间搬到城另一端较小的场地。组织者表示，搬迁后几周的出席人数小幅下降，变化能够察觉但并不剧烈。不过她提醒，这些数字不能说明人数下降的原因。她特别反对“参加者必然失去兴趣”的推断。搬迁和人数变化发生的时间已知，但变化原因尚未得到测量。"
  },
  {
   "id": "P2",
   "target": "Several participants told the organiser that reaching the new venue required an additional bus journey. One attendee said the extra journey was manageable on weekdays but difficult on evenings when buses were less frequent. Another participant explained that the issue was not the price of the workshop, which had remained unchanged, but the travel time after work. These accounts helped the organiser understand possible obstacles. They were nevertheless comments from several individuals rather than a survey of every member, so they could not establish how many people had been affected.",
   "zh": "几名参加者告诉组织者，去新场地需要额外乘坐一段公交。一位参加者表示，工作日这段额外路程尚能应付，但晚间公交班次较少时就比较困难。另一位解释，问题不是工作坊费用——费用并未改变——而是下班后的通勤时间。这些意见帮助组织者理解可能的障碍，但它们只是几位个人的反映，并非针对全体成员的调查，因此无法确定受影响的人数。"
  },
  {
   "id": "P3",
   "target": "The organiser is considering replacing one face-to-face workshop each month with an online session. The proposal has not yet been approved, and it would not remove the other weekly meetings. The online platform could accommodate up to thirty participants, although the normal group is smaller. The organiser stressed that thirty was a maximum capacity, not a figure for average attendance. No exact number for the usual group was supplied. Before a decision is made, the team plans to ask regular participants whether they would use the online option and whether they have reliable internet access.",
   "zh": "组织者正在考虑每月将一次线下工作坊改为线上活动。方案尚未获得批准，也不会取消其他每周聚会。线上平台最多可容纳三十人，但平常参加人数少于这一上限。组织者强调，三十是最大容量，不是平均到场人数。团队没有提供日常群体的准确人数。在作决定前，团队计划询问常规参加者是否愿意使用线上方式，以及他们是否有稳定的网络。"
  },
  {
   "id": "P4",
   "target": "For a clear set of notes, the lecturer suggested separating observed information from proposed changes. Under observed information, students should record the slight decline in attendance and the reports of an extra bus journey. Under proposals, they should write one online session each month and a maximum capacity of thirty. Finally, they should add that approval is pending and that the effect on participation remains uncertain. A summary that writes 'thirty people normally attend online' would be inaccurate, because no online session has yet taken place and no such attendance figure was given.",
   "zh": "为了整理清晰的笔记，讲者建议将已观察到的信息与拟议调整分开。观察信息应记下出席人数略有下降，以及一些参加者反映多乘坐一段公交。拟议措施应记下每月一次线上活动、最大容量三十人。最后还需注明方案仍待批准，对参与人数的影响仍不确定。若摘要写成“平常有三十人线上参加”，就是错误的，因为线上活动尚未举行，也没有提供这种到场数字。"
  }
 ],
 "questions": [
  {
   "prompt": "Which phrase best preserves the reported attendance change: a slight fall or a dramatic collapse? Identify the evidence paragraph.",
   "answer": "A slight fall (P1).",
   "evidence": [
    "P1"
   ],
   "why": "P1 explicitly says modest and not dramatic; collapse overstates the change."
  },
  {
   "prompt": "What additional travel difficulty did some participants report, and was it proved to affect every member?",
   "answer": "An additional bus journey; no, only several individuals reported it.",
   "evidence": [
    "P2"
   ],
   "why": "Several participants is not the full population. The passage provides no representative count."
  },
  {
   "prompt": "What does up to thirty refer to? Has the monthly online replacement been approved?",
   "answer": "Maximum proposed online capacity; no, approval is pending.",
   "evidence": [
    "P3"
   ],
   "why": "P3 distinguishes maximum capacity from usual attendance and a proposed option from a confirmed change."
  },
  {
   "prompt": "Which two categories should the notes separate, and why would thirty normally attend online be inaccurate?",
   "answer": "Observed information and proposed changes; thirty is capacity, no online attendance has yet been observed.",
   "evidence": [
    "P3",
    "P4"
   ],
   "why": "A hypothetical platform limit cannot serve as historical attendance data."
  }
 ],
 "languageNotes": [
  {
   "target": "a modest decline / a slight fall",
   "zh": "均表示小幅下降；dramatic collapse 强度显著更大，不是保留原意的改写。"
  },
  {
   "target": "several participants reported",
   "zh": "来源归属与样本范围必须保留：有人反映不等于全体成员已证实。"
  },
  {
   "target": "up to thirty / maximum capacity",
   "zh": "最多三十是上线容量；与 usual attendance、actual attendance 不同。"
  },
  {
   "target": "is considering / has not yet been approved",
   "zh": "consider 表示正在考虑；不能在填空或摘要中改写成已经决定并执行。"
  }
 ],
 "task": "根据 P1–P4 整理一篇 120–160 词的英文讲座摘要：依次区分已观察事实、个别报告、拟议方案、容量上限与尚未核实事项；不得添加讲座没有给出的实际人数。",
 "model": "The workshop moved to a smaller venue across town, after which attendance declined slightly. The organiser said that this change was noticeable but did not show that participants had lost interest. Several people reported needing an extra bus journey, although their accounts did not establish how many learners experienced the same problem. The organiser is considering replacing one face-to-face session each month with an online meeting, while keeping the other weekly meetings. The plan is not approved. The online platform could hold up to thirty participants, which is a capacity limit rather than a measure of normal attendance. The team has not supplied a precise usual attendance figure and plans to ask members about their willingness and internet access. The speaker therefore advised students to separate observed attendance from reported travel problems and proposed arrangements in their notes.",
 "modelZh": "工作坊搬到了城另一端更小的场地，随后出席人数略有下降。组织者指出，这种变化虽然明显，却不能证明参加者失去兴趣。几位参加者反映需要额外乘坐一段公交，但这些意见无法确定所有人中有多少遭遇相同困难。组织者正考虑每月把一次线下活动改为线上，同时保留其他每周活动。方案还未批准。线上平台最多可容纳三十人，这是容量上限，而不是正常参加人数。团队没有提供常规出席人数的准确数值，计划询问成员的使用意愿和网络条件。因此讲者建议笔记分别记录观察到的人数变化、个别交通问题和拟议安排。",
 "references": [
  "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening",
  "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test"
 ]
},
 'fr-c2-u03':{
  title:'Une gare entre inventaire et mémoire',language:'fr',genre:'原创跨体裁阅读 · 虚构车站资料',
  paragraphs:[
   {id:'A1',target:"Document A — Note de conservation. L'ancienne gare des Ormes, fermée au trafic depuis plusieurs années, doit accueillir une salle de lecture. Le dossier prévoit de conserver la façade et l'horloge, mais de réorganiser l'intérieur afin de permettre l'accès aux personnes à mobilité réduite. Les plans joints distinguent les éléments attestés par les archives de ceux dont la fonction reste incertaine. Ainsi, une petite pièce parfois présentée comme un bureau de chef de gare n'est désignée dans l'inventaire que comme un local de service. Cette prudence terminologique ne signifie pas que toute hypothèse soit interdite ; elle impose de ne pas présenter comme établi ce qui repose sur une attribution tardive.",zh:'资料A——保护说明。奥尔姆旧火车站停运多年，拟改设阅览室。方案保留立面和时钟，重新安排内部空间，以便行动不便者进入。附图区分有档案依据的建筑要素和用途尚不确定的部分。例如，一间有时被称为站长办公室的小房间，在清单上仅标为服务用房。用词谨慎不意味着禁止提出假设，而是要求不要把后来的推定说成已确定事实。'},
   {id:'A2',target:"La note précise également que le projet ne vise pas à restituer un état unique du bâtiment. Plusieurs transformations, intervenues à des dates différentes, témoignent de ses usages successifs. Supprimer les traces les plus récentes au nom d'une authenticité supposée reviendrait à privilégier une époque sans expliquer ce choix. Les auteurs recommandent donc de rendre les interventions lisibles, tout en assurant la sécurité des futurs usagers. Ils ne se prononcent ni sur la valeur affective des lieux ni sur le contenu d'une éventuelle exposition. Leur texte définit les conditions d'une intervention matérielle ; son silence sur la mémoire individuelle ne saurait être interprété comme un rejet de celle-ci.",zh:'说明还指出，项目不打算恢复建筑某一个唯一时期的状态。不同年代的改动记录了先后用途。以假定的真实性为名去掉较新的痕迹，相当于偏重某个时期而不解释选择。作者因此建议让新旧改动清晰可辨，同时保证未来使用者安全。文本不评价场所的情感价值，也不讨论可能举办的展览内容。它规定的是实体改造条件，未谈个人记忆不能被解释为排斥个人记忆。'},
   {id:'B1',target:"Document B — Récit. Quand je suis revenue devant la gare, l'horloge marquait encore l'heure de mon départ. Du moins ai-je voulu le croire. Ma sœur m'a rappelé qu'elle avait été remplacée bien après notre enfance, et j'ai reconnu le cadran plus clair que celui de mes souvenirs. Cela n'a pas effacé l'attente : le banc froid, la manche que je tirais, la promesse d'un train qui nous emmènerait ailleurs. Je cherchais une preuve et je retrouvais une sensation. La porte entrouverte laissait voir une rampe neuve. J'ai d'abord regretté l'escalier disparu, puis pensé à mon père, qui ne pouvait plus le monter.",zh:'资料B——叙事。再次来到车站前，时钟仍指着我离开那刻的时间。至少，我愿意这样相信。姐姐提醒我，时钟是在我们童年很久之后更换的；我也认出现在的表盘比记忆中的浅。这没有抹去等待的感受：冰冷的长椅、我拉扯的衣袖、列车将带我们远行的许诺。我想寻找证据，找回的却是一种感觉。半开的门内可见新坡道。起初我惋惜消失的楼梯，随后想到父亲：他已经无法登上那些台阶。'},
   {id:'B2',target:"Je n'ai pas demandé que l'on remette chaque pierre à sa place. Quelle place, d'ailleurs ? Celle du jour où nous étions partis, ou celle du matin où d'autres étaient arrivés ? Dans la future salle, des lecteurs s'assiéraient sans connaître nos noms. Cette pensée m'a blessée avant de m'apaiser. Si le lieu devait porter seulement mon histoire, il cesserait d'accueillir celle des autres. J'ai photographié l'horloge, non pour certifier une date, mais pour garder la trace de cette hésitation. À côté, un panneau annonçait les travaux. Ses phrases exactes ne racontaient pas mon retour ; elles n'avaient pas à le faire. Je pouvais leur laisser cette tâche plus modeste : dire ce qui allait changer.",zh:'我没有要求把每块石头放回原处。可是，哪一个原处？我们离开那天的，还是别人抵达那天早上的？未来阅览室的读者会坐下，却不知道我们的名字。这个念头先让我难过，继而让我释然。如果场所只能承载我的故事，就无法容纳别人的故事。我拍下时钟，不是为了确证日期，而是留住这份迟疑。旁边的标牌宣布施工。那些精确语句并不讲述我的归来，也不必讲述。我可以让它们承担更朴素的任务：说明将要改变什么。'}],
  questions:[
   {prompt:'“Du moins ai-je voulu le croire”怎样改变上一句的证据地位？',answer:'La narratrice rectifie une apparente constatation : l’heure identique relève de son désir, non d’un fait vérifié.',evidence:['B1'],why:'倒装用于书面语的限制性补充。不能据首句断言时钟自童年一直未变；后文明示已更换。'},
   {prompt:'两个文本是否都主张恢复某个唯一“原始状态”？分别给证据。',answer:'Non. A distingue plusieurs transformations ; B demande « Quelle place ? » et accepte de nouvelles histoires.',evidence:['A2','B2'],why:'两文以不同方式质疑唯一原状：A诉诸历史分层，B诉诸多个人生经验。'},
   {prompt:'A 未讨论情感价值，是否表示作者否认记忆？',answer:'Non. Son objet est l’intervention matérielle ; ce silence ne permet pas d’attribuer une hostilité à la mémoire.',evidence:['A2','B2'],why:'区分体裁职责与立场。B也承认标牌无需讲述私人归来。'},
   {prompt:'坡道细节如何避免把“保存”与“改变”写成简单对立？',answer:'L’accessibilité prévue dans A devient, dans B, une raison concrète d’accepter la disparition de l’escalier.',evidence:['A1','B1'],why:'A的公共功能在B中通过父亲的行动困难获得情感和伦理意义，不等于两文互相证明所有事实。'}],
  languageNotes:[{target:'ne saurait être interprété comme',zh:'书面语中 saurait 的条件式在此表达“不能合理地被解释为”，不是过去将来。它限制推断，不声称不存在其他解释。'},
   {target:'Du moins ai-je voulu le croire.',zh:'“至少我曾愿意相信如此。”以 du moins 收窄前面的陈述；叙述者自我修正是可靠性分析的重要线索。'}],
  task:'写120–160词跨体裁比较，解释两个文本如何处理“真实性”，不把文学感受当作历史档案。',
  model:"Les deux documents refusent de réduire l'authenticité de la gare à un état originel unique, mais ils le font selon des démarches distinctes. La note de conservation s'appuie sur les archives, distingue les attributions certaines des hypothèses et traite les transformations comme des traces d'usages successifs. Le récit met en scène une mémoire qui se corrige : l'horloge ne confirme pas le souvenir, malgré le désir initial de la narratrice. L'accessibilité relie les deux textes, puisque la rampe prévue pour les futurs usagers évoque concrètement, dans le récit, les difficultés du père. Cette convergence n'abolit pas la différence des genres. Le texte administratif fixe des conditions matérielles ; le récit explore une hésitation affective. Leur confrontation invite ainsi à préserver des traces sans figer le lieu ni exiger qu'une seule voix en épuise le sens.",
  modelZh:'两文都不把真实性缩减为唯一原始状态，但方法不同。保护说明依据档案，区分事实与假设，把历次改造视为用途痕迹。叙事表现记忆如何自我修正：时钟并未证实叙述者希望确认的回忆。坡道把两文联系起来，公共可及性在故事中化为父亲的具体困难。这种呼应不消除体裁差异：行政文本规定实体条件，叙事探索情感迟疑。对读提示我们保存痕迹而不冻结场所，也不让一种声音穷尽其意义。',references:['https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors']},
 'fr-b2-u03':{
  title:'Une annonce, deux titres : que sait-on vraiment ?',language:'fr',genre:'原创新闻阅读 · 虚构市政案例',
  paragraphs:[
   {id:'P1',target:"Lundi, la mairie de Valmont a annoncé qu'elle envisageait de réserver une rue aux piétons le samedi après-midi. Le communiqué ne fixe pas de date de mise en œuvre : il ouvre une consultation de six semaines, à laquelle les habitants et les commerçants pourront participer. Pourtant, le titre d'un site local affirme déjà : « Le centre-ville sera fermé aux voitures. » Cette formulation transforme un projet limité à une rue et à quelques heures en une décision générale. Elle attire l'attention, mais elle ne restitue ni le périmètre ni le statut de la mesure.",zh:'周一，瓦尔蒙市政府宣布，正在考虑将一条街在周六下午设为步行街。公告没有确定实施日期，而是启动为期六周的公众咨询，居民和商户均可参与。然而，一家本地网站的标题已断言：“市中心将禁止汽车通行。”这个表述把限于一条街、几个小时的设想变成了全面决定。它吸引眼球，却没有准确呈现措施的范围和所处阶段。'},
   {id:'P2',target:"La journaliste qui a rédigé l'article cite un commerçant favorable au projet. Celui-ci estime que des terrasses plus accessibles pourraient attirer de nouveaux clients. Une autre commerçante, dont le magasin reçoit régulièrement des livraisons, craint au contraire des difficultés d'approvisionnement. Leurs témoignages éclairent des besoins différents ; ils ne permettent pas de calculer l'effet du projet sur l'ensemble des ventes. Présenter l'un des deux comme la voix de tous les commerçants effacerait cette diversité. Il faudrait aussi savoir comment ces personnes ont été choisies et si d'autres points de vue ont été recueillis.",zh:'撰文记者引用了一位支持该方案的商户。他认为，更便于到达的露台可能吸引新顾客。另一位商户的店铺经常需要收货，她则担心供货受阻。这些证言呈现不同需求，但不能用来计算该方案对整体销售额的影响。把其中任何一位说成全体商户的代言人，都会抹去这种差异。还需要了解受访者如何选取，以及是否征集过其他意见。'},
   {id:'P3',target:"Interrogée le lendemain, la responsable des transports a précisé que les livraisons resteraient possibles le matin si le projet était adopté. Elle a ajouté qu'une expérimentation serait évaluée avant toute décision définitive. Le compte rendu doit conserver cette condition : écrire que les livraisons resteront possibles, sans autre précision, ferait disparaître le caractère hypothétique de l'annonce. De même, le conditionnel dans « la mesure pourrait réduire le bruit » exprime ici une possibilité, et non un résultat déjà observé. Aucun relevé acoustique comparant une période avant et après l'essai n'est disponible, puisque l'essai n'a pas commencé.",zh:'次日接受采访时，交通事务负责人说明，如果方案获批，上午仍可送货。她还补充说，任何最终决定作出前都会先评估试行情况。报道必须保留这一条件：若只写“仍可送货”而不加限定，就会抹去公告的假设性质。同样，“这项措施可能降低噪声”中的条件式表达的是可能性，并非已经观察到的结果。目前没有试行前后的噪声对比测量，因为试行尚未开始。'},
   {id:'P4',target:"Pour vérifier l'information, une lectrice revient donc au communiqué, puis compare les citations avec l'enregistrement de l'entretien. Elle distingue ce qui est annoncé, ce qui est envisagé et ce qui reste inconnu. Cette démarche ne l'oblige pas à choisir un camp. Elle lui permet de poser des questions plus précises : qui pourra accéder à la rue, à quelles heures et selon quels critères l'essai sera-t-il évalué ? Un résumé fidèle mentionnera la consultation, les intérêts divergents et l'absence de décision définitive. Il pourra signaler l'exagération du titre sans attribuer à son auteur une intention de tromper que les documents ne prouvent pas.",zh:'因此，一位读者回到原公告核实信息，再把引语与采访录音进行对照。她区分已经宣布的事项、正在考虑的安排以及未知内容。这种做法不要求她选边站队，而是帮助她提出更精确的问题：谁能进入这条街、什么时段能进入、按什么标准评估试行？忠实的摘要应提及公众咨询、各方不同利益以及尚无最终决定。可以指出标题夸大，却不能据此认定作者有欺骗意图，因为现有文件并不能证明这一点。'}],
  questions:[
   {prompt:'标题如何改变了公告的范围和确定程度？请指出两处。',answer:'une rue → le centre-ville；envisageait / consultation → sera fermé（既成决定的语气）。',evidence:['P1'],why:'地理范围被扩大，同时设想被改写为确定决定；不能仅概括为“标题不准确”。'},
   {prompt:'为什么两个商户的证言不足以证明销售额会上升或下降？',answer:'Ils expriment des attentes et des besoins, sans mesure des ventes ni échantillon représentatif.',evidence:['P2'],why:'个别利益诉求不能推出总体销售效果，文中也没有前后对比数据。'},
   {prompt:'补全：Si le projet était adopté, les livraisons ___ possibles le matin. 为什么？',answer:'resteraient',evidence:['P3'],why:'si + imparfait 引出假设，主句用 conditionnel présent。不要在这个 si 条件从句里写 serait adopté。'},
   {prompt:'可以断言记者故意误导吗？用原文证据回答。',answer:"Non. Les documents permettent de relever une exagération, pas de prouver une intention de tromper.",evidence:['P4'],why:'表达失真是可观察事实；主观意图需要额外证据。'}],
  languageNotes:[{target:'une commerçante dont le magasin reçoit des livraisons',zh:'dont 连接 magasin 与 commerçante 的所属关系：le magasin de cette commerçante。不能再加 son 重复所属。'},
   {target:'a précisé que les livraisons resteraient possibles si le projet était adopté',zh:'报道动词用过去时；这里保留原话中的条件关系。条件式不能自动解释为“过去将来”，必须结合 si 从句判断。'}],
  task:'用法语写80–100词新闻摘要，保留范围、条件与未知事项，不替任何一方下结论。',
  model:"La mairie de Valmont consulte les habitants et les commerçants sur un projet de piétonnisation limité à une rue, le samedi après-midi. Aucune date d'application n'est fixée. Certains commerçants espèrent attirer davantage de clients, tandis que d'autres s'inquiètent des livraisons. Selon la responsable des transports, celles-ci resteraient possibles le matin si le projet était adopté. Une expérimentation devrait précéder toute décision définitive. Le titre annonçant la fermeture du centre-ville exagère donc la portée du communiqué. Les documents disponibles ne permettent de conclure ni à un effet sur les ventes ni à une intention de tromper.",
  modelZh:'市政府正在就周六下午将一条街设为步行街征求居民和商户意见，实施时间尚未确定。一些商户期待客流增加，另一些担忧送货。交通负责人表示，如获批准，上午仍可送货，最终决定前应先试行。因此，宣称市中心将关闭的标题夸大了公告范围。现有材料既不能证明销售效果，也不能证明欺骗意图。',references:['https://www.laits.utexas.edu/tex/gr/tac3.html']},
 'fr-c1-u07':{
  title:'Mesurer une audience, raconter un succès',language:'fr',genre:'原创评论阅读 · 虚构图书馆案例',
  paragraphs:[
   {id:'P1',target:"À la suite de l'ouverture d'un espace numérique, la bibliothèque de Riveclaire publie un bilan intitulé « Un succès auprès de tous les publics ». Le document fait état d'une fréquentation accrue pendant les trois premiers mois. Un quotidien reprend ce constat et l'attribue au nouvel équipement. Or, le bilan ne dit pas si les visites supplémentaires correspondent à de nouveaux usagers ou à des passages plus fréquents des personnes déjà inscrites. Cette différence importe : une hausse du nombre d'entrées ne démontre pas, à elle seule, un élargissement du public. Le titre transforme ainsi un indicateur d'activité en affirmation d'inclusion.",zh:'里夫克莱尔图书馆开放数字空间后，发布题为“受到所有群体欢迎”的总结，称前三个月到访量上升。一家日报转述这一情况，并将其归因于新设备。但总结没有说明增加的到访来自新用户，还是原有注册读者更频繁的使用。这一区别很重要：入馆次数增加本身不能证明服务人群扩大。标题因此把活动量指标转化成了关于包容性的断言。'},
   {id:'P2',target:"Dans le même article, une bénévole explique que les ateliers accompagnés affichent complet. Son observation est précieuse pour comprendre une demande, mais elle porte sur un dispositif particulier. Les personnes qui renoncent à venir parce qu'elles ne savent pas s'inscrire en ligne n'apparaissent pas dans les listes de participants. L'absence de plainte enregistrée ne suffit donc pas à établir l'absence d'obstacle. Pour examiner l'accessibilité, il faudrait croiser les inscriptions avec des entretiens menés aussi auprès de non-usagers. Même une telle enquête devrait préciser son mode de recrutement : quelques témoignages supplémentaires ne constitueraient pas automatiquement un échantillon représentatif.",zh:'同一报道中，一名志愿者表示，有人辅导的工作坊已满员。这一观察有助于理解需求，但只涉及某项具体活动。不懂如何网上报名而放弃前来的人，不会出现在参加者名单中。因此，没有收到投诉，不足以说明不存在障碍。考察可及性，需要结合报名记录以及对非使用者的访谈。即使开展这种调查，也应说明招募方式：多收集几份证言并不会自动形成有代表性的样本。'},
   {id:'P3',target:"Un second média adopte un angle opposé : il consacre son reportage à une retraitée qui a quitté l'atelier sans obtenir l'aide espérée. Le récit rend sensible une difficulté que le bilan institutionnel laisse dans l'ombre. Pourtant, si le journaliste en déduisait que l'espace numérique exclut nécessairement les personnes âgées, il reproduirait le même saut logique que le premier article, avec une conclusion inversée. Une expérience singulière peut révéler un problème possible et justifier une investigation ; elle ne permet pas de mesurer sa fréquence. La force narrative d'un portrait et la portée statistique d'une observation relèvent de deux plans différents.",zh:'第二家媒体采取相反角度，报道一位没有获得预期帮助、离开工作坊的退休女性。这个故事让机构总结未呈现的困难变得具体可感。但如果记者由此断定数字空间必然排斥老年人，就会重复第一篇报道的推理跳跃，只是结论相反。个人经历可以揭示潜在问题并支持进一步调查，却不能测量问题出现的频率。人物报道的叙事感染力与观察结果的统计适用范围属于不同层面。'},
   {id:'P4',target:"Il serait également imprudent d'expliquer toute la hausse des visites par le seul équipement. Durant la période étudiée, la bibliothèque a prolongé ses horaires et organisé une exposition. Ces changements concomitants offrent d'autres explications plausibles. Une comparaison avec les mois précédents resterait utile, à condition de tenir compte des variations saisonnières. Si le bilan avait distingué les motifs de visite dès le départ, l'analyse aurait disposé d'informations plus précises. Cette phrase décrit une possibilité passée non réalisée ; elle ne signifie pas que les données manquantes peuvent être reconstituées à volonté. Reconnaître une limite méthodologique est parfois plus rigoureux que produire une estimation séduisante.",zh:'把到访量的全部增长仅归因于设备同样不审慎。在所考察时段，图书馆还延长了开放时间并举办展览。这些同时发生的变化提供了其他合理解释。与前几个月比较仍有价值，前提是考虑季节波动。如果总结从一开始就区分到访原因，分析本可获得更精确的信息。这描述的是过去未实现的可能性，并不意味着可以随意重建缺失数据。承认方法限制有时比给出吸引人的估计更严谨。'},
   {id:'P5',target:"Comparer les deux cadrages ne revient pas à chercher une moyenne entre un éloge et une critique. Il s'agit d'identifier les questions auxquelles chaque source peut répondre. Le bilan renseigne sur l'activité enregistrée, le témoignage sur une expérience vécue, et aucun des deux ne suffit à établir une relation causale générale. Une synthèse solide conserverait ces apports sans en gommer les limites. Elle pourrait conclure que le nouvel espace suscite une demande visible, tandis que son accessibilité pour les personnes éloignées du numérique reste à documenter. Une telle conclusion est moins spectaculaire qu'un verdict, mais elle indique exactement ce qu'une enquête complémentaire devrait vérifier.",zh:'比较两种报道框架，不是要在赞扬与批评之间取平均，而是识别各来源能够回答什么问题。总结说明已记录的活动情况，证言描述个人体验，两者都不足以确立一般性因果关系。扎实的综合应保留这些贡献及其局限。可以得出这样的结论：新空间有可见需求，但对不熟悉数字技术的人是否可及，仍需调查。它不如断言醒目，却准确指出后续调查需要核实什么。'}],
  questions:[
   {prompt:'为何“到访量增长”不等于“覆盖所有群体”？',answer:'Le nombre d’entrées ne distingue pas les nouveaux usagers des visites répétées et ne décrit pas les non-usagers.',evidence:['P1','P2'],why:'单位是到访次数，而非不同群体的覆盖程度；没有参与的人也不在报名样本内。'},
   {prompt:'赞扬与批评报道共有哪种推理问题？',answer:'Elles risquent de généraliser à partir d’un indicateur partiel ou d’une expérience singulière.',evidence:['P1','P3'],why:'并非正反各占一半就客观；两者都需要检验结论是否超出证据范围。'},
   {prompt:'把 P4 的反事实条件句拆成两个时态，并说明是否已经获得缺失数据。',answer:'avait distingué：plus-que-parfait；aurait disposé：conditionnel passé。缺失数据尚不存在。',evidence:['P4'],why:'si + plus-que-parfait → conditionnel passé，表达未实现的过去条件和结果，不是对现实结果的报道。'},
   {prompt:'列出两个替代因果解释，写一句有边界的结论。',answer:'Horaires prolongés；exposition。La hausse peut avoir plusieurs causes ; l’effet propre de l’équipement n’est pas établi.',evidence:['P4','P5'],why:'同时发生的因素构成替代解释，但也不能反过来断言它们就是唯一原因。'}],
  languageNotes:[{target:"Même une telle enquête devrait préciser son mode de recrutement.",zh:'même 在这里修饰名词短语，表示“即使这样的调查也……”，不是 même si 从句。'},
   {target:"Si le bilan avait distingué les motifs, l'analyse aurait disposé d'informations plus précises.",zh:'过去反事实；与本课 P3 的 si + imparfait / conditionnel présent 对比。disposer de 是“拥有可供使用的信息”，不能省略 de。'}],
  task:'用100–130词比较两种报道框架，区分活动指标、个体经验与因果推断。这是综合技能练习，不是完整 DALF 试卷。',
  model:"Le bilan de la bibliothèque et les deux articles n'éclairent pas les mêmes aspects du nouvel espace. La hausse des entrées et le succès des ateliers indiquent une activité accrue, sans démontrer que tous les publics en bénéficient. À l'inverse, l'expérience décevante d'une retraitée révèle une difficulté possible, mais n'en mesure pas la fréquence. Les deux cadrages risquent donc de généraliser au-delà de leurs sources. En outre, la prolongation des horaires et l'exposition empêchent d'attribuer la hausse au seul équipement. Pour évaluer l'accessibilité, il faudrait recueillir des informations sur les non-usagers et préciser la méthode de recrutement. Les documents suggèrent une demande visible, tout en laissant ouverte la question de l'inclusion.",
  modelZh:'总结与两篇报道呈现不同方面。到访增长和工作坊受欢迎说明活动增加，却不证明所有人受益。退休女性的失望经历揭示潜在困难，却无法测量频率。两种框架都有过度概括的风险。延长开放时间和展览也阻止我们把增长仅归因于设备。评估可及性需了解非使用者并说明招募方法。材料显示可见需求，但包容性问题仍未解决。',references:['https://www.laits.utexas.edu/tex/gr/tac3.html','https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors']},
 'en-ielts-listening-u02':{
  title:'A pilot, not a promise',language:'en',genre:'原创学术听力 · 虚构校园讨论',
  paragraphs:[
   {id:'P1',target:"Tutor: Before we discuss the proposed evening shuttle, I want to separate the problem from the solution. Students leaving the library late have described long waits at the bus stop. That tells us there may be a gap in the current service. It does not yet tell us whether a new shuttle is the most effective response. My purpose today is to help you design a small pilot that can answer that question, rather than to persuade you to support a permanent service.",zh:'导师：讨论拟议的晚间接驳车前，我想先把问题与解决办法分开。晚间离开图书馆的学生反映在公交站等候很久。这提示现有服务可能存在缺口，但还不能说明开通接驳车就是最有效的应对办法。我今天的目的，是帮助你们设计一个能回答这个问题的小规模试点，而不是说服你们支持永久服务。'},
   {id:'P2',target:"Student: So you think the proposal is worth trying? Tutor: Potentially, yes, but I would not call the current survey conclusive. Most responses came from students who already use the library in the evening. We know much less about those who avoid staying late because travelling home is difficult. If we ask only current users, we may miss precisely the people the proposal is intended to help. I would keep the survey, but add short interviews at other locations and explain how we selected participants.",zh:'学生：所以您认为这个提案值得尝试？导师：有这个可能，但我不会认为现有调查已有定论。大多数答复来自本来就在晚上使用图书馆的学生。对于因返程困难而避免待到晚上的学生，我们了解得少得多。若只问现有使用者，可能恰好遗漏提案想帮助的人。我会保留问卷，同时在其他地点进行简短访谈，并说明参与者如何选取。'},
   {id:'P3',target:"Student: We could count passengers and see whether the shuttle fills up. Tutor: That would be useful, although a full vehicle would not automatically mean the pilot had solved the original problem. Some passengers might previously have walked home without difficulty. Alongside passenger numbers, record waiting times and ask what journey people would otherwise have made. Do not collect names or home addresses for this exercise. We need an account of travel patterns, not a list that identifies individual students. Also note any cancelled trips, since a service that appears popular may still be unreliable.",zh:'学生：我们可以统计乘客，看看接驳车是否满载。导师：这有帮助，不过满载并不自动意味着试点解决了原来的问题。有些乘客以前可能步行回家也没有困难。除人数外，应记录等候时间，并询问若没有接驳车他们原本会怎样出行。这项练习不要收集姓名或家庭地址；我们需要出行模式，而不是可识别个人的名单。还要记录取消的班次，因为看起来受欢迎的服务仍可能不可靠。'},
   {id:'P4',target:"Student: If the results look promising, can we recommend running it every evening? Tutor: You can recommend a further trial, but be careful about the scale of your claim. A two-week pilot during examinations may not represent an ordinary teaching month. Compare the pilot with a similar period and explain what remains uncertain. I am not rejecting the shuttle; I am asking for a recommendation that matches the evidence. In your presentation, start with the travel problem, describe the limits of your sample, and finish with the next decision the data can reasonably support. That structure will be more convincing than a confident promise that the pilot cannot justify.",zh:'学生：如果结果看起来不错，可以建议每晚运行吗？导师：可以建议继续试验，但要注意结论的适用范围。考试期间两周的试点未必代表普通教学月份。应与相近时段比较，并解释仍有哪些不确定性。我不是反对接驳车，而是要求建议与证据相称。汇报时先说出行问题，再交代样本限制，最后指出数据能够合理支持哪一步决策。这样的结构比试点无法支撑的自信承诺更有说服力。'}],
  questions:[
   {prompt:'讲者的主要目的：支持永久开通、拒绝提案，还是改进试点评估？用一句英语回答。',answer:'To improve the design and evaluation of a limited pilot, rather than advocate a permanent service.',evidence:['P1','P4'],why:'rather than 和 I am not rejecting 明确排除两个干扰项；谨慎不等于反对。'},
   {prompt:'为什么只调查当前晚间图书馆用户可能遗漏目标人群？',answer:'Some students avoid staying late because travelling home is difficult, so they may not be represented.',evidence:['P2'],why:'不是“问卷完全无效”；讲者建议保留问卷并补充访谈。'},
   {prompt:'补全笔记：除 passenger numbers，还要收集什么？不要写个人身份信息。',answer:'waiting times; alternative journeys; cancelled trips',evidence:['P3'],why:'这些指标分别检验等候、原本出行方式与可靠性；names / home addresses 明确排除。'},
   {prompt:'判断：The tutor believes a two-week examination pilot proves the service will work all year. True / False / Not Given？',answer:'False',evidence:['P4'],why:'may not represent an ordinary teaching month 与该断言矛盾；不是缺乏信息的 Not Given。此处是理解迁移题，不模拟官方听力题型。'}],
  languageNotes:[{target:'Potentially, yes, but I would not call the current survey conclusive.',zh:'先作有限认可，再限定证据强度。conclusive 表示足以下定论；潜在可行不等于已验证有效。'},
   {target:'a recommendation that matches the evidence',zh:'matches 表示建议与证据范围相称。推荐进一步试验与承诺永久运行是不同层级的结论。'}],
  task:'按 purpose → limitation → action 写60–90词英语笔记摘要，保留讲者的谨慎支持。',
  model:'The tutor supports considering a shuttle pilot but does not endorse a permanent service. The survey may miss students who avoid late library visits, so interviews should supplement it. Passenger numbers alone cannot show whether waiting problems have improved. The team should also record waiting times, alternative journeys and cancellations without collecting identifying details. Since an examination-period pilot may not reflect ordinary demand, the final recommendation should acknowledge uncertainty and propose a further trial if appropriate.',
  modelZh:'导师支持考虑试点，但未认可永久服务。调查可能遗漏避免晚间到馆的人，需补充访谈。乘客人数不能单独证明等候问题已改善，还应记录等候时间、替代行程和取消班次，不收集身份信息。考试期间试点未必反映平时需求，建议须承认不确定性，必要时进一步试验。',references:['https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test']}
};
