---
title: "Revision Questions: Input Domain Testing"
parent: Input Domain Testing
nav_order: 100
layout: default
---

# Revision Questions: Input Domain Testing (L05)

## Instructions
These questions cover the key concepts from L05 on input domain testing techniques. Use them for exam preparation and self-assessment.

---

## Section 1: Testing Fundamentals

### Q1.1 Core Definitions
**Question:** Match each testing term with its definition:

| Term | Definition |
|------|------------|
| A. Test Case | 1. Mechanism to determine correct output |
| B. Test Suite | 2. Values provided to system |
| C. Oracle | 3. Input + expected output + oracle |
| D. Test Input | 4. Collection of test cases |

<details>
<summary>Answer</summary>

A-3, B-4, C-1, D-2

- **Test Case** → Input + expected output + oracle
- **Test Suite** → Collection of test cases
- **Oracle** → Mechanism to determine correct output
- **Test Input** → Values provided to system
</details>

---

### Q1.2 Positive Test Bias
**Question:** What is positive test bias? How does it affect test coverage?

<details>
<summary>Answer</summary>

**Positive test bias** is the tendency of testers to gravitate toward inputs they expect to work (valid inputs).

**Effects on coverage:**
- Invalid partitions are under-tested
- Edge cases and error conditions are missed
- Testers confirm "it works" rather than finding where it breaks

**Research finding (Teasley 1994):** Groups rewarded for finding bugs detected significantly more real bugs than groups penalized for false alarms.

**Mitigation:** Explicitly plan negative testing for each equivalence class.
</details>

---

### Q1.3 Black-Box vs White-Box
**Question:** A tester has no access to source code and must test a payment gateway API. What testing approach should they use and why?

<details>
<summary>Answer</summary>

**Black-box testing** because:
- No source code access is available
- Tests are designed from specifications/API documentation
- Focus is on input-output behavior, not internal structure

**Recommended techniques:**
- Equivalence partitioning (amount ranges, payment types)
- Boundary value analysis (min/max amounts, limits)
- Decision tables (conditional logic like fraud checks)
</details>

---

## Section 2: Equivalence Partitioning

### Q2.1 Partition Requirements
**Question:** What two properties must equivalence partitions satisfy?

<details>
<summary>Answer</summary>

1. **Complete:** Every possible input belongs to some partition
2. **Disjoint:** No input belongs to multiple partitions

**Implication:** Every input value is covered exactly once.
</details>

---

### Q2.2 Weak vs Strong EP
**Question:** A system has three input variables with the following equivalence classes:
- Variable A: 4 classes
- Variable B: 3 classes
- Variable C: 5 classes

How many tests are needed for weak EP? For strong EP?

<details>
<summary>Answer</summary>

| Strategy | Formula | Result |
|----------|---------|--------|
| **Weak EP** | max(4, 3, 5) | **5 tests** |
| **Strong EP** | 4 × 3 × 5 | **60 tests** |

**Weak EP** uses the single-fault assumption - one value from each partition is sufficient.

**Strong EP** tests all combinations to detect interaction faults.
</details>

---

### Q2.3 Finding Equivalence Classes
**Question:** For a function that validates email addresses, identify at least 5 equivalence classes.

<details>
<summary>Answer</summary>

**Valid partitions:**
1. Standard email: `user@domain.com`
2. Email with subdomain: `user@mail.domain.com`
3. Email with plus sign: `user+tag@domain.com`

**Invalid partitions:**
4. Missing @ symbol: `userdomain.com`
5. Missing domain: `user@`
6. Multiple @ symbols: `user@@domain.com`
7. Empty string: ``
8. Too long (>254 characters)
9. Invalid characters: `user name@domain.com` (space)

**Key insight:** Include both valid AND invalid classes explicitly.
</details>

---

### Q2.4 Partition Heuristics
**Question:** Match the heuristic to its example:

| Heuristic | Example |
|-----------|---------|
| A. Range-based | 1. US regions (Northeast, South, Midwest, West) |
| B. Enumeration | 2. Age groups (0-12, 13-19, 20-64, 65+) |
| C. Error types | 3. Input that causes "File not found" error |

<details>
<summary>Answer</summary>

A-2, B-1, C-3

