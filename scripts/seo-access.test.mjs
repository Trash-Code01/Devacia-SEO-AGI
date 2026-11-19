import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import crypto from 'node:crypto';
import { signToken, verifyToken } from '../src/server/api/_utils/auth-middleware.js';
import handler from '../src/server/api/admin/documents.js';
import metaHandler from '../src/server/api/meta-conversion.js';
import { resolvePrivateDocument } from '../src/server/private-documents.js';
import { CONSENT_KEY, CONSENT_MAX_AGE, parseConsent, googleConsent, readConsent, saveConsent } from '../src/utils/consent.js';
import { canTrack } from '../src/utils/tracking-policy.js';

function response() {
  return { code: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, send(body) { this.body = body; return this; } };
}

test('document archive rejects anonymous, non-admin and malformed-cookie requests', async () => {
  const previous = process.env.JWT_SECRET; process.env.JWT_SECRET = 'isolated-unit-test-secret-not-a-deployment-secret';
  try {
    for (const [headers, expected] of [[{}, 401], [{ cookie: 'devacia_admin_session=%ZZ' }, 401], [{ authorization: `Bearer ${signToken({ role: 'viewer' })}` }, 403]]) {
      const res = response(); await handler({ method: 'GET', headers, query: {} }, res);
      assert.equal(res.code, expected); assert.equal(res.body.documents, undefined);
      assert.equal(res.headers['Cache-Control'], 'private, no-store, max-age=0');
    }
  } finally { if (previous === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previous; }
});

test('archive preserves every PDF byte, removes public copies and authenticates every download', async () => {
  const previous = process.env.JWT_SECRET; process.env.JWT_SECRET = 'isolated-unit-test-secret-not-a-deployment-secret';
  try {
    const manifest = JSON.parse(await readFile(new URL('../private/documents/manifest.json', import.meta.url), 'utf8'));
    assert.equal(manifest.length, 11);
    const headers = { authorization: `Bearer ${signToken({ role: 'admin' })}` };
    const listing = response(); await handler({ method: 'GET', headers, query: {} }, listing);
    assert.equal(listing.code, 200); assert.equal(listing.body.documents.length, manifest.length);
    for (const row of manifest) {
      await assert.rejects(access(new URL(`../public/${row.id}`, import.meta.url)), { code: 'ENOENT' });
      const res = response(); await handler({ method: 'GET', headers, query: { id: row.id } }, res);
      assert.equal(res.code, 200); assert.equal(res.body.subarray(0, 5).toString(), '%PDF-');
      assert.equal(res.body.length, row.bytes);
      assert.equal(crypto.createHash('sha256').update(res.body).digest('hex').toUpperCase(), row.sha256);
      assert.equal(res.headers['Content-Type'], 'application/pdf');
      assert.ok(res.headers['Content-Disposition'].startsWith('attachment;'));
    }
    for (const id of ['../.env', '%2e%2e%2f.env', 'C:\\Windows\\file.pdf', ['one.pdf'], 'missing.pdf']) {
      assert.equal(resolvePrivateDocument(id, manifest), null);
      const res = response(); await handler({ method: 'GET', headers, query: { id } }, res); assert.equal(res.code, 404);
    }
    const res = response(); await handler({ method: 'POST', headers, query: {} }, res); assert.equal(res.code, 405);
  } finally { if (previous === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previous; }
});

test('admin JWT fails closed without a configured secret and rejects expired or tampered tokens', () => {
  const previous = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET; assert.throws(() => signToken({ role: 'admin' }), /not configured/); assert.equal(verifyToken('anything'), null);
    process.env.JWT_SECRET = 'devacia_default_secret_please_change_2026'; assert.throws(() => signToken({ role: 'admin' }));
    process.env.JWT_SECRET = 'isolated-unit-test-secret-not-a-deployment-secret';
    assert.equal(verifyToken(signToken({ role: 'admin' })).role, 'admin');
    assert.equal(verifyToken(signToken({ role: 'admin' }, 0)), null);
    assert.equal(verifyToken(`${signToken({ role: 'admin' })}x`), null);
    for (const [header, payload] of [[{ alg: 'none', typ: 'JWT' }, { role: 'admin', exp: Date.now() }], [{ alg: 'HS256', typ: 'JWT' }, { role: 'admin' }]]) {
      const data = `${Buffer.from(JSON.stringify(header)).toString('base64url')}.${Buffer.from(JSON.stringify(payload)).toString('base64url')}`;
      assert.equal(verifyToken(`${data}.${crypto.createHmac('sha256', process.env.JWT_SECRET).update(data).digest('base64url')}`), null);
    }
  } finally { if (previous === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previous; }
});

test('consent requires a current explicit choice and all four Google consent signals agree', () => {
  const now = Date.now();
  for (const value of [undefined, 'null', '{}', '{', JSON.stringify({ version: 1, optional: 'yes', savedAt: now }), JSON.stringify({ version: 1, optional: true, savedAt: now - CONSENT_MAX_AGE }), JSON.stringify({ version: 1, optional: true, savedAt: now + 1 })]) assert.equal(parseConsent(value, now), null);
  assert.equal(parseConsent(JSON.stringify({ version: 1, optional: false, savedAt: now }), now).optional, false);
  assert.deepEqual(Object.values(googleConsent(true)), ['granted', 'granted', 'granted', 'granted']);
  assert.deepEqual(Object.values(googleConsent(false)), ['denied', 'denied', 'denied', 'denied']);
});

test('consent persists, revocation clears measurement but preserves account/enquiry storage, blocked storage is safe', () => {
  const previous = { window: globalThis.window, document: globalThis.document, location: globalThis.location, env: process.env.NODE_ENV, app: process.env.NEXT_PUBLIC_APP_ENV };
  const data = new Map([['devacia_attribution', '{}'], ['devacia_admin_token', 'keep'], ['draft', 'keep']]);
  const session = new Map([['devacia_attribution_session', '{}']]);
  const cookies = new Map([['_ga', 'example'], ['devacia_admin_session', 'keep']]);
  const storage = map => ({ getItem: k => map.get(k) || null, setItem: (k, v) => map.set(k, v), removeItem: k => map.delete(k) });
  const events = [];
  globalThis.document = { get cookie() { return [...cookies].map(([k, v]) => `${k}=${v}`).join('; '); }, set cookie(raw) { const [k, v] = raw.split(';')[0].split('='); if (raw.includes('Max-Age=0')) cookies.delete(k); else cookies.set(k, v); } };
  globalThis.window = { location: { hostname: 'www.devacia.com', pathname: '/', protocol: 'https:' }, localStorage: storage(data), sessionStorage: storage(session), dispatchEvent: event => events.push(event.type) };
  globalThis.location = window.location; process.env.NODE_ENV = 'production'; delete process.env.NEXT_PUBLIC_APP_ENV;
  try {
    assert.equal(canTrack(), false); assert.equal(readConsent(), null);
    saveConsent(true); assert.equal(canTrack(), true); assert.equal(readConsent().optional, true);
    saveConsent(false); assert.equal(canTrack(), false); assert.equal(readConsent().optional, false);
    assert.equal(data.has('devacia_attribution'), false); assert.equal(session.size, 0); assert.equal(cookies.has('_ga'), false);
    assert.equal(data.get('devacia_admin_token'), 'keep'); assert.equal(data.get('draft'), 'keep'); assert.equal(cookies.get('devacia_admin_session'), 'keep');
    assert.equal(events.length, 2);
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
    assert.equal(readConsent().optional, false); assert.doesNotThrow(() => saveConsent(true)); assert.equal(readConsent().optional, true);
  } finally {
    for (const key of ['window', 'document', 'location']) { if (previous[key] === undefined) delete globalThis[key]; else globalThis[key] = previous[key]; }
    for (const [key, value] of [['NODE_ENV', previous.env], ['NEXT_PUBLIC_APP_ENV', previous.app]]) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});

test('server conversion refuses missing, expired and denied consent before forwarding data', async () => {
  const previous = { env: process.env.NODE_ENV, app: process.env.APP_ENV, publicApp: process.env.NEXT_PUBLIC_APP_ENV, fetch: globalThis.fetch };
  process.env.NODE_ENV = 'production'; delete process.env.APP_ENV; delete process.env.NEXT_PUBLIC_APP_ENV;
  let calls = 0; globalThis.fetch = () => { calls++; throw new Error('Must not forward'); };
  try {
    for (const choice of [undefined, { version: 1, optional: false, savedAt: Date.now() }, { version: 1, optional: true, savedAt: 0 }]) {
      const res = response(); await metaHandler({ method: 'POST', headers: { host: 'www.devacia.com' }, cookies: { [CONSENT_KEY]: JSON.stringify(choice) }, body: { eventName: 'Lead' } }, res);
      assert.equal(res.body.reason, 'optional_measurement_not_allowed');
    }
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = previous.fetch;
    for (const [key, value] of [['NODE_ENV', previous.env], ['APP_ENV', previous.app], ['NEXT_PUBLIC_APP_ENV', previous.publicApp]]) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
