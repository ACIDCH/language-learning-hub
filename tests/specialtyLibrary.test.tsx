import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import CourseCatalog from '../src/CourseCatalog';
import SpecialtyLibrary from '../src/SpecialtyLibraryView';
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
  expect(SPECIALTY_LESSONS.length).toBe(107);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(51);
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
   'fr-etre','fr-avoir','fr-possessive-determiners-a1','fr-articles','fr-er','fr-questions-a1','fr-a1-leisure-verbs','fr-a1-market-quantities-grammar','fr-imperative-directions-a1','fr-adjective-agreement-a1',
   'fr-futur-proche-a1','fr-a1-first-past-grammar','fr-articles-partitive','fr-passe-compose','fr-imparfait-a2','fr-a2-route-modals-grammar','fr-a2-symptoms-advice-grammar','fr-object-pronouns-a2','fr-comparisons-a2','fr-futur-simple-a2','fr-negative-scope-a2',
   'fr-pluperfect-narration-b1','fr-conditional-hypothesis-b1','fr-subjunctive-b1','fr-relative-pronouns-b1','fr-mood-concession-b2','fr-past-conditional-regret-b2','fr-b2-reported-news-reading','fr-b2-formal-argument-writing'
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
  expect(SPECIALTY_LESSONS.length).toBe(107);
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


describe('actual B1–C1 French and IELTS Task 2 learning chain',()=>{
 const courseMap=[
  ['fr-conditional-hypothesis-b1','grammar','fr','B1','fr-b1-u03'],
  ['fr-relative-pronouns-b1','grammar','fr','B1','fr-b1-u06'],
  ['fr-subjunctive-b1','grammar','fr','B1','fr-b1-u04'],
  ['fr-b1-argument-lexicon','vocabulary','fr','B1','fr-b1-u02'],
  ['fr-mood-concession-b2','grammar','fr','B2','fr-b2-u01'],
  ['fr-precise-academic-lexicon-c1','vocabulary','fr','C1','fr-c1-u01'],
  ['en-task2-contrast-cohesion','grammar','en','B2','en-ielts-writing-task2-u03'],
  ['en-task2-reason-evidence-vocab','vocabulary','en','B2','en-ielts-writing-task2-u02']
 ] as const;
 it('adds eight original full lessons with correctly linked courses and complete bilingual practice',()=>{
  expect(SPECIALTY_LESSONS.length).toBe(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,language,level,unitLink] of courseMap){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(unit,id).toBeDefined();
   expect([unit.type,unit.language,unit.level,unit.unitLink]).toEqual([type,language,level,unitLink]);
   expect(unit.sections,id).toHaveLength(4);
   expect(unit.questions.length,id).toBeGreaterThanOrEqual(4);
   expect(unit.model.length,id).toBeGreaterThanOrEqual(6);
   expect(unit.sections.every(x=>x.examples.length>=3),id).toBe(true);
   expect(unit.referenceUrls.length,id).toBeGreaterThanOrEqual(1);
   expect(specialtyQuality(unit),id).toBe(true);
   expect(COURSES.some(c=>c.id===unitLink),id+' mapped to a course').toBe(true);
   expect(linkedSpecialties(type,unitLink).some(x=>x.id===id)).toBe(true);
  }
 });
 it('checks B1 grammatical contrasts rather than isolated trigger words',()=>{
  const relative=SPECIALTY_LESSONS.find(x=>x.id==='fr-relative-pronouns-b1')!;
  expect(relative.sections[0].table?.rows).toHaveLength(4);
  expect(relative.sections[2].examples.some(x=>x.target.includes('que nous avons visitée'))).toBe(true);
  const hypothetical=SPECIALTY_LESSONS.find(x=>x.id==='fr-conditional-hypothesis-b1')!;
  expect(hypothetical.sections[0].table?.rows).toHaveLength(6);
  expect(hypothetical.sections[1].caution).toContain('Si j’aurais');
  const mood=SPECIALTY_LESSONS.find(x=>x.id==='fr-mood-concession-b2')!;
  expect(mood.sections[1].caution).toContain('bien que');
  expect(mood.sections[2].examples.some(x=>x.target.includes('à condition que'))).toBe(true);
  expect(SPECIALTY_LESSONS.find(x=>x.id==='fr-subjunctive-b1')!.sections[3].examples.some(x=>x.target.includes('Je pense que'))).toBe(true);
 });
 it('offers a real IELTS 250-plus-word bilingual essay instead of a misleading short model',()=>{
  const vocab=SPECIALTY_LESSONS.find(x=>x.id==='en-task2-reason-evidence-vocab')!;
  const words=vocab.model.map(x=>x.target).join(' ').trim().split(/\s+/u).length;
  expect(words).toBeGreaterThanOrEqual(250);
  expect(words).toBeLessThanOrEqual(400);
  expect(vocab.output).toContain('不少于 250 词');
  expect(vocab.model.every(x=>x.zh.length>5&&x.analysis.length>3)).toBe(true);
  expect(vocab.modelParagraphStarts).toEqual([0,3,8,13,17]);
  const grammar=SPECIALTY_LESSONS.find(x=>x.id==='en-task2-contrast-cohesion')!;
  expect(grammar.output).toContain('段落训练');
  expect(grammar.output).toContain('不是完整 IELTS Task 2');
  expect(grammar.sections[0].table?.rows).toHaveLength(4);
  expect(grammar.sections[0].caution).toContain('Despite');
 });
 it('connects B1 grammar with B2 and C1 without inserting empty chapters',()=>{
  const fr=orderedSpecialties(SPECIALTY_LESSONS.filter(x=>x.language==='fr'&&x.type==='grammar'));
  const seq=fr.map(x=>x.id);
  expect(seq.indexOf('fr-futur-simple-a2')).toBeLessThan(seq.indexOf('fr-conditional-hypothesis-b1'));
  expect(seq.indexOf('fr-subjunctive-b1')).toBeLessThan(seq.indexOf('fr-mood-concession-b2'));
  const c1=SPECIALTY_LESSONS.find(x=>x.id==='fr-precise-academic-lexicon-c1')!;
  expect(adjacentSpecialties(c1,SPECIALTY_LESSONS).previous?.level).toBe('B1');
  const renderUnit=SPECIALTY_LESSONS.find(x=>x.id==='en-task2-reason-evidence-vocab')!;
  const {container}=render(<SpecialtyLibrary params={
   new URLSearchParams('page=specialties&type=vocabulary&language=en&topic='+renderUnit.id)
  } navigate={vi.fn()}/>);
  expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
  expect(container.querySelectorAll('.specialty-question')).toHaveLength(renderUnit.questions.length);
  expect(container.querySelectorAll('.specialty-essay-paragraph')).toHaveLength(5);
  expect(container.querySelectorAll('.specialty-essay-notes')).toHaveLength(5);
 });
});


