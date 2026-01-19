---
title: Google Engineering Practices
parent: Industry Practices
nav_order: 8
layout: default
---

# Google Engineering Practices

Google has developed and documented engineering practices that scale to massive codebases (2+ billion lines of code) and thousands of engineers. These practices are detailed in *Software Engineering at Google* (Winters, Manshreck, Wright) and supported by empirical research {% cite winters2020swe %}.

## The Test Pyramid

The **test pyramid** organizes tests by scope, speed, and cost. The base (widest) contains the most tests; the top (narrowest) contains the fewest.

### The 70/20/10 Rule

Google recommends this distribution for test suites {% cite winters2020swe %}:

| Level | Name | Scope | Speed | Ratio |
|-------|------|-------|-------|-------|
| Base | **Small** (Unit) | Single function/class | Milliseconds | **70%** |
| Middle | **Medium** (Integration) | 2+ modules interacting | Seconds | **20%** |
| Top | **Large** (E2E/System) | Entire system | Minutes | **10%** |

### Why This Distribution Works

| Test Type | Advantages | Disadvantages |
|-----------|------------|---------------|
| Small tests | Fast, deterministic, cheap, easy to debug | Don't prove system works end-to-end |
| Large tests | Validate real user journeys | Slow, flaky, expensive, hard to diagnose |

> "Small tests are encouraged because they are fast, deterministic, and provide immediate feedback... Large tests are essential because they test what is ultimately most important—how the application works for a user." {% cite winters2020swe %}

### Test Selection: The MinDist Discovery

Research on Google's Test Automation Platform (TAP) found that test distance from modified code predicts failure {% cite memon2017testing %}:

| MinDist | Meaning | Recommendation |
|---------|---------|----------------|
| ≤ 10 edges | Close to change | Worth running |
| > 10 edges | Far from change | Almost never breaks |

**Result**: Executing only tests with MinDist ≤ 10 **saved 42% of resources** without missing breakages.

---

## Code Review Process

At Google, every code change requires review. No individual has the privilege to submit changes alone {% cite winters2020swe %} {% cite sadowski2018codereview %}.

### The Review Flow

1. **Author creates Change List (CL)** - Median ~24 lines
2. **Automated checks run** - Static analysis, tests, coverage
3. **Human reviewer assigned** - Must have Readability certification
4. **Review for**: correctness, clarity, consistency, comments
5. **LGTM approval** - "Looks Good To Me"
6. **Merge** - Via submit queue after approval

### Readability Certification

Reviewers must pass **Readability certification** for each language (C++, Java, Python, Go, etc.). This ensures:

- Consistent style across codebase ("looks like one person wrote it")
- Best practices enforced automatically
- New engineers learn from review feedback

### Review Metrics

| Metric | Google Target | Why |
|--------|---------------|-----|
| Change size | Median ~24-100 lines | Easier to review thoroughly |
| Review latency | < 4 hours (median) | Keep developers productive |
| Iterations | 1-2 rounds typical | Indicates clear code |
| Reviewer count | 1 (median) | Single expert is sufficient |

> "The foremost reason for introducing code review at Google was to improve code understandability and maintainability." {% cite sadowski2018codereview %}

---

## Static Analysis Integration

Google's static analysis runs at multiple stages to catch issues early {% cite winters2020swe %}.

### Tricorder Platform

Tricorder is Google's central static analysis platform that:

- Runs on every code change
- Integrates results directly into code review UI
- Maintains low false-positive rate (high precision)
- Supports "Not useful" feedback from developers

### When Static Analysis Runs

| Stage | Purpose | Feedback Time |
|-------|---------|---------------|
| **IDE** | Underlines problems as you type | Immediate |
| **Pre-submit** | Integrated into code review UI | Before merge |
| **CI Pipeline** | Blocks merge if not green | Minutes |

### What It Catches

- Null pointer dereferences
- Memory leaks
- Security vulnerabilities (SQL injection, XSS)
- Style violations
- Deprecated API usage
- Thread safety issues

### The 10% Rule

> If a static analysis check has a false positive rate above **10%**, it gets disabled. Developer trust is paramount.

Google reports **2 orders of magnitude** reduction in XSS vulnerabilities through safe types enforcement.

---

## Flaky Tests Management

A **flaky test** passes or fails without any code change. Flakiness undermines trust in the entire test suite {% cite winters2020swe %}.

### Common Causes

| Cause | Description |
|-------|-------------|
| **External dependencies** | Networks, databases, third-party APIs |
| **Order dependence** | Tests rely on state from previous tests |
| **Time dependence** | Real clock, time zones |
| **Concurrency** | Race conditions in test or code |
| **Resource collisions** | Same port, directory, DB table |

### Mitigation Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Quarantine** | Move flaky tests to separate suite | Immediate triage |
| **Retry** | Run failed tests N times before failing build | Known intermittent issues |
| **Deflake** | Run test many times to detect flakiness | Proactive detection |
| **Fix root cause** | Rewrite test to be deterministic | Permanent solution |
| **Delete** | Remove test entirely | No value provided |

> "Flaky or unstable automation creates 'noise' that can lead engineers to ignore test results." {% cite page2008mstesting %}

---

## Test Certified Program

Google's internal **Test Certified** program defines maturity levels for test automation {% cite winters2020swe %}:

| Level | Requirements |
|-------|--------------|
| **Level 1** | CI build established, tests classified by size, flaky tests identified |
| **Level 2** | No red tests at release, smoke tests pass before submit |
| **Level 3** | Tests required for all nontrivial changes |
| **Level 4** | Pre-submit smoke tests, <30 min total runtime |
| **Level 5** | Tests for every bug fix, 60% coverage, static analysis integrated |

### Coverage Targets by Level

| Level | Total Coverage | Small Test Coverage |
|-------|----------------|---------------------|
| Level 2 | 50% incremental | 10% |
| Level 4 | 40% | 25% |
| Level 5 | 60% | 40% |

### Coverage Limitations

Even at Google, coverage has known limitations:

- 100% coverage doesn't guarantee no bugs
- Coverage doesn't detect missing functionality
- Retrofitted tests may exercise buggy behavior
- Test environment ≠ production

> "Coverage finds gaps, tests find bugs."

---

## Testing Roles at Google

Google's testing organization evolved toward developer-owned quality {% cite winters2020swe %}:

| Role | Title | Focus |
|------|-------|-------|
| **SWE** | Software Engineer | Feature code + unit tests |
| **SET** | Software Engineer in Test | Test infrastructure, frameworks, testability |
| **TE** | Test Engineer | User experience, E2E automation, risk identification |

### "You Build It, You Break It"

This philosophy makes developers accountable for quality:

1. Developer writes feature → Developer writes tests
2. Test breaks → Developer who changed code fixes it
3. Bug in production → Developer is first escalation point
4. **Outcome**: Quality is prevention, not detection

### Organizational Model

Google's **Engineering Productivity** team operates as a centralized testing organization:

- Testers "on loan" to product teams
- Can raise quality concerns independently
- Not subservient to product managers
- Ratio varies: 1:5 (infrastructure) to 1:50 (consumer apps)

---

## Key Numbers to Remember

| Metric | Value | Source |
|--------|-------|--------|
| Test pyramid ratio | 70/20/10 | SE@Google |
| Median change size | 24 lines | Sadowski 2018 |
| Review latency | < 4 hours | Sadowski 2018 |
| False positive threshold | ≤ 10% | SE@Google |
| MinDist cutoff | 10 edges | Memon 2017 |
| Resource savings (MinDist) | 42% | Memon 2017 |
| Test Certified L5 coverage | 60% | SE@Google |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
