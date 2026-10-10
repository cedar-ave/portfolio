import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import styles from './styles.module.css';
import rs from './releases.module.css';

/* =====================================================================
   Icons. All share a 24x24 grid, 1.75 stroke, and round caps so they
   read as one set with the Clearpath help center mockup.
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

// Ask a question: two speech bubbles.
function AskIcon() {
  return (
    <Icon>
      <path d="M4 5.5h10a1.5 1.5 0 0 1 1.5 1.5v5.5A1.5 1.5 0 0 1 14 14H8.5L5 16.75V14H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5z" fill="currentColor" fillOpacity="0.12" />
      <path d="M17.5 9H20a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5h-1v2.75L15.5 17.5h-4" />
      <path d="M6 9.25h6M6 11.25h4" />
    </Icon>
  );
}

// Request a feature: a lightbulb.
function IdeaIcon() {
  return (
    <Icon>
      <path
        d="M12 3a6 6 0 0 0-3.6 10.8c.7.55 1.1 1.3 1.1 2.2v.5h5v-.5c0-.9.4-1.65 1.1-2.2A6 6 0 0 0 12 3z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M9.75 19.5h4.5" />
      <path d="M10.5 21.5h3" />
    </Icon>
  );
}

// Releases: a package with a down arrow.
function ReleaseIcon() {
  return (
    <Icon>
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4v-9z" fill="currentColor" fillOpacity="0.12" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
    </Icon>
  );
}

// Documentation: a page with code brackets.
function DocsIcon() {
  return (
    <Icon>
      <path d="M6 3h8l4.5 4.5V19.5A1.5 1.5 0 0 1 17 21H6a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 6 3z" fill="currentColor" fillOpacity="0.12" />
      <path d="M14 3v4.5h4.5" />
      <path d="M9.5 12l-2 2 2 2M13.5 12l2 2-2 2" />
    </Icon>
  );
}

// Take a survey: a clipboard with checked-off lines.
function SurveyIcon() {
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

// Space badge: a shield with a check (insurance auditing).
function ShieldIcon() {
  return (
    <Icon>
      <path
        d="M12 3l7.5 3v5.25c0 4.5-3.2 8.3-7.5 9.75-4.3-1.45-7.5-5.25-7.5-9.75V6L12 3z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path d="M8.75 12.25l2.25 2.25 4.25-4.5" />
    </Icon>
  );
}

function VideoIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <rect x="3" y="6" width="12.5" height="12" rx="2" fill="currentColor" fillOpacity="0.16" />
      <path d="M15.5 10.5l5-3v9l-5-3" />
    </Icon>
  );
}

function ArticleIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <path d="M6 3h8l4.5 4.5V19.5A1.5 1.5 0 0 1 17 21H6a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 6 3z" fill="currentColor" fillOpacity="0.16" />
      <path d="M8.5 12h7M8.5 15.5h5" />
    </Icon>
  );
}

function LibraryIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="currentColor" fillOpacity="0.16" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" />
    </Icon>
  );
}

function OverviewIcon() {
  return (
    <Icon>
      <rect x="3" y="4" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.16" />
      <path d="M9 21h6M12 17v4" />
      <path d="M7 13l3-3 2.5 2 4.5-4.5" />
    </Icon>
  );
}

function SearchIcon({ className }) {
  return (
    <Icon className={className || styles.searchIcon}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.25-4.25" />
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

function CheckIcon() {
  return (
    <Icon className={styles.check}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

function QuestionIcon() {
  return (
    <Icon className={styles.pending}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.75 9.5a2.25 2.25 0 1 1 3.4 1.95c-.7.4-1.15.9-1.15 1.7v.35" />
      <circle cx="12" cy="16.5" r="0.4" fill="currentColor" />
    </Icon>
  );
}

function PageArrow({ dir }) {
  return (
    <Icon className={styles.pageArrow}>
      {dir === 'prev' ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </Icon>
  );
}

// Made-up Clearpath mark, shared with the help center mockup.
function ClearpathLogo({ gradId = 'cp-community-logo-grad' }) {
  return (
    <span className={styles.logo}>
      <svg viewBox="0 0 32 32" className={styles.logoMark} aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradId})`} />
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
      <span className={styles.logoSub}>Community</span>
    </span>
  );
}

function Avatar({ initials, tone = 0 }) {
  return (
    <span className={styles.avatar} data-tone={tone} aria-hidden="true">
      {initials}
    </span>
  );
}

/* =====================================================================
   Content. Edit these arrays to relabel the mockup. All names are
   fictional.
   ===================================================================== */

