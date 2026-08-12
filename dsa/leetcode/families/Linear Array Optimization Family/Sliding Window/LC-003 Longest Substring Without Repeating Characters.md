# Prefix Sum + Hash Map Family

# 3. Longest Substring Without Repeating Characters- Medium



*Prompt*
Given a string s, find the length of the longest substring without duplicate characters.

**Example 1:**

Input: `s = "abcabcbb"`
Output: `3`
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.


**Example 2:**

Input: `s = "bbbbb"`
Output: `1`
Explanation: The answer is "b", with the length of 1.

**Example 3:**
Input: `s = "pwwkew"`
Output:`3`

Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

**Constraints:**
- `0 <= s.length <= 105`
- `s consists of English letters, digits, symbols and spaces`

## 1. Line-by-line breakdown – Relationships, Contexts, Elements**

**Paraphrase:**
**Original line:**  
`Given a string s`

- **Given** the data is already provided to you. You don't need to read input yourself
- **a string `s`**  There exist a variable named `s`. Its type is string (In Typescript/JavaScript terms: `const s:string`)

**Original Line**
`find the length of the longest substring without duplicate characters.`

**Breakdown**
- **find** return, This is the output of the function
- **the length** a number representing the number of characters
- **the longest substring** partial collection of contiguous characters within `const s:string`        `let longestSubstringLength: number`
- **without duplicate characters**: a valid substring only contains unique characters.


## Constraints / Invariants

**Original line:**  
`0 <= s.length <= 10^5`

**Breakdown**
- the length of the string is minimum 0 and maximum 100,000 characters

**Original line:**  
`s consists of English letters, digits, symbols and spaces`

**Breakdown**
- the string only had english characters, this eliminates edge cases of alternates that appear the same but are from different alphabets
- digits - we have to clarify if these are whole numbers or if mathematical annotated integers are included
- spaces - make sure spaces are not treated as null

**Edge Cases**

**Which substring of many?**
We could encounter many valid substrings of unique characters, we don't want all, first, last, shortest. Do we want `each` if there are multiples of the same length? or first longest? According to **Example 1:** its `any` of the longest.

**What if all characters the same**
If all characters are the same, longest substring is 1, according to **Example 2:**

**Can we skip characters**
No, example 3 shows characters must be contiguous 

**What if the Array is empty**
`0 <= s.length <= 10^5 or 100,000` 
- show the array can be empty if length is 0

**What if the Array is completely full**
`0 <= s.length <= 10^5 or 100,000` 
* **Runtime Budget:** 
- **The Speed Limit** Modern interpreters/compilers can execute roughly a max of 10^8 or 100 million simple arithmetic or memory operations a standard CPU per second. before hitting typical online judge timeout limits. 
- A linear time solution at max of $10^5$ operations or 100,000 operations, which executes in a fraction of a millisecond. well within the limit. 
- However,an array *Brute Force/nested loop* solution O(n^2) on an array at the max limit N=10^5, would be $(10^5)^2 or 100,000 x 100,000 = 10^10 or 10 billion operations. Hypothetically, this would take roughly 100 seconds to execute but would immediately triggering a **Time Limit Exceeded (TLE)** error by exceeding the speed limit.


## What can we infer from prompt (Core types inferred from the problem)


```ts

// ===== Core types inferred from the problem =====
const s:string // "SOMESTRINGOFEnglishlettersasdgfagaGSGDS,digits124315r12,symbols_!@#@#$# and       spaces"
type String: string

// Inferred requirement: well have to process the string as an array

type Substring: String[]

type Length: number

const LongestUniqueSubstringLength: Length

type Result = LongestUniqueSubstringLength

interface LongestSubString{
    (s:String):Result
}

function LongestSubstring(s:String):Result{
    return 7// placeholder
}



```

# What we can currently assert (pure requirements)

1. Inputs
   - s: starting string
2. Output
   - number representing length of longest substring
3. Relationships that must hold
    - Valid substring contains only unique characters (no duplicates)
4. Guarantees given by the problem
    - only english letters, symbols, spaces, digits and max 105 characters
5. Performance requirements
    - inferred: an O(n^2) brute force/nested loop solution will timeout CPU
6. Edge cases
   - empty array
   - Max size array
   - Impact of large collection of characters and memory impact

## 2. Clean restatement (what we now understand)

We are given an string that can have `0 <= s.length <= 10^5 or 100,000` characters and english letters, digits, symbols and spaces.

