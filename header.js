/* riverside-footer: header.js
   Loaded from the ChabadOne HEADER (one line, never changes):
     <script src="https://virtualshliach.github.io/riverside-footer/header.js"></script>
   It runs before the page is drawn. On pages with a custom design it hides the original
   page (shows only the background color) until the design is ready, so visitors never see
   the old page flash first. The design file removes the cover by its id when it's done.
   KEEP IN SYNC with footer.js: every PAGES entry that has a `cover` must be listed here with
   the same coverId and color, and HOSTS must match. (tools/test.js checks this.) */
(function () {
  var COVERS = {
    '7457011': { coverId: 'hh26-cover', cover: '#F5EBDF', onResponse: true },   /* Sukkot & Simchat Torah (was the HH 5787 preboot in the header) */
    '4949424': { coverId: 'cf26-cover', cover: '#0f2936' },   /* Chanukah Festival 2026 (live) */
    '7553387': { coverId: 'cf26-cover', cover: '#0f2936' }    /* Chanukah Festival 2026 (draft page) */
  };
  var HOSTS = { 'chanukahfestival.org': '4949424', '12899.centers.clhosting.org': '4949424' };

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

  /* Volunteer sign-up (hidden page): chanukahfestival.org/volunteer and /?volunteer. Hide the
     "Page Not Found" (or festival) page until volunteer-2026.js draws the form. Same as footer.js. */
  if (HOSTS[sh] && (/^\/volunteer\/?$/i.test(window.location.pathname) ||
      ((window.location.pathname === '/' || window.location.pathname === '') && /[?&]volunteer(?:[=&]|$)/i.test(window.location.search)))) {
    if (!document.getElementById('vf26-cover')) {
      var vs = document.createElement('style');
      vs.id = 'vf26-cover';
      vs.textContent = 'html{background:#0A5769 !important}body{opacity:0 !important}';
      (document.head || document.documentElement).appendChild(vs);
      setTimeout(function () { if (vs.parentNode) vs.parentNode.removeChild(vs); }, 8000);
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
