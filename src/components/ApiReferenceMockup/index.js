import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/* =====================================================================
   Mockup of a REST API reference site for /portfolio/api-documentation.
   Modeled on a three-panel OpenAPI reference layout (tag sidebar,
   operation details, dark request/response sample column) for a
   fictional "Clearpath Data Service". All names, paths and URLs are
   generic placeholders.

   Every string below is plain JS/JSX text - edit any of it directly to
   relabel the mockup. SIDEBAR_TAGS drives the left-hand menu and
   OPERATIONS drives the endpoint sections that are rendered.
   ===================================================================== */

const BASE_URL = 'https://api.clearpath.example';

const SIDEBAR_TAGS = [
  'Accounts',
  'Attachments',
  'AuditLogs',
  'Collections',
  'Comments',
  'Events',
  'Exports',
  'Imports',
  'Notifications',
  'Ping',
  'Resources',
  'Roles',
  'Settings',
  'Users',
  'Webhooks',
];

// The sidebar tag that starts expanded; its operations come from OPERATIONS.
const ACTIVE_TAG = 'Resources';

const GET_STARTED = [
  { label: 'Overview of Clearpath Services' },
  { label: 'Configure security' },
  { label: 'Use the API' },
  { label: 'Test with user tokens' },
  {
    label: 'Clearpath service health check standard',
    children: ['Shallow health check schema', 'Deep health check schema'],
  },
  { label: 'Tutorials' },
];

const ODATA_PARAMS = {
  expand: { name: '$expand', type: 'string', desc: 'Expands related entities inline.' },
  filter: { name: '$filter', type: 'string', desc: 'Filters the results, based on a Boolean condition.' },
  select: { name: '$select', type: 'string', desc: 'Selects which properties to include in the response.' },
  orderby: { name: '$orderby', type: 'string', desc: 'Sorts the results.' },
  top: { name: '$top', type: 'integer', format: 'int32', desc: 'Returns only the first n results.' },
  skip: { name: '$skip', type: 'integer', format: 'int32', desc: 'Skips the first n results.' },
  count: { name: '$count', type: 'boolean', desc: 'Includes a count of the matching results in the response.' },
};

const ID_PARAM = {
  heading: 'Path parameters',
  items: [{ name: 'id', type: 'integer', format: 'int32', required: true, desc: 'Resource ID.' }],
};

const RESOURCE = {
  Id: 1024,
  Name: 'Example resource',
  Description: 'A sample resource used to illustrate the response format.',
  Status: 'Active',
  Category: 'General',
  CreatedBy: 'user.one',
  CreatedDate: '2026-09-14T16:22:08Z',
  LastModifiedBy: 'user.two',
  LastModifiedDate: '2026-10-01T09:47:51Z',
  Attributes: [{ Id: 1, ResourceId: 1024, Key: 'region', Value: 'west' }],
};

const RESOURCE_FIELDS = [
  { name: 'Id', type: 'integer', format: 'int32', desc: 'Unique identifier of the resource.' },
  { name: 'Name', type: 'string', desc: 'Display name of the resource.' },
  { name: 'Description', type: 'string', desc: 'Optional description of the resource.' },
  { name: 'Status', type: 'string', desc: 'Current state of the resource: Active, Inactive or Archived.' },
  { name: 'CreatedDate', type: 'string', format: 'date-time', desc: 'Date and time the resource was created.' },
  { name: 'Attributes', type: 'Array of objects', desc: 'Key-value pairs attached to the resource.' },
];

const REQUEST_FIELDS = [
  { name: 'Name', type: 'string', required: true, desc: 'Display name of the resource. Must be unique.' },
  { name: 'Description', type: 'string', desc: 'Optional description of the resource.' },
  { name: 'Status', type: 'string', required: true, desc: 'Active, Inactive or Archived.' },
  { name: 'Category', type: 'string', desc: 'Optional grouping used for filtering.' },
  { name: 'Attributes', type: 'Array of objects', desc: 'Key-value pairs to attach to the resource.' },
];

const REQUEST_SAMPLE = {
  Name: 'Example resource',
  Description: 'A sample resource used to illustrate the request format.',
  Status: 'Active',
  Category: 'General',
  Attributes: [{ Key: 'region', Value: 'west' }],
};