const TOP_NAV = ['Platform', 'Products and solutions', 'Learning and tools', 'Get help'];

const SPACE_TABS = ['Questions', 'Feature requests', 'Releases', 'News', 'Demos', 'Help articles', 'Files', 'Sub-groups'];

const TILES = [
  { title: 'Ask a question', body: 'Discuss topics with fellow auditors.', Icon: AskIcon },
  { title: 'Request a feature', body: 'Submit and vote on feature requests.', Icon: IdeaIcon },
  { title: 'Releases', body: 'Find software and release notes.', Icon: ReleaseIcon },
  { title: 'Help articles', body: 'Browse install, user, and admin guides.', Icon: DocsIcon },
  { title: 'Take a survey', body: 'Tell us what you think of Forge and Collect.', Icon: SurveyIcon },
];

const UNANSWERED = [
  {
    title: 'Is there an API to pause a scheduled audit?',
    replies: 0,
    when: 'Started 2 hours ago',
    by: 'Dana Whitfield',
  },
];

const ANSWERED = [
  { title: 'Bulk upload of claim files to Collect', replies: 4, when: 'Latest 1 hour ago', by: 'Sam Okafor' },
  { title: 'Forge audit export error: 400 Bad Request', replies: 3, when: 'Latest 3 hours ago', by: 'Priya Natarajan', votes: 1 },
  { title: 'Value cannot be null. Parameter name: policyNumber', replies: 3, when: 'Latest 5 hours ago', by: 'Leo Marchetti', votes: 2 },
  { title: 'Sampling question for premium audits', replies: 1, when: 'Latest yesterday', by: 'Avery Lindqvist', votes: 1 },
  { title: 'Collect: error when sorting by loss date, code 500', replies: 2, when: 'Latest yesterday', by: 'Sam Okafor', votes: 1 },
  {
    title: 'Can Forge pull carrier documents from a shared drive through the integrations module?',
    replies: 1,
    when: 'Latest 2 days ago',
    by: 'Sam Okafor',
    votes: 1,
  },
  {
    title: 'Does auto-retry work with scheduled audits? If so, does it support batch audit jobs?',
    replies: 2,
    when: 'Latest 2 days ago',
    by: 'Sam Okafor',
    votes: 1,
  },
  {
    title: 'How can I export flagged findings from a Forge audit to a reviewer folder?',
    replies: 3,
    when: 'Latest 3 days ago',
    by: 'Jordan Reyes',
    votes: 1,
  },
  {
    title: 'Error: Policy period overlaps an existing audit. Error code: AUD-1042.',
    replies: 11,
    when: 'Latest 4 days ago',
    by: 'Morgan Ellis',
    votes: 1,
  },
  {
    title: 'Will custom exposure fields ever be available in Collect? Could this be a future enhancement?',
    replies: 1,
    when: 'Latest 5 days ago',
    by: 'Morgan Ellis',
    votes: 1,
  },
];

