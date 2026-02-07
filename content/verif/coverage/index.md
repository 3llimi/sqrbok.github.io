---
title: Coverage
parent: Verification and Validation
nav_order: 2
layout: default
has_children: true
---

# Test Coverage Criteria

How do you know when you've tested enough? Coverage criteria provide objective measures of test completeness by defining what portions of the software must be exercised by tests.

---

## What is Test Coverage?

**Test coverage** measures the degree to which source code, requirements, or design specifications are exercised by a test suite. It answers questions like:
- Which parts of the code have been executed?
- Which branches and paths have been taken?
- Which requirements have been verified?

Coverage is both a measurement tool and a testing strategy.

---

## Why Coverage Matters

Coverage criteria help:
- **Assess test adequacy** - Identify untested code and functionality
- **Guide test design** - Systematically generate test cases to meet coverage goals
- **Detect dead code** - Find unreachable or unused code
- **Track progress** - Measure testing completeness objectively
- **Build confidence** - Provide evidence of thorough testing

**Key insight**: High coverage doesn't guarantee quality, but low coverage almost certainly indicates insufficient testing.

---

## Learning Objectives

This section helps you:
- **Understand test completeness** - How to assess verification adequacy
- **Learn coverage types** - Different measures and their relationships
- **Predict test requirements** - Estimate test cases needed for coverage goals
- **Compare approaches** - White box vs. black box completeness
- **Choose criteria** - Select appropriate coverage for different contexts

---

## Topics in This Section

### [Terminology](terminology.md)
Fundamental coverage concepts:
- Test requirements and test cases
- Coverage and adequacy
- Infeasible requirements
- Subsumption relationships

### [Code Coverage](code.md)
Basic structural coverage criteria:
- **Statement coverage** - Execute every statement
- **Branch coverage** - Take every branch true/false
- **Path coverage** - Execute all possible paths
- **Function coverage** - Call every function

### [Condition Coverage](conditions.md)
Fine-grained condition testing:
- **Decision coverage** - Every decision outcome
- **Condition coverage** - Every atomic condition
- **MC/DC coverage** - Modified Condition/Decision Coverage
- **Multiple condition coverage** - All combinations

### [Basis Path Testing](basis.md)
Cyclomatic complexity-based testing:
- Calculating cyclomatic complexity
- Deriving independent paths
- McCabe's basis path method
- Complexity and defects

### [Data Flow Coverage](data-flow.md)
Testing variable definitions and uses:
- **Definition-Use (DU) pairs** - Track variable lifecycle
- **All-Defs coverage** - At least one use per definition
- **All-Uses coverage** - All DU pairs covered
- **All-DU-Paths** - All paths between defs and uses

### [Combinatorial Testing](combinatorial.md)
Testing parameter combinations:
- **Pairwise testing** - All 2-way combinations
- **N-way coverage** - Higher-order combinations
- Covering arrays and combinatorial designs
- Practical tools and techniques

### [Mutation Testing](mutation.md)
Measuring test effectiveness:
- Creating mutants (seeded faults)
- Killing mutants through testing
- Mutation score calculation
- Equivalent mutants

### [Adequacy Criteria](adequacy.md)
When have you tested enough?
- Coverage thresholds (70%, 80%, 100%)
- Risk-based adequacy
- Cost-benefit trade-offs
- Stopping criteria

### [Discussion](discussion.md)
Practical considerations and trade-offs:
- Coverage vs. quality
- Choosing coverage criteria
- Tool support and limitations
- Real-world challenges

---

## Coverage Hierarchy

Coverage criteria form a hierarchy based on **subsumption** (if criterion A subsumes criterion B, then satisfying A automatically satisfies B):

```
Path Coverage
    ↓ subsumes
Branch Coverage
    ↓ subsumes
Statement Coverage
    ↓ subsumes
Function Coverage
```

**Example**: If you achieve 100% branch coverage, you automatically have 100% statement coverage, but not vice versa.

---

## White Box vs. Black Box Coverage

