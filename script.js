/* ==========================================================================
   CREONIX — script.js
   --------------------------------------------------------------------------
   Most of the time you only need to edit the DATA at the top of this file:

     (Links like Instagram, email and the Join form are written directly in index.html.)
     2. TEAM             → team members (photo, name, role …)
     3. UPCOMING_EVENTS   → upcoming events (poster, date, venue …)
     4. ARCHIVE_EVENTS    → past events (photos, videos, reels …)

   Below the data are the functions that build the page and run the
   animations. You don't need to touch them to update content.
   ========================================================================== */

'use strict';

/* ==========================================================================
   2. TEAM
   --------------------------------------------------------------------------
   group:  "lead"   → big cards at the top (President, Vice President)
           "core"   → core team grid
           "member" → compact members grid
   photo:  put the image in assets/team/ and write its path here.
           Portrait photos (4:5, e.g. 600×750px) look best.
   dept, bio and instagram are optional — use '' to leave them out.
   To add someone: copy one { … } block, paste it, and edit it.
   ========================================================================== */
const TEAM = [
  // ---- Leads ----
  { name: 'Aishwarya',   role: 'President',       group: 'lead', dept: 'AI/ML · 2nd Year', photo: 'assets/team/member-01.jpg', instagram: '',
    bio: 'Runs the show — from planning fest coverage to keeping our feed on brand. Shoots on a 50mm, thinks in campaigns.' },
  { name: 'Siri Suresh',      role: 'Vice President',  group: 'lead', dept: 'EEE · 2nd Year', photo: 'assets/team/member-02.jpg', instagram: '',
    bio: 'Keeps the crew in sync and the deadlines honest. Our go-to for storytelling, scripts and big-picture ideas.' },

  // ---- Core team ----
  { name: 'Sanjith',  role: 'Editing table head',        group: 'core', dept: 'ECE · 3rd Year',  photo: 'assets/team/member-03.jpg', bio: 'Sets the visual direction for every campaign we ship.' },
  { name: 'Sahana',   role: 'Creative design Lead',     group: 'core', dept: 'MECH · 3rd Year', photo: 'assets/team/member-04.jpg', bio: 'Leads the shooters at every fest, match and ceremony.' },
  { name: 'Harshitha',   role: 'podcast Lead',     group: 'core', dept: 'CSE · 3rd Year',  photo: 'assets/team/member-05.jpg', bio: 'Aftermovies, highlight cuts and the occasional drone shot.' },
  { name: 'Meera Nair',    role: 'Design Lead',          group: 'core', dept: 'AIML · 3rd Year', photo: 'assets/team/member-06.jpg', bio: 'Posters, carousels and the CREONIX visual system.' },
  { name: 'Ishaan Kulkarni', role: 'Content & Copy Lead', group: 'core', dept: 'ISE · 3rd Year', photo: 'assets/team/member-07.jpg', bio: 'Captions that land and scripts that hook in 3 seconds.' },
  { name: 'Sara Thomas',   role: 'Social Media Manager', group: 'core', dept: 'CSE · 3rd Year',  photo: 'assets/team/member-08.jpg', bio: 'Schedules, analytics and keeping the grid alive.' },

  // ---- Members ----
  { name: 'Nikhil Reddy',  role: 'Photographer',   group: 'member', dept: 'CIVIL · 2nd Year', photo: 'assets/team/member-09.jpg' },
  { name: 'Priya Hegde',   role: 'Video Editor',   group: 'member', dept: 'ECE · 2nd Year',   photo: 'assets/team/member-10.jpg' },
  { name: 'Arjun Das',     role: 'Graphic Designer', group: 'member', dept: 'CSE · 2nd Year', photo: 'assets/team/member-11.jpg' },
  { name: 'Tanya Bhat',    role: 'Reel Creator',   group: 'member', dept: 'AIML · 2nd Year',  photo: 'assets/team/member-12.jpg' },
  { name: 'Vikram Joshi',  role: 'Content Writer', group: 'member', dept: 'ISE · 1st Year',   photo: 'assets/team/member-13.jpg' },
  { name: 'Leah Fernandes', role: 'Photographer',  group: 'member', dept: 'MECH · 1st Year',  photo: 'assets/team/member-14.jpg' },
];


