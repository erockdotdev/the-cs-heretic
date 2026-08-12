**Act 1 Player Loop**  
*(Complete operating system for the coding round meta-game)*

This is the full loop for treating Act 1 as the performance filter it actually is.

---

### 1. Learn the current templates
Master the 18 core patterns and their trigger phrases.  
Focus on recognition speed, not solving every LeetCode problem.  
Priority order: the patterns that appear most often in mid-level and senior loops at your target companies.

Deliverable: You can hear a problem and name the pattern within 60–90 seconds.

---

### 2. Internalize the exact performance scripts and timing
Memorize and rehearse both versions:

- Classic no-AI script (0–5 clarification → 5–12 pattern + approach → 12–35 narrated coding → 35–45 verification)
- AI-assisted script (decompose → narrow iterative prompting → loud verification → explain every line)

Also lock in the recovery scripts (no pattern visible, stuck while coding, hint received, constraint changed, finished early).

Deliverable: You can run the full 45-minute sequence from memory without looking anything up.

---

### 3. Build a small bank of pattern triggers and adaptation moves
For each of the 18 patterns, maintain:
- 1–2 clear trigger sentences
- The standard template
- 1–2 common follow-up twists and how the solution changes

Keep this bank tiny and sharp. The goal is instant retrieval under pressure, not encyclopedic knowledge.

Deliverable: A personal one-page trigger sheet you can review in 10 minutes before an interview.

---

### 4. Practice under realistic conditions
Do not just solve problems silently.

Required practice modes:
- Full 45-minute timed runs while narrating out loud
- Mocks with a human who changes constraints mid-problem
- Sessions where you deliberately get stuck and practice recovery scripts
- AI-assisted format practice if your target companies use it
- Recording yourself and watching for silences, weak pattern naming, or poor edge-case coverage

Deliverable: You have done enough realistic reps that the script feels automatic.

---

### 5. Calibrate delivery
Focus on the signals interviewers actually score:

- Continuous narration (no long silences)
- Early and explicit pattern naming
- Collaborative tone (treat the interviewer as a partner)
- Clean acknowledgment of hints
- Calm adaptation when constraints change
- Confident but not arrogant presence

Remove: apologizing excessively, thinking silently, defending too hard, or rushing.

Deliverable: Your delivery consistently looks composed and structured even when the problem is imperfectly solved.

---

### 6. Adjust for level and company dialect
Use the variance matrix:

- Mid-level + large company → full classic pattern script, high weight on clean mediums
- Senior+ → expect more probing and constraint changes; pure algorithm weight is lower
- AI-assisted companies (especially Meta) → shift practice toward decomposition + verification
- Companies that have moved away from pure LeetCode → de-emphasize grinding the 18 patterns

Deliverable: Your preparation emphasis matches the actual loop you are walking into.

---

### 7. Execute the performance in the loop
During the real interview:
- Run the appropriate script
- Treat every silence, hint, and constraint change as part of the performance
- Prioritize staying inside the structure over finding a clever solution
- Use leftover time for trade-offs or adaptation rather than sitting quietly

Deliverable: You complete the round having hit the major scoring checkpoints (pattern named, narrated throughout, edges discussed, adapted when poked).

---

### 8. Treat the outcome as a measure of meta-fluency
A pass means you performed the current script well enough under that interviewer’s calibration.  
A fail means the performance did not clear their bar on that day.

Neither result is a clean measure of your ability as an engineer.  
It is feedback on your current fluency with this particular filter.

Use the data to adjust the loop (more mocks on weak patterns, tighter narration, better recovery, etc.) and run it again.

---

This is the complete closed loop for Act 1. Run it deliberately and the coding round becomes a rehearsable performance instead of a mysterious evaluation of talent.


Here is the fully armored version. I kept your original structure and voice, and integrated the remaining high-value process nuances directly into the document.

---

```markdown
The industry’s **"Act 1: Coding Round"** checklist centers on a predictable set of core problem-solving patterns. Every major technical interview loop draws from roughly 15–18 foundational algorithmic blueprints, popularized by curated sheets like the **Blind 75** and **NeetCode 150**.

Instead of trying to memorize 2,000+ distinct LeetCode problems, candidates who pass this theatrical gatekeeper memorize the specific code templates and trigger keywords for these high-frequency categories:

## The "Act 1" Master Checklist

```text
                      18 CORE CODING PATTERNS
┌──────────────────────────────────────────────────────────────────┐
│  ARRAY / STRING TRAVERSAL                                         │
│  1. Two Pointers                 2. Sliding Window               │
│  3. Fast & Slow Pointers         4. Prefix Sum                   │
├──────────────────────────────────────────────────────────────────┤
│  SEARCH & SORT                                                   │
│  5. Binary Search (Variants)     6. Top K / Priority Queue       │
│  7. Intervals Merge / Insertion  8. Monotonic Stack              │
├──────────────────────────────────────────────────────────────────┤
│  TREE & GRAPH TRAVERSAL                                          │
│  9. BFS / Level-Order           10. DFS / Backtracking           │
│ 11. Topological Sort            12. Union-Find (Disjoint Set)    │
│ 13. Trie (Prefix Tree)                                           │
├──────────────────────────────────────────────────────────────────┤
│  DYNAMIC PROGRAMMING & MEMOIZATION                               │
│ 14. 1D Dynamic Programming      15. 2D / Knapsack DP             │
├──────────────────────────────────────────────────────────────────┤
│  SYSTEM SIMULATION & BIT MANIPULATION                            │
│ 16. In-Place Matrix Operations  17. Bitwise Tricks               │
│ 18. Design / Custom Data Structures                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## The Performance Script (The Part Most Experienced Candidates Miss)

Recognizing the pattern is necessary but not sufficient. Interviewers score the *process* as heavily as the final code. The expected 45–60 minute performance follows a rigid sequence:

**Minute 0–5: Clarification & Framing**
- Restate the problem in your own words.
- Ask about constraints (input size, sorted?, negatives?, duplicates?, etc.).
- Request or invent 1–2 concrete examples.
- Explicitly say you will start with brute force and then optimize.

**Minute 5–12: Brute → Pattern → Optimal**
- State the brute-force approach and its complexity.
- Name the pattern out loud: “This is a classic [Pattern] problem because [trigger].”
- Walk through the optimized approach on the example before writing any code.
- State time and space complexity of the intended solution.

**Minute 12–35: Coding**
- Narrate while typing (“I’m initializing the left and right pointers…”, “This map will store the running sum…”).
- Use clear variable names.
- Prefer readable code over clever density.

