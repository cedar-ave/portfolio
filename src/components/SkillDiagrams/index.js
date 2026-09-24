import React from 'react';
import styles from './styles.module.css';

/* ---------- shared pieces ---------- */

// Box with vertically centered lines of text.
// lines: [{ t: 'text', c: 'title' | 'code' | 'sub' | 'hubTitle' | 'hubSub' | 'quote' }]
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

function ArrowMarker({ id, variant }) {
  const cls = variant === 'gate' ? styles.arrowGate : variant === 'drop' ? styles.arrowDrop : styles.arrow;
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={cls} />
    </marker>
  );
}

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

/* ---------- 1. Overview: the suite across the content lifecycle ---------- */

export function SkillSuite() {
  const lanes = [
    {
      name: 'Research',
      skills: [
        ['/source-librarian', 'catalogs + indexes sources'],
        ['/source-analyzer', 'compares variant guides'],
      ],
    },
    {
      name: 'Draft',
      skills: [
        ['/diataxis-drafter', 'articles from the library'],
        ['/release-docs-drafter', 'articles for new features'],
        ['/release-notes-drafter', 'notes for one audience'],
        ['/release-notes-jira-gdoc', 'notes from fix versions'],
      ],
    },
    {
      name: 'Review',
      skills: [
        ['/ai-optimizer', 'AI readiness'],
        ['/vocabulary-pal', 'terminology'],
        ['/style-pal', 'house style'],
      ],
    },
    {
      name: 'Publish',
      gate: true,
      skills: [
        ['/paligo-pal', 'XML CCMS'],
        ['/zendesk-guide-pal', 'Help Center'],
      ],
    },
  ];
  const laneW = 200;
  const laneGap = 28;
  const laneX = (i) => 8 + i * (laneW + laneGap);
  const laneY = 30;
  const laneH = 236;
  const chipW = 184;
  const chipH = 46;
  const chipY = (i) => 42 + i * 54;
  const arrowY = laneY + laneH / 2;

  return (
    <Figure
      titleId="skill-suite"
      title="Eleven AI agent skills covering the full help-content lifecycle"
      desc="Four stages from left to right. Research: source librarian and source analyzer. Draft: Diátaxis drafter, release docs drafter, release notes drafter, and release notes from Jira to Google Docs. Review: AI optimizer, vocabulary pal, and style pal. Publish: a human confirmation step, then Paligo pal and Zendesk Guide pal. All skills ship as one versioned plugin with custom MCP servers."
      viewBox="0 0 900 326"
      caption="Every stage of help content has a dedicated skill, and nothing reaches a live system until I confirm it. Teammates install the whole toolkit in one step.">
      <defs>
        <ArrowMarker id="ss-arrow" />
      </defs>

      {lanes.map((lane, li) => {
        const x = laneX(li);
        const items = lane.gate
          ? [{ gate: true }, ...lane.skills.map((s) => ({ s }))]
          : lane.skills.map((s) => ({ s }));
        return (
          <g key={lane.name}>
            <rect x={x} y={laneY} width={laneW} height={laneH} rx={10} className={styles.lane} />
            <text x={x + laneW / 2} y="20" textAnchor="middle" className={styles.heading}>
              {`${li + 1} · ${lane.name}`}
            </text>
            {items.map((it, i) =>
              it.gate ? (
                <Box
                  key="gate"
                  x={x + 8}
                  y={chipY(i)}
                  w={chipW}
                  h={chipH}
                  kind="gate"
                  lh={16}
                  lines={[{ t: 'I confirm first' }, { t: 'before any live write', c: 'sub' }]}
                />
              ) : (
                <Box
                  key={it.s[0]}
                  x={x + 8}
                  y={chipY(i)}
                  w={chipW}
                  h={chipH}
                  kind="mcp"
                  lh={16}
                  lines={[{ t: it.s[0], c: 'code' }, { t: it.s[1], c: 'sub' }]}
                />
              ),
            )}
            {li < lanes.length - 1 && (
              <path
                d={`M${x + laneW + 2} ${arrowY} L${x + laneW + laneGap - 2} ${arrowY}`}
                className={styles.edge}
                markerEnd="url(#ss-arrow)"
              />
            )}
          </g>
        );
      })}

      <Box
        x={8}
        y={280}
        w={884}
        h={38}
        kind="hub"
        lines={[{ t: 'Shipped together as one versioned plugin with custom MCP servers', c: 'hubSub' }]}
      />
    </Figure>
  );
}