const NEWS = [
  { title: 'Announcement: Changes to how Forge calculates audited premium, starting next release', when: '2 days ago', initials: 'CT', tone: 0 },
  { title: "'Policy not found' error in Collect", when: '4 days ago', initials: 'RK', tone: 1 },
  { title: 'Clearpath data center maintenance update', when: '1 week ago', initials: 'CT', tone: 0 },
  { title: 'Customers using legacy audit templates should move to the new template builder', when: '2 weeks ago', initials: 'JH', tone: 2 },
  { title: 'Unauthorized client error in Collect', when: '2 weeks ago', initials: 'CT', tone: 0 },
  { title: "'Conflicting changes to the audit have been detected' error in Forge", when: '3 weeks ago', initials: 'CT', tone: 0 },
  { title: "Forge's classic audit view is being retired", when: '1 month ago', initials: 'AP', tone: 3 },
  { title: 'New sign-in flow for Collect', when: '1 month ago', initials: 'RK', tone: 1 },
];

const WHAT_CHANGED = [
  { title: 'Forge 26.4: What changed', when: '3 days ago' },
  { title: 'Collect 26.4: What changed', when: '3 days ago' },
  { title: 'Forge 26.3: What changed', when: '1 month ago' },
  { title: 'Collect 26.3: What changed', when: '1 month ago' },
  { title: '2025 release roundup', when: '9 months ago' },
];

/* =====================================================================
   Clearpath Community: Forge and Collect space home page.
   ===================================================================== */

function QuestionRow({ title, replies, when, by, votes, answered }) {
  return (
    <li className={styles.row}>
      <span className={styles.status}>{answered ? <CheckIcon /> : <QuestionIcon />}</span>
      <span className={styles.rowTitle}>
        {title}
        {votes ? <span className={styles.votes}>+{votes}</span> : null}
      </span>
      <span className={styles.stat}>
        <strong>{replies}</strong>
        <span>{replies === 1 ? 'reply' : 'replies'}</span>
      </span>
      <span className={styles.when}>
        <span>{when}</span>
        <span className={styles.by}>
          by <strong>{by}</strong>
        </span>
      </span>
    </li>
  );
}

function ListHead({ label }) {
  return (
    <div className={styles.listHead}>
      <span className={styles.filter}>
        {label} <ChevronIcon />
      </span>
      <span className={styles.sorts}>
        <span className={styles.filter}>
          By last reply date <ChevronIcon />
        </span>
        <span className={styles.filter}>
          Descending <ChevronIcon />
        </span>
      </span>
    </div>
  );
}

