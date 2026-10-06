import React from 'react';
import styles from './styles.module.css';

/* Shared diagrams for several technical-marketing sample pages. Built as
   SVG (not screenshots) so colors follow the site's light/dark theme - see
   the style notes in IntakeMartDesignerDiagrams, which this matches. */

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
   1. Intake mart categories, each fed by example source systems.
   ===================================================================== */

const CATEGORIES = [
  { label: 'EMR', examples: 'Meridian, Crestline' },
  { label: 'Financial', examples: 'Summit, Beacon' },
  { label: 'Patient Sat.', examples: 'Meridian, Lighthouse' },
  { label: 'HR', examples: 'Vantage, Pinnacle' },
  { label: 'Administrative', examples: 'Pinnacle, Vantage' },
  { label: 'Claims', examples: 'Beacon, QuickNet' },
];

export function SourceMartSpokesDiagram() {
  const colW = 112;
  const gap = 8;
  const colXs = CATEGORIES.map((_, i) => 24 + i * (colW + gap));

  return (
    <Figure
      titleId="cp-spokes"
      title="Intake mart categories"
      desc="A header labeled Intake Marts, above six category boxes - EMR, Financial, Patient Satisfaction, HR, Administrative, and Claims - each connected to a cylinder listing example source systems in that category."
      viewBox="0 0 780 220">
      <rect x="12" y="24" width="756" height="188" rx="14" className={styles.cardShadow} />
      <rect x="8" y="12" width="756" height="188" rx="14" className={styles.card} />

      <rect x="24" y="24" width="716" height="34" rx="8" className={styles.headerBar} />
      <text x="382" y="46" textAnchor="middle" className={styles.headerText}>Intake Marts</text>

      {CATEGORIES.map((cat, i) => {
        const x = colXs[i];
        const cx = x + colW / 2;
        return (
          <g key={cat.label}>
            <rect x={x} y="70" width={colW} height="30" rx="6" className={styles.categoryBox} />
            <text x={cx} y="90" textAnchor="middle" className={styles.categoryText}>{cat.label}</text>
            <line x1={cx} y1="100" x2={cx} y2="116" stroke="var(--cp-border)" strokeWidth="1.3" />
            <path
              d={`M${x + 8},${116 + 22} C${x + 8},${110} ${x + colW - 8},${110} ${x + colW - 8},${116 + 22} L${x + colW - 8},${150} C${x + colW - 8},${156} ${x + 8},${156} ${x + 8},${150} Z`}
              className={styles.cylinderFill}
            />
            <ellipse cx={cx} cy={138} rx={colW / 2 - 8} ry="8" className={styles.cylinderFill} />
            <text x={cx} y="142" textAnchor="middle" className={styles.cylinderText}>{cat.label}</text>
            <text x={cx} y="172" textAnchor="middle" className={styles.exampleText}>e.g. {cat.examples}</text>
          </g>
        );
      })}
    </Figure>
  );
}

/* =====================================================================
   2. The adaptive-binding bus: apps on top, core data elements in the
      middle, intake marts on the bottom.
   ===================================================================== */

const APPS = ['Clearpath Apps', 'Client-Developed Apps', 'Third-Party Apps', 'Ad Hoc Query Tools'];
const CORE_ELEMENTS = [
  'CPT code', 'Date & time', 'DRG code', 'Drug code', 'Employee ID',
  'Encounter ID', 'Gender', 'ICD diagnosis', 'Department ID', 'Facility ID',
  'Location', 'Patient type', 'Member ID', 'Payer ID', 'Provider ID',
];
const MARTS = ['EMR', 'Claims', 'Cost', 'Other'];

export function AdaptiveBindingBusDiagram() {
  const boxW = 170;
  const gap = 16;
  const xs = APPS.map((_, i) => 16 + i * (boxW + gap));

  return (
    <Figure
      titleId="cp-bus"
      title="Clearpath's Adaptive-Binding Bus Architecture"
      desc="Four application types - Clearpath Apps, Client-Developed Apps, Third-Party Apps, and Ad Hoc Query Tools - connect to a bus of roughly fifteen core data elements, such as patient identifier, provider identifier, and diagnosis code, which in turn connects to four Clearpath Intake Marts: EMR, Claims, Cost, and Other."
      viewBox="0 0 780 320">
      {xs.map((x, i) => (
        <g key={APPS[i]}>
          <rect x={x} y="20" width={boxW} height="50" rx="8" className={styles.appBox} />
          <text x={x + boxW / 2} y="50" textAnchor="middle" className={styles.appText}>{APPS[i]}</text>
          <line x1={x + boxW / 2} y1="70" x2={x + boxW / 2} y2="110" className={styles.busConnector} />
        </g>
      ))}

      <rect x="16" y="110" width="748" height="90" rx="10" className={styles.busBar} />
      <text x="390" y="128" textAnchor="middle" className={styles.busLabel}>
        Clearpath&rsquo;s Adaptive-Binding Bus — core data elements
      </text>
      {CORE_ELEMENTS.map((el, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 30 + col * 148;
        const y = 138 + row * 22;
        return (
          <g key={el}>
            <rect x={x} y={y} width="138" height="17" rx="8.5" className={styles.chipEl} />
            <text x={x + 69} y={y + 12} textAnchor="middle" className={styles.chipText}>{el}</text>
          </g>
        );
      })}

      <text x="390" y="218" textAnchor="middle" className={styles.appText}>Clearpath Intake Marts</text>
      {MARTS.map((mart, i) => {
        const x = xs[i];
        return (
          <g key={mart}>
            <line x1={x + boxW / 2} y1="200" x2={x + boxW / 2} y2="228" className={styles.busConnector} />
            <rect x={x} y="228" width={boxW} height="40" rx="8" className={styles.martBox} />
            <text x={x + boxW / 2} y="252" textAnchor="middle" className={styles.martText}>{mart}</text>
          </g>
        );
      })}
    </Figure>
  );
}

