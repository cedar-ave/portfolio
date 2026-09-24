import React, { useMemo, useState } from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Shared pieces
   ===================================================================== */

// Box with vertically centered lines of text.
// lines: [{ t: 'text', c: 'title' | 'sub' | 'hubTitle' | 'hubSub' }]
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
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse">
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

// Vertical bar with only the data end (top) rounded, anchored to the baseline.
function topRoundedBar(x, y, w, h, r = 4) {
  if (h <= 0) return '';
  const rr = Math.min(r, h, w / 2);
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}

function Segmented({ label, options, value, onChange }) {
  return (
    <fieldset className={styles.control}>
      <legend className={styles.controlLabel}>{label}</legend>
      <div className={styles.segmented}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={styles.segBtn}
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function CheckGroup({ label, options, selected, onToggle }) {
  return (
    <fieldset className={styles.control}>
      <legend className={styles.controlLabel}>{label}</legend>
      <div className={styles.checkList}>
        {options.map((o) => (
          <label key={o} className={styles.check}>
            <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function DashFrame({ badge, question, metric, children, foot }) {
  return (
    <section className={styles.dash} aria-label={`Dashboard mockup: ${question}`}>
      <div className={styles.dashBadge}>
        <span>Dashboard mockup</span>
        <span>{badge}</span>
      </div>
      <div className={styles.dashHead}>
        <p className={styles.dashQuestion}>{question}</p>
        {metric && <p className={styles.dashMetric}>{metric}</p>}
      </div>
      {children}
      {foot && <div className={styles.dashFoot}>{foot}</div>}
    </section>
  );
}

const pct = (n, d, digits = 0) => (d ? `${((n / d) * 100).toFixed(digits)}%` : '—');
const fmt = (n) => n.toLocaleString('en-US');

/* =====================================================================
   1. Source map: six sources -> one joined model -> three dashboards
   ===================================================================== */

export function SourceMap() {
  const sources = [
    { t: 'Zendesk Guide analytics', s: 'votes, search, linked articles', k: 'zendesk' },
    { t: 'Zendesk Help Center API', s: 'articles, sections, user IDs', k: 'zendesk' },
    { t: 'Google Analytics 4', s: 'paths, orgs, Tag Manager events', k: 'ga' },
    { t: 'Zendesk Support analytics', s: 'ticket tags, created dates', k: 'zendesk' },
    { t: 'Zendesk Ticketing API', s: 'incremental ticket exports', k: 'zendesk' },
    { t: 'Salesforce', s: 'onboarding phase, customer type', k: 'sf' },
  ];
  const cys = [60, 120, 180, 240, 300, 360];
  const hub = { x: 330, y: 150, w: 210, h: 120 };
  const dashes = [
    { t: 'Site awareness', s: 'Who knows the site exists?', cy: 115 },
    { t: 'Ticket deflection', s: 'Which articles precede tickets?', cy: 210 },
    { t: 'Article performance', s: 'What to promote, fix, or retire', cy: 305 },
  ];
  const legend = [
    { k: 'zendesk', t: 'Zendesk' },
    { k: 'ga', t: 'Google Analytics 4' },
    { k: 'sf', t: 'Salesforce' },
  ];

  return (
    <Figure
      titleId="an-sources"
      title="Six data sources joined into one model that feeds three dashboards"
      desc="Six sources (Zendesk Guide analytics, the Zendesk Help Center API, Google Analytics 4, Zendesk Support analytics, the Zendesk Ticketing API, and Salesforce) feed a joined data model keyed on Zendesk user ID, article ID, and organization. The joined model feeds three dashboards: site awareness, ticket deflection, and article performance."
      viewBox="0 0 830 430"
      caption="No single source could answer the business questions. Joined on three keys, they could.">
      <defs>
        <ArrowMarker id="an-src-arrow" />
      </defs>

      <text x="130" y="18" textAnchor="middle" className={styles.heading}>Sources</text>
      <text x="435" y="18" textAnchor="middle" className={styles.heading}>Joined model</text>
      <text x="715" y="18" textAnchor="middle" className={styles.heading}>Dashboards</text>

      {cys.map((cy, i) => {
        const endY = hub.y + 22 + i * 15;
        return (
          <path
            key={`e${i}`}
            d={`M250 ${cy} C290 ${cy} 290 ${endY} ${hub.x - 2} ${endY}`}
            className={styles.edge}
            markerEnd="url(#an-src-arrow)"
          />
        );
      })}

      {dashes.map((d, i) => {
        const startY = hub.y + 35 + i * 25;
        return (
          <path
            key={`d${i}`}
            d={`M${hub.x + hub.w} ${startY} C${hub.x + hub.w + 40} ${startY} ${hub.x + hub.w + 30} ${d.cy} ${618} ${d.cy}`}
            className={styles.edge}
            markerEnd="url(#an-src-arrow)"
          />
        );
      })}

      {sources.map((s, i) => (
        <Box
          key={s.t}
          x={20}
          y={cys[i] - 25}
          w={230}
          h={50}
          kind={s.k}
          lines={[{ t: s.t }, { t: s.s, c: 'sub' }]}
        />
      ))}

      <Box
        x={hub.x}
        y={hub.y}
        w={hub.w}
        h={hub.h}
        kind="hub"
        lh={19}
        lines={[
          { t: 'Joined data model', c: 'hubTitle' },
          { t: 'Zendesk user ID', c: 'hubSub' },
          { t: 'Article ID', c: 'hubSub' },
          { t: 'Customer organization', c: 'hubSub' },
        ]}
      />

      {dashes.map((d) => (
        <Box
          key={d.t}
          x={620}
          y={d.cy - 32}
          w={195}
          h={64}
          kind="node"
          lines={[{ t: d.t }, { t: d.s, c: 'sub' }]}
        />
      ))}

      {legend.map((l, i) => (
        <g key={l.k} transform={`translate(${20 + i * 150} 405)`}>
          <rect x={0} y={-10} width={14} height={14} rx={3} className={styles[l.k]} />
          <text x={22} y={1} className={styles.sub}>{l.t}</text>
        </g>
      ))}
    </Figure>
  );
}

/* =====================================================================
   2. Join model: how the records connect
   ===================================================================== */

function Table({ x, y, w = 230, kind, title, fields }) {
  const headH = 30;
  const rowH = 24;
  const h = headH + fields.length * rowH;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} className={styles[kind]} />
      <text x={x + 12} y={y + 20} className={styles.title}>{title}</text>
      {fields.map((f, i) => {
        const ry = y + headH + i * rowH;
        return (
          <g key={f.n}>
            {f.key && <rect x={x + 1} y={ry} width={w - 2} height={rowH} className={styles.keyRow} />}
            <line x1={x} x2={x + w} y1={ry} y2={ry} className={styles.rowLine} />
            <text x={x + 12} y={ry + 16} className={f.key ? styles.fieldKey : styles.field}>
              {f.n}
            </text>
            {f.note && (
              <text x={x + w - 10} y={ry + 16} textAnchor="end" className={styles.sub}>
                {f.note}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function JoinModel() {
  // Row centers: top + 30 (header) + i * 24 + 12
  const rowY = (top, i) => top + 30 + i * 24 + 12;
  const top1 = 40;
  const top2 = 225;
  const cGA = 40;
  const cUsers = 320;
  const cSF = 600;
  const w = 230;

  return (
    <Figure
      titleId="an-join"
      title="Join model connecting analytics events, users, articles, tickets, and customer accounts"
      desc="GA4 events join to Zendesk users on user ID and to help center articles on article ID, which is parsed from the page path. Tickets join to Zendesk users on requester ID. Zendesk users join to Salesforce accounts on organization. A custom GA4 event fired by Tag Manager marks the moment a reader leaves an article to submit a request."
      viewBox="0 0 850 370"
      caption="Key fields are highlighted. The user ID is the linchpin: it lets a page view, a person, their organization, and the ticket they opened be read as one story.">
      <Table
        x={cGA}
        y={top1}
        kind="ga"
        title="GA4 events"
        fields={[
          { n: 'user_id', key: true },
          { n: 'article_id', key: true, note: 'from page path' },
          { n: 'event_name' },
          { n: 'event_time' },
        ]}
      />
      <Table
        x={cUsers}
        y={top1}
        kind="zendesk"
        title="Zendesk users"
        fields={[
          { n: 'id', key: true },
          { n: 'organization', key: true },
          { n: 'role', note: 'admins filtered' },
          { n: 'created_at' },
        ]}
      />
      <Table
        x={cSF}
        y={top1}
        kind="sf"
        title="Salesforce accounts"
        fields={[
          { n: 'organization', key: true },
          { n: 'onboarding_phase' },
          { n: 'customer_type' },
          { n: 'active_users', note: 'defined, not raw' },
        ]}
      />
      <Table
        x={cGA}
        y={top2}
        kind="zendesk"
        title="Help center articles"
        fields={[
          { n: 'id', key: true },
          { n: 'category / section' },
          { n: 'created_at' },
          { n: 'updated_at' },
        ]}
      />
      <Table
        x={cUsers}
        y={top2}
        kind="zendesk"
        title="Tickets"
        fields={[
          { n: 'id' },
          { n: 'requester_id', key: true },
          { n: 'tags' },
          { n: 'created_at' },
        ]}
      />

      {/* GA.user_id -> users.id */}
      <path d={`M${cGA + w} ${rowY(top1, 0)} L${cUsers} ${rowY(top1, 0)}`} className={styles.edgeKey} />
      <text x={(cGA + w + cUsers) / 2} y={rowY(top1, 0) - 6} textAnchor="middle" className={styles.edgeLabel}>
        user ID
      </text>

      {/* tickets.requester_id -> users.id (shares the junction) */}
      <path
        d={`M${cUsers} ${rowY(top2, 1)} L${cUsers - 20} ${rowY(top2, 1)} L${cUsers - 20} ${rowY(top1, 0)}`}
        className={styles.edgeKey}
      />
      <circle cx={cUsers - 20} cy={rowY(top1, 0)} r={3.5} className={styles.dot} />
      <text
        transform={`translate(${cUsers - 26} ${(rowY(top1, 0) + rowY(top2, 1)) / 2}) rotate(-90)`}
        textAnchor="middle"
        className={styles.edgeLabel}>
        requester = user ID
      </text>

      {/* users.organization -> SF.organization */}
      <path
        d={`M${cUsers + w} ${rowY(top1, 1)} L${cUsers + w + 25} ${rowY(top1, 1)} L${cUsers + w + 25} ${rowY(top1, 0)} L${cSF} ${rowY(top1, 0)}`}
        className={styles.edgeKey}
      />
      <text x={cUsers + w + 25} y={rowY(top1, 0) - 6} textAnchor="middle" className={styles.edgeLabel}>
        org
      </text>

      {/* GA.article_id -> articles.id */}
      <path
        d={`M${cGA} ${rowY(top1, 1)} L${cGA - 18} ${rowY(top1, 1)} L${cGA - 18} ${rowY(top2, 0)} L${cGA} ${rowY(top2, 0)}`}
        className={styles.edgeKey}
      />
      <text
        transform={`translate(${cGA - 24} ${(rowY(top1, 1) + rowY(top2, 0)) / 2}) rotate(-90)`}
        textAnchor="middle"
        className={styles.edgeLabel}>
        article ID
      </text>

      <Box
        x={cSF}
        y={top2}
        w={w}
        h={126}
        kind="node"
        lh={17}
        lines={[
          { t: 'Custom GA4 event' },
          { t: 'Tag Manager fires when a reader', c: 'sub' },
          { t: 'leaves an article to submit a', c: 'sub' },
          { t: 'request, linking the article', c: 'sub' },
          { t: 'view to the ticket that follows.', c: 'sub' },
        ]}
      />
    </Figure>
  );
}

/* =====================================================================
   3. Dashboard mockup: site awareness
   ===================================================================== */

const AWARENESS = [
  { org: 'Internal team', total: 63, viewed: 53, internal: true },
  { org: 'Customer A', total: 63, viewed: 16 },
  { org: 'Customer B', total: 73, viewed: 42 },
  { org: 'Customer C', total: 100, viewed: 7 },
  { org: 'Customer D', total: 110, viewed: 68 },
  { org: 'Customer E', total: 81, viewed: 41 },
  { org: 'Customer F', total: 47, viewed: 47 },
  { org: 'Customer G', total: 100, viewed: 85 },
  { org: 'Customer H', total: 37, viewed: 13 },
  { org: 'Customer I', total: 106, viewed: 0 },
  { org: 'Customer J', total: 89, viewed: 68 },
];
const RANGE_FACTOR = { '30d': 0.52, '90d': 0.78, '12m': 1 };

export function AwarenessDashboard() {
  const [range, setRange] = useState('12m');
  const [sort, setSort] = useState('name');
  const [hover, setHover] = useState(null);

  const rows = useMemo(() => {
    const f = RANGE_FACTOR[range];
    const r = AWARENESS.map((d) => ({ ...d, viewed: Math.round(d.viewed * f) }));
    if (sort === 'coverage') {
      const [internal, ...rest] = r;
      rest.sort((a, b) => a.viewed / a.total - b.viewed / b.total);
      return [internal, ...rest];
    }
    return r;
  }, [range, sort]);

  const sumViewed = rows.reduce((s, d) => s + d.viewed, 0);
  const sumTotal = rows.reduce((s, d) => s + d.total, 0);

  const W = 640;
  const H = 290;
  const L = 36;
  const R = 632;
  const T = 14;
  const B = 214;
  const yMax = 140;
  const ticks = [0, 35, 70, 105, 140];
  const gw = (R - L) / rows.length;
  const bw = Math.min(19, (gw - 10) / 2);
  const y = (v) => B - (v / yMax) * (B - T);

  const hovered = hover != null ? rows[hover] : null;
  const hoverCx = hover != null ? L + gw * hover + gw / 2 : 0;

  return (
    <DashFrame
      badge="Illustrative data"
      question="Where are the site awareness and education gaps?"
      metric="Users at each organization with at least one article view vs. total users at that organization"
      foot="Internal team is pinned first as the benchmark: it shows what healthy awareness looks like for people who know the site exists.">
      <div className={styles.dashBody}>
        <div className={styles.chartWrap}>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchA}`} />
              Users with ≥1 article view
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchB}`} />
              Total users
            </span>
          </div>
          <div className={styles.chartScroll}>
          <div className={styles.chartInner}>
          <svg
            className={styles.chartSvg}
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Grouped bar chart of users with an article view and total users for each organization"
            onMouseLeave={() => setHover(null)}>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={L} x2={R} y1={y(t)} y2={y(t)} className={t === 0 ? styles.baseline : styles.gridLine} />
                <text x={L - 6} y={y(t) + 4} textAnchor="end" className={styles.tick}>{t}</text>
              </g>
            ))}

            {rows.map((d, i) => {
              const gx = L + gw * i;
              const x0 = gx + (gw - (bw * 2 + 2)) / 2;
              const cx = gx + gw / 2;
              return (
                <g key={d.org}>
                  <rect
                    x={gx}
                    y={T}
                    width={gw}
                    height={B - T}
                    className={hover === i ? styles.hitActive : styles.hit}
                  />
                  <path d={topRoundedBar(x0, y(d.viewed), bw, B - y(d.viewed))} className={styles.barA} />
                  <path d={topRoundedBar(x0 + bw + 2, y(d.total), bw, B - y(d.total))} className={styles.barB} />
                  {d.viewed === 0 && (
                    <g>
                      <text x={x0 + bw / 2} y={B - 5} textAnchor="middle" className={styles.tick}>0</text>
                      <line x1={cx} x2={cx} y1={y(d.total) - 4} y2={y(d.total) - 16} className={styles.annotLine} />
                      <text x={cx} y={y(d.total) - 20} textAnchor="middle" className={styles.annot}>
                        no one has visited
                      </text>
                    </g>
                  )}
                  <text
                    transform={`translate(${cx + 4} ${B + 14}) rotate(-35)`}
                    textAnchor="end"
                    className={styles.catLabel}>
                    {d.org}
                  </text>
                  <rect
                    x={gx}
                    y={T}
                    width={gw}
                    height={H - T}
                    className={styles.hit}
                    tabIndex={0}
                    aria-label={`${d.org}: ${d.viewed} of ${d.total} users viewed an article`}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                  />
                </g>
              );
            })}
          </svg>

          {hovered && (
            <div
              className={styles.tooltip}
              style={{ left: `${(hoverCx / W) * 100}%`, top: `${(y(hovered.total) / H) * 100}%`, transform: 'translate(-50%, 8px)' }}>
              <strong>{hovered.org}</strong>
              <div className={styles.tipRow}>
                <span className={`${styles.swatch} ${styles.swatchA}`} />
                <span>Viewed an article</span>
                <span>{hovered.viewed}</span>
              </div>
              <div className={styles.tipRow}>
                <span className={`${styles.swatch} ${styles.swatchB}`} />
                <span>Total users</span>
                <span>{hovered.total}</span>
              </div>
              <div className={styles.tipRow}>
                <span>Coverage</span>
                <span>{pct(hovered.viewed, hovered.total)}</span>
              </div>
            </div>
          )}
          </div>
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.kpi}>
            <span className={styles.kpiValue}>{pct(sumViewed, sumTotal)}</span>
            <span className={styles.kpiLabel}>
              of users have viewed at least one help article
            </span>
          </div>
          <Segmented
            label="View date"
            value={range}
            onChange={setRange}
            options={[
              { value: '30d', label: '30 days' },
              { value: '90d', label: '90 days' },
              { value: '12m', label: '12 mo' },
            ]}
          />
          <Segmented
            label="Sort organizations"
            value={sort}
            onChange={setSort}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'coverage', label: 'Lowest coverage' },
            ]}
          />
          <div className={styles.control}>
            <span className={styles.controlLabel}>Always applied</span>
            <span className={styles.lockedChip}>Admin and test accounts excluded</span>
          </div>
        </div>
      </div>
    </DashFrame>
  );
}

/* =====================================================================
   4. Dashboard mockup: ticket deflection
   ===================================================================== */

const TAGS = ['Verification', 'Monitoring', 'Facilities', 'Sources', 'Credentialing', 'Packets'];
const CATEGORIES = ['Salesforce app', 'Web app', 'Rosters', 'Facilities', 'Primary sources'];

// tickets: count of tickets opened right after viewing the article, split by ticket tag.
const DEFLECTION = [
  { a: 'Provider data management', c: 'Salesforce app', views: 600, tickets: { Credentialing: 40, Sources: 35, Verification: 25 } },
  { a: 'Credentialing and monitoring objects', c: 'Salesforce app', views: 410, tickets: { Monitoring: 50, Credentialing: 46 } },
  { a: 'Credentialing policies and procedures', c: 'Salesforce app', views: 520, tickets: { Credentialing: 70, Packets: 23 } },
  { a: 'Clean up data and monitor health', c: 'Web app', views: 350, tickets: { Monitoring: 52, Sources: 37 } },
  { a: 'Configure a profile or permission set', c: 'Salesforce app', views: 700, tickets: { Credentialing: 49, Facilities: 40 } },
  { a: 'See details about a medical association record', c: 'Primary sources', views: 300, tickets: { Sources: 61, Verification: 25 } },
  { a: 'Resolve failed sanctions and exclusions verifications', c: 'Web app', views: 290, tickets: { Monitoring: 45, Verification: 36 } },
  { a: 'Enable sanctions and exclusions monitoring', c: 'Web app', views: 380, tickets: { Monitoring: 76 } },
  { a: 'American Registry of Radiologic Technologists', c: 'Primary sources', views: 200, tickets: { Sources: 48, Verification: 25 } },
  { a: 'Nurse practitioner certification board', c: 'Primary sources', views: 190, tickets: { Sources: 40, Verification: 30 } },
  { a: 'Add a file to a credentialing event', c: 'Salesforce app', views: 450, tickets: { Credentialing: 40, Packets: 25 } },
  { a: 'See credentials a sub-facility shares with a parent', c: 'Facilities', views: 160, tickets: { Facilities: 57 } },
  { a: "Change data in the columns of a credential's row", c: 'Rosters', views: 330, tickets: { Credentialing: 30, Packets: 22 } },
  { a: 'Open the credentialing application', c: 'Web app', views: 900, tickets: { Credentialing: 28, Verification: 20 } },
];

export function DeflectionDashboard() {
  const [tags, setTags] = useState([]);
  const [cats, setCats] = useState([]);
  const [mode, setMode] = useState('count');
  const [selected, setSelected] = useState(null);

  const toggle = (list, setList) => (v) =>
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const rows = useMemo(() => {
    const activeTags = tags.length ? tags : TAGS;
    return DEFLECTION.filter((d) => !cats.length || cats.includes(d.c))
      .map((d) => {
        const count = activeTags.reduce((s, t) => s + (d.tickets[t] || 0), 0);
        return { ...d, count, rate: count / d.views };
      })
      .filter((d) => d.count > 0)
      .sort((a, b) => (mode === 'count' ? b.count - a.count : b.rate - a.rate));
  }, [tags, cats, mode]);

  const sumTickets = rows.reduce((s, d) => s + d.count, 0);
  const sumViews = DEFLECTION.filter((d) => !cats.length || cats.includes(d.c)).reduce((s, d) => s + d.views, 0);
  const max = rows.reduce((m, d) => Math.max(m, mode === 'count' ? d.count : d.rate), 0) || 1;

  const sel = DEFLECTION.find((d) => d.a === selected);
  const selTags = sel ? Object.entries(sel.tickets).sort((a, b) => b[1] - a[1]) : [];
  const selMax = selTags.length ? selTags[0][1] : 1;
  const selTotal = selTags.reduce((s, [, v]) => s + v, 0);

  return (
    <DashFrame
      badge="Illustrative data · interactive"
      question="Where are the opportunities to improve content for increased ticket deflection?"
      metric="Article views that were followed by a ticket from the same user"
      foot="Switch to Rate to separate problem articles from merely popular ones. Select an article to see which ticket tags its tickets carry.">
      <div className={styles.dashBody}>
        <div className={styles.chartWrap}>
          <div className={styles.rankHead} aria-hidden="true">
            <span>Article</span>
            <span>{mode === 'count' ? 'Views followed by a ticket' : 'Share of views followed by a ticket'}</span>
            <span>{mode === 'count' ? 'Tickets' : 'Rate'}</span>
          </div>
          {rows.length === 0 ? (
            <p className={styles.empty}>No tickets match these filters.</p>
          ) : (
            <ul className={styles.rankList}>
              {rows.map((d) => {
                const v = mode === 'count' ? d.count : d.rate;
                return (
                  <li key={d.a} className={styles.rankItem}>
                    <button
                      type="button"
                      className={styles.rankBtn}
                      aria-pressed={selected === d.a}
                      title={`${d.a}: ${d.count} tickets after ${fmt(d.views)} views (${pct(d.count, d.views, 1)})`}
                      onClick={() => setSelected(selected === d.a ? null : d.a)}>
                      <span className={styles.rankLabel}>{d.a}</span>
                      <span className={styles.rankTrack}>
                        <span className={styles.rankBar} style={{ display: 'block', width: `${(v / max) * 100}%` }} />
                      </span>
                      <span className={styles.rankValue}>{mode === 'count' ? d.count : pct(d.count, d.views, 1)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className={styles.drill} aria-live="polite">
            {sel ? (
              <>
                <p className={styles.drillTitle}>Drill-through: {sel.a}</p>
                {selTags.map(([t, v]) => (
                  <div key={t} className={styles.drillRow}>
                    <span>{t}</span>
                    <span className={styles.drillBar} style={{ width: `${(v / selMax) * 100}%` }} />
                    <span className={styles.rankValue}>{v}</span>
                  </div>
                ))}
                <p className={styles.drillNote}>
                  {selTotal} tickets after {fmt(sel.views)} views ({pct(selTotal, sel.views, 1)}). In the full design,
                  this opens the list of tickets themselves, which the built-in report can't show.
                </p>
              </>
            ) : (
              <p className={styles.drillNote} style={{ margin: 0 }}>
                Select an article to break its tickets down by tag.
              </p>
            )}
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.kpi}>
            <span className={styles.kpiValue}>{pct(sumTickets, sumViews, 1)}</span>
            <span className={styles.kpiLabel}>of article views were followed by a ticket</span>
          </div>
          <Segmented
            label="Show"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'count', label: 'Count' },
              { value: 'rate', label: 'Rate' },
            ]}
          />
          <CheckGroup label="Ticket tag" options={TAGS} selected={tags} onToggle={toggle(tags, setTags)} />
          <CheckGroup label="Article category" options={CATEGORIES} selected={cats} onToggle={toggle(cats, setCats)} />
        </div>
      </div>
    </DashFrame>
  );
}

/* =====================================================================
   5. Article performance: raw views vs. views per day live
   ===================================================================== */

const ARTICLE_AGE = [
  { a: 'Enable monitoring for a provider', views: 2400, days: 720 },
  { a: 'Provider data management', views: 2100, days: 540 },
  { a: 'Add a file to a credentialing event', views: 1500, days: 600 },
  { a: 'Legacy import guide', views: 1300, days: 1400 },
  { a: 'Resolve failed verifications', views: 1200, days: 300 },
  { a: 'Set up roster auto-sync', views: 90, days: 9, isNew: true },
];

function RankedMultiple({ title, sub, rows, value, format }) {
  const max = Math.max(...rows.map(value));
  return (
    <div>
      <p className={styles.multTitle}>{title}</p>
      <p className={styles.multSub}>{sub}</p>
      {rows.map((d, i) => (
        <div key={d.a} className={`${styles.multRow} ${d.isNew ? styles.multHighlight : ''}`}>
          <span className={styles.multRank}>{i + 1}</span>
          <span className={styles.multLabel}>
            {d.a}
            {d.isNew ? ' (new)' : ''}
          </span>
          <span className={d.isNew ? styles.multBarB : styles.multBarA} style={{ width: `${(value(d) / max) * 100}%` }} />
          <span className={styles.rankValue}>{format(value(d))}</span>
        </div>
      ))}
    </div>
  );
}

export function ArticleAgeComparison() {
  const raw = [...ARTICLE_AGE].sort((a, b) => b.views - a.views);
  const perDay = [...ARTICLE_AGE].sort((a, b) => b.views / b.days - a.views / a.days);
  return (
    <DashFrame
      badge="Illustrative data"
      question="Which articles should we promote, and which should we fix or retire?"
      metric="The same six articles, ranked two ways"
      foot="Raw totals punish new articles and flatter old ones. Normalizing by days live makes a 9-day-old article comparable with a 4-year-old one.">
      <div className={styles.legend} style={{ padding: '0.5rem 1.25rem 0' }}>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchA}`} />
          Established article
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.swatch} ${styles.swatchB}`} />
          Published 9 days ago
        </span>
      </div>
      <div className={styles.multiples}>
        <RankedMultiple
          title="Total views"
          sub="What a default report shows"
          rows={raw}
          value={(d) => d.views}
          format={fmt}
        />
        <RankedMultiple
          title="Views per day live"
          sub="Views ÷ days since published"
          rows={perDay}
          value={(d) => d.views / d.days}
          format={(v) => v.toFixed(1)}
        />
      </div>
    </DashFrame>
  );
}
