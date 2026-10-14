import type { ReactNode } from 'react';
import { Field, PlaceholderNote } from './Placeholder';
import { isPlaceholder, showPlaceholders, type Maybe } from '../content/placeholder';
import type { Project } from '../content/projects';

/** A titled block in the case study. Hidden entirely if it has nothing real to show. */
function Block({ title, hasContent, children }: { title: string; hasContent: boolean; children: ReactNode }) {
  if (!hasContent && !showPlaceholders) return null;
  return (
    <div className="case__block" data-reveal>
      <h4 className="case__label">{title}</h4>
      {children}
    </div>
  );
}

const hasReal = (values: Maybe<unknown>[]) => values.some((v) => !isPlaceholder(v));

function List({ items }: { items: Maybe<string>[] }) {
  return (
    <ul className="case__list">
      {items.map((item, i) =>
        isPlaceholder(item) ? (
          showPlaceholders && (
            <li key={i} className="case__list-placeholder">
              <PlaceholderNote text={item.todo} inline />
            </li>
          )
        ) : (
          <li key={i}>{item}</li>
        ),
      )}
    </ul>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;
  const shots = project.screenshots.filter((s) => showPlaceholders || !isPlaceholder(s.src));
  const links = [
    { label: 'Source on GitHub', href: project.links.github },
    { label: 'Watch demo', href: project.links.demo },
  ];
  const realLinks = links.filter((l) => !isPlaceholder(l.href));

  return (
    <article className="case" aria-labelledby={headingId}>
      <header className="case__header" data-reveal>
        {project.featured && <p className="case__tag">Featured project</p>}
        <h3 id={headingId} className="case__title">
          {project.title}
        </h3>
        <p className="case__summary">{project.summary}</p>
        <Field value={project.status}>{(status) => <p className="case__status">{status}</p>}</Field>

        {(realLinks.length > 0 || showPlaceholders) && (
          <div className="case__links">
            {links.map((link) => (
              <Field key={link.label} value={link.href} inline>
                {(href) => (
                  <a className="button button--small" href={href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
              </Field>
            ))}
          </div>
        )}
      </header>

      {shots.length > 0 && (
        <div className="case__shots" data-reveal>
          {shots.map((shot, i) => (
            <figure className="shot" key={i}>
              {isPlaceholder(shot.src) ? (
                <div className="shot__placeholder" role="img" aria-label={`Placeholder: ${shot.alt}`}>
                  <span className="placeholder__label">Screenshot</span>
                  <span>{shot.src.todo}</span>
                </div>
              ) : (
                <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" width={1280} height={800} />
              )}
              {shot.caption && <figcaption>{shot.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <div className="case__grid">
        <div className="case__main">
          <Block title="The problem" hasContent={!isPlaceholder(project.problem)}>
            <Field value={project.problem}>{(t) => <p>{t}</p>}</Field>
          </Block>
          <Block title="My role" hasContent={!isPlaceholder(project.contribution)}>
            <Field value={project.contribution}>{(t) => <p>{t}</p>}</Field>
          </Block>
          <Block title="Features" hasContent={project.features.length > 0}>
            <ul className="case__features">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Block>
          <Block title="Technical decisions" hasContent={hasReal(project.decisions)}>
            <List items={project.decisions} />
          </Block>
          <Block title="Challenges" hasContent={hasReal(project.challenges)}>
            <List items={project.challenges} />
          </Block>
          <Block title="What I learned" hasContent={hasReal(project.lessons)}>
            <List items={project.lessons} />
          </Block>
        </div>

        <aside className="case__aside" aria-label={`${project.title} technology stack`} data-reveal>
          <div className="receipt">
            <p className="receipt__head">Built with</p>
            <ul className="receipt__list">
              {project.stack.map((tech) => (
                <li key={tech.name} className="receipt__row">
                  <span className="receipt__name">{tech.name}</span>
                  <span className="receipt__leader" aria-hidden="true" />
                  <span className="receipt__role">{tech.role}</span>
                </li>
              ))}
            </ul>
            <p className="receipt__foot" aria-hidden="true">
              ** {project.stack.length} items **
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
