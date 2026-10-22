// Docusaurus plugin that makes the site readable by AI agents: a Markdown
// copy of every built page, plus llms.txt and llms-full.txt (see
// https://llmstxt.org).
//
// It runs after the build, reads each page in build/, converts the page's
// content area to Markdown, and writes it next to the HTML: /about becomes
// /about.md, and a canonical URL ending in "/" (the home page, /samples/)
// becomes /index.md. It works from the built HTML rather than the MDX
// source, so includes, components, and Tabs are already resolved. A few
// pages are left out entirely (see EXCLUDED in src/data/llms.mjs).
//
// Each .md file starts with front matter (title, canonical URL,
// description, author), a pointer to llms.txt, and, on genericized
// samples, the disclaimer from src/includes/disclaimer.md.
//
// llms.txt lists every page's .md URL in sections, in reading order: the
// docs and samples sidebars (read from the loaded content, since collapsed
// sidebar categories aren't in the HTML), the blog newest first, and the
// portfolio in the order /portfolio links to it. The Norway Data API guides
// get their own section, and the other samples follow under "Writing
// samples". Docs category pages get .md files but aren't listed (see
// UNLISTED). llms-full.txt is every listed page in one file.
//
// Every HTML page also points agents to llms.txt: a visually hidden line at
// the top of <body> and a <link rel="llms-txt"> in <head> (see
// injectHtmlTags). They're added when Docusaurus renders the page, not
// afterward, and include no script.
//
// After the build, it writes only .md and .txt files and never changes HTML.
// That keeps the inline script hashes in build/_headers valid (see
// plugins/csp-headers-plugin.mjs, the only writer of _headers).
//
// Before converting, it fixes the Docusaurus markup that doesn't convert
// cleanly on its own (see cleanUp):
// - Heading "#" links (which contain a zero-width space) are removed.
// - Code blocks are rebuilt from Prism's per-line markup, keeping the
//   language and title (in the fence and on a line above it).
// - Tabs become a bold label followed by that tab's content.
// - Admonitions become blockquotes that start with their title.
// - Visuals are left out: every <figure> (all mockup and diagram
//   components render as one, marked data-markdown-ignore), image, and
//   SVG.
// - React's empty <!-- --> comments, form controls, and anything marked
//   aria-hidden or data-markdown-ignore are dropped too.
// - Links become absolute URLs; links to pages point at their .md copy.

import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { select, selectAll } from 'hast-util-select';
import { hasMarkdown, markdownPath } from '../src/data/llms.mjs';

// The page's content area, tried in order: docs and samples, a blog post's
// body, an MDX page, then the whole layout (the home page keeps its content
// in a hero <header> outside <main>).
const CONTENT_SELECTORS = [
  '.theme-doc-markdown',
  '#__blog-post-container',
  'main article',
  '.main-wrapper',
];

// Elements that carry no readable content, or only interface chrome.
// Figures, images, and SVGs are visual: the mockup and diagram components
// (src/components/*Mockup*, *Diagrams) all render inside a <figure>.
const DROP = [
  'script', 'style', 'noscript', 'template',
  'figure', 'img', 'picture', 'video', 'svg',
  'button', 'input', 'select', 'textarea',
  'a.hash-link', '.theme-edit-this-page',
  '[aria-hidden=true]', '[data-markdown-ignore]',
].join(', ');


// The blockquote at the top of llms.txt and llms-full.txt.
const SUMMARY = [
  'Portfolio site of Marla Sowards, an AI-fluent documentation engineer: her resume,',
  'portfolio write-ups, blog posts, documentation for the site itself, the guides and',
  'OpenAPI spec for the Norway Data API, and writing samples. The portfolio write-ups and',
  'most writing samples describe work done for employers, genericized with fictional',
  'company and product names (such as Clearpath); the Norway Data API is real.',
];

// Pages that get a .md file (other pages link to them) but aren't listed in
// llms.txt: docs category pages, which only list links to pages that are.
// Everything else in the sitemap is listed, so checkers that compare the
// two (such as afdocs's llms-txt-coverage) find every page.
const UNLISTED = [/^\/docs\/category\//];

const NORWAY = '/samples/norway-data-api-guides/';

const OPENAPI_ITEM = '- [Norway Data API OpenAPI spec](https://api.marlasowards.com/openapi/norway-data.yaml): The OpenAPI 3.1 spec for the Norway Data API, which the guides above call. It is also the source of the interactive API reference on this site.';

// Whose writing it is, for the author line in each page's front matter.
// Blog posts (pages with a blog post container) get their own label.
const WRITING_SAMPLE = /^\/(samples|portfolio)(\/|$)/;

// Sample guides that are genericized versions of employer work. Their .md
// files start with the disclaimer from src/includes/disclaimer.md. (Portfolio
// pages already include it in their content.)
const GENERICIZED = /^\/samples\/(clearpath-collect-guide|clearpath-roster-guide|contributor-guide|release-notes-automation-guide|technical-marketing)\//;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') && entry.name !== '404.html' ? [full] : [];
  }));
  return nested.flat();
}


