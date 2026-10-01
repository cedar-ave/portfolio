# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Custom components

### Gallery

Displays a responsive grid of images. Registered globally via [src/theme/MDXComponents.js](src/theme/MDXComponents.js), so it's available in any `.md`/`.mdx` file (docs, blog posts, and pages) with no import needed.

```mdx
<Gallery>

![alt text](./photo-a.jpg)
![alt text](./photo-b.jpg)
![alt text](./photo-c.jpg)

</Gallery>
```

Keep a blank line before/after and between each image — that's what makes MDX treat each one as its own paragraph, which the gallery's CSS then unwraps into a grid.

Defaults to 3 columns (2 on mobile). Override with `columns`:

```mdx
<Gallery columns={4}>
```

Each image still gets click-to-zoom for free from the site-wide `docusaurus-theme-zoom-image` theme.

Source: [src/components/Gallery](src/components/Gallery)

### Panel

Wraps a run of MDX content in a soft, rounded panel with a slight shadow, so it reads as a distinct block without the fixed color of an admonition (`:::note`, `:::important`, etc.). Registered globally via [src/theme/MDXComponents.js](src/theme/MDXComponents.js), so it's available in any `.md`/`.mdx` file with no import needed.

```mdx
<Panel label="Sample outline">

1. First step.
2. Second step.

</Panel>
```

Keep a blank line after the opening tag and before the closing tag — that's what makes MDX parse the content as normal markdown instead of a single inline child. `label` is optional; omit it for an unlabeled panel.

Use an admonition when the content is a warning, tip, or aside that should stand out with color; use `<Panel>` when you just want to set a block apart visually (a worked example, a sample outline, a quoted excerpt) without implying a note or warning.

Source: [src/components/Panel](src/components/Panel)

### Panel-based table of contents

By default, Docusaurus builds a page's right-rail TOC from its markdown headings. That falls apart on a page that wraps several unrelated write-ups in `<Panel label="...">` blocks — the TOC would list every write-up's internal headings instead of the panels that actually separate the content.

Opt a page in with frontmatter:

```mdx title="example"
---
title: Example page
toc_source: panels
---
```

This swaps that page's TOC to list each `<Panel label="...">` caption instead, one entry per labeled panel, linking straight to it. Every other page keeps the normal heading-based TOC — it's opt-in per page, not site-wide.

No page currently opts into this. It was built for `release-notes.mdx`, which wrapped three unrelated samples in `<Panel>` blocks; that page was later split into three standalone pages (`release-notes-sprint-aligned.mdx`, `release-notes-customer-facing.mdx`, `release-notes-api.mdx`), each with its own normal heading-based TOC. The plugin and `<Panel>` component are left in place as available infrastructure.

