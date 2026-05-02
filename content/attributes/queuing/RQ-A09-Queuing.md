---
title: "Revision Questions: Queuing Theory"
parent: Queuing Theory
nav_order: 100
layout: default
---

# Queuing Theory — Revision Questions

**Format:** 30 questions covering conceptual understanding and problem-solving. All answers are hidden — click to reveal. Use alongside the [Study Notes](SN-A09-Queuing.md) for detailed explanations.

---

## Part 1: Why Queues Matter

### Q1: Why does variability cause queuing?
Two systems both have average arrival rate λ = 1 req/min and average service rate μ = 1 req/min. System A has deterministic (fixed) interarrival and service times. System B has stochastic (random) times. Which system queues, and why?

<details markdown="1"><summary>Answer</summary>

System A never queues — arrivals and departures are perfectly synchronized, so there is always exactly 1 request in the system.

System B queues despite the same average rates. Random variation means some interarrival gaps are shorter than the service time, creating temporary bursts that outpace service. The queue peaks at 3 in the lecture example, even though λ = μ on average.

**Key insight:** Queuing is driven by variability, not by average load.
</details>

### Q2: Identify the queues
A food delivery app receives orders from users, dispatches them to restaurants, and assigns delivery drivers. Identify at least three queues in this system and classify each as open or closed.

<details markdown="1"><summary>Answer</summary>

1. **Order queue** (user → restaurant): orders arrive externally, get processed → **open network**
2. **Kitchen queue** (orders waiting to be cooked): orders arrive, food departs → **open network**
3. **Driver dispatch queue** (orders waiting for driver assignment): if the driver pool is fixed (e.g., 50 active drivers who recirculate after delivery) → **closed network** with M = 50

Other valid answers: payment processing queue, notification queue, rating/review queue.
</details>

### Q3: Economic inevitability
Explain why "infinite capacity is infinitely expensive" makes queues unavoidable. Give an example where over-provisioning would be wasteful.

<details markdown="1"><summary>Answer</summary>

Provisioning for peak demand means resources sit idle during off-peak. Example: a university Moodle server sized for 5000 concurrent exam submissions would need massive hardware, but exams only happen a few times per semester. During normal usage, 99% of that capacity is wasted.

The economic optimum is to provision for typical load + some headroom, accept that queues will form during peaks, and manage response time through the hockey stick curve (stay below 75% utilization).
</details>

### Q4: When does queuing theory NOT help?
Name a performance scenario where queuing theory models would be a poor choice and explain why.

<details markdown="1"><summary>Answer</summary>

Queuing theory is a poor fit when:
- **Arrivals are highly correlated** (e.g., flash crowd from a viral tweet) — violates the homogeneity assumption
- **Service times depend on queue length** (e.g., garbage collection pauses that worsen under load) — violates homogeneity
- **The system has complex state-dependent routing** (e.g., circuit breakers, retry storms) — analytical models can't capture the feedback loops; simulation is needed

In these cases, simulation (e.g., JMT) or load testing gives better results than analytical formulas.
</details>

---

## Part 2: Modeling Systems as Queues

### Q5: Kendall notation
Classify each system using Kendall notation (A/B/C):

a) A web server with a single-threaded event loop processing requests with exponential interarrival and service times
b) A toll booth with deterministic 15-second service time and random arrivals
c) A call center with 8 agents taking calls from a queue

<details markdown="1"><summary>Answer</summary>

a) **M/M/1** — exponential arrivals (M), exponential service (M), 1 server
b) **M/D/1** — exponential arrivals (M), deterministic service (D), 1 server
c) **M/M/8** — exponential arrivals (M), exponential service (M), 8 servers (agents)
</details>

### Q6: Open vs closed
Your company runs an internal CI/CD system. 20 developers push commits throughout the day. Each push triggers a build that takes ~5 minutes. After seeing the build result, the developer works for ~30 minutes before pushing again. Is this an open or closed system? What is M and Z?

<details markdown="1"><summary>Answer</summary>

