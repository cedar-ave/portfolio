/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled from @docusaurus/theme-classic to drop any post whose front
 * matter sets `hide_from_index: true` from the paginated post list, and to
 * paginate what's left ourselves.
 *
 * This pairs with `postsPerPage: 'ALL'` in the blog plugin options
 * (docusaurus.config.js): with that set, Docusaurus generates a single
 * `/blog` route carrying every non-hidden* post's full content, instead of
 * splitting posts across separate static routes (`/blog`, `/blog/page/2`,
 * ...) at build time. That matters because pagination normally happens
 * BEFORE this component ever runs — a swizzled BlogListPage can filter
 * what's on ITS OWN route, but it can never pull a post's content in from
 * a different route's build output. Rebalancing pages (so each one shows
 * a full page of *visible* posts, not up to a pageful of raw posts minus
 * however many turn out hidden) requires all candidate posts to already be
 * on the one route this component renders — hence 'ALL'.
 *
 * (*"non-hidden" here means not `unlisted`/`draft`; those are still fully
 * excluded upstream by the blog plugin itself, same as always.)
 *
 * The actual page size shown to visitors is POSTS_PER_PAGE below, applied
 * client-side to the filtered list, with the current page read from a
 * `?page=N` query string instead of a `/page/N` path segment (there's no
 * per-page static route left to put a path segment on).
 *
 * See docs/blog/blog-index-list-filtering.mdx for the full writeup,
 * including the trade-offs this approach carries (no-JS/crawler visits to
 * `?page=2` see page 1's content until hydration; see that page for why
 * that's an acceptable trade here).
 */

import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';

const POSTS_PER_PAGE = 10;

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function parsePageNumber(search, totalPages) {
  const requested = Number(new URLSearchParams(search).get('page'));
  if (!Number.isInteger(requested) || requested < 1) {
    return 1;
  }
  return Math.min(requested, totalPages);
}

function BlogListPageContent(props) {
  const {metadata, items, sidebar} = props;
  const location = useLocation();

  const listedItems = items.filter(
    ({content}) => !content.metadata.frontMatter.hide_from_index,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(listedItems.length / POSTS_PER_PAGE),
  );
  const page = parsePageNumber(location.search, totalPages);
  const pageItems = listedItems.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const pagePermalink = (pageNumber) =>
    pageNumber <= 1
      ? metadata.permalink
      : `${metadata.permalink}?page=${pageNumber}`;

  const paginatorMetadata = {
    blogTitle: metadata.blogTitle,
    blogDescription: metadata.blogDescription,
    permalink: pagePermalink(page),
    page,
    postsPerPage: POSTS_PER_PAGE,
    totalCount: listedItems.length,
    totalPages,
    previousPage: page > 1 ? pagePermalink(page - 1) : undefined,
    nextPage: page < totalPages ? pagePermalink(page + 1) : undefined,
  };

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogPostItems items={pageItems} />
      <BlogListPaginator metadata={paginatorMetadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
