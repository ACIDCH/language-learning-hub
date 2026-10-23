import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_A2_SOURCE_RECEPTION} from '../src/frA2SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
describe('A2 preserved sources and connected extensions',()=>{
 it('retains the exact original reading and model for all ten missing lessons',()=>{
  expect(Object.keys(FR_A2_SOURCE_RECEPTION).sort()).toEqual(['01','02','04','06','07','08','09','10','11','12'].map(n=>'fr-a2-u'+n));
  for(const [id,lesson] of Object.entries(FR_A2_SOURCE_RECEPTION)){
   const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
   expect(lesson.paragraphs[0].target).toBe(source.reading);
   expect(lesson.model).toBe(source.reading);
   expect(RECEPTION_LESSONS[id]).toBe(lesson);
   expect(lesson.questions[0].answer).toContain(source.questions[0].answer);
  }
  expect(FR_A2_SOURCE_RECEPTION['fr-a2-u03']).toBeUndefined();
  expect(FR_A2_SOURCE_RECEPTION['fr-a2-u05']).toBeUndefined();
  expect(RECEPTION_LESSONS['fr-a2-u03']).toBeDefined();
  expect(RECEPTION_LESSONS['fr-a2-u05']).toBeDefined();
 });
 it('preserves price arithmetic, conditional invitations and unconfirmed public plans',()=>{
  const all=(n:string)=>FR_A2_SOURCE_RECEPTION['fr-a2-u'+n].paragraphs.map(p=>p.target).join(' ');
  expect(all('06')).toContain('Soixante moins quarante-cinq fait quinze');
  expect(all('06')).toContain('Le récit ne donne pas la réponse');
  expect(all('07')).toContain("pas encore une confirmation");
  expect(all('08')).toContain("aucun résultat à présenter");
  expect(all('09')).toContain('Il ne promet pas un délai précis');
  expect(all('11')).toContain("aucune répartition n'est décidée");
  expect(all('11')).toContain('mardi à dix-neuf heures');
 });
 it('explains pronouns by syntactic function and avoids claiming private-source equivalence',()=>{
  expect(FR_A2_SOURCE_RECEPTION['fr-a2-u04'].paragraphs[2].target).toContain('voir se construit sans à');
  expect(FR_A2_SOURCE_RECEPTION['fr-a2-u12'].paragraphs[2].target).toContain('sa fonction');
  for(const lesson of Object.values(FR_A2_SOURCE_RECEPTION)) expect(lesson.references).toEqual([]);
 });
});