describe('B1–B2 past time and evidence-bounded IELTS Task 1 expansion',()=>{
 const added=[
  ['fr-pluperfect-narration-b1','grammar','fr','B1','fr-b1-u01'],
  ['fr-past-conditional-regret-b2','grammar','fr','B2','fr-b2-u04'],
  ['en-process-report-grammar','grammar','en','B2','en-ielts-writing-task1-u05'],
  ['en-map-change-lexicon','vocabulary','en','B2','en-ielts-writing-task1-u06']
 ] as const;
 it('contains 56 unique lessons, four complete mapped additions and individual practice',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,language,level,course] of added){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u,id).toBeDefined();
   expect([u.type,u.language,u.level,u.unitLink]).toEqual([type,language,level,course]);
   expect(COURSES.some(x=>x.id===course),id).toBe(true);
   expect(u.sections).toHaveLength(4);
   expect(u.sections.every(x=>x.examples.length>=3&&x.concept.length>45),id).toBe(true);
   expect(u.questions.length).toBeGreaterThanOrEqual(4);
   expect(u.model.length).toBeGreaterThanOrEqual(8);
   expect(specialtyQuality(u)).toBe(true);
   expect(linkedSpecialties(type,course).some(x=>x.id===id)).toBe(true);
  }
 });
 it('enforces genuine chronology and identifies past unrealized conditions',()=>{
  const p=SPECIALTY_LESSONS.find(x=>x.id==='fr-pluperfect-narration-b1')!;
  expect(p.sections[0].table?.rows).toHaveLength(4);
  expect(p.sections[1].examples.some(x=>x.target.includes('avait déjà commencé'))).toBe(true);
  expect(p.sections[3].examples.some(x=>x.target.includes('attendait depuis'))).toBe(true);
  const c=SPECIALTY_LESSONS.find(x=>x.id==='fr-past-conditional-regret-b2')!;
  expect(c.sections[0].table?.rows).toHaveLength(6);
  expect(c.sections[1].caution).toContain('Si j’aurais su');
  const g=orderedSpecialties(SPECIALTY_LESSONS.filter(x=>x.type==='grammar'&&x.language==='fr'));
  const ids=g.map(x=>x.id);
  expect(ids.indexOf('fr-imparfait-a2')).toBeLessThan(ids.indexOf('fr-pluperfect-narration-b1'));
  expect(ids.indexOf('fr-pluperfect-narration-b1')).toBeLessThan(ids.indexOf('fr-past-conditional-regret-b2'));
 });
 it('keeps invented text exercises distinct from real chart-based IELTS prompts',()=>{
  for(const id of ['en-process-report-grammar','en-map-change-lexicon']){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u.sections[0].table,id).toBeTruthy();
   expect(u.sections[0].table!.note).toMatch(/不是|并非|均非/u);
   expect(u.output).toContain('150–180');
   const words=u.model.map(x=>x.target).join(' ').trim().split(/\s+/u).length;
   expect(words,id).toBeGreaterThanOrEqual(150);
   expect(words,id).toBeLessThanOrEqual(185);
  }
  const process=SPECIALTY_LESSONS.find(x=>x.id==='en-process-report-grammar')!;
  expect(process.modelParagraphStarts).toEqual([0,1,3,7]);
  expect(process.sections[0].table?.rows).toHaveLength(6);
  const maps=SPECIALTY_LESSONS.find(x=>x.id==='en-map-change-lexicon')!;
  expect(maps.modelParagraphStarts).toEqual([0,1,3,6,8]);
  expect(maps.sections[0].table?.rows).toHaveLength(4);
 });
 it('renders both advanced French timeline and IELTS evidence directly into textbook',()=>{
  for(const [id,type] of [['fr-pluperfect-narration-b1','grammar'],['en-map-change-lexicon','vocabulary']] as const){
   const {container,unmount}=render(<SpecialtyLibrary params={new URLSearchParams(
    'page=specialties&type='+type+'&language='+(id.startsWith('fr-')?'fr':'en')+'&topic='+id
   )} navigate={vi.fn()}/>);
   expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
   expect(container.querySelectorAll('.specialty-question')).toHaveLength(4);
   expect(container.querySelectorAll('.specialty-grammar-table tbody tr').length).toBeGreaterThanOrEqual(4);
   if(id==='en-map-change-lexicon')expect(container.querySelectorAll('.specialty-essay-paragraph')).toHaveLength(5);
   unmount();
  }
 });
});


