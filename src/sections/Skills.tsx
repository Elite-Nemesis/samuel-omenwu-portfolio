import { Section } from '../components/Section';
import { certificates, skillGroups } from '../content/skills';

export function Skills() {
  return (
    <Section id="skills" index="03" label="Skills" title="What I work with">
      <div className="skills">
        {skillGroups.map((group) => (
          <div className="skills__group" key={group.title} data-reveal>
            <h3 className="skills__title">{group.title}</h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="certs" data-reveal>
        <h3 className="skills__title">Certificates</h3>
        <ul className="certs__list">
          {certificates.map((cert) => (
            <li key={cert.name} className="certs__item">
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noreferrer">
                  {cert.name}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <span>{cert.name}</span>
              )}
              <span className="certs__issuer">{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
