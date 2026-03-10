---
title: "Revision Questions: Classification Tree Method"
parent: Input Domain Testing
nav_order: 102
layout: default
---

# Revision Questions: Classification Tree Method

## Purpose
27 reflection questions for exam preparation. Use alongside `sn_classification_tree.md` for detailed explanations. Questions focus on understanding and application, not memorization.

---

## Part 1: Introduction & Motivation

1. Why was CTM developed? What specific problems with Category-Partition does it address?
2. A colleague says "We don't need CTM — our testers are experienced and know what to test." How would you respond using evidence?
3. Evaluate the strength of empirical evidence for CTM. What are its limitations?
4. Why do the industrial results showing >90% test reduction not necessarily mean CTM is 90% more efficient?
5. How does CTM relate to the broader context of combinatorial testing?

---

## Part 2: Core Concepts

6. A test object violates the "restful" property — it retains state between invocations. What problems does this cause for CTM?
7. Given this specification, identify the test-relevant aspects and their classes: "A shipping calculator charges based on package weight (up to 50kg), destination (domestic/international), and delivery speed (standard 5-day, express 2-day, overnight). Packages over 50kg are rejected."
8. Explain the difference between composition and classification using a real-world example not from the lectures.
9. Why must invalid cases be in a separate branch? Show what goes wrong with a concrete example if you put them inside each classification.
10. Why are only classes test-selectable, and not compositions or classifications?
11. What is the relationship between equivalence partitioning (EP) and CTM classes?

---

## Part 3: The CTM Process

12. You're testing a mobile banking app. How does choosing "the transfer screen" vs "the entire app" as test object change your classification tree?
13. Apply probing questions to the function `search(database, query, filters, sortBy)` and build a classification tree.
14. Why does Grindal et al. recommend "Avoid" as the best constraint strategy? When might you choose "Replace" instead?
15. Compare minimality and pairwise (2-wise) generation. When would you choose each?
16. What does E[T] = 0.26 mean in practical terms? How would you improve it?
17. Chen et al. proved two formal guarantees about tree restructuring. Why are these guarantees important?

---

## Part 4: Examples & Practice

18. Build a classification tree for an ATM withdrawal function. Include at least 4 aspects and model invalid cases.
19. In the tax example, what would go wrong if you modeled Residency, Marital Status, and Gross Pay as a flat tree (all at root level) instead of nesting Status and Pay under the Resident class? How does hierarchy eliminate infeasible combinations?
20. You have this abstract test specification: "Array: size > 1, unsorted, multiple occurrences, alphanumeric content. CountWhat: multiple characters." Provide three different valid concrete test cases.
21. In the password validation example, why can't you use standard CTM combination generation? What special handling is needed?
22. Identify the constraints (infeasible combinations) in the count() function tree. How would you handle them?

---

## Part 5: Advanced Topics & Tools

23. You have a web form with 4 tabs, each with different fields. Should you create one big tree or four separate trees? What are the trade-offs?
24. Compare CTE XL and TESTONA. What capabilities does TESTONA add that make it more powerful for modern testing?
25. A novice tester creates a flat tree with 5 classifications at the root level, each with 4 classes. What problems will they face? How would you coach them?
26. Which of the five common pitfalls is most dangerous, and why?
27. How does CTM integrate with equivalence partitioning, boundary value analysis, and combinatorial testing? Draw the connections.

---

## Key Numbers to Memorize

| Metric | Value | Source |
|--------|-------|--------|
| Students preferring CTM | **66%** | Yu et al. 2004 |
| Study participants | **162** (104 + 58) | Yu et al. 2004 |
| Training time in study | **3 hours** | Yu et al. 2004 |
| Ad hoc fault detection | **55%** of faulty programs | Yu et al. 2004 |
| Novices with infeasible cases | **60%** | Yu et al. 2004 |
| Subjectivity in tree structure | **25%** | Yu et al. 2004 |
| Test reduction (CTE XL) | **>90%** (70,000 → 5,560) | Lehmann 2000 |
| Test suites evaluated (constraints) | **3,854** | Grindal et al. 2007 |
| E[T] ad hoc tree | **0.26** (74% waste) | Chen et al. 2000 |
| E[T] restructured tree | **0.47** (53% waste) | Chen et al. 2000 |
| Best constraint strategy | **Avoid** | Grindal et al. 2007 |

---

## Key Terms Glossary

| Term | Definition |
|------|------------|
| **Classification Tree** | Graphical model of the input domain with hierarchical aspects and classes |
| **Test Object** | The unit under test — must be invocable, observable, and restful |
| **Aspect / Classification** | A test-relevant property that influences behavior |
| **Equivalence Class** | A set of input values expected to produce equivalent behavior |
| **Composition** | "Has-a" node — children coexist simultaneously |
| **Classification** | "Is-a" node — exactly one child applies |
| **Class** | Leaf node — a selectable value in the combination table |
| **Combination Table** | Matrix mapping classes to test specifications |
| **E[T]** | Tree effectiveness = legitimate cases / potential cases |
| **Dependency Rule** | Constraint marking infeasible class combinations |
| **Probing Questions** | Systematic technique to discover test-relevant aspects |
| **TSL** | Test Specification Language — text format used in Category-Partition |
| **CTE XL** | Classification Tree Editor eXtended Logics — tool with constraint engine |
| **TESTONA** | Modern CTM tool with SAT solver, oracles, and script generation |
| **N-wise** | Generation strategy ensuring every n-tuple of classes appears |
| **Minimality** | Generation strategy ensuring every class appears at least once |

---

*For detailed explanations, see study notes: `sn_classification_tree.md`*
