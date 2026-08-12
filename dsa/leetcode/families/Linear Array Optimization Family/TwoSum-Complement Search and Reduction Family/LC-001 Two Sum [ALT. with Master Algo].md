```markdown
# Two Sum (Easy) – Complete Derivation via the Lattice

**Prompt**  
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.  
You may assume that each input has **exactly one solution**, and you may not use the same element twice.  
You can return the answer in any order.

**Examples**
- `nums = [2,7,11,15]`, `target = 9` → `[0,1]`
- `nums = [3,2,4]`, `target = 6` → `[1,2]`
- `nums = [3,3]`, `target = 6` → `[0,1]`

**Constraints**
- `2 ≤ nums.length ≤ 10⁴`
- `-10⁹ ≤ nums[i], target ≤ 10⁹`
- Exactly one valid answer exists.

---

## 1. Master Exploit (Narrative Strip)

- Nouns: numbers sitting in a linear array → **path graph**.
- Verb: “add up to target” → find a pair whose values sum to a constant.
- Required output: **original indices** (Integrity currency is live).
- Forbidden: same index twice, \(O(n^2)\) time.

**Exposed lattice**
```
S  = positions / (value → index) pairs on a path
T  = examine the next element
Φ  = “have I already seen target − x?”
C  = Time must be better than O(n²), Integrity required, Space allowed
```

---

## 2. Forced Family & Mechanism

| Parameter   | Value                     | Consequence                 |
| ----------- | ------------------------- | --------------------------- |
| Geometry    | Path                      | **Family 1 – Linear**       |
| Algebra (Φ) | Complement lookup         | Need history of seen values |
| Integrity   | Required (return indices) | Cannot sort                 |
| Time        | Must beat \(O(n^2)\)      | Must compress history       |

**Forced mechanism**: **Ledger** (Hash Map)  
We pay the **Space Tax** (\(O(n)\) map) to keep Integrity and obtain linear time.

(If the interviewer later destroys Integrity or supplies a sorted array, the failover is **Vise** – two pointers.)

---

## 3. Core Types (inferred)

```ts
type Num     = number;
type Target  = number;
type Index   = number;               // 0-based
type Nums    = Num[];
type Result  = [Index, Index];       // two distinct indices

interface TwoSum {
  (nums: Nums, target: Target): Result;
}
```

**Invariants that must hold**
- `nums[i] + nums[j] === target`
- `i ≠ j`
- Exactly one such pair exists (problem guarantee)
- Original indices must be returned

---

## 4. Brute-Force Baseline (spoken script – Minute 5–12)

> “The most straightforward way is to check every pair.  
> Outer loop picks index `i`, inner loop looks at every later index `j`.  
> If `nums[i] + nums[j] === target` we return `[i, j]`.  
> Because the problem guarantees a solution, we never need a ‘not found’ case.  
> Time is \(O(n^2)\), space \(O(1)\). Correct, but too slow under the constraints.  
> Let’s optimize to linear time.”

```ts
function twoSumBrute(nums: Nums, target: Target): Result {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  // unreachable under problem guarantees
  return [0, 1];
}
```

---

## 5. Optimized Insight (Family 1 Ledger)

Instead of looking **forward** with a second loop, we look **backward** at everything we have already seen.

At each index `i` we ask:

> “Have I already seen the complement `target − nums[i]`?”

If yes → return the stored index and the current index.  
If no → record the current value and its index in the ledger, then continue.

This is exactly the universal meta-algorithm with:
- **Frontier** = the single for-loop (sequential scan of the path)
- **Invariant / Φ** = “complement already present in ledger?”
- **Ledger** = `Map<value, index>`

---

## 6. Walk-through (Example 1)

`nums = [2, 7, 11, 15]`, `target = 9`

| i   | current | complement | ledger after step | action                  |
| --- | ------- | ---------- | ----------------- | ----------------------- |
| 0   | 2       | 7          | `{2 → 0}`         | not found → record      |
| 1   | 7       | 2          | `{2 → 0}`         | found → return `[0, 1]` |

Done after one pass.

---

## 7. Clean Implementation

```ts
function twoSum(nums: number[], target: number): number[] {
  const ledger = new Map<number, number>(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (ledger.has(need)) {
      return [ledger.get(need)!, i];
    }

    ledger.set(nums[i], i);                 // record into ledger
  }

  // unreachable – problem guarantees a solution
  return [];
}
```

**Complexities**
- Time: \(O(n)\) – single pass, \(O(1)\) average map operations
- Space: \(O(n)\) – worst-case the matching pair is at the end

---

## 8. Verification & Edge Cases

**Example 2** – `[3, 2, 4]`, target `6`
- i=0, 3 → need 3 → miss → ledger `{3→0}`
- i=1, 2 → need 4 → miss → ledger `{3→0, 2→1}`
- i=2, 4 → need 2 → hit → return `[1, 2]`

**Example 3** – `[3, 3]`, target `6`
- Because we check **before** inserting, the second 3 finds the first 3 already in the ledger → `[0, 1]`. Correct; we never use the same index twice.

**Negatives** – subtraction works natively (`target - (−5)`).  
**Minimum length** – two elements are handled by the same loop.  
**Large values** – within the given ±10⁹ range, no overflow issues in modern languages.

---

## 9. Curveball – Sorted Array + \(O(1)\) Space

**Interviewer**: “The array is already sorted. Solve it in \(O(1)\) extra space.”

### Lattice reaction
- Integrity is no longer required in the same way (or the array is given sorted).
- Space currency is now “\(O(1)\)” → the Ledger (hash map) becomes illegal.
- Order currency is now “present” → monotonicity is available.

**Forced failover** (Family 1 failure chain):  
Ledger → **Vise** (two pointers on sorted data).

```ts
function twoSumSorted(nums: number[], target: number): number[] {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const sum = nums[lo] + nums[hi];
    if (sum === target) return [lo, hi];
    if (sum < target) lo++;
    else hi--;
  }
  return [];
}
```

- Time still \(O(n)\), space drops to \(O(1)\).
- Works **only** because the array is sorted (monotonicity supplies the Φ that lets us move the pointers safely).

---

## 10. Why Two Pointers Cannot Be Used on the Original Problem

1. **No monotonicity** – on an unsorted array the directional logic (“sum too small → move left”) disappears.
2. **Integrity destruction** – sorting to create monotonicity scrambles the original indices we are required to return. Restoring them costs an extra \(O(n)\) structure and \(O(n\log n)\) time, which is strictly worse than the Ledger solution.

Hence the currencies force the Ledger for the classic statement and the Vise only after the interviewer changes the currencies.

---

## Summary – What the Meta Actually Did

| Step               | Meta action                       | Concrete result              |
| ------------------ | --------------------------------- | ---------------------------- |
| Master Exploit     | Strip story → path + pair-sum     | Geometry = path              |
| Lattice parameters | S, T, Φ, C                        | Family 1, Integrity required |
| Force mechanism    | History needed + indices required | Ledger (hash map)            |
| Currency change    | Sorted + O(1) space               | Failover to Vise             |
| Universal loop     | frontier + Φ check + ledger       | The single for-loop + Map    |

The code is ordinary; the reasoning that produces it is now mechanical and reusable.
```