import { Section } from '../components/Section';
import { formatDate, notes } from '../lib/notes';

export function Notes() {
  return (
    <Section
      id="notes"
      index="04"
      label="Build Notes"
      title="Notes from the work"
      intro="Short write-ups on technical decisions, tradeoffs, debugging, deployment, and how I use AI tools while still understanding the code."
    >
      {notes.length === 0 ? (
        <p className="notes__empty" data-reveal>
          The first notes are being written. Check back soon.
        </p>
      ) : (
        <ol className="notes" reversed>
          {notes.map((note) => (
            <li key={note.slug} className="note-item" data-reveal>
              <a className="note-item__link" href={`#/notes/${note.slug}`}>
                <span className="note-item__meta">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  {note.draft && <span className="badge">Draft — hidden in production</span>}
                </span>
                <span className="note-item__title">{note.title}</span>
                <span className="note-item__summary">{note.summary}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
