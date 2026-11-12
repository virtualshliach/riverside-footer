/* CHANUKAH FESTIVAL 2026 - Chabad Jewish Community Center, Riverside
   Custom template for the festival mini-site home page.
   Loaded by footer.js (see PAGES there). Two copies of this file:
     chanukah-2026-draft.js -> draft page 7553387 (make and review changes here)
     chanukah-2026.js       -> live page 4949424 + chanukahfestival.org (everyone)
   Publish the draft with: node tools/publish-chanukah.js (copies it, switching only AID and BRAND_HOSTS). */
(function () {
  'use strict';

  var VERSION = 'cf26-2026-11-12b-draft';
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
    /* Page id: 4949424 in chanukah-2026.js (live), 7553387 in chanukah-2026-draft.js. Set by tools/publish-chanukah.js. */
    AID: '4949424',
    BRAND_HOSTS: ['chanukahfestival.org', '12899.centers.clhosting.org'],

    edition: '22',
    editionSuffix: 'nd',
    host: 'Chabad Jewish Community Center of Riverside',
    hostUrl: 'https://www.jewishriverside.com',

    event: {
      dayLine: 'Mon. Dec 7, 2026',
      timeLine: '6–8\u00a0PM',
      nightLine: '4th Night of Chanukah',
      venue: 'Riverside Historic Courthouse',
      street: '4050 Main St.',
      cityLine: 'Riverside, CA 92501',
      startUTC: '2026-12-08T02:00:00Z',   /* 6:00 PM Pacific */
      endUTC: '2026-12-08T04:00:00Z',     /* 8:00 PM Pacific */
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1650.922122861743!2d-117.37630892354346!3d33.979049862680604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcb1ef11d6ca15%3A0x1079ea5e9dfa9f66!2s4050%20Main%20St%2C%20Riverside%2C%20CA%2092501!5e0!3m2!1sen!2sus!4v1635794908873!5m2!1sen!2sus',
      mapQuery: 'Riverside Historic Courthouse, 4050 Main St, Riverside, CA 92501'
    },

    /* Photos from past festivals; files live next to this one in the repo. */
    highlights: [
      { img: 'hl-menorah.jpg', title: 'Grand Menorah Lighting', text: 'Riverside\u2019s handcrafted 10-foot Grand Menorah, lit on the courthouse steps.' },
      { img: 'hl-food.jpg',    title: 'Traditional Food',       text: 'Hot latkes, jelly donuts and Chanukah treats for everyone.' },
      { img: 'hl-music-aaron.jpg', title: 'Live Music',             text: 'Aaron Holder, a Jewish pop-folk singer with a reggae edge, live on the Main Stage.' },
      { img: 'hl-performer.jpg', title: 'Fun for the Whole Family', text: 'Street performers, kids\u2019 crafts, train rides and activities for all ages.' }
    ],
    /* ASL note under the Schedule in Event details (moved from the pill, Nov 11). */
    aslNote: { lead: 'ASL interpretation.', text: 'An ASL interpreter will be on stage and shown on the big screens during the official program.' },

    /* Exactly five rows (brief Nov 5). */
    SCHEDULE: [
      ['5:45 PM', 'Come early! The first 300 guests get a free Chanukah gift'],
      ['6:00 PM', 'Festival opens with food, music, kids’ activities and more'],
      ['7:00 PM', 'Official program with the Grand Menorah Lighting', true],
      ['7:45 PM', 'Children’s Gelt Drop'],
      ['8:00 PM', 'Festival ends']
    ],

    /* Festival map v15 (approved Nov 5). Files live next to this one in the repo.
       KEY mirrors the printed 4x6 card back. Never place anything by the restrooms. */
    MAP: {
      web: 'festival-map-2026-web.jpg',
      full: 'festival-map-2026.png',
      pdf: 'festival-map-2026.pdf',
      alt: 'Visitor map of Chanukah Festival 2026 at the Riverside Historic Courthouse on Main Street between 10th and 11th, Dec 7, 6–8 PM, with numbered booths including #15 Menorah Contest and #16 Gelt Drop.',
      KEY: [
        { group: 'Stage {amp} Show', color: '#c8102e', items: [
          [1, 'Upper Stage {amp} Dais', 'Top of the courthouse steps'],
          [2, 'Main Stage', 'Live music'] ] },
        { group: 'Kids', color: '#00857c', items: [
          [3, 'Kids Crafts', 'Two craft areas'],
          [4, 'Face Painting', ''],
          [5, 'Balloon Twisting', ''],
          [6, 'Dreidel Guessing', 'Win $180! Winner announced after the festival on social media and email'],
          [7, 'Train Rides', ''],
          [15, 'Menorah Contest', 'All entries on display. Winners announced after the festival on social media and email'],
          [16, 'Children’s Gelt Drop', '7:45 PM on the left lawn'] ] },
        { group: 'Food {amp} Shopping', color: '#e0661b', items: [
          [8, 'Food', 'Potato latkes, chicken soup, sufganiyot, hot cocoa and tea. All food is kosher'],
          [9, 'Gift Shop', ''],
          [10, 'Cocktail Tables', 'High-tops at each end'],
          [17, 'Food Truck', ''] ] },
        { group: 'Photo Spots', color: '#2a5ea8', items: [
          [11, 'Fire Truck', 'On 10th St.'],
          [12, 'Police Mustang', 'Riverside’s display Mustang cruiser'],
          [13, 'Inflatable Menorah', 'Left lawn'],
          [14, 'Inflatable Dreidel', 'Right lawn'],
          [18, 'Grand Menorah', 'Photos 6–7 PM and after the menorah lighting'] ] }
      ],
      ROAMING: 'LED Robot · Dreidel Mascot · Stilt Walker · Juggler'
    },

    /* Menorah Contest (new this year). Form: aid 7606745 (hidden page). */
    CONTEST: {
      url: 'https://www.jewishriverside.com/7606745',
      intro: 'Kids, teens and adults: build a unique menorah at home and bring it to the festival on Dec 7. Free to enter. The best menorah wins the festival trophy, and every child who enters gets a Chanukah gift!',
      facts: ['Register By Dec 4', 'Drop Off 5:45–6:15 PM at table #15', 'Winners Announced After the Festival'],
      how: [
        'Register By Friday, Dec 4.',
        'Build your menorah at home, following the rules below.',
        'Drop it off between 5:45 and 6:15 PM at the Menorah Contest table (#15 on the festival map). Please go straight there.',
        'Menorahs stay on display at table #15 during the festival.',
        'Judging is on visual impact, creativity and craftsmanship, with the builder’s age in mind.',
        'We’ll announce the winners after the festival on our social media and by email. Please pick up your menorah before you leave the festival.'
      ],
      prizes: [
        'Best Menorah wins the festival trophy, awarded every year.',
        'Great prizes for the runners-up, announced after the festival.',
        'Every child who enters gets a Chanukah gift.'
      ],
      rules: [
        'Open to all ages, in two groups: 12 and under, and 13 and up.',
        'Nine branches, including the shamash.',
        'Eight branches in a straight line at an even height; the shamash higher or lower.',
        'No food.',
        'Bring a wax candle or oil.',
        'It must stand on its own and not break, fall or melt when lit.',
        'One entry per person. Kids are the main builders of their menorah (adult help for safety is OK).'
      ]
    },

    /* Train Rides (new this year). Stop #7 is already on the festival map.
       Copy is generic: the train is on the draft map and a vendor invoice is on file,
       but public claims like "free" are left out until Shmuel confirms them. */
    TRAIN: {
      title: 'Train Rides',
      intro: 'All aboard! Kids and families can ride the festival train all evening. Find it at stop #7 on the map.',
      facts: ['Stop #7 on the Map', '6–8 PM'],
      /* Gelt Drop is map #16. The 7:45–8 PM window is on the schedule; contest winners are announced after the festival (Nov 12). */
      gelt: {
        title: 'Gelt Drop',
        intro: 'The grand finale! Watch chocolate gelt and gifts parachute down from the sky.',
        facts: ['7:45–8 PM', '#16 on the Map']
      }
    },

    about: [
      'The festival has grown into one of the premier holiday celebrations in the Inland Empire, sharing Chanukah\u2019s universal message, embracing cultural diversity, and promoting understanding. Each year, the festival is graced by the participation of many elected officials and civic leaders. It is a meaningful evening not only for the Jewish community but for the community at large.'
    ],
    stats: [
      { big: '22nd', small: 'year of light in Riverside' },
      { big: '10 Ft', small: 'Handcrafted Grand Menorah' },
      { big: '3,000', small: 'people join us!' }
    ],

    america250: {
      title: 'Why this year shines brighter',
      body: 'In 1790, George Washington wrote that the government of the United States "gives to bigotry no sanction, to persecution no assistance." In 1979, President Carter joined the first National Menorah lighting at the White House, and today public menorahs light up cities across the country and around the world. Two hundred fifty years later, that promise shines brighter than ever. For the 22nd year, it shines in Riverside, at the Historic Courthouse, a symbol of the justice and liberty that make it possible.',
      photos: [
        {
          src: 'https://virtualshliach.github.io/riverside-footer/assets/chanukah-2026/n7-national-img3646-v7.jpg',
          caption: 'National Menorah, Washington, DC',
          credit: 'Photo: National Menorah',
          alt: 'The National Menorah at night on the Ellipse, with the White House lit in the background'
        },
        {
          src: 'https://virtualshliach.github.io/riverside-footer/assets/chanukah-2026/r4-reference-courthouse-v7.jpg',
          caption: 'Riverside Historic Courthouse',
          alt: 'The whole Riverside Historic Courthouse at night, with the festival menorah on the steps, a crowd in front, and white ESH orchestra stands',
          featured: true
        }
      ]
    },

    /* ---- Community partners shown on the page ---- */
    PARTNERS_INTRO: 'Thank you to our partners for making this celebration possible.',
    /* Order per brief (Nov 5). County grants are credited to the district office, not the official.
       Logos are the white versions from the 2026 flyer. h = display height in px, so square and
       wide logos look the same visual size. Tiles show logos only when every partner has one. */
    PARTNERS: [
      { name: 'Chabad at UCR', logo: 'partner-chabad-ucr.png', h: 74 },
      { name: 'Blumenthal {amp} Moore', sub: 'A Professional Law Corporation', logo: 'partner-blumenthal-moore.png', h: 62 },
      { name: 'Riverside County District 2', sub: 'Supervisor Karen Spiegel', logo: 'partner-district2-spiegel.png', h: 40 },
      { name: 'City of Riverside', logo: 'partner-city-riverside.png', h: 74 },
      { name: 'Riverside Downtown Partnership', logo: 'partner-rdp.png', h: 46 },
      { name: 'Riverside County District 1', sub: 'Supervisor Jose Medina', logo: 'partner-district1-medina.png', h: 38 }
    ],
    /* Extra names for the gold thank-you ticker only (not the partner logo grid, which is laid out 3 + 3). */
    TICKER_EXTRA: [
      { name: 'Jewish Federation of the Desert' }
    ],
    ORGANIZER: {
      logo: 'chabad-jcc-logo-white-gold.png',
      caption: 'Founded and organized by Chabad Jewish Community Center of Riverside, celebrating with our community since 2005.'
    },
    /* Who we are card. Mission from the JewishRiverside.com About page (aid 5201495). */
    WHO: {
      mission: 'Simply put, our mission is to reach out to others with acts of goodness and kindness. From university students and families to individuals just passing through, we are here for you and warmly welcome everyone.',
      explore: 'https://www.jewishriverside.com/5201495',
      /* the homepage's first slide: Join Our Mailing List (free challah to your doorstep) */
      mailingList: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5333083/jewish/Join-Our-Mailing-List.htm'
    },

    /* In the News. FRONT is the featured front page (image in this repo).
       NEWS cards show a newspaper-style nameplate, newest first. badge is optional. */
    NEWS_FRONT: {
      outlet: 'The Press-Enterprise', kicker: 'Front page', date: 'Tuesday, Dec 20, 2022',
      title: 'Hanukkah Fests Light Up Inland Empire',
      blurb: 'The 18th annual festival led the front page: lights aglow downtown, a Hasidic band, potato latkes and what was billed as the Inland Empire\u2019s largest menorah.',
      url: 'https://www.pressenterprise.com/2022/12/19/18th-chanukah-festival-celebrated-in-riverside/',
      img: 'news-pe-front-2022.jpg',
      alt: 'Front page of The Press-Enterprise, Tuesday, Dec 20, 2022, with the headline Hanukkah fests light up Inland Empire and a photo of musicians performing at the menorah lighting at the Riverside Historic Courthouse'
    },
    NEWS: [
      { outlet: 'The Press-Enterprise', date: 'Dec 15, 2025',
        title: 'Riverside Joins Together for 21st Annual Chanukah Festival',
        blurb: 'The festival went ahead despite attacks on the Jewish community that week, with a fire show, cookie decorating and the menorah lighting.',
        url: 'https://www.pressenterprise.com/2025/12/15/riverside-joins-together-for-21st-annual-chanukah-festival/' },
      { outlet: 'Riverside County District 2', date: 'Dec 22, 2025',
        title: 'Chanukah Festival Celebrated at Riverside Historic Courthouse',
        blurb: 'Supervisor Spiegel\u2019s office recaps the festival: families downtown for the menorah lighting, music and activities, with photos.',
        url: 'https://rivcodistrict2.org/node/11701' },
      { outlet: 'The Press-Enterprise', date: 'Dec 15, 2025',
        title: 'Inland Empire Hanukkah Events Continue, Despite Local and Global Violence',
        blurb: 'Jewish leaders across the region, Rabbi Shmuel Fuss among them, vowed to keep celebrating as police stepped up patrols.',
        url: 'https://www.pressenterprise.com/2025/12/15/inland-empire-hanukkah-events-continue-despite-local-and-global-violence/' },
      { outlet: 'The Sun', date: 'Dec 2023',
        title: 'Chanukah Festival lights up the night',
        blurb: 'Hundreds gathered at the Historic Courthouse for the 19th festival: food, music, activities and the lighting of the region\u2019s largest menorah.',
        url: 'https://edition.pagesuite.com/tribune/article_popover.aspx?guid=0ffd624c-e628-4eb1-914f-7bef6adef1e9' },
      { outlet: 'The Press-Enterprise', date: 'Dec 31, 2024',
        title: 'Riverside Celebrates 20th Annual Chanukah Festival in Downtown',
        blurb: 'Light, music and traditional foods on the sixth night of Chanukah, in photos.',
        url: 'https://www.pressenterprise.com/2024/12/31/riverside-celebrates-20th-annual-chanukah-festival-in-downtown/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 12, 2023',
        title: 'Riverside\u2019s 19th Annual Chanukah Festival Lights Up the Night',
        blurb: 'The region\u2019s largest menorah, plus food, music and dancing at the Historic Courthouse. It led the Local News section.',
        url: 'https://www.pressenterprise.com/2023/12/12/riversides-19th-annual-chanukah-festival-lights-up-the-night/', badge: 'Local front page' },
      { outlet: 'Raincross Gazette', date: 'Nov 30, 2023',
        title: '19th Annual Chanukah Festival to light up Riverside Historic Courthouse',
        blurb: 'A preview of the courthouse-steps celebration and its message of unity, noting record turnout the year before.',
        url: 'https://www.raincrossgazette.com/19th-annual-chanukah-festival-to-light-up-riverside-historic-courthouse' },
      { outlet: 'The Press-Enterprise', date: 'Dec 7, 2023',
        title: 'Local Jewish Communities Look for Hanukkah to Bring Light in a Time of Darkness',
        blurb: 'Rabbi Shmuel Fuss on why more Jews were celebrating with confidence, and why that year\u2019s festival would emphasize light and joy.',
        url: 'https://www.pressenterprise.com/2023/12/07/local-jewish-communities-look-for-hanukkah-to-bring-light-in-a-time-of-darkness/' },
      { outlet: 'Riverside County District 2', date: 'Dec 13, 2023',
        title: '19th Annual Chanukah Festival and the Menorah Lighting',
        blurb: 'Supervisor Spiegel joins the community for the menorah lighting before the courthouse.',
        url: 'https://rivcodistrict2.org/node/3936' },
      { outlet: 'The Press-Enterprise', date: 'Dec 15, 2022',
        title: 'Riverside\u2019s Jewish Community Center Youths Build Menorahs',
        blurb: 'Kids built their own menorahs at a pre-Chanukah workshop with The Home Depot in Moreno Valley.',
        url: 'https://www.pressenterprise.com/2022/12/15/jewish-community-center-youths-build-menorahs/' },
      { outlet: 'MyNewsLA', date: 'Nov 28, 2022',
        title: 'Grand Menorah Lighting, Dancing, Food, Other Fun Set for Hanukkah Festival',
        blurb: 'A preview of the 18th festival at the downtown courthouse: a large menorah lighting, live music, dancing and food.',
        url: 'https://mynewsla.com/riverside/2022/11/28/grand-menorah-lighting-dancing-food-other-fun-set-for-hanukkah-festival/' },
      { outlet: 'The Press-Enterprise', date: 'Nov 29, 2021',
        title: 'Riverside Menorah Lighting Festival Marks Hanukkah',
        blurb: 'Rabbi Shmuel Fuss speaks before the menorah lighting at the Historic Courthouse.',
        url: 'https://www.pressenterprise.com/2021/11/29/riverside-menorah-lighting-festival-marks-hanukkah/' },
      { outlet: 'MyNewsLA', date: 'Nov 29, 2021',
        title: 'Chanukah Festival Held in Riverside',
        blurb: 'The community gathered at the Historic Courthouse for the menorah lighting, music, dancing and more.',
        url: 'https://mynewsla.com/riverside/2021/11/29/chanukah-festival-held-in-riverside/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 24, 2020',
        title: 'Inland Religious, Cultural Holiday Traditions Press On Despite Coronavirus',
        blurb: 'Families came together for the 16th annual festival in a year shaped by the pandemic.',
        url: 'https://www.pressenterprise.com/2020/12/24/inland-religious-cultural-holiday-traditions-press-on-despite-coronavirus/' },
      { outlet: 'NBC Los Angeles', date: 'Dec 2020',
        title: 'Riverside\u2019s Annual Hanukkah Festival to Go Mobile Amid COVID-19 Restrictions',
        blurb: 'How the festival kept the lights on during the pandemic with a drive-in celebration.',
        url: 'https://www.nbclosangeles.com/holidays/riversides-annual-hanukkah-festival-to-go-mobile-amid-covid-19-restrictions/2481846/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 20, 2019',
        title: 'Riverside\u2019s Annual Hanukkah Celebration Set for Monday at Courthouse',
        blurb: 'More than 2,000 people were expected in front of the Historic Courthouse for the 15th festival.',
        url: 'https://www.pressenterprise.com/2019/12/20/riversides-annual-hanukkah-celebration-set-for-monday-at-courthouse/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 3, 2018',
        title: 'Riverside Lights Inland Empire\u2019s Largest Menorah to Celebrate Hanukkah',
        blurb: 'Mayor Rusty Bailey and Rabbi Shmuel Fuss light the region\u2019s largest menorah at the 14th festival.',
        url: 'https://www.pressenterprise.com/2018/12/03/riverside-lights-inland-empires-largest-menorah-to-celebrate-hanukkah/' },
      { outlet: 'KESQ News', date: 'Dec 5, 2010',
        title: 'Nine-Foot Menorah Kicks Off Afternoon Hanukkah Festival',
        blurb: 'A 9-foot menorah, food and music at the sixth annual festival.',
        url: 'https://kesq.com/news/2010/12/05/nine-foot-menorah-kicks-off-afternoon-hanukkah-festival/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 8, 2015',
        title: 'Hanukkah Festivalgoers Defiant Against Terrorists',
        blurb: 'More than 300 people filled Main Street in front of the courthouse. \u201cTerrorism will not make us run away and hide,\u201d Rabbi Fuss said.',
        url: 'https://www.pressenterprise.com/2015/12/08/hanukkah-festivalgoers-defiant-against-terrorists/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 12, 2013',
        title: 'Riverside Hanukkah Festival Draws Diverse Crowd',
        blurb: 'A diverse crowd filled the courthouse steps for the ninth festival as Mayor Rusty Bailey lit the center candle.',
        url: 'https://www.pressenterprise.com/2013/12/12/riverside-hanukkah-festival-draws-diverse-crowd/' },
      { outlet: 'The Press-Enterprise', date: 'Dec 28, 2011',
        title: 'City Celebrates Hanukkah With a Festival',
        blurb: 'Riverside celebrates the holiday downtown with the Chabad Jewish Community Center.',
        url: 'https://www.pressenterprise.com/2011/12/28/riverside-city-celebrates-hanukkah-with-a-festival/' }
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
          text: 'Gelt, special prayers, holiday foods and sharing the light.',
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

        { title: 'Dreidel, Latkes and Donuts', img: 'g-dreidel.jpg',
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
      { n: 1, day: 'Fri', date: 'Dec 4', note: 'Before Shabbat' },
      { n: 2, day: 'Sat', date: 'Dec 5', note: 'After Shabbat' },
      { n: 3, day: 'Sun', date: 'Dec 6', note: '' },
      { n: 4, day: 'Mon', date: 'Dec 7', note: 'Festival!', star: true },
      { n: 5, day: 'Tue', date: 'Dec 8', note: '' },
      { n: 6, day: 'Wed', date: 'Dec 9', note: '' },
      { n: 7, day: 'Thu', date: 'Dec 10', note: '' },
      { n: 8, day: 'Fri', date: 'Dec 11', note: 'Before Shabbat' }
    ],
    NIGHTS_NOTE: 'Chanukah 2026 begins Friday evening, December 4, and ends at nightfall on Saturday, December 12.',

    SHARE: {
      /* every share points at the public address; tags added per button (see shareUrl) */
      url: 'https://chanukahfestival.org/',
      /* line breaks make it readable in texts, WhatsApp and email */
      text: 'Join us at Riverside\u2019s 22nd Annual Chanukah Festival!\n\n\ud83d\udcc5 Monday, Dec 7, 6–8 PM\n\ud83d\udccd Riverside Historic Courthouse\n\nGrand Menorah Lighting, live music, latkes, donuts and kids\u2019 activities. Free for everyone.\n\nCome early: the first 300 guests get a free Chanukah gift!',
      emailSubject: 'You\u2019re invited: Riverside Chanukah Festival, Dec 7',
      emailEnd: 'Hope to see you there!',
      /* the festival's own social pages (not Jewish Riverside's or the shul's) */
      facebook: 'https://www.facebook.com/chanukahfestival/',
      instagram: 'https://www.instagram.com/chanukahfestival/',
      igHandle: '@chanukahfestival',
      /* paste the Facebook event link here once it exists; Follow on Facebook then goes to the event */
      facebookEvent: 'https://www.facebook.com/events/1651125113077350/'
    },

    /* Looping highlight video behind the title. Files live next to this one in the repo. */
    HERO: { video: 'festival-hero.mp4', poster: 'festival-hero-poster.jpg' },

    /* 2026 flyer (Drive: Print/Chanukah-2026-Flyer-Updated WORKING District 1 WHITE.pdf, Nov 4):
       new Chabad at UCR logo and the Jose Medina (County District 1) logo. */
    FLYER: 'flyer-2026.pdf',
    FLYER_THUMB: 'flyer-2026-thumb.jpg',
    /* Share kit under the invite buttons: pictures people can post or send.
       file = full size, thumb = small preview, name = the downloaded file's name. */
    KIT: [
      { title: 'Flyer', note: 'Print it, post it or email it.', thumb: 'flyer-2026-thumb.jpg',
        file: 'flyer-2026.jpg', name: 'Chanukah-Festival-2026-Flyer.jpg', pdf: 'flyer-2026.pdf' },
      { title: 'Phone Story', note: 'For WhatsApp status and Instagram or Facebook stories.', thumb: 'share-story-2026-thumb.jpg',
        file: 'share-story-2026.jpg', name: 'Chanukah-Festival-2026-Story.jpg' },
      { title: 'Square Post', note: 'For a Facebook or Instagram post, or a group chat.', thumb: 'share-square-2026-thumb.jpg',
        file: 'share-square-2026.jpg', name: 'Chanukah-Festival-2026-Post.jpg' }
    ],
    /* full address: the festival also runs on its own ChabadOne site (chanukahfestival.org) */
    DONATE_URL: 'https://www.jewishriverside.com/article.asp?aid=4194665',
    /* Donate with Stripe (stripe-donate.js): our own pop-up, gifts go to Stripe, the Google Sheet
       and our own receipt email, not through ChabadOne. Falls back to the ChabadOne pop-up below
       while stripe-donate.js has no keys filled in. false = always use the ChabadOne pop-up. */
    STRIPE_DONATE: true,
    /* Our own Menorah Contest and Mailing List forms (festival-forms.js): entries go to the Google
       Sheet, not ChabadOne. Falls back to the ChabadOne form pop-up if the file can't load.
       false = always use the ChabadOne forms. */
    OWN_FORMS: true,
    VOLUNTEER_URL: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/2759014/jewish/Chanukah-Festival-Volunteer.htm',
    /* where ?guess goes if our forms can't load */
    GUESS_URL: 'https://www.chanukahfestival.org/templates/articlecco_cdo/aid/5738793/jewish/Dreidel-Guessing-Contest.htm',
    /* jewishriverside.com forms that open in the festival's own pop-up (an iframe showing just the
       form, styled by embed.js). Everything is submitted and recorded on jewishriverside.com.
       match: any link on this page to that form opens the pop-up instead. */
    FORM_POPS: {
      donate: { aid: '4194665', title: 'Support the Chanukah Festival', sub: 'Your gift keeps the festival free for the whole community.',
        url: 'https://www.chanukahfestival.org/templates/articlecco_cdo/aid/4194665/jewish/Donate.htm' },
      contest: { aid: '7606745', title: 'Menorah Contest', sub: 'All ages. Free to enter. Register By Dec 4.',
        url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/7606745/jewish/Menorah-Contest-2026.htm' },
      mailing: { aid: '5333083', title: 'Join Our Mailing List', sub: 'Hear about the festival and everything else at Chabad.',
        url: 'https://www.jewishriverside.com/templates/articlecco_cdo/aid/5333083/jewish/Join-Our-Mailing-List.htm' }
    },

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
      'The festival draws a big crowd, so the closest spaces fill first.'
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
    left: 'M15 5l-7 7 7 7',
    right: 'M9 5l7 7-7 7',
    dl: 'M12 3v12M7 10l5 5 5-5M5 21h14',
    wa: 'M4 20l1.4-4.2A8 8 0 1 1 8.3 18.7zM9 9.5c.3 2 2.2 4 4.5 4.6l1-1.1 2 .8-.4 1.6c-3.7.2-7.6-3.6-7.4-7.3l1.6-.4.8 2z',
    chat: 'M4 5h16v11H9l-5 4z',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'
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
  var NAVY = '#0f2730', DEEP = '#0b1f27', PANEL = '#133442', TEAL = '#3cc7b4',
      GREEN = '#4cbd9f', GOLD = '#e9b949', INK = '#e9f1f3', MUTED = '#c9d6da';
  var DISP = '"Arvo","Rockwell","Roboto Slab",Georgia,serif';
  var SCRIPT = '"Kaushan Script","Brush Script MT",cursive';
  var BODY = '"Montserrat","Helvetica Neue",Arial,sans-serif';
  var GRAD = 'linear-gradient(90deg,' + TEAL + ' 0%,' + GREEN + ' 52%,' + GOLD + ' 100%)';

  function css() {
    return [
      'html.cf26-on .cco_templateless_template,html.cf26-on .page-tools-sidebar,html.cf26-on #BodyContainer,html.cf26-on [id^="BodyContainer"]{display:none !important}',
      /* the native page holds the donation form: park it off-screen, never display:none */
      'html.cf26-on .cco_templatelates_content{position:absolute !important;left:-10000px !important;top:0 !important;width:760px !important}',
      /* the ChabadOne templates set the root font to 10px; this page is designed on the standard 16px */
      'html.cf26-on{font-size:16px !important}',
      /* on the festival's own site the homepage uses the full site template: hide its header, content and footer (no forms there) */
      'html.cf26-home #PrintCreditHeader,html.cf26-home #header,html.cf26-home #content,html.cf26-home #footer{display:none !important}',
      /* chanukahfestival.org still draws the old ChabadOne page after #cf26: #chabad_body_page (old nav and banner) and #BodyContainer_1.
         Hide that leftover chrome so the page ends at the new footer. #cf26 is a sibling, not inside these wrappers.
         Forms and the ?guess pop-up mount on #cf26 or document.body, not inside the old page. */
      'html.cf26-on #chabad_body_page,html.cf26-on #chabad_head,html.cf26-on #chabad_main_content,html.cf26-on #chabad_body_content{display:none !important}',
      '#cf26 h1,#cf26 h2,#cf26 h3,#cf26 summary,#cf26 .cf-mc h3{text-wrap:balance}',
      'html.cf26-on,html.cf26-on body{background:' + NAVY + ' !important;margin:0}',
      '#cf26{background:' + NAVY + ';color:' + INK + ';font-family:' + BODY + ';font-size:17px;line-height:1.6;text-align:left;-webkit-font-smoothing:antialiased;overflow-x:hidden}',
      '#cf26 *{box-sizing:border-box}',
      '#cf26 h1,#cf26 h2,#cf26 h3,#cf26 p{margin:0;padding:0}',
      '#cf26 a{color:inherit}',
      '#cf26 button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}',
      '#cf26 img{max-width:100%;display:block}',
      '#cf26 .cf-ic{width:1.15em;height:1.15em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}',
      '#cf26 :focus-visible{outline:2px solid ' + GOLD + ';outline-offset:3px}',
      '#cf26 .cf-wrap{max-width:1140px;margin:0 auto;padding:0 20px}',
      '#cf26 .cf-sec{padding:84px 0}',
      '#cf26 .cf-alt{background:' + DEEP + '}',
      /* even section spacing (Nov 11): two same-color sections in a row share one gap, not two */
      '#cf26 .cf-alt + .cf-alt,#cf26 .cf-alt + .cf-spons,#cf26 .cf-spons + .cf-alt{padding-top:0}',
      '#cf26 #cf-activities .cf-wrap > .cf-hl:first-child{margin-top:0}',
      '#cf26 .cf-kicker{font-size:.74rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:' + GOLD + ';margin-bottom:10px}',
      '#cf26 .cf-h2{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,4.2vw,2.8rem);line-height:1.1;color:#fff;margin-bottom:14px}',
      '#cf26 .cf-lead{color:' + MUTED + ';max-width:62ch;font-size:1.05rem}',
      '#cf26 .cf-center{text-align:center}',
      '#cf26 .cf-center .cf-lead{margin:0 auto}',
      '#cf26 .cf-rule{height:3px;width:72px;background:' + TEAL + ';border-radius:2px;margin:18px 0 0}',
      '#cf26 .cf-center .cf-rule{margin:18px auto 0}',

      /* buttons */
      '#cf26 .cf-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 24px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.02em;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;white-space:nowrap}',
      '#cf26 .cf-btn:hover{transform:translateY(-2px)}',
      '#cf26 .cf-gold{background:' + GOLD + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(233,185,73,.25)}',
      '#cf26 .cf-gold:hover{box-shadow:0 12px 30px rgba(233,185,73,.38)}',
      '#cf26 .cf-ghost{border:1.5px solid rgba(255,255,255,.35);color:#fff}',
      '#cf26 .cf-ghost:hover{border-color:' + TEAL + ';color:' + TEAL + '}',
      '#cf26 .cf-teal{background:' + TEAL + ';color:' + DEEP + '}',

      /* nav */
      '#cf26 .cf-nav{position:sticky;top:0;z-index:50;background:rgba(11,31,39,.96);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-nav .cf-wrap{display:flex;align-items:center;gap:18px;height:56px}',
      '#cf26 .cf-sec,#cf26 #cf-contest{scroll-margin-top:76px}',
      '@media (min-width:861px){#cf26 .cf-nav .cf-wrap{height:68px}#cf26 .cf-brand{font-size:1.55rem}}',
      '#cf26 .cf-brand{font-family:' + DISP + ';font-weight:700;color:#fff;text-decoration:none;font-size:1.4rem;letter-spacing:.04em;white-space:nowrap}',
      '@media (max-width:420px){#cf26 .cf-brand{font-size:1.2rem}}',
      '#cf26 .cf-brand span{color:' + TEAL + '}',
      '#cf26 .cf-links{display:flex;gap:4px;margin-left:auto;overflow-x:auto;scrollbar-width:none}',
      '#cf26 .cf-links::-webkit-scrollbar{display:none}',
      '#cf26 .cf-links a{color:#e9f1f3;text-decoration:none;font-size:1rem;font-weight:600;padding:9px 14px;border-radius:999px;white-space:nowrap}',
      '@media (max-width:1080px){#cf26 .cf-links a{font-size:.94rem;padding:8px 10px}}',
      '#cf26 .cf-links a:hover{color:#fff;background:rgba(255,255,255,.06)}',
      '#cf26 .cf-nav .cf-btn{padding:11px 22px;font-size:.98rem}',
      '#cf26 .cf-burger{display:none;width:44px;height:44px;border-radius:4px;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:1.5px solid ' + TEAL + '}',
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
      '#cf26 .cf-fp-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;position:relative;background:#fff}',
      '#cf26 .cf-fp-frame{display:block;width:100%;height:900px;border:0;opacity:0;transition:opacity .25s ease}',
      '#cf26 .cf-fp-ready .cf-fp-frame{opacity:1}',
      '#cf26 .cf-fp-wait{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#5a6a70;font-size:.95rem}',
      '#cf26 .cf-fp-ready .cf-fp-wait{display:none}',
      '#cf26 .cf-fp-spin{width:34px;height:34px;border-radius:50%;border:3px solid #e6eef0;border-top-color:' + TEAL + ';animation:cf-spin .8s linear infinite}',
      '@keyframes cf-spin{to{transform:rotate(360deg)}}',
      '#cf26 .cf-fp-alt{margin:0;padding:10px 22px 16px;font-size:.82rem;color:#7a8d93;text-align:center}',
      '#cf26 .cf-fp-alt a{color:' + TEAL + ';font-weight:600}',
      '#cf26 .cf-fp-slow .cf-fp-alt{font-size:.95rem;font-weight:600;color:' + DEEP + '}',
      '@media (max-width:640px){#cf26 .cf-fp{padding:0}#cf26 .cf-fp .cf-dm-box{height:100%;max-height:none;border-radius:0}}',
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
      '#cf26 .cf-park ul{margin:12px 0 0;padding-left:20px;color:' + MUTED + ';font-size:.95rem}',
      '#cf26 .cf-plist{display:grid;gap:8px;margin-top:8px}',
      '#cf26 .cf-prow{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);text-decoration:none;color:' + INK + '}',
      '#cf26 .cf-prow:hover{border-color:rgba(26,204,206,.45)}',
      '#cf26 button.cf-prow{width:100%;text-align:left;font:inherit;cursor:pointer}',
      '#cf26 .cf-pitem.open .cf-prow{border-color:rgba(26,204,206,.6);border-bottom-left-radius:0;border-bottom-right-radius:0}',
      '#cf26 .cf-pchev{font-style:normal;color:' + TEAL + ';font-size:14px;transition:transform .25s ease}',
      '#cf26 .cf-pitem.open .cf-pchev{transform:rotate(180deg)}',
      '#cf26 .cf-ptray{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}',
      '#cf26 .cf-pitem.open .cf-ptray{grid-template-rows:1fr}',
      '#cf26 .cf-ptray-in{overflow:hidden;display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:0 12px;background:rgba(26,204,206,.07);border:0 solid rgba(26,204,206,.6);border-top:0;border-radius:0 0 12px 12px}',
      '#cf26 .cf-pitem.open .cf-ptray-in{padding:12px;border-width:0 1px 1px}',
      '#cf26 .cf-pcol{display:flex;flex-direction:column;gap:8px;min-width:0}',
      '#cf26 .cf-pcol small{font-size:.76rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:' + MUTED + '}',
      '#cf26 .cf-pcol .cf-btn{justify-content:center;font-size:.86rem;padding:10px 14px;width:100%}',
      '@media (max-width:520px){#cf26 .cf-ptray-in{grid-template-columns:1fr}}',
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
      '#cf26 .cf-info{padding:6px 0 64px}',
      '@media (max-width:620px){#cf26 .cf-vid{min-height:clamp(330px,53vh,480px)}#cf26 .cf-vtext{padding:34px 16px 44px}}',
      /* 11q: B"H sits in the top-right corner of the sticky menu bar, not over the hero. */
      '#cf26 .cf-nav .cf-wrap{padding-right:48px}',
      '#cf26 .cf-bh{position:absolute;top:6px;right:10px;left:auto;z-index:2;font-size:.7rem;line-height:1;color:rgba(255,255,255,.8);font-family:' + DISP + ';pointer-events:none;letter-spacing:.02em}',
      '#cf26 .cf-invite{font-size:clamp(.9rem,2vw,1.08rem);font-weight:600;color:#fff;letter-spacing:.02em;margin:18px 0 8px}',
      '#cf26 .cf-annual{display:flex;align-items:center;justify-content:center;gap:22px;margin-bottom:2px}',
      '#cf26 .cf-annual i{display:block;height:3px;width:min(160px,16vw);background:rgba(255,255,255,.85);border-radius:2px}',
      '#cf26 .cf-annual b{font-family:' + SCRIPT + ';font-weight:400;font-size:clamp(1.8rem,4.8vw,3.2rem);line-height:1.2;color:' + GOLD + ';padding:0 .12em}',
      '#cf26 .cf-annual sup{font-size:.5em;vertical-align:super}',
      '#cf26 .cf-t1{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.02em;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;color:transparent}',
      '#cf26 .cf-t2{font-family:' + DISP + ';font-weight:700;font-size:clamp(3.1rem,11.5vw,8.4rem);line-height:.98;letter-spacing:.04em;color:#fff}',
      '#cf26 .cf-subhead{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.375rem,4.3vw,2.35rem);line-height:1.28;letter-spacing:.015em;color:#fff;margin-top:20px;margin-bottom:4px;padding:0 18px;text-align:center;text-shadow:0 3px 18px rgba(0,0,0,.55)}',
      '#cf26 .cf-subhead:after{content:"";display:block;width:64px;height:2px;margin:14px auto 12px;background:' + GOLD + ';border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.35)}',
      '#cf26 .cf-subhead .cf-sub-1,#cf26 .cf-subhead .cf-sub-2{display:inline;white-space:nowrap}',
      '#cf26 .cf-subhead .cf-sub-2:before{content:" "}',
      '@media (max-width:600px){#cf26 .cf-subhead .cf-sub-1,#cf26 .cf-subhead .cf-sub-2{display:block}#cf26 .cf-subhead .cf-sub-2:before{content:none}#cf26 .cf-subhead:after{margin-top:12px;margin-bottom:8px}}',
      '#cf26 .cf-250-ribbon{background:' + GOLD + ';color:' + DEEP + ';text-align:center;padding:11px 22px}',
      '#cf26 .cf-250-ribbon-inner{font-family:' + BODY + ';font-weight:600;font-size:clamp(.95rem,2.1vw,1.08rem);letter-spacing:.03em;line-height:1.4}',
      '#cf26 .cf-250-r1,#cf26 .cf-250-r2{white-space:nowrap}',
      '#cf26 .cf-250-r2:before{content:" "}',
      '@media (max-width:600px){#cf26 .cf-250-r1,#cf26 .cf-250-r2{display:block;white-space:nowrap}#cf26 .cf-250-r2:before{content:none}}',
      '#cf26 .cf-info .cf-by{margin-top:16px;margin-bottom:2px}',
      '#cf26 .cf-info .cf-welcome{margin-top:10px;margin-bottom:20px}',
      '#cf26 .cf-info .cf-by i,#cf26 .cf-info .cf-by b,#cf26 .cf-info .cf-welcome{text-shadow:none}',
      '#cf26 .cf-250-sec{background:#0c2a30;border-top:1px solid rgba(233,185,73,.28);border-bottom:1px solid rgba(233,185,73,.28);padding:84px 0}',
      '#cf26 .cf-250-copy{color:' + MUTED + ';font-size:1.08rem;line-height:1.8;max-width:46rem;margin:8px auto 0;text-align:center}',
      '@media (max-width:600px){#cf26 .cf-250-sec{padding:56px 0}#cf26 .cf-250-copy{text-align:left;font-size:1.02rem;line-height:1.75}}',
      '#cf26 .cf-250-photos{display:grid;grid-template-columns:1fr 1fr;gap:22px;max-width:46rem;margin:36px auto 0;align-items:stretch}',
      '#cf26 .cf-250-photo{margin:0;background:transparent}',
      '#cf26 .cf-250-photo img{display:block;width:100%;height:auto;aspect-ratio:21/20;object-fit:cover;object-position:center;border-radius:14px;background:' + DEEP + '}',
      '#cf26 .cf-250-photo figcaption{margin-top:10px;text-align:center;font-family:' + BODY + ';font-weight:600;font-size:.92rem;letter-spacing:.02em;color:' + MUTED + ';line-height:1.35}',
      '#cf26 .cf-250-photo .cf-250-credit{display:block;margin-top:3px;text-align:center;font-family:' + BODY + ';font-weight:500;font-size:.78rem;letter-spacing:.02em;color:#b0bfc4;line-height:1.3}',
      '#cf26 .cf-250-photo-ours img{box-shadow:0 0 0 2px ' + GOLD + ';border-radius:14px}',
      '#cf26 .cf-250-photo-ours figcaption{color:' + GOLD + '}',
      '@media (max-width:700px){#cf26 .cf-250-photos{grid-template-columns:1fr;gap:26px;margin-top:28px}#cf26 .cf-250-photo-ours img{aspect-ratio:21/20}}',
      '@media (max-width:620px){#cf26 .cf-when{font-size:clamp(1.6rem,7.4vw,2.4rem)}#cf26 .cf-when .cf-sep{display:none}#cf26 .cf-when .cf-tm{display:block}#cf26 .cf-invite{padding:0 18px}}',
      '#cf26 .cf-venue{font-family:' + DISP + ';color:#fff;text-transform:uppercase;font-size:clamp(1rem,2.8vw,1.75rem);letter-spacing:.02em;margin-top:18px;line-height:1.2;white-space:nowrap}',
      '#cf26 .cf-addr{font-family:' + BODY + ';color:' + INK + ';font-size:clamp(.98rem,2.2vw,1.25rem);margin-top:4px}',
      /* hero credit and welcome line (hero option A) */
      '#cf26 .cf-by{display:block;margin-top:22px;text-decoration:none;color:#fff}',
      '#cf26 .cf-by i{display:block;font-family:' + SCRIPT + ';font-style:normal;color:' + GOLD + ';font-size:clamp(1.15rem,2.6vw,1.6rem);line-height:1.1;text-shadow:0 2px 12px rgba(0,0,0,.6)}',
      '#cf26 .cf-by b{display:block;font-family:' + BODY + ';font-weight:700;letter-spacing:.14em;font-size:clamp(.78rem,1.7vw,1.02rem);margin-top:4px;text-shadow:0 2px 12px rgba(0,0,0,.6)}',
      '#cf26 .cf-by:hover b{color:' + GOLD + '}',
      '#cf26 .cf-welcome{margin-top:24px;font-family:' + BODY + ';font-weight:600;font-size:15px;letter-spacing:4px;color:' + GOLD + ';text-shadow:0 2px 12px rgba(0,0,0,.6)}',
      '#cf26 .cf-welcome .cf-wdot{margin:0 14px}',
      '@media (max-width:600px){#cf26 .cf-welcome{font-size:14px;letter-spacing:1.6px;margin-top:20px}#cf26 .cf-welcome .cf-wdot{margin:0 7px}#cf26 .cf-by b{letter-spacing:.1em;font-size:.84rem;line-height:1.5}#cf26 .cf-by b span{display:block}#cf26 .cf-venue{font-size:clamp(.9rem,4.6vw,1.1rem)}}',
      '#cf26 .cf-when{font-family:' + DISP + ';font-weight:700;font-size:clamp(1.9rem,6vw,3.6rem);line-height:1.1;margin-top:0;color:' + GOLD + ';text-transform:uppercase}',
      '#cf26 .cf-when .cf-tm{white-space:nowrap}',
      '#cf26 .cf-when .cf-to{text-transform:none}',
      '#cf26 .cf-night{font-family:' + DISP + ';color:#fff;font-size:clamp(1rem,2.3vw,1.35rem)}',
      '#cf26 .cf-ctas{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;width:100%;max-width:960px;margin:30px auto 0;justify-items:stretch}',
      '#cf26 .cf-ctas .cf-calwrap,#cf26 .cf-ctas .cf-calwrap .cf-btn,#cf26 .cf-ctas .cf-btn{width:100%}',
      '#cf26 .cf-ctas .cf-btn{height:50px;padding:0 16px;font-size:.92rem;justify-content:center}',
      '#cf26 .cf-fbev{background:' + TEAL + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(60,199,180,.25)}',
      '#cf26 .cf-cream{background:#f3eee6;color:' + DEEP + ';box-shadow:0 8px 24px rgba(0,0,0,.22)}',
      '#cf26 .cf-cream:hover{box-shadow:0 12px 30px rgba(0,0,0,.3)}',
      '@media (max-width:600px){#cf26 .cf-ctas{display:flex;flex-direction:column;gap:10px;max-width:360px;margin-left:auto;margin-right:auto}#cf26 .cf-ctas .cf-calwrap{order:1;width:100%}#cf26 .cf-ctas .cf-cream{order:2}#cf26 .cf-ctas .cf-fbev{order:3}#cf26 .cf-ctas .cf-btn{padding:0 20px}}',
      '#cf26 .cf-calwrap{position:relative;display:inline-block}',
      '#cf26 .cf-menu{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#fff;color:' + DEEP + ';border-radius:12px;padding:6px;min-width:250px;box-shadow:0 18px 40px rgba(0,0,0,.35);z-index:20;display:none;text-align:left}',
      '#cf26 .cf-menu.open{display:block}',
      '#cf26 .cf-menu a,#cf26 .cf-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;white-space:nowrap;text-align:left;justify-content:flex-start;color:' + DEEP + '}',
      '#cf26 .cf-menu a:hover,#cf26 .cf-menu button:hover{background:#eef6f7}',

      /* countdown + marquee */
      '#cf26 .cf-count{background:' + DEEP + ';border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-count .cf-wrap{display:flex;align-items:center;justify-content:center;gap:28px;flex-wrap:wrap;padding-top:22px;padding-bottom:22px}',
      '#cf26 .cf-count-l{font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:' + MUTED + '}',
      '#cf26 .cf-units{display:flex;gap:10px}',
      '#cf26 .cf-unit{min-width:74px;text-align:center;padding:8px 6px;border-radius:12px;background:' + PANEL + ';border:1px solid rgba(26,204,206,.18)}',
      '#cf26 .cf-unit b{display:block;font-family:' + DISP + ';font-size:1.9rem;line-height:1.1;color:#fff}',
      '#cf26 .cf-unit span{font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:' + GREEN + ';font-weight:700}',
      /* phones: label on its own centered line, the four boxes in one row below (Nov 11 pick) */
      '@media (max-width:620px){#cf26 .cf-count .cf-wrap{flex-direction:column;flex-wrap:nowrap;gap:12px;padding-top:16px;padding-bottom:16px}#cf26 .cf-count-l{text-align:center}#cf26 .cf-units{flex-wrap:nowrap;justify-content:center}}',
      '@media (max-width:420px){#cf26 .cf-units{gap:8px}#cf26 .cf-unit{min-width:64px;padding:8px 4px}#cf26 .cf-unit b{font-size:28px}#cf26 .cf-unit span{font-size:12px;letter-spacing:.08em}}',
      '#cf26 .cf-countmsg{font-family:' + DISP + ';font-size:1.3rem;color:' + GOLD + '}',
      '#cf26 .cf-marq{overflow:hidden;background:' + GOLD + ';color:' + DEEP + ';white-space:nowrap}',
      '#cf26 .cf-marq-in{display:inline-flex;align-items:center;gap:0;animation:cf26marq 40s linear infinite;padding:12px 0}',
      '#cf26 .cf-marq:hover .cf-marq-in{animation-play-state:paused}',
      '#cf26 .cf-marq-in span{font-weight:700;font-size:.92rem;padding:0 22px;position:relative;line-height:24px}',
      '#cf26 .cf-marq-in span:after{content:"";position:absolute;right:-4px;top:50%;width:7px;height:7px;margin-top:-3px;border-radius:50%;background:' + DEEP + ';opacity:.45}',
      '#cf26 .cf-marq-in em{font-style:normal;font-family:' + DISP + ';text-transform:uppercase;letter-spacing:.12em;padding:0 22px;font-size:.8rem;line-height:24px}',
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
      '#cf26 .cf-hl-card p{color:' + MUTED + ';font-size:.95rem}',
      /* schedule */
      '#cf26 .cf-sched{list-style:none;margin:6px 0 0;padding:0}',
      '#cf26 .cf-sched li{display:grid;grid-template-columns:88px minmax(0,1fr);gap:14px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:1rem;color:' + INK + '}',
      '#cf26 .cf-sched li:last-child{border-bottom:0}',
      '#cf26 .cf-sched time{font-weight:700;color:' + GOLD + ';font-variant-numeric:tabular-nums;white-space:nowrap}',
      '#cf26 .cf-sched li.cf-key-row span{font-weight:700;color:#fff}',
      '#cf26 .cf-ev-info .cf-kicker + .cf-sched{margin-top:0}',
      '#cf26 .cf-ev-sub{margin-top:26px}',
      /* map inside the event card */
      '#cf26 .cf-ev2{grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)}',
      '@media (max-width:860px){#cf26 .cf-ev2{grid-template-columns:1fr}}',
      '#cf26 .cf-mapbox{padding:34px 34px 30px;border-left:1px solid rgba(255,255,255,.07);scroll-margin-top:80px}',
      '@media (max-width:860px){#cf26 .cf-mapbox{border-left:0;border-top:1px solid rgba(255,255,255,.07);padding:26px 22px}}',
      '#cf26 .cf-mapimg{display:block;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.3)}',
      '#cf26 .cf-mapimg img{width:100%;height:auto;display:block}',
      '#cf26 .cf-maphint{font-size:.95rem;color:' + MUTED + ';margin-top:10px}',
      '#cf26 .cf-mapbtns{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}',
      '#cf26 .cf-mapbtns .cf-btn{padding:11px 18px;font-size:.88rem}',
      '#cf26 .cf-xp{margin-top:16px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.03)}',
      '#cf26 .cf-xp summary{cursor:pointer;list-style:none;padding:14px 18px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px}',
      '#cf26 .cf-xp summary::-webkit-details-marker{display:none}',
      '#cf26 .cf-xp summary:after{content:"+";font-size:1.3rem;line-height:1;color:' + TEAL + '}',
      '#cf26 .cf-xp[open] summary:after{content:"\\2212"}',
      '#cf26 .cf-xp-in{padding:2px 18px 18px}',
      '#cf26 .cf-keyg h4{margin:14px 0 6px;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;display:flex;align-items:center;gap:8px;color:#fff}',
      '#cf26 .cf-keyg h4 i{width:12px;height:12px;border-radius:50%;display:inline-block}',
      '#cf26 .cf-keyg ul{list-style:none;margin:0;padding:0}',
      '#cf26 .cf-keyg li{display:grid;grid-template-columns:30px minmax(0,1fr);gap:10px;padding:6px 0;font-size:.95rem;color:#C9D6DA}',
      '#cf26 .cf-keyg li em{font-style:normal;font-weight:800;font-size:.8rem;color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center}',
      '#cf26 .cf-keyg li b{color:#fff;font-weight:700}',
      '#cf26 .cf-roam{margin-top:14px;font-size:.95rem;color:#C9D6DA}',
      '#cf26 .cf-keywrap{grid-column:1 / -1;padding:0 34px 32px}',
      '#cf26 .cf-keywrap .cf-xp{margin-top:0}',
      '@media (min-width:861px){#cf26 .cf-keyg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0 26px}#cf26 .cf-keyg .cf-roam{grid-column:1 / -1;text-align:center;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)}}',
      '@media (max-width:860px){#cf26 .cf-keywrap{padding:0 22px 26px}}',
      '#cf26 .cf-roam b{color:' + GOLD + '}',
      /* Menorah Contest card */
      '#cf26 .cf-newrow{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px;align-items:stretch}',
      '@media (max-width:620px){#cf26 .cf-newrow{grid-template-columns:1fr}}',
      '#cf26 .cf-newrow .cf-mc{margin-top:0;height:100%;display:flex;flex-direction:column;box-sizing:border-box}',
      '#cf26 .cf-newrow .cf-mc > p{max-width:none}',
      '#cf26 .cf-newrow .cf-mc-grow{flex:1 1 auto}',
      '#cf26 .cf-mc-div{display:block;width:100%;border:0;border-top:1px solid rgba(255,255,255,.14);margin:20px 0 0;padding:0;height:0;background:none}',
      '#cf26 .cf-mc-sub{font-family:' + DISP + ';font-size:1.25rem;font-weight:700;color:#fff;line-height:1.2;margin:16px 0 8px}',
      '#cf26 .cf-mc-sub + p{color:#C9D6DA;font-size:1rem;margin:0}',
      '@media (max-width:620px){#cf26 .cf-mc-div{margin-top:18px}#cf26 .cf-mc-sub{margin-top:14px}}',
      '#cf26 .cf-mc{margin-top:28px;background:' + PANEL + ';border:1px solid rgba(233,185,73,.35);border-radius:22px;padding:30px 34px}',
      '@media (max-width:620px){#cf26 .cf-mc{padding:24px 20px}}',
      '#cf26 .cf-mc h3{font-family:' + DISP + ';font-size:clamp(1.5rem,3.4vw,2rem);color:#fff;line-height:1.15;margin:0 0 8px}',
      '#cf26 .cf-mc > p{color:#C9D6DA;font-size:1rem;max-width:68ch}',
      '#cf26 .cf-mc-facts{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 0;padding:0;list-style:none}',
      '#cf26 .cf-mc-facts li{font-size:.9rem;font-weight:700;color:' + GOLD + ';border:1px solid rgba(233,185,73,.4);border-radius:999px;padding:6px 14px;text-align:center}',
      '#cf26 .cf-mc-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}',
      '#cf26 .cf-mc-btns .cf-btn{height:48px;padding:0 20px;font-size:.9rem}',
      /* phones: paired buttons as two equal halves, same as the top of the page */
      '@media (max-width:600px){#cf26 .cf-mapbtns{display:grid;grid-template-columns:1fr}#cf26 .cf-mc-btns{display:grid;grid-template-columns:1fr}#cf26 .cf-mc-btns .cf-btn,#cf26 .cf-mapbtns .cf-btn{width:100%;height:48px;padding:0 10px;font-size:.88rem}}',
      '#cf26 .cf-mc .cf-xp h4{color:' + GOLD + ';font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;margin:14px 0 6px}',
      '#cf26 .cf-mc .cf-xp ul,#cf26 .cf-mc .cf-xp ol{margin:0;padding-left:20px;color:#C9D6DA;font-size:.95rem}',
      '#cf26 .cf-mc .cf-xp li{margin:4px 0}',
      '#cf26 .cf-mc .cf-xp p{color:#C9D6DA;font-size:.95rem;margin-top:12px}',
      '#cf26 .cf-ev{display:grid;grid-template-columns:1.1fr 1fr;gap:0;margin-top:48px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:' + PANEL + '}',
      '@media (max-width:860px){#cf26 .cf-ev{grid-template-columns:1fr}}',
      '#cf26 .cf-ev-info{padding:34px 34px 30px}',
      '#cf26 .cf-ev-row{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07)}',
      '#cf26 .cf-ev-row:last-of-type{border-bottom:0}',
      '#cf26 .cf-ev-row .cf-ic{color:' + TEAL + ';font-size:22px;margin-top:2px}',
      '#cf26 .cf-ev-row b{display:block;color:#fff;font-weight:700}',
      '#cf26 .cf-ev-row span{color:' + MUTED + ';font-size:.95rem}',
      '#cf26 .cf-ev-note{display:flex;gap:12px;align-items:flex-start;margin:6px 0 0;padding:14px 0 0;border-top:1px solid rgba(255,255,255,.07);color:' + MUTED + ';font-family:' + BODY + ';font-size:.95rem;line-height:1.5}',
      '#cf26 .cf-ev-note .cf-ic{color:' + TEAL + ';font-size:22px;margin-top:1px}',
      '#cf26 .cf-ev-note b{color:#fff;font-weight:700}',
      '#cf26 .cf-ev-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}',
      '#cf26 .cf-ev-btns .cf-btn{padding:11px 18px;font-size:.88rem}',
      '#cf26 .cf-map{position:relative;min-height:340px;background:' + DEEP + '}',
      '#cf26 .cf-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;filter:saturate(.85)}',
      '#cf26 .cf-map-fb{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:' + MUTED + ';text-align:center;padding:20px}',
      /* share kit (inside the share section) */
      '#cf26 .cf-kit{margin-top:44px;padding-top:36px;border-top:1px solid rgba(255,255,255,.14)}',
      '#cf26 .cf-kit-h{font-family:' + DISP + ';font-size:1.35rem;color:#fff;margin:0}',
      '#cf26 .cf-kit-lead{color:#C9D6DA;font-size:.98rem;margin:6px 0 0}',
      '#cf26 .cf-kit-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:24px;text-align:left}',
      '#cf26 .cf-kit-card{display:flex;flex-direction:column;align-items:center;text-align:center;padding:22px 18px;border-radius:18px;background:rgba(9,26,33,.55);border:1px solid rgba(255,255,255,.12)}',
      '#cf26 .cf-kit-th{height:170px;display:flex;align-items:center;justify-content:center}',
      '#cf26 .cf-kit-th img{display:block;max-height:170px;width:auto;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.4)}',
      '#cf26 .cf-kit-card b{display:block;color:#fff;font-family:' + DISP + ';font-size:1.1rem;margin-top:16px}',
      '#cf26 .cf-kit-card p{color:#C9D6DA;font-size:.9rem;line-height:1.45;margin:4px 0 0}',
      /* 11q: picture-kit buttons match style A invite pills on desktop and mobile (approved Nov 11).
         Fixed width keeps Download / Print PDF the same size on all three cards. */
      '#cf26 .cf-kit-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:auto;padding-top:16px}',
      '#cf26 .cf-kit-btns .cf-btn{width:148px;height:48px;min-height:48px;padding:0 16px;gap:8px;font-size:13px;font-weight:700;letter-spacing:.01em;line-height:1;' +
        'background:rgba(11,31,39,.35);color:#fff;border:1.5px solid ' + TEAL + ';box-shadow:none;transform:none;transition:background .2s ease,box-shadow .2s ease}',
      '#cf26 .cf-kit-btns .cf-btn:hover,#cf26 .cf-kit-btns .cf-btn:focus-visible{background:rgba(233,185,73,.10);border-color:' + TEAL + ';color:#fff;transform:none;outline:none;' +
        'box-shadow:0 0 0 1px rgba(233,185,73,.28),0 0 14px rgba(233,185,73,.55),0 0 30px rgba(233,185,73,.32)}',
      '#cf26 .cf-kit-btns .cf-ic{width:18px;height:18px;flex:0 0 18px;color:' + GOLD + '}',
      '@media (max-width:760px){#cf26 .cf-kit-grid{grid-template-columns:minmax(0,1fr);gap:12px;max-width:440px;margin-left:auto;margin-right:auto}' +
        '#cf26 .cf-kit-card{display:grid;grid-template-columns:72px minmax(0,1fr);column-gap:16px;align-items:center;text-align:left;padding:14px}' +
        '#cf26 .cf-kit-th{height:auto;grid-row:1 / span 3;justify-content:flex-start}#cf26 .cf-kit-th img{max-height:none;width:72px;border-radius:6px}' +
        '#cf26 .cf-kit{margin-top:22px;padding-top:28px}#cf26 .cf-kit-card b{margin-top:0}#cf26 .cf-kit-btns{justify-content:flex-start;padding-top:10px}}',

      /* sponsors */
      '#cf26 .cf-spons{background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(233,185,73,.12),rgba(10,31,42,0) 70%),' + DEEP + '}',
      '#cf26 .cf-tier{margin-top:46px}',
      '#cf26 .cf-tier-h{display:flex;align-items:center;gap:16px;margin-bottom:18px}',
      '#cf26 .cf-tier-h h3{font-family:' + DISP + ';color:' + GOLD + ';font-size:1.05rem;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap}',
      '#cf26 .cf-tier-h small{color:' + MUTED + ';font-size:.85rem;white-space:nowrap}',
      '#cf26 .cf-tier-h i{flex:1;height:1px;background:linear-gradient(90deg,rgba(233,185,73,.5),rgba(233,185,73,0))}',
      '#cf26 .cf-sgrid{display:grid;gap:14px}',
      '#cf26 .cf-org{display:flex;flex-direction:column;align-items:center;text-align:center}',
      '#cf26 .cf-org .cf-kicker{margin-bottom:18px}',
      '#cf26 .cf-org-logo img{width:min(320px,70vw);height:auto}',
      '#cf26 .cf-org p{color:' + MUTED + ';max-width:46ch;margin-top:16px;font-size:1rem}',
      '#cf26 .cf-partners-h{margin-top:56px}',
      '#cf26 .cf-partners-h h3{font-family:' + DISP + ';color:' + GOLD + ';font-size:1.2rem}',
      '#cf26 .cf-partners-h p{color:' + MUTED + ';font-size:.95rem;margin-top:6px}',
      '#cf26 .cf-spons .cf-tier{margin-top:24px}',
      /* six partners: 3 + 3, then 2 columns on phones; never one alone */
      '#cf26 .cf-lg .cf-sgrid{grid-template-columns:repeat(3,minmax(0,1fr))}',
      '@media (max-width:640px){#cf26 .cf-lg .cf-sgrid{grid-template-columns:repeat(2,minmax(0,1fr))}#cf26 .cf-lg .cf-sp b{font-size:1.05rem}}',
      /* who we are */
      '#cf26 .cf-who{max-width:760px;margin:0 auto;text-align:center;background:' + PANEL + ';border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:34px 30px}',
      '#cf26 .cf-who h2{font-family:' + DISP + ';color:#fff;font-size:clamp(1.5rem,3.4vw,2rem);margin-bottom:10px}',
      '#cf26 .cf-who p{color:' + MUTED + ';font-size:1.02rem}',
      '#cf26 .cf-who-btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:20px}',
      '#cf26 .cf-who-btns .cf-btn{height:48px;padding:0 22px;font-size:.9rem}',
      '@media (max-width:600px){#cf26 .cf-who{padding:26px 18px}#cf26 .cf-who-btns{display:grid;grid-template-columns:1fr}}',
      '#cf26 .cf-xl .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}',
      '#cf26 .cf-md .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}',
      '#cf26 .cf-sm .cf-sgrid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}',
      '#cf26 .cf-sp{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:16px;background:' + PANEL + ';border:1px solid rgba(233,185,73,.22);padding:22px 16px;min-height:96px;text-decoration:none}',
      '#cf26 .cf-sp img{max-height:64px;width:auto;margin-bottom:10px}',
      '#cf26 .cf-logos .cf-sp{min-height:128px;padding:20px 18px}',
      '#cf26 .cf-logos .cf-sp img{max-height:none;max-width:100%;width:auto;margin:0;object-fit:contain}',
      '@media (max-width:640px){#cf26 .cf-logos .cf-sp{min-height:104px;padding:14px 10px}}',
      '#cf26 .cf-sp b{font-family:' + DISP + ';color:#fff;line-height:1.2}',
      '#cf26 .cf-sp span{color:' + MUTED + ';font-size:.95rem;margin-top:4px;line-height:1.35}',
      '#cf26 .cf-xl .cf-sp{min-height:150px;padding:30px 22px;background:linear-gradient(160deg,rgba(233,185,73,.16),rgba(26,204,206,.08)),' + PANEL + ';border-color:rgba(233,185,73,.5)}',
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
      '#cf26 .cf-stats{display:grid;gap:14px;grid-auto-rows:1fr}',
      '#cf26 .cf-stat{display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:16px;background:' + PANEL + ';border-left:4px solid ' + TEAL + '}',
      '#cf26 .cf-stat:nth-child(2){border-left-color:' + GREEN + '}',
      '#cf26 .cf-stat:nth-child(3){border-left-color:' + GOLD + '}',
      '#cf26 .cf-stat b{font-family:' + DISP + ';font-size:2.2rem;color:#fff;min-width:90px;line-height:1;flex:none}',
      '#cf26 .cf-stat span{color:' + MUTED + ';font-size:.95rem;line-height:1.3;min-width:0;text-wrap:balance}',
      '@media (max-width:620px){#cf26 .cf-stat{gap:10px;padding:16px}#cf26 .cf-stat span{text-align:center}}',

      /* news */
      /* scrolling row: 4 cards visible on a computer, swipe on phones (next card peeks in) */
      '#cf26 .cf-newsbox{position:relative;margin-top:28px}',
      '#cf26 .cf-news{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 54px) / 4);gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:14px;scrollbar-width:thin;scrollbar-color:rgba(60,199,180,.5) transparent;-webkit-overflow-scrolling:touch}',
      '#cf26 .cf-news > .cf-nc{scroll-snap-align:start}',
      '@media (max-width:900px){#cf26 .cf-news{grid-auto-columns:calc((100% - 18px) / 2.3)}}',
      '@media (max-width:560px){#cf26 .cf-news{grid-auto-columns:82%}}',
      '#cf26 .cf-newsnav{display:flex;justify-content:center;align-items:center;gap:12px;margin-top:16px}',
      '#cf26 .cf-newsnav button{width:46px;height:46px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;color:#fff;transition:opacity .2s ease,border-color .2s ease}',
      '#cf26 .cf-newsnav button:hover{border-color:' + GOLD + '}',
      '#cf26 .cf-newsnav button[disabled]{opacity:.3;cursor:default}',
      '#cf26 .cf-newsnav .cf-ic{width:22px;height:22px}',
      '#cf26 .cf-newsnav span{font-size:.9rem;color:' + MUTED + ';min-width:120px;text-align:center}',
      '@media (prefers-reduced-motion:reduce){#cf26 .cf-news{scroll-behavior:auto}}',
      '#cf26 .cf-nc{display:flex;flex-direction:column;background:' + PANEL + ';border:1px solid rgba(255,255,255,.08);color:#fff;border-radius:18px;overflow:hidden;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;min-height:230px}',
      '#cf26 .cf-nc-plate{position:relative;aspect-ratio:16/7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:18px;text-align:center;background:linear-gradient(180deg,' + DEEP + ',#0a1a21);border-bottom:3px double rgba(233,185,73,.55)}',
      '#cf26 .cf-nc-pl-name{font-family:' + DISP + ';font-weight:700;font-size:1.15rem;line-height:1.2;color:#fff;letter-spacing:.01em}',
      '#cf26 .cf-nc-pl-yr{font-family:' + DISP + ';font-size:.95rem;color:' + GOLD + ';letter-spacing:.2em}',
      '#cf26 .cf-nc-badge{display:inline-block;align-self:flex-start;background:' + GOLD + ';color:#14262d;font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 10px;border-radius:20px}',
      '#cf26 .cf-nc-top .cf-nc-badge{margin-bottom:4px}',
      '#cf26 .cf-front{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);margin-top:40px;background:' + PANEL + ';border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;color:#fff;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease}',
      '#cf26 .cf-front:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.35)}',
      '#cf26 .cf-front-ph{background:#fff;display:flex;align-items:center;justify-content:center;padding:14px}',
      '#cf26 .cf-front-ph img{width:100%;height:auto;display:block}',
      '#cf26 .cf-front-bd{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:26px 28px}',
      '#cf26 .cf-front-bd .cf-nc-badge{margin-bottom:6px}',
      '#cf26 .cf-front h3{font-family:' + DISP + ';color:#fff;font-size:1.5rem;line-height:1.25;margin:8px 0 6px}',
      '#cf26 .cf-front p{font-size:1rem;color:' + MUTED + '}',
      '@media (max-width:760px){#cf26 .cf-front{grid-template-columns:1fr}#cf26 .cf-front-bd{padding:20px}#cf26 .cf-front h3{font-size:1.3rem}}',
      '#cf26 .cf-nc-ph{aspect-ratio:16/10;max-width:100%;overflow:hidden;background:' + DEEP + '}',
      '#cf26 .cf-nc-ph img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}',
      '#cf26 .cf-nc:hover .cf-nc-ph img{transform:scale(1.05)}',
      '#cf26 .cf-nc-bd{display:flex;flex-direction:column;flex:1;padding:18px 20px 18px}',
      '#cf26 .cf-nc:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.35)}',
      '#cf26 .cf-nc-top{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin-bottom:8px}',
      '#cf26 .cf-nc-out{font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:' + TEAL + '}',
      '#cf26 .cf-nc-date{font-size:.8rem;color:' + MUTED + ';white-space:nowrap}',
      '#cf26 .cf-nc h3{font-family:' + DISP + ';color:#fff;font-size:1.08rem;line-height:1.3;margin-bottom:8px}',
      '#cf26 .cf-nc p{font-size:.95rem;color:' + MUTED + ';flex:1}',
      '#cf26 .cf-nc-go{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-weight:700;font-size:.85rem;color:' + GOLD + '}',

      /* guide */
      '#cf26 .cf-nights{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:36px}',
      '@media (max-width:820px){#cf26 .cf-nights{grid-template-columns:repeat(4,1fr)}}',
      '#cf26 .cf-nt{border-radius:14px;background:' + PANEL + ';padding:14px 8px 12px;text-align:center;border:1px solid rgba(255,255,255,.06)}',
      '#cf26 .cf-nt.star{background:linear-gradient(160deg,rgba(233,185,73,.28),rgba(26,204,206,.14)),' + PANEL + ';border-color:' + GOLD + '}',
      '#cf26 .cf-nt-c{display:flex;justify-content:center;gap:3px;height:22px;align-items:flex-end;margin-bottom:8px}',
      '#cf26 .cf-nt-c i{display:block;width:4px;height:14px;border-radius:2px;background:rgba(255,255,255,.22);position:relative}',
      '#cf26 .cf-nt-c i.on{background:' + TEAL + '}',
      '#cf26 .cf-nt-c i.on:before{content:"";position:absolute;left:50%;top:-7px;width:5px;height:7px;margin-left:-2.5px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + GOLD + '}',
      '#cf26 .cf-nt b{display:block;font-family:' + DISP + ';color:#fff;font-size:1rem}',
      '#cf26 .cf-nt span{display:block;font-size:.78rem;color:' + MUTED + ';white-space:nowrap;line-height:1.35}',
      '#cf26 .cf-nt em{display:block;font-style:normal;font-size:.7rem;color:' + GOLD + ';margin-top:4px;line-height:1.25;font-weight:600}',
      '#cf26 .cf-nnote{color:' + MUTED + ';font-size:.95rem;margin-top:14px}',
      '#cf26 .cf-gintro{color:' + MUTED + ';margin-top:30px;max-width:70ch}',
      '#cf26 .cf-ggrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:26px}',
      '@media (max-width:900px){#cf26 .cf-ggrid{grid-template-columns:repeat(2,1fr)}}',
      '@media (max-width:560px){#cf26 .cf-ggrid{grid-template-columns:1fr}}',
      '#cf26 .cf-gc{display:flex;flex-direction:column;text-align:left;border-radius:18px;overflow:hidden;background:' + PANEL + ';border:1px solid rgba(255,255,255,.07);text-decoration:none;transition:transform .25s ease,border-color .25s ease;width:100%}',
      '#cf26 .cf-gc:hover{transform:translateY(-4px);border-color:rgba(233,185,73,.5)}',
      '#cf26 .cf-gc-img{aspect-ratio:16/9;width:100%;object-fit:cover;background:' + DEEP + '}',
      '#cf26 .cf-gc-ph{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(26,204,206,.22),rgba(233,185,73,.22));color:' + GOLD + ';font-size:44px}',
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
      '#cf26 .cf-share{background:radial-gradient(ellipse 60% 120% at 0% 100%,rgba(233,185,73,.55),rgba(233,185,73,0) 60%),radial-gradient(ellipse 60% 120% at 100% 100%,rgba(26,164,173,.75),rgba(26,164,173,0) 60%),' + NAVY + ';padding:84px 0}',
      '#cf26 .cf-sharebtns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:26px}',
      '#cf26 .cf-follow{margin-top:14px}',
      '#cf26 .cf-follow .cf-btn{font-size:.92rem}',
      '#cf26 .cf-fb{background:' + TEAL + ';color:' + DEEP + ';box-shadow:0 8px 24px rgba(60,199,180,.25)}',
      '#cf26 .cf-wa{background:#f3eee6;color:' + DEEP + ';box-shadow:0 8px 24px rgba(0,0,0,.22)}',
      '#cf26 .cf-sharebtns .cf-btn{height:50px;min-height:50px;padding:0 22px;justify-content:center}',
      /* even rows, never one button alone: 6 across, or 3 + 3 on medium screens */
      '@media (min-width:601px){#cf26 .cf-sharebtns{display:grid;grid-template-columns:repeat(6,auto);justify-content:center}#cf26 .cf-sharebtns .cf-native{display:none}}',
      '@media (min-width:601px) and (max-width:1060px){#cf26 .cf-sharebtns{grid-template-columns:repeat(3,200px)}#cf26 .cf-sharebtns .cf-btn{width:100%}}',
      /* matching Option 2 pills: teal Facebook, cream for the other share actions, gold native Share */
      '#cf26 .cf-sharebtns .cf-fb{background:' + TEAL + ';color:' + DEEP + ';border:0;box-shadow:0 8px 24px rgba(60,199,180,.25)}',
      '#cf26 .cf-sharebtns .cf-wa,#cf26 .cf-sharebtns .cf-ig,#cf26 .cf-sharebtns .cf-ghost{background:#f3eee6;color:' + DEEP + ';border:0;box-shadow:0 8px 24px rgba(0,0,0,.22)}',
      '#cf26 .cf-sharebtns .cf-ic{width:1.15em;height:1.15em;color:' + DEEP + '}',
      '#cf26 .cf-sharebtns .cf-wa .cf-ic,#cf26 .cf-sharebtns .cf-fb .cf-ic,#cf26 .cf-sharebtns .cf-ig .cf-ic,#cf26 .cf-sharebtns .cf-ghost .cf-ic,#cf26 .cf-sharebtns .cf-native .cf-ic{color:' + DEEP + '}',
      '#cf26 .cf-sharenote{margin-top:16px;font-size:.95rem;color:#C9D6DA;min-height:1.5em}',
      '@media (max-width:600px){#cf26 .cf-sharebtns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;max-width:400px;margin-left:auto;margin-right:auto}#cf26 .cf-sharebtns .cf-btn{width:100%;padding:0 12px;font-size:.88rem}#cf26 .cf-sharebtns .cf-native{grid-column:1 / -1}}',
      '#cf26 .cf-ig{background:#f3eee6;color:' + DEEP + ';box-shadow:0 8px 24px rgba(0,0,0,.22)}',
      /* 11p: invite style A (approved Nov 11). Outline teal pills, white labels, gold icons, gold glow on hover.
         Calm dark band (no corner glows). One row on wide screens, 3 + 3 on medium, 2 across on phones. */
      '#cf26 .cf-share{background:linear-gradient(180deg,' + DEEP + ' 0px,' + NAVY + ' 16px,' + NAVY + ' 88%,#123038 100%);padding:68px 0 84px}',
      '#cf26 #cf-share .cf-kicker{font-size:11px;font-weight:700;letter-spacing:.28em;margin-bottom:14px}',
      '#cf26 #cf-share .cf-h2{font-size:40px;line-height:1.15;letter-spacing:-.01em;margin-bottom:14px}',
      '#cf26 #cf-share .cf-lead{font-size:15px;line-height:1.45}',
      '#cf26 #cf-share .cf-rule{width:64px;margin:16px auto 0}',
      '#cf26 #cf-share .cf-sharebtns{display:flex;flex-wrap:nowrap;justify-content:center;gap:10px;margin-top:30px}',
      '#cf26 #cf-share .cf-sharebtns .cf-btn{height:48px;min-height:48px;padding:0 16px;gap:8px;font-size:13px;font-weight:700;letter-spacing:.01em;line-height:1;' +
        'background:rgba(11,31,39,.35);color:#fff;border:1.5px solid ' + TEAL + ';box-shadow:none;transform:none;transition:background .2s ease,box-shadow .2s ease}',
      '#cf26 #cf-share .cf-sharebtns .cf-btn:hover,#cf26 #cf-share .cf-sharebtns .cf-btn:focus-visible{background:rgba(233,185,73,.10);border-color:' + TEAL + ';transform:none;outline:none;' +
        'box-shadow:0 0 0 1px rgba(233,185,73,.28),0 0 14px rgba(233,185,73,.55),0 0 30px rgba(233,185,73,.32)}',
      '#cf26 #cf-share .cf-sharebtns .cf-btn .cf-ic,#cf26 #cf-share .cf-sharebtns .cf-btn .cf-sic{width:18px;height:18px;flex:0 0 18px;color:' + GOLD + '}',
      '#cf26 .cf-sic{display:block;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}',
      '#cf26 .cf-sic .cf-fill{fill:currentColor;stroke:none}',
      /* phones and tablets with a share sheet: the native Share button leads, full width, gold border */
      '#cf26 #cf-share .cf-sharebtns .cf-native{border-color:' + GOLD + '}',
      '@media (min-width:601px) and (max-width:900px){#cf26 #cf-share .cf-sharebtns{display:grid;grid-template-columns:repeat(3,190px);justify-content:center}#cf26 #cf-share .cf-sharebtns .cf-btn{width:100%}}',
      '@media (max-width:600px){#cf26 .cf-share{padding:48px 0}#cf26 #cf-share .cf-kicker{font-size:10px;letter-spacing:.24em;margin-bottom:12px}' +
        '#cf26 #cf-share .cf-h2{font-size:28px;line-height:1.2;margin-bottom:12px;padding:0 4px}#cf26 #cf-share .cf-lead{font-size:13.5px;padding:0 8px}' +
        '#cf26 #cf-share .cf-rule{margin-top:14px}' +
        '#cf26 #cf-share .cf-sharebtns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px 10px;max-width:350px;margin:24px auto 0}' +
        '#cf26 #cf-share .cf-sharebtns .cf-btn{width:100%;padding:0 12px;font-size:12.5px}#cf26 #cf-share .cf-sharebtns .cf-native{grid-column:1 / -1}#cf26 #cf-share .cf-sharenote{margin-top:12px}#cf26 #cf-share .cf-sharenote:empty{margin:0;min-height:0}}',
      /* 11p: on phones (up to 767px) the Share a picture kit keeps only the Flyer card (approved Nov 11). Phone Story and
         Square Post stay in the markup and show on desktop. The lead line names all three, so it is hidden on phones too.
         11q: the Flyer card and its buttons match the style A invite pills at max-width 767px (same width, height,
         padding, radius, font). Desktop is unchanged. */
      '@media (max-width:767px){#cf26 #cf-share .cf-kit-social{display:none}#cf26 #cf-share .cf-kit-lead{display:none}' +
        '#cf26 #cf-share .cf-kit-grid{grid-template-columns:minmax(0,1fr);width:100%;max-width:350px;margin-left:auto;margin-right:auto;margin-top:18px}' +
        '#cf26 #cf-share .cf-kit-flyer{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0;background:transparent;border:0;border-radius:0}' +
        '#cf26 #cf-share .cf-kit-flyer .cf-kit-th{height:auto;grid-row:auto;justify-content:center;width:100%}' +
        '#cf26 #cf-share .cf-kit-flyer .cf-kit-th img{max-height:160px;width:auto;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.4)}' +
        '#cf26 #cf-share .cf-kit-flyer b{margin-top:16px}' +
        '#cf26 #cf-share .cf-kit-btns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px 10px;width:100%;justify-content:stretch;margin-top:0;padding-top:16px}' +
        '#cf26 #cf-share .cf-kit-btns .cf-btn{width:100%;height:48px;min-height:48px;padding:0 12px;gap:8px;font-size:12.5px;font-weight:700;letter-spacing:.01em;line-height:1;' +
          'background:rgba(11,31,39,.35);color:#fff;border:1.5px solid ' + TEAL + ';box-shadow:none;transform:none;transition:background .2s ease,box-shadow .2s ease}' +
        '#cf26 #cf-share .cf-kit-btns .cf-btn:hover,#cf26 #cf-share .cf-kit-btns .cf-btn:focus-visible{background:rgba(233,185,73,.10);border-color:' + TEAL + ';color:#fff;transform:none;outline:none;' +
          'box-shadow:0 0 0 1px rgba(233,185,73,.28),0 0 14px rgba(233,185,73,.55),0 0 30px rgba(233,185,73,.32)}' +
        '#cf26 #cf-share .cf-kit-btns .cf-ic{width:18px;height:18px;flex:0 0 18px;color:' + GOLD + '}}',
      '@media (min-width:601px) and (max-width:767px){#cf26 #cf-share .cf-kit-grid{max-width:590px}' +
        '#cf26 #cf-share .cf-kit-btns{grid-template-columns:190px 190px;justify-content:center;gap:10px}}',
      '#cf26 .cf-pop{max-width:460px;margin:22px auto 0;background:#fff;color:' + DEEP + ';border-radius:16px;padding:20px;text-align:center;display:none}',
      '#cf26 .cf-pop.open{display:block}',
      '#cf26 .cf-pop p{font-size:.92rem;margin-bottom:14px}',
      '#cf26 .cf-pop .cf-btn{margin:4px}',
      '#cf26 .cf-pop .cf-ghost{color:' + DEEP + ';border-color:rgba(10,31,42,.25)}',
      '#cf26 .cf-foot{background:' + DEEP + ';padding:46px 0 96px;text-align:center;color:' + MUTED + ';font-size:.92rem}',
      '#cf26 .cf-foot b{display:block;font-family:' + DISP + ';color:#fff;font-size:1.25rem;margin-bottom:10px}',
      '#cf26 .cf-foot-l{display:flex;flex-wrap:wrap;gap:8px 22px;justify-content:center;margin:10px 0 22px}',
      '#cf26 .cf-foot-l a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:' + INK + '}',
      '#cf26 .cf-foot-l a:hover{color:' + GOLD + '}',
      '@media (max-width:600px){#cf26 .cf-foot-l{flex-direction:column;align-items:center;gap:12px}}',
      '#cf26 .cf-soc{display:inline-flex;align-items:center;gap:10px;color:' + INK + '}',
      '#cf26 .cf-soc a .cf-ic{width:1.3em;height:1.3em}',
      '#cf26 .cf-foot small{display:block;font-size:.74rem;opacity:.7;margin-top:14px}',
      '#cf26 .cf-toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:' + GOLD + ';color:' + DEEP + ';font-weight:700;padding:12px 20px;border-radius:999px;z-index:2147482600;transition:all .3s ease;max-width:90vw;text-align:center;font-size:.9rem}',
      '#cf26 .cf-toast.show{opacity:1;transform:translate(-50%,0)}',
      '#cf26 .cf-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}',
      '#cf26 .cf-reveal.in{opacity:1;transform:none}',
      '@media (max-width:620px){#cf26 .cf-sec{padding:60px 0}#cf26 .cf-ev-info{padding:26px 22px}#cf26 .cf-share{padding:60px 0}}',
      '@media (prefers-reduced-motion:reduce){#cf26 .cf-marq-in{animation:none}#cf26 .cf-reveal{opacity:1;transform:none;transition:none}#cf26 .cf-skel{animation:none}}'
    ].join('\n');
  }

  /* =====================================================================
     BUILD
     ===================================================================== */
  var root;


  /* ---------- analytics: one listener classifies the main buttons (sends only when GA4 is on) ---------- */
  function ctaLabel(a) {
    var h = (a.getAttribute('href') || '').toLowerCase(), c = ' ' + (a.className || '') + ' ';
    if (/calendar\.google|\.ics|data:text\/calendar/.test(h)) return /google/.test(h) ? 'calendar_google' : 'calendar_ics';
    if (/facebook\.com\/events/.test(h)) return 'rsvp_facebook';
    if (/7606745/.test(h)) return 'register_contest';
    if (/donate|#donate/.test(h) || / cf-donate /.test(c)) return 'donate';
    if (/festival-map-2026\.pdf/.test(h)) return 'map_pdf';
    if (/festival-map/.test(h)) return 'map_open';
    if (/flyer/.test(h)) return 'flyer_download';
    if (/maps\.google|google\.com\/maps|maps\.apple/.test(h)) return 'directions';
    if (/5333083|mailing/i.test(h)) return 'mailing_list';
    if (/jewishriverside\.com\/?(5201495)?$/.test(h.replace(/[?#].*$/, ''))) return 'explore_chabad';
    return null;
  }
  function trackClicks() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('#cf26 a') : null;
      if (!a) return;
      var label = ctaLabel(a);
      if (label) { try { if (window.gtag) window.gtag('event', 'cta_click', { label: label, page: 'festival' }); } catch (x) {} }
    }, true);
  }

  /* ---------- schema.org Event (Google can show date, place and "free" in search) ---------- */
  function addEventData() {
    if (document.getElementById('cf26-ld')) return;
    var data = {
      '@context': 'https://schema.org', '@type': 'Event',
      name: '22nd Annual Chanukah Festival',
      startDate: '2026-12-07T18:00:00-08:00', endDate: '2026-12-07T20:00:00-08:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: 'Riverside Historic Courthouse',
        address: { '@type': 'PostalAddress', streetAddress: '4050 Main St.', addressLocality: 'Riverside', addressRegion: 'CA', postalCode: '92501', addressCountry: 'US' } },
      image: [asset('share-1200x628.jpg')],
      description: 'Grand Menorah Lighting, live music, latkes, donuts and kids’ activities at the Riverside Historic Courthouse. Free and open to all.',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: CFG.SHARE.url },
      organizer: { '@type': 'Organization', name: CFG.host, url: CFG.hostUrl }
    };
    var sc = document.createElement('script');
    sc.type = 'application/ld+json'; sc.id = 'cf26-ld';
    sc.text = JSON.stringify(data);
    document.head.appendChild(sc);
  }

  function boot() {
    if (document.getElementById('cf26')) return;
    if (!onThisPage()) { uncover(); return; }
    try {
      /* The festival page templates (templateless form 7553387 and mini-site 4949424) send no viewport
         tag, so phones would draw the page 980px wide and shrink it. Add one so the design fits. */
      if (!document.querySelector('meta[name="viewport"]')) {
        var vp = document.createElement('meta'); vp.name = 'viewport'; vp.content = 'width=device-width, initial-scale=1';
        (document.head || document.documentElement).appendChild(vp);
      }
      loadFonts();
      var st = document.createElement('style');
      st.id = 'cf26-style';
      st.textContent = css();
      document.head.appendChild(st);

      root = document.createElement('div');
      root.id = 'cf26';
      add(root,
        /* section order (approved Nov 11): what, when, where first; then what to do; then plan your
           visit; then story and press; then partners, sharing and the guide */
        buildNav(), buildHero(), buildCountdown(), buildMarquee(),
        buildActivities(), buildEvent(), buildDirections(), buildAmerica250(), buildAbout(),
        buildNews(), buildPartners(), buildShare(), buildGuide(), buildWho(), buildFooter());

      var host = document.querySelector('.cco_templatelates_content') || document.body;
      if (host === document.body) document.body.insertBefore(root, document.body.firstChild);
      else host.parentNode.insertBefore(root, host);

      root.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        if (a.closest('.cf-fp')) return;
        var kind = formKindFor(a.href);
        if (!kind) return;
        e.preventDefault();
        if (kind === 'donate') openDonate(); else openFormPop(kind);
      });
      document.documentElement.className += ' cf26-on' + (byHost ? ' cf26-home' : '');
      hideTopBar();
      if (window.addEventListener) window.addEventListener('load', hideTopBar);
      uncover();
      startCountdown();
      reveal();
      document.addEventListener('click', closeMenus);
      trackClicks();
      try { addEventData(); } catch (e) {}
      /* back from Cash App or a bank window: stripe-donate.js shows the result */
      if (CFG.STRIPE_DONATE) loadStripeDonate();   /* small file; also shows the result when back from Cash App */
      if (CFG.OWN_FORMS) loadOwnForms();
      /* chanukahfestival.org/guess, /menorah and /donate arrive here as ?guess, ?menorah, ?donate */
      if (/[?&]guess(?:[=&]|$)/i.test(location.search)) setTimeout(openGuess, 300);
      if (/[?&]menorah(?:[=&]|$)/i.test(location.search)) setTimeout(function () { openFormPop('contest'); }, 300);
      if (/[?&]volunteer(?:[=&]|$)/i.test(location.search)) setTimeout(openVolunteer, 300);
      if (!/[?&]payment_intent=/.test(location.search) && (/^#donate$/i.test(location.hash) || /[?&]donate(?:[=&]|$)/i.test(location.search))) setTimeout(openDonate, 300);
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

  /* The platform's "Back to ..." bar has inline !important styles, so a stylesheet can't
     hide it; overwrite its inline display instead. It's a link bar, not a form. */
  function hideTopBar() {
    [].forEach.call(document.querySelectorAll('.cco_templateless_template'), function (e) {
      if (e.closest && e.closest('#cf26')) return;
      e.style.setProperty('display', 'none', 'important');
    });
  }

  function loadFonts() {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + ['family=Arvo:wght@400;700', 'family=Kaushan+Script',
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
    add(n, w, mm, el('div', 'cf-bh', 'B\u201dH'));
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

  /* ---------- form pop-up (jewishriverside.com form in a frame) ---------- */
  var FP = null;
  var FORM_ORIGIN = /^https:\/\/www\.(jewishriverside\.com|chanukahfestival\.org)$/;
  function formKindFor(href) {
    if (!href) return null;
    var keys = Object.keys(CFG.FORM_POPS);
    for (var i = 0; i < keys.length; i++) {
      var a = CFG.FORM_POPS[keys[i]].aid;
      if (new RegExp('jewishriverside\\.com/(?:' + a + '(?:\\D|$)|.*[/=]' + a + '(?:\\D|$))', 'i').test(href)) return keys[i];
    }
    return null;
  }
  /* our own forms (festival-forms.js, loaded at boot) */
  var OWN_KIND = { contest: 'menorah', mailing: 'mailing' };
  var formsLoading = null;
  function loadOwnForms() {
    if (window.CFForms) return Promise.resolve(window.CFForms);
    if (formsLoading) return formsLoading;
    formsLoading = new Promise(function (res) {
      var sc = document.createElement('script');
      sc.src = asset('festival-forms.js') + (/\?v=([^&]+)/.exec(SELF_SRC) ? '?v=' + /\?v=([^&]+)/.exec(SELF_SRC)[1] : '');
      sc.onload = function () { res(window.CFForms || null); };
      sc.onerror = function () { formsLoading = null; res(null); };
      (document.head || document.documentElement).appendChild(sc);
    });
    return formsLoading;
  }
  function openGuess() {
    function fallback() { location.href = CFG.GUESS_URL; }   /* the ChabadOne Guess page */
    if (!CFG.OWN_FORMS) return fallback();
    loadOwnForms().then(function (F) {
      if (F && F.ready && F.open('dreidel')) { track('form_open_dreidel'); return; }
      fallback();
    });
  }
  /* chanukahfestival.org/volunteer arrives as ?volunteer: the volunteer form (festival-forms.js) in a pop-up */
  function openVolunteer() {
    loadOwnForms().then(function (F) {
      if (F && F.ready && F.open('volunteer')) { track('form_open_volunteer'); return; }
      location.href = CFG.VOLUNTEER_URL;   /* the ChabadOne volunteer page */
    });
  }
  function openFormPop(kind) {
    if (CFG.OWN_FORMS && OWN_KIND[kind]) {
      var go = function (F) {
        if (F && F.ready && F.open(OWN_KIND[kind])) { track('form_open_' + kind); return; }
        openFramePop(kind);
      };
      if (window.CFForms) return go(window.CFForms);
      loadOwnForms().then(go);
      return;
    }
    openFramePop(kind);
  }
  function openFramePop(kind) {
    var F = CFG.FORM_POPS[kind];
    if (!F) return;
    closeFormPop();
    lastFocus = document.activeElement;
    var ov = el('div', 'cf-dm cf-fp');
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', F.title);
    var box = el('div', 'cf-dm-box');
    var hd = el('div', 'cf-dm-hd');
    var x = el('button', 'cf-dm-x'); x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.appendChild(icon('x'));
    var ht = el('div');
    add(ht, el('b', null, F.title), el('span', null, F.sub));
    add(hd, ht, x);
    var body = el('div', 'cf-fp-body');
    var wait = el('div', 'cf-fp-wait');
    add(wait, el('i', 'cf-fp-spin'), el('span', null, 'Loading the form…'));
    var fr = document.createElement('iframe');
    fr.className = 'cf-fp-frame';
    fr.title = F.title;
    fr.src = F.url + '#cf-embed';
    fr.setAttribute('allow', 'payment');
    var alt = el('p', 'cf-fp-alt');
    var altA = link(null, F.url, 'Open the form in a new tab', true);
    add(alt, document.createTextNode('Trouble with the form? '), altA);
    add(body, wait, fr, alt);
    add(box, hd, body);
    ov.appendChild(box);
    root.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    x.focus();
    var ready = false;
    function onMsg(e) {
      if (!FORM_ORIGIN.test(e.origin) || e.source !== fr.contentWindow) return;
      var d = e.data;
      if (!d || d.cf26 !== 'embed') return;
      if (d.type === 'ready' || d.type === 'height') {
        if (!ready) { ready = true; box.className += ' cf-fp-ready'; }
        if (d.type === 'height' && d.h > 100) fr.style.height = Math.min(Math.round(d.h), 6000) + 'px';
      }
      if (d.type === 'done') { body.scrollTop = 0; track('form_done_' + kind); }
    }
    /* if the form page never answers (blocked or slow), show it anyway with the new-tab link */
    var slow = setTimeout(function () { if (!ready) box.className += ' cf-fp-ready cf-fp-slow'; }, 8000);
    function onKey(e) { if (e.key === 'Escape') closeFormPop(); }
    window.addEventListener('message', onMsg);
    document.addEventListener('keydown', onKey);
    x.addEventListener('click', closeFormPop);
    ov.addEventListener('click', function (e) { if (e.target === ov) closeFormPop(); });
    FP = { ov: ov, off: function () { clearTimeout(slow); window.removeEventListener('message', onMsg); document.removeEventListener('keydown', onKey); } };
    track('form_open_' + kind);
  }
  function closeFormPop() {
    if (!FP) return;
    FP.off();
    if (FP.ov.parentNode) FP.ov.parentNode.removeChild(FP.ov);
    FP = null;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  function track(name) { try { if (window.gtag) window.gtag('event', 'cta_click', { label: name }); } catch (e) {} }

  /* Stripe pop-up (stripe-donate.js, loaded the first time it is needed) */
  var stripeLoading = null;
  function loadStripeDonate() {
    if (window.CFStripe) return Promise.resolve(window.CFStripe);
    if (stripeLoading) return stripeLoading;
    stripeLoading = new Promise(function (res) {
      var sc = document.createElement('script');
      sc.src = asset('stripe-donate.js') + (/\?v=([^&]+)/.exec(SELF_SRC) ? '?v=' + /\?v=([^&]+)/.exec(SELF_SRC)[1] : '');
      sc.onload = function () { res(window.CFStripe || null); };
      sc.onerror = function () { stripeLoading = null; res(null); };
      (document.head || document.documentElement).appendChild(sc);
    });
    return stripeLoading;
  }
  function openDonate() {
    if (!CFG.STRIPE_DONATE) return openDonateNative();
    function go(S) {
      if (S && S.ready && S.open()) {
        try { history.replaceState(null, '', '#donate'); } catch (e) {}
        return;
      }
      openDonateNative();
    }
    if (window.CFStripe) return go(window.CFStripe);   /* normally already loaded at boot */
    loadStripeDonate().then(go);
  }
  function openDonateNative() {
    var form = nativeForm();
    if (!form || !$id(CFG.DONATE.F.submit)) { openFormPop('donate'); return; }
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
      var done = el('button', 'cf-btn cf-gold', 'Back to the Festival'); done.type = 'button';
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
    add(info, evRow('pin', CFG.event.venue, CFG.event.street + ', ' + CFG.event.cityLine));
    if (CFG.PARKING.length) {
      var pk = el('div', 'cf-park');
      pk.appendChild(el('div', 'cf-kicker', 'Parking nearby'));
      var list = el('div', 'cf-plist');
      var venueAddr = CFG.event.mapQuery;
      CFG.PARKING.forEach(function (g, i) {
        var item = el('div', 'cf-pitem');
        var a = el('button', 'cf-prow');
        a.type = 'button';
        a.setAttribute('aria-expanded', 'false');
        a.setAttribute('aria-controls', 'cf-ptray-' + i);
        var t = el('div');
        add(t, el('b', null, g.addr), el('span', null, g.name));
        add(a, icon('pin'), t, el('em', null, g.walk + ' walk'), el('i', 'cf-pchev', '▾'));
        var tray = el('div', 'cf-ptray');
        tray.id = 'cf-ptray-' + i;
        var gAddr = g.addr + ', Riverside, CA 92501';
        function mapBtn(cls, href, label) {
          var m = link('cf-btn ' + cls, href, label, true);
          m.insertBefore(icon('pin'), m.firstChild);
          return m;
        }
        var c1 = el('div', 'cf-pcol'), c2 = el('div', 'cf-pcol');
        add(c1, el('small', null, 'Drive to the garage'),
          mapBtn('cf-teal', 'https://www.google.com/maps/dir/?' + qs({ api: '1', destination: gAddr }), 'Google Maps'),
          mapBtn('cf-ghost', 'https://maps.apple.com/?' + qs({ daddr: gAddr }), 'Apple Maps'));
        add(c2, el('small', null, 'Walk to the courthouse'),
          mapBtn('cf-teal', 'https://www.google.com/maps/dir/?' + qs({ api: '1', origin: gAddr, destination: venueAddr, travelmode: 'walking' }), 'Google Maps'),
          mapBtn('cf-ghost', 'https://maps.apple.com/?' + qs({ saddr: gAddr, daddr: venueAddr, dirflg: 'w' }), 'Apple Maps'));
        var inner = el('div', 'cf-ptray-in');
        add(inner, c1, c2);
        tray.appendChild(inner);
        a.addEventListener('click', function () {
          var open = item.className.indexOf(' open') < 0;
          [].forEach.call(list.querySelectorAll('.cf-pitem.open'), function (o) {
            o.className = 'cf-pitem'; o.querySelector('.cf-prow').setAttribute('aria-expanded', 'false');
          });
          if (open) { item.className = 'cf-pitem open'; a.setAttribute('aria-expanded', 'true'); }
        });
        add(item, a, tray);
        list.appendChild(item);
      });
      pk.appendChild(list);
      var ul = el('ul');
      (CFG.PARKING_NOTES || []).forEach(function (line) { ul.appendChild(el('li', null, line)); });
      pk.appendChild(ul);
      info.appendChild(pk);
    }

    var map = el('div', 'cf-map');
    var fb = el('div', 'cf-map-fb');
    add(fb, icon('pin'), el('b', null, CFG.event.venue), el('span', null, CFG.event.street + ', ' + CFG.event.cityLine));
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
  function americaRibbon() {
    var r = el('div', 'cf-250-ribbon');
    var inner = el('div', 'cf-250-ribbon-inner');
    add(inner,
      el('span', 'cf-250-r1', 'Celebrating freedom and light'),
      el('span', 'cf-250-r2', 'in America\u2019s 250th year.'));
    r.appendChild(inner);
    return r;
  }

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

    if (!still) {
      var tryPlay = function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
      v.addEventListener('canplay', tryPlay, { once: true });
    }

    var txt = el('div', 'cf-vtext');
    var ann = el('div', 'cf-annual');
    var b = el('b');
    add(b, document.createTextNode(CFG.edition), el('sup', null, CFG.editionSuffix), document.createTextNode(' Annual'));
    add(ann, el('i'), b, el('i'));
    var by = link('cf-by', CFG.hostUrl, '');
    var hb = el('b');
    /* phones show the name as two even lines: "...CENTER" / "OF RIVERSIDE" */
    var hp = CFG.host.toUpperCase().split(' OF ');
    if (hp.length === 2) add(hb, el('span', null, hp[0]), document.createTextNode(' '), el('span', null, 'OF ' + hp[1]));
    else hb.textContent = CFG.host.toUpperCase();
    add(by, el('i', null, 'Presented by'), hb);
    var wel = el('div', 'cf-welcome');
    add(wel, document.createTextNode('FREE ADMISSION'), el('span', 'cf-wdot', '\u2022'), document.createTextNode('ALL ARE WELCOME'));
    add(txt,
      ann,
      el('h1', 'cf-t1', 'Chanukah'.toUpperCase()),
      el('div', 'cf-t2', 'FESTIVAL'),
      (function () {
        var sub = el('div', 'cf-subhead');
        add(sub,
          el('span', 'cf-sub-1', 'Southern California\u2019s largest'),
          el('span', 'cf-sub-2', 'Chanukah festival!'));
        return sub;
      })());
    band.appendChild(txt);

    /* date, place and buttons under the video */
    var ctas = el('div', 'cf-ctas');
    ctas.appendChild(calendarButton('cf-btn cf-gold'));
    var fbe = link('cf-btn cf-fbev', CFG.SHARE.facebookEvent, 'Join the Facebook Event', true);
    fbe.insertBefore(icon('fb'), fbe.firstChild);
    ctas.appendChild(fbe);
    var sh = el('button', 'cf-btn cf-cream', 'Share');
    sh.type = 'button';
    sh.insertBefore(icon('share'), sh.firstChild);
    sh.addEventListener('click', function () {
      /* phones: the native share sheet; elsewhere: the share section */
      function toSection() {
        var t = document.getElementById('cf-share');
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      }
      if (navigator.share) {
        var pr = navigator.share({ title: 'Chanukah Festival', text: T(CFG.SHARE.text), url: shareUrl('native', 'festival-top') });
        /* cancelled by the person: stay put; share sheet not allowed here: use the section */
        if (pr && pr.catch) pr.catch(function (e) { if (!e || e.name !== 'AbortError') toSection(); });
        return;
      }
      toSection();
    });
    ctas.appendChild(sh);

    var info = el('div', 'cf-wrap cf-info');
    add(info,
      by,
      wel,
      whenLine(),
      el('div', 'cf-venue', CFG.event.venue),
      el('div', 'cf-addr', CFG.event.street + ', ' + CFG.event.cityLine),
      ctas);

    add(h, band, americaRibbon(), info);
    return h;
  }

  function whenLine() {
    var d = el('div', 'cf-when');
    add(d, el('span', null, CFG.event.dayLine), el('span', 'cf-sep', ' \u2022 '), timeSpan());
    return d;
  }
  /* "6–8 PM": keep the small "to" lowercase inside the uppercase date line */
  function timeSpan() {
    var t = el('span', 'cf-tm');
    var parts = CFG.event.timeLine.split(' to ');
    if (parts.length !== 2) { t.textContent = CFG.event.timeLine; return t; }
    add(t, document.createTextNode(parts[0] + ' '), el('span', 'cf-to', 'to'), document.createTextNode(' ' + parts[1]));
    return t;
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
          'The festival is happening now. Come join us!' :
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
    return CFG.PARTNERS.concat(CFG.TICKER_EXTRA || []).map(function (n) { return T(n.name); });
  }
  function buildMarquee() {
    var names = allSponsorNames();
    if (!names.length) return null;
    var m = el('div', 'cf-marq');
    m.setAttribute('role', 'img');
    m.setAttribute('aria-label', 'Thank you to our community partners: ' + names.join(', '));
    var inner = el('div', 'cf-marq-in');
    inner.setAttribute('aria-hidden', 'true');
    var reps = Math.max(2, Math.ceil(12 / names.length)) * 2;
    for (var r = 0; r < reps; r++) {
      inner.appendChild(el('em', null, 'Thank you'));
      names.forEach(function (n) { inner.appendChild(el('span', null, n)); });
    }
    m.appendChild(inner);
    return m;
  }

  /* ---------- event ---------- */

  function buildAmerica250() {
    if (!CFG.america250) return null;
    var x = CFG.america250;
    var s = section('america250', 'cf-250-sec');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading(null, x.title, null, true));
    w.appendChild(el('p', 'cf-250-copy cf-reveal', x.body));
    var photos = x.photos || [];
    if (photos.length) {
      var pair = el('div', 'cf-250-photos cf-reveal');
      photos.forEach(function (ph, i) {
        var fig = el('figure', 'cf-250-photo' + (ph.featured ? ' cf-250-photo-ours' : ''));
        var im = document.createElement('img');
        im.src = ph.src;
        im.alt = ph.alt || '';
        im.loading = 'lazy';
        var cap = el('figcaption', null, ph.caption);
        fig.appendChild(im);
        fig.appendChild(cap);
        if (ph.credit) {
          fig.appendChild(el('div', 'cf-250-credit', ph.credit));
        }
        pair.appendChild(fig);
      });
      w.appendChild(pair);
    }
    s.appendChild(w);
    return s;
  }

  function buildActivities() {
    if (!CFG.america250) return null;
    var s = section('activities');
    var w = el('div', 'cf-wrap');
    w.appendChild(heading('What to expect', 'An evening of light for the whole Inland Empire and beyond',
      'Bring the whole family to downtown Riverside on the 4th night of Chanukah.', true));
    var cards = el('div', 'cf-hl');
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
      cards.appendChild(c);
    });
    w.appendChild(cards);
    w.appendChild(buildNewRow());
    s.appendChild(w);
    return s;
  }

  function buildEvent() {
    var s = section('event');
    var w = el('div', 'cf-wrap');
    if (CFG.america250) w.appendChild(heading('Plan your evening', 'Schedule & Festival Map', null, true));
    else w.appendChild(heading('What to expect', 'An evening of light for the whole Inland Empire and beyond',
      'Bring the whole family to downtown Riverside on the 4th night of Chanukah.', true));

    if (CFG.america250) {
      /* highlights + contest render in buildActivities, after event details and the 250th section */
    } else {
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

    w.appendChild(buildNewRow());
    } /* end original highlights+contest when no 250 section */

    var ev = el('div', 'cf-ev cf-ev2 cf-reveal');
    var info = el('div', 'cf-ev-info');
    add(info,
      el('div', 'cf-kicker', 'Event details'),
      evRow('cal', 'Monday, December 7, 2026', '6–8 PM'),
      evRow('pin', CFG.event.venue, CFG.event.street + ', ' + CFG.event.cityLine));
    var sk = el('div', 'cf-kicker cf-ev-sub', 'Schedule');
    var sl = el('ol', 'cf-sched');
    CFG.SCHEDULE.forEach(function (r) {
      var li = el('li', r[2] ? 'cf-key-row' : null);
      add(li, el('time', null, r[0]), el('span', null, r[1]));
      sl.appendChild(li);
    });
    add(info, sk, sl);
    if (CFG.aslNote) {
      var an = el('p', 'cf-ev-note');
      var at = el('span');
      add(at, el('b', null, CFG.aslNote.lead), document.createTextNode(' ' + CFG.aslNote.text));
      add(an, icon('asl'), at);
      info.appendChild(an);
    }
    var btns = el('div', 'cf-ev-btns');
    var dp = link('cf-btn cf-teal', '#cf-directions', 'Directions & Parking');
    dp.insertBefore(icon('pin'), dp.firstChild);
    dp.addEventListener('click', function (e) { e.preventDefault(); goTo('directions'); });
    add(btns, dp);
    info.appendChild(btns);
    add(ev, info, buildMap(), buildKey());
    w.appendChild(ev);

    s.appendChild(w);
    return s;
  }

  /* ---------- festival map (right half of the event card) ---------- */
  function buildMap() {
    var M = CFG.MAP;
    var box = el('div', 'cf-mapbox');
    box.id = 'cf-map';
    var a = link('cf-mapimg', asset(M.full), null, true);
    a.setAttribute('aria-label', 'Open the festival map full size');
    var im = document.createElement('img');
    im.src = asset(M.web); im.alt = M.alt; im.loading = 'lazy';
    im.width = 1800; im.height = 1224;
    a.appendChild(im);
    var bt = el('div', 'cf-mapbtns');
    var full = link('cf-btn cf-teal', asset(M.full), 'Open Full Size', true);
    full.insertBefore(icon('ext'), full.firstChild);
    var pdf = link('cf-btn cf-ghost', asset(M.pdf), 'Download PDF', true);
    pdf.insertBefore(icon('dl'), pdf.firstChild);
    add(bt, full, pdf);

    add(box, el('div', 'cf-kicker', 'Festival map'), a,
      el('p', 'cf-maphint', 'Tap the map to open it full size and zoom in.'), bt);
    return box;
  }

  /* Map key: a full-width strip under the details and the map (4 columns on wide
     screens, open); a fold-out list on phones. */
  function buildKey() {
    var M = CFG.MAP;
    var wrap = el('div', 'cf-keywrap');
    var xp = el('details', 'cf-xp');
    if (window.innerWidth > 860) xp.open = true;
    add(xp, el('summary', null, 'What each number means'));
    var inner = el('div', 'cf-xp-in cf-keyg');
    M.KEY.forEach(function (g) {
      var grp = el('div', 'cf-keygrp');
      var h = el('h4');
      var dot = el('i'); dot.style.background = g.color;
      add(h, dot, document.createTextNode(T(g.group)));
      var ul = el('ul');
      g.items.slice().sort(function (x, y) { return x[0] - y[0]; }).forEach(function (it) {
        var li = el('li');
        var n = el('em', null, String(it[0])); n.style.background = g.color;
        var t = el('div');
        add(t, el('b', null, T(it[1])), it[2] ? document.createTextNode(' · ' + T(it[2])) : null);
        add(li, n, t);
        ul.appendChild(li);
      });
      add(grp, h, ul);
      inner.appendChild(grp);
    });
    var roam = el('p', 'cf-roam');
    add(roam, el('b', null, 'Roaming the festival: '), document.createTextNode(M.ROAMING));
    inner.appendChild(roam);
    xp.appendChild(inner);
    wrap.appendChild(xp);
    return wrap;
  }

  /* ---------- New this year: Menorah Contest + Train Rides, side by side on desktop ---------- */
  function buildNewRow() {
    var row = el('div', 'cf-newrow');
    row.appendChild(buildContest());
    row.appendChild(buildTrain());
    return row;
  }
  function buildTrain() {
    var Tr = CFG.TRAIN;
    var c = el('div', 'cf-mc cf-reveal');
    c.id = 'cf-train';
    var facts = el('ul', 'cf-mc-facts');
    Tr.facts.forEach(function (f) { facts.appendChild(el('li', null, f)); });
    var gelt = Tr.gelt;
    var gFacts = el('ul', 'cf-mc-facts');
    gelt.facts.forEach(function (f) { gFacts.appendChild(el('li', null, f)); });
    var btns = el('div', 'cf-mc-btns');
    var mp = link('cf-btn cf-ghost', '#cf-map', 'See the Festival Map');
    mp.insertBefore(icon('pin'), mp.firstChild);
    mp.addEventListener('click', function (e) { e.preventDefault(); goTo('map'); });
    btns.appendChild(mp);
    add(c, el('div', 'cf-kicker', 'New this year'), el('h3', null, Tr.title),
      el('p', null, Tr.intro), facts,
      el('hr', 'cf-mc-div'), el('h4', 'cf-mc-sub', gelt.title), el('p', null, gelt.intro), gFacts,
      el('div', 'cf-mc-grow'), btns);
    return c;
  }

  /* ---------- Menorah Contest card ---------- */
  function buildContest() {
    var C = CFG.CONTEST;
    var c = el('div', 'cf-mc cf-reveal');
    c.id = 'cf-contest'; /* ChanukahFestival.org/#contest (linked from the contest registration page) */
    var facts = el('ul', 'cf-mc-facts');
    C.facts.forEach(function (f) { facts.appendChild(el('li', null, f)); });
    var btns = el('div', 'cf-mc-btns');
    var reg = link('cf-btn cf-gold', C.url, 'Register to Enter', true);
    var mp = link('cf-btn cf-ghost', '#cf-map', 'See the Festival Map');
    mp.insertBefore(icon('pin'), mp.firstChild);
    mp.addEventListener('click', function (e) { e.preventDefault(); goTo('map'); });
    add(btns, reg, mp);

    function list(tag, items) { var l = el(tag); items.forEach(function (x) { l.appendChild(el('li', null, x)); }); return l; }
    var xp = el('details', 'cf-xp');
    var inner = el('div', 'cf-xp-in');
    add(inner, el('h4', null, 'How it works'), list('ol', C.how),
      el('h4', null, 'Prizes'), list('ul', C.prizes),
      el('h4', null, 'Rules'), list('ul', C.rules));
    add(xp, el('summary', null, 'See Contest Details'), inner);

    add(c, el('div', 'cf-kicker', 'New this year'), el('h3', null, 'Menorah Contest'),
      el('p', null, C.intro), facts, btns, xp);
    return c;
  }

  /* ---------- share kit: pictures to post or send (inside the share section) ---------- */
  /* Phones: the share sheet with the picture itself (WhatsApp, Instagram, Save Image).
     Computers: downloads the file. Falls back to opening the picture in a new tab. */
  function kitGet(url, name, note) {
    var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    function open() { window.open(url, '_blank', 'noopener'); }
    if (!window.fetch || !window.Blob) return open();
    fetch(url, { mode: 'cors' }).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) {
      var f = null;
      try { f = new File([b], name, { type: b.type || 'image/jpeg' }); } catch (e) {}
      if (touch && f && navigator.canShare && navigator.canShare({ files: [f] })) {
        return navigator.share({ files: [f], title: 'Chanukah Festival 2026' }).catch(function (e) {
          if (!e || e.name !== 'AbortError') open();
        });
      }
      var u = URL.createObjectURL(b), a = document.createElement('a');
      a.href = u; a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(u); a.parentNode.removeChild(a); }, 1500);
      if (note) { note.textContent = 'Saved to your downloads.'; setTimeout(function () { note.textContent = ''; }, 2500); }
    }).catch(open);
  }
  function buildKit() {
    if (!CFG.KIT || !CFG.KIT.length) return null;
    var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    var k = el('div', 'cf-kit cf-reveal');
    add(k, el('h3', 'cf-kit-h', 'Share a picture'), el('p', 'cf-kit-lead', 'Post it on your story, send it to a group, or print the flyer.'));
    var g = el('div', 'cf-kit-grid');
    var note = el('p', 'cf-sharenote');
    note.setAttribute('role', 'status');
    CFG.KIT.forEach(function (it) {
      var c = el('div', 'cf-kit-card ' + (it.pdf ? 'cf-kit-flyer' : 'cf-kit-social'));
      var th = el('div', 'cf-kit-th');
      var im = document.createElement('img');
      im.src = asset(it.thumb); im.alt = 'Chanukah Festival 2026: ' + it.title.toLowerCase(); im.loading = 'lazy';
      th.appendChild(im);
      var bt = el('div', 'cf-kit-btns');
      var b = el('button', 'cf-btn cf-ghost', touch ? 'Save or Share' : 'Download');
      b.type = 'button';
      b.insertBefore(icon(touch ? 'share' : 'dl'), b.firstChild);
      b.addEventListener('click', function () {
        try { if (window.gtag) window.gtag('event', 'kit_download', { item: it.title }); } catch (e) {}
        kitGet(asset(it.file), it.name, note);
      });
      bt.appendChild(b);
      if (it.pdf) {
        var pd = link('cf-btn cf-ghost', asset(it.pdf), 'Print PDF', true);
        pd.setAttribute('download', 'Chanukah-Festival-2026-Flyer.pdf');
        pd.insertBefore(icon('dl'), pd.firstChild);
        bt.appendChild(pd);
      }
      add(c, th, el('b', null, it.title), el('p', null, it.note), bt);
      g.appendChild(c);
    });
    add(k, g, note);
    return k;
  }

  /* ---------- sponsors ---------- */
  function buildPartners() {
    if (!CFG.PARTNERS.length) return null;
    var s = section('partners', 'cf-spons');
    var w = el('div', 'cf-wrap');
    var org = el('div', 'cf-org cf-reveal');
    org.appendChild(el('div', 'cf-kicker', 'Organized by'));
    var lg = document.createElement('img');
    lg.src = asset(CFG.ORGANIZER.logo); lg.alt = CFG.host; lg.width = 400; lg.height = 146; lg.loading = 'lazy';
    var la = link('cf-org-logo', CFG.hostUrl, null, true);
    la.appendChild(lg);
    add(org, la, el('p', null, CFG.ORGANIZER.caption));
    w.appendChild(org);
    var ph = el('div', 'cf-center cf-partners-h');
    add(ph, el('h3', null, 'Together with our community partners'), el('p', null, CFG.PARTNERS_INTRO));
    w.appendChild(ph);
    var allLogos = CFG.PARTNERS.every(function (n) { return !!n.logo; });
    var g = el('div', 'cf-sgrid cf-reveal' + (allLogos ? ' cf-logos' : ''));
    CFG.PARTNERS.forEach(function (n) {
      var c = el(n.url ? 'a' : 'div', 'cf-sp');
      if (n.url) { c.href = n.url; c.target = '_blank'; c.rel = 'noopener'; }
      if (allLogos) {
        var im = document.createElement('img');
        im.src = asset(n.logo); im.loading = 'lazy';
        im.alt = T(n.name) + (n.sub ? ', ' + T(n.sub) : '');
        if (n.h) im.style.height = n.h + 'px';
        c.appendChild(im);
      } else {
        add(c, el('b', null, n.name), n.sub ? el('span', null, n.sub) : null);
      }
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
    l.appendChild(heading('About the festival', 'More than a menorah lighting'));
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
    w.appendChild(heading('Press', 'In the News', 'Covered by The Press-Enterprise, NBC Los Angeles and local news, year after year.', true));
    var F = CFG.NEWS_FRONT;
    if (F) {
      var fa = link('cf-front cf-reveal', F.url, null, true);
      var fp = el('div', 'cf-front-ph');
      var fi = document.createElement('img');
      fi.src = asset(F.img); fi.alt = F.alt; fi.loading = 'lazy';
      fp.appendChild(fi);
      var fb = el('div', 'cf-front-bd');
      var fgo = el('span', 'cf-nc-go', 'Read the story');
      fgo.appendChild(icon('ext'));
      add(fb, el('span', 'cf-nc-badge', F.kicker), el('span', 'cf-nc-out', F.outlet), el('span', 'cf-nc-date', F.date),
        el('h3', null, F.title), el('p', null, F.blurb), fgo);
      add(fa, fp, fb);
      w.appendChild(fa);
    }
    var g = el('div', 'cf-news');
    CFG.NEWS.forEach(function (n) {
      var a = link('cf-nc', n.url, null, true);
      /* newspaper-style nameplate: outlet and year */
      var pl = el('div', 'cf-nc-plate');
      add(pl, el('span', 'cf-nc-pl-name', n.outlet), el('span', 'cf-nc-pl-yr', (n.date.match(/\d{4}/) || [''])[0]));
      a.appendChild(pl);
      var bd = el('div', 'cf-nc-bd');
      var top = el('div', 'cf-nc-top');
      if (n.badge) top.appendChild(el('span', 'cf-nc-badge', n.badge));
      top.appendChild(el('span', 'cf-nc-date', n.date));
      var go = el('span', 'cf-nc-go', 'Read the story');
      go.appendChild(icon('ext'));
      add(bd, top, el('h3', null, n.title), n.blurb ? el('p', null, n.blurb) : null, go);
      a.appendChild(bd);
      g.appendChild(a);
    });
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', 'News stories, scroll sideways for more');
    /* arrows: left and right, greyed out at each end */
    var nav = el('div', 'cf-newsnav');
    var prev = el('button'); prev.type = 'button'; prev.setAttribute('aria-label', 'Previous stories'); prev.appendChild(icon('left'));
    var next = el('button'); next.type = 'button'; next.setAttribute('aria-label', 'More stories'); next.appendChild(icon('right'));
    var count = el('span', null, CFG.NEWS.length + ' stories');
    add(nav, prev, count, next);
    function step() { var c = g.querySelector('.cf-nc'); return c ? c.getBoundingClientRect().width + 18 : 280; }
    prev.addEventListener('click', function () { g.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { g.scrollBy({ left: step(), behavior: 'smooth' }); });
    function sync() {
      prev.disabled = g.scrollLeft < 4;
      next.disabled = g.scrollLeft + g.clientWidth > g.scrollWidth - 4;
    }
    g.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    setTimeout(sync, 0);
    var box = el('div', 'cf-newsbox cf-reveal');
    add(box, g, nav);
    w.appendChild(box);
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
      add(c, cs, el('b', null, 'Night ' + n.n), el('span', null, n.day), el('span', 'cf-nt-d', n.date), n.note ? el('em', null, n.note) : null);
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
      im.className = 'cf-gc-img'; im.src = asset(it.img); im.alt = T(it.title); im.loading = 'lazy';
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
    var done = el('button', 'cf-btn cf-ghost', 'Back to the Festival'); done.type = 'button';
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
  /* The public link with tracking tags, so each kind of share can be counted. */
  /* Short, readable link: ?s=<where it was shared>[-<page>]. footer.js turns s into the
     analytics campaign (source = before the dash, content = after), so no long utm_ tags. */
  function shareUrl(source, page) {
    var p = (page || 'festival').replace(/^festival-?/, '');
    return CFG.SHARE.url + '?s=' + source + (p ? '-' + p : '');
  }
  /* One set of invite buttons. Used on the festival page; the same set goes on every
     thank-you page. msg: the prefilled invitation; page: tag for analytics. */
  /* share button icons from invite style A (outline, 18px, gold; filled parts use .cf-fill) */
  var SHARE_ICONS = {
    chat: '<path d="M5.2 5.2h13.6A1.8 1.8 0 0 1 20.6 7v8.2a1.8 1.8 0 0 1-1.8 1.8H9.1L5 19.8V7A1.8 1.8 0 0 1 5.2 5.2z"/>',
    wa: '<path d="M7.15 4.9c.25-.7.95-1.15 1.7-1.05l1.55.2c.55.07.95.54.95 1.1v1.85c0 .4-.22.76-.57.95l-1.05.58c.85 2.05 2.42 3.62 4.5 4.5l.58-1.05c.19-.35.55-.57.95-.57h1.85c.56 0 1.03.4 1.1.95l.2 1.55c.1.75-.35 1.45-1.05 1.7-1.15.4-2.55.15-4.15-.7-2.7-1.45-4.85-3.6-6.3-6.3-.85-1.6-1.1-3-.7-4.16z"/>',
    mail: '<rect x="4" y="6.2" width="16" height="11.6" rx="1.8"/><path d="M5.2 7.4 12 12.3l6.8-4.9"/>',
    fb: '<path class="cf-fill" transform="translate(12 12) scale(1.12) translate(-12 -12)" d="M13.85 20.4V12.9h2.55l.4-3.05h-2.95V8.1c0-.82.22-1.38 1.48-1.38h1.57V3.85A18.6 18.6 0 0 0 13.3 3.7c-2.28 0-3.85 1.38-3.85 3.92v2.23H7.15V12.9h2.3v7.5h4.4z"/>',
    ig: '<rect x="4.4" y="4.4" width="15.2" height="15.2" rx="4.4"/><circle cx="12" cy="12" r="3.5"/><circle class="cf-fill" cx="16.6" cy="7.4" r="1"/>',
    link: '<path d="M9.7 14.3a4.2 4.2 0 0 0 6 0l2.1-2.1a4.2 4.2 0 1 0-6-6l-1.2 1.2"/><path d="M14.3 9.7a4.2 4.2 0 0 0-6 0L6.2 11.8a4.2 4.2 0 1 0 6 6l1.2-1.2"/>'
  };
  function shareIcon(name) {
    if (!SHARE_ICONS[name]) return icon(name);
    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="cf-sic">' + SHARE_ICONS[name] + '</svg>';
    return d.firstChild;
  }
  function shareButtons(msg, page) {
    var box = el('div');
    var row = el('div', 'cf-sharebtns');
    var note = el('p', 'cf-sharenote');
    note.setAttribute('role', 'status');
    function say(t) { note.textContent = t; }
    function track(method) {
      try { if (window.gtag) window.gtag('event', 'share_click', { method: method, page: page || 'festival' }); } catch (e) {}
    }
    function body(src) { return msg + '\n\n' + shareUrl(src, page); }

    /* the phone share sheet: phones and tablets only; computers use the buttons below */
    var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    if (navigator.share && touch) {
      var nb = el('button', 'cf-btn cf-gold cf-native', 'Share');
      nb.type = 'button';
      nb.insertBefore(icon('share'), nb.firstChild);
      nb.addEventListener('click', function () {
        track('native');
        var pr = navigator.share({ title: 'Chanukah Festival', text: msg, url: shareUrl('native', page) });
        if (pr && pr.catch) pr.catch(function (e) { if (!e || e.name !== 'AbortError') say('Use one of the buttons below to share.'); });
      });
      row.appendChild(nb);
    }
    var wa = link('cf-btn cf-wa', 'https://wa.me/?' + qs({ text: body('whatsapp') }), 'WhatsApp', true);
    wa.insertBefore(shareIcon('wa'), wa.firstChild);
    wa.addEventListener('click', function () { track('whatsapp'); });
    var sms = link('cf-btn cf-ghost', 'sms:?' + AMP + 'body=' + encodeURIComponent(body('sms')), 'Text Message');
    sms.insertBefore(shareIcon('chat'), sms.firstChild);
    sms.addEventListener('click', function (e) {
      track('sms');
      /* the preview window can't open apps; on the real site this opens Messages */
      if (PREVIEW) { e.preventDefault(); say('On the real site this opens your Messages app with the invitation filled in.'); }
    });
    var em = link('cf-btn cf-ghost', 'mailto:?subject=' + encodeURIComponent(CFG.SHARE.emailSubject) + AMP + 'body=' +
      encodeURIComponent(body('email') + '\n\n' + CFG.SHARE.emailEnd), 'Email');
    em.insertBefore(shareIcon('mail'), em.firstChild);
    em.addEventListener('click', function (e) {
      track('email');
      if (PREVIEW) { e.preventDefault(); say('On the real site this opens your email app (Gmail works too) with the invitation filled in.'); }
    });
    var cp = el('button', 'cf-btn cf-ghost', 'Copy Link');
    cp.type = 'button';
    cp.insertBefore(shareIcon('link'), cp.firstChild);
    cp.addEventListener('click', function () {
      track('copy');
      copyText(shareUrl('copy', page)).then(function () { say('Link copied!'); setTimeout(function () { say(''); }, 2000); },
        function () { say('Copy this link: ' + shareUrl('copy', page)); });
    });
    var fb = link('cf-btn cf-fb', 'https://www.facebook.com/sharer/sharer.php?' + qs({ u: shareUrl('facebook', page) }), 'Facebook', true);
    fb.insertBefore(shareIcon('fb'), fb.firstChild);
    fb.addEventListener('click', function () { track('facebook'); });
    /* Instagram has no web share link: phone share sheet, else copy the link */
    var ig = el('button', 'cf-btn cf-ig', 'Instagram');
    ig.type = 'button';
    ig.insertBefore(shareIcon('ig'), ig.firstChild);
    ig.addEventListener('click', function () {
      track('instagram');
      function copyIt() {
        copyText(shareUrl('instagram', page)).then(function () { say('Link copied. Paste it in your Instagram story or bio.'); },
          function () { say('Copy this link for Instagram: ' + shareUrl('instagram', page)); });
      }
      if (!navigator.share) return copyIt();
      var pr = navigator.share({ title: 'Chanukah Festival', text: msg, url: shareUrl('instagram', page) });
      if (pr && pr.catch) pr.catch(function (e) { if (!e || e.name !== 'AbortError') copyIt(); });
    });
    /* order: most used first (texting), utility last */
    add(row, sms, wa, em, fb, ig, cp);
    add(box, row, note);
    return box;
  }

  function buildShare() {
    var s = el('section', 'cf-share');
    s.id = 'cf-share';
    var w = el('div', 'cf-wrap cf-center');
    w.appendChild(heading('Spread the light', 'Invite your family and friends', 'One tap sends the invitation with the festival link.', true));
    w.appendChild(shareButtons(T(CFG.SHARE.text), 'festival'));
    var kit = buildKit();
    if (kit) w.appendChild(kit);
    s.appendChild(w);
    return s;
  }

  /* ---------- who we are ---------- */
  function buildWho() {
    var s = section('who', 'cf-alt');
    var w = el('div', 'cf-wrap');
    var c = el('div', 'cf-who cf-reveal');
    var b = el('div', 'cf-who-btns');
    var ex = link('cf-btn cf-ghost', CFG.WHO.explore, 'Explore More', true);
    var ml = link('cf-btn cf-ghost', CFG.WHO.mailingList, 'Join Our Mailing List', true);
    add(b, ex, ml);
    add(c, el('h2', null, 'Who We Are'), el('p', null, CFG.WHO.mission), b);
    w.appendChild(c);
    s.appendChild(w);
    return s;
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
    /* every contact item is icon + word */
    var ig = link(null, CFG.SHARE.instagram, 'Instagram', true);
    ig.insertBefore(icon('ig'), ig.firstChild);
    var fbl = link(null, CFG.SHARE.facebook, 'Facebook', true);
    fbl.insertBefore(icon('fb'), fbl.firstChild);
    add(l, ph, em, ig, fbl);
    add(w, el('b', null, 'Questions? We\u2019d love to help.'), l,
      donateButton('Support the Festival'),
      el('small', null, '\u00a9 2026 ' + CFG.host + ' \u2022 ' + CFG.WEB));
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
