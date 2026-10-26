import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_A1_FIRST_RECEPTION} from '../src/frA1FirstReception';
import {linkedSpecialties} from '../src/specialtyLibrary';
import {projectSourceErrata,SOURCE_ERRATA} from '../src/editorialCorrections';
import {learnerFacingText} from '../src/lessonPresentationText';
it('provides all four missing A1 readings and reuses the already-authored country grammar',()=>{
 expect(Object.keys(FR_A1_FIRST_RECEPTION)).toEqual(['fr-a1-u01','fr-a1-u02','fr-a1-u03','fr-a1-u04']);
 for(const id of Object.keys(FR_A1_FIRST_RECEPTION)){
  expect(linkedSpecialties('grammar',id).length).toBeGreaterThanOrEqual(1);
  expect(linkedSpecialties('vocabulary',id).length).toBeGreaterThanOrEqual(1);
 }
 const country=linkedSpecialties('grammar','fr-a1-u02');
 expect(country.map(t=>t.id)).toContain('fr-a1-countries-languages-grammar');
 expect(country[0].sections.flatMap(s=>s.examples).map(e=>e.target)).not.toContain('Nora est néo-zélandaise.');
 expect(country[0].sections.flatMap(s=>s.examples).map(e=>e.target)).toContain('Lucie est française.');
});
it('keeps original people, ages, places and object locations distinct',()=>{
 const u=FR_A1_FIRST_RECEPTION;
 expect(u['fr-a1-u01'].questions[1].answer).toContain('Deux personnes');
 expect(u['fr-a1-u02'].paragraphs[0].zh).toContain('没有据此确定她的国籍');
 expect(u['fr-a1-u02'].questions[3].answer).toBe('Français et anglais. / 法语和英语。');
 expect(u['fr-a1-u03'].questions[0].answer).toContain('dix-neuf');
 expect(u['fr-a1-u03'].questions[3].answer).toContain('Non');
 expect(u['fr-a1-u03'].paragraphs[0].zh).toContain('不擅自译成哥哥或弟弟');
 expect(u['fr-a1-u04'].questions[1].answer).toContain('sous la chaise');
 expect(u['fr-a1-u04'].questions[0].answer).toContain('Trois');
});
it('corrects literal known source errata in the learner projection without modifying raw text',()=>{
 const raw=readFileSync('public/learning-assets/fr-a1-u03.txt','utf8');
 for(const e of SOURCE_ERRATA){
  expect(raw.includes(e.from),e.id+' source match').toBe(true);
  expect(projectSourceErrata(raw)).not.toContain(e.from);
  expect(projectSourceErrata(raw)).toContain(e.to);
 }
 const display=learnerFacingText(raw);
 expect(display).toContain('第二个音节');
 expect(display).toContain("Je ___ pas de frère. 答案：n'ai");
 expect(readFileSync('public/learning-assets/fr-a1-u03.txt','utf8')).toBe(raw);
 expect(projectSourceErrata('Je ne sais pas.')).toBe('Je ne sais pas.');
});
