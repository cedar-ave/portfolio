import React from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Mockup of a developer-facing API changelog page for /portfolio/release-notes.
   Combines six source screenshots of dated changelog entries into one
   fluid scroll, as if the reader had opened the page and scrolled through
   several months of API updates. A left-hand version index sits beside the
   stacked entries, the way most API-reference changelog pages are laid out.

   Every string below is plain JS/JSX text - edit any of it directly to
   relabel the mockup. ENTRIES is the easiest place to add or change
   content; each entry is one dated release with 'added' and/or 'fixed'
   groups of items.
   ===================================================================== */

// A single changelog item's body can mix plain text with inline code spans
// (endpoint paths, field names) and doc-page references, by alternating
// plain strings with { code: '...' } or { link: '...' } objects in the
// `parts` array. A `link` part is styled to look like a link (matching the
// "Compatibility matrix" treatment in the sprint-aligned release notes
// mockup) but isn't a real, clickable link.
function Body({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : part.link ? (
          <span key={i} className="mockLinkText">{part.link}</span>
        ) : (
          <code key={i} className={styles.inlineCode}>{part.code}</code>
        )
      )}
    </>
  );
}

const ENTRIES = [
  {
    date: 'September 2, 2026',
    version: '27.2.0',
    groups: [
      {
        status: 'added',
        items: [
          {
            title: 'New endpoint added for classification codes',
            body: [
              'A new ',
              { code: '/classifications' },
              ' endpoint for International Standard Classification Council (ISCC) classification codes lets you search and retrieve classification information including code, grouping, category, specialization, and section. See ',
              { link: 'List ISCC classifications' },
              '.',
            ],
          },
          {
            title: 'New endpoint added for classification groups',
            body: [
              'A new ',
              { code: '/classifications/groups' },
              ' endpoint for ISCC classification groups shows you a list of available grouping values that can be used for record categorization and filtering. It uses a 1-hour memory cache and a filtering pattern for optimal performance. See ',
              { link: 'List ISCC classification groups' },
              '.',
            ],
          },
          {
            title: "New endpoints added for record specializations",
            body: [
              'New endpoints are added for a record’s specializations on the ',
              { code: '/records' },
              ' endpoint. Each specialization has a unique ID (GUID). Record ownership is verified and event logging occurs for all operations. Sync notifications are also triggered.',
            ],
            bullets: [
              [{ code: 'POST /records/{recordId}/info/specializations' }, ': Create and list record specializations'],
              [{ code: 'GET /records/{recordId}/info/specializations' }, ': Get a record specialization'],
              [{ code: 'PATCH /records/{recordId}/info/specializations/{id}' }, ': Update a record specialization'],
              [{ code: 'DELETE /records/{recordId}/info/specializations/{id}' }, ': Delete a record specialization'],
            ],
          },
          {
            title: "Endpoints for a record's verifications now support classification IDs",
            body: [
              'Classification support is added to existing verification endpoints by introducing a ',
              { code: 'classificationId' },
              ' field (a single GUID) that references ISCC classification codes. This allows verifications to be linked to standardized ISCC specialization classifications for better categorization. The existing specialization string field remains for backward compatibility.',
            ],
            bullets: [
              [{ code: 'POST /records/{recordId}/info/verifications' }, ': Allows a ', { code: 'classificationId' }, ' field to be included'],
              [{ code: 'PATCH /records/{recordId}/info/verifications/{id}' }, ': Allows a ', { code: 'classificationId' }, ' field to be included'],
              [{ code: 'GET /records/{recordId}/info/verifications/{id}' }, ': Returns a ', { code: 'classificationId' }, ' in the response'],
              [{ code: 'GET /records/{recordId}/info/verifications' }, ': Returns a ', { code: 'classificationId' }, ' in the response'],
            ],
          },
        ],
      },
    ],
  },
  {
    date: 'July 22, 2026',
    version: '26.13.0',
    groups: [
      {
        status: 'added',
        items: [
          {
            title: 'Site hierarchy changes now supported via API when there are no shared accounts',
            body: [
              'The ',
              { code: 'PATCH /sites/{id}' },
              ' endpoint now accepts re-parenting operations for sites that do not share account sources with their new parent. Two operations are now supported:',
            ],
            bullets: [
              ['Assigning a new top-level parent site'],
              ['Removing an existing parent (making a site top-level)'],
            ],
            trailer: ['Both operations enforce pre-flight validation and automatically trigger a CRM sync notification on success.'],
          },
          {
            title: 'RequestType schema endpoint now returns display labels',
            body: [
              { code: 'GET /schemas/RequestType' },
              ' now returns a description field alongside each enum value (',
              { code: 'New' },
              ', ',
              { code: 'Renewal' },
              ', ',
              { code: 'Expedited' },
              '), consistent with other schema endpoints such as ',
              { code: 'GET /schemas/age' },
              '. Use the description field for human-readable display in your integration.',
            ],
          },
        ],
      },
      {
        status: 'fixed',
        items: [
          {
            title: 'History address validation now returns a clear error for invalid country codes',
            body: [
              'If ',
              { code: 'countryId' },
              ' is not a recognized value when creating or updating history data for a record using the ',
              { code: '/records/{recordId}/info/history' },
              ' endpoint, the API now returns a descriptive validation message instead of the generic ',
              { code: "The specified condition was not met for 'Country Id'" },
              ' error.',
            ],
          },
        ],
      },
    ],
  },
  {
    date: 'July 15, 2026',
    version: '26.12.0',
    groups: [
      {
        status: 'added',
        items: [
          {
            title: 'Improved email validation for records and sites',
            body: [
              'The platform now enforces email address validation when creating or updating records, sites, and users via the API. Previously, malformed email addresses could be saved without error, which could cause downstream failures.',
            ],
            trailer: [
              'With this fix, any request that includes an invalid email address will be rejected at the API level with a clear error, preventing bad data from entering the system in the first place.',
            ],
            trailer2: [
              'If your integration submits email addresses via the API, make sure they are properly formatted (e.g., ',
              { code: 'name@domain.com' },
              '). Requests with invalid emails will now return a validation error rather than a 201 success response.',
            ],
            bulletsLabel: 'Affected endpoints',
            bullets2: [
              [{ code: 'POST/PUT /records' }],
              [{ code: 'POST/PUT /records/{recordId}/info/emails' }],
              [{ code: 'POST/PUT /sites' }, ' (', { code: 'contactEmail' }, ' field)'],
            ],
          },
        ],
      },
    ],
  },
  {
    date: 'July 8, 2026',
    version: '26.11.0',
    groups: [
      {
        status: 'added',
        items: [
          {
            title: ['Improved response time for ', { code: 'GET /scans' }, ' with large record sets'],
            body: [
              'The ',
              { code: 'GET /scans' },
              ' endpoint now returns results significantly faster for organizations with more than 500 data scans. Queries are now batched, reducing response latency.',
            ],
          },
        ],
      },
      {
        status: 'fixed',
        items: [
          {
            title: [{ code: 'POST /records/{recordId}/info/organizationAffiliations' }, ' returns incorrect error code for non-existent records'],
            body: [
              'When submitting an organization affiliation for a record ID that does not exist, the API was previously returning ',
              { code: '400 Bad Request' },
              ' with a field validation error (e.g., invalid email format) even though the record wasn’t found. The API now correctly returns ',
              { code: '404 Not Found' },
              ' in this case, ensuring error responses reflect the actual failure reason before payload validation runs. This affects all record info write endpoints that validate input before checking record existence.',
            ],
          },
          {
            title: ['Resolved intermittent 500 errors on ', { code: 'GET /entities/scans' }, ' under load'],
            body: [
              { code: 'GET /entities/scans' },
              ' was returning 500 errors with response times exceeding 15 seconds during periods of high traffic. The timeout issue is eliminated, improving reliability of this endpoint under load.',
            ],
          },
        ],
      },
    ],
  },
];

