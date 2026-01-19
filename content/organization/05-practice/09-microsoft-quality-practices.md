---
title: Microsoft Quality Practices
parent: Industry Practices
nav_order: 9
layout: default
---

# Microsoft Quality Practices

Microsoft has documented its quality engineering practices through *How We Test Software at Microsoft* (Page, Johnston, Rollison) and numerous empirical studies. These practices evolved over decades of shipping complex software products to millions of users {% cite page2008mstesting %}.

## Milestone-Based Development

Microsoft organizes development into milestones with progressively stricter quality gates {% cite page2008mstesting %}.

### Milestone Progression

```
M1 → M2 → M3 → Beta → Release → MQ (Quality Milestone)
```

### Exit Criteria by Milestone

| Milestone | Code Coverage | Crash Fixes | Test Requirements |
|-----------|---------------|-------------|-------------------|
| **M2** | 65% | 60% | P1 + P2 tests pass |
| **M3** | 70% | 70% | All tests pass |
| **Final** | **80%** | 100% critical | All tests pass |

Each milestone serves a specific purpose:

| Milestone | Focus |
|-----------|-------|
| M1 | Feature planning, architecture |
| M2 | Core feature implementation |
| M3 | Feature complete, stabilization begins |
| Beta | External validation |
| Release | Ship decision |
| MQ | Post-release quality assessment |

---

## Bug Bars

A **bug bar** is a predefined quality threshold that determines which bugs must be fixed before shipping {% cite page2008mstesting %}.

### Severity Classifications

| Severity | Definition | Ship Decision |
|----------|------------|---------------|
| **Sev 1** | Crash, primary feature unusable, data loss | Always blocks ship |
| **Priority 1-2** | Significant user impact | Must resolve |
| **Must Fix** | Falls below bug bar | Required before ship |
| **Should Fix** | Desirable improvement | May defer to next release |

### Release Blockers

The following always block release:

- Sev 1 bugs or system crashes
- Exit criteria not met
- Security, privacy, or legal issues
- Feature crew gates failed
- Unresolved accessibility violations

### The War Room (Ship Room)

The **War Room** is a ship-quality oversight committee that:

- Reviews the bug backlog ("wave")
- Makes fix/cut/postpone decisions
- Has final authority on ship decision
- Meets regularly during stabilization phase

> "The bug bar is the line that separates 'ship' from 'don't ship' quality."

---

## Testing Roles at Microsoft

Microsoft developed specialized testing roles that evolved alongside their engineering practices {% cite page2008mstesting %} {% cite bosu2015codereview %}.

### Role Structure

| Role | Title | Focus |
|------|-------|-------|
| **SDE** | Software Development Engineer | Feature code |
| **SDET** | Software Dev Engineer in Test | Code to test software |
| **IC** | Individual Contributor Tester | Execute testing discipline |
| **TA** | Test Architect | Long-term quality strategy |

### Key Distinction: SDET vs SDE

SDETs write code, but their code tests the product rather than building features:

| Aspect | SDE | SDET |
|--------|-----|------|
| Primary output | Product features | Test automation, frameworks |
| Success metric | Feature shipped | Bugs found, coverage achieved |
| Skills emphasis | Domain, architecture | Testability, automation |

### Historical Ratios

| Ratio | Value | Context |
|-------|-------|---------|
| Dev:Tester | ~1:1 | Historical (9,000 testers at peak) |
| Current trend | Higher dev:test | More developer-owned testing |

---

## Feature Crews

Microsoft organizes work around small, cross-functional **Feature Crews** {% cite page2008mstesting %}:

### Crew Composition

| Role | Typical Count |
|------|---------------|
| Program Manager | 1 |
| Developers | 3-5 |
| Testers | 3-5 |

### The Leadership Triad

Each feature area has a leadership triad jointly responsible for quality decisions:

- **Program Management Lead** - Requirements, schedule
- **Development Lead** - Architecture, implementation
- **Test Lead** - Quality strategy, test planning

This structure ensures quality is a shared responsibility, not siloed to testers.

---

## Static Analysis at Microsoft

Microsoft integrates static analysis throughout the development process {% cite page2008mstesting %}.

### Tools

| Tool | Target | Focus |
|------|--------|-------|
| **PREfast** | Native code (C/C++) | Memory errors, security |
| **Managed analyzers** | .NET code | Best practices, performance |
| **Security analyzers** | All code | OWASP vulnerabilities |

