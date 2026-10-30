/* Loader + project tests. Serves this repo as if it were GitHub Pages and loads each
   page through the real footer line, so the loader, its page map and the project
   files are tested together.
   Setup once:  cd tools && npm install
   Run:         node tools/test.js */
'use strict';
var fs = require('fs'), path = require('path');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
var ROOT = path.join(__dirname, '..');
var PAGES_BASE = 'https://virtualshliach.github.io/riverside-footer/';

var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  ok   ' + m); } else { fail++; console.log('  FAIL ' + m); } }
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

/* Serve repo files for the Pages URL; record every script URL requested. */
function makeLoader(requests) {
  class RepoLoader extends jsdom.ResourceLoader {
    fetch(url, opts) {
      requests.push(url);
      if (url.indexOf(PAGES_BASE) === 0) {
        var rel = decodeURIComponent(url.slice(PAGES_BASE.length).split('?')[0]);
        var file = path.join(ROOT, rel);
        if (file.indexOf(ROOT) === 0 && fs.existsSync(file) && fs.statSync(file).isFile()) {
          return Promise.resolve(fs.readFileSync(file));
        }
        return Promise.reject(new Error('404 ' + url));
      }
      /* Third-party loads (fonts, map iframe) answer empty so tests stay offline. */
      return Promise.resolve(Buffer.from(''));
    }
  }
  return new RepoLoader();
}

var SHELL = '<!doctype html><html><head><title>t</title></head><body class="cco_templateless_page">' +
  '<div class="cco_templateless_template"><a href="//www.JewishRiverside.com">Back</a></div>' +
  '<div class="cco_templatelates_content"><div id="chabad_body_page"><div id="navigation">nav</div>' +
  '<div id="co_content_container">native</div></div></div><div id="BodyContainer">Powered by</div>';

function load(site, url, opts) {
  opts = opts || {};
  var errors = [], logs = [], requests = [];
  var html = (opts.shell || SHELL) + (opts.coScript || '') +
    '<script src="' + PAGES_BASE + 'footer.js"></script></body></html>';
  var dom = new JSDOM(html, {
    url: url, runScripts: 'dangerously', resources: makeLoader(requests), pretendToBeVisual: true,
    beforeParse: function (w) {
      w.console.error = function () { errors.push([].join.call(arguments, ' ')); };
      w.console.warn = function () { logs.push('warn ' + [].join.call(arguments, ' ')); };
      w.console.log = function () { logs.push([].join.call(arguments, ' ')); };
      w.addEventListener('error', function (e) { errors.push(e.message); });
      w.fetch = function () { return Promise.reject(new Error('offline in tests')); };
    }
  });
  return wait(opts.wait || 600).then(function () {
    return { w: dom.window, d: dom.window.document, errors: errors, logs: logs, requests: requests };
  });
}
function projectRequests(r) {
  return r.requests.filter(function (u) { return u.indexOf(PAGES_BASE) === 0 && !/\/footer\.js$/.test(u); });
}

var SITES = {
  riverside: async function () {
    var DRAFT = '7553387';
    console.log('riverside: draft Chanukah page');
    var r = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/' + DRAFT + '/jewish/Draft.htm');
    ok(projectRequests(r).length === 1 && /riverside-footer\/chanukah-2026\.js\?v=/.test(projectRequests(r)[0]), 'loader fetched chanukah-2026.js with version stamp');
    ok(r.d.getElementById('cf26'), 'template rendered');
    ok(!r.d.getElementById('cf26-cover'), 'cover removed after render');
    ok(r.errors.length === 0, 'no console errors ' + (r.errors.length ? JSON.stringify(r.errors) : ''));
    ok(r.logs.some(function (l) { return /\[riverside-footer\].*aid 7553387 -> chanukah-2026\.js/.test(l); }), 'loader log line');
    ok(r.logs.some(function (l) { return /footer payload executing/.test(l); }), 'project log line');
    ['cf-top', 'cf-event', 'cf-sponsors', 'cf-about', 'cf-news', 'cf-guide', 'cf-share'].forEach(function (id) {
      ok(r.d.getElementById(id), 'section #' + id);
    });
    ok(r.d.querySelectorAll('#cf-guide .cf-gc').length === 3, 'guide falls back to fixed links when import fails');

    var r2 = await load('riverside', 'https://www.jewishriverside.com/article.asp?aid=' + DRAFT);
    ok(r2.d.getElementById('cf26'), 'article.asp?aid= form renders');

    var r3 = await load('riverside', 'https://www.jewishriverside.com/', { coScript: '<script>window.Co={ArticleId:\'' + DRAFT + '\'}</script>' });
    ok(r3.d.getElementById('cf26'), 'Co.ArticleId fallback renders');

    console.log('riverside: Sukkot page (past event, stays on)');
    var SUK = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7457011/jewish/Sukkot.htm';
    /* the Sukkot overlay skins the native form, so give it the form's fields */
    var FORM = '<form><input id="input_2" type="submit"><input id="input_59"><input id="input_60">' +
      '<input id="first_62"><input id="last_62"><input id="input_72"><input id="input_73_full"></form>';
    var sk = await load('riverside', SUK, { coScript: FORM, wait: 900 });
    ok(projectRequests(sk).length === 1 && /riverside-footer\/sukkot-5787\.js\?v=/.test(projectRequests(sk)[0]), 'loader fetched sukkot-5787.js');
    ok(sk.d.getElementById('hh26'), 'Sukkot overlay rendered');
    /* Sukkot keeps its cover under the full-screen overlay by design (same as when it was inline). */
    ok(sk.errors.length === 0, 'no console errors on Sukkot page ' + (sk.errors.length ? JSON.stringify(sk.errors) : ''));
    ok(sk.d.querySelectorAll('#hh26 .hh-tile').length >= 6, 'Sukkot tiles present (' + sk.d.querySelectorAll('#hh26 .hh-tile').length + ')');
    var skr = await load('riverside', 'https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/7457011/jewish/Sukkot.htm', { wait: 300 });
    ok(projectRequests(skr).length === 1 && !skr.errors.length, 'Sukkot code also loads on its thank-you page');

    console.log('riverside: pages that must load nothing');
    var quiet = [
      ['https://www.jewishriverside.com/', 'site home'],
      ['https://www.jewishriverside.com/templates/section_cdo/aid/4949424/jewish/Chanukah-Festival-2026.htm', 'live festival page (not yet switched)'],
      ['https://www.jewishriverside.com/article.asp?aid=4194665', 'donate page'],
      ['https://www.jewishriverside.com/article.asp?aid=75533870', 'look-alike aid'],
      ['https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/' + DRAFT, 'response page'],
      ['https://chanukahfestival.org/', 'brand domain (off during draft)']
    ];
    for (var i = 0; i < quiet.length; i++) {
      var q = await load('riverside', quiet[i][0], { wait: 250 });
      ok(projectRequests(q).length === 0 && !q.d.getElementById('cf26') && !q.d.getElementById('cf26-cover') && !q.errors.length,
        quiet[i][1] + ': nothing loaded');
    }
  }
};

(async function () {
  var only = process.argv[2];
  for (var site in SITES) {
    if (only && only !== site) continue;
    await SITES[site]();
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
