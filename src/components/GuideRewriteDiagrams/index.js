import React from 'react';
import styles from './styles.module.css';

/* Document-page mockups for /portfolio/guide-rewrite. Built as SVG so the
   wording stays easy to edit and colors follow the site's light/dark
   theme (see the convention note in RosterUploadDiagrams/index.js).

   Both pages reproduce the STRUCTURE and as much of the original PHRASING
   as possible from a real guide excerpt, with the company, product, and
   vendor names replaced by fictional ones ("Lumen Health" / "Lumen
   Analytics Platform" / "Anchor Point MultiMatch") and no logo, per the
   IMPORTANT note on the page. The sample patient data was already
   fictional placeholder data in the source guide; only the name was
   swapped so it isn't traceable to one specific vendor's published copy. */

const VIEW_W = 720;

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

// Renders a block of pre-wrapped lines (SVG text doesn't auto-wrap) starting
// at (x, y), one <tspan>-free <text> per line. Returns the y just below the
// last line so callers can chain the next block off of it.
function Lines({ x, y, lineH, lines, className }) {
  return (
    <>
      {lines.map((line, i) => (
        <text key={i} x={x} y={y + i * lineH} className={className}>
          {line}
        </text>
      ))}
    </>
  );
}
function linesEnd(y, count, lineH, gap = 0) {
  return y + count * lineH + gap;
}

/* =====================================================================
   After: not a redesigned version of the PDF or the Word draft — a
   different medium entirely. This is what the same content looks like
   published as a help-center article: navbar, breadcrumb, a sidebar nav
   tree in place of the guide's "you are here" table, a definition
   callout, and comparison cards (with match-status icons) in place of
   plain tables. Content stays close to the original wording; structure
   and presentation are invented for the medium.
   ===================================================================== */

// Small circular status icon used in each comparison-card row.
// 'exact' = solid match (green check), 'fuzzy'/'partial' = matched with a
// caveat (amber wave), 'none' = didn't factor into the match (gray dash).
function MatchIcon({ cx, cy, status }) {
  if (status === 'exact') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} className={styles.iconGoodBg} />
        <path d={`M${cx - 3.5} ${cy} l2.5 3 l5 -6`} className={styles.iconGoodMark} />
      </g>
    );
  }
  if (status === 'fuzzy' || status === 'partial') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} className={styles.iconWarnBg} />
        <path d={`M${cx - 4} ${cy} q2 -3 4 0 q2 3 4 0`} className={styles.iconWarnMark} />
      </g>
    );
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} className={styles.iconNeutralBg} />
      <line x1={cx - 3.5} y1={cy} x2={cx + 3.5} y2={cy} className={styles.iconNeutralMark} />
    </g>
  );
}

function Pill({ x, y, text, kind }) {
  const w = text.length * 5.6 + 22;
  return (
    <g>
      <rect x={x} y={y - 11} width={w} height={20} rx={10} className={kind === 'good' ? styles.pillGoodBg : styles.pillWarnBg} />
      <text x={x + w / 2} y={y + 3} textAnchor="middle" className={kind === 'good' ? styles.pillGoodText : styles.pillWarnText}>{text}</text>
    </g>
  );
}

