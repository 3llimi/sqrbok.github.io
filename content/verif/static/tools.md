---
title: Modern Tools
parent: Static Analysis
nav_order: 6
layout: default
---

# Modern Static Analysis Tools

Static analysis tools range from simple linters that check coding style to sophisticated platforms that detect deep security vulnerabilities across millions of lines of code. This page surveys the modern tool landscape, the lessons learned from industrial deployments at Google and Facebook, and the emerging frontier of LLM-assisted analysis.

---

## Tool Landscape Overview

| Category | Examples | Best For |
|----------|----------|----------|
| **Linters** | ESLint, Pylint, RuboCop, Checkstyle | Style violations, basic bugs |
| **Type Checkers** | TypeScript, mypy, Flow, Kotlin | Type safety, null safety |
| **Bug Finders** | SpotBugs, PMD, Error Prone | Known bug patterns |
| **Advanced Analysis** | SonarQube, Coverity, Polyspace | Deep dataflow, inter-procedural analysis |
| **Security** | CodeQL, Semgrep, Checkmarx, Snyk | Vulnerability detection, taint analysis |
| **Platforms** | Tricorder (Google), Infer (Facebook) | Scale deployment, workflow integration |

Each category occupies a different point on the precision-cost tradeoff. Linters are cheap and fast but shallow; advanced analysis tools are deeper but slower and more expensive to maintain.

---

## Google Ecosystem

### Tricorder

Tricorder is Google's program analysis platform, integrating multiple analyzers into the code review workflow {% cite sadowski2015tricorder %}.

**Architecture:** Microservices-based with three analysis stages (FILES, DEPS, COMPILATION), each providing successively more program information to analyzers. Results appear as robot comments in the code review tool.

**Scale and impact:**

| Metric | Value |
|--------|-------|
| Findings per day | ~93,000 across ~31,000 changelists |
| Platform "not useful" rate | ~5% overall (<4% excluding probationary tools) |
| "PLEASE FIX" clicks per day | 716 average |
| Unique Linter users (2014) | 18,000+ |
| Analyzers running | ~30, contributed by 10+ teams |

**Key design principles:**
- **<10% "not useful" threshold** -- Exceed this rate and the analyzer is put on probation; exceed 25% and it may be disabled immediately
- **PLEASE FIX mechanism** -- Reviewers click to ask the author to address a finding, creating peer accountability
- **Suggested fixes** -- Analyzers provide one-click fixes in the code review tool, lowering the barrier to action
- **Domain expert contributions** -- Teams across the company write custom analyzers for their frameworks and APIs
- **Project-level customization** -- Not per-user (team consistency avoids "my colleague ignores the tool" problem)

### Error Prone

Java compile-time bug detection built as a javac extension. Catches common mistakes like incorrect `equals` implementations, broken comparisons, and misuse of concurrency APIs. Findings break the build, so the effective false positive rate must be essentially zero.

### Clang-Tidy

C++ linting, modernization, and bug detection built on the Clang compiler. AST-based pattern matching with over 60 individual checks. Tricorder data shows that enabling Clang-Tidy checks in code review not only prevents new problems but also decreases the total count of existing violations as developers learn the patterns {% cite sadowski2015tricorder %}.

---

## Facebook/Meta Ecosystem

### Infer

Facebook's static analyzer, based on **separation logic** for memory safety verification.

**What it detects:**
- Null pointer dereferences
- Resource leaks (file handles, database connections)
- Thread safety violations
- Memory leaks in C/C++/Objective-C

**Key design choice:** Runs at **diff time** -- integrated into the code submission workflow so developers see results before their change lands. This matches Google's finding that showing results during code review is the optimal integration point.