describe('official-format DELF B2 and source-bound DALF C1 writing',()=>{
 it('connects both complete writing courses without inventing full coverage of all outlines',()=>{
  const ids=[
   ['fr-b2-formal-argument-writing','grammar','fr-b2-u06','B2'],
   ['fr-c1-cross-source-synthesis','vocabulary','fr-c1-u03','C1']
  ] as const;
  expect(SPECIALTY_LESSONS.length).toBe(107);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,course,level] of ids){
   const lesson=SPECIALTY_LESSONS.find(u=>u.id===id)!;
   expect(lesson).toBeDefined();
   expect([lesson.type,lesson.unitLink,lesson.level]).toEqual([type,course,level]);
   expect(lesson.sections).toHaveLength(4);
   expect(lesson.questions.length).toBeGreaterThanOrEqual(4);
   expect(lesson.sections.every(x=>x.examples.length>=3)).toBe(true);
   expect(specialtyQuality(lesson)).toBe(true);
   expect(linkedSpecialties(type,course).map(x=>x.id)).toContain(id);
  }
 });
 it('keeps DELF B2 complete formal model over 250 whitespace-separated words',()=>{
  const lesson=SPECIALTY_LESSONS.find(x=>x.id==='fr-b2-formal-argument-writing')!;
  const text=lesson.model.map(x=>x.target).join(' ');
  expect(text.split(/\s+/u).filter(Boolean).length).toBeGreaterThanOrEqual(250);
  expect(lesson.modelParagraphStarts).toEqual([0,3,8,13,18]);
  expect(lesson.model[0].target).toContain('Madame la Directrice');
  expect(text).toContain('Je reste à votre disposition');
  expect(lesson.output).toContain('至少 250');
 });
 it('keeps C1 synthesis in 200–240 words without title and never claims invented sources are real',()=>{
  const unit=SPECIALTY_LESSONS.find(x=>x.id==='fr-c1-cross-source-synthesis')!;
  const words=unit.model.slice(1).map(x=>x.target).join(' ').trim().split(/\s+/u).filter(Boolean).length;
  expect(words).toBeGreaterThanOrEqual(200);
  expect(words).toBeLessThanOrEqual(240);
  expect(unit.modelParagraphStarts).toEqual([0,1,3,7,11]);
  expect(unit.sections[0].table?.rows).toHaveLength(4);
  expect(unit.sections[0].examples.slice(0,2).every(x=>x.target.trim().split(/\s+/u).length>120)).toBe(true);
  expect(unit.sections[0].concept).toContain('虚构');
  expect(unit.output).toContain('不要添加个人立场');
  expect(unit.model.map(x=>x.target).join(' ')).not.toMatch(/à mon avis|je pense que/iu);
 });
});


