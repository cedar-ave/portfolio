import React from 'react';
import styles from './styles.module.css';

/* Diagrams for samples/technical-marketing/intake-mart-designer.mdx. Built
   as SVG (not screenshots) so the diagrams stay genericized and the colors
   follow the site's light/dark theme - see the style notes in
   RosterUploadDiagrams and DataHealthDashboardMockup, which this follows. */

function Figure({ titleId, title, desc, viewBox, caption, children }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox={viewBox}
          role="img"
          aria-labelledby={`${titleId}-t ${titleId}-d`}>
          <title id={`${titleId}-t`}>{title}</title>
          <desc id={`${titleId}-d`}>{desc}</desc>
          {children}
        </svg>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/* =====================================================================
   1. The metadata flow: collect, map, and store - feeding a single
      metadata repository.
   ===================================================================== */

const STEPS = [
  {
    key: 'collect',
    lines: ['Collect source', 'system metadata'],
    tag: 'Automated',
    tone: 'teal',
    icon: (cx, cy) => (
      <>
        <path d={`M${cx},${cy - 9} v12`} />
        <path d={`M${cx - 6},${cy - 3} l6,6 l6,-6`} />
        <path d={`M${cx - 9},${cy + 9} h18`} />
      </>
    ),
  },
  {
    key: 'map',
    lines: ['Map into Clearpath', 'architecture'],
    tag: 'Semi-automated',
    tone: 'gold',
    icon: (cx, cy) => (
      <>
        <path d={`M${cx - 8},${cy - 4} h12 l-4,-4`} />
        <path d={`M${cx + 8},${cy + 4} h-12 l4,4`} />
      </>
    ),
  },
  {
    key: 'store',
    lines: ['Store metadata'],
    tag: 'Automated',
    tone: 'teal',
    icon: (cx, cy) => (
      <>
        <ellipse cx={cx} cy={cy - 6} rx="9" ry="3" />
        <path d={`M${cx - 9},${cy - 6} v10 a9,3 0 0 0 18,0 v-10`} />
      </>
    ),
  },
];

const ROW_Y = 30;
const CARD_H = 148;
const CARD_W = 148;
const CARD_GAP = 20;
const CARD_XS = [32, 32 + CARD_W + CARD_GAP, 32 + (CARD_W + CARD_GAP) * 2];

export function MetadataFlowDiagram() {
  return (
    <Figure
      titleId="im-flow"
      title="Metadata flow: collect, map, and store"
      desc="A three-step flow: collect source system metadata (automated), map it into the Clearpath architecture (semi-automated), and store the metadata (automated). An arrow leads from the third step into the Clearpath Metadata Repository."
      viewBox="0 0 780 220">
      <rect width="780" height="220" className={styles.page} />
      <rect x="12" y="20" width="756" height="188" rx="16" className={styles.cardShadow} />
      <rect x="8" y="8" width="756" height="188" rx="16" className={styles.windowCard} />

      <defs>
        <marker id="im-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" style={{ fill: 'var(--im-blue)' }} />
        </marker>
        <linearGradient id="im-repo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className={styles.repoGradientStart} />
          <stop offset="100%" className={styles.repoGradientEnd} />
        </linearGradient>
      </defs>

      {STEPS.map((step, i) => {
        const x = CARD_XS[i];
        const cx = x + CARD_W / 2;
        const iconCy = ROW_Y + 34;
        const chipClass = step.tone === 'teal' ? styles.chipTeal : styles.chipGold;
        const chipTextClass = step.tone === 'teal' ? styles.chipTealText : styles.chipGoldText;
        const iconClass = step.tone === 'teal' ? styles.stepIconOnTeal : styles.stepIconOnGold;
        return (
          <g key={step.key}>
            <rect x={x} y={ROW_Y} width={CARD_W} height={CARD_H} rx="12" className={styles.stepCard} />
            <circle cx={cx} cy={iconCy} r="22" className={chipClass} />
            <g className={`${styles.stepIcon} ${iconClass}`}>{step.icon(cx, iconCy)}</g>
            {step.lines.map((line, li) => (
              <text
                key={line}
                x={cx}
                y={iconCy + 38 + li * 16}
                textAnchor="middle"
                className={styles.stepLabel}>
                {line}
              </text>
            ))}
            <rect
              x={x + (CARD_W - 112) / 2}
              y={ROW_Y + CARD_H - 34}
              width="112"
              height="22"
              rx="11"
              className={chipClass}
            />
            <text
              x={cx}
              y={ROW_Y + CARD_H - 19}
              textAnchor="middle"
              className={chipTextClass}>
              {step.tag}
            </text>
            {i < STEPS.length - 1 && (
              <path
                d={`M${x + CARD_W + 2},${iconCy} L${x + CARD_W + CARD_GAP - 2},${iconCy}`}
                className={styles.flowArrow}
                markerEnd="url(#im-flow-arrow)"
              />
            )}
          </g>
        );
      })}

      {/* Arrow from the last step into the repository */}
      <path
        d={`M${CARD_XS[2] + CARD_W + 2},${ROW_Y + 34} L560,${ROW_Y + 34}`}
        className={styles.flowArrow}
        markerEnd="url(#im-flow-arrow)"
      />

      {/* Repository cylinder */}
      <g>
        <ellipse cx="645" cy="192" rx="85" ry="14" className={styles.cardShadow} />
        <path
          d="M560,42 C560,33.6 598.1,27 645,27 C691.9,27 730,33.6 730,42 L730,164 C730,172.4 691.9,179 645,179 C598.1,179 560,172.4 560,164 Z"
          fill="url(#im-repo-grad)"
        />
        <ellipse cx="645" cy="42" rx="85" ry="14" className={styles.repoTopFill} />
        <path d="M560,42 C560,50.4 598.1,57 645,57 C691.9,57 730,50.4 730,42" fill="none" stroke="rgba(255,255,255,0.35)" />

        <g transform="translate(645,80)" className={styles.repoIcon}>
          <ellipse cx="0" cy="0" rx="15" ry="4" />
          <path d="M-15,0 v16 a15,4 0 0 0 30,0 v-16" />
          <path d="M-15,8 a15,4 0 0 0 30,0" />
        </g>
        <text x="645" y="118" textAnchor="middle" className={styles.repoLabel}>Clearpath Metadata</text>
        <text x="645" y="136" textAnchor="middle" className={styles.repoLabel}>Repository</text>
      </g>
    </Figure>
  );
}

/* =====================================================================
   2. A generic field-mapping grid: source columns mapped to destination
      columns, with type, nullability, and sensitivity alongside each row.
   ===================================================================== */

const TOOLBAR_ITEMS = ['New source', 'Connections', 'Compare', 'Document', 'Spell check', 'Advanced'];

const COL_X = [28, 190, 330, 470, 610, 684];
const COL_HEADERS = ['Source column', 'Source type', 'Destination column', 'Destination type', 'Null?', 'Sensitivity'];

const GRID_ROWS = [
  { source: 'PersonID', sourceType: 'int', dest: 'PersonID', destType: 'numeric(38,0)', nullable: false, sensitivity: 'none' },
  { source: 'AddressLine1', sourceType: 'varchar(60)', dest: 'AddressLine1', destType: 'varchar(60)', nullable: true, sensitivity: 'pii' },
  { source: 'City', sourceType: 'varchar(30)', dest: 'City', destType: 'varchar(30)', nullable: true, sensitivity: 'none' },
  { source: 'StateProvinceID', sourceType: 'int', dest: 'StateProvinceID', destType: 'numeric(38,0)', nullable: true, sensitivity: 'none' },
  { source: 'PostalCode', sourceType: 'varchar(15)', dest: 'PostalCode', destType: 'varchar(15)', nullable: true, sensitivity: 'none' },
  { source: 'ModifiedDate', sourceType: 'datetime', dest: 'ModifiedDate', destType: 'datetime', nullable: true, sensitivity: 'none' },
];

const ROW_H = 34;
const HEADER_Y = 130;
const FIRST_ROW_Y = HEADER_Y + 28;

function NullMark({ x, y, yes }) {
  return yes ? (
    <path d={`M${x - 5},${y} l4,4 l6,-8`} className={styles.checkYes} />
  ) : (
    <path d={`M${x - 5},${y} h10`} className={styles.checkNo} />
  );
}

function SensitivityChip({ x, y, pii }) {
  const w = 60;
  return (
    <>
      <rect x={x} y={y - 13} width={w} height="18" rx="9" className={pii ? styles.chipPii : styles.chipNone} />
      <text x={x + w / 2} y={y} textAnchor="middle" className={pii ? styles.chipPiiText : styles.chipNoneText}>
        {pii ? 'PII' : 'None'}
      </text>
    </>
  );
}

export function MappingInterfaceMockup() {
  const tableBottom = FIRST_ROW_Y + GRID_ROWS.length * ROW_H;
  const cardH = tableBottom - 8 + 16;

  return (
    <Figure
      titleId="im-grid"
      title="Field-mapping grid for the Person source table"
      desc="A field-mapping interface. A toolbar offers New source, Connections, Compare, Document, Spell check, and Advanced actions. Below, a grid maps the Person table's columns - PersonID, AddressLine1, City, StateProvinceID, PostalCode, and ModifiedDate - from their source column and type to a destination column and type, with a Null indicator and a sensitivity badge (None or PII) for each row."
      viewBox={`0 0 780 ${cardH + 40}`}
      caption="Intake Mart Designer's easy-to-use interface helps data analysts maintain enterprise-wide consistency.">
      <rect width="780" height={cardH + 40} className={styles.page} />
      <rect x="12" y="20" width="756" height={cardH} rx="16" className={styles.cardShadow} />

      <defs>
        <clipPath id="im-grid-clip">
          <rect x="8" y="8" width="756" height={cardH} rx="16" />
        </clipPath>
      </defs>

      <g clipPath="url(#im-grid-clip)">
        <rect x="8" y="8" width="756" height={cardH} className={styles.windowCard} />

        {/* Navbar */}
        <rect x="8" y="8" width="756" height="40" className={styles.navbarBg} />
        <rect x="28" y="20" width="16" height="16" rx="4" className={styles.navbarLogo} />
        <text x="52" y="33" className={styles.navbarTitle}>Clearpath</text>
        <text x="750" y="33" textAnchor="end" className={styles.navbarCrumb}>
          Data acquisition &#8250; Intake Mart Designer
        </text>

        {/* Toolbar */}
        <rect x="8" y="48" width="756" height="46" className={styles.toolbarBg} />
        {TOOLBAR_ITEMS.map((label, i) => {
          const x = 28 + i * 124;
          const cy = 71;
          return (
            <g key={label}>
              <rect x={x} y="60" width="112" height="22" rx="6" className={styles.toolbarBtn} />
              <path d={`M${x + 14},${cy - 4} v8 M${x + 10},${cy} h8`} className={styles.toolbarIcon} />
              <text x={x + 26} y={cy + 4} className={styles.toolbarText}>{label}</text>
            </g>
          );
        })}
        <line x1="8" y1="94" x2="764" y2="94" className={styles.toolbarDivider} />

        {/* Table title */}
        <text x="28" y="118" className={styles.tableTitle}>Person</text>
        <rect x="76" y="104" width="92" height="20" rx="10" className={styles.tableBadge} />
        <text x="122" y="118" textAnchor="middle" className={styles.tableBadgeText}>6 columns</text>

        {/* Column headers */}
        <rect x="8" y={HEADER_Y} width="756" height="28" className={styles.colHeaderBg} />
        {COL_HEADERS.map((label, i) => (
          <text key={label} x={COL_X[i]} y={HEADER_Y + 19} className={styles.colHeaderText}>{label}</text>
        ))}

        {/* Rows */}
        {GRID_ROWS.map((row, r) => {
          const y = FIRST_ROW_Y + r * ROW_H;
          const textY = y + 21;
          return (
            <g key={row.source}>
              <rect x="8" y={y} width="756" height={ROW_H} className={r % 2 === 1 ? styles.rowAlt : styles.rowBase} />
              <text x={COL_X[0]} y={textY} className={styles.cellText}>{row.source}</text>
              <text x={COL_X[1]} y={textY} className={styles.cellMuted}>{row.sourceType}</text>
              <text x={COL_X[2]} y={textY} className={styles.cellText}>{row.dest}</text>
              <text x={COL_X[3]} y={textY} className={styles.cellMuted}>{row.destType}</text>
              <NullMark x={COL_X[4] + 10} y={textY - 4} yes={row.nullable} />
              <SensitivityChip x={COL_X[5]} y={textY} pii={row.sensitivity === 'pii'} />
            </g>
          );
        })}
      </g>
      <rect x="8" y="8" width="756" height={cardH} rx="16" className={styles.stepCard} style={{ fill: 'none' }} />
    </Figure>
  );
}
