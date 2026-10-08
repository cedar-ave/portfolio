import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/* =====================================================================
   Diagrams for samples/contributor-guide, the sample docs-as-code
   contributor guide. Built as plain HTML/CSS rather than screenshots or
   traced SVG art, so labels stay real text and colors follow the site's
   light/dark theme (see styles.module.css), matching the convention used
   in ClearpathCollectMockups and RosterUploadDiagrams.
   ===================================================================== */

function Figure({ children, caption }) {
  return (
    <figure className={clsx(styles.diagram)}>
      {children}
      {caption && <p className={styles.caption}>{caption}</p>}
    </figure>
  );
}

/* ---------- Edit this page footer link ---------- */

export function EditPageFooter() {
  return (
    <Figure caption="The footer shown at the bottom of a published docs page.">
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={styles.noteTag}>&#9998; Edit this page</span>
          <span className={styles.noteTag}>Contributor guide</span>
        </div>
      </div>
    </Figure>
  );
}

/* ---------- Clean merge vs. merge conflict ---------- */

export function MergeScenarios() {
  return (
    <Figure caption="Two people editing different docs merge cleanly. Editing the same lines surfaces a conflict to resolve before the pull request can complete.">
      <div className={styles.scenarioGrid}>
        <div className={styles.scenario}>
          <p className={styles.scenarioTitle}>No conflict</p>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotMain)} /> main
          </div>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotA)} /> branch A edits page-1.md
          </div>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotB)} /> branch B edits page-2.md
          </div>
          <p className={styles.mergeOk}>Both merge into main automatically.</p>
        </div>
        <div className={styles.scenario}>
          <p className={styles.scenarioTitle}>Conflict</p>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotMain)} /> main
          </div>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotA)} /> branch A edits page-1.md, line 12
          </div>
          <div className={styles.branchRow}>
            <span className={clsx(styles.branchDot, styles.dotB)} /> branch B edits page-1.md, line 12
          </div>
          <p className={styles.mergeConflict}>Second merge needs manual resolution.</p>
        </div>
      </div>
    </Figure>
  );
}

/* ---------- Build/publish pipeline status legend ---------- */

export function PipelineStatusLegend() {
  return (
    <Figure caption="Status badges shown for each step of a build in progress.">
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={clsx(styles.badge, styles.badgeRunning)}>&#8635;</span>
          In progress
        </div>
        <div className={styles.legendRow}>
          <span className={clsx(styles.badge, styles.badgeOk)}>&#10003;</span>
          Completed successfully
        </div>
        <div className={styles.legendRow}>
          <span className={clsx(styles.badge, styles.badgeFail)}>&times;</span>
          Failed, click the step to see why
        </div>
        <div className={styles.legendRow}>
          <span className={clsx(styles.badge, styles.badgeSkip)}>&raquo;</span>
          Skipped, or used to branch to the next step
        </div>
      </div>
    </Figure>
  );
}

/* ---------- Site chrome / metadata map ---------- */

const METADATA_ITEMS = [
  { label: 'Main navigation', note: 'Set once for the theme; not per-site.' },
  { label: 'Developer menu', note: 'Toggle on or off per site.' },
  { label: 'Help menu', note: 'Icon is fixed; its links point to this guide and the help channel.' },
  { label: 'Version menu', note: 'Toggle on or off; populated by a small per-site script.' },
  { label: 'Home link', note: 'Always on; points at the site’s own landing page.' },
  { label: 'Affix (side) menu', note: 'Toggle globally or per page.' },
  { label: 'Feedback form', note: 'Toggle globally or per page.' },
  { label: 'Contributor links', note: 'Edit this page + a link to this guide, in the footer.' },
];

export function MetadataMap() {
  return (
    <Figure caption="Chrome controlled by per-site metadata, in the order it appears on a page.">
      <div className={styles.metadataMap}>
        {METADATA_ITEMS.map((item, i) => (
          <React.Fragment key={item.label}>
            <span className={styles.metadataNum}>{i + 1}</span>
            <span className={styles.metadataItem}>
              <strong>{item.label}</strong>
              <span>{item.note}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </Figure>
  );
}

/* ---------- Anatomy of a release note ---------- */

export function NoteAnatomy() {
  return (
    <Figure caption="The same work item produces a different style of note depending on its type.">
      <div className={styles.noteCard}>
        <span className={clsx(styles.noteKind, styles.noteKindNew)}>What&rsquo;s new</span>
        <p className={styles.noteText}>
          Compare two source mart versions side by side before promoting a change.
          <span className={styles.noteTag}>complete sentence</span>
          <span className={styles.noteTag}>present tense</span>
        </p>
      </div>
      <div className={styles.noteCard}>
        <span className={clsx(styles.noteKind, styles.noteKindFixed)}>Fixed bug</span>
        <p className={styles.noteText}>
          Forge Service returns an error when refreshing a large data mart
          <span className={styles.noteTag}>worded as if still broken</span>
          <span className={styles.noteTag}>terse, no period</span>
        </p>
      </div>
    </Figure>
  );
}

/* ---------- Work item fields to published note ---------- */

export function WorkItemFlow() {
  return (
    <Figure caption="How a work item's type, state, and severity decide where its note lands.">
      <div className={styles.flowGrid}>
        <div className={styles.flowBox}>
          <strong>Feature / backlog item</strong>
          Closed
        </div>
        <span className={styles.flowArrow}>&rarr;</span>
        <div className={clsx(styles.flowBox, styles.flowDest)}>
          <strong>What&rsquo;s new</strong>
        </div>
      </div>
      <div className={styles.flowGrid} style={{ marginTop: '0.6rem' }}>
        <div className={styles.flowBox}>
          <strong>Bug</strong>
          Closed
        </div>
        <span className={styles.flowArrow}>&rarr;</span>
        <div className={clsx(styles.flowBox, styles.flowDest)}>
          <strong>Fixed bug</strong>
        </div>
      </div>
      <div className={styles.flowGrid} style={{ marginTop: '0.6rem' }}>
        <div className={styles.flowBox}>
          <strong>Bug</strong>
          Still open
        </div>
        <span className={styles.flowArrow}>&rarr;</span>
        <div className={clsx(styles.flowBox, styles.flowDest)}>
          <strong>Known issue</strong>
        </div>
      </div>
      <div className={styles.flowGrid} style={{ marginTop: '0.6rem' }}>
        <div className={styles.flowBox}>
          <strong>Bug</strong>
          Critical or high severity
        </div>
        <span className={styles.flowArrow}>&rarr;</span>
        <div className={clsx(styles.flowBox, styles.flowDest)}>
          <strong>Critical/high bug report</strong>
        </div>
      </div>
    </Figure>
  );
}