describe('B2 news attribution and C1 critical reading and visible Task1 evidence',()=>{
 it('contains 60 authentic authored source-aligned lessons',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(u=>u.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,course] of [
   ['fr-b2-reported-news-reading','grammar','fr-b2-u03'],
   ['fr-c1-media-stance-reading','vocabulary','fr-c1-u07']
  ] as const){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u,id).toBeDefined();expect(u.sections).toHaveLength(4);
   expect(u.questions.length).toBeGreaterThanOrEqual(4);
   expect(u.model.length).toBeGreaterThanOrEqual(8);
   expect(u.unitLink).toBe(course);expect(u.type).toBe(type);
   expect(u.sections.every(x=>x.examples.length>=3&&x.caution.length>=20)).toBe(true);
   expect(specialtyQuality(u)).toBe(true);
   expect(linkedSpecialties(type,course).some(x=>x.id===id)).toBe(true);
  }
 });
 it('does not confuse a reported suggestion with an actual confirmed policy',()=>{
  const b2=SPECIALTY_LESSONS.find(u=>u.id==='fr-b2-reported-news-reading')!;
  expect(b2.sections[0].table?.rows).toHaveLength(4);
  expect(b2.sections[3].examples[0].target).toContain('aucune extension');
  expect(b2.questions[0].answer).toContain('aucune extension');
  const c1=SPECIALTY_LESSONS.find(u=>u.id==='fr-c1-media-stance-reading')!;
  expect(c1.sections[0].table?.rows).toHaveLength(4);
  expect(c1.sections[1].examples[0].target).toContain('Texte A');
  expect(c1.sections[1].examples[1].target).toContain('Texte B');
  expect(c1.questions[0].answer).toContain('Aucune modification');
 });
 it('renders original labelled visual source within IELTS process and map specialty pages',()=>{
  const process=render(<SpecialtyLibrary params={new URLSearchParams(
   'page=specialties&type=grammar&language=en&topic=en-process-report-grammar'
  )} navigate={vi.fn()}/>);
  expect(process.container.querySelectorAll('.task1-flow-step')).toHaveLength(6);
  expect(process.container.querySelectorAll('.task1-evidence')).toHaveLength(1);
  expect(process.container.textContent).toContain('IELTS 官方视觉写作样题');
  process.unmount();
  const map=render(<SpecialtyLibrary params={new URLSearchParams(
   'page=specialties&type=vocabulary&language=en&topic=en-map-change-lexicon'
  )} navigate={vi.fn()}/>);
  expect(map.container.querySelectorAll('.task1-site-map')).toHaveLength(2);
  expect(map.container.querySelectorAll('.task1-evidence')).toHaveLength(1);
  expect(map.container.textContent).toContain('原创');
 });
});


describe('paired A1 classroom clarification and IELTS Listening U03 paraphrase',()=>{
 const added=[
  ['fr-a1-clarification-lexicon','vocabulary','fr','A1','fr-a1-u06'],
  ['fr-a1-leisure-verbs','grammar','fr','A1','fr-a1-u07'],
  ['en-listening-paraphrase-scope','grammar','en','B2','en-ielts-listening-u03'],
  ['en-listening-note-lexicon','vocabulary','en','B2','en-ielts-listening-u03']
 ] as const;
 it('adds exactly four deep original lessons without duplicating existing question grammar',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  expect(SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-information-questions')).toBeUndefined();
  for(const [id,type,lang,level,course] of added){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id);
   expect(unit,id).toBeDefined();
   expect([unit!.type,unit!.language,unit!.level,unit!.unitLink]).toEqual([type,lang,level,course]);
   expect(unit!.sections,id).toHaveLength(4);
   expect(unit!.sections.every(x=>x.examples.length>=3&&x.concept.length>45&&x.caution.length>25),id).toBe(true);
   expect(unit!.model.length,id).toBeGreaterThanOrEqual(8);
   expect(unit!.questions.length,id).toBeGreaterThanOrEqual(4);
   expect(unit!.questions.every(q=>q.answer.length>3&&q.why.length>15),id).toBe(true);
   expect(specialtyQuality(unit!)).toBe(true);
   expect(COURSES.some(c=>c.id===course),id+' maps to real original course').toBe(true);
   expect(linkedSpecialties(type,course).map(x=>x.id)).toContain(id);
  }
 });
 it('completes both learning tracks for two real courses and improves the A1 U06 vocabulary gap',()=>{
  for(const course of ['fr-a1-u06','en-ielts-listening-u03']){
   expect(linkedSpecialties('grammar',course).length).toBeGreaterThan(0);
   expect(linkedSpecialties('vocabulary',course).length).toBeGreaterThan(0);
  }
  expect(linkedSpecialties('grammar','fr-a1-u06').map(x=>x.id)).toContain('fr-questions-a1');
  expect(linkedSpecialties('grammar','fr-a1-u07').map(x=>x.id)).toContain('fr-a1-leisure-verbs');
  expect(linkedSpecialties('vocabulary','fr-a1-u07').map(x=>x.id)).toContain('fr-a1-leisure-choice-vocabulary');
 });
 it('checks meaning-sensitive usage rather than matching isolated foreign words',()=>{
  const leisure=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-leisure-verbs')!;
  expect(leisure.sections[0].table?.rows).toHaveLength(4);
  expect(leisure.sections[2].examples.some(x=>x.target.includes('joue du piano'))).toBe(true);
  expect(leisure.sections[3].questions).toBeUndefined();
  const listening=SPECIALTY_LESSONS.find(x=>x.id==='en-listening-paraphrase-scope')!;
  expect(listening.sections[0].table?.rows).toHaveLength(4);
  expect(listening.sections[1].caution).toContain('capacity');
  expect(listening.sections[2].caution).toContain('coincided with');
  expect(listening.questions.some(x=>x.answer.includes('maximum of thirty'))).toBe(true);
  const words=SPECIALTY_LESSONS.find(x=>x.id==='en-listening-note-lexicon')!;
  expect(words.sections[0].table?.rows).toHaveLength(4);
  expect(words.model.some(x=>x.target.includes('not stated'))).toBe(true);
 });
 it('renders real four-chapter bilingual textbooks inside independent study',()=>{
  for(const [id,language,type] of [
   ['fr-a1-leisure-verbs','fr','grammar'],
   ['fr-a1-clarification-lexicon','fr','vocabulary'],
   ['en-listening-paraphrase-scope','en','grammar'],
   ['en-listening-note-lexicon','en','vocabulary']
  ] as const){
   const {container,unmount}=render(<SpecialtyLibrary params={new URLSearchParams(
    'page=specialties&type='+type+'&language='+language+'&topic='+id
   )} navigate={vi.fn()}/>);
   expect(container.querySelectorAll('.specialty-chapter'),id).toHaveLength(4);
   expect(container.querySelectorAll('.specialty-question'),id).toHaveLength(4);
   expect(container.querySelector('.specialty-grammar-table'),id).not.toBeNull();
   unmount();
  }
 });
});


