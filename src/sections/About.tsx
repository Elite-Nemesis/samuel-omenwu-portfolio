import { Section } from '../components/Section';
import { Field } from '../components/Placeholder';
import { site } from '../content/site';

export function About() {
  return (
    <Section id="about" index="01" label="About" title="A little about me">
      <div className="about">
        <div className="about__text prose" data-reveal>
          {site.about.map((paragraph, i) => (
            <Field key={i} value={paragraph}>
              {(text) => <p>{text}</p>}
            </Field>
          ))}
        </div>
        <dl className="facts" data-reveal>
          {site.facts.map((fact) => (
            <div className="facts__row" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
