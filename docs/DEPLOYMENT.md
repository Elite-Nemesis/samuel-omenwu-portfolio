# Deployment

## GitHub vs. hosting: they are different jobs

- **GitHub stores your code** and its history. A repository is not a website.
- **A host serves the built site** (`dist/`) to visitors. The host runs `npm run build` and puts the result on a fast global network.

The usual setup is to connect the host to your GitHub repo. Every `git push` to `main` then rebuilds and redeploys automatically.

GitHub *does* offer a hosting product, **GitHub Pages**, which is fine for static sites like this one. Dedicated hosts add conveniences GitHub Pages lacks or makes harder, such as preview deployments for every branch, custom headers, and simpler custom-domain setup.

| Host | Free tier fits a portfolio? | Notable |
| --- | --- | --- |
| **Netlify** | Yes | Very simple setup; deploy previews for branches. |
| **Vercel** | Yes (Hobby plan, non-commercial) | Fast setup; deploy previews. |
| **Cloudflare Pages** | Yes | Generous limits; Cloudflare DNS if you buy a domain there. |
| **GitHub Pages** | Yes (public repos) | Everything stays on GitHub; deploys via a GitHub Actions workflow. |

Plans and limits change, so check each provider's current pricing page before choosing. Any of them works because the site is plain static files.

**Recommendation:** Netlify or Cloudflare Pages for the simplest setup. GitHub Pages if you'd rather keep everything in one place.

All hosts use the same build settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output / publish directory | `dist` |
| Node version | 20 or newer |

No redirect rules are needed, because routing uses `#` URLs.

---

## Option A: Netlify

1. Push the project to GitHub (see the README).
2. Sign in at netlify.com with GitHub → **Add new site → Import an existing project** → pick the repo.
3. Build command `npm run build`, publish directory `dist` → **Deploy**.
4. You get a `*.netlify.app` URL. Rename it under **Site configuration → Site details**.

## Option B: Vercel

1. Sign in at vercel.com with GitHub → **Add New → Project** → import the repo.
2. Vercel detects Vite automatically (build `npm run build`, output `dist`) → **Deploy**.

## Option C: Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
2. Framework preset **Vite** (or build `npm run build`, output `dist`) → **Save and Deploy**.

## Option D: GitHub Pages

1. Create the file `.github/workflows/deploy.yml` with the contents below and push it.
2. On GitHub: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. After the workflow finishes, the site is at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The sub-path (`/REPO-NAME/`) works without changes because `vite.config.ts` uses `base: './'`. If you name the repo `YOUR-USERNAME.github.io`, the site is served at the root instead. The action versions above were current at the time of writing; GitHub's Pages docs list the latest ones.

---

## Custom domain (optional)

A domain like `samuelomenwu.com` looks more professional on a resume. Buy one from a registrar (Cloudflare, Porkbun, Namecheap, and others), then follow your host's "custom domain" guide. Each host shows the exact DNS records to add and provides HTTPS automatically.

After going live, update `index.html`: add `<meta property="og:url">` with your final URL, and optionally an `og:image` (1200×630) so links shared on LinkedIn show a preview card.
