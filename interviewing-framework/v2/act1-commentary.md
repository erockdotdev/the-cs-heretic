**The Scripts**  
*(What “perform the expected script without falling apart” actually means)*

These are the performances interviewers are scoring. Not the algorithms. The sequences.

---

### Script 1: Classic Coding Round (Still the majority)

**Opening (0–5 min)**  
- Restate the problem in your own words.  
- Ask 2–4 constraint questions (size, sorted?, negatives?, duplicates?, what to return?).  
- Give or request one example and walk through it briefly.  
- Say: “I’ll start with a brute-force approach and then optimize.”

**Pattern Recognition + Approach (5–12 min)**  
- State the brute-force solution and its complexity.  
- Name the pattern out loud: “This is a classic [Two Pointers / Sliding Window / etc.] problem because [specific trigger].”  
- Explain the optimal approach using the example.  
- State the target time and space complexity before writing any code.

**Coding (12–35 min)**  
- Narrate continuously while typing.  
- Use clear variable names.  
- Prefer readable code over dense/clever code.  
- If you hit a small bug, say so and fix it out loud.

**Close (35–45 min)**  
- Trace the main example through your code.  
- List edge cases (empty, single element, all same, overflow, etc.) and say how they are handled.  
- Restate final complexity.  
- If time remains, offer one trade-off or minor optimization.

**Failure points that break the script**  
- Long silence  
- Never naming the pattern  
- Jumping straight to code with no approach discussion  
- Getting the code mostly right but never verifying or discussing edges

---

### Script 2: AI-Assisted Coding Round

**Opening**  
Same clarification as classic, but add: “I’ll break this into steps and use the model for well-defined pieces.”

**Execution posture**  
- Decompose first (out loud).  
- Prompt narrowly and iteratively, not with the entire problem.  
- After every model response: read it, test it, narrate what is correct and what is wrong.  
- Treat the model as a junior pair, not an oracle.  
- Be ready to explain or rewrite any line it produced.

**What breaks this script**  
- Dumping the full problem into the model and hoping  
- Accepting output without verification  
- Being unable to explain the generated code

---

### Script 3: Recovery Scripts (Used when the main script starts failing)

**When you don’t see the pattern (by ~minute 8–10)**  
“I’m not immediately seeing the optimal pattern. I’ll implement the brute-force version first so we have something correct, then look for improvements.”

**When you go silent or get stuck while coding**  
Stop. Say: “Let me step back and walk through the approach again on the example.” Then do it.

**When the interviewer gives a hint**  
“That’s a good point. If I incorporate that, the approach becomes… [restate the updated plan].”

**When they change constraints mid-problem**  
“Okay, new constraint: [restate it]. That changes things because [reason]. The current approach [still works / needs this modification / switches to this other pattern].”

**When you finish early**  
Do not sit quietly. Offer:  
- A space or time optimization  
- How the solution would change under a harder constraint  
- A quick complexity comparison with an alternative

---

### The Meta-Script (What they are really watching)

Across every version, interviewers are tracking one core question:

> Can this person stay inside a structured performance, keep talking, adapt when poked, and finish without collapsing?

The specific algorithm is secondary.  
The ability to execute one of the scripts above without falling apart is the primary filter.

That is the entire game in Act 1.

---

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



---

**Comprehensive Guide to the ~18 Coding Patterns**  
*(Act 1 – What Actually Gets Asked & How to Perform Them)*

These 18 patterns cover the overwhelming majority of medium and hard coding interviews at FAANG-level and similar companies. Most problems are a composition of 1–2 of them. Interviewers score **pattern recognition + clean narration + composure** far more than inventing something original.

For every pattern below you get:
- Clear triggers
- Core idea
- Standard approach / skeleton
- Exact narration language that lands
- Common variants & pitfalls
- Typical time/space

Use the same overall script every time: Clarify → Brute force → Name the pattern → High-level plan → Dry-run → Code while narrating → Complexity + edges.

---

### 1. Two Pointers
**Triggers**: Sorted array, pair/sum target, reverse in-place, remove duplicates, container with most water, trapping rain water, 3-sum / 4-sum.

**Core idea**: Move two indices (usually left and right) toward each other or in the same direction to achieve O(n) after sorting.

**Standard approach**:
- Sort if needed.
- Initialize `left = 0`, `right = n-1`.
- While left < right: decide which pointer to move based on comparison with target or condition.
- For same-direction (e.g. remove duplicates): slow/fast pointers.

**Narration**:  
“This is a classic two-pointers problem because the array is sorted / we need pairs. I’ll start left at 0 and right at the end and move them based on the sum.”

**Pitfalls**: Off-by-one when moving both, forgetting to sort, handling duplicates incorrectly in 3-sum.

**Complexity**: O(n log n) if sort + O(n), O(1) extra space.

---

### 2. Sliding Window
**Triggers**: Subarray/substring of fixed or variable length, max/min sum, longest substring with at most K distinct, minimum window substring, longest repeating character replacement.

**Core idea**: Maintain a window [left, right] that expands and contracts while a condition holds. Track the answer as the window moves.

**Standard approach**:
- Use two pointers + a hash map / counter / running sum.
- Expand right, update state.
- While invalid, shrink left and update state.
- Record max/min length or sum after each valid window.

**Narration**:  
“This is a sliding window. I’ll expand the right pointer and keep a frequency map. Whenever the condition breaks I’ll move the left pointer forward.”

**Pitfalls**: Forgetting to update the answer inside the loop, incorrect shrink condition, off-by-one on window size.

**Complexity**: O(n) time, O(k) or O(1) space depending on alphabet.

---

### 3. Prefix Sum
**Triggers**: Range sum queries, subarray sum equals K, continuous subarray sum, product except self (variant), difference arrays.

**Core idea**: Precompute running totals so any range sum becomes O(1): `prefix[j] - prefix[i-1]`.

**Standard approach**:
- Build `prefix[0] = 0`, `prefix[i] = prefix[i-1] + nums[i-1]`.
- For subarray sum = K: use a hash map of prefix → count while iterating.

**Narration**:  
“I’ll precompute the prefix sums so any range is constant time. Then I’ll use a hash map to count how many times I’ve seen the needed previous prefix.”

**Pitfalls**: Off-by-one on the prefix array length, forgetting the 0 prefix for subarrays starting at index 0.

**Complexity**: O(n) build, O(1) query; O(n) space.

---

### 4. Binary Search
**Triggers**: Sorted array, search space on answer (min capacity, min days, first/last occurrence, peak element, rotated sorted array).

**Core idea**: Halve a monotonic search space until the answer is found.

**Standard approach**:
- Identify the search space (indices or possible answer values).
- While low ≤ high: mid = low + (high-low)//2, decide which half to keep based on a condition function.
- For “first/last” variants keep searching after finding a candidate.

