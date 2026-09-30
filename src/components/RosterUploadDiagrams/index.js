import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

/* Screen mockups for /portfolio/ux-writing-data-upload. All content is
   illustrative, not a screenshot of the actual product (see IMPORTANT note
   on the page). Built as SVG so the wording stays easy to edit and the
   colors follow the site's light/dark theme.

   The viewBox is sized close to the article's actual rendered width (not a
   large screenshot-style canvas scaled way down), so type stays legible at
   1:1 instead of shrinking to a fraction of its nominal size. */

const CARD_X = 16;
const CARD_W = 688;
const CONTENT_X = CARD_X + 32;
const CONTENT_W = CARD_W - 64;

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
      {caption && (
        <figcaption className={styles.caption}>
          <RichHtml text={caption} />
        </figcaption>
      )}
    </figure>
  );
}

// Shared chrome: badge pill, card, navbar, tabs. Returns the y where screen
// content can start.
function Chrome({ id, kind, badgeText, cardTop, cardHeight }) {
  const navH = 56;
  const tabsH = 44;
  return (
    <>
      <rect x={CARD_X} y={cardTop + 6} width={CARD_W} height={cardHeight} rx={12} className={styles.cardShadow} />
      <clipPath id={`ru-clip-${id}`}>
        <rect x={CARD_X} y={cardTop} width={CARD_W} height={cardHeight} rx={12} />
      </clipPath>
      <g clipPath={`url(#ru-clip-${id})`}>
        <rect x={CARD_X} y={cardTop} width={CARD_W} height={cardHeight} className={styles.card} />
        <rect x={CARD_X} y={cardTop} width={CARD_W} height={navH} className={styles.navbar} />
        <rect x={CONTENT_X} y={cardTop + 16} width={24} height={24} rx={6} className={styles.logo} />
        <text x={CONTENT_X + 34} y={cardTop + 33} className={styles.title}>Data App</text>
        <text x={CARD_X + CARD_W - 24} y={cardTop + 33} textAnchor="end" className={styles.crumb}>
          Data segment &#8250; Data ingestion
        </text>

        <text x={CONTENT_X} y={cardTop + navH + 26} className={styles.tabOff}>Overview</text>
        <text x={CONTENT_X + 78} y={cardTop + navH + 26} className={styles.tabOn}>Import data</text>
        <rect x={CONTENT_X + 78} y={cardTop + navH + 34} width={72} height={2.5} className={styles.tabRule} />
        <line x1={CARD_X} y1={cardTop + navH + tabsH} x2={CARD_X + CARD_W} y2={cardTop + navH + tabsH} className={styles.divider} />
      </g>
      <rect x={CARD_X} y={cardTop - 34} width={badgeText === 'BEFORE' ? 78 : 66} height={26} rx={13} className={kind === 'bad' ? styles.badgeBad : styles.badgeGood} />
      <text
        x={CARD_X + (badgeText === 'BEFORE' ? 39 : 33)}
        y={cardTop - 16}
        textAnchor="middle"
        className={kind === 'bad' ? styles.badgeBadText : styles.badgeGoodText}>
        {badgeText}
      </text>
    </>
  );
}

function UploadIcon({ x, y }) {
  return <path d={`M${x} ${y} v-11 m-5.5 5.5 l5.5 -5.5 l5.5 5.5 M${x - 6} ${y + 5} h12`} className={styles.icon} />;
}

