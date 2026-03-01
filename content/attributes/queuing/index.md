---
title: Queuing Theory
parent: Quality Attributes
has_children: true
nav_order: 4
layout: default
---

# Queuing Theory for Software Quality

Queuing theory provides the mathematical framework for understanding **why systems slow down under load** and **how to predict when they will fail**. Every software system is a network of queues — from thread pools and connection pools to message brokers and load balancers. Understanding queuing behavior is essential for performance engineering, capacity planning, and SLA management.

---

## Origins and Foundations

Queuing theory began with Agner Krarup Erlang's 1909 study of telephone exchange congestion {% cite erlang1909theory %}. His work showed that service quality depends on the statistical relationship between arrival rates and service capacity — a principle that applies to any system where demand competes for limited resources.

In 1953, David Kendall created the **universal notation** for classifying queuing systems {% cite kendall1953stochastic %}, and in 1961, John Little proved the law that connects every performance metric {% cite little1961proof %}:

**L = &lambda;W**

The average number of items in a system (L) equals the arrival rate (&lambda;) times the average time each item spends in the system (W). This holds regardless of arrival distributions, number of servers, or queue discipline {% cite little2008littles %}.

---

## Kendall Notation: The Language of Queuing Theory

Kendall notation classifies queuing systems using a six-position descriptor {% cite kendall1953stochastic %}:

| Position | Meaning | Common Values |
|----------|---------|---------------|
| **a** | Arrival process | M (Markov/Poisson), G (General), D (Deterministic) |
| **s** | Service time distribution | M (Exponential), G (General), D (Deterministic) |
| **m** | Number of servers | 1, c, &infin; |
| **b** | Buffer/queue capacity | K (finite), &infin; (default) |
| **N** | Population size | Finite or &infin; (default) |
| **Q** | Service discipline | FIFO (default), LIFO, PS |

Common shorthand omits the last three positions when they take default values (infinite buffer, infinite population, FIFO). A web server handling requests with exponential inter-arrival and service times, 4 CPU cores, and a bounded request queue of 100 could be modeled as **M/M/4/104**.

---

## Why Queuing Theory Matters for Software Quality

### The Hockey Stick Curve

The most important insight from queuing theory is the **non-linear relationship** between utilization and response time {% cite sharma2007queuing %}:

For an M/M/1 queue: **R = S / (1 - U)**

Where R is response time, S is service time, and U is utilization. This produces the characteristic "hockey stick" curve:

| Utilization | Response Time (× service time) | Character |
|-------------|-------------------------------|-----------|
| 30% | 1.4× | Comfortable |
| 50% | 2.0× | Acceptable |
| 70% | 3.3× | **Threshold** |
| 80% | 5.0× | Warning |
| 90% | 10.0× | Danger |
| 95% | 20.0× | Crisis |

Liu recommends keeping CPU utilization below 70% to ensure response times do not exceed 3× the base service time {% cite liu2011performance %}. Gunther warns that systems operating past the "knee" are unstable and prone to cascading failures {% cite gunther2007guerrilla %}.

### From Theory to Practice

Queuing theory connects to software quality through three practical applications:

1. **[Operational Laws](operational-laws.md)** — Measurable relationships between throughput, utilization, and response time
2. **[Queuing Models](models.md)** — Mathematical models for single queues and queuing networks (MVA)
3. **[Applications](applications.md)** — Capacity planning, cloud scaling, and tail latency management

---

## Sub-Pages

| Page | Content |
|------|---------|
| [Operational Laws](operational-laws.md) | The six operational laws, bottleneck identification, service demand |
| [Queuing Models](models.md) | M/M/1, M/M/c, queuing networks, Mean-Value Analysis |
| [Applications](applications.md) | Capacity planning, cloud queuing, tail latency, simulation tools |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
