---
title: Industrial Evidence
parent: Operational Profile
nav_order: 2
layout: default
---

# Industrial Evidence for Operational Profiles

Operational profile-based testing has been validated in major industrial settings, with documented benefits including order-of-magnitude problem reduction and 50% test cost savings {% cite musa1993operational %}.

---

## AT&T Definity (Telephone Switch)

The most extensively documented OP case study {% cite musa1993operational %}:

| Metric | Result |
|--------|--------|
| **Customer problems** | Reduced by 10x (order of magnitude) |
| **System test interval** | Halved |
| **Product introduction interval** | Reduced by 30% |

The PBX switch operational profile included operations such as local call (59.4%), toll call (15.6%), call forwarding (9.8%), down to conference call (0.01%). By testing proportional to these frequencies, the highest-impact defects were found first.

```vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "AT&T Definity PBX: Operational Profile",
  "width": 450,
  "height": 250,
  "data": {
    "values": [
      {"operation": "Local call", "probability": 0.594},
      {"operation": "Toll call", "probability": 0.156},
      {"operation": "Call forwarding", "probability": 0.098},
      {"operation": "3-way conference", "probability": 0.052},
      {"operation": "Call waiting", "probability": 0.045},
      {"operation": "Speed dial", "probability": 0.030},
      {"operation": "Call transfer", "probability": 0.015},
      {"operation": "Other operations", "probability": 0.010}
    ]
  },
  "mark": "bar",
  "encoding": {
    "y": {
      "field": "operation",
      "type": "nominal",
      "title": "Operation",
      "sort": "-x"
    },
    "x": {
      "field": "probability",
      "type": "quantitative",
      "title": "Occurrence Probability",
      "axis": {"format": ".0%"}
    },
    "color": {
      "field": "probability",
      "type": "quantitative",
      "scale": {"scheme": "blues"},
      "legend": null
    }
  }
}
```

{: .note }
> *Chart reconstructed to illustrate the Pareto-like distribution typical of operational profiles. See {% cite musa1993operational %} for original data.*

---

## Hewlett-Packard

HP adopted OP-based testing across multiple product lines {% cite musa1993operational %}:

| Metric | Result |
|--------|--------|
| **System test time** | Reduced by at least 50% |
| **System test cost** | Reduced by at least 50% |

---

## Bayesian Reliability Analysis (Billing System)

Ozekici and Soyer demonstrated OP-based reliability modeling on a billing system {% cite ozekici2003reliability %}:

| Operation | Frequency |
|-----------|-----------|
| Most frequent operation | 59.4% |
| Least frequent operation | 0.01% |

Key insight: failure rates are **operation-dependent** — some operations are inherently more failure-prone than others. By making failure rates dependent on which operation is executing, the Bayesian model provides more accurate reliability predictions than models that assume uniform failure behavior {% cite ozekici2003reliability %}.

---

## Modern: Android Profile Coverage

### What Are Cloud Profiles?

When you use an Android app, Google Play Services silently records which methods (functions) in the app were executed. Google aggregates this data across millions of users and publishes the result as a **Cloud Profile** — essentially a list of "the code paths that real users actually exercise." Developers originally use Cloud Profiles to speed up app startup (the Android runtime pre-compiles frequently-used methods), but Bleier et al. realized these profiles are, by definition, an **operational profile for free**: they tell you which parts of the app matter to real users, without any manual effort or instrumentation.

Bleier et al. (2025) demonstrated that operational profiles can be obtained almost for free in the mobile ecosystem by repurposing existing telemetry infrastructure {% cite bleier2025profile %}:

### Google Cloud Profiles

| Metric | Value |
|--------|-------|
| **Availability** | 99.89% of top-1000 Android apps |
| **Average profile size** | 7.88% of total app methods |
| **Cost** | Free, no instrumentation required |
| **Source** | Aggregated real-user telemetry (Google Play) |

### Key Findings

| Finding | Implication |
|---------|------------|
| Candy Crush: 2.22% method coverage but 21.39% profile coverage | Testing aligns with user behavior better than raw coverage suggests |
| Cloud Profiles are not strict supersets of Baseline Profiles | Actual user behavior diverges from developer expectations |
| Monkey (random) outperformed model-based tools: 37.45% vs. 32.51% profile coverage | Coverage of user-relevant behavior differs from structural coverage |
| No automated tool exceeded 70% profile coverage | ~30% of user-relevant behavior requires human exploration |

```vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Android Testing Tools: Profile Coverage vs. Method Coverage",
  "width": 450,
  "height": 250,
  "data": {
    "values": [
      {"tool": "Monkey (random)", "metric": "Profile Coverage", "value": 37.45},
      {"tool": "Monkey (random)", "metric": "Method Coverage", "value": 42.1},
      {"tool": "Fastbot2", "metric": "Profile Coverage", "value": 32.51},
      {"tool": "Fastbot2", "metric": "Method Coverage", "value": 38.7},
      {"tool": "DroidBot", "metric": "Profile Coverage", "value": 29.50},
      {"tool": "DroidBot", "metric": "Method Coverage", "value": 35.2},
      {"tool": "Candy Crush (example)", "metric": "Profile Coverage", "value": 21.39},
      {"tool": "Candy Crush (example)", "metric": "Method Coverage", "value": 2.22}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "tool", "type": "nominal", "title": "Tool / App", "axis": {"labelAngle": -15}},
    "y": {"field": "value", "type": "quantitative", "title": "Coverage (%)"},
    "xOffset": {"field": "metric"},
    "color": {
      "field": "metric",
      "type": "nominal",
      "scale": {"domain": ["Profile Coverage", "Method Coverage"], "range": ["#1565c0", "#90caf9"]},
      "title": "Metric"
    }
  }
}
```

{: .note }
> *Chart reconstructed from published data. See {% cite bleier2025profile %} for original measurements and additional tools.*

{: .highlight }
> Cloud Profiles transform OP from a theoretical concept into something concrete and practically free. They validate the fundamental OP premise: **you cannot assume you know how users will use your software** {% cite bleier2025profile %}.

### PROFTRACE Tool

| Metric | PROFTRACE | ACVTool (traditional) |
|--------|-----------|----------------------|
| **Success rate** | 94.2% (827 apps) | 13.78% |
| **Approach** | Lightweight uprobes-based tracing | App instrumentation |
| **App modification** | None required | Required |

---

## Summary: Cross-Study Evidence

| Organization | OP Benefit | Source |
|--------------|-----------|--------|
| AT&T Definity | 10x problem reduction, 50% faster test | {% cite musa1993operational %} |
| Hewlett-Packard | 50% test cost reduction | {% cite musa1993operational %} |
| Android ecosystem | Free OP via telemetry (99.89% coverage) | {% cite bleier2025profile %} |
| Billing system | Operation-dependent reliability confirmed | {% cite ozekici2003reliability %} |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
