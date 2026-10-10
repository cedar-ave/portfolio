import React from 'react';
import styles from './styles.module.css';

/* Diagrams for /portfolio/docs-as-code-help-site, based on the contributor guide in
   samples/contributor-guide. Names and details are generalized. */

/* ---------- shared pieces ---------- */

// Box with vertically centered lines of text.
// lines: [{ t: 'text', c: 'title' | 'sub' | 'mono' | 'hubTitle' | 'hubSub' }]
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

function ArrowMarker({ id, accent = false }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={accent ? styles.arrowAccent : styles.arrow} />
    </marker>
  );
}

function Figure({ titleId, title, desc, viewBox, caption, children }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg className={styles.svg} viewBox={viewBox} role="img" aria-labelledby={`${titleId}-t ${titleId}-d`}>
          <title id={`${titleId}-t`}>{title}</title>
          <desc id={`${titleId}-d`}>{desc}</desc>
          {children}
        </svg>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/* ---------- 1. End-to-end docs-as-code workflow ---------- */

export function HelpSiteWorkflow() {
  const files = [
    { f: 'articles/**/*.md', d: 'Markdown + YAML front matter' },
    { f: 'toc.yml', d: 'Navigation and ordering' },
    { f: 'docfx.json', d: 'Site metadata and feature flags' },
    { f: 'restapi/*.json', d: 'Swagger specs for API reference' },
    { f: 'builds/variables.yml', d: 'Pipeline settings' },
  ];
  const hub = { x: 650, y: 120, w: 150, h: 110 };
  const hubCy = hub.y + hub.h / 2;

  return (
    <Figure
      titleId="dch-flow"
      title="How the docs-as-code help site works, end to end"
      desc="Contributors write in VS Code with a live local preview, or in the Azure DevOps browser editor with no setup. Everything is plain text in a Git repo: Markdown articles with YAML front matter, toc.yml navigation, docfx.json metadata, Swagger files for API reference, and a pipeline variables file. Changes go on a feature branch, through a pull request with review and a conflict check, and merge to main. The merge triggers a build pipeline that installs the shared theme package and runs npm, Gulp, and DocFX to turn Markdown and Swagger into HTML. The pipeline publishes to a development site on demand and to the production site on merge. Every published page has an Edit this page link and a feedback form, which send readers back into the browser editor so the loop starts again."
      viewBox="0 0 1000 435"
      caption="Content is treated like code: versioned, reviewed, built, and deployed automatically, with every published page linking back to its own source.">
      <defs>
        <ArrowMarker id="dch-flow-arrow" />
        <ArrowMarker id="dch-flow-accent" accent />
      </defs>

      <text x={110} y={28} textAnchor="middle" className={styles.heading}>Write</text>
      <text x={340} y={28} textAnchor="middle" className={styles.heading}>Plain-text source</text>
      <text x={545} y={28} textAnchor="middle" className={styles.heading}>Review</text>
      <text x={725} y={28} textAnchor="middle" className={styles.heading}>Build</text>
      <text x={912} y={28} textAnchor="middle" className={styles.heading}>Publish</text>

      {/* write -> repo */}
      <path d="M200,95 C218,95 216,140 233,140" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />
      <path d="M200,195 C218,195 216,160 233,160" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />

      {/* repo -> branch */}
      <path d="M445,150 C462,150 460,85 478,85" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />

      {/* review column */}
      <path d="M545,110 L545,130" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />
      <path d="M545,200 L545,218" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />

      {/* merge -> build */}
      <path d={`M610,245 C632,245 628,${hubCy + 15} ${hub.x - 2},${hubCy + 15}`} className={styles.edge} markerEnd="url(#dch-flow-arrow)" />
      <text x={628} y={278} textAnchor="middle" className={styles.label}>Triggers</text>
      <text x={628} y={292} textAnchor="middle" className={styles.label}>automatically</text>

      {/* theme -> build */}
      <path d={`M725,92 L725,${hub.y - 2}`} className={styles.edge} markerEnd="url(#dch-flow-arrow)" />

      {/* build -> sites */}
      <path d={`M${hub.x + hub.w},${hubCy - 10} C820,${hubCy - 10} 818,100 838,100`} className={styles.edgeDashed} markerEnd="url(#dch-flow-arrow)" />
      <path d={`M${hub.x + hub.w},${hubCy + 10} C820,${hubCy + 10} 818,200 838,200`} className={styles.edge} markerEnd="url(#dch-flow-arrow)" />
      <path d="M912,230 L912,293" className={styles.edge} markerEnd="url(#dch-flow-arrow)" />

      {/* feedback loop: readers -> browser editor */}
      <path
        d="M838,330 L800,330 Q785,330 785,345 L785,385 Q785,395 775,395 L120,395 Q110,395 110,385 L110,234"
        className={styles.edgeAccent}
        markerEnd="url(#dch-flow-accent)"
      />
      <text x={450} y={418} textAnchor="middle" className={styles.accentLabel}>
        Edit this page opens the source file, so readers can become contributors and the loop starts again
      </text>

      {/* boxes */}
      <Box x={20} y={60} w={180} h={70} kind="node" lines={[{ t: 'VS Code' }, { t: 'Clone, branch, edit', c: 'sub' }, { t: 'Live local preview', c: 'sub' }]} />
      <Box x={20} y={160} w={180} h={72} kind="node" lines={[{ t: 'Browser editor' }, { t: 'Azure DevOps', c: 'sub' }, { t: 'No setup needed', c: 'sub' }]} />

      <rect x={235} y={48} width={210} height={222} rx={10} className={styles.frame} />
      <text x={251} y={72} className={styles.frameTitle}>docs repo (Git)</text>
      {files.map((file, i) => {
        const y = 100 + i * 35;
        return (
          <g key={file.f}>
            <rect x={251} y={y - 10} width={4} height={26} rx={2} className={styles.fileBar} />
            <text x={263} y={y} className={styles.mono}>{file.f}</text>
            <text x={263} y={y + 14} className={styles.fileDesc}>{file.d}</text>
          </g>
        );
      })}

      <Box x={480} y={60} w={130} h={50} kind="platform" lines={[{ t: 'Feature branch' }]} />
      <Box x={480} y={132} w={130} h={68} kind="gate" lines={[{ t: 'Pull request' }, { t: 'Peer review and', c: 'sub' }, { t: 'conflict check', c: 'sub' }]} />
      <Box x={480} y={220} w={130} h={50} kind="platform" lines={[{ t: 'Merge to main' }]} />

      <Box x={650} y={40} w={150} h={52} kind="platform" lines={[{ t: 'Shared theme' }, { t: 'Templates, CSS, JS', c: 'sub' }]} />
      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'Build pipeline', c: 'hubTitle' }, { t: 'npm → Gulp → DocFX', c: 'hubSub' }, { t: 'Markdown → HTML', c: 'hubSub' }, { t: 'Swagger → API ref', c: 'hubSub' }]}
      />

      <Box x={840} y={70} w={145} h={60} kind="deploy" lines={[{ t: 'Dev site' }, { t: 'Manual run, any branch', c: 'sub' }]} />
      <Box x={840} y={170} w={145} h={60} kind="deploy" lines={[{ t: 'Production site' }, { t: 'Auto on every merge', c: 'sub' }]} />
      <Box x={840} y={295} w={145} h={70} kind="source" lines={[{ t: 'Readers' }, { t: 'Edit this page link', c: 'sub' }, { t: 'Feedback form', c: 'sub' }]} />

    </Figure>
  );
}

