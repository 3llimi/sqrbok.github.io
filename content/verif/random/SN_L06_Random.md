---
title: "Study Notes: Random Testing"
parent: Random Testing
nav_order: 99
layout: default
---

# Study Notes: Random Testing (L06)

## Purpose
These study notes cover the four pillars of random testing: probabilistic theory, fuzz testing, property-based testing, and mutation testing. The lecture traces the evolution from simple random input generation (1984) to coverage-guided structured fuzzing and LLM-assisted mutation analysis.

**Primary Sources:**
- Hamlet 1984, Random Testing {% cite hamlet1984random %}
- Hamlet 2006, When Only Random Testing Will Do {% cite hamlet2006random %}

**Key Research Papers:**
- Duran & Ntafos 1984: Random vs partition testing {% cite duran1984evaluation %}
- Miller et al. 1990: Fuzz testing origin {% cite miller1990fuzz %}
- Manes et al. 2019: Fuzzing survey {% cite manes2019fuzzing %}
- Claessen & Hughes 2000: QuickCheck {% cite claessen2000quickcheck %}
- DeMillo et al. 1978: Mutation testing {% cite demillo1978hints %}
- Jia & Harman 2011: Mutation testing survey {% cite jia2011mutation %}

---

## Part 1: Random Testing Basics

### 1.1 What is Random Testing?

Random testing selects test inputs independently at random from the program's input domain {% cite hamlet1984random %}. It is not haphazard — it requires:

1. A **defined input distribution** (operational profile or uniform)
2. **Statistical independence** between test selections
3. An **oracle** to determine pass/fail

| "Random" in Testing | "Random" Elsewhere |
|--------------------|--------------------|
| Systematic exploration | Arbitrary selection |
| Statistical guarantees | No guarantees |
| Automated generation | Manual "pick some" |

### 1.2 Why Use Random Testing?

| Benefit | Explanation |
|---------|-------------|
| **Cheap** | Once the oracle is solved, generating inputs is trivial |
| **Probabilistic guarantees** | Can calculate reliability bounds {% cite hamlet1984random %} |
| **Complements partition** | Finds different faults than systematic testing |
| **Scales well** | Can generate millions of tests automatically |

Random testing is particularly useful when domain knowledge is lacking, the state space is large, or reliability calculations are required {% cite hamlet2006random %}.

{: .highlight }
> **Exam Tip:** Random testing is NOT haphazard testing. It requires a defined distribution, statistical independence, and an oracle. Memorize these three requirements.

---

## Part 2: Random Testing Theory

### 2.1 Probabilistic Guarantees

The fundamental formula for random testing confidence {% cite hamlet1984random %}:

$$C = 1 - (1-F)^N$$

Where:
- **C** = confidence that at least one failure would have been observed
- **F** = true failure rate in the operational profile
- **N** = number of successful random tests

| Confidence | Target F | Tests Needed |
|------------|----------|--------------|
| 90% | 10⁻³ | 2,302 |
| 90% | 10⁻⁴ | 23,025 |
| 99% | 10⁻⁴ | 46,050 |
| 99% | 10⁻⁵ | 460,517 |

**Key insight:** 23,000 successful random tests give 90% confidence the failure rate is below 1 in 10,000 {% cite hamlet2006random %}.

{: .highlight }
> **Exam Tip:** Know the formula C = 1-(1-F)^N and the planning table. Be able to compute N given C and F: N = ln(1-C) / ln(1-F).

### 2.2 The Oracle Problem

The oracle determines what class of bugs random testing can find {% cite manes2019fuzzing %}:

| Oracle Type | Description | Overhead |
|-------------|-------------|----------|
| **Gold standard** | Reference implementation | High |
| **Crash detection** | Detect crashes/hangs | None |
| **Sanitizers** | ASan (~73%), UBSan (~20%), TSan (~5-15x) | Variable |
| **Assertions** | Pre/postconditions | Low |
| **Properties** | Invariants for all inputs | Medium |

**Key insight:** The oracle is the bottleneck. Random testing is only practical with automated evaluation {% cite manes2019fuzzing %}.

### 2.3 Random vs. Partition Testing

