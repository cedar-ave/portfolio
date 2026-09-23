// Remark plugin that lets you resize images in MDX/Markdown by appending
// a curly-brace attribute list right after the image, e.g.:
//
//   ![alt text](./img.png){width=300}
//   ![alt text](./img.png){width=300 height=200}
//   ![alt text](./img.png){width="300px"}
//
// MDX parses the "{...}" itself into an mdxTextExpression node (its inner
// text is treated as a JS expression, e.g. "width=300" is a JS assignment),
// so it must be consumed here or it fails at render time with something
// like "ReferenceError: width is not defined". This plugin reads that
// expression as attribute syntax instead, applies it to the preceding
// image, and removes it from the tree.
//
// Must run AFTER Docusaurus's own image-to-<img> transform (the default
// order, since this is registered in the docs/blog `remarkPlugins` array),
// so by the time this runs local images have already become
// `mdxJsxTextElement` "img" nodes rather than plain mdast `image` nodes.

import { visit } from 'unist-util-visit';

// e.g. width=300 height=200  or  width="300px"
const ATTR_PAIR_RE = /([a-zA-Z-]+)=("[^"]*"|'[^']*'|[^\s]+)/g;

function isImageElement(node) {
  return (
    node.type === 'image' ||
    (node.type === 'mdxJsxTextElement' && node.name === 'img')
  );
}

function parseAttrs(raw) {
  const attrs = [];
  let match;
  while ((match = ATTR_PAIR_RE.exec(raw)) !== null) {
    const [, name, rawValue] = match;
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    attrs.push({ type: 'mdxJsxAttribute', name, value });
  }
  return attrs;
}

export default function remarkImageSize() {
  return (tree) => {
    visit(tree, 'paragraph', (paragraph) => {
      const { children } = paragraph;

      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        const next = children[i + 1];
        if (!isImageElement(node) || !next) continue;
        if (next.type !== 'mdxTextExpression' && next.type !== 'mdxFlowExpression') continue;

        const extraAttrs = parseAttrs(next.value);
        if (extraAttrs.length === 0) continue;

        if (node.type === 'image') {
          // Plain mdast image node (e.g. a remote URL Docusaurus didn't
          // convert to a JSX element) - build a fresh <img> element for it.
          const attributes = [
            { type: 'mdxJsxAttribute', name: 'src', value: node.url },
            { type: 'mdxJsxAttribute', name: 'alt', value: node.alt || '' },
          ];
          if (node.title) {
            attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: node.title });
          }
          attributes.push(...extraAttrs);

          children[i] = {
            type: 'mdxJsxTextElement',
            name: 'img',
            attributes,
            children: [],
          };
        } else {
          // Already an <img> mdxJsxTextElement (Docusaurus's own image
          // transform already ran) - merge in / override its attributes,
          // e.g. replace the auto-detected width/height with ours.
          for (const attr of extraAttrs) {
            const existingIndex = node.attributes.findIndex(
              (a) => a.type === 'mdxJsxAttribute' && a.name === attr.name,
            );
            if (existingIndex === -1) {
              node.attributes.push(attr);
            } else {
              node.attributes[existingIndex] = attr;
            }
          }
        }

        // Remove the consumed "{...}" expression node that followed the image.
        children.splice(i + 1, 1);
      }
    });
  };
}