/* ---------- 2. Automated build and publish pipelines ---------- */

export function HelpSitePipelines() {
  const stages = [
    { kind: 'platform', lines: [{ t: 'Read settings' }, { t: 'variables.yml', c: 'mono' }, { t: 'URL + flags', c: 'sub' }] },
    { kind: 'platform', lines: [{ t: 'Install' }, { t: 'Node + npm', c: 'sub' }, { t: 'Theme package', c: 'sub' }, { t: 'Latest DocFX', c: 'sub' }] },
    { kind: 'gate', lines: [{ t: 'API metadata' }, { t: '.NET projects', c: 'sub' }, { t: '→ API YAML', c: 'sub' }] },
    { kind: 'hub', lines: [{ t: 'Build site', c: 'hubTitle' }, { t: 'Gulp + DocFX', c: 'hubSub' }, { t: 'HTML pages', c: 'hubSub' }, { t: 'API reference', c: 'hubSub' }] },
    { kind: 'platform', lines: [{ t: 'Stage artifact' }, { t: '_site/', c: 'mono' }, { t: 'Saved to run', c: 'sub' }] },
  ];
  const sx = (i) => 226 + i * 116;
  const sw = 104;
  const sy = 125;
  const sh = 96;
  const scy = sy + sh / 2;
  const dests = [
    { y: 60, kind: 'deploy', t: 'Production', s: 'On merge, or PROD ✓' },
    { y: 136, kind: 'deploy', t: 'Development', s: 'When DEV ✓' },
    { y: 212, kind: 'node', t: 'Downloadable zip', s: 'When neither is ✓' },
  ];
  const benefits = [
    { t: 'Zero manual deploy steps', s: 'Merging to main is the release' },
    { t: 'One pipeline template', s: 'A new site edits one variables file' },
    { t: 'One theme change', s: 'Reaches every site on its next build' },
    { t: 'Per-task build logs', s: 'Failures are pinpointed fast' },
  ];

  return (
    <Figure
      titleId="dch-pipes"
      title="The automated pipelines behind every docs site"
      desc="Two triggers start a site's build pipeline: a merge to main runs automatically and always publishes to production, and a manual run lets the user pick any branch and check PROD, DEV, both, or neither. On the Azure Pipelines build agent, the shared publish.yaml template reads the site's variables file, installs Node, npm packages, the shared theme package, and the latest DocFX, optionally generates API metadata from .NET projects, builds the site with Gulp and DocFX, turning Markdown into HTML and Swagger into API reference, and stages the output as an artifact. The artifact deploys to production, to development, or is offered as a downloadable zip when no environment is checked. A separate theme pipeline publishes the shared theme as an npm package that every site installs on its next build. Benefits: zero manual deploy steps, one pipeline template, one theme change reaching every site, and per-task build logs."
      viewBox="0 0 1000 500"
      caption="Writers never touch a server: a merge or a two-click manual run handles the build, the theme, the API reference, and the deployment.">
      <defs>
        <ArrowMarker id="dch-pipe-arrow" />
        <ArrowMarker id="dch-pipe-accent" accent />
      </defs>

      <text x={100} y={30} textAnchor="middle" className={styles.heading}>Triggers</text>
      <text x={505} y={30} textAnchor="middle" className={styles.heading}>Azure Pipelines build agent</text>
      <text x={912} y={30} textAnchor="middle" className={styles.heading}>Blob storage</text>

      {/* triggers -> agent */}
      <path d={`M180,102 C202,102 200,${scy - 8} ${sx(0) - 2},${scy - 8}`} className={styles.edge} markerEnd="url(#dch-pipe-arrow)" />
      <path d={`M180,202 C202,202 200,${scy + 8} ${sx(0) - 2},${scy + 8}`} className={styles.edge} markerEnd="url(#dch-pipe-arrow)" />

      <Box x={20} y={70} w={160} h={64} kind="source" lines={[{ t: 'Merge to main' }, { t: 'Runs automatically', c: 'sub' }]} />
      <Box x={20} y={170} w={160} h={64} kind="source" lines={[{ t: 'Manual run' }, { t: 'Any branch, any target', c: 'sub' }]} />

      {/* agent frame with numbered rail */}
      <rect x={210} y={48} width={600} height={232} rx={10} className={styles.frame} />
      <text x={226} y={72} className={styles.frameTitle}>builds/publish.yaml</text>
      <text x={794} y={72} textAnchor="end" className={styles.fileDesc}>One shared template, every site</text>
      <path d={`M${sx(0) + sw / 2},104 L${sx(4) + sw / 2},104`} className={styles.rail} />

      {stages.map((s, i) => (
        <g key={i}>
          {i < stages.length - 1 && (
            <path d={`M${sx(i) + sw},${scy} L${sx(i + 1) - 2},${scy}`} className={styles.edge} markerEnd="url(#dch-pipe-arrow)" />
          )}
          <circle cx={sx(i) + sw / 2} cy={104} r={11} className={s.kind === 'gate' ? styles.railDotOptional : styles.railDot} />
          <text x={sx(i) + sw / 2} y={108} textAnchor="middle" className={s.kind === 'gate' ? styles.markerNumOptional : styles.markerNum}>
            {i + 1}
          </text>
          <Box x={sx(i)} y={sy} w={sw} h={sh} kind={s.kind} lines={s.lines} lh={16} />
        </g>
      ))}

      {/* legend */}
      <rect x={430} y={248} width={22} height={12} rx={3} className={styles.platform} />
      <text x={458} y={258} className={styles.fileDesc}>Every run</text>
      <rect x={530} y={248} width={22} height={12} rx={3} className={styles.gate} />
      <text x={558} y={258} className={styles.fileDesc}>Only when switched on in variables.yml</text>

      {/* agent -> destinations */}
      {dests.map((d) => (
        <path
          key={d.t}
          d={`M${sx(4) + sw},${scy} C830,${scy} 822,${d.y + 29} 838,${d.y + 29}`}
          className={d.kind === 'node' ? styles.edgeDashed : styles.edge}
          markerEnd="url(#dch-pipe-arrow)"
        />
      ))}
      {dests.map((d) => (
        <Box key={d.t} x={840} y={d.y} w={145} h={58} kind={d.kind} lines={[{ t: d.t }, { t: d.s, c: 'sub' }]} />
      ))}

      {/* theme pipeline */}
      <text x={20} y={318} className={styles.heading}>Shared theme pipeline</text>
      <path d="M180,364 L208,364" className={styles.edge} markerEnd="url(#dch-pipe-arrow)" />
      <path d="M370,364 L398,364" className={styles.edge} markerEnd="url(#dch-pipe-arrow)" />
      <path
        d={`M560,364 L590,364 Q600,364 600,354 L600,300 Q600,292 590,292 L${sx(1) + sw / 2 + 10},292 Q${sx(1) + sw / 2},292 ${sx(1) + sw / 2},282 L${sx(1) + sw / 2},${sy + sh + 2}`}
        className={styles.edgeAccent}
        markerEnd="url(#dch-pipe-accent)"
      />
      <text x={612} y={330} className={styles.accentLabel}>Installed by every site</text>
      <text x={612} y={345} className={styles.accentLabel}>on its next build</text>

      <Box x={20} y={335} w={160} h={58} kind="source" lines={[{ t: 'Theme update merged' }, { t: 'One change', c: 'sub' }]} />
      <Box x={210} y={335} w={160} h={58} kind="hub" lines={[{ t: 'Theme pipeline', c: 'hubTitle' }, { t: 'Builds + versions', c: 'hubSub' }]} />
      <Box x={400} y={335} w={160} h={58} kind="platform" lines={[{ t: 'Theme npm package' }, { t: 'Single source of truth', c: 'sub' }]} />

      {/* benefits */}
      {benefits.map((b, i) => {
        const x = 20 + i * 243;
        return (
          <g key={b.t}>
            <rect x={x} y={420} width={230} height={62} rx={8} className={styles.tile} />
            <rect x={x} y={420} width={5} height={62} rx={2} className={styles.tileBar} />
            <text x={x + 18} y={446} className={styles.tileTitle}>{b.t}</text>
            <text x={x + 18} y={466} className={styles.sub}>{b.s}</text>
          </g>
        );
      })}
    </Figure>
  );
}
