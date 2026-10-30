/* CHANUKAH FESTIVAL 2026 - Chabad Jewish Community Center, Riverside
   Custom template for the festival mini-site home page.
   Loaded by footer.js (see PAGES there). DRAFT page 7553387;
   at go-live set CFG.AID to '4949424' and BRAND_HOSTS to ['chanukahfestival.org'],
   and move the PAGES entry in footer.js to '4949424'. */
(function () {
  'use strict';

  var VERSION = 'cf26-2026-10-16b';
  var PREVIEW = false; /*__PREVIEW_HOOK__*/

  function ch() { return String.fromCharCode.apply(null, arguments); }
  var AMP = ch(38);

  /* =====================================================================
     CONFIG - everything an editor should need to touch lives here
     ===================================================================== */
  var CFG = {
    /* DRAFT: 7553387. At go-live set AID to '4949424' and BRAND_HOSTS to ['chanukahfestival.org']. */
    AID: '7553387',
    BRAND_HOSTS: [],

    edition: '22',
    editionSuffix: 'nd',
    host: 'Chabad Jewish Community Center',

    event: {
      dayLine: 'Mon. Dec 7, 2026',
      timeLine: '6\u20138\u00a0PM',
      nightLine: '4th Night of Chanukah',
      venue: 'Riverside County Historic Courthouse',
      street: '4050 Main St.',
      cityLine: 'Riverside, CA 92501',
      startUTC: '2026-12-08T02:00:00Z',   /* 6:00 PM Pacific */
      endUTC: '2026-12-08T04:00:00Z',     /* 8:00 PM Pacific */
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1650.922122861743!2d-117.37630892354346!3d33.979049862680604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb1ef11d6ca15%3A0x1079ea5e9dfa9f66!2s4050%20Main%20St%2C%20Riverside%2C%20CA%2092501!5e0!3m2!1sen!2sus!4v1635794908873!5m2!1sen!2sus',
      mapQuery: 'Riverside Historic Courthouse, 4050 Main St, Riverside, CA 92501'
    },

    highlights: [
      { icon: 'menorah', title: 'Grand Menorah Lighting', text: 'The lighting of Riverside\u2019s Menorah, the largest in the region, on the courthouse steps.' },
      { icon: 'food',    title: 'Traditional Food',       text: 'Hot latkes, jelly donuts and Chanukah treats for everyone.' },
      { icon: 'music',   title: 'Live Music',             text: 'Holiday music and dancing in the heart of downtown.' },
      { icon: 'family',  title: 'Fun for the Whole Family', text: 'Children\u2019s crafts, activities and entertainment.' }
    ],
    accessNote: 'ASL Interpreter on site',

    about: [
      'Chabad Jewish Community Center of Riverside presents an annual community-wide Chanukah Festival, free of charge and open to the public. The festival features the lighting of Riverside\u2019s Menorah, the largest in the region, live music, traditional foods, entertainment, children\u2019s crafts and activities.',
      'The festival has grown into one of the premier holiday celebrations in the Inland Empire, sharing Chanukah\u2019s universal message, embracing cultural diversity, and promoting understanding. Each year, the festival is graced by the participation of many elected officials and civic leaders \u2014 a meaningful evening not only for the Jewish community but for the community at large.'
    ],
    stats: [
      { big: '22', small: 'years of light in Riverside' },
      { big: 'Free', small: 'admission \u2014 all are welcome' },
      { big: '#1', small: 'largest menorah in the region' }
    ],

    /* ---- Sponsors / donors. Tiers with no names are hidden unless
       showOpenSlot is true, which adds a "your name here" card. ---- */
    SPONSOR_INTRO: 'This free community celebration is made possible by the generosity of our sponsors and partners.',
    SPONSORS: [
      { tier: 'Grand Menorah Sponsors', size: 'xl', showOpenSlot: true, names: [] },
      { tier: 'Festival Sponsors',      size: 'lg', showOpenSlot: true, names: [] },
      { tier: 'Candle Sponsors',        size: 'md', showOpenSlot: false, names: [] },
      { tier: 'Friends of the Festival', size: 'sm', showOpenSlot: false, names: [] },
      { tier: 'Community Partners', size: 'lg', showOpenSlot: false, names: [
        { name: 'City of Riverside' },
        { name: 'Riverside Downtown Partnership' },
        { name: 'Karen Spiegel', sub: 'Riverside County Supervisor, District 2' },
        { name: 'Blumenthal {amp} Moore', sub: 'A Professional Law Corporation' },
        { name: 'Chabad of UCR' }
      ] }
    ],
    SPONSOR_CTA: 'Become a sponsor',

    /* ---- Optional RSVP. Leave url empty to hide the section. ---- */
    RSVP: {
      enabled: true,
      url: '',
      title: 'Let us know you\u2019re coming',
      text: 'RSVP is optional \u2014 the festival is free and open to everyone. It just helps us plan food and seating.',
      button: 'RSVP now'
    },

    NEWS: [
      { outlet: 'Riverside County Supervisor, District 2', date: 'Dec 22, 2025',
        title: 'Chanukah Festival Celebrated at Riverside Historic Courthouse',
        blurb: 'Supervisor Spiegel\u2019s office recaps last year\u2019s festival: families downtown for the menorah lighting, music and activities, with photos.',
        url: 'https://rivcodistrict2.org/node/11701' },
      { outlet: 'City of Riverside', date: 'Dec 30, 2024',
        title: 'Chanukah Festival \u2014 20th Annual',
        blurb: 'The City lists the festival on its official events calendar in front of the Historic Courthouse.',
        url: 'https://riversideca.gov/calendar/event/chanukah-festival-2' },
      { outlet: 'Raincross Gazette', date: 'Nov 30, 2023',
        title: '19th Annual Chanukah Festival to light up Riverside Historic Courthouse',
        blurb: 'A preview of the courthouse-steps celebration and its message of unity, noting record turnout the year before.',
        url: 'https://www.raincrossgazette.com/19th-annual-chanukah-festival-to-light-up-riverside-historic-courthouse' },
      { outlet: 'Riverside County Supervisor, District 2', date: 'Dec 13, 2023',
        title: '19th Annual Chanukah Festival and the Menorah Lighting',
        blurb: 'Supervisor Spiegel joins the community for the menorah lighting before the courthouse.',
        url: 'https://rivcodistrict2.org/node/3936' },
      { outlet: 'NBC Los Angeles', date: 'Dec 2020',
        title: 'Riverside\u2019s Annual Hanukkah Festival to Go Mobile Amid COVID-19 Restrictions',
        blurb: 'How the festival kept the lights on during the pandemic with a drive-in celebration.',
        url: 'https://www.nbclosangeles.com/holidays/riversides-annual-hanukkah-festival-to-go-mobile-amid-covid-19-restrictions/2481846/' }
    ],

    /* ---- Chanukah guide imported from the site's syndicated section ---- */
    GUIDE: {
      source: '/holidays/chanukah/default_cdo/jewish/Hanukkah.htm',
      max: 9,
      reader: true,
      fallback: [
        { title: 'Chanukah Guide', text: 'What Chanukah is, its story, its customs and how to celebrate at home.',
          url: '/holidays/chanukah/default_cdo/jewish/Hanukkah.htm' },
        { title: 'How to Light the Menorah', text: 'Who lights, where to place the menorah, when to light and the blessings.',
          url: '/article.asp?aid=603798' },
        { title: 'How to Celebrate Chanukah', text: 'A step-by-step guide to the eight nights, from the menorah to dreidel and latkes.',
          url: '/article.asp?aid=103902' }
      ]
    },
    NIGHTS: [
      { n: 1, day: 'Fri', date: 'Dec 4', note: 'Light before Shabbat candles' },
      { n: 2, day: 'Sat', date: 'Dec 5', note: 'Light after Shabbat ends' },
      { n: 3, day: 'Sun', date: 'Dec 6', note: '' },
      { n: 4, day: 'Mon', date: 'Dec 7', note: 'Festival night!', star: true },
      { n: 5, day: 'Tue', date: 'Dec 8', note: '' },
      { n: 6, day: 'Wed', date: 'Dec 9', note: '' },
      { n: 7, day: 'Thu', date: 'Dec 10', note: '' },
      { n: 8, day: 'Fri', date: 'Dec 11', note: 'Light before Shabbat candles' }
    ],
    NIGHTS_NOTE: 'Chanukah 2026 begins Friday evening, December 4 and ends at nightfall on Saturday, December 12.',

    SHARE: {
      url: 'https://www.jewishriverside.com/templates/section_cdo/aid/4949424/jewish/Chanukah-Festival-2026.htm',
      text: 'Join us for the 22nd Annual Chanukah Festival \u2014 Mon. Dec 7, 6\u20138 PM at the Riverside County Historic Courthouse. Free admission, all are welcome!',
      instagram: 'https://www.instagram.com/jewishriverside/'
    },

    FLYER: '/media/images/1389/dEvL13899225.png',
    DONATE_URL: '/article.asp?aid=4194665',
    PHONE: '951-222-2005',
    EMAIL: 'info@jewishriverside.com',
    WEB: 'www.ChanukahFestival.org'
  };
  /*__PREVIEW_CFG__*/

  /* =====================================================================
     GUARD
     ===================================================================== */
  var HREF = window.location.href;
  if (HREF.indexOf('ArticleCcoResponse') > -1) return;
  var AID = CFG.AID;
  var aidRe = new RegExp('(/aid/' + AID + '(/|\\.|$))|([?\\x26]aid=' + AID + '(\\D|$))', 'i');
  var hostL = (window.location.hostname || '').toLowerCase().replace(/^www\./, '');
  var byHost = CFG.BRAND_HOSTS.indexOf(hostL) > -1 &&
    (window.location.pathname === '/' || window.location.pathname === '');
  var byUrl = aidRe.test(HREF) || byHost;

  function onThisPage() {
    if (PREVIEW || byUrl) return true;
    var co = window.Co;
    return !!(co && String(co.ArticleId) === AID);
  }
  if (byUrl || PREVIEW) cover();

  function cover() {
    if (document.getElementById('cf26-cover')) return;
    var d = document.createElement('div');
    d.id = 'cf26-cover';
    d.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0f2936;z-index:2147481000');
    (document.body || document.documentElement).appendChild(d);
    setTimeout(uncover, 6000);
  }
  function uncover() {
    var c = document.getElementById('cf26-cover');
    if (c && c.parentNode) c.parentNode.removeChild(c);
  }

  /* =====================================================================
     HELPERS
     ===================================================================== */
  function T(s) { return String(s == null ? '' : s).split('{amp}').join(AMP); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = T(text);
    return e;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }
  function link(cls, href, text, newTab) {
    var a = el('a', cls, text);
    a.href = href;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function abs(u) {
    try { return new URL(u, window.location.href).href; } catch (e) { return u; }
  }
  function qs(params) {
    var out = [];
    for (var k in params) if (params.hasOwnProperty(k)) out.push(k + '=' + encodeURIComponent(params[k]));
    return out.join(AMP);
  }
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById('cf26-toast');
    if (!t) { t = el('div', 'cf-toast'); t.id = 'cf26-toast'; t.setAttribute('role', 'status'); root.appendChild(t); }
    t.textContent = T(msg);
    t.className = 'cf-toast show';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = 'cf-toast'; }, 3200);
  }
  function copyText(s) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s);
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement('textarea');
        ta.value = s; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) { res(); } else { rej(); }
      } catch (e) { rej(e); }
    });
  }

  var ICONS = {
    menorah: 'M12 3c.8 1 1 1.7.5 2.4-.3.4-.8.6-1 .1C11.3 5 11.5 4 12 3zM4 9v4a8 8 0 0 0 16 0V9M7.5 9v4a4.5 4.5 0 0 0 9 0V9M12 7v14M8 21h8',
    food: 'M5 11h14a7 7 0 0 1-14 0zM8 7c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7c0-1 1-1.5 1-2.5M9 21h6',
    music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    family: 'M8 7a2.5 2.5 0 1 0 0-.1M16.5 8a2 2 0 1 0 0-.1M4 21v-5a4 4 0 0 1 8 0v5M13 21v-4a3.5 3.5 0 0 1 7 0v4',
    asl: 'M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 9.5V4a1.5 1.5 0 0 1 3 0v6M13 9.5V5.5a1.5 1.5 0 0 1 3 0V12M16 10a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2.5-4.3a1.5 1.5 0 0 1 2.6-1.5L7 14',
    pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
    fb: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z',
    ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
    ext: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    heart: 'M12 20s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.1-8 11-8 11z',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
    x: 'M6 6l12 12M18 6L6 18',
    dl: 'M12 3v12M7 10l5 5 5-5M5 21h14'
  };
  function icon(name, cls) {
    var NS = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('class', 'cf-ic' + (cls ? ' ' + cls : ''));
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', ICONS[name] || '');
    s.appendChild(p);
    return s;
  }

  /* =====================================================================
     STYLES - plain color values only (no custom properties)
     ===================================================================== */
  var NAVY = '#0f2936', DEEP = '#0a1f2a', PANEL = '#133442', TEAL = '#1accce',
      GREEN = '#4cbd9f', GOLD = '#ebbe4d', INK = '#e9f1f3', MUTED = '#a9c0c7';
  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var SCRIPT = '"Satisfy","Brush Script MT",cursive';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';
  var GRAD = 'linear-gradient(90deg,' + TEAL + ' 0%,' + GREEN + ' 52%,' + GOLD + ' 100%)';

  function css() {
    return [
      'html.cf26-on #chabad_body_page,html.cf26-on .cco_templateless_template,html.cf26-on .page-tools-sidebar,html.cf26-on #BodyContainer{display:none !important}',
      'html.cf26-on,html.cf26-on body{background:' + NAVY + ' !important;margin:0}',
      '#cf26{background:' + NAVY + ';color:' + INK + ';font-family:' + BODY + ';font-size:17px;line-height:1.6;text-align:left;-webkit-font-smoothing:antialiased;overflow-x:hidden}',
      '#cf26 *{box-sizing:border-box}',
      '#cf26 h1,#cf26 h2,#cf26 h3,#cf26 p{margin:0;padding:0}',
      '#cf26 a{color:inherit}',
      '#cf26 button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}',
      '#cf26 img{max-width:100%;display:block}',
      '#cf26 .cf-ic{width:1.15em;height:1.15em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}',
      '#cf26 :focus-visible{outline:2px solid ' + GOLD + ';outline-offset:3px}',
      '#cf26 .cf-wrap{max-width:1120px;margin:0 auto;padding:0 20px}',
      '#cf26 .cf-sec{padding:84px 0}',
      '#cf26 .cf-alt{background:' + DEEP + '}',
      '#cf26 .cf-kicker{font-size:.74rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:' + GOLD + ';margin-bottom:10px}',
      '#cf26 .cf-h2{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,4.2vw,2.8rem);line-height:1.1;color:#fff;margin-bottom:14px}',
      '#cf26 .cf-lead{color:' + MUTED + ';max-width:62ch;font-size:1.05rem}',
      '#cf26 .cf-center{text-align:center}',
      '#cf26 .cf-center .cf-lead{margin:0 auto}',
      '#cf26 .cf-rule{height:3px;width:72px;background:' + GRAD + ';border-radius:2px;margin:18px 0 0}',
      '#cf26 .cf-center .cf-rule{margin:18px auto 0}',

      /* buttons */
      '#cf26 .cf-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 24px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.02em;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;white-space:nowrap}',
      '#cf26 .cf-btn:hover{transform:translateY(-2px)}',
      '#cf26 .cf-gold{background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(235,190,77,.25)}',
      '#cf26 .cf-gold:hover{box-shadow:0 12px 30px rgba(235,190,77,.38)}',
      '#cf26 .cf-ghost{border:1.5px solid rgba(255,255,255,.35);color:#fff}',
      '#cf26 .cf-ghost:hover{border-color:' + TEAL + ';color:' + TEAL + '}',
      '#cf26 .cf-teal{background:' + TEAL + ';color:' + DEEP + '}',

      /* nav */
      '#cf26 .cf-nav{position:sticky;top:0;z-index:50;background:rgba(10,31,42,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-nav .cf-wrap{display:flex;align-items:center;gap:18px;height:60px}',
      '#cf26 .cf-brand{font-family:' + DISP + ';font-weight:700;color:#fff;text-decoration:none;font-size:1.05rem;letter-spacing:.04em;white-space:nowrap}',
      '#cf26 .cf-brand span{background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent}',
      '#cf26 .cf-links{display:flex;gap:4px;margin-left:auto;overflow-x:auto;scrollbar-width:none}',
      '#cf26 .cf-links::-webkit-scrollbar{display:none}',
      '#cf26 .cf-links a{color:' + MUTED + ';text-decoration:none;font-size:.84rem;font-weight:600;padding:8px 11px;border-radius:999px;white-space:nowrap}',
      '#cf26 .cf-links a:hover{color:#fff;background:rgba(255,255,255,.06)}',
      '#cf26 .cf-nav .cf-btn{padding:9px 18px;font-size:.84rem}',
      '@media (max-width:860px){#cf26 .cf-links{display:none}#cf26 .cf-nav .cf-btn{margin-left:auto}}',

      /* hero */
      '#cf26 .cf-hero{position:relative;padding:30px 0 64px;text-align:center;background:radial-gradient(ellipse 60% 45% at 50% 58%,rgba(26,204,206,.10),rgba(15,41,54,0) 70%),' + NAVY + '}',
      '#cf26 .cf-bh{position:absolute;top:14px;left:20px;font-size:.78rem;color:' + MUTED + ';font-family:' + DISP + '}',
      '#cf26 .cf-invite{font-size:clamp(.9rem,2vw,1.08rem);font-weight:600;color:#fff;letter-spacing:.02em;margin:18px 0 8px}',
      '#cf26 .cf-annual{display:flex;align-items:center;justify-content:center;gap:22px;margin-bottom:2px}',
      '#cf26 .cf-annual i{display:block;height:3px;width:min(160px,16vw);background:rgba(255,255,255,.85);border-radius:2px}',
      '#cf26 .cf-annual b{font-family:' + SCRIPT + ';font-weight:400;font-size:clamp(2rem,5.4vw,3.6rem);line-height:1.15;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent;padding:0 .12em}',
      '#cf26 .cf-annual sup{font-size:.5em;vertical-align:super}',
      '#cf26 .cf-t1{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.02em;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent}',
      '#cf26 .cf-t2{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.04em;color:#fff}',
      '#cf26 .cf-stage{position:relative;max-width:820px;margin:16px auto 0}',
      '#cf26 .cf-menorah{display:block;width:min(560px,82%);height:auto;margin:0 auto}',
      '#cf26 .cf-flame{opacity:0;transform-box:fill-box;transform-origin:50% 100%;animation:cf26light .5s ease forwards,cf26flicker 2.6s ease-in-out infinite}',
      '@keyframes cf26light{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}',
      '@keyframes cf26flicker{0%,100%{transform:scale(1) rotate(0)}30%{transform:scale(1.05,.95) rotate(-2deg)}60%{transform:scale(.96,1.05) rotate(2deg)}}',
      '#cf26 .cf-ribbon{position:absolute;top:44%;background:' + GOLD + ';color:' + DEEP + ';font-family:' + SCRIPT + ';font-size:clamp(1rem,2.6vw,1.7rem);padding:10px 22px;line-height:1.2;box-shadow:0 10px 26px rgba(0,0,0,.25)}',
      '#cf26 .cf-ribbon.l{left:-4px;clip-path:polygon(0 0,100% 0,92% 50%,100% 100%,0 100%)}',
      '#cf26 .cf-ribbon.r{right:-4px;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,8% 50%)}',
      '@media (max-width:620px){#cf26 .cf-ribbon,#cf26 .cf-ribbon.l,#cf26 .cf-ribbon.r{position:static;display:inline-block;margin:12px 3px 0;clip-path:none;border-radius:4px;font-size:1rem;padding:7px 12px}#cf26 .cf-when{font-size:clamp(1.6rem,7.4vw,2.4rem)}#cf26 .cf-when .cf-sep{display:none}#cf26 .cf-when .cf-tm{display:block}#cf26 .cf-invite{padding:0 18px}}',
      '#cf26 .cf-base{height:3px;max-width:880px;margin:0 auto;background:rgba(255,255,255,.9);border-radius:2px}',
      '#cf26 .cf-venue{font-family:' + DISP + ';color:' + GOLD + ';text-transform:uppercase;font-size:clamp(1.05rem,2.8vw,1.75rem);letter-spacing:.02em;margin-top:26px;line-height:1.2}',
      '#cf26 .cf-addr{font-family:' + DISP + ';color:#fff;font-size:clamp(1rem,2.3vw,1.4rem)}',
      '#cf26 .cf-when{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,6vw,3.6rem);line-height:1.1;margin-top:16px;background:linear-gradient(90deg,' + GOLD + ' 0%,' + GREEN + ' 100%);-webkit-background-clip:text;background-clip:text;color:transparent;text-transform:uppercase}',
      '#cf26 .cf-night{font-family:' + DISP + ';color:#fff;font-size:clamp(1rem,2.3vw,1.35rem)}',
      '#cf26 .cf-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:30px}',
      '#cf26 .cf-calwrap{position:relative;display:inline-block}',
      '#cf26 .cf-menu{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#fff;color:' + DEEP + ';border-radius:12px;padding:6px;min-width:210px;box-shadow:0 18px 40px rgba(0,0,0,.35);z-index:20;display:none;text-align:left}',
      '#cf26 .cf-menu.open{display:block}',
      '#cf26 .cf-menu a,#cf26 .cf-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;color:' + DEEP + '}',
      '#cf26 .cf-menu a:hover,#cf26 .cf-menu button:hover{background:#eef6f7}',

      /* countdown + marquee */
      '#cf26 .cf-count{background:' + DEEP + ';border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-count .cf-wrap{display:flex;align-items:center;justify-content:center;gap:28px;flex-wrap:wrap;padding-top:22px;padding-bottom:22px}',
      '#cf26 .cf-count-l{font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:' + MUTED + '}',
      '#cf26 .cf-units{display:flex;gap:10px}',
      '#cf26 .cf-unit{min-width:74px;text-align:center;padding:8px 6px;border-radius:12px;background:' + PANEL + ';border:1px solid rgba(26,204,206,.18)}',
      '#cf26 .cf-unit b{display:block;font-family:' + DISP + ';font-size:1.9rem;line-height:1.1;color:#fff}',
      '#cf26 .cf-unit span{font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:' + GREEN + ';font-weight:700}',
      '#cf26 .cf-countmsg{font-family:' + DISP + ';font-size:1.3rem;color:' + GOLD + '}',
      '#cf26 .cf-marq{overflow:hidden;background:' + GOLD + ';color:' + DEEP + ';white-space:nowrap}',
      '#cf26 .cf-marq-in{display:inline-flex;gap:0;animation:cf26marq 40s linear infinite;padding:12px 0}',
      '#cf26 .cf-marq:hover .cf-marq-in{animation-play-state:paused}',
      '#cf26 .cf-marq-in span{font-weight:700;font-size:.92rem;padding:0 22px;position:relative}',
      '#cf26 .cf-marq-in span:after{content:"";position:absolute;right:-4px;top:50%;width:7px;height:7px;margin-top:-3px;border-radius:50%;background:' + DEEP + ';opacity:.45}',
      '#cf26 .cf-marq-in em{font-style:normal;font-family:' + DISP + ';text-transform:uppercase;letter-spacing:.12em;padding:0 22px;font-size:.8rem}',
      '@keyframes cf26marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}',

      /* highlights + event card */
      '#cf26 .cf-hl{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px}',
      '@media (max-width:900px){#cf26 .cf-hl{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:360px){#cf26 .cf-hl{grid-template-columns:1fr}}',
      '@media (max-width:480px){#cf26 .cf-hl-card{padding:20px 16px}#cf26 .cf-hl-card h3{font-size:1rem}#cf26 .cf-hl-card p{font-size:.85rem}}',
      '#cf26 .cf-hl-card{background:' + PANEL + ';border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:26px 22px;transition:transform .25s ease,border-color .25s ease}',
      '#cf26 .cf-hl-card:hover{transform:translateY(-4px);border-color:rgba(26,204,206,.45)}',
      '#cf26 .cf-hl-ic{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(26,204,206,.18),rgba(235,190,77,.18));color:' + GOLD + ';margin-bottom:16px;font-size:26px}',
      '#cf26 .cf-hl-card h3{font-family:' + DISP + ';color:#fff;font-size:1.15rem;line-height:1.25;margin-bottom:6px}',
      '#cf26 .cf-hl-card p{color:' + MUTED + ';font-size:.93rem}',
      '#cf26 .cf-asl{display:inline-flex;align-items:center;gap:10px;margin-top:22px;padding:10px 18px;border-radius:999px;border:1px solid rgba(76,189,159,.45);color:' + GREEN + ';font-family:' + SCRIPT + ';font-size:1.3rem}',
      '#cf26 .cf-ev{display:grid;grid-template-columns:1.1fr 1fr;gap:0;margin-top:48px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:' + PANEL + '}',
      '@media (max-width:860px){#cf26 .cf-ev{grid-template-columns:1fr}}',
      '#cf26 .cf-ev-info{padding:34px 34px 30px}',
      '#cf26 .cf-ev-row{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-ev-row:last-of-type{border-bottom:0}',
      '#cf26 .cf-ev-row .cf-ic{color:' + TEAL + ';font-size:22px;margin-top:2px}',
      '#cf26 .cf-ev-row b{display:block;color:#fff;font-weight:700}',
      '#cf26 .cf-ev-row span{color:' + MUTED + ';font-size:.95rem}',
      '#cf26 .cf-ev-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}',
      '#cf26 .cf-ev-btns .cf-btn{padding:11px 18px;font-size:.88rem}',
      '#cf26 .cf-map{position:relative;min-height:340px;background:' + DEEP + '}',
      '#cf26 .cf-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;filter:saturate(.85)}',
      '#cf26 .cf-map-fb{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:' + MUTED + ';text-align:center;padding:20px}',
      '#cf26 .cf-flyer{display:flex;gap:22px;align-items:center;margin-top:28px;padding:18px;border-radius:18px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.14)}',
      '#cf26 .cf-flyer img{width:92px;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.35)}',
      '#cf26 .cf-flyer b{display:block;color:#fff;font-family:' + DISP + ';font-size:1.1rem}',
      '#cf26 .cf-flyer span{color:' + MUTED + ';font-size:.9rem}',
      '#cf26 .cf-flyer .cf-btn{margin-left:auto}',
      '@media (max-width:560px){#cf26 .cf-flyer{flex-wrap:wrap}#cf26 .cf-flyer .cf-btn{margin-left:0}}',

      /* sponsors */
      '#cf26 .cf-spons{background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(235,190,77,.12),rgba(10,31,42,0) 70%),' + DEEP + '}',
      '#cf26 .cf-tier{margin-top:46px}',
      '#cf26 .cf-tier-h{display:flex;align-items:center;gap:16px;margin-bottom:18px}',
      '#cf26 .cf-tier-h h3{font-family:' + DISP + ';color:' + GOLD + ';font-size:1.05rem;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}',
      '#cf26 .cf-tier-h small{color:' + MUTED + ';font-size:.85rem;white-space:nowrap}',
      '#cf26 .cf-tier-h i{flex:1;height:1px;background:linear-gradient(90deg,rgba(235,190,77,.5),rgba(235,190,77,0))}',
      '#cf26 .cf-sgrid{display:grid;gap:14px}',
      '#cf26 .cf-xl .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}',
      '#cf26 .cf-lg .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}',
      '#cf26 .cf-md .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}',
      '#cf26 .cf-sm .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}',
      '#cf26 .cf-sp{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:16px;background:' + PANEL + ';border:1px solid rgba(235,190,77,.22);padding:22px 16px;min-height:96px;text-decoration:none}',
      '#cf26 .cf-sp img{max-height:64px;width:auto;margin-bottom:10px}',
      '#cf26 .cf-sp b{font-family:' + DISP + ';color:#fff;line-height:1.2}',
      '#cf26 .cf-sp span{color:' + MUTED + ';font-size:.82rem;margin-top:4px;line-height:1.35}',
      '#cf26 .cf-xl .cf-sp{min-height:150px;padding:30px 22px;background:linear-gradient(160deg,rgba(235,190,77,.16),rgba(26,204,206,.08)),' + PANEL + ';border-color:rgba(235,190,77,.5)}',
      '#cf26 .cf-xl .cf-sp b{font-size:1.6rem}',
      '#cf26 .cf-lg .cf-sp b{font-size:1.25rem}',
      '#cf26 .cf-md .cf-sp b{font-size:1.05rem}',
      '#cf26 .cf-sm .cf-sp{min-height:64px;padding:14px 12px}',
      '#cf26 .cf-sm .cf-sp b{font-size:.95rem;font-family:' + BODY + ';font-weight:600}',
      '#cf26 .cf-sp.open{border-style:dashed;border-color:rgba(255,255,255,.22);background:transparent;color:' + MUTED + ';transition:border-color .2s ease,color .2s ease}',
      '#cf26 .cf-sp.open b{color:' + MUTED + ';font-family:' + BODY + ';font-weight:600;font-size:1rem}',
      '#cf26 .cf-sp.open:hover{border-color:' + GOLD + '}',
      '#cf26 .cf-sp.open:hover b{color:' + GOLD + '}',
      '#cf26 .cf-spcta{margin-top:44px;display:flex;flex-direction:column;align-items:center;gap:10px}',
      '#cf26 .cf-spcta p{color:' + MUTED + ';font-size:.92rem}',

      /* rsvp */
      '#cf26 .cf-rsvp{position:relative;overflow:hidden;border-radius:26px;padding:48px 40px;background:linear-gradient(120deg,rgba(26,204,206,.16),rgba(76,189,159,.08) 50%,rgba(235,190,77,.18)),' + PANEL + ';border:1px solid rgba(255,255,255,.08);display:flex;gap:30px;align-items:center;justify-content:space-between;flex-wrap:wrap}',
      '#cf26 .cf-rsvp .cf-h2{margin-bottom:8px}',
      '#cf26 .cf-pill{display:inline-block;font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:' + DEEP + ';background:' + GREEN + ';padding:5px 12px;border-radius:999px;margin-bottom:14px}',
      '#cf26 .cf-pending{font-size:.8rem;color:' + GOLD + ';margin-top:10px}',

      /* about */
      '#cf26 .cf-about{display:grid;grid-template-columns:1.25fr 1fr;gap:56px;align-items:center}',
      '@media (max-width:860px){#cf26 .cf-about{grid-template-columns:1fr;gap:30px}}',
      '#cf26 .cf-about p{color:' + MUTED + ';margin-top:14px}',
      '#cf26 .cf-stats{display:grid;gap:14px}',
      '#cf26 .cf-stat{display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:16px;background:' + PANEL + ';border-left:4px solid ' + TEAL + '}',
      '#cf26 .cf-stat:nth-child(2){border-left-color:' + GREEN + '}',
      '#cf26 .cf-stat:nth-child(3){border-left-color:' + GOLD + '}',
      '#cf26 .cf-stat b{font-family:' + DISP + ';font-size:2.2rem;color:#fff;min-width:90px;line-height:1}',
      '#cf26 .cf-stat span{color:' + MUTED + ';font-size:.95rem}',

      /* news */
      '#cf26 .cf-news{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px}',
      '@media (max-width:900px){#cf26 .cf-news{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:560px){#cf26 .cf-news{grid-template-columns:1fr}}',
      '#cf26 .cf-nc{display:flex;flex-direction:column;background:#fff;color:' + DEEP + ';border-radius:18px;padding:24px 22px 20px;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;min-height:230px}',
      '#cf26 .cf-nc:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.35)}',
      '#cf26 .cf-nc.feat{grid-column:span 2;background:linear-gradient(135deg,#fffaf0,#ffffff)}',
      '@media (max-width:560px){#cf26 .cf-nc.feat{grid-column:auto}}',
      '#cf26 .cf-nc-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}',
      '#cf26 .cf-nc-out{font-size:.7rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#0e7f80}',
      '#cf26 .cf-nc-date{font-size:.78rem;color:#6b7f86;white-space:nowrap}',
      '#cf26 .cf-nc h3{font-family:' + DISP + ';font-size:1.15rem;line-height:1.3;margin-bottom:10px}',
      '#cf26 .cf-nc.feat h3{font-size:1.55rem}',
      '#cf26 .cf-nc p{font-size:.9rem;color:#4a5d64;flex:1}',
      '#cf26 .cf-nc-go{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-weight:700;font-size:.85rem;color:#b07d0a}',

      /* guide */
      '#cf26 .cf-nights{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:36px}',
      '@media (max-width:820px){#cf26 .cf-nights{grid-template-columns:repeat(4,1fr)}}',
      '#cf26 .cf-nt{border-radius:14px;background:' + PANEL + ';padding:14px 8px 12px;text-align:center;border:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-nt.star{background:linear-gradient(160deg,rgba(235,190,77,.28),rgba(26,204,206,.14)),' + PANEL + ';border-color:' + GOLD + '}',
      '#cf26 .cf-nt-c{display:flex;justify-content:center;gap:3px;height:22px;align-items:flex-end;margin-bottom:8px}',
      '#cf26 .cf-nt-c i{display:block;width:4px;height:14px;border-radius:2px;background:rgba(255,255,255,.22);position:relative}',
      '#cf26 .cf-nt-c i.on{background:' + TEAL + '}',
      '#cf26 .cf-nt-c i.on:before{content:"";position:absolute;left:50%;top:-7px;width:5px;height:7px;margin-left:-2.5px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + GOLD + '}',
      '#cf26 .cf-nt b{display:block;font-family:' + DISP + ';color:#fff;font-size:1rem}',
      '#cf26 .cf-nt span{display:block;font-size:.78rem;color:' + MUTED + '}',
      '#cf26 .cf-nt em{display:block;font-style:normal;font-size:.7rem;color:' + GOLD + ';margin-top:4px;line-height:1.25;font-weight:600}',
      '#cf26 .cf-nnote{color:' + MUTED + ';font-size:.9rem;margin-top:14px}',
      '#cf26 .cf-gintro{color:' + MUTED + ';margin-top:30px;max-width:70ch}',
      '#cf26 .cf-ggrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}',
      '@media (max-width:900px){#cf26 .cf-ggrid{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:560px){#cf26 .cf-ggrid{grid-template-columns:1fr}}',
      '#cf26 .cf-gc{display:flex;flex-direction:column;text-align:left;border-radius:18px;overflow:hidden;background:' + PANEL + ';border:1px solid rgba(255,255,255,.07);text-decoration:none;transition:transform .25s ease,border-color .25s ease;width:100%}',
      '#cf26 .cf-gc:hover{transform:translateY(-4px);border-color:rgba(235,190,77,.5)}',
      '#cf26 .cf-gc-img{aspect-ratio:16/9;width:100%;object-fit:cover;background:' + DEEP + '}',
      '#cf26 .cf-gc-ph{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(26,204,206,.22),rgba(235,190,77,.22));color:' + GOLD + ';font-size:44px}',
      '#cf26 .cf-gc-b{padding:18px 20px 20px}',
      '#cf26 .cf-gc h3{font-family:' + DISP + ';color:#fff;font-size:1.08rem;line-height:1.3}',
      '#cf26 .cf-gc p{color:' + MUTED + ';font-size:.88rem;margin-top:6px}',
      '#cf26 .cf-gmore{margin-top:28px;text-align:center}',
      '#cf26 .cf-skel{height:240px;border-radius:18px;background:linear-gradient(90deg,' + PANEL + ',#18404f,' + PANEL + ');background-size:200% 100%;animation:cf26sk 1.4s linear infinite}',
      '@keyframes cf26sk{from{background-position:200% 0}to{background-position:0 0}}',

      /* reader */
      '#cf26 .cf-rd{position:fixed;inset:0;z-index:2147482500;background:rgba(5,15,20,.72);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto}',
      '#cf26 .cf-rd-box{position:relative;width:100%;max-width:760px;background:#fffdf8;color:#1d2b30;border-radius:20px;padding:46px clamp(20px,5vw,54px) 40px;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
      '#cf26 .cf-rd-x{position:absolute;top:12px;right:12px;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1d2b30;background:#f0ebe0;font-size:20px}',
      '#cf26 .cf-rd h1{font-family:' + DISP + ';font-size:clamp(1.6rem,4vw,2.3rem);line-height:1.15;color:' + NAVY + ';margin-bottom:18px}',
      '#cf26 .cf-rd-body{font-size:1.02rem;line-height:1.7}',
      '#cf26 .cf-rd-body p{margin:0 0 1em}',
      '#cf26 .cf-rd-body h2,#cf26 .cf-rd-body h3{font-family:' + DISP + ';color:' + NAVY + ';margin:1.3em 0 .5em;line-height:1.25}',
      '#cf26 .cf-rd-body img{height:auto;margin:1em auto;border-radius:10px}',
      '#cf26 .cf-rd-body a{color:#0e7f80}',
      '#cf26 .cf-rd-body iframe{max-width:100%}',
      '#cf26 .cf-rd-foot{margin-top:26px;padding-top:18px;border-top:1px solid #e7dfcf;display:flex;gap:12px;flex-wrap:wrap}',

      /* share band + footer */
      '#cf26 .cf-share{background:radial-gradient(ellipse 60% 120% at 0% 100%,rgba(235,190,77,.55),rgba(235,190,77,0) 60%),radial-gradient(ellipse 60% 120% at 100% 100%,rgba(26,164,173,.75),rgba(26,164,173,0) 60%),' + NAVY + ';padding:70px 0}',
      '#cf26 .cf-sharebtns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:26px}',
      '#cf26 .cf-fb{background:#1877f2;color:#fff}',
      '#cf26 .cf-ig{background:linear-gradient(45deg,#f9a63a,#e1306c 50%,#833ab4);color:#fff}',
      '#cf26 .cf-pop{max-width:460px;margin:22px auto 0;background:#fff;color:' + DEEP + ';border-radius:16px;padding:20px;text-align:center;display:none}',
      '#cf26 .cf-pop.open{display:block}',
      '#cf26 .cf-pop p{font-size:.92rem;margin-bottom:14px}',
      '#cf26 .cf-pop .cf-btn{margin:4px}',
      '#cf26 .cf-pop .cf-ghost{color:' + DEEP + ';border-color:rgba(10,31,42,.25)}',
      '#cf26 .cf-foot{background:' + DEEP + ';padding:46px 0 34px;text-align:center;color:' + MUTED + ';font-size:.92rem}',
      '#cf26 .cf-foot b{display:block;font-family:' + DISP + ';color:#fff;font-size:1.25rem;margin-bottom:10px}',
      '#cf26 .cf-foot-l{display:flex;flex-wrap:wrap;gap:8px 22px;justify-content:center;margin:10px 0 22px}',
      '#cf26 .cf-foot-l a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:' + INK + '}',
      '#cf26 .cf-foot-l a:hover{color:' + GOLD + '}',
      '#cf26 .cf-foot small{display:block;font-size:.74rem;opacity:.7;margin-top:14px}',
      '#cf26 .cf-toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:' + GOLD + ';color:' + DEEP + ';font-weight:700;padding:12px 20px;border-radius:999px;z-index:2147482600;transition:all .3s ease;max-width:90vw;text-align:center;font-size:.9rem}',
      '#cf26 .cf-toast.show{opacity:1;transform:translate(-50%,0)}',
      '#cf26 .cf-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}',
      '#cf26 .cf-reveal.in{opacity:1;transform:none}',
      '@media (max-width:620px){#cf26 .cf-sec{padding:60px 0}#cf26 .cf-rsvp{padding:34px 24px}#cf26 .cf-ev-info{padding:26px 22px}}',
      '@media (prefers-reduced-motion:reduce){#cf26 .cf-flame{animation:none;opacity:1}#cf26 .cf-marq-in{animation:none}#cf26 .cf-reveal{opacity:1;transform:none;transition:none}#cf26 .cf-skel{animation:none}}'
    ].join('\n');
  }

  /* =====================================================================
     BUILD
     ===================================================================== */
  var root;

  function boot() {
    if (document.getElementById('cf26')) return;
    if (!onThisPage()) { uncover(); return; }
    try {
      loadFonts();
      var st = document.createElement('style');
      st.id = 'cf26-style';
      st.textContent = css();
      document.head.appendChild(st);

      root = document.createElement('div');
      root.id = 'cf26';
      add(root,
        buildNav(), buildHero(), buildCountdown(), buildMarquee(),
        buildEvent(), buildSponsors(), buildRsvp(), buildAbout(),
        buildNews(), buildGuide(), buildShare(), buildFooter());

      var host = document.querySelector('.cco_templatelates_content') || document.body;
      if (host === document.body) document.body.insertBefore(root, document.body.firstChild);
      else host.parentNode.insertBefore(root, host);

      document.documentElement.className += ' cf26-on';
      uncover();
      startCountdown();
      reveal();
      loadGuide();
      document.addEventListener('click', closeMenus);
      if (window.console) console.log('Chanukah Festival ' + VERSION + ': footer payload executing');
    } catch (err) {
      if (window.console) console.error('Chanukah Festival ' + VERSION + ' failed', err);
      var r = document.getElementById('cf26');
      if (r && r.parentNode) r.parentNode.removeChild(r);
      document.documentElement.className = document.documentElement.className.replace(' cf26-on', '');
      uncover();
    }
  }

  function loadFonts() {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + ['family=Arvo:wght@400;700', 'family=Satisfy',
      'family=Montserrat:wght@400;500;600;700;800', 'display=swap'].join(AMP);
    document.head.appendChild(l);
  }

  function section(id, extra) {
    var s = el('section', 'cf-sec' + (extra ? ' ' + extra : ''));
    if (id) s.id = 'cf-' + id;
    return s;
  }
  function heading(kicker, title, lead, center) {
    var d = el('div', 'cf-reveal' + (center ? ' cf-center' : ''));
    add(d, kicker ? el('div', 'cf-kicker', kicker) : null, el('h2', 'cf-h2', title),
      lead ? el('p', 'cf-lead', lead) : null, el('div', 'cf-rule'));
    return d;
  }
  function rsvpOn() {
    return CFG.RSVP.enabled && (CFG.RSVP.url || PREVIEW) && !eventOver();
  }
  function eventOver() { return Date.now() > Date.parse(CFG.event.endUTC); }

  /* ---------- nav ---------- */
  function buildNav() {
    var n = el('nav', 'cf-nav');
    n.setAttribute('aria-label', 'Festival');
    var w = el('div', 'cf-wrap');
    var b = el('a', 'cf-brand');
    b.href = '#cf-top';
    add(b, el('span', null, 'Chanukah'), document.createTextNode(' Festival'));
    var ls = el('div', 'cf-links');
    var items = [['event', 'Event'], ['sponsors', 'Sponsors']];
    if (rsvpOn()) items.push(['rsvp', 'RSVP']);
    items.push(['about', 'About'], ['news', 'In the News'], ['guide', 'Chanukah Guide']);
    items.forEach(function (it) { ls.appendChild(link(null, '#cf-' + it[0], it[1])); });
    var d = link('cf-btn cf-gold', CFG.DONATE_URL, 'Donate');
    add(w, b, ls, d);
    n.appendChild(w);
    return n;
  }

  /* ---------- hero ---------- */
  function menorahSVG() {
    var cx = 300, top = 110, sw = 15;
    var paths = [];
    for (var i = 1; i <= 4; i++) {
      var dx = i * 64, yb = 168 + i * 40, yc = yb + i * 30;
      paths.push('M' + (cx - dx) + ' ' + top + 'V' + yb + 'L' + cx + ' ' + yc + 'L' + (cx + dx) + ' ' + yb + 'V' + top);
    }
    var flames = '';
    var order = [0, 4, 3, 2, 1, 5, 6, 7, 8];
    for (var k = 0; k < 9; k++) {
      var x = cx + (k - 4) * 64;
      var y = k === 4 ? 70 : top - 6;
      var delay = (0.35 + order.indexOf(k) * 0.22).toFixed(2);
      flames += '<g class="cf-flame" style="animation-delay:' + delay + 's,' + (Number(delay) + 0.5).toFixed(2) + 's">' +
        '<ellipse cx="' + x + '" cy="' + (y - 16) + '" rx="22" ry="26" fill="url(#cf26glow)"/>' +
        '<path d="M' + x + ' ' + (y - 34) + 'C' + (x + 9) + ' ' + (y - 20) + ' ' + (x + 10) + ' ' + (y - 8) + ' ' + x + ' ' + y +
        'C' + (x - 10) + ' ' + (y - 8) + ' ' + (x - 9) + ' ' + (y - 20) + ' ' + x + ' ' + (y - 34) + 'Z" fill="#ffffff"/>' +
        '<path d="M' + x + ' ' + (y - 16) + 'C' + (x + 4) + ' ' + (y - 9) + ' ' + (x + 4) + ' ' + (y - 4) + ' ' + x + ' ' + (y - 1) +
        'C' + (x - 4) + ' ' + (y - 4) + ' ' + (x - 4) + ' ' + (y - 9) + ' ' + x + ' ' + (y - 16) + 'Z" fill="' + GOLD + '"/></g>';
    }
    return '<svg class="cf-menorah" viewBox="0 0 600 560" role="img" aria-label="A lit Chanukah menorah">' +
      '<defs><linearGradient id="cf26mg" x1="0" y1="90" x2="0" y2="520" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="' + TEAL + '"/><stop offset=".55" stop-color="' + GREEN + '"/><stop offset="1" stop-color="' + GOLD + '"/></linearGradient>' +
      '<radialGradient id="cf26glow"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".45" stop-color="' + GOLD + '" stop-opacity=".25"/><stop offset="1" stop-color="' + GOLD + '" stop-opacity="0"/></radialGradient></defs>' +
      '<g fill="none" stroke="url(#cf26mg)" stroke-width="' + sw + '" stroke-linejoin="miter">' +
      '<path d="M' + cx + ' 76V560"/>' +
      paths.map(function (p) { return '<path d="' + p + '"/>'; }).join('') +
      '</g>' + flames + '</svg>';
  }

  function buildHero() {
    var h = el('header', 'cf-hero');
    h.id = 'cf-top';
    var w = el('div', 'cf-wrap');
    var ann = el('div', 'cf-annual');
    var b = el('b');
    add(b, document.createTextNode(CFG.edition), el('sup', null, CFG.editionSuffix), document.createTextNode(' Annual'));
    add(ann, el('i'), b, el('i'));

    var stage = el('div', 'cf-stage');
    stage.innerHTML = menorahSVG();
    add(stage, el('div', 'cf-ribbon l', 'Free Admission!'), el('div', 'cf-ribbon r', 'All Are Welcome!'));

    var ctas = el('div', 'cf-ctas');
    if (rsvpOn()) ctas.appendChild(link('cf-btn cf-gold', '#cf-rsvp', CFG.RSVP.button));
    ctas.appendChild(calendarButton('cf-btn ' + (rsvpOn() ? 'cf-ghost' : 'cf-gold')));
    var dir = link('cf-btn cf-ghost', directionsUrl(), 'Directions', true);
    dir.insertBefore(icon('pin'), dir.firstChild);
    ctas.appendChild(dir);
    var sh = el('button', 'cf-btn cf-ghost', 'Share');
    sh.type = 'button';
    sh.insertBefore(icon('share'), sh.firstChild);
    sh.addEventListener('click', function () {
      var t = document.getElementById('cf-share');
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
    ctas.appendChild(sh);

    add(w,
      el('div', 'cf-bh', 'B\u201dH'),
      el('p', 'cf-invite', CFG.host + ' Invites You To Our'),
      ann,
      el('h1', 'cf-t1', 'Chanukah'.toUpperCase()),
      el('div', 'cf-t2', 'FESTIVAL'),
      stage,
      el('div', 'cf-base'),
      el('div', 'cf-venue', CFG.event.venue),
      el('div', 'cf-addr', CFG.event.street + ' Riverside, CA'),
      whenLine(),
      el('div', 'cf-night', CFG.event.nightLine),
      ctas);
    h.appendChild(w);
    return h;
  }

  function whenLine() {
    var d = el('div', 'cf-when');
    add(d, el('span', null, CFG.event.dayLine), el('span', 'cf-sep', ' \u2022 '), el('span', 'cf-tm', CFG.event.timeLine));
    return d;
  }
  function directionsUrl() {
    return 'https://www.google.com/maps/dir/?' + qs({ api: '1', destination: CFG.event.mapQuery });
  }
  function gcalUrl() {
    var f = function (iso) { return iso.replace(/[-:]/g, '').replace(/\.\d+/, ''); };
    return 'https://calendar.google.com/calendar/render?' + qs({
      action: 'TEMPLATE',
      text: CFG.edition + CFG.editionSuffix + ' Annual Chanukah Festival',
      dates: f(CFG.event.startUTC) + '/' + f(CFG.event.endUTC),
      location: CFG.event.mapQuery,
      details: 'Grand Menorah Lighting, traditional food, live music and fun for the whole family. Free admission, all are welcome! ' + CFG.SHARE.url
    });
  }
  function icsFile() {
    var f = function (iso) { return iso.replace(/[-:]/g, '').replace(/\.\d+/, ''); };
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Chabad JCC Riverside//Chanukah Festival//EN', 'BEGIN:VEVENT',
      'UID:chanukah-festival-' + CFG.event.startUTC.slice(0, 10) + '@jewishriverside.com',
      'DTSTAMP:' + f(new Date().toISOString()),
      'DTSTART:' + f(CFG.event.startUTC), 'DTEND:' + f(CFG.event.endUTC),
      'SUMMARY:' + CFG.edition + CFG.editionSuffix + ' Annual Chanukah Festival',
      'LOCATION:' + CFG.event.mapQuery.replace(/,/g, '\\,'),
      'DESCRIPTION:Grand Menorah Lighting\\, traditional food\\, live music and fun for the whole family. Free admission!',
      'URL:' + CFG.SHARE.url,
      'END:VEVENT', 'END:VCALENDAR'];
    return new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  }
  function calendarButton(cls) {
    var wrap = el('div', 'cf-calwrap');
    var b = el('button', cls, 'Add to Calendar');
    b.type = 'button';
    b.setAttribute('aria-haspopup', 'true');
    b.insertBefore(icon('cal'), b.firstChild);
    var m = el('div', 'cf-menu');
    var g = link(null, gcalUrl(), 'Google Calendar', true);
    g.insertBefore(icon('cal'), g.firstChild);
    var a = el('button', null, 'Apple / Outlook (.ics)');
    a.type = 'button';
    a.insertBefore(icon('dl'), a.firstChild);
    a.addEventListener('click', function () {
      var url = URL.createObjectURL(icsFile());
      var t = document.createElement('a');
      t.href = url; t.download = 'Chanukah-Festival-2026.ics';
      document.body.appendChild(t); t.click(); document.body.removeChild(t);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      m.className = 'cf-menu';
    });
    add(m, g, a);
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = m.className.indexOf('open') > -1;
      closeMenus();
      m.className = open ? 'cf-menu' : 'cf-menu open';
    });
    add(wrap, b, m);
    return wrap;
  }
  function closeMenus() {
    if (!root) return;
    var ms = root.querySelectorAll('.cf-menu.open');
    for (var i = 0; i < ms.length; i++) ms[i].className = 'cf-menu';
  }

  /* ---------- countdown ---------- */
  var countEls = null;
  function buildCountdown() {
    var s = el('div', 'cf-count');
    var w = el('div', 'cf-wrap');
    var units = el('div', 'cf-units');
    countEls = {};
    [['d', 'Days'], ['h', 'Hours'], ['m', 'Min'], ['s', 'Sec']].forEach(function (u) {
      var c = el('div', 'cf-unit');
      var b = el('b', null, '00');
      countEls[u[0]] = b;
      add(c, b, el('span', null, u[1]));
      units.appendChild(c);
    });
    countEls.label = el('div', 'cf-count-l', 'The lights go up in');
    countEls.units = units;
    countEls.msg = el('div', 'cf-countmsg');
    countEls.msg.style.display = 'none';
    add(w, countEls.label, units, countEls.msg);
    s.appendChild(w);
    return s;
  }
  function startCountdown() {
    var start = Date.parse(CFG.event.startUTC), end = Date.parse(CFG.event.endUTC);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var now = Date.now();
      if (now >= start) {
        countEls.label.style.display = 'none';
        countEls.units.style.display = 'none';
        countEls.msg.style.display = 'block';
        countEls.msg.textContent = now < end ?
          'The festival is happening now \u2014 come join us!' :
          'Thank you for celebrating with us. See you next Chanukah!';
        return now < end;
      }
      var t = Math.floor((start - now) / 1000);
      countEls.d.textContent = String(Math.floor(t / 86400));
      countEls.h.textContent = pad(Math.floor(t % 86400 / 3600));
      countEls.m.textContent = pad(Math.floor(t % 3600 / 60));
      countEls.s.textContent = pad(t % 60);
      return true;
    }
    if (tick()) {
      var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000);
    }
  }

  /* ---------- sponsor marquee ---------- */
  function allSponsorNames() {
    var out = [];
    CFG.SPONSORS.forEach(function (t) { t.names.forEach(function (n) { out.push(T(n.name)); }); });
    return out;
  }
  function buildMarquee() {
    var names = allSponsorNames();
    if (!names.length) return null;
    var m = el('div', 'cf-marq');
    m.setAttribute('aria-label', 'Thank you to our sponsors and partners');
    var inner = el('div', 'cf-marq-in');
    var reps = Math.max(2, Math.ceil(12 / names.length)) * 2;
    for (var r = 0; r < reps; r++) {
      inner.appendChild(el('em', null, 'Thank you'));
      names.forEach(function (n) { inner.appendChild(el('span', null, n)); });
    }
    m.appendChild(inner);
    return m;
  }

  /* ---------- event ---------- */
  function buildEvent() {
    var s = section('event');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('The evening', 'An evening of light for all of Riverside',
      'Free admission. All are welcome. Bring the whole family.', true));

    var hl = el('div', 'cf-hl');
    CFG.highlights.forEach(function (x, i) {
      var c = el('div', 'cf-hl-card cf-reveal');
      c.style.transitionDelay = (i * 0.08) + 's';
      var ic = el('div', 'cf-hl-ic');
      ic.appendChild(icon(x.icon));
      add(c, ic, el('h3', null, x.title), el('p', null, x.text));
      hl.appendChild(c);
    });
    w.appendChild(hl);
    if (CFG.accessNote) {
      var asl = el('div', 'cf-center');
      var p = el('div', 'cf-asl', CFG.accessNote);
      p.insertBefore(icon('asl'), p.firstChild);
      asl.appendChild(p);
      w.appendChild(asl);
    }

    var ev = el('div', 'cf-ev cf-reveal');
    var info = el('div', 'cf-ev-info');
    function row(ic, a, b) {
      var r = el('div', 'cf-ev-row');
      var t = el('div');
      add(t, el('b', null, a), el('span', null, b));
      add(r, icon(ic), t);
      return r;
    }
    add(info,
      el('div', 'cf-kicker', 'Event details'),
      row('cal', 'Monday, December 7, 2026', CFG.event.nightLine),
      row('clock', '6:00 \u2013 8:00 PM', 'Menorah lighting during the evening'),
      row('pin', CFG.event.venue, CFG.event.street + ' ' + CFG.event.cityLine));
    var btns = el('div', 'cf-ev-btns');
    var dr = link('cf-btn cf-teal', directionsUrl(), 'Get directions', true);
    dr.insertBefore(icon('pin'), dr.firstChild);
    add(btns, dr, calendarButton('cf-btn cf-ghost'));
    info.appendChild(btns);

    var map = el('div', 'cf-map');
    var fb = el('div', 'cf-map-fb');
    add(fb, icon('pin'), el('b', null, CFG.event.venue), el('span', null, CFG.event.street + ' ' + CFG.event.cityLine));
    map.appendChild(fb);
    var fr = document.createElement('iframe');
    fr.title = 'Map to ' + CFG.event.venue;
    fr.loading = 'lazy';
    fr.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    fr.src = CFG.event.mapEmbed;
    map.appendChild(fr);
    add(ev, info, map);
    w.appendChild(ev);

    if (CFG.FLYER) {
      var fl = el('div', 'cf-flyer cf-reveal');
      var im = document.createElement('img');
      im.src = CFG.FLYER; im.alt = 'Chanukah Festival 2026 flyer'; im.loading = 'lazy';
      var tx = el('div');
      add(tx, el('b', null, 'Download the flyer'), el('span', null, 'Print it, post it, send it to a friend.'));
      var dl = link('cf-btn cf-ghost', CFG.FLYER, 'Download', true);
      dl.setAttribute('download', 'Chanukah-Festival-2026-Flyer.png');
      dl.insertBefore(icon('dl'), dl.firstChild);
      add(fl, im, tx, dl);
      w.appendChild(fl);
    }
    s.appendChild(w);
    return s;
  }

  /* ---------- sponsors ---------- */
  function buildSponsors() {
    var s = section('sponsors', 'cf-spons');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('With gratitude', 'Our Sponsors', CFG.SPONSOR_INTRO, true));
    var any = false;
    CFG.SPONSORS.forEach(function (t) {
      if (!t.names.length && !t.showOpenSlot) return;
      any = true;
      var tier = el('div', 'cf-tier cf-reveal cf-' + (t.size || 'md'));
      var hd = el('div', 'cf-tier-h');
      add(hd, el('h3', null, t.tier), t.amount ? el('small', null, t.amount) : null, el('i'));
      var g = el('div', 'cf-sgrid');
      t.names.forEach(function (n) {
        var c = el(n.url ? 'a' : 'div', 'cf-sp');
        if (n.url) { c.href = n.url; c.target = '_blank'; c.rel = 'noopener'; }
        if (n.logo) {
          var im = document.createElement('img');
          im.src = n.logo; im.alt = T(n.name); im.loading = 'lazy';
          c.appendChild(im);
          if (!n.showName) { c.appendChild(el('span', null, n.sub || '')); g.appendChild(c); return; }
        }
        add(c, el('b', null, n.name), n.sub ? el('span', null, n.sub) : null);
        g.appendChild(c);
      });
      if (t.showOpenSlot && !eventOver()) {
        var o = link('cf-sp open', CFG.DONATE_URL, null);
        add(o, el('b', null, 'Your name here'), el('span', null, 'Join this tier \u2192'));
        g.appendChild(o);
      }
      add(tier, hd, g);
      w.appendChild(tier);
    });
    if (!any) return null;
    var cta = el('div', 'cf-spcta cf-reveal');
    var b = link('cf-btn cf-gold', CFG.DONATE_URL, CFG.SPONSOR_CTA);
    b.insertBefore(icon('heart'), b.firstChild);
    add(cta, b, el('p', null, 'Every gift helps keep the festival free for the whole community.'));
    w.appendChild(cta);
    s.appendChild(w);
    return s;
  }

  /* ---------- rsvp ---------- */
  function buildRsvp() {
    if (!rsvpOn()) return null;
    var s = section('rsvp');
    var w = el('div', 'cf-wrap');
    var box = el('div', 'cf-rsvp cf-reveal');
    var t = el('div');
    add(t, el('span', 'cf-pill', 'Optional'), el('h2', 'cf-h2', CFG.RSVP.title), el('p', 'cf-lead', CFG.RSVP.text));
    var r = el('div');
    var b = link('cf-btn cf-gold', CFG.RSVP.url || '#cf-rsvp', CFG.RSVP.button);
    r.appendChild(b);
    if (!CFG.RSVP.url) r.appendChild(el('div', 'cf-pending', 'Preview only \u2014 set RSVP.url to the RSVP form link.'));
    add(box, t, r);
    w.appendChild(box);
    s.appendChild(w);
    return s;
  }

  /* ---------- about ---------- */
  function buildAbout() {
    var s = section('about', 'cf-alt');
    var w = el('div', 'cf-wrap cf-about');
    var l = el('div', 'cf-reveal');
    l.appendChild(heading('About the festival', 'Sharing the light, together'));
    CFG.about.forEach(function (p) { l.appendChild(el('p', null, p)); });
    var r = el('div', 'cf-stats cf-reveal');
    CFG.stats.forEach(function (x) {
      var c = el('div', 'cf-stat');
      add(c, el('b', null, x.big), el('span', null, x.small));
      r.appendChild(c);
    });
    add(w, l, r);
    s.appendChild(w);
    return s;
  }

  /* ---------- news ---------- */
  function buildNews() {
    if (!CFG.NEWS.length) return null;
    var s = section('news');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('Press', 'In the News', 'Coverage of the festival over the years.', true));
    var g = el('div', 'cf-news');
    CFG.NEWS.forEach(function (n, i) {
      var a = link('cf-nc cf-reveal' + (i === 0 ? ' feat' : ''), n.url, null, true);
      a.style.transitionDelay = (i % 3 * 0.08) + 's';
      var top = el('div', 'cf-nc-top');
      add(top, el('span', 'cf-nc-out', n.outlet), el('span', 'cf-nc-date', n.date));
      var go = el('span', 'cf-nc-go', 'Read');
      go.appendChild(icon('ext'));
      add(a, top, el('h3', null, n.title), n.blurb ? el('p', null, n.blurb) : null, go);
      g.appendChild(a);
    });
    w.appendChild(g);
    s.appendChild(w);
    return s;
  }

  /* ---------- guide (imported) ---------- */
  var guideGrid = null, guideIntro = null;
  function buildGuide() {
    var s = section('guide', 'cf-alt');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('Chanukah 2026', 'Celebrate all eight nights',
      'Light the menorah at home every night of Chanukah. Here\u2019s the calendar, and everything you need to know.', true));

    var nights = el('div', 'cf-nights cf-reveal');
    CFG.NIGHTS.forEach(function (n) {
      var c = el('div', 'cf-nt' + (n.star ? ' star' : ''));
      var cs = el('div', 'cf-nt-c');
      for (var i = 0; i < 8; i++) cs.appendChild(el('i', i >= 8 - n.n ? 'on' : null));
      add(c, cs, el('b', null, 'Night ' + n.n), el('span', null, n.day + ', ' + n.date), n.note ? el('em', null, n.note) : null);
      nights.appendChild(c);
    });
    w.appendChild(nights);
    w.appendChild(el('p', 'cf-nnote cf-center', CFG.NIGHTS_NOTE));

    guideIntro = el('p', 'cf-gintro');
    guideIntro.style.display = 'none';
    guideGrid = el('div', 'cf-ggrid');
    for (var k = 0; k < 3; k++) guideGrid.appendChild(el('div', 'cf-skel'));
    var more = el('div', 'cf-gmore');
    more.appendChild(link('cf-btn cf-ghost', CFG.GUIDE.source, 'Explore the full Chanukah guide'));
    add(w, guideIntro, guideGrid, more);
    s.appendChild(w);
    return s;
  }

  function loadGuide() {
    if (!window.fetch || !window.DOMParser) return renderGuide(CFG.GUIDE.fallback);
    fetch(CFG.GUIDE.source, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var res = extractGuide(doc, abs(CFG.GUIDE.source));
        if (res.items.length < 3) throw new Error('only ' + res.items.length + ' guide items');
        if (res.intro) { guideIntro.textContent = res.intro; guideIntro.style.display = 'block'; }
        renderGuide(res.items);
        if (window.console) console.log('Chanukah Festival: imported ' + res.items.length + ' guide items');
      })
      .catch(function (e) {
        if (window.console) console.warn('Chanukah Festival: guide import fell back', e);
        renderGuide(CFG.GUIDE.fallback);
      });
  }

  var ARTICLE_RE = /(article_cdo|article\.aspx?|\/aid\/\d+|default_cdo|\/holidays\/)/i;
  function extractGuide(doc, baseUrl) {
    var scopes = ['[itemprop="articleBody"]', '#co_content_container .co_body', '#ContentBody',
      '#co_content_container', '#chabad_body_content', '#content_page', 'main', 'body'];
    var NOISE = '#navigation,.chabad_navigator_bar,header,footer,nav,.page-tools-sidebar,.breadcrumbs,.breadcrumb,.footer,.cco_templateless_template,#chabad_head,script,style';
    var scope = null, anchors = [];
    for (var i = 0; i < scopes.length; i++) {
      var sc = doc.querySelector(scopes[i]);
      if (!sc) continue;
      var as = qualifying(sc);
      if (as.length >= 3) { scope = sc; anchors = as; break; }
    }
    function qualifying(sc) {
      var out = [], list = sc.querySelectorAll('a[href]');
      for (var j = 0; j < list.length; j++) {
        var a = list[j];
        if (a.closest && a.closest(NOISE)) continue;
        var raw = a.getAttribute('href') || '';
        if (/^(#|javascript:|mailto:|tel:)/i.test(raw)) continue;
        var u;
        try { u = new URL(raw, baseUrl); } catch (e) { continue; }
        if (!/(^|\.)(chabad\.org|jewishriverside\.com|chanukahfestival\.org)$/i.test(u.hostname) &&
            u.hostname !== window.location.hostname) continue;
        if (!ARTICLE_RE.test(u.pathname + u.search)) continue;
        if (stripHash(u.href) === stripHash(baseUrl)) continue;
        out.push({ a: a, u: u });
      }
      return out;
    }
    var seen = {}, items = [];
    anchors.forEach(function (x) {
      var key = aidKey(x.u);
      var title = clean(x.a.textContent) || clean((x.a.querySelector('img') || {}).alt || '') || clean(x.a.getAttribute('title') || '');
      if (seen[key]) {
        var prev = seen[key];
        if (!prev.img) prev.img = findImg(x.a, baseUrl);
        if ((!prev.title || prev.title.length < 4) && title.length >= 4) prev.title = title;
        return;
      }
      if (/^(read more|more|click here|continue|\u00bb|\u203a)$/i.test(title)) title = '';
      var it = { url: localize(x.u), title: title, img: findImg(x.a, baseUrl), text: '' };
      it.text = findText(x.a, title);
      seen[key] = it;
      items.push(it);
    });
    items = items.filter(function (it) { return it.title && it.title.length >= 4 && it.title.length <= 140; });
    items = items.slice(0, CFG.GUIDE.max);

    var intro = '';
    var paras = (scope || doc).querySelectorAll('p,div,span');
    for (var p = 0; p < paras.length && p < 400; p++) {
      var tx = clean(paras[p].textContent);
      if (/Chanukah begins|Hanukkah begins/i.test(tx) && tx.length < 260) { intro = tx; break; }
    }
    return { items: items, intro: intro };
  }
  function stripHash(h) { return String(h).split('#')[0]; }
  function aidKey(u) {
    var m = /\/aid\/(\d+)/i.exec(u.pathname) || /[?\x26]aid=(\d+)/i.exec(u.search);
    return m ? 'aid' + m[1] : u.pathname.toLowerCase();
  }
  function localize(u) {
    if (/(^|\.)chabad\.org$/i.test(u.hostname)) return window.location.origin + u.pathname + u.search;
    return u.href;
  }
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function imgSrc(img, base) {
    var s = img.getAttribute('data-src') || img.getAttribute('data-original') || img.getAttribute('data-lazy-src') || img.getAttribute('src') || '';
    if (!s || /spacer\.gif|blank\.gif|pixel/i.test(s) || /^data:/i.test(s)) return '';
    var w = parseInt(img.getAttribute('width') || '0', 10);
    if (w && w < 40) return '';
    try { return new URL(s, base).href; } catch (e) { return ''; }
  }
  function findImg(a, base) {
    var img = a.querySelector('img');
    if (img && imgSrc(img, base)) return imgSrc(img, base);
    var n = a.parentNode;
    for (var d = 0; d < 3 && n && n.querySelectorAll; d++, n = n.parentNode) {
      if (n.querySelectorAll('a[href]').length > 3) break;
      var im = n.querySelector('img');
      if (im && imgSrc(im, base)) return imgSrc(im, base);
    }
    return '';
  }
  function findText(a, title) {
    var n = a.parentNode;
    for (var d = 0; d < 3 && n && n.querySelectorAll; d++, n = n.parentNode) {
      if (n.querySelectorAll('a[href]').length > 3) break;
      var t = clean(n.textContent).replace(title, '').trim();
      if (t.length > 25) return t.length > 170 ? t.slice(0, 165).replace(/\s+\S*$/, '') + '\u2026' : t;
    }
    return '';
  }

  function renderGuide(items) {
    guideGrid.innerHTML = '';
    items.forEach(function (it, i) {
      var a = link('cf-gc cf-reveal in', it.url, null);
      a.style.transitionDelay = (i % 3 * 0.06) + 's';
      if (it.img) {
        var im = document.createElement('img');
        im.className = 'cf-gc-img'; im.src = it.img; im.alt = ''; im.loading = 'lazy';
        im.onerror = function () { this.parentNode.replaceChild(placeholderArt(), this); };
        a.appendChild(im);
      } else {
        a.appendChild(placeholderArt());
      }
      var b = el('div', 'cf-gc-b');
      add(b, el('h3', null, it.title), it.text ? el('p', null, it.text) : null);
      a.appendChild(b);
      if (CFG.GUIDE.reader) a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        openReader(it);
      });
      guideGrid.appendChild(a);
    });
  }
  function placeholderArt() {
    var p = el('div', 'cf-gc-ph');
    p.appendChild(icon('menorah'));
    return p;
  }

  /* ---------- article reader (imports the syndicated article) ---------- */
  var lastFocus = null;
  function openReader(it) {
    lastFocus = document.activeElement;
    var ov = el('div', 'cf-rd');
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', T(it.title));
    var box = el('div', 'cf-rd-box');
    var x = el('button', 'cf-rd-x');
    x.type = 'button';
    x.setAttribute('aria-label', 'Close');
    x.appendChild(icon('x'));
    var h = el('h1', null, it.title);
    var body = el('div', 'cf-rd-body');
    body.appendChild(el('div', 'cf-skel'));
    var foot = el('div', 'cf-rd-foot');
    var full = link('cf-btn cf-teal', it.url, 'Open the full page', true);
    full.appendChild(icon('ext'));
    var back = el('button', 'cf-btn cf-ghost', 'Back to the festival');
    back.style.color = NAVY;
    back.style.borderColor = 'rgba(15,41,54,.3)';
    back.type = 'button';
    add(foot, full, back);
    add(box, x, h, body, foot);
    ov.appendChild(box);
    root.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    x.focus();

    function close() {
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    x.addEventListener('click', close);
    back.addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', onKey);

    fetch(it.url, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var art = extractArticle(doc, it.url);
        if (!art || clean(art.body.textContent).length < 200) throw new Error('no article body');
        if (art.title) h.textContent = art.title;
        body.innerHTML = '';
        body.appendChild(art.body);
      })
      .catch(function () {
        close();
        window.location.href = it.url;
      });
  }

  function extractArticle(doc, base) {
    var sel = ['[itemprop="articleBody"]', '.article-body', '.co_body #ContentBody', '#co_content_container .co_body', '#ContentBody'];
    var src = null;
    for (var i = 0; i < sel.length; i++) {
      var n = doc.querySelector(sel[i]);
      if (n && clean(n.textContent).length > 200) { src = n; break; }
    }
    if (!src) return null;
    var titleEl = doc.querySelector('.article-header__title,h1');
    var out = document.createElement('div');
    out.innerHTML = src.innerHTML;
    var kill = out.querySelectorAll('script,style,link,meta,noscript,form,input,button,select,textarea,object,embed,.page-tools,.co_comments,#comments');
    for (var k = kill.length - 1; k >= 0; k--) kill[k].parentNode.removeChild(kill[k]);
    var frames = out.querySelectorAll('iframe');
    for (var f = frames.length - 1; f >= 0; f--) {
      var fs = frames[f].getAttribute('src') || '';
      if (!/^https:\/\/([a-z0-9-]+\.)*(chabad\.org|youtube\.com|youtube-nocookie\.com|vimeo\.com|jwplayer\.com)\//i.test(fs)) frames[f].parentNode.removeChild(frames[f]);
    }
    var all = out.querySelectorAll('*');
    for (var a = 0; a < all.length; a++) {
      var node = all[a], attrs = node.attributes;
      for (var b = attrs.length - 1; b >= 0; b--) {
        var nm = attrs[b].name.toLowerCase();
        if (nm.indexOf('on') === 0 || nm === 'style' || nm === 'class' || nm === 'id' || nm === 'width' || nm === 'height') node.removeAttribute(attrs[b].name);
      }
      if (node.tagName === 'A') {
        var hr = node.getAttribute('href') || '';
        if (/^\s*javascript:/i.test(hr)) node.removeAttribute('href');
        else if (hr) { try { node.setAttribute('href', new URL(hr, base).href); } catch (e) {} node.setAttribute('target', '_blank'); node.setAttribute('rel', 'noopener'); }
      }
      if (node.tagName === 'IMG') {
        var s = imgSrc(node, base);
        if (s) { node.setAttribute('src', s); node.setAttribute('loading', 'lazy'); }
        else node.parentNode.removeChild(node);
      }
    }
    return { title: titleEl ? clean(titleEl.textContent) : '', body: out };
  }

  /* ---------- share ---------- */
  function buildShare() {
    var s = el('section', 'cf-share');
    s.id = 'cf-share';
    var w = el('div', 'cf-wrap cf-center');
    w.appendChild(heading('Spread the light', 'Invite your friends', 'Share the festival with your family, friends and neighbors.', true));
    var row = el('div', 'cf-sharebtns');
    var fb = link('cf-btn cf-fb', 'https://www.facebook.com/sharer/sharer.php?' + qs({ u: CFG.SHARE.url }), 'Share on Facebook', true);
    fb.insertBefore(icon('fb'), fb.firstChild);
    fb.addEventListener('click', function (e) {
      if (window.innerWidth < 700) return;
      e.preventDefault();
      window.open(fb.href, 'cf26fb', 'width=620,height=560,noopener');
    });
    var ig = el('button', 'cf-btn cf-ig', 'Share on Instagram');
    ig.type = 'button';
    ig.insertBefore(icon('ig'), ig.firstChild);
    add(row, fb, ig);

    var pop = el('div', 'cf-pop');
    pop.setAttribute('role', 'status');
    var popP = el('p');
    var popBtns = el('div');
    var dl = link('cf-btn cf-gold', CFG.FLYER, 'Download the flyer', true);
    dl.setAttribute('download', 'Chanukah-Festival-2026-Flyer.png');
    dl.insertBefore(icon('dl'), dl.firstChild);
    var follow = link('cf-btn cf-ghost', CFG.SHARE.instagram, 'Open Instagram', true);
    follow.insertBefore(icon('ig'), follow.firstChild);
    add(popBtns, dl, follow);
    add(pop, popP, popBtns);

    ig.addEventListener('click', function () { shareInstagram(pop, popP); });
    add(w, row, pop);
    s.appendChild(w);
    return s;
  }

  function shareInstagram(pop, popP) {
    var data = { title: 'Chanukah Festival 2026', text: T(CFG.SHARE.text), url: CFG.SHARE.url };
    function desktop() {
      copyText(T(CFG.SHARE.text) + ' ' + CFG.SHARE.url).then(function () {
        popP.textContent = 'Invitation copied! Instagram doesn\u2019t allow posting from a computer browser \u2014 download the flyer, post it from your phone, and paste the invitation as your caption.';
      }, function () {
        popP.textContent = 'Instagram doesn\u2019t allow posting from a computer browser \u2014 download the flyer and post it from your phone.';
      });
      pop.className = 'cf-pop open';
    }
    if (!navigator.share) return desktop();
    var flyerUrl = abs(CFG.FLYER);
    var sameOrigin = flyerUrl.indexOf(window.location.origin) === 0 || /^data:/.test(flyerUrl);
    var p = (sameOrigin && window.File && navigator.canShare) ?
      fetch(flyerUrl).then(function (r) { return r.blob(); }).then(function (b) {
        var f = new File([b], 'Chanukah-Festival-2026.png', { type: b.type || 'image/png' });
        return navigator.canShare({ files: [f] }) ? { files: [f], text: data.text + ' ' + data.url } : data;
      }).catch(function () { return data; }) : Promise.resolve(data);
    p.then(function (d) {
      return navigator.share(d);
    }).catch(function (e) {
      if (e && e.name === 'AbortError') return;
      desktop();
    });
  }

  /* ---------- footer ---------- */
  function buildFooter() {
    var f = el('footer', 'cf-foot');
    var w = el('div', 'cf-wrap');
    var l = el('div', 'cf-foot-l');
    var ph = link(null, 'tel:' + CFG.PHONE.replace(/\D/g, ''), CFG.PHONE);
    ph.insertBefore(icon('phone'), ph.firstChild);
    var em = link(null, 'mailto:' + CFG.EMAIL, CFG.EMAIL);
    em.insertBefore(icon('mail'), em.firstChild);
    var ig = link(null, CFG.SHARE.instagram, '@jewishriverside', true);
    ig.insertBefore(icon('ig'), ig.firstChild);
    add(l, ph, em, ig);
    add(w, el('b', null, 'Questions? We\u2019d love to help.'), l,
      link('cf-btn cf-gold', CFG.DONATE_URL, 'Support the festival'),
      el('small', null, CFG.host + ' \u2022 Riverside, CA \u2022 ' + CFG.WEB));
    var back = link(null, 'https://www.jewishriverside.com', '\u2190 Back to ' + CFG.host);
    back.style.display = 'inline-block';
    back.style.marginTop = '10px';
    back.style.fontSize = '.82rem';
    w.appendChild(back);
    f.appendChild(w);
    return f;
  }

  /* ---------- scroll reveal ---------- */
  function reveal() {
    var els = root.querySelectorAll('.cf-reveal');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].className += ' in';
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.className += ' in'; io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  window.CF26 = { version: VERSION, config: CFG, extractGuide: extractGuide, extractArticle: extractArticle };

  /* Start last, after every helper above is defined. Hosted files can arrive after
     the page has finished loading, when readyState is already past 'loading'. */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