/* ---------- 2. Build the library once, read it in tiers ---------- */

export function TieredReading() {
  const sources = ['Support tickets', 'Call transcripts', 'Guides + docs', 'Jira + Slack'];
  const sy = (i) => 40 + i * 42;
  const libCy = 120;
  const cx = 530;

  return (
    <Figure
      titleId="skill-tiers"
      title="Source librarian builds an index once; the drafter reads in three tiers"
      desc="Support tickets, call transcripts, guides, and Jira and Slack content flow into the source librarian, which tags, summarizes, and builds three index layers. On every drafting run, the Diátaxis drafter scans the index files, then reads metadata headers to shortlist candidates, then, after I confirm, fully reads only the confirmed files before drafting."
      viewBox="0 0 800 290"
      caption="The expensive reading happens once. Each drafting run narrows from the whole library to a handful of confirmed files, so drafts stay traceable and cheap to produce.">
      <defs>
        <ArrowMarker id="tr-arrow" />
        <ArrowMarker id="tr-arrow-gate" variant="gate" />
      </defs>

      <text x="10" y="20" className={styles.heading}>Built once</text>
      <text x="390" y="20" className={styles.heading}>Every drafting run</text>

      {sources.map((s, i) => {
        const cy = sy(i) + 17;
        return (
          <g key={s}>
            <path
              d={`M150 ${cy} C165 ${cy} 165 ${libCy} 176 ${libCy}`}
              className={styles.edge}
              markerEnd="url(#tr-arrow)"
            />
            <Box x={10} y={sy(i)} w={140} h={34} lines={[{ t: s, c: 'sub' }]} rx={6} />
          </g>
        );
      })}
      <text x="80" y="226" textAnchor="middle" className={styles.sub}>
        <tspan x="80" dy="0">Python pre-pass shrinks</tspan>
        <tspan x="80" dy="16">ticket exports ~85%</tspan>
      </text>

      <Box
        x={178}
        y={libCy - 34}
        w={150}
        h={68}
        kind="mcp"
        lh={16}
        lines={[
          { t: '/source-librarian', c: 'code' },
          { t: 'tags, summarizes,', c: 'sub' },
          { t: 'builds 3 index layers', c: 'sub' },
        ]}
      />
      <path d={`M328 ${libCy} C358 ${libCy} 358 62 388 62`} className={styles.edge} markerEnd="url(#tr-arrow)" />

      {/* funnel */}
      <Box x={cx - 140} y={40} w={280} h={44} lh={16} lines={[{ t: '1 · Index files' }, { t: 'scan the whole library', c: 'sub' }]} />
      <path d={`M${cx} 84 L${cx} 106`} className={styles.edge} markerEnd="url(#tr-arrow)" />
      <Box x={cx - 110} y={108} w={220} h={44} lh={16} lines={[{ t: '2 · Metadata headers' }, { t: 'shortlist candidates', c: 'sub' }]} />
      <path d={`M${cx} 152 L${cx} 188`} className={styles.edgeGate} markerEnd="url(#tr-arrow-gate)" />
      <text x={cx + 10} y="174" className={styles.gateLabel}>I confirm relevance</text>
      <Box x={cx - 80} y={190} w={160} h={44} kind="ok" lh={16} lines={[{ t: '3 · Full reads' }, { t: 'confirmed files only', c: 'sub' }]} />

      <path d={`M${cx + 80} 212 L658 212`} className={styles.edge} markerEnd="url(#tr-arrow)" />
      <Box x={660} y={184} w={130} h={56} kind="hub" lines={[{ t: 'Draft', c: 'hubTitle' }, { t: 'every claim sourced', c: 'hubSub' }]} />

      <text x={cx} y="272" textAnchor="middle" className={styles.sub}>
        /diataxis-drafter reads ~70–80% less than it would by opening every candidate
      </text>
    </Figure>
  );
}

