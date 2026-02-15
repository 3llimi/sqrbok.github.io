---
title: "Study Notes: Exploratory Testing & Operational Profile"
parent: Exploratory Testing
nav_order: 99
layout: default
---

# Study Notes: Exploratory Testing & Operational Profile

## Purpose
These study notes cover two complementary testing approaches: **exploratory testing** (qualitative, human-driven discovery) and **operational profile-based testing** (quantitative, usage-driven prioritization). The lecture traces ET from its definition through structured heuristics and empirical evidence, then connects it to operational profiles — from Musa's foundational work (1993) through modern developments like operational coverage and Android Cloud Profiles.

**Primary Sources:**
- Musa 1993, Operational Profiles in Software-Reliability Engineering {% cite musa1993operational %}
- Whittaker 2009, Exploratory Software Testing {% cite whittaker2009exploratory %}
- Hendrickson 2013, Explore It! {% cite hendrickson2013explore %}

**Key Research Papers:**
- Itkonen & Mantyla 2007, 2014: ET vs. scripted testing experiments {% cite itkonen2007defect itkonen2014testcases %}
- Afzal et al. 2015: Equal-time ET experiment {% cite afzal2015experiment %}
- Ghazi et al. 2017: Five levels of exploration {% cite ghazi2017levels ghazi2017decision %}
- Miranda & Bertolino 2016, 2018: Operational coverage {% cite miranda2016stopping miranda2018coverage %}
- Bleier et al. 2025: Android Cloud Profiles {% cite bleier2025profile %}

---

## Part 1: Opening — Two Approaches, One Goal

### 1.1 Testing What Matters

Both ET and operational profiles share a common goal: **test what matters most to users**. They differ in approach:

| Aspect | Scripted Testing | Exploratory Testing | Operational Profile |
|--------|------------------|---------------------|---------------------|
| **Approach** | Pre-designed test cases | Simultaneous design & execution | Tests proportional to usage |
| **Best for** | Regression, coverage metrics | Discovery, edge cases | Reliability prediction |
| **Repeatability** | High | Lower | High |
| **Documentation** | Upfront (test plans) | Session reports | Quantitative (rates, probabilities) |

### 1.2 The SRE Context

Operational profile is **Step 2 of 5** in the Software Reliability Engineering process {% cite musa1993operational %}:

1. Define the product
2. **Develop operational profiles**
3. Establish reliability objectives
4. Plan and execute tests
5. Apply test results

{: .highlight }
> **Exam Tip:** Know where operational profile sits in the SRE 5-step process (Step 2). The profile feeds test planning (Step 4) — without it, test allocation is guesswork.

---

## Part 2: Exploratory Testing

### 2.1 What is Exploratory Testing?

Exploratory testing is **simultaneous learning, test design, and test execution** {% cite itkonen2005exploratory %}. The tester observes the system, forms hypotheses, and tests them immediately.

Key characteristics:
- **Not ad-hoc:** ET uses charters, heuristics, and sessions for structure
- **Cognitive engagement:** The tester's thinking drives test design in real time
- **Feedback-driven:** Each test result informs the next test

> "The result of each test leads you to design the next" — Elisabeth Hendrickson {% cite hendrickson2013explore %}

### 2.2 ET in Practice — The Coupon Example

An exploratory tester with the charter *"Explore the coupon system using unusual input combinations to discover pricing errors"* discovers in a 90-minute session:

| # | Action | Bug Found |
|---|--------|-----------|
| 1 | Apply coupon twice | Discount doubles |
| 2 | Coupon on sale item | Price goes negative |
| 3 | Apply coupon, then remove items | Discount stays, subtotal < 0 |
| 4 | Two browser tabs, different coupons | Both coupons apply |

None of these bugs were in any test plan.

{: .highlight }
> **Exam Tip:** Be able to explain the coupon example. It illustrates how ET finds bugs that no script anticipated — through real-time reasoning.

### 2.3 Hendrickson's Heuristics

**Charter template:** Every session begins with a charter:

> **Explore** [target] **using** [resources] **to discover** [information]

**Core heuristics:**

| Heuristic | What to Try | Example |
|-----------|-------------|---------|
| **None, Some, All** | Empty, partial, full sets | Permissions: none → admin access bug? |
| **Too Big, Too Small, Just Right** | Size extremes (Goldilocks) | Image upload: 3 MB, empty, 50 KB |
| **Beginning, Middle, End** | Position variations | Edit at start/middle/end of line |
| **Zero, One, Many** | Count variations | Invoices with 0, 1, 100 items |
| **CRUD** | All data operations | Create, Read, Update, Delete each entity |
| **Command Injection** | Malicious input | Single quote in search → SQL error? |
| **Data Type Attacks** | Type boundaries | Feb 30, 13:75, 2^32+1 |

