// Remark plugin that lets a markdown/MDX file pull in the content of
// another file via a directive on its own line:
//
//   \{@include: ./shared/callout.md\}
//
// The braces must be backslash-escaped in the source file: a bare
// "{...}" is parsed by MDX itself as a JS expression, at the syntax
// level, before any remark plugin (this one included) ever gets to run -
// an unescaped directive fails the whole page's build with "Could not
// parse expression with acorn" instead of reaching this plugin. The
// escape is resolved by the time the remark tree exists, leaving a plain
// text node reading "{@include: ...}", which is what INCLUDE_RE matches.
//
// The path is resolved relative to the file containing the directive,
// unless it starts with "/", in which case it's resolved relative to
// `siteRoot` (so e.g. \{@include: /src/includes/disclaimer.md\} works
// the same from docs, blog, samples, or a src/pages MDX file).
//
// Included content is parsed with the *same* processor settings as the
// including file - same micromark/MDX extensions - so an include can
// itself contain MDX components, GFM tables, etc., and is recursively
// scanned for its own nested \{@include: ...\} directives. A circular
// include chain is reported inline instead of recursing forever.
//
// Included files should be plain content fragments - no Docusaurus
// frontmatter (`---\nid: ...\n---`) - since they're spliced into the
// including page, not rendered as a page of their own.
//
// Register this in the `beforeDefaultRemarkPlugins` array of every content
// type that should support includes: the docs preset option, any
// additional plugin-content-docs instance (e.g. the "samples" docs
// plugin), the blog preset option, and the pages preset option (which also
// covers .mdx files under src/pages). It has to run via
// `beforeDefaultRemarkPlugins` rather than `remarkPlugins` so that an
// admonition (":::note ... :::") inside an included fragment is spliced in
// before Docusaurus's own admonitions-transform plugin runs - otherwise
// the spliced-in directive node is never converted and is left as an
// unused directive instead of a rendered callout. See docusaurus.config.js.

import fs from 'node:fs';
import path from 'node:path';
import { visit, SKIP } from 'unist-util-visit';

const INCLUDE_RE = /^\{@include:\s*(.+?)\}$/;

function errorParagraph(message) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', value: `⚠️ ${message}` }],
  };
}

export default function remarkIncludes(options = {}) {
  // `this` is the unified processor - unified calls attachers with
  // `attacher.call(processor, ...options)` - so we can reuse its exact
  // parser settings (MDX syntax, GFM, etc.) to parse included content.
  const processor = this;
  const siteRoot = options.siteRoot ? path.resolve(options.siteRoot) : process.cwd();

  function resolveIncludePath(rawPath, fromDir) {
    return rawPath.startsWith('/')
      ? path.join(siteRoot, rawPath.slice(1))
      : path.resolve(fromDir, rawPath);
  }

  function describe(filePath) {
    return path.relative(siteRoot, filePath).replace(/\\/g, '/');
  }

  // Resolves every {@include: ...} directive found directly in `tree`,
  // recursing into each included file's own tree (relative to its own
  // directory) before splicing it in. `chain` is the list of absolute
  // paths already open along this include path, used to detect cycles.
  function resolveIncludesIn(tree, fromDir, chain) {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || node.children.length !== 1 || node.children[0].type !== 'text') return;

      const match = INCLUDE_RE.exec(node.children[0].value.trim());
      if (!match) return;

      const rawPath = match[1].trim();
      const includePath = resolveIncludePath(rawPath, fromDir);

      if (chain.includes(includePath)) {
        parent.children[index] = errorParagraph(
          `circular include: ${[...chain, includePath].map(describe).join(' -> ')}`,
        );
        return;
      }

      let contents;
      try {
        contents = fs.readFileSync(includePath, 'utf8');
      } catch {
        parent.children[index] = errorParagraph(
          `include not found: ${rawPath} (resolved to ${describe(includePath)})`,
        );
        return;
      }

      const subtree = processor.parse(contents);
      resolveIncludesIn(subtree, path.dirname(includePath), [...chain, includePath]);

      parent.children.splice(index, 1, ...subtree.children);
      // Skip over the nodes we just spliced in (their own includes are
      // already resolved) and resume visiting right after them.
      return [SKIP, index + subtree.children.length];
    });
  }

  return function transformer(tree, file) {
    const fromDir = file.path ? path.dirname(file.path) : siteRoot;
    resolveIncludesIn(tree, fromDir, [file.path || '<root>']);
  };
}
