**The Five Super-Families**  
**Dependency-Driven Master Architecture**

---

### Locked Teaching & Dependency Order

| Rank | Super-Family                              | Why this position                                                                                                                                                                  |
| ---- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Linear Array Optimization**             | Simplest topology (contiguous or discrete line). Highest frequency. Teaches the core discipline of *state persistence* (Memory / Pointers / Math) that every later family re-uses. |
| 2    | **Sorted Search & Range Compression**     | Still linear data, but order becomes the dominant property. Binary search and sweep-line are the natural next tools after two-pointers and sliding windows.                        |
| 3    | **Hierarchical & Network State**          | Introduces the second major topology (nodes + edges). Builds directly on the “never re-compute / never infinite-loop” habits from Family 1.                                        |
| 4    | **Dynamic Priority & Streaming**          | Shifts from pure algorithms into *mutable partial structures* (heaps, tries). These are frequently embedded inside the first three families.                                       |
| 5    | **Exhaustive State-Space & Optimization** | Highest abstraction. Can sit on top of any previous topology. Learned last so the student already has concrete places to apply greedy / backtracking / DP.                         |

Anyone can jump around, but this sequence minimizes conceptual friction and maximizes reuse of earlier ideas.

---

>
>By codifying the entire universe of LeetCode into a dependency-driven sequence—anchored by physical topology, governed by failure-driven chains, and unified by cross-family linkers—you have constructed a complete systems engineering manual.
>
>Algorithms are no longer a disjointed collection of hundreds of individual memorization targets. They are a closed, predictable ecosystem of five structural pillars, bound by the economic laws of time, space, and constraints.
>

### Global Diagnostic Order

```
1. What is the physical topology?
   Line / Stream              → Family 1
   Ordered Ranges             → Family 2
   Node Network               → Family 3
   Mutable / Streaming        → Family 4
   Combinatorial Futures      → Family 5

2. Walk the failure-driven chain inside that family.
3. If the family cannot solve it, follow the cross-family exit.
```

---

## Super-Family 1: Linear Array Optimization  
**(Sliding Window • Two Pointers • Prefix Sum + Hash Map)**

**Core Conflict**  
Exhaustive nested loops cause Algorithmic Amnesia and Computational Redundancy.

**Failure-Driven Chain**
```
Frame (Sliding Window)
  │ fails on negatives / loss of monotonicity
  ▼
Ledger (Prefix Sum + Hash Map)          ← Hybrid when rescuing Frame’s domain
  │ fails when O(1) extra space is required
  ▼
Vise (Converging Pointers on sorted data)
  │ fails when original indices are needed
  ▼
Return to Ledger (pay the space tax)
```

**Three Primary Mechanisms**

| Mechanism                  | Core Idea                                          | When to use                                                 |
| -------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| **Frame (Sliding Window)** | Maintain a contiguous valid segment                | Subarray/substring with constraint (fixed or variable size) |
| **Ledger (Prefix + Map)**  | Precompute cumulative state for O(1) range queries | Subarray sum equals K, count of ranges, any “seen before”   |
| **Vise (Two Pointers)**    | Converge or march from ends / opposite sides       | Sorted arrays, pair/triplet sums, partition problems        |

**Canonical Skeletons**

```typescript
// Variable Sliding Window (Frame)
let left = 0;
for (let right = 0; right < n; right++) {
  // expand: incorporate nums[right]
  while (/* window invalid */) {
    // shrink: remove nums[left]
    left++;
  }
  // update answer with window [left, right]
}
```

```typescript
// Prefix Sum + Hash Map (Ledger)
const prefix = new Map([[0, 1]]);
let sum = 0, ans = 0;
for (const num of nums) {
  sum += num;
  if (prefix.has(sum - k)) ans += prefix.get(sum - k)!;
  prefix.set(sum, (prefix.get(sum) || 0) + 1);
}
```

**Key Boundaries**
- Negatives or non-monotonic conditions kill pure Frame → switch to Ledger.
- Vise requires sorted order or a clear two-side invariant; otherwise original indices are lost.
- Family 1 engines scale to 2-D via dimensional collapse (treat rows as “elements”).
- Full Master Guide already exists; this section keeps the overall document self-contained.

---

## Super-Family 2: Sorted Search & Range Compression  
**(Binary Search • Rotated Arrays • Intervals • Sweep Line)**

**Core Conflict**  
You have (or can impose) order. Brute force still scans everything. The family exists to discard half the space per step or collapse overlapping ranges into a linear pass.

**Failure-Driven Chain**
```
Search problems
  ├─ Strictly sorted + exact target/bound → Classic Binary Search (Pivot)
  ├─ Rotated sorted array                 → Find pivot, then binary search in correct half
  └─ Search space is the answer itself    → Binary Search on Answer + Feasibility check

Range / overlapping problems
  └─ Sort endpoints → Sweep Line / Interval Collapse
```

**Two Primary Mechanisms**

