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


/* A live-shaped stub of the ChabadOne donation form on page 7553387, built from the field
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
  '<form id="7553387" class="userform-form"><ul>' +
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
  '<script>(function(){var f=document.getElementById("7553387");window.__clicks=0;window.__submitted=null;' +
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
    var DRAFT = '7553387';
    console.log('riverside: draft Chanukah page');
    var r = await load('riverside', 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/' + DRAFT + '/jewish/Draft.htm');
    ok(projectRequests(r).length === 1 && /riverside-footer\/chanukah-2026\.js\?v=/.test(projectRequests(r)[0]), 'loader fetched chanukah-2026.js with version stamp');
    ok(r.d.getElementById('cf26'), 'template rendered');
    ok(!r.d.getElementById('cf26-cover'), 'cover removed after render');
    ok(r.errors.length === 0, 'no console errors ' + (r.errors.length ? JSON.stringify(r.errors) : ''));
    ok(r.logs.some(function (l) { return /\[riverside-footer\].*aid 7553387 -> chanukah-2026\.js/.test(l); }), 'loader log line');
    ok(r.logs.some(function (l) { return /footer payload executing/.test(l); }), 'project log line');
    ['cf-top', 'cf-event', 'cf-directions', 'cf-partners', 'cf-about', 'cf-news', 'cf-guide', 'cf-share'].forEach(function (id) {
      ok(r.d.getElementById(id), 'section #' + id);
    });
    var gTitles = [].map.call(r.d.querySelectorAll('#cf-guide .cf-gc h3'), function (h) { return h.textContent; });
    ok(gTitles.join('|') === 'What Is Chanukah?|How to Light the Menorah|How to Celebrate Chanukah|Dreidel, Latkes and Doughnuts', 'four guide cards (' + gTitles.join('|') + ')');
    var gImgs = [].map.call(r.d.querySelectorAll('#cf-guide .cf-gc img'), function (i) { return i.getAttribute('src').replace(PAGES_BASE, ''); });
    ok(gImgs.join(',') === 'g-guide.jpg,g-light.jpg,g-celebrate.jpg,g-dreidel.jpg', 'guide cards use our event photos (' + gImgs.join(',') + ')');
    ok(fs.readdirSync(ROOT).filter(function (f) { return /^g-.*\.jpg$/.test(f); }).length === 9, 'nine guide photos are in the repo');
    var hv = r.d.querySelector('#cf-top .cf-vid video');
    ok(hv && hv.getAttribute('src') === PAGES_BASE + 'festival-hero.mp4', 'hero video points at festival-hero.mp4 in this repo (' + (hv && hv.getAttribute('src')) + ')');
    ok(hv && hv.muted && hv.hasAttribute('playsinline') && hv.loop, 'hero video is muted, loops and plays inline');
    ok(hv && hv.poster === PAGES_BASE + 'festival-hero-poster.jpg', 'hero has a still image while the video loads');
    ok(fs.existsSync(path.join(ROOT, 'festival-hero.mp4')) && fs.existsSync(path.join(ROOT, 'festival-hero-poster.jpg')), 'video and still are in the repo');
    var rsvp = [].filter.call(r.d.querySelectorAll('#cf26 a'), function (a) { return /rsvp/i.test(a.textContent); });
    ok(!r.d.getElementById('cf-rsvp') && rsvp.length === 1 && rsvp[0].href === 'https://www.facebook.com/events/1651125113077350/',
      'one RSVP button, to the Facebook event (brief Nov 5)');
    ok(!/become a sponsor|your name here|grand menorah sponsors|festival sponsors/i.test(r.d.getElementById('cf26').textContent), 'no sponsor tiers or sponsor button');
    ok(r.d.querySelectorAll('#cf-partners .cf-sp').length === 6, 'the six community partners are shown (brief Nov 5)');
    ok(/Chabad at UCR/.test(r.d.getElementById('cf-partners').textContent) && !/Chabad of UCR/.test(r.d.getElementById('cf26').textContent), 'written as Chabad at UCR');
    ok(fs.existsSync(path.join(ROOT, 'chabad-jcc-logo-white-gold.png')), 'organizer logo is in the repo');
    var nImgs = [].map.call(r.d.querySelectorAll('#cf-news .cf-nc img'), function (i) { return i.getAttribute('src').replace(PAGES_BASE, ''); });
    ok(nImgs.length === 4 && nImgs.every(function (n) { return fs.existsSync(path.join(ROOT, n)); }), 'every news card has a thumbnail in the repo (' + nImgs.join(',') + ')');
    ok(!/riversideca\.gov/.test(r.d.getElementById('cf-news').innerHTML), 'dead City of Riverside link removed');
    var kids = [].slice.call(r.d.getElementById('cf26').children).map(function (e) { return e.className.split(' ')[0]; });
    ok(kids[kids.length - 2] === 'cf-flysec' && kids[kids.length - 1] === 'cf-foot', 'flyer download sits right before the footer (' + kids.slice(-3).join(' > ') + ')');
    ok(!r.d.querySelector('#cf-event .cf-flyer'), 'flyer no longer in the event section');
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
    ok(heroBtns.join('|') === 'Add to Calendar|Share|RSVP on Facebook', 'top buttons: Add to Calendar, Share, RSVP on Facebook (' + heroBtns.join('|') + ')');
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
    var hlImgs = [].map.call(r.d.querySelectorAll('#cf-event .cf-hl-card img'), function (i) { return i.getAttribute('src').replace(PAGES_BASE, ''); });
    ok(hlImgs.join(',') === 'hl-menorah.jpg,hl-food.jpg,hl-music.jpg,hl-family.jpg', 'four highlight cards use photos (' + hlImgs.join(',') + ')');
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

    console.log('riverside: social links go to the festival pages');
    var shareA = [].map.call(r.d.querySelectorAll('#cf-share a'), function (a) { return a.textContent.trim() + '>' + a.getAttribute('href'); });
    ok(!shareA.some(function (t) { return /^Follow on/.test(t); }), 'no Follow buttons in the share section (brief Nov 5)');
    var waA = [].filter.call(r.d.querySelectorAll('#cf-share a'), function (a) { return /wa\.me/.test(a.href); })[0];
    ok(waA && /chanukahfestival\.org%2F%3Futm_source%3Dwhatsapp/i.test(waA.href), 'WhatsApp invite carries the tagged ChanukahFestival.org link');
    ok(!/[\u2013\u2014]/.test(r.d.getElementById('cf26').querySelector('.cf-hero').textContent), 'no dashes in the hero copy');
    var allA = [].map.call(r.d.querySelectorAll('#cf26 a'), function (a) { return a.getAttribute('href') || ''; }).join(' ');
    ok(!/instagram\.com\/jewishriverside|facebook\.com\/jewishriverside/i.test(allA), 'no links to the Jewish Riverside social pages');
    ok(/@chanukahfestival/.test(r.d.querySelector('.cf-foot').textContent), 'footer shows @chanukahfestival');

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
    var dz = await load('riverside', DPAGE, { shell: donateShell(), wait: 700 });
    ok(dz.d.getElementById('cf26') && dz.errors.length === 0, 'page renders with the form present, no errors ' + JSON.stringify(dz.errors));
    ok(dz.d.getElementById('7553387') && dz.d.getElementById('7553387').closest('.cco_templatelates_content'), 'native form left in place (not moved)');
    var css = dz.d.getElementById('cf26-style').textContent;
    ok(/\.cco_templatelates_content\{position:absolute !important;left:-10000px/.test(css) && !/\.cco_templatelates_content[^{]*\{display:none/.test(css), 'native page parked off-screen, never display:none');
    await donateFlow(dz, false);
    ok(dz.w.__clicks === 0 && /card/i.test(dz.d.querySelector('.cf-dm-err').textContent), 'card left empty: stopped in the pop-up, form not touched (' + dz.d.querySelector('.cf-dm-err').textContent + ')');
    var dv = await load('riverside', DPAGE, { shell: donateShell(), wait: 700 });
    await donateFlow(dv, '4111');
    ok(dv.w.__clicks === 1, 'form refuses the card: native submit clicked once (' + dv.w.__clicks + ')');
    ok(/card details/i.test(dv.d.querySelector('.cf-dm-err').textContent), 'form refuses the card: donor told to check card details (' + dv.d.querySelector('.cf-dm-err').textContent + ')');
    ok(!dv.d.querySelector('.cf-dm-next').disabled, 'form refuses the card: button released for a retry');

    var dg = await load('riverside', DPAGE, { shell: donateShell(), wait: 700 });
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

    var dd = await load('riverside', DPAGE, { shell: donateShell(), wait: 700 });
    dd.w.__decline = true;
    await donateFlow(dd, true);
    await wait(1500);
    ok(/declined/i.test(dd.d.querySelector('.cf-dm-err').textContent), 'decline: the decline message is shown (' + dd.d.querySelector('.cf-dm-err').textContent + ')');
    ok(!dd.d.querySelector('.cf-dm-next').disabled, 'decline: button released');
    dd.d.querySelector('.cf-dm-next').dispatchEvent(new dd.w.MouseEvent('click', { bubbles: true }));
    await wait(1200);
    ok(dd.w.__clicks === 2 && /Thank you/.test(dd.d.querySelector('.cf-dm-done').textContent), 'retry after a decline: stale decline text cleared, second attempt succeeds');

    var nf = await load('riverside', DPAGE, { wait: 400 });
    var opened = null; nf.w.open = function (u) { opened = u; };
    nf.d.querySelector('.cf-nav .cf-don').dispatchEvent(new nf.w.MouseEvent('click', { bubbles: true }));
    ok(opened === '/article.asp?aid=4194665' && !nf.d.querySelector('.cf-dm'), 'no form on the page: Donate opens the donate page instead');

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
