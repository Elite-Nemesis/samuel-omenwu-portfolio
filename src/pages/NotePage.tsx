import { useEffect, useRef } from 'react';
import { findNote, formatDate } from '../lib/notes';
import { site } from '../content/site';

export function NotePage({ slug }: { slug: string }) {
  const note = findNote(slug);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // On a client-side page change, move focus to the new heading so screen
  // reader and keyboard users start at the top of the post.
  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
    document.title = note ? `${note.title} — ${site.name}` : `Note not found — ${site.name}`;
  }, [note]);

  if (!note) {
    return (
      <div className="container article">
        <h1 ref={headingRef} tabIndex={-1} className="article__title">
          That note doesn't exist
        </h1>
        <p>
          It may have been renamed. <a href="#notes">See all Build Notes</a>.
        </p>
      </div>
    );
  }

  return (
    <article className="container article">
      <a className="back-link" href="#notes">
        <span aria-hidden="true">← </span>All Build Notes
      </a>
      <header className="article__header">
        <p className="eyebrow">
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          {note.tags.length > 0 && <span> · {note.tags.join(', ')}</span>}
          {note.draft && <span className="badge">Draft — hidden in production</span>}
        </p>
        <h1 ref={headingRef} tabIndex={-1} className="article__title">
          {note.title}
        </h1>
        {note.summary && <p className="article__summary">{note.summary}</p>}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
    </article>
  );
}
