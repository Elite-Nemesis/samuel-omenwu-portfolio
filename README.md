# Samuel Omenwu — Portfolio

Personal portfolio site built with **React**, **TypeScript**, **Vite**, and plain CSS.
It's a single static page with a Build Notes blog. There's no server or database, so it can be hosted on any static host.

---

## Quick start

Requires **Node.js 20 or newer** (check with `node -v`).

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with instant reload. **Placeholders are visible.** |
| `npm run build` | Type-checks, then builds the production site into `dist/`. **Placeholders are removed.** |
| `npm run preview` | Serves the `dist/` build locally so you can check it before deploying. |
| `npm run typecheck` | TypeScript check only. |
| `npm test` | Runs the unit tests (Vitest). |

To preview the production build *with* placeholders visible:
`VITE_SHOW_PLACEHOLDERS=true npm run build && npm run preview`

---

## Folder structure

```
samuel-portfolio/
├── index.html                  Page shell: <title>, meta description, favicon
├── vite.config.ts              Build config (relative asset paths)
├── tsconfig.json               TypeScript settings (strict mode)
├── public/                     Copied to the site as-is
│   ├── favicon.svg
│   ├── resume/                 ← put your resume PDF here
│   └── images/projects/        ← put project screenshots here
├── src/
│   ├── main.tsx                Entry point: mounts <App /> and loads the CSS
│   ├── App.tsx                 Chooses the home page or a note page from the URL
│   ├── content/                ★ EVERYTHING YOU EDIT REGULARLY LIVES HERE
│   │   ├── site.ts             Name, headline, about text, email, links, resume
│   │   ├── projects.ts         Projects and their case-study details
│   │   ├── skills.ts           Skill categories and certificates
│   │   ├── placeholder.ts      The todo() helper (see below)
│   │   └── notes/*.md          Build Notes posts, one Markdown file each
│   ├── sections/               One component per home-page section
│   │   ├── Hero.tsx  About.tsx  Projects.tsx  Skills.tsx  Notes.tsx  Contact.tsx
│   ├── components/             Shared pieces: Header, Footer, Section, ProjectCaseStudy, Placeholder
│   ├── pages/NotePage.tsx      A single Build Notes post
│   ├── lib/                    Logic with no UI
│   │   ├── useHashRoute.ts     Tiny router (#/notes/slug)
│   │   ├── notes.ts            Loads and renders the Markdown posts
│   │   ├── frontMatter.ts      Reads the title/date block at the top of a post
│   │   ├── frontMatter.test.ts Unit tests for the above
│   │   ├── useReveal.ts        Scroll fade-in animation
│   │   └── useActiveSection.ts Highlights the current section in the nav
│   └── styles/global.css       All styles; design tokens at the top
└── docs/
    ├── DEPLOYMENT.md           Hosting options and step-by-step deploys
    └── CHECKLIST.md            Pre-launch testing checklist
```

---

## Updating content

### Placeholders: how unfinished content stays hidden

Anything not written yet is wrapped in `todo("...")`:

```ts
problem: todo('In 2–3 sentences: what problem do small retail shops have...'),
```

- In `npm run dev` it shows as a **dashed yellow "Placeholder" box** describing what's needed.
- In `npm run build` it is **removed completely**. Whole blocks with no real content (for example "Challenges") disappear too.

To fill one in, replace the `todo(...)` with a plain string:

```ts
problem: 'Small shops often track sales on paper or in a spreadsheet, which makes ...',
```

TypeScript enforces this: a field typed `Maybe<string>` accepts either a real string or a `todo()`, and nothing else.

### Your contact details and resume — `src/content/site.ts`
1. Replace the `todo(...)` values for `email`, GitHub, and LinkedIn.
2. Save your resume as `public/resume/Samuel-Omenwu-Resume.pdf`.
3. Set `resumeUrl: './resume/Samuel-Omenwu-Resume.pdf'`.