/* ==========================================================================
   3. UPCOMING EVENTS
   --------------------------------------------------------------------------
   date:   "YYYY-MM-DD" (used for sorting + the countdown)
   poster: put the image in assets/events/ (4:5 portrait looks best)
   registerUrl: optional — leave '' and the button shows "Details soon"
   The event with the EARLIEST date is shown as the big featured event.
   ========================================================================== */
/* --------------------------------------------------------------------------
   EDIT EVENTS WITHOUT TOUCHING CODE (Google Sheet)
   Paste your published-sheet CSV link between the quotes below.
   See README → "Manage upcoming events from a Google Sheet".
   Leave it '' to use the list below instead.
   -------------------------------------------------------------------------- */
const EVENTS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYc4TBpAugy2NVaMksuYnVS57yhVY8IH-MhjTHCg-xQ8mWCqi-CgLvBgHjj3iUbChaTvhuC5XiPaX-/pub?output=csv';

let UPCOMING_EVENTS = [
  { title: 'Frame Fest',      date: '2026-12-05', time: '9:00 AM',  venue: 'Main Quadrangle',  category: 'Photography',
    poster: 'assets/events/upcoming-01.jpg', registerUrl: 'https://forms.gle/your-form-id',
    description: 'A campus-wide photo walk and on-the-spot contest. Bring any camera — even your phone. Best frames get featured on our page.' },
  { title: 'Reel Rush',       date: '2026-12-18', time: '2:00 PM',  venue: 'Seminar Hall 2',   category: 'Video',
    poster: 'assets/events/upcoming-02.jpg', registerUrl: '',
    description: 'Shoot, cut and post a 60-second reel about campus life in just four hours.' },
  { title: 'Poster Lab',      date: '2027-01-10', time: '10:30 AM', venue: 'Design Studio, Block B', category: 'Workshop',
    poster: 'assets/events/upcoming-03.jpg', registerUrl: '',
    description: 'Hands-on design workshop: typography, layouts and making posters people actually stop for.' },
  { title: 'Spectrum ’27',    date: '2027-02-14', time: 'All day',  venue: 'SJBIT Campus',     category: 'Fest coverage',
    poster: 'assets/events/upcoming-04.jpg', registerUrl: '',
    description: 'The annual cultural fest — and our biggest coverage of the year. Volunteer shooters wanted.' },
  { title: 'Story Mode',      date: '2027-03-02', time: '3:00 PM',  venue: 'Auditorium',       category: 'Bootcamp',
    poster: 'assets/events/upcoming-05.jpg', registerUrl: '',
    description: 'A content-creation bootcamp on hooks, storytelling and growing an audience.' },
  { title: 'Open Mic Night',  date: '2027-03-20', time: '6:00 PM',  venue: 'Open Air Theatre', category: 'Meetup',
    poster: 'assets/events/upcoming-06.jpg', registerUrl: '',
    description: 'Creators, musicians and poets on one stage — filmed live by the CREONIX crew.' },
];

/* How many list rows to show before "Explore all events" is clicked */
const EVENTS_VISIBLE_AT_START = 3;


/* ==========================================================================
   4. ARCHIVE EVENTS (Gallery)
   --------------------------------------------------------------------------
   Give each past event its OWN folder: assets/gallery/<event-id>/
   category: 'cultural' | 'technical' | 'sports' | 'other'  (matches the filter buttons)
   cover:    image shown on the gallery card
   photos:   list of image paths shown inside the event popup
   videos:   [{ title, youtubeId }]  ← the ID is the part after "v=" in a YouTube link
             or [{ title, url }]      ← any other link (Instagram, Drive …)
   reels:    [{ title, url }]  (optional — shown as plain links)
   instagram: ['https://www.instagram.com/reel/XXXX/', 'https://www.instagram.com/p/YYYY/']
             (optional — real Instagram reels & posts EMBEDDED in the popup.
              Paste the normal link of any PUBLIC reel or post.)
   Newest events first looks best.
   ========================================================================== */

