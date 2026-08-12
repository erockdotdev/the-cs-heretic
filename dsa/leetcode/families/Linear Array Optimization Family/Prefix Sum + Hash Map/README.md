# Prefix Sum + Hash Map Master Reference & Extension Guide

## Prefix Sum Blueprint & LeetCode Companion Reference

This companion map links the core prefix sum and reduction architectures directly to their primary LeetCode benchmarks.

---

### The Complete Problem & Variation Suite

| Category              | Constraint Type               | Core Mechanics                                                                                 | Companion LeetCode Problems                      |
| --------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Base Problem**      | Exact Target Match            | Track cumulative sums to find subarrays matching an exact target sum $K$.                      | • **LeetCode 560:** Subarray Sum Equals K        |
| **Variation Group 1** | Divisibility & Modulo Parity  | Track running remainders to find subarrays whose sum is divisible by $K$.                      | • **LeetCode 974:** Subarray Sums Divisible by K |
| **Variation Group 2** | Binary Balance & Equal Counts | Transform binary arrays (e.g., treating `0` as `-1`) to find equal counts via running balance. | • **LeetCode 525:** Contiguous Array             |

---

### Master Execution Summary

1. **Identify the Constraint Core:** Determine whether the problem requires tracking exact running totals, modular arithmetic remainders, or balanced binary states across a contiguous range containing negative values.
2. **Select the Strategy & Data Structure:** Choose a frequency `Map<number, number>` mapping cumulative values (or remainders) to their occurrence counts or earliest-seen index positions.
3. **Define the Complement Check:** At each index, compute the running state and check if `current_state - target` (or equivalent modular condition) already exists in your history map to accumulate valid subarray counts or maximize lengths instantly.

---

## Prefix Sum Strategy Matrix: Exact Match vs. Divisibility vs. Binary Balance

This reference matrix categorizes prefix sum problems based on their core constraint type, dictating the data structure, invariant check, and map update rule you should use in an interview.

### The Core Strategy Matrix

| Constraint Category   | Core Objective                                                                      | Ideal Data Structure                                   | Complement / Update Rule                                                                       | Example Problems                 |
| --------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------- |
| **1. Exact Match**    | Find contiguous subarrays summing to target $K$.                                    | Frequency `Map<number, number>` (`prefixSum -> count`) | Check if `currentSum - target` exists in map; add count to result.                             | • *Subarray Sum Equals K*        |
| **2. Divisibility**   | Find subarrays where the sum is divisible by $K$.                                   | Frequency `Map<number, number>` (`remainder -> count`) | Normalize remainder (`(sum % k + k) % k`) and check if it exists in map.                       | • *Subarray Sums Divisible by K* |
| **3. Binary Balance** | Find subarrays with equal numbers of two distinct elements (e.g., equal 0s and 1s). | Index Map (`balance -> earliest_index`)                | Treat `0` as `-1`, track running balance, check if balance was seen before to maximize length. | • *Contiguous Array*<br>         |

<br>• *Longest Subarray with Equal 0s and 1s* |

---

### Key Architectural Takeaways

* **Exact Match (The Complement Counter):** Mirroring Two Sum, it records historical running sums. If the difference between the current prefix sum and target $K$ appeared previously, those past positions form valid subarrays ending at the current index.
* **Divisibility (The Modulo Restorer):** Leverages modular arithmetic properties. Because negative numbers can throw off standard modulo operators in JavaScript/TypeScript, normalizing remainders ensures safe map lookups for historical matching.
* **Binary Balance (The Equilibrium Tracker):** Converts discrete category counting into a continuous zero-sum balance sheet. Spotting the same balance index twice proves that the net change between those points was zero.

---

## 9. Known Variations & Strategy Adaptations

Interviewers frequently use **Subarray Sum Equals K** as a baseline, then introduce a twist to test whether you truly understand prefix reduction mechanics or just memorized a static solution.

Here are the most common variations and how they alter your core strategy:

---

### Variation 1: Subarray Sums Divisible by K (e.g., LeetCode 974)

* **The Twist:** Instead of finding a specific target sum $K$, you must find the total number of contiguous subarrays whose sum is *divisible* by $K$.
* **Strategy & Data Structure Shift:**
* Replace exact running sums with **normalized remainders (`remainder = (sum % k + k) % k`)**.
* **Condition Shift:** Instead of checking for `currentSum - target`, you check how many times the *exact same remainder* has appeared previously in your map. Every prior occurrence represents a valid subarray chunk that adds a multiple of $K$.
* **Time & Space Complexity:** Time remains **$O(n)$**, and space is **$O(\min(n, k))$** since remainders are strictly bound by $K$.



---

### Variation 2: Contiguous Array (e.g., LeetCode 525)

* **The Twist:** Find the maximum length of a contiguous subarray with an equal number of `0`s and `1`s.
* **Strategy & Data Structure Shift:**
* Transform the input on the fly: treat every `0` as `-1` and every `1` as `+1`.
* **Condition Shift:** Track the running balance. If you encounter a balance that was seen earlier, the subarray between those two indices has a net sum of zero (meaning equal counts of `-1` and `+1`). Track earliest index occurrences to maximize length rather than just counting combinations.
* **Time & Space Complexity:** **$O(n)$** time and **$O(n)$** space.