export function ClearpathCommunityMockup() {
  return (
    <figure className={styles.figure}>
      <div
        className={styles.browser}
        role="img"
        aria-label="Mockup of the Clearpath Community Forge and Collect space, with question lists, news, and release links">
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.url}>community.clearpath.example</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <ClearpathLogo />
            <div className={styles.globalSearch}>
              <SearchIcon />
              <span>Search</span>
            </div>
            <Avatar initials="MS" tone={1} />
          </header>
          <nav className={styles.topNav}>
            {TOP_NAV.map((item) => (
              <span key={item} className={styles.topNavLink}>
                {item} <ChevronIcon />
              </span>
            ))}
            <span className={styles.topNavLink}>Welcome</span>
          </nav>

          {/* Space banner */}
          <section className={styles.banner}>
            <span className={styles.bannerBadge}>
              <ShieldIcon />
            </span>
            <div className={styles.bannerText}>
              <h2 className={styles.bannerTitle}>Forge and Collect</h2>
              <div className={styles.tabs}>
                {SPACE_TABS.map((tab, i) => (
                  <span key={tab} className={`${styles.tab} ${i === 0 ? styles.tabActive : ''}`}>
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <span className={styles.newButton}>+ New</span>
          </section>

          <div className={styles.layout}>
            {/* Main column */}
            <main className={styles.main}>
              <div className={styles.spaceSearch}>
                <SearchIcon />
                <span>Search within this space…</span>
              </div>

              <div className={styles.tiles}>
                {TILES.map(({ title, body, Icon: TileIcon }) => (
                  <div key={title} className={styles.tile}>
                    <span className={styles.tileIcon}>
                      <TileIcon />
                    </span>
                    <span className={styles.tileTitle}>{title}</span>
                    <span className={styles.tileBody}>{body}</span>
                  </div>
                ))}
              </div>

              <section className={styles.panel}>
                <h3 className={styles.panelTitle}>Unanswered questions</h3>
                <ListHead label="Unanswered questions and discussions" />
                <ul className={styles.list}>
                  {UNANSWERED.map((q) => (
                    <QuestionRow key={q.title} {...q} />
                  ))}
                </ul>
              </section>

              <section className={styles.panel}>
                <h3 className={styles.panelTitle}>Answered questions</h3>
                <ListHead label="Answered questions and discussions" />
                <ul className={styles.list}>
                  {ANSWERED.map((q) => (
                    <QuestionRow key={q.title} answered {...q} />
                  ))}
                </ul>
                <div className={styles.pager}>
                  <span className={`${styles.pageButton} ${styles.pageButtonOff}`}>
                    <PageArrow dir="prev" />
                  </span>
                  <span className={styles.pageNums}>
                    <span className={styles.pageCurrent}>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </span>
                  <span className={styles.pageButton}>
                    <PageArrow dir="next" />
                  </span>
                </div>
              </section>
            </main>

            {/* Sidebar */}
            <aside className={styles.side}>
              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>Welcome to the Forge and Collect community</div>
                <p className={styles.sideBody}>
                  Clearpath Forge, Clearpath Collect, audit templates, carrier integrations, APIs, and premium audit
                  terminology
                </p>
              </div>

              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <VideoIcon /> Watch demos
                </div>
                <p className={styles.sideBody}>Watch short video clips of new features.</p>
              </div>

              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <ArticleIcon /> Browse help articles
                </div>
                <p className={styles.sideBody}>Resolve errors, get workarounds, and troubleshoot.</p>
              </div>

              <div className={`${styles.sideCard} ${styles.overview}`}>
                <span className={styles.overviewIcon}>
                  <OverviewIcon />
                </span>
                <div>
                  <div className={styles.sideTitle}>Product overview</div>
                  <p className={styles.sideBody}>Learn more about the features of Forge and Collect.</p>
                </div>
              </div>

              <div className={styles.sideCard}>
                <h4 className={styles.sideHeading}>News</h4>
                <ul className={styles.feed}>
                  {NEWS.map(({ title, when, initials, tone }) => (
                    <li key={title} className={styles.feedItem}>
                      <Avatar initials={initials} tone={tone} />
                      <span>
                        <span className={styles.feedTitle}>{title}</span>
                        <span className={styles.feedWhen}>{when}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sideCard}>
                <h4 className={styles.sideHeading}>What changed</h4>
                <ul className={styles.feed}>
                  {WHAT_CHANGED.map(({ title, when }) => (
                    <li key={title} className={styles.feedItem}>
                      <Avatar initials="CT" tone={0} />
                      <span>
                        <span className={styles.feedTitle}>{title}</span>
                        <span className={styles.feedWhen}>{when}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sideCard}>
                <div className={styles.sideTitle}>
                  <LibraryIcon /> Audit template library
                </div>
                <p className={styles.sideBody}>
                  Starter templates for workers' compensation, general liability, and commercial auto premium audits
                  that you can copy and customize in Forge.
                </p>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span className={styles.social}>
              <IconifyIcon icon="bi:linkedin" className={styles.footerIcon} aria-hidden="true" />
              <IconifyIcon icon="bi:youtube" className={styles.footerIcon} aria-hidden="true" />
            </span>
            <span className={styles.legal}>
              <span>Privacy</span>
              <span>Terms of use</span>
              <span>© Clearpath Inc.</span>
            </span>
          </footer>
        </div>
      </div>
    </figure>
  );
}

/* =====================================================================
   Clearpath Community: Data Analytics System (DAS) releases page.
   ===================================================================== */

// Space badge for DAS Apps and Services: stacked data layers.
function LayersIcon() {
  return (
    <Icon>
      <path d="M12 3.5l8.5 4.25L12 12 3.5 7.75 12 3.5z" fill="currentColor" fillOpacity="0.16" />
      <path d="M3.5 12L12 16.25 20.5 12" />
      <path d="M3.5 16.25L12 20.5l8.5-4.25" />
    </Icon>
  );
}

function CaretIcon({ open }) {
  return (
    <Icon className={rs.caret}>
      {open ? <path d="M7 10l5 5 5-5" /> : <path d="M10 7l5 5-5 5" />}
    </Icon>
  );
}

function TagIcon() {
  return (
    <Icon className={rs.tagIcon}>
      <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9-8-8z" fill="currentColor" fillOpacity="0.16" />
      <circle cx="8" cy="8" r="1.25" />
    </Icon>
  );
}

function StarIcon() {
  return (
    <Icon className={rs.star}>
      <path d="M12 3.75l2.5 5.1 5.6.8-4.05 3.95.95 5.6L12 16.55 6.99 19.2l.96-5.6L3.9 9.65l5.6-.8L12 3.75z" />
    </Icon>
  );
}

function QuestionsIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <circle cx="12" cy="12" r="8.5" fill="currentColor" fillOpacity="0.16" />
      <path d="M9.75 9.5a2.25 2.25 0 1 1 3.4 1.95c-.7.4-1.15.9-1.15 1.7v.35" />
      <circle cx="12" cy="16.5" r="0.4" fill="currentColor" />
    </Icon>
  );
}

function SmallIdeaIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <path
        d="M12 3a6 6 0 0 0-3.6 10.8c.7.55 1.1 1.3 1.1 2.2v.5h5v-.5c0-.9.4-1.65 1.1-2.2A6 6 0 0 0 12 3z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path d="M9.75 19.5h4.5M10.5 21.5h3" />
    </Icon>
  );
}

function SmallReleaseIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4v-9z" fill="currentColor" fillOpacity="0.16" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
    </Icon>
  );
}

