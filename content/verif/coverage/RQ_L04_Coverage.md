---
title: "Revision Questions: Adequacy Criteria"
parent: Coverage
nav_order: 100
layout: default
---

# L04: Adequacy Criteria — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Coverage Categories

Match each coverage category with its focus area:

| Category | Focus |
|----------|-------|
| A. White Box | 1. Input space |
| B. Black Box | 2. Code structure |
| C. Mutation | 3. Specification |
| D. Requirements | 4. Fault detection |

---

## Question 2: Coverage Formula

A test suite executes 45 out of 60 statements. What is the statement coverage?

---

## Question 3: Two Uses of Coverage

What are the two ways coverage criteria can be used? Explain each with an example.

---

## Question 4: Statement Coverage Weakness

Consider this code:

```python
x = 0
if condition:
    x = 4
y = z / x
```

A test with `condition=True` achieves 100% statement coverage. Why is this problematic?

---

## Question 5: Branch vs Statement

How many tests are needed for 100% branch coverage on an `if-else` statement? How does this compare to statement coverage?

---

## Question 6: Compound Predicate Problem

For `if (A && B)`, branch coverage requires only 2 tests. What combination is never tested, and why is this a problem?

---

## Question 7: Cyclomatic Complexity Calculation

A control flow graph has 10 edges and 8 nodes. Calculate $V(G)$.

---

## Question 8: Alternative Formula

A function has 5 decision points (if, while, etc.). What is its cyclomatic complexity?

---

## Question 9: Basis Path vs All Paths

Why is basis path coverage preferred over all-path coverage? Complete this table:

| Decisions | All Paths | Basis Paths |
|-----------|-----------|-------------|
| 4 | ? | ? |
| 10 | ? | ? |

---

## Question 10: Unfeasible Paths

What is an unfeasible path? Give an example.

---

## Question 11: Condition Coverage Test Count

For predicate `if (A && B)`, how many tests does each coverage type require?

| Coverage Type | Tests Required |
|---------------|----------------|
| Basic Condition | ? |
| Multiple Condition | ? |
| MC/DC | ? |

---

## Question 12: MC/DC Requirements

What are the three requirements for MC/DC coverage?

---

## Question 13: MC/DC Test Count

How many tests are needed for MC/DC coverage of a predicate with 5 conditions? Compare to Multiple Condition coverage ($2^5$).

---

## Question 14: MC/DC Independence Pairs

For `if (A && B && C)`, construct a minimal MC/DC test suite showing which pairs demonstrate each condition's independence.

---

## Question 15: MC/DC Standards

Which safety-critical standards require or recommend MC/DC? Match standard to domain:

| Standard | Domain |
|----------|--------|
| DO-178C | ? |
| ISO 26262 | ? |
| IEC 62304 | ? |

---

## Question 16: Mutation Score

A test suite kills 72 mutants out of 100 total. 10 are equivalent mutants. What is the mutation score?

---

## Question 17: Mutation Operators

Name five categories of mutation operators and give an example of each.

---

## Question 18: Pairwise Testing

4 parameters x 3 values each = 81 exhaustive combinations. How many tests does pairwise testing typically require? Why is this sufficient?

---

## Question 19: N-Switch Coverage

What is the difference between 0-switch, 1-switch, and 2-switch coverage?

---

## Question 20: Coverage Limitations

What does coverage measure, and what does it NOT measure? Complete the table:

| Coverage Measures | Does NOT Measure |
|-------------------|------------------|
| ? | Oracle correctness |
| ? | Missing code |
| ? | Requirements coverage |

---

## Question 21: Size Confounding

Inozemtseva & Holmes (2014) found that coverage-effectiveness correlation drops to ~0 when controlling for what variable? What percentage of the coverage effect does test suite size explain?

---

## Question 22: Assertions vs Coverage

According to Zhang & Mesbah (2015), what has a stronger correlation with test effectiveness: coverage or assertion quantity?

---

## Question 23: Coverage Criteria Effectiveness

According to Hemmati (2015), what percentage of faults does statement coverage detect? What about data-flow coverage?

---

## Question 24: Coverage Anti-Patterns

List three coverage anti-patterns and explain why each is problematic.

---

## Question 25: Coverage Level Selection

Match each context with the appropriate coverage criterion:

| Context | Criterion |
|---------|-----------|
| A. Minimum bar for any code | 1. MC/DC |
| B. Default for unit tests | 2. Statement |
| C. Safety-critical (DO-178C Level A) | 3. Branch |
| D. Complex control flow | 4. Basis Path |

---

## Question 26: Coverage Targets

What are the recommended minimum and target coverage levels?

| Coverage | Min | Target |
|----------|-----|--------|
| Statement | ? | ? |
| Branch | ? | ? |
| Mutation | ? | ? |

---

## Question 27: Tool Matching

Match the coverage tool to its language:

| Tool | Language |
|------|----------|
| A. JaCoCo | 1. Python |
| B. Coverage.py | 2. Java |
| C. LLVM-cov | 3. JavaScript |
| D. c8 | 4. C/C++ |

---

## Question 28: Oracle Problem

What is the oracle problem in software testing? What are some mitigations?

---

## Question 29: Branch Coverage and Mutation Relation

What is the relationship between branch coverage and mutation testing? Does one subsume the other?

---

## Practical Problems

---

## Question 30: Branch vs Statement Coverage (Practical)

Explain why branch coverage is considered stronger than statement coverage. Provide a code example where 100% statement coverage fails to detect a fault that branch coverage would catch.

---

## Question 31: MC/DC Calculation (Practical)

Given predicate `if ((A || B) && C)`:
a) How many tests for Multiple Condition coverage?
b) Construct a minimal MC/DC test suite
c) Show independence pairs for each condition

---

## Question 32: Critical Analysis (Practical)

A project manager claims: "We achieved 95% code coverage, so our software is thoroughly tested." Critically evaluate this claim using evidence from recent research.

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Coverage fundamentals | Q1, Q2, Q3 |
| Statement & branch coverage | Q4, Q5, Q6, Q30 |
| Cyclomatic complexity & basis path | Q7, Q8, Q9, Q10 |
| Condition coverage & MC/DC | Q11, Q12, Q13, Q14, Q15, Q31 |
| Mutation & combinatorial | Q16, Q17, Q18, Q19 |
| Coverage vs quality | Q20, Q21, Q22, Q23, Q24, Q32 |
| Practical application | Q25, Q26, Q27 |
| Testing theory | Q28, Q29 |
