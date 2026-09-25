// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import remarkImageSize from './plugins/remark-image-size.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Marla Sowards',
  tagline: 'AI-Fluent Content Engineer • Technical Writer and Editor • Docs-as-Code and CCMS Workflows • Zendesk Master • AI Conversation Designer • AI-Assisted Pipelines',
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
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkImageSize],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          remarkPlugins: [remarkImageSize],
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
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
            type: 'dropdown',
            label: 'Portfolio',
            position: 'left',
            className: 'navbar__item--experience',
            items: [
              {
                type: 'custom-nestedDropdown',
                label: 'AI tools and pipelines',
                to: '/experience/content-engineering',
                items: [
                  { label: 'Custom MCPs', to: '/experience/custom-mcps' },
                  { label: 'AI agent skills', to: '/experience/ai-agent-skills' },
                  { label: 'Knowledge taxonomy for AI drafting', to: '/experience/ai-knowledge-taxonomy' },
                ],
              },
              {
                type: 'custom-nestedDropdown',
                label: 'Content development',
                to: '/experience/content-development',
                items: [
                  { label: 'Technical writing', to: '/experience/technical-writing' },
                  { label: 'Docs-as-code: Standing it up', to: '/experience/docs-as-code' },
                  { label: 'Docs-as-code: Scaling contributions', to: '/experience/docs-as-code-contributions' },
                  { label: 'Docs-as-code: Linting', to: '/experience/docs-as-code-linting' },
                  { label: 'Docs-as-code: Customizations', to: '/experience/docs-as-code-customizations' },
                  { label: 'API documentation', to: '/experience/api-documentation' },
                  { label: 'Automated release notes', to: '/experience/automated-release-notes' },
                  { label: 'Structured authoring in Paligo', to: '/experience/paligo-structured-authoring' },
                  { label: 'Choosing a CCMS', to: '/experience/ccms-evaluation' },
                  { label: 'Content request form and prioritization', to: '/experience/content-intake' },
                  { label: 'UX writing', to: '/experience/ux-writing-roster-upload' },
                ],
              },
              {
                type: 'custom-nestedDropdown',
                label: 'Content engagement',
                to: '/experience/content-engagement',
                items: [
                  { label: 'Help site relaunch', to: '/experience/help-site-relaunch' },
                  { label: 'AI chatbot', to: '/experience/ai-chatbot' },
                  { label: 'Help center theme engineering', to: '/experience/help-center-theme-engineering' },
                  { label: 'Analytics dashboard design', to: '/experience/analytics-dashboard-design' },
                  { label: 'Standing up docs at companies', to: '/experience/standing-up-docs-at-companies' },
                ],
              },
            ],
          },
          {
            to: '/resume',
            label: 'Resume',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://www.linkedin.com/in/marlasowards',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://github.com/cedar-ave/portfolio',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/cedar-ave',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/7848350/hcdocs',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/cedar-ave',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Marla Sowards`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config