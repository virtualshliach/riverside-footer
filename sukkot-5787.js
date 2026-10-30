/* Sukkot & Simchat Torah 5787 overlay - page 7457011. Loaded by footer.js.
   The holiday is over but this stays ON so the page keeps its custom design.
   Moved here from the inline footer in Oct 2026. */
/* Sukkot & Simchat Torah 5787 - Chabad Jewish Center of Riverside */
(function () {
'use strict';
var CFG = {
AID: '7457011',
RETURN_URL: '',
INFO_PLACEMENT: 'below',
hero: {
image: 'https://jewishriverside.com/media/images/1381/kGkw13811792.png',
alt:   'Shofar, pomegranate, apples and honey',
crop: 'bottom',
ratio: '24/9',
flip: true,
scrim: 0.95,
eyebrow: '',
title:   'Sukkot & Simchat Torah',
org:     'Welcome',
orgEmphasis: 'HOME',
lede:    'Home is more than a place \u2014 it\u2019s the feeling of being ' +
'welcomed, connected and surrounded by community. Whether you\u2019ve ' +
'celebrated with us for years or are joining for the first time, ' +
'you\u2019ll find meaningful services, delicious holiday meals and a ' +
'warm welcome at Chabad Jewish Center of Riverside.',
dateCards: [
{ label: 'Sukkot',        value: 'Sept 25 – Oct 2' },
{ label: 'Simchat Torah', value: 'Oct 3 – 4' }
]
},
tiles: [
{ key:'sukkot-schedule',  title:'Sukkot & Simchat Torah Schedule',
img:'https://jewishriverside.com/media/images/1387/eglm13872576.png',
date:'September 25 \u2013 October 4', cost:'',    costTone:'free' },
{ key:'sukkot',           title:'Sukkot Community BBQ',
img:'https://jewishriverside.com/media/images/1387/yuiP13872577.png',
date:'Wed, Sept 30',        cost:'',           costTone:'free' },
{ key:'simchat-torah',    title:'Simchat Torah',
img:'https://jewishriverside.com/media/images/1387/ZHVP13872578.png',
date:'Oct 3 & 4',           cost:'',           costTone:'free' },
{ key:'yizkor',           title:'Yizkor Booklet',
img:'https://jewishriverside.com/media/images/1382/YYee13820234.png',
date:'Yizkor: Sat, Oct 3',  cost:'',           costTone:'free' },
{ key:'resources',        title:'Sukkot Resources',
img:'https://jewishriverside.com/media/images/1382/FLQy13820239.png',
date:'Guides & readings',   cost:'',           costTone:'free' },
{ key:'holiday-charity',  title:'High Holiday Gift',
img:'https://jewishriverside.com/media/images/1381/rlpS13815595.png',
date:'Before the holidays', cost:'Any amount', costTone:'gift' },
{ key:'contact',          title:'Questions?',   contact:true,
phone:'951-222-2005',   email:'info@jewishriverside.com' }
],
OPTIONS: {
'holiday-charity': {
title: 'High Holiday Gift',
intro: 'It is customary to give charity before the High Holidays. ' +
'Your gift supports services, meals and programs for the whole ' +
'community \u2014 including those who could not otherwise take part.\n' +
'All Services are free of charge. Your generous donation is greatly ' +
'appreciated!\nPlease also consider donating to assist others in our ' +
'community to celebrate the holidays.',
driver: 'input_78',
donationOnly: true,
stepTitles: { gift: 'High Holiday Gift', pay: 'Your details & payment' }
},
'sukkot-schedule': {
title: 'Sukkot & Simchat Torah Schedule',
kind:  'schedule',
intro: 'Everything happening from Sukkot through Simchat Torah at ' +
'Chabad Jewish Center of Riverside. No membership fees, no ' +
'tickets \u2014 everyone is welcome.',
opensAs:  'sukkot',
ctaLabel: 'Sign up for the Sukkot BBQ'
},
'sukkot': {
title: 'Sukkot Community BBQ',
kind:  'dinner',
intro: 'Dinner in the sukkah \u2014 barbecue, music and the whole ' +
'community together under the stars, with world champion magician ' +
'Johnny Ace Palmer. Come as you are; there is always a place set ' +
'for you.',
blurb: [
'Our Grand Sukkot BBQ is the big one \u2014 the whole community in the ' +
'sukkah, food off the grill, live music, and something going on for ' +
'every age.',
'This year we are joined by world champion magician Johnny Ace Palmer, ' +
'whose close-up magic has taken top honors on the world stage and left ' +
'audiences from Las Vegas to Tokyo genuinely unable to explain what they ' +
'just watched. He performs right at the tables, inches away \u2014 the ' +
'kind of thing children talk about for weeks and adults quietly try to ' +
'figure out on the drive home.',
'Choose what you pay: name your own amount, the suggested price, or cover ' +
'the full cost so that someone else can join too.'
],
teaser: 'Our Grand Sukkot BBQ is the big one \u2014 the whole community in ' +
'the sukkah\u2026',
image:   'https://01.myjewishpage.com/media/images/1386/eVFO13862359.png',
driver:  'input_132',
summary: 'input_133',
dinnerSub:  'input_134',
sponsorSub: 'input_135',
countsOnStep1: true,
stepTitles: { schedule:'Sukkot Community BBQ', gift:'Sponsor the BBQ' },
event: { date:'Wednesday, September 30', items:[
{ time:'5:30 PM', label:'Community BBQ in the sukkah' },
{ time:'6:30 PM', label:'Johnny Ace Palmer \u2014 world champion magician' },
{ time:'8:30 PM', label:'Evening ends' }
]},
tiers: [
{ key:'pwyc', label:'Pay what you can',
note:'Name your own amount \u2014 whatever works for you',
adults:'input_124', children:'input_125', amount:'input_130',
adultPrice:0, childPrice:0 },
{ key:'sugg', label:'Suggested price',
note:'$30 per adult \u00b7 $20 per child \u2014 covers basic costs',
adults:'input_127', children:'input_126', adultPrice:30, childPrice:20 },
{ key:'full', label:'Cover all expenses',
note:'$50 per adult \u00b7 $35 per child \u2014 covers all expenses ' +
'including administration, activities and servers',
adults:'input_128', children:'input_129', adultPrice:50, childPrice:35 }
],
students:'', veg:'',
sponsorAmounts:[180,360,540],
sponsorRadios:['input_131_0','input_131_1','input_131_2'],
sponsorOther:'other_131', sponsorOtherAmt:'input_131',
sponsorStudents:'', sponsorStudentPrice:0,
sponsorTable:'',    sponsorTablePrice:0
},
'simchat-torah': {
title: 'Simchat Torah',
intro: 'Dancing with the Torahs, dinner, and a celebration ' +
'for every age. Free to attend. Tick whichever parts you\u2019re ' +
'joining.',
teaser: 'Simchat Torah is the happiest day of the Jewish year\u2026',
blurb: [
'Simchat Torah is the happiest day of the Jewish year. We complete the ' +
'final words of the Torah, begin it again from Bereishit, and dance ' +
'with the scrolls until we can dance no more.',
'Come for the dinner, come for the morning, come for both. There is no ' +
'charge and no ticket \u2014 just a place set for you.'
],
image:   'https://jewishriverside.com/media/images/1388/reSI13882269.png',
driver:  'input_156',
summary: 'input_157',
giftRow: 'input_77',
stepTitles: { schedule:'Simchat Torah' },
schedule: [
{ day:'Simchat Torah Eve', date:'Saturday, October 3', items:[
{ time:'6:00 PM', label:'Dinner & Dancing with the Torahs',
note:'Falafel, shawarma & hummus buffet and mocktails. All ages welcome.',
adults:'input_154', children:'input_155' }
]},
{ day:'Simchat Torah', date:'Sunday, October 4', items:[
{ time:'10:00 AM', label:'Morning Service & Hakafot', info:true },
{ time:'11:00 AM', label:'Conclusion of the entire Torah', info:true },
{ time:'12:30 PM', label:'Grand Kiddush Luncheon',
note:'Tick this to join us for the luncheon',
summaryOnly:true },
{ time:'7:06 PM',  label:'Holiday ends', info:true }
]}
]
},
'yizkor': {
title: 'Yizkor Booklet',
kind:  'yizkor',
intro: 'Yizkor is recited again on Shemini Atzeret, Saturday, October 3. ' +
'It is a Jewish tradition to honor the memory of our loved ones in ' +
'our thoughts and prayers, as well as through acts of charity. The ' +
'virtue of pledging charity during Yizkor creates an opportunity for ' +
'the souls of our loved ones to be connected with us through tangible ' +
'acts of goodness and kindness.',
blurb: [
'One way to honor this tradition is through the publication of a Yizkor ' +
'Memorial Book, which we use when we gather for our High Holiday services.',
'Chabad Jewish Center of Riverside will be publishing a new Yizkor Book of ' +
'Life. This booklet will give us the opportunity to memorialize those whom ' +
'we lovingly remember at this time, as well as include prayers and ' +
'meditations of the Yizkor Service. It will be distributed and used for ' +
'this year\u2019s Yom Kippur Yizkor services and subsequent Yizkor services ' +
'throughout the year.',
'The booklet has already gone to print, but names are still welcome \u2014 ' +
'they will be read at the Shemini Atzeret Yizkor service and added to the ' +
'next printing. Contributions in their memory are welcome at any time.'
],
teaser: 'One way to honor this tradition is through the publication of a ' +
'Yizkor Memorial Book\u2026',
deadline: 'Yizkor is recited again on Shemini Atzeret \u2014 Saturday, October 3',
driver:  'input_122',
summary: 'input_123',
donation:'input_121',
maxNames: 8,
nameFields: [
{ en:'first_105', enLast:'last_105', heb:'input_109',
father:'first_113', mother:'last_113', date:'input_117' },
{ en:'first_106', enLast:'last_106', heb:'input_110',
father:'first_114', mother:'last_114', date:'input_118' },
{ en:'first_107', enLast:'last_107', heb:'input_111',
father:'first_115', mother:'last_115', date:'input_119' },
{ en:'first_108', enLast:'last_108', heb:'input_112',
father:'first_116', mother:'last_116', date:'input_120' },
{ en:'first_136', enLast:'last_136', heb:'input_140',
father:'first_144', mother:'last_144', date:'input_148' },
{ en:'first_137', enLast:'last_137', heb:'input_141',
father:'first_145', mother:'last_145', date:'input_149' },
{ en:'first_138', enLast:'last_138', heb:'input_142',
father:'first_146', mother:'last_146', date:'input_150' },
{ en:'first_139', enLast:'last_139', heb:'input_143',
father:'first_147', mother:'last_147', date:'input_151' }
]
},
'resources': {
title: 'Sukkot Resources',
kind:  'info',
intro: 'Everything you might want for Sukkot \u2014 what the days mean, ' +
'how to build a sukkah, how to hold the lulav and etrog, what to ' +
'expect if it\u2019s your first time, recipes, videos and readings.',
body: [
'Our website keeps a full Sukkot library: guides to the holiday and its ' +
'customs, the four kinds and how to use them, building and decorating a ' +
'sukkah, holiday recipes, children\u2019s stories, and the prayers with ' +
'translation and transliteration.',
'It opens in a new tab, so you won\u2019t lose your place here.'
],
cta: { label:'Open the Sukkot library',
url:['https://www.jewishriverside.com','library','article_cdo','aid',
'4126','jewish','Sukkot-2026.htm'].join('/') +
'#utm_source=domain&utm_medium=domain' +
'&utm_campaign=jewishriverside.org' }
},
},
F: {
adults:'input_59', children:'input_60',
firstMain:'first_62', lastMain:'last_62',
adultFirst:['first_63','first_64','first_65','first_66'],
adultLast: ['last_63','last_64','last_65','last_66'],
childFirst:['first_67','first_68','first_69','first_70','first_71'],
childLast: ['last_67','last_68','last_69','last_70','last_71'],
email:'input_72', phone:'input_73_full',
amountPaid:'input_158',
sponsorRadios:['input_53_0','input_53_1','input_53_2','input_53_3','input_53_4'],
sponsorOther:'other_53', sponsorAmt:'input_53',
dedInHonor:'input_39_0', dedInMemory:'input_39_1', dedNames:'input_48',
notes:'input_57',
payCard:'input_61_creditCard', payPal:'input_61_paypal',
ccNum:'input_61_cc_number', ccCvv:'input_61_cc_ccv', ccName:'input_61_cc_nameOnCard',
ccMon:'input_61_cc_exp_month', ccYear:'input_61_cc_exp_year',
billAddr:'input_61_addr_line1', billCity:'input_61_city',
billState:'input_61_state', billPostal:'input_61_postal', billCountry:'input_61_country'
},
TIMES: {
rhEve:     '6:43 PM',
rhDay1Eve: '7:37 PM',
rhEnds:    '7:36 PM',
ykEve:     '6:31 PM',
ykEnds:    '7:24 PM'
},
SUKKOT_SCHEDULE: [
{ day:'Sukkot Eve', date:'Friday, September 25', items:[
{ time:'6:24 PM', label:'Light Shabbat & holiday candles', cand:true }
]},
{ day:'Sukkot \u00b7 Day 1', date:'Saturday, September 26', items:[
{ time:'10:30 AM', label:'Morning Services' },
{ time:'11:30 AM', label:'Torah Reading & Discussion' },
{ time:'12:30 PM', label:'Kiddush Buffet Lunch in the Sukkah' },
{ time:'7:17 PM',  label:'Light holiday candles after this time, from a pre-existing flame', cand:true }
]},
{ day:'Sukkot \u00b7 Day 2', date:'Sunday, September 27', items:[
{ time:'10:30 AM', label:'Morning Services with Lulav & Etrog' },
{ time:'11:30 AM', label:'Torah Reading & Discussion' },
{ time:'12:30 PM', label:'Kiddush Buffet Lunch in the Sukkah' },
{ time:'7:16 PM',  label:'Sukkot ends', cand:true }
]},
{ day:'Community BBQ', date:'Wednesday, September 30', items:[
{ time:'5:30 PM', label:'BBQ, live music and entertainment for the whole family' },
{ time:'6:30 PM', label:'World champion magician Johnny Ace Palmer' },
{ time:'8:30 PM', label:'Evening ends' }
]},
{ day:'Shemini Atzeret Eve', date:'Friday, October 2', items:[
{ time:'6:14 PM', label:'Light Shabbat & holiday candles', cand:true }
]},
{ day:'Shemini Atzeret', date:'Saturday, October 3', items:[
{ time:'10:00 AM', label:'Morning Services' },
{ time:'11:00 AM', label:'Torah Reading & Discussion' },
{ time:'12:00 PM', label:'Yizkor Memorial Services' },
{ time:'6:00 PM',  label:'Buffet Dinner & Dancing with the Torahs' },
{ time:'7:08 PM',  label:'Light holiday candles after this time, from a pre-existing flame', cand:true }
]},
{ day:'Simchat Torah', date:'Sunday, October 4', items:[
{ time:'10:00 AM', label:'Morning Services' },
{ time:'11:00 AM', label:'Conclusion of the entire Torah' },
{ time:'12:30 PM', label:'Kiddush Luncheon' },
{ time:'7:06 PM',  label:'Holiday ends', cand:true }
]}
],
GIFTS: [1800, 1000, 720, 540, 360],
GIFT_NAMES: ['Celebration Sponsor', 'Torah Sponsor', 'Dinner Sponsor',
'Family Sponsor', 'Friend of the Community'],
DEFAULT_COUNTRY: 'United States',
footerNote: 'Questions? Call 951-222-2005 or email info@jewishriverside.com',
SHOW_ESCAPE_HATCH: false
};
var HREF = window.location.href;
var AID  = CFG.AID;
var onEvent =
HREF.indexOf('/aid/' + AID) > -1 ||
HREF.indexOf('aid=' + AID)  > -1 ||
HREF.indexOf('/' + AID + '/') > -1 ||
HREF.indexOf('/' + AID + '.') > -1;
var inPreview = !!document.getElementById('hh26-preview-flag');
var hasStash = false;
try {
var raw = sessionStorage.getItem('hh26_confirm');
if (raw) {
var st = JSON.parse(raw);
hasStash = !!st && (Date.now() - st.t) < 900000;
if (!hasStash) sessionStorage.removeItem('hh26_confirm');
}
} catch (e) { hasStash = false; }
if (!onEvent && !inPreview) return;
hidePageNow();
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', boot);
} else {
/* hosted file may arrive after the page loaded: wait until this whole file has run */
setTimeout(boot, 0);
}
function hidePageNow() {
if (document.getElementById('hh26-cover')) return;
var d = document.createElement('div');
d.id = 'hh26-cover';
d.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;' +
'background:#F5EBDF;z-index:2147481000');
(document.body || document.documentElement).appendChild(d);
setTimeout(function () {
if (!document.getElementById('hh26')) showPageAgain();
}, 6000);
}
function showPageAgain() {
['hh26-preboot', 'hh26-cover'].forEach(function (id) {
var e = document.getElementById(id);
if (e && e.parentNode) e.parentNode.removeChild(e);
});
}
function auditFields() {
var want = [], missing = [];
function add(v) {
if (typeof v === 'string' && /^(input|first|last|other)_/.test(v)) want.push(v);
else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { add(v[k]); });
}
add(CFG.F); add(CFG.OPTIONS);
want.filter(function (v, i) { return want.indexOf(v) === i; })
.forEach(function (id) { if (!document.getElementById(id)) missing.push(id); });
window.HH26_MISSING = missing;
if (missing.length && window.console && console.warn) {
console.warn('[HH26] these fields are NOT on this form: ' + missing.join(', '));
}
return missing;
}
window.HH26_check = auditFields;
function boot() {
if (document.getElementById('hh26')) return;
if (!onEvent && !inPreview) return;
var s = readStash();
if (s && !document.getElementById('input_2')) {
loadFonts(); injectStyles(); buildConfirmation(s);
return;
}
loadFonts();
injectStyles();
buildOverlay();
openFromLink();
auditFields();
}
var LINK_ALIASES = {
'sukkot':'sukkot', 'bbq':'sukkot',
'simchattorah':'simchat-torah', 'simchat-torah':'simchat-torah',
'st':'simchat-torah', 'torah':'simchat-torah', 'hakafot':'simchat-torah',
'yizkor':'yizkor', 'booklet':'yizkor',
'gift':'holiday-charity', 'donate':'holiday-charity', 'charity':'holiday-charity',
'schedule':'sukkot-schedule', 'sukkot-schedule':'sukkot-schedule',
'resources':'resources'
};
function openFromLink() {
var q = /[?&]open=([^&#]+)/.exec(window.location.search) ||
/\/open\/([^\/?#]+)/.exec(window.location.pathname);
var raw = q ? q[1] : (window.location.hash || '').replace('#', '');
if (!raw) return;
var rawL = decodeURIComponent(raw).toLowerCase().trim();
if (rawL === 'simchat-torah-sponsor' || rawL === 'sponsor') { window.__hhSponsorFirst = true; raw = 'simchat-torah'; }
var key = LINK_ALIASES[decodeURIComponent(raw).toLowerCase().trim()];
if (key && CFG.OPTIONS[key]) {
setTimeout(function () { window.HH26_openOption(key); }, 60);
}
}
function loadFonts() {
var l = document.createElement('link');
l.rel = 'stylesheet';
l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&' +
'family=Karla:wght@400;500;600;700&display=swap';
document.head.appendChild(l);
}
function injectStyles() {
var css = [
'#hh26{',
'  --paper:#F5EBDF; --paper-2:#EDE0CE; --card:#FFFCF7;',
'  --wine:#5E1523; --wine-hi:#7C2434;',
'  --gold:#8A6A28; --gold-line:rgba(168,133,63,.38);',
'  --ink:#332821; --muted:#5F5046;',
'  --disp:"Playfair Display","Hoefler Text",Georgia,serif;',
'  --body:"Karla","Helvetica Neue",Arial,sans-serif;',
'  position:fixed; inset:0; z-index:2147482000;',
'  overflow-y:auto; -webkit-overflow-scrolling:touch;',
'  background:var(--paper); color:var(--ink);',
'  font-family:var(--body); font-size:16px; line-height:1.5;',
'  text-align:left; letter-spacing:0;',
'}',
'#hh26 *{box-sizing:border-box; margin:0; padding:0;}',
'#hh26 button{font:inherit; color:inherit; background:none; border:0;}',
'#hh26 img{max-width:100%; display:block;}',
'#hh26 :focus-visible{outline:2px solid var(--wine); outline-offset:3px;}',
'#hh26 .hh-sr{position:absolute; width:1px; height:1px; overflow:hidden;',
'  clip:rect(0 0 0 0); clip-path:inset(50%); white-space:nowrap;}',
'#hh26 .hh-hero{position:relative; display:flex; align-items:center;',
'  aspect-ratio:var(--hh-ratio,32/9); min-height:min(62svh,420px);',
'  overflow:hidden; background:var(--paper);',
'  border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-hero-img{position:absolute; inset:0; width:100%; height:100%;',
'  object-fit:cover; max-width:none;}',
'#hh26 .hh-hero.flip .hh-hero-img{transform:scaleX(-1);}',
'#hh26 .hh-hero::after{content:""; position:absolute; inset:0; pointer-events:none;',
'  background:linear-gradient(to right,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 1.00)) 0%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.98)) 40%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.80)) 60%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.38)) 76%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.10)) 90%,',
'    rgba(245,235,223,0) 100%);}',
'@media (max-width:760px){',
'  #hh26 .hh-hero::after{background:linear-gradient(to right,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.98)) 0%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.90)) 55%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.70)) 100%);}',
'}',
'#hh26 .hh-hero-copy{position:relative; z-index:1; width:100%; max-width:1120px;',
'  margin:0 auto; padding:clamp(26px,4.6vw,44px) clamp(14px,4.5vw,56px);}',
'#hh26 .hh-hero-copy > *{max-width:640px;}',
'#hh26 .hh-hero-ph{width:100%; aspect-ratio:32/9; min-height:300px;',
'  display:flex; align-items:center; justify-content:center;',
'  color:var(--muted); font-size:.74rem; letter-spacing:.22em;',
'  text-transform:uppercase; border:1px dashed var(--gold-line);}',
'#hh26 .hh-eyebrow{font-size:clamp(.62rem,1.5vw,.72rem); font-weight:600;',
'  letter-spacing:.3em; text-transform:uppercase; color:var(--gold);',
'  margin-bottom:clamp(9px,1.8vw,14px);}',
'#hh26 h1{font-family:var(--disp); font-weight:500; color:var(--wine);',
'  font-size:clamp(2.6rem,6.6vw,5rem); line-height:1.03; letter-spacing:-.005em;}',
'#hh26 h1.hh-long{font-size:clamp(2rem,4.3vw,3.2rem);}',
'#hh26 .hh-optimg{display:block; width:100%; height:auto; margin:0 0 15px;',
'  border:1px solid var(--gold-line); border-radius:3px;}',
'#hh26 .hh-org{font-family:var(--disp); font-weight:400; color:var(--gold);',
'  font-size:clamp(1.05rem,2.9vw,1.65rem); margin-top:11px; font-style:italic;}',
'#hh26 .hh-org strong{font-style:normal; font-weight:700; color:var(--wine);',
'  letter-spacing:.06em; font-size:1.12em;}',
'#hh26 .hh-lede{max-width:50ch; margin-top:clamp(12px,2.1vw,19px);',
'  color:var(--ink); font-size:clamp(.95rem,2.1vw,1.18rem); line-height:1.6;}',
'#hh26 .hh-dates{display:grid; grid-template-columns:repeat(2,1fr);',
'  gap:clamp(8px,1.8vw,14px); max-width:520px; margin-top:clamp(16px,2.8vw,26px);}',
'#hh26 .hh-datecard{border:1px solid var(--gold-line); border-radius:2px;',
'  background:rgba(255,252,247,.82);',
'  padding:clamp(9px,1.9vw,15px) clamp(11px,2.2vw,19px);}',
'#hh26 .hh-datecard b{display:block; font-weight:600; color:var(--gold);',
'  font-size:clamp(.55rem,1.5vw,.71rem); letter-spacing:.18em;',
'  text-transform:uppercase; margin-bottom:5px;}',
'#hh26 .hh-datecard span{display:block; font-family:var(--disp); color:var(--wine);',
'  font-size:clamp(1rem,2.9vw,1.45rem); line-height:1.12;}',
'@media (max-width:760px){',
'  #hh26 .hh-hero{aspect-ratio:auto; min-height:0; align-items:flex-start;}',
'  #hh26 .hh-hero-copy{max-width:none; width:100%;',
'    padding:clamp(22px,6vw,30px) clamp(18px,5vw,24px) clamp(24px,7vw,34px);}',
'  #hh26 h1{font-size:clamp(2.6rem,11vw,3.4rem); line-height:1.0;}',
'  #hh26 h1.hh-long{font-size:clamp(2.1rem,8.6vw,2.8rem);}',
'  #hh26 .hh-org{font-size:clamp(1.1rem,4.6vw,1.35rem); margin-top:8px;}',
'  #hh26 .hh-lede{max-width:none; font-size:clamp(1rem,4.2vw,1.12rem);',
'    line-height:1.55; margin-top:14px;}',
'  #hh26 .hh-dates{max-width:none; margin-top:18px; gap:10px;}',
'  #hh26 .hh-datecard{padding:11px 13px;}',
'  #hh26 .hh-datecard b{font-size:.63rem; letter-spacing:.15em;}',
'  #hh26 .hh-datecard span{font-size:clamp(1.05rem,4.4vw,1.25rem);}',
'}',
'#hh26 .hh-body{max-width:1120px; margin:0 auto;',
'  padding:clamp(34px,6.5vw,64px) clamp(14px,4.5vw,56px) clamp(46px,8vw,88px);}',
'#hh26 .hh-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:clamp(10px,2.4vw,16px);}',
'@media (min-width:760px){#hh26 .hh-grid{grid-template-columns:repeat(3,1fr); gap:20px;}}',
'#hh26 .hh-tile{display:flex; flex-direction:column; width:100%; text-align:left;',
'  background:var(--card); border:1px solid var(--gold-line);',
'  border-radius:3px; overflow:hidden; cursor:pointer;',
'  box-shadow:0 1px 2px rgba(94,21,35,.05);',
'  transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;',
'  opacity:0; animation:hh26in .55s ease forwards;}',
'#hh26 .hh-tile:hover{transform:translateY(-4px); border-color:var(--gold);',
'  box-shadow:0 14px 32px rgba(94,21,35,.13);}',
'#hh26 .hh-tile:active{transform:translateY(-1px);}',
'#hh26 .hh-sq{position:relative; aspect-ratio:1/1; width:100%; background:var(--paper-2);}',
'#hh26 .hh-noart{position:absolute; inset:0; display:flex; align-items:center;',
'  justify-content:center; padding:14px; text-align:center;',
'  font-family:var(--disp); color:var(--wine); font-size:1.1rem; line-height:1.25;}',
'#hh26 .hh-sq img{width:100%; height:100%; object-fit:cover;}',
'#hh26 .hh-noart{width:100%; height:100%; display:flex; align-items:center;',
'  justify-content:center; padding:14%; text-align:center;',
'  background:var(--paper); color:var(--wine);',
'  font-family:var(--disp); font-size:clamp(1rem,3.4vw,1.5rem); line-height:1.2;}',
'#hh26 .hh-cap{display:flex; align-items:center;',
'  padding:clamp(11px,2.4vw,15px) clamp(11px,2.3vw,16px);',
'  border-top:1px solid var(--gold-line); background:var(--card);}',
'#hh26 .hh-tile.ov .hh-cap{position:absolute; left:0; right:0; bottom:0;',
'  border-top:0; background:none;',
'  padding:20px clamp(11px,2.4vw,16px) clamp(10px,2.2vw,14px);}',
'@keyframes hh26in-past{from{opacity:0; transform:translateY(14px);}',
'  to{opacity:.4; transform:none;}}',
'#hh26 .hh-past{animation-name:hh26in-past; opacity:.4 !important;',
'  filter:grayscale(.45); cursor:default;}',
'#hh26 .hh-past:hover{opacity:.55 !important; transform:none;',
'  border-color:var(--gold-line);',
'  box-shadow:0 1px 2px rgba(94,21,35,.05);}',
'#hh26 .hh-past .hh-date{color:var(--muted);}',
'#hh26 .hh-date{font-size:clamp(.72rem,1.9vw,.88rem); font-weight:700;',
'  letter-spacing:.11em; text-transform:uppercase; color:var(--gold);',
'  line-height:1.3;}',
'@keyframes hh26in{from{opacity:0; transform:translateY(14px);} to{opacity:1; transform:none;}}',
'#hh26 .hh-foot{border-top:1px solid var(--gold-line); background:var(--paper-2);',
'  padding:clamp(26px,5vw,40px) 20px; text-align:center;',
'  color:var(--muted); font-size:.88rem;}',
'#hh26 .hh-hatch{display:inline-block; margin-top:14px; font-size:.68rem;',
'  letter-spacing:.14em; text-transform:uppercase; color:var(--muted);',
'  text-decoration:underline; text-underline-offset:4px; cursor:pointer;}',
'#hh26 .hh-toast{position:fixed; left:50%; bottom:24px; transform:translateX(-50%);',
'  background:var(--wine); color:#FFFCF7; padding:12px 20px; border-radius:3px;',
'  font-size:.84rem; font-weight:600; box-shadow:0 10px 30px rgba(94,21,35,.3);',
'  z-index:5; max-width:90vw;}',
'@media (prefers-reduced-motion: reduce){',
'  #hh26 .hh-tile{animation:none; opacity:1;}',
'  #hh26 .hh-tile:hover{transform:none;}',
'  #hh26 .hh-tile{transition:border-color .2s ease;}',
'  #hh26 .hh-pane{animation:none !important;}',
'}',
'#hh26 .hh-bg{position:fixed; inset:0; z-index:20; display:flex;',
'  align-items:center; justify-content:center; padding:clamp(5px,2.5vw,28px);',
'  background:rgba(26,21,51,.58);}',
'#hh26 .hh-modal{display:flex; flex-direction:column; width:100%;',
'  max-width:600px; max-height:min(92dvh,820px); background:var(--card);',
'  border:1px solid var(--gold); border-radius:4px;',
'  box-shadow:0 30px 70px rgba(26,21,51,.4); overflow:hidden;}',
'#hh26 .hh-mhead{flex:none; display:flex; align-items:center; gap:13px;',
'  padding:clamp(13px,3vw,18px) clamp(16px,3.4vw,24px) clamp(12px,2.4vw,15px);',
'  border-bottom:1px solid var(--gold-line); background:var(--paper);}',
'#hh26 .hh-mthumb{flex:none; width:54px; height:54px; border-radius:3px;',
'  object-fit:cover; border:1px solid var(--gold-line);}',
'#hh26 .hh-mheadtext{min-width:0; flex:1;}',
'#hh26 .hh-htotal{flex:none; text-align:right; padding:22px 0 0 10px;}',
'#hh26 .hh-htotal span{display:block; font-size:.68rem; font-weight:700;',
'  letter-spacing:.14em; text-transform:uppercase; color:var(--gold);}',
'#hh26 .hh-htotal b{display:block; font-family:var(--disp); font-weight:400;',
'  color:var(--wine); font-size:clamp(1.15rem,3.4vw,1.5rem); line-height:1.15;}',
'@media (max-width:520px){#hh26 .hh-htotal{padding-top:20px;}',
'  #hh26 .hh-htotal b{font-size:1.25rem;}}',
'#hh26 .hh-mtitle{font-family:var(--disp); color:var(--wine);',
'  font-size:clamp(1.45rem,4.2vw,2.2rem); line-height:1.15; padding-right:34px;}',
'#hh26 .hh-mtitle.hh-long{font-size:clamp(1.2rem,3.5vw,1.8rem);}',
'#hh26 .hh-mstep{font-size:.82rem; font-weight:700; letter-spacing:.14em;',
'  text-transform:uppercase; color:var(--gold); margin-top:6px;}',
'#hh26 .hh-x{position:absolute; top:6px; right:6px; width:38px; height:38px;',
'  font-size:22px; line-height:1; color:var(--muted); cursor:pointer;}',
'#hh26 .hh-mwrap{position:relative;}',
'#hh26 .hh-mbody{flex:1 1 auto; overflow-y:auto; -webkit-overflow-scrolling:touch;',
'  padding:clamp(14px,3.2vw,22px) clamp(11px,3.4vw,24px);}',
'#hh26 .hh-pane{animation:hh26slide .28s ease;}',
'@keyframes hh26slide{from{opacity:0; transform:translateX(22px);} to{opacity:1; transform:none;}}',
'#hh26 .hh-intro{color:var(--ink); font-size:1.16rem; line-height:1.55;',
'  margin-bottom:18px; white-space:pre-line;}',
'#hh26 .hh-day{margin:15px 0 5px; padding-bottom:6px;',
'  border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-day:first-child{margin-top:0;}',
'#hh26 .hh-dayname{font-family:var(--disp); color:var(--wine); font-size:1.45rem;}',
'#hh26 .hh-daydate{font-size:.88rem; font-weight:700; letter-spacing:.12em;',
'  text-transform:uppercase; color:var(--gold); margin-top:3px;}',
'#hh26 .hh-row{display:flex; align-items:flex-start; gap:11px; width:100%;',
'  padding:9px 8px; border-radius:3px; cursor:pointer; text-align:left;',
'  transition:background .15s ease;}',
'#hh26 .hh-row:hover{background:var(--paper);}',
'#hh26 .hh-row.info{cursor:default; opacity:.62;}',
'#hh26 .hh-row.info:hover{background:none;}',
'#hh26 .hh-box{flex:none; width:23px; height:23px; margin-top:1px; border-radius:3px;',
'  border:1.5px solid var(--gold); background:#fff; position:relative;}',
'#hh26 .hh-row.on .hh-box{background:var(--wine); border-color:var(--wine);}',
'#hh26 .hh-row.on .hh-box:after{content:""; position:absolute; left:7px; top:3px;',
'  width:5px; height:10px; border:solid #fff; border-width:0 2px 2px 0;',
'  transform:rotate(42deg);}',
'#hh26 .hh-row.info .hh-box{border:0; background:none;}',
'#hh26 .hh-time{flex:none; width:100px; font-size:.98rem; font-weight:700;',
'  color:var(--gold); padding-top:2px;}',
'#hh26 .hh-lab{flex:1; font-size:1.18rem; line-height:1.35;}',
'#hh26 .hh-note{display:block; font-size:.96rem; color:var(--muted); margin-top:3px;}',
'#hh26 .hh-nofield{display:block; font-size:.68rem; color:#B0472F; margin-top:2px;}',
'#hh26 .hh-fld{margin-bottom:12px;}',
'#hh26 .hh-fld > label{display:block; font-size:.88rem; font-weight:700;',
'  letter-spacing:.1em; text-transform:uppercase; color:var(--gold); margin-bottom:6px;}',
'#hh26 .hh-in{width:100%; padding:12px 13px; font:inherit; font-size:1.12rem;',
'  color:var(--ink); background:#fff; border:1px solid var(--gold-line);',
'  border-radius:3px;}',
'#hh26 .hh-in:focus{outline:none; border-color:var(--wine);}',
'#hh26 .hh-in::placeholder{font-size:.72rem; font-weight:500;',
'  letter-spacing:0; color:rgba(138,119,106,.6); opacity:1;}',
'#hh26 .hh-in::-webkit-input-placeholder{font-size:.72rem; font-weight:500;',
'  letter-spacing:0; color:rgba(138,119,106,.6);}',
'#hh26 textarea.hh-in{min-height:76px; resize:vertical;}',
'#hh26 .hh-two{display:grid; grid-template-columns:1fr 1fr; gap:9px;}',
'#hh26 .hh-align > .hh-fld > label{min-height:2.7em;}',
'#hh26 .hh-sub{font-family:var(--disp); color:var(--wine); font-size:1.4rem;',
'  margin:18px 0 9px; padding-bottom:5px; border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-sub:first-child{margin-top:0;}',
'#hh26 .hh-hint{font-size:1rem; color:var(--muted); margin:-4px 0 12px;}',
'#hh26 .hh-chips{display:grid; grid-template-columns:repeat(3,1fr); gap:8px;}',
'#hh26 .hh-chip{padding:14px 6px; text-align:center; font-size:1.16rem;',
'  border:1px solid var(--gold-line); border-radius:3px; background:#fff;',
'  cursor:pointer; transition:all .15s ease;}',
'#hh26 .hh-chip:hover{border-color:var(--gold);}',
'#hh26 .hh-chip.on{background:var(--wine); border-color:var(--wine); color:#fff;}',
'#hh26 .hh-total{margin-top:16px; padding:15px 17px; font-size:1.02rem; background:var(--paper);',
'  border:1px solid var(--gold-line); border-radius:3px; font-size:1.08rem;',
'  display:flex; justify-content:space-between; align-items:baseline;}',
'#hh26 .hh-total b{font-family:var(--disp); font-weight:400; color:var(--wine);',
'  font-size:1.6rem;}',
'#hh26 .hh-carry{display:flex; align-items:center; justify-content:space-between;',
'  gap:11px; padding:12px 14px; border:1px solid var(--gold-line);',
'  border-radius:3px; background:var(--paper); font-size:1.02rem;}',
'#hh26 .hh-change{flex:none; font-size:.88rem; color:var(--wine); cursor:pointer;',
'  text-decoration:underline; text-underline-offset:3px;}',
'#hh26 .hh-deadline{display:inline-block; margin:0 0 16px; padding:8px 13px;',
'  border:1px solid var(--gold); border-radius:2px; background:#fff;',
'  font-weight:700; font-size:.95rem; color:var(--wine);}',
'#hh26 .hh-blurb{margin-bottom:15px; padding-bottom:14px;',
'  border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-bpara{display:block; font-size:1.1rem; line-height:1.6;',
'  color:var(--ink); margin-bottom:10px;}',
'#hh26 .hh-bpara:last-of-type{margin-bottom:8px;}',
'#hh26 .hh-bsign{margin-top:14px; font-family:var(--disp); color:var(--wine);',
'  font-size:1.02rem; line-height:1.5;}',
'#hh26 .hh-more{display:inline-block; font-size:.92rem; font-weight:600;',
'  color:var(--wine); cursor:pointer; text-decoration:underline;',
'  text-underline-offset:3px; white-space:nowrap;}',
'#hh26 .hh-adds{display:flex; flex-direction:column; gap:9px;}',
'#hh26 .hh-add{display:flex; align-items:center; justify-content:space-between;',
'  gap:11px; padding:15px 16px; border:1px solid var(--gold-line);',
'  border-radius:3px; background:#fff; cursor:pointer;',
'  transition:border-color .15s ease, background .15s ease;}',
'#hh26 .hh-add:hover{border-color:var(--gold); background:var(--paper);}',
'#hh26 .hh-add b{display:block; font-weight:600; font-size:1.18rem;}',
'#hh26 .hh-addplus{flex:none; width:30px; height:30px; border-radius:50%;',
'  background:var(--wine); color:#FFFCF7; font-size:20px; line-height:29px;',
'  text-align:center;}',
'#hh26 .hh-rsec{margin-bottom:16px; padding-bottom:14px;',
'  border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-rhead{font-family:var(--disp); color:var(--wine);',
'  font-size:1.28rem; margin-bottom:8px;}',
'#hh26 .hh-rrow{display:flex; gap:12px; padding:4px 0; align-items:flex-start;}',
'#hh26 .hh-rk{flex:none; width:36%; font-size:.86rem; font-weight:700;',
'  letter-spacing:.06em; text-transform:uppercase; color:var(--gold);',
'  padding-top:2px;}',
'#hh26 .hh-rv{flex:1; font-size:1.06rem; line-height:1.45;}',
'@media (max-width:520px){#hh26 .hh-rk{width:100%;}',
'  #hh26 .hh-rrow{flex-wrap:wrap; gap:2px; padding:6px 0;}}',
'#hh26 .hh-captcha{margin-top:10px; min-height:78px;}',
'#hh26 .hh-captcha *{visibility:visible !important;}',
'#hh26 .hh-contact{cursor:default; background:var(--paper);}',
'#hh26 .hh-contact:hover{transform:none; border-color:var(--gold);',
'  box-shadow:0 1px 2px rgba(94,21,35,.05);}',
'#hh26 .hh-csq{aspect-ratio:1/1; width:100%; display:flex;',
'  flex-direction:column; align-items:center; justify-content:center;',
'  text-align:center; padding:clamp(12px,3vw,22px);}',
'@media (min-width:760px){',
'  #hh26 .hh-contact{grid-column:1 / -1;}',
'  #hh26 .hh-contact .hh-csq{aspect-ratio:auto; flex-direction:row;',
'    flex-wrap:wrap; justify-content:center; gap:8px 30px;',
'    padding:26px clamp(20px,3vw,34px);}',
'  #hh26 .hh-contact .hh-cq{margin-bottom:0; font-size:1.6rem;}',
'  #hh26 .hh-contact .hh-cpair{display:flex; align-items:baseline; gap:10px;}',
'  #hh26 .hh-contact .hh-cline{font-size:.72rem;}',
'  #hh26 .hh-contact .hh-clink{margin:0; font-size:1.3rem;}',
'  #hh26 .hh-contact .hh-cmail{font-size:1.1rem;}',
'}',
'#hh26 .hh-cq{font-family:var(--disp); color:var(--wine);',
'  font-size:clamp(1.15rem,3.6vw,1.7rem); margin-bottom:clamp(8px,2vw,14px);}',
'#hh26 .hh-cline{display:block; font-size:clamp(.62rem,1.7vw,.76rem);',
'  font-weight:700; letter-spacing:.14em; text-transform:uppercase;',
'  color:var(--gold);}',
'#hh26 .hh-cpair{display:block;}',
'#hh26 .hh-clink{display:block; color:var(--ink); text-decoration:none;',
'  font-family:var(--disp); font-size:clamp(.95rem,2.9vw,1.3rem);',
'  margin:3px 0 clamp(8px,2vw,14px); word-break:break-word; line-height:1.2;}',
'#hh26 .hh-clink:hover{color:var(--wine); text-decoration:underline;',
'  text-underline-offset:3px;}',
'#hh26 .hh-cmail{margin-bottom:0; font-size:clamp(.78rem,2.2vw,1rem);}',
'#hh26 .hh-tiers{display:flex; flex-direction:column; gap:8px;}',
'#hh26 .hh-tier{display:flex; align-items:flex-start; gap:11px; padding:12px 13px;',
'  border:1px solid var(--gold-line); border-radius:3px; background:#fff;',
'  cursor:pointer; transition:border-color .15s ease, background .15s ease;}',
'#hh26 .hh-tier:hover{border-color:var(--gold);}',
'#hh26 .hh-tier.on{border-color:var(--wine); background:var(--paper);}',
'#hh26 .hh-tier b{font-weight:600; font-size:1.18rem; display:block;}',
'#hh26 .hh-radio{flex:none; width:19px; height:19px; margin-top:2px;',
'  border-radius:50%; border:1.5px solid var(--gold); background:#fff; position:relative;}',
'#hh26 .hh-tier.on .hh-radio{border-color:var(--wine);}',
'#hh26 .hh-tier.on .hh-radio:after{content:""; position:absolute; inset:3.5px;',
'  border-radius:50%; background:var(--wine);}',
'#hh26 .hh-mfoot{flex:none; padding:clamp(12px,2.6vw,17px) clamp(16px,3.4vw,24px);',
'  border-top:1px solid var(--gold-line); background:var(--paper);',
'  display:flex; align-items:center; gap:12px;}',
'#hh26 .hh-back{flex:none; font-size:1rem; color:var(--muted); cursor:pointer;',
'  text-decoration:underline; text-underline-offset:3px;}',
'#hh26 .hh-nextwrap{flex:1; text-align:left; order:1;}',
'#hh26 .hh-back{order:2;}',
'#hh26 .hh-next{display:inline-flex; align-items:center; gap:9px;',
'  padding:14px 26px; background:var(--wine); color:#FFFCF7; border-radius:3px;',
'  font-size:1.14rem; font-weight:600; cursor:pointer;}',
'#hh26 .hh-next:hover{background:var(--wine-hi);}',
'#hh26 .hh-next[disabled]{opacity:.4; cursor:not-allowed;}',
'#hh26 .hh-nexthint{display:block; font-size:.92rem; color:var(--muted); margin-top:7px;}',
'#hh26 .hh-err{color:#9B2F1C; font-size:1.05rem; font-weight:600; margin-bottom:12px;}',
'@media (max-width:520px){',
'  #hh26 .hh-row{gap:8px; padding:9px 2px;}',
'  #hh26 .hh-box{width:24px; height:24px;}',
'  #hh26 .hh-box:after{left:7px; top:3px; width:6px; height:11px;}',
'  #hh26 .hh-time{width:72px; font-size:1rem; letter-spacing:-.02em; line-height:1.25;}',
'  #hh26 .hh-lab{font-size:1.3rem; line-height:1.3;}',
'  #hh26 .hh-note{font-size:1rem;}',
'  #hh26 .hh-day{margin:16px 0 5px;}',
'  #hh26 .hh-dayname{font-size:1.45rem;}',
'  #hh26 .hh-daydate{font-size:.92rem;}',
'  #hh26 .hh-mtitle{font-size:1.7rem;}',
'  #hh26 .hh-mtitle.hh-long{font-size:1.28rem;}',
'  #hh26 .hh-mstep{font-size:.82rem;}',
'  #hh26 .hh-intro{font-size:1.3rem; line-height:1.45;}',
'  #hh26 .hh-sub{font-size:1.5rem;}',
'  #hh26 .hh-hint{font-size:1.08rem;}',
'  #hh26 .hh-err{font-size:1.15rem;}',
'  #hh26 .hh-in{font-size:1.25rem; padding:13px 13px;}',
'  #hh26 .hh-fld > label{font-size:.92rem;}',
'  #hh26 .hh-chip{font-size:1.3rem; padding:16px 6px;}',
'  #hh26 .hh-tier b{font-size:1.3rem;}',
'  #hh26 .hh-tier{padding:14px 13px;}',
'  #hh26 .hh-radio{width:22px; height:22px;}',
'  #hh26 .hh-total{font-size:1.22rem;}',
'  #hh26 .hh-total b{font-size:1.9rem;}',
'  #hh26 .hh-next{font-size:1.25rem; padding:15px 26px;}',
'  #hh26 .hh-nexthint{font-size:.95rem;}',
'  #hh26 .hh-back{font-size:1.08rem;}',
'  #hh26 .hh-carry{font-size:1.25rem;}',
'  #hh26 .hh-change{font-size:1.02rem;}',
'  #hh26 .hh-add b{font-size:1.3rem;}',
'  #hh26 .hh-bpara{font-size:1.18rem; line-height:1.5;}',
'  #hh26 .hh-bsign{font-size:1.2rem;}',
'  #hh26 .hh-more{font-size:1.1rem;}',
'  #hh26 .hh-mthumb{width:46px; height:46px;}',
'  #hh26 .hh-mhead{gap:11px;}',
'  #hh26 .hh-crow{gap:8px;}',
'  #hh26 .hh-ctime{width:72px; font-size:1rem; line-height:1.25;}',
'  #hh26 .hh-clab{font-size:1.3rem;}',
'  #hh26 .hh-cday{font-size:.92rem;}',
'  #hh26 .hh-chips{grid-template-columns:repeat(2,1fr);}',
'  #hh26 .hh-in::placeholder{font-size:.68rem; letter-spacing:0;}',
'  #hh26 .hh-in::-webkit-input-placeholder{font-size:.68rem; letter-spacing:0;}',
'}',
'@media (max-height:560px) and (orientation:landscape){',
'  #hh26 .hh-hero{aspect-ratio:auto; min-height:0; align-items:flex-start;}',
'  #hh26 .hh-hero-copy{max-width:none; padding:20px clamp(16px,3.5vw,34px) 22px;}',
'  #hh26 .hh-hero-copy > *{max-width:none;}',
'  #hh26 h1{font-size:2.5rem; line-height:1.02;}',
'  #hh26 h1.hh-long{font-size:2.05rem;}',
'  #hh26 .hh-org{font-size:1.2rem; margin-top:6px;}',
'  #hh26 .hh-lede{max-width:none; font-size:.98rem; line-height:1.45; margin-top:9px;}',
'  #hh26 .hh-dates{max-width:520px; margin-top:13px; gap:10px;}',
'  #hh26 .hh-datecard{padding:9px 13px;}',
'  #hh26 .hh-datecard b{font-size:.6rem; margin-bottom:3px;}',
'  #hh26 .hh-datecard span{font-size:1.1rem;}',
'  #hh26 .hh-hero::after{background:linear-gradient(to right,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.99)) 0%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.94)) 62%,',
'    rgba(245,235,223,calc(var(--hh-s,.95) * 0.72)) 100%);}',
'  #hh26 .hh-body{padding-top:clamp(24px,4vw,40px);}',
'}',
'#hh26.hh-confmode{background:var(--paper);}',
'#hh26 .hh-conf{min-height:100dvh; display:flex; align-items:center;',
'  justify-content:center; padding:clamp(10px,3vw,32px);}',
'#hh26 .hh-cday{font-size:.88rem; font-weight:700; letter-spacing:.12em;',
'  text-transform:uppercase; color:var(--gold); margin:16px 0 4px;}',
'#hh26 .hh-cday:first-child{margin-top:0;}',
'#hh26 .hh-crow{display:flex; gap:11px; padding:6px 0;',
'  border-bottom:1px solid var(--gold-line);}',
'#hh26 .hh-ctime{flex:none; width:100px; font-size:.98rem; font-weight:700;',
'  color:var(--gold); padding-top:2px;}',
'#hh26 .hh-clab{flex:1; font-size:1.18rem; line-height:1.35;}',
'#hh26 .hh-cand{font-style:italic; color:var(--gold);}',
'@media (max-width:520px){',
'  #hh26 .hh-crow{gap:8px;}',
'  #hh26 .hh-ctime{width:58px; font-size:.8rem; line-height:1.25;}',
'  #hh26 .hh-clab{font-size:1.02rem;}',
'}'
].join('\n');
var s = document.createElement('style');
s.id = 'hh26-css';
s.textContent = css;
document.head.appendChild(s);
}
function esc(t) {
return String(t == null ? '' : t)
.replace(/&/g, '&').replace(/</g, '<')
.replace(/>/g, '>').replace(/"/g, '"');
}
function heroMarkup() {
var h = CFG.hero;
var pic = h.image
? '<img class="hh-hero-img" id="hh26-heroimg" src="' + esc(h.image) + '" alt="' + esc(h.alt || h.title) + '">'
: '<div class="hh-hero-ph">Hero image goes here</div>';
var eyebrow = h.eyebrow ? '<p class="hh-eyebrow">' + esc(h.eyebrow) + '</p>' : '';
var org = h.org
? '<p class="hh-org">' + esc(h.org) +
(h.orgEmphasis ? ' <strong>' + esc(h.orgEmphasis) + '</strong>' : '') + '</p>'
: '';
var lede    = h.lede    ? '<p class="hh-lede">' + esc(h.lede) + '</p>' : '';
var cards = (h.dateCards || []).map(function (d) {
return '<div class="hh-datecard"><b>' + esc(d.label) + '</b>' +
'<span>' + esc(d.value) + '</span></div>';
}).join('');
var dates = cards ? '<div class="hh-dates">' + cards + '</div>' : '';
return '' +
'<header class="hh-hero" id="hh26-hero">' + pic +
'<div class="hh-hero-copy">' + eyebrow +
'<h1' + (h.title.length > 14 ? ' class="hh-long"' : '') + '>' +
esc(h.title) + '</h1>' + org + lede + dates +
'</div>' +
'</header>';
}
function tileMarkup(t, i) {
if (t.contact) {
return '<div class="hh-tile hh-contact" style="animation-delay:' + (i * 65) + 'ms">' +
'<div class="hh-csq">' +
'<p class="hh-cq">' + esc(t.title) + '</p>' +
'<span class="hh-cpair">' +
'<span class="hh-cline">Call us</span>' +
'<a class="hh-clink" href="tel:' + esc(t.phone.replace(/[^0-9+]/g, '')) + '">' +
esc(t.phone) + '</a>' +
'</span>' +
'<span class="hh-cpair">' +
'<span class="hh-cline">or email</span>' +
'<a class="hh-clink hh-cmail" href="mailto:' + esc(t.email) + '">' +
esc(t.email) + '</a>' +
'</span>' +
'</div></div>';
}
var ov  = CFG.INFO_PLACEMENT === 'overlay';
var cap = '<div class="hh-cap"><span class="hh-date">' + esc(t.date) + '</span></div>';
var art = t.img
? '<img src="' + esc(t.img) + '" alt="' + esc(t.title) + '">'
: '<div class="hh-noart">' + esc(t.title) + '</div>';
return '' +
'<button class="hh-tile' + (ov ? ' ov' : '') + (t.past ? ' hh-past' : '') + '" type="button" ' +
'data-hh-key="' + esc(t.key) + '" ' +
'aria-label="' + esc(t.title + ' — ' + t.date) + '" ' +
'style="animation-delay:' + (i * 65) + 'ms">' +
'<div class="hh-sq">' + art + (ov ? cap : '') + '</div>' +
(ov ? '' : cap) +
'</button>';
}
function buildOverlay() {
var wrap = document.createElement('div');
wrap.id = 'hh26';
var hatch = CFG.SHOW_ESCAPE_HATCH
? '<span class="hh-hatch" id="hh26-hatch">View the original form</span>' : '';
wrap.innerHTML =
heroMarkup() +
'<main class="hh-body">' +
'<div class="hh-grid" id="hh26-grid">' + CFG.tiles.map(tileMarkup).join('') + '</div>' +
'</main>' +
(hatch ? '<footer class="hh-foot">' + hatch + '</footer>' : '');
document.body.appendChild(wrap);
applyHeroCrop();
document.documentElement.style.overflow = 'hidden';
document.getElementById('hh26-grid').addEventListener('click', function (e) {
var btn = e.target.closest ? e.target.closest('.hh-tile') : null;
if (!btn) return;
var key = btn.getAttribute('data-hh-key');
if (!key) return;
if (window.HH26_openOption) window.HH26_openOption(key);
});
var hatchEl = document.getElementById('hh26-hatch');
if (hatchEl) hatchEl.addEventListener('click', reveal);
document.addEventListener('keydown', function (e) {
if (e.ctrlKey && e.shiftKey && (e.key === 'O' || e.key === 'o')) reveal();
});
}
function applyHeroCrop() {
var hero = document.getElementById('hh26-hero');
var img  = document.getElementById('hh26-heroimg');
if (!hero) return;
hero.style.setProperty('--hh-ratio', CFG.hero.ratio || '32/9');
var s = CFG.hero.scrim;
if (typeof s !== 'number' || isNaN(s)) s = 0.95;
hero.style.setProperty('--hh-s', Math.max(0, Math.min(1, s)));
if (CFG.hero.flip) hero.className += ' flip';
if (img) {
var pos = { bottom: '50% 100%', top: '50% 0%', center: '50% 50%' };
img.style.objectPosition = pos[CFG.hero.crop] || pos.bottom;
}
}
function reveal() {
showPageAgain();
var w = document.getElementById('hh26');
if (w) w.parentNode.removeChild(w);
document.documentElement.style.overflow = '';
}
function $(id) { return id ? document.getElementById(id) : null; }
function setNative(id, val) {
var el = $(id);
if (!el) return false;
el.value = val;
['input', 'change', 'keyup', 'blur'].forEach(function (evt) {
el.dispatchEvent(new Event(evt, { bubbles: true }));
});
return true;
}
function setChecked(id, want) {
var el = $(id);
if (!el) return false;
if (!!el.checked !== !!want) {
var was = document.activeElement;
var pos = null;
if (was && was.tagName === 'INPUT' && was.selectionStart !== undefined) {
try { pos = [was.selectionStart, was.selectionEnd]; } catch (e) {}
}
el.click();
if (was && was !== document.activeElement && was.focus) {
try {
was.focus({ preventScroll: true });
if (pos && was.setSelectionRange) was.setSelectionRange(pos[0], pos[1]);
} catch (e) {}
}
}
return true;
}
function findSubmit() {
return document.getElementById('input_2') ||
document.querySelector(
'.form-submit-button, button[type=submit], input[type=submit]');
}
var M = null;
var LAST = null;
var CHAIN_STARTERS = ['sukkot', 'simchat-torah', 'holiday-charity'];
var CHAIN_OFFERS   = ['sukkot', 'simchat-torah', 'yizkor'];
function closeModal() {
unmountCaptcha();
captureVals(); saveOpt();
if (M) LAST = M;
var bg = $('hh26-bg');
if (bg) bg.parentNode.removeChild(bg);
M = null;
}
function tileImg(key) {
var t = CFG.tiles.filter(function (x) { return x.key === key; })[0];
return t ? t.img : '';
}
function clearAllOptionFields() {
Object.keys(CFG.OPTIONS).forEach(function (k) {
var o = CFG.OPTIONS[k];
if (o.driver)  setNative(o.driver, 'none');
if (o.summary) setNative(o.summary, '');
(o.tiers || []).forEach(function (t) {
if (t.adults)   setNative(t.adults, 0);
if (t.children) setNative(t.children, 0);
if (t.amount)   setNative(t.amount, 0);
});
if (o.students) setNative(o.students, 0);
if (o.veg)      setNative(o.veg, 0);
if (o.sponsorStudents) setNative(o.sponsorStudents, 0);
if (o.sponsorTable)    setNative(o.sponsorTable, 0);
if (o.sponsorOtherAmt) setNative(o.sponsorOtherAmt, '');
if (o.giftOtherAmt)    setNative(o.giftOtherAmt, '');
if (o.qtyField) setNative(o.qtyField, 0);
if (o.donation) setNative(o.donation, '');
if (o.dinnerSub)  setNative(o.dinnerSub, '');
if (o.sponsorSub) setNative(o.sponsorSub, '');
(o.nameFields || []).forEach(function (f) {
setNative(f.en, ''); setNative(f.enLast, ''); setNative(f.heb, '');
setNative(f.father, ''); setNative(f.mother, '');
});
(o.schedule || []).forEach(function (d) {
d.items.forEach(function (it) {
if (it.native)   setChecked(it.native, false);
if (it.adults)   setNative(it.adults, 0);
if (it.children) setNative(it.children, 0);
});
});
if (o.singleEvent && o.singleEvent.native) setChecked(o.singleEvent.native, false);
});
setNative(CFG.F.sponsorAmt, '');
setNative(CFG.F.adults, 0);
setNative(CFG.F.children, 0);
setNative('input_77', 'none');
}
window.HH26_openOption = function (key) {
var opt = (CFG.OPTIONS || {})[key];
if (!opt) { toast('Coming soon'); return; }
var resumed = !!(LAST && LAST.cart && LAST.cart[0] === key);
if (resumed) {
M = LAST;
} else {
M = { cart: [key], d: {}, step: 0,
names: {}, lnDirty: {}, vals: {},
gift: 0, bfGift: 0, spDinner: 0, spStudents: 0, spTables: 0,
total: 0,
picks: {}, adults: 1, children: 0,
tier: null, students: 0, veg: 0, pwyc: 0,
lqty: 1, pickup: null, yzShown: 1, yzDon: 0 };
}
if (!resumed) clearAllOptionFields();
if (window.__hhSponsorFirst) {
window.__hhSponsorFirst = false;
M = { cart: [key], d: {}, step: 0, names: {}, lnDirty: {}, vals: {},
gift: 0, bfGift: 0, spDinner: 0, spStudents: 0, spTables: 0, total: 0,
picks: {}, adults: 0, children: 0, tier: null, students: 0, veg: 0, pwyc: 0,
lqty: 1, pickup: null, yzShown: 1, yzDon: 0, sponsorFirst: true };
clearAllOptionFields();
}
renderModal();
resetView();
};
function loadOpt(key) {
M.key = key;
M.opt = CFG.OPTIONS[key];
var d = M.d[key] || (M.d[key] = { picks:{}, tier:null,
students:0, veg:0, pwyc:0,
lqty:1, pickup:null,
spDinner:0, spStudents:0, spTables:0 });
M.picks = d.picks;
M.tier = d.tier; M.students = d.students; M.veg = d.veg; M.pwyc = d.pwyc;
M.lqty = d.lqty; M.pickup = d.pickup;
M.spDinner = d.spDinner || 0;
M.spStudents = d.spStudents || 0;
M.spTables = d.spTables || 0;
}
function saveOpt() {
if (!M || !M.key) return;
var d = M.d[M.key];
if (!d) return;
d.picks = M.picks;
d.tier = M.tier; d.students = M.students; d.veg = M.veg; d.pwyc = M.pwyc;
d.lqty = M.lqty; d.pickup = M.pickup;
d.spDinner = M.spDinner || 0;
d.spStudents = M.spStudents || 0;
d.spTables = M.spTables || 0;
}
var NON_ATTENDING = ['yizkor', 'holiday-charity'];
function isAttending() {
if (M && M.sponsorFirst) return false;
return M.cart.some(function (k) { return NON_ATTENDING.indexOf(k) < 0; });
}
function inCart(k) { return M.cart.indexOf(k) > -1; }
function isChain()  { return CHAIN_STARTERS.indexOf(M.cart[0]) > -1; }
function remaining(){ return CHAIN_OFFERS.filter(function (k) { return !inCart(k); }); }
function captureVals() {
if (!M) return;
if (!M.vals) M.vals = {};
var body = document.querySelector('#hh26 .hh-mbody');
if (!body) return;
body.querySelectorAll('input,select,textarea').forEach(function (el) {
if (el.id) M.vals[el.id] = el.value;
});
}
function restoreVals() {
if (!M || !M.vals) return;
Object.keys(M.vals).forEach(function (id) {
var el = $(id);
if (el && el.value !== M.vals[id] && M.vals[id] !== undefined) {
el.value = M.vals[id];
}
});
}
function buildSteps() {
var first = CFG.OPTIONS[M.cart[0]];
if (first.kind === 'scheduleview') {
return [{ id:'opt', key:M.cart[0], title:first.title, hint:'' }];
}
if (first.donationOnly && M.cart.length === 1) {
var g = [{ id:'gift', title:'Your gift', hint:'Next: add anything else' }];
if (remaining().length) {
g.push({ id:'addmore', title:'Would you like to add anything else?',
hint:'Next: your details' });
}
g.push({ id:'pay', title:'Your details & payment', hint:'' });
return g;
}
if (first.kind === 'schedule' || first.kind === 'info') {
return [{ id:'opt', key:M.cart[0], title:first.title, hint:'' }];
}
if (M.sponsorFirst) {
var sp = [{ id:'support', title:'Support the celebrations', hint:'Next: your details' },
{ id:'who', title:'Your details', hint:'Next: payment' }];
if ((M.total || 0) > 0) sp.push({ id:'pay', title:'Payment details', hint:'Next: review' });
sp.push({ id:'review', title:'Please check this over', hint:'' });
return sp;
}
var st = [];
M.cart.forEach(function (k) {
var o = CFG.OPTIONS[k];
st.push({ id:'opt', key:k,
title:(o.stepTitles && o.stepTitles.schedule) || o.title,
hint:'Next: add anything else' });
if (o.kind === 'dinner') {
st.push({ id:'dinnergift', key:k,
title:(o.stepTitles && o.stepTitles.gift) || ('Sponsor ' + o.title),
hint:'Next: add anything else' });
}
});
if (isChain() && remaining().length) {
st.push({ id:'addmore', title:'Would you like to add anything else?',
hint:'Next: who\u2019s coming' });
}
st.push({ id:'who',
title: isAttending() ? 'Who\u2019s coming?' : 'Your details',
hint:'Next: support & dedication' });
st.push({ id:'support', title:'Support the celebrations',       hint:'Next: payment' });
if ((M.total || 0) > 0) {
st.push({ id:'pay',   title:'Payment details',                hint:'Next: anything else?' });
}
if (isAttending()) {
st.push({ id:'notes', title:'Anything else we should know?', hint:'Next: review' });
}
st.push({ id:'review', title:'Please check this over', hint:'' });
return st;
}
function renderModal() {
saveOpt();
var bg = $('hh26-bg');
if (!bg) {
bg = document.createElement('div');
bg.id = 'hh26-bg';
bg.className = 'hh-bg';
document.getElementById('hh26').appendChild(bg);
bg.addEventListener('click', function (e) { if (e.target === bg) closeModal(); });
}
M.total = liveTotal();
var steps = buildSteps();
if (M.step >= steps.length) M.step = steps.length - 1;
if (M.step < 0) M.step = 0;
var st   = steps[M.step];
var last = M.step >= steps.length - 1;
if (st.key) loadOpt(st.key);
else if (!M.opt) loadOpt(M.cart[0]);
var crumb = M.cart.map(function (k) { return CFG.OPTIONS[k].title; }).join(' + ');
var thumb = tileImg(M.cart[0]);
bg.innerHTML =
'<div class="hh-modal"><div class="hh-mwrap"><div class="hh-mhead">' +
(thumb ? '<img class="hh-mthumb" src="' + esc(thumb) + '" alt="">' : '') +
'<div class="hh-mheadtext">' +
'<div class="hh-mtitle' + (st.title.length > 17 ? ' hh-long' : '') + '">' +
esc(st.title) + '</div>' +
(steps.length > 1
? '<div class="hh-mstep">' + esc(crumb) + ' · Step ' +
(M.step + 1) + ' of ' + steps.length + '</div>'
: '') +
'</div>' +
'<div class="hh-htotal" id="hh26-htotalwrap" style="visibility:' +
((M.total || 0) > 0 ? 'visible' : 'hidden') + '">' +
'<span>Total</span><b id="hh26-htotal">$' +
(M.total || 0).toLocaleString() + '</b></div>' +
'</div><div class="hh-x" id="hh26-x">×</div></div>' +
'<div class="hh-mbody"><div class="hh-pane">' + paneHTML(st) + '</div></div>' +
'<div class="hh-mfoot">' +
(M.step > 0 ? '<span class="hh-back" id="hh26-back">Back</span>' : '') +
'<div class="hh-nextwrap"><span class="hh-next" id="hh26-next">' +
(M.opt && M.opt.kind === 'info'
? ((M.opt.cta && M.opt.cta.label) || 'Close')
: M.opt && M.opt.kind === 'schedule'
? (M.opt.ctaLabel || 'Continue')
: M.opt && M.opt.kind === 'scheduleview'
? 'Reserve for High Holiday Services'
: (last ? 'Complete Registration'
: (st.id === 'addmore' ? 'No thanks, continue' : 'Next'))) +
((last && (!M.opt || (M.opt.kind !== 'scheduleview' && M.opt.kind !== 'info' &&
M.opt.kind !== 'schedule'))) || st.id === 'addmore'
? '' : ' <span aria-hidden="true">→</span>') + '</span>' +
(last ? '' : '<span class="hh-nexthint">' + esc(st.hint) + '</span>') +
'</div>' +
'</div></div>';
$('hh26-x').addEventListener('click', closeModal);
if ($('hh26-back')) $('hh26-back').addEventListener('click', function () {
unmountCaptcha(); captureVals(); saveOpt(); M.step--; renderModal();
});
$('hh26-next').addEventListener('click', onNext);
wirePane(st);
restoreVals();
wireFieldChaining();
resetView();
}
function wireFieldChaining() {
var body = document.querySelector('#hh26 .hh-mbody');
if (!body) return;
function fields() {
return Array.prototype.filter.call(
body.querySelectorAll('input,select,textarea'),
function (el) {
return !el.disabled && el.type !== 'hidden' && el.offsetParent !== null;
});
}
function setHints() {
var f = fields();
f.forEach(function (el, i) {
if (el.tagName === 'TEXTAREA') return;
el.setAttribute('enterkeyhint', i === f.length - 1 ? 'done' : 'next');
});
}
setHints();
body.addEventListener('input', setHints);
body.addEventListener('input',  function (e) { if (e.target.id && M) M.vals[e.target.id] = e.target.value; });
body.addEventListener('change', function (e) { if (e.target.id && M) M.vals[e.target.id] = e.target.value; });
body.addEventListener('focusin', function (e) {
if (window.innerWidth > 520) return;
var el = e.target;
if (!el.classList || !el.classList.contains('hh-in')) return;
setTimeout(function () {
if (document.activeElement !== el) return;
if (el.scrollIntoView) el.scrollIntoView({ block:'center', behavior:'smooth' });
}, 300);
});
body.addEventListener('keydown', function (e) {
if (e.key !== 'Enter') return;
var el = e.target;
if (el.tagName === 'TEXTAREA') return;
e.preventDefault();
var f = fields(), i = f.indexOf(el);
if (i > -1 && i < f.length - 1) {
var nx = f[i + 1];
nx.focus();
if (nx.select) { try { nx.select(); } catch (err) {} }
} else {
var btn = $('hh26-next');
if (btn) btn.click();
}
});
}
function resetView() {
var el = document.activeElement;
if (el && el.blur && el !== document.body) el.blur();
requestAnimationFrame(function () {
requestAnimationFrame(function () {
var body = document.querySelector('#hh26 .hh-mbody');
var mark = (M && M.scrollTo) ? $(M.scrollTo) : null;
if (body && mark) {
body.scrollTop += mark.getBoundingClientRect().top -
body.getBoundingClientRect().top - 14;
var f = mark.parentNode.querySelector('#' + mark.id + ' ~ .hh-two .hh-in');
if (f && window.innerWidth > 520) {
try { f.focus({ preventScroll: true }); } catch (e) {}
}
} else if (body) {
body.scrollTop = 0;
}
if (M) M.scrollTo = null;
var root = document.getElementById('hh26');
if (root) root.scrollTop = 0;
if (window.scrollY) window.scrollTo(0, 0);
});
});
}
function engineTotal() {
var t = document.getElementById('total_amount');
if (t) {
var raw = (t.value !== undefined && t.value !== '') ? t.value : (t.innerText || '');
var n = parseFloat(String(raw).replace(/[^0-9.]/g, ''));
if (!isNaN(n)) return n;
}
return null;
}
function liveTotal() {
var e = engineTotal(), c = computedTotal();
if (e === null) return c;
return e > c ? e : c;
}
function computedTotal() {
if (!M) return 0;
saveOpt();
var sum = 0;
(M.cart || []).forEach(function (k) {
var o = CFG.OPTIONS[k], d = M.d[k] || {};
if (!o || !o.tiers) return;
var t = tierOf(o, d.tier);
if (t) {
sum += (M.adults || 0) * t.adultPrice + (M.children || 0) * t.childPrice;
if (t.amount) sum += d.pwyc || 0;
}
sum += (d.spStudents || 0) * o.sponsorStudentPrice;
sum += (d.spTables   || 0) * o.sponsorTablePrice;
sum += d.spDinner || 0;
});
(M.cart || []).forEach(function (k) {
var o = CFG.OPTIONS[k], d = M.d[k] || {};
if (o && o.kind === 'yizkor') sum += M.yzDon || 0;
});
return sum + (M.gift || 0) + (M.bfGift || 0);
}
function tierOf(o, key) {
if (!o || !o.tiers || !key) return null;
return o.tiers.filter(function (t) { return t.key === key; })[0] || null;
}
function dinnerPane() {
var o = M.opt;
var when = o.event.items.map(function (i) {
return '<div class="hh-crow"><span class="hh-ctime">' + esc(i.time) + '</span>' +
'<span class="hh-clab">' + esc(i.label) + '</span></div>';
}).join('');
var tiers = o.tiers.map(function (t) {
return '<div class="hh-tier' + (M.tier === t.key ? ' on' : '') + '" data-tier="' + t.key + '">' +
'<span class="hh-radio"></span><span><b>' + esc(t.label) + '</b>' +
'<span class="hh-note">' + esc(t.note) + '</span></span></div>';
}).join('');
var pw = (M.tier === 'pwyc')
? '<div class="hh-fld" style="margin-top:11px"><label>Your amount</label>' +
'<input class="hh-in" type="number" min="0" id="hh26-pwyc-' + esc(M.key) + '" value="' +
(M.pwyc || '') + '"></div>' : '';
return blurbHTML() + '<p class="hh-intro">' + esc(o.intro) +
'</p><div id="hh26-err"></div>' +
'<div class="hh-cday">' + esc(o.event.date) + '</div>' + when +
'<div class="hh-sub">Choose your price</div>' +
'<div class="hh-tiers">' + tiers + '</div>' + pw +
countsBlock(5) +
(o.students ? '<div class="hh-fld"><label>UCR & UOR students</label>' +
'<input class="hh-in" type="number" min="0" max="5" id="hh26-students" value="' + M.students + '">' +
'<p class="hh-hint" style="margin:6px 0 0">Students attend free at every price level.</p></div>' : '') +
(o.veg ? '<div class="hh-fld"><label>Vegetarian meals</label>' +
'<input class="hh-in" type="number" min="0" id="hh26-veg" value="' + M.veg + '">' +
'<p class="hh-hint" style="margin:6px 0 0">How many of the people above need a vegetarian meal?</p></div>' : '') +
'<div id="hh26-dtotal" style="display:none"></div>';
}
function dinnerGiftPane() {
var o = M.opt;
var chips = o.sponsorAmounts.map(function (a) {
return '<div class="hh-chip' + (M.spDinner === a ? ' on' : '') + '" data-amt="' + a + '">$' +
a.toLocaleString() + '</div>';
}).join('');
return '<div id="hh26-err"></div>' +
'<p class="hh-intro">Please consider making a donation to bring holiday joy ' +
'to people in-need and to ensure that everyone in our community can ' +
'participate in the celebrations.</p>' +
'<div class="hh-sub" style="margin-top:0">Sponsor the ' +
esc(o.title === 'Sukkot Community BBQ' ? 'BBQ' : 'dinner') + '</div>' +
'<div class="hh-chips">' + chips +
'<div class="hh-chip' + (M.spDinner && o.sponsorAmounts.indexOf(M.spDinner) < 0 ? ' on' : '') +
'" data-amt="other">Other</div></div>' +
'<div class="hh-fld" id="hh26-otherwrap-' + esc(M.key) +
'" style="margin-top:11px;display:' +
(M.spDinner && o.sponsorAmounts.indexOf(M.spDinner) < 0 ? 'block' : 'none') + '">' +
'<label>Amount</label><input class="hh-in" type="number" min="1" id="hh26-otheramt-' +
esc(M.key) + '" value="' +
(M.spDinner && o.sponsorAmounts.indexOf(M.spDinner) < 0 ? M.spDinner : '') + '"></div>' +
(o.sponsorStudents ? '<div class="hh-two hh-align" style="margin-top:16px">' +
'<div class="hh-fld"><label>Sponsor students — $30 each</label>' +
'<input class="hh-in" type="number" min="0" id="hh26-spstudents" value="' + (M.spStudents || '') + '"></div>' +
'<div class="hh-fld"><label>Sponsor a table — $125</label>' +
'<input class="hh-in" type="number" min="0" id="hh26-sptables" value="' + (M.spTables || '') + '"></div>' +
'</div>' : '') +
'<div class="hh-sub">Dedication</div>' +
'<p class="hh-hint">Optional \u2014 leave blank to skip.</p>' +
'<div class="hh-fld"><label>Dedicate this</label>' +
'<select class="hh-in" id="hh26-dedtype"><option value="">No dedication</option>' +
'<option value="honor">In honor of</option><option value="memory">In memory of</option></select></div>' +
'<div class="hh-fld"><label>Name or names</label><input class="hh-in" id="hh26-dednames"></div>' +
'<div id="hh26-dtotal" style="display:none"></div>';
}
function syncDinner() {
var o = M.opt;
o.tiers.forEach(function (t) {
var on = (t.key === M.tier);
if (t.adults)   setNative(t.adults,   on ? M.adults   : 0);
if (t.children) setNative(t.children, on ? M.children : 0);
if (t.amount)   setNative(t.amount, (on && M.pwyc) ? M.pwyc : 0);
});
if (o.students) setNative(o.students, M.students);
if (o.veg)      setNative(o.veg, M.veg);
if (o.sponsorStudents) setNative(o.sponsorStudents, M.spStudents || 0);
if (o.sponsorTable)    setNative(o.sponsorTable,    M.spTables   || 0);
var i = o.sponsorAmounts.indexOf(M.spDinner);
if (M.spDinner > 0 && o.sponsorRadios.length) {
if (i > -1) setChecked(o.sponsorRadios[i], true);
else if (o.sponsorOther) { setChecked(o.sponsorOther, true);
setNative(o.sponsorOtherAmt, M.spDinner); }
}
refreshTotal();
}
function wireDinner() {
var body = document.querySelector('#hh26 .hh-mbody');
var tiers = document.querySelector('#hh26 .hh-tiers');
if (tiers) tiers.addEventListener('click', function (e) {
var t = e.target.closest && e.target.closest('.hh-tier');
if (!t) return;
M.tier = t.getAttribute('data-tier');
M.scrollTo = 'hh26-counts';
renderModal();
});
body.addEventListener('input', function (e) {
var id = e.target.id, v = e.target.value;
if (id === 'hh26-adults')      M.adults   = clamp(v, 0, 5);
else if (id === 'hh26-children') M.children = clamp(v, 0, 5);
else if (id === 'hh26-students') M.students = clamp(v, 0, 5);
else if (id === 'hh26-veg')      M.veg      = clamp(v, 0, 15);
else if (id === 'hh26-pwyc-' + M.key) M.pwyc = parseInt(v, 10) || 0;
else if (id === 'hh26-spstudents') M.spStudents = parseInt(v, 10) || 0;
else if (id === 'hh26-sptables')   M.spTables   = parseInt(v, 10) || 0;
else if (id === 'hh26-otheramt-' + M.key) { M.spDinner = parseInt(v, 10) || 0; return; }
else return;
var cap = M.adults + M.children + M.students;
if (M.veg > cap) { M.veg = cap; if ($('hh26-veg')) $('hh26-veg').value = cap; }
syncDinner();
});
body.addEventListener('change', function (e) {
if (e.target.id === 'hh26-otheramt-' + M.key) syncDinner();
});
var chips = document.querySelector('#hh26 .hh-chips');
if (chips) chips.addEventListener('click', function (e) {
var c = e.target.closest && e.target.closest('.hh-chip');
if (!c) return;
document.querySelectorAll('#hh26 .hh-chip').forEach(function (x) { x.className = 'hh-chip'; });
c.className = 'hh-chip on';
var amt = c.getAttribute('data-amt');
if (amt === 'other') {
$('hh26-otherwrap-' + M.key).style.display = 'block';
M.spDinner = parseInt($('hh26-otheramt-' + M.key).value, 10) || 0;
} else {
$('hh26-otherwrap-' + M.key).style.display = 'none';
M.spDinner = parseInt(amt, 10);
}
syncDinner();
});
syncDinner();
}
function commitDinner() {
var o = M.opt, t = tierOf(o, M.tier), lines = [];
lines.push('Pricing: ' + (t ? t.label : ''));
if (M.adults)   lines.push('Adults: ' + M.adults);
if (M.children) lines.push('Children: ' + M.children);
if (M.students) lines.push('UCR/UOR students: ' + M.students + ' (free)');
if (M.veg)      lines.push('Vegetarian meals: ' + M.veg);
if (o.summary) setNative(o.summary, lines.join('\n'));
setDrivers();
}
function commitDinnerGift() {
var o = M.opt, t = tierOf(o, M.tier);
var dinner = t ? (M.adults * t.adultPrice + M.children * t.childPrice) : 0;
if (t && t.amount) dinner += M.pwyc || 0;
var sponsor = (M.spStudents || 0) * o.sponsorStudentPrice +
(M.spTables   || 0) * o.sponsorTablePrice + (M.spDinner || 0);
if (o.dinnerSub)  setNative(o.dinnerSub,  '$' + dinner.toLocaleString());
if (o.sponsorSub) setNative(o.sponsorSub, '$' + sponsor.toLocaleString());
if (o.summary) {
var base = String(val(o.summary) || '').split('\nAmount:')[0]
.split('\nSponsorship:')[0];
var add = [];
if (dinner)  add.push('Amount: $' + dinner.toLocaleString());
if (sponsor) add.push('Sponsorship: $' + sponsor.toLocaleString());
setNative(o.summary, add.length ? base + '\n' + add.join('\n') : base);
}
var d = sval('hh26-dedtype');
if (d === 'honor')  setChecked(CFG.F.dedInHonor, true);
if (d === 'memory') setChecked(CFG.F.dedInMemory, true);
var dn = sval('hh26-dednames');
if (dn) setNative(CFG.F.dedNames, dn);
M.total = liveTotal();
}
function paneHTML(st) {
var id = st.id;
if (id === 'opt') {
if (M.opt.kind === 'scheduleview') return schedulePaneView();
if (M.opt.kind === 'dinner') return dinnerPane();
if (M.opt.kind === 'schedule') return fullSchedulePane();
if (M.opt.kind === 'info')     return infoPane();
if (M.opt.kind === 'yizkor')   return yizkorPane();
return schedulePane();
}
if (id === 'dinnergift') return dinnerGiftPane();
if (id === 'addmore')    return addMorePane();
if (id === 'who')        return whoPane();
if (id === 'support')    return supportPane();
if (id === 'gift')       return giftPane();
if (id === 'pay')        return payPane();
if (id === 'review')     return reviewPane();
return notesPane();
}
function addMorePane() {
var cards = remaining().map(function (k) {
var o = CFG.OPTIONS[k];
var when = o.event ? o.event.date
: (o.infoEvent ? o.infoEvent.date
: (o.singleEvent ? o.singleEvent.date : ''));
return '<div class="hh-add" data-add="' + esc(k) + '">' +
'<span><b>' + esc(o.title) + '</b>' +
(when ? '<span class="hh-note">' + esc(when) + '</span>' : '') + '</span>' +
'<span class="hh-addplus" aria-hidden="true">+</span>' +
'</div>';
}).join('');
return '<div id="hh26-err"></div>' +
'<p class="hh-intro">You\u2019re signed up for ' +
esc(M.cart.map(function (k) { return CFG.OPTIONS[k].title; }).join(' and ')) +
'. Add anything else while you\u2019re here \u2014 it all goes on one registration.</p>' +
'<div class="hh-adds">' + cards + '</div>';
}
function schedulePaneView() {
var o = M.opt;
var h = '<p class="hh-intro">' + esc(o.intro) + '</p>';
o.days.forEach(function (d) {
h += '<div class="hh-day"><div class="hh-dayname">' + esc(d.sub) + '</div>' +
'<div class="hh-daydate">' + esc(d.date) + '</div></div>';
d.items.forEach(function (i) {
h += '<div class="hh-crow"><span class="hh-ctime">' + esc(i.time) + '</span>' +
'<span class="hh-clab">' + esc(i.label) +
(i.note ? '<span class="hh-note">' + esc(i.note) + '</span>' : '') +
'</span></div>';
});
});
return h;
}
function mins(t) {
var m = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(t || '');
if (!m) return 0;
var h = parseInt(m[1], 10) % 12;
if (/PM/i.test(m[3])) h += 12;
return h * 60 + parseInt(m[2], 10);
}
function fullSchedulePane() {
var h = '<p class="hh-intro">' + esc(M.opt.intro) + '</p><div id="hh26-err"></div>';
(CFG.SUKKOT_SCHEDULE || []).forEach(function (d) {
h += '<div class="hh-day"><div class="hh-dayname">' + esc(d.day) + '</div>' +
'<div class="hh-daydate">' + esc(d.date) + '</div></div>';
d.items.forEach(function (it) {
h += '<div class="hh-crow"><span class="hh-ctime">' + esc(it.time) + '</span>' +
'<span class="hh-clab' + (it.cand ? ' hh-cand' : '') + '">' + it.label +
(it.note ? '<span class="hh-note">' + esc(it.note) + '</span>' : '') +
'</span></div>';
});
});
return h;
}
function yizkorPane() {
var o = M.opt, h = blurbHTML();
h += '<p class="hh-intro">' + esc(o.intro) + '</p><div id="hh26-err"></div>';
if (o.deadline) {
h += '<p class="hh-deadline">' + esc(o.deadline) + '</p>';
}
h += '<p class="hh-hint" style="margin:0 0 4px">Apart from the name itself, ' +
'every field below is optional \u2014 share whatever you know.</p>';
var shown = M.yzShown || 1;
for (var i = 0; i < shown; i++) {
h += '<div id="hh26-yblock' + i + '"></div>' +
'<div class="hh-sub">' + (i === 0 ? 'Name to be remembered'
: 'Additional name ' + (i + 1)) + '</div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>First name</label>' +
'<input class="hh-in" id="hh26-yf' + i + '"></div>' +
'<div class="hh-fld"><label>Last name</label>' +
'<input class="hh-in" id="hh26-yl' + i + '"></div>' +
'</div>' +
'<div class="hh-fld"><label>Hebrew name</label>' +
'<input class="hh-in" id="hh26-yh' + i + '"></div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>Father\u2019s Hebrew name</label>' +
'<input class="hh-in" id="hh26-yfa' + i + '"></div>' +
'<div class="hh-fld"><label>Mother\u2019s Hebrew name</label>' +
'<input class="hh-in" id="hh26-ymo' + i + '"></div>' +
'</div>' +
'<div class="hh-fld"><label>Date of passing</label>' +
'<input class="hh-in" type="date" id="hh26-yd' + i + '">' +
'<p class="hh-hint" style="margin:6px 0 0">Optional.</p></div>';
}
if (shown < o.maxNames) {
h += '<div class="hh-add" id="hh26-yadd"><span><b>Add another name</b>' +
'<span class="hh-note">Up to ' + o.maxNames + ' names on this form</span></span>' +
'<span class="hh-addplus" aria-hidden="true">+</span></div>';
} else {
h += '<p class="hh-hint" style="margin-top:12px">That\u2019s ' + o.maxNames +
' names \u2014 the most this form holds. To remember more, please ' +
'complete the form again once you\u2019ve finished.</p>';
}
h += '<div class="hh-sub">Charity in their memory</div>' +
'<p class="hh-hint">It is customary to give tzedakah in conjunction with Yizkor. ' +
'Optional.</p>' +
'<div class="hh-fld"><label>Amount</label>' +
'<input class="hh-in" type="number" min="0" id="hh26-ydon" value="' +
(M.yzDon || '') + '"></div>';
return h;
}
function wireYizkor() {
var add = $('hh26-yadd');
if (add) add.addEventListener('click', function () {
captureVals();
M.yzShown = (M.yzShown || 1) + 1;
M.scrollTo = 'hh26-yblock' + (M.yzShown - 1);
renderModal();
});
var don = $('hh26-ydon');
if (don) don.addEventListener('input', function () {
M.yzDon = parseInt(this.value, 10) || 0;
});
}
function setDateParts(stem, iso) {
if (!iso) return;
var p = iso.split('-');
if (p.length !== 3) return;
setSelect(stem + '_month', String(parseInt(p[1], 10)));
setSelect(stem + '_day',   String(parseInt(p[2], 10)));
setSelect(stem + '_year',  p[0]);
setNative(stem + '_month', String(parseInt(p[1], 10)));
setNative(stem + '_day',   String(parseInt(p[2], 10)));
setNative(stem + '_year',  p[0]);
}
function commitYizkor() {
var o = M.opt, lines = [];
o.nameFields.forEach(function (f, i) {
var en = sval('hh26-yf' + i), ln = sval('hh26-yl' + i);
setNative(f.en, en);  setNative(f.enLast, ln);
setNative(f.heb, sval('hh26-yh' + i));
setNative(f.father, sval('hh26-yfa' + i));
setNative(f.mother, sval('hh26-ymo' + i));
setDateParts(f.date, sval('hh26-yd' + i));
if (!en && !ln) return;
var line = (en + ' ' + ln).trim();
var heb = sval('hh26-yh' + i);
if (heb) line += ' \u2014 ' + heb;
var fa = sval('hh26-yfa' + i), mo = sval('hh26-ymo' + i);
var par = [fa, mo].filter(Boolean).join(' and ');
if (par) line += ', child of ' + par;
var d = sval('hh26-yd' + i);
if (d) line += ' (' + d + ')';
lines.push('\u2022 ' + line);
});
if (M.yzDon) lines.push('Charity in their memory: $' +
(M.yzDon || 0).toLocaleString());
setNative(o.summary, lines.join('\n'));
if (o.donation) setNative(o.donation, M.yzDon || 0);
setDrivers();
}
function infoPane() {
var o = M.opt;
var h = '<p class="hh-intro">' + esc(o.intro) + '</p><div id="hh26-err"></div>';
(o.body || []).forEach(function (para) {
h += '<p class="hh-bpara">' + esc(para) + '</p>';
});
(o.links || []).forEach(function (l) {
h += '<div class="hh-add"><a href="' + esc(l.url) + '" target="_blank" ' +
'rel="noopener" style="text-decoration:none;color:inherit;flex:1">' +
'<b>' + esc(l.label) + '</b></a>' +
'<span class="hh-addplus" aria-hidden="true">→</span></div>';
});
return h;
}
function sponsorBlock(grp, heading, amounts, current, names) {
var chips = amounts.map(function (a, i) {
var nm = (names && names[i])
? '<span style="display:block;font-size:.72em;line-height:1.25;' +
'opacity:.74;margin-top:3px">' + esc(names[i]) + '</span>' : '';
return '<div class="hh-chip' + (current === a ? ' on' : '') + '" data-amt="' + a + '">$' +
a.toLocaleString() + nm + '</div>';
}).join('');
var isOther = current && amounts.indexOf(current) < 0;
return '<div class="hh-sub">' + esc(heading) + '</div>' +
'<div class="hh-chips" data-grp="' + grp + '">' + chips +
'<div class="hh-chip' + (isOther ? ' on' : '') + '" data-amt="other">Other</div>' +
'</div>' +
'<div class="hh-fld" id="hh26-otherwrap-' + grp + '" style="margin-top:11px;display:' +
(isOther ? 'block' : 'none') + '"><label>Amount</label>' +
'<input class="hh-in" type="number" min="1" id="hh26-otheramt-' + grp + '" value="' +
(isOther ? current : '') + '"></div>';
}
function supportPane() {
var h = '<div id="hh26-err"></div>' +
'<p class="hh-intro">Everything here is free to attend. Your generous ' +
'donation is greatly appreciated!\nPlease also consider donating so that ' +
'everyone in our community can celebrate the holidays with us.</p>' +
sponsorBlock('gen', 'Sponsor the celebrations', CFG.GIFTS, M.gift,
CFG.GIFT_NAMES);
h += '<div class="hh-sub">Dedication</div>' +
'<p class="hh-hint">Optional \u2014 leave blank to skip.</p>' +
'<div class="hh-fld"><label>Dedicate this</label>' +
'<select class="hh-in" id="hh26-dedtype"><option value="">No dedication</option>' +
'<option value="honor">In honor of</option><option value="memory">In memory of</option></select></div>' +
'<div class="hh-fld"><label>Name or names</label><input class="hh-in" id="hh26-dednames"></div>' +
'<div id="hh26-dtotal" style="display:none"></div>';
return h;
}
function schedulePane() {
var h = blurbHTML() + '<p class="hh-intro">' + esc(M.opt.intro) +
'</p><div id="hh26-err"></div>';
if (!M.opt.infoEvent && !M.opt.singleEvent) h += countsBlock(5);
if (M.opt.infoEvent) {
var ie = M.opt.infoEvent;
h += '<div class="hh-cday">' + esc(ie.date) + '</div>' +
ie.items.map(function (i) {
return '<div class="hh-crow"><span class="hh-ctime">' + esc(i.time) + '</span>' +
'<span class="hh-clab">' + esc(i.label) +
(i.note ? '<span class="hh-note">' + esc(i.note) + '</span>' : '') +
'</span></div>';
}).join('') +
countsBlock(9);
return h;
}
if (M.opt.singleEvent) {
var ev = M.opt.singleEvent;
h += '<div class="hh-day"><div class="hh-dayname">' + esc(ev.day) + '</div>' +
'<div class="hh-daydate">' + esc(ev.date) + '</div></div>' +
'<div class="hh-crow"><span class="hh-ctime">' + esc(ev.time) + '</span>' +
'<span class="hh-clab">' + esc(ev.label) + '</span></div>' +
countsBlock(5);
return h;
}
M.opt.schedule.forEach(function (d, di) {
h += '<div class="hh-day"><div class="hh-dayname">' + esc(d.day) + '</div>' +
'<div class="hh-daydate">' + esc(d.date) + '</div></div>';
d.items.forEach(function (it, ii) {
var k  = di + '-' + ii;
var on = M.picks[k] ? ' on' : '';
var missing = (!it.info && !it.native && !it.adults && !it.children &&
!it.summaryOnly)
? '<span class="hh-nofield">No form field yet — won\u2019t be recorded</span>' : '';
h += '<div class="hh-row' + (it.info ? ' info' : on) + '" data-k="' + k + '"' +
(it.info ? '' : ' role="checkbox" tabindex="0" aria-checked="' + (!!M.picks[k]) + '"') + '>' +
'<span class="hh-box"></span>' +
'<span class="hh-time">' + esc(it.time) + '</span>' +
'<span class="hh-lab">' + esc(it.label) +
(it.note ? '<span class="hh-note">' + esc(it.note) + '</span>' : '') +
missing +
'</span></div>';
});
});
return h;
}
function nameRows(n, prefix, labelWord) {
var h = '', i, fid, lid;
for (i = 0; i < n; i++) {
fid = 'hh26-' + prefix + 'f' + i;
lid = 'hh26-' + prefix + 'l' + i;
h += '<div class="hh-two">' +
'<input class="hh-in hh-nm" id="' + fid + '" placeholder="' +
labelWord + ' First Name" value="' + esc(M.names[fid] || '') + '">' +
'<input class="hh-in hh-nm" id="' + lid + '" placeholder="Last Name" value="' +
esc(M.names[lid] || '') + '">' +
'</div>';
if (i < n - 1) h += '<div style="height:8px"></div>';
}
return h;
}
function whoPane() {
if (!isAttending()) {
return '<div id="hh26-err"></div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>First name</label>' +
'<input class="hh-in hh-nm" id="hh26-af0"></div>' +
'<div class="hh-fld"><label>Last name</label>' +
'<input class="hh-in hh-nm" id="hh26-al0"></div>' +
'</div>' +
'<div class="hh-fld"><label>Email</label>' +
'<input class="hh-in" type="email" id="hh26-email"></div>' +
'<div class="hh-fld"><label>Phone</label>' +
'<input class="hh-in" type="tel" id="hh26-phone"></div>';
}
return '<div id="hh26-err"></div>' +
'<div class="hh-sub" style="margin-top:0">Names</div>' +
'<p class="hh-hint">Everyone attending, so we can greet them properly.</p>' +
'<div id="hh26-names"></div>' +
'<div class="hh-sub">How we reach you</div>' +
'<div class="hh-fld"><label>Email</label><input class="hh-in" type="email" id="hh26-email"></div>' +
'<div class="hh-fld"><label>Phone</label><input class="hh-in" type="tel" id="hh26-phone"></div>';
}
function giftAmounts()   { return M.opt.giftAmounts   || CFG.GIFTS; }
function giftRadios()    { return M.opt.giftRadios    || CFG.F.sponsorRadios; }
function giftOtherRadio(){ return M.opt.giftOther     || CFG.F.sponsorOther; }
function giftOtherAmt()  { return M.opt.giftOtherAmt  || CFG.F.sponsorAmt; }
function giftPane() {
var chips = giftAmounts().map(function (a) {
return '<div class="hh-chip' + (M.gift === a ? ' on' : '') + '" data-amt="' + a + '">$' +
a.toLocaleString() + '</div>';
}).join('');
return '<div id="hh26-err"></div>' +
'<p class="hh-intro">' + esc(M.opt.intro) + '</p>' +
'<div class="hh-chips">' + chips +
'<div class="hh-chip' + (M.gift && giftAmounts().indexOf(M.gift) < 0 ? ' on' : '') +
'" data-amt="other">Other</div></div>' +
'<div class="hh-fld" id="hh26-otherwrap-gift" style="margin-top:11px;display:' +
(M.gift && giftAmounts().indexOf(M.gift) < 0 ? 'block' : 'none') + '">' +
'<label>Amount</label><input class="hh-in" type="number" min="1" id="hh26-otheramt-gift" value="' +
(M.gift && giftAmounts().indexOf(M.gift) < 0 ? M.gift : '') + '"></div>' +
'<div class="hh-sub">Dedication</div>' +
'<p class="hh-hint">Optional \u2014 leave blank to skip.</p>' +
'<div class="hh-fld"><label>Dedicate this gift</label>' +
'<select class="hh-in" id="hh26-dedtype"><option value="">No dedication</option>' +
'<option value="honor">In honor of</option><option value="memory">In memory of</option></select></div>' +
'<div class="hh-fld"><label>Name or names</label><input class="hh-in" id="hh26-dednames"></div>' +
'<div id="hh26-gtotal" style="display:none"></div>';
}
function payPane() {
var mo = '', yr = '', i;
for (i = 1; i <= 12; i++) mo += '<option value="' + i + '">' + i + '</option>';
for (i = 2026; i <= 2035; i++) yr += '<option value="' + i + '">' + i + '</option>';
var contact = !M.opt.donationOnly ? '' :
'<div class="hh-sub" style="margin-top:0">Your details</div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>First name</label><input class="hh-in" id="hh26-cfirst"></div>' +
'<div class="hh-fld"><label>Last name</label><input class="hh-in" id="hh26-clast"></div>' +
'</div>' +
'<div class="hh-fld"><label>Email</label><input class="hh-in" type="email" id="hh26-cemail"></div>' +
'<div class="hh-fld"><label>Phone</label><input class="hh-in" type="tel" id="hh26-cphone"></div>' +
'<div class="hh-sub">Payment</div>';
return '<div id="hh26-err"></div>' + contact +
'<div class="hh-fld"><label>Name on card</label><input class="hh-in" id="hh26-ccname"></div>' +
'<div class="hh-fld"><label>Card number</label><input class="hh-in" inputmode="numeric" id="hh26-ccnum"></div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>Expires</label><div class="hh-two">' +
'<select class="hh-in" id="hh26-ccmon">' + mo + '</select>' +
'<select class="hh-in" id="hh26-ccyear">' + yr + '</select></div></div>' +
'<div class="hh-fld"><label>Security code</label><input class="hh-in" inputmode="numeric" id="hh26-cccvv"></div>' +
'</div>' +
'<div class="hh-sub">Billing address</div>' +
'<div class="hh-fld"><label>Street</label><input class="hh-in" id="hh26-baddr"></div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>City</label><input class="hh-in" id="hh26-bcity"></div>' +
'<div class="hh-fld"><label>State</label><input class="hh-in" id="hh26-bstate"></div>' +
'</div>' +
'<div class="hh-fld"><label>ZIP</label><input class="hh-in" id="hh26-bzip"></div>';
}
function reviewPane() {
saveOpt();
var savedKey = M.key, h = '<div id="hh26-err"></div>';
M.cart.forEach(function (k) {
loadOpt(k);
var o = M.opt, d = M.d[k] || {};
h += '<div class="hh-rsec"><div class="hh-rhead">' + esc(o.title) + '</div>';
if (o.kind === 'yizkor') {
var rows = [];
o.nameFields.forEach(function (f, i) {
var fn = M.vals['hh26-yf' + i] || '', ln = M.vals['hh26-yl' + i] || '';
if (!fn && !ln) return;
var line = esc((fn + ' ' + ln).trim());
var hb = M.vals['hh26-yh' + i] || '';
if (hb) line += ' \u2014 ' + esc(hb);
var fa = M.vals['hh26-yfa' + i] || '', mo = M.vals['hh26-ymo' + i] || '';
var par = [fa, mo].filter(Boolean).map(esc).join(' and ');
if (par) line += ', child of ' + par;
rows.push(line);
});
h += rline(rows.length > 1 ? 'Names for the booklet' : 'Name for the booklet',
rows.join('<br>') || '\u2014');
if (M.yzDon) h += rline('Charity in their memory', '$' + M.yzDon.toLocaleString());
} else if (o.kind === 'dinner') {
var t = tierOf(o, d.tier);
h += rline('When', o.event.date);
if (t) {
if (t.amount) {
h += rline('Pricing', t.label + ' \u2014 $' + (d.pwyc || 0).toLocaleString());
} else {
var meal = (M.adults || 0) * t.adultPrice + (M.children || 0) * t.childPrice;
h += rline('Pricing', t.label + ' \u2014 $' + meal.toLocaleString());
}
}
var ex = extrasLine(d);
if (ex) h += rline('Including', ex);
if (d.spDinner)   h += rline('Sponsorship', '$' + d.spDinner);
if (d.spStudents) h += rline('Sponsor students', d.spStudents + ' \u00d7 $' + o.sponsorStudentPrice);
if (d.spTables)   h += rline('Sponsor a table', d.spTables + ' \u00d7 $' + o.sponsorTablePrice);
} else if (o.schedule) {
var picked = [];
o.schedule.forEach(function (day, di) {
day.items.forEach(function (it, ii) {
if (!it.info && d.picks && d.picks[di + '-' + ii]) {
picked.push(it.time + ' \u2014 ' + it.label + ' (' + day.date + ')');
}
});
});
h += rline('You\u2019re joining', picked.join('<br>') || '\u2014');
} else if (o.singleEvent) {
h += rline('When', o.singleEvent.date + ' \u00b7 ' + o.singleEvent.time);
} else if (o.infoEvent) {
h += rline('When', o.infoEvent.date);
}
h += '</div>';
});
if (savedKey) loadOpt(savedKey);
if (M.gift)   h += '<div class="hh-rsec"><div class="hh-rhead">High Holiday sponsorship</div>' +
rline('Amount', '$' + M.gift.toLocaleString()) + '</div>';
if (M.bfGift) h += '<div class="hh-rsec"><div class="hh-rhead">Break Fast sponsorship</div>' +
rline('Amount', '$' + M.bfGift.toLocaleString()) + '</div>';
var who = [val('hh26-af0'), val('hh26-al0')].filter(Boolean).join(' ') ||
(M.names['hh26-af0'] || '') + ' ' + (M.names['hh26-al0'] || '');
var head = [];
if (M.adults)   head.push(M.adults + (M.adults === 1 ? ' adult' : ' adults'));
if (M.children) head.push(M.children + (M.children === 1 ? ' child' : ' children'));
h += '<div class="hh-rsec"><div class="hh-rhead">Your details</div>' +
(isAttending() && head.length ? rline('Attending', head.join(' \u00b7 ')) : '') +
rline('Name', who.trim() || '\u2014') +
rline('Email', M.vals['hh26-email'] || val('hh26-email') || '\u2014') +
rline('Phone', M.vals['hh26-phone'] || val('hh26-phone') || '\u2014') + '</div>';
if ((M.total || 0) > 0) {
h += '<p class="hh-hint" style="margin-top:14px">Your card will be charged ' +
'$' + (M.total || 0).toLocaleString() + ' when you complete your ' +
'registration.</p>';
}
h += captchaSlot();
return h;
}
function captchaHost() {
var w = document.querySelector('.g-recaptcha');
if (!w) return null;
var box = w.closest('li, td, div');
return (box && box !== document.body) ? box : w;
}
function mountCaptcha() {
var host = captchaHost();
if (!host) return;
var slot = $('hh26-captcha');
if (!slot || host.parentNode === slot) return;
if (!host.getAttribute('data-hh-home')) {
var mark = document.createElement('span');
mark.id = 'hh26-captcha-home';
mark.style.display = 'none';
host.parentNode.insertBefore(mark, host);
host.setAttribute('data-hh-home', '1');
}
host.style.visibility = 'visible';
host.style.display = 'block';
slot.appendChild(host);
}
function unmountCaptcha() {
var host = document.querySelector('.g-recaptcha');
if (!host) return;
host = host.closest('[data-hh-home]') || host;
var home = $('hh26-captcha-home');
if (home && home.parentNode && host.parentNode !== home.parentNode) {
home.parentNode.insertBefore(host, home);
}
}
function captchaSlot() {
return captchaHost()
? '<div class="hh-rsec" style="border-bottom:0"><div class="hh-rhead">' +
'One last check</div><p class="hh-hint">Please confirm you\u2019re not ' +
'a robot before completing your registration.</p>' +
'<div id="hh26-captcha" class="hh-captcha"></div></div>'
: '';
}
function captchaDone() {
var f = document.getElementsByName('cdo-captcha-response')[0];
if (!captchaHost()) return true;
return !!(f && f.value);
}
function rline(k, v) {
return '<div class="hh-rrow"><span class="hh-rk">' + k + '</span>' +
'<span class="hh-rv">' + v + '</span></div>';
}
function extrasLine(d) {
var a = [];
if (d.students) a.push(d.students + ' student' + (d.students === 1 ? '' : 's'));
if (d.veg)      a.push(d.veg + ' vegetarian meal' + (d.veg === 1 ? '' : 's'));
return a.join(' \u00b7 ');
}
function peopleLine(d) {
var a = [];
if (M.adults)   a.push(M.adults + (M.adults === 1 ? ' adult' : ' adults'));
if (M.children) a.push(M.children + (M.children === 1 ? ' child' : ' children'));
if (d.students) a.push(d.students + ' student' + (d.students === 1 ? '' : 's'));
if (d.veg)      a.push(d.veg + ' vegetarian');
return a.join(' \u00b7 ') || '\u2014';
}
function notesPane() {
var open = '<text' + 'area class="hh-in" id="hh26-notes" placeholder="Optional">';
var shut = '</text' + 'area>';
return '<div id="hh26-err"></div>' +
'<p class="hh-intro">Accessibility needs, dietary questions, or anything ' +
'you\u2019d like us to know before the holidays.</p>' +
'<div class="hh-fld"><label>Notes</label>' + open + shut + '</div>';
}
function wirePane(st) {
var id = st.id, body = document.querySelector('#hh26 .hh-mbody');
wireBlurb();
if (id === 'addmore') {
body.addEventListener('click', function (e) {
var c = e.target.closest && e.target.closest('.hh-add');
if (!c) return;
captureVals(); saveOpt();
var k = c.getAttribute('data-add');
M.cart.push(k);
var steps = buildSteps();
for (var i = 0; i < steps.length; i++) {
if (steps[i].id === 'opt' && steps[i].key === k) { M.step = i; break; }
}
renderModal();
});
return;
}
if (id === 'support') {
body.addEventListener('click', function (e) {
var c = e.target.closest && e.target.closest('.hh-chip');
if (!c) return;
var wrap = c.parentNode, grp = wrap.getAttribute('data-grp');
wrap.querySelectorAll('.hh-chip').forEach(function (x) { x.className = 'hh-chip'; });
c.className = 'hh-chip on';
var amt = c.getAttribute('data-amt');
var box = $('hh26-otherwrap-' + grp);
var val_ = 0;
if (amt === 'other') {
box.style.display = 'block';
val_ = parseInt($('hh26-otheramt-' + grp).value, 10) || 0;
} else {
box.style.display = 'none';
val_ = parseInt(amt, 10);
}
if (grp === 'gen') M.gift = val_; else M.bfGift = val_;
commitSupport();
refreshTotal();
});
body.addEventListener('input', function (e) {
if (e.target.id === 'hh26-otheramt-gen') M.gift   = parseInt(e.target.value, 10) || 0;
else if (e.target.id === 'hh26-otheramt-bf') M.bfGift = parseInt(e.target.value, 10) || 0;
else return;
});
body.addEventListener('change', function (e) {
if (e.target.id !== 'hh26-otheramt-gen' && e.target.id !== 'hh26-otheramt-bf') return;
commitSupport();
refreshTotal();
});
return;
}
if (id === 'gift') {
var gchips = document.querySelector('#hh26 .hh-chips');
var paint  = function () {
var g = $('hh26-gtotal');
if (g) g.textContent = '$' + (M.gift || 0).toLocaleString();
};
if (gchips) gchips.addEventListener('click', function (e) {
var c = e.target.closest && e.target.closest('.hh-chip');
if (!c) return;
gchips.querySelectorAll('.hh-chip').forEach(function (x) { x.className = 'hh-chip'; });
c.className = 'hh-chip on';
var amt = c.getAttribute('data-amt');
if (amt === 'other') {
$('hh26-otherwrap-gift').style.display = 'block';
M.gift = parseInt($('hh26-otheramt-gift').value, 10) || 0;
} else {
$('hh26-otherwrap-gift').style.display = 'none';
M.gift = parseInt(amt, 10) || 0;
}
paint();
});
var oamt = $('hh26-otheramt-gift');
if (oamt) {
oamt.addEventListener('input', function () {
M.gift = parseInt(this.value, 10) || 0;
paint();
});
oamt.addEventListener('change', function () { refreshTotal(); });
}
paint();
return;
}
var chg = $('hh26-changecount');
if (chg) chg.addEventListener('click', function () {
captureVals(); M.showCounts = true; renderModal();
});
if (id === 'review') { mountCaptcha(); return; }
if (M.opt && (M.opt.kind === 'schedule' || M.opt.kind === 'info')) return;
if (M.opt && M.opt.kind === 'yizkor' && id === 'opt') {
wireYizkor();
return;
}
if (M.opt && M.opt.kind === 'dinner' && (id === 'opt' || id === 'dinnergift')) {
wireDinner();
return;
}
if (id === 'opt' && !M.opt.singleEvent && !M.opt.infoEvent) {
body.addEventListener('click', function (e) {
var row = e.target.closest && e.target.closest('.hh-row');
if (!row || row.className.indexOf('info') > -1) return;
var k = row.getAttribute('data-k');
M.picks[k] = !M.picks[k];
row.className = 'hh-row' + (M.picks[k] ? ' on' : '');
row.setAttribute('aria-checked', !!M.picks[k]);
});
}
if (id === 'who') {
if (!$('hh26-names')) return;
var redraw = function () {
$('hh26-names').innerHTML =
(totalAdults()   ? nameRows(totalAdults(),   'a', 'Adult') : '') +
(totalChildren() ? '<div style="height:8px"></div>' : '') +
(totalChildren() ? nameRows(totalChildren(), 'c', 'Child') : '');
spreadSurname();
};
$('hh26-names').addEventListener('input', function (e) {
var el = e.target;
if (!el.className || el.className.indexOf('hh-nm') < 0) return;
M.names[el.id] = el.value;
if (/l\d+$/.test(el.id) && el.id !== 'hh26-al0') M.lnDirty[el.id] = true;
if (el.id === 'hh26-al0') spreadSurname();
});
redraw();
}
}
function countsBlock(max) {
var firstTime = (M.cart[0] === M.key) || M.showCounts;
if (firstTime) {
return '<div id="hh26-counts"></div><div class="hh-sub">How many are coming?</div>' +
'<div class="hh-two">' +
'<div class="hh-fld"><label>Adults</label><input class="hh-in" type="number" min="0" max="' + max + '" id="hh26-adults" value="' + M.adults + '"></div>' +
'<div class="hh-fld"><label>Children</label><input class="hh-in" type="number" min="0" max="' + max + '" id="hh26-children" value="' + M.children + '"></div>' +
'</div>';
}
var who = [];
if (M.adults)   who.push(M.adults + (M.adults === 1 ? ' adult' : ' adults'));
if (M.children) who.push(M.children + (M.children === 1 ? ' child' : ' children'));
return '<div id="hh26-counts"></div><div class="hh-sub">Who\u2019s coming?</div>' +
'<div class="hh-carry">' + esc(who.join(' \u00b7 ') || 'Nobody yet') +
'<span class="hh-change" id="hh26-changecount">Change</span></div>';
}
function readCounts(max) {
if ($('hh26-adults'))   M.adults   = clamp($('hh26-adults').value, 0, max);
if ($('hh26-children')) M.children = clamp($('hh26-children').value, 0, max);
}
function blurbHTML() {
var o = M.opt;
var pic = o.image
? '<img class="hh-optimg" src="' + esc(o.image) + '" alt="">' : '';
if (!o.blurb || !o.blurb.length) return pic;
var full = o.blurb.map(function (para) {
return '<p class="hh-bpara">' + esc(para) + '</p>';
}).join('');
if (o.signoff) {
full += '<p class="hh-bsign">' + o.signoff.map(esc).join('<br>') + '</p>';
}
return pic + '<div class="hh-blurb">' +
'<div id="hh26-bshort"><span class="hh-bpara">' + esc(o.teaser || o.blurb[0]) +
'</span> <span class="hh-more" data-b="open">Show more</span></div>' +
'<div id="hh26-bfull" style="display:none">' + full +
'<span class="hh-more" data-b="close">Show less</span></div>' +
'</div>';
}
function wireBlurb() {
var b = document.querySelector('#hh26 .hh-blurb');
if (!b) return;
b.addEventListener('click', function (e) {
var t = e.target.closest && e.target.closest('.hh-more');
if (!t) return;
var open = t.getAttribute('data-b') === 'open';
$('hh26-bshort').style.display = open ? 'none' : 'block';
$('hh26-bfull').style.display  = open ? 'block' : 'none';
});
}
function refreshTotal() {
M.total = liveTotal();
var el = $('hh26-dtotal');
if (el) el.textContent = '$' + M.total.toLocaleString();
var hd = $('hh26-htotal');
if (hd) hd.textContent = '$' + M.total.toLocaleString();
var hw = $('hh26-htotalwrap');
if (hw) hw.style.visibility = (M.total > 0) ? 'visible' : 'hidden';
}
function totalAdults()   { return Math.min(M.adults   || 0, 5); }
function totalChildren() { return Math.min(M.children || 0, 5); }
function spreadSurname() {
var src = $('hh26-al0');
if (!src) return;
var surname = src.value;
M.names['hh26-al0'] = surname;
['a', 'c'].forEach(function (p) {
for (var i = 0; i < 5; i++) {
var id = 'hh26-' + p + 'l' + i;
if (id === 'hh26-al0' || M.lnDirty[id]) continue;
var el = $(id);
if (el) { el.value = surname; M.names[id] = surname; }
}
});
}
function clamp(v, lo, hi) {
v = parseInt(v, 10); if (isNaN(v)) v = lo;
return Math.max(lo, Math.min(hi, v));
}
function fail(msg) {
var e = $('hh26-err');
if (e) { e.className = 'hh-err'; e.textContent = msg; e.scrollIntoView({block:'nearest'}); }
return false;
}
function onNext() {
if (M.opt && M.opt.kind === 'info') {
if (M.opt.cta && M.opt.cta.url) {
var a = document.createElement('a');
a.href = M.opt.cta.url;
a.target = '_bl' + 'ank';
a.rel = 'noopener';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
return;
}
if (M.opt.cta && M.opt.cta.opens) {
M.cart = [M.opt.cta.opens]; M.step = 0;
loadOpt(M.cart[0]); renderModal();
} else {
closeModal();
}
return;
}
if (M.opt && M.opt.kind === 'schedule') {
M.cart = [M.opt.opensAs];
M.step = 0;
loadOpt(M.cart[0]);
renderModal();
return;
}
var steps  = buildSteps();
var st     = steps[M.step];
var isLast = M.step >= steps.length - 1;
if (M.opt && M.opt.kind === 'scheduleview') {
var to = M.opt.goTo;
M.cart = [to]; M.step = 0; M.opt = null; M.key = null;
loadOpt(to);
renderModal();
return;
}
if (st.id === 'opt') {
if (M.opt.kind === 'dinner') {
if (!M.tier) return fail('Please choose a price level.');
readCounts(5);
if (M.adults + M.children + M.students < 1)
return fail('Please tell us how many people are coming.');
commitDinner();
} else if (M.opt.kind === 'yizkor') {
if (!val('hh26-yf0') && !val('hh26-yl0'))
return fail('Please enter at least one name to be remembered.');
M.yzDon = parseInt(val('hh26-ydon'), 10) || 0;
commitYizkor();
} else if (M.opt.infoEvent) {
readCounts(9);
if (M.adults + M.children < 1)
return fail('Please tell us how many people are coming.');
commitCounts(); setDrivers();
} else if (M.opt.singleEvent) {
readCounts(5);
if (M.adults + M.children < 1)
return fail('Please tell us how many people are coming.');
commitSchedule(); commitCounts();
} else {
if (!Object.keys(M.picks).some(function (k) { return M.picks[k]; }))
return fail('Please choose at least one service.');
readCounts(5);
if (M.adults + M.children < 1)
return fail('Please tell us how many people are coming.');
commitSchedule(); commitCounts();
}
saveOpt();
}
if (st.id === 'dinnergift') commitDinnerGift();
if (st.id === 'who') {
if (!$('hh26-email').value) return fail('Please enter your email.');
if (!$('hh26-af0') || !$('hh26-af0').value) return fail('Please enter your name.');
commitWho();
}
if (st.id === 'support') commitSupport();
if (st.id === 'gift') {
if (M.gift < 1) return fail('Please choose an amount to give.');
commitGift();
}
if (st.id === 'pay') {
if (CFG.OPTIONS[M.cart[0]].donationOnly) {
if (!$('hh26-cfirst').value) return fail('Please enter your name.');
if (!$('hh26-cemail').value) return fail('Please enter your email.');
commitCharityContact();
}
if (!$('hh26-ccnum').value) return fail('Please enter your card number.');
commitPay();
}
if (st.id === 'notes') commitNotes();
if (st.id !== 'review') { captureVals(); saveOpt(); commitAll(); M.total = liveTotal(); }
if (st.id === 'review' && !captchaDone())
return fail('Please tick the box confirming you\u2019re not a robot.');
if (isLast) return submitForm();
captureVals();
M.total = liveTotal();
M.step++;
renderModal();
}
function commitCharityContact() {
var F = CFG.F;
setNative(F.firstMain, sval('hh26-cfirst'));
setNative(F.lastMain,  sval('hh26-clast'));
setNative(F.email,     sval('hh26-cemail'));
setNative(F.phone,     sval('hh26-cphone'));
}
function commitSchedule() {
if (M.opt.singleEvent) {
var ev = M.opt.singleEvent;
setChecked(ev.native, true);
if (M.opt.summary)
setNative(M.opt.summary, ev.date + '\n\u2022 ' + ev.time + ' \u2014 ' + ev.label);
setDrivers();
return;
}
var out = [];
M.opt.schedule.forEach(function (d, di) {
var picked = [];
d.items.forEach(function (it, ii) {
if (it.info) return;
var on = !!M.picks[di + '-' + ii];
if (it.adults || it.children) {
if (it.adults)   setNative(it.adults,   on ? (M.adults   || 0) : 0);
if (it.children) setNative(it.children, on ? (M.children || 0) : 0);
} else if (it.native) {
setChecked(it.native, on);
}
if (on) {
var who = '';
if (it.adults || it.children) {
var bits = [];
if (M.adults)   bits.push(M.adults + (M.adults === 1 ? ' adult' : ' adults'));
if (M.children) bits.push(M.children + (M.children === 1 ? ' child' : ' children'));
if (bits.length) who = '  (' + bits.join(', ') + ')';
}
picked.push('\u2022 ' + it.time + ' \u2014 ' + it.label + who);
}
});
if (picked.length) {
if (out.length) out.push('');
out.push(d.date);
out.push(picked.join('\n'));
}
});
setNative(M.opt.summary, out.join('\n'));
setDrivers();
}
function commitCounts() {
var F = CFG.F;
setNative(M.opt.adultsField   || F.adults,   M.adults);
setNative(M.opt.childrenField || F.children, M.children);
}
function commitWho() {
var F = CFG.F, i;
if (!$('hh26-email') && !(M.vals && M.vals['hh26-email'])) return;
setNative(F.firstMain, sval('hh26-af0'));
setNative(F.lastMain,  sval('hh26-al0'));
for (i = 1; i < 5; i++) {
setNative(F.adultFirst[i - 1], sval('hh26-af' + i));
setNative(F.adultLast[i - 1],  sval('hh26-al' + i));
}
for (i = 0; i < 5; i++) {
setNative(F.childFirst[i], sval('hh26-cf' + i));
setNative(F.childLast[i],  sval('hh26-cl' + i));
}
setNative(F.email, sval('hh26-email'));
setNative(F.phone, sval('hh26-phone'));
}
function commitSupport() {
var F = CFG.F;
var gi = CFG.GIFTS.indexOf(M.gift);
if (M.gift > 0) {
if (gi > -1) setChecked(F.sponsorRadios[gi], true);
else { setChecked(F.sponsorOther, true); setNative(F.sponsorAmt, M.gift); }
}
var t = sval('hh26-dedtype');
if (t === 'honor')  setChecked(F.dedInHonor, true);
if (t === 'memory') setChecked(F.dedInMemory, true);
var dn = sval('hh26-dednames');
if (dn) setNative(F.dedNames, dn);
setPaymentRow();
}
function setPaymentRow() {
var t = engineTotal();
if (!t) t = computedTotal();
setNative('input_77', (t > 0 || (M.gift || 0) > 0) ? 'block' : 'none');
if (CFG.F.amountPaid) {
setNative(CFG.F.amountPaid, String(Math.round((t || 0) * 100) / 100));
}
}
function commitGift() {
var F = CFG.F, idx = giftAmounts().indexOf(M.gift);
if (M.gift > 0) {
if (idx > -1) setChecked(giftRadios()[idx], true);
else { setChecked(giftOtherRadio(), true); setNative(giftOtherAmt(), M.gift); }
}
var t = sval('hh26-dedtype');
if (t === 'honor')  setChecked(F.dedInHonor, true);
if (t === 'memory') setChecked(F.dedInMemory, true);
setNative(F.dedNames, sval('hh26-dednames'));
if (M.opt.giftRow) setNative(M.opt.giftRow, M.gift > 0 ? 'block' : 'none');
if (M.opt.donationOnly) setDrivers();
}
function setDrivers() {
Object.keys(CFG.OPTIONS).forEach(function (k) {
var d = CFG.OPTIONS[k].driver;
if (d) setNative(d, inCart(k) ? 'block' : 'none');
});
}
function commitPay() {
var F = CFG.F;
setChecked(F.payCard, true);
setNative(F.ccName, sval('hh26-ccname'));
setNative(F.ccNum,  sval('hh26-ccnum'));
setNative(F.ccCvv,  sval('hh26-cccvv'));
setNative(F.ccMon,  sval('hh26-ccmon'));
setNative(F.ccYear, sval('hh26-ccyear'));
setNative(F.billAddr,   sval('hh26-baddr'));
setNative(F.billCity,   sval('hh26-bcity'));
setNative(F.billState,  sval('hh26-bstate'));
setNative(F.billPostal, sval('hh26-bzip'));
setSelect(F.billCountry, CFG.DEFAULT_COUNTRY);
}
function setSelect(id, text) {
var el = $(id);
if (!el || !el.options) return false;
var i, o;
for (i = 0; i < el.options.length; i++) {
o = el.options[i];
if (o.value === text || (o.text || '').trim() === text) {
el.selectedIndex = i;
['input', 'change', 'blur'].forEach(function (evt) {
el.dispatchEvent(new Event(evt, { bubbles: true }));
});
return true;
}
}
if (window.console) console.warn('[HH26] no option matching', text, 'in', id);
return false;
}
function commitNotes() {
var n = sval('hh26-notes');
if (n) setNative(CFG.F.notes, n);
}
function val(id) { var e = $(id); return e ? e.value : ''; }
function sval(id) {
if (M && M.vals && M.vals[id] !== undefined && M.vals[id] !== '') return M.vals[id];
var e = $(id);
return e ? e.value : '';
}
function commitAll() {
var savedKey = M.key;
saveOpt();
clearAllOptionFields();
M.cart.forEach(function (k) {
loadOpt(k);
var o = M.opt;
if (o.kind === 'dinner') { syncDinner(); commitDinner(); commitDinnerGift();
commitCounts(); }
else if (o.kind === 'yizkor') { commitYizkor(); }
else if (o.schedule)          { commitSchedule(); commitCounts(); }
else if (o.singleEvent)       { commitSchedule(); commitCounts(); }
else if (o.infoEvent)         { commitCounts(); }
});
setDrivers();
if (savedKey) loadOpt(savedKey);
commitWho();
commitSupport();
commitNotes();
setPaymentRow();
}
function watchCaptchaChallenge() {
var tries = 0;
var t = setInterval(function () {
if (++tries > 120) { clearInterval(t); return; }
var fr = document.querySelectorAll('iframe[src*="bframe"], iframe[title*="challenge"]');
for (var i = 0; i < fr.length; i++) {
var box = fr[i];
while (box.parentElement && box.parentElement !== document.body) {
box = box.parentElement;
}
if (box && box.parentElement === document.body) {
box.style.setProperty('z-index', '2147483000', 'important');
var r = fr[i].getBoundingClientRect();
if (r.width > 40 && r.height > 40) {
var ov = document.getElementById('hh26');
if (ov) ov.style.setProperty('z-index', '2147481500', 'important');
var cv = document.getElementById('hh26-cover');
if (cv) cv.style.setProperty('z-index', '2147481400', 'important');
}
}
}
}, 250);
setTimeout(function () { clearInterval(t); }, 30000);
}
function submitForm() {
commitAll();
watchCaptchaChallenge();
var btn = findSubmit();
if (!btn) { fail('Could not find the submit button — check the console.');
if (window.console) console.warn('[HH26] submit button not found'); return; }
setPaymentRow();
stashConfirmation();
LAST = null;
var nx = $('hh26-next');
if (nx) { nx.textContent = 'Processing\u2026'; nx.setAttribute('disabled', 'disabled'); }
btn.click();
setTimeout(checkValidation, 450);
setTimeout(checkValidation, 1400);
watchForCompletion();
}
function watchForCompletion() {
var tries = 0;
var t = setInterval(function () {
if (++tries > 150) { clearInterval(t); return; }
if (tries < 4) return;
if (document.getElementById('input_2')) return;
clearInterval(t);
var s = readStash();
var bg = document.getElementById('hh26-bg');
if (bg && bg.parentNode) bg.parentNode.removeChild(bg);
var old = document.getElementById('hh26');
if (old && old.parentNode) old.parentNode.removeChild(old);
showPageAgain();
if (s) { buildConfirmation(s); }
else   { window.location.reload(); }
M = null; LAST = null;
}, 400);
}
var FRIENDLY = {
input_74_addr_line1:'street address', input_74_city:'city',
input_74_state:'state', input_74_postal:'postal code',
input_74_country:'country', input_72:'email', input_73_full:'phone',
first_62:'first name', last_62:'last name',
input_61_addr_line1:'billing street', input_61_city:'billing city',
input_61_state:'billing state', input_61_postal:'billing ZIP',
input_61_country:'billing country', input_61_cc_number:'card number',
input_61_cc_ccv:'security code', input_61_cc_nameOnCard:'name on card'
};
function checkValidation() {
if (!M) return;
var bad = document.querySelectorAll('.form-validation-error');
if (!bad.length) return;
try { sessionStorage.removeItem(STASH); } catch (e) {}
var ids = [], names = [];
Array.prototype.forEach.call(bad, function (f) {
if (!f.id || ids.indexOf(f.id) > -1) return;
ids.push(f.id);
var n = FRIENDLY[f.id] || f.id;
if (names.indexOf(n) < 0) names.push(n);
});
if (window.console) console.warn('[HH26] blocked by required fields:', ids);
var nx = $('hh26-next');
if (nx) { nx.removeAttribute('disabled'); nx.textContent = 'Try again'; }
fail('We couldn\u2019t complete your registration \u2014 the form still needs: ' +
names.join(', ') + '.');
}
var STASH = 'hh26_confirm';
function stashConfirmation() {
saveOpt();
var sections = M.cart.map(function (k) {
var o = CFG.OPTIONS[k], d = M.d[k] || {}, groups = [];
if (o.infoEvent) {
groups.push({ date:o.infoEvent.date, items:o.infoEvent.items.slice() });
} else if (o.kind === 'dinner') {
groups.push({ date:o.event.date, items:o.event.items.slice() });
} else if (o.singleEvent) {
groups.push({ date:o.singleEvent.date,
items:[{ time:o.singleEvent.time, label:o.singleEvent.label }] });
} else if (o.schedule) {
o.schedule.forEach(function (day, di) {
var picked = [];
day.items.forEach(function (it, ii) {
if (!it.info && d.picks && d.picks[di + '-' + ii]) {
picked.push({ time: it.time, label: it.label });
}
});
if (picked.length) groups.push({ date: day.date, items: picked });
});
}
var att = NON_ATTENDING.indexOf(k) < 0;
var rows = [];
if (o.kind === 'yizkor') {
o.nameFields.forEach(function (f, i) {
var fn = sval('hh26-yf' + i), ln = sval('hh26-yl' + i);
if (!fn && !ln) return;
var line = (fn + ' ' + ln).trim();
var hb = sval('hh26-yh' + i);
if (hb) line += ' \u2014 ' + hb;
var fa = sval('hh26-yfa' + i), mo = sval('hh26-ymo' + i);
var par = [fa, mo].filter(Boolean).join(' and ');
if (par) line += ', child of ' + par;
rows.push(line);
});
}
return { title:o.title, groups:groups, names:rows,
adults: att ? (M.adults || 0) : 0,
children: att ? (M.children || 0) : 0,
students:d.students || 0, veg:d.veg || 0 };
});
var t = val('hh26-dedtype');
try {
sessionStorage.setItem(STASH, JSON.stringify({
t: Date.now(),
u: location.href,
donationOnly: !!CFG.OPTIONS[M.cart[0]].donationOnly,
title: sections.map(function (x) { return x.title; }).join(' + '),
first: M.names['hh26-af0'] || sval('hh26-cfirst') || '',
sections: sections,
gift: (M.gift || 0) + (M.bfGift || 0),
total: M.total || 0,
dedType: t === 'honor' ? 'In honor of' : (t === 'memory' ? 'In memory of' : ''),
dedNames: val('hh26-dednames')
}));
} catch (e) {}
}
function readStash() {
try {
var s = JSON.parse(sessionStorage.getItem(STASH) || 'null');
if (!s || (Date.now() - s.t) > 1800000) return null;
return s;
} catch (e) { return null; }
}
function buildConfirmation(s) {
var wrap = document.createElement('div');
wrap.id = 'hh26';
wrap.className = 'hh-confmode';
var body = '';
(s.sections || []).forEach(function (sec) {
body += '<div class="hh-sub">' + esc(sec.title) + '</div>';
body += (sec.groups || []).map(function (g) {
return '<div class="hh-cday">' + esc(g.date) + '</div>' +
g.items.map(function (l) {
return '<div class="hh-crow"><span class="hh-ctime">' + esc(l.time) + '</span>' +
'<span class="hh-clab">' + esc(l.label) + '</span></div>';
}).join('');
}).join('');
if (sec.names && sec.names.length) {
body += '<p class="hh-hint" style="margin:6px 0 0">' +
sec.names.map(esc).join('<br>') + '</p>';
}
var who = [];
if (sec.adults)   who.push(sec.adults + (sec.adults === 1 ? ' adult' : ' adults'));
if (sec.children) who.push(sec.children + (sec.children === 1 ? ' child' : ' children'));
if (sec.students) who.push(sec.students + (sec.students === 1 ? ' student' : ' students'));
if (sec.veg)      who.push(sec.veg + ' vegetarian');
if (who.length) body += '<p class="hh-hint" style="margin-top:8px">' +
who.join(' · ') + '</p>';
});
var money = s.total > 0
? '<div class="hh-total"><span>Total charged</span><b>$' +
Number(s.total).toLocaleString() + '</b></div>' +
(s.dedNames ? '<p class="hh-hint" style="margin-top:9px">' +
esc(s.dedType) + ' ' + esc(s.dedNames) + '</p>' : '') +
'<p class="hh-hint">A receipt is on its way to your inbox.</p>'
: '<p class="hh-hint" style="margin-top:16px">A confirmation is on its way to your inbox.</p>';
wrap.innerHTML =
'<div class="hh-conf"><div class="hh-modal">' +
'<div class="hh-mhead">' +
'<div class="hh-mtitle">' +
(s.first ? 'Thank you, ' + esc(s.first) + '.' : 'Thank you.') + '</div>' +
'<div class="hh-mstep">' + esc(s.title) + ' · Confirmed</div>' +
'</div>' +
'<div class="hh-mbody">' +
'<p class="hh-intro">' + (s.donationOnly
? 'Your gift has been received. Thank you.'
: 'You\u2019re signed up. Here\u2019s what we have:') + '</p>' +
body + money +
'</div>' +
'<div class="hh-mfoot"><div class="hh-nextwrap">' +
'<span class="hh-next" id="hh26-done">Done</span></div></div>' +
'</div></div>';
document.body.appendChild(wrap);
document.documentElement.style.overflow = 'hidden';
try { sessionStorage.removeItem(STASH); } catch (e) {}
$('hh26-done').addEventListener('click', function () {
var url = CFG.RETURN_URL ||
(window.location.protocol + '//' + window.location.host + '/' + CFG.AID);
window.location.replace(url + (url.indexOf('?') > -1 ? '&' : '?') + 'r=' + Date.now());
});
}
function toast(msg) {
var old = $('hh26-toast');
if (old) old.parentNode.removeChild(old);
var el = document.createElement('div');
el.id = 'hh26-toast'; el.className = 'hh-toast'; el.textContent = msg;
document.getElementById('hh26').appendChild(el);
setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 2400);
}
})();
