/**
 * Splits a Markdown file into its front matter (the key: value block between
 * the --- lines at the top) and its body.
 *
 *   ---
 *   title: Why I chose JavaFX
 *   date: 2026-10-01
 *   draft: true
 *   ---
 *   Post body in Markdown...
 *
 * It deliberately supports only simple "key: value" lines (strings, true/false,
 * and comma-separated lists for `tags`). That's all the posts need, and it
 * avoids pulling in a full YAML library.
 */

export type FrontMatterValue = string | boolean | string[];

export interface ParsedMarkdown {
  data: Record<string, FrontMatterValue>;
  body: string;
}

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontMatter(source: string): ParsedMarkdown {
  const match = source.match(FENCE);
  if (!match) return { data: {}, body: source };

  const data: Record<string, FrontMatterValue> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1 || line.trim().startsWith('#')) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    // Allow optional quotes: title: "Hello: world"
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);

    if (value === 'true' || value === 'false') data[key] = value === 'true';
    else if (key === 'tags') data[key] = value.split(',').map((t) => t.trim()).filter(Boolean);
    else data[key] = value;
  }

  return { data, body: source.slice(match[0].length) };
}