/* =====================================================================
   3. The Data & Analytics Maturity Model: levels 0-8, increasing
      complexity of data binding from bottom to top.
   ===================================================================== */

const LEVELS = [
  { color: '#8a94a3', title: 'Fragmented point solutions', desc: 'Inconsistent, inefficient versions of the truth' },
  { color: '#5e7893', title: 'Enterprise data warehouse', desc: 'Foundation of data and technology' },
  { color: '#5f93c7', title: 'Standardized vocabulary & registries', desc: 'Relating and organizing the core data' },
  { color: '#4fa8d8', title: 'Automated internal reporting', desc: 'Efficient, consistent production' },
  { color: '#3fa592', title: 'Automated external reporting', desc: 'Efficient, consistent production and agility' },
  { color: '#73d3c3', title: 'Clinical effectiveness & population management', desc: 'Measuring and managing evidence-based care' },
  { color: '#f1b753', title: 'Cost per case & data-driven culture', desc: 'Taking on financial and operational risk' },
  { color: '#e08a86', title: 'Cost per capita & predictive analytics', desc: 'Taking more financial risk and managing it proactively' },
  { color: '#d06e6a', title: 'Cost per use & prescriptive analytics', desc: 'Contracting for and managing health' },
];

export function MaturityModelDiagram() {
  const rowH = 34;
  const rowGap = 4;
  const barW = 300;
  const topMargin = 36;

  return (
    <Figure
      titleId="cp-maturity"
      title="Data & Analytics Maturity Model, levels 0 through 8"
      desc="A nine-level ladder from Level 0, fragmented point solutions, to Level 8, cost per use and prescriptive analytics, with complexity of data binding increasing at each level."
      viewBox={`0 0 780 ${topMargin + LEVELS.length * (rowH + rowGap) + 16}`}>
      <text x="20" y="20" className={styles.appText}>
        Increasing complexity of data binding and use, Level 0 to Level 8
      </text>
      {LEVELS.map((_, idxFromBottom) => {
        // Render top to bottom (idxFromBottom 0 = Level 8, at the top of the ladder).
        const levelNum = LEVELS.length - 1 - idxFromBottom;
        const level = LEVELS[levelNum];
        const y = topMargin + idxFromBottom * (rowH + rowGap);
        return (
          <g key={level.title}>
            <rect x="20" y={y} width={barW} height={rowH} rx="6" style={{ fill: level.color }} />
            <text x="32" y={y + 22} className={styles.levelText}>Level {levelNum}</text>
            <text x={barW + 44} y={y + 15} className={styles.appText}>{level.title}</text>
            <text x={barW + 44} y={y + 29} className={styles.levelDesc}>{level.desc}</text>
          </g>
        );
      })}
    </Figure>
  );
}

/* =====================================================================
   4. Clearpath Analytics Platform: source systems feed the data
      warehouse, which feeds improvement applications.
   ===================================================================== */

const SOURCE_SYSTEMS = ['EMR', 'Financial', 'Patient Sat.', 'Claims', 'HR'];
const IMPROVEMENT_APPS = ['Clinical analytics', 'Population explorer', 'Readmission explorer', 'Cohort builder'];

export function PlatformArchitectureDiagram() {
  return (
    <Figure
      titleId="cp-platform"
      title="Clearpath Analytics Platform architecture"
      desc="Source systems - EMR, Financial, Patient Satisfaction, Claims, and HR - feed up into the Adaptive-Binding Data Warehouse, which contains Intake Marts and Focus Marts, which in turn feed improvement applications such as clinical analytics, population explorer, readmission explorer, and cohort builder."
      viewBox="0 0 780 300">
      {IMPROVEMENT_APPS.map((app, i) => {
        const w = 170;
        const x = 30 + i * (w + 10);
        return (
          <g key={app}>
            <rect x={x} y="20" width={w} height="32" rx="16" className={styles.appPill} />
            <text x={x + w / 2} y="40" textAnchor="middle" className={styles.appPillText}>{app}</text>
          </g>
        );
      })}
      <path d="M390,70 L390,118" className={styles.flowArrow} markerEnd="url(#cp-arrow)" />

      <defs>
        <marker id="cp-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" style={{ fill: 'var(--cp-blue)' }} />
        </marker>
      </defs>

      <rect x="40" y="118" width="700" height="80" rx="10" className={styles.busBar} />
      <text x="390" y="136" textAnchor="middle" className={styles.busLabel}>Adaptive-Binding Data Warehouse</text>
      <rect x="80" y="150" width="280" height="34" rx="8" className={styles.martBox} />
      <text x="220" y="171" textAnchor="middle" className={styles.martText}>Intake Marts</text>
      <rect x="420" y="150" width="280" height="34" rx="8" className={styles.martBox} />
      <text x="560" y="171" textAnchor="middle" className={styles.martText}>Focus Marts</text>

      <path d="M390,228 L390,198" className={styles.flowArrow} markerEnd="url(#cp-arrow)" />

      {SOURCE_SYSTEMS.map((src, i) => {
        const w = 130;
        const x = 30 + i * (w + 10);
        return (
          <g key={src}>
            <rect x={x} y="228" width={w} height="30" rx="15" className={styles.sourcePill} />
            <text x={x + w / 2} y="248" textAnchor="middle" className={styles.sourcePillText}>{src}</text>
          </g>
        );
      })}
      <text x="390" y="285" textAnchor="middle" className={styles.layerSub}>Source systems</text>
    </Figure>
  );
}