**Narration**:  
“The search space is monotonic, so I can binary search on the answer. I’ll define a condition function that tells me whether mid is feasible.”

**Pitfalls**: Infinite loop (wrong low/high update), overflow on mid, off-by-one on the final answer.

**Complexity**: O(log n) or O(n log A) when searching on answer value.

---

### 5. Fast & Slow Pointers
**Triggers**: Linked list cycle detection, find middle node, happy number, palindrome linked list, find cycle start.

**Core idea**: Two pointers moving at different speeds (1x and 2x). If they meet there is a cycle; middle is where slow is when fast finishes.

**Standard approach**:
- `slow = head`, `fast = head`.
- Move slow once, fast twice.
- For cycle start: after meeting, reset one pointer to head and move both at 1x.

**Narration**:  
“I’ll use the classic fast-and-slow pointer technique. Slow moves one step, fast moves two. If they meet we have a cycle.”

**Pitfalls**: Null checks on fast.next, handling even/odd length for middle, forgetting to reset for cycle entrance.

**Complexity**: O(n) time, O(1) space.

---

### 6. Linked List Reversal / Manipulation
**Triggers**: Reverse entire list or sublist, swap nodes in pairs, reorder list, reverse nodes in k-group, merge two lists.

**Core idea**: In-place pointer rewiring, almost always iterative with three pointers (prev, curr, next).

**Standard approach**:
```text
prev = None
curr = head
while curr:
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
return prev
```

**Narration**:  
“I’ll reverse the list iteratively with three pointers: prev, curr, and next. Each step I rewire curr.next to prev and advance.”

**Pitfalls**: Losing the next pointer, forgetting to return the new head, edge cases of empty or single-node lists.

**Complexity**: O(n) time, O(1) space.

---

### 7. Stack / Monotonic Stack
**Triggers**: Next greater/smaller element, valid parentheses, largest rectangle in histogram, remove k digits, asteroid collision, daily temperatures.

**Core idea**: LIFO structure. For monotonic stack keep the stack strictly increasing or decreasing so the top is always the nearest previous candidate.

**Standard approach**:
- Iterate left to right (or right to left).
- While stack is not empty and current violates monotonicity, pop and process.
- Push current index or value.

**Narration**:  
“I’ll use a monotonic decreasing stack of indices. While the current element is greater than the top I’ll pop and record the answer.”

**Pitfalls**: Storing values vs indices, forgetting to process remaining stack at the end, off-by-one on distances.

**Complexity**: O(n) time (each element pushed/popped once), O(n) space.

---

### 8. Hash Map / Frequency
**Triggers**: Two-sum and variants, anagrams, group anagrams, frequency counts, subarray sum equals K, longest consecutive sequence.

**Core idea**: O(1) average lookups and counts. Store value → index or value → frequency.

**Standard approach**:
- Single pass: for each element check if the complement exists, then insert.
- For anagrams: sort the string as key or use a frequency tuple as key.

**Narration**:  
“I’ll use a hash map from value to index. For each number I check whether target - num already exists.”

**Pitfalls**: Handling duplicates (two-sum with same element twice), mutating the map while iterating, collision assumptions.

**Complexity**: O(n) time, O(n) space.

---

### 9. Heap / Priority Queue
**Triggers**: Top-K elements, kth largest, merge k sorted lists, find median from data stream, k closest points, task scheduler.

**Core idea**: Always able to extract the current min or max in O(log n). Use min-heap or max-heap (or both for median).

**Standard approach**:
- For top-K: keep a min-heap of size K; if new element is larger, pop and push.
- For merge k lists: push the head of each list, then repeatedly pop the smallest and push its next.

**Narration**:  
“I’ll maintain a min-heap of size K. That way the top of the heap is always the Kth largest so far.”

**Pitfalls**: Heap size management, custom comparators for objects, forgetting to handle empty heap.

**Complexity**: O(n log K) for top-K, O(n log k) for merge k lists.

---

### 10. BFS (Queue)
**Triggers**: Shortest path in unweighted graph/grid, level-order traversal, multi-source BFS, word ladder, walls and gates, rotting oranges.

**Core idea**: Explore level by level. First time you reach a node is the shortest path.

**Standard approach**:
- Queue + visited set.
- Enqueue starting node(s), mark visited.
- While queue not empty: process current level size, enqueue unvisited neighbors.

**Narration**:  
“Because the graph is unweighted I’ll use BFS for shortest path. I’ll keep a queue and a visited set, and track distance level by level.”

**Pitfalls**: Forgetting to mark visited when enqueueing (not when dequeuing), infinite loops on cycles, multi-source initialization.

**Complexity**: O(V + E) time, O(V) space.

---

### 11. DFS / Backtracking
**Triggers**: All paths, combinations, permutations, subsets, N-Queens, word search, sudoku solver, generate parentheses.

**Core idea**: Explore a choice, recurse, then undo the choice (“choose → explore → unchoose”).

**Standard approach**:
```text
def backtrack(path, choices):
    if goal_reached:
        result.append(path[:])
        return
    for choice in choices:
        if valid(choice):
            path.append(choice)
            backtrack(path, new_choices)
            path.pop()
```

**Narration**:  
“This is a backtracking problem. I’ll build the path incrementally, recurse, and backtrack by undoing the last choice.”

**Pitfalls**: Forgetting to undo (mutate shared state), missing base case, exponential blow-up without pruning.

**Complexity**: Usually O(n!) or O(2^n) time; space O(n) for the recursion depth.

---

### 12. Tree DFS / Recursion
**Triggers**: Path sum, binary tree diameter, lowest common ancestor, serialize/deserialize, validate BST, max path sum, flatten tree.

**Core idea**: Recurse on left and right children, then process the root (pre/in/post order as needed). Return values up the call stack.

**Standard approach**:
- Base case: null node returns 0 / None / True.
- Recurse left, recurse right, combine results with root.

**Narration**:  
“I’ll solve this with a recursive DFS. For each node I compute the answer from the left and right subtrees and combine them at the root.”

**Pitfalls**: Not handling null children, mutating the tree unintentionally, stack overflow on skewed trees (rare in interviews).

**Complexity**: O(n) time, O(h) space (height).

---

### 13. Dynamic Programming
**Triggers**: Optimal substructure + overlapping subproblems — knapsack, LIS, edit distance, house robber, unique paths, coin change, word break, partition equal subset sum.

**Core idea**: Build a table (or memo) from smaller subproblems to larger ones. Define the state clearly.

**Standard approach**:
1. Define state: `dp[i]` or `dp[i][j]` = answer for subproblem ending at i (or i,j).
2. Recurrence relation.
3. Base cases.
4. Iterate in correct order (bottom-up) or top-down with memo.

**Narration**:  
“This has optimal substructure and overlapping subproblems, so DP. I’ll define dp[i] as … The recurrence is … Base case is …”

