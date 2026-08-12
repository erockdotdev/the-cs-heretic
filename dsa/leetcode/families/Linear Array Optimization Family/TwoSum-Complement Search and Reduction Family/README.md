

# Two Sum & Pair Combination Master Reference & Extension Guide

## Two Sum Blueprint & LeetCode Companion Reference

This companion map links the core pair-matching and combinatorial architectures directly to their primary LeetCode benchmarks.

---

### The Complete Problem & Variation Suite

| Category              | Constraint Type            | Core Mechanics                                                                           | Companion LeetCode Problems                                |
| --------------------- | -------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Base Problem**      | Unsorted Complement Search | Look backward at historical elements using a hash map to find a mathematical complement. | • **LeetCode 1:** Two Sum                                  |
| **Variation Group 1** | Sorted Boundary Search     | Leverage global monotonicity to move opposite-directional pointers inward.               | • **LeetCode 167:** Two Sum II - Input Array Is Sorted<br> |

<br>• **LeetCode 653:** Two Sum IV - Input is a BST |
| **Variation Group 2** | Combinatorial Reduction | Fix one or more elements via outer loops and reduce the remainder into a two-pointer search. | • **LeetCode 15:** 3Sum<br>

<br>• **LeetCode 18:** 4Sum |

---

### Master Execution Summary

1. **Identify the Constraint Core:** Determine whether the input data is sorted or unsorted, and whether you are searching for a pair, a triplet, or a higher-order combination.
2. **Select the Strategy & Data Structure:** Choose between a historical Hash Map (for unsorted random lookups) or Opposite-Directional Converging Pointers (for sorted monotonic spaces).
3. **Define the Invariant Check:** Ensure the complement relationship (`target - current`) or boundary evaluation condition (`sum < target` vs. `sum > target`) drives your pointer or lookup logic safely.

---

## Two Sum Strategy Matrix: Hash Map vs. Converging Pointers vs. Reduction

This reference matrix categorizes pair-matching problems based on their core constraint type, dictating the data structure, invariant check, and traversal mechanism you should use in an interview.

### The Core Strategy Matrix

| Constraint Category               | Core Objective                                         | Ideal Data Structure / Technique                | Invariant Check / Lookup Rule                                     | Example Problems |
| --------------------------------- | ------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------- | ---------------- |
| **1. Unsorted Complement Lookup** | Find a pair summing to target in an unordered dataset. | Hash Map (`value -> index` or `value -> count`) | Check if `target - current` exists in history map in $O(1)$ time. | • *Two Sum*<br>  |

<br>• *Two Sum III (Design)* |
| **2. Monotonic Boundary Search** | Find pairs or bounds in a pre-sorted dataset using minimal space. | Opposite-Directional Converging Pointers (`left` at start, `right` at end) | If `sum < target`, increment `left`; if `sum > target`, decrement `right`. | • *Two Sum II - Input Array Is Sorted*<br>

<br>• *Container With Most Water* |
| **3. Combinatorial Reduction** | Find multi-element sets (triplets, quadruplets) matching a target sum. | Outer loop(s) + Sorted Array + Converging Pointers | Fix element `i`, skip duplicates, and solve the remaining window as a Two Sum II problem. | • *3Sum*<br>

<br>• *4Sum* |

---

### Key Architectural Takeaways

* **Unsorted Complement Lookup (The History Trader):** Trades extra space ($O(n)$ space) for time ($O(n)$ time). Instead of nested loops, it relies on the mathematical certainty that a required complement either has or hasn't appeared yet in the active dataset.
* **Monotonic Boundary Search (The Space Saver):** Exploits global sorting to reduce space complexity down to $O(1)$. By guaranteeing that moving pointers inward predictably scales values up or down, it eliminates the need for external hash maps.
* **Combinatorial Reduction (The Dimensionality Reducer):** Proves that harder problems are built from simpler ones. By anchoring one or two variables, an $O(n^3)$ or $O(n^4)$ brute-force search is safely compressed into an efficient $O(n^2)$ two-pointer evaluation.

---

## 9. Known Variations & Strategy Adaptations

Interviewers frequently use **Two Sum** as a baseline, then introduce a structural twist to test whether you understand underlying memory trade-offs and index preservation rules.

Here are the most common variations and how they alter your core strategy:

---

### Variation 1: Two Sum II - Input Array Is Sorted (e.g., LeetCode 167)

* **The Twist:** The input array is already sorted, and you must return the pair indices using **$O(1)$ extra space**.
* **Strategy & Data Structure Shift:**
* Drop the Hash Map entirely to eliminate $O(n)$ auxiliary space.
* **Condition Shift:** Transition from complement lookups to **Converging Pointers**. Place `left` at index `0` and `right` at `n - 1`, moving them inward based on whether the sum is under or over the target.
* **Time & Space Complexity:** Time remains **$O(n)$**, but space drops to **$O(1)$**.



---

### Variation 2: 3Sum (e.g., LeetCode 15)

