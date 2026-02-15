---
title: "Study Notes: Combinatorial Testing"
parent: Combinatorial Testing
nav_order: 99
layout: default
---

# Study Notes: Combinatorial Testing (A07)

## Purpose
These study notes cover combinatorial testing (CT) — a systematic approach to testing parameter interactions. CT is grounded in 30 years of research and validated across industrial domains from aerospace to autonomous driving.

**Primary Source:**
- Kuhn, Kacker & Lei, *Introduction to Combinatorial Testing* (2013) {% cite kuhn2013combinatorial %}

**Key Research Papers:**
- NIST fault interaction study: ≤6-way for all projects {% cite kuhn2004fault %}
- AETG: first greedy algorithm, logarithmic growth {% cite cohen1997aetg %}
- IPOG: parameter-order growth, basis of ACTS {% cite lei2007ipog %}
- CASA: SA + SAT solver for constrained systems {% cite garvin2011casa %}
- Hu 2020: 93.3% multi-factor fault detection {% cite hu2020realworld %}
- Daoud 2025: 48% time savings at Tricentis {% cite daoud2025effectiveness %}

---

## Part 1: Why Interactions Break Software

### 1.1 Parameter Interactions

Software failures occur when specific combinations of parameter values trigger a fault. Most failures involve interactions between a small number of parameters.

**Types of interactions:**

| Interaction | Example | Description |
|-------------|---------|-------------|
| 1-way | `if (balance <= 0)` | Single parameter triggers fault |
| 2-way | `if (balance <= 0 && overdraft)` | Pair triggers fault |
| 3-way | `if (balance <= 0 && overdraft && amount >= 100)` | Triple triggers fault |
| t-way | General case | t parameters together trigger fault |

Each additional parameter **multiplies** the possible combinations. For n binary parameters, there are 2^n total combinations.

### 1.2 The NIST Fault Interaction Study

Kuhn, Wallace, and Gallo {% cite kuhn2004fault %} analyzed 329 error reports from NASA, medical devices, Mozilla, and Apache. Their findings form the empirical foundation of CT:

| Domain | 1-way | 2-way | 3-way | 4-way | 6-way |
|--------|-------|-------|-------|-------|-------|
| NASA GSFC | 68% | **93%** | 98% | 100% | — |
| Medical Devices | 66% | **97%** | 99% | 100% | — |
| Mozilla | 29% | 76% | 95% | — | 100% |
| Apache | 42% | 70% | — | — | 100% |

**Key insight:** No failure in any studied project required more than 6-way interactions. If you test all 6-tuples, you achieve effectively exhaustive coverage {% cite kuhn2004fault %}.

### 1.3 Why Code Limits Interaction Depth

A NASA study of 7,685 conditions found that most `if`/`while` statements have only 1-3 boolean operands {% cite hayhurst2001mcdc %}:

| Operands | % of Conditions |
|----------|-----------------|
| 1 | ~45% |
| 2 | ~35% |
| 3 | ~15% |
| 4+ | ~5% |

Developers naturally limit the complexity of individual conditions, which is why most faults involve few-way interactions.

{: .highlight }
> **Exam Tip:** Memorize the NIST table percentages. The key number is **≤6-way for all projects**. For pairwise (2-way), the detection rate ranges from 70% (Apache) to 97% (Medical Devices).

---

## Part 2: Theory & Foundations

### 2.1 From Orthogonal Arrays to Covering Arrays

**Orthogonal Array (OA):** Each t-way combination appears **exactly** the same number of times (λ times). Developed for agricultural experiments in the 1920s where statistical balance was required.

**Covering Array (CA):** Each t-way combination appears **at least once**. More flexible, always exists, always ≤ equivalent OA size.

| Property | Orthogonal Array | Covering Array |
|----------|-----------------|----------------|
| Frequency | Exactly λ times | At least once |
| Flexibility | Limited configs | Always constructible |
| Size | Often larger | ≤ equivalent OA |
| Use case | Statistics (replication) | Software (one test suffices) |

**Why covering arrays suit software:** Software testing produces binary results (pass/fail). One test case is enough to reveal a fault. No replication needed.

### 2.2 T-Way Coverage

**Definition:** A test suite achieves t-way coverage if every combination of t parameter values appears in at least one test case.

| Strength | Meaning | Subsumes |
|----------|---------|----------|
| 1-way | Each individual value tested | — |
| 2-way (pairwise) | All pairs covered | 1-way |
| 3-way | All triples covered | 2-way, 1-way |
| t-way | All t-tuples covered | All lower strengths |

**Subsumption:** Higher strength automatically satisfies all lower strengths.

### 2.3 Logarithmic Growth — The Key Property

The test count formula {% cite cohen1997aetg %}:

> N ∝ v^t × log(k)
>
> v = values per parameter, t = strength, k = number of parameters

