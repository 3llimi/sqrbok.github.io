---
title: "Revision Questions: Security"
parent: Security
grand_parent: Quality Attributes
nav_order: 100
layout: default
---

# Software Security Analysis — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Part 1: Security Fundamentals

### Q1: Fault-Error-Failure in Security

A junior developer writes a SQL query using string concatenation instead of parameterized queries. An attacker discovers this endpoint and submits `' OR 1=1 --` as a username.

1. Trace the **fault → error → failure** chain (Avizienis 2004) for this SQL injection attack. Identify each stage precisely.
2. Now trace the same chain for a **regular bug** in the same code — e.g., the query crashes when a user's name contains an apostrophe (like "O'Brien"). What is different about the fault stage?
3. Both scenarios share the same root fault. Why does the security case represent a fundamentally different risk category, even though the fix (parameterized queries) is identical?

---

### Q2: Finding vs Preventing — The CTO's Dilemma

A startup CTO with a 20-person engineering team and limited budget asks: "Should we invest in SAST tools or threat modeling first?" You have the following data:

- McGraw's **50/50 split**: half of security issues are design flaws (found by threat modeling), half are implementation bugs (found by tools)
- IBM Cost of a Data Breach 2024: average cost **$4.88M**, average detection time **194 days**
- Avizienis's **4 means** of dependability: fault prevention, fault tolerance, fault removal, fault forecasting

(a) Using McGraw's data, argue why investing in only ONE approach leaves ~50% of vulnerabilities unaddressed.
(b) If you must pick ONE to start with, which do you recommend for a fast-moving startup that deploys daily? Justify your answer.
(c) Map each of the 4 means from Avizienis to a concrete security practice. Which means does threat modeling fall under? Which does SAST fall under?

---

## Part 2: Finding Vulnerabilities

### Q3: Tool Selection Under Constraints

Your team has a CI/CD pipeline deploying **5× per day**. Budget allows only **ONE** security testing tool. Here are the trade-offs:

