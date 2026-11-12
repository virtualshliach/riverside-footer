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
  '<div class="cco_templateless_template" style="display:block !important;height:30px!important"><a href="//www.JewishRiverside.com">Back</a></div>' +
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
      if (opts.nativeDonate) {   /* Stripe pop-up and own forms switched off: test the ChabadOne fallbacks */
        w.CFStripe = { version: 'off', ready: false, open: function () { return false; } };
        w.CFForms = { version: 'off', ready: false, open: function () { return false; } };
      }
      w.console.error = function () { errors.push([].join.call(arguments, ' ')); };
      w.console.warn = function () { logs.push('warn ' + [].join.call(arguments, ' ')); };
      w.console.log = function () { logs.push([].join.call(arguments, ' ')); };
      w.addEventListener('error', function (e) { errors.push(e.message); });
      w.fetch = function (u) {
        var key = String(u).replace(/^https?:\/\/[^/]+/, '');
        if (opts.pages && opts.pages[key] != null) return Promise.resolve({ ok: true, status: 200, text: function () { return Promise.resolve(opts.pages[key]); } });
        if (opts.pages) (opts.fetched = opts.fetched || []).push(key);
        return Promise.reject(new Error('offline in tests'));
      };
    }
  });
  return wait(opts.wait || 600).then(function () {
    return { w: dom.window, d: dom.window.document, errors: errors, logs: logs, requests: requests };
  });
}
function projectRequests(r) {
  return r.requests.filter(function (u) { return u.indexOf(PAGES_BASE) === 0 && !/\/footer\.js$/.test(u); });
}


/* A live-shaped stub of the ChabadOne donation form (taken from draft page 7553387), built from the field
   map taken on the live page (Nov 2 2026). Behaves like the platform:
   - invisible reCAPTCHA: empty wrapper, never needs a click
   - hidden cc_type input
   - the expiry selects are REBUILT (selection lost) whenever the amount changes
   - the click is refused (.form-validation-error) when a required field is empty
   - success removes the form (AJAX); window.__decline shows the decline wording instead */
function donateShell(opts) {
  opts = opts || {};
  var months = '<option value=""></option>' + [1,2,3,4,5,6,7,8,9,10,11,12].map(function (m) { return '<option value="' + m + '">' + m + ' - M</option>'; }).join('');
  var years = '<option value=""></option>' + [2026,2027,2028,2029,2030].map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join('');
  var countries = '<option value="">Please Select</option><option value="United States">United States</option><option value="Canada">Canada</option>';
  return '<!doctype html><html><head><title>t</title></head><body>' +
  '<div class="cco_templateless_template" style="display:block !important;height:30px!important"><a href="//www.JewishRiverside.com">Back</a></div>' +
  '<div class="cco_templatelates_content"><div id="cco_body"><div id="co_content_container"><article><div id="formContainer">' +
  '<form id="4949424" class="userform-form"><ul>' +
  '<li id="id_1"><input id="first_1"><input id="last_1"></li>' +
  '<li id="id_3"><input id="input_3" type="email"></li>' +
  '<li id="id_5"><input id="input_5_addr_line1"><input id="input_5_addr_line2"><input id="input_5_city"><input id="input_5_state"><input id="input_5_postal"><select id="input_5_country">' + countries + '</select></li>' +
  '<li id="id_6"><input id="input_6_full" type="tel"></li>' +
  '<li id="id_7"><input id="input_7" type="number"></li>' +
  '<li id="id_8"><div class="form-input" id="total_amount">$0.00</div></li>' +
  '<li id="id_9"><input id="input_9" type="checkbox" value="Monthly"></li>' +
  '<li id="id_10"><input type="hidden" id="input_10_cc_type"><input id="input_10_cc_number"><input id="input_10_cc_ccv"><input id="input_10_cc_nameOnCard">' +
  '<select id="input_10_cc_exp_month">' + months + '</select><select id="input_10_cc_exp_year">' + years + '</select>' +
  '<table><tr class="billing_address"><td><input id="input_10_addr_line1"><input id="input_10_city"><input id="input_10_state"><input id="input_10_postal"><select id="input_10_country">' + countries + '</select></td></tr></table></li>' +
  '<li id="id_4"><input id="input_4" type="checkbox" value="true"></li>' +
  '<li id="id_2"><button type="button" id="input_2" class="form-submit-button">Submit</button></li>' +
  '</ul><div><div class="js-recaptcha-wrapper"></div></div><input type="hidden" name="cdo-captcha-response" value=""></form>' +
  '</div></article></div></div></div><div id="BodyContainer">Powered by</div>' +
  '<script>(function(){var f=document.getElementById("4949424");window.__clicks=0;window.__submitted=null;' +
  'var mo=document.getElementById("input_10_cc_exp_month").innerHTML,yo=document.getElementById("input_10_cc_exp_year").innerHTML;' +
  'document.getElementById("input_7").addEventListener("change",function(){document.getElementById("total_amount").textContent="$"+(+this.value||0).toFixed(2);' +
  'document.getElementById("input_10_cc_exp_month").innerHTML=mo;document.getElementById("input_10_cc_exp_year").innerHTML=yo;window.__rebuilds=(window.__rebuilds||0)+1;});' +
  'document.getElementById("input_2").addEventListener("click",function(){window.__clicks++;' +
  '[].forEach.call(f.querySelectorAll(".form-validation-error"),function(e){e.classList.remove("form-validation-error");});' +
  'var req=["first_1","last_1","input_3","input_7","input_10_cc_number","input_10_cc_ccv","input_10_cc_nameOnCard","input_10_cc_exp_month","input_10_cc_exp_year"];var bad=0;' +
  'req.forEach(function(id){var e=document.getElementById(id);if(!e.value){e.classList.add("form-validation-error");bad++;}});' +
  'var cn=document.getElementById("input_10_cc_number");if(cn.value&&cn.value.length<13){cn.classList.add("form-validation-error");bad++;}if(bad)return;' +
  'var vals={};[].forEach.call(f.querySelectorAll("input,select"),function(e){if(e.id)vals[e.id]=e.type==="checkbox"?e.checked:e.value;});window.__submitted=vals;' +
  'setTimeout(function(){if(window.__decline){var d=document.createElement("div");d.className="form-error-message";d.textContent="This transaction has been declined.";f.appendChild(d);window.__decline=false;}' +
  'else{document.getElementById("formContainer").innerHTML="<p>Thank you</p>";}},300);});})();</script>';
}

