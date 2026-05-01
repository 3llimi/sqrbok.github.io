---
title: Multiple Conditions
parent: Coverage
nav_order: 4
layout: default
---

# Multiple Condition Coverage & MC/DC

## Motivation

Branch and Basis Path Coverage are not always sufficient. For example, consider a fault in a compound condition:

### Intended behavior

```fortran
input (A, B)
if (A .OR. B) then
    Z = Z + 1
else
    Z = Z + 2
end if
```

### Actual (Faulty) Implementation

```fortran
input (A, B)
if (A .AND. B) then
    Z = Z + 1
else
    Z = Z + 2
end if
```

### Test Suite:

```text
{ (A=T, B=T), (A=F, B=F) }
```

- **Branch coverage**: 100%
    
- **Basis path coverage**: 100%
    
- ❌ **Fails to detect the bug**
    

**Why?**  
Because the compound predicate uses multiple conditions (`A` and `B`), but the test cases don’t independently evaluate each one. We need **Multiple Condition Coverage** or **MC/DC** to reveal such faults.

---

## Multiple Condition Coverage

### Definition

**Multiple Condition Coverage** requires that:

- Every possible combination of **conditions** in a decision is evaluated **at least once**.
    
- Each **decision** in the program takes **all possible outcomes** (true and false).
    

### Pros and Cons

✅ Very thorough — detects faults missed by simpler coverage  
❌ Requires **2ⁿ** test cases for **n** conditions — exponential growth

### Example: All Combinations for `A` and `B`

```fortran
if (A .OR. B) then
    Z = Z + 1
else
    Z = Z + 2
end if
```

**All combinations (2² = 4):**

- (A=F, B=F)
    
- (A=T, B=F)
    
- (A=F, B=T)
    
- (A=T, B=T)
    

This test suite **does** reveal the fault.

---

## Unfeasible Combinations

Some combinations are logically or practically impossible.

### Example:

```fortran
if (y == 2 .OR. (y == 6 .AND. A == .TRUE.)) then
    ...
end if
```

**Conditions:**

- `C1: y == 2`
- `C2: y == 6`
- `C3: A == .TRUE.`
    
There are 2³ = 8 combinations, but some are **unfeasible**, like `y == 2` and `y == 6` being true at the same time.

|y==2|y==6|A|Feasible?|
|---|---|---|---|
|F|F|F|✅|
|F|F|T|✅|
|F|T|F|✅|
|F|T|T|✅|
|T|F|F|✅|
|T|F|T|✅|
|T|T|F|❌|
|T|T|T|❌|

---

## Example: AND Decision

```fortran
if (A .AND. B .AND. C) then
    ...
end if
```

**All 2³ = 8 combinations:**

|A|B|C|A AND B AND C|
|---|---|---|---|
|T|T|T|T|
|F|T|T|F|
|T|F|T|F|
|T|T|F|F|
|F|F|T|F|
|F|T|F|F|
|T|F|F|F|
|F|F|F|F|

Notice: once any condition is false, the decision is false — many combinations don't provide new insights.

---

## Modified Condition Coverage (MC/DC)

### Definition

**Modified Condition/Decision Coverage (MC/DC)** requires:

1. Every **decision** takes all possible outcomes.
    
2. Every **condition** takes all possible outcomes.
    
3. Each condition is shown to **independently affect** the decision outcome.
    

✅ **Required in safety-critical systems**, such as aerospace (DO-178C)  
✅ Requires **n + 1** test cases instead of 2ⁿ

---

### How Does MC/DC Work?

To show that a **condition affects the decision**, we:

- Change that **one condition**
    
- Keep **others fixed**
    

---

### Example

```fortran
input (A, B)
if (A .OR. B) then
    Z = Z + 1
else
    Z = Z + 2
end if
```

Let’s test 3 cases to see the effect of each condition.

| A   | B   | Expected | Faulty Output | Pass | MC/DC role |
| --- | --- | -------- | ------------- | ---- | ---------- |
| F   | F   | Z + 2    | Z + 2         | ✅    | anchor: pairs with rows 2 and 3 |
| T   | F   | Z + 1    | Z + 2         | ❌    | A's independence: (FF→TF) B=F fixed, outcome changes |
| F   | T   | Z + 1    | Z + 2         | ❌    | B's independence: (FF→FT) A=F fixed, outcome changes |
| T   | T   | Z + 1    | Z + 1         | ✅    | *(not usable for MC/DC — no single flip changes the outcome)* |

The first 3 tests `{FF, TF, FT}` are the valid MC/DC set — `(TT)` must be omitted. When both conditions are true, flipping either one alone leaves the OR result true, so `(TT)` cannot demonstrate independent effect for any condition. Not all 3-test subsets work: `{FF, TF, TT}`, `{FF, FT, TT}`, and `{TF, FT, TT}` all fail MC/DC.

---

### Example for AND

```fortran
if (A .AND. B) then
    Z = Z + 1
else
    Z = Z + 2
end if
```

**Test Suite for MC/DC:**

| A   | B   | Expected | Faulty Output | Pass | MC/DC role |
| --- | --- | -------- | ------------- | ---- | ---------- |
| F   | F   | Z + 2    | Z + 2         | ✅    | *(not usable for MC/DC — no single flip changes the outcome)* |
| T   | F   | Z + 2    | Z + 1         | ❌    | B's independence: (TF→TT) A=T fixed, outcome changes |
| F   | T   | Z + 2    | Z + 1         | ❌    | A's independence: (FT→TT) B=T fixed, outcome changes |
| T   | T   | Z + 1    | Z + 1         | ✅    | anchor: pairs with rows 2 and 3 |

The last 3 tests `{TF, FT, TT}` are the valid MC/DC set — `(FF)` must be omitted. When both conditions are false, flipping either one alone leaves the AND result false, so `(FF)` cannot demonstrate independent effect for any condition. Not all 3-test subsets work: `{FF, TF, FT}`, `{FF, TF, TT}`, and `{FF, FT, TT}` all fail MC/DC.


## Summary

| Coverage Type              | # Tests Needed | Detects Faults | Strength    |
| -------------------------- | -------------- | -------------- | ----------- |
| Branch Coverage            | 2ⁿ             | Sometimes      | Weak        |
| Basis Path Coverage        | ~n +1          | Sometimes      | Moderate    |
| Multiple Condition         | 2ⁿ             | Yes            | Very Strong |
| Modified Condition (MC/DC) | ~n + 1         | Yes            | Strong      |

---

## References

* \[RTCA DO-178C] Software Considerations in Airborne Systems and Equipment Certification


---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