/* Helper: builds ['assets/gallery/id/01.jpg', … ] so you don't type every path.
   You can also just write the list of paths by hand. */
const photoSet = (id, count) => Array.from({ length: count }, (_, i) => `assets/gallery/${id}/${String(i + 1).padStart(2, '0')}.jpg`);

// REPLACE: placeholder video (Blender's open-licence short film). Use your own YouTube IDs.
const PLACEHOLDER_YT = 'aqz-KE-bpKQ';

const ARCHIVE_EVENTS = [
  { id: 'spectrum-26', title: 'Jamming Session', subtitle: 'Annual Cultural Fest', category: 'cultural',
    date: '2026-11-14', venue: 'MBA Lawn', cover: 'assets/gallery/spectrum-26/cover.jpg',
    description: 'Three days, twelve stages and one very tired camera crew. We covered every performance, every crowd surge and every backstage moment of SJBIT’s biggest cultural fest — and turned it into an aftermovie seen across campus.',
    photos: photoSet('spectrum-26', 5),
    videos: [{ title: 'Official Aftermovie', youtubeId: PLACEHOLDER_YT }],
    reels: [{ title: 'Day 1 highlights', url: 'https://www.instagram.com/' }, { title: 'Pro-show reel', url: 'https://www.instagram.com/' }] },

  { id: 'techverse-26', title: 'Techverse', subtitle: 'National Tech Symposium', category: 'technical',
    date: '2026-02-20', venue: 'Auditorium & Labs', cover: 'assets/gallery/techverse-26/cover.jpg',
    description: 'Robot wars, paper presentations and a keynote that filled the auditorium. Our team documented the projects, the people and the late-night builds.',
    photos: photoSet('techverse-26', 5),
    videos: [{ title: 'Highlight film', youtubeId: PLACEHOLDER_YT }], reels: [] },

  { id: 'sports-meet-25', title: 'Annual Sports Meet', subtitle: 'Track & Field', category: 'sports',
    date: '2025-12-12', venue: 'SJBIT Grounds', cover: 'assets/gallery/sports-meet-25/cover.jpg',
    description: 'Photo finishes, relay drama and a record-breaking long jump — captured frame by frame from the sidelines.',
    photos: photoSet('sports-meet-25', 5), videos: [],
    reels: [{ title: '100m final in slow-mo', url: 'https://www.instagram.com/' }] },

  { id: 'freshers-25', title: 'Freshers’ Welcome', subtitle: 'Batch of 2029', category: 'other',
    date: '2025-10-03', venue: 'Open Air Theatre', cover: 'assets/gallery/freshers-25/cover.jpg',
    description: 'The first day for a new batch. We set up a photo booth, filmed the welcome show and made sure every fresher had a picture to post.',
    photos: photoSet('freshers-25', 5),
    videos: [{ title: 'Welcome film', youtubeId: PLACEHOLDER_YT }], reels: [] },

  { id: 'codesprint-25', title: 'CodeSprint 24H', subtitle: 'Hackathon', category: 'technical',
    date: '2025-09-18', venue: 'CSE Block', cover: 'assets/gallery/codesprint-25/cover.jpg',
    description: 'Twenty-four hours, sixty teams and a lot of coffee. Our time-lapse of the night shift became one of our most-watched reels.',
    photos: photoSet('codesprint-25', 5), videos: [],
    reels: [{ title: '24 hours in 30 seconds', url: 'https://www.instagram.com/' }] },

  { id: 'rhythm-night-25', title: 'Rhythm Night', subtitle: 'Battle of the Bands', category: 'cultural',
    date: '2025-08-29', venue: 'Main Stage', cover: 'assets/gallery/rhythm-night-25/cover.jpg',
    description: 'Six bands, one trophy, and our photographers right at the barricade for every chord.',
    photos: photoSet('rhythm-night-25', 5),
    videos: [{ title: 'Live set highlights', youtubeId: PLACEHOLDER_YT }],
    reels: [{ title: 'Winning performance', url: 'https://www.instagram.com/' }] },

  { id: 'cricket-cup-25', title: 'Inter-College Cricket Cup', subtitle: 'Finals', category: 'sports',
    date: '2025-04-11', venue: 'SJBIT Cricket Ground', cover: 'assets/gallery/cricket-cup-25/cover.jpg',
    description: 'A last-over finish and a pitch invasion we’ll never forget. Full match coverage plus player portraits.',
    photos: photoSet('cricket-cup-25', 5),
    videos: [{ title: 'Final over', youtubeId: PLACEHOLDER_YT }], reels: [] },

  { id: 'convocation-25', title: 'Convocation 2025', subtitle: 'Graduation Day', category: 'other',
    date: '2025-03-01', venue: 'Convention Hall', cover: 'assets/gallery/convocation-25/cover.jpg',
    description: 'Caps in the air. We photographed every graduate on stage and delivered the full album the same week.',
    photos: photoSet('convocation-25', 5), videos: [], reels: [] },
];


