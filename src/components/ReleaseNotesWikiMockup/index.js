import React from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Mockup of a community-wiki release-notes page for /portfolio/release-notes.
   It merges two source screenshots into one fluid page: the release-list
   landing page (logo, sidebar nav, "+ New", date index) sits on top, and
   the detail page for a single release (version table + fixed/new items)
   flows directly beneath it, as if the reader had scrolled to that anchor.

   Every string below is plain JS/JSX text - edit any of it directly to
   relabel the mockup. The two content arrays (RELEASE_INDEX and
   RELEASE_SECTIONS) are the easiest place to add or change entries.
   ===================================================================== */

// Dated links shown at the bottom of the landing view, newest first.
const RELEASE_INDEX = [
  '17 May 2026',
  '26 April 2026',
  '1 April 2026',
  '12 March 2026',
  '22 February 2026',
  '1 February 2026',
  '12 January 2026',
  '21 December 2025',
  '20 November 2025',
  '6 November 2025 - Initial release',
];

// Left-nav tree for the currently open release ("DataApp 20.3 Release").
const NAV_TREE = [
  { label: 'Shortcuts' },
  { label: "What's new" },
  { label: 'Critical bugs' },
  { label: 'Known issues' },
  { label: 'Software' },
  { label: 'Features by version' },
  {
    label: 'Past releases still supported',
    open: true,
    children: [
      {
        label: 'DataApp 20.3 Release',
        open: true,
        children: [
          { label: 'DataApp 20.3: What changed' },
          { label: 'DataApp 20.3: Release notes and patches', active: true },
          { label: 'DataApp 20.3: Critical and high bugs' },
          { label: 'DataApp 20.3: Known issues' },
          { label: 'DataApp 20.3: Software', hasChildren: true },
        ],
      },
      { label: 'DataApp 20.2 Release', hasChildren: true },
      { label: 'DataApp 19.2 Release', hasChildren: true },
      { label: 'DataApp 19.1 Release', hasChildren: true },
    ],
  },
  { label: 'Past releases not supported', hasChildren: true },
];

const WIKI_LINKS = [
  { icon: '?', title: 'Questions', desc: 'Ask fellow users questions and search for answers.' },
  { icon: '💡', title: 'Feature Requests', desc: 'Submit and vote on feature requests.' },
  { icon: '≡', title: 'Releases', desc: 'Find software, release notes, and known issues, and recaps of what changed in each release.' },
  { icon: '▶', title: 'Demos', desc: 'Watch short video clips of new features.' },
  { icon: '📄', title: 'Documentation', desc: 'Browse and search install and user guides online.' },
  { icon: '❔', title: 'Help Articles', desc: 'Resolve errors, get workarounds, and troubleshooting help.' },
];

// The single-release detail content that the page flows into.
const RELEASE_DATE = '17 May 2026';
const RELEASE_SPRINT = 'Sprint 145';
const RELEASE_VERSIONS = [
  'DataApp 20.3.21132.01 for SQL Server 2019 and 2016',
  'Data Service V1 4.6.2105.1102',
  'Data Service V2 5.1.2105.1102',
  'DataApp Data Processing Engine 5.1.2105.1106',
  'Data Engine for SQL Server 2016 4.4.2104.2301',
];