### Integration Points

| Stage | Action |
|-------|--------|
| IDE | Real-time feedback during coding |
| Pre-commit | Gates in source control |
| Build | Automated analysis in CI |
| Release | Security review gates |

---

## Code Review Research

Microsoft research on code review effectiveness provides guidance for practitioners {% cite bosu2015codereview %}.

### Key Finding: Experience Doubles Effectiveness

Analysis of **1.5 million review comments** across 5 Microsoft projects revealed:

| Factor | Useful Feedback Rate |
|--------|---------------------|
| **Experienced reviewer** (≥5 prior reviews of file) | **65-71%** |
| **First-time reviewer** | **32-37%** |

### Review Effectiveness by File Type

| File Type | Useful Feedback Rate |
|-----------|---------------------|
| Source code files | 70% |
| Config files | 57% |
| Build files | 53% |

### Practical Implications

- Effectiveness plateaus after **5 prior reviews** of a file
- Larger changesets → lower usefulness (shallow reviews)
- Surprisingly: **no difference** between same-team vs. cross-team reviewers

> "Reviewers with prior file experience are nearly 2x more useful." {% cite bosu2015codereview %}

---

## Refactoring Practices

Research on Microsoft refactoring practices reveals practical challenges {% cite kim2014refactoring %}:

### Survey of 328 Engineers

| Aspect | Finding |
|--------|---------|
| Refactoring context | **46%** during bug fixes or feature additions |
| Top triggers | Poor readability (22%), duplication (13%), maintainability (11%) |
| **Primary risk** | **76%** cite subtle bugs and regressions |
| Tool usage | **86% manual**; 51% don't use automated tools |

### The Validation Gap

Developers avoid automated refactoring tools due to trust issues:

> "What we need is a better validation tool that checks correctness of refactoring, not a better refactoring tool." {% cite kim2014refactoring %}

### Refactoring Impact on Dependencies

| Module Category | Dependency Change |
|-----------------|-------------------|
| Top 5% refactored | Decreased by factor of **0.85** |
| Non-refactored | Increased by factor of **1.10** |

Refactoring is preferentially applied to modules with **higher test coverage** (safer to change).

---

## Distributed Development

Microsoft's Windows Vista study provides evidence on distributed team effectiveness {% cite bird2009vista %}:

### Study Scale

- ~3,000 developers
- 3,300+ binaries
- Multiple global sites

### Key Finding: Geography is Negligible

| Finding | Detail |
|---------|--------|
| Initial difference | 8-9% more failures in distributed binaries |
| **After controlling for team size** | Difference becomes **negligible** |

### Success Factors

| Practice | Why It Works |
|----------|--------------|
| Consistent tooling | Same CI/CD, build systems, defect tracking everywhere |
| Strong code ownership | Single developer "owner" per binary |
| Cultural liaisons | Experienced engineers moved between sites |
| Integrated management | Developers at multiple sites report to same manager |

> "Teams that were distributed wrote code that had virtually the same number of post-release failures as those that were collocated." {% cite bird2009vista %}

---

## Key Numbers to Remember

| Metric | Value | Source |
|--------|-------|--------|
| Final coverage target | 80% | MS Test Book |
| M2 coverage | 65% | MS Test Book |
| M3 coverage | 70% | MS Test Book |
| Review experience threshold | 5 prior reviews | Bosu 2015 |
| Experienced reviewer usefulness | 65-71% | Bosu 2015 |
| First-time reviewer usefulness | 32-37% | Bosu 2015 |
| Refactoring risk cited | 76% | Kim 2014 |
| Manual refactoring | 86% | Kim 2014 |

---

## Comparison: Microsoft vs Google

| Aspect | Microsoft | Google |
|--------|-----------|--------|
| **Development model** | Milestone-based | Continuous |
| **Quality gates** | Bug bars, War Room | Error budgets, SLOs |
| **Test org** | Feature Crews (embedded) | Engineering Productivity (centralized) |
| **Coverage target** | 80% (final) | 60% (Test Certified L5) |
| **Review model** | Experienced reviewers | Readability certification |
| **Ship decision** | Committee (War Room) | Automated (error budget) |

Both approaches achieve high quality at scale through different mechanisms suited to their organizational culture.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