We must find the longest contiguous sequence of unique characters characters and return its length. (without timing out CPU)

Here is the adapted **Step 3 (Brute-Force Approach & Spoken Script)** tailored specifically for **Longest Substring Without Repeating Characters**, matching the exact format and structure of your framework:

---

## 3. Brute-force approach (must be stated out loud)

Here is the exact spoken script for the brute-force phase, designed to fit seamlessly into the **Minute 5–12** window of your performance framework.

---

### The Spoken Script (Brute-Force Phase)

> *"To start, let’s look at the most straightforward way to solve this. Since we need to find the length of the longest substring without repeating characters, the baseline approach is to check every possible substring in the string.*
> *We can use an outer loop to set the starting index `i`, and an inner loop to set the ending index `j`. For every substring from `i` to `j`, we check if it contains any duplicate characters, and we keep a running track of the maximum valid length.*
> *Because of the problem constraints—specifically that the string length $N$ can reach $10^5$—this brute-force approach will instantly fail.*
> *The time complexity for this nested approach would be **O(n³)** (or **O(n²)** if we optimize the uniqueness check), and the space complexity would be **O(min(n, \Sigma))** to track characters.*
> *While this is conceptually correct, it’s far too slow for $N = 10^5$ and will trigger a Time Limit Exceeded error. So let's optimize this down to **O(n)** time using a Same-Directional Sliding Window approach."*


## The Brute-Force Solution (For Reference)

While we explicitly dismiss this approach in the interview due to the $N = 10^5$ constraint, writing out the code helps crystallize why the $O(n^2)$ nested loop is inefficient.

This implementation uses an outer loop to set the starting point (`i`) and an inner loop to expand the ending point (`j`) while tracking unique characters in a `Set`.

### TypeScript Implementation

```typescript
function lengthOfLongestSubstringBruteForce(s: string): number {
    let maxLength = 0;
    const n = s.length;

    // Outer loop: choose the starting index of the substring
    for (let i = 0; i < n; i++) {
        const seen = new Set<string>();
        
        // Inner loop: expand the ending index of the substring
        for (let j = i; j < n; j++) {
            const currentChar = s[j];
            
            // If we find a duplicate, this substring is invalid; break early
            if (seen.has(currentChar)) {
                break;
            }
            
            seen.add(currentChar);
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }

    return maxLength;
}

```

### Why This Fails the Constraint ($N = 10^5$)

* **Time Complexity:** $O(n^2)$ in the worst-case scenario where there are few or no repeating characters (e.g., all unique characters). For $N = 10^5$, this results in $10^{10}$ operations, taking roughly 100 seconds and triggering a **Time Limit Exceeded (TLE)** error.
* **Space Complexity:** $O(\min(n, \Sigma))$ to store the unique characters inside the hash set for the current substring window.

## 4. Pattern Naming & Target Complexities (Minute 7–8)

* **Action:** State the pattern category explicitly using the required trigger format.
* **Script Objective:** *"This is a classic Same-Directional Sliding Window problem because we need to find the longest contiguous substring satisfying a unique-character condition by dynamically expanding and contracting our window boundaries in a single pass."*

---

### The Spoken Script (Pattern & Complexities Phase)

> *"While the brute-force approach works conceptually, it will fail the constraints. With $N$ reaching up to $10^5$, an $O(n^2)$ nested loop would require $10^{10}$ operations—taking roughly 100 seconds and immediately triggering a Time Limit Exceeded error against our $10^8$ operations-per-second hardware limit.*
> *To fix this, this is a classic **Same-Directional Sliding Window** problem because we need to track a contiguous sequence and dynamically adjust our window boundaries in a single pass as soon as we hit a duplicate character.*
> *Before we write any code, let's look at the resource trade-offs. The time complexity will be **$O(n)$** because both the left and right pointers traverse the string at most once, performing constant-time lookups and updates.*
> *The space complexity will be **$O(\min(n, \Sigma))$**, which is bounded by the character set size ($\Sigma$) or string length ($n$) in the worst case, as we store unique characters currently inside our active sliding window.*
> *Now, let's write out the clean implementation."*

#### 5. Explain the Optimized Insight & Walkthrough (Minute 8–10)

* **Action:** Walk through the logic using Example 1 (`s = "abcabcbb"`) before touching the keyboard.
* **Script Objective:** Explain the **same-directional sliding window concept**—use a `right` pointer to expand our window and a `set` to track unique characters. If we hit a duplicate, contract the `left` pointer until the duplicate is removed, maintaining a valid unique window while updating our maximum length.

