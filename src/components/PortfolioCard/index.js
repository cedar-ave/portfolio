import Link from '@docusaurus/Link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './styles.module.css';

// Clickable rounded card for the /portfolio index, styled to match the blog
// post cards (.blogPostCard in custom.css). Wrap a group of cards in
// <PortfolioCards> so they line up in a grid under their heading:
//
//   <PortfolioCards>
//     <PortfolioCard to="/portfolio/foo" icon="robot" title="Foo">One-line summary</PortfolioCard>
//   </PortfolioCards>
//
// `icon` is a Font Awesome solid icon name (registered globally in
// src/theme/MDXComponents.js). Pass `image` (a static path or URL) instead
// to show an image in the badge. `tag` adds a pill under the title naming
// who the work was for (a company, or "Personal project"); it's hidden
// when empty.
export function PortfolioCards({children}) {
  return <div className={styles.grid}>{children}</div>;
}

export default function PortfolioCard({to, icon, image, title, tag, children}) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.badge} aria-hidden="true">
        {image ? (
          <img src={image} alt="" className={styles.badgeImage} />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </span>
      <span className={styles.title}>{title}</span>
      {tag && <span className={styles.tag}>{tag}</span>}
      <span className={styles.description}>{children}</span>
    </Link>
  );
}
