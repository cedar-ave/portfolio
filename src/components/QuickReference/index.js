import clsx from 'clsx';
import styles from './styles.module.css';

// Wraps a doc's "Quick reference" content in a panel styled like
// Docusaurus's own doc cards (see @theme/DocCard), so it reads as a
// native part of the theme rather than a custom callout. The heading
// lives inside the panel itself, so the doc doesn't also need a
// "## Quick reference" markdown heading above it:
//
//   <QuickReference>
//
//   - First fact.
//   - Second fact.
//
//   </QuickReference>
export default function QuickReference({ children, label = 'Quick reference' }) {
  return (
    <div className={clsx(styles.quickReference)}>
      <h3 className={styles.quickReferenceHeading}>{label}</h3>
      {children}
    </div>
  );
}
