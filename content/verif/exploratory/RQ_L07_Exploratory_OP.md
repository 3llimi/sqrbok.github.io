---
title: "Revision Questions: Exploratory Testing & OP"
parent: Exploratory Testing
nav_order: 100
layout: default
---

# Exploratory Testing & Operational Profile — Revision Questions (L07)

**Format:** Explain in your own words, give brief examples

---

## Part 1: Opening — ET + OP Overview

### Q1: What is the fundamental difference between exploratory testing and operational profile-based testing?

<details><summary>Answer</summary>

They address testing from complementary perspectives:

| Dimension | Exploratory Testing | Operational Profile |
|-----------|---------------------|---------------------|
| **Approach** | Qualitative — tester designs and executes simultaneously | Quantitative — tests allocated proportional to usage |
| **Goal** | Discover unknown defects, edge cases | Maximize reliability relative to actual usage |
| **Input** | Tester's cognitive engagement and domain knowledge | Usage data (frequencies, rates) |
| **Output** | Session reports, bug discoveries | Probability-weighted test suites |

Both share the principle of **testing what matters to users** — ET through human judgment, OP through usage data {% cite musa1993operational whittaker2009exploratory %}.
</details>

### Q2: Why does the lecture say "scripted + exploratory = coverage"?

<details><summary>Answer</summary>

Scripted and exploratory testing find **different types of defects** {% cite itkonen2007defect %}:

- **Scripted testing:** Systematic coverage, regression detection, traceability to requirements
- **Exploratory testing:** Usability defects (380% more), GUI defects (143% more), edge cases, unknown unknowns

Neither alone provides complete coverage. Using both, especially guided by an operational profile for prioritization, provides the most complete testing strategy.
</details>

---

## Part 2: Exploratory Testing

### Q3: How does exploratory testing differ from ad-hoc testing?

<details><summary>Answer</summary>

| Aspect | Ad-Hoc Testing | Exploratory Testing |
|--------|----------------|---------------------|
| **Planning** | None | Charter, goals, heuristics |
| **Structure** | Random, unguided | Structured by techniques and sessions |
| **Documentation** | None | Session notes, defect logs, debriefings |
| **Reproducibility** | Low | Medium (via session reports) |

ET operates within predefined parameters — charters direct the session, heuristics guide exploration, and debriefings capture results {% cite kaner2002lessons pfahl2014survey %}.
</details>

### Q4: Explain the coupon system example. Why couldn't scripted testing find those bugs?

<details><summary>Answer</summary>

The tester discovered four bugs through real-time reasoning:

1. **Apply coupon twice** → discount doubles (state not cleared)
2. **Coupon on sale item** → negative price (stacking not handled)
3. **Apply coupon, remove items** → discount persists with negative subtotal
4. **Two browser tabs, different coupons** → both apply (race condition)

Scripted testing couldn't find these because each bug requires **reasoning about system state** — the tester observes one result and immediately asks "what if?" Writing test cases for these requires already suspecting the bug exists {% cite hendrickson2013explore %}.
</details>

### Q5: What is a charter and why is it important for exploratory testing?

<details><summary>Answer</summary>

A charter is a brief statement directing a session's focus {% cite hendrickson2013explore %}:

> **Explore** [target] **using** [resources] **to discover** [information]

The charter provides **direction** without constraining freedom, defines **scope**, enables **accountability**, and makes ET **auditable** through session-based test management {% cite bach2000session %}.
</details>

### Q6: Describe three of Hendrickson's heuristics and give an example for each.

<details><summary>Answer</summary>

**1. Goldilocks (Too Big, Too Small, Just Right):** Test size extremes.
- *Example:* File upload — 0 KB, 5 GB, 500 KB.

**2. CRUD (Create, Read, Update, Delete):** Test every data lifecycle operation.
- *Example:* User account — create, read profile, update email, delete. Can you still log in after deletion?

**3. Interruptions:** Cancel, back, or timeout mid-operation.
- *Example:* Start file upload, close browser tab. Is a partial file saved? {% cite hendrickson2013explore %}
</details>

### Q7: Explain Session-Based Test Management. Why was it created?

<details><summary>Answer</summary>

SBTM solves the **accountability problem** in ET {% cite bach2000session %}:

**Four pillars:** Charter, Time Box (60-120 min), Reviewable Result, Debriefing.

**Metrics:** Number of sessions, total time, bugs found, bugs in backlog.

SBTM provides structure comparable to scripted testing while preserving the tester's freedom to follow discoveries.
</details>

