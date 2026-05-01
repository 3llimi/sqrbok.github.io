---
title: "Study Notes: Quality Measurement"
parent: Measurement
nav_order: 10
layout: default
---

# Study Notes: Quality Measurement and Metrics

---

## Table of Contents

1. [Part 1: Why Measure?](#part-1-why-measure)
2. [Part 2: Measurement Pitfalls](#part-2-measurement-pitfalls)
3. [Part 3: Measurement Scales (NOIR)](#part-3-measurement-scales-noir)
4. [Part 4: Statistical Concepts](#part-4-statistical-concepts)
5. [Part 5: Developing Metrics (GQM)](#part-5-developing-metrics-gqm)
6. [Part 6: Code Metrics](#part-6-code-metrics)
7. [Part 7: Summary & Review](#part-7-summary--review)

---

## Part 1: Why Measure?

### Learning Objectives
- Explain why measurement is essential for software quality management
- Define measurement and metric using standard definitions
- Distinguish between resolution, accuracy, and precision

### Why Measurement Matters

We measure software to make informed decisions about:
- **Quality** — Is the product good enough to release?
- **Productivity** — Are we delivering value efficiently?
- **Risk** — What areas need attention?
- **Improvement** — Are our changes working?

Metrics feed into critical business decisions: release approval, resource allocation, process improvement, and performance evaluation.

> **Warning:** "You can't manage what you can't measure" — but bad metrics lead to bad management!

### Key Definitions

**Hubbard's Definition (2014):**

> "Measurement is a quantitatively expressed reduction of uncertainty based on one or more observations."

Hubbard {% cite hubbard_how_2014 %} argues that measurement doesn't require perfect precision. Even rough estimates reduce uncertainty and have value.

**Sarle's Definition (1997):**

> "Measurement of some attribute of a set of things is the process of assigning numbers or other symbols to the things in such a way that relationships of the numbers or symbols reflect relationships of the attributes."

Sarle {% cite sarle_measurement_1995 %} emphasizes the **representation condition**: the numbers must reflect real-world relationships.

**IEEE 1061 Definition:**

> "A software quality metric is a function whose inputs are software data and whose output is a single numerical value that can be interpreted as the degree to which software possesses a given attribute that affects its quality."

| Element | Description | Example |
|---------|-------------|---------|
| **Input** | Software data | Source code, defect reports, test results |
| **Output** | Single numerical value | 0-100, percentage, count |
| **Interpretation** | Degree of quality attribute | Higher = better maintainability |

### Resolution, Accuracy, Precision

| Property | Definition | Example |
|----------|------------|---------|
| **Resolution** | Smallest detectable change | Timer with 1ms vs 1s granularity |
| **Accuracy** | How close to true value | Thermometer reads 20.5°C when actual is 20°C |
| **Precision** | Repeatability of measurements | Same code analyzed twice gives same cyclomatic complexity |

> **Exam Tip:** High precision with low accuracy = consistent but wrong! A ruler that always measures 1cm short is precise (repeatable) but inaccurate.

### Practice Questions

1. According to Hubbard, what is the purpose of measurement?
2. What are the three components of an IEEE 1061 metric?
3. A tool consistently reports cyclomatic complexity as 10, but manual calculation shows 12. Is the tool accurate? Is it precise?

---

## Part 2: Measurement Pitfalls

### Learning Objectives
- Identify three categories of measurement dangers
- Explain the McNamara Fallacy and its relevance to software
- Recognize the Streetlight Effect in metric selection

### Three Dangers in Metrics

Hoffman {% cite hoffman_darker_2000 %} identified three ways metrics can go wrong:

| Danger | Description | Example |
|--------|-------------|---------|
| **Bad Statistics** | Misunderstanding measurement theory | Using mean on ordinal data |
| **Bad Decisions** | Incorrect use of data | Ignoring confounding variables |
| **Bad Incentives** | Disregard for human factors | Developers "gaming" coverage metrics |

> "People's behaviors change in predictable ways to provide the answers management asks for when metrics are applied." — Hoffman (2000)

### Statistics Can Mislead

**UK 1995 Contraceptive Warning:**

The UK issued a warning that third-generation contraceptive pills "increased the risk of blood clots twofold — that is, by 100 percent."

| Statistic | Value |
|-----------|-------|
| Second-gen risk | 1 in 7,000 women |
| Third-gen risk | 2 in 7,000 women |
| Absolute increase | 0.014% (1 in 7,000) |
| Relative increase | 100% |

**Result:** Panic, discontinued use, unwanted pregnancies.

> **Key Lesson:** Always ask "100% of what baseline?" Relative statistics without absolute context are misleading.

### The McNamara Fallacy

Named for Robert McNamara, US Secretary of Defense 1961-1968.

**Definition:** Making decisions based solely on quantitative observations while ignoring those that are difficult to measure.

**Vietnam War Example:**
- Strategy based on "body counts" (quantifiable)
- Ignored morale, political will, terrain (hard to measure)
- Quantifiable metrics ≠ important metrics

**In Software:**
- Tracking defect counts because they're easy to measure
- Ignoring code quality, technical debt, developer satisfaction

> "To omit [unmeasurable] variables is equivalent to saying that they have zero effect... Probably the only value known to be wrong." — Forrester (1961)

Forrester {% cite forrester1961industrial %} emphasized that ignoring hard-to-measure variables doesn't make them irrelevant.

### The Streetlight Effect

**The Parable:** A man searches for his keys under a streetlight, not where he dropped them, because "the light is better here."

**In Software Metrics:**
- Measuring what tools report automatically, not what matters
- Tracking code coverage because it's easy to automate
- Ignoring usability because it's hard to quantify

> **Antidote:** Start with goals (GQM), then find measures. Not the reverse!

### Practice Questions

1. A team achieves 100% code coverage but users still report bugs. Which pitfall does this illustrate?
2. Why is the McNamara Fallacy particularly dangerous in software development?
3. How does the Streetlight Effect affect metric selection?

---

## Part 3: Measurement Scales (NOIR)

### Learning Objectives
- List and describe Stevens' four measurement scales
- Identify which mathematical operations are valid for each scale
- Apply scale knowledge to evaluate metric validity

### The Representation Condition

> A measurement should map real-world entities into numbers such that relationships of the numbers reflect relationships of the attributes being measured.

**Example:**
- LOC satisfies representation for **physical size** (more lines = larger codebase)
- LOC does NOT satisfy representation for **functional size** (more lines ≠ more functionality)

> **Test:** Do mathematical operations on the numbers have meaning in reality?

### Stevens' Measurement Scales

Stevens {% cite stevens_theory_1946 %} defined four measurement scales in his seminal 1946 paper. The mnemonic **NOIR** (French for "black") helps remember them:

| Scale | Properties | Valid Operations | Software Example |
|-------|------------|------------------|------------------|
| **N**ominal | Categories only | =, ≠, count | Bug type (UI, logic, data) |
| **O**rdinal | Categories + order | <, >, rank | Severity (Low, Med, High, Critical) |
| **I**nterval | Order + magnitude | +, -, mean | Temperature change |
| **R**atio | True zero | ×, ÷, all | LOC, defect count, time |

### Detailed Scale Descriptions

#### Nominal Scale (Categories)

| Entity | Attribute | Example Values |
|--------|-----------|----------------|
| Application | Language | Java, Python, C++ |
| Fault | Source | assignment, algorithm, interface |
| Test | Type | unit, integration, system |

**Properties:**
- No implied order between categories
- Can count frequencies (mode)
- **Cannot compute averages!**

**Error Example:** "The average bug type is 2.3" — meaningless!

#### Ordinal Scale (Ranked)

| Entity | Attribute | Example Values |
|--------|-----------|----------------|
| Application | Complexity | Low, Medium, High |
| Fault | Severity | 1-Cosmetic to 4-Critical |
| Task | Priority | P1, P2, P3, P4 |

**Properties:**
- Has order but no defined magnitude between values
- Can compare (<, >), find median, rank
- **Cannot add or subtract!**

**Error Example:** "Critical (4) is twice as severe as Moderate (2)" — the scale doesn't support this claim.

#### Interval Scale

**Properties:**
- Has order AND equal intervals between values
- No true zero (zero doesn't mean "absence of quantity")
- Can: add, subtract, compute mean
- **Cannot: multiply, divide meaningfully**

**Example:** Temperature in °F or °C
- 64°F is NOT "twice as warm" as 32°F
- The difference (32°F) is meaningful, but the ratio (2:1) is not

#### Ratio Scale

**Properties:**
- Has true zero (absence of quantity)
- **All arithmetic operations are valid**

| Entity | Attribute | Example Values |
|--------|-----------|----------------|
| Project | Effort | Hours, person-days |
| Code | Complexity | Cyclomatic complexity |
| Testing | Coverage | Percentage (0-100%) |

**Example:** A module with CC=20 is twice as complex as one with CC=10.

### Story Points: A Cautionary Tale

**Data from Mike Cohn (2011):**

| Story Points | Median Hours | Range |
|--------------|--------------|-------|
| 1 point | 21 hours | 6-26 |
| 2 points | 52 hours | 31-73 |

**Problem:**
- If 1 point = 21 hours, then 2 points should ≈ 42 hours
- Actual median is 52 hours (**24% drift!**)

> **Conclusion:** Story points are ordinal at best. Adding them across sprints is mathematically questionable.

### Practice Questions

1. Classify each metric by scale: bug count, severity rating, lines of code, programming language
2. Why can't you compute the average severity of bugs?
3. A team reports "average story points completed per sprint." What's problematic about this?

---

## Part 4: Statistical Concepts

### Learning Objectives
- Choose appropriate central tendency measure for different data types
- Explain correlation vs causation
- Identify confounding variables in software metrics research

### Central Tendency: Mean, Median, Mode

| Measure | When to Use | Software Example |
|---------|-------------|------------------|
| **Mean** | Symmetric data, ratio scale | Average response time |
| **Median** | Skewed data, outliers present | Bug fix time |
| **Mode** | Categorical data, most frequent | Most common defect type |

**Example: Bug Fix Times**

If 9 bugs take 1 hour each and 1 bug takes 100 hours:
- Mean: (9×1 + 1×100) / 10 = **10.9 hours**
- Median: **1 hour** ← Better representation!

> **Exam Tip:** For software metrics with outliers (bug fix time, response time, effort), prefer median over mean.

### Correlation ≠ Causation

**Classic Example: Coffee and Cancer**

| Observation | Correlation |
|-------------|-------------|
| Coffee drinkers have higher cancer rates | Coffee → Cancer? |

**The Hidden Confounder: Smoking!**
- Smokers drink more coffee (coffee ↔ smoking)
- Smoking causes cancer (smoking → cancer)
- Coffee is correlated but NOT causal

**In Software:**
- High complexity correlates with defects
- But class size is a confounder!
- Large classes have more complexity AND more defects

### The Hidden Variable Problem

El Emam et al. {% cite elemam2001confounding %} conducted a landmark study on object-oriented metrics:

> "Only four, out of twenty-four commonly used object-oriented metrics, were actually useful in predicting the quality of a software module when the effect of the module size was accounted for."

**Common Confounders in Software Research:**

| Confounder | What It Affects |
|------------|-----------------|
| Module/class size | Almost everything! |
| Developer experience | Defect rates, productivity |
| Time pressure | Quality, technical debt |
| Technology stack | Performance, maintainability |

> **Solution:** Control for confounders in analysis, or use randomized experiments (A/B testing).

### Practice Questions

1. When should you use median instead of mean?
2. A study finds that teams using Tool X have fewer defects. What confounders might explain this?
3. Why did El Emam's study find that most OO metrics weren't useful?

---

## Part 5: Developing Metrics (GQM)

### Learning Objectives
- Apply Hubbard's argument that everything is measurable
- Use the Goal-Question-Metric framework to develop metrics
- Write operational definitions using Park's criteria

### Hubbard's Argument: Everything is Measurable

Hubbard {% cite hubbard_how_2014 %} provides a logical argument:

**If X is something we care about:**
1. X must be detectable somehow (or why would we care?)
2. If detectable, it exists in some amount
3. If it exists in some amount, it can be measured

> **Implication:** "Intangibles" like quality, risk, and user satisfaction ARE measurable.

> **Key Insight:** We don't need perfect measurement. Reducing uncertainty, even a little, has value.

### Basili's GQM Framework

Basili {% cite basili_applying_1993 %} developed the Goal-Question-Metric paradigm to ensure metrics serve real purposes:

| Level | Purpose | Example |
|-------|---------|---------|
| **Goal** | Define business/project objective | Improve code maintainability |
| **Question** | What do we need to know? | How complex is each module? |
| **Metric** | How do we quantify the answer? | Cyclomatic complexity |

#### Goal Template

Write goals using this structure:

| Element | Description | Example |
|---------|-------------|---------|
| **Object** | What are we studying? | The code base |
| **Purpose** | Why? (Improve, understand, control) | Improve |
| **Focus** | What quality aspect? | Maintainability |
| **Stakeholder** | For whom? | Development team |
| **Context** | Environment/constraints | New team members joining |

**Complete Goal:** "Improve maintainability of the code base from the perspective of the development team in the context of new team members joining."

#### GQM Example

| Goal | Improve code maintainability for new team members |
|------|--------------------------------------------------|
| **Question 1** | How complex are modules? |
| **Metric 1a** | Cyclomatic complexity |
| **Metric 1b** | Lines of code |
| **Question 2** | Are modules well-documented? |
| **Metric 2a** | Comment ratio |
| **Metric 2b** | Documentation coverage |

### Operational Definitions

Park {% cite park_software_1992 %} established two criteria for operational definitions:

| Criterion | Question |
|-----------|----------|
| **Communication** | Would others know exactly what was measured? |
| **Repeatability** | Could others repeat the measurement and get the same result? |

**Example: "Hours Worked on Project"**

Without operational definition, this is ambiguous:

| Ambiguity | Options |
|-----------|---------|
| **Source** | Time reporting system or estimates? |
| **Labor type** | Direct (developers) or indirect (sponsors)? |
| **Hours** | Paid only or include unpaid overtime? |
| **Activities** | Include meetings? Training? |

**Good Operational Definition:**
> "Hours worked: Paid hours logged in the time tracking system by direct development staff (developers, testers, architects) for activities classified as 'development' or 'testing', excluding meetings and training."

### Practice Questions

1. Using GQM, develop metrics for the goal "Reduce defect escape rate to production."
2. Write an operational definition for "code review completion rate."
3. Apply Hubbard's argument: Is "developer happiness" measurable?

---

## Part 6: Code Metrics

### Learning Objectives
- Calculate cyclomatic complexity for a code fragment
- Interpret Maintainability Index scores
- Use tools like `radon`, ESLint, and SonarQube for metric collection
- Understand the Chidamber-Kemerer OO metrics suite

### Lines of Code (LOC)

**Definition:** Physical count of source lines (typically via `wc -l`)

| Project | LOC | Category |
|---------|-----|----------|
| Expression Evaluator | 450 | Small utility |
| Sudoku Solver | 2,000 | Small application |
| Linux Kernel | 6,000,000 | Large system |
| Windows XP | 45,000,000 | Massive codebase |

**Cautions:**
- Physical LOC ≠ Logical LOC (statements vs lines)
- Doesn't measure functionality
- Varies by coding style and language
- More code ≠ more value

### Cyclomatic Complexity (McCabe 1976)

McCabe {% cite mccabe1976complexity %} defined cyclomatic complexity as the number of linearly independent paths through code.

**Formula:** `CC = Edges - Nodes + 2` (in Control Flow Graph)

**Simplified counting:** Count decision points and add 1:
- `if`, `elif`, `else`: +1 each
- `for`, `while`: +1 each
- `and`, `or`: +1 each
- `case` in switch: +1 each
- Base: 1

**Example:**

```python
def process(data):           # Base = 1
    if data is None:         # +1
        return None

    for item in data:        # +1
        if item > 0:         # +1
            process_positive(item)
        elif item < 0:       # +1
            process_negative(item)

    return result
# Total CC = 5
```

#### Risk Levels

| CC Range | Risk Level | Recommendation |
|----------|------------|----------------|
| 1-10 | Low | Acceptable |
| 11-20 | Moderate | Review, consider refactoring |
| 21-50 | High | Refactor to reduce complexity |
| >50 | Very High | Function is untestable, must split |

> **Exam Tip:** CC directly relates to testing effort. To fully test a function with CC=10, you need at least 10 test cases (one per path).

### Halstead Metrics

Halstead {% cite halstead1977elements %} developed metrics based on operators and operands:

| Symbol | Meaning |
|--------|---------|
| n₁ | Number of distinct operators |
| n₂ | Number of distinct operands |
| N₁ | Total occurrences of operators |
| N₂ | Total occurrences of operands |

**Derived Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **Vocabulary** | n = n₁ + n₂ | Program vocabulary size |
| **Length** | N = N₁ + N₂ | Total tokens |
| **Volume** | V = N × log₂(n) | Program "size" in bits |
| **Difficulty** | D = (n₁/2) × (N₂/n₂) | Error proneness |
| **Effort** | E = D × V | Mental effort to develop |

### Maintainability Index (1992)

Oman and Hagemeister {% cite oman1992maintainability %} developed the Maintainability Index using empirical data from HP C and Pascal codebases.

**Formula (Visual Studio normalized variant):**

```
MI = max(0, (171 - 5.2×ln(HV) - 0.23×CC - 16.2×ln(LOC)) × 100/171)
```

The original Oman & Hagemeister (1992) formula produces values on a 0–171 scale. Visual Studio normalizes this to 0–100 by multiplying by 100/171 and clamping at 0.

Where:
- HV = Halstead Volume
- CC = Cyclomatic Complexity
- LOC = Lines of Code

**Interpretation:**

| MI Score | Color | Meaning |
|----------|-------|---------|
| 20-100 | Green | Good maintainability |
| 10-19 | Yellow | Moderate, needs attention |
| 0-9 | Red | Poor, difficult to maintain |

> **Key Insight:** MI uses McCabe CC as a component! High complexity directly reduces maintainability.

### Tool Connections (Linting Lab)

**Python Tools:**

```bash
# Install radon
pip install radon

# Cyclomatic Complexity
radon cc myfile.py -a -s
# Output: Average complexity, per-function breakdown

# Maintainability Index
radon mi myfile.py -s
# Output: MI score per file (A-F grade)

# Halstead metrics
radon hal myfile.py
# Output: Volume, Difficulty, Effort per function
```

**Multi-Language Tool Matrix:**

| Language | Tools | What They Check |
|----------|-------|-----------------|
| **Python** | `radon`, `pylint`, `flake8-cognitive-complexity` | CC, MI, Halstead |
| **JavaScript** | ESLint (`complexity` rule) | CC per function |
| **Java** | SonarQube, PMD, Checkstyle | Full suite |
| **C#** | Visual Studio Code Metrics | CC, MI, class coupling |

**ESLint Configuration Example:**

```json
{
  "rules": {
    "complexity": ["error", 10]
  }
}
```

### Chidamber-Kemerer OO Metrics Suite

Chidamber and Kemerer {% cite chidamber1994metrics %} defined six metrics for object-oriented design:

| Metric | Full Name | Measures | High Value Indicates |
|--------|-----------|----------|---------------------|
| **WMC** | Weighted Methods per Class | Sum of method complexities | Complex class, hard to test |
| **DIT** | Depth of Inheritance Tree | Distance from root class | Complex hierarchy |
| **NOC** | Number of Children | Immediate subclasses | High influence, careful changes needed |
| **CBO** | Coupling Between Objects | External class dependencies | Hard to reuse, ripple effects |
| **RFC** | Response For Class | Methods callable from class | Difficult to test |
| **LCOM** | Lack of Cohesion in Methods | Method dissimilarity | Class should be split |

> **Exam Tip:** Remember that El Emam et al. found only 4 of 24 OO metrics useful after controlling for class size!

### Coverage Metrics (Preview)

Coverage metrics measure test thoroughness:

| Type | What It Measures |
|------|------------------|
| **Statement** | Percentage of statements executed |
| **Branch** | Percentage of branches taken |
| **Path** | Percentage of execution paths covered |

> **Note:** Full coverage treatment is in L05 (Adequacy Criteria).

### Practice Questions

1. Calculate the cyclomatic complexity of a function with 3 `if` statements and 1 `for` loop.
2. A module has MI = 15. What does this indicate and what action should be taken?
3. What's the relationship between McCabe CC and testing effort?
4. Why might high CBO be problematic for maintenance?

---

## Part 7: Summary & Review

### Six Key Takeaways

1. **Measure with purpose** — Use GQM to ensure metrics serve real goals, not just because tools report them

2. **Know your scale** — NOIR determines which mathematical operations are valid; don't average ordinal data

3. **Watch for pitfalls** — Bad statistics, bad decisions, bad incentives; Streetlight Effect and McNamara Fallacy

4. **Control confounders** — Class size affects almost everything; El Emam showed most OO metrics aren't useful after size control

5. **Use McCabe CC** — Predicts testability, feeds into MI, enforced by linting tools (ESLint, SonarQube, radon)

6. **Apply tools in practice** — `radon` for Python, ESLint `complexity` rule for JS, SonarQube for multi-language

### Quick Reference Tables

#### Measurement Scales (NOIR)

| Scale | Operations | Example |
|-------|------------|---------|
| Nominal | =, ≠, count | Bug type |
| Ordinal | <, >, rank | Severity |
| Interval | +, -, mean | Temperature |
| Ratio | ×, ÷, all | LOC, CC |

#### Cyclomatic Complexity Thresholds

| CC | Risk | Action |
|----|------|--------|
| 1-10 | Low | OK |
| 11-20 | Moderate | Review |
| 21-50 | High | Refactor |
| >50 | Very High | Must split |

#### Maintainability Index

| MI | Color | Meaning |
|----|-------|---------|
| 20-100 | Green | Good |
| 10-19 | Yellow | Moderate |
| 0-9 | Red | Poor |

#### GQM Structure

| Level | Question | Output |
|-------|----------|--------|
| Goal | What business objective? | Purpose statement |
| Question | What do we need to know? | Information needs |
| Metric | How do we quantify? | Measurement |

#### Key Definitions

| Term | Definition |
|------|------------|
| Measurement (Hubbard) | Reduction of uncertainty based on observations |
| Metric (IEEE 1061) | Function from software data to single numerical value |
| CC (McCabe) | Number of linearly independent paths |
| MI (Oman) | Composite score predicting maintainability |

### Self-Assessment Checklist

Before the exam, ensure you can:

- [ ] Define measurement using Hubbard's and IEEE 1061 definitions
- [ ] Distinguish resolution, accuracy, and precision
- [ ] Explain McNamara Fallacy and Streetlight Effect
- [ ] List Stevens' four measurement scales (NOIR)
- [ ] Identify valid operations for each scale type
- [ ] Choose appropriate central tendency (mean, median, mode)
- [ ] Explain correlation vs causation with confounders
- [ ] Apply GQM to develop metrics for a goal
- [ ] Write operational definitions using Park's criteria
- [ ] Calculate cyclomatic complexity for a code fragment
- [ ] Interpret Maintainability Index scores
- [ ] Use `radon` commands for CC, MI, Halstead
- [ ] List Chidamber-Kemerer OO metrics and their meanings

### Discussion Questions

1. A manager wants to track "developer productivity" using LOC/day. What problems might arise?
2. How would you apply GQM to measure "code quality" for a project?
3. Your team's average CC is 15. What steps would you take?
4. Why might 100% code coverage still result in bugs?

---

### Further Reading

For more details on specific topics covered in these study notes:

- [Definitions](definitions.md) — Measurement fundamentals and Hubbard's argument
- [Types of Metrics](types.md) — Measurement scales and the representation condition
- [Common Metrics](examples.md) — McCall model mapping and practical examples
- [Developing Metrics](development.md) — GQM framework and operational definitions
- [Pitfalls](pitfalls.md) — Metric misuse and anti-patterns

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.

---

