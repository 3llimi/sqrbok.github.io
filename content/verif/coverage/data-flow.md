---
title: Data Flow
parent: Coverage
nav_order: 5
layout: default
---

# Data Flow Coverage

## Overview

**Data flow coverage** focuses on how data values flow through a program—from where variables are defined to where they are used. Unlike control flow coverage (which tracks execution paths), data flow coverage tracks the lifecycle of data.

This approach catches bugs that structural coverage might miss, particularly errors in:
- Variable initialization
- Computation sequences
- Value propagation

---

## Key Concepts

### Definitions and Uses

| Term | Definition | Example |
|------|------------|---------|
| **Definition (def)** | Statement where variable receives a value | `x = 5` |
| **Use (use)** | Statement where variable's value is accessed | `y = x + 1` |
| **C-use** | Computational use (in computation) | `z = x * 2` |
| **P-use** | Predicate use (in condition) | `if (x > 0)` |
| **DU pair** | Definition followed by use with no redefinition | `x = 5; ... y = x + 1` |
| **DU path** | Path from definition to use with no redefinition | Path connecting def and use |

### Definition-Use Pairs

A **DU pair** (d, u) consists of:
1. A **definition** d of variable v
2. A **use** u of variable v
3. A **definition-clear path** from d to u (no redefinition of v along the path)

**Example:**
```python
def calculate(a, b):
    x = a + b        # def of x (line 2)
    if x > 10:       # p-use of x (line 3)
        y = x * 2    # c-use of x (line 4)
    else:
        y = x + 5    # c-use of x (line 6)
    return y
```

DU pairs for variable `x`:
- (line 2, line 3) — def to p-use
- (line 2, line 4) — def to c-use
- (line 2, line 6) — def to c-use

---

## Data Flow Coverage Criteria

Data flow criteria form a hierarchy from weakest to strongest:

### All-Defs Coverage

**Requirement:** For each definition, at least one path to some use is tested.

- Weakest data flow criterion
- May miss bugs where specific def-use combinations fail

### All-Uses Coverage

**Requirement:** For each DU pair, at least one definition-clear path is tested.

- Covers all def-use relationships
- Practical balance between strength and cost
- Most commonly used data flow criterion

### All-DU-Paths Coverage

**Requirement:** For each DU pair, every definition-clear path is tested.

- Strongest data flow criterion
- May be infeasible (exponential paths possible)
- Used for critical code sections

---

## Data Flow vs Control Flow

| Aspect | Control Flow | Data Flow |
|--------|-------------|-----------|
| **Focus** | Execution paths | Variable lifecycles |
| **Catches** | Path-dependent faults | Computation faults |
| **Basis** | CFG structure | Variable definitions/uses |
| **Example criteria** | Branch, Path | All-Uses, All-DU-Paths |
| **Subsumption** | Branch subsumes Statement | All-Uses subsumes All-Defs |

### When to Use Data Flow Coverage

Data flow coverage is particularly valuable when:
- Variables undergo complex transformations
- Multiple definitions may reach the same use
- Initialization errors are a concern
- Code involves significant data manipulation

---

## Coverage Hierarchy

```
All-DU-Paths
    ↓ subsumes
All-Uses
    ↓ subsumes
All-Defs
    ↓ subsumes
All-Branches (control flow)
```

**Key insight**: All-Uses subsumes branch coverage but is more fine-grained about how data moves through the program.

---

## Practical Example

```python
def process(flag, value):
    if flag:
        x = value * 2      # def1: x defined
    else:
        x = value + 10     # def2: x defined

    result = x + 1         # use1: x used (c-use)

    if x > 20:             # use2: x used (p-use)
        result = result * 2

    return result
```

### DU Pairs Analysis

| Definition | Use | Path |
|------------|-----|------|
| def1 (line 3) | use1 (line 7) | flag=True path |
| def1 (line 3) | use2 (line 9) | flag=True path |
| def2 (line 5) | use1 (line 7) | flag=False path |
| def2 (line 5) | use2 (line 9) | flag=False path |

### Test Cases for All-Uses

| Test | flag | value | Covers |
|------|------|-------|--------|
| T1 | True | 15 | def1→use1, def1→use2 |
| T2 | False | 5 | def2→use1, def2→use2 |

**2 tests achieve All-Uses coverage** for variable x.

---

## Empirical Findings

Research by Weyuker {% cite rapps1985dataflow %} and others found:

1. **Cost is manageable**: Stricter data flow criteria are not much harder to satisfy than weaker ones in practice
2. **Catches different faults**: Data flow coverage finds faults that branch coverage misses
3. **Complementary to control flow**: Best results combine both approaches

> "Data flow testing forces the tester to exercise data paths that control flow testing might skip entirely."

---

## Tool Support

Data flow coverage requires more sophisticated analysis than statement/branch coverage:

| Tool | Language | Data Flow Support |
|------|----------|-------------------|
| CodeSonar | C/C++ | Full DU analysis |
| Parasoft | Java/C++ | Data flow testing |
| LDRA | Ada/C | All data flow criteria |
| Research tools | Various | Academic implementations |

**Note**: Commercial tool support is less common than for control flow coverage due to analysis complexity.

---

## Best Practices

1. **Start with All-Uses** — Good balance of strength and cost
2. **Combine with branch coverage** — Data flow finds different faults
3. **Focus on critical variables** — Apply to security/safety-relevant data
4. **Use for regression** — Track DU pair coverage over time
5. **Analyze infeasible pairs** — Understand why some pairs can't be covered

---

## Summary

| Coverage | Requirement | Strength | Use When |
|----------|-------------|----------|----------|
| All-Defs | One use per definition | Weak | Quick check |
| All-Uses | All DU pairs covered | Strong | Recommended default |
| All-DU-Paths | All paths per DU pair | Strongest | Critical code |

**Key takeaway**: Data flow coverage tracks how data values move through programs, catching computation and initialization faults that control flow coverage misses.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
