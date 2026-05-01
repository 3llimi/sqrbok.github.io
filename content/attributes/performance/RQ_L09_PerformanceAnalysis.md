---
title: "Revision Questions: Performance Analysis"
parent: Performance
nav_order: 100
layout: default
---

# Performance Analysis — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Part 1: Performance Fundamentals

### Q1: Business Impact of Latency

A cloud-based e-commerce platform processes 50,000 orders per day with an average order value of $80. The platform's current average response time is 1.2 seconds.

A proposed infrastructure upgrade would reduce response time to 0.4 seconds, but costs $200,000/year. Using the "100ms latency = 1% sales" rule of thumb:

1. Estimate the annual revenue impact of the 800ms improvement
2. Is the infrastructure investment justified?
3. What assumptions make this calculation unreliable?

---

### Q2: Performance Engineering vs Testing

Explain why finding a performance problem during the **design phase** costs 10–100× less than finding it in **production**. Give a concrete example of a performance issue that:

(a) Could have been caught during design review
(b) Was only discovered under production load
(c) Required architectural redesign to fix

---

## Part 2: Performance Metrics

### Q3: Little's Law — Cloud Service

A Kubernetes deployment shows the following metrics during peak hour:
- Average active pod connections: **250**
- Average response time: **125 milliseconds**

1. Calculate the throughput (requests per second)
2. The SRE team wants to reduce response time to 80ms without changing throughput. How many concurrent connections will the system handle?
3. If the team adds a caching layer that reduces response time by 40%, what happens to concurrency at the same throughput? Explain using Little's Law.

---

### Q4: Percentiles vs Averages

Two API endpoints both report **mean response time = 500ms**:

- **Endpoint A:** p50 = 450ms, p90 = 550ms, p99 = 600ms
- **Endpoint B:** p50 = 100ms, p90 = 200ms, p99 = **8000ms**

1. Which endpoint provides a better user experience for the majority of users?
2. Which endpoint is more problematic from an SLA perspective (SLA: p99 < 1000ms)?
3. Wilson recommends reporting the 90th percentile instead of the mean. How would this change the team's priorities?

---

### Q5: Hockey Stick Curve — Three Zones

Sketch the hockey stick curve (from memory) with all three metrics (U, X, R) and the three zones (Light Load, Heavy Load, Buckle Zone).

For each zone, explain:
1. What happens to **Utilization** (U)?
2. What happens to **Throughput** (X)?
3. What happens to **Response Time** (R)?
4. What is the user experience like?

What happens if you add a faster CPU? Draw how the curve shifts.

---

## Part 3: Scalability Laws

### Q6: Amdahl's Law — Optimization Decision

Your application profile shows:
- Database queries: 45% of execution time
- Business logic: 35% of execution time
- Network I/O: 20% of execution time

A new database index would make queries **3× faster** (q = 3).

1. Calculate the overall speedup using Amdahl's Law
2. What is the maximum possible speedup even with infinitely fast queries?
3. A colleague suggests also optimizing network I/O to be 2× faster. If both optimizations are applied, what is the combined speedup?

---

### Q7: Gustafson vs Amdahl — When Each Applies

A data science team runs machine learning training jobs. Their pipeline has two phases:
- **Data loading** (serial): 10 minutes, cannot be parallelized
- **Model training** (parallel): 50 minutes on 1 GPU

1. Using Amdahl's Law with 10 GPUs, what is the expected training time?
2. Under Gustafson's assumption, what could the team accomplish with 10 GPUs in the original 60-minute window?
3. Which law is more appropriate for this scenario and why?

---

### Q8: USL — Diagnosing Retrograde Throughput

A microservice cluster shows the following throughput measurements:

| Instances | Throughput (rps) |
|-----------|-----------------|
| 1 | 100 |
| 2 | 185 |
| 4 | 330 |
| 8 | 500 |
| 16 | 450 |
| 32 | 320 |

