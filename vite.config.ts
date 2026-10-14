import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every asset path relative, so the same build works on
// Netlify, Vercel, Cloudflare Pages, or a GitHub Pages sub-path (/repo-name/)
// without changing configuration. This is safe because the site uses
// hash-based routing (#/notes/slug), so the server only ever serves index.html.
export default defineConfig({
  base: './',
  plugins: [react()],
});