function SmallDocsIcon() {
  return (
    <Icon className={styles.sideIcon}>
      <rect x="3" y="4" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.16" />
      <path d="M9 21h6M12 17v4" />
    </Icon>
  );
}

/* ---------- Content ---------- */

// Left navigation tree. `open` marks expanded folders and `active` marks the
// current page. Only the DAS 20.3 release is expanded.
const RELEASE_NAV = [
  { label: 'Shortcuts' },
  { label: "What's new", folder: true },
  { label: 'Critical bugs' },
  { label: 'Known issues' },
  { label: 'Software', folder: true },
  {
    label: 'Past releases still supported',
    folder: true,
    open: true,
    children: [
      { label: 'Features by version' },
      {
        label: 'DAS 20.3 Release',
        folder: true,
        open: true,
        active: true,
        children: [
          { label: 'DAS 20.3: What changed' },
          { label: 'DAS 20.3: Release notes and patches' },
          { label: 'DAS 20.3: Critical and high bugs' },
          { label: 'DAS 20.3: Known issues' },
          {
            label: 'DAS 20.3: Software',
            folder: true,
            open: true,
            children: [
              { label: 'DAS 20.3 for SQL Server 2019 and 2016' },
              { label: 'Lens Designer 20.3' },
              { label: 'Pipeline Designer 20.3' },
              { label: 'Mart Builder PowerShell Installer for SQL Server 2019 and 2016 for DAS 20.3' },
            ],
          },
        ],
      },
      { label: 'DAS 20.2 Release', folder: true },
      { label: 'DAS 19.2 Release', folder: true },
      { label: 'DAS 19.1 Release', folder: true },
    ],
  },
  { label: 'Past releases not supported', folder: true },
];

const DAS_LINKS = [
  { title: 'Questions', body: 'Ask fellow users questions and search for answers.', Icon: QuestionsIcon },
  { title: 'Feature requests', body: 'Submit and vote on feature requests.', Icon: SmallIdeaIcon },
  {
    title: 'Releases',
    body: 'Find software, release notes and known issues, and recaps of what changed in each release.',
    Icon: SmallReleaseIcon,
  },
  { title: 'Demos', body: 'Watch short video clips of new features.', Icon: VideoIcon },
  { title: 'Documentation', body: 'Browse and search install and user guides online.', Icon: SmallDocsIcon },
  { title: 'Help articles', body: 'Resolve errors, get workarounds, and troubleshoot.', Icon: ArticleIcon },
];