// Parses <b>/<strong> and <i>/<em> tags out of a plain string and hands each
// match to renderTag(tag, content, key), interleaved with the surrounding
// plain-text runs. Shared by Rich (SVG tspans) and RichHtml (real HTML
// elements) below, since captions render outside the <svg> as normal DOM.
function parseRich(text, renderTag) {
  const nodes = [];
  const tagRe = /<(b|strong|i|em)>(.*?)<\/\1>/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = tagRe.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(renderTag(match[1], match[2], key++));
    lastIndex = tagRe.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

// SVG <text> can't take arbitrary HTML, but it can take <tspan>. This turns
// <b>/<strong> and <i>/<em> tags in annotation copy into styled tspans, e.g.
// 'Plural <i>Files</i>, but the import accepts only one file.'
function Rich({ text }) {
  return parseRich(text, (tag, content, key) => {
    const bold = tag === 'b' || tag === 'strong';
    return (
      <tspan key={key} className={bold ? styles.emph : styles.italic}>
        {content}
      </tspan>
    );
  });
}

// Same idea for a <figcaption>, which is real HTML outside the <svg> —
// React escapes a raw '<i>...</i>' string instead of rendering it, so this
// turns the same tags into actual <strong>/<em> elements.
function RichHtml({ text }) {
  return parseRich(text, (tag, content, key) => {
    const bold = tag === 'b' || tag === 'strong';
    return bold ? <strong key={key}>{content}</strong> : <em key={key}>{content}</em>;
  });
}

// Places a badge exactly at the end of a line of text. A character-count
// estimate drifts depending on which letters are in the string (it was
// visibly off), so this measures the actual rendered text with
// getComputedTextLength() instead of guessing.
function useBadgeX(anchorX, gap, fallback) {
  const ref = useRef(null);
  const [x, setX] = useState(anchorX + fallback + gap);
  useEffect(() => {
    if (ref.current) setX(anchorX + ref.current.getComputedTextLength() + gap);
  });
  return [ref, x];
}

// Upload button + "Or drop a file" label, sized around the label text so the
// icon and text are actually centered inside the button (instead of a
// fixed-width button with hardcoded icon/text offsets that only happened to
// line up for one specific label).
function UploadControl({ centerX, y, label, mutedText }) {
  const btnH = 34;
  const iconW = 12;
  const iconGap = 8;
  const padX = 18;
  const textW = label.length * 7.3; // approx width of bold 13px Arial
  const btnW = Math.round(iconW + iconGap + textW + padX * 2);
  const mutedW = mutedText.length * 6.6; // approx width of regular 13px Arial
  const comboGap = 16;
  const startX = centerX - (btnW + comboGap + mutedW) / 2;
  const iconCenterX = startX + padX + iconW / 2;
  const textX = startX + padX + iconW + iconGap;
  const mutedX = startX + btnW + comboGap;

  // UploadIcon's bounding box runs from (its y - 11), the arrow tip, to
  // (its y + 5), the tray bar — so its own vertical center sits 3px above
  // the y passed to it. Offset by +3 so the icon is actually centered on
  // the button's vertical center, not 5px above it.
  return (
    <>
      <rect x={startX} y={y - btnH / 2} width={btnW} height={btnH} rx={5} className={styles.btn} />
      <UploadIcon x={iconCenterX} y={y + 3} />
      <text x={textX} y={y + 5} className={styles.btnText}>{label}</text>
      <text x={mutedX} y={y + 5} className={styles.muted}>{mutedText}</text>
    </>
  );
}

/* =====================================================================
   1. Before: the original upload screen
   ===================================================================== */

export function UploadScreenBefore() {
  const cardTop = 44;
  const navTabsH = 100; // navbar (56) + tabs (44), matches the divider line in Chrome
  const headingY = cardTop + navTabsH + 34;

  const lines = [
    'Upload a CSV to import data. Data must be formatted correctly to',
  ];
  const lineH = 21;
  const bodyStartY = headingY + 34;
  const bodyEndY = bodyStartY + (lines.length - 1) * lineH;

  const dashY = bodyEndY + 30;
  const dashH = 64;
  const successY = dashY + dashH + 16;
  const successH = 36;
  const cardBottom = successY + successH + 24;
  const cardHeight = cardBottom - cardTop;

  const footerY = cardBottom + 30;
  const annotStartY = footerY + 30;
  const annotLineH = 25;

  const annotations = [
    'Plural <i>Files</i>, but the import accepts only one file.',
    'Instructions cut off mid-sentence.',
    'No formatting rules explained, and no link to help.',
  ];

  const viewH = annotStartY + annotations.length * annotLineH + 10;

  // Each numbered badge sits right next to the thing it's calling out,
  // rather than lined up along the card's right edge.
  const [headingRef, badge1X] = useBadgeX(CONTENT_X, 25, 150);
  const [lastLineRef, badge2X] = useBadgeX(CONTENT_X, 25, 450);

  return (
    <Figure
      titleId="ru-before"
      title="Mockup of the original upload screen"
      desc="A screen titled Upload Files with instructions cut off mid-sentence. Below, a dashed drop zone with an Upload Files button and Or drop files, and a success message reading 1 of 1 files uploaded. Three notes below flag the plural wording for a single-file feature, the instructions cut off mid-sentence, and the missing formatting rules and help link."
      viewBox={`0 0 720 ${viewH}`}
      >
      <rect width={720} height={viewH} className={styles.page} />
      <Chrome id="before" kind="bad" badgeText="BEFORE" cardTop={cardTop} cardHeight={cardHeight} />

      <text ref={headingRef} x={CONTENT_X} y={headingY} className={styles.heading}>Upload Files</text>
      <circle cx={badge1X} cy={headingY - 7} r={11} className={styles.numBad} />
      <text x={badge1X} y={headingY - 3} textAnchor="middle" className={styles.numText}>1</text>

      {lines.map((line, i) => (
        <text
          key={line}
          ref={i === lines.length - 1 ? lastLineRef : undefined}
          x={CONTENT_X}
          y={bodyStartY + i * lineH}
          className={styles.body}>
          {line}
        </text>
      ))}
      <circle cx={badge2X} cy={bodyEndY - 5} r={11} className={styles.numBad} />
      <text x={badge2X} y={bodyEndY - 1} textAnchor="middle" className={styles.numText}>2</text>

      <rect x={CONTENT_X} y={dashY} width={CONTENT_W} height={dashH} rx={6} className={styles.dash} />
      <circle cx={CONTENT_X} cy={dashY} r={11} className={styles.numBad} />
      <text x={CONTENT_X} y={dashY + 4} textAnchor="middle" className={styles.numText}>3</text>

      <UploadControl centerX={CONTENT_X + CONTENT_W / 2} y={dashY + dashH / 2} label="Upload Files" mutedText="Or drop files" />

      <rect x={CONTENT_X} y={successY} width={CONTENT_W} height={successH} rx={6} className={styles.successBox} />
      <text x={CONTENT_X + 16} y={successY + 23} className={styles.successText}>&#10003; 1 of 1 files uploaded</text>

      <text x={CARD_X + CARD_W} y={footerY} textAnchor="end" className={styles.footerNote}>
        Illustrative mockup. Not the actual product interface.
      </text>

      {annotations.map((line, i) => (
        <g key={line}>
          <text x={CARD_X} y={annotStartY + i * annotLineH} className={styles.annotBad}>{i + 1}</text>
          <text x={CARD_X + 18} y={annotStartY + i * annotLineH} className={styles.annotText}><Rich text={line} /></text>
        </g>
      ))}
    </Figure>
  );
}

/* =====================================================================
   2. After: the improved upload screen
   ===================================================================== */

const RULES = [
  'Include all data in a single tab of a single CSV file.',
  'Put addresses in a single field.',
  'Give each column heading a unique name.',
  "Remove all columns you don't want to import.",
];

const IMPACTS = [
  'Task-first heading, in the singular.',
  'Four rules a user can check against their file before uploading.',
  "A link to the full guidelines in the Help Center.",
];

export function UploadScreenAfter() {
  const cardTop = 44;
  const navTabsH = 100;
  const headingY = cardTop + navTabsH + 34;

  const ruleStartY = headingY + 40;
  const ruleLineH = 30;
  const rulesEndY = ruleStartY + (RULES.length - 1) * ruleLineH;

  const linkY = rulesEndY + 40;
  const dashY = linkY + 22;
  const dashH = 64;
  const cardBottom = dashY + dashH + 24;
  const cardHeight = cardBottom - cardTop;

  const footerY = cardBottom + 30;
  const annotStartY = footerY + 30;
  const annotLineH = 25;

  const viewH = annotStartY + IMPACTS.length * annotLineH + 10;

  return (
    <Figure
      titleId="ru-after"
      title="Mockup of the improved upload screen"
      desc="A screen titled Upload a CSV file, followed by Make sure to: and four checked rules: include all data in a single tab of a single CSV file, put addresses in a single field, give each column heading a unique name, and remove all columns you don't want to import. A link to CSV formatting guidelines follows, then a dashed drop zone with an Upload file button and Or drop a file. Three notes below point out the task-first singular heading, the four checkable rules, and the link to full guidelines placed right where it's needed."
      viewBox={`0 0 720 ${viewH}`}
      caption="After: a task-first heading in the singular, four specific rules a user can check before uploading, and a link to the full guidelines.">
      <rect width={720} height={viewH} className={styles.page} />
      <Chrome id="after" kind="good" badgeText="AFTER" cardTop={cardTop} cardHeight={cardHeight} />

      <text x={CONTENT_X} y={headingY} className={styles.heading}>Upload a CSV file</text>

      {RULES.map((rule, i) => {
        const y = ruleStartY + i * ruleLineH;
        return (
          <g key={rule}>
            <circle cx={CONTENT_X + 9} cy={y - 5} r={9} className={styles.checkDot} />
            <text x={CONTENT_X + 9} y={y - 2} textAnchor="middle" className={styles.check}>&#10003;</text>
            <text x={CONTENT_X + 26} y={y} className={styles.body}>{rule}</text>
          </g>
        );
      })}

      <text x={CONTENT_X} y={linkY} className={styles.link}>CSV formatting guidelines &#8599;</text>

      <rect x={CONTENT_X} y={dashY} width={CONTENT_W} height={dashH} rx={6} className={styles.dash} />
      <UploadControl centerX={CONTENT_X + CONTENT_W / 2} y={dashY + dashH / 2} label="Upload file" mutedText="Or drop a file" />

      <text x={CARD_X + CARD_W} y={footerY} textAnchor="end" className={styles.footerNote}>
        Illustrative mockup. Not the actual product interface.
      </text>

      {IMPACTS.map((line, i) => (
        <g key={line}>
          <text x={CARD_X} y={annotStartY + i * annotLineH} className={styles.annotGood}>&#10003;</text>
          <text x={CARD_X + 18} y={annotStartY + i * annotLineH} className={styles.annotText}><Rich text={line} /></text>
        </g>
      ))}
    </Figure>
  );
}
