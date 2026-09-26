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
| [AnalyticsDiagrams](src/components/AnalyticsDiagrams) | [analytics-dashboard-design.mdx](src/pages/experience/analytics-dashboard-design.mdx) | `SourceMap`, `JoinModel`, `AwarenessDashboard`, `DeflectionDashboard`, `ArticleAgeComparison` |
| [ApiDocsDiagrams](src/components/ApiDocsDiagrams) | [api-documentation.mdx](src/pages/experience/api-documentation.mdx) | `TwoApiTypes`, `RestApiPipeline`, `EngineApiPipeline`, `EditionSources` |
| [DocsAsCodeDiagrams](src/components/DocsAsCodeDiagrams) | [docs-as-code.mdx](src/pages/experience/docs-as-code.mdx), [docs-as-code-contributions.mdx](src/pages/experience/docs-as-code-contributions.mdx), [docs-as-code-customizations.mdx](src/pages/experience/docs-as-code-customizations.mdx), [docs-as-code-linting.mdx](src/pages/experience/docs-as-code-linting.mdx) | `EcosystemMap`, `LocalDevLoop`, `ApiDocsFlow`, `TemplateLayers`, `PublishPipeline`, `ContributorPath`, `AudienceLayers`, `TwoOnRamps`, `ReviewModel`, `ReleaseNotesFlow`, `LintCheckpoints`, `ValeFlow`, `StyleCuration`, `PageAnatomy`, `SingleSourceFlow`, `MetadataCascade`, `FeedbackLoop` |
| [IntakeDiagrams](src/components/IntakeDiagrams) | [content-intake.mdx](src/pages/experience/content-intake.mdx) | `RequestToRootProblem`, `IntakeFlow`, `RequestFormMockup` |
| [McpDiagrams](src/components/McpDiagrams) | [custom-mcps.mdx](src/pages/experience/custom-mcps.mdx) | `McpHub`, `ManualVsPrompt`, `TicketPipeline` |
| [RelaunchDiagrams](src/components/RelaunchDiagrams) | [help-site-relaunch.mdx](src/pages/experience/help-site-relaunch.mdx) | `EvidenceToDecisions`, `HomeBeforeAfter` |
| [ReleaseNotesDiagrams](src/components/ReleaseNotesDiagrams) | [automated-release-notes.mdx](src/pages/experience/automated-release-notes.mdx) | `TypicalVsAutomated`, `PipelineMap`, `WorkItemSimulator` |
| [SkillDiagrams](src/components/SkillDiagrams) | [ai-agent-skills.mdx](src/pages/experience/ai-agent-skills.mdx) | `SkillSuite`, `TieredReading`, `ReleaseNoteFilter`, `SubagentFanOut`, `DocToPaligo`, `SafeWrites`, `ReviewStack` |

Data used in dashboard mockups (e.g. `AwarenessDashboard`, `DeflectionDashboard`, `WorkItemSimulator`) is illustrative, not real company data — see the constants near the top of each file.

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