/* =====================================================================
   5. Focus Mart Designer's desktop interface: a ribbon toolbar, an entity
      list, a details form, and a value-sets panel.
   ===================================================================== */

const RIBBON_GROUPS = [
  { label: 'Connections', x: 16 },
  { label: 'Execute', x: 196 },
  { label: 'SQL', x: 376 },
  { label: 'Dependencies', x: 556 },
];

function RibbonIcon({ kind, x, y }) {
  const cx = x + 17;
  const cy = y + 15;
  if (kind === 'save') {
    return <rect x={cx - 7} y={cy - 7} width="14" height="14" rx="2" className={styles.ribbonIcon} />;
  }
  if (kind === 'plug') {
    return <path d={`M${cx - 6},${cy - 6} v6 M${cx + 6},${cy - 6} v6 M${cx - 7},${cy} h14 v4 a7,7 0 0 1 -14,0 Z`} className={styles.ribbonIcon} />;
  }
  if (kind === 'play') {
    return <path d={`M${cx - 5},${cy - 7} L${cx + 7},${cy} L${cx - 5},${cy + 7} Z`} className={styles.ribbonIcon} />;
  }
  if (kind === 'tree') {
    return <path d={`M${cx - 6},${cy - 7} h10 M${cx - 6},${cy} h10 M${cx - 6},${cy + 7} h10 M${cx - 6},${cy - 7} v14`} className={styles.ribbonIcon} />;
  }
  if (kind === 'code') {
    return <path d={`M${cx - 2},${cy - 7} l-5,7 l5,7 M${cx + 2},${cy - 7} l5,7 l-5,7`} className={styles.ribbonIcon} />;
  }
  if (kind === 'format') {
    return <path d={`M${cx - 7},${cy - 5} h14 M${cx - 7},${cy} h14 M${cx - 7},${cy + 5} h8`} className={styles.ribbonIcon} />;
  }
  if (kind === 'calc') {
    return <path d={`M${cx - 6},${cy - 7} h12 v14 h-12 Z M${cx - 6},${cy - 3} h12 M${cx - 2},${cy - 3} v11`} className={styles.ribbonIcon} />;
  }
  return <path d={`M${cx - 6},${cy} a6,6 0 1 1 12,0 a6,6 0 1 1 -12,0`} className={styles.ribbonIcon} />;
}

const RIBBON_BUTTONS = [
  { group: 0, offset: 0, kind: 'save' },
  { group: 0, offset: 40, kind: 'plug' },
  { group: 1, offset: 0, kind: 'play' },
  { group: 1, offset: 40, kind: 'tree' },
  { group: 2, offset: 0, kind: 'code' },
  { group: 2, offset: 40, kind: 'format' },
  { group: 3, offset: 0, kind: 'calc' },
  { group: 3, offset: 40, kind: 'refresh' },
];

const SUB_TABS = ['Details', 'Structure', 'Indexes', 'Source Bindings', 'Used By', 'Results'];
const SUB_TAB_X = [182, 246, 320, 384, 493, 557];

function FormRow({ label, value, y, tall }) {
  return (
    <g>
      <text x="182" y={y} className={styles.formLabel}>{label}</text>
      <rect x="182" y={y + 6} width="270" height={tall ? 36 : 20} rx="4" className={styles.formBox} />
      {value && <text x="190" y={y + (tall ? 20 : 20)} className={styles.formValue}>{value}</text>}
    </g>
  );
}

function Checkbox({ x, y, label, checked }) {
  return (
    <g>
      <rect x={x} y={y} width="14" height="14" rx="3" className={styles.checkboxBox} />
      {checked && <path d={`M${x + 3},${y + 7} l3,4 l6,-8`} className={styles.checkMark} />}
      <text x={x + 20} y={y + 11} className={styles.formValue}>{label}</text>
    </g>
  );
}

