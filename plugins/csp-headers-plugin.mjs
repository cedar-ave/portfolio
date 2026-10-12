// Docusaurus plugin that writes the site's Content Security Policy into
// Netlify's `_headers` file after every build.
//
// The site's HTML has a few inline <script> blocks (the color-mode script
// and the Google Analytics setup). A strict policy has to list each one by
// hash, and the hashes change whenever Docusaurus or the analytics snippet
// changes. So instead of hardcoding them, this plugin reads every built HTML
// page, hashes each distinct inline script, and writes the policy with the
// current hashes into build/_headers, which Netlify reads at deploy time.
//
// Two policies are sent:
//
// - ENFORCED: directives that can't break the site (no framing, no
//   plugins, no <base> or form-target hijacking, HTTPS only). Browsers
//   block violations.
// - REPORT_ONLY: the full allowlist for scripts, styles, fonts, images, and
//   connections. Browsers only log violations to the console, without
//   blocking anything. Once a check of the site shows no violations, set
//   ENFORCE_FULL_POLICY to true to enforce it. See
//   docs/norway-data-api/security.mdx.
//
// Other security headers (HSTS, X-Frame-Options, and so on) are static, so
// they're in netlify.toml instead.

import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ENFORCE_FULL_POLICY = false;

// Where the site loads things from. Keep in sync with what the site uses:
// Google Analytics and Google Fonts on every page, Scalar from jsDelivr and
// the Norway Data API on /api-reference, and the Iconify icon API, which
// @iconify/react calls at runtime for icons that aren't bundled.
const SOURCES = {
  'script-src': ["'self'", 'https://www.googletagmanager.com', 'https://cdn.jsdelivr.net'],
  // React and Scalar set inline styles, which can't be hashed.
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': [
    "'self'",
    'https://api.marlasowards.com',
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://api.iconify.design',
    'https://api.simplesvg.com',
    'https://api.unisvg.com',
  ],
};

const ENFORCED = [
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
];

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  }));
  return nested.flat();
}

// Inline scripts that run as JavaScript: no src, and no type, or a JS type.
// (JSON-LD and other data blocks don't run, so CSP doesn't apply to them.)
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
const JS_TYPE = /\btype=["']?(?!text\/javascript|module|application\/javascript)[^"'\s>]+/i;

export async function inlineScriptHashes(outDir) {
  const hashes = new Set();
  for (const file of await htmlFiles(outDir)) {
    const html = await readFile(file, 'utf8');
    for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
      if (JS_TYPE.test(attrs) || !body.trim()) continue;
      hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
    }
  }
  return [...hashes].sort();
}

export function fullPolicy(hashes) {
  const directives = { 'default-src': ["'self'"], ...SOURCES };
  directives['script-src'] = [...directives['script-src'], ...hashes];
  return [...Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`), ...ENFORCED].join('; ');
}

export default function cspHeadersPlugin() {
  return {
    name: 'csp-headers-plugin',
    async postBuild({ outDir }) {
      const hashes = await inlineScriptHashes(outDir);
      const full = fullPolicy(hashes);
      const lines = ['/*'];
      if (ENFORCE_FULL_POLICY) {
        lines.push(`  Content-Security-Policy: ${full}`);
      } else {
        lines.push(`  Content-Security-Policy: ${ENFORCED.join('; ')}`);
        lines.push(`  Content-Security-Policy-Report-Only: ${full}`);
      }
      await writeFile(path.join(outDir, '_headers'), `${lines.join('\n')}\n`);
      console.log(`[csp-headers-plugin] Wrote _headers with ${hashes.length} inline script hash(es); full policy ${ENFORCE_FULL_POLICY ? 'enforced' : 'report-only'}.`);
    },
  };
}