const ERROR_BODY = (code, message) => ({
  error: { code, message, target: 'Resources', traceId: '00-0000000000000000-01' },
});

const NOT_FOUND = {
  status: 404,
  text: 'Not Found',
  desc: 'No resource exists with the specified ID.',
  sample: ERROR_BODY('NotFound', 'Resource 9999 was not found.'),
};

const BAD_REQUEST = {
  status: 400,
  text: 'Bad Request',
  desc: 'The request body is missing a required field or contains an invalid value.',
  sample: ERROR_BODY('InvalidRequest', 'The Name field is required.'),
};

const OPERATIONS = [
  {
    id: 'list',
    method: 'get',
    path: '/data/v2/resources',
    title: 'Retrieves all resources',
    summary: 'Returns a paged collection of resources. Supports standard OData query options for filtering, sorting and shaping the results.',
    params: [
      {
        heading: 'Query parameters',
        items: ['expand', 'filter', 'select', 'orderby', 'top', 'skip', 'count'].map(
          (k) => ODATA_PARAMS[k]
        ),
      },
    ],
    responses: [
      {
        status: 200,
        text: 'OK',
        desc: 'A collection of resources.',
        fields: [
          { name: '@odata.context', type: 'string', desc: 'Metadata URL for the response.' },
          { name: 'value', type: 'Array of objects', desc: 'The resources that match the query.' },
        ],
        sample: {
          '@odata.context': `${BASE_URL}/data/v2/$metadata#Resources`,
          value: [RESOURCE],
        },
      },
    ],
  },
  {
    id: 'create',
    method: 'post',
    path: '/data/v2/resources',
    title: 'Creates a resource',
    summary: 'Creates a new resource and any attributes included in the request.',
    requestBody: { contentType: 'application/json', fields: REQUEST_FIELDS, sample: REQUEST_SAMPLE },
    responses: [
      {
        status: 201,
        text: 'Created',
        desc: 'The resource was created. Returns the new resource.',
        fields: RESOURCE_FIELDS,
        sample: RESOURCE,
      },
      BAD_REQUEST,
    ],
  },
  {
    id: 'get',
    method: 'get',
    path: '/data/v2/resources/{id}',
    title: 'Retrieves a specific resource by ID',
    summary: 'Returns a single resource, including its attributes when expanded.',
    params: [ID_PARAM, { heading: 'Query parameters', items: [ODATA_PARAMS.expand, ODATA_PARAMS.select] }],
    responses: [
      { status: 200, text: 'OK', desc: 'The requested resource.', fields: RESOURCE_FIELDS, sample: RESOURCE },
      NOT_FOUND,
    ],
  },
  {
    id: 'update',
    method: 'put',
    path: '/data/v2/resources/{id}',
    title: 'Updates a resource',
    summary: 'Replaces an existing resource with the values in the request. Fields that are left out are reset to their defaults.',
    params: [ID_PARAM],
    requestBody: {
      contentType: 'application/json',
      fields: REQUEST_FIELDS,
      sample: { ...REQUEST_SAMPLE, Status: 'Inactive' },
    },
    responses: [
      {
        status: 200,
        text: 'OK',
        desc: 'The resource was updated. Returns the updated resource.',
        fields: RESOURCE_FIELDS,
        sample: { ...RESOURCE, Status: 'Inactive', LastModifiedDate: '2026-10-07T14:05:33Z' },
      },
      BAD_REQUEST,
      NOT_FOUND,
    ],
  },
  {
    id: 'delete',
    method: 'delete',
    path: '/data/v2/resources/{id}',
    title: 'Deletes a single resource',
    summary: 'Permanently deletes a resource and its attributes. This action cannot be undone.',
    params: [ID_PARAM],
    responses: [
      { status: 204, text: 'No Content', desc: 'The resource was deleted. No response body is returned.' },
      NOT_FOUND,
    ],
  },
];

const METHOD_LABEL = { get: 'GET', post: 'POST', put: 'PUT', delete: 'DEL' };

/* ---------- Small pieces ---------- */