export function FocusMartDesignerInterface() {
  return (
    <Figure
      titleId="cp-fmd"
      title="Focus Mart Designer desktop interface"
      desc="A desktop application window for Focus Mart Designer. A ribbon toolbar offers Connections, Execute, SQL, and Dependencies actions. An entity list on the left shows one entity, NewEntity1, selected. The main panel shows its Details form - Name, Description, Content ID, Last Deployed, Last Modified, and Public/Persisted checkboxes - alongside sub-tabs for Structure, Indexes, Source Bindings, Used By, and Results. A Value Sets panel sits on the right, and a status bar at the bottom reads: current focus mart has 5 validation notices."
      viewBox="0 0 780 480">
      <rect x="12" y="20" width="756" height="448" rx="10" className={styles.cardShadow} />
      <rect x="8" y="8" width="756" height="448" rx="10" className={styles.card} />

      {/* Title bar */}
      <rect x="8" y="8" width="756" height="26" rx="6" className={styles.titleBar} />
      <text x="20" y="25" className={styles.titleText}>Focus Mart Designer — NewEntity1</text>
      <circle cx="740" cy="21" r="3" className={styles.winDot} />
      <circle cx="748" cy="21" r="3" className={styles.winDot} />
      <circle cx="756" cy="21" r="3" className={styles.winDot} />

      {/* Ribbon */}
      <rect x="8" y="34" width="756" height="56" className={styles.ribbonBg} />
      {RIBBON_GROUPS.map((g, i) => (
        <g key={g.label}>
          {i > 0 && <line x1={g.x - 8} y1="40" x2={g.x - 8} y2="84" className={styles.ribbonDivider} />}
          <text x={g.x + 40} y="86" textAnchor="middle" className={styles.ribbonGroupLabel}>{g.label}</text>
        </g>
      ))}
      {RIBBON_BUTTONS.map((btn) => {
        const group = RIBBON_GROUPS[btn.group];
        const x = group.x + btn.offset;
        return (
          <g key={`${btn.group}-${btn.offset}`}>
            <rect x={x} y="40" width="34" height="34" rx="6" className={styles.ribbonBtn} />
            <RibbonIcon kind={btn.kind} x={x} y={40} />
          </g>
        );
      })}

      {/* Tabs */}
      <rect x="16" y="94" width="90" height="22" rx="4" className={styles.tabActive} />
      <text x="30" y="109" className={styles.tabActiveText}>Entities (1)</text>
      <text x="120" y="109" className={styles.tabInactiveText}>Browsed</text>
      <line x1="8" y1="116" x2="764" y2="116" className={styles.ribbonDivider} />

      {/* Left panel: entity list */}
      <rect x="8" y="116" width="150" height="300" className={styles.panelBg} />
      <rect x="16" y="128" width="134" height="22" rx="4" className={styles.listItemActive} />
      <text x="24" y="143" className={styles.listItemText}>NewEntity1</text>

      {/* Main panel: sub-tabs + details form */}
      {SUB_TABS.map((tab, i) => (
        <text key={tab} x={SUB_TAB_X[i]} y="131" className={i === 0 ? styles.tabActiveText : styles.tabInactiveText}>{tab}</text>
      ))}
      <line x1="166" y1="138" x2="614" y2="138" className={styles.ribbonDivider} />

      <FormRow label="Name" value="NewEntity1" y={150} />
      <FormRow label="Description" y={182} tall />
      <FormRow label="Content ID" value="8f2c-71a0-44e1-b9a2-…" y={230} />
      <FormRow label="Last deployed" value="—" y={262} />
      <FormRow label="Last modified" value="a few seconds ago" y={294} />
      <Checkbox x={182} y={332} label="Public" checked={false} />
      <Checkbox x={280} y={332} label="Persisted" checked={true} />

      {/* Right panel: value sets */}
      <rect x="622" y="116" width="150" height="300" className={styles.panelBg} />
      <text x="632" y="134" className={styles.listItemText}>Value sets</text>
      <line x1="622" y1="142" x2="772" y2="142" className={styles.ribbonDivider} />

      {/* Status bar */}
      <rect x="8" y="440" width="756" height="16" className={styles.statusBarBg} />
      <text x="18" y="452" className={styles.statusText}>Current focus mart has 5 validation notices</text>
    </Figure>
  );
}

/* =====================================================================
   6. Compass's metadata catalog interface: a prominent search bar over a
      clean table-details view. Redrawn from scratch as a modern catalog
      UI, rather than reproducing the original's cramped tree-and-panel
      layout.
   ===================================================================== */

const BREADCRUMB = ['AdventureWorks', 'Person', 'AddressBase'];

const CODE_LINES = [
  { text: 'SELECT AddressID,', keyword: 'SELECT' },
  { text: '    AddressLine1,' },
  { text: '    AddressLine2,' },
  { text: '    City,' },
  { text: '    StateProvinceID,' },
  { text: '    PostalCode,' },
  { text: '    ModifiedDate' },
  { text: 'FROM Person.Address;', keyword: 'FROM' },
];

const META_ROWS = [
  { label: 'Database', value: 'AdventureWorks_IntakeMart' },
  { label: 'Schema', value: 'Person' },
  { label: 'Source table', value: 'Address' },
  { label: 'Data mart', value: 'AdventureWorks' },
  { label: 'Last loaded', value: 'Today, 3:31 AM' },
  { label: 'Rows', value: '19,614' },
  { label: 'Primary key', value: 'AddressID' },
];

function CodeLine({ line, y }) {
  if (!line.keyword) {
    return <text x="52" y={y} className={styles.codeText}>{line.text}</text>;
  }
  const rest = line.text.slice(line.keyword.length);
  return (
    <text x="52" y={y} className={styles.codeText}>
      <tspan className={styles.codeKeyword}>{line.keyword}</tspan>
      {rest}
    </text>
  );
}