**Pitfalls**: Wrong state definition, incorrect iteration order, off-by-one in table size, forgetting to initialize base cases.

**Complexity**: Usually O(n) or O(n²) time and space (can often optimize space).

---

### 14. Greedy
**Triggers**: Interval scheduling / merge intervals, jump game, gas station, activity selection, minimum number of platforms, candy distribution.

**Core idea**: Make the locally optimal choice at each step; prove (or assume in interview) it leads to global optimum.

**Standard approach**:
- Sort by a key (end time, start time, etc.).
- Iterate once, keep a running variable (current end, current fuel, etc.), update when the greedy choice applies.

**Narration**:  
“A greedy approach works here. I’ll sort the intervals by end time and always pick the one that finishes earliest.”

**Pitfalls**: Choosing the wrong sort key, not realizing a counter-example exists (then fall back to DP).

**Complexity**: Usually O(n log n) from the sort + O(n).

---

### 15. Union-Find (DSU)
**Triggers**: Connected components, number of islands (with union), redundant connection, accounts merge, graph validity, earliest friends.

**Core idea**: Efficiently merge sets and query whether two elements belong to the same set. Path compression + union by rank makes it nearly O(1).

**Standard approach**:
```text
parent = list(range(n))
rank = [0]*n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(x, y):
    px, py = find(x), find(y)
    if px == py: return False
    # union by rank
    ...
    return True
```

**Narration**:  
“I’ll use Union-Find with path compression and union by rank. Each edge is a union; if they’re already connected we found a cycle / redundant edge.”

**Pitfalls**: Forgetting path compression or union by rank (still works but slower), 0-based vs 1-based indexing.

**Complexity**: Almost O(n + m α(n)) ≈ O(n + m).

---

### 16. Topological Sort
**Triggers**: Course schedule, alien dictionary, task ordering with prerequisites, build order, longest increasing path in matrix (variant).

**Core idea**: Linear ordering of a DAG so that for every edge u → v, u comes before v. Kahn’s algorithm (BFS + indegree) or DFS post-order.

**Standard approach (Kahn)**:
- Build graph + indegree array.
- Queue all nodes with indegree 0.
- While queue: pop, add to result, decrease indegrees of neighbors, enqueue if indegree becomes 0.
- If result length < n → cycle.

**Narration**:  
“This is a topological sort on a DAG. I’ll use Kahn’s algorithm: start with nodes of indegree zero and peel the graph layer by layer.”

**Pitfalls**: Detecting cycles, handling disconnected components, building the adjacency list correctly.

**Complexity**: O(V + E).

---

### 17. Trie
**Triggers**: Prefix search, autocomplete, word search II (board + dictionary), longest common prefix, replace words, implement magic dictionary.

**Core idea**: Tree where each node represents a character; path from root spells a prefix. Children stored in a map or array of size 26.

**Standard approach**:
```text
class Node:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(word):
    node = root
    for ch in word:
        if ch not in node.children:
            node.children[ch] = Node()
        node = node.children[ch]
    node.is_end = True
```

**Narration**:  
“I’ll build a Trie so prefix operations are efficient. Each node has a map of children and an end-of-word flag.”

**Pitfalls**: Memory blow-up on large alphabets, forgetting the is_end flag, not handling the empty string.

**Complexity**: O(m) per operation where m is word length; space O(total characters).

---

### 18. Intervals / Matrix / Bits (High-Frequency Catch-All)
**Triggers**:
- Intervals: merge intervals, insert interval, meeting rooms, interval intersection.
- Matrix: spiral order, rotate image, set matrix zeroes, search 2D matrix, number of islands (DFS/BFS).
- Bits: single number, power of two, number of 1 bits, reverse bits, missing number.

**Core ideas**:
- Intervals → sort by start, then linear sweep merging overlapping ones.
- Matrix → directional deltas or layer-by-layer traversal; treat as graph for DFS/BFS.
- Bits → use XOR for single number, `n & (n-1)` tricks, bit masks.

**Narration examples**:
- “I’ll sort the intervals by start time and then merge overlapping ones in one pass.”
- “For the matrix I’ll use four pointers for the boundaries and walk in a spiral.”
- “XOR of all numbers cancels out the pairs and leaves the single number.”

**Complexity**: Intervals O(n log n), matrix O(rows × cols), bits O(1) or O(32).

---

### How to Practice These for Maximum Interview ROI
1. For each pattern, do 5–8 high-frequency LeetCode problems (Medium first).
2. Force yourself to say the pattern name and the one-line core idea out loud before coding.
3. Time-box: 20–25 minutes per problem, including full narration.
4. After solving, re-solve the same problem the next day from memory using only the pattern name.
5. Mix patterns: many real interview questions are “sliding window + hash map” or “DFS + backtracking + trie”, etc.

Master recognition + the narration script for these 18 and you cover the vast majority of what appears in the coding rounds. Everything else is adaptation under pressure.


**Complete Technical & Problem-Solving Guide to the 18 Coding Patterns (JavaScript)**

This is a full working reference for interview performance and real understanding.  
For every pattern you get:

- Precise technical definition and why it works
- When to reach for it (triggers)
- Core mental model
- Clean, interview-ready JavaScript implementation patterns
- Key variants
- Edge cases & pitfalls
- Time/Space complexity
- Exact phrases that score well in interviews

All code is modern JavaScript (ES6+), uses clear variable names, and is written the way strong candidates actually type in a live interview.

---

### 1. Two Pointers

**Technical understanding**  
Two indices move through a linear structure (usually an array). Because the data is sorted or has some monotonic property, each pointer only needs to move in one direction. This reduces O(n²) nested loops to O(n).

**Triggers**  
Sorted array, pair with target sum, reverse, remove duplicates in-place, container with most water, trapping rain water, 3-sum / 4-sum.

**Core idea**  
Left and right (or slow and fast) pointers cooperate. The decision of which pointer to move is determined by a comparison.

**JavaScript pattern**
```js
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}

// Same-direction version (remove duplicates)
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}
```

**Edge cases**  
Empty array, single element, all duplicates, negative numbers, overflow on sum (rare in JS).

**Complexity**  
O(n) time after sort, O(1) extra space.

**Interview line**  
“Because the array is sorted I can use two pointers starting from both ends and move them based on the sum.”

---

### 2. Sliding Window

**Technical understanding**  
A window [left, right] expands and contracts while a condition remains true. We maintain auxiliary state (sum, frequency map, count of unique characters, etc.) so that each expansion or contraction is O(1) amortized.

**Triggers**  
Longest substring with at most K distinct, minimum window substring, max sum of size K, longest repeating character replacement, subarray product less than K.

**Core idea**  
Expand right → update state → while invalid, shrink left → update answer.

**JavaScript pattern**
```js
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Fixed-size window
function maxSumSubarray(nums, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= nums[i - (k - 1)];
    }
  }
  return maxSum;
}
```

