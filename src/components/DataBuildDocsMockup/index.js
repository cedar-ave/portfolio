import React, { useState } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import styles from './styles.module.css';

/* =====================================================================
   Data Build docs-as-code help site: home page and an article page
   (running R pipelines without an Internet connection). The sidebar
   filter, Copy Code button, and feedback buttons are live.
   ===================================================================== */

// Data Build: stacked database disks with a build spark.
function DataBuildLogo() {
  return (
    <span className={styles.logo}>
      <svg viewBox="0 0 24 24" className={styles.logoMark} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="11" cy="5.5" rx="7" ry="2.75" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 5.5v6c0 1.5 3.1 2.75 7 2.75" />
        <path d="M18 5.5v4" />
        <path d="M4 11.5v6c0 1.5 3.1 2.75 7 2.75" />
        <path d="M17.5 12.5l-2.5 4h4l-2.5 4" />
      </svg>
      <span className={styles.logoName}>Data Build</span>
      <span className={styles.logoDivider} />
      <span className={styles.logoProduct}>Documentation</span>
    </span>
  );
}

const SIDE_NAV = [
  {
    section: 'Machine learning',
    articles: ['R package versions', 'R without Internet', 'Run R pipelines', 'R live logging'],
  },
  {
    section: 'Troubleshoot',
    articles: ['Load fail error', 'Pipeline timeout'],
  },
];

const CURRENT_ARTICLE = 'R without Internet';

const IN_THIS_ARTICLE = ['Install R', 'No Internet connection'];

const RODBC_VERSIONS = [
  ['3.x.x', '1.3-16'],
  ['4.0.0+', '1.3-19'],
];

// Lines of the rEngine config example, split into tokens for highlighting.
const CONFIG_VARIABLES = [
  ['Version', '3.6.3'],
  ['InstallPath', 'D:\\DataBuild\\R'],
  ['LibraryPath', 'D:\\DataBuild\\R\\Libraries'],
  ['RODBCVersion', '1.3-16'],
];

const CONFIG_TEXT = [
  '<scope name="rEngine">',
  ...CONFIG_VARIABLES.map(([name, value]) => `    <variable name="${name}" value="${value}" />`),
  '</scope>',
].join('\n');

const ALLOWED_SITES = ['https://cran.r-project.org', 'https://cloud.r-project.org', 'https://packagemanager.posit.co'];

function Note({ children }) {
  return (
    <div className={styles.note}>
      <div className={styles.noteTitle}>
        <IconifyIcon icon="mdi:information" aria-hidden="true" /> Note
      </div>
      <p>{children}</p>
    </div>
  );
}

function ConfigCodeBlock() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(CONFIG_TEXT).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {},
    );
  };

  return (
    <div className={styles.codeWrap}>
      <button type="button" className={styles.copyButton} onClick={copy}>
        <IconifyIcon icon={copied ? 'mdi:check' : 'mdi:content-copy'} aria-hidden="true" />
        {copied ? 'Copied' : 'Copy Code'}
      </button>
      <pre className={styles.code}>
        <code>
          {'<'}
          <span className={styles.tokTag}>scope</span> <span className={styles.tokAttr}>name</span>=
          <span className={styles.tokStr}>"rEngine"</span>
          {'>\n'}
          {CONFIG_VARIABLES.map(([name, value]) => (
            <React.Fragment key={name}>
              {'    <'}
              <span className={styles.tokTag}>variable</span> <span className={styles.tokAttr}>name</span>=
              <span className={styles.tokStr}>"{name}"</span> <span className={styles.tokAttr}>value</span>=
              <span className={styles.tokStr}>"{value}"</span>
              {' />\n'}
            </React.Fragment>
          ))}
          {'</'}
          <span className={styles.tokTag}>scope</span>
          {'>'}
        </code>
      </pre>
    </div>
  );
}

/* =====================================================================
   Shared site shell: browser frame, header, version/search bar,
   filterable left navigation, and footer.
   ===================================================================== */

function matches(text, query) {
  return text.toLowerCase().includes(query);
}

