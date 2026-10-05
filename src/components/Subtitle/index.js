import styles from './styles.module.css';

// A lead line directly under a doc's H1 - larger and muted relative to body
// text, same way a marketing page's hero subhead reads. Use it for the
// first line beneath the title:
//
//   # Intake Mart Designer
//
//   <Subtitle>Intelligent metadata mapping and standardization is the
//   heart of the Clearpath solution.</Subtitle>
export default function Subtitle({ children }) {
  return <p className={styles.subtitle}>{children}</p>;
}
