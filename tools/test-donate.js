/* Tests for donate-2026.js (Donate 2.0, page 7643000, also jewishriverside.com/donation, and the
   2026 Matching Campaign page 7642564), with a fake Stripe.js, a fake Apps Script and a fake ChabadOne
   form. Also the no-flash cover: header.js hides these pages before they are drawn, footer.js and
   donate-2026.js take the cover off. Nothing real is called.
   Run from the repo root: node tools/test-donate.js */
'use strict';
var fs = require('fs'), path = require('path');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
var ROOT = path.join(__dirname, '..');
var PAGES_BASE = 'https://virtualshliach.github.io/riverside-footer/';
function testSrc(s) {
  return s.replace(/ENDPOINT: '[^']*',/, "ENDPOINT: 'https://script.google.com/macros/s/TESTDEPLOY/exec',")
    .replace(/PUBLISHABLE_KEY: '[^']*',/, "PUBLISHABLE_KEY: 'pk_test_abc',");
}
var SRC = testSrc(fs.readFileSync(path.join(ROOT, 'donate-2026.js'), 'utf8'));
var HEADER = fs.readFileSync(path.join(ROOT, 'header.js'), 'utf8');
var FOOTER = fs.readFileSync(path.join(ROOT, 'footer.js'), 'utf8');

var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  ok   ' + m); } else { fail++; console.log('  FAIL ' + m); } }
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

var DONATE = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7643000/jewish/Donate-20.htm';
var SHORT = 'https://www.jewishriverside.com/donation';
var MATCHP = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7642564/jewish/2026-Matching-Campaign-Give-Now.htm';
var PAGES_INTRO = 'Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.';
var OLD6 = ['General', 'Adult Education', 'College Programs', 'Synagogue', 'Visitation', 'Youth Programs'];
var LABELS = ['Annual Matching Campaign', 'Where it’s needed most', 'Adult Education', 'College Programs (Chabad at UCR)',
  'Synagogue', 'Youth Programs', 'Social Services', 'Chanukah Festival', 'Riverside Mikvah', 'Shabbat & Holidays'];
var VALUES = ['Annual Matching Campaign', 'General', 'Adult Education', 'College Programs', 'Synagogue', 'Youth Programs',
  'Social Services', 'Chanukah Festival', 'Riverside Mikvah', 'Shabbat & Holidays'];

/* a ChabadOne-shaped form; fundSelect: input_8 is a list of the 6 old funds (worst case) */
function coForm(id, fundSelect) {
  var f = '<div id="formContainer"><form id="' + id + '" class="userform-form"><ul>';
  for (var i = 1; i <= 12; i++) {
    if (i === 2) continue;
    if (i === 8 && fundSelect) f += '<li><select id="input_8">' + OLD6.map(function (x) { return '<option value="' + x + '">' + x + '</option>'; }).join('') + '</select></li>';
    else f += '<li><input id="input_' + i + '" type="text"></li>';
  }
  return f + '<li><button id="input_2" type="button">Submit</button></li></ul></form></div>';
}
function aidOf(url) { return /7642564/.test(url) ? '7642564' : /7643000|\/donation/i.test(url) ? '7643000' : '5333083'; }
function shell(url, opts) {
  opts = opts || {};
  var aid = aidOf(url), withForm = aid === '7643000';
  return '<!doctype html><html><head>' + (opts.head || '') + '</head><body><div id="co_content_container"><h1 class="article-header__title">' +
    (withForm ? 'Donate 2.0' : aid === '7642564' ? '2026 Matching Campaign Give Now' : 'Join') + '</h1>' + (withForm ? coForm('7643000') : '<p>Old page text</p>') +
    '</div><form class="userform-form" id="newsletter-footer"><input id="nl"></form>' +
    '<script>window.Co = { ArticleId: ' + aid + ' };</script>' + (opts.tail || '') + '</body></html>';
}

/* Unit page: donate-2026.js injected straight in (fake Stripe, Apps Script and ChabadOne frame). */
function page(url, opts) {
  opts = opts || {};
  var dom = new JSDOM(shell(url), { url: url, runScripts: 'dangerously', pretendToBeVisual: true });
  var w = dom.window, T = { posts: [], errors: [], logs: [], frames: [] };
  w.console.log = function () { T.logs.push([].join.call(arguments, ' ')); };
  w.console.error = function () { T.errors.push([].join.call(arguments, ' ')); };
  w.addEventListener('error', function (e) { T.errors.push(e.message); });
  w.HTMLElement.prototype.scrollIntoView = function () {};
  if (opts.pv) w.CFDONATE_PREVIEW = opts.pv;
  w.fetch = function (u, o) {
    var b = JSON.parse(o.body);
    T.posts.push({ url: u, body: b });
    if (b.action === 'remindLater') {
      if (opts.remind === 'network') return Promise.reject(new TypeError('Failed to fetch'));
      var rr = opts.remind === 'live' ? { ok: false, error: 'Unknown request.' } : opts.remind === 'bademail' ? { ok: false, error: 'Please enter a valid email address.' } : { ok: true };
      return Promise.resolve({ json: function () { return Promise.resolve(rr); } });
    }
    if (b.action === 'start') return Promise.resolve({ json: function () { return Promise.resolve({ ok: true, id: 'pi_T1', clientSecret: 'pi_T1_secret_x', mode: b.mode }); } });
    return Promise.resolve({ json: function () { return Promise.resolve({ ok: true, status: 'succeeded', receipt: true, method: 'Visa ending 4242' }); } });
  };
  w.Stripe = function (pk) {
    T.pk = pk;
    return {
      elements: function () { return { create: function () { var h = {}; return { on: function (ev, fn) { h[ev] = fn; }, mount: function () { setTimeout(function () { h.ready && h.ready(); }, 5); }, destroy: function () {} }; } }; },
      confirmPayment: function () { return Promise.resolve({ paymentIntent: { id: 'pi_T1', status: 'succeeded' } }); }
    };
  };
  /* catch the hidden ChabadOne frame, give it a ChabadOne-shaped form and "load" it */
  new w.MutationObserver(function (ms) {
    ms.forEach(function (m) {
      [].forEach.call(m.addedNodes, function (n) {
        if (n.tagName !== 'IFRAME') return;
        var fr = { src: n.getAttribute('src'), el: n };
        T.frames.push(fr);
        setTimeout(function () {
          var d = n.contentDocument;
          if (!d.documentElement) d.appendChild(d.createElement('html'));
          if (!d.body) d.documentElement.appendChild(d.createElement('body'));
          d.body.innerHTML = coForm('7643000', opts.fundSelect);
          d.getElementById('input_2').addEventListener('click', function () {
            fr.sent = {};
            for (var i = 1; i <= 12; i++) { var x = d.getElementById('input_' + i); if (x) fr.sent['input_' + i] = x.value; }
          });
          n.onload && n.onload();
        }, 10);
      });
    });
  }).observe(w.document.body, { childList: true, subtree: true });
  if (opts.preCover) {   /* as if header.js and footer.js had both put a cover up */
    var st = w.document.createElement('style'); st.id = 'dn26-cover'; st.textContent = 'body{opacity:0 !important}'; w.document.head.appendChild(st);
    var dv = w.document.createElement('div'); dv.id = 'dn26-cover'; w.document.body.appendChild(dv);
  }
  var s = w.document.createElement('script');
  s.textContent = SRC;
  w.document.body.appendChild(s);
  return wait(40).then(function () { return { w: w, d: w.document, T: T }; });
}

function funds(p) { return [].map.call(p.d.querySelectorAll('#dn26 .dn-funds .dn-fund'), function (b) { return b.getAttribute('data-f'); }); }
function labels(p) { return [].map.call(p.d.querySelectorAll('#dn26 .dn-funds .dn-fund'), function (b) { return b.textContent; }); }
function chosen(p) { var b = p.d.querySelector('#dn26 .dn-funds .dn-fund.on'); return b && b.getAttribute('data-f'); }
function pick(p, f) { [].filter.call(p.d.querySelectorAll('#dn26 .dn-fund'), function (x) { return x.getAttribute('data-f') === f; })[0].click(); }
function tog(p) { return p.d.querySelector('#dn26 .dn-funds button.dn-more'); }
function progs(p) { return p.d.getElementById('dn26-progs'); }
function isOpen(p) { var t = tog(p), g = progs(p); return t.getAttribute('aria-expanded') === 'true' && /\bopen\b/.test(g.className) && !g.hasAttribute('inert') && !g.hasAttribute('aria-hidden'); }
function isShut(p) { var t = tog(p), g = progs(p); return t.getAttribute('aria-expanded') === 'false' && !/\bopen\b/.test(g.className) && g.hasAttribute('inert') && g.getAttribute('aria-hidden') === 'true'; }
function togText(p) { return tog(p).querySelector('span').textContent; }
function btn(p, text) { return [].filter.call(p.d.querySelectorAll('#dn26 button'), function (b) { return b.textContent.trim() === text; })[0]; }
async function give(p) {
  btn(p, '$100').click();
  btn(p, 'Continue').click();
  [['first', 'Test'], ['last', 'Donor'], ['email', 'test@example.com']].forEach(function (f) { p.d.getElementById('dn26-' + f[0]).value = f[1]; });
  p.d.querySelector('#dn26 .dn-gold').click();          /* Continue: starts the payment */
  await wait(80);
  p.d.querySelector('#dn26 .dn-gold').click();          /* Give $100 */
  await wait(400);
}
function startOf(p) { return p.T.posts.filter(function (x) { return x.body.action === 'start'; })[0]; }

