---
title: "Study Notes: Static Analysis"
parent: Static Analysis
nav_order: 99
layout: default
---

# Study Notes: Static Analysis

## Purpose
These study notes cover static analysis techniques for finding software defects without executing code. The material follows the lecture structure: motivation, theoretical foundations, technique overview, two deep dives (zero analysis and model checking), and modern industrial practice.

**Primary Sources:**
- Engler et al. {% cite engler2001bugs %} - Bugs as deviant behavior (Linux kernel)
- Flanagan et al. {% cite flanagan2002extended %} - Extended static checking for Java
- Holzmann {% cite holzmann2004spin %} - The SPIN model checker
- Chess & West {% cite chess2007static %} - Secure programming with static analysis

**Industrial Evidence:**
- Sadowski et al. {% cite sadowski2015tricorder %} - Google Tricorder platform
- Zheng et al. {% cite zheng2006static %} - Nortel Networks cost-effectiveness study
- Jaspan et al. {% cite jaspan2007understanding %} - eBay FindBugs deployment
- Lenarduzzi et al. {% cite lenarduzzi2021comparison %} - Six-tool comparison study

**Emerging Research:**
- Cadar et al. {% cite cadar2008klee %} - KLEE symbolic execution
- Li et al. {% cite li2024iris %} - IRIS: LLM-assisted static analysis
- Wang et al. {% cite wang2025llmpa %} - LLM program analysis survey
- Bailey & Nicholas {% cite bailey2025symexec %} - Symbolic execution survey

---

## Part 1: Why Static Analysis Matters

### Learning Objectives
- Explain what static analysis is and why it catches bugs that testing misses
- Identify categories of defects where static analysis excels
- Articulate the value proposition: systematic, path-complete, early detection

### 1.1 What is Static Analysis?

**Definition:** Static analysis systematically examines an abstraction of a program's state space without executing the program. It checks all possible execution paths, including rare error paths that testing rarely exercises.

**Key distinction from testing:** Testing checks specific inputs and observes behavior. Static analysis reasons about *all* inputs and *all* paths through the code. Testing finds bugs on paths you run; static analysis finds bugs on paths you never thought to run.

### 1.2 The goto fail; Bug (2014)

Apple's SSL/TLS implementation contained a duplicated `goto fail;` statement that bypassed certificate verification on every iOS and macOS device:

```c
if ((err = SSLHashSHA1.update(&hashCtx, &signedParams)) != 0)
    goto fail;
    goto fail;  // <-- DUPLICATED LINE: always executes!
if ((err = SSLHashSHA1.final(&hashCtx, &hashOut)) != 0)
    goto fail;
```

**Why this is devastating:** The second `goto fail;` is unconditional. It always jumps to the cleanup code, skipping the final verification step. Any SSL certificate would be accepted as valid.

**Why static analysis catches it instantly:**
- **Unreachable code detection** -- the `SSLHashSHA1.final()` call can never execute
- **Control flow analysis** -- the unconditional jump is flagged as suspicious
- Every commercial static analyzer on the market detected this bug

**Why testing missed it:** Functional tests typically verify that *valid* certificates are accepted and *invalid* certificates are rejected. The bug made all certificates appear valid, so the "accept valid certificate" tests passed. Only a carefully crafted test with a deliberately broken certificate chain would have caught it.

### 1.3 Non-Local Bugs in Large Codebases

Engler et al. {% cite engler2001bugs %} analyzed the Linux kernel and found over 1,000 bugs by treating deviations from common patterns as potential errors. A classic example is an interrupt-handling bug:

```c
// Linux kernel interrupt handler
spin_lock(&lock);
if (error_condition) {
    return -EINVAL;  // BUG: returns with lock held!
}
// ... normal path ...
spin_unlock(&lock);
return 0;
```

**Why humans miss this:** The `spin_lock` and the missing `spin_unlock` on the error path may be separated by dozens of lines. Code reviewers focus on the happy path. The error path exits early, and the forgotten unlock is invisible during a line-by-line read.

**Why SA finds it:** Static analysis tracks the lock state across *all* paths, including the error return. It sees: lock acquired at entry, no unlock on the error path, function returns -- violation.

> **Key Insight:** Engler {% cite engler2001bugs %} demonstrated that static analysis of the Linux kernel found over 1,000 bugs by inferring "beliefs" from code patterns and flagging deviations. This approach requires no specification -- the code's own consistency is the spec.

### 1.4 Six Categories of Hard-to-Test Defects

Static analysis excels at finding defects that are difficult to trigger through testing:

| Category | Example | Why Hard to Test |
|----------|---------|------------------|
| **Buffer overruns** | Writing past array bounds | Requires specific input sizes; may not crash immediately |
| **Null dereference** | Calling method on null pointer | Requires specific sequence of calls that return null |
| **Resource leaks** | File handle not closed on error path | Error paths rarely exercised in tests |
| **API violations** | Calling functions in wrong order | Protocol errors may not cause visible failure |
| **Race conditions** | Two threads modifying shared data | Non-deterministic; may never trigger in test environment |
| **Security vulnerabilities** | SQL injection, XSS | Requires attacker-crafted input; normal tests use benign data |

**Common thread:** These bugs hide in rare paths, require specific timing, or need attacker-controlled input. Static analysis checks ALL paths systematically, making it the right tool for these categories.