export function CompassInterface() {
  return (
    <Figure
      titleId="cp-compass"
      title="Compass metadata catalog interface"
      desc="A metadata catalog with a prominent search bar, a breadcrumb reading AdventureWorks, Person, AddressBase, and a details card for the AddressBase table: an Active status badge, a description, the SQL binding that builds it, and a metadata panel with its database, schema, source table, data mart, last-loaded time, row count, and primary key. A footer notes it is maintained by a data steward and updates daily."
      viewBox="0 0 780 636">
      <rect x="12" y="20" width="756" height="600" rx="14" className={styles.cardShadow} />
      <rect x="8" y="8" width="756" height="600" rx="14" className={styles.card} />

      {/* Header */}
      <rect x="8" y="8" width="756" height="50" rx="14" className={styles.compassHeaderBg} />
      <rect x="8" y="38" width="756" height="20" className={styles.compassHeaderBg} />
      <circle cx="34" cy="33" r="12" className={styles.compassLogo} />
      <path d="M34,25 L38,33 L34,41 L30,33 Z" style={{ fill: 'var(--cp-navy)' }} />
      <text x="56" y="38" className={styles.compassTitle}>Compass</text>
      <text x="600" y="38" className={styles.compassHeaderNav}>Catalog</text>
      <text x="670" y="38" className={styles.compassHeaderNav}>Console</text>

      {/* Search */}
      <rect x="8" y="58" width="756" height="74" className={styles.compassLogo} opacity="0.08" />
      <ellipse cx="390" cy="99" rx="252" ry="21" className={styles.cardShadow} />
      <rect x="138" y="79" width="504" height="38" rx="19" className={styles.searchPill} />
      <circle cx="162" cy="96" r="6" className={styles.searchIcon} />
      <line x1="166.5" y1="100.5" x2="172" y2="106" className={styles.searchIcon} />
      <text x="182" y="100" className={styles.searchPlaceholder}>Search tables, columns, or descriptions…</text>

      {/* Breadcrumb */}
      {(() => {
        let x = 24;
        const nodes = [];
        BREADCRUMB.forEach((crumb, i) => {
          const isLast = i === BREADCRUMB.length - 1;
          const w = crumb.length * 6.2 + 20;
          if (!isLast) {
            nodes.push(<rect key={`${crumb}-bg`} x={x} y="138" width={w} height="22" rx="11" className={styles.crumbChip} />);
          }
          nodes.push(
            <text key={crumb} x={x + 10} y="153" className={isLast ? styles.tableTitleLg : styles.crumbText} style={isLast ? { fontSize: '12px' } : undefined}>
              {crumb}
            </text>
          );
          x += w;
          if (!isLast) {
            nodes.push(<text key={`${crumb}-sep`} x={x + 6} y="153" className={styles.crumbSep}>&#8250;</text>);
            x += 20;
          }
        });
        return nodes;
      })()}

      {/* Table details card */}
      <rect x="16" y="172" width="748" height="428" className={styles.cardShadow} />
      <rect x="16" y="160" width="748" height="428" rx="12" className={styles.card} />

      <text x="40" y="196" className={styles.tableTitleLg}>AddressBase</text>
      <rect x="192" y="182" width="58" height="20" rx="10" className={styles.statusBadgeGood} />
      <text x="221" y="196" textAnchor="middle" className={styles.statusBadgeGoodText}>Active</text>
      <rect x="258" y="182" width="124" height="20" rx="10" className={styles.infoBadge} />
      <text x="320" y="196" textAnchor="middle" className={styles.infoBadgeText}>AdventureWorks</text>

      <text x="40" y="221" className={styles.tabActiveText}>Details</text>
      <text x="100" y="221" className={styles.tabInactiveText}>Columns</text>
      <text x="162" y="221" className={styles.tabInactiveText}>Indexes</text>
      <text x="224" y="221" className={styles.tabInactiveText}>Comments (4)</text>
      <line x1="40" y1="231" x2="740" y2="231" className={styles.metaDivider} />

      {/* Left: description + binding */}
      <text x="40" y="254" className={styles.sectionLabel}>Description</text>
      <text x="40" y="271" className={styles.bodyText}>This table stores address information for a person.</text>

      <text x="40" y="301" className={styles.sectionLabel}>Binding information</text>
      <rect x="40" y="312" width="404" height="160" rx="8" className={styles.codeBlockBg} />
      {CODE_LINES.map((line, i) => (
        <CodeLine key={line.text} line={line} y={334 + i * 17} />
      ))}

      {/* Right: metadata panel */}
      <rect x="480" y="252" width="268" height="264" rx="8" className={styles.metaPanelBg} />
      {META_ROWS.map((row, i) => {
        const labelY = 282 + i * 32;
        const valueY = labelY + 16;
        const dividerY = labelY + 26;
        return (
          <g key={row.label}>
            <text x="496" y={labelY} className={styles.metaLabel}>{row.label}</text>
            <text x="496" y={valueY} className={styles.metaValue}>{row.value}</text>
            {i < META_ROWS.length - 1 && <line x1="496" y1={dividerY} x2="732" y2={dividerY} className={styles.metaDivider} />}
          </g>
        );
      })}

      {/* Footer */}
      <circle cx="56" cy="552" r="13" className={styles.stewardAvatar} />
      <text x="56" y="556" textAnchor="middle" className={styles.stewardInitial}>JD</text>
      <text x="80" y="556" className={styles.stewardText}>Maintained by a data steward</text>

      <rect x="612" y="541" width="136" height="22" rx="11" className={styles.rssBadge} />
      <text x="680" y="556" textAnchor="middle" className={styles.rssBadgeText}>Updates daily</text>
    </Figure>
  );
}

/* =====================================================================
   7. Data Warehouse Console: an ETL ops dashboard. Redrawn as a clean
      dashboard - stat cards, a filter toolbar, and a color-coded batch
      table - rather than reproducing the original's plain grid.
   ===================================================================== */

const STATS = [
  { label: 'Running', value: '1', accent: 'warn' },
  { label: 'Succeeded today', value: '12', accent: 'good' },
  { label: 'Failed', value: '1', accent: 'bad' },
];

const CONSOLE_COLS = ['Intake mart', 'Batch', 'Load type', 'Status', 'Start time', 'Duration', ''];
const CONSOLE_COL_X = [32, 162, 290, 380, 470, 592, 672];

const BATCH_ROWS = [
  { mart: 'AdventureWorks', batch: 'All tables', loadType: 'Custom', status: 'processing', start: 'Today, 3:53 PM', duration: '—', action: 'cancel' },
  { mart: 'AdventureWorks', batch: 'All tables', loadType: 'Custom', status: 'succeeded', start: 'Today, 3:30 PM', duration: '3m 38s', action: 'details' },
  { mart: 'AdventureWorks', batch: 'Person only', loadType: 'Incremental', status: 'succeeded', start: 'Today, 2:15 PM', duration: '1m 12s', action: 'details' },
  { mart: 'AdventureWorks', batch: 'Claims', loadType: 'Incremental', status: 'failed', start: 'Today, 1:05 PM', duration: '0m 45s', action: 'details' },
];

function StatCard({ x, stat }) {
  const accentClass = { good: styles.statAccentGood, warn: styles.statAccentWarn, bad: styles.statAccentBad }[stat.accent];
  return (
    <g>
      <rect x={x} y={92} width="230" height="64" rx="8" className={styles.statCard} />
      <rect x={x} y={92} width="4" height="64" rx="2" className={accentClass} />
      <text x={x + 20} y={124} className={styles.statValue}>{stat.value}</text>
      <text x={x + 20} y={142} className={styles.statLabel}>{stat.label}</text>
    </g>
  );
}

function StatusPill({ status, x, y }) {
  const config = {
    processing: { cls: styles.statusPillWarn, textCls: styles.statusPillWarnText, label: 'Processing' },
    succeeded: { cls: styles.statusPillGood, textCls: styles.statusPillGoodText, label: 'Succeeded' },
    failed: { cls: styles.statusPillBad, textCls: styles.statusPillBadText, label: 'Failed' },
  }[status];
  const w = status === 'processing' ? 76 : 68;
  return (
    <g>
      <rect x={x} y={y} width={w} height="18" rx="9" className={config.cls} />
      {status === 'processing' && <circle cx={x + 12} cy={y + 9} r="3" className={styles.pulseDot} />}
      <text x={x + (status === 'processing' ? 24 : 10)} y={y + 13} className={config.textCls}>{config.label}</text>
    </g>
  );
}

export function DataWarehouseConsoleInterface() {
  return (
    <Figure
      titleId="cp-console"
      title="Data Warehouse Console dashboard"
      desc="An ETL operations dashboard with three stat cards - 1 running, 12 succeeded today, 1 failed - a batch history filter toolbar, and a table of recent batches for AdventureWorks, each with a load type, a color-coded status (processing, succeeded, or failed), a start time, a duration, and a Details or Cancel action."
      viewBox="0 0 780 440">
      <rect x="12" y="20" width="756" height="408" rx="14" className={styles.cardShadow} />
      <rect x="8" y="8" width="756" height="408" rx="14" className={styles.card} />

      {/* Header */}
      <rect x="8" y="8" width="756" height="46" rx="14" className={styles.compassHeaderBg} />
      <rect x="8" y="34" width="756" height="20" className={styles.compassHeaderBg} />
      <circle cx="34" cy="31" r="12" className={styles.compassLogo} />
      <path d="M34,23 L38,31 L34,39 L30,31 Z" style={{ fill: 'var(--cp-navy)' }} />
      <text x="56" y="36" className={styles.compassTitle}>Data Warehouse Console</text>
      <text x="630" y="36" className={styles.compassHeaderNav}>Catalog</text>
      <text x="700" y="36" className={styles.compassHeaderNav}>Console</text>

      <text x="24" y="70" className={styles.tabInactiveText}>Data Warehouse</text>
      <text x="124" y="70" className={styles.tabActiveText}>Intake Marts</text>

      {/* Stat cards */}
      {STATS.map((stat, i) => (
        <StatCard key={stat.label} x={24 + i * 246} stat={stat} />
      ))}

      {/* Filter toolbar */}
      <text x="24" y="194" className={styles.appText}>Batch history</text>
      <path d="M118,186 a6,6 0 1 1 -1.8,4.2 M112,190 l0,-5 l5,0" className={styles.searchIcon} />

      <rect x="420" y="178" width="92" height="26" rx="13" className={styles.filterPill} />
      <text x="432" y="195" className={styles.filterText}>Today</text>
      <path d="M498,187 l4,4 l4,-4" className={styles.ribbonIcon} />

      <rect x="522" y="178" width="78" height="26" rx="13" className={styles.filterPill} />
      <text x="534" y="195" className={styles.filterText}>Any</text>
      <path d="M584,187 l4,4 l4,-4" className={styles.ribbonIcon} />

      <rect x="610" y="178" width="146" height="26" rx="13" className={styles.filterPill} />
      <circle cx="628" cy="191" r="5" className={styles.searchIcon} />
      <line x1="631.5" y1="194.5" x2="636" y2="199" className={styles.searchIcon} />
      <text x="644" y="195" className={styles.searchPlaceholder}>Search batches…</text>

      {/* Table */}
      <rect x="8" y="216" width="756" height="26" className={styles.tableHeaderBg} />
      {CONSOLE_COLS.map((col, i) => (
        <text key={col || `col-${i}`} x={CONSOLE_COL_X[i]} y="233" className={styles.tableHeaderText}>{col}</text>
      ))}

      {BATCH_ROWS.map((row, i) => {
        const y = 242 + i * 36;
        const textY = y + 22;
        return (
          <g key={`${row.batch}-${row.start}`}>
            <rect x="8" y={y} width="756" height="36" className={i % 2 === 1 ? styles.tableRowAlt : styles.tableRow} />
            <text x={CONSOLE_COL_X[0]} y={textY} className={styles.tableCellText}>{row.mart}</text>
            <text x={CONSOLE_COL_X[1]} y={textY} className={styles.tableCellText}>{row.batch}</text>
            <text x={CONSOLE_COL_X[2]} y={textY} className={styles.tableCellMuted}>{row.loadType}</text>
            <StatusPill status={row.status} x={CONSOLE_COL_X[3]} y={y + 9} />
            <text x={CONSOLE_COL_X[4]} y={textY} className={styles.tableCellMuted}>{row.start}</text>
            <text x={CONSOLE_COL_X[5]} y={textY} className={styles.tableCellMuted}>{row.duration}</text>
            {row.action === 'details' ? (
              <text x={CONSOLE_COL_X[6]} y={textY} className={styles.rowActionLink}>Details</text>
            ) : (
              <>
                <rect x={CONSOLE_COL_X[6]} y={y + 7} width="60" height="22" rx="5" className={styles.rowActionBtn} />
                <text x={CONSOLE_COL_X[6] + 12} y={textY} className={styles.rowActionBtnText}>Cancel</text>
              </>
            )}
          </g>
        );
      })}

      <text x="24" y="412" className={styles.paginationText}>Showing 1 to 4 of 4 entries</text>
    </Figure>
  );
}

/* =====================================================================
   8. Auditing architecture: production and development servers report
      to a central audit repository, reviewed from a management console.
   ===================================================================== */

function RackIcon({ x, y, badgeClass, iconClass }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" className={badgeClass} />
      <g className={iconClass}>
        <rect x={x - 7} y={y - 8} width="14" height="5" rx="1" />
        <rect x={x - 7} y={y - 1} width="14" height="5" rx="1" />
        <line x1={x - 4.5} y1={y - 5.5} x2={x - 2.5} y2={y - 5.5} />
        <line x1={x - 4.5} y1={y + 1.5} x2={x - 2.5} y2={y + 1.5} />
      </g>
    </g>
  );
}