The debate has been running since 1984 {% cite duran1984evaluation %}:

| Year | Authors | Finding |
|------|---------|---------|
| 1984 | Duran & Ntafos | Random often more cost-effective |
| 2001 | Ntafos | ~20% more random tests erase partition advantage |
| 2006 | Hamlet | Only random will do for unstructured spaces |

**Resolution (Ntafos 2001):** The gap shrinks to <0.05% at scale. Roughly 20% more random tests eliminate any partition testing advantage {% cite ntafos2001comparisons %}.

### 2.4 Randoop: Feedback-Directed Random Testing

Randoop builds test sequences incrementally {% cite pacheco2007randoop %}:

| Metric | Value |
|--------|-------|
| Errors found | **30** in 15 human hours (on code tested by 40 engineers for 5 years) |
| Productivity | **100x** faster than manual testing |
| Tests generated | 4,000,000 sequences |

The **"plateau effect"** — error-finding rate drops from 5/hour to zero after ~12 hours {% cite pacheco2007randoop %}.

{: .highlight }
> **Exam Tip:** Know the "20% rule" — 20% more random tests erase partition advantage (Ntafos 2001). Know the two scenarios where only random testing will do (Hamlet 2006).

---

## Part 3: Fuzz Testing

### 3.1 What is Fuzz Testing?

Fuzz testing feeds programs with malformed and unexpected input to find security defects, crashes, or denial of service {% cite miller1990fuzz %}.

### 3.2 Three Generations of Fuzzing

| Generation | Era | Approach | Example |
|------------|-----|----------|---------|
| **1. Blackbox** | 1990-2000 | Random bytes, no program knowledge | Miller's `cat /dev/urandom \| prog` |
| **2. Whitebox** | 2000-2013 | Symbolic execution + constraint solving | SAGE (Microsoft) |
| **3. Greybox** | 2013-present | Lightweight coverage feedback + evolution | AFL, AFLGo, libFuzzer |

**Greybox won:** Best throughput-to-insight ratio with ~5-20% overhead {% cite manes2019fuzzing %}.

### 3.3 Miller's Fuzz Studies (16-Year Longitudinal)

| Year | Target | Crash Rate |
|------|--------|------------|
| 1990 | UNIX utilities | **25-33%** {% cite miller1990fuzz %} |
| 2000 | Windows NT apps | **21%** (+24% hang) {% cite forrester2000windows %} |
| 2006 | macOS CLI | 7% (improved) {% cite miller2006macos %} |
| 2006 | macOS GUI | **73%** (worst ever) {% cite miller2006macos %} |

### 3.4 SAGE and AFL

**SAGE** found **one-third of all file-fuzzing bugs** during Windows 7 development: **400 machine-years**, **3.4 billion** constraints {% cite bounimova2010sage %}.

**AFL** introduced edge-based coverage with evolutionary mutation {% cite manes2019fuzzing %}. **A 1% increase in coverage correlates with 0.92% more bugs found.**

**AFLGo** found **Heartbleed in <20 min** (symbolic execution failed in 24h) {% cite bohme2017directed %}.

### 3.5 Evaluating Fuzzers

Klees et al. {% cite klees2018evaluating %}: 57,142 "unique crashes" = only **9 actual bugs**. Standards: 30+ trials, 24h minimum, Mann-Whitney U test.

{: .highlight }
> **Exam Tip:** Memorize the three generations of fuzzing (Blackbox → Whitebox → Greybox) with one example each. Know that 57,142 "unique crashes" turned out to be only 9 actual bugs (Klees 2018).

---

## Part 4: Property-Based Testing

### 4.1 QuickCheck: The PBT Paradigm

Claessen and Hughes introduced PBT in 2000 {% cite claessen2000quickcheck %}. Three core ideas:

1. **Properties** — boolean functions that must hold for all inputs
2. **Generators** — produce random values of specific types
3. **Shrinking** — reduce counterexample to minimal failing case

**Where bugs hide:** ~1/3 implementation, ~1/3 specification, ~1/3 generators {% cite claessen2000quickcheck %}.

### 4.2 Hypothesis: Modern PBT for Python

