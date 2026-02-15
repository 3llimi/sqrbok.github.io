---
title: "Revision Questions: Combinatorial Testing"
parent: Combinatorial Testing
nav_order: 100
layout: default
---

# A07: Combinatorial Testing — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Covering Array Construction

Given a system with 3 parameters (A, B, C), each with 2 values (0, 1):

a) List all possible 2-way (pairwise) combinations that must be covered.
b) Construct a covering array that covers all pairs. What is the minimum number of rows?
c) How does this compare to exhaustive testing (2³ = 8)?

*Hint: There are C(3,2) × 2² = 12 pairs to cover.*

---

## Question 2: Logarithmic Growth Explanation

A system has 20 parameters, each with 3 values.

a) How many exhaustive test cases exist?
b) Approximately how many pairwise tests are needed? (Use the AETG result: ~18 tests for this configuration.)
c) If we double to 40 parameters, the pairwise count increases to ~21. Explain why doubling parameters barely changes the test count.
d) If we increase from 2-way to 3-way for the original 20 parameters, how does the test count change? Explain why strength increases are expensive.

---

## Question 3: NIST Fault Interaction Data

Kuhn et al. (2004) found these cumulative fault detection rates:

| Domain | 2-way | 3-way | 4-way |
|--------|-------|-------|-------|
| NASA | 93% | 98% | 100% |
| Medical | 97% | 99% | 100% |
| Mozilla | 76% | 95% | — |

a) What does "93% at 2-way" mean practically?
b) A safety-critical medical device team uses pairwise testing. Is this sufficient? What would you recommend?
c) Why does Mozilla have a lower 2-way detection rate than medical devices?
d) What is the maximum interaction strength needed across ALL studied projects? What does this imply for testing strategy?

---

## Question 4: IPOG Algorithm Trace

Trace the IPOG algorithm for 3 parameters (P1, P2, P3), each with values {0, 1, 2}, at strength t=2.

a) **Phase 1:** What is the initial test set for P1 and P2?
b) **Phase 2 (Horizontal Growth):** Extend each row with a value for P3 that covers the most uncovered (P1,P3) and (P2,P3) pairs.
c) **Phase 3 (Vertical Growth):** Which pairs (if any) remain uncovered? Add rows with don't-care values to cover them.
d) How many rows does your final array have?

---

## Question 5: AETG vs IPOG

Compare the AETG (1997) and IPOG (2007) algorithms:

a) What is the fundamental difference in their approach? (Hint: "one-X-at-a-time")
b) Which has lower computational complexity and why?
c) Which serves as the basis for the ACTS tool?
d) In what scenario might AETG produce smaller test suites than IPOG?

---

## Question 6: Constraint Handling

A date testing model has parameters: Day (1-31), Month (Jan-Dec), Year (leap/non-leap).

a) Give two examples of invalid combinations.
b) Explain the "Avoid" strategy for handling these constraints.
c) Why can't you simply remove invalid rows from the covering array after generation?
d) How does CASA handle constraints differently from ACTS?

---

## Question 7: Industrial Evidence Analysis

Hu et al. (2020) found that CT detected 93.3% of multi-factor faults while in-house teams detected only 6.7%.

a) Why is the gap so dramatic for multi-factor faults?
b) For single-factor faults, the gap narrows (89.3% vs 71.4%). Why does CT still outperform?
c) Name three barriers to CT adoption that Hu identified.
d) How would you address the barrier that "ACTS can't generate executable test scripts"?

---

## Question 8: Choosing Interaction Strength

You are testing a web application with the following parameters:
- Authentication: username, password, MFA method (3 params — security-critical)
- UI: theme, language, font size (3 params — low risk)
- Payment: card type, amount, currency (3 params — medium risk)

a) What interaction strength would you recommend for each group?
b) How could mixed-strength arrays help reduce the total test count?
c) If pairwise testing reveals no faults, does that prove the system is correct? Why or why not?

