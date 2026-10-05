/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {memo, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogSidebar/Content';

type BlogSeries = {
  id: string;
  title: string;
  slugs: string[];
};

function slugFromPermalink(permalink: string): string {
  return permalink.replace(/\/+$/, '').split('/').pop() ?? '';
}

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

// Series groups render as a <details> disclosure instead of a plain heading,
// so they don't dominate the sidebar above the year list. Closed by default,
// but open when the series contains the post currently being viewed — so
// clicking a post inside an expanded series doesn't collapse it again on
// the post's own page.
function BlogSidebarSeriesGroup({
  heading,
  yearGroupHeadingClassName,
  active,
  children,
}: {
  heading: string;
  yearGroupHeadingClassName?: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <details role="group" open={active}>
      <summary className={yearGroupHeadingClassName}>{heading}</summary>
      {children}
    </details>
  );
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();
  const {pathname} = useLocation();
  const {series: blogSeries} = usePluginData('blog-series-plugin') as {
    series: BlogSeries[];
  };

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

  const seriesSections = seriesGroups.map((series) => {
    const isActive = series.items.some((item) =>
      pathname.startsWith(item.permalink),
    );
    return (
      <BlogSidebarSeriesGroup
        key={series.id}
        heading={series.title}
        yearGroupHeadingClassName={yearGroupHeadingClassName}
        active={isActive}>
        <ListComponent items={series.items} />
      </BlogSidebarSeriesGroup>
    );
  });

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
