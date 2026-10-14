/**
 * Skills, grouped by category. No percentages or ratings, on purpose:
 * they can't be verified and invite awkward interview questions.
 * Only list things you can talk about with an example.
 */

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['Java', 'Python', 'SQL', 'JavaScript', 'C++', 'C'] },
  { title: 'Frameworks', items: ['Spring Boot', 'JavaFX'] },
  { title: 'Databases & data', items: ['MySQL', 'BigQuery'] },
  { title: 'Cloud', items: ['Google Cloud (GCP)', 'Cloud Storage', 'AWS'] },
  { title: 'Tools', items: ['Git', 'GitHub'] },
];

export interface Certificate {
  name: string;
  issuer: string;
  /** Link to the credential, if you want to show it. */
  url?: string;
}

export const certificates: Certificate[] = [
  { name: 'Google Cloud Data Analytics', issuer: 'Google' },
  { name: 'Google AI Essentials', issuer: 'Google' },
];
