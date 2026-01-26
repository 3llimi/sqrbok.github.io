---
title: "Revision Questions: Industry Practices"
parent: Industry Practices
nav_order: 100
layout: default
---

# Industry Quality Practices — Revision Questions

**Purpose:** Self-study and exam preparation
**Format:** Explain in your own words, give brief examples

---

## Question 1: The Test Pyramid

Google recommends a 70/20/10 distribution for small (unit), medium (integration), and large (E2E) tests.

Explain why this ratio exists. What problems occur when teams have an "inverted pyramid" with mostly E2E tests and few unit tests?

---

## Question 2: Test Coverage Limitations

Microsoft targets 80% code coverage at final release, yet the book states "coverage ≠ quality."

Explain the difference between what coverage measures and what it cannot detect. Give a concrete example where 100% coverage fails to catch a bug.

---

## Question 3: Code Review Speed and Size

Google's code review data shows median latency <4 hours and median change size of 24 lines.

Why are small, fast reviews important? What happens to review quality when changes exceed 100 lines?

---

## Question 4: Static Analysis Adoption

Google disables any static analysis check with >10% false positive rate.

Explain why false positives matter for tool adoption. What happens when developers receive too many false warnings?

---

## Question 5: Canary Deployment

Canary deployment exposes only 1% of users to new code initially.

Explain how canary limits "blast radius." Calculate: if a bug causes 20% errors in the new code, what is the overall error rate with a 5% canary vs no canary?

---

## Question 6: SLIs, SLOs, and SLAs

The SRE model defines three levels: SLI (indicator), SLO (objective), and SLA (agreement).

Explain the hierarchy. Why should your internal SLO be stricter than the external SLA you promise customers?

---

## Question 7: Error Budgets

Error budget equals 100% minus SLO. If you have a 99.9% SLO and serve 3 million requests per month:

Calculate your monthly error budget. What actions does a team take when the error budget is exhausted? What can they do when budget remains?

---

## Question 8: Four Golden Signals

SRE monitors Latency, Traffic, Errors, and Saturation.

Explain the difference between alerting on "symptoms" vs "causes." Give an example of a bad alert (cause) and a good alert (symptom) for the same underlying issue.

---

## Question 9: Toil and the 50% Rule

Google SRE defines "toil" as manual, repetitive, automatable work with no enduring value, and limits it to 50% of SRE time.

Give three examples of toil vs engineering work. Why is the 50% threshold important for team sustainability?

---

## Question 10: LLM Testing Risks

Research shows up to 68.1% of LLM-generated tests may "validate bugs" due to the "intent gap."

Explain what the intent gap means. Why do LLM-generated tests often pass for buggy code? How should developers review AI-generated assertions?

---

## Question 11: Chaos Engineering

Netflix runs Chaos Monkey during business hours to randomly terminate production instances.

Explain the difference between resilience testing and chaos engineering. Why is discovering unknown weaknesses valuable before customers do?

---

## Question 12: AI Agent Trust Tiers

The trust tier framework (T0-T3) governs AI agent autonomy, from observational (T0) to full autonomy (T3).

What are the requirements for an AI agent to reach T3? Why does research show a 37.6% increase in vulnerabilities when AI iterates without human gates?

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Test pyramid & coverage | Q1, Q2 |
| Code review practices | Q3, Q4 |
| CI/CD & deployment | Q5 |
| SRE fundamentals (SLO, budgets) | Q6, Q7 |
| Monitoring & on-call | Q8, Q9 |
| AI/LLM in quality | Q10, Q12 |
| Chaos engineering | Q11 |
