---
title: "Revision Questions: Software Inspection"
parent: Inspection
nav_order: 100
layout: default
---

# A05: Software Inspection — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Evolution of Inspection

Fagan developed formal inspection at IBM in 1976, and the practice evolved significantly over 50 years.

Trace the evolution from 1976 to 2025 through 4 key milestones. What changed at each stage? What principles remained constant?

---

## Question 2: Inspection Types Comparison

Laitenberger (2002) compares Fagan Inspection, Code Review, Walkthrough, and Audit.

Compare these four types across: purpose, formality, team size, and cost. When would you choose each type?

---

## Question 3: Cost-Benefit of Inspection

Research shows inspection finds defects at 1.4-1.75 hours per defect, while testing takes 6-17 hours per defect.

Explain why inspection is more cost-effective than testing. What is the cost multiplier for fixing defects at different stages (review, testing, production)?

---

## Question 4: Fagan's Six Phases

Fagan (1976) defined 6 phases for formal inspection: Planning, Overview, Preparation, Inspection Meeting, Rework, and Follow-up.

Describe what happens in each phase. Why are entry and exit criteria important for each phase?

---

## Question 5: The Four Roles

Fagan inspection uses four roles: Moderator, Author, Reader, and Inspector.

Describe the responsibility of each role. Why is it critical that management does NOT participate in inspections?

---

## Question 6: Ground Rules for Effective Meetings

Fagan established ground rules including "Find problems, don't solve them" and "Maximum 2 hours."

List at least 4 ground rules for effective inspection meetings. Explain why the "criticize product, not producer" rule is important for psychological safety.

---

## Question 7: Reading Techniques

Reading techniques range from ad hoc to Perspective-Based Reading (PBR).

Compare ad hoc, checklist-based, and PBR techniques. Which technique showed +21-30% improvement? When does 90-95% of defect detection actually occur?

---

## Question 8: Perspective-Based Reading (PBR)

PBR assigns stakeholder perspectives: Tester, Designer, and User.

For each perspective, explain the focus and work product created. Why is "If you can't build the work product, there's a defect" a key insight?

---

## Question 9: Checklist Design

Cohen (2006) provides best practices for code review checklists.

List at least 3 "Do" and 3 "Don't" recommendations for checklist design. Why are checklists most effective at detecting omissions?

---

## Question 10: Cisco Study - Size

The Cisco study (Cohen 2006) analyzed 3.2 million lines of code reviewed by 50 programmers.

What happens to defect detection when review size exceeds 400 LOC? What is the optimal review size range and why?

---

## Question 11: Cisco Study - Rate

The Cisco study found that review rate strongly affects effectiveness.

What is the threshold review rate above which reviewers are "rubber stamping"? What correlation exists between rushed reviews and post-release defects?

---

## Question 12: The Magic Numbers

Three "magic numbers" summarize optimal code review parameters.

State the three optimal parameters (size, rate, duration). How much did Cisco save by implementing these practices?

---

## Question 13: Google Modern Code Review

Sadowski (2018) studied code review at Google.

What are Google's median values for: change size, number of reviewers, and review latency? How does this compare to Fagan's original parameters?

---

## Question 14: Microsoft Findings

Bosu (2015) studied what makes code review comments useful at Microsoft.

What percentage of comments are marked useful? How does reviewer experience affect usefulness (first-time vs. experienced)? What correlation exists between "reviews without discussion" and defects?

---

## Question 15: Anti-Patterns

Several anti-patterns can destroy inspection effectiveness.

List at least 4 anti-patterns and explain why each is harmful. Why should review metrics never be used for performance evaluations?

---

## Question 16: Fault Injection

Mills' fault injection (error seeding) method estimates total defects.

Explain the 5 steps of the fault injection process. Given: 12 seeded defects injected, 4 seeded found, 11 original found. Calculate the estimated total defects.

---

## Question 17: Capture-Recapture Formula

The capture-recapture method originates from wildlife biology.

