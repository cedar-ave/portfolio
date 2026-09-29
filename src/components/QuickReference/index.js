import clsx from 'clsx';
import styles from './styles.module.css';

// Wraps a doc's "Quick reference" content in a pale panel that borrows the
// solid-fill look of a code block (see docs/styling/colors.mdx for the
// palette) but reads as prose, not code. The heading lives inside the
// panel itself, so the doc doesn't also need a "## Quick reference"
// markdown heading above it:
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
