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
var OLD6 = ['General', 'Adult Education', 'College Programs', 'Synagogue', 'Visitation', 'Youth Programs'];
var LABELS = ['Annual Matching Campaign', 'Where it’s needed most', 'Adult Education', 'College Programs (Chabad at UCR)',
  'Synagogue', 'Youth Programs', 'Social Services', 'Chanukah Festival'];
var VALUES = ['Annual Matching Campaign', 'General', 'Adult Education', 'College Programs', 'Synagogue', 'Youth Programs',
  'Social Services', 'Chanukah Festival'];

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
  w.fetch = function (u, o) {
    var b = JSON.parse(o.body);
    T.posts.push({ url: u, body: b });
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
  ok(f1.requests.some(function (u) { return /donate-2026\.js\?v=2026-11-26d$/.test(u); }), 'footer.js loads donate-2026.js with the new version stamp');
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
  ok(labels(a).join('|') === LABELS.join('|'), '8 choices, exact labels and order (' + labels(a).join(' | ') + ')');
  ok(funds(a).join('|') === VALUES.join('|'), 'fund values behind them (' + funds(a).join(' | ') + ')');
  var first = a.d.querySelector('#dn26 .dn-funds .dn-fund');
  ok(/\bdn-feat\b/.test(first.className) && first.getAttribute('data-f') === 'Annual Matching Campaign', 'Annual Matching Campaign is first and featured (class dn-feat)');
  ok(a.d.querySelectorAll('#dn26 .dn-fund.dn-feat').length === 1, 'only one featured choice');
  var css = a.d.getElementById('dn26-css').textContent;
  ok(/\.dn-fund\.dn-feat\{grid-column:1\/-1;[^}]*border:2px solid #e9b949/.test(css), 'featured choice: its own full-width row with a gold border');
  ok(/\.dn-funds\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/.test(css) && /max-width:480px\)\{[^@]*\.dn-funds\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/.test(css), 'choices: equal boxes, 3 across, 2 across on phones');
  ok(/\.dn-fund\{display:flex;align-items:center;justify-content:center;text-align:center;min-height:54px/.test(css), 'choices: same height, text centered');
  ok(/\.dn-ded\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/.test(css), 'dedication choices: 3 equal boxes');
  ok(/max-width:480px\)\{[^@]*\.dn-ded \.dn-fund\{white-space:nowrap/.test(css), 'phones: each dedication label stays on one line');
  ok(a.d.querySelectorAll('#dn26 .dn-fund.dn-wide').length === 1 && a.d.querySelector('#dn26 .dn-fund.dn-wide').getAttribute('data-f') === 'General', 'Where it’s needed most has its own row (the other 6 fill even rows)');
  ok(/max-width:480px\)\{[^@]*\.dn-hd\{flex-direction:column;text-align:center/.test(css), 'phones: header logo centered above the heading');
  ok(chosen(a) === 'General', 'default choice on Donate 2.0: Where it’s needed most (General)');
  ok(labels(a).indexOf('Visitation') < 0, 'Visitation no longer shown (Social Services replaces it)');
  ok(!labels(a).some(function (t) { return /[–—]| - /.test(t); }), 'no dashes in the labels');
  ok(a.d.querySelector('#dn26 .dn-hd h2').textContent === 'Make a Donation' && a.d.querySelector('h1').textContent === 'Donate', 'heading Make a Donation; page title "Donate 2.0" shows as Donate');
  ok(a.d.querySelector('#dn26 .dn-hd span').textContent === 'Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.', 'subtitle: the ripple sentence (' + a.d.querySelector('#dn26 .dn-hd span').textContent + ')');
  ok(!/Jewish life growing|for every age/.test(a.d.querySelector('#dn26 .dn-hd').textContent), 'subtitle: old "Jewish life growing" sentence gone');
  ok(/dn26-park/.test(a.d.getElementById('formContainer').className) && !/dn26-park/.test(a.d.getElementById('newsletter-footer').className), 'its ChabadOne form is parked off-screen; other forms untouched');
  pick(a, 'Annual Matching Campaign');
  ok(chosen(a) === 'Annual Matching Campaign' && /\bdn-feat\b/.test(first.className) && /\bon\b/.test(first.className), 'the featured choice can be selected like the others');
  pick(a, 'General');
  ok(a.T.errors.length === 0, 'no script errors (' + a.T.errors.join('; ') + ')');

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
    ok(/Thank you, Test!/.test(p.d.querySelector('#dn26 .dn-done').textContent) && /A receipt is on its way to test@example\.com\./.test(p.d.querySelector('#dn26 .dn-done').textContent), '  thank-you wording unchanged');
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
    'chanukah-festival': 'Chanukah Festival', 'adult-education': 'Adult Education', synagogue: 'Synagogue', 'Youth+Programs': 'Youth Programs', nonsense: 'General' };
  for (var k in PRE) { var got = chosen(await page(DONATE + '?designation=' + k)); ok(got === PRE[k], '?designation=' + k + ' -> ' + got); }
  ok(chosen(await page(DONATE.replace(/\.htm$/, '.htm/designation/matching'))) === 'Annual Matching Campaign', '/designation/matching (ChabadOne path form)');
  ok(chosen(await page(SHORT + '?designation=matching')) === 'Annual Matching Campaign', 'jewishriverside.com/donation?designation=matching');
  ok(chosen(await page(SHORT + '/designation/youth')) === 'Youth Programs', 'jewishriverside.com/donation/designation/youth');

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
  ok(chosen(m) === 'Annual Matching Campaign', 'preset fund: Annual Matching Campaign');
  ok(labels(m).join('|') === LABELS.join('|'), 'same 8 choices');
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

  console.log('other pages');
  ok(!(await page('https://www.jewishriverside.com/templates/articlecco_cdo/aid/5333083/jewish/Join.htm')).d.getElementById('dn26'), 'not shown on other pages');
  ok(!(await page(DONATE.replace('articlecco_cdo', 'ArticleCcoResponse'))).d.getElementById('dn26'), 'not shown on ChabadOne’s response page');

  console.log('versions and keys');
  var V = /var V = '([^']+)'/.exec(FOOTER)[1];
  ok(/^\d{4}-\d{2}-\d{2}[a-z]$/.test(V) && V > '2026-11-25b', 'footer.js V bumped (' + V + ')');
  ok(/VERSION = 'donate-2026 2026-11-26d'/.test(SRC), 'donate-2026.js VERSION bumped');
  var live = fs.readFileSync(path.join(ROOT, 'donate-2026.js'), 'utf8');
  ok(/PUBLISHABLE_KEY: 'pk_live_/.test(live) && !/sk_live_|sk_test_|rk_live_/.test(live), 'only a publishable key in the file, no secret key');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
