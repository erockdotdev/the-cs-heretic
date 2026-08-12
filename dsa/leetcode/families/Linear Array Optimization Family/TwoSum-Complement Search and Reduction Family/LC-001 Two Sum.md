# 1. Two Sum – Easy**

*Prompt*
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.
You may assume that each input would have **exactly one solution**, and you may not use the same element twice.
You can return the answer in any order.

**Example 1:**
- Input: `nums = [2,7,11,15]`, `target = 9`
- Output: `[0,1]`
- Explanation: `nums[0] + nums[1] == 9`, so we return `[0, 1]`.

**Example 2:**
- Input: `nums = [3,2,4]`, `target = 6`
- Output: `[1,2]`

**Example 3:**
- Input: `nums = [3,3]`, `target = 6`
- Output: `[0,1]`

---

**Constraints:**
- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- Only one valid answer exists.

---

--
## 1. Line-by-line breakdown – Relationships, Contexts, Elements**

**Paraphrase:**

**Original line:**  
`Given an array of integers nums and an integer target`

- **Given** → The data is already provided to you (this is an online judge / interview setting). You do not need to read input yourself.
- **an array of integers `nums`** → There exists a variable named `nums`. Its type is an array of integers.  
  (In TypeScript/JavaScript terms: `const nums: number[]`)
- **and an integer `target`** → There exists a second variable named `target`. Its type is an integer.  
  (In TypeScript/JavaScript terms: `const target: number`)

**Commentary / Issue:**  
The sentence does not explicitly say “there is a variable called `nums`” or “there is a variable called `target`.” It relies on an older competitive-programming convention where the names are introduced inline. This can be slightly confusing for people who are used to more explicit modern documentation.

---

**Original line:**  
`return the indices of the two numbers such that they add up to target`

**Breakdown:**
- **return** → This is the output of the function.
- **the indices** → You must return positions (0-based offsets) inside the `nums` array, **not** the values themselves.
- **of the two numbers** → Exactly two elements are involved.
- **such that they add up to `target`** → The values at those two indices, when added together, equal the value of `target`.

---

## Constraints / Invariants

**Original line:**  
`You may assume that each input would have **exactly one solution**`

**Breakdown:**
- This is a strong guarantee from the problem.
- It eliminates several classes of edge cases:
  - No inputs where **zero** pairs sum to `target`
  - No inputs where **more than one** valid pair exists
  - Effectively rules out the empty-array case (also blocked by the length constraint `2 <= nums.length`)
- As a solver, you do **not** need to write logic that handles “no solution” or “multiple solutions.” You can assume a valid answer always exists.

---

**Original line:**  
`and you may not use the same element twice.`

**Breakdown:**
- Explicitly forbids using the same index twice.
- Even if `nums[i] + nums[i] === target`, that is **not** allowed.
- You must pick two **different** positions in the array.

---

**Original line:**  
`You can return the answer in any order.`

**Breakdown:**
- The pair of indices is unordered for the purposes of the judge.
- `[1, 5]` and `[5, 1]` are both accepted.
- This matches the commutative nature of addition (`a + b === b + a`).
- In practice it means you don’t need extra logic to sort the two indices before returning them.
  
**Original line:** 

Can you come up with an algorithm that is less than O(n²) time complexity?
What this actually means:

**Breakdown:**
The problem is explicitly asking us to do better than the obvious nested-loop solution.
$  O(n^2)  $ is acknowledged as the naïve baseline and is not considered sufficient.


---

## What can we infer from prompt (Core types inferred from the problem)
```ts

// ===== Core types inferred from the problem =====

type Num = number;
type Target = number;
type Index = number;               // 0-based position inside nums


type Nums = Num[];                 // the input array
type Result = [Index, Index];      // exactly two distinct indices

// ===== Function signature =====

interface TwoSum {
  (nums: Nums, target: Target): Result;
}

/** ===== Declarations that satisfy the signature =====

Inferred requirement:

We must produce an algorithm whose time complexity is strictly better than $  O(n^2)  $.
This is why the brute-force double loop, while correct, is only a stepping stone and not the final answer the interviewer wants.

*/

function twoSum(nums: Nums, target: Target): Result {
  // Implementation not derived yet
  // Must return two different indices i, j such that nums[i] + nums[j] === target
  return [0, 1]; // placeholder only
}

const twoSumArrow: TwoSum = (nums, target) => {
  // Same contract
  return [0, 1]; // placeholder only
};

// ## Code Prompt


function twoSum(nums: number[], target: number): number[] {
    
};


```

# What we can currently assert (pure requirements)

