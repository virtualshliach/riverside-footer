/* Tests for stripe-donate.js (the Stripe donate pop-up), with a fake Stripe.js and a fake
   Apps Script. Also checks the festival draft page opens it.
   Run from the repo root: node tools/test-stripe.js */
'use strict';
var fs = require('fs'), path = require('path');
var JSDOM = require('jsdom').JSDOM;
var ROOT = path.join(__dirname, '..');
var SRC = fs.readFileSync(path.join(ROOT, 'stripe-donate.js'), 'utf8');
var EP = 'https://script.google.com/macros/s/TESTDEPLOY/exec';
var CONFIGURED = SRC.replace(/ENDPOINT: '[^']*',/, "ENDPOINT: '" + EP + "',").replace(/PUBLISHABLE_KEY: '[^']*',/, "PUBLISHABLE_KEY: 'pk_test_abc',");
SRC = SRC.replace(/ENDPOINT: '[^']*',/, "ENDPOINT: '',");   /* the "not configured" case */

var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  ok   ' + m); } else { fail++; console.log('  FAIL ' + m); } }
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

function page(opts) {
  opts = opts || {};
  var url = opts.url || 'https://chanukahfestival.org/';
  var dom = new JSDOM('<!doctype html><html><head></head><body><p>festival</p></body></html>', { url: url, runScripts: 'dangerously', pretendToBeVisual: true });
  var w = dom.window, T = { posts: [], confirms: [], elements: [], errors: [], logs: [] };
  w.console.log = function () { T.logs.push([].join.call(arguments, ' ')); };
  w.console.error = function () { T.errors.push([].join.call(arguments, ' ')); };
  w.addEventListener('error', function (e) { T.errors.push(e.message); });
  if (opts.pending) w.sessionStorage.setItem('cfs-pending', JSON.stringify(opts.pending));
  var n = 0;
  w.fetch = function (u, o) {
    var b = JSON.parse(o.body);
    T.posts.push({ url: u, body: b, ct: o.headers['Content-Type'] });
    if (opts.fetchFail) return Promise.reject(new Error('Failed to fetch'));
    if (b.action === 'start') {
      if (opts.startError) return Promise.resolve({ json: function () { return Promise.resolve({ ok: false, error: opts.startError }); } });
      n++;
      return Promise.resolve({ json: function () { return Promise.resolve({ ok: true, id: 'pi_T' + n, clientSecret: 'pi_T' + n + '_secret_x', mode: b.mode }); } });
    }
    return Promise.resolve({ json: function () { return Promise.resolve({ ok: true, status: 'succeeded', receipt: true }); } });
  };
  T.results = opts.results || [];
  w.Stripe = function (pk) {
    T.pk = pk;
    return {
      elements: function (o) {
        T.elements.push(o);
        return { create: function (type, po) {
          T.peOpts = po;
          var h = {};
          return { on: function (ev, fn) { h[ev] = fn; }, mount: function (host) { T.mountedIn = host.id; setTimeout(function () { h.ready && h.ready(); }, 5); }, destroy: function () { T.destroyed = (T.destroyed || 0) + 1; } };
        } };
      },
      confirmPayment: function (o) {
        T.confirms.push(o);
        var r = T.results.length ? T.results.shift() : { paymentIntent: { id: 'pi_T' + n, status: 'succeeded' } };
        return new Promise(function (res) { setTimeout(function () { res(r); }, 20); });
      },
      retrievePaymentIntent: function (secret) {
        T.retrieved = secret;
        return Promise.resolve({ paymentIntent: opts.retrieve });
      }
    };
  };
  var sc = w.document.createElement('script');
  sc.textContent = opts.src || CONFIGURED;
  w.document.head.appendChild(sc);
  var d = w.document;
  T.w = w; T.d = d;
  T.click = function (el) { el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  T.type = function (id, v) { var e = d.getElementById(id); e.value = v; e.dispatchEvent(new w.Event('input', { bubbles: true })); };
  T.next = function () { return d.querySelector('#cfs .cfs-gold'); };
  T.err = function () { return d.querySelector('#cfs .cfs-err').textContent; };
  T.onPane = function () { var p = d.querySelectorAll('#cfs .cfs-pane'); for (var i = 0; i < p.length; i++) if (/\bon\b/.test(p[i].className)) return i + 1; return 0; };
  T.chip = function (label) { return [].filter.call(d.querySelectorAll('#cfs .cfs-chip'), function (b) { return b.textContent === label; })[0]; };
  T.details = function () { T.type('cfs-first', 'Sarah'); T.type('cfs-last', 'Cohen'); T.type('cfs-email', 'sarah@example.com'); T.type('cfs-phone', '951-555-0100'); T.type('cfs-note', 'For the volunteers'); };
  return T;
}

(async function () {
  console.log('not configured');
  var u = page({ src: SRC });
  ok(u.w.CFStripe && u.w.CFStripe.ready === false && u.w.CFStripe.open() === false && !u.d.getElementById('cfs'), 'empty keys: not ready, open() does nothing (festival falls back to the old pop-up)');
  ok(!/sk_(test|live)_/.test(SRC), 'no secret key in the public file');

  console.log('one-time card gift');
  var t = page();
  ok(t.w.CFStripe.ready === true && t.errors.length === 0, 'configured: ready, no errors');
  t.w.CFStripe.open();
  ok(t.d.getElementById('cfs') && !/cfs-off/.test(t.d.getElementById('cfs').className) && t.onPane() === 1, 'opens on step 1');
  ok(!t.d.querySelector('script[src*="js.stripe.com"]') && !t.pk, 'Stripe.js not loaded until needed');
  t.click(t.next());
  ok(/choose an amount/i.test(t.err()) && t.onPane() === 1, 'no amount: asked to choose one');
  t.type('cfs-other', '3'); t.click(t.next());
  ok(/smallest gift is \$5/.test(t.err()), 'under $5 stopped in the pop-up');
  t.click(t.chip('$180')); t.click(t.next());
  ok(t.onPane() === 2 && t.err() === '', 'amount chosen: step 2');
  t.click(t.next());
  ok(/first name/i.test(t.err()) && t.posts.length === 0, 'missing name: stopped, nothing sent');
  t.details(); t.type('cfs-email', 'bad'); t.click(t.next());
  ok(/email/i.test(t.err()) && t.posts.length === 0, 'bad email: stopped');
  t.type('cfs-email', 'sarah@example.com'); t.click(t.next());
  await wait(80);
  var s1 = t.posts[0];
  ok(s1 && s1.url === EP && s1.ct === 'text/plain;charset=utf-8' && s1.body.action === 'start', 'start sent to Apps Script as text/plain (no preflight)');
  ok(s1.body.amount === 180 && s1.body.mode === 'once' && s1.body.first === 'Sarah' && s1.body.note === 'For the volunteers' && s1.body.website === '' && s1.body.attempt, 'start carries amount, details, attempt id; trap field empty');
  ok(t.pk === 'pk_test_abc' && t.elements[0].clientSecret === 'pi_T1_secret_x' && t.mountedIn === 'cfs-pe', 'Stripe box mounted with the payment from the server');
  ok(t.peOpts.defaultValues.billingDetails.email === 'sarah@example.com' && t.peOpts.layout.type === 'accordion', 'donor details prefilled in Stripe box');
  ok(t.onPane() === 3 && /Donate \$180$/.test(t.next().textContent), 'step 3 button reads "Donate $180"');
  t.click(t.next()); t.click(t.next());
  await wait(80);
  ok(t.confirms.length === 1, 'double-click: payment confirmed once');
  ok(t.confirms[0].redirect === 'if_required' && /^https:\/\/chanukahfestival\.org\/\?cfs=return$/.test(t.confirms[0].confirmParams.return_url), 'stays on the page unless the method needs to leave (return_url ' + t.confirms[0].confirmParams.return_url + ')');
  ok(t.onPane() === 4 && /Thank you, Sarah!/.test(t.d.getElementById('cfs').textContent) && /\$180 has been received/.test(t.d.getElementById('cfs').textContent), 'thank-you shown');
  ok(/receipt is on its way to sarah@example\.com/.test(t.d.getElementById('cfs').textContent), 'tells the donor a receipt is coming');
  await wait(50);
  var f1 = t.posts.filter(function (p) { return p.body.action === 'finish'; });
  ok(f1.length === 1 && f1[0].body.id === 'pi_T1', 'finish reported to Apps Script with the payment id');

  console.log('decline, then retry');
  var dcl = page({ results: [{ error: { type: 'card_error', message: 'Your card was declined.' } }] });
  dcl.w.CFStripe.open(); dcl.click(dcl.chip('$36')); dcl.click(dcl.next()); dcl.details(); dcl.click(dcl.next());
  await wait(60);
  dcl.click(dcl.next()); await wait(60);
  ok(/Your card was declined\./.test(dcl.err()) && dcl.onPane() === 3 && !dcl.next().disabled, 'decline: Stripe message shown, button released');
  dcl.click(dcl.next()); await wait(60);
  ok(dcl.confirms.length === 2 && dcl.onPane() === 4, 'retry succeeds');
  ok(dcl.posts.filter(function (p) { return p.body.action === 'start'; }).length === 1, 'retry reuses the same payment (no second start)');

  console.log('going back');
  var bk = page();
  bk.w.CFStripe.open(); bk.click(bk.chip('$72')); bk.click(bk.next()); bk.details(); bk.click(bk.next()); await wait(60);
  bk.click(bk.d.querySelector('#cfs .cfs-ghost')); bk.click(bk.next()); await wait(60);
  ok(bk.posts.filter(function (p) { return p.body.action === 'start'; }).length === 1, 'back and forward with nothing changed: no new payment');
  bk.click(bk.d.querySelector('#cfs .cfs-ghost')); bk.click(bk.d.querySelector('#cfs .cfs-ghost'));
  var segBtns = bk.d.querySelectorAll('#cfs .cfs-seg button'); bk.click(segBtns[1]);
  bk.click(bk.next()); bk.click(bk.next()); await wait(60);
  var starts = bk.posts.filter(function (p) { return p.body.action === 'start'; });
  ok(starts.length === 2 && starts[1].body.mode === 'monthly' && starts[1].body.attempt !== starts[0].body.attempt, 'switched to monthly: new payment with a new attempt id');
  ok(/Donate \$72 a month$/.test(bk.next().textContent), 'button reads "Donate $72 a month"');

  console.log('bank payment (processing)');
  var ach = page({ results: [{ paymentIntent: { id: 'pi_T1', status: 'processing' } }] });
  ach.w.CFStripe.open(); ach.click(ach.chip('$360')); ach.click(ach.next()); ach.details(); ach.click(ach.next()); await wait(60);
  ach.click(ach.next()); await wait(60);
  var at = ach.d.getElementById('cfs').textContent;
  ok(/up to 4 business days/.test(at) && /as soon as it clears/.test(at), 'bank: tells the donor it takes a few days and the receipt follows');

  console.log('server says no');
  var se = page({ startError: 'Too many attempts. Please wait a little while and try again.' });
  se.w.CFStripe.open(); se.click(se.chip('$18')); se.click(se.next()); se.details(); se.click(se.next()); await wait(60);
  ok(se.onPane() === 2 && /Too many attempts/.test(se.err()) && !se.next().disabled, 'server error shown on step 2, can try again');
  var nf = page({ fetchFail: true });
  nf.w.CFStripe.open(); nf.click(nf.chip('$18')); nf.click(nf.next()); nf.details(); nf.click(nf.next()); await wait(60);
  ok(nf.onPane() === 2 && /couldn.t reach the payment system/.test(nf.err()), 'offline: plain message');

  console.log('back from Cash App');
  var rt = page({ url: 'https://chanukahfestival.org/?cfs=return&payment_intent=pi_R9&payment_intent_client_secret=pi_R9_secret_z&redirect_status=succeeded',
    pending: { id: 'pi_R9', amount: 180, monthly: true, first: 'Dov', email: 'dov@example.com', t: Date.now() },
    retrieve: { id: 'pi_R9', status: 'succeeded', amount: 18000 } });
  await wait(80);
  ok(rt.retrieved === 'pi_R9_secret_z' && /Thank you, Dov!/.test(rt.d.getElementById('cfs').textContent) && /monthly gift of \$180 is set up/.test(rt.d.getElementById('cfs').textContent), 'result shown with the saved gift details');
  ok(rt.posts.some(function (p) { return p.body.action === 'finish' && p.body.id === 'pi_R9'; }), 'finish reported after the return');
  ok(rt.w.location.search === '', 'payment details removed from the address bar (' + rt.w.location.search + ')');
  var rf = page({ url: 'https://chanukahfestival.org/?cfs=return&payment_intent=pi_R8&payment_intent_client_secret=pi_R8_secret_z&redirect_status=failed',
    pending: { id: 'pi_R8', amount: 36, monthly: false, first: 'Dov', email: 'dov@example.com', t: Date.now() },
    retrieve: { id: 'pi_R8', status: 'requires_payment_method', amount: 3600 } });
  await wait(80);
  ok(rf.onPane() === 1 && /wasn.t completed/.test(rf.err()) && /\bon\b/.test(rf.chip('$36').className), 'cancelled in Cash App: back to step 1 with the amount kept');

  console.log('festival draft page opens it');
  var DR = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7553387/jewish/Draft.htm';
  var fsrc = fs.readFileSync(path.join(ROOT, 'chanukah-2026-draft.js'), 'utf8');
  ok(/STRIPE_DONATE: true,/.test(fsrc), 'draft has STRIPE_DONATE on');
  var dom = new JSDOM('<!doctype html><html><head></head><body class="cco_templateless_page"><div class="cco_templatelates_content"><div id="co_content_container">native</div></div></body></html>',
    { url: DR, runScripts: 'dangerously', pretendToBeVisual: true });
  var w = dom.window, opened = 0;
  w.console.log = function () {}; w.console.error = function () {};
  w.CFStripe = { version: 'x', ready: true, open: function () { opened++; return true; } };
  var sc = w.document.createElement('script'); sc.textContent = fsrc; w.document.body.appendChild(sc);
  await wait(400);
  var don = w.document.querySelector('.cf-nav .cf-don');
  if (don) don.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  ok(opened === 1 && !w.document.querySelector('.cf-dm') && !w.document.querySelector('.cf-fp iframe'), 'Donate opens the Stripe pop-up, not the ChabadOne one');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(function (e) { console.error(e); process.exit(1); });
