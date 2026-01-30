---
title: "Study Notes: Verification Methods"
parent: Overview
nav_order: 10
layout: default
---

# Study Notes: Verification Methods

**Course:** Software Quality and Reliability (SQR)
**Lecture:** L03 - Verification Methods
**Purpose:** Exam preparation and revision

---

## Table of Contents

1. [Part 1: V&V Fundamentals](#part-1-vv-fundamentals)
2. [Part 2: Inspection](#part-2-inspection)
3. [Part 3: Static Analysis](#part-3-static-analysis)
4. [Part 4: Testing](#part-4-testing)
5. [Part 5: Demonstration](#part-5-demonstration)
6. [Part 6: Summary & Defense in Depth](#part-6-summary--defense-in-depth)

---

## Part 1: V&V Fundamentals

### Learning Objectives
- Explain verification's contribution to software quality
- Distinguish between verification and validation
- List and describe the four verification techniques

### Purpose of Verification

Verification establishes **confidence** (not proof!) that software:
1. **Does what it's supposed to do** under stated conditions
2. **Doesn't do what it shouldn't do**, even under adverse conditions

> "Verification is a continuous process, not something that happens at the end."

**Key insight:** You cannot **test IN** quality — you verify to find exceptions and establish confidence levels.

### The Four Verification Techniques

| Technique | Definition | Best For |
|-----------|------------|----------|
| **Inspection** | Human examination of artifacts | Faults of omission, style, early detection |
| **Analysis** | Model-based evaluation without execution | Formal properties, concurrency, security |
| **Testing** | Execution under controlled conditions | Dynamic behavior, integration issues |
| **Demonstration** | Operation in real/production environment | User acceptance, performance validation |

**Defense in Depth:** No single technique finds all defects. Combine them!

### INCOSE Definitions

| Technique | INCOSE Definition |
|-----------|-------------------|
| **Inspection** | Determining performance by examining engineering documentation or the item itself using visual means or simple measurements |
| **Analysis** | Verification method of determining performance or other properties from analytical evidence |
| **Testing** | Verification by operating the system under controlled conditions and analyzing results |
| **Demonstration** | Verification by observing the item's operation under natural or production-like conditions |

---

## Part 2: Inspection

### Learning Objectives
- Define inspection and its role in verification
- Explain the ROI of inspections with empirical evidence
- Describe the spectrum of inspection techniques from formal to informal
- Compare inspection vs testing

### What is Inspection?

**INCOSE Definition:**
> Determining performance by examining engineering documentation or the item itself using visual means or simple measurements.

**Practitioner Definition:**
> Scrutiny by people other than the producer, based on the premise that individuals might be blind to trouble spots in their own work.

### Uses of Inspection

- **Complements testing** (comes earlier in process)
- Finds faults of omission, design problems, style issues
- Catches defects **before** they become failures
- **Key insight:** Inspection finds faults **directly**; Testing observes failures → traces to faults

### Inspection ROI — Empirical Evidence

| Organization | Result | Source |
|--------------|--------|--------|
| **Hewlett-Packard** | ROI 10:1, $21.4M/year savings | Grady & Van Slack 1994 {% cite grady1994key %} |
| **AT&T Bell Labs** | 10× quality improvement, 14% productivity increase | Humphrey 1989 {% cite humphrey1989managing %} |
| **Bell Northern** | 33 hours maintenance saved per defect found | Russell 1991 {% cite russell1991bell %} |
| **Cisco** | Results match established literature | Cohen 2006 {% cite cohen2006code %} |

**Why so effective?**
- Find defects early (cheaper to fix)
- Knowledge transfer within team
- Prevent defects from propagating

### Inspection Techniques — From Formal to Informal

| Technique | Description | Overhead |
|-----------|-------------|----------|
| **Fagan Inspections** | Well-defined entry/exit conditions. Presenter ≠ author. | High |
| **Team Review** | Formal meeting with project personnel, managers, stakeholders. | Medium-High |
| **Walkthrough** | Author leads team through artifact. Questions encouraged. | Medium |
| **Tool-Assisted Code Review** | Line-by-line critique via diff, annotations, GitHub PRs. | Low-Medium |
| **Pair Programming** | Real-time review. Two developers at one workstation. | Built-in |
| **Ad-hoc Review** | Unstructured, spontaneous. Least formal. | Lowest |

### Matching Inspection to Context

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Fagan** | Safety-critical, contractual requirements | Avionics software |
| **Team Review** | Design decisions, architecture | System design docs |
| **Walkthrough** | Teaching, knowledge sharing | Onboarding new devs |
| **Tool-Assisted** | Daily code changes, PRs | GitHub/GitLab workflow |
| **Pair Programming** | Complex features, onboarding | Feature development |
| **Ad-hoc** | Quick questions, sanity checks | "Can you check this?" |

**Key Insight:** Even informal review catches significant defects. Don't skip review because Fagan is "too heavy."

### Inspection vs Testing — Complementary Techniques

| Aspect | Inspection | Testing |
|--------|------------|---------|
| **Finds** | Static, localized faults | Dynamic, interaction faults |
| **Detection** | Direct observation | Failure → trace to fault |
| **Timing** | Early (requirements, design) | Later (code exists) |
| **Hidden faults** | Can find (e.g., platform issues) | Won't trigger if untested |
| **Cost** | Higher per-session | Higher for test creation |

**Empirical guidance:** Use both! Studies show they find different defect populations.

---

## Part 3: Static Analysis

### Learning Objectives
- Explain static analysis and its types
- Describe safety, liveness, fairness, and temporal properties
- Understand Rice's Theorem and sound vs complete analysis
- List common fault categories detected by analysis tools

### What is Static Analysis?

**INCOSE Definition:**
> Verification method of determining performance or other properties from analytical evidence.

**Types of Analysis:**
- **Static Analysis:** Examining source code, bytecode, or binaries without execution
- **Model Checking:** Exploring all states of a formal model exhaustively
- **Theorem Proving:** Mathematical proof of properties

**Key Insight:** Static analysis is **automated inspection**. Model checking is **exhaustive exploration**.

### Properties Verified by Analysis

| Property | Meaning | Example |
|----------|---------|---------|
| **Safety** | Nothing bad happens | No deadlock, no null dereference |
| **Liveness** | Something good eventually happens | Response always returned |
| **Fairness** | Every process gets fair share | No starvation in scheduler |
| **Temporal** | Correct ordering over time | Login before access |

**Memory aid:**
- Safety = absence of bad
- Liveness = presence of good

**Safety Property Example:**
> "The temperature should never exceed 100 degrees" — if violated once, fails forever.

### Model Checking

**Process:**
1. Model the system as finite state machine
2. Express property as temporal logic formula
3. Tool explores ALL reachable states
4. Returns counterexample if property violated

**Limitation:** State explosion for large systems

**Tools:**

| Tool | Language | Domain |
|------|----------|--------|
| **SPIN** | Promela | Concurrent systems |
| **Java PathFinder** | Java bytecode | Concurrent Java |
| **TLA+** | TLA+ spec | Distributed systems |
| **Alloy** | Alloy | Structural properties |

### Rice's Theorem — Why No Tool Is Perfect

**The Theorem:**
> No analysis can be sound, complete, AND terminate on all programs.

**The Trade-off:**

| Property | Description | Consequence |
|----------|-------------|-------------|
| **Sound** | Finds ALL bugs of a type | May report false positives |
| **Complete** | All reports are real bugs | May miss some bugs |

**Practical Implications:**

| Tool Strategy | Focus |
|---------------|-------|
| Academic tools | Soundness (catch all) |
| Commercial tools | Low false positives (usability) |

**Commercial tools prioritize usability over soundness** — they accept some missed bugs to avoid overwhelming developers with false alarms.

### Fault Taxonomy — What Analysis Detects

| Category | Examples |
|----------|----------|
| **Resource Errors** | Memory leaks, file handle leaks, deadlocks |
| **Protocol Errors** | API misuse, wrong call sequences |
| **Concurrency** | Race conditions, atomicity violations |
| **Security** | Buffer overflow, SQL injection, XSS |
| **Memory** | Null dereference, use-after-free |
| **Exceptional** | Unchecked exceptions, error handling |

**Note:** Different tools specialize in different categories. No single tool catches everything.

### Modern Tool Ecosystem

| Category | Tools |
|----------|-------|
| **Linters** | ESLint, Pylint, RuboCop, Checkstyle |
| **Bug Finders** | SpotBugs, Infer, Coverity, CodeQL |
| **Security (SAST)** | Semgrep, Fortify, SonarQube, Snyk |
| **Type Checkers** | TypeScript, mypy, Flow |

**Integration Points:**
- **IDE** — Real-time feedback
- **Pre-commit hooks** — Local gate
- **CI/CD pipeline** — Quality gate
- **PR review** — Automated comments

### Limitations of Analysis

**Cannot reliably detect:**
- Business logic errors
- Usability problems
- Performance issues (usually)
- Integration failures
- Requirements misunderstandings

**Practical wisdom:** Use analysis as a filter, not a guarantee. It catches mechanical bugs, not logical ones.

---

## Part 4: Testing

### Learning Objectives
- Define testing and explain Oracle problem
- Describe test levels (Unit, Integration, System)
- Compare black box vs white box testing
- Explain test pyramid and Google's 70/20/10 ratio
- Summarize TDD empirical evidence

### What is Testing?

**INCOSE Definition:**
> Verification method by which a system or component is executed under specified conditions, outputs are observed, and evaluation is made.

**Testing involves:**
1. **Inputs:** Prepared test data
2. **Execution:** Running the system
3. **Observation:** Recording actual outputs
4. **Evaluation:** Comparing to expected results (oracle)

> "Testing can show the presence of bugs, but never their absence."
> — Edsger Dijkstra

**Key distinction:** Testing requires execution. Analysis does not.

### Multiple Dimensions of Testing

| Dimension | Categories |
|-----------|------------|
| **Level** | Unit → Integration → Thread/Function → System |
| **Purpose** | Functional, Robustness, Performance, Regression |
| **Source** | Black Box (spec), White Box (structure), Model-based |
| **Execution** | Manual, Automated |

### Test Levels

| Level | Scope | Owner | Adequacy Criteria |
|-------|-------|-------|-------------------|
| **Unit** | Single function/method | Developer | Statement/branch coverage |
| **Integration** | Component interactions | Dev/QA | Interface coverage |
| **Thread/Function** | End-to-end workflow | QA | Path coverage |
| **System** | Complete integrated system | QA/UAT | Requirements coverage |

**V-Model alignment:** Unit ↔ Design, Integration ↔ Architecture, System ↔ Requirements

### Test Doubles — Isolation for Unit Testing

| Type | Purpose |
|------|---------|
| **Stub** | Returns canned answers |
| **Mock** | Verifies interactions |
| **Fake** | Simplified implementation |
| **Spy** | Records calls for later verification |

**Why isolate?**
- Fast execution (milliseconds)
- Deterministic results
- Test single unit of behavior
- Pinpoint failures precisely

**Key Insight:** Mocking isolates the unit under test. Otherwise you're doing integration testing.

### Black Box vs White Box Testing

| Aspect | Black Box | White Box |
|--------|-----------|-----------|
| **Knowledge** | Specification only | Source code visible |
| **Focus** | What it does | How it does it |
| **Techniques** | Equivalence classes, boundary values | Statement, branch, path coverage |
| **Who** | Tester (any) | Developer (code access) |
| **Finds** | Missing features, wrong behavior | Dead code, untested paths |

**Key Insight:** Black box tests the **contract**. White box tests the **implementation**. Both are needed.

### Testing by Purpose

| Purpose | Focus | Example |
|---------|-------|---------|
| **Functional** | Correct behavior for valid inputs | "Login with valid credentials succeeds" |
| **Robustness** | Handling of invalid/extreme inputs | "System recovers from network failure" |
| **Performance** | Response time, throughput, scalability | "Page loads in < 2 seconds" |
| **Regression** | Unchanged behavior after modifications | "Bug fix doesn't break other features" |

> **Regression testing is critical:** "The most dangerous code is the code you just changed."

### Exploratory Testing

**Definition:** Simultaneous learning, test design, and execution.

| Style | Structure |
|-------|-----------|
| **Ad-hoc** | None, minimal docs |
| **Session-based** | Time-boxed, chartered |
| **Whittaker's Tours** | District metaphor |

**Whittaker's Tours (2009):**
- **Money** — Features customers pay for
- **FedEx** — Track data through system
- **Bad Neighborhood** — Historically buggy areas
- **Saboteur** — Deny resources, break things

> **James Bach:** "Exploratory testing is not a technique; it's an approach."

### Google's Test Pyramid — 70/20/10

| Level | Name | Scope | Speed | Ratio |
|-------|------|-------|-------|-------|
| Base | Small (Unit) | Single function/class | Milliseconds | **70%** |
| Middle | Medium (Integration) | 2+ modules | Seconds | **20%** |
| Top | Large (E2E) | Entire system | Minutes | **10%** |

**Google Scale:** 150M tests/day, 5.5M test targets, 1 commit/sec

**Anti-pattern:** Ice cream cone (many UI tests, few unit tests) → slow, flaky, expensive

### TDD — Empirical Evidence

**TDD Cycle:**
1. **Red:** Write failing test
2. **Green:** Write minimal code to pass
3. **Refactor:** Improve design

| Context | Finding | Source |
|---------|---------|--------|
| **Experienced teams** | 40-90% fewer defects | Nagappan 2008 {% cite nagappan2008tdd %} |
| **TDD novices** | Slight disadvantage vs test-last | Santos 2021 {% cite santos2021tdd %} |
| **Greenfield tasks** | TDD productivity higher | Tosun 2017 {% cite tosun2017tdd %} |
| **Brownfield tasks** | TDD performance collapses | Tosun 2017 {% cite tosun2017tdd %} |

**Balanced conclusion:** TDD benefits require both (1) training/experience AND (2) appropriate task type (greenfield).

| Aspect | TDD | Test-After |
|--------|-----|------------|
| Design influence | Tests drive design | Code drives tests |
| Coverage | High by construction | Varies, often gaps |
| Feedback loop | Immediate | Delayed |

---

## Part 5: Demonstration

### Learning Objectives
- Define demonstration as a verification technique
- Identify when demonstration is essential
- List types of demonstration activities

### What is Demonstration?

**INCOSE Definition:**
> Verification method by which the system is observed during operation in its intended environment.

**Key Insight:** Some properties can **only** be verified by demonstration. "Works on my machine" isn't sufficient.

### Uses of Demonstration

- User Acceptance Testing (UAT)
- Beta testing with real users
- A/B testing in production
- Canary deployments
- Performance validation under real load

### When Demonstration is Essential

- Environment interactions (hardware, network)
- Real-world data patterns
- User behavior validation
- Regulatory compliance evidence

---

## Part 6: Summary & Defense in Depth

### Learning Objectives
- Map verification techniques to quality characteristics
- Apply "defense in depth" principle
- Understand industry quality benchmarks

### Technique-to-Quality Mapping

| Quality Characteristic | Inspection | Analysis | Testing | Demo |
|----------------------|:----------:|:--------:|:-------:|:----:|
| Functionality | ○ | ○ | ● | ● |
| Reliability | ○ | ● | ● | ○ |
| Usability | ○ | ○ | ○ | ● |
| Efficiency | ○ | ○ | ● | ● |
| Maintainability | ● | ● | ○ | ○ |
| Security | ○ | ● | ● | ○ |

● = Strong fit | ○ = Partial fit

**Best practice:** Use multiple techniques. Each finds different defect types.

### Industry Quality Benchmarks

**Empirical data (Shah 2012 {% cite shah2012defect %}, 109 projects):**
- Mean: **7.47** defects/KLOC (post-release)
- Median: **4.3** defects/KLOC
- Range: 0.05 – 50 defects/KLOC

**By language:** Java 5.9, C 10.0, C++ 8.7
**By type:** Open source 4.7, Closed 8.6

**Industry targets:**

| Domain | Target | Source |
|--------|--------|--------|
| Safety-critical | < 0.1/KLOC | DO-178C Level A |
| High-quality | 1-3/KLOC | Jones 2017 {% cite jones2017quantifying %} |
| Typical business | 5-10/KLOC | Shah 2012 {% cite shah2012defect %} |

### Six Key Takeaways

1. **Four V&V techniques:** Inspection, Analysis, Testing, Demonstration
2. **Inspection ROI:** 10:1 return, catches defects early
3. **Analysis limits:** Sound OR complete, not both (Rice's Theorem)
4. **Testing levels:** Unit → Integration → System, each has its role
5. **Test pyramid:** 70% Unit, 20% Integration, 10% E2E (Google)
6. **Defense in depth:** No single technique finds all bugs — combine them!

---

## References

**Primary Sources:**
- Software Inspection {% cite gilb1993software %}
- Software Testing Techniques {% cite beizer2003testing %}
- Managing the Software Process {% cite humphrey1989managing %}
- Google Testing Practices {% cite memon2017testing %} {% cite winters2020swe %}

**Empirical Studies:**
- TDD at Microsoft/IBM {% cite nagappan2008tdd %}
- TDD Meta-Analysis {% cite santos2021tdd %}
- TDD Industry Experiment {% cite tosun2017tdd %}
- Defect Density Benchmarks {% cite shah2012defect %}
- Software Quality Metrics {% cite jones2017quantifying %}

**SQRBOK Pages:**
- [Verification Techniques](https://sqrbok.github.io/content/verif/overview/techniques.html)
- [Inspection](https://sqrbok.github.io/content/verif/overview/inspection.html)
- [Testing Levels](https://sqrbok.github.io/content/verif/overview/testing/testing_levels.html)
- [Analysis Properties](https://sqrbok.github.io/content/verif/overview/analysis/analysis_properties.html)

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.

---

**Next Lecture:** Test Adequacy Criteria — how much testing is enough?
