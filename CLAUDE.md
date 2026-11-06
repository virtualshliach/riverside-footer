# riverside-footer

Custom page code for **jewishriverside.com** (Chabad Jewish Community Center, Riverside),
a ChabadOne site. Served by GitHub Pages at
`https://virtualshliach.github.io/riverside-footer/`.

**Every push to `main` goes live for real visitors within about 10 minutes.** Treat
`main` as the live website. Built and maintained with Yudell Reiz (Virtual Shliach),
who owns this repository.

## How it fits together

- The site's ChabadOne footer contains exactly one line pointing here:
  `<script src="https://virtualshliach.github.io/riverside-footer/footer.js"></script>`
  Never rename or move `footer.js`; the live site depends on that address.
- `footer.js` is the loader. Its `PAGES` map lists which page id (aid) loads which
  project file. Pages not listed load nothing.
- Each `*.js` project file in the root is one page's custom design. Each also checks
  its own page id before running.

| File | Page | Status |
|---|---|---|
| `sukkot-5787.js` | 7457011 Sukkot & Simchat Torah | Past event, **stays on** |
| `chanukah-2026.js` | 7553387 Chanukah Festival 2026 | **Draft**. Live page will be 4949424 |
| `menorah-contest-2026.js` | 7606745 Kids Menorah Contest 2026 (form + thank-you) | On with the festival |
| `dreidel-2026.js` | 5738793 Dreidel Guessing Contest, JewishRiverside.com/Guess (form + thank-you) | On with the festival |

## Making a change

1. Edit the project file.
2. Bump `V` in `footer.js` (format `YYYY-MM-DD` plus a letter) in the same commit, so
   browsers fetch the new copy.
3. Run the tests: `cd tools && npm install` (once), then `node tools/test.js` from the
   repo root. All must pass.
4. Show the person a preview of the change (a rendered page they can look at) and get
   their OK before pushing.
5. Commit with a plain-English message saying what changed on the site, then push.

To undo a bad change, revert its commit and push; the site goes back within ~10 minutes.

## Rules

- **Past events stay on.** Never remove a page from `PAGES` unless the person asks to
  turn that page off.
- **Drafts** point at a draft page id. Switch to the live id only when asked to go live.
  Chanukah go-live: in `chanukah-2026.js` set `CFG.AID` to `'4949424'` and
  `BRAND_HOSTS` to `['chanukahfestival.org']`; in `footer.js` move the `PAGES` entry to
  `'4949424'` and add `'chanukahfestival.org': '4949424'` to `HOSTS`.
- Keep the page id in a project's CFG and its `PAGES` key the same.
- The loader only loads `^[a-z0-9-]+\.js$` files from this repository. Never add code
  that loads a script URL taken from the page, the address bar or anywhere else.
- **No secrets, ever.** This repository and the code it serves are public. No Stripe
  secret keys, Authorize.Net transaction keys, passwords or API tokens. Publishable
  keys and Google Apps Script web-app URLs are fine.
- Plain text in the code is fine here (curly quotes, `&`, long files). The old
  footer-box restrictions only applied to code pasted into the ChabadOne footer box.

## ChabadOne page rules (these break forms if ignored)

- Never hide a native ChabadOne form with `display:none`. It breaks reCAPTCHA and the
  form will not submit. Move it off-screen or cover it instead.
- reCAPTCHA must stay rendered and visible when the person submits.
- The platform uses Prototype.js, not jQuery. Do not assume `$` is jQuery.
- Forms submit by AJAX, not page navigation. Watch for completion; don't wait for a
  page load.
- `total_amount` appears more than once on a page; always look it up inside a container.
- Receipt merge tags are written as `<<field_id>>` (for example `<<input_3_first>>`).
- Find a form's real field ids by running a console script on the live page before
  writing code against them. Never guess field ids.
- Hosted files can arrive after the page has finished loading: start your code only
  after everything in the file is defined (call `boot()` at the very end, as the
  existing files do).

## Contacts

Questions about this setup: Yudell Reiz (Virtual Shliach).