1. What USL parameter (α or β) is likely causing the degradation?
2. Explain physically what is happening as instances increase beyond 8
3. What architectural change would you propose to address this?
4. Why does simply "adding more servers" make the problem worse?

---

## Part 4: Risk & Anti-Patterns

### Q9: Identify the Anti-Pattern

For each scenario, identify the performance anti-pattern and propose a fix:

**(a)** A REST API endpoint calls the database once to get a list of 100 user IDs, then makes 100 separate database calls to get each user's profile. Response time is 3 seconds.

**(b)** A single "OrderService" microservice handles order creation, payment processing, inventory management, shipping, and email notifications. During peak load, payment processing latency causes all other operations to queue.

**(c)** An application creates and destroys database connection objects for every request. During a load test, garbage collection pauses cause 2-second latency spikes every 30 seconds.

---

### Q10: Performance Bug Discovery

Jin et al. (2012) found that **67% of performance bugs** are caused by wrong understanding of workload or API, and that profiling discovers only **5–10%** of performance bugs.

1. Why is profiling such a poor method for discovering performance bugs?
2. What method discovers the majority (33–57%) of performance bugs?
3. How would you incorporate this finding into your team's code review process?

---

## Part 5: Performance Testing

### Q11: Test Strategy Design

You are launching a ticket sales platform for a major concert. Expected traffic:
- Normal: 5,000 concurrent users
- On-sale moment: 200,000 concurrent users (40× spike in first 60 seconds)
- Duration: 2-hour sale window

Design a performance test strategy:
1. Which of the 6 test types would you use, and in what order?
2. What specific metrics would you monitor?
3. What does "realistic workload" mean for this scenario?
4. What is the risk if you only run a Load test but skip Stress and Soak tests?

---

## Part 6: Cloud-Era Performance

### Q12: Tail Latency Calculation

A search service fans out each user query to **80 backend shards**. Each shard has a 0.5% probability of responding slowly (>200ms).

1. Calculate the probability that a user query hits at least one slow shard
2. If the team implements **tied requests** (sending each sub-request to 2 shards simultaneously, cancelling the slower reply), what is the new probability of a slow response per sub-request?
3. What is the total cost in terms of additional traffic?
4. How would true **hedged requests** (delayed backup only issued after the 95th-percentile threshold) differ in traffic overhead, and why?

---

### Q13: Per-Service SLO Budget

A three-service call chain has a total SLO of p99 < 400ms:

```
User → API Gateway → Recommendation Engine → Database Service → Response
```

Current measurements:
- API Gateway: p99 = 30ms
- Recommendation Engine: p99 = 280ms
- Database Service: p99 = 50ms
- Total: p99 = 360ms (within SLO)

1. Allocate a per-service SLO budget for each service
2. The Recommendation Engine team wants to add a new ML model that increases their p99 to 350ms. Should this be approved?
3. What trade-off does the team face? How does error budget thinking apply here?

---

### Q14: The Convergence of Classical PE and Cloud-Native

Map each classical performance engineering concept to its cloud-native equivalent:

| Classical PE Concept | Cloud-Native Equivalent |
|---------------------|-------------------------|
| Performance budget per component | ? |
| Budget tracking during development | ? |
| Risk acceptance (some degradation OK) | ? |
| 1–5% project cost for PE activities | ? |
| Queuing theory models | ? |

Explain why Dean & Barroso claim that the "physics hasn't changed" even though the tools and scale are completely different.

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Business impact, PE vs testing | Q1, Q2 |
| Little's Law, percentiles | Q3, Q4 |
| Hockey stick curve (3 zones) | Q5 |
| Amdahl's Law | Q6 |
| Gustafson vs Amdahl | Q7 |
| USL, retrograde throughput | Q8 |
| Performance anti-patterns | Q9 |
| Performance bug empirical evidence | Q10 |
| Performance testing methodology | Q11 |
| Tail latency amplification | Q12 |
| Per-service SLOs | Q13 |
| Classical PE → cloud-native convergence | Q14 |
