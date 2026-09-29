// Docusaurus content plugin that derives blog post series purely from each
// post's own front matter — no separate list of slugs to keep in sync.
//
// A post opts into a series by setting, in its front matter:
//
//   series_id: custom-mcps
//   series_title: "Series: Custom MCPs"
//   series_order: 1
//
// `series_title` only needs to be set on one post per series (the first one
// encountered wins), but it's fine — and clearer — to repeat it on every
// post in the series. `series_order` controls the post's position within
// the series list; posts without it sort last, in file order.
//
// This plugin reads the blog source files directly (front matter only, via
// a small hand-rolled parser — no third-party YAML/front-matter package is
// a project dependency) and exposes the grouped result as plugin data:
//
//   { series: [{ id, title, slugs: [...] }, ...] }
//
// consumed via `usePluginData('blog-series-plugin')` by:
//   - src/theme/BlogSidebar/Content/index.tsx (groups posts under a series
//     heading instead of the plain year list)
//
// The per-post `series_id` front matter field is read independently, at
// render time, by src/theme/BlogListPage/index.js to exclude series posts
// from the paginated post list — that lookup doesn't need this plugin's
// cross-post grouping, just the one field on the post being rendered.

import fs from 'node:fs';
import path from 'node:path';

const FRONT_MATTER_KEY = /^([A-Za-z0-9_]+):\s*(.*)$/;

function parseFrontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return {};
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const keyMatch = line.match(FRONT_MATTER_KEY);
    if (!keyMatch) {
      continue;
    }
    let [, key, value] = keyMatch;
    value = value.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return data;
}

function findBlogPostFiles(blogDir) {
  const files = [];
  for (const entry of fs.readdirSync(blogDir, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      const indexFile = ['index.mdx', 'index.md']
        .map((name) => path.join(blogDir, entry.name, name))
        .find((candidate) => fs.existsSync(candidate));
      if (indexFile) {
        files.push({filePath: indexFile, fallbackSlug: entry.name});
      }
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push({
        filePath: path.join(blogDir, entry.name),
        fallbackSlug: entry.name.replace(/\.mdx?$/, ''),
      });
    }
  }
  return files;
}

export default function blogSeriesPlugin(context) {
  return {
    name: 'blog-series-plugin',
    async loadContent() {
      const blogDir = path.join(context.siteDir, 'blog');
      if (!fs.existsSync(blogDir)) {
        return {series: []};
      }

      const seriesById = new Map();

      for (const {filePath, fallbackSlug} of findBlogPostFiles(blogDir)) {
        const frontMatter = parseFrontMatter(
          fs.readFileSync(filePath, 'utf8'),
        );
        if (!frontMatter.series_id) {
          continue;
        }

        if (!seriesById.has(frontMatter.series_id)) {
          seriesById.set(frontMatter.series_id, {
            id: frontMatter.series_id,
            title: frontMatter.series_title ?? frontMatter.series_id,
            posts: [],
          });
        }
        const series = seriesById.get(frontMatter.series_id);
        if (frontMatter.series_title && series.title === series.id) {
          series.title = frontMatter.series_title;
        }
        series.posts.push({
          slug: frontMatter.slug ?? fallbackSlug,
          order: frontMatter.series_order
            ? Number(frontMatter.series_order)
            : Number.MAX_SAFE_INTEGER,
        });
      }

      const seriesList = Array.from(seriesById.values()).map((series) => ({
        id: series.id,
        title: series.title,
        slugs: series.posts
          .sort((a, b) => a.order - b.order)
          .map((post) => post.slug),
      }));

      return {series: seriesList};
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
