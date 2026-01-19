---
title: Quality Gates & CI/CD
parent: Industry Practices
nav_order: 10
layout: default
---

# Quality Gates & CI/CD

Quality gates are checkpoints where code must meet specific criteria before proceeding to the next stage. This page synthesizes practices from Google, Microsoft, and SRE disciplines {% cite winters2020swe %} {% cite page2008mstesting %} {% cite beyer2016sre %}.

## Quality Gates by Stage

### Stage 1: Pre-submit (Before Merge)

| Gate | Google | Microsoft |
|------|--------|-----------|
| **Code review** | Mandatory, no solo commits | Mandatory peer review |
| **Certification** | Readability in language | — |
| **Static analysis** | Tricorder | PREfast |
| **Tests** | All affected tests pass | All tests pass |
| **Coverage** | Varies by Test Certified level | 80% for new features |

### Stage 2: Post-submit (CI/Staging)

| Gate | Google | Microsoft |
|------|--------|-----------|
| **Build status** | TAP - main must stay green | Daily builds |
| **Integration tests** | Dependency-based selection | Cross-component |
| **Milestone criteria** | — | M2: 65%, M3: 70% coverage |

### Stage 3: Release/Deployment

| Gate | Google/SRE | Microsoft |
|------|------------|-----------|
| **Error budget** | Must be positive to deploy | — |
| **Canary** | 1% rollout first | — |
| **PRR** | Production Readiness Review | — |
| **Approval** | Automated (budget-based) | Ship Room committee |

---

## CI/CD Pipeline

### Pipeline Stages

```
Code → Build → Unit Test → Integration Test → Staging → E2E Test → Canary → Production
```

### Key Practices

| Practice | Description | Benefit |
|----------|-------------|---------|
| **Trunk-based development** | All developers commit to main | No merge conflicts |
| **Pre-submit testing** | Tests run before merge | Catch bugs early |
| **Post-submit testing** | Full test suite on main | Catch integration bugs |
| **Canary deployment** | 1% rollout first | Limit blast radius |
| **Automated rollback** | Revert if metrics degrade | Fast recovery |

### Scale at Google (TAP)

Google's Test Automation Platform handles massive scale {% cite memon2017testing %}:

| Metric | Value |
|--------|-------|
| Daily test runs | **150 million** |
| Unique test targets | **5.5 million** |
| Commit rate | **1 per second** |
| Test failure rate | Only **1.15%** ever failed |

### Scale at Facebook

Facebook's continuous deployment research shows {% cite savor2016facebook %}:

| Metric | Value |
|--------|-------|
| Updates per dev/week | **3.5** (~daily) |
| Critical issues vs deployments | **Nearly constant** |
| Feedback time | **10 minutes** from smoke tests |

> "The number of critical issues arising from deployments was almost constant regardless of the number of deployments." {% cite savor2016facebook %}

---

## Deployment Strategies

### Strategy Comparison

| Strategy | Description | Rollback | Resources |
|----------|-------------|----------|-----------|
| **Canary** | Deploy to small % first | Stop rollout | 1x + canary |
| **Blue-Green** | Two environments, switch traffic | Instant switch | 2x |
| **Progressive** | 1% → 10% → 50% → 100% | Stop any stage | 1x |
| **Feature Flags** | Decouple launch from deploy | Disable flag | 1x |

### Canary Deployment Process

1. **Deploy to ~1%** (canary segment)
2. **Compare metrics** against "Live" control
3. **Monitor** errors, latency regressions
4. If OK → **expand**; If problems → **halt + rollback**

### Staged Rollout

| Stage | Population | Purpose |
|-------|------------|---------|
| Canary | ~1% | Initial risk detection |
| Expand | ~10% | Broader validation |
| Wide | ~50% | Near-full confidence |
| Full | 100% | Complete rollout |

### Error Budget Math for Canary

> 5% canary serving 20% errors = only 1% overall error rate (SLO preserved)

This allows teams to detect issues before they affect the full user base.

---

## Feature Flags

**Feature flags** separate feature launches from binary releases. The binary shows no behavior change when the flag is off {% cite winters2020swe %}.

### Benefits

