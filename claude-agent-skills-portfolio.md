# Claude AI agent skills for help documentation

I design, build, and maintain a suite of Claude AI agent skills that cover the full lifecycle of end-user help documentation: gathering source knowledge, drafting articles, reviewing them for style, terminology, and AI readiness, publishing through Paligo and Zendesk, and writing release notes. The skills ship together as a versioned Claude Code plugin with custom MCP servers, so teammates can install and update the whole toolkit in one step.

Every skill follows the same principles:

- **Never fabricate.** Every claim traces back to a source. Missing information gets a visible review flag, and conflicting sources get a conflict flag instead of a guess.
- **Confirm before changing anything live.** Skills that write to production systems default to safe behavior and ask before any change that can't be undone.
- **Keep the context lean.** Tiered reading, disk-based extraction logs, and subagents keep long, high-volume jobs reliable and cost-efficient.
- **Separate concerns.** Drafting, vocabulary, style, and AI optimization are separate skills, so each one does one job well and can run on any document.

## Build the knowledge base

### Source librarian

**What it is**: A cataloging skill that turns raw knowledge into a tagged, indexed library that drafting skills can search. It takes in Zendesk tickets, Jira issues, GitHub files, Gong call transcripts, Slack threads, Google Docs, Tango guides, slides, PDFs, and plain text. For each file, it reads the full content, strips boilerplate, applies tags from a 16-dimension product taxonomy, and writes a PII-free summary and drafting guidance into the file's YAML front matter. It keeps three index layers up to date: a compact master index, a ticket index, and one index shard per workflow.

**Why I built it**: A drafting skill can only use the sources it can find, and no one can afford to read thousands of files on every run. The librarian does the expensive reading once and records what each file is good for, so later drafting runs know exactly where to look. It reviews every support ticket against all Diataxis article types instead of treating tickets as troubleshooting-only material. That surfaces how-to steps, warnings, best practices, and conceptual explanations that would otherwise stay buried in support conversations. For large Zendesk exports, a companion Python script shrinks the data by about 85 percent before Claude reads it. A completion log makes batch runs safely resumable, and an unattended batch loop starts a fresh Claude session for each batch. A rebuild script regenerates every index from front matter whenever the format or sort order changes.

Example prompts:

- "Catalog the files in sources-to-ingest."
- "Catalog these Zendesk tickets and read them for how-to and conceptual content."
- "Tag this Gong transcript and add it to the source library."
- "Re-catalog this Tango guide with --refresh."

### Source analyzer

**What it is**: An analysis skill that compares a set of cataloged Tango guides covering the same workflow. It produces two files: a step alignment document that maps every step in every guide to a canonical workflow phase, and a deviation register (CSV) that records every UI label variant and structural difference, with how often it appears and which guide it came from.

**Why I built it**: When customers configure the product differently, their step-by-step guides describe the same workflow with different button labels, extra steps, or missing phases. Before I write one authoritative article, I need to know exactly where the guides agree and where they differ. The skill flags unusual guides before reading them in depth, proposes a phase map (for example, 18 phases for standard credentialing) and waits for my approval, and writes alignment notes to disk after each guide so a long analysis can pick up where it left off. It records every variant, even ones that appear in a single guide, so the final article can document every label a customer might see.

Example prompts:

- "Analyze these 2026 standard credentialing guides and build a step alignment."
- "Run source analyzer on the CVO credentialing guides with the slug cvo-credentialing-2026."
- "Find variants across these Tango guides."

## Draft the content

### Diataxis drafter

**What it is**: A drafting skill that writes customer-facing Help Center articles in any Diataxis type (how-to guide, tutorial, concept, troubleshooting, or reference), using the knowledge base built by source librarian. It reads in three cost-saving tiers: index files first, then metadata headers only, and finally full reads of just the files I've confirmed are relevant.

**Why I built it**: I wanted drafts that are complete, traceable, and easy to review, without paying to read every source file. The tiered approach cuts reading by roughly 70 to 80 percent compared to opening every candidate. A required check across source types makes sure call transcripts and support tickets contribute alongside official guides. The skill copies UI labels word for word, keeps both branches of conditional steps, documents labels that vary by customer environment, and flags gaps and contradictions for review instead of guessing. The articles also work well for AI agents: every checkpoint uses the same "Expected result:" prefix, error messages appear bolded and word for word, troubleshooting articles include symptom-to-cause maps, and concept articles map synonyms to canonical terms. All article templates live in one shared reference file, so every article type has a predictable structure.

