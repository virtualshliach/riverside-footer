/* VOLUNTEER SIGN-UP 2026 - Chanukah Festival, Chabad Jewish Community Center of Riverside
   Hidden page at https://chanukahfestival.org/volunteer (community emails only).
   Not in the festival menu, body, footer or sitemap; the page carries noindex.
   chanukahfestival.org has no ChabadOne page at /volunteer, so the address reaches the site's
   "Page Not Found" page with the address kept (same as the /guess short link). footer.js sees
   the path and loads this file, which replaces that page with the sign-up form.
   https://chanukahfestival.org/?volunteer shows the same page (backup address).

   Entries go to the "Chanukah Festival" Google Sheet through the same Apps Script web app as
   festival-forms.js, as { action: 'form', kind: 'volunteer' } (Volunteers tab, see HANDOFF).
   Until Apps Script knows that kind it answers "Unknown form."; the entry is then saved as a
   Mailing List entry with the interest "Volunteering" and the chosen roles, so nothing is lost.

   Preview hook (local preview only): window.VF26_PREVIEW = { demo: true, onEvent: fn }.
   Public file: no secrets here. */
(function () {
  'use strict';
  if (window.VF26 && window.VF26.version) return;

  var VERSION = 'vf26-2026-11-12d';
  var PV = window.VF26_PREVIEW || null;
  var DEMO = !!(PV && PV.demo);
  var SELF_SRC = (document.currentScript && document.currentScript.src) || '';
  if (!SELF_SRC) {
    var ss = document.getElementsByTagName('script');
    for (var si = ss.length - 1; si >= 0; si--) if (/\/volunteer-2026\.js(\?|$)/.test(ss[si].src)) { SELF_SRC = ss[si].src; break; }
  }
  var BASE = SELF_SRC ? SELF_SRC.split('?')[0].replace(/[^\/]+$/, '') : 'https://virtualshliach.github.io/riverside-footer/';

  var CFG = {
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbxJDFJg_llgI5vqnwbIlStreWtDEL_4q4SG3joSWfXL9lbsn7ogu1XqjVEh4kTPkrHcGg/exec',
    /* If Apps Script does not know kind 'volunteer' yet, save the entry as a Mailing List entry. */
    FALLBACK_TO_MAILING: true,
    HOSTS: ['chanukahfestival.org', '12899.centers.clhosting.org'],
    PHONE: '951-222-2005',
    PHONE_TEL: '+19512222005',
    festivalUrl: 'https://chanukahfestival.org/',
    host: 'Chabad Jewish Community Center of Riverside',
    logo: 'chabad-jcc-logo-white-gold.png',
    KICK: '22nd Annual Chanukah Festival',
    TITLE: 'Volunteer With Us',
    WHEN: ['Monday, Dec 7, 2026 · 6–8 PM', 'Riverside Historic Courthouse'],
    INTRO: 'Help us light up downtown Riverside! Pick what you’d like to do, and we’ll be in touch with the details.',
    ROLES: ['Early setup (12–4 PM)', 'Setup (from about 4 PM)', 'Gift tables', 'Kids’ activities', 'Food and latkes', 'Greeting and info', 'Cleanup (after 8 PM)', 'Wherever I’m needed'],
    BUTTON: 'Sign me up',
    PRIVACY: 'We use this only to plan festival volunteers. We never share it.'
  };

  /* ---------- guard: festival site, /volunteer or /?volunteer only ---------- */
  var L = window.location;
  var hostOk = CFG.HOSTS.indexOf((L.hostname || '').toLowerCase().replace(/^www\./, '')) > -1;
  var pathOk = /^\/volunteer\/?$/i.test(L.pathname) || ((L.pathname === '/' || L.pathname === '') && /[?&]volunteer(?:[=&]|$)/i.test(L.search));
  if (!DEMO && !(hostOk && pathOk)) return;

  /* festival brand: Montserrat; teal #0A5769 / #107A8C, gold #B08141, light teal #E2F4F7 */
  var NAVY = '#0A5769', DEEP = '#08414f', TEAL = '#107A8C', GOLD = '#B08141', LIGHT = '#E2F4F7', MUTED = '#d7eef2';
  var DISP = '"Montserrat","Helvetica Neue",Arial,sans-serif';
  var SCRIPT = DISP;
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';

  function log(m) { if (window.console) console.log('[Volunteer ' + VERSION + '] ' + m); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(arguments[i]); return p; }
  function link(cls, href, text) { var a = el('a', cls, text); a.href = href; return a; }
  function emit(type, data) { if (PV && typeof PV.onEvent === 'function') { try { PV.onEvent(type, data); } catch (e) {} } }

  function head() {
    var h = document.head || document.documentElement;
    if (!document.getElementById('vf26-fonts')) {
      var l = document.createElement('link');
      l.id = 'vf26-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap';
      h.appendChild(l);
    }
    /* hidden page: keep it out of search engines */
    var rb = document.querySelector('meta[name="robots"]');
    if (!rb) { rb = document.createElement('meta'); rb.setAttribute('name', 'robots'); h.appendChild(rb); }
    rb.setAttribute('content', 'noindex, nofollow');
    var cn = document.querySelector('link[rel="canonical"]');
    if (cn && cn.parentNode) cn.parentNode.removeChild(cn);
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement('meta'); vp.setAttribute('name', 'viewport'); vp.setAttribute('content', 'width=device-width, initial-scale=1'); h.appendChild(vp); }
    document.title = 'Volunteer With Us | Riverside Chanukah Festival';
  }

  function css() {
    if (document.getElementById('vf26-css')) return;
    var R = '#vf26 ';
    var rules = [
      'html,body{background:' + LIGHT + ' !important;margin:0 !important;padding:0 !important;font-size:16px !important}',
      'body > *:not(#vf26){display:none !important}',
      '#vf26{display:block !important;min-height:100vh;background:linear-gradient(180deg,' + NAVY + ' 0,' + TEAL + ' 330px,' + LIGHT + ' 330px);font-family:' + BODY + ';color:#fff;-webkit-font-smoothing:antialiased;padding:0 16px 56px;box-sizing:border-box}',
      R + '*{box-sizing:border-box;margin:0;padding:0}',
      R + '.vf-top{max-width:680px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 0 6px}',
      R + '.vf-top img{height:44px;width:auto;display:block}',
      R + '.vf-bh{font-size:13px;color:#fff;letter-spacing:.04em}',
      R + '.vf-hero{max-width:680px;margin:18px auto 22px;text-align:center}',
      R + '.vf-kick{font-family:' + SCRIPT + ';color:#f3dcb4;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;line-height:1.3}',
      R + 'h1{font-family:' + DISP + ';font-weight:800;color:#fff;font-size:40px;line-height:1.12;margin-top:6px}',
      R + '.vf-when{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 14px;margin-top:12px;font-weight:700;color:#fff;font-size:13.5px;letter-spacing:.06em;text-transform:uppercase}',
      R + '.vf-when span{white-space:nowrap}',
      R + '.vf-when span + span:before{content:"\\2022";color:#f3dcb4;margin-right:14px}',
      R + '.vf-intro{color:' + MUTED + ';font-weight:400;font-size:16px;line-height:1.6;margin:14px auto 0;max-width:44ch}',
      R + '.vf-card{max-width:680px;margin:0 auto;background:#fff;color:' + DEEP + ';border-radius:20px;box-shadow:0 18px 50px rgba(10,87,105,.22);border-top:5px solid ' + GOLD + ';font-size:16px;line-height:1.5;text-align:left}',
      R + '.vf-body{padding:26px 28px 8px}',
      R + 'button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}',
      R + '.vf-err{background:#fdecea;color:#8a1f12;border:1px solid #f4c4bd;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:16px}',
      R + '.vf-err:empty{display:none}',
      R + '.vf-grid{display:flex;flex-wrap:wrap;gap:14px 12px}',
      R + '.vf-fld{display:flex;flex-direction:column;gap:5px;flex:1 1 100%;min-width:0}',
      R + '.vf-fld.half{flex:1 1 calc(50% - 6px)}',
      R + '.vf-lab{font-size:16px;font-weight:600;color:#4a5d64;letter-spacing:.02em}',
      R + '.vf-in{width:100%;padding:12px 13px;font:inherit;font-size:16px;color:' + NAVY + ';background:#fff;border:1.5px solid #d5e2e6;border-radius:10px;outline:none}',
      R + '.vf-in:focus{border-color:' + TEAL + ';box-shadow:0 0 0 3px rgba(16,122,140,.18)}',
      R + 'textarea.vf-in{min-height:84px;resize:vertical}',
      R + '.vf-set{border:0;flex:1 1 100%;margin-top:4px}',
      R + '.vf-set legend{font-size:16px;font-weight:600;color:#4a5d64;letter-spacing:.02em;margin-bottom:8px}',
      R + '.vf-roles{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      R + '.vf-tick{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid #e2ebee;border-radius:12px;font-size:17px;line-height:1.35;color:' + NAVY + ';cursor:pointer;background:#fff}',
      R + '.vf-tick:has(input:checked){border-color:' + TEAL + ';background:' + LIGHT + '}',
      R + '.vf-tick input{width:22px;height:22px;accent-color:' + TEAL + ';flex:none}',
      R + '.vf-trap{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}',
      R + '.vf-small{color:#6b7f86;font-size:14px;line-height:1.45;margin-top:14px}',
      R + '.vf-ft{padding:12px 28px 28px}',
      R + '.vf-btn{display:flex;width:100%;align-items:center;justify-content:center;padding:15px 26px;border-radius:999px;font-weight:700;font-size:16px;letter-spacing:.02em;background:' + GOLD + ';color:#fff;box-shadow:0 8px 22px rgba(176,129,65,.32);text-decoration:none}',
      R + '.vf-btn[disabled]{opacity:.6;cursor:wait}',
      R + '.vf-done{text-align:center;padding:34px 8px 30px}',
      R + '.vf-ok{width:64px;height:64px;border-radius:50%;background:' + TEAL + ';color:#fff;font-size:32px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}',
      R + '.vf-done h2{font-family:' + DISP + ';font-weight:800;font-size:24px;color:' + NAVY + ';margin-bottom:8px}',
      R + '.vf-done p{color:#33474f;margin:8px auto;max-width:440px}',
      R + '.vf-done a.vf-tel{color:' + NAVY + ';font-weight:700;white-space:nowrap}',
      R + '.vf-done .vf-btn{display:inline-flex;width:auto;margin-top:18px}',
      R + '.vf-foot{max-width:680px;margin:22px auto 0;text-align:center;font-size:14px;color:#33474f}',
      R + '.vf-foot a{color:' + NAVY + ';font-weight:700;text-decoration:none}',
      '@media (max-width:560px){' + R + 'h1{font-size:32px}' + R + '.vf-kick{font-size:20px}' + R + '.vf-fld.half{flex:1 1 100%}' + R + '.vf-roles{grid-template-columns:1fr}' + R + '.vf-when{flex-direction:column;align-items:center}' + R + '.vf-when span + span:before{display:none}' + R + '.vf-body{padding:22px 18px 6px}' + R + '.vf-ft{padding:10px 18px 22px}' + R + '.vf-top img{height:38px}}'
    ];
    var st = document.createElement('style');
    st.id = 'vf26-css';
    st.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- fields ---------- */
  var uid = 0;
  function field(label, type, o) {
    o = o || {};
    var w = el('div', 'vf-fld' + (o.half ? ' half' : ''));
    var i = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    if (type !== 'textarea') i.type = type || 'text';
    i.className = 'vf-in';
    i.id = 'vf26-' + (o.id || ++uid);
    if (o.ac) i.setAttribute('autocomplete', o.ac);
    if (o.im) i.setAttribute('inputmode', o.im);
    if (o.max) i.maxLength = o.max;
    if (o.placeholder) i.placeholder = o.placeholder;
    if (o.req) i.required = true;
    var lab = el('label', 'vf-lab', label + (o.req ? ' *' : ''));
    lab.setAttribute('for', i.id);
    add(w, lab, i);
    return { w: w, i: i, req: !!o.req, label: label, v: function () { return String(i.value || '').replace(/^\s+|\s+$/g, ''); } };
  }
  function roles() {
    var fs = el('fieldset', 'vf-set');
    fs.appendChild(el('legend', null, 'How would you like to help? *'));
    var box = el('div', 'vf-roles');
    var ticks = CFG.ROLES.map(function (t) {
      var w = el('label', 'vf-tick');
      var c = document.createElement('input'); c.type = 'checkbox'; c.value = t;
      add(w, c, el('span', null, t));
      box.appendChild(w);
      return c;
    });
    fs.appendChild(box);
    return {
      w: fs, ticks: ticks,
      values: function () { return ticks.filter(function (c) { return c.checked; }).map(function (c) { return c.value; }); },
      check: function () {
        if (this.values().length) return '';
        try { ticks[0].focus(); } catch (e) {}
        return 'Please choose at least one way you’d like to help.';
      }
    };
  }
  function firstMissing(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].req && !list[i].v()) { try { list[i].i.focus(); } catch (e) {} return 'Please fill in: ' + list[i].label + '.'; }
    }
    return '';
  }
  function emailBad(f) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.v())) { try { f.i.focus(); } catch (e) {} return 'Please check your email address.'; }
    return '';
  }

  /* ---------- sending ---------- */
  function post(body) {
    if (DEMO) {
      var r = (PV.reply && PV.reply(body)) || { ok: true };
      return new Promise(function (res) { setTimeout(function () { res(r); }, 400); });
    }
    /* text/plain keeps this a "simple" request (no CORS preflight), which Apps Script needs */
    return fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { return r.json(); });
  }
  /* The same entry as a Mailing List entry (used only while Apps Script lacks the volunteer kind). */
  function asMailing(req) {
    var more = ('Festival volunteer: ' + req.roles.join(', ') + (req.notes ? ' | Notes: ' + req.notes : '')).slice(0, 300);
    return { action: 'form', kind: 'mailing', website: req.website, page: req.page,
      first: req.first, last: req.last, email: req.email, phone: req.phone,
      challah: false, addr1: '', addr2: '', city: '', state: '', zip: '', texts: false, birthday: '',
      interests: ['Volunteering'].concat(req.roles.map(function (r) { return 'Volunteer: ' + r; })),
      heard: 'Other', more: more, source: 'volunteer-2026' };
  }
  function send(req) {
    return post(req).then(function (r) {
      if (CFG.FALLBACK_TO_MAILING && r && !r.ok && /unknown form/i.test(r.error || '')) {
        var m = asMailing(req);
        emit('fallback', { req: m });
        return post(m).then(function (r2) { if (r2) r2.via = 'mailing'; return r2; });
      }
      return r;
    });
  }

  /* ---------- page ---------- */
  function build() {
    var root = el('div'); root.id = 'vf26';
    root.setAttribute('role', 'main');

    var top = el('div', 'vf-top');
    var logoA = link(null, CFG.festivalUrl);
    var logo = document.createElement('img'); logo.src = BASE + CFG.logo; logo.alt = CFG.host; logo.width = 120; logo.height = 44;
    logoA.appendChild(logo);
    add(top, logoA, el('span', 'vf-bh', 'B"H'));

    var hero = el('div', 'vf-hero');
    var when = el('p', 'vf-when');
    CFG.WHEN.forEach(function (t) { when.appendChild(el('span', null, t)); });
    add(hero, el('div', 'vf-kick', CFG.KICK), el('h1', null, CFG.TITLE), when, el('p', 'vf-intro', CFG.INTRO));

    var card = el('div', 'vf-card');
    var body = el('div', 'vf-body');
    var err = el('div', 'vf-err'); err.setAttribute('role', 'alert'); err.setAttribute('aria-live', 'polite');
    var g = el('div', 'vf-grid');
    var f = {
      first: field('First name', 'text', { id: 'first', req: true, half: true, ac: 'given-name', max: 60 }),
      last: field('Last name', 'text', { id: 'last', req: true, half: true, ac: 'family-name', max: 60 }),
      email: field('Email', 'email', { id: 'email', req: true, half: true, ac: 'email', max: 120 }),
      phone: field('Phone', 'tel', { id: 'phone', req: true, half: true, ac: 'tel', im: 'tel', max: 30 })
    };
    var rg = roles();
    var notes = field('Notes', 'textarea', { id: 'notes', max: 500, placeholder: 'Anything we should know? Arrival time, a friend you’re coming with… (optional)' });
    add(g, f.first.w, f.last.w, f.email.w, f.phone.w, rg.w, notes.w);
    var trap = el('label', 'vf-trap');
    var trapIn = document.createElement('input'); trapIn.type = 'text'; trapIn.tabIndex = -1; trapIn.setAttribute('autocomplete', 'off'); trapIn.name = 'website';
    add(trap, el('span', null, 'Leave this empty'), trapIn);
    add(body, err, g, trap, el('p', 'vf-small', CFG.PRIVACY));
    var ft = el('div', 'vf-ft');
    var go = el('button', 'vf-btn', CFG.BUTTON); go.type = 'button'; go.id = 'vf26-send';
    ft.appendChild(go);
    add(card, body, ft);

    var foot = el('p', 'vf-foot');
    add(foot, document.createTextNode('Questions? Call '), link(null, 'tel:' + CFG.PHONE_TEL, CFG.PHONE), document.createTextNode('  ·  '), link(null, CFG.festivalUrl, 'Festival details'));

    add(root, top, hero, card, foot);

    var busy = false;
    function setErr(m) { err.textContent = m || ''; if (m && err.scrollIntoView) { try { err.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} } }
    go.addEventListener('click', function () {
      if (busy) return;
      setErr('');
      var problem = firstMissing([f.first, f.last, f.email, f.phone]) || emailBad(f.email) || rg.check();
      if (problem) return setErr(problem);
      var req = { action: 'form', kind: 'volunteer', website: trapIn.value, page: L.href.split('#')[0].slice(0, 300),
        first: f.first.v(), last: f.last.v(), email: f.email.v(), phone: f.phone.v(), roles: rg.values(), notes: notes.v() };
      busy = true; go.disabled = true; go.textContent = 'Sending…';
      send(req).then(function (r) {
        busy = false; go.disabled = false; go.textContent = CFG.BUTTON;
        if (!r || !r.ok) return setErr((r && r.error) || 'Something went wrong. Please try again, or call us at ' + CFG.PHONE + '.');
        emit('sent', { req: req, res: r });
        try { if (window.gtag) window.gtag('event', 'form_sent', { form: 'volunteer' }); } catch (e) {}
        card.innerHTML = '';
        var done = el('div', 'vf-done');
        var p3 = el('p', null, 'Questions before then? Call ');
        add(p3, link('vf-tel', 'tel:' + CFG.PHONE_TEL, CFG.PHONE), document.createTextNode('.'));
        add(done, el('div', 'vf-ok', '✓'), el('h2', null, 'Thank you, ' + req.first + '!'),
          el('p', null, 'You’re on our volunteer team for the Chanukah Festival. We’ll be in touch before Dec 7 with when to arrive and where to meet.'),
          p3, link('vf-btn', CFG.festivalUrl, 'See the festival page'));
        card.appendChild(done);
        try { window.scrollTo(0, 0); } catch (e) {}
      }, function () {
        busy = false; go.disabled = false; go.textContent = CFG.BUTTON;
        setErr('We couldn’t send that. Please check your connection and try again, or call us at ' + CFG.PHONE + '.');
      });
    });
    return root;
  }

  function uncover() {
    ['vf26-cover', 'cf26-cover'].forEach(function (id) {
      var c = document.getElementById(id);
      if (c && c.parentNode) c.parentNode.removeChild(c);
    });
  }

  function boot() {
    if (document.getElementById('vf26')) return;
    head();
    css();
    document.body.appendChild(build());
    uncover();
    log(DEMO ? 'preview ready (nothing is sent)' : 'volunteer page ready');
  }

  window.VF26 = { version: VERSION, config: CFG };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
