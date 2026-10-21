import type {SpecialtyLesson,LearningSection,LearningTable,LearningExample} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Original, bilingual modules mapped by exact existing course ID. Do not confuse with independently reviewed textbooks. */
export const NEXT_CORE_TEACHING_WAVE:SpecialtyLesson[]=[
{
 id:'fr-a1-leisure-choice-vocabulary',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u07',
 title:'兴趣与周末安排：活动、偏好、天气和共同决定',subtitle:'从两人的偏好到真正可实行的周末计划',
 prerequisite:'能使用 aimer、préférer、aller，知道常用日期和天气词。',
 objective:'读懂 Léa 和 Hugo 的不同偏好，准确搭配 faire une promenade、aller au cinéma、choisir un film、prendre un thé，并说明天气如何改变共同计划。',
 sections:[
 s('01 活动名词与动词要成组记忆','une promenade 是可数的“一次散步”，常说 faire une promenade；le cinéma 是电影活动或场所，aller au cinéma 表去看电影；nager 是动词，aimer nager 不加 de。不能只记 promenade=散步 而忽略动词搭配。',
 'faire une promenade / aller au cinéma / aimer nager',[
 e('Hugo préfère faire une promenade.','雨果更想出去散步。','faire une promenade 是一个固定的活动表达。'),
 e('Léa aime nager le samedi.','莉娅星期六喜欢游泳。','aimer 后直接接 nager 原形。'),
 e('Ils vont au cinéma ensemble.','他们一起去看电影。','aller à + le cinéma 缩合成 au。')
 ],'J’aime de nager 不符合 aimer + 不定式的基本结构；不要把 promenade 错作动词，不能说 je promenade。',
 {title:'活动词组',columns:['行动','法语搭配','注意'],rows:[['散步','faire une promenade','une 是活动名词的冠词'],['游泳','aimer nager','aimer 后直接接原形'],['看电影','aller au cinéma','à + le → au'],['一起做','faire quelque chose ensemble','ensemble 修饰共同行动']],note:'同一活动也可用 se promener 表“散步”，但在本课先掌握 faire une promenade。'}),
 s('02 说清喜好、强度与否定','aimer 表喜欢，adorer 表非常喜欢，préférer 表在两个或多个选项中更倾向于某项；ne…pas 可以否定喜欢或计划。句子 Léa n’aime pas les films très longs 只排斥很长的影片，不表示她不喜欢电影。',
 'aimer / adorer / préférer / ne pas aimer',[
 e('Léa n’aime pas les films très longs.','莉娅不喜欢时长过长的电影。','很长 是限制性条件，不是所有电影。'),
 e('Hugo préfère marcher, mais il aime aussi les comédies.','雨果更喜欢步行，但也喜欢喜剧。','préférer 表倾向，不排斥其他喜好。'),
 e('Ils aiment tous les deux le cinéma.','两个人都喜欢看电影。','tous les deux 表双方共同点。')
 ],'Ils aiment tous les deux le cinéma 不表示二人都喜欢所有类型的影片；泛指喜好与具体影片偏好不同。'),
 s('03 天气是今天选择的原因，不是永久喜好','il pleut 表正在下雨；parce que 指原因，alors 引出由情境产生的选择。一个人平时喜欢户外活动，也可能因为今天下雨改选室内项目。叙述须区分长期偏好和当日决定。',
 'Il pleut, alors… / parce qu’il pleut',[
 e('Aujourd’hui, il pleut.','今天下雨。','今天的天气是临时条件。'),
 e('Ils choisissent un film parce qu’il pleut.','因为下雨，他们决定看一部电影。','parce que 在 il 前变为 parce qu’。'),
 e('D’habitude, Léa nage le samedi, mais aujourd’hui elle va au cinéma.','莉娅通常星期六游泳，但今天去看电影。','d’habitude 与 aujourd’hui 对照习惯和当日行动。')
 ],'不能根据“今天下雨去看电影”推断二人从此不再游泳或散步。'),
 s('04 选影片、时长与后续安排形成自然对话','une comédie 表喜剧；un film de quatre-vingt-dix minutes 是九十分钟的电影。après le film 表电影结束后；prendre un thé 表喝茶，parler de leur semaine 表谈论这一周。把时长与活动顺序连起来，计划才完整。',
 'une comédie de quatre-vingt-dix minutes / après le film / prendre un thé',[
 e('Hugo propose une comédie de quatre-vingt-dix minutes.','雨果提议看一部九十分钟的喜剧。','分钟数说明电影时长，不是开始时间。'),
 e('Léa accepte, parce que le film n’est pas très long.','莉娅同意，因为影片不算太长。','原因直接回应她不喜欢很长的电影。'),
 e('Après le film, ils prennent un thé et parlent de leur semaine.','看完电影后，他们喝茶并聊聊各自这一周的情况。','après 标明先后，de 引出谈论话题。')
 ],'après le film 和 avant le film 的时间顺序相反；如果原文是看完后喝茶，摘要不能变成电影前。')
 ],
 questions:[
 {question:'说“去电影院”时填空：aller ___ cinéma。',answer:'au',why:'cinéma 阳性单数，介词 à + le 缩合为 au。'},
 {question:'Le samedi, Léa aime nager. 说明她今天一定去游泳吗？',answer:'Non. Elle choisit un film aujourd’hui parce qu’il pleut.',why:'平时的喜欢不等于今天的决定，原课程明确提到今天下雨。'},
 {question:'“两个人都喜欢电影”应使用什么语块？',answer:'Ils aiment tous les deux le cinéma.',why:'tous les deux 表示双方，le cinéma 指泛指的电影活动。'},
 {question:'“电影之后他们喝茶”中表示之后的是什么？',answer:'Après le film, ils prennent un thé.',why:'après 表后续时间关系，原稿明示喝茶发生在电影之后。'}
 ],
 output:'写 8 句法语：两人分别喜欢什么、为什么今天没进行户外活动、共同点、选定的电影类型与时长、电影之后的活动；配中文对照。',
 model:[
 e('Léa aime nager le samedi.','莉娅周六喜欢游泳。','交代第一人的惯常喜好。'),
 e('Hugo préfère faire une promenade.','雨果更想散步。','说明另一人的偏好。'),
 e('Ils aiment tous les deux le cinéma.','两个人都喜欢电影。','找到共同点。'),
 e('Aujourd’hui, il pleut.','今天下雨。','交代当日限制。'),
 e('Ils décident donc de voir un film.','因此两人决定看一部电影。','donc 连接原因和决定。'),
 e('Léa n’aime pas les films très longs.','莉娅不喜欢太长的电影。','保留具体限制。'),
 e('Hugo propose une comédie de quatre-vingt-dix minutes.','雨果提议看一部九十分钟的喜剧。','原文具体选择和时长。'),
 e('Après le film, ils prennent un thé et parlent de leur semaine.','电影结束后，两人喝茶并聊各自的一周。','最后交代活动顺序。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/det2.html','https://www.laits.utexas.edu/tex/gr/vinf1.html'],
 sourceNote:'基于已保存 fr-a1-u07 原始课程中 Léa、Hugo、下雨、九十分钟喜剧与喝茶的叙事线扩写；例句为原创。'
},
{
 id:'fr-a1-market-quantities-grammar',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u08',
 title:'市场与咖啡馆：部分量、数量单位和礼貌点单',subtitle:'准确使用 du / de la / de l’、数量后的 de 与请求句',
 prerequisite:'认识 un/une/des、基本否定 ne…pas 和 je voudrais。',
 objective:'完成苹果、面包、瓶装水和无糖茶的点单，区分未限定量与具体量，掌握 un kilo de / une bouteille d’ / pas de，正确向店员询价。',
 sections:[
 s('01 “一些”与“一个”：食物的计量方式决定冠词','表达不确定量常用 du（阳性单数）、de la（阴性单数）、de l’（元音开头）。可数单数说 une pomme；买若干个苹果可说 des pommes。当说“面包若干”可用 du pain，强调一整个长棍面包则可说 une baguette。',
 'du pain / de la salade / de l’eau / une pomme / des pommes',[
 e('Je prends du pain.','我要一些面包。','du 表示未具体限定的面包量。'),
 e('Je voudrais de la salade.','我想要一些沙拉。','salade 阴性，表示未限定量时可用 de la。'),
 e('Nous achetons des pommes.','我们买一些苹果。','pommes 为可数复数，des 为不定冠词。')
 ],'不能把 Je prends du pain 与 Je prends un pain 当作毫无差别：前者是部分量，后者可能表示一整个面包。',{title:'点单时的名词',columns:['类型','形式','示例'],rows:[['阳性不可数','du','du pain'],['阴性不可数','de la','de la salade'],['元音开头不可数','de l’','de l’eau'],['可数复数','des','des pommes']],note:'需根据名词实际指称判断可数与部分量，des 作为复数不定冠词并不自动是“部分冠词”。'}),
 s('02 有具体数量时：单位 + de / d’ + 名词','un kilo de、une bouteille de、un verre de 是计量名词词组。计量名词之后常直接用 de，不再叠加不定量冠词；遇元音开头名词改成 d’，所以 une bouteille d’eau，不能说 une bouteille de l’eau 表同样的无特指数量。',
 'un kilo de pommes / une bouteille d’eau / un verre de thé',[
 e('Je voudrais un kilo de pommes.','我想买一公斤苹果。','一公斤的确切单位之后接 de pommes。'),
 e('Je prends une bouteille d’eau.','我要一瓶水。','de 在 eau 前省音为 d’。'),
 e('Elle commande un verre de jus.','她点了一杯果汁。','verre + de + 物质名词构成计量单位。')
 ],'de l’eau 是不定量的“水”，但 une bouteille d’eau 指“一瓶水”；不可把 d’eau 错写为 de l’eau。'),
 s('03 礼貌请求与否定糖分','je voudrais 是 vouloir 的条件式现在时，在商店常作礼貌点单；je prends 表确定选购。sans sucre 表无糖的偏好，也可以说 Je ne prends pas de sucre。通常否定的不定量冠词由 du/de la/de l’ 变为 de/d’，但 être 表语与强调对比等情境有例外。',
 'Je voudrais… / Je prends… / sans sucre / ne…pas de',[
 e('Bonjour, je voudrais un thé sans sucre, s’il vous plaît.','您好，我想要一杯不加糖的茶，谢谢。','完整礼貌点单含商品、条件和请求。'),
 e('Je ne prends pas de sucre.','我不加糖。','ne…pas 否定后使用 de sucre。'),
 e('Je prends aussi du pain.','我还要一些面包。','aussi 表示追加购买。')
 ],'ne…pas 与 de 的变化不能生搬硬套到 être 表语，如 Ce n’est pas un café 不必改成 Ce n’est pas de café。'),
 s('04 问价、区分价格对象并完成付款','Combien coûtent les pommes ? 询问苹果价格；Trois euros le kilo 是按公斤单价。Le thé et le pain coûtent cinq euros 表另一组商品合价，不能拿五欧元回答苹果单价。payer 表付款，rendre la monnaie 表找零钱。',
 'Combien coûte… ? / Ça fait… / payer / rendre la monnaie',[
 e('Combien coûtent les pommes ?','苹果多少钱？','pommes 复数，coûtent 与之保持一致。'),
 e('Elles coûtent trois euros le kilo.','苹果每公斤三欧元。','trois euros le kilo 是单价，不是所有商品合计。'),
 e('Je paie cinq euros pour le thé et le pain.','我为茶和面包一共付五欧元。','说明合计对应的具体商品。')
 ],'不能把“茶和面包五欧元”的合价当作苹果三欧元一公斤的单价；两处数额指向不同物品。')
 ],
 questions:[
 {question:'选正确形式：Je prends (du / un) pain，表示一些面包。',answer:'du pain',why:'表达没有限定具体单位的面包量时用部分冠词 du。'},
 {question:'改错：une bouteille de l’eau。',answer:'une bouteille d’eau',why:'数量容器名词瓶子之后接 de，元音 eau 前省音为 d’，不需要部分冠词 l’。'},
 {question:'补全：Je ne prends pas ___ sucre.',answer:'de',why:'不定量名词在常规否定后用 de sucre。'},
 {question:'苹果每公斤三欧元，茶和面包五欧元：Combien coûtent les pommes ?',answer:'Trois euros le kilo.',why:'提问对象是苹果，三欧元指苹果单价，不能答另一组商品五欧元。'}
 ],
 output:'写一段 8–10 句购物与点茶对话：礼貌请求一公斤苹果、面包和瓶装水；正确询价，进咖啡馆点无糖茶，分别说明苹果单价与茶/面包的合计。',
 model:[
 e('Bonjour, je voudrais un kilo de pommes, s’il vous plaît.','您好，我想买一公斤苹果。','礼貌请求及具体数量。'),
 e('Bien sûr. Elles coûtent trois euros le kilo.','当然可以。苹果每公斤三欧元。','elles 指回 pommes。'),
 e('Je prends aussi du pain.','我还要一些面包。','追加未限定量。'),
 e('Et une bouteille d’eau, s’il vous plaît.','另外请给我一瓶水。','准确的单位与省音。'),
 e('Merci, bonne journée !','谢谢，祝您愉快！','结束市场购买。'),
 e('Au café voisin, je voudrais un thé sans sucre.','到了旁边的咖啡馆，我想要一杯无糖茶。','连贯转入第二场景。'),
 e('Le serveur apporte le thé et une petite cuillère.','服务员端来茶和一把小茶匙。','把具体物品和行动连接。'),
 e('Je paie cinq euros pour le thé et le pain.','我为茶和面包付了五欧元。','保留原稿合计的商品范围。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/det5.html','https://www.laits.utexas.edu/tex/gr/det8.html','https://www.laits.utexas.edu/tex/gr/vinf1.html'],
 sourceNote:'fr-a1-u08 已有苹果每公斤三欧元、茶与面包五欧元的原稿。这里聚焦 A1 现场点单链；fr-a2-u01 现有一般性部分冠词深度专题保持不变。'
},
{
 id:'fr-a1-market-service-vocabulary',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u08',
 title:'市场和咖啡馆词汇：价格、单位、器具与付款',subtitle:'物品词与单位、店员回应和实际交易连续学习',
 prerequisite:'能区分 un / une / du / de la；已经认识问价词 combien。',
 objective:'根据单位、所购物品和付款对象完成市场询价及咖啡馆点餐，使用 un kilo de pommes、une bouteille d’eau、une tasse、une cuillère、la monnaie。',
 sections:[
 s('01 食物名词按交易场景和冠词记忆','une pomme 是一个苹果，des pommes 是一些苹果；du pain 是不定量面包；un thé 在点单场景通常表示一杯茶。食物词不能脱离冠词与购买数量记忆。',
 'une pomme / des pommes / du pain / un thé',[
 e('Je voudrais un kilo de pommes.','我想买一公斤苹果。','一公斤说明可数苹果的计量。'),
 e('Je prends aussi du pain.','我还买一些面包。','du 表不确定数量的面包。'),
 e('Je commande un thé.','我点一杯茶。','点餐时 un thé 指一份/一杯茶。')
 ],'du thé 表茶这一物质的不定量；un thé 是点单语境的一份茶，二者并非任何句子都可任意替换。',
 {title:'词义与计量',columns:['商品','习惯搭配','计量信息'],rows:[['pommes','un kilo de pommes','公斤'],['pain','du pain','不限定量'],['eau','une bouteille d’eau','瓶'],['thé','un thé sans sucre','点单一份']],note:'同一名词可根据点单单位使用不同冠词；搭配由购买意图决定。'}),
 s('02 量词和容器需要明确单位','un kilo 测量重量，une bouteille 量出一瓶容量，une tasse 表杯子本身或一杯饮品，une petite cuillère 表小茶匙。de 是量词与内容物之间的连接；数量词不能不加思考地乘以价格。',
 'un kilo de… / une bouteille d’… / une tasse de…',[
 e('Je prends une bouteille d’eau.','我买一瓶水。','bouteille d’eau 是瓶装水。'),
 e('Le serveur apporte une tasse de thé.','服务员端来一杯茶。','tasse 是装茶的杯子。'),
 e('Il apporte aussi une petite cuillère.','他还端来一把小茶匙。','cuillère 阴性，petite 与名词性数配合。')
 ],'une cuillère 不能笼统当作茶杯，une tasse 也不是量出重量的公斤单位。'),
 s('03 单价、合价和找零要分清','combien coûte… 问一个商品的价格，combien coûtent… 问复数商品；le kilo 指按公斤单价。payer 表支付，la monnaie 常指零钱或找零；rendre la monnaie 为把零钱找还给顾客。原课三欧元和五欧元分别属于不同物品。',
 'trois euros le kilo / cinq euros pour… / rendre la monnaie',[
 e('Les pommes coûtent trois euros le kilo.','苹果每公斤三欧元。','这是单价而非总账单。'),
 e('Le thé et le pain coûtent cinq euros.','茶和面包合计五欧元。','价格对象与苹果不同。'),
 e('Le vendeur me rend la monnaie.','卖家把零钱找给我。','rendre 表找回，不能据此虚构具体找零金额。')
 ],'未经原文说明付款金额与应付金额之间差额，不能凭空断言“找零两欧元”。'),
 s('04 礼貌交流有完整起止，而非零碎词表','bonjour 用于开头，je voudrais 表礼貌提出需要，s’il vous plaît 作为请求语，merci 表感谢，bonne journée 适合交易结束。这些表达结合具体商品与价格才能形成真实交流，而不是空洞礼貌词清单。',
 'Bonjour → Je voudrais… → Combien… ? → Merci, bonne journée !',[
 e('Bonjour, je voudrais une bouteille d’eau, s’il vous plaît.','您好，请给我一瓶水。','称呼、需要和礼貌请求完整。'),
 e('Combien coûtent les pommes ?','苹果多少钱？','复数 pommes 要和 coûtent 一致。'),
 e('Merci pour votre aide. Bonne journée !','谢谢您的帮助，祝您有愉快的一天！','交易结束可使用的自然表达。')
 ],'请求中不要将 tu 和 vous 混用；向不熟悉的店员使用 vous 更稳妥。')
 ],
 questions:[
 {question:'“一瓶水”的正确搭配是什么？',answer:'une bouteille d’eau',why:'单位 bouteille 后面接 de，遇 eau 的元音省音为 d’。'},
 {question:'问苹果价格时怎么变化 coûter？',answer:'Combien coûtent les pommes ?',why:'pommes 是复数主语，因此用第三人称复数 coûtent。'},
 {question:'“请找零”的动词短语是什么？',answer:'rendre la monnaie',why:'rendre 表归还，la monnaie 指零钱或找零。'},
 {question:'Le thé et le pain coûtent cinq euros. 五欧元是否是苹果单价？',answer:'Non, cinq euros est le prix du thé et du pain.',why:'苹果的单价是 trois euros le kilo；五欧元只对应茶和面包。'}
 ],
 output:'用 8 句完整法语完成一次市场与咖啡馆交易，包含两个数量单位、一次价格询问、无糖要求、付款和礼貌结束，并说明两个价格的不同商品范围。',
 model:[
 e('Bonjour, je voudrais un kilo de pommes.','您好，我要一公斤苹果。','开头和单位。'),
 e('Combien coûtent les pommes ?','苹果多少钱？','问题和语法一致。'),
 e('Elles coûtent trois euros le kilo.','每公斤三欧元。','正确单价。'),
 e('Je prends aussi du pain et une bouteille d’eau.','我还买一些面包和一瓶水。','两个不同计量形式。'),
 e('Au café, je commande un thé sans sucre.','在咖啡馆，我点一杯不加糖的茶。','场景和要求。'),
 e('Le serveur apporte une tasse et une petite cuillère.','服务员端来杯子和小茶匙。','器具搭配。'),
 e('Je paie cinq euros pour le thé et le pain.','我为茶和面包支付五欧元。','与苹果单价区分。'),
 e('Je remercie le serveur et je pars.','我感谢服务员后离开。','自然结束。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/det5.html','https://www.laits.utexas.edu/tex/gr/det8.html'],
 sourceNote:'严格沿 fr-a1-u08 原始市场与咖啡馆练习的商品、价格与顺序扩写，例句原创。'
},
{
 id:'en-reading-evidence-scope-u02',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u02',
 title:'IELTS Reading｜限定从句、比较基准与证据范围',subtitle:'根据原阅读 U02 的 A–F 段精确定位，而非凭主题猜答案',
 prerequisite:'了解关系从句、although/because、比较数字及英语过去时。',
 objective:'对照 Northbridge University 八周试验，区分到访次数与人数、前四周与后四周、样本与总体、没有测量与否定结果，判断 TRUE/FALSE/NOT GIVEN。',
 sections:[
 s('01 先确定句子核心与限定对象','关系从句限定动作涉及的人群：Students who worked after class 是那些下课后工作的学生，而非全体学生。判断陈述是否被支持，先找主语及限制词 who、which、some、several，再核对文字中所指对象。',
 'core claim + restrictive relative clause + population',[
 e('Students who worked after class were more likely to use the late sessions.','下课后工作的学生更可能使用延长开放时段。','who worked after class 限制讨论的学生群体。'),
 e('Some respondents wanted a quiet room.','部分问卷参与者希望有安静学习室。','some respondents 不能扩展为所有在校学生。'),
 e('People who did not visit the library were not surveyed.','没有到馆的人不在问卷调查之列。','未入样人群的意愿没有被调查。')
 ],'只看到 students、library 等重复词不够，题目若说 all students 就扩大了 some respondents 的范围。',{title:'主张核查清单',columns:['核查点','原文示例','不可越界'],rows:[['对象','some respondents','≠ all students'],['指标','weekly visits','≠ unique visitors'],['时间','first four weeks','≠ full semester'],['结果','did not measure grades','≠ grades were unchanged']],note:'这组限制与原有 Reading U02 的教学正文保持一致，文本数字为该练习设定，不是现实研究。'}),
 s('02 比较数字必须保留单位与基准','原文 B 段报告：六至八点的平均每周到访次数从前四周 80 次升至后四周 120 次，增量为 40 次；延时后的八至十点另有平均 50 次。访问记录不是去重人数，一个人可能被计数两次。',
 'rose from 80 to 120 / rose by 40 / 50 visits from eight to ten',[
 e('Average weekly visits between six and eight rose from 80 to 120.','六点至八点的每周平均到访次数从八十升至一百二十。','from…to 表起点与终点。'),
 e('The increase was forty visits per week.','每周平均到访次数增加了四十次。','120−80 是增量，不是总人数。'),
 e('A further fifty visits were recorded between eight and ten.','八点至十点的延时段另记录了平均五十次到访。','属于另一个时间窗，不可与六至八点混淆。')
 ],'Visits rose by 40 不能改为 40 new students；人可能多次进出，原稿明确没有按独立访客去重。'),
 s('03 没有测量、结果相同和未给信息三者不同','Not Given 表原文既未支持也未反驳；False 表明确矛盾。The report did not measure grades 仅说明缺少成绩比较，不等于成绩提高，也不等于成绩没有变化。题干的因果声称必须找到对应的设计与指标。',
 'NOT GIVEN = neither support nor contradiction / FALSE = explicit contradiction',[
 e('The study did not compare course grades before and after the pilot.','试验没有比较开展前后的课程成绩。','成绩是否改变在文中没有结果。'),
 e('The questionnaire included sixty respondents.','问卷有六十名参与者。','明确受访人数，可以直接确认。'),
 e('The committee tested academic improvement.','委员会检验了学业成绩提升。','与原文 A/E 段明确目的相反，是 FALSE。')
 ],'“延时提高成绩”不是 FALSE 的充分依据：原文没有测量成绩，该主张在本练习应判 NOT GIVEN；而“委员会以测量成绩为目的”与明确陈述相矛盾。'),
 s('04 主张必须追溯到具体段落','题目定位时先抓对象和独特信息（entrance counter、voluntary questionnaire、coursework deadline、staffed desk），再读完整句，核对转折和限定。B 提供量化指标，C 解释调查范围，D 提醒时间及对照组局限，E 区分晚间空间与人工服务。',
 'B = visits; C = sample; D = confounders; E = service limits',[
 e('The questionnaire was voluntary and restricted to library users.','调查自愿参与，且只面向到馆的人。','原文 C 段限定问卷样本。'),
 e('A coursework deadline offered an alternative explanation.','课程作业截止日期提供了另一种可能解释。','原文 D 段属于干扰因素。'),
 e('The information desk still closed at eight.','咨询柜台仍在八点关闭。','原文 E 段区别建筑开放与现场服务。')
 ],'同一篇文章不同段落可能包含相似词，题目问人工咨询的开放时间就不能只拿建筑十点关闭作答。')
 ],
 questions:[
 {question:'B 段每周六至八点到访次数从 80 增至 120，增长是 40 人吗？',answer:'No. It was forty more weekly visits, not forty distinct students.',why:'counter 记录每次入馆，可能重复计算同一人。'},
 {question:'“The committee measured changes in grades.” TRUE/FALSE/NOT GIVEN？',answer:'FALSE',why:'原文明确 stated aim was demand rather than academic performance，并明确未比较课程成绩。'},
 {question:'“Extended hours improved final grades.” TRUE/FALSE/NOT GIVEN？',answer:'NOT GIVEN',why:'文中没有测量成绩改变，不能把没有数据当作正面或负面证据。'},
 {question:'原文 C 段的 60 名受访者能够代表全部学生吗？',answer:'No. Only users who visited the library were asked.',why:'非到访学生未受调查，问卷不是全校代表性样本。'}
 ],
 output:'针对原课 Northbridge library 阅读，写 8 句英语 evidence audit：给出 B/C/D/E 的一条重要信息、两个数字的单位、一个样本限制和两个 NOT GIVEN/FALSE 辨析；每句配中文。',
 model:[
 e('The committee ran an eight-week pilot of extended access.','委员会进行了八周延时开放试验。','研究目的限定为需求。'),
 e('The first four weeks had the ordinary closing time.','前四周仍按常规时间闭馆。','比较基准。'),
 e('Average weekly visits from six to eight rose from 80 to 120.','六到八点的平均每周到访次数由八十升至一百二十。','数值和时间保持不变。'),
 e('These figures count entries, not distinct students.','这些数字计算入馆次数而非不同学生人数。','避免指标互换。'),
 e('Sixty library users completed a voluntary questionnaire.','六十位图书馆使用者完成自愿问卷。','保留样本性质。'),
 e('Non-users were not surveyed, so their preferences remain unknown.','没有到馆的学生未参与调查，偏好未知。','限定推断范围。'),
 e('The deadline may have contributed to the increase.','作业截止日期可能也是到访量增长的原因。','原文 D 段的替代解释。'),
 e('The report did not compare grades and cannot establish an academic benefit.','报告未比较成绩，因而不能证明学业收益。','原文 E 的证据边界。')
 ],
 referenceUrls:['https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading'],
 sourceNote:'直接对应 public/learning-assets/en-ielts-reading-u02-v1.txt 已有原创 A–F 阅读与提问：研究设定及数字属于课程原稿，不是实际 Northbridge 大学研究或 IELTS 官方文本。'
},
{
 id:'en-reading-research-evidence-lexicon-u02',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u02',
 title:'IELTS Reading｜证据定位与研究词汇的准确搭配',subtitle:'visit、respondent、reference period、alternative explanation 的功能区分',
 prerequisite:'掌握基本频率、比较、名词修饰与学术段落结构。',
 objective:'识别研究中的数据单位、调查样本、对照时段、潜在干扰和论证强度；用自然搭配从原文证据改写成简明答案，不改变其范围。',
 sections:[
 s('01 先分清访问次数、受访者和唯一访客','a visit 是一次到访，a visitor 是访问的人，a unique visitor 指去重后的访客；a respondent 是实际回答问卷的人。这些词不能随意替换。原课门禁记录 entries，问卷另有 60 respondents，两项数据不能合为“共有多少学生”。',
 'record a visit / a unique visitor / survey respondent',[
 e('The entrance counter recorded weekly visits.','入口计数器记录了每周到访次数。','visit 是事件次数。'),
 e('The committee did not count unique visitors.','委员会没有统计独立访客人数。','unique 强调去除重复计数。'),
 e('Sixty respondents completed the questionnaire.','六十名受访者填写了问卷。','respondents 仅表示参与答卷的人。')
 ],'weekly visits 和 survey respondents 的统计单位不同；不能把一百二十次到访转成一百二十个新学生。',
 {title:'指标与名词搭配',columns:['词组','计量对象','原课边界'],rows:[['weekly visits','每周到访次数','可能重复'],['unique visitors','去重人数','原文未计'],['survey respondents','问卷回答者','60 位'],['extended-hours entries','延时段入馆记录','单独时窗']],note:'同一研究中出现多个“人数相关”术语，作答时仍要核查每一个指标的测量方法。'}),
 s('02 reference period 和比较词组','reference period 是比较的参照时间段；rose from X to Y 表起点终点，rose by X 表增长量；compared with 表比较基准，不会自动解释原因。阅读中的 80→120 是六至八点的到访次数，50 是延时段记录。',
 'reference period / rose by / compared with / remained constant',[
 e('The first four weeks served as the reference period.','前四周用作参照时段。','期间与后四周对照。'),
 e('Weekly visits rose by forty.','平均每周到访次数增加四十次。','by 表差额。'),
 e('Security coverage continued, but the staffed desk did not stay open.','安保覆盖继续，但人工咨询台没有延长开放。','两种服务的状态不可合并。')
 ],'rose from 80 to 120 不能简化为 rose to 40；把差额和终值混在一起会改变原文。'),
 s('03 样本的局限与另一种解释','voluntary questionnaire 是自愿问卷；non-users 未入样可能导致偏差。alternative explanation 是另一种可能解释，不等于已被证明。account for 在分析语境是“考虑到影响因素”，不能总译成“占比”。',
 'voluntary questionnaire / sample limitation / alternative explanation / account for',[
 e('The voluntary questionnaire excluded non-users.','自愿问卷没有覆盖非到访者。','说明样本边界。'),
 e('The approaching deadline was an alternative explanation.','临近的截止日期是另一种可能解释。','存在候选原因不等于确认因果。'),
 e('The analysis should account for changes in deadlines.','分析应考虑截止日期变化。','account for 在这里是控制可能影响。')
 ],'alternative explanation 不是 alternative fact；更不能自动说 deadline caused the increase，因为原文未建立因果。',
 s('04 用支持、提示和证明表达不同论断力度','support a claim 表证据与结论相符，suggest 表提示，demonstrate 常意味着更强的显示或证明。没有对照组时，有观察到增长≠可以归因。论文中 a measurable outcome 表可测量的结果，不能理解为已经测量过。',
 'suggest / support / demonstrate / did not measure',[
 e('The figures support a claim about library use.','这些数字支持关于图书馆使用情况的主张。','衡量的是使用，不是学习成绩。'),
 e('The data may suggest higher evening demand.','数据可能提示晚间需求较高。','may suggest 保留不确定性。'),
 e('The study did not measure academic achievement.','研究没有测量学业表现。','并非研究证明了成绩不变。')
 ],'The study did not measure X 不能与 The study found no change in X 同义替换；前者缺少数据，后者是测量结果。')
 ],
 questions:[
 {question:'门禁统计的 weekly visits 与 unique visitors 是否同一指标？',answer:'No. Visits count entries; unique visitors count distinct people.',why:'同一个人可多次入馆，因此次数不等于人数。'},
 {question:'把 grew from 80 to 120 改写为含增量的短语。',answer:'rose by forty visits',why:'from…to 给出前后值；by 给出后值减前值四十。'},
 {question:'account for the coursework deadline 在此处表示什么？',answer:'Consider the deadline as a possible influence.',why:'此处 account for 是在分析中考虑到可能影响因素，不是“在总量中占百分比”。'},
 {question:'did not measure grades 与 found unchanged grades 是否可以互换？',answer:'No. One describes missing measurement; the other claims a measured result.',why:'缺少测量不能被解释为成绩没有变化。'}
 ],
 output:'用 8 句英语解释本课文章的证据：准确使用 visits、unique visitors、respondents、reference period、alternative explanation、account for、support 和 measure，并附中文译文。',
 model:[
 e('The reference period covered the first four weeks.','前四周为参照时段。','时间范围。'),
 e('Weekly visits increased in the later period.','后四周每周到访次数有所增加。','指次数。'),
 e('The counter did not identify unique visitors.','计数器无法识别不同访客。','计数局限。'),
 e('Sixty survey respondents described their preferences.','六十位问卷回答者描述了偏好。','样本定义。'),
 e('The questionnaire excluded non-users.','问卷未覆盖非使用者。','不可扩展到全体。'),
 e('A deadline was an alternative explanation for the increase.','截止日期是增长的另一个可能解释。','不确定因果。'),
 e('The analysis must account for this possibility.','分析必须考虑这一可能性。','配对搭配。'),
 e('The findings support a claim about use, not a demonstrated change in grades.','结果支持使用情况的主张，而不是已被证实的成绩变化。','限制结论。')
 ],
 referenceUrls:['https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading'],
 sourceNote:'源课程 public/learning-assets/en-ielts-reading-u02-v1.txt 已有词汇表和完整阅读；本专题补解释、表格和中文对照，并不复制原文整篇或宣称官方真题。'
}
];