---
title: "Revision Questions: Process Improvement"
parent: Process Improvement
nav_order: 100
layout: default
---

# Revision Questions: Process Improvement

## Purpose

Revision questions and exam preparation materials for the Process Improvement lecture. Use alongside the [Study Notes: Process Improvement](SN-A2-Proc.md) for exam preparation.

---

## Part 1: Why Process Improvement?

### Practice Questions

1. What is the "credibility gap" in software organizations according to Humphrey?
2. Explain the One-Eighth Rule and its three filters.
3. How did organizational culture contribute to the Columbia disaster?
4. Why do quick fixes fail to solve recurring quality problems?
5. What percentage of organizations successfully implement SPI? Why is this number so low?

---

## Part 2: Learning Models

### Practice Questions

1. Explain the difference between single-loop and double-loop learning with an example.
2. Apply the PDCA cycle to a scenario of reducing bug escape rate.
3. What are the four principles of Kaizen?
4. Describe the "worse-before-better" dynamic. Why do organizations fall into the capability trap?
5. How does DevOps embody Kaizen principles?

---

## Part 3: Improvement Methods

### Practice Questions

1. What are the four components of IBM's Defect Prevention Process?
2. Apply the Five Focusing Steps to a scenario where testing is the bottleneck.
3. Explain the DMAIC cycle phases.
4. What is the target defect rate for Six Sigma?
5. Compare DPP and Agile retrospectives.

---

## Part 4: CMMI Framework

### Practice Questions

1. What are the five maturity levels of CMMI? Describe each briefly.
2. What is the key difference between Level 1 and Level 2?
3. List all Level 2 Process Areas with their abbreviations.
4. What are the four Process Area categories in CMMI?
5. How do Generic Goals ensure process sustainability?
6. Explain the key transition from Level 3 to Level 4.
7. Why can CMMI and Agile work together?
8. What quantitative results has CMMI adoption shown?
9. Which Process Areas belong to Level 5?
10. What changed between CMMI v1.3 and v2.0?

---

## Part 5: Change Management

### Practice Questions

1. Explain the One-Eighth Rule and its three filters in detail.
2. What is the "capability trap" and how do organizations fall into it?
3. Compare operational changes vs. cultural changes in process improvement.
4. Why does "Working Smarter" often lead to worse performance before better?
5. What are the top 3 critical success factors for SPI based on research?

---

## Key Numbers to Memorize

| Metric | Value | Source |
|--------|-------|--------|
| One-Eighth Rule | **12.5%** succeed | Pfeffer 1998 |
| DPP defect reduction | **54-60%** | Mays 1990 |
| DPP resource cost | **0.5%** of project | Mays 1990 |
| Six Sigma target | **3.4 defects/million** | Motorola |
| CMMI rework reduction | **70%** | CMMI Institute |
| CMMI on-time delivery | **97%** | CMMI Institute |
| CMMI estimation accuracy | **+17%** | CMMI Institute |
| Employee resistance barrier | **42%** | Shelat 2025 |
| CMMI Level 2 Process Areas | **7** | CMMI-DEV v1.3 |
| CMMI Level 3 Process Areas | **11** | CMMI-DEV v1.3 |
| CMMI Total Process Areas | **22** | CMMI-DEV v1.3 |

---

## Key Terms Glossary

| Term | Definition |
|------|------------|
| **Single-Loop Learning** | Fix errors while continuing same strategy |
| **Double-Loop Learning** | Modify strategy based on error analysis |
| **PDCA** | Plan-Do-Check-Act continuous improvement cycle |
| **Kaizen** | Japanese philosophy of continuous small improvements |
| **Capability Trap** | Reverting to "Working Harder" prevents long-term improvement |
| **DPP** | Defect Prevention Process (IBM) |
| **ToC** | Theory of Constraints (bottleneck focus) |
| **DMAIC** | Define-Measure-Analyze-Improve-Control (Six Sigma) |
| **CTQ** | Critical To Quality (Six Sigma customer requirements) |
| **Process Area** | CMMI grouping of related practices |
| **Maturity Level** | CMMI organizational capability stage (1-5) |

---

## Quick Comparison Tables

### Learning Approaches

| Approach | Focus | Response |
|----------|-------|----------|
| Single-Loop | Fix error | "Someone screwed up" |
| Double-Loop | Fix system | "The system is failing" |

### Improvement Methods

| Method | Focus | Tool | Best For |
|--------|-------|------|----------|
| DPP | Prevention | Causal analysis | Recurring defects |
| ToC | Bottlenecks | 5 Focusing Steps | Performance limits |
| Six Sigma | Variation | DMAIC | Inconsistency |
| Retrospectives | Team effectiveness | Structured reflection | Regular improvement |

### CMMI Levels