- **Range-based** → Age groups (numeric ranges)
- **Enumeration** → US regions (discrete set of values)
- **Error types** → One class per error type
</details>

---

## Section 3: Boundary Value Analysis

### Q3.1 Boundary Fault Types
**Question:** Classify each bug by its boundary fault type:

| Bug | Type |
|-----|------|
| A. `if (x < 10)` should be `if (x <= 10)` | ? |
| B. `if (x < 10)` should be `if (x < 11)` | ? |
| C. Upper bound check is missing | ? |

<details>
<summary>Answer</summary>

| Bug | Type |
|-----|------|
| A. `<` should be `≤` | **Closure bug** |
| B. Constant off by 1 | **Boundary shift** |
| C. Check not implemented | **Missing boundary** |
</details>

---

### Q3.2 ON/OFF Points
**Question:** For the condition `x >= 100`, identify:
a) The ON point
b) The OFF point
c) Is the boundary open or closed?

<details>
<summary>Answer</summary>

a) **ON point:** x = 100 (exactly on the boundary)

b) **OFF point:** x = 99 (just off boundary, in opposite processing region)

c) **Closed boundary** (≥ includes the boundary point)

**Rule:** For closed boundaries, the OFF point is **outside** the valid domain.
</details>

---

### Q3.3 BVA Test Count
**Question:** A function takes 3 input variables. How many test cases does:
a) Basic BVA require?
b) Robust BVA require?

<details>
<summary>Answer</summary>

**Formulas:**
- Basic BVA: 4k + 1
- Robust BVA: 6k + 1

**For k = 3:**

a) **Basic BVA:** 4(3) + 1 = **13 tests**

b) **Robust BVA:** 6(3) + 1 = **19 tests**

Robust BVA adds values beyond boundaries (min-ε, max+ε).
</details>

---

### Q3.4 Closed vs Open Intervals
**Question:** For the valid range 1 < x < 100, which test points should be used?

<details>
<summary>Answer</summary>

**Open interval (excludes boundaries):**

| Test Point | Purpose |
|------------|---------|
| 1 | Left boundary (excluded) |
| **2** | Just inside left |
| 50 | Nominal interior |
| **99** | Just inside right |
| 100 | Right boundary (excluded) |

**Key:** For open boundaries, OFF points are **inside** the domain (2 and 99).
</details>

---

### Q3.5 BVA Limitations
**Question:** Name three limitations of boundary value analysis.

<details>
<summary>Answer</summary>

1. **Assumes case-like processing** - doesn't handle loops that modify input
2. **Coincidental correctness** - bug exists but test happens to pass
3. **ε-limit problems** - floating-point precision varies across platforms
4. **Requires detailed specification** - boundaries must be documented
5. **OFF point undefined** for some closed domains
</details>

---

## Section 4: Decision Tables

### Q4.1 Decision Table Components
**Question:** What are the four main components of a decision table?

<details>
<summary>Answer</summary>

1. **Conditions** - Input variables (rows in condition section)
2. **Condition values** - Y/N or enumerated values per rule
3. **Rules** - Columns representing each condition combination
4. **Actions** - Output behaviors triggered by each rule

**Bonus:** **Don't care** values (`-` or `*`) - value doesn't affect outcome
</details>

---

### Q4.2 Rule Count
**Question:** A decision table has 3 binary conditions (Y/N). How many rules are needed before consolidation?

<details>
<summary>Answer</summary>

$$\text{Rules} = 2^3 = 8$$

Each binary condition has 2 values, so total combinations = product of all values.
</details>

---

### Q4.3 Checksum Verification
**Question:** After consolidation, a decision table has 5 rules that cover {2, 3, 1, 4, 2} original rules. Was the consolidation correct if the original table had 12 rules?

<details>
<summary>Answer</summary>

**Checksum:** 2 + 3 + 1 + 4 + 2 = **12** ✓

Yes, the consolidation is **correct**. The sum of covered rules equals the original count.
</details>

---

### Q4.4 The 8-Step Method
**Question:** Put the Beizer 8-step decision table method in correct order:

A. Specify expected outputs per rule
B. List conditions with values
C. Verify checksum
D. Fill columns with all combinations
E. Develop test cases (one per rule)
F. List equivalent responses (actions)
G. Calculate number of rules
H. Identify common actions → consolidate