function MonitorIcon({ x, y }) {
  return (
    <g className={styles.iconOnBadgeDark}>
      <rect x={x - 8} y={y - 7} width="16" height="11" rx="1.5" />
      <line x1={x} y1={y + 4} x2={x} y2={y + 7} />
      <line x1={x - 5} y1={y + 7} x2={x + 5} y2={y + 7} />
    </g>
  );
}

export function AuditingArchitectureDiagram() {
  return (
    <Figure
      titleId="cp-audit"
      title="Auditing architecture"
      desc="A production data warehouse server and a development data warehouse server, each with its own databases, both report to a central audit repository server, which is reviewed from a management console workstation."
      viewBox="0 0 780 360">
      <rect x="12" y="24" width="756" height="320" rx="14" className={styles.cardShadow} />
      <rect x="8" y="12" width="756" height="320" rx="14" className={styles.card} />

      <defs>
        <marker id="cp-arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" style={{ fill: 'var(--cp-blue)' }} />
        </marker>
      </defs>

      {/* Servers */}
      <rect x="40" y="40" width="330" height="86" rx="10" className={styles.serverBox} />
      <RackIcon x={70} y={68} badgeClass={styles.iconBadgeBlue} iconClass={styles.iconOnBadge} />
      <text x="98" y="64" className={styles.serverLabel}>Production server</text>
      <text x="98" y="82" className={styles.levelDesc}>Data warehouse databases</text>

      <rect x="394" y="40" width="330" height="86" rx="10" className={styles.serverBox} />
      <RackIcon x={424} y={68} badgeClass={styles.iconBadgeBlue} iconClass={styles.iconOnBadge} />
      <text x="452" y="64" className={styles.serverLabel}>Development server</text>
      <text x="452" y="82" className={styles.levelDesc}>Data warehouse databases</text>

      {/* Converging arrows */}
      <path d="M220,126 C260,150 320,160 365,178" className={styles.flowArrow} markerEnd="url(#cp-arrow2)" />
      <path d="M544,126 C504,150 444,160 399,178" className={styles.flowArrow} markerEnd="url(#cp-arrow2)" />

      {/* Repository */}
      <rect x="229" y="182" width="322" height="70" rx="10" className={styles.repoBox} />
      <RackIcon x={263} y={217} badgeClass={styles.iconBadgeTeal} iconClass={styles.iconOnBadgeDark} />
      <text x="291" y="213" className={styles.repoLabel}>Audit repository server</text>
      <text x="291" y="230" className={styles.repoSubText}>Central audit log storage</text>

      <path d="M390,252 L390,280" className={styles.flowArrow} markerEnd="url(#cp-arrow2)" />

      {/* Console */}
      <rect x="290" y="284" width="200" height="58" rx="10" className={styles.serverBox} />
      <circle cx="322" cy="313" r="16" className={styles.iconBadgeTeal} />
      <MonitorIcon x={322} y={313} />
      <text x="350" y="309" className={styles.serverLabel}>Management console</text>
      <text x="350" y="326" className={styles.levelDesc}>Reviewed by an administrator</text>
    </Figure>
  );
}