function classList(node) {
  const value = node.properties?.className;
  return Array.isArray(value) ? value.map(String) : [];
}

function hasClassPrefix(node, prefix) {
  return classList(node).some((name) => name.startsWith(prefix));
}

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function element(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}

function text(value) {
  return { type: 'text', value };
}

// Calls fn(node, index, parent) for every node below tree, children first,
// so fn can replace or remove the node it's given. fn returns the nodes to
// put in its place, or undefined to keep it.
function rewrite(tree, fn) {
  if (!tree.children) return;
  const result = [];
  for (const child of tree.children) {
    rewrite(child, fn);
    const replacement = fn(child, tree);
    if (replacement === undefined) result.push(child);
    else result.push(...replacement);
  }
  tree.children = result;
}

// A Prism code block: <div class="language-js theme-code-block"> with an
// optional title div and one .token-line div per line. Reading the lines
// one by one avoids the blank line the <br> in each would otherwise add.
function codeBlock(node) {
  const lang = classList(node).find((name) => name.startsWith('language-'))?.slice('language-'.length);
  const titleNode = select('[class*=codeBlockTitle]', node);
  const lines = selectAll('.token-line', node);
  const value = lines.length
    ? lines.map((line) => textOf(line).replace(/\n$/, '')).join('\n')
    : textOf(select('code', node) ?? node);
  // A real <pre>, so rehype-remark keeps its whitespace. The title goes in
  // a data attribute for the pre handler in toMarkdown below.
  const title = titleNode ? textOf(titleNode).trim() : '';
  const pre = element('pre', { dataTitle: title || undefined }, [
    element('code', { className: lang ? [`language-${lang}`] : [] }, [text(value)]),
  ]);
  // The fence's title="..." is only metadata, which Markdown readers (and
  // afdocs's markdown-content-parity check) don't show as text, so the
  // title also goes on its own line above the block.
  return title ? [element('p', {}, [element('code', {}, [text(title)])]), pre] : [pre];
}

// Tabs: a list of tab labels, then one tabpanel per label (only the first
// is visible; the rest are hidden but present in the HTML).
function tabs(node) {
  const labels = selectAll('[role=tab]', node).map((tab) => textOf(tab).trim());
  const panels = selectAll('[role=tabpanel]', node);
  return panels.flatMap((panel, index) => [
    element('p', {}, [element('strong', {}, [text(labels[index] ?? `Tab ${index + 1}`)])]),
    ...panel.children,
  ]);
}

// Admonitions: "note", "tip", and so on, with an optional custom title.
function admonition(node) {
  const type = classList(node).find((name) => name.startsWith('theme-admonition-'))?.slice('theme-admonition-'.length) ?? 'note';
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  const heading = node.children.find((child) => hasClassPrefix(child, 'admonitionHeading'));
  const content = node.children.find((child) => hasClassPrefix(child, 'admonitionContent'));
  const title = heading ? textOf(heading).trim() : '';
  const label = !title || title.toLowerCase() === type ? typeLabel : `${typeLabel}: ${title}`;
  return [element('blockquote', {}, [
    element('p', {}, [element('strong', {}, [text(label)])]),
    ...(content?.children ?? []),
  ])];
}

// Components can put words in side-by-side <span>s, and the home page puts
// its buttons in side-by-side links. In the page, CSS spaces them out; in
// Markdown they'd run together, so add a space between such siblings. Empty
// elements in between (a divider) are skipped.
const SPACED = new Set(['span', 'a']);

function spaceAdjacentSpans(tree) {
  if (!tree.children) return;
  if (tree.tagName === 'pre' || tree.tagName === 'code') return;
  const out = [];
  let previous = null;
  for (const child of tree.children) {
    const right = textOf(child);
    if (child.type === 'text') {
      if (right.trim() || /\s/.test(right)) previous = null;
    } else if (child.type === 'element' && right.trim()) {
      if (previous && SPACED.has(previous.tagName) && SPACED.has(child.tagName)
          && !/\s$/.test(textOf(previous)) && !/^\s/.test(right)) {
        out.push(text(' '));
      }
      previous = child;
    }
    out.push(child);
  }
  tree.children = out;
  for (const child of tree.children) spaceAdjacentSpans(child);
}

