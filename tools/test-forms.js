/* Tests for festival-forms.js (Menorah Contest, Dreidel Contest, Mailing List) with a fake
   Apps Script, plus the Guess page (dreidel-2026.js) using it.
   Run from the repo root: node tools/test-forms.js */
'use strict';
var fs = require('fs'), path = require('path');
var JSDOM = require('jsdom').JSDOM;
var ROOT = path.join(__dirname, '..');
var SRC = fs.readFileSync(path.join(ROOT, 'festival-forms.js'), 'utf8');
var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log('  ok   ' + m); } else { fail++; console.log('  FAIL ' + m); } }
function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

function page(opts) {
  opts = opts || {};
  var dom = new JSDOM(opts.html || '<!doctype html><html><head></head><body><p>festival</p></body></html>',
    { url: opts.url || 'https://chanukahfestival.org/', runScripts: 'dangerously', pretendToBeVisual: true });
  var w = dom.window, T = { posts: [], errors: [] };
  w.console.log = function () {}; w.console.warn = function () {};
  w.console.error = function () { T.errors.push([].join.call(arguments, ' ')); };
  w.addEventListener('error', function (e) { T.errors.push(e.message); });
  w.fetch = function (u, o) {
    var b = JSON.parse(o.body); T.posts.push({ url: u, body: b, ct: o.headers['Content-Type'] });
    if (opts.fail) return Promise.reject(new Error('Failed to fetch'));
    var r = opts.reply || { ok: true, emailed: b.kind !== 'mailing' };
    return Promise.resolve({ json: function () { return Promise.resolve(r); } });
  };
  if (opts.before) opts.before(w);
  var sc = w.document.createElement('script'); sc.textContent = opts.src || SRC; w.document.head.appendChild(sc);
  if (opts.after) { var s2 = w.document.createElement('script'); s2.textContent = opts.after; w.document.body.appendChild(s2); }
  T.w = w; T.d = w.document;
  T.click = function (e) { e.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true })); };
  T.byLabel = function (root, text) {
    var labs = [].filter.call(root.querySelectorAll('.cff-fld'), function (l) { var s = l.querySelector('.cff-lab'); return s && s.textContent.replace(/ \*$/, '') === text && l.offsetParent !== undefined; });
    return labs.map(function (l) { return l.querySelector('input,select,textarea'); });
  };
  T.set = function (e, v) { e.value = v; e.dispatchEvent(new w.Event('input', { bubbles: true })); e.dispatchEvent(new w.Event('change', { bubbles: true })); };
  T.tick = function (root, text) {
    var l = [].filter.call(root.querySelectorAll('.cff-tick'), function (x) { return x.textContent === text; })[0];
    var c = l.querySelector('input'); c.checked = !c.checked; c.dispatchEvent(new w.Event('change', { bubbles: true }));
  };
  T.go = function (root) { T.click(root.querySelector('.cff-ft .cff-btn')); };
  T.err = function (root) { return root.querySelector('.cff-err').textContent; };
  return T;
}

