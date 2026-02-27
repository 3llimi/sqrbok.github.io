---
title: "Study Notes: Classification Tree Method"
parent: Input Domain Testing
nav_order: 101
layout: default
---

# Study Notes: Classification Tree Method

## Purpose
These study notes cover the **Classification Tree Method (CTM)** — a systematic technique for modeling input domains and deriving test specifications. Aimed at MS-level students who need to apply CTM in practice and understand its theoretical foundations.

**Primary Sources:**
- Grochtmann & Grimm 1993, "Classification Trees for Partition Testing" {% cite grochtmann1993classification %}
- Buechner 2009, "Test Case Design Using the Classification Tree Method" {% cite buechner2009classification %}

**Key Research Papers:**
- Yu et al. 2004 {% cite yu2004novicetesters %} — the only controlled empirical study of CTM (162 students)
- Chen et al. 2000 {% cite chen2000integrated %} — E[T] tree quality metric and restructuring
- Lehmann & Wegener 2000 {% cite lehmann2000ctexl %} — CTE XL tool with >90% test reduction
- Grindal et al. 2007 {% cite grindal2007conflicts %} — constraint-handling strategies (3,854 test suites)

---

## Part 1: Introduction & Motivation

### 1.1 The Problem: Combinatorial Explosion

When testing a system, you need to decide **which inputs to test**. Even a simple system has many test-relevant aspects, and the number of combinations grows multiplicatively:

**Example — Machine Vision System:**
A robot classifies figures on a conveyor belt. Test-relevant aspects include:

| Aspect | Values | Count |
|--------|--------|-------|
| Shape | Triangle, Circle, Square | 3 |
| Color | Red, Green, Blue | 3 |
| Size | Small, Large | 2 |
| Lighting | Bright, Dim | 2 |
| Background | White, Dark | 2 |

**Total combinations:** 3 × 3 × 2 × 2 × 2 = **72 test cases** — and this is a *simple* example.

The CTM provides a structured way to model this domain, identify what matters, and generate a manageable set of test specifications.

### 1.2 From Category-Partition to CTM

The CTM {% cite grochtmann1993classification %} was developed as an improvement over the **Category-Partition (CP) method** {% cite ostrand1988category %}. Think of CP as writing a detailed shopping list (text-based), while CTM is drawing a map (graphical tree):

| Aspect | Category-Partition (1988) | Classification Tree Method (1993) |
|--------|--------------------------|-----------------------------------|
| **Notation** | Formalized text (TSL language) | Graphical tree + combination table |
| **Structure** | Flat categories, all at same level | Hierarchical, multi-level |
| **Test volume** | Start large → add restrictions | Start minimal → add until sufficient |
| **Specification** | Implicit, lengthy generated lists | Direct, compact combination table |

**Key improvement:** CTM makes the structure *visual*. You can see relationships between aspects, spot missing aspects, and communicate the test design to stakeholders — all from the tree diagram.

### 1.3 The CTM Process: Six Steps

The CTM follows a six-step process {% cite grochtmann1993classification %}:

```
1. SELECT    →  Choose the test object
2. ANALYZE   →  Study the specification
3. MODEL     →  Build the classification tree
4. CONSTRAIN →  Add dependency rules
5. GENERATE  →  Create test specifications
6. EXPORT    →  Produce test cases for execution
```

Steps 2 and 3 are **intertwined** — you go back and forth between analyzing the spec and refining the tree.

{: .exam-tip }
> **Exam Tip:** Remember the 6 steps as **SAMCGE** — "**S**elect, **A**nalyze, **M**odel, **C**onstrain, **G**enerate, **E**xport." The key insight is that Analyze and Model iterate together.

### 1.4 Does CTM Work? Empirical Evidence

#### Academic Evidence

Yu et al. {% cite yu2004novicetesters %} conducted the **only controlled empirical study** of CTM with 162 students (104 full-time + 58 part-time). After just 3 hours of training:

| Metric | Result |
|--------|--------|
| Preferred CTM over ad hoc | **66%** |
| Perceived CTM as systematic | **63%** |
| Valued graphical representation | **54%** |
| Ad hoc fault detection | Only **55%** of faulty programs |

> "None of the students' test suites, except one developed by a mix of black and white box methods, could detect all faulty programs that our test suite derived from CTM did."

#### Industrial Evidence

| Domain | System | Result | Source |
|--------|--------|--------|--------|
| Aerospace | Airfield lighting (2700 C-modules) | 263 test cases | Grochtmann 1993 |
| Logistics | Letter sorting machine | Halved tests, found new errors | Grochtmann 1993 |
| Industrial | Computer vision system | 70,000 → 5,560 tests (>90% reduction) | Lehmann 2000 |
| Space | Hubble Space Telescope SW | Industry adoption | Grochtmann 1993 |
| Automotive | Engine control, central locking | TPT for continuous testing | Bringmann 2008 |

{: .exam-tip }
> **Exam Tip:** Be aware of the **caveat**: all early industrial evidence comes from the Daimler / Berner & Mattner ecosystem. Yu 2004 is the only independent study. No independent industrial replications exist yet.

---

## Part 2: Core Concepts

### 2.1 Test Objects

A **test object** is the unit you are testing. Good test objects have three properties:

| Property | Meaning | Example |
|----------|---------|---------|
| **Invocable** | Can be called at appropriate test level | A function, API endpoint, UI form |
| **Observable** | Output can be verified | Return value, screen display, log entry |
| **Restful** | Returns to initial state after execution | No persistent side effects between tests |

**Why this matters:** The choice of test object determines which aspects are relevant. Testing the *full conveyor system* means lighting and background are aspects. Testing just the *image processing module* means only figure properties matter.

### 2.2 Aspects and Equivalence Classes

An **aspect** (also called a classification) is any property that might influence the test object's behavior. Aspects come from three sources:

| Source | Examples |
|--------|----------|
| **Specifications** | Behavior descriptions, constraints, business rules |
| **Common knowledge** | Error handling, boundary conditions, empty inputs |
| **Test catalogs** | Reusable patterns from testing experience |

Aspects describe different *dimensions* of the input:

- **Values:** How information is conveyed (numeric, text, mixed)
- **Multiplicity:** How many times something appears (0, 1, many)
- **Sizes/Lengths:** Minimum, maximum, boundary values
- **Sequences:** Order of elements (sorted, unsorted, reversed)

An **equivalence class** partitions aspect values into groups that produce **equivalent behavior**. Two key properties:

1. **Mutually exclusive** — no value belongs to multiple classes
2. **Collectively exhaustive** — every possible value is covered

**Example:**

| Aspect | Classes |
|--------|---------|
| Shape | Triangle, Circle, Square |
| Color | Red, Green, Blue |
| Array Size | 0, 1, >1 |

{: .exam-tip }
> **Exam Tip:** Aspect identification is NOT mechanical — it requires creativity and domain insight. Use **probing questions** systematically: "What inputs? What environment? What values differ? What boundaries? What can go wrong?"

### 2.3 Four Node Types

The classification tree uses four node types {% cite buechner2009classification %}:

| Node Type | Visual Convention | Meaning | Selectable in Tests? |
|-----------|------------------|---------|---------------------|
| **Root** | Top of tree | The test object / problem being tested | No |
| **Composition** | Thick-bordered rectangle | "Consists of" — aggregation (has-a) | No |
| **Classification** | Regular rectangle | Test-relevant aspect — equivalence partition | No |
| **Class** | Frameless leaf | Disjoint, complete subset of values | **Yes** |

**Critical rule:** Only **Classes** are test-selectable — they form the columns of the combination table.

Think of it this way:
- **Composition** = a parts list (a car *has* wheels, motor, chassis — ALL exist)
- **Classification** = a multiple-choice question (a vehicle *is* a bus, truck, or sedan — ONE applies)

### 2.4 Composition vs Classification

This is one of the most important distinctions in CTM:

```
Composition (has-a) — ALL exist simultaneously:

  Car
  ├── Wheels
  ├── Motor
  └── Chassis

Classification (is-a) — exactly ONE applies:

  Vehicle
  ├── Bus
  ├── Truck
  └── Sedan
```

**In the machine vision example:**
- **Figure** is a *composition* — it has Shape, Color, AND Size (all three exist)
- **Shape** is a *classification* — a figure is Triangle, Circle, OR Square (one applies)

### 2.5 Modeling Invalid Cases

For robust (negative) testing, invalid inputs must be part of the tree. The key principle: **invalid cases form a separate branch, parallel to valid aspects** — NOT scattered as individual leaves within each classification.

```
Figure
├── Invalid ← separate branch
│   └── Exemplars
│       ├── Small hexagon
│       ├── Large irregular shape
│       └── Wrong color
└── Valid
    └── Attributes
        ├── Shape → Triangle, Circle, Square
        ├── Color → Red, Green, Blue
        └── Size  → Small, Large
```

**Why a separate branch?** If invalid values sit inside each valid classification, they enter the **combinatorial explosion**. The test generator would combine "undefined shape" with "red" and "small" and "bright" and "white" — producing meaningless test cases. A separate branch ensures:
- Invalids are tested **individually** (not combined with valid values)
- Valid combinations stay clean for systematic coverage
- Test count stays manageable

**Decision guide:** If the application tests invalids one at a time → use a separate branch. If the application logic processes combinations of valid and invalid inputs together (e.g., multi-field form validation) → consider mixing.

{: .exam-tip }
> **Exam Tip:** **Enumerate** invalid cases as concrete exemplars rather than comprehensively defining them. Ask: "What specific inputs would the system reject?" The answers become exemplars.

### 2.6 Machine Vision: Complete Tree

Here is the full classification tree for the machine vision system:

```
Machine Vision System                              ← Root
├── Figure                                          ← Composition
│   ├── Invalid                                     ← Classification
│   │   └── Exemplars                               ← Composition
│   │       ├── Small hexagon                       ← Class
│   │       ├── Large irregular shape               ← Class
│   │       └── Wrong color                         ← Class
│   └── Valid                                       ← Classification
│       └── Attributes                              ← Composition
│           ├── Shape                               ← Classification
│           │   ├── Triangle                        ← Class
│           │   ├── Circle                          ← Class
│           │   └── Square                          ← Class
│           ├── Color                               ← Classification
│           │   ├── Red                             ← Class
│           │   ├── Green                           ← Class
│           │   └── Blue                            ← Class
│           └── Size                                ← Classification
│               ├── Small                           ← Class
│               └── Large                           ← Class
├── Environment                                     ← Composition
│   ├── Lighting                                    ← Classification
│   │   ├── Bright                                  ← Class
│   │   └── Dim                                     ← Class
│   └── Background                                  ← Classification
│       ├── White                                   ← Class
│       └── Dark                                    ← Class
```

**Combinatorial count:** 3 (Shape) × 3 (Color) × 2 (Size) × 2 (Lighting) × 2 (Background) = **72 potential valid combinations**. Invalid exemplars are tested separately.

---

## Part 3: The CTM Process in Detail

### 3.1 Step 1: Select Test Object

The test object choice shapes the entire tree. Consider the machine vision system at two levels:

| Level | Test Object | Relevant Aspects | Irrelevant |
|-------|------------|-------------------|------------|
| **End-to-end** | Full conveyor system | Shape, Color, Size, Lighting, Background | — |
| **Module** | Image processing library | Shape, Color, Size | Lighting, Background |

At the module level, lighting and background are handled by other components — they are not aspects of the image processing function.

### 3.2 Steps 2-3: Analyze & Model (Intertwined)

These two steps iterate together. Use **probing questions** to systematically uncover aspects:

1. What inputs does the test object receive?
2. What environment conditions exist at execution time?
3. What values might be treated differently by the system?
4. What boundary conditions matter?
5. What can go wrong? (→ invalid cases)

**Worked Example — `count(searchedArray, countWhat)`:**

This function counts how many times `countWhat` appears in `searchedArray`. Let's apply probing questions:

| Probing Question | Revealed Aspect | Classes |
|-----------------|----------------|---------|
| Does array size affect processing? | **Size** | 0, 1, >1 |
| Does element order matter? | **Order** | Sorted, Unsorted |
| How many times does the element occur? | **Occurrences** | None, One, Many |
| Does content type matter? | **Content** | Numeric, Alpha, Alphanumeric |
| What about countWhat length? | **Length** | One char, Multiple |
| What if countWhat is null? | **Invalid** | null countWhat |

### 3.3 Count Function Tree

```
count(searchedArray, countWhat)                     ← Root
├── searchedArray                                   ← Composition
│   ├── Size                                        ← Classification
│   │   ├── 0                                       ← Class
│   │   ├── 1                                       ← Class
│   │   └── >1                                      ← Class
│   ├── Order                                       ← Classification
│   │   ├── Sorted                                  ← Class
│   │   └── Unsorted                                ← Class
│   ├── Occurrences                                 ← Classification
│   │   ├── None                                    ← Class
│   │   ├── One                                     ← Class
│   │   └── Many                                    ← Class
│   └── Content                                     ← Classification
│       ├── Numeric                                 ← Class
│       ├── Alpha                                   ← Class
│       └── Alphanumeric                            ← Class
├── countWhat                                       ← Composition
│   └── Length                                      ← Classification
│       ├── One char                                ← Class
│       └── Multiple                                ← Class
└── Invalids                                        ← Composition
    └── null countWhat                              ← Class
```

**Combinatorial count:** 3 × 2 × 3 × 3 × 2 = **108 potential combinations** (valid only). But note: some are **infeasible** — e.g., "Array size = 0" AND "Occurrences = Many" is impossible. This is where constraints come in.

### 3.4 Step 4: Constrain (Dependency Rules)

Not all combinations are logically possible. Grindal et al. {% cite grindal2007conflicts %} studied four strategies for handling conflicts across **3,854 test suites**:

| Strategy | How It Works | Suite Size | When to Use |
|----------|-------------|-----------|-------------|
| **Avoid** | Modify the generation algorithm to skip conflicts | **Smallest** | When the generator supports it |
| **Replace** | Generate all, then clone & fix conflicts | 2nd best | When generator is a black box |
| **Abstract Parameter** | Merge conflicting parameters into one | Larger | Rare: specific parameter dependencies |
| **Sub-models** | Split into conflict-free sub-models | Largest | Legacy tool workaround |

**"Avoid" consistently produced the smallest conflict-free suites** across all 864 test problems.

{: .exam-tip }
> **Exam Tip:** Remember: **Avoid > Replace > Abstract > Sub-models** in terms of suite size efficiency. "Avoid" is the recommended default strategy.

### 3.5 Step 5: Generate Test Specifications

CTE XL {% cite lehmann2000ctexl %} provides four generation strategies:

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Minimality** | Every class covered at least once | Quick smoke tests |
| **Maximality** | All valid combinations | Exhaustive — only for small trees |
| **N-wise** | Every n-tuple of classes appears at least once | Balanced coverage vs cost |
| **Optimum** | User-defined rules + heuristic search | Custom priorities |

**Minimality** is the simplest: pick one test case per class, reusing values across tests. For the machine vision example with 72 valid combinations, a minimal suite might need only **3 tests** (enough to cover every class at least once).

**N-wise** (especially **pairwise / 2-wise**) is the practical sweet spot: every pair of class values appears together in at least one test. Research shows most bugs involve interactions of 2-3 parameters.

### 3.6 Step 6: Export to Test Harness

There are two approaches to specifying leaf values:

| Approach | Leaf Values | Example | Pros | Cons |
|----------|------------|---------|------|------|
| **Concrete** | Actual test data | `array = [3, 1, 4]` | Direct automation | Brittle to changes |
| **Abstract** | Value descriptions | `"Array: size > 1, unsorted"` | Reusable, flexible | Needs manual instantiation |

