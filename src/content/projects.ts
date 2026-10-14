import { todo, type Maybe } from './placeholder';

/**
 * Projects shown in the Projects section.
 *
 * To add a project, copy one object in the `projects` array and edit it.
 * Anything you haven't written yet can stay as todo("..."); it is hidden in
 * the production build automatically.
 *
 * Screenshots: put images in public/images/projects/<slug>/ and reference
 * them as './images/projects/<slug>/file.png'.
 */

export interface Screenshot {
  src: Maybe<string>;
  /** Describe what the screenshot shows, for screen-reader users. */
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One sentence: what it is and who it's for. */
  summary: string;
  featured: boolean;
  status: Maybe<string>;
  /** Problem it solves. */
  problem: Maybe<string>;
  /** What YOU did. Solo or team? Which parts were yours? */
  contribution: Maybe<string>;
  features: string[];
  /** Technology → what it was used for. */
  stack: { name: string; role: string }[];
  /** Why you chose things, and what you traded off. */
  decisions: Maybe<string>[];
  challenges: Maybe<string>[];
  lessons: Maybe<string>[];
  screenshots: Screenshot[];
  links: {
    github: Maybe<string>;
    demo: Maybe<string>;
  };
}

export const projects: Project[] = [
  {
    slug: 'pos-system',
    title: 'Accounting Software POS System',
    summary: 'A locally running desktop point-of-sale and inventory prototype for small retail businesses.',
    featured: true,
    status: 'Currently reworking the application',
    problem: 'The application brings inventory, checkout, and sales summaries into one desktop interface for everyday retail tasks.',
    contribution: 'I developed this as a solo project, building the local login, inventory editing, checkout calculations, sales history, and daily sales total summary.',
    features: [
      'Local login without database-backed accounts',
      'Adding and editing inventory during a session',
      'Checkout with quantity and total calculations',
      'Sales history during the running session',
      'Daily sales total summary',
    ],
    stack: [
      { name: 'Java', role: 'Application language' },
      { name: 'JavaFX', role: 'Desktop user interface' },
      { name: 'Spring Boot', role: 'Application structure and services' },
      { name: 'MySQL', role: 'Reworking database integration' },
    ],
    decisions: [],
    challenges: ['Data currently lasts only for the running session and resets when the application closes.'],
    lessons: [],
    screenshots: [
      { src: './images/projects/pos-system/checkout.png', alt: 'POS checkout showing rice, bread, and beans with quantities and a total of $39.73', caption: 'Checkout with sample items and calculated totals' },
      { src: './images/projects/pos-system/inventory.png', alt: 'Inventory showing sample products with departments, prices, and stock quantities', caption: 'Inventory during a running session' },
    ],
    links: {
      github: todo('Add the POS source repository URL when ready'),
      demo: todo('Add a recorded demo when ready'),
    },
  },
];