---

### Explaining the Optimized Insight & Walkthrough

> *"To optimize this to $O(n)$ time, we can use a **Same-Directional Sliding Window** approach managed by two pointers, `left` and `right`, along with a hash set to track the characters currently inside our active window.*
> *Instead of checking every possible substring from scratch, we expand our `right` pointer character by character. As long as the character at `right` is not in our set, we add it, and update our maximum length.*
> *The moment we encounter a character that is already in our set, we've found a duplicate. To fix this, we contract our `left` pointer, removing characters from the set one by one until the duplicate is cleared out. This ensures our window always contains strictly unique characters.*
> *Let's trace this using **Example 1** (`s = "abcabcbb"`):*
> * **`right = 0` (`'a'`)**: Not in set. Add `'a'`. Window is `"a"`, length is `1`. Max length = `1`. `seen = {'a'}`.
> * **`right = 1` (`'b'`)**: Not in set. Add `'b'`. Window is `"ab"`, length is `2`. Max length = `2`. `seen = {'a', 'b'}`.
> * **`right = 2` (`'c'`)**: Not in set. Add `'c'`. Window is `"abc"`, length is `3`. Max length = `3`. `seen = {'a', 'b', 'c'}`.
> * **`right = 3` (`'a'`)**: **Duplicate!** `'a'` is already in our set. We contract from the left: remove `s[0]` (`'a'`), move `left` to `1`. Now we can add the new `'a'`. Window is `"bca"`, length is `3`. Max length remains `3`.
> 
> 
> *By sliding both pointers smoothly across the string in a single direction, each character is visited at most twice (once by `right`, once by `left`). This reduces our time complexity from quadratic to strict linear $O(n)$."*

### 6: Executing the Narrated Coding Phase

* **Action:** Write the clean TypeScript implementation while narrating variable initialization and loop logic out loud.

---

### *Complete Code*

> *"Now let's translate this into code. I'm going to initialize a tracking set for our unique characters, a left pointer, and a max length variable, then run a single pass with our right pointer.*
> *As I type:*

```typescript
function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];

        // If we hit a duplicate, contract the window from the left 
        // until the duplicate character is removed
        while (seen.has(currentChar)) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(currentChar);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

```

> *That gives us our $O(n)$ time and $O(\min(n, \Sigma))$ space solution cleanly and efficiently."*

### Step 6: The Full Spoken Script for the Coding Phase

> *"Now let's write out the implementation. As I write this, I'm going to narrate the setup of our pointers, the sliding window logic, and the character tracking.*
> *First, I'm initializing a hash set to keep track of the unique characters in our current window, a `left` pointer starting at index zero, and our `maxLength` counter:*
> ```typescript
> const seen = new Set<string>();
> let left = 0;
> let maxLength = 0;
> 
> 
> ```
> 
> 
> *Next, we loop through the string using our `right` pointer to expand the window:*
> ```typescript
> for (let right = 0; right < s.length; right++) {
>     const currentChar = s[right];
> 
> 
> ```
> 
> 
> *If we encounter a character that is already in our set, we have a duplicate. We use a `while` loop to contract our window from the left, removing characters and advancing `left` until the duplicate is cleared out:*
> ```typescript
>     while (seen.has(currentChar)) {
>         seen.delete(s[left]);
>         left++;
>     }
> 
> 
> ```
> 
> 
> *Once the window is safe and free of duplicates, we add the current character to our set and calculate our new maximum substring length:*
> ```typescript
>     seen.add(currentChar);
>     maxLength = Math.max(maxLength, right - left + 1);
> }
> 
> 
> ```
> 
> 
> *And finally, we return our `maxLength`:*
> ```typescript
>     return maxLength;
> }
> 
> 
> ```
> 
> 
> *With that, our sliding window code is complete, handling the string efficiently in a single pass."*

## 7. Verification & Edge Cases (Minute 35–45)

* **Action:** Trace an example, call out edge cases (e.g., empty strings, duplicate heavy inputs, max constraint scale), and re-state final complexities.

---

### Verification & Edge Cases