/* ---------- 3. Changelog to customer value ---------- */

export function ReleaseNoteFilter() {
  const y = 32;
  const h = 60;
  const mid = y + h / 2;
  const boxes = [
    { x: 10, w: 140, lines: [{ t: 'Changelog in' }, { t: 'GitHub release,', c: 'sub' }, { t: 'commits, Jira', c: 'sub' }] },
    { x: 180, w: 130, lines: [{ t: 'Read every' }, { t: 'ticket in full', c: 'sub' }] },
    { x: 340, w: 130, kind: 'gate', lines: [{ t: 'Exclusion filter' }, { t: 'internal work out', c: 'sub' }] },
    { x: 500, w: 150, kind: 'mcp', lines: [{ t: 'Rewrite as' }, { t: 'customer value', c: 'sub' }] },
    { x: 680, w: 110, kind: 'hub', lines: [{ t: 'One audience', c: 'hubTitle' }, { t: 'app · web · API', c: 'hubSub' }] },
  ];

  return (
    <Figure
      titleId="skill-relnotes"
      title="How release notes drafter turns an engineering changelog into customer release notes"
      desc="A GitHub release, commits, and Jira tickets go in. Every ticket is read in full, then an exclusion filter drops internal work such as CI/CD, refactors, monitoring, and dependency upgrades, listing each with a reason. Kept items are rewritten as customer value for one audience per run. Example: 'Added retry logic to sync job' becomes 'Provider data stays current even when sources are temporarily down.'"
      viewBox="0 0 800 306"
      caption="Nothing is dropped silently: every excluded item is listed with a reason, so reviewers can check the call. What remains is written as what the customer gains.">
      <defs>
        <ArrowMarker id="rn-arrow" />
        <ArrowMarker id="rn-arrow-drop" variant="drop" />
      </defs>

      {boxes.slice(0, -1).map((b, i) => (
        <path
          key={i}
          d={`M${b.x + b.w} ${mid} L${boxes[i + 1].x - 2} ${mid}`}
          className={styles.edge}
          markerEnd="url(#rn-arrow)"
        />
      ))}
      {boxes.map((b, i) => (
        <Box key={i} x={b.x} y={y} w={b.w} h={h} kind={b.kind || 'node'} lh={16} lines={b.lines} />
      ))}

      <path d="M405 92 L405 122" className={styles.edgeDrop} markerEnd="url(#rn-arrow-drop)" />
      <Box
        x={330}
        y={124}
        w={150}
        h={62}
        kind="drop"
        lh={16}
        lines={[{ t: 'Dropped + reason' }, { t: 'CI/CD · refactors ·', c: 'sub' }, { t: 'monitoring · deps', c: 'sub' }]}
      />

      <line x1="10" y1="206" x2="790" y2="206" className={styles.divider} />
      <text x="10" y="228" className={styles.heading}>Example rewrite</text>

      <Box
        x={10}
        y={238}
        w={330}
        h={60}
        lh={18}
        lines={[{ t: 'Engineering changelog', c: 'sub' }, { t: '“Added retry logic to sync job”', c: 'quote' }]}
      />
      <path d="M340 268 L388 268" className={styles.edge} markerEnd="url(#rn-arrow)" />
      <Box
        x={390}
        y={238}
        w={400}
        h={60}
        kind="ok"
        lh={16}
        lines={[
          { t: 'Customer release note', c: 'sub' },
          { t: '“Provider data stays current even when', c: 'quote' },
          { t: 'sources are temporarily down.”', c: 'quote' },
        ]}
      />
    </Figure>
  );
}

/* ---------- 4. Subagents that save to disk ---------- */

