---
title: "Revision Questions: Adequacy Criteria"
parent: Coverage
nav_order: 100
layout: default
---

# Revision Questions: Adequacy Criteria (L04)

## Instructions
These questions cover the key concepts from L04 on test adequacy criteria. Use them for exam preparation and self-assessment.

---

## Section 1: Coverage Fundamentals

### Q1.1 Coverage Categories
**Question:** Match each coverage category with its focus area:

| Category | Focus |
|----------|-------|
| A. White Box | 1. Input space |
| B. Black Box | 2. Code structure |
| C. Mutation | 3. Specification |
| D. Requirements | 4. Fault detection |

<details>
<summary>Answer</summary>

A-2, B-1, C-4, D-3

- **White Box** → Code structure (Statement, Branch, Path, MC/DC)
- **Black Box** → Input space (Equivalence, Boundary, Combinatorial)
- **Mutation** → Fault detection (Mutation score)
- **Requirements** → Specification (N-switch, State coverage)
</details>

---

### Q1.2 Coverage Formula
**Question:** A test suite executes 45 out of 60 statements. What is the statement coverage?

<details>
<summary>Answer</summary>

$$\text{Statement Coverage} = \frac{45}{60} \times 100\% = 75\%$$
</details>

---

### Q1.3 Two Uses of Coverage
**Question:** What are the two ways coverage criteria can be used? Explain each with an example.

<details>
<summary>Answer</summary>

1. **Generator:** Create tests to satisfy criterion
   - Example: Write tests until 80% branch coverage is achieved

2. **Measure:** Evaluate existing tests against criterion
   - Example: Run coverage tool on existing test suite to identify gaps
</details>

---

## Section 2: Statement and Branch Coverage

### Q2.1 Statement Coverage Weakness
**Question:** Consider this code:

```python
x = 0
if condition:
    x = 4
y = z / x
```

A test with `condition=True` achieves 100% statement coverage. Why is this problematic?

<details>
<summary>Answer</summary>

The test misses the `condition=False` path where `x` remains 0, causing a **division by zero** error.

**Key insight:** 100% statement coverage does not guarantee all paths are tested. Statement coverage is insensitive to control flow.
</details>

---

### Q2.2 Branch vs Statement
**Question:** How many tests are needed for 100% branch coverage on an `if-else` statement? How does this compare to statement coverage?

<details>
<summary>Answer</summary>

- **Branch coverage:** 2 tests (one for True branch, one for False branch)
- **Statement coverage:** Could be 1 test (if True branch covers all statements)

Branch coverage **subsumes** statement coverage, meaning any test suite achieving 100% branch coverage also achieves 100% statement coverage (but not vice versa).
</details>

---

### Q2.3 Compound Predicate Problem
**Question:** For `if (A && B)`, branch coverage requires only 2 tests. What combination is never tested, and why is this a problem?

<details>
<summary>Answer</summary>

**Never tested:** `A=true, B=false`

This is a problem because:
- Short-circuit evaluation: When A is false, B is never evaluated
- A fault like `A && B` vs `A || B` would remain **undetected**
- The error only manifests when A is true but B is false
</details>

---

## Section 3: Cyclomatic Complexity and Basis Path

### Q3.1 Cyclomatic Complexity Calculation
**Question:** A control flow graph has 10 edges and 8 nodes. Calculate V(G).

<details>
<summary>Answer</summary>

$$V(G) = E - N + 2 = 10 - 8 + 2 = 4$$

This means 4 linearly independent paths (basis paths) exist, requiring at most 4 test cases.
</details>

---

### Q3.2 Alternative Formula
**Question:** A function has 5 decision points (if, while, etc.). What is its cyclomatic complexity?

<details>
<summary>Answer</summary>

$$V(G) = D + 1 = 5 + 1 = 6$$

Where D = number of decisions.
</details>

---