> *"Now that the code is written, let's walk through our verification phase to make sure it holds up under tracing and edge cases.*
> *First, let's trace **Example 3** (`s = "pwwkew"`):*
> * *At `right = 0` (`'p'`): `seen = {'p'}`, `left = 0`, `maxLength = 1`.*
> * *At `right = 1` (`'w'`): `seen = {'p', 'w'}`, `left = 0`, `maxLength = 2`.*
> * *At `right = 2` (`'w'`): Duplicate found! The `while` loop contracts the window by deleting `'p'` and `'w'`, moving `left` to `2`. We then add the new `'w'`. `seen = {'w'}`, `maxLength` remains `2`.*
> * *At `right = 3` (`'k'`): `seen = {'w', 'k'}`, `left = 2`, `maxLength` remains `2`.*
> * *At `right = 4` (`'e'`): `seen = {'w', 'k', 'e'}`, `left = 2`, `maxLength = max(2, 4 - 2 + 1) = 3`.*
> * *At `right = 5` (`'w'`): Duplicate found! The `while` loop removes `'w'` from index 2, advancing `left` to `3`. We add the final `'w'`. `seen = {'k', 'e', 'w'}`, `maxLength` stays `3`. Returns `3`.*
> 
> 
> *Next, let's evaluate our edge cases:*
> * **Empty String (`s = ""`):** The string length is `0`. The `for` loop does not execute, and the function immediately returns `0` without out-of-bounds errors.
> * **All Identical Characters (`s = "bbbbb"`):** When a duplicate is hit on every step, the `while` loop clears out the old character and shifts `left` up instantly, ensuring the window size never exceeds `1`. Returns `1`.
> * **Maximum Constraint Scale ($N = 10^5$):** With a linear $O(n)$ pass, the operation count scales to at most $2 \times 10^5$ steps (since each pointer moves forward at most $N$ times), executing in a fraction of a millisecond and safely avoiding a Time Limit Exceeded error.
> 
> 
> *Finally, to confirm our performance metrics:*
> * **Time Complexity:** **$O(n)$** because both the `left` and `right` pointers traverse the string at most once, performing constant-time hash set lookups and mutations.
> * **Space Complexity:** **$O(\min(n, \Sigma))$** because our hash set storage is strictly bounded by the unique character set size ($\Sigma$) or string length ($n$) in the worst case.*
> 
> 
> *And that completes our full execution script for Longest Substring Without Repeating Characters."*
>
## 8. Handling Curveballs & Constraint Changes (The Adaptation Protocol)

Here is how the 4-step curveball protocol applies to a classic twist on **Longest Substring Without Repeating Characters**:

### The Scenario

> *Interviewer:* *"That sliding window solution with a `Set` is clean and runs in $O(n)$ time. But notice that when we hit a duplicate, our inner `while` loop contracts the `left` pointer one step at a time. Can you optimize this so the `left` pointer **jumps instantly** past the duplicate in $O(1)$ time without needing a `while` loop?"*

---

### Applying the 4-Step Adaptation Protocol

#### Step 1: Acknowledge and Validate

> *"That’s a great optimization. Eliminating the inner `while` loop by jumping the `left` pointer directly will make our traversal even more efficient in practice."*

#### Step 2: Assess What Breaks

> *"Right now, our `Set` only tracks whether a character exists in the window, but it doesn't remember *where* it was last seen. Because of that limitation, we have to incrementally delete characters from the left until the duplicate is cleared out."*

#### Step 3: Propose the Pivot

