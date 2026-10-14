import { Section } from '../components/Section';
import { Field } from '../components/Placeholder';
import { isPlaceholder, showPlaceholders } from '../content/placeholder';
import { site } from '../content/site';

export function Contact() {
  const rows = [
    ...site.links.map((link) => ({
      label: link.label,
      href: link.href,
      text: typeof link.display === 'string' ? link.display : undefined,
      download: false,
    })),
    { label: 'Resume', href: site.resumeUrl, text: 'Download PDF', download: true },
  ].filter((row) => showPlaceholders || !isPlaceholder(row.href)); // hide unfinished rows in production

  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      title="Let's talk"
      intro="I'm looking for entry-level software development roles. The best way to reach me is email."
    >
      <div className="contact" data-reveal>
        <Field value={site.email}>
          {(email) => (
            <a className="contact__email" href={`mailto:${email}`}>
              {email}
            </a>
          )}
        </Field>

        {rows.length > 0 && (
        <ul className="contact__links">
          {rows.map((row) => (
            <li key={row.label}>
              <span className="contact__label">{row.label}</span>
              <Field value={row.href} inline>
                {(href) =>
                  row.download ? (
                    <a href={href} download>
                      {row.text}
                    </a>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer">
                      {row.text ?? href}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )
                }
              </Field>
            </li>
          ))}
        </ul>
        )}
      </div>
    </Section>
  );
}
