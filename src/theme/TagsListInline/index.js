/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled: "Tags:" label removed.
 */
import React from 'react';
import clsx from 'clsx';
import Tag from '@theme/Tag';
import styles from './styles.module.css';
export default function TagsListInline({tags}) {
  return (
    <ul className={clsx(styles.tags, 'padding--none')}>
      {tags.map((tag) => (
        <li key={tag.permalink} className={styles.tag}>
          <Tag {...tag} />
        </li>
      ))}
    </ul>
  );
}