### Q3.3 Basis Path vs All Paths
**Question:** Why is basis path coverage preferred over all-path coverage? Complete this table:

| Decisions | All Paths | Basis Paths |
|-----------|-----------|-------------|
| 4 | ? | ? |
| 10 | ? | ? |

<details>
<summary>Answer</summary>

| Decisions | All Paths ($2^n$) | Basis Paths (n+1) |
|-----------|-------------------|-------------------|
| 4 | 16 | **5** |
| 10 | 1,024 | **11** |

**Why preferred:**
- All-path is **exponential** — infeasible for real code
- Basis path provides **linear** growth
- Still covers all independent control flow paths
- Every edge executed at least once
</details>

---

### Q3.4 Unfeasible Paths
**Question:** What is an unfeasible path? Give an example.

<details>
<summary>Answer</summary>

An **unfeasible path** is a control flow path that cannot be executed due to semantic dependencies.

**Example:**
```python
if x > 0:
    y = 1
if x > 0:     # Same condition!
    z = y + 1
```

The path `x > 0 → y = 1 → x ≤ 0 → skip z` is impossible because `x` cannot simultaneously satisfy both conditions.
</details>

---

## Section 4: Condition Coverage and MC/DC

### Q4.1 Coverage Type Tests
**Question:** For predicate `if (A && B)`, how many tests does each coverage type require?

| Coverage Type | Tests Required |
|---------------|----------------|
| Basic Condition | ? |
| Multiple Condition | ? |
| MC/DC | ? |

<details>
<summary>Answer</summary>

| Coverage Type | Tests Required | Example |
|---------------|----------------|---------|
| Basic Condition | 2 | (T,T), (F,F) |
| Multiple Condition | 4 | TT, TF, FT, FF |
| MC/DC | 3 | TT, TF, FT |
</details>

---

### Q4.2 MC/DC Requirements
**Question:** What are the three requirements for MC/DC coverage?

<details>
<summary>Answer</summary>

1. Every **decision** takes all outcomes (true and false)
2. Every **condition** takes all outcomes (true and false)
3. Each condition **independently** affects the decision outcome

**Key insight:** Change ONE condition, change the outcome.
</details>

---

### Q4.3 MC/DC Test Count
**Question:** How many tests are needed for MC/DC coverage of a predicate with 5 conditions?

<details>
<summary>Answer</summary>

$$\text{MC/DC tests} = n + 1 = 5 + 1 = 6$$

Compare to Multiple Condition: $2^5 = 32$ tests
</details>

---

### Q4.4 MC/DC Independence Pairs
**Question:** For `if (A && B && C)`, construct a minimal MC/DC test suite showing which pairs demonstrate each condition's independence.

<details>
<summary>Answer</summary>

| Test | A | B | C | Result | Independence |
|------|---|---|---|--------|--------------|
| T1 | T | T | T | True | Baseline |
| T2 | **F** | T | T | False | A (T1↔T2) |
| T3 | T | **F** | T | False | B (T1↔T3) |
| T4 | T | T | **F** | False | C (T1↔T4) |

**Independence pairs:**
- A: T1-T2 (only A differs, outcome changes)
- B: T1-T3 (only B differs, outcome changes)
- C: T1-T4 (only C differs, outcome changes)
</details>

---

### Q4.5 MC/DC Standards
**Question:** Which safety-critical standards require or recommend MC/DC? Match standard to domain:

| Standard | Domain |
|----------|--------|
| DO-178C | ? |
| ISO 26262 | ? |
| IEC 62304 | ? |

<details>
<summary>Answer</summary>

| Standard | Domain | MC/DC Requirement |
|----------|--------|-------------------|
| DO-178C | Aerospace | Level A **requires** MC/DC |
| ISO 26262 | Automotive | **Recommends** MC/DC for ASIL D |
| IEC 62304 | Medical | **Considers** MC/DC for Class C |
</details>

---

## Section 5: Mutation and Combinatorial Testing