This is a **closed system**:
- M = 20 developers (fixed population that recirculates)
- Z = 30 minutes (think time — time between seeing build result and next push)
- S ≈ 5 minutes (service time per build)

It's closed because the same 20 developers cycle through: push → wait for build → work → push again. The arrival rate is not independent of the system — it's determined by M, R, and Z.
</details>

### Q7: Kendall notation — advanced
A Kubernetes cluster auto-scales between 2 and 10 pods. Requests arrive with general (non-exponential) interarrival times. The cluster has a buffer queue that holds at most 100 pending requests. What is the Kendall notation?

<details markdown="1"><summary>Answer</summary>

**G/M/m/m+r** where:
- G = general interarrival distribution
- M = exponential service (assuming)
- m = 2–10 (dynamic server count)
- m+r = m + 100 (system capacity = servers + buffer)

In practice, this is modeled as M/G/m/m+r {% cite khazaei2012cloud %} because the auto-scaling behavior makes the exact notation context-dependent. The key point is that it's a finite-capacity system.
</details>

### Q8: Queue configurations
A hospital emergency room has a triage nurse who assigns patients to one of three priority levels (critical, urgent, routine). Two doctors treat patients, always taking the highest-priority patient first. What queue configuration is this?

<details markdown="1"><summary>Answer</summary>

**Multiple prioritized queues, multiple servers (MQMS)** — 3 priority queues feeding 2 servers (doctors) with preemptive priority discipline. In Kendall notation: roughly M/G/2 with priority scheduling.
</details>

### Q9: Method selection
You're asked to predict response times for a new microservice that hasn't been built yet. You know the expected service demands from a prototype. The system will serve a fixed pool of 500 mobile app users. Which analysis method should you use?

<details markdown="1"><summary>Answer</summary>

**Mean Value Analysis (MVA)** — you have a closed system (M = 500 users) with known service demands but no measurement data from production. Operational analysis requires real measurements, and simulation is overkill when MVA can solve the closed network analytically.

If the system had complex routing or priority queues, you'd use **simulation** instead.
</details>

---

## Part 3: Measurement

### Q10: Derive metrics from counters
You monitor a Redis cache server for T = 120 seconds. During this window: A = 6000 requests arrive, C = 6000 complete, and the server was busy for B = 48 seconds. Calculate all six derived metrics.

<details markdown="1"><summary>Answer</summary>

| Metric | Formula | Calculation | Result |
|--------|---------|-------------|--------|
| λ | A/T | 6000/120 | **50 req/sec** |
| X | C/T | 6000/120 | **50 req/sec** |
| S | B/C | 48/6000 | **8 ms/req** |
| U | B/T | 48/120 | **40%** |

For N and R we need W (time in system), which isn't given directly. But we can derive R from the M/M/1 formula if we assume exponential service:

R = S/(1−ρ) = 0.008/(1−0.4) = **13.3 ms**
N = X × R = 50 × 0.0133 = **0.67 requests** in system

