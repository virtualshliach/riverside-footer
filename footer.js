/* Footer loader - jewishriverside.com (Chabad Jewish Community Center, Riverside)
   The ONLY line in this site's ChabadOne footer that points here:
     <script src="https://virtualshliach.github.io/riverside-footer/footer.js"></script>
   This file decides, per page, which project file (if any) to load from this folder.
   To add a project: add an entry to PAGES. To retire one: delete its entry.
   Bump V whenever any project file in this folder changes (forces fresh copies). */
(function () {
  'use strict';
  var SITE = 'riverside-footer';
  var V = '2026-11-12e';

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
    '5333083': { file: 'mailing-list.js' }
  };

  /* domain roots that should load a project without an aid in the URL */
  var HOSTS = {
    'chanukahfestival.org': '4949424',
    /* the festival's own ChabadOne site until its DNS moves to chanukahfestival.org */
    '12899.centers.clhosting.org': '4949424'
  };

  /* Google Analytics 4 for the pages listed above. OFF until a measurement ID is filled in
     (format G-XXXXXXXXXX, from the GA4 property Rabbi Fuss chooses). Project files already send
     share_click / cta_click events through window.gtag; with this empty they send nothing. */
  var GA4_ID = '';

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
    return null;
  }

  /* Short links on the festival's own site: chanukahfestival.org/guess, /menorah, /donate.
     ChabadOne has no such pages, so they reach its "Page Not Found" page with the address kept;
     send them to the festival page, which opens the matching form (?guess, ?menorah, ?donate). */
  var SHORT = { guess: 'guess', guest: 'guess', menorah: 'menorah', donate: 'donate' };
  var sm = /^\/([a-z]+)\/?$/i.exec(window.location.pathname);
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

  /* Volunteer sign-up, a hidden page for community emails only (not in any menu or the sitemap):
     chanukahfestival.org/volunteer (reaches ChabadOne's "Page Not Found" page with the address kept)
     and, as a backup, chanukahfestival.org/?volunteer. Loads volunteer-2026.js instead of any page project. */
  var VOLUNTEER = { file: 'volunteer-2026.js', cover: '#0A5769', coverId: 'vf26-cover' };
  var isVolunteer = !!HOSTS[sh] && (/^\/volunteer\/?$/i.test(window.location.pathname) ||
    ((window.location.pathname === '/' || window.location.pathname === '') && /[?&]volunteer(?:[=&]|$)/i.test(window.location.search)));

  var aid = isVolunteer ? 'volunteer' : findAid();

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

  var page = isVolunteer ? VOLUNTEER : aid && Object.prototype.hasOwnProperty.call(PAGES, aid) ? PAGES[aid] : null;
  if (!page) return;
  if (isResponse && !page.onResponse) return;
  if (!/^[a-z0-9][a-z0-9-]*\.js$/.test(page.file)) return;

  var coverId = page.coverId || 'fc-cover';
  if (page.cover && !isResponse && !document.getElementById(coverId)) {
    var c = document.createElement('div');
    c.id = coverId;
    c.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147481000;background:' + page.cover);
    (document.body || document.documentElement).appendChild(c);
    setTimeout(uncover, 8000);
  }
  function uncover() {
    var el = document.getElementById(coverId);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  if (/^G-[A-Z0-9]{4,}$/.test(GA4_ID) && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    var gcfg = { page_title: document.title, anonymize_ip: true };
    /* short share links (?s=whatsapp-contest) count as the share campaign */
    var sm = /[?&]s=([a-z]+)(?:-([a-z0-9]+))?(?:&|$)/.exec(window.location.search);
    if (sm) { gcfg.campaign_source = sm[1]; gcfg.campaign_medium = 'share'; gcfg.campaign_name = 'chanukah2026'; gcfg.campaign_content = sm[2] || 'festival'; }
    window.gtag('config', GA4_ID, gcfg);
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    (document.head || document.documentElement).appendChild(ga);
  }

  load(page.file);
  if (window.console) console.log('[' + SITE + '] ' + V + ' aid ' + aid + ' -> ' + page.file);
})();
