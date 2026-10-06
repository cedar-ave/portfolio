import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/* =====================================================================
   Mockups of the Clearpath Collect app for samples/forms-guide.

   These are built as plain HTML/CSS, not screenshots or traced SVG art,
   so every label stays real, selectable text at a readable size (12px+)
   and the components can be reused and relabeled page to page. Colors
   follow the site's light/dark theme tokens (see styles.module.css).
   ===================================================================== */

function Figure({ children, caption }) {
  return (
    <figure className={clsx(styles.mockup)}>
      {children}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/* ---------- Shared chrome ---------- */

function WindowBar({ address }) {
  return (
    <div className={styles.windowBar}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.addressBar}>{address}</span>
    </div>
  );
}

function MenuBar({ items = [], active, right }) {
  return (
    <div className={styles.menuBar}>
      {items.map((item) => (
        <span key={item} className={item === active ? styles.menuItemActive : styles.menuItem}>
          {item}
        </span>
      ))}
      <span className={styles.menuSpacer} />
      {right}
    </div>
  );
}

function SearchBox({ placeholder = 'Search apps by name, owner, or description' }) {
  return <span className={styles.searchBox}>&#128269; {placeholder}</span>;
}

function ViewToggle({ active = 'tile' }) {
  return (
    <span className={styles.viewToggle}>
      <span className={active === 'tile' ? clsx(styles.viewToggleBtn, styles.viewToggleBtnActive) : styles.viewToggleBtn}>&#9638;</span>
      <span className={active === 'table' ? clsx(styles.viewToggleBtn, styles.viewToggleBtnActive) : styles.viewToggleBtn}>&#9776;</span>
    </span>
  );
}

/* =====================================================================
   Get started — interface tour
   ===================================================================== */

const SAMPLE_APPS = [
  { name: 'Property Claims', owner: 'Dana Ruiz', desc: 'Captures claim notes and inspection details not held in the core claims system.' },
  { name: 'Catastrophe Intake', owner: 'Priya Nair', desc: 'Short-form intake for storm and CAT-event claims during surge periods.' },
  { name: 'Vendor Compliance', owner: 'Mateo Flores', desc: 'Tracks license and insurance documentation for repair vendors.' },
];

function AppTile({ app }) {
  return (
    <div className={styles.tile}>
      <p className={styles.tileName}>{app.name}</p>
      <p className={styles.tileOwner}>Owner: {app.owner}</p>
      <p className={styles.tileDesc}>{app.desc}</p>
      <div className={styles.tileActions}>
        <span className={styles.tileActionBtn}>Records</span>
        <span className={styles.tileActionBtn}>Entry</span>
        <span className={styles.tileActionBtn}>Config</span>
        <span className={styles.tileActionBtn}>Export</span>
      </div>
    </div>
  );
}

export function HomeScreenTiles() {
  return (
    <Figure caption="The Clearpath Collect home page, showing applications as tiles.">
      <div className={styles.window}>
        <WindowBar address="https://yourcompany.clearpath.io/collect" />
        <MenuBar
          items={['Apps', 'Lookup Lists', 'Security']}
          active="Apps"
          right={
            <>
              <SearchBox />
              <ViewToggle active="tile" />
            </>
          }
        />
        <div className={styles.screen}>
          <div className={styles.tileGrid}>
            {SAMPLE_APPS.map((app) => (
              <AppTile key={app.name} app={app} />
            ))}
          </div>
        </div>
      </div>
    </Figure>
  );
}

export function HomeScreenTable() {
  return (
    <Figure caption="The same applications in table view.">
      <div className={styles.window}>
        <WindowBar address="https://yourcompany.clearpath.io/collect" />
        <MenuBar
          items={['Apps', 'Lookup Lists', 'Security']}
          active="Apps"
          right={
            <>
              <SearchBox />
              <ViewToggle active="table" />
            </>
          }
        />
        <div className={styles.screen}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Application</th>
                <th>Owner</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_APPS.map((app) => (
                <tr key={app.name}>
                  <td className={styles.tableAppName}>{app.name}</td>
                  <td>{app.owner}</td>
                  <td>{app.desc}</td>
                  <td>
                    <div className={styles.tileActions}>
                      <span className={styles.tileActionBtn}>Records</span>
                      <span className={styles.tileActionBtn}>Entry</span>
                      <span className={styles.tileActionBtn}>Config</span>
                      <span className={styles.tileActionBtn}>Export</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Figure>
  );
}

const TILE_CALLOUTS = [
  { label: 'Application name', body: "The app's name, e.g. Property Claims." },
  { label: 'Owner', body: "Who created or maintains the app." },
  { label: 'Description', body: "A short note on what the app is for." },
  { label: 'Records', body: 'Opens the multi-record grid for this app.' },
  { label: 'Entry', body: 'Opens the single-record entry form.' },
  { label: 'Config', body: "Configure the app's structure and fields, or change its details." },
  { label: 'Export', body: 'Exports the application structure as a file.' },
];

export function TileAnatomy() {
  return (
    <Figure caption="Anatomy of an application tile.">
      <div className={styles.window}>
        <div className={styles.screen}>
          <div className={styles.tileGrid} style={{ gridTemplateColumns: 'minmax(220px, 320px)' }}>
            <AppTile app={SAMPLE_APPS[0]} />
          </div>
          <ul className={styles.calloutList}>
            {TILE_CALLOUTS.map((c, i) => (
              <li key={c.label}>
                <span className={styles.calloutBadge}>{i + 1}</span>
                <span><strong>{c.label}</strong> — {c.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Figure>
  );
}

export function AppTabsHeader({ active = 'Main' }) {
  const tabs = ['Details', 'Main', 'Claim Notes', 'Inspection Summary'];
  return (
    <Figure caption="Tabs inside an application: application details, the Main table, and each subset.">
      <div className={styles.window}>
        <WindowBar address="https://yourcompany.clearpath.io/collect/apps/property-claims" />
        <div className={styles.tabBar}>
          {tabs.map((tab) => (
            <span key={tab} className={tab === active ? styles.tabActive : styles.tab}>
              {tab}
            </span>
          ))}
        </div>
        <div className={styles.screen}>
          <p className={styles.hint}>
            {active === 'Details' && "The application's name, schema, and owner."}
            {active === 'Main' && "Fields for entering data in the application's main table."}
            {(active === 'Claim Notes' || active === 'Inspection Summary') &&
              'Fields for entering subset data connected to records in the Main table.'}
          </p>
        </div>
      </div>
    </Figure>
  );
}

/* =====================================================================
   Create and manage an app
   ===================================================================== */

export function HowItWorksFlow() {
  const steps = [
    { title: 'Build an app', body: "An administrator creates and deploys a web form to collect a specific slice of data." },
    { title: 'Collect data', body: 'Users enter data in the form from a desktop, laptop, or tablet.' },
    { title: 'Manage data', body: 'Users sort, search, filter, and export records. Lookup lists keep entries consistent.' },
    { title: 'Get insights', body: 'Analysts use the collected data in reports and dashboards.' },
  ];
  return (
    <Figure>
      <div className={styles.stepFlow}>
        {steps.map((s, i) => (
          <div key={s.title} className={styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            <p className={styles.stepTitle}>{s.title}</p>
            <p className={styles.stepBody}>{s.body}</p>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function CreateAppSteps() {
  const steps = [
    { title: 'Name the app', body: 'Give it a name, description, and owner.' },
    { title: 'Assign permissions', body: 'Grant the roles that can use it.' },
    { title: 'Set up the Main table', body: 'Define the fields for its main records.' },
    { title: 'Set up subset tables', body: 'Add one-to-one or one-to-many related data.' },
  ];
  return (
    <Figure>
      <div className={styles.stepFlow}>
        {steps.map((s, i) => (
          <div key={s.title} className={styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            <p className={styles.stepTitle}>{s.title}</p>
            <p className={styles.stepBody}>{s.body}</p>
          </div>
        ))}
      </div>
    </Figure>
  );
}

function Checkbox({ checked }) {
  return <span className={checked ? clsx(styles.checkbox, styles.checkboxChecked) : styles.checkbox}>{checked ? '✓' : ''}</span>;
}

export function FieldConfigForm() {
  return (
    <Figure caption="Defining a field on the Main table.">
      <div className={styles.window}>
        <div className={styles.screen}>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <span className={styles.label}>Display Label <span className={styles.required}>*</span></span>
              <input className={styles.input} readOnly value="Claim Amount" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Column Name <span className={styles.required}>*</span></span>
              <input className={styles.input} readOnly value="ClaimAmount" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Required</span>
              <label className={styles.checkboxRow}><Checkbox checked /> Required field</label>
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Unique ID</span>
              <label className={styles.checkboxRow}><Checkbox /> Part of this table's unique ID</label>
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Data Type <span className={styles.required}>*</span></span>
              <select className={styles.select} defaultValue="Decimal"><option>Decimal</option></select>
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Max Length <span className={styles.required}>*</span></span>
              <div className={styles.fieldGroup}>
                <input className={clsx(styles.input, styles.inputNarrow)} readOnly value="12" />
              </div>
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Precision <span className={styles.required}>*</span></span>
              <input className={clsx(styles.input, styles.inputNarrow)} readOnly value="2" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Default Value</span>
              <input className={styles.input} readOnly value="0.00" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Help Text</span>
              <input className={styles.input} readOnly value="Enter the total claim amount in dollars." />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Dropdown List</span>
              <div className={styles.fieldGroup}>
                <span className={styles.hint}>Assign a list of values, set up a quick list, or reorder input fields.</span>
                <span className={styles.ellipsisBtn}>&#8230;</span>
              </div>
            </div>
            <div className={styles.footerRow}>
              <span className={styles.btn}>Cancel</span>
              <span className={styles.btnPrimary}>Save</span>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}

export function HelpTextTooltip() {
  return (
    <Figure caption="Help text, entered once in configuration, shown as a tooltip during data entry.">
      <div className={styles.window}>
        <div className={styles.screen}>
          <div className={styles.tooltipDemo}>
            <span className={styles.label}>
              Claim Amount <span className={styles.helpIcon}>?</span>
            </span>
            <span className={styles.tooltipBubble}>Enter the total claim amount in dollars.</span>
          </div>
        </div>
      </div>
    </Figure>
  );
}

/* =====================================================================
   Lookup lists
   ===================================================================== */

export function LookupListTypeGrid() {
  return (
    <Figure>
      <div className={styles.typeGrid}>
        <div className={styles.typeCard}>
          <p className={styles.badgePill}>Global</p>
          <p className={styles.typeCardTitle}>Used by any app</p>
          <p className={styles.typeCardBody}>Shared across every Clearpath Collect application.</p>
        </div>
        <div className={styles.typeCard}>
          <p className={styles.badgePill}>App-specific</p>
          <p className={styles.typeCardTitle}>Used by one app</p>
          <p className={styles.typeCardBody}>Scoped to a single application.</p>
        </div>
        <div className={styles.typeCard}>
          <p className={styles.badgePill}>Query-based</p>
          <p className={styles.typeCardTitle}>Pulls from a query</p>
          <p className={styles.typeCardBody}>Values come from a SQL query against the database.</p>
        </div>
        <div className={styles.typeCard}>
          <p className={styles.badgePill}>Table-based</p>
          <p className={styles.typeCardTitle}>Values you define</p>
          <p className={styles.typeCardBody}>Add your own fields and data types, same as an app.</p>
        </div>
        <div className={styles.typeCard}>
          <p className={styles.badgePill}>Quick list</p>
          <p className={styles.typeCardTitle}>One column, many fields</p>
          <p className={styles.typeCardBody}>A single-column mapping used in as many fields as you want.</p>
        </div>
      </div>
    </Figure>
  );
}

export function LookupListCreateForm({ type = 'Query-Based' }) {
  return (
    <Figure caption="Creating a new lookup list.">
      <div className={styles.window}>
        <WindowBar address="https://yourcompany.clearpath.io/collect/lookup-lists/new" />
        <div className={styles.screen}>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <span className={styles.label}>View Name <span className={styles.required}>*</span></span>
              <input className={styles.input} readOnly value="ClaimStatusCodes" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Lookup List Type</span>
              <span className={styles.pillToggle}>
                <span className={type === 'Query-Based' ? styles.pillActive : styles.pill}>Query-Based</span>
                <span className={type === 'Table-Based' ? styles.pillActive : styles.pill}>Table-Based</span>
              </span>
            </div>
            {type === 'Query-Based' ? (
              <div className={styles.formRowStacked}>
                <span className={styles.label}>Query <span className={styles.required}>*</span></span>
                <textarea
                  className={styles.textarea}
                  readOnly
                  value={'SELECT StatusCode, StatusLabel\nFROM dbo.ClaimStatus\nORDER BY SortOrder'}
                />
                <span className={styles.hint}>A single SELECT statement only — it's saved as a view.</span>
              </div>
            ) : (
              <div className={styles.formRowStacked}>
                <span className={styles.label}>Fields</span>
                <span className={styles.hint}>Define fields the same way you would for an app's Main table.</span>
              </div>
            )}
            <div className={styles.footerRow}>
              <span className={styles.btn}>Cancel</span>
              <span className={styles.btnPrimary}>Save</span>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}

/* =====================================================================
   Add and manage records
   ===================================================================== */

export function SubsetOneToOne() {
  return (
    <Figure caption="A one-to-one subset before and after clicking Add.">
      <div className={styles.window}>
        <div className={styles.tabBar}>
          <span className={styles.tab}>Main</span>
          <span className={styles.tabActive}>Inspection Summary</span>
        </div>
        <div className={styles.screen}>
          <div className={styles.typeGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className={styles.typeCard}>
              <p className={styles.badgePill}>Before</p>
              <p className={styles.typeCardBody}>All fields hidden. Required fields don't block saving yet.</p>
              <div className={styles.footerRow} style={{ justifyContent: 'flex-start', border: 'none', marginTop: 10 }}>
                <span className={styles.btnPrimary}>Add</span>
                <span className={clsx(styles.btn, styles.btnDisabled)}>Remove</span>
              </div>
            </div>
            <div className={styles.typeCard}>
              <p className={styles.badgePill}>After Add</p>
              <p className={styles.typeCardBody}>All fields appear. Required fields now block Save until valid.</p>
              <div className={styles.footerRow} style={{ justifyContent: 'flex-start', border: 'none', marginTop: 10 }}>
                <span className={clsx(styles.btn, styles.btnDisabled)}>Add</span>
                <span className={styles.btnPrimary}>Remove</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}

export function SubsetOneToMany() {
  return (
    <Figure caption="A one-to-many subset: each click of Add Record adds a row.">
      <div className={styles.window}>
        <div className={styles.tabBar}>
          <span className={styles.tab}>Main</span>
          <span className={styles.tabActive}>Claim Notes</span>
        </div>
        <div className={styles.screen}>
          <div className={styles.footerRow} style={{ justifyContent: 'flex-start', border: 'none', marginBottom: 12 }}>
            <span className={styles.btnPrimary}>+ Add Record</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Note Date</th>
                <th>Note</th>
                <th>Entered By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3/2/2026</td>
                <td>Initial contact made with policyholder.</td>
                <td>D. Ruiz</td>
              </tr>
              <tr>
                <td>
                  3/4/2026 <span className={styles.newFlag}>New</span>
                </td>
                <td style={{ color: 'var(--mk-ink-3)' }}>— ready for input —</td>
                <td style={{ color: 'var(--mk-ink-3)' }}>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Figure>
  );
}

export function SingleRecordForm() {
  return (
    <Figure caption="Adding a record with the single-record form.">
      <div className={styles.window}>
        <div className={styles.tabBar}>
          <span className={styles.tabActive}>Main</span>
          <span className={styles.tab}>Claim Notes</span>
          <span className={styles.tab}>Inspection Summary</span>
        </div>
        <div className={styles.screen}>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <span className={styles.label}>Claim Number <span className={styles.required}>*</span></span>
              <input className={styles.input} readOnly value="PC-204891" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Policyholder <span className={styles.required}>*</span></span>
              <input className={styles.input} readOnly value="Monica Alvarez" />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>Claim Amount</span>
              <input className={styles.input} readOnly value="4,250.00" />
            </div>
            <div className={styles.footerRow}>
              <span className={styles.btn}>Save</span>
              <span className={styles.btnPrimary}>Save and New</span>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}
