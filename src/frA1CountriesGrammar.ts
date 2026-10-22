import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
export const FR_A1_COUNTRIES_GRAMMAR:SpecialtyLesson[]=[{
id:'fr-a1-countries-languages-grammar',type:'grammar',language:'fr',level:'A1',unitLink:'fr-a1-u02',
title:'国家、城市与语言：habiter、venir、parler、apprendre',subtitle:'准确区分住在哪里、来自哪里、说什么语言与国籍性数',
prerequisite:'会使用 être 现在时、je/tu/il/elle，认识法国、加拿大和新西兰几个例子。',
objective:'使用 habiter à/en/au/aux、venir de/du/des 和国家国籍形容词正确介绍 Nora、Paul 等人物，并区分 parler français 和 apprendre le français。',
sections:[
s('01 城市和国家：同样是居住却有不同介词','habiter à + 城市（à Auckland、à Toulouse）；en 多用于阴性国家或以元音开头的国名；au 多用于辅音开头的阳性单数国家；aux 用于复数国家。初学规则须保留 en Iran 等元音开头阳性国名例外，而不是简单把 en 解释成只跟阴性。',
'habiter à Auckland / en France / au Canada / aux États-Unis',[
e('Nora habite à Auckland.','诺拉住在奥克兰。','城市名通常用 à。'),
e('Paul habite en France, à Toulouse.','保罗住在法国图卢兹。','国家与城市信息同时成立。'),
e('Il habite au Canada.','他住在加拿大。','Canada 阳性辅音开头，用 au。')
],'不能写 à Canada 表示国家居住地；à + le 缩合的 au 与城市 à 用法不同。',
{title:'地方介词',columns:['类别','正确形式','例子'],rows:[['城市','à','à Auckland'],['阴性国家','en','en France'],['阳性单数国家','au','au Canada'],['复数国家','aux','aux États-Unis']],note:'元音开头的某些阳性单数国名也用 en，如 en Iran；请与具体国名一并学习。'}),
s('02 居住与来源：habiter 和 venir de 不互换','住在某地与来自某地可能不同：Liam vient de Wellington, mais il habite à Lyon。venir de 的 de 与冠词缩合，形成 du Canada、des États-Unis；来自法国常为 de France，不能把 en France 直接移到 venir 后。',
'habiter en France / venir de France / venir du Canada / venir des États-Unis',[
e('Liam vient de Wellington.','利亚姆来自惠灵顿。','venir de + 城市。'),
e('Il habite maintenant à Lyon.','他现在住在里昂。','现在居住地不等于来源地。'),
e('Elle vient du Canada.','她来自加拿大。','de + le Canada 缩合为 du。')
],'venir en France 在特定语境可意为“来到法国”，但表达“来自法国”通常应说 venir de France；方向不同。'),
s('03 国籍形容词的性数与大小写','être + 国籍形容词时，形容词根据主语性数变化并常用小写：il est français / elle est française；复数 il(s) sont canadiens、elles sont canadiennes。国籍作为指人的名词时大写用法不同：un Français；语言名 français 小写。',
'il est français / elle est française / je parle français',[
e('Nora est néo-zélandaise.','诺拉是新西兰人（女性）。','女形容词应与主语配合。'),
e('Paul est français.','保罗是法国人。','男形容词 français 保留。'),
e('Elle est canadienne et elle parle français.','她是加拿大人，并且说法语。','身份形容词与语言名称角色不同。')
],'不要把 Je suis France 当成国籍介绍，也不要随意把语言名写成 Français 来替代形容词。',
{title:'国籍与语言',columns:['用途','正确形式','注意'],rows:[['男性国籍','il est canadien','形容词小写'],['女性国籍','elle est canadienne','常加 -ne'],['语言','elle parle français','语言名小写'],['人的名词','un Canadien','作为名词大写']],note:'国籍名词和形容词是两种语法角色，大小写并非随意。'}),
s('04 parler 与 apprendre：常用语言搭配不同','本课程优先说 Je parle français / Je parle anglais 来表达会说某种语言；说正在学习则用 J’apprends le français。parler 是 -er 规则动词，apprendre 常用现在时 j’apprends、nous apprenons 需单独掌握。un peu / surtout 标示程度，不能改写为精通。',
'je parle anglais / j’apprends le français / je parle un peu français',[
e('Je parle anglais et chinois.','我说英语和中文。','parler + 无修饰语言名。'),
e('J’apprends le français en ce moment.','我现在正在学习法语。','apprendre le français 使用冠词。'),
e('Je parle un peu français.','我会说一点法语。','un peu 不等于流利掌握。')
],'parler le français 有特殊语境，不适合作初学无修饰的默认搭配；不要将“正在学”误解成“已经精通”。')
],
questions:[
{question:'国家与城市都写出：Paul habite ___ France, ___ Toulouse.',answer:'en ; à',why:'France 国家用 en，Toulouse 城市用 à；两个介词对应不同地点类别。'},
{question:'“我来自加拿大”应该用 venir 什么介词？',answer:'Je viens du Canada.',why:'来自用 venir de；de + le Canada 缩合成 du，与居住 au Canada 不同。'},
{question:'改错：Elle est canadien. / Je suis France.',answer:'Elle est canadienne. / Je suis français ou française.',why:'国籍形容词需与主语性数配合，表达身份不用直接说 suis + 国家名。'},
{question:'如何分别说“我会说法语”和“我正在学法语”？',answer:'Je parle français. / J’apprends le français.',why:'parler 表语言能力且默认不加定冠词；apprendre 在这里接 le français。'}
],
output:'写八句法语介绍三个学生目前居住地、原籍、国籍和学习的语言，结合 Auckland、Wellington、Lyon、Toulouse，逐句中文对照并正确处理来源和居住地。',
model:[
e('Nora habite à Auckland.','诺拉住在奥克兰。','城市用 à。'),
e('Elle est étudiante en Nouvelle-Zélande.','她在新西兰读书。','国家用 en。'),
e('Elle parle anglais et chinois.','她说英语和中文。','语言搭配。'),
e('En ce moment, elle apprend le français.','她现在正在学法语。','学习与会说的区别。'),
e('Paul habite en France, à Toulouse.','保罗住在法国图卢兹。','国家+城市。'),
e('Il parle français et anglais.','他会说法语和英语。','原稿语言信息。'),
e('Liam vient de Wellington, mais habite à Lyon.','利亚姆来自惠灵顿，现在住里昂。','来源和居住不同。'),
e('Il est néo-zélandais et il apprend le français.','他是新西兰人，并在学法语。','国籍性数与语言学习。')
],
referenceUrls:['https://www.laits.utexas.edu/tex/gr/pre1a.html','https://www.laits.utexas.edu/tex/gr/det3.html'],
sourceNote:'依照 public/learning-assets/fr-a1-u02.txt 中 Nora/Auckland、Paul/Toulouse、Liam/Wellington/Lyon 等原课事实原创编写，并保留介词与国籍区别。'
}];