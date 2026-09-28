---
draft: true
slug: knowledge-ingestion-generative-ai
title: Ingesting and classifying knowledge for Generative AI
authors: [marla]
tags: [Generative AI, Knowledge classification, AI agent skills]
---

# Drafting new content with generative AI

How I designed a faceted taxonomy and a support-field crosswalk that let AI draft accurate help articles from thousands of mixed sources, while cutting the tokens spent finding the right ones.

{/* truncate */}

Before AI became a common tool, each time I needed to draft new content I spent hours tracking down and reading through the most relevant (and most recent) support tickets, source code, demo transcripts, roadmap slides, Jira tickets, implementation manuals, PRDs, enablement guides, wiki pages, and so many more sources of product knowledge.

I wanted generative AI to take over, but requiring AI to re-ingest each piece of source material each time I needed it to draft a new article was slow and expensive, not to mention impossible to scale.

I designed an approach that did not require generative AI to re-ingest each piece of source material each time and allowed it to rapidly focus in on the content most relevant to the topic I provided. I built a faceted taxonomy of 16 categories and about 400 controlled terms. Each piece of source material (after being turned into Markdown) was read **once**, tagged, summarized, and given a note about which types of new content it could support.

Following is a redacted and genericized example:

```yaml
---
title: "Account analysis"
source_type: "implementation_guide"
source_url: "https://..."
created_at: "2026-06-19"
summary: >
  Lightweight baseline analysis how-to in the CRM app: <redacted steps>.
drafting_guidance: >
  Source for a short how-to article on <redacted objectives> in the CRM app. Useful as a baseline reference compared to the more elaborate customer-specific guides for <redacted customer organization names> that include <redacted features>. Contains a specific best-practice / warning callout: <redacted errors>. Contains a conceptual note on <reacted feature actions>. Includes <redacted customer-specific field> — flag as customer-specific if drafting generic content. Pair with broader customer analysis guides for the full lifecycle.
platform:
  - crm-app
section:
  - record-analysis
  - getting-started
module:
  - record-analysis
  - record-application
  - analysis-workflow
feature:
  - create-record
workflow:
  - record-onboarding
  - analysis-review
stage:
  - create
  - submission
  - review
object:
  - record
role:
  - analysis-specialist
  - customer-admin
intent:
  - task-oriented
  - faq
lifecycle:
  - onboarding
  - daily-operations
---
```

An index held reference to...

After that, drafting runs found the right sources by scanning one-line index entries instead of re-reading files. The taxonomy also required every ticket to be checked for how-to steps, explanations, warnings, and FAQs, not just fixes. That surfaced product knowledge that had never made it into the docs before.

The company's name and product details are left out. Tag values and examples on this page are excerpts from my original work, with company-specific terms removed.

:::tip[At a glance]

- **A faceted taxonomy with 16 categories and about 400 terms,** covering product areas, features, workflows, objects, user roles, lifecycle stages, compliance, issues, and technical components.
- **Rules for required tags,** so every source was findable by product area, workflow, and purpose, and troubleshooting and integration sources carried the detail they needed.
:::

## The problem: the knowledge existed, but no one could find it

At a software company with a complex, workflow-heavy product, the most accurate product knowledge wasn't in the help center. It was spread across thousands of support tickets, recorded customer calls, engineering repos, internal docs, and customer-made step-by-step guides. I was building [AI agent skills](/experience/ai-agent-skills) to draft help articles from that material, and I saw two problems right away.

1. **Cost.** A model that re-reads the whole library for every article is slow and expensive, and it runs out of context before it finishes.
2. **Recall.** Keyword search misses sources that use different words for the same thing. A ticket about "acct ID," one about "account identifier," and a transcript about "customer number" are all about the same workflow. Without shared vocabulary, the model wouldn't know that.

The answer wasn't a better prompt. It was a better way to organize the knowledge before the model ever saw it.

## A faceted taxonomy, not a folder tree

I chose a **faceted** taxonomy over a traditional hierarchy. A folder tree forces every source into one place, but a support ticket about a failed analysis check belongs in many places at once. It's about a feature, a workflow, an object, an error, and a user role. With facets, each of those becomes its own independent tag.

