---
title: Technical Debt
parent: Cost of Quality
nav_order: 6
layout: default
---

# Technical Debt Quantification

Technical Debt (TD) Quantification is a critical aspect of software quality management that translates technical inefficiencies into measurable effort and business risk {% cite amanatidis2020td %} {% cite bhatia2023satd %}. Current research highlights significant challenges in how debt is identified by automated tools versus how it is admitted by developers in specialized domains like Machine Learning.

## What is Technical Debt?

**Technical Debt** is a metaphor introduced by Ward Cunningham that compares sub-optimal code or design decisions to financial debt. When developers take shortcuts—whether intentionally for speed or unintentionally due to evolving requirements—they incur "debt" that must eventually be repaid through refactoring or rewriting. Like financial debt, TD accrues "interest" over time: the longer it remains, the more costly it becomes to maintain or extend the affected code.

| Aspect | Financial Debt Analogy |
|--------|------------------------|
| **Principal** | Initial shortcut or compromise |
| **Interest** | Ongoing maintenance overhead |
| **Repayment** | Refactoring or rewriting |
| **Default** | System becomes unmaintainable |

## The TD Tool Agreement Problem

A major study by Amanatidis et al. (2020) evaluated the consistency of three leading TD assessment tools across 50 open-source projects {% cite amanatidis2020td %}:

### Study Parameters

| Parameter | Value |
|-----------|-------|
| Tools evaluated | CAST Highlight, Squore, SonarQube |
| Projects analyzed | 50 (25 Java, 25 JavaScript) |
| Research question | Do tools agree on which code is problematic? |

### Kendall's W Agreement Scores

| Language | Agreement (W) | Interpretation |
|----------|---------------|----------------|
| **Java** | **0.777** | Strong agreement |
| **JavaScript** | 0.647 | Moderate agreement |

Java tools showed stronger agreement, likely due to more mature static analysis standards.

### Validated High-TD Subset

The most striking finding was the lack of unanimity on which specific classes were problematic:

| Language | Classes Flagged "High TD" by ALL Tools |
|----------|----------------------------------------|
| Java | **3.2%** |
| JavaScript | **15.0%** |

**Implication:** 70–85% of classes flagged by any single tool are NOT validated by all tools—potential wasted remediation effort.

### Archetypal TD Profiles

| Profile Type | Description |
|--------------|-------------|
| **Max-Rulers** | All tools agree on high debt |
| **Rebels** | Only one tool identifies high debt |
| **Moderates** | Tools show mixed assessments |

## Self-Admitted Technical Debt (SATD) in ML Software

Bhatia et al. (2023) studied technical debt in Machine Learning software, which is distinct from traditional software due to its stochastic nature and heavy reliance on data {% cite bhatia2023satd %}:

### ML vs. Non-ML Prevalence

| Metric | ML Projects | Non-ML Projects | Ratio |
|--------|-------------|-----------------|-------|
| Median SATD % | **1.87%** | 0.92% | **2× higher** |

### New ML-Specific TD Categories

Traditional taxonomies miss two important debt types in ML systems:

| Category | % of ML TD | Description |
|----------|------------|-------------|
| **Configuration Debt** | 12% | Sub-optimal hyperparameters, hardcoded settings |
| **Inadequate Testing Debt** | 5% | Missing tests for ML components |

### TD by ML Pipeline Stage

| Stage | % of SATD | Notes |
|-------|-----------|-------|
| **Model Building** | **29.0%** | Primary "hotspot" due to experimentation |
| **Data Preprocessing** | 24.7% | Second highest accumulation |
| Data Reading | 8.6% | — |
| Model Deployment | 7.5% | — |
| **Model Validation** | 4.0% | **Lowest** accumulation |

### Survival Dynamics

| Metric | ML Projects | Non-ML Projects |
|--------|-------------|-----------------|
| Introduction timing | **140× earlier** (median 10 days) | Later in lifecycle |
| Removal speed | **3.7× faster** | Slower remediation |

This reflects the high-velocity, iterative nature of ML development.

## Multi-Tool Consensus vs. Single-Tool Metrics

Relying on a single tool for TD measurement can be misleading because each tool tests against a unique ruleset {% cite amanatidis2020td %}:

### Why Single Tools Mislead

| Tool | Primary Focus |
|------|---------------|
| CAST Highlight | Cyclomatic complexity, coupling |
| SonarQube | Code smells, duplications |
| Squore | Technical rules, maintainability |

### The Tool Disagreement Tax

| Risk | Description |
|------|-------------|
| **False positives** | Wasting effort on classes only one tool finds problematic |
| **False negatives** | Missing debt that a different ruleset would catch |

### Consensus Advantage

A multi-tool approach identifies the "Validated High-TD" subset. **Remediation ROI is maximized** when focusing on modules with cross-tool agreement—high confidence they represent genuine structural issues rather than tool-specific subjective findings.

## Practical Recommendations

### For Traditional Software

| Recommendation | Rationale |
|----------------|-----------|
| **Prioritize consensus** | Focus on "Max-Ruler" archetype modules |
| **Align with churn** | Schedule refactoring after high-churn phases |
| **Don't ignore simple files** | Low-complexity files often harbor lingering TD |

### For ML Projects

| Recommendation | Implementation |
|----------------|----------------|
| **Configuration management** | Version-control hyperparameters (YAML/JSON) |
| **Use MLflow or similar** | Track experimental settings |
| **Focus on Model Building** | Primary hotspot for TD accumulation |
| **Test ML components** | Explicit tests for feature extraction, training |

### For Quality Managers

| Practice | Expected Benefit |
|----------|------------------|
| Multi-tool assessment | Reduces false positives/negatives |
| Domain-specific metrics | Better business alignment |
| Periodic TD audits | Prevents accumulation |

## Economic Translation

### Single-Tool vs. Multi-Tool ROI

| Approach | Remediation Target | Confidence |
|----------|-------------------|------------|
| Single tool | 100% of flagged code | Low (many false positives) |
| **Multi-tool consensus** | 3–15% validated High-TD | **High** |

### Cost of Ignored TD

| State | Cost Multiplier |
|-------|-----------------|
| Addressed early | 1× |
| Accumulated over time | 10–100× |
| In production incidents | **Unbounded** |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
