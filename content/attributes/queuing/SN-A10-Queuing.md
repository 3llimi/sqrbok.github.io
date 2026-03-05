---
title: "Study Notes: Queuing Theory"
parent: Queuing Theory
nav_order: 99
layout: default
---

# Study Notes: Performance Analysis — Queuing Theory

## Purpose
These study notes cover **queuing theory as a performance engineering tool** — how to model systems as queues, measure their behavior, and predict performance using operational laws. Aimed at MS-level students who need to apply these techniques to diagnose bottlenecks, size systems, and reason about response time under load.

**Primary Sources:**
- Denning & Buzen 1978, "The Operational Analysis of Queueing Network Models" {% cite denning1978operational %}
- Menascé et al. 2004, "Performance by Design" {% cite menasce2004performance %}

**Key Research Papers:**
- Little 1961 {% cite little1961proof %} — proof of L = λW, the most fundamental queuing law
- Kendall 1953 {% cite kendall1953stochastic %} — standard A/B/C/K/m/Z queue classification
- Dean & Barroso 2013 {% cite dean2013tail %} — tail latency amplification in distributed systems
- Gunther 2007 {% cite gunther2007guerrilla %} — practical capacity planning with operational laws

---

## Part 1: Why Queues Matter

### 1.1 Why Queues Form

Queues are **economically inevitable**: infinite capacity is infinitely expensive, and even "excess" capacity gets overwhelmed by variability. The key insight is that **variability, not average load**, causes queuing.

**Deterministic vs Stochastic:**

| System | Interarrival | Service | Queue? |
|--------|-------------|---------|--------|
| Deterministic | Fixed 1 min | Fixed 1 min | Never — always exactly 1 in system |
| Stochastic | {0.5, 1.5} min | {0.5, 1.5} min | Peaks at 3 despite same average rate |

Both systems have identical average rates (λ = μ), but the stochastic system queues because temporary bursts of arrivals outpace service.

### 1.2 What Queuing Theory Predicts

Queuing theory answers six practical questions **without running experiments**:

| Question | Application |
|----------|-------------|
| Average waiting time? | User experience |
| Where is the bottleneck? | Diagnose slowdowns |
| Server utilization? | Resource planning |
| Response time under load? | SLA compliance |
| When to add servers? | Capacity planning |
| Which design is better? | Compare alternatives |

---

## Part 2: Modeling Systems as Queues

### 2.1 Queue Parameters: λ, μ, ρ, c

Every queue has four fundamental parameters:

| Parameter | Symbol | Meaning | Example |
|-----------|--------|---------|---------|
| Arrival rate | λ (lambda) | Requests per time unit | 30 req/sec |
| Service rate | μ (mu) | Completions per time unit | 40 req/sec |
| Utilization | ρ (rho) | Fraction busy = λ/μ | 75% |
| Servers | c | Number of parallel servers | 4 threads |

**Stability condition:** ρ < 1 (or λ < cμ for multi-server). If ρ ≥ 1, the queue grows without bound.

**Rule of thumb:** Stay below 75% utilization for stable, predictable performance {% cite menasce2004performance %}.

### 2.2 Queue Configurations

| Configuration | Description | Real-world Example |
|--------------|-------------|-------------------|
| Single queue, single server (1Q1S) | Basic M/M/1 | Single-threaded handler |
| Single queue, multiple servers (1QMS) | M/M/c | Thread pool serving from one queue |
| Multiple prioritized queues, single server (MQ1S) | Priority scheduling | CPU nice levels, HTTP priority classes |
| Multiple prioritized queues, multiple servers (MQMS) | Most general case | Load balancer with priority routing |

### 2.3 Open vs Closed Networks

| Property | Open Network | Closed Network |
|----------|-------------|---------------|
| Population | Unlimited external arrivals | Fixed N users recirculate |
| Arrival rate | External λ | Determined by N, R, and Z |
| Example | Public API | Moodle exam with 15 students |
| Key law | Little's Law | Interactive Response Time Law |