/* ==========================================================================
   5. HELPERS
   ========================================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const pad = (n) => String(n).padStart(2, '0');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** "2026-12-05" → Date (local time, so the day never shifts) */
const toDate = (iso) => new Date(`${iso}T00:00:00`);

/** Format a date, e.g. formatDate('2026-12-05') → "5 Dec 2026" */
function formatDate(iso, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return toDate(iso).toLocaleDateString('en-GB', options);
}

/** Whole days from today until the given date (negative if it has passed) */
function daysUntil(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((toDate(iso) - today) / 86400000);
}

/** Minimal CSV parser (handles quotes, commas and line breaks inside cells) */
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/** Loads upcoming events from the Google Sheet. Any problem → keeps the built-in list. */
async function loadEventsFromSheet() {
  if (!EVENTS_SHEET_CSV_URL) return;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(EVENTS_SHEET_CSV_URL, { signal: ctrl.signal, cache: 'no-cache' });
    clearTimeout(timer);
    if (!res.ok) throw new Error(res.status);
    const [head, ...rows] = parseCSV(await res.text());
    const keys = head.map((h) => h.trim());
    const events = rows
      .map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] || '').trim()])))
      .filter((e) => e.title && /^\d{4}-\d{2}-\d{2}$/.test(e.date))
      .map((e) => ({ ...e, poster: e.poster || 'assets/events/upcoming-01.jpg' }));
    if (events.length) UPCOMING_EVENTS = events;
  } catch (err) {
    console.warn('CREONIX: could not load events sheet, using built-in list.', err);
  }
}

const CATEGORY_LABELS = { cultural: 'Cultural', technical: 'Technical', sports: 'Sports', other: 'Other' };


/* ==========================================================================
   6. RENDER: TEAM
   ========================================================================== */
function memberCard(member, index, variant) {
  const showBio = member.bio && variant !== 'member';
  return `
    <article class="member member--${variant}" data-reveal style="--delay:${(index % 3) * 0.08}s">
      <figure class="member__photo">
        <img src="${member.photo}" alt="Portrait of ${member.name}, ${member.role}" loading="lazy" width="600" height="750" />
        <span class="member__num">${pad(index + 1)}</span>
      </figure>
      <div class="member__info">
        <span class="member__role">${member.role}</span>
        <h4 class="member__name">${member.name}</h4>
        ${member.dept ? `<p class="member__dept">${member.dept}</p>` : ''}
        ${showBio ? `<p class="member__bio">${member.bio}</p>` : ''}
        ${member.instagram ? `<a class="member__social" href="${member.instagram}" target="_blank" rel="noopener">Instagram ↗</a>` : ''}
      </div>
    </article>`;
}