### Projects — `src/content/projects.ts`
- **Screenshots:** save images to `public/images/projects/pos-system/` (PNG or WebP, about 1600px wide), then set `src: './images/projects/pos-system/checkout.png'`. Write a real `alt` description of what each image shows.
- **Links:** set `github` to the repository URL. For a desktop app, a 1–2 minute screen recording (YouTube unlisted or Loom) is the usual "demo".
- **New project:** copy the whole object inside the `projects` array, change `slug` (lowercase-with-dashes), and set `featured: false`.

### Skills — `src/content/skills.ts`
Add or remove items in the lists. To link a certificate, add `url: 'https://...'`.

### Build Notes — `src/content/notes/`
1. Copy `_template.md` to a new file, e.g. `fixing-stock-count-bug.md`. The file name becomes the URL: `#/notes/fixing-stock-count-bug`.
2. Edit the front matter at the top (title, date as `YYYY-MM-DD`, summary, tags).
3. Write the post in Markdown.
4. Keep `draft: true` while writing (visible in dev, hidden in production). Set `draft: false` to publish.

Two drafts are included: **"How this portfolio is built"** describes the real setup but should be rewritten in your words. **"How I use Claude"** is prompts only, because it has to come from your own experience.

---

## How the code works (interview notes)

**Why this stack?** A portfolio is mostly static content. Vite + React + TypeScript gives a fast dev loop, typed content, and a build that outputs plain HTML/CSS/JS. Plain CSS keeps the styling readable without learning a framework's conventions. The only runtime dependencies are React and `marked` (Markdown to HTML).

**Content is separated from presentation.** Components in `sections/` and `components/` never contain your personal facts. They read from `content/`. This is the same idea as separating data from views in a Spring app.

**The placeholder system** (`content/placeholder.ts`). `todo()` returns an object `{ todo: "..." }` instead of a string. `isPlaceholder()` tells them apart, and the `<Field>` component renders real values normally and placeholders only when `showPlaceholders` is true. `showPlaceholders` comes from `import.meta.env.DEV`, a flag Vite sets to `true` in development and `false` in production builds.

**Routing** (`lib/useHashRoute.ts`). There are only two kinds of page: home and a note. The hook reads `window.location.hash`, turns it into a `Route` object, and re-renders on the browser's `hashchange` event. Hash URLs (`#/notes/slug`) are handled entirely in the browser, so the host never needs rewrite rules. *Tradeoff:* hash URLs are slightly less clean and less SEO-friendly than `/notes/slug`. If the blog grows, switching to a static-site generator or React Router with pre-rendering would be the next step.

**Markdown posts** (`lib/notes.ts`). `import.meta.glob` is a Vite feature that bundles every `.md` file in a folder at build time. `parseFrontMatter` (about 25 lines, with unit tests) reads the `key: value` header, and `marked` converts the body to HTML. Rendering HTML with `dangerouslySetInnerHTML` is safe here because only you write the posts. It would not be safe for user-submitted text.

**Animation** (`lib/useReveal.ts`). An `IntersectionObserver` adds `is-visible` when an element scrolls into view, and CSS does the fade. Content is visible by default: the hidden starting state only applies once JavaScript adds a class, and never when the user has "reduce motion" on.

**Accessibility decisions:** skip link; one `<h1>` per page with headings in order; `<nav>`, `<main>`, `<footer>` landmarks; `aria-expanded` on the mobile menu and Escape to close it; `aria-current` on the active nav link; visible focus rings; focus moves to the post title on page change; 44px touch targets; text contrast meets WCAG AA in light and dark mode; links that open new tabs say so to screen readers.

**Performance:** no web fonts (system font stack), no images above the fold, lazy-loaded screenshots with fixed dimensions to avoid layout shift. The build is about 90 KB of gzipped JavaScript and 4 KB of CSS.

---

## Version control

```bash
cd samuel-portfolio
git init
git add .
git commit -m "Initial portfolio: React + TypeScript + Vite"
git branch -M main
# Create an empty repo on github.com first (no README), then:
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

Commit in small, described steps (`git commit -m "Add POS screenshots"`). Your commit history is part of what a reviewer may look at.

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**. Before launch, go through **[docs/CHECKLIST.md](docs/CHECKLIST.md)**.