Example prompts:

- "Draft a how-to guide and a troubleshooting article on CAQH import."
- "Write a concept article about continuous monitoring."
- "Draft how-to, concept, and reference articles for provider roster enrollment."

### Release docs drafter

**What it is**: A companion to Diataxis drafter for new features, when the source material isn't in the knowledge base yet. It drafts Diataxis articles from sources I supply directly: files in a feature's input folder, Jira tickets, Notion pages, Google Docs, slide decks, and web pages.

**Why I built it**: Release documentation often has to be written from a mix of tickets, specs, and decks before any of it is cataloged. The skill reads one source at a time. It reads each source completely, records everything relevant in an extraction log, and then sets the source aside before opening the next. Log entries are tagged by type: steps, expected results, prerequisites, callouts, configuration values, roles, tables, conditions, variants, conflicts, and gaps. Because drafting uses only the log, nothing gets lost in long sessions. The skill also has rules for specific source types, such as reading speaker notes in slide decks, splitting Jira acceptance criteria into prerequisites and conditions, and flagging unresolved Google Doc comments. It reuses the Diataxis drafter templates, so release articles match the rest of the Help Center.

Example prompts:

- "Draft a how-to guide and a concept article for the caqh-import feature using the input folder."
- "Draft release docs for provider-roster-enrollment from the input folder, this Jira epic, and this Notion spec."
- "Use this slide deck and Google Doc to draft a reference article for the new monitoring settings."

## Review and optimize

### AI optimizer

**What it is**: A review skill that checks a drafted Help Center article against 25 research-backed criteria for how well AI agents can use it, whether they retrieve it through RAG, web fetch, or MCP tool calling. It returns a report ranked by priority (critical, high, and medium), with a readiness rating for each access pattern. It doesn't edit the article unless I ask it to.

**Why I built it**: AI agents now read help content as often as people do, and they fail in ways people don't. RAG systems pull sections out of order, web fetch strips out images, and tool calling picks pages by title. The skill flags sections that can't stand on their own, acronyms that aren't defined in each section, inconsistent terms for the same thing, unclear pronouns, reworded error messages, screenshots without text equivalents, content hidden in tabs or accordions, generic headings, missing checkpoints, and missing failure modes. Every recommendation names the exact section and includes replacement text I can use as is. I limited it to AI optimization so it works alongside my style and vocabulary skills instead of duplicating them.

Example prompts:

- "Run AI optimizer on this troubleshooting article."
- "Check just the heading structure of this draft for AI readiness."
- "Review this Zendesk article for RAG and web fetch, then apply the critical fixes."

### Verifiable vocabulary pal

**What it is**: An audit skill that checks a Google Doc, Markdown file, text file, or Word document against Verifiable's controlled vocabulary. It flags every non-preferred term and gives the preferred term, the style guide's reasoning, and a suggested rewrite.

**Why I built it**: Inconsistent terminology confuses readers and hurts search and retrieval. The skill handles details a simple find-and-replace can't: case-sensitive terms, hyphenation, acronyms that must be spelled out on first use, plurals and possessives, exceptions for terms shown literally in the product UI, and look-alike terms that mean different things. For example, it knows that continuous query (an NPDB feature) and continuous monitoring (the product feature built on it) aren't the same thing. When the context is ambiguous, it flags both readings instead of picking one silently.

Example prompts:

- "Check this Google Doc against our vocabulary."
- "Run vocabulary pal on draft-about-primary-source-verification.md."
- "Flag non-preferred terms in these release notes."

### Verifiable style pal

**What it is**: An audit skill that checks a document against Verifiable's Technical Style Guide, with the Microsoft Style Guide as a fallback. It returns a numbered list of violations with a suggested fix for each, and I approve fixes one at a time.

**Why I built it**: Consistent style is hard to maintain across many writers, and even harder across AI-generated drafts. The skill checks for ampersands, title case and gerunds in headings, missing serial commas, "click on," quotation marks used for emphasis, split infinitives, third-person instructions, unbolded UI elements and file names, passive voice, and more. The company style guide wins whenever the two guides conflict. Because the report is numbered, I can reply "fix 1, 3, 5" or "fix all," so I stay in control of every change.

Example prompts:

- "Run a style check on this Google Doc."
- "Review release-notes-1.99.md for style issues."
- "Fix 2, 4, and 7, and skip the rest."

## Publish and manage