**Edge cases**  
Empty string, window larger than array, all identical characters, K = 0.

**Complexity**  
O(n) time, O(min(n, alphabet)) space.

**Interview line**  
“I’ll maintain a sliding window with a frequency map. Expand right, and shrink left whenever the constraint is violated.”

---

### 3. Prefix Sum

**Technical understanding**  
Pre-compute cumulative sums so any range sum becomes a subtraction. Combined with a hash map it solves “subarray sum equals K” in linear time.

**Triggers**  
Range sum queries, subarray sum = K, continuous subarray sum, product of array except self (variant).

**JavaScript pattern**
```js
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k);
    }
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}

// Basic prefix array
function buildPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  // sum from i to j inclusive = prefix[j+1] - prefix[i]
  return prefix;
}
```

**Edge cases**  
Negative numbers, K = 0, empty array, single element equal to K.

**Complexity**  
O(n) time & space.

**Interview line**  
“I’ll keep a running prefix sum and a map of how many times each prefix has appeared. Then sum - k tells me how many valid subarrays end here.”

---

### 4. Binary Search

**Technical understanding**  
Search space must be monotonic. We repeatedly discard half of the remaining possibilities by evaluating a condition at the midpoint.

**Triggers**  
Classic search in sorted array, first/last occurrence, search in rotated array, peak element, capacity to ship packages, minimum days to make m bouquets, etc. (search on answer).

**JavaScript pattern**
```js
function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1); // avoid overflow
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Search on answer example – minimum capacity
function shipWithinDays(weights, days) {
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);

  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (canShip(weights, days, mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

function canShip(weights, days, capacity) {
  let current = 0;
  let needed = 1;
  for (const w of weights) {
    if (current + w > capacity) {
      needed++;
      current = 0;
    }
    current += w;
  }
  return needed <= days;
}
```

**Edge cases**  
Empty array, target smaller/larger than all elements, duplicates (first/last variants), overflow on mid calculation.

**Complexity**  
O(log n) for classic, O(n log S) when searching on answer value S.

**Interview line**  
“The feasibility function is monotonic, so I can binary search on the answer.”

---

### 5. Fast & Slow Pointers

**Technical understanding**  
Two pointers move at different speeds. In a linked list this detects cycles (Floyd) and finds the middle in one pass. The mathematical guarantee comes from relative speed.

**Triggers**  
Cycle detection, find middle node, palindrome linked list, happy number, find start of cycle.

**JavaScript pattern**
```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function findMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// Find cycle start
function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}
```

**Edge cases**  
Empty list, single node, cycle of length 1, no cycle.

**Complexity**  
O(n) time, O(1) space.

**Interview line**  
“I’ll use Floyd’s tortoise and hare. Slow moves one step, fast moves two. If they meet there is a cycle.”

---

### 6. Linked List Reversal / Manipulation

**Technical understanding**  
We rewire `next` pointers in-place. The classic iterative version uses three pointers so we never lose the rest of the list.

**Triggers**  
Reverse list, reverse sublist, swap pairs, reverse in k-groups, reorder list, merge two sorted lists.

**JavaScript pattern**
```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// Reverse between left and right (1-indexed)
function reverseBetween(head, left, right) {
  const dummy = { next: head };
  let prev = dummy;

  for (let i = 0; i < left - 1; i++) prev = prev.next;

  let curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = curr.next;
    curr.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  return dummy.next;
}
```

**Edge cases**  
Empty list, single node, reverse entire list, left === right.

**Complexity**  
O(n) time, O(1) space.

**Interview line**  
“I’ll reverse iteratively with three pointers: prev, curr, and next. Each step I rewire and advance.”

---

### 7. Stack / Monotonic Stack

**Technical understanding**  
A stack gives LIFO order. A monotonic stack maintains elements in sorted order (increasing or decreasing). When the monotonicity would be violated we pop, and the popped element’s “next greater/smaller” is the current element.

**Triggers**  
Next greater element, daily temperatures, largest rectangle in histogram, remove k digits, valid parentheses, asteroid collision.

**JavaScript pattern**
```js
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}

// Largest rectangle in histogram
function largestRectangleArea(heights) {
  const stack = [-1];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length > 1 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
```

**Edge cases**  
Empty array, strictly increasing/decreasing, all equal heights.

**Complexity**  
O(n) time (each index pushed & popped at most once), O(n) space.

**Interview line**  
“I’ll keep a monotonic decreasing stack of indices. While the current value is greater I pop and record the answer.”

---

### 8. Hash Map / Frequency

**Technical understanding**  
Average O(1) insert/lookup/delete. We trade space for time. Frequency maps turn counting problems into constant-time checks.

**Triggers**  
Two-sum, group anagrams, top K frequent, subarray sum = K, longest consecutive sequence, isomorphic strings.

**JavaScript pattern**
```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}
```

**Edge cases**  
Duplicates, empty strings, negative numbers, very large frequency counts.

**Complexity**  
O(n) average time, O(n) space.

**Interview line**  
“I’ll use a hash map from value to index so I can check for the complement in constant time.”

---

### 9. Heap / Priority Queue

**Technical understanding**  
Binary heap gives O(log n) insert and extract-min/extract-max. In JavaScript we usually implement a simple binary heap or use a library; in interviews we often write a minimal version or describe it.

**Triggers**  
Top-K, kth largest, merge k sorted lists, find median from stream, k closest points, task scheduler.

**JavaScript pattern (min-heap)**
```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return top;
  }
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[i] >= this.heap[parent]) break;
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

// Top-K frequent
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const heap = new MinHeap(); // store [freq, num]
  for (const [num, f] of freq) {
    heap.push([f, num]);
    if (heap.size() > k) heap.pop();
  }
  return heap.heap.map(x => x[1]);
}
```

**Edge cases**  
K larger than unique elements, all frequencies equal, empty input.

**Complexity**  
O(n log k) for top-K.

**Interview line**  
“I’ll keep a min-heap of size K. The top of the heap is always the current Kth largest.”

---

### 10. BFS (Queue)

**Technical understanding**  
Level-order exploration. First time a node is reached is the shortest path in an unweighted graph. We use a queue and a visited set.

**Triggers**  
Shortest path in grid/graph, level-order traversal, word ladder, rotting oranges, walls and gates, multi-source BFS.

**JavaScript pattern**
```js
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;

  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const queue = [[0, 0, 1]]; // row, col, dist
  grid[0][0] = 1; // mark visited

  while (queue.length) {
    const [r, c, dist] = queue.shift();
    if (r === n-1 && c === n-1) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}
```

**Edge cases**  
Start == end, blocked start/end, disconnected graph, 0-weight edges (still works).

**Complexity**  
O(V + E) time, O(V) space.

**Interview line**  
“Because every edge has the same weight I can use BFS for the shortest path. I’ll process level by level.”

