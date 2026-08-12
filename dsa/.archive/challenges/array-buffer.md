Here are two side-by-side problems designed around `ArrayBuffer` and TypedArrays to show the contrast:

The **Pragmatic Use Case** mirrors real-world production code (parsing binary network/file protocols like WebGL, Audio, PNG headers, or WebSockets).

The **LeetCode-Style Problem** strips away all practical context and turns bit-level memory layout into an abstract algorithmic puzzle.

---

### Problem 1: Pragmatic Use Case (Real-World Binary Protocol Parser)

#### Context

You are building an IoT dashboard in Node.js/Browser JS that receives live telemetry data over a WebSocket from thousands of hardware sensors. To save bandwidth, the hardware sends data as a packed **12-byte raw binary frame** rather than JSON.

#### Binary Frame Layout (12 Bytes Total)

```
Byte 0 - 3   : Timestamp (32-bit Unsigned Integer, Big-Endians / Network Byte Order)
Byte 4 - 7   : Temperature in Celsius (32-bit IEEE 754 Float)
Byte 8 - 9   : Humidity Percentage (16-bit Unsigned Integer)
Byte 10      : Device Status Code (8-bit Unsigned Integer: 0=OK, 1=Warning, 2=Error)
Byte 11      : Padding / Reserved (8-bit Unsigned Integer, ignored)

```

#### Your Task

Write a function `parseSensorFrame(buffer: ArrayBuffer)` using `DataView` or TypedArrays that takes a raw 12-byte `ArrayBuffer` and converts it into a clean, human-readable JavaScript object.

```js
// Example Output Structure:
{
  timestamp: 1723330000,
  temperature: 24.5,
  humidity: 62,
  status: "OK" // Convert status byte: 0 -> "OK", 1 -> "WARNING", 2 -> "ERROR"
}

```

> **Why this is pragmatic:** This is *exactly* how binary media files (WAV, MP3, PNG), database drivers, WebAssembly bounds, and WebSockets work under the hood. You are using `DataView` to read mixed byte sizes and endianness from raw memory.

---

### Problem 2: LeetCode-Style "Acrobatic" Problem (Abstract Memory Puzzle)

#### Title: Reorder Interleaved 32-bit Integers via 8-bit Inversion

#### Problem Statement

Given an `ArrayBuffer` containing $N$ 32-bit signed integers (where $N$ is always a multiple of 2):

1. Interpret the buffer as an array of **32-bit Signed Integers** (`Int32Array`).
2. Swap every pair of adjacent 32-bit integers in place (i.e., swap index `0` with `1`, index `2` with `3`, etc.).
3. Interpret the **same** buffer as an array of **8-bit Unsigned Integers** (`Uint8Array`).
4. Reverse the order of all bytes *within* each 4-byte block (i.e., byte invert each original 32-bit word in place without allocating a new buffer).

**Constraints:**

* Space Complexity: $O(1)$ auxiliary space. You must mutate the original `ArrayBuffer` in place.
* You cannot convert the buffer into standard JavaScript arrays (`[]`).

#### Example

```js
const buffer = new ArrayBuffer(8); // Stores two 32-bit integers
const view = new Int32Array(buffer);
view[0] = 0x12345678;
view[1] = 0x000000FF;

reorderAndInvertBuffer(buffer);

// Expected Result in Buffer:
// Step 1 (Swap 32-bit pairs): view[0] becomes 0x000000FF, view[1] becomes 0x12345678
// Step 2 (Invert 8-bit bytes inside words): 
// view[0] bytes [00, 00, 00, FF] -> [FF, 00, 00, 00]
// view[1] bytes [12, 34, 56, 78] -> [78, 56, 34, 12]

```

> **Why this is "LeetCode-style":** Nobody in production code flips byte representations back and forth between two different TypedArray views on the same buffer just to reverse words. It exists solely to test your knowledge of contiguous pointer arithmetic, stride overlaps, and buffer mutations.

---

Which one would you like to solve first? We can work through the code step-by-step or walk through how `DataView` versus TypedArrays handle the memory in each scenario.