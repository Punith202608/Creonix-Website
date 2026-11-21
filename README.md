# CREONIX — SJBIT Social Media & Creative Club Website

A static website built with plain **HTML, CSS and JavaScript**. It uses no frameworks and needs no build step.

```
creonix-website/
├── index.html      ← page structure + text (About, Contact …)
├── style.css       ← all styling; colours & fonts at the very top
├── script.js       ← team / events / gallery DATA + interactions
├── README.md
└── assets/
    ├── logo.png        ← your logo
    ├── hero-bg.jpg     ← hero background texture
    ├── site/           ← hero & about photos
    ├── team/           ← member portraits
    ├── events/         ← upcoming event posters
    └── gallery/        ← one folder per past event (cover.jpg, 01.jpg, 02.jpg …)
```

Every image in `assets/` is a **placeholder**: the photos are generated, and each one is labelled with its own file path. Swap in a real photo with the **same file name** and the site picks it up with no code changes. Search the code for `REPLACE` to find every spot you can customise.

---

## 1. Run it locally

**Easiest:** open `index.html` in your browser by double-clicking it.

**Recommended (VS Code):** install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**. The page then reloads every time you save.

**Or with Python:**
```bash
python -m http.server 5500
```
Then open http://localhost:5500.

> YouTube videos inside the event pop-up play best through Live Server or a hosted site. Some browsers block YouTube embeds on pages opened straight from `file://`.

## 2. Replace the logo

Save your logo as `assets/logo.png`, replacing the placeholder. It appears in the navbar, the footer and the browser tab. Any shape works because it is shown 44px tall. A PNG with a transparent background looks cleanest on the cream navbar.

## 3. Change colours & fonts

Open `style.css`. Section **1. DESIGN TOKENS** at the top holds everything:

```css
--red-500: #B3141C;   /* primary deep red */
--cream-200: #F2E6D3; /* warm cream */
--ink-900: #0F0C0B;   /* black */
--orange: #FF6A13;  --yellow: #FFC23A;   /* logo gradient accents */

--font-display: "Anton", …;       /* big condensed headings */
--font-body: "Space Grotesk", …;  /* paragraphs */
--font-mono: "Space Mono", …;     /* nav, labels, buttons */
--font-blackletter: "UnifrakturMaguntia", …; /* the "Sjbit" mark */
```

To use a different Google Font, change the `<link href="https://fonts.googleapis.com/…">` line in `index.html` **and** the matching `--font-…` variable.

To change the size of the hero heading, edit `font-size` in `.hero__title` (marked `← hero heading size`).

## 4. Add / edit team members

Open `script.js` and find `const TEAM = [`. Each member is one block:

```js
{ name: 'Your Name', role: 'Photographer', group: 'member',
  dept: 'CSE · 2nd Year', photo: 'assets/team/your-name.jpg',
  bio: 'Optional short line', instagram: 'https://instagram.com/…' },
```

- `group` decides where the card goes: `'lead'` (big cards at the top), `'core'`, or `'member'`.
- Put the photo in `assets/team/`. Portrait photos (4:5 ratio, e.g. 600×750px) look best.
- `dept`, `bio` and `instagram` are optional. Use `''` to leave one out.
- To remove someone, delete their block. The team counter updates on its own.

## 5. Add upcoming events

In `script.js`, find `const UPCOMING_EVENTS = [` and copy a block:

```js
{ title: 'Event Name', date: '2027-04-10', time: '10:00 AM', venue: 'Auditorium',
  category: 'Workshop', poster: 'assets/events/my-poster.jpg',
  registerUrl: 'https://forms.gle/…',   // or '' → shows "Details soon"
  description: 'One or two sentences.' },
```

- Dates use the `YYYY-MM-DD` format. Events are sorted by date automatically.
- The **earliest** event becomes the big featured event, with a countdown.
- `EVENTS_VISIBLE_AT_START` sets how many rows show before **Explore all events** is clicked.

### Manage upcoming events from a Google Sheet (no code edits)

1. Create a Google Sheet. In row 1 type these headers exactly:
   `title | date | time | venue | category | poster | registerUrl | description`
2. One event per row. `date` must be `YYYY-MM-DD` (e.g. `2026-12-05`). Select the date column → **Format → Number → Plain text** so Sheets doesn't change it.
   `poster` is a path like `assets/events/my-poster.jpg` or a full image URL. `registerUrl` can be blank.