| Facet | What it answers | Example terms |
| --- | --- | --- |
| `module` / `feature` | Which part of the product? | `usage-monitoring`, `verify-record` |
| `workflow` / `stage` | Which process, and at what point? | `record-analysis`, `review` |
| `object` | Which record or data type? | `record`, `analysis-event` |
| `role` | Who is doing this? | `analysis-specialist`, `customer-admin` |
| `intent` | What kind of article can this feed? | `task-oriented`, `conceptual`, `troubleshooting` |
| `lifecycle` | When in the customer's journey? | `onboarding`, `renewal`, `go-live` |
| `issue` / `technical` | What broke, and where? | `sync-failure`, `event-driven` |

The other facets cover platform, package, section, integrations, compliance standards, and implementation work.

Strictly speaking, this is a **faceted classification scheme**: a set of controlled vocabularies, one per facet. It isn't a single hierarchy, and it isn't a formal ontology with machine-readable rules. It does encode lightweight relationships between the domain's objects, workflows, stages, and roles.

### Rules that kept it trustworthy

A taxonomy is only useful if people and machines apply it the same way. I wrote the rules into the skill so the model couldn't drift.

- **Controlled vocabulary only.** The skill may use only listed terms: "Do not invent tags." One concept, one term, every time.
- **Required facets.** Every source needs `platform`, `section`, `module`, `workflow`, and `intent`. Troubleshooting sources also need `issue` and `technical`. Integration sources also need `integration`.
- **An honest unknown.** When a source gives no clear signal for platform, it's tagged `undetermined` instead of guessed. A wrong tag is worse than an admitted gap.
- **Tag broadly, never aspirationally.** For retrieval, a missing tag costs more than an extra one, so the skill tags everything the content covers directly, and nothing it doesn't.

## How the taxonomy saved tokens

The design moves the expensive reading to one step that happens once, and makes every later step cheap.

1. **Slim before reading.** A Python script drops unneeded fields, email signatures, headers, repeated comments, and out-of-scope tickets. The exported ticket data is about 85 percent smaller before the model reads a word.
2. **Read once, record what it's good for.** The model reads each source in full a single time. It writes the tags, a PII-free summary, and drafting guidance into the file's front matter.
3. **Find sources by tags.** Each source becomes one line in a compact index, like this example:

   ```plaintext
   [support_ticket] crm-app records verify-record record-analysis
   task-oriented troubleshooting analysis-failure · [Record shows as not found](support_ticket/ticket-12345.md)
   ```

   A drafting run scans hundreds of these lines to find candidates, reads a short summary for each match, and opens full files only for sources that are confirmed relevant. Compared with opening every candidate, that cuts reading by 70 to 80 percent.
4. **Split by workflow.** Per-workflow index files hold full summaries and a short "Use when" note. When the topic is known, the drafter skips the master index and goes straight to the right file.

Because the vocabulary is controlled, matching is exact. `workflow: record-analysis` either matches or it doesn't, with no fuzzy search and no second pass to catch synonyms.

## How the taxonomy drew out better content

Saving tokens mattered, but the bigger win was what the model found.

**Tickets stopped being troubleshooting-only.** The `intent` facet can hold many values, and the rules require every ticket to be checked against every article type. One ticket can be a troubleshooting source, a how-to step, a conceptual explanation, a warning, a best practice, and an FAQ entry all at once. For example, a ticket about a failed action might also contain:

- The steps the agent walked the customer through (**how-to**)
- Why the file must be locked first (**concept**)
- What happens to in-progress files if it isn't (**warning**)

**The "why" got captured.** Drafting guidance tells the model to call out explanations of why a step matters. As I noted in the skill, a support conversation is often the only place that reasoning is written down.

**Content matched the reader.** The `role`, `lifecycle`, and `stage` facets let one source feed different articles for an administrator during setup, a specialist in daily work, and an implementer at go-live.

**Gaps became visible.** Because every source carries the same facets, I could ask questions that were impossible before, like "which workflows have troubleshooting sources but no how-to sources?"
