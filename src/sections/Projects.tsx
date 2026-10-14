import { Section } from '../components/Section';
import { ProjectCaseStudy } from '../components/ProjectCaseStudy';
import { projects } from '../content/projects';

export function Projects() {
  // Featured projects first, then the rest in the order they appear in projects.ts
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <Section
      id="projects"
      index="02"
      label="Projects"
      title="Things I've built"
      intro="Each project covers the problem, what I built, the decisions behind it, and what I learned."
    >
      <div className="projects">
        {ordered.map((project) => (
          <ProjectCaseStudy key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
