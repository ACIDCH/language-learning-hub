import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
const load = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const manifest = load('./manifest.json');
const course = load('../../../config/curriculum/units.v2.json');
assert.equal(manifest.schema_version, 1);
assert.equal(manifest.lessons.length, 18);
const ids = new Set(course.units.map(u => u.id));
const seen = new Set();
let french = 0, english = 0;
for (const lesson of manifest.lessons) {
  assert(ids.has(lesson.unit_id), 'Unknown lesson ID ' + lesson.unit_id);
  assert(!seen.has(lesson.unit_id), 'Duplicate unit ' + lesson.unit_id);
  seen.add(lesson.unit_id);
  assert.equal(lesson.stage, 'expanded_original_text_draft');
  for (const field of ['six_stages_present','original_scenario','original_reading','comprehension_answers','source_specific_grammar']) {
    assert.equal(lesson[field], true, lesson.unit_id + ': missing drafted component ' + field);
  }
  for (const field of ['licensed_audio_mapped','expert_qa_approved','text_complete','publishable']) {
    assert.equal(lesson[field], false, lesson.unit_id + ': do not invent completion');
  }
  const collection = lesson.drive_collection;
  assert(collection.startsWith('Language-Learning-Hub/'), 'Expected human-readable private folder location');
  assert(!collection.includes('drive.google.com'), 'Never embed a private Drive URL');
  if (lesson.language === 'fr') {
    assert.match(lesson.unit_id, /^fr-a2-u\d\d$/);
    french++;
  } else {
    assert.equal(lesson.language, 'en');
    assert.match(lesson.unit_id, /^en-ielts-/);
    english++;
  }
}
assert.equal(french, 12);
assert.equal(english, 6);
for (let n = 1; n <= 12; n++) assert(seen.has('fr-a2-u' + String(n).padStart(2, '0')));
assert.equal(manifest.summary.newly_deepened_unit_ids, 18);
assert.equal(manifest.summary.text_complete_verified, 0);
assert.equal(manifest.summary.exact_audio_verified, 0);
assert.equal(manifest.summary.expert_QA_approved, 0);
assert.equal(manifest.summary.publishable, 0);
const raw = readFileSync(new URL('./manifest.json', import.meta.url), 'utf8');
assert(!/docs\.google\.com\/document\/d\//.test(raw));
assert(!/drive\.google\.com\/drive\/folders\//.test(raw));
console.log('Editorial V0.6: 18 valid separate unit IDs, course-match and privacy/status checks passed.');
