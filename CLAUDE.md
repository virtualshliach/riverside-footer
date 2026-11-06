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
| `chanukah-2026.js` | 4949424 Chanukah Festival 2026 (also chanukahfestival.org) | **Live** |

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

## Visual check before showing anything (layout, centering, alignment)

A screenshot that "looks right" is not a check. Before saying any layout is fixed, centered or
aligned, on this site or in a ChabadOne form:

1. **Measure, don't eyeball.** Run a script on the live page that reads each element's
   `getBoundingClientRect()` and compares centers or left edges. Centered items must share
   the same center as their container within 2 px; aligned items must share a left edge.
2. **Check every centered piece together:** the page heading, intro, notes, buttons and
   footer lines. Report the numbers (for example "heading 1153, button 1153").
3. **Find the cause before fixing.** Look at the parent's `display` (grid, flex, float).
   ChabadOne form rows are a two-column grid (label | field); anything meant to span the
   full width needs `grid-column: 1 / -1`, not just `margin-left: 0`.
4. **Check desktop (1366 px) and phone (390 px)** after the change is live, not only in a
   test page.
5. **Look at a full-size screenshot,** never one scaled below about 60%; small offsets
   disappear at small scales.

## Rules

- **Past events stay on.** Never remove a page from `PAGES` unless the person asks to
  turn that page off.
- **Drafts** point at a draft page id. Switch to the live id only when asked to go live.
  Chanukah went live Nov 6 2026 on 4949424. Page 4949424 has no donation form yet, so
  Donate opens the regular donate page; once the form is added there, check its field ids
  on the live page before relying on the pop-up.
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
