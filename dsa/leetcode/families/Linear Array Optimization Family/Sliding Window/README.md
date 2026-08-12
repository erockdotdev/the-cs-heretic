# Sliding Window Master Reference & Extension Guide

## Sliding Window Blueprint & LeetCode Companion Reference

This companion map links the core sliding window architectures directly to their primary LeetCode benchmarks.

---

### The Complete Problem & Variation Suite

| Category              | Constraint Type                | Core Mechanics                                                                    | Companion LeetCode Problems                                                          |
| --------------------- | ------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Base Problem**      | Uniqueness / Strict Validation | Track and purge exact duplicates.                                                 | • **LeetCode 3:** Longest Substring Without Repeating Characters                     |
| **Variation Group 1** | Threshold / Numerical Capacity | Budget-constrained expansion based on distinct items or replacement limits ($K$). | • **LeetCode 159 / 340:** Longest Substring with At Most $K$ Distinct Characters<br> |

<br>• **LeetCode 424:** Longest Repeating Character Replacement |
| **Variation Group 2** | Frequency / Structural Matching | Exact distribution matching across a fixed or sliding range. | • **LeetCode 567:** Permutation in String<br>

<br>• **LeetCode 438:** Find All Anagrams in a String |

---

### Master Execution Summary

1. **Identify the Constraint Core:** Determine whether the window requires strict uniqueness, operates under a numerical/replacement budget ($K$), or demands an exact frequency match.
2. **Select the Data Structure:** Choose between a boolean `Set`, an index-tracking `Map`, or dual frequency maps/arrays.
3. **Define the Contraction Trigger:** Set the precise condition that forces the `left` pointer to shrink or jump, ensuring linear $O(n)$ performance across all variations.

---

## Sliding Window Strategy Matrix: Uniqueness vs. Threshold vs. Frequency

This reference matrix categorizes sliding window problems based on their core constraint type, dictating the data structure, invariant check, and contraction trigger you should use in an interview.

### The Core Strategy Matrix

| Constraint Category                       | Core Objective                                                               | Ideal Data Structure                                                           | Contraction Trigger (When to shrink `left`)                                                    | Example Problems                                             |
| ----------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **1. Uniqueness**                         | Ensure zero duplicates exist inside the active window.                       | `Set<string>` or Index `Map<string, number>`                                   | When the incoming character is already present in the active window.                           | • *Longest Substring Without Repeating Characters*           |
| **2. Threshold** (At Most / At Least $K$) | Allow a limited number of violations, distinct items, or replacements ($K$). | Frequency `Map<string, number>` + tracking variable (`maxCount` or `map.size`) | When the threshold limit is breached (e.g., `map.size > k` or `window_length - maxCount > k`). | • *Longest Substring with At Most K Distinct Characters*<br> |

<br>• *Longest Repeating Character Replacement* |
| **3. Frequency / Exact Match** | Match an exact target distribution or character count (often fixed-size). | Two Frequency Maps or Arrays (Target vs. Current Window) | When window size exceeds target length, or when character counts mismatch outside valid bounds. | • *Permutation in String*<br>

<br>• *Find All Anagrams in a String*<br>

<br>• *Minimum Window Substring* |

---

### Key Architectural Takeaways

* **Uniqueness (The Strict Gatekeeper):** Uses a boolean or index lookup. The moment a duplicate is touched, the window breaks validity and must contract until the duplicate is purged.
* **Threshold (The Budget Manager):** Tracks a resource pool (like distinct characters or allowed character mutations). It permits expansion as long as a numerical metric remains $\le K$, contracting only when the budget runs out.
* **Frequency Match (The Exact Counter):** Compares two states (a target pattern vs. the active window). It relies heavily on matching frequency counts rather than just presence or absence.

---

## 9. Known Variations & Strategy Adaptations

Interviewers frequently use **Longest Substring Without Repeating Characters** as a baseline, then introduce a twist to test whether you truly understand sliding window mechanics or just memorized a static solution.

Here are the most common variations and how they alter your core strategy:

---

### Variation 1: Longest Substring with At Most $K$ Distinct Characters (e.g., LeetCode 159 / 340)

