import clsx from 'clsx';
import styles from './styles.module.css';

// A responsive image grid for MDX content (docs, blog posts, and pages).
// Wrap a run of markdown images in it:
//
//   <Gallery>
//     ![alt text](./img-a.jpg)
//     ![alt text](./img-b.jpg)
//   </Gallery>
//
// Each <img> gets click-to-zoom for free via the site-wide
// docusaurus-theme-zoom-image theme, so no lightbox logic is needed here.
export default function Gallery({ children, columns }) {
  const style = columns ? { '--gallery-columns': columns } : undefined;

  return (
    <div className={clsx(styles.gallery)} style={style}>
      {children}
    </div>
  );
}