**The Nightmare Headline Game:** Ask *"What would be the worst headline if this software fails?"* {% cite hendrickson2013explore %}

### 2.4 Session-Based Test Management (SBTM)

**The four pillars** {% cite bach2000session %}:

| Pillar | Details |
|--------|---------|
| **Charter** | What to explore, how, and what problems to seek |
| **Time Box** | 60-120 minutes |
| **Reviewable Result** | Bug reports, coverage notes, issues |
| **Debriefing** | Post-session review with manager/team |

**Debriefing questions:** How did you spend your time? What did you find? Did you need special knowledge? Is there more to do?

{: .highlight }
> **Exam Tip:** Know the four SBTM pillars (Charter, Time Box, Reviewable Result, Debriefing) and the debriefing questions.

### 2.5 Whittaker's Tourist Metaphor — Five Districts

James Whittaker organizes exploration using a tourist metaphor {% cite whittaker2009exploratory %}:

| District | Focus | Key Tours |
|----------|-------|-----------|
| **Business** | Features users rely on daily | Guidebook Tour, Money Tour |
| **Historical** | Legacy code and old features | Bad Neighborhood Tour, Museum Tour |
| **Entertainment** | Fun, unusual inputs | Obsessive-Compulsive Tour, Antisocial Tour |
| **Tourist** | First-time user experience | Collector's Tour, Supermodel Tour |
| **Hotel** | Background processes | All-Nighter Tour, TOGOF |

### 2.6 Five Levels of Exploration

ET and scripted testing form a spectrum {% cite ghazi2017levels %}:

| Level | Tester Receives | Example |
|-------|----------------|---------|
| **1. Freestyle** | Only the test object | "Here's our app. Find problems." |
| **2. High exploration** | Charter with goals | "Explore attachments for security issues." |
| **3. Medium** | Charter + starting points | "Try PDFs > 10 MB, ZIP files, Unicode names." |
| **4. Low exploration** | Detailed activities | "Upload PDF, upload ZIP, upload while offline." |
| **5. Fully scripted** | Steps + expected results | "Step 1: Click Attach. Step 2: Select file. Expected: success." |

**Industrial finding:** Ericsson used 80% scripted / 20% ET; the evidence-based recommendation was **~57% exploratory** {% cite ghazi2017decision %}.

{: .highlight }
> **Exam Tip:** Know the five levels and concrete examples. The "right" level depends on context (finding new defects → higher; regulatory → lower).

### 2.7 Empirical Evidence for ET

| Study | ET Defects | Scripted Defects | ET Hours | Scripted Hours |
|-------|-----------|-----------------|---------|---------------|
| Itkonen 2007 (n=79) | 7.04 | 6.37 (n.s.) | 1.5 | 8.5 |
| Itkonen 2014 (n=51) | 5.47 | 6.06 (n.s.) | 4.58 | 19.47 |
| Afzal 2015 (n=70) | 8.34 | 1.83 (p<0.001) | 1.5 | 1.5 (equal time) |

**Key findings** {% cite itkonen2007defect itkonen2014testcases afzal2015experiment %}:
1. ET matches scripted testing in defect detection
2. ET is **4-6x more efficient** when total effort is counted (d=1.33)
3. ET finds **380% more usability defects**
4. Scripted testing produces **2x more false positives**
5. Equal time → ET finds **4.6x more defects** (d=2.065)

**Industrial adoption:** 88% of professionals use ET {% cite pfahl2014survey %}.

---

## Part 3: Operational Profile Definition

### 3.1 What is an Operational Profile?

> "Set of operations with occurrence probabilities — quantitative characterization of how the system will be used" {% cite musa1993operational %}

**Example (telephone switch):**

| Operation | Rate/hr | Probability |
|-----------|---------|-------------|
| Add call | 10,000 | 0.500 |
| Query call | 4,000 | 0.200 |
| Edit call | 3,000 | 0.150 |
| Remove call | 3,000 | 0.150 |
| **Total** | **20,000** | **1.000** |

### 3.2 Operations, Functions, and Runs

| Concept | Perspective | Example |
|---------|-------------|---------|
| **Function** | User (requirements) | "Relocate telephone" |
| **Operation** | Design (development) | "Removal" + "Install" |
| **Run** | Smallest unit | Single "removal" execution |

### 3.3 Operational Modes

The same operation may have different probabilities in different contexts {% cite musa1993operational %}:

| Factor | Example Modes |
|--------|---------------|
| **Time** | Peak, Prime, Off |
| **User type** | Customer, Admin, System |
| **Experience** | Novice, Expert |
| **Capability** | Full, Degraded, Maintenance |
| **Criticality** | Normal, Emergency, Shutdown |

{: .highlight }
> **Exam Tip:** An operational mode is not just "who uses the system" — it includes time, capability, and criticality.

---

## Part 4: Developing Operational Profiles

### 4.1 The 6-Step Procedure