function cleanUp(content, { pageUrl, mdUrlFor }) {
  rewrite(content, (node) => {
    if (node.type === 'comment') return [];
    if (node.type === 'text') {
      return node.value.includes('​') ? [text(node.value.replaceAll('​', ''))] : undefined;
    }
    if (node.type !== 'element') return undefined;
    const classes = classList(node);
    if (classes.includes('theme-code-block')) return codeBlock(node);
    if (classes.includes('tabs-container')) return tabs(node);
    if (classes.includes('theme-admonition')) return admonition(node);
    return undefined;
  });

  // Dropped after Tabs are expanded, since hidden tab panels are real
  // content.
  const dropped = new Set(selectAll(DROP, content));
  rewrite(content, (node) => (dropped.has(node) ? [] : undefined));

  // A Panel (src/components/Panel) that only held a figure has just its
  // caption left, which would introduce nothing, so drop it too.
  rewrite(content, (node) => {
    if (!hasClassPrefix(node, 'panel_')) return undefined;
    const label = node.children?.find((child) => hasClassPrefix(child, 'panelLabel'));
    const rest = textOf(node).replace(label ? textOf(label) : '', '');
    return rest.trim() ? undefined : [];
  });

  for (const link of selectAll('a[href]', content)) {
    link.properties.href = absoluteHref(String(link.properties.href), pageUrl, mdUrlFor);
  }
  spaceAdjacentSpans(content);
}

// Same-site links to a page go to its .md copy, keeping any #fragment.
// Other links (files, other hosts, mailto:) just become absolute.
function absoluteHref(href, pageUrl, mdUrlFor) {
  let url;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return href;
  }
  if (url.origin !== new URL(pageUrl).origin) return url.href;
  const md = mdUrlFor.get(url.pathname) ?? mdUrlFor.get(url.pathname.replace(/\/$/, ''));
  return md ? `${md}${url.search}${url.hash}` : url.href;
}

const toMarkdown = unified()
  .use(rehypeRemark, {
    handlers: {
      // Like the default <pre> handler, plus the title that codeBlock()
      // stores in data-title.
      pre(state, node) {
        const code = node.children.find((child) => child.tagName === 'code') ?? node;
        const lang = classList(code).find((name) => name.startsWith('language-'))?.slice('language-'.length);
        const title = node.properties.dataTitle;
        const result = {
          type: 'code',
          lang: lang || null,
          meta: title ? `title="${title}"` : null,
          value: textOf(code).replace(/\n$/, ''),
        };
        state.patch(node, result);
        return result;
      },
    },
  })
  .use(remarkGfm)
  .use(remarkStringify, {
    bullet: '-',
    emphasis: '_',
    fences: true,
    listItemIndent: 'one',
    rule: '-',
  });

// site is { url, title } from docusaurus.config.js.
function pageInfo(tree, site) {
  const canonical = select('link[rel=canonical]', tree)?.properties.href;
  const titleNode = select('title', tree);
  const description = select('meta[name=description]', tree)?.properties.content;
  return {
    canonical: canonical ? String(canonical) : null,
    title: titleNode ? textOf(titleNode).replace(` | ${site.title}`, '').trim() : '',
    description: description ? String(description).trim() : '',
  };
}

// Writes a .md file for every page that hasMarkdown() allows. Returns the
// pages it wrote, with their Markdown (header included).
export async function writeMarkdownPages(outDir, { disclaimer, site }) {
  const parser = unified().use(rehypeParse);
  const pages = [];
  for (const file of await htmlFiles(outDir)) {
    const tree = parser.parse(await readFile(file, 'utf8'));
    const { canonical, title, description } = pageInfo(tree, site);
    if (!canonical) continue;
    const { pathname } = new URL(canonical);
    if (!hasMarkdown(pathname)) continue;
    pages.push({ file, tree, canonical, title, description, pathname, mdPath: markdownPath(pathname) });
  }

  // Every page's .md URL, by its pathname, so links can point at them.
  const mdUrlFor = new Map(pages.map((page) => [page.pathname, new URL(page.mdPath, page.canonical).href]));

  const results = [];
  for (const page of pages) {
    const content = CONTENT_SELECTORS.map((selector) => select(selector, page.tree)).find(Boolean);
    if (!content) {
      console.warn(`[llms-txt-plugin] No content area found in ${path.relative(outDir, page.file)}; skipped.`);
      continue;
    }
    const root = { type: 'root', children: [content] };
    cleanUp(root, { pageUrl: page.canonical, mdUrlFor });

    // Blog posts keep their title outside the body, so add it.
    if (!select('h1', root)) {
      const h1 = select('.main-wrapper h1', page.tree);
      root.children.unshift(element('h1', {}, [text(h1 ? textOf(h1).trim() : page.title)]));
    }

    const body = String(toMarkdown.stringify(await toMarkdown.run(root))).trim();
    const markdown = `${pageHeader(page, disclaimer, site)}\n${body}\n`;
    const target = path.join(outDir, ...page.mdPath.split('/'));
    // build/ starts empty, so an existing file came from static/ and would
    // be ambiguous: fail rather than guess which one should be published.
    if (await access(target).then(() => true, () => false)) {
      throw new Error(`[llms-txt-plugin] ${page.mdPath} already exists in the build (from static/?). Rename or remove it; this plugin writes that file.`);
    }
    await writeFile(target, markdown);
    results.push({ ...page, mdUrl: mdUrlFor.get(page.pathname), markdown });
  }
  return results;
}