| Benefit | Description |
|---------|-------------|
| **Gradual enablement** | Enable features one at a time |
| **Phased adoption** | Roll out to early adopters first |
| **Fast rollback** | Disable flag instantly (vs 15+ min redeploy) |
| **Risk isolation** | Buggy feature X doesn't affect feature Y |

### Feature Flag Lifecycle

| Phase | Description |
|-------|-------------|
| **1. Design** | Architecture must support flags from start |
| **2. Development** | Implement feature behind flag |
| **3. Testing** | Verify behavior with flag on/off |
| **4. Rollout** | Enable for subset of users |
| **5. Monitor** | Track flag in monitoring dashboards |
| **6. Stabilize** | Feature becomes default |
| **7. Cleanup** | Remove flag, consolidate code paths |

### Critical Rules

- **Tag short-term flags as technical debt**
- **Document how to prove a flag is no longer needed**
- **Schedule cleanup** (don't accumulate)
- **Monitor flag cardinality** (too many flags = complexity)

> "If feature X is buggy, it can be disabled via flag without affecting unrelated feature Y." {% cite winters2020swe %}

---

## Production Readiness Review (PRR)

A **PRR** is a checklist-based review ensuring a service is ready for production operation {% cite beyer2016sre %}.

### PRR Checklist Categories

| Category | Items |
|----------|-------|
| **Monitoring** | SLIs defined, dashboards created, alerts configured |
| **Logging** | Structured logs, retention policy, searchable |
| **On-call** | Runbook exists, escalation path defined |
| **Capacity** | Load tested, auto-scaling configured |
| **Security** | Auth/authz, encryption, vulnerability scan |
| **Disaster Recovery** | Backup strategy, tested restore |
| **Dependencies** | Timeouts, circuit breakers, graceful degradation |

### When PRR Happens

- Before a service is "onboarded" by SRE team
- Before reaching General Availability (GA)
- After major architectural changes

---

## Build Speed and Feedback

### Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Pre-submit tests | < 30 minutes | Developer stays engaged |
| Feedback loop | < 10 minutes | Ideal for iteration |
| Full CI run | < 1 hour | Same-day feedback |

### Google's Approach

> "If feedback takes more than a few minutes, add more machines. CPU hours are cheaper than developer time."

### Facebook's Approach

- **10-minute feedback** from integration smoke tests
- **Thousands of compute nodes** for test parallelization
- **3.5 deploys per developer per week** sustained

---

## Rollback Strategies

### Roll Back vs Roll Forward

| Strategy | When to Use | Speed |
|----------|-------------|-------|
| **Roll back** | Known-good previous version exists | Fast (seconds-minutes) |
| **Roll forward** | Fix is simple, rollback is risky | Varies |

### Automated Rollback Triggers

| Trigger | Action |
|---------|--------|
| Error rate spike | Automatic revert |
| Latency regression | Stop rollout |
| Crash rate increase | Immediate rollback |
| Error budget exhausted | Feature freeze |

### Rollback Requirements

For effective rollback capability:

- **Immutable deployments** - Previous version still available
- **Database compatibility** - Schema supports both versions
- **Feature flags** - Can disable without redeploy
- **Monitoring** - Know when to trigger

---

## Comparison: Continuous vs Milestone

| Aspect | Continuous (Google/Facebook) | Milestone (Microsoft) |
|--------|------------------------------|----------------------|
| **Release frequency** | Multiple times/day | Weeks to months |
| **Quality gate** | Error budget | Bug bar |
| **Ship decision** | Automated | Committee |
| **Rollback** | Instant (flags, canary) | Patch release |
| **Risk model** | Small changes, fast feedback | Staged stabilization |
| **Test strategy** | Continuous, selective | Milestone exit criteria |

Both models achieve high quality through different mechanisms. The choice depends on:

- Product type (web service vs packaged software)
- User expectations (continuous updates vs stability)
- Regulatory requirements (audit trails, approvals)

---

## Key Metrics Summary

| Metric | Target | Source |
|--------|--------|--------|
| Canary population | 1% | Google, Netflix |
| Pre-submit test time | < 30 min | Google |
| Feedback loop | < 10 min | Facebook |
| Deploys per dev/week | 3.5 | Facebook |
| Test failure rate | ~1% | Google TAP |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