/* =====================================================================
   9. Rapid Data Entry Application: a custom, publishable data-entry
      form. Redrawn as a clean two-column form with softer validation
      cues, rather than reproducing the original's dense single column
      of red error icons.
   ===================================================================== */

function RequiredField({ x, y, label, boxWidth = 300, empty }) {
  return (
    <g>
      <circle cx={x} cy={y - 4} r="2.5" className={styles.requiredDot} />
      <text x={x + 10} y={y} className={styles.fieldLabel}>{label}</text>
      <rect x={x} y={y + 8} width={boxWidth} height="32" rx="6" className={empty ? styles.fieldBoxWarn : styles.fieldBox} />
      {empty && (
        <g>
          <circle cx={x + boxWidth - 18} cy={y + 24} r="8" className={styles.validationBadge} />
          <text x={x + boxWidth - 18} y={y + 28} textAnchor="middle" className={styles.validationMark}>!</text>
        </g>
      )}
    </g>
  );
}

function PlainField({ x, y, label, boxWidth = 300, boxHeight = 32 }) {
  return (
    <g>
      <text x={x} y={y} className={styles.fieldLabel}>{label}</text>
      <rect x={x} y={y + 8} width={boxWidth} height={boxHeight} rx="6" className={styles.fieldBox} />
    </g>
  );
}

