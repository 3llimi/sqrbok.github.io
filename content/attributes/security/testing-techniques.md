---
title: Testing Techniques
parent: Security
grand_parent: Quality Attributes
nav_order: 1
layout: default
---

# Security Testing: No Single Technique Provides Complete Coverage

Security testing verifies that software correctly implements the CIA triad — confidentiality, integrity, and availability — plus authentication, authorization, and non-repudiation {% cite felderer2016security %}. The literature unanimously recommends combining multiple techniques because no single approach can find all vulnerability classes {% cite mcgraw2006software %}.

> "Security is not security software — adding SSL, crypto features, or a firewall doesn't solve the security problem." — McGraw (2006) {% cite mcgraw2006software %}

---

## Five Approaches to Finding Vulnerabilities

| Technique | Approach | Best For | SDLC Phase |
|-----------|----------|----------|------------|
| **SAST** | Analyze source code without executing | Implementation bugs, coding standard violations | Build |
| **DAST** | Test running application via HTTP/inputs | Runtime vulnerabilities, configuration issues | Test |
| **Fuzzing** | Send random/mutated inputs to interfaces | Crashes, memory corruption, unexpected behavior | Test |
| **Pen Testing** | Simulate real attacker with human judgment | Business logic flaws, attack chain validation | Test/Deploy |
| **Code Review** | Human examination of code changes | Design flaws, security-sensitive logic | Implementation |

---

## Static Analysis (SAST)

Static Application Security Testing analyzes source code or bytecode **without executing** the program. Chess & West (2007) describe a spectrum of techniques, each trading precision for coverage {% cite chess2007secure %}:

| Technique | What It Checks | Precision | Speed |
|-----------|---------------|-----------|-------|
| **Lexical analysis** | Dangerous function names (e.g., `gets()`, `strcpy()`) | Low | Very fast |
| **AST / Semantic** | Language-aware pattern matching | Medium | Fast |
| **Dataflow / Taint** | Tracks untrusted data from source to sink | High | Moderate |
| **Control flow** | Execution path analysis | High | Slow |
| **Abstract interpretation** | Mathematical approximation of all states | Very high | Very slow |
| **Model checking** | Exhaustive state space exploration | Highest | Slowest |

### Why SAST Has Inherent False Positives

Rice's Theorem proves it is **impossible to perfectly determine any nontrivial property** of a general program {% cite chess2007secure %}. This means every static analysis tool must choose:

- **Sound** (find all bugs, accept false positives) — preferred for security
- **Complete** (no false positives, may miss bugs) — preferred for developer experience

In practice, only 30% of automated scan results are effective vulnerabilities, causing "alert fatigue" that leads teams to distrust and ignore findings {% cite rajapakse2021security %}. SAST also finds implementation bugs well but **cannot find design-level flaws** — it cannot tell you that your authentication architecture is wrong {% cite chess2007secure %}.

---

## Dynamic Analysis (DAST)

Dynamic Application Security Testing probes a **running application** through its external interfaces, typically HTTP requests for web applications. OWASP defines two modes {% cite owasp2021top10 %}:

- **Passive mode:** Observe traffic without modification (proxy-based)
- **Active mode:** Send attack payloads (SQL injection, XSS, CSRF probes)

### DAST in CI/CD Pipelines

Rangnau et al. (2020) measured the practical cost of integrating DAST into CI/CD {% cite rangnau2020devsecops %}:

| Metric | Value |
|--------|-------|
| Total pipeline time | 14 min 6 sec |
| ZAP container build (bottleneck) | 6 min 52 sec |
| DAST techniques tested | 3 (passive proxy, active scan, API fuzzing) |
| Pipeline behavior on findings | Fails build when thresholds exceeded |

The fundamental tension: security scans take hours while DevOps deploys in minutes {% cite rajapakse2021security %}. Solutions include running DAST **in parallel** (not blocking the pipeline) and using IAST for faster feedback.

---

## Fuzzing

Fuzzing tests software by sending **random or semi-random inputs** to program interfaces and monitoring for crashes or unexpected behavior. Takanen et al. (2008) define two axes of classification {% cite takanen2008fuzzing %}:

| Axis | Options |
|------|---------|
| **Input generation** | **Generation-based** (from protocol spec) vs **Mutation-based** (modify valid inputs) |
| **Intelligence** | **Dumb** (random) vs **Smart** (grammar/protocol-aware) |

### The Fuzzing Lifecycle

Takanen describes a 6-phase process {% cite takanen2008fuzzing %}:

1. **Identify interfaces** — network protocols, file formats, APIs
2. **Generate inputs** — create test cases from spec or mutation
3. **Send inputs** — deliver to target system
4. **Monitor** — watch for crashes, hangs, memory errors
5. **Analyze** — determine root cause of failures
6. **Report** — document findings with reproducible test cases

### Coverage-Bug Correlation

Takanen's empirical observation: **1% increase in code coverage ≈ 1% more bugs found** {% cite takanen2008fuzzing %}. This quantifies fuzzing's fundamental limitation — with infinite input space, fuzzing can never prove security, but it can systematically improve it.

