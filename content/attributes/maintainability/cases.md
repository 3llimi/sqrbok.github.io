---
title: Case Studies
parent: Maintainability
grand_parent: Quality Attributes
nav_order: 4
layout: default
---

# Maintainability Case Studies

Theory matters, but empirical evidence from real systems provides the most compelling arguments for investing in maintainability. The cases below span open-source browsers, commercial operating systems, industrial simulations, and automated tooling — yet they converge on remarkably similar lessons.

## Mozilla: Architecture as a Managerial Choice

### Context

Mozilla (Netscape) released its proprietary browser code as open source in 1998. The initial code had a **propagation cost of 17.35%** — meaning a change to any file could potentially affect 17% of the entire codebase.

### The Re-design

A purposeful architectural re-design in late 1998 restructured the codebase to reduce coupling and increase modularity.

### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Propagation Cost | 17.35% | 2.78% | **-84%** |
| Vertical buses | 2 | increased significantly | — |
| Architecture | highly coupled | more modular than Linux (5.82% PC) | — |

### Lesson

Architecture is not determined by function — it results from purposeful choices by designers. An "architecture for participation" is essential for open-source success {% cite maccormack2006exploring %}.

## Microsoft Windows: Large-Scale Refactoring

### Context

Kim et al. studied refactoring practices across 5 Microsoft products, including a multi-year effort on Windows {% cite kim2014refactoring %}.

### Key Findings

| Finding | Detail |
|---------|--------|
| Top 5% of preferentially refactored modules | Inter-module dependencies decreased by factor **0.85** |
| Non-refactored modules | Dependencies increased by factor **1.10** |
| Engineer definition of refactoring | 78% defined it as any change improving readability/maintainability |
| Primary risk identified | 76% cited regression bugs |
| Effect on module size | Refactoring increased LOC even while reducing complexity |

### Lesson

Measuring refactoring impact requires a **multi-dimensional view** — single metrics can give misleading results. A module may grow in size yet become easier to maintain.

## ABB DID: Industrial Refactoring

### Context

ABB's DID physics simulation (30 kLOC Java) was considered "unmaintainable." Adding a single new component required **59 changes across 17 classes**, relying on error-prone copy/paste {% cite wahler2016refactoring %}.

### The Refactoring

Software engineering experts consulted with developers approximately 3 hours per week for 3 months. The focus areas were: separation of concerns (MVC), a fine-grained data model, and multi-level testing.

### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Duplicated code | 5,647 lines | 338 lines | **-94%** |
| FindBugs defects (normalized) | baseline | reduced | **-23%** |
| Time per new component | 6–8 weeks | 1–2 weeks | **-75%** |
| Automated tests | 0 | 200+ (unit + integration + system) | — |

### Lesson

Relatively small expert investment (3 h/week for 3 months) can transform an "unmaintainable" system. Start with separation of concerns and automated testing.

## Automatic Refactoring at Scale

### Context

Szoke et al. developed a refactoring framework and deployed it at 4 companies across approximately 3 million LOC, performing around 4,000 refactoring operations {% cite szoke2015refactoring %}.

### Results

| Finding | Detail |
|---------|--------|
| Refactorings that improved maintainability | **55%** (ColumbusQM model) |
| Refactorings that showed decrease | Only **10%** |
| Most effective targets | Reducing coding rule violations and coupling |
| Tool chain | SourceMeter + IDE plugins (Eclipse, NetBeans, IntelliJ) |

### The "UnnecessaryConstructor" Paradox

Some refactorings that fix a specific issue can accidentally worsen another metric — expert interpretation of measurement tools is essential.

### Lesson

Automation helps at scale, but not all refactorings are equal. Target specific anti-patterns rather than applying broad transformations.

## OSS Evolution Patterns

### Context

Molnar (2020) studied maintainability evolution in 3 open-source projects (FreeMind, jEdit, TuxGuitar) over multiple years {% cite molnar2020study %}.

### Key Findings

- Most maintainability issues concentrated in a **small subset of packages**.
- In jEdit, **6 packages** accounted for 80% of maintenance effort.
- MI and ARiSA metrics were significantly influenced by software size (confounding variable).
- **SQALE** was not affected by size — making it more robust for longitudinal analysis.

## Cross-Case Patterns

| Case | Investment | Key Metric | Improvement |
|------|-----------|------------|-------------|
| Mozilla | Architectural re-design | Propagation Cost | **-84%** |
| Microsoft | Targeted refactoring | Inter-module dependencies | **-15%** (top modules) |
| ABB | 3 h/week expert guidance | Time per component | **-75%** |
| Automatic | Framework at scale | Maintainability score | **55% improved** |

Four common patterns emerge across all cases:

1. **Targeted intervention outperforms broad application.** Mozilla re-designed architecture; ABB focused on separation of concerns; the automated framework was most effective against specific anti-patterns.
2. **Expert interpretation of metrics is essential.** The "UnnecessaryConstructor" paradox and the Microsoft finding that LOC increases during refactoring both show that raw numbers mislead without context.
3. **Measurement must be multi-dimensional.** No single metric captures maintainability. Propagation cost, duplication, defect counts, and development time each reveal a different facet.
4. **Small investments yield disproportionate returns.** ABB's 3 hours per week transformed a system; Mozilla's one-time re-design cut coupling by 84%.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
