import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import PageActions from '@site/src/components/PageActions';

// The "Copy page" bar goes under the title, date, and authors, on a post's
// own page only (not in lists of posts). A post turns it off with
// `copy_page: false` in its frontmatter. See src/components/PageActions.
export default function BlogPostItemHeader() {
  const {metadata, frontMatter, isBlogPostPage} = useBlogPost();
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
      {isBlogPostPage && frontMatter.copy_page !== false && (
        <PageActions permalink={metadata.permalink} className="margin-bottom--md" />
      )}
    </header>
  );
}
