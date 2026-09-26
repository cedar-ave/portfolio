import MDXComponents from '@theme-original/MDXComponents';
import Gallery from '@site/src/components/Gallery';

// Registers site-wide MDX components so they're available in every .md/.mdx
// file (docs, blog posts, and pages) without a per-file import.
export default {
  ...MDXComponents,
  Gallery,
};
