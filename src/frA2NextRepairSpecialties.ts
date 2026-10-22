import type {SpecialtyLesson,LearningSection,LearningTable,LearningExample} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const t=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['法语形式','自然中文','区别／使用场合'],rows,note});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(table?{table}:{})});
const FR='https://www.laits.utexas.edu/tex/gr/';
export const FR_A2_REPAIR_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'fr-a2-route-modals-grammar',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u03',
 title:'行程变更语法：devoir / pouvoir 与现实条件句',subtitle:'必须换站台、可以申请退款、车票仍然有效',
 prerequisite:'已熟悉现在时 aller、devoir、pouvoir 的基本变位，并掌握法语地点介词 à。',
 objective:'区分义务与可行选择，正确使用 changer de quai、si + présent 以及 rester + adjectif；准确表达行程已确认与尚未确认的信息。',
 sections:[
 s('01 devoir 表必须，pouvoir 表可以','在交通服务语境中，nous devons + 动词原形表示行程要求，nous pouvons + 动词原形表示可供选择的行动。原稿说必须在奥尔良换站台，但如果改为明天出发，只说可以申请退款；“可以申请”不能扩张成“退款已获批准”。','devoir / pouvoir (présent) + infinitif',[
 e('Nous devons changer de quai à Orléans.','我们必须在奥尔良换站台。','devoir + changer，表示行程要求。'),
 e('Nous pouvons demander un remboursement.','我们可以申请退款。','pouvoir + demander，表示可采取的行动。'),
 e('Vous devez vérifier le numéro du quai.','您必须确认站台编号。','vous 的变位 devez；quai 指站台。')
 ],'pouvoir demander 仅赋予申请可能性，不能译成“工作人员已经批准退款”；义务与选择应分开记录。',
 t('人称与动作组合',[['je dois partir','我必须出发','devoir 第一人称'],['nous devons changer','我们必须换乘／换站台','devoir 第一人称复数'],['vous pouvez demander','您可以提出申请','pouvoir 第二人称复数'],['nous pouvons partir','我们可以出发','pouvoir 第一人称复数']],'变位随主语改变，后面始终接不定式。')),
 s('02 Si 条件句不是既定事实','si + 现在时可以引出真实条件，主句说明条件成立时可采取的行动。Si vous préférez partir demain, vous pouvez demander un remboursement 不意味着说话者已经选择明天出发；实际最后选择的是今天。','si + présent, présent / pouvoir + infinitif',[
 e('Si nous partons demain, nous pouvons demander un remboursement.','如果我们明天出发，就可以申请退款。','条件尚未成为最终决定。'),
 e('Nous choisissons de voyager aujourd’hui.','我们选择今天旅行。','原稿的实际决定。'),
 e('Si vous préférez attendre, demandez des informations.','如果您宁愿等一等，可以询问信息。','si 从句给出条件而不是保证结果。')
 ],'不要把 Si nous partons demain 变成“我们明天一定出发”；原文最终因酒店预订而今天走。'),
 s('03 changer de quai 与 aller à Tours 的介词','changer de + 名词表示更换对象；aller à + 城市名表示目的地；une correspondance à Orléans 则表示换乘地点。在一个句子中，目的地、换乘城市和站台不是同一层级。','aller à Tours / changer de quai / une correspondance à Orléans',[
 e('Nous allons à Tours.','我们去图尔。','à Tours 是目的地。'),
 e('Nous faisons une correspondance à Orléans.','我们在奥尔良换乘。','à Orléans 是中途换乘地。'),
 e('Nous devons changer de quai.','我们必须换站台。','changer de quai 不等于 changer de gare。')
 ],'gare 是整个车站，quai 是车站内的具体站台；原稿没有给出站台编号，不得随意增加。'),
 s('04 reste valable 表状态持续，est annulé 表取消','être annulé 描述列车被取消；rester valable 描述原车票在推荐新行程上仍有效。两者描述不同对象，不能因为列车取消就自动推断票无效。再结合 onze heures 确认推荐行程的出发时间。','le train est annulé / le billet reste valable / partir à onze heures',[
 e('Le train direct est annulé.','直达列车被取消。','取消的是列车服务。'),
 e('Notre billet reste valable pour ce trajet.','我们的票对这条路线仍然有效。','有效的是车票与该替代路线的关系。'),
 e('Le départ est à onze heures.','出发时间是十一点。','没有明确到站时刻，不能填入。')
 ],'train annulé 并不推导出 billet non valable；先核对每句主语，再判断取消与有效的指向。')
 ],
 questions:[
 {question:'填空：Nous ___ changer de quai à Orléans.',answer:'devons',why:'nous devons + 不定式，表示必须在奥尔良换站台。'},
 {question:'解释 Si vous préférez partir demain, vous pouvez demander un remboursement。',answer:'如果您更愿意明天出发，可以申请退款。',why:'si 给出条件，pouvez demander 只是申请可能性，不表示已批准。'},
 {question:'changer de quai 与 changer de gare 有何区别？',answer:'更换站台与更换车站不同。',why:'quai 是站台，gare 是车站；原稿要求的是 changer de quai。'},
 {question:'原直达车取消是否必然让原车票无效？',answer:'Non. Le billet reste valable pour le trajet proposé.',why:'文中指出原票仍适用于所推荐的新路线，不应从列车取消推断失效。'}
 ],
 output:'用八到十句法语说明取消原因、换乘要求、退票条件与最终决定。至少出现 deux verbes modaux、si 条件句和 rester valable；每句配中文。',
 model:[
 e('Le train direct pour Tours est annulé.','去图尔的直达列车取消了。','区别列车与车票。'),
 e('Nous demandons un autre trajet au guichet.','我们在窗口询问其他路线。','求助地点。'),
 e('Nous devons partir à onze heures.','我们必须在十一点出发。','devoir + 不定式。'),
 e('Nous devons changer de quai à Orléans.','我们必须在奥尔良换站台。','换乘地点。'),
 e('Notre billet reste valable.','我们的原车票仍然有效。','状态持续。'),
 e('Si nous partons demain, nous pouvons demander un remboursement.','如果明天出发，我们可以申请退款。','条件与可能。'),
 e('Notre hôtel est déjà réservé, alors nous partons aujourd’hui.','酒店已经预订，所以我们决定今天出发。','最终选择。')
 ],
 referenceUrls:[FR+'virr1.html'],sourceNote:'与 fr-a2-u03 原稿中图尔、奥尔良、十一点、车票有效和可申请退款的明确事实逐项对应。'
},
{
 id:'fr-a2-station-change-lexicon',type:'vocabulary',language:'fr',level:'A2',unitLink:'fr-a2-u03',
 title:'车站服务与旅行变更词汇：correspondance / quai / valable',subtitle:'从确认替代路线到表达决定，不混淆地点和办事结果',
 prerequisite:'已经能够听懂法国城市名、整点时间及基本的车票用语。',
 objective:'正确使用 gare、guichet、quai、correspondance、annuler、valable、remboursement，掌握问路和重复确认的自然语块。',
 sections:[
 s('01 地点名词先分层级','la gare 指整座车站，le quai 是站台，le guichet 指服务或售票窗口。une correspondance 描述换乘过程，而不是一个固定房间。用地点层级可以避免把窗口、站台和换乘城市混写成相同答案。','à la gare / au guichet / sur le quai / une correspondance',[
 e('Nous sommes à la gare.','我们在火车站。','gare 是车站。'),
 e('Nous allons au guichet.','我们去服务窗口。','à + le 缩合为 au。'),
 e('Nous changeons de quai à Orléans.','我们在奥尔良换站台。','站台与城市各有不同层级。')
 ],'ne dites pas une correspondance de gare 表示本课的换站台；换乘与设施词不能随意互换。',
 t('四项场所与动作',[['la gare','火车站','整体交通设施'],['le guichet','服务／售票窗口','询问信息的位置'],['le quai','站台','需确认号码'],['la correspondance','换乘','在奥尔良进行的动作']],'先看题目问的是地点、站台还是交通转换动作。')),
 s('02 列车状态：annulé / retardé / valable','annulé 是取消，retardé 是延误，valable 是票证有效。前两个经常描述服务，valable 在本课描述车票。取消和延误都可能改变旅行安排，但含义完全不同。','un train annulé / un train en retard / un billet valable',[
 e('Le train direct est annulé.','直达列车被取消。','不是单纯晚点。'),
 e('Un retard signifie un départ plus tardif.','延误意味着比原定时间更晚出发。','概念辨析，不是本课具体列车事实。'),
 e('Le billet reste valable pour le nouveau trajet.','车票对新行程仍然有效。','限定推荐的替代路线。')
 ],'不能把取消译为延误，也不能把 billet valable 解释成任何改签路线均免费；只有原文确认的路线有效。'),
 s('03 票务操作：demander ≠ obtenir','demander un remboursement 是申请退款，obtenir un remboursement 才是获得退款。employée propose un trajet 指工作人员提出可行方案，不能保证旅客已经订到其他路线。','proposer un trajet / demander un remboursement / obtenir une confirmation',[
 e('Une employée propose une correspondance.','工作人员提出一条换乘路线。','方案提出。'),
 e('Nous pouvons demander un remboursement.','我们可以申请退款。','许可／选择而非完成。'),
 e('Le remboursement n’est pas confirmé.','退款尚未得到确认。','不得写成已收款。')
 ],'申请与批准不是同一阶段。要保留文中能够验证的状态，不凭“可以申请”推断退款已经到账。'),
 s('04 实际问答的复述和核对','交通信息中的时间、地点和票证有效性应一起复述。c’est bien ça ? 用于确认理解；vérifier sur l’écran 指查看显示屏，不能把尚未知的站台编号当作已收到的信息。','si j’ai bien compris / c’est bien ça ? / vérifier le quai',[
 e('Si j’ai bien compris, nous partons à onze heures.','如果我没理解错，我们十一点出发。','核对时间。'),
 e('La correspondance est à Orléans, c’est bien ça ?','在奥尔良换乘，是这样吗？','核对地点。'),
 e('Je vais vérifier le numéro du quai sur l’écran.','我要在显示屏上核对站台编号。','不编造具体编号。')
 ],'再次确认时应按“时间—换乘点—车票”有序复述，避免只记录一个孤立数字。')
 ],
 questions:[
 {question:'une correspondance à Orléans 中 Orléans 是目的地还是换乘地点？',answer:'C’est le lieu de la correspondance ; la destination finale est Tours.',why:'原文终点为图尔，奥尔良是换乘城市。'},
 {question:'un train annulé 是否只是晚点？',answer:'Non. Annulé signifie supprimé, pas simplement retardé.',why:'annuler 是取消运行；retarder 是延后时间。'},
 {question:'demander un remboursement 能否译作退款已经收到？',answer:'Non, demander est une demande, pas un remboursement obtenu.',why:'申请与获得属于不同状态；原课仅说允许申请。'},
 {question:'站台号未知时，如何礼貌询问或确认？',answer:'Quel est le numéro du quai ? Je vais le vérifier sur l’écran.',why:'原稿要求从显示屏核对，没有提供具体号码。'}
 ],
 output:'构造一段法语窗口问答，包含“取消—替代路线—十一点—奥尔良换乘—票证有效—可申请退款”，附逐轮中文。',
 model:[
 e('Le train pour Tours est annulé.','开往图尔的列车取消了。','服务状态。'),
 e('Où puis-je demander un autre trajet ?','我在哪里可以询问其他路线？','服务请求。'),
 e('Allez au guichet, s’il vous plaît.','请去服务窗口。','地点。'),
 e('Vous pouvez faire une correspondance à Orléans.','您可以在奥尔良换乘。','换乘地点。'),
 e('Le départ est à onze heures.','十一点发车。','出发时间。'),
 e('Votre billet reste valable pour ce trajet.','您的车票对这条路线仍然有效。','限定有效范围。'),
 e('Je vais vérifier le numéro du quai sur l’écran.','我会到屏幕上核对站台编号。','完整核对。')
 ],
 referenceUrls:[FR+'virr1.html'],sourceNote:'词义与时地信息均对齐原 fr-a2-u03，例句未宣称存在具体列车运营信息。'
},
{
 id:'fr-a2-symptoms-advice-grammar',type:'grammar',language:'fr',level:'A2',unitLink:'fr-a2-u05',
 title:'日常不适的法语表达：avoir mal à、depuis、礼貌建议',subtitle:'疼痛部位、持续两天的状态以及 voudrais / devriez',
 prerequisite:'掌握 avoir、être 现在时，知道 le/la/les 及动词不定式。',
 objective:'正确变换 avoir mal à + 冠词缩合，运用 depuis + présent 表达持续状态，并区分请求、建议与尚未获批准的安排。',
 sections:[
 s('01 avoir mal à + 部位：冠词不能省略','表达身体部位疼痛时，avoir mal à 后通常接定冠词和部位名词。à + le 缩合为 au，à + les 缩合为 aux；阴性 la 保留 à la。原课是头疼，不能因有 le dos 的词汇就改变人物症状。','avoir mal à la tête / au dos / aux jambes',[
 e('Paul a mal à la tête.','保罗头疼。','tête 阴性单数，使用 à la。'),
 e('J’ai mal au dos.','我背疼。','à + le → au。'),
 e('Elle a mal aux jambes.','她两条腿疼。','à + les → aux。')
 ],'J’ai mal le dos 缺少 à；原故事只说 Paul 头疼，没有说他背疼或双腿疼。',
 t('部位搭配变化',[['à la tête','头部','阴性单数'],['au dos','背部','à + le'],['aux jambes','腿部','à + les'],['à l’oreille','耳朵','元音前 à l’']],'例句仅用于语法教学，不等同于对保罗的医学描述。')),
 s('02 depuis + 时间长度 + 现在时','depuis deux jours 与现在时 il est fatigué 连用，表示从两天前开始、现在仍持续的状态。若只说 il était fatigué，时态视角发生变化；本课不是过去已经结束的疲惫。','être fatigué depuis deux jours / depuis ce matin',[
 e('Il est fatigué depuis deux jours.','他已经疲惫两天了（现在仍然如此）。','présent + depuis 延续至今。'),
 e('Je travaille ici depuis lundi.','我从周一起就在这里工作。','此句作为新语法例子，非保罗的工作事实。'),
 e('Depuis combien de temps êtes-vous fatigué ?','您疲惫多久了？','提问持续时间。')
 ],'depuis 不应不分语境地等同 à pendant；本课的 depuis deux jours 明确描述仍在持续的状态。'),
 s('03 voudrais 是礼貌请求，devriez 是缓和建议','Je voudrais + 不定式用来礼貌表达想要，Vous devriez + 不定式给出较缓和的建议。两者分别是“我想”和“您应该”，语用角色不同；也不能将建议当作医生诊断。','je voudrais prendre rendez-vous / vous devriez vous reposer',[
 e('Je voudrais prendre rendez-vous, s’il vous plaît.','您好，我想预约看诊。','礼貌请求，不等于预约已结束。'),
 e('Vous devriez vous reposer.','您应该休息一下。','条件式表达温和建议。'),
 e('Que me conseillez-vous ?','您建议我怎么做？','向专业人士询问建议。')
 ],'Vous devriez 只是一般表达技巧；学习者不应根据本课脚本推断症状的具体医学原因。'),
 s('04 预约已提出、诊断未给出、请假未批准','proposer un rendez-vous 是提出时间安排；ne pas donner de diagnostic 是没有诊断；demander à rentrer plus tôt 是请求提前离开。分别判断“提出、确认、未知”，并注意 ne...pas 否定的确切对象。','proposer un rendez-vous / ne pas donner de diagnostic / demander à partir',[
 e('La secrétaire propose un rendez-vous dans l’après-midi.','秘书提出今天下午的预约安排。','具体时刻未提供。'),
 e('Elle ne donne pas de diagnostic au téléphone.','她没有在电话里进行诊断。','明确否定诊断行为。'),
 e('Paul demande à rentrer plus tôt.','保罗请求早点回去。','只是申请；主管的答复未知。')
 ],'不要把“申请提前下班”译为“主管允许提前下班”；教材没有出现该答复。')
 ],
 questions:[
 {question:'填空：J’ai mal ___ dos.',answer:'au',why:'à + le 缩合为 au。avoir mal à + 身体部位是正确搭配。'},
 {question:'Il est fatigué depuis deux jours 表示现在仍疲惫吗？',answer:'Oui. L’état continue au moment où il parle.',why:'depuis + 时长与现在时结合表示持续到现在。'},
 {question:'Je voudrais prendre rendez-vous 是诊断结论还是请求？',answer:'C’est une demande polie de rendez-vous.',why:'voudrais 表示礼貌意愿，不能代表已收到诊断。'},
 {question:'Paul demande à rentrer plus tôt 是否表示主管已批准？',answer:'Non. La réponse du responsable n’est pas précisée.',why:'demander 强调提出请求，故事没有提供结果，须保持未知。'}
 ],
 output:'写一段七至九句法语预约对话，说明症状、持续时间、礼貌请求与建议表达；逐句中文，不自编病因或预约时刻。',
 model:[
 e('Bonjour, je voudrais prendre rendez-vous.','您好，我想预约看诊。','礼貌请求。'),
 e('Je suis fatigué depuis deux jours.','我已经疲惫两天了。','持续状态。'),
 e('J’ai mal à la tête.','我头疼。','部位搭配。'),
 e('Je ne connais pas la cause.','我不知道原因。','不推断疾病。'),
 e('Nous pouvons vous proposer un rendez-vous cet après-midi.','我们可以为您安排今天下午的预约。','时间段，不自编具体时刻。'),
 e('Merci. Que me conseillez-vous ?','谢谢。您建议我怎么做？','礼貌求建议。'),
 e('Je vais noter les informations du rendez-vous.','我会记下预约信息。','后续行动。')
 ],
 referenceUrls:[FR+'cond1.html'],sourceNote:'限定为语言表达教学，不替代医学建议；课文未提供诊断、具体预约时刻或请假结果。'
},
{
 id:'fr-a2-appointment-symptoms-lexicon',type:'vocabulary',language:'fr',level:'A2',unitLink:'fr-a2-u05',
 title:'预约与身体感受词汇：fatigué、rendez-vous、se reposer',subtitle:'区分症状、状态、预约动作和未知原因',
 prerequisite:'已能描述自己的状态、身体部位及基本的电话请求。',
 objective:'以真实电话情境掌握 cabinet、rendez-vous、avoir mal、fatigué、cause、responsable 和 demander；能准确说明事实与未知项。',
 sections:[
 s('01 症状与原因分开表达','fatigué 是感到疲惫，avoir mal à la tête 是头疼；la cause 表示原因。病人描述感受不等于确定病因，课堂练习只能组织清晰的表达，不能根据少量词汇推断疾病。','être fatigué / avoir mal à / ne pas connaître la cause',[
 e('Je suis fatigué depuis deux jours.','我已经疲惫两天。','描述持续状态。'),
 e('J’ai mal à la tête.','我头疼。','描述具体感受。'),
 e('Je ne connais pas la cause.','我不知道原因。','明确未知。')
 ],'mal à la tête 与 fièvre 不是同义词；故事没有说保罗发烧，也没有任何诊断。',
 t('四组核心语块',[['être fatigué','感到疲惫','形容词随主语配合'],['avoir mal à la tête','头疼','avoir mal à + 身体部位'],['ne pas connaître la cause','不知道原因','否定知识而非否定症状'],['depuis deux jours','已经两天','配现在时表示仍持续']],'将“症状”“时间”“原因是否已知”分三个栏目。')),
 s('02 医疗预约中的名词和动词','le cabinet médical 是诊所或门诊，prendre rendez-vous 表预约，proposer un rendez-vous 指提供一项安排。秘书可以处理预约，但不因此承担医生的诊断行为。','téléphoner au cabinet / prendre rendez-vous / proposer une heure',[
 e('Paul téléphone au cabinet médical.','保罗给诊所打电话。','地点与通信对象。'),
 e('Il voudrait prendre rendez-vous.','他想预约看诊。','礼貌表达意愿。'),
 e('La secrétaire propose un rendez-vous l’après-midi.','秘书提出下午的预约安排。','尚无具体时刻可填写。')
 ],'proposer un rendez-vous 不能自动等于完成治疗；预约只是安排，后续就诊尚未在本课发生。'),
 s('03 se reposer、conseiller 与责任范围','se reposer 是休息，conseiller 指给建议；本课训练 Vous devriez + 不定式，但建议不代替专业判断。un responsable 是主管，rentrer plus tôt 指提前回家。','se reposer / demander un conseil / prévenir son responsable',[
 e('Que me conseillez-vous ?','您建议我怎么做？','求建议。'),
 e('Vous devriez vous reposer.','您应该休息一下。','礼貌建议表达例句。'),
 e('Paul prévient son responsable.','保罗告知主管。','信息沟通，不代表主管已批准请假。')
 ],'不能把 la secrétaire 误译为 le médecin；也不能将员工“通知主管”当作已获得准假。'),
 s('04 记录信息避免补写缺失细节','电话听力要区分明确出现与未提及的内容：症状已明确、持续两天已明确、下午预约已提出；具体诊断、预约分钟数和主管回复没有给出。学会用未确定表达代替猜测。','noter l’heure / heure exacte non précisée / réponse inconnue',[
 e('Il note les informations du rendez-vous.','他记下预约信息。','动作已发生。'),
 e('Le texte ne précise pas l’heure exacte.','课文没有明确预约的具体时刻。','不凭下午编具体小时。'),
 e('La demande de congé n’est pas encore confirmée.','请假请求尚未得到确认。','保留未知结果。')
 ],'不要从 rendez-vous l’après-midi 填出“下午三点”，也不能把请假申请误写成已获批准。')
 ],
 questions:[
 {question:'fatigué 和 avoir mal à la tête 描述的是疾病还是感受？',answer:'Ce sont des états ou des symptômes décrits, pas un diagnostic.',why:'课文仅讲疲惫和头疼，不说明病因。'},
 {question:'prendre rendez-vous 与 recevoir un diagnostic 有何区别？',answer:'前者是预约看诊，后者是得到诊断。',why:'诊所秘书只提出时间安排，没有通过电话给出诊断。'},
 {question:'un responsable 在本课是谁？',answer:'Le supérieur de Paul au travail.',why:'responsable 指工作中的主管，Paul 请求提前下班，但未交代主管是否批准。'},
 {question:'下午有预约安排能否推断具体几点？',answer:'Non. Aucune heure précise n’est donnée dans le récit.',why:'原材料只有 l’après-midi；任何具体小时数都是臆造。'}
 ],
 output:'写八句法语，把症状、持续时间、预约沟通、建议与未知信息连成自然电话情境，附中文对照。',
 model:[
 e('Paul est fatigué depuis deux jours.','保罗已经疲惫两天。','状态。'),
 e('Il a mal à la tête.','他头疼。','症状。'),
 e('Il téléphone au cabinet médical.','他给诊所打电话。','求助。'),
 e('Il voudrait prendre rendez-vous.','他想预约看诊。','请求。'),
 e('La secrétaire propose un rendez-vous cet après-midi.','秘书提出下午的预约。','时段。'),
 e('Elle ne donne pas de diagnostic.','她没有进行诊断。','职责边界。'),
 e('Paul prévient son responsable.','保罗告知主管。','工作联系。'),
 e('Il demande à rentrer plus tôt.','他请求提前回去。','仅为请求。')
 ],
 referenceUrls:[FR+'cond1.html'],sourceNote:'词汇与情境核对 fr-a2-u05 原稿；中外文表达均不添加医学事实。'
}
];