export function SubagentFanOut() {
  const subYs = [20, 90, 160];
  const mainCy = 130;

  return (
    <Figure
      titleId="skill-fanout"
      title="Release notes from Jira fix versions using subagents that save to disk"
      desc="The main session dispatches several subagents in parallel. Each subagent fetches tickets and their linked specs, decks, and pages, writes everything to files on disk, and returns only a short confirmation. The main session then drafts from the files and produces release notes plus an audit log showing, for every ticket and link, whether it was read and used."
      viewBox="0 0 800 290"
      caption="Dozens of tickets and their linked docs are gathered in parallel, but the main conversation only ever holds confirmations, so long releases don't overflow context or lose tickets.">
      <defs>
        <ArrowMarker id="fo-arrow" />
        <ArrowMarker id="fo-arrow-gate" variant="gate" />
      </defs>

      {subYs.map((sy) => {
        const cy = sy + 25;
        return (
          <g key={sy}>
            <path
              d={`M150 ${mainCy} C175 ${mainCy} 175 ${cy} 198 ${cy}`}
              className={styles.edge}
              markerEnd="url(#fo-arrow)"
            />
            <path d={`M370 ${cy} L418 ${cy}`} className={styles.edge} markerEnd="url(#fo-arrow)" />
            <Box
              x={200}
              y={sy}
              w={170}
              h={50}
              kind="mcp"
              lh={16}
              lines={[{ t: 'Subagent' }, { t: 'fetches tickets + links', c: 'sub' }]}
            />
          </g>
        );
      })}
      <text x="300" y="232" className={styles.sub}>+ more in parallel</text>

      {/* return path: confirmation only */}
      <path d="M230 210 L230 252 L80 252 L80 172" className={styles.edgeGate} markerEnd="url(#fo-arrow-gate)" />
      <text x="240" y="274" textAnchor="middle" className={styles.gateLabel}>
        returns only “saved” · main context stays small
      </text>

      <Box
        x={10}
        y={mainCy - 38}
        w={140}
        h={76}
        kind="hub"
        lh={16}
        lines={[
          { t: 'Main session', c: 'hubTitle' },
          { t: 'plans + tracks', c: 'hubSub' },
          { t: 'every ticket', c: 'hubSub' },
        ]}
      />

      <Box
        x={420}
        y={20}
        w={150}
        h={190}
        kind="file"
        lh={17}
        lines={[
          { t: 'Files on disk' },
          { t: 'full ticket text,', c: 'sub' },
          { t: 'linked specs,', c: 'sub' },
          { t: 'decks + pages', c: 'sub' },
        ]}
      />

      <path d="M570 68 L618 68" className={styles.edge} markerEnd="url(#fo-arrow)" />
      <Box
        x={620}
        y={40}
        w={170}
        h={56}
        kind="hub"
        lines={[{ t: 'Draft from files', c: 'hubTitle' }, { t: 'no ticket dropped', c: 'hubSub' }]}
      />
      <path d="M705 96 L705 124" className={styles.edge} markerEnd="url(#fo-arrow)" />
      <Box
        x={620}
        y={126}
        w={170}
        h={84}
        kind="ok"
        lh={16}
        lines={[
          { t: 'Release notes' },
          { t: '+ audit log: every', c: 'sub' },
          { t: 'ticket and link,', c: 'sub' },
          { t: 'read? used?', c: 'sub' },
        ]}
      />
      <text x="705" y="232" textAnchor="middle" className={styles.sub}>read-only on Jira + Drive</text>
    </Figure>
  );
}

/* ---------- 5. Google Doc to Paligo pipeline ---------- */