### Q5.1 Mutation Score
**Question:** A test suite kills 72 mutants out of 100 total. 10 are equivalent mutants. What is the mutation score?

<details>
<summary>Answer</summary>

$$\text{Mutation Score} = \frac{\text{Killed}}{\text{Total} - \text{Equivalent}} = \frac{72}{100 - 10} = \frac{72}{90} = 80\%$$
</details>

---

### Q5.2 Mutation Operators
**Question:** Name five categories of mutation operators and give an example of each.

<details>
<summary>Answer</summary>

| Category | Operator | Example |
|----------|----------|---------|
| **Arithmetic** | Replace + with - | `a + b` → `a - b` |
| **Relational** | Replace < with <= | `x < 5` → `x <= 5` |
| **Logical** | Replace && with \|\| | `A && B` → `A \|\| B` |
| **Constant** | Change value | `x = 0` → `x = 1` |
| **Statement** | Delete statement | `x++` → (removed) |
</details>

---

### Q5.3 Pairwise Testing
**Question:** 4 parameters × 3 values each = 81 exhaustive combinations. How many tests does pairwise testing typically require? Why is this sufficient?

<details>
<summary>Answer</summary>

**Pairwise:** ~9 tests (instead of 81)

**Why sufficient:**
- Research shows most bugs involve ≤ 2-way interactions
- Covers all pairs of parameter values
- Dramatic reduction from exponential to near-logarithmic
</details>

---

### Q5.4 N-Switch Coverage
**Question:** What is the difference between 0-switch, 1-switch, and 2-switch coverage?

<details>
<summary>Answer</summary>

| N | Coverage | What It Covers |
|---|----------|----------------|
| 0-switch | All states | Each state visited at least once |
| 1-switch | All transitions | Each state transition exercised once |
| 2-switch | All transition pairs | Every sequence of 2 transitions |

Higher N = more tests but catches sequence-dependent bugs.
</details>

---

## Section 6: Coverage vs Quality

### Q6.1 Coverage Limitations
**Question:** What does coverage measure, and what does it NOT measure? Complete the table:

| Coverage Measures | Does NOT Measure |
|-------------------|------------------|
| ? | Oracle correctness |
| ? | Missing code |
| ? | Requirements coverage |

<details>
<summary>Answer</summary>

| Coverage Measures | Does NOT Measure |
|-------------------|------------------|
| Code executed | Oracle correctness |
| Paths traversed | Missing code (faults of omission) |
| Conditions tested | Requirements coverage |
| Mutations killed | Usability |

> "Coverage measures *thoroughness*, not *correctness*."
</details>

---

### Q6.2 Size Confounding
**Question:** Inozemtseva & Holmes (2014) found that coverage-effectiveness correlation drops to ~0 when controlling for what variable? What percentage of the coverage effect does test suite size explain?

<details>
<summary>Answer</summary>

**Variable:** Test suite **size**

| Condition | Correlation |
|-----------|-------------|
| Size ignored | 0.79 - 0.95 |
| Size controlled | **~0** |

**Size explains (Lu et al. 2025):**
- Statement Coverage: **69%**
- Branch Coverage: **81.9%**

**Implication:** Don't compare suites of different sizes by coverage alone.
</details>

---

### Q6.3 Assertions vs Coverage
**Question:** According to Zhang & Mesbah (2015), what has a stronger correlation with test effectiveness: coverage or assertion quantity?

<details>
<summary>Answer</summary>

**Assertion quantity** has much stronger correlation:

| Factor | Correlation |
|--------|-------------|
| Assertion quantity | **0.927 - 0.973** |
| Statement coverage | Weak when assertions controlled |

> "The correlation between size and effectiveness is driven by assertions, not coverage."

**Implication:** Focus on assertion quality, not just coverage percentage.
</details>

---

