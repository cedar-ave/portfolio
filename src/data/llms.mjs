// Which pages have a Markdown copy, and its URL, in one place for both
// users: the plugin that writes the copies (plugins/llms-txt-plugin.mjs) and
// the "Copy page" bar that links to them (src/components/PageActions).

// Pages that get no .md file and aren't in llms.txt: a form, a demo page,
// search, the blog's list, tag, author, and archive pages (the posts
// themselves are included), and the API reference, which Scalar renders in
// the browser, so its HTML has no content. llms.txt links the OpenAPI spec
// instead.
export const EXCLUDED = [
  /^\/(contact|markdown-page|search|api-reference|blog)$/,
  /^\/blog\/(tags|authors|archive)(\/|$)/,
];

export function hasMarkdown(pathname) {
  return !EXCLUDED.some((pattern) => pattern.test(pathname));
}

// "/about" -> "/about.md"; "/" or "/samples/" -> "/index.md", "/samples/index.md".
export function markdownPath(pathname) {
  return pathname.endsWith('/') ? `${pathname}index.md` : `${pathname}.md`;
}