**Minute 35–45: Verification**
- Trace the example through your code.
- Call out edge cases (empty, single element, all identical, overflow, etc.).
- Re-state final complexity.
- If time remains, mention possible follow-ups.

**Recovery moves if stuck**
- If no pattern by minute 8–10, say “I’ll implement the brute force first and look for optimization.”
- Never stay silent longer than 20–30 seconds.
- If coding stalls for >3 minutes, step back and re-explain the approach on the example.

**Handling interviewer hints**
- Acknowledge the hint immediately and out loud: “That’s a good point — if I incorporate that…”
- Incorporate it cleanly rather than pretending you already had the idea.
- Do not reject or argue with a hint unless it is factually wrong; the interviewer is usually steering you toward the expected path.
- After using the hint, briefly restate the updated approach so the signal is clear.

**If you finish with 10+ minutes left**
- Offer one or two optimizations or alternative approaches (“We could reduce the space to O(1) by…”)
- Discuss trade-offs (time vs space, readability vs micro-optimization, worst-case vs average-case).
- Ask whether the interviewer would like you to implement a follow-up or handle additional constraints.
- Do not sit in silence or start making unrelated small talk. Use the time to demonstrate depth.

**Discussing trade-offs inside a coding round**
Even though this is not system design, strong candidates proactively mention trade-offs when relevant:
- “This hash map approach is O(N) time and O(N) space. We could do it in O(1) space with two pointers since the array is sorted, at the cost of needing the sort first.”
- “The DP solution is cleaner to implement, but the greedy version would be faster if the constraints allowed it.”
Interviewers listen for this signal of engineering judgment.

**Language-specific expectations**
- **Python**: Clean and idiomatic is rewarded. Use built-ins (enumerate, zip, collections.defaultdict, heapq) when they improve clarity. Avoid overly clever one-liners that hurt readability.
- **Java / C++**: Precision and explicitness are valued. Show proper use of data structures (PriorityQueue, HashMap, Deque, etc.) and be careful with types and edge behavior. Verbose but correct code is preferred over dense code.
- In all languages: meaningful variable names, consistent style, and no obvious syntax errors. Interviewers notice sloppy code even when the algorithm is right.

**What “Strong Hire” actually looks like**
- Pattern named early.
- Clean brute → optimal progression.
- Readable, mostly-correct code on the first pass.
- Complexity stated accurately.
- Edge cases discussed without prompting.
- Calm, collaborative tone (interviewer is treated as a partner).
- Handles hints gracefully and uses leftover time productively.

A correct solution delivered in silence or with poor process is frequently scored lower than a slightly imperfect solution that followed the script.

---

## 1. Array & String Traversal Patterns

### Pattern 1: Two Pointers

* **The Script Trigger:** *"Find two elements in a sorted array that sum to X"*, *"Palindromes"*, *"Container with most water"*.
* **Key Concept:** Convergence from opposite ends (`left = 0`, `right = n - 1`) or parallel iteration.
* **Canonical Benchmark Problems:**
  * Two Sum II - Input Array Is Sorted
  * 3Sum
  * Container With Most Water
  * Trapping Rain Water
* **Process Note:** Always clarify whether the array is sorted and whether indices or values are required. State the O(N) time / O(1) space claim before coding.

### Pattern 2: Sliding Window

* **The Script Trigger:** *"Find contiguous subarray / substring of length K meeting condition X"*.
* **Key Concept:** Expand right boundary (`right++`) to satisfy condition; shrink left boundary (`left++`) when condition breaks.
* **Canonical Benchmark Problems:**
  * Best Time to Buy and Sell Stock
  * Longest Substring Without Repeating Characters
  * Minimum Window Substring
  * Sliding Window Maximum
* **Process Note:** Distinguish fixed-size vs variable-size windows out loud. The “shrink when invalid” sentence is the key signal interviewers listen for.

### Pattern 3: Fast & Slow Pointers (Tortoise & Hare)

* **The Script Trigger:** Linked List cycle detection, middle node determination, circular arrays.
* **Key Concept:** Moving one pointer 1 step and another 2 steps simultaneously.
* **Canonical Benchmark Problems:**
  * Linked List Cycle
  * Find the Duplicate Number
  * Middle of the Linked List
* **Process Note:** Mention why this is O(1) space compared with a HashSet solution. Interviewers often ask for the alternative.

### Pattern 4: Prefix Sum / Hash Map Lookup

* **The Script Trigger:** *"Find total number of continuous subarrays that sum to K"*.
* **Key Concept:** Precompute cumulative sums so $\text{Sum}(i, j) = \text{Prefix}[j] - \text{Prefix}[i-1]$. Pair with a Hash Map.
* **Canonical Benchmark Problems:**
  * Two Sum
  * Subarray Sum Equals K
  * Product of Array Except Self
* **Process Note:** Explicitly say “I’ll use a map from prefix sum to index/count.” This is one of the highest-frequency patterns; hesitation here is costly.

---

## 2. Search & Stack Patterns

### Pattern 5: Binary Search Variants

* **The Script Trigger:** Sorted arrays, rotated arrays, or finding a threshold boundary ($O(\log N)$ requirement).
* **Key Concept:** Shrinking search space by half (`mid = left + (right - left) / 2`).
* **Canonical Benchmark Problems:**
  * Search in Rotated Sorted Array
  * Find Minimum in Rotated Sorted Array
  * Koko Eating Bananas
* **Process Note:** Always state the search space and the condition that decides which half to keep. “Binary search on the answer” problems (Koko, shipping capacity) are common variants—name them as such.

### Pattern 6: Top K Elements / Heaps

* **The Script Trigger:** *"Find the top K largest / smallest / most frequent items"*.
* **Key Concept:** Using a Min-Heap (size K) or Max-Heap to track boundaries dynamically ($O(N \log K)$).
* **Canonical Benchmark Problems:**
  * Top K Frequent Elements
  * Kth Largest Element in an Array
  * Find Median from Data Stream
* **Process Note:** Say why you chose min-heap vs max-heap. For “median of stream” mention the two-heap pattern immediately.

### Pattern 7: Monotonic Stack

* **The Script Trigger:** *"Next greater element"*, *"Daily temperatures"*, *"Histogram rectangular areas"*.
* **Key Concept:** Maintaining a stack where elements are strictly increasing or decreasing to resolve relative positions in $O(N)$.
* **Canonical Benchmark Problems:**
  * Daily Temperatures
  * Next Greater Element I
  * Largest Rectangle in Histogram
* **Process Note:** State “I’ll keep a monotonically decreasing stack of indices.” This pattern is frequently missed by candidates who only practiced arrays and trees.

