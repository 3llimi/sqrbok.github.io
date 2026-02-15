---
title: "Revision Questions: Input Domain Testing"
parent: Input Domain Testing
nav_order: 100
layout: default
---

# L05: Input Domain Testing — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Core Definitions

Match each testing term with its definition:

| Term | Definition |
|------|------------|
| A. Test Case | 1. Mechanism to determine correct output |
| B. Test Suite | 2. Values provided to system |
| C. Oracle | 3. Input + expected output + oracle |
| D. Test Input | 4. Collection of test cases |

---

## Question 2: Positive Test Bias

What is positive test bias? How does it affect test coverage?

---

## Question 3: Black-Box vs White-Box

A tester has no access to source code and must test a payment gateway API. What testing approach should they use and why?

---

## Question 4: Partition Requirements

What two properties must equivalence partitions satisfy?

---

## Question 5: Weak vs Strong EP

A system has three input variables with the following equivalence classes:
- Variable A: 4 classes
- Variable B: 3 classes
- Variable C: 5 classes

How many tests are needed for weak EP? For strong EP?

---

## Question 6: Finding Equivalence Classes

For a function that validates email addresses, identify at least 5 equivalence classes.

---

## Question 7: Partition Heuristics

Match the heuristic to its example:

| Heuristic | Example |
|-----------|---------|
| A. Range-based | 1. US regions (Northeast, South, Midwest, West) |
| B. Enumeration | 2. Age groups (0-12, 13-19, 20-64, 65+) |
| C. Error types | 3. Input that causes "File not found" error |

---

## Question 8: Boundary Fault Types

Classify each bug by its boundary fault type:

| Bug | Type |
|-----|------|
| A. `if (x < 10)` should be `if (x <= 10)` | ? |
| B. `if (x < 10)` should be `if (x < 11)` | ? |
| C. Upper bound check is missing | ? |

---

## Question 9: ON/OFF Points

For the condition `x >= 100`, identify:
a) The ON point
b) The OFF point
c) Is the boundary open or closed?

---

## Question 10: BVA Test Count

A function takes 3 input variables. How many test cases does:
a) Basic BVA require?
b) Robust BVA require?

*Hint: Basic BVA = 4k + 1, Robust BVA = 6k + 1*

---

## Question 11: Closed vs Open Intervals

For the valid range $1 < x < 100$, which test points should be used?

---

## Question 12: BVA Limitations

Name three limitations of boundary value analysis.

---

## Question 13: Decision Table Components

What are the four main components of a decision table?

---

## Question 14: Rule Count

A decision table has 3 binary conditions (Y/N). How many rules are needed before consolidation?

---

## Question 15: Checksum Verification

After consolidation, a decision table has 5 rules that cover {2, 3, 1, 4, 2} original rules. Was the consolidation correct if the original table had 12 rules?

---

## Question 16: The 8-Step Method

Put the Beizer 8-step decision table method in correct order:

A. Specify expected outputs per rule
B. List conditions with values
C. Verify checksum
D. Fill columns with all combinations
E. Develop test cases (one per rule)
F. List equivalent responses (actions)
G. Calculate number of rules
H. Identify common actions → consolidate

---

## Question 17: When to Use Decision Tables

Which scenarios are good fits for decision table testing?

| Scenario | Good Fit? |
|----------|-----------|
| A. Tax calculation with multiple brackets and deductions | ? |
| B. Performance testing under load | ? |
| C. Access control based on role, department, and time | ? |
| D. Continuous output (temperature prediction) | ? |

---

## Question 18: The 90% Finding

According to NIST research, what percentage of software failures are triggered by 1-2 way parameter interactions?

---

## Question 19: Pairwise Test Reduction

A configuration has 34 binary switches. Compare the test counts:
a) All combinations
b) Pairwise (2-way)

---

## Question 20: Interaction Strength Selection

Match the testing context to the appropriate interaction strength:

| Context | Strength |
|---------|----------|
| A. General UI testing | ? |
| B. Medical device software | ? |
| C. Business-critical financial system | ? |

---

## Question 21: Combinatorial Testing Limitations

Name three limitations of combinatorial testing.

---

## Question 22: Technique Matching

Match each scenario to the best primary technique:

| Scenario | Technique |
|----------|-----------|
| A. Testing a numeric range 1-100 | ? |
| B. Testing a system with 20 configuration options | ? |
| C. Testing ATM withdrawal with multiple conditions | ? |
| D. Testing user types: admin, manager, user, guest | ? |

---

## Question 23: Integration Order

What is the recommended order for combining input domain techniques?

---

## Practical Problems

---

## Question 24: EP and BVA Relationship (Practical)

Explain why boundary value analysis complements equivalence partitioning rather than replacing it. Provide an example.

---

## Question 25: Decision Table Construction (Practical)

A login system has the following conditions:
- Username valid? (Y/N)
- Password valid? (Y/N)
- Account active? (Y/N)

a) Create a complete decision table
b) Consolidate using don't-care values
c) Verify your consolidation with checksum

---

## Question 26: Critical Analysis (Practical)

A team decides to use only pairwise testing for a safety-critical medical device control system. Evaluate this decision.

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Testing fundamentals | Q1, Q2, Q3 |
| Equivalence partitioning | Q4, Q5, Q6, Q7 |
| Boundary value analysis | Q8, Q9, Q10, Q11, Q12 |
| Decision tables | Q13, Q14, Q15, Q16, Q17, Q25 |
| Combinatorial testing | Q18, Q19, Q20, Q21, Q26 |
| Technique selection | Q22, Q23 |
| Practical problems | Q24, Q25, Q26 |
