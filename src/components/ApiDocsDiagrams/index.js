import React from 'react';
import styles from './styles.module.css';

/* Diagrams for /experience/api-documentation. Names and details are generalized. */

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

function ArrowMarker({ id }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={styles.arrow} />
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

/* ---------- 1. Two kinds of API docs ---------- */

export function TwoApiTypes() {
  const xs = [20, 225, 430, 635];
  const w = 170;
  const h = 64;
  const hub = { x: 840, y: 130, w: 140, h: 100 };
  const hubCy = hub.y + hub.h / 2;
  const rows = [
    {
      y: 60,
      heading: 'REST API docs · for integrators calling web services over HTTP',
      boxes: [
        { kind: 'source', lines: [{ t: 'Swagger JSON' }, { t: 'from 13 web services', c: 'sub' }] },
        { kind: 'platform', lines: [{ t: 'Prepare the specs' }, { t: 'convert, describe, tag', c: 'sub' }] },
        { kind: 'node', lines: [{ t: 'DocFX + plugins' }, { t: 'split into pages', c: 'sub' }] },
        { kind: 'deploy', lines: [{ t: 'Endpoint reference' }, { t: 'routes, params, responses', c: 'sub' }] },
      ],
    },
    {
      y: 236,
      heading: '.NET API docs · for developers writing plugins for the engine',
      boxes: [
        { kind: 'source', lines: [{ t: 'C# projects' }, { t: 'code + XML comments', c: 'sub' }] },
        { kind: 'platform', lines: [{ t: 'docfx metadata' }, { t: 'needs .NET build tools', c: 'sub' }] },
        { kind: 'node', lines: [{ t: 'YAML models' }, { t: 'obj/api, not checked in', c: 'sub' }] },
        { kind: 'deploy', lines: [{ t: 'SDK reference' }, { t: 'namespaces, classes', c: 'sub' }] },
      ],
    },
  ];

  return (
    <Figure
      titleId="api-types"
      title="Two kinds of API docs with different sources, tools, and readers"
      desc="REST API docs start from Swagger JSON files pulled from 13 web services. The specs are converted, given descriptions, and tagged, then DocFX and two plugins split them into endpoint reference pages for integrators who call the services over HTTP. .NET API docs start from C# projects and their XML comments. docfx metadata compiles them with .NET build tools into YAML models in obj/api, which are never checked in, and DocFX renders SDK reference pages for developers writing plugins for the processing engine. Both sets publish to one help site under a developer menu."
      viewBox="0 0 1000 340"
      caption="The two sets share a help site and nothing else: different sources, different toolchains, different readers, and different ways to break.">
      <defs>
        <ArrowMarker id="types-arrow" />
      </defs>

      {rows.map((r) => (
        <g key={r.heading}>
          <text x={20} y={r.y - 16} className={styles.heading}>{r.heading}</text>
          {xs.slice(0, -1).map((x) => (
            <path key={x} d={`M${x + w},${r.y + h / 2} L${x + w + 33},${r.y + h / 2}`} className={styles.edge} markerEnd="url(#types-arrow)" />
          ))}
          <path
            d={`M${xs[3] + w},${r.y + h / 2} C${xs[3] + w + 20},${r.y + h / 2} ${hub.x - 20},${hubCy} ${hub.x - 2},${hubCy}`}
            className={styles.edge}
            markerEnd="url(#types-arrow)"
          />
          {r.boxes.map((b, i) => (
            <Box key={i} x={xs[i]} y={r.y} w={w} h={h} kind={b.kind} lines={b.lines} />
          ))}
        </g>
      ))}

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'One help site', c: 'hubTitle' }, { t: 'developer menu', c: 'hubSub' }]}
      />
    </Figure>
  );
}

/* ---------- 2. REST API pipeline ---------- */