// Front matter, a pointer to llms.txt, and (on genericized samples) the
// disclaimer. JSON strings are valid YAML double-quoted strings.
function pageHeader(page, disclaimer, site) {
  const author = select('#__blog-post-container', page.tree)
    ? 'Blog post by Marla Sowards'
    : WRITING_SAMPLE.test(page.pathname) ? 'Writing sample by Marla Sowards' : 'Marla Sowards';
  const lines = [
    '---',
    `title: ${JSON.stringify(page.title)}`,
    `url: ${page.canonical}`,
    ...(page.description ? [`description: ${JSON.stringify(page.description)}`] : []),
    `author: ${author}`,
    '---',
    '',
    `> For an index of every page on this site, see [llms.txt](${site.url}/llms.txt).`,
    '',
  ];
  if (GENERICIZED.test(page.pathname)) lines.push(`> **Note:** ${disclaimer}`, '');
  return lines.join('\n');
}

// The text of src/includes/disclaimer.md, without its :::note fence.
async function readDisclaimer(siteDir) {
  const source = await readFile(path.join(siteDir, 'src', 'includes', 'disclaimer.md'), 'utf8');
  return source.replace(/^:::\w*\s*$/gm, '').replace(/\s+/g, ' ').trim();
}

// The docs ids in a sidebar, in order, including docs that categories link
// to. Generated category index pages aren't docs, so they're skipped.
function sidebarDocIds(items) {
  return items.flatMap((item) => {
    if (item.type === 'doc' || item.type === 'ref') return [item.id];
    if (item.type === 'category') {
      return [...(item.link?.type === 'doc' ? [item.link.id] : []), ...sidebarDocIds(item.items)];
    }
    return [];
  });
}

// Each docs instance's pages, by sidebar, as lists of pathnames in sidebar
// order. Sidebars with collapsed categories aren't fully in the HTML, so
// this comes from the loaded content instead.
function docsOrder(docsContent) {
  const version = docsContent?.loadedVersions?.[0];
  if (!version) return [];
  const permalinkFor = new Map(version.docs.map((doc) => [doc.id, doc.permalink]));
  return Object.values(version.sidebars).map((items) => (
    [...new Set(sidebarDocIds(items).map((id) => permalinkFor.get(id)).filter(Boolean))]
  ));
}

function listItem(page) {
  const description = page.description && page.description !== page.title ? `: ${page.description}` : '';
  const title = page.pathname === '/' ? 'Home' : page.title || page.pathname;
  return `- [${title}](${page.mdUrl})${description}`;
}

