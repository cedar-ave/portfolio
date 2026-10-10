import React from 'react';
import styles from './styles.module.css';

/* Relationship-type diagrams for /samples/clearpath-roster-guide/
   choose-a-relationship-type. Built as SVG (not screenshots) so colors follow
   the site's light/dark theme - same Figure/card conventions as
   ClearpathPlatformDiagrams.

   Color coding is shared across all four diagrams: carrier objects are blue,
   producer objects are teal, the junction object is gold, and sub-objects are
   neutral cards.

   Arrows: every connector is a cubic curve whose control points sit at the
   midpoint between its ends, so fans are mirror-symmetric around the
   straight middle connector. Paths stop TIP px short of their target and the
   arrowhead marker extends the remaining TIP px, so heads land exactly on
   box edges without the line poking through the point. */

const TIP = 3;
const VIEW_W = 780;
const CENTER_X = VIEW_W / 2;

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

// Arrowhead (and start-dot) markers in each color. Marker ids must be unique
// per page, so they're prefixed with the diagram's id.
const TONES = ['slate', 'blue', 'teal'];
const HEAD_CLASS = { slate: styles.headSlate, blue: styles.headBlue, teal: styles.headTeal };
const LINE_CLASS = { slate: styles.lineSlate, blue: styles.lineBlue, teal: styles.lineTeal };