3. **File → Share → Publish to web** → choose your sheet tab and **Comma-separated values (.csv)** → **Publish** → copy the link.
4. In `script.js`, paste that link into `EVENTS_SHEET_CSV_URL = '…'` (one time only).

From then on, edit the sheet and the website updates on the next page load (published sheets can take a few minutes to refresh). If the sheet can't be reached, the site shows the built-in list.

## 6. Add past events (gallery photos & videos)

1. Make a folder: `assets/gallery/my-event-26/`
2. Add `cover.jpg` plus photos named `01.jpg`, `02.jpg`, `03.jpg` …
3. In `script.js`, find `const ARCHIVE_EVENTS = [` and add a block:

```js
{ id: 'my-event-26', title: 'My Event', subtitle: 'Optional tagline',
  category: 'cultural',            // cultural | technical | sports | other
  date: '2026-05-01', venue: 'Main Stage',
  cover: 'assets/gallery/my-event-26/cover.jpg',
  description: 'What happened…',
  photos: photoSet('my-event-26', 12),   // → 01.jpg … 12.jpg
  videos: [{ title: 'Aftermovie', youtubeId: 'dQw4w9WgXcQ' }],
  reels:  [{ title: 'Highlights reel', url: 'https://www.instagram.com/reel/…' }],
  instagram: ['https://www.instagram.com/reel/ABC123/', 'https://www.instagram.com/p/XYZ789/'] },
```

- `instagram` **embeds** real Instagram reels and posts inside the event pop-up (an "On Instagram" section). Paste the normal link of any **public** reel or post. Leave it out if you have none.
- `reels` only shows plain links; use `instagram` when you want the reel playing on the page.

- `id` must match the folder name.
- `youtubeId` is the part after `v=` in a YouTube link. For a video that isn't on YouTube (Google Drive, Instagram …), use `{ title: '…', url: 'https://…' }` instead.
- If your photos have other names, list them yourself: `photos: ['assets/gallery/x/a.jpg', 'assets/gallery/x/b.jpg']`.
- Leave `videos: []` or `reels: []` empty if there aren't any.
- The filter buttons and their counts update on their own.

Keep photos around **1600px wide or smaller** and compress them (for example with squoosh.app) so the site stays fast.

## 7. Change social links, email & the Join form

Every link is plain HTML in `index.html`. Change the `href="…"` and save — that's it. Use VS Code's **Find** (Ctrl + F) to locate each one:

| Search for | What it is |
|---|---|
| `instagram.com` | Instagram (navbar, mobile menu, contact, social icons) |
| `youtube.com` | YouTube (navbar, social icons) |
| `linkedin.com`, `x.com` | LinkedIn and X icons |
| `mailto:` | Email links + the **Join the club** button |
| `tel:` | Phone number |

To connect the **Join the club** button to a Google Form, replace its `href` with your form link, for example:

```html
<a class="btn btn--accent btn--big" href="https://forms.gle/abc123" target="_blank" rel="noopener">Join the club …</a>
```

The visible **text** next to each link (your @handle, email, phone and address) is edited in the same place.

If `joinFormUrl` is left empty, **Join the club** opens an email to your club address instead. To connect a Google Form, create the form, click **Send → link**, and paste that link here.

To remove a social icon, delete its `<li>` in the `socials` list in `index.html`.

## 8. Deploy (free)

### GitHub Pages
1. Create a new repository on GitHub and upload the **contents** of `creonix-website/`, so `index.html` sits at the top level.
2. Go to **Settings → Pages**, set *Source* to **Deploy from a branch**, then choose `main` / `(root)` and click **Save**.
3. After about a minute the site is live at `https://<username>.github.io/<repo>/`.

### Netlify
1. Go to https://app.netlify.com/drop.
2. Drag the `creonix-website` folder onto the page.
3. The site is live straight away. You can rename it under **Site settings → Change site name**.

To update the site later, re-upload or push your changes. Both services redeploy automatically.

---

**Accessibility:** animations switch off automatically for visitors who have "reduce motion" turned on in their system settings. All menus, filters and the event pop-up also work with the keyboard: Tab moves between controls and Esc closes the pop-up.
