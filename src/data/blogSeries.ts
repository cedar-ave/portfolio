/**
 * Blog post series shown in the blog sidebar, above the year-grouped list.
 *
 * To add a post to a series, add its slug (the last segment of its URL,
 * e.g. the `slug` frontmatter field, or the post's filename if no slug is
 * set) to that series' `slugs` array below. A post listed here is shown
 * only under its series heading — it is removed from the plain year list.
 *
 * A post can belong to more than one series if its slug is added to
 * multiple arrays.
 */

export type BlogSeries = {
  id: string;
  title: string;
  slugs: string[];
};

export const blogSeries: BlogSeries[] = [
  {
    id: 'custom-mcps',
    title: 'Series: Custom MCPs',
    slugs: [
      'mcp-zendesk-guide',
      'mcp-zendesk-ticketing',
      'mcp-paligo-ccms',
      'mcp-google-drive',
    ],
  },
  {
    id: 'ai-agent-skills',
    title: 'Series: AI Agent Skills',
    slugs: [
      'skill-source-librarian',
      'skill-diataxis-drafter',
      'skill-release-notes-drafter',
      'skill-paligo-pal',
      'skill-zendesk-guide-pal',
      'skill-ai-optimizer',
      'skill-vocabulary-pal',
      'skill-style-pal',
    ],
  },
];
