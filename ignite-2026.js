/* Ignite Riverside - year-end campaign MOCKUP, page 7621668. Loaded by footer.js.
   Shows the client-review mockup (ignite/index.html, dummy data, no payments) full screen
   over the ChabadOne page. Replace with the real campaign build before launch. */
(function () {
  'use strict';
  var AID = '7621668';
  if (window.location.href.indexOf(AID) < 0) return;
  if (window.location.href.indexOf('ArticleCcoResponse') > -1) return;

  function base() {
    var me = document.currentScript && document.currentScript.src;
    if (!me) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (all[i].src.indexOf('/riverside-footer/ignite-2026.js') > -1) { me = all[i].src; break; }
      }
    }
    return me ? me.split('?')[0].replace(/[^\/]+$/, '') : 'https://virtualshliach.github.io/riverside-footer/';
  }
  var BASE = base();
  var VQ = (document.currentScript && document.currentScript.src.split('?')[1]) || '';

  function boot() {
    if (document.getElementById('ig26-frame')) return;
    var f = document.createElement('iframe');
    f.id = 'ig26-frame';
    f.title = 'Ignite Riverside';
    f.src = BASE + 'ignite/index.html' + (VQ ? '?' + VQ : '');
    f.setAttribute('allow', 'clipboard-write');
    f.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:100%;border:0;margin:0;padding:0;z-index:2147482000;background:#042a34');
    f.onload = function () {
      var c = document.getElementById('ig26-cover');
      if (c && c.parentNode) c.parentNode.removeChild(c);
    };
    (document.body || document.documentElement).appendChild(f);
    document.documentElement.style.overflow = 'hidden';
    if (document.body) document.body.style.overflow = 'hidden';
    document.title = 'Ignite Riverside - Chabad Jewish Community Center of Riverside';
    if (window.console) console.log('[riverside-footer] ignite-2026 mockup on ' + AID);
  }
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
