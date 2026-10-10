import clsx from 'clsx';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

// Wraps a run of MDX content in a soft, rounded panel with a slight
// shadow, so it reads as a distinct block without the fixed color of an
// admonition (:::note, :::important, etc.). Use it to set off a worked
// example, a sample outline, or any other aside that isn't a callout:
//
//   <Panel label="Sample outline">
//
//   1. First step.
//   2. Second step.
//
//   </Panel>
//
// `label` is optional; omit it for an unlabeled panel. Styled like
// QuickReference/DocCard so it matches the rest of the theme in both
// light and dark mode.
//
// `id` is normally left for the remark-panel-toc plugin to inject (see
// plugins/remark-panel-toc.mjs) on pages that opt into
// `toc_source: panels`, so the right-rail TOC can scroll to this panel. You
// can also pass it by hand for a stable anchor link outside of that flow.
export default function Panel({ children, label, id }) {
  // Register the id so Docusaurus's broken-anchor check knows it exists.
  useBrokenLinks().collectAnchor(id);
  return (
    <div id={id} className={clsx(styles.panel)}>
      {label && <p className={styles.panelLabel}>{label}</p>}
      {children}
    </div>
  );
}