### White Box (Structural) Coverage
Based on code implementation:
- Statement, branch, path coverage
- Requires access to source code
- Measures internal structure exercise
- **Strength**: Ensures code is tested
- **Weakness**: May miss missing functionality

### Black Box (Functional) Coverage
Based on requirements and specifications:
- Input domain coverage
- Equivalence partitioning
- Boundary value analysis
- **Strength**: Ensures requirements are tested
- **Weakness**: Doesn't guarantee code execution

**Best practice**: Combine both approaches.

---

## Common Coverage Goals

| Coverage Type | Typical Goal | Use Case |
|---------------|-------------|----------|
| **Statement** | 70-80% | General development |
| **Branch** | 80-90% | Critical business logic |
| **MC/DC** | 100% | Safety-critical systems (DO-178C) |
| **Mutation** | 60-80% | High-quality test suites |
| **Path** | Infeasible | Too many paths in practice |

---

## The Coverage Paradox

**High coverage ≠ High quality**

You can have:
- ✅ 100% statement coverage with zero assertions (meaningless tests)
- ❌ 60% statement coverage with excellent, well-designed tests

**Coverage measures what code is executed, not whether tests are effective.**

### What Coverage Doesn't Tell You

- **Test quality** - Are assertions meaningful?
- **Input diversity** - Are edge cases tested?
- **Integration** - Do components work together?
- **Non-functional** - Performance, security, usability
- **Missing code** - Functionality that should exist but doesn't

---

## Using Coverage Effectively

### 1. Set Realistic Goals
- Don't aim for 100% coverage (diminishing returns)
- Focus on critical and complex code
- Accept that some code is hard to test

### 2. Use Coverage to Find Gaps
Coverage reports highlight:
- Untested error handling
- Missing edge cases
- Dead code to remove
- Code that needs refactoring to be testable

### 3. Combine Multiple Criteria
Use complementary coverage measures:
- Statement + branch coverage (minimum)
- Add mutation testing for critical code
- Use pairwise testing for configuration testing

### 4. Track Trends
Monitor coverage over time:
- Prevent coverage regression
- Ensure new code is tested
- Identify testing debt

---

## Coverage Tools

### By Language

| Language | Tools |
|----------|-------|
| **Java** | JaCoCo, Cobertura, Clover |
| **Python** | Coverage.py, pytest-cov |
| **JavaScript** | Istanbul, NYC, c8 |
| **C/C++** | gcov, lcov, OpenCppCoverage |
| **C#** | dotCover, OpenCover, Coverlet |
| **Go** | go test -cover |

### Integration

- **CI/CD**: Run coverage on every build
- **IDE**: Real-time coverage visualization
- **Code review**: Coverage reports in pull requests
- **Dashboards**: Track trends with SonarQube, Codecov

---

## Coverage Anti-Patterns

### Coverage Theater
Writing tests just to increase coverage percentage:
- **Problem**: Tests execute code but don't verify behavior
- **Solution**: Review tests for meaningful assertions

### Coverage Obsession
Pursuing 100% coverage at all costs:
- **Problem**: Wastes effort on low-value tests
- **Solution**: Focus on risk and complexity

### Ignoring Gaps
Not investigating what uncovered code means:
- **Problem**: Miss important untested scenarios
- **Solution**: Review uncovered code explicitly

---

## Best Practices

1. **Start with branch coverage** - Better than statement, achievable
2. **Focus on new/changed code** - Don't let coverage regress
3. **Investigate uncovered code** - Understand why it's not tested
4. **Use coverage as a guide** - Not a target or requirement
5. **Combine with mutation testing** - Verify test effectiveness
6. **Review coverage reports** - Don't just track the number
7. **Make coverage visible** - Share with team, track trends
8. **Balance cost and benefit** - Diminishing returns above 80-90%

---

## Further Exploration

- [V&V Overview](../overview/) - Broader testing context
- [Testing](../overview/testing/) - Testing fundamentals
- [Quality Metrics](../../define/metrics/) - Measuring software quality

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
