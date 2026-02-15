---
title: "Revision Questions: Random Testing"
parent: Random Testing
nav_order: 100
layout: default
---

# L06: Random Testing — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: What Makes Random Testing "Random"

What makes random testing "random" in the technical sense? What three conditions must be satisfied (Hamlet 1984)?

---

## Question 2: Random vs Partition Testing

When would random testing be a poor choice compared to partition testing?

---

## Question 3: Statistical Confidence Limits

A colleague says "we ran 10,000 random tests with no failures, so the software is bug-free." What is wrong with this claim? Use the formula $C = 1-(1-F)^N$.

---

## Question 4: Reliability Calculation

Calculate how many random tests are needed for 95% confidence that the failure rate is below 1 in 10,000.

*Hint: Use $N = \frac{\ln(1-C)}{\ln(1-F)}$*

---

## Question 5: Randoop Plateau Effect

What is the "plateau effect" in Randoop and what causes it?

---

## Question 6: Hamlet's Argument for Random Testing

Why did Hamlet (2006) argue that "only random testing will do" in certain scenarios? Name two such scenarios.

---

## Question 7: Oracle and Effectiveness

Explain the relationship between the oracle and the effectiveness of random testing. Compare crash detection, sanitizers, properties, and differential oracles.

---

## Question 8: Fuzz vs Random Testing

How does fuzz testing differ from random testing, and when would you choose fuzzing over general random testing?

---

## Question 9: Three Generations of Fuzzing

Explain the three generations of fuzzing (blackbox, whitebox, greybox) and why greybox fuzzing "won."

---

## Question 10: Miller's Persistent Bug Classes

Miller's fuzz studies found the same bug classes persisting for 16 years (1990-2006). What does this tell us about the software industry?

---

## Question 11: Directed Greybox Fuzzing

What is directed greybox fuzzing and why was AFLGo able to find Heartbleed in 20 minutes when symbolic execution failed in 24 hours?

---

## Question 12: Crash Count vs Bug Count

Why is the finding that "57,142 unique crashes = only 9 actual bugs" (Klees 2018) important for fuzzing practice?

---

## Question 13: Multiple Fuzzers

Why does running multiple different fuzzers on the same target find 50% more bugs than any single tool?

---

## Question 14: QuickCheck Bug Distribution

QuickCheck found bugs equally in implementations, specifications, and generators. Why is this surprising?

---

## Question 15: Hypothesis Byte-Stream Representation

What problem does Hypothesis's "universal byte-stream representation" solve?

---

## Question 16: JQF Improvement

How does JQF achieve a 1,000x improvement over random PBT?

---

## Question 17: PBT Property Challenge

Why do 16 out of 30 PBT practitioners say "not knowing what properties to test" is the biggest challenge (Goldstein 2024)?

---

## Question 18: PBT vs Fuzzing Time Budgets

Compare the time budgets of PBT (50ms-30s) versus fuzzing campaigns (hours/days). What does this reveal about their integration patterns?

---

## Question 19: Coupling Effect

Explain the coupling effect and why it justifies testing with simple mutations only.

---

## Question 20: Equivalent Mutant Problem

Why is the equivalent mutant problem considered the most persistent challenge in mutation testing?

---

## Question 21: Small vs Large LLMs for Mutant Detection

Why does a smaller code-specific model (UniXCoder, 110M parameters) outperform GPT-4 on equivalent mutant detection (Tian 2024)?

---

## Question 22: Crossfire Phenomenon

What is the "crossfire" phenomenon in mutation testing?

---

## Question 23: Mutation Score Target

A team achieves 85% mutation score. Should they aim for 100%? Why or why not?

---

## Question 24: Mutation vs PBT Comparison

Compare how mutation testing and property-based testing approach test quality. How are they complementary?

---

## Question 25: Branch Coverage and Mutation

What is the relation between branch coverage and mutation testing? Does one subsume the other?

---

## Question 26: Random vs Partition — Short Answer

Is random testing better than partition testing? Under what conditions does each approach excel?

---

## Question 27: Fuzz Testing Definition

What is fuzz testing? How is it different from random testing? Compare inputs, focus, and oracle.

---

## Question 28: Oracle Problem

What is the oracle problem? Why is it the bottleneck of random testing?

---

## Question 29: Oracle Evolution

Trace the evolution of oracles across the four techniques: random testing, fuzz testing, property-based testing, and mutation testing.

---

## Question 30: Single Technique Selection

If you could only apply one technique from this lecture to a new project, which would you choose and why? Consider different project types.

---

## Question 31: Bug Classes vs Tool Progress

The same bug classes persisted for 16 years (Miller studies). Meanwhile, LLMs detect 86% of equivalent mutants. What does this contrast tell us?

---

## Practical Problems

---

## Question 32: Testing Strategy Design (Practical)

Design a testing strategy for a JSON parser that combines techniques from all four topics (random testing, fuzzing, PBT, mutation testing).

---

## Question 33: JQF's Significance (Practical)

Why might JQF's convergence of PBT and fuzzing be the most significant development across all four topics? Explain how it resolves limitations of both approaches.

---

## Question 34: Pesticide Paradox (Practical)

Explain how the "pesticide paradox" applies across all four testing techniques covered in this lecture. What is the universal mitigation?

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Random testing basics | Q1, Q2, Q3 |
| Random testing theory | Q4, Q5, Q6, Q7 |
| Fuzz testing | Q8, Q9, Q10, Q11, Q12, Q13 |
| Property-based testing | Q14, Q15, Q16, Q17, Q18 |
| Mutation testing | Q19, Q20, Q21, Q22, Q23 |
| Comparisons | Q24, Q25, Q26, Q27, Q28 |
| Cross-cutting | Q29, Q30, Q31 |
| Practical problems | Q32, Q33, Q34 |
