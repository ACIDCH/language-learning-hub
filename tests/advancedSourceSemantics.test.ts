import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {RECEPTION_LESSONS} from '../src/receptionLessons';

/** Source-grounded teaching QA: each row encodes one manually compared French fact
 * and its required Chinese reading. These tests guard regressions, not independent
 * human certification. Exceptional B2 U03 / C1 U07 / C2 U03 use different
 * curated source exercises and have separate source-mapping tests. */
const examined=[
 ['fr-b1-u01','avait pourtant vérifié','前一天'],
 ['fr-b1-u02','bruit permanent des voitures','汽车噪声'],
 ['fr-b1-u03','Sans financement supplémentaire','没有额外资金'],
 ['fr-b1-u04',"Cette dernière recommandation n'est pas une obligation",'不是强制'],
 ['fr-b1-u05','fermeture définitive du marché','永久关闭'],
 ['fr-b1-u06','mardi après-midi pendant un mois','周二下午'],
 ['fr-b1-u07','Je ne connais pas toutes les causes','不知道变化的全部原因'],
 ['fr-b1-u08','Mon frère vit cette expérience autrement','兄弟以不同方式'],
 ['fr-b1-u09','une route reste dangereuse','一条路危险'],
 ['fr-b1-u10','Je ne peux pas confirmer','不能确认'],
 ['fr-b2-u01','sans être pour autant équitable par nature','不天然公平'],
 ['fr-b2-u02',"temps consacré à l'accompagnement",'辅导时间'],
 ['fr-b2-u04','aurait pu réduire ce risque','可能降低风险'],
 ['fr-b2-u05',"Le vent, l'humidité",'风、湿度'],
 ['fr-b2-u06','reportée au 18 novembre','十一月十八日'],
 ['fr-b2-u07','pas seulement compter les entrées','不只数入场次数'],
 ['fr-b2-u08','Ces poids traduisent','权重'],
 ['fr-b2-u09','les tests restent incertains','测试仍不确定'],
 ['fr-b2-u10','une proposition du second document','第二份'],
 ['fr-c1-u01','formulaire devenu moins accessible','表单更难使用'],
 ['fr-c1-u02','un débat sans échéance','无期限讨论'],
 ['fr-c1-u03','enquête municipale fictive','虚构市政调查'],
 ['fr-c1-u04','avant le 12','十二日'],
 ['fr-c1-u05',"La conservation d'une cheminée",'保存烟囱'],
 ['fr-c1-u06','deux bâtiments seulement','两栋楼'],
 ['fr-c1-u08',"l'équipe a interrogé les usagers",'团队询问用户'],
 ['fr-c2-u01','on ne saurait accepter','on ne saurait accepter'],
 ['fr-c2-u02','association ajustée','经调整的相关'],
 ['fr-c2-u04','elle rentrera en voiture','开车回家'],
 ['fr-c2-u05','première livraison','首批交付'],
 ['fr-c2-u06','Les deux notices fictives','虚构说明'],
 ['fr-c2-u07','bien que personne ne fût attendu','虚拟式未完成时'],
 ['fr-c2-u08','un tableau fictif','虚构表']
] as const;

describe('B1-C2 manually selected French-to-Chinese source invariants',()=>{
 it('audits 33 distinct source-grounded French units with written bilingual anchors',()=>{
  expect(new Set(examined.map(([id])=>id)).size).toBe(33);
  for(const [id,sourceFact,chineseFact] of examined){
   const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
   const lesson=RECEPTION_LESSONS[id];
   expect(source.reading,id+' original source').toContain(sourceFact);
   expect(lesson,id+' complete reading').toBeDefined();
   expect(lesson.paragraphs[0].id,id).toBe('P1');
   expect(lesson.paragraphs[0].target,id+' source fidelity').toBe(source.reading);
   expect(lesson.paragraphs[0].zh,id+' Chinese counterpart').toContain(chineseFact);
   expect(lesson.model,id+' original model preserved').toBe(source.reading);
   expect(lesson.modelZh,id+' Chinese model correspondence').toBe(lesson.paragraphs[0].zh);
   expect(lesson.questions.some(q=>q.evidence.includes('P1')),id+' direct evidence question').toBe(true);
   expect(lesson.paragraphs.length,id+' connected reading').toBe(4);
   expect(lesson.paragraphs.every(p=>p.zh.length>80&&p.target.length>100),id+' bilingual nonempty').toBe(true);
  }
 });
 it('retains four-stage critical reading without pretending 33 units gained independent approval',()=>{
  for(const [id] of examined){
   const unit=RECEPTION_LESSONS[id];
   expect(unit.questions.length,id).toBeGreaterThanOrEqual(4);
   expect(unit.questions.every(q=>q.evidence.every(ref=>unit.paragraphs.some(p=>p.id===ref))),id).toBe(true);
   expect(unit.references,id).toEqual([]);
  }
 });
 it('IELTS Upgrade U07 explains two chronological consultations without fabricating prior dates',()=>{
  const unit=RECEPTION_LESSONS['en-ielts-language-upgrade-u07'];
  expect(unit.paragraphs[0].target).toContain('after the planning team revised the proposal');
  expect(unit.paragraphs[0].target).toContain('earlier consultation');
  expect(unit.paragraphs[2].zh).toContain('两个不同时间点');
  expect(unit.languageNotes.some(note=>note.zh.includes('早先咨询的细节'))).toBe(true);
 });
});
