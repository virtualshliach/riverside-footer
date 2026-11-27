/* Footer loader - jewishriverside.com (Chabad Jewish Community Center, Riverside)
   The ONLY line in this site's ChabadOne footer that points here:
     <script src="https://virtualshliach.github.io/riverside-footer/footer.js"></script>
   This file decides, per page, which project file (if any) to load from this folder.
   To add a project: add an entry to PAGES. To retire one: delete its entry.
   Bump V whenever any project file in this folder changes (forces fresh copies). */
(function () {
  'use strict';
  var SITE = 'riverside-footer';
  var V = '2026-11-26j';

  /* page id (aid) -> project. file: name in this folder.
     cover: background color to hold the page while the project loads (optional).
     onResponse: also load on the form's thank-you (response) page (optional). */
  var PAGES = {
    /* Sukkot & Simchat Torah 5787. Holiday is over; stays on so the page keeps its design.
       onResponse: it also shows the confirmation on the form's thank-you page. */
    '7457011': { file: 'sukkot-5787.js', cover: '#F5EBDF', coverId: 'hh26-cover', onResponse: true },
    /* Chanukah Festival 2026 - LIVE page, everyone sees it (chanukah-2026.js). */
    '4949424': { file: 'chanukah-2026.js', cover: '#0f2936', coverId: 'cf26-cover' },
    /* Chanukah Festival 2026 - DRAFT page, for reviewing changes before they go live (chanukah-2026-draft.js). */
    '7553387': { file: 'chanukah-2026-draft.js', cover: '#0f2936', coverId: 'cf26-cover' },
    /* Menorah Contest 2026 (all ages) registration (hidden page): festival hero + restyled form, and the thank-you page. */
    '7606745': { file: 'menorah-contest-2026.js', onResponse: true },
    /* Dreidel Guessing Contest (JewishRiverside.com/Guess, booth banner QR). Form + thank-you page. */
    '5738793': { file: 'dreidel-2026.js', onResponse: true },
    /* Join Our Mailing List form: California as the default state. */
    '5333083': { file: 'mailing-list.js' },
    /* Ignite Riverside year-end campaign - client-review MOCKUP (dummy data, no payments). */
    '7621668': { file: 'ignite-2026.js', cover: '#042a34', coverId: 'ig26-cover' },
    /* Donate page ("Donate 2.0", also jewishriverside.com/donation): step-by-step Stripe donate form;
       each gift is also sent to the page's ChabadOne form. White cover: no flash of the old page. */
    '7643000': { file: 'donate-2026.js', cover: '#ffffff', coverId: 'dn26-cover' },
    /* 2026 Matching Campaign "Give Now" (hidden page): the same donate form, preset to "Annual Matching Campaign".
       No ChabadOne form of its own; gifts go to the Donate 2.0 page's ChabadOne form. */
    '7642564': { file: 'donate-2026.js', cover: '#ffffff', coverId: 'dn26-cover' }
  };

  /* domain roots that should load a project without an aid in the URL */
  var HOSTS = {
    'chanukahfestival.org': '4949424',
    /* the festival's own ChabadOne site until its DNS moves to chanukahfestival.org */
    '12899.centers.clhosting.org': '4949424'
  };

  /* ChabadOne short addresses on jewishriverside.com that show a page without its id in the address
     (same list as header.js). Also matched with /designation/x, /fund/x or /payment_intent/... after them. */
  var PATHS = { '/donation': '7643000' };

  /* Google Analytics 4 for the pages listed above. ON
     (GA4 property "Chanukah Festival", set up Nov 18 2026). Project files send
     share_click / cta_click events through window.gtag. */
  var GA4_ID = 'G-7T1ZM87VNH';

  var href = window.location.href;
  var isResponse = href.indexOf('ArticleCcoResponse') > -1;

  function findAid() {
    var m = /\/aid\/(\d+)(?:[\/.]|$)/i.exec(window.location.pathname) ||
            /[?&]aid=(\d+)(?:&|$)/i.exec(window.location.search);
    if (m) return m[1];
    var host = (window.location.hostname || '').toLowerCase().replace(/^www\./, '');
    var path = window.location.pathname;
    if (HOSTS[host] && (path === '/' || path === '')) return HOSTS[host];
    if (window.Co && window.Co.ArticleId) return String(window.Co.ArticleId);
    /* ChabadOne's own page id comes first; the short-address list is the backup */
    if (/(^|\.)jewishriverside\.com$/.test(host)) {
      var pm = /^(\/[a-z0-9-]+)(?:\/(?:designation|fund|payment_intent)\/.*)?\/?$/i.exec(path);
      var pk = pm ? pm[1].toLowerCase() : '';
      if (pk && Object.prototype.hasOwnProperty.call(PATHS, pk)) return PATHS[pk];
    }
    return null;
  }

  /* Short links on the festival's own site: chanukahfestival.org/guess, /dreidel, /menorah, /menorah-contest, /donate.
     ChabadOne has no such pages, so they reach its "Page Not Found" page with the address kept;
     send them to the festival page, which opens the matching form (?guess, ?menorah, ?donate). */
  var SHORT = { guess: 'guess', guest: 'guess', dreidel: 'guess', menorah: 'menorah', 'menorah-contest': 'menorah', donate: 'donate', support: 'donate', volunteer: 'volunteer' };
  var sm = /^\/([a-z-]+)\/?$/i.exec(window.location.pathname);
  var sh = (window.location.hostname || '').toLowerCase().replace(/^www\./, '');
  if (sm && HOSTS[sh] && Object.prototype.hasOwnProperty.call(SHORT, sm[1].toLowerCase())) {
    window.location.replace(window.location.protocol + '//' + window.location.host + '/?' + SHORT[sm[1].toLowerCase()]);
    return;
  }
  /* ChabadOne answers /donate itself, by sending visitors to the site's built-in Donate page
     (/templates/donate_cdo/...). On the festival's site, that page and the old ChabadOne Donate
     article (4194665) both go on to the festival's own Donate pop-up instead. Not inside a frame (the pop-up's backup shows that page). */
  var onTop = false;
  try { onTop = window.self === window.top; } catch (e) {}
  if (onTop && HOSTS[sh] && (/\/aid\/4194665(?:[\/.]|$)/i.test(window.location.pathname) || /\baid=4194665\b/i.test(window.location.search) || /\/templates\/donate_cdo\//i.test(window.location.pathname))) {
    window.location.replace(window.location.protocol + '//' + window.location.host + '/?donate');
    return;
  }

  /* Volunteer sign-up: chanukahfestival.org/volunteer is sent to /?volunteer (SHORT above), where the
     festival page opens the volunteer form (festival-forms.js) in a pop-up, like the other forms. */

  /* Hidden SMS share page for festival emails (Gmail on Android strips sms: links):
     chanukahfestival.org/?text. Loads text-share-2026.js instead of the festival page. */
  var TEXT = { file: 'text-share-2026.js', cover: '#0A5769', coverId: 'ts26-cover' };
  var isText = !!HOSTS[sh] &&
    (window.location.pathname === '/' || window.location.pathname === '') && /[?&]text(?:[=&]|$)/i.test(window.location.search);

  var aid = isText ? 'text' : findAid();

  /* Only ever load from this loader's own folder. */
  var me = document.currentScript && document.currentScript.src;
  if (!me) {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      if (all[i].src.indexOf('/' + SITE + '/footer.js') > -1) { me = all[i].src; break; }
    }
  }
  if (!me) return;
  var base = me.split('?')[0].replace(/[^\/]+$/, '');

  function load(file) {
    if (!/^[a-z0-9][a-z0-9-]*\.js$/.test(file)) return;
    var sc = document.createElement('script');
    sc.src = base + file + '?v=' + V;
    sc.onerror = function () {
      uncover();
      if (window.console) console.error('[' + SITE + '] could not load ' + file);
    };
    (document.head || document.documentElement).appendChild(sc);
  }

  /* Forms shown inside the festival's pop-up (an iframe on the festival page, on this site or on
     chanukahfestival.org). In that frame, embed.js shows just the form. Only these pages. */
  var EMBED = { '4194665': 'donate', '7606745': 'contest', '5333083': 'mailing' };
  var framed = false;
  try { framed = window.self !== window.top; } catch (e) { framed = true; }
  if (framed && aid && Object.prototype.hasOwnProperty.call(EMBED, aid)) {
    var flag = /cf-embed/.test(window.location.hash);
    try {
      if (flag) sessionStorage.setItem('cf26-embed', '1');
      else flag = sessionStorage.getItem('cf26-embed') === '1';
    } catch (e) {}
    if (flag) load('embed.js');
  }

  var page = isText ? TEXT : aid && Object.prototype.hasOwnProperty.call(PAGES, aid) ? PAGES[aid] : null;
  /* nothing to draw here: if header.js covered this page anyway (for example a short address that turned out
     to be another page), take its cover off now instead of after 8 seconds */
  if (!page || (isResponse && !page.onResponse)) {
    var ids = {};
    ids[TEXT.coverId] = 1;
    for (var pk2 in PAGES) if (PAGES[pk2].coverId) ids[PAGES[pk2].coverId] = 1;
    for (var cid in ids) { var ce; while ((ce = document.getElementById(cid)) && ce.parentNode) ce.parentNode.removeChild(ce); }
  }
  if (!page) return;
  if (isResponse && !page.onResponse) return;
  if (!/^[a-z0-9][a-z0-9-]*\.js$/.test(page.file)) return;

  /* the Donate page's hidden copy of itself (#cf-sync, in a frame) is never drawn: no cover there */
  var syncCopy = framed && /cf-sync/.test(window.location.hash);
  var coverId = page.coverId || 'fc-cover';
  if (page.cover && !isResponse && !syncCopy && !document.getElementById(coverId)) {
    var c = document.createElement('div');
    c.id = coverId;
    c.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147481000;background:' + page.cover);
    (document.body || document.documentElement).appendChild(c);
    setTimeout(uncover, 8000);
  }
  function uncover() {
    /* header.js's <style> and this file's <div> can share the id: remove every one */
    var el;
    while ((el = document.getElementById(coverId)) && el.parentNode) el.parentNode.removeChild(el);
  }

  /* ChabadOne pages already run their own Google tag (another GA4 ID). Ours is added next to it:
     one gtag.js handles several IDs, and events without send_to go to every configured ID. */
  if (/^G-[A-Z0-9]{4,}$/.test(GA4_ID) && !window.CF26_GA4) {
    window.CF26_GA4 = GA4_ID;
    var hadTag = typeof window.gtag === 'function';
    window.dataLayer = window.dataLayer || [];
    if (!hadTag) {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
    }
    var gcfg = { page_title: document.title, anonymize_ip: true };
    /* share links count as the share campaign. Shortest form (Nov 16): ?wt = app + place
       (app: t Text, w WhatsApp, e Email, g Gmail, f Facebook, i Instagram, c Copy, a More apps;
       place: none festival page, t top of it, c Menorah Contest thank-you, d Dreidel thank-you).
       Older links (?s=whatsapp-top) still count. */
    var SHARE_APP = { t: 'sms', w: 'whatsapp', e: 'email', g: 'gmail', f: 'facebook', i: 'instagram', c: 'copy', a: 'native' };
    var SHARE_PLACE = { '': 'festival', t: 'top', c: 'contest', d: 'dreidel' };
    var sm = /[?&]s=([a-z]+)(?:-([a-z0-9]+))?(?:&|$)/.exec(window.location.search);
    var sk = /^\?([a-z])([a-z]?)(?:&|$)/.exec(window.location.search);
    if (!sm && sk && SHARE_APP[sk[1]] && SHARE_PLACE[sk[2]]) sm = [sk[0], SHARE_APP[sk[1]], SHARE_PLACE[sk[2]] === 'festival' ? '' : SHARE_PLACE[sk[2]]];
    if (sm) { gcfg.campaign_source = sm[1]; gcfg.campaign_medium = 'share'; gcfg.campaign_name = 'chanukah2026'; gcfg.campaign_content = sm[2] || 'festival'; }
    window.gtag('config', GA4_ID, gcfg);
    var gtagLoaded = [].some.call(document.scripts, function (sc) { return /googletagmanager\.com\/gtag\/js/.test(sc.src || ''); });
    if (!gtagLoaded) {
      var ga = document.createElement('script');
      ga.async = true;
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
      (document.head || document.documentElement).appendChild(ga);
    }
  }

  load(page.file);
  if (window.console) console.log('[' + SITE + '] ' + V + ' aid ' + aid + ' -> ' + page.file);
})();
