---
title: Tools
parent: Combinatorial Testing
nav_order: 5
layout: default
---

# Tools & Practical Guidance

Several mature tools generate covering arrays from parameter models. Each uses a different algorithm and excels in different scenarios. This page compares the leading tools and provides practical guidance on seed reuse.

---

## Tool Comparison

| Tool | Algorithm | Max Strength | Constraints | Open Source | Best For |
|------|-----------|-------------|-------------|-------------|----------|
| **ACTS** | IPOG | Any t | Yes | Yes (NIST) | Industry standard, general use |
| **PICT** | Greedy | 2-6 | Yes | Yes (Microsoft) | CLI integration, CI/CD |
| **CASA** | SA + SAT | 2-6 | Yes | Yes | Constrained systems |
| **Hexawise** | Commercial | 2-6 | Yes | No | Enterprise, web-based |
| **CAgen** | Multiple | 2+ | Yes | Yes | Research, benchmarking |

---

## ACTS: The Industry Standard

ACTS (Advanced Combinatorial Testing System) is developed by NIST and serves as the de facto standard for industrial CT {% cite lei2007ipog %}.

**Features:**
- GUI and command-line interface
- Mixed-strength arrays (different t for different parameter groups)
- Constraint handling via boolean expressions
- Seeding support (reuse existing tests)
- Export to CSV, spreadsheet, or plain text
- Free download: acts.nist.gov

**Input model format:**
```
[System]
Name: FindDialog

[Parameter]
FindWhat (string): Empty, lowercase, MixedCase, UPPER, space, multi, special, long
MatchCase (boolean): Yes, No
Direction (enum): Up, Down
File (enum): None, Single, Multiple

[Constraint]
# No constraints for this example
```

**Limitation:** ACTS generates abstract test cases but cannot auto-generate executable test scripts {% cite hu2020realworld %}. Testers must manually map abstract values to concrete test data.

---

## PICT: Microsoft's Flexible Generator

PICT (Pairwise Independent Combinatorial Testing) emphasizes flexibility and CI/CD integration.

**Features:**
- Simple text-based input format (version-control friendly)
- Fast generation for pairwise
- Negative testing support (mark invalid values with `~`)
- Weighting to bias toward common configurations
- Open source: github.com/microsoft/pict

**Input model format:**
```
FindWhat: Empty, lowercase, MixedCase, UPPER, space, multi, special, long
MatchCase: Yes, No
Direction: Up, Down
File: None, Single, Multiple

IF [MatchCase] = "Yes" THEN [FindWhat] <> "Empty";
```

**Trade-off:** PICT generates slightly larger suites than ACTS for the same strength, but its text-based format and fast execution make it well-suited for automated pipelines.

---

## CASA: When Constraints Dominate

CASA (Covering Arrays by Simulated Annealing) integrates a SAT solver for systems with complex constraints {% cite garvin2011casa %}.

**When to use CASA:**
- Systems with many interdependent constraints
- When test suite size matters more than generation time
- Test execution takes >21 seconds per test (CASA's generation cost is amortized)

**Performance:**
- **25% smaller** suites than greedy approaches on constrained problems
- **90× faster** than base SA through optimizations
- SAT solver (MiniSAT) handles constraint satisfaction during search

**Trade-off:** Generation is slower than ACTS/PICT, but smaller suites save execution time. The break-even point is approximately 21 seconds per test execution {% cite garvin2011casa %}.

---

## Tool Recommendations by Use Case

| Use Case | Recommended | Why |
|----------|-------------|-----|
| General industrial testing | **ACTS** | Best all-around: speed, size, constraints, seeds |
| CI/CD pipeline integration | **PICT** | Text input, CLI, fast generation |
| Heavily constrained systems | **CASA** | SAT solver handles complex constraint networks |
| Enterprise collaboration | **Hexawise** | Web-based, team features, reporting |
| Academic research | **CAgen** | Multiple algorithms, benchmarking support |
| Strength increase with seeds | **ACTS** | Smallest suites when reusing existing tests |

---

## Seed Reuse Guidance

When you already have tests and need more coverage, should you reuse them as seeds? Bombarda and Gargantini {% cite bombarda2025completion %} studied this systematically across 50 benchmark models.

### Three Scenarios

| Scenario | Description | Use Seeds? | Best Tool |
|----------|-------------|-----------|-----------|
| **Strength increase** (t=2→3) | Existing 2-way suite, need 3-way | **Yes** | ACTS |
| **Test suite completion** (>70%) | Partial suite needs filling | **Maybe** | PICT (at >70%) |
| **Partial test cases** | Incomplete test cases as seeds | **No** | — |

### Key Findings

**Strength increase:** Seeds are clearly beneficial. ACTS produced the smallest 3-way suites when seeded with existing 2-way tests (mean 864 tests vs. PICT's 935 and pMEDICI+'s 1,130) {% cite bombarda2025completion %}.

**Test suite completion:** Results are mixed. ACTS actually produced *larger* suites when given seeds for completion. PICT benefited from seeds only when the existing suite was >70% complete.

**Partial test cases:** Not recommended. The preprocessing overhead to handle incomplete test cases negated any benefits from reuse.

### Generation Speed

| Tool | Mean Generation Time |
|------|---------------------|
| ACTS | **2.3 seconds** |
| pMEDICI+ | 14.3 seconds |
| PICT | 42.3 seconds |

ACTS is dramatically faster for seed-based generation {% cite bombarda2025completion %}.

---

## Workflow Integration

### 1. Define Model in Text File

Keep the parameter model in version control alongside the code:

```
# model.txt — CT model for payment system
UserType: New, Existing, VIP
Amount: Small, Medium, Large, Zero
Currency: USD, EUR, GBP
PaymentMethod: Credit, Debit, Transfer, Cash
```

### 2. Generate in CI Pipeline

```bash
# Generate 2-way covering array
java -jar acts.jar model.txt -Ddoi=2 -o tests.csv
# Or with PICT
pict model.txt /o:2 > tests.csv
```

### 3. Map Abstract to Concrete

Use a mapping layer to convert abstract values to concrete test data:

| Abstract | Concrete |
|----------|----------|
| Amount=Small | 0.01 |
| Amount=Medium | 500.00 |
| Amount=Large | 999,999.99 |
| Amount=Zero | 0.00 |

### 4. Execute with Standard Framework

Feed the concrete test data into pytest, JUnit, or any test framework. Each row of the covering array becomes one test case.

---

## Further Reading

- [Algorithms](algorithms) — How each tool's algorithm works
- [Practice](practice) — End-to-end CT workflow
- [Industrial Evidence](effectiveness) — Tool performance in real projects

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
