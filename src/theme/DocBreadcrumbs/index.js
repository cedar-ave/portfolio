// Wraps @theme-original/DocBreadcrumbs to put the "Copy page" bar on the
// right of the breadcrumb row, in both docs instances (/docs and /samples).
// See src/components/PageActions.
//
// A doc turns the bar off with `copy_page: false` in its frontmatter.
// DocBreadcrumbs is also used on generated category pages, which aren't
// docs and have no frontmatter, so the page comes from the URL
// (useActiveDocContext); the frontmatter comes from useDoc(), which throws
// outside a doc page, so useDocOrNull catches that. Category pages always
// show the bar.
import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import { useActiveDocContext, useActivePlugin, useDoc } from '@docusaurus/plugin-content-docs/client';
import PageActions from '@site/src/components/PageActions';
import styles from './styles.module.css';

function useDocOrNull() {
  try {
    return useDoc();
  } catch {
    return null;
  }
}

export default function DocBreadcrumbsWrapper(props) {
  const activePlugin = useActivePlugin();
  const { activeDoc } = useActiveDocContext(activePlugin?.pluginId);
  const doc = useDocOrNull();
  const showActions = activeDoc && doc?.frontMatter.copy_page !== false;
  return (
    <div className={styles.row}>
      <DocBreadcrumbs {...props} />
      {showActions && <PageActions permalink={activeDoc.path} menuAlign="end" className={styles.actions} />}
    </div>
  );
}
