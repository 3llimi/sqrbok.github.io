---
title: Advanced Topics
parent: Combinatorial Testing
nav_order: 7
layout: default
---

# Advanced Topics & Emerging Applications

Beyond standard pairwise testing, CT offers advanced techniques for handling real-world complexity and is expanding into new application domains including autonomous driving, ML/AI, and security testing.

---

## Constraint Handling

**Problem:** Not all parameter combinations are valid. February 30th doesn't exist. Safari only runs on macOS. Feature X requires Feature Y to be enabled.

Naively removing invalid rows from a covering array may destroy coverage of other valid combinations.

### Four Strategies

Grindal, Offutt, and Mellin identified four approaches to managing constraints:

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Abstract** | Combine conflicting parameters into a single composite parameter | Few conflicts, closely related params |
| **Partition** | Split the model into conflict-free sub-models | Independent parameter groups |
| **Avoid** | Configure the generator to produce only valid combinations | Tool supports constraints (ACTS, PICT) |
| **Replace** | Post-process: clone conflicting rows and modify to valid alternatives | No tool support, legacy models |

### Tool Support

Modern tools handle constraints directly:

**ACTS constraint syntax:**
```
[Constraint]
IF [OS] = "macOS" THEN [Browser] <> "Edge";
IF [Month] = "Feb" THEN [Day] <= 28;
```

**PICT constraint syntax:**
```
IF [OS] = "macOS" THEN [Browser] <> "Edge";
IF [Month] = "Feb" THEN [Day] <= 28;
```

CASA uses an integrated SAT solver (MiniSAT) that can handle constraint networks too complex for simple boolean expressions {% cite garvin2011casa %}.

---

## Mixed-Strength Arrays

**Problem:** Some parameters interact more strongly than others. Security-critical parameters may need 3-way coverage while UI parameters need only 2-way.

**Solution:** Variable-strength covering arrays assign different interaction strengths to different parameter subsets.

### Example

A web application with:
- **Authentication parameters** (username, password, MFA): 3-way coverage (security-critical)
- **UI parameters** (theme, language, layout): 2-way coverage (lower risk)
- **Cross-group interactions:** 2-way coverage

This reduces total test count while concentrating effort on high-risk interactions.

### Tool Support

ACTS supports mixed-strength specification:
```
[Relation]
# 3-way among authentication params
Degree: 3
Params: username, password, mfa_method

# 2-way for everything else (default)
```

---

## CT for Autonomous Driving

Autonomous driving validation presents a massive combinatorial challenge. Physical testing of all scenarios is impossible — the cost, time, and safety risks are prohibitive {% cite tao2019industrial %}.

### AVL List GmbH Case (Tao 2019)

**Domain:** Autonomous Emergency Braking (AEB) function for Euro NCAP compliance.

**Pipeline:**

1. **Domain Ontology** — UML model of AEB domain from Euro NCAP protocols
2. **CT Model** — 37 parameters, 39 constraints (via CT_ONT2 algorithm)
3. **Test Generation** — IPOG generates 319 pairwise test cases
4. **Scenario Format** — Automatic conversion to OpenScenario XML
5. **Simulation** — Execution in VTD (Virtual Test Drive) platform
6. **Results** — All 319 scenarios verified in simulation

**Parameters include:**
- Ego vehicle speed (0-130 km/h)
- 8 vehicle types (sedan, SUV, motorcycle, bicycle, etc.)
- Lateral offset, direction, deceleration profiles
- Pedestrian type (adult, child)
- Lighting (day, night), road surface (dry, wet)

**Key insight:** Ontology-based CT bridges the gap between domain knowledge and systematic test generation. The ontology captures relationships and constraints that raw parameter models cannot express.

---

## CT for ML Dataset Quality

Lanus et al. {% cite lanus2021metrics %} proposed using combinatorial coverage metrics to assess ML dataset representativeness — a novel bridge between CT theory and ML quality assurance.

### Two Metrics

**CCM_t (Combinatorial Coverage Metric):** Measures the proportion of possible t-way interactions present in a dataset.

**SDCCM_t (Set Difference Combinatorial Coverage Metric):** Measures the proportion of t-way interactions in one dataset that are absent from another.

### Key Finding

In a satellite imagery study (planes detection), the **smaller** Northern California dataset had **higher** 2-way coverage (CCM₂ = 0.93) than the larger Southern California dataset (CCM₂ = 0.83).

**Dataset size does not equal representativeness.**

### Practical Applications

- **Source model selection:** Choose pre-trained models from a model zoo based on training dataset coverage similarity
- **Directing data collection:** Identify missing t-way combinations and collect targeted data
- **Transfer learning prediction:** Coverage asymmetry (SDCCM) predicts performance drops when transferring between datasets
- **Stress test design:** Use uncovered t-tuples to design adversarial test cases

---

## CT for Security Testing

CT is increasingly applied to security verification:

**Tor anonymity network (Simos 2024):** CT-based testing of Tor client CLI configurations to verify anonymity properties across parameter combinations.

**Command-line fuzzing (Lu 2024):** Combining edge coverage guidance with CT to systematically fuzz CLI tools, discovering vulnerabilities through parameter interaction testing.

**Hardware Trojan detection:** A challenging frontier — hardware security may require interaction strengths t > 6, pushing beyond the typical ≤6-way threshold observed in software.

---

## Research Challenges & Open Problems

### Reproducibility Crisis

Pan et al. {% cite pan2022testcase %} found that **only 21% of ML-based test prioritization studies are reproducible** (6 of 29 surveyed studies). This raises serious concerns about the reliability of reported improvements in ML-enhanced CT.

### Open Technical Problems

| Problem | Description |
|---------|-------------|
| **Error Locating Arrays** | Arrays designed to not just detect but *locate* faults; not addressed by search-based methods |
| **TCCA Generation** | Test Case-Aware Covering Arrays that consider test execution cost |
| **Non-functional CT** | Race conditions, DST transitions, performance interactions rarely modeled |
| **Abstract-to-Concrete** | Tools generate abstract values; mapping to executable tests is manual |
| **Coverage Tracking** | No standard way to measure CT coverage during execution |

### Infrastructure Gaps

- No standardized benchmarks for evaluating CT tools and algorithms
- Incremental/online CT for CI environments needs development
- NLP-based feature extraction (BERT/CodeBERT) for automatic parameter identification from specifications is unexplored

---

## Further Reading

- [Foundations](foundations) — Theoretical basis for covering arrays
- [Tools](tools) — Constraint handling in practice
- [Industrial Evidence](effectiveness) — Case studies from real projects
- [Combinatorial Testing overview](.) — Motivation and key numbers

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