// Download table. `primary` rows are downloadable packages; the indented
// rows are components bundled with the package above them.
const DOWNLOADS = [
  { name: 'DAS 20.3 for SQL Server 2019 and 2016', primary: true, install: 'Install guide' },
  { name: 'Forge 5.7', user: 'User guide' },
  { name: 'DAS Operations Console 2.1', user: 'User guide' },
  { name: '"New" Collect 6.2', user: 'User guide' },
  { name: 'Legacy Collect 5.5' },
  { name: 'DAS Loader Engines and ETL', user: 'User guide' },
  { name: 'DAS Access Control', user: 'User guide' },
  { name: 'DAS Engine Extensibility', user: 'User guide and API reference' },
  { name: 'DAS Services and REST API', user: 'User guide and API reference' },
  { name: 'Lens Designer 20.3', primary: true, install: 'Install guide', user: 'User guide' },
  { name: 'Pipeline Designer 20.3', primary: true, install: 'Install guide', user: 'User guide' },
  {
    name: 'Mart Builder PowerShell Installer for SQL Server 2019 and 2016*',
    primary: true,
    install: 'Install instructions',
  },
];

const RELATED = [
  { title: 'DAS 20.3: Known issues', body: 'To see known issues for a previous DAS version, at left click Past releases…' },
  { title: 'DAS 20.3: Critical and high bugs', body: 'To see critical and high bugs for DAS 20.3 and DAS 20.2, at left click…' },
];

/* ---------- Pieces ---------- */