### Q8: What are Whittaker's five districts and what does each focus on?

<details><summary>Answer</summary>

Whittaker organizes exploration using a tourist metaphor {% cite whittaker2009exploratory %}:

| District | Focus | Example Tours |
|----------|-------|---------------|
| **Business** | Daily features | Guidebook, Money Tour |
| **Historical** | Legacy code | Bad Neighborhood, Museum Tour |
| **Entertainment** | Unusual inputs | Antisocial, Obsessive-Compulsive Tour |
| **Tourist** | First-time experience | Collector's, Supermodel Tour |
| **Hotel** | Background processes | All-Nighter, TOGOF Tour |
</details>

### Q9: Describe the five levels of exploration. When should you use each?

<details><summary>Answer</summary>

{% cite ghazi2017levels %}:

| Level | Best For |
|-------|----------|
| **1. Freestyle** | Unknown unknowns, creative exploration |
| **2. High exploration** | Defect detection under time pressure |
| **3. Medium** | Balanced coverage and exploration |
| **4. Low exploration** | Traceability, novice testers |
| **5. Fully scripted** | Conformance, regulatory requirements |

Decision: Higher exploration when finding new defects; lower when reproducibility needed {% cite ghazi2017decision %}.
</details>

### Q10: Summarize the empirical evidence for ET effectiveness.

<details><summary>Answer</summary>

Across controlled experiments {% cite itkonen2007defect itkonen2014testcases afzal2015experiment %}:

1. **ET matches scripted testing in defect detection** — no significant difference in most experiments
2. **ET is 4-6x more efficient** when total effort is counted (d=1.33)
3. **ET finds 380% more usability defects**
4. **Scripted testing produces 2x more false positives**
5. **Equal time → ET finds 4.6x more defects** (d=2.065)

**Industrial adoption:** 88% of professionals use ET {% cite pfahl2014survey %}.
</details>

### Q11: A manager says "ET is just ad-hoc testing." How would you respond with evidence?

<details><summary>Answer</summary>

1. **Structure:** ET uses charters, time boxes, debriefings, and session metrics {% cite bach2000session %}
2. **Empirical results:** ET matches scripted testing in defects and is 4-6x more efficient {% cite itkonen2014testcases %}. Largest effect size: d=2.065 {% cite afzal2015experiment %}
3. **Industry adoption:** 88% of professionals use ET {% cite pfahl2014survey %}, including safety-critical (48%) and security-critical (64%) software
</details>

### Q12: Why does ET achieve lower coverage but comparable defect counts?

<details><summary>Answer</summary>

1. **Coverage ≠ defect detection.** Scripted testing covers "easy" paths; ET explores **gaps between specifications** {% cite shah2014hybrid %}
2. **ET leverages human intelligence.** Testers allocate effort to **high-risk areas** — an implicit risk-based profile {% cite itkonen2013knowledge %}

Resolution: Use ET for discovery, convert findings to scripted tests for regression.
</details>

---

## Part 3: Operational Profile Definition

### Q13: What is an operational profile? Give a concrete example.

<details><summary>Answer</summary>

A **set of operations with their occurrence probabilities** {% cite musa1993operational %}.

**Example (ATM):**

| Operation | Rate/hr | Probability |
|-----------|---------|-------------|
| Cash withdrawal | 500 | 0.50 |
| Balance inquiry | 200 | 0.20 |
| Deposit | 150 | 0.15 |
| Transfer | 100 | 0.10 |
| PIN change | 50 | 0.05 |
| **Total** | **1,000** | **1.00** |

Testing should be proportional — 50% on withdrawals, 5% on PIN changes.
</details>

### Q14: Explain the difference between a function, an operation, and a run.

<details><summary>Answer</summary>

| Concept | Perspective | Example |
|---------|-------------|---------|
| **Function** | User | "Relocate telephone" |
| **Operation** | Developer | "Removal" + "Install" |
| **Run** | Execution | Single "removal" execution |

Users think in functions; developers implement operations; testers execute runs {% cite musa1993operational %}.
</details>

### Q15: What is an operational mode? Give three examples.

<details><summary>Answer</summary>

A **distinct pattern of use or environmental conditions** requiring separate testing {% cite musa1993operational %}:

1. **Time of day:** Black Friday (checkout 30%) vs. off-peak (checkout 5%)
2. **User type:** Admin (bulk operations) vs. regular user
3. **System capability:** Normal vs. Emergency Shutdown

