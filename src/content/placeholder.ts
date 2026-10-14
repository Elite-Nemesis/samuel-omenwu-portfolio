/**
 * Placeholders — the safety net that keeps unfinished content off the live site.
 *
 * Any detail you haven't written yet is marked with todo("what goes here").
 * - In development (npm run dev) placeholders render as dashed "Placeholder" boxes
 *   so you can see exactly what's left to fill in.
 * - In the production build (npm run build) they are removed entirely, so a
 *   recruiter never sees an unfinished claim.
 *
 * To preview the production site WITH placeholders visible, build with
 *   VITE_SHOW_PLACEHOLDERS=true npm run build
 */

export type Placeholder = { readonly todo: string };

/** Marks content that still needs to be written by Samuel. */
export function todo(note: string): Placeholder {
  return { todo: note };
}

/** A field that is either real content or a placeholder. */
export type Maybe<T> = T | Placeholder;

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === 'object' && value !== null && 'todo' in value;
}

export const showPlaceholders: boolean =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true';

/** Returns real content, or undefined if the value is still a placeholder. */
export function real<T>(value: Maybe<T>): T | undefined {
  return isPlaceholder(value) ? undefined : value;
}