// A two-record comparison card: a tinted header with a status pill, then
// one row per field with a match-status icon, a label, and each record's
// value. Returns { el, bottom } so the caller can stack what follows.
function ComparisonCard({ x, y, w, kind, badge, rows, note }) {
  const clipId = `gr-card-${kind}-${y}`;
  const headerH = 42;
  const pad = 16;
  const iconX = x + pad + 8;
  const labelX = x + pad + 26;
  const valueAX = x + pad + 130;
  const valueBX = x + (w - pad) / 2 + 40;
  const colHeadY = y + headerH + pad + 2;
  const firstRowY = colHeadY + 20;
  const rowH = 25;
  const rowsBottom = firstRowY + rows.length * rowH - rowH + 8;
  const noteLines = note;
  const noteY = rowsBottom + 20;
  const bottom = linesEnd(noteY, noteLines.length, 15, pad - 15 + 10);

  const el = (
    <g key={clipId}>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={w} height={bottom - y} rx={10} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x={x} y={y} width={w} height={bottom - y} className={styles.cardBg} />
        <rect x={x} y={y} width={w} height={headerH} className={kind === 'good' ? styles.cardHeaderGood : styles.cardHeaderWarn} />
      </g>
      <rect x={x} y={y} width={w} height={bottom - y} rx={10} className={styles.cardBg} style={{ fillOpacity: 0 }} />

      <text x={x + pad} y={y + headerH / 2 + 5} className={styles.cardHeaderTitle}>Are these the same patient?</text>
      <Pill x={x + w - pad - (badge.length * 5.6 + 22)} y={y + headerH / 2} text={badge} kind={kind} />

      <text x={valueAX} y={colHeadY} className={styles.colHead}>RECORD A</text>
      <text x={valueBX} y={colHeadY} className={styles.colHead}>RECORD B</text>

      {rows.map((row, i) => {
        const ry = firstRowY + i * rowH;
        return (
          <g key={i}>
            <MatchIcon cx={iconX} cy={ry - 4} status={row.match} />
            <text x={labelX} y={ry} className={styles.fieldLabel}>{row.label}</text>
            <text x={valueAX} y={ry} className={styles.fieldValue}>{row.a}</text>
            <text x={valueBX} y={ry} className={styles.fieldValue}>{row.b}</text>
            {i < rows.length - 1 && <line x1={x + pad} y1={ry + 8} x2={x + w - pad} y2={ry + 8} className={styles.cardRule} />}
          </g>
        );
      })}

      <line x1={x + pad} y1={rowsBottom + 2} x2={x + w - pad} y2={rowsBottom + 2} className={styles.cardRule} />
      <Lines x={x + pad} y={noteY} lineH={15} lines={noteLines} className={styles.cardFooterNote} />
    </g>
  );
  return { el, bottom };
}

const FIELD_ROWS_HIGH = [
  { label: 'Name', a: 'Dana Whitfield', b: 'Dana Whitfield', match: 'exact' },
  { label: 'Address', a: '382 Some St', b: '382 Some St', match: 'exact' },
  { label: 'City/state/ZIP', a: 'SomeCity, US 83921', b: 'SomeCity, US 83921-2521', match: 'exact' },
  { label: 'Phone', a: '555-12-1212', b: '555-12-1212', match: 'exact' },
  { label: 'Alt. phone', a: '(111) 235-3523', b: '(111) 938-3982', match: 'none' },
  { label: 'Date of birth', a: '2014-01-01', b: '2014-JAN-01', match: 'fuzzy' },
];
const FIELD_ROWS_LOW = [
  { label: 'Name', a: 'Dana Whitfield', b: 'Dana Whitfield', match: 'exact' },
  { label: 'Address', a: '3534 Generic Ave', b: '382 Some St', match: 'none' },
  { label: 'City/state/ZIP', a: 'SomeCity, US 83921', b: 'SomeCity, US 39823', match: 'partial' },
  { label: 'Phone', a: '832-893-8323', b: '555-12-1212', match: 'none' },
  { label: 'Alt. phone', a: '(111) 235-3523', b: '(111) 938-3982', match: 'none' },
  { label: 'Date of birth', a: '2014-12-31', b: '2014-01-01', match: 'none' },
];

