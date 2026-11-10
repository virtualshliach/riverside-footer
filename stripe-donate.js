/* Stripe donate pop-up - Chanukah Festival (jewishriverside.com / chanukahfestival.org)

   Our own form, not ChabadOne's. The donor picks an amount, enters their details,
   and pays in Stripe's secure payment box (card, Google Pay, Link, Cash App Pay,
   bank account). Card numbers go straight from that box to Stripe.

   Behind it is a Google Apps Script web app (ENDPOINT) that sets the amount with
   Stripe, checks the payment, writes the Google Sheet and emails the receipt.

   Loaded by chanukah-2026(-draft).js when Donate is pressed, and on page load when
   the donor comes back from Cash App. Public file: no secret keys here, ever.

   window.CFStripe.open()    open the pop-up
   window.CFStripe.ready     true once ENDPOINT and PUBLISHABLE_KEY are filled in */
(function () {
  'use strict';
  if (window.CFStripe && window.CFStripe.version) return;

  var VERSION = 'stripe-donate 2026-11-09a';

  var CFG = {
    /* Google Apps Script web app URL (Deploy > Web app). */
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbxJDFJg_llgI5vqnwbIlStreWtDEL_4q4SG3joSWfXL9lbsn7ogu1XqjVEh4kTPkrHcGg/exec',
    /* Stripe publishable key: pk_test_... while testing, pk_live_... when live. */
    PUBLISHABLE_KEY: 'pk_live_51UYlhp2QWZswqSbMqqbP4VThYws1ixIKxYcau1pdtRs4bkIKPNdMH7xLa78dhL4a2IgXRGCmEyKP5oEqRwO0Rtl800l1adSlBc',

    TITLE: 'Support the Chanukah Festival',
    SUB: 'Your gift keeps the festival free for the whole community.',
    ORG: 'Chabad Jewish Community Center of Riverside',
    PHONE: '951-222-2005',
    AMOUNTS: [18, 36, 72, 180, 360, 1000],
    MIN: 5,
    MAX: 25000,
    /* Shown on the done screen for bank payments. */
    BANK_DAYS: '4 business days'
  };

  /* Preview hook (Claude preview only): { demo: true, onEvent: fn }. Never set on the site. */
  var PV = window.CFSTRIPE_PREVIEW || null;
  var DEMO = !!(PV && PV.demo);
  var READY = DEMO || !!(CFG.ENDPOINT && /^pk_(test|live)_/.test(CFG.PUBLISHABLE_KEY));

  var NAVY = '#0f2730', DEEP = '#0b1f27', TEAL = '#3cc7b4', GOLD = '#e9b949', MUTED = '#c9d6da';
  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';

  function log(m) { if (window.console) console.log('[' + VERSION + '] ' + m); }
  function emit(type, data) { if (PV && typeof PV.onEvent === 'function') { try { PV.onEvent(type, data); } catch (e) {} } }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
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

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('cfs-css')) return;
    var R = '#cfs ';
    var rules = [
      '#cfs{position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147482600;background:rgba(5,15,20,.72);display:flex;align-items:center;justify-content:center;padding:3vh 14px;font-family:' + BODY + ';font-size:16px;line-height:1.5;color:' + DEEP + ';transition:opacity .2s ease;text-align:left}',
      '#cfs.cfs-off{visibility:hidden;pointer-events:none;opacity:0}',
      R + '*{box-sizing:border-box;margin:0;padding:0}',
      R + 'button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}',
      R + '.cfs-box{display:flex;flex-direction:column;width:100%;max-width:640px;max-height:94vh;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
      R + '.cfs-hd{display:flex;align-items:center;gap:14px;padding:16px 18px 14px 22px;background:' + NAVY + ';color:#fff}',
      R + '.cfs-hd b{display:block;font-family:' + DISP + ';font-size:1.2rem;line-height:1.25}',
      R + '.cfs-hd span{display:block;font-size:.85rem;color:' + MUTED + '}',
      R + '.cfs-x{margin-left:auto;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);color:#fff;font-size:22px;line-height:1;flex:none}',
      R + '.cfs-steps{display:flex;gap:6px;padding:12px 22px;border-bottom:1px solid #e6eef0;background:#f6fafb}',
      R + '.cfs-st{display:flex;align-items:center;gap:8px;flex:1;font-size:.82rem;font-weight:600;color:#7a8d93}',
      R + '.cfs-st i{font-style:normal;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e2ebee;color:#4a5d64;font-size:.78rem;flex:none}',
      R + '.cfs-st.on{color:' + DEEP + '}',
      R + '.cfs-st.on i{background:' + GOLD + ';color:' + DEEP + '}',
      R + '.cfs-st.done i{background:' + TEAL + ';color:#fff}',
      R + '.cfs-body{flex:1;min-height:0;overflow-y:auto;padding:20px 22px 24px;-webkit-overflow-scrolling:touch}',
      R + '.cfs-pane{display:none}',
      R + '.cfs-pane.on{display:block}',
      R + 'h3{font-family:' + DISP + ';font-size:1.3rem;color:' + NAVY + ';margin-bottom:14px;line-height:1.25}',
      R + '.cfs-err{background:#fdecea;color:#8a1f12;border:1px solid #f4c4bd;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:.9rem}',
      R + '.cfs-err:empty{display:none}',
      R + '.cfs-seg{display:flex;background:#eef4f6;border-radius:999px;padding:4px;margin-bottom:16px}',
      R + '.cfs-seg button{flex:1;padding:10px 12px;border-radius:999px;font-weight:700;color:#4a5d64;font-size:.95rem}',
      R + '.cfs-seg button.on{background:#fff;color:' + NAVY + ';box-shadow:0 2px 8px rgba(15,39,48,.15)}',
      R + '.cfs-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
      R + '.cfs-chip{padding:16px 8px;border-radius:12px;border:1.5px solid #d5e2e6;background:#fff;color:' + NAVY + ';font-weight:700;font-size:1.1rem}',
      R + '.cfs-chip:hover{border-color:' + TEAL + '}',
      R + '.cfs-chip.on{border-color:' + GOLD + ';background:#fff8e6;box-shadow:0 0 0 2px ' + GOLD + '}',
      R + '.cfs-other{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:700;color:' + NAVY + '}',
      R + '.cfs-other .cfs-in{flex:1}',
      R + '.cfs-grid{display:flex;flex-wrap:wrap;gap:12px}',
      R + '.cfs-fld{display:flex;flex-direction:column;gap:5px;flex:1 1 100%;min-width:0}',
      R + '.cfs-fld.half{flex:1 1 calc(50% - 6px)}',
      R + '.cfs-fld span{font-size:.78rem;font-weight:700;color:#4a5d64;letter-spacing:.02em}',
      R + '.cfs-in{width:100%;padding:12px 13px;font:inherit;font-size:1rem;color:' + NAVY + ';background:#fff;border:1.5px solid #d5e2e6;border-radius:10px;outline:none}',
      R + '.cfs-in:focus{border-color:' + TEAL + ';box-shadow:0 0 0 3px rgba(60,199,180,.18)}',
      R + 'textarea.cfs-in{min-height:70px;resize:vertical}',
      R + '.cfs-trap{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}',
      R + '.cfs-sum3{font-weight:700;color:' + NAVY + ';background:#f6fafb;border-radius:10px;padding:10px 14px;margin-bottom:14px}',
      R + '.cfs-pe{min-height:120px}',
      R + '.cfs-wait{display:flex;align-items:center;gap:10px;color:#4a5d64;font-size:.95rem;padding:24px 4px}',
      R + '.cfs-spin{width:20px;height:20px;border-radius:50%;border:3px solid #d5e2e6;border-top-color:' + TEAL + ';animation:cfsspin .8s linear infinite;flex:none}',
      '@keyframes cfsspin{to{transform:rotate(360deg)}}',
      R + '.cfs-secure{font-size:.8rem;color:#6b7f86;margin-top:14px}',
      R + '.cfs-ft{display:flex;align-items:center;gap:12px;padding:12px 18px;border-top:1px solid #e6eef0}',
      R + '.cfs-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 24px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.02em;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease}',
      R + '.cfs-gold{background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(233,185,73,.25)}',
      R + '.cfs-gold:hover{transform:translateY(-1px)}',
      R + '.cfs-ghost{border:1.5px solid #cfdde1;color:' + NAVY + '}',
      R + '.cfs-btn[disabled]{opacity:.6;cursor:wait;transform:none}',
      R + '.cfs-sum{flex:1;text-align:center;font-weight:700;color:' + NAVY + ';font-size:.95rem}',
      R + '.cfs-done{text-align:center;padding:24px 6px}',
      R + '.cfs-done p{color:#4a5d64;margin:8px auto;max-width:440px}',
      R + '.cfs-done .cfs-btn{margin-top:18px}',
      R + '.cfs-ok{width:64px;height:64px;border-radius:50%;background:' + TEAL + ';color:#fff;font-size:2rem;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}',
      R + '.cfs-ok.wait{background:' + GOLD + ';color:' + DEEP + '}',
      /* preview-only stand-in for Stripe's box */
      R + '.cfs-demo{border:1.5px dashed #b9cbd1;border-radius:12px;padding:14px}',
      R + '.cfs-demo-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}',
      R + '.cfs-demo-tabs button{padding:8px 12px;border:1.5px solid #d5e2e6;border-radius:10px;font-size:.85rem;font-weight:700;color:#4a5d64}',
      R + '.cfs-demo-tabs button.on{border-color:' + TEAL + ';color:' + NAVY + ';background:#f0fbf9}',
      R + '.cfs-demo-note{font-size:.78rem;color:#7a8d93;margin-top:10px}',
      '@media (max-width:620px){#cfs{padding:0}#cfs .cfs-box{height:100%;max-height:none;max-width:none;border-radius:0}#cfs .cfs-st span{display:none}#cfs .cfs-st.on span{display:inline}#cfs .cfs-ft{padding:10px 12px}#cfs .cfs-btn{padding:12px 18px}}'
    ];
    var st = document.createElement('style');
    st.id = 'cfs-css';
    st.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- Stripe.js ---------- */
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

  /* ---------- Apps Script ---------- */
  function api(body) {
    if (DEMO) return demoApi(body);
    /* text/plain keeps this a "simple" request (no CORS preflight), which Apps Script needs */
    return fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { return r.json(); });
  }
  function finish(id, tries) {
    tries = tries || 0;
    return api({ action: 'finish', id: id }).then(function (r) {
      emit('finish', r);
      return r;
    }, function (e) {
      if (tries < 2) return new Promise(function (res) { setTimeout(res, 2500); }).then(function () { return finish(id, tries + 1); });
      log('could not report payment ' + id + ' (the 15-minute check will record it): ' + e);
      return null;
    });
  }

  /* ---------- the pop-up ---------- */
  var M = null;

  function build() {
    css();
    var st = { step: 1, amount: 0, monthly: false, busy: false, sig: '', start: null, attempt: '' };
    var ov = el('div', 'cfs-off'); ov.id = 'cfs';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Donate');
    var box = el('div', 'cfs-box');

    var hd = el('div', 'cfs-hd');
    var x = el('button', 'cfs-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close');
    add(hd, add(el('div'), el('b', null, CFG.TITLE), el('span', null, CFG.SUB)), x);

    var steps = el('div', 'cfs-steps');
    var stepEls = ['Amount', 'Your details', 'Payment'].map(function (t, i) {
      var s = el('div', 'cfs-st');
      add(s, el('i', null, String(i + 1)), el('span', null, t));
      steps.appendChild(s);
      return s;
    });

    var body = el('div', 'cfs-body');
    var err = el('div', 'cfs-err'); err.setAttribute('role', 'alert');

    /* step 1: amount */
    var p1 = el('div', 'cfs-pane');
    p1.appendChild(el('h3', null, 'Choose your gift'));
    var seg = el('div', 'cfs-seg');
    var bOnce = el('button', 'on', 'One time'); bOnce.type = 'button';
    var bMon = el('button', null, 'Monthly'); bMon.type = 'button';
    add(seg, bOnce, bMon);
    function setMonthly(on) { st.monthly = on; bOnce.className = on ? '' : 'on'; bMon.className = on ? 'on' : ''; sumLine(); }
    bOnce.addEventListener('click', function () { setMonthly(false); });
    bMon.addEventListener('click', function () { setMonthly(true); });
    var chips = el('div', 'cfs-chips');
    var other = document.createElement('input');
    other.type = 'number'; other.min = String(CFG.MIN); other.step = '1'; other.setAttribute('inputmode', 'decimal');
    other.className = 'cfs-in'; other.id = 'cfs-other'; other.placeholder = 'Other amount';
    function pickAmt(a, btn) {
      st.amount = a;
      [].forEach.call(chips.querySelectorAll('button'), function (b) { b.className = 'cfs-chip' + (b === btn ? ' on' : ''); });
      if (btn) other.value = '';
      sumLine();
    }
    CFG.AMOUNTS.forEach(function (a) {
      var b = el('button', 'cfs-chip', money(a)); b.type = 'button';
      b.addEventListener('click', function () { pickAmt(a, b); });
      chips.appendChild(b);
    });
    other.addEventListener('input', function () { pickAmt(Math.round((parseFloat(other.value) || 0) * 100) / 100, null); });
    add(p1, seg, chips, add(el('label', 'cfs-other'), el('span', null, '$'), other));

    /* step 2: details */
    var inputs = {};
    function field(key, label, type, o) {
      o = o || {};
      var w = el('label', 'cfs-fld' + (o.half ? ' half' : ''));
      var i = document.createElement(type === 'textarea' ? 'textarea' : 'input');
      if (type !== 'textarea') i.type = type || 'text';
      i.className = 'cfs-in'; i.id = 'cfs-' + key;
      if (o.ac) i.setAttribute('autocomplete', o.ac);
      if (o.max) i.maxLength = o.max;
      add(w, el('span', null, label + (o.req ? ' *' : '')), i);
      inputs[key] = { el: i, req: !!o.req, label: label };
      return w;
    }
    function v(k) { return inputs[k] ? inputs[k].el.value.trim() : ''; }
    var p2 = el('div', 'cfs-pane');
    p2.appendChild(el('h3', null, 'Your details'));
    var g2 = el('div', 'cfs-grid');
    add(g2,
      field('first', 'First name', 'text', { req: true, half: true, ac: 'given-name', max: 60 }),
      field('last', 'Last name', 'text', { req: true, half: true, ac: 'family-name', max: 60 }),
      field('email', 'Email (for your receipt)', 'email', { req: true, ac: 'email', max: 120 }),
      field('phone', 'Phone', 'tel', { ac: 'tel', max: 30 }),
      field('note', 'Dedication or note (optional)', 'textarea', { max: 400 }));
    var trap = el('label', 'cfs-trap');
    var trapIn = document.createElement('input'); trapIn.type = 'text'; trapIn.tabIndex = -1; trapIn.setAttribute('autocomplete', 'off');
    add(trap, el('span', null, 'Leave this empty'), trapIn);
    add(p2, g2, trap);

    /* step 3: payment */
    var p3 = el('div', 'cfs-pane');
    p3.appendChild(el('h3', null, 'Payment'));
    var sum3 = el('div', 'cfs-sum3');
    var peHost = el('div', 'cfs-pe'); peHost.id = 'cfs-pe';
    var secure = el('p', 'cfs-secure', 'Payments are processed securely by Stripe. Your card or bank details go directly to Stripe and are never stored by us.');
    add(p3, sum3, peHost, secure);

    /* step 4: done */
    var p4 = el('div', 'cfs-pane cfs-done');

    var panes = [p1, p2, p3, p4];
    add(body, err, p1, p2, p3, p4);

    var ft = el('div', 'cfs-ft');
    var back = el('button', 'cfs-btn cfs-ghost', 'Back'); back.type = 'button';
    var sumEl = el('div', 'cfs-sum');
    var next = el('button', 'cfs-btn cfs-gold', 'Continue'); next.type = 'button';
    add(ft, back, sumEl, next);
    add(box, hd, steps, body, ft);
    ov.appendChild(box);
    document.body.appendChild(ov);

    function sumLine() {
      var t = st.amount > 0 ? money(st.amount) + (st.monthly ? ' a month' : ' one time') : '';
      sumEl.textContent = st.step < 4 ? t : '';
      sum3.textContent = t ? 'Your gift: ' + t : '';
      if (st.step === 3) next.textContent = st.amount > 0 ? 'Donate ' + money(st.amount) + (st.monthly ? ' a month' : '') : 'Donate';
    }
    function setErr(m) { err.textContent = m || ''; if (m) body.scrollTop = 0; }
    function show(n) {
      st.step = n;
      panes.forEach(function (p, i) { p.className = p.className.replace(/ on\b/g, '') + (i === n - 1 ? ' on' : ''); });
      stepEls.forEach(function (s, i) { s.className = 'cfs-st' + (i === n - 1 ? ' on' : i < n - 1 ? ' done' : ''); });
      steps.style.display = n === 4 ? 'none' : '';
      back.style.visibility = n === 1 || n === 4 ? 'hidden' : 'visible';
      next.style.display = n === 4 ? 'none' : '';
      ft.style.display = n === 4 ? 'none' : '';
      next.textContent = 'Continue';
      sumLine();
      body.scrollTop = 0;
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
      return '';
    }
    function check2() {
      for (var k in inputs) if (inputs[k].req && !v(k)) { inputs[k].el.focus(); return 'Please fill in ' + inputs[k].label.replace(/ \(.*\)$/, '').toLowerCase() + '.'; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) { inputs.email.el.focus(); return 'Please check your email address.'; }
      return '';
    }
    function donor() {
      return { first: v('first'), last: v('last'), email: v('email'), phone: v('phone'), note: v('note') };
    }

    /* Create (or reuse) the Stripe payment for exactly these details, then show Stripe's box. */
    var stripe = null, elements = null, pe = null, peKind = '';
    function prepare() {
      var d = donor();
      var sig = [st.amount, st.monthly ? 'm' : 'o', d.first, d.last, d.email, d.phone, d.note].join('|');
      if (st.start && st.sig === sig && (pe || DEMO)) { show(3); return; }
      if (st.sig !== sig) st.attempt = rid();
      busy(true, 'One moment…');
      peHost.innerHTML = '';
      add(peHost, add(el('div', 'cfs-wait'), el('div', 'cfs-spin'), el('span', null, 'Preparing secure payment…')));
      show(3); busy(true, 'One moment…');
      var req = { action: 'start', amount: st.amount, mode: st.monthly ? 'monthly' : 'once', attempt: st.attempt,
        first: d.first, last: d.last, email: d.email, phone: d.phone, note: d.note, website: trapIn.value,
        page: location.href.split('#')[0].slice(0, 300) };
      api(req).then(function (r) {
        if (!r || !r.ok) throw new Error((r && r.error) || 'Something went wrong. Please try again.');
        st.start = r; st.sig = sig;
        emit('start', { req: req, res: r });
        return mountPayment(r, d);
      }).then(function () {
        busy(false);
      }, function (e) {
        busy(false);
        st.start = null; st.sig = '';
        show(2);
        setErr(e && e.message && !/fetch|network|load/i.test(e.message) ? e.message : 'We couldn’t reach the payment system. Please check your connection and try again.');
      });
    }

    function mountPayment(r, d) {
      if (DEMO) { peHost.innerHTML = ''; peHost.appendChild(demoBox()); return Promise.resolve(); }
      return loadStripe().then(function (s) {
        stripe = s;
        if (pe) { try { pe.destroy(); } catch (e) {} pe = null; }
        elements = stripe.elements({
          clientSecret: r.clientSecret,
          fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700' }],
          appearance: {
            theme: 'stripe',
            variables: { colorPrimary: '#2aa996', colorText: NAVY, colorDanger: '#b3261e', fontFamily: 'Montserrat, Helvetica Neue, Arial, sans-serif', borderRadius: '10px', spacingUnit: '4px' },
            rules: { '.Input': { border: '1.5px solid #d5e2e6', boxShadow: 'none' }, '.Label': { fontWeight: '700', color: '#4a5d64' } }
          }
        });
        pe = elements.create('payment', {
          layout: { type: 'accordion', defaultCollapsed: false, radios: true, spacedAccordionItems: true },
          defaultValues: { billingDetails: { name: d.first + ' ' + d.last, email: d.email, phone: d.phone } },
          business: { name: CFG.ORG }
        });
        pe.on('change', function (ev) { peKind = ev && ev.value && ev.value.type || peKind; });
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
      var u = new URL(location.href);
      u.hash = '';
      ['payment_intent', 'payment_intent_client_secret', 'redirect_status', 'cfs'].forEach(function (k) { u.searchParams.delete(k); });
      u.searchParams.set('cfs', 'return');
      return u.toString();
    }

    function pay() {
      if (st.busy || !st.start) return;
      setErr('');
      busy(true, 'Processing…');
      var d = donor();
      store('cfs-pending', { id: st.start.id, amount: st.amount, monthly: st.monthly, first: d.first, email: d.email, t: Date.now() });
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
          thanks(pi.status, { amount: st.amount, monthly: st.monthly, first: d.first, email: d.email });
          finish(pi.id).then(function () { store('cfs-pending', null); });
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
      var gift = money(g.amount) + (g.monthly ? ' a month' : '');
      add(p4,
        el('div', 'cfs-ok' + (bank ? ' wait' : ''), bank ? '⏳' : '✓'),
        el('h3', null, 'Thank you' + (g.first ? ', ' + g.first : '') + '!'),
        el('p', null, bank
          ? 'Your gift of ' + gift + ' is on its way. Bank payments take up to ' + CFG.BANK_DAYS + ' to clear.'
          : (g.monthly ? 'Your monthly gift of ' + money(g.amount) + ' is set up.' : 'Your gift of ' + gift + ' has been received.')),
        el('p', null, bank
          ? 'We’ll email your receipt' + (g.email ? ' to ' + g.email : '') + ' as soon as it clears.'
          : 'A receipt is on its way' + (g.email ? ' to ' + g.email : '') + '.'));
      var close = el('button', 'cfs-btn cfs-gold', 'Close'); close.type = 'button';
      close.addEventListener('click', closeM);
      p4.appendChild(close);
      st.start = null; st.sig = '';
      show(4);
      try { if (window.gtag) window.gtag('event', 'donation', { value: Number(g.amount), currency: 'USD', monthly: !!g.monthly }); } catch (e) {}
      emit('done', { status: status, gift: g });
    }

    next.addEventListener('click', function () {
      if (st.busy) return;
      setErr('');
      if (st.step === 1) { var e1 = check1(); if (e1) return setErr(e1); show(2); setTimeout(function () { inputs.first.el.focus(); }, 50); return; }
      if (st.step === 2) { var e2 = check2(); if (e2) return setErr(e2); prepare(); return; }
      if (st.step === 3) pay();
    });
    back.addEventListener('click', function () { if (st.busy) return; setErr(''); if (st.step > 1) show(st.step - 1); });
    x.addEventListener('click', closeM);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeM(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && M && !/cfs-off/.test(ov.className)) closeM(); });

    /* ---------- preview-only stand-ins ---------- */
    var demoKind = 'card';
    function demoBox() {
      var w = el('div', 'cfs-demo');
      var tabs = el('div', 'cfs-demo-tabs');
      var bodyD = el('div');
      var kinds = [['card', 'Card'], ['google_pay', 'Google Pay'], ['cashapp', 'Cash App Pay'], ['us_bank_account', 'Bank account']];
      function paint() {
        [].forEach.call(tabs.children, function (b, i) { b.className = kinds[i][0] === demoKind ? 'on' : ''; });
        bodyD.innerHTML = '';
        if (demoKind === 'card') {
          var g = el('div', 'cfs-grid');
          [['Card number', '4242 4242 4242 4242', ''], ['Expiration', '12 / 29', 'half'], ['Security code', '123', 'half']].forEach(function (f) {
            var l = el('label', 'cfs-fld ' + f[2]); var i = el('input', 'cfs-in'); i.value = f[1]; add(l, el('span', null, f[0]), i); g.appendChild(l);
          });
          bodyD.appendChild(g);
        } else if (demoKind === 'us_bank_account') {
          bodyD.appendChild(el('p', null, 'The donor signs in to their bank (or types the routing and account number) in a secure Stripe window.'));
        } else {
          bodyD.appendChild(el('p', null, (demoKind === 'cashapp' ? 'Cash App Pay opens Cash App (or shows a QR code on a computer), then comes back here.' : 'Google Pay opens its own payment sheet.')));
        }
      }
      kinds.forEach(function (k) { var b = el('button', null, k[1]); b.type = 'button'; b.addEventListener('click', function () { demoKind = k[0]; peKind = k[0]; paint(); }); tabs.appendChild(b); });
      add(w, tabs, bodyD, el('p', 'cfs-demo-note', 'Preview only. On the site this box is Stripe’s own secure payment form, with these same choices.'));
      paint();
      return w;
    }
    function demoConfirm() {
      return new Promise(function (res) {
        setTimeout(function () {
          res({ paymentIntent: { id: st.start.id, status: demoKind === 'us_bank_account' ? 'processing' : 'succeeded', kind: demoKind } });
        }, 900);
      });
    }

    function openM() {
      ov.className = '';
      document.documentElement.style.overflow = 'hidden';
      if (st.step === 4) { show(1); }
      if (!st.step || st.step < 1) show(1);
      setTimeout(function () { try { x.focus(); } catch (e) {} }, 30);
    }
    function closeM() {
      if (st.busy) return;
      ov.className = 'cfs-off';
      document.documentElement.style.overflow = '';
      if (/^#donate$/i.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
      if (st.step === 4) { setErr(''); show(1); }
    }

    show(1);
    return {
      ov: ov, open: openM, close: closeM, show: show, setErr: setErr, thanks: thanks,
      restore: function (p) {
        if (!p) return;
        st.amount = p.amount || 0; st.monthly = !!p.monthly;
        setMonthly(st.monthly);
        if (p.first) inputs.first.el.value = p.first;
        if (p.email) inputs.email.el.value = p.email;
        var hit = null;
        [].forEach.call(chips.querySelectorAll('button'), function (b) { if (b.textContent === money(st.amount)) hit = b; });
        if (hit) pickAmt(st.amount, hit); else { other.value = st.amount || ''; pickAmt(st.amount, null); }
      },
      state: st
    };
  }

  function getM() { if (!M) M = build(); return M; }

  function open() {
    if (!READY) { log('not configured (ENDPOINT / PUBLISHABLE_KEY empty)'); return false; }
    getM().open();
    return true;
  }

  /* Donor came back from Cash App (or a bank window that redirected). */
  function handleReturn() {
    var q = new URLSearchParams(location.search);
    var id = q.get('payment_intent'), secret = q.get('payment_intent_client_secret'), rs = q.get('redirect_status');
    if (!id || !secret || !/^pi_/.test(id)) return;
    var clean = new URL(location.href);
    ['payment_intent', 'payment_intent_client_secret', 'redirect_status', 'cfs'].forEach(function (k) { clean.searchParams.delete(k); });
    try { history.replaceState(null, '', clean.pathname + clean.search + clean.hash); } catch (e) {}
    var pend = read('cfs-pending');
    if (pend && pend.id !== id) pend = null;
    var m = getM();
    m.open();
    m.show(3);
    m.setErr('');
    loadStripe().then(function (s) { return s.retrievePaymentIntent(secret); }).then(function (r) {
      var pi = r && r.paymentIntent;
      if (pi && (pi.status === 'succeeded' || pi.status === 'processing')) {
        m.thanks(pi.status, { amount: pend ? pend.amount : pi.amount / 100, monthly: pend ? pend.monthly : false, first: pend && pend.first, email: pend && pend.email });
        finish(pi.id).then(function () { store('cfs-pending', null); });
      } else {
        m.restore(pend);
        m.show(1);
        m.setErr(rs === 'failed' || (pi && pi.status === 'requires_payment_method')
          ? 'Your payment wasn’t completed. Please try again or choose another payment method.'
          : 'We couldn’t confirm your payment. If you were charged, you’ll get a receipt by email shortly.');
      }
    }, function () {
      m.show(1);
      m.setErr('We couldn’t confirm your payment. If you were charged, you’ll get a receipt by email shortly.');
      finish(id);
    });
  }

  /* ---------- preview-only backend ---------- */
  function demoApi(b) {
    return new Promise(function (res) {
      setTimeout(function () {
        if (b.action === 'start') {
          if (b.amount < CFG.MIN) return res({ ok: false, error: 'The smallest gift is $' + CFG.MIN + '.' });
          return res({ ok: true, clientSecret: 'pi_demo_secret', id: 'pi_3Q' + rid().slice(0, 12).toUpperCase(), mode: b.mode, live: false });
        }
        if (b.action === 'finish') return res({ ok: true, status: 'succeeded', receipt: true });
        res({ ok: false });
      }, 500);
    });
  }

  window.CFStripe = { version: VERSION, ready: READY, open: open, close: function () { if (M) M.close(); } };
  log('loaded' + (DEMO ? ' (preview demo)' : READY ? '' : ' - not configured yet'));
  if (READY && !DEMO && /[?&]payment_intent=/.test(location.search)) {
    if (document.body) handleReturn(); else document.addEventListener('DOMContentLoaded', handleReturn);
  }
})();