describe('A1 market/leisure and IELTS Reading U02 from actual source lessons',()=>{
 const added=[
  ['fr-a1-leisure-choice-vocabulary','vocabulary','fr-a1-u07'],
  ['fr-a1-market-quantities-grammar','grammar','fr-a1-u08'],
  ['fr-a1-market-service-vocabulary','vocabulary','fr-a1-u08'],
  ['en-reading-evidence-scope-u02','grammar','en-ielts-reading-u02'],
  ['en-reading-research-evidence-lexicon-u02','vocabulary','en-ielts-reading-u02']
 ] as const;
 it('keeps 69 unique complete lessons with exact source-course mapping',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,course] of added){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u,id).toBeDefined();
   expect([u.type,u.unitLink]).toEqual([type,course]);
   expect(u.sections,id).toHaveLength(4);
   expect(u.sections.every(x=>x.examples.length===3&&x.concept.length>45&&x.caution.length>25)).toBe(true);
   expect(u.questions).toHaveLength(4);
   expect(u.model.length).toBeGreaterThanOrEqual(8);
   expect(specialtyQuality(u)).toBe(true);
   expect(linkedSpecialties(type,course).map(x=>x.id)).toContain(id);
   expect(COURSES.some(c=>c.id===course)).toBe(true);
  }
 });
 it('now offers both full knowledge tracks for all three newly targeted source courses',()=>{
  for(const id of ['fr-a1-u07','fr-a1-u08','en-ielts-reading-u02']){
   expect(linkedSpecialties('grammar',id).length).toBeGreaterThan(0);
   expect(linkedSpecialties('vocabulary',id).length).toBeGreaterThan(0);
  }
 });
 it('never changes data units, conditional status or not-given scope in lesson models',()=>{
  const a=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-market-quantities-grammar')!;
  expect(a.sections[0].table?.rows).toHaveLength(4);
  expect(a.sections[1].examples.some(x=>x.target.includes('bouteille d’eau'))).toBe(true);
  expect(a.questions.some(q=>q.answer.includes('Trois euros le kilo'))).toBe(true);
  const b=SPECIALTY_LESSONS.find(x=>x.id==='en-reading-evidence-scope-u02')!;
  expect(b.sections[0].table?.rows).toHaveLength(4);
  expect(b.questions.some(q=>q.answer==='NOT GIVEN')).toBe(true);
  expect(b.questions.some(q=>q.answer==='FALSE')).toBe(true);
  expect(b.model.some(m=>m.target.includes('80 to 120'))).toBe(true);
  const l=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-leisure-choice-vocabulary')!;
  expect(l.model.some(m=>m.target.includes('quatre-vingt-dix'))).toBe(true);
  expect(l.questions[1].why).toContain('下雨');
 });
 it('renders every new textbook chapter, real tables and answer controls',()=>{
  for(const [id,type,course] of added){
   const {container,unmount}=render(<SpecialtyLibrary params={new URLSearchParams(
    'page=specialties&type='+type+'&language='+(course.startsWith('fr')?'fr':'en')+'&topic='+id
   )} navigate={vi.fn()}/>);
   expect(container.querySelectorAll('.specialty-chapter'),id).toHaveLength(4);
   expect(container.querySelectorAll('.specialty-question'),id).toHaveLength(4);
   expect(container.querySelector('.specialty-grammar-table'),id).not.toBeNull();
   unmount();
  }
 });
});