* **The Twist:** Instead of *all* characters being unique (at most 1 occurrence per char), the window is allowed to contain up to $K$ distinct characters (e.g., at most 2 distinct characters like `"eceba"` $\rightarrow$ `"ece"`).
* **Strategy & Data Structure Shift:**
* Replace the boolean `Set` with a **Frequency Map (`Map<string, number>`)** to track how many times each character appears in the current window.
* **Condition Shift:** Instead of shrinking when a character count $> 1$, you shrink the `left` pointer when `map.size > k`.
* **Time & Space Complexity:** Time remains **$O(n)$**, but space shifts to **$O(k)$** because your map size is capped by $K$ distinct characters.



---

### Variation 2: Longest Repeating Character Replacement (e.g., LeetCode 424)

* **The Twist:** You can replace any character in the string up to $K$ times to make all characters in the substring identical. Find the length of the longest such substring.
* **Strategy & Data Structure Shift:**
* Use a frequency map and track the **maximum frequency of a single character** (`maxCount`) seen so far in the window.
* **Condition Shift:** The window is valid as long as `(window_length - maxCount) <= k`. If total characters minus the most frequent character exceeds $K$, you have too many "foreign" characters, so you contract the `left` pointer.
* **Time & Space Complexity:** **$O(n)$** time and **$O(\min(n, \Sigma))$** space.



---

### Variation 3: Permutation in String / Find All Anagrams (e.g., LeetCode 567 / 438)

* **The Twist:** Instead of finding the longest substring, you must determine if a string contains a *permutation* (exact anagram) of a target string $p$ of a fixed length.
* **Strategy & Data Structure Shift:**
* This transitions from a **variable-size sliding window** to a **fixed-size sliding window** (where window size equals the length of string $p$).
* Maintain two frequency arrays or maps (one for target $p$, one for the current window). When the window size matches $p$.length and counts match, you have a valid match.
* **Time & Space Complexity:** **$O(n)$** time and **$O(\Sigma)$** space (where $\Sigma$ is bounded by the alphabet size, e.g., 26 lowercase English letters).



---

### How to Frame This to Your Interviewer

If an interviewer pivots to one of these variations, use this script fragment:

> *"That’s a natural evolution of the problem. Because we are shifting from a strict uniqueness constraint to a threshold or frequency constraint, we drop the simple `Set` and pivot to a **Frequency Map**, adjusting our window contraction trigger from 'duplicate detected' to 'limit exceeded'."*

---

## Core Taxonomy Summary

Every variable-size or fixed-size sliding window problem boils down to one of these three fundamental constraint types:

### 1. Uniqueness & Presence (Binary Validity)

* **The Core Mechanics:** The window's validity is governed by whether elements are unique or present. There is no numerical budget—an item either belongs or it doesn't.
* **Classic Patterns:** Checking for duplicates, tracking first/last occurrences, or finding longest valid ranges without repeats.

### 2. Threshold & Numerical Capacity (The Budget Manager)

* **The Core Mechanics:** The window operates under a numerical limit or budget ($K$). This includes:
* **Distinct Counts:** At most $K$ distinct characters (e.g., LeetCode 340).
* **Mutation Budgets:** At most $K$ character replacements (e.g., LeetCode 424).
* **Numerical Sums / Products:** Subarrays where the sum is $\ge$ target (e.g., *Minimum Size Subarray Sum*) or product is $<$ target (e.g., *Subarray Product Less Than K*).


* **The Pattern:** The window expands freely until the metric crosses the threshold limit, at which point the left pointer contracts until the budget is restored.

### 3. Frequency & Structural Matching (The Exact Counter)

* **The Core Mechanics:** The window must match an exact blueprint, distribution, or pattern. This often applies to fixed-size windows or exact substring searches.
* **Classic Patterns:** Anagram matching, character frequency parity, or covering all required characters from a target string while minimizing window size (e.g., *Minimum Window Substring*).


==
## Stage 1: The Threshold Variation (LeetCode 340 / 159)

### *Longest Substring with At Most $K$ Distinct Characters*

To transition from strict **Uniqueness** ($K = 1$ duplicate limit) to a **Threshold** budget ($K$ distinct characters), we swap our boolean `Set` for a **Frequency Map** and change our contraction condition from a duplicate check to a size limit breach (`map.size > k`).

### Enhanced TypeScript Implementation

```typescript
function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
    if (k === 0) return 0;
    
    // Frequency map to track character counts inside the active window
    const charCount = new Map<string, number>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // Expand window: add or increment current character frequency
        charCount.set(currentChar, (charCount.get(currentChar) || 0) + 1);

        // Threshold Breach: If distinct characters exceed k, contract from the left
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar)! - 1);
            
            // Clean up zero-count entries to keep map.size accurate
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

```