async function donateFlow(r, card) {
  var d = r.d, w = r.w;
  function click(el) { el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); }
  function type(id, val) { var e = d.getElementById(id); e.value = val; e.dispatchEvent(new w.Event('input', { bubbles: true })); e.dispatchEvent(new w.Event('change', { bubbles: true })); }
  click(d.querySelector('.cf-nav .cf-don'));
  var chips = d.querySelectorAll('.cf-dm .cf-chip');
  click(chips[3]);                                              /* $180 */
  var mon = d.getElementById('cf-dm-monthly'); mon.checked = true; mon.dispatchEvent(new w.Event('change', { bubbles: true }));
  click(d.querySelector('.cf-dm-next'));
  type('cf-dm-first', 'Test'); type('cf-dm-last', 'Donor'); type('cf-dm-email', 'test@example.com');
  type('cf-dm-phone', '9515550100'); type('cf-dm-addr1', '1 Main St'); type('cf-dm-city', 'Riverside');
  type('cf-dm-state', 'CA'); type('cf-dm-zip', '92501');
  click(d.querySelector('.cf-dm-next'));
  if (card) {
    type('cf-dm-ccNum', card === true ? '4111 1111 1111 1111' : card); type('cf-dm-ccCvv', '123');
    type('cf-dm-ccMon', '7'); type('cf-dm-ccYear', '2028');
  }
  click(d.querySelector('.cf-dm-next'));
  await wait(1700);
}

