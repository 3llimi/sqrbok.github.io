---
title: Foundations
parent: Combinatorial Testing
nav_order: 1
layout: default
---

# Theory & Foundations

Combinatorial testing has deep roots in experimental design. Understanding the mathematical foundations — covering arrays, orthogonal arrays, and growth properties — helps practitioners choose the right strategy and interpret tool output.

---

## Design of Experiments: Historical Roots

The idea of systematically testing combinations predates software by centuries:

- **1747:** James Lind tests scurvy treatments on 12 sailors in 6 groups — the first controlled experiment. Orange and lemon juice won.
- **1920s:** Ronald Fisher introduces orthogonal arrays for agricultural experiments, enabling efficient multi-factor studies.
- **1985:** Mandl applies combinatorial designs to software testing.
- **1997:** Cohen et al. create AETG — the first automated tool for generating covering arrays for software {% cite cohen1997aetg %}.

The transition from agriculture to software brought a key advantage: software tests produce binary results (pass/fail) and can run thousands of times, eliminating the need for statistical replication.

---

## Orthogonal Arrays

An **orthogonal array** OA(N; t, k, v) is an N × k array where every t-column subset contains each possible t-tuple **exactly the same number of times** (λ times).

**Example:** 3 parameters, 3 values each — OA(9; 2, 3, 3):

| P1 | P2 | P3 |
|----|----|----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 0 | 2 | 2 |
| 1 | 0 | 1 |
| 1 | 1 | 2 |
| 1 | 2 | 0 |
| 2 | 0 | 2 |
| 2 | 1 | 0 |
| 2 | 2 | 1 |

Every pair of values in any two columns appears exactly once. This **balance** was essential for agricultural statistics where you needed equal replication for valid inference.

**Limitation:** Orthogonal arrays are rigid. They require exact balance and may not exist for arbitrary parameter configurations. This led to covering arrays.

---

## Covering Arrays

A **covering array** CA(N; t, k, v) is an N × k array where every t-column subset contains each possible t-tuple **at least once**.

Key differences from orthogonal arrays:

| Property | Orthogonal Array | Covering Array |
|----------|-----------------|----------------|
| Frequency | Exactly λ times | At least once |
| Flexibility | Limited configurations | Always exists |
| Size | Often larger | Always ≤ equivalent OA |
| Balance | Required | Not required |

**Why "at least once" is enough for software:**
- One test case is sufficient to reveal a fault
- No statistical replication needed (deterministic behavior)
- Smaller test suites save execution time

Covering arrays are the mathematical foundation of modern combinatorial testing tools like ACTS, PICT, and CASA.

---

## T-Way Coverage

**T-way coverage** requires that every combination of t parameter values appears in at least one test case.

| Strength | Meaning | Example (A, B, C) |
|----------|---------|--------------------|
| 1-way | Every individual value tested | A=1, B=2, C=3 each appear |
| 2-way (pairwise) | Every pair of values tested | (A=1, B=2), (A=1, C=3), ... |
| 3-way | Every triple tested | (A=1, B=2, C=3) |
| t-way | Every t-tuple tested | General case |

Each level **subsumes** the previous: achieving 3-way coverage automatically provides 2-way and 1-way coverage.

### What t-way coverage guarantees

If all faults in a system are triggered by combinations of t or fewer parameters, then t-way testing is **effectively exhaustive** {% cite kuhn2004fault %}. The NIST studies show this threshold is ≤6 for all studied systems.

---

## Logarithmic Growth

The most important practical property of covering arrays: test count grows **logarithmically** in the number of parameters.

The approximate test count formula {% cite cohen1997aetg %}:

> N ∝ v^t × log(k)

Where v = values per parameter, t = interaction strength, k = number of parameters.

**Good news:** Adding parameters is cheap. Doubling from 20 to 40 parameters adds only ~3 tests for pairwise coverage.

**Bad news:** Raising interaction strength is expensive. The v^t factor means going from 2-way to 3-way roughly multiplies test count by v.

### Example: 10 parameters × 3 values each

| Strength | Exhaustive | Covering Array | Reduction |
|----------|-----------|----------------|-----------|
| 1-way | 30 | 3 | 10× |
| 2-way | 810 | 15 | 54× |
| 3-way | 19,683 | 33 | 596× |
| 4-way | 531,441 | 54 | 9,841× |

### Example: scaling parameters (pairwise, 3 values each)

| Parameters | Exhaustive | Pairwise | Reduction |
|------------|-----------|----------|-----------|
| 10 | 59,049 | 15 | 3,937× |
| 20 | 3.5 × 10⁹ | 18 | ~10⁸× |
| 40 | 1.2 × 10¹⁹ | 21 | ~10¹⁸× |
| 100 | 5.2 × 10⁴⁷ | 25 | ~10⁴⁶× |

The logarithmic growth is what makes CT practical for real systems with dozens or hundreds of parameters {% cite cohen1997aetg %}.

---

## Software Testing vs. Classical DOE

Software testing has unique advantages over classical design of experiments {% cite grindal2005survey %}:

| Aspect | Classical DOE | Software CT |
|--------|--------------|-------------|
| Result type | Continuous (measured) | Binary (pass/fail) |
| Replication | Needed for statistics | Not needed |
| Execution speed | Hours/days per trial | Milliseconds per test |
| Repeatability | Environmental noise | Exactly repeatable |
| Automation | Often manual | Fully automatable |
| Variables | Typically <10 | Can be 100+ |
| Invalid combos | Rare | Common (constraints) |

These advantages mean software can use **covering arrays** (at least once) instead of the **orthogonal arrays** (exactly balanced) required in statistics.

---

## Further Reading

- [Practice](practice) — How to build parameter models and apply CT
- [Algorithms](algorithms) — How covering arrays are generated
- [Combinatorial Testing overview](.) — Motivation and key numbers

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