> **Exam Tip:** Be able to explain why each defect category is hard to find through testing but amenable to static analysis. The key idea is that SA checks *all paths*, while testing checks only *exercised paths*.

---

## Part 2: Foundations

### Learning Objectives
- Compare static and dynamic analysis along key dimensions
- Define soundness, completeness, and their practical tradeoffs
- Explain Rice's Theorem and its implications for analysis design
- Map the technique continuum from pattern matching to theorem proving
- Explain how abstraction makes analysis tractable

### 2.1 Static vs Dynamic Analysis

| Dimension | Static Analysis | Dynamic Analysis (Testing) |
|-----------|-----------------|---------------------------|
| **Execution** | Does not run the program | Runs the program on inputs |
| **Coverage** | All paths (via abstraction) | Only exercised paths |
| **False positives** | Yes (warns about infeasible paths) | No (every failure is real) |
| **False negatives** | Possible (unsound tools exist) | Yes (misses untested paths) |
| **Timing** | Before deployment | During or after execution |
| **Concurrency** | Can reason about all interleavings | Tests specific schedules |
| **Input dependence** | Independent of specific inputs | Depends entirely on test inputs |
| **Cost scaling** | Scales with code size | Scales with input space |

**Key definition:** Static analysis systematically examines an *abstraction* of the program state space. The word "abstraction" is critical -- we do not track exact values, we track simplified representations that capture the properties we care about.

### 2.2 Soundness vs Completeness

These two properties define what guarantees an analysis provides:

**Soundness (over-approximation):**
- If the analysis says "no bugs," there truly are no bugs (of the checked kind)
- May report bugs that do not actually exist (false positives)
- "No false negatives" -- never misses a real bug
- Analogy: a smoke detector that goes off for steam is sound -- it never misses real fire, but sometimes triggers falsely

**Completeness (under-approximation):**
- If the analysis reports a bug, it is truly a bug (every report is real)
- May miss bugs that do exist (false negatives)
- "No false positives" -- every warning is actionable
- Analogy: testing is complete -- every failing test indicates a real problem, but passing tests do not prove absence of bugs

### 2.3 Confusion Matrix for Analysis Results

| | Actual Bug Present | No Actual Bug |
|---|---|---|
| **Analysis reports bug** | **True Positive (TP)** -- Correct warning | **False Positive (FP)** -- False alarm |
| **Analysis reports clean** | **False Negative (FN)** -- Missed bug | **True Negative (TN)** -- Correct silence |

