// Remark plugin that lets a page populate its right-rail table of contents
// from <Panel label="..."> captions instead of markdown headings.
//
// Opt in per page with frontmatter:
//
//   ---
//   toc_source: panels
//   ---
//
// Pages that don't set `toc_source` are completely unaffected - Docusaurus's
// own default behavior (TOC built from ##/### headings) is untouched.
//
// How it works: by the time this plugin runs (it's registered in the site's
// own `remarkPlugins` array, which executes after Docusaurus's built-in
// `remark/toc` plugin - see processor.js's plugin ordering), the page
// already has an auto-generated `export const toc = [...]` node built from
// its headings. When `toc_source: panels` is set, we replace that node's
// contents with one entry per <Panel label="..."> found in the document,
// and stamp each Panel with a matching `id` (unless the author already gave
// it one) so the TOC links actually scroll to the right place. Docusaurus's
// TOC plugin itself already has a "don't touch it if the file sets its own
// toc export" escape hatch; we're just exploiting that from code instead of
// requiring every page to hand-write the array and keep it in sync.

import { visit } from 'unist-util-visit';

const TOC_EXPORT_NAME = 'toc';

function isTocExportNode(node) {
  if (node.type !== 'mdxjsEsm' || !node.data?.estree) return false;
  const program = node.data.estree;
  if (program.body.length !== 1) return false;
  const decl = program.body[0];
  if (decl.type !== 'ExportNamedDeclaration') return false;
  const varDecl = decl.declaration;
  if (varDecl?.type !== 'VariableDeclaration') return false;
  const id = varDecl.declarations[0]?.id;
  return id?.type === 'Identifier' && id.name === TOC_EXPORT_NAME;
}

// Minimal, dependency-free slugify - just needs to be stable and
// filesystem/URL-safe, not to match Docusaurus's own heading slugger.
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'panel';
}

function uniqueSlug(base, used) {
  let slug = base;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  used.add(slug);
  return slug;
}

function getAttr(node, name) {
  return node.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name,
  );
}

function setIdAttr(node, id) {
  const existing = getAttr(node, 'id');
  if (existing) return existing.value; // author already set one - keep it
  node.attributes.push({ type: 'mdxJsxAttribute', name: 'id', value: id });
  return id;
}

export default function remarkPanelToc() {
  return (tree, file) => {
    if (file.data.frontMatter?.toc_source !== 'panels') return;

    const usedSlugs = new Set();
    const tocItems = [];

    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'Panel') return;
      const labelAttr = getAttr(node, 'label');
      if (!labelAttr || typeof labelAttr.value !== 'string') return; // unlabeled panels don't appear in the TOC

      const label = labelAttr.value;
      const baseSlug = slugify(label);
      const id = setIdAttr(node, uniqueSlug(baseSlug, usedSlugs));

      tocItems.push({ value: label, id, level: 2 });
    });

    const tocExportNode = {
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              attributes: [],
              specifiers: [],
              source: null,
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: TOC_EXPORT_NAME },
                    init: {
                      type: 'ArrayExpression',
                      elements: tocItems.map((item) => ({
                        type: 'ObjectExpression',
                        properties: Object.entries(item).map(([key, value]) => ({
                          type: 'Property',
                          method: false,
                          shorthand: false,
                          computed: false,
                          kind: 'init',
                          key: { type: 'Identifier', name: key },
                          value:
                            typeof value === 'number'
                              ? { type: 'Literal', value }
                              : { type: 'Literal', value: String(value) },
                        })),
                      })),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    };

    const existingIndex = tree.children.findIndex(isTocExportNode);
    if (existingIndex === -1) {
      tree.children.push(tocExportNode);
    } else {
      tree.children[existingIndex] = tocExportNode;
    }
  };
}