// llms.txt: a summary, then one section per part of the site, each listing
// its pages' .md URLs in reading order. Pages that the order lists don't
// cover go at the end of the section their path belongs to, so a new page
// is never left out.
function buildIndex(results, order, site) {
  const byPath = new Map(results.map((page) => [page.pathname, page]));
  const placed = new Set(UNLISTED.flatMap((pattern) => results.filter((page) => pattern.test(page.pathname)).map((page) => page.pathname)));
  const take = (pathnames) => pathnames
    .filter((pathname) => byPath.has(pathname) && !placed.has(pathname))
    .map((pathname) => {
      placed.add(pathname);
      return byPath.get(pathname);
    });
  const rest = (prefix) => take(results.map((page) => page.pathname).filter((pathname) => pathname.startsWith(prefix)).sort());

  const sections = [
    ['About and Resume and How I built this site', [...take(['/', '/about', '/resume', '/how-i-built-this-site']), ...rest('/')]],
    ['Portfolio', [...take(['/portfolio', ...order.portfolio]), ...rest('/portfolio/')]],
    ['Blog', [...take(order.blog), ...rest('/blog/')]],
    ['Site docs', [...take(order.docs.flat()), ...rest('/docs/')]],
    // The OpenAPI spec goes right after the guides.
    ['Norway Data API', [...take(order.samples.flat().filter((pathname) => pathname.startsWith(NORWAY))), ...rest(NORWAY), { openapi: true }]],
    // The /samples landing page and the genericized samples, in sidebar order.
    ['Writing samples', [...take(order.samples.flat()), ...rest('/samples')]],
  ];

  const leftOver = results.filter((page) => !placed.has(page.pathname));
  for (const page of leftOver) console.warn(`[llms-txt-plugin] ${page.pathname} isn't in any llms.txt section.`);

  const lines = [`# ${site.title}`, '', ...SUMMARY.map((line) => `> ${line}`), ''];
  for (const [heading, pages] of sections) {
    lines.push(`## ${heading}`, '');
    for (const page of pages) lines.push(page.openapi ? OPENAPI_ITEM : listItem(page));
    lines.push('');
  }
  return { lines, sections };
}

export default function llmsTxtPlugin(context) {
  const site = { url: context.siteConfig.url, title: context.siteConfig.title };
  const order = { docs: [], samples: [], blog: [], portfolio: [] };
  return {
    name: 'llms-txt-plugin',
    // The same pointer as at the top of each .md file, first in <body> so
    // agents reading the HTML see it before anything else. Visually hidden,
    // but not aria-hidden, since some agents read the accessibility tree.
    // Inline styles are allowed by the CSP (style-src 'unsafe-inline').
    injectHtmlTags() {
      const llmsUrl = `${site.url}/llms.txt`;
      return {
        headTags: [{ tagName: 'link', attributes: { rel: 'llms-txt', href: llmsUrl } }],
        preBodyTags: [
          `<p data-llms-txt style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">For an index of every page on this site, see <a href="${llmsUrl}">llms.txt</a>.</p>`,
        ],
      };
    },
    async allContentLoaded({ allContent }) {
      const docs = allContent['docusaurus-plugin-content-docs'] ?? {};
      order.docs = docsOrder(docs.default);
      order.samples = docsOrder(docs.userGuide);
      const blogPosts = allContent['docusaurus-plugin-content-blog']?.default?.blogPosts ?? [];
      // Newest first. Posts from the same day (a series) can load in any
      // order, so sort those by URL to keep llms.txt the same every build.
      order.blog = blogPosts
        .map(({ metadata }) => ({ permalink: metadata.permalink, time: new Date(metadata.date).getTime() }))
        .sort((a, b) => b.time - a.time || a.permalink.localeCompare(b.permalink))
        .map(({ permalink }) => permalink);
    },
    async postBuild({ outDir }) {
      const disclaimer = await readDisclaimer(context.siteDir);
      const results = await writeMarkdownPages(outDir, { disclaimer, site });

      // The portfolio's own order: the order /portfolio links to its pages.
      const portfolio = results.find((page) => page.pathname === '/portfolio');
      order.portfolio = portfolio
        ? [...portfolio.markdown.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)]
          .map(([, url]) => new URL(url).pathname.replace(/\.md$/, ''))
          .filter((pathname) => pathname.startsWith('/portfolio/'))
        : [];

      const { lines, sections } = buildIndex(results, order, site);
      const llmsTxt = lines.join('\n');

      const fullPages = sections.flatMap(([, pages]) => pages.filter((page) => !page.openapi));
      const llmsFull = [
        `# ${site.title}: full text`,
        '',
        ...SUMMARY.map((line) => `> ${line}`),
        '',
        `> Every page listed in ${site.url}/llms.txt, in the same order. Each page starts with its own front matter.`,
        '',
        ...fullPages.map((page) => page.markdown),
      ].join('\n');

      const fullSize = Buffer.byteLength(llmsFull);
      const index = `${llmsTxt}\n## Optional\n\n- [Full text of every page](${site.url}/llms-full.txt): All ${fullPages.length} pages above in one file (about ${Math.round(fullSize / 1024)} KB).\n`;
      await writeFile(path.join(outDir, 'llms.txt'), index);
      await writeFile(path.join(outDir, 'llms-full.txt'), llmsFull);
      console.log(`[llms-txt-plugin] Wrote ${results.length} Markdown page(s), llms.txt (${Math.round(Buffer.byteLength(index) / 1024)} KB, ${fullPages.length} pages), and llms-full.txt (${Math.round(fullSize / 1024)} KB).`);
    },
  };
}