export function RestApiPipeline() {
  const xs = [20, 200, 380, 560, 740, 920];
  const w = 150;
  const h = 64;
  const y = 60;
  const steps = [
    { kind: 'source', lines: [{ t: 'Get the spec' }, { t: 'from the live service', c: 'sub' }] },
    { kind: 'gate', lines: [{ t: 'Convert' }, { t: 'OpenAPI 3 → Swagger 2', c: 'sub' }] },
    { kind: 'node', lines: [{ t: 'Add a description' }, { t: 'info.description', c: 'mono' }] },
    { kind: 'platform', lines: [{ t: 'Run my scripts' }, { t: 'jq tags, Python pages', c: 'sub' }] },
    { kind: 'hub', lines: [{ t: 'DocFX build', c: 'hubTitle' }, { t: '+ split plugins', c: 'hubSub' }] },
    { kind: 'deploy', lines: [{ t: 'Reference pages' }, { t: 'per tag and operation', c: 'sub' }] },
  ];
  const hubX = xs[4];

  return (
    <Figure
      titleId="api-rest"
      title="How a REST API spec becomes reference pages"
      desc="Step 1: get the Swagger JSON from the running service. Step 2: if the spec is OpenAPI 3, convert it to Swagger 2. Step 3: add a description to the spec's info object. Step 4: run the scripts that add a tags object with jq and generate landing pages with Python. Step 5: DocFX builds the site and two plugins split each spec into pages. Step 6: the output is a reference page for every tag and every operation. The menu order in restapi/toc.yml and the conceptual articles also feed into the build."
      viewBox="0 0 1090 300"
      caption="Steps 2 through 4 fill gaps in DocFX. I added the conversion step and wrote the scripts in step 4.">
      <defs>
        <ArrowMarker id="rest-arrow" />
      </defs>

      {xs.map((x, i) => (
        <text key={x} x={x + w / 2} y={y - 14} textAnchor="middle" className={styles.stepNum}>
          {`STEP ${i + 1}`}
        </text>
      ))}
      <text x={xs[1] + w / 2} y={y + h + 18} textAnchor="middle" className={styles.label}>only if needed</text>

      {xs.slice(0, -1).map((x) => (
        <path key={x} d={`M${x + w},${y + h / 2} L${x + w + 28},${y + h / 2}`} className={styles.edge} markerEnd="url(#rest-arrow)" />
      ))}

      {/* inputs into the build */}
      <path d={`M705,200 C705,170 ${hubX + 45},170 ${hubX + 45},${y + h + 2}`} className={styles.edge} markerEnd="url(#rest-arrow)" />
      <path d={`M905,200 C905,170 ${hubX + 105},170 ${hubX + 105},${y + h + 2}`} className={styles.edge} markerEnd="url(#rest-arrow)" />

      {steps.map((s, i) => (
        <Box key={i} x={xs[i]} y={y} w={w} h={h} kind={s.kind} lines={s.lines} />
      ))}

      <Box x={620} y={200} w={170} h={60} kind="node" lines={[{ t: 'Menu order' }, { t: 'restapi/toc.yml', c: 'mono' }]} />
      <Box x={820} y={200} w={170} h={60} kind="node" lines={[{ t: 'Conceptual articles' }, { t: 'overviews, auth, guides', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 3. .NET API pipeline ---------- */

export function EngineApiPipeline() {
  const w = 170;
  const hub = { x: 470, y: 100, w: 170, h: 80 };
  const hubCy = hub.y + hub.h / 2;

  return (
    <Figure
      titleId="api-dotnet"
      title="How the engine's C# code becomes .NET API reference"
      desc="The engine repo has one branch per edition: release/6.0 for the classic edition and main for the cloud edition. Each branch's docfx.json has a metadata section that points to the .csproj files. docfx metadata compiles the projects, which requires Visual Studio Build Tools with the .NET desktop workload, and writes YAML models to obj/api. Those files are never checked in. DocFX renders them as SDK reference pages with one page per member."
      viewBox="0 0 1090 320"
      caption="Each edition builds from its own branch, so the reference always matches the code customers run.">
      <defs>
        <ArrowMarker id="dotnet-arrow" />
      </defs>

      <text x={105} y={32} textAnchor="middle" className={styles.heading}>Engine repo</text>
      <text x={335} y={32} textAnchor="middle" className={styles.heading}>Configuration</text>
      <text x={hub.x + hub.w / 2} y={32} textAnchor="middle" className={styles.heading}>Build</text>
      <text x={775} y={32} textAnchor="middle" className={styles.heading}>Build output</text>
      <text x={985} y={32} textAnchor="middle" className={styles.heading}>Published</text>

      {/* branches -> config */}
      <path d="M190,80 C220,80 220,140 248,140" className={styles.edge} markerEnd="url(#dotnet-arrow)" />
      <path d="M190,200 C220,200 220,140 248,140" className={styles.edge} markerEnd="url(#dotnet-arrow)" />
      {/* config -> hub -> obj/api -> pages */}
      <path d={`M420,140 L${hub.x - 2},140`} className={styles.edge} markerEnd="url(#dotnet-arrow)" />
      <path d={`M${hub.x + hub.w},${hubCy} L688,${hubCy}`} className={styles.edge} markerEnd="url(#dotnet-arrow)" />
      <path d={`M860,${hubCy} L898,${hubCy}`} className={styles.edge} markerEnd="url(#dotnet-arrow)" />
      {/* build tools requirement */}
      <path d={`M${hub.x + hub.w / 2},232 L${hub.x + hub.w / 2},${hub.y + hub.h + 2}`} className={styles.edgeDashed} markerEnd="url(#dotnet-arrow)" />
      <text x={hub.x + hub.w / 2 + 8} y={212} className={styles.label}>required</text>

      <Box x={20} y={50} w={w} h={60} kind="source" lines={[{ t: 'release/6.0 branch' }, { t: 'classic edition code', c: 'sub' }]} />
      <Box x={20} y={170} w={w} h={60} kind="source" lines={[{ t: 'main branch' }, { t: 'cloud edition code', c: 'sub' }]} />
      <Box x={250} y={110} w={w} h={60} kind="node" lines={[{ t: 'docfx.json' }, { t: 'metadata → .csproj', c: 'mono' }]} />
      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'docfx metadata', c: 'hubTitle' }, { t: 'compiles the projects', c: 'hubSub' }]}
      />
      <Box x={690} y={110} w={w} h={60} kind="node" lines={[{ t: 'obj/api' }, { t: 'YAML, never checked in', c: 'sub' }]} />
      <Box x={900} y={110} w={w} h={60} kind="deploy" lines={[{ t: 'SDK reference' }, { t: 'a page per member', c: 'sub' }]} />
      <Box x={hub.x} y={234} w={hub.w} h={60} kind="gate" lines={[{ t: 'Build tools' }, { t: '.NET desktop workload', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 4. Two editions, shared and separate sources ---------- */

export function EditionSources() {
  const outW = 180;
  const leftX = 20;
  const rightX = 760;
  const h = 60;
  const rows = [
    { y: 60, out: 'REST overview pages', sub: 'landing page, concepts' },
    { y: 170, out: 'REST reference', sub: 'from Swagger specs' },
    { y: 280, out: '.NET API reference', sub: 'from C# code' },
  ];
  const mid = (r) => r.y + h / 2;

  return (
    <Figure
      titleId="api-editions"
      title="Which sources each product edition's API docs build from"
      desc="REST overview pages, meaning the landing page and conceptual articles, come from one set of classic edition source files shared by both editions. REST reference for the classic edition comes from the specs in the platform repo, and for the cloud edition from specs in the cloud edition's docs repo. .NET API reference for the classic edition builds from the engine repo's release/6.0 branch, and for the cloud edition from its main branch."
      viewBox="0 0 960 370"
      caption="Shared where the APIs matched, separate where they didn't.">
      <defs>
        <ArrowMarker id="ed-arrow" />
      </defs>

      <text x={leftX + outW / 2} y={36} textAnchor="middle" className={styles.heading}>Classic edition</text>
      <text x={480} y={36} textAnchor="middle" className={styles.heading}>Sources</text>
      <text x={rightX + outW / 2} y={36} textAnchor="middle" className={styles.heading}>Cloud edition</text>

      {/* row 1: one shared source feeds both editions */}
      <path d={`M380,${mid(rows[0])} L${leftX + outW + 2},${mid(rows[0])}`} className={styles.edge} markerEnd="url(#ed-arrow)" />
      <path d={`M580,${mid(rows[0])} L${rightX - 2},${mid(rows[0])}`} className={styles.edge} markerEnd="url(#ed-arrow)" />
      <text x={290} y={mid(rows[0]) - 8} textAnchor="middle" className={styles.label}>shared</text>
      <text x={670} y={mid(rows[0]) - 8} textAnchor="middle" className={styles.label}>shared</text>

      {/* rows 2 and 3: separate sources */}
      {rows.slice(1).map((r) => (
        <g key={r.out}>
          <path d={`M270,${mid(r)} L${leftX + outW + 2},${mid(r)}`} className={styles.edge} markerEnd="url(#ed-arrow)" />
          <path d={`M690,${mid(r)} L${rightX - 2},${mid(r)}`} className={styles.edge} markerEnd="url(#ed-arrow)" />
        </g>
      ))}

      {rows.map((r) => (
        <g key={r.out}>
          <Box x={leftX} y={r.y} w={outW} h={h} kind="deploy" lines={[{ t: r.out }, { t: r.sub, c: 'sub' }]} />
          <Box x={rightX} y={r.y} w={outW} h={h} kind="deploy" lines={[{ t: r.out }, { t: r.sub, c: 'sub' }]} />
        </g>
      ))}

      <Box x={380} y={rows[0].y} w={200} h={h} kind="platform" lines={[{ t: 'Classic source files' }, { t: 'one copy, used by both', c: 'sub' }]} />

      <Box x={270} y={rows[1].y} w={200} h={h} kind="source" lines={[{ t: 'Classic specs' }, { t: 'restapi/ in platform repo', c: 'sub' }]} />
      <Box x={490} y={rows[1].y} w={200} h={h} kind="source" lines={[{ t: 'Cloud specs' }, { t: 'restapi/ in cloud docs repo', c: 'sub' }]} />

      <Box x={270} y={rows[2].y} w={200} h={h} kind="source" lines={[{ t: 'release/6.0 branch' }, { t: 'engine repo', c: 'sub' }]} />
      <Box x={490} y={rows[2].y} w={200} h={h} kind="source" lines={[{ t: 'main branch' }, { t: 'engine repo', c: 'sub' }]} />
    </Figure>
  );
}