State the Lincoln-Petersen formula. Given: Inspector A finds 20 defects, Inspector B finds 15, both find 6. Calculate the estimated total and remaining defects.

---

## Question 18: Capture-Recapture Models

Briand (2000) evaluated four capture-recapture models: M₀, Mₜ, Mₕ, and Mₜₕ.

Describe what each model assumes. Which model is recommended and with what estimator? What is the minimum number of inspectors for reliable estimates?

---

## Question 19: Capture-Recapture Limitations

Capture-recapture has several limitations for defect estimation.

List at least 3 limitations of the capture-recapture method. What happens when the overlap (R) equals zero? Why does the method tend to underestimate?

---

## Question 20: LLM Code Review

Zeng (2025) evaluated LLM-based code review tools on real pull requests.

What F1 score did the best LLM achieve? What is the main limitation of current LLM code review? Why is human review still essential?

---

## Question 21: LLM Capabilities

Current LLM code review has varying capabilities across different task types.

Rate LLM performance (good/moderate/poor) for: functional bugs, style issues, security vulnerabilities. What technique boosted F1 by 43%?

---

## Question 22: Inspection vs Testing

Inspection and testing are complementary verification techniques.

Create a comparison table with: timing, what each finds, cost per defect, and hours per defect. Why should you use both techniques?

---

## Practical Problems

---

## Question 23: Capture-Recapture Calculation (Practical)

An inspection meeting results in the identification of 13 defects by four inspectors:

| Line | Inspector A | Inspector B | Inspector C | Inspector D |
|------|:-----------:|:-----------:|:-----------:|:-----------:|
| 8    | x | | x | x |
| 12   | | x | | x |
| 33   | | x | | |
| 55   | | x | | |
| 56   | x | | | |
| 78   | | | x | |
| 120  | | x | | |
| 145  | | | x | x |
| 146  | | x | | |
| 230  | | | | x |
| 255  | | | | x |
| 300  | | x | | |
| 321  | x | | x | |

Using Humphrey's capture-recapture procedure, how many latent defects can you estimate remain unidentified in this code? Show your calculation.

---

## Question 24: Inspection Prioritization Under Budget

You need to inspect a large banking system comprising around 20,000 lines of COBOL and 25,000 lines of newly written Java code with regards to vulnerabilities, but only have enough budget to inspect 10,000 lines.

How would you prioritize which components to inspect without overrunning the budget? What criteria would you use?

---

## Question 25: Egoless Programming

Wiegers references Weinberg's concept of "egoless programming."

What does Weinberg mean by this concept? Why is it relevant to peer review? How does this relate to Fagan's rule "criticize product, not producer"?

---

## Question 26: Session Limits

The literature suggests a number of limits on code review sessions.

For each of the following, state a reasonable guideline with justification:
a. Number of lines of code inspected in one sitting
b. Number of lines of code inspected per hour (rate)
c. Maximum inspection session length

---

## Question 27: Undesirable Attitudes

Mandatory code reviews can sometimes lead to negative programmer attitudes.

List two undesirable attitudes that can emerge in an organization with mandatory code reviews. Describe three mechanisms that management, the organization, or programmers can use to prevent such attitudes from developing.

---

## Question 28: Good vs Bad Practices

Describe, in your own words:
- Two good inspection practices and why they work
- Two bad inspection practices and why they should be avoided

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| History & evolution | Q1 |
| Inspection types | Q2, Q3 |
| Fagan process | Q4, Q5, Q6 |
| Reading techniques | Q7, Q8, Q9 |
| Cisco study | Q10, Q11, Q12 |
| Modern practices (Google/Microsoft) | Q13, Q14 |
| Anti-patterns | Q15, Q27, Q28 |
| Fault injection | Q16 |
| Capture-recapture | Q17, Q18, Q19, Q23 |
| LLM code review | Q20, Q21 |
| Inspection vs testing | Q22 |
| Practical application | Q23, Q24, Q25, Q26, Q27, Q28 |