**Sanity check (Little's Law):** N = X × R = 50 × 0.0133 = 0.67 ✓
</details>

### Q11: Counter identification
A DevOps engineer says: "Our API gateway processed 45,000 requests in the last 15 minutes. The p50 latency is 120ms and the server CPU was at 65% during that window." Map these to the five counters (T, A, C, W, B).

<details markdown="1"><summary>Answer</summary>

| Statement | Counter | Value |
|-----------|---------|-------|
| "last 15 minutes" | T | 900 sec |
| "45,000 requests" | A (and likely C, if flow balance holds) | 45,000 |
| "p50 latency 120ms" | Related to R (= W/C), but this is a percentile, not the sum W | Need conversion |
| "CPU at 65%" | U = B/T → B = U × T | B = 0.65 × 900 = 585 sec |

**Missing:** W (total time in system) is not directly available from p50 latency. If we approximate R ≈ 120ms (median ≈ mean for exponential), then W ≈ R × C = 0.12 × 45,000 = 5,400 req-sec. But this is an approximation — p50 ≠ mean for skewed distributions.
</details>

### Q12: Assumption violations
You observe A = 10,000 and C = 9,200 over a 5-minute window. Which assumption is violated? What could cause this? How would you fix the analysis?

<details markdown="1"><summary>Answer</summary>

**Flow balance** is violated: A − C = 800 requests were lost or are still in the system.

Possible causes:
- Server crashed or restarted during observation (requests lost)
- Observation window is too short relative to service time (requests still being processed)
- Requests are being dropped by a finite buffer

**Fix:** Either (1) extend the observation period until A ≈ C, or (2) if the system is lossy, model it with a finite-buffer queue (M/M/c/K) and account for rejection probability.

Rule of thumb: observation period should be 10–100× the average busy period.
</details>

### Q13: System vs resource level
You have system-level measurements: X = 100 req/sec, R = 50ms. You also know the app server visits the database V = 3 times per request. Using the Forced Flow Law, what is the database throughput?

<details markdown="1"><summary>Answer</summary>

**Forced Flow Law:** X_db = V_db × X = 3 × 100 = **300 queries/sec**

The database sees 3× more traffic than the front-end. This is why databases often become bottlenecks — the visit ratio amplifies system-level load.
</details>

### Q14: Worked example — full pipeline
A Moodle API server is monitored for T = 60 sec during an exam. Counters: B = 36 sec, A = C = 1800. Derive S, U, X, and estimate R using M/M/1 formula. Perform a Little's Law sanity check.

<details markdown="1"><summary>Answer</summary>

**Step 1 — Derived metrics:**
- S = B/C = 36/1800 = **0.02 sec = 20 ms/req**
- U = B/T = 36/60 = **0.60 = 60%**
- X = C/T = 1800/60 = **30 req/sec**

**Step 2 — Response time (M/M/1):**
R = S/(1−ρ) = 0.02/(1−0.6) = 0.02/0.4 = **0.05 sec = 50 ms**

**Step 3 — Little's Law sanity check:**
N = X × R = 30 × 0.05 = **1.5 requests** in system ✓

At 60% utilization, the server is moderately loaded. Response time is 2.5× service time. If load increases to 90% utilization, R would jump to 0.02/(1−0.9) = **200 ms** — a 4× increase from a 50% load increase.
</details>

---

## Part 4: The Five Laws

### Q15: Little's Law — basic
A coffee shop serves X = 2 customers/min with average visit time R = 10 min. How many customers are in the shop on average?

<details markdown="1"><summary>Answer</summary>

**Little's Law:** N = X × R = 2 × 10 = **20 customers**

This holds regardless of how many baristas, the queue discipline, or whether arrivals are random or scheduled. The only requirement is flow balance (customers eventually leave).
</details>

### Q16: Little's Law — reverse
Your monitoring shows an average of N = 4.5 requests in the system and throughput X = 1.5 req/sec. What is the average response time?

<details markdown="1"><summary>Answer</summary>

**Little's Law rearranged:** R = N/X = 4.5/1.5 = **3 seconds**
</details>

### Q17: Little's Law — consistency check
You measure X = 200 req/sec, R = 25 ms, and N = 10 requests in system. Are these measurements consistent?

<details markdown="1"><summary>Answer</summary>

**Check:** N = X × R = 200 × 0.025 = **5.0**

But measured N = 10. This is **inconsistent** — N should be 5, not 10.

Possible causes:
- R measurement is wrong (e.g., measuring only server time, not including queue wait)
- N measurement includes requests in a different part of the system (boundary mismatch)
- Measurement tools are sampling different time windows

Little's Law is a tautology — if the numbers don't match, the measurements are wrong, not the law {% cite little1961proof %}.
</details>

### Q18: Utilization Law
A database server has service demand D = 40 ms/txn and the system throughput is X = 20 txn/sec. What is the database utilization? If there are 2 database replicas, what is the per-replica utilization?

<details markdown="1"><summary>Answer</summary>

**Single server:** U = X × D = 20 × 0.04 = **0.80 = 80%** — dangerously close to the hockey stick!

**With 2 replicas:** U = X × D / m = 20 × 0.04 / 2 = **0.40 = 40%** — comfortable headroom.

Adding one replica drops utilization from 80% to 40%, dramatically improving response time (from 5×S to 1.67×S using the hockey stick formula).
</details>

### Q19: Service Demand — bottleneck identification
A web application has three resources with the following per-transaction demands:

| Resource | Visits (V) | Service time per visit (S) |
|----------|-----------|---------------------------|
| Nginx | 1 | 2 ms |
| App server | 1 | 12 ms |
| PostgreSQL | 5 | 6 ms |

Find the service demand for each resource, identify the bottleneck, and calculate the maximum system throughput.

<details markdown="1"><summary>Answer</summary>

**Step 1 — Service demands (D = V × S):**
- D_nginx = 1 × 2 = **2 ms**
- D_app = 1 × 12 = **12 ms**
- D_postgres = 5 × 6 = **30 ms** ← D_max

**Step 2 — Bottleneck:** PostgreSQL (highest D)

**Step 3 — Maximum throughput:**
X_max = 1/D_max = 1/0.030 = **33.3 TPS**

No amount of Nginx or app server optimization can push throughput past 33.3 TPS. To improve, reduce PostgreSQL demand: add caching (reduce V from 5 to 2), optimize queries (reduce S), or add read replicas.
</details>

### Q20: Forced Flow Law
System throughput is X = 10 txn/sec. Each transaction visits the cache V_cache = 8 times and the database V_db = 2 times. What is the throughput at each resource?

<details markdown="1"><summary>Answer</summary>

**Forced Flow Law:** X_k = V_k × X

- X_cache = 8 × 10 = **80 queries/sec**
- X_db = 2 × 10 = **20 queries/sec**

The cache handles 4× more traffic than the database. This is the whole point of caching — redirect visits away from the slow resource to reduce its demand.
</details>

### Q21: Utilization Law — what-if analysis
Current state: X = 0.45 txn/sec, D_postgres = 32 ms, U_postgres = 1.44%. You add a caching layer that reduces PostgreSQL visits from V = 4 to V = 1 (cache handles the other 3). What is the new D_postgres and U_postgres?

<details markdown="1"><summary>Answer</summary>

**New service demand:**
D_postgres = V × S = 1 × 8 ms = **8 ms** (was 32 ms)

**New utilization:**
U_postgres = X × D = 0.45 × 0.008 = **0.36%** (was 1.44%)

Utilization dropped by 4× because the visit count dropped by 4×. The caching layer didn't change service time S — it reduced the number of visits V, which is often the more effective optimization.
</details>

### Q22: Combined laws
A system has X = 50 txn/sec. The app server has D_app = 15 ms and the DB has D_db = 25 ms. Calculate: (a) utilization of each, (b) the bottleneck, (c) max throughput, and (d) what happens if you double the DB service time.

<details markdown="1"><summary>Answer</summary>

**(a) Utilization:**
- U_app = X × D_app = 50 × 0.015 = **75%**
- U_db = X × D_db = 50 × 0.025 = **125%** — **impossible!** Utilization can't exceed 100%.

This means the system **cannot sustain** X = 50 txn/sec. The actual throughput is capped by the bottleneck.

**(b) Bottleneck:** Database (D_db = 25 ms > D_app = 15 ms)

**(c) Max throughput:** X_max = 1/D_max = 1/0.025 = **40 TPS**

At 40 TPS: U_db = 40 × 0.025 = 100%, U_app = 40 × 0.015 = 60%.

**(d) If DB service time doubles:** D_db = 50 ms, X_max = 1/0.050 = **20 TPS** — throughput halves.
</details>

---

## Part 5: Response Time Under Load

### Q23: Hockey stick calculation
A server has service time S = 10 ms. Calculate response time at utilization levels of 50%, 80%, 90%, and 95%.

<details markdown="1"><summary>Answer</summary>

Using R = S/(1−ρ):

| ρ | R = 10/(1−ρ) | R/S multiplier |
|---|-------------|---------------|
| 50% | 10/0.5 = **20 ms** | 2× |
| 80% | 10/0.2 = **50 ms** | 5× |
| 90% | 10/0.1 = **100 ms** | 10× |
| 95% | 10/0.05 = **200 ms** | 20× |

Going from 80% to 95% utilization (a modest 19% increase in load) causes a 4× increase in response time (50ms → 200ms). This is the hockey stick effect.
</details>

### Q24: Hockey stick — SLA compliance
Your SLA requires response time R ≤ 100 ms. Service time S = 15 ms. What is the maximum utilization you can tolerate?

<details markdown="1"><summary>Answer</summary>

**Rearrange:** R = S/(1−ρ) → 1−ρ = S/R → ρ = 1 − S/R

ρ = 1 − 15/100 = 1 − 0.15 = **85%**

You must keep utilization below 85% to meet the SLA. In practice, you'd target 70–75% to leave headroom for traffic spikes.
</details>

### Q25: Tail latency
Your microservice architecture fans out each user request to 50 backend services in parallel. Each service has a 2% probability of being slow (>500ms). What is the probability that any given user request experiences a slow response?

<details markdown="1"><summary>Answer</summary>

**Tail amplification formula:** P(any slow) = 1 − (1 − p)^N

P(any slow) = 1 − (1 − 0.02)^50 = 1 − (0.98)^50

(0.98)^50 = 0.364

P(any slow) = 1 − 0.364 = **63.6%**

Nearly two-thirds of user requests will experience a slow response, even though each individual service is slow only 2% of the time {% cite dean2013tail %}. This is why distributed systems must optimize tail latency (p99), not average latency.
</details>

### Q26: Interactive system sizing
An online IDE has think time Z = 45 sec (editing code), service time S = 2 sec (compile + run), target utilization ρ ≤ 70%, target response R ≤ 5 sec. How many concurrent developers can use it?

<details markdown="1"><summary>Answer</summary>

**Step 1 — Max throughput:**
X = ρ/S = 0.70/2 = **0.35 txn/sec**

**Step 2 — Interactive Response Time Law:**
M = X × (R + Z) = 0.35 × (5 + 45) = 0.35 × 50 = **17.5 → 17 developers**

Beyond 17 concurrent users, either response time exceeds 5 sec or utilization exceeds 70%.

**Verification with Little's Law:**
N = X × R = 0.35 × 5 = 1.75 requests in system ✓ (reasonable for 17 users)
</details>

### Q27: Adding servers — cost analysis
Continuing Q26: management wants to support 50 developers. How many servers are needed?

<details markdown="1"><summary>Answer</summary>

With 1 server: 17 developers.

Needed: 50 / 17 ≈ 3 servers (with the simplifying assumption that load distributes evenly).

With c servers, max throughput = c × (ρ/S) = c × 0.35 txn/sec.
M = c × 0.35 × (R + Z)

For M = 50: c = 50 / (0.35 × 50) = 50/17.5 = **2.86 → 3 servers**

Three servers support ~52 developers.
</details>

### Q28: Response time decomposition
A request goes through three resources in sequence: Nginx (D = 3 ms), App server (D = 20 ms), PostgreSQL (D = 15 ms). System throughput is X = 30 txn/sec. Calculate the response time at each resource and the total system response time.

<details markdown="1"><summary>Answer</summary>

**Step 1 — Utilization at each resource:**
- U_nginx = X × D = 30 × 0.003 = 9%
- U_app = 30 × 0.020 = 60%
- U_postgres = 30 × 0.015 = 45%

**Step 2 — Response time at each (M/M/1):**
- R_nginx = D/(1−U) = 0.003/(1−0.09) = **3.3 ms**
- R_app = 0.020/(1−0.60) = **50 ms**
- R_postgres = 0.015/(1−0.45) = **27.3 ms**

**Step 3 — Total (sequential):**
R_total = 3.3 + 50 + 27.3 = **80.6 ms**

The app server contributes 62% of the total response time despite having only 60% utilization. It's the bottleneck (highest D), and optimizing it yields the most improvement.
</details>

---

## Part 6: From Theory to Practice

### Q29: Performance engineering workflow
You're tasked with improving a slow checkout page. Using the 7-step performance engineering workflow, describe what you would do at each step.

<details markdown="1"><summary>Answer</summary>

1. **Build:** The checkout page already exists — instrument it with counters
2. **Measure:** Collect T, A, C, B from HTTP logs and Prometheus for each component (web, API, payment gateway, DB) over a 10-minute peak window
3. **Derive:** Calculate X, U, S, R for each resource. Build a service demand table
4. **Model:** Apply Utilization Law to find D_max → identify the bottleneck. Use Forced Flow Law to understand visit ratios
5. **Predict:** "What if we add a cache?" → recalculate D with reduced V for DB. "What if traffic doubles?" → check if any U exceeds 75%
6. **Validate:** Deploy the cache, measure again, compare actual vs predicted improvement
7. **Refine:** If prediction was off, investigate — maybe the model missed a resource (network? external API?). Add more counters, iterate
</details>

### Q30: When to simulate
Your team is debating whether to use analytical models or simulation for a new message queue system with the following characteristics: 3 priority levels, finite buffer of 1000 messages, batch processing (consumer pulls 10 messages at a time), and variable consumer count (auto-scaling). Which approach would you recommend, and why?

<details markdown="1"><summary>Answer</summary>

**Simulation** is the right choice here. The system has multiple features that violate standard analytical model assumptions:

1. **3 priority levels** — analytical priority queue formulas exist for M/M/c with preemptive priority, but they become complex and require distributional assumptions
2. **Finite buffer** — M/G/m/m+r models exist but are harder to solve analytically
3. **Batch processing** — pulling 10 messages at a time creates correlated service, which standard models don't handle
4. **Auto-scaling** — dynamic server count violates the steady-state assumption

Use JMT or a custom discrete-event simulation. Validate the simulation against a simplified analytical model (e.g., M/M/c for the base case without priorities or batching) to build confidence.
</details>

---

## Key Formulas Reference Card

| Law | Formula | Variables |
|-----|---------|-----------|
| **Little's Law** | N = X × R | N = number in system, X = throughput, R = response time |
| **Utilization Law** | U = X × D | U = utilization, D = service demand |
| **Service Demand** | D = V × S | V = visit count, S = service time per visit |
| **Forced Flow** | Xₖ = Vₖ × X | Xₖ = resource throughput, Vₖ = visit ratio |
| **Interactive Response** | R = M/X − Z | M = users, Z = think time |
| **Hockey Stick** | R = S/(1−ρ) | M/M/1 only |
| **Bottleneck** | X_max = 1/D_max | Max throughput = inverse of largest demand |
| **Tail Latency** | P(any slow) = 1−(1−p)^N | p = per-server slow probability, N = servers |

---

## Key Terms Glossary

| Term | Definition |
|------|------------|
| **λ (lambda)** | Arrival rate — requests per time unit |
| **μ (mu)** | Service rate — completions per time unit per server |
| **ρ (rho)** | Utilization — fraction of time a server is busy (= λ/μ or B/T) |
| **Throughput (X)** | Completions per time unit = C/T |
| **Service demand (D)** | Total service time a transaction requires from a resource = V × S |
| **Think time (Z)** | Time a user spends between receiving a response and sending the next request |
| **D_max** | The highest service demand among all resources — identifies the bottleneck |
| **Hockey stick** | Non-linear R = S/(1−ρ) curve where response time explodes near 100% utilization |
| **Flow balance** | Assumption that arrivals ≈ completions over the observation period |
| **Operational analysis** | Performance analysis using measured counters, no distribution assumptions |
| **Kendall notation** | A/B/C/K/m/Z classification for queuing systems |
| **Tail latency** | Response time at high percentiles (p90, p99) that affect real user experience |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