- **Sound analysis:** FN = 0 (no missed bugs), but may have FP > 0
- **Complete analysis:** FP = 0 (no false alarms), but may have FN > 0
- **Ideal analysis:** Both FP = 0 and FN = 0 -- *impossible in general* (see Rice's Theorem)

### 2.4 Rice's Theorem

Rice {% cite rice1953classes %} proved a fundamental impossibility result:

> "Any nontrivial property about the language recognized by a Turing machine is undecidable."

**In plain language:** For any interesting question about what a program does (Does it divide by zero? Does it terminate? Does it access invalid memory?), there is no algorithm that can always give the correct yes/no answer for every possible program.

**Consequence for static analysis:** No analysis tool can simultaneously be:
1. **Sound** -- reports all bugs (no false negatives)
2. **Complete** -- reports only real bugs (no false positives)
3. **Terminating** -- always finishes in finite time

Every practical tool must sacrifice at least one of these properties:

| Tool Strategy | Sound? | Complete? | Terminates? | Example |
|---------------|--------|-----------|-------------|---------|
| Over-approximate (conservative) | Yes | No | Yes | Dataflow analysis, abstract interpretation |
| Under-approximate (optimistic) | No | Yes | Yes | Testing, bounded model checking |
| Precise but may not halt | Yes | Yes | No | Unbounded theorem provers |
| Heuristic (practical) | No | No | Yes | Most commercial tools (FindBugs, PMD) |

> **Exam Tip:** Most commercial tools are *neither* sound nor complete. They use heuristics to find common bugs quickly. This is a practical engineering choice, not a theoretical deficiency.

### 2.5 The Technique Continuum

Static analysis techniques form a spectrum trading automation for expressiveness:

| Technique | Automation | Expressiveness | Example Tool | What It Checks |
|-----------|------------|----------------|--------------|----------------|
| **Pattern matching** | Very high | Low | PMD, grep | Known code patterns |
| **Type checking** | Very high | Low-Medium | javac, mypy | Type correctness |
| **Dataflow analysis** | High | Medium | Coverity, Infer | Value flow, null, zero |
| **Model checking** | Medium | High | SPIN, SLAM | Temporal properties, protocols |
| **Theorem proving** | Low | Very high | Coq, Isabelle | Arbitrary specifications |

**Tradeoff:** Moving right increases the sophistication of properties you can check but requires more human effort (annotations, specifications, proofs).

### 2.6 Abstraction Reduces State Space Exponentially

**Without abstraction:** Consider 3 integer variables, each 32 bits. The concrete state space is $2^{32 \times 3} = 2^{96}$ -- approximately $10^{29}$ states. No computer can enumerate them all.

**With zero analysis abstraction:** Each variable can be in one of 3 abstract states: $Z$ (Zero), $NZ$ (Not-Zero), or $MZ$ (Maybe-Zero). With 3 variables, the abstract state space is $3^3 = 27$ states (at most $2^6 = 64$ if we consider the lattice structure). This is tractable.

**The tradeoff:** Abstraction loses information. We can no longer distinguish x=5 from x=42 -- both are NZ. This means some paths that are infeasible in reality will appear feasible in the abstract model, producing false positives. But the analysis becomes tractable and *terminates*.

> **Key Takeaway:** Abstraction is what makes static analysis possible despite Rice's Theorem. We accept imprecision (false positives) in exchange for tractability and termination.

---

## Part 3: Techniques Overview

### Learning Objectives
- Describe AST pattern matching and its tools (PMD, SpotBugs)
- Explain how compilers serve as basic static analyzers
- Define taint analysis and its application to security vulnerabilities

### 3.1 AST Pattern Matching

**How it works:**
1. Parse source code into an Abstract Syntax Tree (AST)
2. Walk the tree looking for subtrees that match known bug patterns
3. Report matches as potential defects

**Example tools:**
- **PMD** -- Matches AST patterns via XPath-like rules for Java, JavaScript, Apex
- **SpotBugs** (successor to FindBugs) -- Bytecode pattern analysis for Java
- **Semgrep** -- Lightweight pattern matching across many languages

**Strengths:** Fast, easy to write new rules, low false positive rate for well-defined patterns.

**Limitations:** Cannot reason about data flow or execution order. If a bug depends on the *sequence* of operations (lock then unlock), AST matching cannot detect it.

### 3.2 Compilers as Static Analyzers

The compiler is already performing static analysis every time you build:
- **Type checking** -- catches type mismatches at compile time
- **Argument count** -- wrong number of function arguments
- **Unreachable code** -- statements after unconditional return/break
- **Uninitialized variables** -- some compilers warn about this

**Best practice:** Compile at the highest warning level and treat warnings as errors:
```bash
gcc -Wall -Werror program.c
```

**Lint tools** extend compiler checks further:
- **Splint** (for C): variable used before definition, assignment in condition (`if (x = 5)` instead of `if (x == 5)`), unreachable code
- These are cheap checks with high value -- effectively free static analysis

### 3.3 Taint Analysis

Taint analysis is a specialized form of dataflow analysis used primarily for security. It tracks the flow of untrusted (user-controlled) data through the program {% cite chess2007static %}.

**The four-element model:**
1. **Source** -- where untrusted data enters (HTTP parameters, form fields, file reads)
2. **Propagation** -- how tainted data flows through variables and function calls
3. **Sanitizer** -- functions that make data safe (escaping, validation, encoding)
4. **Sink** -- dangerous operations where tainted data causes harm (SQL query, HTML output)

**If tainted data reaches a sink without passing through a sanitizer, report a vulnerability.**

| Vulnerability | Source | Sink | Sanitizer |
|---------------|--------|------|-----------|
| **SQL Injection** | HTTP parameter | SQL query execution | Parameterized query / escaping |
| **XSS** | User input field | HTML output | HTML encoding |
| **Command Injection** | Form field | `exec()` / `system()` | Input validation / whitelist |
| **Path Traversal** | URL parameter | File open | Path canonicalization |

**Vulnerable code (SQL injection):**
```java
String query = "SELECT * FROM users WHERE id = " + request.getParameter("id");
Statement stmt = conn.createStatement();
stmt.execute(query);  // SINK: tainted data in SQL query!
```

**Safe code:**
```java
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
stmt.setString(1, request.getParameter("id"));  // Sanitized via parameterized query
stmt.execute();
```

**Tools for taint analysis:** CodeQL (GitHub), Semgrep, Fortify (Micro Focus) {% cite chess2007static %}

> **Exam Tip:** Be able to trace a taint flow from source to sink and identify where sanitization is needed. Know the four vulnerability types and their source/sink/sanitizer patterns.

---

## Part 4: DEEP DIVE -- Zero Analysis (Dataflow Analysis)

### Learning Objectives
- Define dataflow analysis and explain what questions it answers
- Construct the abstract domain and transfer rules for zero analysis
- Trace a zero analysis step by step through a code example
- Explain fixed-point iteration and why it terminates

### 4.1 What is Dataflow Analysis?

Dataflow analysis tracks how abstract values flow through a program's control flow graph (CFG). Unlike AST pattern matching, dataflow analysis is sensitive to the *order* of operations and the *paths* through the program.

**Questions dataflow analysis can answer:**
- Did you read a file after closing it?
- Does this null value flow to that dereference?
- Could this variable be zero at this division?
- Where did this tainted user input end up?
- Is this variable always initialized before use?

**Key advantage over AST matching:** Order and paths matter. Dataflow analysis can determine that a variable is safe on one path but dangerous on another.

### 4.2 The Abstract Domain for Zero Analysis

We abstract the infinite set of integers into just three values:

| Concrete Values | Abstract Value | Meaning |
|----------------|----------------|---------|
| $0$ | $Z$ (Zero) | Definitely zero |
| Any $n \neq 0$ | $NZ$ (Not Zero) | Definitely not zero |
| Unknown / mixed | $MZ$ (Maybe Zero) | Could be zero or not |

**The lattice:** When two paths merge (e.g., after an if-else), we compute the *join* (least upper bound):

**Join rules:**
- $Z \sqcup Z = Z$
- $NZ \sqcup NZ = NZ$
- $Z \sqcup NZ = MZ$ (we don't know which path was taken)
- $MZ \sqcup \text{anything} = MZ$

### 4.3 Transfer Rules

Transfer rules define how abstract values change when the program executes a statement:

| Statement | Input State | Output State | Explanation |
|-----------|------------|--------------|-------------|
| `x = 0` | any | $x{:}Z$ | Literal zero assignment |
| `x = 10` | any | $x{:}NZ$ | Non-zero literal |
| `x = y` | $y{:}V$ | $x{:}V$ | Copy propagation |
| `x = y + z` | $y{:}NZ, z{:}NZ$ | $x{:}MZ$ | Sum of non-zeros could be zero (e.g., 5 + (-5)) |
| `x = y - 1` | $y{:}NZ$ | $x{:}MZ$ | Subtracting 1 from non-zero could yield zero |
| `x = y * z` | $y{:}Z$ or $z{:}Z$ | $x{:}Z$ | Anything times zero is zero |
| `x = y / z` | $z{:}MZ$ | **WARNING** | Division by maybe-zero! |
| `x = y / z` | $z{:}Z$ | **ERROR** | Division by definite zero! |

### 4.4 The Example Code

```c
// Block B1: initialization
x = 10;
y = x;
z = 0;

// Block B2: loop condition
while (y > -1) {

    // Block B3: loop body
    x = x / y;    // <-- CHECK: is y safe here?
    y = y - 1;
    z = 5;
}

// Block B4: after loop
```

### 4.5 Step-by-Step Walkthrough

#### Iteration 1: First pass through the code

**B1 (initialization):**

| Statement | x | y | z |
|-----------|---|---|---|
| (entry) | ? | ? | ? |
| `x = 10` | **NZ** | ? | ? |
| `y = x` | NZ | **NZ** | ? |
| `z = 0` | NZ | NZ | **Z** |

State leaving B1: {x: NZ, y: NZ, z: Z}

**B2 (condition, first visit):**
- Input from B1: {x: NZ, y: NZ, z: Z}
- Condition `y > -1` -- we enter the loop
- State entering B3: {x: NZ, y: NZ, z: Z}

**B3 (loop body, first execution):**

| Statement | x | y | z |
|-----------|---|---|---|
| (entry from B2) | NZ | NZ | Z |
| `x = x / y` | NZ (y is NZ, safe!) | NZ | Z |
| `y = y - 1` | NZ | **MZ** (NZ - 1 could be 0) | Z |
| `z = 5` | NZ | MZ | **NZ** |

State leaving B3: {x: NZ, y: MZ, z: NZ}

**Result of Iteration 1:** No warnings. The division `x / y` was safe because y was NZ.

#### Iteration 2: Second pass (merge at B2)

**B2 (condition, second visit) -- MERGE:**
- Input from B1: {x: NZ, y: NZ, z: Z}
- Input from B3: {x: NZ, y: MZ, z: NZ}
- **Merged state:** {$x{:} NZ \sqcup NZ = NZ$, $y{:} NZ \sqcup MZ = \mathbf{MZ}$, $z{:} Z \sqcup NZ = \mathbf{MZ}$}

State entering B3: {x: NZ, y: **MZ**, z: MZ}

**B3 (loop body, second execution):**

| Statement | x | y | z |
|-----------|---|---|---|
| (entry from B2) | NZ | **MZ** | MZ |
| `x = x / y` | **NZ** ⚠️ WARNING: y is MZ! | MZ | MZ |
| `y = y - 1` | NZ | **MZ** (MZ - 1 = MZ) | MZ |
| `z = 5` | NZ | MZ | **NZ** |

State leaving B3: {x: NZ, y: MZ, z: NZ}

**The warning is issued:** At `x = x / y`, the variable y has abstract value MZ (Maybe Zero). The analysis reports a potential divide-by-zero. Crucially, **x stays NZ** — the analysis continues only on the non-crash paths (y ≠ 0), and NZ ÷ NZ = NZ in this model.

#### Iteration 3: Third pass (check for fixed point)

**B2 (merge again):**
- Input from B1: {x: NZ, y: NZ, z: Z}
- Input from B3: {x: NZ, y: MZ, z: NZ}
- **Merged:** {$x{:} NZ \sqcup NZ = NZ$, $y{:} NZ \sqcup MZ = MZ$, $z{:} Z \sqcup NZ = MZ$}

This is identical to Iteration 2's merged state {$x{:}NZ, y{:}MZ, z{:}MZ$}. **Fixed point reached.** No more changes. Analysis terminates.

**Final abstract state at loop body entry:** {x: NZ, y: MZ, z: MZ}

### 4.6 Null Pointer Analysis: Same Idea, Different Domain

The same framework applies to null pointer detection. Replace the abstract domain:

| Abstract Value | Meaning |
|----------------|---------|
| $Null$ | Definitely null |
| $NotNull$ | Definitely not null |
| $MaybeNull$ | Could be null |

**Example (Java):**
```java
Object y = bar();           // y: MaybeNull (bar() might return null)
Object x;
if (y != null) {
    x = new Object();       // x: NotNull (in this branch)
} else {
    x = y;                  // x: Null (y is null in this branch)
}
// After merge: x = NotNull join Null = MaybeNull
x.intVal();                 // WARNING: x is MaybeNull!
```

**Path sensitivity:** After the null check `if (y != null)`, the analysis *refines* the abstract value: y is NotNull on the true branch and Null on the false branch. This is called path-sensitive or branch-refined analysis.

### 4.7 Why Fixed-Point Iteration Terminates

**Guaranteed termination requires three conditions:**

1. **Finite abstract domain:** The set of abstract values is finite (e.g., $\{Z, NZ, MZ\}$ has exactly 3 elements)
2. **Monotonic transfer functions:** Values can only move "up" in the lattice ($f(x) \sqsubseteq f(y)$ when $x \sqsubseteq y$). $Z$ or $NZ$ can become $MZ$, but $MZ$ never becomes $Z$ or $NZ$
3. **Finite height lattice:** There are only finitely many "steps" from bottom to $\top = MZ$

**Because values can only increase and the domain is finite, eventually no value can change further.** This is the fixed point. For zero analysis with 3 variables, the lattice height is 2, so each variable can change at most twice. The analysis always terminates.

> **Exam Tip:** Be able to trace through a zero analysis example step by step. Practice on new code snippets: identify blocks, write initial states, apply transfer rules, merge at joins, iterate until fixed point. The division warning always appears when the divisor reaches MZ.

---

## Part 5: DEEP DIVE -- Model Checking Locking Discipline

### Learning Objectives
- Define model checking and how it differs from dataflow analysis
- State the three rules of locking discipline
- Construct a product automaton from code and a property FSM
- Trace through the product automaton to find violations
- Explain CEGAR and its role in making model checking practical

### 5.1 What is Model Checking?

Model checking is a formal verification technique that exhaustively explores all reachable states of a system to verify whether a property holds {% cite benari2010model %}. If the property is violated, the model checker produces a **counterexample** -- a concrete execution path demonstrating the violation.

**Four-step process:**
1. **Build model** -- represent the program as a state machine
2. **Specify property** -- express the requirement in temporal logic
3. **Exhaustively explore** -- check every reachable state
4. **Counterexample** -- if property violated, provide a witness path

**Temporal logic (brief):**
- **Safety:** $G(\neg \textit{bad})$ -- "Globally, the bad state never occurs." Example: never divide by zero.
- **Liveness:** $G(\textit{request} \rightarrow F\;\textit{response})$ -- "Globally, every request is eventually followed by a response." Example: every lock is eventually unlocked.

**When to use model checking vs dataflow analysis:**

| Criterion | Dataflow Analysis | Model Checking |
|-----------|-------------------|----------------|
| Best for | Value tracking (null, zero, taint) | Protocol/behavioral properties |
| Concurrency | Limited | Excellent (all interleavings) |
| Scalability | Good (handles large codebases) | Limited (state explosion) |
| Output | Warnings at specific lines | Counterexample traces |
| Cost | Moderate | Expensive |

### 5.2 Locking Discipline: Three Rules

A thread interacting with a shared resource via lock/unlock must obey three rules:

1. **No double lock:** Do not lock a resource you already hold
2. **No double unlock:** Do not unlock a resource you do not hold
3. **No terminate-while-locked:** Do not exit while still holding a lock

**Property FSM (Finite State Machine):**

| Transition | From | To | Meaning |
|------------|------|----|---------|
| `lock` | $P_0$ | $P_1$ | Valid: acquire lock |
| `unlock` | $P_1$ | $P_0$ | Valid: release lock |
| `unlock` | $P_0$ | $P_2$ | ERROR: double unlock |
| `lock` | $P_1$ | $P_2$ | ERROR: double lock |
| `end` | $P_1$ | $P_2$ | ERROR: terminate while locked |

This FSM encodes the locking discipline as a specification. Any path that reaches $P_2$ represents a violation.

### 5.3 The Code Under Analysis (Holzmann Example)

Consider this C code handling a device write queue {% cite holzmann2004spin %}:

```c
do {
    lock(&devExt->writeListLock);            // S0: acquire lock
    nPacketsOld = nPackets;
    request = devExt->WriteListHeadVa;
    if (request && request->status) {        // S1: check condition
        devExt->WriteListHeadVa = request->nxt;
        unlock(&devExt->writeListLock);      // S2: release lock (inside if)
        nPackets++;
    }
} while (nPackets != nPacketsOld);           // S3: loop condition
unlock(&devExt->writeListLock);              // S4: release lock (after loop)
```

**Code locations:**
- **S0:** Lock acquired at top of loop
- **S1:** Conditional check (if true: process request; if false: skip to loop condition)
- **S2:** Unlock inside the if-body
- **S3:** Loop condition check (continue or exit)
- **S4:** Unlock after loop exit

**At first glance, this looks correct:** lock at the top, unlock inside the if-body when processing, unlock after the loop when done. But model checking reveals two hidden bugs.

### 5.4 Product Automaton Construction

The product automaton combines the code's CFG with the lock property FSM. Each state is a pair: (code location, lock state).

**Step-by-step construction:**

**Start:** $(S_0, P_0)$ -- at the lock statement, lock is not held

**Path A: if-condition is TRUE (request exists and has status)**

$$P_0S_0 \xrightarrow{\text{lock}} P_1S_1 \xrightarrow{\text{if true}} P_1S_2 \xrightarrow{\text{unlock}} P_0S_3 \xrightarrow{\text{exit}} P_0S_4 \xrightarrow{\text{unlock}} \textbf{ERROR}$$

Double unlock! Lock was released at $S_2$, then released again at $S_4$.

**Path B: if-condition is FALSE (no request or bad status)**

$$P_0S_0 \xrightarrow{\text{lock}} P_1S_1 \xrightarrow{\text{if false}} P_1S_3 \xrightarrow{\text{loop}} P_1S_0 \xrightarrow{\text{lock}} \textbf{ERROR}$$

Double lock! Lock was never released (if-body skipped), then acquired again on next iteration.

### 5.5 Bug 1: Double Lock (if-condition FALSE)

**Counterexample trace:**
1. Start: unlocked (P0)
2. S0: `lock()` -- acquire lock, now P1
3. S1: condition is false (request is null or status is 0)
4. Skip if-body entirely -- lock is **never released**
5. S3: `nPackets == nPacketsOld` is still true (nothing changed), so loop continues
6. S0: `lock()` again -- **ERROR: already locked (P1 -> P2)**

**Root cause:** When the if-condition is false, the `unlock()` inside the if-body is never executed. The loop continues back to S0, which tries to lock again while the lock is still held.

### 5.6 Bug 2: Double Unlock (if-condition TRUE, loop exits)

**Counterexample trace:**
1. Start: unlocked (P0)
2. S0: `lock()` -- acquire lock, now P1
3. S1: condition is true (request exists)
4. S2: `unlock()` -- release lock, now P0
5. S3: `nPackets != nPacketsOld` is false (one packet processed, counts differ -- wait, actually `nPackets` was incremented, so they differ and loop continues)

Actually, let us trace more carefully: After processing one request, `nPackets` is incremented but `nPacketsOld` was set to the old value. So `nPackets != nPacketsOld` is TRUE and the loop continues. The loop exits only when no request is processed in an iteration. But that means the if-condition was false, which is Bug 1's scenario.

**Revised trace for Bug 2:** Consider the case where the if-condition is true on the first iteration (unlock at S2) and then the if-condition is false on the second iteration (no unlock). Now `nPackets == nPacketsOld`, so the loop exits at S3. At this point, the lock is held (from the second iteration's lock at S0 without unlock). Then S4 does `unlock()` -- this is actually correct for this path.

The double unlock scenario occurs if: after processing the last request (unlock at S2), the loop condition evaluates to exit (nPackets == nPacketsOld somehow), and then S4 does `unlock()` again. The model checker identifies the precise condition under which this path is feasible.

**Path:** $P_0 \xrightarrow{\text{lock}(S_0)} P_1 \xrightarrow{\text{unlock}(S_2)} P_0 \xrightarrow{\text{exit}(S_3)} P_0 \xrightarrow{\text{unlock}(S_4)} \textbf{ERROR}$

**Key insight:** Both bugs are non-local -- the lock and unlock operations are spread across different code locations and control flow paths. The product automaton mechanically reveals all paths to the error state.

> **Exam Tip:** Be able to construct a product automaton given a short code snippet and a property FSM. Practice: label code locations (S0, S1, ...), draw the property FSM (P0, P1, P2), then enumerate all (Si, Pj) pairs reachable from the start state.

### 5.7 CEGAR: Counter-Example Guided Abstraction Refinement

Real programs have too many states to explore exhaustively. **CEGAR** makes model checking practical by iteratively refining abstractions {% cite ball2004slam %}:

**The CEGAR loop:**

1. **Abstract:** Create a coarse model of the program (ignore some details)
2. **Verify:** Run model checker on the abstract model
3. **Check counterexample:** Is the reported violation real or spurious?
   - If **real:** report the bug (done)
   - If **spurious:** the abstraction was too coarse
4. **Refine:** Add more detail to the abstraction to eliminate the spurious counterexample
5. **Repeat** from step 2 with the refined model

**Why CEGAR works:** It only adds detail where needed. Most of the program can remain abstract; only the parts relevant to the bug need precision.

### 5.8 Microsoft SLAM / Static Driver Verifier

The SLAM project at Microsoft {% cite ball2004slam %} {% cite ball2011slam %} industrialized CEGAR-based model checking:

| Aspect | Detail |
|--------|--------|
| **Domain** | Windows device drivers |
| **Technique** | CEGAR with predicate abstraction |
| **Deployment** | Static Driver Verifier (SDV), shipped in the Windows Driver Development Kit |
| **Duration** | A decade of successful deployment (2001-2011+) |
| **Impact** | Reduced driver-related Blue Screens of Death (BSODs) |
| **Requirement** | Every Windows driver must pass SDV before certification |

Ball et al. {% cite ball2011slam %} reported that SLAM successfully transitioned from research to product, verifying temporal safety properties of device drivers (such as locking discipline, IRP handling, and power management protocols).

### 5.9 State Explosion Problem

The fundamental challenge of model checking is **state explosion**: the number of states grows exponentially with the number of variables and threads.

| Factor | Growth |
|--------|--------|
| **Variables** | $k$ variables with $n$ values each = $n^k$ states |
| **Threads** | $t$ threads with $s$ states each = $s^t$ interleavings |
| **Combined** | Multiplicative: variables $\times$ threads |

**Mitigation strategies:**

| Strategy | Description | Example |
|----------|-------------|---------|
| **Abstraction** | Replace concrete values with abstract domains | CEGAR, predicate abstraction |
| **Partial-order reduction** | Skip equivalent interleavings | SPIN |
| **Symbolic model checking** | Represent state sets as BDDs/SAT formulas | NuSMV |
| **Bounded model checking** | Check only paths up to length k | CBMC |
| **Compositional verification** | Verify components separately | Assume-guarantee |

> **Key Insight:** The state explosion problem is fundamental and cannot be eliminated -- it can only be managed through abstraction and clever search strategies.

> **Exam Tip:** Be able to explain CEGAR in your own words: start coarse, check, refine only where needed. Know that SLAM used CEGAR for Windows drivers and that SDV was shipped in the DDK.

---

## Part 6: Modern Practice

### Learning Objectives
- Classify modern SA tools by category and capability
- Explain the 10% false positive rule and its industrial validation
- Compare cost-effectiveness of SA vs testing vs inspection
- Describe symbolic execution and the LLM frontier

### 6.1 Modern Tool Landscape

| Category | Example Tools | Best For |
|----------|---------------|----------|
| **Linters** | ESLint, Pylint, Checkstyle | Style, basic patterns |
| **Type checkers** | mypy, TypeScript, Flow | Type safety |
| **Bug finders** | SpotBugs, PMD, Error Prone | Known bug patterns |
| **Advanced analyzers** | SonarQube, Coverity, Infer | Deep dataflow, inter-procedural |
| **Security analyzers** | CodeQL, Semgrep, Fortify | Vulnerability detection |
| **Platforms** | Tricorder (Google), Infer (Meta) | Scale deployment, workflow integration |

**No single tool is sufficient.** Different tools catch different categories of bugs with different precision/recall tradeoffs. Best practice is to use multiple complementary tools.

### 6.2 Google Tricorder: The 10% Rule in Practice

Sadowski et al. {% cite sadowski2015tricorder %} described Google's Tricorder platform:

| Metric | Value |
|--------|-------|
| Daily findings | ~93,000 across 31,000 changelists |
| False positive threshold | **<10%** effective "not useful" rate |
| Probation trigger | >10% "not useful" rate |
| Immediate disable | >25% "not useful" rate |
| Platform-wide "not useful" rate | ~5% (<4% excluding probationary tools) |
| Daily "PLEASE FIX" clicks | 716 |

**Key design principles:**
1. **Measure usefulness, not accuracy** -- developer action is the metric
2. **Workflow integration** -- findings appear during code review, not in a separate dashboard
3. **Empower domain experts** -- engineers write custom analyzers for their subsystems
4. **Project-level customization** -- not per-user (maintains team consistency)
5. **Provide fixes, not just warnings** -- suggested auto-fixes lower the barrier to action

> "The bottom line is that developers will decide whether an analysis tool has high impact, and what a false positive is." {% cite sadowski2015tricorder %}

### 6.3 The Tool Agreement Problem

Lenarduzzi et al. {% cite lenarduzzi2021comparison %} compared six Java SA tools on 47 projects (13.5 million warning instances):

| Metric | Value |
|--------|-------|
| Line-level agreement | **<0.4%** |
| Highest pairwise overlap | FindBugs + PMD: 9.4% |
| 3+ tool agreement | **Zero** at line level |

**Implications:**
- "Our SonarQube is clean" does NOT mean "our code is bug-free"
- Each tool sees different things -- they are complementary, not redundant
- The ensemble approach (multiple tools) catches more bugs than any single tool
- High precision does not mean comprehensive (CheckStyle is precise but narrow)

### 6.4 Cost-Effectiveness Evidence

Multiple industrial studies converge on consistent cost-effectiveness benchmarks:

| Metric | Value | Source |
|--------|-------|--------|
| **Dev vs Testing cost** | **10x cheaper** to find defects during development | Jaspan et al. {% cite jaspan2007understanding %} |
| **ASA vs Manual Inspection cost** | ASA costs **60-72%** of manual inspection per defect | Zheng et al. {% cite zheng2006static %} |
| **ASA defect yield** | 23-37% of total defects | Zheng et al. {% cite zheng2006static %} |
| **Testing defect yield** | 63-98% of total defects | Zheng et al. {% cite zheng2006static %} |
| **eBay initial FP rate** | 50% (out of the box) | Jaspan et al. {% cite jaspan2007understanding %} |
| **eBay after customization** | **~10%** effective FP rate | Jaspan et al. {% cite jaspan2007understanding %} |
| **Google SA volume** | 93K findings/day | Sadowski et al. {% cite sadowski2015tricorder %} |

**Interpretation:**
- SA finds *different* bugs than testing -- Checking/Assignment defects vs Functional/Algorithmic
- SA is cheaper per defect than manual inspection but finds fewer total defects
- The combination of SA + testing catches more than either alone
- **Customization is essential:** eBay reduced FP from 50% to 10% by dropping 75% of default checks

**ROI example (eBay):**
```
2 FTE x $200K/year = $400K/year for SA maintenance
= Same cost as 2 manual testers
But SA scales to millions of LOC; manual testers don't
```

### 6.5 Symbolic Execution

Symbolic execution treats program inputs as symbolic variables rather than concrete values, building *path conditions* -- logical formulas that describe what inputs follow each path. An SMT solver (Z3, STP) determines if each path is feasible and generates concrete test inputs.

**KLEE results** (Cadar et al. {% cite cadar2008klee %}):

| Metric | Value |
|--------|-------|
| COREUTILS coverage | **90%+** average (median 94%) |
| vs Developer tests | **+16.8%** better coverage |
| Bugs found | **56 serious bugs** (including 3 missed for 15 years) |
| Run time | ~89 hours (automated) |

> "The roughly 89-hour run used to generate COREUTILS line coverage beat the developers' own test suite -- built incrementally over fifteen years -- by 16.8%!" {% cite cadar2008klee %}

**Challenge: Path explosion.** For $n$ branches, there are up to $2^n$ paths. Mitigation strategies {% cite bailey2025symexec %} include scope reduction, guidance heuristics, and hybrid approaches (combining with fuzzing).

### 6.6 The LLM Frontier

Li et al. {% cite li2024iris %} developed IRIS, a neuro-symbolic approach combining LLMs with CodeQL:

| Metric | IRIS (GPT-4) | CodeQL Alone |
|--------|--------------|--------------|
| Vulnerabilities detected | 55 | 27 |
| Improvement | **+103.7%** | baseline |
| New vulnerabilities found | 4 | 0 |

**How IRIS works:**
1. LLM infers taint specifications for third-party APIs that CodeQL cannot handle
2. Augmented specifications fed to CodeQL engine
3. LLM filters spurious results using contextual reasoning

Wang et al. {% cite wang2025llmpa %} surveyed LLM applications in program analysis, reporting 50-99% effectiveness depending on task and model, but noted significant limitations: non-determinism, hallucinations, token limits, and prompt engineering dependence.

> **Key Insight:** LLMs augment, not replace, traditional SA tools. Best results come from combining LLM semantic understanding with traditional SA soundness guarantees.

### 6.7 Industrial Deployment: Nortel Case Study

Zheng et al. {% cite zheng2006static %} studied SA deployment at Nortel Networks across 33+ million lines of code:

| Method | Defect Yield | Cost per Defect |
|--------|-------------|-----------------|
| ASA (FlexeLint, Klocwork) | 23-37% | 60-72% of inspection cost |
| Manual Inspection | 20-40% | Baseline (100%) |
| Testing | 63-98% | Highest (but catches most) |

**Key finding:** ASA and manual inspection have similar yield, but ASA costs 28-40% less. The defect types are complementary: ASA excels at Checking and Assignment errors; testing excels at Functional and Algorithmic errors.

> **Exam Tip:** Know the 10% FP rule (Tricorder threshold), the <0.4% tool agreement finding, and why workflow integration matters more than tool accuracy. Be able to cite the cost-effectiveness numbers: 10x cheaper than testing, 60-72% of inspection cost.

---

## Part 7: Summary

### 7.1 Key Takeaways

1. **Systematic:** Static analysis examines all paths via abstraction. Zero analysis demonstrates exactly how abstraction reduces $2^{96}$ states to 64.

2. **Limited by theory:** Rice's Theorem {% cite rice1953classes %} proves no analysis can be simultaneously sound, complete, and terminating. Every practical tool makes tradeoffs.

3. **Diverse techniques:** The continuum from AST pattern matching to theorem proving offers different cost/precision tradeoffs. Dataflow analysis tracks values; model checking explores behaviors.

4. **Proven at scale:** Microsoft SLAM {% cite ball2004slam %} {% cite ball2011slam %} verified Windows drivers. Google Tricorder {% cite sadowski2015tricorder %} processes 93K findings/day. eBay {% cite jaspan2007understanding %} achieved 10x cost savings.

5. **Cost-effective:** SA costs 60-72% of manual inspection {% cite zheng2006static %} and is 10x cheaper than finding defects during testing {% cite jaspan2007understanding %}.

6. **Workflow integration is critical:** The 10% FP threshold {% cite sadowski2015tricorder %}, tool customization {% cite jaspan2007understanding %}, and multiple complementary tools {% cite lenarduzzi2021comparison %} are the three pillars of successful deployment.

7. **Evolving frontier:** Symbolic execution (KLEE: 90%+ coverage {% cite cadar2008klee %}) and LLM augmentation (IRIS: +103% detection {% cite li2024iris %}) are expanding what static analysis can achieve.

### 7.2 Key Numbers Reference Card

| Metric | Value | Source |
|--------|-------|--------|
| FP threshold (Google) | **<10%** | Sadowski 2015 |
| Daily findings (Google) | **93K** | Sadowski 2015 |
| Tool agreement | **<0.4%** | Lenarduzzi 2021 |
| SonarQube precision | **18%** | Lenarduzzi 2021 |
| Dev vs Testing cost | **10x cheaper** | Jaspan 2007 |
| ASA vs Inspection cost | **60-72%** | Zheng 2006 |
| ASA defect yield | **23-37%** | Zheng 2006 |
| eBay FP after tuning | **~10%** | Jaspan 2007 |
| KLEE coverage | **90%+ median** | Cadar 2008 |
| IRIS improvement | **+103%** | Li 2024 |
| Linux kernel bugs (Engler) | **1000+** | Engler 2001 |

---

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text summarization, polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
