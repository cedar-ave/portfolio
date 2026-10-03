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
   After: the final guide, laid out and branded for publication. Stacked,
   full-width pages (not a side-by-side spread) so type stays readable at
   the figure's actual display size. Styling takes liberties with the
   original's exact layout in favor of looking clean and professional.
   ===================================================================== */

// An accent-styled, two-column comparison table (title + a colored rule,
// then rows with a thin divider). Shared by both example tables on the
// Overview pages.
function AccentTable({ x, y, w, col2, title, rows, rowH = 23 }) {
  const ruleY = y + 5;
  const firstRowY = ruleY + 21;
  return (
    <>
      <text x={x} y={y} className={styles.tableTitleAccentLg}>{title}</text>
      <line x1={x} y1={ruleY} x2={x + w} y2={ruleY} className={styles.tableRuleAccent} />
      {rows.map((row, i) => {
        const ry = firstRowY + i * rowH;
        const cls = row.bold ? styles.tableCellAccentBoldLg : styles.tableCellAccentLg;
        return (
          <g key={i}>
            <text x={x} y={ry} className={cls}>{row.left}</text>
            <text x={col2} y={ry} className={cls}>{row.right}</text>
            <line x1={x} y1={ry + 7} x2={x + w} y2={ry + 7} className={styles.tableRule} />
          </g>
        );
      })}
    </>
  );
}
function accentTableBottom(y, rowCount, rowH = 23) {
  return y + 5 + 21 + rowCount * rowH;
}

const PATIENT_ROWS_HIGH = [
  { left: 'Dana Whitfield', right: 'Dana Whitfield', bold: true },
  { left: '382 Some St', right: '382 Some St' },
  { left: 'SomeCity, US 83921', right: 'SomeCity, US 83921-2521', bold: true },
  { left: '555-12-1212', right: '555-12-1212' },
  { left: '(111) 235-3523', right: '(111) 938-3982' },
  { left: 'DOB: 2014-01-01', right: 'DOB: 2014-JAN-01' },
];
const PATIENT_ROWS_LOW = [
  { left: 'Dana Whitfield', right: 'Dana Whitfield', bold: true },
  { left: '3534 Generic Ave', right: '382 Some St' },
  { left: 'SomeCity, US 83921', right: 'SomeCity, US 39823', bold: true },
  { left: '832-893-8323', right: '555-12-1212' },
  { left: '(111) 235-3523', right: '(111) 938-3982' },
  { left: 'DOB: 2014-12-31', right: 'DOB: 2014-01-01' },
];

