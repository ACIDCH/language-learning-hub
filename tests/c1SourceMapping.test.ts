import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_C1_SOURCE_RECEPTION} from '../src/frC1SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
it('keeps seven C1 original sources exact and retains the existing media lesson',()=>{
 expect(Object.keys(FR_C1_SOURCE_RECEPTION).sort()).toEqual(['01','02','03','04','05','06','08'].map(n=>'fr-c1-u'+n));
 for(const [id,r] of Object.entries(FR_C1_SOURCE_RECEPTION)){
  const d=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  expect(r.paragraphs[0].target).toBe(d.reading);expect(r.model).toBe(d.reading);expect(RECEPTION_LESSONS[id]).toBe(r);
 }
 expect(FR_C1_SOURCE_RECEPTION['fr-c1-u07']).toBeUndefined();
 expect(RECEPTION_LESSONS['fr-c1-u07'].paragraphs[3].target).toContain('Si le bilan avait distingué');
});
it('preserves methodological, normative and referential limits',()=>{
 const text=(n:string)=>FR_C1_SOURCE_RECEPTION['fr-c1-u'+n].paragraphs.map(p=>p.target).join(' ');
 expect(text('01')).toContain('ni nombre d’entretiens'.replace('’',"'"));
 expect(text('02')).toContain('prémisse normative');
 expect(text('03')).toContain('ne fournit aucun chiffre manquant');
 expect(text('04')).toContain('ne précise pas le mois');
 expect(text('05')).toContain('pas du compte rendu');
 expect(text('06')).toContain('deux bâtiments seulement');
 expect(text('06')).toContain('ni aucune durée de suivi');
 expect(text('08')).toContain('ayant consulté les usagers, la décision est prise');
});