- Open source: [https://fbinfer.com](https://fbinfer.com)
- Deployed alongside other testing tools (Sapienz for mobile testing)
- Compositional analysis allows scaling to large codebases by analyzing changed files and their dependencies

---

## Open Source Tools

### SonarQube

Multi-language quality platform widely used in enterprise CI/CD pipelines.

- Covers 30+ programming languages
- Broad rule coverage across bugs, vulnerabilities, code smells, and security hotspots
- 18% precision in a comparative study of six Java tools {% cite lenarduzzi2021comparison %}
- Popular for its dashboard and quality gate features
- **Limitation:** Broad coverage comes at the cost of many false positives

### CodeQL (GitHub)

Semantic code analysis that treats code as data, queried using a declarative language.

- **Query language**: Write queries over a database of code facts (AST, data flow, control flow)
- Excellent for taint analysis and security vulnerability detection
- Free for open source projects on GitHub
- Integrates with GitHub Actions for automated scanning on pull requests
- Used as the formal analysis engine in the IRIS neuro-symbolic system {% cite li2024iris %}

### Semgrep

Fast, lightweight pattern matching for custom static analysis rules.

- User-defined rules in YAML (no compilation or build system integration required)
- Good for enforcing custom organizational coding patterns
- Very low barrier to adoption -- rules look like the code they match
- Growing community rule registry for common vulnerability patterns

---

## The Tool Agreement Problem

A critical finding from comparing six Java static analysis tools {% cite lenarduzzi2021comparison %}:

| Tool | Precision | Focus |
|------|-----------|-------|
| SonarQube | 18% | Broadest coverage |
| Better Code Hub | 29% | Design quality |
| Coverity Scan | 37% | Fewer but more precise findings |
| CheckStyle | 86% | Style only (trivial issues) |

### The Shocking Result

**Less than 0.4% agreement** at the line level between any pair of tools. No three or more tools agreed on any single line of code.

This means each tool detects a fundamentally different subset of defects. The tools are not redundant -- they are **complementary**.

**Implication for practice:** No single tool is sufficient. Organizations should combine multiple tools, each catching different defect classes. A linter catches style issues, a type checker catches type errors, a bug finder catches known patterns, and a security analyzer catches taint flows. Together, they provide defense in depth.

---

## LLM-Assisted Static Analysis (Emerging Frontier)

### IRIS: LLM + CodeQL

The IRIS system {% cite li2024iris %} demonstrates a **neuro-symbolic** approach that combines LLMs with traditional static analysis:

**How it works:**
1. CodeQL performs formal taint analysis on the whole repository
2. LLM (GPT-4) **infers missing taint specifications** for third-party library APIs that CodeQL lacks
3. LLM performs **contextual analysis** to filter false positives
4. Formal analysis verifies paths end-to-end, maintaining soundness guarantees

**Results on CWE-Bench-Java (120 validated vulnerabilities):**

| Approach | Vulnerabilities Detected |
|----------|------------------------|
| CodeQL alone | 27 |
| IRIS (LLM + CodeQL) | 55 (**+103%**) |

IRIS also identified 4 previously unknown vulnerabilities that no existing tool could find. The key insight is that LLMs excel at understanding API semantics (what is a source? what is a sanitizer?) while formal analysis excels at tracing data flow through code.

### Broader Landscape

A survey of LLM applications in program analysis {% cite wang2025llmpa %} identifies several emerging uses:

| Application | LLM Role | Current Effectiveness |
|-------------|----------|----------------------|
| Vulnerability detection | Classify code as vulnerable/safe | 50-99% depending on task |
| Specification inference | Generate taint specs for analysis tools | High for common APIs |
| Code summarization | Explain findings to developers | Good for readability |
| Fuzzing guidance | Generate inputs for testing | Promising early results |

### Current Limitations

LLM-assisted static analysis is promising but has significant limitations:

- **Hallucinations**: LLMs may invent bugs that do not exist or miss real ones
- **Non-determinism**: Different runs can produce different results
- **Token limits**: Cannot process an entire large codebase in a single context window
- **No formal guarantees**: LLM outputs are probabilistic, not provably correct
- **Cost**: API calls to large models are expensive at scale

The neuro-symbolic approach (LLM + formal tool) mitigates these limitations by using the LLM for specification inference while relying on the formal tool for verification. This combination preserves formal guarantees while expanding the analysis scope.

---

## Choosing Tools

| Project Context | Recommended Tools |
|-----------------|-------------------|
| **Any project (baseline)** | Linter + type checker + CI integration |
| **Web application** | Add CodeQL or Semgrep for security (taint analysis) |
| **Enterprise Java/C#** | SonarQube for broad coverage + SpotBugs for bug patterns |
| **Safety-critical (automotive, medical)** | Coverity or Polyspace for deep inter-procedural analysis |
| **Large organization (1000+ devs)** | Platform approach following the Tricorder pattern {% cite sadowski2015tricorder %} |
| **Open source project** | CodeQL (free on GitHub) + Semgrep (community rules) |
| **C/C++ systems** | Clang-Tidy + Infer for memory safety |

The key principle is to start with lightweight tools that integrate into the existing workflow (linter in CI, type checker in build) and add deeper analysis incrementally based on the project's risk profile and the team's capacity to triage findings.

---

## Further Exploration

- [Analysis Techniques](techniques.md) -- The foundational techniques that underlie these tools
- [Model Checking](model-checking.md) -- Exhaustive state exploration for concurrent systems
- [Static Analysis Overview](./) -- The soundness-completeness tradeoff and why no tool can be perfect
- [V&V Overview](../overview/) -- The broader landscape of verification and validation

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
