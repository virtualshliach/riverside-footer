/* riverside-footer: header.js
   Loaded from the ChabadOne HEADER (one line, never changes):
     <script src="https://virtualshliach.github.io/riverside-footer/header.js"></script>
   It runs before the page is drawn. On pages with a custom design it hides the original
   page (shows only the background color) until the design is ready, so visitors never see
   the old page flash first. The design file removes the cover by its id when it's done.
   KEEP IN SYNC with footer.js: every PAGES entry that has a `cover` must be listed here with
   the same coverId and color, and HOSTS and PATHS must match. (tools/test.js checks this.) */
(function () {
  var COVERS = {
    '7457011': { coverId: 'hh26-cover', cover: '#F5EBDF', onResponse: true },   /* Sukkot & Simchat Torah (was the HH 5787 preboot in the header) */
    '4949424': { coverId: 'cf26-cover', cover: '#0f2936' },   /* Chanukah Festival 2026 (live) */
    '7553387': { coverId: 'cf26-cover', cover: '#0f2936' },   /* Chanukah Festival 2026 (draft page) */
    '7621668': { coverId: 'ig26-cover', cover: '#042a34' },   /* Ignite Riverside year-end campaign mockup */
    '7643000': { coverId: 'dn26-cover', cover: '#ffffff' },   /* Donate 2.0 (also jewishriverside.com/donation, see PATHS) */
    '7642564': { coverId: 'dn26-cover', cover: '#ffffff' }    /* 2026 Matching Campaign Give Now (same donate form) */
  };
  var HOSTS = { 'chanukahfestival.org': '4949424', '12899.centers.clhosting.org': '4949424' };
  /* ChabadOne short addresses on jewishriverside.com that show a page without its id in the address.
     Also matched with /designation/x, /fund/x or /payment_intent/... after them (ChabadOne turns ?a=b into /a/b). */
  var PATHS = { '/donation': '7643000' };
  /* Old links: /donate as Donate 2.0, only once /donate is pointed at /donation (REDIRECT-PLAN.md). Same flag in donate-2026.js and footer.js.
     Here it only puts up the white cover. Never turn it on while /donate still shows the old form page, or that page
     sits covered until the 8-second safety drops the cover. */
  var REDIRECT_READY = false;
  if (REDIRECT_READY) PATHS['/donate'] = '7643000';

  /* The bare chanukahfestival.org homepage is forwarded by the domain settings to jewishriverside.com's
     "Page Not Found" page (tagged utm_campaign=chanukahfestival.org). Until that forwarding is fixed at
     ChabadOne, send those visitors straight to the festival page. */
  if (/(^|\.)jewishriverside\.com$/i.test(window.location.hostname) && /utm_campaign=chanukahfestival\.org/i.test(window.location.hash + window.location.search)) {
    window.location.replace('https://www.chanukahfestival.org/?home');
    return;
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

  var qpath = (window.location.pathname === '/' || window.location.pathname === '');
  /* Hidden SMS share page: chanukahfestival.org/?text. Hide the festival page until
     text-share-2026.js draws the fallback. Same as footer.js. */
  if (HOSTS[sh] && qpath && /[?&]text(?:[=&]|$)/i.test(window.location.search)) {
    if (!document.getElementById('ts26-cover')) {
      var ts = document.createElement('style');
      ts.id = 'ts26-cover';
      ts.textContent = 'html{background:#0A5769 !important}body{opacity:0 !important}';
      (document.head || document.documentElement).appendChild(ts);
      setTimeout(function () { if (ts.parentNode) ts.parentNode.removeChild(ts); }, 8000);
    }
    return;
  }

  var l = window.location;
  var isResponse = /ArticleCcoResponse/i.test(l.href);
  var m = /\/aid\/(\d+)/i.exec(l.pathname) || /\baid=(\d+)/i.exec(l.search);
  var aid = m ? m[1] : null;
  if (!aid && (l.pathname === '/' || l.pathname === '')) {
    aid = HOSTS[l.hostname.toLowerCase().replace(/^www\./, '')] || null;
  }
  if (!aid && /(^|\.)jewishriverside\.com$/i.test(l.hostname)) {
    var pm = /^(\/[a-z0-9-]+)(?:\/(?:designation|fund|payment_intent)\/.*)?\/?$/i.exec(l.pathname);
    var pk = pm ? pm[1].toLowerCase() : '';
    if (pk && Object.prototype.hasOwnProperty.call(PATHS, pk)) aid = PATHS[pk];
  }
  /* The Donate page loads a hidden copy of itself (#cf-sync) to send each gift to ChabadOne.
     That copy is never drawn, so it is never covered. */
  if (/cf-sync/.test(l.hash)) return;
  var p = aid && Object.prototype.hasOwnProperty.call(COVERS, aid) ? COVERS[aid] : null;
  if (!p || document.getElementById(p.coverId)) return;
  if (isResponse && !p.onResponse) return;
  var s = document.createElement('style');
  s.id = p.coverId;
  s.textContent = 'html{background:' + p.cover + ' !important}body{opacity:0 !important}';
  (document.head || document.documentElement).appendChild(s);
  /* safety net: never leave the page hidden if the design fails to load */
  setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 8000);
})();