(async function () {
  console.log('setup');
  var t = page();
  ok(t.w.CFForms.ready === true && t.errors.length === 0, 'ready with the Apps Script URL filled in');
  ok(/AKfycbxJDFJg_llgI5vqnwbIlStreWtDEL_4q4SG3joSWfXL9lbsn7ogu1XqjVEh4kTPkrHcGg\/exec/.test(SRC) && !/sk_(test|live)_|rk_(test|live)_/.test(SRC), 'same web app as donations; no secret keys');
  ok(t.w.CFForms.open('nope') === false, 'unknown form does nothing');

  console.log('Menorah Contest');
  t.w.CFForms.open('menorah');
  var ov = t.d.querySelector('.cff-ov');
  ok(ov && /Menorah Contest/.test(ov.querySelector('.cff-hd b').textContent) && /Nine branches including the shamash/.test(ov.textContent), 'opens with the contest rules');
  t.d.documentElement.style.setProperty('font-size', '10px');
  var mLabS = t.w.getComputedStyle(ov.querySelector('.cff-lab'));
  var mInS = t.w.getComputedStyle(ov.querySelector('.cff-in'));
  ok(mLabS.fontSize === '16px' && mLabS.fontWeight === '600', 'menorah form labels are 16px and weight 600, even if the root is 10px');
  ok(mInS.fontSize === '16px', 'menorah form inputs are 16px');
  t.go(ov);
  ok(/Your first name/.test(t.err(ov)) && t.posts.length === 0, 'empty: asks for your first name, nothing sent');
  t.set(t.byLabel(ov, 'Your first name')[0], 'Rivka'); t.set(t.byLabel(ov, 'Your last name')[0], 'Gold');
  t.set(t.byLabel(ov, 'Email')[0], 'rivka@example.com'); t.set(t.byLabel(ov, 'Phone')[0], '951-555-0111');
  var count = t.byLabel(ov, 'How many people are you entering?')[0];
  var ents = ov.querySelectorAll('.cff-ent');
  ok(ents.length === 4 && [].every.call(ents, function (e) { return e.style.display === 'none'; }), 'four entrant blocks, hidden until a number is picked');
  t.set(count, '2 people');
  ok(ents[0].style.display === '' && ents[1].style.display === '' && ents[2].style.display === 'none', 'picking 2 shows entrants 1 and 2');
  t.go(ov);
  ok(/First name/.test(t.err(ov)) && t.posts.length === 0, 'entrant name missing: stopped');
  var e1 = ents[0], e2 = ents[1];
  t.set(e1.querySelectorAll('input')[0], 'Eli'); t.set(e1.querySelectorAll('input')[1], 'Gold'); t.set(e1.querySelector('select'), '7'); t.set(e1.querySelectorAll('input')[2], 'Lego Lights');
  t.set(e2.querySelectorAll('input')[0], 'Noa'); t.set(e2.querySelectorAll('input')[1], 'Gold');
  t.go(ov);
  ok(/Age/.test(t.err(ov)), 'entrant 2 age missing: stopped');
  ok([].map.call(e2.querySelector('select').options, function (o) { return o.text; }).join('|') === 'Please select|3 or under|4|5|6|7|8|9|10|11|12|13–17|18 and up', 'age choices match the ChabadOne form');
  t.set(e2.querySelector('select'), '4');
  t.go(ov); await wait(30);
  var p = t.posts[0];
  ok(p && p.ct === 'text/plain;charset=utf-8' && p.body.action === 'form' && p.body.kind === 'menorah', 'sent to Apps Script as a menorah entry');
  ok(p.body.entrants.length === 2 && p.body.entrants[0].title === 'Lego Lights' && p.body.entrants[1].age === '4' && p.body.phone === '951-555-0111' && p.body.website === '', 'two entrants with ages and title, trap empty');
  ok(/You’re registered, Rivka!/.test(ov.textContent) && /5:45–6:15 PM/.test(ov.textContent) && /on its way to rivka@example\.com/.test(ov.textContent), 'thank-you with drop-off time and email note');
  ok(ov.querySelectorAll('.cff-follow a[target="_blank"][aria-label]').length === 5 && /announce the winners at the festival between 7:45 and 8:00 PM/.test(ov.textContent) && /Follow us for photos and more from the festival/.test(ov.textContent) && !/after the festival/.test(ov.textContent), 'menorah pop-up thank-you: winners at the festival between 7:45 and 8:00 PM, 5 follow buttons');
  t.click(ov.querySelector('.cff-ft .cff-btn'));
  ok(!ov.parentNode && t.d.documentElement.style.overflow === '', 'Close removes the pop-up');

  console.log('Dreidel Contest');
  t.w.CFForms.open('dreidel');
  ov = t.d.querySelector('.cff-ov');
  var dLabS = t.w.getComputedStyle(ov.querySelector('.cff-lab'));
  var dTickS = t.w.getComputedStyle(ov.querySelector('.cff-tick'));
  var dBoxS = t.w.getComputedStyle(ov.querySelector('.cff-tick input'));
  var dLegS = t.w.getComputedStyle(ov.querySelector('.cff-set legend'));
  ok(dLabS.fontSize === '16px' && dLabS.fontWeight === '600' && dLegS.fontSize === '16px', 'dreidel form labels and legends are 16px and weight 600');
  ok(dTickS.fontSize === '17px' && dBoxS.width === '22px' && dBoxS.height === '22px', 'dreidel checkbox options are 17px with a 22px box');
  t.set(t.byLabel(ov, 'First name')[0], 'Sam'); t.set(t.byLabel(ov, 'Last name')[0], 'Ortiz');
  t.set(t.byLabel(ov, 'Phone number')[0], '951-555-0122'); t.set(t.byLabel(ov, 'Email')[0], 'sam@example.com');
  t.set(t.byLabel(ov, 'How many dreidels are there?')[0], '412');
  t.go(ov);
  ok(/past Chanukah experience/.test(t.err(ov)), 'unanswered question: stopped');
  t.tick(ov, 'Other (please specify)');
  var otherBoxes = [].filter.call(ov.querySelectorAll('.cff-set .cff-fld'), function (l) { return l.style.display !== 'none'; });
  ok(otherBoxes.length === 1, 'ticking Other shows its text box');
  t.set(t.byLabel(ov, 'What is your favorite part of the Chanukah Festival?')[0], 'The music');
  t.tick(ov, 'I love the Chanukah Festival'); t.tick(ov, 'Social media');
  t.go(ov);
  ok(/Other/.test(t.err(ov)), 'Other ticked but empty: stopped');
  t.set(otherBoxes[0].querySelector('input'), 'Work party');
  t.tick(ov, 'I celebrate Chanukah');
  t.tick(ov, 'I would like to receive news and updates by email');
  t.go(ov); await wait(30);
  p = t.posts[1].body;
  ok(p.kind === 'dreidel' && p.guess === '412' && p.past.join('|') === 'I celebrate Chanukah|Other: Work party' && p.connection[0] === 'I love the Chanukah Festival' && p.heard[0] === 'Social media' && p.updates === true && p.favorite === 'The music', 'dreidel answers sent, Other text included');
  ok(/Thanks for your guess, Sam!/.test(ov.textContent) && /Your guess: 412/.test(ov.textContent), 'thank-you shows the guess');
  var fo = [].map.call(ov.querySelectorAll('.cff-follow a'), function (a) { return a.getAttribute('href') + '|' + a.target + '|' + a.getAttribute('rel') + '|' + (a.getAttribute('aria-label') || ''); });
  ok(fo.length === 5 && /^https:\/\/www\.facebook\.com\/JewishRiverside\|_blank\|noopener\|Follow /.test(fo[0]) && /^https:\/\/x\.com\/Jewishriverside\|/.test(fo[2]) && /announce the winner at the festival between 7:45 and 8:00 PM/.test(ov.textContent) && /Follow us for photos and more from the festival/.test(ov.textContent) && !/after the festival/.test(ov.textContent),
    'dreidel thank-you: winner at the festival between 7:45 and 8:00 PM, follow buttons (new tab, labeled)');
  ok(!/300 guests/.test(ov.textContent), 'dreidel pop-up thank-you: no first-300-guests gift line');
  t.w.CFForms.close();

  console.log('Mailing List');
  t.w.CFForms.open('mailing');
  ov = t.d.querySelector('.cff-ov');
  t.set(t.byLabel(ov, 'First name')[0], 'Dina'); t.set(t.byLabel(ov, 'Last name')[0], 'Katz'); t.set(t.byLabel(ov, 'Email')[0], 'dina@example.com');
  t.tick(ov, 'Yes, I’d love a free challah hand delivered to my door');
  ok(t.byLabel(ov, 'State')[0].value === 'California', 'state starts as California (as on the ChabadOne form)');
  t.go(ov);
  ok(/Address/.test(t.err(ov)) && t.posts.length === 2, 'challah without address: stopped');
  t.set(t.byLabel(ov, 'Address')[0], '1 Main St'); t.set(t.byLabel(ov, 'City')[0], 'Riverside'); t.set(t.byLabel(ov, 'ZIP code')[0], '92501');
  t.tick(ov, 'Shabbat Dinners'); t.tick(ov, 'Hebrew School');
  var heard = t.byLabel(ov, 'How did you hear about us?')[0];
  ok(heard.options.length === 9, 'how-heard list has the 8 ChabadOne choices');
  t.set(heard, 'Other');
  t.set(t.byLabel(ov, 'Please tell us more')[0], 'A neighbor');
  t.go(ov); await wait(30);
  p = t.posts[2].body;
  ok(p.kind === 'mailing' && p.challah === true && p.addr1 === '1 Main St' && p.state === 'California' && p.interests.join('|') === 'Hebrew School|Shabbat Dinners' && p.heard === 'Other' && p.more === 'A neighbor', 'mailing list entry sent');
  ok(/You’re on the list, Dina!/.test(ov.textContent) && /free challah/.test(ov.textContent), 'thank-you mentions the challah');
  t.w.CFForms.close();

  console.log('Volunteer (chanukahfestival.org/volunteer)');
  t.w.CFForms.open('volunteer');
  ov = t.d.querySelector('.cff-ov');
  var vlab = [].map.call(ov.querySelectorAll('.cff-lab, legend'), function (x) { return x.textContent; }).join('|');
  ok(ov && /Volunteer With Us/.test(ov.querySelector('.cff-hd b').textContent) && /^First name \*\|Last name \*\|Email \*\|Phone \*\|How would you like to help\? \*\|Notes/.test(vlab), 'opens with his fields: name, email, phone, roles, notes (' + vlab + ')');
  var vroles = [].map.call(ov.querySelectorAll('.cff-tick'), function (x) { return x.textContent; }).join('|');
  ok(vroles === 'Early setup (12–4 PM)|Setup (from about 4 PM)|Gift tables|Kids’ activities|Food and latkes|Greeting and info|Cleanup (after 8 PM)|Wherever I’m needed', 'his eight roles, in his order');
  var n0 = t.posts.length;
  t.set(t.byLabel(ov, 'First name')[0], 'Maya'); t.set(t.byLabel(ov, 'Last name')[0], 'Cohen');
  t.set(t.byLabel(ov, 'Email')[0], 'maya@example.com'); t.set(t.byLabel(ov, 'Phone')[0], '951-555-0100');
  t.go(ov); await wait(30);
  ok(t.posts.length === n0 && /at least one/.test(t.err(ov)), 'no role chosen: not sent, asks for one');
  t.tick(ov, 'Early setup (12–4 PM)'); t.tick(ov, 'Food and latkes');
  t.set(t.byLabel(ov, 'Notes')[0], 'I can come at 4.');
  t.go(ov); await wait(50);
  var vp = t.posts[t.posts.length - 1].body;
  ok(vp.action === 'form' && vp.kind === 'volunteer' && vp.first === 'Maya' && vp.phone === '951-555-0100' && vp.roles.join('|') === 'Early setup (12–4 PM)|Food and latkes' && vp.notes === 'I can come at 4.' && vp.website === '', 'sent to the Sheet as a volunteer entry, same as his page');
  ok(/Thank you, Maya!/.test(ov.textContent) && /volunteer team/.test(ov.textContent), 'thank-you shows');
  t.w.CFForms.close();
  var vf = page({ before: function (w) {
    var rs = [{ ok: false, error: 'Unknown form.' }, { ok: true }];
    w.fetch = function (u, o) { vf_posts.push(JSON.parse(o.body)); var r = rs.shift(); return Promise.resolve({ json: function () { return Promise.resolve(r); } }); };
  } });
  var vf_posts = [];
  vf.w.CFForms.open('volunteer'); ov = vf.d.querySelector('.cff-ov');
  vf.set(vf.byLabel(ov, 'First name')[0], 'Maya'); vf.set(vf.byLabel(ov, 'Last name')[0], 'Cohen');
  vf.set(vf.byLabel(ov, 'Email')[0], 'maya@example.com'); vf.set(vf.byLabel(ov, 'Phone')[0], '951-555-0100');
  vf.tick(ov, 'Gift tables'); vf.go(ov); await wait(80);
  ok(vf_posts.length === 2 && vf_posts[1].kind === 'mailing' && vf_posts[1].interests.join('|') === 'Volunteering|Volunteer: Gift tables' && /Thank you, Maya!/.test(ov.textContent), 'Apps Script without the volunteer kind: saved as a Mailing List entry (same as his page)');

  console.log('problems');
  var se = page({ reply: { ok: false, error: 'Too many attempts. Please wait a little while and try again.' } });
  se.w.CFForms.open('mailing'); ov = se.d.querySelector('.cff-ov');
  se.set(se.byLabel(ov, 'First name')[0], 'A'); se.set(se.byLabel(ov, 'Last name')[0], 'B'); se.set(se.byLabel(ov, 'Email')[0], 'a@b.co');
  se.go(ov); await wait(30);
  ok(/Too many attempts/.test(se.err(ov)) && !ov.querySelector('.cff-done'), 'server message shown, form kept');
  var nf = page({ fail: true });
  nf.w.CFForms.open('mailing'); ov = nf.d.querySelector('.cff-ov');
  nf.set(nf.byLabel(ov, 'First name')[0], 'A'); nf.set(nf.byLabel(ov, 'Last name')[0], 'B'); nf.set(nf.byLabel(ov, 'Email')[0], 'a@b.co');
  nf.go(ov); await wait(30);
  ok(/couldn.t send that/.test(nf.err(ov)) && !ov.querySelector('.cff-btn').disabled, 'offline: plain message, button released');

  console.log('Guess page (dreidel-2026.js)');
  var DSRC = fs.readFileSync(path.join(ROOT, 'dreidel-2026.js'), 'utf8');
  var GUESS = '<!doctype html><html><head></head><body><h1 class="article-header__title">Dreidel Guessing Contest</h1>' +
    '<div id="formContainer"><form class="userform-form" id="5738793"><ul><li class="form-line"><input id="first_9"></li>' +
    '<li class="form-line" id="id_17"><textarea></textarea></li></ul><button id="input_2">Submit</button></form></div></body></html>';
  var g = page({ url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5738793/jewish/Guess.htm', html: GUESS, after: DSRC });
  await wait(50);
  var own = g.d.getElementById('dg26-own'), fc = g.d.getElementById('formContainer');
  ok(g.d.getElementById('dg26-hero') && own && own.querySelector('.cff-inline'), 'Guess page: hero plus our own dreidel form');
  ok(fc && fc.parentNode && /left:\s*-10000px/.test(fc.style.cssText) && !/display:\s*none/.test(fc.style.cssText) && g.d.getElementById('5738793'), 'ChabadOne form parked off-screen, not removed or display:none');
  g.set(g.byLabel(own, 'First name')[0], 'Lea'); g.set(g.byLabel(own, 'Last name')[0], 'Roth');
  g.set(g.byLabel(own, 'Phone number')[0], '951-555-0133'); g.set(g.byLabel(own, 'Email')[0], 'lea@example.com');
  g.set(g.byLabel(own, 'How many dreidels are there?')[0], '300');
  g.tick(own, 'I celebrate Chanukah'); g.tick(own, 'I am Jewish'); g.tick(own, 'Email');
  g.set(g.byLabel(own, 'What is your favorite part of the Chanukah Festival?')[0], 'Latkes');
  g.go(own); await wait(50);
  ok(g.posts.length === 1 && g.posts[0].body.kind === 'dreidel' && g.posts[0].body.guess === '300', 'Guess page entry sent to the Sheet');
  ok(g.d.getElementById('dg26') && /Thanks for your guess!/.test(g.d.getElementById('dg26').textContent) && !g.d.getElementById('dg26-own') && !g.d.getElementById('dg26-hero'), 'the designed thank-you card replaces the form');
  ok(g.errors.length === 0, 'no errors on the Guess page ' + JSON.stringify(g.errors));
  var off = page({ url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5738793/jewish/Guess.htm', html: GUESS,
    src: SRC.replace(/ENDPOINT: '[^']*',/, "ENDPOINT: '',"), after: DSRC });
  await wait(50);
  ok(!off.d.getElementById('dg26-own') && !/-10000px/.test(off.d.getElementById('formContainer').style.cssText), 'if our form is not set up, the ChabadOne form stays as it was');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(function (e) { console.error(e); process.exit(1); });
