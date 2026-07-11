# Priyanka Singh — portfolio

A hand-built static site (HTML, CSS, vanilla JS). No build step, no framework — it deploys to Vercel as-is.

## Files
- `index.html` — all the content
- `styles.css` — all the styling
- `script.js` — reveal animations, active-section index, mobile menu, contact form
- `favicon.svg` — the "pupil" mark

## Deploy to Vercel

**Option A — drag and drop (fastest)**
1. Go to vercel.com and sign in.
2. New Project → deploy → drag this whole folder in.
3. Framework preset: **Other** (it's a static site). Deploy.

**Option B — Git (recommended for editing later)**
1. Put this folder in a GitHub repo.
2. On Vercel: Add New → Project → import the repo → Deploy.
3. Every push updates the live site.

No environment variables or settings are needed.

### Custom domain
In the Vercel project → Settings → Domains, add your domain and follow the DNS steps.

## Contact form

Out of the box, the form opens the visitor's email app with a pre-filled message to
`singhpriyanka0801@gmail.com`. That always works with zero setup.

To receive messages **straight to the inbox** (no email app needed), turn on Web3Forms — free:
1. Go to https://web3forms.com and enter your email to get an access key.
2. Open `script.js`, find `WEB3FORMS_KEY` near the top, and paste the key in place of
   `YOUR_WEB3FORMS_KEY`.
3. Redeploy. That's it.

## Editing content
Everything is plain text in `index.html`. To change a research entry, edit the matching
`<li class="entry">` block. To change colours or fonts, edit the `:root` block at the top
of `styles.css`.
