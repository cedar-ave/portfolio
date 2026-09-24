import React from 'react';
import styles from './styles.module.css';

/* ---------- shared pieces ---------- */

// Box with vertically centered lines of text.
// lines: [{ t: 'text', c: 'title' | 'sub' | 'hubTitle' | 'hubSub' | 'quote' }]
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

function ArrowMarker({ id, gate = false }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={gate ? styles.arrowGate : styles.arrow} />
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

/* ---------- 1. Overview: one assistant, four systems ---------- */

export function McpHub() {
  const rows = [
    { mcp: 'Zendesk Guide MCP', mcpSub: 'content + theming API', sys: 'Help center', sysSub: 'articles + themes' },
    { mcp: 'Zendesk Ticketing MCP', mcpSub: 'tickets + custom fields', sys: 'Support tickets', sysSub: 'conversations, fields' },
    { mcp: 'Paligo CCMS MCP', mcpSub: 'topics + publishing', sys: 'XML CCMS', sysSub: 'source content' },
    { mcp: 'Google Drive MCP', mcpSub: 'Docs as Markdown', sys: 'Google Docs', sysSub: 'drafts, reviews' },
  ];
  const cys = [62, 142, 222, 302];
  const hubCy = 182;

  return (
    <Figure
      titleId="mcp-hub"
      title="One assistant connected to four systems through custom MCPs"
      desc="A plain-language prompt goes to an AI assistant, which calls four custom MCPs: Zendesk Guide, Zendesk Ticketing, Paligo CCMS, and Google Drive. Each MCP reads from and writes to its own system."
      viewBox="0 0 770 340"
      caption="Each MCP wraps one system's API. The assistant picks the MCPs a prompt needs and chains them, so one request can read from one system and write to another.">
      <defs>
        <ArrowMarker id="hub-arrow" />
      </defs>

      <text x="80" y="18" textAnchor="middle" className={styles.heading}>Prompt</text>
      <text x="265" y="18" textAnchor="middle" className={styles.heading}>AI assistant</text>
      <text x="485" y="18" textAnchor="middle" className={styles.heading}>Custom MCPs I built</text>
      <text x="690" y="18" textAnchor="middle" className={styles.heading}>Systems</text>

      {/* prompt -> assistant */}
      <path d={`M150 ${hubCy} L183 ${hubCy}`} className={styles.edge} markerEnd="url(#hub-arrow)" />

      {/* assistant -> MCPs */}
      {cys.map((cy) => (
        <path
          key={`a${cy}`}
          d={`M345 ${hubCy} C370 ${hubCy} 370 ${cy} 393 ${cy}`}
          className={styles.edge}
          markerEnd="url(#hub-arrow)"
        />
      ))}

      {/* MCPs <-> systems (read and write) */}
      {cys.map((cy) => (
        <path
          key={`s${cy}`}
          d={`M577 ${cy} L613 ${cy}`}
          className={styles.edge}
          markerStart="url(#hub-arrow)"
          markerEnd="url(#hub-arrow)"
        />
      ))}

      <Box x={10} y={hubCy - 28} w={140} h={56} lines={[{ t: 'Plain-language' }, { t: 'request' }]} />
      <Box
        x={185}
        y={hubCy - 34}
        w={160}
        h={68}
        kind="hub"
        lines={[{ t: 'AI assistant', c: 'hubTitle' }, { t: 'plans and runs the steps', c: 'hubSub' }]}
      />

      {rows.map((r, i) => (
        <g key={r.mcp}>
          <Box
            x={395}
            y={cys[i] - 28}
            w={180}
            h={56}
            kind="mcp"
            lines={[{ t: r.mcp }, { t: r.mcpSub, c: 'sub' }]}
          />
          <Box
            x={615}
            y={cys[i] - 28}
            w={150}
            h={56}
            lines={[{ t: r.sys }, { t: r.sysSub, c: 'sub' }]}
          />
        </g>
      ))}
    </Figure>
  );
}

/* ---------- 2. By hand vs. one prompt ---------- */

export function ManualVsPrompt() {
  const steps = [
    { a: 'Search Paligo', b: 'for the callout', app: 'paligo' },
    { a: 'Filter to the', b: 'past 3 weeks', app: 'paligo' },
    { a: 'Open article,', b: 'delete callout', app: 'paligo' },
    { a: 'Publish article', b: 'to Zendesk', app: 'paligo' },
    { a: 'Add label', b: 'release_100.11', app: 'zendesk' },
    { a: 'Promote on', b: 'home page', app: 'zendesk' },
  ];
  const w = 112;
  const gap = 12;
  const x0 = 14;
  const chipY = 72;
  const chipH = 56;
  const xs = steps.map((_, i) => x0 + i * (w + gap));

  // bracket over steps 3-5 (index 2-4)
  const bx1 = xs[2];
  const bx2 = xs[4] + w;

  return (
    <Figure
      titleId="mcp-manual"
      title="The same release cleanup by hand versus with one prompt"
      desc="By hand: six steps across Paligo and Zendesk, with three of them repeated for every affected article. With custom MCPs: one prompt goes to the Paligo MCP, which finds, edits, and publishes the articles, then to the Zendesk Guide MCP, which labels and promotes them."
      viewBox="0 0 760 300"
      caption="Removing a pre-release callout from recent articles. By hand, steps 3–5 repeat for every affected article across two apps. With the MCPs, it's one request.">
      <defs>
        <ArrowMarker id="mvp-arrow" />
      </defs>

      {/* ---- by hand ---- */}
      <text x={x0} y="20" className={styles.heading}>By hand, in two apps</text>

      {/* legend */}
      <rect x="520" y="10" width="12" height="12" rx="3" className={styles.paligo} />
      <text x="538" y="20" className={styles.sub}>Paligo</text>
      <rect x="600" y="10" width="12" height="12" rx="3" className={styles.zendesk} />
      <text x="618" y="20" className={styles.sub}>Zendesk</text>

      <path
        d={`M${bx1} 58 L${bx1} 50 L${bx2} 50 L${bx2} 58`}
        className={styles.edgeDashed}
      />
      <text x={(bx1 + bx2) / 2} y="44" textAnchor="middle" className={styles.sub}>
        repeat for every affected article
      </text>

      {steps.map((s, i) => (
        <g key={i}>
          <Box
            x={xs[i]}
            y={chipY}
            w={w}
            h={chipH}
            kind={s.app}
            lh={16}
            lines={[{ t: s.a, c: 'sub' }, { t: s.b, c: 'sub' }]}
          />
          <text x={xs[i] + 7} y={chipY + 13} className={styles.stepNum}>{i + 1}</text>
        </g>
      ))}

      <line x1="14" y1="160" x2="746" y2="160" className={styles.divider} />

      {/* ---- with MCPs ---- */}
      <text x={x0} y="190" className={styles.heading}>With my MCPs</text>

      <Box
        x={14}
        y={204}
        w={262}
        h={76}
        lh={16}
        lines={[
          { t: '“Remove the Summer 2027 callout,', c: 'quote' },
          { t: 'publish with release_100.11, and', c: 'quote' },
          { t: 'promote on the home page.”', c: 'quote' },
        ]}
      />
      <path d="M276 242 L300 242" className={styles.edge} markerEnd="url(#mvp-arrow)" />
      <Box
        x={302}
        y={214}
        w={144}
        h={56}
        kind="paligo"
        lines={[{ t: 'Paligo MCP' }, { t: 'find · edit · publish', c: 'sub' }]}
      />
      <path d="M446 242 L470 242" className={styles.edge} markerEnd="url(#mvp-arrow)" />
      <Box
        x={472}
        y={214}
        w={160}
        h={56}
        kind="zendesk"
        lines={[{ t: 'Zendesk Guide MCP' }, { t: 'label · promote', c: 'sub' }]}
      />
      <path d="M632 242 L656 242" className={styles.edge} markerEnd="url(#mvp-arrow)" />
      <Box
        x={658}
        y={214}
        w={88}
        h={56}
        kind="hub"
        lines={[{ t: 'Done', c: 'hubTitle' }, { t: '1 request', c: 'hubSub' }]}
      />
    </Figure>
  );
}

/* ---------- 4. From tickets to trusted content ---------- */

export function TicketPipeline() {
  const steps = [
    { lines: [{ t: 'Pull tickets' }, { t: 'Ticketing MCP', c: 'sub' }], kind: 'mcp' },
    { lines: [{ t: 'Filter' }, { t: 'status, date,', c: 'sub' }, { t: 'Reason field', c: 'sub' }] },
    { lines: [{ t: 'Group' }, { t: 'by recurring', c: 'sub' }, { t: 'question', c: 'sub' }] },
    { lines: [{ t: 'Draft' }, { t: 'help content', c: 'sub' }] },
    { lines: [{ t: 'Expert review' }, { t: 'verify accuracy', c: 'sub' }], kind: 'gate' },
    { lines: [{ t: 'Publish' }, { t: 'Zendesk Guide', c: 'sub' }, { t: 'MCP', c: 'sub' }], kind: 'mcp' },
  ];
  const w = 108;
  const gap = 22;
  const x0 = 10;
  const y = 40;
  const h = 76;
  const xs = steps.map((_, i) => x0 + i * (w + gap));
  const mid = y + h / 2;

  const draftCx = xs[3] + w / 2;
  const gateCx = xs[4] + w / 2;

  return (
    <Figure
      titleId="mcp-tickets"
      title="Planned workflow from support tickets to verified help content"
      desc="Tickets are pulled with the Ticketing MCP, filtered, grouped by recurring question, and drafted into help content. An expert reviews each draft for accuracy and sends corrections back before anything is published through the Zendesk Guide MCP."
      viewBox="0 0 800 200"
      caption="Planned: tickets become draft help content, but nothing is published until an expert confirms it's accurate. A closed ticket or a good satisfaction score doesn't prove the answer was right.">
      <defs>
        <ArrowMarker id="tp-arrow" />
        <ArrowMarker id="tp-arrow-gate" gate />
      </defs>

      <text x={x0} y="20" className={styles.heading}>Roadmap</text>

      {xs.slice(0, -1).map((x, i) => (
        <path
          key={i}
          d={`M${x + w} ${mid} L${x + w + gap - 2} ${mid}`}
          className={styles.edge}
          markerEnd="url(#tp-arrow)"
        />
      ))}

      {/* corrections loop: review -> draft */}
      <path
        d={`M${gateCx} ${y + h} L${gateCx} ${y + h + 34} L${draftCx} ${y + h + 34} L${draftCx} ${y + h + 2}`}
        className={styles.edgeDashed}
        markerEnd="url(#tp-arrow-gate)"
      />
      <text x={(draftCx + gateCx) / 2} y={y + h + 52} textAnchor="middle" className={styles.sub}>
        corrections
      </text>

      {steps.map((s, i) => (
        <Box key={i} x={xs[i]} y={y} w={w} h={h} kind={s.kind || 'node'} lh={16} lines={s.lines} />
      ))}
    </Figure>
  );
}