<details>
<summary>Answer</summary>

1. F - List equivalent responses (actions)
2. B - List conditions with values
3. G - Calculate number of rules
4. D - Fill columns with all combinations
5. A - Specify expected outputs per rule
6. H - Identify common actions → consolidate
7. C - Verify checksum
8. E - Develop test cases (one per rule)
</details>

---

### Q4.5 When to Use Decision Tables
**Question:** Which scenarios are good fits for decision table testing?

| Scenario | Good Fit? |
|----------|-----------|
| A. Tax calculation with multiple brackets and deductions | ? |
| B. Performance testing under load | ? |
| C. Access control based on role, department, and time | ? |
| D. Continuous output (temperature prediction) | ? |

<details>
<summary>Answer</summary>

| Scenario | Good Fit? | Reason |
|----------|-----------|--------|
| A. Tax calculation | **Yes** | Logical combinations, clear outcomes |
| B. Performance testing | **No** | Not about logical conditions |
| C. Access control | **Yes** | Permission rules, discrete actions |
| D. Continuous output | **No** | Actions must be discrete, not continuous |
</details>

---

## Section 5: Combinatorial Testing

### Q5.1 The 90% Finding
**Question:** According to NIST research, what percentage of software failures are triggered by 1-2 way parameter interactions?

<details>
<summary>Answer</summary>

**90% or more** of software failures are triggered by 1-2 way interactions.

Specific findings:
| Domain | % at 2-way |
|--------|------------|
| Medical devices | 97% |
| Web servers | 95% |
| Browser | 95% |
| NASA | 93% |
| FAA | 98% |

**Maximum observed interaction:** 6-way (extremely rare)
</details>

---

### Q5.2 Pairwise Test Reduction
**Question:** A configuration has 34 binary switches. Compare the test counts:
a) All combinations
b) Pairwise (2-way)

<details>
<summary>Answer</summary>

a) **All combinations:** 2^34 ≈ **17.2 billion tests**

b) **Pairwise:** approximately **29 tests**

**Reduction factor:** ~600 million times fewer tests!

This demonstrates the power of combinatorial testing for configuration testing.
</details>

---

### Q5.3 Interaction Strength Selection
**Question:** Match the testing context to the appropriate interaction strength:

| Context | Strength |
|---------|----------|
| A. General UI testing | ? |
| B. Medical device software | ? |
| C. Business-critical financial system | ? |

<details>
<summary>Answer</summary>

| Context | Strength | Reason |
|---------|----------|--------|
| A. UI testing | **2-way (pairwise)** | Most faults at low interaction |
| B. Medical device | **4-6 way** | Safety-critical, need high assurance |
| C. Financial system | **3-way** | Business-critical, balance cost/risk |
</details>

---

### Q5.4 Combinatorial Testing Limitations
**Question:** Name three limitations of combinatorial testing.

<details>
<summary>Answer</summary>

1. **Requires proper partitioning first** - EP/BVA still needed to define values
2. **Timing issues not covered** - race conditions, sequence dependencies
3. **Masking can hide faults** - multiple faults may cancel each other
4. **Tool-generated tests need oracles** - tools don't know expected outputs
5. **Constraint handling** - invalid combinations must be excluded
</details>

---

## Section 6: Technique Selection

### Q6.1 Technique Matching
**Question:** Match each scenario to the best primary technique:

| Scenario | Technique |
|----------|-----------|
| A. Testing a numeric range 1-100 | ? |
| B. Testing a system with 20 configuration options | ? |
| C. Testing ATM withdrawal with multiple conditions | ? |
| D. Testing user types: admin, manager, user, guest | ? |

<details>
<summary>Answer</summary>

| Scenario | Technique |
|----------|-----------|
| A. Numeric range 1-100 | **BVA** (boundary-sensitive) |
| B. 20 configuration options | **Combinatorial/Pairwise** (many parameters) |
| C. ATM withdrawal conditions | **Decision Tables** (multiple conditions → actions) |
| D. User types | **Equivalence Partitioning** (discrete categories) |
</details>

---

### Q6.2 Integration Order
**Question:** What is the recommended order for combining input domain techniques?