describe('A1 household/future vocabulary and IELTS heading-function content',()=>{
 const mapped=[
  ['fr-a1-shared-home-lexicon','fr-a1-u10','fr','A1'],
  ['fr-a1-near-future-planning-lexicon','fr-a1-u11','fr','A1'],
  ['en-ielts-heading-paragraph-function-lexicon','en-ielts-reading-u03','en','B2']
 ] as const;
 it('keeps seventy-two unique lessons and real original-course matches',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [id,course,lang,level] of mapped){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u,id).toBeDefined();
   expect([u.unitLink,u.language,u.level,u.type]).toEqual([course,lang,level,'vocabulary']);
   expect(u.sections).toHaveLength(4);
   expect(u.sections.every(x=>x.examples.length>=3&&x.concept.length>45&&x.caution.length>20)).toBe(true);
   expect(u.questions).toHaveLength(4);
   expect(u.model.length).toBeGreaterThanOrEqual(8);
   expect(specialtyQuality(u)).toBe(true);
   expect(COURSES.some(x=>x.id===course)).toBe(true);
   expect(linkedSpecialties('vocabulary',course).map(x=>x.id)).toContain(id);
   expect(linkedSpecialties('grammar',course).length).toBeGreaterThan(0);
  }
 });
 it('guards possessive gender, reflexive future and non-overstated seed-bank claims',()=>{
  const home=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-shared-home-lexicon')!;
  expect(home.sections[0].table?.rows).toHaveLength(4);
  expect(home.questions[0].answer).toContain('Mon salon');
  expect(home.questions[2].answer).toContain('On prépare');
  const future=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-near-future-planning-lexicon')!;
  expect(future.sections[0].table?.rows).toHaveLength(4);
  expect(future.model.some(x=>x.target.includes('allons nous retrouver'))).toBe(true);
  expect(future.questions[2].answer).toContain('peut-être');
  const reading=SPECIALTY_LESSONS.find(x=>x.id==='en-ielts-heading-paragraph-function-lexicon')!;
  expect(reading.sections[0].table?.rows).toHaveLength(4);
  expect(reading.questions.some(x=>x.answer.startsWith('No.'))).toBe(true);
  expect(reading.model.some(x=>x.target.includes('not describe seed banks as useless'))).toBe(true);
 });
 it('opens each bilingual textbook without duplicate irrelevant entry panels',()=>{
  for(const [id,course,lang] of mapped){
   const {container,unmount}=render(<SpecialtyLibrary params={new URLSearchParams(
    'page=specialties&type=vocabulary&language='+lang+'&topic='+id
   )} navigate={vi.fn()}/>);
   expect(container.querySelectorAll('.specialty-chapter'),id).toHaveLength(4);
   expect(container.querySelectorAll('.specialty-question'),id).toHaveLength(4);
   expect(container.querySelector('.specialty-grammar-table'),id).not.toBeNull();
   unmount();
  }
 });
});


describe('A1 first past and IELTS Reading U04 evidence course repair',()=>{
 const added=[
  ['fr-a1-first-past-grammar','grammar','fr-a1-u12'],
  ['fr-a1-yesterday-journey-lexicon','vocabulary','fr-a1-u12'],
  ['en-ielts-tfng-scope-grammar-u04','grammar','en-ielts-reading-u04']
 ] as const;
 it('registers 75 distinct authored modules linked to real classes',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [id,type,course] of added){
   const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   expect(u,id).toBeDefined();
   expect(u.type).toBe(type);expect(u.unitLink).toBe(course);
   expect(u.sections).toHaveLength(4);expect(u.questions).toHaveLength(4);
   expect(u.sections.every(x=>x.examples.length>=3&&x.concept.length>35&&x.caution.length>20)).toBe(true);
   expect(u.model.length).toBeGreaterThanOrEqual(8);
   expect(specialtyQuality(u)).toBe(true);
   expect(linkedSpecialties(type,course).map(x=>x.id)).toContain(id);
   expect(COURSES.some(x=>x.id===course)).toBe(true);
  }
 });
 it('preserves correct French auxiliary and IELTS unsupported funding distinction',()=>{
  const past=SPECIALTY_LESSONS.find(x=>x.id==='fr-a1-first-past-grammar')!;
  expect(past.sections[0].table?.rows).toHaveLength(4);
  expect(past.questions[0].answer).toContain('ai visité');
  expect(past.questions[1].answer).toBe('allée');
  expect(past.questions[2].answer).toBe('rentrés');
  const scope=SPECIALTY_LESSONS.find(x=>x.id==='en-ielts-tfng-scope-grammar-u04')!;
  expect(scope.questions.map(q=>q.answer)).toEqual(['FALSE','TRUE','NOT GIVEN','NOT GIVEN']);
  expect(scope.sections[0].table?.rows).toHaveLength(4);
  expect(scope.model.some(x=>x.target.includes('not identify the funding'))).toBe(true);
 });
 it('presents complete tables and exercises inside real topic navigation',()=>{
  for(const [id,type,course] of added){
   const view=render(<SpecialtyLibrary params={new URLSearchParams(
    'page=specialties&type='+type+'&language='+(course.startsWith('fr')?'fr':'en')+'&topic='+id
   )} navigate={vi.fn()}/>);
   expect(view.container.querySelectorAll('.specialty-chapter'),id).toHaveLength(4);
   expect(view.container.querySelectorAll('.specialty-question'),id).toHaveLength(4);
   expect(view.container.querySelector('.specialty-grammar-table'),id).not.toBeNull();
   view.unmount();
  }
 });
});