export function DocToPaligo() {
  const steps = [
    { lines: [{ t: 'Google Doc' }, { t: 'approved draft', c: 'sub' }] },
    { lines: [{ t: 'Convert' }, { t: 'DocBook 5.1 XML', c: 'sub' }], kind: 'mcp' },
    { lines: [{ t: 'Upload' }, { t: 'images', c: 'sub' }] },
    { lines: [{ t: 'Rewrite links' }, { t: '→ Paligo xrefs', c: 'sub' }] },
    { lines: [{ t: 'Fetch latest' }, { t: 'XML right', c: 'sub' }, { t: 'before writing', c: 'sub' }], kind: 'gate' },
    { lines: [{ t: 'Update' }, { t: 'Paligo topic', c: 'sub' }], kind: 'ok' },
  ];
  const w = 112;
  const gap = 20;
  const x0 = 10;
  const y = 36;
  const h = 70;
  const xs = steps.map((_, i) => x0 + i * (w + gap));
  const mid = y + h / 2;
  const convCx = xs[1] + w / 2;
  const gateCx = xs[4] + w / 2;

  return (
    <Figure
      titleId="skill-paligo"
      title="Google Doc to Paligo pipeline in paligo-pal"
      desc="An approved Google Doc is converted to DocBook 5.1 XML using Paligo's structure rules, its images are uploaded, and Help Center links are rewritten as Paligo cross-references. Just before writing, the skill fetches the latest XML so it never overwrites edits made in the Paligo editor, then updates the Paligo topic."
      viewBox="0 0 800 176"
      caption="A manual copy-and-reformat job becomes one request, and a fresh fetch before every write means edits made in the Paligo editor are never overwritten.">
      <defs>
        <ArrowMarker id="dp-arrow" />
      </defs>

      <text x={x0} y="20" className={styles.heading}>/paligo-pal pipeline</text>

      {xs.slice(0, -1).map((x, i) => (
        <path
          key={i}
          d={`M${x + w} ${mid} L${x + w + gap - 2} ${mid}`}
          className={styles.edge}
          markerEnd="url(#dp-arrow)"
        />
      ))}
      {steps.map((s, i) => (
        <Box key={i} x={xs[i]} y={y} w={w} h={h} kind={s.kind || 'node'} lh={16} lines={s.lines} />
      ))}

      <path d={`M${convCx} ${y + h} L${convCx} ${y + h + 18}`} className={styles.edge} />
      <text x={convCx - 50} y={y + h + 36} className={styles.sub}>
        <tspan x={convCx - 50} dy="0">Applies Paligo structure rules: section limits,</tspan>
        <tspan x={convCx - 50} dy="16">procedures vs. lists, admonitions, tables, images</tspan>
      </text>

      <path d={`M${gateCx} ${y + h} L${gateCx} ${y + h + 18}`} className={styles.edgeGate} />
      <text x={gateCx} y={y + h + 36} textAnchor="middle" className={styles.gateLabel}>
        <tspan x={gateCx} dy="0">never overwrites edits</tspan>
        <tspan x={gateCx} dy="16">made in the editor</tspan>
      </text>
    </Figure>
  );
}

/* ---------- 6. Zendesk safety model ---------- */

export function SafeWrites() {
  const colX = [100, 290];
  const rowY = [36, 132];
  const cw = 180;
  const ch = 86;
  const cells = [
    [
      { kind: 'node', lines: [{ t: 'Allowed' }, { t: 'on request', c: 'sub' }] },
      { kind: 'ok', lines: [{ t: 'Default' }, { t: 'work from real data', c: 'sub' }] },
    ],
    [
      { kind: 'ok', lines: [{ t: 'Default' }, { t: 'mistakes can be undone', c: 'sub' }] },
      { kind: 'gate', lines: [{ t: 'Needs explicit OK' }, { t: 'I confirm every time', c: 'sub' }] },
    ],
  ];
  const guards = [
    ['Adds tags beside existing ones', 'never replaces them'],
    ['Rate-limited bulk writes', 'backs off when Zendesk pushes back'],
    ['Global deletes need name + ID', 'confirmed before a tag or label goes'],
    ['Checks the 10-theme limit', 'and never deletes the base theme'],
  ];

  return (
    <Figure
      titleId="skill-safe"
      title="How zendesk-guide-pal decides where to read and write"
      desc="A two-by-two grid. Reading from sandbox is allowed on request. Reading from production is the default, so work uses real data. Writing to sandbox is the default, so mistakes can be undone. Writing to production needs my explicit confirmation every time. Guardrails: tags are added beside existing ones, bulk writes are rate-limited with automatic back-off, Help-Center-wide deletes need a confirmed name and ID, and theme imports check the 10-theme limit and never delete the base theme."
      viewBox="0 0 800 236"
      caption="Read real data, write where mistakes are cheap, and make production changes a deliberate, confirmed step.">
      <text x={colX[0] + cw / 2} y="24" textAnchor="middle" className={styles.heading}>Sandbox</text>
      <text x={colX[1] + cw / 2} y="24" textAnchor="middle" className={styles.heading}>Production</text>
      {['Read', 'Write'].map((r, ri) => (
        <text key={r} x="50" y={rowY[ri] + ch / 2 + 4} textAnchor="middle" className={styles.heading}>
          {r}
        </text>
      ))}
      {cells.map((row, ri) =>
        row.map((c, ci) => (
          <Box key={`${ri}${ci}`} x={colX[ci]} y={rowY[ri]} w={cw} h={ch} kind={c.kind} lines={c.lines} />
        )),
      )}

      <text x="510" y="24" className={styles.heading}>Guardrails on every write</text>
      {guards.map((g, i) => (
        <Box
          key={g[0]}
          x={510}
          y={36 + i * 48}
          w={280}
          h={42}
          lh={16}
          rx={6}
          lines={[{ t: g[0] }, { t: g[1], c: 'sub' }]}
        />
      ))}
    </Figure>
  );
}

