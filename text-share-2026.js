/* TEXT SHARE 2026 - hidden page at https://chanukahfestival.org/?text
   Used by the Text button in festival emails. Gmail on Android strips sms: links, so the
   button opens this page (HTTP 200 on the festival homepage) instead. On a phone it
   immediately opens Messages with the invitation filled in; everyone sees a branded
   fallback (tap to text, copy the message, back to the festival page). noindex.
   Preview hook (local preview only): window.TS26_PREVIEW = { demo: true, onSms: fn }.
   Public file: no secrets here. */
(function () {
  'use strict';
  if (window.TS26 && window.TS26.version) return;

  var VERSION = 'ts26-2026-11-12a';
  var PV = window.TS26_PREVIEW || null;
  var DEMO = !!(PV && PV.demo);
  var SELF_SRC = (document.currentScript && document.currentScript.src) || '';
  if (!SELF_SRC) {
    var ss = document.getElementsByTagName('script');
    for (var si = ss.length - 1; si >= 0; si--) if (/\/text-share-2026\.js(\?|$)/.test(ss[si].src)) { SELF_SRC = ss[si].src; break; }
  }
  var BASE = SELF_SRC ? SELF_SRC.split('?')[0].replace(/[^\/]+$/, '') : 'https://virtualshliach.github.io/riverside-footer/';

  /* Exact invitation from the festival emails (curly apostrophe, en dash in the time). */
  var MSG = 'Join us for Riverside\u2019s Chanukah Festival! Monday, Dec 7, 6–8 PM at the Riverside Historic Courthouse. Free family fun, live music and the Grand Menorah Lighting. Visit ChanukahFestival.org: https://chanukahfestival.org/';
  var SMS = 'sms:?&body=' + encodeURIComponent(MSG);

  var CFG = {
    HOSTS: ['chanukahfestival.org', '12899.centers.clhosting.org'],
    festivalUrl: 'https://chanukahfestival.org/',
    host: 'Chabad Jewish Community Center of Riverside',
    logo: 'chabad-jcc-logo-white-gold.png',
    KICK: '22nd Annual Chanukah Festival',
    TITLE: 'Text a friend',
    INTRO: 'Opens your Messages app with this invitation filled in.'
  };

  /* ---------- guard: festival site, /?text only ---------- */
  var L = window.location;
  var hostOk = CFG.HOSTS.indexOf((L.hostname || '').toLowerCase().replace(/^www\./, '')) > -1;
  var pathOk = (L.pathname === '/' || L.pathname === '') && /[?&]text(?:[=&]|$)/i.test(L.search);
  if (!DEMO && !(hostOk && pathOk)) return;

  /* festival brand, Arial so it reads the same on every device */
  var NAVY = '#0A5769', DEEP = '#08414f', TEAL = '#107A8C', GOLD = '#B08141', LIGHT = '#E2F4F7', MUTED = '#d7eef2';
  var FONT = 'Arial,Helvetica,sans-serif';

  function log(m) { if (window.console) console.log('[Text share ' + VERSION + '] ' + m); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(arguments[i]); return p; }
  function link(cls, href, text) { var a = el('a', cls, text); a.href = href; return a; }

  function isPhone() {
    var ua = navigator.userAgent || '';
    return /iPhone|iPod|Android.+Mobile|Windows Phone|IEMobile/i.test(ua);
  }

  function tryOpenSms() {
    if (DEMO && !(PV && PV.forceSms)) return;
    if (!isPhone() && !(PV && PV.forceSms)) return;
    window.TS26.smsAttempted = SMS;
    if (PV && typeof PV.onSms === 'function') {
      try { PV.onSms(SMS); } catch (e) {}
      return;
    }
    try { window.location.href = SMS; } catch (e) {}
  }

  function head() {
    var h = document.head || document.documentElement;
    var rb = document.querySelector('meta[name="robots"]');
    if (!rb) { rb = document.createElement('meta'); rb.setAttribute('name', 'robots'); h.appendChild(rb); }
    rb.setAttribute('content', 'noindex, nofollow');
    var cn = document.querySelector('link[rel="canonical"]');
    if (cn && cn.parentNode) cn.parentNode.removeChild(cn);
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement('meta'); vp.setAttribute('name', 'viewport'); vp.setAttribute('content', 'width=device-width, initial-scale=1'); h.appendChild(vp); }
    document.title = 'Text a friend | Riverside Chanukah Festival';
  }

  function css() {
    if (document.getElementById('ts26-css')) return;
    var R = '#ts26 ';
    var rules = [
      'html,body{background:' + LIGHT + ' !important;margin:0 !important;padding:0 !important}',
      'body > *:not(#ts26){display:none !important}',
      '#ts26{display:block !important;min-height:100vh;background:linear-gradient(180deg,' + NAVY + ' 0,' + TEAL + ' 280px,' + LIGHT + ' 280px);font-family:' + FONT + ';color:#fff;-webkit-font-smoothing:antialiased;padding:0 16px 56px;box-sizing:border-box}',
      R + '*{box-sizing:border-box;margin:0;padding:0}',
      R + '.ts-top{max-width:680px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 0 6px}',
      R + '.ts-top img{height:44px;width:auto;display:block}',
      R + '.ts-bh{font-size:13px;color:#fff;letter-spacing:.04em;font-family:' + FONT + '}',
      R + '.ts-hero{max-width:680px;margin:18px auto 22px;text-align:center}',
      R + '.ts-kick{font-family:' + FONT + ';color:#f3dcb4;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;line-height:1.3}',
      R + 'h1{font-family:' + FONT + ';font-weight:800;color:#fff;font-size:36px;line-height:1.15;margin-top:8px}',
      R + '.ts-intro{color:' + MUTED + ';font-weight:400;font-size:16px;line-height:1.55;margin:14px auto 0;max-width:36ch}',
      R + '.ts-card{max-width:680px;margin:0 auto;background:#fff;color:' + DEEP + ';border-radius:20px;box-shadow:0 18px 50px rgba(10,87,105,.22);border-top:5px solid ' + GOLD + ';font-size:16px;line-height:1.5;text-align:left;padding:26px 28px 28px}',
      R + '.ts-sms{display:flex;width:100%;align-items:center;justify-content:center;padding:18px 26px;border-radius:999px;font-family:' + FONT + ';font-weight:700;font-size:1.15rem;letter-spacing:.02em;background:' + GOLD + ';color:#fff;box-shadow:0 8px 22px rgba(176,129,65,.32);text-decoration:none;text-align:center}',
      R + '.ts-lab{font-size:.8rem;font-weight:700;color:#4a5d64;letter-spacing:.02em;margin:22px 0 8px}',
      R + '.ts-msg{width:100%;min-height:132px;padding:14px 14px;font-family:' + FONT + ';font-size:1rem;line-height:1.55;color:' + NAVY + ';background:' + LIGHT + ';border:1.5px solid #d5e2e6;border-radius:12px;resize:none;outline:none}',
      R + '.ts-msg:focus{border-color:' + TEAL + ';box-shadow:0 0 0 3px rgba(16,122,140,.18)}',
      R + '.ts-copy{display:flex;width:100%;align-items:center;justify-content:center;margin-top:12px;padding:14px 26px;border-radius:999px;font-family:' + FONT + ';font-weight:700;font-size:1rem;letter-spacing:.02em;background:#fff;color:' + NAVY + ';border:2px solid ' + TEAL + ';cursor:pointer}',
      R + '.ts-copy.ts-copied{background:' + LIGHT + ';border-color:' + GOLD + '}',
      R + '.ts-status{min-height:1.2em;margin-top:8px;font-size:.85rem;color:' + TEAL + ';text-align:center}',
      R + '.ts-foot{max-width:680px;margin:22px auto 0;text-align:center;font-size:.95rem;color:#33474f;font-family:' + FONT + '}',
      R + '.ts-foot a{color:' + NAVY + ';font-weight:700;text-decoration:none}',
      '@media (max-width:560px){' + R + 'h1{font-size:30px}' + R + '.ts-card{padding:22px 18px 22px}' + R + '.ts-top img{height:38px}}'
    ];
    var st = document.createElement('style');
    st.id = 'ts26-css';
    st.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  function copyMessage(box, btn, status) {
    function ok() {
      btn.textContent = 'Copied!';
      btn.className = 'ts-copy ts-copied';
      status.textContent = 'Message copied. Paste it into a text to a friend.';
      setTimeout(function () {
        btn.textContent = 'Copy message';
        btn.className = 'ts-copy';
        status.textContent = '';
      }, 2000);
    }
    function fallback() {
      try {
        box.focus();
        if (typeof box.select === 'function') box.select();
        else if (typeof box.setSelectionRange === 'function') box.setSelectionRange(0, box.value.length);
        var copied = false;
        try { copied = document.execCommand('copy'); } catch (e) {}
        if (copied) ok();
        else status.textContent = 'Select the message above, then copy it.';
      } catch (e) {
        try { if (typeof box.select === 'function') box.select(); } catch (e2) {}
        status.textContent = 'Select the message above, then copy it.';
      }
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(MSG).then(ok, fallback);
    } else {
      fallback();
    }
  }

  function build() {
    var root = el('div'); root.id = 'ts26';
    root.setAttribute('role', 'main');

    var top = el('div', 'ts-top');
    var logoA = link(null, CFG.festivalUrl);
    var logo = document.createElement('img'); logo.src = BASE + CFG.logo; logo.alt = CFG.host; logo.width = 120; logo.height = 44;
    logoA.appendChild(logo);
    add(top, logoA, el('span', 'ts-bh', 'B"H'));

    var hero = el('div', 'ts-hero');
    add(hero, el('div', 'ts-kick', CFG.KICK), el('h1', null, CFG.TITLE), el('p', 'ts-intro', CFG.INTRO));

    var card = el('div', 'ts-card');
    var smsBtn = link('ts-sms', SMS, 'Tap to text a friend');
    smsBtn.id = 'ts26-sms';
    var lab = el('label', 'ts-lab', 'Invitation');
    lab.setAttribute('for', 'ts26-msg');
    var box = document.createElement('textarea');
    box.id = 'ts26-msg';
    box.className = 'ts-msg';
    box.value = MSG;
    box.readOnly = true;
    box.setAttribute('aria-label', 'Invitation message');
    box.rows = 7;
    var copyBtn = el('button', 'ts-copy', 'Copy message');
    copyBtn.type = 'button';
    copyBtn.id = 'ts26-copy';
    var status = el('div', 'ts-status');
    status.id = 'ts26-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    copyBtn.addEventListener('click', function () { copyMessage(box, copyBtn, status); });
    add(card, smsBtn, lab, box, copyBtn, status);

    var foot = el('p', 'ts-foot');
    add(foot, link(null, CFG.festivalUrl, 'Back to the festival page'));

    add(root, top, hero, card, foot);
    return root;
  }

  function uncover() {
    ['ts26-cover', 'cf26-cover', 'vf26-cover'].forEach(function (id) {
      var c = document.getElementById(id);
      if (c && c.parentNode) c.parentNode.removeChild(c);
    });
  }

  function boot() {
    if (document.getElementById('ts26')) return;
    head();
    css();
    document.body.appendChild(build());
    uncover();
    log(DEMO ? 'preview ready' : 'text share page ready');
    tryOpenSms();
  }

  window.TS26 = { version: VERSION, message: MSG, smsHref: SMS, smsAttempted: null };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
