import MDXComponents from '@theme-original/MDXComponents';
import Gallery from '@site/src/components/Gallery';
import Panel from '@site/src/components/Panel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {Icon} from '@iconify/react';

library.add(fas, far, fab);

// Registers site-wide MDX components so they're available in every .md/.mdx
// file (docs, blog posts, and pages) without a per-file import.
export default {
  ...MDXComponents,
  Gallery,
  Panel,
  FAIcon: FontAwesomeIcon,
  IIcon: Icon,
};