### Q6.4 Coverage Criteria Effectiveness
**Question:** According to Hemmati (2015), what percentage of faults does statement coverage detect? What about data-flow coverage?

<details>
<summary>Answer</summary>

| Criterion | Faults Detected |
|-----------|-----------------|
| Statement Coverage | **10%** |
| Branch Coverage | 19% |
| MC/DC | 19% |
| All control-flow | 28% |
| **+ Data-flow** | **85%** |

**Key finding:** Statement coverage misses **90%** of real faults!
</details>

---

### Q6.5 Coverage Anti-Patterns
**Question:** List three coverage anti-patterns and explain why each is problematic.

<details>
<summary>Answer</summary>

| Anti-Pattern | Problem |
|--------------|---------|
| Tests designed FOR coverage | Creates uniformly weak test suite focused on execution, not verification |
| Quick tests to satisfy tool | Misses faults of omission (missing functionality) |
| Using 85% as shipping gate | People cluster at threshold, game the metric |

**Healthy practice:** Design tests from requirements first, use coverage to find gaps.
</details>

---

## Section 7: Practical Application

### Q7.1 Coverage Level Selection
**Question:** Match each context with the appropriate coverage criterion:

| Context | Criterion |
|---------|-----------|
| A. Minimum bar for any code | 1. MC/DC |
| B. Default for unit tests | 2. Statement |
| C. Safety-critical (DO-178C Level A) | 3. Branch |
| D. Complex control flow | 4. Basis Path |

<details>
<summary>Answer</summary>

A-2, B-3, C-1, D-4

| Context | Criterion |
|---------|-----------|
| Minimum bar | **Statement** (C0) |
| Default unit tests | **Branch** (C1) |
| Safety-critical | **MC/DC** |
| Complex control flow | **Basis Path** |
</details>

---

### Q7.2 Coverage Targets
**Question:** What are the recommended minimum and target coverage levels?

| Coverage | Min | Target |
|----------|-----|--------|
| Statement | ? | ? |
| Branch | ? | ? |
| Mutation | ? | ? |

<details>
<summary>Answer</summary>

| Coverage | Min | Target | Note |
|----------|-----|--------|------|
| Statement | 70% | 80% | Diminishing returns >90% |
| Branch | 75% | 85% | Good balance |
| Mutation | 60% | 80% | Expensive >80% |
</details>

---

### Q7.3 Tool Matching
**Question:** Match the coverage tool to its language:

| Tool | Language |
|------|----------|
| A. JaCoCo | 1. Python |
| B. Coverage.py | 2. Java |
| C. LLVM-cov | 3. JavaScript |
| D. c8 | 4. C/C++ |

<details>
<summary>Answer</summary>

A-2, B-1, C-4, D-3

| Tool | Language | Coverage Types |
|------|----------|----------------|
| JaCoCo | Java | Stmt, Branch, MC/DC |
| Coverage.py | Python | Stmt, Branch |
| LLVM-cov | C/C++ | Stmt, Branch |
| c8 | JavaScript/TS | Stmt, Branch, Function |
</details>

---

## Exam-Style Questions

### E1. Short Answer (5 marks)
**Question:** Explain why branch coverage is considered stronger than statement coverage. Provide a code example where 100% statement coverage fails to detect a fault that branch coverage would catch.

<details>
<summary>Model Answer</summary>

**Branch coverage is stronger because:**
- It requires testing both outcomes (true/false) of every decision point
- Statement coverage only requires executing each line once
- Branch coverage **subsumes** statement coverage

**Example:**
```python
x = 0
if A < 5:
    x = 4
y = z / x  # Bug: division by zero when A >= 5
```

**Statement coverage (100%):** Test with A=3 executes all statements
**Fault missed:** Never tests A >= 5 path where x remains 0

**Branch coverage catches it:** Requires testing both A<5 (true) and A>=5 (false), exposing the division by zero.
</details>

---

