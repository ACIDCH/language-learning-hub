import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import CourseCatalog from '../src/CourseCatalog';
import SpecialtyLibrary from '../src/SpecialtyLibrary';
import {SPECIALTY_LESSONS,linkedSpecialties,linkedSpecialty,specialtyQuality,specialtyRoute} from '../src/specialtyLibrary';
import {routeCrumbs,readRoute} from '../src/v44Routes';
import {orderedSpecialties,adjacentSpecialties,pairedSpecialties} from '../src/specialtyLearningPath';
import {COURSES,courseRoute} from '../src/v44Courses';
vi.mock('../src/IpaText',()=>({speakIpaText:()=>true}));
afterEach(cleanup);

describe('independent bilingual grammar and vocabulary teaching',()=>{
 it('has real detailed chapters in both languages and both tracks instead of empty shells',()=>{
  const defects:string[]=[];
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(22);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(SPECIALTY_LESSONS.length);
  for(const lang of ['fr','en']){
   for(const type of ['grammar','vocabulary']){
    const selected=SPECIALTY_LESSONS.filter(x=>x.language===lang&&x.type===type);
    expect(selected.length,lang+' '+type).toBeGreaterThanOrEqual(3);
    for(const u of selected){
     const pairRows=u.sections.flatMap(s=>s.examples);
     const issues=[
      ['sections',u.sections.length>=3],['questions',u.questions.length>=2],
      ['model',u.model.length>=2],['pairs',pairRows.length>=6],
      ['sectionsDetailed',u.sections.every(s=>s.concept.length>=35&&s.caution.length>=12&&s.pattern.length>4&&s.examples.every(e=>e.zh.length>3&&e.target.length>8&&e.analysis.length>3))],
      ['questionExplanations',u.questions.every(q=>q.answer.length>0&&q.why.length>=12)]
     ].filter(x=>!x[1]).map(x=>x[0]);
     if(!specialtyQuality(u))defects.push(u.id+': '+issues.join(','));
     expect(u.sections.length).toBeGreaterThanOrEqual(3);
     expect(u.sections.flatMap(x=>x.examples).every(x=>x.zh.trim()&&x.target.trim()&&x.analysis.trim())).toBe(true);
     expect(COURSES.some(c=>c.id===u.unitLink),'Missing actual linked lesson '+u.unitLink).toBe(true);
     expect(u.referenceUrls.every(url=>/^https:\/\//.test(url))).toBe(true);
    }
   }
  }
  expect(defects,'Complete specialty editorial content checks').toEqual([]);
 });
 it('keeps the text independent from copyrighted third-party reading passages',()=>{
  for(const u of SPECIALTY_LESSONS){
   expect(u.sourceNote).toBeTruthy();
   expect(u.objective).toBeTruthy();
   expect(u.output).toBeTruthy();
   expect(u.model.length).toBeGreaterThanOrEqual(2);
  }
 });
 it('exposes real A1-C2 level filtering and secondary skill paths in the catalog',()=>{
  const navigate=vi.fn();
  const {container}=render(<CourseCatalog params={new URLSearchParams('language=fr')} navigate={navigate}/>);
  expect(container.querySelectorAll('.catalog-specialty-primary')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button',{name:/A2 初级/}));
  expect(navigate).toHaveBeenCalledWith('/?language=fr&level=A2');
  fireEvent.click(screen.getByRole('link',{name:/听读训练/}));
  expect(navigate).toHaveBeenCalledWith('/?language=fr&skill=listen');
  expect(screen.getByRole('button',{name:/C2 精通/})).toBeTruthy();
 });
 it('returns to the exact course tab rather than forcing the course homepage',()=>{
  const navigate=vi.fn();
  const from=COURSES.find(c=>c.id==='fr-a1-u01')!;
  const returnPath=courseRoute(from,'ipa');
  const params=new URLSearchParams({page:'specialties',type:'grammar',language:'fr',topic:'fr-etre',returnTo:returnPath});
  const {unmount}=render(<SpecialtyLibrary params={params} navigate={navigate}/>);
  fireEvent.click(screen.getByRole('button',{name:/回到关联课程/}));
  expect(navigate).toHaveBeenCalledWith(returnPath);
  unmount();
  const externalParams=new URLSearchParams({page:'specialties',type:'grammar',language:'fr',topic:'fr-etre',returnTo:'https://unsafe.invalid'});
  render(<SpecialtyLibrary params={externalParams} navigate={navigate}/>);
  fireEvent.click(screen.getByRole('button',{name:/回到关联课程/}));
  expect(navigate).toHaveBeenLastCalledWith(courseRoute(from));
 });
 it('updates compact study tools from the selected chapter, with translation reveal',()=>{
  const navigate=vi.fn();
  const {container}=render(<SpecialtyLibrary params={
   new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-etre')
  } navigate={navigate}/>);
  expect(container.querySelector('.specialty-companion')?.textContent).toContain('01 · 本节结构');
  const chapterLinks=container.querySelectorAll<HTMLAnchorElement>('.specialty-section-nav a');
  expect(chapterLinks.length).toBeGreaterThan(1);
  fireEvent.click(chapterLinks[1]);
  expect(container.querySelector('.specialty-companion')?.textContent).toContain('02 · 本节结构');
  expect(container.querySelector('.specialty-companion')?.textContent).toContain('m’');
  fireEvent.click(screen.getByRole('button',{name:'隐藏中文，自测理解'}));
  expect(screen.getByRole('button',{name:'显示中文对照'})).toBeTruthy();
 });
 it('adds actual A1 questions and adjective lessons mapped to their existing courses',()=>{
  for(const [id,course] of [['fr-questions-a1','fr-a1-u06'],['fr-adjective-agreement-a1','fr-a1-u10']]){
   const lesson=SPECIALTY_LESSONS.find(u=>u.id===id);
   expect(lesson,id).toBeTruthy();
   expect(lesson!.unitLink).toBe(course);
   expect(lesson!.sections.length).toBeGreaterThanOrEqual(4);
   expect(lesson!.questions.length).toBeGreaterThanOrEqual(4);
   expect(specialtyQuality(lesson!)).toBe(true);
   expect(linkedSpecialties('grammar',course).some(u=>u.id===id)).toBe(true);
  }
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(24);
  const questions=SPECIALTY_LESSONS.find(u=>u.id==='fr-questions-a1')!;
  expect(questions.sections[0].table?.rows).toHaveLength(3);
  expect(questions.sections[0].caution).toContain('Est-ce que parles-tu');
  const adjectives=SPECIALTY_LESSONS.find(u=>u.id==='fr-adjective-agreement-a1')!;
  expect(adjectives.sections[0].table?.rows).toHaveLength(4);
  expect(adjectives.sections.flatMap(s=>s.examples).some(e=>e.target.includes('chambre est grande'))).toBe(true);
 });
 it('teaches A1 -er morphology with a six-person paradigm and authentic contrasts',()=>{
  const grammar=SPECIALTY_LESSONS.find(x=>x.id==='fr-er')!;
  expect(grammar.sections).toHaveLength(5);
  expect(grammar.sections[0].table?.rows).toHaveLength(6);
  expect(grammar.sections[0].table?.rows[3]).toContain('parlons');
  expect(grammar.sections[4].examples.some(e=>e.target.includes('mangeons'))).toBe(true);
  expect(grammar.sections[3].examples.some(e=>e.target.includes('ne me lève pas'))).toBe(true);
  expect(grammar.questions).toHaveLength(5);
  const {container}=render(<SpecialtyLibrary params={
    new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-er')
   } navigate={vi.fn()}/>);
  expect(container.querySelectorAll('.specialty-grammar-table tbody tr')).toHaveLength(6);
  expect(container.querySelector('.specialty-heading-row')).toBeTruthy();
  expect(container.querySelector('.specialty-top')).toBeNull();
  expect(container.querySelector('.specialty-fineprint')).toBeNull();
 });
 it('provides dedicated catalog entries for the independent tracks',()=>{
  const navigate=vi.fn();
  render(<CourseCatalog params={new URLSearchParams('language=fr')} navigate={navigate}/>);
  expect(screen.getByRole('link',{name:/语法专题/})).toBeTruthy();
  fireEvent.click(screen.getByRole('link',{name:/语法专题/}));
  expect(navigate).toHaveBeenCalledWith(specialtyRoute('grammar','fr'));
  expect(screen.getByRole('link',{name:/词汇专题/})).toBeTruthy();
 });
 it('shows a full learning chapter with explanations and hidden answers',()=>{
  const navigate=vi.fn();
  const params=new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-etre');
  const {container}=render(<SpecialtyLibrary params={params} navigate={navigate}/>);
  expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
  expect(container.textContent).toContain('同龄同学');
  expect(container.textContent).toContain('Je suis étudiant');
  expect(screen.getAllByText('核对答案与解析').length).toBeGreaterThan(0);
  expect(container.querySelector('.specialty-answer')).toBeNull();
  fireEvent.click(screen.getAllByRole('button',{name:'核对答案与解析'})[0]);
  expect(container.querySelector('.specialty-answer')).not.toBeNull();
  fireEvent.click(screen.getByRole('button',{name:/回到关联课程/}));
  expect(navigate).toHaveBeenCalledWith(expect.stringContaining('fr-a1-u01'));
 });
 it('lets learners switch grammar and vocabulary while preserving language choice',()=>{
  const navigate=vi.fn();
  render(<SpecialtyLibrary params={new URLSearchParams('page=specialties&type=grammar&language=en')} navigate={navigate}/>);
  fireEvent.click(screen.getByRole('button',{name:'词汇'}));
  expect(navigate).toHaveBeenCalledWith(specialtyRoute('vocabulary','en'));
 });
 it('preserves source-related modules without mistaking catalog coverage for edited completeness',()=>{
  expect(linkedSpecialty('grammar','fr-a1-u04')?.id).toBe('fr-articles');
  expect(linkedSpecialty('vocabulary','en-ielts-listening-u01')?.id).toBe('en-lecture-terms');
  expect(linkedSpecialty('grammar','fr-b2-u08')).toBeUndefined();
  expect(linkedSpecialties('grammar','en-ielts-listening-u01').length).toBeGreaterThanOrEqual(4);
  expect(linkedSpecialties('vocabulary','en-ielts-listening-u01').length).toBeGreaterThanOrEqual(5);
 });
 it('builds breadcrumb to new standalone content without redirecting to old cloud panel',()=>{
  const route=readRoute('https://local.test/?page=specialties&type=vocabulary&language=fr&topic=fr-family');
  expect(routeCrumbs(route).map(x=>x.label)).toContain('词汇专题');
  expect(specialtyRoute('grammar','fr','fr-etre')).not.toContain('/cloud');
 });
});


describe('research-extended grammar and vocabulary paths',()=>{
 it('includes six complete new units, two languages and two skills',()=>{
  const ids=['fr-articles-partitive','fr-passe-compose','en-lecture-hedging',
   'en-academic-collocations','fr-campus-vocab','fr-food-vocab'];
  for(const id of ids){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id);
   expect(unit,id).toBeDefined();
   expect(specialtyQuality(unit!),id).toBe(true);
   expect(unit!.sections.length).toBeGreaterThanOrEqual(4);
   expect(unit!.questions.length).toBeGreaterThanOrEqual(3);
   expect(unit!.referenceUrls.length).toBeGreaterThan(0);
  }
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(20);
 });
 it('avoids false absolutes about modality, French negatives and research causality',()=>{
  const academic=SPECIALTY_LESSONS.find(x=>x.id==='en-lecture-hedging')!;
  expect(academic.sections[0].caution).toContain('概率顺序');
  expect(academic.sections.flatMap(x=>x.examples).some(x=>x.target.includes('cannot establish'))).toBe(true);
  const french=SPECIALTY_LESSONS.find(x=>x.id==='fr-articles-partitive')!;
  expect(french.sections.flatMap(x=>x.examples).some(x=>x.target.includes("Ce n'est pas une pomme"))).toBe(true);
  expect(french.sections.flatMap(x=>x.examples).some(x=>x.target.includes("n'y a pas d'eau"))).toBe(true);
 });
 it('teaches the lecture as a five-cell argument with a complete bilingual model',()=>{
  const u=SPECIALTY_LESSONS.find(x=>x.id==='en-lecture-hedging')!;
  expect(u.sections).toHaveLength(5);
  expect(u.sections[4].examples).toHaveLength(5);
  expect(u.sections[4].concept).toContain('研究问题');
  const model=u.model.map(e=>e.target).join(' ');
  const words=model.trim().split(/\s+/u).length;
  expect(words).toBeGreaterThanOrEqual(100);
  expect(words).toBeLessThanOrEqual(130);
  expect(u.model.every(e=>e.zh&&e.analysis)).toBe(true);
  expect(u.output).toContain('100–130');
 });
 it('opens each authored research extension from grammar or vocabulary navigation',()=>{
  for(const id of ['en-lecture-hedging','fr-food-vocab']){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   const navigate=vi.fn();
   const {container,unmount}=render(<SpecialtyLibrary params={
    new URLSearchParams('page=specialties&type='+unit.type+'&language='+unit.language+'&topic='+unit.id)
   } navigate={navigate}/>);
   expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(unit.sections.length);
   expect(container.textContent).toContain(unit.title);
   expect(container.querySelectorAll('.specialty-question')).toHaveLength(unit.questions.length);
   unmount();
  }
 });
});

describe('source-checked progression from grammar to vocabulary and longer texts',()=>{
 const newUnits=[
  ['fr-futur-proche-a1','grammar','fr-a1-u11'],
  ['fr-imparfait-a2','grammar','fr-a2-u02'],
  ['fr-object-pronouns-a2','grammar','fr-a2-u04'],
  ['fr-routines-lexicon','vocabulary','fr-a1-u05'],
  ['fr-directions-lexicon','vocabulary','fr-a1-u09'],
  ['fr-past-events-lexicon','vocabulary','fr-a2-u01'],
  ['fr-opinions-lexicon','vocabulary','fr-a2-u08'],
  ['en-academic-passive','grammar','en-ielts-reading-u01'],
  ['en-relative-clauses','grammar','en-ielts-reading-u03'],
  ['en-task1-trend-lexicon','vocabulary','en-ielts-writing-task1-u02'],
  ['en-reading-evidence-lexicon','vocabulary','en-ielts-reading-u04']
 ] as const;
 it('registers exactly the eleven substantive curriculum additions with real lessons',()=>{
  expect(SPECIALTY_LESSONS.length).toBe(44);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(24);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(20);
  for(const [id,kind,courseId] of newUnits){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id);
   expect(u,id).toBeTruthy();
   expect(u?.unitLink).toBe(courseId);
   expect(u?.type).toBe(kind);
   expect(u!.sections.length,id+' sections').toBeGreaterThanOrEqual(4);
   expect(u!.questions.length,id+' exercises').toBeGreaterThanOrEqual(4);
   expect(u!.model.length,id+' model').toBeGreaterThanOrEqual(4);
   expect(u!.sections.every(section=>section.examples.length>=3),id+' detailed examples').toBe(true);
   expect(specialtyQuality(u!),id).toBe(true);
   expect(linkedSpecialties(kind,courseId).some(x=>x.id===id)).toBe(true);
  }
 });
 it('orders the progression by prerequisite and connects adjacent and paired studies',()=>{
  const grammar=orderedSpecialties(SPECIALTY_LESSONS.filter(u=>u.language==='fr'&&u.type==='grammar'));
  expect(grammar.map(u=>u.id)).toEqual([
   'fr-etre','fr-avoir','fr-possessive-determiners-a1','fr-articles','fr-er','fr-questions-a1','fr-imperative-directions-a1','fr-adjective-agreement-a1',
   'fr-futur-proche-a1','fr-articles-partitive','fr-passe-compose','fr-imparfait-a2','fr-object-pronouns-a2','fr-comparisons-a2','fr-futur-simple-a2','fr-negative-scope-a2'
  ]);
  const current=grammar.find(u=>u.id==='fr-er')!;
  expect(adjacentSpecialties(current,SPECIALTY_LESSONS).next?.id).toBe('fr-questions-a1');
  expect(pairedSpecialties(current,SPECIALTY_LESSONS).map(x=>x.id)).toContain('fr-routines-lexicon');
 });
 it('opens the next grammar chapter and then the related vocabulary chapter',()=>{
  const navigate=vi.fn();
  const {container,rerender}=render(<SpecialtyLibrary params={
   new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-er')
  } navigate={navigate}/>);
  expect(container.querySelectorAll('.specialty-learning-links button').length).toBeGreaterThanOrEqual(2);
  fireEvent.click(screen.getByRole('button',{name:/下一专题：法语疑问句/}));
  expect(navigate).toHaveBeenCalledWith(specialtyRoute('grammar','fr','fr-questions-a1'));
  rerender(<SpecialtyLibrary params={
   new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-er')
  } navigate={navigate}/>);
  fireEvent.click(screen.getByRole('button',{name:/关联词汇：一天的活动/}));
  expect(navigate).toHaveBeenLastCalledWith(specialtyRoute('vocabulary','fr','fr-routines-lexicon'));
 });
 it('preserves semantically essential distinctions across the actual new material',()=>{
  const imparfait=SPECIALTY_LESSONS.find(x=>x.id==='fr-imparfait-a2')!;
  expect(imparfait.sections[0].table?.rows).toHaveLength(6);
  expect(imparfait.sections.some(x=>x.examples.some(e=>e.target.includes('lisais quand')))).toBe(true);
  const objects=SPECIALTY_LESSONS.find(x=>x.id==='fr-object-pronouns-a2')!;
  expect(objects.sections[0].examples.some(x=>x.target.includes('Je lui parle'))).toBe(true);
  const trend=SPECIALTY_LESSONS.find(x=>x.id==='en-task1-trend-lexicon')!;
  expect(trend.sections[0].caution).toContain('百分点');
  const relative=SPECIALTY_LESSONS.find(x=>x.id==='en-relative-clauses')!;
  expect(relative.sections[2].caution).toContain('that');
  const evidence=SPECIALTY_LESSONS.find(x=>x.id==='en-reading-evidence-lexicon')!;
  expect(evidence.sections[3].caution).toContain('不等于');
 });
});

describe('source-verified A1/A2 and B2 continuity completed in this pass',()=>{
 const topics=[
  ['fr-possessive-determiners-a1','grammar','fr','A1','fr-a1-u03'],
  ['fr-imperative-directions-a1','grammar','fr','A1','fr-a1-u09'],
  ['fr-comparisons-a2','grammar','fr','A2','fr-a2-u06'],
  ['fr-futur-simple-a2','grammar','fr','A2','fr-a2-u07'],
  ['fr-negative-scope-a2','grammar','fr','A2','fr-a2-u11'],
  ['fr-countries-languages-lexicon','vocabulary','fr','A1','fr-a1-u02'],
  ['fr-shop-services-lexicon','vocabulary','fr','A2','fr-a2-u06'],
  ['en-reported-speech-listening','grammar','en','B2','en-ielts-listening-u02'],
  ['en-stance-lexicon-listening','vocabulary','en','B2','en-ielts-listening-u02']
 ] as const;
 it('contains nine authentic and fully authored lessons, not headings or repeated summaries',()=>{
  expect(SPECIALTY_LESSONS.length).toBe(44);
  const allIds=SPECIALTY_LESSONS.map(x=>x.id);
  expect(new Set(allIds).size).toBe(allIds.length);
  for(const [id,type,language,level,course] of topics){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id);
   expect(u,id).toBeTruthy();
   expect(u?.type).toBe(type);
   expect(u?.language).toBe(language);
   expect(u?.level).toBe(level);
   expect(u?.unitLink).toBe(course);
   expect(u?.sections).toHaveLength(4);
   expect(u?.sections.every(x=>x.examples.length>=3&&x.concept.length>=45&&x.caution.length>=20),id).toBe(true);
   expect(u?.questions.length,id).toBeGreaterThanOrEqual(4);
   expect(u?.model.length,id).toBeGreaterThanOrEqual(5);
   expect(specialtyQuality(u!),id).toBe(true);
   expect(COURSES.some(x=>x.id===course),id+' course exists').toBe(true);
   expect(u?.referenceUrls.every(url=>url.startsWith('https://'))).toBe(true);
  }
 });
 it('guards against actual grammatical reversals and overclaiming',()=>{
  const possess=SPECIALTY_LESSONS.find(x=>x.id==='fr-possessive-determiners-a1')!;
  expect(possess.sections[0].table?.rows).toHaveLength(6);
  expect(possess.sections[2].examples.some(x=>x.target==='Mon amie arrive à midi.')).toBe(true);
  const imperative=SPECIALTY_LESSONS.find(x=>x.id==='fr-imperative-directions-a1')!;
  expect(imperative.sections[1].examples.some(x=>x.target.startsWith('Vas-y'))).toBe(true);
  const future=SPECIALTY_LESSONS.find(x=>x.id==='fr-futur-simple-a2')!;
  expect(future.sections[0].table?.rows).toHaveLength(6);
  expect(future.sections[3].caution).toContain('aurons');
  const comparison=SPECIALTY_LESSONS.find(x=>x.id==='fr-comparisons-a2')!;
  expect(comparison.sections[1].examples.some(x=>x.target.includes('mieux'))).toBe(true);
  const negative=SPECIALTY_LESSONS.find(x=>x.id==='fr-negative-scope-a2')!;
  expect(negative.sections[1].examples.some(x=>x.target.includes('rencontré personne'))).toBe(true);
  const report=SPECIALTY_LESSONS.find(x=>x.id==='en-reported-speech-listening')!;
  expect(report.sections[2].examples.some(x=>x.target.includes('asked whether'))).toBe(true);
  expect(report.sections[3].caution).toContain('proved that');
  const vocab=SPECIALTY_LESSONS.find(x=>x.id==='fr-countries-languages-lexicon')!;
  expect(vocab.sections[0].table?.rows).toHaveLength(4);
 });
 it('correctly advances through prerequisite sequence and pairs grammar with vocabulary',()=>{
  const g=SPECIALTY_LESSONS.find(x=>x.id==='fr-possessive-determiners-a1')!;
  expect(adjacentSpecialties(g,SPECIALTY_LESSONS).previous?.id).toBe('fr-avoir');
  expect(adjacentSpecialties(g,SPECIALTY_LESSONS).next?.id).toBe('fr-articles');
  const q=SPECIALTY_LESSONS.find(x=>x.id==='en-reported-speech-listening')!;
  expect(pairedSpecialties(q,SPECIALTY_LESSONS).map(x=>x.id)).toContain('en-stance-lexicon-listening');
 });
 it('renders a complete structured source-checked chapter in the actual learning page',()=>{
  const u=SPECIALTY_LESSONS.find(x=>x.id==='fr-futur-simple-a2')!;
  const {container}=render(<SpecialtyLibrary
   params={new URLSearchParams('page=specialties&type=grammar&language=fr&topic='+u.id)}
   navigate={vi.fn()}/>);
  expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
  expect(container.querySelectorAll('.specialty-grammar-table tbody tr')).toHaveLength(6);
  expect(container.querySelectorAll('.specialty-question')).toHaveLength(u.questions.length);
  expect(container.querySelectorAll('.specialty-learning-links button').length).toBeGreaterThan(0);
  expect(container.textContent).not.toContain('教学内容草稿');
 });
});