function renderTeam() {
  const groups = { lead: '#teamLeads', core: '#teamCore', member: '#teamMembers' };
  Object.entries(groups).forEach(([group, selector]) => {
    const container = $(selector);
    if (!container) return;
    container.innerHTML = TEAM
      .filter((m) => m.group === group)
      .map((m, i) => memberCard(m, i, group))
      .join('');
  });
  const count = $('#teamCount');
  if (count) count.textContent = pad(TEAM.length);
}


/* ==========================================================================
   7. RENDER: UPCOMING EVENTS
   ========================================================================== */
function countdownLabel(iso) {
  const d = daysUntil(iso);
  if (d > 1) return `In ${d} days`;
  if (d === 1) return 'Tomorrow';
  if (d === 0) return 'Today';
  return 'Concluded';
}

function registerButton(event, className) {
  return event.registerUrl
    ? `<a class="${className}" href="${event.registerUrl}" target="_blank" rel="noopener">Register ↗</a>`
    : `<span class="${className} is-soon">Details soon</span>`;
}

function renderEvents() {
  const featuredEl = $('#eventFeatured');
  const listEl = $('#eventList');
  if (!featuredEl || !listEl || !UPCOMING_EVENTS.length) return;

  const events = [...UPCOMING_EVENTS].sort((a, b) => toDate(a.date) - toDate(b.date));
  const [featured, ...rest] = events;

  featuredEl.innerHTML = `
    <div class="featured__poster" data-reveal>
      <span class="featured__countdown">${countdownLabel(featured.date)}</span>
      <figure><img src="${featured.poster}" alt="${featured.title} poster" loading="lazy" width="800" height="1000" /></figure>
    </div>
    <div class="featured__body" data-reveal style="--delay:.1s">
      <span class="featured__label">Next up · ${featured.category}</span>
      <h3 class="featured__title">${featured.title}</h3>
      <dl class="featured__meta">
        <div><dt>Date</dt><dd>${formatDate(featured.date, { weekday: 'short', day: 'numeric', month: 'short' })}</dd></div>
        <div><dt>Time</dt><dd>${featured.time || 'TBA'}</dd></div>
        <div><dt>Venue</dt><dd>${featured.venue}</dd></div>
      </dl>
      <p class="featured__desc">${featured.description}</p>
      ${featured.registerUrl
        ? `<a class="btn btn--dark" href="${featured.registerUrl}" target="_blank" rel="noopener">Register now <span class="btn__arrow" aria-hidden="true">↗</span></a>`
        : `<span class="btn btn--dark">Registrations open soon</span>`}
    </div>`;

  listEl.innerHTML = rest.map((ev, i) => {
    const extra = i >= EVENTS_VISIBLE_AT_START;
    return `
      <li class="event-row${extra ? ' is-extra' : ''}" data-poster="${ev.poster}" ${extra ? 'hidden' : 'data-reveal'}>
        <div class="event-row__date">
          <span class="d">${formatDate(ev.date, { day: '2-digit' })}</span>
          <span class="m">${formatDate(ev.date, { month: 'short' })} ’${ev.date.slice(2, 4)}</span>
        </div>
        <img class="event-row__thumb" src="${ev.poster}" alt="" loading="lazy" width="800" height="1000" />
        <div class="event-row__main"><h3>${ev.title}</h3><p>${ev.description}</p></div>
        <div class="event-row__venue"><span>Venue</span>${ev.venue}</div>
        <span class="event-row__cat">${ev.category}</span>
        ${registerButton(ev, 'event-row__cta')}
      </li>`;
  }).join('');

  // Hide the "Explore all" button if there is nothing extra to show
  const moreBtn = $('#eventsMore');
  if (moreBtn && rest.length <= EVENTS_VISIBLE_AT_START) moreBtn.parentElement.hidden = true;
}

/* "Explore all events" toggles the extra rows */
function initEventsToggle() {
  const btn = $('#eventsMore');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    $$('.event-row.is-extra').forEach((row) => {
      row.hidden = open;
      if (!open) {
        row.classList.remove('is-entering');
        void row.offsetWidth; // restart animation
        row.classList.add('is-entering');
      }
    });
    btn.setAttribute('aria-expanded', String(!open));
    btn.innerHTML = open
      ? 'Explore all events <span class="btn__arrow" aria-hidden="true">↓</span>'
      : 'Show fewer <span class="btn__arrow" aria-hidden="true">↑</span>';
    if (open) $('#eventList').scrollIntoView({ block: 'start' });
  });
}

