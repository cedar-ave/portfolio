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
 * and each guide living in its own subfolder - currently just
 * samples/user-guide/. Doc ids below are paths relative to samples/,
 * keeping the source files' numbered prefixes because
 * `numberPrefixParser: false` is set for this docs instance (the sample
 * content's own cross-links reference those filenames directly).
 *
 * Add another guide by dropping its source files in a new folder under
 * samples/, then adding a sibling top-level category below.
 *
 * samples/technical-marketing/ holds a second, unrelated sample set (product
 * marketing pages rewritten as generic docs). It's a sibling category in the
 * same sidebar array (below), not a separate sidebar - all samples docs
 * share one sidebar instance, so every category shows up together in the
 * left nav regardless of which sample you're currently on.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  samplesSidebar: [
    'index',
    {
      type: 'category',
      label: 'User guide',
      collapsed: false,
      // No `link` here - the heading is a pure expand/collapse toggle, not
      // a page of its own. "Overview" below is the guide's actual landing
      // doc, listed as a normal row.
      items: [
        {
          type: 'category',
          label: 'Get started',
          collapsed: false,
          items: [
            'user-guide/01-overview',
            'user-guide/02-about-delegated-authority',
            'user-guide/03-about-rosters',
            'user-guide/04-prerequisites',
          ],
        },
        {
          type: 'category',
          label: 'Generate a roster',
          collapsed: false,
          items: [
            'user-guide/06-generate-a-roster',
            'user-guide/08-see-and-download-previous-exports',
          ],
        },
        {
          type: 'category',
          label: 'Create a template',
          collapsed: false,
          items: [
            'user-guide/10-create-a-template',
            'user-guide/11-clone-a-template',
            'user-guide/12-choose-objects-to-store-carriers-and-producers',
            'user-guide/13-choose-a-relationship-type',
            'user-guide/14-about-a-related-record',
            'user-guide/15-about-a-junction-object',
            'user-guide/16-configure-a-related-record-relationship-type',
            'user-guide/17-configure-a-junction-object-relationship-type',
          ],
        },
        {
          type: 'category',
          label: "Design a template's layout",
          collapsed: false,
          items: [
            'user-guide/18-configure-a-template-s-layout',
            'user-guide/19-fields-roster-objects-and-sub-objects',
            'user-guide/21-rename-a-field-or-object',
            'user-guide/22-remove-a-field-or-object',
            'user-guide/23-create-filters',
            'user-guide/24-activate-or-deactivate-a-template',
            'user-guide/25-change-a-template-s-name-or-description',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Technical marketing',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Adaptive-Binding Data Warehouse',
          collapsed: false,
          items: [
            'technical-marketing/adaptive-data-warehouse',
            'technical-marketing/adaptive-data-warehouse-technical-overview',
          ],
        },
        {
          type: 'category',
          label: 'Clearpath Analytics Platform',
          collapsed: false,
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
          collapsed: false,
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
          collapsed: false,
          items: [
            'technical-marketing/intake-mart-designer',
            'technical-marketing/intake-mart-library',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
