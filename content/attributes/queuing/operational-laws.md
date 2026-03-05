---
title: Operational Laws
parent: Queuing Theory
grand_parent: Quality Attributes
nav_order: 1
layout: default
---

# Operational Laws

Operational analysis evaluates system performance using **measured parameters** and established mathematical relationships {% cite denning1978operational %}. Unlike traditional stochastic queuing theory — which requires assumptions about probability distributions (Poisson arrivals, exponential service times) — operational analysis uses counts of events from system instrumentation {% cite hillston2014operational %}.

---

## Stochastic vs. Operational Approach

| Dimension | Stochastic Approach | Operational Approach |
|-----------|-------------------|---------------------|
| **Data basis** | Random variables with probability distributions | Counts of events (completions C, busy time B) |
| **Assumptions** | Strong: Poisson arrivals, exponential service | Testable: job flow balance (A &asymp; C) |
| **Validity** | Steady-state limits of infinite processes | Holds for each finite observation window |
| **Complexity** | Requires deep mathematical background | Simple enough for "back-of-the-envelope" calculations |

The key advantage is that operational laws are **tautologies** — they hold for every observation period by definition {% cite denning1978operational %}. An analyst can always test whether the assumptions hold by examining the measurement data {% cite wilson2008operations %}.

---

## Observed and Derived Parameters

From system instrumentation (perfmon, sar, Prometheus, APM traces), we directly observe five quantities {% cite denning1978operational %}:

| Parameter | Symbol | Definition | How to collect |
|-----------|--------|-----------|----------------|
| Observation period | T | Duration of measurement | Clock |
| Arrivals | A | Total requests entering the system | HTTP logs, load balancer counters |
| Completions | C | Total requests leaving the system | HTTP logs, load balancer counters |
| Time in system | W | Sum of all request durations | APM traces (Jaeger, Datadog) |
| Busy time | B | Time the resource is not idle | Prometheus, `sar`, perfmon |

From these, we derive six performance metrics:

| Parameter | Symbol | Formula |
|-----------|--------|---------|
| Arrival rate | &lambda; | A / T |
| Throughput | X | C / T |
| Utilization | U | B / T |
| Service time | S | B / C |
| Avg. number in system | N | W / T |
| Response time | R | W / C |

**Consistency check:** If A &asymp; C over the observation period (flow balance), then &lambda; &asymp; X.

---

## The Six Operational Laws

Hillston formalizes six laws relating these parameters {% cite hillston2014operational %}, all built on Little's Law as the foundation:

### 1. Little's Law

**N = X &middot; R**

The average number of requests in the system (N) equals throughput (X) times average response time (R) {% cite little1961proof %}. Little's original formulation uses L = &lambda;W; in operational analysis the equivalent form N = X &middot; R is preferred because X and R are directly derived from the five observed counters {% cite denning1978operational %}. The law is distribution-free and requires only job flow balance {% cite little2008littles %}.

### 2. Utilization Law

**U<sub>i</sub> = X &middot; D<sub>i</sub>**

The utilization of resource *i* equals system throughput times the service demand at that resource. When U<sub>i</sub> approaches 1.0 (100%), that resource is the **bottleneck** {% cite hillston2014operational %}.

### 3. Service Demand Law

**D<sub>i</sub> = S<sub>i</sub> &middot; V<sub>i</sub>**

Service demand equals the average service time per visit times the number of visits per transaction {% cite wilson2008operations %}. Service demand is the **most important derived parameter** — it determines bottlenecks, drives MVA recursion, and connects measurements to predictions {% cite denning1978operational %}.

### 4. Forced Flow Law

**X<sub>i</sub> = X &middot; V<sub>i</sub>**

The throughput at resource *i* equals system throughput times the visit count. If a transaction visits the database 5 times, the database throughput is 5&times; the system throughput {% cite hillston2014operational %}.

### 5. Residence Time Law

**W = &Sigma; W<sub>i</sub> &middot; V<sub>i</sub>**

Total response time is the sum of time spent at each resource, weighted by visit counts.

### 6. Interactive Response Time Law

**R = N / X &minus; Z**

For interactive systems with *N* users and think time *Z*, response time equals users divided by throughput minus think time {% cite hillston2014operational %}.

---

## Bottleneck Identification

A resource is the system bottleneck if it has the **largest service demand** D<sub>max</sub> {% cite denning1978operational %}. This resource will reach 100% utilization first and limit total system throughput.

**Maximum throughput bound:**

X<sub>max</sub> = 1 / D<sub>max</sub>

**Example:** A three-tier web application with service demands:

| Resource | Service Demand D<sub>i</sub> |
|----------|------------------------------|
| Web server | 5 ms |
| App server | 15 ms |
| Database | 25 ms |

The database is the bottleneck: D<sub>max</sub> = 25 ms, so X<sub>max</sub> = 1/0.025 = **40 transactions/sec**.

No amount of web or app server optimization will push throughput past 40 TPS until the database service demand is reduced {% cite wilson2008operations %}.

---

## Data Validation with Little's Law

Little's Law serves as a **sanity check** for measurement data {% cite little2011littles %}. If measured throughput and response times do not satisfy N = X &middot; R, the measurements are wrong — not the law.

Common causes of violation:
- **Orphan requests** that overlapped the observation window boundary
- **Counting errors** where arrivals and completions are measured at different points
- **Non-steady-state** measurements during system startup or shutdown

Wilson recommends that changes of less than 10% in derived metrics should be treated as noise, not signal {% cite wilson2008operations %}.

---

## From Operational Laws to Queuing Models

Operational laws tell us about average behavior but not about the **distribution** of response times. For that, we need [queuing models](models.md) — which use the operational parameters (especially service demand D<sub>i</sub>) as inputs to predict response time distributions, queue lengths, and the shape of the hockey stick curve.

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