1. Inputs
   - nums: array of numbers, length ≥ 2
   - target: a single number

2. Output
   - exactly two indices
   - the indices must be different
   - order of the two indices does not matter

4. Operations (explicit or implicit)
   - add two numbers
   - check if equal to target
   - collect valid indices for return

3. Relationship that must hold
   nums[firstIndex] + nums[secondIndex] === target

4. Guarantees given by the problem
   - exactly one such pair exists
   - we never have to handle “no solution” or “multiple solutions”

5. Performance requirements
   - Time complexity must be better than O(n^2) 
   - The expected solution is $  O(n)  $ time, $  O(n)  $ space

6. Possible edge cases
   - Very large or very small numbers (within ±10⁹)


## 2. Clean restatement (what we now understand)

We are given an array nums and a target value.
We must return the two different indices whose values add up to the target.
Exactly one such pair is guaranteed to exist.
Order of the returned indices does not matter.


## 3. Brute-force approach (must be stated out loud)

Here is the exact spoken script for the brute-force phase, designed to fit seamlessly into the **Minute 5–12** window of your performance framework.

---

### The Spoken Script (Brute-Force Phase)

> *"To start, let’s look at the most straightforward way to solve this. Since we need to find two distinct numbers that add up to our target, the baseline approach is to check every possible pair in the array.*
> *We can use an outer loop to pick the first number at index `i`, and an inner loop to look at every subsequent number at index `j`. If `nums[i] + nums[j]` equals our target, we immediately return those two indices.*
> *Because of the problem constraints—specifically that a valid solution is guaranteed to exist—we don't need to worry about handling empty results.*
> *The time complexity for this nested loop approach is **O(n²)**, and the space complexity is **O(1)** since we aren't allocating any extra data structures.*
> *While this is correct, it’s too slow for larger arrays, so let's optimize this down to **O(n)** time using a complement hash map."*

---

### Why This Script Works

* **Establishes baseline competence:** You show you can immediately write a correct, working solution.
* **Acknowledges constraints:** Explicitly mentioning the problem guarantee shows you read and understood the prompt limits.
* **Natural pivot:** You don't linger on the inefficient solution; you immediately signal that you know it's a stepping stone to the optimal **O(n)** approach.


Using the types we already defined:

TypeScriptCopy
```ts
function twoSum(nums: Nums, target: Target): Result {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  // The problem guarantees a solution exists, so this is unreachable
  return [0, 1]; // placeholder to satisfy the type
}
```
Time: `O(n^2)`
Space: `O(1)` 