### 2.4 Kendall Notation: A/B/C/K/m/Z

Kendall notation {% cite kendall1953stochastic %} provides a compact way to describe any queue:

| Position | Symbol | Meaning | Common Values |
|----------|--------|---------|---------------|
| 1st | A | Interarrival distribution | M, D, G |
| 2nd | B | Service time distribution | M, D, G |
| 3rd | C | Number of servers | 1, 2, ... |
| 4th | K | System capacity | ∞ or finite |
| 5th | m | Population size | ∞ or finite |
| 6th | Z | Service discipline | FIFO, LIFO, Priority |

**M** = Exponential (Markov/memoryless), **D** = Deterministic, **G** = General

**Common types in software:**

| Notation | Software Example |
|----------|-----------------|
| M/M/1 | Single-threaded handler |
| M/M/c | Thread pool (c workers) |
| M/D/1 | Fixed-time batch processor |
| M/G/m/m+r | Cloud VM pool (m VMs, r buffer) |
| M/M/1/∞/N | Closed system with N users |

### 2.5 Choosing the Right Method

| Method | When to Use | Assumptions |
|--------|-------------|-------------|
| **Operational Analysis** | Have measurement data | Flow balance, homogeneity |
| **Mean Value Analysis** | Closed networks, known demands | Product-form network |
| **Simulation** | Complex routing, priorities, finite buffers | None (but slow) |

This lecture focuses on **operational analysis** {% cite denning1978operational %} — deriving metrics from observable quantities with no distribution assumptions.

---

## Part 3: Measure, Don't Guess

### 3.1 Operational Analysis vs Traditional Queuing Theory

| Aspect | Traditional QT | Operational Analysis |
|--------|---------------|---------------------|
| Input | Assumed distributions (Poisson, exponential) | Measured event counts |
| Assumptions | Hard to verify | Testable: check A ≈ C |
| Math | Probability theory, Markov chains | Simple arithmetic |
| Output | Exact formulas | Observation-based metrics |

The foundational insight from Denning & Buzen {% cite denning1978operational %}: operational laws are **tautologies** — they hold for every observation period by definition, because they are counting identities, not probabilistic claims.

### 3.2 Five Counters: T, A, C, W, B

Every performance metric is derived from just **five observable counters**:

| Counter | What it measures | How to collect |
|---------|-----------------|----------------|
| **T** | Observation time | Clock |
| **A** | Arrivals (total) | HTTP logs, LB counters |
| **C** | Completions (total) | HTTP logs, LB counters |
| **W** | Time in system (sum) | APM traces (Jaeger, Datadog) |
| **B** | Busy time | Prometheus, `sar`, perfmon |

### 3.3 Six Derived Metrics

From the five counters, derive six performance metrics:

| Metric | Formula | Meaning |
|--------|---------|---------|
| **N** | W / T | Average number in system |
| **λ** | A / T | Arrival rate |
| **X** | C / T | Throughput (completion rate) |
| **S** | B / C | Service time per request |
| **R** | W / C | Response time per request |
| **U** | B / T | Utilization |

**Consistency check:** If A ≈ C over the observation period (flow balance), then λ ≈ X.

### 3.4 Three Testable Assumptions

Operational analysis requires three assumptions {% cite denning1978operational %}:

| Assumption | Meaning | How to Test | When It Breaks |
|------------|---------|-------------|----------------|
| **Flow balance** | A ≈ C over observation | Check A ≈ C | Server crashes: A=500, C=480 |
| **One-step behavior** | No simultaneous events | System design | Batch upload: 50 requests at same ms |
| **Homogeneity** | Rates independent of state | Statistical test | DB cache thrashing under load |

**Practical guidance:** Make the observation period 10–100× the average busy period to ensure flow balance holds.

---

## Part 4: The Five Laws

### 4.1 Little's Law: N = X × R

The most fundamental law in queuing theory {% cite little1961proof %}:

**N = X × R**

