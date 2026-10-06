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
  ],
};

export default sidebars;
