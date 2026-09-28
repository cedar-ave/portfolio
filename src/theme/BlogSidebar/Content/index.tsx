/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {memo, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogSidebar/Content';
import {blogSeries} from '@site/src/data/blogSeries';

function BlogSidebarGroup({
  heading,
  yearGroupHeadingClassName,
  children,
}: {
  heading: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role="group">
      <Heading as="h3" className={yearGroupHeadingClassName}>
        {heading}
      </Heading>
      {children}
    </div>
  );
}

// Series groups render as a closed-by-default <details> disclosure instead
// of a plain heading, so they don't dominate the sidebar above the year list.
function BlogSidebarSeriesGroup({
  heading,
  yearGroupHeadingClassName,
  children,
}: {
  heading: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <details role="group">
      <summary className={yearGroupHeadingClassName}>{heading}</summary>
      {children}
    </details>
  );
}

function slugFromPermalink(permalink: string): string {
  return permalink.replace(/\/+$/, '').split('/').pop() ?? '';
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();

  const seriesGroups = blogSeries
    .map((series) => ({
      ...series,
      items: items.filter((item) =>
        series.slugs.includes(slugFromPermalink(item.permalink)),
      ),
    }))
    .filter((series) => series.items.length > 0);

  const seriesSlugs = new Set(
    seriesGroups.flatMap((series) => series.items.map((item) => item.permalink)),
  );
  const remainingItems = items.filter(
    (item) => !seriesSlugs.has(item.permalink),
  );

  const seriesSections = seriesGroups.map((series) => (
    <BlogSidebarSeriesGroup
      key={series.id}
      heading={series.title}
      yearGroupHeadingClassName={yearGroupHeadingClassName}>
      <ListComponent items={series.items} />
    </BlogSidebarSeriesGroup>
  ));

  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYear = groupBlogSidebarItemsByYear(remainingItems);
    return (
      <>
        {seriesSections}
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarGroup
            key={year}
            heading={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}>
            <ListComponent items={yearItems} />
          </BlogSidebarGroup>
        ))}
      </>
    );
  } else {
    return (
      <>
        {seriesSections}
        <ListComponent items={remainingItems} />
      </>
    );
  }
}

export default memo(BlogSidebarContent);
