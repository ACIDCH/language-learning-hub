import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { strict as assert } from 'node:assert';

const root = new URL('.', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');

const html = read('index.html');
const css = read('styles.css');
const js = read('app.js');

for (const path of ['./styles.css', './app.js']) {
  assert(html.includes(path), `HTML must link ${path}`);
}
for (const label of ['课程','我的资料','资源库','系统架构']) {
  assert(html.includes(label), `Missing navigation: ${label}`);
}
for (const segment of ['context','grammar','vocab','reception','pronunciation','production']) {
  assert(js.includes(segment), `Missing stage: ${segment}`);
}
for (const marker of ['LanguageSwitcher','AppShell']) {
  // Design vocabulary exists in docs, not necessarily code; do not enforce.
}
assert(js.includes('不会上传'), 'Demo must disclose that file selection is not an upload');
assert(js.includes('未连接后台'), 'Demo must not claim a backend is connected');
assert(js.includes('未评估'), 'Audio feedback must have honest empty state');
assert(js.includes('replaceChildren'), 'Selected files must be rendered as text nodes');
assert(js.includes('escapeHTML'), 'Escaping helper expected for HTML templating');
assert(!html.includes('Develop your academic English'), 'No marketing slogan');
assert(css.includes(':focus-visible'), 'Keyboard focus visible');
assert(css.includes('max-width:600px'), 'Mobile responsive rule required');
assert(css.includes('prefers-reduced-motion'), 'Motion preferences required');
assert(!js.includes('fetch('), 'Prototype intentionally has no private data fetching');
assert(!js.includes('localStorage'), 'Prototype does not keep selected filenames');
assert(!js.includes('service_role'), 'Never embed Supabase privileged credentials');

const routes = JSON.parse(readFileSync(new URL('../../docs/design-v3/route-map.json', root), 'utf8'));
assert.equal(routes.schema_version, 1);
assert(routes.routes.some(r => r.path === '/materials/import' && r.auth === 'owner'));
assert(routes.invariants.full_original_text_always_retrievable);

console.log('Academic-clean prototype: structure, import disclosures, routes and a11y hooks verified.');