### Pattern 8: Interval Merging

* **The Script Trigger:** Time slots, overlapping meetings, scheduling conflicts.
* **Key Concept:** Sort intervals by `start_time` first, then iterate and compare `current.start <= previous.end`.
* **Canonical Benchmark Problems:**
  * Merge Intervals
  * Insert Interval
  * Meeting Rooms II
* **Process Note:** Always announce the sort step and its O(N log N) cost. Meeting Rooms II is the classic heap + interval combination—flag it as such.

---

## 3. Graph & Tree Traversal Patterns

### Pattern 9: Breadth-First Search (BFS) / Level-Order

* **The Script Trigger:** *"Shortest path in unweighted graph"*, *"Tree level-by-level processing"*.
* **Key Concept:** Using a Queue (FIFO) to process nodes layer by layer.
* **Canonical Benchmark Problems:**
  * Binary Tree Level Order Traversal
  * Rotting Oranges
  * Word Ladder
* **Process Note:** Explicitly say “BFS gives shortest path in unweighted graphs.” Mention the visited set early to avoid cycles.

### Pattern 10: Depth-First Search (DFS) & Backtracking

* **The Script Trigger:** *"Find all subsets/permutations"*, *"Grid island counting"*, *"Tree paths"*.
* **Key Concept:** Recursive call stack + explicit state reset (backtracking).
* **Canonical Benchmark Problems:**
  * Number of Islands
  * Subsets / Permutations
  * Word Search
* **Process Note:** Narrate the “choose → explore → un-choose” steps. Interviewers listen for the backtracking reset; forgetting it is a common failure mode.

### Pattern 11: Topological Sort (Kahn’s Algorithm)

* **The Script Trigger:** Directed Acyclic Graphs (DAG), course prerequisites, task scheduling dependencies.
* **Key Concept:** Calculating `in-degree` for nodes and queueing nodes with `in-degree == 0`.
* **Canonical Benchmark Problems:**
  * Course Schedule I & II
  * Alien Dictionary
* **Process Note:** State that you are detecting cycles via the count of processed nodes. Both Kahn’s and DFS-based topo sort are acceptable; pick one and commit.

### Pattern 12: Union-Find (Disjoint Set)

* **The Script Trigger:** Dynamic connectivity, network components, redundant edges.
* **Key Concept:** `find()` with path compression + `union()` by rank to connect nodes.
* **Canonical Benchmark Problems:**
  * Number of Connected Components in an Undirected Graph
  * Redundant Connection
* **Process Note:** Mention path compression and union-by-rank even if you don’t implement the most optimized version. It signals you know the real structure.

### Pattern 13: Trie (Prefix Tree)

* **The Script Trigger:** Autocomplete systems, prefix matching, dictionary lookups.
* **Key Concept:** Tree where nodes contain a character map (`children = {}`) and boolean `isWord`.
* **Canonical Benchmark Problems:**
  * Implement Trie (Prefix Tree)
  * Design Add and Search Words Data Structure
* **Process Note:** These are often framed as “design” problems. Clarify the required operations and their target complexities before coding.

---

## 4. Dynamic Programming (DP) & Optimization

### Pattern 14: 1D Dynamic Programming

* **The Script Trigger:** *"Count ways to reach destination"*, *"Min/Max cost to make change"*.
* **Key Concept:** Storing intermediate results in array `dp[i]` where state depends on `dp[i-1]`, `dp[i-2]`.
* **Canonical Benchmark Problems:**
  * Climbing Stairs
  * House Robber
  * Coin Change
  * Longest Increasing Subsequence
* **Process Note:** Always define the state in words first (“dp[i] means the maximum amount we can rob up to house i”). Then write the recurrence. Then decide bottom-up vs top-down.

### Pattern 15: 2D / Grid Dynamic Programming

* **The Script Trigger:** Grid traversal paths, string matching / edit distance, 0/1 Knapsack variants.
* **Key Concept:** `dp[i][j]` grid storing subproblem results from state `dp[i-1][j]` and `dp[i][j-1]`.
* **Canonical Benchmark Problems:**
  * Unique Paths
  * Longest Common Subsequence
  * Edit Distance
* **Process Note:** Draw the table or at least describe the dimensions and base cases out loud. Interviewers care more about the state definition than the final numbers.

---

## 5. System Simulation & Custom Structures

### Pattern 16: In-Place Matrix Operations
* Common triggers: rotate image, set matrix zeroes, spiral order.
* Key signal: “Do it in-place” or O(1) extra space constraint.

### Pattern 17: Bitwise Tricks
* Lower frequency but still appears (single number, counting bits, power of two, etc.).
* Mention the bit operation by name when you use it.

### Pattern 18: Custom Data Structure Design

* **The Script Trigger:** *"Design a system that performs Insert, Delete, and Get in $O(1)$"*.
* **Key Concept:** Combining two data structures (e.g., Doubly Linked List + Hash Map) to get speed properties of both.
* **Canonical Benchmark Problems:**
  * LRU Cache
  * Insert Delete GetRandom O(1)
* **Process Note:** These are scored more like mini system-design problems. Start by listing the required operations and target complexities, then choose the data structures that satisfy them.

---

## The Reality of "Act 1"

Candidates who score "Strong Hire" don't see a brand new question during an interview and invent a brand new algorithm from scratch. They recognize the pattern category in the first 60 seconds, select the corresponding code template, and perform the "Aha!" realization on schedule — while narrating the expected script the entire time.

The difference between a competent engineer and a candidate who clears the gate is rarely raw problem-solving ability. It is fluency with the 18 patterns **plus** disciplined execution of the performance sequence above (including graceful handling of hints, productive use of leftover time, and light trade-off discussion).

* **Reference Resource:** *Blind 75 — The Complete 9-Pattern Breakdown* (breaks down the core patterns behind the most famous coding interview problem list, directly mapping to this "Act 1" coding checklist structure).
````

---

This is now maximally armored for Act 1. Every major expectation and process nuance that interviewers actually score is present.


---


Here is the updated Act 1 document that accounts for everything identified. I kept your structure and voice, then expanded it to cover AI-assisted variants, live probing, level/company variance, sharper scoring reality, and the external framing.

---

```markdown
The industry’s **"Act 1: Coding Round"** is a theatrical filter.  
It does not primarily measure real problem-solving ability. It measures how quickly and cleanly a candidate can detect one of a small set of approved patterns and perform the expected script while narrating.

Every major technical interview loop still draws heavily from roughly 15–18 foundational algorithmic blueprints (Blind 75 / NeetCode 150 style). Candidates who clear the round are usually not inventing solutions; they are executing pre-loaded templates with the correct performance.

This document maps the actual selection mechanism, including the classic format, the newer AI-assisted variant, level and company differences, and how scoring really works.

## The "Act 1" Master Checklist (Core Patterns)

```text
                      18 CORE CODING PATTERNS
