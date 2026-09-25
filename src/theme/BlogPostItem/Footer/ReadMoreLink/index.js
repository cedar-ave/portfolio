import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
function ReadMoreLabel() {
  return (
    <Translate
      id="theme.blog.post.readMore"
      description="The label used in blog post item excerpts to link to full blog posts">
      Read more
    </Translate>
  );
}
export default function BlogPostItemFooterReadMoreLink(props) {
  const {blogPostTitle, className, ...linkProps} = props;
  return (
    <Link
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        {title: blogPostTitle},
      )}
      className={clsx(
        'button button--primary button--sm',
        styles.readMoreLink,
        className,
      )}
      {...linkProps}>
      <ReadMoreLabel />
    </Link>
  );
}
