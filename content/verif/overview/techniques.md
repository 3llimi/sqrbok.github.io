---
parent: Overview
nav_order: 1
title: Techniques
layout: default
---

# 🧪 **Software Verification**

## 🎯 **Purpose of Software Verification**

Software verification ensures the quality, reliability, and correctness of a system.  

- **Objective**: To confirm that software fulfills its intended purpose without causing unintended behaviors.  
- **Two Key Goals**:  
  1. ✅ Ensure the software **does what it is supposed to do** under its stated conditions.  
  2. ❌ Ensure the software **does not do what it is not supposed to do**, even under adverse conditions.  

> **Key Insight**: Verification is a **continuous process** integrated throughout the software development lifecycle. It is not a one-time activity at the end.

---

## 🛠️ **Techniques of Software Verification**

1. **Inspection**  
2. **Analysis**  
3. **Testing**  
4. **Demonstration**  

Each technique addresses specific aspects of verification, and combining them ensures robust software quality.

---

## 1. 🔍 **Inspection**

- **Definition (INCOSE)**:
  A verification method of **determining performance** by examining engineering documentation and the item itself using **visual means** or simple measurements.

- **Definition (Practitioner's View)**:
  The **systematic review of development artifacts** (e.g., code, design) by others to detect non-conformance and uncover defects.

> See the dedicated [Inspection section](../inspection/) for full coverage: Fagan process, reading techniques, capture-recapture, and effectiveness data.

---

## 2. 📊 **Analysis**

### 📖 **What is (Static) Analysis?**

- **Definition (INCOSE)**:  
  Static analysis involves evaluating a design or requirement using:  
  - Calculations.  
  - Modeling and simulation.  
  - Empirical data extrapolation.  

- **Definition (Practitioner’s View)**:  
  Static analysis examines software’s **syntactic, structural, or behavioral properties** without execution.  

> **Two Types**:

> - **Static Analysis**: No execution; relies on code or model examination.  
> - **Dynamic Analysis**: Execution under controlled conditions.  

---

### 🧰 **Uses of Static Analysis**

The Static Analysis

- Identifies:  
  - Style issues or unsafe coding practices (e.g., use of dangerous constructs).  
  - Security vulnerabilities (e.g., buffer overflows).  
  - Resource usage (e.g., excessive memory allocation).  
- Verifies:  
  - **Safety properties** (e.g., no crashes).  
  - **Liveness properties** (e.g., tasks complete).  
  - **Temporal properties** (e.g., real-time deadlines).  

---

### 🔍 **Examples of Static Analysis**

- Detecting **memory leaks** or dangling pointers.  
- Verifying compliance with standards (e.g., MISRA for C/C++).  
- Identifying inefficient resource usage or potential deadlocks.  

---

### 🌟 **Benefits**

1. **Automation**: Many tools automate defect detection.  
2. **Early Insights**: Identifies issues before execution.  

### ⚠️ **Limitations**

- **False Positives**: May flag harmless code as errors, requiring manual review.  
- Cannot identify runtime errors caused by dynamic inputs or environment changes.  

---

## 3. 🧪 **Testing**

### 📖 **What is Testing?**

- **Definition (INCOSE)**:  
  Verification by operating the system or item under controlled conditions and analyzing the results.  

- **Definition (Practitioner’s View)**:  
  Testing is the **execution of software** to uncover defects and validate functionality before release.  

> **Key Insight**: A good test is one that **makes the software fail** to expose hidden defects.  

---

### 🧰 **Uses of Testing**

- **Functional Verification**: Confirms the software meets user requirements.  
- **Performance Verification**: Ensures the system handles expected workloads.  

---

### 🔍 **Examples**

- Testing user login functionality.  
- Conducting load tests for 1,000 transactions per minute.  

---

### 🧮 **Classifications of Testing**

#### By Level:
- **Unit Testing**: Testing individual components.  
- **Integration Testing**: Testing interactions between components.  
- **System Testing**: Testing the full system.

#### By Purpose:
- Functional correctness, robustness, performance, regression, and acceptance.  

#### By Execution Mode:
- **Manual**: Human-driven testing.  
- **Automated**: Tool-driven testing.

---

### 🌟 **Benefits**
1. Provides systematic coverage of functional and non-functional requirements.  
2. Supports iterative development through regression testing.  

### ⚠️ **Limitations**
- Cannot guarantee the absence of defects.  
- May miss edge cases without thorough planning.  

---

## 4. 🖥️ **Demonstration**

### 📖 **What is Demonstration?**

- **Definition (INCOSE)**:  
  Verification by observing the item’s operation under natural or production-like conditions.  

- **Definition (Practitioner’s View)**:  
  Demonstration involves **showcasing functionality** to confirm behavior under real-world scenarios.

---

### 🧰 **Uses of Demonstration**

- Typically for **user acceptance testing** or early feedback.  
- Verifies that the system functions correctly under representative scenarios.  

---

### 🔍 **Examples**

- Walking users through application workflows.  
- Observing system behavior in production environments.  

---

## 🔍 **Soundness vs. Completeness in Analysis**

- **Sound Analysis**: Ensures no errors are missed but may include false positives.  
- **Complete Analysis**: Reports only real issues but might miss some defects.  

> **Key Insight**: No static analysis can achieve soundness, completeness, and termination simultaneously due to **Rice’s Theorem**.  

---

### ⚠️ **Trade-Offs in Commercial Tools**

- Tools like **Coverity**, **CodeSonar**, and **Fortify** prioritize practicality over theoretical guarantees.  
- Simpler tools (e.g., **Lint**, **FindBugs**) are effective for detecting common issues but lack semantic depth.  

---

## 📊 **Conclusion: Combining Techniques**

The industry average defect rate is **0.5–5 defects per 1,000 lines of code** (customer-reported). True rates may be **10x higher**, closer to 0.5–5 defects per 100 lines.  

- **Key Takeaway**: Combining multiple techniques enhances defect detection and quality assurance.  

*Adapted from G. Holzmann, Software Analysis and Model Checking, 2002 {% cite holzmann2002checking %}*

### References

{% bibliography --cited %}

---

{: .highlight }
**Disclaimer:** AI is used for text polishing and explaining. Authors have verified all facts and claims. In case of an error, feel free to file an issue.
