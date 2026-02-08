---
title: Practice
parent: Combinatorial Testing
nav_order: 3
layout: default
---

# Applying CT in Practice

Combinatorial testing follows a structured workflow: identify parameters, define values, set constraints, generate tests, and execute. This page walks through the process with worked examples.

---

## Building a Parameter Model

The first step is identifying **parameters** (factors that vary) and their **values** (equivalence classes for each parameter).

### Example: Find & Replace Dialog

A text editor's Find dialog has these parameters:

| Parameter | Values | Count |
|-----------|--------|-------|
| FindWhat | Empty, lowercase, MixedCase, UPPER, with space, multi-word, special chars, long string | 8 |
| MatchCase | Yes, No | 2 |
| Direction | Up, Down | 2 |
| File | No occurrence, Single match, Multiple matches | 3 |

**Exhaustive testing:** 8 × 2 × 2 × 3 = **96 test cases**

**Pairwise (2-way):** **24 test cases** — every pair of parameter values appears at least once

**All triples (3-way):** **48 test cases** — every triple covered

Pairwise testing reduces the test suite by 75% while systematically covering all pairwise interactions.

---

## Configuration vs. Input Testing

CT applies to two distinct scenarios:

### Configuration Testing

Same test suite executed across different environments:

| OS | Browser | Database |
|----|---------|----------|
| Windows | Chrome | MySQL |
| Linux | Firefox | PostgreSQL |
| macOS | Safari | Oracle |

Goal: verify the software works in all supported environment combinations.

### Input Testing

Different inputs tested in the same environment:

| User Type | Amount | Transaction |
|-----------|--------|-------------|
| New | Small | Credit |
| Existing | Large | Debit |
| VIP | Zero | Transfer |

Goal: exercise all meaningful input combinations.

The math is identical for both — covering arrays don't care whether parameters represent environments or inputs.

---

## Choosing Interaction Strength

The choice of t (interaction strength) depends on risk level and available budget.

### Evidence-Based Guidelines

Kuhn et al. {% cite kuhn2004fault %} showed that 2-way catches 70-97% of faults depending on the domain. Bures and Ahmed {% cite bures2024effectiveness %} demonstrated that 3-way testing detected faults that 2-way missed entirely in 30% of tested systems.

| Risk Level | Strength | Fault Coverage | Example Domain |
|------------|----------|----------------|----------------|
| Low | 2-way | ~90% | Web forms, UI configuration |
| Medium | 3-way | ~98% | Business logic, APIs |
| High | 4-way | ~100% | Medical devices, aerospace |
| Very High | 5-6-way | 100% | FAA collision avoidance, automotive safety |

### Practical Tip

Start with 2-way. If testing reveals interaction faults, increase to 3-way for the affected subsystem. The cost increase is manageable: for 10 parameters with 3 values, 2-way needs 15 tests while 3-way needs 33 {% cite cohen1997aetg %}.

---

## CT Workflow

### Step 1: Identify Parameters and Values

Extract from specification, requirements, or domain knowledge:
- **Inputs:** Form fields, API parameters, command-line options
- **Configuration:** OS, browser, database, server version
- **Environment:** Network speed, memory, locale, timezone

### Step 2: Set Interaction Strength

Match to risk level. Default to 2-way for most systems.

### Step 3: Define Constraints

Exclude invalid combinations (see [Advanced Topics](advanced) for constraint strategies):
- February 30th doesn't exist
- Safari only runs on macOS
- Feature X requires Feature Y enabled

### Step 4: Generate Covering Array

Use a tool (see [Tools](tools)):
```
# ACTS command-line
java -jar acts.jar -o output.csv model.txt

# PICT
pict model.txt > output.txt
```

### Step 5: Map Abstract to Concrete

Convert abstract values to concrete test data:
- "lowercase" → "hello world"
- "special chars" → "a*b+c?d"
- "Large amount" → 999,999.99

### Step 6: Execute and Analyze

Run tests, record results. If faults are found, analyze whether higher-strength testing would have caught them earlier.

### Step 7: Optionally Increase Strength

Existing test suites can serve as seeds when increasing strength (see [Tools: Seed Reuse](tools#seed-reuse-guidance)).

---

## Positive vs. Negative Testing

**Problem:** Invalid inputs can mask real faults.

```python
if value == "Invalid":
    display_error()
    exit()           # Masks all subsequent code

# Never reached when value is invalid
if z == z1:
    x = 6 / (u - 4)  # Division by zero — never tested
```

If invalid values are mixed with valid ones in the same covering array, the error handler may terminate before reaching code with real faults.

**Strategy:** Generate separate covering arrays for:
1. **Positive tests:** All parameters have valid values
2. **Negative tests:** One parameter at a time has invalid value

This avoids the masking effect while maintaining systematic coverage.

---

## Worked Example: Android Configuration

Android devices have many configuration parameters:

| Parameter | Values | Count |
|-----------|--------|-------|
| HardKeyboardHidden | YES, NO | 2 |
| KeyboardHidden | YES, NO | 2 |
| Keyboard | QWERTY, NOKEYS, 12KEY | 3 |
| NavigationHidden | YES, NO | 2 |
| Navigation | TRACKBALL, DPAD, WHEEL, NONAV | 4 |
| Orientation | PORTRAIT, LANDSCAPE | 2 |
| ScreenLayout_Long | YES, NO | 2 |
| ScreenLayout_Size | SMALL, NORMAL, LARGE, XLARGE | 4 |
| Touchscreen | FINGER, NOTOUCH, STYLUS | 3 |

**Exhaustive:** 2 × 2 × 3 × 2 × 4 × 2 × 2 × 4 × 3 = **4,608 configurations**

**2-way covering array:** Approximately **24 configurations** — sufficient to cover all pairwise interactions. ACTS generates the optimal array automatically.

---

## Further Reading

- [Foundations](foundations) — Mathematical theory behind covering arrays
- [Tools](tools) — Practical tool comparison and usage
- [Industrial Evidence](effectiveness) — How CT performs in real-world projects

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