### Key Architectural Shifts

* **Data Structure:** `Set<string>` $\rightarrow$ `Map<string, number>` to track both presence and frequency.
* **Contraction Trigger:** `seen.has(currentChar)` $\rightarrow$ `charCount.size > k`.
* **Complexity:** Time remains **$O(n)$** because every character enters and leaves the window at most once. Space shifts to **$O(k)$** since the map size is strictly bound by the distinct character limit $K$.

Yes, exactly. That implementation is the exact code mapping for **Variation 1**.

Now, let's move to **Variation 2** using the same baseline code transformation approach.

---

## Stage 2: The Mutation Budget Variation (LeetCode 424)

### *Longest Repeating Character Replacement*

To transition from counting distinct characters to handling a **mutation budget** ($K$ character replacements), we keep the **Frequency Map** but shift our tracking logic. Instead of limiting unique items, our window remains valid as long as the total length minus the count of our most frequent character does not exceed $K$.

### Enhanced TypeScript Implementation

```typescript
function characterReplacement(s: string, k: number): number {
    const charCount = new Map<string, number>();
    let left = 0;
    let maxLength = 0;
    let maxFreq = 0; // Tracks the frequency of the single most common character in the current window

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // Expand window: update frequency and track highest single-character frequency
        const currentFreq = (charCount.get(currentChar) || 0) + 1;
        charCount.set(currentChar, currentFreq);
        maxFreq = Math.max(maxFreq, currentFreq);

        // Mutation Budget Breach: 
        // (window_length - maxFreq) gives the number of characters we need to replace.
        // If that exceeds k, our window is invalid; contract from the left.
        while ((right - left + 1) - maxFreq > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar)! - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

```

### Key Architectural Shifts

* **Data Structure:** Maintained the frequency `Map<string, number>` to track counts inside the active window.
* **Tracking Invariant Added:** Introduced `maxFreq` to cache the highest frequency of any single character without needing to scan the map on every iteration.
* **Contraction Trigger:** `charCount.size > k` $\rightarrow$ `(window_length - maxFreq) > k`.
* **Time & Space Complexity:** **$O(n)$** time because pointers only move forward, and **$O(\Sigma)$** space (bounded by alphabet size, e.g., 26 uppercase English letters).

## Stage 3: The Fixed-Size Frequency Matching Variation (LeetCode 567 / 438)

### *Permutation in String / Find All Anagrams*

To transition from a variable-size sliding window to a **fixed-size sliding window**, we change our mechanics completely. Instead of dynamically expanding and contracting based on a budget or threshold, our window size is strictly locked to the length of the target string ($p.length$). We maintain two frequency maps (or arrays) to check for exact distribution parity.

### Enhanced TypeScript Implementation

```typescript
function checkInclusion(p: string, s: string): boolean {
    if (s.length < p.length) return false;

    const targetCount = new Map<string, number>();
    const windowCount = new Map<string, number>();

    // 1. Build frequency map for our target string p
    for (const char of p) {
        targetCount.set(char, (targetCount.get(char) || 0) + 1);
    }

    let left = 0;
    const pLen = p.length;

    // 2. Slide a fixed-size window of length pLen across string s
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        windowCount.set(currentChar, (windowCount.get(currentChar) || 0) + 1);

        // If window size exceeds p.length, contract from the left to maintain fixed size
        if (right - left + 1 > pLen) {
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
            if (windowCount.get(leftChar) === 0) {
                windowCount.delete(leftChar);
            }
            left++;
        }

        // 3. Check for exact frequency match when window size equals p.length
        if (right - left + 1 === pLen) {
            if (mapsAreEqual(targetCount, windowCount)) {
                return true; // Found a valid permutation/anagram!
            }
        }
    }

    return false;
}

// Helper utility to compare map sizes and key-value entries in O(1) or O(Σ) time
function mapsAreEqual(map1: Map<string, number>, map2: Map<string, number>): boolean {
    if (map1.size !== map2.size) return false;
    for (const [key, val] of map1) {
        if (map2.get(key) !== val) return false;
    }
    return true;
}

```

### Key Architectural Shifts