How it works: `plugins/remark-panel-toc.mjs` is a remark plugin (registered on the `pages` preset's `remarkPlugins` in `docusaurus.config.js`) that runs after Docusaurus's own heading-based `toc` export already exists for the page, and overwrites it with one entry per labeled `<Panel>`, stamping each one with a slugified `id` (unless it already has one) so the TOC link has something to scroll to. `src/components/Panel` accepts that `id` prop and renders it on its wrapping `<div>`. You can also pass `id` by hand on a `<Panel>` for a stable anchor outside of this flow.

Notes:
- Unlabeled panels never appear in the TOC, with or without this flag.
- Headings inside a panel still render normally in the page body; they just stop contributing their own TOC entries once `toc_source: panels` is set.
- If two panels on the same page share a label, the plugin appends `-2`, `-3`, etc. to keep anchor ids unique.

Source: `plugins/remark-panel-toc.mjs`, [src/components/Panel](src/components/Panel), the `pages.remarkPlugins` option in `docusaurus.config.js`.

### HomepageFeatures

Renders the three-column "what I do" feature row on the homepage ([src/pages/index.js](src/pages/index.js)). Not registered globally — it's a single hardcoded section, not a reusable MDX tag.

```jsx
import HomepageFeatures from '@site/src/components/HomepageFeatures';

<HomepageFeatures />
```

Content (title, link, icon, description) lives in the `FeatureList` array inside the component itself — edit [src/components/HomepageFeatures/index.js](src/components/HomepageFeatures/index.js) directly rather than passing props.

Source: [src/components/HomepageFeatures](src/components/HomepageFeatures)

### Page diagrams

Each `*Diagrams` folder under [src/components](src/components) is a set of bespoke inline-SVG figures and small interactive dashboard mockups written for one experience page, not shared components. They aren't registered in [src/theme/MDXComponents.js](src/theme/MDXComponents.js) — each experience `.mdx` page imports the named exports it needs directly:

```mdx
import { SourceMap, JoinModel, AwarenessDashboard } from '@site/src/components/AnalyticsDiagrams';

<SourceMap />
```

They take no props; each exported component is a self-contained figure with its data baked in. A shared set of internal helpers (`Figure`, `Box`, `DashFrame`, `Segmented`, etc.) in each folder's `index.js` keeps the figures in a folder visually consistent, styled by that folder's `styles.module.css`.

| Component folder | Used by | Exports |
| --- | --- | --- |
| [AnalyticsDiagrams](src/components/AnalyticsDiagrams) | [analytics-dashboard-design.mdx](src/pages/portfolio/analytics-dashboard-design.mdx) | `SourceMap`, `JoinModel`, `AwarenessDashboard`, `DeflectionDashboard`, `ArticleAgeComparison` |
| [ApiDocsDiagrams](src/components/ApiDocsDiagrams) | [api-documentation.mdx](src/pages/portfolio/api-documentation.mdx) | `TwoApiTypes`, `RestApiPipeline`, `EngineApiPipeline`, `EditionSources` |
| [DocsAsCodeDiagrams](src/components/DocsAsCodeDiagrams) | [docs-as-code.mdx](src/pages/portfolio/docs-as-code.mdx), [docs-as-code-contributions.mdx](src/pages/portfolio/docs-as-code-contributions.mdx), [docs-as-code-customizations.mdx](src/pages/portfolio/docs-as-code-customizations.mdx), [docs-as-code-linting.mdx](src/pages/portfolio/docs-as-code-linting.mdx) | `EcosystemMap`, `LocalDevLoop`, `ApiDocsFlow`, `TemplateLayers`, `PublishPipeline`, `ContributorPath`, `AudienceLayers`, `TwoOnRamps`, `ReviewModel`, `ReleaseNotesFlow`, `LintCheckpoints`, `ValeFlow`, `StyleCuration`, `PageAnatomy`, `SingleSourceFlow`, `MetadataCascade`, `FeedbackLoop` |
| [IntakeDiagrams](src/components/IntakeDiagrams) | [content-intake.mdx](src/pages/portfolio/content-intake.mdx) | `RequestToRootProblem`, `IntakeFlow`, `RequestFormMockup` |
| [McpDiagrams](src/components/McpDiagrams) | [custom-mcps.mdx](src/pages/portfolio/custom-mcps.mdx) | `McpHub`, `ManualVsPrompt`, `TicketPipeline` |
| [RelaunchDiagrams](src/components/RelaunchDiagrams) | [help-site-relaunch.mdx](src/pages/portfolio/help-site-relaunch.mdx) | `EvidenceToDecisions`, `HomeBeforeAfter` |
| [ReleaseNotesDiagrams](src/components/ReleaseNotesDiagrams) | [automated-release-notes.mdx](src/pages/portfolio/automated-release-notes.mdx) | `TypicalVsAutomated`, `PipelineMap`, `WorkItemSimulator` |
| [SkillDiagrams](src/components/SkillDiagrams) | [ai-agent-skills.mdx](src/pages/portfolio/ai-agent-skills.mdx) | `SkillSuite`, `TieredReading`, `ReleaseNoteFilter`, `SubagentFanOut`, `DocToPaligo`, `SafeWrites`, `ReviewStack` |

Data used in dashboard mockups (e.g. `AwarenessDashboard`, `DeflectionDashboard`, `WorkItemSimulator`) is illustrative, not real company data — see the constants near the top of each file.

### Release notes page mockups

The "Release notes" portfolio sample is three standalone pages — [release-notes-sprint-aligned.mdx](src/pages/portfolio/release-notes-sprint-aligned.mdx), [release-notes-customer-facing.mdx](src/pages/portfolio/release-notes-customer-facing.mdx), and [release-notes-api.mdx](src/pages/portfolio/release-notes-api.mdx) — each built from its own standalone mockup component(s), not registered in `src/theme/MDXComponents.js`:

| Component folder | Used for | Page |
| --- | --- | --- |
| [ReleaseNotesWikiMockup](src/components/ReleaseNotesWikiMockup) | Sprint-aligned release notes | release-notes-sprint-aligned.mdx |
| [SanctionsMatchMockup](src/components/SanctionsMatchMockup) | Record-match relevancy | release-notes-customer-facing.mdx |
| [RecordHealthCheckMockup](src/components/RecordHealthCheckMockup) | Data health check banner | release-notes-customer-facing.mdx |
| [DataHealthDashboardMockup](src/components/DataHealthDashboardMockup) | Data Health Check Dashboard | release-notes-customer-facing.mdx |
| [ApiReleaseNotesMockup](src/components/ApiReleaseNotesMockup) | API release notes for developers | release-notes-api.mdx |

`ApiReleaseNotesMockup` is the only one driven by a data array rather than hand-written JSX. Its `ENTRIES` array (in `index.js`) holds dated release entries, each with `groups` of `status: 'added' | 'fixed'` items (`STATUS_LABEL` maps these to "What's new" / "Bug fixes"). Each item's `title`/`body`/`trailer`/`trailer2`/bullets can be a plain string or an array of "parts" rendered by the shared `Body` helper, mixing plain strings with:

- `{ code: '...' }` — an inline `<code>` span, for endpoint paths, field names, enum values, status codes.
- `{ link: '...' }` — colored semibold text via the global `.mockLinkText` class (`src/css/custom.css`), matching the "Compatibility matrix" look in `ReleaseNotesWikiMockup`. Not a real, clickable link — used for doc cross-references.

```js
// classificationId renders as code mid-sentence:
[': Allows a ', { code: 'classificationId' }, ' field to be included']

// titles support the same format when they need an inline code span:
title: ['Improved response time for ', { code: 'GET /scans' }, ' with large record sets'],
```

The left sidebar's release index is generated directly from `ENTRIES`' `date`/`version` fields, so adding an entry there is enough — no separate list to update.

Full details: [Release notes page mockups](docs/visuals/release-notes-mockups.mdx).

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Error: Panic occurred at runtime. react-router-config.js not found

```bash
# Clear Docusaurus cache
npm run clear # or yarn clear / pnpm clear

# Remove dependencies and lockfiles
rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml

# Reinstall cleanly
npm install # or yarn install / pnpm install
```

## TODO

- Remove unused gfonts
- SEO
- Accessibility
- Link checker in pipeline