| Level | Name | Key Characteristic | Key Phrase |
|-------|------|-------------------|------------|
| 1 | Initial | Chaotic, heroics-dependent | "Heroics and chaos" |
| 2 | Managed | Project control, retained under stress | "Retained under stress" |
| 3 | Defined | Organization-wide standards | "Standards and consistency" |
| 4 | Quantitatively Managed | Statistical decisions | "Fact-based decisions" |
| 5 | Optimizing | Continuous improvement | "Incremental & innovative" |

### CMMI Level Transitions

| Transition | What Changes |
|------------|--------------|
| 1 → 2 | From chaos to project discipline |
| 2 → 3 | From project-specific to organization-wide |
| 3 → 4 | From qualitative to quantitative |
| 4 → 5 | From control to continuous improvement |

### CMMI Process Areas Count

- Level 2: 7 PAs (REQM, PP, PMC, SAM, MA, PPQA, CM)
- Level 3: 11 PAs (RD, TS, PI, VER, VAL, OPF, OPD, OT, IPM, RSKM, DAR)
- Level 4: 2 PAs (OPP, QPM)
- Level 5: 2 PAs (OID, CAR)
- **Total: 22 Process Areas**

---

## Sample Exam Questions with Model Answers

### Question 1
*A software team consistently delivers projects late. Management responds by requiring overtime. Three months later, two key developers quit and projects are even later. Using the concepts from this lecture, explain what went wrong and what should have been done instead.*

**Model Answer:**
- Management chose "Working Harder" instead of "Working Smarter"
- This created a capability trap: overtime led to burnout, turnover, and capability erosion
- Double-loop learning was needed: analyze WHY projects are late (estimation? scope creep? testing bottleneck?)
- Should have tolerated the "worse-before-better" dip to invest in process improvement
- Reference: Repenning & Sterman (2001) capability dynamics

---

### Question 2
*Explain why only 12.5% of organizations successfully implement process improvement, using Pfeffer's One-Eighth Rule.*

**Model Answer:**
Three filters reduce success rate:
1. **Belief filter (50%):** Only half believe the evidence connecting practices to results
2. **Systemic filter (50%):** Only half try comprehensive change vs. isolated fixes
3. **Persistence filter (50%):** Only half persist through the "worse-before-better" phase

Result: 50% × 50% × 50% = 12.5% succeed

---

### Question 3
*A code review queue has become a bottleneck. Apply the Theory of Constraints Five Focusing Steps to solve this problem.*

**Model Answer:**
1. **Identify:** Code review is the constraint (PRs waiting 3+ days)
2. **Exploit:** Prioritize critical path reviews, batch small changes
3. **Subordinate:** Developers submit smaller PRs, limit WIP
4. **Elevate:** Train more reviewers, add automated linting
5. **Repeat:** If testing becomes the new bottleneck, start over

---

### Question 4
*What is the difference between Level 1 and Level 2 in CMMI?*

**Model Answer:**
- **Level 1 (Initial):** Processes are ad hoc; success depends on individual heroics; processes abandoned under stress; cannot repeat successes
- **Level 2 (Managed):** Project-level process control; practices are planned, performed, and measured; **key difference: practices are retained during stress**; work is visible at milestones

---

### Question 5
*Why is management commitment ranked as the #1 critical success factor for SPI?*

**Model Answer:**
- Resources allocation depends on management support
- Without champions, improvement time is lost to "firefighting"
- Managers must model desired behaviors
- Cultural change requires visible leadership commitment
- Research consistently shows this as #1 factor across ITIL, Six Sigma, and Lean studies

---

### Question 6
*List all Level 2 CMMI Process Areas and explain why "practices retained under stress" is the key differentiator from Level 1.*

**Model Answer:**
Level 2 Process Areas (7 total):
1. **REQM** - Requirements Management
2. **PP** - Project Planning
3. **PMC** - Project Monitoring and Control
4. **SAM** - Supplier Agreement Management
5. **MA** - Measurement and Analysis
6. **PPQA** - Process and Product Quality Assurance
7. **CM** - Configuration Management

"Practices retained under stress" is the key differentiator because:
- Level 1 organizations abandon processes when facing pressure (deadlines, budget constraints)
- Level 2 organizations maintain discipline even during crises
- This means Level 2 can reproduce past successes while Level 1 cannot
- The difference is not in having processes, but in **following them consistently**

---

### Question 7
*An organization wants to move from CMMI Level 3 to Level 4. What is the key transition and which Process Areas must be implemented?*

**Model Answer:**
**Key Transition:** From qualitative to quantitative management
- Level 3 uses defined processes with qualitative assessment
- Level 4 requires statistical process control and fact-based decision making

**New Process Areas at Level 4:**
1. **OPP** (Organizational Process Performance) - Establish and maintain organizational process performance baselines
2. **QPM** (Quantitative Project Management) - Quantitatively manage the project to achieve quality and process performance objectives

**What Changes:**
- Decisions must be based on statistical data, not just expert judgment
- Process performance baselines established and maintained
- Special causes of variation identified and addressed
- Quality measures incorporated into decision-making repository

---

*For detailed explanations, see [Study Notes: Process Improvement](SN-A2-Proc.md)*