* **Window Size:** Shifts from **variable-size** (expanding/contracting based on validity limits) to **fixed-size** (locked strictly to `p.length`).
* **State Comparison:** Instead of checking a single numerical threshold or duplicate presence, we compare two state dictionaries (`targetCount` vs. `windowCount`) for exact parity.
* **Time & Space Complexity:** **$O(n)$** time because each character is added and removed from the sliding window at most once, and **$O(\Sigma)$** space (bounded by the fixed alphabet size, e.g., 26 lowercase English letters).


## Sliding Window Implementation & Architecture Comparison Matrix

This reference matrix compares the base sliding window pattern against all three enhanced variations, breaking down their structural differences, state tracking, and contraction rules.

| Problem / Variation                                                     | Constraint Core    | Window Behavior | Data Structure | Contraction / Adjustment Trigger | Time & Space Complexity |
| ----------------------------------------------------------------------- | ------------------ | --------------- | -------------- | -------------------------------- | ----------------------- |
| **Base:** *Longest Substring Without Repeating Characters* (LeetCode 3) | **Uniqueness**<br> |

<br>(Strict validation) | **Variable**<br>

<br>(Expands until duplicate) | `Set<string>` | When incoming character is already in `seen`. | **Time:** $O(n)$<br>

<br>**Space:** $O(\min(n, \Sigma))$ |
| **Var 1:** *Longest Substring with At Most $K$ Distinct Characters* (LeetCode 159 / 340) | **Threshold**<br>

<br>(Distinct character limit) | **Variable**<br>

<br>(Expands until distinct count > $K$) | Frequency `Map<string, number>` | When `map.size > k`. | **Time:** $O(n)$<br>

<br>**Space:** $O(k)$ |
| **Var 2:** *Longest Repeating Character Replacement* (LeetCode 424) | **Mutation Budget**<br>

<br>(Replacement limit $K$) | **Variable**<br>

<br>(Expands based on substitution math) | Frequency `Map` + `maxFreq` tracking variable | When `(window_length - maxFreq) > k`. | **Time:** $O(n)$<br>

<br>**Space:** $O(\Sigma)$ |
| **Var 3:** *Permutation in String / Find All Anagrams* (LeetCode 567 / 438) | **Frequency Match**<br>

<br>(Exact distribution parity) | **Fixed-Size**<br>

<br>(Strictly locked to target length $P$) | Dual Frequency Maps (`targetCount` vs `windowCount`) | When `right - left + 1 > pLen` (shrink to maintain fixed size). | **Time:** $O(n)$<br>

<br>**Space:** $O(\Sigma)$ |


Visualizing sliding window variations comes down to tracking two core components: **Window Shape/Movement** (Variable vs. Fixed) and **The Contraction Trigger** (What forces the `left` pointer to move).

---

### 1. Structural Blueprint: The 4 Window Dynamics

```text
STRING:  [ a  b  c  a  b  c  b  b ]
          ^              ^
          |              |
        LEFT           RIGHT

```

* **Base Problem (Uniqueness):**
* *Behavior:* Expand `right` infinitely. The moment a duplicate enters, contract `left` step-by-step until the duplicate is purged.
* *Visual Trigger:* `[a b c]` $\rightarrow$ incoming `'a'` breaks it $\rightarrow$ contract `left` past first `'a'`.


* **Variation 1 (Threshold / Distinct Count - $K$):**
* *Behavior:* Expand `right` while counting unique keys. Contract `left` only when the map's distinct key count crosses the limit ($K$).
* *Visual Trigger:* `[e c e b]` ($K=2$) $\rightarrow$ incoming `'a'` makes distinct count = 3 $\rightarrow$ contract `left` until distinct count $\le 2$.


* **Variation 2 (Mutation Budget - $K$ Replacements):**
* *Behavior:* Expand `right`, tracking the dominant character (`maxFreq`). Contract `left` when the "foreign" characters (Window Length minus `maxFreq`) exceed your budget $K$.
* *Visual Trigger:* `[A A B A]` ($K=1$) $\rightarrow$ length is 4, `maxFreq` is 3 ('A'). Foreign count = $4 - 3 = 1$ ($\le 1$, valid). Incoming `'C'` makes foreign count 2 ($> 1$, invalid) $\rightarrow$ contract `left`.


