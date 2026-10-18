// Content negotiation for AI agents. Some agents (Claude Code, Cursor,
// OpenCode) send "Accept: text/markdown". When a request prefers Markdown
// over HTML, this serves the page's Markdown copy (written at build time by
// plugins/llms-txt-plugin.mjs) at the page's own URL. Browsers never ask for
// text/markdown, so they always get the HTML.
//
// It returns a URL, which Netlify treats as a rewrite: the .md file is
// served from the CDN with its netlify.toml headers (Content-Type
// text/markdown). Any other request passes through untouched.
//
// Edge Functions run before Netlify's cache, so the cached HTML and .md
// files are never mixed up. If the function fails, onError: "bypass" serves
// the normal page.

import { hasMarkdown, markdownPath } from '../../src/data/llms.mjs';

// The q value the Accept header gives a media type, or 0 when it's not
// listed. Only exact entries count: "*/*" and "text/*" never select
// Markdown.
function quality(entries, type) {
  const entry = entries.find((e) => e.type === type);
  return entry ? entry.q : 0;
}

export function prefersMarkdown(accept) {
  if (!accept || !accept.toLowerCase().includes('text/markdown')) return false;
  const entries = accept.split(',').map((part, index) => {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    const q = params
      .map((p) => p.trim().match(/^q=([0-9.]+)$/))
      .find(Boolean);
    return { type: type.trim(), q: q ? Number(q[1]) : 1, index };
  });
  const md = quality(entries, 'text/markdown');
  const html = quality(entries, 'text/html');
  if (md === 0) return false;
  if (md !== html) return md > html;
  // Same q value: the type listed first wins.
  const order = (type) => entries.findIndex((e) => e.type === type);
  return order('text/markdown') < order('text/html');
}

export default async (request) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  if (!prefersMarkdown(request.headers.get('accept'))) return;
  const { pathname } = new URL(request.url);
  if (!hasMarkdown(pathname)) return;
  return new URL(markdownPath(pathname), request.url);
};

// Every page URL, but no files: anything with a dot (assets, images, .md,
// llms.txt, sitemap.xml) skips the function.
export const config = {
  path: '/*',
  excludedPath: ['/*.*'],
  onError: 'bypass',
};
