/* KIDS MENORAH CONTEST 2026 - Chabad Jewish Community Center of Riverside
   Loaded by footer.js (PAGES '7606745', onResponse). Hidden registration form, aid 7606745.
   On the registration page it adds a festival hero and restyles the native form (styles only:
   every field, condition and the submit stay as the platform draws them).
   On the thank-you page it finds the platform's plain confirmation, hides it, and shows a
   designed card in its place. The site header, menu and B"H stay as they are. */
(function () {
  'use strict';

  var VERSION = 'mc26-2026-11-06b';
  var PREVIEW = false; /*__PREVIEW_HOOK__*/

  function ch() { return String.fromCharCode.apply(null, arguments); }
  var AMP = ch(38);

  var CFG = {
    AID: '7606745',
    /* A phrase from the platform's own confirmation text, used to find it on the page. */
    /* ...and its last words, so the whole message (headline to sign-off) is replaced. */
    NATIVE_LAST: 'See you at the festival',
    NATIVE_TEXT: 'registered for the Kids Menorah Contest',
    festivalUrl: 'https://chanukahfestival.org/',
    mapUrl: 'https://chanukahfestival.org/#map',
    facebookEvent: 'https://www.facebook.com/events/1651125113077350/',
    donateUrl: 'https://www.jewishriverside.com/donate',
    hostUrl: 'https://www.jewishriverside.com/5201495',
    host: 'Chabad Jewish Community Center of Riverside',
    startUTC: '2026-12-08T02:00:00Z',   /* 6:00 PM Pacific, Dec 7 */
    endUTC: '2026-12-08T04:00:00Z',
    place: 'Riverside Historic Courthouse, 4050 Main St, Riverside, CA 92501',
    STEPS: [
      ['When', 'Monday, Dec 7, 5:45–6:15 PM'],
      ['Where', 'Menorah Contest table, #15 on the festival map, at the Riverside Historic Courthouse (4050 Main St.)'],
      ['Display', 'Menorahs stay on display at the table during the festival'],
      ['Winners', 'Announced 7:45–8 PM. Please pick up your menorah before you leave']
    ],
    SHARE_TEXT: 'We’re entering the Kids Menorah Contest at Riverside’s Chanukah Festival! Come cheer us on Monday, Dec 7, 6–8 PM at the Historic Courthouse. Winners are announced 7:45–8 PM. Kids 4–12 can enter free: https://www.jewishriverside.com/7606745',
    EMAIL_SUBJECT: 'Come cheer us on at the Chanukah Festival, Dec 7'
  };

  /* ---------- guard: this page only (form + its thank-you screen) ---------- */
  var HREF = window.location.href;
  var onPage = new RegExp('(/aid/' + CFG.AID + '(/|\\.|$))|([?\\x26]aid=' + CFG.AID + '(\\D|$))', 'i').test(HREF);
  var isResponse = HREF.indexOf('ArticleCcoResponse') > -1;
  if (!PREVIEW && !onPage) return;
  var MODE = (isResponse || (PREVIEW && /mc26=thanks/.test(HREF))) ? 'thanks' : 'form';

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
      '#mc26 .mc-hd{text-align:center;padding:40px 28px 34px;background:' + DEEP + '}',
      '#mc26 .mc-ok{width:64px;height:64px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;background:' + TEAL + ';color:' + DEEP + '}',
      '#mc26 .mc-ok .mc-ic{width:34px;height:34px;stroke-width:2.6}',
      '#mc26 .mc-kick{font-family:' + SCRIPT + ';color:' + GOLD + ';font-size:21.6px;line-height:1.2}',
      '#mc26 h1{font-family:' + DISP + ';font-weight:700;color:#fff;font-size:clamp(25.6px,4.4vw,36.8px);line-height:1.15;margin-top:6px}',
      '#mc26 .mc-lead{color:' + MUTED + ';font-size:16.8px;margin-top:12px;max-width:52ch;margin-left:auto;margin-right:auto}',
      /* body */
      '#mc26 .mc-bd{padding:30px 34px 34px}',
      '@media (max-width:600px){#mc26{border-radius:16px;margin:4px 0 28px}#mc26 .mc-hd{padding:32px 18px 26px}#mc26 .mc-bd{padding:24px 18px 28px}}',
      '#mc26 h2{font-size:11.8px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:' + GOLD + ';margin:0 0 12px}',
      '#mc26 .mc-sec + .mc-sec{margin-top:30px;padding-top:28px;border-top:1px solid rgba(255,255,255,.08)}',
      '#mc26 dl{display:grid;grid-template-columns:110px minmax(0,1fr);border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;background:' + PANEL + '}',
      '#mc26 dt,#mc26 dd{padding:13px 16px;border-top:1px solid rgba(255,255,255,.07)}',
      '#mc26 dt:first-of-type,#mc26 dd:first-of-type{border-top:0}',
      '#mc26 dt{font-weight:700;color:' + TEAL + ';font-size:14.7px}',
      '#mc26 dd{color:' + INK + '}',
      '@media (max-width:480px){#mc26 dl{grid-template-columns:1fr}#mc26 dt{padding-bottom:0;border-top:1px solid rgba(255,255,255,.07)}#mc26 dd{padding-top:2px;border-top:0}}',
      '#mc26 .mc-gift{margin-top:14px;color:' + MUTED + '}',
      '#mc26 .mc-gift b{color:' + GOLD + '}',
      /* buttons */
      '#mc26 .mc-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;height:48px;padding:0 20px;border-radius:999px;font-weight:700;font-size:14.4px;text-decoration:none;white-space:nowrap;transition:transform .2s ease}',
      '#mc26 .mc-btn:hover{transform:translateY(-2px)}',
      '#mc26 .mc-gold{background:' + GOLD + ';color:' + DEEP + '}',
      '#mc26 .mc-line{border:1.5px solid rgba(255,255,255,.35);color:#fff;background:rgba(255,255,255,.04)}',
      '#mc26 .mc-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
      '#mc26 .mc-row .mc-btn{width:100%;padding:0 10px}',
      '@media (max-width:600px){#mc26 .mc-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#mc26 .mc-row .mc-wide{grid-column:1 / -1}}',
      '#mc26 .mc-row .mc-ic{width:1.3em;height:1.3em}',
      '#mc26 .mc-plan{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#mc26 .mc-plan .mc-wide{grid-column:1 / -1}',
      '@media (max-width:600px){#mc26 .mc-plan{grid-template-columns:1fr}}',
      '@media (max-width:380px){#mc26 .mc-row .mc-btn{font-size:13px;gap:6px;padding:0 6px}}',
      '#mc26 .mc-wa .mc-ic{color:#25d366}#mc26 .mc-fb .mc-ic{color:#4f9bff}#mc26 .mc-ig .mc-ic{color:#f06fa3}#mc26 .mc-line.mc-plain .mc-ic{color:' + TEAL + '}#mc26 .mc-gold .mc-ic{color:' + DEEP + '}',
      '#mc26 .mc-note{min-height:1.5em;margin-top:10px;font-size:14.7px;color:' + MUTED + '}',
      '#mc26 .mc-p{color:' + MUTED + ';margin-bottom:14px}',
      /* footer of the card */
      '#mc26 .mc-ft{padding:22px 34px 26px;background:' + DEEP + ';color:' + MUTED + ';font-size:14.7px;display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;justify-content:space-between}',
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
    /* climb to the block that holds the whole message: while the parent adds little besides this
       message (headline + drop-off lines), the parent is still the message */
    var whole = function (n) { return (n.textContent || '').indexOf(CFG.NATIVE_LAST) > -1; };
    var guard = 0;
    while (!whole(best) && best.parentNode && best.parentNode !== document.body && guard++ < 4 &&
      !best.parentNode.querySelector('form') && (best.parentNode.textContent || '').length < 1500) best = best.parentNode;
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
    var rs = link('mc-btn mc-line mc-fb', CFG.facebookEvent, 'Join the Facebook Event', true);
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

  /* ---------- registration form page ---------- */
  /* Styles only: every native field, condition, hidden input and the submit stay exactly as the
     platform draws them. Sizes are in px because the site template sets the root font to 10px. */
  var FORM_SEL = 'html body form.userform-form[id="' + CFG.AID + '"]';
  function formCss() {
    var F = FORM_SEL;
    return [
      'html body h1.article-header__title.mc26-hidden-title{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
      /* hero */
      '#mc26-hero{font-family:' + BODY + ';background:' + NAVY + ';color:' + INK + ';border-radius:20px;padding:34px 30px 30px;margin:6px auto 22px;max-width:680px;text-align:center;-webkit-font-smoothing:antialiased;box-sizing:border-box}',
      '#mc26-hero *{box-sizing:border-box;margin:0;padding:0}',
      '#mc26-hero .mh-kick{font-family:' + SCRIPT + ';color:' + GOLD + ';font-size:21px;line-height:1.2}',
      '#mc26-hero h2{font-family:' + DISP + ';font-weight:700;color:#fff;font-size:34px;line-height:1.15;margin-top:6px}',
      '#mc26-hero .mh-when span{white-space:nowrap}',
      '#mc26-hero .mh-when{font-weight:600;color:' + GOLD + ';font-size:15px;letter-spacing:.06em;text-transform:uppercase;margin-top:10px}',
      '#mc26-hero .mh-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px;list-style:none}',
      '#mc26-hero .mh-chips li{font-family:' + BODY + ';font-size:14px;font-weight:600;color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:6px 14px;background:rgba(255,255,255,.05)}',
      '#mc26-hero .mh-p,#mc26-hero .mh-when,#mc26-hero .mh-a{font-family:' + BODY + '}',
      '#mc26-hero .mh-p{color:' + MUTED + ';font-size:16px;line-height:1.6;margin:16px auto 0;max-width:46ch}',
      '#mc26-hero .mh-a{display:inline-block;margin-top:12px;color:' + TEAL + ';font-weight:700;font-size:15px;text-decoration:none}',
      '#mc26-hero .mh-a:hover{text-decoration:underline}',
      '@media (max-width:600px){#mc26-hero{border-radius:16px;padding:28px 18px 24px}#mc26-hero h2{font-size:28px}#mc26-hero .mh-kick{font-size:19px}}',
      /* form card */
      F + ' .form-all{max-width:680px!important;width:auto!important;margin:0 auto 30px!important;background:#fff!important;border:1px solid #dfe8ea!important;border-radius:18px!important;padding:26px 28px 10px!important;box-shadow:0 10px 30px rgba(15,39,48,.08)!important;font-family:' + BODY + '!important;box-sizing:border-box}',
      '@media (max-width:600px){' + F + ' .form-all{padding:18px 16px 4px!important;border-radius:14px!important}}',
      F + ' ul.form-section{list-style:none!important;margin:0!important;padding:0!important}',
      F + ' li.form-line{padding:0 0 18px!important;margin:0!important;width:auto!important;float:none!important}',
      F + ' .form-label-top{width:auto!important;float:none!important;margin:0 0 6px!important}',
      F + ' .form-label-top label{font-family:' + BODY + '!important;font-weight:600!important;font-size:15px!important;color:' + NAVY + '!important;line-height:1.35!important}',
      F + ' .form-required{color:#c0392b!important}',
      F + ' .form-input-wide{width:100%!important;float:none!important}',
      F + ' input.form-textbox,' + F + ' select.form-dropdown,' + F + ' textarea{width:100%!important;max-width:100%!important;height:48px!important;box-sizing:border-box!important;border:1.5px solid #c9d6da!important;border-radius:10px!important;padding:0 14px!important;font-family:' + BODY + '!important;font-size:16px!important;color:' + NAVY + '!important;background:#fff!important;box-shadow:none!important}',
      F + ' textarea{height:auto!important;min-height:96px;padding:12px 14px!important}',
      F + ' input.form-textbox:focus,' + F + ' select.form-dropdown:focus,' + F + ' textarea:focus{outline:none!important;border-color:' + TEAL + '!important;box-shadow:0 0 0 3px rgba(60,199,180,.25)!important}',
      /* each child starts a new group */
      F + ' li#id_6,' + F + ' li#id_9,' + F + ' li#id_23,' + F + ' li#id_24{border-top:1px solid #e3ebed!important;padding-top:20px!important;margin-top:4px!important}',
      F + ' li#id_18 select.form-dropdown{max-width:260px!important}',
      F + ' li#id_8 select,' + F + ' li#id_11 select,' + F + ' li#id_19 select,' + F + ' li#id_20 select{max-width:160px!important}',
      /* contest rules panel */
      F + ' .form-html{background:#f2f8f8!important;border-left:4px solid ' + TEAL + '!important;border-radius:12px!important;padding:16px 20px!important;font-family:' + BODY + '!important;font-size:15px!important;line-height:1.55!important;color:' + NAVY + '!important}',
      F + ' .form-html p,' + F + ' .form-html li,' + F + ' .form-html strong{font-family:' + BODY + '!important;font-size:15px!important;color:' + NAVY + '!important}',
      F + ' .form-html ul{margin:8px 0 0 18px!important;padding:0!important}',
      F + ' .form-html li{margin:3px 0!important;list-style:disc!important}',
      /* checkboxes: label wraps at full width next to the box */
      F + ' .form-checkbox-item{display:flex!important;align-items:flex-start;gap:10px;float:none!important;width:auto!important}',
      F + ' .form-checkbox-item input{width:20px!important;height:20px!important;margin:2px 0 0!important;flex:none;accent-color:' + TEAL + '}',
      F + ' .form-checkbox-item label{font-family:' + BODY + '!important;font-size:15px!important;line-height:1.5!important;color:' + NAVY + '!important;font-weight:400!important}',
      F + ' .form-single-column{width:auto!important}',
      /* submit */
      F + ' .form-buttons-wrapper{text-align:center!important;padding:6px 0 18px!important;margin:0!important}',
      F + ' button.form-submit-button{background:' + GOLD + '!important;color:' + DEEP + '!important;border:0!important;border-radius:999px!important;height:52px!important;padding:0 40px!important;font-family:' + BODY + '!important;font-weight:700!important;font-size:16px!important;cursor:pointer;min-width:240px;box-shadow:0 6px 16px rgba(233,185,73,.35)!important;background-image:none!important;text-shadow:none!important}',
      F + ' button.form-submit-button:hover{filter:brightness(1.05)}',
      '@media (max-width:600px){' + F + ' button.form-submit-button{width:100%!important;min-width:0}}'
    ].join('\n');
  }

  function whenLine() {
    var p = el('p', 'mh-when');
    add(p, el('span', null, 'Mon. Dec 7, 2026'), document.createTextNode(' · '), el('span', null, 'Riverside Historic Courthouse'));
    return p;
  }

  function buildFormHero() {
    var h = el('div'); h.id = 'mc26-hero';
    var chips = el('ul', 'mh-chips');
    ['Ages 4–12', 'Free to enter', 'Register by Dec 4'].forEach(function (t) { chips.appendChild(el('li', null, t)); });
    var more = link('mh-a', CFG.festivalUrl + '#contest', 'Contest rules, prizes and the festival map', true);
    add(h,
      el('div', 'mh-kick', '22nd Annual Chanukah Festival'),
      el('h2', null, 'Kids Menorah Contest'),
      whenLine(),
      chips,
      el('p', 'mh-p', 'Build a menorah at home and bring it to the festival. Every child who enters gets a Chanukah gift, and our winners take home a special prize!'),
      more);
    return h;
  }

  function formBoot() {
    if (document.getElementById('mc26-hero')) return;
    var form = document.querySelector('form.userform-form[id="' + CFG.AID + '"]');
    if (!form) { if (window.console) console.warn('Menorah Contest ' + VERSION + ': form not found; page left as is'); return; }
    try {
      loadFonts();
      var st = document.createElement('style'); st.id = 'mc26-form-style'; st.textContent = formCss();
      document.head.appendChild(st);
      var holder = document.getElementById('formContainer') || form;
      holder.parentNode.insertBefore(buildFormHero(), holder);
      var t = document.querySelector('h1.article-header__title');
      if (t) t.className += ' mc26-hidden-title'; /* the hero carries the title; kept for screen readers */
      /* numeric keypad for the phone field on phones */
      var tel = form.querySelector('input[type="tel"]');
      if (tel) tel.setAttribute('inputmode', 'tel');
      if (window.console) console.log('Menorah Contest ' + VERSION + ': form page designed');
    } catch (err) {
      var h = document.getElementById('mc26-hero');
      if (h && h.parentNode) h.parentNode.removeChild(h);
      var s = document.getElementById('mc26-form-style');
      if (s && s.parentNode) s.parentNode.removeChild(s);
      if (window.console) console.error('Menorah Contest ' + VERSION + ' form styling failed', err);
    }
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
    if (MODE === 'form') return formBoot();
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
