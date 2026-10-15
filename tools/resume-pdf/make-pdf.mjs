// Prints the built /resume page to build/pdf/resume.pdf, so the PDF always
// matches the page. Run after `npm run build`:
//
//   npm ci --ignore-scripts --prefix tools/resume-pdf
//   npx --prefix tools/resume-pdf playwright install chromium
//   node tools/resume-pdf/make-pdf.mjs
//
// The page's print styles are in src/pages/resume.module.css.

import { createServer } from 'node:http';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const buildDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../build');
const outFile = path.join(buildDir, 'pdf', 'resume.pdf');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Serves build/ the way Netlify does: /resume -> /resume/index.html.
async function resolveFile(urlPath) {
  const file = path.join(buildDir, decodeURIComponent(urlPath));
  if (!file.startsWith(buildDir)) return null;
  for (const candidate of [file, path.join(file, 'index.html'), `${file}.html`]) {
    const info = await stat(candidate).catch(() => null);
    if (info?.isFile()) return candidate;
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(new URL(req.url, 'http://localhost').pathname);
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const response = await page.goto(`http://127.0.0.1:${port}/resume`, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error(`/resume returned ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });

  await mkdir(path.dirname(outFile), { recursive: true });
  await page.pdf({
    path: outFile,
    format: 'Letter',
    margin: { top: '0.6in', bottom: '0.6in', left: '0.75in', right: '0.75in' },
    printBackground: true,
  });
  console.log(`Wrote ${path.relative(process.cwd(), outFile)}`);
} finally {
  await browser.close();
  server.close();
}
