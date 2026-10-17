import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.mjs';

const call = (path, options) => worker.fetch(new Request('https://example.workers.dev' + path, options));
test('health endpoint is read-only and explicit about scaffold stage', async () => {
  const response = await call('/health');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {ok: true, service: 'language-hub-api', stage: 'scaffold'});
});
test('status never pretends a real backend is connected', async () => {
  const response = await call('/v1/status');
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ready, false);
  assert.equal(body.modules.progress, 'not-connected');
});
test('unsupported data writes cannot silently succeed', async () => {
  const response = await call('/v1/progress/a-lesson', {method: 'POST', body: '{}'});
  assert.equal(response.status, 501);
  assert.equal((await response.json()).error, 'not_implemented');
});
test('unknown paths reject cleanly', async () => {
  const response = await call('/missing');
  assert.equal(response.status, 404);
});
