---
title: Techniques and Heuristics
parent: Exploratory Testing
nav_order: 1
layout: default
---

# ET Techniques and Heuristics

Exploratory testing is not unstructured — it employs a rich vocabulary of techniques and heuristics that guide the tester's investigation. Experienced ET practitioners naturally apply the same underlying principles as formal test design techniques (equivalence partitioning, boundary values, combinatorial coverage) — they simply apply them during execution rather than in a separate design phase {% cite itkonen2009manual %}.

---

## Whittaker's Tourist Metaphor

James Whittaker's tourist metaphor provides memorable, actionable guidance for testers. Each "tour" represents a specific testing goal with a distinct exploration strategy {% cite whittaker2009exploratory %}:

### The Five Districts

```mermaid
mindmap
  root((Software<br/>Under Test))
    Business District
      Guidebook Tour
      Money Tour
      Landmark Tour
    Historical District
      Bad Neighborhood Tour
      Museum Tour
    Entertainment District
      Obsessive-Compulsive Tour
      Couch Potato Tour
    Tourist District
      Collector's Tour
      Supermodel Tour
    Hotel District
      All-Nighter Tour
      TOGOF Tour<br/>(Good Old Features)
```

| District | Focus | Example Tours |
|----------|-------|--------------|
| **Business District** | Features users rely on daily | Guidebook Tour, Money Tour, Landmark Tour |
| **Historical District** | Legacy code and old features | Bad Neighborhood Tour, Museum Tour |
| **Entertainment District** | Fun, unusual inputs | Obsessive-Compulsive Tour, Couch Potato Tour |
| **Tourist District** | First-time user experience | Collector's Tour, Supermodel Tour |
| **Hotel District** | Background processes | All-Nighter Tour, TOGOF Tour (Tour Of Good Old Features — verify that existing features still work after changes) |

### Selected Tours

| Tour | Strategy | What It Finds |
|------|----------|--------------|
| **Guidebook Tour** | Follow the user manual exactly | Documentation-code mismatches |
| **Money Tour** | Test the features that sell the product | Critical feature defects |
| **Antisocial Tour** | Do everything the software isn't designed for | Error handling gaps |
| **Back Alley Tour** | Visit the least popular features | Neglected code defects |
| **Couch Potato Tour** | Accept all defaults, change nothing | Default configuration issues |
| **Obsessive-Compulsive Tour** | Repeat the same action with slight variations | State accumulation bugs |
| **All-Nighter Tour** | Leave the application running overnight | Memory leaks, resource exhaustion |
| **Saboteur Tour** | Disrupt resources (network, disk, memory) | Resilience failures |
| **Collector's Tour** | Try to collect every output the software can produce | Output validation gaps |
| **Supermodel Tour** | Focus only on the UI, ignore functionality | Visual and layout defects |

---

## Hendrickson's Heuristics

Elisabeth Hendrickson provides a complementary set of lightweight heuristics for test idea generation {% cite hendrickson2013explore %}:

### Charter Template

Every ET session begins with a **charter** — a brief statement of intent:

> **Explore** [target] **using** [resources] **to discover** [information]

Examples:
- *Explore the checkout flow using boundary credit card numbers to discover input validation gaps*
- *Explore the admin dashboard using a slow network connection to discover timeout handling*

### Core Heuristics

| Heuristic | Technique | What It Tests |
|-----------|-----------|--------------|
| **CRUD** | Create, Read, Update, Delete every entity | Data lifecycle completeness |
| **Goldilocks** | Too big, too small, just right | Boundary conditions |
| **Follow the Data** | Trace data through the entire system | Data flow integrity |
| **Interruptions** | Cancel, back, timeout mid-operation | State management |
| **Soap Opera** | Extreme, dramatic user scenarios | Edge case combinations |
| **Undo/Redo** | Test all reversible operations | State reversal correctness |

### The Nightmare Headline Game

A risk-identification technique: ask *"What would be the worst headline if this software fails?"* and then explore scenarios that could produce that headline {% cite hendrickson2013explore %}. This grounds exploration in business risk rather than technical coverage.

---

## Dynamic Test Design

A key finding from observational studies: experienced testers doing ET naturally apply classical test design techniques, but **dynamically during execution** rather than in a separate design phase {% cite itkonen2009manual %}:

| Formal Technique | ET Application |
|------------------|---------------|
| Equivalence partitioning | Tester intuitively groups similar inputs during exploration |
| Boundary value analysis | Tester probes edges of observed ranges |
| Combinatorial testing | Tester varies multiple parameters simultaneously |
| State transition testing | Tester explores sequences of actions |
| Error guessing | Tester applies domain knowledge to target likely failures |

{: .highlight }
> This suggests ET and scripted testing share a common cognitive foundation; the difference lies in *when and how* techniques are deployed, not in the techniques themselves {% cite itkonen2009manual %}.

---

## AI-Assisted Exploration

Early research explores tool support for ET practitioners {% cite copche2024chatbot %}:

**BotExpTest** (Discord chatbot) provides:
- Charter management and time alerts
- Bug reporting templates
- Technique knowledge (suggests applicable heuristics)
- Active suggestions during sessions

In a pilot study with 6 professionals, the chatbot contributed to discovering 3 of 13 previously unknown bugs through its suggestions. Future directions include LLM integration for smarter, context-aware test idea generation {% cite copche2024chatbot %}.

{: .note }
> AI-assisted ET is nascent but addresses two longstanding challenges: the high skill requirement for testers and the lack of tool support (75% of practitioners have no specific ET tools {% cite pfahl2014survey %}).

---

## Worked Example: Money Tour on a Shopping App

A concrete example of applying the Money Tour {% cite whittaker2009exploratory %} to an e-commerce application:

```mermaid
flowchart TD
    Start["Start: Money Tour<br/>Focus on revenue-critical features"]
    S1["1. Add items to cart<br>Try different quantities, variants"]
    S2["2. Apply discount codes<br>Valid, expired, stacked, boundary amounts"]
    S3["3. Checkout flow<br>Credit card, PayPal, gift card, split payment"]
    S4["4. Order confirmation<br>Email, receipt, inventory update"]
    S5["5. Refund/return<br>Partial refund, full refund, exchange"]

    Start --> S1 --> S2 --> S3 --> S4 --> S5

    S1 -.- N1["Found: quantity overflow<br/>allows negative price"]
    S3 -.- N2["Found: race condition<br/>double-charge on timeout"]
    S5 -.- N3["Found: refund exceeds<br/>original payment"]

    style Start fill:#fff3e0,stroke:#f57c00
    style N1 fill:#ffcdd2,stroke:#d32f2f
    style N2 fill:#ffcdd2,stroke:#d32f2f
    style N3 fill:#ffcdd2,stroke:#d32f2f
```

The tester follows the money: every path where money changes hands gets explored. Unlike a scripted test that checks "can the user buy item X," the Money Tour encourages creative variations at each step — stacking discount codes, splitting payments, interrupting checkout mid-transaction.

---

## Choosing the Right Technique

| Situation | Recommended Approach |
|-----------|---------------------|
| New feature, unfamiliar territory | Tourist metaphor tours {% cite whittaker2009exploratory %} |
| Data-heavy application | CRUD + Follow the Data {% cite hendrickson2013explore %} |
| Risk-focused testing | Nightmare Headline Game {% cite hendrickson2013explore %} |
| Regression after changes | Antisocial + Back Alley tours {% cite whittaker2009exploratory %} |
| Time-constrained session | Charter with specific heuristics |
| Performance concerns | All-Nighter + Saboteur tours {% cite whittaker2009exploratory %} |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
