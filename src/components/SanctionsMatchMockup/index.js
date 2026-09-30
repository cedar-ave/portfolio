import React from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Small icon pieces
   ===================================================================== */

// Circular badge with a checkmark, used next to "Source".
function CheckBadge({ x, y, r = 8 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={0} r={r} className={styles.checkBadgeBg} />
      <path d={`M${-r * 0.45},0 L${-r * 0.1},${r * 0.4} L${r * 0.45},${-r * 0.4}`} className={styles.checkBadgeIcon} />
    </g>
  );
}

// Plain checkmark, used next to matched fields (First Name, Last Name, ...).
function Check({ x, y, size = 7 }) {
  return (
    <path
      d={`M${x - size * 0.9},${y} L${x - size * 0.2},${y + size * 0.7} L${x + size},${y - size * 0.9}`}
      className={styles.check}
    />
  );
}

// Down-pointing chevron, used for "Show More" and the Reject dropdown.
function Chevron({ x, y, size = 5, className }) {
  return (
    <path
      d={`M${x - size},${y - size * 0.4} L${x},${y + size * 0.4} L${x + size},${y - size * 0.4}`}
      className={className || styles.chevron}
    />
  );
}

// Three-dot relevance gauge: filledCount of 3 dots are solid, the rest are outlined.
function RelevanceDots({ x, y, filledCount }) {
  const r = 4;
  const gap = 12;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={x + i * gap}
          cy={y}
          r={r}
          className={i < filledCount ? styles.dotFilled : styles.dotEmpty}
        />
      ))}
    </g>
  );
}

/* =====================================================================
   Sanctions and exclusions match review modal.
   Every label and value below is a plain string in a <text> element —
   edit any of them directly to relabel the mockup.
   ===================================================================== */

export function SanctionsReviewMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox="0 0 640 616"
          role="img"
          aria-labelledby="srm-t srm-d">
          <title id="srm-t">Review Record modal, showing a medium-relevance match</title>
          <desc id="srm-d">
            A mockup of the Review Record modal for Rosa Fernandez. The left panel shows the
            provided information: name and ID. The right panel shows the Needs Review tab with one item, a source verified on 6/5/2026, a match record link, and a card for the matched record Rosa Fernandez with Reject and Accept buttons, a Medium Relevance gauge, matched First Name and Last Name fields with checkmarks, a Start Date, and a Reason. A Close button sits in the footer.
          </desc>

          {/* Modal frame */}
          <rect x={8} y={8} width={624} height={600} rx={10} className={styles.modal} />

          {/* ---------- Header ---------- */}
          <text x={320} y={38} textAnchor="middle" className={styles.title}>
            Review Record - Rosa Fernandez
          </text>
          <text x={320} y={58} textAnchor="middle" className={styles.subtitle}>
            Some items do not match the provided information. Review and update this record.
          </text>
          <line x1={8} y1={74} x2={632} y2={74} className={styles.divider} />

          {/* ---------- Left panel: Provided Information ---------- */}
          <line x1={196} y1={74} x2={196} y2={552} className={styles.divider} />

          <text x={28} y={100} className={styles.heading}>
            Provided Information
          </text>

          <text x={28} y={130} className={styles.label}>
            Name
          </text>
          <text x={28} y={150} className={styles.value}>
            Rosa Fernandez
          </text>
          <line x1={28} y1={164} x2={180} y2={164} className={styles.divider} />

          <text x={28} y={188} className={styles.label}>
            ID
          </text>
          <text x={28} y={208} className={styles.value}>
            1234567893
          </text>

          {/* ---------- Right panel ---------- */}

          {/* Tabs */}
          <text x={216} y={100} className={styles.tabOn}>
            Needs Review (1)
          </text>
          <rect x={216} y={108} width={112} height={2} className={styles.tabUnderline} />
          <text x={346} y={100} className={styles.tabOff}>
            Accepted (0)
          </text>
          <text x={448} y={100} className={styles.tabOff}>
            Rejected (0)
          </text>
          <line x1={216} y1={118} x2={632} y2={118} className={styles.divider} />

          {/* Source row */}
          <CheckBadge x={226} y={140} />
          <text x={240} y={144} className={styles.value}>
            Source: General Agency
          </text>
          <text x={608} y={144} textAnchor="end" className={styles.muted}>
            Verified: 6/5/2026
          </text>

          {/* Match record row */}
          <text x={216} y={170} className={styles.label}>
            Match Record:
          </text>
          <text x={312} y={170} className={styles.linkText}>
            Agency-0000000041
          </text>
          <path d="M436,163 L442,163 L442,169 M442,163 L435,170" className={styles.linkIcon} />

          {/* Match card */}
          <rect x={216} y={188} width={416} height={348} rx={8} className={styles.card} />

          <text x={236} y={220} className={styles.valueStrong}>
            Rosa Fernandez
          </text>

          {/* Reject button */}
          <rect x={412} y={202} width={88} height={30} rx={6} className={styles.btnRejectBg} />
          <text x={442} y={221} textAnchor="middle" className={styles.btnRejectText}>
            ✕ Reject
          </text>
          <line x1={480} y1={206} x2={480} y2={228} className={styles.btnRejectDivider} />
          <Chevron x={488} y={218} size={4} className={styles.btnRejectText} />

          {/* Accept button */}
          <rect x={508} y={202} width={100} height={30} rx={6} className={styles.btnAcceptBg} />
          <text x={558} y={221} textAnchor="middle" className={styles.btnAcceptText}>
            ✓ Accept
          </text>

          {/* Relevance gauge */}
          <RelevanceDots x={236} y={248} filledCount={2} />
          <text x={280} y={253} className={styles.relevanceLabel}>
            Medium Relevance
          </text>

          {/* First Name */}
          <text x={236} y={278} className={styles.labelMuted}>
            First Name
          </text>
          <text x={236} y={298} className={styles.value}>
            Rosa
          </text>
          <Check x={608} y={294} />
          <line x1={236} y1={310} x2={612} y2={310} className={styles.divider} />

          {/* Last Name */}
          <text x={236} y={332} className={styles.labelMuted}>
            Last Name
          </text>
          <text x={236} y={352} className={styles.value}>
            Fernandez
          </text>
          <Check x={608} y={348} />
          <line x1={236} y1={364} x2={612} y2={364} className={styles.divider} />

          {/* Start Date */}
          <text x={236} y={386} className={styles.labelMuted}>
            Start Date
          </text>
          <text x={236} y={406} className={styles.value}>
            2026-06-19
          </text>
          <line x1={236} y1={418} x2={612} y2={418} className={styles.divider} />

          {/* Reason */}
          <text x={236} y={440} className={styles.labelMuted}>
            Reason
          </text>
          <text x={236} y={460} className={styles.value}>
            Hired as the agency's Chief Operations Officer to build out
          </text>
          <text x={236} y={476} className={styles.value}>
           the Operations department.
          </text>
          <line x1={236} y1={490} x2={612} y2={490} className={styles.divider} />

          {/* Show more */}
          <text x={424} y={516} textAnchor="middle" className={styles.linkText}>
            Show More
          </text>
          <Chevron x={480} y={514} size={4} className={styles.linkIcon} />

          {/* ---------- Footer ---------- */}
          <line x1={8} y1={552} x2={632} y2={552} className={styles.divider} />
          <rect x={540} y={564} width={84} height={32} rx={6} className={styles.btnCloseBg} />
          <text x={582} y={585} textAnchor="middle" className={styles.btnCloseText}>
            Close
          </text>
        </svg>
      </div>
      <figcaption className={styles.caption}>
      </figcaption>
    </figure>
  );
}