---

### 11. DFS / Backtracking

**Technical understanding**  
We explore a choice, recurse, then undo the choice so the state is restored for the next sibling. This systematically generates all possibilities while pruning invalid branches early.

**Triggers**  
Permutations, combinations, subsets, N-Queens, word search, sudoku, generate parentheses, combination sum.

**JavaScript pattern**
```js
function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return result;
}

function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }
  backtrack();
  return result;
}
```

**Edge cases**  
Empty input, duplicates (need extra skipping logic), very large n (exponential).

**Complexity**  
O(2ⁿ) or O(n!) time depending on the problem, O(n) recursion depth.

**Interview line**  
“This is classic backtracking: choose → explore → unchoose. I’ll build the path incrementally and undo after the recursive call.”

---

### 12. Tree DFS / Recursion

**Technical understanding**  
Most binary-tree problems are naturally recursive: solve left, solve right, combine at the root. We return values up the call stack or mutate a shared answer variable.

**Triggers**  
Path sum, max depth, diameter, LCA, validate BST, serialize, max path sum, flatten to linked list.

**JavaScript pattern**
```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function diameterOfBinaryTree(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }
  height(root);
  return diameter;
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
```

**Edge cases**  
Empty tree, single node, skewed tree, p or q is the root.

**Complexity**  
O(n) time, O(h) space (height).

**Interview line**  
“I’ll do a recursive DFS. For each node I compute the result from the left and right subtrees and combine them.”

---

### 13. Dynamic Programming

**Technical understanding**  
We break a problem into overlapping subproblems that have optimal substructure. Bottom-up fills a table; top-down uses memoization. The hard part is defining the state and the recurrence correctly.

**Triggers**  
House robber, coin change, LIS, edit distance, unique paths, 0/1 knapsack, word break, partition equal subset sum.

**JavaScript pattern**
```js
// House Robber – bottom-up
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;
  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}

// Coin Change – unbounded knapsack style
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Top-down with memo
function lengthOfLIS(nums) {
  const memo = new Map();
  function dfs(i) {
    if (memo.has(i)) return memo.get(i);
    let maxLen = 1;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        maxLen = Math.max(maxLen, 1 + dfs(j));
      }
    }
    memo.set(i, maxLen);
    return maxLen;
  }
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans = Math.max(ans, dfs(i));
  }
  return ans;
}
```

**Edge cases**  
Amount = 0, empty coins, negative numbers (usually forbidden), very large n (need space optimization).

**Complexity**  
Usually O(n·W) or O(n²).

**Interview line**  
“This has optimal substructure and overlapping subproblems, so DP. I’ll define dp[i] as the best answer for the first i elements.”

---

### 14. Greedy

**Technical understanding**  
At each step we make the choice that looks best locally. For the problems that appear in interviews the greedy choice property holds (often after sorting).

**Triggers**  
Jump game, gas station, merge intervals, meeting rooms, activity selection, minimum platforms, candy.

**JavaScript pattern**
```js
function canJump(nums) {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
  }
  return true;
}

function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}
```

**Edge cases**  
Empty intervals, single interval, already sorted, overlapping at endpoints.

**Complexity**  
Usually O(n log n) from the sort.

**Interview line**  
“A greedy strategy works after sorting. I’ll always pick the interval that finishes earliest / jump as far as possible.”

---

### 15. Union-Find (Disjoint Set Union)

**Technical understanding**  
We maintain a forest of trees. `find` with path compression + `union` by rank gives almost O(1) operations (inverse Ackermann).

**Triggers**  
Number of connected components, redundant connection, accounts merge, graph valid tree, earliest friends, number of islands (with union).

**JavaScript pattern**
```js
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false;

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    this.components--;
    return true;
  }
}
```

**Edge cases**  
n = 0, self-loops, already connected nodes.

**Complexity**  
O(n + m · α(n)) ≈ O(n + m).

**Interview line**  
“I’ll use Union-Find with path compression and union by rank. Each successful union decreases the component count.”

---

### 16. Topological Sort

**Technical understanding**  
A linear ordering of a DAG such that for every edge u → v, u appears before v. Kahn’s algorithm (BFS + indegrees) or DFS post-order both work. Cycle detection is free with Kahn.

**Triggers**  
Course schedule, alien dictionary, task scheduling with prerequisites, build order.

**JavaScript pattern (Kahn)**
```js
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length) {
    const curr = queue.shift();
    taken++;
    for (const next of graph[curr]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return taken === numCourses;
}
```

**Edge cases**  
No prerequisites, self-loop, disconnected components, cycle.

**Complexity**  
O(V + E).

**Interview line**  
“This is a topological sort. I’ll use Kahn’s algorithm: start with zero-indegree nodes and peel the graph layer by layer.”

---

### 17. Trie

**Technical understanding**  
A tree where each node represents a character. The path from the root spells a prefix. Children are stored in a Map (or fixed array of size 26 for lowercase letters).

**Triggers**  
Implement Trie, word search II, autocomplete, replace words, longest common prefix, maximum XOR.

**JavaScript pattern**
```js
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return true;
  }
}
```

**Edge cases**  
Empty string, very long words, large alphabet, memory pressure.

**Complexity**  
O(m) per operation where m = word length. Space O(total characters).

**Interview line**  
“I’ll build a Trie so that prefix checks are efficient. Each node has a map of children and an end-of-word flag.”

---

### 18. Intervals / Matrix / Bit Manipulation

**Technical understanding**  
Three high-frequency “catch-all” families that appear constantly.

**Intervals**  
Sort by start time, then linear sweep merging or counting overlaps.

**Matrix**  
Treat as a graph (DFS/BFS) or walk with direction deltas / four boundaries (spiral, rotate).

**Bits**  
XOR cancels pairs, `n & (n-1)` clears lowest set bit, bit masks for subsets.

**JavaScript patterns**
```js
// Merge Intervals
function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}

// Spiral Order
function spiralOrder(matrix) {
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}

// Single Number (bit)
function singleNumber(nums) {
  let xor = 0;
  for (const n of nums) xor ^= n;
  return xor;
}
```

**Complexity**  
Intervals O(n log n), Matrix O(rows·cols), Bits O(n) or O(1).

---

### How to Use This Guide in Practice

1. Pick one pattern per day.
2. Implement the skeleton from memory in JS.
3. Solve 5–8 LeetCode mediums that map to it, forcing yourself to say the pattern name and core idea out loud before coding.
4. Re-solve the same problems 2–3 days later with only the pattern name as a hint.
5. Mix patterns (most real questions are combinations).

Master the recognition + the JavaScript patterns above and you will handle the large majority of coding rounds cleanly. The rest is composure and adaptation under the timer.



**Complete Guide to Data Structures for Coding Interviews (JavaScript)**

This is the foundational layer that the 18 patterns sit on top of.  
You need to know:

- Exact definitions and internal mechanics
- Time/space complexities for every common operation
- When to reach for each structure
- How they relate to one another
- The classic interview questions that test them
- Clean JavaScript implementations you can type under pressure

All code is modern, interview-friendly JavaScript.

---

### 1. Arrays

**Definition**  
Contiguous block of memory storing elements of the same type (in JS, a dynamic array under the hood).

**Key Properties**
- Random access: O(1)
- Insertion/deletion at end: amortized O(1)
- Insertion/deletion at beginning or middle: O(n)
- Searching (unsorted): O(n) | (sorted): O(log n) with binary search

**Common Interview Questions**
- Two Sum / 3Sum / 4Sum
- Container With Most Water
- Trapping Rain Water
- Product of Array Except Self
- Maximum Subarray (Kadane)
- Merge Intervals
- Rotate Array
- Find Minimum in Rotated Sorted Array

**JavaScript notes**
```js
const arr = [1, 2, 3];
arr.push(4);          // O(1) amortized
arr.pop();            // O(1)
arr.unshift(0);       // O(n)
arr.splice(1, 1);     // O(n)
arr.slice(1, 3);      // O(k) – creates copy
```

**Relationship**  
Arrays are the foundation for almost every other structure (stacks, queues, heaps, hash tables, etc.).

---

### 2. Strings

**Definition**  
Immutable sequence of characters (in JS, strings are primitive and immutable).

**Key Properties**
- Access by index: O(1)
- Concatenation: O(n) (creates new string)
- Substring search: O(n·m) naive, better with KMP/Rabin-Karp
- Many problems treat strings as arrays of characters

**Common Interview Questions**
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Valid Anagram / Group Anagrams
- Longest Palindromic Substring
- Encode and Decode Strings
- Valid Parentheses (often solved with stack)
- Implement strStr() / Index of First Occurrence

**JavaScript notes**
```js
const s = "hello";
s[0];                 // 'h'
s.length;             // 5
s.slice(1, 4);        // "ell"
s.split('');          // ['h','e','l','l','o']
[...s];               // same
s.includes("ell");    // true
```

**Relationship**  
Almost every string problem can be solved with the same techniques as array problems (two pointers, sliding window, etc.).

---

### 3. Linked Lists

**Definition**  
Linear collection of nodes where each node points to the next (and optionally previous).

**Types**
- Singly Linked List
- Doubly Linked List
- Circular Linked List

**Key Properties**
- Access by index: O(n)
- Insertion/deletion at known position: O(1)
- No random access
- Extra memory for pointers

**Node definition**
```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

**Common Interview Questions**
- Reverse Linked List
- Detect Cycle / Find Cycle Start (Floyd)
- Merge Two Sorted Lists
- Remove Nth Node From End
- Reorder List
- Copy List with Random Pointer
- LRU Cache (doubly linked list + hash map)
- Add Two Numbers

**Core operations**
```js
// Reverse
function reverse(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

**Relationship**  
Used heavily with fast & slow pointers. Doubly linked lists are the backbone of LRU Cache.

---

### 4. Stack

**Definition**  
LIFO (Last-In-First-Out) structure.

**Key Properties**
- Push / Pop / Peek: O(1)
- Can be implemented with array or linked list

**Common Interview Questions**
- Valid Parentheses
- Min Stack
- Evaluate Reverse Polish Notation
- Daily Temperatures / Next Greater Element
- Largest Rectangle in Histogram
- Decode String
- Basic Calculator
- Asteroid Collision

**JavaScript implementation**
```js
class Stack {
  constructor() {
    this.items = [];
  }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}
```

**Relationship**  
Monotonic stacks are one of the highest-ROI techniques in interviews. Stacks are also used for DFS (explicit stack) and expression evaluation.

---

### 5. Queue & Deque

**Definition**  
FIFO (First-In-First-Out). Deque allows insertion/removal at both ends.

**Key Properties**
- Enqueue / Dequeue: O(1)
- In JS, `Array.shift()` is O(n) — avoid it for real queues

**Common Interview Questions**
- Implement Queue using Stacks
- Number of Recent Calls
- Sliding Window Maximum (monotonic deque)
- Rotting Oranges / Walls and Gates (BFS)
- Design Circular Queue
- Moving Average from Data Stream

**JavaScript notes**
```js
// Simple queue (fine for interviews)
const queue = [];
queue.push(1);        // enqueue
queue.shift();        // dequeue – O(n), acceptable in interviews

// Better for production: use a linked list or a circular buffer
```

**Relationship**  
Queues power BFS. Monotonic deques solve sliding window maximum/minimum in O(n).

---

### 6. Hash Table (Map / Set)

**Definition**  
Key-value store with average O(1) insert, lookup, and delete via hashing.

**Key Properties**
- Average O(1) operations
- Worst case O(n) (hash collisions)
- Unordered
- Keys must be hashable

**JavaScript**
```js
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);
map.delete(key);
map.size;

const set = new Set();
set.add(val);
set.has(val);
set.delete(val);
```

**Common Interview Questions**
- Two Sum
- Group Anagrams
- Top K Frequent Elements
- Longest Consecutive Sequence
- Subarray Sum Equals K
- Valid Sudoku
- Design HashMap / HashSet
- LRU Cache (HashMap + Doubly Linked List)

**Relationship**  
The single most useful structure in interviews. Almost every “frequency” or “lookup” problem uses it. Combined with prefix sums it becomes extremely powerful.

---

### 7. Trees

**Definition**  
Hierarchical structure with a root and children. No cycles.

**Important Types**
- Binary Tree
- Binary Search Tree (BST)
- Balanced BST (AVL, Red-Black – rarely implemented)
- Heap (see below)
- Trie (prefix tree)
- N-ary Tree

**Binary Tree Node**
```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

**Common Interview Questions**
- Maximum Depth / Balanced Binary Tree
- Invert Binary Tree
- Lowest Common Ancestor
- Validate BST
- Serialize and Deserialize Binary Tree
- Binary Tree Level Order Traversal
- Path Sum / Max Path Sum
- Diameter of Binary Tree
- Construct Binary Tree from Preorder and Inorder

**Traversals**
- Pre-order, In-order, Post-order (DFS)
- Level-order (BFS)

**Relationship**  
Trees are recursively defined → most solutions are recursive. BSTs give O(log n) search when balanced. Tries are specialized trees for strings.

---

### 8. Heaps (Priority Queues)

**Definition**  
Complete binary tree that satisfies the heap property (parent ≥ children for max-heap, ≤ for min-heap).

**Key Properties**
- Find min/max: O(1)
- Insert / Extract: O(log n)
- Build heap: O(n)

**Common Interview Questions**
- Kth Largest Element
- Top K Frequent Elements
- Merge K Sorted Lists
- Find Median from Data Stream
- K Closest Points to Origin
- Task Scheduler
- Ugly Number II

**JavaScript**  
No built-in heap. In interviews you either:
- Use a sorted array + binary search (acceptable for small k)
- Implement a simple binary heap
- Describe the operations and complexity

**Relationship**  
Heaps are the standard way to get the current minimum or maximum efficiently. Often combined with hash maps for frequency problems.

---

### 9. Graphs

**Definition**  
Set of nodes (vertices) connected by edges. Can be directed/undirected, weighted/unweighted, cyclic/acyclic.

**Representations**
```js
// Adjacency List (most common)
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
};