describe('IELTS Reading U05–U08 source-bound complete bilingual knowledge tracks',()=>{
 const courses=[
  ['en-ielts-reading-u05','en-reading-u05-reference-logic','en-reading-u05-retrofit-lexicon'],
  ['en-ielts-reading-u06','en-reading-u06-hedging-inference','en-reading-u06-science-caution-lexicon'],
  ['en-ielts-reading-u07','en-reading-u07-information-matching-logic','en-reading-u07-survey-method-lexicon'],
  ['en-ielts-reading-u08','en-reading-u08-two-source-synthesis','en-reading-u08-access-equity-lexicon']
 ] as const;
 it('keeps exactly 83 unique textbooks, each attached to a real draft course',()=>{
  expect(SPECIALTY_LESSONS).toHaveLength(107);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(107);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='grammar')).toHaveLength(56);
  expect(SPECIALTY_LESSONS.filter(x=>x.type==='vocabulary')).toHaveLength(51);
  for(const [course,grammar,vocabulary] of courses){
   expect(COURSES.some(x=>x.id===course)).toBe(true);
   expect(linkedSpecialties('grammar',course).map(x=>x.id)).toContain(grammar);
   expect(linkedSpecialties('vocabulary',course).map(x=>x.id)).toContain(vocabulary);
   for(const id of [grammar,vocabulary]){
    const u=SPECIALTY_LESSONS.find(x=>x.id===id)!;
    expect(u,id).toBeDefined();
    expect(u.unitLink).toBe(course);
    expect(u.sections).toHaveLength(4);
    expect(u.questions).toHaveLength(4);
    expect(u.model.length).toBe(8);
    expect(u.sections.every(section=>section.examples.length===3&&section.concept.length>65&&section.caution.length>20),id).toBe(true);
    expect(u.sections.flatMap(section=>section.examples).every(e=>e.target.length>15&&e.zh.length>6&&e.analysis.length>2)).toBe(true);
    expect(u.questions.every(q=>q.answer.length>5&&q.why.length>28)).toBe(true);
    expect(specialtyQuality(u)).toBe(true);
    const view=render(<SpecialtyLibrary params={new URLSearchParams('page=specialties&type='+u.type+'&language=en&topic='+id)} navigate={vi.fn()}/>);
    expect(view.container.querySelectorAll('.specialty-chapter'),id).toHaveLength(4);
    expect(view.container.querySelectorAll('.specialty-question'),id).toHaveLength(4);
    view.unmount();
   }
  }
 });
 it('preserves reference, hedge, sample and aggregate distinctions',()=>{
  const byId=(id:string)=>SPECIALTY_LESSONS.find(u=>u.id===id)!;
  expect(byId('en-reading-u05-reference-logic').questions[0].answer).toContain('insulation');
  expect(byId('en-reading-u05-retrofit-lexicon').questions[0].answer).toContain('qualify');
  expect(byId('en-reading-u06-hedging-inference').questions[1].answer).toContain('No.');
  expect(byId('en-reading-u06-science-caution-lexicon').questions[0].answer).toBe('Tentative.');
  expect(byId('en-reading-u07-information-matching-logic').questions.map(q=>q.answer)).toEqual(['Section A.','Section B.','Section B.','Section C.']);
  expect(byId('en-reading-u07-survey-method-lexicon').questions[3].answer).toContain('remote');
  expect(byId('en-reading-u08-two-source-synthesis').questions[2].answer).toContain('coexist');
  expect(byId('en-reading-u08-access-equity-lexicon').questions[2].answer).toContain('No.');
 });
});


