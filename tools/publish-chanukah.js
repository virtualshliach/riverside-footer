/* Publish the Chanukah Festival draft to the live page.
   Copies chanukah-2026-draft.js (draft page 7553387) to chanukah-2026.js (live page 4949424),
   switching only the page id and the festival domain. Run from the repo root:
     node tools/publish-chanukah.js            draft -> live  (publish)
     node tools/publish-chanukah.js --to-draft live -> draft (start the draft over from what's live)
   Then bump V in footer.js, run the tests, and push. */
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..');
var DRAFT = { file: 'chanukah-2026-draft.js', aid: '7553387', hosts: "[]" };
var LIVE = { file: 'chanukah-2026.js', aid: '4949424', hosts: "['chanukahfestival.org', '12899.centers.clhosting.org']" };
var toDraft = process.argv.indexOf('--to-draft') > -1;
var from = toDraft ? LIVE : DRAFT, to = toDraft ? DRAFT : LIVE;
var src = fs.readFileSync(path.join(ROOT, from.file), 'utf8');
function swap(re, val, what) {
  if (!re.test(src)) { console.error('Could not find ' + what + ' in ' + from.file); process.exit(1); }
  src = src.replace(re, val);
}
swap(/^(\s*)AID: '\d+',/m, "$1AID: '" + to.aid + "',", 'AID');
swap(/^(\s*)BRAND_HOSTS: \[[^\]]*\],/m, '$1BRAND_HOSTS: ' + to.hosts + ',', 'BRAND_HOSTS');
fs.writeFileSync(path.join(ROOT, to.file), src);
console.log('Wrote ' + to.file + ' from ' + from.file + ' (page ' + to.aid + '). Now bump V in footer.js, run node tools/test.js, and push.');