### E2. Calculation (10 marks)
**Question:** Given predicate `if ((A || B) && C)`:
a) How many tests for Multiple Condition coverage?
b) Construct a minimal MC/DC test suite
c) Show independence pairs for each condition

<details>
<summary>Model Answer</summary>

**a) Multiple Condition:** $2^3 = 8$ tests (all combinations)

**b) MC/DC Test Suite (4 tests):**

| Test | A | B | C | A∨B | Result |
|------|---|---|---|-----|--------|
| T1 | T | F | T | T | True |
| T2 | F | F | T | F | False |
| T3 | F | T | T | T | True |
| T4 | T | F | F | T | False |

**c) Independence Pairs:**
- **A:** T1↔T2 (A differs: T→F, result True→False)
- **B:** T2↔T3 (B differs: F→T, result False→True)
- **C:** T1↔T4 (C differs: T→F, result True→False)
</details>

---

### E3. Critical Analysis (15 marks)
**Question:** A project manager claims: "We achieved 95% code coverage, so our software is thoroughly tested." Critically evaluate this claim using evidence from recent research.

<details>
<summary>Model Answer</summary>

**The claim is flawed for several reasons:**

**1. Coverage ≠ Quality (Marick 1997)**
- Coverage measures *thoroughness* of execution, not *correctness*
- Cannot detect faults of omission (missing functionality)
- Tests may execute code without verifying behavior

**2. Size Confounding (Inozemtseva 2014)**
- When test suite size is controlled, coverage-effectiveness correlation drops to ~0
- 69-81% of the "coverage effect" is explained by suite size alone
- More tests → higher coverage AND more bugs found (correlation, not causation)

**3. Assertions Matter More (Zhang 2015)**
- Assertion quantity correlates 0.927-0.973 with effectiveness
- Coverage alone shows weak correlation
- Tests that execute but don't verify give false confidence

**4. Statement Coverage Is Especially Weak (Hemmati 2015)**
- Statement coverage detects only 10% of real faults
- Data-flow coverage detects 85%
- 95% statement coverage may miss 90% of bugs

**Recommendations:**
- Combine coverage with mutation testing
- Focus on assertion quality, not just coverage percentage
- Use coverage to find gaps, not as sole quality metric
- Consider what is NOT being tested
</details>

---

## Section 8: Testing Theory

### Q8.1 Oracle Problem
**Question:** What is the oracle problem in software testing?

<details>
<summary>Answer</summary>

The **oracle problem** is the difficulty of determining whether the actual output of a test is correct.

**Challenges:**
- No specification to compare against
- Complex outputs (e.g., graphical, probabilistic)
- Expensive to verify manually
- Missing edge case behavior

**Mitigations:**
- Metamorphic testing (check relationships between outputs)
- Property-based testing (verify invariants)
- Comparison with reference implementation
</details>

---

### Q8.2 Branch Coverage and Mutation Relation
**Question:** What is the relationship between branch coverage and mutation testing?

<details>
<summary>Answer</summary>

**Mutation testing subsumes branch coverage:**
- High mutation score **implies** high branch coverage
- High branch coverage does **NOT** imply high mutation score

**Relationship:**
| Coverage Type | Mutation Score Implication |
|---------------|----------------------------|
| 100% Branch | Necessary but not sufficient |
| High Mutation | Guarantees branch + more |

**Why mutation is stronger:**
- Tests must not just execute code, but **detect changes**
- Forces meaningful assertions
- Catches cases where tests execute but don't verify
</details>

---

## Quick Reference Formulas

| Metric | Formula |
|--------|---------|
| Coverage | (Items Executed / Total Items) × 100% |
| Cyclomatic Complexity | V(G) = E - N + 2 or D + 1 |
| MC/DC Tests | n + 1 (for n conditions) |
| Multiple Condition Tests | $2^n$ (for n conditions) |
| Mutation Score | Killed / (Total - Equivalent) × 100% |

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