For comprehensive fuzzing coverage (Miller's foundational work, AFL, SAGE, directed fuzzing), see [Fuzzing](../../verif/random/fuzzing.md).

---

## Penetration Testing

Penetration testing simulates a real attacker using a combination of automated tools and **human judgment**. Weidman (2014) defines a 7-phase methodology {% cite weidman2014penetration %}:

| Phase | Activity |
|-------|----------|
| 1. Pre-engagement | Scope, rules of engagement, authorization |
| 2. Information gathering | OSINT, DNS, network scanning |
| 3. Threat modeling | Identify likely attack paths |
| 4. Vulnerability analysis | Scan and manually verify vulnerabilities |
| 5. Exploitation | Attempt to gain access |
| 6. Post-exploitation | Pivot, escalate privileges, assess impact |
| 7. Reporting | Document findings with remediation advice |

> "Penetration tests truly begin after exploitation — post-exploitation determines real business impact." — Weidman (2014) {% cite weidman2014penetration %}

### Team Structure

NIST SP 800-115 defines three team types for security assessments {% cite nist2008sp800115 %}:

| Team | Knowledge | Simulates |
|------|-----------|-----------|
| **Red** (external) | No insider knowledge | Outside attacker |
| **Blue** (internal) | Full system knowledge | Defensive team |
| **White** (hybrid) | Partial knowledge | Insider threat or guided assessment |

---

## Code Review for Security

Yu et al. (2023) conducted the largest empirical study of security defect detection through code review, analyzing 432K review comments across OpenStack and Qt {% cite yu2023security %}:

| Finding | Value |
|---------|-------|
| Security-related comments | < 1% of all review comments |
| Security defects resolved | 65.9% overall |
| Resolution when reviewer suggests fix | 81.3% |
| Top defect: race conditions | 39% of security defects |
| Second: crashes/resource management | 22.8% |

The key insight: security defects are **rare in code review** but have high resolution rates when reviewers provide concrete fix suggestions. Code review complements automated tools by catching design-level issues and security-sensitive logic that SAST cannot detect.

Howard estimates that threat modeling finds ~50% of security flaws, with code review finding the complementary 50% {% cite howard2006writing %}.

---

## SAST vs. DAST vs. IAST vs. RASP

Modern security testing increasingly uses hybrid approaches {% cite rajapakse2021security %}:

| Tool Type | How It Works | Strengths | Weaknesses |
|-----------|-------------|-----------|------------|
| **SAST** | Analyzes source/bytecode | Early feedback, full code coverage | False positives (Rice's Theorem), no runtime context |
| **DAST** | Probes running app externally | Finds runtime issues, low false positives | Slow, limited coverage, no code location |
| **IAST** | Agent inside running app | Combines SAST+DAST precision, code-level detail | Requires instrumented runtime |
| **RASP** | Self-protecting runtime agent | Real-time attack blocking | Performance overhead, not a testing tool |
| **SCA** | Scans dependencies | Finds known CVEs in libraries | Cannot detect novel vulnerabilities |

```mermaid
flowchart LR
    IDE["<b>🖥️ IDE</b><br/>IDE SAST<br/>Real-time"]
    Build["<b>🔨 Build</b><br/>SAST · SCA"]
    Test["<b>🧪 Test</b><br/>DAST<br/>HTTP scanning"]
    Runtime["<b>🚀 Runtime</b><br/>IAST · RASP"]

    IDE --> Build --> Test --> Runtime

    style IDE fill:#e8f5e9,stroke:#019546,color:#282828
    style Build fill:#c8e6c9,stroke:#019546,color:#282828
    style Test fill:#a5d6a7,stroke:#019546,color:#282828
    style Runtime fill:#81c784,stroke:#019546,color:#282828
```

The trend is toward **shifting left** — catching vulnerabilities as early as possible in the development cycle. IDE-integrated SAST provides real-time feedback during coding, while SCA catches known dependency vulnerabilities at build time {% cite rajapakse2021security %}.

---

## Empirical Reality: Speed vs. Thoroughness

The fundamental challenge of security testing in modern development:

| Challenge | Evidence | Source |
|-----------|----------|--------|
| Scan speed mismatch | Static scans take hours; DevOps deploys in minutes | {% cite rajapakse2021security %} |
| False positive rate | Only 30% of findings are real vulnerabilities | {% cite rajapakse2021security %} |
| Alert fatigue | Teams distrust and ignore automated findings | {% cite rajapakse2021security %} |
| Pipeline overhead | 14 min total; ZAP = 6:52 bottleneck | {% cite rangnau2020devsecops %} |
| No silver bullet | No single tool covers all vulnerability classes | {% cite rangnau2020devsecops %} |

The solution is a **layered approach**: fast tools (IDE SAST, SCA) gate the pipeline, while thorough tools (DAST, pen testing) run in parallel or on schedule. McGraw's 7 Touchpoints model provides the framework: code review (Touchpoint 1) → architecture risk analysis (Touchpoint 2) → penetration testing (Touchpoint 3), each addressing a different vulnerability class {% cite mcgraw2006software %}.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
