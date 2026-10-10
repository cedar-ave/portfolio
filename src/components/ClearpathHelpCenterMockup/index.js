import React, { useState } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import {
  RelatedRecordDiagram,
  RelatedRecordExampleDiagram,
  JunctionObjectDiagram,
  JunctionObjectExampleDiagram,
} from '@site/src/components/RosterRelationshipDiagrams';
import styles from './styles.module.css';

/* =====================================================================
   Icons. All share a 24x24 grid, 1.75 stroke, and round caps so they
   read as one set. Duotone fills use currentColor at low opacity.
   ===================================================================== */

function Icon({ children, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className || styles.icon}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {children}
    </svg>
  );
}

// Clearpath Forge: a dashboard window with a rising path.
function ClearpathAppIcon() {
  return (
    <Icon>
      <rect x="3" y="4" width="18" height="15" rx="2.5" fill="currentColor" fillOpacity="0.12" />
      <path d="M3 8.5h18" />
      <path d="M7 15.5l3-3 2.5 2 4.5-4.5" />
      <circle cx="17" cy="10" r="0.6" fill="currentColor" />
    </Icon>
  );
}

// Clearpath Collect: a clipboard with checked-off lines.
function CollectAppIcon() {
  return (
    <Icon>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2.5" fill="currentColor" fillOpacity="0.12" />
      <path d="M9 4.5V3.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75" />
      <path d="M8.5 10l1.25 1.25L12 9" />
      <path d="M13.75 10.25H16" />
      <path d="M8.5 15.5l1.25 1.25L12 14.5" />
      <path d="M13.75 15.75H16" />
    </Icon>
  );
}

// APIs: code brackets.
function ApiIcon() {
  return (
    <Icon>
      <rect x="2.5" y="4" width="19" height="16" rx="3" fill="currentColor" fillOpacity="0.12" stroke="none" />
      <path d="M8.5 8.5L5 12l3.5 3.5" />
      <path d="M15.5 8.5L19 12l-3.5 3.5" />
      <path d="M13.25 7.5l-2.5 9" />
    </Icon>
  );
}

// Auditing services: a shield with a check.
function CredentialIcon() {
  return (
    <Icon>
      <path
        d="M12 3l7.5 3v5.25c0 4.5-3.2 8.3-7.5 9.75-4.3-1.45-7.5-5.25-7.5-9.75V6L12 3z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M8.75 12.25l2.25 2.25 4.25-4.5" />
    </Icon>
  );
}

// Getting started: a flag on a pole.
function GettingStartedIcon() {
  return (
    <Icon>
      <path d="M5.5 21V3.5" />
      <path
        d="M5.5 4.5h11.75l-2.5 4 2.5 4H5.5"
        fill="currentColor"
        fillOpacity="0.12"
      />
    </Icon>
  );
}

// Source integrations: connected nodes around a hub.
function IntegrationIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3.25" fill="currentColor" fillOpacity="0.12" />
      <circle cx="5" cy="5.5" r="2" />
      <circle cx="19" cy="5.5" r="2" />
      <circle cx="5" cy="18.5" r="2" />
      <circle cx="19" cy="18.5" r="2" />
      <path d="M6.5 7l3.1 2.8M17.5 7l-3.1 2.8M6.5 17l3.1-2.8M17.5 17l-3.1-2.8" />
    </Icon>
  );
}

// Expert guidance: a lightbulb.
function GuidanceIcon() {
  return (
    <Icon>
      <path
        d="M12 3a6 6 0 0 0-3.6 10.8c.7.55 1.1 1.3 1.1 2.2v.5h5v-.5c0-.9.4-1.65 1.1-2.2A6 6 0 0 0 12 3z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M9.75 19.5h4.5" />
      <path d="M10.5 21.5h3" />
      <path d="M12 7.5v3l1.5 1" />
    </Icon>
  );
}

function SearchIcon() {
  return (
    <Icon className={styles.searchIcon}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.25-4.25" />
    </Icon>
  );
}