/* Floating poster preview that follows the mouse over event rows (desktop only) */
function initEventPreview() {
  const preview = $('#eventPreview');
  const list = $('#eventList');
  if (!preview || !list || !canHover) return;
  const img = $('img', preview);

  list.addEventListener('mouseover', (e) => {
    const row = e.target.closest('.event-row');
    if (!row) return;
    if (img.getAttribute('src') !== row.dataset.poster) img.src = row.dataset.poster;
    preview.classList.add('is-visible');
  });
  list.addEventListener('mouseleave', () => preview.classList.remove('is-visible'));
  list.addEventListener('mousemove', (e) => {
    preview.style.left = `${e.clientX + 140}px`;
    preview.style.top = `${e.clientY}px`;
  });
}


/* ==========================================================================
   8. RENDER: ARCHIVE + FILTERS
   ========================================================================== */
function renderArchive() {
  const grid = $('#archiveGrid');
  if (!grid) return;

  grid.innerHTML = ARCHIVE_EVENTS.map((ev, i) => {
    const media = [`${ev.photos.length} photos`];
    if (ev.videos.length) media.push(`${ev.videos.length} film${ev.videos.length > 1 ? 's' : ''}`);
    if (ev.reels.length) media.push(`${ev.reels.length} reel${ev.reels.length > 1 ? 's' : ''}`);
    return `
      <article class="archive-card" data-category="${ev.category}" data-reveal style="--delay:${(i % 3) * 0.08}s">
        <button class="archive-card__btn" type="button" data-event-id="${ev.id}" aria-label="Open the ${ev.title} archive">
          <img src="${ev.cover}" alt="" loading="lazy" />
          ${ev.videos.length ? '<span class="archive-card__play">▶ Film</span>' : ''}
          <div class="archive-card__overlay">
            <span class="archive-card__cat">${CATEGORY_LABELS[ev.category] || ev.category}</span>
            <h3>${ev.title}</h3>
            <p>${formatDate(ev.date, { month: 'short', year: 'numeric' })} · ${media.join(' · ')}</p>
            <span class="archive-card__cta">View story →</span>
          </div>
        </button>
      </article>`;
  }).join('');

  // Show how many events are in each filter (the little numbers on the buttons)
  $$('.filter').forEach((btn) => {
    const f = btn.dataset.filter;
    const n = f === 'all' ? ARCHIVE_EVENTS.length : ARCHIVE_EVENTS.filter((ev) => ev.category === f).length;
    $('sup', btn).textContent = pad(n);
  });
}

function initFilters() {
  const buttons = $$('.filter');
  const empty = $('#archiveEmpty');

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    buttons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    let shown = 0;
    $$('.archive-card').forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.hidden = !match;
      if (match) {
        shown++;
        card.classList.add('is-visible');
        card.classList.remove('is-entering');
        void card.offsetWidth; // restart the entrance animation
        card.classList.add('is-entering');
      }
    });
    if (empty) empty.hidden = shown > 0;
  }));
}


/* ==========================================================================
   9. EVENT DETAIL MODAL
   ========================================================================== */
let lastTrigger = null; // the card that opened the modal (focus returns here)

function videoMarkup(video, ev) {
  if (video.youtubeId) {
    return `
      <div>
        <button class="video-card" type="button" data-yt="${video.youtubeId}" aria-label="Play ${video.title}">
          <img src="${ev.cover}" alt="" loading="lazy" />
          <span class="video-card__play" aria-hidden="true">▶</span>
          <span class="video-card__label">${video.title}</span>
        </button>
        <a class="video-link" href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" rel="noopener">Watch on YouTube ↗</a>
      </div>`;
  }
  return `
    <div>
      <a class="video-card" href="${video.url}" target="_blank" rel="noopener">
        <img src="${ev.cover}" alt="" loading="lazy" />
        <span class="video-card__play" aria-hidden="true">▶</span>
        <span class="video-card__label">${video.title}</span>
      </a>
    </div>`;
}

