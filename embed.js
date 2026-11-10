/* riverside-footer: embed.js
   Runs on a jewishriverside.com form page ONLY when that page is shown inside the Chanukah
   Festival's form pop-up (an iframe opened with #cf-embed; footer.js decides). Pages: Donate
   4194665, Menorah Contest 7606745, Mailing list 5333083, and their thank-you pages.

   It shows just the form (or the thank-you message) in the festival's style, hides the site's
   header, menus and footer around it, opens ordinary links in a new tab, and tells the festival
   page how tall the content is and when the form has been sent.

   The ChabadOne form itself is never moved and never display:none: only the things around it are
   hidden, and the form keeps every field, condition, reCAPTCHA and its own submit. */
(function () {
  'use strict';

  var VERSION = 'embed-2026-11-09d';
  if (window.CF26_EMBED) return;
  window.CF26_EMBED = VERSION;

  var NAVY = '#0f2936', TEAL = '#0e7f80', GOLD = '#ebbe4d', INK = '#1d2b30', LINE = '#d9d2c3';
  var isResponse = window.location.href.indexOf('ArticleCcoResponse') > -1;

  /* ---- style ---- */
  var css = [
    'html.cf-embed,html.cf-embed body{background:#fff !important;margin:0 !important;padding:0 !important;min-width:0 !important;overflow-x:hidden !important}',
    'html.cf-embed body{font-family:Montserrat,"Helvetica Neue",Arial,sans-serif !important;color:' + INK + '}',
    /* site chrome around the form */
    'html.cf-embed .cco_templateless_template,html.cf-embed #PrintCreditHeader,html.cf-embed #header,html.cf-embed #footer,' +
      'html.cf-embed .page-tools-sidebar,html.cf-embed [id^="gb-widget"],html.cf-embed #mc26-hero,' +
      'html.cf-embed .article-header,html.cf-embed h1.article-header__title{display:none !important}',
    'html.cf-embed .cf-embed-off{display:none !important}',
    /* let the content use the frame's full width */
    'html.cf-embed .cf-embed-path{width:auto !important;max-width:none !important;min-width:0 !important;margin:0 !important;padding:0 !important;float:none !important;border:0 !important;box-shadow:none !important;background:transparent !important;position:static !important;left:auto !important}',
    'html.cf-embed #formContainer,html.cf-embed .form-all{width:auto !important;max-width:none !important;margin:0 !important;padding:0 !important;box-shadow:none !important;background:transparent !important}',
    'html.cf-embed .cf-embed-keep,html.cf-embed #formContainer.cf-embed-keep{padding:18px 22px 26px !important;box-sizing:border-box !important}',
    /* fields */
    'html.cf-embed .userform-form,html.cf-embed .userform-form label,html.cf-embed .userform-form .form-label,html.cf-embed .userform-form .form-sub-label,html.cf-embed .userform-form td,html.cf-embed .userform-form span{font-family:Montserrat,"Helvetica Neue",Arial,sans-serif !important}',
    'html.cf-embed .userform-form{font-size:15px !important}',
    'html.cf-embed .userform-form .form-line{padding:8px 0 !important;margin:0 !important}',
    'html.cf-embed .userform-form .form-label{color:' + NAVY + ' !important;font-weight:700 !important;font-size:14px !important}',
    'html.cf-embed .userform-form input[type=text],html.cf-embed .userform-form input[type=email],html.cf-embed .userform-form input[type=tel],' +
      'html.cf-embed .userform-form input[type=number],html.cf-embed .userform-form select,html.cf-embed .userform-form textarea{' +
      'border:1.5px solid ' + LINE + ' !important;border-radius:10px !important;padding:9px 11px !important;font-size:16px !important;' +
      'font-family:inherit !important;color:' + INK + ' !important;background:#fff !important;box-shadow:none !important;max-width:100% !important;box-sizing:border-box !important;height:auto !important}',
    'html.cf-embed .userform-form input:focus,html.cf-embed .userform-form select:focus,html.cf-embed .userform-form textarea:focus{border-color:' + TEAL + ' !important;outline:2px solid rgba(14,127,128,.18) !important}',
    'html.cf-embed .userform-form .form-sub-label{color:#6b7b80 !important;font-size:12px !important}',
    'html.cf-embed .userform-form .form-required{color:#c2410c !important}',
    'html.cf-embed .userform-form .form-submit-button,html.cf-embed .userform-form button[type=submit],html.cf-embed .userform-form input[type=submit]{' +
      'background:' + GOLD + ' !important;color:' + NAVY + ' !important;border:0 !important;border-radius:999px !important;padding:14px 34px !important;' +
      'font:700 17px Montserrat,"Helvetica Neue",Arial,sans-serif !important;cursor:pointer !important;box-shadow:0 6px 18px rgba(235,190,77,.35) !important;text-shadow:none !important;height:auto !important;width:auto !important}',
    'html.cf-embed .userform-form .form-submit-button:hover{filter:brightness(1.05)}',
    'html.cf-embed .form-validation-error input,html.cf-embed input.form-validation-error,html.cf-embed select.form-validation-error{border-color:#c2410c !important}',
    'html.cf-embed .cf-embed-alt{margin:6px 0 0;font-size:13px;color:#5a6a70}',
    'html.cf-embed .cf-embed-alt a{color:' + TEAL + ';font-weight:700}',
    /* phones: label above field */
    '@media (max-width:640px){html.cf-embed .userform-form .form-label-left,html.cf-embed .userform-form .form-label-right{width:auto !important;float:none !important;display:block !important;text-align:left !important;margin-bottom:4px !important}' +
      'html.cf-embed .userform-form .form-input,html.cf-embed .userform-form .form-input-wide{margin-left:0 !important;width:auto !important;display:block !important}' +
      'html.cf-embed .userform-form .form-line{display:block !important}}'
  ].join('\n');

  function addStyle() {
    if (document.getElementById('cf-embed-style')) return;
    var st = document.createElement('style');
    st.id = 'cf-embed-style';
    st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
    if (!document.getElementById('cf26-fonts') && !document.getElementById('mc26-fonts')) {
      var l = document.createElement('link');
      l.id = 'cf26-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700' + String.fromCharCode(38) + 'display=swap';
      (document.head || document.documentElement).appendChild(l);
    }
  }
  document.documentElement.className += ' cf-embed';
  addStyle();

  /* ---- keep only the form (or the thank-you message) ---- */
  function keepNode() {
    return document.getElementById('mc26') ||            /* Menorah Contest designed thank-you card */
      document.getElementById('formContainer') ||          /* the ChabadOne form */
      document.getElementById('co_content_container') ||  /* a plain thank-you message */
      document.querySelector('article') || null;
  }
  function isOverlay(n) {
    /* reCAPTCHA puts its challenge in a div at the end of <body>; never hide it */
    return n.querySelector && (n.querySelector('iframe[src*="recaptcha"]') || n.querySelector('iframe[title*="recaptcha" i]'));
  }
  var kept = null;
  function hideBar() {
    /* the "Back to ..." bar carries inline !important styles, so CSS alone can't hide it (not a form) */
    [].forEach.call(document.querySelectorAll('.cco_templateless_template'), function (e) {
      if (e.style.getPropertyValue('display') !== 'none') e.style.setProperty('display', 'none', 'important');
    });
  }
  function isolate() {
    hideBar();
    var keep = keepNode();
    if (!keep || keep === kept) return !!keep;
    [].forEach.call(document.querySelectorAll('.cf-embed-path,.cf-embed-off,.cf-embed-keep'), function (n) {
      n.classList.remove('cf-embed-path', 'cf-embed-off', 'cf-embed-keep');
    });
    keep.classList.add('cf-embed-keep');
    var n = keep;
    while (n && n !== document.body && n.parentNode) {
      [].forEach.call(n.parentNode.children, function (sib) {
        if (sib === n) return;
        var t = sib.tagName;
        if (t === 'SCRIPT' || t === 'STYLE' || t === 'LINK' || t === 'NOSCRIPT') return;
        if (sib.querySelector && sib.querySelector('form.userform-form')) return; /* never hide a form */
        if (isOverlay(sib)) return;
        sib.classList.add('cf-embed-off');
      });
      if (n !== keep) n.classList.add('cf-embed-path');
      /* safety: nothing that holds the form may end up hidden by the page's own styles or ours */
      if (window.getComputedStyle(n).display === 'none') n.style.setProperty('display', 'block', 'important');
      n = n.parentNode;
    }
    kept = keep;
    return true;
  }

  /* PayPal can't open inside a pop-up frame: offer the full page for it */
  function paypalNote() {
    var pp = document.querySelector('.userform-form input[id$="_paypal"]');
    if (!pp || document.getElementById('cf-embed-pp')) return;
    var line = pp.closest('.form-line') || pp.parentNode;
    var p = document.createElement('p');
    p.id = 'cf-embed-pp';
    p.className = 'cf-embed-alt';
    p.appendChild(document.createTextNode('Paying with PayPal? '));
    var a = document.createElement('a');
    a.href = window.location.href.split('#')[0];
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Open the donate page in a new tab';
    p.appendChild(a);
    line.appendChild(p);
    pp.addEventListener('change', function () { if (pp.checked) p.style.fontWeight = '700'; });
  }

  /* ordinary links leave the pop-up in a new tab (forms are untouched) */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (!h || h.charAt(0) === '#' || /^(javascript|mailto|tel|sms):/i.test(h)) return;
    if (!a.target || a.target === '_self' || a.target === '_top' || a.target === '_parent') {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  }, true);

  /* ---- talk to the festival page ---- */
  var PARENTS = /^https:\/\/(www\.)?(jewishriverside\.com|chanukahfestival\.org|12899\.centers\.clhosting\.org)$/i;
  function parentOrigin() {
    try {
      var ao = window.location.ancestorOrigins;
      if (ao && ao.length && PARENTS.test(ao[0])) return ao[0];
    } catch (e) {}
    try {
      var r = document.referrer && new URL(document.referrer).origin;
      if (r && PARENTS.test(r)) return r;
    } catch (e) {}
    return null;
  }
  var target = parentOrigin();
  function send(msg) {
    if (!target || !window.parent || window.parent === window) return;
    msg.cf26 = 'embed';
    try { window.parent.postMessage(msg, target); } catch (e) {}
  }
  var lastH = 0, sentDone = false;
  function report() {
    var k = kept || document.body;
    var h = Math.ceil(Math.max(k.getBoundingClientRect().bottom + (window.scrollY || 0), 200)) + 30;
    if (Math.abs(h - lastH) > 4) { lastH = h; send({ type: 'height', h: h }); }
    var hasForm = !!document.querySelector('form.userform-form');
    if (!sentDone && (isResponse || (!hasForm && kept))) { sentDone = true; send({ type: 'done' }); }
  }

  function tick() {
    try { isolate(); paypalNote(); report(); } catch (e) { if (window.console) console.error('[embed] ' + VERSION, e); }
  }
  function boot() {
    tick();
    send({ type: 'ready', v: VERSION, page: isResponse ? 'thanks' : 'form' });
    setInterval(tick, 400);
    if (window.console) console.log('[embed] ' + VERSION + ' form-only view' + (target ? ' for ' + target : ' (no festival page found)'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