Same software, same operations — but different profiles per mode.
</details>

### Q16: Why must operational profile probabilities sum to 1.0?

<details><summary>Answer</summary>

Ensures the profile is **complete and mutually exclusive** {% cite musa1993operational %}:

- **Sum > 1.0:** Operations overlap — double-counting inflates testing effort
- **Sum < 1.0:** Operations missing — some user behavior untested (more dangerous)

The normalization step (rate/total) guarantees sum = 1.0.
</details>

---

## Part 4: Developing Operational Profiles

### Q17: Walk through the 6-step OP procedure using a university enrollment system.

<details><summary>Answer</summary>

{% cite musa1999software %}:

1. **Modes:** Registration period, Regular semester, Grade posting
2. **Initiators:** Students, Faculty, System (batch processing)
3. **Representation:** Tabular (independent operations)
4. **Operations:** Browse courses, Search, Enroll, Drop, View schedule, etc.
5. **Rates:** Browse 5,000/hr, Search 3,000/hr, Enroll 800/hr...
6. **Probabilities:** P(Browse) = 5000/12000 = 0.417

Result: 42% of testing on course browsing — may surprise stakeholders who assume enrollment is primary.
</details>

### Q18: When should you use tabular vs. graphical representation?

<details><summary>Answer</summary>

**Tabular:** Independent operations (ATM operations).
**Graphical/tree:** Dependent attributes (User Type → Warranty → Security Level) {% cite musa1999software %}.

Test: "Does knowing X change the probability of Y?" If yes, use graphical. Both are interconvertible.
</details>

### Q19: Calculate the operational profile for this system:

GET /users: 4,000/hr; POST /orders: 2,500/hr; GET /products: 3,000/hr; PUT /users: 500/hr.

<details><summary>Answer</summary>

Total = 10,000/hr

| Operation | Rate/hr | Probability |
|-----------|---------|-------------|
| GET /users | 4,000 | **0.400** |
| GET /products | 3,000 | **0.300** |
| POST /orders | 2,500 | **0.250** |
| PUT /users | 500 | **0.050** |
| **Total** | **10,000** | **1.000** |

40% of tests on GET /users; only 5% on PUT /users {% cite musa1993operational %}.
</details>

---

## Part 5: Evidence & Modern OP

### Q20: What were the results of OP adoption at AT&T and HP?

<details><summary>Answer</summary>

**AT&T Definity PBX** {% cite musa1993operational %}: 10x customer problem reduction, test cycle halved.
**HP** {% cite musa1993operational %}: ≥50% test time and cost reduction.

OP costs ~1 staff-month (10-dev, 100 KLOC). With ≥50% savings, **ROI exceeds 10:1**.
</details>

### Q21: Explain operational coverage with a worked example.

<details><summary>Answer</summary>

**Traditional:** (3+2+4+0)/20 = **45%**
**Operational:** (3/4)×0.50 + (2/6)×0.30 + (4/4)×0.15 + (0/6)×0.05 = **62.5%**

The uncovered `adminPanel()` has only 5% usage weight. Operational coverage outperforms traditional in **8 of 9 cases** (p<2.2e-16) {% cite miranda2016stopping miranda2018coverage %}.
</details>

### Q22: What are Android Cloud Profiles and why do they matter?

<details><summary>Answer</summary>

Operational profiles obtained **for free** from production telemetry {% cite bleier2025profile %}:

- 99.89% of top-1000 apps have Cloud Profiles
- Users exercise only 7.88% of total methods
- No automated tool exceeds 70% profile coverage
- Cloud Profiles diverge from developer expectations — users do unexpected things
</details>

### Q23: Why do OP and ET complement each other? Explain the "saturation handoff."

<details><summary>Answer</summary>

| OP Testing | ET |
|------------|-----|
| Finds reliability failures ∝ usage | Finds usability, edge-case defects |
| Saturates at ~70% profile coverage | Saturates at tester fatigue |

**Handoff:** When OP testing reaches ~70% coverage, growth plateaus. Switch to ET — guided by OP priorities — for the remaining 30% {% cite bertolino2017adaptive bleier2025profile %}.
</details>

### Q24: Describe the two-phase testing strategy. Why should OP come first?

<details><summary>Answer</summary>

**Phase 1 (OP):** Build profile → test proportionally → measure operational coverage → continue to ~70%.
**Phase 2 (ET):** Use OP priorities for charters → apply heuristics → find edge cases → convert to regression tests.

