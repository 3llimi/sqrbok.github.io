---
title: Classification Tree Method
parent: Input Domain Testing
nav_order: 5
layout: default
---

# Classification Tree Method

The **Classification Tree Method (CTM)** is a systematic, graphical technique for designing test cases by partitioning the input domain of a test object into a tree structure and combining selections in a table. Introduced by Grochtmann and Grimm in 1993 {% cite grochtmann1993classification %}, it transforms test design from an ad hoc activity into a structured, visual, and documentable process.

---

## Why CTM?

Before CTM, the **Category-Partition Method** {% cite ostrand1988category %} used a textual formalism (TSL — Test Specification Language) to define categories, choices, and constraints. While systematic, TSL was hard to learn, produced flat lists, and generated test cases implicitly through lengthy frame expansion.

CTM addresses these limitations with three key improvements:

```mermaid
flowchart LR
    subgraph "Category-Partition (1988)"
        A1["Specification"] --> A2["TSL Text"]
        A2 --> A3["Constraints"]
        A3 --> A4["Generated<br>Test Frames"]
    end

    subgraph "Classification Tree Method (1993)"
        B1["Specification"] --> B2["Tree Diagram"]
        B2 --> B3["Combination<br>Table"]
        B3 --> B4["Test Cases"]
    end

    style A1 fill:#fff3cd,stroke:#333
    style A4 fill:#fff3cd,stroke:#333
    style B1 fill:#c8e6c9,stroke:#333
    style B4 fill:#c8e6c9,stroke:#333
```

| Aspect | Category-Partition | Classification Tree Method |
|--------|:--:|:--:|
| **Notation** | Textual (TSL syntax) | Graphical (tree + table) |
| **Structure** | Flat list of categories | Hierarchical tree |
| **Test case creation** | Start large, add restrictions | Start minimal, add until sufficient |
| **Specification** | Implicit (lengthy generated lists) | Direct (compact combination table) |
| **Hierarchy support** | Complex constraints needed | Built into tree structure |

> "The crucial activity during testing is test case determination, since it determines the kind and scope of the examination and thus the quality of the test." {% cite grochtmann1993classification %}

---

## Tree Notation

