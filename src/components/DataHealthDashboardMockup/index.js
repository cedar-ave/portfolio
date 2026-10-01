import React from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Org-wide health check dashboard, listing records with open issues.
   This is a genericized, made-up layout illustrating the concept for
   /portfolio/release-notes - it does not reproduce any real product UI.
   Row data lives in the ROWS array below; edit it directly to relabel
   or resize the mockup (the row count flows into the table height).
   ===================================================================== */

const ROWS = [
  { name: 'Amara Chukwu', id: 'REC-48213', issues: 3, nextRefresh: 'Nov 12, 2026', lastChecked: 'Sep 28, 2026' },
  { name: 'Liu Wei', id: 'REC-77029', issues: 1, nextRefresh: 'Dec 3, 2026', lastChecked: 'Sep 27, 2026' },
  { name: 'Priya Natarajan', id: 'REC-19284', issues: 2, nextRefresh: 'Oct 29, 2026', lastChecked: 'Sep 26, 2026' },
  { name: 'Oleksandr Melnyk', id: 'REC-63510', issues: 4, nextRefresh: 'Nov 5, 2026', lastChecked: 'Sep 28, 2026' },
  { name: 'Fatima Al-Sayed', id: 'REC-30877', issues: 1, nextRefresh: 'Jan 14, 2027', lastChecked: 'Sep 25, 2026' },
  { name: 'Noah Andersson', id: 'REC-95142', issues: 2, nextRefresh: 'Oct 22, 2026', lastChecked: 'Sep 28, 2026' },
];

const TABLE_TOP = 190;
const ROW_HEIGHT = 34;

// Column x-positions, spaced to leave room for the longest expected value
// in each column (e.g. "Oleksandr Melnyk", "Jan 14, 2027") before the next
// column starts - tune these together if you add/rename columns.
const COLS = {
  record: 28,
  id: 200,
  issues: 280,
  nextRefresh: 340,
  lastChecked: 440,
  review: 552,
};

// Small filled square with a checkmark, used as the header icon.
function HeaderIcon({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width={28} height={28} rx={7} className={styles.headerIconBg} />
      <path d={`M${x + 7},${y + 15} L${x + 12},${y + 20} L${x + 21},${y + 9}`} className={styles.headerIconMark} />
    </g>
  );
}

function SearchIcon({ x, y }) {
  return (
    <g className={styles.searchIcon}>
      <circle cx={x} cy={y} r={5} />
      <line x1={x + 3.5} y1={y + 3.5} x2={x + 8} y2={y + 8} />
    </g>
  );
}

function StatChip({ x, width, bgClass, textClass, children }) {
  return (
    <>
      <rect x={x} y={70} width={width} height={26} rx={13} className={bgClass} />
      <text x={x + width / 2} y={87} textAnchor="middle" className={textClass}>
        {children}
      </text>
    </>
  );
}

function IssueChip({ x, y, count }) {
  const high = count >= 3;
  return (
    <>
      <rect x={x} y={y} width={28} height={20} rx={10} className={high ? styles.issueChipHigh : styles.issueChipLow} />
      <text x={x + 14} y={y + 14} textAnchor="middle" className={high ? styles.issueChipHighText : styles.issueChipLowText}>
        {count}
      </text>
    </>
  );
}

function ReviewButton({ x, y }) {
  return (
    <>
      <rect x={x} y={y} width={56} height={20} rx={10} className={styles.reviewBtnBg} />
      <text x={x + 28} y={y + 14} textAnchor="middle" className={styles.reviewBtnText}>
        Review
      </text>
    </>
  );
}

export function DataHealthDashboardMockup() {
  const tableBottom = TABLE_TOP + ROW_HEIGHT * ROWS.length;
  const footerY = tableBottom + 24;

  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox="0 0 640 444"
          role="img"
          aria-labelledby="dhd-t dhd-d">
          <title id="dhd-t">Data Health Check Dashboard, listing records with open issues</title>
          <desc id="dhd-d">
            A mockup of an org-wide health check dashboard. A header reads
            Data Health Check Dashboard, with stat chips for total records,
            records needing review, and records scheduled today. Below a
            search bar, a table lists six records with their ID, issue
            count, next refresh date, last checked date, and a Review
            button, followed by a pagination summary.
          </desc>

          {/* Card frame */}
          <rect x={8} y={8} width={624} height={424} rx={10} className={styles.card} />

          {/* ---------- Header ---------- */}
          <HeaderIcon x={28} y={20} />
          <text x={68} y={34} className={styles.title}>
            Data Health Check Dashboard
          </text>
          <text x={68} y={52} className={styles.subtitle}>
            Org-wide view of records with open issues
          </text>

          {/* ---------- Stat chips ---------- */}
          <StatChip x={28} width={110} bgClass={styles.statChipBg} textClass={styles.statChipText}>
            182 records
          </StatChip>
          <StatChip x={150} width={130} bgClass={styles.statChipBgAmber} textClass={styles.statChipTextAmber}>
            24 need review
          </StatChip>
          <StatChip x={292} width={150} bgClass={styles.statChipBgAccent} textClass={styles.statChipTextAccent}>
            6 scheduled today
          </StatChip>

          {/* ---------- Search + filter ---------- */}
          <rect x={28} y={108} width={360} height={32} rx={6} className={styles.searchBg} />
          <SearchIcon x={46} y={124} />
          <text x={60} y={128} className={styles.searchText}>
            Search by name or ID
          </text>
          <rect x={560} y={108} width={52} height={32} rx={6} className={styles.statChipBg} />
          <text x={586} y={128} textAnchor="middle" className={styles.statChipText}>
            Filter
          </text>

          {/* ---------- Column headers ---------- */}
          <text x={COLS.record} y={176} className={styles.colHeader}>Record</text>
          <text x={COLS.id} y={176} className={styles.colHeader}>ID</text>
          <text x={COLS.issues} y={176} className={styles.colHeader}>Issues</text>
          <text x={COLS.nextRefresh} y={176} className={styles.colHeader}>Next Refresh</text>
          <text x={COLS.lastChecked} y={176} className={styles.colHeader}>Last Checked</text>
          <line x1={28} y1={184} x2={612} y2={184} className={styles.divider} />

          {/* ---------- Rows ---------- */}
          {ROWS.map((row, i) => {
            const rowTop = TABLE_TOP + ROW_HEIGHT * i;
            const baseline = rowTop + 22;
            return (
              <g key={row.id}>
                {i % 2 === 1 && (
                  <rect x={16} y={rowTop} width={608} height={ROW_HEIGHT} className={styles.rowAlt} />
                )}
                <text x={COLS.record} y={baseline} className={styles.recordLink}>{row.name}</text>
                <text x={COLS.id} y={baseline} className={styles.cellTextMuted}>{row.id}</text>
                <IssueChip x={COLS.issues} y={rowTop + 7} count={row.issues} />
                <text x={COLS.nextRefresh} y={baseline} className={styles.cellText}>{row.nextRefresh}</text>
                <text x={COLS.lastChecked} y={baseline} className={styles.cellText}>{row.lastChecked}</text>
                <ReviewButton x={COLS.review} y={rowTop + 7} />
              </g>
            );
          })}
          <line x1={28} y1={tableBottom} x2={612} y2={tableBottom} className={styles.divider} />

          {/* ---------- Footer ---------- */}
          <text x={320} y={footerY} textAnchor="middle" className={styles.footerText}>
            Showing {ROWS.length} of 182 · Page 1 of 31
          </text>
        </svg>
      </div>
      <figcaption className={styles.caption}></figcaption>
    </figure>
  );
}
