---
title: Analysis
parent: Overview
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

Unlike testing, which finds specific instances of failures, static analysis can identify patterns that *might* cause problems.

---

## Why Static Analysis Matters

Static analysis provides:
- **Early defect detection** - Find issues before code runs
- **Comprehensive coverage** - Analyze all code paths, not just executed ones
- **Fast feedback** - Runs in seconds or minutes, not hours
- **Consistent quality** - Enforce standards automatically
- **Zero runtime overhead** - No performance impact on production

**Economics**: Static analysis is typically 10-100x faster than testing for finding certain bug types.

---

## Topics in This Section

### [Static Analysis Definitions](analysis_definitions.md)
Fundamental concepts and terminology:
- What is static vs. dynamic analysis?
- Types of static analysis (syntactic, semantic, flow-sensitive)
- Sound vs. complete analysis
- False positives and false negatives

### [Analysis Properties](analysis_properties.md)
What can be detected through static analysis:
- **Type errors** - Mismatched types, null dereferences
- **Resource leaks** - Unclosed files, memory leaks
- **Security flaws** - SQL injection, XSS, buffer overflows
- **Concurrency bugs** - Race conditions, deadlocks
- **Code smells** - Complexity, duplication, violations

### [Static Analysis Tools](tools.md)
Categories and examples of analysis tools:
- **Linters** - Style and basic bug detection (ESLint, Pylint, RuboCop)
- **Type checkers** - Type safety (TypeScript, mypy, Flow)
- **Advanced analyzers** - Deep semantic analysis (SonarQube, Coverity, CodeQL)
- **Security scanners** - Vulnerability detection (Snyk, Checkmarx, Fortify)

### [Checking Example](checking_example.md)
Practical examples of static analysis in action:
- Real code with bugs
- How tools detect them
- Interpreting results
- Fixing issues

---

## Types of Static Analysis

### Lexical Analysis
Examines code as text:
- Code formatting
- Naming conventions
- Comment quality
- Basic pattern matching

**Tools**: Most linters (ESLint, Pylint)

### Syntactic Analysis
Examines code structure (AST):
- Unused variables
- Unreachable code
- Missing returns
- Structural patterns

**Tools**: Compiler warnings, linters

### Semantic Analysis
Understands code meaning:
- Type checking
- Null pointer analysis
- Range checking
- Interface contracts

**Tools**: Type checkers, advanced static analyzers

### Data Flow Analysis
Tracks how data moves through code:
- Uninitialized variables
- Dead assignments
- Tainted data (security)

**Tools**: Advanced analyzers (Coverity, CodeQL)

### Control Flow Analysis
Examines execution paths:
- Unreachable code
- Missing error handling
- Infinite loops
- Resource leaks

**Tools**: Advanced analyzers

---

## Sound vs. Complete Analysis

### Sound Analysis
Reports all actual defects but may have false positives:
- **Guarantee**: Never misses a real bug
- **Trade-off**: May report bugs that aren't real
- **Use case**: Safety-critical systems

### Complete Analysis
Reports only real defects but may miss some:
- **Guarantee**: Every report is a real bug
- **Trade-off**: May miss some actual bugs
- **Use case**: Developer productivity tools

Most practical tools are neither perfectly sound nor complete—they balance precision and recall.

---

## Static Analysis in Practice

### Integration Points

**Pre-commit**: Check locally before committing
```bash
# Example: Run linter before commit
git hook: pre-commit → run linter → allow/reject
```

**CI/CD Pipeline**: Automated checks on every change
```bash
# Example: CI workflow
Build → Test → Static Analysis → Deploy
```

**IDE Integration**: Real-time feedback while coding
- Inline warnings and errors
- Quick fixes and refactorings
- Code completion assistance

**Code Review**: Automated checks before human review
- Reduces reviewer burden
- Enforces standards
- Focuses human attention on design

---

## Benefits and Limitations

### Benefits
✅ **Scale** - Analyzes entire codebase in minutes
✅ **Coverage** - Examines all paths, not just tested ones
✅ **Early detection** - Finds issues before runtime
✅ **Consistency** - Applies rules uniformly
✅ **Documentation** - Explains why code is problematic

### Limitations
❌ **False positives** - Reports issues that aren't real problems
❌ **Configuration complexity** - Requires tuning for each project
❌ **Limited understanding** - Can't reason about business logic
❌ **No runtime behavior** - Can't detect dynamic issues
❌ **Soundness limits** - May miss subtle bugs

---

## Best Practices

1. **Start simple** - Begin with basic linters, add complexity gradually
2. **Fix issues incrementally** - Don't try to fix everything at once
3. **Tune aggressively** - Disable noisy rules, focus on high-value checks
4. **Automate everything** - Run in CI/CD, not just locally
5. **Treat warnings as errors** - Don't ignore tool output
6. **Review false positives** - Understand why tool flagged code
7. **Keep tools updated** - New versions improve accuracy
8. **Combine with testing** - Static analysis complements, not replaces testing

---

## Common Anti-Patterns

### Analysis Fatigue
Too many warnings lead to ignoring all of them:
- **Solution**: Tune aggressively, focus on critical issues first

### False Confidence
Clean static analysis ≠ bug-free code:
- **Solution**: Combine with testing and code review

### Configuration Sprawl
Over-customized rules hard to maintain:
- **Solution**: Start with defaults, customize minimally

### Ignoring Context
Blindly following tool recommendations:
- **Solution**: Understand *why* tool flagged code

---

## Static Analysis Categories

| Category | Examples | Detection Capability |
|----------|----------|---------------------|
| **Linters** | ESLint, Pylint | Style, basic bugs |
| **Type Checkers** | TypeScript, mypy | Type errors, null safety |
| **Security Scanners** | Snyk, Fortify | Vulnerabilities, injection |
| **Bug Finders** | Coverity, CodeQL | Complex bugs, patterns |
| **Code Analyzers** | SonarQube | Quality, maintainability |

---

## Further Exploration

- [Testing](../testing/) - Dynamic verification approach
- [Coverage Criteria](../../coverage/) - Measuring testing thoroughness
- [Quality Metrics](../../../define/measurement/) - Measuring code quality

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