function NavTree({ items, depth = 0 }) {
  return (
    <ul className={rs.navList}>
      {items.map((item) => (
        <li key={item.label}>
          <span
            className={`${rs.navItem} ${item.active ? rs.navActive : ''}`}
            style={{ paddingLeft: `${0.4 + depth * 0.8}rem` }}>
            <span className={rs.caretSlot}>{item.folder ? <CaretIcon open={item.open} /> : null}</span>
            <span>{item.label}</span>
          </span>
          {item.open && item.children ? <NavTree items={item.children} depth={depth + 1} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function ClearpathReleasesMockup() {
  return (
    <figure className={styles.figure}>
      <div
        className={styles.browser}
        role="img"
        aria-label="Mockup of the Clearpath Community DAS 20.3 release page, with a release navigation tree, key resources, and a software download table">
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.url}>community.clearpath.example/das/releases</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <ClearpathLogo gradId="cp-releases-logo-grad" />
            <div className={styles.globalSearch}>
              <SearchIcon />
              <span>Search</span>
            </div>
            <Avatar initials="MS" tone={1} />
          </header>
          <nav className={styles.topNav}>
            {TOP_NAV.map((item) => (
              <span key={item} className={styles.topNavLink}>
                {item} <ChevronIcon />
              </span>
            ))}
            <span className={styles.topNavLink}>Welcome</span>
          </nav>

          {/* Space banner */}
          <section className={styles.banner}>
            <span className={styles.bannerBadge}>
              <LayersIcon />
            </span>
            <div className={styles.bannerText}>
              <h2 className={styles.bannerTitle}>DAS Apps and Services</h2>
              <div className={styles.tabs}>
                {SPACE_TABS.map((tab) => (
                  <span key={tab} className={`${styles.tab} ${tab === 'Releases' ? styles.tabActive : ''}`}>
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <span className={styles.newButton}>+ New</span>
          </section>

          <div className={rs.layout}>
            {/* Left navigation */}
            <aside className={rs.side}>
              <div className={`${styles.sideCard} ${rs.navCard}`}>
                <NavTree items={RELEASE_NAV} />
              </div>

              <div className={rs.sideButtons}>
                <span className={rs.sideButton}>Turn page notifications off</span>
                <span className={rs.sideButton}>Bookmark this wiki</span>
              </div>

              <div className={styles.sideCard}>
                <h4 className={styles.sideHeading}>DAS links</h4>
                <ul className={rs.links}>
                  {DAS_LINKS.map(({ title, body, Icon: LinkIcon }) => (
                    <li key={title}>
                      <span className={styles.sideTitle}>
                        <LinkIcon /> {title}
                      </span>
                      <p className={styles.sideBody}>{body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Article */}
            <main className={rs.main}>
              <article className={rs.article}>
                <h3 className={rs.title}>DAS 20.3 Release</h3>
                <div className={rs.date}>6 November 2020</div>

                <h4 className={rs.heading}>Key resources</h4>
                <ul className={rs.bullets}>
                  <li>
                    Short overviews of major changes: <span className={rs.link}>DAS 20.3: What changed</span>
                  </li>
                  <li>
                    <span className={rs.link}>DAS 20.3: Release notes and patches</span>
                  </li>
                  <li>
                    <span className={rs.link}>DAS 20.3: Known issues</span>
                  </li>
                </ul>

                <h4 className={rs.heading}>For installs and upgrades</h4>
                <ul className={rs.bullets}>
                  <li>
                    To schedule an upgrade, submit a service request in{' '}
                    <span className={rs.link}>Client Support</span>.
                  </li>
                  <li>
                    <strong className={rs.link}>New in the DAS install process</strong>
                  </li>
                  <li>
                    <strong className={rs.link}>Compatibility matrix</strong>
                  </li>
                </ul>

                <h4 className={rs.heading}>DAS 20.3</h4>
                <div className={rs.tableWrap}>
                  <table className={rs.table}>
                    <thead>
                      <tr>
                        <th>Download software</th>
                        <th>Install guide</th>
                        <th>User guide</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DOWNLOADS.map(({ name, primary, install, user }) => (
                        <tr key={name} className={primary ? rs.primaryRow : rs.childRow}>
                          <td>{primary ? <strong className={rs.link}>{name}</strong> : name}</td>
                          <td>{install ? <span className={rs.link}>{install}</span> : null}</td>
                          <td>{user ? <span className={rs.link}>{user}</span> : null}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className={rs.note}>
                  Guides in PDF format are available on request. Please post a comment below. PDFs may not always be as
                  current as the <span className={rs.link}>online documentation</span>.
                </p>
                <p className={rs.note}>
                  *The Mart Builder GUI installer used in DAS 20.2 and earlier is retired. It is replaced by the Mart
                  Builder PowerShell installer.
                </p>

                <div className={rs.tags}>
                  <span className={rs.tag}>
                    <TagIcon /> das 20.3
                  </span>
                  <span className={rs.tag}>
                    <TagIcon /> release directory
                  </span>
                </div>

                <div className={rs.actions}>
                  <span className={rs.editButton}>Edit</span>
                  <span className={rs.link}>Like</span>
                  <span className={rs.stars}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                  <span className={rs.link}>Share</span>
                  <span className={rs.link}>More</span>
                </div>
              </article>

              <section className={rs.article}>
                <h4 className={rs.relatedHeading}>Related</h4>
                <div className={rs.related}>
                  {RELATED.map(({ title, body }) => (
                    <div key={title} className={rs.relatedItem}>
                      <Avatar initials="CT" tone={0} />
                      <span>
                        <span className={rs.link}>{title}</span>
                        <span className={rs.relatedBody}>{body}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span className={styles.social}>
              <IconifyIcon icon="bi:linkedin" className={styles.footerIcon} aria-hidden="true" />
              <IconifyIcon icon="bi:youtube" className={styles.footerIcon} aria-hidden="true" />
            </span>
            <span className={styles.legal}>
              <span>Privacy</span>
              <span>Terms of use</span>
              <span>© Clearpath Inc.</span>
            </span>
          </footer>
        </div>
      </div>
    </figure>
  );
}
