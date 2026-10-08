// Ejected from @docusaurus/theme-classic's MDXPage (3.10.2). The only change
// is the optional "Back to portfolio" link above the article, shown when a
// page sets `back_to_portfolio: true` in its frontmatter - the standalone-page
// equivalent of the link at the top of the /samples sidebar (see
// src/theme/DocSidebar).
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
  } = frontMatter;
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
            {!hideTableOfContents && MDXPageContent.toc.length > 0 && (
              <div className="col col--2">
                <TOC
                  toc={MDXPageContent.toc}
                  minHeadingLevel={frontMatter.toc_min_heading_level}
                  maxHeadingLevel={frontMatter.toc_max_heading_level}
                />
              </div>
            )}
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
