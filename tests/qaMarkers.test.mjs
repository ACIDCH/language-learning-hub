import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const migration=readFileSync('supabase/migrations/20261018152000_qa_marker_precision.sql','utf8');
const ui=readFileSync('src/CourseAudit.tsx','utf8');
test('French corrigé is detected while manuscript status remains independent',()=>{
 assert.match(migration,/strpos\(lower\(content_body\),'corrig'\)>0/);
 assert.match(migration,/security_invoker=true/);
 assert.match(migration,/qa_status,/);
 assert.doesNotMatch(migration,/update public\.private_lesson_content/i);
});
test('QA dashboard must not identify all marker hits as editorial approval',()=>{
 assert.match(ui,/qa_status!=='approved'/);
 assert.match(ui,/待人工审校/);
 assert.match(ui,/检测到答案标记/);
 assert.match(ui,/qa_status/);
 assert.match(ui,/refreshVersion/);
});