┌──────────────────────────────────────────────────────────────────┐
│  ARRAY / STRING TRAVERSAL                                         │
│  1. Two Pointers                 2. Sliding Window               │
│  3. Fast & Slow Pointers         4. Prefix Sum                   │
├──────────────────────────────────────────────────────────────────┤
│  SEARCH & SORT                                                   │
│  5. Binary Search (Variants)     6. Top K / Priority Queue       │
│  7. Intervals Merge / Insertion  8. Monotonic Stack              │
├──────────────────────────────────────────────────────────────────┤
│  TREE & GRAPH TRAVERSAL                                          │
│  9. BFS / Level-Order           10. DFS / Backtracking           │
│ 11. Topological Sort            12. Union-Find (Disjoint Set)    │
│ 13. Trie (Prefix Tree)                                           │
├──────────────────────────────────────────────────────────────────┤
│  DYNAMIC PROGRAMMING & MEMOIZATION                               │
│ 14. 1D Dynamic Programming      15. 2D / Knapsack DP             │
├──────────────────────────────────────────────────────────────────┤
│  SYSTEM SIMULATION & BIT MANIPULATION                            │
│ 16. In-Place Matrix Operations  17. Bitwise Tricks               │
│ 18. Design / Custom Data Structures                              │
└──────────────────────────────────────────────────────────────────┘
```

These patterns remain the dominant content layer at most companies that still run classic coding rounds.

---

## Variance Matrix: Level × Company Scale

The weight and style of Act 1 change significantly by level and company type. Treat the classic 18-pattern script as the default, then adjust using this matrix.

| Level         | Large FAANG-style                                                                                       | Mid-size / Scale-up                         | Startup / Non-traditional                      |
| ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| **Mid-level** | Classic LeetCode patterns dominant. High weight on clean mediums + narration.                           | Mix of classic patterns + practical coding. | Often lighter or replaced by take-home / pair. |
| **Senior**    | Coding weight drops. Still tested, but system design + behavioral rise. Expect follow-up probing.       | More practical / multi-file or debugging.   | Frequently de-emphasized or removed.           |
| **Staff+**    | Pure algorithm rounds less common. More code comprehension, architecture-tinged coding, or AI-assisted. | Rarely pure LeetCode.                       | Usually absent.                                |

**Practical implication:**  
If you are mid-level targeting large companies, master the full 18-pattern performance script.  
If you are senior+, keep the patterns sharp but invest relatively more in adaptation, trade-off talk, and the other acts.

---

## The Two Main Formats in 2026

### Format A: Classic (No-AI) Coding Round
Still the majority of rounds at large companies.

**Performance Script (45–60 min)**

**Minute 0–5: Clarification & Framing**
- Restate the problem.
- Ask about constraints (size, sorted?, negatives?, duplicates?, etc.).
- Request or invent 1–2 examples.
- Explicitly say you will start with brute force then optimize.

**Minute 5–12: Brute → Pattern → Optimal**
- State brute force + complexity.
- Name the pattern out loud: “This is a classic [Pattern] because [trigger].”
- Walk through the optimized approach on the example.
- State target time and space complexity.

**Minute 12–35: Coding**
- Narrate while typing.
- Clear variable names.
- Readable over clever.

**Minute 35–45: Verification**
- Trace the example.
- Call out edge cases.
- Re-state complexity.
- Use leftover time for trade-offs or follow-ups.

**Recovery moves**
- No pattern by minute 8–10 → implement brute force and look for optimization.
- Never silent > 20–30 seconds.
- Stuck coding > 3 minutes → step back and re-explain on the example.

### Format B: AI-Assisted Coding Round (Growing, especially Meta)
Candidate is given access to approved models.

**What is actually scored (shifts heavily):**
- Problem decomposition and planning before prompting
- Quality and specificity of prompts
- Ability to verify, debug, and correct model output
- Judgment about when to accept vs reject AI suggestions
- Final code quality and edge-case handling

**Performance posture that works:**
- Do not treat the model as a magic solver.
- Break the problem into clear sub-tasks.
- Prompt narrowly and iteratively.
- Read and test everything the model produces.
- Narrate your verification process out loud.
- Be ready to explain any line the model wrote as if you wrote it.

In this format, pure pattern memorization is less decisive than structured collaboration with the tool + verification rigor.

---

## Live Probing and Constraint Changes (Increasingly Common)

Because of grinding and AI, interviewers more often change constraints mid-problem or ask adaptive follow-ups:
- “What if the array is not sorted?”
- “What if N is 10x larger?”
- “What if we need to support streaming input?”
- “Can you do it with less space?”
- “What breaks in your solution under X condition?”

**How to handle it:**
- Treat the change as a new signal, not an attack.
- Explicitly restate the new constraint.
- Say whether the current approach still works or which pattern/component needs to change.
- If the optimal pattern switches, name the new pattern and why.
- This is one of the cleaner ways interviewers separate template reciters from people who understand the underlying ideas.

---

## Scoring Reality (Sharper Version)

Process and communication are not “also important.” In many loops they are the majority of the score.

Observed pattern across companies:
- A clean medium with excellent narration, early pattern naming, solid edge cases, and calm collaboration frequently scores higher than a harder problem solved with weak communication or long silences.
- “Strong Hire” is usually earned by flawless execution of the ritual more than by algorithmic heroics.
- Silent correctness is often scored lower than slightly imperfect code delivered with strong process.

**What Strong Hire looks like in practice**
- Pattern named early and correctly.
- Clean brute → optimal progression.
- Readable code, mostly correct on first pass.
- Complexity stated accurately.
- Edge cases discussed without prompting.
- Handles hints and constraint changes gracefully.
- Uses leftover time productively.
- Collaborative tone.

---

## Language-Specific Expectations
- **Python**: Idiomatic use of built-ins is rewarded. Clarity > cleverness.
- **Java / C++**: Explicitness and correct use of standard libraries matter. Verbose but precise is preferred over dense.
- All languages: meaningful names, consistent style, no obvious syntax errors.

---

## Pattern Details (Unchanged Core + Process Notes)

### 1. Array & String Traversal Patterns

**Pattern 1: Two Pointers**  
Trigger: sorted array pair sum, palindromes, container with most water.  
Key: opposite ends or same-direction pointers.  
Canonical: Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water.  
Process: Clarify sorted + what to return. State O(N)/O(1) before coding.

**Pattern 2: Sliding Window**  
Trigger: contiguous subarray/substring meeting a condition.  
Key: expand right, shrink left when invalid.  
Canonical: Longest Substring Without Repeating Characters, Minimum Window Substring, Sliding Window Maximum.  
Process: Explicitly distinguish fixed vs variable window.

**Pattern 3: Fast & Slow Pointers**  
Trigger: cycle detection, middle of list, duplicates in constrained arrays.  
Key: 1-step and 2-step pointers.  
Canonical: Linked List Cycle, Find the Duplicate Number, Middle of the Linked List.  
Process: Contrast with HashSet solution on space.

**Pattern 4: Prefix Sum + Hash Map**  
Trigger: subarray sum equals K, cumulative conditions.  
Key: running sum + map.  
Canonical: Subarray Sum Equals K, Product of Array Except Self.  
Process: Name the map purpose out loud.

### 2. Search & Stack Patterns

**Pattern 5: Binary Search Variants**  
Trigger: sorted/rotated, search on answer, threshold.  
Key: shrink search space, careful mid calculation.  
Canonical: Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Koko Eating Bananas.  
Process: State search space and decision condition clearly. Name “binary search on answer” when applicable.

**Pattern 6: Top K / Heaps**  
Trigger: Kth largest/smallest, top K frequent, running median.  
Key: min-heap of size K or two-heap pattern.  
Canonical: Top K Frequent Elements, Kth Largest Element, Find Median from Data Stream.  
Process: Justify min vs max heap choice.

**Pattern 7: Monotonic Stack**  
Trigger: next greater/smaller, histogram, daily temperatures.  
Key: maintain increasing or decreasing stack of indices.  
Canonical: Daily Temperatures, Next Greater Element, Largest Rectangle in Histogram.  
Process: State the monotonic property out loud.

**Pattern 8: Interval Merging**  
Trigger: overlapping intervals, meeting rooms, scheduling.  
Key: sort by start, linear sweep.  
Canonical: Merge Intervals, Insert Interval, Meeting Rooms II.  
Process: Announce the sort and its cost. Flag heap usage when relevant.

### 3. Graph & Tree Traversal Patterns

**Pattern 9: BFS**  
Trigger: shortest path unweighted, level-order.  
Key: queue + visited.  
Canonical: Binary Tree Level Order, Rotting Oranges, Word Ladder.  
Process: Explicitly say why BFS gives shortest path.

**Pattern 10: DFS & Backtracking**  
Trigger: subsets, permutations, path existence, islands.  
Key: choose → explore → un-choose.  
Canonical: Number of Islands, Subsets, Permutations, Word Search.  
Process: Narrate the reset step.

**Pattern 11: Topological Sort**  
Trigger: task ordering, course schedule, alien dictionary.  
Key: in-degree + queue (Kahn) or DFS + cycle detection.  
Canonical: Course Schedule I & II, Alien Dictionary.  
Process: State how cycles are detected.

**Pattern 12: Union-Find**  
Trigger: connectivity, components, redundant edges.  
Key: find with path compression + union by rank.  
Canonical: Number of Connected Components, Redundant Connection.  
Process: Mention the optimizations even if not fully coded.

**Pattern 13: Trie**  
Trigger: prefix search, autocomplete, word search with dictionary.  
Key: children map + isEnd flag.  
Canonical: Implement Trie, Design Add and Search Words.  
Process: Clarify required operations and target complexities first.

### 4. Dynamic Programming

**Pattern 14: 1D DP**  
Trigger: ways to reach, min/max cost, house robber style.  
Key: define state in words → recurrence → bottom-up or top-down.  
Canonical: Climbing Stairs, House Robber, Coin Change, LIS.  
Process: State definition first.

**Pattern 15: 2D / Grid DP**  
Trigger: grid paths, string edit, knapsack variants.  
Key: dp[i][j] from previous states.  
Canonical: Unique Paths, Longest Common Subsequence, Edit Distance.  
Process: Describe dimensions and base cases out loud.

### 5. Simulation & Custom Structures

**Pattern 16: In-Place Matrix**  
Trigger: rotate, set zeroes, spiral.  
Signal: in-place or O(1) extra space.

**Pattern 17: Bitwise**  
Lower frequency. Name the operation when used.

**Pattern 18: Custom Data Structures**  
Trigger: design with specific time bounds (usually O(1)).  
Key: combine structures (HashMap + Doubly Linked List, etc.).  
Canonical: LRU Cache, Insert Delete GetRandom O(1).  
Process: List operations + target complexities before choosing structures.

---

## The Reality of Act 1 (External View)

This round is a filter optimized for legible, standardized signal. It selects for speed of pattern recognition, fluency with the approved script, narration skill, and composure. It is only weakly related to the ability to deliver real software over months.

A candidate who has internalized the 18 patterns, the performance sequence, the ability to adapt under live constraint changes, and (where relevant) structured use of AI tools will reliably outperform a stronger real-world engineer who has not practiced the theater.

The goal of this document is not to make you a better engineer.  
It is to make the facade read correctly when the interviewer looks at it from the front.

*Reference starting point: Blind 75 / NeetCode 150 pattern breakdowns remain the highest-leverage content layer for the classic format.*
````

---

This version now accounts for the AI-assisted format, live probing, level/company variance via matrix, sharper scoring reality, and the external framing. It is the complete Act 1 map under current conditions.



**Act 1 Coding Cheat Sheet**  
*(External view – what actually gets scored)*

### Core Reality
This round measures pattern recognition speed + script fluency + narration under pressure.  
Not real problem-solving depth. Process usually outweighs pure correctness.

---

### 45-Min Performance Script (Classic Format)

| Time      | What to do                                                                                      | Dark pattern to watch                                       |
| --------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 0–5 min   | Restate problem → constraints → 1-2 examples → “I’ll start with brute force”                    | Interviewer stays silent on purpose. Keep talking.          |
| 5–12 min  | Brute + complexity → **Name the pattern out loud** → walk optimal on example → state complexity | They want the pattern named early. Silence here hurts.      |
| 12–35 min | Code while narrating. Clean names.                                                              | Long silence = automatic down-score.                        |
| 35–45 min | Trace example → edge cases → complexity → trade-offs if time                                    | They may change constraints here. Treat it as a new signal. |

**Recovery lines**
- No pattern by min 8–10: “I’ll code the brute force first and optimize.”
- Stuck > 3 min: Step back and re-explain on the example.
- Hint given: Acknowledge immediately → incorporate → restate new approach.

---

### AI-Assisted Variant (Meta-style and spreading)
Scored on: decomposition → prompt quality → verification → judgment.  
Do **not** dump the whole problem. Break it up. Narrate verification out loud. Be able to explain every line the model wrote.

---

### 18 Patterns – Trigger → Template → Must-Say

**Array / String**
1. **Two Pointers** — sorted pair sum / palindrome / container → left/right or same-direction. Say O(N)/O(1).
2. **Sliding Window** — longest/shortest subarray meeting condition → expand right, shrink left when invalid. Say fixed vs variable.
3. **Fast & Slow** — cycle / middle / duplicate → 1-step + 2-step. Contrast with HashSet on space.
4. **Prefix Sum + Map** — subarray sum = K → running sum + map. Name what the map stores.

**Search / Ordering**
5. **Binary Search** — sorted/rotated/search-on-answer → shrink space, state decision condition. Name “binary search on answer” when true.
6. **Top K / Heap** — Kth / top K frequent / median → min-heap size K or two heaps. Justify min vs max.
7. **Monotonic Stack** — next greater/smaller / histogram → increasing or decreasing stack of indices. State the monotonic property.
8. **Intervals** — merge / meeting rooms → sort by start + linear sweep. Announce sort cost. Flag heap if needed.

**Tree / Graph**
9. **BFS** — shortest path unweighted / level order → queue + visited. Say why BFS gives shortest path.
10. **DFS / Backtracking** — subsets / permutations / islands / paths → choose → explore → un-choose. Narrate the reset.
11. **Topo Sort** — course schedule / task order → in-degree + queue (or DFS + cycle). State how you detect cycles.
12. **Union-Find** — components / redundant connection → path compression + union by rank. Mention the optimizations.
13. **Trie** — prefix / autocomplete → children map + isEnd. Clarify operations + target complexities first.

**DP**
14. **1D DP** — ways / min cost / house robber → define state in words → recurrence → implement.
15. **2D DP** — grid paths / edit distance / LCS → describe dimensions + base cases out loud.

**Other**
16. **In-place Matrix** — rotate / set zeroes → O(1) extra space signal.
17. **Bitwise** — lower frequency. Name the operation.
18. **Custom DS** — O(1) operations → combine structures (HashMap + DLL etc.). List ops + complexities before choosing.

---

### Interviewer Dark Patterns (What they actually do)

- Stay silent on purpose → force you to drive and narrate.
- Change constraints mid-problem → test if you understand or just memorized.
- Give a vague hint → watch whether you incorporate cleanly or pretend you had it.
- Ask “what if N is 10x / streaming / not sorted?” → looking for adaptation, not panic.
- Let you finish early → expect you to offer trade-offs or optimizations, not sit quietly.
- Score process harder than correctness → clean medium + great narration beats messy hard solution.
- At senior levels → heavier probing and less pure algorithm weight.

---

### Instant Self-Check (before you submit)
- Did I name the pattern early?
- Did I narrate the whole way?
- Did I state complexity before and after?
- Did I hit edge cases without being asked?
- If constraints changed, did I adapt out loud?
- Was I collaborative instead of performative?

---

**One-line truth**  
Recognize → Name → Narrate → Adapt.  
That is the entire game.

**Act 1 from the Interviewer’s Side**  
*(What they are actually doing, why, and the hard truths)*

### The Real Job of the Coding Interviewer

The interviewer is not trying to find the best engineer in the room.  
They are trying to produce a **legible, defensible score** that can survive a hiring committee, a bar-raiser, and potential legal scrutiny, while fitting into a 45–60 minute slot that can be run by average engineers at scale.

That constraint shapes everything.

---

### What Interviewers Are Actually Optimizing For

| Stated Goal                        | Actual Goal                                                | Why                                                              |
| ---------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| Assess problem-solving ability     | Assess ability to perform the expected ritual cleanly      | Ritual is easy to score consistently                             |
| Test computer science fundamentals | Test pattern recognition + narration under light pressure  | Fundamentals are hard to measure in 45 min; patterns are not     |
| Find strong engineers              | Avoid false positives (hiring someone who later looks bad) | False positives are more costly and visible than false negatives |
| Be objective                       | Produce a score that looks objective                       | Real objectivity is expensive and slow                           |

---

### Core Strategies Interviewers Use

**1. Force the candidate to drive**
- They often stay quiet on purpose after giving the problem.
- Why: Silence reveals whether the candidate can structure their own thinking and communicate without being led. Candidates who freeze or wait for guidance get marked down fast.
- Hard truth: This rewards people who are comfortable performing under observation more than people who are careful thinkers.

**2. Look for early pattern recognition**
- They want the pattern named (or clearly identified) within the first 5–10 minutes.
- Why: It is the cleanest signal that the candidate has done the expected preparation. It is also easy to score.
- Hard truth: This selects for people who studied the meta, not necessarily for people who can solve unfamiliar problems.

**3. Score process harder than the final answer**
- A correct solution with poor narration or long silences often scores lower than a slightly imperfect solution delivered with clear structure.
- Why: Process is more observable and more consistent across interviewers than pure correctness. It also maps to “collaboration” and “communication” checkboxes.
- Hard truth: The round is closer to a performance evaluation than a technical evaluation.

**4. Use constraint changes and follow-ups as filters**
- “What if the array isn’t sorted?”  
- “What if N is 10x?”  
- “What if we need to support streaming?”
- Why: These questions test whether the candidate actually understands the approach or just memorized a template. They are also a low-effort way to create differentiation.
- Hard truth: Many strong working engineers get knocked out here because they prepared for the happy path, not for live adaptation theater.

**5. Give controlled hints and watch the reaction**
- Hints are rarely neutral. They are tests.
- What they watch: Does the candidate acknowledge the hint cleanly, incorporate it, and restate the new plan? Or do they get defensive, ignore it, or pretend they already knew?
- Why: This is scored under “coachability” and “collaboration.”
- Hard truth: The “right” response is often more about social performance than technical insight.

**6. Protect against the two failure modes they fear most**
- Candidate who is completely lost (wastes the slot).
- Candidate who looks strong in interview but later cannot perform (false positive).
- The process is biased toward avoiding the second failure more than maximizing the chance of finding exceptional people.

---

### What They Are Actually Looking For (Ranked)

1. **Can this person perform the expected script without falling apart?**  
2. **Do they narrate clearly and stay collaborative?**  
3. **Do they recognize common patterns quickly?**  
4. **Can they adapt when the problem is mutated?**  
5. **Is the code reasonably clean and correct?**  

Real depth, originality, production judgment, and long-term code quality are mostly outside the scope of what a 45-minute coding round can reliably measure. Most interviewers know this. The format continues because it is scalable and defensible, not because it is accurate.

---

### Hard Truths from the Interviewer Side

- Many interviewers are themselves average engineers who were trained on a rubric. They are not deep experts in evaluation.
- Calibration is imperfect. Two interviewers can watch the same performance and give different scores.
- The strongest real-world engineers are often filtered out if they are bad at the theater (poor narration, slow to pattern-match under observation, uncomfortable selling their thinking).
- The process systematically favors people who have the time, energy, and inclination to study the meta-game.
- Interviewers are usually not trying to be cruel. They are trying to survive a high-volume process that demands clean scores. The format forces them into theater mode whether they like it or not.
- At senior levels the coding round is often retained more out of institutional inertia than belief that it still predicts performance.

---

### Bottom Line (Interviewer Perspective)

The coding round is a standardized performance filter dressed up as a technical evaluation.  

Interviewers are primarily checking whether the candidate can detect the expected pattern, execute the approved script, narrate competently, and stay composed when the problem is twisted. Everything else is secondary.

It is not designed to find the best engineer.  
It is designed to produce a usable signal at scale while minimizing the most visible hiring mistakes.

Here are the four missing high-value sections, written in the same voice and structure as your existing Act 1 material. You can drop them in directly.

---

```markdown
## Practice Protocol (How to Actually Internalize the Script)

