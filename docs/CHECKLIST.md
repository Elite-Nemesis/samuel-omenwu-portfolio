# Pre-launch checklist

Work through this before sharing the link, and again after big changes.

## Content and honesty
- [ ] `npm run dev` shows **no dashed placeholder boxes** you intended to fill (or you've accepted they'll be hidden).
- [ ] `npm run build && npm run preview`: the production site reads well with any remaining placeholders hidden.
- [ ] Every claim on the site is true and something you can explain in an interview.
- [ ] POS project: problem, your role (solo or team, and which parts), decisions, challenges, and lessons are written in your own words.
- [ ] Screenshots have descriptive `alt` text and contain no real customer data.
- [ ] Drafts you want live have `draft: false`. "How I use Claude" reflects your real process.
- [ ] Spelling and grammar checked (paste the text into a spell checker).

## Links
- [ ] Email link opens a new message with the correct address.
- [ ] GitHub and LinkedIn links go to *your* profiles.
- [ ] POS GitHub repo is public and has its own README with setup instructions and screenshots.
- [ ] Demo link works in a private/incognito window (not just while logged in).
- [ ] Resume downloads, opens, is up to date, and matches the site.
- [ ] Nav links jump to the right sections; "All Build Notes" returns to the list.
- [ ] Each note opens directly from a pasted URL (e.g. `.../#/notes/your-slug`).

## Mobile layouts
Test in browser dev tools (device toolbar) **and** on a real phone.
- [ ] 360px, 390px, 768px, 1024px, and 1440px widths: no sideways scrolling, nothing cut off.
- [ ] Menu button opens and closes the nav; tapping a link closes it.
- [ ] Buttons and links are easy to tap.
- [ ] Screenshots stack into one column on phones.
- [ ] Text is readable without zooming; zooming to 200% still works.
- [ ] Rotate the phone to landscape: still usable.

## Accessibility
- [ ] **Keyboard only** (unplug the mouse): Tab through the whole page. "Skip to content" appears first, focus is always visible, the order makes sense, Escape closes the menu.
- [ ] Lighthouse (Chrome DevTools → Lighthouse) Accessibility score reviewed, issues fixed.
- [ ] Run the free **axe DevTools** or **WAVE** browser extension. No errors.
- [ ] Dark mode (switch your OS setting): everything readable, nothing invisible.
- [ ] Turn on "Reduce motion" (macOS: Accessibility → Display; Windows: Accessibility → Visual effects): no fade animations.
- [ ] Try a screen reader briefly (VoiceOver: Cmd+F5 on Mac; NVDA on Windows): headings and links make sense out of context.

## Performance
- [ ] Lighthouse Performance on mobile reviewed.
- [ ] Screenshots compressed (aim for under ~300 KB each; WebP helps; squoosh.app is free).

## Deployment
- [ ] `npm test` and `npm run build` pass locally with no errors.
- [ ] Code pushed to GitHub; no secrets or personal files committed.
- [ ] Host connected to the repo; a push to `main` triggers a new deploy.
- [ ] Live site loads over **https://**.
- [ ] Live site checked on a phone over mobile data (not Wi-Fi).
- [ ] Browser tab title and favicon look right.
- [ ] Paste the live URL into a LinkedIn post draft (don't publish) to check the preview.
- [ ] Live URL added to your resume, LinkedIn, and GitHub profile.