/** Turns a normal Instagram reel/post link into an embeddable iframe (null if not valid) */
function instagramMarkup(url) {
  const m = String(url).match(/instagram\.com\/(?:[\w.]+\/)?(reels?|p|tv)\/([\w-]+)/i);
  if (!m) return '';
  const type = m[1].toLowerCase() === 'reels' ? 'reel' : m[1].toLowerCase();
  const src = `https://www.instagram.com/${type}/${m[2]}/embed/captioned/`;
  return `
    <div class="ig-embed">
      <iframe src="${src}" title="Instagram ${type === 'p' ? 'post' : 'reel'}" loading="lazy" scrolling="no"
        allowtransparency="true" allowfullscreen></iframe>
      <a class="video-link" href="${url}" target="_blank" rel="noopener">Open on Instagram ↗</a>
    </div>`;
}

/** The events currently visible with the active filter (for prev / next) */
const visibleArchive = () => $$('.archive-card:not([hidden]) [data-event-id]').map((b) => b.dataset.eventId);

function openEventModal(id) {
  const modal = $('#eventModal');
  const body = $('#modalBody');
  const ev = ARCHIVE_EVENTS.find((e) => e.id === id);
  if (!modal || !body || !ev) return;

  const list = visibleArchive();
  const pos = list.indexOf(id);
  const prev = ARCHIVE_EVENTS.find((e) => e.id === list[(pos - 1 + list.length) % list.length]);
  const next = ARCHIVE_EVENTS.find((e) => e.id === list[(pos + 1) % list.length]);

  body.innerHTML = `
    <figure class="modal__cover"><img src="${ev.cover}" alt="${ev.title}" /></figure>
    <div class="modal__meta">
      <span>${CATEGORY_LABELS[ev.category] || ev.category}</span>
      <span>${formatDate(ev.date, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      ${ev.venue ? `<span>${ev.venue}</span>` : ''}
    </div>
    <h2 class="modal__title" id="modalTitle">${ev.title}</h2>
    ${ev.subtitle ? `<p class="featured__label">${ev.subtitle}</p>` : ''}
    <p class="modal__desc">${ev.description}</p>

    ${ev.videos.length ? `<h3 class="modal__h">Films &amp; aftermovies</h3>
      <div class="modal__videos">${ev.videos.map((v) => videoMarkup(v, ev)).join('')}</div>` : ''}

    ${ev.reels.length ? `<h3 class="modal__h">Reels &amp; highlights</h3>
      <div class="modal__reels">${ev.reels.map((r) => `<a href="${r.url}" target="_blank" rel="noopener">${r.title} ↗</a>`).join('')}</div>` : ''}

    ${(ev.instagram || []).length ? `<h3 class="modal__h">On Instagram</h3>
      <div class="modal__ig">${ev.instagram.map(instagramMarkup).join('')}</div>` : ''}

    <h3 class="modal__h">Photographs ·${pad(ev.photos.length)}</h3>
    <div class="modal__photos">
      ${ev.photos.map((src, i) => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${ev.title} photo ${i + 1}" loading="lazy" /></a>`).join('')}
    </div>

    ${list.length > 1 ? `<nav class="modal__nav" aria-label="More stories">
      <button type="button" data-goto="${prev.id}"><span>← Previous</span>${prev.title}</button>
      <button type="button" data-goto="${next.id}"><span>Next →</span>${next.title}</button>
    </nav>` : ''}`;

  if (!modal.open) {
    modal.showModal();
    document.documentElement.classList.add('modal-open');
  }
  modal.scrollTop = 0;
}

function closeEventModal() {
  const modal = $('#eventModal');
  if (modal && modal.open) modal.close();
}

function initModal() {
  const modal = $('#eventModal');
  const grid = $('#archiveGrid');
  if (!modal || !grid) return;

  // Open from a card
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-event-id]');
    if (!btn) return;
    lastTrigger = btn;
    openEventModal(btn.dataset.eventId);
  });

  // Inside the modal: play video / go to prev-next
  modal.addEventListener('click', (e) => {
    if (e.target === modal) return closeEventModal(); // clicked the dark backdrop

    const play = e.target.closest('[data-yt]');
    if (play) {
      // Load the YouTube player only when asked (faster page, no autoplay surprises)
      play.outerHTML = `<div class="video-card"><iframe src="https://www.youtube-nocookie.com/embed/${play.dataset.yt}?autoplay=1&rel=0"
        title="Event video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      return;
    }
    const goto = e.target.closest('[data-goto]');
    if (goto) openEventModal(goto.dataset.goto);
  });

  $('#modalClose').addEventListener('click', closeEventModal);

  // Runs for the close button, Esc key and backdrop click
  modal.addEventListener('close', () => {
    $('#modalBody').innerHTML = ''; // stops any playing video
    document.documentElement.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
  });
}