**Concrete export example:**
```python
# Test Case: Size>1, Unsorted, Many occurrences, Numeric, Multiple
array = [3, 1, 4, 1, 5]
countWhat = "1"
expected = 2
```

**Abstract export example:**
```
Array: size > 1, unsorted, many occurrences, numeric content
CountWhat: multiple characters
Expected: count of occurrences
```

{: .exam-tip }
> **Exam Tip:** Best practice is to **delay parameterization** — keep test specs abstract and reusable. One abstract spec can generate many concrete test cases {% cite buechner2009classification %}.

### 3.7 Tree Quality — The E[T] Metric

Chen et al. {% cite chen2000integrated %} proposed a metric to measure tree quality:

**Formula:** `E[T] = legitimate test cases / potential test cases`

Where:
- **Potential** = total combinatorial product (all possible combinations)
- **Legitimate** = combinations that are actually feasible (no conflicts)

| Tree Version | Potential | Legitimate | E[T] | Waste |
|-------------|----------|------------|------|-------|
| Ad hoc tree | 108 | 28 | **0.26** | 74% infeasible |
| Restructured tree | 60 | 28 | **0.47** | 53% infeasible |

**Restructuring nearly doubles effectiveness** while preserving all 28 legitimate test cases. The formal guarantees:
- **Preservation:** No legitimate test case is lost during restructuring
- **Convergence:** The potential count never increases

{: .exam-tip }
> **Exam Tip:** E[T] = 0.26 means **74% of generated tests are wasted** on infeasible combinations. Restructuring (moving aspects to different tree levels) can dramatically improve this without losing coverage.

---

## Part 4: Worked Examples

### 4.1 City Tax Example — Full Walkthrough

This example walks through all six CTM steps for a city tax calculator.

**Step 1 — Specification:**

| Residency | Status | Gross Pay | Tax Rate |
|-----------|--------|-----------|----------|
| Non-resident | Any | Any | 1% |
| Resident | Single | ≤ $30,000 | 1% |
| Resident | Single | $30,000 – $50,000 | 5% |
| Resident | Single | > $50,000 | 15% |
| Resident | Family | ≤ $50,000 | 1% |
| Resident | Family | > $50,000 | 5% |

**Step 2-3 — Classification Tree:**

```
City Tax Calculator                                 ← Root
├── Resident?                                       ← Classification
│   ├── Yes                                         ← Class
│   └── No                                          ← Class
├── Marital Status                                  ← Classification
│   ├── Single                                      ← Class
│   └── Family                                      ← Class
├── Gross Pay                                       ← Classification
│   ├── ≤ $30k                                      ← Class
│   ├── $30k–$50k                                   ← Class
│   └── > $50k                                      ← Class
└── Invalids                                        ← Composition
    ├── Negative pay                                ← Class
    └── Missing fields                              ← Class
```

**Step 4 — Constraints:**
- If Resident? = No → Marital Status and Gross Pay are **not applicable**
- Invalid cases are tested separately (not combined with valid)

**Step 5 — Combination Table:**

| TC | Resident? | Status | Gross Pay | Expected Tax |
|----|-----------|--------|-----------|-------------|
| 1 | No | N/A | N/A | 1% |
| 2 | Yes | Single | ≤ $30k | 1% |
| 3 | Yes | Single | $30k–$50k | 5% |
| 4 | Yes | Single | > $50k | 15% |
| 5 | Yes | Family | ≤ $50k | 1% |
| 6 | Yes | Family | > $50k | 5% |

**Step 6 — Concrete Test Cases:**

| TC | Input | Expected Output |
|----|-------|----------------|
| 1 | Non-resident, $40,000 | $400 (1%) |
| 2 | Resident, Single, $18,000 | $180 (1%) |
| 3 | Resident, Single, $35,000 | $1,750 (5%) |
| 4 | Resident, Single, $80,000 | $12,000 (15%) |
| 5 | Resident, Family, $25,000 | $250 (1%) |
| 6 | Resident, Family, $60,000 | $3,000 (5%) |