MacIver and Hatfield-Dodds developed Hypothesis {% cite maciver2019hypothesis %}:

**Key innovation:** Universal byte-stream representation — no custom shrinker needed per type.

**Impact:** 100,000+ weekly downloads, ~4% of Python developers, found bugs in NumPy and Astropy.

### 4.3 JQF: Where PBT Meets Fuzzing

JQF bridges PBT and coverage-guided fuzzing {% cite padhye2019jqf %}:

| Benchmark | Random PBT | Zest (Coverage-Guided) |
|-----------|-----------|----------------------|
| Trie bug | Not found in **7M+** executions | Found in **~5K** executions |

**1,000x improvement** with coverage guidance. Found **42 bugs** in OpenJDK, Apache Commons, Google Closure, Mozilla Rhino {% cite padhye2019jqf %}.

### 4.4 PBT in Industry Practice

Goldstein et al. conducted 30 interviews at Jane Street {% cite goldstein2024pbt %}:

| High-Leverage Pattern | Usage |
|-----------------------|-------|
| **Differential testing** | 17/30 |
| **Round-trip** (encode-decode = identity) | 11/30 |
| **Catastrophic failure** detection | 7/30 |

**Primary challenge:** "Not knowing what properties to test" — 16/30 practitioners {% cite goldstein2024pbt %}.

{: .highlight }
> **Exam Tip:** Know the PBT evolution: QuickCheck (2000, properties) → Hypothesis (2019, universal byte-stream) → JQF (2019, coverage-guided). The key number is 1,000x improvement from coverage guidance.

---

## Part 5: Mutation Testing

### 5.1 What is Mutation Testing?

Mutation testing introduces small deliberate changes (mutants) into the program and checks whether existing tests catch them {% cite demillo1978hints %}.

$$\text{Mutation Score} = \frac{\text{Killed}}{\text{Total} - \text{Equivalent}} \times 100\%$$

### 5.2 Theoretical Foundations

**Competent Programmer Hypothesis:** Programmers create programs "close to correct" {% cite demillo1978hints %}.

**Coupling Effect:** Tests that catch all simple errors also implicitly catch >99% of complex errors.

### 5.3 Mutation Operators: The Essential Five

Five operators achieve 99.5% of the effectiveness of the full operator set {% cite jia2011mutation %}:

| Operator | Name | Example |
|----------|------|---------|
| **ABS** | Absolute value insertion | `x` → `abs(x)` |
| **UOI** | Unary operator insertion | `x` → `−x`, `++x` |
| **LCR** | Logical connector replacement | `&&` → `\|\|` |
| **AOR** | Arithmetic operator replacement | `+` → `−`, `*` → `/` |
| **ROR** | Relational operator replacement | `>` → `>=`, `==` → `!=` |

### 5.4 The Equivalent Mutant Problem

10-40% of mutants are equivalent — undecidable to detect {% cite jia2011mutation %}.

**LLM-Assisted Detection:** Fine-tuned UniXCoder (110M params) achieves **86.58% F1-score** vs GPT-4 at 55.90% {% cite tian2024llm_emd %}.

### 5.5 Mutation Testing in Practice

Smith and Williams {% cite smith2009mutation %}: 2-9% coverage gain in 60 minutes, ~1 new test every 6 minutes. **"Crossfire"** — one test kills multiple mutants.

{: .highlight }
> **Exam Tip:** Know the mutation score formula. Know the 5 essential operators (ABS, UOI, LCR, AOR, ROR) and that they achieve 99.5% effectiveness. Know that 10-40% of mutants are equivalent and detection is undecidable.

---

## Part 6: Summary — Choosing the Right Technique

| Technique | Purpose | Oracle | Key Result |
|-----------|---------|--------|------------|
| **Random** | Find faults | Required | 90% confidence @ 23K tests |
| **Fuzz** | Security bugs | Crash / sanitizers | 25-33% of apps crash |
| **PBT** | Specification bugs | Properties | 1,000x with coverage guidance |
| **Mutation** | Test quality | Existing tests | 5 operators cover 99.5% |

**The oracle determines the ceiling** — from crash detection to properties to differential testing.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
