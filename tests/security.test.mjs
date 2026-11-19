import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { safeRedirectPath, serializeJsonLd } from '../src/lib/security.mjs';
import { sanitizeRichHtml } from '../src/lib/sanitize-html.mjs';

test('post-auth redirects reject script schemes, foreign origins, and URL parser tricks', () => {
  for (const input of [
    null, undefined, '', 'javascript:alert(1)', 'data:text/html,unsafe',
    'https://example.org', '//example.org', '///example.org',
    '/\\example.org', '/%5cexample.org', '/%2fexample.org',
    '/%2f%2fexample.org', '/\n/example.org', '/%0a/example.org',
    ' /checkout', '/invalid%escape', '/a/..//example.org', '/%2e%2e//example.org',
  ]) {
    assert.equal(safeRedirectPath(input), '/dashboard', String(input));
  }
});

test('post-auth redirects retain internal paths, query strings, and fragments', () => {
  for (const input of ['/checkout', '/shop?page=2#products', '/product/cuisine', '/']) {
    assert.equal(safeRedirectPath(input), input);
  }
  assert.equal(safeRedirectPath('/account/../checkout'), '/checkout');
  assert.equal(safeRedirectPath('https://example.org', '/checkout'), '/checkout');
});

test('JSON-LD cannot terminate its script element and retains its original data', () => {
  const data = { name: '</script><script>alert(1)</script>', description: '<img src=x onerror=alert(1)>', nested: ['<', 'été'] };
  const serialized = serializeJsonLd(data);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
  const markup = renderToStaticMarkup(React.createElement('script', {
    type: 'application/ld+json', dangerouslySetInnerHTML: { __html: serialized },
  }));
  assert.equal((markup.match(/<script/g) || []).length, 1);
  assert.equal((markup.match(/<\/script>/g) || []).length, 1);
});

test('CMS sanitization removes active content and unsafe links', () => {
  const dirty = '<script>alert(1)</script><img src="https://example.org/image.jpg" onerror="alert(2)">' +
    '<a href="java&#x73;cript:alert(3)" onclick="alert(4)">Lien</a>' +
    '<iframe src="https://example.org"></iframe><svg onload="alert(5)"></svg>' +
    '<math><mtext>test</mtext></math><form action="https://example.org"><input name="password"></form>' +
    '<p style="background:url(javascript:alert(6))">Texte</p>';
  const clean = sanitizeRichHtml(dirty);
  assert.doesNotMatch(clean, /<script|onerror|onclick|javascript:|<iframe|<svg|<math|<form|<input|style=/i);
  assert.match(clean, /<img src="https:\/\/example.org\/image.jpg"/);
  assert.match(clean, /<a>Lien<\/a>/);
});

test('CMS sanitization preserves useful rich content and restricts image protocols', () => {
  const html = '<h2>Cuisine</h2><p><strong>Élégant</strong> <a href="/shop">Catalogue</a></p>' +
    '<table><tbody><tr><td colspan="2">Meuble</td></tr></tbody></table>' +
    '<img src="data:image/svg+xml,unsafe"><img src="//example.org/x">';
  const clean = sanitizeRichHtml(html);
  assert.match(clean, /<h2>Cuisine<\/h2>/);
  assert.match(clean, /<strong>Élégant<\/strong>/);
  assert.match(clean, /href="\/shop"/);
  assert.match(clean, /colspan="2"/);
  assert.doesNotMatch(clean, /data:|src="\/\//);
  assert.equal(sanitizeRichHtml(null), '');
});

async function loadAuth({ status, cachedUser = '{"type":"admin"}' } = {}) {
  const source = (await readFile(new URL('../src/services/auth.js', import.meta.url), 'utf8'))
    .replace(/^import .*;\r?\n/gm, '').replace(/export const /g, 'const ');
  const storage = new Map([['access_token', 'test-token'], ['user', cachedUser]]);
  const cookies = new Map([['access_token', 'test-token'], ['user', cachedUser]]);
  const calls = [];
  const context = vm.createContext({
    window: { location: { protocol: 'https:' } },
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    Cookies: { remove: key => cookies.delete(key), set: (key, value, options) => { cookies.set(key, value); calls.push({ key, options }); } },
    api: {
      get: async endpoint => { calls.push(endpoint); if (status) throw { response: { status } }; return { data: { id: 1, type: 'customer' } }; },
      post: async () => ({ data: { access_token: 'test-token', user: { id: 1 } } }),
    },
  });
  vm.runInContext(source + '\nthis.auth = { User, login, logout };', context);
  return { auth: context.auth, storage, cookies, calls };
}

test('cached user data does not bypass backend session validation', async () => {
  const { auth, calls } = await loadAuth();
  const user = await auth.User();
  assert.equal(user.type, 'customer');
  assert.deepEqual(calls, ['user']);
});

test('invalid sessions clear browser credentials; transient failures retain them', async () => {
  for (const status of [401, 403, 503]) {
    const { auth, storage, cookies } = await loadAuth({ status });
    assert.equal(await auth.User(), null);
    assert.equal(storage.has('access_token'), status === 503);
    assert.equal(cookies.has('access_token'), status === 503);
  }
});

test('login cookies explicitly use Secure on HTTPS and SameSite=Lax', async () => {
  const { auth, calls } = await loadAuth();
  await auth.login({ login: 'test@example.test', password: 'test' });
  assert.equal(calls.length, 2);
  for (const { options } of calls) {
    assert.equal(options.secure, true);
    assert.equal(options.sameSite, 'Lax');
  }
});
