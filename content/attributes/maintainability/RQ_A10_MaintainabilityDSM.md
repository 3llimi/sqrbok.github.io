---
title: "Revision Questions: Maintainability & DSM"
parent: Maintainability
grand_parent: Quality Attributes
nav_order: 100
layout: default
---

# Revision Questions: Software Maintainability and Design Structure Matrix (A10)

---

## Part 1: Why Maintainability Matters

### Q1
If most maintenance effort goes to perfective changes (enhancements) rather than bug fixes, what does this imply about how organizations should allocate their maintenance budgets?

### Q2
Lehman's Law I says software must adapt, and Law II says adaptation increases complexity. How does this tension manifest in a real project, and what strategies break the cycle?

### Q3
Parnas identifies "Lack of Movement" and "Ignorant Surgery" as two causes of software aging. Can a system suffer from both simultaneously? Give a scenario where this happens.

### Q4
A startup says "we'll fix the architecture later — right now we need to ship features." Using Lehman's Laws and the compounding effect of technical debt, argue for or against this strategy.

### Q5
Why does Parnas prescribe "seek second opinions" (code reviews) as a remedy for software aging? How does this connect to the concept of Ignorant Surgery?

### Q6
The lecture states that 80-85% of lifecycle cost is committed during requirements and design. If this is true, what are the implications for when maintainability decisions should be made?

---

## Part 2: Measuring Maintainability

### Q7
The SIG model uses quality profiles (risk distributions) while the Maintainability Index uses averages. Construct a scenario where MI gives a misleading "good" score but SIG correctly identifies a problem.

### Q8
Why does the SIG star rating use a 5%/30%/30%/30%/5% calibration rather than equal quintiles? What would change if they used 20%/20%/20%/20%/20%?

### Q9
A developer argues that Cognitive Complexity is unnecessary because "Cyclomatic Complexity already measures code complexity." Using the switch statement and nested-if examples, explain why CC and CogC measure fundamentally different things.

### Q10
The Maintainability Index formula includes Halstead Volume, which is rarely used in modern practice. If you were designing a replacement for MI, which metrics would you include and why?

### Q11
The lecture contrasts code metrics (symptoms of local problems) with structural metrics (root causes of systemic problems). Can you have good code metrics but poor structural metrics? Give an example.

### Q12
A system scores 4 stars on all SIG properties except Module Coupling (2 stars). What does this tell you about the system, and what would you investigate next?

---

## Part 3: Modularity Fundamentals

### Q13
Sullivan et al.'s NOV theory treats each module as a "real option." Why does this make modularity more valuable when future requirements are highly uncertain compared to when they are stable?

### Q14
In the KWIC case study, the information-hiding decomposition is more modular than the processing-step decomposition. What design principle distinguishes the two, and how would you recognize this distinction in a real codebase?

### Q15
Coupling and cohesion often trade off against each other — splitting a module reduces cohesion but may reduce coupling. How would you decide when a module should be split versus kept together?

### Q16
The lecture lists six quality attributes enabled by modularity (testability, scalability, comprehensibility, changeability, concurrent development, reusability). Are there situations where modularity works against any of these attributes?

### Q17
A microservices architecture has low coupling between services but each service internally is a monolith with high coupling. Is this system truly modular? Why or why not?

---

## Part 4: DSM Fundamentals

### Q18
Two architects examine the same DSM but one uses the convention "rows depend on columns" while the other uses "columns depend on rows." What errors could result from this confusion?

### Q19
After partitioning a DSM, three marks remain above the diagonal. What do these marks tell you about the system, and what are your options for addressing them?

### Q20
A DSM has a large cluster of 15 mutually dependent elements. From a maintainability perspective, why is this concerning, and what would clustering reveal about this group?

### Q21
Explain why the ordering of rows and columns in a DSM matters even though the mathematical dependency information is the same regardless of ordering.

### Q22
Compare the Tearing and Partitioning operations. When would you use each, and can they produce contradictory recommendations?

### Q23
A system has a module that appears as both a vertical bus (many modules depend on it) and it depends on several other modules. Is this a library, a controller, or something else? What are the architectural implications?

### Q24
The lecture shows that a single above-diagonal mark in a layered DSM represents an upward dependency violation. In practice, are all violations equally harmful? What factors determine severity?

---

## Part 5: Propagation Cost and Case Studies

### Q25
Linux has more absolute dependencies than Mozilla v1 (9,110 vs 6,717) but much lower propagation cost (5.82% vs 17.35%). Explain how this is possible and what it reveals about the relationship between dependency count and modularity.

### Q26
Geipel and Schweitzer found that >50% of dependencies are "change neutral." What are the implications of this finding for teams that use static dependency analysis to prioritize refactoring?

### Q27
Nord et al.'s enhanced PC assigns dependency weights. What practical challenges would a team face when trying to assign these weights in a real system with thousands of dependencies?

### Q28
The ABB case study achieved 75-83% effort reduction through refactoring with only ~3 hours/week of expert consultation. Why might such a small investment produce such large returns? Under what conditions would this approach fail?

### Q29
The lecture lists "vertical buses penalized unfairly" as a limitation of propagation cost. A logging library used by every module in a 100-module system contributes significantly to PC. Should this library be refactored to reduce PC? Why or why not?

### Q30
Mozilla's redesign reduced PC from 17.35% to 2.78%. Kim et al. found that refactoring at Microsoft reduced dependencies for the top 5% of modules but increased module size (LOC). How can refactoring simultaneously improve structure while making modules larger?

### Q31
If you could only choose one metric to track over time — Maintainability Index, SIG star rating, or Propagation Cost — which would you choose for a 10-year enterprise system, and why?

### Q32
The lecture says "DSM is a tool for insight, not a definitive measure." What could go wrong if a team treats propagation cost as a KPI and optimizes for it without considering other factors?

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