| Mechanism                 | Core Idea                                                      | When to use                                                        |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Pivot / Binary Search** | Maintain invariant, discard 50% per step                       | Target search, lower/upper bound, rotated arrays, search-on-answer |
| **Sweep Line**            | Sort events, process left-to-right while tracking active state | Merge intervals, meeting rooms, skyline, range coverage            |

**Canonical Skeletons**

```typescript
// Binary Search on Answer
let lo = minPossible, hi = maxPossible;
while (lo < hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (isFeasible(mid)) hi = mid;
  else lo = mid + 1;
}
return lo;
```

```typescript
// Interval Merge (Sweep / Collapse)
intervals.sort((a, b) => a[0] - b[0]);
const merged = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const last = merged.at(-1)!;
  if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);
  else merged.push(intervals[i]);
}
```

**Key Boundaries**
- Off-by-one on lower vs upper bound is the #1 bug source.
- Sorting intervals destroys original indices → keep an index if you need to map back.
- Feasibility checks inside Binary Search on Answer frequently call Family 1 or Family 5 tools.

---

## Super-Family 3: Hierarchical & Network State  
**(Trees • Graphs • Grids • Union-Find)**

**Core Conflict**  
Nodes + edges. Brute force explores every path or loops forever on cycles.

**Failure-Driven Chain**
```
Pure Tree (no cycles)
  ▼
DFS or BFS (no visited set required for correctness)
  │ structure has cycles
  ▼
Graph / Grid
  ├─ Shortest path (unweighted)       → BFS + Visited
  ├─ Any path / components / cycles   → DFS + Coloring (or parent)
  └─ Many merges + connectivity       → Union-Find
        │ needs distances or path reconstruction
        ▼
      Fall back to BFS/DFS + parent/dist maps
```

**Three Mechanical Levers**

| Lever                 | Controls                          | Classic Use                         |
| --------------------- | --------------------------------- | ----------------------------------- |
| **Stack / Recursion** | Depth-first order, path recording | Tree DFS, topological sort (DFS)    |
| **Queue**             | Level-order, shortest path        | Tree / Grid / Graph BFS             |
| **State Tracker**     | Cycle prevention, components      | Visited set, 3-coloring, Union-Find |

**Canonical Skeletons**

```typescript
// DFS
function dfs(node: number, parent = -1) {
  for (const nei of graph[node]) {
    if (nei === parent) continue;
    if (visited.has(nei)) { /* cycle */ continue; }
    visited.add(nei);
    dfs(nei, node);
  }
}
```

```typescript
// BFS
const queue = [start];
const dist = new Map([[start, 0]]);
while (queue.length) {
  const node = queue.shift()!;
  for (const nei of neighbors(node)) {
    if (!dist.has(nei)) {
      dist.set(nei, dist.get(node)! + 1);
      queue.push(nei);
    }
  }
}
```

**Key Boundaries**
- Grids are implicit graphs (4/8 directions = edges).
- Topological sort = DFS finishing times or Kahn’s algorithm (BFS + indegree).
- “Count all paths” or heavy constraints → exit to Family 5.
- Weighted edges → hand off to Family 4 (Dijkstra / priority queue).

---

## Super-Family 4: Dynamic Priority & Streaming  
**(Heaps • Tries • Top-K • Streaming Statistics)**

**Core Conflict**  
Data is mutable or arrives over time. Full re-sort on every update is too expensive.

**Failure-Driven Chains** (two orthogonal tracks)

**Priority / Order-Statistic Track**
```
Need continuous extreme / Top-K / running median
  ▼
Heap (partial order)
  │ need full sorted order or order-statistic queries repeatedly
  ▼
Balanced BST / policy-based data / Fenwick / Segment Tree
```

**Prefix / String Track**
```
Data is strings with heavy prefix sharing
  ▼
Trie
  │ low prefix sharing or huge alphabet
  ▼
Simple Hash Set of words
```

**Two Distinct Tools + Common Embeddings**

| Tool     | Invariant                | Classic Problems / Embeddings                       |
| -------- | ------------------------ | --------------------------------------------------- |
| **Heap** | Min/max always at root   | Top-K, median stream, Dijkstra, merge K lists       |
| **Trie** | Shared prefixes collapse | Autocomplete, Word Search II, longest common prefix |

**Common Embedding Patterns**
- Family 1 + Heap/Deque → Sliding Window Maximum / Minimum
- Family 3 + Heap → Dijkstra, Prim, A*
- Family 2 Sweep + Heap → Skyline, online median over ranges
- Lazy deletion (frequency map + delayed pop) is the standard way to remove arbitrary elements from a heap

**Canonical Skeletons**

```typescript
// Top-K
const heap = new MinPriorityQueue();
for (const num of nums) {
  heap.enqueue(num);
  if (heap.size() > k) heap.dequeue();
}
```

```typescript
class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}
```

**Key Boundaries**
- Heaps give partial order only; they do not support efficient arbitrary deletion without lazy techniques.
- This family is the most “structure-heavy”; the key question is “which partial structure do I maintain under updates?”
- Frequently *embedded* inside Families 1–3 rather than being the primary topology.

