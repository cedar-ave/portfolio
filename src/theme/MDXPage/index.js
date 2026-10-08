// Ejected from @docusaurus/theme-classic's MDXPage (3.10.2). Two changes:
// - The optional "Back to portfolio" link above the article, shown when a
//   page sets `back_to_portfolio: true` in its frontmatter - the standalone-page
//   equivalent of the link at the top of the /samples sidebar (see
//   src/theme/DocSidebar).
// - The optional `table_of_contents_levels` frontmatter field (for example
//   `table_of_contents_levels: 2,4`), which lists the heading levels to show in
//   the table of contents.
import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';
import EditMetaRow from '@theme/EditMetaRow';
import styles from './styles.module.css';

// Parses `table_of_contents_levels` - a comma-separated string ("2,3,4"), a
// YAML list ([2, 3, 4]) or a single number - into a sorted list of heading
// levels. Returns null when the field is missing or has no valid levels, so
// the page falls back to the default TOC.
function parseTocLevels(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const parts = Array.isArray(value) ? value : String(value).split(',');
  const levels = [
    ...new Set(
      parts
        .map((part) => Number(String(part).trim()))
        .filter((level) => Number.isInteger(level) && level >= 1 && level <= 6),
    ),
  ].sort((a, b) => a - b);
  return levels.length > 0 ? levels : null;
}

export default function MDXPage(props) {
  const {content: MDXPageContent} = props;
  const {metadata, assets} = MDXPageContent;
  const {
    title,
    editUrl,
    description,
    frontMatter,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;
  const {
    keywords,
    wrapperClassName,
    hide_table_of_contents: hideTableOfContents,
    back_to_portfolio: backToPortfolio,
    table_of_contents_levels: tableOfContentsLevels,
  } = frontMatter;
  // The full TOC from the MDX loader, narrowed to the requested levels. The
  // loader never includes h1, so level 1 has no effect.
  const tocLevels = parseTocLevels(tableOfContentsLevels);
  const toc = tocLevels
    ? MDXPageContent.toc.filter((item) => tocLevels.includes(item.level))
    : MDXPageContent.toc;
  const image = assets.image ?? frontMatter.image;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}>
      <Layout>
        <PageMetadata
          title={title}
          description={description}
          keywords={keywords}
          image={image}
        />
        <main className="container container--fluid margin-vert--lg">
          <div className={clsx('row', styles.mdxPageWrapper)}>
            <div className={clsx('col', !hideTableOfContents && 'col--8')}>
              <ContentVisibility metadata={metadata} />
              {backToPortfolio && (
                <nav aria-label="Breadcrumbs" className={styles.backToPortfolio}>
                  <Link to="/portfolio">← Back to portfolio</Link>
                </nav>
              )}
              <article>
                <MDXContent>
                  <MDXPageContent />
                </MDXContent>
              </article>
              {canDisplayEditMetaRow && (
                <EditMetaRow
                  className={clsx(
                    'margin-top--sm',
                    ThemeClassNames.pages.pageFooterEditMetaRow,
                  )}
                  editUrl={editUrl}
                  lastUpdatedAt={lastUpdatedAt}
                  lastUpdatedBy={lastUpdatedBy}
                />
              )}
            </div>
            {!hideTableOfContents && toc.length > 0 && (
              <div className="col col--2">
                <TOC
                  toc={toc}
                  minHeadingLevel={
                    tocLevels ? tocLevels[0] : frontMatter.toc_min_heading_level
                  }
                  maxHeadingLevel={
                    tocLevels ? tocLevels.at(-1) : frontMatter.toc_max_heading_level
                  }
                />
              </div>
            )}
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
