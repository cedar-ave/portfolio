// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Sidebar for the standalone "user guide" docs instance (see the second
 * `@docusaurus/plugin-content-docs` entry in docusaurus.config.js).
 *
 * This section is a demo of a product user guide. It's reachable from the
 * "Product user guide" link on /portfolio, but it's intentionally left out
 * of the navbar - it's a sample, not a real section of this site.
 *
 * The docs root for this instance is samples/, with samples/index.mdx as
 * the generic /samples landing page (listed first below, above the guides)
 * and each guide living in its own subfolder - samples/clearpath-roster-guide/
 * (a roster-builder guide for insurance delegated authority) and
 * samples/clearpath-collect-guide/ (a Clearpath Collect guide for building
 * custom claims/underwriting data-entry apps). Doc ids below are paths relative to
 * samples/, keeping the source files' numbered prefixes because
 * `numberPrefixParser: false` is set for this docs instance (the sample
 * content's own cross-links reference those filenames directly).
 *
 * Add another guide by dropping its source files in a new folder under
 * samples/, then adding a sibling top-level category below.
 *
 * samples/technical-marketing/ holds a third, unrelated sample set (product
 * marketing pages rewritten as generic docs). samples/contributor-guide/
 * holds a fourth: a sample of a contributor guide (docs for people
 * contributing to a docs-as-code site, not for the product itself), adapted
 * closely from a real one - genericized product/company names and URLs,
 * but not paraphrased. Its subfolders (outlines/, troubleshoot/,
 * release-notes/, admin/, and each of those two's own includes/) mirror the
 * source repo's own folder layout rather than sitting flat, which is why
 * doc ids below include the subfolder segment. Each guide is a sibling
 * category in the same sidebar array (below), not a separate sidebar - all
 * samples docs share one sidebar instance, so every category shows up
 * together in the left nav regardless of which sample you're currently on.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  samplesSidebar: [
    'index',
    {
      type: 'category',
      label: 'Clearpath Roster User Guide',
      collapsed: true,
      // No `link` here - the heading is a pure expand/collapse toggle, not
      // a page of its own. "Overview" below is the guide's actual landing
      // doc, listed as a normal row.
      items: [
        {
          type: 'category',
          label: 'Get started',
          collapsed: true,
          items: [
            'clearpath-roster-guide/01-overview',
            'clearpath-roster-guide/02-about-delegated-authority',
            'clearpath-roster-guide/03-about-rosters',
            'clearpath-roster-guide/04-prerequisites',
          ],
        },
        {
          type: 'category',
          label: 'Generate a roster',
          collapsed: true,
          items: [
            'clearpath-roster-guide/06-generate-a-roster',
            'clearpath-roster-guide/08-see-and-download-previous-exports',
          ],
        },
        {
          type: 'category',
          label: 'Create a template',
          collapsed: true,
          items: [
            'clearpath-roster-guide/10-create-a-template',
            'clearpath-roster-guide/11-clone-a-template',
            'clearpath-roster-guide/12-choose-objects-to-store-carriers-and-producers',
            'clearpath-roster-guide/13-choose-a-relationship-type',
            'clearpath-roster-guide/14-about-a-related-record',
            'clearpath-roster-guide/15-about-a-junction-object',
            'clearpath-roster-guide/16-configure-a-related-record-relationship-type',
            'clearpath-roster-guide/17-configure-a-junction-object-relationship-type',
          ],
        },
        {
          type: 'category',
          label: "Design a template's layout",
          collapsed: true,
          items: [
            'clearpath-roster-guide/18-configure-a-template-s-layout',
            'clearpath-roster-guide/19-fields-roster-objects-and-sub-objects',
            'clearpath-roster-guide/21-rename-a-field-or-object',
            'clearpath-roster-guide/22-remove-a-field-or-object',
            'clearpath-roster-guide/23-create-filters',
            'clearpath-roster-guide/24-activate-or-deactivate-a-template',
            'clearpath-roster-guide/25-change-a-template-s-name-or-description',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Clearpath Collect User Guide',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Get started',
          key: 'clearpath-collect-guide-get-started',
          collapsed: true,
          items: [
            'clearpath-collect-guide/01-overview',
            'clearpath-collect-guide/02-how-it-works',
            'clearpath-collect-guide/03-primary-uses',
            'clearpath-collect-guide/04-whats-new',
            'clearpath-collect-guide/05-prerequisites',
            'clearpath-collect-guide/06-interface-tour',
            'clearpath-collect-guide/07-glossary',
          ],
        },
        {
          type: 'category',
          label: 'Security and permissions',
          collapsed: true,
          items: [
            'clearpath-collect-guide/08-security-roles',
            'clearpath-collect-guide/09-security-permissions',
          ],
        },
        {
          type: 'category',
          label: 'Create and manage an app',
          collapsed: true,
          items: [
            'clearpath-collect-guide/10-steps-to-create-an-app',
            'clearpath-collect-guide/11-create-a-new-app',
            'clearpath-collect-guide/12-set-up-the-main-table',
            'clearpath-collect-guide/13-set-up-subset-tables',
          ],
        },
        {
          type: 'category',
          label: 'Lookup lists',
          collapsed: true,
          items: [
            'clearpath-collect-guide/14-lookup-list-types',
            'clearpath-collect-guide/15-lookup-list-permissions',
            'clearpath-collect-guide/16-create-a-query-based-lookup-list',
            'clearpath-collect-guide/17-create-a-table-based-lookup-list',
          ],
        },
        {
          type: 'category',
          label: 'Add and manage records',
          collapsed: true,
          items: [
            'clearpath-collect-guide/18-data-type-definitions',
            'clearpath-collect-guide/19-compatible-data-types',
            'clearpath-collect-guide/20-add-a-record-single-form',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Technical marketing',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Clearpath Analytics Platform',
          collapsed: true,
          items: [
            'technical-marketing/clearpath-analytics-platform',
            'technical-marketing/metadata-driven-etl-engine',
            'technical-marketing/agile-data-models',
            'technical-marketing/linking-and-standardization',
            'technical-marketing/master-data-management',
            'technical-marketing/advanced-analytics',
          ],
        },
        {
          type: 'category',
          label: 'Platform applications',
          collapsed: true,
          items: [
            'technical-marketing/compass-metadata-management',
            'technical-marketing/data-warehouse-console',
            'technical-marketing/access-management',
            'technical-marketing/auditing',
            'technical-marketing/focus-mart-designer',
            'technical-marketing/rapid-data-entry-application',
          ],
        },
        {
          type: 'category',
          label: 'Data acquisition & storage',
          collapsed: true,
          items: [
            'technical-marketing/intake-mart-designer',
            'technical-marketing/intake-mart-library',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributor Guide',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Get started',
          key: 'contributor-guide-get-started',
          collapsed: true,
          items: [
            'contributor-guide/01-overview',
            'contributor-guide/02-prerequisites',
            'contributor-guide/03-get-started-with-git-and-markdown',
            'contributor-guide/04-work-in-source-control',
            'contributor-guide/05-set-up-a-build-pipeline',
            'contributor-guide/06-publish-the-docs',
            'contributor-guide/07-customize-the-doc-site-metadata',
            'contributor-guide/08-table-of-contents',
            'contributor-guide/09-writing-guidance',
            'contributor-guide/10-rest-api-docs',
          ],
        },
        {
          type: 'category',
          label: 'Write well',
          collapsed: true,
          items: [
            'contributor-guide/outlines/11-copy-and-paste-templates',
            'contributor-guide/outlines/12-outline-concept',
            'contributor-guide/outlines/13-outline-task',
            'contributor-guide/outlines/14-outline-troubleshooting',
            'contributor-guide/outlines/15-outline-blank',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshoot the build',
          collapsed: true,
          items: [
            'contributor-guide/troubleshoot/16-engine-pages-are-missing-styling',
            'contributor-guide/troubleshoot/17-metadata-build-throws-warnings',
            'contributor-guide/troubleshoot/18-npm-install-error',
            'contributor-guide/troubleshoot/19-unable-to-load-service-index',
            'contributor-guide/troubleshoot/20-obj-api-error',
            'contributor-guide/troubleshoot/21-node-sass-or-ts-node-errors',
            'contributor-guide/troubleshoot/22-nodejs-error',
            'contributor-guide/troubleshoot/23-net-sdk-not-found',
            'contributor-guide/troubleshoot/24-api-already-defined-build-error',
            'contributor-guide/troubleshoot/25-build-fails-on-the-npm-task',
          ],
        },
        {
          type: 'category',
          label: 'Release notes',
          collapsed: true,
          items: [
            'contributor-guide/release-notes/26-types-of-publications',
            'contributor-guide/release-notes/27-work-item-logic',
            'contributor-guide/release-notes/includes/28-work-item-fields-setup',
            'contributor-guide/release-notes/29-fill-out-work-items',
            'contributor-guide/release-notes/30-release-notes-writing-guidance',
            'contributor-guide/release-notes/31-prepare-release-notes-for-review',
            'contributor-guide/release-notes/32-review-release-notes',
            'contributor-guide/release-notes/33-publish-release-notes',
            'contributor-guide/release-notes/34-release-notes-setup',
            'contributor-guide/release-notes/35-include-images-in-release-notes',
            'contributor-guide/release-notes/36-update-known-issues-report',
            'contributor-guide/release-notes/37-known-issues-setup',
            'contributor-guide/release-notes/38-update-critical-and-high-bugs-report',
            'contributor-guide/release-notes/39-critical-and-high-bugs-setup',
            'contributor-guide/release-notes/40-refresh-known-issues-and-critical-and-high-bugs',
            'contributor-guide/release-notes/41-quarterly-recaps',
            'contributor-guide/release-notes/42-release-notes-extension-setup',
            'contributor-guide/release-notes/43-community-site-pages-setup',
            'contributor-guide/release-notes/44-announce-changes-on-a-community-banner',
            'contributor-guide/release-notes/45-announce-changes-on-slack',
          ],
        },
        {
          type: 'category',
          label: 'Admin',
          collapsed: true,
          items: [
            'contributor-guide/admin/46-tags',
            'contributor-guide/admin/47-redirects',
            'contributor-guide/admin/48-stamp',
            'contributor-guide/admin/includes/49-toc-styles',
            'contributor-guide/admin/50-hide-the-feedback-form',
            'contributor-guide/includes/51-get-help',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
