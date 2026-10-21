import type {SpecialtyLesson,LearningExample,LearningSection} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string):LearningSection=>({title,concept,pattern,examples,caution});
/** Original curriculum extensions. External links verify usage principles; examples are authored here. */
export const EXPANDED_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'fr-articles-partitive',type:'grammar',language:'fr',level:'A2',title:'部分冠词、数量与否定：du / de la / des / de',subtitle:'从点餐和购物理解“部分量”与“零数量”的不同',unitLink:'fr-a2-u01',
 prerequisite:'已经能区分 un/une/des 与 le/la/les，并知道基本否定 ne…pas。',
 objective:'能区分部分冠词与不定冠词，处理数量表达、否定和 être 表语例外，在餐饮或购物情境中准确造句。',
 sections:[
  s('01 可数、不可数与部分冠词','谈论没有明确数量的食物、液体或抽象物质时，法语常用部分冠词。阳性单数 du、阴性单数 de la；元音或哑音 h 前为 de l’。复数 des 在形式上与复数不定冠词相同，解释时需要结合名词和语境。','du + 阳性单数 / de la + 阴性单数 / de l’ + 元音开头名词',[
   e('Je bois du café le matin.','我早上喝咖啡。','café 为阳性名词，未说明具体多少咖啡。'),
   e('Elle mange de la soupe.','她喝汤。','soupe 为阴性名词，表达未限定的量。'),
   e("Nous buvons de l'eau.",'我们喝水。','eau 为阴性名词，但以元音开头，用 de l’。')],'du 并不简单等于“一个”，也不等于任何语境下的阳性名词冠词；具体已知的咖啡可以是 le café。'),
  s('02 具体数量通常接 de / d’','表达一杯、一公斤、很多、一点等量时，常用数量词组 + de（元音前 d’）+ 名词。数字直接修饰可数名词时则常没有 de，例如 deux pommes。区分数量结构与没有特定数量的部分冠词。','un verre de / beaucoup de / un peu de / deux pommes',[
   e('Je voudrais un verre de jus.','我想要一杯果汁。','一个杯量由 un verre 表达，随后用 de jus。'),
   e("Nous avons beaucoup d'eau.",'我们有很多水。','beaucoup de 在元音前写成 beaucoup d’。'),
   e('Elle achète deux pommes.','她买两个苹果。','直接数字 deux 修饰 pommes，不要添加 de。')],'不能写 beaucoup des pommes 表示一般的“很多苹果”；若特指“这些苹果中的很多”，结构和语义会不同，需另讲限定关系。'),
  s('03 否定数量与否定身份不能混为一谈','直接宾语的普通否定中，不定冠词和部分冠词通常变为 de 或 d’；但 être 后用于判断身份的名词表语仍可保留 un/une，特指对象的 le/la/les 也通常不自动变 de。','Je ne bois pas de café. / Ce n’est pas une pomme.',[
   e('Je ne prends pas de lait.','我不要牛奶。','du lait 在普通否定中改用 de lait。'),
   e("Il n'y a pas d'eau ici.",'这里没有水。','否定存在，元音前为 d’eau。'),
   e("Ce n'est pas une pomme.",'这不是苹果。','être 的判断句保留 une，不能机械改 de。')],'不能说所有否定句都必须用 de；必须先判断句法结构和所表达的含义。'),
  s('04 在餐厅从短句组织成完整请求','完整点餐需要礼貌表达、所需物品、数量和补充条件。先决定是否需要明确数量，再选择冠词和自然搭配；最后能正确表达“不要某物”。','Je voudrais … / Pour moi, … / Je ne prends pas de …',[
   e("Bonjour, je voudrais de l'eau, s'il vous plaît.",'您好，我想要水，谢谢。','未指明杯数或瓶数，礼貌请求。'),
   e('Je voudrais deux cafés et un verre de jus.','我想要两杯咖啡和一杯果汁。','咖啡是店内通常以份数计的点单对象；果汁用容器量词。'),
   e('Je ne prends pas de sucre.','我不加糖。','否定直接宾语下通常用 de。')],'点餐不是背一张冠词表：语义是否指数量以及实际饮食场景同样重要。')
 ],
 questions:[
  {question:'填空：Je bois ___ eau.',answer:"de l'",why:'eau 是元音开头、表示未指定份量的名词，使用 de l’。'},
  {question:'填空：Il y a beaucoup ___ étudiants.',answer:"d'",why:'beaucoup de + 元音开头的 étudiants，写作 beaucoup d’étudiants。'},
  {question:'改错：Je ne prends pas du sucre.',answer:'Je ne prends pas de sucre.',why:'普通否定直接宾语中，du 通常改 de。'},
  {question:"改错：Ce n'est pas de pomme.",answer:"Ce n'est pas une pomme.",why:'être 后作为判断表语的一般不定冠词不按否定直接宾语规则变为 de。'}
 ],
 output:'写一段六句餐厅对话：问候、提出至少两种点单需求、包含一种明确数量、一种未限定数量、一个否定项和礼貌结束。',
 model:[
  e("Bonjour, je voudrais de l'eau, s'il vous plaît.",'您好，我想要一些水。','de l’ 说明未指定数量。'),
  e('Je voudrais aussi deux cafés.','我还想要两杯咖啡。','数字直接说明份数。'),
  e('Je ne prends pas de sucre.','我不加糖。','否定使用 de。')
 ],
 referenceUrls:['https://utexas.pressbooks.pub/texfrenchgrammar/chapter/det8/','https://utexas.pressbooks.pub/texfrenchgrammar/'],
 sourceNote:'法语原有冠词课程的 A2 延伸。语法用法与 Tex’s French Grammar 交叉核查；所有例句与中文分析为项目原创。'
},
{
 id:'fr-passe-compose',type:'grammar',language:'fr',level:'A2',title:'复合过去时 passé composé：avoir / être 与过去分词',subtitle:'把“昨天做过什么”讲清楚，再处理性数配合',unitLink:'fr-a2-u01',
 prerequisite:'掌握 avoir / être 现在时、常见 -er 动词及基本主语代词。',
 objective:'能用复合过去时讲述过去完成的活动，理解常见助动词选择、否定结构和 être 后的过去分词性数配合。',
 sections:[
  s('01 两部分结构：助动词 + 过去分词','复合过去时常用现在时的 avoir 或 être 加过去分词构成。以规则 -er 动词为例，词尾 -er 通常变 -é。不能把动词原形直接放到助动词后，也不能把过去分词当作唯一变位成分。','主语 + avoir/être（现在时）+ participe passé',[
   e("J'ai étudié hier soir.",'我昨晚学习了。','ai 是 avoir 的变位；étudié 是过去分词。'),
   e('Nous avons regardé un film.','我们看了一部电影。','nous 对应 avons，regarder → regardé。'),
   e('Elle a fini son travail.','她完成了工作。','finir → fini，注意不同动词的过去分词形式。')],'J’ai étudier 不是标准的复合过去时；不能把所有过去分词都按 -é 生成。'),
  s('02 avoir 与 être 的常见选择','大多数动词的复合过去时用 avoir；一组常见的运动或状态变化动词在特定不及物用法中用 être，代词式动词也常用 être。部分动词随有无直接宾语可能切换助动词。','avoir：j’ai parlé / être：elle est arrivée / elle s’est levée',[
   e('Elle est arrivée à huit heures.','她八点到了。','arriver 在这里使用 être。'),
   e('Ils sont partis tôt.','他们很早离开了。','partir 用 être；复数男性或混合群体写 partis。'),
   e("Elle s'est levée tôt.",'她早早起床了。','se lever 为代词式动词，使用 être，levée 与阴性单数主语配合。')],'不能把“所有位移动词都用 être”当作绝对规则：例如 J’ai marché 为 avoir。'),
  s('03 过去分词配合：先掌握 être 的基本规律','以 être 构成复合过去时的不及物动词，过去分词通常随主语性数变化。avoir 构成的常规简单句，过去分词通常不随主语变化；若前置直接宾语则存在更高阶配合规则，此处标记为后续专题。','il est parti / elle est partie / ils sont partis / elles sont parties',[
   e('Elle est partie hier.','她昨天离开了。','阴性单数加 -e。'),
   e('Elles sont arrivées ensemble.','她们一起到了。','阴性复数加 -es。'),
   e('Elles ont regardé la télévision.','她们看了电视。','avoir 的普通结构不因 elles 自动写 regardées。')],'Elles ont regardées la télévision 不符合该普通语序中的配合规则；avoir 相关前置宾语例外应另外学习。'),
  s('04 时间线、否定与问句','复合过去时用于讲述过去完成的事件，常与 hier、la semaine dernière 等时间表达搭配。否定时 ne…pas 通常围绕助动词，不是包住过去分词。','Je n’ai pas étudié. / Est-ce que tu as fini ?',[
   e("Je n'ai pas regardé le film.",'我没有看那部电影。','ne…pas 包围 ai，regardé 在后面。'),
   e('Est-ce que vous êtes arrivés hier ?','你们昨天到了吗？','主语为复数且在此用 êtes，书写上注意配合。'),
   e('Hier, nous avons étudié puis nous sommes sortis.','昨天我们先学习，然后出去了。','不同动作连成先后有序的短段落。')],'Je n’ai regardé pas 的否定位置不正确；不能把所有过去时间都简单套用复合过去时，未完成过去时另有用途。')
 ],
 questions:[
  {question:'完成：Elle ___ (arriver) hier.（一位女性）',answer:'est arrivée',why:'arriver 在此使用 être；arrivée 与女性单数主语配合。'},
  {question:'改错：Nous avons étudier.',answer:'Nous avons étudié.',why:'avoir 后需过去分词，étudier 的规则过去分词为 étudié。'},
  {question:'改错：Elles ont regardées un film.',answer:'Elles ont regardé un film.',why:'avoir 的普通非前置宾语结构不随主语 elles 配合。'},
  {question:'否定句：J’ai fini.',answer:"Je n'ai pas fini.",why:'ne / n’ 与 pas 包围助动词 ai。'}
 ],
 output:'写 6 句法语介绍上周末做过的事：至少使用两个 avoir 结构、一个 être 结构、一个否定句以及清楚的时间顺序。',
 model:[
  e("Samedi, j'ai étudié à la bibliothèque.",'星期六我在图书馆学习了。','复合过去时 + 明确时间。'),
  e('Ensuite, je suis rentré chez moi.','然后我回家了。（男性说话者）','rentrer 此处用 être；女性写 rentrée。'),
  e("Je n'ai pas regardé la télévision.",'我没有看电视。','否定包围助动词。')
 ],
 referenceUrls:['https://utexas.pressbooks.pub/texfrenchgrammar/'],
 sourceNote:'配合既有 A2 动词与旅行叙述课程定位，参考公开法语语法分类资料，例句为原创。'
},
{
 id:'en-lecture-hedging',type:'grammar',language:'en',level:'C1',title:'Academic hedging：限定语、证据强度与精准改写',subtitle:'从可能性到证据支持，建立高级学术表达意识',unitLink:'en-ielts-listening-u01',
 prerequisite:'掌握 may / might / could、however 与基本论证结构；能分辨 research question 和 result。',
 objective:'能在摘要、讨论与评价中恰当表达不确定性、研究范围和证据边界，避免把相关表述提升为因果声明。',
 sections:[
  s('01 情态词不能按固定百分比排列','may、might、could 都可以表达可能性，具体确定程度还取决于语境、语调和说话者立场。教材不应自创 may=70%、might=30% 的数字规则。学术写作应优先保留原作者的措辞，不夸大结论。','may / might / could + bare infinitive',[
   e('The additional rooms may improve access.','新增房间可能改善使用机会。','may 不保证改善已发生。'),
   e('Other factors might explain the pattern.','其他因素也可能解释这种模式。','承认替代解释。'),
   e('This could reflect changes in students’ schedules.','这可能反映学生时间安排的变化。','could 表达潜在解释。')],'不要依据 may 与 might 的单词本身给出统一、精确的概率顺序；Cambridge 明确指出使用者对强弱的判断会有分歧。'),
  s('02 Hedges：限定证据、对象与适用范围','审慎并非简单加一个 may。限定对象（some students）、情境（during examinations）、测量范围（based on occupancy data）与结论表述同样关键。一个准确的学术摘要需要保留这些边界。','some / in this sample / based on / appears to / tends to',[
   e('In this sample, usage appears to rise before examinations.','在该样本中，考试前的使用量似乎有所上升。','in this sample 限定对象，appears to 限定判断。'),
   e('The pattern may be associated with exam schedules.','这种模式可能与考试安排有关。','be associated with 不等于 caused by。'),
   e('The observation does not establish a general trend.','该观察不能确立普遍趋势。','局部观察不能自动概括至所有群体。')],'不能虚构原课程中不存在的样本量、百分比或具体实验设计。'),
  s('03 Reporting verbs 与立场归属','reports、suggests、argues、demonstrates 所引出的立场力度不同。复述时应区分讲者陈述、研究报告和复述者自己的判断，不能把 suggest 简化为 prove。','the lecturer suggests / the study reports / the data indicate',[
   e('The lecturer suggests that demand varies across students.','讲者认为不同学生的需求存在差异。','suggests 为讲者立场而非已证实统计结果。'),
   e('The figures indicate when facilities are occupied.','数据表明设施何时有人使用。','indicate 只涉及测量指标。'),
   e('The evidence does not demonstrate better grades.','现有证据并未证明成绩提高。','demonstrate 在否定结构中用于划清证据边界。')],'直接改成 The research proves spaces improve grades 会同时误认研究主体、方法及结论。'),
  s('04 从原句到忠实摘要的四步','完整改写先识别主语和说话者，再提取论点，再保留逻辑关系与证据强度，最后核对有没有额外添加事实。结构词如 however 和 in contrast 需要体现真正的转折而不是机械替换。','who says what → measured variable → strength → limitation',[
   e('Room occupancy reveals patterns of facility use.','房间占用情况可以揭示设施使用模式。','只描述可观察数据。'),
   e('However, those patterns alone cannot establish an educational benefit.','然而，单凭这些模式无法确立教育收益。','however 连接对照；cannot 保留局限。'),
   e('Further evidence would be needed to evaluate learning outcomes.','评估学习成果仍需要进一步证据。','提出证据需求而非编造研究结果。')],'同义改写不是换几个单词：忽略否定词、数量限制和语气都会改变研究含义。')
 ],
 questions:[
  {question:'may、might、could 是否总能排成确定性固定由高到低？',answer:'不能。',why:'语气强弱依语境、语调及使用者判断，不能机械转换成固定概率。'},
  {question:'改写且保留证据局限：Occupancy does not measure academic achievement.',answer:'Usage figures cannot by themselves establish students’ academic achievement.',why:'保留否定及测量边界，不把占用量当成成绩结果。'},
  {question:'“讲者认为” 与 “数据显示” 各应采用什么主语框架？',answer:'The lecturer suggests / The data indicate',why:'不同主语清楚表达陈述与观察的来源。'}
 ],
 output:'写 110—140 词学术摘要：明确讲者提出的问题、可观察变量、至少两项限定条件和谨慎结论。再标出文中所有表明证据强度的词。',
 model:[
  e('The lecture examines whether improved access to study spaces contributes to better learning.','讲座探讨改善学习空间可用性是否促进学习。','whether 表示问题，不是确定结论。'),
  e('Although occupancy can be observed, it does not directly measure academic outcomes.','虽然可以观察占用情况，但它不直接测量学业结果。','保留方法与结果的区分。'),
  e('The speaker therefore calls for more appropriate evidence before drawing causal conclusions.','因此讲者主张在作出因果结论前先收集更合适的证据。','态度归属 + 审慎限制。')
 ],
 referenceUrls:['https://dictionary.cambridge.org/grammar/british-grammar/may-might-and-could','https://dictionary.cambridge.org/grammar/british-grammar/modal','https://dictionary.cambridge.org/grammar/british-grammar/discourse-'],
 sourceNote:'从现有学术讲座单元扩展的 C1 学术表达专题；外部资料用于核验 modality 与话语标记，不将新例句标作讲座原文。'
},
{
 id:'en-academic-collocations',type:'vocabulary',language:'en',level:'B2',title:'学术论证高频词组：动词与名词搭配',subtitle:'把 evidence、findings、claims 和 limitations 用进真实句子',unitLink:'en-ielts-listening-u01',
 prerequisite:'了解 lecture signposts、基本学术名词和连接词。',
 objective:'能选择自然且准确的研究词汇搭配，在句子和段落中区别证据收集、研究观察、论证与局限。',
 sections:[
  s('01 Evidence：收集、评价、支持','evidence 通常指证据，是不可数名词；collect / evaluate / provide / support with evidence 均有不同侧重。描述证据质量时还可使用 relevant、appropriate、limited、insufficient。','collect evidence · evaluate evidence · sufficient evidence',[
   e('Researchers should collect relevant evidence.','研究人员应收集相关证据。','relevant 限定证据与研究问题的相关性。'),
   e('There is insufficient evidence to support that claim.','没有足够证据支持那项主张。','insufficient evidence 是不可数名词词组。'),
   e('We must evaluate the quality of the evidence.','我们必须评价证据的质量。','evaluate 不是单纯收集。')],'通常不说 an evidence 或 many evidences 指一般意义的“几条证据”；可说 a piece of evidence / several pieces of evidence。'),
  s('02 Findings 与 observation：观察、发现、报告','finding 指研究发现，常用复数 findings；observation 是观察或观察结果，不能单凭该词推定存在控制实验。report findings、make observations、identify a pattern 是常用表达。','report findings · make observations · identify a pattern',[
   e('The report identifies a pattern of high evening usage.','报告发现晚间使用量较高的模式。','identify a pattern 表示发现模式。'),
   e('The findings should be interpreted with caution.','研究发现应谨慎解读。','被动结构突出解释条件。'),
   e('An observation alone does not prove causation.','单项观察本身不能证明因果关系。','observation 不自动等于因果实验。')],'不能把 observation 直接改写为 experimental proof；语义级别不同。'),
  s('03 Claims：提出、支持、质疑与限定','make a claim 指提出主张；support a claim 需要依据；challenge a claim 是质疑其合理性；qualify a claim 是限定其范围。动词选择体现学术讨论中的行动。','make a claim · support a claim · qualify a claim',[
   e('The lecturer makes a cautious claim about demand.','讲者对需求提出谨慎的主张。','cautious 限定断言力度。'),
   e('The usage figures cannot support a claim about improved grades.','使用量数据无法支持成绩提高的主张。','证据变量与结论不匹配。'),
   e('We should qualify the conclusion before publication.','发表之前应对结论加以限定。','qualify 是对范围或强度作限定。')],'qualify 在这里不是“取得资格”；应依具体语境选义。'),
  s('04 Limitations：识别、承认与处理','identify a limitation、acknowledge a limitation、address a limitation 含义不同，分别指发现、承认、着手处理限制。准确词组有助于建立清晰完整的讨论段落。','identify · acknowledge · address a limitation',[
   e('The study acknowledges several limitations.','研究承认存在若干局限。','acknowledge 指正式承认。'),
   e('Further measurements could address this limitation.','进一步测量可能有助于处理这项局限。','address 是设法回应，不意味着完全消除。'),
   e('The conclusion should reflect the available evidence.','结论应体现现有证据的范围。','reflect 在此为与证据一致，避免夸张。')],'address a limitation 不等于 eliminate a limitation；学术行文须保留谨慎语气。')
 ],
 questions:[
  {question:'改错：We collected many evidences.',answer:'We collected a lot of evidence. / We collected several pieces of evidence.',why:'evidence 在一般意义上是不可数名词。'},
  {question:'填空：The study ___ several limitations.（承认）',answer:'acknowledges',why:'acknowledge a limitation 表示明确承认局限。'},
  {question:'qualify a claim 在学术语境下表示什么？',answer:'限定主张的范围或强度。',why:'不是资格考试意义的“qualify”，需要根据搭配判断。'}
 ],
 output:'写一个 90—120 词的 study-space research discussion 段落，至少自然使用 collect evidence、identify a pattern、support a claim 与 acknowledge limitations。',
 model:[
  e('The observations identify a pattern of heavy evening usage.','观察发现晚间使用量较高的模式。','观察用 identify a pattern。'),
  e('However, these figures cannot support a claim about academic achievement.','但这些数字无法支持学业表现的主张。','support a claim 要与证据对应。'),
  e('The study should acknowledge this limitation and collect further evidence.','研究应承认这一局限并收集更多证据。','两个不同动词呈现后续工作。')
 ],
 referenceUrls:['https://dictionary.cambridge.org/grammar/british-grammar/discourse-','https://learnenglish.britishcouncil.org/free-resources/vocabulary/b1-b2'],
 sourceNote:'从原英语 B1-B2 学术讲座中的 occupancy、measurement、limitation、evidence 词群延展，语义与搭配使用原创句子示范。'
},
{
 id:'fr-campus-vocab',type:'vocabulary',language:'fr',level:'A1',title:'校园介绍与问候：词汇、称呼和常用问句',subtitle:'不只认识 bonjour，更能在课堂里发起一段自然对话',unitLink:'fr-a1-u01',
 prerequisite:'刚开始学习法语，能识别字母并朗读简单的名字。',
 objective:'掌握问候、介绍、提问、礼貌告别以及学生和课程相关名词的高频搭配。',
 sections:[
  s('01 问候与告别：一天中的场合','Bonjour 是日间问候，Bonsoir 常在傍晚及夜间见面时使用；Au revoir 用于道别，À bientôt 表示希望不久后再见。Salut 较随意，可用于问候或告别，具体取决于场景。','Bonjour, Madame. · Salut ! · Au revoir ! · À bientôt !',[
   e('Bonjour Madame, comment allez-vous ?','您好，女士，您好吗？','礼貌正式的开场。'),
   e('Salut Hugo ! Tu vas bien ?','嗨，雨果！你还好吗？','熟人间用 salut 和 tu。'),
   e('Au revoir et à bientôt !','再见，回头见！','合适的结束语块。')],'不能一律把 bonsoir 当作晚安临睡前的告别；Bonne nuit 更常用于夜间休息前的祝愿。'),
  s('02 名字和身份：问句应成组记忆','prénom 指名字，nom de famille 更明确表示姓氏；s’appeler 表示叫什么名字。询问身份或职业时注意 vous 与 être 的变位，以及 Je suis + 身份名词的习惯表达。','Comment vous appelez-vous ? · Quel est votre prénom ? · Je suis étudiant(e).',[
   e("Je m'appelle Léa.",'我叫莱娅。','整句记住 je m’appelle。'),
   e('Quel est votre prénom ?','您的名字是什么？','prénom 是名字，不等于姓。'),
   e('Je suis étudiant en économie.','我是经济学专业的男学生。','étudiant en + 专业；女性说 étudiante。')],'nom 在许多表格里可能表示姓；不应简单把 prénom 和 nom 完全当成同义词。'),
  s('03 同学、老师和专业','un étudiant / une étudiante 是大学语境常用学生称谓；un professeur / une professeure（依地区和书写习惯）可表示教师；un cours 是课程、课。词汇学习需要连同冠词、专业和搭配记忆。','un cours de français · étudier à l’université · être en classe',[
   e("Nous avons un cours de français aujourd'hui.",'我们今天有一节法语课。','cours de + 学科。'),
   e("J'étudie à l'université.",'我在大学学习。','étudier à + 学习地点。'),
   e('Notre professeur est française.','我们的老师是法国人。（女性）','国籍形容词与被描述对象配合。')],'professeur 的性别相关形式在不同法语地区存在用法差异，不能单凭词尾断定唯一正确称呼。'),
  s('04 将语块组合成自然对话','从“问候—报姓名—报身份—提问—回应—道别”组织对话，词汇的交际功能比孤立的单词列表更重要。正式和非正式表达不应在一句话里随意混搭。','Bonjour → Je m’appelle → Je suis → Et vous ? → Enchanté(e) → Au revoir',[
   e("Bonjour, je m'appelle Camille. Et vous ?",'你好，我叫卡米耶。您呢？','简洁正式的自我介绍。'),
   e('Je suis étudiante. Enchantée !','我是女学生，很高兴认识您。','身份与初次见面礼貌表达。'),
   e('À bientôt, Madame Martin !','回头见，马丁女士！','告别时保持同一礼貌语域。')],'没有任何语块能脱离情境机械套用；tu/vous 的选择也须结合关系和场合。')
 ],
 questions:[
  {question:'“您叫什么名字？”用法语如何表达？',answer:'Comment vous appelez-vous ? / Vous vous appelez comment ?',why:'前者较正式，后者更口语；都要保留代词式动词的 vous。'},
  {question:'prénom 和 nom de famille 分别是什么？',answer:'名字、姓氏。',why:'两者是不同的个人姓名组成部分。'},
  {question:'把“我们今天有一节法语课”译成法语。',answer:"Nous avons un cours de français aujourd'hui.",why:'cours de + 学科；nous 使用 avons。'}
 ],
 output:'写六句校园初次见面短对话，必须使用问候、姓名、身份、一个提问、一个回应和合适的告别。',
 model:[
  e("Bonjour, je m'appelle Léa.",'你好，我叫莱娅。','建立礼貌关系。'),
  e('Je suis étudiante en français. Et vous ?','我是法语专业的女学生。您呢？','身份 + 返问。'),
  e('Enchantée, à bientôt !','很高兴认识您，下次见！','自然结束。')
 ],
 referenceUrls:['https://utexas.pressbooks.pub/texfrenchgrammar/','https://laits.utexas.edu/fi/'],
 sourceNote:'以原有 FR A1 U01 自我介绍课及现存补充文稿为基础重新组织场景语块，不复制第三方教材示例。'
},
{
 id:'fr-food-vocab',type:'vocabulary',language:'fr',level:'A2',title:'餐饮购物词汇：份量、点单与礼貌表达',subtitle:'用名词冠词和数量短语完成一段实际购买交流',unitLink:'fr-a2-u01',
 prerequisite:'学习过基本名词性别、冠词和 je voudrais。',
 objective:'将食物、饮料、数量单位和否定语块整合成购物点单对话。',
 sections:[
  s('01 饮料名词与冠词搭配','食物和饮品名词不能只背中文名称，应该连同未限定量、具体量和有无的三种表达一起学习：de l’eau / un verre d’eau / pas d’eau。','de l’eau · du café · du thé · un verre de jus',[
   e('Je voudrais du thé.','我想要茶。','du 表示未限定量。'),
   e("Pour moi, un verre d'eau.",'给我一杯水。','un verre d’eau 指一杯的数量。'),
   e('Je ne bois pas de café.','我不喝咖啡。','否定直接宾语里使用 de。')],'饮料的份数和不限定量不是同一结构；de l’eau 与 une eau 在具体点单语境也可能有不同用法。'),
  s('02 水果、面包和可数单位','une pomme、une baguette 等可数物品可以直接指定数量；un kilo de 和 une tranche de 表示重量、切片等单位。数词修饰名词通常不需要插入 de。','deux pommes · une baguette · un kilo de pommes',[
   e('Je prends trois pommes.','我要三个苹果。','trois 后直接跟 pommes。'),
   e('Je voudrais une baguette, s’il vous plaît.','我想要一根法棍面包，谢谢。','une baguette 是完整名词词组。'),
   e('Il me faut un kilo de tomates.','我需要一公斤西红柿。','un kilo de + 名词。')],'一个 kilo 对应质量而不是一个物品；不要写 deux de pommes 表示两个苹果。'),
  s('03 请问价格与付款','Combien ça coûte ? 询问价格；C’est combien ? 是日常问法；Je paie par carte 表示刷卡付款。完整交流应有提问、回答、确认和结束。','Combien ça coûte ? · C’est combien ? · payer par carte',[
   e('Combien coûte cette baguette ?','这根法棍多少钱？','combien 后可与 coûter 构成价格问句。'),
   e('Je paie par carte.','我刷卡付款。','payer par carte 为自然搭配。'),
   e('Merci, bonne journée !','谢谢，祝您今天愉快！','典型礼貌结束。')],'Merci 不代表整段交流就完整，还需要明确物品和数量。'),
  s('04 从列单词到完整场景','词汇最终需要被使用；先提出需求，再补充数量或偏好，随后询问价格并结束。遇到没有或不需要的物品，检查否定中的 de。','Je voudrais … → un / deux / un kilo de … → C’est combien ? → Merci.',[
   e("Bonjour, je voudrais deux pommes et de l'eau.",'您好，我想要两个苹果和一些水。','数词与不限定量并列。'),
   e('Je ne veux pas de sucre.','我不要糖。','否定直接宾语。'),
   e('C’est combien, s’il vous plaît ?','请问多少钱？','礼貌问价。')],'语块训练不等于背固定模板：要能够替换物品和数量，保持冠词与语法准确。')
 ],
 questions:[
  {question:'“两根法棍”怎么说？',answer:'deux baguettes',why:'数词 deux 直接修饰名词复数。'},
  {question:'“一杯水”怎么说？',answer:"un verre d'eau",why:'计量名词 verre 后接 de，元音前省音为 d’。'},
  {question:'写出“我不要糖”的法语。',answer:'Je ne veux pas de sucre.',why:'否定直接宾语中的普通不定量表达用 de。'}
 ],
 output:'模拟购物：写 6–8 句法语，包括至少两件商品、一种数量单位、询价、付款和道别。',
 model:[
  e('Bonjour, je voudrais trois pommes et une baguette.','您好，我想要三个苹果和一根法棍。','商品与数量。'),
  e('Combien ça coûte ?','多少钱？','价格问句。'),
  e('Je paie par carte. Merci !','我刷卡付款。谢谢！','支付与礼貌结束。')
 ],
 referenceUrls:['https://utexas.pressbooks.pub/texfrenchgrammar/chapter/det8/','https://laits.utexas.edu/fi/'],
 sourceNote:'从现有法语冠词与存在句教材延伸的 A2 真实点单语块，例句与练习为项目原创。'
}
];
