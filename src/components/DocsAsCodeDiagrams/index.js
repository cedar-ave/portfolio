import React from 'react';
import styles from './styles.module.css';

/* Diagrams for /experience/docs-as-code and /experience/docs-as-code-contributions.
   Names and details are generalized. */

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

/* ---------- 1. The whole ecosystem ---------- */

export function EcosystemMap() {
  const hub = { x: 590, y: 110, w: 150, h: 110 };
  const hubCy = hub.y + hub.h / 2;
  const sources = [
    { y: 55, t: 'Dedicated docs repos', s: 'one per product' },
    { y: 145, t: 'Docs/ in product repos', s: 'docs next to the code' },
    { y: 235, t: 'API sources', s: '.NET projects + Swagger files' },
  ];

  return (
    <Figure
      titleId="dac-map"
      title="The docs-as-code ecosystem I built"
      desc="A shared platform of three parts: a starter template repo that is forked or copied to start each site, a theme source repo, and a theme npm package that the theme pipeline publishes. Docs live in dedicated docs repos, in Docs folders inside product code repos, and in API sources such as .NET projects and Swagger files. Each site has its own build pipeline that pulls in the theme package, runs npm, Gulp, and DocFX, and deploys to production or development blob storage."
      viewBox="0 0 960 350"
      caption="I built every box on this map: the shared platform, the per-site structure, the pipelines, and the hosting.">
      <defs>
        <ArrowMarker id="map-arrow" />
      </defs>

      <text x={125} y={30} textAnchor="middle" className={styles.heading}>Shared platform</text>
      <text x={410} y={30} textAnchor="middle" className={styles.heading}>Docs sources</text>
      <text x={665} y={30} textAnchor="middle" className={styles.heading}>Build</text>
      <text x={870} y={30} textAnchor="middle" className={styles.heading}>Hosting</text>

      {/* starter template -> new sites */}
      <path d="M230,84 L298,84" className={styles.edgeDashed} markerEnd="url(#map-arrow)" />
      <path d="M230,95 C262,95 266,174 298,174" className={styles.edgeDashed} markerEnd="url(#map-arrow)" />
      <text x={264} y={76} textAnchor="middle" className={styles.label}>fork / copy</text>

      {/* theme repo -> npm package */}
      <path d="M125,233 L125,283" className={styles.edge} markerEnd="url(#map-arrow)" />
      <text x={133} y={262} className={styles.label}>theme pipeline publishes</text>

      {/* npm package -> build */}
      <path d={`M230,314 L620,314 C665,314 665,290 665,${hub.y + hub.h + 2}`} className={styles.edge} markerEnd="url(#map-arrow)" />
      <text x={420} y={332} textAnchor="middle" className={styles.label}>theme package installed at build time</text>

      {/* sources -> build */}
      {sources.map((s) => (
        <path
          key={s.t}
          d={`M520,${s.y + 29} C555,${s.y + 29} 555,${hubCy} ${hub.x - 2},${hubCy}`}
          className={styles.edge}
          markerEnd="url(#map-arrow)"
        />
      ))}

      {/* build -> hosting */}
      <path d={`M${hub.x + hub.w},${hubCy} C765,${hubCy} 765,102 788,102`} className={styles.edge} markerEnd="url(#map-arrow)" />
      <path d={`M${hub.x + hub.w},${hubCy} C765,${hubCy} 765,228 788,228`} className={styles.edge} markerEnd="url(#map-arrow)" />

      <Box x={20} y={55} w={210} h={58} kind="platform" lines={[{ t: 'Starter template repo' }, { t: 'docfx.json, gulpfile, pipeline', c: 'sub' }]} />
      <Box x={20} y={175} w={210} h={58} kind="platform" lines={[{ t: 'Theme source repo' }, { t: 'template overrides, JS, CSS', c: 'sub' }]} />
      <Box x={20} y={285} w={210} h={58} kind="platform" lines={[{ t: 'Theme npm package' }, { t: 'shared by every site', c: 'sub' }]} />

      {sources.map((s) => (
        <Box key={s.t} x={300} y={s.y} w={220} h={58} kind="source" lines={[{ t: s.t }, { t: s.s, c: 'sub' }]} />
      ))}

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'Build pipeline', c: 'hubTitle' }, { t: 'one per site', c: 'hubSub' }, { t: 'npm → Gulp → DocFX', c: 'hubSub' }]}
      />

      <Box x={790} y={70} w={160} h={64} kind="deploy" lines={[{ t: 'Production' }, { t: 'blob storage → live site', c: 'sub' }]} />
      <Box x={790} y={196} w={160} h={64} kind="deploy" lines={[{ t: 'Development' }, { t: 'blob storage → preview', c: 'sub' }]} />
      <text x={870} y={290} textAnchor="middle" className={styles.sub}>Each site deploys to its</text>
      <text x={870} y={306} textAnchor="middle" className={styles.sub}>own path on one domain.</text>
    </Figure>
  );
}

/* ---------- 2. Local authoring loop ---------- */