---

## Super-Family 5: Exhaustive State-Space & Optimization  
**(Greedy • Backtracking • Dynamic Programming)**

**Core Conflict**  
Multiple future choices exist. The naïve decision tree is exponential.

**Failure-Driven Chain** (ordered by how much future information you keep)
```
Can I prove a greedy choice property?
  ▼
Greedy (sort + one pass or priority queue)
  │ local optimum ≠ global
  ▼
Backtracking (explore + undo + prune)
  │ same subproblem solved many times / n too large
  ▼
Dynamic Programming (memoize or tabulate the state)
```

**Three Strategies**

| Strategy         | Core Idea                                      | When correct                   |
| ---------------- | ---------------------------------------------- | ------------------------------ |
| **Greedy**       | Local → global (must prove)                    | Exchange argument / matroid    |
| **Backtracking** | Explore every branch, undo                     | All solutions needed or n ≤ 20 |
| **DP**           | Overlapping subproblems + optimal substructure | Same state appears repeatedly  |

**Canonical Skeletons**

```typescript
// Backtracking
function backtrack(path: number[], start: number) {
  if (isSolution(path)) {
    results.push([...path]);
    return;
  }
  for (let i = start; i < nums.length; i++) {
    if (shouldPrune(i, path)) continue;
    path.push(nums[i]);
    backtrack(path, i + 1);
    path.pop();
  }
}
```

```typescript
// Classic 0/1 Knapsack DP
const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= capacity; w++) {
    dp[i][w] = dp[i - 1][w];
    if (w >= weight[i - 1]) {
      dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weight[i - 1]] + value[i - 1]);
    }
  }
}
```

**Critical Distinctions**
- Greedy fails silently — always hunt for a counter-example first.
- Backtracking becomes DP the instant you add memoization on the state.
- Hardest skill = **state design**: the state is the smallest tuple of information that lets you make the next decision optimally and guarantees that overlapping subproblems will collide on the same tuple.

---

### Cross-Family Relationship Summary

- Family 1 engines scale to 2-D via dimensional collapse.
- Family 2 feasibility checks often call Family 1 or Family 5.
- Family 3 + weights → Family 4 (Dijkstra).
- Family 3 + “all paths” → Family 5.
- Family 4 tools are frequently embedded inside 1, 2, and 3.
- Family 5 can be applied on top of any previous topology.

---

### Multi-Family Examples (Short Form)

**Sliding Window Maximum**  
Topology = Line → Family 1 (Frame).  
Pure window fails to answer “max in current window” efficiently.  
Cross-family exit: embed a monotonic deque or heap from Family 4.  
Result: O(n) window maintenance with O(1) or O(log n) extreme queries.

**Word Search II**  
Primary structure = board (grid) → Family 3 DFS.  
Naïve search for every word is too slow.  
Cross-family: build a Trie (Family 4) of the word list, then DFS on the board while walking the Trie. Pruning happens automatically when the Trie path dies.  
(Backtracking / state restoration from Family 5 is also present in the DFS.)

---

### One-Page Cheat Sheet (Decision Tree Only)

```
Global: What is the topology?
  Line / Stream              → F1 Linear
  Ordered Ranges             → F2 Sorted / Range
  Node Network               → F3 Hierarchical
  Mutable / Streaming        → F4 Priority / Streaming
  Combinatorial Futures      → F5 Exhaustive

F1 Linear
  Frame (Window) → fails (negatives / non-mono) → Ledger (Prefix + Map)
    → fails (O(1) space) → Vise (Two Pointers on sorted)
      → need original indices → back to Ledger

F2 Sorted / Range
  Search problems
    Classic BS → rotated? → find pivot + BS
      → answer is the search space? → BS on Answer
  Overlapping ranges? → Sort endpoints → Sweep Line

F3 Hierarchical
  Tree → DFS / BFS (no visited needed)
  Cycles → Graph / Grid
    unweighted shortest → BFS + visited
    components / cycles → DFS + color / parent
    many merges → Union-Find
    need dist / path → BFS / DFS + maps
  Weighted → F4 (Dijkstra)

F4 Priority / Streaming
  Extreme / Top-K / median → Heap
    need full order → Balanced BST / Fenwick / SegTree
  Heavy prefix sharing → Trie
    low sharing → Hash Set
  (Often embedded: window + deque, graph + heap, sweep + heap)

F5 Exhaustive
  Greedy choice property? → Greedy
    no → Backtracking (+ prune)
      overlapping + optimal substructure → DP

Cross exits
  F1 → 2D collapse
  F2 feasibility → F1 or F5
  F3 weights → F4; all-paths → F5
  F4 embeds into 1 / 2 / 3
  F5 sits on any topology
```

---

This is the comprehensive final update. All prior suggestions have been applied, naming is consistent, Family 2 distinguishes search vs range cleanly, Family 5 has a precise state-design definition, and the cheat sheet uses uniform Family labels.