* **Variation 3 (Fixed-Size Frequency Match):**
* *Behavior:* Lock the window to an exact length ($P$.length). As `right` moves forward, `left` moves forward in lockstep, maintaining a rigid box size while comparing frequency maps.
* *Visual Trigger:* `[b a] b` ($P$ length = 2) $\rightarrow$ incoming character expands right, but immediately forces `left` to drop the tail end to keep length locked at 2.



---

### 2. The Architectural Decision Tree (Mental Model)

When facing an unknown substring/subarray problem, visualize this decision tree to instantly pick your data structure and trigger:

```text
Is the window size FIXED to a target length (e.g., Anagrams)?
 ├── YES ──> Fixed Sliding Window (Dual Frequency Maps / Arrays)
 └── NO (Variable Size)
      │
      ├── Is the goal to find duplicates / unique elements?
      │    └── YES ──> Gatekeeper Pattern (`Set` or Index `Map`)
      │               Trigger: Duplicate detected.
      │
      ├── Is the limit based on distinct items or numerical sums/budgets ($K$)?
      │    └── YES ──> Budget Manager Pattern (Frequency `Map` + `.size`)
      │               Trigger: `map.size > k` or `sum >= target`.
      │
      └── Is the limit based on internal mutations/replacements ($K$)?
           └── YES ──> Dominance Pattern (Frequency `Map` + `maxFreq`)
                       Trigger: `(window_length - maxFreq) > k`.

```

---

### 3. Data Structure Evolution Visualized

```text
[1. Boolean Set]  ──> Tracks Presence Only (Binary: In/Out)
       │
       ▼
[2. Frequency Map] ──> Tracks Quantities & Unique Variety (Key-Value Counts + .size)
       │
       ▼
[3. Map + Metrics] ──> Tracks State Parity (Adding cached variables like maxFreq)
       │
       ▼
[4. Dual Maps]    ──> Tracks Exact Structural Distribution (Target State vs. Current Window State)

```


## Sorted vs. Unsorted: The Sliding Window Distinction

The short answer is **no, sliding window problems do not require the underlying array or string to be globally sorted.**

In fact, sorting a string or array for a sliding window problem would completely break the solution. Here is how sorted versus unsorted data changes your approach in an interview:

---

### Why Sliding Window Relies on Contiguity, Not Sorting

Sliding window algorithms operate on **contiguous subarrays or substrings**.

* **Preserving Order:** The relative order of elements is sacred. For example, in *Longest Substring Without Repeating Characters* (`"pwwkew"`), sorting the string alphabetically destroys the adjacent character relationships needed to find valid substrings.
* **Pointers Move Concurrently:** Both `left` and `right` pointers move in the same direction (left-to-right). The invariant is maintained by tracking what enters and leaves the window dynamically, independent of how large or small the values are globally.

---

### The Structural Split: Sliding Window vs. Converging Pointers

When interviewers talk about "two pointers," they usually mean one of two entirely different patterns. Understanding the difference prevents confusion:

| Pointer Pattern    | Direction                                           | Requires Sorted Data?                     | Core Use Case                                                 | Example Problems                          |
| ------------------ | --------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| **Sliding Window** | Same direction (`left` and `right` both move right) | **No** (Works on raw, unsorted sequences) | Finding contiguous subarrays/substrings matching a condition. | • *Longest Substring Without Repeats*<br> |

<br>• *Minimum Window Substring* |
| **Converging Pointers** | Opposite directions (`left` starts at 0, `right` starts at $N-1$) | **Yes** (Almost always requires sorting or monotonicity) | Searching pairs, triplets, or boundaries in a dataset. | • *Two Sum II (Sorted Array)*<br>

<br>• *3Sum*<br>

<br>• *Container With Most Water* |

---

### The Real Trap: Monotonicity vs. Sorting

While global *sorting* isn't required for sliding windows, **monotonicity** is.

For sliding window algorithms to work efficiently (where pointers only move forward and never reset), the window's state must change predictably as it expands or contracts:

* **Positive Numbers / Valid Sums:** In subarray sum problems (e.g., *Minimum Size Subarray Sum*), elements must be non-negative. Adding an element *always* increases the sum, and removing it *always* decreases it. This monotonic behavior allows the `left` pointer to safely catch up.
* **The Negative Number Break:** If negative numbers are introduced into a numeric sliding window problem, the window sum can randomly increase or decrease when expanding, destroying the monotonic invariant. In that scenario, sliding window fails, and you must switch to a **Prefix Sum + Hash Map** approach instead.