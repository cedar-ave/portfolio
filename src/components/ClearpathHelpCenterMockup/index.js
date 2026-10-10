import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
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
    title: 'Source integrations',
    body: 'Sources we integrate with, fees they assess, how-to guides',
    Icon: IntegrationIcon,
  },
  {
    title: 'Expert guidance',
    body: 'Case studies, blog posts, webinars',
    Icon: GuidanceIcon,
    external: true,
  },
];

const SPOTLIGHTS = [
  {
    section: 'Monitoring and verifications',
    title: 'Daily, weekly, and monthly quick reference for admins',
    updated: 'Updated 2 months ago',
  },
  {
    section: 'Licenses',
    title: 'Input format guidelines',
    updated: 'Updated 16 days ago',
  },
  {
    section: 'Admin',
    title: 'Clearpath security update',
    updated: 'Updated 19 days ago',
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

          {/* Spotlights */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Spotlights</h3>
              <span className={styles.sectionLink}>
                View all <ArrowIcon />
              </span>
            </div>
            <div className={styles.spotGrid}>
              {SPOTLIGHTS.map(({ section, title, updated }) => (
                <div key={title} className={styles.spot}>
                  <span className={styles.spotSection}>{section}</span>
                  <div className={styles.spotTitle}>
                    <StarIcon />
                    <span>{title}</span>
                  </div>
                  <div className={styles.spotFoot}>
                    <span>{updated}</span>
                    <ArrowIcon />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent articles */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Recent articles</h3>
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