<details>
<summary>Answer</summary>

1. **Equivalence Partitioning** - identify input categories
2. **Boundary Value Analysis** - test partition edges
3. **Decision Tables** - handle complex condition combinations
4. **Combinatorial/Pairwise** - optimize for parameter interactions

**Pattern:**
```
Specification → EP → BVA → Decision Tables → Combinatorial
```
</details>

---

## Exam-Style Questions

### E1. Short Answer (5 marks)
**Question:** Explain why boundary value analysis complements equivalence partitioning rather than replacing it.

<details>
<summary>Model Answer</summary>

**EP and BVA are complementary because:**

1. **EP identifies partitions** - divides input space into classes with similar behavior
2. **BVA focuses on boundaries** - where most faults actually occur

**Without EP:** BVA wouldn't know what boundaries to test
**Without BVA:** EP might miss off-by-one errors at partition edges

**Example:** For age validation (0-12, 13-19, 20-64, 65+):
- EP selects: 5, 15, 30, 70 (one per class)
- BVA adds: 0, 12, 13, 19, 20, 64, 65 (boundary points)

Together, they provide both coverage of categories AND focus on high-defect areas.
</details>

---

### E2. Calculation (10 marks)
**Question:** A login system has the following conditions:
- Username valid? (Y/N)
- Password valid? (Y/N)
- Account active? (Y/N)

a) Create a complete decision table
b) Consolidate using don't-care values
c) Verify your consolidation with checksum

<details>
<summary>Model Answer</summary>

**a) Complete decision table (8 rules):**

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|-|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Username valid? | Y | Y | Y | Y | N | N | N | N |
| Password valid? | Y | Y | N | N | Y | Y | N | N |
| Account active? | Y | N | Y | N | Y | N | Y | N |
| **Actions** | | | | | | | | |
| Login success | ✓ | | | | | | | |
| Show "Account inactive" | | ✓ | | ✓ | | | | |
| Show "Invalid credentials" | | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**b) Consolidated table (3 rules):**

| | R1 | R2 | R3 |
|-|:--:|:--:|:--:|
| Username valid? | Y | Y | * |
| Password valid? | Y | * | N |
| Account active? | Y | N | * |
| **Actions** | | | |
| Login success | ✓ | | |
| Show "Account inactive" | | ✓ | |
| Show "Invalid credentials" | | | ✓ |

**Covers:** R1=1, R2=2, R3=5

**c) Checksum:** 1 + 2 + 5 = **8** ✓
</details>

---

### E3. Critical Analysis (15 marks)
**Question:** A team decides to use only pairwise testing for a safety-critical medical device control system. Evaluate this decision.

<details>
<summary>Model Answer</summary>

**This decision is problematic for several reasons:**

**1. Research shows higher-order interactions in medical devices:**
- Wallace & Kuhn (2001) found 97% of medical device faults at 2-way
- But 3% of faults require 3-4 way testing
- Maximum observed was 4-way interactions
- For safety-critical: that 3% could mean patient harm

**2. Pairwise testing limitations:**
- Doesn't replace proper EP/BVA foundation
- Timing and sequence issues not covered
- Masking can hide critical faults
- Tool-generated tests need proper oracles

**3. Regulatory requirements:**
- FDA/IEC 62304 may require more rigorous testing
- Pairwise alone may not meet Class C device requirements
- Risk-based testing needs higher coverage for critical functions

**Recommendations:**
1. Use **4-6 way** combinatorial testing for safety-critical functions
2. Combine with EP, BVA, and decision tables
3. Add specialized safety testing (FMEA, fault injection)
4. Document risk assessment for coverage decisions
5. Consider 2-way for non-critical functions to balance cost

**Conclusion:** Pairwise is insufficient as the sole technique for safety-critical systems. A multi-technique approach with higher interaction strength is required.
</details>

---

## Quick Reference Formulas

| Technique | Formula |
|-----------|---------|
| Weak EP | max(|classes|) tests |
| Strong EP | ∏|classes| tests |
| Basic BVA | 4k + 1 tests (k variables) |
| Robust BVA | 6k + 1 tests |
| Decision table rules | ∏(condition values) |
| Pairwise | ~log₂(n) growth |

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
