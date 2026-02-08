---
title: Empirical Effectiveness
parent: Static Analysis
nav_order: 7
layout: default
---

# Empirical Effectiveness of Static Analysis

Static analysis effectiveness depends on false positive rates, cost relative to alternatives, and tool precision. This page synthesizes empirical evidence from industry studies to answer a practical question: **how well does static analysis actually work?**

---

## The 10% False Positive Rule

The single most important metric for static analysis adoption is not accuracy -- it is **developer tolerance for false positives**. Two large-scale industrial studies converge on the same threshold.

**Google** enforces a strict false positive policy for all Tricorder analyzers {% cite sadowski2015tricorder %}:

| Threshold | Action |
|-----------|--------|
| **< 10%** effective false positive rate | Analyzer remains active |
| **> 10%** | Analyzer placed on **probation** |
| **> 25%** | Analyzer **disabled immediately** |

Platform-wide, Tricorder achieves approximately 5% "not useful" rate. Critically, Google measures **developer perception** -- the rate at which developers click "not useful" on findings -- rather than theoretical accuracy metrics.

**eBay** reached the same threshold through a different path {% cite jaspan2007understanding %}:

| Phase | False Positive Rate | Developer Response |
|-------|--------------------|--------------------|
| Initial deployment (default config) | **50%** | Declared tool "useless" |
| After customization (75% of checks disabled) | **10%** | Acceptance and adoption |

> **Key insight:** The threshold for developer tolerance is remarkably consistent across organizations -- around 10%. Above this, developers simply ignore all warnings.

---

## Cost-Effectiveness Benchmarks

Static analysis is not a replacement for testing or inspection -- it is a cheaper complement that catches different fault types.

| Metric | Value | Source |
|--------|-------|--------|
| Development vs. Testing cost | **10x cheaper** to find defects during development | {% cite jaspan2007understanding %} |
| ASA vs. Inspection cost | **60-72%** of manual inspection cost | {% cite zheng2006static %} |
| ASA defect yield | 23-37% | {% cite zheng2006static %} |
| Testing defect yield | 63-98% | {% cite zheng2006static %} |
| Combined (ASA + Testing) | Higher than either alone | {% cite zheng2006static %} |

**Interpretation:** ASA does not replace testing -- it complements it. ASA catches assignment and checking faults that testing misses. Testing catches functional and algorithmic faults that ASA misses. The combination yields better results than either technique alone.

---

## Tool Precision in Practice

A comparative study of six Java static analysis tools {% cite lenarduzzi2021comparison %} reveals wide variation in precision and coverage:

| Tool | Precision | Coverage | Notes |
|------|-----------|----------|-------|
| SonarQube | 18% | Broadest rule set | Many rules, many false positives |
| Better Code Hub | 29% | Design quality | SIG-based metrics |
| Coverity Scan | 37% | Deep analysis | More precise, fewer rules |
| LGTM (CodeQL) | -- | Security focus | Taint analysis strength |
| FindSecBugs | -- | Security focus | Java-specific |
| CheckStyle | 86% | Style only | High precision because issues are trivial |

{: .warning }
> **Critical finding:** Less than 0.4% agreement between tools at the line level. Different tools detect fundamentally different defect types. No single tool is sufficient.

The implication is clear: organizations serious about static analysis must deploy **multiple tools** covering different defect categories, rather than relying on a single tool for comprehensive coverage.

---

## Scale at Google

Google's static analysis infrastructure demonstrates that SA can operate at extreme scale {% cite sadowski2015tricorder %}:

| Metric | Value |
|--------|-------|
| Findings per day | **~93,000** across ~31,000 changelists |
| Code reviews per day | **~50,000** -- SA findings integrated into review |
| "Not useful" rate | **~5%** platform-wide |
| Unique Linter users | **18,000+** (separate from Tricorder) |

Key architectural decisions that enable this scale:

- **Analyzers contributed by domain experts** across the company, not a central SA team
- **Suggested fixes** significantly increase the fix rate -- developers are more likely to act when the tool provides a one-click resolution
- **Project-level configuration**, not per-user -- ensures team consistency
- **Code review integration** -- findings appear as review comments, not standalone reports

---

## Symbolic Execution Effectiveness

Symbolic execution bridges static and dynamic analysis. KLEE results on the COREUTILS suite {% cite cadar2008klee %} demonstrate what automated analysis can achieve:

| Metric | Value |
|--------|-------|
| Programs tested | **452** automatically |
| Line coverage | **90%+** (median 94.7%) |
| Coverage improvement | Beat 15 years of manually-maintained developer tests by **16.8%** |
| Bugs found | **56 serious bugs**, 3 undetected for 15+ years |
| Notable discoveries | Bugs in tools considered "thoroughly tested" (sort, cut, comm) |

These results demonstrate that automated techniques can surpass manual test suite construction for coverage, even on mature, well-tested software.

---

## Complementary Strengths of V&V Techniques

No single verification technique catches all fault types. The Nortel Networks study {% cite zheng2006static %} quantified the complementary strengths:

| Fault Type | ASA | Testing | Inspection |
|------------|-----|---------|------------|
| Assignment faults | **Strong** | Weak | Medium |
| Checking faults | **Strong** | Medium | Medium |
| Functional faults | Weak | **Strong** | Medium |
| Algorithmic faults | Weak | **Strong** | **Strong** |
| Interface faults | Medium | Medium | **Strong** |
| Design faults | Weak | Weak | **Strong** |

{: .important }
> **Best practice:** Combine all three techniques. Each catches fault types the others miss. ASA excels at mechanical errors (wrong assignment, missing check), testing excels at behavioral errors (wrong output, wrong algorithm), and inspection excels at structural errors (bad interface, poor design).

---

## Summary

| Dimension | Key Finding |
|-----------|-------------|
| False positive threshold | **10%** -- consistent across Google and eBay |
| Cost advantage | **10x cheaper** than finding defects in testing |
| ASA vs. inspection cost | **60-72%** of manual inspection cost |
| Tool agreement | **< 0.4%** at line level -- no single tool suffices |
| Symbolic execution | **90%+ coverage** automatically, beats manual tests |
| Best strategy | **Combine ASA + testing + inspection** |

---

## Further Exploration

- [Analysis Techniques](techniques.md) -- The building blocks from lexical analysis to taint tracking
- [Industrial Deployment](deployment.md) -- Case studies of SA deployment at Google, eBay, Microsoft, and Nortel
- [Static Analysis Overview](./) -- Why static analysis matters and the soundness-completeness tradeoff
- [Inspection Effectiveness](../inspection/effectiveness.md) -- Complementary data on manual inspection ROI

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
