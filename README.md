# Tasnim Assali — Personal Website

A static site (HTML, CSS, JS — no build step, no dependencies) built from your CV.

## Files
- `index.html` — all page content
- `css/style.css` — design system and layout
- `js/script.js` — hero animation and scroll reveals

## Before you publish
1. Open `index.html` in a browser to preview it locally (double-click the file).
2. Check the GitHub link in the Contact section (`github.com/tasnimassali`) points to your real profile.
3. Optional: replace the "TA" monogram in the About section with a real photo — add your image file into the project folder and swap the `.avatar-frame` div in `index.html` for an `<img>` tag pointing to it.

## How to publish (three options)

### Option A — GitHub Pages (free, easiest if you already use GitHub)
1. Create a new repository on GitHub, e.g. `tasnim-assali.github.io` (using your exact GitHub username makes the URL clean).
2. Upload these three items (`index.html`, `css/`, `js/`) to the repository root.
3. Go to the repository's **Settings > Pages**, set the source branch to `main` and the folder to `/root`, then save.
4. Your site is live within a minute or two at `https://<your-username>.github.io`.

### Option B — Netlify (free, drag-and-drop, custom domain support)
1. Go to netlify.com and sign in (GitHub or email works).
2. On the dashboard, drag the whole project folder onto the "Deploy manually" area.
3. Netlify gives you a live URL immediately; you can rename it or attach your own domain under **Domain settings**.

### Option C — Your own hosting (cPanel / FTP), for full self-hosting on a domain like tasnimassali.com
1. Buy a domain (Namecheap, OVH, or a local Tunisian registrar) if you don't have one.
2. Get web hosting (any basic shared hosting plan supports static HTML).
3. Connect via FTP (FileZilla) or your host's File Manager, and upload `index.html`, `css/`, and `js/` into the `public_html` (or `www`) folder.
4. Point your domain's DNS to the hosting provider if it isn't already, then visit your domain.

Any of the three works well for a static academic site. GitHub Pages or Netlify are the fastest if you don't already own a domain; Option C is the right choice if you specifically want it under your own domain name and hosting.