/* Integrated page: real header.js in <head>, real footer.js at the end of <body>, files served from this repo. */
function full(url, opts) {
  opts = opts || {};
  var requests = [], errors = [];
  class RepoLoader extends jsdom.ResourceLoader {
    fetch(u) {
      requests.push(u);
      if (u.indexOf(PAGES_BASE) === 0) {
        var rel = decodeURIComponent(u.slice(PAGES_BASE.length).split('?')[0]);
        if (opts.missing && rel === opts.missing) return Promise.reject(new Error('404 ' + u));
        if (opts.hang && rel === opts.hang) return Promise.resolve(Buffer.from('/* loaded but never draws */'));
        var file = path.join(ROOT, rel);
        if (file.indexOf(ROOT) === 0 && fs.existsSync(file)) return Promise.resolve(Buffer.from(rel === 'donate-2026.js' ? testSrc(fs.readFileSync(file, 'utf8')) : fs.readFileSync(file, 'utf8')));
        return Promise.reject(new Error('404 ' + u));
      }
      return Promise.resolve(Buffer.from(''));
    }
  }
  var snaps = {};
  var html = shell(url, {
    head: opts.noHeader ? '' : '<script src="' + PAGES_BASE + 'header.js"></script>',
    tail: (opts.noHeader ? '<script>new MutationObserver(function(){ if (document.querySelector("div#dn26-cover")) window.__footerDiv = true; }).observe(document.body,{childList:true});</script>' : '') +
      '<script>window.__beforeFooter = { style: !!document.querySelector("style#dn26-cover"), op: getComputedStyle(document.body).opacity };</script>' +
      '<script src="' + PAGES_BASE + 'footer.js"></script>'
  });
  var dom = new JSDOM(html, {
    url: url, runScripts: 'dangerously', resources: new RepoLoader(), pretendToBeVisual: true,
    beforeParse: function (w) {
      w.console.log = function () {};
      w.console.error = function () { errors.push([].join.call(arguments, ' ')); };
      w.addEventListener('error', function (e) { errors.push(e.message); });
      w.fetch = function () { return Promise.reject(new Error('offline')); };
    }
  });
  return wait(opts.wait || 500).then(function () {
    var d = dom.window.document;
    return { footerDiv: !!dom.window.__footerDiv, w: dom.window, d: d, errors: errors, requests: requests, before: dom.window.__beforeFooter,
      covers: d.querySelectorAll('[id="dn26-cover"]').length, opacity: dom.window.getComputedStyle(d.body).opacity };
  });
}
function headerOnly(url) {
  var dom = new JSDOM('<!doctype html><html><head></head><body><h1>old</h1></body></html>', { url: url, runScripts: 'outside-only' });
  dom.window.eval(HEADER);
  return dom.window.document.querySelector('style#dn26-cover');
}