> *"To adapt to this, we can pivot from a `Set` to an **Index Map (`Map<string, number>`)**. Instead of tracking just existence, the map will store each character mapped to its **most recent index**.
> * When we encounter a character that is already in our map, we check if its last recorded index is greater than or equal to our current `left` pointer (meaning it's inside our active window).
> * If it is, we can **instantly jump** our `left` pointer to `map.get(currentChar) + 1` in $O(1)$ time, completely bypassing the inner loop. Then, we update the character's new index in the map."*
> 
> 

#### Step 4: Recalibrate and Confirm

> *"This keeps our time complexity at a strict $O(n)$ with fewer inner operations, and our space complexity remains $O(\min(n, \Sigma))$ since the map is still bounded by the character set. Would you like me to write out the implementation for this index-jumping optimization?"*
















































--

No, there are no practical space complexity issues for $N = 10^5$. However, analyzing the space complexity reveals an elegant computer science concept involving the **character set ($\Sigma$)** versus the **string length ($N$)**.

The space complexity for the optimal sliding window approach is expressed as **$O(\min(N, \Sigma))$** (or $O(K)$ where $K$ is the character set size).

---

### 1. The Character Set Limit ($\Sigma$) & The Pigeonhole Principle

The problem specifies that the string consists of **English letters, digits, symbols, and spaces**.

* **If restricted to standard ASCII:** The total number of unique characters ($\Sigma$) is at most **128** (or 256 for extended ASCII).
* **The Pigeonhole Effect:** Because a substring cannot contain duplicate characters, **the length of any valid unique substring can never exceed the size of the alphabet ($\Sigma$)**. Even if your string length $N$ is 100,000, your hash map or set can never hold more than 128 elements at any single moment.
* **The Verdict:** Because $\Sigma$ is a fixed constant relative to $N$, the auxiliary space complexity is effectively **$O(1)$** (constant space).

### 2. What if the Character Set is Unlimited (e.g., Full Unicode)?

If the input string could contain any arbitrary Unicode character (where $\Sigma$ can be over 1 million characters), the space complexity shifts to being bound by the string length $N$:

* In the absolute worst-case scenario where every single character in the string is entirely unique (e.g., `"abcdefghij..."`), your sliding window expands to cover the entire string.
* Your hash map or set would need to store up to $N$ elements, making the space complexity **$O(n)$**.

### 3. Hardware Reality Check for $N = 10^5$

Even under the worst-case Unicode scenario where space scales to $O(n)$:

* A string of $10^5$ characters requires roughly **100 KB to a few megabytes** of memory depending on the programming language and character encoding (UTF-16 in JavaScript/Java, UTF-8 in Python).
* Modern machines have gigabytes of RAM. Storing a few thousand tracking keys in a hash map uses a negligible fraction of available memory.
* There are **zero memory limits, allocation bottlenecks, or garbage collection issues** at $N = 10^5$.

---

### Summary Table: Time vs. Space Trade-off

| Metric               | Brute-Force Approach | Optimal Sliding Window Approach | Why?                                                                               |
| -------------------- | -------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| **Time Complexity**  | $O(n^2)$ or $O(n^3)$ | **$O(n)$**                      | Avoids redundant inner loops by sliding window boundaries.                         |
| **Space Complexity** | $O(\min(n, \Sigma))$ | **$O(\min(n, \Sigma))$**        | Bounded by either the unique character set size ($\Sigma$) or string length ($N$). |


To understand **$O(\min(n, \Sigma))$**, let’s break down the two variables inside it:

* **$n$**: The length of your input string (e.g., $10^5$).
* **$\Sigma$ (Sigma)**: The size of the **alphabet** (the total number of unique possible characters allowed, like 128 for standard ASCII or 256 for extended ASCII).
* **$\min(n, \Sigma)$**: Literally means *"take whichever number is smaller."*

---

### How It Works: The Alphabet Ceiling

In a problem where you are tracking *unique* characters (like our sliding window hash set), your data structure only stores characters that are currently inside your active window.

Because a string cannot contain more unique characters than the alphabet actually has, **your memory usage hits a hard ceiling.**

#### Example 1: When $n$ is smaller than the alphabet ($\Sigma$)

* Imagine your string is `s = "abc"`.
* Here, $n = 3$, and our alphabet size ($\Sigma$) is 128.
* The math: $\min(3, 128) = 3$.
* *Result:* Your hash set stores at most 3 characters. Space grows linearly with $n$.

#### Example 2: When $n$ is massive, but the alphabet is small

* Imagine your string is `s = "aaaaaaaaaa..."` repeated 1 million times ($n = 1,000,000$).
* Your alphabet size ($\Sigma$) is still just 128 (ASCII).
* The math: $\min(1,000,000, 128) = 128$.
* *Result:* Even though your string is a million characters long, your hash set will never hold more than **1 unique character** (`'a'`) at any given time. Your memory usage caps out instantly and stops growing.

---

### How It Differs From Regular $O(n)$

| Metric                         | What It Assumes                                                                                                                         | Real-World Memory Behavior                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **$O(n)$ Space**               | Assumes memory grows infinitely and linearly forever as the input string gets longer. If $n$ goes to infinity, memory goes to infinity. | True for arrays or lists where you store every single element (e.g., keeping a copy of the whole string).                  |
| **$O(\min(n, \Sigma))$ Space** | Acknowledges that you are tracking *unique* items drawn from a finite pool of characters.                                               | True for hash sets/maps in substring problems. Memory is bounded by the alphabet size, no matter how long the string gets. |

### Why This Impresses Interviewers

Saying $O(\min(n, \Sigma))$ instead of a blanket $O(n)$ shows you understand **data structure constraints**. You recognize that because the character set is bounded, your memory consumption won't balloon out of control for large $n$, making your space complexity effectively $O(1)$ (constant) in practice.