// Left navigation. The filter box is live: typing narrows the topics.
function SideNav({ sections, current }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const visible = sections
    .map(({ section, articles = [] }) => {
      if (!q || matches(section, q)) return { section, articles };
      const hits = articles.filter((title) => matches(title, q));
      return hits.length ? { section, articles: hits } : null;
    })
    .filter(Boolean);

  return (
    <aside className={styles.sideNav}>
      <label className={styles.filter}>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Enter here to filter…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter topics"
        />
        <IconifyIcon icon="mdi:filter" aria-hidden="true" />
      </label>
      {visible.map(({ section, articles }) => (
        <div key={section} className={styles.sideNavSection}>
          <h3 className={styles.sideNavHeading}>{section}</h3>
          {articles.length > 0 && (
            <ul className={styles.sideNavList}>
              {articles.map((title) => (
                <li key={title} className={title === current ? styles.sideNavActive : undefined}>
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {visible.length === 0 && <p className={styles.sideNavEmpty}>No matching topics</p>}
    </aside>
  );
}

function RailLinks() {
  return (
    <>
      <span className={styles.railLink}>
        <IconifyIcon icon="mdi:comment-processing" aria-hidden="true" /> Request a Feature
      </span>
      <span className={styles.railLink}>
        <IconifyIcon icon="mdi:account-group" aria-hidden="true" /> Ask a Question
      </span>
    </>
  );
}

function SiteFrame({ url, crumb, sideNav, current, layoutClassName, children }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.url}>{url}</span>
        </div>

        <div className={styles.page}>
          {/* Header */}
          <header className={styles.header}>
            <DataBuildLogo />
            <nav className={styles.nav}>
              <span className={styles.navLink}>
                Applications <IconifyIcon icon="mdi:chevron-down" aria-hidden="true" />
              </span>
              <span className={styles.navLink}>
                Developers <IconifyIcon icon="mdi:chevron-down" aria-hidden="true" />
              </span>
            </nav>
            <span className={styles.headerRight}>
              <IconifyIcon icon="mdi:help-circle-outline" className={styles.headerHelp} aria-hidden="true" />
              <span className={styles.headerDivider} />
              <span className={styles.userName}>Marla Sowards</span>
            </span>
          </header>

          {/* Version switcher, breadcrumbs, search */}
          <div className={styles.subheader}>
            <span className={styles.version}>
              DBP 2025+ <IconifyIcon icon="mdi:menu-down" aria-hidden="true" />
            </span>
            <span className={styles.crumbs}>
              <IconifyIcon icon="mdi:chevron-right" className={styles.crumbSep} aria-hidden="true" />
              <IconifyIcon icon="mdi:home" className={styles.crumbHome} aria-hidden="true" />
              <IconifyIcon icon="mdi:chevron-right" className={styles.crumbSep} aria-hidden="true" />
              {crumb && <span className={styles.crumbCurrent}>{crumb}</span>}
            </span>
            <span className={styles.search}>
              <IconifyIcon icon="mdi:magnify" aria-hidden="true" /> Search
            </span>
          </div>

          <div className={layoutClassName}>
            <SideNav sections={sideNav} current={current} />
            {children}
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <span className={styles.footerLeft}>
              <span>
                Copyright © <span className={styles.footerLink}>Data Build</span>
              </span>
              <span className={styles.footerLink}>Terms and Conditions</span>
              <span className={styles.footerLink}>Cloud-native DBP Docs</span>
            </span>
            <span className={styles.footerRight}>
              <span className={styles.footerLink}>
                <IconifyIcon icon="mdi:pencil" aria-hidden="true" /> Edit this page
              </span>
              <span className={styles.footerSep}>|</span>
              <span className={styles.footerLink}>Contributor reference</span>
              <span className={styles.footerSep}>|</span>
              <span className={styles.footerLink}>Back to top</span>
            </span>
          </footer>
        </div>
      </div>
    </figure>
  );
}

/* =====================================================================
   Home page: three audience columns of topic cards.
   ===================================================================== */

const HOME_NAV = [
  { section: 'Home', articles: ["What's new", 'Known issues', 'About DBP'] },
  { section: 'Install DBP' },
  {
    section: 'DBP applications',
    articles: [
      'Data Catalog',
      'DBP Access Control',
      'DBP Data Store',
      'DBP Operations Console',
      'Data Explorer',
      'Dataset Designer',
      'Source Model Designer',
    ],
  },
  { section: 'Reference Set Builder' },
  { section: 'ETL Guidance' },
];

// Each column holds cards; each card holds one or more link groups.
const HOME_COLUMNS = [
  {
    title: 'Install and setup',
    icon: 'mdi:download-box-outline',
    cards: [
      [
        { heading: 'New in DBP installs', links: ['New in the DBP install process', 'Compatibility matrix'] },
        { heading: 'Prepare to install DBP', links: ['DBP Pre-Install Checklist', 'DBP Pre-Install Guides'] },
        {
          heading: 'Install DBP',
          text: 'Web applications (Data Catalog, DBP Operations Console, Data Explorer) and DBP engines and services are installed with DBP.',
          links: ['DBP Install Guide'],
        },
        {
          heading: 'Install desktop applications',
          links: ['Dataset Designer', 'Source Model Designer', 'Data Model Configuration Manager'],
        },
      ],
    ],
  },
  {
    title: 'For users',
    icon: 'mdi:account-multiple-outline',
    cards: [
      [
        {
          heading: 'User guides',
          text: 'Find interface tours, steps to get started, how-to articles, and troubleshooting support.',
          links: [
            'Data Catalog',
            'DBP Operations Console',
            'Data Explorer',
            'Dataset Designer',
            'Source Model Designer',
            'Reference Set Builder',
          ],
        },
        { heading: 'Admin guides', links: ['DBP Access Control'] },
      ],
      [
        {
          heading: 'ETL guidance',
          text: 'Get guidance on ETL operations, extensibility, and using the Data Model Configuration Manager.',
          links: ['ETL best practices', 'Pipeline extensibility'],
        },
      ],
    ],
  },
  {
    title: 'For developers',
    icon: 'mdi:code-braces',
    dev: true,
    cards: [
      [{ heading: 'REST APIs and services', links: ['Get started', 'Tutorials', 'Reference guide'] }],
      [{ heading: 'Pipeline Engine API', links: ['Get started', 'Engine extensibility API guide'] }],
      [{ heading: 'Extensions to DBP', links: ['Community extension library'] }],
    ],
  },
];

export function DataBuildHomeMockup() {
  return (
    <SiteFrame url="docs.databuild.example/dbp" sideNav={HOME_NAV} layoutClassName={styles.layoutHome}>
      <main className={styles.home}>
        <div className={styles.homeTop}>
          <div>
            <h2 className={styles.homeTitle}>Welcome to DBP docs</h2>
            <p className={styles.homeLead}>Install, use, and extend the Data Build Platform.</p>
          </div>
          <div className={styles.homeRail}>
            <RailLinks />
          </div>
        </div>

        <div className={styles.homeGrid}>
          {HOME_COLUMNS.map((col) => (
            <section key={col.title} className={`${styles.homeCol} ${col.dev ? styles.homeColDev : ''}`}>
              <h3 className={styles.homeColTitle}>
                <span className={styles.homeColIcon}>
                  <IconifyIcon icon={col.icon} aria-hidden="true" />
                </span>
                {col.title}
              </h3>
              {col.cards.map((groups) => (
                <div key={groups[0].heading} className={styles.card}>
                  {groups.map((group) => (
                    <div key={group.heading} className={styles.cardGroup}>
                      <h4 className={styles.cardHeading}>{group.heading}</h4>
                      {group.text && <p className={styles.cardText}>{group.text}</p>}
                      <ul className={styles.cardLinks}>
                        {group.links.map((link) => (
                          <li key={link}>
                            <span className={styles.cardLink}>
                              {link}
                              <IconifyIcon icon="mdi:chevron-right" className={styles.cardArrow} aria-hidden="true" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
    </SiteFrame>
  );
}

/* =====================================================================
   Article page.
   ===================================================================== */

export function DataBuildArticleMockup() {
  const [helpful, setHelpful] = useState(null);

  return (
    <SiteFrame
      url="docs.databuild.example/dbp/machine-learning/r-without-internet"
      crumb={CURRENT_ARTICLE}
      sideNav={SIDE_NAV}
      current={CURRENT_ARTICLE}
      layoutClassName={styles.layout}>
      {/* Article */}
      <article className={styles.article}>
        <h2 className={styles.title}>Use R pipelines without an Internet connection</h2>

        <p>
          DBP uses the Internet to download R and individual R packages. First, R downloads when DBP is
          installed on the ETL server. Next, packages download when the DBP Engine runs a pipeline. If your
          environment doesn't allow that, following are solutions.
        </p>

        <h3 className={styles.h2}>Install R</h3>
        <p>A PowerShell script executes when DBP is installed that:</p>
        <ul>
          <li>Downloads and installs R</li>
          <li>Registers the R instance with DBP</li>
          <li>Downloads and installs the RODBC package</li>
        </ul>

        <h4 className={styles.h3}>Script</h4>
        <p className={styles.path}>DBPInstaller\SetupContent\DataBuild.Engine.InstallPackage\Install-R.ps1</p>

        <h4 className={styles.h3}>Configuration file</h4>
        <p>
          Edit the <strong>rEngine</strong> scope of the <strong>install.config</strong> file to change the
          version, install path, library path, and RODBC version for your R instance.
        </p>

        <h5 className={styles.h4}>Example</h5>
        <p>Use the table below to guide your RODBC package version selection:</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>R version</th>
              <th>RODBC package version</th>
            </tr>
          </thead>
          <tbody>
            {RODBC_VERSIONS.map(([r, rodbc]) => (
              <tr key={r}>
                <td>{r}</td>
                <td>{rodbc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          If R is installed at <strong>D:\DataBuild\R\R-3.6.3</strong>, include a section like the following
          in the config file:
        </p>
        <ConfigCodeBlock />

        <Note>
          You can modify the <code>RODBCVersion</code>. Be sure the RODBC version is compatible with the
          configured R version.
        </Note>
        <Note>
          Enable the <strong>EnableAutoResolveOfRODBCPackageVersion</strong> toggle in{' '}
          <strong>PlatformFeatureToggle</strong> when using R version 4 or greater along with RODBC version
          1.3-19 or greater.
        </Note>

        <h3 className={styles.h2}>No Internet connection</h3>

        <h4 className={styles.h3}>Register an R instance without an Internet connection</h4>
        <ul>
          <li>
            Install R manually. Edit the <strong>install.config</strong> file to point to the install location
            (<code>InstallPath</code>).
          </li>
          <li>
            Install the RODBC package manually, preferably in a directory with the name of the version. Edit
            the <strong>install.config</strong> file <code>LibraryPath</code> and <code>RODBCVersion</code>.
            If you install the RODBC package per the configuration in the{' '}
            <span className={styles.inlineLink}>example above</span>, the RODBC library is installed to{' '}
            <strong>D:\DataBuild\R\Libraries\RODBC\1.3-16\RODBC</strong>.
          </li>
          <li>
            Run the R installation script to configure the metadata for the R environment so Dataset Designer
            and the Engine know about the manually installed R instance.
          </li>
        </ul>
        <p>
          You can also install the ODBC package instead of or in addition to the RODBC package. To use the ODBC
          package, enable the <strong>EnableOdbcPackageForR</strong> toggle in{' '}
          <strong>PlatformFeatureToggle</strong>.
        </p>
        <Note>
          Either the RODBC or ODBC package can be used for all R pipelines. You can't customize it for each R
          pipeline.
        </Note>

        <h4 className={styles.h3}>Install packages</h4>
        <p>
          When an R pipeline is executed by the DBP Engine, the R script is modified with additional commands
          to download packages according to the metadata for the pipeline. In Dataset Designer, leave the
          package dependency list empty so the Engine doesn't download packages.
        </p>
        <p>Following are two methods to manage your R packages without using built-in DBP support:</p>

        <h5 className={styles.h4}>Set up a CRAN mirror</h5>
        <p>
          Set up a mirror of CRAN in your network (see{' '}
          <span className={styles.inlineLink}>CRAN documentation</span>). Use the{' '}
          <code>install.packages</code> command in your R script to retrieve packages. Use the{' '}
          <code>repos</code> option to point to your mirror.
        </p>

        <h5 className={styles.h4}>Install manually</h5>
        <p>
          Manually install any required packages into some location on the ETL server, such as{' '}
          <strong>D:\DataBuild\R\SiteLibrary</strong>. At the beginning of your R script, set the{' '}
          <code>libPaths</code> variable to point to that library location.
        </p>

        <h4 className={styles.h3}>Allow access to sites</h4>
        <p>If DBP is allowed some Internet access, allow access to the following sites:</p>
        <ul>
          {ALLOWED_SITES.map((site) => (
            <li key={site}>
              <span className={styles.inlineLink}>{site}</span>
            </li>
          ))}
        </ul>

        {/* Feedback */}
        <div className={styles.feedback}>
          <span className={styles.feedbackTitle}>
            {helpful === null ? 'Was this article helpful?' : 'Thanks for your feedback!'}
          </span>
          <span className={styles.feedbackButtons}>
            <button
              type="button"
              className={`${styles.feedbackButton} ${helpful === true ? styles.feedbackSelected : ''}`}
              aria-pressed={helpful === true}
              onClick={() => setHelpful(true)}>
              <IconifyIcon icon="mdi:check-bold" aria-hidden="true" /> Yes
            </button>
            <button
              type="button"
              className={`${styles.feedbackButton} ${helpful === false ? styles.feedbackSelected : ''}`}
              aria-pressed={helpful === false}
              onClick={() => setHelpful(false)}>
              <IconifyIcon icon="mdi:close-thick" aria-hidden="true" /> No
            </button>
          </span>
        </div>
      </article>

      {/* Right rail */}
      <aside className={styles.rail}>
        <RailLinks />
        <h3 className={styles.railTitle}>In this article</h3>
        <ul className={styles.railList}>
          {IN_THIS_ARTICLE.map((heading) => (
            <li key={heading}>{heading}</li>
          ))}
        </ul>
      </aside>
    </SiteFrame>
  );
}
