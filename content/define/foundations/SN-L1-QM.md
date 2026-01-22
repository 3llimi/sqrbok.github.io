---
parent: Foundations
nav_order: 10
title: "Study Notes: Quality Models"
layout: default
---

# Study Notes: Quality Models

---

## Table of Contents

1. [Part 1: What is Quality? (Garvin Framework)](#part-1-what-is-quality-garvin-framework)
2. [Part 2: Quality Models & Terminology](#part-2-quality-models--terminology)
3. [Part 3: Classic Quality Models](#part-3-classic-quality-models)
4. [Part 4: Modern Practice (ISO + Requirements)](#part-4-modern-practice-iso--requirements)
5. [Part 5: Quality Gurus](#part-5-quality-gurus)
6. [Part 6: Summary & Review](#part-6-summary--review)

---

## Part 1: What is Quality? (Garvin Framework)

### Learning Objectives
- Understand that quality is multi-dimensional
- Recognize that different stakeholders define quality differently
- Apply Garvin's five views to real-world products

### Garvin's Five Views of Quality

David Garvin {% cite garvin_what_1984 %} identified five distinct perspectives on quality (see [Views](views.md) for full details). Each leads to different quality management approaches.

| View | Definition | Example | Approach |
|------|------------|---------|----------|
| **Transcendent** | "I know it when I see it" | Rolex watch, Monet painting | Subjective judgment |
| **Product-based** | More of attribute X is better | Smartphone specs, diamond carats | Measurable attributes |
| **User-based** | Fitness for purpose | Toyota Corolla (reliable, low-maintenance) | Customer satisfaction |
| **Manufacturing** | Conformance to specifications | Zero defects in assembly | Process control |
| **Value-based** | Quality at acceptable cost | Budget airline ticket | ROI analysis |

#### Detailed View Descriptions

**1. Transcendent View**
- Quality is absolute and universally recognizable but cannot be precisely defined
- Often associated with excellence or "innate goodness"
- *Example:* A luxury watch like a Rolex is recognized as high quality because of its superior craftsmanship and prestige
- *Criticism:* Subjective and difficult to measure or operationalize

**2. Product-Based View**
- Quality is a precise and measurable variable based on product attributes
- More features or better performance equals higher quality
- *Example:* A smartphone with better resolution, longer battery life, and faster processing speed
- *Criticism:* Assumes all improvements are desirable, ignoring trade-offs like cost

**3. User-Based View**
- Quality is determined by the extent to which a product satisfies customer needs
- Different users = different quality definitions
- *Example:* A budget-friendly car like Toyota Corolla is high quality to customers who value reliability
- *Criticism:* Highly subjective and dependent on individual expectations

**4. Manufacturing-Based View**
- Quality is defined as conformance to specifications or being free from defects
- Focus on process excellence
- *Example:* A car produced with zero defects in the assembly line
- *Criticism:* Focuses on internal consistency but overlooks customer satisfaction

**5. Value-Based View**
- Quality is the balance between performance and cost
- Delivers the most value for its price
- *Example:* A budget airline ticket that meets expectations for basic transportation at low price
- *Criticism:* Overemphasis on cost-performance trade-offs can compromise safety

### Practical Three-View Model

Most software organizations blend three views:

| Perspective | Definition | Methodology Emphasis |
|-------------|-----------|----------------------|
| **User-based** | "Fitness for purpose" (Juran) | Agile |
| **Manufacturing** | "Conformance to requirements" (Crosby) | CMMI, process improvement |
| **Value-based** | Quality at acceptable cost | Business perspective |

---

## Part 2: Quality Models & Terminology

### Learning Objectives
- Define quality model and explain why it's needed
- Understand the hierarchy: Characteristics → Attributes → Measures
- Distinguish between QA, QC, and related terms

### Why Quality Models Are Needed

Quality models solve the "I know it when I see it" problem:

1. **Shared vocabulary** — Common language for quality requirements
2. **Measurement capability** — Enable comparison and tracking
3. **Design guidance** — Inform development decisions
4. **Trade-off analysis** — Framework for understanding conflicts

### Quality Model Definitions

**Simple Definition:**
> A model with the objective to describe, assess, and/or predict quality.

**ISO 25000 Definition:**
> A defined set of characteristics, and of relationships between them, which provides a framework for specifying quality requirements and evaluating quality.

**Full Definition:**
> A structured specification of quality in terms of characteristics, attributes, their relationships, and corresponding measurement scales and methods.

### Quality Model Hierarchy

```
Quality Model
├── Quality Characteristic (e.g., Reliability)
│   ├── Quality Attribute (e.g., Fault Tolerance)
│   │   ├── Measurement Scale
│   │   └── Measurement Method
│   └── Quality Attribute (e.g., Recoverability)
└── Quality Characteristic (e.g., Usability)
    └── ...
```

**Key Distinction:**
- **Characteristics** are high-level (not directly measurable)
- **Attributes** can be measured

### Internal vs External Quality

| Type | Visibility | Who Sees It | Examples |
|------|-----------|-------------|----------|
| **Internal** (white-box) | Developers | Code metrics, cyclomatic complexity, code coverage |
| **External** (black-box) | Users | Response time, availability, usability |

### Key Terminology

| Term | Definition | Key Point |
|------|------------|-----------|
| **Quality Management (QM)** | Plan, verify, remediate, improve | Overall umbrella term |
| **Quality Planning (QP)** | Identify requirements, activities, tools | Front-end planning |
| **Quality Assurance (QA)** | Provide confidence in quality | Focuses on process |
| **Quality Control (QC)** | Verify and correct | Focuses on product |
| **Quality Improvement (QI)** | Enhance process effectiveness | Continuous improvement |

---

## Part 3: Classic Quality Models

### Learning Objectives
- Explain McCall's quality model structure (factors, criteria, metrics)
- List and categorize McCall's 11 quality factors
- Understand quality attribute tradeoffs (Perry's model)

### McCall's Quality Model

McCall {% cite mccall_factors_1977 %} developed the first comprehensive software quality model for the US Air Force (see [Models](models.md) for full details).

**Innovation:** First structured approach to software quality
**Structure:** 11 quality factors in 3 categories

#### The Three Categories

| Category | Focus Question | What It Covers |
|----------|---------------|----------------|
| **Product Operation** | How well does it run? | Day-to-day functionality |
| **Product Revision** | Can we change it? | Maintenance and evolution |
| **Product Transition** | Can we move it? | Portability and integration |

#### McCall's 11 Quality Factors

| Category | Factors | Description |
|----------|---------|-------------|
| **Product Operation** | Correctness | Meets specified requirements |
| | Reliability | Performs without failure |
| | Efficiency | Uses minimal resources |
| | Integrity | Protected from unauthorized access |
| | Usability | Easy to learn and operate |
| **Product Revision** | Maintainability | Easy to modify for corrections |
| | Flexibility | Easy to modify for enhancements |
| | Testability | Easy to validate and verify |
| **Product Transition** | Portability | Runs in different environments |
| | Reusability | Components can be reused |
| | Interoperability | Works with other systems |

#### Three-Level Structure

McCall's model has three levels:

1. **Factor** — External view (what users see)
   - Example: Reliability
2. **Criteria** — Internal view (what developers control)
   - Example: Simplicity, Modularity
3. **Metric** — Measurement
   - Example: Cyclomatic complexity

**Key Insight:** Same criterion can affect multiple factors!
- *Example:* Modularity → Maintainability AND Testability

### Perry's Quality Attribute Relationships

Perry {% cite perry_effective_1988 %} showed that quality attributes are **not independent** — they have relationships:

| Relationship Type | Symbol | Meaning |
|-------------------|--------|---------|
| Direct | + | Both improve together |
| Inverse | − | Tradeoff (one improves, other worsens) |
| Neutral | (blank) | No relationship |

#### Key Tradeoffs to Know

| Attribute Pair | Relationship | Explanation |
|----------------|--------------|-------------|
| Integrity vs Efficiency | Inverse (−) | Access control adds overhead |
| Usability vs Efficiency | Inverse (−) | Better UI requires more code |
| Flexibility vs Integrity | Inverse (−) | Flexible data = security risks |
| Portability vs Reusability | Direct (+) | Both benefit from good structure |
| Maintainability vs Testability | Direct (+) | Well-structured code is easier to test |

#### Perry's Tradeoff Matrix (Selected)

| Attribute | Efficiency | Maintainability | Reusability |
|-----------|:----------:|:---------------:|:-----------:|
| **Integrity** | − | | − |
| **Usability** | − | + | |
| **Testability** | − | + | + |
| **Portability** | − | + | + |

> **Key Takeaway:** You cannot maximize all quality attributes simultaneously. Quality engineering is about **informed tradeoffs**.

---

## Part 4: Modern Practice (ISO + Requirements)

### Learning Objectives
- List ISO 25010's 9 quality characteristics
- Apply the 6-step process for writing quality requirements
- Write testable quality requirements using the template
- Explain Quality in Use and Process Quality

### ISO/IEC 25010:2024 — 9 Characteristics

Use ISO 25010 as a **checklist** when writing requirements:

| # | Characteristic | Question It Answers |
|---|----------------|---------------------|
| 1 | **Functional Suitability** | Does it do what it should? |
| 2 | **Performance Efficiency** | Is it fast/efficient enough? |
| 3 | **Compatibility** | Does it work with others? |
| 4 | **Usability** | Can users use it easily? |
| 5 | **Reliability** | Does it keep working? |
| 6 | **Security** | Is it protected? |
| 7 | **Maintainability** | Can we change it? |
| 8 | **Portability** | Can we move it? |
| 9 | **Quality in Use** | Do users succeed? |

#### Sub-Characteristics (Selected)

| Characteristic | Sub-Characteristics |
|----------------|---------------------|
| **Functional Suitability** | Completeness, Correctness, Appropriateness |
| **Performance Efficiency** | Time Behavior, Resource Utilization, Capacity |
| **Reliability** | Maturity, Availability, Fault Tolerance, Recoverability |
| **Security** | Confidentiality, Integrity, Non-repudiation, Accountability, Authenticity |
| **Maintainability** | Modularity, Reusability, Analyzability, Modifiability, Testability |

### 6-Step Process: From ISO to Requirements

**Source:** Firesmith 2009

| Step | Action | Purpose |
|------|--------|---------|
| 1 | **Determine Relevance** | Which ISO characteristics matter for this project? |
| 2 | **Consider Context** | Review functional, data, interface requirements |
| 3 | **Produce Criteria** | Define quality criteria for each characteristic |
| 4 | **Select Measures** | Choose how to measure each criterion |
| 5 | **Specify Requirements** | Write testable requirements with thresholds |
| 6 | **Evaluate** | Validate completeness, testability, feasibility |

> **Warning:** Skipping steps leads to vague requirements like "the system shall be fast."

### Worked Example: Search API Performance

**Goal:** Write a performance requirement for a search API

| Step | Action | Result |
|------|--------|--------|
| 1. Relevance | Performance Efficiency matters for UX | Selected |
| 2. Context | Users expect quick search results | Search is critical |
| 3. Criteria | Response time for search queries | Time-based criterion |
| 4. Measure | P95 latency (95th percentile) | Measurable metric |
| 5. Requirement | Write with template | Testable spec |
| 6. Evaluate | Testable? Feasible? Complete? | Approved |

**Resulting Requirement:**
```
While under normal load (< 1000 concurrent users), the Search API
shall respond in < 200ms, 95% of the time.
```

### Quality Requirements Template

**Template:**
```
While in [condition], the [component] shall exhibit
[quality attribute] of [threshold] [measurement].
```

**Examples:**

| Requirement | Condition | Attribute | Threshold |
|-------------|-----------|-----------|-----------|
| API response time | Normal operation | Performance | < 200ms, 95% |
| Data integrity | Production | Reliability | 99.99% |
| System availability | Under load | Availability | > 99.9% |
| Login authentication | All users | Security | 0 unauthorized access |

### Quality in Use

**Definition (ISO 25010):**
> The degree to which a system achieves its intended purposes when used in a specific environment by specific users.

#### Five Quality in Use Characteristics

| Characteristic | Description | Example Requirement |
|----------------|-------------|---------------------|
| **Effectiveness** | Users achieve goals | "90% of users complete checkout on first attempt" |
| **Efficiency** | Resources used appropriately | "Booking takes < 2 minutes for returning users" |
| **Satisfaction** | User attitudes | "NPS score > 50 in quarterly surveys" |
| **Freedom from Risk** | Economic, health, environmental | "No data loss during system failures" |
| **Context Coverage** | Works in all intended contexts | "Works on all major browsers" |

**Key Insight:** Product quality alone is insufficient. A perfectly maintainable system that users can't use effectively has poor quality in use.

#### Different Stakeholders

| Need | User | Maintainer |
|------|------|------------|
| Effectiveness | Complete task | Fix bugs |
| Efficiency | Fast workflow | Quick changes |
| Satisfaction | Enjoys using | Productive |

### Process Quality Characteristics

Four characteristics (Kroeger & Davidson, 2009):

| Characteristic | What it Measures |
|----------------|-----------------|
| **Suitability** | Does process fit the work? |
| **Usability** | Can people follow it? |
| **Manageability** | Can we plan, monitor, control? |
| **Evolvability** | Can we improve it? |

> **Key Insight:** High quality process tends to produce high quality products (but not guaranteed!). Process quality is the focus of CMMI, ISO 9001.

---

## Part 5: Quality Gurus

See [Gurus](gurus.md) for full details on each pioneer.

### Learning Objectives
- Identify 7 key quality pioneers and their eras
- Match each guru to their key contribution
- Explain key concepts: PDCA, Zero Defects, Kano Model, Juran's Trilogy

### Timeline of Quality Pioneers

| Era | Period | Key Figures |
|-----|--------|-------------|
| **Manufacturing Era** | 1920s-1950s | Shewhart, Deming, Juran |
| **Quality Movement** | 1960s-1980s | Ishikawa, Crosby |
| **Software Era** | 1980s-2000s | Humphrey, Kano |

**Lineage:** Shewhart → Deming → Juran → Humphrey

### Guru Quick Reference

| Guru | Years | One-Sentence Summary | Key Contribution |
|------|-------|---------------------|------------------|
| **Walter Shewhart** | 1891-1967 | Control of variation | PDCA Cycle, Statistical Process Control |
| **W. Edwards Deming** | 1900-1993 | Quality and productivity together | 14 Points for Management |
| **Joseph Juran** | 1904-2008 | Fitness for purpose | Juran's Trilogy, Pareto Principle |
| **Kaoru Ishikawa** | 1915-1989 | Root cause analysis | Fishbone Diagram, Quality Circles |
| **Philip Crosby** | 1926-2001 | Conformance to requirements | Zero Defects, "Quality is Free" |
| **Watts Humphrey** | 1927-2010 | Father of software quality | CMM/CMMI, PSP, TSP |
| **Noriaki Kano** | 1940- | Not all attributes are equal | Kano Model |

### Detailed Guru Profiles

#### Walter Shewhart (1891-1967)

**Era:** Manufacturing
**Key Concept:** Control of Variation

**Contributions:**
- **Statistical Process Control (SPC)** — Using statistics to monitor manufacturing
- **PDCA Cycle** (Plan-Do-Check-Act):
  1. **Plan:** Identify issues and plan solutions
  2. **Do:** Execute the plan
  3. **Check:** Compare results with planned outcomes
  4. **Act:** Adjust based on findings
- Differentiated **Special Cause** (assignable) vs **Common Cause** (random) variation

**Legacy:** His 1924 memo at Western Electric contained "all of the essential principles... which we know today as process quality control" (George Edwards)

---

#### W. Edwards Deming (1900-1993)

**Era:** Manufacturing/Quality Movement
**Key Concept:** Quality and productivity are NOT mutually exclusive

**Contributions:**
- Popularized **PDCA Cycle** (credited to Shewhart)
- **System of Profound Knowledge:**
  - Systems thinking
  - Understanding variation
  - Theory of knowledge
- **14 Points for Management** (selected):
  1. Create constancy of purpose
  2. Adopt new philosophy
  3. Cease dependence on inspection
  8. Drive out fear
  12. Remove barriers to pride
  14. Put everyone to work on transformation

**Impact:** Influenced Japanese manufacturing revolution

---

#### Joseph Juran (1904-2008)

**Era:** Manufacturing/Quality Movement
**Key Concept:** Fitness for Purpose

**Contributions:**
- **Fitness for Purpose** — Quality means meeting customer needs
- **Pareto Principle** (80/20 Rule) — Focus on "vital few" problems
- **Juran's Trilogy:**
  1. **Quality Planning** — Define objectives and processes
  2. **Quality Control** — Monitor performance and address deviations
  3. **Quality Improvement** — Continuously enhance processes

**Quote:** *"Quality means freedom from deficiencies... Higher quality in this sense usually costs less."*

**Key Insight:** Quality features (what customers want) and defect reduction are both important but different. You need both.

---

#### Philip Crosby (1926-2001)

**Era:** Quality Movement
**Key Concept:** Conformance to Requirements

**Contributions:**
- **Zero Defects** movement
- **"Quality is Free"** (1979 book) — Quality is about conformance, not luxury
- Quality is management responsibility
- **Price of Non-Conformance (PONC)** — Measure cost of poor quality

**Quote:** *"It is always cheaper to do the job right the first time."*

---

#### Kaoru Ishikawa (1915-1989)

**Era:** Quality Movement
**Key Concept:** Root Cause Analysis

**Contributions:**
- **Quality Circles** — Self-organized groups for problem-solving
- **Ishikawa (Fishbone) Diagram** — Tool for root cause analysis
- **Seven Tools of Quality:**
  1. Flowcharts
  2. Pareto diagrams
  3. Cause-effect diagrams (Fishbone)
  4. Histograms
  5. Control charts
  6. Scatter diagrams
  7. Check sheets

---

#### Noriaki Kano (1940-)

**Era:** Quality Movement/Software Era
**Key Concept:** Not All Attributes Are Equal

**The Kano Model** {% cite kano1984attractive %} — Three types of quality attributes:

| Type | Effect | Example | Behavior |
|------|--------|---------|----------|
| **Must-Haves** | Absence = dissatisfaction | Car has brakes | Expected baseline |
| **Satisfiers** | More = better | Fuel efficiency | Linear relationship |
| **Delighters** | Unexpected pleasure | Heated steering wheel | Excitement factor |

**Critical Insight:** Over time, delighters become must-haves!

---

#### Watts Humphrey (1927-2010)

**Era:** Software Era
**Title:** Father of Software Quality

Humphrey {% cite humphrey1989managing %} established the foundations of software process improvement.

**Quote:** *"While software functions are most important to users, these functions are not usable unless the software runs. To get software to run, engineers must remove almost all its defects."*

**Contributions:**
- **CMM/CMMI** — Capability Maturity Model
- **TSP** — Team Software Process
- **PSP** — Personal Software Process
- **Eight Steps for Quality Software:**
  1. Establish quality policies and goals
  2. Train and support developers
  3. Maintain requirements quality management
  4. Apply statistical control to software processes
  5. Review all product artifacts
  6. Analyze and correct defects
  7. Manage configuration and change control
  8. Continuously improve processes

---

## Part 6: Summary & Review

### Six Key Takeaways

1. **Quality is multi-dimensional** — Garvin's 5 views help understand different perspectives

2. **Quality models provide structure** — Framework for requirements, design, evaluation

3. **Models evolved over time** — McCall (1977) → ISO 9126 → ISO 25010 (2024)

4. **Tradeoffs are inevitable** — Cannot maximize all attributes simultaneously

5. **Quality in Use matters** — User outcomes, not just product properties

6. **Gurus shaped thinking** — Shewhart → Deming → Juran → Humphrey

### Quick Reference Tables

#### Garvin's 5 Views

| View | Key Word | Example |
|------|----------|---------|
| Transcendent | Excellence | Art |
| Product-based | Features | Specs |
| User-based | Purpose | Satisfaction |
| Manufacturing | Conformance | Defects |
| Value-based | Cost | ROI |

#### McCall's 11 Factors (by Category)

| Operation | Revision | Transition |
|-----------|----------|------------|
| Correctness | Maintainability | Portability |
| Reliability | Flexibility | Reusability |
| Efficiency | Testability | Interoperability |
| Integrity | | |
| Usability | | |

#### ISO 25010 Characteristics (9)

| Product Quality (8) | Quality in Use |
|--------------------|----------------|
| Functional Suitability | Effectiveness |
| Performance Efficiency | Efficiency |
| Compatibility | Satisfaction |
| Usability | Freedom from Risk |
| Reliability | Context Coverage |
| Security | |
| Maintainability | |
| Portability | |

#### Gurus and Their Contributions

| Era | Guru | Key Concept |
|-----|------|-------------|
| Manufacturing | Shewhart | PDCA, SPC |
| Manufacturing | Deming | 14 Points |
| Manufacturing | Juran | Trilogy, Pareto |
| Quality Movement | Ishikawa | Fishbone, 7 Tools |
| Quality Movement | Crosby | Zero Defects |
| Software | Humphrey | CMM, PSP, TSP |
| Software | Kano | Kano Model |

---

## References

**Primary Sources:**
- Quality Views Framework {% cite garvin_what_1984 %}
- Software Quality Factors {% cite mccall_factors_1977 %}
- Quality Attribute Relationships {% cite perry_effective_1988 %}
- Software Design Methodology {% cite zhu_software_2005 %}
- Software Quality Theory {% cite gillies_software_2011 %}
- Software Process Improvement {% cite humphrey1989managing %}
- Kano Model {% cite kano1984attractive %}

**Standards:**
- ISO/IEC 25010:2024 — Systems and software Quality Requirements and Evaluation (SQuaRE)
- ISO/IEC 25000 — SQuaRE Guide
- ISO 9126 — Software Product Quality (superseded)

**SQRBOK Pages:**
- [Foundations: Views](views.md)
- [Foundations: Models](models.md)
- [Foundations: Gurus](gurus.md)

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.

---

**Next Lecture:** [Measurement](../measurement/) — How to quantify quality