// One product area of the release, each with a status heading ("Fixed" /
// "New") and a small table of release notes.
const RELEASE_SECTIONS = [
  {
    product: 'Services',
    groups: [
      {
        status: 'Fixed',
        rows: [
          {
            note: 'Patches to the Data Service fail with a 400 error, ',
            strong: 'The Entity Id is not Universal',
            noteEnd: ', when interacting with bindings targeting universal entities',
            id: '271688',
          },
          {
            note: 'Data-processing jobs fail when leveraging Data Service V2 on a ',
            patch: true,
            noteEnd: ' with a 500 error and an error about a duplicate key violation',
            id: '274537',
          },
          {
            note: 'Data Service V2 calls fail with the error ',
            strong: 'Cannot have system field as primary key field',
            noteEnd: ' for data entities during job executions',
            id: '274804',
          },
        ],
      },
    ],
  },
  {
    product: 'Engine',
    groups: [
      {
        status: 'New',
        rows: [
          {
            note: 'Error logging output is improved for jobs that fail when the string value exceeds the defined column length limit of an entity field',
            id: '238828',
          },
        ],
      },
      {
        status: 'Fixed',
        rows: [
          {
            note: "Installation no longer fails with an error that the folder's access control list is not in canonical form.",
            id: '208931',
          },
          {
            note: 'Incremental loads no longer update timestamps with no decimal points of precision for milliseconds (e.g., ',
            strong: '2026-08-17 16:56:24',
            noteEnd: '), which caused future loads to be less efficient',
            id: '235121',
          },
          {
            note: 'Entity loads into SQL Data Warehouse no longer fail with the error ',
            strong: 'The timeout period has expired',
            id: '243709',
          },
          {
            note: 'The Engine no longer treats certain staging paths in ETLObjectAttributeBASE as relative to the Engine install location when only absolute paths should be allowed',
            id: '243745',
          },
          {
            note: 'The ',
            strong: 'EnableEngineToUseDataServiceV2',
            noteEnd: ' attribute is now set in the install config file',
            id: '247843',
          },
          {
            note: 'Extract no longer fails when the multi-file output feature toggle is active but the binding results in zero rows',
            id: '248099',
          },
          {
            note: 'If field mappings are removed from metadata for a flat-file load, the load now fails with an error message about the root cause of the failure',
            id: '248218',
          },
          {
            note: 'In SQL Data Warehouse, a job now shows an error message if an incremental load is run without specifying the primary key',
            id: '252489',
          },
          {
            note: 'When uploading a file to a blob fails, the associated job execution no longer fails and the job is cancelled',
            id: '253120',
          },
        ],
      },
    ],
  },
  {
    product: 'Data Dictionary',
    groups: [
      {
        status: 'New',
        rows: [
          {
            note: 'Source entity and source field are shown to the left of each corresponding entity field on the ',
            strong: 'Entity Details',
            noteEnd: ' page',
            id: '241329',
          },
          {
            note: 'For entities shown in the Data Catalog, the source-entity name is added to ',
            strong: 'Properties',
            noteEnd: ' on the ',
            strong2: 'Entity',
            noteEnd2: ' page, and the source name is added to ',
            strong3: 'Properties',
            noteEnd3: ' on the ',
            strong4: 'Field',
            noteEnd4: ' page',
            id: '269473',
          },
          {
            note: 'When a user enters the entity data object name as their search term, the destination object is returned',
            id: '275782',
          },
        ],
      },
    ],
  },
  {
    product: 'Entity Designer',
    groups: [
      {
        status: 'New',
        rows: [
          {
            note: 'Documentation about entity handlers added for the Data Service (see Add fields to an entity)',
            id: '240602',
          },
          {
            note: 'The DataApp build version number is now shown in the ',
            strong: 'About',
            noteEnd: ' modal',
            id: '238833',
          },
          {
            note: 'Editable ',
            strong: 'Data Steward',
            noteEnd: ' and ',
            strong2: 'Data Steward Email',
            noteEnd2: ' fields are restored',
            id: '210594',
          },
        ],
      },
      {
        status: 'Fixed',
        rows: [
          {
            note: 'When importing or promoting a source entity, the ',
            strong: 'Merge and save',
            noteEnd: ' option no longer updates an entity\'s ',
            strong2: 'Last Modified',
            noteEnd2: ' date when structural changes are applied',
            id: '250208',
          },
        ],
      },
    ],
  },
];

function Logo() {
  return (
    <div className={styles.logo}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <circle cx="11" cy="3" r="3" className={styles.logoDotA} />
        <circle cx="19" cy="11" r="3" className={styles.logoDotB} />
        <circle cx="11" cy="19" r="3" className={styles.logoDotC} />
        <circle cx="3" cy="11" r="3" className={styles.logoDotD} />
      </svg>
      <span className={styles.logoWordmark}>Data Organization</span>
      <span className={styles.logoDivider} />
      <span className={styles.logoCommunity}>Community</span>
    </div>
  );
}

