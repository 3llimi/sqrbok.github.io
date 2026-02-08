---
title: Static Analysis
parent: Verification and Validation
nav_order: 4
layout: default
has_children: true
---

# Static Analysis

Static analysis examines software without executing it, finding defects through automated inspection of source code, bytecode, or binaries. It complements testing by catching entire classes of bugs early and efficiently.

---

## What is Static Analysis?

**Static analysis** uses automated tools to examine code structure, data flow, and control flow to detect:
- Potential bugs and errors
- Security vulnerabilities
- Code style violations
- Performance issues
- Maintainability problems

Unlike testing, which finds specific instances of failures, static analysis identifies patterns that *might* cause problems. It reasons about all possible executions rather than observing a single run.

---

## Why Static Analysis Matters

Static analysis provides unique advantages over dynamic techniques:

| Benefit | Detail |
|---------|--------|
| **Early defect detection** | Find issues before code runs; finding defects during development is 10x cheaper than finding them in testing {% cite jaspan2007understanding %} |
| **Comprehensive coverage** | Analyze all code paths, not just executed ones |
| **Fast feedback** | Runs in seconds or minutes, not hours |
| **Consistent standards** | Enforce coding rules automatically across teams |
| **Zero runtime overhead** | No performance impact on production |

**Industrial evidence**: Automated static analysis (ASA) achieves a defect yield of 23-37%, comparable to manual inspection, at 60-72% of the cost {% cite zheng2006static %}. When combined with testing and inspection, static analysis catches fault types that the other techniques miss.

---

## The Soundness-Completeness Tradeoff

A fundamental theoretical result constrains what static analysis can achieve.

**Rice's Theorem** {% cite rice1953classes %}: For any non-trivial semantic property of programs, no algorithm can decide whether an arbitrary program has that property. In other words, perfect static analysis is **undecidable**.

This forces every practical tool to make a choice:

| Property | Meaning | Guarantee | Trade-off |
|----------|---------|-----------|-----------|
| **Sound** | Over-approximates program behavior | No false negatives (all real bugs found) | May report false positives |
| **Complete** | Under-approximates program behavior | No false positives (all reports are real) | May miss real bugs |
| **Neither** | Practical balance | Efficient and useful | Some bugs missed, some false alarms |

Most practical tools -- Coverity, SonarQube, CodeQL, SpotBugs -- are **neither perfectly sound nor complete**. They balance precision and recall through heuristics, pattern matching, and configurable sensitivity levels.

> No tool can simultaneously find all bugs, report only real bugs, and always terminate. Understanding this tradeoff is essential for setting realistic expectations about what static analysis can and cannot do.

---

## Topics in This Section

### [Analysis Techniques](techniques.md)
The building blocks of static analysis, from simple lexical pattern matching to sophisticated taint tracking:
- Lexical analysis and style checking
- AST pattern matching
- Type checking and null safety
- Control flow and dataflow analysis
- Taint analysis for security

### [Dataflow Analysis](dataflow.md)
Track variable states through program execution paths to detect bugs that simpler techniques miss:
- Abstract domains and lattices (zero analysis, null analysis)
- Transfer functions and fixed-point computation
- Step-by-step walkthrough: detecting divide-by-zero
- Industrial tools: Facebook Infer, Coverity, Clang Static Analyzer

### [Symbolic Execution](symbolic-execution.md)
Treat inputs as symbolic variables and use constraint solving to explore paths systematically:
- Path conditions and SMT solvers
- Concolic testing (concrete + symbolic)
- KLEE: 90%+ coverage on GNU COREUTILS, 56 bugs found
- Challenges: path explosion, constraint solving, environment modeling

### [Model Checking](model-checking.md)
Exhaustive state exploration for verifying temporal properties of concurrent systems:
- Safety and liveness properties in temporal logic (LTL)
- SPIN, SLAM, Java PathFinder, CBMC
- CEGAR: Counter-Example Guided Abstraction Refinement
- Detailed locking discipline example with product automaton

### [Modern Tools](tools.md)
Industrial static analysis tools and platforms for real-world deployment:
- Google Tricorder: 93,000 findings/day with <10% false positive threshold
- Facebook Infer: separation logic for memory safety at diff time
- The tool agreement problem: <0.4% overlap between tools
- LLM-assisted analysis: IRIS achieves +103% detection over CodeQL alone

---

## The Technique Continuum

Static analysis techniques form a continuum from fast and shallow to slow and deep. Choosing the right level depends on the criticality of the software and the budget for analysis {% cite chess2007static %}.

| Technique | Precision | Recall | Cost |
|-----------|-----------|--------|------|
| Style checking | High | Low | Cheap |
| AST patterns | Medium | Medium | Cheap |
| Type checking | High | Low | Medium |
| Dataflow analysis | Medium-High | Medium | Medium |
| Control flow analysis | Medium | Medium | Medium |
| Taint analysis | Medium | Medium | Medium |
| Model checking | High | High | Expensive |
| Theorem proving | Very High | Variable | Very Expensive |

**Key insight**: There is no single "best" technique. Shallow techniques catch surface-level issues cheaply across large codebases, while deep techniques provide stronger guarantees for critical components. Industrial practice combines multiple techniques at different levels {% cite sadowski2015tricorder %}.

---

## Further Exploration

- [V&V Overview](../overview/) -- The broader landscape of verification and validation techniques
- [Inspection](../inspection/) -- Manual review techniques that complement automated analysis
- [Test Coverage Criteria](../coverage/) -- Measuring thoroughness of dynamic testing

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
