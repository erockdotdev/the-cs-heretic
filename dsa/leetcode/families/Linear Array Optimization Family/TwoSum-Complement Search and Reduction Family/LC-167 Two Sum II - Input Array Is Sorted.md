# 167. Two Sum II - Input Array Is Sorted – Medium

*Prompt*
Given a **1-indexed array** of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number. 

Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers `index1` and `index2`, **each incremented by one,** as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is **exactly one solution**. You may not use the same element twice.

Your solution must use only constant extra space.


**Example 1:**

- Input: numbers = [2,7,11,15], target = 9
- Output: [1,2]
- Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

**Example 2:**

Input: numbers = [2,3,4], target = 6
- Output: [1,3]
- Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

**Example 3:**
- Input: numbers = [-1,0], target = -1
- Output: [1,2]
- Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
 

**Constraints:**

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**.
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.


## 1. Line-by-line breakdown – Relationships, Contexts, Elements**

**Paraphrase:**

**Original line:**  
`Given a **1-indexed array** of integers "numbers" that is already **sorted in non-decreasing order**`

- **Given** → the data is already provided to us
- **1-indexed array** I've never heard of this before but from the example/test results it sounds like the array begins at 1 instead of 0.
- **of integers "numbers"** - There exists a variable `numbers` which is an array of type `number`. `const numbers: number[]`
- **sorted in non-decreasing order** - I've never heard this phrasing before. I can assume if it's "non-decreasing" then it is increasing which means the array would be in ascending order where `arr[1]< arr[arr.length]` (no -1 since the array starts at 1)

**Original Line**
Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`

- **Let these two numbers be `numbers[index1]` and `numbers[index2]`**
 The "two numbers" are referring to the two numbers that add up to the `target` number. Potentially represented as `const index1:number` `const index2:number`

- **where `1 <= index1 < index2 <= numbers.length`** - index1 is initalized as greater than or equal to 1 and less than index2. index2 is greater than index1 and less than the value of the arrays length.

**Original line:**  
`Return the indices of the two numbers `index1` and `index2`, **each incremented by one,** as an integer array `[index1, index2]` of length 2."`

- Note, this feels quite convoluted, rathen than just rephrase now i'll try to go piece by piece
- **Return the indices of the two numbers `index1` and `index2`** - assuming this is in the case when we find out 2 numbers that add up to the target (its the only case that would makes nse to return but this like isn't explicit). ad in this case we would return the 2 indices, not the actual numbers.
- **each incremented by one** - completely random place to put this so i'll assume this mean that as we search our our 2 number that add up to the target, during THAT process we should increment the indices by 1
- **as an integer array `[index1, index2]` of length 2."`** - return the 2 indices in an array - which it redundantly expresses of length 2 since we have 2 numbers and must return two numbers and are returning them in an array, the length will be 2, we don't gain more information by explicitly stating that.

**Original line:**  
`The tests are generated such that there is **exactly one solution**. `
We don't have to consider edge cases where there is no solution or there are multiple

**Original line:**  
`You may not use the same element twice.`
Must be 2 different numbers at different indices.

**Your solution must use only constant extra space.**
O(1) space requirement

this rules out brute force solutions of O(N^2) as well as the ledger pattern where we use a map or set with 0(N) when we save past items to memory.

**Constraints**
- `2 <= numbers.length <= 3 * 10^4` - we will have an array of at least 2 items and at most 3*10,000 or 30,000
-  `-1000 <= numbers[i] <= 1000` - the value of any given number can range from -1000 to 1000
- `numbers` is sorted in **non-decreasing order**. - back to this weird phrasing, assuming it means ascending order
- `-1000 <= target <= 1000` the value of the target number can range from -1000 to 1000, matching the same range ad the values of the indices 