* **The Twist:** Find all *unique triplets* in an unsorted array that sum to zero (no duplicate triplets allowed).
* **Strategy & Data Structure Shift:**
* Combine **Sorting** with **Combinatorial Reduction**. First, sort the array (which enables duplicate skipping and converging pointers).
* **Condition Shift:** Use a `for` loop to fix the first element (`nums[i]`), then deploy converging pointers (`left = i + 1`, `right = n - 1`) for the remaining subarray to find pairs summing to `-nums[i]`. Add duplicate-skipping guards (`if (i > 0 && nums[i] === nums[i-1]) continue`).
* **Time & Space Complexity:** **$O(n^2)$** time and **$O(1)$ or $O(n)$** auxiliary space depending on the sorting implementation.



---

### Variation 3: Two Sum IV - Input is a BST (e.g., LeetCode 653)

* **The Twist:** Instead of a linear array or stream, the dataset is structured as a Binary Search Tree, and you need to determine if a pair exists that sums to target $K$.
* **Strategy & Data Structure Shift:**
* Transition from array indexing to **Tree Traversal (DFS/BFS)** combined with a running **Hash Set**.
* **Condition Shift:** Traverse the tree while checking if `target - node.val` exists in your `Set`. If it does, return true; otherwise, add `node.val` to the Set and continue traversal.
* **Time & Space Complexity:** **$O(n)$** time and **$O(n)$** space to store node values in the set or recursion stack.



---

### How to Frame This to Your Interviewer

If an interviewer pivots to one of these variations, use this script fragment:

> *"That’s a natural evolution of the problem. Because the data structure changes from an unsorted collection to a sorted sequence or a multi-dimensional combination, we pivot our strategy—either dropping the Hash Map for **Converging Pointers** to optimize space, or applying a **Reduction Strategy** via sorting to handle multi-element pairs in polynomial time."*

---

## Core Taxonomy Summary

Every pair-matching and sum combination problem boils down to one of these three fundamental structural types:

### 1. Complement Lookup (The Unsorted History Map)

* **The Core Mechanics:** Operates on raw, unordered data. Relies on instant random-access lookups to verify if a required mathematical inverse has already been scanned.
* **Classic Patterns:** Standard Two Sum, design-based stream trackers, and tree-based complement checks.

### 2. Monotonic Boundary Traversal (The Converging Pointers)

* **The Core Mechanics:** Relies entirely on a pre-sorted sequence where directional movement has predictable, guaranteed mathematical outcomes.
* **Classic Patterns:** Two Sum II, container bounds, and boundary matching.

### 3. Dimensional Reduction (The Multi-Pointer Loop)

* **The Core Mechanics:** Fixes outer structural constraints to collapse higher-order complexity problems ($O(n^3)$) down into manageable two-pointer subsets ($O(n^2)$).
* **Classic Patterns:** 3Sum, 4Sum, and constrained multi-variable pairings.


====

### Pillar 1: Sliding Window (The Contiguous Range Specialist)

Sliding Window solves problems involving **contiguous subarrays or substrings** by maintaining a dynamic range of elements, eliminating the redundant re-scanning inherent in $O(n^2)$ brute-force solutions.

Interviewers frequently test the boundary between its two distinct sub-patterns:

---

### 1. Sub-categorizing Pillar 1: Fixed vs. Variable Sliding Windows

#### Fixed-Size Window ($K$-Length)

* **The Mechanics:** The window size is statically locked to a target length $K$ (e.g., *Maximum Average Subarray* or *Find All Anagrams in a String*).
* **Pointer Logic:** The pointer mechanics are straightforward because the `left` pointer mechanically mirrors the `right` pointer offset by $K$ (i.e., `left = right - K + 1`).

#### Variable-Size Window (Dynamic)

* **The Mechanics:** The window dynamically expands until a constraint breaks, then contracts until it heals (e.g., *Longest Substring Without Repeating Characters*).
* **Pointer Logic:** Driven by a `while` loop skeleton that forces the `left` pointer to catch up whenever a validity threshold or budget is breached.

---

### Core Execution Skeleton (Variable-Size Pattern)

```typescript
let left = 0;
for (let right = 0; right < arr.length; right++) {
    addIntoWindow(arr[right]); // Expand window
    
    while (isWindowInvalid()) { // Contract window when constraint breaks
        removeFromWindow(arr[left]);
        left++;
    }
    
    updateMetrics(); // Track max/min length or result
}

```

---

### The Three Sliding Window Variation Tiers

1. **Uniqueness (The Strict Gatekeeper):** Governed by binary validation. Uses a `Set` or index `Map` to track duplicates. Contraction triggers immediately upon touching a repeat (e.g., *LeetCode 3*).
2. **Threshold / Budget (The Budget Manager):** Governed by a numerical limit $K$ (e.g., at most $K$ distinct characters or $K$ replacements). Uses a frequency `Map` and contracts when `map.size > k` or `(length - maxFreq) > k` (e.g., *LeetCode 159 / 340 / 424*).
3. **Frequency Match (The Exact Counter):** Governed by structural parity. Uses dual frequency maps or arrays to match an exact target distribution across a fixed range (e.g., *LeetCode 567 / 438*).

---

### Complexity Profile

* **Time Complexity:** **$O(n)$** — Each element is visited at most twice (once by `right`, once by `left`).
* **Space Complexity:** **$O(k)$** or **$O(\Sigma)$** — Bounded by the unique elements or fixed alphabet size (e.g., 26 for lowercase English letters).