// Or Map of arrays
const graph = new Map();
```

**Key Algorithms**
- BFS → shortest path in unweighted graph
- DFS → connectivity, cycle detection, topological sort
- Union-Find → connected components
- Dijkstra / Bellman-Ford (weighted – less common in interviews)
- Topological Sort (Kahn or DFS)

**Common Interview Questions**
- Number of Islands
- Clone Graph
- Course Schedule (I & II)
- Pacific Atlantic Water Flow
- Word Ladder
- Network Delay Time
- Redundant Connection
- Accounts Merge
- Graph Valid Tree

**Relationship**  
Trees are a special case of graphs (connected acyclic). Many matrix problems are just graphs in disguise.

---

### 10. Trie (Prefix Tree)

**Definition**  
Tree where each node represents a character. Paths from root spell prefixes/words.

**Key Properties**
- Insert / Search / StartsWith: O(m) where m = word length
- Excellent for prefix-based problems

**Common Interview Questions**
- Implement Trie
- Word Search II
- Design Add and Search Words Data Structure
- Replace Words
- Longest Common Prefix (can also be solved simpler ways)
- Maximum XOR of Two Numbers

**Relationship**  
Specialized tree. Extremely powerful when combined with backtracking (Word Search II).

---

### 11. Union-Find (Disjoint Set Union)

**Definition**  
Data structure that tracks a collection of disjoint sets and supports two operations efficiently: Find and Union.

**Key Optimizations**
- Path compression
- Union by rank/size

**Common Interview Questions**
- Number of Provinces
- Redundant Connection
- Accounts Merge
- Graph Valid Tree
- Earliest Moment When Everyone Become Friends
- Number of Islands II (online version)

**Relationship**  
The go-to structure for dynamic connectivity problems. Often replaces DFS/BFS when the graph is built incrementally.

---

### Quick Decision Guide – Which Structure to Use?

| Need                             | Reach for            |
| -------------------------------- | -------------------- |
| Fast lookup by key               | Hash Map / Set       |
| Frequency counting               | Hash Map             |
| LIFO order                       | Stack                |
| FIFO / BFS                       | Queue                |
| Current min or max               | Heap                 |
| Prefix / autocomplete            | Trie                 |
| Dynamic connectivity             | Union-Find           |
| Hierarchical data / recursion    | Tree                 |
| Relationships / paths            | Graph                |
| Ordered sequence + random access | Array                |
| Ordered sequence + fast ends     | Linked List or Deque |

---

### Complexity Cheat Sheet (Most Important)

| Structure      | Access   | Search   | Insertion | Deletion |
| -------------- | -------- | -------- | --------- | -------- |
| Array          | O(1)     | O(n)     | O(n)      | O(n)     |
| Linked List    | O(n)     | O(n)     | O(1)*     | O(1)*    |
| Stack / Queue  | O(n)     | O(n)     | O(1)      | O(1)     |
| Hash Map / Set | —        | O(1)     | O(1)      | O(1)     |
| Binary Tree    | O(n)     | O(n)     | O(n)      | O(n)     |
| BST (balanced) | O(log n) | O(log n) | O(log n)  | O(log n) |
| Heap           | O(1)**   | O(n)     | O(log n)  | O(log n) |
| Trie           | —        | O(m)     | O(m)      | O(m)     |

\* at known position  
\*\* find-min / find-max

---

### How These Structures Map to the 18 Patterns

- Two Pointers / Sliding Window → Arrays & Strings
- Fast & Slow Pointers → Linked Lists
- Stack / Monotonic Stack → Stack
- BFS → Queue + Graph / Matrix
- DFS / Backtracking → Tree / Graph / recursion
- Heap → Priority Queue
- Union-Find → Disjoint Set
- Trie → Trie
- Prefix Sum + Hash Map → Array + Hash Map
- Topological Sort → Graph

Master these structures and the 18 patterns on top of them, and you cover the large majority of coding interview questions asked at top companies.

**Complete Interview Guide: Data, Types of Data, Trees, Graphs & Other Data Concerns**

This is the practical reference for the data-related questions that actually appear in coding and system-design interviews.

---

### 1. Types of Data (What Interviewers Expect You to Know)

| Category            | Examples                                                  | Key Interview Points                                 | Common Questions                       |
| ------------------- | --------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| **Primitive**       | number, string, boolean, null, undefined, symbol, bigint  | Immutability of strings, type coercion, NaN behavior | Type coercion puzzles, `typeof` quirks |
| **Reference**       | Object, Array, Function, Date, Map, Set, WeakMap, WeakSet | Passed by reference, shallow vs deep copy            | Deep clone, reference vs value         |
| **Linear**          | Array, Linked List, Stack, Queue, Deque                   | Access patterns, insertion/deletion costs            | Implement stack/queue, reverse list    |
| **Hierarchical**    | Tree, Trie, Heap                                          | Parent-child relationships, recursion                | Almost every tree question             |
| **Network / Graph** | Graph (directed/undirected, weighted/unweighted)          | Edges + vertices, cycles, connectivity               | Number of Islands, Course Schedule     |
| **Key-Value**       | Hash Map / Hash Set, Dictionary                           | Average O(1), collisions, load factor                | Two Sum, Group Anagrams, LRU Cache     |
| **Ordered**         | Sorted Array, BST, TreeMap-style                          | Binary search possible                               | Search in rotated array, Validate BST  |
| **Specialized**     | Trie, Union-Find, Segment Tree, Fenwick Tree              | Prefix problems, dynamic connectivity, range queries | Word Search II, Accounts Merge         |

**Key distinctions interviewers love testing**:
- Value vs Reference types
- Mutable vs Immutable
- Ordered vs Unordered
- Dense vs Sparse
- Static vs Dynamic sizing

---

### 2. Trees – Complete Interview Coverage

#### Core Terminology You Must Know
- **Root, Parent, Child, Sibling, Leaf, Ancestor, Descendant**
- **Height** vs **Depth** vs **Level**
- **Binary Tree** vs **Binary Search Tree (BST)**
- **Complete, Full, Perfect, Balanced** trees
- **Traversal orders**: Pre-order, In-order, Post-order, Level-order
- **BST property**: left < node < right (or ≤ depending on problem)

#### Must-Know Tree Interview Questions (by frequency)

**Easy / Foundation**
- Maximum Depth of Binary Tree
- Invert Binary Tree
- Same Tree / Symmetric Tree
- Path Sum
- Balanced Binary Tree
- Minimum Depth

**Medium (most common)**
- Binary Tree Level Order Traversal
- Binary Tree Zigzag Level Order Traversal
- Construct Binary Tree from Preorder and Inorder Traversal
- Validate Binary Search Tree
- Lowest Common Ancestor of a Binary Tree / BST
- Kth Smallest Element in a BST
- Binary Tree Right Side View
- Count Complete Tree Nodes
- Flatten Binary Tree to Linked List
- Diameter of Binary Tree
- Maximum Path Sum

**Hard / High-signal**
- Serialize and Deserialize Binary Tree
- Binary Tree Maximum Path Sum
- Recover Binary Search Tree
- Vertical Order Traversal
- Number of Ways to Paint N × 3 Grid (sometimes tree DP)

#### Key Patterns for Trees
1. **Pure Recursion** – return values up the call stack
2. **Recursion + Shared State** – mutate an external variable (diameter, max path sum)
3. **BFS (Level Order)** – use a queue
4. **DFS with path tracking** – backtracking style
5. **In-order traversal of BST** = sorted order

#### Classic Follow-ups Interviewers Ask
- “What if the tree is skewed?”
- “Can you do it iteratively?”
- “What’s the time and space complexity?”
- “How would you handle a very deep tree?” (stack overflow risk)

---

### 3. Graphs – Complete Interview Coverage

#### Core Terminology
- **Vertex (Node)** and **Edge**
- **Directed** vs **Undirected**
- **Weighted** vs **Unweighted**
- **Cyclic** vs **Acyclic** (DAG)
- **Connected** vs **Disconnected**
- **Degree**, **In-degree**, **Out-degree**
- **Adjacency List** vs **Adjacency Matrix**
- **Path**, **Cycle**, **Connected Component**

#### Graph Representations (you must be able to write both)
```js
// Adjacency List (preferred in interviews)
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
};