**Implications:**
- **Adding parameters is cheap:** Doubling parameters from 20 to 40 adds ~3 tests (pairwise)
- **Raising strength is expensive:** The v^t factor means 2-way → 3-way multiplies by ~v

**Example (10 parameters × 3 values each):**

| Strength | Exhaustive | Covering Array | Reduction |
|----------|-----------|----------------|-----------|
| 1-way | 30 | 3 | 10× |
| 2-way | 810 | 15 | 54× |
| 3-way | 19,683 | 33 | 596× |
| 4-way | 531,441 | 54 | 9,841× |

**Example (scaling parameters, pairwise, 3 values each):**

| Parameters | Exhaustive | Pairwise |
|------------|-----------|----------|
| 10 | 59,049 | 15 |
| 20 | 3.5 × 10⁹ | 18 |
| 40 | 1.2 × 10¹⁹ | **21** |
| 100 | 5.2 × 10⁴⁷ | **25** |

{: .highlight }
> **Exam Tip:** The formula N ∝ v^t × log(k) explains two facts: (1) why CT scales to huge parameter spaces, and (2) why raising strength is so expensive. Be ready to explain both.

---

## Part 3: Practical Application

### 3.1 Building a Parameter Model

**Step 1:** Identify parameters (inputs, configurations, environment factors).

**Step 2:** Define equivalence classes for each parameter.

**Worked example — Find Dialog:**

| Parameter | Equivalence Classes | Count |
|-----------|---------------------|-------|
| FindWhat | Empty, lowercase, MixedCase, UPPER, space, multi-word, special chars, long string | 8 |
| MatchCase | Yes, No | 2 |
| Direction | Up, Down | 2 |
| File | No occurrence, Single, Multiple | 3 |

**Exhaustive:** 8 × 2 × 2 × 3 = **96 tests**
**Pairwise:** **24 tests** (75% reduction)
**Triples:** **48 tests** (50% reduction)

### 3.2 Configuration vs. Input Testing

| Aspect | Configuration Testing | Input Testing |
|--------|----------------------|---------------|
| What varies | Environment (OS, browser, DB) | User inputs |
| What's fixed | Test cases | Environment |
| Goal | Works across platforms | Handles input combos |
| Example | Win+Chrome+MySQL | New user, $500, credit |

The math is identical — covering arrays don't distinguish between input and configuration parameters.

### 3.3 Choosing Interaction Strength

| Risk Level | Strength | Approx. Detection | Domain Examples |
|------------|----------|-------------------|-----------------|
| Low | 2-way | ~90% | Web forms, UI config |
| Medium | 3-way | ~98% | Business logic, APIs |
| High | 4-way | ~100% | Medical devices, aerospace |
| Very High | 5-6-way | 100% | FAA, nuclear, automotive safety |

Evidence: Bures & Ahmed {% cite bures2024effectiveness %} showed 3-way detected faults that 2-way missed entirely in **30%** of tested systems. Start with 2-way; increase for critical subsystems.

### 3.4 Positive vs. Negative Testing

**Problem:** Invalid inputs can mask real faults. An error handler terminates early, preventing later code with real bugs from executing.

**Solution:** Generate **separate** covering arrays for positive and negative tests.

{: .highlight }
> **Exam Tip:** Know the masking effect. If asked "what goes wrong when you mix valid and invalid values in one covering array?", explain that error handlers can prevent later code from being reached.

---

## Part 4: Algorithms & Tools

### 4.1 AETG — First Greedy Algorithm (1997)

Cohen et al. {% cite cohen1997aetg %} introduced the one-**test**-at-a-time approach:

1. Find parameter/value appearing in most uncovered pairs
2. Order remaining parameters by uncovered pairs
3. Generate M=50 random candidates, keep the best
4. Repeat until all t-tuples covered

**Key result:** Proved logarithmic growth — 40 params × 3 values = only 21 tests.

### 4.2 IPOG — Parameter-Order Growth (2007)

Lei et al. {% cite lei2007ipog %} introduced the one-**parameter**-at-a-time approach:

**Three phases:**
1. Build t-way covering set for first t parameters
2. **Horizontal growth:** Extend existing rows with new parameter (greedy assignment)
3. **Vertical growth:** Add new rows for uncovered t-tuples (use don't-care `*` values)

**Advantages:** Lower complexity than AETG, deterministic, generalizes to any t. Foundation of ACTS.

### 4.3 CASA — Constrained CT (2011)

Garvin, Cohen & Dwyer {% cite garvin2011casa %} addressed systems with constraints:

- Two-layer SA search + SAT solver (MiniSAT)
- **90× faster** than base SA
- **25% smaller** suites than greedy on constrained problems
- Break-even: use SA when test execution >21 seconds

### 4.4 Algorithm Evolution

Zeb et al. {% cite zeb2025systematic %} classified 91 studies into 5 categories:

| Category | Approach | Example | Key Trait |
|----------|----------|---------|-----------|
| Standard | Single metaheuristic | SA, GA, PSO | Simple, proven |
| Mix | Two algorithms | Greedy+SA | Better than either |
| Adaptive | Self-tuning | Fuzzy TLBO | Adjusts during search |
| Hybrid | Search + greedy | REH | Speed + quality |
| Hyper-heuristic | Meta-selector | HHSA | Selects best per instance |

**SA is the most successful** algorithm across all categories. Hyper-heuristics are the emerging frontier.

### 4.5 Tool Comparison

| Tool | Algorithm | Constraints | Best For |
|------|-----------|-------------|----------|
| **ACTS** | IPOG | Yes | General, industry standard |
| **PICT** | Greedy | Yes | CLI, CI/CD integration |
| **CASA** | SA+SAT | Yes (complex) | Constrained systems |
| **Hexawise** | Commercial | Yes | Enterprise |

### 4.6 Seed Reuse (Bombarda 2025)

Bombarda & Gargantini {% cite bombarda2025completion %} studied when to reuse existing tests:

| Scenario | Use Seeds? | Best Tool |
|----------|-----------|-----------|
| Strength increase (2→3) | **Yes** | ACTS (smallest suites) |
| Suite completion (>70%) | Maybe | PICT |
| Partial test cases | **No** | Overhead negates benefit |

{: .highlight }
> **Exam Tip:** Know AETG vs IPOG: AETG = one-test-at-a-time (greedy candidates), IPOG = one-parameter-at-a-time (horizontal + vertical growth). IPOG is lower complexity and the basis of ACTS.

---

## Part 5: Advanced Topics

### 5.1 Constraint Handling

Four strategies for invalid combinations:

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Abstract | Combine conflicting params | Few conflicts |
| Partition | Split into sub-models | Independent groups |
| Avoid | Generator excludes invalid | ACTS, PICT support |
| Replace | Post-process conflicting rows | Legacy models |

### 5.2 Mixed-Strength Arrays

Assign different interaction strengths to different parameter groups:
- Security-critical parameters: 3-way
- UI parameters: 2-way
- Cross-group: 2-way

ACTS supports mixed-strength specification directly.

### 5.3 CT for Autonomous Driving

Tao et al. {% cite tao2019industrial %} applied CT at AVL List GmbH:
- **Domain:** Autonomous Emergency Braking (AEB)
- **Model:** 37 parameters, 39 constraints from Euro NCAP
- **Result:** 319 pairwise tests executed in VTD simulation
- **Key:** Physical testing is impossible; CT + simulation makes it feasible

### 5.4 CT for ML Dataset Quality

Lanus et al. {% cite lanus2021metrics %} bridged CT and ML quality:
- **CCM_t:** Measures t-way coverage of a dataset
- **SDCCM_t:** Coverage difference between datasets
- **Finding:** Smaller dataset had HIGHER 2-way coverage (0.93 vs 0.83)
- **Lesson:** Dataset size ≠ representativeness

### 5.5 Research Directions

- **RL integration:** Q-Graph framework (100× faster FSM testing)
- **Hyper-heuristics:** Meta-selectors that pick best algorithm per instance
- **Reproducibility concern:** Only 21% of ML-testing studies are reproducible (Pan 2022)

{: .highlight }
> **Exam Tip:** For the autonomous driving case study, remember the numbers: 37 parameters, 39 constraints, 319 tests. The pipeline is: Ontology → CT Model → IPOG → OpenScenario → VTD Simulation.

---

## Part 6: Industrial Evidence Summary

### Key Numbers to Remember

| Fact | Value | Source |
|------|-------|--------|
| Max interactions needed | **≤6-way** all projects | Kuhn 2004 |
| Pairwise detection (medical) | **97%** | Kuhn 2004 |
| Multi-factor CT vs manual | **93.3% vs 6.7%** | Hu 2020 |
| Defect detection CT vs ad-hoc | **100% vs 81.8%** | Daoud 2025 |
| Test time savings | **48%** (394h→205h) | Daoud 2025 |
| 3-way catches extra faults in | **30%** of systems | Bures 2017 |
| CASA speedup over base SA | **90×** | Garvin 2011 |
| CASA suite size vs greedy | **25% smaller** | Garvin 2011 |
| 34 binary switches: 4-way | 17B → **85 tests** | Kuhn 2013 |

### Barriers to Adoption

| Barrier | Mitigation |
|---------|-----------|
| Manual execution limits (<200 tests) | Automate execution |
| Tools don't generate scripts | Add mapping layer |
| Depends on specification quality | Invest in parameter model |
| Masking effect | Separate positive/negative tests |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
