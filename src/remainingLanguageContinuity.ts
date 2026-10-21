import type {SpecialtyLesson,LearningSection,LearningExample,LearningTable} from './specialtyLibrary';
const ex=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Original bilingual lessons grounded in the mapped course topics and grammar reference entries. */
export const REMAINING_LANGUAGE_CONTINUITY:SpecialtyLesson[]=[
{
 id:'fr-countries-languages-lexicon',type:'vocabulary',language:'fr',level:'A1',unitLink:'fr-a1-u02',
 title:'国家、语言与居住地：从国籍到完整自我介绍',subtitle:'habiter à / en / au / aux；parler + langue',
 prerequisite:'会介绍姓名和使用 être，认识名词与形容词的基本概念。',
 objective:'能用自然法语表达居住城市、来源国家、国籍和所学语言，并准确处理地点介词与国籍性数。',
 sections:[
 sec('01 城市与国家的介词取决于地名类型',
 '去往或位于城市一般使用 à：à Paris、à Auckland。大多数阴性国家使用 en，辅音开头的阳性国家使用 au，复数国家使用 aux；部分阳性元音开头国家用 en。来源地点一般用 de / d’、du、des。学习时应把国家名、冠词性别和介词一起记忆。',
 'à Paris / en France / au Canada / aux États-Unis',[
 ex('J’habite à Auckland.','我住在奥克兰。','城市名 Auckland 前通常用 à。'),
 ex('Elle étudie en France.','她在法国学习。','France 是阴性国家名，使用 en。'),
 ex('Nous allons au Canada.','我们去加拿大。','Canada 阳性且辅音开头，使用 au。'),
 ex('Ils travaillent aux États-Unis.','他们在美国工作。','États-Unis 是复数国名，使用 aux。')
 ],'不能把所有国家都写成 à + 国家名；如“在法国”是 en France，而不是 à France。',
 {title:'地名与介词配套速查',columns:['地名类型','位于／前往','来自'],rows:[['城市','à Paris','de Paris'],['阴性国家','en France','de France'],['阳性国家','au Canada','du Canada'],['复数国家','aux États-Unis','des États-Unis']],note:'此表展示规则类型和示例，不代表每个以 -e 结尾的国名都必然阴性。'}),
 sec('02 区分国籍形容词和语言名词',
 '国籍作为形容词通常随被描述的人配合性数，语言名词则不按说话者性别变化。français 可表示法语，也可以用来描述男性国籍；française 是阴性国籍形式。句子要根据身份说明还是语言能力选择不同谓语。',
 'Il est français. / Elle est française. / Elle parle français.',[
 ex('Paul est français.','保罗是法国人。','français 作阳性国籍形容词。'),
 ex('Marie est française.','玛丽是法国人。','国籍形容词随 Marie 用阴性形式。'),
 ex('Marie parle français et anglais.','玛丽说法语和英语。','这里 français、anglais 是语言名词，不因 Marie 的性别变形。')
 ],'不能写 Elle parle française 表示“她说法语”；语言名词为 français。'),
 sec('03 来自哪里、住在哪里与出生在哪里不同',
 'venir de 描述来源，habiter à / en / au 说明现居地，être né(e) à / en / au 说明出生地。不能因一个人来自某国就自动推断其现居地或国籍。自我介绍时应把事实逐一说清楚。',
 'venir de + origine / habiter à + ville / être né(e) à + lieu',[
 ex('Je viens de Chine, mais j’habite à Paris.','我来自中国，但住在巴黎。','de Chine 与 à Paris 表达两个不同地点角色。'),
 ex('Je suis né à Lyon et je vis au Canada.','我出生于里昂，现在住在加拿大。（男性说话者）','出生地与现居地分别交代。'),
 ex('Elle vient des États-Unis et elle étudie en France.','她来自美国，在法国读书。','des 是复数国家的来源介词。')
 ],'“来自法国”与“住在法国”分别为 venir de France 和 habiter en France；介词不能互换。'),
 sec('04 把四类信息写成有逻辑的个人介绍',
 '介绍陌生人时先说明姓名或身份，再交代原籍和现居地，最后说语言学习目标。不同信息之间用 mais、maintenant、parce que 连接，不应将同一国家名重复列出而没有新内容。',
 'identité → origine → lieu de vie → langues → objectif',[
 ex('Je m’appelle Léa et je suis française.','我叫莱娅，是法国人。','先建立身份。'),
 ex('Je viens de Lyon, mais j’habite maintenant à Montréal.','我来自里昂，但现在住在蒙特利尔。','城市来源和现居地对照。'),
 ex('Je parle français et j’apprends l’anglais pour mes études.','我说法语，并为了学习而学习英语。','语言能力及目标。')
 ],'不要因为一句“j’apprends le français”就推断说话者是法国国籍；语言学习目标与国籍不是一回事。')
 ],
 questions:[
 {question:'填空：Elle habite ___ France.',answer:'en',why:'France 为阴性国名，“在法国”用 en France。'},
 {question:'填空：Nous allons ___ Canada.',answer:'au',why:'Canada 为阳性单数国家名，使用 au。'},
 {question:'改错：Marie parle française.',answer:'Marie parle français.',why:'此处法国是语言名词 français，而不是阴性国籍形容词。'},
 {question:'如何分别说“我来自巴黎”和“我住在巴黎”？',answer:'Je viens de Paris. / J’habite à Paris.',why:'来源与居住分别使用 de 和 à。'}
 ],
 output:'写六至八句法语个人介绍：姓名、现居城市、来源国家、国籍、一种会说的语言及一门正在学的语言；使用两个不同地点介词。',
 model:[
 ex('Bonjour, je m’appelle Lucas.','你好，我叫卢卡斯。','开场姓名。'),
 ex('Je suis français et je viens de Lyon.','我是法国人，来自里昂。','国籍和来源。'),
 ex('Maintenant, j’habite à Auckland.','现在我住在奥克兰。','现居城市。'),
 ex('Je parle français et un peu d’anglais.','我说法语，也会一点英语。','表达语言能力。'),
 ex('J’apprends aussi le japonais.','我也在学习日语。','区分已会的语言和正在学的语言。'),
 ex('Je veux pratiquer l’anglais à l’université.','我想在大学练习英语。','学习目标。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/pre3.html','https://www.laits.utexas.edu/tex/gr/adj2.html'],
 sourceNote:'对应 fr-a1-u02“Nationalités et langues”的 pays, langues, habiter, en/au/aux；规则经 Tex 地名介词核查，例句新写。'
},
{
 id:'fr-shop-services-lexicon',type:'vocabulary',language:'fr',level:'A2',unitLink:'fr-a2-u06',
 title:'购物与服务：尺码、价格、退换和比较用语',subtitle:'从试穿询价到提出理由充分的购买决定',
 prerequisite:'认识衣物名词、基础数量和颜色表达，会使用 plus / moins 与 je voudrais。',
 objective:'能问尺码、价格和付款方式，提出试穿及退换需求，比较两个选项并明确说明最终选择。',
 sections:[
 sec('01 衣物名词要与尺码、颜色组成短语',
 '法语购物对话中常使用 un pantalon、une chemise、une veste、des chaussures。试穿服装时可以问 une autre taille，颜色或尺码的提问通常要让对方知道具体指哪件商品。',
 'un pantalon / une veste / en taille M / en bleu',[
 ex('Je cherche une veste en taille M.','我在找一件 M 码外套。','chercher + 物品；en taille M 说明尺寸。'),
 ex('Avez-vous ce pantalon en noir ?','这条裤子有黑色的吗？','ce pantalon 指定物品，en noir 指颜色。'),
 ex('Ces chaussures sont trop petites.','这双鞋太小了。','chaussures 复数，petites 与其配合。')
 ],'une pantalon 不正确；pantalon 是阳性单数。不能仅背“裤子”中文而忽略冠词。',
 {title:'购物高频词组',columns:['法语','中文','适用场景'],rows:[['une taille','尺码','试穿/换码'],['une cabine d’essayage','试衣间','询问位置'],['un prix','价格','比较费用'],['un reçu','收据','退换凭证'],['un remboursement','退款','取消购买'],['un échange','换货','尺码不合适']],note:'购物场景应从商品与问题出发选择词，而不是把退款、换货、降价混为一种动作。'}),
 sec('02 从价格到付款方式的清楚提问',
 'Combien ça coûte ? 常用于问价；用 moins cher / plus cher 比较两件商品。付款常见 payer par carte 与 payer en espèces；询问是否接受卡片需要根据店铺实际政策，不应凭语法例句预设一律可用。',
 'Combien ça coûte ? / payer par carte / en espèces',[
 ex('Combien coûte cette chemise ?','这件衬衫多少钱？','combien coûte + 商品，直接询问价格。'),
 ex('Cette veste est moins chère que celle-là.','这件外套比那件便宜。','chère 与 veste 的阴性对应。'),
 ex('Est-ce que je peux payer par carte ?','我能刷卡付款吗？','礼貌询问可否使用银行卡。')
 ],'payer en carte 不是此处常见表达；应说 payer par carte。'),
 sec('03 尺码不合适时如何提出实际需求',
 '购物不仅需要形容商品，还要说清楚问题与诉求。être trop grand / trop petit 表示尺码不合适；essayer 表示试穿；échanger 表示换货，rembourser 表示退钱。请求退换不能省掉购买或收据等关键信息。',
 'essayer / échanger / demander un remboursement',[
 ex('Je peux essayer cette veste ?','我能试穿这件外套吗？','essayer + 商品。'),
 ex('Elle est trop grande pour moi.','它对我来说太大了。','trop grande 表达实际尺码问题。'),
 ex('Est-il possible de l’échanger contre une taille plus petite ?','可以把它换成更小的尺码吗？','échanger contre + 替代商品。'),
 ex('J’ai gardé le reçu.','我保留了收据。','收据通常是退换沟通的关键信息。')
 ],'échanger（换货）与 rembourser（退款）不是同义词；应准确表达诉求。'),
 sec('04 完整购买决定包含选择理由',
 '先比较尺寸与价格，再询问试穿或付款，最后决定购买、改尺码或暂不购买。表达最终决定时应保留实际约束，例如预算、颜色和用途，而不是泛泛说某商品“最好”。',
 'choix → prix → essayage → décision',[
 ex('La première veste est moins chère, mais elle est trop grande.','第一件外套较便宜，但尺码太大。','价格和尺码得出不同评价。'),
 ex('La deuxième me va mieux.','第二件更合身。','aller à quelqu’un 在试衣语境表示合适。'),
 ex('Je vais prendre la deuxième et payer par carte.','我打算买第二件并刷卡付款。','给出选择和付款方式。')
 ],'便宜不代表一定购买：如果衣物不合身，结论应反映尺码条件。')
 ],
 questions:[
 {question:'填空：Je cherche ___ pantalon bleu.',answer:'un',why:'pantalon 为阳性单数。'},
 {question:'如何礼貌询问能否试穿这件外套？',answer:'Est-ce que je peux essayer cette veste ?',why:'essayer 后直接接需要试穿的商品。'},
 {question:'改错：Je paie en carte.',answer:'Je paie par carte.',why:'银行卡付款的常用搭配是 payer par carte。'},
 {question:'要换尺码而不是退款，应使用哪个动词？',answer:'échanger',why:'échanger 表示换货，demander un remboursement 是要求退款。'}
 ],
 output:'写八轮店员与顾客的法语对话：商品、尺码、价格、试穿、比较、付款或换货需求至少各出现一次。',
 model:[
 ex('Bonjour, je cherche une veste en taille M.','你好，我在找一件 M 码外套。','明确需求。'),
 ex('Nous avons deux modèles.','我们有两种款式。','店员提供选项。'),
 ex('Combien coûte le premier ?','第一件多少钱？','询价。'),
 ex('Il est moins cher que le deuxième.','它比第二件便宜。','比较。'),
 ex('Est-ce que je peux l’essayer ?','我可以试穿它吗？','请求试穿。'),
 ex('Bien sûr, la cabine est à gauche.','当然，试衣间在左边。','指示位置。'),
 ex('Il est trop grand. Je préfère le deuxième.','它太大了，我更喜欢第二件。','陈述理由与决定。'),
 ex('D’accord. Vous souhaitez payer par carte ?','好的，您要刷卡吗？','付款提问。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/adj6.html','https://www.laits.utexas.edu/tex/gr/pre1a.html'],
 sourceNote:'对应 fr-a2-u06 购物比较与服务词汇，服装、付款和退换的场景句由本项目编写。'
},
{
 id:'en-reported-speech-listening',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u02',
 title:'转述讲者的观点与提问：reported statements and questions',
 subtitle:'在听力笔记中保留是谁说、说了什么及证据力度',
 prerequisite:'掌握英语基本时态，能辨认说话者及 yes/no、wh- 问句。',
 objective:'能将直接陈述、一般疑问句与特殊疑问句转为间接转述，正确使用 said/told/asked 和词序，并保留原有语气限定。',
 sections:[
 sec('01 转述要保留说话者与主张的来源',
 '直接引语呈现原话；间接引语将内容放进 reported clause。said 可以不带接话人，told 后通常要有宾语，如 told us。过去时间背景下，时态常发生后移，但若所述事实仍有效，是否后移还取决于语境。',
 'speaker + said (that)… / speaker + told us (that)…',[
 ex('The lecturer said that the rooms were busy.','讲者说房间很繁忙。','said that 交代信息来源，而非证明说法正确。'),
 ex('She told us that the method had limitations.','她告诉我们该方法存在局限。','told 后有受话对象 us。'),
 ex('The lecturer explained that occupancy did not measure achievement.','讲者解释占用情况不能衡量学业表现。','explained that 说明观点归属，保留否定。')
 ],'不能写 She told that… 而省掉受话对象；若没有对象，用 She said that… 更合适。',
 {title:'转述动词与句型',columns:['动词','结构','功能'],rows:[['say','say (that) + 陈述','转述说法'],['tell','tell + 人 + (that) + 陈述','告知对象'],['ask','ask + 人 + if/whether…','转述是非问题'],['ask','ask + 人 + wh-从句','转述特殊问题']],note:'转述动词反映说话行为，不代表所转述命题自动真实。'}),
 sec('02 间接陈述中的时态与指代变化',
 '当转述动词采用过去时，原句现在时可能转为过去时、will 可转为 would、现在完成时可转为过去完成时。代词及 today、tomorrow 等时间词应从转述者的位置核对；具体变换不是无条件的机械公式。',
 '“I will return tomorrow.” → She said she would return the next day.',[
 ex('“I need more time,” he said. → He said he needed more time.','他说“我需要更多时间”。→ 他表示需要更多时间。','过去时转述中 need 常后移为 needed。'),
 ex('“I will check the figures,” she said. → She said she would check the figures.','她说将核对数字。','will 后移为 would。'),
 ex('“The Earth goes round the Sun,” she said. → She said the Earth goes round the Sun.','她说地球绕太阳运转。','仍为真的普遍事实可以保留现在时。')
 ],'不能要求所有间接引语都必须后移；事实是否仍成立、报告时间与原话关系都影响选择。'),
 sec('03 转述问题时恢复陈述词序',
 '转述一般疑问句通常用 if / whether，引导后面主语在前、动词在后的陈述词序。特殊问句保留 what、why、when、how 等疑问词，但同样不用 do/does/did 倒装问句结构。',
 'asked whether + 主语 + 谓语 / asked why + 主语 + 谓语',[
 ex('“Are the rooms available?” → He asked whether the rooms were available.','“房间可用吗？”→ 他询问房间是否可用。','whether 后恢复 rooms were 陈述词序。'),
 ex('“When does the lecture begin?” → She asked when the lecture began.','“讲座什么时候开始？”→ 她询问讲座何时开始。','间接问句不用 does，谓语为 began。'),
 ex('“Why did they leave?” → He asked why they had left.','“他们为何离开？”→ 他询问他们离开的原因。','保留 why，删去原来的 did 倒装。')
 ],'He asked where did they go 是把直接问句词序误带入间接问句；应为 where they had gone / where they went。',
 sec('04 把观点、问题与证据边界写成可靠摘要',
 '听力笔记先区分谁提出研究问题、谁报告观察、谁提醒限制。转述时同时保留 may、might、not necessarily 等限定，不能将提问改写成已证实的结论。',
 'question → speaker attribution → observation → limitation',[
 ex('The speaker asked whether additional study spaces would improve learning.','讲者询问新增学习空间是否会改善学习。','asked whether 表明问题未被当成事实。'),
 ex('She said that occupancy data showed when rooms were used.','她说占用数据表明房间何时有人使用。','报告观察范围。'),
 ex('She added that such data did not necessarily show better results.','她补充说这类数据未必证明更好的学习结果。','not necessarily 保留结论限制。')
 ],'asked whether 不能直接改成 proved that；研究问题与研究结论不是同一种信息。')
 ],
 questions:[
 {question:'改写：She told that the lecture had ended.',answer:'She said that the lecture had ended. / She told us that the lecture had ended.',why:'tell 在这里需要受话对象，say 不需要。'},
 {question:'转述：The speaker asked, “Are the rooms open?”',answer:'The speaker asked whether the rooms were open.',why:'是非问题改用 whether / if，后面恢复陈述词序。'},
 {question:'纠错：He asked where did the students go.',answer:'He asked where the students went.',why:'间接问句不保留倒装，where 后为主语 students 再接 went。'},
 {question:'为什么 asked whether 不等于 proved that？',answer:'前者报告待回答问题，后者声称已得到证明。',why:'两种动词结构的证据力度不同，不能只作词汇替换。'}
 ],
 output:'写 100–130 词英文讲座笔记摘要：一项讲者的问题、两处来源归属、一个数据观察和一个尚未得到证明的结论；至少使用 reported question 与 reported statement。',
 model:[
 ex('The lecturer began by asking whether providing additional study rooms would improve learning.','讲者首先询问增设学习室是否能够改善学习。','用 whether 保留问题状态。'),
 ex('She explained that facility use could be recorded at different times.','她解释说可以在不同时间记录设施使用情况。','could 保留能力而不虚构结果。'),
 ex('She then said that students might have different schedules and preferences.','随后她说学生可能有不同的时间安排和偏好。','might 限定概括力度。'),
 ex('The speaker noted that a busy room did not necessarily indicate better grades.','讲者指出繁忙的房间并不必然意味着更好的成绩。','保留 not necessarily。'),
 ex('Finally, she asked what evidence would be needed to evaluate educational outcomes.','最后她询问评估教育成果还需要哪些证据。','特殊问题用陈述语序。')
 ],
 referenceUrls:['https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-questions'],
 sourceNote:'与 en-ielts-listening-u02“speaker stance and purpose”相连。转述语序依据 British Council 核对，听力示例沿用课程已建立的学习空间情境但不冒充真实语音逐字稿。'
},
{
 id:'en-stance-lexicon-listening',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u02',
 title:'讲者态度词汇：主张、怀疑、保留与支持',subtitle:'从动词义项和语块判断说话者的证据态度',
 prerequisite:'能理解 academic lecture、observation、evidence 的基本含义，认识 because/however。',
 objective:'能在讲座笔记里区分 argue、suggest、acknowledge、question、doubt、support 等动词及其常见搭配，避免夸大原话。',
 sections:[
 sec('01 提出观点与提出证据不是同一种行为',
 'argue that 表示论证某立场，claim that 表示提出主张，suggest that 常表示一种较审慎的解释。选择转述动词应基于讲者说话的实际功能，而不是想让摘要看起来更正式。',
 'argue that / claim that / suggest that',[
 ex('The speaker argues that more flexible rooms are needed.','讲者认为需要更灵活的房间。','argues that 标示主张。'),
 ex('The results suggest that demand varies across the day.','结果提示需求在一天中存在变化。','suggest 不必然达到证明力度。'),
 ex('The lecturer claims that the approach is effective.','讲者声称这种方法有效。','claim 表明提出了主张，不保证真实。')
 ],'suggest 不等于 prove；即使两句都谈同一个现象，也不能抹去确定性差别。',
 {title:'讲者态度动词和功能',columns:['动词 / 语块','功能','常见结构'],
 rows:[['argue that','论证主张','argue that + 句子'],['suggest that','提出可能解释','suggest that + 句子'],['acknowledge that','承认事实或局限','acknowledge that + 句子'],['question whether','质疑是否成立','question whether + 句子'],['support a claim','用证据支持','support + 名词']],note:'结构是语言功能提示，不自动等同于证据等级。'}),
 sec('02 承认局限与表达怀疑有区别',
 'acknowledge a limitation 表示正视研究缺陷；question an assumption 表示质疑某个前提；doubt that 可以表达明显怀疑。听到讲者用 although、however 或 yet 转折时，应判断其是否缩小了前一句结论范围。',
 'acknowledge a limitation / question an assumption / doubt that',[
 ex('The lecturer acknowledges a limitation in the sample.','讲者承认样本存在局限。','acknowledges 不是直接反对整个研究。'),
 ex('She questions whether the measure captures learning.','她质疑该指标能否衡量学习。','questions whether 指向尚待回答的问题。'),
 ex('He doubts that occupancy alone establishes a causal effect.','他怀疑单凭占用情况就能确立因果效应。','doubts that 明确对特定断言的怀疑。')
 ],'承认一项局限不等于否定所有观察结果；要读清楚局限针对哪一部分。'),
 sec('03 支持、反驳与证据不足不能混为一谈',
 'support a claim 指证据有助于支持主张；contradict a claim 指证据与主张相抵触；fail to establish 表示证据未能确立某结论。最后一种并非必然证明相反结论是真的。',
 'support / contradict / fail to establish',[
 ex('The observations support a claim about peak usage.','观察支持有关高峰使用时段的主张。','支持范围仅涉及使用时间。'),
 ex('The new finding contradicts the earlier estimate.','新发现与先前估计相矛盾。','contradicts 表示内容抵触。'),
 ex('These figures fail to establish an improvement in grades.','这些数字未能确立成绩有所提高。','fail to establish 不是证明成绩下降。')
 ],'“尚未证明提高”不能自动改写成“已经证明未提高”，二者逻辑不同。'),
 sec('04 从听力信号词到结构化态度笔记',
 '长讲座可能先陈述观点，再举例说明，然后承认限制并给出条件性结论。应在笔记中保留每一步的信息来源、所讨论的变量及语气强度；选择动词比简单罗列 however、therefore 更重要。',
 'speaker → claim → supporting observation → qualification',[
 ex('First, the lecturer raises a question about facility demand.','首先讲者提出设施需求问题。','raises a question 不是下结论。'),
 ex('She then describes observations of room usage.','然后她介绍房间使用情况的观察。','describes 强调介绍实际观察。'),
 ex('Finally, she acknowledges that occupancy is not a direct measure of achievement.','最后她承认占用情况并非学业成绩的直接指标。','acknowledges 保留关键限制。')
 ],'用 strongly proves 或 definitely causes 重写讲者温和的建议，会抬高原话确定性。')
 ],
 questions:[
 {question:'The findings ___ that demand may vary.（suggest / prove）',answer:'suggest',why:'may 表示可能性，与 suggest 一致；prove 会不合理地提高力度。'},
 {question:'如何表达“承认一项局限”？',answer:'acknowledge a limitation',why:'acknowledge + 名词表示承认某项事实或局限。'},
 {question:'“证据未能证明改善”可否写成 “证据证明没有改善”？',answer:'不可以。',why:'absence of established evidence 与 evidence of absence 不同。'},
 {question:'question whether 在笔记里表示提出结果还是提出问题？',answer:'提出或质疑一个尚待回答的问题。',why:'whether 保留条件或可能性，不是直接陈述证明。'}
 ],
 output:'写八至十句英语笔记，分别注明讲者提出的主张、支持性观察、质疑和局限，并至少使用四个不同的讲者态度动词或语块。',
 model:[
 ex('The lecturer raises a question about study-room demand.','讲者提出学习室需求问题。','开始报告发言功能。'),
 ex('She suggests that student preferences may differ.','她认为学生偏好可能存在差异。','suggests 和 may 双重限定。'),
 ex('She acknowledges that occupancy only measures facility use.','她承认占用情况仅衡量设施使用。','限定指标边界。'),
 ex('The examples support an explanation of different schedules.','这些例子有助于解释时间安排差异。','说明性支持，不夸大数据。'),
 ex('The speaker questions whether these observations establish better academic outcomes.','讲者质疑这些观察能否证明更好的学业结果。','质疑核心推断。'),
 ex('Her conclusion therefore remains cautious.','因此她的结论保持审慎。','收束态度而非冒充真实研究结论。')
 ],
 referenceUrls:['https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA','https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs'],
 sourceNote:'对接 en-ielts-listening-u02 讲者观点及目的；词汇按语用功能、搭配和证据力度分组，句子原创。'
}
];