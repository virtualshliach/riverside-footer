/* CHANUKAH FESTIVAL 2026 - Chabad Jewish Community Center, Riverside
   Custom template for the festival mini-site home page.
   Loaded by footer.js (see PAGES there). DRAFT page 7553387;
   at go-live set CFG.AID to '4949424' and BRAND_HOSTS to ['chanukahfestival.org'],
   and move the PAGES entry in footer.js to '4949424'. */
(function () {
  'use strict';

  var VERSION = 'cf26-2026-11-02j';
  var SELF_SRC = (document.currentScript && document.currentScript.src) || '';
  if (!SELF_SRC) {
    var ss = document.getElementsByTagName('script');
    for (var si = ss.length - 1; si >= 0; si--) {
      if (/\/chanukah-2026\.js(\?|$)/.test(ss[si].src)) { SELF_SRC = ss[si].src; break; }
    }
  }
  var ASSET_BASE = SELF_SRC ? SELF_SRC.split('?')[0].replace(/[^\/]+$/, '') : '';
  function asset(name) {
    var pv = window.CF26_PREVIEW_ASSETS;
    return (pv && typeof pv.base === 'string' ? pv.base : ASSET_BASE) + name;
  }
  var PREVIEW = false; /*__PREVIEW_HOOK__*/

  function ch() { return String.fromCharCode.apply(null, arguments); }
  var AMP = ch(38);

  /* =====================================================================
     CONFIG - everything an editor should need to touch lives here
     ===================================================================== */
  var CFG = {
    /* DRAFT: 7553387. At go-live set AID to '4949424' and BRAND_HOSTS to ['chanukahfestival.org']. */
    AID: '7553387',
    BRAND_HOSTS: [],

    edition: '22',
    editionSuffix: 'nd',
    host: 'Chabad Jewish Community Center',

    event: {
      dayLine: 'Mon. Dec 7, 2026',
      timeLine: '6\u20138\u00a0PM',
      nightLine: '4th Night of Chanukah',
      venue: 'Riverside County Historic Courthouse',
      street: '4050 Main St.',
      cityLine: 'Riverside, CA 92501',
      startUTC: '2026-12-08T02:00:00Z',   /* 6:00 PM Pacific */
      endUTC: '2026-12-08T04:00:00Z',     /* 8:00 PM Pacific */
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1650.922122861743!2d-117.37630892354346!3d33.979049862680604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb1ef11d6ca15%3A0x1079ea5e9dfa9f66!2s4050%20Main%20St%2C%20Riverside%2C%20CA%2092501!5e0!3m2!1sen!2sus!4v1635794908873!5m2!1sen!2sus',
      mapQuery: 'Riverside Historic Courthouse, 4050 Main St, Riverside, CA 92501'
    },

    /* Photos from past festivals; files live next to this one in the repo. */
    highlights: [
      { img: 'hl-menorah.jpg', title: 'Grand Menorah Lighting', text: 'The lighting of Riverside\u2019s Menorah, the largest in the region, on the courthouse steps.' },
      { img: 'hl-food.jpg',    title: 'Traditional Food',       text: 'Hot latkes, jelly donuts and Chanukah treats for everyone.' },
      { img: 'hl-music.jpg',   title: 'Live Music',             text: 'Holiday music and dancing in the heart of downtown.' },
      { img: 'hl-family.jpg',  title: 'Fun for the Whole Family', text: 'Children\u2019s crafts, activities and entertainment.' }
    ],
    accessNote: 'ASL Interpreter on site',

    about: [
      'Chabad Jewish Community Center of Riverside presents an annual community-wide Chanukah Festival, free of charge and open to the public. The festival features the lighting of Riverside\u2019s Menorah, the largest in the region, live music, traditional foods, entertainment, children\u2019s crafts and activities.',
      'The festival has grown into one of the premier holiday celebrations in the Inland Empire, sharing Chanukah\u2019s universal message, embracing cultural diversity, and promoting understanding. Each year, the festival is graced by the participation of many elected officials and civic leaders \u2014 a meaningful evening not only for the Jewish community but for the community at large.'
    ],
    stats: [
      { big: '22', small: 'years of light in Riverside' },
      { big: 'Free', small: 'admission \u2014 all are welcome' },
      { big: '#1', small: 'largest menorah in the region' }
    ],

    /* ---- Community partners shown on the page ---- */
    PARTNERS_INTRO: 'Thank you to our community partners for helping bring this celebration to Riverside.',
    PARTNERS: [
      { name: 'City of Riverside' },
      { name: 'Riverside Downtown Partnership' },
      { name: 'Karen Spiegel', sub: 'Riverside County Supervisor, District 2' },
      { name: 'Blumenthal {amp} Moore', sub: 'A Professional Law Corporation' },
      { name: 'Chabad of UCR' }
    ],

    /* img: thumbnail in this repo. NBC's own photo is a stock image from elsewhere,
       so its card shows our festival photo instead. */
    NEWS: [
      { outlet: 'Riverside County Supervisor, District 2', date: 'Dec 22, 2025',
        title: 'Chanukah Festival Celebrated at Riverside Historic Courthouse',
        blurb: 'Supervisor Spiegel\u2019s office recaps last year\u2019s festival: families downtown for the menorah lighting, music and activities, with photos.',
        url: 'https://rivcodistrict2.org/node/11701', img: 'news-2025.jpg' },
      { outlet: 'Raincross Gazette', date: 'Nov 30, 2023',
        title: '19th Annual Chanukah Festival to light up Riverside Historic Courthouse',
        blurb: 'A preview of the courthouse-steps celebration and its message of unity, noting record turnout the year before.',
        url: 'https://www.raincrossgazette.com/19th-annual-chanukah-festival-to-light-up-riverside-historic-courthouse' , img: 'news-raincross.jpg' },
      { outlet: 'Riverside County Supervisor, District 2', date: 'Dec 13, 2023',
        title: '19th Annual Chanukah Festival and the Menorah Lighting',
        blurb: 'Supervisor Spiegel joins the community for the menorah lighting before the courthouse.',
        url: 'https://rivcodistrict2.org/node/3936', img: 'news-2023.jpg' },
      { outlet: 'NBC Los Angeles', date: 'Dec 2020',
        title: 'Riverside\u2019s Annual Hanukkah Festival to Go Mobile Amid COVID-19 Restrictions',
        blurb: 'How the festival kept the lights on during the pandemic with a drive-in celebration.',
        url: 'https://www.nbclosangeles.com/holidays/riversides-annual-hanukkah-festival-to-go-mobile-amid-covid-19-restrictions/2481846/' , img: 'news-nbc.jpg' }
    ],

    /* ---- Chanukah guide ----
       Written into this page (not loaded from another page), so it always shows and
       visitors stay on the festival page. Each card opens its article in a pop-up.
       To change the wording, edit the text here. Plain HTML: p, h3, ul/li, ol/li, b. */
    GUIDE: {
      articles: [
        { title: 'What Is Chanukah?', img: 'g-guide.jpg',
          text: 'The story of the Maccabees, the Temple and the little jar of oil that lasted eight days.',
          html:
            '<p>Chanukah is the eight-day Festival of Lights. It begins on the 25th of the Hebrew month of Kislev, and in 2026 it runs from Friday evening, December 4 through Saturday night, December 12.</p>' +
            '<h3>The story</h3>' +
            '<p>More than 2,100 years ago, the Land of Israel was ruled by the Syrian-Greek empire. Its king tried to force the Jewish people to give up the Torah and its commandments, and the Holy Temple in Jerusalem was taken over and defiled.</p>' +
            '<p>A small band of Jews, led by Judah the Maccabee and his brothers, stood up against one of the strongest armies in the world. Against all odds, the few defeated the many, and they returned to Jerusalem to rededicate the Temple.</p>' +
            '<p>They wanted to light the Temple’s menorah, but found only one small jar of pure olive oil, enough for a single day. They lit it anyway, and the oil burned for eight days, until new pure oil could be prepared.</p>' +
            '<h3>Why we celebrate</h3>' +
            '<p>To remember these miracles, we light a menorah every night of Chanukah, adding one more light each night until all eight are burning. The message of Chanukah is that a little light pushes away a lot of darkness, and that it’s always worth adding one more good deed.</p>' },

        { title: 'How to Light the Menorah', img: 'g-light.jpg',
          text: 'Where to place it, when to light, the order of the candles and the blessings.',
          html:
            '<h3>What you need</h3>' +
            '<p>A menorah with eight lights in a straight row, plus a ninth light, the <b>shamash</b> (helper candle), set a little higher or apart. Olive oil is ideal; candles are fine. The lights must be large enough to burn at least 30 minutes after nightfall.</p>' +
            '<h3>Where</h3>' +
            '<p>Place the menorah where it can be seen from outside: in a window facing the street, or in a doorway, on the side opposite the mezuzah. Every member of the family, including children, can light their own menorah.</p>' +
            '<h3>When</h3>' +
            '<ul><li><b>Sunday through Thursday:</b> light in the evening after sunset.</li>' +
            '<li><b>Friday:</b> light before the Shabbat candles, before sunset, using bigger candles that will last until after dark.</li>' +
            '<li><b>Saturday night:</b> light after Shabbat ends.</li></ul>' +
            '<h3>Setting up the candles</h3>' +
            '<p>On the first night, place one candle at the far right of the menorah. Each night add one more candle to the left of the one before. Always light the newest (leftmost) candle first, then move to the right.</p>' +
            '<h3>Lighting</h3>' +
            '<ol><li>Light the shamash.</li><li>Holding the shamash, say the blessings below.</li><li>Light the candles, newest first, moving left to right.</li><li>Put the shamash in its place.</li></ol>' +
            '<h3>The blessings</h3>' +
            '<p><b>1.</b> Ba-ruch a-tah A-do-nai E-lo-hei-nu me-lech ha-o-lam a-sher ki-de-sha-nu be-mitz-vo-tav ve-tzi-va-nu le-had-lik ner Cha-nu-kah.</p>' +
            '<p><em>Blessed are You, L-rd our G-d, King of the universe, who has made us holy with His commandments, and commanded us to kindle the Chanukah light.</em></p>' +
            '<p><b>2.</b> Ba-ruch a-tah A-do-nai E-lo-hei-nu me-lech ha-o-lam she-a-sah ni-sim la-a-vo-tei-nu ba-ya-mim ha-hem bi-z’man ha-zeh.</p>' +
            '<p><em>Blessed are You, L-rd our G-d, King of the universe, who performed miracles for our fathers in those days, at this time.</em></p>' +
            '<p><b>3. First night only:</b> Ba-ruch a-tah A-do-nai E-lo-hei-nu me-lech ha-o-lam she-he-che-ya-nu ve-ki-ye-ma-nu ve-hi-gi-a-nu liz-man ha-zeh.</p>' +
            '<p><em>Blessed are You, L-rd our G-d, King of the universe, who has granted us life, sustained us, and brought us to this time.</em></p>' +
            '<h3>After lighting</h3>' +
            '<p>Stay near the menorah and enjoy the lights. They are only for looking at, not for reading or other work. It’s a great time to sing Chanukah songs together.</p>' },

        { title: 'How to Celebrate Chanukah', img: 'g-celebrate.jpg',
          text: 'Customs for all eight nights: gelt, special prayers, foods and sharing the light.',
          html:
            '<ul>' +
            '<li><b>Light the menorah every night,</b> adding one candle each night, and gather the whole family around it.</li>' +
            '<li><b>Share the light.</b> Put your menorah where others can see it, and join a public menorah lighting, like the Chanukah Festival at the Riverside County Historic Courthouse.</li>' +
            '<li><b>Chanukah gelt.</b> It’s a custom to give children (and grown-ups) gifts of money during Chanukah, and to encourage them to give some of it to charity.</li>' +
            '<li><b>Special prayers.</b> “Al Hanisim,” thanking G-d for the miracles, is added to the daily prayers and to the Grace After Meals. The joyful Hallel prayer is said each morning.</li>' +
            '<li><b>Foods fried in oil,</b> like latkes (potato pancakes) and sufganiyot (jelly doughnuts), remind us of the miracle of the oil. Many also eat dairy foods.</li>' +
            '<li><b>Play dreidel</b> with family and friends.</li>' +
            '<li><b>Give charity</b> and add in acts of kindness each day of Chanukah.</li>' +
            '<li><b>Friday night:</b> light the menorah before the Shabbat candles.</li>' +
            '</ul>' },

        { title: 'Dreidel, Latkes and Doughnuts', img: 'g-dreidel.jpg',
          text: 'How to play dreidel, and the Chanukah foods that remind us of the miracle of the oil.',
          html:
            '<h3>The dreidel</h3>' +
            '<p>A dreidel is a four-sided spinning top. Each side has a Hebrew letter: <b>Nun, Gimmel, Hei, Shin</b>. Together they stand for <em>Nes Gadol Hayah Sham</em>, “A great miracle happened there.” (In Israel the last letter is <b>Pei</b>, for <em>Po</em>, “here.”)</p>' +
            '<h3>How to play</h3>' +
            '<ol><li>Everyone starts with the same number of coins, nuts or candies, and puts one in the middle (the pot).</li>' +
            '<li>Take turns spinning the dreidel. When it falls:' +
            '<ul><li><b>Nun:</b> nothing happens.</li><li><b>Gimmel:</b> take the whole pot.</li><li><b>Hei:</b> take half the pot.</li><li><b>Shin:</b> put one in.</li></ul></li>' +
            '<li>When the pot is empty, everyone puts one in again. Play until one person has everything, or until the latkes are ready!</li></ol>' +
            '<h3>Chanukah foods</h3>' +
            '<p>Because the miracle of Chanukah happened with oil, it’s a custom to eat foods fried in oil. The favorites are <b>latkes</b>, crispy potato pancakes served with applesauce or sour cream, and <b>sufganiyot</b>, jelly doughnuts dusted with powdered sugar. Come taste both at the Chanukah Festival!</p>' }
      ]
    },
    NIGHTS: [
      { n: 1, day: 'Fri', date: 'Dec 4', note: 'Light before Shabbat candles' },
      { n: 2, day: 'Sat', date: 'Dec 5', note: 'Light after Shabbat ends' },
      { n: 3, day: 'Sun', date: 'Dec 6', note: '' },
      { n: 4, day: 'Mon', date: 'Dec 7', note: 'Festival night!', star: true },
      { n: 5, day: 'Tue', date: 'Dec 8', note: '' },
      { n: 6, day: 'Wed', date: 'Dec 9', note: '' },
      { n: 7, day: 'Thu', date: 'Dec 10', note: '' },
      { n: 8, day: 'Fri', date: 'Dec 11', note: 'Light before Shabbat candles' }
    ],
    NIGHTS_NOTE: 'Chanukah 2026 begins Friday evening, December 4 and ends at nightfall on Saturday, December 12.',

    SHARE: {
      url: 'https://www.jewishriverside.com/templates/section_cdo/aid/4949424/jewish/Chanukah-Festival-2026.htm',
      text: 'Join us for the 22nd Annual Chanukah Festival \u2014 Mon. Dec 7, 6\u20138 PM at the Riverside County Historic Courthouse. Free admission, all are welcome!',
      /* the festival's own social pages (not Jewish Riverside's or the shul's) */
      facebook: 'https://www.facebook.com/chanukahfestival/',
      instagram: 'https://www.instagram.com/chanukahfestival/',
      igHandle: '@chanukahfestival',
      /* paste the Facebook event link here once it exists; Follow on Facebook then goes to the event */
      facebookEvent: ''
    },

    /* Looping highlight video behind the title. Files live next to this one in the repo. */
    HERO: { video: 'festival-hero.mp4', poster: 'festival-hero-poster.jpg' },

    FLYER: '/media/images/1389/dEvL13899225.png',
    DONATE_URL: '/article.asp?aid=4194665',

    /* Donation pop-up. Field ids from the ChabadOne form on this page (mapped Nov 2 2026). */
    DONATE: {
      amounts: [18, 36, 72, 180, 360, 1000],
      country: 'United States',
      F: {
        first: 'first_1', last: 'last_1', email: 'input_3', phone: 'input_6_full',
        addr1: 'input_5_addr_line1', addr2: 'input_5_addr_line2', city: 'input_5_city',
        state: 'input_5_state', zip: 'input_5_postal', country: 'input_5_country',
        amount: 'input_7', monthly: 'input_9', optin: 'input_4', submit: 'input_2',
        bAddr: 'input_10_addr_line1', bCity: 'input_10_city', bState: 'input_10_state',
        bZip: 'input_10_postal', bCountry: 'input_10_country',
        ccName: 'input_10_cc_nameOnCard', ccNum: 'input_10_cc_number', ccCvv: 'input_10_cc_ccv',
        ccMon: 'input_10_cc_exp_month', ccYear: 'input_10_cc_exp_year'
      }
    },

    /* Top menu. Each item scrolls to a section of this page; Donate opens a pop-up. */
    MENU: [
      ['event', 'Event Info'],
      ['directions', 'Directions & Parking'],
      ['news', 'In the News'],
      ['guide', 'Chanukah Guide']
    ],

    /* Parking for the Directions & Parking section. City garages within about a
       10-minute walk of the courthouse, closest first. Rates from the City of
       Riverside parking page (riversideca.gov/publicworks/parking, Nov 2026).
       Walking times are approximate. Empty list = the parking box is hidden. */
    PARKING: [
      { name: 'City garage', addr: '3901 Orange St', walk: '4 min' },
      { name: 'City garage', addr: '3851 Orange St', walk: '5 min' },
      { name: 'City garage', addr: '3743 Orange St', walk: '6 min' },
      { name: 'City garage', addr: '3750 Market St', walk: '7 min' },
      { name: 'City garage', addr: '3601 Market St', walk: '10 min' }
    ],
    PARKING_NOTES: [
      'City garages are open 24 hours: $1.25 per 30 minutes, $20 daily maximum.',
      'The first 60 minutes in a City garage are free with the Park Riverside app.',
      'Street meters are $1.50 per 30 minutes until 7 PM on weekdays, and free after 7 PM.',
      'Arrive early: the festival draws a big crowd and the closest spaces fill first.'
    ],
    PHONE: '951-222-2005',
    EMAIL: 'info@jewishriverside.com',
    WEB: 'www.ChanukahFestival.org'
  };
  /*__PREVIEW_CFG__*/

  /* =====================================================================
     GUARD
     ===================================================================== */
  var HREF = window.location.href;
  if (HREF.indexOf('ArticleCcoResponse') > -1) return;
  var AID = CFG.AID;
  var aidRe = new RegExp('(/aid/' + AID + '(/|\\.|$))|([?\\x26]aid=' + AID + '(\\D|$))', 'i');
  var hostL = (window.location.hostname || '').toLowerCase().replace(/^www\./, '');
  var byHost = CFG.BRAND_HOSTS.indexOf(hostL) > -1 &&
    (window.location.pathname === '/' || window.location.pathname === '');
  var byUrl = aidRe.test(HREF) || byHost;

  function onThisPage() {
    if (PREVIEW || byUrl) return true;
    var co = window.Co;
    return !!(co && String(co.ArticleId) === AID);
  }
  if (byUrl || PREVIEW) cover();

  function cover() {
    if (document.getElementById('cf26-cover')) return;
    var d = document.createElement('div');
    d.id = 'cf26-cover';
    d.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0f2936;z-index:2147481000');
    (document.body || document.documentElement).appendChild(d);
    setTimeout(uncover, 6000);
  }
  function uncover() {
    var c = document.getElementById('cf26-cover');
    if (c && c.parentNode) c.parentNode.removeChild(c);
  }

  /* =====================================================================
     HELPERS
     ===================================================================== */
  function T(s) { return String(s == null ? '' : s).split('{amp}').join(AMP); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = T(text);
    return e;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }
  function link(cls, href, text, newTab) {
    var a = el('a', cls, text);
    a.href = href;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function abs(u) {
    try { return new URL(u, window.location.href).href; } catch (e) { return u; }
  }
  function qs(params) {
    var out = [];
    for (var k in params) if (params.hasOwnProperty(k)) out.push(k + '=' + encodeURIComponent(params[k]));
    return out.join(AMP);
  }
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById('cf26-toast');
    if (!t) { t = el('div', 'cf-toast'); t.id = 'cf26-toast'; t.setAttribute('role', 'status'); root.appendChild(t); }
    t.textContent = T(msg);
    t.className = 'cf-toast show';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = 'cf-toast'; }, 3200);
  }
  function copyText(s) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s);
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement('textarea');
        ta.value = s; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) { res(); } else { rej(); }
      } catch (e) { rej(e); }
    });
  }

  var ICONS = {
    menorah: 'M12 3c.8 1 1 1.7.5 2.4-.3.4-.8.6-1 .1C11.3 5 11.5 4 12 3zM4 9v4a8 8 0 0 0 16 0V9M7.5 9v4a4.5 4.5 0 0 0 9 0V9M12 7v14M8 21h8',
    food: 'M5 11h14a7 7 0 0 1-14 0zM8 7c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7c0-1 1-1.5 1-2.5M9 21h6',
    music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    family: 'M8 7a2.5 2.5 0 1 0 0-.1M16.5 8a2 2 0 1 0 0-.1M4 21v-5a4 4 0 0 1 8 0v5M13 21v-4a3.5 3.5 0 0 1 7 0v4',
    asl: 'M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 9.5V4a1.5 1.5 0 0 1 3 0v6M13 9.5V5.5a1.5 1.5 0 0 1 3 0V12M16 10a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2.5-4.3a1.5 1.5 0 0 1 2.6-1.5L7 14',
    pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
    fb: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z',
    ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
    ext: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    heart: 'M12 20s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.1-8 11-8 11z',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
    x: 'M6 6l12 12M18 6L6 18',
    dl: 'M12 3v12M7 10l5 5 5-5M5 21h14'
  };
  function icon(name, cls) {
    var NS = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('class', 'cf-ic' + (cls ? ' ' + cls : ''));
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', ICONS[name] || '');
    s.appendChild(p);
    return s;
  }

  /* =====================================================================
     STYLES - plain color values only (no custom properties)
     ===================================================================== */
  var NAVY = '#0f2936', DEEP = '#0a1f2a', PANEL = '#133442', TEAL = '#1accce',
      GREEN = '#4cbd9f', GOLD = '#ebbe4d', INK = '#e9f1f3', MUTED = '#a9c0c7';
  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var SCRIPT = '"Satisfy","Brush Script MT",cursive';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';
  var GRAD = 'linear-gradient(90deg,' + TEAL + ' 0%,' + GREEN + ' 52%,' + GOLD + ' 100%)';

  function css() {
    return [
      'html.cf26-on .cco_templateless_template,html.cf26-on .page-tools-sidebar,html.cf26-on #BodyContainer{display:none !important}',
      /* the native page holds the donation form: park it off-screen, never display:none */
      'html.cf26-on .cco_templatelates_content{position:absolute !important;left:-10000px !important;top:0 !important;width:760px !important}',
      'html.cf26-on,html.cf26-on body{background:' + NAVY + ' !important;margin:0}',
      '#cf26{background:' + NAVY + ';color:' + INK + ';font-family:' + BODY + ';font-size:17px;line-height:1.6;text-align:left;-webkit-font-smoothing:antialiased;overflow-x:hidden}',
      '#cf26 *{box-sizing:border-box}',
      '#cf26 h1,#cf26 h2,#cf26 h3,#cf26 p{margin:0;padding:0}',
      '#cf26 a{color:inherit}',
      '#cf26 button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}',
      '#cf26 img{max-width:100%;display:block}',
      '#cf26 .cf-ic{width:1.15em;height:1.15em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}',
      '#cf26 :focus-visible{outline:2px solid ' + GOLD + ';outline-offset:3px}',
      '#cf26 .cf-wrap{max-width:1120px;margin:0 auto;padding:0 20px}',
      '#cf26 .cf-sec{padding:84px 0}',
      '#cf26 .cf-alt{background:' + DEEP + '}',
      '#cf26 .cf-kicker{font-size:.74rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:' + GOLD + ';margin-bottom:10px}',
      '#cf26 .cf-h2{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,4.2vw,2.8rem);line-height:1.1;color:#fff;margin-bottom:14px}',
      '#cf26 .cf-lead{color:' + MUTED + ';max-width:62ch;font-size:1.05rem}',
      '#cf26 .cf-center{text-align:center}',
      '#cf26 .cf-center .cf-lead{margin:0 auto}',
      '#cf26 .cf-rule{height:3px;width:72px;background:' + GRAD + ';border-radius:2px;margin:18px 0 0}',
      '#cf26 .cf-center .cf-rule{margin:18px auto 0}',

      /* buttons */
      '#cf26 .cf-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 24px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.02em;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;white-space:nowrap}',
      '#cf26 .cf-btn:hover{transform:translateY(-2px)}',
      '#cf26 .cf-gold{background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(235,190,77,.25)}',
      '#cf26 .cf-gold:hover{box-shadow:0 12px 30px rgba(235,190,77,.38)}',
      '#cf26 .cf-ghost{border:1.5px solid rgba(255,255,255,.35);color:#fff}',
      '#cf26 .cf-ghost:hover{border-color:' + TEAL + ';color:' + TEAL + '}',
      '#cf26 .cf-teal{background:' + TEAL + ';color:' + DEEP + '}',

      /* nav */
      '#cf26 .cf-nav{position:sticky;top:0;z-index:50;background:rgba(10,31,42,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-nav .cf-wrap{display:flex;align-items:center;gap:18px;height:60px}',
      '#cf26 .cf-brand{font-family:' + DISP + ';font-weight:700;color:#fff;text-decoration:none;font-size:1.05rem;letter-spacing:.04em;white-space:nowrap}',
      '#cf26 .cf-brand span{background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent}',
      '#cf26 .cf-links{display:flex;gap:4px;margin-left:auto;overflow-x:auto;scrollbar-width:none}',
      '#cf26 .cf-links::-webkit-scrollbar{display:none}',
      '#cf26 .cf-links a{color:' + MUTED + ';text-decoration:none;font-size:.84rem;font-weight:600;padding:8px 11px;border-radius:999px;white-space:nowrap}',
      '#cf26 .cf-links a:hover{color:#fff;background:rgba(255,255,255,.06)}',
      '#cf26 .cf-nav .cf-btn{padding:9px 18px;font-size:.84rem}',
      '#cf26 .cf-burger{display:none;width:42px;height:42px;border-radius:10px;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:1px solid rgba(255,255,255,.18)}',
      '#cf26 .cf-burger i{display:block;width:20px;height:2px;border-radius:2px;background:#fff;transition:transform .25s ease,opacity .2s ease}',
      '#cf26 .cf-burger.open i:nth-child(1){transform:translateY(7px) rotate(45deg)}',
      '#cf26 .cf-burger.open i:nth-child(2){opacity:0}',
      '#cf26 .cf-burger.open i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
      '#cf26 .cf-mmenu{display:none}',
      '@media (max-width:860px){#cf26 .cf-links,#cf26 .cf-nav .cf-don{display:none}#cf26 .cf-burger{display:flex;margin-left:auto}' +
        '#cf26 .cf-mmenu.open{display:flex;flex-direction:column;padding:8px 16px 18px;border-top:1px solid rgba(255,255,255,.07);background:rgba(10,31,42,.98)}' +
        '#cf26 .cf-mmenu a{color:#fff;text-decoration:none;font-weight:600;font-size:1.05rem;padding:14px 4px;border-bottom:1px solid rgba(255,255,255,.07)}' +
        '#cf26 .cf-mmenu .cf-btn{margin-top:16px;padding:14px 20px;font-size:1rem}}',
      '#cf26 .cf-dm{position:fixed;inset:0;z-index:2147482500;background:rgba(5,15,20,.72);display:flex;align-items:center;justify-content:center;padding:3vh 14px}',
      '#cf26 .cf-dm-box{display:flex;flex-direction:column;width:100%;max-width:760px;height:min(92vh,900px);background:#fff;color:' + DEEP + ';border-radius:20px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
      '#cf26 .cf-dm-hd{display:flex;align-items:center;gap:14px;padding:16px 18px 14px 22px;background:' + NAVY + ';color:#fff}',
      '#cf26 .cf-dm-hd b{display:block;font-family:' + DISP + ';font-size:1.2rem}',
      '#cf26 .cf-dm-hd span{display:block;font-size:.85rem;color:' + MUTED + '}',
      '#cf26 .cf-dm-x{margin-left:auto;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);color:#fff;font-size:20px;flex:none}',
      '@media (max-width:620px){#cf26 .cf-dm{padding:0}#cf26 .cf-dm-box{height:100%;max-width:none;border-radius:0}}',
      '#cf26 .cf-dm{transition:opacity .2s ease}',
      '#cf26 .cf-dm.cf-dm-off{visibility:hidden;pointer-events:none;opacity:0}',
      '#cf26 .cf-dm-steps{display:flex;gap:6px;padding:12px 22px;border-bottom:1px solid #e6eef0;background:#f6fafb}',
      '#cf26 .cf-dm-st{display:flex;align-items:center;gap:8px;flex:1;font-size:.82rem;font-weight:600;color:#7a8d93}',
      '#cf26 .cf-dm-st i{font-style:normal;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e2ebee;color:#4a5d64;font-size:.78rem;flex:none}',
      '#cf26 .cf-dm-st.on{color:' + DEEP + '}',
      '#cf26 .cf-dm-st.on i{background:' + GOLD + ';color:' + DEEP + '}',
      '#cf26 .cf-dm-st.done i{background:' + TEAL + ';color:#fff}',
      '@media (max-width:480px){#cf26 .cf-dm-st span{display:none}#cf26 .cf-dm-st.on span{display:inline}}',
      '#cf26 .cf-dm-body{flex:1;min-height:0;overflow-y:auto;padding:20px 22px 24px}',
      '#cf26 .cf-dm-pane h3{font-family:' + DISP + ';font-size:1.3rem;color:' + NAVY + ';margin-bottom:14px}',
      '#cf26 .cf-dm-err:empty{display:none}',
      '#cf26 .cf-dm-err{background:#fdecea;color:#8a1f12;border:1px solid #f4c4bd;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:.9rem}',
      '#cf26 .cf-dm-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
      '#cf26 .cf-chip{padding:16px 8px;border-radius:12px;border:1.5px solid #d5e2e6;background:#fff;color:' + NAVY + ';font-weight:700;font-size:1.1rem}',
      '#cf26 .cf-chip:hover{border-color:' + TEAL + '}',
      '#cf26 .cf-chip.on{border-color:' + GOLD + ';background:#fff8e6;box-shadow:0 0 0 2px ' + GOLD + '}',
      '#cf26 .cf-dm-other{display:flex;align-items:center;gap:8px;margin-top:12px;font-weight:700;color:' + NAVY + '}',
      '#cf26 .cf-dm-other .cf-in{flex:1}',
      '#cf26 .cf-dm-tick{display:flex;align-items:center;gap:10px;margin-top:14px;font-size:.95rem;color:' + NAVY + ';cursor:pointer}',
      '#cf26 .cf-dm-tick input{width:20px;height:20px;accent-color:' + TEAL + ';flex:none}',
      '#cf26 .cf-dm-grid{display:flex;flex-wrap:wrap;gap:12px}',
      '#cf26 .cf-dm-bill{margin-top:12px}',
      '#cf26 .cf-fld{display:flex;flex-direction:column;gap:5px;flex:1 1 100%;min-width:0}',
      '#cf26 .cf-fld.half{flex:1 1 calc(50% - 6px)}',
      '#cf26 .cf-fld.third{flex:1 1 calc(33.33% - 8px)}',
      '#cf26 .cf-fld span{font-size:.78rem;font-weight:700;color:#4a5d64;letter-spacing:.02em}',
      '#cf26 .cf-in{width:100%;padding:12px 13px;font:inherit;font-size:1rem;color:' + NAVY + ';background:#fff;border:1.5px solid #d5e2e6;border-radius:10px}',
      '#cf26 .cf-in:focus{outline:none;border-color:' + TEAL + '}',
      '#cf26 .cf-dm-sum3{font-weight:700;color:' + NAVY + ';background:#f6fafb;border-radius:10px;padding:10px 14px;margin-bottom:14px}',
      '#cf26 .cf-dm-secure{font-size:.8rem;color:#6b7f86;margin-top:14px}',
      '#cf26 .cf-dm-ft{display:flex;align-items:center;gap:12px;padding:12px 18px;border-top:1px solid #e6eef0}',
      '#cf26 .cf-dm-ft .cf-ghost{color:' + NAVY + ';border-color:#cfdde1}',
      '#cf26 .cf-dm-sum{flex:1;text-align:center;font-weight:700;color:' + NAVY + ';font-size:.95rem}',
      '#cf26 .cf-dm-ft .cf-btn[disabled]{opacity:.6;cursor:wait;transform:none}',
      '#cf26 .cf-dm-done{text-align:center;padding:30px 10px}',
      '#cf26 .cf-dm-done p{color:#4a5d64;margin:8px 0}',
      '#cf26 .cf-dm-done .cf-btn{margin-top:18px}',
      '#cf26 .cf-dm-ok{width:64px;height:64px;border-radius:50%;background:' + TEAL + ';color:#fff;font-size:2rem;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}',
      '#cf26 .cf-ev1{grid-template-columns:1fr;max-width:760px;margin-left:auto;margin-right:auto}',
      '#cf26 .cf-park{margin-top:6px;padding:14px 0 4px;border-top:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-park ul{margin:12px 0 0;padding-left:20px;color:' + MUTED + ';font-size:.92rem}',
      '#cf26 .cf-plist{display:grid;gap:8px;margin-top:8px}',
      '#cf26 .cf-prow{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);text-decoration:none;color:' + INK + '}',
      '#cf26 .cf-prow:hover{border-color:rgba(26,204,206,.45)}',
      '#cf26 .cf-prow .cf-ic{color:' + TEAL + ';font-size:18px}',
      '#cf26 .cf-prow div{flex:1;min-width:0}',
      '#cf26 .cf-prow b{display:block;font-weight:700;color:#fff;font-size:.95rem}',
      '#cf26 .cf-prow span{display:block;font-size:.8rem;color:' + MUTED + '}',
      '#cf26 .cf-prow em{font-style:normal;font-size:.78rem;font-weight:700;color:' + DEEP + ';background:' + GOLD + ';border-radius:999px;padding:4px 10px;white-space:nowrap}',
      '#cf26 .cf-park li{margin:4px 0}',

      /* hero */
      '#cf26 .cf-hero{position:relative;text-align:center;background:' + NAVY + '}',
      '#cf26 .cf-vid{position:relative;overflow:hidden;min-height:clamp(440px,74vh,720px);display:flex;align-items:center;justify-content:center;background:' + DEEP + '}',
      '#cf26 .cf-vid video,#cf26 .cf-vid .cf-vposter{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}',
      '#cf26 .cf-vid:after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 75% 60% at 50% 48%,rgba(10,31,42,.62),rgba(10,31,42,.34) 75%),linear-gradient(180deg,rgba(15,41,54,.55) 0%,rgba(15,41,54,0) 22%,rgba(15,41,54,0) 70%,' + NAVY + ' 100%)}',
      '#cf26 .cf-vtext{position:relative;z-index:1;padding:56px 20px 70px;width:100%}',
      '#cf26 .cf-vtext .cf-t1,#cf26 .cf-vtext .cf-annual b{filter:drop-shadow(0 3px 14px rgba(0,0,0,.55))}',
      '#cf26 .cf-vtext .cf-t2,#cf26 .cf-vtext .cf-invite{text-shadow:0 3px 18px rgba(0,0,0,.6)}',
      '#cf26 .cf-tags{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:22px}',
      '#cf26 .cf-tag{background:' + GOLD + ';color:' + DEEP + ';font-family:' + SCRIPT + ';font-size:clamp(1.05rem,2.4vw,1.5rem);padding:7px 18px;line-height:1.2;border-radius:4px;box-shadow:0 8px 22px rgba(0,0,0,.3)}',
      '#cf26 .cf-vbtn{position:absolute;right:16px;bottom:16px;z-index:2;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(10,31,42,.55);color:#fff;border:1px solid rgba(255,255,255,.35);font-size:18px}',
      '#cf26 .cf-vbtn:hover{background:rgba(10,31,42,.8)}',
      '#cf26 .cf-info{padding:6px 0 64px}',
      '@media (max-width:620px){#cf26 .cf-vid{min-height:clamp(380px,62vh,560px)}#cf26 .cf-vtext{padding:44px 16px 56px}}',
      '#cf26 .cf-bh{position:absolute;top:12px;left:18px;z-index:1;font-size:.78rem;color:rgba(255,255,255,.8);font-family:' + DISP + '}',
      '#cf26 .cf-invite{font-size:clamp(.9rem,2vw,1.08rem);font-weight:600;color:#fff;letter-spacing:.02em;margin:18px 0 8px}',
      '#cf26 .cf-annual{display:flex;align-items:center;justify-content:center;gap:22px;margin-bottom:2px}',
      '#cf26 .cf-annual i{display:block;height:3px;width:min(160px,16vw);background:rgba(255,255,255,.85);border-radius:2px}',
      '#cf26 .cf-annual b{font-family:' + SCRIPT + ';font-weight:400;font-size:clamp(2rem,5.4vw,3.6rem);line-height:1.15;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent;padding:0 .12em}',
      '#cf26 .cf-annual sup{font-size:.5em;vertical-align:super}',
      '#cf26 .cf-t1{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.02em;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent}',
      '#cf26 .cf-t2{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.04em;color:#fff}',
      '@media (max-width:620px){#cf26 .cf-when{font-size:clamp(1.6rem,7.4vw,2.4rem)}#cf26 .cf-when .cf-sep{display:none}#cf26 .cf-when .cf-tm{display:block}#cf26 .cf-invite{padding:0 18px}}',
      '#cf26 .cf-venue{font-family:' + DISP + ';color:' + GOLD + ';text-transform:uppercase;font-size:clamp(1.05rem,2.8vw,1.75rem);letter-spacing:.02em;margin-top:18px;line-height:1.2}',
      '#cf26 .cf-addr{font-family:' + DISP + ';color:#fff;font-size:clamp(1rem,2.3vw,1.4rem)}',
      '#cf26 .cf-when{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,6vw,3.6rem);line-height:1.1;margin-top:0;background:linear-gradient(90deg,' + GOLD + ' 0%,' + GREEN + ' 100%);-webkit-background-clip:text;background-clip:text;color:transparent;text-transform:uppercase}',
      '#cf26 .cf-night{font-family:' + DISP + ';color:#fff;font-size:clamp(1rem,2.3vw,1.35rem)}',
      '#cf26 .cf-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:30px}',
      '#cf26 .cf-calwrap{position:relative;display:inline-block}',
      '#cf26 .cf-menu{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#fff;color:' + DEEP + ';border-radius:12px;padding:6px;min-width:210px;box-shadow:0 18px 40px rgba(0,0,0,.35);z-index:20;display:none;text-align:left}',
      '#cf26 .cf-menu.open{display:block}',
      '#cf26 .cf-menu a,#cf26 .cf-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;color:' + DEEP + '}',
      '#cf26 .cf-menu a:hover,#cf26 .cf-menu button:hover{background:#eef6f7}',

      /* countdown + marquee */
      '#cf26 .cf-count{background:' + DEEP + ';border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-count .cf-wrap{display:flex;align-items:center;justify-content:center;gap:28px;flex-wrap:wrap;padding-top:22px;padding-bottom:22px}',
      '#cf26 .cf-count-l{font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:' + MUTED + '}',
      '#cf26 .cf-units{display:flex;gap:10px}',
      '#cf26 .cf-unit{min-width:74px;text-align:center;padding:8px 6px;border-radius:12px;background:' + PANEL + ';border:1px solid rgba(26,204,206,.18)}',
      '#cf26 .cf-unit b{display:block;font-family:' + DISP + ';font-size:1.9rem;line-height:1.1;color:#fff}',
      '#cf26 .cf-unit span{font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:' + GREEN + ';font-weight:700}',
      '#cf26 .cf-countmsg{font-family:' + DISP + ';font-size:1.3rem;color:' + GOLD + '}',
      '#cf26 .cf-marq{overflow:hidden;background:' + GOLD + ';color:' + DEEP + ';white-space:nowrap}',
      '#cf26 .cf-marq-in{display:inline-flex;gap:0;animation:cf26marq 40s linear infinite;padding:12px 0}',
      '#cf26 .cf-marq:hover .cf-marq-in{animation-play-state:paused}',
      '#cf26 .cf-marq-in span{font-weight:700;font-size:.92rem;padding:0 22px;position:relative}',
      '#cf26 .cf-marq-in span:after{content:"";position:absolute;right:-4px;top:50%;width:7px;height:7px;margin-top:-3px;border-radius:50%;background:' + DEEP + ';opacity:.45}',
      '#cf26 .cf-marq-in em{font-style:normal;font-family:' + DISP + ';text-transform:uppercase;letter-spacing:.12em;padding:0 22px;font-size:.8rem}',
      '@keyframes cf26marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}',

      /* highlights + event card */
      '#cf26 .cf-hl{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px}',
      '@media (max-width:900px){#cf26 .cf-hl{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:360px){#cf26 .cf-hl{grid-template-columns:1fr}}',
      '@media (max-width:480px){#cf26 .cf-hl-card .cf-hl-bd{padding:12px 12px 14px}#cf26 .cf-hl-card h3{font-size:1rem}#cf26 .cf-hl-card p{font-size:.85rem}}',
      '#cf26 .cf-hl-card{background:' + PANEL + ';border:1px solid rgba(255,255,255,.07);border-radius:18px;overflow:hidden;transition:transform .25s ease,border-color .25s ease}',
      '#cf26 .cf-hl-ph{aspect-ratio:4/3;max-width:100%;overflow:hidden;background:' + DEEP + '}',
      '#cf26 .cf-hl-ph img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}',
      '#cf26 .cf-hl-card:hover .cf-hl-ph img{transform:scale(1.05)}',
      '#cf26 .cf-hl-bd{padding:18px 20px 22px}',
      '#cf26 .cf-hl-card:hover{transform:translateY(-4px);border-color:rgba(26,204,206,.45)}',
      '#cf26 .cf-hl-card h3{font-family:' + DISP + ';color:#fff;font-size:1.15rem;line-height:1.25;margin-bottom:6px}',
      '#cf26 .cf-hl-card p{color:' + MUTED + ';font-size:.93rem}',
      '#cf26 .cf-asl{display:inline-flex;align-items:center;gap:10px;margin-top:22px;padding:10px 18px;border-radius:999px;border:1px solid rgba(76,189,159,.45);color:' + GREEN + ';font-family:' + SCRIPT + ';font-size:1.3rem}',
      '#cf26 .cf-ev{display:grid;grid-template-columns:1.1fr 1fr;gap:0;margin-top:48px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:' + PANEL + '}',
      '@media (max-width:860px){#cf26 .cf-ev{grid-template-columns:1fr}}',
      '#cf26 .cf-ev-info{padding:34px 34px 30px}',
      '#cf26 .cf-ev-row{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-ev-row:last-of-type{border-bottom:0}',
      '#cf26 .cf-ev-row .cf-ic{color:' + TEAL + ';font-size:22px;margin-top:2px}',
      '#cf26 .cf-ev-row b{display:block;color:#fff;font-weight:700}',
      '#cf26 .cf-ev-row span{color:' + MUTED + ';font-size:.95rem}',
      '#cf26 .cf-ev-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}',
      '#cf26 .cf-ev-btns .cf-btn{padding:11px 18px;font-size:.88rem}',
      '#cf26 .cf-map{position:relative;min-height:340px;background:' + DEEP + '}',
      '#cf26 .cf-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;filter:saturate(.85)}',
      '#cf26 .cf-map-fb{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:' + MUTED + ';text-align:center;padding:20px}',
      '#cf26 .cf-flysec{background:' + DEEP + ';padding:40px 0 0}',
      '#cf26 .cf-flyer{display:flex;gap:22px;align-items:center;margin-top:0;padding:18px;border-radius:18px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.14)}',
      '#cf26 .cf-flyer img{width:92px;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.35)}',
      '#cf26 .cf-flyer b{display:block;color:#fff;font-family:' + DISP + ';font-size:1.1rem}',
      '#cf26 .cf-flyer span{color:' + MUTED + ';font-size:.9rem}',
      '#cf26 .cf-flyer .cf-btn{margin-left:auto}',
      '@media (max-width:560px){#cf26 .cf-flyer{flex-wrap:wrap}#cf26 .cf-flyer .cf-btn{margin-left:0}}',

      /* sponsors */
      '#cf26 .cf-spons{background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(235,190,77,.12),rgba(10,31,42,0) 70%),' + DEEP + '}',
      '#cf26 .cf-tier{margin-top:46px}',
      '#cf26 .cf-tier-h{display:flex;align-items:center;gap:16px;margin-bottom:18px}',
      '#cf26 .cf-tier-h h3{font-family:' + DISP + ';color:' + GOLD + ';font-size:1.05rem;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}',
      '#cf26 .cf-tier-h small{color:' + MUTED + ';font-size:.85rem;white-space:nowrap}',
      '#cf26 .cf-tier-h i{flex:1;height:1px;background:linear-gradient(90deg,rgba(235,190,77,.5),rgba(235,190,77,0))}',
      '#cf26 .cf-sgrid{display:grid;gap:14px}',
      '#cf26 .cf-xl .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}',
      '#cf26 .cf-lg .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}',
      '#cf26 .cf-md .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}',
      '#cf26 .cf-sm .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}',
      '#cf26 .cf-sp{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:16px;background:' + PANEL + ';border:1px solid rgba(235,190,77,.22);padding:22px 16px;min-height:96px;text-decoration:none}',
      '#cf26 .cf-sp img{max-height:64px;width:auto;margin-bottom:10px}',
      '#cf26 .cf-sp b{font-family:' + DISP + ';color:#fff;line-height:1.2}',
      '#cf26 .cf-sp span{color:' + MUTED + ';font-size:.82rem;margin-top:4px;line-height:1.35}',
      '#cf26 .cf-xl .cf-sp{min-height:150px;padding:30px 22px;background:linear-gradient(160deg,rgba(235,190,77,.16),rgba(26,204,206,.08)),' + PANEL + ';border-color:rgba(235,190,77,.5)}',
      '#cf26 .cf-xl .cf-sp b{font-size:1.6rem}',
      '#cf26 .cf-lg .cf-sp b{font-size:1.25rem}',
      '#cf26 .cf-md .cf-sp b{font-size:1.05rem}',
      '#cf26 .cf-sm .cf-sp{min-height:64px;padding:14px 12px}',
      '#cf26 .cf-sm .cf-sp b{font-size:.95rem;font-family:' + BODY + ';font-weight:600}',
      '#cf26 .cf-sp.open{border-style:dashed;border-color:rgba(255,255,255,.22);background:transparent;color:' + MUTED + ';transition:border-color .2s ease,color .2s ease}',
      '#cf26 .cf-sp.open b{color:' + MUTED + ';font-family:' + BODY + ';font-weight:600;font-size:1rem}',
      '#cf26 .cf-sp.open:hover{border-color:' + GOLD + '}',
      '#cf26 .cf-sp.open:hover b{color:' + GOLD + '}',
      '#cf26 .cf-spcta{margin-top:44px;display:flex;flex-direction:column;align-items:center;gap:10px}',
      '#cf26 .cf-spcta p{color:' + MUTED + ';font-size:.92rem}',


      /* about */
      '#cf26 .cf-about{display:grid;grid-template-columns:1.25fr 1fr;gap:56px;align-items:center}',
      '@media (max-width:860px){#cf26 .cf-about{grid-template-columns:1fr;gap:30px}}',
      '#cf26 .cf-about p{color:' + MUTED + ';margin-top:14px}',
      '#cf26 .cf-stats{display:grid;gap:14px}',
      '#cf26 .cf-stat{display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:16px;background:' + PANEL + ';border-left:4px solid ' + TEAL + '}',
      '#cf26 .cf-stat:nth-child(2){border-left-color:' + GREEN + '}',
      '#cf26 .cf-stat:nth-child(3){border-left-color:' + GOLD + '}',
      '#cf26 .cf-stat b{font-family:' + DISP + ';font-size:2.2rem;color:#fff;min-width:90px;line-height:1}',
      '#cf26 .cf-stat span{color:' + MUTED + ';font-size:.95rem}',

      /* news */
      '#cf26 .cf-news{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px}',
      '@media (max-width:900px){#cf26 .cf-news{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:560px){#cf26 .cf-news{grid-template-columns:1fr}}',
      '#cf26 .cf-nc{display:flex;flex-direction:column;background:#fff;color:' + DEEP + ';border-radius:18px;overflow:hidden;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;min-height:230px}',
      '#cf26 .cf-nc-ph{aspect-ratio:16/10;max-width:100%;overflow:hidden;background:' + DEEP + '}',
      '#cf26 .cf-nc-ph img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}',
      '#cf26 .cf-nc:hover .cf-nc-ph img{transform:scale(1.05)}',
      '#cf26 .cf-nc-bd{display:flex;flex-direction:column;flex:1;padding:18px 20px 18px}',
      '#cf26 .cf-nc:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.35)}',
      '#cf26 .cf-nc-top{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:4px 10px;margin-bottom:10px}',
      '#cf26 .cf-nc-out{font-size:.7rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#0e7f80}',
      '#cf26 .cf-nc-date{font-size:.78rem;color:#6b7f86;white-space:nowrap}',
      '#cf26 .cf-nc h3{font-family:' + DISP + ';font-size:1.08rem;line-height:1.3;margin-bottom:8px}',
      '#cf26 .cf-nc p{font-size:.9rem;color:#4a5d64;flex:1}',
      '#cf26 .cf-nc-go{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-weight:700;font-size:.85rem;color:#b07d0a}',

      /* guide */
      '#cf26 .cf-nights{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:36px}',
      '@media (max-width:820px){#cf26 .cf-nights{grid-template-columns:repeat(4,1fr)}}',
      '#cf26 .cf-nt{border-radius:14px;background:' + PANEL + ';padding:14px 8px 12px;text-align:center;border:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-nt.star{background:linear-gradient(160deg,rgba(235,190,77,.28),rgba(26,204,206,.14)),' + PANEL + ';border-color:' + GOLD + '}',
      '#cf26 .cf-nt-c{display:flex;justify-content:center;gap:3px;height:22px;align-items:flex-end;margin-bottom:8px}',
      '#cf26 .cf-nt-c i{display:block;width:4px;height:14px;border-radius:2px;background:rgba(255,255,255,.22);position:relative}',
      '#cf26 .cf-nt-c i.on{background:' + TEAL + '}',
      '#cf26 .cf-nt-c i.on:before{content:"";position:absolute;left:50%;top:-7px;width:5px;height:7px;margin-left:-2.5px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + GOLD + '}',
      '#cf26 .cf-nt b{display:block;font-family:' + DISP + ';color:#fff;font-size:1rem}',
      '#cf26 .cf-nt span{display:block;font-size:.78rem;color:' + MUTED + '}',
      '#cf26 .cf-nt em{display:block;font-style:normal;font-size:.7rem;color:' + GOLD + ';margin-top:4px;line-height:1.25;font-weight:600}',
      '#cf26 .cf-nnote{color:' + MUTED + ';font-size:.9rem;margin-top:14px}',
      '#cf26 .cf-gintro{color:' + MUTED + ';margin-top:30px;max-width:70ch}',
      '#cf26 .cf-ggrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:26px}',
      '@media (max-width:900px){#cf26 .cf-ggrid{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:560px){#cf26 .cf-ggrid{grid-template-columns:1fr}}',
      '#cf26 .cf-gc{display:flex;flex-direction:column;text-align:left;border-radius:18px;overflow:hidden;background:' + PANEL + ';border:1px solid rgba(255,255,255,.07);text-decoration:none;transition:transform .25s ease,border-color .25s ease;width:100%}',
      '#cf26 .cf-gc:hover{transform:translateY(-4px);border-color:rgba(235,190,77,.5)}',
      '#cf26 .cf-gc-img{aspect-ratio:16/9;width:100%;object-fit:cover;background:' + DEEP + '}',
      '#cf26 .cf-gc-ph{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(26,204,206,.22),rgba(235,190,77,.22));color:' + GOLD + ';font-size:44px}',
      '#cf26 .cf-gc-b{padding:18px 20px 20px}',
      '#cf26 .cf-gc h3{font-family:' + DISP + ';color:#fff;font-size:1.08rem;line-height:1.3}',
      '#cf26 .cf-gc p{color:' + MUTED + ';font-size:.88rem;margin-top:6px}',
      '#cf26 .cf-skel{height:240px;border-radius:18px;background:linear-gradient(90deg,' + PANEL + ',#18404f,' + PANEL + ');background-size:200% 100%;animation:cf26sk 1.4s linear infinite}',
      '@keyframes cf26sk{from{background-position:200% 0}to{background-position:0 0}}',

      /* reader */
      '#cf26 .cf-rd{position:fixed;inset:0;z-index:2147482500;background:rgba(5,15,20,.72);display:flex;align-items:flex-start;justify-content:center;padding:4vh 14px;overflow-y:auto}',
      '#cf26 .cf-rd-box{position:relative;width:100%;max-width:760px;background:#fffdf8;color:#1d2b30;border-radius:20px;padding:46px clamp(20px,5vw,54px) 40px;box-shadow:0 30px 80px rgba(0,0,0,.5)}',
      '#cf26 .cf-rd-x{position:absolute;top:12px;right:12px;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1d2b30;background:#f0ebe0;font-size:20px}',
      '#cf26 .cf-rd h1{font-family:' + DISP + ';font-size:clamp(1.6rem,4vw,2.3rem);line-height:1.15;color:' + NAVY + ';margin-bottom:18px}',
      '#cf26 .cf-rd-body{font-size:1.02rem;line-height:1.7}',
      '#cf26 .cf-rd-body p{margin:0 0 1em}',
      '#cf26 .cf-rd-body h2,#cf26 .cf-rd-body h3{font-family:' + DISP + ';color:' + NAVY + ';margin:1.3em 0 .5em;line-height:1.25}',
      '#cf26 .cf-rd-body img{height:auto;margin:1em auto;border-radius:10px}',
      '#cf26 .cf-rd-body ul,#cf26 .cf-rd-body ol{margin:0 0 1em;padding-left:1.4em}',
      '#cf26 .cf-rd-body li{margin:0 0 .5em}',
      '#cf26 .cf-rd-body li ul{margin:.5em 0 0}',
      '#cf26 .cf-rd-body ul{list-style:disc}#cf26 .cf-rd-body ol{list-style:decimal}',
      '#cf26 .cf-rd-body em{color:#4a5d64}',
      '#cf26 .cf-rd-foot{margin-top:26px;padding-top:18px;border-top:1px solid #e7dfcf;display:flex;gap:12px;flex-wrap:wrap}',

      /* share band + footer */
      '#cf26 .cf-share{background:radial-gradient(ellipse 60% 120% at 0% 100%,rgba(235,190,77,.55),rgba(235,190,77,0) 60%),radial-gradient(ellipse 60% 120% at 100% 100%,rgba(26,164,173,.75),rgba(26,164,173,0) 60%),' + NAVY + ';padding:70px 0}',
      '#cf26 .cf-sharebtns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:26px}',
      '#cf26 .cf-follow{margin-top:14px}',
      '#cf26 .cf-follow .cf-btn{font-size:.92rem}',
      '#cf26 .cf-fb{background:#1877f2;color:#fff}',
      '#cf26 .cf-ig{background:linear-gradient(45deg,#f9a63a,#e1306c 50%,#833ab4);color:#fff}',
      '#cf26 .cf-pop{max-width:460px;margin:22px auto 0;background:#fff;color:' + DEEP + ';border-radius:16px;padding:20px;text-align:center;display:none}',
      '#cf26 .cf-pop.open{display:block}',
      '#cf26 .cf-pop p{font-size:.92rem;margin-bottom:14px}',
      '#cf26 .cf-pop .cf-btn{margin:4px}',
      '#cf26 .cf-pop .cf-ghost{color:' + DEEP + ';border-color:rgba(10,31,42,.25)}',
      '#cf26 .cf-foot{background:' + DEEP + ';padding:46px 0 34px;text-align:center;color:' + MUTED + ';font-size:.92rem}',
      '#cf26 .cf-foot b{display:block;font-family:' + DISP + ';color:#fff;font-size:1.25rem;margin-bottom:10px}',
      '#cf26 .cf-foot-l{display:flex;flex-wrap:wrap;gap:8px 22px;justify-content:center;margin:10px 0 22px}',
      '#cf26 .cf-foot-l a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:' + INK + '}',
      '#cf26 .cf-foot-l a:hover{color:' + GOLD + '}',
      '#cf26 .cf-foot small{display:block;font-size:.74rem;opacity:.7;margin-top:14px}',
      '#cf26 .cf-toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:' + GOLD + ';color:' + DEEP + ';font-weight:700;padding:12px 20px;border-radius:999px;z-index:2147482600;transition:all .3s ease;max-width:90vw;text-align:center;font-size:.9rem}',
      '#cf26 .cf-toast.show{opacity:1;transform:translate(-50%,0)}',
      '#cf26 .cf-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}',
      '#cf26 .cf-reveal.in{opacity:1;transform:none}',
      '@media (max-width:620px){#cf26 .cf-sec{padding:60px 0}#cf26 .cf-ev-info{padding:26px 22px}}',
      '@media (prefers-reduced-motion:reduce){#cf26 .cf-marq-in{animation:none}#cf26 .cf-reveal{opacity:1;transform:none;transition:none}#cf26 .cf-skel{animation:none}}'
    ].join('\n');
  }

  /* =====================================================================
     BUILD
     ===================================================================== */
  var root;

  function boot() {
    if (document.getElementById('cf26')) return;
    if (!onThisPage()) { uncover(); return; }
    try {
      loadFonts();
      var st = document.createElement('style');
      st.id = 'cf26-style';
      st.textContent = css();
      document.head.appendChild(st);

      root = document.createElement('div');
      root.id = 'cf26';
      add(root,
        buildNav(), buildHero(), buildCountdown(), buildMarquee(),
        buildEvent(), buildDirections(), buildPartners(), buildAbout(),
        buildNews(), buildGuide(), buildShare(), buildFlyer(), buildFooter());

      var host = document.querySelector('.cco_templatelates_content') || document.body;
      if (host === document.body) document.body.insertBefore(root, document.body.firstChild);
      else host.parentNode.insertBefore(root, host);

      document.documentElement.className += ' cf26-on';
      uncover();
      startCountdown();
      reveal();
      document.addEventListener('click', closeMenus);
      if (/^#donate$/i.test(location.hash)) setTimeout(openDonate, 300);
      else if (/^#[a-z]+$/i.test(location.hash) && document.getElementById('cf-' + location.hash.slice(1))) {
        var hid = location.hash.slice(1);
        setTimeout(function () { goTo(hid); }, 400);
      }
      if (window.console) console.log('Chanukah Festival ' + VERSION + ': footer payload executing');
    } catch (err) {
      if (window.console) console.error('Chanukah Festival ' + VERSION + ' failed', err);
      var r = document.getElementById('cf26');
      if (r && r.parentNode) r.parentNode.removeChild(r);
      document.documentElement.className = document.documentElement.className.replace(' cf26-on', '');
      uncover();
    }
  }

  function loadFonts() {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + ['family=Arvo:wght@400;700', 'family=Satisfy',
      'family=Montserrat:wght@400;500;600;700;800', 'display=swap'].join(AMP);
    document.head.appendChild(l);
  }

  function section(id, extra) {
    var s = el('section', 'cf-sec' + (extra ? ' ' + extra : ''));
    if (id) s.id = 'cf-' + id;
    return s;
  }
  function heading(kicker, title, lead, center) {
    var d = el('div', 'cf-reveal' + (center ? ' cf-center' : ''));
    add(d, kicker ? el('div', 'cf-kicker', kicker) : null, el('h2', 'cf-h2', title),
      lead ? el('p', 'cf-lead', lead) : null, el('div', 'cf-rule'));
    return d;
  }
  function eventOver() { return Date.now() > Date.parse(CFG.event.endUTC); }

  /* ---------- nav ---------- */
  function buildNav() {
    var n = el('nav', 'cf-nav');
    n.setAttribute('aria-label', 'Festival');
    var w = el('div', 'cf-wrap');
    var b = el('a', 'cf-brand');
    b.href = '#cf-top';
    b.addEventListener('click', function (e) { e.preventDefault(); goTo('top'); });
    add(b, el('span', null, 'Chanukah'), document.createTextNode(' Festival'));

    function menuLinks(box, onPick) {
      CFG.MENU.forEach(function (it) {
        var a = link(null, '#cf-' + it[0], it[1]);
        a.addEventListener('click', function (e) { e.preventDefault(); if (onPick) onPick(); goTo(it[0]); });
        box.appendChild(a);
      });
    }

    var ls = el('div', 'cf-links');
    menuLinks(ls);
    var d = el('button', 'cf-btn cf-gold cf-don', 'Donate');
    d.type = 'button';
    d.addEventListener('click', openDonate);

    /* phone menu */
    var tg = el('button', 'cf-burger');
    tg.type = 'button';
    tg.setAttribute('aria-label', 'Menu');
    tg.setAttribute('aria-expanded', 'false');
    tg.setAttribute('aria-controls', 'cf-mmenu');
    add(tg, el('i'), el('i'), el('i'));
    var mm = el('div', 'cf-mmenu');
    mm.id = 'cf-mmenu';
    function setOpen(o) {
      mm.className = o ? 'cf-mmenu open' : 'cf-mmenu';
      tg.className = o ? 'cf-burger open' : 'cf-burger';
      tg.setAttribute('aria-expanded', o ? 'true' : 'false');
    }
    menuLinks(mm, function () { setOpen(false); });
    var md = el('button', 'cf-btn cf-gold', 'Donate');
    md.type = 'button';
    md.addEventListener('click', function () { setOpen(false); openDonate(); });
    mm.appendChild(md);
    tg.addEventListener('click', function (e) { e.stopPropagation(); setOpen(mm.className.indexOf('open') < 0); });
    document.addEventListener('click', function (e) { if (!n.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    add(w, b, ls, d, tg);
    add(n, w, mm);
    return n;
  }

  /* scroll to a section of this page, below the sticky menu */
  function goTo(id) {
    var t = document.getElementById('cf-' + id);
    if (!t) return;
    var nav = root.querySelector('.cf-nav');
    var off = nav ? nav.offsetHeight : 0;
    var y = t.getBoundingClientRect().top + window.pageYOffset - (id === 'top' ? 0 : off);
    try { window.scrollTo({ top: y, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, y); }
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  /* ---------- donate pop-up ---------- */
  /* Our own three steps, writing into the ChabadOne form on this page, following the
     proven submit sequence (project notes: ChabadOne-Proven-Submit-Sequence,
     Footer-Build-Gates rules 10-31, and the Sukkot build on this site):
     - details write through as the donor types; setNative no-ops when unchanged
     - the card is written LAST, read back and re-applied before the click
     - one real click on #input_2 in the same tick; never gate on the (invisible) reCAPTCHA
     - .form-validation-error = refused; submit button gone = success */
  function donateButton(label) {
    var b = el('button', 'cf-btn cf-gold', label);
    b.type = 'button';
    b.addEventListener('click', openDonate);
    return b;
  }
  var DM = null;
  function nativeForm() { return document.getElementById(CFG.AID); }
  function $id(id) { return document.getElementById(id); }
  function fire(e, types) { types.forEach(function (t) { try { e.dispatchEvent(new Event(t, { bubbles: true })); } catch (x) {} }); }
  function setNative(id, v) {
    var e = $id(id); if (!e) return false;
    var val = v == null ? '' : String(v);
    if (e.tagName === 'SELECT') return setSelect(id, val);
    if (String(e.value) === val) return true;          /* no-op when unchanged */
    e.value = val;
    fire(e, ['input', 'change', 'keyup', 'blur']);
    return true;
  }
  /* match by value, then padded/unpadded number, then visible text; never a bare .value */
  function setSelect(id, want) {
    var e = $id(id); if (!e || !e.options) return false;
    want = String(want == null ? '' : want).trim();
    var n = parseInt(want, 10);
    var alt = /^\d+$/.test(want) ? [String(n), ('0' + n).slice(-2)] : [];
    for (var pass = 0; pass < 3; pass++) {
      for (var i = 0; i < e.options.length; i++) {
        var o = e.options[i];
        var hit = pass === 0 ? o.value === want : pass === 1 ? alt.indexOf(o.value) > -1 : (o.text || '').trim() === want;
        if (hit) {
          if (e.selectedIndex !== i) { e.selectedIndex = i; fire(e, ['input', 'change', 'blur']); }
          return true;
        }
      }
    }
    if (window.console) console.warn('[cf26] no option', want, 'in', id);
    return false;
  }
  function setChecked(id, on) {
    var e = $id(id); if (!e) return false;
    if (!!e.checked !== !!on) e.click();
    return true;
  }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 }); }

  function openDonate() {
    var form = nativeForm();
    if (!form || !$id(CFG.DONATE.F.submit)) { window.open(CFG.DONATE_URL, '_blank'); return; }
    if (!DM) DM = buildDonate(form);
    DM.ov.className = 'cf-dm';
    document.documentElement.style.overflow = 'hidden';
    DM.x.focus();
    try { history.replaceState(null, '', '#donate'); } catch (e) {}
  }
  function closeDonate() {
    if (!DM || DM.ov.className.indexOf('cf-dm-off') > -1) return;
    if (DM.busy()) return;
    DM.ov.className = 'cf-dm cf-dm-off';
    document.documentElement.style.overflow = '';
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  }

  function buildDonate(form) {
    var D = CFG.DONATE, F = D.F;
    var st = { step: 1, amount: 0, monthly: false, busy: false };
    var ov = el('div', 'cf-dm cf-dm-off');
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Donate');
    var box = el('div', 'cf-dm-box');

    var hd = el('div', 'cf-dm-hd');
    var x = el('button', 'cf-dm-x'); x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.appendChild(icon('x'));
    var ht = el('div');
    add(ht, el('b', null, 'Support the Chanukah Festival'), el('span', null, 'Your gift keeps the festival free for the whole community.'));
    add(hd, ht, x);

    var steps = el('div', 'cf-dm-steps');
    var stepEls = ['Amount', 'Your details', 'Payment'].map(function (t, i) {
      var s2 = el('div', 'cf-dm-st');
      add(s2, el('i', null, String(i + 1)), el('span', null, t));
      steps.appendChild(s2);
      return s2;
    });

    var body = el('div', 'cf-dm-body');
    var err = el('div', 'cf-dm-err'); err.setAttribute('role', 'alert');

    var inputs = {};
    function field(key, label, type, opts) {
      opts = opts || {};
      var w = el('label', 'cf-fld' + (opts.half ? ' half' : '') + (opts.third ? ' third' : ''));
      var i;
      if (opts.mirror) {                      /* mirror the platform's own options exactly */
        i = document.createElement('select');
        var src = $id(opts.mirror);
        if (src && src.options) for (var k = 0; k < src.options.length; k++) {
          var o = document.createElement('option');
          o.value = src.options[k].value; o.textContent = src.options[k].textContent;
          i.appendChild(o);
        }
      } else {
        i = document.createElement('input');
        i.type = type || 'text';
      }
      i.id = 'cf-dm-' + key; i.className = 'cf-in';
      if (opts.ac) i.setAttribute('autocomplete', opts.ac);
      if (opts.im) i.setAttribute('inputmode', opts.im);
      add(w, el('span', null, label + (opts.req ? ' *' : '')), i);
      inputs[key] = { el: i, req: !!opts.req, label: label };
      /* write through as the donor types (the card is written last, at submit) */
      if (opts.native) {
        i.addEventListener('input', function () { setNative(opts.native, i.value.trim()); });
      }
      return w;
    }
    function v(k) { return inputs[k] ? inputs[k].el.value.trim() : ''; }
    function tick(id, label, checked) {
      var w = el('label', 'cf-dm-tick');
      var c = document.createElement('input'); c.type = 'checkbox'; c.id = id; c.checked = !!checked;
      add(w, c, el('span', null, label));
      return { w: w, c: c };
    }

    /* step 1: amount */
    var p1 = el('div', 'cf-dm-pane');
    p1.appendChild(el('h3', null, 'Choose your gift'));
    var chips = el('div', 'cf-dm-chips');
    var other = document.createElement('input');
    other.type = 'number'; other.min = '1'; other.step = '1'; other.setAttribute('inputmode', 'decimal');
    other.className = 'cf-in'; other.id = 'cf-dm-other'; other.placeholder = 'Other amount';
    function pickAmt(a, btn) {
      st.amount = a;
      [].forEach.call(chips.querySelectorAll('button'), function (b) { b.className = 'cf-chip' + (b === btn ? ' on' : ''); });
      if (btn) other.value = '';
      sumLine();
    }
    D.amounts.forEach(function (a) {
      var b = el('button', 'cf-chip', money(a)); b.type = 'button';
      b.addEventListener('click', function () { pickAmt(a, b); });
      chips.appendChild(b);
    });
    other.addEventListener('input', function () { pickAmt(parseFloat(other.value) || 0, null); });
    var oth = el('label', 'cf-dm-other');
    add(oth, el('span', null, '$'), other);
    var mon = tick('cf-dm-monthly', 'Make this a monthly gift', false);
    mon.c.addEventListener('change', function () { st.monthly = mon.c.checked; sumLine(); });
    add(p1, chips, oth, mon.w);

    /* step 2: details */
    var p2 = el('div', 'cf-dm-pane');
    p2.appendChild(el('h3', null, 'Your details'));
    var g2 = el('div', 'cf-dm-grid');
    add(g2,
      field('first', 'First name', 'text', { req: true, half: true, ac: 'given-name', native: F.first }),
      field('last', 'Last name', 'text', { req: true, half: true, ac: 'family-name', native: F.last }),
      field('email', 'Email', 'email', { req: true, ac: 'email', native: F.email }),
      field('phone', 'Phone', 'tel', { ac: 'tel', native: F.phone }),
      field('addr1', 'Street address', 'text', { req: true, ac: 'address-line1', native: F.addr1 }),
      field('addr2', 'Apt, suite (optional)', 'text', { ac: 'address-line2', native: F.addr2 }),
      field('city', 'City', 'text', { req: true, third: true, ac: 'address-level2', native: F.city }),
      field('state', 'State', 'text', { req: true, third: true, ac: 'address-level1', native: F.state }),
      field('zip', 'ZIP code', 'text', { req: true, third: true, ac: 'postal-code', im: 'numeric', native: F.zip }));
    p2.appendChild(g2);

    /* step 3: card */
    var p3 = el('div', 'cf-dm-pane');
    p3.appendChild(el('h3', null, 'Payment'));
    var sum3 = el('div', 'cf-dm-sum3');
    var g3 = el('div', 'cf-dm-grid');
    add(g3,
      field('ccName', 'Name on card', 'text', { req: true, ac: 'cc-name' }),
      field('ccNum', 'Card number', 'text', { req: true, ac: 'cc-number', im: 'numeric' }),
      field('ccMon', 'Exp. month', null, { req: true, third: true, ac: 'cc-exp-month', mirror: F.ccMon }),
      field('ccYear', 'Exp. year', null, { req: true, third: true, ac: 'cc-exp-year', mirror: F.ccYear }),
      field('ccCvv', 'Security code', 'text', { req: true, third: true, ac: 'cc-csc', im: 'numeric' }));
    var same = tick('cf-dm-same', 'Billing address is the same as my address', true);
    var gb = el('div', 'cf-dm-grid cf-dm-bill');
    add(gb,
      field('bAddr', 'Billing street address', 'text', { ac: 'billing address-line1' }),
      field('bCity', 'City', 'text', { third: true, ac: 'billing address-level2' }),
      field('bState', 'State', 'text', { third: true, ac: 'billing address-level1' }),
      field('bZip', 'ZIP code', 'text', { third: true, ac: 'billing postal-code', im: 'numeric' }));
    gb.style.display = 'none';
    same.c.addEventListener('change', function () { gb.style.display = same.c.checked ? 'none' : ''; });
    var optNative = $id(F.optin);
    var opt = tick('cf-dm-optin', 'Send me news and updates by email', optNative ? optNative.checked : false);
    var secure = el('p', 'cf-dm-secure', 'Payments are processed securely through our ChabadOne donation form. We accept Visa, MasterCard, American Express and Discover.');
    add(p3, sum3, g3, same.w, gb, opt.w, secure);

    var p4 = el('div', 'cf-dm-pane cf-dm-done');
    var panes = [p1, p2, p3, p4];
    add(body, err, p1, p2, p3, p4);

    var ft = el('div', 'cf-dm-ft');
    var back = el('button', 'cf-btn cf-ghost cf-dm-back', 'Back'); back.type = 'button';
    var sumEl = el('div', 'cf-dm-sum');
    var next = el('button', 'cf-btn cf-gold cf-dm-next', 'Continue'); next.type = 'button';
    add(ft, back, sumEl, next);
    add(box, hd, steps, body, ft);
    ov.appendChild(box);
    root.appendChild(ov);

    function sumLine() {
      var t = st.amount > 0 ? money(st.amount) + (st.monthly ? ' monthly' : ' one-time') : '';
      sumEl.textContent = t;
      sum3.textContent = t ? 'Your gift: ' + t : '';
      if (st.step === 3 && !st.busy) next.textContent = st.amount > 0 ? 'Donate ' + money(st.amount) + (st.monthly ? ' a month' : '') : 'Donate';
    }
    function show(n) {
      st.step = n;
      panes.forEach(function (p, i) { p.style.display = i === n - 1 ? 'block' : 'none'; });
      stepEls.forEach(function (e, i) { e.className = 'cf-dm-st' + (i + 1 === n ? ' on' : i + 1 < n ? ' done' : ''); });
      steps.style.display = n === 4 ? 'none' : '';
      back.style.visibility = n > 1 && n < 4 ? 'visible' : 'hidden';
      next.style.display = n === 4 ? 'none' : '';
      next.textContent = 'Continue';
      err.textContent = '';
      sumLine();
      body.scrollTop = 0;
    }
    function fail(msg) { err.textContent = msg; body.scrollTop = 0; }
    function need(keys) {
      for (var i = 0; i < keys.length; i++) {
        var f = inputs[keys[i]];
        if (f.req && !f.el.value.trim()) { fail('Please fill in ' + f.label.toLowerCase() + '.'); f.el.focus(); return false; }
      }
      return true;
    }

    /* every non-card native field */
    function commitDetails() {
      setNative(F.first, v('first')); setNative(F.last, v('last'));
      setNative(F.email, v('email')); setNative(F.phone, v('phone'));
      setNative(F.addr1, v('addr1')); setNative(F.addr2, v('addr2'));
      setNative(F.city, v('city')); setNative(F.state, v('state')); setNative(F.zip, v('zip'));
      setSelect(F.country, D.country);
      setNative(F.amount, String(st.amount));
      setChecked(F.monthly, st.monthly);
      setChecked(F.optin, opt.c.checked);
      var sm = same.c.checked;
      setNative(F.bAddr, sm ? (v('addr1') + (v('addr2') ? ' ' + v('addr2') : '')) : v('bAddr'));
      setNative(F.bCity, sm ? v('city') : v('bCity'));
      setNative(F.bState, sm ? v('state') : v('bState'));
      setNative(F.bZip, sm ? v('zip') : v('bZip'));
      setSelect(F.bCountry, D.country);
    }
    var CARD = ['ccName', 'ccNum', 'ccCvv', 'ccMon', 'ccYear'];
    function cardWant(k) { return k === 'ccNum' ? v(k).replace(/\D/g, '') : v(k); }
    function writeCard() { CARD.forEach(function (k) { setNative(F[k], cardWant(k)); }); }
    function cardMismatch() {
      return CARD.filter(function (k) { var e = $id(F[k]); return !e || String(e.value) !== cardWant(k); });
    }

    next.addEventListener('click', function () {
      if (st.busy) return;
      if (st.step === 1) {
        if (!(st.amount > 0)) { fail('Please choose an amount or enter your own.'); return; }
        setNative(F.amount, String(st.amount));
        setChecked(F.monthly, st.monthly);
        show(2); return;
      }
      if (st.step === 2) {
        if (!need(['first', 'last', 'email', 'addr1', 'city', 'state', 'zip'])) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) { fail('Please check your email address.'); inputs.email.el.focus(); return; }
        commitDetails();
        if (!v('ccName')) inputs.ccName.el.value = (v('first') + ' ' + v('last')).trim();
        show(3); return;
      }
      if (st.step === 3) submitDonation();
    });
    back.addEventListener('click', function () { if (!st.busy && st.step > 1) show(st.step - 1); });
    x.addEventListener('click', closeDonate);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeDonate(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDonate(); });

    /* ---- submit ---- */
    var DECLINE = /transaction has been declined|error creating your recurring payment|duplicate of subscription|unable to charge|there are errors on the form|Error - E\d{5}|card number is invalid|has expired|insufficient funds/i;
    function clearErrors() {
      [].forEach.call(form.querySelectorAll('.form-error-message, .form-error-js, .form-button-error'), function (e) {
        if (e.parentNode) e.parentNode.removeChild(e);
      });
      err.textContent = '';
    }
    function nativeErrorText() {
      var bits = [];
      [].forEach.call(form.querySelectorAll('.form-error-message, .form-error-js, .form-button-error'), function (e) {
        var t = (e.innerText || e.textContent || '').trim(); if (t) bits.push(t);
      });
      return bits.join(' ');
    }
    function release(msg) {
      st.busy = false;
      next.removeAttribute('disabled');
      back.style.visibility = 'visible';
      sumLine();
      if (msg) fail(msg);
      try { if (window.grecaptcha && grecaptcha.reset) grecaptcha.reset(); } catch (e) {}
    }
    function submitDonation() {
      if (!need(['ccName', 'ccNum', 'ccMon', 'ccYear', 'ccCvv'])) return;
      if (!same.c.checked && !(v('bAddr') && v('bCity') && v('bState') && v('bZip'))) { fail('Please fill in your billing address.'); return; }
      var btn = $id(F.submit);
      if (!btn) { fail('The donation form did not load. Please refresh the page and try again.'); return; }
      clearErrors();                                   /* stale decline text must not judge this attempt */
      try {
        commitDetails();                               /* everything else first */
        writeCard();                                   /* the card LAST */
        for (var t = 0; t < 3 && cardMismatch().length; t++) writeCard();
        var bad = cardMismatch();
        if (bad.length && window.console) console.warn('[cf26] card fields not accepted by the form:', bad);
      } catch (e) { if (window.console) console.error('[cf26] commit failed', e); }
      st.busy = true;
      next.setAttribute('disabled', 'disabled');
      next.textContent = 'Processing…';
      back.style.visibility = 'hidden';
      btn.click();                                     /* one real click, same tick */
      watchCaptchaChallenge();
      setTimeout(checkValidation, 450);
      setTimeout(checkValidation, 1400);
      watchOutcome();
    }
    function checkValidation() {
      if (!st.busy) return;
      var bad = form.querySelectorAll('.form-validation-error');
      if (!bad.length) return;
      var ids = [].map.call(bad, function (f) { return f.id; }).filter(Boolean);
      if (window.console) console.warn('[cf26] form refused, required fields:', ids);
      var onCard = ids.some(function (id) { return /_cc_/.test(id); });
      release(onCard ? 'Please check your card details.' : 'Please check your details on the previous step.');
    }
    function watchCaptchaChallenge() {
      var n = 0;
      var t = setInterval(function () {
        if (++n > 120 || !st.busy) { clearInterval(t); return; }
        var fr = document.querySelectorAll('iframe[src*="bframe"], iframe[title*="challenge"]');
        for (var i = 0; i < fr.length; i++) {
          var b = fr[i];
          while (b.parentElement && b.parentElement !== document.body) b = b.parentElement;
          if (b.parentElement === document.body) b.style.setProperty('z-index', '2147483000', 'important');
        }
      }, 250);
    }
    function watchOutcome() {
      var started = Date.now();
      var poll = setInterval(function () {
        if (!st.busy) { clearInterval(poll); return; }
        var gone = !document.body.contains(form) || !document.body.contains($id(F.submit));
        if (gone) { clearInterval(poll); st.busy = false; thanks(); return; }
        if (Date.now() - started > 2200) {
          var txt = nativeErrorText();
          if (txt && DECLINE.test(txt)) { clearInterval(poll); release(txt.slice(0, 220)); return; }
        }
        if (Date.now() - started > 90000) {
          clearInterval(poll);
          release('We did not get an answer from the payment system. Please check your email for a receipt before trying again.');
        }
      }, 400);
    }
    function thanks() {
      p4.innerHTML = '';
      var done = el('button', 'cf-btn cf-gold', 'Back to the festival'); done.type = 'button';
      done.addEventListener('click', closeDonate);
      add(p4, el('div', 'cf-dm-ok', '✓'), el('h3', null, 'Thank you!'),
        el('p', null, 'Your ' + (st.monthly ? 'monthly ' : '') + 'gift of ' + money(st.amount) + ' helps keep the Chanukah Festival free for everyone.'),
        el('p', null, 'A receipt is on its way to ' + v('email') + '.'), done);
      ['ccNum', 'ccCvv'].forEach(function (k) { inputs[k].el.value = ''; });
      show(4);
    }

    show(1);
    return { ov: ov, x: x, busy: function () { return st.busy; } };
  }

  function evRow(ic, a, b) {
    var r = el('div', 'cf-ev-row');
    var t = el('div');
    add(t, el('b', null, a), el('span', null, b));
    add(r, icon(ic), t);
    return r;
  }

  /* ---------- directions & parking ---------- */
  function buildDirections() {
    var s = section('directions', 'cf-alt');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('Getting there', 'Directions & Parking', null, true));
    var ev = el('div', 'cf-ev cf-reveal');
    var info = el('div', 'cf-ev-info');
    add(info, evRow('pin', CFG.event.venue, CFG.event.street + ' ' + CFG.event.cityLine));
    if (CFG.PARKING.length) {
      var pk = el('div', 'cf-park');
      pk.appendChild(el('div', 'cf-kicker', 'Parking nearby'));
      var list = el('div', 'cf-plist');
      CFG.PARKING.forEach(function (g) {
        var a = link('cf-prow', 'https://www.google.com/maps/dir/?' + qs({ api: '1', destination: g.addr + ', Riverside, CA 92501' }), null, true);
        var t = el('div');
        add(t, el('b', null, g.addr), el('span', null, g.name));
        add(a, icon('pin'), t, el('em', null, g.walk + ' walk'));
        list.appendChild(a);
      });
      pk.appendChild(list);
      var ul = el('ul');
      (CFG.PARKING_NOTES || []).forEach(function (line) { ul.appendChild(el('li', null, line)); });
      pk.appendChild(ul);
      info.appendChild(pk);
    }
    var btns = el('div', 'cf-ev-btns');
    var g = link('cf-btn cf-teal', directionsUrl(), 'Google Maps', true);
    g.insertBefore(icon('pin'), g.firstChild);
    var ap = link('cf-btn cf-ghost', 'https://maps.apple.com/?' + qs({ daddr: CFG.event.mapQuery }), 'Apple Maps', true);
    ap.insertBefore(icon('pin'), ap.firstChild);
    add(btns, g, ap);
    info.appendChild(btns);

    var map = el('div', 'cf-map');
    var fb = el('div', 'cf-map-fb');
    add(fb, icon('pin'), el('b', null, CFG.event.venue), el('span', null, CFG.event.street + ' ' + CFG.event.cityLine));
    map.appendChild(fb);
    var fr = document.createElement('iframe');
    fr.title = 'Map to ' + CFG.event.venue;
    fr.loading = 'lazy';
    fr.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    fr.src = CFG.event.mapEmbed;
    map.appendChild(fr);
    add(ev, info, map);
    w.appendChild(ev);
    s.appendChild(w);
    return s;
  }

  /* ---------- hero ---------- */
  function buildHero() {
    var h = el('header', 'cf-hero');
    h.id = 'cf-top';

    /* video band with the title on top */
    var band = el('div', 'cf-vid');
    var vidSrc = asset(CFG.HERO.video);
    var posterSrc = asset(CFG.HERO.poster);
    var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('loop', '');
    v.setAttribute('preload', still ? 'none' : 'auto');
    v.setAttribute('aria-hidden', 'true');
    v.poster = posterSrc;
    if (!still) v.autoplay = true;
    v.src = vidSrc;
    band.appendChild(v);

    var btn = el('button', 'cf-vbtn');
    btn.type = 'button';
    function setBtn() {
      var playing = !v.paused;
      btn.textContent = playing ? '\u275a\u275a' : '\u25b6';
      btn.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
    }
    btn.addEventListener('click', function () { if (v.paused) v.play(); else v.pause(); });
    v.addEventListener('play', setBtn);
    v.addEventListener('pause', setBtn);
    if (!still) {
      var tryPlay = function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
      v.addEventListener('canplay', tryPlay, { once: true });
    }
    setBtn();
    band.appendChild(btn);

    var txt = el('div', 'cf-vtext');
    var ann = el('div', 'cf-annual');
    var b = el('b');
    add(b, document.createTextNode(CFG.edition), el('sup', null, CFG.editionSuffix), document.createTextNode(' Annual'));
    add(ann, el('i'), b, el('i'));
    var tags = el('div', 'cf-tags');
    add(tags, el('span', 'cf-tag', 'Free Admission!'), el('span', 'cf-tag', 'All Are Welcome!'));
    add(txt,
      el('p', 'cf-invite', CFG.host + ' Invites You To Our'),
      ann,
      el('h1', 'cf-t1', 'Chanukah'.toUpperCase()),
      el('div', 'cf-t2', 'FESTIVAL'),
      tags);
    band.appendChild(txt);
    band.appendChild(el('div', 'cf-bh', 'B\u201dH'));

    /* date, place and buttons under the video */
    var ctas = el('div', 'cf-ctas');
    ctas.appendChild(calendarButton('cf-btn cf-gold'));
    var dir = link('cf-btn cf-ghost', '#cf-directions', 'Directions & Parking');
    dir.insertBefore(icon('pin'), dir.firstChild);
    dir.addEventListener('click', function (e) { e.preventDefault(); goTo('directions'); });
    ctas.appendChild(dir);
    var sh = el('button', 'cf-btn cf-ghost', 'Share');
    sh.type = 'button';
    sh.insertBefore(icon('share'), sh.firstChild);
    sh.addEventListener('click', function () {
      var t = document.getElementById('cf-share');
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
    ctas.appendChild(sh);

    var info = el('div', 'cf-wrap cf-info');
    add(info,
      whenLine(),
      el('div', 'cf-night', CFG.event.nightLine),
      el('div', 'cf-venue', CFG.event.venue),
      el('div', 'cf-addr', CFG.event.street + ' Riverside, CA'),
      ctas);

    add(h, band, info);
    return h;
  }

  function whenLine() {
    var d = el('div', 'cf-when');
    add(d, el('span', null, CFG.event.dayLine), el('span', 'cf-sep', ' \u2022 '), el('span', 'cf-tm', CFG.event.timeLine));
    return d;
  }
  function directionsUrl() {
    return 'https://www.google.com/maps/dir/?' + qs({ api: '1', destination: CFG.event.mapQuery });
  }
  function gcalUrl() {
    var f = function (iso) { return iso.replace(/[-:]/g, '').replace(/\.\d+/, ''); };
    return 'https://calendar.google.com/calendar/render?' + qs({
      action: 'TEMPLATE',
      text: CFG.edition + CFG.editionSuffix + ' Annual Chanukah Festival',
      dates: f(CFG.event.startUTC) + '/' + f(CFG.event.endUTC),
      location: CFG.event.mapQuery,
      details: 'Grand Menorah Lighting, traditional food, live music and fun for the whole family. Free admission, all are welcome! ' + CFG.SHARE.url
    });
  }
  function icsFile() {
    var f = function (iso) { return iso.replace(/[-:]/g, '').replace(/\.\d+/, ''); };
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Chabad JCC Riverside//Chanukah Festival//EN', 'BEGIN:VEVENT',
      'UID:chanukah-festival-' + CFG.event.startUTC.slice(0, 10) + '@jewishriverside.com',
      'DTSTAMP:' + f(new Date().toISOString()),
      'DTSTART:' + f(CFG.event.startUTC), 'DTEND:' + f(CFG.event.endUTC),
      'SUMMARY:' + CFG.edition + CFG.editionSuffix + ' Annual Chanukah Festival',
      'LOCATION:' + CFG.event.mapQuery.replace(/,/g, '\\,'),
      'DESCRIPTION:Grand Menorah Lighting\\, traditional food\\, live music and fun for the whole family. Free admission!',
      'URL:' + CFG.SHARE.url,
      'END:VEVENT', 'END:VCALENDAR'];
    return new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  }
  function calendarButton(cls) {
    var wrap = el('div', 'cf-calwrap');
    var b = el('button', cls, 'Add to Calendar');
    b.type = 'button';
    b.setAttribute('aria-haspopup', 'true');
    b.insertBefore(icon('cal'), b.firstChild);
    var m = el('div', 'cf-menu');
    var g = link(null, gcalUrl(), 'Google Calendar', true);
    g.insertBefore(icon('cal'), g.firstChild);
    var a = el('button', null, 'Apple / Outlook (.ics)');
    a.type = 'button';
    a.insertBefore(icon('dl'), a.firstChild);
    a.addEventListener('click', function () {
      var url = URL.createObjectURL(icsFile());
      var t = document.createElement('a');
      t.href = url; t.download = 'Chanukah-Festival-2026.ics';
      document.body.appendChild(t); t.click(); document.body.removeChild(t);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      m.className = 'cf-menu';
    });
    add(m, g, a);
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = m.className.indexOf('open') > -1;
      closeMenus();
      m.className = open ? 'cf-menu' : 'cf-menu open';
    });
    add(wrap, b, m);
    return wrap;
  }
  function closeMenus() {
    if (!root) return;
    var ms = root.querySelectorAll('.cf-menu.open');
    for (var i = 0; i < ms.length; i++) ms[i].className = 'cf-menu';
  }

  /* ---------- countdown ---------- */
  var countEls = null;
  function buildCountdown() {
    var s = el('div', 'cf-count');
    var w = el('div', 'cf-wrap');
    var units = el('div', 'cf-units');
    countEls = {};
    [['d', 'Days'], ['h', 'Hours'], ['m', 'Min'], ['s', 'Sec']].forEach(function (u) {
      var c = el('div', 'cf-unit');
      var b = el('b', null, '00');
      countEls[u[0]] = b;
      add(c, b, el('span', null, u[1]));
      units.appendChild(c);
    });
    countEls.label = el('div', 'cf-count-l', 'The lights go up in');
    countEls.units = units;
    countEls.msg = el('div', 'cf-countmsg');
    countEls.msg.style.display = 'none';
    add(w, countEls.label, units, countEls.msg);
    s.appendChild(w);
    return s;
  }
  function startCountdown() {
    var start = Date.parse(CFG.event.startUTC), end = Date.parse(CFG.event.endUTC);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var now = Date.now();
      if (now >= start) {
        countEls.label.style.display = 'none';
        countEls.units.style.display = 'none';
        countEls.msg.style.display = 'block';
        countEls.msg.textContent = now < end ?
          'The festival is happening now \u2014 come join us!' :
          'Thank you for celebrating with us. See you next Chanukah!';
        return now < end;
      }
      var t = Math.floor((start - now) / 1000);
      countEls.d.textContent = String(Math.floor(t / 86400));
      countEls.h.textContent = pad(Math.floor(t % 86400 / 3600));
      countEls.m.textContent = pad(Math.floor(t % 3600 / 60));
      countEls.s.textContent = pad(t % 60);
      return true;
    }
    if (tick()) {
      var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000);
    }
  }

  /* ---------- sponsor marquee ---------- */
  function allSponsorNames() {
    return CFG.PARTNERS.map(function (n) { return T(n.name); });
  }
  function buildMarquee() {
    var names = allSponsorNames();
    if (!names.length) return null;
    var m = el('div', 'cf-marq');
    m.setAttribute('aria-label', 'Thank you to our community partners');
    var inner = el('div', 'cf-marq-in');
    var reps = Math.max(2, Math.ceil(12 / names.length)) * 2;
    for (var r = 0; r < reps; r++) {
      inner.appendChild(el('em', null, 'Thank you'));
      names.forEach(function (n) { inner.appendChild(el('span', null, n)); });
    }
    m.appendChild(inner);
    return m;
  }

  /* ---------- event ---------- */
  function buildEvent() {
    var s = section('event');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('The evening', 'An evening of light for all of Riverside',
      'Free admission. All are welcome. Bring the whole family.', true));

    var hl = el('div', 'cf-hl');
    CFG.highlights.forEach(function (x, i) {
      var c = el('div', 'cf-hl-card cf-reveal');
      c.style.transitionDelay = (i * 0.08) + 's';
      var ph = el('div', 'cf-hl-ph');
      var im = document.createElement('img');
      im.src = asset(x.img); im.alt = T(x.title); im.loading = 'lazy';
      ph.appendChild(im);
      var bd = el('div', 'cf-hl-bd');
      add(bd, el('h3', null, x.title), el('p', null, x.text));
      add(c, ph, bd);
      hl.appendChild(c);
    });
    w.appendChild(hl);
    if (CFG.accessNote) {
      var asl = el('div', 'cf-center');
      var p = el('div', 'cf-asl', CFG.accessNote);
      p.insertBefore(icon('asl'), p.firstChild);
      asl.appendChild(p);
      w.appendChild(asl);
    }

    var ev = el('div', 'cf-ev cf-ev1 cf-reveal');
    var info = el('div', 'cf-ev-info');
    add(info,
      el('div', 'cf-kicker', 'Event details'),
      evRow('cal', 'Monday, December 7, 2026', CFG.event.nightLine),
      evRow('clock', '6:00 \u2013 8:00 PM', 'Menorah lighting during the evening'),
      evRow('pin', CFG.event.venue, CFG.event.street + ' ' + CFG.event.cityLine));
    var btns = el('div', 'cf-ev-btns');
    var dp = link('cf-btn cf-teal', '#cf-directions', 'Directions & parking');
    dp.insertBefore(icon('pin'), dp.firstChild);
    dp.addEventListener('click', function (e) { e.preventDefault(); goTo('directions'); });
    add(btns, calendarButton('cf-btn cf-ghost'), dp);
    info.appendChild(btns);
    ev.appendChild(info);
    w.appendChild(ev);

    s.appendChild(w);
    return s;
  }

  /* ---------- flyer download (last thing before the footer) ---------- */
  function buildFlyer() {
    if (!CFG.FLYER) return null;
    var s = el('section', 'cf-flysec');
    var w = el('div', 'cf-wrap');
    var fl = el('div', 'cf-flyer cf-reveal');
    var im = document.createElement('img');
    im.src = CFG.FLYER; im.alt = 'Chanukah Festival 2026 flyer'; im.loading = 'lazy';
    var tx = el('div');
    add(tx, el('b', null, 'Download the flyer'), el('span', null, 'Print it, post it, send it to a friend.'));
    var dl = link('cf-btn cf-ghost', CFG.FLYER, 'Download', true);
    dl.setAttribute('download', 'Chanukah-Festival-2026-Flyer.png');
    dl.insertBefore(icon('dl'), dl.firstChild);
    add(fl, im, tx, dl);
    w.appendChild(fl);
    s.appendChild(w);
    return s;
  }

  /* ---------- sponsors ---------- */
  function buildPartners() {
    if (!CFG.PARTNERS.length) return null;
    var s = section('partners', 'cf-spons');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('With gratitude', 'Community Partners', CFG.PARTNERS_INTRO, true));
    var g = el('div', 'cf-sgrid cf-reveal');
    CFG.PARTNERS.forEach(function (n) {
      var c = el(n.url ? 'a' : 'div', 'cf-sp');
      if (n.url) { c.href = n.url; c.target = '_blank'; c.rel = 'noopener'; }
      if (n.logo) {
        var im = document.createElement('img');
        im.src = n.logo; im.alt = T(n.name); im.loading = 'lazy';
        c.appendChild(im);
      }
      add(c, el('b', null, n.name), n.sub ? el('span', null, n.sub) : null);
      g.appendChild(c);
    });
    var tier = el('div', 'cf-tier cf-lg');
    tier.appendChild(g);
    w.appendChild(tier);
    s.appendChild(w);
    return s;
  }

  /* ---------- about ---------- */
  function buildAbout() {
    var s = section('about', 'cf-alt');
    var w = el('div', 'cf-wrap cf-about');
    var l = el('div', 'cf-reveal');
    l.appendChild(heading('About the festival', 'Sharing the light, together'));
    CFG.about.forEach(function (p) { l.appendChild(el('p', null, p)); });
    var r = el('div', 'cf-stats cf-reveal');
    CFG.stats.forEach(function (x) {
      var c = el('div', 'cf-stat');
      add(c, el('b', null, x.big), el('span', null, x.small));
      r.appendChild(c);
    });
    add(w, l, r);
    s.appendChild(w);
    return s;
  }

  /* ---------- news ---------- */
  function buildNews() {
    if (!CFG.NEWS.length) return null;
    var s = section('news');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('Press', 'In the News', 'Coverage of the festival over the years.', true));
    var g = el('div', 'cf-news');
    CFG.NEWS.forEach(function (n, i) {
      var a = link('cf-nc cf-reveal', n.url, null, true);
      a.style.transitionDelay = (i % 4 * 0.08) + 's';
      if (n.img) {
        var ph = el('div', 'cf-nc-ph');
        var im = document.createElement('img');
        im.src = asset(n.img); im.alt = ''; im.loading = 'lazy';
        ph.appendChild(im);
        a.appendChild(ph);
      }
      var bd = el('div', 'cf-nc-bd');
      var top = el('div', 'cf-nc-top');
      add(top, el('span', 'cf-nc-out', n.outlet), el('span', 'cf-nc-date', n.date));
      var go = el('span', 'cf-nc-go', 'Read');
      go.appendChild(icon('ext'));
      add(bd, top, el('h3', null, n.title), n.blurb ? el('p', null, n.blurb) : null, go);
      a.appendChild(bd);
      g.appendChild(a);
    });
    w.appendChild(g);
    s.appendChild(w);
    return s;
  }

  /* ---------- Chanukah guide ---------- */
  function buildGuide() {
    var s = section('guide', 'cf-alt');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('Chanukah 2026', 'Celebrate all eight nights',
      'Light the menorah at home every night of Chanukah. Here\u2019s the calendar, and everything you need to know.', true));

    var nights = el('div', 'cf-nights cf-reveal');
    CFG.NIGHTS.forEach(function (n) {
      var c = el('div', 'cf-nt' + (n.star ? ' star' : ''));
      var cs = el('div', 'cf-nt-c');
      for (var i = 0; i < 8; i++) cs.appendChild(el('i', i >= 8 - n.n ? 'on' : null));
      add(c, cs, el('b', null, 'Night ' + n.n), el('span', null, n.day + ', ' + n.date), n.note ? el('em', null, n.note) : null);
      nights.appendChild(c);
    });
    w.appendChild(nights);
    w.appendChild(el('p', 'cf-nnote cf-center', CFG.NIGHTS_NOTE));

    var grid = el('div', 'cf-ggrid');
    CFG.GUIDE.articles.forEach(function (it, i) {
      var a = el('button', 'cf-gc cf-reveal in');
      a.type = 'button';
      a.style.transitionDelay = (i % 4 * 0.06) + 's';
      var im = document.createElement('img');
      im.className = 'cf-gc-img'; im.src = asset(it.img); im.alt = ''; im.loading = 'lazy';
      im.onerror = function () { this.parentNode.replaceChild(placeholderArt(), this); };
      a.appendChild(im);
      var b = el('div', 'cf-gc-b');
      add(b, el('h3', null, it.title), el('p', null, it.text));
      a.appendChild(b);
      a.addEventListener('click', function () { openReader(i); });
      grid.appendChild(a);
    });
    w.appendChild(grid);
    s.appendChild(w);
    return s;
  }
  function placeholderArt() {
    var p = el('div', 'cf-gc-ph');
    p.appendChild(icon('menorah'));
    return p;
  }

  /* ---------- guide pop-up ----------
     One article at a time, with "Next" so visitors can read through the whole guide
     without leaving the page. No outside links. */
  var lastFocus = null;
  function openReader(idx) {
    var list = CFG.GUIDE.articles;
    lastFocus = document.activeElement;
    var ov = el('div', 'cf-rd');
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    var box = el('div', 'cf-rd-box');
    var x = el('button', 'cf-rd-x');
    x.type = 'button';
    x.setAttribute('aria-label', 'Close');
    x.appendChild(icon('x'));
    var h = el('h1');
    var body = el('div', 'cf-rd-body');
    var foot = el('div', 'cf-rd-foot');
    var prev = el('button', 'cf-btn cf-ghost cf-rd-prev'); prev.type = 'button';
    var next = el('button', 'cf-btn cf-teal cf-rd-next'); next.type = 'button';
    var done = el('button', 'cf-btn cf-ghost', 'Back to the festival'); done.type = 'button';
    [prev, done].forEach(function (b) { b.style.color = NAVY; b.style.borderColor = 'rgba(15,41,54,.3)'; });
    add(foot, prev, next, done);
    add(box, x, h, body, foot);
    ov.appendChild(box);
    root.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    x.focus();

    function show(n) {
      idx = n;
      var it = list[n];
      ov.setAttribute('aria-label', it.title);
      h.textContent = it.title;
      body.innerHTML = it.html;
      prev.style.display = n > 0 ? '' : 'none';
      prev.textContent = n > 0 ? '← ' + list[n - 1].title : '';
      next.style.display = n < list.length - 1 ? '' : 'none';
      next.textContent = n < list.length - 1 ? 'Next: ' + list[n + 1].title + ' →' : '';
      ov.scrollTop = 0;
    }
    function close() {
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    prev.addEventListener('click', function () { show(idx - 1); });
    next.addEventListener('click', function () { show(idx + 1); });
    x.addEventListener('click', close);
    done.addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', onKey);
    show(idx);
  }

  /* ---------- share ---------- */
  function buildShare() {
    var s = el('section', 'cf-share');
    s.id = 'cf-share';
    var w = el('div', 'cf-wrap cf-center');
    w.appendChild(heading('Spread the light', 'Invite your friends', 'Share the festival with your family, friends and neighbors.', true));
    var row = el('div', 'cf-sharebtns');
    var fb = link('cf-btn cf-fb', 'https://www.facebook.com/sharer/sharer.php?' + qs({ u: CFG.SHARE.url }), 'Share on Facebook', true);
    fb.insertBefore(icon('fb'), fb.firstChild);
    fb.addEventListener('click', function (e) {
      if (window.innerWidth < 700) return;
      e.preventDefault();
      window.open(fb.href, 'cf26fb', 'width=620,height=560,noopener');
    });
    var ig = el('button', 'cf-btn cf-ig', 'Share on Instagram');
    ig.type = 'button';
    ig.insertBefore(icon('ig'), ig.firstChild);
    add(row, fb, ig);

    var pop = el('div', 'cf-pop');
    pop.setAttribute('role', 'status');
    var popP = el('p');
    var popBtns = el('div');
    var dl = link('cf-btn cf-gold', CFG.FLYER, 'Download the flyer', true);
    dl.setAttribute('download', 'Chanukah-Festival-2026-Flyer.png');
    dl.insertBefore(icon('dl'), dl.firstChild);
    var follow = link('cf-btn cf-ghost', CFG.SHARE.instagram, 'Open ' + CFG.SHARE.igHandle, true);
    follow.insertBefore(icon('ig'), follow.firstChild);
    add(popBtns, dl, follow);
    add(pop, popP, popBtns);

    ig.addEventListener('click', function () { shareInstagram(pop, popP); });

    var frow = el('div', 'cf-sharebtns cf-follow');
    var ffb = link('cf-btn cf-ghost', CFG.SHARE.facebookEvent || CFG.SHARE.facebook,
      CFG.SHARE.facebookEvent ? 'Join the Facebook event' : 'Follow on Facebook', true);
    ffb.insertBefore(icon('fb'), ffb.firstChild);
    var fig = link('cf-btn cf-ghost', CFG.SHARE.instagram, 'Follow on Instagram', true);
    fig.insertBefore(icon('ig'), fig.firstChild);
    add(frow, ffb, fig);
    add(w, row, frow, pop);
    s.appendChild(w);
    return s;
  }

  function shareInstagram(pop, popP) {
    var data = { title: 'Chanukah Festival 2026', text: T(CFG.SHARE.text), url: CFG.SHARE.url };
    function desktop() {
      copyText(T(CFG.SHARE.text) + ' ' + CFG.SHARE.url).then(function () {
        popP.textContent = 'Invitation copied! Instagram doesn\u2019t allow posting from a computer browser \u2014 download the flyer, post it from your phone, and paste the invitation as your caption.';
      }, function () {
        popP.textContent = 'Instagram doesn\u2019t allow posting from a computer browser \u2014 download the flyer and post it from your phone.';
      });
      pop.className = 'cf-pop open';
    }
    if (!navigator.share) return desktop();
    var flyerUrl = abs(CFG.FLYER);
    var sameOrigin = flyerUrl.indexOf(window.location.origin) === 0 || /^data:/.test(flyerUrl);
    var p = (sameOrigin && window.File && navigator.canShare) ?
      fetch(flyerUrl).then(function (r) { return r.blob(); }).then(function (b) {
        var f = new File([b], 'Chanukah-Festival-2026.png', { type: b.type || 'image/png' });
        return navigator.canShare({ files: [f] }) ? { files: [f], text: data.text + ' ' + data.url } : data;
      }).catch(function () { return data; }) : Promise.resolve(data);
    p.then(function (d) {
      return navigator.share(d);
    }).catch(function (e) {
      if (e && e.name === 'AbortError') return;
      desktop();
    });
  }

  /* ---------- footer ---------- */
  function buildFooter() {
    var f = el('footer', 'cf-foot');
    var w = el('div', 'cf-wrap');
    var l = el('div', 'cf-foot-l');
    var ph = link(null, 'tel:' + CFG.PHONE.replace(/\D/g, ''), CFG.PHONE);
    ph.insertBefore(icon('phone'), ph.firstChild);
    var em = link(null, 'mailto:' + CFG.EMAIL, CFG.EMAIL);
    em.insertBefore(icon('mail'), em.firstChild);
    var ig = link(null, CFG.SHARE.instagram, CFG.SHARE.igHandle, true);
    ig.insertBefore(icon('ig'), ig.firstChild);
    var fbl = link(null, CFG.SHARE.facebookEvent || CFG.SHARE.facebook, 'Chanukah Festival on Facebook', true);
    fbl.insertBefore(icon('fb'), fbl.firstChild);
    add(l, ph, em, ig, fbl);
    add(w, el('b', null, 'Questions? We\u2019d love to help.'), l,
      donateButton('Support the festival'),
      el('small', null, CFG.host + ' \u2022 Riverside, CA \u2022 ' + CFG.WEB));
    var back = link(null, 'https://www.jewishriverside.com', '\u2190 Back to ' + CFG.host);
    back.style.display = 'inline-block';
    back.style.marginTop = '10px';
    back.style.fontSize = '.82rem';
    w.appendChild(back);
    f.appendChild(w);
    return f;
  }

  /* ---------- scroll reveal ---------- */
  function reveal() {
    var els = root.querySelectorAll('.cf-reveal');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].className += ' in';
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.className += ' in'; io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  window.CF26 = { version: VERSION, config: CFG };

  /* Start last, after every helper above is defined. Hosted files can arrive after
     the page has finished loading, when readyState is already past 'loading'. */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
