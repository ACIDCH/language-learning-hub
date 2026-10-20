import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
const json=path=>JSON.parse(readFileSync(path,'utf8'));
const mains=json('content/v44-main-index.json');
const drafts=readdirSync('content/lesson-drafts').filter(n=>n.endsWith('.json'));
const folder='reports/curriculum-depth';
mkdirSync(folder,{recursive:true});
const rows=[];
const genericNote='原文例句：结合本课知识讲解';
for(const r of mains){
 const issues=[];
 if(r.content_status==='original_draft'){
  const d=json('content/lesson-drafts/'+r.id+'.json');
  if(d.id!==r.id)issues.push('id_mismatch');
  if(!d.goal?.trim()||d.goal.startsWith('Apply '))issues.push('goal_needs_specificity');
  if(!d.context?.trim())issues.push('context_missing');
  if(!d.grammar?.trim())issues.push('grammar_missing');
  if(!d.examples?.length)issues.push('examples_missing');
  if(d.examples?.every(e=>e.note?.includes(genericNote)))issues.push('example_explanations_generic');
  if(!d.vocabulary?.length)issues.push('vocabulary_missing');
  if(!d.reading?.trim())issues.push('reading_missing');
  if(!d.listening_script?.trim())issues.push('listening_script_missing');
  if(d.listening_script?.trim()===d.reading?.trim())issues.push('listening_duplicates_reading');
  if(!d.questions?.length||d.questions.some(q=>!q.prompt||!q.answer||!q.explanation))issues.push('questions_need_review');
  if(!d.pronunciation?.trim()||/浏览器转写不能证明音素正确/.test(d.pronunciation))issues.push('pronunciation_not_instructional_enough');
  if(!d.production?.trim()||d.production.startsWith('Produce an original'))issues.push('production_too_generic');
  if(!d.self_review?.trim()||d.self_review.startsWith('核对任务是否回答完整'))issues.push('self_review_generic');
  if(!['en-ielts-listening-u01','fr-a1-u04'].includes(r.id))issues.push('no_individual_editorial_expansion');
 }
 if(!r.public_sources?.length&&r.content_status==='existing_original')issues.push('source_missing');
 rows.push({id:r.id,kind:r.content_status,editorial:'pending',issue_count:issues.length,issues});
}
const totals={mainUnits:mains.length,draftUnits:drafts.length,existingOriginals:mains.filter(r=>r.content_status==='existing_original').length,
 foundationUnits:48,fullInventoryUnits:mains.length+48,
 authoredRebuildSamples:2,individuallyPedagogicallyReviewed:0};
const escape=value=>'"'+String(value??'').replaceAll('"','""')+'"';
const data=[['id','kind','editorial','issue_count','issues'],...rows.map(r=>[r.id,r.kind,r.editorial,r.issue_count,r.issues.join(';')])];
writeFileSync(folder+'/main-lessons.csv',data.map(row=>row.map(escape).join(',')).join('\n')+'\n');
writeFileSync(folder+'/summary.json',JSON.stringify({totals,issueFrequencies:Object.fromEntries(
 [...new Set(rows.flatMap(x=>x.issues))].sort().map(issue=>[issue,rows.filter(row=>row.issues.includes(issue)).length])
)},null,2));
console.log('Curriculum inventory:',JSON.stringify(totals));
if(totals.mainUnits!==108||totals.draftUnits!==101||totals.fullInventoryUnits!==156)
 throw Error('Course inventory differs from the agreed 156/108/101 counts');
// The audit is an honest review backlog, not a gate that labels unfinished lessons "complete".
