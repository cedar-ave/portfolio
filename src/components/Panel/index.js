import clsx from 'clsx';
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
export default function Panel({ children, label }) {
  return (
    <div className={clsx(styles.panel)}>
      {label && <p className={styles.panelLabel}>{label}</p>}
      {children}
    </div>
  );
}