var SITES = {
  riverside: async function () {
    var DRAFT = '4949424';
    console.log('riverside: draft Chanukah page');
    var r = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/' + DRAFT + '/jewish/Draft.htm');
    ok(/riverside-footer\/chanukah-2026\.js\?v=/.test(projectRequests(r)[0]) &&
      projectRequests(r).slice(1).every(function (u) { return /\/(stripe-donate|festival-forms)\.js\?v=/.test(u); }),
      'loader fetched chanukah-2026.js with version stamp (plus the Stripe and forms files it uses)');
    ok(r.d.getElementById('cf26'), 'template rendered');
    ok(!r.d.getElementById('cf26-cover'), 'cover removed after render');
    ok(r.errors.length === 0, 'no console errors ' + (r.errors.length ? JSON.stringify(r.errors) : ''));
    ok(r.logs.some(function (l) { return /\[riverside-footer\].*aid 4949424 -> chanukah-2026\.js/.test(l); }), 'loader log line');
    ok(r.logs.some(function (l) { return /footer payload executing/.test(l); }), 'project log line');
    ['cf-top', 'cf-event', 'cf-directions', 'cf-partners', 'cf-about', 'cf-news', 'cf-guide', 'cf-share'].forEach(function (id) {
      ok(r.d.getElementById(id), 'section #' + id);
    });
    var gTitles = [].map.call(r.d.querySelectorAll('#cf-guide .cf-gc h3'), function (h) { return h.textContent; });
    ok(gTitles.join('|') === 'What Is Chanukah?|How to Light the Menorah|How to Celebrate Chanukah|Dreidel, Latkes and Donuts', 'four guide cards (' + gTitles.join('|') + ')');
    var gImgs = [].map.call(r.d.querySelectorAll('#cf-guide .cf-gc img'), function (i) { return i.getAttribute('src').replace(PAGES_BASE, ''); });
    ok(gImgs.join(',') === 'g-guide.jpg,g-light.jpg,g-celebrate.jpg,g-dreidel.jpg', 'guide cards use our event photos (' + gImgs.join(',') + ')');
    ok(fs.readdirSync(ROOT).filter(function (f) { return /^g-.*\.jpg$/.test(f); }).length === 8, 'eight guide photos are in the repo');
    var hv = r.d.querySelector('#cf-top .cf-vid video');
    ok(hv && hv.getAttribute('src') === PAGES_BASE + 'festival-hero.mp4', 'hero video points at festival-hero.mp4 in this repo (' + (hv && hv.getAttribute('src')) + ')');
    ok(hv && hv.muted && hv.hasAttribute('playsinline') && hv.loop, 'hero video is muted, loops and plays inline');
    ok(hv && hv.poster === PAGES_BASE + 'festival-hero-poster.jpg', 'hero has a still image while the video loads');
    ok(fs.existsSync(path.join(ROOT, 'festival-hero.mp4')) && fs.existsSync(path.join(ROOT, 'festival-hero-poster.jpg')), 'video and still are in the repo');
    var rsvp = [].filter.call(r.d.querySelectorAll('#cf26 a'), function (a) { return /facebook\.com\/events/.test(a.href); });
    ok(!r.d.getElementById('cf-rsvp') && rsvp.length === 1 && rsvp[0].href === 'https://www.facebook.com/events/1651125113077350/',
      'one RSVP button, to the Facebook event (brief Nov 5)');
    ok(!/become a sponsor|your name here|grand menorah sponsors|festival sponsors/i.test(r.d.getElementById('cf26').textContent), 'no sponsor tiers or sponsor button');
    ok(r.d.querySelectorAll('#cf-partners .cf-sp').length === 6, 'the six community partners are shown (brief Nov 5)');
    var pImgs = [].slice.call(r.d.querySelectorAll('#cf-partners .cf-sp img'));
    ok(pImgs.some(function (i) { return i.alt === 'Chabad at UCR'; }) && !/Chabad of UCR/.test(r.d.getElementById('cf26').textContent), 'written as Chabad at UCR');
    ok(pImgs.length === 6 && pImgs.every(function (i) { return i.alt && fs.existsSync(path.join(ROOT, i.getAttribute('src').replace(PAGES_BASE, '').split('?')[0])); }),
      'every partner shows its logo from the repo, with a name for screen readers');
    ok(fs.existsSync(path.join(ROOT, 'chabad-jcc-logo-white-gold.png')), 'organizer logo is in the repo');
    var front = r.d.querySelector('#cf-news .cf-front img');
    ok(front && fs.existsSync(path.join(ROOT, front.getAttribute('src').replace(PAGES_BASE, ''))) && /Press-Enterprise/.test(front.alt), 'front page feature shows the Press-Enterprise front page image from the repo');
    var cards = r.d.querySelectorAll('#cf-news .cf-news .cf-nc');
    ok(cards.length >= 15, 'news carousel has at least 15 stories (' + cards.length + ')');
    var pe = [].filter.call(cards, function (c) { return /pressenterprise\.com/.test(c.href); }).length;
    ok(pe >= 12, 'most stories are from The Press-Enterprise (' + pe + ')');
    var outlets = [].map.call(cards, function (c) { return /pressenterprise\.com/.test(c.href) ? 'PE' : 'other'; });
    var run = 0, maxRun = 0, firstTen = outlets.slice(0, 10);
    outlets.forEach(function (o) { run = o === 'PE' ? run + 1 : 0; maxRun = Math.max(maxRun, run); });
    ok(cards.length >= 20 && /mynewsla/.test(r.d.getElementById('cf-news').innerHTML) && /raincrossgazette/.test(r.d.getElementById('cf-news').innerHTML), 'other outlets are back alongside the Press-Enterprise');
    ok(firstTen.join(',').indexOf('PE,PE,PE') < 0, 'first ten stories mix outlets, never three Press-Enterprise in a row (' + firstTen.join(',') + ')');
    ok(maxRun <= 3, 'no long Press-Enterprise runs anywhere (longest ' + maxRun + ')');
    ok([].every.call(cards, function (c) { return c.querySelector('.cf-nc-plate') && c.target === '_blank'; }), 'every story card has a nameplate and opens in a new tab');
    ok(!/riversideca\.gov/.test(r.d.getElementById('cf-news').innerHTML), 'dead City of Riverside link removed');
    var menu = [].map.call(r.d.querySelectorAll('.cf-links a'), function (a) { return a.textContent + '>' + a.getAttribute('href'); });
    ok(menu.join('|') === 'Event Info>#cf-event|Directions & Parking>#cf-directions|In the News>#cf-news|Chanukah Guide>#cf-guide', 'menu items in order (' + menu.join('|') + ')');
    ok(menu.every(function (m) { return r.d.getElementById(m.split('>#')[1]); }), 'every menu item has a section to go to');
    var mm = [].map.call(r.d.querySelectorAll('#cf-mmenu a, #cf-mmenu button'), function (a) { return a.textContent; });
    ok(mm.join('|') === 'Event Info|Directions & Parking|In the News|Chanukah Guide|Donate', 'phone menu has the same items plus Donate (' + mm.join('|') + ')');
    var burger = r.d.querySelector('.cf-burger');
    burger.dispatchEvent(new r.w.MouseEvent('click', { bubbles: true }));
    ok(/open/.test(r.d.getElementById('cf-mmenu').className), 'menu button opens the phone menu');
    r.d.querySelector('#cf-mmenu a').dispatchEvent(new r.w.MouseEvent('click', { bubbles: true, cancelable: true }));
    ok(!/open/.test(r.d.getElementById('cf-mmenu').className), 'picking an item closes the phone menu');
    ok(r.d.querySelector('#cf-directions iframe') && !r.d.querySelector('#cf-directions .cf-ev-btns'), 'directions section has the map, no separate map buttons');
    ok(r.d.querySelector('.cco_templateless_template').style.getPropertyValue('display') === 'none' && r.d.querySelector('.cco_templateless_template').style.getPropertyPriority('display') === 'important', 'the platform\'s "Back to" bar is hidden despite its inline !important');
    var heroBtns = [].map.call(r.d.querySelectorAll('.cf-ctas .cf-btn'), function (b) { return b.textContent.trim(); });
    ok(heroBtns.join('|') === 'Add to Calendar|Join the Facebook Event|Share', 'top buttons: Add to Calendar, Join the Facebook Event, Share (' + heroBtns.join('|') + ')');
    var evBtns = [].map.call(r.d.querySelectorAll('#cf-event .cf-ev-btns .cf-btn'), function (b) { return b.textContent.trim(); });
    ok(evBtns.join('|') === 'Directions & Parking', 'event details: Directions & Parking only (' + evBtns.join('|') + ')');
    var row = r.d.querySelectorAll('#cf-directions .cf-prow')[0], item = row.parentNode;
    ok(item.querySelectorAll('.cf-ptray a').length === 4 && item.className === 'cf-pitem', 'each garage has a closed tray with four direction buttons');
    row.dispatchEvent(new r.w.MouseEvent('click', { bubbles: true }));
    var tl = [].map.call(item.querySelectorAll('.cf-ptray a'), function (a) { return a.href; });
    ok(/cf-pitem open/.test(item.className) && /google\.com\/maps\/dir\/.*destination=3901%20Orange/.test(tl[0]) && /maps\.apple\.com\/\?daddr=3901%20Orange/.test(tl[1]), 'tapping a garage opens its tray: directions to the garage (Google, Apple)');
    ok(/origin=3901%20Orange.*destination=Riverside%20Historic%20Courthouse.*travelmode=walking/.test(tl[2]) && /saddr=3901%20Orange.*daddr=Riverside%20Historic%20Courthouse.*dirflg=w/.test(tl[3]), 'and walking directions from the garage to the courthouse (Google, Apple)');
    var row2 = r.d.querySelectorAll('#cf-directions .cf-prow')[1];
    row2.dispatchEvent(new r.w.MouseEvent('click', { bubbles: true }));
    ok(item.className === 'cf-pitem' && /open/.test(row2.parentNode.className), 'opening another garage closes the first');
    ok(r.d.querySelectorAll('#cf-directions .cf-prow').length === 5 && /\$1\.25 per 30 minutes/.test(r.d.getElementById('cf-directions').textContent), 'parking: five nearby garages and the rates');
    var hlImgs = [].map.call(r.d.querySelectorAll('#cf-activities .cf-hl-card img'), function (i) { return i.getAttribute('src').replace(PAGES_BASE, ''); });
    ok(hlImgs.join(',') === 'hl-menorah.jpg,hl-food.jpg,hl-music-aaron.jpg,hl-performer.jpg', 'four highlight cards use photos (' + hlImgs.join(',') + ')');
    ok(hlImgs.every(function (n) { return fs.existsSync(path.join(ROOT, n)); }), 'all four card photos are in the repo');
    ok(/FESTIVAL/.test(r.d.querySelector('#cf-top .cf-vtext').textContent) && /22/.test(r.d.querySelector('#cf-top .cf-vtext .cf-annual').textContent), 'title sits on top of the video');

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

    ok(/width=device-width/.test((r.d.querySelector('meta[name=viewport]') || {}).content || ''), 'phones get a viewport tag (the ChabadOne template sends none)');
    ok(/html\.cf26-on\{font-size:16px/.test(r.d.getElementById('cf26-style').textContent), 'page is drawn on a 16px base (the template root is 10px)');
    var ld = r.d.getElementById('cf26-ld');
    var ldj = null; try { ldj = JSON.parse(ld.textContent); } catch (e) {}
    ok(ldj && ldj['@type'] === 'Event' && /2026-12-07T18:00/.test(ldj.startDate) && ldj.location.name === 'Riverside Historic Courthouse' && ldj.isAccessibleForFree === true, 'schema.org Event data: date, place, free');
    ok(!r.requests.some(function (u) { return /googletagmanager/.test(u); }) && !r.w.gtag, 'analytics stays off until a GA4 ID is set');

    console.log('riverside: Kids Menorah Contest thank-you page');
    /* the platform's confirmation as set in ChabadOne (Nov 6): a div with a headline and three lines */
    var MC_NATIVE = '<div id="mc-native"><h2>You\u2019re registered for the Kids Menorah Contest!</h2><p><b>Drop-off:</b> Monday, Dec 7, 5:45\u20136:15 PM at the Menorah Contest table (#15 on the festival map)</p>' +
      '<p><b>Where:</b> Riverside Historic Courthouse, 4050 Main St., Riverside</p><p><b>Winners:</b> announced 7:45\u20138 PM</p><p>Every child who enters gets a Chanukah gift. See you at the festival!</p></div>';
    var mcShell = SHELL.replace('<div id="co_content_container">native</div>', '<div id="co_content_container"><div class="pagetools">Print</div>' + MC_NATIVE + '</div>');
    var mcr = await load('riverside', 'https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/7606745/jewish/Kids-Menorah-Contest.htm', { shell: mcShell, wait: 600 });
    ok(projectRequests(mcr).some(function (u) { return /menorah-contest-2026\.js/.test(u); }), 'contest code loads on its thank-you page');
    ok(!!mcr.d.getElementById('mc26') && !mcr.errors.length, 'designed thank-you card shown, no errors');
    ok(/7:45\u20138 PM/.test(mcr.d.getElementById('mc26').textContent) && /#15/.test(mcr.d.getElementById('mc26').textContent), 'thank-you card has the drop-off table and winners time');
    ok(mcr.d.getElementById('mc-native').style.display === 'none' && mcr.d.querySelector('.pagetools').style.display !== 'none',
      'the whole plain message is replaced (headline and all lines), nothing around it');
    var MC_FORM = '<div id="formContainer"><form id="7606745" class="userform-form"><div class="form-all"><ul class="form-section">' +
      '<li class="form-line" id="id_1"><div class="form-label-top"><label>Parent / guardian first name</label></div><div class="form-input-wide"><input class="form-textbox" name="q1"></div></li>' +
      '<li class="form-line" id="id_5"><div class="form-label-top"><label>Phone</label></div><div class="form-input-wide"><input type="tel" class="form-textbox" name="q5"></div></li>' +
      '<li class="form-line" id="id_17"><div class="form-input-wide"><button type="submit" class="form-submit-button">Submit</button></div></li></ul></div></form></div>';
    var mfShell = SHELL.replace('<div id="co_content_container">native</div>', '<div id="co_content_container"><h1 class="article-header__title">Kids Menorah Contest 2026</h1>' + MC_FORM + '</div>');
    var mcf = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7606745/jewish/Kids-Menorah-Contest.htm', { shell: mfShell, wait: 500 });
    ok(!mcf.d.getElementById('mc26') && !!mcf.d.getElementById('mc26-hero') && !mcf.errors.length, 'registration page gets the festival hero (not the thank-you card), no errors');
    var mform = mcf.d.getElementById('7606745');
    ok(mform.style.display !== 'none' && mform.querySelectorAll('input,button').length === 3 && mform.querySelector('[name=q1]'), 'the native form and its fields are untouched and visible');
    ok(mcf.d.querySelector('input[type=tel]').getAttribute('inputmode') === 'tel', 'phone field opens the number keypad');

    console.log('riverside: Dreidel Guessing Contest');
    var DG_FORM = '<div id="formContainer"><form id="5738793" class="userform-form"><div class="form-all"><ul class="form-section">' +
      '<li class="form-line" id="id_18"><img src="banner.jpg" alt=""></li>' +
      '<li class="form-line" id="id_12"><div class="form-label-left"><label>Phone Number</label></div><div class="form-input"><div class="dir_ltr"><span class="form-sub-label-container"><input type="tel" class="form-textbox" name="q12a"></span><span class="form-sub-label-container"><input type="tel" class="form-textbox" name="q12b"></span></div></div></li>' +
      '<li class="form-line" id="id_17"><div class="form-label-left"><label>How many dreidels are there?</label></div><div class="form-input"><textarea class="form-textarea" name="q17"></textarea></div></li>' +
      '<li class="form-line" id="id_2"><button type="submit" class="form-submit-button">Submit</button></li></ul></div></form></div>';
    var dgShell = SHELL.replace('<div id="co_content_container">native</div>', '<div id="co_content_container"><h1 class="article-header__title">Dreidel Guessing Contest</h1>' + DG_FORM + '</div>');
    var dg2 = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5738793/jewish/Dreidel-Guessing-Contest.htm', { shell: dgShell, wait: 500 });
    ok(projectRequests(dg2).some(function (u) { return /dreidel-2026\.js/.test(u); }) && !!dg2.d.getElementById('dg26-hero') && !dg2.errors.length, 'dreidel page gets the festival hero, no errors');
    ok(/win \$180/i.test(dg2.d.getElementById('dg26-hero').textContent) && /7:45 and 8 PM/.test(dg2.d.getElementById('dg26-hero').textContent), 'dreidel intro: $180 and the 7:45 to 8 PM announcement');
    ok(dg2.d.getElementById('5738793').style.display !== 'none' && dg2.d.getElementById('5738793').querySelectorAll('input,textarea,button').length === 4, 'dreidel native form and fields untouched');
    ok(dg2.d.querySelector('#id_17 textarea').getAttribute('inputmode') === 'numeric', 'the guess opens the number keypad');
    var DG_NATIVE = '<div id="dg-native"><h2>Thanks for your guess!</h2><p>The winner of the $180 prize is announced between 7:45 and 8 PM at the Chanukah Festival.</p><p>Good luck, and enjoy the festival!</p></div>';
    var dgr = await load('riverside', 'https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/5738793/jewish/Dreidel-Guessing-Contest.htm', { shell: SHELL.replace('<div id="co_content_container">native</div>', '<div id="co_content_container">' + DG_NATIVE + '</div>'), wait: 600 });
    ok(!!dgr.d.getElementById('dg26') && !dgr.errors.length && dgr.d.getElementById('dg-native').style.display === 'none', 'dreidel thank-you card replaces the plain message');
    ok(dgr.d.querySelectorAll('#dg26 .mc-row a, #dg26 .mc-row button').length >= 6 && /s%3Dwhatsapp-dreidel|s=whatsapp-dreidel/.test(dgr.d.getElementById('dg26').innerHTML), 'dreidel thank-you has the share buttons with short tracking links');

    console.log('riverside: social links go to the festival pages');
    var shareA = [].map.call(r.d.querySelectorAll('#cf-share a'), function (a) { return a.textContent.trim() + '>' + a.getAttribute('href'); });
    ok(!shareA.some(function (t) { return /^Follow on/.test(t); }), 'no Follow buttons in the share section (brief Nov 5)');
    var waA = [].filter.call(r.d.querySelectorAll('#cf-share a'), function (a) { return /wa\.me/.test(a.href); })[0];
    ok(waA && /chanukahfestival\.org%2F%3Fs%3Dwhatsapp(%26|$)/i.test(waA.href) && !/utm_/.test(waA.href), 'WhatsApp invite carries the short tagged ChanukahFestival.org link');
    ok(/%0A%0A/.test(waA.href), 'invite text has line breaks');
    ok(!/\u2014|[^0-9]\u2013|\u2013[^0-9]/.test(r.d.getElementById('cf26').textContent), 'dashes only in number ranges (6\u20138 PM), never in sentences');
    var allA = [].map.call(r.d.querySelectorAll('#cf26 a'), function (a) { return a.getAttribute('href') || ''; }).join(' ');
    ok(!/instagram\.com\/jewishriverside|facebook\.com\/jewishriverside/i.test(allA), 'no links to the Jewish Riverside social pages');
    ok(/Instagram/.test(r.d.querySelector('.cf-foot').textContent) && /Facebook/.test(r.d.querySelector('.cf-foot').textContent) && r.d.querySelector('.cf-foot a[href="https://www.instagram.com/chanukahfestival/"]'), 'footer links Instagram and Facebook to the festival accounts');

    console.log('riverside: Chanukah guide pop-up');
    var gr = r;
    function gclick(el) { el.dispatchEvent(new gr.w.MouseEvent('click', { bubbles: true, cancelable: true })); }
    gclick(gr.d.querySelectorAll('#cf-guide .cf-gc')[1]);
    var rd = gr.d.querySelector('.cf-rd');
    ok(rd && rd.querySelector('h1').textContent === 'How to Light the Menorah' && /shamash/.test(rd.querySelector('.cf-rd-body').textContent), 'card opens its article in a pop-up');
    ok(rd.querySelectorAll('.cf-rd-body a').length === 0 && !/fetch/.test(r.logs.join(' ')), 'no links inside the guide and nothing loaded from other pages');
    gclick(rd.querySelector('.cf-rd-next'));
    ok(rd.querySelector('h1').textContent === 'How to Celebrate Chanukah', 'Next goes to the next article in the same pop-up');
    gclick(rd.querySelector('.cf-rd-prev'));
    ok(rd.querySelector('h1').textContent === 'How to Light the Menorah', 'Back goes to the previous article');
    ok(gr.d.querySelectorAll('.cf-rd').length === 1, 'only one pop-up open');
    gr.d.dispatchEvent(new gr.w.KeyboardEvent('keydown', { key: 'Escape' }));
    ok(!gr.d.querySelector('.cf-rd'), 'Escape closes the guide pop-up');
    gclick(gr.d.querySelectorAll('#cf-guide .cf-gc')[3]);
    rd = gr.d.querySelector('.cf-rd');
    ok(rd.querySelector('.cf-rd-next').style.display === 'none' && rd.querySelector('.cf-rd-prev').style.display === '', 'last article has Back but no Next');
    gclick(rd.querySelectorAll('.cf-rd-foot .cf-btn')[2]);
    ok(!gr.d.querySelector('.cf-rd'), 'Back to the festival closes it');

    console.log('riverside: donate pop-up against a live-shaped form');
    var DPAGE = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/' + DRAFT + '/jewish/Draft.htm';
    var dz = await load('riverside', DPAGE, { shell: donateShell(), wait: 700, nativeDonate: true });
    ok(dz.d.getElementById('cf26') && dz.errors.length === 0, 'page renders with the form present, no errors ' + JSON.stringify(dz.errors));
    ok(dz.d.getElementById('4949424') && dz.d.getElementById('4949424').closest('.cco_templatelates_content'), 'native form left in place (not moved)');
    var css = dz.d.getElementById('cf26-style').textContent;
    ok(/\.cco_templatelates_content\{position:absolute !important;left:-10000px/.test(css) && !/\.cco_templatelates_content[^{]*\{display:none/.test(css), 'native page parked off-screen, never display:none');
    await donateFlow(dz, false);
    ok(dz.w.__clicks === 0 && /card/i.test(dz.d.querySelector('.cf-dm-err').textContent), 'card left empty: stopped in the pop-up, form not touched (' + dz.d.querySelector('.cf-dm-err').textContent + ')');
    var dv = await load('riverside', DPAGE, { shell: donateShell(), wait: 700, nativeDonate: true });
    await donateFlow(dv, '4111');
    ok(dv.w.__clicks === 1, 'form refuses the card: native submit clicked once (' + dv.w.__clicks + ')');
    ok(/card details/i.test(dv.d.querySelector('.cf-dm-err').textContent), 'form refuses the card: donor told to check card details (' + dv.d.querySelector('.cf-dm-err').textContent + ')');
    ok(!dv.d.querySelector('.cf-dm-next').disabled, 'form refuses the card: button released for a retry');

    var dg = await load('riverside', DPAGE, { shell: donateShell(), wait: 700, nativeDonate: true });
    await donateFlow(dg, true);
    var sub = dg.w.__submitted || {};
    ok(dg.w.__clicks === 1, 'card gift: native submit clicked exactly once (' + dg.w.__clicks + ')');
    ok(sub.input_7 === '180' && sub.input_9 === true, 'card gift: amount 180 and monthly box ticked');
    ok(sub.first_1 === 'Test' && sub.last_1 === 'Donor' && sub.input_3 === 'test@example.com' && sub.input_6_full === '9515550100', 'card gift: name, email, phone written');
    ok(sub.input_5_addr_line1 === '1 Main St' && sub.input_5_city === 'Riverside' && sub.input_5_state === 'CA' && sub.input_5_postal === '92501' && sub.input_5_country === 'United States', 'card gift: address written');
    ok(sub.input_10_addr_line1 === '1 Main St' && sub.input_10_postal === '92501' && sub.input_10_country === 'United States', 'card gift: billing address copied');
    ok(sub.input_10_cc_number === '4111111111111111' && sub.input_10_cc_ccv === '123' && sub.input_10_cc_nameOnCard === 'Test Donor', 'card gift: card number, code, name written');
    ok(sub.input_10_cc_exp_month === '7' && sub.input_10_cc_exp_year === '2028', 'card gift: expiry survived the form rebuilding its dropdowns (' + sub.input_10_cc_exp_month + '/' + sub.input_10_cc_exp_year + ')');
    ok(sub.input_10_cc_type === '', 'card gift: hidden card type left to the platform');
    await wait(600);
    ok(/Thank you/.test(dg.d.querySelector('.cf-dm-done').textContent) && /\$180/.test(dg.d.querySelector('.cf-dm-done').textContent), 'card gift: thank-you shown when the form completes');

    var dd = await load('riverside', DPAGE, { shell: donateShell(), wait: 700, nativeDonate: true });
    dd.w.__decline = true;
    await donateFlow(dd, true);
    await wait(1500);
    ok(/declined/i.test(dd.d.querySelector('.cf-dm-err').textContent), 'decline: the decline message is shown (' + dd.d.querySelector('.cf-dm-err').textContent + ')');
    ok(!dd.d.querySelector('.cf-dm-next').disabled, 'decline: button released');
    dd.d.querySelector('.cf-dm-next').dispatchEvent(new dd.w.MouseEvent('click', { bubbles: true }));
    await wait(1200);
    ok(dd.w.__clicks === 2 && /Thank you/.test(dd.d.querySelector('.cf-dm-done').textContent), 'retry after a decline: stale decline text cleared, second attempt succeeds');

    var sl = await load('riverside', DPAGE, { wait: 700 });
    sl.d.querySelector('.cf-nav .cf-don').dispatchEvent(new sl.w.MouseEvent('click', { bubbles: true }));
    ok(sl.d.getElementById('cfs') && !/cfs-off/.test(sl.d.getElementById('cfs').className) && !sl.d.querySelector('.cf-fp'), 'live page: Donate opens the Stripe pop-up');
    var nf = await load('riverside', DPAGE, { wait: 400, nativeDonate: true });
    var opened = null; nf.w.open = function (u) { opened = u; };
    nf.d.querySelector('.cf-nav .cf-don').dispatchEvent(new nf.w.MouseEvent('click', { bubbles: true }));
    ok(opened === null && nf.d.querySelector('.cf-fp iframe') && /aid\/4194665\/.*#cf-embed$/.test(nf.d.querySelector('.cf-fp iframe').getAttribute('src')), 'no form on the page: Donate opens the donate form in the festival pop-up');

    var bd = await load('riverside', 'https://chanukahfestival.org/', { wait: 500 });
    ok(bd.d.getElementById('cf26'), 'chanukahfestival.org shows the festival site');

    console.log('riverside: header.js matches footer.js');
    var hsrc = fs.readFileSync(path.join(ROOT, 'header.js'), 'utf8'), fsrc = fs.readFileSync(path.join(ROOT, 'footer.js'), 'utf8');
    var fCov = {}, hCov = {};
    fsrc.replace(/'(\d+)':\s*\{[^}]*?cover:\s*'([^']+)',\s*coverId:\s*'([^']+)'/g, function (_, a, c, id) { fCov[a] = id + ' ' + c; });
    hsrc.replace(/'(\d+)':\s*\{\s*coverId:\s*'([^']+)',\s*cover:\s*'([^']+)'/g, function (_, a, id, c) { hCov[a] = id + ' ' + c; });
    ok(JSON.stringify(fCov) === JSON.stringify(hCov) && Object.keys(fCov).length >= 2, 'header.js covers the same pages as footer.js ' + JSON.stringify(hCov));
    var fh = /var HOSTS = \{([^}]*)\}/.exec(fsrc)[1].replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s/g, ''), hh = /var HOSTS = \{([^}]*)\}/.exec(hsrc)[1].replace(/\s/g, '');
    ok(fh === hh, 'header.js and footer.js list the same domains (' + hh + ')');
    var hj = new JSDOM('<!doctype html><html><head></head><body><h1>old</h1></body></html>', { url: 'https://www.jewishriverside.com/templates/section_cdo/aid/4949424/jewish/x.htm', runScripts: 'outside-only' });
    hj.window.eval(hsrc);
    var hs = hj.window.document.getElementById('cf26-cover');
    ok(hs && hs.tagName === 'STYLE' && /body\{opacity:0/.test(hs.textContent) && !/display:none/.test(hs.textContent), 'header.js hides the festival page with opacity (never display:none)');
    var hj2 = new JSDOM('<!doctype html><html><head></head><body></body></html>', { url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/123/jewish/x.htm', runScripts: 'outside-only' });
    hj2.window.eval(hsrc);
    ok(!hj2.window.document.querySelector('style'), 'header.js does nothing on other pages');

    console.log('riverside: draft page vs live page');
    var dr = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7553387/jewish/Draft.htm', { wait: 600 });
    ok(dr.d.getElementById('cf26') && dr.logs.some(function (l) { return /aid 7553387 -> chanukah-2026-draft\.js/.test(l); }), 'draft page 7553387 loads the draft file');
    var dkids = [].slice.call(dr.d.getElementById('cf26').children).map(function (e) { return e.className.split(' ')[0]; });
    /* section order approved Nov 11 (11o): what to expect, plan your evening, directions, story, press, partners, share, guide, who */
    var dorder = [].slice.call(dr.d.getElementById('cf26').children).map(function (e) { return e.id || e.className.split(' ')[0]; }).join(' > ');
    ok(dorder === 'cf-nav > cf-top > cf-count > cf-marq > cf-activities > cf-event > cf-directions > cf-america250 > cf-about > cf-news > cf-partners > cf-share > cf-guide > cf-who > cf-foot',
      'sections in the approved order (' + dorder + ')');
    ok(dkids[dkids.length - 1] === 'cf-foot', 'footer is last (' + dkids.slice(-2).join(' > ') + ')');
    var actH = dr.d.querySelector('#cf-activities .cf-h2'), evH = dr.d.querySelector('#cf-event .cf-h2');
    ok(actH && /An evening of light/.test(actH.textContent) && /What to expect/i.test(dr.d.querySelector('#cf-activities .cf-kicker').textContent),
      'What to expect heading sits on the activity cards (' + (actH && actH.textContent) + ')');
    ok(evH && evH.textContent === 'Schedule & Festival Map' && /Plan your evening/i.test(dr.d.querySelector('#cf-event .cf-kicker').textContent),
      'details card is headed Plan your evening / Schedule & Festival Map (' + (evH && evH.textContent) + ')');
    var kit = dr.d.querySelectorAll('#cf-share .cf-kit-card');
    ok(kit.length === 3, 'share kit has 3 pictures: flyer, story, square (' + kit.length + ')');
    ok([].every.call(dr.d.querySelectorAll('#cf-share .cf-kit-card img'), function (i) { return fs.existsSync(path.join(ROOT, i.getAttribute('src').split('/').pop())); }), 'every share kit thumbnail exists in the repo');
    ok(/flyer-2026\.pdf$/.test((dr.d.querySelector('#cf-share .cf-kit-card a[download]') || {}).href || ''), 'flyer card still offers the PDF to print');
    var dsrc = fs.readFileSync(path.join(ROOT, 'chanukah-2026-draft.js'), 'utf8'), lsrc = fs.readFileSync(path.join(ROOT, 'chanukah-2026.js'), 'utf8');
    ok(/AID: '7553387',/.test(dsrc) && /BRAND_HOSTS: \[\],/.test(dsrc), 'draft file guards page 7553387 and claims no domain');
    ok(/AID: '4949424',/.test(lsrc) && /BRAND_HOSTS: \['chanukahfestival\.org', '12899\.centers\.clhosting\.org'\],/.test(lsrc), 'live file guards page 4949424 and chanukahfestival.org');

    console.log('riverside: the festival\'s own ChabadOne site (full site template homepage)');
    var NS = '<!doctype html><html><head><title>Chanukah Festival</title></head><body class="lang_en dir_ltr home cco_body"><div id="PrintCreditHeader"></div><div id="header">Menu</div><div id="content">Hebrew School lorem</div><div id="footer">footer</div></body></html>';
    var nss = await load('riverside', 'https://12899.centers.clhosting.org/', { shell: NS, wait: 700 });
    var nsd = nss.d.querySelector('.cf-nav .cf-don'); if (nsd) nsd.dispatchEvent(new nss.w.MouseEvent('click', { bubbles: true }));
    ok(nss.d.getElementById('cfs') && !/cfs-off/.test(nss.d.getElementById('cfs').className), 'festival\'s own site: Donate opens the Stripe pop-up');
    var ns = await load('riverside', 'https://12899.centers.clhosting.org/', { shell: NS, wait: 600, nativeDonate: true });
    ok(ns.d.getElementById('cf26') && /cf26-home/.test(ns.d.documentElement.className), 'new site homepage shows the festival');
    ok(/html\.cf26-home #header,html\.cf26-home #content,html\.cf26-home #footer\{display:none/.test(ns.d.getElementById('cf26-style').textContent), 'new site template header, content and footer are hidden');
    var nd = ns.d.querySelector('.cf-nav .cf-don'); var nopened = null; ns.w.open = function (u) { nopened = u; };
    if (nd) nd.dispatchEvent(new ns.w.MouseEvent('click', { bubbles: true }));
    ok(nopened === null && ns.d.querySelector('.cf-fp iframe') && /^https:\/\/www\.jewishriverside\.com\/templates\/articlecco_cdo\/aid\/4194665\//.test(ns.d.querySelector('.cf-fp iframe').getAttribute('src')), 'Donate on the new site opens the jewishriverside.com donate form in the pop-up');
    var nsub = await load('riverside', 'https://12899.centers.clhosting.org/36226', { shell: NS, wait: 400 });
    ok(!nsub.d.getElementById('cf26'), 'other pages on the new site are left alone');

    console.log('riverside: leftover ChabadOne chrome under the new festival footer (chanukahfestival.org)');
    var LEGACY = '<!doctype html><html><head><title>Chanukah Festival</title></head><body class="lang_en dir_ltr home cco_body">' +
      '<div id="chabad_body_page"><div id="chabad_main_content"><div id="chabad_head">' +
      '<div class="widget-1 navigation custom v260 feed"><div class="wrapper"><div class="widget_content">' +
      '<div id="navigation" class="chabad_navigator_bar"><a href="/">Home</a><a href="/about">About</a><a href="/event">Event Info</a><a href="/donate">Donate</a><a href="/guide">Chanukah Guide</a></div>' +
      '</div></div></div></div>' +
      '<div id="chabad_body_content"><div id="ContentArea" class="chabad_left_column"><h1><img alt="Chanukah Festival 2026 at Riverside Historic Courthouse" width="1200" height="400"></h1></div></div>' +
      '</div></div><div id="BodyContainer_1">old credits</div></body></html>';
    function isHidden(el, win) {
      while (el && el.nodeType === 1) {
        if (win.getComputedStyle(el).display === 'none') return true;
        el = el.parentElement;
      }
      return false;
    }
    var lg = await load('riverside', 'https://www.chanukahfestival.org/', { shell: LEGACY, wait: 700 });
    ok(lg.d.getElementById('cf26') && /cf26-home/.test(lg.d.documentElement.className), 'chanukahfestival.org homepage shows the festival');
    ok(isHidden(lg.d.getElementById('chabad_body_page'), lg.w) && isHidden(lg.d.getElementById('BodyContainer_1'), lg.w), 'old #chabad_body_page and #BodyContainer_1 are display:none');
    ok(isHidden(lg.d.getElementById('navigation'), lg.w) && isHidden(lg.d.querySelector('#ContentArea img[alt^="Chanukah Festival 2026"]'), lg.w), 'old Home / About menu and the old banner are not visible');
    ok(lg.d.querySelector('#cf26 .cf-foot') && lg.w.getComputedStyle(lg.d.querySelector('#cf26 .cf-foot')).display !== 'none', 'new festival footer stays visible');
    var leftover = [].filter.call(lg.d.body.children, function (e) {
      return e.id !== 'cf26' && e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE' && !isHidden(e, lg.w);
    });
    ok(leftover.length === 0, 'nothing after the new footer stays visible (' + leftover.map(function (e) { return e.id || e.tagName; }).join(',') + ')');
    ok(lg.d.getElementById('cf26').parentNode === lg.d.body && lg.d.getElementById('chabad_body_page').parentNode === lg.d.body, '#cf26 is a sibling of #chabad_body_page, not inside it');
    var cssLg = lg.d.getElementById('cf26-style').textContent;
    ok(/#chabad_body_page/.test(cssLg) && /\[id\^="BodyContainer"\]/.test(cssLg), 'festival CSS hides the leftover wrappers');
    var lgg = await load('riverside', 'https://www.chanukahfestival.org/?guess', { shell: LEGACY, wait: 1200 });
    var lgov = lgg.d.querySelector('.cff-ov');
    ok(lgov && /Dreidel Guessing Contest/.test(lgov.querySelector('.cff-hd b').textContent) && lgg.d.getElementById('cf26') && isHidden(lgg.d.getElementById('chabad_body_page'), lgg.w),
      'chanukahfestival.org/?guess opens the Dreidel form and still hides the old menu');
    ok(lgov && lgov.parentNode === lgg.d.body, '?guess pop-up mounts on document.body, not inside the old page');

    console.log('riverside: form pop-ups (donate, contest, mailing list) on the draft copy');
    var DR = 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7553387/jewish/Draft.htm';
    var st = await load('riverside', DR, { wait: 700 });
    st.d.querySelector('.cf-nav .cf-don').dispatchEvent(new st.w.MouseEvent('click', { bubbles: true, cancelable: true }));
    ok(st.w.CFStripe && st.w.CFStripe.ready && st.d.getElementById('cfs') && !/cfs-off/.test(st.d.getElementById('cfs').className) && !st.d.querySelector('.cf-fp'),
      'draft: Donate opens the Stripe pop-up (stripe-donate.js)');
    var stC = [].filter.call(st.d.querySelectorAll('#cf26 a[href]'), function (a) { return /7606745/.test(a.href); })[0];
    stC.dispatchEvent(new st.w.MouseEvent('click', { bubbles: true, cancelable: true }));
    var ov1 = st.d.querySelector('.cff-ov');
    ok(st.w.CFForms && st.w.CFForms.ready && ov1 && /Menorah Contest/.test(ov1.querySelector('.cff-hd b').textContent) && !st.d.querySelector('.cf-fp iframe'),
      'draft: a Menorah Contest link opens our own contest form (festival-forms.js)');
    ov1.querySelector('.cff-x').dispatchEvent(new st.w.MouseEvent('click', { bubbles: true }));
    var stM = [].filter.call(st.d.querySelectorAll('#cf26 a[href]'), function (a) { return /5333083/.test(a.href); })[0];
    stM.dispatchEvent(new st.w.MouseEvent('click', { bubbles: true, cancelable: true }));
    var ov2 = st.d.querySelector('.cff-ov');
    ok(!ov1.parentNode && ov2 && /Mailing List/.test(ov2.querySelector('.cff-hd b').textContent), 'draft: Join Our Mailing List opens our own mailing list form');
    var gq = await load('riverside', DR + '?guess', { wait: 1200 });
    var gov = gq.d.querySelector('.cff-ov');
    ok(gov && /Dreidel Guessing Contest/.test(gov.querySelector('.cff-hd b').textContent) && gq.d.getElementById('cf26'),
      'draft: ?guess (chanukahfestival.org/?guess) opens the Dreidel Contest form over the festival page');
    var gn = await load('riverside', DR, { wait: 900 });
    ok(!gn.d.querySelector('.cff-ov'), 'draft: without ?guess no form opens by itself');
    var fp = await load('riverside', DR, { wait: 600 });          /* no native donation form in this shell */
    fp.w.CFStripe = { version: 'off', ready: false, open: function () { return false; } };   /* Stripe off: the old pop-up */
    fp.w.CFForms = { version: 'off', ready: false, open: function () { return false; } };     /* own forms off: the old pop-ups */
    function fpClick(el) { el.dispatchEvent(new fp.w.MouseEvent('click', { bubbles: true, cancelable: true })); }
    fpClick(fp.d.querySelector('.cf-nav .cf-don'));
    var fr = fp.d.querySelector('.cf-fp iframe');
    ok(fr && fr.getAttribute('src') === 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/4194665/jewish/Donate.htm#cf-embed', 'no form on the page: Donate opens the donate form in a pop-up (' + (fr && fr.getAttribute('src')) + ')');
    ok(fp.d.querySelector('.cf-fp .cf-dm-hd b').textContent === 'Support the Chanukah Festival', 'donate pop-up has the festival heading');
    fp.w.dispatchEvent(new fp.w.MessageEvent('message', { origin: 'https://evil.example', source: fr.contentWindow, data: { cf26: 'embed', type: 'height', h: 1234 } }));
    ok(!/1234/.test(fr.style.height || ''), 'messages from other websites are ignored');
    fp.w.dispatchEvent(new fp.w.MessageEvent('message', { origin: 'https://www.jewishriverside.com', source: fr.contentWindow, data: { cf26: 'embed', type: 'height', h: 1234 } }));
    ok(fr.style.height === '1234px' && /cf-fp-ready/.test(fp.d.querySelector('.cf-fp .cf-dm-box').className), 'the form page sets the pop-up height and shows the form');
    fp.d.dispatchEvent(new fp.w.KeyboardEvent('keydown', { key: 'Escape' }));
    ok(!fp.d.querySelector('.cf-fp'), 'Escape closes the form pop-up');
    var cl = [].filter.call(fp.d.querySelectorAll('#cf26 a[href]'), function (a) { return /7606745/.test(a.href); });
    ok(cl.length > 0, 'page has Menorah Contest links (' + cl.length + ')');
    fpClick(cl[0]);
    fr = fp.d.querySelector('.cf-fp iframe');
    ok(fr && /aid\/7606745\/jewish\/Menorah-Contest-2026\.htm#cf-embed$/.test(fr.getAttribute('src')), 'a Menorah Contest link opens the contest form in the pop-up');
    fpClick(fp.d.querySelector('.cf-fp .cf-dm-x'));
    ok(!fp.d.querySelector('.cf-fp'), 'X closes it');
    var ml = [].filter.call(fp.d.querySelectorAll('#cf26 a[href]'), function (a) { return /5333083/.test(a.href); });
    fpClick(ml[0]);
    fr = fp.d.querySelector('.cf-fp iframe');
    ok(ml.length && fr && /aid\/5333083\/.*#cf-embed$/.test(fr.getAttribute('src')), 'Join Our Mailing List opens the mailing list form in the pop-up');
    fpClick(fp.d.querySelector('.cf-fp'));
    ok(!fp.d.querySelector('.cf-fp'), 'clicking outside closes it');
    var dsrc2 = fs.readFileSync(path.join(ROOT, 'chanukah-2026-draft.js'), 'utf8');
    ok(/if \(!form \|\| !\$id\(CFG\.DONATE\.F\.submit\)\) \{ openFormPop\('donate'\); return; \}/.test(dsrc2), 'with the native form (draft page) Donate still uses the built-in donate pop-up');

    console.log('riverside: embed.js (the form page inside the pop-up)');
    var esrc = fs.readFileSync(path.join(ROOT, 'embed.js'), 'utf8');
    var EP = '<!doctype html><html><head></head><body class="cco_templateless_page"><div class="cco_templateless_template" style="display:block !important;height:30px!important">Back to</div>' +
      '<div class="cco_templatelates_content"><div id="co_content_container" class="co_content_container"><nav id="sitenav">Home About</nav>' +
      '<div id="chabad_body_page"><h1 class="article-header__title">Donate</h1><div id="formContainer"><form id="4194665" class="userform-form"><ul>' +
      '<li class="form-line" id="id_3"><input id="input_3"></li><li class="form-line" id="id_13"><input type="radio" id="input_13_creditCard"><input type="radio" id="input_13_paypal"></li>' +
      '<li class="form-line" id="id_2"><button type="button" id="input_2" class="form-submit-button">Submit</button></li></ul><div class="js-recaptcha-wrapper"></div></form></div>' +
      '<div id="aside">related links</div></div></div></div><div id="BodyContainer"></div><div id="gb-widget-1">chat</div>' +
      '<div id="rc"><iframe title="recaptcha challenge expires in two minutes" src="https://www.google.com/recaptcha/api2/bframe"></iframe></div></body></html>';
    var ej = new JSDOM(EP, { url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/4194665/jewish/Donate.htm#cf-embed', runScripts: 'outside-only', pretendToBeVisual: true });
    var posted = [];
    ej.window.eval('window.__posted=[];');
    ej.window.eval(esrc);
    await wait(500);
    var ed = ej.window.document, ew = ej.window;
    function hidden(el) { return ew.getComputedStyle(el).display === 'none'; }
    ok(/cf-embed/.test(ed.documentElement.className) && ed.getElementById('cf-embed-style'), 'embed view switches on');
    ok(!hidden(ed.getElementById('4194665')) && !hidden(ed.getElementById('formContainer')) && !hidden(ed.querySelector('.cco_templatelates_content')), 'the form and everything holding it stay shown (never display:none)');
    ok(hidden(ed.getElementById('sitenav')) && hidden(ed.getElementById('aside')) && hidden(ed.querySelector('.cco_templateless_template')) && hidden(ed.getElementById('gb-widget-1')), 'site menu, side content, Back-to bar and chat button are hidden');
    ok(!hidden(ed.getElementById('rc')), 'a reCAPTCHA challenge is never hidden');
    ok(!hidden(ed.querySelector('.js-recaptcha-wrapper')), 'the reCAPTCHA spot in the form stays');
    ok(ed.getElementById('cf-embed-pp') && /new tab/.test(ed.getElementById('cf-embed-pp').textContent), 'PayPal choice gets a link to the full donate page');
    ok(!/display:\s*none[^}]*userform-form|userform-form[^{]*\{[^}]*display:\s*none/.test(ed.getElementById('cf-embed-style').textContent), 'embed styles never hide a form');

    var FT = '<!doctype html><html><head></head><body><div id="header">menu</div><div id="content"><div id="BodyContainer" class="wrapper"><div id="co_content_container"><article><div id="formContainer"><form id="7606745" class="userform-form"><input id="input_1"></form></div></article></div></div></div><div id="footer">f</div></body></html>';
    var ft = new JSDOM(FT, { url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7606745/jewish/x.htm#cf-embed', runScripts: 'outside-only', pretendToBeVisual: true });
    ft.window.eval(esrc); await wait(300);
    var ftHidden = function (el) { return ft.window.getComputedStyle(el).display === 'none'; };
    ok(!ftHidden(ft.window.document.getElementById('BodyContainer')) && !ftHidden(ft.window.document.getElementById('formContainer')) && ftHidden(ft.window.document.getElementById('header')), 'full-template form page (contest, mailing list): form shown, site header hidden');

    console.log('riverside: pages that must load nothing');
    var quiet = [
      ['https://www.jewishriverside.com/', 'site home'],
      ['https://www.jewishriverside.com/article.asp?aid=4194665', 'donate page'],
      ['https://www.jewishriverside.com/article.asp?aid=75533870', 'look-alike aid'],
      ['https://www.jewishriverside.com/templates/ArticleCcoResponse/aid/' + DRAFT, 'response page']
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