function Markers({ id }) {
  return (
    <defs>
      {TONES.map((tone) => (
        <React.Fragment key={tone}>
          <marker
            id={`${id}-head-${tone}`}
            viewBox="0 0 10 10"
            refX={10 - TIP}
            refY="5"
            markerWidth="10"
            markerHeight="10"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9 Z" className={HEAD_CLASS[tone]} />
          </marker>
          <marker
            id={`${id}-dot-${tone}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            markerUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="4" className={HEAD_CLASS[tone]} />
          </marker>
        </React.Fragment>
      ))}
    </defs>
  );
}

// Horizontal connector: leaves (x1, y1) and arrives at (x2, y2) horizontally.
function hCurve(x1, y1, x2, y2, { trimStart = 0 } = {}) {
  const dir = Math.sign(x2 - x1);
  const sx = x1 + dir * trimStart;
  const ex = x2 - dir * TIP;
  const mx = (x1 + x2) / 2;
  return `M${sx},${y1} C${mx},${y1} ${mx},${y2} ${ex},${y2}`;
}

// Vertical connector: leaves (x1, y1) and arrives at (x2, y2) vertically.
function vCurve(x1, y1, x2, y2, { trimStart = 0 } = {}) {
  const dir = Math.sign(y2 - y1);
  const sy = y1 + dir * trimStart;
  const ey = y2 - dir * TIP;
  const my = (y1 + y2) / 2;
  return `M${x1},${sy} C${x1},${my} ${x2},${my} ${x2},${ey}`;
}

function Arrow({ id, d, tone = 'slate', start = 'dot' }) {
  return (
    <path
      d={d}
      className={LINE_CLASS[tone]}
      markerEnd={`url(#${id}-head-${tone})`}
      markerStart={start === 'dot' ? `url(#${id}-dot-${tone})` : start === 'head' ? `url(#${id}-head-${tone})` : undefined}
    />
  );
}

const KIND = {
  carrier: { fill: styles.carrierFill, band: styles.carrierBand, stroke: styles.carrierStroke },
  producer: { fill: styles.producerFill, band: styles.producerBand, stroke: styles.producerStroke },
  junction: { fill: styles.junctionFill, band: styles.junctionBand, stroke: styles.junctionStroke },
  neutral: { fill: styles.neutralFill, band: styles.neutralFill, stroke: styles.neutralStroke },
};

// A single object box with a bold title and optional muted subtitle.
function Entity({ x, y, w, h, kind, title, subtitle }) {
  const k = KIND[kind];
  const cx = x + w / 2;
  const titleY = subtitle ? y + h / 2 - 2 : y + h / 2 + 5;
  return (
    <g>
      <rect x={x + 2} y={y + 4} width={w} height={h} rx="10" className={styles.shadow} />
      <rect x={x} y={y} width={w} height={h} rx="10" className={`${k.fill} ${k.stroke}`} />
      <text x={cx} y={titleY} textAnchor="middle" className={styles.entityTitle}>{title}</text>
      {subtitle && (
        <text x={cx} y={titleY + 19} textAnchor="middle" className={styles.entitySub}>{subtitle}</text>
      )}
    </g>
  );
}

// A table-style card: tinted header band with title and subtitle over a
// plain body. Children draw the body content.
function TableCard({ id, x, y, w, h, headerH = 56, kind, title, subtitle, children }) {
  const k = KIND[kind];
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x + 2} y={y + 4} width={w} height={h} rx="10" className={styles.shadow} />
      <clipPath id={`${id}-clip`}>
        <rect x={x} y={y} width={w} height={h} rx="10" />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x={x} y={y} width={w} height={h} className={styles.body} />
        <rect x={x} y={y} width={w} height={headerH} className={k.band} />
        <line x1={x} y1={y + headerH} x2={x + w} y2={y + headerH} className={k.stroke} />
      </g>
      <text x={cx} y={y + 25} textAnchor="middle" className={styles.entityTitle}>{title}</text>
      <text x={cx} y={y + 44} textAnchor="middle" className={styles.entitySub}>{subtitle}</text>
      {children}
      <rect x={x} y={y} width={w} height={h} rx="10" className={`${styles.noFill} ${k.stroke}`} />
    </g>
  );
}

function FieldChip({ x, y, w, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="14" className={styles.chip} />
      <text x={x + w / 2} y={y + 18.5} textAnchor="middle" className={styles.chipText}>{label}</text>
    </g>
  );
}

function Pill({ cx, cy, w, label }) {
  return (
    <g>
      <rect x={cx - w / 2} y={cy - 13} width={w} height="26" rx="13" className={styles.pill} />
      <text x={cx} y={cy + 4.5} textAnchor="middle" className={styles.pillText}>{label}</text>
    </g>
  );
}

function SideLabel({ x, y, label }) {
  return (
    <text x={x} y={y} className={styles.sideLabel}>{label}</text>
  );
}

/* Seven sub-objects in an evenly spaced row, each fanned into the bottom
   edge of the Contact box. Arrival points are spread evenly and centered
   under the box, so the fan mirrors around the straight middle connector. */

const SUB_OBJECTS = [
  ['Education'],
  ['Training'],
  ['Branch', 'Locations'],
  ['Designations'],
  ['License'],
  ['Non-Resident', 'Licenses'],
  ['E&O', 'Insurance'],
];

function SubObjectFan({ id, top, targetY }) {
  const boxW = 100;
  const boxH = 56;
  const gap = 10;
  const rowW = SUB_OBJECTS.length * boxW + (SUB_OBJECTS.length - 1) * gap;
  const startX = CENTER_X - rowW / 2;
  const spread = 24;
  const mid = (SUB_OBJECTS.length - 1) / 2;

  return (
    <g>
      {SUB_OBJECTS.map((lines, i) => {
        const bx = startX + i * (boxW + gap);
        const cx = bx + boxW / 2;
        const ex = CENTER_X + (i - mid) * spread;
        return (
          <g key={lines.join(' ')}>
            <Arrow id={id} d={vCurve(cx, top, ex, targetY)} />
            <rect x={bx + 2} y={top + 4} width={boxW} height={boxH} rx="8" className={styles.shadow} />
            <rect x={bx} y={top} width={boxW} height={boxH} rx="8" className={`${styles.neutralFill} ${styles.neutralStroke}`} />
            {lines.map((line, j) => (
              <text
                key={line}
                x={cx}
                y={top + boxH / 2 + 5 + (j - (lines.length - 1) / 2) * 17}
                textAnchor="middle"
                className={styles.subText}>
                {line}
              </text>
            ))}
          </g>
        );
      })}
      <text x={CENTER_X} y={top + boxH + 28} textAnchor="middle" className={styles.groupLabel}>
        Sub-objects of Contact
      </text>
    </g>
  );
}

/* =====================================================================
   1. Related record: three producers each reference one carrier through
      the Account ID field.
   ===================================================================== */

export function RelatedRecordDiagram() {
  const id = 'rr-related';
  const carrier = { x: 40, y: 116, w: 240, h: 140 };
  const producer = { x: 500, y: 16, w: 240, h: 320 };
  const carrierChipY = 216;
  const producerChipYs = [136, 216, 296];
  const chipW = 200;

  return (
    <Figure
      titleId={id}
      title="Related record relationship"
      desc="A Carrier card, the Account object in Clearpath, has an Account ID field. A Producer card, the Contact object in Clearpath, lists Producer A, Producer B, and Producer C, each with its own Account ID field. Arrows run from each producer's Account ID to the carrier's Account ID, labeled Related record."
      viewBox={`0 0 ${VIEW_W} 352`}>
      <Markers id={id} />

      <TableCard id={`${id}-carrier`} {...carrier} kind="carrier" title="Carrier" subtitle="Account object in Clearpath">
        <FieldChip x={carrier.x + (carrier.w - chipW) / 2} y={carrierChipY - 14} w={chipW} label="Account ID" />
      </TableCard>

      <TableCard id={`${id}-producer`} {...producer} kind="producer" title="Producer" subtitle="Contact object in Clearpath">
        {producerChipYs.map((cy, i) => (
          <g key={cy}>
            {i > 0 && (
              <line x1={producer.x} y1={cy - 48} x2={producer.x + producer.w} y2={cy - 48} className={styles.rowRule} />
            )}
            <text x={producer.x + 20} y={cy - 22} className={styles.rowTitle}>
              Producer {String.fromCharCode(65 + i)}
            </text>
            <FieldChip x={producer.x + 20} y={cy - 14} w={chipW} label="Account ID" />
          </g>
        ))}
      </TableCard>

      {producerChipYs.map((cy) => (
        <Arrow key={cy} id={id} d={hCurve(producer.x + 20, cy, carrier.x + (carrier.w + chipW) / 2, carrierChipY)} />
      ))}
      <Pill cx={430} cy={carrierChipY} w={116} label="Related record" />
    </Figure>
  );
}

/* =====================================================================
   2. Related record example: Contact references Account; seven
      sub-objects reference Contact.
   ===================================================================== */

export function RelatedRecordExampleDiagram() {
  const id = 'rr-related-ex';
  const boxW = 200;
  const x = CENTER_X - boxW / 2;

  return (
    <Figure
      titleId={id}
      title="Related record example"
      desc="Contact (Producer) points up to Account (Carrier) through its Account ID field. Seven sub-objects - Education, Training, Branch Locations, Designations, License, Non-Resident Licenses, and E&O Insurance - each point up to Contact."
      viewBox={`0 0 ${VIEW_W} 396`}>
      <Markers id={id} />

      <Arrow id={id} d={vCurve(CENTER_X, 146, CENTER_X, 86)} />
      <SideLabel x={CENTER_X + 14} y={121} label="Account ID" />

      <Entity x={x} y={16} w={boxW} h={70} kind="carrier" title="Account" subtitle="(Carrier)" />
      <Entity x={x} y={146} w={boxW} h={64} kind="producer" title="Contact" subtitle="(Producer)" />

      <SubObjectFan id={id} top={296} targetY={210} />
    </Figure>
  );
}

/* =====================================================================
   3. Junction object: Producer Appointment rows pair carriers with
      producers, many-to-many.
   ===================================================================== */

const APPOINTMENTS = [
  ['Carrier A', 'Producer A'],
  ['Carrier B', 'Producer A'],
  ['Carrier B', 'Producer B'],
];

export function JunctionObjectDiagram() {
  const id = 'rr-junction';
  const side = { w: 170, y: 76, h: 136 };
  const carrierX = 16;
  const producerX = VIEW_W - 16 - side.w;
  const junction = { x: 276, y: 16, w: 228, h: 216 };
  const colL = junction.x + junction.w / 4;
  const colR = junction.x + (junction.w * 3) / 4;
  const rowYs = [132, 172, 212];
  // Side-table rows sit halfway between junction rows, so every connector
  // shifts by the same half-row up or down.
  const sideRowYs = { 'Carrier A': 152, 'Carrier B': 192, 'Producer A': 152, 'Producer B': 192 };

  const sideRows = (x, names) =>
    names.map((name, i) => (
      <g key={name}>
        {i > 0 && <line x1={x} y1={sideRowYs[name] - 20} x2={x + side.w} y2={sideRowYs[name] - 20} className={styles.rowRule} />}
        <text x={x + side.w / 2} y={sideRowYs[name] + 5} textAnchor="middle" className={styles.cellText}>{name}</text>
      </g>
    ));

  return (
    <Figure
      titleId={id}
      title="Junction object relationship"
      desc="The Producer Appointment junction object has a Carrier parent field and a Producer child field, with three rows: Carrier A with Producer A, Carrier B with Producer A, and Carrier B with Producer B. Arrows link each row's carrier to the Carrier table, the Account object, and each row's producer to the Producer table, the Contact object. Producer A is linked to two carriers; Producer B to one."
      viewBox={`0 0 ${VIEW_W} 252`}>
      <Markers id={id} />

      <TableCard id={`${id}-carrier`} x={carrierX} {...side} kind="carrier" title="Carrier" subtitle="Account object">
        {sideRows(carrierX, ['Carrier A', 'Carrier B'])}
      </TableCard>

      <TableCard id={`${id}-producer`} x={producerX} {...side} kind="producer" title="Producer" subtitle="Contact object">
        {sideRows(producerX, ['Producer A', 'Producer B'])}
      </TableCard>

      <TableCard id={`${id}-junction`} {...junction} kind="junction" title="Producer Appointment" subtitle="Junction object">
        <rect x={junction.x} y={72} width={junction.w} height={40} className={styles.colHeadBg} />
        <line x1={junction.x} y1={112} x2={junction.x + junction.w} y2={112} className={styles.junctionStroke} />
        <line x1={CENTER_X} y1={72} x2={CENTER_X} y2={junction.y + junction.h} className={styles.rowRule} />
        <text x={colL} y={89} textAnchor="middle" className={styles.rowTitle}>Carrier</text>
        <text x={colL} y={104} textAnchor="middle" className={styles.colSub}>Parent field</text>
        <text x={colR} y={89} textAnchor="middle" className={styles.rowTitle}>Producer</text>
        <text x={colR} y={104} textAnchor="middle" className={styles.colSub}>Child field</text>
        {APPOINTMENTS.map(([c, p], i) => (
          <g key={`${c}-${p}`}>
            {i > 0 && <line x1={junction.x} y1={rowYs[i] - 20} x2={junction.x + junction.w} y2={rowYs[i] - 20} className={styles.rowRule} />}
            <text x={colL} y={rowYs[i] + 5} textAnchor="middle" className={styles.cellText}>{c}</text>
            <text x={colR} y={rowYs[i] + 5} textAnchor="middle" className={styles.cellText}>{p}</text>
          </g>
        ))}
      </TableCard>

      {APPOINTMENTS.map(([c, p], i) => (
        <g key={`arrows-${i}`}>
          <Arrow id={id} tone="blue" d={hCurve(junction.x, rowYs[i], carrierX + side.w, sideRowYs[c])} />
          <Arrow id={id} tone="teal" d={hCurve(junction.x + junction.w, rowYs[i], producerX, sideRowYs[p])} />
        </g>
      ))}
    </Figure>
  );
}

/* =====================================================================
   4. Junction object example: Producer Appointment links Carrier and
      Contact; seven sub-objects reference Contact.
   ===================================================================== */

export function JunctionObjectExampleDiagram() {
  const id = 'rr-junction-ex';

  return (
    <Figure
      titleId={id}
      title="Junction object example"
      desc="Producer Appointment, the junction object, points up to Account or Carrier Network (Carrier) through its parent field, and has a two-way link down to Contact (Producer) through its child field. Seven sub-objects - Education, Training, Branch Locations, Designations, License, Non-Resident Licenses, and E&O Insurance - each point up to Contact."
      viewBox={`0 0 ${VIEW_W} 512`}>
      <Markers id={id} />

      <Arrow id={id} d={vCurve(CENTER_X, 146, CENTER_X, 86)} />
      <SideLabel x={CENTER_X + 14} y={121} label="Parent field" />
      <Arrow id={id} start="head" d={vCurve(CENTER_X, 202 + TIP, CENTER_X, 262)} />
      <SideLabel x={CENTER_X + 14} y={237} label="Child field" />

      <Entity x={CENTER_X - 120} y={16} w={240} h={70} kind="carrier" title="Account or Carrier Network" subtitle="(Carrier)" />
      <Entity x={CENTER_X - 100} y={146} w={200} h={56} kind="junction" title="Producer Appointment" subtitle="Junction object" />
      <Entity x={CENTER_X - 100} y={262} w={200} h={64} kind="producer" title="Contact" subtitle="(Producer)" />

      <SubObjectFan id={id} top={412} targetY={326} />
    </Figure>
  );
}
