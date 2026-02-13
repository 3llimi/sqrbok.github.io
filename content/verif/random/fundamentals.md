---
title: Fundamentals
parent: Random Testing
nav_order: 1
layout: default
---

# Random Testing Fundamentals

Random testing selects test inputs by sampling from input distributions rather than deriving them from code structure or specifications. This section covers the theory, reliability arguments, sampling strategies, and feedback-directed tools that make random testing practical.

---

## What Makes Testing "Random"?

Hamlet distinguishes "random" in the technical sense — statistically independent test selection from a defined distribution — from the slang usage meaning haphazard, unplanned testing {% cite hamlet1984random %}. True random testing requires:

1. **A defined input distribution** (operational profile or uniform)
2. **Statistical independence** between test selections
3. **An oracle** to determine pass/fail for each execution

When these conditions hold, random testing uniquely enables quantitative reliability prediction. When they do not, "not only is random testing counterindicated, but testing of any kind cannot provide a plausible prediction of software quality" {% cite hamlet1984random %}.

---

## Reliability Prediction

The fundamental formula for random testing confidence:

$$
C = 1 - (1-F)^N
$$

Where:
- **C** = confidence that at least one failure would have been observed
- **F** = true failure rate in the operational profile
- **N** = number of successful random tests

**Example**: If the true failure rate is F = 0.001 (1 in 1,000 inputs triggers a bug), how many random tests do we need for 95% confidence we would have seen a failure?

$$
0.95 = 1 - (1 - 0.001)^N \implies N = \frac{\ln(0.05)}{\ln(0.999)} \approx 2{,}996
$$

So ~3,000 successful tests give 95% confidence the failure rate is below 0.1% {% cite hamlet1984random %}.

```vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Confidence vs. Number of Random Tests",
  "width": 450,
  "height": 250,
  "layer": [
    {
      "data": {
        "sequence": {"start": 10, "stop": 5000, "step": 10, "as": "N"}
      },
      "transform": [{"calculate": "1 - pow(1 - 0.01, datum.N)", "as": "C"}],
      "mark": {"type": "line", "color": "#d32f2f", "strokeWidth": 2},
      "encoding": {
        "x": {"field": "N", "type": "quantitative", "title": "Number of Tests (N)"},
        "y": {"field": "C", "type": "quantitative", "title": "Confidence", "scale": {"domain": [0, 1]}},
        "color": {"datum": "F = 0.01 (1 in 100)"}
      }
    },
    {
      "data": {
        "sequence": {"start": 10, "stop": 5000, "step": 10, "as": "N"}
      },
      "transform": [{"calculate": "1 - pow(1 - 0.001, datum.N)", "as": "C"}],
      "mark": {"type": "line", "color": "#1565c0", "strokeWidth": 2},
      "encoding": {
        "x": {"field": "N", "type": "quantitative"},
        "y": {"field": "C", "type": "quantitative"},
        "color": {"datum": "F = 0.001 (1 in 1,000)"}
      }
    },
    {
      "data": {
        "sequence": {"start": 10, "stop": 5000, "step": 10, "as": "N"}
      },
      "transform": [{"calculate": "1 - pow(1 - 0.0001, datum.N)", "as": "C"}],
      "mark": {"type": "line", "color": "#2e7d32", "strokeWidth": 2},
      "encoding": {
        "x": {"field": "N", "type": "quantitative"},
        "y": {"field": "C", "type": "quantitative"},
        "color": {"datum": "F = 0.0001 (1 in 10,000)"}
      }
    },
    {
      "data": {"values": [{"y": 0.95}]},
      "mark": {"type": "rule", "strokeDash": [4, 4], "color": "#757575"},
      "encoding": {"y": {"field": "y", "type": "quantitative"}}
    }
  ],
  "encoding": {
    "color": {"legend": {"title": "Failure Rate"}}
  }
}
```

*Dashed line = 95% confidence threshold. Rarer bugs need exponentially more tests.*

This is the *only* testing method that enables such predictions. Systematic testing cannot make statistical claims because inputs are chosen by design, not by sampling {% cite hamlet1984random %}.

### Limitations

The formula assumes failures are distributed according to the operational profile. In practice {% cite hamlet1984random %}:

- **State collapse**: A single statement like `x := x mod 5` can make many "independent" inputs exercise the same program behavior
- **Profile mismatch**: Predictions valid for one usage profile may be "arbitrarily incorrect" for another
- **Unit testing paradox**: The formula predicts the same reliability for 20-line and 200,000-line programs tested with the same N

---

## The Random vs. Partition Debate

### The Evidence