Notice how the tree handles the Non-resident constraint **structurally** — Status and Gross Pay only apply under Resident = Yes. Invalid cases (negative pay, missing fields) are in their own branch, tested individually.

### 4.2 Document Identifier Example

A single value can encode **multiple** test-relevant aspects:

| Part of Document Number | Aspect | Classes |
|------------------------|--------|---------|
| First 3 digits | Document Type | Invoice, Receipt, Credit Note |
| Next 3 digits | Document Class | Internal, External, Intercompany |
| Last 4 digits | Sequence | Valid range, Out of range, Duplicate |

**Probing question:** "Does the system treat document type 101 differently from 201?" If yes → document type is a test-relevant aspect with its own equivalence classes.

The key lesson: look at **information conveyed**, not just the surface representation.

### 4.3 Password Validation Example

Password validation is interesting because a valid password requires **all aspects satisfied simultaneously** (intersection, not union):

| Aspect | Classes |
|--------|---------|
| Length | <8 (invalid), 8-16 (valid), >16 (invalid) |
| Numeric chars | None (invalid), Some (valid), All (invalid) |
| Uppercase chars | None (invalid), Some (valid), All (invalid) |

**Valid password** = Length(8-16) ∧ Numeric(Some) ∧ Uppercase(Some)

Example valid value: `Passw0rD` — satisfies all three aspects simultaneously.

Test specification requires **manual value creation** because you need to find concrete strings that satisfy the intersection of abstract classes.

### 4.4 Test Specification vs Test Case

| Test Specification (What) | Test Case (How) |
|--------------------------|----------------|
| Array size > 1 | `["world", "father", "father", "country"]` |
| Occurrences > 1 | `countWhat = "father"` |
| Unsorted | (order is not sorted) |
| Alphanumeric content | (strings contain letters) |
| **Abstract — many valid concrete values** | **Concrete — one specific execution → expected: 2** |

**Best practice:** Delay parameterization. One abstract spec can generate many valid concrete test cases, making your test design more reusable {% cite buechner2009classification %}.

### 4.5 Concrete vs Abstract Inputs

| Factor | Concrete | Abstract |
|--------|----------|----------|
| **Automation** | High — direct export to framework | Low — needs manual instantiation |
| **Reusability** | Low — tied to specific values | High — works across versions |
| **Maintenance** | Brittle — breaks when values change | Flexible — description stays valid |
| **Documentation** | Poor — values don't explain intent | Good — descriptions explain *why* |

**Rule of thumb:** Use concrete values when automating regression tests. Use abstract specs when designing new tests or communicating with stakeholders.

---

## Part 5: Advanced Topics & Tools

### 5.1 Multiple Functions in One Form

Complex UI forms often contain **multiple functions** that should be tested separately. Example — a Replace dialog:

| Function | Separate Test Object? | Why |
|----------|----------------------|-----|
| Find Next | Yes — own tree | Different input aspects (search term, direction) |
| Replace | Yes — own tree | Additional "replace with" aspect |
| Replace All | Yes — own tree | Scope differs from single Replace |
| Close | Yes — own tree | State verification only |

**Principle:** Simpler trees → clearer coverage. Some duplication between trees is acceptable if it keeps each tree focused and manageable.

### 5.2 Tool Evolution: 27 Years of CTM Tools

CTM tools have evolved from simple editors to integrated test platforms:

```
CTE (1993)  →  CTE XL (2000)  →  CTE XL Pro (2014)  →  TESTONA (2016+)
  Tree           + Logic rules      + Automation          + SAT solver
  editor         + N-wise gen       + Integration         + Test oracles
  only           + Server API                             + Script gen
```

**Feature comparison:**

| Feature | CTE (1993) | CTE XL (2000) | TESTONA (2016+) |
|---------|-----------|---------------|-----------------|
| Tree editor | Yes | Yes | Yes |
| Dependency rules | — | Propositional logic | Boolean + numerical |
| Generation | Manual only | Minimality, maximality, n-wise | + SAT solver |
| Integration | Standalone | Server API | Full tool chain |
| Test oracles | — | — | 4 oracle types |
| Script generation | — | — | Integrated |

