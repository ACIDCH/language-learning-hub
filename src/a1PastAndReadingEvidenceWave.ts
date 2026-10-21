import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** New author-written teaching chapters tied to existing original lesson IDs, not official test extracts. */
export const A1_PAST_AND_READING_EVIDENCE:SpecialtyLesson[]=[
{
 id:'fr-a1-first-past-grammar',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u12',
 title:'初次讲述昨天：passé composé 与 avoir／être',subtitle:'按动作选择助动词，按主语核查过去分词',
 prerequisite:'已掌握 avoir、être、aller 的现在时及昨天、今天的时间表达。',
 objective:'连贯叙述昨天进城、参观、拍照、午餐、遇见熟人和回家的动作，区分 avoir 与 être，并在适用时完成过去分词性数配合。',
 sections:[
 sec('01 复合过去时不是把两个动词都变位','passé composé = 助动词 avoir/être 的现在时 + 过去分词。大部分常用动词用 avoir：j’ai visité、nous avons déjeuné。-er 规则动词的过去分词通常以 -é 结尾，但 prendre → pris 为不规则形式。讲述已完成的具体过去动作常使用此时态。',
 'j’ai visité / nous avons déjeuné / j’ai pris',[
 e('Nous avons visité un petit musée.','我们参观了一座小博物馆。','visiter 使用 avoir；visité 为过去分词。'),
 e('J’ai pris des photos dans le jardin.','我在花园里拍了照片。','prendre 的过去分词是 pris，不写 prendé。'),
 e('À midi, nous avons déjeuné dans un café.','中午我们在咖啡馆吃了午饭。','déjeuner → déjeuné，动作发生在中午。')
 ],'je suis visité 并不表达“我参观了”；本课 visiter 与 prendre、déjeuner 的用法需要 avoir。',
 {title:'原课常用已完成动作',columns:['不定式','助动词 + 过去分词','意义'],rows:[['visiter','avoir visité','参观了'],['prendre','avoir pris','拿取或拍照了'],['déjeuner','avoir déjeuné','吃午饭了'],['rencontrer','avoir rencontré','遇见了']],note:'此表以本课没有前置直接宾语的基本句为准；暂不把高级宾语前置一致规则混入 A1 练习。'}),
 sec('02 aller、rentrer 与 être 的性数配合','本课“去市中心”“回家”使用 être 作助动词；过去分词与主语性数相配：je suis allée（女性叙述者）、il est allé、nous sommes rentrés（包含男性的混合群体）。与前面 avoir + visiter 的默认情况不同。',
 'elle est allée / il est allé / ils sont rentrés / elles sont rentrées',[
 e('Hier, je suis allée au centre-ville avec mon frère.','昨天我和弟弟去了市中心。','说话人女性，allé 加 -e。'),
 e('Mon frère est allé au musée avec moi.','弟弟和我一起去了博物馆。','男性单数主语用 allé。'),
 e('Nous sommes rentrés à cinq heures.','我们五点回家了。','原课说话者与兄弟同行，群体含男性，rentrés 用阳性复数。')
 ],'不能仅因为看见运动动词就全部用 être：marcher 常用 avoir，助动词应按具体动词及其用法判断。',
 {title:'être 助动词的基础配合',columns:['主语','aller','rentrer'],rows:[['il','est allé','est rentré'],['elle','est allée','est rentrée'],['ils / 混合群体','sont allés','sont rentrés'],['elles','sont allées','sont rentrées']],note:'几个有直接宾语时会换助动词的运动动词需进阶学习；这里严格围绕本课不及物用法。'}),
 sec('03 时间与行动顺序：hier、à midi、aujourd’hui','hier 标记昨天，à midi 指十二点，à cinq heures 指五点。相同一篇叙事可以先用复合过去时讲昨天的已完成动作，再用现在时说明今天在做什么。时间标记应与事件保持一致。',
 'Hier → à midi → à cinq heures → aujourd’hui',[
 e('Hier, nous avons visité un musée.','昨天我们参观了博物馆。','昨天的完整动作。'),
 e('À midi, nous avons déjeuné.','中午我们吃了午饭。','标明午餐时间，而非回家时间。'),
 e('Aujourd’hui, je regarde les photos.','今天我在看照片。','今天的事情用现在时，不能全篇机械使用过去时。')
 ],'原文“à cinq heures”对应回家，不是午餐。不能在摘要中将午餐改成五点。'),
 sec('04 否定已完成动作：ne…pas 围绕助动词','复合过去时的否定结构通常在变位助动词两侧：je n’ai pas visité、elle n’est pas rentrée；过去分词位于 pas 之后。否定句中不定冠词有时转为 de，需要结合原句实际宾语。A1 先保持核心时态和词序正确。',
 'je n’ai pas visité / nous ne sommes pas rentrés',[
 e('Je n’ai pas visité ce musée hier.','昨天我没有参观这座博物馆。','n’…pas 包围 ai，visité 在后。'),
 e('Elle n’est pas rentrée à midi.','她中午没有回家。','n’…pas 包围 est，rentrée 仍随 elle 配合。'),
 e('Nous n’avons pas pris de photos.','我们没有拍照。','否定包围 avons，常规不定量 des photos 可转为 de photos。')
 ],'je n’ai visité pas 和 je ne pas suis rentrée 均错在否定词的位置；不要把 pas 放在过去分词后。')
 ],
 questions:[
 {question:'改正：Je suis visité un musée hier.',answer:'J’ai visité un musée hier.',why:'visiter 在本课作为及物动词使用 avoir，过去分词是 visité。'},
 {question:'女性叙述者补空：Hier, je suis ___ au centre-ville. (aller)',answer:'allée',why:'aller 用 être，女性单数主语的过去分词加 -e。'},
 {question:'叙述者与弟弟五点回家：Nous sommes ___ à cinq heures. (rentrer)',answer:'rentrés',why:'原文同行群体包含一名男性，être 过去分词用阳性复数 -s。'},
 {question:'把 J’ai pris des photos. 改为否定。',answer:'Je n’ai pas pris de photos.',why:'ne…pas 围绕助动词 ai，prendre 的过去分词仍是 pris。'}
 ],
 output:'用至少八句法语重述原课昨天进城、参观、花园拍照、中午用餐、遇见熟人、五点回家及今天看照片的经过；配自然中文译文。',
 model:[
 e('Hier, je suis allée au centre-ville avec mon frère.','昨天我和弟弟去了市中心。','女性说话者 allé → allée。'),
 e('Nous avons visité un petit musée.','我们参观了一座小博物馆。','visiter 用 avoir。'),
 e('J’ai regardé les objets exposés.','我看了展出的物品。','新增不改变核心行动的自然延展。'),
 e('Dans le jardin, j’ai pris des photos.','我在花园里拍了照片。','prendre → pris。'),
 e('À midi, nous avons déjeuné dans un café.','中午我们在咖啡馆吃了午饭。','准确保留午餐时刻。'),
 e('Mon frère a rencontré un ancien ami.','弟弟碰见了一位老朋友。','rencontrer 用 avoir。'),
 e('Nous sommes rentrés à cinq heures.','我们五点回家。','rentrer 与主语配合。'),
 e('Aujourd’hui, je regarde les photos et je raconte notre sortie.','今天我看照片，并讲述我们的出行。','昨天的完成动作与今天现在时分开。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tap2.html','https://www.laits.utexas.edu/tex/gr/tap3.html'],
 sourceNote:'依据 fr-a1-u12 原稿的女性叙述者、弟弟、博物馆、午餐十二点、回家五点等原有信息编写，非原教材整段转载。'
},
{
 id:'fr-a1-yesterday-journey-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u12',
 title:'昨天的出行词汇：地点、时间、照片与讲述',subtitle:'按叙述时间线学习活动搭配，而非孤立词表',
 prerequisite:'会用 hier、aujourd’hui，认识 musée、jardin、café 和基本过去分词。',
 objective:'准确使用 aller au centre-ville、visiter un musée、prendre des photos、déjeuner dans un café、rencontrer un ami、rentrer 与 raconter。',
 sections:[
 sec('01 去、参观、回来：动词和地点介词组合','aller au centre-ville 是去市中心；visiter un musée 直接接宾语，不说 visiter à un musée；rentrer à la maison 表回家。三个动词的意义和句法不同，不能只翻译成笼统的“去”。',
 'aller au centre-ville / visiter un musée / rentrer à la maison',[
 e('Je suis allée au centre-ville.','我去了市中心。','aller à + le 缩合为 au。'),
 e('Nous avons visité un petit musée.','我们参观了一座小博物馆。','visiter 直接接博物馆。'),
 e('Nous sommes rentrés à cinq heures.','我们五点回家。','rentrer 描述回到出发地或住处。')
 ],'visiter à un musée 不是这里的标准搭配；à 与参观地点的介词用法不能照搬 aller。',{title:'基本搭配与信息',columns:['动词','补语','叙述作用'],rows:[['aller','au centre-ville','前往地点'],['visiter','un musée','参观对象'],['déjeuner','dans un café','午餐场所'],['rentrer','à cinq heures','返回时刻']],note:'时间和地点在摘要中不能混淆；五点是返回时刻，十二点才是午餐时刻。'}),
 sec('02 prendre des photos 与 regarder les photos','prendre des photos 是拍照；regarder les photos 是看照片；raconter une sortie 是讲述一次外出。三者分别是获取记录、回看记录和表达经历，不能因为都与照片有关就当成相同动作。',
 'prendre des photos → regarder les photos → raconter une sortie',[
 e('Hier, j’ai pris des photos dans le jardin.','昨天我在花园里拍了照片。','拍摄发生在昨天。'),
 e('Aujourd’hui, je regarde les photos.','今天我看照片。','今天回看，使用现在时。'),
 e('Je raconte notre sortie à une amie.','我给一位朋友讲述我们的外出。','raconter quelque chose à quelqu’un 的双宾语结构。')
 ],'regarder des photos 与 prendre des photos 不是同义表达；且过去拍照不表示今天仍在拍照。'),
 sec('03 人物关系：mon frère、un ancien ami、une amie','mon frère 是我的兄弟，un ancien ami 在这里是过去就认识的朋友，而非“年老的朋友”；une amie 为阴性单数，一位女性朋友。rencontrer quelqu’un 直接接宾语，不加 à。',
 'mon frère / un ancien ami / une amie / rencontrer quelqu’un',[
 e('Je voyage avec mon frère.','我和兄弟同行。','avec 指同伴。'),
 e('Mon frère a rencontré un ancien ami.','我的兄弟遇见了一位老朋友。','ancien 放在 ami 前表达旧识。'),
 e('Je raconte la visite à une amie.','我向一位女性朋友讲参观经历。','à 指接受叙述的人。')
 ],'un ancien ami 在该句更自然指一位旧识，不应直接译作年龄很大的朋友。'),
 sec('04 把时间词与叙事连接起来','hier 表昨天，à midi 是中午十二点，à cinq heures 是五点，aujourd’hui 是今天。puis、ensuite、après 可以帮助连接先后，但要有原文依据，不能加入不存在的车次、门票价格和具体停留时长。',
 'hier → à midi → à cinq heures → aujourd’hui',[
 e('Hier, nous avons visité un musée.','昨天我们参观了博物馆。','开场时间。'),
 e('À midi, nous avons déjeuné dans un café.','中午我们在咖啡馆吃午饭。','原稿具体时刻。'),
 e('Aujourd’hui, je raconte cette sortie.','今天我讲述那次外出。','从昨天的行动转到今天的回顾。')
 ],'“十二点在咖啡馆用餐”并不能证明“两小时后返回”；原稿只明确五点回家，没有给出路程。')
 ],
 questions:[
 {question:'填空：Nous avons ___ un petit musée. (visiter)',answer:'visité',why:'visiter 使用 avoir，过去分词为 visité；后面直接接 un petit musée。'},
 {question:'“拍照片”和“看照片”分别怎么说？',answer:'prendre des photos ; regarder les photos',why:'前者产生照片，后者查看已经存在的照片。'},
 {question:'un ancien ami 在原文中是什么意思？',answer:'一位旧识／老朋友',why:'ancien 前置表示从前就认识的，不是单纯描述其年龄。'},
 {question:'昨天几点吃午饭、几点回家？',answer:'À midi, nous avons déjeuné ; à cinq heures, nous sommes rentrés.',why:'两个时间词直接对应不同事件，不应互换。'}
 ],
 output:'用八句法语完整说出昨天与今天的活动；正确使用地点、时间与人物关系词组，给出逐句中文对照。',
 model:[
 e('Hier, je suis allée au centre-ville avec mon frère.','昨天我和弟弟去了市中心。','出发及同伴。'),
 e('Nous avons visité un petit musée.','我们参观了一座小博物馆。','参观对象。'),
 e('Le musée était intéressant.','博物馆很有意思。','添加简单感受，不冒充原稿明确报告。'),
 e('Dans le jardin, j’ai pris des photos.','我在花园里拍了照片。','拍照活动。'),
 e('À midi, nous avons déjeuné dans un café.','中午我们在咖啡馆吃午饭。','午餐时间。'),
 e('Mon frère a rencontré un ancien ami.','弟弟碰到了一位旧识。','人物关系。'),
 e('Nous sommes rentrés à cinq heures.','我们五点回家。','归家时间。'),
 e('Aujourd’hui, je regarde les photos et je raconte notre sortie à une amie.','今天我看照片并向朋友讲述我们的行程。','连接过去与现在。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tap2.html','https://www.laits.utexas.edu/tex/gr/tap3.html'],
 sourceNote:'与 fr-a1-u12 原始词汇和七句故事直接对应，所有教学例句项目原创。'
},
{
 id:'en-ielts-tfng-scope-grammar-u04',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-reading-u04',
 title:'IELTS Reading｜TRUE/FALSE/NOT GIVEN：量词与否定范围',
 subtitle:'根据三家图书馆的真实原课设定逐句找到支持、矛盾或未知',
 prerequisite:'知道 matching headings 与主张定位，能辨别 some / all、only、two / three、did not report。',
 objective:'根据阅读的具体事实判断 TRUE/FALSE/NOT GIVEN，不把未报道的信息误判为 FALSE，并保留样本、时间及资助状态的证据界限。',
 sections:[
 sec('01 三个答案不是“合理、不合理、不确定”','TRUE 表题干信息得到原文支持；FALSE 必须与原文明确矛盾；NOT GIVEN 则是既没有被支持也没有被否定。事实判断只使用当前文章证据，而不依赖读者对公共图书馆收费或政府资助的常识。',
 'TRUE = supported / FALSE = contradicted / NOT GIVEN = unstated',[
 e('A reading club pilot began in three libraries in 2024.','2024 年三家图书馆开展了阅读俱乐部试验。','原课明示。'),
 e('All three libraries met in the evening.','三家图书馆全部在晚上举办聚会。','与第三家只在周六上午聚会矛盾。'),
 e('The club received government funding.','俱乐部获得了政府资助。','原文没有透露经费来源，不能断定真假。')
 ],'NOT GIVEN 不是信息很少时随意选的“保底答案”，必须确认关键主张在全文没有得到支持或反驳。',
 {title:'三种答案及必要证据',columns:['题干状态','答案','理由'],rows:[['原文明示','TRUE','有支持句'],['与原文相反','FALSE','有反证句'],['未述及或无法判断','NOT GIVEN','两边均无明确依据'],['常识上可能为真','仍须看文本','常识不能替代证据']],note:'同一题的判断取决于原文，不取决于外界对公共服务一般如何运营。'}),
 sec('02 all、two、only 把数量范围锁定','two of the libraries 指三家中的两家；the third met only on Saturday mornings 说明第三家的时段。题干用 all three 将两家的属性扩展到全部，因而与明确的第三家安排矛盾。',
 'two of the three / the third only / all three = contradiction',[
 e('Two libraries offered evening meetings.','两家图书馆提供晚间会议。','精确数字 two。'),
 e('The third met only on Saturday mornings.','第三家仅在周六上午聚会。','only 排除晚间。'),
 e('Every library offered evening meetings.','每家图书馆都提供晚间会议。','扩大到 every，与第三家只在上午冲突。')
 ],'two of three 不能转述成 all three；“第一家”与“最早的图书馆”也是不同含义，不能凭空加最高级。'),
 sec('03 允许借书不等于免费，也不等于必须购买','could borrow the discussion book 说明有借阅的可能；没有谈借阅费用或所有参与者的使用方式。可以从“能够借”判断借阅是否可用，但不能由此推断全部书免费提供，或所有人都必须购买。',
 'could borrow ≠ had to buy / could borrow ≠ free of charge',[
 e('Participants could borrow the discussion book.','参加者可以借阅讨论用书。','文章明确允许借阅。'),
 e('All participants had to buy their own books.','所有人都必须自行买书。','与可借阅一书的明确选择相矛盾。'),
 e('Borrowing was entirely free of charge.','借阅完全不收费。','文本没有给出费用条件，属于 NOT GIVEN。')
 ],'must、all、free 等限定词往往决定对错；不能把 borrow 简单等同于 free。'),
 sec('04 没有披露经费与没有经费不是一回事','the report did not describe funding 表原报告未说明经费情况；does not compare costs 表不同图书馆成本未比较。没有数据不能证明没有政府拨款，也不能证明某一家成本更高。对于 some members wanted longer sessions，只能判断部分人提出诉求。',
 'did not describe funding ≠ received no funding',[
 e('The report did not describe the programme’s funding.','报告没有说明该项目的经费来源。','仅表信息缺失。'),
 e('Some members wanted longer sessions.','部分成员希望活动时间更长。','some 不代表所有人。'),
 e('The third library was the most expensive.','第三家图书馆成本最高。','没有成本比较，不能推断最高值。')
 ],'未比较成本不是三家成本相等；不能把缺失数据当作任何一种实测结论。')
 ],
 questions:[
 {question:'All three libraries offered evening meetings. TRUE/FALSE/NOT GIVEN？',answer:'FALSE',why:'两家提供晚间会议，但第三家只有周六上午，原文明确反驳 all three。'},
 {question:'Participants could borrow the discussion book. TRUE/FALSE/NOT GIVEN？',answer:'TRUE',why:'文章直接说明 participants could borrow the discussion book。'},
 {question:'The club received government funding. TRUE/FALSE/NOT GIVEN？',answer:'NOT GIVEN',why:'文章明确没有提供资助情况；不能凭公共图书馆背景推定有或没有政府资助。'},
 {question:'Every participant wanted longer sessions. TRUE/FALSE/NOT GIVEN？',answer:'NOT GIVEN',why:'some members 希望延长，不足以判断未被描述的其他人是否也有这种希望；不能把 some 当作“仅有一些”。'}
 ],
 output:'写八句英语 evidence check，准确区分三家场所的时段、书籍借阅、每月反馈、部分成员的诉求以及没有披露的资助与费用；逐句附中文对照。',
 model:[
 e('The reading-club pilot began in three libraries in 2024.','这项阅读俱乐部试验于 2024 年在三家图书馆展开。','原课的数量与日期。'),
 e('Two libraries offered evening meetings.','其中两家提供晚间活动。','数量为 two。'),
 e('The third library met only on Saturday mornings.','第三家仅在周六上午聚会。','直接排除 all three evenings。'),
 e('Participants could borrow the discussion book.','参加者可以借阅讨论用书。','原文支持借阅选择。'),
 e('The organisers collected written feedback monthly.','组织者每月收集一次书面反馈。','保留频率。'),
 e('Some members requested longer sessions.','部分成员希望活动更长。','保持 some 的范围。'),
 e('The report did not identify the funding source.','报告没有说明经费来源。','缺失不等于没有资助。'),
 e('It did not compare the costs of the three libraries.','报告也没有比较三家图书馆的成本。','避免编造成本排名。')
 ],
 referenceUrls:['https://www.ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading'],
 sourceNote:'以 en-ielts-reading-u04 原始 2024 年三馆阅读俱乐部脚本为事实骨架。全文案例原创，并非真实实证研究或官方 IELTS 真题。'
}
];