export function GuideAfter() {
  const PAGE_X = 16;
  const PAGE_W = 688;
  const PAD = 32;
  const CX = PAGE_X + PAD;
  const CW = PAGE_W - PAD * 2;
  const COL2 = CX + CW / 2 + 10;
  const GAP = 34;

  function Footer({ pageNum }) {
    return (
      <>
        <text x={CX} y={0} className={styles.wordmarkLg}>LUMEN HEALTH</text>
        <text x={CX + CW} y={0} textAnchor="end" className={styles.footerMutedLg}>
          Identity Resolution Services Concepts Guide | {pageNum}
        </text>
      </>
    );
  }

  // ---------------------------------------------------------------
  // Page 1: title page
  // ---------------------------------------------------------------
  const headY = 28;
  const h1Y1 = headY + 42;
  const h1Y2 = h1Y1 + 34;
  const taglineLines = [
    'The Lumen Analytics Platform (LAP) offers integration with Anchor Point',
    "MultiMatch's comprehensive master data management (MDM) solution to",
    'support patient and provider identity resolution in the EDW.',
  ];
  const taglineY = h1Y2 + 30;
  const introLines = [
    'This guide is one of three provided by Lumen Health to walk through the steps',
    'of installing and configuring MultiMatch software and tools to automatically',
    'match and merge entities (people, places, etc.) in the Lumen EDW.',
  ];
  const introY = linesEnd(taglineY, taglineLines.length, 18, 24);
  const hereLabelY = linesEnd(introY, introLines.length, 18, 28);

  // "You are here" roadmap table
  const tableY = hereLabelY + 20;
  const labelColW = 64;
  const dataColsX = CX + labelColW;
  const dataColsW = CW - labelColW;
  const colW = dataColsW / 4;
  const col = (i) => dataColsX + i * colW;

  const headRowY = tableY + 18;
  const descRowY = headRowY + 22;
  const descLineH = 15;
  const descLines = [
    ['Install MultiMatch', 'as part of the Lumen', 'Analytics Platform.'],
    ['Configure MultiMatch', 'in the Lumen Analytics', 'Platform.'],
    ['Perform ongoing', 'operations, maintenance,', 'and troubleshooting.'],
    ['Follow best practices', 'to resolve duplicate', 'identities.'],
  ];
  const descRowH = 3 * descLineH + 16;

  const guideRowLabelY = descRowY + descRowH + 16;
  const guideLineH = 15;
  const guideRowH = 2 * guideLineH + 16;

  const versionRowLabelY = guideRowLabelY + guideRowH + 16;
  const versionLineH = 15;
  const versionRowH = 2 * versionLineH + 16;
  const tableBottomY = versionRowLabelY + versionRowH;

  const resolveX = col(3);

  const supportY = tableBottomY + 34;
  const supportBodyY = supportY + 20;
  const supportLines = [
    'Anchor Point provides thorough installation, configuration, and reference guides.',
    "Lumen Health's Identity Resolution Services guides are not intended to replace",
    'Anchor Point documentation. Rather, their scope is limited to installing Anchor',
    'Point MultiMatch as part of the Lumen EDW platform, to use alongside it.',
  ];
  const supportEndY = linesEnd(supportBodyY, supportLines.length, 17, 0);

  const page1Height = supportEndY + 48;

  // ---------------------------------------------------------------
  // Page 2: Overview, part 1
  // ---------------------------------------------------------------
  const rHeadY = 28;
  const rH1Y = rHeadY + 42;
  const rIntroLines = [
    "Lumen Health's identity resolution offering enables high-value and",
    'comparatively low-cost identity resolution in the Lumen enterprise',
    'data warehouse (EDW).',
  ];
  const rIntroY = rH1Y + 32;
  const rBenefitLines = [
    'Every organization that has multiple sources containing overlapping',
    'identifiers for patients and providers stands to benefit from merging',
    'identities.',
  ];
  const rBenefitY = linesEnd(rIntroY, rIntroLines.length, 18, 22);

  const defLabelY = linesEnd(rBenefitY, rBenefitLines.length, 18, 28);
  const defLines = [
    'Identity resolution as defined for the Lumen Analytics Platform is the',
    'process of taking two or more entities (persons, patients, providers,',
    'etc.) and probabilistically matching them based on a set of rules.',
  ];
  const defBodyY = defLabelY + 24;

  const highLabelY = linesEnd(defBodyY, defLines.length, 18, 24);
  const highIntroLines = [
    'For example, two patients who share the same Social Security Number,',
    'birthdate, address, first name, and last name achieve a high matching',
    'score. They are identified as a match and merged for purposes of',
    'analytic reporting:',
  ];
  const highIntroY = highLabelY + 24;

  const t1TitleY = linesEnd(highIntroY, highIntroLines.length, 18, 22);
  const t1BottomY = accentTableBottom(t1TitleY, PATIENT_ROWS_HIGH.length);

  const lowLabelY = t1BottomY + 32;
  const lowIntroLines = [
    'Another pair of patients who share only first name, last name, and a',
    'partial address match would not reach the scoring threshold to be',
    'merged. This pair of patients would match but would not merge:',
  ];
  const lowIntroY = lowLabelY + 24;
  const page2BottomY = linesEnd(lowIntroY, lowIntroLines.length, 18, 0);
  const page2Height = page2BottomY + 48;

  // ---------------------------------------------------------------
  // Page 3: Overview, continued — the comparison table page 2 only
  // introduces
  // ---------------------------------------------------------------
  const contHeadY = 28;
  const contLabelY = contHeadY + 36;
  const t2TitleY = contLabelY + 26;
  const t2BottomY = accentTableBottom(t2TitleY, PATIENT_ROWS_LOW.length);
  const page3Height = t2BottomY + 48;

  // ---------------------------------------------------------------
  // Stack the three pages, each in its own local coordinate frame
  // ---------------------------------------------------------------
  const page1Top = 16;
  const page2Top = page1Top + page1Height + GAP;
  const page3Top = page2Top + page2Height + GAP;
  const viewH = page3Top + page3Height + 16;

  return (
    <Figure
      titleId="gr-after"
      title="Mockup of the final guide, laid out and branded for publication"
      desc="Three stacked pages. Page one is a guide title page with a tagline describing the platform's integration with a third-party MDM tool, an intro paragraph, a 'you are here' roadmap table across four guide stages (Install, Configure, Maintain, Resolve), and a short section on the MDM vendor's own documentation. Page two is the start of an Overview page with a definition of identity resolution and a high-matching-score example with its comparison table, followed by the start of a low-matching-score example. Page three continues the Overview with that example's comparison table, showing a full pair of patient records that would match but would not merge."
      viewBox={`0 0 ${VIEW_W} ${viewH}`}
      caption="After: the final guide, laid out and branded for publication, with the low-matching-score example's comparison table carried onto its own page.">
      <rect width={VIEW_W} height={viewH} className={styles.backdrop} />

      {/* ---- page 1: title page ---- */}
      <rect x={PAGE_X} y={page1Top + 5} width={PAGE_W} height={page1Height} rx={8} className={styles.pageShadow} />
      <rect x={PAGE_X} y={page1Top} width={PAGE_W} height={page1Height} rx={8} className={styles.page} />
      <rect x={PAGE_X} y={page1Top} width={PAGE_W} height={5} rx={2.5} className={styles.pageAccentBar} />

      <g transform={`translate(0, ${page1Top})`}>
        <text x={CX + CW / 2} y={headY} textAnchor="middle" className={styles.eyebrow}>
          LUMEN HEALTH IDENTITY RESOLUTION SERVICES
        </text>
        <text x={CX} y={h1Y1} className={styles.h1Brand}>Lumen Health Identity</text>
        <text x={CX} y={h1Y2} className={styles.h1Brand}>Resolution Services</text>

        <Lines x={CX} y={taglineY} lineH={18} lines={taglineLines} className={styles.taglineLg} />
        <Lines x={CX} y={introY} lineH={18} lines={introLines} className={styles.bodyLg} />

        <text x={CX} y={hereLabelY} className={styles.labelLg}>You are here</text>

        <rect x={resolveX - 6} y={tableY - 4} width={colW + 6} height={tableBottomY - tableY + 8} rx={8} className={styles.gridCellActiveLg} />
        <line x1={CX} y1={tableY} x2={CX + CW} y2={tableY} className={styles.gridRule} />

        {['Install', 'Configure', 'Maintain'].map((h, i) => (
          <text key={h} x={col(i)} y={headRowY} className={styles.gridHeadCellLg}>{h}</text>
        ))}
        <rect x={col(3) - 2} y={headRowY - 15} width={64} height={20} rx={10} className={styles.resolvePill} />
        <text x={col(3) + 10} y={headRowY} className={styles.resolvePillText}>Resolve</text>
        <line x1={CX} y1={headRowY + 8} x2={CX + CW} y2={headRowY + 8} className={styles.gridRule} />

        {descLines.map((cellLines, i) => (
          <Lines
            key={i}
            x={col(i)}
            y={descRowY}
            lineH={descLineH}
            lines={cellLines}
            className={i === 3 ? styles.gridBodyCellBoldLg : styles.gridBodyCellLg}
          />
        ))}

        <text x={CX} y={guideRowLabelY} className={styles.gridBodyCellLg}>Guide</text>
        <Lines x={col(0)} y={guideRowLabelY} lineH={guideLineH} lines={['Identity Resolution', 'Services Install Guide']} className={styles.gridItalicCellLg} />
        <Lines x={col(1)} y={guideRowLabelY} lineH={guideLineH} lines={['Identity Resolution Services', 'Technical Reference']} className={styles.gridItalicCellLg} />
        <Lines x={col(3)} y={guideRowLabelY} lineH={guideLineH} lines={['Identity Resolution', 'Services Concepts Guide']} className={styles.gridItalicCellBoldLg} />

        <text x={CX} y={versionRowLabelY} className={styles.gridBodyCellLg}>Version</text>
        <Lines x={col(0)} y={versionRowLabelY} lineH={versionLineH} lines={['LAP 2.6 or higher', 'MultiMatch 4.5']} className={styles.gridBodyCellLg} />
        <Lines x={col(1)} y={versionRowLabelY} lineH={versionLineH} lines={['LAP 2.6', 'MultiMatch 4.5']} className={styles.gridBodyCellLg} />
        <Lines x={col(3)} y={versionRowLabelY} lineH={versionLineH} lines={['LAP 2.6 or higher', 'MultiMatch 4.5']} className={styles.gridBodyCellLg} />

        <line x1={CX} y1={tableBottomY} x2={CX + CW} y2={tableBottomY} className={styles.gridRule} />

        <text x={CX} y={supportY} className={styles.labelLg}>Anchor Point support</text>
        <Lines x={CX} y={supportBodyY} lineH={17} lines={supportLines} className={styles.bodyLg} />

        <g transform={`translate(0, ${page1Height - 20})`}><Footer pageNum={5} /></g>
      </g>

      {/* ---- page 2: Overview, part 1 ---- */}
      <rect x={PAGE_X} y={page2Top + 5} width={PAGE_W} height={page2Height} rx={8} className={styles.pageShadow} />
      <rect x={PAGE_X} y={page2Top} width={PAGE_W} height={page2Height} rx={8} className={styles.page} />
      <rect x={PAGE_X} y={page2Top} width={PAGE_W} height={5} rx={2.5} className={styles.pageAccentBar} />

      <g transform={`translate(0, ${page2Top})`}>
        <text x={CX + CW} y={rHeadY} textAnchor="end" className={styles.eyebrow}>OVERVIEW</text>
        <text x={CX} y={rH1Y} className={styles.h1Lg}>Overview</text>

        <Lines x={CX} y={rIntroY} lineH={18} lines={rIntroLines} className={styles.bodyLg} />
        <Lines x={CX} y={rBenefitY} lineH={18} lines={rBenefitLines} className={styles.bodyLg} />

        <text x={CX} y={defLabelY} className={styles.h2AccentLg}>Definition</text>
        <Lines x={CX} y={defBodyY} lineH={18} lines={defLines} className={styles.bodyLg} />

        <text x={CX} y={highLabelY} className={styles.h3Lg}>Example: High matching score</text>
        <Lines x={CX} y={highIntroY} lineH={18} lines={highIntroLines} className={styles.bodyLg} />

        <AccentTable x={CX} y={t1TitleY} w={CW} col2={COL2} title="A pair of patient records likely to merge" rows={PATIENT_ROWS_HIGH} />

        <text x={CX} y={lowLabelY} className={styles.h3Lg}>Example: Low matching score</text>
        <Lines x={CX} y={lowIntroY} lineH={18} lines={lowIntroLines} className={styles.bodyLg} />

        <g transform={`translate(0, ${page2Height - 20})`}><Footer pageNum={6} /></g>
      </g>

      {/* ---- page 3: Overview, continued ---- */}
      <rect x={PAGE_X} y={page3Top + 5} width={PAGE_W} height={page3Height} rx={8} className={styles.pageShadow} />
      <rect x={PAGE_X} y={page3Top} width={PAGE_W} height={page3Height} rx={8} className={styles.page} />
      <rect x={PAGE_X} y={page3Top} width={PAGE_W} height={5} rx={2.5} className={styles.pageAccentBar} />

      <g transform={`translate(0, ${page3Top})`}>
        <text x={CX + CW} y={contHeadY} textAnchor="end" className={styles.eyebrow}>OVERVIEW (CONTINUED)</text>
        <text x={CX} y={contLabelY} className={styles.h3Lg}>Example: Low matching score, continued</text>

        <AccentTable x={CX} y={t2TitleY} w={CW} col2={COL2} title="A pair of patients who will match but not merge" rows={PATIENT_ROWS_LOW} />

        <g transform={`translate(0, ${page3Height - 20})`}><Footer pageNum={7} /></g>
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
    'that would be merged',
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
      caption="Before: my early draft, still in Word. I worked out the explanation and wrote out both comparison-table examples in full before any layout pass.">
      <rect width={VIEW_W} height={viewH} className={styles.backdrop} />
      <rect x={pageX} y={pageTop + 5} width={pageW} height={viewH - pageTop - 10} className={styles.pageShadow} />
      <rect x={pageX} y={pageTop} width={pageW} height={viewH - pageTop - 10} className={styles.page} />

      <text x={X} y={h1Y} className={styles.h1Lg}>Overview</text>

      <Lines x={X} y={introY} lineH={15} lines={introLines} className={styles.bodyLg} />
      <Lines x={X} y={benefitY} lineH={15} lines={benefitLines} className={styles.bodyLg} />
      <Lines x={X} y={defY} lineH={15} lines={defLines} className={styles.bodyLg} />
      <Lines x={X} y={exampleIntroY} lineH={15} lines={exampleIntroLines} className={styles.bodyLg} />

      <Table tableY={t1TableY} title="A Pair of Patient Records Likely to Merge" rows={t1Rows} />
      <text x={X} y={mergedForY} className={styles.bodyLg}>together for purposes of analytic reporting.</text>

      <Lines x={X} y={lowIntroY} lineH={15} lines={lowIntroLines} className={styles.bodyLg} />

      <Table tableY={t2TableY} title="A Pair of Patients That Will Match But Not Merge" rows={t2Rows} />

      <text x={X + W} y={footerY} textAnchor="end" className={styles.footerNote}>
        Draft for internal review. Not yet copyedited or laid out.
      </text>
    </Figure>
  );
}
