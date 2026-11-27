/* riverside-footer: donate-2026.js
   jewishriverside.com Donate page ("Donate 2.0", page 7643000). Loaded by footer.js.

   A step-by-step donate form on the page itself:
     1. Gift: one-time or monthly, amount, what it's for, optional "in honor of / in memory of"
     2. Your details: name, email, phone
     3. Payment: Stripe's own secure box (card, Google Pay, Link, Cash App Pay, bank account)
     4. Thank you

   Money goes to Stripe through the same Google Apps Script web app as the Chanukah Festival
   (site: 'jr'), which writes the gift to the "Donations - JewishRiverside.com" tab of the
   "Chanukah Festival" Google Sheet and emails the receipt from the Chabad JCC account.

   After Stripe confirms the payment, the gift details (never card numbers) are also sent to
   ChabadOne: the page's own ChabadOne form (fields input_1 ... input_12) is filled in and
   submitted inside a hidden copy of this page, so ChabadOne records the submission while
   the donor stays on the thank-you screen. The visible ChabadOne form is moved off-screen
   (never display:none), and comes back if this file can't run.

   The same form also runs on the hidden 2026 Matching Campaign page (7642564), preset to
   "Annual Matching Campaign". That page has no ChabadOne form of its own, so its gifts are sent
   to Donate 2.0's ChabadOne form (PAGES[...].co). Either page takes ?designation=matching (or
   /designation/matching) to preset the fund. Donate 2.0 is also at jewishriverside.com/donation
   (a ChabadOne short address with no page id in it, see PATHS).

   No flash of the old page: header.js hides these pages (#dn26-cover) before they are drawn.
   This file removes every #dn26-cover once its form is on the page, or as soon as it knows it
   can't draw it. header.js and footer.js each also drop the cover after 8 seconds no matter what. */