const STATUS_LABEL = { added: "What's new", fixed: 'Bug fixes' };

function EntryItem({ item }) {
  return (
    <div className={styles.item}>
      <h4 className={styles.itemTitle}>
        {Array.isArray(item.title) ? <Body parts={item.title} /> : item.title}
      </h4>
      <p className={styles.itemBody}><Body parts={item.body} /></p>
      {item.bullets && (
        <ul className={styles.itemBullets}>
          {item.bullets.map((parts, i) => (
            <li key={i}><Body parts={parts} /></li>
          ))}
        </ul>
      )}
      {item.trailer && <p className={styles.itemBody}><Body parts={item.trailer} /></p>}
      {item.trailer2 && <p className={styles.itemBody}><Body parts={item.trailer2} /></p>}
      {item.bulletsLabel && <div className={styles.bulletsLabel}>{item.bulletsLabel}</div>}
      {item.bullets2 && (
        <ul className={styles.itemBullets}>
          {item.bullets2.map((parts, i) => (
            <li key={i}><Body parts={parts} /></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ApiReleaseNotesMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.page}>
        <div className={styles.topbar}>
          <span className={styles.logoWordmark}>Platform API</span>
          <span className={styles.logoDivider} />
          <span className={styles.logoCommunity}>Changelog</span>
        </div>

        <div className={styles.body}>
          <nav className={styles.sidebar}>
            <div className={styles.sidebarLabel}>Releases</div>
            <ul className={styles.indexList}>
              {ENTRIES.map((entry) => (
                <li key={entry.version}>
                  <span className={styles.indexLink}>
                    <span className={styles.indexVersion}>{entry.version}</span>
                    <span className={styles.indexDate}>{entry.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <main className={styles.main}>
            {ENTRIES.map((entry, idx) => (
              <section className={styles.entry} key={entry.version}>
                <h2 className={styles.entryHeading}>
                  {entry.date} <span className={styles.entryVersion}>({entry.version})</span>
                </h2>
                {entry.groups.map((group) => (
                  <div className={styles.group} key={group.status}>
                    <h3 className={[styles.groupHeading, styles[`groupHeading_${group.status}`]].join(' ')}>
                      {STATUS_LABEL[group.status]}
                    </h3>
                    {group.items.map((item) => (
                      <EntryItem item={item} key={item.title} />
                    ))}
                  </div>
                ))}
                {idx < ENTRIES.length - 1 && <hr className={styles.entryRule} />}
              </section>
            ))}
          </main>
        </div>
      </div>
      <figcaption className={styles.caption}>
      </figcaption>
    </figure>
  );
}