Musa defines a six-step procedure {% cite musa1999software %}:

| Step | Action | Key Question |
|------|--------|-------------|
| 1 | **Determine operational modes** | What distinct usage patterns exist? |
| 2 | **Identify initiators** | Who or what triggers operations? |
| 3 | **Select representation** | Tabular or graphical? |
| 4 | **Create operations list** | What operations exist in each mode? |
| 5 | **Determine occurrence rates** | How often does each operation occur? |
| 6 | **Calculate probabilities** | Normalize: sum = 1.0 |

**Cost:** ~1 staff-month for an average project (10 developers, 100 KLOC) {% cite musa1993operational %}.

### 4.2 From Rates to Probabilities

$$P(\text{operation}) = \frac{\text{Rate(operation)}}{\text{Sum(all rates)}}$$

**Sources** (in order of quality): Field data → System logs → Surveys → Expert estimate → Best guess.

{: .highlight }
> **Exam Tip:** Know the probability formula. Be able to calculate probabilities given occurrence rates. Probabilities must sum to 1.0.

---

## Part 5: Evidence & Modern OP Approaches

### 5.1 Industrial Evidence

| Organization | Result |
|--------------|--------|
| **AT&T Definity PBX** | 10x customer problem reduction, test cycle halved |
| **Hewlett-Packard** | ≥50% test time and cost reduction |

**Cost-benefit:** OP costs ~1 staff-month. With ≥50% test savings, the ROI exceeds 10:1 {% cite musa1993operational %}.

### 5.2 Operational Coverage

Traditional coverage treats all code equally. **Operational coverage** weights code by usage {% cite miranda2016stopping %}:

**Worked example:**

| Method | Branches | Covered | Usage |
|--------|----------|---------|-------|
| `login()` | 4 | 3 | 50% |
| `search()` | 6 | 2 | 30% |
| `checkout()` | 4 | 4 | 15% |
| `adminPanel()` | 6 | 0 | 5% |

**Traditional:** (3+2+4+0)/20 = **45%**
**Operational:** (3/4)×0.50 + (2/6)×0.30 + (4/4)×0.15 + (0/6)×0.05 = **62.5%**

Operational coverage outperforms traditional in **8 of 9 cases** (p<2.2e-16) {% cite miranda2016stopping miranda2018coverage %}.

{: .highlight }
> **Exam Tip:** Know the operational coverage formula (weighted sum) and be able to calculate it.

### 5.3 Android Cloud Profiles

Bleier et al. (2025) discovered that operational profiles can be obtained **for free** from production telemetry {% cite bleier2025profile %}:

| Metric | Value |
|--------|-------|
| **Availability** | 99.89% of top-1000 Android apps |
| **Average profile size** | 7.88% of total methods |
| **Coverage ceiling** | No automated tool exceeds 70% profile coverage |

**Key findings:**
- Cloud Profiles are **not** strict supersets of developer Baseline Profiles
- Monkey (random) outperformed model-based tools: 37.45% vs. 32.51%
- ~30% of user-relevant behavior requires **human exploration**

### 5.4 The OP↔ET Bridge — Two-Phase Testing Strategy

**Phase 1 — Quantitative (OP):**
1. Build operational profile from usage data
2. Generate tests proportional to usage frequency
3. Measure operational coverage
4. Continue until saturation (~70%)

**Phase 2 — Qualitative (ET):**
1. Use OP priorities to guide charters
2. Apply heuristics and tours to high-priority features
3. Find usability, edge-case, and interaction defects
4. Convert findings to scripted regression tests

{: .highlight }
> **Exam Tip:** Know the two-phase strategy. OP first (quantitative) → ET second (qualitative) → convert findings to scripted tests. The saturation point (~70%) triggers the switch.

---

## Part 6: Summary — Key Takeaways

| # | Takeaway |
|---|----------|
| 1 | **Exploratory testing** = learn, design, execute simultaneously — **4-6x more efficient** than scripted |
| 2 | **Session-based management** makes ET auditable: charter + time box + debriefing |
| 3 | **Five levels of exploration** from freestyle to fully scripted — choose per context |
| 4 | **Operational profile** = operations + occurrence probabilities — quantifies usage |
| 5 | **6-step procedure:** Modes → Initiators → Representation → List → Rates → Probabilities |
| 6 | **Industrial evidence:** AT&T 10x improvement, HP 50% cost savings |
| 7 | **Operational coverage** weights code by usage (62.5% vs. 45% in worked example) |
| 8 | **Two-phase strategy:** When OP saturates (~70%) → switch to ET for the remaining 30% |

**Key formulas:**

$$P(\text{op}) = \frac{\text{Rate(op)}}{\text{Total Rate}}$$

$$\text{OpCov} = \sum_i \frac{\text{covered}_i}{\text{total}_i} \times \text{usage}_i$$

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