OP first because it maximizes **reliability improvement per test hour**. When coverage plateaus, ET discovers the defects OP cannot find {% cite bertolino2017adaptive %}.
</details>

---

## Cross-Cutting Questions

### Q25: A startup has limited testing time. Should they build an OP or train testers in ET?

<details><summary>Answer</summary>

**Choose ET first** — no upfront data needed, works when specs are incomplete, finds diverse defects immediately {% cite hendrickson2013explore %}.

As the product matures and gains users, **add OP** from analytics/telemetry (potentially free, as Cloud Profiles demonstrate {% cite bleier2025profile %}). Use OP data to prioritize ET sessions.

The progression: start with more exploration, add structure as the product stabilizes {% cite ghazi2017levels %}.
</details>

### Q26: Compare the accountability mechanisms of SBTM and operational profiles.

<details><summary>Answer</summary>

| Dimension | SBTM | Operational Profile |
|-----------|------|---------------------|
| **Tracks** | Sessions, time, bugs, areas | Operations, probabilities, allocation |
| **Progress** | Sessions completed, bugs found | Operational coverage achieved |
| **Stopping** | Charter complete within time box | Coverage target reached (~70%+) |
| **Answers** | "What was tested and found?" | "Is testing proportional to usage?" |

Both solve "how do we know testing is adequate?" through different lenses {% cite bach2000session musa1993operational %}.
</details>

### Q27: Design a testing strategy for a banking mobile app using both OP and ET.

<details><summary>Answer</summary>

**Phase 1 — OP:** From logs: Balance check 40%, Transfer 25%, Bill pay 15%, Settings 10%, Loan 5%, Investment 5%. Test proportionally. Measure operational coverage to ~70%.

**Phase 2 — ET:**

| Charter | Tour | Why ET |
|---------|------|--------|
| "Explore transfers with boundary amounts" | Money Tour | Financial precision |
| "Explore bill pay during network interruptions" | Saboteur Tour | Connectivity edge cases |
| "Explore loan application with extreme values" | Antisocial Tour | High-stakes, low-usage |
| "Explore settings while changing language" | Collector's Tour | Usability/state management |

Convert findings to regression tests for future releases {% cite whittaker2009exploratory %}.
</details>

### Q28: Why does operational coverage give a more useful signal than traditional coverage?

<details><summary>Answer</summary>

Traditional coverage treats all code equally. For **reliability**, this is misleading:

1. A bug in login (50% usage) affects 10x more users than admin panel (5%) {% cite miranda2016stopping %}
2. Better reliability correlation (τ=0.45 vs. τ=0.39)
3. More meaningful stopping rule: "87% operational coverage" means user-relevant behavior is tested
4. Smaller, more effective test suites in 8 of 9 cases (p<2.2e-16) {% cite miranda2018coverage %}
</details>

### Q29: Explain how Android Cloud Profiles validate "you cannot assume how users will use your software."

<details><summary>Answer</summary>

{% cite bleier2025profile %}:

1. Users exercise only **7.88%** of total methods
2. Cloud Profiles are **NOT supersets** of developer Baseline Profiles — user behavior diverges from expectations
3. Candy Crush: 2.22% method coverage but 21.39% profile coverage — structure metrics mislead
4. No automated tool exceeds 70% — ~30% requires **human exploration**

This validates Musa's premise: building without understanding usage leads to misallocated testing {% cite musa1993operational %}.
</details>

### Q30: Explain the entire L07 lecture in 5 minutes.

<details><summary>Answer</summary>

Two complementary approaches: **ET** and **OP**.

**Exploratory testing** means designing and executing tests simultaneously. Uses charters, heuristics (CRUD, Goldilocks), and Whittaker's tours. Sessions are time-boxed (60-120 min) with debriefings. Evidence: **4-6x more efficient** than scripted, used by 88% of professionals {% cite itkonen2014testcases pfahl2014survey %}.

**Operational profiles** quantify usage — each operation gets a probability, tests allocated proportionally. Musa's 6 steps: modes → initiators → representation → operations → rates → probabilities. AT&T saw **10x improvement**, HP cut costs **50%** {% cite musa1993operational %}. Modern: **operational coverage** weights code by usage, **Cloud Profiles** provide free OPs {% cite bleier2025profile %}.

**The bridge:** OP saturates at ~70% → switch to ET for the remaining 30%. OP finds reliability failures; ET finds usability and edge-case defects. Together: quantitative first, then qualitative {% cite bertolino2017adaptive %}.
</details>

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
