---
title: Inspection Effectiveness
parent: Inspection
nav_order: 4
layout: default
---

# Inspection Effectiveness Data

Software inspection is consistently shown to be the **most cost-effective defect removal technique**, with detection rates of 60-90% and cost ratios of 1:10 to 1:34 compared to testing {% cite laitenberger2000survey %} {% cite dodd2003inspection %}.

---

## Defect Detection Rates

### Summary Across Studies

| Source | Detection Rate | Context |
|--------|----------------|---------|
| Fagan 1976 (IBM) | **90%** of lifecycle defects | Formal inspection |
| Fagan 1986 (IBM RESPOND) | **93%** | Mature process |
| Laitenberger 2000 survey | **60-90%** | Industry average |
| Dodd 2003 | 57% most likely (19-84% range) | Code inspections |
| Aurum 2002 | 60-90% | 25-year synthesis |

{: .highlight }
> "Inspections are reported to find 60% to 90% of all defects" {% cite laitenberger2000survey %}

### Design vs. Code Inspections

| Type | Minimum | Most Likely | Maximum |
|------|---------|-------------|---------|
| **Design** | 25% | 57% | 84% |
| **Code** | 19% | 57% | 70% |

Source: {% cite dodd2003inspection %}

---

## Cost-Effectiveness

### Cost Ratios: Inspection vs. Testing

| Source | Ratio (Inspection : Testing) |
|--------|------------------------------|
| JPL | **1:10 to 1:34** |
| IBM Santa Teresa | **1:20** |
| Laitenberger 2000 | 1:10 to 1:34 |

> "The ratio of the cost of fixing a defect during inspection compared to formal testing ranges from 1:10 to 1:34" {% cite dodd2003inspection %}

### Cost Ratios: Development vs. Production

| Timing | Cost Multiplier | Source |
|--------|-----------------|--------|
| During review | 1× | Baseline |
| During testing | **8-12×** | {% cite cohen2006secrets %} |
| In production | **30-100×** | {% cite cohen2006secrets %} |

---

## Effort per Defect

### Inspection vs. Testing

| Method | Hours per Defect | Source |
|--------|------------------|--------|
| Design inspection | 1.4-1.75 | {% cite laitenberger2000survey %} {% cite dodd2003inspection %} |
| Code inspection | 1.46-1.58 | {% cite dodd2003inspection %} |
| **Testing** | **6.0-17.0** | {% cite laitenberger2000survey %} {% cite dodd2003inspection %} |

{: .important }
> Inspection finds defects **4-10× faster** than testing.

### Savings Calculation

| Metric | Design | Code |
|--------|--------|------|
| Defect cost savings vs. testing | **44%** | **39%** |

Source: {% cite laitenberger2000survey %}

---

## Industry ROI Case Studies

### Hewlett-Packard

| Metric | Value |
|--------|-------|
| ROI | **10:1** |
| Annual savings | **$21.4 million** |
| Source | {% cite dodd2003inspection %} |

### IBM

| Metric | Value |
|--------|-------|
| Productivity gain | **23%** net increase |
| Cost reduction | **9%** vs walkthroughs |
| Defects (1976-1984) | **Reduced by 2/3** while doubling LOC |

Source: {% cite fagan1976design %} {% cite fagan1986advances %}

### Standard Bank of South Africa

| Metric | Value |
|--------|-------|
| Maintenance cost reduction | **95%** |
| Final quality | **0.15 defects/KLOC** |

Source: {% cite fagan1986advances %}

### AETNA Insurance

| Metric | Value |
|--------|-------|
| Development resource reduction | **25%** |
| Defects found via inspection | **82%** |

Source: {% cite fagan1986advances %}

### Cisco Systems

| Metric | Value |
|--------|-------|
| Support calls (before) | 50,000/year |
| Support calls (after) | 20,000/year |
| **Savings** | **$2.6 million** |

Source: {% cite cohen2006secrets %}

---

## Inspection vs. Walkthrough

| Metric | Inspection | Walkthrough |
|--------|------------|-------------|
| Defects/KLOC (telecom study) | **16-20** | 3 |
| Defects/KLOC (Ford Motor) | **50% more** | Baseline |
| Defects/hour (industry study) | 1.5× | Baseline |
| Productivity (IBM Federal) | 2× | Baseline |

Source: {% cite wiegers2002peer %}

{: .highlight }
> "Inspections detected 16 to 20 defects per kLOC, while informal reviews found only 3 per kLOC" {% cite wiegers2002peer %}

---

## Modern Code Review Metrics

### Google (Sadowski 2018)

| Metric | Value |
|--------|-------|
| Median review latency | **< 4 hours** |
| Median change size | **24 lines** |
| Median reviewers | **1** |
| Changes needing ≤1 iteration | >80% |
| Developer time on review | 3.2 hours/week |

Source: {% cite sadowski2018codereview %}

### Microsoft (Bosu 2015)

| Metric | Value |
|--------|-------|
| Comments marked useful | **65.5%** |
| Experienced reviewer usefulness | 65-71% |
| First-time reviewer usefulness | 32-37% |

Source: {% cite bosu2015codereview %}

### Code Review Coverage Impact (McIntosh 2015)

| Finding | Impact |
|---------|--------|
| Review coverage | Negatively associated with post-release defects |
| Reviews without discussion | **More defect-prone** |
| Hasty reviews (>200 LOC/hr) | Higher post-release defects |

> "Participation quality matters more than coverage" {% cite mcintosh2015codereview %}

---

## Total Cost of Inspection

| Category | Percentage of Project |
|----------|----------------------|
| Design + code inspections | **~15%** |

Source: {% cite fagan1986advances %}

{: .important }
> 15% investment yields 60-90% defect detection and 10-34× cost savings vs. later discovery.

---

## Summary: The Business Case

| Metric | Typical Value |
|--------|---------------|
| Detection rate | 60-90% |
| Cost ratio vs. testing | 1:10 to 1:34 |
| Cost ratio vs. production | 1:30 to 1:100 |
| Hours per defect | 1.4-1.75 (vs 6-17 for testing) |
| ROI | 10:1 (HP example) |
| Productivity impact | +23% (IBM) |

**Bottom line:** Inspection is the most cost-effective quality technique available. Organizations that skip inspection pay 10-100× more to find the same defects later.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