function ArrowIcon() {
  return (
    <Icon className={styles.arrow}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

function ExternalIcon() {
  return (
    <Icon className={styles.external}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </Icon>
  );
}

function ChevronIcon() {
  return (
    <Icon className={styles.chevron}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.star} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.75l2.83 5.74 6.34.92-4.59 4.47 1.08 6.31L12 17.21l-5.66 2.98 1.08-6.31L2.83 9.41l6.34-.92L12 2.75z"
      />
    </svg>
  );
}

// New: a four-point sparkle.
function SparkleIcon() {
  return (
    <Icon className={styles.listIcon}>
      <path
        d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M18.5 16.5v4M16.5 18.5h4" />
    </Icon>
  );
}

// Popular: a rising trend line.
function TrendIcon() {
  return (
    <Icon className={styles.listIcon}>
      <path d="M3.5 17l5.5-5.5 4 4 7-7" />
      <path d="M15 8.5h5v5" />
    </Icon>
  );
}

// Made-up Clearpath mark: a winding path that resolves into a forward
// arrow, inside a rounded tile.
function ClearpathLogo() {
  return (
    <span className={styles.logo}>
      <svg viewBox="0 0 32 32" className={styles.logoMark} aria-hidden="true">
        <defs>
          <linearGradient id="cp-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#cp-logo-grad)" />
        <path
          d="M8 22.5c0-4 3-5.5 6.5-5.5S21 15.5 21 11.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M17.5 10.5L21.5 9l1.5 4"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="22.5" r="2.2" fill="#ccfbf1" />
      </svg>
      <span className={styles.logoWord}>
        clear<span className={styles.logoWordAccent}>path</span>
      </span>
      <span className={styles.logoDivider} aria-hidden="true" />
      <span className={styles.logoSub}>Support</span>
    </span>
  );
}

/* =====================================================================
   Content. Edit these arrays to relabel the mockup.
   ===================================================================== */

const POPULAR_TOPICS = ['audits', 'reports and dashboards', 'managing users'];

const CATEGORIES = [
  {
    title: 'Getting started',
    body: 'Account setup, onboarding checklists, first audit walkthrough',
    Icon: GettingStartedIcon,
  },
  {
    title: 'Clearpath Forge',
    body: "What's new, how-to guides, help articles",
    Icon: ClearpathAppIcon,
  },
  {
    title: 'Clearpath Collect',
    body: 'How-to guides, frequently asked questions, troubleshooting',
    Icon: CollectAppIcon,
  },
  {
    title: 'APIs',
    body: 'Common concepts, getting started, authentication, endpoints',
    Icon: ApiIcon,
    external: true,
  },
  {
    title: 'Auditing services',
    body: 'Policies, handbooks, tools',
    Icon: CredentialIcon,
  },
  {
    title: 'Expert guidance',
    body: 'Case studies, blog posts, webinars',
    Icon: GuidanceIcon,
    external: true,
  },
];

const ARTICLE_LISTS = [
  {
    title: 'Featured articles',
    Icon: StarIcon,
    articles: [
      'Prepare for your annual insurance compliance audit',
      'Verify certificates of insurance for vendors',
      'Understand audit scopes and sampling methods',
      'Set coverage minimums for subcontractors',
      'Build an audit-ready document checklist',
    ],
  },
  {
    title: 'New articles',
    Icon: SparkleIcon,
    articles: [
      'Track policy renewals and expiration dates',
      'Request missing endorsements from carriers',
      'Reconcile premium audit discrepancies',
      'Flag lapsed coverage before an audit closes',
      'Review audit findings with your underwriter',
    ],
  },
  {
    title: 'Popular articles',
    Icon: TrendIcon,
    articles: [
      'Upload a certificate of insurance',
      'What counts as an additional insured?',
      'Respond to a payroll audit request',
      "Classify employees for workers' comp audits",
      'Dispute an audit result',
    ],
  },
];

const RECENT_ARTICLES = [
  {
    title: 'Schedule a recurring audit in Forge',
    product: 'Clearpath Forge',
    Icon: ClearpathAppIcon,
  },
  {
    title: 'Build a custom intake form in Collect',
    product: 'Clearpath Collect',
    Icon: CollectAppIcon,
  },
  {
    title: 'Resolve flagged findings before an audit closes',
    product: 'Auditing services',
    Icon: CredentialIcon,
  },
  {
    title: 'Send automatic reminders for overdue document requests',
    product: 'Clearpath Collect',
    Icon: CollectAppIcon,
  },
  {
    title: 'Export an audit trail for external reviewers',
    product: 'Clearpath Forge',
    Icon: ClearpathAppIcon,
  },
  {
    title: 'Map collected responses to audit checklist items',
    product: 'Source integrations',
    Icon: IntegrationIcon,
  },
];

/* =====================================================================
   Clearpath help center home page.
   ===================================================================== */

export function ClearpathHelpCenterMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.browser} role="img" aria-label="Mockup of the Clearpath Support help center home page">
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.url}>support.clearpath.example</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <ClearpathLogo />
            <nav className={styles.nav}>
              <span className={styles.navLink}>System status</span>
              <span className={styles.navLink}>
                Quick links <ChevronIcon />
              </span>
              <span className={styles.navButton}>Contact support</span>
              <span className={styles.avatar}>MS</span>
            </nav>
          </header>

          {/* Hero */}
          <section className={styles.hero}>
            <h2 className={styles.heroTitle}>How can we help?</h2>
            <div className={styles.search}>
              <SearchIcon />
              <span className={styles.searchPlaceholder}>Search questions, keywords, or topics</span>
              <span className={styles.searchButton}>Search</span>
            </div>
            <div className={styles.popular}>
              <span className={styles.popularLabel}>Popular:</span>
              {POPULAR_TOPICS.map((topic) => (
                <span key={topic} className={styles.chip}>
                  {topic}
                </span>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className={styles.section}>
            <div className={styles.grid}>
              {CATEGORIES.map(({ title, body, Icon: CatIcon, external }) => (
                <div key={title} className={styles.card}>
                  <span className={styles.iconTile}>
                    <CatIcon />
                  </span>
                  <div>
                    <div className={styles.cardTitle}>
                      {title}
                      {external && <ExternalIcon />}
                    </div>
                    <p className={styles.cardBody}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured, new, and popular articles */}
          <section className={styles.section}>
            <div className={styles.listGrid}>
              {ARTICLE_LISTS.map(({ title, Icon: ListIcon, articles }) => (
                <div key={title} className={styles.listCol}>
                  <h3 className={styles.listTitle}>
                    <ListIcon />
                    {title}
                  </h3>
                  <ul className={styles.list}>
                    {articles.map((article) => (
                      <li key={article} className={styles.listItem}>
                        <span className={styles.itemIcon}>
                          <ListIcon />
                        </span>
                        <span>{article}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Recent articles */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Your recently viewed articles</h3>
              <span className={styles.sectionLink}>
                See more <ArrowIcon />
              </span>
            </div>
            <div className={styles.recentGrid}>
              {RECENT_ARTICLES.map(({ title, product, Icon: ArticleIcon }) => (
                <div key={title} className={styles.recent}>
                  <span className={styles.recentIcon}>
                    <ArticleIcon />
                  </span>
                  <div className={styles.recentText}>
                    <span className={styles.recentProduct}>{product}</span>
                    <span className={styles.recentTitle}>{title}</span>
                  </div>
                  <ArrowIcon />
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className={styles.section}>
            <div className={styles.cta}>
              <div>
                <h3 className={styles.ctaTitle}>Still have questions?</h3>
                <p className={styles.ctaBody}>We have answers.</p>
              </div>
              <span className={styles.ctaButton}>Contact support</span>
            </div>
          </section>

          {/* Footer */}
          <footer className={styles.footer}>
            <span>© Clearpath Inc. All rights reserved.</span>
            <IconifyIcon icon="bi:linkedin" className={styles.footerIcon} aria-hidden="true" />
          </footer>
        </div>
      </div>
    </figure>
  );
}

/* =====================================================================
   Clearpath help center article page. Content mirrors
   samples/clearpath-roster-guide/choose-a-relationship-type.mdx.
   ===================================================================== */

const BREADCRUMBS = ['Clearpath Help Center', 'Clearpath Roster Guide', 'Create a template'];

const CURRENT_ARTICLE = 'Choose a relationship type';

const SECTION_ARTICLES = [
  'Create a template',
  'Clone a template',
  'Choose objects to store carriers and producers',
  CURRENT_ARTICLE,
  'Configure a related record relationship type',
  'Configure a junction object relationship type',
];

const CURRENT_INDEX = SECTION_ARTICLES.indexOf(CURRENT_ARTICLE);
const PREV_ARTICLE = SECTION_ARTICLES[CURRENT_INDEX - 1];
const NEXT_ARTICLE = SECTION_ARTICLES[CURRENT_INDEX + 1];

const ARTICLE_H2S =['About a related record', 'About a junction object'];

const ARTICLE_RECENT = [
  'About rosters',
  'Generate a roster',
  "Configure a template's layout",
  'Create filters',
  'Activate or deactivate a template',
];

function HelpIcon() {
  return (
    <Icon className={styles.badgeIcon}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.75 9.5a2.25 2.25 0 1 1 3.1 2.08c-.5.22-.85.7-.85 1.25v.42" />
      <circle cx="12" cy="16.25" r="0.6" fill="currentColor" />
    </Icon>
  );
}

// Frames a roster diagram like an image embedded in the article.
function ArticleDiagram({ children }) {
  return <div className={styles.articleDiagram}>{children}</div>;
}

export function ClearpathArticleMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`${styles.url} ${styles.urlWide}`}>support.clearpath.example/articles/choose-a-relationship-type</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <ClearpathLogo />
            <nav className={styles.nav}>
              <span className={styles.navLink}>System status</span>
              <span className={styles.navLink}>
                Quick links <ChevronIcon />
              </span>
              <span className={styles.navButton}>Contact support</span>
              <span className={styles.avatar}>MS</span>
            </nav>
          </header>

          {/* Search band */}
          <section className={styles.searchBand}>
            <div className={styles.searchCompact}>
              <SearchIcon />
              <span className={styles.searchPlaceholder}>Search questions, keywords, or topics</span>
            </div>
          </section>

          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            {BREADCRUMBS.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 && <span className={styles.crumbSep}>›</span>}
                <span className={i === BREADCRUMBS.length - 1 ? styles.crumbCurrent : undefined}>{crumb}</span>
              </React.Fragment>
            ))}
          </div>

          <div className={styles.articleLayout}>
            {/* Articles in this section */}
            <aside className={styles.sideNav}>
              <h3 className={styles.sideNavTitle}>Articles in this section</h3>
              <ul className={styles.sideNavList}>
                {SECTION_ARTICLES.map((title) => (
                  <li key={title} className={title === CURRENT_ARTICLE ? styles.sideNavActive : styles.sideNavItem}>
                    {title}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Article body */}
            <article className={styles.article}>
              <h2 className={styles.articleTitle}>{CURRENT_ARTICLE}</h2>
              <div className={`${styles.resultBadges} ${styles.articleBadges}`}>
                <span className={styles.appBadge}>Clearpath Forge</span>
                <span className={styles.auditBadge}>Group audits</span>
                <span className={styles.resultHelp}>
                  <HelpIcon />
                </span>
              </div>

              <p>
                First, <span className={styles.inlineLink}>choose objects to store carriers and producers</span>.
              </p>
              <p>Fill out the following field:</p>
              <table className={styles.articleTable}>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>What to select</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Select Relationship Type</strong>
                    </td>
                    <td>Select a relationship type to determine how carrier and producer objects are associated.</td>
                  </tr>
                </tbody>
              </table>
              <p>Choose between two relationship types:</p>
              <ul>
                <li>
                  <span className={styles.inlineLink}>About a related record</span>
                </li>
                <li>
                  <span className={styles.inlineLink}>About a junction object</span>
                </li>
              </ul>

              <h3 className={styles.articleH2}>About a related record</h3>
              <p>
                A related record is based on the concept of a one-to-many relationship. This means you can
                reference contacts that are direct children of the account, like accessing all producers under a
                carrier.
              </p>
              <h4 className={styles.articleH3}>Example 1</h4>
              <p>
                The <strong>Carrier</strong> table defines the type of object you're using to group producers by,
                like if you want to run a roster for a program and you plan to use the <strong>Account</strong>{' '}
                object.
              </p>
              <p>
                The <strong>Producer</strong> table defines the type of object you're using for producers.
              </p>
              <p>
                The reference field (<strong>Account ID</strong>) identifies which carrier's contacts you want to
                use, like pulling all contacts that are children of a carrier.
              </p>
              <ArticleDiagram>
                <RelatedRecordDiagram />
              </ArticleDiagram>
              <h4 className={styles.articleH3}>Example 2</h4>
              <ArticleDiagram>
                <RelatedRecordExampleDiagram />
              </ArticleDiagram>

              <h3 className={styles.articleH2}>About a junction object</h3>
              <p>
                Based on the concept of a many-to-many relationship, a junction object makes it possible to link
                multiple rows in one table to multiple rows in another table. This selection will be most commonly
                used to generate rosters.
              </p>
              <p>
                A common use case is to reference producers connected via an indirect grouping who aren't direct
                children of the carrier, like an object that relates the producer to the carrier object, such as
                the <strong>Producer Appointment</strong> object. This makes it possible to access producers linked
                to a specific program.
              </p>
              <h4 className={styles.articleH3}>Example 1</h4>
              <p>
                In this example, producer A is associated with multiple carriers. Producer B is associated with only
                one carrier.
              </p>
              <ArticleDiagram>
                <JunctionObjectDiagram />
              </ArticleDiagram>
              <h4 className={styles.articleH3}>Example 2</h4>
              <p>
                In this example, <strong>Producer Appointment</strong> is the junction object.
              </p>
              <ArticleDiagram>
                <JunctionObjectExampleDiagram />
              </ArticleDiagram>

              {/* Previous and next articles in this section */}
              <nav className={styles.pager}>
                <span className={`${styles.pagerLink} ${styles.pagerPrev}`}>
                  <span className={styles.pagerLabel}>
                    <ArrowIcon /> Previous
                  </span>
                  <span className={styles.pagerTitle}>{PREV_ARTICLE}</span>
                </span>
                <span className={`${styles.pagerLink} ${styles.pagerNext}`}>
                  <span className={styles.pagerLabel}>
                    Next <ArrowIcon />
                  </span>
                  <span className={styles.pagerTitle}>{NEXT_ARTICLE}</span>
                </span>
              </nav>

              {/* Feedback */}
              <div className={styles.feedback}>
                <h3 className={styles.feedbackTitle}>Was this article helpful?</h3>
                <div className={styles.feedbackButtons}>
                  <span className={styles.feedbackButton}>Yes</span>
                  <span className={styles.feedbackButton}>No</span>
                </div>
              </div>

              {/* Recently viewed */}
              <div className={styles.articleRecent}>
                <h3 className={styles.articleRecentTitle}>Recently viewed articles</h3>
                <ul className={styles.articleRecentList}>
                  {ARTICLE_RECENT.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              </div>
            </article>

            {/* On this page */}
            <aside className={styles.toc}>
              <h3 className={styles.tocTitle}>On this page</h3>
              <ul className={styles.tocList}>
                {ARTICLE_H2S.map((heading) => (
                  <li key={heading}>{heading}</li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span>© Clearpath Inc. All rights reserved.</span>
            <IconifyIcon icon="bi:linkedin" className={styles.footerIcon} aria-hidden="true" />
          </footer>
        </div>
      </div>
    </figure>
  );
}

/* =====================================================================
   Clearpath help center search results page. The app and audit type
   filters are live: selecting one narrows the result list.
   ===================================================================== */

const SEARCH_QUERY = 'How do I fix a coverage gap before an audit closes?';

// Query keywords highlighted in result snippets.
const HIGHLIGHT_TERMS = ['coverage', 'gaps', 'gap'];

// The quick answer changes with the app filter, since the steps differ
// between apps. Each source is a result that matches every audit type
// filter, so it's always in the list below.
const QUICK_ANSWERS = {
  all: {
    answer:
      "To fix a coverage gap, open the audit's findings, request updated coverage documents from the vendor, and then resolve or waive the gap before you close the audit.",
    source: 'Review coverage gaps before an audit closes',
  },
  'Clearpath Forge': {
    answer:
      "In Clearpath Forge, open the audit's Findings tab, select the coverage gap, and choose Resolve or Waive. Forge rechecks your coverage minimums before it lets the audit close.",
    source: 'Review coverage gaps before an audit closes',
  },
  'Clearpath Connect': {
    answer:
      'In Clearpath Connect, send the vendor a request for the missing coverage documents. When the vendor uploads them, Connect syncs the coverage to the audit and clears the gap.',
    source: 'Sync coverage data from Connect into an audit',
  },
};

const APP_FILTERS = ['Clearpath Forge', 'Clearpath Connect'];

const AUDIT_FILTERS = ['Individual audits', 'Group audits'];

// Every result carries at least one app and at least one audit type, and
// every filter combination returns results.
const SEARCH_RESULTS = [
  {
    path: ['FAQ and troubleshooting', 'Audits'],
    title: 'Review coverage gaps before an audit closes',
    apps: ['Clearpath Forge', 'Clearpath Connect'],
    audits: ['Individual audits', 'Group audits'],
    snippet: 'Open the Findings tab to see every coverage gap. Resolve or waive each gap before you close the audit.',
    updated: 'October 2, 2026',
  },
  {
    path: ['Clearpath Forge Guide', 'Audit settings'],
    title: 'Set coverage minimums for an audit',
    apps: ['Clearpath Forge'],
    audits: ['Individual audits', 'Group audits'],
    snippet: 'Define the minimum coverage each vendor must carry. Audits flag any coverage below the limits you set as a gap.',
    updated: 'September 24, 2026',
  },
  {
    path: ['Clearpath Connect Guide', 'Document requests'],
    title: 'Request coverage documents from a vendor',
    apps: ['Clearpath Connect'],
    audits: ['Individual audits'],
    snippet: "Send a vendor a secure link to upload proof of coverage. Connect tracks the request until it's complete.",
    updated: 'August 18, 2026',
  },
  {
    path: ['Clearpath Forge Guide', 'Group audits'],
    title: 'Run coverage checks across a vendor group',
    apps: ['Clearpath Forge'],
    audits: ['Group audits'],
    snippet: 'Check coverage for every vendor in a group at once. Any gaps roll up into a single coverage report.',
    updated: 'September 24, 2026',
  },
  {
    path: ['Clearpath Forge Guide', 'Findings'],
    title: "Flag a vendor's lapsed coverage",
    apps: ['Clearpath Forge'],
    audits: ['Individual audits'],
    snippet: 'When coverage lapses mid-audit, Forge flags the vendor and notifies the audit owner.',
    updated: 'July 30, 2026',
  },
  {
    path: ['Clearpath Connect Guide', 'Document requests'],
    title: 'Send bulk coverage requests to a group',
    apps: ['Clearpath Connect'],
    audits: ['Group audits'],
    snippet: 'Request updated coverage from every vendor in a group with one request. Each vendor gets their own link.',
    updated: 'August 18, 2026',
  },
  {
    path: ['FAQ and troubleshooting', 'Vendors'],
    title: "Why is a vendor's coverage marked incomplete?",
    apps: ['Clearpath Forge', 'Clearpath Connect'],
    audits: ['Individual audits'],
    snippet: 'Coverage is marked incomplete when a required endorsement or policy page is missing from the upload.',
    updated: 'October 6, 2026',
  },
  {
    path: ['Clearpath Forge Guide', 'Reports'],
    title: 'Compare coverage across audit periods',
    apps: ['Clearpath Forge'],
    audits: ['Individual audits', 'Group audits'],
    snippet: 'See how coverage changed between audit periods, including new policies, renewals, and lapses.',
    updated: 'June 12, 2026',
  },
  {
    path: ['Clearpath Connect Guide', 'Renewals'],
    title: 'Track coverage renewals for a vendor group',
    apps: ['Clearpath Connect'],
    audits: ['Group audits'],
    snippet: 'Connect sends reminders as coverage nears expiration, so renewals arrive before the next audit.',
    updated: 'September 3, 2026',
  },
  {
    path: ['Source Integrations Guide', 'Sync data between apps'],
    title: 'Sync coverage data from Connect into an audit',
    apps: ['Clearpath Forge', 'Clearpath Connect'],
    audits: ['Individual audits', 'Group audits'],
    snippet: 'Coverage documents collected in Connect sync to the matching audit in Forge automatically.',
    updated: 'June 12, 2026',
  },
];

// Wraps each occurrence of a highlight term in a highlight.
function Highlight({ text }) {
  const parts = text.split(new RegExp(`\\b(${HIGHLIGHT_TERMS.join('|')})\\b`, 'gi'));
  return parts.map((part, i) =>
    HIGHLIGHT_TERMS.includes(part.toLowerCase()) ? (
      <mark key={i} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

function FilterGroup({ title, name, options, value, onChange }) {
  return (
    <fieldset className={styles.filterGroup}>
      <legend className={styles.filterTitle}>
        {title} <HelpIcon />
      </legend>
      {options.map((option) => (
        <label key={option} className={styles.filterOption}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
}

// Quick answer: two four-point sparkles.
function QuickAnswerIcon() {
  return (
    <Icon className={styles.quickIcon}>
      <path
        d="M10 4l1.6 4.4L16 10l-4.4 1.6L10 16l-1.6-4.4L4 10l4.4-1.6L10 4z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M18 14.5l.8 1.95 1.95.8-1.95.8L18 20l-.8-1.95-1.95-.8 1.95-.8.8-1.95z" />
    </Icon>
  );
}

function DocumentIcon() {
  return (
    <Icon className={styles.quickSourceIcon}>
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </Icon>
  );
}

function ThumbIcon({ down }) {
  return (
    <Icon className={`${styles.thumbIcon} ${down ? styles.thumbDown : ''}`}>
      <path d="M7 10v12" />
      <path d="M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
    </Icon>
  );
}

function QuickAnswer({ answer, source }) {
  const [vote, setVote] = useState(null);

  return (
    <div className={styles.quickAnswer}>
      <h3 className={styles.quickTitle}>
        <QuickAnswerIcon />
        Quick answer
      </h3>
      <p className={styles.quickBody}>{answer}</p>
      <span className={styles.quickLabel}>AI suggestion based on</span>
      <span className={styles.quickSource}>
        <DocumentIcon />
        {source}
      </span>
      <div className={styles.quickVotes}>
        {['up', 'down'].map((direction) => (
          <button
            key={direction}
            type="button"
            className={styles.quickVote}
            aria-label={direction === 'up' ? 'Helpful' : 'Not helpful'}
            aria-pressed={vote === direction}
            onClick={() => setVote(vote === direction ? null : direction)}>
            <ThumbIcon down={direction === 'down'} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ClearpathSearchResultsMockup() {
  const [app, setApp] = useState(null);
  const [audit, setAudit] = useState(null);

  const results = SEARCH_RESULTS.filter(
    (result) => (!app || result.apps.includes(app)) && (!audit || result.audits.includes(audit)),
  );
  const activeFilters = [app, audit].filter(Boolean);

  return (
    <figure className={styles.figure}>
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`${styles.url} ${styles.urlWide}`}>support.clearpath.example/search?query={encodeURIComponent(SEARCH_QUERY)}</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <ClearpathLogo />
            <nav className={styles.nav}>
              <span className={styles.navLink}>System status</span>
              <span className={styles.navLink}>
                Quick links <ChevronIcon />
              </span>
              <span className={styles.navButton}>Contact support</span>
              <span className={styles.avatar}>MS</span>
            </nav>
          </header>

          {/* Search band */}
          <section className={styles.searchBand}>
            <div className={styles.searchCompact}>
              <SearchIcon />
              <span className={styles.searchQuery}>{SEARCH_QUERY}</span>
            </div>
          </section>

          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span>Clearpath Help Center</span>
            <span className={styles.crumbSep}>›</span>
            <span className={styles.crumbCurrent}>Search results</span>
          </div>

          <div className={styles.resultsLayout}>
            {/* Filters */}
            <aside className={styles.filterPanel}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Type</h3>
                <div className={styles.typeActive}>
                  <span>All types</span>
                  <span>{SEARCH_RESULTS.length}</span>
                </div>
                <div className={styles.typeItem}>
                  <span>Articles</span>
                  <span>{SEARCH_RESULTS.length}</span>
                </div>
              </div>

              <FilterGroup
                title="Filter by app"
                name="cp-search-app"
                options={APP_FILTERS}
                value={app}
                onChange={setApp}
              />
              <FilterGroup
                title="Filter by audit type"
                name="cp-search-audit"
                options={AUDIT_FILTERS}
                value={audit}
                onChange={setAudit}
              />

              <button
                type="button"
                className={styles.clearFilters}
                onClick={() => {
                  setApp(null);
                  setAudit(null);
                }}
                disabled={activeFilters.length === 0}>
                Clear filters
              </button>
            </aside>

            {/* Results */}
            <section className={styles.results}>
              {/* Keyed by app so the feedback vote resets with each new answer. */}
              <QuickAnswer key={app || 'all'} {...QUICK_ANSWERS[app || 'all']} />

              <h2 className={styles.resultsTitle}>
                {SEARCH_RESULTS.length} results for "{SEARCH_QUERY}"
                {activeFilters.length > 0 && (
                  <>
                    {' '}
                    <span className={styles.resultsSep}>|</span> {results.length} results apply to{' '}
                    {activeFilters.join(' and ')}
                  </>
                )}
              </h2>

              <ul className={styles.resultList}>
                {results.map(({ path, title, apps, audits, snippet, updated }) => (
                  <li key={title} className={styles.result}>
                    <div className={styles.resultPath}>
                      {['Clearpath Help Center', ...path].map((crumb, i) => (
                        <React.Fragment key={crumb}>
                          {i > 0 && <span className={styles.crumbSep}>›</span>}
                          <span className={i === path.length ? styles.resultPathCurrent : undefined}>{crumb}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <h3 className={styles.resultTitle}>{title}</h3>
                    <div className={styles.resultBadges}>
                      {apps.map((a) => (
                        <span key={a} className={styles.appBadge}>
                          {a}
                        </span>
                      ))}
                      {audits.map((a) => (
                        <span key={a} className={styles.auditBadge}>
                          {a}
                        </span>
                      ))}
                      <span className={styles.resultHelp}>
                        <HelpIcon />
                      </span>
                    </div>
                    <p className={styles.resultSnippet}>
                      <Highlight text={snippet} />
                    </p>
                    <span className={styles.resultDate}>Updated {updated}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.pagination} aria-hidden="true">
                <span className={styles.pageButton}>Next ›</span>
                <span className={styles.pageButton}>»</span>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span>© Clearpath Inc. All rights reserved.</span>
            <IconifyIcon icon="bi:linkedin" className={styles.footerIcon} aria-hidden="true" />
          </footer>
        </div>
      </div>
    </figure>
  );
}
