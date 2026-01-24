---
title: Cost of Quality
parent: Organizing Quality
nav_order: 1
layout: default
has_children: true
---

# Cost of Quality

The Cost of Software Quality (CoSQ) provides a financial framework for translating technical quality metrics into business vocabulary that executives can use for data-driven decision-making.

---

## Why Cost of Quality?

Quality has costs, but so does poor quality. Understanding these costs enables:

- **Investment justification** - Make the business case for quality initiatives
- **Trade-off analysis** - Balance prevention vs. detection vs. failure costs
- **Resource allocation** - Invest where it has the greatest impact
- **Executive communication** - Speak the language of business

---

## Topics in This Section

### [CoSQ Foundations](01-cosq-foundations.md)
The traditional cost model (prevention, appraisal, internal failure, external failure) and economic justification.

### [Defect Injection & Removal](02-defect-injection-removal.md)
Where defects come from, how they're removed, and the "tank and pipes" model.

### [Defect Classification](03-defect-classification.md)
Orthogonal Defect Classification (ODC), HP's model, and practical classification schemes.

### [Quality Economics in DevOps](04-quality-economics-devops.md)
Shift-left economics, flaky test costs, and quality in continuous delivery environments.

### [Code Review ROI](05-code-review-roi.md)
The return on investment of code review practices and what makes reviews effective.

### [Technical Debt](06-technical-debt.md)
Quantifying, tracking, and managing technical debt as a quality cost.

### [Defect Prediction with ML](07-defect-prediction-ml.md)
Machine learning approaches to predicting defect-prone modules.

---

## Study Materials

### [Study Notes](SN-A1-CoSQ.md)
Comprehensive study notes covering all CoSQ concepts for exam preparation.

### [Revision Questions](RQ-A1-CoSQ.md)
Self-assessment questions to test your understanding of Cost of Quality concepts.

---

## The Cost of Quality Model

| Category | Type | Examples |
|----------|------|----------|
| **Conformance** | Prevention | Training, reviews, tools, process improvement |
| | Appraisal | Testing, inspections, audits |
| **Nonconformance** | Internal Failure | Rework, retesting, debugging |
| | External Failure | Support, patches, reputation damage |

**Key insight**: Investing in prevention and appraisal reduces total cost by avoiding expensive failures.

---

## Key Principles

1. **The 1:10:100 rule** - Defects cost 10x more at each subsequent phase
2. **Prevention over detection** - It's cheaper to prevent than to find and fix
3. **Measure to manage** - Track quality costs to optimize investment
4. **External failure is most expensive** - Defects found by customers have hidden costs

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
