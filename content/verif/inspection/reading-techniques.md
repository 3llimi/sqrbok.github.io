---
title: Reading Techniques
parent: Inspection
nav_order: 2
layout: default
---

# Inspection Reading Techniques

The **reading technique** determines how inspectors analyze an artifact during preparation. Research shows that systematic techniques like Perspective-Based Reading (PBR) detect **21-30% more defects** than ad hoc approaches {% cite basili1996empirical %}.

---

## Why Techniques Matter

{: .highlight }
> "90% to 95% of defects can be identified during the preparation stage, while only 10% are found during the actual inspection meeting" {% cite aurum2002inspections %}

Since preparation is where most defects are found, **how** reviewers read directly impacts inspection effectiveness.

---

## Technique Comparison

| Technique | Description | Effectiveness |
|-----------|-------------|---------------|
| **Ad hoc** | No guidance, relies on experience | Baseline |
| **Checklist** | Questions to answer | Better than ad hoc |
| **Scenario-based** | Focus on specific defect types | **35% more** than checklist |
| **PBR** | Assume stakeholder perspectives | **21-30% improvement** |

### Effectiveness Hierarchy

```
PBR > Scenario-based > Checklist > Ad hoc
```

---

## Ad Hoc Reading

**Approach:** No systematic guidance; reviewers rely entirely on personal experience and intuition.

**Characteristics:**
- Fast to implement (no training needed)
- Highly variable results
- Dependent on individual skill
- No repeatability

**When to use:** Only when time prohibits other approaches.

---

## Checklist-Based Reading

**Approach:** Reviewers answer a predefined list of questions while examining the artifact.

**Example Questions:**
- Are all variables initialized before use?
- Are array bounds checked?
- Are error conditions handled?
- Is the code properly commented?

**Strengths:**
- Easy to create and customize
- Captures organizational knowledge
- Provides structure for novices

**Limitations:**
- Questions without guidance on **how** to find answers
- Can become rote ("checkbox mentality")
- May miss issues not on the list

**Best Practice:** Keep checklists short (10-20 items) and focused on common mistakes {% cite cohen2006secrets %}.

---

## Scenario-Based Reading

**Approach:** Reviewers follow specific scenarios targeting particular defect types.

**Example Scenarios:**
- "Find all places where null pointers could be dereferenced"
- "Identify all error handling paths"
- "Trace data flow from input to output"

**Effectiveness:**

> "Scenario-based reading has shown a higher detection rate than ad hoc and checklist methods, finding **35% more defects** in some experiments" {% cite aurum2002inspections %}

**Variants:**
- **Defect-Based Reading (DBR):** Different reviewers focus on different defect classes
- **Function Point-Based:** Scenarios organized around inputs, files, outputs

---

## Perspective-Based Reading (PBR)

PBR is the most researched and effective technique for requirements inspection {% cite basili1996empirical %} {% cite shull2000perspective %}.

### The Core Idea

Different stakeholders need different information from requirements:
- **Testers** need testable criteria
- **Designers** need sufficient detail for architecture
- **Users** need clear functionality descriptions

By having reviewers **assume a stakeholder role**, they naturally encounter defects relevant to that perspective.

### The Three Perspectives

| Perspective | Role | Creates | Finds |
|-------------|------|---------|-------|
| **Tester** | QA Engineer | Test cases / test plan | Missing testability, ambiguous criteria |
| **Designer** | Architect | High-level design | Incomplete specs, inconsistencies |
| **User** | End user | User manual / feature list | Usability gaps, missing features |

### How PBR Works

1. **Assign perspectives** — Each reviewer takes one stakeholder role
2. **Build a model** — Create a work product for that role (e.g., test cases)
3. **Identify gaps** — Defects emerge when the model can't be built
4. **Combine results** — Merge findings from all perspectives

{: .important }
> "Building a model forces reviewers to encounter defects naturally" {% cite shull2000perspective %}

### PBR Effectiveness Data

| Study | Finding | Source |
|-------|---------|--------|
| NASA/GSFC | **21-30% improvement** over traditional | {% cite basili1996empirical %} |
| Team coverage | Significantly better with PBR | {% cite basili1996empirical %} |
| Unfamiliar domains | PBR especially effective | {% cite shull2000perspective %} |

### Surprising Finding: Experience Doesn't Predict Success

> "There was a weak relationship between a reviewer's years of professional experience and their performance with PBR" {% cite basili1996empirical %}

Less-experienced reviewers who followed PBR procedures closely often outperformed senior developers who reverted to their own heuristics.

### PBR Trade-offs

| Advantage | Disadvantage |
|-----------|--------------|
| Higher detection rate | Up to 30% more effort |
| Produces useful artifacts | Requires training |
| Great for training novices | Experienced devs may resist |
| Reduces reviewer overlap | More complex to coordinate |

**Offset:** The "extra" effort produces useful work products (test plans, designs) that would be needed later anyway.

---

## Choosing a Technique

| Situation | Recommended Technique |
|-----------|----------------------|
| **Critical requirements** | PBR with all three perspectives |
| **Code inspection** | Checklist + security scenarios |
| **Time-constrained** | Focused checklist |
| **Training novices** | PBR (teaches systematic thinking) |
| **Legacy code** | Scenario-based (target known problem areas) |

---

## Implementation Tips

### For Checklists

1. Start with industry standards (OWASP, CERT)
2. Add organization-specific common defects
3. Review and prune regularly
4. Keep under 20 items

### For PBR

1. Train reviewers on perspective requirements
2. Provide templates for work products
3. Allow adequate preparation time (up to 30% more)
4. Rotate perspectives across reviews

### For All Techniques

- **Don't mix techniques** in a single review — stick to one approach
- **Track metrics** to compare technique effectiveness
- **Customize** based on defect data from your organization

---

## Summary

| Technique | Improvement | Best For |
|-----------|-------------|----------|
| Checklist | Baseline+ | Quick reviews, code |
| Scenario-based | +35% | Known problem areas |
| **PBR** | **+21-30%** | Requirements, critical artifacts |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
