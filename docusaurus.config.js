import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Your site Name here..',
  tagline: 'Website Developer',
  favicon: 'img/reacts.svg',
  url: 'https://yourdomain.com',
  baseUrl: '/',
  organizationName: 'githubuser', // Usually your GitHub org/user name.
  projectName: 'githubrepo', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          //     editUrl:
          //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          //   editUrl:
          //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'WEBDEV',
        logo: {
          alt: 'Modern and New Documentation Website Themes for Ducosarurs Project.',
          src: 'img/rea.svg',
        },
        items: [
          { to: '/', label: 'Home', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/product', label: 'Product', position: 'left' },
          { to: '/contact', label: 'Contact', position: 'left' },
          {
            href: 'https://docusar.pages.dev/order',
            label: 'Download',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Menu',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Docs',
                to: '/docs/welcome',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Product',
                to: '/product',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
            ],
          },
          {
            title: 'Themes',
            items: [
              {
                label: 'Blacks',
                href: 'https://www.hockeycomputindo.com/themes/astro/blacks-complete-astro-themes/',
              },
              {
                label: 'Text-X',
                href: 'https://www.hockeycomputindo.com/themes/bludit/clean-minimalis-blog-text-x/',
              },
              {
                label: 'Cyber',
                href: 'https://www.hockeycomputindo.com/themes/jekyll/new-jekyll-themes-template-cubber/',
              },
              {
                label: 'Ionic CMS',
                href: 'https://www.hockeycomputindo.com/themes/bludit/mobilewebsite-app-ui-bludicpro/',
              },
              {
                label: 'Dcouna',
                href: 'https://www.hockeycomputindo.com/themes/astro/starlight-doc-astro-js/',
              },
            ],
          },
          {
            title: 'Services',
            items: [
              {
                label: 'Docs Dev',
                href: 'https://www.fiverr.com/creativitas/design-modern-documentation-website-astro-js-stalight',
              },
              {
                label: 'Docusaurus CMS Dev',
                href: 'https://www.fiverr.com/creativitas/convert-your-figma-and-ui-design-to-flatfile-cms-or-ssg',
              },
              {
                label: 'React Dev',
                href: 'https://www.fiverr.com/creativitas/create-your-website-with-new-technology',
              },
              {
                label: 'Modern SSG Dev',
                href: 'https://www.fiverr.com/creativitas/design-your-modern-website-using-jekyll',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'themes',
                href: 'https://www.hockeycomputindo.com/themes',
              },
              {
                label: 'Hire Developer',
                href: 'https://fiverr.com/creativitas',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} A project by docusar, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