---

### Variation 3: Maximum Size Subarray Sum Equals k (e.g., LeetCode 325)

* **The Twist:** Instead of counting *all* valid subarrays, find the *maximum length* of a contiguous subarray that sums to target $K$.
* **Strategy & Data Structure Shift:**
* Maintain a map storing the **earliest index** where each prefix sum occurred, rather than a frequency count.
* **Condition Shift:** When `currentSum - target` is found in the map, calculate the length (`currentIndex - map.get(targetComplement)`) and update your maximum length. Do not overwrite existing prefix sum indices so you preserve the longest possible span.
* **Time & Space Complexity:** **$O(n)$** time and **$O(n)$** space.



---

### How to Frame This to Your Interviewer

If an interviewer pivots to one of these variations, use this script fragment:

> *"That’s a natural evolution of the problem. Because we are shifting from tracking an exact numerical difference to handling modular remainders or balanced binary states, we pivot our Hash Map tracking from frequency counts of raw sums to historical remainders or earliest-seen index positions, preserving our linear $O(n)$ run time."*

---

## Core Taxonomy Summary

Every prefix sum and reduction problem boils down to one of these three fundamental constraint types:

### 1. Exact Match & Complement (The Two Sum Mirror)

* **The Core Mechanics:** The running total accumulates forward, and history is queried backward using a direct mathematical inverse ($\text{currentSum} - \text{target}$).
* **Classic Patterns:** Finding subarrays summing to an exact target value, counting ranges, or finding max/min bounds.

### 2. Modular Parity & Divisibility (The Cycle Tracker)

* **The Core Mechanics:** Operates on cyclic equivalence classes. Remainder tracking allows grouping infinite potential sums into discrete bucket counts ($0$ to $K-1$).
* **Classic Patterns:** Divisibility checks, cyclic subarray distributions, and periodic sum constraints.

### 3. Equilibrium & Balance Mapping (The Net-Zero Span)

* **The Core Mechanics:** Encodes dual-state conditions into a fluctuating balance metric where returning to a previous state indicates a neutral transition cycle.
* **Classic Patterns:** Equal binary element counts, bracket matching balances, and net-zero elevation spans.


### Pillar 3: Prefix Sum + Hash Map (The Hybrid Negative-Range Bridge)

Prefix Sum + Hash Map solves problems involving **contiguous subarrays when negative numbers break sliding window monotonicity**. It acts as a powerful architectural bridge: it operates in a **Sliding Window domain** (contiguous ranges) by utilizing a **Two Sum mechanism** (historical complement lookups).

Interviewers frequently test the boundary between its three distinct sub-patterns:

---

### 1. Sub-categorizing Pillar 3: Exact Match vs. Divisibility vs. Binary Balance

#### Exact Match (The Complement Counter)

* **The Mechanics:** Used when tracking running totals to find subarrays matching an exact target sum $K$ (e.g., *Subarray Sum Equals K*).
* **Hash Map Logic:** Mirrors standard Two Sum. It records historical prefix sums in a frequency map so future indices can instantly query the required mathematical inverse ($\text{currentSum} - \text{target}$) in $O(1)$ time.

#### Modular Parity (The Cycle Tracker)

* **The Mechanics:** Used when finding subarrays whose sum is divisible by $K$ (e.g., *Subarray Sums Divisible by K*).
* **Hash Map Logic:** Tracks normalized remainders (`(sum % k + k) % k`). Because negative numbers can disrupt standard modulo operations, normalizing remainders ensures safe map lookups for historical matching.

#### Equilibrium Balance (The Net-Zero Span)

* **The Mechanics:** Used for binary or dual-state arrays where counts must match (e.g., *Contiguous Array* for equal 0s and 1s).
* **Hash Map Logic:** Transforms discrete category counting into a continuous zero-sum balance sheet (e.g., treating `0` as `-1`). Spotting the exact same balance index twice proves a net-zero change, allowing the tracking of earliest-seen indices to maximize span length.

---

### The Three Prefix Sum Variation Tiers

1. **Exact Match (The Two Sum Mirror):** Governed by a direct target difference ($\text{currentSum} - \text{target}$). Counts total valid ranges or tracks maximum spans using frequency or index maps (e.g., *LeetCode 560 / 325*).
2. **Divisibility (The Cycle Restorer):** Governed by cyclic equivalence classes. Tracks normalized remainders to group potential sums into discrete bucket counts (e.g., *LeetCode 974*).
3. **Binary Balance (The Equilibrium Tracker):** Governed by net-zero shifts. Encodes dual-state conditions into a fluctuating balance metric where returning to a previous state indicates a neutral transition cycle (e.g., *LeetCode 525*).

---

### Complexity Profile

* **Time Complexity:** **$O(n)$** — A single forward pass through the array with $O(1)$ Hash Map lookups and updates at each step.
* **Space Complexity:** **$O(n)$** — Auxiliary space required to store historical prefix sums, remainders, or balance indices in the Hash Map.