export function GuideAfter() {
  const PAGE_X = 16;
  const PAGE_W = 688;
  const BODY_PAD = 24;
  const SIDEBAR_W = 150;
  const GUTTER = 24;
  const SIDEBAR_X = PAGE_X + BODY_PAD;
  const CX = SIDEBAR_X + SIDEBAR_W + GUTTER;
  const CW = PAGE_X + PAGE_W - BODY_PAD - CX;

  const NAVBAR_H = 48;
  const CRUMB_H = 34;
  const contentTop = NAVBAR_H + CRUMB_H + 30;

  // ---- sidebar: the guide family, in place of the PDF's roadmap table ----
  const sideEyebrowY = contentTop;
  let sy = sideEyebrowY + 2 * 11 + 20;
  const sideInstallY = sy; sy += 24;
  const sideTechRefY = sy; sy += 24;
  const sideConceptsY = sy; sy += 26;
  const sideOverviewY = sy; sy += 24;
  const sideDefinitionY = sy; sy += 20;
  const sideExamplesY = sy;

  // ---- main content ----
  const h1Y = contentTop + 6;
  const metaY = h1Y + 24;
  const introLines = [
    "Lumen Health's identity resolution offering enables",
    'high-value and comparatively low-cost identity',
    'resolution in the Lumen enterprise data warehouse',
    '(EDW). Every organization with multiple sources of',
    'overlapping patient and provider records stands to',
    'benefit from merging identities.',
  ];
  const introY = linesEnd(metaY, 1, 0, 28);

  const calloutY = linesEnd(introY, introLines.length, 18, 26);
  const calloutPad = 16;
  const calloutBodyLines = [
    'Identity resolution is the process of taking two',
    'or more records for a person, patient, or provider',
    'and probabilistically matching them, based on a',
    'set of rules, to decide whether they describe the',
    'same individual.',
  ];
  const calloutLabelY = calloutY + calloutPad + 11;
  const calloutBodyY = calloutLabelY + 20;
  const calloutBottomY = linesEnd(calloutBodyY, calloutBodyLines.length, 17, calloutPad - 9);

  const highLabelY = calloutBottomY + 34;
  const highIntroLines = [
    'Two records that agree closely enough are merged',
    'automatically for reporting:',
  ];
  const highIntroY = highLabelY + 22;
  const card1Y = linesEnd(highIntroY, highIntroLines.length, 18, 20);
  const card1 = ComparisonCard({
    x: CX,
    y: card1Y,
    w: CW,
    kind: 'good',
    badge: 'Likely match',
    rows: FIELD_ROWS_HIGH,
    note: ['Matched on name, address, and phone. The date-of-birth format differs but', 'still resolves to the same date, so it didn’t block the match.'],
  });

  const lowLabelY = card1.bottom + 34;
  const lowIntroLines = [
    'A record that shares only a name, with everything',
    'else different, is flagged instead:',
  ];
  const lowIntroY = lowLabelY + 22;
  const card2Y = linesEnd(lowIntroY, lowIntroLines.length, 18, 20);
  const card2 = ComparisonCard({
    x: CX,
    y: card2Y,
    w: CW,
    kind: 'warn',
    badge: 'Needs review',
    rows: FIELD_ROWS_LOW,
    note: ['Only the name and general location are close. That’s below the merge', 'threshold, so the records stay separate and are left for manual review.'],
  });

  const feedbackY = card2.bottom + 36;
  const relatedY = feedbackY + 34;
  const bodyBottomY = relatedY + 22;

  const sidebarBottomY = sideExamplesY + 16;
  const contentBottomY = Math.max(bodyBottomY, sidebarBottomY);
  const cardHeight = contentBottomY + BODY_PAD;

  const pageTop = 16;
  const viewH = pageTop + cardHeight + 16;
  const clipId = 'gr-help-clip';

  return (
    <Figure
      titleId="gr-after"
      title="Mockup of the content published as a help-center article"
      desc="A help-center article page: a navbar with search, a breadcrumb trail, and a left sidebar showing the Identity Resolution Services guide family with Overview, Definition, and Examples as the current sub-sections. The main column has the article title, a definition callout, and two comparison cards. The first, labeled 'Likely match,' shows a pair of patient records with a status icon per field — matching on name, address, and phone, with a note that the date-of-birth format differs but still resolves to the same date. The second, labeled 'Needs review,' shows a pair that only matches on name, so it's left for manual review instead of merging automatically. A 'Was this article helpful?' prompt and related-article links close out the page."
      viewBox={`0 0 ${VIEW_W} ${viewH}`}
      caption="">
      <rect width={VIEW_W} height={viewH} className={styles.backdrop} />

      <rect x={PAGE_X} y={pageTop + 5} width={PAGE_W} height={cardHeight} rx={10} className={styles.pageShadow} />

      <defs>
        <clipPath id={clipId}>
          <rect x={PAGE_X} y={pageTop} width={PAGE_W} height={cardHeight} rx={10} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x={PAGE_X} y={pageTop} width={PAGE_W} height={cardHeight} className={styles.page} />

        <g transform={`translate(0, ${pageTop})`}>
          {/* ---- navbar ---- */}
          <rect x={PAGE_X} y={0} width={PAGE_W} height={NAVBAR_H} className={styles.navbar} />
          <rect x={PAGE_X + 20} y={(NAVBAR_H - 24) / 2} width={24} height={24} rx={6} className={styles.navLogoChip} />
          <text x={PAGE_X + 32} y={NAVBAR_H / 2 + 4} textAnchor="middle" className={styles.navLogoMark}>L</text>
          <text x={PAGE_X + 56} y={NAVBAR_H / 2 + 5} className={styles.navTitle}>Lumen Help Center</text>

          <rect x={PAGE_X + 220} y={(NAVBAR_H - 28) / 2} width={200} height={28} rx={14} className={styles.searchPill} />
          <circle cx={PAGE_X + 236} cy={NAVBAR_H / 2} r={4.5} className={styles.searchIcon} />
          <line x1={PAGE_X + 239.5} y1={NAVBAR_H / 2 + 3.5} x2={PAGE_X + 243} y2={NAVBAR_H / 2 + 7} className={styles.searchIcon} />
          <text x={PAGE_X + 250} y={NAVBAR_H / 2 + 4} className={styles.searchText}>Search articles&#8230;</text>

          <text x={PAGE_X + PAGE_W - 86} y={NAVBAR_H / 2 + 4} textAnchor="end" className={styles.navLinkActive}>Guides</text>
          <text x={PAGE_X + PAGE_W - 20} y={NAVBAR_H / 2 + 4} textAnchor="end" className={styles.navLink}>Support</text>

          {/* ---- breadcrumb ---- */}
          <text x={SIDEBAR_X} y={NAVBAR_H + CRUMB_H / 2 + 4} className={styles.crumb}>
            Home<tspan dx="6" dy="0">&#8250;</tspan><tspan dx="6">Identity Resolution Services</tspan><tspan dx="6">&#8250;</tspan>
          </text>
          <text x={SIDEBAR_X + 218} y={NAVBAR_H + CRUMB_H / 2 + 4} className={styles.crumbCurrent}>Overview</text>
          <line x1={PAGE_X} y1={NAVBAR_H + CRUMB_H} x2={PAGE_X + PAGE_W} y2={NAVBAR_H + CRUMB_H} className={styles.sideRule} />

          {/* ---- sidebar ---- */}
          <Lines x={SIDEBAR_X} y={sideEyebrowY} lineH={11} lines={['IDENTITY RESOLUTION', 'SERVICES']} className={styles.sideEyebrow} />
          <text x={SIDEBAR_X} y={sideInstallY} className={styles.sideItem}>Install Guide</text>
          <text x={SIDEBAR_X} y={sideTechRefY} className={styles.sideItem}>Technical Reference</text>
          <text x={SIDEBAR_X} y={sideConceptsY} className={styles.sideItemBold}>Concepts Guide</text>

          <rect x={SIDEBAR_X} y={sideOverviewY - 14} width={SIDEBAR_W} height={22} rx={5} className={styles.sideActiveBg} />
          <rect x={SIDEBAR_X} y={sideOverviewY - 14} width={3} height={22} className={styles.sideActiveBar} />
          <text x={SIDEBAR_X + 14} y={sideOverviewY} className={styles.sideSubActive}>Overview</text>
          <text x={SIDEBAR_X + 14} y={sideDefinitionY} className={styles.sideSub}>Definition</text>
          <text x={SIDEBAR_X + 14} y={sideExamplesY} className={styles.sideSub}>Examples</text>

          {/* ---- main content ---- */}
          <text x={CX} y={h1Y} className={styles.h1Lg}>Overview</text>
          <text x={CX} y={metaY} className={styles.metaText}>Updated October 2026 &middot; 4 min read</text>

          <Lines x={CX} y={introY} lineH={18} lines={introLines} className={styles.bodyLg} />

          <rect x={CX} y={calloutY} width={CW} height={calloutBottomY - calloutY} rx={10} className={styles.calloutBg} />
          <rect x={CX} y={calloutY} width={4} height={calloutBottomY - calloutY} className={styles.calloutBar} />
          <circle cx={CX + calloutPad + 9} cy={calloutLabelY - 4} r={9} className={styles.calloutIconBg} />
          <text x={CX + calloutPad + 9} y={calloutLabelY} textAnchor="middle" className={styles.calloutIconText}>i</text>
          <text x={CX + calloutPad + 26} y={calloutLabelY} className={styles.calloutLabel}>Definition</text>
          <Lines x={CX + calloutPad} y={calloutBodyY} lineH={17} lines={calloutBodyLines} className={styles.calloutBody} />

          <text x={CX} y={highLabelY} className={styles.h2}>Example: a high matching score</text>
          <Lines x={CX} y={highIntroY} lineH={18} lines={highIntroLines} className={styles.bodyLg} />
          {card1.el}

          <text x={CX} y={lowLabelY} className={styles.h2}>Example: a low matching score</text>
          <Lines x={CX} y={lowIntroY} lineH={18} lines={lowIntroLines} className={styles.bodyLg} />
          {card2.el}

          <line x1={CX} y1={feedbackY - 16} x2={CX + CW} y2={feedbackY - 16} className={styles.sideRule} />
          <text x={CX} y={feedbackY} className={styles.feedbackLabel}>Was this article helpful?</text>
          <rect x={CX + 190} y={feedbackY - 14} width={46} height={22} rx={11} className={styles.feedbackBtnBg} />
          <text x={CX + 213} y={feedbackY + 1} textAnchor="middle" className={styles.feedbackBtnText}>Yes</text>
          <rect x={CX + 242} y={feedbackY - 14} width={46} height={22} rx={11} className={styles.feedbackBtnBg} />
          <text x={CX + 265} y={feedbackY + 1} textAnchor="middle" className={styles.feedbackBtnText}>No</text>

          <text x={CX} y={relatedY} className={styles.relatedLabel}>RELATED ARTICLES</text>
          <text x={CX} y={relatedY + 18} className={styles.relatedLink}>
            Install Guide<tspan dx="8" className={styles.metaText}>&middot;</tspan><tspan dx="8">Technical Reference</tspan>
          </text>
        </g>
      </g>
    </Figure>
  );
}

