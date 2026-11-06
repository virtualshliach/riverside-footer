/* Join Our Mailing List form (aid 5333083) on jewishriverside.com.
   Fills in California as the default state in the delivery address.
   The visitor can still change it. Everything else on this form is set in ChabadOne. */
(function () {
  'use strict';
  var AID = '5333083';
  var STATE = 'California';

  function onThisPage() {
    var m = /\/aid\/(\d+)(?:[\/.]|$)/i.exec(window.location.pathname) ||
            /[?&]aid=(\d+)(?:&|$)/i.exec(window.location.search);
    return (m && m[1] === AID) || (window.Co && String(window.Co.ArticleId) === AID);
  }

  function fill() {
    var form = document.querySelector('form.userform-form[id="' + AID + '"]') ||
               document.querySelector('form.userform-form');
    if (!form) return false;
    var st = form.querySelector('input[name$="[state]"]');
    if (!st) return false;
    if (!st.value) st.value = STATE;
    return true;
  }

  function boot() {
    if (!onThisPage()) return;
    if (fill()) return;
    var tries = 0;
    var t = setInterval(function () { if (fill() || ++tries > 40) clearInterval(t); }, 250);
  }

  boot();
})();
