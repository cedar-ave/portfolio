import React, { useState } from 'react';
import styles from './styles.module.css';

/* =====================================================================
   Shared pieces
   ===================================================================== */

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

function ArrowMarker({ id, kind = 'arrow' }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" className={styles[kind]} />
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

/* =====================================================================
   1. From requested solution to root problem
   ===================================================================== */

export function RequestToRootProblem() {
  const options = [
    { t: 'New standalone guide', s: 'Treats the symptom', chosen: false },
    { t: 'Clearer label in the UI', s: 'Sent as product feedback', chosen: true },
    { t: 'Update existing article', s: 'Adds the missing callout', chosen: true },
    { t: 'Brief support team', s: 'Link the fix in replies', chosen: true },
  ];
  const optY = (i) => 62 + i * 72;

  return (
    <Figure
      titleId="in-root"
      title="Triage turns a requested solution into a root problem, then weighs every way content could fix it"
      desc="A request arrives as a solution: we need a new guide for the reporting feature. Triage questions ask what problem the requester is solving, who hits it and how often, what already exists, and how much time a fix would save. The answers reveal the root problem: readers misread one filter label and open tickets about it. Four fixes are weighed. A new standalone guide only treats the symptom. A clearer UI label, an update to the existing article, and a support team briefing address the cause and are chosen."
      viewBox="0 0 900 360"
      minWidth={700}
      caption="Illustrative example. The request named a deliverable. Triage found a comprehension problem that three smaller, faster fixes solved at the source.">
      <defs>
        <ArrowMarker id="in-root-arrow" />
        <ArrowMarker id="in-root-arrow-key" kind="arrowKey" />
      </defs>

      <text x="115" y="22" textAnchor="middle" className={styles.heading}>Requested</text>
      <text x="360" y="22" textAnchor="middle" className={styles.heading}>Triage</text>
      <text x="597" y="22" textAnchor="middle" className={styles.heading}>Root problem</text>
      <text x="800" y="22" textAnchor="middle" className={styles.heading}>Fixes weighed</text>

      {/* Request -> triage -> root */}
      <path d="M210 180 L248 180" className={styles.edge} markerEnd="url(#in-root-arrow)" />
      <path d="M470 180 L508 180" className={styles.edgeKey} markerEnd="url(#in-root-arrow-key)" />

      {/* Root -> options */}
      {options.map((o, i) => {
        const y = optY(i) + 30;
        return (
          <path
          key={o.t}
            d={`M685 180 C705 180 690 ${y} ${708} ${y}`}
            className={o.chosen ? styles.edgeKey : styles.edgeMuted}
            markerEnd={o.chosen ? 'url(#in-root-arrow-key)' : 'url(#in-root-arrow)'}
          />
        );
      })}

      <Box
        x={20}
        y={120}
        w={190}
        h={120}
        kind="request"
        lh={19}
        lines={[
          { t: '“We need a new guide', c: 'quote' },
          { t: 'for the reporting', c: 'quote' },
          { t: 'feature.”', c: 'quote' },
          { t: 'Solution-shaped request', c: 'sub' },
        ]}
      />

      <Box
        x={250}
        y={90}
        w={220}
        h={180}
        kind="hub"
        lh={21}
        lines={[
          { t: 'Triage questions', c: 'hubTitle' },
          { t: 'What problem are you solving?', c: 'hubSub' },
          { t: 'Who hits it, and how often?', c: 'hubSub' },
          { t: 'What already exists?', c: 'hubSub' },
          { t: 'How much time would a fix save?', c: 'hubSub' },
          { t: 'New content or an update?', c: 'hubSub' },
        ]}
      />

      <Box
        x={510}
        y={115}
        w={175}
        h={130}
        kind="root"
        lh={19}
        lines={[
          { t: 'Readers misread one' },
          { t: 'filter label and open' },
          { t: 'tickets about it' },
          { t: 'The guide existed.', c: 'sub' },
          { t: 'The label was the gap.', c: 'sub' },
        ]}
      />

      {options.map((o, i) => (
        <Box
          key={o.t}
          x={710}
          y={optY(i)}
          w={180}
          h={60}
          kind={o.chosen ? 'chosen' : 'rejected'}
          lines={[
            { t: o.t, c: o.chosen ? 'title' : 'titleMuted' },
            { t: o.s, c: 'sub' },
          ]}
        />
      ))}
    </Figure>
  );
}

/* =====================================================================
   2. Intake flow: form -> story -> triage -> labels -> automation -> build -> measure
   ===================================================================== */

export function IntakeFlow() {
  const lanes = [
    { k: 'requester', t: 'Requester', s: 'any team member' },
    { k: 'jira', t: 'Jira', s: 'forms + automation' },
    { k: 'content', t: 'Content team', s: 'triage + delivery' },
  ];
  const laneTop = (i) => 36 + i * 108;
  const laneH = 100;
  const boxW = 112;
  const boxH = 64;
  const colX = (i) => 132 + i * 132;
  const boxY = (lane) => laneTop(lane) + (laneH - boxH) / 2;

  const steps = [
    { lane: 0, t: 'Submit form', s: 'problem first', n: 1 },
    { lane: 1, t: 'Story created', s: 'auto, from form', n: 2 },
    { lane: 2, t: 'Triage review', s: 'find root problem', n: 3 },
    { lane: 2, t: 'Label + rank', s: 'trigger · type', n: 4 },
    { lane: 1, t: 'Automation', s: 'flags urgent work', n: 5 },
    { lane: 2, t: 'Build + publish', s: 'SME review', n: 6 },
    { lane: 1, t: 'Dashboard', s: 'cycle time, aging', n: 7 },
  ];

  const edge = (a, b) => {
    const x1 = colX(a) + boxW;
    const y1 = boxY(steps[a].lane) + boxH / 2;
    const x2 = colX(b) - 2;
    const y2 = boxY(steps[b].lane) + boxH / 2;
    if (y1 === y2) return `M${x1} ${y1} L${x2} ${y2}`;
    return `M${x1} ${y1} C${x1 + 16} ${y1} ${x2 - 16} ${y2} ${x2} ${y2}`;
  };

  const triageCx = colX(2) + 30;
  const reqRight = colX(0) + boxW;
  const reqMid = boxY(0) + boxH / 2 + 14;

  return (
    <Figure
      titleId="in-flow"
      title="How a content request moves from the intake form to a prioritized, measured Jira story"
      desc="Three swim lanes: requester, Jira, and content team. 1. A team member submits the request form, starting with the problem. 2. Jira automatically creates a story in the Content Development project. 3. The content team runs a triage review to find the root problem, asking clarifying questions in story comments when needed. 4. The team applies trigger and content-type labels and sets priority. 5. Jira automation flags priority triggers. 6. The team builds, gets SME review, and publishes. 7. A Jira dashboard measures cycle time, bottlenecks, and aging work."
      viewBox="0 0 1060 360"
      minWidth={820}
      caption="Every request takes the same path, so every request can be compared, prioritized, and measured the same way.">
      <defs>
        <ArrowMarker id="in-flow-arrow" />
        <ArrowMarker id="in-flow-arrow-key" kind="arrowKey" />
      </defs>

      {lanes.map((l, i) => (
        <g key={l.k}>
          <rect
            x={0}
            y={laneTop(i)}
            width={1060}
            height={laneH}
            rx={8}
            className={i % 2 ? styles.laneAlt : styles.lane}
          />
          <text x={14} y={laneTop(i) + laneH / 2 - 3} className={styles.laneTitle}>
            {l.t}
          </text>
          <text x={14} y={laneTop(i) + laneH / 2 + 14} className={styles.sub}>
            {l.s}
          </text>
        </g>
      ))}

      {steps.slice(0, -1).map((_, i) => (
        <path
          key={`e${i}`}
          d={edge(i, i + 1)}
          className={styles.edge}
          markerEnd="url(#in-flow-arrow)"
        />
      ))}

      {/* Clarifying loop: triage back to the requester */}
      <path
        d={`M${triageCx} ${boxY(2)} C${triageCx} ${reqMid + 40} ${reqRight + 60} ${reqMid} ${reqRight + 2} ${reqMid}`}
        className={styles.edgeLoop}
        markerEnd="url(#in-flow-arrow-key)"
      />
      <text x={reqRight + 70} y={reqMid - 12} className={styles.edgeLabel}>
        clarifying questions in story comments
      </text>

      {steps.map((s, i) => (
        <g key={s.t}>
          <Box
            x={colX(i)}
            y={boxY(s.lane)}
            w={boxW}
            h={boxH}
            kind={s.lane === 1 ? 'jiraNode' : s.lane === 0 ? 'request' : 'node'}
            lines={[
              { t: s.t, c: 'titleSm' },
              { t: s.s, c: 'sub' },
            ]}
          />
          <circle cx={colX(i) + 2} cy={boxY(s.lane) + 2} r={10} className={styles.stepDot} />
          <text x={colX(i) + 2} y={boxY(s.lane) + 6} textAnchor="middle" className={styles.stepNum}>
            {s.n}
          </text>
        </g>
      ))}
    </Figure>
  );
}

/* =====================================================================
   3. Request form mockup with a live Jira story preview
   ===================================================================== */

const URGENCY = [
  {
    v: 'critical',
    t: 'Mission critical',
    d: 'Blocking a launch, legal obligation, or customer impact. Must address immediately to prevent measurable harm.',
    p: 'Highest',
  },
  {
    v: 'time',
    t: 'Time sensitive',
    d: 'Tied to a specific date or event with external visibility. Delay would reduce relevance or credibility.',
    p: 'High',
  },
  {
    v: 'date',
    t: 'Nice to have by a certain date',
    d: 'Helps a project or team but not time-bound. Not blocking or externally visible.',
    p: 'Medium',
  },
  {
    v: 'flexible',
    t: 'Flexible',
    d: 'Schedule when capacity allows. No impact if delayed. Optimize timing for impact.',
    p: 'Low',
  },
];

const AUDIENCES = [
  'Customer end users',
  'Customer administrators',
  'Support team',
  'Customer success team',
  'Sales team',
  'All employees',
];

function Chip({ children, tone }) {
  return <span className={`${styles.chip} ${tone ? styles[tone] : ''}`}>{children}</span>;
}

export function RequestFormMockup() {
  const [problem, setProblem] = useState(
    'Customers keep opening tickets asking why their report is missing records after they apply the date filter.'
  );
  const [desc, setDesc] = useState(
    'A new step-by-step guide for the reporting feature, with screenshots of every filter.'
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [urgency, setUrgency] = useState('time');
  const [links, setLinks] = useState('Existing reporting article; support macro for filter questions');
  const [view, setView] = useState('submitted');
  const [created, setCreated] = useState(false);

  const u = URGENCY.find((x) => x.v === urgency);
  const summary = desc.length > 64 ? `${desc.slice(0, 62).trim()}…` : desc || 'New content request';
  const triaged = view === 'triaged';

  return (
    <section className={styles.mock} aria-label="Mockup: request for new content form and the Jira story it creates">
      <div className={styles.mockBadge}>
        <span>Form mockup</span>
        <span>Illustrative content · try editing the fields</span>
      </div>

      <div className={styles.mockBody}>
        {/* ---------- Form ---------- */}
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setCreated(true);
          }}>
          <p className={styles.formProject}>Content Development</p>
          <h3 className={styles.formTitle}>Request for new content</h3>
          <p className={styles.formIntro}>
            Tell us what's getting in the way. We'll work with you on the best way for content to solve it.
          </p>

          <label className={styles.field}>
            <span className={styles.label}>
              What problem are you trying to solve? <em className={styles.req}>Required</em>
            </span>
            <textarea rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} />
            <span className={styles.help}>Describe the situation, not the deliverable. Who is stuck, and on what?</span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>
              Describe the new content you're requesting. <em className={styles.req}>Required</em>
            </span>
            <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>
              Who is the audience for the content? <em className={styles.req}>Required</em>
            </span>
            <select value={audience} onChange={(e) => setAudience(e.target.value)}>
              {AUDIENCES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>

          <fieldset className={styles.field}>
            <legend className={styles.label}>
              How urgent is this request? <em className={styles.req}>Required</em>
            </legend>
            <div className={styles.radios}>
              {URGENCY.map((o) => (
                <label key={o.v} className={`${styles.radio} ${urgency === o.v ? styles.radioOn : ''}`}>
                  <input
                    type="radio"
                    name="urgency"
                    value={o.v}
                    checked={urgency === o.v}
                    onChange={() => setUrgency(o.v)}
                  />
                  <span>
                    <strong>{o.t}</strong>
                    <span className={styles.radioDesc}>{o.d}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span className={styles.label}>
              What content already exists about this topic, even if it's not in great shape?
            </span>
            <input type="text" value={links} onChange={(e) => setLinks(e.target.value)} />
            <span className={styles.help}>
              Google Docs, Confluence pages, PRDs, drafts, communications, recordings, Jira tickets, etc.
            </span>
          </label>

          <div className={styles.field}>
            <span className={styles.label}>Attachments</span>
            <div className={styles.drop}>Drag files here or <u>browse</u></div>
          </div>

          <button type="submit" className={styles.submit}>
            Submit request
          </button>
        </form>

        {/* ---------- Story preview ---------- */}
        <div className={styles.story} aria-live="polite">
          <div className={styles.storyTop}>
            <span className={styles.storyHeading}>Creates a Jira story</span>
            {created && <span className={styles.created}>Story created</span>}
          </div>

          <div className={styles.seg} role="group" aria-label="Story state">
            <button
              type="button"
              aria-pressed={!triaged}
              className={styles.segBtn}
              onClick={() => setView('submitted')}>
              As submitted
            </button>
            <button
              type="button"
              aria-pressed={triaged}
              className={styles.segBtn}
              onClick={() => setView('triaged')}>
              After triage
            </button>
          </div>

          <div className={styles.card}>
            <p className={styles.crumb}>
              <span className={styles.storyIcon} aria-hidden="true" />
              CONTENT DEVELOPMENT / CONT-142
            </p>
            <p className={styles.summary}>{summary}</p>

            <dl className={styles.meta}>
              <dt>Type</dt>
              <dd>Story</dd>
              <dt>Status</dt>
              <dd>
                <Chip tone={triaged ? 'chipBlue' : 'chipGrey'}>{triaged ? 'Prioritized' : 'New'}</Chip>
              </dd>
              <dt>Priority</dt>
              <dd>
                {triaged ? (
                  <>
                    <strong>{u.p}</strong> <span className={styles.muted}>confirmed at triage</span>
                  </>
                ) : (
                  <span className={styles.muted}>Suggested: {u.p} (from urgency)</span>
                )}
              </dd>
              <dt>Urgency</dt>
              <dd>{u.t}</dd>
              <dt>Audience</dt>
              <dd>{audience}</dd>
              <dt>Labels</dt>
              <dd>
                {triaged ? (
                  <span className={styles.chips}>
                    <Chip tone="chipAmber">content-trigger-support-ticket</Chip>
                    <Chip tone="chipAmber">type-help-article</Chip>
                  </span>
                ) : (
                  <span className={styles.muted}>Added at triage</span>
                )}
              </dd>
            </dl>

            <div className={styles.block}>
              <p className={styles.blockLabel}>Problem to solve</p>
              <p>{problem || '—'}</p>
            </div>
            <div className={styles.block}>
              <p className={styles.blockLabel}>Requested content</p>
              <p>{desc || '—'}</p>
            </div>
            <div className={styles.block}>
              <p className={styles.blockLabel}>Existing content</p>
              <p>{links || '—'}</p>
            </div>

            {triaged && (
              <div className={`${styles.block} ${styles.note}`}>
                <p className={styles.blockLabel}>Triage note</p>
                <p>
                  <strong>Root problem:</strong> the date filter label is ambiguous. Readers expect it to filter by
                  created date, but it filters by last-updated date. A reporting guide already exists.
                </p>
                <p>
                  <strong>Plan:</strong> add a callout to the existing article, send a label change to the product
                  team, and share the article link in the support macro. No new guide needed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
