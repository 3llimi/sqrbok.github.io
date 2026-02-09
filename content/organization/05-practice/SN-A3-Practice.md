---
title: "SN: Industry Quality Practices"
parent: Industry Practices
nav_order: 99
layout: default
---

# Study Notes: Industry Quality Practices

## Purpose
These study notes explain software quality practices used by industry leaders (Google, Microsoft, Netflix, Facebook) alongside emerging AI/LLM-based approaches. Designed for MS students preparing for exams.

{: .note }
**Related Pages:** For detailed coverage, see [Google Engineering Practices](08-google-engineering-practices.md), [Microsoft Quality Practices](09-microsoft-quality-practices.md), [Site Reliability Engineering](06-site-reliability-engineering.md), [Testing Practices](04-testing-practices.md), [Quality Gates & CI/CD](10-quality-gates-cicd.md), and [Industry Case Studies](07-industry-case-studies.md).

**Primary Sources:**
- Software Engineering at Google {% cite winters2020swe %}
- How We Test Software at Microsoft {% cite page2008testing %}
- Site Reliability Engineering {% cite beyer2016sre %}
- The Site Reliability Workbook {% cite beyer2018sreworkbook %}

**Key Research Papers:**
- Google TAP: 150M tests/day {% cite memon2017testing %}
- Google Code Review: 9M reviews analyzed {% cite sadowski2018codereview %}
- Facebook CD: 7-year study {% cite savor2016facebook %}
- 43 academic papers on LLM quality automation (2024-2026) {% cite wang2023llmtesting %}

---

## Part 1: Testing Practices

{: .note }
> **See also:** [Testing Practices](04-testing-practices.md) for shift-left/shift-right testing, [Google Engineering Practices](08-google-engineering-practices.md) for the test pyramid and flaky test management.

### 1.1 The Test Pyramid (70/20/10)

**What is it?**
The test pyramid is a model for organizing tests by scope, speed, and cost. The base (widest) contains the most tests; the top (narrowest) contains the fewest.

**The Three Levels:**

| Level | Name | Scope | Speed | Ratio |
|-------|------|-------|-------|-------|
| Base | **Small tests** (Unit) | Single function/class | Milliseconds | **70%** |
| Middle | **Medium tests** (Integration) | 2+ modules | Seconds | **20%** |
| Top | **Large tests** (E2E) | Entire system | Minutes | **10%** |

**Google Scale:** 150M tests/day, 5.5M test targets, ~1 commit/second {% cite memon2017testing %}

**Why This Ratio Works:**
- **Small tests:** Fast to run, deterministic, easy to debug. When a small test fails, you know *exactly* which function broke.
- **Medium tests:** Verify component integration. May use real implementations (e.g., in-memory databases) instead of mocks.
- **Large tests:** Validate critical user journeys. When a large test fails, you might spend hours debugging across 20 services.

> "User-facing projects may increase medium/large test proportion. Infrastructure projects use significantly more small tests." {% cite winters2020swe %}

**Concrete Example - E-commerce Checkout:**

```
Small tests (70%):
  - validateCreditCard() returns true for valid Visa
  - calculateTax() handles edge case of $0 subtotal
  - formatCurrency() displays correct decimal places

Medium tests (20%):
  - PaymentService correctly calls StripeAPI mock
  - OrderService persists to in-memory database
  - InventoryService reduces stock after purchase

Large tests (10%):
  - User can add item, checkout, pay, receive confirmation email
  - Failed payment shows error and preserves cart
```

