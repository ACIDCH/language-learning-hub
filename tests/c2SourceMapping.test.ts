import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_C2_SOURCE_RECEPTION} from '../src/frC2SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
it('preserves seven C2 original texts and leaves existing literary paragraph keys intact',()=>{
 expect(Object.keys(FR_C2_SOURCE_RECEPTION).sort()).toEqual(['01','02','04','05','06','07','08'].map(n=>'fr-c2-u'+n));
 for(const [id,r] of Object.entries(FR_C2_SOURCE_RECEPTION)){
  const d=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  expect(r.paragraphs[0].target).toBe(d.reading);expect(r.model).toBe(d.reading);expect(RECEPTION_LESSONS[id]).toBe(r);
 }
 expect(FR_C2_SOURCE_RECEPTION['fr-c2-u03']).toBeUndefined();
 const old=RECEPTION_LESSONS['fr-c2-u03'];
 expect(old.paragraphs[2].target).toContain('Du moins ai-je voulu le croire');
 expect(old.questions.every(q=>q.evidence.every(id=>old.paragraphs.some(p=>p.id===id)))).toBe(true);
});
it('does not turn implicatures, metaphors or fictitious corpora into established findings',()=>{
 const text=(n:string)=>FR_C2_SOURCE_RECEPTION['fr-c2-u'+n].paragraphs.map(p=>p.target).join(' ');
 expect(text('01')).toContain('une possibilité ouverte');
 expect(text('02')).toContain('sans jeu de données fourni');
 expect(text('04')).toContain('sans rendre la première phrase fausse');
 expect(text('05')).toContain('ni prix ni mécanisme contractuel détaillé');
 expect(text('06')).toContain('aucune revue de littérature réelle');
 expect(text('07')).toContain('non le passé simple fut');
 expect(text('08')).toContain('ne reproduit ni le tableau chiffré');
});
