/* Festival sign-up forms - Chanukah Festival (jewishriverside.com / chanukahfestival.org)

   Our own versions of three ChabadOne forms. Entries go to the Google Sheet through the same
   Apps Script web app as the Stripe donations (one tab per form), not to ChabadOne.
     menorah  Menorah Contest (ChabadOne aid 7606745)  - confirmation email
     dreidel  Dreidel Guessing Contest (aid 5738793)   - confirmation email
     mailing  Join Our Mailing List (aid 5333083)      - no email
   The ChabadOne pages themselves stay as they are, except the Guess page (dreidel-2026.js),
   which shows this form in place of the ChabadOne one.

   window.CFForms.open(kind)              pop-up (festival page)
   window.CFForms.mount(kind, host, opts) on the page itself; opts.onDone(entry) when sent
   window.CFForms.ready                   true once ENDPOINT is filled in
   Public file: no secrets here. */
(function () {
  'use strict';
  if (window.CFForms && window.CFForms.version) return;

  var VERSION = 'festival-forms 2026-11-12a';

  var CFG = {
    /* Same Google Apps Script web app as stripe-donate.js */
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbxJDFJg_llgI5vqnwbIlStreWtDEL_4q4SG3joSWfXL9lbsn7ogu1XqjVEh4kTPkrHcGg/exec',
    PHONE: '951-222-2005'
  };

  /* Preview hook (Claude preview only): { demo: true, onEvent: fn }. Never set on the site. */
  var PV = window.CFFORMS_PREVIEW || null;
  var DEMO = !!(PV && PV.demo);
  var READY = DEMO || /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(CFG.ENDPOINT);

  var NAVY = '#0f2730', DEEP = '#0b1f27', TEAL = '#3cc7b4', GOLD = '#e9b949', MUTED = '#c9d6da';
  /* Official social pages (follow to see the winner announcement). */
  var FOLLOW = [
    ['Facebook', 'https://www.facebook.com/JewishRiverside', 'Follow Chabad Jewish Riverside on Facebook (opens in a new tab)'],
    ['Instagram', 'https://www.instagram.com/jewishriverside', 'Follow Chabad Jewish Riverside on Instagram (opens in a new tab)'],
    ['X', 'https://x.com/Jewishriverside', 'Follow Chabad Jewish Riverside on X (opens in a new tab)'],
    ['Festival on Facebook', 'https://www.facebook.com/chanukahfestival/', 'Follow the Chanukah Festival on Facebook (opens in a new tab)'],
    ['Festival on Instagram', 'https://www.instagram.com/chanukahfestival/', 'Follow the Chanukah Festival on Instagram (opens in a new tab)']
  ];

  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';

  /* The questions, word for word from the ChabadOne forms (Nov 9 2026). */
  var AGES = ['3 or under', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13–17', '18 and up'];
  var FORMS = {
    menorah: {
      title: 'Menorah Contest', sub: 'All ages. Free to enter. Register By Dec 4.', button: 'Register',
      rules: ['Open to all ages, in two groups: 12 and under, and 13 and up',
        'Free to enter. Register By Friday, Dec 4',
        'Nine branches including the shamash: eight in a straight line at an even height, with the shamash higher or lower',
        'No food. Bring a wax candle or oil',
        'It must stand on its own and must not break, fall or melt when lit',
        'One entry per person. Kids are the main builders of their menorah (adult help for safety is OK)',
        'Prizes: the best menorah wins the festival trophy, and the runners-up get great prizes, announced at the festival. Every child who enters gets a Chanukah gift',
        'Drop Off Monday, Dec 7, 5:45–6:15 PM at the Menorah Contest table (#15 on the festival map)']
    },
    dreidel: {
      title: 'Dreidel Guessing Contest', sub: 'Guess how many dreidels are in the jar. Win $180!', button: 'Send my guess',
      past: ['I celebrate Chanukah', 'I celebrated as a child', 'I have been to a friend’s Chanukah celebration',
        'I’ve been to the Chanukah Festival in the past', 'This is my first time experiencing Chanukah', 'Other (please specify)'],
      connection: ['I am Jewish', 'I have a Jewish parent/grandparent', 'I have Jewish friends', 'I have Jewish neighbors',
        'I love learning about other cultures', 'I love the Chanukah Festival', 'Other'],
      heard: ['Friend/Family', 'Billboard on the freeway', 'Social media', 'Email', 'Other']
    },
    mailing: {
      title: 'Join Our Mailing List', sub: 'Hear about the festival and everything else at Chabad.', button: 'Sign me up',
      intro: 'Get our weekly newsletter, holiday reminders and invitations to programs for every age, for the Jewish community of Riverside and beyond. Tell us what interests you, and we’ll keep you in the loop. You can unsubscribe anytime.',
      interests: ['Babies and Toddlers (Mommy & Munchkins)', 'Kids’ Programs and Camp Gan Israel', 'Hebrew School', 'Teens (CTeen)',
        'Bar / Bat Mitzvah', 'College Students (Chabad at UCR)', 'Young Professionals', 'Seniors', 'Shabbat Dinners',
        'Shabbat and Holiday Services', 'Holidays and Community Events', 'Adult Classes', 'Learning to Read Hebrew',
        'Women’s Programs', 'Mikvah', 'Volunteering'],
      heard: ['Friend or family', 'Chanukah Festival', 'Another Chabad event', 'Facebook or Instagram', 'Google search',
        'Chabad at UCR', 'Newspaper or news story', 'Other'],
      privacy: 'All information submitted to Chabad Jewish Community Center of Riverside is strictly confidential. We do not share it with anyone or any organization under any circumstances.'
    }
  };

  function log(m) { if (window.console) console.log('[' + VERSION + '] ' + m); }
  function emit(type, data) { if (PV && typeof PV.onEvent === 'function') { try { PV.onEvent(type, data); } catch (e) {} } }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(arguments[i]); return p; }
  var uid = 0;

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('cff-css')) return;
    var R = '.cff ';
    var rules = [
      '.cff-ov{position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147482600;background:rgba(5,15,20,.72);display:flex;align-items:center;justify-content:center;padding:3vh 14px}',
      '.cff-ov .cff-box{display:flex;flex-direction:column;width:100%;max-width:640px;max-height:94vh;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
      '.cff{font-family:' + BODY + ';font-size:16px;line-height:1.5;color:' + DEEP + ';text-align:left}',
      R + '*{box-sizing:border-box;margin:0;padding:0}',
      R + 'button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}',
      R + '.cff-hd{display:flex;align-items:center;gap:14px;padding:16px 18px 14px 22px;background:' + NAVY + ';color:#fff}',
      R + '.cff-hd b{display:block;font-family:' + DISP + ';font-size:1.2rem;line-height:1.25}',
      R + '.cff-hd span{display:block;font-size:.85rem;color:' + MUTED + '}',
      R + '.cff-x{margin-left:auto;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);color:#fff;font-size:22px;line-height:1;flex:none}',
      R + '.cff-body{flex:1;min-height:0;overflow-y:auto;padding:20px 22px 24px;-webkit-overflow-scrolling:touch}',
      '.cff-inline{background:#fff;border-radius:20px;max-width:680px;margin:0 auto 22px;box-shadow:0 8px 30px rgba(15,39,48,.12)}',
      '.cff-inline .cff-body{padding:24px 26px 28px}',
      R + '.cff-err{background:#fdecea;color:#8a1f12;border:1px solid #f4c4bd;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:.9rem}',
      R + '.cff-err:empty{display:none}',
      R + '.cff-p{color:#33474f;font-size:.95rem;margin-bottom:16px}',
      R + '.cff-small{color:#6b7f86;font-size:.8rem;margin-top:14px}',
      R + '.cff-rules{background:#f6fafb;border-radius:12px;padding:14px 16px;margin-bottom:18px}',
      R + '.cff-rules b{display:block;color:' + NAVY + ';margin-bottom:6px}',
      R + '.cff-rules ul{padding-left:18px;font-size:.88rem;color:#33474f}',
      R + '.cff-rules li{margin:3px 0}',
      R + '.cff-grid{display:flex;flex-wrap:wrap;gap:12px}',
      R + '.cff-fld{display:flex;flex-direction:column;gap:5px;flex:1 1 100%;min-width:0}',
      R + '.cff-fld.half{flex:1 1 calc(50% - 6px)}',
      R + '.cff-fld.third{flex:1 1 calc(33.33% - 8px)}',
      R + '.cff-lab{font-size:.8rem;font-weight:700;color:#4a5d64;letter-spacing:.02em}',
      R + '.cff-hint{font-size:.78rem;color:#7a8d93}',
      R + '.cff-in{width:100%;padding:12px 13px;font:inherit;font-size:1rem;color:' + NAVY + ';background:#fff;border:1.5px solid #d5e2e6;border-radius:10px;outline:none}',
      R + '.cff-in:focus{border-color:' + TEAL + ';box-shadow:0 0 0 3px rgba(60,199,180,.18)}',
      R + 'textarea.cff-in{min-height:70px;resize:vertical}',
      R + 'select.cff-in{appearance:auto}',
      R + '.cff-set{border:0;margin-top:6px;flex:1 1 100%}',
      R + '.cff-set legend{font-size:.8rem;font-weight:700;color:#4a5d64;margin-bottom:6px}',
      R + '.cff-tick{display:flex;align-items:flex-start;gap:10px;padding:6px 0;font-size:.95rem;color:' + NAVY + ';cursor:pointer}',
      R + '.cff-tick input{width:20px;height:20px;margin-top:2px;accent-color:' + TEAL + ';flex:none}',
      R + '.cff-cols{columns:2;column-gap:18px}',
      R + '.cff-cols .cff-tick{break-inside:avoid}',
      R + '.cff-ent{border:1.5px solid #e2ebee;border-radius:14px;padding:14px;margin-top:4px;flex:1 1 100%}',
      R + '.cff-ent h4{font-family:' + DISP + ';color:' + NAVY + ';font-size:1rem;margin-bottom:10px}',
      R + '.cff-sub{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:12px;padding:12px 14px;background:#f6fafb;border-radius:12px}',
      R + '.cff-trap{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}',
      R + '.cff-ft{display:flex;align-items:center;justify-content:flex-end;gap:12px;padding:12px 18px;border-top:1px solid #e6eef0}',
      '.cff-inline .cff-ft{border-top:0;padding:0 26px 26px;justify-content:stretch}',
      '.cff-inline .cff-ft .cff-btn{flex:1}',
      R + '.cff-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 26px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.02em;white-space:nowrap;background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(233,185,73,.25)}',
      R + '.cff-btn[disabled]{opacity:.6;cursor:wait}',
      R + '.cff-done{text-align:center;padding:24px 6px}',
      R + '.cff-done h3{font-family:' + DISP + ';font-size:1.35rem;color:' + NAVY + ';margin-bottom:8px}',
      R + '.cff-done p{color:#4a5d64;margin:8px auto;max-width:440px}',
      R + '.cff-done .cff-btn{margin-top:18px}',
      R + '.cff-follow{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:12px auto 6px;max-width:460px}',
      R + '.cff-fbtn{display:inline-flex;align-items:center;padding:9px 16px;border-radius:999px;border:1.5px solid ' + NAVY + ';color:' + NAVY + ';background:#fff;font-weight:700;font-size:.85rem;text-decoration:none;white-space:nowrap}',
      R + '.cff-fbtn:hover,' + R + '.cff-fbtn:focus{background:' + GOLD + ';border-color:' + GOLD + ';color:' + DEEP + '}',
      R + '.cff-ok{width:64px;height:64px;border-radius:50%;background:' + TEAL + ';color:#fff;font-size:2rem;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}',
      '@media (max-width:620px){.cff-ov{padding:0}.cff-ov .cff-box{height:100%;max-height:none;max-width:none;border-radius:0}' + R + '.cff-cols{columns:1}' + R + '.cff-fld.third{flex:1 1 calc(50% - 6px)}.cff-inline .cff-body{padding:20px 16px 22px}.cff-inline .cff-ft{padding:0 16px 22px}}'
    ];
    var st = document.createElement('style');
    st.id = 'cff-css';
    st.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- field builders ---------- */
  function field(label, type, o) {
    o = o || {};
    var w = el('label', 'cff-fld' + (o.half ? ' half' : '') + (o.third ? ' third' : ''));
    var i;
    if (type === 'select') {
      i = document.createElement('select');
      var ph = el('option', null, o.placeholder || 'Please select'); ph.value = '';
      i.appendChild(ph);
      (o.options || []).forEach(function (t) { var op = el('option', null, t); op.value = t; i.appendChild(op); });
    } else {
      i = document.createElement(type === 'textarea' ? 'textarea' : 'input');
      if (type !== 'textarea') i.type = type || 'text';
      if (o.placeholder) i.placeholder = o.placeholder;
    }
    i.className = 'cff-in';
    i.id = 'cff-' + (++uid);
    if (o.name) i.setAttribute('data-k', o.name);
    if (o.ac) i.setAttribute('autocomplete', o.ac);
    if (o.im) i.setAttribute('inputmode', o.im);
    if (o.max) i.maxLength = o.max;
    if (o.value) i.value = o.value;
    /* hint goes under the box, so boxes side by side stay on one line */
    add(w, el('span', 'cff-lab', label + (o.req ? ' *' : '')), i, o.hint ? el('span', 'cff-hint', o.hint) : null);
    return { w: w, i: i, req: !!o.req, label: label, v: function () { return i.value.trim(); } };
  }
  function tick(label, name) {
    var w = el('label', 'cff-tick');
    var c = document.createElement('input'); c.type = 'checkbox';
    if (name) c.setAttribute('data-k', name);
    add(w, c, el('span', null, label));
    return { w: w, c: c };
  }
  /* checkbox group; an option starting with "Other" reveals a text box */
  function group(legend, options, o) {
    o = o || {};
    var fs = el('fieldset', 'cff-set');
    fs.appendChild(el('legend', null, legend + (o.req ? ' *' : '')));
    var box = el('div', o.cols ? 'cff-cols' : null);
    var ticks = options.map(function (t) { var k = tick(t); box.appendChild(k.w); return { t: t, c: k.c }; });
    fs.appendChild(box);
    var other = null;
    var oT = ticks.filter(function (k) { return /^Other/.test(k.t); })[0];
    if (oT) {
      other = field('Other', 'text', { req: true, max: 120 });
      other.w.style.display = 'none';
      other.w.style.marginTop = '6px';
      fs.appendChild(other.w);
      oT.c.addEventListener('change', function () { other.w.style.display = oT.c.checked ? '' : 'none'; if (oT.c.checked) other.i.focus(); });
    }
    return {
      w: fs, req: !!o.req, label: legend,
      values: function () {
        return ticks.filter(function (k) { return k.c.checked; }).map(function (k) {
          return /^Other/.test(k.t) ? 'Other: ' + (other ? other.v() : '') : k.t;
        });
      },
      check: function () {
        var v = this.values();
        if (this.req && !v.length) return 'Please answer: ' + legend.replace(/[?:]$/, '') + '.';
        if (oT && oT.c.checked && !other.v()) { other.i.focus(); return 'Please tell us what “Other” means for: ' + legend.replace(/[?:]$/, '') + '.'; }
        return '';
      }
    };
  }

  /* ---------- the three forms ---------- */
  function buildMenorah(body) {
    var D = FORMS.menorah;
    var rules = el('div', 'cff-rules');
    var ul = el('ul');
    D.rules.forEach(function (r) { ul.appendChild(el('li', null, r)); });
    add(rules, el('b', null, 'Contest rules'), ul);
    var g = el('div', 'cff-grid');
    var f = {
      first: field('Your first name', 'text', { req: true, half: true, ac: 'given-name', max: 60, hint: 'Parent or guardian, if you’re registering kids' }),
      last: field('Your last name', 'text', { req: true, half: true, ac: 'family-name', max: 60 }),
      email: field('Email', 'email', { req: true, half: true, ac: 'email', max: 120, placeholder: 'ex: myname@example.com' }),
      phone: field('Phone', 'tel', { req: true, half: true, ac: 'tel', im: 'tel', max: 30 }),
      count: field('How many people are you entering?', 'select', { req: true, options: ['1 person', '2 people', '3 people', '4 people'] })
    };
    var entBox = el('div', 'cff-grid');
    entBox.style.flex = '1 1 100%';
    var ents = [];
    for (var n = 1; n <= 4; n++) {
      var e = el('div', 'cff-ent');
      var eg = el('div', 'cff-grid');
      var en = {
        first: field('First name', 'text', { req: true, half: true, max: 60, hint: n === 1 ? 'Entering yourself? Use your own name here.' : null }),
        last: field('Last name', 'text', { req: true, half: true, max: 60 }),
        age: field('Age', 'select', { req: true, half: true, options: AGES }),
        title: field('Menorah title', 'text', { half: true, max: 120, hint: 'Optional' }),
        w: e
      };
      add(eg, en.first.w, en.last.w, en.age.w, en.title.w);
      add(e, el('h4', null, 'Entrant ' + n), eg);
      e.style.display = 'none';
      entBox.appendChild(e);
      ents.push(en);
    }
    function howMany() { return parseInt(f.count.i.value, 10) || 0; }
    f.count.i.addEventListener('change', function () { ents.forEach(function (en, k) { en.w.style.display = k < howMany() ? '' : 'none'; }); });
    add(g, f.first.w, f.last.w, f.email.w, f.phone.w, f.count.w, entBox);
    add(body, rules, g);
    return {
      check: function () {
        var all = [f.first, f.last, f.email, f.phone, f.count];
        ents.slice(0, howMany()).forEach(function (en) { all.push(en.first, en.last, en.age); });
        return firstMissing(all) || emailBad(f.email);
      },
      data: function () {
        return { first: f.first.v(), last: f.last.v(), email: f.email.v(), phone: f.phone.v(),
          entrants: ents.slice(0, howMany()).map(function (en) { return { first: en.first.v(), last: en.last.v(), age: en.age.v(), title: en.title.v() }; }) };
      }
    };
  }

  function buildDreidel(body) {
    var D = FORMS.dreidel;
    var g = el('div', 'cff-grid');
    var f = {
      first: field('First name', 'text', { req: true, half: true, ac: 'given-name', max: 60 }),
      last: field('Last name', 'text', { req: true, half: true, ac: 'family-name', max: 60 }),
      phone: field('Phone number', 'tel', { req: true, half: true, ac: 'tel', im: 'tel', max: 30 }),
      email: field('Email', 'email', { req: true, half: true, ac: 'email', max: 120, placeholder: 'ex: myname@example.com' }),
      guess: field('How many dreidels are there?', 'text', { req: true, im: 'numeric', max: 40, placeholder: 'Your guess' })
    };
    var past = group('Which of the following best describes your past Chanukah experience?', D.past, { req: true });
    var fav = field('What is your favorite part of the Chanukah Festival?', 'textarea', { req: true, max: 600 });
    var conn = group('Tell us more about your Jewish connection:', D.connection, { req: true });
    var heard = group('How did you hear about the Chanukah Festival?', D.heard, { req: true });
    var upd = tick('I would like to receive news and updates by email');
    add(g, f.first.w, f.last.w, f.phone.w, f.email.w, f.guess.w, past.w, fav.w, conn.w, heard.w, upd.w);
    add(body, el('p', 'cff-p', 'How many dreidels are in the jar? Make your best guess for a chance to win $180! One entry per person. We’ll announce the winner after the festival on our social media and by email.'), g);
    return {
      check: function () {
        return firstMissing([f.first, f.last, f.phone, f.email, f.guess]) || emailBad(f.email) ||
          past.check() || firstMissing([fav]) || conn.check() || heard.check();
      },
      data: function () {
        return { first: f.first.v(), last: f.last.v(), email: f.email.v(), phone: f.phone.v(), guess: f.guess.v(),
          past: past.values(), favorite: fav.v(), connection: conn.values(), heard: heard.values(), updates: upd.c.checked };
      }
    };
  }

  function buildMailing(body) {
    var D = FORMS.mailing;
    var g = el('div', 'cff-grid');
    var f = {
      first: field('First name', 'text', { req: true, half: true, ac: 'given-name', max: 60 }),
      last: field('Last name', 'text', { req: true, half: true, ac: 'family-name', max: 60 }),
      email: field('Email', 'email', { req: true, ac: 'email', max: 120 })
    };
    var challah = tick('Yes, I’d love a free challah hand delivered to my door');
    var addr = el('div', 'cff-sub');
    var a = {
      addr1: field('Address', 'text', { req: true, ac: 'address-line1', max: 120 }),
      addr2: field('Apt, suite (optional)', 'text', { ac: 'address-line2', max: 60 }),
      city: field('City', 'text', { req: true, third: true, ac: 'address-level2', max: 60 }),
      state: field('State', 'text', { req: true, third: true, ac: 'address-level1', max: 40, value: 'California' }),
      zip: field('ZIP code', 'text', { req: true, third: true, ac: 'postal-code', im: 'numeric', max: 12 })
    };
    add(addr, el('span', 'cff-lab', 'Delivery address'), a.addr1.w, a.addr2.w, a.city.w, a.state.w, a.zip.w);
    addr.firstChild.style.flex = '1 1 100%';
    addr.style.display = 'none';
    challah.c.addEventListener('change', function () { addr.style.display = challah.c.checked ? '' : 'none'; });
    var phone = field('Phone', 'tel', { ac: 'tel', im: 'tel', max: 30 });
    var texts = tick('Yes, text me reminders about events');
    var bday = field('Birthday', 'text', { max: 40, hint: 'So we can wish you a happy birthday', placeholder: 'e.g. March 3' });
    var interests = group('I’m interested in:', D.interests, { cols: true });
    var heard = field('How did you hear about us?', 'select', { options: D.heard });
    var more = field('Please tell us more', 'text', { max: 300 });
    more.w.style.display = 'none';
    heard.i.addEventListener('change', function () { more.w.style.display = heard.i.value === 'Other' ? '' : 'none'; });
    var chSet = el('fieldset', 'cff-set'); add(chSet, el('legend', null, 'Free Challah'), challah.w);
    var txSet = el('fieldset', 'cff-set'); add(txSet, el('legend', null, 'Text Reminders'), texts.w);
    add(g, f.first.w, f.last.w, f.email.w, chSet, addr, phone.w, txSet, bday.w, interests.w, heard.w, more.w);
    add(body, el('p', 'cff-p', D.intro), g, el('p', 'cff-small', D.privacy));
    return {
      check: function () {
        var need = [f.first, f.last, f.email];
        if (challah.c.checked) need.push(a.addr1, a.city, a.state, a.zip);
        return firstMissing(need) || emailBad(f.email) || interests.check();
      },
      data: function () {
        return { first: f.first.v(), last: f.last.v(), email: f.email.v(), phone: phone.v(), challah: challah.c.checked,
          addr1: challah.c.checked ? a.addr1.v() : '', addr2: challah.c.checked ? a.addr2.v() : '', city: challah.c.checked ? a.city.v() : '',
          state: challah.c.checked ? a.state.v() : '', zip: challah.c.checked ? a.zip.v() : '', texts: texts.c.checked,
          birthday: bday.v(), interests: interests.values(), heard: heard.i.value, more: heard.i.value === 'Other' ? more.v() : '' };
      }
    };
  }

  function firstMissing(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].req && !list[i].v()) { try { list[i].i.focus(); } catch (e) {} return 'Please fill in: ' + list[i].label.replace(/\?$/, '') + '.'; }
    }
    return '';
  }
  function emailBad(f) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.v())) { try { f.i.focus(); } catch (e) {} return 'Please check your email address.'; }
    return '';
  }

  /* ---------- sending ---------- */
  function send(body) {
    if (DEMO) {
      return new Promise(function (res) { setTimeout(function () { res({ ok: true, emailed: body.kind !== 'mailing' }); }, 600); });
    }
    /* text/plain keeps this a "simple" request (no CORS preflight), which Apps Script needs */
    return fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { return r.json(); });
  }

  function thanksView(kind, d, res) {
    var v = el('div', 'cff-done');
    var title, lines;
    if (kind === 'menorah') {
      title = 'You’re registered, ' + d.first + '!';
      lines = ['Drop Off your menorah on Monday, Dec 7, 5:45–6:15 PM at the Menorah Contest table (#15 on the festival map).',
        res.emailed ? 'A confirmation with all the details is on its way to ' + d.email + '.' : 'See you at the festival!'];
    } else if (kind === 'dreidel') {
      title = 'Thanks for your guess, ' + d.first + '!';
      lines = ['Your guess: ' + d.guess + '. We’ll announce the winner after the festival on our social media and by email.', 'Follow us so you don’t miss it:',
        res.emailed ? 'A confirmation is on its way to ' + d.email + '.' : 'Good luck!'];
    } else {
      title = 'You’re on the list, ' + d.first + '!';
      lines = ['Thanks for joining. Watch your inbox for our newsletter and invitations.'];
      if (d.challah) lines.push('We’ll be in touch about your free challah.');
    }
    add(v, el('div', 'cff-ok', '✓'), el('h3', null, title));
    lines.forEach(function (t) { v.appendChild(el('p', null, t)); });
    if (kind === 'dreidel') {
      var fw = el('div', 'cff-follow');
      FOLLOW.forEach(function (f) {
        var a = el('a', 'cff-fbtn', f[0]);
        a.href = f[1]; a.target = '_blank'; a.rel = 'noopener';
        a.setAttribute('aria-label', f[2]);
        fw.appendChild(a);
      });
      /* keep the follow buttons right after the follow line, before the confirmation line */
      v.insertBefore(fw, v.lastChild);
    }
    return v;
  }

  /* Builds one form. mode 'pop' (with header + close) or 'inline'. */
  function makeForm(kind, mode, opts) {
    css();
    opts = opts || {};
    var D = FORMS[kind];
    var wrap = el('div', 'cff ' + (mode === 'pop' ? 'cff-box' : 'cff-inline'));
    var hd = null, x = null;
    if (mode === 'pop') {
      hd = el('div', 'cff-hd');
      x = el('button', 'cff-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close');
      add(hd, add(el('div'), el('b', null, D.title), el('span', null, D.sub)), x);
    }
    var body = el('div', 'cff-body');
    var err = el('div', 'cff-err'); err.setAttribute('role', 'alert');
    body.appendChild(err);
    var api = kind === 'menorah' ? buildMenorah(body) : kind === 'dreidel' ? buildDreidel(body) : buildMailing(body);
    var trap = el('label', 'cff-trap');
    var trapIn = document.createElement('input'); trapIn.type = 'text'; trapIn.tabIndex = -1; trapIn.setAttribute('autocomplete', 'off');
    add(trap, el('span', null, 'Leave this empty'), trapIn);
    body.appendChild(trap);
    var ft = el('div', 'cff-ft');
    var go = el('button', 'cff-btn', D.button); go.type = 'button';
    ft.appendChild(go);
    add(wrap, hd, body, ft);

    var busy = false;
    function setErr(m) { err.textContent = m || ''; if (m) { body.scrollTop = 0; if (mode === 'inline' && err.scrollIntoView) try { err.scrollIntoView({ block: 'center' }); } catch (e) {} } }
    go.addEventListener('click', function () {
      if (busy) return;
      setErr('');
      var problem = api.check();
      if (problem) return setErr(problem);
      var d = api.data();
      var req = Object.assign({ action: 'form', kind: kind, website: trapIn.value, page: location.href.split('#')[0].slice(0, 300) }, d);
      busy = true; go.disabled = true; go.textContent = 'Sending…';
      send(req).then(function (r) {
        busy = false; go.disabled = false; go.textContent = D.button;
        if (!r || !r.ok) return setErr((r && r.error) || 'Something went wrong. Please try again.');
        emit('sent', { kind: kind, req: req, res: r });
        try { if (window.gtag) window.gtag('event', 'form_sent', { form: kind }); } catch (e) {}
        if (mode === 'inline' && typeof opts.onDone === 'function') { opts.onDone(d, r); return; }
        body.innerHTML = '';
        body.appendChild(thanksView(kind, d, r));
        ft.innerHTML = '';
        if (mode === 'pop') {
          var c = el('button', 'cff-btn', 'Close'); c.type = 'button';
          c.addEventListener('click', function () { if (opts.close) opts.close(); });
          ft.appendChild(c);
        } else ft.style.display = 'none';
      }, function () {
        busy = false; go.disabled = false; go.textContent = D.button;
        setErr('We couldn’t send that. Please check your connection and try again, or call us at ' + CFG.PHONE + '.');
      });
    });
    return { wrap: wrap, x: x, busy: function () { return busy; } };
  }

  /* ---------- pop-up ---------- */
  var POP = null;
  function open(kind) {
    if (!READY || !FORMS[kind]) return false;
    close();
    var ov = el('div', 'cff-ov');
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', FORMS[kind].title);
    var f = makeForm(kind, 'pop', { close: close });
    ov.appendChild(f.wrap);
    document.body.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    f.x.addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    POP = { ov: ov, f: f, off: function () { document.removeEventListener('keydown', onKey); } };
    setTimeout(function () { try { f.x.focus(); } catch (e) {} }, 30);
    return true;
  }
  function close() {
    if (!POP || POP.f.busy()) return;
    POP.off();
    if (POP.ov.parentNode) POP.ov.parentNode.removeChild(POP.ov);
    POP = null;
    document.documentElement.style.overflow = '';
  }

  function mount(kind, host, opts) {
    if (!READY || !FORMS[kind] || !host) return null;
    var f = makeForm(kind, 'inline', opts);
    host.appendChild(f.wrap);
    return f.wrap;
  }

  window.CFForms = { version: VERSION, ready: READY, open: open, close: close, mount: mount };
  log('loaded' + (DEMO ? ' (preview demo)' : ''));
})();