(async function () {
  console.log('covers: header.js and footer.js');
  var hCov = {}, fCov = {};
  HEADER.replace(/'(\d+)':\s*\{\s*coverId:\s*'([^']+)',\s*cover:\s*'([^']+)'/g, function (_, a, id, c) { hCov[a] = id + ' ' + c; });
  FOOTER.replace(/'(\d+)':\s*\{[^}]*?cover:\s*'([^']+)',\s*coverId:\s*'([^']+)'/g, function (_, a, c, id) { fCov[a] = id + ' ' + c; });
  ok(hCov['7643000'] === 'dn26-cover #ffffff' && hCov['7642564'] === 'dn26-cover #ffffff', 'header.js covers 7643000 and 7642564 (dn26-cover, white)');
  ok(fCov['7643000'] === 'dn26-cover #ffffff' && fCov['7642564'] === 'dn26-cover #ffffff', 'footer.js covers 7643000 and 7642564 (dn26-cover, white)');
  ok(/'7643000': \{ file: 'donate-2026\.js'/.test(FOOTER) && /'7642564': \{ file: 'donate-2026\.js'/.test(FOOTER), 'footer.js loads donate-2026.js on both pages');
  var hp = /var PATHS = \{([^}]*)\}/.exec(HEADER), fp = /var PATHS = \{([^}]*)\}/.exec(FOOTER), dp = /var PATHS = \{([^}]*)\}/.exec(SRC);
  ok(hp && fp && dp && hp[1].replace(/\s/g, '') === fp[1].replace(/\s/g, '') && fp[1].replace(/\s/g, '') === dp[1].replace(/\s/g, '') && /'\/donation':'7643000'/.test(hp[1].replace(/\s/g, '')),
    'PATHS is the same in header.js, footer.js and donate-2026.js (' + (hp && hp[1].trim()) + ')');
  var PRE = /\^\(\\\/\[a-z0-9-\]\+\)[^\n]*?\/i/;
  var reH = PRE.exec(HEADER), reF = PRE.exec(FOOTER), reD = PRE.exec(SRC);
  ok(reH && reF && reD && reH[0] === reF[0] && reF[0] === reD[0], 'the short-address pattern is the same in all three files');

  console.log('covers: which addresses header.js hides');
  [SHORT, 'https://www.jewishriverside.com/DONATION/', 'https://jewishriverside.com/Donation', SHORT + '/designation/matching', SHORT + '?designation=matching',
    SHORT + '/payment_intent/pi_1/payment_intent_client_secret/x', DONATE, MATCHP, 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7643000/jewish/Donate-20.htm?designation=college']
    .forEach(function (u) { var s = headerOnly(u); ok(s && /body\{opacity:0 !important\}/.test(s.textContent) && /#ffffff/.test(s.textContent) && !/display:none/.test(s.textContent), 'covered (opacity, white): ' + u.replace('https://', '')); });
  ['https://www.jewishriverside.com/donate', 'https://www.jewishriverside.com/donations', 'https://www.jewishriverside.com/donation/other',
    'https://www.jewishriverside.com/donation-old', 'https://www.jewishriverside.com/', 'https://www.chanukahfestival.org/donation',
    'https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/7643000/jewish/Donate-20.htm',
    'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7643000/jewish/Donate-20.htm#cf-sync', SHORT + '#cf-sync',
    'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5333083/jewish/Join.htm']
    .forEach(function (u) { ok(!headerOnly(u), 'not covered: ' + u.replace('https://', '')); });

  console.log('covers: the whole page (header.js + footer.js + donate-2026.js)');
  var f1 = await full(SHORT);
  ok(f1.before && f1.before.style && f1.before.op === '0', 'jewishriverside.com/donation: old page hidden before footer.js runs (body opacity ' + (f1.before && f1.before.op) + ')');
  ok(f1.d.getElementById('dn26') && f1.covers === 0 && f1.opacity !== '0', 'form drawn, every cover removed, page visible');
  ok(f1.requests.some(function (u) { return /donate-2026\.js\?v=2026-11-26k$/.test(u); }), 'footer.js loads donate-2026.js with the new version stamp');
  ok(f1.errors.length === 0, 'no script errors (' + f1.errors.join('; ') + ')');
  var f2 = await full(MATCHP);
  ok(f2.before.op === '0' && f2.d.getElementById('dn26') && f2.covers === 0 && f2.opacity !== '0', 'matching page 7642564: hidden first, then drawn and uncovered');
  var f3 = await full(DONATE);
  ok(f3.before.op === '0' && f3.d.getElementById('dn26') && f3.covers === 0, 'Donate 2.0 by its /aid/ address: hidden first, then drawn and uncovered');
  var f4 = await full(DONATE.replace('articlecco_cdo', 'ArticleCcoResponse'));
  ok(!f4.before.style && f4.covers === 0 && !f4.d.getElementById('dn26') && f4.opacity !== '0', 'ChabadOne response page: never covered, nothing drawn');
  var f5 = await full(SHORT, { missing: 'donate-2026.js' });
  ok(f5.before.op === '0' && f5.covers === 0 && f5.opacity !== '0' && !f5.d.getElementById('dn26'), 'donate-2026.js fails to load: cover taken off at once, old page shows');
  var f6 = await full(SHORT, { hang: 'donate-2026.js', wait: 600 });
  ok(f6.covers === 1 && f6.opacity === '0', 'donate-2026.js loads but never draws: still covered at 0.6 s');
  await wait(7800);
  ok(f6.d.querySelectorAll('[id="dn26-cover"]').length === 0 && f6.w.getComputedStyle(f6.d.body).opacity !== '0', 'safety timeout: page visible again after 8 s');
  var f8 = await full(DONATE, { noHeader: true });
  ok(f8.footerDiv && f8.covers === 0 && f8.d.getElementById('dn26'), 'without header.js (old cached header): footer.js puts up its own white cover, removed once drawn');
  var f7 = await full('https://www.jewishriverside.com/donation/designation/matching');
  ok(f7.d.getElementById('dn26') && f7.covers === 0, '/donation/designation/matching: drawn and uncovered');

  console.log('covers: donate-2026.js on its own');
  var c1 = await page(DONATE, { preCover: true });
  ok(c1.d.getElementById('dn26') && !c1.d.getElementById('dn26-cover'), 'removes both covers (header <style> and footer <div>) once the form is drawn');
  var nohost = new JSDOM('<!doctype html><html><head><style id="dn26-cover">body{opacity:0}</style></head><body><script>window.Co={ArticleId:7643000}</script></body></html>', { url: SHORT, runScripts: 'dangerously' });
  nohost.window.console.log = function () {};
  var ns = nohost.window.document.createElement('script'); ns.textContent = SRC; nohost.window.document.body.appendChild(ns);
  await wait(30);
  ok(!nohost.window.document.getElementById('dn26-cover') && !nohost.window.document.getElementById('dn26'), 'no place for the form: cover removed anyway');

  console.log('chips: Donate 2.0 (7643000)');
  var a = await page(DONATE);
  ok(a.d.getElementById('dn26'), 'form is on the page');
  ok(labels(a).join('|') === LABELS.join('|'), '10 choices, exact labels and order (' + labels(a).join(' | ') + ')');
  ok(funds(a).join('|') === VALUES.join('|'), 'fund values behind them (' + funds(a).join(' | ') + ')');
  var first = a.d.querySelector('#dn26 .dn-funds .dn-fund');
  ok(/\bdn-feat\b/.test(first.className) && first.getAttribute('data-f') === 'Annual Matching Campaign', 'Annual Matching Campaign is first and featured (class dn-feat)');
  ok(a.d.querySelectorAll('#dn26 .dn-fund.dn-feat').length === 1, 'only one featured choice');
  var css = a.d.getElementById('dn26-css').textContent;
  ok(/\.dn-fund\.dn-feat\{grid-column:1\/-1;[^}]*border:2px solid #e9b949/.test(css), 'featured choice: its own full-width row with a gold border');
  ok(/\.dn-pgrid\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)\);grid-auto-rows:1fr/.test(css) && /max-width:640px\)\{[^@]*\.dn-pgrid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/.test(css), 'programs: equal boxes, 4 across, 2 across up to 640px (phones)');
  ok(/\.dn-fund\{display:flex;align-items:center;justify-content:center;text-align:center;min-height:54px/.test(css), 'choices: same height, text centered');
  ok(!a.d.querySelector('#dn26 .dn-ded') && !/No dedication/.test(a.d.getElementById('dn26').textContent), 'old 3 dedication boxes are gone');
  ok(a.d.querySelectorAll('#dn26 .dn-fund.dn-wide').length === 1 && a.d.querySelector('#dn26 .dn-fund.dn-wide').getAttribute('data-f') === 'General', 'Where it’s needed most has its own row');
  ok(/max-width:480px\)\{[^@]*\.dn-hd\{flex-direction:column;text-align:center/.test(css), 'phones: header logo centered above the heading');
  ok(chosen(a) === 'General', 'default choice on Donate 2.0: Where it’s needed most (General)');
  ok(labels(a).indexOf('Visitation') < 0, 'Visitation no longer shown (Social Services replaces it)');
  ok(!labels(a).some(function (t) { return /[–—]| - /.test(t); }), 'no dashes in the labels');
  ok(a.d.querySelector('#dn26 .dn-hd h2').textContent === 'Invest in a Vibrant Jewish Future' && a.d.querySelector('h1').textContent === 'Donate', 'heading Invest in a Vibrant Jewish Future; page title "Donate 2.0" shows as Donate');
  ok(a.d.querySelector('#dn26 .dn-hd span').textContent === 'Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.', 'subtitle: the ripple sentence (' + a.d.querySelector('#dn26 .dn-hd span').textContent + ')');
  ok(!/Jewish life growing|for every age/.test(a.d.querySelector('#dn26 .dn-hd').textContent), 'subtitle: old "Jewish life growing" sentence gone');
  ok(/dn26-park/.test(a.d.getElementById('formContainer').className) && !/dn26-park/.test(a.d.getElementById('newsletter-footer').className), 'its ChabadOne form is parked off-screen; other forms untouched');
  pick(a, 'Annual Matching Campaign');
  ok(chosen(a) === 'Annual Matching Campaign' && /\bdn-feat\b/.test(first.className) && /\bon\b/.test(first.className), 'the featured choice can be selected like the others');
  pick(a, 'General');
  ok(a.T.errors.length === 0, 'no script errors (' + a.T.errors.join('; ') + ')');

  console.log('programs: collapsible grid');
  var g = await page(DONATE);
  var gt = tog(g), gp = progs(g);
  var tops = [].map.call(g.d.querySelectorAll('#dn26 .dn-funds > .dn-fund'), function (b) { return b.getAttribute('data-f'); });
  ok(tops.join('|') === 'Annual Matching Campaign|General', 'always shown: Annual Matching Campaign and Where it’s needed most (' + tops.join(' | ') + ')');
  var inGrid = [].map.call(gp.querySelectorAll('.dn-pgrid .dn-fund'), function (b) { return b.getAttribute('data-f'); });
  ok(inGrid.join('|') === VALUES.slice(2).join('|'), 'the 8 programs are in the grid, in order (' + inGrid.join(' | ') + ')');
  ok(gt && gt.tagName === 'BUTTON' && gt.type === 'button' && gt.getAttribute('aria-controls') === 'dn26-progs' && gp, 'toggle is a real button (type=button) with aria-controls="dn26-progs"');
  ok(gt.compareDocumentPosition(gp) & 4 && g.d.querySelector('#dn26 .dn-fund.dn-wide').compareDocumentPosition(gt) & 4, 'toggle sits below Where it’s needed most, the grid below the toggle');
  ok(gt.querySelector('i[aria-hidden="true"]') && /\.dn-more\[aria-expanded="true"\] i\{transform:[^}]*rotate\(-135deg\)/.test(css), 'chevron (CSS) rotates when open');
  ok(/\.dn-more:focus-visible[^{]*\{outline:3px solid/.test(css), 'visible focus style on the toggle');
  ok(/prefers-reduced-motion:reduce\)\{[^@]*\.dn-progs/.test(css) && /\.dn-progs\{display:grid;grid-template-rows:0fr/.test(css) && /\.dn-progs\.open\{grid-template-rows:1fr\}/.test(css), 'smooth open (grid rows 0fr to 1fr), no motion if reduced motion is set');
  ok(/\.dn-pgrid\{[^}]*visibility:hidden/.test(css) && /\.dn-progs\.open \.dn-pgrid\{visibility:visible/.test(css), 'closed grid is visibility:hidden (not focusable) after the slide');
  ok(isShut(g) && togText(g) === 'Choose a specific program', 'default page: starts closed (aria-expanded=false, grid inert and hidden), "Choose a specific program"');
  gt.click();
  ok(isOpen(g), 'click opens it (aria-expanded=true)');
  pick(g, 'Youth Programs');
  ok(chosen(g) === 'Youth Programs' && togText(g) === 'Choose a specific program', 'pick Youth Programs while open');
  gt.click();
  ok(isShut(g) && togText(g) === 'Program: Youth Programs' && /\bsel\b/.test(gt.className), 'close: toggle reads "Program: Youth Programs" (selected style)');
  ok(chosen(g) === 'Youth Programs' && /\bon\b/.test(gp.querySelector('[data-f="Youth Programs"]').className), 'Youth Programs is still selected (.on)');
  pick(g, 'General');
  ok(togText(g) === 'Choose a specific program' && !/\bsel\b/.test(gt.className) && isShut(g), 'pick Where it’s needed most: toggle text back, grid stays closed');
  gt.click(); pick(g, 'College Programs'); gt.click();
  ok(togText(g) === 'Program: College Programs (Chabad at UCR)', 'closed with College Programs: "' + togText(g) + '"');
  pick(g, 'Annual Matching Campaign');
  ok(togText(g) === 'Choose a specific program' && chosen(g) === 'Annual Matching Campaign', 'pick Annual Matching Campaign: toggle text back');
  gt.click(); pick(g, 'Shabbat & Holidays'); gt.click();
  ok(togText(g) === 'Program: Shabbat & Holidays', '"&" shows as is: "' + togText(g) + '"');
  var gk = await page(DONATE + '?designation=mikvah');
  ok(isOpen(gk) && chosen(gk) === 'Riverside Mikvah', '?designation=mikvah: starts open, Riverside Mikvah selected');
  ok(isShut(await page(MATCHP)), 'matching page 7642564 (preset matching): starts closed');
  var gy = await page(SHORT + '/designation/youth');
  ok(isOpen(gy) && chosen(gy) === 'Youth Programs', '/donation/designation/youth: starts open with Youth Programs');
  ok(isShut(await page(DONATE + '?designation=general')), '?designation=general: starts closed');

  console.log('request to the Apps Script and the ChabadOne form, per fund');
  for (var i = 0; i < VALUES.length; i++) {
    var v = VALUES[i], p = await page(DONATE);
    pick(p, v);
    await give(p);
    var b = startOf(p) && startOf(p).body;
    var wantNote = OLD6.indexOf(v) > -1 ? '' : 'Applied to: ' + LABELS[i];
    var wantTag = v === 'Annual Matching Campaign' ? 'matching-2026' : undefined;
    ok(b && b.site === 'jr' && b.fund === v && b.note === wantNote && b.tag === wantTag,
      LABELS[i] + ': fund "' + (b && b.fund) + '", note "' + (b && b.note) + '", tag ' + (b && b.tag));
    var sent = p.T.frames[0] && p.T.frames[0].sent;
    ok(sent && sent.input_8 === v && sent.input_9 === '' && sent.input_6 === '100.00' && sent.input_7 === 'One-time' && sent.input_11 === 'pi_T1' && sent.input_12 === 'Paid',
      '  ChabadOne (text field): input_8 "' + (sent && sent.input_8) + '", amount 100.00, Paid');
    if (v !== 'General') ok(p.d.querySelector('#dn26 .dn-sum3').textContent.indexOf(LABELS[i]) > -1, '  payment summary names "' + LABELS[i] + '"');
    ok(/Thank you, Test!/.test(p.d.querySelector('#dn26 .dn-done').textContent) && /A confirmation has been emailed to you\./.test(p.d.querySelector('#dn26 .dn-done').textContent) && !/receipt is on its way/.test(p.d.querySelector('#dn26 .dn-done').textContent), '  thank-you says a confirmation was emailed (new Apps Script wording)');
  }

  console.log('ChabadOne fund field is a list (only the 6 old funds)');
  var s1 = await page(DONATE + '?designation=social', { fundSelect: true });
  await give(s1);
  var sent1 = s1.T.frames[0] && s1.T.frames[0].sent;
  ok(sent1 && sent1.input_8 === 'General' && sent1.input_9 === 'Fund: Social Services', 'Social Services: list set to General, "Fund: Social Services" in input_9 (' + JSON.stringify(sent1 && [sent1.input_8, sent1.input_9]) + ')');
  var s2 = await page(MATCHP, { fundSelect: true });
  await give(s2);
  var sent2 = s2.T.frames[0] && s2.T.frames[0].sent;
  ok(sent2 && sent2.input_8 === 'General' && sent2.input_9 === 'Fund: Annual Matching Campaign', 'matching: list set to General, "Fund: Annual Matching Campaign" in input_9');
  var s3 = await page(DONATE + '?designation=college', { fundSelect: true });
  await give(s3);
  var sent3 = s3.T.frames[0] && s3.T.frames[0].sent;
  ok(sent3 && sent3.input_8 === 'College Programs' && sent3.input_9 === '', 'College Programs is on the list: goes in as is, input_9 empty');

  console.log('link presets (?designation=)');
  var PRE = { matching: 'Annual Matching Campaign', match: 'Annual Matching Campaign', 'annual-matching': 'Annual Matching Campaign',
    'annual-matching-campaign': 'Annual Matching Campaign', general: 'General', college: 'College Programs', 'college-programs': 'College Programs',
    'college-programs-chabad-at-ucr': 'College Programs', youth: 'Youth Programs', 'youth-programs': 'Youth Programs', social: 'Social Services',
    'social-services': 'Social Services', visitation: 'Social Services', chanukah: 'Chanukah Festival', festival: 'Chanukah Festival',
    'chanukah-festival': 'Chanukah Festival', mikvah: 'Riverside Mikvah', 'riverside-mikvah': 'Riverside Mikvah', shabbat: 'Shabbat & Holidays',
    holidays: 'Shabbat & Holidays', 'shabbat-holidays': 'Shabbat & Holidays', 'shabbat-%26-holidays': 'Shabbat & Holidays', 'Shabbat+%26+Holidays': 'Shabbat & Holidays',
    'Riverside+Mikvah': 'Riverside Mikvah', 'adult-education': 'Adult Education', synagogue: 'Synagogue', 'Youth+Programs': 'Youth Programs', nonsense: 'General' };
  for (var k in PRE) { var got = chosen(await page(DONATE + '?designation=' + k)); ok(got === PRE[k], '?designation=' + k + ' -> ' + got); }
  ok(chosen(await page(DONATE.replace(/\.htm$/, '.htm/designation/matching'))) === 'Annual Matching Campaign', '/designation/matching (ChabadOne path form)');
  ok(chosen(await page(SHORT + '?designation=matching')) === 'Annual Matching Campaign', 'jewishriverside.com/donation?designation=matching');
  ok(chosen(await page(SHORT + '/designation/youth')) === 'Youth Programs', 'jewishriverside.com/donation/designation/youth');

  var s5 = await page(DONATE + '?designation=shabbat', { fundSelect: true });
  await give(s5);
  var sent5 = s5.T.frames[0] && s5.T.frames[0].sent;
  ok(sent5 && sent5.input_8 === 'General' && sent5.input_9 === 'Fund: Shabbat & Holidays', 'Shabbat & Holidays: list set to General, "Fund: Shabbat & Holidays" in input_9 (' + JSON.stringify(sent5 && [sent5.input_8, sent5.input_9]) + ')');

  console.log('jewishriverside.com/donation (no page id in the address)');
  var dn = await page(SHORT);
  ok(dn.d.getElementById('dn26') && chosen(dn) === 'General', 'form drawn, General preset');
  await give(dn);
  ok(dn.T.frames[0] && dn.T.frames[0].src === '/donation#cf-sync', 'ChabadOne copy: /donation#cf-sync (' + (dn.T.frames[0] && dn.T.frames[0].src) + ')');
  var dnNoCo = new JSDOM('<!doctype html><html><head></head><body><div id="co_content_container">' + coForm('7643000') + '</div></body></html>', { url: SHORT, runScripts: 'dangerously' });
  dnNoCo.window.console.log = function () {};
  var s4 = dnNoCo.window.document.createElement('script'); s4.textContent = SRC; dnNoCo.window.document.body.appendChild(s4);
  await wait(30);
  ok(dnNoCo.window.document.getElementById('dn26'), 'works from the short address alone, even without window.Co');

  console.log('2026 Matching Campaign page (7642564)');
  var m = await page(MATCHP);
  ok(m.d.getElementById('co_content_container').contains(m.d.getElementById('dn26')), 'form sits inside the article');
  ok(m.d.querySelector('h1').textContent === '2026 Annual Matching Campaign' && m.d.querySelector('#dn26 .dn-hd h2').textContent === 'Invest in a Vibrant Jewish Future', 'matching page: H1 2026 Annual Matching Campaign, H2 Invest in a Vibrant Jewish Future');
  ok([a, m].every(function (p) { var h = p.d.querySelector('#dn26 .dn-hd'); return /\bdn-hx dn-hxA\b/.test(h.className) && !h.querySelector('i') && /chabad-jcc-logo-navy-gold\.png$/.test(h.querySelector('img').src) && h.querySelector('img').alt === 'Chabad Jewish Community Center of Riverside'; }), 'both pages: light header (option A), navy logo with the full name as alt text, no gold kicker line');
  ok(fs.existsSync(path.join(ROOT, 'chabad-jcc-logo-navy-gold.png')), 'navy and gold logo file is in the repo');
  ok(chosen(m) === 'Annual Matching Campaign', 'preset fund: Annual Matching Campaign');
  ok(labels(m).join('|') === LABELS.join('|'), 'same 10 choices');
  ok(m.d.querySelector('h1').textContent === '2026 Annual Matching Campaign', 'page title: 2026 Annual Matching Campaign');
  ok(m.d.querySelector('#dn26 .dn-hd span').textContent === 'Give now to our 2026 Annual Matching Campaign. ' + 'Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.', 'matching subtitle: campaign lead-in, then the ripple sentence');
  ok(!/Jewish life growing|for every age/.test(m.d.querySelector('#dn26 .dn-hd').textContent), 'matching subtitle: old sentence gone');
  ok(m.d.title === '2026 Annual Matching Campaign - Chabad Jewish Community Center of Riverside', 'browser tab title');
  ok(!/\d+\s*(x|:1|%)|match(es|ed)? (by|up to)|\$\d/i.test(m.d.querySelector('#dn26 .dn-hd').textContent), 'no match ratio or dollar amount in the header');
  ok(!/[–—]| - /.test(m.d.querySelector('#dn26 .dn-hd').textContent), 'no dashes in the header text');
  ok(!/dn26-park/.test(m.d.getElementById('newsletter-footer').className), 'no form parked on this page');
  await give(m);
  var mb = startOf(m).body;
  ok(mb.fund === 'Annual Matching Campaign' && mb.note === 'Applied to: Annual Matching Campaign' && mb.tag === 'matching-2026' && /7642564/.test(mb.page), 'start: fund, note "Applied to: Annual Matching Campaign", tag matching-2026, page 7642564');
  ok(m.T.frames.length === 1 && m.T.frames[0].src === '/templates/articlecco_cdo/aid/7643000/jewish/Donate-20.htm#cf-sync', 'ChabadOne copy: Donate 2.0’s form');
  ok(m.T.frames[0].sent && m.T.frames[0].sent.input_8 === 'Annual Matching Campaign', 'ChabadOne gets fund Annual Matching Campaign');
  var m2 = await page(MATCHP);
  pick(m2, 'Youth Programs');
  await give(m2);
  var m2b = startOf(m2).body;
  ok(m2b.fund === 'Youth Programs' && m2b.note === '' && m2b.tag === 'matching-2026', 'another fund picked on the matching page still carries tag matching-2026');


  console.log('dedication: one checkbox');
  var dd = await page(DONATE);
  var chk = dd.d.getElementById('dn26-dedchk'), dbox = dd.d.getElementById('dn26-dedbox');
  var chkLab = chk && chk.closest('label');
  ok(chk && chk.type === 'checkbox' && !chk.checked && chkLab && chkLab.getAttribute('for') === 'dn26-dedchk' && chkLab.textContent.replace(/\u00a0/g, ' ') === 'Dedicate this gift in honor or in memory',
    'a real <input type=checkbox>, unchecked, with its label "Dedicate this gift in honor or in memory"');
  ok(dbox.hidden && chk.getAttribute('aria-expanded') === 'false' && chk.getAttribute('aria-controls') === 'dn26-dedbox', 'unchecked: toggle and name hidden (aria-expanded=false, aria-controls)');
  ok(dd.d.getElementById('dn26-dedbox').compareDocumentPosition(dd.d.querySelector('#dn26 .dn-funds')) & 2, 'checkbox comes after "Apply my gift to"');
  chk.click();
  var dSegBtns = [].slice.call(dbox.querySelectorAll('.dn-seg button'));
  ok(chk.checked && !dbox.hidden && chk.getAttribute('aria-expanded') === 'true', 'checking it reveals the box (aria-expanded=true)');
  ok(dSegBtns.map(function (b) { return b.textContent; }).join('|') === 'In honor|In memory' && dSegBtns.every(function (b) { return b.type === 'button'; }), 'In honor / In memory: two buttons in one segmented control');
  ok(/\bon\b/.test(dSegBtns[0].className) && dSegBtns[0].getAttribute('aria-pressed') === 'true' && dSegBtns[1].getAttribute('aria-pressed') === 'false', 'In honor is the default (aria-pressed)');
  ok(dd.d.getElementById('dn26-dedname') && dbox.contains(dd.d.getElementById('dn26-dedname')), 'the name field is inside the box');
  var dLab = dd.d.querySelector('#dn26 .dn-dedname span');
  ok(dLab.textContent === 'In honor of *' && dd.d.querySelector('#dn26 .dn-dedname').getAttribute('for') === 'dn26-dedname', 'name label "In honor of *" tied to the field');
  dSegBtns[1].click();
  ok(dLab.textContent === 'In memory of *' && dSegBtns[1].getAttribute('aria-pressed') === 'true' && dSegBtns[0].getAttribute('aria-pressed') === 'false', 'In memory selected: label "In memory of *"');
  var dcss = dd.d.getElementById('dn26-css').textContent;
  ok(/\.dn-seg\{display:flex/.test(dcss) && /\.dn-seg button\{flex:1/.test(dcss), 'segments are equal (flex:1 each)');
  btn(dd, '$36').click();
  btn(dd, 'Continue').click();
  ok(/name for your dedication/.test(dd.d.querySelector('#dn26 .dn-err').textContent) && dd.d.querySelector('#dn26 .dn-pane.on') === dd.d.querySelector('#dn26 .dn-pane'), 'checked with no name: "Please enter the name for your dedication." and stays on step 1');
  chk.click();
  ok(!chk.checked && dbox.hidden, 'unchecking hides the box again');
  chk.click();
  ok(dSegBtns[1].getAttribute('aria-pressed') === 'true', 'checking again remembers In memory');
  chk.click();
  /* keyboard: Space on the focused checkbox (jsdom: the label/checkbox toggles via click) */
  chk.focus();
  ok(dd.d.activeElement === chk, 'checkbox can take keyboard focus');

  async function giveDed(kind, name, url, o) {
    var p = await page(url || DONATE, o);
    var c = p.d.getElementById('dn26-dedchk');
    if (kind) {
      c.click();
      if (kind === 'memory') [].filter.call(p.d.querySelectorAll('#dn26-dedbox .dn-seg button'), function (b) { return b.textContent === 'In memory'; })[0].click();
      p.d.getElementById('dn26-dedname').value = name;
      p.d.getElementById('dn26-dedname').dispatchEvent(new p.w.Event('input', { bubbles: true }));
    }
    await give(p);
    return p;
  }
  var NONE = await giveDed('', ''), HON = await giveDed('honor', 'Sarah Levi'), MEM = await giveDed('memory', 'Malka bas Yosef');
  var bN = startOf(NONE).body, bH = startOf(HON).body, bM = startOf(MEM).body;
  ok(bN.ded === '' && bN.dedname === '', 'none: Apps Script gets ded "" and dedname "" (as before)');
  ok(bH.ded === 'honor' && bH.dedname === 'Sarah Levi', 'honor: ded "honor", dedname "Sarah Levi"');
  ok(bM.ded === 'memory' && bM.dedname === 'Malka bas Yosef', 'memory: ded "memory", dedname "Malka bas Yosef"');
  ok(Object.keys(bH).sort().join(',') === Object.keys(bN).sort().join(','), 'same request fields as before (' + Object.keys(bH).sort().join(',') + ')');
  ok(NONE.T.frames[0].sent.input_9 === '' && HON.T.frames[0].sent.input_9 === 'In honor of Sarah Levi' && MEM.T.frames[0].sent.input_9 === 'In memory of Malka bas Yosef',
    'ChabadOne input_9: "", "In honor of Sarah Levi", "In memory of Malka bas Yosef"');
  ok(/in memory of Malka bas Yosef/.test(MEM.d.querySelector('#dn26 .dn-done').textContent), 'thank-you mentions the dedication');
  var UNC = await page(DONATE);
  UNC.d.getElementById('dn26-dedchk').click();
  UNC.d.getElementById('dn26-dedname').value = 'Typed then unchecked';
  UNC.d.getElementById('dn26-dedchk').click();
  await give(UNC);
  ok(startOf(UNC).body.ded === '' && startOf(UNC).body.dedname === '' && UNC.T.frames[0].sent.input_9 === '', 'typed a name, then unchecked: no dedication is sent');
  var SOC = await giveDed('honor', 'Dovid', DONATE + '?designation=social', { fundSelect: true });
  ok(SOC.T.frames[0].sent.input_9 === 'Fund: Social Services. In honor of Dovid', 'fund list without the fund: "Fund: Social Services. In honor of Dovid" (unchanged rule)');

  console.log('monthly: yearly total');
  var mo = await page(DONATE);
  var yl = mo.d.getElementById('dn26-yearly');
  function ylt() { return yl.textContent.replace(/\u00a0/g, ' '); }
  ok(yl && yl.textContent === '' && yl.getAttribute('aria-live') === 'polite', 'one time (default): no yearly line; the line is aria-live polite');
  ok(btn(mo, 'One time').getAttribute('aria-pressed') === 'true', 'One time is still the default');
  btn(mo, '$36').click();
  ok(yl.textContent === '', 'one time with $36: still no yearly line');
  ok(/dn-mon/.test(btn(mo, 'Monthly').className) && /\.dn-seg button\.dn-mon::before\{content:"\\\\2665"/.test(SRC), 'Monthly tab has the small heart (CSS ::before, text stays "Monthly")');
  btn(mo, 'Monthly').click();
  ok(btn(mo, 'Monthly').className === 'dn-mon on', 'Monthly keeps its heart class when picked');
  ok(ylt() === '$36/month = $432 a year of impact', 'Monthly + $36: "' + yl.textContent + '"');
  ok(yl.compareDocumentPosition(mo.d.querySelector('#dn26 .dn-chips')) & 2, 'the line sits under the amounts');
  btn(mo, '$500').click();
  ok(ylt() === '$500/month = $6,000 a year of impact', '$500: "' + yl.textContent + '"');
  var oth = mo.d.getElementById('dn26-other');
  oth.value = '18.50'; oth.dispatchEvent(new mo.w.Event('input', { bubbles: true }));
  ok(ylt() === '$18.50/month = $222 a year of impact', 'Other 18.50: "' + yl.textContent + '"');
  oth.value = '7.33'; oth.dispatchEvent(new mo.w.Event('input', { bubbles: true }));
  ok(ylt() === '$7.33/month = $87.96 a year of impact', 'Other 7.33: "' + yl.textContent + '"');
  oth.value = '1250'; oth.dispatchEvent(new mo.w.Event('input', { bubbles: true }));
  ok(ylt() === '$1,250/month = $15,000 a year of impact', 'Other 1250: "' + yl.textContent + '"');
  oth.value = ''; oth.dispatchEvent(new mo.w.Event('input', { bubbles: true }));
  ok(yl.textContent === '', 'Other cleared: line hidden');
  btn(mo, '$100').click(); btn(mo, 'One time').click();
  ok(yl.textContent === '', 'back to One time: line hidden');
  ok(!/[–—]/.test('$36/month = $432 a year of impact'), 'no dashes in the wording');

  console.log('"Complete your gift" bar');
  var IDLE = 120;
  function inViewStub(p, visible) { var n = btn(p, 'Continue'); n.getBoundingClientRect = function () { return visible() ? { top: 500, bottom: 548, left: 0, right: 100, width: 100, height: 48 } : { top: -300, bottom: -252, left: 0, right: 100, width: 100, height: 48 }; }; }
  function bar(p) { return p.d.getElementById('dn26-nudge'); }
  function scroll(p) { p.w.dispatchEvent(new p.w.Event('scroll')); }
  var n0 = await page(DONATE, { pv: { nudgeIdleMs: IDLE } });
  await wait(IDLE * 2);
  ok(!bar(n0), 'no amount chosen: no bar after the idle time');
  scroll(n0);
  ok(!bar(n0), 'no amount chosen: no bar on scroll');

  var n1 = await page(DONATE, { pv: { nudgeIdleMs: IDLE } });
  btn(n1, '$36').click();
  await wait(IDLE / 2);
  ok(!bar(n1), 'amount chosen: not yet before the idle time');
  await wait(IDLE + 40);
  var b1 = bar(n1);
  ok(b1 && b1.getAttribute('data-why') === 'idle', 'idle after choosing an amount: bar appears');
  ok(b1 && b1.getAttribute('role') === 'region' && b1.getAttribute('aria-live') === 'polite' && b1.getAttribute('aria-label') === 'Complete your gift', 'role=region, aria-live=polite, aria-label');
  ok(b1 && b1.querySelector('.dn-nmsg').textContent === 'Complete your $36 gift to make a difference', 'text: "' + (b1 && b1.querySelector('.dn-nmsg').textContent) + '"');
  btn(n1, 'Monthly').click();
  ok(b1.querySelector('.dn-nmsg').textContent === 'Complete your $36/month gift to make a difference', 'monthly: "' + b1.querySelector('.dn-nmsg').textContent + '"');
  ok(n1.d.body.style.paddingBottom !== '' && n1.w.sessionStorage.getItem('dn26-nudge') === '1', 'page gets bottom padding while shown (Continue never under the bar); marked shown for the session');
  var bcss = n1.d.getElementById('dn26-css').textContent;
  ok(/#dn26-nudge\{position:fixed;left:0;right:0;bottom:0;[^}]*env\(safe-area-inset-bottom/.test(bcss), 'fixed to the bottom, with the safe-area inset');
  var yes = [].filter.call(b1.querySelectorAll('button'), function (b) { return b.textContent === 'I’m ready'; })[0];
  ok(yes && [].some.call(b1.querySelectorAll('button'), function (b) { return b.textContent === 'Not today'; }) && b1.querySelector('button[aria-label="Close"]'), 'buttons: I’m ready, Not today, and Close (×)');
  var scrolled = false; btn(n1, 'Continue').scrollIntoView = function () { scrolled = true; };
  yes.click();
  ok(!bar(n1) && n1.d.activeElement === btn(n1, 'Continue') && scrolled, 'I’m ready: bar gone, Continue scrolled to and focused');
  ok(n1.d.body.style.paddingBottom === '', 'padding removed when the bar goes');
  await wait(IDLE * 2);
  ok(!bar(n1), 'does not come back on the same page');

  var n2 = await page(DONATE, { pv: { nudgeIdleMs: IDLE } });
  ok(n2.w.sessionStorage.getItem('dn26-nudge') === null, '(fresh session)');
  n2.w.sessionStorage.setItem('dn26-nudge', '1');
  btn(n2, '$50').click();
  await wait(IDLE * 2);
  ok(!bar(n2), 'once per session: already shown this session, so not again');

  var vis = true, n3 = await page(DONATE, { pv: { nudgeIdleMs: 100000 } });
  inViewStub(n3, function () { return vis; });
  btn(n3, '$100').click();
  scroll(n3);
  ok(!bar(n3), 'scroll with Continue still in view: no bar');
  vis = false; scroll(n3);
  var b3 = bar(n3);
  ok(b3 && b3.getAttribute('data-why') === 'scroll' && /\$100 gift/.test(b3.textContent), 'Continue scrolled out of view: bar appears ($100)');
  var no3 = [].filter.call(b3.querySelectorAll('button'), function (b) { return b.textContent === 'Not today'; })[0];
  no3.click();
  var b3b = bar(n3);
  ok(b3b && b3b.querySelector('h4').textContent === 'Maybe next time?' && b3b.getAttribute('aria-label') === 'Maybe next time?', 'Not today: panel "Maybe next time?"');
  var em3 = n3.d.getElementById('dn26-remind-email');
  ok(em3 && em3.type === 'email' && n3.d.querySelector('label[for="dn26-remind-email"]') && /Remind me later/.test(b3b.textContent) && /No, thanks/.test(b3b.textContent), 'email field with a label, Remind me later, No, thanks');
  await wait(60);
  ok(n3.d.activeElement === em3, 'focus moves to the email field');
  ok(!/[–—]/.test(b3b.textContent), 'no dashes in the panel text');
  [].filter.call(b3b.querySelectorAll('button'), function (b) { return b.textContent === 'Remind me later'; })[0].click();
  ok(/check your email/.test(b3b.querySelector('.dn-nerr').textContent) && !n3.T.posts.some(function (x) { return x.body.action === 'remindLater'; }), 'empty email: "Please check your email address.", nothing sent');
  btn(n3, '$36').click(); btn(n3, 'Monthly').click();
  em3.value = 'friend@example.com';
  [].filter.call(b3b.querySelectorAll('button'), function (b) { return b.textContent === 'Remind me later'; })[0].click();
  await wait(30);
  var rq = n3.T.posts.filter(function (x) { return x.body.action === 'remindLater'; });
  var rb = rq[0] && rq[0].body;
  ok(rq.length === 1 && rq[0].url === 'https://script.google.com/macros/s/TESTDEPLOY/exec', 'one remindLater request to the same Apps Script ENDPOINT');
  ok(rb && rb.site === 'jr' && rb.email === 'friend@example.com' && rb.amount === 36 && rb.monthly === true && rb.fund === 'General' && /7643000/.test(rb.page) && rb.website === '',
    'request body: ' + JSON.stringify(rb));
  ok(Object.keys(rb || {}).sort().join(',') === 'action,amount,email,fund,monthly,page,site,website', 'only these fields: action, site, email, amount, monthly, fund, page, website');
  ok(bar(n3) && bar(n3).textContent.indexOf('Thank you. We’ll be in touch.') > -1, 'success: "Thank you. We’ll be in touch."');
  bar(n3).querySelector('button[aria-label="Close"]').click();
  ok(!bar(n3) && n3.d.body.style.paddingBottom === '', 'Close removes it and the padding');

  async function remindWith(mode) {
    var p = await page(DONATE, { pv: { nudgeIdleMs: 60 }, remind: mode });
    btn(p, '$18').click();
    await wait(140);
    [].filter.call(bar(p).querySelectorAll('button'), function (b) { return b.textContent === 'Not today'; })[0].click();
    p.d.getElementById('dn26-remind-email').value = 'x@example.com';
    [].filter.call(bar(p).querySelectorAll('button'), function (b) { return b.textContent === 'Remind me later'; })[0].click();
    await wait(30);
    return p;
  }
  var lv = await remindWith('live');
  var lvb = bar(lv);
  ok(lvb && /couldn’t save that just now/.test(lvb.querySelector('.dn-nerr').textContent) && !/Unknown request/.test(lvb.textContent), 'live Apps Script (unknown action, ok:false "Unknown request."): gentle message, no raw error');
  var lvGo = [].filter.call(lvb.querySelectorAll('button'), function (b) { return /Remind me later/.test(b.textContent); })[0];
  ok(lvGo && !lvGo.disabled && lv.d.getElementById('dn26-remind-email').value === 'x@example.com' && lv.T.errors.length === 0, 'the panel still works after it (button enabled, email kept, no script errors)');
  var nw = await remindWith('network');
  ok(/couldn’t save that just now/.test(bar(nw).querySelector('.dn-nerr').textContent) && nw.T.errors.length === 0, 'network error: the same gentle message');
  var be = await remindWith('bademail');
  ok(bar(be).querySelector('.dn-nerr').textContent === 'Please enter a valid email address.', 'server says the email is not valid: shows that');
  ok(!/[–—]/.test(bar(lv).textContent), 'no dashes in the error text');

  var nt = await page(DONATE, { pv: { nudgeIdleMs: 60 } });
  btn(nt, '$36').click();
  await wait(140);
  [].filter.call(bar(nt).querySelectorAll('button'), function (b) { return b.textContent === 'Not today'; })[0].click();
  [].filter.call(bar(nt).querySelectorAll('button'), function (b) { return b.textContent === 'No, thanks'; })[0].click();
  ok(!bar(nt) && !nt.T.posts.some(function (x) { return x.body.action === 'remindLater'; }), 'No, thanks: closes, nothing sent');
  var ne = await page(DONATE, { pv: { nudgeIdleMs: 60 } });
  btn(ne, '$36').click();
  await wait(140);
  ne.d.dispatchEvent(new ne.w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  ok(!bar(ne), 'Escape closes the bar');

  var s2b = await page(DONATE, { pv: { nudgeIdleMs: IDLE } });
  btn(s2b, '$36').click();
  btn(s2b, 'Continue').click();
  await wait(IDLE * 2);
  ok(!bar(s2b), 'pressed Continue (step 2): no bar');
  var sh2 = await page(DONATE, { pv: { nudgeIdleMs: 100000 } });
  inViewStub(sh2, function () { return false; });
  btn(sh2, '$36').click(); btn(sh2, 'Continue').click();
  scroll(sh2);
  ok(!bar(sh2), 'step 2: scrolling never shows it');
  var bk = await page(DONATE, { pv: { nudgeIdleMs: 60 } });
  btn(bk, '$36').click();
  await wait(140);
  ok(bar(bk), '(bar showing on step 1)');
  btn(bk, 'Continue').click();
  ok(!bar(bk) && bk.d.body.style.paddingBottom === '', 'moving to step 2 takes the bar away');
  var gv = await page(DONATE, { pv: { nudgeIdleMs: 60 } });
  await give(gv);
  ok(gv.w.sessionStorage.getItem('dn26-gave') === '1', 'a gift marks the session (dn26-gave)');
  gv.UI = gv.w.CFDonate.ui; gv.UI.show(1);
  btn(gv, '$36').click();
  await wait(140);
  ok(!bar(gv), 'after a gift: never shown');
  var gv2 = await page(DONATE, { pv: { nudgeIdleMs: 60 } });
  gv2.w.sessionStorage.setItem('dn26-gave', '1');
  btn(gv2, '$36').click();
  await wait(140);
  ok(!bar(gv2), 'gift made earlier this session: not shown');
  ok(/if \(window\.top !== window\) return false;/.test(SRC) && /window\.top !== window && \/cf-sync\/\.test\(window\.location\.hash\)\) \{ uncover\(\); return; \}/.test(SRC), 'never inside a frame: the #cf-sync copy exits before drawing, and the bar checks window.top');

  console.log('tribute eCard: "Let them know (optional)"');
  function ty(p, id, val) { var e = p.d.getElementById(id); e.value = val; e.dispatchEvent(new p.w.Event('input', { bubbles: true })); return e; }
  var tp = await page(DONATE);
  var trc = tp.d.getElementById('dn26-trchk'), trb = tp.d.getElementById('dn26-trbox');
  ok(trc && trc.type === 'checkbox' && tp.d.getElementById('dn26-dedbox').contains(trc) && trc.compareDocumentPosition(tp.d.getElementById('dn26-dedname')) & 2, 'a real checkbox inside the dedication box, below the name field');
  var trl = trc.closest('label');
  ok(trl.getAttribute('for') === 'dn26-trchk' && /^Let them know \(optional\)/.test(trl.textContent) && /We’ll email them a card\. Your gift amount is never.shown\./.test(trl.textContent), 'label "Let them know (optional)" with helper "We’ll email them a card. Your gift amount is never shown."');
  ok(!trc.checked && trb.hidden && trc.getAttribute('aria-expanded') === 'false' && trc.getAttribute('aria-controls') === 'dn26-trbox', 'off by default: fields hidden (aria-expanded=false)');
  tp.d.getElementById('dn26-dedchk').click();
  trc.click();
  ok(trc.checked && !trb.hidden && trc.getAttribute('aria-expanded') === 'true', 'checked: name, email and message open (aria-expanded=true)');
  var tn = tp.d.getElementById('dn26-trname'), te = tp.d.getElementById('dn26-tremail'), tm = tp.d.getElementById('dn26-trmsg'), tc = tp.d.getElementById('dn26-trcount');
  ok(tn && tn.maxLength === 80 && tn.value === '' && te && te.type === 'email' && tm && tm.tagName === 'TEXTAREA' && tm.maxLength === 250, 'fields: their name (optional, empty, 80), their email (type email), message textarea (maxlength 250)');
  ok([tn, te, tm].every(function (x) { var l = x.closest('label'); return l && l.getAttribute('for') === x.id; }) && /Their email \*/.test(te.closest('label').textContent) && /optional/.test(tn.closest('label').textContent), 'each field has its own label; email marked required, name optional');
  ok(tc.textContent === '0/250' && tc.getAttribute('aria-live') === 'polite' && tm.getAttribute('aria-describedby') === 'dn26-trcount', 'counter "0/250", aria-live polite, tied to the message');
  ty(tp, 'dn26-trmsg', 'Hello');
  ok(tc.textContent === '5/250', 'counter updates while typing (5/250)');
  ty(tp, 'dn26-dedname', 'Rachel Cohen');
  btn(tp, '$36').click();
  btn(tp, 'Continue').click();
  ok(/Please enter their email address/.test(tp.d.querySelector('#dn26 .dn-err').textContent) && tp.d.activeElement === te, 'on with no email: "Please enter their email address, so we can send the card." and the email field gets focus');
  ty(tp, 'dn26-tremail', 'rachel@');
  btn(tp, 'Continue').click();
  ok(/Please check their email address\./.test(tp.d.querySelector('#dn26 .dn-err').textContent) && tp.d.querySelector('#dn26 .dn-pane.on') === tp.d.querySelector('#dn26 .dn-pane'), 'bad email: "Please check their email address." and stays on step 1');

  async function giveTr(o) {
    var p = await page(o.url || DONATE, o.opts);
    p.d.getElementById('dn26-dedchk').click();
    if (o.memory) [].filter.call(p.d.querySelectorAll('#dn26-dedbox .dn-seg button'), function (b) { return b.textContent === 'In memory'; })[0].click();
    ty(p, 'dn26-dedname', o.ded || 'Sarah Levi');
    if (o.tr !== false) {
      p.d.getElementById('dn26-trchk').click();
      ty(p, 'dn26-trname', o.name == null ? 'Rachel Cohen' : o.name); ty(p, 'dn26-tremail', o.email || 'rachel@example.com'); ty(p, 'dn26-trmsg', o.msg == null ? 'With love.' : o.msg);
    }
    if (o.before) o.before(p);
    if (o.monthly) btn(p, 'Monthly').click();
    await give(p);
    return p;
  }
  var T1 = await giveTr({});
  var tb = startOf(T1).body;
  ok(tb.tribute_email === 'rachel@example.com' && tb.tribute_name === 'Rachel Cohen' && tb.tribute_msg === 'With love.' && tb.ded === 'honor' && tb.dedname === 'Sarah Levi', 'start request: tribute_email, tribute_name, tribute_msg with the dedication');
  ok(T1.T.frames[0].sent.input_9 === 'In honor of Sarah Levi. eCard to rachel@example.com', 'ChabadOne input_9: "In honor of Sarah Levi. eCard to rachel@example.com" (plain text note appended)');
  ok(/We’re emailing your card to Rachel Cohen\./.test(T1.d.querySelector('#dn26 .dn-done').textContent), 'thank-you: "We’re emailing your card to Rachel Cohen."');
  var T2 = await giveTr({ name: '', msg: '' });
  ok(startOf(T2).body.tribute_name === '' && startOf(T2).body.tribute_msg === '' && /your card to rachel@example\.com/.test(T2.d.querySelector('#dn26 .dn-done').textContent), 'name and message optional: sent empty; thank-you names the email');
  var T3 = await giveTr({ before: function (p) { p.d.getElementById('dn26-trchk').click(); } });
  ok(!('tribute_email' in startOf(T3).body) && !('tribute_msg' in startOf(T3).body) && T3.T.frames[0].sent.input_9 === 'In honor of Sarah Levi', 'toggle turned off again: no tribute fields, ChabadOne unchanged');
  var T4 = await giveTr({ before: function (p) { p.d.getElementById('dn26-dedchk').click(); } });
  ok(!('tribute_email' in startOf(T4).body) && startOf(T4).body.ded === '', 'dedication unchecked: tribute fields left out too');
  var T5 = await page(DONATE);
  T5.d.getElementById('dn26-dedchk').click(); T5.d.getElementById('dn26-trchk').click();
  T5.d.getElementById('dn26-dedchk').click();
  ok(!T5.d.getElementById('dn26-trchk').checked && T5.d.getElementById('dn26-trbox').hidden, 'unchecking the dedication turns "Let them know" off');
  T5.d.getElementById('dn26-dedchk').click();
  ok(!T5.d.getElementById('dn26-trchk').checked, 'checking the dedication again: "Let them know" stays off until chosen');
  var T6 = await giveTr({ monthly: true, memory: true, ded: 'Esther Gold' });
  ok(startOf(T6).body.mode === 'monthly' && startOf(T6).body.tribute_email === 'rachel@example.com' && startOf(T6).body.ded === 'memory', 'monthly gift in memory with a card: mode monthly, tribute fields sent');
  var T7 = await giveTr({ msg: 'x'.repeat(300) });
  ok(startOf(T7).body.tribute_msg.length <= 250, 'message never over 250 characters');
  ok(/tribute_email/.test(SRC) && !/postal|mail them a printed|by mail/i.test(SRC.replace(/no postal card/, '')), 'email only: no postal option anywhere');

  console.log('payment step: monthly label');
  var pl = await page(DONATE);
  btn(pl, '$36').click(); btn(pl, 'Monthly').click(); btn(pl, 'Continue').click();
  [['first', 'Test'], ['last', 'Donor'], ['email', 'test@example.com']].forEach(function (f) { pl.d.getElementById('dn26-' + f[0]).value = f[1]; });
  pl.d.querySelector('#dn26 .dn-gold').click(); await wait(80);
  ok(pl.d.querySelector('#dn26 .dn-sum3').textContent.replace(/ /g, ' ') === '$36 every month, starting today', 'monthly summary: "$36 every month, starting today"');
  var m3 = pl.d.querySelector('#dn26 .dn-mon3');
  ok(m3 && !m3.hidden && m3.textContent === 'You can change or stop it any time.', 'monthly note: "You can change or stop it any time."');
  var po = await page(DONATE);
  btn(po, '$36').click(); btn(po, 'Continue').click();
  [['first', 'Test'], ['last', 'Donor'], ['email', 'test@example.com']].forEach(function (f) { po.d.getElementById('dn26-' + f[0]).value = f[1]; });
  po.d.querySelector('#dn26 .dn-gold').click(); await wait(80);
  ok(po.d.querySelector('#dn26 .dn-sum3').textContent === '$36' && po.d.querySelector('#dn26 .dn-mon3').hidden && btn(po, 'Give $36'), 'one time unchanged: "$36", no monthly note, button "Give $36"');

  console.log('make it monthly');
  var mk = await page(DONATE + '?designation=youth');
  mk.d.getElementById('dn26-dedchk').click(); ty(mk, 'dn26-dedname', 'Sarah Levi');
  mk.d.getElementById('dn26-trchk').click(); ty(mk, 'dn26-tremail', 'rachel@example.com');
  await give(mk);
  var mmc = mk.d.getElementById('dn26-mm');
  ok(mmc && mk.d.querySelector('#dn26 .dn-done').contains(mmc), 'after a one-time gift: the card shows on the thank-you');
  ok(mmc && mmc.querySelector('h4').textContent.replace(/ /g, ' ') === 'Would you like to make this a monthly gift?' && mmc.querySelector('p').textContent.replace(/ /g, ' ') === 'Monthly gifts help us plan for the year ahead.', 'card text: question and one line of why');
  var yb = btn(mk, 'Yes, give $100 every month'), nb = btn(mk, 'No, thanks');
  ok(yb && nb && yb.type === 'button' && nb.type === 'button', 'buttons "Yes, give $100 every month" and "No, thanks"');
  ok(mk.w.sessionStorage.getItem('dn26-mm') === '1', 'marked shown for this session');
  var nStart = mk.T.posts.filter(function (x) { return x.body.action === 'start'; }).length, nFin = mk.T.posts.filter(function (x) { return x.body.action === 'finish'; }).length;
  yb.click(); await wait(120);
  var starts = mk.T.posts.filter(function (x) { return x.body.action === 'start'; });
  var ms = starts[starts.length - 1].body, os = starts[0].body;
  ok(starts.length === nStart + 1 && ms.mode === 'monthly' && ms.amount === 100, 'Yes: a NEW monthly gift of the same amount is prepared (mode monthly, 100)');
  ok(ms.fund === os.fund && ms.fund === 'Youth Programs' && ms.ded === 'honor' && ms.dedname === 'Sarah Levi' && ms.first === 'Test' && ms.last === 'Donor' && ms.email === 'test@example.com', 'same fund, dedication and donor details');
  ok(!('tribute_email' in ms), 'no second card: "Let them know" is off for the monthly gift');
  ok(ms.attempt && ms.attempt !== os.attempt, 'its own attempt id (a separate Stripe gift)');
  ok(mk.d.querySelector('#dn26 .dn-pane.on') === mk.d.querySelectorAll('#dn26 .dn-pane')[2] && mk.d.querySelector('#dn26 .dn-ft').style.display === '', 'goes to the payment step');
  ok(mk.d.querySelector('#dn26 .dn-sum3').textContent.replace(/ /g, ' ').indexOf('$100 every month, starting today') === 0 && !mk.d.querySelector('#dn26 .dn-mon3').hidden, 'payment step labeled "$100 every month, starting today" with the change-or-stop note');
  ok(mk.T.posts.filter(function (x) { return x.body.action === 'finish'; }).length === nFin && btn(mk, 'Give $100 / month'), 'nothing charged by clicking Yes: waits for "Give $100 / month"');
  ok(!mk.d.querySelector('#dn26 .dn-done').children.length, 'the old thank-you is cleared');
  btn(mk, 'Give $100 / month').click(); await wait(400);
  ok(/monthly gift of \$100/.test(mk.d.querySelector('#dn26 .dn-done').textContent) && !mk.d.getElementById('dn26-mm'), 'after confirming: monthly thank-you, and no card again');
  var mk2 = await page(DONATE);
  await give(mk2);
  btn(mk2, 'No, thanks').click();
  ok(!mk2.d.getElementById('dn26-mm') && mk2.T.posts.filter(function (x) { return x.body.action === 'start'; }).length === 1, 'No, thanks: card goes away, nothing started');
  var mk3 = await page(DONATE);
  btn(mk3, 'Monthly').click();
  await give(mk3);
  ok(!mk3.d.getElementById('dn26-mm'), 'never after a monthly gift');
  var mk4 = await page(DONATE);
  mk4.w.sessionStorage.setItem('dn26-mm', '1');
  await give(mk4);
  ok(!mk4.d.getElementById('dn26-mm'), 'shown once per session only');
  var mk5 = await page(DONATE);
  mk5.w.CFDonate.ui.thanks('succeeded', { amount: 50 });
  ok(!mk5.d.getElementById('dn26-mm'), 'not shown when the donor details are unknown (return from a bank window without saved details)');
  var mk6 = await page(DONATE);
  mk6.w.CFDonate.ui.thanks('processing', { amount: 50, first: 'A', last: 'B', email: 'a@example.com', ded: 'honor', dedname: 'X', tr: { email: 'r@example.com', name: 'Rae', msg: '' } });
  ok(/Your card to Rae will be emailed once your bank payment.clears\./.test(mk6.d.querySelector('#dn26 .dn-done').textContent), 'bank payment: "Your card to Rae will be emailed once your bank payment clears."');

  console.log('header (option A is the default; no preview switch)');
  var hMA = await page(MATCHP), hQ = await page(DONATE + '?dnhdr=B');
  ok(/\bdn-hxA\b/.test(hMA.d.querySelector('#dn26 .dn-hd').className) && hMA.d.querySelector('h1').textContent === '2026 Annual Matching Campaign' && /^Give now to our 2026 Annual Matching Campaign\./.test(hMA.d.querySelector('#dn26 .dn-hd span').textContent), 'matching page: light header, H1 above the card kept, subtitle starts "Give now to our 2026 Annual Matching Campaign."');
  ok(/\bdn-hxA\b/.test(hQ.d.querySelector('#dn26 .dn-hd').className) && !/dn-hxB/.test(hQ.d.querySelector('#dn26 .dn-hd').className), 'an old ?dnhdr=B link is harmless: still the light header');

  console.log('other pages');
  ok(!(await page('https://www.jewishriverside.com/templates/articlecco_cdo/aid/5333083/jewish/Join.htm')).d.getElementById('dn26'), 'not shown on other pages');
  ok(!(await page(DONATE.replace('articlecco_cdo', 'ArticleCcoResponse'))).d.getElementById('dn26'), 'not shown on ChabadOne’s response page');

  console.log('versions and keys');
  var V = /var V = '([^']+)'/.exec(FOOTER)[1];
  ok(/^\d{4}-\d{2}-\d{2}[a-z]$/.test(V) && V > '2026-11-25b', 'footer.js V bumped (' + V + ')');
  ok(/VERSION = 'donate-2026 2026-11-26k'/.test(SRC), 'donate-2026.js VERSION bumped');
  var live = fs.readFileSync(path.join(ROOT, 'donate-2026.js'), 'utf8');
  ok(/PUBLISHABLE_KEY: 'pk_live_/.test(live) && !/sk_live_|sk_test_|rk_live_/.test(live), 'only a publishable key in the file, no secret key');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