export function LocalDevLoop() {
  const steps = [
    { kind: 'platform', lines: [{ t: 'npm install' }, { t: 'theme + build tools', c: 'sub' }] },
    { kind: 'platform', lines: [{ t: 'postinstall' }, { t: 'downloads latest DocFX', c: 'sub' }] },
    { kind: 'node', lines: [{ t: 'npm start' }, { t: 'runs gulp run', c: 'sub' }] },
    { kind: 'hub', lines: [{ t: 'Build in parallel', c: 'hubTitle' }, { t: 'DocFX, Sass, assets', c: 'hubSub' }] },
    { kind: 'deploy', lines: [{ t: 'BrowserSync' }, { t: 'serves the site locally', c: 'sub' }] },
  ];
  const xs = [20, 210, 400, 590, 780];
  const w = 160;
  const y = 60;
  const h = 64;

  return (
    <Figure
      titleId="dac-local"
      title="The local build and live-reload loop"
      desc="One-time setup: npm install pulls the theme and build tools, then a postinstall step downloads the latest DocFX release into the project. Every session: npm start runs Gulp, which builds with DocFX, compiles Sass, and copies assets in parallel, then BrowserSync serves the site. When a writer saves a Markdown, SCSS, or template file, a watcher triggers a rebuild and the browser reloads."
      viewBox="0 0 960 290"
      caption="DocFX installs into the project, not the machine, so every contributor and every build agent runs the same toolchain with one command.">
      <defs>
        <ArrowMarker id="loop-arrow" />
      </defs>

      <text x={195} y={40} textAnchor="middle" className={styles.heading}>One-time setup</text>
      <text x={670} y={40} textAnchor="middle" className={styles.heading}>Every session</text>

      {xs.slice(0, -1).map((x) => (
        <path key={x} d={`M${x + w},${y + h / 2} L${x + w + 28},${y + h / 2}`} className={styles.edge} markerEnd="url(#loop-arrow)" />
      ))}

      {/* live-reload loop */}
      <path d="M860,124 L860,198" className={styles.edge} markerEnd="url(#loop-arrow)" />
      <path d="M780,230 L752,230" className={styles.edge} markerEnd="url(#loop-arrow)" />
      <path d="M670,200 L670,126" className={styles.edge} markerEnd="url(#loop-arrow)" />
      <text x={765} y={160} textAnchor="middle" className={styles.label}>edit → rebuild</text>
      <text x={765} y={175} textAnchor="middle" className={styles.label}>→ reload</text>

      {steps.map((s, i) => (
        <Box key={i} x={xs[i]} y={y} w={w} h={h} kind={s.kind} lines={s.lines} />
      ))}

      <Box x={590} y={200} w={160} h={60} kind="source" lines={[{ t: 'Watcher fires' }, { t: 'reruns DocFX or Sass', c: 'sub' }]} />
      <Box x={780} y={200} w={160} h={60} kind="source" lines={[{ t: 'Save a change' }, { t: 'Markdown, SCSS, template', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 3. API reference generated from source ---------- */

export function ApiDocsFlow() {
  const w = 150;
  const h = 58;
  const hub = { x: 735, y: 150, w: 120, h: 100 };

  return (
    <Figure
      titleId="dac-api"
      title="How API reference docs are generated from source"
      desc=".NET API reference: C# projects are read by docfx metadata, which extracts code and XML comments into YAML models. REST API reference: Swagger JSON files for 13 services pass through a jq tag script and a Python landing-page script, then DocFX plugins split them into one page per tag and operation. Conceptual Markdown articles join both in the docfx build step, which outputs web pages and PDF guides."
      viewBox="0 0 1000 360"
      caption="Reference docs come from the code and the API specs, so they change when the product changes. Writers own the conceptual layer around them.">
      <defs>
        <ArrowMarker id="api-arrow" />
      </defs>

      <text x={20} y={38} className={styles.heading}>.NET API reference</text>
      <text x={20} y={158} className={styles.heading}>REST API reference</text>
      <text x={20} y={278} className={styles.heading}>Conceptual content</text>

      {/* lane 1 */}
      <path d="M170,80 L280,80" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M432,80 L543,80" className={styles.edge} markerEnd="url(#api-arrow)" />
      {/* lane 2 */}
      <path d="M170,200 L193,200" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M345,200 L368,200" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M520,200 L543,200" className={styles.edge} markerEnd="url(#api-arrow)" />

      {/* into build */}
      <path d="M695,80 C720,80 712,175 733,175" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M695,200 L733,200" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M695,320 C720,320 712,225 733,225" className={styles.edge} markerEnd="url(#api-arrow)" />

      {/* out of build */}
      <path d="M855,200 C870,200 868,149 883,149" className={styles.edge} markerEnd="url(#api-arrow)" />
      <path d="M855,200 C870,200 868,251 883,251" className={styles.edge} markerEnd="url(#api-arrow)" />

      <Box x={20} y={51} w={w} h={h} kind="source" lines={[{ t: 'C# projects' }, { t: '.csproj in product repos', c: 'sub' }]} />
      <Box x={282} y={51} w={w} h={h} kind="platform" lines={[{ t: 'docfx metadata' }, { t: 'code + XML comments', c: 'sub' }]} />
      <Box x={545} y={51} w={w} h={h} lines={[{ t: 'YAML models' }, { t: 'obj/api', c: 'mono' }]} />

      <Box x={20} y={171} w={w} h={h} kind="source" lines={[{ t: 'Swagger JSON' }, { t: '13 service specs', c: 'sub' }]} />
      <Box x={195} y={171} w={w} h={h} kind="platform" lines={[{ t: 'Tag script' }, { t: 'jq builds tags object', c: 'sub' }]} />
      <Box x={370} y={171} w={w} h={h} kind="platform" lines={[{ t: 'Landing-page script' }, { t: 'Python writes specs/', c: 'sub' }]} />
      <Box x={545} y={171} w={w} h={h} kind="platform" lines={[{ t: 'Split plugins' }, { t: 'page per tag + operation', c: 'sub' }]} />

      <Box x={20} y={291} w={675} h={h} kind="source" lines={[{ t: 'Conceptual Markdown' }, { t: 'overviews, get-started guides, tutorials', c: 'sub' }]} />

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'docfx build', c: 'hubTitle' }, { t: 'one toc.yml', c: 'hubSub' }, { t: 'per guide', c: 'hubSub' }]}
      />

      <Box x={885} y={120} w={105} h={h} kind="deploy" lines={[{ t: 'Web pages' }, { t: 'API portal', c: 'sub' }]} />
      <Box x={885} y={222} w={105} h={h} kind="deploy" lines={[{ t: 'PDF guides' }, { t: 'same source', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 4. Theme layering ---------- */

export function TemplateLayers() {
  const layers = [
    { kind: 'gate', t: 'Local theme folder', s: 'only in the theme test site, to preview changes before release' },
    { kind: 'platform', t: 'REST split plugins', s: 'API sites only: tag and operation pages' },
    { kind: 'platform', t: 'Company theme (npm package)', s: 'layout, header, navigation, feedback, version switcher' },
    { kind: 'node', t: 'DocFX default template', s: 'base layouts, partials, token.json' },
  ];

  return (
    <Figure
      titleId="dac-layers"
      title="How theme layers stack in docfx.json"
      desc="Four template layers, listed in docfx.json from first to last: the DocFX default template, the company theme npm package, REST split plugins for API sites, and a local theme folder used only in the theme test site. Later layers override files in earlier layers."
      viewBox="0 0 820 290"
      caption="DocFX applies templates in order and lets later layers replace files from earlier ones. I used that to share one theme everywhere and still test changes safely.">
      <defs>
        <ArrowMarker id="layer-arrow" />
      </defs>

      <text x={120} y={24} className={styles.heading}>Template order in docfx.json</text>

      {layers.map((l, i) => (
        <g key={l.t}>
          <text x={100} y={40 + i * 60 + 28} textAnchor="end" className={styles.stepNum}>{4 - i}</text>
          <Box x={120} y={40 + i * 60} w={560} h={48} kind={l.kind} lines={[{ t: l.t }, { t: l.s, c: 'sub' }]} />
        </g>
      ))}

      <path d="M710,268 L710,42" className={styles.edge} markerEnd="url(#layer-arrow)" />
      <text x={722} y={150} className={styles.label}>later layers</text>
      <text x={722} y={165} className={styles.label}>override</text>
      <text x={722} y={180} className={styles.label}>earlier ones</text>
    </Figure>
  );
}

/* ---------- 5. Build and deploy pipeline ---------- */

export function PublishPipeline() {
  const steps = [
    { kind: 'platform', lines: [{ t: 'Install' }, { t: 'Node + npm,', c: 'sub' }, { t: 'theme package', c: 'sub' }] },
    { kind: 'gate', lines: [{ t: 'Fix style paths' }, { t: 'nested sites', c: 'sub' }, { t: 'only', c: 'sub' }] },
    { kind: 'hub', lines: [{ t: 'Gulp + DocFX', c: 'hubTitle' }, { t: 'metadata, build,', c: 'hubSub' }, { t: 'Sass, assets', c: 'hubSub' }] },
    { kind: 'platform', lines: [{ t: 'Stage artifact' }, { t: '_site folder', c: 'mono' }, { t: 'saved to the run', c: 'sub' }] },
  ];
  const xs = [220, 370, 520, 670];
  const w = 130;
  const y = 120;
  const h = 74;
  const cy = y + h / 2;
  const dests = [
    { y: 40, t: 'Markdown archive', s: 'always' },
    { y: 128, t: 'Production', s: 'on merge, or if PROD' },
    { y: 216, t: 'Development', s: 'if DEV is checked' },
  ];

  return (
    <Figure
      titleId="dac-pipeline"
      title="The build and deploy pipeline each site runs"
      desc="A merge to main runs the pipeline automatically; a manual run lets the user choose any branch and check PROD, DEV, both, or neither. The pipeline installs Node and npm packages including the theme, optionally fixes style paths for nested sites, runs Gulp and DocFX, and stages the built site as an artifact. It always copies the Markdown to an archive, copies the site to production storage on merge or when PROD is checked, and to development storage when DEV is checked."
      viewBox="0 0 1000 300"
      caption="One pipeline file serves every site. The site's URL path and optional steps are switched on in a small variables file.">
      <defs>
        <ArrowMarker id="pipe-arrow" />
      </defs>

      <text x={100} y={28} textAnchor="middle" className={styles.heading}>Trigger</text>
      <text x={510} y={28} textAnchor="middle" className={styles.heading}>Build agent</text>
      <text x={920} y={28} textAnchor="middle" className={styles.heading}>Blob storage</text>

      <path d={`M180,92 C200,92 198,${cy - 8} 218,${cy - 8}`} className={styles.edge} markerEnd="url(#pipe-arrow)" />
      <path d={`M180,222 C200,222 198,${cy + 8} 218,${cy + 8}`} className={styles.edge} markerEnd="url(#pipe-arrow)" />

      {xs.slice(0, -1).map((x) => (
        <path key={x} d={`M${x + w},${cy} L${x + w + 18},${cy}`} className={styles.edge} markerEnd="url(#pipe-arrow)" />
      ))}

      {dests.map((d) => (
        <path
          key={d.t}
          d={`M${xs[3] + w},${cy} C830,${cy} 825,${d.y + 29} 848,${d.y + 29}`}
          className={styles.edge}
          markerEnd="url(#pipe-arrow)"
        />
      ))}

      <Box x={20} y={60} w={160} h={64} kind="source" lines={[{ t: 'Merge to main' }, { t: 'runs automatically', c: 'sub' }]} />
      <Box x={20} y={190} w={160} h={64} kind="source" lines={[{ t: 'Manual run' }, { t: 'any branch, any target', c: 'sub' }]} />

      {steps.map((s, i) => (
        <Box key={i} x={xs[i]} y={y} w={w} h={h} kind={s.kind} lines={s.lines} />
      ))}

      {dests.map((d) => (
        <Box key={d.t} x={850} y={d.y} w={140} h={58} kind="deploy" lines={[{ t: d.t }, { t: d.s, c: 'sub' }]} />
      ))}
    </Figure>
  );
}

/* =====================================================================
   Diagrams for /experience/docs-as-code-contributions
   ===================================================================== */

/* ---------- 6. Contributor path with support at each step ---------- */

export function ContributorPath() {
  const steps = [
    { t: 'Find', s: 'which repo?', a: 'Repo map by', b: 'product + version' },
    { t: 'Clone', s: 'local copy', a: 'One script syncs', b: 'starter files' },
    { t: 'Change', s: 'edit on a branch', a: 'Templates +', b: 'Markdown shortcuts' },
    { t: 'Check', s: 'lint as you type', a: 'markdownlint +', b: 'Vale in the editor' },
    { t: 'Build', s: 'preview locally', a: 'Build output flags', b: 'broken links' },
    { t: 'Publish', s: 'dev or production', a: 'PR, validation build,', b: 'preview site' },
  ];

  return (
    <Figure
      titleId="dac-path"
      title="The six-step contributor path and the support at each step"
      desc="Six steps in order: find the right repo, clone it, change content on a branch, check it with linters, build a local preview, and publish. Under each step is the help the guide provides: a repo map by product and version, a script that syncs starter files, templates and Markdown shortcuts, markdownlint and Vale in the editor, build output that flags broken links, and a pull request with a validation build and a preview site."
      viewBox="0 0 960 240"
      caption="Every step has a page in the guide and a safety net, so contributors never have to guess what comes next.">
      <defs>
        <ArrowMarker id="path-arrow" />
      </defs>
      {steps.map((s, i) => {
        const x = 10 + i * 157;
        return (
          <g key={s.t}>
            <text x={x + 70} y={26} textAnchor="middle" className={styles.stepNum}>{`STEP ${i + 1}`}</text>
            {i < steps.length - 1 && (
              <path d={`M${x + 140},72 L${x + 155},72`} className={styles.edge} markerEnd="url(#path-arrow)" />
            )}
            <path d={`M${x + 70},104 L${x + 70},140`} className={styles.edgeDashed} />
            <Box
              x={x}
              y={40}
              w={140}
              h={64}
              kind={i === steps.length - 1 ? 'deploy' : 'platform'}
              lines={[{ t: s.t }, { t: s.s, c: 'sub' }]}
            />
            <Box x={x} y={142} w={140} h={60} kind="source" lines={[{ t: s.a, c: 'sub' }, { t: s.b, c: 'sub' }]} />
          </g>
        );
      })}
      <text x={480} y={228} textAnchor="middle" className={styles.heading}>What the guide gives you at each step</text>
    </Figure>
  );
}

/* ---------- 7. Three audiences, three layers ---------- */

export function AudienceLayers() {
  const rows = [
    {
      a: ['Occasional contributors', 'support, PMs, experts'],
      b: ['Fix a step or a typo', 'in minutes, with no setup'],
      c: ['Edit link + browser editor', 'templates, writing quick reference'],
    },
    {
      a: ['Product team contributors', 'engineers, writers'],
      b: ['Ship docs with each feature', 'in their own repos and sprints'],
      c: ['Six-step path + local builds', 'linters, API doc guides'],
    },
    {
      a: ['Platform admins', 'today and in the future'],
      b: ['Keep the platform running', 'theme, pipelines, hosting'],
      c: ['50+ admin articles', 'how it works and why'],
    },
  ];
  const ys = [45, 125, 205];
  const h = 64;

  return (
    <Figure
      titleId="dac-audiences"
      title="Three audiences and the layer of the guide built for each"
      desc="Occasional contributors such as support, product managers, and subject matter experts fix a step or typo with no setup, using the Edit link, the browser editor, templates, and a writing quick reference. Product team contributors such as engineers and writers ship docs with each feature using the six-step path, local builds, linters, and API doc guides. Platform admins keep the platform running using more than 50 admin articles that explain how it works and why."
      viewBox="0 0 900 285"
      caption="Each audience gets only as much depth as its job needs. Nobody has to read the admin docs to fix a typo.">
      <defs>
        <ArrowMarker id="aud-arrow" />
      </defs>
      <text x={130} y={28} textAnchor="middle" className={styles.heading}>Who contributes</text>
      <text x={440} y={28} textAnchor="middle" className={styles.heading}>What they need to do</text>
      <text x={765} y={28} textAnchor="middle" className={styles.heading}>Where the guide meets them</text>
      {rows.map((r, i) => (
        <g key={i}>
          <path d={`M240,${ys[i] + h / 2} L288,${ys[i] + h / 2}`} className={styles.edge} markerEnd="url(#aud-arrow)" />
          <path d={`M590,${ys[i] + h / 2} L638,${ys[i] + h / 2}`} className={styles.edge} markerEnd="url(#aud-arrow)" />
          <Box x={20} y={ys[i]} w={220} h={h} kind="source" lines={[{ t: r.a[0] }, { t: r.a[1], c: 'sub' }]} />
          <Box x={290} y={ys[i]} w={300} h={h} lines={[{ t: r.b[0] }, { t: r.b[1], c: 'sub' }]} />
          <Box x={640} y={ys[i]} w={250} h={h} kind="platform" lines={[{ t: r.c[0] }, { t: r.c[1], c: 'sub' }]} />
        </g>
      ))}
    </Figure>
  );
}

/* ---------- 8. Two on-ramps, one review path ---------- */

export function TwoOnRamps() {
  const w = 120;
  const h = 60;
  const laneA = [
    { x: 20, l: ['Edit this page', 'link on any page'] },
    { x: 230, l: ['Edit in browser', 'no install'] },
    { x: 440, l: ['Commit', 'to a new branch'] },
  ];
  const laneB = [
    { x: 20, l: ['Clone the repo', 'once'] },
    { x: 160, l: ['Branch + edit', 'in VS Code'] },
    { x: 300, l: ['Lint + preview', 'on your machine'] },
    { x: 440, l: ['Commit + sync', 'push the branch'] },
  ];
  const yA = 60;
  const yB = 190;
  const yM = 125;

  return (
    <Figure
      titleId="dac-onramps"
      title="Two ways to contribute that meet in one review path"
      desc="Quick fix in the browser: click Edit this page on any docs page, edit in the browser with nothing to install, and commit to a new branch. Full workflow in VS Code: clone the repo once, branch and edit in VS Code, lint and preview locally, then commit and push the branch. Both paths lead to a pull request with a validation build, then a merge to main, then automatic publishing."
      viewBox="0 0 1010 270"
      caption="Contributors choose the on-ramp that fits the change. Every change still goes through the same pull request and build checks.">
      <defs>
        <ArrowMarker id="ramp-arrow" />
      </defs>
      <text x={20} y={yA - 14} className={styles.heading}>Quick fix in the browser</text>
      <text x={20} y={yB - 14} className={styles.heading}>Full workflow in VS Code</text>
      <text x={610} y={yM - 14} className={styles.heading}>Same path for everyone</text>

      {laneA.slice(0, -1).map((b, i) => (
        <path key={b.x} d={`M${b.x + w},${yA + h / 2} L${laneA[i + 1].x - 2},${yA + h / 2}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />
      ))}
      {laneB.slice(0, -1).map((b, i) => (
        <path key={b.x} d={`M${b.x + w},${yB + h / 2} L${laneB[i + 1].x - 2},${yB + h / 2}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />
      ))}
      <path d={`M560,${yA + h / 2} C590,${yA + h / 2} 580,${yM + 20} 608,${yM + 20}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />
      <path d={`M560,${yB + h / 2} C590,${yB + h / 2} 580,${yM + 40} 608,${yM + 40}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />
      <path d={`M730,${yM + 30} L753,${yM + 30}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />
      <path d={`M865,${yM + 30} L888,${yM + 30}`} className={styles.edge} markerEnd="url(#ramp-arrow)" />

      {laneA.map((b) => (
        <Box key={b.x} x={b.x} y={yA} w={w} h={h} kind="source" lines={[{ t: b.l[0] }, { t: b.l[1], c: 'sub' }]} />
      ))}
      {laneB.map((b) => (
        <Box key={b.x} x={b.x} y={yB} w={w} h={h} kind="platform" lines={[{ t: b.l[0] }, { t: b.l[1], c: 'sub' }]} />
      ))}
      <Box x={610} y={yM} w={120} h={h} kind="hub" lines={[{ t: 'Pull request', c: 'hubTitle' }, { t: '+ validation build', c: 'hubSub' }]} />
      <Box x={755} y={yM} w={110} h={h} lines={[{ t: 'Merge' }, { t: 'into main', c: 'sub' }]} />
      <Box x={890} y={yM} w={110} h={h} kind="deploy" lines={[{ t: 'Published' }, { t: 'automatically', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 9. Non-blocking editorial review ---------- */

export function ReviewModel() {
  const w = 170;
  const h = 60;
  const top = [
    { x: 20, kind: 'source', l: ['Write docs', 'in the same sprint'] },
    { x: 220, kind: 'source', l: ['Pull request', 'build must pass'] },
    { x: 420, kind: 'source', l: ['Team review', 'accuracy check'] },
    { x: 620, kind: 'deploy', l: ['Merge', 'publishes right away'] },
  ];
  const bottom = [
    { x: 220, kind: 'platform', l: ['Notification', 'PR touched docs'] },
    { x: 420, kind: 'platform', l: ['Task on the', 'docs board'] },
    { x: 620, kind: 'platform', l: ['Follow-up PR', 'editorial polish'] },
  ];
  const yT = 60;
  const yB = 200;

  return (
    <Figure
      titleId="dac-review"
      title="Editorial review that follows behind instead of blocking"
      desc="The product team writes docs in the same sprint as the feature, opens a pull request that must pass the build, reviews it for accuracy, and merges, which publishes right away. When the pull request touches docs, the writer is notified, adds a task to the docs board, and later opens a follow-up pull request with editorial polish, which also publishes."
      viewBox="0 0 810 280"
      caption="Engineers never wait on a writer to ship accurate docs, and every change still gets an editorial pass.">
      <defs>
        <ArrowMarker id="rev-arrow" />
      </defs>
      <text x={20} y={yT - 16} className={styles.heading}>Product team: never waits</text>
      <text x={20} y={yB + 26} className={styles.heading}>Writer:</text>
      <text x={20} y={yB + 42} className={styles.heading}>follows behind</text>

      {top.slice(0, -1).map((b, i) => (
        <path key={b.x} d={`M${b.x + w},${yT + h / 2} L${top[i + 1].x - 2},${yT + h / 2}`} className={styles.edge} markerEnd="url(#rev-arrow)" />
      ))}
      {bottom.slice(0, -1).map((b, i) => (
        <path key={b.x} d={`M${b.x + w},${yB + h / 2} L${bottom[i + 1].x - 2},${yB + h / 2}`} className={styles.edge} markerEnd="url(#rev-arrow)" />
      ))}
      <path d={`M305,${yT + h} L305,${yB - 2}`} className={styles.edgeDashed} markerEnd="url(#rev-arrow)" />
      <path d={`M705,${yB} L705,${yT + h + 2}`} className={styles.edgeDashed} markerEnd="url(#rev-arrow)" />
      <text x={713} y={165} className={styles.label}>edits publish too</text>

      {top.map((b) => (
        <Box key={b.x} x={b.x} y={yT} w={w} h={h} kind={b.kind} lines={[{ t: b.l[0] }, { t: b.l[1], c: 'sub' }]} />
      ))}
      {bottom.map((b) => (
        <Box key={b.x} x={b.x} y={yB} w={w} h={h} kind={b.kind} lines={[{ t: b.l[0] }, { t: b.l[1], c: 'sub' }]} />
      ))}
    </Figure>
  );
}

/* ---------- 10. Release notes from work items ---------- */

export function ReleaseNotesFlow() {
  const steps = [
    { kind: 'source', l: [{ t: 'Engineers fill in' }, { t: 'Publish, Product,', c: 'sub' }, { t: 'Version, Note', c: 'sub' }] },
    { kind: 'platform', l: [{ t: 'Query + script' }, { t: 'sort work items', c: 'sub' }, { t: 'into sections', c: 'sub' }] },
    { kind: 'hub', l: [{ t: 'Pull request', c: 'hubTitle' }, { t: 'Slack alert,', c: 'hubSub' }, { t: '24-hour review', c: 'hubSub' }] },
    { kind: 'platform', l: [{ t: 'Reviewers fix' }, { t: 'the Markdown,', c: 'sub' }, { t: 'check missing notes', c: 'sub' }] },
    { kind: 'deploy', l: [{ t: 'Published' }, { t: 'release notes +', c: 'sub' }, { t: 'known issues', c: 'sub' }] },
  ];
  const w = 150;
  const gap = 38;

  return (
    <Figure
      titleId="dac-notes"
      title="How release notes were generated from engineering work items"
      desc="Engineers fill in four fields on each work item: Publish, Products affected, Versions affected, and the release note text. A query and script sort qualifying work items into sections. The generated Markdown goes into a pull request that posts a Slack alert and has a 24-hour review window. Reviewers fix the Markdown and check a table of work items that didn't qualify for missing notes. The result is published as release notes and known issues."
      viewBox="0 0 950 150"
      caption="Engineers contribute release notes where they already work, in the work item, and never need to open a docs repo.">
      <defs>
        <ArrowMarker id="rn-arrow" />
      </defs>
      {steps.map((s, i) => {
        const x = 20 + i * (w + gap);
        return (
          <g key={i}>
            {i < steps.length - 1 && (
              <path d={`M${x + w},70 L${x + w + gap - 2},70`} className={styles.edge} markerEnd="url(#rn-arrow)" />
            )}
            <Box x={x} y={30} w={w} h={80} kind={s.kind} lines={s.l} />
          </g>
        );
      })}
    </Figure>
  );
}

/* =====================================================================
   Diagrams for /experience/docs-as-code-linting
   ===================================================================== */

/* ---------- 11. One rule set, three checkpoints ---------- */

export function LintCheckpoints() {
  const stages = [
    { x: 20, kind: 'platform', l: [{ t: 'In the editor' }, { t: 'VS Code extensions', c: 'sub' }, { t: 'underline as you type', c: 'sub' }] },
    { x: 270, kind: 'platform', l: [{ t: 'On the command line' }, { t: 'lint a whole folder', c: 'sub' }, { t: 'before you push', c: 'sub' }] },
    { x: 520, kind: 'hub', l: [{ t: 'In the pipeline', c: 'hubTitle' }, { t: 'every pull request,', c: 'hubSub' }, { t: 'errors block the merge', c: 'hubSub' }] },
  ];
  const w = 210;
  const y = 170;
  const h = 80;
  const src = { x: 245, y: 40, w: 260, h: 70 };

  return (
    <Figure
      titleId="dac-lint-checkpoints"
      title="One shared rule set enforced at three checkpoints"
      desc="A central rules repo holds the markdownlint config, the Vale config, 96 house style rules, and a spelling ignore list. The same rules run in three places: in the VS Code editor as the writer types, on the command line against a whole folder before pushing, and in the pull request pipeline, where errors block the merge. Changes that pass are merged and published."
      viewBox="0 0 900 290"
      caption="Writers see the same results in their editor that the pipeline enforces, so nothing in the pipeline comes as a surprise.">
      <defs>
        <ArrowMarker id="lc-arrow" />
      </defs>
      {stages.map((s) => (
        <path
          key={s.x}
          d={`M${src.x + src.w / 2},${src.y + src.h} C${src.x + src.w / 2},140 ${s.x + w / 2},140 ${s.x + w / 2},${y - 2}`}
          className={styles.edgeDashed}
          markerEnd="url(#lc-arrow)"
        />
      ))}
      <path d={`M230,${y + h / 2} L268,${y + h / 2}`} className={styles.edge} markerEnd="url(#lc-arrow)" />
      <path d={`M480,${y + h / 2} L518,${y + h / 2}`} className={styles.edge} markerEnd="url(#lc-arrow)" />
      <path d={`M730,${y + h / 2} L768,${y + h / 2}`} className={styles.edge} markerEnd="url(#lc-arrow)" />

      <Box
        x={src.x}
        y={src.y}
        w={src.w}
        h={src.h}
        kind="source"
        lines={[{ t: 'Shared rules repo' }, { t: '.markdownlint.jsonc, vale.ini,', c: 'sub' }, { t: '96 rules, spelling list', c: 'sub' }]}
      />
      {stages.map((s) => (
        <Box key={s.x} x={s.x} y={y} w={w} h={h} kind={s.kind} lines={s.l} />
      ))}
      <Box x={770} y={y} w={110} h={h} kind="deploy" lines={[{ t: 'Merge' }, { t: '+ publish', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- 12. How Vale reads a page ---------- */

export function ValeFlow() {
  const w = 150;
  const h = 76;
  const y = 50;
  const steps = [
    { kind: 'source', l: [{ t: 'Markdown page' }, { t: 'text, code, links,', c: 'sub' }, { t: 'headings', c: 'sub' }] },
    { kind: 'platform', l: [{ t: 'Parse the markup' }, { t: 'skip code blocks', c: 'sub' }, { t: 'and URLs', c: 'sub' }] },
    { kind: 'platform', l: [{ t: 'Apply by scope' }, { t: 'heading, sentence,', c: 'sub' }, { t: 'paragraph, raw', c: 'sub' }] },
    { kind: 'hub', l: [{ t: 'Alerts', c: 'hubTitle' }, { t: 'suggestion, warning,', c: 'hubSub' }, { t: 'or error', c: 'hubSub' }] },
  ];
  const gap = 40;
  const outs = [
    { y: 20, t: 'Editor underline', s: 'fix while writing' },
    { y: 110, t: 'Pipeline log', s: 'errors fail the build' },
  ];

  return (
    <Figure
      titleId="dac-vale-flow"
      title="How Vale checks a page"
      desc="Vale reads a Markdown page, parses its markup so it can skip code blocks and URLs, applies each rule only to its scope, such as headings, sentences, paragraphs, or raw text, and produces alerts at the suggestion, warning, or error level. Alerts appear as underlines in the editor and as entries in the pipeline log, where errors fail the build."
      viewBox="0 0 960 210"
      caption="Because Vale understands Markdown, a rule about headings checks only headings, and code samples never trigger prose rules.">
      <defs>
        <ArrowMarker id="vf-arrow" />
      </defs>
      {steps.map((s, i) => {
        const x = 20 + i * (w + gap);
        return (
          <g key={i}>
            {i < steps.length - 1 && (
              <path d={`M${x + w},${y + h / 2} L${x + w + gap - 2},${y + h / 2}`} className={styles.edge} markerEnd="url(#vf-arrow)" />
            )}
            <Box x={x} y={y} w={w} h={h} kind={s.kind} lines={s.l} />
          </g>
        );
      })}
      {outs.map((o) => (
        <path
          key={o.t}
          d={`M${20 + 3 * (w + gap) + w},${y + h / 2} C790,${y + h / 2} 780,${o.y + 30} 798,${o.y + 30}`}
          className={styles.edge}
          markerEnd="url(#vf-arrow)"
        />
      ))}
      {outs.map((o) => (
        <Box key={o.t} x={800} y={o.y} w={150} h={60} kind="deploy" lines={[{ t: o.t }, { t: o.s, c: 'sub' }]} />
      ))}
    </Figure>
  );
}

/* ---------- 13. Curating a house style ---------- */

export function StyleCuration() {
  const pubs = [
    { t: 'Microsoft', s: 'word choice, headings' },
    { t: 'GitLab', s: 'tense, branches, admin' },
    { t: 'Other public styles', s: 'wordiness, hedging' },
  ];
  const ys = [40, 115, 190];
  const hub = { x: 330, y: 95, w: 200, h: 100 };
  const hubCy = hub.y + hub.h / 2;

  return (
    <Figure
      titleId="dac-style"
      title="How I curated one house style from public style guides"
      desc="Rules from public Vale styles, including Microsoft, GitLab, and others, were copied into a single house style folder and edited to fit the company's voice and vocabulary. The house style has 96 rules and a spelling list of product and technical terms. Vale loads only the house style, and a copied rule's original stays untouched so public styles can be updated safely."
      viewBox="0 0 900 270"
      caption="Every rule the team followed lived in one folder the team owned, and every change to it went through a pull request.">
      <defs>
        <ArrowMarker id="sc-arrow" />
      </defs>
      <text x={130} y={24} textAnchor="middle" className={styles.heading}>Public Vale styles</text>
      <text x={430} y={24} textAnchor="middle" className={styles.heading}>House style</text>
      <text x={760} y={24} textAnchor="middle" className={styles.heading}>Where it runs</text>

      {pubs.map((p, i) => (
        <path
          key={p.t}
          d={`M240,${ys[i] + 29} C285,${ys[i] + 29} 285,${hubCy} ${hub.x - 2},${hubCy}`}
          className={styles.edge}
          markerEnd="url(#sc-arrow)"
        />
      ))}
      <text x={330} y={225} className={styles.label}>copy, then edit the copy</text>

      <path d={`M${hub.x + hub.w},${hubCy} C610,${hubCy} 610,99 648,99`} className={styles.edge} markerEnd="url(#sc-arrow)" />
      <path d={`M${hub.x + hub.w},${hubCy} C610,${hubCy} 610,191 648,191`} className={styles.edge} markerEnd="url(#sc-arrow)" />

      {pubs.map((p, i) => (
        <Box key={p.t} x={20} y={ys[i]} w={220} h={58} lines={[{ t: p.t }, { t: p.s, c: 'sub' }]} />
      ))}
      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[{ t: 'Linting style', c: 'hubTitle' }, { t: '96 rules', c: 'hubSub' }, { t: '+ spelling list', c: 'hubSub' }]}
      />
      <Box x={650} y={70} w={230} h={58} kind="platform" lines={[{ t: 'vale.ini' }, { t: 'BasedOnStyles = Linting', c: 'mono' }]} />
      <Box x={650} y={162} w={230} h={58} kind="deploy" lines={[{ t: 'Editor, CLI, pipeline' }, { t: 'same results everywhere', c: 'sub' }]} />
    </Figure>
  );
}

/* ---------- Customizations page (/experience/docs-as-code-customizations) ---------- */

function Marker({ x, y, n }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} className={styles.hub} />
      <text x={x} y={y + 4} textAnchor="middle" className={styles.markerNum}>{n}</text>
    </g>
  );
}

/* ---------- 13. Anatomy of a customized page ---------- */

export function PageAnatomy() {
  const navItems = [
    { y: 126, t: 'Get started', c: 'title' },
    { y: 146, t: 'Overview', c: 'sub' },
    { y: 166, t: 'System requirements', c: 'sub' },
    { y: 206, t: 'Install', c: 'title' },
    { y: 226, t: 'Prepare the server', c: 'sub' },
    { y: 246, t: 'Install the agent', c: 'sub' },
    { y: 286, t: 'Schedule jobs', c: 'title' },
    { y: 334, t: 'Jobs (v2)', c: 'sub' },
  ];
  const affixLinks = ['Request a feature', 'Ask the community', "What's new", 'Download PDFs'];

  return (
    <Figure
      titleId="dac-anatomy"
      title="Anatomy of a page on the customized docs site"
      desc="A wireframe of one docs page with eleven numbered customizations: a version switcher, a home icon and breadcrumb, search, styled navigation headings with a Deprecated stamp, a status banner, an applies-to banner, a single-sourced edition notice, an image lightbox and copy button, a feedback form, help and resource links in the right sidebar, and a footer with legal links and edit links."
      viewBox="0 0 960 540"
      caption="Every numbered element is something I added to DocFX's default template or changed in it. The list below explains each one.">
      <rect x={10} y={10} width={940} height={520} rx={10} className={styles.frame} />

      {/* shared header */}
      <rect x={10} y={10} width={940} height={36} rx={10} className={styles.hub} />
      <rect x={10} y={30} width={940} height={16} className={styles.hub} />
      <text x={30} y={33} className={styles.hubSub}>Shared site header</text>

      {/* subnav: version switcher, breadcrumb, search */}
      <rect x={10} y={46} width={940} height={40} className={styles.platform} />
      <rect x={30} y={55} width={96} height={22} rx={4} className={styles.node} />
      <text x={42} y={70} className={styles.mono}>v21.1 ▾</text>
      <text x={160} y={70} className={styles.sub}>›  ⌂  ›  Install guide  ›  Install the agent</text>
      <rect x={770} y={55} width={160} height={22} rx={4} className={styles.node} />
      <text x={782} y={70} className={styles.mono}>install.config</text>
      <Marker x={142} y={66} n={1} />
      <Marker x={440} y={66} n={2} />
      <Marker x={752} y={66} n={3} />

      {/* left navigation */}
      <rect x={30} y={100} width={190} height={345} rx={6} className={styles.node} />
      {navItems.map((i) => (
        <text key={i.t} x={46} y={i.y} className={styles[i.c]}>{i.t}</text>
      ))}
      <rect x={38} y={235} width={3} height={15} className={styles.stamp} />
      <line x1={46} x2={204} y1={184} y2={184} className={styles.divider} />
      <line x1={46} x2={204} y1={264} y2={264} className={styles.divider} />
      <rect x={46} y={298} width={74} height={16} rx={3} className={styles.stamp} />
      <text x={83} y={309.5} textAnchor="middle" className={styles.stampText}>DEPRECATED</text>
      <text x={126} y={310} className={styles.sub}>Jobs (v1)</text>
      <Marker x={222} y={104} n={4} />

      {/* article column */}
      <rect x={240} y={100} width={460} height={28} rx={4} className={styles.source} />
      <text x={254} y={118} className={styles.title}>⚠  Coming soon: this feature isn't released yet.</text>
      <Marker x={709} y={114} n={5} />

      <rect x={240} y={136} width={460} height={28} rx={4} className={styles.platform} />
      <text x={254} y={154} className={styles.title}>Applies to:   ✔ Cloud edition    ✔ Classic edition</text>
      <Marker x={709} y={150} n={6} />

      <text x={240} y={193} className={styles.pageTitle}>Install the Product Name agent</text>
      <rect x={240} y={204} width={440} height={7} rx={3} className={styles.bar} />
      <rect x={240} y={218} width={400} height={7} rx={3} className={styles.bar} />
      <rect x={240} y={232} width={420} height={7} rx={3} className={styles.bar} />

      <rect x={240} y={248} width={460} height={26} rx={4} className={styles.deploy} />
      <text x={254} y={265} className={styles.title}>☁  This section applies to the cloud edition.</text>
      <Marker x={709} y={261} n={7} />

      <rect x={240} y={286} width={210} height={72} rx={4} className={styles.node} />
      <text x={345} y={318} textAnchor="middle" className={styles.sub}>screenshot</text>
      <text x={345} y={340} textAnchor="middle" className={styles.mono}>⤢ click to enlarge</text>
      <rect x={466} y={286} width={234} height={72} rx={4} className={styles.frame} />
      <text x={478} y={326} className={styles.mono}>PS&gt; .\install.ps1</text>
      <rect x={644} y={292} width={48} height={18} rx={3} className={styles.node} />
      <text x={668} y={305} textAnchor="middle" className={styles.sub}>Copy</text>
      <Marker x={709} y={322} n={8} />

      <rect x={240} y={370} width={440} height={7} rx={3} className={styles.bar} />
      <rect x={240} y={384} width={380} height={7} rx={3} className={styles.bar} />

      <rect x={240} y={400} width={460} height={45} rx={6} className={styles.node} />
      <text x={256} y={427} className={styles.title}>Was this article helpful?</text>
      <rect x={520} y={411} width={70} height={24} rx={4} className={styles.deploy} />
      <text x={555} y={427} textAnchor="middle" className={styles.sub}>✔ YES</text>
      <rect x={600} y={411} width={70} height={24} rx={4} className={styles.source} />
      <text x={635} y={427} textAnchor="middle" className={styles.sub}>✖ NO</text>
      <Marker x={709} y={422} n={9} />

      {/* right sidebar */}
      <rect x={726} y={100} width={204} height={150} rx={6} className={styles.node} />
      <text x={742} y={124} className={styles.heading}>Help and resources</text>
      {affixLinks.map((t, i) => (
        <text key={t} x={742} y={150 + i * 24} className={styles.sub}>› {t}</text>
      ))}
      <Marker x={918} y={112} n={10} />

      <rect x={726} y={262} width={204} height={110} rx={6} className={styles.node} />
      <text x={742} y={286} className={styles.heading}>In this article</text>
      <rect x={742} y={302} width={150} height={7} rx={3} className={styles.bar} />
      <rect x={742} y={322} width={120} height={7} rx={3} className={styles.bar} />
      <rect x={742} y={342} width={136} height={7} rx={3} className={styles.bar} />

      {/* footer */}
      <line x1={10} x2={950} y1={458} y2={458} className={styles.divider} />
      <text x={46} y={490} className={styles.sub}>© Company   ·   Terms   ·   Legal notice   ·   Other edition's docs</text>
      <text x={930} y={490} textAnchor="end" className={styles.sub}>✎ Edit this page   |   Contributor reference   |   Back to top</text>
      <Marker x={28} y={486} n={11} />
    </Figure>
  );
}

/* ---------- 14. Single sourcing: write once, reach everywhere ---------- */

export function SingleSourceFlow() {
  const sources = [
    { t: 'Markdown partials', s: 'shared steps in includes/ and partials/' },
    { t: 'terms.json', s: 'product and feature names' },
    { t: 'messages.json', s: 'styled edition notices' },
    { t: 'Front matter', s: 'statusMessage, appliesTo' },
    { t: 'docfx.json metadata', s: 'footer, support links, switches' },
  ];
  const outputs = [
    { t: 'Web pages', s: 'terms, notices, banners, links' },
    { t: 'PDF guides', s: 'shared steps, covers, dates' },
    { t: 'Search index', s: 'fragments left out' },
  ];
  const hub = { x: 370, y: 135, w: 220, h: 120 };
  const hubCy = hub.y + hub.h / 2;

  return (
    <Figure
      titleId="dac-single-source"
      title="Single sourcing: write once, reach every page"
      desc="Five sources of reusable content, Markdown partials, a terms dictionary, a messages dictionary, front matter flags, and docfx.json metadata, flow into the DocFX build and the theme, which resolve includes at build time, swap placeholders in the page, and render banners only when set. The results reach web pages, PDF guides, and the search index, which leaves out the reusable fragments."
      viewBox="0 0 960 380"
      caption="An edit in the left column reaches every page that uses it. A product rename, a new edition, or a new support URL became a one-line change.">
      <defs>
        <ArrowMarker id="ss-arrow" />
      </defs>

      <text x={130} y={28} textAnchor="middle" className={styles.heading}>Write once</text>
      <text x={480} y={28} textAnchor="middle" className={styles.heading}>Applied by the build and theme</text>
      <text x={830} y={28} textAnchor="middle" className={styles.heading}>Reaches</text>

      {sources.map((s, i) => {
        const y = 45 + i * 65;
        return (
          <path
            key={`e-${s.t}`}
            d={`M240,${y + 25} C305,${y + 25} 305,${hubCy} ${hub.x - 2},${hubCy}`}
            className={styles.edge}
            markerEnd="url(#ss-arrow)"
          />
        );
      })}
      {outputs.map((o, i) => {
        const y = 75 + i * 90;
        return (
          <path
            key={`o-${o.t}`}
            d={`M${hub.x + hub.w},${hubCy} C655,${hubCy} 655,${y + 32} 718,${y + 32}`}
            className={styles.edge}
            markerEnd="url(#ss-arrow)"
          />
        );
      })}

      {sources.map((s, i) => (
        <Box key={s.t} x={20} y={45 + i * 65} w={220} h={50} kind="source" lines={[{ t: s.t }, { t: s.s, c: 'sub' }]} />
      ))}

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        rx={10}
        lines={[
          { t: 'DocFX build + theme', c: 'hubTitle' },
          { t: 'includes resolved at build', c: 'hubSub' },
          { t: 'placeholders swapped on the page', c: 'hubSub' },
          { t: 'banners render only when set', c: 'hubSub' },
        ]}
      />

      {outputs.map((o, i) => (
        <Box key={o.t} x={720} y={75 + i * 90} w={220} h={64} kind="deploy" lines={[{ t: o.t }, { t: o.s, c: 'sub' }]} />
      ))}
    </Figure>
  );
}

/* ---------- 15. Metadata cascade: switches instead of forks ---------- */

export function MetadataCascade() {
  const tiers = [
    { kind: 'platform', t: 'globalMetadata', s: 'every page on the site', m: '_enableFeedback: true' },
    { kind: 'platform', t: 'fileMetadata', s: 'pages that match a path', m: '**/partials/**: false' },
    { kind: 'source', t: 'Front matter', s: 'one page', m: '_enableFeedback: false' },
  ];

  return (
    <Figure
      titleId="dac-metadata"
      title="How one setting flows from the site to a single page"
      desc="Three levels of settings, from broad to narrow: globalMetadata in docfx.json applies to every page, fileMetadata applies to pages that match a path pattern, and front matter applies to one page. The most specific setting wins. A theme partial then checks the setting and renders or skips its element."
      viewBox="0 0 960 230"
      caption="Every feature I added is a switch, not a fork. Sites turn features on or off in docfx.json, and the most specific setting wins.">
      <defs>
        <ArrowMarker id="md-arrow" />
      </defs>

      <text x={20} y={28} className={styles.heading}>Broad</text>
      <text x={720} y={28} textAnchor="end" className={styles.heading}>Narrow: the most specific setting wins</text>
      <path d="M72,24 L436,24" className={styles.edgeDashed} markerEnd="url(#md-arrow)" />

      {tiers.map((t, i) => {
        const x = 20 + i * 240;
        return (
          <g key={t.t}>
            <Box x={x} y={50} w={200} h={100} kind={t.kind} lines={[{ t: t.t }, { t: t.s, c: 'sub' }, { t: t.m, c: 'mono' }]} />
            <path d={`M${x + 200},100 L${x + 238},100`} className={styles.edge} markerEnd="url(#md-arrow)" />
          </g>
        );
      })}

      <Box
        x={740}
        y={50}
        w={200}
        h={100}
        kind="hub"
        rx={10}
        lines={[
          { t: 'Theme partial', c: 'hubTitle' },
          { t: '{{#if _enableFeedback}}', c: 'hubSub' },
          { t: 'renders or skips the form', c: 'hubSub' },
        ]}
      />

      <text x={480} y={190} textAnchor="middle" className={styles.sub}>
        Result: the feedback form shows on every article, but never on shared fragments or on a landing page that opts out.
      </text>
    </Figure>
  );
}

/* ---------- 16. Closing the loop with readers ---------- */

export function FeedbackLoop() {
  const top = [
    { t: 'Reader on a page', s: 'helpful? no → reason' },
    { t: 'Form handler', s: 'posts to a script endpoint' },
    { t: 'Response sheet', s: 'URL, answer, reason, text' },
    { t: 'Team alert', s: 'new row → chat channel' },
  ];
  const bottom = [
    { t: 'Page views', s: 'analytics on every page' },
    { t: 'Page inventory', s: 'index.json from every site' },
    { t: 'Zero-view report', s: 'merges and tags pages' },
    { t: 'Dashboard', s: 'by guide and content type' },
  ];
  const xs = [20, 210, 400, 590];

  return (
    <Figure
      titleId="dac-feedback"
      title="How reader feedback and usage data reached the docs team"
      desc="Top lane: a reader answers whether a page was helpful and, if not, picks a reason and adds a suggestion. The form posts to a script endpoint that adds a row to a response sheet, and each new row sends an alert to the team's chat channel. Bottom lane: analytics records page views, a script combines them with the page inventory from every site to find pages with zero views and tags pages by guide and content type, and a dashboard shows the results. Both lanes feed the docs team, who fix, merge, or prune pages through a pull request, and the fix reaches readers on the next publish."
      viewBox="0 0 960 330"
      caption="Two feedback channels DocFX doesn't have: what readers say about a page, and which pages no one reads.">
      <defs>
        <ArrowMarker id="fb-arrow" />
      </defs>

      <text x={20} y={26} className={styles.heading}>Reader feedback</text>
      <text x={20} y={228} className={styles.heading}>Usage analytics</text>

      {/* top lane edges */}
      {xs.slice(0, 3).map((x) => (
        <path key={`t-${x}`} d={`M${x + 160},72 L${x + 188},72`} className={styles.edge} markerEnd="url(#fb-arrow)" />
      ))}
      <path d="M750,72 C860,72 860,72 860,130" className={styles.edge} markerEnd="url(#fb-arrow)" />

      {/* bottom lane edges */}
      <path d="M100,304 L100,318 L480,318 L480,306" className={styles.edge} markerEnd="url(#fb-arrow)" />
      <path d="M370,272 L398,272" className={styles.edge} markerEnd="url(#fb-arrow)" />
      <path d="M560,272 L588,272" className={styles.edge} markerEnd="url(#fb-arrow)" />
      <path d="M750,272 C860,272 860,272 860,214" className={styles.edge} markerEnd="url(#fb-arrow)" />

      {/* loop back to the reader */}
      <path d="M778,172 L100,172 L100,106" className={styles.edgeDashed} markerEnd="url(#fb-arrow)" />
      <text x={440} y={165} textAnchor="middle" className={styles.label}>the fix reaches readers on the next publish</text>

      {top.map((b, i) => (
        <Box key={b.t} x={xs[i]} y={40} w={160} h={64} kind={i === 0 ? 'deploy' : 'node'} lines={[{ t: b.t }, { t: b.s, c: 'sub' }]} />
      ))}
      {bottom.map((b, i) => (
        <Box key={b.t} x={xs[i]} y={240} w={160} h={64} kind="source" lines={[{ t: b.t }, { t: b.s, c: 'sub' }]} />
      ))}

      <Box
        x={780}
        y={132}
        w={160}
        h={80}
        kind="hub"
        rx={10}
        lines={[
          { t: 'Docs team acts', c: 'hubTitle' },
          { t: 'fix, merge, or prune', c: 'hubSub' },
          { t: 'pull request → publish', c: 'hubSub' },
        ]}
      />
    </Figure>
  );
}
