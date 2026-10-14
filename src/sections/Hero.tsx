import { site } from '../content/site';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="eyebrow hero__eyebrow" data-reveal>
          {site.role} · {site.location}
        </p>
        <h1 id="hero-heading" className="hero__name" data-reveal>
          {site.name}
        </h1>
        <p className="hero__title" data-reveal>
          {site.headline}
        </p>
        <p className="hero__intro" data-reveal>
          {site.intro}
        </p>
        <div className="hero__actions" data-reveal>
          <a className="button button--primary" href="#projects">
            View projects
          </a>
          <a className="button button--ghost" href="#contact">
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}