function NavNode({ node, depth }) {
  const style = { paddingLeft: 14 + depth * 18 };
  return (
    <li>
      <div className={styles.navItem} style={style}>
        <span className={[styles.navRow, node.active ? styles.navRowActive : ''].join(' ')}>
          <span className={styles.navCaret} aria-hidden="true">
            {(node.children || node.hasChildren) ? (node.open ? '▾' : '▸') : ' '}
          </span>
          <span>{node.label}</span>
        </span>
      </div>
      {node.children && (
        <ul className={styles.navList}>
          {node.children.map((child) => (
            <NavNode key={child.label} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

// A row's note can bold any number of phrases within the sentence: 'strong'
// + 'noteEnd' is the first bolded phrase and the plain text after it, then
// 'strong2'/'noteEnd2', 'strong3'/'noteEnd3', and so on for as many as the
// sentence needs - just keep numbering new strong/noteEnd pairs upward.
function emphasisPairs(row) {
  const pairs = [];
  for (let n = 1; n <= 10; n++) {
    const suffix = n === 1 ? '' : String(n);
    const strongKey = `strong${suffix}`;
    const endKey = `noteEnd${suffix}`;
    if (row[strongKey] === undefined && row[endKey] === undefined) break;
    pairs.push({ strong: row[strongKey], end: row[endKey] });
  }
  return pairs;
}

function ReleaseNoteRow({ row }) {
  return (
    <tr>
      <td className={styles.tdNote}>
        {row.note}
        {row.patch && <span className={styles.patchTag}>PATCH</span>}
        {emphasisPairs(row).map((pair, i) => (
          <React.Fragment key={i}>
            {pair.strong && <strong>{pair.strong}</strong>}
            {pair.end}
          </React.Fragment>
        ))}
        {row.detail && (
          <>
            {' | '}
            <span className={styles.detail}>Details:</span> {row.detail}
          </>
        )}
      </td>
      <td className={styles.tdId}>{row.id}</td>
    </tr>
  );
}

export function ReleaseNotesWikiMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.page}>
        {/* ---------- Top bar ---------- */}
        <div className={styles.topbar}>
          <Logo />
          <div className={styles.topbarIcons}>
            <span>⚡</span>
            <span>💬</span>
            <span>❕</span>
            <span className={styles.avatar}>M</span>
          </div>
        </div>

        {/* ---------- Section banner ---------- */}
        <div className={styles.banner}>
          <div className={styles.crumbs}>
            <span className={styles.crumbBold}>DataApp Apps and Services</span>
            <span className={styles.crumbSep}>&gt;</span>
            <span>Releases</span>
            <span className={styles.crumbMenu}>▾ More</span>
          </div>
          <button type="button" className={styles.newButton}>+ New</button>
        </div>

        <div className={styles.body}>
          {/* ---------- Sidebar ---------- */}
          <nav className={styles.sidebar}>
            <ul className={styles.navList}>
              {NAV_TREE.map((node) => (
                <NavNode key={node.label} node={node} depth={0} />
              ))}
            </ul>

            <button type="button" className={styles.sideButton}>Turn Page notifications off</button>
            <button type="button" className={styles.sideButton}>Bookmark this wiki</button>

            <div className={styles.linksPanel}>
              <div className={styles.linksPanelTitle}>DataApp Links</div>
              {WIKI_LINKS.map((link) => (
                <div className={styles.linkRow} key={link.title}>
                  <span className={styles.linkIcon} aria-hidden="true">{link.icon}</span>
                  <div>
                    <div className={styles.linkTitle}>{link.title}</div>
                    <div className={styles.linkDesc}>{link.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* ---------- Main content ---------- */}
          <main className={styles.main}>
            <h1 className={styles.pageTitle}>DataApp 20.3: Release notes and patches</h1>
            <p className={styles.pageHint}></p>

            <ul className={styles.dateIndex}>
              {RELEASE_INDEX.map((d) => (
                <li key={d}>
                  <a href="#release-detail" className={styles.dateLink}>{d}</a>
                </li>
              ))}
            </ul>

            <hr className={styles.sectionRule} />

            {/* ---------- Detail view the reader has scrolled/jumped into ---------- */}
            <div id="release-detail" className={styles.detail}>
              <h2 className={styles.detailDate}>{RELEASE_DATE}</h2>
              <p className={styles.sprint}>{RELEASE_SPRINT}</p>

              <ul className={styles.versionList}>
                {RELEASE_VERSIONS.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>

              <p className={styles.compatNote}>
                Notes apply to both SQL Server 2019 and 2016 versions unless specified otherwise.
                See the <span className={styles.linkText}>Compatibility matrix</span> for versions of DataApp components.
              </p>

              {RELEASE_SECTIONS.map((section) => (
                <div className={styles.productSection} key={section.product}>
                  <h3 className={styles.productHeading}>{section.product}</h3>
                  {section.groups.map((group) => (
                    <div className={styles.statusGroup} key={group.status}>
                      <div className={styles.statusHeading}>{group.status}</div>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th className={styles.thNote}>Release note</th>
                            <th className={styles.thId}>ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((row) => (
                            <ReleaseNoteRow key={row.id} row={row} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <figcaption className={styles.caption}>
      </figcaption>
    </figure>
  );
}