| Tool | Strength | Weakness |
|------|----------|----------|
| SAST | Finds bugs early, runs on source code | ~70% false positive rate (Rice's Theorem — undecidable in general) |
| DAST | Tests running application, low false positives | Adds ~14 min to pipeline (Rangnau 2020), only finds runtime issues |
| SCA | Catches known CVEs in dependencies | Cannot find custom code bugs, depends on CVE database currency |

1. For each tool, calculate the **practical impact** on your 5×/day deployment cycle. Which tool causes the least friction?
2. Rajapakse 2021 found that DevSecOps tools are only about **30% effective** at finding vulnerabilities. How does this change your cost-benefit analysis?
3. Make your recommendation and justify it. Under what circumstances would you change your answer?

---

### Q4: Code Review + Fuzzing — A Combined Strategy

You are designing the security testing strategy for a **banking application** that processes wire transfers.

- Yu 2023 found that **<1% of code review comments** address security, but when a reviewer **suggests a fix**, the resolution rate is **81.3%**
- Takanen 2008 found that in fuzzing, **1% more code coverage ≈ 1% more bugs** found

(a) What types of vulnerabilities does **code review** catch well? What does it miss? (Think: logic flaws vs. input handling edge cases)
(b) What types of vulnerabilities does **fuzzing** catch well? What does it miss? (Think: crashes and memory errors vs. business logic bypasses)
(c) Design a combined strategy: How would you structure security-focused code reviews to increase the <1% rate? How would you configure fuzzing to maximize coverage of critical payment paths?
(d) For the banking context, which technique is more critical for preventing **financial fraud** vs. preventing **denial-of-service**?

---

## Part 3: Threat Modeling

### Q5: STRIDE Application

Consider this simplified Data Flow Diagram for a web banking application:

```
[User] → (Login Page) → [Auth Service] → [Session Store]
                                ↓
[Admin] → (Admin Panel) → [Account DB]
```

1. Apply **STRIDE** to identify at least **6 threats** — one per STRIDE category. For each, state:
   - The threat description
   - Which DFD element it targets (process, data store, data flow, or external entity)
   - One concrete mitigation
2. Scandariato 2015 found that threat modeling achieves only **36% recall** — meaning 64% of real threats are missed. Looking at your 6 threats above, what **categories of threats** might you have missed? (Hint: consider insider threats, side-channel attacks, supply chain risks)
3. How would you improve recall? What complementary techniques could supplement STRIDE?

---

### Q6: Method Selection for Healthcare

A healthcare startup is building a **patient portal** that must comply with **GDPR**. They have 3 developers, no dedicated security team, and a 6-month runway to launch.

Compare three threat modeling methods:

| Method | Focus | Effort |
|--------|-------|--------|
| STRIDE | Technical threats per DFD element | Medium — requires DFD creation |
| PASTA | Risk-centric, attacker simulation | High — 7 stages, needs threat intelligence |
| LINDDUN | Privacy threats (linkability, identifiability, etc.) | Medium — privacy-specific DFD analysis |

(a) Given GDPR compliance is mandatory, why is STRIDE alone insufficient? What privacy-specific threats does LINDDUN catch that STRIDE misses?
(b) The startup cannot afford all three methods. Propose a **pragmatic combination** (e.g., STRIDE + selected LINDDUN categories) and justify your choice.
(c) Yskout 2020 proposed a **maturity model** for threat modeling adoption. At what maturity level should this startup begin, and what is their realistic 12-month growth path?

---

## Part 4: Secure Design

### Q7: Principle Mapping — Learning from Breaches

The lecture presented 6 major security breaches. Map each to the **Saltzer & Schroeder** design principle it most directly violated:

| Breach | Year | Principle Violated |
|--------|------|--------------------|
| Heartbleed | 2014 | ? |
| Log4Shell | 2021 | ? |
| Equifax | 2017 | ? |
| SolarWinds | 2020 | ? |
| WannaCry | 2017 | ? |
| Target | 2013 | ? |

For **TWO** breaches of your choice, explain in detail:
(a) The vulnerability — what was the technical flaw?
(b) Which Saltzer & Schroeder principle was violated — state the principle and its definition
(c) How applying the principle **during design** would have prevented or mitigated the breach

---

### Q8: Input Validation — "All Input Is Evil"

Howard's rule states: **"All input is evil until proven otherwise."**

A REST API endpoint accepts the following JSON:

```json
{
  "user_name": "Alice",
  "email": "alice@example.com",
  "age": 25
}
```

1. Design a **whitelist-based** (allowlist) validation strategy for each field. Specify: allowed characters, length limits, format constraints, and type checks.
2. A colleague proposes **blacklist-based** validation instead — blocking known-bad characters like `<`, `>`, `'`, `"`. Give a **concrete bypass example** that defeats this blacklist (e.g., encoding tricks, Unicode normalization).
3. Explain why whitelisting is fundamentally more secure than blacklisting. How does this relate to the Saltzer & Schroeder principle of **economy of mechanism**?
4. What is the **"input chokepoint" pattern**? How does centralizing validation at a single entry point reduce the attack surface?

---

## Part 5: DevSecOps

### Q9: Pipeline Design

You are the DevSecOps engineer for a **microservices architecture** (12 services, CI/CD with GitHub Actions, deploying to Kubernetes).

Design a security pipeline by specifying which tools run at each stage:

| Stage | Tools/Checks | Max Time Budget |
|-------|-------------|-----------------|
| IDE (developer workstation) | ? | Instant feedback |
| Pre-commit | ? | < 30 seconds |
| Build (CI) | ? | < 5 minutes |
| Test (CI) | ? | < 15 minutes |
| Deploy (CD) | ? | < 2 minutes |
| Operate (production) | ? | Continuous |

(a) Rangnau 2020 measured that DAST adds **~14 minutes** to the pipeline. Where in your pipeline does DAST fit, and how do you prevent it from blocking deployments?
(b) Rajapakse 2021 found only **~30% effectiveness** for automated security tools. With 12 services generating alerts, how do you handle **false positives** without creating alert fatigue?
(c) What is the "shift-left" trade-off? Why can't ALL security testing shift to the IDE stage?

---

### Q10: Supply Chain Security

Williams 2025 identifies **3 attack vectors** in software supply chains: dependencies, build infrastructure, and humans.

For each vector, a real-world case demonstrates the threat:

| Vector | Case | Year |
|--------|------|------|
| Dependencies | Log4Shell | 2021 |
| Build infrastructure | SolarWinds | 2020 |
| Humans (social engineering) | XZ Utils | 2024 |

For each case:
(a) Explain **how the attack worked** — what was the entry point, how did it propagate, and what was the impact?
(b) Name **one specific countermeasure** that would have detected or prevented the attack
(c) Explain how **SBOMs** (Software Bills of Materials) help with this attack vector — or explain their limitations if SBOMs would not have helped

---

## Part 6: Integration

### Q11: CVSS Analysis — Prioritizing Patches

A vulnerability in your company's web framework receives the following CVSS v3.1 scores:

**Base Score: 8.1 (High)**
`AV:N / AC:H / PR:N / UI:N / S:U / C:H / I:H / A:H`

**Temporal Score: 6.2**
- Exploit Code Maturity: Unproven
- Remediation Level: Official Fix available
- Report Confidence: Confirmed

**Environmental Score: 4.0**
- The affected component handles only **public, non-sensitive data**
- The system is behind a WAF with rate limiting

(a) Explain what each **metric group** (Base, Temporal, Environmental) tells you and why the score drops from 8.1 → 6.2 → 4.0.
(b) Based on these scores, should you **patch immediately** (emergency change) or **schedule for next sprint** (2 weeks)? Justify your decision.
(c) Compare with **Log4Shell** (CVSS Base 10.0, `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`). Both vulnerabilities are "network accessible" — why was Log4Shell vastly more urgent? Identify at least 3 specific CVSS metric differences.

---

### Q12: Comprehensive Case Analysis — Security Architect Challenge

You are the **security architect** for a fintech company processing $2M in daily transactions. A penetration test reveals three findings:

1. **SQL injection** in the payment API (CVSS 9.8) — parameterized queries not used in 3 endpoints
2. **Vulnerable Log4j dependency** (v2.14.1) in the logging service — known RCE exploit available
3. **No threat model** exists for the authentication and authorization flow

Using the lecture's frameworks, create a **remediation plan** with three horizons:

**Immediate (this week):**
- Which finding do you fix first and why? (Consider CVSS scores, exploit availability, blast radius)
- What emergency mitigations can you deploy before the code fix is ready?

**Short-term (this quarter):**
- How do you integrate security into the SDLC to prevent recurrence?
- Which DevSecOps tools would catch each of the 3 findings automatically?
- How do you address the <1% security comment rate in code reviews (Yu 2023)?

**Long-term (this year):**
- Design the threat modeling program: which method, what cadence, who participates?
- How do you implement supply chain security (SBOMs, dependency scanning, build verification)?
- Reference at least **3 specific frameworks or methods** from the lecture in your plan

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Fault-Error-Failure in security (Avizienis 2004) | Q1 |
| Finding vs preventing, McGraw 50/50, 4 means | Q2 |
| SAST/DAST/SCA trade-offs (Rice's Theorem) | Q3 |
| Code review + fuzzing combined strategy | Q4 |
| STRIDE threat modeling | Q5 |
| STRIDE vs PASTA vs LINDDUN, maturity model | Q6 |
| Saltzer & Schroeder principles, breach analysis | Q7 |
| Input validation, whitelisting vs blacklisting | Q8 |
| DevSecOps pipeline design | Q9 |
| Supply chain security (dependencies, build, humans) | Q10 |
| CVSS v3.1 analysis and prioritization | Q11 |
| Comprehensive security architecture planning | Q12 |