**Anti-patterns to Avoid:**
- Relying only on E2E tests (slow, flaky, expensive)
- 100% unit coverage but no integration/E2E tests (doesn't prove system works)
- No tests at the base - makes debugging slow
- Testing corner cases only at system level (impractical)

**Maturity:** Starter - Essential foundation for any project

---

### 1.2 Test Automation Strategy (90/10 Rule)

**The Last Mile Principle:**
> "Automate 90% of work, apply human intelligence only to final 10%" {% cite winters2020swe %}

**What to Automate:**
- Regression testing, build verification
- Static analysis, performance benchmarks
- Repetitive, deterministic tasks

**What Needs Humans:**
- UX assessment, exploratory testing
- Privacy review, security edge cases
- Tasks requiring intuition and judgment

**Decision Framework:**

| Criterion | Automate If... | Keep Manual If... |
|-----------|----------------|-------------------|
| Frequency | Run repeatedly | One-time validation |
| Determinism | Same inputs = same outputs | Requires judgment |
| ROI | High execution cost | Automation costs more |
| Stability | Interface is stable | UI changes frequently |

**The 80/20 Rule:** Focus automation on the **20% of use cases** that cover **80% of actual usage**.

**Google Test Certified Program** {% cite winters2020swe %}:
- Level 1: Continuous build, tests classified by size
- Level 2: No red tests at release
- Level 3: Tests required for all nontrivial changes
- Level 4: Smoke tests automated before submit (<30 min)
- Level 5: Tests for every bug fix, 60% coverage, 40% small tests

**Benefits:**
- Increased velocity (smaller, more frequent releases)
- Consistency and repeatability (removes human error)
- Prevention vs detection (catch bugs before merge)
- Engineer morale (frees creative time)

**Costs:**
- Infrastructure (CPU, storage, cloud resources)
- Maintenance overhead (especially for brittle UI tests)
- Complexity toil (hard to debug when fails)
- False positives (flaky tests create noise)

**Anti-patterns to Avoid:**
- Automating for the sake of automation (consider ROI)
- UI automation on frequently changing interfaces (brittle)
- Ignoring flaky test signals (leads to ignoring all failures)
- No human oversight on automation with admin powers

**Maturity:** Starter - Begin with unit tests, expand as team matures

---

### 1.3 Test Selection & Prioritization

**Dependency-Based Selection (Google)** {% cite memon2017testing %}:
- **Build graph:** In-memory graph of build dependencies
- **Transitive mapping:** Follow edges to find all tests depending on changed code
- **Affected test selection:** Run only minimal set of affected tests
- **Result:** Faster feedback, can run tests on every commit at scale

**Prioritization Strategies:**

| Strategy | Description |
|----------|-------------|
| **ACC Risk Heat Map** | Red (high risk) - Yellow - Green. Prioritize red areas |
| **Priority Levels (MS)** | P1, P2, P3. Early milestones = P1 only. Release = all |
| **70/20/10 Rule** | Prioritize unit tests (fast, deterministic) |
| **Smoke Tests** | Critical path tests that must pass before submit |

**Test Scheduling by Size:**

| Size | Scheduling |
|------|------------|
| **Small** | Run immediately, highest priority |
| **Medium** | Queue after small tests |
| **Large** | Run in parallel, don't block small tests |

**Microsoft Priority Model** {% cite page2008testing %}:

| Milestone | Tests Required |
|-----------|----------------|
| M1 | P1 only |
| M2 | P1 + P2 |
| Release | All tests |

**Benefits of Dependency Graphs:**
- **Isolation:** Identify exact change where test started failing
- **Efficiency:** Run minimal tests without sacrificing accuracy
- **Scale:** Handle changes to common libraries (may trigger thousands of tests)

**Maturity:** Intermediate - Requires build system integration

---

### 1.4 Flaky Test Management

**Definition:**
A flaky test passes sometimes and fails sometimes *without any code change*. Flakiness undermines trust in the entire test suite.

**Impact:** ~3.5% of CI/CD failures at Google are from flaky tests {% cite memon2017testing %}

**Causes of Flakiness:**

| Cause | Real Example | What Happens |
|-------|--------------|--------------|
| External dependencies | API timeout | Network latency varies |
| Order dependence | Test B needs Test A's data | B passes after A, fails alone |
| Time dependence | `if (date.getDay() == 0)` | Fails only on Sundays |
| Concurrency | Two threads increment counter | Race conditions |
| Resource collisions | Two tests use port 8080 | Whichever runs second fails |

**Scenario: The Mystery of the Monday Failures**
```python
# This test passes 6 days/week, fails on Monday
def test_weekly_report():
    report = generate_report()  # Uses datetime.now()
    assert report.start_date == "last Monday"
    # PROBLEM: On Monday, "last Monday" is TODAY, not 7 days ago
```
**Fix:** Inject a clock dependency, use fixed test dates

**Detection Strategies:**
- **Randomized execution order** - Reveals hidden test dependencies
- **Submit queues** - Build in clean environment catches local-only passes
- **Parallel comparison runs** - Test vs control on identical hardware

**Management Strategies:**

| Strategy | Description | Notes |
|----------|-------------|-------|
| **Quarantine** | Move flaky tests to separate suite | Prevents "alert fatigue" |
| **Retry** | Run failed tests N times before failing | Temporary fix only |
| **Mock dependencies** | Replace real services with fakes | Best long-term fix |
| **Fix root cause** | Rewrite to be deterministic | Ideal solution |
| **Delete** | If test provides no value | Last resort |

**LLM Auto-Repair:**
- **FlakyGuard:** 47.6% repair rate, 51.8% developer acceptance {% cite li2025flakyguard %}
- **FlakyDoctor:** Neurosymbolic repair, 57% OD and 59% ID repair {% cite chen2024flakydoctor %}

**Metrics & Thresholds:**
- **Zero tolerance** at Test Certified Level 4 - no nondeterministic tests
- **10% rule** - false positive rate must stay under 10% or tool is disabled
- **ROI calculation:** Fix cost (hours) / Time saved per run = break-even runs

> "Flaky tests create noise that leads engineers to ignore ALL test results." {% cite winters2020swe %}

**Anti-patterns to Avoid:**
- Ignoring flaky tests (leads to ignoring ALL test failures)
- Retrying without fixing root cause
- Letting flaky tests accumulate as "technical debt"
- Over-relying on real external services in tests

**Maturity:** Intermediate - Requires test infrastructure investment

---

### 1.5 Test Coverage (80% Target)

**The Practice:**
- **Coverage is a standard metric** but must be part of broader quality strategy, not an end in itself
- **Tiered thresholds** increase as product nears release or reaches higher maturity
- **70/20/10 rule** ensures majority of coverage comes from fast, deterministic unit tests

**Microsoft Milestone Targets** {% cite page2008testing %}:

| Milestone | Code Coverage |
|-----------|---------------|
| M2 | 65% |
| M3 | 75% |
| Final Release | **80%** |
| Feature Crews | 80% unit test for new code |

**Google Test Certified Levels** {% cite winters2020swe %}:

| Level | Total Coverage | Small Test Coverage |
|-------|----------------|---------------------|
| Level 2 | 50% incremental | 10% |
| Level 4 | 40% | 25% |
| Level 5 | 60% | 40% |

**Coverage Measurement Types:**
- **Statement coverage** - whether each line of code was executed
- **Branch coverage** - whether each logical block was exercised
- **Mutation coverage** - whether tests detect code changes (stronger)

**Why 100% Coverage Can Be Misleading:**

```python
# 100% coverage, but has a bug!
def divide(a, b):
    return a / b  # No handling for b=0

def test_divide():
    assert divide(10, 2) == 5  # Covers the function
    # But what about divide(10, 0)? Not tested!
```

**Limitations of Coverage:**
- **Quality vs Quantity** - 100% coverage doesn't guarantee absence of bugs
- **Missing logic** - Coverage doesn't detect functionality that was never written
- **Exercising bugs** - Retrofitted tests may exercise buggy behavior, not correct behavior
- **False confidence** - High unit coverage doesn't prove E2E functionality
- **Production gaps** - Test environments != production conditions

> "Coverage finds gaps, tests find bugs." {% cite page2008testing %}

**Practical Rule:**
80% coverage is a good target. The last 20% often includes error handlers and edge cases that are expensive to test but rarely run.

**Anti-patterns to Avoid:**
- Treating coverage as quality proof (high coverage != good tests)
- Retrofitting tests to bad code (may exercise bugs)
- Ignoring E2E coverage (unit coverage alone insufficient)
- Gaming coverage metrics (testing getters/setters vs logic)

**Maturity:** Starter - Coverage tools available in most languages

---

### 1.6 Test Documentation

**Core Documents** {% cite page2008testing %}:

**1. Test Plan:**
- **Purpose:** Records all planned automated and manual tests
- **Requirement:** Mandatory for feature crews - feature not "done" without it
- **Timing:** Developed during Product Planning phase
- **Contents:** Introduction, key scenarios, test deliverables, education/training needs

**2. Test Case:**
A unit of information providing value through repeatability and historical reference.

| Attribute | Description |
|-----------|-------------|
| **Purpose/Objective** | What the test verifies |
| **Preconditions** | System state before test |
| **Configurations** | Environment/setup needed |
| **Inputs** | Data or actions to apply |
| **Expected Results** | Predicted outcome |
| **Automation Status** | Manual/automated/semi-automated |
| **Frequency** | How often to execute |

**3. Test Design Specification:**
- Higher-level tactical document
- Created during project definition
- Ensures functional specs are met
- Verifies test infrastructure in place

**Quality Gates for Documentation:**
- Feature crew cannot exit milestone without test plan
- Functional specification must be complete
- Threat model must mitigate security issues

**Documentation Anti-Patterns:**
- Using internal jargon
- Being overly verbose
- Assuming reader knowledge (missing steps)
- Forgetting preconditions

**Maturity:** Starter - Can use simple templates

---

### 1.7 Test Environments

**Environment Spectrum:**

| Environment | Fidelity | Use For |
|-------------|----------|---------|
| **Mocked/Faked** | Low | Unit tests (milliseconds) |
| **In-memory** | Medium | Integration tests (seconds) |
| **Staging** | High | E2E validation, load testing |
| **Production** | Full | Canary, real user validation |

**Staging Environment Requirements:**
- **Data fidelity** - Use data as close to production as possible
- **Synthetic traffic** - Production-like but safe traffic patterns
- **Chaos engineering** - Deliberately induce faults to test resilience
- **Limitation awareness** - Staging != production (gaps may exist)

**Environment Isolation Principles:**

| Principle | Description |
|-----------|-------------|
| **Credential separation** | Test environments use separate credentials |
| **Data privacy** | Never mirror production data - use anonymized test data |
| **Avoid "test in production"** | Provide adequate test framework or engineers will bypass |
| **Short-lived environments** | Cloud-based, spun up for testing, destroyed after |

**Mocking Strategy by Test Size:**

| Test Size | Environment |
|-----------|-------------|
| **Small** | Fully faked (mocks for FS, network, DB) |
| **Medium** | Lightweight fakes (in-memory DB) |
| **Large** | Real resources required |

**Anti-patterns:**
- Mirroring production databases to test environments
- Testing in production without proper isolation
- Assuming staging = production
- Using production credentials in tests

**Maturity:** Intermediate - Requires infrastructure investment

---

### 1.8 LLM-Powered Testing

**How LLMs Generate Tests** {% cite wang2023llmtesting %}:

| Method | Usage | Description |
|--------|-------|-------------|
| **Zero-shot** | 60% of studies | Give the LLM code and ask for tests directly |
| **Few-shot** | 29% | Show examples of good tests first |
| **Hybrid PBT** | Best results | Combine example-based and property-based |

**Tool Results:**

| Tool | Result |
|------|--------|
| CoverUp | **80%** median coverage (vs 47% CodaMosa) {% cite pizzorno2024coverup %} |
| TestART | +18% pass rate improvement {% cite gu2024testart %} |
| Hybrid PBT | **81.25%** bug detection {% cite abdullin2025testwars %} |

**Self-Healing Tests:**
- Problem: Fragile selectors (XPath, IDs) break when UI changes
- Solution: Vector embeddings find 99% semantically similar elements
- Result: Auto-update test scripts, 95% acceptance rate

**The Intent Gap (Critical Risk)** {% cite konstantinou2024testoracles %}:

LLMs capture *actual behavior* (how code IS), not *expected behavior* (developer intent).

**Example - The Dangerous Test:**
```python
# BUGGY CODE: Should return price * 1.1 for 10% tax
def calculate_total(price):
    return price * 1.01  # BUG: Only 1% tax!

# LLM-GENERATED TEST (validates the bug!):
def test_calculate_total():
    assert calculate_total(100) == 101  # "Passes" but is WRONG
```

The LLM saw the code returns 101, so it wrote a test expecting 101. The test passes, but the code is wrong!

**Why This Matters:** Up to **68.1%** of LLM-generated test suites may validate bugs by testing what code *does* rather than what it *should do*.

**Mitigation:** Always review LLM-generated assertions against requirements, not just code.

**Maturity:** Advanced - Requires careful human oversight

---

## Part 2: Code Review

{: .note }
> **See also:** [Google Engineering Practices](08-google-engineering-practices.md) for code review process and readability certification, [Industry Case Studies](07-industry-case-studies.md) for empirical data on code review at scale.

### 2.1 Traditional Code Review Process

**Google Code Review Workflow** {% cite sadowski2018codereview %}:

1. **Create Change List (CL)** - Package code changes (few lines to hundreds)
2. **Pre-submit automation** - Static analysis (Tricorder), unit tests
3. **Route for review** - Submit to qualified reviewers
4. **Iterative feedback** - Address comments, repeat until approved
5. **Final signoff** - Move to submit queue, verify build stays green

**Readability Certification:**
- **What:** Language-specific certification (C++, Java, Python, JavaScript)
- **Requirement:** Either have readability OR get signoff from certified reviewer
- **Purpose:** Ensure code quality baseline, consistent codebase style
- **Outcome:** Codebase "looks like one person wrote it"

**What Reviewers Look For:**

| Focus | Description |
|-------|-------------|
| **Correctness** | Logic errors that tests might miss |
| **Standards** | Style guide adherence, data structure choices |
| **Understandability** | Security/reliability properties obvious to future maintainers |
| **Knowledge sharing** | Educational feedback for author |
| **Minimalism** | YAGNI - eliminate over-engineering |

**Key Metrics** {% cite sadowski2018codereview %}:

| Metric | Value |
|--------|-------|
| Median latency | **< 4 hours** |
| Median change size | **24 lines** |
| Tool satisfaction | **97%** |
| Volume | ~50,000 reviews/day (via Tricorder) |

**Review Principles:**
- **No solo commits** - Multi-party authorization required
- **Just-in-time notifications** - Keep developers unblocked
- **One-click fixes** - Suggested auto-fixes for common issues
- **Low friction** - Automation handles mechanical details

**Microsoft Effective Review Practices** {% cite bosu2015codereview %}:

**Size Limits:**
- Reviews most effective for small, self-contained, incremental changes
- Smaller = easier to identify defects, cheaper to roll back
- Large CLs should be broken into smaller units

**Approval Requirements:**
- **No exemptions** - even senior executives go through review
- **Multi-party authorization** - minimum 2 people (author + reviewer)
- **Config changes too** - configuration reviewed like code
- **Quality gate** - feature not "done" until review complete

**Maturity:** Starter - Can start immediately with GitHub/GitLab

---

### 2.2 Static Analysis (<10% False Positive Rule)

**Industry Tools:**

| Company | Tool | Focus |
|---------|------|-------|
| Google | **Tricorder** | Central platform for all checkers |
| Google | Error Prone | Java bugs |
| Google | Clang-Tidy | C/C++ |
| Microsoft | **PREfast** | Native code analysis |
| Microsoft | Managed code analyzers | .NET |

**When It Runs:**
1. **IDE** - Underlines problems as developer types (fastest feedback)
2. **Pre-submit/Code Review** - Integrated into review UI
3. **CI Pipeline** - Gated checks that block merge
4. **Milestone Gates** - Part of exit criteria

**What It Catches:**
- **Bug patterns:** Null pointer dereference, uninitialized memory, integer conversion errors
- **Security vulnerabilities:** SQL injection, XSS (injection sinks detection)
- **API conformance:** Deprecated/risky API usage flagged at compile time
- **Style/readability:** Enforce language style guides for consistency

**Why <=10% False Positives?** {% cite winters2020swe %}

| FP Rate | Developer Response |
|---------|-------------------|
| <5% | Trust and fix |
| 10% | Grudging acceptance |
| >15% | Ignore the tool |
| >30% | Demand removal |

**Effectiveness Metrics:**
- **10% false positive rule** - Google disables checks with >10% noise
- **"Not useful" feedback** - Tricorder lets devs report unhelpful warnings
- **2 orders of magnitude** - XSS vulnerabilities reduced with safe types
- **Auto-fixes** - One-click fixes encourage adoption

**Adoption Strategies:**
- **Integrate into code review** - Make results visible where developers work
- **Minimize friction** - Auto-suggest fixes, low false-positive rate
- **Incremental rollout** - Enforce on new code, exempt legacy until cleaned
- **Developer feedback loop** - Let devs report "not useful" to tune tools

**Maturity:** Starter - Many free tools available (ESLint, Pylint, SonarQube)

---

### 2.3 LLM-Assisted Code Review

**Architecture (Recommended):**
1. LLMs: Early, broad, context-aware triage
2. Deterministic scanners: High-assurance verification
3. Human review: Final judgment

**Performance Comparison** {% cite zeng2025swrbench %}:

| Metric | LLMs | Traditional SAST |
|--------|------|------------------|
| F1-score | **0.75-0.80** | 0.26-0.55 |
| Precision | Higher | Lower |
| Recall | Good | Variable |

**Model Rankings (Defect Recall)** {% cite zeng2025swrbench %}:

| Model | Accuracy |
|-------|----------|
| Claude 3.5 Sonnet | **82%** |
| GPT-4 Turbo | 76% |
| Gemini 1.5 Pro | 68% |

**Multi-Review Strategy:**
- Multiple LLMs review same code
- Aggregate findings
- **+43.67% F1 improvement** {% cite zeng2025swrbench %}

**Security Specialization** {% cite zhou2024vulndetection %}:

| Model | Strength |
|-------|----------|
| GPT-4 | Injection, secrets |
| Claude | Auth/authz gaps |
| Gemini | IaC misconfigs |

**Critical Warning** {% cite cotroneo2025humanvsai %}:
> Iterative AI improvements without human gates leads to **37.6% increase in vulnerabilities** after 5 iterations

**Maturity:** Intermediate - Requires careful integration

---

## Part 3: CI/CD & Deployment

{: .note }
> **See also:** [Quality Gates & CI/CD](10-quality-gates-cicd.md) for pipeline stages and deployment gates, [DevOps Foundations](01-devops-foundations.md) for CI/CD principles and automation.

### 3.1 Build Frequency & Speed

**The Virtuous Cycle:**
> "Faster builds lead to smaller releases lead to fewer bugs lead to cheaper failures" {% cite winters2020swe %}

**Key Numbers:**

| Metric | Value | Source |
|--------|-------|--------|
| Google commits | **20+/minute** | {% cite winters2020swe %} |
| Facebook deploys/dev/week | 3.5 (~daily) | {% cite savor2016facebook %} |
| Google tests/day | 150 million | {% cite memon2017testing %} |
| Facebook 7-year study | 5,000+ engineers | {% cite savor2016facebook %} |

**Rule of Thumb:** If feedback takes > few minutes, add more machines (CPU hours < developer time)

**Build Frequency Models:**

| Model | Frequency | Purpose |
|-------|-----------|---------|
| **Daily builds** | Every 24 hours | Ensure always buildable/testable |
| **Continuous** | Every commit | Instant feedback, catch issues early |
| **Release builds** | On-demand | Production-ready artifacts |

**Practices for Fast Builds:**

| Practice | Description |
|----------|-------------|
| **Dependency analysis** | Run only tests affected by change |
| **Build sharding** | Distribute across thousands of CPUs |
| **Hermetic builds** | Specify all inputs for caching |
| **Concurrent execution** | Cloud compute enables parallel builds |
| **Small changes** | Smaller = faster to build, easier to roll back |

**Maturity:** Starter - GitHub Actions, GitLab CI provide free CI

---

### 3.2 Deployment Strategies (Canary at 1%)

**Strategy Comparison:**

| Strategy | Description | Rollback | Resources | Best For |
|----------|-------------|----------|-----------|----------|
| **Canary** | Deploy to ~1% first | Stop rollout | 1x + canary | Most changes |
| **Blue-Green** | Two environments, switch router | Instant switch | 2x | Database migrations |
| **Progressive** | 1% - 10% - 50% - 100% | Stop at any stage | 1x | Major features |
| **Feature Flags** | Decouple feature from binary | Disable flag | 1x | A/B testing |

**Canary Process at Google** {% cite beyer2016sre %}:
1. Deploy Release Candidate to small segment (~1%)
2. Compare metrics against "Live" control
3. Monitor for errors, latency regressions
4. If OK, expand to next stage
5. If problems, halt and rollback

**Staged Rollout Percentages:**

| Stage | Population | Purpose |
|-------|------------|---------|
| **Canary** | ~1% | Initial risk detection |
| **Expand** | ~10% | Broader validation |
| **Wide** | ~50% | Near-full confidence |
| **Full** | 100% | Complete rollout |

**Canary Math - Why It Limits Blast Radius:**
```
Scenario: Canary has a bug causing 20% error rate

Without canary: 100% of users see 20% errors = 20% overall error rate
With 5% canary: Only 5% of users affected = 1% overall error rate

Your SLO of 99.9% is preserved while you detect and fix the bug!
```

**VALET Framework (Home Depot):**
- **V**olume - traffic handled
- **A**vailability - uptime
- **L**atency - response speed
- **E**rrors - failure rate
- **T**ickets - manual interventions

**Maturity:** Intermediate - Requires deployment automation

---

### 3.3 Rollback Procedures

**The Core Strategy:**
> "Detect - Roll Back - Fix - Roll Forward" (NOT continue rolling forward while bug is active) {% cite beyer2016sre %}

**When to Roll Back vs Roll Forward:**

| Decision | When | Rationale |
|----------|------|-----------|
| **Roll Back** | Default for most incidents | Faster recovery, preserves SLO |
| **Roll Forward** | After rollback stabilizes | Build + deploy fix often exceeds 15-minute window |
| **Careful consideration** | Security fixes | Rollback may reintroduce vulnerabilities |

**Key Insight:**
> "If a team aims for 99.99% availability, they have only ~15 minutes of error budget per quarter. Build + deploy for a fix often exceeds this window, so rollback is the faster mitigation." {% cite beyer2016sre %}

**Rollback Procedures:**
1. **Correlate** - Check if bug correlates with recent code/config push
2. **Prompt reversion** - Roll back the change immediately
3. **Canary removal** - If in canary, remove instance group from load balancer
4. **Verify stability** - Confirm rollback resolved the issue
5. **Test fix** - Build and test fix before rolling forward
6. **Roll forward** - Deploy fix only after validation

**Feature Flags for Safe Rollback:**
- Disable feature X without affecting feature Y
- No binary redeploy needed
- **Breakglass bypass** for emergencies
- Instant rollback of specific functionality

**Maturity:** Intermediate - Requires deployment automation

---

### 3.4 Quality Gates (3 Stages)

**Pre-submit Gates (Before Merge):**
- **Mandatory code review** - No solo commits allowed
- **Readability certification** - Reviewer must be certified in that language (Google)
- **Static analysis** - Tricorder (Google), PREfast (Microsoft)
- **Build verification** - Code must compile cleanly
- **Unit tests** - All associated tests must pass
- **80% code coverage** - Required for new features
- **Threat model** - All risks must be mitigated (Microsoft Feature Crews)

**Post-submit Gates (After Merge):**
- **Green build requirement** - Main branch must stay stable
- **Dependency analysis** - All transitively affected tests run
- **Milestone criteria (Microsoft):**
  - M2: 65% coverage, 60% crashes fixed
  - M3: 70% crashes fixed
  - Final: 80% coverage, all performance tests pass

**Release/Deployment Gates:**
- **Error Budget** - Must be positive to launch new features
- **Canary analysis** - 1% of users first, monitor for regressions
- **Production Readiness Review (PRR)** - Monitoring, escalation, DR plans verified
- **Ship Room approval** - Committee review of factual data (Microsoft)
- **Mandatory policies** - Privacy, security, virus scanning must pass

**Key Numbers:**

| Stage | Metric |
|-------|--------|
| Pre-submit | 80% coverage for new features |
| Milestone 2 | 65% coverage, 60% crashes fixed |
| Final Release | 80% coverage, all perf tests pass |
| Deployment | Positive error budget required |

**Maturity:** Intermediate - Requires CI/CD infrastructure

---

### 3.5 Feature Flags

**Definition:**
Separate feature launches from binary releases. Binary should show no behavior change when flag is off.

**Key Benefits:**

| Benefit | Description |
|---------|-------------|
| **Gradual enablement** | Enable features one at a time via config |
| **Phased adoption** | Roll out to early adopters first |
| **Risk isolation** | Dark launches excluded from standard SLOs |
| **Fast rollback** | Disable flag instantly (vs 15+ min redeploy) |

**Lifecycle Stages:**
1. **Design** - Architecture must permit decoupled rollouts from start
2. **Development** - Implement feature behind flag
3. **Testing** - Verify flag on/off behavior
4. **Rollout** - Enable for subset of users
5. **Monitor** - Track flag in monitoring for correlation
6. **Stabilize** - Feature becomes default
7. **Cleanup** - Remove flag, consolidate code

**Rollback Advantage:**
> "Disabling a flag is often significantly faster than the 15+ minutes required to build, test, and redeploy a fix." {% cite beyer2016sre %}

**Cleanup Guidance:**
- **Remove stable flags** - Consolidate logic, simplify code
- **Tag as tech debt** - Make flag status visible
- **Document removal criteria** - How to prove flag is no longer needed

**Maturity:** Intermediate - Requires flag infrastructure

---

### 3.6 Release Engineering

**Organizational Structures:**

| Company | Model | Description |
|---------|-------|-------------|
| **Google** | Centralized (Engineering Productivity) | Spans toolchain, release engineering, testing |
| **Microsoft** | Distributed (Feature Crews) | Small cross-functional teams (Dev + Test + PM) |

**Branching Strategies:**

**Google - Trunk-Based:**
- Single repository, common toolchain
- Develop and release from "HEAD"
- **Submit Queues** ensure main branch stays "green"
- No code freezes - tests verify behavior

**Microsoft - Feature Branch:**
- Feature crews work on local builds
- Migrate to main branch when quality gates pass
- 80% coverage + all tests pass = ready to merge

**Release Channels (Google "Crawl, Walk, Run")** {% cite winters2020swe %}:

| Channel | Frequency | Purpose |
|---------|-----------|---------|
| **Canary** | Daily | Internal experiments |
| **Dev** | Weekly | Developer day-to-day work |
| **Test** | Monthly | Internal dogfooding |
| **Beta** | Pre-release | External early access |
| **Stable** | Release | General availability |

**Release Cadences:**

| Type | Cadence | Example |
|------|---------|---------|
| **Web services** | Multiple times/day | Google services |
| **Client apps** | Every few weeks | Chrome |
| **Enterprise** | Months-years | Windows, Office |

**Maturity:** Intermediate - Requires release infrastructure

---

### 3.7 AI in CI/CD

**Two-Stage Pipeline:**
```
LLM Triage -> SARIF Reports -> Deterministic Verification -> Human Review
```

**Agentic Decision Points:**
- Test-Triage Agent: 92% flakiness detection
- Security Agent: CVE severity assessment
- Observability Agent: SLO-based auto-rollbacks

**DORA Improvements with AI** {% cite dora2025report %}:

| Metric | Improvement |
|--------|-------------|
| Lead Time | **-25% to -35%** |
| MTTR | **-43%** |
| Deploy Frequency | +28% |
| Change Failure Rate | -18% |

**Maturity:** Advanced - Requires mature DevOps foundation

---

## Part 4: SRE & Reliability

{: .note }
> **See also:** [Site Reliability Engineering](06-site-reliability-engineering.md) for SRE principles, SLOs, error budgets, and toil reduction.

### 4.1 SLIs, SLOs, and SLAs

**The Hierarchy:**

```
SLI (Indicator) -> What you MEASURE
    |
SLO (Objective) -> What you AIM FOR internally
    |
SLA (Agreement) -> What you PROMISE customers (with penalties)
```

**Definitions** {% cite beyer2016sre %}:

| Term | Definition | Example |
|------|------------|---------|
| **SLI** | Service Level Indicator - measurable metric | "Percentage of requests faster than 200ms" |
| **SLO** | Service Level Objective - internal target | "We aim for 99.95% of requests < 200ms" |
| **SLA** | Service Level Agreement - external contract | "If <99.9%, customer gets credit" |

**Why SLO > SLA?**
Your internal target (SLO) should be stricter than your customer promise (SLA). This gives you a buffer to catch problems before you violate the contract.

```
Example:
  SLA to customers: 99.9% availability
  Internal SLO:     99.95% availability

  If you drop to 99.92%, you:
  + Still meet SLA (no refunds)
  - Violated SLO (trigger reliability work)
```

**Common SLIs:**

| Service Type | SLI | Formula |
|--------------|-----|---------|
| Request-driven | Availability | Successful requests / Total requests |
| Request-driven | Latency | Requests < 100ms / Total requests |
| Data pipeline | Freshness | Data updated < threshold / Total |

**Availability Targets:**

| Target | Downtime/year | Use Case |
|--------|---------------|----------|
| 99.5% | ~1.8 days | Non-critical apps |
| 99.9% (3 nines) | ~8.7 hours | Internal systems |
| 99.95% | ~4.4 hours | Production services |
| 99.99% (4 nines) | **~52 minutes** | Shared infrastructure |

> "100% reliability is the wrong target - it leaves no room for change and costs more than the marginal utility it provides." {% cite beyer2016sre %}

**Maturity:** Intermediate - Requires monitoring infrastructure

---

### 4.2 Error Budgets

**What is an Error Budget?**
An error budget is the maximum amount of unreliability you can "spend" before you must stop shipping features and focus on reliability.

**Formula** {% cite beyer2016sre %}:
```
Error Budget = 100% - SLO
```

**Worked Example - Monthly Budget:**
```
SLO: 99.9% availability
Error Budget: 100% - 99.9% = 0.1%

If you serve 3 million requests/month:
  Allowed errors = 3,000,000 x 0.001 = 3,000 errors

If you serve 10 million requests/month:
  Allowed errors = 10,000,000 x 0.001 = 10,000 errors
```

**Real Scenario - The Feature Freeze Decision:**
```
Week 1: 500 errors (2,500 remaining for month)
Week 2: 800 errors (1,700 remaining)
Week 3: Major outage causes 2,000 errors -> BUDGET EXHAUSTED

Result: All new features frozen until next month.
Team must focus on reliability improvements.
```

**Budget Exhausted -> Actions:**

| Action | Description |
|--------|-------------|
| **Feature freeze** | Halt all new launches |
| **Reliability focus** | Pivot to reliability work |
| **Production freeze** | Minimize change risk |
| **Mandatory postmortem** | If single incident uses >20% of 4-week budget |

**Budget Remaining -> Benefits:**
- Deploy features aggressively
- Allow risky experiments
- Favor speed over safety checks

**Burn Rate Explained:**
Burn rate measures how fast you're consuming your budget.

```
Burn rate 1  = Using budget at exactly sustainable pace
Burn rate 10 = Using budget 10x too fast (30-day budget gone in 3 days!)

Alert thresholds:
- Burn rate 2 for 1 hour  -> Page (immediate response)
- Burn rate 6 for 6 hours -> Ticket (scheduled fix)
```

**Extreme Example:**
> 99.999% monthly availability means 100% outage exhausts entire budget in **26 seconds**

**Why Error Budgets Work:**
- Removes "us vs them" between dev and ops
- Gives objective criteria: "Can we ship?" becomes "Do we have budget?"
- Balances innovation speed with reliability

**Maturity:** Intermediate - Requires SLO infrastructure

---

### 4.3 Monitoring & Four Golden Signals

**Core Philosophy:**
Every collected metric must serve a specific purpose: alerting, debugging, or capacity planning. Measurement is crucial for establishing reality and creating objective foundation for decisions.

**The Four Golden Signals** {% cite beyer2016sre %}:

| Signal | What It Tells You | Example Metric | Alert Threshold |
|--------|-------------------|----------------|-----------------|
| **Latency** | Is the service fast? | p99 < 200ms | p99 > 500ms |
| **Traffic** | How much demand? | 1000 req/sec | Unusual spike/drop |
| **Errors** | Is it working? | 0.1% HTTP 500s | >1% errors |
| **Saturation** | Will it break soon? | 70% CPU | >85% CPU |

**Practical Example - E-commerce Site:**
```
Normal state:
  Latency: p99 = 150ms ok
  Traffic: 500 req/sec ok
  Errors:  0.05% ok
  Saturation: 40% CPU ok

Black Friday:
  Latency: p99 = 800ms ALERT <- Users experiencing delays
  Traffic: 2000 req/sec    <- Expected spike
  Errors:  2.5% ALERT      <- Checkout failing
  Saturation: 95% CPU ALERT <- Need to scale
```

**Symptoms vs Causes:**

| Type | Use For | Example |
|------|---------|---------|
| Symptoms | Alerting (page on-call) | "The service is slow" |
| Causes | Debugging | "Database at 90% CPU" |

**Why Page on Symptoms, Not Causes:**
```
Scenario: Database CPU at 95%

Bad alert: "Database CPU high"
  -> Maybe the database is fine at 95%, or maybe it's not affecting users

Good alert: "Checkout latency > 2 seconds"
  -> Definitely affecting users, investigate to find cause
```

> "Page on the symptom 'the service is slow', not the cause 'database at 90% CPU'. The cause may not actually affect users." {% cite beyer2016sre %}

**Burn Rate Alert Levels:**

| Severity | Trigger | Response |
|----------|---------|----------|
| **Page** | 2% budget consumed in 1 hour | Immediate response |
| **Ticket** | 10% budget consumed in 3 days | Scheduled work |

**Maturity:** Intermediate - Requires monitoring infrastructure

---

### 4.4 On-Call Practices

**Rotation Structures:**

| Model | Description | Minimum Team Size |
|-------|-------------|-------------------|
| **Follow-the-sun** | Shifts split across time zones (6-8 hours apart) | 6 per site |
| **Single-site 24/7** | One location covers all hours | 9 engineers |
| **Shift limits** | Max 12 continuous hours to prevent exhaustion | - |

**Google's Golden Rules** {% cite beyer2016sre %}:

| Rule | Target | Rationale |
|------|--------|-----------|
| **50% project work** | SREs spend >=50% on engineering, not ops | Time to automate away toil |
| **Pager load** | Max **2** incidents per 12-hour shift | Prevent burnout |
| **Time-off compensation** | Comp time or cash for out-of-hours | Incentivize participation |

**Training & Ramp-up:**
- **Starter projects** - Build familiarity with systems
- **Shadowing** - Follow experienced engineers
- **Wheel of Misfortune** - Role-playing exercises for incidents
- **No on-call until ready** - Complete training roadmap first

**Escalation Framework (IMAG):**

| Role | Responsibility |
|------|----------------|
| **Incident Commander (IC)** | Directs strategy, single point of command |
| **Operations Lead (OL)** | Manages technical mitigation |
| **Communications Lead (CL)** | Updates stakeholders |

> "Every page must be treated as a bug that requires a permanent fix. If you can't find root cause, at minimum add monitoring to aid future debugging." {% cite beyer2018sreworkbook %}

**Maturity:** Intermediate - Requires incident management process

---

### 4.5 Incident Management & Postmortems

**Incident Response Framework (IMAG)** {% cite beyer2018sreworkbook %}:
Based on US Incident Command System (ICS). Built on "Three Cs": **Command, Control, Communications**

**Incident Roles:**

| Role | Responsibility |
|------|----------------|
| **Incident Commander (IC)** | Directs strategy, delegates roles, single point of command |
| **Operations Lead (OL)** | Tactical lead, applies tools to mitigate/resolve |
| **Communications Lead (CL)** | Updates stakeholders, manages inquiries |
| **Remediation Lead (RL)** | Creates cleanup plan during complex recoveries |

**Incident Response Steps:**
1. **Declare incident** - Explicitly declare to align expectations, authorize bypass of normal processes
2. **Triage & assess** - Gather facts, estimate severity and priority
3. **Mitigate** - "Stop the bleeding" - alleviate user pain before root cause known
4. **Root-cause analysis** - Backtrack to reconstruct events, identify why
5. **Remediation & closure** - Execute cleanup, declare incident complete

**Blameless Postmortem Components:**

| Section | Content |
|---------|---------|
| **Executive summary** | Impact, root cause, resolution overview |
| **Impact metrics** | Queries dropped, duration, revenue loss |
| **Root causes & trigger** | Sequence of events, system flaws |
| **Timeline** | Factual record of responder actions |
| **Lessons learned** | What went well, poorly, "got lucky" |
| **Action items** | Concrete tasks with owners, tracking numbers |

**Key Principles:**
- **Focus on systems, not people** - Gaps in design, not individual error
- **Blameless culture** - Learn from failure, don't assign blame
- **Mandatory for outages** - Every user-affecting outage needs postmortem
- **Shared openly** - Stored centrally, promotes learning

**Maturity:** Intermediate - Requires process and culture

---

## Part 5: Quality Organization

{: .note }
> **See also:** [Microsoft Quality Practices](09-microsoft-quality-practices.md) for milestone-based development and bug bars, [Google Engineering Practices](08-google-engineering-practices.md) for testing roles and automation maturity.

### 5.1 Testing Roles (Google vs Microsoft)

**Google Roles** {% cite winters2020swe %}:

| Role | Focus | Responsibilities |
|------|-------|-----------------|
| **SWE** (Software Engineer) | Feature code | Own quality, write unit tests, TDD |
| **SET** (Software Engineer in Test) | Test infrastructure | Build frameworks, automation, refactor for testability |
| **TE** (Test Engineer) | User experience | Organize testing, build E2E automation, identify risks |

**Microsoft Roles** {% cite page2008testing %}:

| Role | Focus | Responsibilities |
|------|-------|-----------------|
| **SDE** (Software Development Engineer) | Feature code | Create functional code |
| **SDET** (Software Dev Engineer in Test) | Test code | Write code to test software (same coding bar as SDE) |
| **IC Tester** | Test execution | Execute and manage testing discipline |
| **Test Architect** | Test strategy | Long-term quality strategy, leadership |

**"You Build It, You Break It" Philosophy:**
- **Core idea:** Quality is a prevention act, not detection
- **Developer accountability:** If you break a test, you fix it
- **Escalation:** Developer who created bug is first escalation point, not tester
- **Outcome:** Minimizes "recall-class" bugs, reduces need for massive test teams

**Organizational Structures:**
- **Google Engineering Productivity (EP):** Centralized testing org, testers "on loan" to product teams
- **Microsoft Feature Crews:** Small cross-functional groups (1 PM + 3-5 Testers + 3-5 Developers)
- **Microsoft Leadership Triad:** PM + Dev + Test leads manage quality together

**Key Numbers:**
- Microsoft historically had ~1:1 developer-to-tester ratio (~9,000 testers)
- Google SRE-to-developer ratio: <10% overall
- SRE ratios by area: 1:5 (infrastructure) to 1:50 (consumer apps)

**Maturity:** Intermediate - Requires team structure decisions

---

### 5.2 Bug Bars

**Definition:**
A **bug bar** is a predefined quality standard that sets the threshold for number and severity of bugs allowed at each development stage {% cite page2008testing %}.

**Bug Severity Levels:**

| Sev | Definition | Ship Decision |
|-----|------------|---------------|
| **1** | Crashing bug, primary feature unusable | **Always blocks** |
| **2** | Major feature broken | Usually blocks |
| **3** | Minor issue | Ship with plan |

**Milestone Exit Criteria Examples:**
- No known Sev 1 bugs
- Top 70% of customer-reported crashes fixed
- All Priority 1 and Priority 2 bugs resolved
- 80% code coverage achieved

**Release Blockers:**

| Blocker Type | Description |
|--------------|-------------|
| **Inherent risk** | Sev 1 or system crashes |
| **Exit criteria failure** | Bug goals not met |
| **Mandatory policy** | Security, privacy, legal issues |
| **Feature crew gates** | All known bugs in feature must be fixed |

**The War Room (Ship Room):**
- Ship-quality oversight committee
- Reviews "wave" (bug backlog)
- Makes trade-off decisions: fix, cut, or postpone
- Final authority on ship decision

**Decision Framework:**
1. Categorize bugs by severity
2. Compare against bug bar thresholds
3. Triage into "must fix" vs "should fix"
4. War room makes final call on edge cases

**Maturity:** Intermediate - Requires bug tracking discipline

---

### 5.3 Toil Management

**Definition:**
Toil is repetitive, manual work that lacks enduring value, grows linearly with service size, and could be automated {% cite beyer2016sre %}.

**Five Characteristics of Toil:**

| Characteristic | Description |
|----------------|-------------|
| **Manual** | Requires human intervention |
| **Repetitive** | Done over and over again |
| **Automatable** | Could be done by a machine |
| **Nontactical** | No lasting strategic value |
| **No Enduring Value** | Doesn't improve the system permanently |

**The 50% Rule:**
> "SREs should spend no more than 50% of their time on toil - the rest should be engineering work that reduces future toil." {% cite beyer2016sre %}

**Toil Examples vs Engineering:**

| Toil (Bad) | Engineering (Good) |
|------------|-------------------|
| Manual deploys | CI/CD pipeline |
| Alert triage | Better monitoring |
| Password resets | Self-service portal |
| Log searches | Dashboards |

**Reduction Strategies:**

| Strategy | Description |
|----------|-------------|
| **Engineer out** | Automate the task entirely |
| **Reject** | Push back on toil requests, propose alternatives |
| **Human-backed interfaces** | Design systems where humans are last resort |
| **Melt snowflakes** | Standardize to reduce special cases |
| **Self-service** | Enable users to help themselves |

**Complexity Toil Warning:**
> "Automatable" doesn't always mean "should automate" - overly complex automation becomes its own form of toil when it breaks and requires debugging.

**Maturity:** Starter - Can track immediately, automation builds over time

---

### 5.4 Automation Maturity Levels

**Google Test Certified Program** {% cite winters2020swe %}:

| Level | Requirements |
|-------|--------------|
| **Level 1** | Continuous build, tests classified by size, identify flaky tests, smoke test suite |
| **Level 2** | No red tests at release, smoke tests pass before submit, >=1 integration test |
| **Level 3** | Tests required for all nontrivial changes, coverage targets increase |
| **Level 4** | Smoke tests automated before submit, run in <30 minutes |
| **Level 5** | Tests for every bug fix, static/dynamic analysis, 60% total coverage, 40% small tests |

**Pipeline Maturity Matrix:**

| Level | Name | Description |
|-------|------|-------------|
| **1** | Chaotic | Unplanned, manual, risky operations |
| **2** | Reactive | Some monitoring, respond to issues |
| **3** | Proactive | Prevention focus, some automation |
| **4** | Managed | Comprehensive automation, metrics |
| **5** | Continuous Improvement | Automated failover, self-healing |

**Progression Path: Crawl -> Walk -> Run**
1. **Crawl** -> Set up CI, basic tests
2. **Walk** -> Automated gates, coverage targets
3. **Run** -> Full automation, self-service

**Signs of Maturity:**
- Tests required for all changes (not optional)
- Smoke tests gate code submission
- Coverage automatically tracked
- Static analysis integrated
- Every bug gets a regression test

**Maturity:** Starter to Advanced - Progress incrementally through levels

---

## Part 6: Chaos Engineering & Resilience

{: .note }
> **See also:** [Testing Practices](04-testing-practices.md) for chaos engineering and shift-right testing, [Site Reliability Engineering](06-site-reliability-engineering.md) for resilience practices.

### 6.1 Definitions

**Key Distinction** {% cite owotogbe2024chaos %}:

| Term | Description |
|------|-------------|
| **Resilience Testing** | Controlled observation to confirm specific properties (recovery time, least privilege) |
| **Chaos Engineering** | Exploratory practice to discover unknown weaknesses |
| **Continuous Validation** | Periodic checks that new features don't erode existing resilience |

> "Resilience testing confirms known properties. Chaos engineering discovers unknown weaknesses."

---

### 6.2 Industry Programs

| Program | Company | Description |
|---------|---------|-------------|
| **DiRT** | Google | Annual disaster recovery testing - simulates regional outages, building power-offs |
| **Failure Friday** | PagerDuty | Weekly manual failure injection, inspired by Netflix's Simian Army |
| **Chaos Monkey** | Netflix | Destructive testing/fuzzing to find preexisting bugs |
| **Wheel of Misfortune** | Google | Role-play past incidents from postmortems for training |
| **Red Team** | Various | Simulated attacks (phishing, data exfiltration) without advance notice |

> "The best way to avoid failure is to fail constantly." - Netflix engineering

---

### 6.3 Fault Injection Techniques

| Technique | Description |
|-----------|-------------|
| **RPC Failures** | Add arbitrary delays/failures via server libraries |
| **Proxy-Based** | Envoy filters return errors for % of traffic |
| **Step Function** | Gradually increase latency until full outage |
| **Resource Drain** | Memory/CPU exhaustion |
| **VALET Framework** | Automated destructive tests in staging |

**Progression:**
```
Dev -> Staging -> 1% Prod -> 10% -> Full
```

---

### 6.4 Safety Mechanisms

| Mechanism | Purpose |
|-----------|---------|
| **Synthetic traffic** | Production-like but safe test data |
| **1% dry run** | Test on 1% of data in non-prod first |
| **Fail static** | If control fails, existing policy stays (no accidental 100% outage) |
| **Cancellation mechanism** | Abort experiment immediately if unrelated failure occurs |
| **Blast radius** | Limit affected scope |

**Real Example (Netflix):**
- Chaos Monkey kills instances during **business hours**
- Teams must build for failure by default

**Anti-patterns to Avoid:**
- Testing in production without safety mechanisms
- No cancellation/abort capability
- Skipping validation after new feature deploys
- Not documenting findings

**Maturity:** Advanced - Requires mature monitoring and incident response first

---

## Part 7: Code Agents & Guardrails (Optional)

{: .note }
> **See also:** [Industry Case Studies](07-industry-case-studies.md) for empirical research on AI-assisted development practices.

### 7.1 Industry Context

Per recent surveys {% cite ferrag2025llmtoagents %} {% cite wang2024agentsse %}:
- **90%** of SWEs use AI assistants
- SWE-bench success: 4.4% to **69%+** {% cite swebench2024 %}
- Tools: Devin, Claude Code, Cursor, GitHub Copilot

---

### 7.2 Trust Tiers (T0-T3)

**Why Trust Tiers?**
You wouldn't give a new intern access to delete production databases. Similarly, AI agents need to earn trust gradually through demonstrated competence.

**Framework for scaling agent autonomy:**

| Tier | Name | Capability | Example |
|------|------|------------|---------|
| T0 | Observational | Summaries only | "Here's what I found in the logs" |
| T1 | Approval-Gated | Needs human signature | "I recommend this fix. Approve?" |
| T2 | Narrow Autonomy | Limited actions | Can rollback if <20% traffic affected |
| T3 | Conditional | Full autonomy + audit | Auto-deploys with continuous monitoring |

**Scenario - Promoting an Agent Through Tiers:**

```
Month 1 (T0): Agent summarizes PR changes, suggests tests
  -> Human writes all code, agent just advises

Month 2 (T1): Agent writes test code, human reviews and approves
  -> "I generated 5 tests. Here they are for your review."

Month 3 (T2): Agent can auto-fix failing tests if fix is <10 lines
  -> Small fixes happen automatically, big changes need approval

Month 6 (T3): Agent handles routine bug fixes end-to-end
  -> Creates PR, gets review, merges, monitors deployment
  -> REQUIRES: 95% success rate, 0 policy violations over 100 deploys
```

---

### 7.3 Guardrails

**Policy-as-Code** {% cite owasp2025llmtop10 %}:
- OPA, Rego, Cedar languages
- Machine-enforceable constraints
- Example: Block deployments with critical CVEs

**Operational Controls:**
- **Circuit Breakers:** Auto-disable on latency/cost exceed
- **Stack Guards:** Prevent tech stack mismatches

---

### 7.4 Failure Modes

**Common ways AI agents fail (and how to prevent them):**

| Mode | What Happens | Real Example | Fix |
|------|--------------|--------------|-----|
| **Slopsquatting** | Agent suggests non-existent package | `pip install flask-security-utils` (doesn't exist!) | Dependency whitelist |
| **Security Degradation** | Each AI iteration adds vulnerabilities | After 5 iterations: 37.6% more security holes {% cite cotroneo2025humanvsai %} | Human review every 3 iterations |
| **Context Inconsistency** | Agent forgets earlier decisions | Refactors function it just wrote differently | RAG for memory |
| **Flakiness Transfer** | Copies flaky patterns from examples | Test uses `sleep(5)` like training data did | Fix flaky tests first |

**Slopsquatting Explained:**
```python
# Agent hallucinates a plausible-sounding package name
import flask_auth_helper  # DOESN'T EXIST!

# Attacker registers "flask_auth_helper" on PyPI with malware
# Next developer who runs this code gets compromised
```
**Prevention:** Maintain approved package list, block unknown dependencies

---

### 7.5 Human-in-the-Loop Best Practices

1. **QA as Editor:** Humans set policy, agents execute
2. **Approval Windows:** 15 min for Tier 1 operations
3. **Small Batches:** AI increases PR size 154% - resist this
4. **Review Cadence:** Every 3 iterations max

**Maturity:** Advanced - Requires mature DevOps and clear policies

---

## Part 8: Exam Preparation

### Key Numbers Reference Card

| Metric | Value | Source |
|--------|-------|--------|
| Test pyramid ratio | **70/20/10** | Google |
| Coverage target | **80%** | Microsoft |
| Code review latency | **< 4 hours** | Google |
| Median change size | **24 lines** | Google |
| Max on-call incidents | **2/12h shift** | SRE |
| SRE project time | **>=50%** | Google |
| Canary population | **1%** | Industry |
| Automation target | **90%** | Google |
| False positive limit | **<=10%** | Google |
| Toil limit | **<=50%** | SRE |
| LLM defect recall | **82%** | Claude 3.5 {% cite zeng2025swrbench %} |
| Multi-review F1 uplift | **+43.67%** | {% cite zeng2025swrbench %} |
| MTTR improvement | **-43%** | {% cite dora2025report %} |
| CoverUp coverage | **80%** | {% cite pizzorno2024coverup %} |
| Flaky test CI impact | **3.5%** | {% cite memon2017testing %} |

---

### Key Terms to Define

**Traditional:**
- SLI, SLO, SLA, Error Budget, Burn Rate
- Test pyramid, Small/Medium/Large tests
- Canary deployment, Progressive rollout
- Production Readiness Review (PRR)
- Feature flags, Dark launches
- Four Golden Signals
- Toil, 50% rule
- Bug bar, Readability certification

**Emerging:**
- Semantic Self-Healing
- Intent Gap {% cite konstantinou2024testoracles %}
- Slopsquatting
- Trust Tiers (T0-T3)
- Policy-as-Code {% cite owasp2025llmtop10 %}
- Circuit Breaker
- Multi-Review {% cite zeng2025swrbench %}
- LLM-as-a-Judge {% cite huang2025llmasjudge %}

---

### Compare and Contrast

| Aspect | Traditional | LLM-Assisted |
|--------|-------------|--------------|
| Test generation | Manual or template-based | Zero-shot/few-shot LLM |
| Code review | Human reviewers only | Hybrid: LLM triage + human judgment |
| Flaky test repair | Manual investigation | FlakyGuard: 47.6% auto-repair |
| Defect detection | SAST (F1: 0.26-0.55) | LLM (F1: 0.75-0.80) |
| Coverage boost | SBST until plateau | CoverUp: 80% vs 47% |

---

### Anti-Patterns Summary

| Anti-Pattern | Why It's Bad | Better Approach |
|--------------|--------------|-----------------|
| Only E2E tests | Slow, flaky | 70/20/10 pyramid |
| Ignoring flaky tests | Lose trust in all tests | Quarantine and fix |
| >10% false positives | Devs ignore warnings | Tune tools |
| 100% automation | Some tasks need humans | 90/10 rule |
| No human gates on AI | 37.6% more vulnerabilities | Review every 3 iterations |
| Trusting LLM test oracles | 68.1% may validate bugs | Verify expected behavior |
| Solo commits | No review, higher risk | Multi-party authorization |
| Over-investing early | Wasted on scrapped features | Match effort to maturity |

---

### Quick Wins Table

**Low Effort, High Value practices to start immediately:**

| Practice | Effort | Value | How to Start |
|----------|--------|-------|--------------|
| **70/20/10 test ratio** | Low | High | Audit current test distribution, add unit tests |
| **Static analysis in IDE** | Low | High | Install ESLint/Pylint, enable in editor |
| **Code review requirement** | Low | High | GitHub branch protection, require 1 reviewer |
| **"You build it, you break it"** | Low | High | Make test author fix broken tests |
| **80% coverage for new code** | Medium | High | Configure coverage gate in CI |
| **Pre-merge CI checks** | Medium | High | GitHub Actions/GitLab CI on PRs |
| **Small changes (~100 lines)** | Low | Medium | Set PR size guidelines |
| **Auto-fixes in static analysis** | Low | Medium | Enable fix suggestions |

---

### Google vs Microsoft Comparison

For detailed coverage, see [Google Engineering Practices](08-google-engineering-practices.md) and [Microsoft Quality Practices](09-microsoft-quality-practices.md).

| Practice | Google | Microsoft |
|----------|--------|-----------|
| **Test pyramid** | 70/20/10 rule | Similar ratios |
| **Coverage target** | Varies by project | 80% for new features |
| **Code review** | Mandatory + readability cert | Mandatory peer review |
| **Review tools** | Critique, Tricorder | PREfast, custom tools |
| **Static analysis** | Tricorder (centralized) | PREfast, managed analyzers |
| **Testing roles** | SWE/SET/TE | SDE/SDET/IC/Test Architect |
| **Organization** | Engineering Productivity (centralized) | Feature Crews + Leadership Triad |
| **Dev:Tester ratio** | No fixed ratio | Historically ~1:1 |
| **Milestone gates** | Test Certified levels | M1/M2/M3 exit criteria |
| **Deployment** | Canary + error budgets | Ship Room approval |
| **Quality ownership** | "You build it, you break it" | Leadership Triad |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.

---

*Last updated: 2026-01-19*
