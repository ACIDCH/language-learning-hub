import test from 'node:test';import assert from 'node:assert/strict';
import {stageReviewReasons,auditScore} from '../src/stageAudit.ts';
import {readFileSync} from 'node:fs';
const healthy={course_id:'fr-a2-u07',qa_status:'draft',total_chars:4500,
 stages_in_order:true,context_chars:240,grammar_chars:400,vocabulary_chars:380,
 reading_chars:800,pronunciation_chars:220,production_chars:1600,review_signal_count:0};
test('long stage coverage does not silently become human approval',()=>{
 assert.equal(auditScore(healthy),0);
 assert.deepEqual(stageReviewReasons(healthy),[]);
 assert.equal(healthy.qa_status,'draft');
});
test('short answers and reading are prioritized as review hints, not failed exams',()=>{
 const suspicious={...healthy,course_id:'fr-a1-u03',vocabulary_chars:131,reading_chars:110,review_signal_count:2};
 assert.equal(auditScore(suspicious),2);
 const reasons=stageReviewReasons(suspicious);
 assert.ok(reasons.some(x=>x.includes('词汇')));
 assert.ok(reasons.some(x=>x.includes('听力')));
});
test('Postgres scans line-anchored symbols rather than preamble symbol inventories',()=>{
 const sql=readFileSync('supabase/migrations/20261018180500_stage_anchor_fix.sql','utf8');
 assert.match(sql,/regexp_instr\(content_body/);
 assert.match(sql,/security_invoker=true/);
 assert.doesNotMatch(sql,/update public\.private_lesson_content/i);
});
