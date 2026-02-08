---
title: Industrial Evidence
parent: Combinatorial Testing
nav_order: 6
layout: default
---

# Industrial Evidence & ROI

Combinatorial testing has been validated in industrial settings across multiple domains. This page presents quantitative evidence from case studies, demonstrating both fault detection improvements and cost savings.

---

## Summary of Quantitative Benefits

| Metric | CT Result | Traditional | Source |
|--------|-----------|-------------|--------|
| Multi-factor fault detection | **93.3%** | 6.7% | Hu 2020 |
| Single-factor fault detection | **89.3%** | 71.4% | Hu 2020 |
| Defect detection rate | **100%** (22/22) | 81.8% (18/22) | Daoud 2025 |
| Test execution time | **48% reduction** (394h → 205h) | baseline | Daoud 2025 |
| Defect detection time | **33% faster** (5.11h → 3.45h) | baseline | Daoud 2025 |
| 3-way extra faults found | 6 defects | 0 (2-way missed) | Bures 2017 |
| AV test generation | **319 pairwise tests** | physically infeasible | Tao 2019 |

---

## Case Study: Five Industrial Systems (Hu 2020)

Hu et al. {% cite hu2020realworld %} collaborated with four companies to evaluate CT on five real industrial systems — the largest empirical CT study to date.

### Systems Tested

| System | Domain | Parameters | Tests |
|--------|--------|-----------|-------|
| Chinese calligraphy software | Desktop | Multiple | 2-way |
| IoT water flow controller | Embedded | Multiple | 2-way |
| ETL sales system | Enterprise | Multiple | 2-way |
| Locomotive dashboard | Embedded | Multiple | 2-way |
| Linux file manager | Desktop | Multiple | 2-way |

### Results

All systems used ACTS with IPOG to generate 2-way test suites. CT was compared against each company's in-house testing approach.

**Multi-factor faults:** CT detected **93.3%** of faults involving multiple parameter interactions. In-house teams detected only **6.7%** — missing almost all interaction faults.

**Single-factor faults:** CT still outperformed, detecting **89.3%** vs. 71.4% for in-house teams. A technique of randomizing values within partitions helped catch 8 additional single-factor faults.

**Key insight:** In-house testing, based on experience and intuition, systematically misses multi-factor faults. CT provides the systematic coverage that intuition cannot {% cite hu2020realworld %}.

---

## Case Study: Tricentis ServiceNow (Daoud 2025)

Daoud et al. {% cite daoud2025effectiveness %} conducted an industrial case study at Tricentis, evaluating CT on their Test Automation for ServiceNow (TTA-SNOW) product.

### Study Design

Two optimization areas:
1. **Form input optimization:** Incident form (9 params, 25 values) and Suite form (10 params, 25 values)
2. **System configuration optimization:** OS × Browser × SUT version combinations

Used ACTS v3.2 with IPOG. Compared 2-way and mixed-strength arrays against original ad-hoc test suites. Critically, the study used **real historical defects**, not mutations.

### Results

| Metric | CIT (2-way) | CIT (mixed) | Ad-hoc (original) |
|--------|-------------|-------------|---------------------|
| Defects detected | **22/22 (100%)** | 21/22 (95.5%) | 18/22 (81.8%) |
| Suite form size | 18-27% smaller | — | baseline |
| Testing time | 34-40% less | — | baseline |
| Config execution time | **205 hours** | — | 394 hours |
| Time per defect | **2.28 hours** | — | 4.38 hours |

**Key findings:**
- 2-way CT detected **all 22 defects** (100%) while the ad-hoc approach missed 4
- Configuration optimization saved **48% execution time** (394h → 205h)
- Average time to detect one defect improved by **48%** (4.38h → 2.28h)
- CT led to more organized, parameterized test automation with better reusability

---

## Case Study: Autonomous Driving (Tao 2019)

Tao et al. {% cite tao2019industrial %} applied CT to Autonomous Emergency Braking (AEB) function validation at AVL List GmbH.

### Approach

Built a domain ontology from Euro NCAP protocols covering Car-to-Car and Vulnerable Road User scenarios. Converted ontology to CT input model using CT_ONT2 algorithm. Generated tests with IPOG.

### Model

- **37 parameters:** Vehicle speed (0-130 km/h), 8 vehicle types, lateral offset, direction, deceleration, pedestrian type, lighting conditions, road surface
- **39 constraints:** From Euro NCAP protocol requirements
- **Result:** **319 pairwise test cases** covering all 2-way parameter interactions

### Execution

All 319 tests were automatically converted to OpenScenario XML format and executed in the VTD (Virtual Test Drive) driving simulation platform. The end-to-end pipeline worked:

> Domain Ontology → CT Model → IPOG → OpenScenario XML → VTD Simulation → Results

### Significance

Physical testing of all driving scenarios is impossible — the cost, time, and safety risks are prohibitive. CT combined with simulation makes comprehensive verification feasible. As the authors noted:

> "Building and performing such a test plan with real physical vehicles seems to be impossible to be carried out in practice" {% cite tao2019industrial %}

---

## Case Study: JTrac Issue Tracker (Bures 2017)

Bures and Ahmed {% cite bures2024effectiveness %} investigated whether increasing interaction strength beyond pairwise provides measurable benefit, using the JTrac issue-tracking system.

### Setup

- 9 configuration fields with 26 verification conditions
- 10 mutated instances of the SUT (using VALUE, AND, NOT mutations)
- Compared 2-way vs. 3-way test suites generated with PSTG (PSO-based tool)

### Results

**3-way testing detected faults that 2-way missed entirely** in 3 of 10 mutated systems. Specifically:
- 6 additional defects found by 3-way that 2-way could not detect
- 39.6% of 2-way test cases detected **no defects** in any mutated instance
- Defect detection was not uniformly distributed across test cases

**Implication:** The common practice of defaulting to pairwise testing may be insufficient for some systems. A strength of 3 catches faults that 2 misses in about 30% of cases {% cite bures2024effectiveness %}.

---

## Aerospace: NIST & Lockheed Martin

NIST partnered with Lockheed Martin across 8 aerospace projects over 2.5 years:

| Metric | Improvement |
|--------|-------------|
| Test planning/design cost | **20% savings** |
| Test coverage increase | **20-50%** |
| Testing share of project cost | 50-85% (aerospace) |

At Rockwell Collins, CT was applied to a 196 KSLOC avionics system:
- Generated **47,000 tests in under 2 minutes**
- Detected **all seeded defects**
- Demonstrated scalability for safety-critical systems

---

## Barriers to Adoption

Despite strong evidence, industrial adoption faces challenges {% cite hu2020realworld %}:

| Barrier | Description |
|---------|-------------|
| **Manual execution limit** | Industry prefers <120-200 test cases for manual execution |
| **Tool gap** | ACTS generates abstract tests, not executable scripts |
| **Documentation dependency** | Parameter model quality depends on specification quality |
| **Masking effect** | Early faults terminate execution before later faults are reached |
| **Skills gap** | CT requires understanding covering array theory |
| **Organizational inertia** | Teams resist changing established testing processes |

### Overcoming Barriers

- **Automation:** Integrate CT generation into CI pipelines with mapping layers
- **Training:** Start with simple pairwise on a pilot project
- **Incremental adoption:** Use CT for new features; keep existing tests as seeds
- **Tool integration:** Map ACTS/PICT output to test framework (pytest, JUnit)

---

## Further Reading

- [Practice](practice) — How to apply CT in your projects
- [Tools](tools) — Tool comparison and recommendations
- [Advanced Topics](advanced) — Emerging applications and research challenges

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
