import React from 'react';
import styles from './styles.module.css';

/* Diagrams for /experience/help-site-relaunch. Content is illustrative. */

function Box({ x, y, w, h, kind = 'node', lines = [], rx = 8, lh = 17 }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const startY = cy - ((lines.length - 1) * lh) / 2 + 4.5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={styles[kind]} />
      <text textAnchor="middle">
        {lines.map((l, i) => (
          <tspan key={i} x={cx} y={startY + i * lh} className={styles[l.c || 'title']}>
            {l.t}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function ArrowMarker({ id }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={styles.arrow} />
    </marker>
  );
}

function Figure({ titleId, title, desc, viewBox, caption, minWidth, children }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          style={minWidth ? { minWidth } : undefined}
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

/* ---------------------------------------------------------------------
   1. Two sources of evidence -> decisions
   --------------------------------------------------------------------- */

export function EvidenceToDecisions() {
  const feedback = [
    { t: 'Support agents', s: 'repeat questions, linked articles' },
    { t: 'Customer-facing teams', s: 'where new customers get lost' },
    { t: 'Product managers', s: 'changes, app differences' },
    { t: 'Writers', s: 'what is hard to maintain' },
  ];
  const usage = [
    { t: 'Search terms', s: 'what readers look for' },
    { t: 'Article views', s: 'what readers actually open' },
    { t: 'Navigation paths', s: 'how readers move between pages' },
    { t: 'Support contacts', s: 'where the site falls short' },
  ];
  const decisions = [
    'Search-first home page',
    'Product badges + filters',
    'Related articles',
    'Support on every page',
  ];
  const ys = [70, 130, 190, 250];
  const bw = 230;
  const bh = 48;
  const hub = { x: 355, y: 125, w: 190, h: 110 };
  const hubCy = hub.y + hub.h / 2;
  const dY = 390;
  const dW = 190;
  const dGap = 20;
  const dStart = (900 - (decisions.length * dW + (decisions.length - 1) * dGap)) / 2;

  return (
    <Figure
      titleId="evidence"
      title="How stakeholder feedback and usage data led to decisions"
      desc="Feedback from support agents, customer-facing teams, product managers, and writers, and usage data from search terms, article views, navigation paths, and support contacts, both feed a synthesis step. The synthesis produces four decisions: a search-first home page, product badges and filters, related articles, and a path to support on every page."
      viewBox="0 0 900 450"
      caption="Every major change had to be supported by what people told me, what the data showed, or both.">
      <defs>
        <ArrowMarker id="ev-arrow" />
      </defs>

      <text x={30 + bw / 2} y={40} textAnchor="middle" className={styles.heading}>Stakeholder feedback</text>
      <text x={640 + bw / 2} y={40} textAnchor="middle" className={styles.heading}>Usage data</text>

      {feedback.map((f, i) => (
        <g key={f.t}>
          <path
            d={`M${30 + bw},${ys[i] + bh / 2} C${310},${ys[i] + bh / 2} ${310},${hubCy} ${hub.x - 2},${hubCy}`}
            className={styles.edge}
            markerEnd="url(#ev-arrow)"
          />
          <Box x={30} y={ys[i]} w={bw} h={bh} kind="people" lines={[{ t: f.t }, { t: f.s, c: 'sub' }]} />
        </g>
      ))}

      {usage.map((u, i) => (
        <g key={u.t}>
          <path
            d={`M${640},${ys[i] + bh / 2} C${590},${ys[i] + bh / 2} ${590},${hubCy} ${hub.x + hub.w + 2},${hubCy}`}
            className={styles.edge}
            markerEnd="url(#ev-arrow)"
          />
          <Box x={640} y={ys[i]} w={bw} h={bh} kind="data" lines={[{ t: u.t }, { t: u.s, c: 'sub' }]} />
        </g>
      ))}

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'Synthesis', c: 'hubTitle' }, { t: 'Where do both', c: 'hubSub' }, { t: 'sources agree?', c: 'hubSub' }]}
      />

      {decisions.map((d, i) => {
        const x = dStart + i * (dW + dGap);
        return (
          <g key={d}>
            <path
              d={`M${hub.x + hub.w / 2},${hub.y + hub.h} C${hub.x + hub.w / 2},${dY - 20} ${x + dW / 2},${dY - 70} ${x + dW / 2},${dY - 2}`}
              className={styles.edge}
              markerEnd="url(#ev-arrow)"
            />
            <Box x={x} y={dY} w={dW} h={44} kind="decision" lines={[{ t: d }]} />
          </g>
        );
      })}
    </Figure>
  );
}

/* ---------------------------------------------------------------------
   2. Home page before and after
   --------------------------------------------------------------------- */

export function HomeBeforeAfter() {
  const tiles = [
    'Guides', 'User Guides', 'Help', 'Resources', 'Documentation', 'Getting Started',
    'Onboarding', 'How-To', 'Admin', 'Setup', 'Integrations', 'Sources',
    'FAQ', 'Support', 'Training', 'Updates', 'More',
  ];
  const cols = 4;
  const tw = 90;
  const th = 44;
  const gap = 10;
  const bx = 30;
  const by = 80;

  const entries = [
    { t: 'Getting started', s: 'New here? Start here' },
    { t: 'Salesforce app', s: 'Guides and help' },
    { t: 'Web app', s: 'Guides and help' },
    { t: 'Source integrations', s: 'Connect your data' },
    { t: 'APIs', s: 'Build on the platform' },
  ];
  const ax = 500;
  const aw = 440;

  return (
    <Figure
      titleId="home"
      title="Help site home page before and after the relaunch"
      desc="Before: a grid of 17 tiles with overlapping titles such as Guides, User Guides, Help, and Resources, and no search bar. After: a large search bar at the top, a row of promoted search terms, and five entry points by product and topic: Getting started, Salesforce app, Web app, Source integrations, and APIs, followed by popular articles and a contact support link."
      viewBox="0 0 970 460"
      caption="Illustrative wireframes. Tile titles are examples of the overlap readers faced, not the original labels.">
      <text x={bx} y={40} className={styles.heading}>Before</text>
      <text x={bx} y={60} className={styles.sub}>17 tiles, no clear place to start</text>
      <rect x={bx - 10} y={by - 10} width={cols * tw + (cols - 1) * gap + 20} height={5 * (th + gap) + 10} rx={10} className={styles.frame} />
      {tiles.map((t, i) => {
        const x = bx + (i % cols) * (tw + gap);
        const y = by + Math.floor(i / cols) * (th + gap);
        return <Box key={t} x={x} y={y} w={tw} h={th} kind="tile" rx={6} lines={[{ t, c: 'tileText' }]} />;
      })}

      <text x={ax} y={40} className={styles.heading}>After</text>
      <text x={ax} y={60} className={styles.sub}>Search first, then choose your product</text>
      <rect x={ax - 10} y={by - 10} width={aw + 20} height={370} rx={10} className={styles.frame} />

      <rect x={ax} y={by} width={aw} height={52} rx={26} className={styles.search} />
      <circle cx={ax + 28} cy={by + 24} r={8} className={styles.searchIcon} />
      <line x1={ax + 34} y1={by + 30} x2={ax + 40} y2={by + 36} className={styles.searchIcon} />
      <text x={ax + 52} y={by + 31} className={styles.searchText}>How can we help?</text>

      <text x={ax} y={by + 80} className={styles.sub}>Popular searches:</text>
      {['Add a provider', 'Run a verification', 'Reset password'].map((p, i) => (
        <g key={p}>
          <rect x={ax + 110 + i * 112} y={by + 66} width={104} height={22} rx={11} className={styles.chip} />
          <text x={ax + 110 + i * 112 + 52} y={by + 81} textAnchor="middle" className={styles.chipText}>{p}</text>
        </g>
      ))}

      {entries.map((e, i) => {
        const row = i < 3 ? 0 : 1;
        const perRow = row === 0 ? 3 : 2;
        const idx = row === 0 ? i : i - 3;
        const w = (aw - (perRow - 1) * 12) / perRow;
        const x = ax + idx * (w + 12);
        const y = by + 106 + row * 72;
        return <Box key={e.t} x={x} y={y} w={w} h={60} kind="entry" lines={[{ t: e.t }, { t: e.s, c: 'sub' }]} />;
      })}

      <rect x={ax} y={by + 260} width={aw * 0.62} height={80} rx={8} className={styles.tile} />
      <text x={ax + 14} y={by + 282} className={styles.title}>Popular articles</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={ax + 14} y={by + 294 + i * 14} width={aw * 0.62 - 60 - i * 30} height={6} rx={3} className={styles.line} />
      ))}
      <Box
        x={ax + aw * 0.62 + 12}
        y={by + 260}
        w={aw * 0.38 - 12}
        h={80}
        kind="support"
        lines={[{ t: 'Need a person?' }, { t: 'Contact support', c: 'sub' }]}
      />
    </Figure>
  );
}
