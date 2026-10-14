import { Section } from '../components/Section';
import { site } from '../content/site';
import { real } from '../content/placeholder';

export function Resume() {
  const url = real(site.resumeUrl);
  if (!url) return null;
  return (
    <Section id="resume" index="05" label="Resume" title="My resume" intro="Read my resume here, or save a PDF copy.">
      <div className="resume-actions">
        <a className="button" href={url} download>Download Resume</a>
        <a className="button" href={url} target="_blank" rel="noopener noreferrer">Open Resume in New Tab</a>
      </div>
      <p className="resume-help">If the preview does not display on your device, use the links above.</p>
      <iframe className="resume-preview" src={url} title="Samuel Omenwu resume PDF" loading="lazy" />
    </Section>
  );
}