function MethodBadge({ method, size = 'sm' }) {
  return (
    <span className={clsx(styles.method, styles[`method_${method}`], styles[`method_${size}`])}>
      {size === 'sm' ? METHOD_LABEL[method] : method.toUpperCase()}
    </span>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={clsx(styles.chevron, open && styles.chevronOpen)}
      viewBox="0 0 16 16"
      aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypeLabel({ type, format }) {
  return (
    <span className={styles.paramType}>
      {type}
      {format && <span className={styles.paramFormat}> &lt;{format}&gt;</span>}
    </span>
  );
}

function ParamTable({ items }) {
  return (
    <div className={styles.params}>
      {items.map((p, i) => (
        <div key={p.name} className={clsx(styles.paramRow, i === items.length - 1 && styles.paramRowLast)}>
          <div className={styles.paramName}>
            <code>{p.name}</code>
            {p.required && <span className={styles.required}>required</span>}
          </div>
          <div className={styles.paramInfo}>
            <TypeLabel type={p.type} format={p.format} />
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- JSON viewer (collapsible, like a reference site's samples) ---------- */

function JsonValue({ value }) {
  if (value === null) return <span className={styles.jNull}>null</span>;
  if (typeof value === 'string') return <span className={styles.jStr}>"{value}"</span>;
  if (typeof value === 'number') return <span className={styles.jNum}>{value}</span>;
  if (typeof value === 'boolean') return <span className={styles.jBool}>{String(value)}</span>;
  return null;
}

function JsonNode({ name, value, last, depth, signal }) {
  const isArray = Array.isArray(value);
  const isObject = value !== null && typeof value === 'object';
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (signal.v > 0) setOpen(signal.open || depth === 0);
  }, [signal, depth]);

  const key = name !== undefined && <span className={styles.jKey}>"{name}"</span>;
  const colon = name !== undefined && <span className={styles.jPunct}>: </span>;
  const comma = !last && <span className={styles.jPunct}>,</span>;

  if (!isObject) {
    return (
      <div className={styles.jLine}>
        {key}
        {colon}
        <JsonValue value={value} />
        {comma}
      </div>
    );
  }

  const entries = isArray ? value.map((v, i) => [undefined, v, i]) : Object.entries(value).map(([k, v], i) => [k, v, i]);
  const [openCh, closeCh] = isArray ? ['[', ']'] : ['{', '}'];

  return (
    <div className={styles.jLine}>
      <button
        type="button"
        className={styles.jToggle}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Collapse' : 'Expand'}>
        {open ? '−' : '+'}
      </button>
      {key}
      {colon}
      <span className={styles.jPunct}>{openCh}</span>
      {open ? (
        <>
          <div className={styles.jChildren}>
            {entries.map(([k, v, i]) => (
              <JsonNode key={i} name={k} value={v} last={i === entries.length - 1} depth={depth + 1} signal={signal} />
            ))}
          </div>
          <span className={styles.jPunct}>{closeCh}</span>
        </>
      ) : (
        <button type="button" className={styles.jEllipsis} onClick={() => setOpen(true)}>
          {isArray ? `${entries.length} item${entries.length === 1 ? '' : 's'}` : '…'}
          <span className={styles.jPunct}>{closeCh}</span>
        </button>
      )}
      {comma}
    </div>
  );
}

function JsonSample({ data }) {
  const [signal, setSignal] = useState({ v: 0, open: true });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    try {
      navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    } catch (e) {
      // Clipboard can be unavailable (insecure context); the label still confirms the click.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.sampleBox}>
      <div className={styles.sampleToolbar}>
        <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
        <button type="button" onClick={() => setSignal((s) => ({ v: s.v + 1, open: true }))}>Expand all</button>
        <button type="button" onClick={() => setSignal((s) => ({ v: s.v + 1, open: false }))}>Collapse all</button>
      </div>
      <div className={styles.json}>
        <JsonNode value={data} last depth={0} signal={signal} />
      </div>
    </div>
  );
}

/* ---------- Right-hand dark column ---------- */

function EndpointBar({ method, path }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.endpoint}>
      <button type="button" className={styles.endpointHead} onClick={() => setOpen((o) => !o)}>
        <MethodBadge method={method} size="lg" />
        <span className={styles.endpointPath}>{path}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className={styles.endpointServers}>
          <span className={styles.serverLabel}>Production</span>
          <code>
            {BASE_URL}
            <strong>{path}</strong>
          </code>
        </div>
      )}
    </div>
  );
}

function StatusTabs({ responses, active, onChange }) {
  return (
    <div className={styles.tabs} role="tablist">
      {responses.map((r, i) => (
        <button
          key={r.status}
          type="button"
          role="tab"
          aria-selected={i === active}
          className={clsx(styles.tab, r.status >= 400 ? styles.tabError : styles.tabOk, i === active && styles.tabActive)}
          onClick={() => onChange(i)}>
          {r.status}
        </button>
      ))}
    </div>
  );
}

function SamplesColumn({ op }) {
  const [active, setActive] = useState(0);
  const response = op.responses[active];
  return (
    <div className={styles.samples}>
      <EndpointBar method={op.method} path={op.path} />

      {op.requestBody && (
        <>
          <h4 className={styles.samplesHeading}>Request samples</h4>
          <div className={styles.tabs}>
            <span className={clsx(styles.tab, styles.tabNeutral, styles.tabActive)}>Payload</span>
          </div>
          <div className={styles.contentType}>
            <span>Content type</span>
            <strong>{op.requestBody.contentType}</strong>
          </div>
          <JsonSample data={op.requestBody.sample} />
        </>
      )}

      <h4 className={styles.samplesHeading}>Response samples</h4>
      <StatusTabs responses={op.responses} active={active} onChange={setActive} />
      {response.sample ? (
        <>
          <div className={styles.contentType}>
            <span>Content type</span>
            <strong>application/json</strong>
          </div>
          <JsonSample key={response.status} data={response.sample} />
        </>
      ) : (
        <div className={styles.noBody}>No response body</div>
      )}
    </div>
  );
}

/* ---------- Middle column ---------- */

function ResponseRow({ response }) {
  const [open, setOpen] = useState(false);
  const isError = response.status >= 400;
  return (
    <div className={clsx(styles.response, isError ? styles.responseError : styles.responseOk)}>
      <button type="button" className={styles.responseHead} onClick={() => setOpen((o) => !o)}>
        <Chevron open={open} />
        <strong>{response.status}</strong>
        <span>{response.text}</span>
      </button>
      {open && (
        <div className={styles.responseBody}>
          <p>{response.desc}</p>
          {response.fields && (
            <>
              <div className={styles.sectionLabel}>Response schema: application/json</div>
              <ParamTable items={response.fields} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Operation({ op }) {
  return (
    <section className={styles.row} id={`clearpath-op-${op.id}`}>
      <div className={styles.main}>
        <h3 className={styles.opTitle}>{op.title}</h3>
        <p className={styles.opSummary}>{op.summary}</p>

        {op.params?.map((group) => (
          <div key={group.heading}>
            <div className={styles.sectionLabel}>{group.heading}</div>
            <ParamTable items={group.items} />
          </div>
        ))}

        {op.requestBody && (
          <>
            <div className={styles.sectionLabel}>
              Request body schema: <span className={styles.sectionLabelValue}>{op.requestBody.contentType}</span>
            </div>
            <ParamTable items={op.requestBody.fields} />
          </>
        )}

        <h4 className={styles.responsesHeading}>Responses</h4>
        {op.responses.map((r) => (
          <ResponseRow key={r.status} response={r} />
        ))}
      </div>
      <SamplesColumn op={op} />
    </section>
  );
}

/* ---------- Sidebar ---------- */

function Sidebar({ activeOp, onSelect }) {
  const [expanded, setExpanded] = useState(ACTIVE_TAG);
  return (
    <nav className={styles.sidebar} aria-label="API reference">
      <div className={styles.search}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="6.8" cy="6.8" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m10.3 10.3 3.6 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>Search…</span>
      </div>
      <ul className={styles.navList}>
        <li>
          <span className={styles.navItem}>Get started</span>
        </li>
        {SIDEBAR_TAGS.map((tag) => {
          const open = expanded === tag;
          return (
            <li key={tag}>
              <button
                type="button"
                className={clsx(styles.navItem, open && styles.navItemOpen)}
                onClick={() => setExpanded(open ? null : tag)}>
                <span className={styles.navText}>{tag}</span>
                <Chevron open={open} />
              </button>
              {open && tag === ACTIVE_TAG && (
                <ul className={styles.subList}>
                  {OPERATIONS.map((o) => (
                    <li key={o.id}>
                      <button
                        type="button"
                        className={clsx(styles.subItem, o.id === activeOp && styles.subItemActive)}
                        onClick={() => onSelect(o.id)}>
                        <MethodBadge method={o.method} />
                        <span>{o.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {open && tag !== ACTIVE_TAG && (
                <p className={styles.subPlaceholder}>Endpoints hidden in this excerpt.</p>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebarFooter}>API reference generated from OpenAPI</div>
    </nav>
  );
}

/* ---------- Page ---------- */

export function ApiReferenceMockup() {
  const [activeOp, setActiveOp] = useState('list');

  const select = (anchor) => {
    setActiveOp(anchor);
    const el = document.getElementById(`clearpath-op-${anchor}`);
    const scroller = el?.closest(`.${styles.content}`);
    if (el && scroller) {
      scroller.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <figure className={styles.figure}>
      <div className={styles.page}>
        <div className={styles.browser}>
          <span className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" fill="currentColor" />
              <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            docs.clearpath.example/services/data-service/v2
          </span>
        </div>

        <header className={styles.topbar}>
          <span className={styles.logo}>
            <svg viewBox="0 0 28 28" aria-hidden="true">
              <path d="M4 20 C9 20 10 8 15 8 S21 14 24 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="4" cy="20" r="2.6" fill="currentColor" />
              <circle cx="24" cy="6" r="2.6" fill="currentColor" />
            </svg>
            <strong>Clearpath</strong>
            <span className={styles.logoDivider} />
            <span>Documentation</span>
          </span>
          <span className={styles.topnav}>
            <span>
              All REST API Docs <Chevron open />
            </span>
            <span>Overview of Clearpath Services</span>
            <span>Tutorials</span>
          </span>
        </header>

        <div className={styles.body}>
          <Sidebar activeOp={activeOp} onSelect={select} />

          <div className={styles.content}>
            <section className={styles.row}>
              <div className={styles.main}>
                <h2 className={styles.serviceTitle}>
                  Data Service <span className={styles.version}>v5.1.0</span>
                </h2>
                <p className={styles.lead}>
                  The Data Service exposes endpoints for creating, retrieving and managing
                  resources. It integrates with the Identity Service and the Authorization Service.
                </p>

                <h3 className={styles.getStartedHeading}>Get started</h3>
                <div className={styles.getStarted}>
                  <ul>
                    {GET_STARTED.map((item) => (
                      <li key={item.label}>
                        <span className="mockLinkText">{item.label}</span>
                        {item.children && (
                          <ul>
                            {item.children.map((c) => (
                              <li key={c}>
                                <span className="mockLinkText">{c}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={clsx(styles.samples, styles.samplesIntro)}>
                <div className={styles.serverCard}>
                  <span className={styles.serverLabel}>Base URL</span>
                  <code>{BASE_URL}/data/v2</code>
                  <span className={styles.serverLabel}>Authentication</span>
                  <code>Authorization: Bearer &lt;access_token&gt;</code>
                </div>
              </div>
            </section>

            <section className={styles.row}>
              <div className={styles.main}>
                <h2 className={styles.tagTitle}>{ACTIVE_TAG}</h2>
                <p className={styles.opSummary}>
                  Resources are the core records managed by the Data Service. Each resource can
                  have one or more attributes.
                </p>
              </div>
              <div className={styles.samples} />
            </section>

            {OPERATIONS.map((op) => (
              <Operation key={op.id} op={op} />
            ))}
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        Mockup of a REST API reference page. Click the sidebar endpoints, response codes and
        sample tabs to explore.
      </figcaption>
    </figure>
  );
}
