import {speakIpaText} from './IpaText';
type Phoneme={symbol:string;example:string;hint:string};
type Group={name:string;items:Phoneme[]};
const EN:Group[]=[
 {name:'单元音、弱读与卷舌元音（以美式读音为主）',items:[
  {symbol:'i',example:'see',hint:'长而紧的高前元音'},
  {symbol:'ɪ',example:'sit',hint:'较松的短元音；与 i 对照'},
  {symbol:'ɛ',example:'bed',hint:'中前元音'},
  {symbol:'æ',example:'cat',hint:'较开口的前元音'},
  {symbol:'ɑ',example:'father',hint:'开后元音'},
  {symbol:'ɔ',example:'thought',hint:'圆唇后元音，部分美式口音与 ɑ 合并'},
  {symbol:'ʊ',example:'book',hint:'短、较松的后元音'},
  {symbol:'u',example:'food',hint:'高后圆唇元音'},
  {symbol:'ʌ',example:'cup',hint:'央后部的开中元音'},
  {symbol:'ə',example:'about',hint:'非重读弱央元音'},
  {symbol:'ɝ',example:'bird',hint:'美式重读卷舌元音'},
  {symbol:'ɚ',example:'teacher',hint:'美式非重读卷舌元音'}]},
 {name:'常见双元音',items:[
  {symbol:'eɪ',example:'day',hint:'从 e 向 ɪ 滑动'},
  {symbol:'oʊ',example:'go',hint:'从 o 向 ʊ 滑动'},
  {symbol:'aɪ',example:'my',hint:'从开元音向 ɪ 滑动'},
  {symbol:'aʊ',example:'now',hint:'从开元音向 ʊ 滑动'},
  {symbol:'ɔɪ',example:'boy',hint:'圆唇元音向 ɪ 滑动'}]},
 {name:'常见辅音',items:[
  {symbol:'p',example:'pen',hint:'清双唇塞音'},{symbol:'b',example:'book',hint:'浊双唇塞音'},
  {symbol:'t',example:'tea',hint:'清齿龈塞音'},{symbol:'d',example:'day',hint:'浊齿龈塞音'},
  {symbol:'k',example:'cat',hint:'清软腭塞音'},{symbol:'ɡ',example:'go',hint:'浊软腭塞音'},
  {symbol:'f',example:'fine',hint:'清唇齿擦音'},{symbol:'v',example:'very',hint:'浊唇齿擦音'},
  {symbol:'θ',example:'thin',hint:'清齿擦音，舌尖轻触门齿'},
  {symbol:'ð',example:'this',hint:'浊齿擦音，声带振动'},
  {symbol:'s',example:'see',hint:'清齿龈擦音'},{symbol:'z',example:'zoo',hint:'浊齿龈擦音'},
  {symbol:'ʃ',example:'she',hint:'清后齿龈擦音'},
  {symbol:'ʒ',example:'vision',hint:'浊后齿龈擦音'},
  {symbol:'h',example:'hat',hint:'声门擦音'},
  {symbol:'tʃ',example:'chair',hint:'清塞擦音'},
  {symbol:'dʒ',example:'job',hint:'浊塞擦音'},
  {symbol:'m',example:'man',hint:'双唇鼻音'},
  {symbol:'n',example:'name',hint:'齿龈鼻音'},
  {symbol:'ŋ',example:'sing',hint:'软腭鼻音，不在后面补读 g'},
  {symbol:'l',example:'light',hint:'舌侧音'},
  {symbol:'ɹ',example:'red',hint:'常见美式近音 r'},
  {symbol:'j',example:'yes',hint:'近音 y'},
  {symbol:'w',example:'we',hint:'圆唇近音'}]}
];
const FR:Group[]=[
 {name:'法语口元音',items:[
  {symbol:'i',example:'si',hint:'不圆唇，高前元音'},
  {symbol:'e',example:'été',hint:'闭中前元音'},
  {symbol:'ɛ',example:'mère',hint:'开中前元音'},
  {symbol:'a',example:'patte',hint:'开前/央元音'},
  {symbol:'ɑ',example:'pâte',hint:'传统区分，很多口音与 a 合并'},
  {symbol:'ɔ',example:'porte',hint:'开中后圆唇元音'},
  {symbol:'o',example:'eau',hint:'闭中后圆唇元音'},
  {symbol:'u',example:'tout',hint:'高后圆唇元音'},
  {symbol:'y',example:'tu',hint:'高前圆唇元音，与 u 不同'},
  {symbol:'ø',example:'deux',hint:'闭中前圆唇元音'},
  {symbol:'œ',example:'sœur',hint:'开中前圆唇元音'},
  {symbol:'ə',example:'le',hint:'弱化元音，口语可省略'}]},
 {name:'鼻化元音',items:[
  {symbol:'ɛ̃',example:'pain',hint:'常见鼻化元音，不要加末尾 n'},
  {symbol:'ɑ̃',example:'sans',hint:'较开口的鼻化元音'},
  {symbol:'ɔ̃',example:'bon',hint:'圆唇鼻化元音'},
  {symbol:'œ̃',example:'un',hint:'部分口音与 ɛ̃ 合并'}]},
 {name:'法语辅音与半元音',items:[
  {symbol:'p',example:'pas',hint:'清双唇塞音'},{symbol:'b',example:'bas',hint:'浊双唇塞音'},
  {symbol:'t',example:'tout',hint:'清齿龈/齿塞音'},{symbol:'d',example:'dos',hint:'浊齿塞音'},
  {symbol:'k',example:'quand',hint:'清软腭塞音'},{symbol:'ɡ',example:'gare',hint:'浊软腭塞音'},
  {symbol:'f',example:'fée',hint:'清唇齿擦音'},{symbol:'v',example:'vous',hint:'浊唇齿擦音'},
  {symbol:'s',example:'si',hint:'清擦音'},{symbol:'z',example:'zéro',hint:'浊擦音'},
  {symbol:'ʃ',example:'chat',hint:'清后齿龈擦音'},
  {symbol:'ʒ',example:'je',hint:'浊后齿龈擦音'},
  {symbol:'m',example:'ma',hint:'双唇鼻音'},{symbol:'n',example:'nous',hint:'齿龈鼻音'},
  {symbol:'ɲ',example:'montagne',hint:'腭鼻音，常见于 gn'},
  {symbol:'ŋ',example:'parking',hint:'常见于部分外来词'},
  {symbol:'l',example:'la',hint:'侧近音'},
  {symbol:'ʁ',example:'rue',hint:'常见小舌音 r'},
  {symbol:'j',example:'fille',hint:'半元音'},
  {symbol:'ɥ',example:'huit',hint:'前圆唇半元音'},
  {symbol:'w',example:'oui',hint:'后圆唇半元音'}]}
];
export default function IpaReference({language}:{language:string}){
 const isFrench=language.startsWith('fr');
 const groups=isFrench?FR:EN;
 return <details className="ipa-reference" aria-label={isFrench?'法语 IPA 音标体系':'英语 IPA 音标体系'}>
  <summary>{isFrench?'法语':'英语'} IPA 音标体系 · 点击示例词听标准设备朗读</summary>
  <p className="cloud-disclaimer">本表帮助建立「音标 → 发音位置 → 词中读法」的联系；
   播放按钮使用现有设备 TTS 播放<strong>示例词</strong>，不是让 TTS 猜读 IPA 符号。
   音标使用广义音位标记，不是每个口音和连读细节都完全一致。</p>
  {groups.map(group=><section key={group.name}>
   <h5>{group.name}</h5>
   <div className="ipa-reference-grid">
    {group.items.map(item=><article className="ipa-reference-item" key={item.symbol}>
     <strong className="ipa-reference-symbol">/{item.symbol}/</strong>
     <span>{item.hint}</span>
     <button type="button" onClick={()=>speakIpaText(item.example,isFrench?'fr-FR':'en-US',.8)}>
       <span lang={isFrench?'fr':'en'}>{item.example}</span> <small>试听</small>
     </button>
    </article>)}
   </div>
  </section>)}
  <p className="cloud-disclaimer">符号 <strong>ˈ</strong> 表示主重音，<strong>ˌ</strong> 表示次重音，
   <strong>ː</strong> 表示较长音；法语还要区分连诵（liaison）、省音以及语流中弱读的变化。
   IPA 词典读音、机器预测的音标和实际说话人的发音是三种不同的证据。</p>
 </details>;
}