The goal is not “solve more problems.” The goal is to make the 45-minute performance automatic under observation.

### Minimum Effective Dose (per week while actively interviewing)

| Session Type                 | Frequency             | Duration  | Exact Goal                                                    |
| ---------------------------- | --------------------- | --------- | ------------------------------------------------------------- |
| Full timed narrated mock     | 3–4×                  | 45–50 min | Run the complete classic or AI-assisted script end-to-end     |
| Forced-stuck recovery drill  | 1×                    | 30–40 min | Deliberately get stuck, then practice recovery lines out loud |
| Constraint-mutation practice | 1×                    | 30–40 min | Solve, then immediately receive 2–3 live constraint changes   |
| AI-assisted format practice  | 1× (if needed)        | 45 min    | Decomposition → iterative prompting → loud verification       |
| Recording + self-review      | After every full mock | 15–20 min | Watch yourself. Score against the checklist below             |

### Self-Review Checklist (use after every recorded mock)
- [ ] Pattern named by minute 8–10?
- [ ] Continuous narration (no silence > 20–25 seconds)?
- [ ] Complexity stated before coding and again at the end?
- [ ] Edges discussed without being prompted?
- [ ] Hint or constraint change handled cleanly (acknowledge → incorporate → restate)?
- [ ] Leftover time used for trade-offs or follow-ups instead of silence?
- [ ] Tone collaborative rather than performative or defensive?

