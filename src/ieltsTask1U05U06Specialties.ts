import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const T=(title:string,rows:string[][],note:string):LearningTable=>({title,columns:['英文语块／原图项目','中文对应','适用边界'],rows,note});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,...(table?{table}:{})});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK1_U05_U06_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task1-u05-recycling-process-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u05',
 title:'流程图词汇：收集、分类、制浆与干燥裁切',subtitle:'把 recycle / sort / pulp / remove / press / dry / cut 放进六步真实信息链',
 prerequisite:'已掌握一般现在时被动句，知道纸张回收流程是示意，不是工业技术手册。',
 objective:'按原始六阶段图正确描述动作与对象，区分 pulp、sheet、particles 的指称，构成自然、连贯且不虚构设备参数的英文说明。',
 sections:[
 S('01 collect 与 sort：起点和筛选','收集和分类是不同操作。used paper is collected from designated bins 是来源；is sorted to remove unsuitable materials 则说明分类目的。写作中先说明材料进入流程，再解释不适合本次制纸的材料被筛除。','be collected from / be sorted to remove',[
 E('Used paper is collected from designated bins.','废纸从指定回收箱中被收集。','起点由原稿明确提供，不需要假设人工或自动机械。'),
 E('The collected paper is sorted before processing.','收集后的纸张在加工前进行分类。','先收集再分类；before 定位顺序。'),
 E('Materials unsuitable for the intended product are removed.','不适用于目标成品的材料被去除。','unsuitable 指用途不符，未指定具体材料名称。')
 ],'不能把 sort 理解为已经形成纸浆，也不能凭空添加清洗剂、输送带型号或废纸来源的实际统计量。',
 T('图示六阶段原始词义',[['Collect used paper','收集废纸','来自指定回收箱'],['Sort material','对纸张分类','移除不合适材料'],['Mix with water','加水制成纸浆','没有温度数值'],['Remove particles and spread','去杂质并铺展','铺成薄层'],['Press out water and dry','压出水分并干燥','不指定耗时'],['Cut the dry sheet','裁切以便再利用','不是凭空增加包装工序']],'表中为课程原创简化工艺；不是一套完整的工业规格。')),
 S('02 pulp 与 particles：不同名词指向不同材料','pulp 是纸和水混合形成的纸浆，不是已经干燥的纸张；unwanted particles 是需要去掉的杂质。连接先制浆、再去杂质并铺展，保证后文 sheet 能准确回指已成形的薄纸层。','form pulp / remove unwanted particles / spread into a thin layer',[
 E('The selected paper is mixed with water to form pulp.','选出的纸张与水混合形成纸浆。','form 表示结果，pulp 不等于纸张成品。'),
 E('Unwanted particles are removed from the mixture.','不需要的杂质从混合物中被去除。','particles 是被去除的对象。'),
 E('The mixture is then spread into a thin layer.','混合物随后被铺成薄层。','then 对应“去杂质后铺展”。')
 ],'不能把去掉颗粒说成已裁切成品；也不能说 pulp dries before it is spread，因为顺序与原图不符。'),
 S('03 press、dry 与 cut：从水分到成品','press out water 是压出水分，dry 是使纸张干燥，cut for reuse 是裁切后再利用。三项词汇各有不同的动词宾语与结果；图示最后一步是 cut，不应把 packed 误写成原图已给事实。','press water out / be dried / be cut for reuse',[
 E('Excess water is pressed out of the layer.','多余水分从薄层中被压出。','水分是压出的对象。'),
 E('The sheet is dried after pressing.','薄纸层经过压制后被干燥。','after 引出顺序。'),
 E('The dried material is cut for reuse.','干燥的材料被裁切，以便再利用。','裁切对应原始文本明确的终点。')
 ],'原始教学场景没有包装、消毒、烘干温度、耗时或回收利用率，不能写成由图证实的流程步骤。'),
 S('04 用阶段语块写出完整 overview','overview 必须给出起点、终点和核心物质转化：从废纸收集出发，经过分类、加水制浆、去除杂质、成形压干，最终裁切。用 processed / converted / finally 做自然衔接，不必每句堆砌 furthermore。','The process begins with ... and ends when ...',[
 E('Overall, waste paper passes through a series of preparation and forming stages.','总体上，废纸经历准备和成形等一系列阶段。','概述中概括中段功能。'),
 E('It begins with the collection of used paper.','流程始于废纸收集。','明确对应流程起点。'),
 E('The final dried sheets are cut for reuse.','最后干燥的纸张被裁切后再利用。','终点与原稿吻合。')
 ],'示意流程没有说明它无限循环运行，不能从“for reuse”推出回收率或下一轮加工流程已经发生。')
 ],
 questions:[
 {question:'纸浆的英文是什么？它在哪一步形成？',answer:'Pulp. The selected paper is mixed with water to form pulp. ',why:'原稿明确在分类之后加水混合成浆；pulp 不是去杂质前的废纸堆。'},
 {question:'Which comes first: removing particles or pressing out water?',answer:'Removing unwanted particles comes first; pressing out water follows spreading.',why:'原文先去杂质、铺成薄层，再压出水分，严格按图示次序。'},
 {question:'What is the final operation in the source manuscript?',answer:'The dried material is cut for reuse.',why:'原稿最后明确 cut for reuse，不能替换成包装、运输或出厂检测。'},
 {question:'What information should not be invented in a diagram report?',answer:'Processing temperatures, durations, machine models or production quantities.',why:'六阶段示意图没有给出这些技术参数，添加具体数值就超出证据。'}
 ],
 output:'根据六步图先写两句 overview，再写 150–180 词报告，至少使用 collect、sort、pulp、remove、press、dry、cut，逐段配中文；不得补造设备参数。',
 model:[
 E('The diagram illustrates a simplified paper-recycling process.','该图示描述简化的纸张回收流程。','定义性质。'),
 E('Overall, used paper is prepared, converted into pulp and formed into reusable sheets.','总体上，废纸经处理转成纸浆，再形成可再利用的纸张。','概述起止与转化。'),
 E('First, used paper is collected from designated bins.','首先，从指定回收箱收集废纸。','明确对应流程起点。'),
 E('The material is then sorted.','随后对材料分类。','第二步。'),
 E('Selected paper is mixed with water to form pulp.','将选出的纸张与水混合形成纸浆。','第三步。'),
 E('Unwanted particles are removed before the mixture is spread into a thin layer.','先去除杂质，再将混合物铺成薄层。','第四步。'),
 E('Water is pressed out, and the sheet is dried.','压出水分并使纸张干燥。','第五步。'),
 E('Finally, the dried material is cut for reuse.','最后，干燥的纸张被裁切以供再利用。','第六步；没有包装步骤。')
 ],referenceUrls:[REF],sourceNote:'动作来自 en-ielts-writing-task1-u05 原创草稿和同步修订的六步示意图；保留既有 en-process-report-grammar 语法章。'
},
{
 id:'en-task1-u06-map-reference-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task1-u06',
 title:'前后地图句法：替换方向、空间参照与规划时态',subtitle:'北侧停车场改花园；东侧图书馆保留；西侧咖啡馆扩大；南侧新增步道',
 prerequisite:'熟悉 north/east/west/south 方位与被动语态，能区分 before 和 after 示意图。',
 objective:'用 was replaced by、was extended、remained unchanged、was added accurately 匹配四方位，区分规划示意与已完工事实。',
 sections:[
 S('01 was replaced by：宾语方向不能倒转','结构 A was replaced by B 意为旧的 A 被新的 B 取代。原文旧北侧 car park 被新 garden 取代；改成 The garden was replaced by a car park 会颠倒改造方向。介绍规划图时可以描述“拟议变更”，不能声称真实工程已完成。','old feature + was replaced by + new feature',[
 E('The northern car park was replaced by a garden in the proposed layout.','在规划后示意图中，北侧停车场被花园替代。','旧车场→新花园。'),
 E('A garden appears in place of the former car park.','花园出现在原停车场的位置。','in place of 对应替换关系。'),
 E('The map does not show a second car park in the north.','地图没有显示北侧还有第二座停车场。','切勿自行保留被替换的旧设施。')
 ],'不要颠倒 was replaced by 的旧新方向，或把文字示意写作已经实施的真实施工项目。',
 T('原稿四方位变化',[['North: car park → garden','北侧停车场→花园','替换'],['East: library → library','东侧图书馆保持','未变化'],['West: café → extended café','西侧咖啡馆扩建','面积扩大但数值未知'],['South: no footpath → footpath','南侧新增步道','不是旧步道保留']],'这是 en-ielts-writing-task1-u06 原始广场布局，不是其他独立地图。')),
 S('02 remained unchanged 与 was extended 的对照','library to the east remained unchanged 指图书馆位置和图示状态保持；café to the west was extended 指在相邻空地上扩展。不能把 unchanged 解读为图书馆全部功能已被实地核实，也不能将 extended 与 moved 混淆。','remained unchanged / was extended into an adjacent area',[
 E('The library on the eastern side remained unchanged.','东侧的图书馆保持不变。','原文未给任何扩建信息。'),
 E('The western café was extended into adjacent vacant space.','西侧咖啡馆向相邻空地扩建。','extended 指扩建，不是搬迁。'),
 E('No new use for the library is specified.','题目没有说明图书馆的新用途。','对功能改变不作推断。')
 ],'“保留图书馆”不意味着整座广场没有其他改变；“扩建咖啡馆”也不等于搬到另一个方向。'),
 S('03 in the north 与 north of X 不是同义结构','in the north of the site 是区域内部北侧；north of the library 则以图书馆为参照点。原始布局只给出四个区域方位，除非图明确标注相对位置关系，不应任意写 north of the library 之类额外关系。','in the north of the site / on the eastern side / along the southern boundary',[
 E('A garden occupies the north of the square in the proposed map.','规划地图中花园位于广场北侧。','参照整个广场。'),
 E('The library remains on the eastern side.','图书馆仍位于东侧。','东部区域而非相对于另一建筑。'),
 E('A footpath was added along the southern boundary.','沿广场南侧边界新增了一条步道。','沿边界而非穿过中央。')
 ],'地图缺乏可测距离和方向比例，不能使用“距离图书馆 10 米”或自行断言花园位于图书馆正北方。'),
 S('04 规划时态与 overview 的证据边界','题面为 before/after redevelopment 的虚构示意。若 before/after 是设想改造，可用 proposed layout / is planned / would be replaced，避免断言现实已建成。overview 可以概括“新增绿地与步行空间，同时保留图书馆”，细节再呈现咖啡馆扩建。','The proposed plan would replace ... while retaining ...',[
 E('Overall, the proposed changes add green space and pedestrian access.','总体上，拟议变化增加绿地和行人通行空间。','依据北花园与南步道。'),
 E('The existing library is retained.','现有图书馆被保留。','东侧保留。'),
 E('The café is shown as larger in the proposed layout.','在规划示意图中咖啡馆被显示为面积扩大。','示意变化而非实测尺寸。')
 ],'不能添加“为了旅游收入”“工程在某年完成”等未由前后图给出的原因和时间，也不应混用其他地图的方位。')
 ],
 questions:[
 {question:'Replace the car park by a garden: write a correct passive sentence.',answer:'The northern car park was replaced by a garden in the proposed layout.',why:'A was replaced by B：A 为旧停车场，B 为新花园，不能倒写。'},
 {question:'Which feature remained unchanged and where?',answer:'The library on the eastern side remained unchanged.',why:'原稿东侧图书馆保留，不能写成咖啡馆保持不变。'},
 {question:'Is the café moved or extended?',answer:'It is extended into adjacent vacant space on the western side.',why:'extended 是向相邻空地扩建，没证据表明搬迁。'},
 {question:'Can we claim the site was redeveloped in a specified year?',answer:'No. It is a fictional before-and-after layout without a verified construction date.',why:'地图比较设施变化，未列工程完成年份或实际施工记录。'}
 ],
 output:'根据修订后的原稿一致地图写一篇不少于 150 词的地图报告，明确 north/east/west/south 四项关系，至少出现 replaced、retained、extended、added，配自然中文并保留规划语气。',
 model:[
 E('The two plans compare a fictional public square before and after proposed redevelopment.','两张规划图比较一处虚构广场改造前后的布局。','本句交代图示范围。'),
 E('Overall, the proposal adds a garden and a footpath.','总体上，规划新增花园与步道。','主要改变。'),
 E('The library on the eastern side remains unchanged.','东侧图书馆保持不变。','保留项目。'),
 E('In the north, the former car park is replaced by a garden.','北侧原有停车场被花园替代。','旧新方向。'),
 E('To the west, the café is extended into an adjacent vacant area.','西侧咖啡馆向邻近空地扩建。','扩建非搬迁。'),
 E('A new footpath is added along the southern boundary.','沿南侧边界新增一条步道。','新增而非保留。'),
 E('The diagrams do not give building dimensions.','示意图没有提供建筑尺寸。','未知信息。'),
 E('Nor do they identify a completion date or a motive for the changes.','也未提供完工日期或改造动机。','证据范围。')
 ],referenceUrls:[REF],sourceNote:'以 en-ielts-writing-task1-u06 原稿中的广场前后布局为唯一地图数据；原有 en-map-change-lexicon 独立词汇教材保留。'
}
];