- **N** = average number of requests in system
- **X** = throughput (completions per time unit)
- **R** = average response time

N = X × R holds regardless of system type, number of servers, arrival or service distributions, or queue discipline. The only requirement is **flow balance**.

Little's Law is a **consistency check**: if N ≠ X × R from your measurements, the measurements are wrong — not the law.

### 4.2 Utilization Law: U = X × D

**U = X × D**

- **U** = utilization (fraction of time busy)
- **X** = throughput
- **D** = service demand (total time a transaction needs from this resource)

For **m parallel servers:** U = X × D / m

### 4.3 Service Demand Law: D = V × S

**D = V × S**

- **D** = service demand (total time per transaction at a resource)
- **V** = visit count (how many times a transaction visits this resource)
- **S** = service time per visit

Service demand D is the **single most important derived parameter** — it determines bottlenecks, drives capacity predictions, and connects measurements to models {% cite denning1978operational %}.

### 4.4 Bottleneck Analysis via D_max

The **bottleneck** is the resource with the highest service demand:

**X_max = 1 / D_max**

### 4.5 Forced Flow Law: Xₖ = Vₖ × X

**Xₖ = Vₖ × X**

- **Xₖ** = throughput at resource k
- **Vₖ** = visit ratio (visits to resource k per system transaction)
- **X** = system throughput

---

## Part 5: Response Time Under Load

### 5.1 Hockey Stick Curve: R = S/(1 − ρ)

For an M/M/1 queue, response time depends non-linearly on utilization:

**R = S / (1 − ρ)**

| Utilization (ρ) | Response Time |
|-----------------|---------------|
| 50% | 2 × S |
| 75% | 4 × S |
| 90% | 10 × S |
| 99% | 100 × S |

Practical limit: keep utilization below 70–80%.

### 5.2 Tail Latency Amplification

In distributed systems, even rare slow responses become common {% cite dean2013tail %}:

**P(any slow) = 1 − (1 − p)^N**

| Servers (N) | P(any slow) if each has 1% chance |
|-------------|-----------------------------------|
| 1 | 1% |
| 10 | 10% |
| 100 | **63%** |

Report **p90/p99**, not averages. This is especially critical in microservice architectures where a single request fans out to many backends.

### 5.3 Interactive Response Time Law: R = M/X − Z

For **closed systems** with M users:

**R = M / X − Z**

Rearranged for capacity sizing: **M = X × (R + Z)**

### 5.4 Adding Servers: Diminishing Returns

Adding servers to an M/M/c queue shows diminishing returns {% cite hillier2001operations %}:

| Servers (c) | Wait Time Reduction | Students Supported |
|-------------|--------------------|--------------------|
| 1 | baseline | ~15 |
| 2 | −60% | ~30 |
| 3 | −80% | ~45 |
| 4 | −90% | ~60 |

### 5.5 Architecture Patterns as Queues

| Architecture Pattern | Queue Model |
|---------------------|-------------|
| Thread pool | M/M/c |
| API gateway + backends | M/M/c with routing |
| K8s pod auto-scaling | M/G/m/m+r (dynamic m) |
| Message broker (Kafka) | M/G/1 with batch service |
| DB connection pool | M/M/c/c (finite, no buffer) |

Cloud auto-scaling is fundamentally adjusting m based on utilization {% cite khazaei2012cloud %}.

---

## Part 6: From Theory to Practice

### 6.1 When to Simulate

Use simulation (e.g., Java Modelling Tools — JMT) when analytical models are insufficient:
- Complex routing logic
- Non-standard distributions
- Priority schemes
- Finite buffers

### 6.2 Performance Engineering Workflow

1. **Build** the system (or prototype)
2. **Measure** — collect counters: T, A, C, B
3. **Derive** — compute metrics: X, U, R, S
4. **Model** — apply queuing theory (Little's Law, Utilization Law)
5. **Predict** — what-if analysis (more users? faster DB?)
6. **Validate** — compare predictions to reality
7. **Refine** — go back to step 2 with improved instrumentation

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
