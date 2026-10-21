import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const part=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
/** Original bilingual modules extending exact pre-existing classroom and listening drafts. */
export const A1_QUESTIONS_LISTENING_PARAPHRASE:SpecialtyLesson[]=[
{
 id:'fr-a1-information-questions',language:'fr',type:'grammar',level:'A1',unitLink:'fr-a1-u06',
 title:'法语 A1｜完整提问：是非问句、疑问词和否定回答',subtitle:'从课程时间和教室位置的真实问答入手',prerequisite:'会用 être、avoir 与常见 -er 动词的现在时，能够理解 le cours、la salle 和时间表达。',
 objective:'用语调和 est-ce que 提出是非问句，选用 où、quand、qui、comment、combien 获取特定信息，再通过正确的否定及纠正回答完成一次对话。',
 sections:[
 part('01 是非问句：语调和 est-ce que',
 '初级口语中可以保留陈述句词序、通过句末升调提问，也可以把 est-ce que 放在完整陈述句前面。主语和变位动词在这两种常用形式中不必倒装。est-ce que 遇到元音起始的后续词时常写成 est-ce qu’。',
 'Le cours commence à dix heures. → Le cours commence à dix heures ? / Est-ce que le cours commence à dix heures ?',[
 e('Le cours commence à dix heures ?','课程十点开始吗？','保留陈述词序，通过语调提问。'),
 e('Est-ce que la salle est au deuxième étage ?','教室在二楼吗？','est-ce que 放在句首，后面 la salle est 仍是陈述顺序。'),
 e('Est-ce qu’il y a un cours demain ?','明天有课吗？','que 在 il 前省音成 qu’，il y a 保持整体结构。')
 ],'Est-ce que commence le cours… 把两种提问结构混在一起；此处应说 Est-ce que le cours commence…。',
 {title:'同一信息的两种常用问法',columns:['方式','句子','语境'],rows:[['升调','Vous avez cours lundi ?','日常交流'],['est-ce que','Est-ce que vous avez cours lundi ?','中性清晰的问句'],['升调','La salle est libre ?','询问是否可用'],['est-ce que','Est-ce que la salle est libre ?','句首明确标记问题']],note:'动词倒装也存在，但不是此课的默认初学者句型。'}),
 part('02 疑问词先匹配信息类型',
 'où 用来问位置，quand 问时间，qui 问人物，comment 问方式或状况，combien 问数量或价格。日常口语可以把疑问词置于句末；用 où est-ce que / quand est-ce que 等放句首时，后面保持主谓的常规顺序。',
 'Où est la salle ? / Quand est-ce que le cours commence ?',[
 e('Où est l’escalier, s’il vous plaît ?','请问楼梯在哪里？','回答应提供地点，而不是时间。'),
 e('Quand est-ce que le cours commence ?','课程什么时候开始？','quand 对应时间，commence 与 le cours 的主谓关系正确。'),
 e('Qui est le professeur aujourd’hui ?','今天谁是老师？','qui 提问人物，此处 qui 自身充当主语。')
 ],'où（在哪里）与 ou（或者）不同；où 不因在句首或句末而丢掉重音符号。'),
 part('03 否定与纠正：回答问题的关键在新信息',
 '一般现在时中 ne…pas 分别位于变位动词两侧，元音前 ne 变成 n’。听到否定回答后要继续抓取纠正信息，例如“不是十点，是十点半”。在通常表达不定数量的否定句中 un/une/des 常转为 de 或 d’，但 être 的表语并不自动这样变化。',
 'Je ne connais pas la salle. / Il n’y a pas de cours.',[
 e('Non, le cours ne commence pas à dix heures.','不，课程不是十点开始。','ne…pas 围绕变位动词 commence。'),
 e('Il commence à dix heures et demie.','课程十点半开始。','否定后的纠正时间才是需要记录的关键信息。'),
 e('Il n’y a pas de cours demain.','明天没有课。','n’…pas 包围 a；否定 il y a 中用 de cours。')
 ],'不能写 Je ne pas sais；否定一般围绕变位动词。Ce n’est pas un professeur 的不定冠词通常仍保留。'),
 part('04 澄清听不懂的信息：重复和确认',
 '真实对话不仅要提出问题，还需要在听不清、时间相近或地点不确定时用适当礼貌方式请求重复与确认。pardon、vous pouvez répéter 和 c’est bien…? 对应不同的沟通功能；确认时必须复述关键数字或位置。',
 'Pardon ? / Vous pouvez répéter, s’il vous plaît ? / C’est bien à… ?',[
 e('Pardon, vous pouvez répéter l’heure, s’il vous plaît ?','抱歉，您能再重复一遍时间吗？','明确要重复的是 l’heure。'),
 e('Le cours commence bien à dix heures et demie ?','课程确实是十点半开始，对吗？','bien 强调确认此前听到的信息。'),
 e('Merci. Et la salle est près de l’accueil ?','谢谢。那么教室在接待处附近吗？','用 et 顺畅进入地点确认。')
 ],'重复问题时不能悄悄把 dix heures et demie 改成 dix heures；确认的目的正是排除信息偏差。')
 ],
 questions:[
 {question:'把 La salle est au deuxième étage. 改成 est-ce que 的是非问句。',answer:'Est-ce que la salle est au deuxième étage ?',why:'在原陈述句前加 est-ce que，后面保留主语 la salle 和动词 est 的顺序。'},
 {question:'填写：___ est l’escalier ?（询问地点）',answer:'Où',why:'地点用 où 且必须保留重音；ou 表示“或者”。'},
 {question:'改错：Je ne pas connais le professeur.',answer:'Je ne connais pas le professeur.',why:'ne 放在变位动词前，pas 放在变位动词后。'},
 {question:'原话 Non, il commence à dix heures et demie. 课程实际几点开始？',answer:'À dix heures et demie (10 h 30).',why:'Non 否定之前的猜测；真正的时间是十点半，不能误记十点。'}
 ],
 output:'写八句法语完成“第一次到语言学校”的双人问答：至少问一次地点、一次时间、一次人物，出现一条否定纠正、一句请求重复和一句确认；使用适当的礼貌表达。',
 model:[
 e('Bonjour, je cherche la salle de français.','您好，我在找法语教室。','先说明需求。'),
 e('Est-ce que le cours commence à dix heures ?','课程十点开始吗？','est-ce que 是非问句。'),
 e('Non, il ne commence pas à dix heures.','不，不是十点开始。','明确否定错误时间。'),
 e('Il commence à dix heures et demie.','它十点半开始。','补充正确时间。'),
 e('Pardon, vous pouvez répéter, s’il vous plaît ?','抱歉，您能再说一遍吗？','礼貌请求重复。'),
 e('Oui, à dix heures et demie.','可以，十点半。','再次确认关键时间。'),
 e('Où est la salle, et qui est le professeur ?','教室在哪里，老师是谁？','问地点和人物。'),
 e('Elle est au deuxième étage, et le professeur est Madame Martin.','教室在二楼，老师是马丁女士。','按问句顺序提供地点和人物。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/int2.html','https://www.laits.utexas.edu/tex/gr/int7.html','https://www.laits.utexas.edu/tex/gr/neg2.html'],
 sourceNote:'对应 fr-a1-u06 已有课程原稿（学校、教室、十点半、Madame Martin），对照 Tex 问句和否定规则重写。'
},
{
 id:'fr-a1-clarification-lexicon',language:'fr',type:'vocabulary',level:'A1',unitLink:'fr-a1-u06',
 title:'法语 A1｜询问与澄清语块：课程、地点、时间',subtitle:'疑问词连同固定搭配及礼貌回应一起学习',prerequisite:'会区分 où、quand、qui，认识常见时间和方位介词。',
 objective:'在学校场景中准确运用 salle de cours、horaire、au deuxième étage、près de l’accueil、répéter 等搭配，并通过纠正与确认维护对话准确性。',
 sections:[
 part('01 问人、地点、时间的词与整个搭配',
 '提问词必须和后面的回答类型配对：où 对地点、quand 和 à quelle heure 对时间、qui 对人、comment 对方式。à quelle heure 只问具体几点；quand 既能问某日也能问具体时段。词汇要连同语境及句法学习，而不是只背单字翻译。',
 'où + être / à quelle heure + commencer / qui + être',[
 e('À quelle heure commence le cours de français ?','法语课几点开始？','à quelle heure 专问时刻。'),
 e('Quand est la réunion ?','会议什么时候开？','quand 可以用更宽泛的时间作答。'),
 e('Qui est responsable de cette salle ?','谁负责这间教室？','être responsable de + 名词表示负责事项。')
 ],'à quelle heure 不能要求对方回答“在二楼”；词汇是否选对要根据答案类型检验。',
 {title:'疑问表达与回答',columns:['词组','问什么','对应答案'],rows:[['où','位置','au deuxième étage'],['à quelle heure','具体时刻','à dix heures et demie'],['quand','日期或时段','lundi matin'],['qui','人物','Madame Martin']],note:'提问与答案的语义类型必须一致。'}),
 part('02 教室方位：参照点与介词缩合',
 'une salle 是阴性名词；au deuxième étage 中 au 是 à + le 的缩合；près de 指相对于另一个对象的位置，près de l’accueil 中 de 在元音前省音为 d’。à droite / à gauche 需要明确参照方向。',
 'au deuxième étage / près de l’accueil / à droite de la porte',[
 e('La salle se trouve au deuxième étage.','教室在二楼。','au = à + le，deuxième étage 为阳性名词词组。'),
 e('L’escalier est à droite de l’accueil.','楼梯在接待处右边。','à droite de 标示参照位置。'),
 e('Le bureau est près de la salle de français.','办公室靠近法语教室。','près de 接完整名词词组。')
 ],'不能写 à le deuxième étage；介词 à 与阳性单数定冠词 le 必须缩合成 au。'),
 part('03 课程安排：commencer、finir、durer 的不同信息',
 'commencer 问开始时间，finir 问结束时间，durer 问持续多久；horaire 是时间安排，heure 可指时刻或小时，de…à… 表一段时段。理解语块的功能有助于避免把十点半的开课时间误记为结束时间。',
 'commencer à 10 h 30 / finir à midi / durer une heure et demie',[
 e('Le cours commence à dix heures et demie.','课程十点半开始。','commence 对应起点。'),
 e('Il finit à midi.','课程中午十二点结束。','finit 对应终点。'),
 e('Il dure une heure et demie.','课程持续一个半小时。','durer 回答时长，不能只用开始时刻回答。')
 ],'une heure et demie 是一个半小时，dix heures et demie 是十点半；相同 demie 在时间位置上表示不同意义。'),
 part('04 请求澄清与礼貌结束',
 'pardon 可以表示没听清；répéter la question 是重复问题；confirmer l’horaire 是确认时间安排；merci pour + 名词短语表示感谢。与陌生老师或工作人员交谈时，优先使用 vous，避免从 tu 和 vous 混用。',
 'Pourriez-vous répéter… ? / Pouvez-vous confirmer… ? / Merci pour…',[
 e('Excusez-moi, pourriez-vous répéter le numéro de la salle ?','打扰一下，您能再重复一次教室号码吗？','excusez-moi 和 pourriez-vous 构成礼貌请求。'),
 e('Pouvez-vous confirmer l’horaire du cours ?','您能确认课程时间安排吗？','confirmer 后接确认对象。'),
 e('Merci pour votre aide. Bonne journée !','感谢您的帮助，祝您今天愉快！','适合工作人员交流结束。')
 ],'répéter 和 confirmer 不等同：前者请求复述，后者请求核实信息是否正确。')
 ],
 questions:[
 {question:'问“几点开始”，选择 Quand 或 À quelle heure 中更精确的一个。',answer:'À quelle heure commence le cours ?',why:'两者都可询问时间，但 à quelle heure 明确要求回答具体时刻。'},
 {question:'改错：La salle est à le deuxième étage.',answer:'La salle est au deuxième étage.',why:'à + le 缩合为 au，étage 是阳性。'},
 {question:'“课程持续一个半小时”如何用 durer 表达？',answer:'Le cours dure une heure et demie.',why:'durer 是持续时长，une heure et demie 是一个半小时。'},
 {question:'如何礼貌地请求老师确认课程时间？',answer:'Pouvez-vous confirmer l’horaire du cours, s’il vous plaît ?',why:'confirmer 适用于已听到信息但需要核实的情形，vous 对应礼貌称呼。'}
 ],
 output:'写八句法语接待处对话：问开始和结束时刻、持续时长、教室位置，使用 au deuxième étage、près de、confirmer 和一句恰当致谢，注意所有回答的类型。',
 model:[
 e('Bonjour, je voudrais connaître l’horaire du cours de français.','您好，我想了解法语课的时间安排。','礼貌说明目的。'),
 e('À quelle heure commence le cours ?','课程几点开始？','具体开始时刻。'),
 e('Il commence à dix heures et demie.','课程十点半开始。','给出开始时刻。'),
 e('Et à quelle heure finit-il ?','那么几点结束？','对照结束时刻。'),
 e('Il finit à midi, donc il dure une heure et demie.','中午十二点结束，因此持续一个半小时。','结束时间与时长一致。'),
 e('La salle est-elle au deuxième étage ?','教室在二楼吗？','可识别的倒装疑问，用于确认地点。'),
 e('Oui, elle est près de l’escalier.','是的，在楼梯附近。','补充空间参照。'),
 e('Merci pour votre aide. Bonne journée !','谢谢您的帮助，祝您今天愉快！','自然结束对话。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/int7.html','https://www.laits.utexas.edu/tex/gr/pre2.html','https://www.laits.utexas.edu/tex/gr/no5.html'],
 sourceNote:'基于 fr-a1-u06 既有学校问路和时刻原稿，扩展关键搭配、数词时长、对话确认；非原教材原文转载。'
},
{
 id:'en-listening-paraphrase-scope',language:'en',type:'grammar',level:'B2',unitLink:'en-ielts-listening-u03',
 title:'IELTS 听力｜同义改写的句法与信息边界',subtitle:'转写成笔记之前先保留数字、范围、否定和因果',prerequisite:'能够分辨主语、谓语、否定、比较级与情态动词，熟悉简单讲座笔记。',
 objective:'听辨同义改写与原句对应，保留最大值/实际值、数量强度、否定和原因归属；掌握与 IELTS 听力笔记填空一致的关键词抽取。',
 sections:[
 part('01 同义改写可以换词，但不能改变程度',
 'a modest decline 可改为 a slight fall，然而 sudden collapse 更强；be considering 与 have decided 是不同阶段。有效 paraphrase 必须保留动作主体、时间、极性和确定程度。匹配题要比对整体意义，而不只是找到同一个单词。',
 'a modest decline ≈ a slight fall; consider ≠ decide',[
 e('Attendance showed a modest decline after the venue changed.','场地更换后，出席人数小幅下降。','modest decline 是程度有限的下降。'),
 e('The number of participants fell slightly.','参与人数略有减少。','fell slightly 保留小幅下降。'),
 e('The organiser is considering an online session.','组织者正在考虑一次线上活动。','is considering 不表示已经正式作出决定。')
 ],'不能把 a modest decline 改写为 attendance collapsed；也不能把 is considering 改成 has arranged。',
 {title:'保留语义边界',columns:['原句表达','可接受改写','错误改写'],rows:[['modest decline','slight fall','dramatic collapse'],['up to thirty','a maximum of thirty','exactly thirty'],['considering','exploring the possibility','has confirmed'],['may help','could be useful','will definitely solve']],note:'要检查强度、上限、完成状态及不确定性，不能只依据词形相似。'}),
 part('02 限定词的范围与否定的作用域',
 'up to thirty 是上限而非实际到场人数；roughly thirty 表近似值；at least thirty 是下限。句子 This does not mean that… 否定的是推论关系，而非第一分句报道的事实。听力做题需要区分说话者纠正了什么。',
 'up to = maximum / at least = minimum / roughly = approximately',[
 e('Up to thirty people could join the online session.','这次线上活动最多可容纳三十人。','三十是容量上限，不能说正常有三十人参加。'),
 e('Roughly twenty people usually attend.','通常大约二十人参加。','roughly 表大约，usually 表通常。'),
 e('This does not mean that learners have lost interest.','这并不意味着学习者失去了兴趣。','否定的是从人数下降推断出兴趣下降。')
 ],'a capacity of thirty 和 attendance of thirty 是两个不同变量，笔记不能把 capacity 写进 attendance 栏。'),
 part('03 代词与因果：是谁报告了什么',
 'Several participants reported an extra bus journey 描述部分参与者报告的交通负担，并不等于组织者证明搬迁导致学习兴趣减少。听到 this、it、the move 等回指时，应明确先行词及说话人引用的是观察、归因还是猜测。',
 'participants reported → extra journey; speaker cautioned → no causal conclusion',[
 e('Several participants reported an additional bus journey.','数名参与者表示需要多换乘一段公交。','报告主体是 several participants，不是全体成员。'),
 e('The change of venue coincided with lower attendance.','场地变动与到场人数下降发生在同一时期。','coincided with 不能单独证明原因。'),
 e('The speaker did not claim that the move caused a loss of interest.','讲者没有声称搬迁导致兴趣下降。','保留未确立因果的边界。')
 ],'coincided with 与 was caused by 不是同义改写；不能在笔记里自行补入因果关系。'),
 part('04 对照题干抽取答案，遵守词数限制',
 'IELTS 听力笔记、表格与流程填空会给出明确的字数限制，通常要求使用录音中实际出现的词，不可随意超词数。读题先识别空格需要名词、数值或地点，再从原句保留正确词形与作用域；单词列表只是听前预测，最终以录音为准。',
 'question label → expected information type → exact heard words',[
 e('Venue issue: an additional bus journey.','场地问题：需要额外乘坐一段公交。','来自原稿的直接对应语块。'),
 e('Proposed capacity: up to thirty participants.','拟议容量：最多三十人。','up to 是上限，不能省成确切三十人。'),
 e('Proposed change: one online session each month.','拟议调整：每月一次线上活动。','one…each month 是频率；仍是考虑阶段。')
 ],'“NO MORE THAN TWO WORDS” 是对答案单位的具体限制，不能用一个完整解释句代替；本节自编练习与官方录音不是同一材料。')
 ],
 questions:[
 {question:'将 a modest decline 改写为不改变程度的英语短语。',answer:'a slight fall',why:'两个表达都表示小幅下降，不能扩大成 dramatic collapse。'},
 {question:'up to thirty 是 A. exactly thirty 还是 B. a maximum of thirty？',answer:'B. a maximum of thirty',why:'up to 表不超过的容量上限，并非平常参加人数。'},
 {question:'The organiser is considering an online replacement. 这是已确认改变吗？',answer:'No. The organiser is considering it, not confirming it.',why:'considering 表正在探讨可能性，不能替换为 has decided。'},
 {question:'“场地变化与人数下降同时发生”可否直接推断变化导致兴趣下降？',answer:'No. The timing alone does not establish causation.',why:'时间相关无法单独确认因果，尤其原稿明确提醒不要推断兴趣下降。'}
 ],
 output:'将原有听读课文写成八句英语“准确笔记→完整转述”示范：保留小幅下降、通勤负担、线上活动提议、每月频率、最多三十人的容量和不确定性，不虚构常规到场人数。',
 model:[
 e('The evening workshop had a modest decline in attendance.','晚间工作坊的出席人数小幅下降。','忠实保留 modest 的程度。'),
 e('The decline followed a change of venue.','下降发生在活动地点改变之后。','只交代时序。'),
 e('The speaker did not say that participants had lost interest.','讲者没有说参与者失去了兴趣。','防止错误推断。'),
 e('Several participants reported needing an additional bus journey.','几名参与者表示需要多乘坐一段公交。','准确保留 several 和报告主体。'),
 e('The organiser is considering a monthly online session.','组织者正在考虑每月安排一次线上活动。','保留考虑阶段与频率。'),
 e('The proposed online option could accommodate up to thirty people.','拟议线上形式最多可容纳三十人。','上限并非实际人数。'),
 e('The normal group is smaller than that capacity.','正常参加人数少于这个容量。','根据已有课文，不自行提供具体人数。'),
 e('A reliable summary should distinguish observed attendance from proposed capacity.','准确摘要应区分已观察的出席人数和拟议容量。','最后强调指标边界。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening','https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test'],
 sourceNote:'对照 en-ielts-listening-u03 原有 workshop 场地变化、上限和考虑方案的文本；核校 IELTS 官方 note completion 词数要求。不是正式 IELTS 录音。'
},
{
 id:'en-listening-note-lexicon',language:'en',type:'vocabulary',level:'B2',unitLink:'en-ielts-listening-u03',
 title:'IELTS 听力｜讲座笔记、容量与通勤的语块',subtitle:'按功能学习 attendance、capacity、venue、replacement 和 frequency',prerequisite:'理解 modest decline、roughly、up to 和基本名词短语，可概括短听力。',
 objective:'区分 workshop attendance 与 proposed capacity、venue 与 journey、alternative 与 confirmed replacement，使用固定搭配把短听读信息整理为结构化笔记。',
 sections:[
 part('01 出席人数与容量是不同指标',
 'attendance 表示实际到场/参与情况，capacity 表最多可容纳人数，venue 是举办地点。学习这些词时要记搭配及提问所需的指标，而非只记“人数”和“场地”的汉语对应。',
 'attendance at the workshop / seating capacity / change of venue',[
 e('Attendance at the workshop fell slightly.','工作坊的出席人数略有下降。','attendance at + 活动名词。'),
 e('The online session could have a capacity of thirty.','这次线上活动的容量可能是三十人。','capacity 是最大允许人数，尚属设想。'),
 e('A change of venue affected the route to the workshop.','更换地点影响了前往工作坊的路线。','venue 指举办场所，route 指路线。')
 ],'attendance 和 capacity 不能因为都与人数有关就互换；一个指实到情况，一个指容纳上限。',
 {title:'关键名词及常用搭配',columns:['词组','中文含义','信息类别'],rows:[['attendance at an event','活动出席人数','实际参与'],['venue for a workshop','工作坊场地','地点'],['maximum capacity','最大容量','上限'],['additional bus journey','额外公交行程','通勤负担']],note:'本课程的三十人数字用于拟议线上容量，不是原有晚间工作坊的实际参加人数。'}),
 part('02 限定词与程度副词必须记录',
 'modest、slight 与 marginal 在表示变化小幅时可以接近，但不一定在所有上下文同义；roughly 表估计，up to 表上限。把 up to 或 roughly 从笔记里删去会丢失信息的性质，造成不准确的转述。',
 'modest decline → slight fall / roughly → approximately / up to → at most',[
 e('The workshop experienced a modest decline.','工作坊的出席人数小幅下降。','modest 保留幅度小的描述。'),
 e('Roughly twenty students attended.','大约二十名学生参加。','roughly 是近似值，此句仅是形式演示，并非本课录音数据。'),
 e('Up to thirty learners could attend online.','最多三十名学习者可以线上参加。','up to 仍是容量上限。')
 ],'roughly twenty 是用法示例，不应抄成该讲座已证实的通常人数；原稿没有提供正常参加的精确数字。'),
 part('03 交通与替代方案词组',
 'an additional journey 表增加的行程，require an extra bus 表需要额外搭乘一班公交；an alternative option 表备选方案，a replacement 表取代旧方案。讨论中的 proposal 仍可被否决，不要提前写成已经实施的变化。',
 'require an additional bus journey / consider an online alternative',[
 e('The new venue required an additional bus journey for some learners.','新地点使部分学员需要额外乘坐一段公交。','require + 名词词组，for some learners 保留受影响范围。'),
 e('An online alternative is being considered.','组织者正在考虑一个线上备选方案。','被动进行式表示考虑中。'),
 e('The proposal would replace one session each month.','该提议将每月替换一场活动。','would 表拟议方案；不是已经固定执行。')
 ],'alternative 不必然表示 permanently replace all sessions；原稿说的只是每月一次。'),
 part('04 从听到的语块建立可回查笔记',
 '高效笔记可用两列：观察到的事实、拟议方案；先标记 source 和 status，再记录名词及必要限定词。课文中的 participants reported 是部分参与者的陈述，不是全面统计。写完整摘要时重新恢复主语、谓语、限定词与因果边界。',
 'observed: attendance ↓ slightly / reported: extra bus / proposed: monthly online; max 30',[
 e('Observed: a slight drop in workshop attendance.','观察情况：工作坊出席人数略微下降。','轻微下降，未自行添加绝对数字。'),
 e('Reported by several learners: an extra bus journey.','几名学员反映：需要额外乘坐一段公交。','准确保留消息来源和范围。'),
 e('Under consideration: a monthly online option with a maximum of thirty places.','正在考虑：每月一次、最多三十个名额的线上选项。','明确尚属讨论与上限。')
 ],'把所有项目写成 Confirmed changes 会误将“正在考虑”的方案当成已经实施。')
 ],
 questions:[
 {question:'“活动实际参加情况”和“最大容量”分别用哪两个名词？',answer:'attendance and capacity',why:'attendance 是实际参与情况，capacity 是可容纳的上限，两者不等价。'},
 {question:'填空：a change of ___（更换活动场所）',answer:'venue',why:'change of venue 是场地变更的常用搭配。'},
 {question:'将最多三十人写成准确的英文短语。',answer:'up to thirty people / a maximum of thirty people',why:'必须保留上限，不能用 exactly thirty 替代。'},
 {question:'将考虑每月一次线上活动改写为不夸大执行状态的句子。',answer:'The organiser is considering one online session each month.',why:'considering 是仍在考虑的提议，one…each month 是明确频率。'}
 ],
 output:'用至少八句英文整理该讲座的观察信息、来源陈述及未来方案。至少使用 attendance、capacity、venue、extra journey、consider、each month 和 up to，并给出通顺的中文对照。',
 model:[
 e('The workshop changed its venue.','工作坊更换了活动场地。','说明事件。'),
 e('Attendance then showed a modest decline.','随后出席人数略有减少。','观察结果保留幅度。'),
 e('The speaker did not attribute the decline to lower interest.','讲者没有把人数下降归因于兴趣减少。','限制因果解释。'),
 e('Several learners reported an extra bus journey.','几名学习者表示需要额外搭乘一段公交。','保留范围及消息来源。'),
 e('The organiser is considering an online alternative.','组织者正在考虑线上替代方案。','保留提议状态。'),
 e('It would replace one session each month.','它将每月取代一场线下活动。','明确频率。'),
 e('The proposed option could accommodate up to thirty participants.','该拟议选项最多可容纳三十人。','保留上限及未落实状态。'),
 e('The normal attendance is lower than that capacity, but its exact value was not stated.','平常出席人数少于该容量，但没有给出准确数字。','明确已知和未知范围。')
 ],
 referenceUrls:['https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening','https://www.cambridge.org/core/journals/english-profile-journal/article/a1b2-vocabulary-insights-and-issues-arising-from-the-english-profile-wordlists-project/E57847F6C5574124B2354F9BEEC005FA'],
 sourceNote:'基于 en-ielts-listening-u03 原稿，整理常用词组及功能区分；非官方 IELTS 录音转写或已证实统计。'
}
];