/* =====================================================================
   Before: my early draft, in Word, not yet laid out
   ===================================================================== */

export function GuideBefore() {
  const pageX = 16;
  const pageW = VIEW_W - pageX * 2;
  const pad = 32;
  const X = pageX + pad;
  const W = pageW - pad * 2;
  const pageTop = 16;

  const h1Y = pageTop + 48;
  const introLines = [
    "Lumen Health's identity resolution offering enables high-value and comparatively low-cost",
    'identity resolution in the Lumen enterprise data warehouse (EDW).',
  ];
  const introY = h1Y + 34;
  const benefitLines = [
    'Every organization that has multiple sources containing overlapping identifiers for patients',
    'and providers stands to benefit from merging identities.',
  ];
  const benefitY = linesEnd(introY, introLines.length, 15, 18);
  const defLines = [
    'Identity resolution as defined for the Lumen Analytics Platform is the process of taking two',
    'or more entities (persons, patients, providers, etc.) and probabilistically matching them',
    'based on a set of matching rules.',
  ];
  const defY = linesEnd(benefitY, benefitLines.length, 15, 18);
  const exampleIntroLines = [
    'For example, two patients who share the same Social Security Number, birth date, address,',
    'and first/last name would achieve a high matching score and would be identified as a match',
    'that would be merged together for purposes of analytic reporting.',
  ];
  const exampleIntroY = linesEnd(defY, defLines.length, 15, 18);

  const t1TitleY = linesEnd(exampleIntroY, exampleIntroLines.length, 15, 14);
  const barH = 20;
  const t1RowH = 17;
  const t1Rows = [
    ['Dana Whitfield', 'Dana Whitfield', true],
    ['382 Some St', '382 Some St', false],
    ['SomeCity, US 83921', 'SomeCity, US 83921-2521', true],
    ['555-12-1212', '555-12-1212', false],
    ['(111) 235-3523', '(111) 938-3982', false],
    ['DOB: 2014-01-01', 'DOB: 2014-JAN-01', true],
  ];
  const t1TableY = t1TitleY + 7;
  const t1BottomY = t1TableY + barH + t1Rows.length * t1RowH;

  const mergedForY = t1BottomY + 16;
  const lowIntroLines = [
    'Another pair of patients who share only first/last name and a partial address match would',
    'not reach the scoring threshold to be merged. This pair of patients would match but would',
    'not merge.',
  ];
  const lowIntroY = mergedForY + 17;

  const t2TitleY = linesEnd(lowIntroY, lowIntroLines.length, 15, 18);
  const t2Rows = [
    ['Dana Whitfield', 'Dana Whitfield', true],
    ['3534 Generic Ave', '382 Some St', false],
    ['SomeCity, US 83921', 'SomeCity, US 39823', true],
    ['832-893-8323', '555-12-1212', false],
    ['(111) 235-3523', '(111) 938-3982', false],
    ['DOB: 2014-12-31', 'DOB: 2014-01-01', true],
  ];
  const t2TableY = t2TitleY + 7;
  const t2BottomY = t2TableY + barH + t2Rows.length * t1RowH;

  const footerY = t2BottomY + 26;
  const col2 = X + W / 2 + 10;

  const viewH = footerY + 20;

  function Table({ tableY, title, rows }) {
    return (
      <>
        <rect x={X} y={tableY} width={W} height={barH} className={styles.tableBar} />
        <text x={X + 8} y={tableY + 14.5} className={styles.tableBarText}>{title}</text>
        {rows.map((row, i) => {
          const y = tableY + barH + i * t1RowH;
          const [a, b, bold] = row;
          return (
            <g key={i}>
              <text x={X + 8} y={y + 12} className={bold ? styles.tableCellLgBold : styles.tableCellLg}>{a}</text>
              <text x={col2} y={y + 12} className={bold ? styles.tableCellLgBold : styles.tableCellLg}>{b}</text>
              <line x1={X} y1={y + t1RowH} x2={X + W} y2={y + t1RowH} className={styles.tableRuleLg} />
            </g>
          );
        })}
      </>
    );
  }

  return (
    <Figure
      titleId="gr-before"
      title="Mockup of my early draft, as a plain Word page not yet laid out"
      desc="A plain, unstyled Word page titled Overview, carrying the opening paragraphs and definition, generalized to a fictional company. Both the high-matching-score and low-matching-score examples are written out in full here, each with its own black-header comparison table, before any page design was applied."
      viewBox={`0 0 ${VIEW_W} ${viewH}`}
      caption="">
      <rect width={VIEW_W} height={viewH} className={styles.backdrop} />
      <rect x={pageX} y={pageTop + 5} width={pageW} height={viewH - pageTop - 10} className={styles.pageShadow} />
      <rect x={pageX} y={pageTop} width={pageW} height={viewH - pageTop - 10} className={styles.page} />

      <text x={X} y={h1Y} className={styles.h1Lg}>Overview</text>

      <Lines x={X} y={introY} lineH={15} lines={introLines} className={styles.bodyLg} />
      <Lines x={X} y={benefitY} lineH={15} lines={benefitLines} className={styles.bodyLg} />
      <Lines x={X} y={defY} lineH={15} lines={defLines} className={styles.bodyLg} />
      <Lines x={X} y={exampleIntroY} lineH={15} lines={exampleIntroLines} className={styles.bodyLg} />

      <Table tableY={t1TableY} title="A Pair of Patient Records Likely to Merge" rows={t1Rows} />
      <text x={X} y={mergedForY} className={styles.bodyLg}></text>

      <Lines x={X} y={lowIntroY} lineH={15} lines={lowIntroLines} className={styles.bodyLg} />

      <Table tableY={t2TableY} title="A Pair of Patients That Will Match But Not Merge" rows={t2Rows} />

      <text x={X + W} y={footerY} textAnchor="end" className={styles.footerNote}>
        Draft for internal review. Not yet copyedited or laid out.
      </text>
    </Figure>
  );
}
