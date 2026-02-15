---
title: "Revision Questions: Quality Measurement"
parent: Measurement
nav_order: 100
layout: default
---

# L02: Quality Measurement and Metrics — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Measurement Definitions

State **Hubbard's definition** of measurement. Compare it with **Garvin's Transcendent view** of quality.

How does Hubbard's argument ("everything is measurable") challenge the transcendent view ("I know it when I see it")?

---

## Question 2: Resolution, Accuracy, Precision

Define **resolution**, **accuracy**, and **precision** in the context of measurement.

A tool consistently reports cyclomatic complexity as 10, but manual calculation shows 12. Is the tool accurate? Is it precise?

---

## Question 3: Three Measurement Pitfalls

**Case:** A company mandates 80% code coverage for all releases. After 6 months, coverage is 85% but production defects have not decreased. Developers complain about "writing tests just to hit the number."

Using Hoffman's three dangers (bad statistics, bad decisions, bad incentives), analyze what went wrong in this scenario.

---

## Question 4: McNamara Fallacy and Streetlight Effect

**Case:** A manager evaluates developer performance using: commits/week, LOC added, and bugs closed. Developer A scores high on all metrics. Developer B scores lower but mentors juniors, improves architecture, and reduces technical debt. Developer A gets promoted.

Which fallacy (McNamara or Streetlight) applies here? Could both apply?

---

## Question 5: Measurement Scales (NOIR)

Explain Stevens' four measurement scales: Nominal, Ordinal, Interval, and Ratio.

For each scale give a software metric example.

---

## Question 6: Mean vs Median

When should you use **mean** vs **median** for software metrics?

If 9 bugs take 1 hour each and 1 bug takes 100 hours, calculate both and explain which better represents "typical" bug fix time.

---

## Question 7: Confounding Variables

What is a **confounding variable**? Why is it important in metrics research?

El Emam et al. (2001) found that class size confounds OO metrics. Explain this finding and its implications.

---

## Question 8: GQM Framework

Apply Basili's **Goal-Question-Metric (GQM)**to define metrics for the goal: "Improve maintainability of the codebase."

---

## Question 9: Maintainability Index

Explain the **Maintainability Index (MI)** formula and its components.

What does MI = 171 − 5.2×ln(HV) − 0.23×CC − 16.2×ln(LOC) tell us? What are its limitations?

---

## Question 10: Chidamber-Kemerer OO Metrics

List **five** CK OO metrics (1994) and explain what each measures.

For each metric, state what a high value indicates about the class.

---

## Question 11: Operational Definitions

Park (1992) defines two criteria for operational definitions: **communication** and **repeatability**.

Team A reports 15 defects/KLOC, Team B reports 8 defects/KLOC. Before concluding Team B has better quality, what operational definition questions must you ask? (Consider: what counts as a defect? when is it counted? what's included in KLOC?)

---

## Question 12: From Quality Models to Metrics

Explain the hierarchy: Characteristic → Sub-characteristic → Measure (using ISO 25010/25023).

Give an example showing how "Maintainability" leads to a specific measurable metric.

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Measurement definitions | Q1, Q2 |
| Measurement pitfalls | Q3, Q4 |
| Measurement scales (NOIR) | Q5, Q6 |
| Statistical concepts | Q6, Q7 |
| GQM framework | Q8 |
| Code metrics (MI, CK) | Q9, Q10 |
| Operational definitions | Q11 |
| Quality models & metrics | Q12 |