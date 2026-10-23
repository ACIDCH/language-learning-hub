import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_B1_SOURCE_RECEPTION} from '../src/frB1SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
describe('B1 source and evidence continuity',()=>{
 it('registers ten distinct continuations without modifying the original paragraph or model',()=>{
  expect(Object.keys(FR_B1_SOURCE_RECEPTION).sort()).toEqual(Array.from({length:10},(_,i)=>'fr-b1-u'+String(i+1).padStart(2,'0')));
  for(const [id,r] of Object.entries(FR_B1_SOURCE_RECEPTION)){
   const d=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
   expect(r.paragraphs[0].target).toBe(d.reading);expect(r.model).toBe(d.reading);
   expect(RECEPTION_LESSONS[id]).toBe(r);
   expect(r.questions[0].answer).toContain(d.questions[0].answer);
   expect(r.references).toEqual([]);
  }
 });
 it('keeps proposals, private observations and unknown causes separate from confirmed outcomes',()=>{
  const text=(n:string)=>FR_B1_SOURCE_RECEPTION['fr-b1-u'+n].paragraphs.map(p=>p.target).join(' ');
  expect(text('01')).toContain('pas annoncer un remboursement');
  expect(text('02')).toContain("pas le montant des ventes");
  expect(text('03')).toContain('une séance par mois');
  expect(text('04')).toContain("pas une obligation");
  expect(text('05')).toContain('plusieurs confirmations indépendantes');
  expect(text('06')).toContain('pas des résultats mesurés');
  expect(text('07')).toContain('aucun tableau chiffré');
  expect(text('08')).toContain("pas d'une règle pour tous");
  expect(text('09')).toContain('ni que tous les parents ont accepté');
  expect(text('10')).toContain('une proposition en accord imaginaire');
 });
});