(function () {
  'use strict';

  var VERSION = 'donate-2026 2026-11-26b';
  var MATCH = 'Annual Matching Campaign';
  var MATCH_TAG = 'matching-2026';
  var COVER_ID = 'dn26-cover';
  var DONATE20 = '/templates/articlecco_cdo/aid/7643000/jewish/Donate-20.htm';
  /* Pages that show this form. fund: the preset choice. co: path of the page whose ChabadOne form records the gift
     (empty: this page's own). tag: the Stripe tag every gift from this page carries. */
  var PAGES = {
    '7643000': { key: 'donate', fund: 'General', h2: 'Make a Donation', intro: 'Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.',
      h1From: /donate 2\.0/i, h1: 'Donate', docTitle: 'Donate', co: '', tag: '' },
    '7642564': { key: 'matching', fund: MATCH, h2: 'Make a Donation', intro: 'Give now to our 2026 Annual Matching Campaign. Every act of goodness and kindness starts a ripple. Yours will touch lives across Riverside and far beyond.',
      h1From: /./, h1: '2026 Annual Matching Campaign', docTitle: '2026 Annual Matching Campaign', co: DONATE20, tag: MATCH_TAG }
  };
  /* ChabadOne short addresses on jewishriverside.com with no page id in them. Same list as header.js and footer.js. */
  var PATHS = { '/donation': '7643000' };

  /* Remove the cover that header.js (a <style>) and footer.js (a <div>) put up. Both use the same id. */
  function uncover() {
    var c;
    while ((c = document.getElementById(COVER_ID))) { if (c.parentNode) c.parentNode.removeChild(c); else break; }
  }
  function pathAid() {
    if (!/(^|\.)jewishriverside\.com$/i.test(window.location.hostname || '')) return '';
    var pm = /^(\/[a-z0-9-]+)(?:\/(?:designation|fund|payment_intent)\/.*)?\/?$/i.exec(window.location.pathname || '');
    var k = pm ? pm[1].toLowerCase() : '';
    return k && Object.prototype.hasOwnProperty.call(PATHS, k) ? PATHS[k] : '';
  }
  var href = window.location.href;
  var am = /\/aid\/(\d+)(?:[\/.]|$)/i.exec(window.location.pathname) || /[?&]aid=(\d+)(?:&|$)/i.exec(window.location.search);
  var aidNow = am ? am[1] : (window.Co && window.Co.ArticleId ? String(window.Co.ArticleId) : '') || pathAid();   /* same lookup as footer.js */
  var AID = Object.prototype.hasOwnProperty.call(PAGES, aidNow) ? aidNow : null;
  if (!AID) return;
  var PAGE = PAGES[AID];
  if (href.indexOf('ArticleCcoResponse') > -1) { uncover(); return; }  /* ChabadOne's own response page */
  if (window.top !== window && /cf-sync/.test(window.location.hash)) { uncover(); return; } /* the hidden ChabadOne copy */
  if (window.CFDonate) { uncover(); return; }

  var CFG = {
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbxJDFJg_llgI5vqnwbIlStreWtDEL_4q4SG3joSWfXL9lbsn7ogu1XqjVEh4kTPkrHcGg/exec',
    PUBLISHABLE_KEY: 'pk_live_51UYlhp2QWZswqSbMqqbP4VThYws1ixIKxYcau1pdtRs4bkIKPNdMH7xLa78dhL4a2IgXRGCmEyKP5oEqRwO0Rtl800l1adSlBc',
    ORG: 'Chabad Jewish Community Center of Riverside',
    PHONE: '951-222-2005',
    AMOUNTS: [18, 36, 50, 100, 360, 500],
    /* "Apply my gift to", in this order: [fund value, label shown]. The value is what the Apps Script,
       Stripe, the Sheet and ChabadOne get; the label is only what the donor sees. The first one is featured. */
    FUNDS: [
      [MATCH, 'Annual Matching Campaign'],
      ['General', 'Where it’s needed most'],
      ['Adult Education', 'Adult Education'],
      ['College Programs', 'College Programs (Chabad at UCR)'],
      ['Synagogue', 'Synagogue'],
      ['Youth Programs', 'Youth Programs'],
      ['Social Services', 'Social Services'],
      ['Chanukah Festival', 'Chanukah Festival']
    ],
    /* The funds the LIVE Apps Script knows (its GEN.FUNDS, Nov 26 2026). Any other fund is recorded there as
       General, so for those the choice also goes in the note ("Applied to: ..."), which reaches Stripe, the Sheet
       and the receipt. Once the new Apps Script is live this changes nothing: it records the fund itself. */
    BACKEND_FUNDS: ['General', 'Adult Education', 'College Programs', 'Synagogue', 'Visitation', 'Youth Programs'],
    /* short names for ?designation=... (any fund also works as its value or label in dashes, e.g. youth-programs) */
    FUND_ALIAS: { matching: MATCH, match: MATCH, 'annual-matching': MATCH, general: 'General', college: 'College Programs',
      youth: 'Youth Programs', social: 'Social Services', 'social-services': 'Social Services', visitation: 'Social Services',
      chanukah: 'Chanukah Festival', festival: 'Chanukah Festival' },
    MIN: 5,
    MAX: 25000,
    BANK_DAYS: '4 business days',
    /* ChabadOne form fields on page 7643000 (read from the live page, Nov 25 2026) */
    CO: { first: 'input_1', last: 'input_3', email: 'input_4', phone: 'input_5', amount: 'input_6', frequency: 'input_7',
      fund: 'input_8', dedication: 'input_9', method: 'input_10', stripeId: 'input_11', status: 'input_12', submit: 'input_2' }
  };

  var PV = window.CFDONATE_PREVIEW || null;     /* Claude preview only: { demo: true } */
  var DEMO = !!(PV && PV.demo);

  var NAVY = '#0f2730', DEEP = '#0b1f27', GOLD = '#e9b949', TEAL = '#2aa996', MUTED = '#c9d6da';
  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';

  function log(m) { if (window.console) console.log('[' + VERSION + '] ' + m); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(arguments[i]); return p; }
  function rid() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 10)).replace(/[^a-z0-9]/g, ''); }
  function store(k, v) {
    try {
      if (v === null) { sessionStorage.removeItem(k); localStorage.removeItem(k); return; }
      var s = JSON.stringify(v); sessionStorage.setItem(k, s); localStorage.setItem(k, s);
    } catch (e) {}
  }
  function read(k) {
    var s = null;
    try { s = sessionStorage.getItem(k) || localStorage.getItem(k); } catch (e) {}
    try { return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function asset(name) {
    var me = document.currentScript && document.currentScript.src;
    if (!me) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) if (all[i].src.indexOf('/riverside-footer/donate-2026.js') > -1) { me = all[i].src; break; }
    }
    return (me ? me.split('?')[0].replace(/[^\/]+$/, '') : 'https://virtualshliach.github.io/riverside-footer/') + name;
  }
  var LOGO = asset('chabad-jcc-logo-white-gold.png');

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('dn26-css')) return;
    if (!document.getElementById('dn26-fonts')) {
      var l = document.createElement('link');
      l.id = 'dn26-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Montserrat:wght@400;600;700' + String.fromCharCode(38) + 'display=swap';
      (document.head || document.documentElement).appendChild(l);
    }
    var R = '#dn26 ';
    var rules = [
      /* the ChabadOne form stays on the page, off-screen (never display:none) */
      '.dn26-park{position:absolute !important;left:-10000px !important;top:0 !important;width:600px !important;height:1px !important;overflow:hidden !important}',
      '#dn26{font-family:' + BODY + ';font-size:16px;line-height:1.5;color:' + DEEP + ';max-width:720px;margin:10px auto 40px;text-align:left}',
      R + '*{box-sizing:border-box}',
      R + 'button{font:inherit;cursor:pointer;border:0;background:none;color:inherit;margin:0}',
      R + 'h2,' + R + 'h3,' + R + 'p{margin:0}',
      R + '.dn-card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px rgba(11,31,39,.18);border:1px solid #e3ebee}',
      R + '.dn-hd{position:relative;display:flex;align-items:center;gap:20px;padding:24px 26px;border-top:4px solid ' + GOLD + ';color:#fff;' +
        'background:radial-gradient(circle at 90px 50%,rgba(233,185,73,.2),rgba(233,185,73,0) 140px),linear-gradient(120deg,#123140,' + DEEP + ' 70%)}',
      R + '.dn-hd img{width:118px;height:auto;flex:none;display:block}',
      R + '.dn-hd i{display:block;font-style:normal;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:' + GOLD + ';margin-bottom:4px}',
      R + '.dn-hd h2{font-family:' + DISP + ';font-size:28px;line-height:1.15;color:#fff;margin-bottom:4px}',
      R + '.dn-hd span{display:block;font-size:15.2px;color:' + MUTED + '}',
      R + '.dn-steps{display:flex;gap:6px;padding:12px 26px;border-bottom:1px solid #e6eef0;background:#f6fafb}',
      R + '.dn-st{display:flex;align-items:center;gap:8px;flex:1;font-size:13.1px;font-weight:600;color:#7a8d93}',
      R + '.dn-st b{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e2ebee;color:#4a5d64;font-size:12.5px;flex:none}',
      R + '.dn-st.on{color:' + DEEP + '}',
      R + '.dn-st.on b{background:' + GOLD + ';color:' + DEEP + '}',
      R + '.dn-st.done b{background:' + TEAL + ';color:#fff}',
      R + '.dn-body{padding:22px 26px 26px}',
      R + '.dn-pane{display:none}',
      R + '.dn-pane.on{display:block}',
      R + 'h3{font-family:' + DISP + ';font-size:19.2px;color:' + NAVY + ';margin:0 0 12px;line-height:1.25}',
      R + 'h3.dn-sp{margin-top:22px}',
      R + '.dn-err{background:#fdecea;color:#8a1f12;border:1px solid #f4c4bd;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:14.4px}',
      R + '.dn-err:empty{display:none}',
      R + '.dn-seg{display:flex;background:#eef4f6;border-radius:999px;padding:4px;margin-bottom:16px}',
      R + '.dn-seg button{flex:1;padding:10px 12px;border-radius:999px;font-weight:700;color:#4a5d64;font-size:15.2px}',
      R + '.dn-seg button.on{background:#fff;color:' + NAVY + ';box-shadow:0 2px 8px rgba(15,39,48,.15)}',
      R + '.dn-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
      R + '.dn-chip{padding:16px 8px;border-radius:12px;border:1.5px solid #d5e2e6;background:#fff;color:' + NAVY + ';font-weight:700;font-size:18.4px}',
      R + '.dn-chip:hover{border-color:' + TEAL + '}',
      R + '.dn-chip.on{border-color:' + GOLD + ';background:#fff8e6;box-shadow:0 0 0 2px ' + GOLD + '}',
      R + '.dn-other{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:700;color:' + NAVY + '}',
      R + '.dn-other .dn-in{flex:1}',
      R + '.dn-mnote{font-size:13.6px;color:#4a5d64;margin-top:10px}',
      R + '.dn-funds{display:flex;flex-wrap:wrap;gap:8px}',
      R + '.dn-fund{padding:9px 14px;border-radius:999px;border:1.5px solid #d5e2e6;background:#fff;color:' + NAVY + ';font-weight:600;font-size:14.7px}',
      R + '.dn-fund:hover{border-color:' + TEAL + '}',
      R + '.dn-fund.on{border-color:' + NAVY + ';background:' + NAVY + ';color:#fff}',
      /* Annual Matching Campaign: its own full-width row, gold */
      R + '.dn-fund.dn-feat{flex:1 1 100%;padding:13px 16px;border:2px solid ' + GOLD + ';background:#fff8e6;font-weight:700;font-size:16px;letter-spacing:.01em}',
      R + '.dn-fund.dn-feat:hover{border-color:#d9a32c}',
      R + '.dn-fund.dn-feat.on{background:' + NAVY + ';border-color:' + GOLD + ';color:#fff;box-shadow:0 0 0 2px ' + GOLD + '}',
      R + '.dn-ded{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}',
      R + '.dn-dedname{margin-top:4px}',
      R + '.dn-grid{display:flex;flex-wrap:wrap;gap:12px}',
      R + '.dn-fld{display:flex;flex-direction:column;gap:5px;flex:1 1 100%;min-width:0}',
      R + '.dn-fld.half{flex:1 1 calc(50% - 6px)}',
      R + '.dn-fld span{font-size:12.5px;font-weight:700;color:#4a5d64;letter-spacing:.02em}',
      R + '.dn-in{width:100%;padding:12px 13px;font:inherit;font-size:16px;color:' + NAVY + ';background:#fff;border:1.5px solid #d5e2e6;border-radius:10px;outline:none;height:auto;margin:0;box-shadow:none}',
      R + '.dn-in:focus{border-color:' + TEAL + ';box-shadow:0 0 0 3px rgba(42,169,150,.18)}',
      R + '.dn-trap{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}',
      R + '.dn-sum3{font-weight:700;color:' + NAVY + ';background:#f6fafb;border-radius:10px;padding:10px 14px;margin-bottom:14px}',
      R + '.dn-pe{min-height:120px}',
      R + '.dn-wait{display:flex;align-items:center;gap:10px;color:#4a5d64;font-size:15.2px;padding:24px 4px}',
      R + '.dn-spin{width:20px;height:20px;border-radius:50%;border:3px solid #d5e2e6;border-top-color:' + TEAL + ';animation:dn26spin .8s linear infinite;flex:none}',
      '@keyframes dn26spin{to{transform:rotate(360deg)}}',
      R + '.dn-secure{font-size:12.8px;color:#6b7f86;margin-top:14px}',
      R + '.dn-ft{display:flex;align-items:center;gap:12px;padding:14px 26px;border-top:1px solid #e6eef0;background:#fff}',
      R + '.dn-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 26px;border-radius:999px;font-weight:700;font-size:15.7px;letter-spacing:.02em;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease;text-decoration:none}',
      R + '.dn-gold{background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(233,185,73,.3)}',
      R + '.dn-gold:hover{transform:translateY(-1px)}',
      R + '.dn-ghost{border:1.5px solid #cfdde1;color:' + NAVY + '}',
      R + '.dn-btn[disabled]{opacity:.6;cursor:wait;transform:none}',
      R + '.dn-sum{flex:1;text-align:center;font-weight:700;color:' + NAVY + ';font-size:15.2px}',
      R + '.dn-done{text-align:center;padding:18px 6px 6px}',
      R + '.dn-done p{color:#4a5d64;margin:8px auto;max-width:460px}',
      R + '.dn-done .dn-btn{margin-top:18px}',
      R + '.dn-ok{width:64px;height:64px;border-radius:50%;background:' + TEAL + ';color:#fff;font-size:32px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}',
      R + '.dn-ok.wait{background:' + GOLD + ';color:' + DEEP + '}',
      R + '.dn-foot{text-align:center;font-size:13.6px;color:#6b7f86;margin-top:16px}',
      R + '.dn-foot a{color:#0A5769;font-weight:700}',
      /* preview-only stand-in for Stripe's box */
      R + '.dn-demo{border:1.5px dashed #b9cbd1;border-radius:12px;padding:14px}',
      R + '.dn-demo-note{font-size:12.5px;color:#7a8d93;margin-top:10px}',
      '@media (max-width:620px){#dn26{margin:0 auto 24px}' + R + '.dn-card{border-radius:14px}' + R + '.dn-hd{gap:14px;padding:18px 16px}' + R + '.dn-hd img{width:78px}' +
        R + '.dn-hd h2{font-size:22.4px}' + R + '.dn-steps{padding:10px 16px}' + R + '.dn-st span{display:none}' + R + '.dn-st.on span{display:inline}' +
        R + '.dn-body{padding:18px 16px 20px}' + R + '.dn-ft{padding:12px 14px}' + R + '.dn-btn{padding:12px 18px}' + R + '.dn-fld.half{flex:1 1 100%}}'
    ];
    var st = document.createElement('style');
    st.id = 'dn26-css';
    st.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- Stripe.js and the Apps Script ---------- */
  var stripeP = null;
  function loadStripe() {
    if (stripeP) return stripeP;
    stripeP = new Promise(function (res, rej) {
      if (window.Stripe) return res(window.Stripe(CFG.PUBLISHABLE_KEY));
      var s = document.createElement('script');
      s.src = 'https://js.stripe.com/v3/';
      s.onload = function () { window.Stripe ? res(window.Stripe(CFG.PUBLISHABLE_KEY)) : rej(new Error('Stripe did not load')); };
      s.onerror = function () { stripeP = null; rej(new Error('Stripe did not load')); };
      (document.head || document.documentElement).appendChild(s);
    });
    return stripeP;
  }
  function api(body) {
    if (DEMO) return demoApi(body);
    /* text/plain keeps this a "simple" request (no CORS preflight), which Apps Script needs */
    return fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { return r.json(); });
  }
  function finish(id, tries) {
    tries = tries || 0;
    return api({ action: 'finish', id: id }).then(function (r) { return r; }, function (e) {
      if (tries < 2) return new Promise(function (res) { setTimeout(res, 2500); }).then(function () { return finish(id, tries + 1); });
      log('could not report payment ' + id + ' (the 15-minute check will record it): ' + e);
      return null;
    });
  }

  /* ---------- ChabadOne: send the gift details (no card data) to the page's ChabadOne form ---------- */
  function coValues(g, method, status) {
    return {
      first: g.first, last: g.last, email: g.email, phone: g.phone || '',
      amount: Number(g.amount).toFixed(2), frequency: g.monthly ? 'Monthly' : 'One-time', fund: g.fund || 'General',
      dedication: g.ded && g.dedname ? (g.ded === 'memory' ? 'In memory of ' : 'In honor of ') + g.dedname : '',
      method: method || '', stripeId: g.id, status: status
    };
  }
  function setField(doc, id, val) {
    var f = doc.getElementById(id);
    if (!f) return false;
    if (String(f.value) === String(val)) return true;
    f.value = val;
    ['input', 'change', 'keyup', 'blur'].forEach(function (t) {
      var ev; try { ev = new Event(t, { bubbles: true }); } catch (e) { ev = doc.createEvent('Event'); ev.initEvent(t, true, true); }
      f.dispatchEvent(ev);
    });
    return true;
  }
  /* Load this same page in a hidden frame, fill its ChabadOne form and submit it there.
     ChabadOne answers with its ArticleCcoResponse page: that is the success signal. */
  function sendToChabadOne(g, method, status) {
    var key = 'dn26-co-' + g.id;
    if (read(key)) return Promise.resolve(true);
    if (DEMO) { store(key, 1); return Promise.resolve(true); }
    var vals = coValues(g, method, status);
    return new Promise(function (resolve) {
      var fr = document.createElement('iframe'), done = false, submitted = false;
      fr.title = 'ChabadOne';
      fr.setAttribute('aria-hidden', 'true');
      fr.tabIndex = -1;
      fr.setAttribute('style', 'position:absolute;left:-10000px;top:0;width:900px;height:900px;border:0;visibility:hidden');
      function end(ok, why) {
        if (done) return; done = true;
        if (ok) { store(key, 1); log('ChabadOne entry saved for ' + g.id); }
        else log('ChabadOne entry not saved for ' + g.id + ': ' + why + ' (the gift is in Stripe and the Sheet)');
        setTimeout(function () { if (fr.parentNode) fr.parentNode.removeChild(fr); }, 1500);
        resolve(ok);
      }
      fr.onload = function () {
        var w, d;
        try { w = fr.contentWindow; d = fr.contentDocument; } catch (e) { return end(false, 'frame blocked'); }
        if (/ArticleCcoResponse/i.test(w.location.href)) return end(true);
        if (submitted) return;
        var tries = 0;
        (function fill() {
          var btn = d.getElementById(CFG.CO.submit);
          if (!btn || !d.getElementById(CFG.CO.first)) {
            if (++tries > 40) return end(false, 'form not found');
            return setTimeout(fill, 250);
          }
          for (var k in vals) setField(d, CFG.CO[k], vals[k]);
          /* if the fund field is a list without this choice: General there, and the real fund in the dedication field */
          var ff = d.getElementById(CFG.CO.fund);
          if (ff && vals.fund && String(ff.value) !== String(vals.fund)) {
            if (ff.tagName === 'SELECT') setField(d, CFG.CO.fund, 'General');
            setField(d, CFG.CO.dedication, 'Fund: ' + fundLabel(vals.fund) + (vals.dedication ? '. ' + vals.dedication : ''));
          }
          submitted = true;
          btn.click();
          /* forms may also post by AJAX: watch for the form leaving or an error */
          var t0 = Date.now();
          (function watch() {
            if (done) return;
            var e = d.querySelector('.form-error-message, .form-line-error, .form-error-js');
            if (e && e.offsetParent) return end(false, 'ChabadOne said: ' + (e.textContent || '').trim().slice(0, 120));
            if (Date.now() - t0 > 45000) return end(false, 'no answer from ChabadOne');
            setTimeout(watch, 400);
          })();
        })();
      };
      fr.src = (PAGE.co || window.location.pathname) + '#cf-sync';
      document.body.appendChild(fr);
    });
  }

  /* ---------- funds ---------- */
  function slug(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function fundLabel(f) { for (var i = 0; i < CFG.FUNDS.length; i++) if (CFG.FUNDS[i][0] === f) return CFG.FUNDS[i][1]; return f; }
  /* which fund to preset: ?designation=x or /designation/x (also fund=), else the page's own */
  function presetFund() {
    var m = /[?&](?:designation|fund)=([^&#]*)/i.exec(window.location.search) || /\/(?:designation|fund)\/([^\/?#]+)/i.exec(window.location.pathname);
    var want = '';
    try { want = m ? slug(decodeURIComponent(m[1].replace(/\+/g, ' '))) : ''; } catch (e) {}
    if (want) {
      if (Object.prototype.hasOwnProperty.call(CFG.FUND_ALIAS, want)) return CFG.FUND_ALIAS[want];
      for (var i = 0; i < CFG.FUNDS.length; i++) if (slug(CFG.FUNDS[i][0]) === want || slug(CFG.FUNDS[i][1]) === want) return CFG.FUNDS[i][0];
    }
    return PAGE.fund;
  }
  /* what goes to the Apps Script with the gift: the real fund, a note when the live script doesn't know it, the tag */
  function fundFields(fund) {
    var o = { fund: fund, note: CFG.BACKEND_FUNDS.indexOf(fund) < 0 ? 'Applied to: ' + fundLabel(fund) : '' };
    if (fund === MATCH || PAGE.tag) o.tag = MATCH_TAG;
    return o;
  }

  /* ---------- the page ---------- */
  var UI = null;

  function build(host) {
    css();
    var st = { step: 1, amount: 0, monthly: false, fund: 'General', ded: '', busy: false, sig: '', start: null, attempt: '' };
    var root = el('div'); root.id = 'dn26';
    var card = el('div', 'dn-card');

    var hd = el('div', 'dn-hd');
    var logo = el('img'); logo.src = LOGO; logo.alt = CFG.ORG;
    add(hd, logo, add(el('div'), el('i', null, CFG.ORG), el('h2', null, PAGE.h2),
      el('span', null, PAGE.intro)));

    var steps = el('div', 'dn-steps');
    var stepEls = ['Your gift', 'Your details', 'Payment'].map(function (t, i) {
      var s = add(el('div', 'dn-st'), el('b', null, String(i + 1)), el('span', null, t));
      steps.appendChild(s); return s;
    });

    var body = el('div', 'dn-body');
    var err = el('div', 'dn-err'); err.setAttribute('role', 'alert');
    function setErr(m) { err.textContent = m || ''; if (m) err.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }

    /* --- step 1: the gift --- */
    var p1 = el('div', 'dn-pane');
    var seg = el('div', 'dn-seg');
    var bOnce = el('button', 'on', 'One time'); bOnce.type = 'button';
    var bMon = el('button', null, 'Monthly'); bMon.type = 'button';
    add(seg, bOnce, bMon);
    var mNote = el('p', 'dn-mnote', 'A monthly gift helps us plan for the future. You can change or stop it any time.');
    mNote.style.display = 'none';
    function setMonthly(on) { st.monthly = on; bOnce.className = on ? '' : 'on'; bMon.className = on ? 'on' : ''; mNote.style.display = on ? '' : 'none'; sumLine(); }
    bOnce.addEventListener('click', function () { setMonthly(false); });
    bMon.addEventListener('click', function () { setMonthly(true); });

    var chips = el('div', 'dn-chips');
    var other = document.createElement('input');
    other.type = 'number'; other.min = String(CFG.MIN); other.step = '1'; other.setAttribute('inputmode', 'decimal');
    other.className = 'dn-in'; other.id = 'dn26-other'; other.placeholder = 'Other amount';
    function pickAmt(a, btn) {
      st.amount = a;
      [].forEach.call(chips.querySelectorAll('button'), function (b) { b.className = 'dn-chip' + (b === btn ? ' on' : ''); });
      if (btn) other.value = '';
      sumLine();
    }
    CFG.AMOUNTS.forEach(function (a) {
      var b = el('button', 'dn-chip', money(a)); b.type = 'button';
      b.addEventListener('click', function () { pickAmt(a, b); });
      chips.appendChild(b);
    });
    other.addEventListener('input', function () { pickAmt(Math.round(Number(other.value) * 100) / 100 || 0, null); });
    var otherW = add(el('label', 'dn-other'), el('span', null, '$'), other);

    var funds = el('div', 'dn-funds');
    function pickFund(f) {
      st.fund = f;
      [].forEach.call(funds.children, function (b) { b.className = 'dn-fund' + (b.getAttribute('data-feat') ? ' dn-feat' : '') + (b.getAttribute('data-f') === f ? ' on' : ''); });
      sumLine();
    }
    CFG.FUNDS.forEach(function (f, i) {
      var b = el('button', 'dn-fund', f[1]); b.type = 'button'; b.setAttribute('data-f', f[0]);
      if (i === 0) b.setAttribute('data-feat', '1');
      b.addEventListener('click', function () { pickFund(f[0]); });
      funds.appendChild(b);
    });

    var ded = el('div', 'dn-ded');
    var dedName = document.createElement('input');
    dedName.className = 'dn-in'; dedName.id = 'dn26-dedname'; dedName.maxLength = 120;
    var dedW = add(el('label', 'dn-fld dn-dedname'), el('span', null, 'Name'), dedName);
    function pickDed(t) {
      st.ded = t;
      [].forEach.call(ded.children, function (b) { b.className = 'dn-fund' + (b.getAttribute('data-d') === t ? ' on' : ''); });
      dedW.style.display = t ? '' : 'none';
      dedName.placeholder = t === 'memory' ? 'In memory of…' : 'In honor of…';
      if (t) setTimeout(function () { try { dedName.focus(); } catch (e) {} }, 30);
    }
    [['', 'No dedication'], ['honor', 'In honor of'], ['memory', 'In memory of']].forEach(function (d) {
      var b = el('button', 'dn-fund', d[1]); b.type = 'button'; b.setAttribute('data-d', d[0]);
      b.addEventListener('click', function () { pickDed(d[0]); });
      ded.appendChild(b);
    });

    add(p1, el('h3', null, 'Choose your gift'), seg, chips, otherW, mNote,
      el('h3', 'dn-sp', 'Apply my gift to'), funds,
      el('h3', 'dn-sp', 'Dedicate this gift (optional)'), ded, dedW);

    /* --- step 2: details --- */
    var p2 = el('div', 'dn-pane');
    var inputs = {};
    function field(key, label, type, half, req, ac) {
      var w = el('label', 'dn-fld' + (half ? ' half' : ''));
      var i = document.createElement('input');
      i.type = type; i.className = 'dn-in'; i.id = 'dn26-' + key; i.autocomplete = ac || 'on';
      add(w, el('span', null, label + (req ? ' *' : '')), i);
      inputs[key] = { el: i, req: req, label: label };
      return w;
    }
    var grid = el('div', 'dn-grid');
    add(grid, field('first', 'First name', 'text', true, true, 'given-name'), field('last', 'Last name', 'text', true, true, 'family-name'),
      field('email', 'Email', 'email', true, true, 'email'), field('phone', 'Phone', 'tel', true, false, 'tel'));
    var trap = add(el('div', 'dn-trap'), el('span', null, 'Leave this empty'));
    var trapIn = document.createElement('input'); trapIn.type = 'text'; trapIn.tabIndex = -1; trapIn.autocomplete = 'off'; trap.appendChild(trapIn);
    add(p2, el('h3', null, 'Your details'), grid, trap, el('p', 'dn-secure', 'We’ll email your tax receipt to this address.'));
    function v(k) { return String(inputs[k].el.value || '').trim(); }

    /* --- step 3: payment --- */
    var p3 = el('div', 'dn-pane');
    var sum3 = el('div', 'dn-sum3');
    var peHost = el('div', 'dn-pe');
    add(p3, el('h3', null, 'Payment'), sum3, peHost, el('p', 'dn-secure', '🔒 Secure payment by Stripe. Your card or bank details go straight to Stripe and are never stored by us.'));

    /* --- step 4: thank you --- */
    var p4 = el('div', 'dn-pane dn-done');

    var panes = [p1, p2, p3, p4];
    add(body, err, p1, p2, p3, p4);

    var ft = el('div', 'dn-ft');
    var back = el('button', 'dn-btn dn-ghost', 'Back'); back.type = 'button';
    var sum = el('div', 'dn-sum');
    var next = el('button', 'dn-btn dn-gold', 'Continue'); next.type = 'button';
    add(ft, back, sum, next);

    add(card, hd, steps, body, ft);
    var foot = el('p', 'dn-foot');
    var tel = el('a', null, CFG.PHONE); tel.href = 'tel:' + CFG.PHONE.replace(/\D/g, '');
    add(foot, document.createTextNode(CFG.ORG + ' is a 501(c)(3) nonprofit. Your gift is tax-deductible. Questions? Call '), tel, document.createTextNode('.'));
    add(root, card, foot);
    host.parentNode.insertBefore(root, host);

    function giftLine() { return st.amount > 0 ? money(st.amount) + (st.monthly ? ' / month' : '') : ''; }
    function sumLine() {
      sum.textContent = giftLine();
      if (st.step === 3) next.textContent = st.amount > 0 ? 'Give ' + giftLine() : 'Give';
      var t = giftLine() + (st.fund && st.fund !== 'General' ? ' · ' + fundLabel(st.fund) : '');
      if (st.ded && v2('dedname')) t += ' · ' + (st.ded === 'memory' ? 'In memory of ' : 'In honor of ') + v2('dedname');
      sum3.textContent = t;
    }
    function v2() { return String(dedName.value || '').trim(); }
    function show(n) {
      st.step = n;
      panes.forEach(function (p, i) { p.className = p.className.replace(/ on\b/g, '') + (i === n - 1 ? ' on' : ''); });
      stepEls.forEach(function (s, i) { s.className = 'dn-st' + (i === n - 1 ? ' on' : i < n - 1 ? ' done' : ''); });
      steps.style.display = n === 4 ? 'none' : '';
      back.style.visibility = n === 1 || n === 4 ? 'hidden' : 'visible';
      ft.style.display = n === 4 ? 'none' : '';
      next.textContent = 'Continue';
      sumLine();
      if (n > 1) { try { root.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) {} }
    }
    function busy(on, label) {
      st.busy = on;
      next.disabled = on; back.disabled = on;
      if (on && label) next.textContent = label;
      if (!on) sumLine();
    }
    function check1() {
      if (!(st.amount > 0)) return 'Please choose an amount.';
      if (st.amount < CFG.MIN) return 'The smallest gift is ' + money(CFG.MIN) + '.';
      if (st.amount > CFG.MAX) return 'For gifts over ' + money(CFG.MAX) + ', please call us at ' + CFG.PHONE + '.';
      if (st.ded && !v2()) { dedName.focus(); return 'Please enter the name for your dedication.'; }
      return '';
    }
    function check2() {
      for (var k in inputs) if (inputs[k].req && !v(k)) { inputs[k].el.focus(); return 'Please fill in ' + inputs[k].label.toLowerCase() + '.'; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) { inputs.email.el.focus(); return 'Please check your email address.'; }
      return '';
    }
    function gift() {
      return { amount: st.amount, monthly: st.monthly, fund: st.fund, ded: st.ded, dedname: st.ded ? v2() : '',
        first: v('first'), last: v('last'), email: v('email'), phone: v('phone') };
    }

    var stripe = null, elements = null, pe = null;
    function prepare() {
      var g = gift();
      var sig = [g.amount, g.monthly ? 'm' : 'o', g.fund, g.ded, g.dedname, g.first, g.last, g.email, g.phone].join('|');
      if (st.start && st.sig === sig && (pe || DEMO)) { show(3); return; }
      if (st.sig !== sig) st.attempt = rid();
      peHost.innerHTML = '';
      add(peHost, add(el('div', 'dn-wait'), el('div', 'dn-spin'), el('span', null, 'Preparing secure payment…')));
      show(3); busy(true, 'One moment…');
      var ff = fundFields(g.fund);
      var req = { action: 'start', site: 'jr', amount: g.amount, mode: g.monthly ? 'monthly' : 'once', attempt: st.attempt,
        fund: ff.fund, ded: g.ded, dedname: g.dedname,
        first: g.first, last: g.last, email: g.email, phone: g.phone, note: ff.note, website: trapIn.value,
        page: location.href.split('#')[0].slice(0, 300) };
      if (ff.tag) req.tag = ff.tag;
      api(req).then(function (r) {
        if (!r || !r.ok) throw new Error((r && r.error) || 'Something went wrong. Please try again.');
        st.start = r; st.sig = sig;
        return mountPayment(r, g);
      }).then(function () { busy(false); }, function (e) {
        busy(false);
        st.start = null; st.sig = '';
        show(2);
        setErr(e && e.message && !/fetch|network|load/i.test(e.message) ? e.message : 'We couldn’t reach the payment system. Please check your connection and try again.');
      });
    }
    function mountPayment(r, g) {
      if (DEMO) { peHost.innerHTML = ''; peHost.appendChild(demoBox()); return Promise.resolve(); }
      return loadStripe().then(function (s) {
        stripe = s;
        if (pe) { try { pe.destroy(); } catch (e) {} pe = null; }
        elements = stripe.elements({
          clientSecret: r.clientSecret,
          fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700' }],
          appearance: {
            theme: 'stripe',
            variables: { colorPrimary: TEAL, colorText: NAVY, colorDanger: '#b3261e', fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif', borderRadius: '10px', spacingUnit: '4px' },
            rules: { '.Input': { border: '1.5px solid #d5e2e6', boxShadow: 'none' }, '.Label': { fontWeight: '700', color: '#4a5d64' } }
          }
        });
        pe = elements.create('payment', {
          layout: { type: 'accordion', defaultCollapsed: false, radios: true, spacedAccordionItems: true },
          defaultValues: { billingDetails: { name: g.first + ' ' + g.last, email: g.email, phone: g.phone } },
          business: { name: CFG.ORG }
        });
        return new Promise(function (res, rej) {
          var done = false;
          pe.on('ready', function () { if (!done) { done = true; res(); } });
          pe.on('loaderror', function (ev) { if (!done) { done = true; rej(new Error((ev && ev.error && ev.error.message) || 'The payment form could not load.')); } });
          peHost.innerHTML = '';
          pe.mount(peHost);
          setTimeout(function () { if (!done) { done = true; res(); } }, 15000);
        });
      });
    }
    function returnUrl() {
      /* ChabadOne turns ?a=b into /a/b in the address; handleReturn() reads either form */
      return location.protocol + '//' + location.host + location.pathname.replace(/\/payment_intent\/.*$/i, '');
    }
    function pay() {
      if (st.busy || !st.start) return;
      setErr('');
      busy(true, 'Processing…');
      var g = gift(); g.id = st.start.id;
      store('dn26-pending', { g: g, t: Date.now() });
      var p = DEMO ? demoConfirm() : stripe.confirmPayment({ elements: elements, confirmParams: { return_url: returnUrl() }, redirect: 'if_required' });
      p.then(function (res) {
        if (res.error) {
          busy(false);
          setErr(res.error.type === 'card_error' || res.error.type === 'validation_error' ? res.error.message : 'Your payment didn’t go through. Please try again or use another payment method.');
          return;
        }
        var pi = res.paymentIntent;
        if (pi && (pi.status === 'succeeded' || pi.status === 'processing')) {
          busy(false);
          completed(pi, g);
        } else {
          busy(false);
          setErr('Your payment wasn’t completed. Please try again or use another payment method.');
        }
      }, function () {
        busy(false);
        setErr('We couldn’t reach the payment system. Please check your connection and try again.');
      });
    }

    function thanks(status, g) {
      p4.innerHTML = '';
      var bank = status === 'processing';
      var amt = money(g.amount) + (g.monthly ? ' a month' : '');
      var dedTxt = g.ded && g.dedname ? ' ' + (g.ded === 'memory' ? 'in memory of ' : 'in honor of ') + g.dedname : '';
      add(p4,
        el('div', 'dn-ok' + (bank ? ' wait' : ''), bank ? '⏳' : '✓'),
        el('h3', null, 'Thank you' + (g.first ? ', ' + g.first : '') + '!'),
        el('p', null, bank
          ? 'Your gift of ' + amt + dedTxt + ' is on its way. Bank payments take up to ' + CFG.BANK_DAYS + ' to clear.'
          : (g.monthly ? 'Your monthly gift of ' + money(g.amount) + dedTxt + ' is set up.' : 'Your gift of ' + amt + dedTxt + ' has been received.')),
        el('p', null, bank
          ? 'We’ll email your receipt' + (g.email ? ' to ' + g.email : '') + ' as soon as it clears.'
          : 'A receipt is on its way' + (g.email ? ' to ' + g.email : '') + '.'));
      var homeA = el('a', 'dn-btn dn-gold', 'Back to JewishRiverside.com'); homeA.href = '/';
      p4.appendChild(homeA);
      st.start = null; st.sig = '';
      show(4);
      try { if (window.gtag) window.gtag('event', 'donation', { value: Number(g.amount), currency: 'USD', monthly: !!g.monthly, page: PAGE.key, fund: g.fund }); } catch (e) {}
    }
    /* Payment went through: thank the donor, tell the Apps Script, then send the details to ChabadOne. */
    function completed(pi, g) {
      g.id = pi.id;
      thanks(pi.status, g);
      var status = pi.status === 'processing' ? 'Processing (bank payment)' : 'Paid';
      finish(pi.id).then(function (r) {
        var method = (r && r.method) || (pi.status === 'processing' ? 'Bank account' : 'Online payment');
        return sendToChabadOne(g, method, status);
      }).then(function () { store('dn26-pending', null); });
    }

    next.addEventListener('click', function () {
      if (st.busy) return;
      setErr('');
      if (st.step === 1) { var e1 = check1(); if (e1) return setErr(e1); show(2); setTimeout(function () { inputs.first.el.focus(); }, 50); return; }
      if (st.step === 2) { var e2 = check2(); if (e2) return setErr(e2); prepare(); return; }
      if (st.step === 3) pay();
    });
    back.addEventListener('click', function () { if (st.busy) return; setErr(''); if (st.step > 1) show(st.step - 1); });
    dedName.addEventListener('input', sumLine);

    /* preview-only stand-ins */
    function demoBox() {
      var w = el('div', 'dn-demo');
      var g = el('div', 'dn-grid');
      [['Card number', '4242 4242 4242 4242', ''], ['Expiration', '12 / 29', 'half'], ['Security code', '123', 'half']].forEach(function (f) {
        var l = el('label', 'dn-fld ' + f[2]); var i = el('input', 'dn-in'); i.value = f[1]; add(l, el('span', null, f[0]), i); g.appendChild(l);
      });
      add(w, g, el('p', 'dn-demo-note', 'Preview only. On the site this box is Stripe’s own secure payment form: card, Google Pay, Link, Cash App Pay and bank account.'));
      return w;
    }
    function demoConfirm() {
      return new Promise(function (res) { setTimeout(function () { res({ paymentIntent: { id: st.start.id, status: 'succeeded' } }); }, 700); });
    }

    setMonthly(false); pickFund(presetFund()); pickDed('');
    show(1);
    return { root: root, show: show, setErr: setErr, thanks: thanks, completed: completed, state: st };
  }

  /* Donor came back from Cash App or a bank window. Stripe adds ?payment_intent=...; ChabadOne may
     have turned that into /payment_intent/.../payment_intent_client_secret/... in the path. */
  function returnParams() {
    var q = {};
    var s = window.location.search.replace(/^\?/, '');
    if (s) s.split('&').forEach(function (kv) { var p = kv.split('='); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); });
    var m = /\/payment_intent\/([^\/]+)\/payment_intent_client_secret\/([^\/]+)(?:\/redirect_status\/([^\/]+))?/i.exec(window.location.pathname);
    if (m) { q.payment_intent = q.payment_intent || m[1]; q.payment_intent_client_secret = q.payment_intent_client_secret || m[2]; q.redirect_status = q.redirect_status || m[3]; }
    return /^pi_/.test(q.payment_intent || '') && q.payment_intent_client_secret ? q : null;
  }
  function handleReturn() {
    var q = returnParams();
    if (!q) return;
    try { history.replaceState(null, '', window.location.pathname.replace(/\/payment_intent\/.*$/i, '')); } catch (e) {}
    var pend = read('dn26-pending');
    var g = pend && pend.g && pend.g.id === q.payment_intent ? pend.g : null;
    UI.show(3);
    loadStripe().then(function (s) { return s.retrievePaymentIntent(q.payment_intent_client_secret); }).then(function (r) {
      var pi = r && r.paymentIntent;
      if (pi && (pi.status === 'succeeded' || pi.status === 'processing')) {
        if (g) UI.completed(pi, g);
        else { UI.thanks(pi.status, { amount: pi.amount / 100 }); finish(pi.id); }
      } else {
        UI.show(1);
        UI.setErr(q.redirect_status === 'failed' || (pi && pi.status === 'requires_payment_method')
          ? 'Your payment wasn’t completed. Please try again or choose another payment method.'
          : 'We couldn’t confirm your payment. If you were charged, you’ll get a receipt by email shortly.');
      }
    }, function () {
      UI.show(1);
      UI.setErr('We couldn’t confirm your payment. If you were charged, you’ll get a receipt by email shortly.');
      finish(q.payment_intent);
    });
  }

  function demoApi(b) {
    return new Promise(function (res) {
      setTimeout(function () {
        if (b.action === 'start') return res({ ok: true, clientSecret: 'pi_demo_secret', id: 'pi_3Q' + rid().slice(0, 12).toUpperCase(), mode: b.mode, live: false });
        if (b.action === 'finish') return res({ ok: true, status: 'succeeded', receipt: true, method: 'Visa ending 4242' });
        res({ ok: false });
      }, 400);
    });
  }

  /* ---------- start ---------- */
  function boot() {
    if (UI) return;
    /* a page that borrows another page's form (7642564) never parks a form of its own */
    var form = document.getElementById(AID) || (PAGE.co ? null : document.querySelector('form.userform-form'));
    var host = (form && (form.closest('#formContainer') || form)) || document.getElementById('co_content_container');
    if (!host || !host.parentNode) { uncover(); log('no place for the form on this page'); return; }
    if (!form) { var spot = el('div'); host.appendChild(spot); host = spot; }   /* no ChabadOne form (7642564): the form goes inside the article */
    try { UI = build(host); } catch (e) { uncover(); throw e; }
    /* park the ChabadOne form off-screen: it stays rendered, so it comes back if this file fails */
    if (form) (form.closest('#formContainer') || form).classList.add('dn26-park');
    var title = document.querySelector('h1.article-header__title, .article-header h1, #co_content_container h1');
    if (title && PAGE.h1From.test(title.textContent)) title.textContent = PAGE.h1;
    document.title = PAGE.docTitle + ' - ' + CFG.ORG;
    window.CFDonate = { version: VERSION, ui: UI, aid: AID };
    uncover();                                     /* the form is drawn: show the page */
    log('ready' + (DEMO ? ' (preview demo)' : ''));
    if (!DEMO) handleReturn();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
