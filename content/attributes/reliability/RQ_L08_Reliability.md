---
title: "Revision Questions: Software Reliability"
parent: Reliability
nav_order: 100
layout: default
---

# Software Reliability — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Part 1: Foundations

### Q1: Fault → Error → Failure in Practice

Choose **one** of the following real-world failures and trace it through the full fault → error → failure chain:

- CrowdStrike 2024 (8.5M devices bricked)
- Meta/Facebook 2021 (6-hour global outage)
- Boeing 737 MAX (MCAS system, 346 deaths)

For your chosen case: (a) identify the **fault** (what was wrong in the design/code), (b) describe the **error** (what incorrect internal state occurred), and (c) explain the **failure** (what users observed).

---

### Q2: Hardware vs Software Reliability

Explain why the "bathtub curve" (infant mortality → useful life → wear-out) applies to hardware but **not** to software.

What does the software reliability curve look like instead, and why?

---

## Part 2: Failure Severity Classification

### Q3: Define FSC for a Scenario

You are the quality lead for a **hospital patient portal** that allows patients to view test results, book appointments, and message their doctors.

Define a 4-class Failure Severity Classification for this system. For each class, provide:
- The severity definition
- A concrete failure example
- Which FSC criterion you chose (cost, capability, or human life) and why

---

## Part 3: Failure Intensity Objectives

### Q4: Calculate FIO from Availability

A payment processing system requires **99.9% availability**. Average downtime per failure is **2 minutes** (0.033 hours).

Using the **exact formula**, calculate:
1. The maximum allowed failure intensity (λ)
2. The MTTF
3. How many failures per month (720 hours) this allows

---

### Q5: When Metrics Mislead

Explain a scenario where:
1. **Failure density** (failures per KLOC) makes a module look safe, but **failure intensity** reveals a serious problem
2. **Failure intensity** looks acceptable, but the system is actually unreliable for users

---

## Part 4: Fault Tolerance Strategies

### Q6: Prevention vs Tolerance

Compare **fault prevention** and **fault tolerance** as strategies for meeting FIO.

For each, explain: (a) when it is more cost-effective, (b) give a concrete software example, and (c) identify its main limitation.

---

### Q7: Backward Recovery and the Domino Effect

Explain **backward recovery** and the **domino effect** using the following scenario:

> Service A processes an order, sends a "ship item" message to Service B, then fails.

What happens when Service A rolls back? Why is this called the "domino effect"? How would **forward recovery** handle this differently?

---

### Q8: SRGM Release Decision

A system under test has the following Goel-Okumoto parameters:
- a = 80 faults (total expected)
- b = 0.03 per week (detection rate per fault)

The FIO target is **1.0 failure per week**.

1. What is the initial failure intensity λ(0)?
2. After 20 weeks of testing, what is λ(20)?
3. How many total weeks of testing are needed to reach the FIO?
4. How many faults will have been found by release time?

---

## Part 5: Redundancy & Independence

### Q9: Why Independence Fails

Knight & Leveson's 1986 experiment found **29× more coincident failures** than the independence assumption predicts.

1. Describe the experimental setup (what was tested, how many versions, how many test cases)
2. List the **three causes** of correlated failures they identified
3. Explain why this result is devastating for the theoretical reliability claims of N-version programming

---

### Q10: Voting System Reliability

Three independently developed versions have individual reliability R_c = 0.95.

1. Calculate the system reliability with **majority voting** (2-of-3)
2. Calculate the system reliability with a **single version** (no redundancy)
3. Now assume failures are NOT independent: 10% of failures are coincident (all 3 fail together). Re-estimate the effective system reliability.

---

## Part 6: SLO & Error Budgets

### Q11: Error Budget Calculation

A video streaming service has:
- SLO: 99.95% availability
- Monthly traffic: 50,000,000 requests
- Current month's incidents: two outages totaling 8 minutes, plus a degraded-quality period causing 5,000 errors

Calculate:
1. The monthly error budget (in requests and in minutes)
2. How much budget has been consumed
3. What action should the team take?

---

### Q12: FIO vs SLO — Same Concept, Different Phase

Explain how Musa's Failure Intensity Objective (1990s) and Google's Service Level Objective (2010s) represent the **same fundamental concept** applied in different contexts.

For each of the following pairs, explain the equivalence:
1. FIO ↔ SLO
2. Failure intensity λ(t) ↔ Error rate SLI
3. "Just right" reliability ↔ Error budget

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Fault-Error-Failure Chain & Real-World Failures | Q1, Q2 |
| Failure Severity Classification | Q3 |
| Failure Intensity Objective & Availability | Q4, Q5 |
| Fault Tolerance Strategies | Q6, Q7 |
| Software Reliability Growth Models | Q8 |
| Redundancy, Voting & Independence | Q9, Q10 |
| SLO & Error Budgets | Q11, Q12 |
