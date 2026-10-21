import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Original study texts, not purported DELF/DALF exam passages or real journalistic reports. */
export const FRENCH_MEDIA_READING_CONTINUITY:SpecialtyLesson[]=[
{
 id:'fr-b2-reported-news-reading',type:'grammar',language:'fr',level:'B2',unitLink:'fr-b2-u03',
 title:'新闻听读：间接引语、时态呼应与消息归属',subtitle:'从谁说了什么，到报道是否经过核实',
 prerequisite:'熟悉 imparfait、plus-que-parfait、conditionnel 和基本疑问句，能辨认新闻报道的不同消息来源。',
 objective:'在新闻口述和文字报道中区分直接引语与转述，准确改写动词时态、间接疑问及指令，并保留消息的来源和不确定性。',
 sections:[
 sec('01 转述过去言论：时态与代词同时改变',
 '叙述动词在过去时、需要保持原先相对时间关系时，直接引语的 présent 常变为 imparfait，passé composé 常变为 plus-que-parfait，futur simple 常变为 conditionnel présent。具体改写还需要调整人称、时间副词和上下文；直接话语依然有效时也可能保留现在时。',
 '« Je viendrai. » → Elle a dit qu’elle viendrait.',[
 e('La directrice a déclaré que les horaires changeraient le mois suivant.','主任宣布开放时间将在下个月调整。','从过去视角转述未来，changeraient 为条件式。'),
 e('Le journaliste a expliqué que les salles étaient occupées.','记者解释当时学习室有人使用。','présent 转述为 imparfait，反映报道时的状态。'),
 e('Le responsable a précisé que le service avait reçu des demandes.','负责人补充说服务部门此前收到了申请。','过去已发生的动作改用 plus-que-parfait。')
 ],'不能把“负责人表示可能调整”改写为“学校已经决定调整”；时态变化不允许增添确定性。',
 {title:'过去的转述关系',columns:['直接话语','间接引语','示意'],rows:[['présent','imparfait','est → était'],['passé composé','plus-que-parfait','a reçu → avait reçu'],['futur simple','conditionnel présent','ouvrira → ouvrirait'],['命令式','de + infinitif','Vérifiez ! → de vérifier']],note:'根据叙述时刻、动作先后和仍然成立的事实选择；该表是常规学习对应，不是所有时态绝对自动后移。'}),
 sec('02 转述提问或命令时，不能保持倒装疑问形式',
 '是非问句由 demander si… 引出；信息问句保留 où、pourquoi、comment 或 ce que 等相应疑问结构。转述命令多用 demander de + infinitif。变化不仅是添加一个 que，而是重构句法。',
 'demander si… / demander pourquoi… / demander de + infinitif',[
 e('Elle a demandé si la bibliothèque resterait ouverte.','她询问图书馆是否继续开放。','si 引出间接是非问句，resterait 表过去视角下的未来。'),
 e('Il a voulu savoir pourquoi les étudiants partaient tôt.','他想知道学生为什么较早离开。','pourquoi 后采用陈述句顺序。'),
 e('La directrice a demandé aux équipes de vérifier les salles.','主任要求工作人员核查学习室。','demander à quelqu’un de + infinitif。')
 ],'不能写 Elle a demandé est-ce que la bibliothèque resterait ouverte；间接疑问采用 si + 陈述语序。'),
 sec('03 区分报告的事实、预测和未经确认消息',
 'constater 表已观察的情况，annoncer 表正式宣布，estimer 表估计或判断，selon une source 表来源归属。新闻报道的 conditionnel journalistique 可传达尚未证实的信息。读者必须保留这些边界，不能把“据称”改写成肯定事实。',
 'selon X / X a constaté / X aurait annoncé / il reste à vérifier',[
 e('Selon une association, certains étudiants manqueraient de places calmes.','据一个协会称，一些学生可能缺少安静座位。','selon + 条件式保留归属与尚待核实状态。'),
 e('Le rapport constate des différences de fréquentation selon les horaires.','报告观察到不同时间段的使用量存在差异。','只陈述被描述的指标，未推导成绩效果。'),
 e('L’université n’a pas confirmé cette information.','大学尚未证实此信息。','消息状态独立于报道来源。')
 ],'“多家媒体重复报道”不等于“多份独立证据”；还需核查是否源于同一原始消息。'),
 sec('04 先读完整原创短报道，再抽取信息链',
 '以下是课堂新编的练习报道，不是新闻实录。阅读应依次分出明确消息、估计、已经发生的动作和待确认事项。回答问题时引用对应措辞，而不是用个人常识填补原文未提供的数字。',
 'source → claim → evidence/status → qualified summary',[
 e('Dans une courte réunion, la responsable du campus a expliqué que plusieurs salles étaient moins fréquentées à certaines heures. Elle a ajouté que son équipe avait reçu des demandes concernant l’ouverture en soirée. Selon un groupe d’étudiants, les cours tardifs limiteraient parfois le temps disponible pour travailler sur place. La direction a précisé qu’aucune extension des horaires n’avait encore été décidée. Elle a demandé aux services de relever la fréquentation pendant un mois avant de présenter une proposition. Aucun chiffre sur les résultats scolaires n’a été fourni.','在一次短会中，校园负责人说某些时段一些学习室使用较少；团队此前收到晚间开放申请。学生团体称晚课可能限制在校学习时间。校方尚未决定延时，要求先记录一个月使用情况；报道没有提供成绩数据。','原创完整短报道分别包含使用情况、意见来源、尚未决定与调查安排。'),
 e('La responsable a déclaré que les horaires n’avaient pas encore changé.','负责人表示开放时间尚未变化。','复述已明确的信息。'),
 e('Le groupe estimait que certaines personnes pourraient avoir besoin de plus de temps.','该团体认为部分人可能需要更多时间。','保留意见主体和可能性。')
 ],'这份短报道只供技能训练，不是达到官方 DELF B2 阅读试卷篇幅的模拟试题。')
 ],
 questions:[
 {question:'从报道里找出已经决定延时的证据。',answer:'没有。La direction a précisé qu’aucune extension des horaires n’avait encore été décidée.',why:'原文明确否定已经决定，不能因出现 demandes 就推断政策已实施。'},
 {question:'转换：« Nous ouvrirons demain. » → Elle a annoncé qu’ils…',answer:'Elle a annoncé qu’ils ouvriraient le lendemain.',why:'过去报告的 futur 转为 conditionnel，demain 对应过去参照的 le lendemain。'},
 {question:'转述：« Est-ce que la salle reste ouverte ? » → Elle a demandé…',answer:'Elle a demandé si la salle restait ouverte.',why:'间接是非问句使用 si，过去视角下 reste 改 restait。'},
 {question:'报道有没有提供成绩变化数字？',answer:'没有。Aucun chiffre sur les résultats scolaires n’a été fourni.',why:'只测量房间使用情况并不能得出成绩变化的结论。'}
 ],
 output:'根据本课原创短报道写八句法语摘要：交代来源、两种不同观点、一个已说明的事实、一项尚未决定的措施和收集信息的安排；至少使用两种间接引语及一次条件式。',
 model:[
 e('Le texte rend compte d’une réunion sur les salles de travail universitaires.','文章报道一场关于大学学习室的会议。','交代主题和场合。'),
 e('La responsable a indiqué que leur fréquentation variait selon les horaires.','负责人指出使用量随时段变化。','转述信息来源。'),
 e('Elle a ajouté que son équipe avait reçu des demandes pour le soir.','她补充说团队此前收到晚间开放申请。','愈过去时标明先行事实。'),
 e('Un groupe d’étudiants estime que certains cours tardifs réduiraient le temps disponible.','一个学生团体认为部分晚课可能减少可用时间。','estime + conditionnel 保留评价主体。'),
 e('Cette opinion ne prouve toutefois pas un effet sur les résultats scolaires.','不过这一观点不能证明成绩上的影响。','控制推断强度。'),
 e('La direction a précisé qu’aucune décision d’extension n’avait été prise.','校方澄清尚未作出延时决定。','准确传达否定事实。'),
 e('Elle a demandé aux services de mesurer la fréquentation pendant un mois.','校方要求部门记录一个月的使用情况。','正确间接命令结构。'),
 e('Une proposition pourrait être présentée après cette observation.','观察完成后可能提出方案。','不把可能的未来决定说成已经发生。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tad2.html','https://www.france-education-international.fr/en/diplome/delf-tout-public/niveau-b2'],
 sourceNote:'严格对应 fr-b2-u03 间接引语、被动与媒体分析。原始短报道为新编教材，不是新闻来源或官方试题。'
},
{
 id:'fr-c1-media-stance-reading',type:'vocabulary',language:'fr',level:'C1',unitLink:'fr-c1-u07',
 title:'媒体评论阅读：来源、框架、暗含立场与证据',
 subtitle:'比较两个报道角度，不把评论、推测和统计混在一起',
 prerequisite:'已会 B2 间接转述、名词化及限定性论证；可以阅读较长句并分辨观点与事实。',
 objective:'识别 cadrage、mise en avant、mettre en doute 等语块的作用，区分观察、评价、推断及文本省略的信息，完成有限资料范围内的批判性比较。',
 sections:[
 sec('01 cadrage 讨论强调什么而非断言记者撒谎',
 '新闻框架 cadrage 描述选取和组织信息的角度：同一政策变化可以先介绍成本，也可以先介绍受影响人群。mise en avant 表突出某个方面，passer sous silence 表不予提及；只有在对照材料可以支持时才可说某一信息被省略。',
 'mettre l’accent sur / présenter comme / passer sous silence',[
 e('Le premier article met l’accent sur les dépenses.','第一篇报道重点突出费用。','强调叙述重点，并未说明费用数字正确与否。'),
 e('Le second présente la mesure comme une réponse aux besoins étudiants.','第二篇把措施描述为回应学生需求。','présenter comme 标明一种叙述角度。'),
 e('Les deux textes abordent la même décision sous des angles différents.','两篇材料从不同角度讨论同一决定。','角度不同不自动代表虚假。')
 ],'不能仅根据标题不同就声称文章散布虚假信息；必须找到相应事实和出处。',
 {title:'评论与证据判断用语',columns:['表达','功能','语义边界'],rows:[['mettre en avant','突出某点','不等于证明'],['selon la direction','来源归属','仍需核查声明'],['mettre en doute','表示质疑','不是直接反证'],['ne précise pas','标明未提供细节','不自动表示故意隐瞒']],note:'比较材料时先把作者观点和叙述证据分开。'}),
 sec('02 两份原创短文：同一计划的两种报道角度',
 '以下两篇为教学目的编写的文本，不代表真实大学新闻。两篇围绕同一个尚在讨论的学习室延时计划，侧重点不同；一篇先谈运营成本，另一篇先谈学生需要。任务是核查它们共享的事实、各自强调的方面以及共同尚未说明的信息。',
 'texte A → coûts / texte B → accès / faits communs',[
 e('Texte A — La direction d’une université étudie une possible extension des horaires de ses salles de travail. Le service financier rappelle que le maintien d’un bâtiment ouvert plus longtemps aurait des conséquences sur les dépenses de personnel et de fonctionnement. Aucune somme précise n’a été publiée. Les responsables souhaitent mesurer la fréquentation avant de soumettre un projet. Pour l’instant, aucune modification des horaires n’est annoncée.','文本 A：学校正在研究可能延时，财务部门强调人员与运营成本，未公布具体金额；负责人希望先调查使用情况，目前未宣布改变。','A 重点在成本与尚未决定，未提供费用数据。'),
 e('Texte B — Plusieurs étudiants souhaitent disposer de salles calmes après des cours tardifs. Certains expliquent qu’ils ne peuvent pas travailler tranquillement chez eux, tandis que d’autres privilégient les ressources numériques pour éviter de longs déplacements. Une association propose que les usagers soient consultés avant toute réorganisation. La direction n’a pas encore fixé de nouvelles heures d’ouverture. Les effets éventuels sur les résultats universitaires ne sont pas documentés.','文本 B：部分学生希望晚课后有安静学习室；还有人更偏好远程资源。协会建议先向使用者咨询，校方尚未决定新的开放时段，成绩影响没有资料支持。','B 重点在需求差异与咨询，并保留未决定状态。'),
 e('Les deux textes indiquent qu’aucun changement d’horaires n’a été annoncé.','两份文本都显示尚未宣布开放时间变化。','共享明确事实，可以跨文核对。')
 ],'文本 A 的运营成本与 B 的个人学习需要不是互相否定的证据；二者描述不同决策维度。'),
 sec('03 信息来源与强度：相关、可能、证明',
 'selon、d’après 标明来源；évoquer、suggérer 表提出或暗示；démontrer 和 établir une relation causale 则要求更强的证据。报道提到一个问题可能存在，不代表确定其大小或证明政策有效。',
 'selon X → X suggère… / l’article ne démontre pas…',[
 e('Selon le service financier, une ouverture prolongée entraînerait des coûts.','据财务部门称，延长开放会产生成本。','明确消息来源并保留条件。'),
 e('L’association suggère de consulter les étudiants.','协会建议征求学生意见。','suggérer 不代表咨询已经完成。'),
 e('Aucun des deux textes ne démontre un effet sur les notes.','两份材料都没有证明对成绩的影响。','限定资料边界。')
 ],'不要把“文章引用了专家”直接写成“研究已经证实”，应先问引用的是事实、意见还是推断。'),
 sec('04 批判性对照需要提出可被回答的问题',
 '完成比较后应提出仍缺哪类信息：预期运营成本是否被量化、哪些时间需求较高、如何获取不同学生意见。批判性阅读不是无根据地怀疑每句话，而是用可验证问题识别证据缺口。',
 'faits communs → choix de cadrage → manque d’information → question vérifiable',[
 e('Les deux auteurs reconnaissent qu’aucune décision définitive n’a été prise.','两位作者都承认尚无最终决定。','先识别一致事实。'),
 e('Le premier insiste sur les dépenses, alors que le second souligne la diversité des situations étudiantes.','第一篇突出费用，第二篇强调学生情况多样。','对比信息选择而非评价记者人品。'),
 e('Il faudrait connaître les coûts précis et les horaires les plus demandés pour apprécier les options.','需要了解准确成本及需求最高的时段，才能判断方案。','提出两项可收集的证据。')
 ],'文本未给出样本或计数时，不要声称“大多数学生”或“全部管理者”支持某方案。')
 ],
 questions:[
 {question:'两份短文共同确认了什么？',answer:'Aucune modification définitive des horaires n’a été annoncée.',why:'A 和 B 都说明未发布新的开放时段，不能将研究方案当作执行方案。'},
 {question:'材料 A 最突出哪个维度？',answer:'Les coûts de personnel et de fonctionnement.',why:'A 开头重点讨论运营费用，但并未提供具体金额。'},
 {question:'文本 B 是否认为每位学生都需要现场学习室？',answer:'不是；文中同时描述有人偏好远程数字资源。',why:'不同需求并存，应保留部分学生的语义范围。'},
 {question:'提供两个可验证而非猜测的问题。',answer:'Quel serait le coût exact ? Quels horaires enregistrent la demande la plus forte ?',why:'数额与高峰时段是两篇原文尚未提供的信息，可以进一步调查。'}
 ],
 output:'根据原创文本 A 和 B，用八句法语比较共同事实、报道侧重、两类学生需求和两项证据空缺。不得称任何材料已证明延时能提高考试成绩。',
 model:[
 e('Les deux textes abordent une possible modification des horaires universitaires.','两份文章讨论可能调整大学开放时间。','共同主题。'),
 e('Ils indiquent qu’aucune décision définitive n’a été annoncée.','它们都表示没有宣布最终决定。','共享事实。'),
 e('Le premier met en avant les dépenses supplémentaires éventuelles.','第一份突出潜在的额外费用。','A 的框架。'),
 e('Il ne donne toutefois aucun montant précis.','不过它没有提供准确金额。','A 的证据缺口。'),
 e('Le second insiste sur les besoins de certains étudiants après les cours.','第二份强调部分学生课后的需求。','B 的叙述重点。'),
 e('Il reconnaît également que d’autres préfèrent travailler à distance.','它同时承认其他人更愿意远程学习。','防止“一切人群”泛化。'),
 e('Les deux approches montrent des aspects distincts du même choix, sans établir d’effet sur les résultats.','两种角度呈现同一决策的不同方面，但都不能证明对成绩的影响。','严格限制因果结论。'),
 e('Une comparaison plus complète demanderait les coûts chiffrés et des données de fréquentation.','更全面的比较需要量化成本和使用量数据。','提出需要收集的资料。')
 ],
 referenceUrls:['https://www.france-education-international.fr/article/epreuves-entrainement-delf','https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors'],
 sourceNote:'对应 fr-c1-u07 媒体评论、立场与可信度。短篇阅读专用于策略教学，不冒称完整 DALF C1 官方长度的文章。'
}
];