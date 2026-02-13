---
title: Coverage
parent: Verification and Validation
nav_order: 2
layout: default
has_children: true
---

# Test Coverage Criteria

How do you know when you've tested enough? Coverage criteria provide objective measures of test completeness by defining what portions of the software must be exercised by tests.

---

## What is Test Coverage?

**Test coverage** measures the degree to which source code, requirements, or design specifications are exercised by a test suite. It answers questions like:
- Which parts of the code have been executed?
- Which branches and paths have been taken?
- Which requirements have been verified?

Coverage serves two purposes:
1. **Generator** — create test cases by targeting untested elements
2. **Measure** — evaluate existing tests by computing what percentage of a criterion is covered

**Key insight**: High coverage doesn't guarantee quality, but low coverage almost certainly indicates insufficient testing.

---

## Topics in This Section

{: .note }
**Suggested reading order:** Terminology → Code Coverage → Basis Path → Conditions → Data Flow → Mutation → Discussion

### [Terminology](terminology.md)
Fundamental definitions: statements, basic blocks, decisions, branches, conditions, and control-flow graphs.

### [Code Coverage](code.md)
Basic structural coverage: **statement coverage**, **branch coverage**, and **all-path coverage** with worked examples.

### [Basis Path Testing](basis.md)
Cyclomatic complexity-based testing: calculating V(G), deriving independent paths, McCabe's method with 3 worked examples.

### [Condition Coverage](conditions.md)
Fine-grained condition testing: **multiple condition coverage** and **MC/DC** for safety-critical systems (DO-178C).

### [Data Flow Coverage](data-flow.md)
Variable lifecycle testing: **Definition-Use pairs**, All-Defs, All-Uses, and All-DU-Paths criteria.

### [Mutation Testing](mutation.md)
Measuring test effectiveness: creating mutants, mutation operators, mutation score, equivalent mutants.

### [Discussion: Coverage vs. Quality](discussion.md)
Research evidence on coverage limitations, anti-patterns, practical guidelines, and tool support.

---

## Coverage Hierarchy

Coverage criteria form a hierarchy based on **subsumption** — if criterion A subsumes B, then satisfying A automatically satisfies B:

```
All Paths
    ↓ subsumes
Basis Path / All-DU-Paths / MC/DC
    ↓ subsumes
Branch Coverage / All-Uses
    ↓ subsumes
Statement Coverage / All-Defs
```

{: .warning }
**Subsumption ≠ better fault detection.** If C1 subsumes C2, a test suite satisfying C1 also satisfies C2. However, a *specific* test suite for C2 can detect faults that a *specific* suite for C1 misses — because fault detection depends on the actual test values, not just the criterion {% cite ammann2016introduction %}.

### Selecting Criteria

The right criterion depends on:
- **Purpose** of the testing activity
- **Source code** availability and relevance
- **Targeted faults** (underlying fault model)
- **Compliance** requirements (e.g., DO-178C mandates MC/DC)

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