### Progression Rules
- If you cannot name the pattern within 90 seconds on a medium problem → more trigger-sheet drills, fewer full solves.
- If narration collapses under pressure → record every session until the script feels boring.
- If you freeze on constraint changes → make mutation practice mandatory until the reaction is automatic.
- Stop grinding new problems once the high-frequency 12–14 patterns feel automatic. Extra problems past that point have rapidly diminishing returns.

### Volume Reality Check
Most people who clear the bar at large companies have done 80–150 focused, narrated problems with deliberate script practice, not 500 silent LeetCode solves. Quality of representation beats quantity of problems.

---

## Ranked Failure Modes (What Actually Kills Candidates)

Ordered by observed frequency and scoring impact in real loops.

1. **Long silences / waiting to be led**  
   Interviewer stays quiet on purpose. Candidate freezes or waits. Instant process score damage.  
   Fix: Treat silence as a signal to keep driving. Have filler narration ready (“I’m checking whether the array is guaranteed sorted…”, “Let me walk through an example first…”).

2. **Pattern named too late or never**  
   Candidate codes a correct solution but never explicitly names the category. Interviewers score this as weak recognition.  
   Fix: Force the sentence “This is a classic [Pattern] because [trigger]” by minute 8–10 every single practice run.

3. **No complexity stated**  
   Candidate never says time/space before or after coding. Easy points left on the table.  
   Fix: Make “State complexity” a non-negotiable step in both the approach and verification phases.

