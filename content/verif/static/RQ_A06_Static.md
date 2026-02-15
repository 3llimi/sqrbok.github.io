---
title: "Revision Questions: Static Analysis"
parent: Static Analysis
nav_order: 100
layout: default
---

# A06: Static Analysis — Revision Questions

**Format:** Explain in your own words, give brief examples

---

## Question 1: Zero Analysis Trace

Given the following code, trace the zero analysis to fixed point. Identify where (if anywhere) a divide-by-zero warning is issued.
```c
a = 5;
b = 0;
if (condition) {
    b = a;
}
c = a / b;   // Is b safe here?
```
*Hint: What is b's abstract value after the if-else merge?*

---

## Question 2: Product Automaton

Given a simple function with two lock/unlock calls:
```c
lock(m);
if (error) {
    return;     // Does this violate locking discipline?
}
unlock(m);
```
Construct the product automaton with the locking FSM ($P_0$ = unlocked, $P_1$ = locked, $P_2$ = error). Identify the error state.

---

## Question 3: Soundness vs Completeness

A tool reports "No bugs found" for a program that actually contains a null pointer dereference.
- Is this tool sound? Why or why not?
- Is this tool complete? Why or why not?
- Give an example of a tool that would catch this vs miss it.

---

## Question 4: Model Checking vs Dataflow

A concurrent program has a potential deadlock (Thread A locks resource 1 then waits for resource 2; Thread B locks resource 2 then waits for resource 1). Would you use dataflow analysis or model checking to detect this? Explain your reasoning.

---

## Question 5: Tool Disagreement

Lenarduzzi et al. (2021) found <0.4% agreement among six SA tools. What does this mean for a team that relies on a single tool like SonarQube? What would you recommend?

---

## Question 6: CEGAR Explanation

Explain the CEGAR loop in your own words. Why does it start with a coarse abstraction instead of analyzing the full program? What happens when a counterexample is spurious?

---

## Question 7: The 10% FP Rule

What is the 10% false positive rule? Who enforces it and how? Why is this threshold important for industrial adoption of SA tools? What happens when a tool exceeds it at Google?

---

## Question 8: Cost-Effectiveness Comparison

Compare the cost-effectiveness of static analysis, manual code inspection, and testing based on the Nortel study (Zheng 2006). When would you invest in SA vs additional testing? What types of defects does each approach find best?

---

## Question 9: Program Model Construction (Practical)

Produce a program model for the code below. Be sure to identify and describe the states, actions, transitions, initial state, and end states.

```c
int x = 0;
int y = 3;
while (x < 3) {
    x++;
    y--;
}
```

---

## Question 10: Counterexamples in Model Checking

In the context of model checking, what is a counterexample? Why is it valuable for debugging? What is the difference between a real and a spurious counterexample?

---

## Question 11: When Model Checking Fails

Under what circumstances is model checking *not* a useful strategy? Give at least 3 situations where a different analysis technique would be more appropriate.

---

## Question 12: LTL Properties

Let $F$ be a formula. Represent in LTL the following properties:
a) $F$ holds in **all** states of a path $s_0, s_1, \ldots$
b) $F$ holds in **some** future state
c) Whenever a lock is acquired, it is **eventually** released: $G(\textit{lock} \rightarrow F(\textit{unlock}))$

Explain each operator ($G$, $F$, $U$) in plain English.

---

## Question 13: Static vs Dynamic Analysis Tradeoffs

Give an example of a circumstance under which you would prefer:
a) Dynamic analysis over static analysis?
b) Static analysis over dynamic analysis?
c) Model checking over more lightweight static analysis?

Explain your reasoning for each choice.

---

## Question 14: Tool Adoption Strategies

Describe two strategies for eliciting developer support and encouraging static analysis tool adoption in an organization. Reference the Google Tricorder experience and the eBay FindBugs deployment.

---

## Question 15: Rice's Theorem Implications

Rice's Theorem (1953) proves that all non-trivial semantic properties of programs are undecidable.
- Explain what this means for static analysis tools in practice.
- How do practical tools work despite this theoretical limitation?
- What tradeoffs (soundness/completeness/termination) must every tool make?

---

## Question 16: Taint Analysis

Explain how taint analysis detects SQL injection vulnerabilities. Define: source, sink, and sanitizer. Trace the taint through this code:

```java
String input = request.getParameter("id");   // source
String query = "SELECT * FROM users WHERE id=" + input;
db.execute(query);                           // sink
```

Where should a sanitizer be applied?

---

## Question 17: Symbolic Execution

Explain how symbolic execution differs from concrete testing. Given:

```c
int f(int x, int y) {
    if (x > 0 && y > 0) {
        if (x + y > 100)
            return -1;  // error path
    }
    return 0;
}
```

What symbolic constraints does the engine collect to reach the error path? What is path explosion, and how does KLEE mitigate it?

---

## Question 18: AST Pattern Matching

PMD detects bugs by matching patterns in the Abstract Syntax Tree. Explain:
- What is an AST and how is it constructed from source code?
- How does a rule like "Empty While Statement" work at the AST level?
- What are the limitations of AST pattern matching compared to dataflow analysis?

---

## Question 19: Abstraction in Static Analysis

Explain how abstraction reduces the state space in static analysis. Use the zero analysis example: how does abstracting integers to $\{Z, NZ, MZ\}$ reduce $2^{96}$ possible 32-bit values to just 3 abstract values? Why does this guarantee termination?

---

## Question 20: LLM-Augmented Static Analysis

IRIS (Li 2024) combines LLMs with CodeQL and achieves +103% detection improvement. Explain:
- Why do traditional SA tools struggle with certain vulnerability types?
- How does the neuro-symbolic approach work (LLM + static analysis)?
- What are the risks of relying on LLMs for security analysis?

---

## Practical Problems

---

## Question 21: Zero Analysis Walkthrough (Practical)

Trace the zero analysis for the following code. Show the abstract state at each program point and identify all warnings.

```c
int a = 10;      // B1
int b = a - 10;  // B1
int c = 1;       // B1
while (b < 5) {  // B2 (loop header)
    c = c * b;   // B3
    b = b + 1;   // B3
}
int d = a / c;   // B4 — is c safe here?
```

Draw the CFG. What is the abstract value of $c$ at block B4? Does the analysis report a false positive?

---

## Question 22: Model Checking Locking (Practical)

Given the following code with a locking FSM ($P_0$=unlocked, $P_1$=locked, $P_2$=error):

```c
void process(int flag) {
    lock(m);           // S0
    do_work();         // S1
    if (flag) {
        lock(m);       // S2 — is this safe?
    }
    unlock(m);         // S3
}
```

a) Draw the CFG for the code
b) Draw the product automaton (code states $\times$ lock states)
c) Identify all paths that reach an error state $P_2$
d) Is the counterexample real or spurious?

---

## Topics Covered

| Topic | Questions |
|-------|-----------|
| Zero/dataflow analysis | Q1, Q19, Q21 |
| Model checking | Q2, Q4, Q9, Q10, Q11, Q22 |
| Soundness & completeness | Q3, Q15 |
| CEGAR | Q6 |
| Tool ecosystem | Q5, Q7, Q14 |
| Cost-effectiveness | Q8 |
| Temporal logic (LTL) | Q12 |
| Static vs dynamic | Q13 |
| Taint analysis | Q16 |
| Symbolic execution | Q17 |
| AST pattern matching | Q18 |
| Abstraction | Q19 |
| LLM augmentation | Q20 |
| Practical problems | Q9, Q21, Q22 |
