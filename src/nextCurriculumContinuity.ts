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
 title:'IELTS Task 1 流程写作：阶段、被动语态和顺序',subtitle:'依据实际给定的工序解释变化，不推测原因和数字',
 prerequisite:'了解一般现在时、过去时、被动语态与 Task 1 overview 的功能。',
 objective:'识别输入、阶段、最终产出，使用被动语态和清楚的时序描述流程，并区分原创可核对图示与官方考试图示。',
 sections:[
 sec('01 先辨认流程的起点、终点和主要阶段',
 '流程图写作必须先依据图中真实信息确定开始、转化过程及最后产出。循环流程与线性流程写法不同；流程没有数字或温度标注时，不可擅自增加具体数据。',
 'input → stages → output / cycle',[
 ex('The process begins with the collection of used paper.','该流程从回收废纸开始。','只交代起点。'),
 ex('The material is then sorted and cleaned.','随后材料得到分类和清洁。','两个连续环节。'),
 ex('Finally, new sheets are produced.','最后制成新的纸张。','明确产出。')
 ],'不能仅凭常识把“在150℃加热”或“经过五小时”加入没有这些标注的图示。',
 {title:'本课原创流程图的六阶段数据',columns:['阶段','图示可提供的信息'],rows:[['1','used paper is collected'],['2','paper is sorted'],['3','paper is mixed with water'],['4','pulp is cleaned'],['5','pulp is pressed into sheets'],['6','sheets are dried and packed']],note:'本表与本课原创 SVG 流程图一致，二者均非 IELTS 官方试卷。正式考试只依据考题给出的图示作答。'}),
 sec('02 描述动作时，被动语态突出材料的处理过程',
 '工业处理流程中，如果图示重点是材料如何变化，而不是谁执行操作，常用 be + 过去分词。一般性的流程可用一般现在时；对于特定历史改造图则应按题目时态选择。',
 'is collected / is sorted / is pressed / is dried',[
 ex('The used paper is collected from several locations.','废纸从几个地点被收集。','一般现在被动，突显材料。'),
 ex('It is mixed with water to form pulp.','它与水混合形成纸浆。','is mixed 是被动处理，to form 表示结果目的。'),
 ex('The sheets are dried before they are packed.','纸张先干燥再包装。','before 保持先后顺序。')
 ],'is drying 和 is dried 含义不同：前者是进行体，后者是被动结构。不要把所有 -ing 都当过去分词。'),
 sec('03 顺序词只用于真实的阶段关系',
 'initially、next、subsequently、once、finally 等帮助读者理解先后，但不等于每句都必须添加一个连接副词。若两个操作并行或存在分支，需要根据图示清楚解释，而不能捏造线性关系。',
 'initially → next → once… → finally',[
 ex('Initially, the material is sorted according to type.','最初材料按类别分类。','initially 开始流程叙述。'),
 ex('Once the pulp has been cleaned, it is pressed into sheets.','纸浆清洁后，被压制成纸张。','once 表示上一阶段完成后再进入下一阶段。'),
 ex('The finished sheets are then dried and packed.','成型纸张随后干燥并包装。','then 连接最后两步。')
 ],'firstly、secondly、thirdly 不必重复堆积；缺少工序信息时，连接词再多也无法弥补 Task Achievement。'),
 sec('04 overview 只概括可见总体，不复写每步',
 'Task 1 overview 应突出流程总类型、主要变换与起终点，而不是提前把全部细节复述一次。对有清楚阶段的流程，一般可在两个细节段落介绍早期和后期。当前练习使用六阶段数据绘制的原创 SVG 流程图，属于真正的看图语言训练，但不是官方图示试题。',
 'introduction → overview → early stages → later stages',[
 ex('Overall, the six-stage process transforms used paper into packaged sheets.','总体上，这一六阶段流程将废纸转化为包装好的纸张。','总览对照练习明确的六个阶段。'),
 ex('The initial stages involve collecting and preparing the paper.','初期阶段包括收集和准备纸张。','归纳第一部分。'),
 ex('The final stages concern forming, drying and packing the sheets.','最后几个阶段涉及成型、干燥和包装。','归纳后一部分。')
 ],'不能写这个流程“减少污染、节省成本”，除非提供的材料支持这种结论。')
 ],
 questions:[
 {question:'将 Workers sort the paper. 改为被动句。',answer:'The paper is sorted.',why:'一般现在时被动 is + 过去分词 sorted。'},
 {question:'本课流程第 3 步是什么？',answer:'The paper is mixed with water.',why:'根据本课原创图中清楚标注的第三阶段回答。'},
 {question:'图示没有标温度时能否写 heated to 150°C？',answer:'不能。',why:'Task 1 的说明必须以给定视觉信息为准，不能增加未经标注的数值。'},
 {question:'修正：After cleaned the pulp, it pressed into sheets.',answer:'After the pulp is cleaned, it is pressed into sheets.',why:'after 后补完整从句，pressed 的被动结构需要 is。'}
 ],
 output:'教材练习：观察本课六步原创流程图，写一篇 150–180 词的英文说明，包含 overview、完整先后次序和正确的被动语态。该图非 IELTS 官方试卷。',
 modelParagraphStarts:[0,1,3,7],
 model:[
 ex('The sequence describes how used paper is transformed into sheets ready for packaging through six main stages.','这组步骤描述废纸如何经过六个主要阶段转化为可包装的纸张。','引言概括对象。'),
 ex('Overall, the procedure starts with collecting discarded paper and ends with drying and packing the newly formed sheets.','总体上，流程从收集废纸开始，以新制纸张的干燥和包装结束。','overview 交代起点与终点。'),
 ex('The earlier steps concentrate on selecting and preparing the material, whereas the later ones turn the prepared pulp into finished paper.','前期步骤侧重筛选和准备材料，后期则将准备好的纸浆制成成品纸。','对照两阶段功能。'),
 ex('First, used paper is collected and transferred to the sorting stage.','首先收集废纸并送至分类阶段。','按第一步描述操作。'),
 ex('At this point, the paper is sorted before it moves on to the next part of the sequence.','此时废纸先分类，然后进入下一步骤。','复述第二阶段但不添加未给细节。'),
 ex('The sorted paper is subsequently mixed with water to create pulp.','分类后的废纸随后与水混合形成纸浆。','第三阶段。'),
 ex('Once this mixture has been prepared, the pulp is cleaned.','混合物准备好后，纸浆得到清洁。','第四阶段。'),
 ex('The cleaned material is then pressed into sheets, which are the main product of the process.','清洁后的材料随后被压成纸张，即这一流程的主要产品。','第五阶段的产出。'),
 ex('Finally, these sheets are dried and packed, completing the series of operations described here.','最后纸张干燥并包装，完成所描述的一系列操作。','第六阶段与结尾。'),
 ex('As a whole, the material passes from the initial collection and sorting phases through preparation and pressing before the final drying and packing stage.','整体而言，材料从收集和分类阶段经过准备与压制，最终进入干燥与包装阶段。','对流程进行综合归纳而不添加图外设备或数据。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing','https://ielts.org/take-a-test/preparation-resources/writing-test-resources'],
 sourceNote:'对应 en-ielts-writing-task1-u05 的过程与被动语态。IELTS 官方规定 Academic Task 1 150 词以上，练习配有由原创阶段数据绘制的 SVG 图示，并非官方试卷图。'
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