Duran and Ntafos launched the debate with simulations showing random testing found more errors per unit cost in 14-37 out of 50 trials, with a mean detection ratio of 0.932-0.949 compared to partition testing {% cite duran1984evaluation %}. On real programs, random testing achieved 97% statement coverage and 93% branch coverage with only 20-120 test cases.

Hamlet showed mathematically that roughly 20% more random tests eliminate any partition testing advantage {% cite hamlet1984random %}.

Ntafos resolved the debate by demonstrating that proportional partition testing's theoretical guarantee becomes self-defeating: as test count increases to achieve proportional allocation, the advantage shrinks below 0.05% {% cite ntafos2001comparisons %}. Cost and relative effectiveness factors — ignored in prior studies — can easily reverse conclusions about strategy superiority.

### When Only Random Will Do

Hamlet identified two scenarios where random testing is not just acceptable but *necessary* {% cite hamlet2006random %}:

1. **Large unstructured input spaces** where no rational partitioning exists
2. **State-dependent systems** where valid tests must be sequences from reset — individual state samples may be infeasible because "the actual feasible system states are not the cross product of the feasible module states"

### Cost-Weighted Considerations

When failure costs vary across subdomains, partition testing gains a stronger advantage because random testing "has no way to tune itself to the cost factors" {% cite tsoukalas1993reliability %}. Optimal test allocation follows $n_i \propto c_i \cdot p_i$ — proportional to both cost and execution probability.

---

## What Random Testing Looks Like

At its simplest, random testing generates inputs and checks a condition:

```python
import random

def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:   return mid
        elif arr[mid] < target:  lo = mid + 1
        else:                    hi = mid - 1
    return -1

# Random test: generate input, check oracle
for _ in range(10_000):
    arr = sorted(random.choices(range(-100, 100), k=random.randint(0, 50)))
    target = random.randint(-100, 100)
    idx = binary_search(arr, target)
    assert idx == -1 or arr[idx] == target    # oracle: if found, value must match
```

No human chose these inputs. If the assertion ever fails, we found a bug.

---

## Feedback-Directed Random Testing

Pure random testing generates inputs without considering execution results. **Feedback-directed** random testing uses execution information to guide subsequent generation, dramatically improving effectiveness.

### Randoop

Randoop builds test sequences incrementally {% cite pacheco2007randoop %}:

1. Start with simple sequences (constructors, constants)
2. Randomly select a method to call
3. Choose arguments from previously constructed sequences
4. Execute immediately and classify:
   - **Error-revealing** → report as bug, do not extend
   - **Illegal** (e.g., `ArgumentException` on null) → discard
   - **New** (creates novel object states) → add to pool for extension

Key results on a .NET component tested by 40 engineers for 5 years:

| Metric | Value |
|--------|-------|
| Errors found | 30 (in 15 human hours, 150 CPU hours) |
| Productivity | 100x faster than manual testing |
| Tests generated | 4,000,000 sequences |
| Coverage finding | Found errors in code with 100% block and arc coverage |

The "plateau effect" — error-finding rate dropping from 5/hour to zero after ~12 hours — reveals the limitation of uniform random method selection: classes with simple constructors are explored disproportionately {% cite pacheco2007randoop %}.

### AutoTest

AutoTest applies random testing to Eiffel using **Design by Contract** as the oracle {% cite meyer2007autotest %}:

- **Preconditions** filter invalid inputs automatically
- **Postconditions** and **class invariants** detect specification violations
- No manual oracle effort required for annotated code

Systematic experiments (1,875 test sessions, 1,500 CPU hours) revealed:

- Bug discovery follows an inverse curve: $f(x) = a/x + b$ — most bugs found in the first few minutes
- Random seed has surprisingly high impact: one seed found 5 bugs, another found 23 bugs with identical parameters
- An optimal strategy (PGenNew=0.25, PDiv=0.5, PGenBasicRand=0.25) loses only 23% of bugs versus per-class tuning

The finding that contracts detect more bugs than uncaught exceptions for longer timeouts validates Design by Contract as an effective automated oracle for random testing {% cite meyer2007autotest %}.

---

## Practical Recommendations

Drawing from 40 years of research:

1. **Start with random testing** for broad coverage and reliability baseline {% cite duran1984evaluation %}
2. **Use feedback**: Randoop-style incremental building or coverage guidance dramatically outperforms blind random generation {% cite pacheco2007randoop %}
3. **Invest in oracles**: The oracle determines the ceiling of what random testing can find — contracts and properties catch far more than crash detection alone {% cite meyer2007autotest %}
4. **Run multiple seeds**: A single random seed can miss 4x more bugs than another {% cite meyer2007autotest %}
5. **Don't rely on random testing alone**: Combine with systematic testing for edge cases, boundary values, and targeted subdomain coverage {% cite duran1984evaluation %}

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