This is always correct under the problem guarantees, but too slow for the expected constraints (and fails the follow-up requirement of beating `O(n^2)`.


 
**===== The Pattern Derived Answer =====**

#### 4. Pattern Naming (Minute 7–8)

* **Action:** State the pattern category explicitly using the required trigger format.
* **Script Objective:** *"This is a classic Prefix Sum / Hash Map Lookup problem because we need to find pairs/complements efficiently without a nested loop."*

---
* **Script**
*"While the brute-force approach works, it's too slow with an $O(n^2)$ time complexity. We can optimize this. This is a classic **Prefix Sum / Hash Map Lookup** problem because we need to find pairs or complements efficiently in a single pass without a nested loop."*

**Stating Target Complexities**
"Before we write any code, let's look at the resource trade-offs. The time complexity will be $O(n)$ because we traverse the array at most once, and hash map lookups and insertions take $O(1)$ average time.The space complexity will be $O(n)$ in the worst case, because we store up to $n$ elements and their indices in the hash map if the matching pair isn't found until the end of the array.Now, let's write out the clean implementation."

#### 5. Explain the Optimized Insight & Walkthrough (Minute 8–10)

* **Action:** Walk through the logic using Example 1 (`nums = [2, 7, 11, 15]`, `target = 9`) before touching the keyboard.
* **Script Objective:** Explain the **complement concept**—at each number, compute `target - current`, check if that complement is already in our hash map. If not, store the current number and its index. When we hit 7, its complement (2) is already in the map, so we return immediately.

---

### Explaining the Optimized Insight & Walkthrough

> *"To optimize this to $O(n)$ time, we can use a hash map to keep track of the numbers we've already visited and their corresponding indices. As we iterate through the array, for every current number, we compute its **complement**: `target - current`.*
> *Instead of searching forward with a second loop, we check if that complement already exists in our hash map. If it does, we've found our pair. If it doesn't, we store the current number and its index in the map and move on.*
> *Let's trace this using **Example 1** (`nums = [2, 7, 11, 15]`, `target = 9`):*
> * **At index 0**, the value is `2`. Our complement is `9 - 2 = 7`. Is `7` in our hash map? No. So we store `2` with its index: `map = {2: 0}`.
> * **At index 1**, the value is `7`. Our complement is `9 - 7 = 2`. Is `2` in our hash map? Yes! It’s stored at index `0`.
> * We immediately return the index from the map (`0`) and our current index (`1`), giving us `[0, 1]`.
> 
> 
> *This reduces our work to a single pass through the array, changing our time complexity from quadratic to linear."*


### 6: Executing the Narrated Coding Phase

* **Action:** Write the clean TypeScript implementation while narrating variable initialization and loop logic out loud.
--

### *Complete Code*

> *"Now let's translate this into code. I'm going to initialize a hash map to track the numbers we've seen and their indices, then run a single pass through the array.*
> *As I type:*
>


> ```typescript
> function twoSum(nums: number[], target: number): number[] {
>     // Initialize a hash map to store numbers as keys and their indices as values
>     const map = new Map<number, number>();
> 
>     for (let i = 0; i < nums.length; i++) {
>         const current = nums[i];
>         const complement = target - current;
> 
>         // Check if the complement is already in our map
>         if (map.has(complement)) {
>             return [map.get(complement)!, i];
>         }
> 
>         // Otherwise, store the current number and its index
>         map.set(current, i);
>     }
> 
>     // The problem guarantees a valid solution exists, 
>     // but we add a fallback return for type safety
>     return [];
> }
> 
> ```
> 
> 
 *That gives us our $O(n)$ time and $O(n)$ space solution cleanly and efficiently."*

 ### *Step by Step Code with Script*

 ### Step 4: The Full Spoken Script for the Coding Phase

> *"Now let's write out the implementation. As I write this, I'm going to narrate the setup, the lookup, and the insertion logic.*
> *First, I'm initializing a hash map to keep track of the numbers we've visited and their indices:*
> ```typescript
> const map = new Map<number, number>();
> 
> ```
> 
> 
> *Next, we loop through the array using a standard `for` loop:*
> ```typescript
> for (let i = 0; i < nums.length; i++) {
>     const current = nums[i];
>     const complement = target - current;
> 
> ```
> 
> 
> *At each step, we check if our complement is already inside our hash map:*
> ```typescript
>     if (map.has(complement)) {
>         return [map.get(complement)!, i];
>     }
> 
> ```
> 
> 
> *If it's not there yet, we store the current number and its index so future iterations can check against it:*
> ```typescript
>     map.set(current, i);
> }
> 
> ```
> 
> 
> *And finally, because the problem guarantees that a solution always exists, we won't hit an empty result, but we'll include a clean return fallback to satisfy the compiler:*
> ```typescript
>     return [];
> }
> 
> ```
> 
> 
> *With that, our code is complete and reads linearly in a single pass."*
>
> 
## 7. Verification & Edge Cases (Minute 35–45)

* **Action:** Trace an example, call out edge cases (e.g., negative numbers, large inputs), and re-state final complexities.

---

### Verification & Edge Cases

> *"Now that the code is written, let's walk through our verification phase to make sure it holds up under tracing and edge cases.*


> *First, let's trace **Example 2** (`nums = [3, 2, 4]`, `target = 6`):*
> * *At index `0`, `current = 3`. Complement is `6 - 3 = 3`. Map is empty, so we set `map.set(3, 0)`.*
> * *At index `1`, `current = 2`. Complement is `6 - 2 = 4`. Is `4` in the map? No. We set `map.set(2, 1)`.*
> * *At index `2`, `current = 4`. Complement is `6 - 4 = 2`. Is `2` in the map? Yes! It’s at index `1`. We return `[map.get(2), 2]`, which gives `[1, 2]`. This matches our expected output.*
> 
> 
> *Next, let's evaluate our edge cases:*
> * **Duplicate values / Example 3 (`nums = [3, 3]`, `target = 6`)**: Because we check `map.has(complement)` *before* updating the map with the current element, when we hit the second `3` at index `1`, the first `3` at index `0` is already in the map. It successfully returns `[0, 1]` without overwriting the index prematurely.
> * **Negative numbers**: The subtraction logic (`target - current`) handles negative numbers natively (e.g., `target = -2`, `current = -5` results in `-2 - (-5) = 3`).
> * **Minimum length (`nums.length === 2`)**: The loop handles the shortest valid input array seamlessly without out-of-bounds errors.
> 
> 
> *Finally, to confirm our performance metrics:*
> * **Time Complexity:** **$O(n)$** because we iterate through the array at most once, performing constant-time $O(1)$ lookups and insertions in the hash map.
> * **Space Complexity:** **$O(n)$** in the worst-case scenario where the matching pair is at the very end of the array, requiring us to store all $n$ elements in the map.*
> 
> 
> *And that completes our full execution script for Two Sum."*

## Curveball
Here is how the 4-step curveball protocol applies to a classic twist on **Two Sum**:

### The Scenario

> *Interviewer:* *"That hash map solution is solid ($O(n)$ time, $O(n)$ space). Now, what if I tell you the input array is **already sorted** in non-decreasing order, and I want you to solve this in **$O(1)$ constant space**?"*

---

### Applying the 4-Step Adaptation Protocol

#### Step 1: Acknowledge and Validate

> *"That’s a great twist. If the array is already sorted and we need to drop the hash map to achieve $O(1)$ space, that completely changes how we approach our lookups."*

#### Step 2: Assess What Breaks

> *"Right now, our hash map approach gives us $O(n)$ time and $O(n)$ space. If we can't allocate extra memory for the hash map, we lose our $O(1)$ lookups. If we tried to do a brute-force search without extra space, we'd fall back to an $O(n^2)$ time complexity, which isn't efficient enough."*

#### Step 3: Propose the Pivot

> *"Since the array is already sorted, we can leverage the **Two Pointers** pattern instead of a hash map. We can place a `left` pointer at the very beginning of the array and a `right` pointer at the very end.*
> *Because the array is ordered, we evaluate the sum of the elements at both pointers:*
> * *If the sum equals our target, we've found our pair.*
> * *If the sum is **less** than the target, we need a larger number, so we move our `left` pointer up.*
> * *If the sum is **greater** than the target, we need a smaller number, so we move our `right` pointer down.*
> * *This lets us scan the array inward without needing any extra memory."*
> 
> 

#### Step 4: Recalibrate and Confirm

> *"This shifts our performance profile: our time complexity remains **$O(n)$** because the pointers traverse the array at most once, and our space complexity drops to **$O(1)$ constant space** since we aren't using a hash map. Would you like me to write out the implementation for this two-pointer approach?"*

---

### Why This Crushes the Curveball

1. **You don't panic:** You validate the constraint instead of treating it like a roadblock.
2. **You map the trade-offs:** You explicitly explain *why* the old way breaks (loss of $O(1)$ space) and *why* the new pattern fits the new constraint (exploiting the sorted property).
3. **You pivot smoothly:** You transition directly into another core pattern from your toolkit (Two Pointers) with zero dead air.

That is the exact question an interviewer hopes you will think of—and knowing the answer is what separates an average candidate from a senior one.

For the standard **Two Sum** problem, you cannot use two pointers to begin with because of two critical constraints:

### 1. The Input is Unsorted

The standard Two Sum array (e.g., `[2, 7, 11, 15]` happens to be sorted in Example 1, but generally isn't) comes in completely random order.

### 2. You Must Return Original Indices

The problem asks you to return the **original indices** of the numbers, not the values themselves.

---

### What Happens If You Try Two Pointers on an Unsorted Array?

If you try to force a two-pointer approach on an unsorted array, you hit a trap:

* **Option A: Sort the array in place.**
If you sort it so your pointers work, you completely scramble the original indices. You'll find the right numbers, but their positions will point to the wrong elements in the original array.
* **Option B: Preserve the indices.**
To fix Option A, you have to create a new structure that pairs every value with its original index, and *then* sort that structure.
* **The Cost:** Sorting takes **$O(n \log n)$** time, and you still use **$O(n)$** space to store the index pairs.



### Why the Hash Map Wins for Unsorted Input

The hash map approach achieves true **$O(n)$ linear time** in a single pass because it looks up complements instantly *without* needing the array to be sorted, and it natively preserves the original indices as map values.

Two pointers only become the optimal choice if the array is **already sorted** (like in *Two Sum II*), because the sorting step is skipped entirely, dropping space complexity to $O(1)$ while keeping time at $O(n)$.


Assuming you mean **why *can't* we** use two pointers on an unsorted array for a problem like Two Sum, it comes down to two major breaking points:

### 1. The Loss of Directional Logic (No Monotonicity)

The entire magic of the two-pointer technique (placing one pointer at the start and one at the end and moving them inward) relies on **order**:

* If your sum is *too small*, you move the left pointer up because you are **guaranteed** that numbers further to the right are larger.
* If your sum is *too large*, you move the right pointer down because you are **guaranteed** that numbers further to the left are smaller.

On an **unsorted array**, this guarantee completely vanishes. If `nums[left] + nums[right] < target`, moving the left pointer forward might land you on a number that is actually *smaller* than the one you just left. You lose the ability to logically decide whether to move left or right, turning your search into a guessing game.

### 2. The Index Destruction Trap

What if you try to get around this by sorting the unsorted array first *so* you can use two pointers?

* The moment you sort an array, you rearrange all the elements.
* Because of that rearrangement, your pointers will find the correct *values*, but their indices will point to the wrong positions in the original array.

### Summary

To use two pointers effectively, an array **must be sorted**. If it isn't, sorting it ruins your indices, and trying to use pointers without sorting destroys your directional logic. That is why **hash maps** are the required tool for unsorted arrays like standard Two Sum.


To understand why we switch between tools like Hash Maps and the **Two Pointers family**, we have to look deeper at their underlying mechanics.

Because **Sliding Window** is fundamentally a sub-type of the Two Pointers technique (specifically, *same-directional* pointers rather than *opposite-directional* ones), framing them together reveals a powerful taxonomy for array- and sequence-based coding problems.

---

## Pattern 1: The Hash Map / Complement Lookup Pattern

### 1. Underlying Pattern

* **Taxonomy:** State Tracking & History Compression.
* **Core Mechanism:** Trading space for time. Instead of looking *forward* with nested loops ($O(n^2)$), you look *backward* at a recorded history of what you have already seen in $O(1)$ time.

### 2. Core Invariants (What must always hold true)

* **Historical Completeness:** At any current index $i$, the hash map contains *every* valid element (and its metadata, like an index or frequency) from index $0$ up to $i-1$.
* **Complement Uniqueness:** The relationship $target - current$ uniquely defines the exact value needed to satisfy the target condition. If that value exists in the map, a valid pair is mathematically proven to exist.

### 3. Primary Use Cases

* **Unsorted Data Pairings:** Finding pairs, sums, or differences when the input array is completely out of order (e.g., *Two Sum*, *Subarray Sum Equals K*).
* **Existence & Frequency Checks:** Determining if an item has appeared before, counting frequencies, or tracking first/last occurrences (e.g., *First Unique Character*, *Contains Duplicate*).
* **Index Preservation Required:** When the problem demands that you return the *original indices* of elements rather than just their boolean existence or sorted positions.

---

## Pattern 2: The Two Pointers Pattern Family

The Two Pointers technique is a broad category defined by using two index markers to traverse a sequence. Depending on how those pointers move, it branches into two major sub-types: **Opposite-Directional (Converging)** and **Same-Directional (Sliding Window)**.

### Sub-type A: Opposite-Directional / Converging Pointers

* **Underlying Pattern:** Monotonic Space Reduction.
* **Core Mechanism:** Placing pointers at opposite ends of a sequence (`left` at start, `right` at end) and moving them inward based on a conditional evaluation to systematically shrink the search space.
* **Core Invariants:**
* **Monotonicity (Order Invariant):** The data **must be sorted**. Moving a pointer right increases the value; moving it left decreases it.
* **Safe Elimination:** When a comparison fails, the invariant guarantees that everything outside the required pointer direction can be safely eliminated forever in $O(1)$ steps.


* **Primary Use Cases:** Sorted array pairings, triplets, or container boundaries (e.g., *Two Sum II*, *3Sum*, *Container With Most Water*).

### Sub-type B: Same-Directional / Sliding Window

* **Underlying Pattern:** Contiguous Range Expansion & Contraction.
* **Core Mechanism:** Using a `left` and `right` pointer moving in the *same* direction to dynamically maintain a valid sub-range (window) over a sequence. The `right` pointer expands the window to explore new data, while the `left` pointer contracts the window the moment a constraint is violated.
* **Core Invariants:**
* **Contiguity:** The elements inside the window from `left` to `right` must form a contiguous subsegment (subarray or substring).
* **Window Validity:** The state tracked within the window (often paired with a frequency map or set) accurately reflects the constraints of the active subsegment at all times.


* **Primary Use Cases:** Finding maximum/minimum lengths, subarrays, or substrings meeting a criteria (e.g., *Longest Substring Without Repeating Characters*, *Minimum Size Subarray Sum*, *Permutation in String*).

---

### Summary of When to Choose Which

* Use **Hash Maps** when data is **unsorted** and you need **instant random lookups** for individual elements or complements.
* Use **Opposite-Directional Pointers** when data is **sorted** and you need to find **pairs or boundaries** in $O(1)$ space.
* Use **Same-Directional Pointers (Sliding Window)** when dealing with **contiguous subarrays/substrings** where the goal is to dynamically resize a range based on a rolling condition.