// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import path from 'path';
import { fileURLToPath } from 'url';
import { themes as prismThemes } from 'prism-react-renderer';
import remarkImageSize from './plugins/remark-image-size.mjs';
import remarkPanelToc from './plugins/remark-panel-toc.mjs';
import remarkIncludesPlugin from './plugins/remark-includes.mjs';
import blogSeriesPlugin from './plugins/blog-series-plugin.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteDir = path.dirname(fileURLToPath(import.meta.url));

// \{@include: ...\} works the same (and "/"-rooted paths resolve the same
// way) in every content type below - see plugins/remark-includes.mjs. Note
// the directive's braces must be backslash-escaped in the source file
// (MDX would otherwise try to parse a bare "{...}" as a JS expression), and
// this is registered via beforeDefaultRemarkPlugins rather than
// remarkPlugins so it runs before Docusaurus's own admonitions-transform
// plugin - otherwise an included ":::note" block would be left as an
// unhandled directive instead of becoming a real callout.
const remarkIncludes = [remarkIncludesPlugin, { siteRoot: siteDir }];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Marla Sowards',
  tagline: 'AI-fluent documentation engineer • Technical writer and editor • Docs-as-code and CCMS workflows • Zendesk master • AI conversation designer • AI-assisted pipelines',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.marlasowards.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cedar-ave', // Usually your GitHub org/user name.
  projectName: 'portfolio', // Usually your repo name.

  onBrokenLinks: 'throw',

  themes: ['docusaurus-theme-zoom-image'],

  plugins: [
    blogSeriesPlugin,
    // A second, standalone docs instance for the "Product user guide" demo
    // linked from /portfolio. It's deliberately not in the navbar - it's a
    // sample guide, not a real section of this site. See
    // sidebars-samples.js.
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'userGuide',
        path: 'samples',
        routeBasePath: 'samples',
        sidebarPath: './src/js/sidebars-samples.js',
        remarkPlugins: [remarkImageSize],
        // remarkIncludes must run before Docusaurus's admonitions-transform
        // remark plugin (which runs early in the default pipeline), so an
        // included ":::note" block gets converted into a real callout
        // instead of being left as an unhandled directive. See the
        // remarkIncludes comment above for why it's registered here
        // instead of in remarkPlugins.
        beforeDefaultRemarkPlugins: [remarkIncludes],
        editUrl: undefined,
        // The sample content's own cross-links use the raw numbered
        // filenames (e.g. "./02-about-delegated-authority"). Keep that
        // prefix in doc ids/slugs instead of rewriting ~30 links.
        numberPrefixParser: false,
      }),
    ],
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  ],

  // Roboto: all weights (100-900), widths (75-100) and italics
  // Roboto Mono: all weights (100-700), used for the site's monospace font
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './src/js/sidebars-docs.js',
          remarkPlugins: [remarkImageSize],
          // remarkIncludes has to run before the admonitions transform, so
          // it's registered via beforeDefaultRemarkPlugins instead - see
          // the remarkIncludes comment near the top of this file.
          beforeDefaultRemarkPlugins: [remarkIncludes],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          // Show every post in the sidebar (default caps it at the 5 most
          // recent), so year groups and series stay complete instead of
          // truncating older posts as new ones are published.
          blogSidebarCount: 'ALL',
          // Every non-hidden post's content lives on a single generated
          // /blog route instead of being split across /blog, /blog/page/2,
          // etc. at build time. src/theme/BlogListPage then does its own
          // pagination over the *filtered* (hide_from_index-excluded) list
          // at render time — something it can't do if Docusaurus has
          // already split posts across separate static routes, since a
          // swizzled component only ever receives its own route's slice.
          // See docs/blog/blog-index-list-filtering.mdx.
          postsPerPage: 'ALL',
          // Drafts in progress live in blog/to-write/ and shouldn't be
          // picked up as published posts.
          exclude: ['**/to-write/**'],
          remarkPlugins: [remarkImageSize],
          // remarkIncludes has to run before the admonitions transform, so
          // it's registered via beforeDefaultRemarkPlugins instead - see
          // the remarkIncludes comment near the top of this file.
          beforeDefaultRemarkPlugins: [remarkIncludes],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          // See plugins/remark-panel-toc.mjs - lets a page set
          // `toc_source: panels` in frontmatter to build its right-rail TOC
          // from <Panel label="..."> captions instead of headings.
          remarkPlugins: [remarkPanelToc],
          // remarkIncludes has to run before the admonitions transform, so
          // it's registered via beforeDefaultRemarkPlugins instead - see
          // the remarkIncludes comment near the top of this file.
          beforeDefaultRemarkPlugins: [remarkIncludes],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-8S1BSK4F9Q',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card shown when links to this site are shared (LinkedIn, Twitter, etc.)
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'site logo',
          src: 'img/json.svg',
        },
        items: [
          {
            to: '/about',
            label: 'About',
            position: 'left',
          },
          {
            to: '/portfolio',
            label: 'Portfolio',
            position: 'left',
          },
          {
            to: '/resume',
            label: 'Resume',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'How I built this site',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://www.linkedin.com/in/marlasowards',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://github.com/cedar-ave',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/cedar-ave',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/marlasowards',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/7848350/hcdocs',
              }
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Marla Sowards`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
      // The application ID provided by Algolia
      appId: 'I2LND0US2V',

      // Public API key: it is safe to commit it
      apiKey: 'bfd10be5ac1891368348418a30de26fe',

      indexName: 'Portfolio',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      // Optional: whether you want to use the new Ask AI feature (undefined by default)
      askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',

      //... other Algolia params
    },
    }),
};

export default config