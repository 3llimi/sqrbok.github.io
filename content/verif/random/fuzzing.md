---
title: Fuzz Testing
parent: Random Testing
nav_order: 2
layout: default
---

# Fuzz Testing

Fuzz testing (fuzzing) feeds programs with randomly generated or mutated inputs to discover crashes, hangs, and security vulnerabilities. From its origins as a class project in 1990, fuzzing has evolved into the dominant automated vulnerability discovery technique used by Google, Microsoft, and the broader security community.

---

## Definition

> "Fuzzing is the execution of the PUT [program under test] using input(s) sampled from an input space that protrudes the expected input space of the PUT." {% cite manes2019fuzzing %}

A fuzzer generates inputs that include **unexpected, malformed, or boundary values** — not just valid inputs that happen to be randomly chosen. The goal is to find inputs that trigger undefined behavior, crashes, or security violations.

---

## Three Generations of Fuzzing

### Generation 1: Blind Random Fuzzing (1990-2000)

Miller's landmark studies established fuzzing through pure random input generation:

**UNIX utilities (1990)**: Miller's approach was disarmingly simple {% cite miller1990fuzz %}:

```bash
# Generate random bytes and pipe them into a utility
cat /dev/urandom | head -c 100000 | program_under_test
# If the program crashes or hangs → bug found
```

25-33% of utilities on seven UNIX variants crashed or hung. The failures exposed fundamental programming errors: pointer and array bounds violations, unchecked return values, race conditions, and signed character handling bugs.

**Windows NT (2000)**: Extended to GUI applications — 21% of tested applications crashed and 24% hung on random valid Win32 messages; 100% failed on random raw messages {% cite forrester2000windows %}. The study exposed a systematic Win32 API flaw: applications could not distinguish window messages from the OS versus those from other programs, creating an inherent vulnerability.

**macOS X (2006)**: Command-line reliability improved to 7% crash rate (down from 33%), but GUI failure rate reached 73% — the worst ever recorded {% cite miller2006macos %}.

**The longitudinal finding**: The same error classes — buffer overflows, null pointer dereferences, unchecked return values — persisted for 16 years across operating systems. Simple random testing continues to find bugs that sophisticated techniques miss {% cite forrester2000windows %}.

### Generation 2: Whitebox Fuzzing (2000-2013)

**SAGE** (Scalable Automated Guided Execution) at Microsoft combined symbolic execution with fuzzing {% cite bounimova2010sage %}:

- Executes the program concretely, records path constraints, negates constraints to generate new inputs that explore different paths
- Found **one-third of all file-fuzzing bugs** during Windows 7 development
- Scale: 400 machine-years of computation, 3.4 billion constraints solved
- Caught bugs missed by both static analysis and blackbox fuzzing

SAGE showed that "the art of constraint generation is as important as the art of constraint solving" — how you model program behavior matters as much as the solver's power {% cite bounimova2010sage %}.

### Generation 3: Coverage-Guided Greybox Fuzzing (2013-present)

Modern greybox fuzzers use lightweight instrumentation to measure code coverage, then evolve inputs that reach new program states.

**The AFL model**: American Fuzzy Lop (AFL, 2013) introduced edge-based coverage measurement combined with an evolutionary algorithm {% cite manes2019fuzzing %}:

1. **Instrument** the program to record branch transitions
2. **Select** a seed input from the queue
3. **Mutate** (bit flips, arithmetic, block operations, dictionary tokens)
4. **Execute** and check for new coverage
5. **Keep** inputs that trigger new edges; discard the rest

A 1% increase in coverage correlates with 0.92% more bugs found {% cite manes2019fuzzing %}.

**What mutation looks like** — AFL takes a seed input and applies small changes:

```
Original seed: "GET /index.html HTTP/1.1\r\n"
Bit flip:      "GET /index.htm\xec HTTP/1.1\r\n"   ← flipped one bit
Arithmetic:    "GET /index.html HTTP/2.1\r\n"       ← incremented '1' → '2'
Block delete:  "GET HTTP/1.1\r\n"                   ← removed a chunk
```

If any mutated input triggers a new code edge, it joins the queue for further mutation.

**Directed greybox fuzzing (AFLGo)**: Böhme et al. extended greybox fuzzing with distance-based guidance via simulated annealing, directing the fuzzer toward specific program locations {% cite bohme2017directed %}. AFLGo exposed Heartbleed in under 20 minutes where Katch (symbolic execution) failed in 24 hours, and found 26 bugs in OSS-Fuzz targets including 17 CVEs.

---

## Fuzzing Taxonomy

Manes et al. present a unified model with five core functions {% cite manes2019fuzzing %}:

| Function | Purpose | Examples |
|----------|---------|----------|
| **PREPROCESS** | Instrumentation, seed selection | Compile-time instrumentation, minset computation |
| **SCHEDULE** | Pick next configuration to fuzz | Power schedules (AFLFast), distance-based (AFLGo) |
| **INPUTGEN** | Generate test input | Mutation (bit-flip, arithmetic), generation (grammar-based) |
| **INPUTEVAL** | Execute and detect bugs | Crash detection, sanitizers, coverage measurement |
| **CONFUPDATE** | Update fuzzer state | Add to queue if new coverage, update energy |

### By Knowledge Level

| Type | Knowledge | Overhead | Strengths |
|------|-----------|----------|-----------|
| **Black-box** | None (I/O only) | Minimal | Simple, fast, no source needed |
| **Grey-box** | Coverage feedback | Low (~5-20%) | Best throughput-to-insight ratio |
| **White-box** | Full program analysis | High | Systematic path exploration |

---

## Bug Oracles for Fuzzing

The oracle determines what bugs a fuzzer can find {% cite klees2018evaluating manes2019fuzzing %}:

| Oracle | Detects | Overhead |
|--------|---------|----------|
| **Crash signal** | Segfaults, abort | None |
| **AddressSanitizer (ASan)** | Buffer overflow, use-after-free, double-free | ~73% |
| **UndefinedBehaviorSan (UBSan)** | Integer overflow, null deref, alignment | ~20% |
| **ThreadSanitizer (TSan)** | Data races, deadlocks | ~5-15x |
| **MemorySanitizer (MSan)** | Uninitialized memory reads | ~3x |

---

## Evaluating Fuzzers

Klees et al. established critical benchmarking standards after finding widespread methodological problems in fuzzing research {% cite klees2018evaluating %}:

| Problem | Evidence | Recommendation |
|---------|----------|----------------|
| Single-run evaluations | 56% of papers used one run | **30+ independent trials** |
| Crash ≠ bug | 57,142 AFL "unique crashes" → 9 actual bugs | **Ground truth measurement** |
| Short campaigns | Performance rankings reverse over time | **24-hour minimum timeout** |
| No statistical tests | Results may be due to randomness | **Mann-Whitney U test** |
| Seed sensitivity | Different seeds → different results | **Report seed selection methodology** |

---

## The Convergence with Property-Based Testing

Pure fuzzing mutates bytes without understanding input structure. Property-based testing generates structured inputs without coverage feedback. **JQF** bridges both paradigms {% cite padhye2019jqf %}: coverage-guided mutation of structured inputs.

Where pure random testing failed to find a Trie bug in 7 million+ executions, Zest (coverage-guided) found it in approximately 5,000 executions — a **1,000x improvement** {% cite padhye2019jqf %}.

See [Property-Based Testing](property-based) for the full PBT story.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