---

## Question 9: Autonomous Driving CT (Tao 2019)

Tao et al. applied CT to Autonomous Emergency Braking at AVL List GmbH.

a) Why is exhaustive physical testing infeasible for autonomous driving?
b) Describe the end-to-end pipeline: from domain ontology to test results.
c) The model had 37 parameters and 39 constraints. Why is constraint handling critical in this domain?
d) Only 2-way (pairwise) coverage was used. What would be the implications of increasing to 3-way?

---

## Question 10: Seed Reuse Strategy

A team has a pairwise (2-way) test suite of 500 tests and needs to increase to 3-way coverage.

a) According to Bombarda (2025), should they use the existing tests as seeds? Which tool should they use?
b) What happens if they try to use partial test cases (rows with missing values) as seeds?
c) A different team wants to reuse tests to complete an incomplete 2-way suite (60% complete). Is seeding beneficial here?

---

## Question 11: CT for ML Dataset Quality

Lanus et al. (2021) found that a smaller dataset had higher 2-way combinatorial coverage (0.93) than a larger dataset (0.83).

a) What does "2-way combinatorial coverage of a dataset" mean?
b) Why doesn't dataset size guarantee representativeness?
c) How could the SDCCM metric predict transfer learning performance drops?
d) Give one practical application of CCM metrics for an ML engineering team.

---

## Question 12: Tool Selection

For each scenario, recommend a tool (ACTS, PICT, or CASA) and explain your reasoning:

a) A medical device with 15 parameters, strict constraints, and safety-critical testing requirements.
b) A web application CI pipeline that needs to regenerate tests on every commit.
c) An embedded system with 50 parameters and complex interdependent constraints.
d) A team that needs to increase from 2-way to 3-way and has an existing 2-way suite.

---

## Question 13: Calculation Problem

A mobile app has the following test parameters:
- OS: {iOS, Android} (2 values)
- Browser: {Chrome, Safari, Firefox} (3 values)
- Screen: {Small, Medium, Large} (3 values)
- Network: {WiFi, 4G, 3G} (3 values)
- Language: {EN, FR, DE} (3 values)

a) Calculate the exhaustive test count.
b) Using the AETG logarithmic growth principle, estimate the pairwise test count. (Hint: for 5 params with max 3 values, expect ~15-18 tests.)
c) If testing takes 10 minutes per test case, compare the total testing time for exhaustive vs pairwise.
d) A constraint says "Safari only works on iOS." How does this affect the covering array?

---

## Question 14: Algorithm Taxonomy

Zeb et al. (2025) classified CT algorithms into five categories.

a) Name the five categories and give one example algorithm for each.
b) Which category has been the most successful historically?
c) What is a "hyper-heuristic" and why is it considered the emerging frontier?
d) Why might a mix strategy outperform a standard (single) metaheuristic?

---

## Question 15: Comprehensive Comparison

Compare the following three testing approaches for a system with 10 parameters, 3 values each:

| Approach | Tests | What It Guarantees |
|----------|-------|-------------------|
| 1-way | ? | ? |
| 2-way (pairwise) | ? | ? |
| Exhaustive | ? | ? |

a) Fill in the table with approximate test counts and what each guarantees.
b) Which approach would you use for: (i) a prototype, (ii) a production web app, (iii) a medical device controller?
c) What additional technique would you combine with CT for maximum effectiveness?

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Covering arrays | Q1, Q2, Q15 |
| NIST fault interaction data | Q3 |
| IPOG algorithm | Q4 |
| AETG vs IPOG | Q5 |
| Constraint handling | Q6 |
| Industrial evidence | Q7 |
| Interaction strength | Q3, Q8 |
| Autonomous driving CT | Q9 |
| Seed reuse | Q10 |
| CT for ML datasets | Q11 |
| Tool selection | Q12 |
| Calculation problems | Q13 |
| Algorithm taxonomy | Q14 |