**Key result:** CTE XL dependency rules enabled **>90% test case reduction** in a computer vision system (70,000 → 5,560 test cases) {% cite lehmann2000ctexl %}.

### 5.3 Industry Adoption

CTM has been validated across safety-critical domains over 30 years:

| Domain | System | Result | Source |
|--------|--------|--------|--------|
| Aerospace | Airfield lighting (2700 modules) | 263 test cases | Grochtmann 1993 |
| Logistics | Letter sorting machine | Halved tests, found new errors | Grochtmann 1993 |
| Automotive | Adaptive cruise control | Automated with Tessy | Buechner 2009 |
| Aviation | Multiple systems (CTE XL) | >90% test reduction | Lehmann 2000 |
| Automotive | Engine control, central locking | TPT for continuous testing | Bringmann 2008 |

{: .exam-tip }
> **Exam Tip:** All early evidence comes from the Daimler / Berner & Mattner ecosystem. Yu 2004 {% cite yu2004novicetesters %} is the only independent empirical study. No independent industrial replications exist yet — this is a legitimate critique of the evidence base.

### 5.4 Common Pitfalls

Yu et al. {% cite yu2004novicetesters %} and Chen et al. {% cite chen2000integrated %} identified five common pitfalls:

| # | Pitfall | Frequency | Mitigation |
|---|---------|-----------|------------|
| 1 | **Infeasible test cases** | 60% of novices | Use dependency rules / constraints |
| 2 | **Classification identification** | Common | Use probing questions systematically |
| 3 | **Subjectivity** | 25% | Use E[T] metric to evaluate tree quality |
| 4 | **Flat trees** | Common | Use composition nodes for hierarchy |
| 5 | **Skipping boundary values** | Common | Combine CTM with BVA |

**Most dangerous:** Infeasible test cases (pitfall #1). When 60% of novices create impossible combinations, it means the majority of generated tests are wasted — and testers lose trust in the method.

### 5.5 CTM as an Integrating Framework

CTM is not a standalone method — it **integrates** several testing techniques into one visual framework:

| Technique | Relationship to CTM |
|-----------|-------------------|
| **Equivalence Partitioning (EP)** | CTM classes ARE equivalence partitions |
| **Boundary Value Analysis (BVA)** | Apply BVA within each class range |
| **Decision Tables** | CTM combination table generalizes decision tables |
| **Combinatorial Testing** | N-wise strategies apply directly to CTM trees |

This integration is why CTM is powerful: it gives you a visual way to apply EP (partitioning values into classes), connect it with BVA (testing boundaries within classes), and then use combinatorial strategies to select which combinations to test.

---

## Part 6: Summary & Review

### Six Key Takeaways

1. **Systematic:** CTM provides a 6-step repeatable process for test design {% cite grochtmann1993classification %}
2. **Visual:** Tree notation makes test design transparent — you can *see* what you're testing
3. **Measurable:** The E[T] metric quantifies tree quality — bad trees waste 74-83% of tests {% cite chen2000integrated %}
4. **Proven:** 66% of testers prefer CTM after just 3 hours of training {% cite yu2004novicetesters %}
5. **Scalable:** Tool support enables >90% test case reduction {% cite lehmann2000ctexl %}
6. **Integrating:** CTM subsumes EP, connects to BVA, and feeds into combinatorial testing

### Self-Assessment Checklist

Before the exam, ensure you can:

- [ ] Explain the difference between composition and classification nodes
- [ ] Build a classification tree from a written specification
- [ ] Derive a combination table from a classification tree
- [ ] Explain why invalid cases should be in a separate branch
- [ ] Calculate E[T] and explain what a low value means
- [ ] Compare the four constraint-handling strategies
- [ ] Name the four generation strategies (minimality, maximality, n-wise, optimum)
- [ ] Explain why CTM integrates EP, BVA, and combinatorial testing
- [ ] Critique the empirical evidence for CTM (strengths and limitations)
- [ ] Apply probing questions to identify test-relevant aspects

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
