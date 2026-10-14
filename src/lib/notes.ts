import { marked } from 'marked';
import { parseFrontMatter } from './frontMatter';
import { showPlaceholders } from '../content/placeholder';

/**
 * Loads every Markdown file in src/content/notes/ at build time.
 *
 * import.meta.glob is a Vite feature: it finds matching files and bundles their
 * text, so adding a post is just adding a .md file. No database or CMS.
 * The file name (minus .md) becomes the URL slug: #/notes/<slug>.
 */
const files = import.meta.glob('../content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Note {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  draft: boolean;
  html: string;
}

function toNote(path: string, source: string): Note {
  const { data, body } = parseFrontMatter(source);
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    // Posts are written by you and bundled at build time, so rendering their
    // HTML is safe. Never feed user-submitted text through this.
    html: marked.parse(body, { async: false }),
  };
}

/** All notes, newest first. Drafts are only included while placeholders are visible (dev). */
export const notes: Note[] = Object.entries(files)
  .map(([path, source]) => toNote(path, source))
  .filter((note) => !note.slug.startsWith('_')) // _template.md etc. are never shown
  .filter((note) => showPlaceholders || !note.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function findNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

export function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map(Number);
  // Built from parts (not new Date(iso)) so the date never shifts by time zone.
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