// Adjacency Matrix
const matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0]
];
```

#### Must-Know Graph Interview Questions

**BFS / Shortest Path**
- Number of Islands
- Rotting Oranges
- Walls and Gates
- Word Ladder
- Shortest Path in Binary Matrix
- 01 Matrix

**DFS / Connectivity**
- Number of Provinces / Connected Components
- Clone Graph
- Pacific Atlantic Water Flow
- Surrounded Regions
- Course Schedule (cycle detection)

**Topological Sort**
- Course Schedule I & II
- Alien Dictionary
- Sequence Reconstruction

**Union-Find**
- Redundant Connection
- Accounts Merge
- Graph Valid Tree
- Number of Islands II (online)

**Other High-Frequency**
- Critical Connections (Tarjan / Bridges)
- Network Delay Time (Dijkstra)
- Cheapest Flights Within K Stops
- Evaluate Division (weighted graph)

#### Key Graph Patterns
| Problem Type                | Go-To Approach                 |
| --------------------------- | ------------------------------ |
| Shortest path (unweighted)  | BFS                            |
| Connectivity / Islands      | DFS or BFS or Union-Find       |
| Cycle detection             | DFS with colors or Union-Find  |
| Ordering with prerequisites | Topological Sort (Kahn or DFS) |
| Dynamic connectivity        | Union-Find                     |
| Shortest path (weighted)    | Dijkstra / Bellman-Ford        |

---

### 4. Other Important Data Concerns in Interviews

#### A. Data Modeling & Schema Design (System Design + Behavioral)
- Normalization vs Denormalization
- Primary keys, Foreign keys, Indexes
- When to use SQL vs NoSQL
- CAP Theorem (Consistency, Availability, Partition tolerance)
- ACID vs BASE
- Eventual consistency

**Common questions**:
- “How would you model a social graph?”
- “Design the data model for Instagram / Uber / Twitter”
- “When would you denormalize?”

#### B. Data Integrity & Consistency
- Transactions
- Isolation levels
- Optimistic vs Pessimistic locking
- Idempotency
- Exactly-once vs At-least-once delivery

#### C. Large-Scale Data Concerns
- Sharding / Partitioning strategies (by userId, by time, by hash)
- Replication (leader-follower, multi-leader)
- Caching strategies (Cache-aside, Write-through, Write-back)
- Indexing (B-trees, LSM trees, inverted indexes)
- Data skew and hot partitions

#### D. Time & Versioned Data
- How to store historical data / slowly changing dimensions
- Event sourcing
- CQRS
- Handling late-arriving data

#### E. Data Quality & Validation
- Schema validation
- Null handling
- Deduplication strategies
- Outlier detection

---

### 5. High-Value Combined Questions (Trees + Graphs + Data)

These are the questions that separate average from strong candidates:

1. **Serialize / Deserialize Binary Tree** → tests tree understanding + encoding
2. **Clone Graph** → deep copy of a graph with cycles
3. **Accounts Merge** → Union-Find + Hash Map + sorting
4. **Word Search II** → Trie + DFS/Backtracking on a board (graph)
5. **Design a File System** or **Design a Unix File Search** → trees + metadata
6. **Lowest Common Ancestor** in both Binary Tree and BST
7. **Number of Islands** and its online version (Union-Find)
8. **Course Schedule** → cycle detection in directed graph
9. **Design LRU Cache** → Hash Map + Doubly Linked List
10. **Design a Rate Limiter** or **Hit Counter** → data structure choice + time windows

---

### 6. Quick Decision Framework for Data Structure Questions

When you see a problem, ask:

1. **Do I need fast lookups by key?** → Hash Map
2. **Do I need hierarchical / parent-child relationships?** → Tree
3. **Do I need relationships between many entities + paths/cycles?** → Graph
4. **Do I need the current minimum or maximum repeatedly?** → Heap
5. **Do I need prefix matching?** → Trie
6. **Is the data dynamic and do I care about connectivity?** → Union-Find
7. **Is order important and do I need sorted access?** → BST or sorted array
8. **Is it a sequence with two ends?** → Deque or two pointers on array

---

### 7. How to Answer Data Structure Questions in Interviews

**Strong answer structure**:
1. Clarify the data operations needed (insert, delete, lookup, range, etc.)
2. State the constraints (size, frequency of operations, memory)
3. Propose the structure and justify why
4. Explain time/space complexity
5. Discuss trade-offs and alternatives
6. Handle edge cases (empty, single element, cycles, duplicates, nulls)

**Example opening line**:
> “Because we need fast lookups by userId and also need to maintain the order of the most recently used items, I’ll combine a Hash Map with a Doubly Linked List…”

---

Would you like me to expand any section further with:
- Full JavaScript solutions for the highest-frequency tree/graph questions?
- System-design data modeling examples?
- A focused set of “trap” questions interviewers use on trees and graphs?

Just say which part you want next.