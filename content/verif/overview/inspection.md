---
parent: Overview
nav_order: 2
title: Inspection
layout: default
---

# Inspection

{: .important }
> For comprehensive coverage of software inspection, see the dedicated **[Inspection section](../inspection/)**.

## Overview

**Inspection** is the systematic scrutiny of development artifacts (code, design documents) by individuals other than the creator. It is consistently shown to be the **most cost-effective defect removal technique**, with detection rates of 60-90% {% cite laitenberger2000survey %}.

### Key Benefits

| Benefit | Evidence |
|---------|----------|
| Early defect detection | 90% of lifecycle defects found (IBM) |
| Cost-effectiveness | 1:10 to 1:34 cost ratio vs. testing |
| ROI | 10:1 (HP), $21.4M annual savings |

---

## Detailed Topics

The [Inspection section](../inspection/) covers:

| Topic | Description |
|-------|-------------|
| [Fagan Inspection Process](../inspection/fagan-process.md) | The 6-step formal process and 4 roles |
| [Reading Techniques](../inspection/reading-techniques.md) | PBR, checklist, and scenario-based approaches |
| [Capture-Recapture Method](../inspection/capture-recapture.md) | Statistical defect estimation |
| [Effectiveness Data](../inspection/effectiveness.md) | Cost/benefit synthesis across studies |

---

## Technique Family

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

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