it('completes IELTS Reading U01 evidence vocabulary without replacing the two full original source readings',()=>{
 const unit=SPECIALTY_LESSONS.find(x=>x.id==='en-reading-u01-learning-evidence-lexicon')!;
 expect(unit).toBeDefined();
 expect(unit.unitLink).toBe('en-ielts-reading-u01');
 expect(unit.type).toBe('vocabulary');
 expect(unit.sections).toHaveLength(4);
 expect(unit.questions).toHaveLength(4);
 expect(unit.sections[0].table?.rows).toHaveLength(4);
 expect(unit.sections[2].table?.rows).toHaveLength(4);
 expect(unit.model).toHaveLength(8);
 expect(specialtyQuality(unit)).toBe(true);
 expect(linkedSpecialties('vocabulary','en-ielts-reading-u01').map(x=>x.id)).toContain(unit.id);
 expect(linkedSpecialties('grammar','en-ielts-reading-u01').map(x=>x.id)).toContain('en-academic-passive');
 const page=render(<SpecialtyLibrary params={new URLSearchParams('page=specialties&type=vocabulary&language=en&topic='+unit.id)} navigate={vi.fn()}/>);
 expect(page.container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
 expect(page.container.querySelectorAll('.specialty-question')).toHaveLength(4);
 page.unmount();
});

it('IELTS Listening U04–U06 have complete separate grammar and vocabulary books linked to their original course IDs',()=>{
 for(const id of ['en-ielts-listening-u04','en-ielts-listening-u05','en-ielts-listening-u06']){
  const grammar=linkedSpecialties('grammar',id),vocab=linkedSpecialties('vocabulary',id);
  expect(grammar,id+' grammar').toHaveLength(1);
  expect(vocab,id+' vocabulary').toHaveLength(1);
  for(const unit of [...grammar,...vocab]){
   expect(unit.sections,id).toHaveLength(4);
   expect(unit.questions,id).toHaveLength(4);
   expect(unit.model.length,id).toBeGreaterThanOrEqual(6);
   expect(specialtyQuality(unit),unit.id).toBe(true);
   expect(unit.sections[0].table?.rows,unit.id).toHaveLength(4);
   expect(unit.sections.every(s=>s.examples.length>=3&&s.caution.length>=30),unit.id).toBe(true);
  }
 }
});


it('IELTS Writing Task 1 U03 and U04 have independent source-exact grammar and vocabulary chapters',()=>{
 const cases=[
  ['en-ielts-writing-task1-u03','en-task1-u03-comparison-grammar','en-task1-u03-comparison-lexicon'],
  ['en-ielts-writing-task1-u04','en-task1-u04-shares-grammar','en-task1-u04-allocation-lexicon']
 ] as const;
 for(const [courseId,grammarId,vocabId] of cases){
  const grammar=linkedSpecialties('grammar',courseId);
  const vocabulary=linkedSpecialties('vocabulary',courseId);
  expect(grammar.map(x=>x.id)).toContain(grammarId);
  expect(vocabulary.map(x=>x.id)).toContain(vocabId);
  for(const unit of [...grammar,...vocabulary]){
   expect(unit.sections,unit.id).toHaveLength(4);
   expect(unit.questions,unit.id).toHaveLength(4);
   expect(unit.sections.every(s=>s.examples.length>=3&&s.concept.length>=45&&s.caution.length>=25),unit.id).toBe(true);
   expect(unit.sections[0].table?.rows,unit.id).toHaveLength(4);
   expect(unit.model.length,unit.id).toBeGreaterThanOrEqual(8);
   expect(specialtyQuality(unit),unit.id).toBe(true);
  }
 }
 expect(linkedSpecialties('grammar','en-ielts-writing-task1-u03')[0].model.some(x=>x.target.includes('twice'))).toBe(true);
 expect(linkedSpecialties('vocabulary','en-ielts-writing-task1-u04')[0].sections[3].caution).toContain('数据边界');
});

it('IELTS Task 1 U01–U02 new grammar and vocabulary chapters preserve the source calculations and mappings',()=>{
 const cases=[
  ['en-ielts-writing-task1-u01','en-task1-u01-overview-evidence-grammar','en-task1-u01-unit-precision-lexicon'],
  ['en-ielts-writing-task1-u02','en-task1-u02-trend-scope-grammar',null]
 ] as const;
 for(const [course,grammar,vocab] of cases){
  const g=linkedSpecialties('grammar',course).find(x=>x.id===grammar);
  expect(g,course+' grammar').toBeDefined();
  if(vocab)expect(linkedSpecialties('vocabulary',course).map(x=>x.id)).toContain(vocab);
  else expect(linkedSpecialties('vocabulary',course).map(x=>x.id)).toContain('en-task1-trend-lexicon');
  for(const unit of [g,...(vocab?linkedSpecialties('vocabulary',course).filter(x=>x.id===vocab):[])]){
   expect(unit!.sections,unit!.id).toHaveLength(4);
   expect(unit!.questions,unit!.id).toHaveLength(4);
   expect(unit!.model.length,unit!.id).toBeGreaterThanOrEqual(8);
   expect(unit!.sections[0].table?.rows,unit!.id).toHaveLength(4);
   expect(unit!.sections.every(x=>x.examples.length>=3&&x.caution.length>=26),unit!.id).toBe(true);
   expect(specialtyQuality(unit!),unit!.id).toBe(true);
  }
 }
 const first=linkedSpecialties('grammar','en-ielts-writing-task1-u01')[0];
 expect(first.questions[0].answer).toContain('2023');
 expect(first.questions[2].answer).toContain('2021–2022');
 const second=linkedSpecialties('grammar','en-ielts-writing-task1-u02')[0];
 expect(second.questions[2].answer).toContain('fell');
 expect(second.questions[3].answer).toContain('50%');
});


it('Task1 U05/U06 new vocabulary and map-reference grammar match the existing source-specialty pairs',()=>{
 const ids=[
 ['en-ielts-writing-task1-u05','en-task1-u05-recycling-process-lexicon','vocabulary','en-process-report-grammar'],
 ['en-ielts-writing-task1-u06','en-task1-u06-map-reference-grammar','grammar','en-map-change-lexicon']
 ] as const;
 for(const [course,newId,kind,existing] of ids){
  const topic=linkedSpecialties(kind,course).find(x=>x.id===newId)!;
  expect(topic).toBeDefined();
  expect(topic.sections).toHaveLength(4);
  expect(topic.questions).toHaveLength(4);
  expect(topic.model.length).toBeGreaterThanOrEqual(8);
  expect(topic.sections[0].table?.rows.length).toBeGreaterThanOrEqual(4);
  expect(topic.sections.every(s=>s.examples.length>=3&&s.concept.length>=45&&s.caution.length>=25)).toBe(true);
  expect(specialtyQuality(topic)).toBe(true);
  expect(SPECIALTY_LESSONS.some(x=>x.id===existing&&x.unitLink===course)).toBe(true);
 }
 expect(linkedSpecialties('vocabulary','en-ielts-writing-task1-u05')[0].questions[2].answer).toContain('cut');
 expect(linkedSpecialties('grammar','en-ielts-writing-task1-u06')[0].questions[0].answer).toContain('car park');
});
