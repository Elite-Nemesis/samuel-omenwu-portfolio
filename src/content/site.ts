import { type Maybe } from './placeholder';

/**
 * Site-wide facts: who you are and how to reach you.
 * Edit this file to change your headline, intro, or contact links.
 */

export interface ContactLink {
  label: string;
  /** Visible text, e.g. "github.com/username" */
  display: Maybe<string>;
  href: Maybe<string>;
}

export const site = {
  name: 'Samuel Omenwu',
  role: 'Software Developer',
  location: 'Los Angeles, CA',

  headline: 'I build practical software, with a focus on what runs behind the screen.',
  intro:
    'Computer Science graduate from Cal State Dominguez Hills, looking for an entry-level software development role. ' +
    "I'm most interested in backend systems and cloud technologies.",

  /** The "About" section, written as plain paragraphs. */
  about: [
    "I'm a software developer based in Los Angeles. I graduated from California State University, Dominguez Hills in May 2026 with a B.S. in Computer Science.",
    'I work mainly in Java, Python, and SQL. My featured project is a point-of-sale and inventory application for small retail shops, built with JavaFX and Spring Boot. I am currently reworking the application; data currently resets when the app closes. It covers the everyday work of a shop: signing in, ringing up sales, tracking stock, and closing out the day.',
    "I'm drawn to backend systems and cloud technologies. I've earned Google's Cloud Data Analytics and AI Essentials certificates, and I'm looking for an entry-level role where I can keep building in that direction alongside an experienced team.",
  ] as Maybe<string>[],

  /** Short facts shown beside the About text. */
  facts: [
    { label: 'Based in', value: 'Los Angeles, CA' },
    { label: 'Education', value: 'B.S. Computer Science, CSU Dominguez Hills (May 2026)' },
    { label: 'Focus', value: 'Backend systems · Cloud' },
    { label: 'Looking for', value: 'Entry-level software development roles' },
  ],

  email: 'samuelomenwu@gmail.com' as Maybe<string>,

  links: [
    {
      label: 'GitHub',
      display: 'github.com/Elite-Nemesis',
      href: 'https://github.com/Elite-Nemesis',
    },
    {
      label: 'LinkedIn',
      display: 'linkedin.com/in/samuel-omenwu-984b99270',
      href: 'https://www.linkedin.com/in/samuel-omenwu-984b99270',
    },
  ] as ContactLink[],

  /**
   * Put your resume at public/resume/Samuel-Omenwu-Resume.pdf, then set:
   *   resumeUrl: './resume/Samuel-Omenwu-Resume.pdf'
   */
  resumeUrl: './resume/Samuel-Omenwu-Resume.pdf' as Maybe<string>,
};