### Paligo pal

**What it is**: A skill for managing content in Paligo, a component content management system, through its REST API. A custom Python MCP server connects Claude to the API. The skill covers documents, folders, forks, images, productions, imports, translation exports and imports, taxonomies, variables, users, and assignments. It also includes a Google Doc to Paligo pipeline that converts a doc into valid DocBook 5.1 XML, uploads its images, and turns Help Center links into Paligo cross-references.

**Why I built it**: Copying approved drafts from Google Docs into Paligo by hand is slow and error-prone. The pipeline applies Paligo's structural rules automatically. It respects section limits (converting extra headings to styled paragraphs), tells procedures apart from ordinary lists, and handles admonitions, tables, and image placement. I documented every API field-name quirk I found in live testing, so the skill avoids known request errors. Safety rules make it fetch the latest XML just before every update, so it never overwrites edits made in the Paligo editor. It also never guesses a document title or folder location.

Example prompts:

- "Convert this Google Doc to Paligo XML."
- "Convert this Google Doc and upload it to the Topics folder for the credentialing guide."
- "Add the new topic to the publication and start a production."
- "Export this document for translation into Spanish and French."

### Zendesk Guide pal

**What it is**: A skill for Zendesk Help Center operations: article metadata, content tags, labels, redirect rules, and theme management. A custom MCP server with more than 40 tools powers it, and it works in both a production and a sandbox environment.

**Why I built it**: Tagging hundreds of articles, cleaning up labels, and deploying theme changes through the Zendesk UI is slow and risky. I designed the skill to play it safe. It reads from production by default, so I see real data, and writes to sandbox by default, so mistakes can be undone. Writing to production requires my explicit confirmation. The skill adds new tags alongside existing ones instead of replacing them, limits the rate of bulk writes and backs off automatically when Zendesk pushes back, and won't delete a tag or label from the whole Help Center until I confirm its name and ID. For themes, it handles the full cycle of export, edit, preview, package, import, and publish. It checks Zendesk's 10-theme limit before importing and never deletes the original base theme. It can also find the Zendesk article that was published from a given Paligo topic, which connects the two systems.

Example prompts:

- "We're working in sandbox today."
- "Find all untagged articles in the onboarding section and apply the getting-started content tag."
- "Create a 301 redirect from the old CAQH import article to the new one."
- "Launch a preview of the theme."
- "Deploy the local theme to production."

## Release notes

### Release notes drafter

**What it is**: A skill that drafts customer-facing release notes for one audience per run (Salesforce app, web app, or API) from a GitHub release, pasted commits, and Jira tickets. It writes a single Markdown file.

**Why I built it**: Engineering changelogs describe what was built, but customers want to know what they gain. The skill reads every Jira ticket in full and applies a clear exclusion filter that drops internal work such as CI/CD changes, refactors, monitoring, and dependency upgrades. It lists every dropped item with a reason, so reviewers can check the call. It rewrites engineering headings as customer value; for example, "Added retry logic to sync job" becomes "Provider data stays current even when sources are temporarily down." It also adjusts tone and formatting for each audience, groups changes that apply only to CVO customers, and replaces internal jargon with customer-facing terms.

Example prompts:

- "Draft web app release notes for 1.99 from this GitHub release."
- "Write API release notes for March 2026 from these Jira keys."
- "Draft Salesforce app release notes from this list of commits."

### Release notes Jira to Google Doc

**What it is**: A skill that builds complete release notes from every ticket in one or more Jira fix versions, adding detail from linked tickets, remote links, and supporting product materials. It produces Markdown ready to paste into a new Google Doc and ends with an audit log that lists every ticket and link, whether it was read, and whether it was used.

**Why I built it**: A release can include dozens of tickets across several Jira projects, and the best customer-facing language often lives in linked specs, slide decks, and Confluence pages rather than in the ticket itself. To handle that volume without dropping tickets, the skill uses subagents that save to disk: they fetch tickets and linked content in parallel, write it to files, and return only a confirmation, which keeps the main conversation small. The skill never changes Jira or existing Drive files. It retries unreachable links through several connectors before asking me how to proceed, leaves out tickets with restricted labels, and flags any place where tickets and product materials disagree. The audit log shows reviewers that nothing was skipped.

Example prompts:

- "Create release notes for fix version 1.98."
- "Show me all fix versions so I can choose which ones to include."
- "Draft release notes for 1.98.1 and vApril, and use this product brief and slide deck for context."
