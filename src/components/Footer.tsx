import { site } from '../content/site';
import { showPlaceholders } from '../content/placeholder';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Built with React, TypeScript, and Vite.</p>
      </div>
      {showPlaceholders && (
        <p className="dev-banner" role="note">
          Placeholder mode: dashed boxes are unfinished content and are hidden in the production build.
        </p>
      )}
    </footer>
  );
}