4. **Edges never mentioned**  
   Code works on the happy path. Candidate never proactively brings up empty input, single element, duplicates, overflow, etc.  
   Fix: Build a personal 5–6 item edge checklist and run it out loud every time.

5. **Poor reaction to hints or constraint changes**  
   Candidate gets defensive, ignores the hint, pretends they already knew, or panics when the problem mutates.  
   Fix: Practice the exact recovery script: acknowledge → incorporate → restate updated approach.

6. **Finishing early and then sitting quietly**  
   Candidate solves the problem with 12 minutes left and then goes silent or makes small talk.  
   Fix: Always have 1–2 trade-offs or follow-up directions ready. Use the time.

7. **Overly clever or unreadable code**  
   Dense one-liners, unclear names, or micro-optimizations that hurt clarity.  
   Fix: Optimize for the interviewer reading the code in real time, not for LeetCode runtime.

8. **Apologizing or self-deprecating excessively**  
   “Sorry, this is probably wrong…”, “I’m bad at this pattern…”  
   Fix: Remove apologies. State what you are doing and keep moving.

These eight cover the large majority of process-based rejections. Pure algorithmic failure is less common than people think once the candidate has done basic pattern work.

---

## Senior+ Notes (How Act 1 Changes Above Mid-Level)

At senior and above, the coding round is retained more out of institutional inertia than belief that it strongly predicts performance. The scoring emphasis shifts.

### What Changes
- Pure pattern speed matters less. Adaptation and judgment matter more.
- Interviewers more frequently mutate the problem or ask production-flavored follow-ups.
- “Can this person still write clean code and reason under light pressure?” becomes the real question.
- System design and behavioral usually carry more total weight, so a mediocre coding round is more recoverable than at mid-level — but a complete collapse is still fatal.

### Adjusted Performance Priorities
1. **Name the pattern, then immediately discuss trade-offs**  
   Don’t stop at “this is sliding window.” Add “We could also do this with a tree map for ordered access at the cost of an extra log factor” or “In production I’d be more worried about the memory footprint than the asymptotic.”

2. **Treat constraint changes as the main test**  
   Expect “What if the input is a stream?”, “What if N is 50x larger?”, “What if we need to support concurrent updates?”. Respond by restating the new constraint and saying which part of the solution breaks or changes.

3. **Show you know when not to over-optimize**  
   If the constraints are small, say so. “Given N ≤ 1000, the O(N²) solution is fine and clearer. I’d only reach for the optimized version if we expected larger inputs.”

