---
title: Inspection
parent: Verification and Validation
has_children: true
nav_order: 3
layout: default
---

# Software Inspection

**Inspection** is the systematic examination of software artifacts by individuals other than the creator, with the goal of detecting defects. It is consistently shown to be the **most cost-effective verification technique**, finding 60-90% of defects at 1/10 to 1/34 the cost of testing {% cite fagan1976design %} {% cite laitenberger2000survey %}.

---

## Why Inspection?

| Benefit | Evidence |
|---------|----------|
| **Early defect detection** | 90% of lifecycle defects found {% cite fagan1976design %} |
| **Cost savings** | 1:10 to 1:34 vs. testing {% cite dodd2003inspection %} |
| **Productivity gain** | 23% improvement {% cite fagan1986advances %} |
| **Knowledge transfer** | Team learns codebase and standards |

---

## Definitions

### INCOSE Definition
> **Inspection** is a verification method that determines performance by examining:
> - Engineering documentation produced during development
> - The item itself using visual means or simple measurements

### Practitioner Definition
> **Inspection** is the systematic scrutiny of development artifacts by individuals other than the creator, aiming to detect non-conformities with standards and uncover defects.

---

## Inspection Techniques (Formality Spectrum)

> *Adapted from K. Wiegers, Peer Reviews in Software (2002) {% cite wiegers2002peer %}*

```mermaid
timeline
    title Inspection Techniques (Most Formal → Least Formal)
    Fagan inspections: Well-defined entry/exit conditions, non-author presentation
    Team review: Formal meeting with stakeholders for comment/approval
    Walkthrough: Designer leads team through product for questions/comments
    Tool-assisted code review: Line-by-line critique with diff, annotations, commenting
    Pair programming: Two developers share writing and reviewing in real-time
    Ad hoc review: Unstructured, spontaneous reviews
```

---

## Key Topics

### [Fagan Inspection Process](fagan-process.md)

The foundational method established by Michael Fagan at IBM (1976):
- Six mandatory steps
- Four defined roles
- Optimal parameters (90-125 NCSS/hr, 2hr max)

### [Reading Techniques](reading-techniques.md)

How inspectors analyze artifacts during preparation:
- Checklist-based
- Scenario-based (+35% defects)
- **Perspective-Based Reading (+21-30%)**

### [Defect Estimation](capture-recapture.md)

Two methods to estimate remaining defects:
- **Fault Injection**: Seed defects, measure detection rate
- **Capture-Recapture**: Lincoln-Petersen formula, 4+ inspectors
- Model selection (Mₕ with Jackknife)

### [Effectiveness Data](effectiveness.md)

Comprehensive cost/benefit evidence:
- Detection rates: 60-90%
- Cost ratios: 1:10 to 1:34 vs. testing
- Industry case studies (HP, IBM, Cisco)

---

## Quick Reference: Optimal Parameters

| Parameter | Recommendation | Source |
|-----------|----------------|--------|
| Team size | 4 people | {% cite fagan1976design %} |
| Meeting duration | Max 2 hours | {% cite fagan1976design %} |
| Inspection rate | 90-125 NCSS/hr | {% cite fagan1976design %} |
| Preparation rate | 100-125 NCSS/hr | {% cite fagan1976design %} |
| Change size (modern) | <100 lines | {% cite sadowski2018codereview %} |
| Review latency (modern) | <4 hours | {% cite sadowski2018codereview %} |

---

## Inspection vs. Testing

| Aspect | Inspection | Testing |
|--------|------------|---------|
| Timing | Earlier (requirements, design, code) | Later (executable code) |
| Finds | Omissions, design issues, style | Runtime failures |
| Cost per defect | 1× | 10-34× |
| Hours per defect | 1.4-1.75 | 6-17 |

{: .highlight }
> Inspection and testing are **complementary** — use both for comprehensive verification.

---

## Evolution: Formal → Lightweight

| Era | Approach | Characteristics |
|-----|----------|-----------------|
| 1976 | Fagan | 4 people, meetings, 6 steps |
| 2000s | Tool-assisted | Async, 1-2 reviewers |
| 2018 | Modern (Google) | 24 lines, <4 hours, 1 reviewer |

The core principles remain: **preparation matters, systematic review finds defects, small chunks work best**.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