/* ==========================================================================
   10. NAVIGATION
   ========================================================================== */
function initNav() {
  const nav = $('#nav');
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 20);
    // Hide on scroll down, show on scroll up (never while the menu is open)
    const menuOpen = document.documentElement.classList.contains('menu-open');
    nav.classList.toggle('is-hidden', !menuOpen && y > 500 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  update();

  // Highlight the link of the section on screen
  const links = $$('.nav__link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => observer.observe(s));
}

function initMobileMenu() {
  const toggle = $('#navToggle');
  const menu = $('#mobileMenu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  // Close if the screen is resized to desktop
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}


/* ==========================================================================
   11. ANIMATIONS
   ========================================================================== */

/* Fade/slide elements in as they scroll into view */
function initReveal() {
  const items = $$('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => observer.observe(el));
}

/* Count the stats up from 0 when they appear */
function initCounters() {
  const counters = $$('[data-count]');
  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reducedMotion) { el.textContent = target + suffix; return; }
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => observer.observe(el));
}

/* Gentle parallax on the hero photos */
function initParallax() {
  const items = $$('[data-parallax]');
  const hero = $('.hero');
  if (reducedMotion || !items.length || !hero) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    if (y < hero.offsetHeight) {
      items.forEach((el) => el.style.setProperty('--py', `${(y * Number(el.dataset.parallax)).toFixed(1)}px`));
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* Back-to-top button */
function initBackToTop() {
  const btn = $('#toTop');
  if (!btn) return;
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 800);
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
  toggle();
}


/* ==========================================================================
   12. FOOTER YEAR (links are plain HTML — edit them in index.html)
   ========================================================================== */
function setFooterYear() {
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}


/* ==========================================================================
   13. START EVERYTHING
   ========================================================================== */
document.addEventListener('DOMContentLoaded', async () => {
  setFooterYear();
  renderTeam();
  await loadEventsFromSheet();   // no-op unless EVENTS_SHEET_CSV_URL is set
  renderEvents();
  renderArchive();

  initNav();
  initMobileMenu();
  initEventsToggle();
  initEventPreview();
  initFilters();
  initModal();
  initReveal();     // after rendering, so generated cards animate too
  initCounters();
  initParallax();
  initBackToTop();

  // Triggers the hero entrance animation
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
});

/* ==========================================================================
   ABOUT CREATOR POP-UP  (button: [data-creator-open] in the hero strip)
   ========================================================================== */
(function () {
  const modal = document.getElementById('creatorModal');
  if (!modal) return;
  let trigger = null;
  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-creator-open]');
    if (open) {
      trigger = open;
      modal.showModal();
      document.documentElement.classList.add('modal-open');
      return;
    }
    // Close: the X button or a click on the dark backdrop
    if (e.target === modal || e.target.closest('[data-creator-close]')) modal.close();
  });
  modal.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    if (trigger) trigger.focus();
  });
})();