A classification tree uses four node types to model the input domain. Here is a complete example — a **machine vision system** that classifies figures on a conveyor belt (valid aspects only — see [Modeling Invalid Cases](#modeling-invalid-cases) below for the full tree with invalid exemplars):

```mermaid
flowchart TD
    ROOT(["Machine Vision System"])

    ROOT --> FIG["Figure"]
    ROOT --> ENV["Environment"]

    FIG --> SHAPE{{"Shape"}}
    FIG --> COLOR{{"Color"}}
    FIG --> SIZE{{"Size"}}

    SHAPE --> tri(["Triangle"])
    SHAPE --> circ(["Circle"])
    SHAPE --> sq(["Square"])

    COLOR --> r(["Red"])
    COLOR --> g(["Green"])
    COLOR --> b(["Blue"])

    SIZE --> sm(["Small<br>≤300px"])
    SIZE --> lg(["Large<br>>300px"])

    ENV --> LIGHT{{"Lighting"}}
    ENV --> BG{{"Background"}}

    LIGHT --> day(["Daylight"])
    LIGHT --> art(["Artificial"])

    BG --> white(["White"])
    BG --> dark(["Dark"])

    style ROOT fill:#019546,stroke:#333,color:white
    style FIG fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style ENV fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style SHAPE fill:#4a90d9,stroke:#333,color:white
    style COLOR fill:#4a90d9,stroke:#333,color:white
    style SIZE fill:#4a90d9,stroke:#333,color:white
    style LIGHT fill:#4a90d9,stroke:#333,color:white
    style BG fill:#4a90d9,stroke:#333,color:white
```

### Node Types

| Node | Visual | Meaning | Example | Test-Selectable? |
|------|--------|---------|---------|:---:|
| **Root** | Top of tree | The test object (SUT) | Machine Vision System | No |
| **Composition** | Thick-bordered (green above) | "Consists of" — aggregation | Figure, Environment | No |
| **Classification** | Rectangle (blue above) | "Is a kind of" — partition | Shape, Color, Size | No |
| **Class** | Leaf node (rounded above) | Equivalence class value | Triangle, Red, Small | **Yes** |

{: .important }
**Composition = "consists of"** (aggregation). **Classification = "is a kind of"** (partition). Classes must be **disjoint and complete** — every possible value belongs to exactly one class.

### Composition vs. Classification

The distinction is critical. Consider modeling a **Car** {% cite buechner2009classification %}:

```mermaid
flowchart LR
    subgraph "Composition (consists of)"
        C1["Car"] --> W["Wheels"]
        C1 --> M["Motor"]
        C1 --> CH["Chassis"]
    end

    subgraph "Classification (is a kind of)"
        C2["Vehicle"] --> BUS["Bus"]
        C2 --> TRUCK["Truck"]
        C2 --> SEDAN["Sedan"]
    end

    style C1 fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style C2 fill:#4a90d9,stroke:#333,color:white
```

- A car **consists of** wheels, motor, and chassis — all exist simultaneously (composition)
- A vehicle **is a kind of** bus, truck, or sedan — exactly one applies (classification)

### Modeling Invalid Cases

For robust (negative) testing, invalid inputs must be included in the classification tree. The key principle: **invalid cases form a separate branch, parallel to valid aspects** — they are not scattered as individual leaves within each valid classification.

```mermaid
flowchart TD
    ROOT(["Machine Vision System"])
    ROOT --> FIG["Figure"]

    FIG --> INV{{"Invalid"}}
    FIG --> VAL{{"Valid"}}

    INV --> EXMP["Exemplars"]
    EXMP --> hex(["Small hexagon"])
    EXMP --> irreg(["Large irregular<br>shape"])
    EXMP --> wclr(["Wrong color"])

    VAL --> ATTR["Attributes"]
    ATTR --> SHAPE{{"Shape"}}
    ATTR --> COLOR{{"Color"}}
    ATTR --> SIZE{{"Size"}}

    SHAPE --> tri(["Triangle"])
    SHAPE --> circ(["Circle"])
    SHAPE --> sq(["Square"])

    COLOR --> r(["Red"])
    COLOR --> g(["Green"])
    COLOR --> b(["Blue"])

    SIZE --> sm(["Small"])
    SIZE --> lg(["Large"])

    style ROOT fill:#019546,stroke:#333,color:white
    style FIG fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style INV fill:#d32f2f,stroke:#333,color:white
    style VAL fill:#019546,stroke:#333,color:white
    style EXMP fill:#ffcdd2,stroke:#d32f2f,color:#333,stroke-width:3px
    style ATTR fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style SHAPE fill:#4a90d9,stroke:#333,color:white
    style COLOR fill:#4a90d9,stroke:#333,color:white
    style SIZE fill:#4a90d9,stroke:#333,color:white
```

**Why a separate branch?** If invalid values sit inside each valid classification, they enter the **combinatorial explosion** — the test generator combines them with every valid value from other aspects, producing meaningless test cases like "undefined shape + red + small + bright + white." A separate branch ensures invalids are tested individually.

{: .important }
**Enumerate** invalid cases as concrete exemplars rather than comprehensively defining them. Ask: "What specific inputs would the system reject?" The answer gives you the exemplars.

**When to combine instead:** If the application logic processes combinations of valid and invalid inputs together (e.g., checking multiple fields in a form), it may make sense to include invalid classes within aspects. The decision depends on how the system under test handles errors {% cite grochtmann1993classification %}.

---

## The 6-Step Process

```mermaid
flowchart LR
    S1["1. Select<br>Test Object"] --> S2["2. Analyze<br>Aspects"]
    S2 --> S3["3. Model<br>Tree"]
    S3 --> S4["4. Add<br>Constraints"]
    S4 --> S5["5. Generate<br>Test Cases"]
    S5 --> S6["6. Export &<br>Execute"]

    style S1 fill:#019546,stroke:#333,color:white
    style S2 fill:#2D6E2A,stroke:#333,color:white
    style S3 fill:#2D6E2A,stroke:#333,color:white
    style S4 fill:#fff3cd,stroke:#333,color:black
    style S5 fill:#fff3cd,stroke:#333,color:black
    style S6 fill:#019546,stroke:#333,color:white
```

| Step | Action | Key Question |
|:---:|--------|-------------|
| **1** | **Select test object** — a function, module, or system with observable output | What are we testing? |
| **2** | **Analyze aspects** — identify inputs, environment conditions, and characteristics that influence behavior | What factors matter? |
| **3** | **Model tree** — organize aspects as compositions/classifications; partition values into disjoint classes | How do factors relate? |
| **4** | **Add constraints** — mark impossible combinations using dependency rules | Which combinations are infeasible? |
| **5** | **Generate test cases** — select one class per classification in the combination table | How many tests do we need? |
| **6** | **Export & execute** — assign concrete values, predict expected results, run tests | Did we find faults? |

{: .highlight }
"The Classification Tree Method is **guidance for thinking, not replacement of thinking!**" {% cite buechner2009classification %}

---

## Example 1: City Tax Calculator

**Specification:** A city levies income tax as follows:
- **Non-residents** pay 1% of gross pay
- **Residents — Single:**
  - Gross pay ≤ $30,000 → 1%
  - Gross pay $30,001–$50,000 → 5%
  - Gross pay > $50,000 → 15%
- **Residents — Family:**
  - Gross pay ≤ $50,000 → 1%
  - Gross pay > $50,000 → 5%

### Step 1–3: Build the classification tree

```mermaid
flowchart TD
    ROOT(["City Tax<br>Calculator"])
    ROOT --> RES{{"Residency"}}

    RES --> NR(["Non-Resident"])
    RES --> R(["Resident"])

    R --> MS{{"Marital Status"}}
    R --> GP{{"Gross Pay"}}

    MS --> S(["Single"])
    MS --> F(["Family"])

    GP --> LOW(["≤ #36;30,000"])
    GP --> MID(["#36;30,001–<br>#36;50,000"])
    GP --> HIGH(["> #36;50,000"])

    style ROOT fill:#019546,stroke:#333,color:white
    style RES fill:#4a90d9,stroke:#333,color:white
    style MS fill:#4a90d9,stroke:#333,color:white
    style GP fill:#4a90d9,stroke:#333,color:white
```

### Step 4: Identify constraints

When **Non-Resident** is selected, Marital Status and Gross Pay brackets are irrelevant — they only apply to Residents. This is naturally handled by placing those classifications under the **Resident** class in the tree hierarchy.

### Step 5: Combination table

| TC | Residency | Marital Status | Gross Pay | Expected Tax |
|:--:|-----------|:-:|-----------|:--:|
| 1 | Non-Resident | — | — | 1% |
| 2 | Resident | Single | ≤ $30,000 | 1% |
| 3 | Resident | Single | $30,001–$50,000 | 5% |
| 4 | Resident | Single | > $50,000 | 15% |
| 5 | Resident | Family | ≤ $50,000 | 1% |
| 6 | Resident | Family | > $50,000 | 5% |

### Step 6: Concrete test cases

| TC | Residency | Status | Gross Pay | Expected Tax Amount |
|:--:|-----------|--------|----------:|--------------------:|
| 1 | Non-Resident | — | $45,000 | $450 |
| 2 | Resident | Single | $25,000 | $250 |
| 3 | Resident | Single | $40,000 | $2,000 |
| 4 | Resident | Single | $75,000 | $11,250 |
| 5 | Resident | Family | $48,000 | $480 |
| 6 | Resident | Family | $60,000 | $3,000 |

{: .note }
Notice how the tree structure **naturally handles the constraint**: Non-Residents don't need marital status or pay brackets. By placing those classifications under the Resident class, impossible combinations are eliminated structurally rather than with explicit rules.

---

## Example 2: Count Function

`count(searchedArray, countWhat)` — counts occurrences of a value in an array.

**Probing questions:** Does array size matter? Does element order affect results? What about empty arrays? What if countWhat is null?

```mermaid
flowchart TD
    ROOT(["count(array, what)"])

    ROOT --> ARR["Array"]
    ROOT --> CW["countWhat"]

    ARR --> SZ{{"Size"}}
    ARR --> OCC{{"Occurrences"}}
    ARR --> ORD{{"Order"}}
    ARR --> CNT{{"Content Type"}}

    SZ --> sz0(["0<br>(empty)"])
    SZ --> sz1(["1"])
    SZ --> szN(["> 1"])

    OCC --> oNone(["None"])
    OCC --> oOne(["One"])
    OCC --> oMany(["> One"])

    ORD --> sorted(["Sorted"])
    ORD --> unsorted(["Unsorted"])

    CNT --> num(["Numeric"])
    CNT --> alpha(["Alpha"])
    CNT --> alnum(["Alphanumeric"])

    CW --> LEN{{"Length"}}
    LEN --> empty(["Empty"])
    LEN --> one(["1 char"])
    LEN --> multi(["> 1 char"])

    style ROOT fill:#019546,stroke:#333,color:white
    style ARR fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style CW fill:#2D6E2A,stroke:#333,color:white,stroke-width:3px
    style SZ fill:#4a90d9,stroke:#333,color:white
    style OCC fill:#4a90d9,stroke:#333,color:white
    style ORD fill:#4a90d9,stroke:#333,color:white
    style CNT fill:#4a90d9,stroke:#333,color:white
    style LEN fill:#4a90d9,stroke:#333,color:white
```

### Constraints (impossible combinations)

This example shows why **dependency rules** are essential:

| Constraint | Reason |
|------------|--------|
| Size = 0 → Occurrences = None | Empty array cannot contain the value |
| Size = 0 → Order is irrelevant | Cannot sort an empty array |
| Size = 1 → Occurrences ∈ {None, One} | Single element: either matches or doesn't |
| Size = 1 → Order is irrelevant | Single element is trivially sorted |

Without constraints, the tree produces **3 × 3 × 2 × 3 × 3 = 162** combinations. Many are impossible (e.g., empty array with multiple occurrences). Constraints reduce this to a manageable and meaningful test suite.

---

## Constraint Handling

Real systems always have impossible combinations. Constraint handling has evolved through three generations:

| Generation | Method | Example | Tool |
|:--:|--------|---------|------|
| **1st** (1988) | Textual annotations | `[if Resident]`, `[error]`, `[single]` | TSL {% cite ostrand1988category %} |
| **2nd** (2000) | Boolean dependency rules | `NonResident → NOT MaritalStatus` | CTE XL {% cite lehmann2000ctexl %} |
| **3rd** (2012) | Numerical constraints + SAT solver | `a + b > c` (triangle inequality) | TESTONA {% cite kruse2012numerical %} |

### Conflict Resolution Strategies

When generating test cases from a constrained tree, four strategies exist {% cite grindal2007conflicts %}:

```mermaid
flowchart TD
    CONFLICT["Conflict<br>Detected"] --> AVOID["Avoid<br>(prevent selection)"]
    CONFLICT --> REPLACE["Replace<br>(substitute value)"]
    CONFLICT --> ABSTRACT["Abstract<br>(merge parameters)"]
    CONFLICT --> SUBMODEL["Sub-Model<br>(split tree)"]

    style AVOID fill:#c8e6c9,stroke:#388e3c,stroke-width:3px
    style REPLACE fill:#fff3cd,stroke:#ffc107
    style ABSTRACT fill:#fff3cd,stroke:#ffc107
    style SUBMODEL fill:#fff3cd,stroke:#ffc107
```

{: .highlight }
The **"avoid" strategy** — prohibiting conflict selection during generation — produces the **smallest test suites** while preserving coverage criteria {% cite grindal2007conflicts %}.

### Tree Quality: Effectiveness Metric

Chen et al. {% cite chen2000integrated %} defined a metric for tree quality:

> **E[T] = legitimate test cases / potential test cases**

- **Legitimate:** combinations that exist in the real input domain
- **Potential:** all combinations the tree can generate (including infeasible ones)

Ad hoc trees can have E[T] as low as **0.17** — meaning 83% of generated test cases are wasted on impossible combinations. Systematic restructuring can **double** effectiveness.

---

## Tool Support

CTM tool support has evolved over 27+ years from a research prototype to a full test automation platform:

```mermaid
flowchart LR
    CTE["CTE<br>(1993)"] --> CTEXL["CTE XL<br>(2000)"]
    CTEXL --> PRO["CTE XL Pro<br>(2014)"]
    PRO --> TESTONA["TESTONA<br>(2016+)"]

    CTE -.-> F1["Graphical editor<br>Combination table"]
    CTEXL -.-> F2["Dependency rules<br>N-wise generation<br>>90% test reduction"]
    PRO -.-> F3["BVA automation<br>Requirements tracing<br>Coverage analysis"]
    TESTONA -.-> F4["SAT solver<br>Test oracles<br>Script generation"]

    style CTE fill:#e1f5fe,stroke:#0288d1
    style CTEXL fill:#c8e6c9,stroke:#388e3c
    style PRO fill:#fff3cd,stroke:#ffc107
    style TESTONA fill:#019546,stroke:#333,color:white
```

| Feature | CTE (1993) | CTE XL (2000) | TESTONA (2016+) |
|---------|:--:|:--:|:--:|
| Graphical editor | ✓ | ✓ | ✓ |
| Dependency rules | — | Boolean (AND, OR, ⇒) | Boolean + Numerical |
| Test generation | Manual | Minimality, Maximality, N-wise | + SAT solver |
| Tool integration | Standalone | Server API | DOORS, HP ALM |
| Test oracles | — | — | Dependency rule-based |
| Script generation | — | — | Code fragments |

{: .highlight }
"In some cases the amount of theoretically possible test cases given by the classification tree was **reduced by more than 90%**" through CTE XL dependency rules {% cite lehmann2000ctexl %}.

---

## Empirical Evidence

### Controlled Study: CTM vs. Ad Hoc Testing

The only controlled empirical evaluation of CTM {% cite yu2004novicetesters %} studied 162 students (two groups: 104 + 58) before and after a 3-hour CTM training session:

```vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Testing Method Preference: Before vs. After CTM Training",
  "width": 400,
  "height": 250,
  "data": {
    "values": [
      {"Method": "White-box", "Phase": "Before Training", "Percentage": 53},
      {"Method": "White-box", "Phase": "After Training", "Percentage": 18},
      {"Method": "BVA", "Phase": "Before Training", "Percentage": 12},
      {"Method": "BVA", "Phase": "After Training", "Percentage": 8},
      {"Method": "EP", "Phase": "Before Training", "Percentage": 15},
      {"Method": "EP", "Phase": "After Training", "Percentage": 5},
      {"Method": "CTM", "Phase": "Before Training", "Percentage": 0},
      {"Method": "CTM", "Phase": "After Training", "Percentage": 66},
      {"Method": "Other", "Phase": "Before Training", "Percentage": 20},
      {"Method": "Other", "Phase": "After Training", "Percentage": 3}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "Method", "type": "nominal", "axis": {"labelAngle": 0}},
    "y": {"field": "Percentage", "type": "quantitative", "title": "% of students"},
    "xOffset": {"field": "Phase", "type": "nominal"},
    "color": {
      "field": "Phase",
      "type": "nominal",
      "scale": {"range": ["#fff3cd", "#019546"]}
    }
  }
}
```

| Finding | Value |
|---------|:--:|
| Initially preferred white-box | 53% |
| Preferred CTM after 3h training | **~66%** |
| Perceived CTM as systematic | 63% |
| Perceived CTM as complete | 56% |
| Original suites' fault detection | 55% |

> "None of the students' test suites, except one developed by a mix of black and white box methods, could detect all faulty programs that our test suite derived from CTM did." {% cite yu2004novicetesters %}

### Industrial Case Studies

| Domain | Application | Finding | Source |
|--------|------------|---------|--------|
| Aerospace | Airfield lighting system | 263 test cases for 2,700 modules | Grochtmann 1993 |
| Logistics | Letter sorting machine | Halved test cases, found new errors | Grochtmann 1993 |
| Automotive | Adaptive cruise control | Embedded testing with Tessy | Buechner 2009 |
| Aviation/Space | Multiple systems | >90% test reduction via dependency rules | Lehmann 2000 |
| Automotive | Engine control, central locking | TPT for continuous behavior testing | Bringmann 2008 |

{: .important }
All documented industrial applications are from the Daimler/Berner & Mattner ecosystem. Independent replications outside this group are notably absent.

---

## CTM and Other Techniques

CTM is not an isolated technique — it acts as an **integrating framework** that connects several test design methods:

```mermaid
flowchart TD
    SPEC["Specification"] --> CTM["Classification<br>Tree Method"]
    EP["Equivalence<br>Partitioning"] -.->|"classification<br>step"| CTM
    BVA["Boundary Value<br>Analysis"] -.->|"class boundary<br>selection"| CTM
    CTM -->|"combination<br>table"| COMB["Combinatorial<br>Testing"]
    COMB --> TC["Test Cases"]
    CTM --> TC

    style CTM fill:#019546,stroke:#333,color:white
    style EP fill:#c8e6c9,stroke:#388e3c
    style BVA fill:#fff3cd,stroke:#ffc107
    style COMB fill:#e1f5fe,stroke:#0288d1
    style TC fill:#019546,stroke:#2D6E2A,color:#fff
```

| Technique | Relationship to CTM |
|-----------|-------------------|
| [Equivalence Partitioning](equivalence.md) | CTM's classification step **is** equivalence partitioning |
| [Boundary Value Analysis](boundary.md) | Applied when selecting concrete values at class boundaries |
| [Decision Tables](decision-tables.md) | Alternative for condition-action rules; CTM better for hierarchical inputs |
| [Combinatorial Testing](../combinatorial/) | Pairwise/n-wise strategies applied to CTM's combination table |

**Extensions:** CCTM extracts classification trees from UML activity diagrams {% cite kansomkeat2010uml %}, while TPT extends CTM to continuous signals in automotive systems {% cite bringmann2008tpt %}.

---

## Common Pitfalls

Based on empirical observations {% cite yu2004novicetesters %} {% cite buechner2009classification %}:

1. **Infeasible test cases** (60% of novices) — use dependency rules or tree restructuring to eliminate impossible combinations
2. **Flat trees with no hierarchy** — use composition nodes to group related aspects
3. **Too many classifications at root level** — abstract, then refine; large trees can use sub-tree refinements
4. **Confusing composition with classification** — ask: "consists of" (parts) vs. "is a kind of" (variants)?
5. **Skipping boundary values** — apply BVA at class borders (e.g., $30,000 and $30,001)
6. **Over-specifying** — keep test cases as abstract specifications; delay concrete value assignment

---

## Key Takeaways

1. **CTM provides a visual, structured approach** to test design — tree + combination table
2. **Composition vs. classification** is the fundamental modeling decision
3. **Constraints are essential** — real systems always have impossible combinations
4. **Start minimal, add until sufficient** — unlike Category-Partition which starts large and restricts
5. **Tool support is mature** — 27+ years of evolution from CTE to TESTONA
6. **CTM integrates EP, BVA, and combinatorial testing** into a single framework

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
