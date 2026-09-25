/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled from @docusaurus/theme-classic to give the tag name code
 * treatment in the page headline instead of quotes, e.g.
 * "12 posts tagged with `docs-as-code`".
 */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';

function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

// The upstream title is a plain translated string like
// `{nPosts} tagged with "{tagName}"`. Split off the quoted tag name so it
// can be rendered as <code> instead, while keeping the rest of the string
// (and its pluralization/translation) intact.
function TagsPageHeading({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  const match = title.match(/^(.*)"(.*)"$/);
  if (!match) {
    return <Heading as="h1">{title}</Heading>;
  }
  const [, prefix, tagName] = match;
  return (
    <Heading as="h1">
      {prefix}
      <code>{tagName}</code>
    </Heading>
  );
}

function BlogTagsPostsPageContent({tag, items, sidebar, listMetadata}) {
  return (
    <BlogLayout sidebar={sidebar}>
      {tag.unlisted && <Unlisted />}
      <header className="margin-bottom--xl">
        <TagsPageHeading tag={tag} />
        {tag.description && <p>{tag.description}</p>}
        <Link href={tag.allTagsPath}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page">
            View All Tags
          </Translate>
        </Link>
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={listMetadata} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
