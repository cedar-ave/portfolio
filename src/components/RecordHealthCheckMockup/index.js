import React from 'react';
import styles from './styles.module.css';

/* =====================================================================
   A data record's profile page, showing a Health Check banner.
   This is a genericized, made-up layout illustrating the concept for
   /portfolio/release-notes - it does not reproduce any real product UI.
   Every label and value below is a plain string in a <text> element -
   edit any of them directly to relabel the mockup.
   ===================================================================== */

// Small filled circle with a vertical "i" mark, used for the banner icon.
function InfoIcon({ x, y, r = 8 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={0} r={r} className={styles.bannerIconBg} />
      <circle cx={0} cy={-r * 0.35} r={r * 0.12} fill="var(--mk-info-bg)" />
      <rect x={-r * 0.12} y={-r * 0.05} width={r * 0.24} height={r * 0.55} rx={r * 0.12} fill="var(--mk-info-bg)" />
    </g>
  );
}

// Small solid dot used as a bullet for each activity row.
function ActivityDot({ x, y, r = 3 }) {
  return <circle cx={x} cy={y} r={r} className={styles.activityDot} />;
}

export function RecordHealthCheckMockup() {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox="0 0 640 468"
          role="img"
          aria-labelledby="rhc-t rhc-d">
          <title id="rhc-t">Data record profile for Janice Perez, showing a Health Check banner</title>
          <desc id="rhc-d">
            A mockup of a data record&apos;s profile page. The header shows
            an avatar, the name Janice Perez, a record ID, and an Active
            status chip. Below it, a Health Check banner reads &quot;3
            items may need your review&quot; with a Review link. Below
            that, a Profile section lists Email, Department, Phone,
            Manager, Location, and Start Date. A Recent Activity list
            shows three dated entries.
          </desc>

          {/* Card frame */}
          <rect x={8} y={8} width={624} height={452} rx={10} className={styles.card} />

          {/* ---------- Header ---------- */}
          <circle cx={50} cy={50} r={22} className={styles.avatarBg} />
          <text x={50} y={55} textAnchor="middle" className={styles.avatarText}>
            JP
          </text>

          <text x={86} y={46} className={styles.name}>
            Janice Perez
          </text>
          <text x={86} y={66} className={styles.recordId}>
            Record ID REC-48213
          </text>
          <rect x={220} y={55} width={60} height={20} rx={10} className={styles.statusChipBg} />
          <text x={250} y={69} textAnchor="middle" className={styles.statusChipText}>
            Active
          </text>

          <line x1={28} y1={90} x2={612} y2={90} className={styles.divider} />

          {/* ---------- Health Check banner ---------- */}
          <rect x={28} y={104} width={584} height={36} rx={8} className={styles.bannerBg} />
          <InfoIcon x={48} y={122} />
          <text x={64} y={126} className={styles.bannerText}>
            Health Check — 3 items may need your review
          </text>
          <text x={596} y={126} textAnchor="end" className={styles.bannerLink}>
            Review →
          </text>

          {/* ---------- Profile ---------- */}
          <text x={28} y={168} className={styles.sectionHeading}>
            Profile
          </text>

          {/* Row 1: Email / Department */}
          <text x={28} y={190} className={styles.label}>Email</text>
          <text x={28} y={208} className={styles.value}>janice.perez@example.com</text>
          <text x={332} y={190} className={styles.label}>Department</text>
          <text x={332} y={208} className={styles.value}>Operations</text>
          <line x1={28} y1={222} x2={612} y2={222} className={styles.divider} />

          {/* Row 2: Phone / Manager */}
          <text x={28} y={244} className={styles.label}>Phone</text>
          <text x={28} y={262} className={styles.value}>+1 (555) 013-2847</text>
          <text x={332} y={244} className={styles.label}>Manager</text>
          <text x={332} y={262} className={styles.value}>Priya Natarajan</text>
          <line x1={28} y1={276} x2={612} y2={276} className={styles.divider} />

          {/* Row 3: Location / Start Date */}
          <text x={28} y={298} className={styles.label}>Location</text>
          <text x={28} y={316} className={styles.value}>Salt Lake City, UT</text>
          <text x={332} y={298} className={styles.label}>Start Date</text>
          <text x={332} y={316} className={styles.value}>Mar 3, 2024</text>
          <line x1={28} y1={330} x2={612} y2={330} className={styles.divider} />

          {/* ---------- Recent Activity ---------- */}
          <text x={28} y={354} className={styles.sectionHeading}>
            Recent Activity
          </text>

          <ActivityDot x={32} y={374} />
          <text x={44} y={378} className={styles.activityText}>Health check scan completed</text>
          <text x={612} y={378} textAnchor="end" className={styles.activityDate}>Sep 28, 2026</text>

          <ActivityDot x={32} y={400} />
          <text x={44} y={404} className={styles.activityText}>Profile details updated</text>
          <text x={612} y={404} textAnchor="end" className={styles.activityDate}>Sep 14, 2026</text>

          <ActivityDot x={32} y={426} />
          <text x={44} y={430} className={styles.activityText}>Record created</text>
          <text x={612} y={430} textAnchor="end" className={styles.activityDate}>Jan 5, 2026</text>
        </svg>
      </div>
      <figcaption className={styles.caption}></figcaption>
    </figure>
  );
}
