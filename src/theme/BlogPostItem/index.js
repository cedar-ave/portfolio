import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import styles from './styles.module.css';
export default function BlogPostItem({children, className}) {
  const {metadata, isBlogPostPage} = useBlogPost();
  return (
    <BlogPostItemContainer className={className}>
      {/* In list view, the whole card is clickable: an invisible link
          stretched over the card via ::after (styles.module.css), sitting
          below the title/tag links which paint on top since they come
          later in normal document flow. */}
      {!isBlogPostPage && (
        <Link
          to={metadata.permalink}
          aria-hidden="true"
          tabIndex={-1}
          className={styles.stretchedLink}
        />
      )}
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
