import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const sec=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
export const FR_A1_LEISURE_GRAMMAR:SpecialtyLesson[]=[{
 id:'fr-a1-leisure-verbs',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u07',
 title:'法语 A1｜兴趣和活动：aimer、faire、jouer 与冠词',
 subtitle:'先说清楚喜好，再区分运动、乐器与去处',prerequisite:'已会 être、avoir、规则 -er 动词现在时，认识 le/la/les 与 à/de。',
 objective:'在真实爱好交流中正确使用 aimer + 定冠词、不定式，faire de、jouer à、jouer de 和 aller à，并通过否定和偏好说明选择。',
 sections:[
 sec('01 表示喜欢的对象：定冠词与动词原形',
 '谈某类事物的普遍喜好通常用 aimer/adorer/détester + le/la/les + 名词；如果喜欢做某种活动，则直接接不定式。法国人说 j’aime le café 表示喜欢咖啡这类饮品，不是指眼前那一杯。',
 'aimer le cinéma / aimer lire / adorer la musique',[
 e('J’aime le cinéma, mais je préfère la lecture.','我喜欢电影，但更偏爱阅读。','两个泛指活动名词前都使用定冠词。'),
 e('Elle adore écouter de la musique.','她非常喜欢听音乐。','adorer 后可接动词原形 écouter。'),
 e('Nous détestons attendre longtemps.','我们讨厌长时间等待。','détester + 不定式表达对活动的态度。')
 ],'不能将 J’aime le chocolat 简单改成 J’aime un chocolat 表示同样的泛指喜好；后者更偏一份具体巧克力。',{title:'喜好表达',columns:['对象','结构','示例'],rows:[['泛指事物','aimer + le/la/les','j’aime la musique'],['具体动作','aimer + infinitif','j’aime chanter'],['较强喜好','adorer + le/la/les','j’adore les films'],['不喜欢','détester + infinitif','je déteste attendre']],note:'偏好与情境密切相关；可以说 je préfère le thé au café 表示两项比较。'}),
 sec('02 体育与常见活动：faire de 与 jouer à',
 '许多体育活动用 faire de + 名词：faire du vélo、faire de la natation、faire de l’escalade；球类或棋类活动常用 jouer à：jouer au football、jouer aux échecs。à/de 在 le、les 前需要缩合，不能把所有运动套同一介词。',
 'faire du vélo / faire de la natation / jouer au tennis / jouer aux échecs',[
 e('Je fais du vélo le dimanche.','我星期天骑自行车。','faire de + le 缩合成 du。'),
 e('Nous faisons de la natation à la piscine.','我们在游泳池游泳。','faire de la + 阴性活动名词。'),
 e('Ils jouent au football après les cours.','他们下课后踢足球。','jouer à + le 缩合成 au。')
 ],'不能将 jouer au tennis 改写为 jouer du tennis；jouer à 表运动/游戏，jouer de 常表演奏乐器。'),
 sec('03 乐器和去处：jouer de 与 aller à',
 '乐器常用 jouer de + 名词：jouer du piano、jouer de la guitare。去某个场所使用 aller à + 地点名词：aller au cinéma、aller à la piscine、aller aux concerts。两类表达的动词支配介词不同，冠词缩合要结合性数。',
 'jouer du piano / jouer de la guitare / aller au cinéma',[
 e('Mon frère joue du piano.','我弟弟弹钢琴。','jouer de + le piano → du piano。'),
 e('Je joue de la guitare le soir.','我晚上弹吉他。','guitare 是阴性名词，de la 不缩合。'),
 e('Nous allons au cinéma vendredi.','我们周五去电影院。','aller à + le cinéma → au cinéma。')
 ],'不能把 jouer du piano 换成 jouer au piano 来学习标准“弹钢琴”结构；与 jouer au tennis 的介词关系不同。'),
 sec('04 否定一个活动，保留准确介词关系',
 '一般否定使用 ne…pas 围绕变位动词。对于泛指运动名词，Je ne fais pas de vélo 可使用 de；但 jouer à 的活动结构通常保留介词与冠词，例如 Je ne joue pas au football。表达比较偏好还可以使用 préférer X à Y。',
 'Je ne fais pas de vélo / Je ne joue pas au football / préférer X à Y',[
 e('Je ne fais pas de vélo en hiver.','冬天我不骑自行车。','常规否定不定活动名词时可使用 de vélo。'),
 e('Elle ne joue pas aux échecs.','她不下国际象棋。','jouer à + les 保留缩合 aux，不写 de échecs。'),
 e('Je préfère la natation au football.','比起足球，我更喜欢游泳。','préférer X à Y，au = à + le。')
 ],'不能因为看见 ne…pas 就把所有介词都换成 de；要先判断谓语本身要求 faire de 还是 jouer à。')
 ],
 questions:[
 {question:'表达“我喜欢音乐”应写 J’aime musique 还是 J’aime la musique？',answer:'J’aime la musique.',why:'泛指喜欢某类事物时通常使用定冠词，musique 是阴性名词。'},
 {question:'填空：Nous faisons ___ natation. / Ils jouent ___ football.',answer:'de la ; au',why:'faire de la natation 与 jouer au football 使用不同动词搭配。'},
 {question:'填空：Elle joue ___ guitare ; il joue ___ piano.',answer:'de la ; du',why:'两者都是 jouer de 表乐器，guitare 阴性、piano 阳性。'},
 {question:'把 Je fais du vélo en hiver. 改为一般否定。',answer:'Je ne fais pas de vélo en hiver.',why:'ne…pas 包围 fais；否定泛指运动活动时通常使用 de vélo。'}
 ],
 output:'写至少八句法语介绍你和两位朋友的兴趣：泛指喜好、一个不喜欢的活动、两项运动、一个乐器、周末去处和一项比较偏好；每句应能判断对应的介词和冠词。',
 model:[
 e('J’aime le cinéma et la musique.','我喜欢电影和音乐。','泛指两类活动，使用定冠词。'),
 e('Le samedi, je fais du vélo avec ma sœur.','星期六我和姐姐骑自行车。','faire du vélo。'),
 e('Elle préfère la natation au football.','比起足球，她更喜欢游泳。','préférer X à Y。'),
 e('Mon ami Paul joue au tennis.','我的朋友保罗打网球。','运动用 jouer à。'),
 e('Il joue aussi du piano.','他也弹钢琴。','乐器改用 jouer de。'),
 e('Moi, je ne joue pas aux échecs.','我不下国际象棋。','否定 jouer aux。'),
 e('Je déteste attendre longtemps, alors je réserve mes places.','我讨厌等很久，所以会预订座位。','détester + 不定式，带原因后果。'),
 e('Le dimanche, nous allons au cinéma ensemble.','星期天我们一起去电影院。','aller au cinéma，形成连贯周末安排。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/','https://www.laits.utexas.edu/tex/gr/pre2.html'],
 sourceNote:'fr-a1-u07 原 syllabus 主题为 Goûts et loisirs，涉及 aimer/faire/aller 和缩合冠词。本教材全部例句原创，不复制课本段落。'
}];