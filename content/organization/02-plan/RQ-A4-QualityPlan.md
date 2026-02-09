---
title: "Revision Questions: Quality Planning"
parent: Quality Planning
nav_order: 100
layout: default
---

# Quality Planning — Revision Questions

**Purpose:** Self-study and exam preparation
**Format:** Explain in your own words, give brief examples

---

## Question 1: Quality as an Afterthought

Wallace and Fujii (1989) found that only 10% of test plan topics were actually addressed in surveyed projects.

Explain why quality activities are often skipped. What pressures cause teams to deprioritize testing? How does Google's approach (Test Certified from Day 1) prevent this problem?

---

## Question 2: The 11 Decisions Framework

A complete quality plan must address 11 decisions grouped into WHAT, WHEN, WHO, and HOW.

List and briefly explain at least 8 of the 11 decisions. For a student project (SQR), which decisions are most critical to address?

---

## Question 3: Quality Assurance vs Quality Control

Quality management includes both QA and QC activities.

Explain the fundamental difference between Quality Assurance and Quality Control. Give one example of each. Why do you need both?

---

## Question 4: Criticality Levels

DO-178B defines 5 criticality levels (A-E) for avionic software, while ISO 26262 uses ASIL (A-D plus QM).

Explain what determines a system's criticality level. If you're building a web app (Level E/QM) vs. airplane software (Level A), how would your coverage requirements differ?

---

## Question 5: Microsoft Coverage by Milestone

Microsoft targets 65% coverage at M2, 75% at M3, and 80% at Release.

Why do coverage targets increase toward release rather than staying constant? What does each milestone focus on?

---

## Question 6: Quality Gates Entry/Exit Criteria

Quality gates have entry criteria (before starting) and exit criteria (before proceeding).

For a "Code Review" gate, list at least 2 entry criteria and 2 exit criteria. What are the possible decisions (Pass, Conditional, Fail, Suspend) and when would each apply?

---

## Question 7: Google's Three-Stage Gates

Google uses Pre-submit, Post-submit, and Release gates.

Describe what happens at each gate. What checks are automated vs. manual? Why is the 80% incremental coverage requirement important at pre-submit?

---

## Question 8: Test Process Maturity (TMMi)

TMMi defines 5 maturity levels from Initial to Optimization.

Describe levels 1, 2, and 3. For a student project, what is a realistic target level? What distinguishes a Level 2 team from a Level 3 team?

---

## Question 9: Google Test Certified Levels

Google's Test Certified program has 5 levels (L1-L5).

Compare Level 1 requirements with Level 3 requirements. If your team currently has no CI, what steps would you take to reach Level 2?

---

## Question 10: The RACI Matrix

A RACI matrix assigns Responsible, Accountable, Consulted, and Informed roles.

For unit testing in a typical team, who should be R (Responsible)? Why does Google say "You build it, you break it"? Create a RACI row for "Release decision."

---

## Question 11: IEEE 829 and the "Addressed" Principle

IEEE 829 states that every topic must be formally addressed: include, record in tool, or exclude with rationale.

Why is it important to never leave topics blank? Give an example of a section you might "exclude with rationale" for a small project.

---

## Question 12: Test Effort Estimation

Tester-to-developer ratios vary from 1:5 to 5:1 across industries. Microsoft uses 1:1.

What factors explain these differences? If testing is typically 30% of total development effort, how would you sanity-check your test estimate for a 100 function-point project?

---

## Question 13: The Agile Trust Problem

Koopman (2010) argues that Agile's "trust picture" creates quality risks.

What are Koopman's three evaluative questions for Agile teams? Why does he argue that even Agile teams need independent quality verification?

---

## Question 14: Lightweight Test Plan

A one-page test plan can address all 11 decisions with just 6 sections: Scope, Approach, Gates, Roles, Schedule, Risks.

Create a lightweight test plan outline for your SQR project. Include at least one concrete example for each section.

---

## Question 15: CI Dashboard Metrics

A study identified 39 information needs in CI/CD, with "test suite ownership" as the most important.

Why is knowing who owns each test suite critical? What happens when ownership is unclear and tests start failing?

---

## Question 16: Defect Triage and Bug Bar

During a sprint, your team discovers 5 bugs: 1 causes data loss, 2 have workarounds, and 2 are cosmetic issues.

Classify each bug as P1/P2/P3-P4. If your bug bar is "0 P1s, ≤3 P2s allowed for release," which bugs must be fixed before release? Who should make the triage decision?

---

## Question 17: Defense in Depth

The V&V technique selection matrix shows that different techniques suit different quality characteristics (Functionality, Reliability, Usability, Maintainability, Security).

Which technique is strongest for Maintainability? Which for Usability? Explain why no single technique catches all defects and why combining methods is necessary.

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Quality planning rationale | Q1, Q3 |
| 11 decisions framework | Q2, Q17 |
| Criticality & coverage | Q4, Q5 |
| Quality gates | Q6, Q7, Q16 |
| Process maturity & organization | Q8, Q9, Q10 |
| Documentation (IEEE 829) | Q11 |
| Test effort estimation | Q12 |
| Agile & quality | Q13 |
| Practical application | Q14 |
| Metrics & dashboards | Q15 |
| Defect triage & bug bar | Q16 |
| V&V technique selection | Q17 |