function DateField({ x, y, label, boxWidth = 300 }) {
  return (
    <g>
      <text x={x} y={y} className={styles.fieldLabel}>{label}</text>
      <rect x={x} y={y + 8} width={boxWidth} height="32" rx="6" className={styles.fieldBox} />
      <g className={styles.calendarIcon} transform={`translate(${x + boxWidth - 24}, ${y + 16})`}>
        <rect x="0" y="0" width="14" height="13" rx="2" />
        <line x1="0" y1="4" x2="14" y2="4" />
        <line x1="3.5" y1="-2" x2="3.5" y2="1" />
        <line x1="10.5" y1="-2" x2="10.5" y2="1" />
      </g>
    </g>
  );
}

function ToggleSwitch({ x, y, label, on }) {
  return (
    <g>
      <text x={x} y={y} className={styles.fieldLabel}>{label}</text>
      <rect x={x} y={y + 10} width="36" height="18" rx="9" className={on ? styles.toggleTrackOn : styles.toggleTrackOff} />
      <circle cx={on ? x + 27 : x + 9} cy={y + 19} r="7" className={styles.toggleKnob} />
    </g>
  );
}

export function RapidDataEntryInterface() {
  return (
    <Figure
      titleId="cp-rde"
      title="Rapid Data Entry Application form builder"
      desc="A custom data-entry form named Patient Demo, under Applications, with Main, Blood Work, and Family History tabs. The Main tab shows required fields Patient Name and Age flagged as incomplete, plus Weight, an On Medication toggle, a Description of Medications field, and Meds Last Taken and Visit Date fields with calendar pickers. A Draft badge and Publish button sit near the top."
      viewBox="0 0 780 420">
      <rect x="12" y="20" width="756" height="388" rx="14" className={styles.cardShadow} />
      <rect x="8" y="8" width="756" height="388" rx="14" className={styles.card} />

      {/* Header */}
      <rect x="8" y="8" width="756" height="46" rx="14" className={styles.compassHeaderBg} />
      <rect x="8" y="34" width="756" height="20" className={styles.compassHeaderBg} />
      <circle cx="34" cy="31" r="12" className={styles.compassLogo} />
      <path d="M34,23 L38,31 L34,39 L30,31 Z" style={{ fill: 'var(--cp-navy)' }} />
      <text x="56" y="36" className={styles.compassTitle}>Clearpath</text>
      <text x="630" y="36" className={styles.compassHeaderNav}>Catalog</text>
      <text x="700" y="36" className={styles.compassHeaderNav}>Console</text>

      {/* Breadcrumb + actions */}
      <text x="24" y="70" className={styles.tabInactiveText}>Applications</text>
      <text x="100" y="70" className={styles.crumbSep}>&#8250;</text>
      <text x="116" y="70" className={styles.tableTitleLg} style={{ fontSize: '12px' }}>Patient Demo</text>

      <rect x="612" y="58" width="52" height="20" rx="10" className={styles.draftBadge} />
      <text x="638" y="72" textAnchor="middle" className={styles.draftBadgeText}>Draft</text>
      <rect x="672" y="58" width="80" height="20" rx="10" className={styles.publishBtn} />
      <text x="712" y="72" textAnchor="middle" className={styles.publishBtnText}>Publish</text>

      {/* Tabs */}
      <text x="24" y="96" className={styles.tabActiveText}>Main</text>
      <text x="66" y="96" className={styles.tabInactiveText}>Blood Work</text>
      <text x="134" y="96" className={styles.tabInactiveText}>Family History</text>
      <line x1="24" y1="104" x2="756" y2="104" className={styles.ribbonDivider} />

      {/* Form - left column */}
      <RequiredField x={40} y={132} label="PatientName" empty />
      <RequiredField x={40} y={196} label="Age" empty />
      <PlainField x={40} y={260} label="Weight" />
      <ToggleSwitch x={40} y={324} label="OnMedication" on={false} />

      {/* Form - right column */}
      <PlainField x={400} y={132} label="DescriptionOfMedications" boxHeight="56" />
      <DateField x={400} y={212} label="MedsLastTakenDateTime" />
      <DateField x={400} y={276} label="VisitDate" />
    </Figure>
  );
}
