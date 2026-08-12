According to the **Act 1 Performance Script** and the timeline we mapped out, here are the exact next steps we need to execute before writing the final code:

---

### Template Coverage Audit

# Step-by-Step Outline for the Optimal Approach

* **1. Line-by-line breakdown & Relationships, Contexts, Elements**
* **2. Clean Restatement**
* **3. Brute-force approach & Baseline Script**
* **4. Pattern Naming**:
* **5. Optimized Insight & Walkthrough including Target Complexities Pre-Declaration**
* **6. Narrated Coding Phase**
* **7. Verification & Edge Cases**

---

## 1. Line-by-line breakdown 
Line by line break down of prompt - identify contexts, relationships, elements

What we can currently assert (pure requirements)
Identify the implied data types, operations, constraints, etc.

Example
```
// 1. Inputs
//    - nums: array of numbers, length ≥ 2
//    - target: a single number

// 2. Output
//    - exactly two indices
//    - the indices must be different
//    - order of the two indices does not matter

// 4. Operations (explicit or implicit)
//    - add two numbers
//    - check if equal to target
//    - collect valid indices for return

// 3. Relationship that must hold
//    nums[firstIndex] + nums[secondIndex] === target

// 4. Guarantees given by the problem
//    - exactly one such pair exists
//    - we never have to handle “no solution” or “multiple solutions”

// 5. Performance requirements
//    - Time complexity must be better than O(n^2) 
//    - The expected solution is $  O(n)  $ time, $  O(n)  $ space

// 6. Possible edge cases
//    - Very large or very small numbers (within ±10⁹)

```
## 2. Clean restatement (what we now understand)
Lorem ipsum

## 3. Brute-force approach (must be stated out loud)
The exact spoken script for the brute-force phase, designed to fit seamlessly into the **Minute 5–12** window of your performance framework.

===== The Pattern Derived Answer =====
## 4. Name the Pattern Out Loud (Minute 7–8)

* **Action:** State the pattern category explicitly using the required trigger format.
* **Script Objective:** *"This is a classic Prefix Sum / Hash Map Lookup problem because we need to find pairs/complements efficiently without a nested loop."*


## 5. Explain the Optimized Insight & Walkthrough (Minute 8–10)

* **Action:** Walk through the logic using Example 1
* **Script Objective:** Explain the **complement concept**—at each number.

*State Target Complexities (Minute 10–12)*

* **Action:** Explicitly define performance before coding.
* **Script Objective:** Example: Time complexity is **$O(n)$** because we traverse the array once with $O(1)$ map lookups. Space complexity is **$O(n)$** to store up to $n$ elements in the map.

## 6. Execute the Narrated Coding Phase (Minute 12–35)

* **Action:** Write the clean TypeScript implementation while narrating variable initialization and loop logic out loud.
  

## 7. Verification & Edge Cases (Minute 35–45)

* **Action:** Trace an example, call out edge cases (e.g., negative numbers, large inputs), and re-state final complexities.

---

### Verification & Edge Cases

> *"Now that the code is written, let's walk through our verification phase to make sure it holds up under tracing and edge cases.*

Example:
> *First, let's trace **Example 2** (`nums = [3, 2, 4]`, `target = 6`):*
> * *At index `0`, `current = 3`. Complement is `6 - 3 = 3`. Map is empty, so we set `map.set(3, 0)`.*
> * *At index `1`, `current = 2`. Complement is `6 - 2 = 4`. Is `4` in the map? No. We set `map.set(2, 1)`.*
> * *At index `2`, `current = 4`. Complement is `6 - 4 = 2`. Is `2` in the map? Yes! It’s at index `1`. We return `[map.get(2), 2]`, which gives `[1, 2]`. This matches our expected output.*
> 
> Examples:
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
>
> Here is the generalized outline for handling interviewer curveballs and mid-problem constraint changes. This acts as an "insurance policy" section at the end of your universal template to handle the adaptive probing interviewers use when they suspect you've memorized a solution.

---

## 8. Handling Curveballs & Constraint Changes (The Adaptation Protocol)

When an interviewer introduces a constraint change mid-round (e.g., *"What if the array isn't sorted anymore?"*, *"What if we need $O(1)$ space instead of $O(n)$?"*, or *"What if the input is a stream of data?"*), do not panic or argue. Run this 4-step adaptation sequence out loud:

### Step 1: Acknowledge and Validate (The Posture)

* **Objective:** Treat the change as a collaborative puzzle evolution, not a trick or an attack.
* **Script Template:**
> *"That’s a great twist / interesting constraint. Let's see how that shifts our trade-offs."*



### Step 2: Assess What Breaks (The Impact Analysis)

* **Objective:** Explicitly state why your current solution fails or becomes suboptimal under the new rule.
* **Script Template:**
> *"Right now, our $O(n)$ solution relies on [current assumption, e.g., the array being sorted / having extra memory for a hash map]. If we drop that guarantee, our current approach breaks because [reason, e.g., we can no longer guarantee the pointer direction / we exceed the memory limit]."*



### Step 3: Propose the Pivot (The Pattern/Logic Shift)

* **Objective:** Pivot to a new pattern or modify your data structures to satisfy the new constraint.
* **Script Template:**
> *"To adapt to this, we can either [Option A: apply a pre-processing step like sorting, adjusting time to $O(n \log n)$] or [Option B: switch to a different approach, like using a sliding window / two pointers / a different data structure]."*



### Step 4: Recalibrate and Confirm (The Final Alignment)

* **Objective:** State the new time and space complexities and get the interviewer's buy-in before writing code.
* **Script Template:**
> *"That would change our time complexity to [X] and our space complexity to [Y]. Would you like me to walk through how we implement that adjustment?"*



---

### Why This Works

Interviewers throw curveballs to test your **meta-fluency**—whether you actually understand the underlying mechanics of the problem or if you just memorized a static block of code. By narrating the impact and systematically adjusting your approach, you demonstrate senior-level engineering judgment.

---

Would you like to see how this adaptation script applies to an example curveball for **Two Sum** (such as *"What if the array is already sorted, and we want $O(1)$ space?"* or *"What if there are multiple pairs?"*)?