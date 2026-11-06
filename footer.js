/* Footer loader - jewishriverside.com (Chabad Jewish Community Center, Riverside)
   The ONLY line in this site's ChabadOne footer that points here:
     <script src="https://virtualshliach.github.io/riverside-footer/footer.js"></script>
   This file decides, per page, which project file (if any) to load from this folder.
   To add a project: add an entry to PAGES. To retire one: delete its entry.
   Bump V whenever any project file in this folder changes (forces fresh copies). */
(function () {
  'use strict';
  var SITE = 'riverside-footer';
  var V = '2026-11-06f';

  /* page id (aid) -> project. file: name in this folder.
     cover: background color to hold the page while the project loads (optional).
     onResponse: also load on the form's thank-you (response) page (optional). */
  var PAGES = {
    /* Sukkot & Simchat Torah 5787. Holiday is over; stays on so the page keeps its design.
       onResponse: it also shows the confirmation on the form's thank-you page. */
    '7457011': { file: 'sukkot-5787.js', cover: '#F5EBDF', coverId: 'hh26-cover', onResponse: true },
    /* Chanukah Festival 2026 - DRAFT page. At go-live move to '4949424'. */
    '7553387': { file: 'chanukah-2026.js', cover: '#0f2936', coverId: 'cf26-cover' },
    /* Kids Menorah Contest 2026 registration (hidden page): festival hero + restyled form, and the thank-you page. */
    '7606745': { file: 'menorah-contest-2026.js', onResponse: true },
    /* Dreidel Guessing Contest (JewishRiverside.com/Guess, booth banner QR). Form + thank-you page. */
    '5738793': { file: 'dreidel-2026.js', onResponse: true }
  };

  /* domain roots that should load a project without an aid in the URL */
  var HOSTS = {
    /* 'chanukahfestival.org': '4949424' */
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

  var aid = findAid();
  var page = aid && Object.prototype.hasOwnProperty.call(PAGES, aid) ? PAGES[aid] : null;
  if (!page) return;
  if (isResponse && !page.onResponse) return;
  if (!/^[a-z0-9][a-z0-9-]*\.js$/.test(page.file)) return;

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
    window.gtag('config', GA4_ID, { page_title: document.title, anonymize_ip: true });
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    (document.head || document.documentElement).appendChild(ga);
  }

  var s = document.createElement('script');
  s.src = base + page.file + '?v=' + V;
  s.onerror = function () {
    uncover();
    if (window.console) console.error('[' + SITE + '] could not load ' + page.file);
  };
  (document.head || document.documentElement).appendChild(s);
  if (window.console) console.log('[' + SITE + '] ' + V + ' aid ' + aid + ' -> ' + page.file);
})();
