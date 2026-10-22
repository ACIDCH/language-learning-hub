import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';

/** Original, source-bound teaching chapters for three previously unlinked IELTS Listening units.
 * Scenarios are fictional and are not official IELTS audio or examinations. */
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const t=(title:string,rows:string[][],note:string):LearningTable=>({
 title,columns:['原文表达','准确中文','判定边界'],rows,note
});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({
 title,concept,pattern,examples,caution,...(table?{table}:{})
});
const ref='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';

export const IELTS_LISTENING_U04_U06_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-listening-u04-route-reference-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u04',
 title:'听地图先定参照：方向、位置与步骤被动式',subtitle:'从南门进入到温室，再区分访客交付与实验室存储',
 prerequisite:'已掌握 left/right、on、in、past 的基本含义，并能识别简单现在时与被动结构。',
 objective:'准确跟踪入口、方向、参照物和步序，区分相对位置与沿路径先后；识别 should be left 与 is moved 的动作承担者。',
 sections:[
 s('01 先确定方向，再判断左右','地图说明的 left 和 right 通常取决于听者当下的行进方向。本课先从 southern gate 进入，并沿 path north 行进；如果把图纸朝向或进入方向反过来，随后所有左右判断都会失效。','enter through / on your left / follow the path north',[
 e('Enter the garden through the southern gate.','从花园南门进入。','through 指穿过入口，不是沿大门外行走。'),
 e('The office is immediately on your left.','办公室就在你的左手边。','left 的参照者是从南门进来的访客。'),
 e('Follow the path north towards the greenhouse.','沿小路向北走，朝温室方向前进。','north 是方向，towards 是朝向目的地。')
 ],'不先确定入口与朝向，就不能凭地图页面左侧直接推断 on your left。',
 t('路径定位四个判断',[['through the southern gate','经南门进入','不是北门'],['on your left','行进者左侧','不是地图固定左侧'],['follow the path north','沿路朝北','不是穿过池塘'],['towards the greenhouse','朝温室方向','不表示已到种子库']],'地理方位和听者相对方位应分栏记录。')),
 s('02 opposite、past 与 beyond 不可互换','opposite 指两个物体隔着一定空间相对；past 描述经过某处并继续前进；beyond 表示在某参照物更远的位置。这三者分别回答相对关系、是否经过和终点次序。','opposite the pond / walk past the office / just beyond the greenhouse',[
 e('The office is opposite a small pond.','办公室在小池塘对面。','说明相对关系，不代表需要穿过池塘。'),
 e('Walk past the office without entering it.','经过办公室，不要走进去。','past 是经过，不是 into。'),
 e('The seed store stands just beyond the greenhouse.','种子库就在温室再往前一点的位置。','beyond 给出沿既定路线更远的参照位置。')
 ],'past the office 不等于 enter the office；beyond the greenhouse 不是 opposite the greenhouse。'),
 s('03 把路线指令和样品处理流程分开','口头说明可能一边指路，一边描述规章。祈使句 enter、walk、follow 是给访客的行进指令；should leave 与 is moved 描述标本的处理方式。需要用流程图独立记录，不把样品最终储存地误认作游客的交付地点。','visitors should leave ... / staff label ... / is moved ...',[
 e('Visitors should leave specimens at reception.','访客应在接待处交付标本。','责任人是访客，地点是接待台。'),
 e('Staff label each specimen before it is moved.','工作人员先给每件标本贴标签，再将其转移。','before 明确先后，is moved 是被动式。'),
 e('The controlled room is used for storage.','受控房间用于储存。','物品最终存放处不是访客交接处。')
 ],'不要从 specimens are stored in a controlled room 推出 visitors should take them there；两句主体与步骤都不同。'),
 s('04 按证据复原路线而不是猜测地图细节','完成图题时先标记已听到的 south、left、opposite、north、beyond，再逐个定位。原文没有说池塘和温室之间的距离，也没有给出访客可以进入种子库的权限；这些空白不能凭图形比例或常识补足。','southern gate → office → greenhouse → seed store; reception → label → controlled room',[
 e('The office comes before the greenhouse on the described route.','按所述路线，经过办公室后才到温室。','由 walk past ... towards 还原先后。'),
 e('The seed store is on the same side of the path as the greenhouse.','种子库与温室在小路同一侧。','根据原稿明确的 same side。'),
 e('The passage does not specify the distance between buildings.','说明没有交代建筑之间的距离。','不能虚构米数或步行时间。')
 ],'没有提到的距离、楼层、入口和权限不能变成肯定答案。')
 ],
 questions:[
 {question:'从南门进入时，办公室在什么位置？',answer:'Immediately on your left, opposite a small pond.',why:'原文明确给出左侧与池塘对面的双重参照。'},
 {question:'Walk past the office 是否要求进入办公室？',answer:'No. Continue past it towards the greenhouse.',why:'past 表示经过并继续走，into 才表示进入。'},
 {question:'访客应将收集标本放在哪里？',answer:'At the reception desk, not directly in storage.',why:'交接处和最终储存地属于不同步骤。'},
 {question:'工作人员贴标签和把标本移到受控室，哪个先发生？',answer:'Staff label each specimen before it is moved.',why:'before 给出明确的先后；被动式不改变该顺序。'}
 ],
 output:'依据原课程重述研究花园的行进路线，再用五句英文解释标本交付、贴标签、储存流程；每句附对应中文。不补写原稿没有的距离。',
 model:[
 e('We enter the research garden through the southern gate.','我们从研究花园的南门进入。','确定视角。'),
 e('The office is on the left and opposite a small pond.','办公室在左边，位于小池塘对面。','双重定位。'),
 e('We walk past the office and follow the path north.','我们经过办公室，沿路向北走。','路径不含进入办公室。'),
 e('The greenhouse comes before the seed store.','沿此路线先到温室，再到种子库。','保持沿路线顺序。'),
 e('Visitors leave specimens at the reception desk.','访客在接待台交付标本。','访客责任。'),
 e('Staff label them before moving them to the controlled room.','工作人员贴好标签后才将它们移到受控室。','先后与行为主体。')
 ],
 referenceUrls:[ref],sourceNote:'紧扣 en-ielts-listening-u04 原稿南门、池塘、温室与样品处理的真实叙述；内容为项目原创扩充。'
},
{
 id:'en-listening-u04-site-process-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u04',
 title:'场地和处理流程词汇：pathway、reception、specimen',subtitle:'地点名词、方向搭配、实验室处理动词和不当同义替换',
 prerequisite:'先完成本课路径定位语法；掌握基础介词与名词单复数。',
 objective:'区别 office/greenhouse/seed store 与 reception desk/controlled room，正确理解 label、collect、store 和 move 的动作关系。',
 sections:[
 s('01 场地名词按用途分组','research garden 是研究花园，greenhouse 是温室，seed store 是种子库。这些词不是笼统的 building；不同用途决定地图空格的答案。先判断题目要的是位置还是设施名称，再从听力中定位。','southern gate / research garden / greenhouse / seed store',[
 e('The greenhouse is north of the entrance.','温室位于入口以北。','仅沿本课指定方位理解。'),
 e('The seed store stands beyond the greenhouse.','种子库在温室更远处。','store 在这里是名词“储藏处”。'),
 e('The office is opposite a small pond.','办公室在一个小池塘对面。','office 不是 reception desk 的必然同义词。')
 ],'greenhouse 与 seed store 不是同一建筑；不能因二者都与植物有关而合并。',
 t('场地词义与任务',[['southern gate','南门','入口位置'],['greenhouse','温室','路线目标之一'],['seed store','种子库','位于温室更远处'],['reception desk','接待台','访客交付样品处']],'功能归类能防止把同一个地名填到地图和流程两个不同题型中。')),
 s('02 路径相关搭配需要保留介词','follow a pathway 表沿路走；walk past a place 表经过；on the same side of the path 表在路的同一侧。位置答案不仅看名词，还要保存介词关系，不得用 near 随意代替。','walk past / follow a pathway / on the same side of',[
 e('Follow the pathway towards the greenhouse.','沿小路朝温室走。','follow 的宾语是 pathway。'),
 e('The buildings are on the same side of the path.','这些建筑位于小路同一侧。','same side 不等于面对面。'),
 e('The seed store is beyond the greenhouse.','种子库在温室再往前的位置。','beyond 不等于 beside。')
 ],'听写时遗漏 same 或 beyond 会改变位置关系；near 不足以替代明确的路线顺序。'),
 s('03 specimen 是标本，不是普通游客纪念品','specimen 在研究语境指采集的标本；collected specimens 指已收集的样品。交付动作 leave at reception 和储存动作 move to controlled room 是独立步骤，不能仅看 storage 就推断交付流程。','collect a specimen / leave a specimen / label each specimen',[
 e('Visitors leave collected specimens at reception.','访客在接待处留下采集的标本。','collected 修饰 specimens。'),
 e('A staff member labels each specimen.','一名工作人员给每件标本贴标签。','label 在此作动词。'),
 e('Specimens are moved into the controlled room.','标本被移入受控室。','被动式突出物品流程。')
 ],'label 可以作名词“标签”或动词“贴标签”，应结合动词位置判断。'),
 s('04 对流程名词做词义核对','controlled room 指有管理条件的房间，storage 指存放行为或空间，不一定指访客可直接进入的地方。流程题目应保留人、物、动作、地点四要素。','reception desk → label → move → storage',[
 e('The reception desk is the collection point.','接待台是交接点。','根据原稿可确定访客先到这里。'),
 e('Labelling precedes storage.','贴标签先于储存。','用 precedes 概括 before。'),
 e('The public route remains separate from specimen handling.','公众参观路线与标本处理流程分开。','两条流程的用途不同。')
 ],'不要把 an office、a reception desk 和 a controlled room 当作同一种功能空间。')
 ],
 questions:[
 {question:'greenhouse 和 seed store 哪个位置更远？',answer:'The seed store is just beyond the greenhouse.',why:'原文 beyond 确定沿路线的相对先后。'},
 {question:'label each specimen 中 label 是什么词性和意思？',answer:'A verb meaning to attach an identifying label to every specimen.',why:'each specimen 是宾语，label 在句中是动词。'},
 {question:'Should storage be written as the visitors’ handover point?',answer:'No. The handover point is the reception desk.',why:'storage 是后续工作，访客必须先在接待台交付。'},
 {question:'same side 能否直接改写为 opposite side？',answer:'No. That reverses the stated spatial relationship.',why:'same 与 opposite 是直接对立的空间关系。'}
 ],
 output:'列出研究花园四个地点和标本处理四个动作，写一个完整英文段落，并逐句附中文。',
 model:[
 e('The research garden has a southern gate.','研究花园设有南门。','场地。'),
 e('Visitors follow the pathway to the greenhouse.','访客沿小路前往温室。','路线。'),
 e('The seed store is beyond the greenhouse.','种子库位于温室再往前的位置。','方位。'),
 e('Visitors hand over specimens at reception.','访客在接待处交付标本。','交接。'),
 e('Staff attach a label to each specimen.','工作人员给每件标本贴标签。','动作。'),
 e('The specimens are then moved to a controlled room.','随后，标本被转移到受控室。','最后一步。')
 ],
 referenceUrls:[ref],sourceNote:'使用本课已登记的研究花园原稿和实验室样品处理词义，不将示例当作真实实验记录。'
},
{
 id:'en-listening-u05-correction-scope-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u05',
 title:'听清口头修正：旧值、最终值和题目类别',subtitle:'房间 16→60；日期维持 5 月 14 日，不被 16 干扰',
 prerequisite:'已能辨识英文基数词、序数词及日期；熟悉 but、actually、instead。',
 objective:'在多数字对话中区分修正对象和保持不变的信息，准确定位最终房号、日期、押金和仍待确定的余款。',
 sections:[
 s('01 Actually 引出修正，但不自动否定整句','说话者可能仅改变房号而保持日期。originally requested 引出旧值，actually we now need 给出新值；the date remains 明确确认不变。跟读时要为每个数字标记所属字段。','originally ... / actually ... / remains unchanged',[
 e('I originally requested room sixteen.','我最初申请的是十六号房。','originally 明确旧方案。'),
 e('Actually, we now need room sixty.','实际上，我们现在需要六十号房。','actually 改变的是房号。'),
 e('The date remains the fourteenth of May.','日期仍然是五月十四日。','remains 指日期不变。')
 ],'actually 不意味着此前谈过的日期、押金和所有项目都要跟着改变。',
 t('同一段话的四个信息格',[['room sixteen','原定房号 16','已被改为 60'],['room sixty','最终房号 60','不是日期'],['the fourteenth of May','五月十四日','日期保持不变'],['thirty pounds','三十英镑订金','不是房号或总费用']],'每个数字要附带字段、说话者修正状态与时间。')),
 s('02 数词相似，语义类别不能混','sixteen /ˌsɪkˈstiːn/ 与 sixty /ˈsɪksti/ 容易在连读中混淆，但题目的 room number 与 date 不能共用同一个答案。听到数字后先核对 surrounding noun。','room sixty / 14 May / thirty pounds',[
 e('Room sixty is available that afternoon.','六十号房那天下午有空。','room 标识房号。'),
 e('The booking is for 14 May, not 16 May.','预约日期是五月十四日，不是十六日。','日期需要核对否定与肯定。'),
 e('A deposit of thirty pounds is due by Friday.','三十英镑的订金须在周五前支付。','pounds 指金额。')
 ],'不能把“最后听到的数字”当万能答案；金额、房号和日期属于不同栏目。'),
 s('03 预订确认和最终费用并不相同','available 表示可预订的条件已满足；confirmed room availability 不等于全部费用已经算完。remaining fee will be calculated after... 表示余款数额暂未确定。','is available / must pay a deposit / will be calculated after',[
 e('The larger room is available that afternoon.','较大的房间那天下午可以使用。','房间有空，不表示免费。'),
 e('The deposit is thirty pounds.','订金是三十英镑。','订金不是总费用。'),
 e('The remaining fee will be calculated after the equipment list is finalised.','设备清单确定后才会计算余款。','余款是尚待计算的信息。')
 ],'不得由 30 pounds 推断 total fee is thirty pounds；也不能臆测余款。'),
 s('04 准确写出更新指令','please update ... without changing ... 是一种选择性修改指令。记录时区分 changed、unchanged、unknown 三种状态，并通过对方的复述确认，避免下一个人再次使用过时房号。','update the room number without changing the date',[
 e('Please update the room number on the invitation.','请修改邀请函上的房号。','修改对象明确。'),
 e('Do not change the date.','不要修改日期。','否定式限定了修改范围。'),
 e('The remaining balance has not yet been determined.','余款金额尚未确定。','缺失数值不能填成零。')
 ],'“未知”不等于“没有费用”；没有确认的余款只能保留为待定。')
 ],
 questions:[
 {question:'最终确认的房号是 16 还是 60？',answer:'Room sixty (60).',why:'actually we now need room sixty 明确修正了 originally requested room sixteen。'},
 {question:'邀请函日期需要改成 5 月 16 日吗？',answer:'No. Keep 14 May.',why:'原稿明确 the date remains the fourteenth of May, not the sixteenth。'},
 {question:'三十英镑是总费用吗？',answer:'No. It is the deposit; the remaining fee has not been calculated.',why:'总费用没有数值，后续依据设备清单计算余款。'},
 {question:'哪两项写入更新通知、哪一项不得修改？',answer:'Change the room to 60; retain 14 May. Mention the £30 deposit separately.',why:'只有房号变更，日期保持，押金属于另一字段。'}
 ],
 output:'按时间顺序解释预约修正，并写一封六句英文内部通知，说明旧房号、新房号、未改日期、订金及待定余款，附中文。',
 model:[
 e('The original booking request was for room sixteen.','最初预约的是十六号房。','旧值。'),
 e('The team now needs room sixty because more staff will attend.','因为参加的员工增加，团队现在需要六十号房。','变更原因。'),
 e('The training date remains 14 May.','培训日期仍然是五月十四日。','保持不变。'),
 e('The larger room is available that afternoon.','那天下午较大的房间可以使用。','供应条件。'),
 e('A deposit of thirty pounds is due by Friday.','三十英镑订金须在周五前支付。','金额及期限。'),
 e('The remaining fee cannot be confirmed until the equipment list is finalised.','设备清单确定前无法确认余款。','未定信息。')
 ],
 referenceUrls:[ref],sourceNote:'逐项对应 en-ielts-listening-u05 已有原稿；房号、日期、订金和余款绝不混淆。'
},
{
 id:'en-listening-u05-booking-revision-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u05',
 title:'预约修改词汇：request、amend、deposit、balance',subtitle:'以修正信号词连接准确的数字、日期和金额',
 prerequisite:'可听懂日期与房号的基本表达，并已学习本课口头修正语法。',
 objective:'辨析 reservation、request、confirm、amend、deposit、remaining fee；使用状态词解释哪些已确认、哪些仍待计算。',
 sections:[
 s('01 request 是提出请求，confirm 是最终确认','request 指提出需求，并不意味着已经批准；confirm 常指核实或确认某项事实。原稿中较大会议室下午 available 已被确认，但设备清单尚未 finalised。','request a room / confirm availability / finalise the list',[
 e('They request a larger room.','他们申请一间更大的房间。','申请动作。'),
 e('The receptionist confirms availability.','接待员确认房间可用。','已确认条件。'),
 e('The equipment list has not been finalised.','设备清单还未最终确定。','仍有待完成的步骤。')
 ],'“确认房间可用”不等于“全部费用已确认”。',
 t('常见预订词边界',[['reservation','预约／预订','不表示费用已付清'],['amend','修改已有预订','不是新建两项预订'],['deposit','订金','不是总价'],['remaining fee','待支付余款','原稿未给出金额']],'将状态词和对象词一起记录，比只背中文词义更可靠。')),
 s('02 amend、update 与 change 的对象','amend a reservation 表修改现有预约；update the invitation 指更新邀请函上的信息；change the date 只有被明确要求时才执行。','amend a booking / update a room number / keep the date',[
 e('Please amend the room number.','请修改房号。','改动对象是 room number。'),
 e('Update the invitation without changing the date.','更新邀请函，但不要修改日期。','without 限制动作。'),
 e('The original room request is no longer current.','最初的房间申请已不是现行版本。','旧值不应继续使用。')
 ],'不能把 update invitation 扩大成修改时间、地点、金额等所有字段。'),
 s('03 deposit、fee 和 balance','deposit 指订金，fee 指收费，remaining balance 或 remaining fee 指尚未支付的部分。本课只给定订金 £30，最终总额和余款均未给出。','pay a deposit / remaining fee / total charge',[
 e('A deposit of thirty pounds is payable by Friday.','三十英镑订金须在周五前支付。','金额与到期日绑定。'),
 e('The remaining fee is not yet known.','余款金额尚不清楚。','不能凭空推断。'),
 e('The final charge depends on the equipment list.','最终费用取决于设备清单。','费用决定条件。')
 ],'题目问 total charge 时不能填写 deposit；若无总额信息，应如实记录未给出。'),
 s('04 日期与时间修正中的词形','fourteenth 是序数词，fourteen 是基数词；May the fourteenth 或 the fourteenth of May 均表示五月十四日。sixteen 是 16，sixty 是 60，音节重音不同。','14 May = the fourteenth of May / 16 ≠ 60',[
 e('The session takes place on the fourteenth of May.','培训于五月十四日举行。','日期使用序数形式。'),
 e('The old room was sixteen, and the new room is sixty.','旧房号是十六，新房号是六十。','同音近似但数值不同。'),
 e('The deposit is due by Friday, not necessarily on Friday.','订金最迟应在周五前缴纳，不一定非要周五当天缴纳。','by 是截止时间。')
 ],'by Friday 说明期限，不等于 on Friday 才能付款；日期和数字词形都需复核。')
 ],
 questions:[
 {question:'deposit 和 total fee 是同义词吗？',answer:'No. The deposit is a partial payment, not the confirmed total.',why:'原稿余款尚需在设备清单确认后计算。'},
 {question:'amend a reservation 是新建另一个预约还是修改当前预约？',answer:'To modify the existing reservation.',why:'amend 强调更正或修改现有信息。'},
 {question:'by Friday 与 on Friday 的期限范围相同吗？',answer:'No. By Friday means no later than Friday.',why:'by 表示最迟期限，并不要求周五当天才付款。'},
 {question:'what remains unconfirmed after room availability is confirmed?',answer:'The remaining fee, because the equipment list is unfinished.',why:'available 只确认房间，不说明最终收费。'}
 ],
 output:'以 reservation amendment 为主题写一段英文核对通知，列出四个字段和各自状态，并配中文。',
 model:[
 e('We need to amend the reservation for the training session.','我们需要修改培训预约。','总任务。'),
 e('The original room was sixteen.','最初的房号是十六。','旧值。'),
 e('The confirmed room is now sixty.','现在确认的房号是六十。','新值。'),
 e('The date remains the fourteenth of May.','日期仍为五月十四日。','日期状态。'),
 e('Please pay the thirty-pound deposit by Friday.','请在周五前支付三十英镑订金。','金额及期限。'),
 e('The remaining charge will be confirmed later.','余款费用将在稍后确认。','保留未知。')
 ],
 referenceUrls:[ref],sourceNote:'紧扣原有预约修改课程，严守已确认信息与待确定信息的区别。'
},
{
 id:'en-listening-u06-word-class-completion-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-listening-u06',
 title:'填空前先预测词类，再核对原词和字数限制',subtitle:'a clean ___ → container；最终报告还要包含 method 与 result',
 prerequisite:'掌握 a/an、可数名词单复数、形容词修饰及基本被动句。',
 objective:'根据空格前后成分预测词类，结合听力证据填写容器、地点、日期和测量方法，不添加题干已有的冠词或虚构数值。',
 sections:[
 s('01 冠词和形容词共同限制答案词形','a clean 后面通常需要单数可数名词；原文 a clean container 精确符合。答案空格前若已有 a clean，填 container 即可，重复填写 a clean container 会违反题目要求。','a clean + singular count noun → container',[
 e('Place each sample in a clean container.','将每份样品放进干净的容器。','a clean 修饰单数名词 container。'),
 e('Complete: Place each sample in a clean ___.','填空：将每份样品放进干净的___。','只填 container。'),
 e('The answer is container, not a container.','应填 container，而不是 a container。','题目已给出冠词。')
 ],'不能机械粘贴整句；先确认空格的词类和字数限制。',
 t('填空证据检查',[['a clean ___','一个干净的容器','只填 container'],['location and date','地点与日期','两项信息'],['under consistent conditions','在一致条件下','不是新的测量结果'],['method as well as result','方法和结果','不能漏一列']],'词类预测只是缩小范围，最终答案仍须由原文证据决定。')),
 s('02 被动式突显实验步骤而非施事','should be placed 与 are kept 描述样品要经历的流程，不必虚构是谁操作。标本先入容器，再贴地点和采集日期标签，随后在一致条件下保存；时间先后对完成流程题很重要。','should be placed / attach a label / are kept',[
 e('Each soil sample should be placed in a container.','每份土壤样品应放在一个容器中。','被动式聚焦操作要求。'),
 e('Attach a label showing the collection date.','贴上注明采集日期的标签。','showing 是后置修饰。'),
 e('All samples are kept under consistent conditions.','所有样品都在一致条件下保存。','一致条件与数值相同不是一回事。')
 ],'are kept under consistent conditions 不意味着所有测量值相同，控制存放条件只是减少变异来源。'),
 s('03 并列范围：method as well as result','as well as 表还包括；the method as well as the result 要求两项并存。报告如果只有测量值而不说明方法，跨研究比较可能失真；题目中的 both columns 进一步确认信息必须完整。','state the method as well as the result / complete both columns',[
 e('The report should state the measurement method as well as the result.','报告应同时写明测量方法和结果。','不是二选一。'),
 e('A value without its method is difficult to compare.','缺少测量方法的数值难以比较。','解释两栏必要性。'),
 e('Students must complete both columns.','学生必须填写两栏。','both 规定数量为两项。')
 ],'不要把 both columns 简化成 only the result；两栏分别对应方法和结果。'),
 s('04 单复数与量词受上下文约束','each sample 为单数，all samples 为复数；a label 中用不定冠词单数，collection date 是具体类别。读题时必须区分 each 和 all，否则可能写错答案形态。','each sample / all samples / a label / collection date',[
 e('Each sample needs a label.','每份样品都需要一个标签。','each 对应单数谓语 needs。'),
 e('All samples are stored under consistent conditions.','所有样品都在一致条件下保存。','all samples 为复数。'),
 e('The label records the location and collection date.','标签记录采集地点和日期。','原稿明确两项。')
 ],'不能把 location and collection date 改成 laboratory name and temperature；后两者并非该标签所要求的项目。')
 ],
 questions:[
 {question:'Place each sample in a clean ___（ONE WORD）应填什么？',answer:'container',why:'原稿对应 a clean container；题干已有 a clean，只填一个单词。'},
 {question:'贴在样品上的标签要求哪两项信息？',answer:'The collection location and date.',why:'原稿明示 label showing the location and collection date。'},
 {question:'报告应记录方法、结果还是两者？',answer:'Both the measurement method and the result.',why:'as well as 和 both columns 都要求两项。'},
 {question:'“样品放在一致条件下”是否保证测量值完全相同？',answer:'No. Consistent conditions reduce one source of variation, not all differences.',why:'原文仅说明减少由存储温度差异带来的变异，不能推出数值相等。'}
 ],
 output:'把土壤样品流程写成五句英文操作说明，再给出对应中文；标出 a clean container 的填空边界及报告的两栏。',
 model:[
 e('Each soil sample is put into a clean container.','每份土壤样品都放入一个干净容器。','容器。'),
 e('A label records the collection location and date.','标签记录采集地点和日期。','标签信息。'),
 e('The samples are kept under consistent conditions.','样品在一致条件下保存。','条件。'),
 e('The laboratory then measures moisture.','随后实验室测量水分含量。','测量步骤。'),
 e('The report includes both the method and the result.','报告同时包含方法和结果。','两栏。'),
 e('A result alone is difficult to compare with another study.','单独的结果难以与另一研究比较。','限制。')
 ],
 referenceUrls:[ref],sourceNote:'严格复用 en-ielts-listening-u06 原有 soil sample 和 report 两栏资料。'
},
{
 id:'en-listening-u06-lab-record-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-listening-u06',
 title:'样品记录词汇：sample、label、moisture、measurement',subtitle:'从物件和属性到可复核的实验记录',
 prerequisite:'能辨别名词与动词；了解本课容器、标签和记录表的基本流程。',
 objective:'准确区分 soil sample、container、label、measurement、method、result 和 consistent storage conditions，掌握常见搭配及答案词形。',
 sections:[
 s('01 sample / specimen / container 的不同指向','soil sample 是采集到的土壤样品；container 是用来存放样品的容器。label 是附在容器上的标识信息。三者分别回答“研究什么、装在哪里、如何追溯”，不能互换。','collect a soil sample / a clean container / attach a label',[
 e('A soil sample is placed in a clean container.','一份土壤样品放在干净的容器中。','物品与容器分离。'),
 e('Attach a label to the container.','把标签贴在容器上。','label 作名词。'),
 e('Record the collection location and date.','记录采集地点和日期。','标签内容的两项字段。')
 ],'题目问容器时不能答 sample；问标签内容时不能只答 label。',
 t('实验记录四个词项',[['soil sample','土壤样品','被检测对象'],['clean container','干净容器','存放样品'],['collection date','采集日期','标签所需信息'],['measurement method','测量方法','报告所需信息']],'对象、容器、标签信息和报告信息对应不同阶段。')),
 s('02 moisture、measurement 和 measured value','moisture 指水分（或湿度语境中的含水情况），measurement 是测量活动或测得的数据；method 是采用的方法，result 是输出结果。原稿只要求记录方法和结果，没有提供实际湿度数值。','measure moisture / measurement method / a measured result',[
 e('The laboratory measures moisture in soil.','实验室测量土壤中的水分。','moisture 是测量对象。'),
 e('The report explains the measurement method.','报告解释所用的测量方法。','method 不等于 value。'),
 e('No numerical moisture result is supplied.','文本没有给出具体的水分测量数值。','避免编造百分比。')
 ],'不能因为出现 moisture 就写成 25% moisture；原文没有任何可填的具体数值。'),
 s('03 consistent conditions 不等于 identical results','consistent 用于条件一致；variation 是变异或差异。控制保存温度可减少由储存条件不同造成的变异，但不会自动排除其他差异。','consistent conditions / reduce variation / storage temperature',[
 e('Samples are kept under consistent conditions.','样品在一致的条件下保存。','条件上的一致。'),
 e('This reduces variation from different storage temperatures.','这样能减少不同储存温度造成的变异。','说明有限的作用来源。'),
 e('The samples may still have different moisture values.','不同样品的水分数值仍可能不同。','不能从控制条件推出数值相同。')
 ],'consistent 不能随意换为 identical；一致实验条件不代表样品属性完全相同。'),
 s('04 核对完整记录表','record sheet 是记录表；complete both columns 要求两栏都填全。若题目问 measure 如何执行，就应查找 method；若题目问得到什么结果，就应查找 result。','record sheet / both columns / method and result',[
 e('The record sheet has a method column.','记录表有一栏填写方法。','方法栏。'),
 e('It also has a result column.','它还有一栏填写结果。','结果栏。'),
 e('Both columns must be completed.','两栏都必须填写。','原稿明确完整性要求。')
 ],'未提供测量结果时不能凭常识完成 result 栏；应标记待实际测量。')
 ],
 questions:[
 {question:'soil sample 和 clean container 哪个是被检测对象？',answer:'The soil sample.',why:'container 是存放样品的工具，不是土壤样品本身。'},
 {question:'label 需要记录哪两个字段？',answer:'Location and collection date.',why:'原文直接列出两个标签项目。'},
 {question:'consistent storage conditions 是否意味着 moisture values identical？',answer:'No. The conditions are controlled, not guaranteed results.',why:'只减少储存条件引起的一部分变异。'},
 {question:'报告中 method 与 result 是否可以只选其一？',answer:'No. Both must be recorded.',why:'both columns 明确要求两个字段都填写。'}
 ],
 output:'以双语步骤说明解释一份样品从采集、存放、贴标签到测量记录的过程，不填写来源未提供的数值。',
 model:[
 e('We collect a soil sample for measurement.','我们采集一份土壤样品进行测量。','对象。'),
 e('The sample goes into a clean container.','样品放进干净的容器。','容器。'),
 e('Its label records the location and collection date.','标签记录地点和采集日期。','追溯。'),
 e('We keep the samples under consistent conditions.','我们把样品保存在一致的条件下。','条件。'),
 e('The laboratory measures moisture.','实验室测量水分。','测量。'),
 e('The report states the method and the result separately.','报告分别说明方法和结果。','完整记录。')
 ],
 referenceUrls:[ref],sourceNote:'根据既存 U06 土壤样品脚本扩写，不冒充真实研究结果或 IELTS 官方原题。'
}
];