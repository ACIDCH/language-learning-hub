import assert from 'node:assert/strict';
import {copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve, dirname, join} from 'node:path';

// An explicit allowlist prevents private Drive content, licensed textbooks and
// non-production prototype tests from accidentally becoming public assets.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'design-prototypes', 'academic-clean');
const output = join(root, 'dist-preview');
const files = ['index.html', 'app.js', 'styles.css'];
const html = readFileSync(join(source, 'index.html'), 'utf8');
assert(html.includes('./app.js') && html.includes('./styles.css'), 'Prototype dependencies missing');
assert(html.includes('设计原型'), 'Preview must remain marked as a prototype');
assert(!html.includes('google_drive_private') && !html.includes('service_role'), 'No private bindings in preview');
let bytes = 0;
for (const file of files) {
  const p = join(source, file);
  assert(statSync(p).isFile(), 'Missing preview source: ' + file);
  bytes += statSync(p).size;
}
assert(bytes <= 12 * 1024 * 1024, 'Preview exceeds 12 MiB budget');
rmSync(output, {recursive: true, force: true});
mkdirSync(output, {recursive: true});
for (const file of files) copyFileSync(join(source, file), join(output, file));
// Preview should never compete in search results with the canonical portfolio.
writeFileSync(join(output, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n', 'utf8');
assert.deepEqual(readdirSync(output).sort(), ['_headers', ...files].sort());
console.log('Cloudflare preview prepared: 3 public assets, no backend credentials, ' + bytes + ' bytes.');
