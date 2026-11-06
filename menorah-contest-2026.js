/* KIDS MENORAH CONTEST 2026 - Chabad Jewish Community Center of Riverside
   Loaded by footer.js (PAGES '7606745', onResponse). Hidden registration form, aid 7606745.
   Today this file designs the THANK-YOU page shown after a parent registers.
   It finds the platform's plain confirmation text, hides it, and shows a designed
   card in its place. The site header, menu and B"H stay as they are.
   It never touches the registration form itself. */
(function () {
  'use strict';

  var VERSION = 'mc26-2026-11-06a';
  var PREVIEW = false; /*__PREVIEW_HOOK__*/

  function ch() { return String.fromCharCode.apply(null, arguments); }
  var AMP = ch(38);

  var CFG = {
    AID: '7606745',
    /* A phrase from the platform's own confirmation text, used to find it on the page. */
    NATIVE_TEXT: 'registered for the Kids Menorah Contest',
    festivalUrl: 'https://chanukahfestival.org/',
    mapUrl: 'https://chanukahfestival.org/#map',
    facebookEvent: 'https://www.facebook.com/events/1651125113077350/',
    donateUrl: 'https://www.jewishriverside.com/donate',
    hostUrl: 'https://www.jewishriverside.com',
    host: 'Chabad Jewish Community Center of Riverside',
    startUTC: '2026-12-08T02:00:00Z',   /* 6:00 PM Pacific, Dec 7 */
    endUTC: '2026-12-08T04:00:00Z',
    place: 'Riverside Historic Courthouse, 4050 Main St, Riverside, CA 92501',
    STEPS: [
      ['When', 'Monday, Dec 7, between 5:45 and 6:15 PM'],
      ['Where', 'Menorah Contest table, #15 on the festival map, at the Riverside Historic Courthouse (4050 Main St.)'],
      ['Display', 'Menorahs stay on display at the table during the festival'],
      ['Winners', 'Announced 7:45–8 PM. Please pick up your menorah before you leave']
    ],
    SHARE_TEXT: 'My child is entering the Kids Menorah Contest at Riverside’s Chanukah Festival! Come cheer us on Monday, Dec 7, 6–8 PM at the Historic Courthouse. Winners are announced 7:45–8 PM. Kids 4–12 can enter free: https://www.jewishriverside.com/7606745',
    EMAIL_SUBJECT: 'Come cheer us on at the Chanukah Festival, Dec 7'
  };

  /* ---------- guard: this page's thank-you screen only ---------- */
  var HREF = window.location.href;
  var onPage = new RegExp('(/aid/' + CFG.AID + '(/|\\.|$))|([?\\x26]aid=' + CFG.AID + '(\\D|$))', 'i').test(HREF);
  var isResponse = HREF.indexOf('ArticleCcoResponse') > -1;
  if (!PREVIEW && !(onPage && isResponse)) return;

  /* ---------- helpers ---------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(arguments[i]); return p; }
  function link(cls, href, text, newTab) {
    var a = el('a', cls, text);
    a.href = href;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function qs(o) { return Object.keys(o).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(o[k]); }).join(AMP); }
  function copyText(s) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s);
    return new Promise(function (res, rej) {
      try {
        var t = document.createElement('textarea');
        t.value = s; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.left = '-9999px';
        document.body.appendChild(t); t.select();
        var ok = document.execCommand('copy'); document.body.removeChild(t);
        if (ok) res(); else rej();
      } catch (e) { rej(e); }
    });
  }
  var ICONS = {
    check: 'M5 12.5l4.2 4.2L19 7',
    cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
    pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    fb: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z',
    ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
    share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
    wa: 'M4 20l1.4-4.2A8 8 0 1 1 8.3 18.7zM9 9.5c.3 2 2.2 4 4.5 4.6l1-1.1 2 .8-.4 1.6c-3.7.2-7.6-3.6-7.4-7.3l1.6-.4.8 2z',
    chat: 'M4 5h16v11H9l-5 4z',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'
  };
  function icon(name) {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'mc-ic'); s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS(ns, 'path'); p.setAttribute('d', ICONS[name] || '');
    s.appendChild(p);
    return s;
  }

  /* ---------- styles (festival brand) ---------- */
  var NAVY = '#0f2730', DEEP = '#0b1f27', PANEL = '#133442', TEAL = '#3cc7b4', GOLD = '#e9b949',
      INK = '#e9f1f3', MUTED = '#c9d6da';
  var DISP = '"Arvo","Rockwell",Georgia,serif', SCRIPT = '"Kaushan Script",cursive',
      BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';
  function css() {
    return [
      '#mc26{font-family:' + BODY + ';color:' + INK + ';background:' + NAVY + ';border-radius:22px;overflow:hidden;max-width:820px;margin:8px auto 40px;text-align:left;line-height:1.6;font-size:16px;-webkit-font-smoothing:antialiased}',
      '#mc26 *{box-sizing:border-box}',
      '#mc26 h1,#mc26 h2,#mc26 p,#mc26 ul,#mc26 dl,#mc26 dd{margin:0;padding:0}',
      '#mc26 a{color:inherit}',
      '#mc26 button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}',
      '#mc26 .mc-ic{width:1.2em;height:1.2em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}',
      '#mc26 :focus-visible{outline:2px solid ' + GOLD + ';outline-offset:3px}',
      /* header band */
      '#mc26 .mc-hd{text-align:center;padding:40px 28px 34px;background:radial-gradient(ellipse 80% 90% at 50% 0%,rgba(60,199,180,.22),rgba(15,39,48,0) 70%),' + DEEP + '}',
      '#mc26 .mc-ok{width:64px;height:64px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;background:' + TEAL + ';color:' + DEEP + '}',
      '#mc26 .mc-ok .mc-ic{width:34px;height:34px;stroke-width:2.6}',
      '#mc26 .mc-kick{font-family:' + SCRIPT + ';color:' + GOLD + ';font-size:1.35rem;line-height:1.2}',
      '#mc26 h1{font-family:' + DISP + ';font-weight:700;color:#fff;font-size:clamp(1.6rem,4.4vw,2.3rem);line-height:1.15;margin-top:6px}',
      '#mc26 .mc-lead{color:' + MUTED + ';font-size:1.05rem;margin-top:12px;max-width:52ch;margin-left:auto;margin-right:auto}',
      /* body */
      '#mc26 .mc-bd{padding:30px 34px 34px}',
      '@media (max-width:600px){#mc26{border-radius:16px;margin:4px 0 28px}#mc26 .mc-hd{padding:32px 18px 26px}#mc26 .mc-bd{padding:24px 18px 28px}}',
      '#mc26 h2{font-size:.74rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:' + GOLD + ';margin:0 0 12px}',
      '#mc26 .mc-sec + .mc-sec{margin-top:30px;padding-top:28px;border-top:1px solid rgba(255,255,255,.08)}',
      '#mc26 dl{display:grid;grid-template-columns:110px minmax(0,1fr);border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;background:' + PANEL + '}',
      '#mc26 dt,#mc26 dd{padding:13px 16px;border-top:1px solid rgba(255,255,255,.07)}',
      '#mc26 dt:first-of-type,#mc26 dd:first-of-type{border-top:0}',
      '#mc26 dt{font-weight:700;color:' + TEAL + ';font-size:.92rem}',
      '#mc26 dd{color:' + INK + '}',
      '@media (max-width:480px){#mc26 dl{grid-template-columns:1fr}#mc26 dt{padding-bottom:0;border-top:1px solid rgba(255,255,255,.07)}#mc26 dd{padding-top:2px;border-top:0}}',
      '#mc26 .mc-gift{margin-top:14px;color:' + MUTED + '}',
      '#mc26 .mc-gift b{color:' + GOLD + '}',
      /* buttons */
      '#mc26 .mc-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;height:48px;padding:0 20px;border-radius:999px;font-weight:700;font-size:.9rem;text-decoration:none;white-space:nowrap;transition:transform .2s ease}',
      '#mc26 .mc-btn:hover{transform:translateY(-2px)}',
      '#mc26 .mc-gold{background:' + GOLD + ';color:' + DEEP + '}',
      '#mc26 .mc-line{border:1.5px solid rgba(255,255,255,.35);color:#fff;background:rgba(255,255,255,.04)}',
      '#mc26 .mc-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
      '#mc26 .mc-row .mc-btn{width:100%;padding:0 10px}',
      '@media (max-width:600px){#mc26 .mc-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#mc26 .mc-row .mc-wide{grid-column:1 / -1}}',
      '#mc26 .mc-row .mc-ic{width:1.3em;height:1.3em}',
      '@media (max-width:600px){#mc26 .mc-plan{grid-template-columns:1fr}}',
      '#mc26 .mc-wa .mc-ic{color:#25d366}#mc26 .mc-fb .mc-ic{color:#4f9bff}#mc26 .mc-ig .mc-ic{color:#f06fa3}#mc26 .mc-line.mc-plain .mc-ic{color:' + TEAL + '}#mc26 .mc-gold .mc-ic{color:' + DEEP + '}',
      '#mc26 .mc-note{min-height:1.5em;margin-top:10px;font-size:.92rem;color:' + MUTED + '}',
      '#mc26 .mc-p{color:' + MUTED + ';margin-bottom:14px}',
      /* footer of the card */
      '#mc26 .mc-ft{padding:22px 34px 26px;background:' + DEEP + ';color:' + MUTED + ';font-size:.92rem;display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;justify-content:space-between}',
      '@media (max-width:600px){#mc26 .mc-ft{padding:20px 18px;flex-direction:column;align-items:flex-start}}',
      '#mc26 .mc-ft a{color:' + GOLD + ';font-weight:600;text-decoration:none}',
      '#mc26 .mc-ft a:hover{text-decoration:underline}',
      '@media (prefers-reduced-motion:reduce){#mc26 .mc-btn{transition:none}}'
    ].join('\n');
  }

  /* ---------- calendar ---------- */
  function f(iso) { return iso.replace(/[-:]/g, '').replace(/\.\d+/, ''); }
  function gcalUrl() {
    return 'https://calendar.google.com/calendar/render?' + qs({
      action: 'TEMPLATE', text: 'Chanukah Festival + Kids Menorah Contest',
      dates: f(CFG.startUTC) + '/' + f(CFG.endUTC), location: CFG.place,
      details: 'Bring the menorah to table #15 between 5:45 and 6:15 PM. Winners announced 7:45–8 PM. ' + CFG.festivalUrl
    });
  }

  /* ---------- share ---------- */
  function shareUrl(src) {
    return CFG.festivalUrl + '?' + qs({ utm_source: src, utm_medium: 'share', utm_campaign: 'chanukah2026', utm_content: 'contest-thanks' });
  }
  function track(m) { try { if (window.gtag) window.gtag('event', 'share_click', { method: m, page: 'contest-thanks' }); } catch (e) {} }
  function shareBlock() {
    var box = el('div');
    var row = el('div', 'mc-row');
    var note = el('p', 'mc-note'); note.setAttribute('role', 'status');
    function say(t) { note.textContent = t; }
    function body(src) { return CFG.SHARE_TEXT + ' · Festival info: ' + shareUrl(src); }
    var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    if (navigator.share && touch) {
      var nb = el('button', 'mc-btn mc-gold mc-wide', 'Share'); nb.type = 'button';
      nb.insertBefore(icon('share'), nb.firstChild);
      nb.addEventListener('click', function () {
        track('native');
        var pr = navigator.share({ title: 'Kids Menorah Contest', text: CFG.SHARE_TEXT, url: shareUrl('native') });
        if (pr && pr.catch) pr.catch(function () {});
      });
      row.appendChild(nb);
    }
    function btn(cls, href, label, ic, src, newTab) {
      var a = link('mc-btn mc-line ' + cls, href, label, newTab);
      a.insertBefore(icon(ic), a.firstChild);
      a.addEventListener('click', function (e) {
        track(src);
        if (PREVIEW && /^(sms|mailto):/.test(href)) { e.preventDefault(); say('On the real site this opens your ' + (src === 'sms' ? 'Messages' : 'email') + ' app with the invitation filled in.'); }
      });
      return a;
    }
    var sms = btn('mc-plain', 'sms:?' + AMP + 'body=' + encodeURIComponent(body('sms')), 'Text Message', 'chat', 'sms');
    var wa = btn('mc-wa', 'https://wa.me/?' + qs({ text: body('whatsapp') }), 'WhatsApp', 'wa', 'whatsapp', true);
    var em = btn('mc-plain', 'mailto:?subject=' + encodeURIComponent(CFG.EMAIL_SUBJECT) + AMP + 'body=' + encodeURIComponent(body('email') + '\n\nHope to see you there!'), 'Email', 'mail', 'email');
    var fb = btn('mc-fb', 'https://www.facebook.com/sharer/sharer.php?' + qs({ u: shareUrl('facebook') }), 'Facebook', 'fb', 'facebook', true);
    var ig = el('button', 'mc-btn mc-line mc-ig', 'Instagram'); ig.type = 'button';
    ig.insertBefore(icon('ig'), ig.firstChild);
    var cp = el('button', 'mc-btn mc-line mc-plain', 'Copy Link'); cp.type = 'button';
    cp.insertBefore(icon('link'), cp.firstChild);
    function copyIt(src, msg) {
      track(src);
      copyText(shareUrl(src)).then(function () { say(msg); }, function () { say('Copy this link: ' + shareUrl(src)); });
    }
    ig.addEventListener('click', function () { copyIt('instagram', 'Link copied. Paste it in your Instagram story or bio.'); });
    cp.addEventListener('click', function () { copyIt('copy', 'Link copied!'); });
    add(row, sms, wa, em, fb, ig, cp);
    add(box, row, note);
    return box;
  }

  /* ---------- build ---------- */
  function findNative() {
    var all = document.querySelectorAll('div,p,td,section,article,span');
    var best = null;
    for (var i = 0; i < all.length; i++) {
      var t = all[i].textContent || '';
      if (t.indexOf(CFG.NATIVE_TEXT) > -1 && t.length < 1500) best = all[i]; /* deepest match wins (last in document order) */
    }
    if (!best) return null;
    /* climb to the block that holds the whole message */
    while (best.parentNode && best.parentNode !== document.body &&
      (best.parentNode.textContent || '').length < 1500 && /^(P|SPAN|B|STRONG|EM|FONT)$/.test(best.tagName)) best = best.parentNode;
    return best;
  }

  function build() {
    var root = el('div'); root.id = 'mc26';

    var hd = el('div', 'mc-hd');
    var ok = el('div', 'mc-ok'); ok.appendChild(icon('check'));
    add(hd, ok,
      el('div', 'mc-kick', 'Thank you!'),
      el('h1', null, 'You’re registered for the Kids Menorah Contest'),
      el('p', 'mc-lead', 'We can’t wait to see the menorahs your family creates. Here is everything you need for festival night.'));

    var bd = el('div', 'mc-bd');

    var s1 = el('section', 'mc-sec');
    var dl = el('dl');
    CFG.STEPS.forEach(function (r) { add(dl, el('dt', null, r[0]), el('dd', null, r[1])); });
    var gift = el('p', 'mc-gift');
    add(gift, el('b', null, 'Every child who enters gets a Chanukah gift.'));
    add(s1, el('h2', null, 'Bringing the menorah'), dl, gift);

    var s2 = el('section', 'mc-sec');
    add(s2, el('h2', null, 'Invite family and friends to cheer'),
      el('p', 'mc-p', 'One tap sends the invitation with the festival link.'), shareBlock());

    var s3 = el('section', 'mc-sec');
    var r3 = el('div', 'mc-row mc-plan');
    var cal = link('mc-btn mc-line mc-plain', gcalUrl(), 'Add to Calendar', true);
    cal.insertBefore(icon('cal'), cal.firstChild);
    var rs = link('mc-btn mc-line mc-fb', CFG.facebookEvent, 'RSVP on Facebook', true);
    rs.insertBefore(icon('fb'), rs.firstChild);
    var mp = link('mc-btn mc-line mc-plain mc-wide', CFG.mapUrl, 'See the Festival Map', true);
    mp.insertBefore(icon('pin'), mp.firstChild);
    add(r3, cal, rs, mp);
    add(s3, el('h2', null, 'Plan your evening'), r3);

    add(bd, s1, s2, s3);

    var ft = el('div', 'mc-ft');
    var who = el('span');
    add(who, document.createTextNode('The Chanukah Festival is organized by ' + CFG.host + '. '),
      link(null, CFG.hostUrl, 'Explore more', true));
    add(ft, who, link(null, CFG.donateUrl, 'Support the Festival', true));

    add(root, hd, bd, ft);
    return root;
  }

  function loadFonts() {
    if (document.getElementById('mc26-fonts')) return;
    var l = document.createElement('link');
    l.id = 'mc26-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + ['family=Arvo:wght@700', 'family=Kaushan+Script',
      'family=Montserrat:wght@400;600;700', 'display=swap'].join(AMP);
    document.head.appendChild(l);
  }

  function boot() {
    if (document.getElementById('mc26')) return;
    try {
      var native = findNative();
      if (!native) { if (window.console) console.warn('Menorah Contest ' + VERSION + ': confirmation text not found; page left as is'); return; }
      loadFonts();
      var st = document.createElement('style'); st.id = 'mc26-style'; st.textContent = css();
      document.head.appendChild(st);
      var card = build();
      native.parentNode.insertBefore(card, native);
      /* the card says everything the platform text did; hide the plain version (a message, not a form) */
      native.style.display = 'none';
      native.setAttribute('data-mc26', 'replaced');
      if (window.console) console.log('Menorah Contest ' + VERSION + ': thank-you page designed');
    } catch (err) {
      var r = document.getElementById('mc26');
      if (r && r.parentNode) r.parentNode.removeChild(r);
      if (window.console) console.error('Menorah Contest ' + VERSION + ' failed', err);
    }
  }

  window.MC26 = { version: VERSION, config: CFG };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