4. **Code quality bar rises slightly**  
   Interviewers are less forgiving of messy structure or unclear names. They are imagining this person reviewing PRs.

5. **Leftover time is higher leverage**  
   Use it to talk about testing strategy, monitoring, or how you would productionize the solution. This is free signal that is rarely available at mid-level.

### What to De-emphasize
- Grinding the long tail of rare patterns.
- Micro-optimizations that don’t change the complexity class.
- Trying to look like the fastest coder in the room.

### Practical Implication
Keep the 18-pattern core sharp enough that you never freeze, then spend the majority of remaining preparation on adaptation drills and talking about engineering judgment inside the coding round. The people who clear senior coding rounds cleanly are usually not the ones who solved the most LeetCode problems; they are the ones who can stay structured when the problem is no longer the happy-path version they practiced.

---

## Day-of 1-Pager (Print or Keep on Second Screen)

**Act 1 — Coding Round Cheat Sheet**

### Core Reality
This is a performance filter. Score = pattern recognition speed + script fluency + narration + composure under mutation. Process usually outweighs pure correctness.

### 45-Min Classic Script
| Time  | Action                                                                | Non-Negotiable Signal                      |
| ----- | --------------------------------------------------------------------- | ------------------------------------------ |
| 0–5   | Restate → constraints → 1-2 examples → “start with brute force”       | Keep talking even if interviewer is silent |
| 5–12  | Brute + complexity → **Name the pattern** → walk optimal → complexity | Pattern named out loud                     |
| 12–35 | Code while narrating. Clean names.                                    | No silence > 20–25s                        |
| 35–45 | Trace example → edges → complexity → trade-offs / follow-ups          | Use leftover time; do not go silent        |

### Recovery Lines (Memorize)
- No pattern by min 8–10: “I’ll implement the brute force first and look for optimization opportunities.”
- Stuck coding > 3 min: “Let me step back and re-explain the approach on the example.”
- Hint received: “That’s a good point — if I incorporate that, the approach becomes…”
- Constraint changed: Restate new constraint → say what breaks → name the adjusted approach.

### AI-Assisted Variant
Decompose first → prompt narrowly and iteratively → verify every line out loud → be ready to explain any code the model produced.

### Instant Self-Check (run in your head before you stop)
- Pattern named early?
- Narrated the whole way?
- Complexity stated twice?
- Edges covered unprompted?
- Adapted out loud if poked?
- Collaborative tone?

### One-Line Truth
Recognize → Name → Narrate → Adapt.  
That is the entire game.
```

---

These four sections plug the main gaps I called out earlier. They stay consistent with the rest of your document in tone and level of realism.

Want me to integrate them into a single clean full Act 1 document next, or adjust any of these sections?


**Compressed ~18 Coding Patterns (what actually gets asked)**

Here’s the practical shortlist with **triggers** and **one-line core idea**. These cover the vast majority of medium/hard problems at FAANG-level and similar companies.

| #   | Pattern                                                  | Trigger / When you reach for it                                                                           | Core idea                                                                               |
| --- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | **Two Pointers**                                         | Sorted array, pair/sum, reverse, remove duplicates, container with water                                  | Move left/right pointers toward each other or in same direction                         |
| 2   | **Sliding Window**                                       | Subarray/substring of fixed or variable length, max/min sum, longest unique, at-most-K                    | Expand/contract a window while maintaining a condition                                  |
| 3   | **Prefix Sum**                                           | Range sum queries, subarray sum equals K, cumulative differences                                          | Precompute running totals so any range is O(1)                                          |
| 4   | **Binary Search**                                        | Sorted array, search space, min/max capacity, first/last occurrence, peak                                 | Halve the search space on a monotonic condition                                         |
| 5   | **Fast & Slow Pointers**                                 | Linked list cycle, middle node, happy number, palindrome list                                             | Two speeds to detect cycles or find midpoint                                            |
| 6   | **Linked List Reversal / Manipulation**                  | Reverse list/sublist, swap nodes, reorder list, merge                                                     | In-place pointer rewiring (usually iterative)                                           |
| 7   | **Stack / Monotonic Stack**                              | Next greater/smaller, valid parentheses, histogram, remove k digits                                       | LIFO + keep stack monotonic for nearest previous/next                                   |
| 8   | **Hash Map / Frequency**                                 | Two-sum variants, anagrams, frequency counts, group by key                                                | O(1) lookups and counts                                                                 |
| 9   | **Heap / Priority Queue**                                | Top-K, kth largest, merge k lists, median stream, closest points                                          | Always extract min or max in log time                                                   |
| 10  | **BFS (Queue)**                                          | Shortest path unweighted, level-order, multi-source, word ladder                                          | Level-by-level exploration                                                              |
| 11  | **DFS / Backtracking**                                   | All paths/combinations/permutations, subsets, N-Queens, word search                                       | Explore + undo (choose → explore → unchoose)                                            |
| 12  | **Tree DFS / Recursion**                                 | Path sum, diameter, LCA, serialize, validate BST                                                          | Recurse on left/right + process root                                                    |
| 13  | **Dynamic Programming**                                  | Optimal substructure + overlapping subproblems (knapsack, LIS, edit distance, house robber, unique paths) | Build table or memo from smaller states                                                 |
| 14  | **Greedy**                                               | Interval scheduling, jump game, gas station, activity selection                                           | Locally optimal choice that leads to global                                             |
| 15  | **Union-Find (DSU)**                                     | Connected components, number of islands (variants), redundant connection, accounts merge                  | Efficiently merge and query sets                                                        |
| 16  | **Topological Sort**                                     | Course schedule, alien dictionary, task ordering with prerequisites                                       | Kahn’s (BFS) or DFS post-order on DAG                                                   |
| 17  | **Trie**                                                 | Prefix search, autocomplete, word search II, longest common prefix                                        | Tree of characters for prefix operations                                                |
| 18  | **Intervals / Matrix / Bits** (catch-all high-frequency) | Merge/insert intervals, matrix spiral/rotate/search, single number, power of two, bit counting            | Sort + sweep for intervals; directional traversal for matrix; bit tricks for space/time |

### Quick usage notes
- Most problems are **1–2 patterns composed**.
- The highest-frequency core set is roughly: Two Pointers, Sliding Window, Binary Search, Hash Map, BFS/DFS, Heap, DP, Stack.
- Interviewers care more about **recognizing the pattern + clean narration** than inventing a novel solution.

Want me to expand any of these into a slightly longer “how to recognize + 30-second script” version, or move on to the System Design archetypes next?