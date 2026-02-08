---
title: Algorithms
parent: Combinatorial Testing
nav_order: 4
layout: default
---

# Algorithms & Evolution

Building minimum covering arrays is NP-hard. Practical tools rely on heuristic algorithms that produce near-optimal solutions efficiently. Over three decades, these algorithms have evolved from simple greedy approaches to sophisticated meta-selectors.

---

## The Generation Problem

Given parameters, values, and interaction strength t, find the **smallest** array where every t-way combination appears at least once.

Three main algorithm families:

| Family | Approach | Trade-off |
|--------|----------|-----------|
| **Greedy** | Build test cases one at a time | Fast, larger suites |
| **Metaheuristic** | Search for optimal arrays | Slower, smaller suites |
| **Algebraic** | Construct from mathematical formulas | Fastest, limited configurations |

Most practical tools use greedy or metaheuristic approaches {% cite grindal2005survey %}.

---

## AETG: The First Greedy Algorithm (1997)

AETG (Automatic Efficient Test Generator) was the first practical tool for generating covering arrays for software testing {% cite cohen1997aetg %}.

**Approach:** One-**test**-at-a-time

1. Identify parameter and value appearing in most uncovered pairs
2. Order remaining parameters by number of uncovered pairs
3. For each remaining parameter, greedily select value covering most uncovered pairs
4. Generate M=50 random candidates this way, keep the best one
5. Repeat until all t-tuples are covered

**Key contribution:** Proved that test suite size grows **logarithmically** in the number of parameters. This meant CT could scale to systems with 80+ parameters.

**Performance examples:**
- 40 parameters × 3 values: **21 tests** (vs. 1.2 × 10¹⁹ exhaustive)
- 800-service telecom project: 336 scenarios → **30 pairwise tests**
- Achieved >90% block coverage on Unix commands

**Limitation:** Random candidate generation (M=50 per test) makes AETG slow for large models.

---

## IPOG: Parameter-Order Growth (2007)

IPOG (In-Parameter-Order-General) takes a fundamentally different approach {% cite lei2007ipog %}.

**Approach:** One-**parameter**-at-a-time

### Three Phases

**Phase 1:** Build a complete t-way covering set for the first t parameters.

**Phase 2 — Horizontal Growth:** For each remaining parameter, extend every existing test case by adding a value that covers the most uncovered t-tuples.

| P1 | P2 | → | P1 | P2 | P3 |
|----|----|----|----|----|-----|
| 0 | 0 | | 0 | 0 | **0** |
| 0 | 1 | | 0 | 1 | **1** |
| 1 | 0 | | 1 | 0 | **2** |
| 1 | 1 | | 1 | 1 | **0** |

**Phase 3 — Vertical Growth:** Add new rows for any t-tuples not yet covered. Use "don't-care" values (marked `*`) in positions that don't affect coverage.

| P1 | P2 | P3 |
|----|----|----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 2 |
| 1 | 1 | 0 |
| **0** | **\*** | **2** |
| **1** | **\*** | **1** |

**Advantages over AETG:**
- Lower computational complexity
- Deterministic (no random candidates)
- Naturally generalizes to any strength t
- Foundation of the NIST ACTS tool

---

## CASA: Constrained CT with Simulated Annealing (2011)

Real systems have constraints — not all parameter combinations are valid. CASA (Covering Arrays by Simulated Annealing) was designed specifically for this challenge {% cite garvin2011casa %}.

**Approach:** Two-layer metaheuristic search

- **Outer loop:** Minimize array size (try progressively smaller arrays)
- **Inner loop:** Simulated Annealing finds a valid array of the target size
- **SAT solver** (MiniSAT) integration for constraint satisfaction

### Key Innovations

| Innovation | Problem Solved |
|-----------|---------------|
| **t-Set Replacement** | Writes entire missing t-tuple to escape infeasible states |
| **One-Sided Narrowing** | Only narrows upper bound (handles false negatives) |
| **Row Replacement** | Generates new valid row when trapped |
| **Row Sorting** | Moves valuable rows early to avoid discarding them |
| **State Preservation** | Preserves array state between successive inner searches |

### Performance

- **90× faster** than base SA
- **25% smaller** test suites than greedy on constrained problems
- Cost-effective when test execution time >21 seconds

---

## Algorithm Evolution Timeline

The field has progressed through increasingly sophisticated strategies:

```
1997: AETG (Greedy) → 2007: IPOG (Parameter-order) → 2011: CASA (SA+SAT) → 2020s: Hyper-heuristics
```

Zeb et al. {% cite zeb2025systematic %} analyzed 91 studies (2003-2025) and identified five algorithm categories:

| Category | Description | Examples | Key Trait |
|----------|-------------|----------|-----------|
| **Standard** | Single metaheuristic | SA, GA, PSO, ACO | Simple, proven |
| **Mix** | Two algorithms combined | Greedy + SA (2SSA) | Better than either alone |
| **Adaptive** | Self-tuning parameters | Fuzzy TLBO | Adjusts during search |
| **Hybrid** | Search + greedy/algebraic | REH | Speed + quality |
| **Hyper-heuristic** | Meta-level selector | HHSA, HHH | Selects best strategy per instance |

**Key finding:** Simulated Annealing is the most successful algorithm across all categories {% cite zeb2025systematic %}. Hyper-heuristics represent the emerging frontier — they select which low-level algorithm to use for each specific problem instance.

---

## Nature-Inspired Algorithms (2020-2024)

Recent years show a trend toward nature-inspired optimization {% cite ibrahim2025advancements %}:

| Year | Algorithm | Inspiration | Target Niche |
|------|-----------|-------------|--------------|
| 2020 | DEO | Dynamic event ordering | Event-driven systems |
| 2021 | EMBO-GA | Migrating birds + genetic | Complex interactions |
| 2022 | TSWOA | Whale optimization | High-dimensional models |
| 2023 | SCIPOG | Enhanced IPOG + seeding | Constrained systems |
| 2024 | ImpARO | Asexual reproduction | Diverse parameter spaces |

Each algorithm targets a different niche, reflecting the increasing specialization of the field.

---

## Reinforcement Learning Integration

Machine learning is beginning to transform CT algorithm selection and test prioritization {% cite pan2022testcase %}:

- **Q-Graph framework:** 100× faster and 99.99% less memory than brute-force for FSM testing
- **Multi-Armed Bandit:** Adaptive test prioritization in CI environments
- **RL advantage:** Adapts to changing codebases without retraining (unlike supervised learning)

However, a significant concern: only 21% of ML-based test prioritization studies are reproducible {% cite pan2022testcase %}, raising questions about the reliability of reported results.

---

## Choosing an Algorithm

| If you need... | Use... | Because... |
|----------------|--------|-----------|
| General-purpose generation | IPOG (via ACTS) | Fast, deterministic, industry standard |
| Smallest suites | SA-based (CASA) | Best optimization, worth the time |
| Fast generation | Greedy (PICT) | Simple, CLI-friendly |
| Complex constraints | CASA | SAT solver handles difficult constraints |
| Very large models | REH | 33% faster than alternatives |

---

## Further Reading

- [Tools](tools) — Which tools implement which algorithms
- [Foundations](foundations) — Mathematical theory behind covering arrays
- [Industrial Evidence](effectiveness) — Algorithm impact on real projects

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
