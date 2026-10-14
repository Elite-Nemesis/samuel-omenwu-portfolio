import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Notes } from './sections/Notes';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';
import { NotePage } from './pages/NotePage';
import { useHashRoute } from './lib/useHashRoute';
import { useReveal } from './lib/useReveal';
import { useActiveSection } from './lib/useActiveSection';
import { site } from './content/site';

const SECTION_IDS = ['about', 'projects', 'skills', 'notes', 'resume', 'contact'];

export default function App() {
  const route = useHashRoute();
  const isHome = route.page === 'home';
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  useReveal(route);

  // When we land on the home page with a section in the URL (e.g. coming back
  // from a note via "#projects"), scroll that section into view.
  useEffect(() => {
    if (route.page !== 'home') return;
    document.title = `${site.name} — ${site.role}`;
    if (route.section && route.section !== 'top') {
      document.getElementById(route.section)?.scrollIntoView();
    } else if (route.section === 'top') {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        // Move focus without changing the URL hash (which our router listens to).
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Skip to content
      </a>
      <Header activeSection={activeSection} />
      <main id="main" tabIndex={-1}>
        {route.page === 'note' ? (
          <NotePage slug={route.slug} />
        ) : (
          <>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Notes />
            <Resume />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
