import styles from './styles.module.css';

// A callout for a customer success story: light blue card, rounded corners,
// shadow - same card conventions as Panel/QuickReference, but with the
// site's pale-blue tint instead of the neutral card background, so it reads
// as a distinct "story" moment on the page. The heading lives inside the
// card itself (like QuickReference), so the doc doesn't also need a
// "## Success story" markdown heading above it:
//
//   <SuccessStory title="Success story: from data managers to data analysts" customer="Meridian Health System">
//
//   Meridian Health System tasked its information systems...
//
//   </SuccessStory>
export default function SuccessStory({ title, customer, children }) {
  return (
    <div className={styles.successStory}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {customer && <p className={styles.customer}>{customer}</p>}
      {children}
    </div>
  );
}
