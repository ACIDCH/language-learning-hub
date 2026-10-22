import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const ex=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});

/** Original bilingual materials mapped to existing syllabus units. Rules cross-checked against Tex and IELTS sources. */
export const NEXT_CURRICULUM_CONTINUITY:SpecialtyLesson[]=[
{
 id:'fr-pluperfect-narration-b1',type:'grammar',language:'fr',level:'B1',unitLink:'fr-b1-u01',
 title:'愈过去时 plus-que-parfait：交代过去事件之前的事',subtitle:'passé composé、imparfait 与 plus-que-parfait 的时间先后',
 prerequisite:'能正确构造 passé composé 与 imparfait，了解 avoir/être 的复合时态助动词。',
 objective:'用 imparfait 的 avoir/être + 过去分词形成愈过去时，描述先于另一过去事件的动作，区分事件、背景与先行事实。',
 sections:[
 sec('01 助动词改为 imparfait，过去分词不变',
 'plus-que-parfait 的助动词 avoir 或 être 采用 imparfait，后接过去分词。选择 avoir 还是 être 基本沿用该动词在 passé composé 中的选择；être 的过去分词性数配合规则也应保持。',
 'avoir/être (imparfait) + participe passé',[
 ex('J’avais déjà terminé le rapport.','我那时已经完成了报告。','avais 是 avoir 的 imparfait，terminé 是过去分词。'),
 ex('Elle était partie avant midi.','她在中午之前已经离开。','partir 选 être；partie 与阴性 elle 配合。'),
 ex('Nous avions réservé une chambre.','那时我们已经预订了一间房。','avions + réservé 构成愈过去时。')
 ],'Je suis parti 是复合过去时；J’étais parti 是愈过去时。不要只看过去分词判断时态。',
 {title:'形式对照',columns:['动词','passé composé','plus-que-parfait'],rows:[['terminer','j’ai terminé','j’avais terminé'],['venir','elle est venue','elle était venue'],['finir','nous avons fini','nous avions fini'],['partir','ils sont partis','ils étaient partis']],note:'以变位助动词判定时态；使用 être 时注意相应性数配合。'}),
 sec('02 时间线：先前动作相对于后一个过去节点',
 'plus-que-parfait 的参照点是另一个过去事件或过去时刻，而不是“距离现在很久”。叙述时可先介绍后一事件，再使用 plus-que-parfait 回溯原因或准备情况；avant、déjà 常见，但不是必须。',
 '过去更早 A (plus-que-parfait) → 过去较晚 B (passé composé)',[
 ex('Quand je suis arrivé, le cours avait déjà commencé.','我到达时，课程早已开始。','avait commencé 先于 suis arrivé。'),
 ex('Nous avons trouvé le musée que nous avions visité l’année précédente.','我们找到了去年曾参观过的博物馆。','参观发生在“找到”之前。'),
 ex('Elle a compris pourquoi son collègue était parti tôt.','她明白了同事为何早早离开。','同事的离开发生在明白原因之前。')
 ],'不能把所有过去发生的动作都改成 plus-que-parfait：叙事主线上发生的事件仍常用 passé composé。'),
 sec('03 背景与更早事实不是一个时间层次',
 'imparfait 主要刻画过去背景、习惯、状态；passé composé 叙述事件；plus-que-parfait 补充故事节点之前已经完成的事实。一段话可以同时出现三者，需根据事件之间的关系选择。',
 '背景 (imparfait) + 事件 (passé composé) + 更早事实 (plus-que-parfait)',[
 ex('Il pleuvait quand nous sommes arrivés à la gare.','我们到车站时正在下雨。','pleuvait 是背景，sommes arrivés 是事件。'),
 ex('Le train était déjà parti quand nous sommes arrivés.','我们到达时火车已经开走了。','était parti 是先于到达的事件。'),
 ex('Je cherchais mes clés, car je les avais laissées au bureau.','我正在找钥匙，因为之前把它们落在办公室了。','cherchais 是背景，avais laissées 更早；前置直接宾语 les 指阴性复数 clés。')
 ],'imparfait 与 plus-que-parfait 不是“动作长短”的区别，而是背景和时间参照的区别。'),
 sec('04 否定、depuis 与 venir de 的边界',
 'plus-que-parfait 否定时，ne…pas 围绕助动词。表示“在某个过去时刻之前一直持续”的状态，法语常用 imparfait + depuis；“当时刚刚做过”常用 venir de 的 imparfait，不必照英语 had 逐字转换。',
 'n’avais pas fini / attendais depuis… / venais de partir',[
 ex('Je n’avais pas encore fini quand elle est arrivée.','她到的时候我还没有完成。','pas encore 环绕过去助动词 avais。'),
 ex('Il attendait depuis une heure quand le bus est arrivé.','公交车到时他已经等了一个小时。','延续状态用 attendait depuis。'),
 ex('Nous venions de sortir quand il a commencé à pleuvoir.','开始下雨时我们刚刚出门。','venions de + 不定式表示过去刚发生的动作。')
 ],'英语 had been waiting 不意味着法语必定用 plus-que-parfait；应先判断 depuis 的延续状态。')
 ],
 questions:[
 {question:'改写成 plus-que-parfait：Elle est partie.',answer:'Elle était partie.',why:'être 的助动词变为 imparfait était；partie 保留与 elle 的阴性配合。'},
 {question:'填空：Quand nous sommes arrivés, le film ___ déjà ___ (commencer).',answer:'avait déjà commencé',why:'电影开始早于到达，助动词 imparfait avait + 过去分词 commencé。'},
 {question:'为什么 “Il attendait depuis une heure” 不一定用 plus-que-parfait？',answer:'因为 depuis 可以与 imparfait 连用，表达在某个过去参照时刻持续了一段时间的状态。',why:'判断时态要看状态的延续与叙事参照，不按英语 had 机械翻译。'},
 {question:'否定：J’avais terminé le travail.（尚未完成）',answer:'Je n’avais pas encore terminé le travail.',why:'n’…pas encore 围绕助动词 avais，过去分词在后。'}
 ],
 output:'写八句法语短故事：必须包含过去天气或环境背景、两个实际发生的事件、一个更早的先行事实、一句否定和最终结果，并清楚标示时间先后。',
 model:[
 ex('Il pleuvait quand je suis arrivé à la gare.','我到车站时正在下雨。','背景 imparfait 与到达事件。'),
 ex('J’étais parti de chez moi trop tard.','我此前离家太晚。','愈过去时回溯先前动作。'),
 ex('Le train était déjà parti.','火车早已开走了。','说明到达前已完成的事件。'),
 ex('Je n’avais pas vérifié les horaires.','我之前没核对时刻表。','愈过去时否定，补充原因。'),
 ex('J’ai appelé un ami pour lui expliquer la situation.','我给朋友打电话解释情况。','passé composé 推进叙事。'),
 ex('Il m’a conseillé de prendre le bus.','他建议我坐公交车。','新事件与宾语代词。'),
 ex('J’ai attendu vingt minutes avant de monter dans le bus.','我等了二十分钟才上公交车。','叙述下一项完整事件。'),
 ex('Finalement, je suis arrivé au rendez-vous avec un peu de retard.','最终我稍晚了一点才到约定地点。','以结果收尾。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tap9.html','https://www.laits.utexas.edu/tex/gr/tap8.html'],
 sourceNote:'对应现有 fr-b1-u01 三种过去时叙述目标，规则校核参考 Tex plus-que-parfait，例句原创。'
},
{
 id:'fr-past-conditional-regret-b2',type:'grammar',language:'fr',level:'B2',unitLink:'fr-b2-u04',
 title:'过去条件式：过去未实现的条件、后悔与另一种结果',subtitle:'先理解 plus-que-parfait，再构造 conditionnel passé',
 prerequisite:'已学 plus-que-parfait、conditionnel présent 和复合过去时的助动词及配合。',
 objective:'掌握 avoir/être 条件式 + 过去分词，正确使用 si + plus-que-parfait → conditionnel passé 并区别事实与未发生的可能性。',
 sections:[
 sec('01 过去条件式是复合形式',
 'conditionnel passé 通常由助动词 avoir 或 être 的条件式现在时，加相应过去分词构成。它不同于单个动词的 conditionnel présent；助动词选择与配合基本延续复合时态规则。',
 'aurais/aurait/aurions… + participe passé；serais/serait/serions… + participe passé',[
 ex('J’aurais accepté cette proposition.','我本来会接受这项建议。','aurais + accepté 表示未发生或带条件的过去行为。'),
 ex('Elle serait arrivée plus tôt.','她本可以更早到达。','être 条件式 serait + arrivée（阴性配合）。'),
 ex('Nous aurions pris le train.','我们原本会乘火车。','aurions + pris 是 avoir 的过去条件式结构。')
 ],'Je viendrais 是现在条件式，Je serais venu(e) 是过去条件式；一个谈假想现在/将来，一个通常表示与过去有关的结果。',
 {title:'常用助动词过去条件式',columns:['主语','avoir','être'],rows:[['je','aurais','serais'],['tu','aurais','serais'],['il / elle','aurait','serait'],['nous','aurions','serions'],['vous','auriez','seriez'],['ils / elles','auraient','seraient']],note:'表内只有助动词，完整过去条件式必须继续接过去分词。'}),
 sec('02 与过去事实相反的 si 条件句',
 '说话人描述过去没有满足的条件及因此未发生的结果时，si 从句用 plus-que-parfait，结果句用 conditionnel passé。真实过去发生了什么，需要由上下文或其他句子交代，不能将假设说成已证实结果。',
 'Si + plus-que-parfait, conditionnel passé',[
 ex('Si nous étions partis plus tôt, nous aurions pris le train.','如果我们早些出发，本来就能赶上火车。','étions partis 是先行的愈过去时，aurions pris 是未实现的过去结果。'),
 ex('Si j’avais étudié davantage, j’aurais mieux compris le cours.','如果我更认真学习，本可以更好理解课程。','avais étudié 与 aurais compris 标记未实现的过去。'),
 ex('Elle serait venue si elle avait été libre.','如果她有空，本来就会来。','结果句可以放在 si 句之前，时态不变。')
 ],'Si j’aurais su 不符合该条件结构；应使用 Si j’avais su。'),
 sec('03 regretter、aurais dû、aurais pu 的区别',
 'regretter de + 不定式表达后悔；j’aurais dû + 不定式表示本应该做但没有做；j’aurais pu + 不定式表示原本有机会或能力却未实现。三者不能互作精确同义词。',
 'regretter de… / j’aurais dû… / j’aurais pu…',[
 ex('Je regrette de ne pas avoir répondu.','我后悔没有回复。','regretter de + 复合不定式表示已过去的动作。'),
 ex('J’aurais dû vérifier les horaires.','我本应该核对时刻表。','aurais dû 表达事后评价。'),
 ex('Nous aurions pu demander conseil.','我们本来可以征求建议。','aurions pu 表示本可采取而未采取的措施。')
 ],'J’aurais dû 不只是“我可以”：它常带“本应如此”的责任或建议意味。'),
 sec('04 清楚分开真实事件、反事实与收获',
 '完整的事后分析应先写清楚过去实际发生了什么，再提出未实现的条件和另一种结果，最后说明从经历中得到的可执行改进。避免整篇连续使用 si 而不报告真实事实。',
 '真实过去 → 假设条件 → 可能结果 → 未来改进',[
 ex('Nous sommes arrivés en retard parce que nous avions mal lu les horaires.','我们迟到了，因为之前看错了时刻表。','先陈述真实事件与更早原因。'),
 ex('Si nous les avions vérifiés, nous aurions choisi un autre trajet.','如果之前核对过，我们本会选另一条路线。','si + 愈过去时 / 条件式过去时。'),
 ex('La prochaine fois, nous préparerons notre départ à l’avance.','下次我们会提前准备出发。','以可执行的未来改进收束。')
 ],'对过去的假设不是实验结果；“本会成功”只说明说话人的设想，不能拿它当已发生事实。')
 ],
 questions:[
 {question:'完成：Nous ___ (avoir, conditionnel) réservé plus tôt.',answer:'aurions',why:'nous 的 avoir 条件式为 aurions，接过去分词 réservé。'},
 {question:'填空：Si elle ___ (partir) plus tôt, elle ___ (arriver) à l’heure.（阴性单数）',answer:'était partie ; serait arrivée',why:'先前条件 plus-que-parfait；结果过去条件式，使用 être 并保持阴性单数配合。'},
 {question:'改错：Si j’aurais su, je serais venu.',answer:'Si j’avais su, je serais venu.',why:'si 从句用 plus-que-parfait avais su，不能用 aurais su。'},
 {question:'哪一个更接近“本应该”：j’aurais dû 还是 j’aurais pu？',answer:'j’aurais dû',why:'devoir 的过去条件式常表达未履行的义务或事后评价，pouvoir 强调本有可能。'}
 ],
 output:'写八句法语分析一次过去的选择：说明实际情况、一个提前发生的因素、两种未实现的替代方案、一次后悔及下一次改进。',
 model:[
 ex('Samedi, nous avons manqué notre train.','周六我们错过了火车。','先交代真实事实。'),
 ex('Nous avions quitté la maison trop tard.','我们此前离家太晚。','愈过去时提供原因。'),
 ex('Je n’avais pas vérifié les horaires.','我之前没有核对时刻表。','过去未完成的准备。'),
 ex('Si je les avais vérifiés, nous serions partis plus tôt.','如果我提前核对过，我们本会更早出发。','过去反事实条件与结果。'),
 ex('Nous aurions aussi pu prendre un bus direct.','我们原本还可以坐直达公交。','表达未选择的方案。'),
 ex('J’aurais dû préparer le trajet la veille.','我本应前一天规划好路线。','表达事后责任。'),
 ex('Cette expérience m’a appris à mieux organiser mes déplacements.','这次经历让我懂得更好规划出行。','说明收获。'),
 ex('La prochaine fois, je confirmerai tous les départs à l’avance.','下次我会提前确认所有出发时间。','具体未来改进。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tac3.html','https://www.laits.utexas.edu/tex/gr/tap9.html'],
 sourceNote:'对应 fr-b2-u04 过去假设和后悔，源规则以 Tex si clauses + plus-que-parfait 为准。'
},

{
 id:'en-process-report-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u05',
 title:'IELTS 流程写作：一般现在时被动语态与阶段顺序',subtitle:'六阶段从废纸收集到干燥后裁切再利用',
 prerequisite:'掌握 be + past participle，认识一般现在时及 before/after/once。',
 objective:'将原课程中的收集、分类、制浆、去杂质和铺展、压干、裁切六组动作逐一写成有顺序的流程段落，不增加包装环节。',
 sections:[
 sec('01 流程 overview 先描述起点、材料转化和终点',
 '流程图 overview 要写出输入材料、主要变化与最后产出，而不是一口气列出六个动词。原始稿始于从指定回收箱收集废纸，终于干燥的纸张被裁切以供再利用。图是示意并非完整工业说明。',
 'The process begins with ... / ends when the dried sheet is cut',[
 ex('The process begins with used paper collected from bins.','流程始于从回收箱收集废纸。','概述起点，不添加车辆运输或工人信息。'),
 ex('The paper is converted into pulp before being formed into sheets.','纸张先制成纸浆，再成形为纸张。','保留核心材料状态变化。'),
 ex('The dry sheet is finally cut for reuse.','干燥的纸张最后被裁切以供再利用。','原稿明确的终点是裁切，不是包装。')
 ],'不能把初稿另一张图的 dried and packed 当作本课终点，原始文字没有包装工序。',
 {title:'原始课文与六步图完全一致的阶段表',columns:['阶段','源稿明确动作'],rows:[
 ['1','Used paper is collected from designated bins'],
 ['2','Collected paper is sorted to remove unsuitable material'],
 ['3','Selected paper is mixed with water to form pulp'],
 ['4','Unwanted particles are removed; pulp is spread thin'],
 ['5','Water is pressed out; the sheet is dried'],
 ['6','Dried material is cut for reuse']
 ],note:'这是一份原创简化流程，与原稿和课堂 SVG 六阶段完全一致，并非 IELTS 官方试卷；没有包装环节。'}),
 sec('02 一般现在时被动把处理对象放到主语位置',
 '机械流程着重说明材料发生什么变化，使用 is/are + past participle。is collected、is sorted、is mixed、are removed 中的 be 与主语数一致。只有当原图明确指出操作人员时才需要补上 by + 施事者。',
 'paper is collected / particles are removed / mixture is spread',[
 ex('Used paper is sorted after collection.','废纸收集后经过分类。','is sorted 是一般现在时被动。'),
 ex('Selected paper is mixed with water to form pulp.','选出的纸张与水混合形成纸浆。','叙述材料变化而非操作人员。'),
 ex('Unwanted particles are removed before forming the sheet.','纸张成形前先去除不需要的颗粒。','particles 复数对应 are。')
 ],'不能用 is sorting 表示纸张“正在分类自己”，也不能写 particles is removed 造成主谓数错误。'),
 sec('03 after、before 与 once 要对应真实前后顺序',
 'before/after 可以连接完整从句，也可连接 -ing 短语；但必须保证隐含主语不会导致动作错位。正确顺序为先分类、加水形成纸浆、去杂质并铺展，再压出水分并干燥。',
 'After unwanted particles are removed, the pulp is spread into a thin layer',[
 ex('After the paper is sorted, it is mixed with water.','纸张分类后与水混合。','after 从句具有主语和被动谓语。'),
 ex('Once particles have been removed, the pulp is spread into a thin layer.','去除杂质后，把纸浆铺成薄层。','once 强调前一步完成。'),
 ex('Before the dry material is cut, the sheet is pressed and dried.','干燥材料裁切之前，薄纸层先经过压制和干燥。','before 限定先压干、再裁切。')
 ],'After cleaned the pulp 既缺少清晰主语，也不符合标准从句或 -ing 结构；应写 After the pulp is cleaned。'),
 sec('04 阶段分组不是调换步骤，也不应造参数',
 '描述全图时可把前半段分成收集、分类和制浆，后半段分成去杂质成形、压干与裁切。分组帮助读者理解材料变化，但不能把包装、温度、时长或产量等未报告事项作为图示事实。',
 'first / after that / once / finally / cut for reuse',[
 ex('First, the paper is collected and sorted.','首先收集废纸并将其分类。','整合连续的准备阶段。'),
 ex('The mixture is then cleaned and spread into a thin layer.','然后去除混合物中的杂质并铺成薄层。','保留去杂质与铺展顺序。'),
 ex('Finally, the dried sheet is cut for reuse.','最后将干燥纸张裁切以供再利用。','与原稿终点严格一致。')
 ],'不能因了解现实工厂操作就给图示加上机器型号、回收产量或包装步骤。')
 ],
 questions:[
 {question:'将 Workers sort the used paper 改为一般现在时被动。',answer:'The used paper is sorted.',why:'单数不可数 paper 对应 is sorted；未指定操作人员时不必添加 by workers。'},
 {question:'去杂质与铺成薄层哪一步在前？',answer:'Unwanted particles are removed before the pulp is spread.',why:'原稿先清理混合物，再铺展形成薄层，必须保留工序顺序。'},
 {question:'改正 After cleaned the pulp, it pressed into sheets。',answer:'After the pulp has been cleaned and spread, water is pressed out and the sheet is dried.',why:'after 后用完整从句且要区分浆料铺展与后续压出水分的动作。'},
 {question:'本课的最后一步是干燥包装还是裁切再利用？',answer:'The dried material is cut for reuse. Packing is not in the source.',why:'原始 U05 草稿以 cut for reuse 为终点；不能将其他版本图示里的包装误当成已提供事实。'}
 ],
 output:'根据原稿匹配的六阶段 SVG 流程，撰写 150–180 词英文 Task 1 报告并附完整中文，包括 overview、一般现在时被动、合理分组及未知参数限制。',
 modelParagraphStarts:[0,1,3,7],
 model:[
 ex('The diagram presents a simplified six-stage process for transforming collected used paper into sheets that can be reused.','该图展示废纸经过六个简化阶段成为可再利用纸张的过程。','引言交代简化流程的性质。'),
 ex('Overall, the procedure starts with paper collected from designated bins and finishes when dried sheets are cut for reuse.','总体上，流程始于从指定箱中收集废纸，终于干燥纸张被裁切再利用。','概述起点与源稿终点。'),
 ex('Between these stages, the material is sorted, converted into pulp, cleaned, shaped, pressed and dried before its final cutting.','其间材料经分类、制浆、去杂质、成形、压制和干燥，最后才裁切。','概括核心材料变化，步骤连贯。'),
 ex('First, waste paper is gathered from the collection bins before it is sorted to exclude material unsuitable for the intended product.','首先，从回收箱收集废纸，然后分类以去掉不适用于目标产品的材料。','起初两步有明确顺序。'),
 ex('The selected paper is then mixed with water, producing pulp rather than a finished dry sheet.','随后将选中的纸张与水混合，得到纸浆而非干燥成品。','第三步：加水制浆。'),
 ex('After unwanted particles are removed, the prepared mixture is spread evenly into a thin layer for the next stage.','去除不需要的颗粒后，将处理好的混合物均匀铺成薄层，进入下一阶段。','第四步：去杂质后铺展。'),
 ex('This layer is subsequently pressed to remove water, and the sheet is dried after the pressing stage.','随后对薄层压制以排出水分，再将压制后的纸张干燥。','第五步：压水、干燥。'),
 ex('Finally, the dry sheet is cut into material ready for reuse, completing the sequence shown in the diagram.','最后将干燥纸张裁切为可再利用的材料，完成图示流程。','第六步：裁切终点。'),
 ex('The image provides the order of the operations but does not specify processing temperatures, duration, equipment or quantities.','图像给出了操作先后，但没有说明温度、时长、设备或产量。','坚持来源边界。'),
 ex('Accordingly, the description reports the material changes without inventing further industrial steps such as packaging the final product.','因此报告只描述材料变化，不会编造如最终产品包装之类的附加工序。','避免越界增补。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/preparation-resources/writing-test-resources','https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing'],
 sourceNote:'已将旧版 dried and packed 语料修订成原始 U05 草稿的 cut for reuse；与六步 SVG、中文及题目答案一致。'
},


{
 id:'en-map-change-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u06',
 title:'地图方位词汇：停车场改花园、咖啡馆扩建及步道新增',subtitle:'基于 Task 1 U06 原始公共广场四方位地图',
 prerequisite:'掌握 north / south / east / west 及基本被动语态；阅读原稿广场改造前后的说明。',
 objective:'将 replaced by、extended、retained、added 和 north/east/west/south 准确对应同一张广场地图，不混入旧的学习场地实验图。',
 sections:[
 sec('01 方位要先确定整座广场作参照',
 '本题原稿以公共广场为统一参照框架。in the north of the site 表示场地内部北部，on the eastern side 表示东侧；north of the library 则是相对于图书馆，原稿未提供这种额外的位置判断。',
 'in the north of the square / on the eastern side / along the southern boundary',[
 ex('The original car park was in the north of the square.','原停车场位于广场北侧。','北侧停车场是明确的旧设施。'),
 ex('The library remained on the eastern side.','图书馆仍位于东侧。','图书馆位置和保留状态均有据。'),
 ex('A new footpath runs along the southern boundary in the plan.','规划图在南侧边界新增步道。','南侧步道是新增项，不是已存在的中央步道。')
 ],'不能把 north of the site 与 north of the library 互换，也不能凭空添加建筑间距离。',
 {title:'与原稿一致的四方向资料（并非官方试卷）',columns:['方位','改造前','拟议改造后'],rows:[
 ['North','Car park','Garden; car park replaced'],
 ['East','Library','Library retained unchanged'],
 ['West','Café','Existing café extended'],
 ['South','No path specified','New footpath along southern boundary']
 ],note:'这四项与 en-ielts-writing-task1-u06 原始文字与课堂 SVG 对齐；不是官方 IELTS 地图。'}),
 sec('02 replace 与 extend 表示不同变化',
 'replace 说明原设施被另一设施取代，本课北侧 car park → garden。extend 表示原建筑扩大，本课西侧 café 向邻近空地扩展，并非搬迁。两种表达需要准确标出新旧主体。',
 'was replaced by a garden / the café was extended into adjacent space',[
 ex('The northern car park was replaced by a garden.','北侧停车场被花园替代。','被替换的是旧停车场，花园是新设施。'),
 ex('The western café was extended into an adjacent vacant area.','西侧咖啡馆向相邻空地扩建。','扩建的对象是咖啡馆，不是停车场。'),
 ex('The café was not replaced by another building.','咖啡馆并未被另一建筑替代。','保留原建筑并扩展面积。')
 ],'不能用 The garden was replaced by a car park 颠倒改造方向；更不能写停车场向西扩建。'),
 sec('03 retain、remain 与 add 区分保留和新增',
 '图书馆依旧位于东侧，因而 retained 和 remained unchanged 均适用。南侧新增一条 footpath，使用 was added；如果写 central footpath was retained，便把新增误写成既有设施的保留。',
 'remained unchanged / was retained / a footpath was added',[
 ex('The eastern library remained unchanged.','东侧图书馆保持不变。','图中仅保留这座建筑的现有布局。'),
 ex('The proposed design retains the library.','拟议规划保留图书馆。','retains 不表示对图书馆进行改建。'),
 ex('A new footpath was added to the southern boundary.','沿南侧边界新建了一条步道。','新增位置是南侧，绝非中央步道继续存在。')
 ],'不能把图书馆保留写成“图书馆改作学习室”，也不能补写尚未说明的修建年月。'),
 sec('04 用空间顺序形成连贯概述与细节',
 '总览先点出北侧新增绿地和南侧步行通道，并说明东侧图书馆保留；细节随后按北东、西南的方位叙述。广场平面没有面积数据、成本或改造动机，不能额外推断。',
 'overview → northern replacement and eastern retention → western extension and southern addition',[
 ex('Overall, the proposed changes introduce a garden and a footpath.','总体上，规划新增花园与步道。','概述主要新增设施。'),
 ex('The library remains in the east, while the café expands in the west.','东侧图书馆保持不变，西侧咖啡馆扩大。','将保留与扩建放在同一句对照。'),
 ex('The diagrams show relative positions but no exact building sizes.','示意图给出相对位置，但没有建筑精确尺寸。','说明证据适用范围。')
 ],'没有施工实际进度数据，不能将规划布局当成已完成的真实工程，也不可编造数值尺寸。')
 ],
 questions:[
 {question:'“北侧停车场被花园替代”如何写？',answer:'The northern car park was replaced by a garden.',why:'原设施为 car park，新设施是 garden，顺序不可倒转。'},
 {question:'西侧扩建的是什么设施？',answer:'The existing western café was extended into adjacent space.',why:'原稿说 café 扩建，而不是停车场扩大或被拆除。'},
 {question:'哪里保持不变？',answer:'The library on the eastern side remained unchanged.',why:'图书馆位于东侧且未改，北侧停车场属于替换项目。'},
 {question:'南侧原有中央步道是否只是保留？',answer:'No. A new footpath was added along the southern boundary.',why:'原稿明确说新增 southern footpath，不能借用另一套中央步道未变的地图数据。'}
 ],
 output:'参照与 U06 原稿完全一致的虚构广场地图，写 150–180 词英文 Task 1 报告并附中文，描述替换、扩建、新增与保留四类变化。',
 modelParagraphStarts:[0,1,3,6,8],
 model:[
 ex('The diagrams compare the existing layout of a fictional public square with a proposed arrangement after redevelopment.','两张图比较一处虚构公共广场改造前的布局与拟议改造后的布局。','引言明确虚构地图与规划状态。'),
 ex('Overall, the new layout introduces a garden in the north and a pedestrian footpath along the south.','总体而言，新规划在北部加入花园，并沿南侧新增行人步道。','同时概括两项新增变化。'),
 ex('The library stays in the east, and the existing café on the western side is shown as enlarged.','图书馆保留在东侧，而原有西侧咖啡馆的占地范围扩大。','概述保留与扩建。'),
 ex('In the original plan, a car park occupied the northern portion of the public square.','在原布局中，停车场位于公共广场北部区域。','明确旧设施。'),
 ex('Under the proposed design, the car park is removed and its former site becomes a garden.','按照拟议设计，停车场被移除，其原位置改为花园。','正确表达替换方向。'),
 ex('By contrast, the library on the eastern side is retained without any specified alteration to its position.','相比之下，东侧图书馆被保留，题目没有说明其位置发生变化。','不要编造图书馆改造。'),
 ex('The café in the west is extended into an adjacent vacant area rather than moved elsewhere.','西侧咖啡馆向相邻空地扩展，并非迁往其他位置。','扩建而非迁移。'),
 ex('This change affects the existing café footprint, but the drawings give no exact dimensions for the extension.','这一变化扩大原有咖啡馆占地，但示意图没有提供扩建的精确尺寸。','保持未知范围。'),
 ex('A new footpath is also shown along the southern boundary, adding a pedestrian route to the square.','沿广场南侧边界另新增步道，为场地增加一条行人通行路线。','新增设施定位南侧。'),
 ex('The diagrams provide no construction dates, costs or reasons for these proposed changes, so the report remains descriptive.','图示没有说明施工日期、费用或规划原因，因此报告应只做客观描述。','不编造时间和因果。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/preparation-resources/writing-test-resources','https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing'],
 sourceNote:'修复旧版北侧图书馆／东侧花园等与原稿不一致的独立地图语料；现与 U06 虚构广场原始草稿和配套 SVG 逐项一致。'
}
];