import type {ReceptionLesson} from './receptionLessons';
/** Original beginner readings elaborating the exact existing A1 routine and directions lesson scenarios. */
export const FR_A1_ROUTINES_DIRECTIONS:Record<string,ReceptionLesson>={
'fr-a1-u05':{
title:'Une journée à la bibliothèque',language:'fr',genre:'A1 日常作息 · 原创双语阅读',
paragraphs:[
{id:'P1',target:"Je m’appelle Lucie et je travaille dans une bibliothèque. Du lundi au vendredi, je commence à neuf heures. Le matin, je prépare les salles et je regarde le programme de la journée. Une collègue travaille avec moi. Elle arrive un peu avant neuf heures et elle ouvre les fenêtres. Nous parlons souvent des livres que les étudiants veulent lire. J’aime mon travail parce que je rencontre des personnes différentes.",zh:'我叫露西，在一家图书馆工作。周一到周五，我上午九点开始上班。早上我整理阅览室并查看当天的安排。一位女同事和我一起工作，她会在九点前稍早到达，打开窗户。我们经常讨论学生想读的书。我喜欢这份工作，因为能够遇见不同的人。'},
{id:'P2',target:"À midi, je mange avec ma collègue. Nous prenons une petite pause et nous parlons de nos livres préférés. Elle aime les romans, mais je préfère les livres de voyage. Après le déjeuner, nous retournons à la bibliothèque. L’après-midi, nous préparons les tables pour les étudiants et nous rangeons les livres. Nous n’étudions pas ensemble pendant le travail : nous préparons les espaces pour les autres.",zh:'中午十二点，我和同事一起吃午饭。我们短暂休息，聊聊最喜欢的书。她喜欢小说，我更喜欢旅行书。饭后我们回到图书馆。下午，我们为学生整理桌椅并把书摆放整齐。工作时间我们不是一起学习，而是在为其他使用者准备学习空间。'},
{id:'P3',target:"Le soir, je rentre chez moi et j’étudie le français. Je prépare mon cahier, je lis quelques phrases et je répète les mots importants. Chaque jour, je travaille un peu sur la grammaire. Parfois, j’appelle une amie pour pratiquer une courte conversation. Elle parle lentement et elle corrige mes erreurs. Je n’étudie pas toute la nuit, car je commence le travail à neuf heures le lendemain matin.",zh:'晚上我回家学习法语。我准备好笔记本，读几句短文并重复重要单词。每天我都会花一些时间学习语法。有时我给朋友打电话，练习简单的对话。她说得很慢，也会纠正我的错误。我不会整夜学习，因为第二天早上九点还要开始工作。'},
{id:'P4',target:"Le vendredi, je termine plus tôt. Après le travail, je marche dans le parc près de la bibliothèque. Je regarde les arbres et je profite du calme. Le samedi, je ne travaille pas à la bibliothèque. Je peux alors revoir les notes de français de la semaine. Mon programme est simple : le matin, je travaille à neuf heures ; à midi, je déjeune ; le soir, j’étudie. Mais le vendredi, je finis plus tôt.",zh:'星期五我下班更早。工作结束后，我去图书馆附近的公园散步，看看树木，享受安静。星期六我不在图书馆工作，可以复习这一周的法语笔记。我的安排很简单：上午九点上班，中午吃饭，晚上学法语。但星期五我会早些结束工作。'}
],
questions:[
{prompt:'À quelle heure Lucie commence-t-elle à travailler ? / 露西几点开始上班？',answer:'À neuf heures. / 上午九点。',evidence:['P1'],why:'P1 明确工作从上午九点开始；同事稍早到达不改变 Lucie 的上班时刻。'},
{prompt:'Que font Lucie et sa collègue après le déjeuner ? / 午饭后，露西和同事做什么？',answer:'Elles préparent les tables et rangent les livres. / 她们为学生整理桌子并摆放书籍。',evidence:['P2'],why:'P2 将中午午餐与下午为学生整理桌子、书籍区分，后者才是饭后的工作。'},
{prompt:'Où Lucie étudie-t-elle le français ? / 露西在哪里学习法语？',answer:'Chez elle, le soir. / 在家里，晚上学习。',evidence:['P3'],why:'P3 明示回家后在晚上学法语，不是把图书馆里的工作时间称为个人学习时间。'},
{prompt:'Quel jour termine-t-elle plus tôt et que fait-elle ? / 她哪一天较早结束工作，之后做什么？',answer:'Le vendredi, elle termine plus tôt et marche dans le parc. / 星期五；她提前下班，去公园散步。',evidence:['P4'],why:'P4 把周五提前下班与之后去公园散步连起来，不代表她每天都提前结束工作。'}
],
languageNotes:[
{target:'je travaille / nous travaillons / ils travaillent',zh:'-er 动词按主语选择现在时词尾；复数词尾书写与实际发音不总相同。'},
{target:'à neuf heures / à midi / le soir',zh:'九点是工作开始时刻，中午是午餐，晚上是学习；不能把活动时间互换。'},
{target:'le vendredi / vendredi',zh:'le vendredi 更常表达每周五的习惯；在特定上下文 vendredi 可指某个星期五。'}
],
task:'按早晨、中午、下午、晚上和星期五的顺序用 8–10 句法语概述图书馆工作人员的生活，标注两个 -er 动词变位并配中文对照。',
model:'Lucie travaille dans une bibliothèque. Elle commence à neuf heures du lundi au vendredi. Le matin, elle prépare les salles. À midi, elle mange avec une collègue. Elles parlent de leurs livres préférés. L’après-midi, elles préparent les tables pour les étudiants. Le soir, Lucie étudie le français chez elle. Elle lit des phrases et répète des mots. Le vendredi, elle termine plus tôt et marche dans un parc. Le samedi, elle peut revoir ses notes de français.',
modelZh:'露西在图书馆工作。周一到周五她九点开始上班，上午整理阅览室。中午她和同事一起吃饭，讨论喜欢的书。下午她们为学生整理桌子。晚上露西在家学法语，读短句并复习单词。星期五她提前结束工作，去公园散步。星期六她可以复习法语笔记。',
references:['https://www.laits.utexas.edu/tex/gr/vir1.html']
},
'fr-a1-u09':{
title:'De la gare à la bibliothèque',language:'fr',genre:'A1 问路和指令 · 原创双语阅读',
paragraphs:[
{id:'P1',target:"Nora arrive à la gare avec une amie. Elle veut aller à la bibliothèque pour étudier le français, mais elle ne connaît pas le quartier. Elle regarde son téléphone et ne trouve pas l’entrée de la bibliothèque. Une personne lui dit : « La bibliothèque est près de la gare. Sortez de la gare et allez tout droit. » Nora remercie cette personne et sort avec son amie. Elles commencent à marcher dans la rue principale.",zh:'诺拉和朋友来到车站。她想去图书馆学习法语，却不熟悉附近街区。她查看手机，没有找到图书馆入口。一位路人告诉她：“图书馆就在车站附近。先出站，然后一直向前走。”诺拉道谢后与朋友一起走出车站，沿主街开始步行。'},
{id:'P2',target:"Au premier feu, elles s’arrêtent. L’amie de Nora demande : « Nous tournons à droite ici ? » Nora relit les indications et répond : « Non. Au premier feu, tournez à gauche. » Elles tournent donc à gauche et traversent une petite place. Elles marchent lentement parce qu’il y a des piétons et des vélos. Nora regarde les bâtiments pour vérifier qu’elles suivent bien le chemin indiqué.",zh:'到了第一个交通灯，两人停了下来。诺拉的朋友问：“我们在这里右转吗？”诺拉重新看指路说明，回答：“不是，在第一个交通灯应该左转。”因此她们向左转，穿过一座小广场。因为有行人和自行车，她们走得慢一些。诺拉一边看周围建筑，一边确认方向没有走错。'},
{id:'P3',target:"Après la place, elles voient un musée. Nora se souvient que la bibliothèque est en face du musée. Elle regarde de l’autre côté de la rue et trouve le bâtiment. L’entrée de la bibliothèque se situe entre une pharmacie et un café. Elle montre les deux commerces à son amie : « Regarde, la pharmacie est ici et le café est juste à côté. L’entrée est entre les deux. » Cette fois, elles savent où aller.",zh:'穿过广场后，两人看到一座博物馆。诺拉记得图书馆就在博物馆对面。她望向街道另一侧，发现了目标建筑。图书馆入口位于一家药房和一家咖啡馆之间。她指给朋友看：“你看，药房在这里，旁边就是咖啡馆。入口就在两者中间。”这一次她们确定了正确位置。'},
{id:'P4',target:"À pied, le trajet depuis la gare prend environ dix minutes. Nora et son amie arrivent devant la bibliothèque. Nora résume le chemin pour le retenir : « Sortez de la gare, allez tout droit, tournez à gauche au premier feu, puis traversez la petite place. La bibliothèque est en face du musée. » Son amie ajoute : « Et son entrée est entre la pharmacie et le café. » Elles entrent dans la bibliothèque et commencent à étudier.",zh:'从车站步行到图书馆大约需要十分钟。诺拉和朋友到达门前。为了记住路线，诺拉把说明重述一遍：“走出车站，一直走，在第一个交通灯左转，然后穿过小广场。图书馆就在博物馆对面。”她的朋友补充：“入口在药房与咖啡馆之间。”两人走进图书馆，开始学习。'}
],
questions:[
{prompt:'Que faut-il faire immédiatement après la sortie de la gare ? / 从火车站出来后应该立刻做什么？',answer:'Allez tout droit. / 一直向前走。',evidence:['P1'],why:'P1 要求出站后直走，左转应发生在第一个红绿灯处，不能把这两个动作颠倒。'},
{prompt:'Où faut-il tourner à gauche ? / 在哪里左转？',answer:'Au premier feu. / 在第一个交通灯处。',evidence:['P2'],why:'P2 明确在第一个交通灯左转，朋友误问右转被纠正，方向不可互换。'},
{prompt:'Où se trouve la bibliothèque par rapport au musée ? / 图书馆相对博物馆在哪里？',answer:'Elle est en face du musée. / 图书馆位于博物馆正对面。',evidence:['P3'],why:'P3 使用 en face de 表正对面，不能改为在博物馆内部或紧邻同一侧。'},
{prompt:'Quelles boutiques entourent l’entrée et combien de temps prend le trajet ? / 入口位于哪两家店铺之间？从车站步行大约需要多久？',answer:'Une pharmacie et un café ; environ dix minutes à pied. / 在药房和咖啡馆之间；步行大约十分钟。',evidence:['P3','P4'],why:'P3 给出入口两边的药房和咖啡馆，P4 明示从车站步行大约十分钟。'}
],
languageNotes:[
{target:'Sortez / allez / tournez / traversez',zh:'vous 命令式不保留主语 vous，用于向不熟悉的人提供礼貌路线指示。'},
{target:'au premier feu / à gauche / tout droit',zh:'au = à + le；在第一个交通灯处向左转，此前要直行。'},
{target:'en face du musée / entre une pharmacie et un café',zh:'en face de 表对面；entre…et… 表两者之间，du=de+le。'}
],
task:'用 8–10 句法语给朋友解释从车站步行到图书馆的路线，依次使用 allez tout droit、tournez à gauche、traversez、en face、entre，并附中文。',
model:'Sortez de la gare. Allez tout droit dans la rue principale. Arrêtez-vous au premier feu. Tournez à gauche à ce feu. Continuez à pied et traversez la petite place. Vous verrez un musée. La bibliothèque est en face du musée. Son entrée est entre une pharmacie et un café. Le trajet prend environ dix minutes à pied. Entrez dans la bibliothèque pour commencer votre séance de travail.',
modelZh:'走出车站，在主街一直向前。到第一个红绿灯处停下来并向左转。继续步行，穿过小广场。随后会看到一座博物馆。图书馆位于博物馆对面，入口在一家药房和一家咖啡馆之间。从车站步行约十分钟。进入图书馆后就可以开始学习。',
references:['https://www.laits.utexas.edu/tex/gr/imp1.html']
}
};