/* ---------- 7. Review stack ---------- */

export function ReviewStack() {
  const reviewers = [
    ['/ai-optimizer', '25 AI-readiness criteria'],
    ['/vocabulary-pal', 'controlled vocabulary'],
    ['/style-pal', 'house style + fallback guide'],
  ];
  const ys = [20, 83, 146];
  const mid = 110;

  return (
    <Figure
      titleId="skill-review"
      title="Three independent review skills feeding one approval step"
      desc="A draft article goes to three separate review skills: AI optimizer for 25 AI-readiness criteria, vocabulary pal for controlled vocabulary, and style pal for house style with a fallback guide. Each returns a numbered, prioritized report with exact fix text. I approve fixes by number, such as 'fix 1, 3, 5', before the article is ready to publish."
      viewBox="0 0 800 220"
      caption="Each reviewer does one job and can run on any document, from any writer or any AI draft. Fixes are applied only when I approve them by number.">
      <defs>
        <ArrowMarker id="rs-arrow" />
      </defs>

      <Box x={10} y={mid - 28} w={110} h={56} lines={[{ t: 'Draft' }, { t: 'article', c: 'sub' }]} />

      {reviewers.map((r, i) => {
        const cy = ys[i] + 27;
        return (
          <g key={r[0]}>
            <path d={`M120 ${mid} C140 ${mid} 140 ${cy} 158 ${cy}`} className={styles.edge} markerEnd="url(#rs-arrow)" />
            <path d={`M360 ${cy} C385 ${cy} 385 ${mid} 408 ${mid}`} className={styles.edge} markerEnd="url(#rs-arrow)" />
            <Box x={160} y={ys[i]} w={200} h={54} kind="mcp" lh={16} lines={[{ t: r[0], c: 'code' }, { t: r[1], c: 'sub' }]} />
          </g>
        );
      })}

      <Box
        x={410}
        y={mid - 35}
        w={130}
        h={70}
        lh={16}
        lines={[{ t: 'Numbered report' }, { t: 'exact fix text,', c: 'sub' }, { t: 'by priority', c: 'sub' }]}
      />
      <path d={`M540 ${mid} L573 ${mid}`} className={styles.edge} markerEnd="url(#rs-arrow)" />
      <Box
        x={575}
        y={mid - 35}
        w={115}
        h={70}
        kind="gate"
        lines={[{ t: 'I approve' }, { t: '“fix 1, 3, 5”', c: 'quote' }]}
      />
      <path d={`M690 ${mid} L716 ${mid}`} className={styles.edge} markerEnd="url(#rs-arrow)" />
      <Box
        x={718}
        y={mid - 28}
        w={76}
        h={56}
        kind="hub"
        lines={[{ t: 'Ready', c: 'hubTitle' }, { t: 'to publish', c: 'hubSub' }]}
      />
    </Figure>
  );
}
