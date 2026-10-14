import { describe, expect, it } from 'vitest';
import { parseFrontMatter } from './frontMatter';

describe('parseFrontMatter', () => {
  it('reads strings, booleans, and tag lists', () => {
    const { data, body } = parseFrontMatter(
      '---\ntitle: "Hello: world"\ndate: 2026-10-01\ndraft: true\ntags: java, debugging\n---\n# Body\n',
    );
    expect(data).toEqual({
      title: 'Hello: world',
      date: '2026-10-01',
      draft: true,
      tags: ['java', 'debugging'],
    });
    expect(body).toBe('# Body\n');
  });

  it('returns the whole file as the body when there is no front matter', () => {
    expect(parseFrontMatter('Just text')).toEqual({ data: {}, body: 'Just text' });
  });

  it('handles Windows line endings', () => {
    const { data, body } = parseFrontMatter('---\r\ntitle: Win\r\n---\r\nBody');
    expect(data.title).toBe('Win');
    expect(body).toBe('Body');
  });
});
