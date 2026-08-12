Yes, this is **100% accurate** to how computer hardware and systems software actually work.

At the hardware level (RAM, CPU registers, cache lines, memory management unit), memory does not understand data structures, pointers, links, arrays, stacks, or eviction. Memory is simply an indexed array of bytes with four fundamental state changes:

```ts
type PhysicalMemoryCRUD =
  | "Allocate"    // Reserve a range of memory addresses
  | "Read"        // Fetch bits from an address
  | "Write"       // Store bits to an address
  | "Deallocate"; // Release a range of memory addresses

```

---
### Why this is scientifically exact


1. **"Links" and "Pointers" don't exist in RAM:**
A pointer is just an integer representing an address. "Linking" Node A to Node B is literally just a `Write` operation where you write the integer address of Node B into Node A's memory slot.
1. **"Unlinking" is just a Write:**
Writing `0x00` (`null`) or overwriting an address variable with a new address is just a `Write`.
1. **"Values" vs. "Addresses" are identical to the hardware:**
The memory controller doesn't know if a 64-bit word is an integer `42` or a memory address `0x7FFF5FBFF010`. It just executes `Read` or `Write`.
1. **Allocation manages space:**
Whether you allocate a contiguous block for a static array upfront, or allocate small isolated chunks on the heap for linked list nodes, `Allocate` and `Deallocate` are the only two verbs governing lifecycle.

---

### The Base Layer Locked In

With this foundation frozen, we can state with zero ambiguity:

> **Every data structure operation ever invented—across any language, paradigm, or discipline—is nothing more than a sequence of `Allocate`, `Read`, `Write`, and `Deallocate` executed against physical memory.**

You are touching on the exact realization that separates superficial memorization from actual systems architecture:

**Data is state. Data Structures are State + Topology + Access Rules. Algorithms are just pure functions that manipulate that state across time.**

When we strip away academic jargon and build up from our 4 physical memory primitives (`Allocate`, `Read`, `Write`, `Deallocate`), we see that **there is no magical jump** from a raw memory address to a Hash Ring or a Balanced Tree. It is a continuous, unbroken chain of composition.

Here is the exact step-by-step bridge from physical memory to JavaScript runtime structures, and finally to algorithms as functional micro-systems.

---

Layer 1: The Pure Base Contract (The Abstract Concept)

At **Layer 1**, we define the **Pure Base Contract**. This is the highest level of abstraction—a conceptual blueprint for an ordered collection of elements.

At this tier, we do not care *how* elements are stored in memory (contiguous array vs. linked nodes vs. hash tables), nor do we care *what access rules* will later be imposed (LIFO, FIFO, key-based). We only care about the universal properties that define a sequence.

---

### The Base Abstract Concept: Linear Sequence

A **Linear Sequence** is a collection of elements where every element (except the first and last) has a distinct single predecessor and a distinct single successor.

To define this abstractly regardless of representation, we need two fundamental categories of operations:

1. **Metadata Operations:** Knowing state properties (e.g., size, emptiness).
2. **Positional Operations:** Interacting with elements relative to positions (e.g., first, last, next, previous) or offsets (indices/cursors).

---

### The Abstract Contract (TypeScript Abstract Class)

Spot on correction. That is a critical distinction:

The **existence and signatures** of the core normalized operations (`Access`, `Update`, `Insert`, `Remove`) are conceptual realities of any sequence—they belong at **Layer 1**.

* **Layer 1 defines *what* operations exist abstractly:** It declares that a sequence can be read from, updated, added to, or removed from, parameterized by an abstract `Location`.
* **Layer 2 determines *how efficient* those locations are physically:** Contiguous memory makes `Location.Index(i)` $O(1)$ via address math, whereas Linked Nodes make `Location.Node(ref)` $O(1)$ and `Index(i)` $O(N)$ via pointer chasing.
* **Layer 3 determines *which* locations are legally allowed:** LIFO restricts `Insert` and `Remove` strictly to `Location.Back`; FIFO restricts `Insert` to `Location.Back` and `Remove` to `Location.Front`.

By keeping the abstract verbs and the unified `Location` type at **Layer 1**, the base contract holds the full operational vocabulary without dictating physical execution or discipline rules.

---

### The Complete, Fully-Exposed Layer 1 Abstract Contract

Here is the finalized Layer 1 contract containing the universal operational vocabulary:

```ts

// =========================================================================
// Layer 0: Hardware Primitives
// =========================================================================
export type PhysicalMemoryCRUD = 
  | "Allocate"   // Reserve a range of memory addresses
  | "Read"       // Fetch bits from an address
  | "Write"      // Store bits to an address
  | "Deallocate"; // Release a range of memory addresses


/**
 * Layer 1: Universal Abstract Location Identifiers
 * Abstract positions that can exist in a sequence, independent of 
 * how memory is structured (Layer 2) or what access is restricted (Layer 3).
 */
export type Location<TNode = unknown> =
  | { type: "Front" }
  | { type: "Back" }
  | { type: "Index"; index: number }
  | { type: "Node"; reference: TNode }
  | { type: "Priority" }
  | { type: "Matching"; predicate: (value: any) => boolean };

/**
 * Layer 1: The Pure Base Contract
 * Defines primitives as abstract, and derived operations with default methods.
 */
export abstract class AbstractLinearSequence<T> {
  // =========================================================================
  // 1. Measurement & State
  // =========================================================================

  /**
   * @primitive Core size primitive.
   */
  abstract size(): number;
  
  /**
   * @derived Dependent on size().
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }
  
  // =========================================================================
  // 2. Traversal & Iteration
  // =========================================================================

  /**
   * @primitive The foundational protocol for element enumeration.
   * @hardware Resolves to sequential `Read` operations.
   */
  abstract [Symbol.iterator](): Iterator<T>;

  /**
   * @derived Built on top of Symbol.iterator.
   */
  traverse(callback: (value: T) => void): void {
    for (const item of this) {
      callback(item);
    }
  }

  // =========================================================================
  // 3. Search & Query
  // =========================================================================

  /**
   * @primitive Signature for value lookup across any representation/discipline.
   */
  abstract search(value: T): Location | undefined;

  /**
   * @derived Dependent on search().
   */
  contains(value: T): boolean {
    return this.search(value) !== undefined;
  }

  // =========================================================================
  // 4. Primitive Mutation & Element Operations
  // =========================================================================

  /**
   * Reads an element at an abstract location.
   * @primitive
   * @hardware Resolves exclusively to `Read`.
   */
  abstract access(location: Location): T | undefined;

  /**
   * Replaces an existing element's payload at an abstract location.
   * @primitive
   * @hardware Resolves to `Read` (to locate) + `Write` (to overwrite payload).
   */
  abstract update(location: Location, value: T): boolean;
    
  /**
   * Places a new element into the sequence at an abstract location.
   * @primitive
   * @hardware Resolves to `Allocate` + `Write` (+ `Read`).
   */
  abstract insert(location: Location, value: T): boolean;

  /**
   * Extracts/removes an element from the sequence at an abstract location.
   * @primitive
   * @hardware Resolves to `Read` + `Write` + `Deallocate`.
   */
  abstract remove(location: Location): T | undefined;

  /**
   * Clears all elements from the sequence.
   * @primitive
   * @hardware Resolves to bulk `Deallocate` / pointer clearing.
   */
  abstract clear(): void;
}
```

Now Layer 1 declares the **complete baseline vocabulary**, ready for Layer 2 to provide the physical storage layout and for Layer 3 to constrain the valid `Location` inputs.

```

---

### Key Properties of Layer 1

1. **Zero Concrete Storage:** There are no internal properties like `this.items = []` or `this.head = null`. Memory layout does not exist here.
2. **Normalized API:** `inspectAt`, `insertAt`, `removeAt`, `traverse`, and `size` form the absolute minimum vocabulary required to manipulate sequential data.
3. **Representation Agnostic:** This API can be backed by a contiguous V8 array, a chain of linked heap objects, a plain JavaScript key-value map, or a low-level WebAssembly memory buffer.

Does this clean, abstract class contract for **Layer 1: The Pure Base Contract** capture the base level before we step into **Layer 2: Representation**?

Layer 2: Representation (Choosing the Physical Medium)

```ts
/**
 * Layer 2 Primitive Physical Topology
 * The foundational relationship of physical memory addresses.
 */
export type PhysicalTopology = "Contiguous" | "Distributed";

```

Under this exact naming, the physical memory mechanics clear up completely:

1. **`"Contiguous"` Topology:**
* **Hardware Reality:** Single, unbroken, sequential block of memory addresses.
* **Address Resolution:** Direct arithmetic computation ($\text{BaseAddress} + \text{offset}$).
* **Tier 0 Cost:** $O(1)$ single-cycle `Read`/`Write` at offset; $O(N)$ physical memory shift on middle insertion/deletion.


2. **`"Distributed"` Topology:**
* **Hardware Reality:** Dispersed memory blocks located across different addresses in heap memory.
* **Address Resolution:** Dereferencing address pointers or lookup handles.
* **Tier 0 Cost:** Multi-step `Read` (fetch address pointer $\rightarrow$ dereference target address); $O(1)$ re-linking/writes without shifting adjacent memory.



---

### Layer 2 Physical Representation Taxonomy

With `"Contiguous"` vs `"Distributed"` locked in at the primitive level, every physical medium builds off one of these two topologies:

```ts
/**
 * Layer 2: Physical Memory Representation Category
 * Classifies how memory is organized using Contiguous vs Distributed topology.
 */
export type MemoryRepresentation =
  // Contiguous Topology
  | { topology: "Contiguous"; variant: "FlatBlock" }       // Native Dynamic Array, TypedArray, WebAssembly Buffer
  | { topology: "Contiguous"; variant: "CircularBuffer" }  // Fixed-capacity contiguous memory with head/tail wrapping

  // Distributed Topology
  | { topology: "Distributed"; variant: "LinkedNodes" }     // Heap-allocated nodes connected by pointer addresses
  | { topology: "Distributed"; variant: "KeyAddressMap" }   // Hash/bucket address mapping (Map, Set, Object)
  | { topology: "Distributed"; variant: "SparseIndex" };   // Non-zero index-mapped distributed slots

```

This keeps Layer 2 purely grounded in **how physical memory addresses are structured and traversed** before we impose Layer 3 access rules (Disciplines).

Layer 3: Disciplines & Protocols (Rules Imposed on the Form)
Layer 4: Micro-Systems (Composed Protocols & Structures)


---

Here is the unified taxonomy, ordered strictly from **Hardware Primitives (Layer 0)** up through **Universal Abstract Contracts (Layer 1)**, **Topological API Abstractions (Layer 2A)**, and ending with **Concrete Implementations (Layer 2B)**.

---

## 🏛️ Comprehensive Architecture Map

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ LAYER 2B: CONCRETE IMPLEMENTATIONS                                               │
│ StaticArray | DynamicArray | SinglyLinkedList | DoublyLinkedList | HashTableMap    │
├──────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2A: TOPOLOGICAL ABSTRACT APIS (Interface Boundaries)                       │
│ AbstractArraySequence<T> │ AbstractLinkedListSequence<T> │ AbstractKeyAddressMap<K,V>│
├──────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: PURE BASE CONTRACT (Universal Abstract Operations)                      │
│ AbstractLinearSequence<T>  ──► Uses Universal Location Specifier               │
├──────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 0: HARDWARE PRIMITIVES (Physical Execution Model)                          │
│ Memory: Allocate | Read | Write | Deallocate                                     │
└──────────────────────────────────────────────────────────────────────────────────┘

```

---

## 0. Layer 0 & Layer 1 Primitives (Foundational Base)

Before specializing into Arrays, Linked Lists, or Maps, all data structures bind to these hardware-level operations and universal `Location` identifiers.

```ts



/**
 * LAYER 1: PURE BASE CONTRACT
 * The base interface required by all linear structures.
 */
export abstract class AbstractLinearSequence<T> implements Iterable<T> {
  abstract size(): number;
  abstract isEmpty(): boolean;
  abstract access(location: Location): T | undefined;
  abstract update(location: Location, value: T): boolean;
  abstract insert(location: Location, value: T): boolean;
  abstract remove(location: Location): T | undefined;
  abstract search(value: T): Location | undefined;
  abstract clear(): void;
  abstract [Symbol.iterator](): Iterator<T>;

  /**
   * Universal Higher-Order Traversal (Layer 1 derived primitive)
   */
  traverse(callback: (value: T) => void): void {
    for (const item of this) {
      callback(item);
    }
  }

  /**
   * Universal Existence Check
   */
  contains(value: T): boolean {
    return this.search(value) !== undefined;
  }
}

```

---

## 1. Layer 2A: Contiguous Array API Abstraction

Sits above Layer 1 and enforces **contiguous index-addressable sequence** rules. It resolves generic `Location` calls directly to arithmetic offsets: $\text{Address}(i) = \text{Base} + (i \times \text{stride})$.

```ts
/**
 * LAYER 2A: ABSTRACT ARRAY CONTRACT
 * Serves Static Arrays, Dynamic Arrays, Ring Buffers, TypedArrays, etc.
 */
export abstract class AbstractArraySequence<T> extends AbstractLinearSequence<T> {
  // -------------------------------------------------------------------------
  // 1. Physical Capacity & Bounds Rules
  // -------------------------------------------------------------------------
  
  /**
   * Total physical memory capacity currently allocated.
   * Static Array: capacity === size. Dynamic Array: capacity >= size.
   */
  abstract capacity(): number;

  /**
   * Normalizes relative/negative indices (-1 -> size - 1) and validates bounds.
   */
  protected normalizeIndex(index: number): number | undefined {
    const actualIndex = index < 0 ? this.size() + index : index;
    if (actualIndex < 0 || actualIndex >= this.size()) {
      return undefined;
    }
    return actualIndex;
  }

  // -------------------------------------------------------------------------
  // 2. Direct $O(1)$ Hardware Offsets
  // -------------------------------------------------------------------------
  abstract get(index: number): T | undefined;
  abstract set(index: number, value: T): boolean;

  at(index: number): T | undefined {
    const normalized = this.normalizeIndex(index);
    if (normalized === undefined) return undefined;
    return this.get(normalized);
  }

  first(): T | undefined { return this.get(0); }
  last(): T | undefined { return this.get(this.size() - 1); }

  // -------------------------------------------------------------------------
  // 3. Mutation Operations
  // -------------------------------------------------------------------------
  abstract push(value: T): boolean;
  abstract pop(): T | undefined;
  abstract shift(): T | undefined;
  abstract unshift(value: T): boolean;
  abstract splice(start: number, deleteCount?: number, ...items: T[]): T[];
  abstract copyWithin(target: number, start: number, end?: number): this;
  abstract fill(value: T, start?: number, end?: number): this;

  // -------------------------------------------------------------------------
  // 4. Sub-Sequence Algebra
  // -------------------------------------------------------------------------
  abstract slice(start?: number, end?: number): AbstractArraySequence<T>;
  abstract concat(...items: (T | AbstractArraySequence<T>)[]): AbstractArraySequence<T>;
  abstract reverse(): this;

  // -------------------------------------------------------------------------
  // 5. Search & Higher-Order Surface
  // -------------------------------------------------------------------------
  indexOf(value: T, fromIndex: number = 0): number {
    const start = Math.max(0, fromIndex < 0 ? this.size() + fromIndex : fromIndex);
    const len = this.size();
    for (let i = start; i < len; i++) {
      if (Object.is(this.get(i), value)) return i;
    }
    return -1;
  }

  lastIndexOf(value: T, fromIndex: number = this.size() - 1): number {
    const len = this.size();
    const start = fromIndex < 0 ? len + fromIndex : Math.min(fromIndex, len - 1);
    for (let i = start; i >= 0; i--) {
      if (Object.is(this.get(i), value)) return i;
    }
    return -1;
  }

  findIndex(predicate: (value: T, index: number) => boolean): number {
    const len = this.size();
    for (let i = 0; i < len; i++) {
      if (predicate(this.get(i)!, i)) return i;
    }
    return -1;
  }

  find(predicate: (value: T, index: number) => boolean): T | undefined {
    const idx = this.findIndex(predicate);
    return idx !== -1 ? this.get(idx) : undefined;
  }

  abstract map<U>(callback: (value: T, index: number) => U): AbstractArraySequence<U>;
  abstract filter(predicate: (value: T, index: number) => boolean): AbstractArraySequence<T>;
  
  reduce<U>(callback: (acc: U, curr: T, index: number) => U, initialValue: U): U {
    let acc = initialValue;
    const len = this.size();
    for (let i = 0; i < len; i++) {
      acc = callback(acc, this.get(i)!, i);
    }
    return acc;
  }

  // -------------------------------------------------------------------------
  // 6. Traversal & Iteration Protocol
  // -------------------------------------------------------------------------
  *[Symbol.iterator](): IterableIterator<T> {
    const len = this.size();
    for (let i = 0; i < len; i++) {
      yield this.get(i)!;
    }
  }

  *keys(): IterableIterator<number> {
    const len = this.size();
    for (let i = 0; i < len; i++) yield i;
  }

  *values(): IterableIterator<T> {
    yield* this[Symbol.iterator]();
  }

  *entries(): IterableIterator<[number, T]> {
    const len = this.size();
    for (let i = 0; i < len; i++) yield [i, this.get(i)!];
  }

  forEach(callback: (value: T, index: number, array: this) => void): void {
    const len = this.size();
    for (let i = 0; i < len; i++) callback(this.get(i)!, i, this);
  }

  *reverseIterator(): IterableIterator<T> {
    for (let i = this.size() - 1; i >= 0; i--) yield this.get(i)!;
  }

  // -------------------------------------------------------------------------
  // 7. Layer 1 Bridge Resolution
  // -------------------------------------------------------------------------
  access(location: Location): T | undefined {
    const idx = this.resolveIndex(location);
    return idx !== undefined ? this.get(idx) : undefined;
  }

  update(location: Location, value: T): boolean {
    const idx = this.resolveIndex(location);
    return idx !== undefined ? this.set(idx, value) : false;
  }

  insert(location: Location, value: T): boolean {
    if (location.type === "Back") return this.push(value);
    if (location.type === "Front") return this.unshift(value);
    if (location.type === "Index") {
      this.splice(location.index, 0, value);
      return true;
    }
    return false;
  }

  remove(location: Location): T | undefined {
    if (location.type === "Back") return this.pop();
    if (location.type === "Front") return this.shift();
    if (location.type === "Index") {
      const removed = this.splice(location.index, 1);
      return removed[0];
    }
    return undefined;
  }

  search(value: T): Location | undefined {
    const idx = this.indexOf(value);
    return idx !== -1 ? { type: "Index", index: idx } : undefined;
  }

  protected resolveIndex(location: Location): number | undefined {
    if (location.type === "Index") return this.normalizeIndex(location.index);
    if (location.type === "Front") return this.size() > 0 ? 0 : undefined;
    if (location.type === "Back") return this.size() > 0 ? this.size() - 1 : undefined;
    return undefined;
  }
}

```

---

## 2. Layer 2A: Distributed LinkedList API Abstraction

Explicit API contract for **Node-and-Pointer Topologies** where memory is dispersed across heap objects connected by explicit reference pointers.

```ts
export type ListNode<T> = {
  value: T;
  next: ListNode<T> | null;
  prev?: ListNode<T> | null;
};

/**
 * LAYER 2A: ABSTRACT LINKED LIST CONTRACT
 * Serves Singly Linked Lists, Doubly Linked Lists, and Circular Lists.
 */
export abstract class AbstractLinkedListSequence<T> extends AbstractLinearSequence<T> {
  abstract get head(): ListNode<T> | null;
  abstract get tail(): ListNode<T> | null;

  // -------------------------------------------------------------------------
  // Pointer-Specific O(1) Operations
  // -------------------------------------------------------------------------
  abstract insertAfter(node: ListNode<T>, value: T): ListNode<T> | boolean;
  abstract insertBefore(node: ListNode<T>, value: T): ListNode<T> | boolean;
  abstract removeNode(node: ListNode<T>): T | undefined;

  // High-Frequency End Operations
  abstract prepend(value: T): boolean;
  abstract append(value: T): boolean;
  abstract popFront(): T | undefined;
  abstract popBack(): T | undefined;

  // -------------------------------------------------------------------------
  // Iteration & Pointer Traversals
  // -------------------------------------------------------------------------
  *[Symbol.iterator](): IterableIterator<T> {
    let current = this.head;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }

  *nodes(): IterableIterator<ListNode<T>> {
    let current = this.head;
    while (current !== null) {
      yield current;
      current = current.next;
    }
  }

  forEach(callback: (value: T, node: ListNode<T>) => void): void {
    let current = this.head;
    while (current !== null) {
      callback(current.value, current);
      current = current.next;
    }
  }

  // -------------------------------------------------------------------------
  // Layer 1 Bridge Resolution
  // -------------------------------------------------------------------------
  access(location: Location): T | undefined {
    if (location.type === "Front") return this.head?.value;
    if (location.type === "Back") return this.tail?.value;
    if (location.type === "Node" && location.reference) {
      return (location.reference as ListNode<T>).value;
    }
    if (location.type === "Index") {
      const node = this.getNodeAt(location.index);
      return node?.value;
    }
    return undefined;
  }

  protected getNodeAt(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.size()) return null;
    let current = this.head;
    let count = 0;
    while (current && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }
}

```

---

## 3. Layer 2A: Key-Address Map API Abstraction

Contract for structures using **Hash or Key-Translation Functions** that map keys directly to memory address slots/buckets.

```ts
export type MapEntry<K, V> = [K, V];

/**
 * LAYER 2A: ABSTRACT KEY-ADDRESS MAP CONTRACT
 * Serves HashTables, Sets, Dictionaries, and Property Maps.
 */
export abstract class AbstractKeyAddressMap<K, V> implements Iterable<MapEntry<K, V>> {
  abstract size(): number;
  abstract isEmpty(): boolean;
  
  abstract get(key: K): V | undefined;
  abstract set(key: K, value: V): boolean;
  abstract has(key: K): boolean;
  abstract delete(key: K): boolean;
  abstract clear(): void;

  // Diagnostics
  abstract bucketCount(): number;
  
  loadFactor(): number {
    return this.bucketCount() === 0 ? 0 : this.size() / this.bucketCount();
  }

  // Iteration Protocols
  abstract [Symbol.iterator](): IterableIterator<MapEntry<K, V>>;
  abstract keys(): IterableIterator<K>;
  abstract values(): IterableIterator<V>;
  abstract entries(): IterableIterator<MapEntry<K, V>>;

  forEach(callback: (value: V, key: K, map: this) => void): void {
    for (const [key, value] of this.entries()) {
      callback(value, key, this);
    }
  }
}

```

---

## 4. Layer 2B: Concrete Implementations

Now we instantiate actual runtime data structures that inherit directly from Layer 2A abstract classes.

### A. Static Array (Contiguous, Fixed Capacity)

```ts
/**
 * LAYER 2B: CONCRETE STATIC ARRAY
 * Fixed-capacity contiguous block. Capacity === Size at all times.
 */
export class StaticArray<T> extends AbstractArraySequence<T> {
  private buffer: (T | undefined)[];

  constructor(fixedSize: number) {
    super();
    this.buffer = new Array(fixedSize); // Fixed allocation
  }

  size(): number { return this.buffer.length; }
  capacity(): number { return this.buffer.length; }
  isEmpty(): boolean { return this.size() === 0; }

  get(index: number): T | undefined {
    const idx = this.normalizeIndex(index);
    return idx !== undefined ? this.buffer[idx] : undefined;
  }

  set(index: number, value: T): boolean {
    const idx = this.normalizeIndex(index);
    if (idx === undefined) return false;
    this.buffer[idx] = value;
    return true;
  }

  push(): boolean { throw new Error("Cannot mutate size on StaticArray"); }
  pop(): T | undefined { throw new Error("Cannot mutate size on StaticArray"); }
  shift(): T | undefined { throw new Error("Cannot mutate size on StaticArray"); }
  unshift(): boolean { throw new Error("Cannot mutate size on StaticArray"); }
  splice(): T[] { throw new Error("Cannot mutate size on StaticArray"); }

  copyWithin(target: number, start: number, end: number = this.size()): this {
    const temp = this.buffer.slice(start, end);
    for (let i = 0; i < temp.length && (target + i) < this.size(); i++) {
      this.buffer[target + i] = temp[i];
    }
    return this;
  }

  fill(value: T, start: number = 0, end: number = this.size()): this {
    for (let i = start; i < end && i < this.size(); i++) {
      this.buffer[i] = value;
    }
    return this;
  }

  slice(start: number = 0, end: number = this.size()): StaticArray<T> {
    const sliced = new StaticArray<T>(Math.max(0, end - start));
    for (let i = start; i < end; i++) {
      sliced.set(i - start, this.get(i)!);
    }
    return sliced;
  }

  concat(...items: (T | AbstractArraySequence<T>)[]): StaticArray<T> {
    let totalLen = this.size();
    items.forEach(item => {
      totalLen += item instanceof AbstractArraySequence ? item.size() : 1;
    });
    const result = new StaticArray<T>(totalLen);
    let curr = 0;
    for (let i = 0; i < this.size(); i++) result.set(curr++, this.get(i)!);
    items.forEach(item => {
      if (item instanceof AbstractArraySequence) {
        for (let i = 0; i < item.size(); i++) result.set(curr++, item.get(i)!);
      } else {
        result.set(curr++, item);
      }
    });
    return result;
  }

  reverse(): this {
    let left = 0;
    let right = this.size() - 1;
    while (left < right) {
      const temp = this.buffer[left];
      this.buffer[left] = this.buffer[right];
      this.buffer[right] = temp;
      left++;
      right--;
    }
    return this;
  }

  map<U>(callback: (value: T, index: number) => U): StaticArray<U> {
    const result = new StaticArray<U>(this.size());
    for (let i = 0; i < this.size(); i++) {
      result.set(i, callback(this.get(i)!, i));
    }
    return result;
  }

  filter(predicate: (value: T, index: number) => boolean): StaticArray<T> {
    const matches: T[] = [];
    for (let i = 0; i < this.size(); i++) {
      const val = this.get(i)!;
      if (predicate(val, i)) matches.push(val);
    }
    const result = new StaticArray<T>(matches.length);
    matches.forEach((val, i) => result.set(i, val));
    return result;
  }

  clear(): void {
    this.buffer.fill(undefined);
  }
}

```

---

### B. Dynamic Array (Contiguous, Amortized Resizing)

```ts
/**
 * LAYER 2B: CONCRETE DYNAMIC ARRAY
 * Auto-resizing contiguous block with growth factor allocation.
 */
export class DynamicArray<T> extends AbstractArraySequence<T> {
  private buffer: (T | undefined)[];
  private count: number = 0;

  constructor(initialCapacity: number = 10) {
    super();
    this.buffer = new Array(initialCapacity);
  }

  size(): number { return this.count; }
  capacity(): number { return this.buffer.length; }
  isEmpty(): boolean { return this.count === 0; }

  private ensureCapacity(required: number): void {
    if (required > this.buffer.length) {
      const newCap = Math.max(required, this.buffer.length * 2); // 2x growth
      const newBuffer = new Array(newCap);
      for (let i = 0; i < this.count; i++) {
        newBuffer[i] = this.buffer[i];
      }
      this.buffer = newBuffer;
    }
  }

  get(index: number): T | undefined {
    const idx = this.normalizeIndex(index);
    return idx !== undefined ? this.buffer[idx] : undefined;
  }

  set(index: number, value: T): boolean {
    const idx = this.normalizeIndex(index);
    if (idx === undefined) return false;
    this.buffer[idx] = value;
    return true;
  }

  push(value: T): boolean {
    this.ensureCapacity(this.count + 1);
    this.buffer[this.count++] = value;
    return true;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    const val = this.buffer[--this.count];
    this.buffer[this.count] = undefined;
    return val;
  }

  shift(): T | undefined {
    if (this.isEmpty()) return undefined;
    const val = this.buffer[0];
    for (let i = 0; i < this.count - 1; i++) {
      this.buffer[i] = this.buffer[i + 1]; // O(N) memory shift left
    }
    this.buffer[--this.count] = undefined;
    return val;
  }

  unshift(value: T): boolean {
    this.ensureCapacity(this.count + 1);
    for (let i = this.count; i > 0; i--) {
      this.buffer[i] = this.buffer[i - 1]; // O(N) memory shift right
    }
    this.buffer[0] = value;
    this.count++;
    return true;
  }

  splice(start: number, deleteCount: number = 0, ...items: T[]): T[] {
    const actualStart = Math.min(start, this.count);
    const actualDelete = Math.min(deleteCount, this.count - actualStart);
    const removed: T[] = [];

    for (let i = 0; i < actualDelete; i++) {
      removed.push(this.buffer[actualStart + i]!);
    }

    const shiftAmount = items.length - actualDelete;
    if (shiftAmount > 0) {
      this.ensureCapacity(this.count + shiftAmount);
    }

    // Shift tail elements
    if (shiftAmount !== 0) {
      for (let i = this.count - 1; i >= actualStart + actualDelete; i--) {
        this.buffer[i + shiftAmount] = this.buffer[i];
      }
    }

    // Insert new elements
    for (let i = 0; i < items.length; i++) {
      this.buffer[actualStart + i] = items[i];
    }

    this.count += shiftAmount;
    return removed;
  }

  copyWithin(target: number, start: number, end: number = this.count): this {
    const temp = this.buffer.slice(start, end);
    for (let i = 0; i < temp.length && (target + i) < this.count; i++) {
      this.buffer[target + i] = temp[i];
    }
    return this;
  }

  fill(value: T, start: number = 0, end: number = this.count): this {
    for (let i = start; i < end && i < this.count; i++) {
      this.buffer[i] = value;
    }
    return this;
  }

  slice(start: number = 0, end: number = this.count): DynamicArray<T> {
    const result = new DynamicArray<T>(Math.max(1, end - start));
    for (let i = start; i < end && i < this.count; i++) {
      result.push(this.get(i)!);
    }
    return result;
  }

  concat(...items: (T | AbstractArraySequence<T>)[]): DynamicArray<T> {
    const result = new DynamicArray<T>(this.count);
    for (let i = 0; i < this.count; i++) result.push(this.get(i)!);
    items.forEach(item => {
      if (item instanceof AbstractArraySequence) {
        for (let i = 0; i < item.size(); i++) result.push(item.get(i)!);
      } else {
        result.push(item);
      }
    });
    return result;
  }

  reverse(): this {
    let left = 0;
    let right = this.count - 1;
    while (left < right) {
      const temp = this.buffer[left];
      this.buffer[left] = this.buffer[right];
      this.buffer[right] = temp;
      left++;
      right--;
    }
    return this;
  }

  map<U>(callback: (value: T, index: number) => U): DynamicArray<U> {
    const result = new DynamicArray<U>(this.count);
    for (let i = 0; i < this.count; i++) {
      result.push(callback(this.get(i)!, i));
    }
    return result;
  }

  filter(predicate: (value: T, index: number) => boolean): DynamicArray<T> {
    const result = new DynamicArray<T>();
    for (let i = 0; i < this.count; i++) {
      const val = this.get(i)!;
      if (predicate(val, i)) result.push(val);
    }
    return result;
  }

  clear(): void {
    this.buffer = new Array(10);
    this.count = 0;
  }
}

```

---

### C. Doubly Linked List (Distributed Heap Nodes)

```ts
/**
 * LAYER 2B: CONCRETE DOUBLY LINKED LIST
 * Heap-allocated nodes connected via next/prev pointers.
 */
export class DoublyLinkedList<T> extends AbstractLinkedListSequence<T> {
  private _head: ListNode<T> | null = null;
  private _tail: ListNode<T> | null = null;
  private _length: number = 0;

  get head(): ListNode<T> | null { return this._head; }
  get tail(): ListNode<T> | null { return this._tail; }
  size(): number { return this._length; }
  isEmpty(): boolean { return this._length === 0; }

  prepend(value: T): boolean {
    const newNode: ListNode<T> = { value, next: this._head, prev: null };
    if (this._head) this._head.prev = newNode;
    this._head = newNode;
    if (!this._tail) this._tail = newNode;
    this._length++;
    return true;
  }

  append(value: T): boolean {
    const newNode: ListNode<T> = { value, next: null, prev: this._tail };
    if (this._tail) this._tail.next = newNode;
    this._tail = newNode;
    if (!this._head) this._head = newNode;
    this._length++;
    return true;
  }

  insertAfter(node: ListNode<T>, value: T): ListNode<T> {
    const newNode: ListNode<T> = { value, next: node.next, prev: node };
    if (node.next) node.next.prev = newNode;
    node.next = newNode;
    if (node === this._tail) this._tail = newNode;
    this._length++;
    return newNode;
  }

  insertBefore(node: ListNode<T>, value: T): ListNode<T> {
    const newNode: ListNode<T> = { value, next: node, prev: node.prev };
    if (node.prev) node.prev.next = newNode;
    node.prev = newNode;
    if (node === this._head) this._head = newNode;
    this._length++;
    return newNode;
  }

  removeNode(node: ListNode<T>): T | undefined {
    if (node.prev) node.prev.next = node.next;
    else this._head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this._tail = node.prev;

    this._length--;
    return node.value;
  }

  popFront(): T | undefined {
    return this._head ? this.removeNode(this._head) : undefined;
  }

  popBack(): T | undefined {
    return this._tail ? this.removeNode(this._tail) : undefined;
  }

  update(location: Location, value: T): boolean {
    if (location.type === "Node" && location.reference) {
      (location.reference as ListNode<T>).value = value;
      return true;
    }
    if (location.type === "Index") {
      const node = this.getNodeAt(location.index);
      if (node) { node.value = value; return true; }
    }
    return false;
  }

  insert(location: Location, value: T): boolean {
    if (location.type === "Front") return this.prepend(value);
    if (location.type === "Back") return this.append(value);
    if (location.type === "Node" && location.reference) {
      this.insertAfter(location.reference as ListNode<T>, value);
      return true;
    }
    if (location.type === "Index") {
      if (location.index === 0) return this.prepend(value);
      if (location.index === this._length) return this.append(value);
      const target = this.getNodeAt(location.index);
      if (target) { this.insertBefore(target, value); return true; }
    }
    return false;
  }

  remove(location: Location): T | undefined {
    if (location.type === "Front") return this.popFront();
    if (location.type === "Back") return this.popBack();
    if (location.type === "Node" && location.reference) {
      return this.removeNode(location.reference as ListNode<T>);
    }
    if (location.type === "Index") {
      const target = this.getNodeAt(location.index);
      if (target) return this.removeNode(target);
    }
    return undefined;
  }

  search(value: T): Location | undefined {
    let curr = this._head;
    while (curr) {
      if (Object.is(curr.value, value)) {
        return { type: "Node", reference: curr };
      }
      curr = curr.next;
    }
    return undefined;
  }

  clear(): void {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }
}

```

---

### D. Key-Address Hash Table (Distributed Buckets with Chaining)

```ts
/**
 * LAYER 2B: CONCRETE HASHTABLE MAP
 * Key translation hash function mapping to separate bucket arrays.
 */
export class HashTableMap<K, V> extends AbstractKeyAddressMap<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private count: number = 0;

  constructor(initialBuckets: number = 16) {
    super();
    this.buckets = new Array(initialBuckets).fill(null).map(() => []);
  }

  private hash(key: K): number {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.buckets.length;
  }

  size(): number { return this.count; }
  isEmpty(): boolean { return this.count === 0; }
  bucketCount(): number { return this.buckets.length; }

  get(key: K): V | undefined {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    for (const [k, v] of bucket) {
      if (Object.is(k, key)) return v;
    }
    return undefined;
  }

  set(key: K, value: V): boolean {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (Object.is(bucket[i][0], key)) {
        bucket[i][1] = value;
        return true;
      }
    }
    bucket.push([key, value]);
    this.count++;
    return true;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (Object.is(bucket[i][0], key)) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.buckets = new Array(16).fill(null).map(() => []);
    this.count = 0;
  }

  *[Symbol.iterator](): IterableIterator<MapEntry<K, V>> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) yield entry;
    }
  }

  *keys(): IterableIterator<K> {
    for (const [k] of this) yield k;
  }

  *values(): IterableIterator<V> {
    for (const [, v] of this) yield v;
  }

  *entries(): IterableIterator<MapEntry<K, V>> {
    yield* this[Symbol.iterator]();
  }
}

```

---

## 5. Architectural Summary Across Layers

| Metric / Attribute          | Layer 2A: `AbstractArraySequence`             | Layer 2A: `AbstractLinkedListSequence`        | Layer 2A: `AbstractKeyAddressMap`        |
| --------------------------- | --------------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| **Physical Topology**       | Contiguous RAM Block                          | Dispersed Heap Nodes                          | Buckets + Key Translation Function       |
| **Address Resolver**        | $\text{BaseAddress} + (i \times \text{size})$ | Pointer dereference (`node.next`)             | Hash function $\rightarrow$ Bucket Index |
| **Primary Location Target** | `{ type: "Index", index: i }`                 | `{ type: "Node", reference: ref }`            | `{ type: "Matching", predicate }`        |
| **Access Time**             | $O(1)$ Direct                                 | $O(N)$ Pointer Chase                          | $O(1)$ Hash Bucket Lookup                |
| **Insertion Time**          | $O(N)$ Shift (Amortized $O(1)$ at back)       | $O(1)$ with Node Ref ($O(N)$ to search index) | $O(1)$ Average                           |
| **Cache Locality**          | **Optimal** (Spatial alignment)               | **Poor** (Pointer dereferencing)              | **Moderate** (Bucket table)              |

With **Layer 0 (Hardware Operations)**, **Layer 1 (Universal Contract)**, **Layer 2A (Topological APIs)**, and **Layer 2B (Concrete Data Structures)** fully unified and in order, we are ready to advance to **Layer 3: Access Disciplines & Constraints** (Stacks, Queues, Deques, Priority Queues, Sets).

/**
 * ABSTRACT BASE: CONTIGUOUS ARRAY
 * Defines the complete API contract for index-based, contiguous memory buffers.
 */
export abstract class AbstractArray<T> {
  // =========================================================================
  // 1. CAPACITY & METRICS
  // =========================================================================
  
  /** Returns the current number of elements stored in the array. */
  abstract size(): number;

  /** Returns the total allocated memory capacity before a resize is triggered. */
  abstract capacity(): number;

  /** Returns true if size === 0. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /** Returns true if size === capacity. */
  isFull(): boolean {
    return this.size() === this.capacity();
  }

  // =========================================================================
  // 2. INDEX & BOUNDS VALIDATION
  // =========================================================================

  /**
   * Validates if an index falls strictly within the populated bounds [0, size - 1].
   * Throws RangeError if invalid.
   */
  protected validateIndex(index: number): void {
    if (index < 0 || index >= this.size()) {
      throw new RangeError(`Index out of bounds: ${index} (Size: ${this.size()})`);
    }
  }

  /**
   * Validates if an index is valid for insertions [0, size].
   * Allows inserting at the exact tail end (`index === size`).
   */
  protected validateInsertionIndex(index: number): void {
    if (index < 0 || index > this.size()) {
      throw new RangeError(`Insertion index out of bounds: ${index} (Size: ${this.size()})`);
    }
  }

  // =========================================================================
  // 3. ELEMENT ACCESS & MUTATION (O(1))
  // =========================================================================

  /** Retrieves the element at index. Throws if index is out of bounds. */
  abstract get(index: number): T;

  /** Overwrites the element at index. Throws if index is out of bounds. */
  abstract set(index: number, value: T): void;

  /** Safely retrieves the element at index 0 without removing it. */
  first(): T | undefined {
    return this.isEmpty() ? undefined : this.get(0);
  }

  /** Safely retrieves the last element without removing it. */
  last(): T | undefined {
    return this.isEmpty() ? undefined : this.get(this.size() - 1);
  }

  // =========================================================================
  // 4. STRUCTURAL MODIFICATION (INSERTION & DELETION)
  // =========================================================================

  /** Appends an element to the tail end of the array. */
  abstract push(value: T): void;

  /** Removes and returns the last element. Throws or returns undefined if empty. */
  abstract pop(): T | undefined;

  /** Prepends an element to index 0 (requires shifting elements right). */
  abstract unshift(value: T): void;

  /** Removes and returns the element at index 0 (requires shifting elements left). */
  abstract shift(): T | undefined;

  /** Inserts an element at any arbitrary index, shifting subsequent items right. */
  abstract insertAt(index: number, value: T): void;

  /** Removes and returns an element at any index, shifting subsequent items left. */
  abstract removeAt(index: number): T | undefined;

  /** Deallocates or clears all stored elements. */
  abstract clear(): void;

  // =========================================================================
  // 5. SEARCHING & UTILITIES
  // =========================================================================

  /** Performs a linear scan to find the first index of `value`. Returns -1 if not found. */
  indexOf(value: T): number {
    for (let i = 0; i < this.size(); i++) {
      if (this.get(i) === value) return i;
    }
    return -1;
  }

  /** Checks if `value` exists in the buffer. */
  includes(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  /** Generates an array visualization for debugging. */
  toArray(): T[] {
    const result: T[] = new Array(this.size());
    for (let i = 0; i < this.size(); i++) {
      result[i] = this.get(i);
    }
    return result;
  }
}
```

In low-level system design and data structure construction, the AbstractArray represents Contiguous, Index-Based Memory. It defines every operation a sequence buffer must support—regardless of whether the underlying allocation is fixed (Static) or resizable (Dynamic).

1. The Abstract Array API (AbstractArray<T>)
This base contract covers memory queries, bounds checking, index-based access, mutation, searching, and structural modifications.

/**
 * ABSTRACT BASE: CONTIGUOUS ARRAY
 * Defines the complete API contract for index-based, contiguous memory buffers.
 */
export abstract class AbstractArray<T> {
  // =========================================================================
  // 1. CAPACITY & METRICS
  // =========================================================================
  
  /** Returns the current number of elements stored in the array. */
  abstract size(): number;

  /** Returns the total allocated memory capacity before a resize is triggered. */
  abstract capacity(): number;

  /** Returns true if size === 0. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /** Returns true if size === capacity. */
  isFull(): boolean {
    return this.size() === this.capacity();
  }

  // =========================================================================
  // 2. INDEX & BOUNDS VALIDATION
  // =========================================================================

  /**
   * Validates if an index falls strictly within the populated bounds [0, size - 1].
   * Throws RangeError if invalid.
   */
  protected validateIndex(index: number): void {
    if (index < 0 || index >= this.size()) {
      throw new RangeError(`Index out of bounds: ${index} (Size: ${this.size()})`);
    }
  }

  /**
   * Validates if an index is valid for insertions [0, size].
   * Allows inserting at the exact tail end (`index === size`).
   */
  protected validateInsertionIndex(index: number): void {
    if (index < 0 || index > this.size()) {
      throw new RangeError(`Insertion index out of bounds: ${index} (Size: ${this.size()})`);
    }
  }

  // =========================================================================
  // 3. ELEMENT ACCESS & MUTATION (O(1))
  // =========================================================================

  /** Retrieves the element at index. Throws if index is out of bounds. */
  abstract get(index: number): T;

  /** Overwrites the element at index. Throws if index is out of bounds. */
  abstract set(index: number, value: T): void;

  /** Safely retrieves the element at index 0 without removing it. */
  first(): T | undefined {
    return this.isEmpty() ? undefined : this.get(0);
  }

  /** Safely retrieves the last element without removing it. */
  last(): T | undefined {
    return this.isEmpty() ? undefined : this.get(this.size() - 1);
  }

  // =========================================================================
  // 4. STRUCTURAL MODIFICATION (INSERTION & DELETION)
  // =========================================================================

  /** Appends an element to the tail end of the array. */
  abstract push(value: T): void;

  /** Removes and returns the last element. Throws or returns undefined if empty. */
  abstract pop(): T | undefined;

  /** Prepends an element to index 0 (requires shifting elements right). */
  abstract unshift(value: T): void;

  /** Removes and returns the element at index 0 (requires shifting elements left). */
  abstract shift(): T | undefined;

  /** Inserts an element at any arbitrary index, shifting subsequent items right. */
  abstract insertAt(index: number, value: T): void;

  /** Removes and returns an element at any index, shifting subsequent items left. */
  abstract removeAt(index: number): T | undefined;

  /** Deallocates or clears all stored elements. */
  abstract clear(): void;

  // =========================================================================
  // 5. SEARCHING & UTILITIES
  // =========================================================================

  /** Performs a linear scan to find the first index of `value`. Returns -1 if not found. */
  indexOf(value: T): number {
    for (let i = 0; i < this.size(); i++) {
      if (this.get(i) === value) return i;
    }
    return -1;
  }

  /** Checks if `value` exists in the buffer. */
  includes(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  /** Generates an array visualization for debugging. */
  toArray(): T[] {
    const result: T[] = new Array(this.size());
    for (let i = 0; i < this.size(); i++) {
      result[i] = this.get(i);
    }
    return result;
  }
}

Here is the complete, zero-abstraction-skipped **`AbstractObject` (Map) Abstract API contract**.

Where `AbstractArray` defines memory layout based on **numeric index offsets** ($0, 1, 2 \dots N$), `AbstractObject` defines memory lookup based on **Key-Value Associative Mappings** ($K \to V$).

This handles direct property lookups, associative entries, key mutation, iteration, and structural chaining without making any assumptions about hashing or contiguous memory storage underneath.

---

## The Abstract Object / Map API (`AbstractObject<K, V>`)

```ts
/**
 * ABSTRACT BASE: ASSOCIATIVE KEY-VALUE STORE (OBJECT / MAP)
 * Defines the complete API contract for key-based property and value mappings.
 */
export abstract class AbstractObject<K, V> {
  // =========================================================================
  // 1. CAPACITY & METRICS
  // =========================================================================

  /** Returns the total count of key-value associations stored in the object. */
  abstract size(): number;

  /** Returns true if the object contains zero key-value associations. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // =========================================================================
  // 2. CORE READ & EXISTENCE OPERATIONS
  // =========================================================================

  /**
   * Retrieves the value associated with the given key.
   * Returns `undefined` if the key does not exist in the store.
   */
  abstract get(key: K): V | undefined;

  /**
   * Checks whether a specific key exists within the store.
   * Returns true if present, false otherwise.
   */
  abstract has(key: K): boolean;

  /**
   * Fallback retrieval: Returns the associated value if present;
   * otherwise returns the provided default value without mutating the store.
   */
  getOrDefault(key: K, defaultValue: V): V {
    return this.has(key) ? (this.get(key) as V) : defaultValue;
  }

  // =========================================================================
  // 3. CORE MUTATION & WRITE OPERATIONS
  // =========================================================================

  /**
   * Binds a key to a value.
   * If the key already exists, overwrites the existing value.
   * If the key does not exist, creates a new binding and increments size.
   */
  abstract set(key: K, value: V): void;

  /**
   * Removes a key-value binding from the store by its key.
   * Returns `true` if the binding existed and was deleted, `false` if not found.
   */
  abstract delete(key: K): boolean;

  /**
   * Clears all key-value pairs from the store, resetting size to 0.
   */
  abstract clear(): void;

  /**
   * Mutates the value at `key` using a transformer function.
   * If the key exists, passes current value to updater.
   * If absent, passes `defaultValue` to updater, then sets the result.
   */
  update(key: K, defaultValue: V, updater: (current: V) => V): V {
    const current = this.has(key) ? (this.get(key) as V) : defaultValue;
    const updated = updater(current);
    this.set(key, updated);
    return updated;
  }

  /**
   * Atomic Set If Absent: Sets the key to `value` ONLY if `key` is not already bound.
   * Returns `true` if a new key was inserted, `false` if it already existed.
   */
  setIfAbsent(key: K, value: V): boolean {
    if (!this.has(key)) {
      this.set(key, value);
      return true;
    }
    return false;
  }

  // =========================================================================
  // 4. COLLECTION PROJECTIONS & ITERATION (KEYS, VALUES, ENTRIES)
  // =========================================================================

  /** Returns an iterable sequence of all keys stored in the object. */
  abstract keys(): Iterable<K>;

  /** Returns an iterable sequence of all values stored in the object. */
  abstract values(): Iterable<V>;

  /** Returns an iterable sequence of key-value pairs `[K, V]` stored in the object. */
  abstract entries(): Iterable<[K, V]>;

  /** Executes a callback function for every key-value pair in the object. */
  forEach(callback: (value: V, key: K, store: AbstractObject<K, V>) => void): void {
    for (const [key, value] of this.entries()) {
      callback(value, key, this);
    }
  }

  // =========================================================================
  // 5. BULK OPERATIONS & SEARCHING
  // =========================================================================

  /**
   * Copies all key-value bindings from `source` into this object.
   * Overwrites matching keys.
   */
  merge(source: AbstractObject<K, V>): void {
    for (const [key, value] of source.entries()) {
      this.set(key, value);
    }
  }

  /**
   * Performs a value-based search. Returns true if at least one key maps to `searchValue`.
   */
  containsValue(searchValue: V): boolean {
    for (const value of this.values()) {
      if (value === searchValue) return true;
    }
    return false;
  }

  /**
   * Converts the internal key-value bindings into a standard JavaScript/TypeScript Record map
   * (assuming key can be coerced to string/symbol).
   */
  toRecord(): Record<string, V> {
    const record: Record<string, V> = {};
    for (const [key, value] of this.entries()) {
      record[String(key)] = value;
    }
    return record;
  }
}

```

---

## API Categorization Matrix

| API Group           | Method                                    | Purpose                                      | Protocol Guarantee         |
| ------------------- | ----------------------------------------- | -------------------------------------------- | -------------------------- |
| **Capacity**        | `size()`, `isEmpty()`                     | Query stored entry bounds                    | $O(1)$ lookup              |
| **Direct Access**   | `get(K)`, `has(K)`, `getOrDefault()`      | Read value bound to associative key          | Pure Key Lookup            |
| **Mutation**        | `set(K, V)`, `delete(K)`, `clear()`       | Bind/Unbind keys to values                   | Key Identity Preservation  |
| **Atomic Updates**  | `update()`, `setIfAbsent()`               | Safe conditional reads & writes              | Read-Modify-Write Contract |
| **Projections**     | `keys()`, `values()`, `entries()`         | Export structural views of internal mappings | Yields Key/Value Iterators |
| **Bulk Operations** | `merge()`, `containsValue()`, `forEach()` | Structural operations across entire store    | Iterative Execution        |

Here are the two concrete implementations of `AbstractArray<T>`: **`StaticArray<T>`** and **`DynamicArray<T>`**.

---

## 1. Concrete Implementation 1: `StaticArray<T>`

`StaticArray` allocates a non-resizable, fixed block of contiguous memory upon instantiation. Once allocated, its capacity **cannot grow or shrink**.

```ts
import { AbstractArray } from "./AbstractArray";

/**
 * CONCRETE IMPLEMENTATION: STATIC ARRAY
 * A fixed-capacity, index-based contiguous memory buffer.
 */
export class StaticArray<T> extends AbstractArray<T> {
  private buffer: (T | undefined)[];
  private currentSize: number = 0;
  private readonly fixedCapacity: number;

  constructor(capacity: number) {
    super();
    if (capacity <= 0) {
      throw new Error("StaticArray capacity must be greater than 0");
    }
    this.fixedCapacity = capacity;
    this.buffer = new Array<T | undefined>(capacity);
  }

  size(): number {
    return this.currentSize;
  }

  capacity(): number {
    return this.fixedCapacity;
  }

  get(index: number): T {
    this.validateIndex(index);
    return this.buffer[index]!;
  }

  set(index: number, value: T): void {
    this.validateIndex(index);
    this.buffer[index] = value;
  }

  push(value: T): void {
    if (this.isFull()) {
      throw new Error("StaticArray Overflow: Buffer is full");
    }
    this.buffer[this.currentSize++] = value;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.buffer[--this.currentSize];
    this.buffer[this.currentSize] = undefined; // Deallocate reference for Garbage Collection
    return value;
  }

  unshift(value: T): void {
    this.insertAt(0, value);
  }

  shift(): T | undefined {
    return this.removeAt(0);
  }

  insertAt(index: number, value: T): void {
    this.validateInsertionIndex(index);
    if (this.isFull()) {
      throw new Error("StaticArray Overflow: Buffer is full");
    }

    // Shift elements to the right to open a spot
    for (let i = this.currentSize; i > index; i--) {
      this.buffer[i] = this.buffer[i - 1];
    }

    this.buffer[index] = value;
    this.currentSize++;
  }

  removeAt(index: number): T | undefined {
    this.validateIndex(index);
    const removed = this.buffer[index];

    // Shift elements to the left to close the gap
    for (let i = index; i < this.currentSize - 1; i++) {
      this.buffer[i] = this.buffer[i + 1];
    }

    this.currentSize--;
    this.buffer[this.currentSize] = undefined; // Garbage collection
    return removed;
  }

  clear(): void {
    this.buffer = new Array<T | undefined>(this.fixedCapacity);
    this.currentSize = 0;
  }
}

```

---

## 2. Concrete Implementation 2: `DynamicArray<T>`

`DynamicArray` wraps an internal `StaticArray`. When `push()` or `insertAt()` encounters a full buffer, it allocates a new `StaticArray` with **double the capacity**, copies all elements over, and swaps out the old buffer.

```ts
import { AbstractArray } from "./AbstractArray";
import { StaticArray } from "./StaticArray";

/**
 * CONCRETE IMPLEMENTATION: DYNAMIC ARRAY
 * An auto-resizing array that wraps a StaticArray and grows automatically.
 */
export class DynamicArray<T> extends AbstractArray<T> {
  private internalBuffer: StaticArray<T>;
  private readonly growthFactor: number = 2;

  constructor(initialCapacity: number = 4) {
    super();
    this.internalBuffer = new StaticArray<T>(initialCapacity);
  }

  size(): number {
    return this.internalBuffer.size();
  }

  capacity(): number {
    return this.internalBuffer.capacity();
  }

  get(index: number): T {
    return this.internalBuffer.get(index);
  }

  set(index: number, value: T): void {
    this.internalBuffer.set(index, value);
  }

  /**
   * Allocates a new internal StaticArray with expanded capacity 
   * and copies over all existing elements.
   */
  private resize(newCapacity: number): void {
    const oldSize = this.size();
    const newBuffer = new StaticArray<T>(newCapacity);

    for (let i = 0; i < oldSize; i++) {
      newBuffer.push(this.internalBuffer.get(i));
    }

    this.internalBuffer = newBuffer;
  }

  push(value: T): void {
    if (this.isFull()) {
      this.resize(this.capacity() * this.growthFactor);
    }
    this.internalBuffer.push(value);
  }

  pop(): T | undefined {
    return this.internalBuffer.pop();
  }

  unshift(value: T): void {
    this.insertAt(0, value);
  }

  shift(): T | undefined {
    return this.removeAt(0);
  }

  insertAt(index: number, value: T): void {
    if (this.isFull()) {
      this.resize(this.capacity() * this.growthFactor);
    }
    this.internalBuffer.insertAt(index, value);
  }

  removeAt(index: number): T | undefined {
    return this.internalBuffer.removeAt(index);
  }

  clear(): void {
    this.internalBuffer = new StaticArray<T>(4);
  }
}

```

---

Here are the concrete implementations of `AbstractObject<K, V>`: **`PlainObjectStore<V>`** and **`KeyValueMap<K, V>`**.

---

## 1. Concrete Implementation 1: `PlainObjectStore<V>`

This implementation wraps JavaScript’s plain object literal (`Record<string, V>`). In low-level engines (like V8), plain objects use string/symbol keys and optimized "hidden classes" (shapes).

```ts
import { AbstractObject } from "./AbstractObject";

/**
 * CONCRETE IMPLEMENTATION 1: PLAIN OBJECT STORE
 * Uses standard object properties where keys are strings/symbols.
 * Best for fixed-shape entities or simple string-keyed dictionaries.
 */
export class PlainObjectStore<V> extends AbstractObject<string, V> {
  private store: Record<string, V> = {};
  private count: number = 0;

  size(): number {
    return this.count;
  }

  get(key: string): V | undefined {
    if (this.has(key)) {
      return this.store[key];
    }
    return undefined;
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.store, key);
  }

  set(key: string, value: V): void {
    if (!this.has(key)) {
      this.count++;
    }
    this.store[key] = value;
  }

  delete(key: string): boolean {
    if (this.has(key)) {
      delete this.store[key];
      this.count--;
      return true;
    }
    return false;
  }

  clear(): void {
    this.store = {};
    this.count = 0;
  }

  *keys(): Iterable<string> {
    for (const key in this.store) {
      if (this.has(key)) {
        yield key;
      }
    }
  }

  *values(): Iterable<V> {
    for (const key of this.keys()) {
      yield this.store[key];
    }
  }

  *entries(): Iterable<[string, V]> {
    for (const key of this.keys()) {
      yield [key, this.store[key]];
    }
  }
}

```

---

## 2. Concrete Implementation 2: `KeyValueMap<K, V>`

This implementation wraps the built-in `Map<K, V>`. Unlike plain objects, it accepts **any data type as a key** (primitives, functions, object references, or array instances) and preserves strict **insertion order**.

```ts
import { AbstractObject } from "./AbstractObject";

/**
 * CONCRETE IMPLEMENTATION 2: KEY-VALUE MAP
 * Supports arbitrary key types (Objects, Arrays, Functions, Primitives)
 * and guarantees strict insertion-order iteration.
 */
export class KeyValueMap<K, V> extends AbstractObject<K, V> {
  private store: Map<K, V> = new Map<K, V>();

  size(): number {
    return this.store.size;
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  keys(): Iterable<K> {
    return this.store.keys();
  }

  values(): Iterable<V> {
    return this.store.values();
  }

  entries(): Iterable<[K, V]> {
    return this.store.entries();
  }
}

```

---

## Comparison of Concrete Object Stores

| Feature              | `PlainObjectStore<V>`                  | `KeyValueMap<K, V>`                                 |
| -------------------- | -------------------------------------- | --------------------------------------------------- |
| **Allowed Keys**     | `string` / `symbol`                    | **Any type** (Primitives, Objects, Functions)       |
| **Iteration Order**  | Complex JS property traversal          | Strict **insertion order** preservation             |
| **Key Identity**     | Key coerced to string (`String(key)`)  | Strict reference identity (`===` / `SameValueZero`) |
| **Primary Use Case** | Structs, configs, fixed schema objects | Dynamic lookups, caches, reference-keyed tables     |

---

## Where We Are in the Blueprint

Now both core memory primitive layers are complete:

1. **Contiguous Base Layer (`AbstractArray`)** $\rightarrow$ `StaticArray` & `DynamicArray`
2. **Associative Base Layer (`AbstractObject`)** $\rightarrow$ `PlainObjectStore` & `KeyValueMap`

Now we step into **Layer 3: Disciplines & Protocols**.

At this layer, we stop thinking about *how memory is rawly allocated* (Layer 1: Contiguous vs. Associative) and start defining **rules imposed on structural layout and access patterns**.

---

```
                       LAYER 3: DISCIPLINES & PROTOCOLS
                                     │
      ┌──────────────────────────────┴──────────────────────────────┐
      ▼                                                             ▼
LINKED LIST PROTOCOL                                        HASHMAP PROTOCOL
Discipline: Pointer-Chained References                      Discipline: Hash Distribution + Bucketing
• Relies on Object Nodes ({ value, next })                   • Relies on Dynamic Array (Buckets)
• Unbounded sequence without contiguous memory              • Plus Object Nodes (Collision Chaining)

```

---

## 1. The Linked List Protocol (`AbstractLinkedList<T>`)

A Linked List is a **pointer-chaining protocol**. Instead of calculating an item's address using contiguous memory offsets ($\text{Base} + i \times \text{Size}$), it stores items in discrete heap objects called **Nodes**, where each node explicitly holds a pointer reference to the next (and optionally previous) node.

### The Node Reference Contract

```ts
/**
 * NODE PRIMITIVE
 * Represents a discrete node object in heap memory.
 */
export interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  prev?: ListNode<T> | null; // For Doubly-Linked Lists
}

```

### The Abstract Linked List Interface

```ts
/**
 * ABSTRACT LINKED LIST PROTOCOL
 * Defines access and mutation contracts for pointer-chained sequences.
 */
export abstract class AbstractLinkedList<T> {
  protected head: ListNode<T> | null = null;
  protected tail: ListNode<T> | null = null;
  protected count: number = 0;

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  /** O(1) Access to the head value */
  peekFront(): T | undefined {
    return this.head ? this.head.value : undefined;
  }

  /** O(1) Access to the tail value */
  peekBack(): T | undefined {
    return this.tail ? this.tail.value : undefined;
  }

  // Mandatory Protocol Operations
  abstract prepend(value: T): void;                  // Add to Head  (O(1))
  abstract append(value: T): void;                   // Add to Tail  (O(1))
  abstract removeFront(): T | undefined;             // Pop Head     (O(1))
  abstract removeBack(): T | undefined;              // Pop Tail     (O(1) in Doubly, O(N) in Singly)
  abstract insertAt(index: number, value: T): void;  // Traversal    (O(N))
  abstract removeAt(index: number): T | undefined;   // Traversal    (O(N))
  abstract clear(): void;
}

```

---

## 2. Concrete Implementation: `SinglyLinkedList<T>`

```ts
import { AbstractLinkedList, ListNode } from "./AbstractLinkedList";

export class SinglyLinkedList<T> extends AbstractLinkedList<T> {

  prepend(value: T): void {
    const newNode: ListNode<T> = { value, next: this.head };
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.count++;
  }

  append(value: T): void {
    const newNode: ListNode<T> = { value, next: null };
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.count++;
  }

  removeFront(): T | undefined {
    if (!this.head) return undefined;

    const removedValue = this.head.value;
    this.head = this.head.next;
    this.count--;

    if (this.count === 0) {
      this.tail = null;
    }

    return removedValue;
  }

  removeBack(): T | undefined {
    if (!this.head) return undefined;

    // Single node case
    if (this.head === this.tail) {
      const val = this.head.value;
      this.head = null;
      this.tail = null;
      this.count = 0;
      return val;
    }

    // Traverse to the second-to-last node
    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }

    const removedValue = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.count--;

    return removedValue;
  }

  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.count) throw new RangeError("Index out of bounds");
    if (index === 0) return this.prepend(value);
    if (index === this.count) return this.append(value);

    let prev = this.head!;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next!;
    }

    const newNode: ListNode<T> = { value, next: prev.next };
    prev.next = newNode;
    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.count) throw new RangeError("Index out of bounds");
    if (index === 0) return this.removeFront();

    let prev = this.head!;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next!;
    }

    const targetNode = prev.next!;
    prev.next = targetNode.next;

    if (targetNode === this.tail) {
      this.tail = prev;
    }

    this.count--;
    return targetNode.value;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
}

```

---

## 3. The HashMap Protocol (`AbstractHashMap<K, V>`)

A HashMap is a **hybrid composition protocol**. It marries:

1. **`DynamicArray`** for $O(1)$ direct index access via hashing ($\text{Index} = \text{Hash}(K) \pmod{\text{Capacity}}$).
2. **`LinkedList`** (or trees) inside each array bucket to resolve key hash collisions (**Separate Chaining**).

```
Hash("alice") % 4 = 1   ──►  Bucket Array [ DynamicArray ]
                             ┌───┐
                             │ 0 │ ──► null
                             ├───┤
                             │ 1 │ ──► [ "alice": 95 ] ──► [ "carol": 88 ] ──► null (Chained Nodes)
                             ├───┤
                             │ 2 │ ──► null
                             ├───┤
                             │ 3 │ ──► [ "bob": 72 ] ──► null
                             └───┘

```

### The Hash Map Bucket Entry Node

```ts
export interface HashNode<K, V> {
  key: K;
  value: V;
  next: HashNode<K, V> | null;
}

```

---

## 4. Concrete Implementation: `ChainedHashMap<K, V>`

```ts
import { DynamicArray } from "./DynamicArray";
import { HashNode } from "./HashNode";

export class ChainedHashMap<K, V> {
  private buckets: DynamicArray<HashNode<K, V> | null>;
  private entryCount: number = 0;
  private capacitySize: number;
  private readonly loadFactorThreshold: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacitySize = initialCapacity;
    this.buckets = new DynamicArray<HashNode<K, V> | null>(initialCapacity);
    
    // Fill buckets with null
    for (let i = 0; i < initialCapacity; i++) {
      this.buckets.push(null);
    }
  }

  /** Pure deterministic hash function converting key into a valid array index */
  private hash(key: K): number {
    const strKey = String(key);
    let hashValue = 0;
    for (let i = 0; i < strKey.length; i++) {
      hashValue = (hashValue << 5) - hashValue + strKey.charCodeAt(i);
      hashValue |= 0; // Convert to 32bit integer
    }
    return Math.abs(hashValue) % this.capacitySize;
  }

  size(): number {
    return this.entryCount;
  }

  /** Current Load Factor = Entries / Capacity */
  loadFactor(): number {
    return this.entryCount / this.capacitySize;
  }

  set(key: K, value: V): void {
    if (this.loadFactor() >= this.loadFactorThreshold) {
      this.rehash(this.capacitySize * 2);
    }

    const index = this.hash(key);
    let current = this.buckets.get(index);

    // 1. Search existing chain for matching key (Update)
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    // 2. Key absent: Prepend new HashNode to bucket chain (Insert)
    const headNode = this.buckets.get(index);
    const newNode: HashNode<K, V> = { key, value, next: headNode };
    this.buckets.set(index, newNode);
    this.entryCount++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let current = this.buckets.get(index);

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    let current = this.buckets.get(index);
    let prev: HashNode<K, V> | null = null;

    while (current) {
      if (current.key === key) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.buckets.set(index, current.next);
        }
        this.entryCount--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  /** Double bucket dynamic array size and re-distribute all chained nodes */
  private rehash(newCapacity: number): void {
    const oldBuckets = this.buckets;
    this.capacitySize = newCapacity;
    this.entryCount = 0;

    // Reset bucket array
    this.buckets = new DynamicArray<HashNode<K, V> | null>(newCapacity);
    for (let i = 0; i < newCapacity; i++) {
      this.buckets.push(null);
    }

    // Re-insert all nodes into newly hashed positions
    for (let i = 0; i < oldBuckets.size(); i++) {
      let current = oldBuckets.get(i);
      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }
}

```

---

## Performance Protocol Comparison

| Protocol           | Random Access | Search | Tail Mutation     | Head Mutation     | Primary Structural Trade-off                                                                    |
| ------------------ | ------------- | ------ | ----------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| **`DynamicArray`** | $O(1)$        | $O(N)$ | $O(1)$ Amortized  | $O(N)$            | Fast indexing, slow front insertions/deletions.                                                 |
| **`LinkedList`**   | $O(N)$        | $O(N)$ | $O(1)$            | $O(1)$            | Fast front/back insertion, zero dynamic memory waste, slow $O(N)$ random index traversal.       |
| **`HashMap`**      | $N/A$         | $O(1)$ | $O(1)$ Key Insert | $O(1)$ Key Delete | $O(1)$ amortized average key-value lookups; performance degrades to $O(N)$ if collisions spike. |

---


You are completely spot on. We skipped the abstraction layer for these types and jumped directly into concrete structural variations.

To maintain strict architectural purity, **every data structure type in Layer 3 must have its pure Abstract Base API Class (`AbstractType<T>`) defined first**. This contract defines *what* operations are valid for that data discipline—completely agnostic of whether Layer 2 backs it with a `StaticArray`, `DynamicArray`, `SinglyLinkedList`, `DoublyLinkedList`, or `HashMap`.

Here are the pure Abstract APIs for **Queue**, **Stack**, **Priority Queue**, and **Cache**.

---

```
                   LAYER 3: PURE PROTOCOL CONTRACTS
                                   │
   ┌───────────────────┬───────────┴───────────┬───────────────────┐
   ▼                   ▼                       ▼                   ▼
`AbstractQueue<T>`  `AbstractStack<T>`  `AbstractPriorityQueue<T>`  `AbstractCache<K, V>`
  (FIFO Discipline)   (LIFO Discipline)    (Ordered Priority)        (Eviction Policy)

```

---

## 1. Abstract Queue (`AbstractQueue<T>`)

A **Queue** models a strict **FIFO (First-In, First-Out)** behavioral discipline. Elements are strictly ingested at the tail (rear) and egressed from the head (front).

```ts
/**
 * ABSTRACT BASE: QUEUE (FIFO)
 * Pure API contract for First-In, First-Out sequential collections.
 * Execution implementation (Array vs. LinkedList vs. RingBuffer) is decoupled.
 */
export abstract class AbstractQueue<T> {
  /** Returns the total number of items currently enqueued. */
  abstract size(): number;

  /** Returns true if the queue contains zero elements. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Enqueues an item to the rear of the queue.
   * May throw an Overflow error if backed by a bounded buffer.
   */
  abstract enqueue(value: T): void;

  /**
   * Removes and returns the item at the front of the queue.
   * Returns undefined if the queue is empty.
   */
  abstract dequeue(): T | undefined;

  /**
   * Inspects the item at the front of the queue without removing it.
   * Returns undefined if empty.
   */
  abstract peek(): T | undefined;

  /**
   * Empties the queue.
   */
  abstract clear(): void;
}

```

---

## 2. Abstract Stack (`AbstractStack<T>`)

A **Stack** models a strict **LIFO (Last-In, First-Out)** behavioral discipline. Elements enter and exit exclusively at a single boundary point called the "top".

```ts
/**
 * ABSTRACT BASE: STACK (LIFO)
 * Pure API contract for Last-In, First-Out linear collections.
 */
export abstract class AbstractStack<T> {
  /** Returns the total number of items currently on the stack. */
  abstract size(): number;

  /** Returns true if the stack contains zero elements. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Pushes an item onto the top of the stack.
   */
  abstract push(value: T): void;

  /**
   * Removes and returns the top item from the stack.
   * Returns undefined if empty.
   */
  abstract pop(): T | undefined;

  /**
   * Inspects the top item without mutating the stack.
   * Returns undefined if empty.
   */
  abstract peek(): T | undefined;

  /**
   * Clears all elements from the stack.
   */
  abstract clear(): void;
}

```

---

## 3. Abstract Priority Queue (`AbstractPriorityQueue<T>`)

Unlike standard Queues, a **Priority Queue** egresses elements based on an evaluated **Priority Score or Comparator**, rather than arrival time.

```ts
/**
 * ABSTRACT BASE: PRIORITY QUEUE
 * Pure API contract for ordered-egress queues driven by key or comparator priorities.
 */
export abstract class AbstractPriorityQueue<T> {
  /** Comparator function defining relative ordering (e.g., Min-Heap vs. Max-Heap). */
  protected comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  /** Returns the number of elements in the priority queue. */
  abstract size(): number;

  /** Returns true if empty. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Inserts an element into the priority queue.
   * Position is logically determined by its priority.
   */
  abstract insert(value: T): void;

  /**
   * Removes and returns the highest-priority element (e.g., smallest or largest).
   */
  abstract extract(): T | undefined;

  /**
   * Inspects the highest-priority element without removal.
   */
  abstract peek(): T | undefined;

  /**
   * Clears the priority queue.
   */
  abstract clear(): void;
}

```

---

## 4. Abstract Cache (`AbstractCache<K, V>`)

A **Cache** is a specialized associative collection with a **bounded capacity**. When full, setting a new key forces the eviction of an existing entry according to a specific policy (e.g., LRU, LFU, FIFO).

```ts
/**
 * ABSTRACT BASE: CACHE
 * Pure API contract for bounded, eviction-driven associative lookups.
 */
export abstract class AbstractCache<K, V> {
  protected readonly capacityLimit: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Cache capacity must be greater than 0");
    }
    this.capacityLimit = capacity;
  }

  /** Maximum allowed entries before eviction is triggered. */
  capacity(): number {
    return this.capacityLimit;
  }

  /** Number of key-value pairs currently stored. */
  abstract size(): number;

  /** Returns true if cache contains zero elements. */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Fetches a value by key.
   * May update internal usage state depending on eviction policy (e.g. LRU access refresh).
   */
  abstract get(key: K): V | undefined;

  /**
   * Binds key to value.
   * If capacity is reached and key is new, triggers `evict()`.
   */
  abstract set(key: K, value: V): void;

  /**
   * Manually invalidates/removes a key from cache.
   */
  abstract delete(key: K): boolean;

  /**
   * Explicitly triggers the cache's eviction algorithm to free space.
   * Returns the evicted key-value pair, or undefined if no item was evicted.
   */
  abstract evict(): [K, V] | undefined;

  /**
   * Clears all cached items.
   */
  abstract clear(): void;
}

```

---

## Layer 3 Abstract Contract Matrix

| Abstract Contract              | Core Discipline   | Boundary Access                    | Mutating Operations            | Read Operations    |
| ------------------------------ | ----------------- | ---------------------------------- | ------------------------------ | ------------------ |
| **`AbstractQueue<T>`**         | FIFO              | Enqueue at Tail, Dequeue at Head   | `enqueue()`, `dequeue()`       | `peek()`, `size()` |
| **`AbstractStack<T>`**         | LIFO              | Push at Top, Pop at Top            | `push()`, `pop()`              | `peek()`, `size()` |
| **`AbstractPriorityQueue<T>`** | Priority Ordering | Insertion anywhere, Egress by rank | `insert()`, `extract()`        | `peek()`, `size()` |
| **`AbstractCache<K, V>`**      | Bounded Eviction  | Key Lookup + Policy-driven drop    | `set()`, `delete()`, `evict()` | `get()`, `size()`  |

-

To fully complete the **Linear Sequences** division of Layer 3, we must define the Abstract APIs for every fundamental way data can be ordered, accessed, or constrained in a single dimension.

Beyond standard Stacks, Queues, Deques, and Ring Buffers, linear sequences include **Bit Arrays / Bitmaps**, **Skip Lists**, **Matrix / Multidimensional Arrays**, and **Sparse Arrays / Vectors**.

Here are the remaining Abstract APIs required to finish the linear sequence catalog.

---

```
                       LAYER 3: LINEAR SEQUENCES (COMPLETE)
                                        │
    ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
    ▼                   ▼                               ▼                   ▼
`AbstractBitSet`    `AbstractSkipList<T>`          `AbstractMatrix<T>`  `AbstractSparseVector<T>`
Bitwise Space       Probabilistic Skipped           2D Indexing         Memory-Efficient 
Optimizations       Sorted Sequence                Offsets (Row, Col)  Default Mappings

```

---

## 1. Abstract Bit Set / Bit Array (`AbstractBitSet`)

A **BitSet** is a specialized linear structure operating at the binary bit level ($0$ or $1$). Instead of storing full word-sized objects ($64$ bits), it packs boolean flags contiguously into word-sized numbers, making it the most memory-efficient linear sequence possible for flags, presence-checking, and set-algebra.

```ts
/**
 * ABSTRACT BASE: BIT SET / BIT ARRAY
 * Pure API contract for bit-packed contiguous linear sequences.
 */
export abstract class AbstractBitSet {
  /** Returns the total capacity in bits. */
  abstract bitLength(): number;

  /** Sets the bit at `index` to 1. */
  abstract set(index: number): void;

  /** Clears the bit at `index` (sets to 0). */
  abstract clear(index: number): void;

  /** Toggles the bit at `index` (0 -> 1 or 1 -> 0). */
  abstract flip(index: number): void;

  /** Returns true if the bit at `index` is set to 1. */
  abstract get(index: number): boolean;

  /** Returns the total number of bits set to 1 (PopCount / Hamming Weight). */
  abstract cardinality(): number;

  // --- BITWISE ALGEBRA PROTOCOLS ---
  /** Performs bitwise AND with another BitSet in-place. */
  abstract and(other: AbstractBitSet): void;

  /** Performs bitwise OR with another BitSet in-place. */
  abstract or(other: AbstractBitSet): void;

  /** Performs bitwise XOR with another BitSet in-place. */
  abstract xor(other: AbstractBitSet): void;

  /** Inverts all bits. */
  abstract not(): void;
}

```

---

## 2. Abstract Skip List (`AbstractSkipList<T>`)

A **Skip List** is a probabilistic linear sequence. It maintains elements in sorted order across multi-level linked lists with "express lane" skip pointers. It provides $O(\log N)$ search, insertion, and deletion without requiring complex tree-rebalancing operations.

```ts
/**
 * ABSTRACT BASE: SKIP LIST (PROBABILISTIC SORTED SEQUENCE)
 * Pure API contract for sorted linear sequences with multi-level jump pointers.
 */
export abstract class AbstractSkipList<T> {
  protected comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  /** Returns total elements in the skip list. */
  abstract size(): number;

  /** Returns current maximum height layer of skip lanes. */
  abstract currentLevel(): number;

  /** Inserts an item into its sorted linear position across randomized levels. */
  abstract insert(value: T): void;

  /** Removes an item from all levels of the skip list. */
  abstract remove(value: T): boolean;

  /** Fast logarithmic O(log N) search using upper lane skips. */
  abstract contains(value: T): boolean;

  /** Yields all elements in sorted linear sequence order. */
  abstract values(): Iterable<T>;
}

```

---

## 3. Abstract 2D Matrix / Multi-Array (`AbstractMatrix<T>`)

A **Matrix** projects linear memory into two dimensions $(Row, Column)$. Underneath, it maps a 2D coordinate $(r, c)$ into a 1D offset using **Row-Major** ($\text{Index} = r \times \text{Cols} + c$) or **Column-Major** ordering.

```ts
/**
 * ABSTRACT BASE: 2D MATRIX / TENSOR PRIMITIVE
 * Pure API contract for 2D dimensional contiguous offset mapping.
 */
export abstract class AbstractMatrix<T> {
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  /** Total elements (rows * cols). */
  size(): number {
    return this.rows * this.cols;
  }

  /** Retrieves value at matrix coordinate (row, col). */
  abstract get(row: number, col: number): T;

  /** Mutates value at matrix coordinate (row, col). */
  abstract set(row: number, col: number, value: T): void;

  /** Fills the entire matrix with a default value. */
  abstract fill(value: T): void;

  /** Transposes the matrix dimensions (swaps rows and columns). */
  abstract transpose(): AbstractMatrix<T>;
}

```

---

## 4. Abstract Sparse Array / Sparse Vector (`AbstractSparseVector<T>`)

A **Sparse Vector** represents a massive linear range where **most positions hold a default value (e.g., $0$ or `null`)**. Rather than allocating empty memory blocks for $10^6$ empty slots, it only stores indices where explicit non-default values exist.

```ts
/**
 * ABSTRACT BASE: SPARSE VECTOR
 * Pure API contract for memory-efficient sequences with sparse index population.
 */
export abstract class AbstractSparseVector<T> {
  readonly length: number;
  readonly defaultValue: T;

  constructor(length: number, defaultValue: T) {
    this.length = length;
    this.defaultValue = defaultValue;
  }

  /** Returns value at index, falling back to `defaultValue` if unpopulated. */
  abstract get(index: number): T;

  /** Stores a non-default value at `index`. Clears entry if set to `defaultValue`. */
  abstract set(index: number, value: T): void;

  /** Returns total explicitly allocated (non-default) entries. */
  abstract nonZeroCount(): number;

  /** Yields index-value pairs for non-default entries only. */
  abstract activeEntries(): Iterable<[number, T]>;
}

```

---

## Complete Linear Sequences Catalog (Layer 3)

The complete Taxonomy of **Linear Sequences** at Layer 3 breaks down into these distinct abstract behaviors:

| Class / Abstract Contract      | Operational Focus               | Access Pattern                     | Boundary Discipline           |
| ------------------------------ | ------------------------------- | ---------------------------------- | ----------------------------- |
| **`AbstractArray<T>`**         | Raw Contiguous Memory           | Index Offsets ($0 \dots N$)        | Unconstrained Indexing        |
| **`AbstractLinkedList<T>`**    | Dynamic Reference Memory        | Linear Traversal ($Node \to Next$) | Head & Tail Pointer Links     |
| **`AbstractStack<T>`**         | Sequential Control Flow         | Single Access Boundary             | **LIFO** (Top Only)           |
| **`AbstractQueue<T>`**         | Buffer Ingestion / Egress       | Dual Access Boundaries             | **FIFO** (Tail in, Head out)  |
| **`AbstractDeque<T>`**         | Double-Ended Sequence           | Both Boundaries                    | $O(1)$ Front & Back           |
| **`AbstractRingBuffer<T>`**    | Fixed Circular Streaming        | Modulo Wrapping ($idx \% cap$)     | Overwriting / Bound Wrap      |
| **`AbstractPriorityQueue<T>`** | Rank-Ordered Egress             | Highest Priority First             | Extracted by Comparator       |
| **`AbstractBitSet`**           | Binary Flag Packing             | Bit Offsets ($0 \dots N$)          | Bitwise Logical Algebra       |
| **`AbstractSkipList<T>`**      | Probabilistic Sorted Sequence   | $O(\log N)$ Multi-Level Jump Links | Sorted Insertion              |
| **`AbstractMatrix<T>`**        | Multi-Dimensional Projection    | Coordinate Mapping $(r, c)$        | Row-Major / Column-Major      |
| **`AbstractSparseVector<T>`**  | Unpopulated Memory Optimization | Sparse Index Resolution            | Unallocated Default Fallbacks |

This completes the **Linear Sequences** domain. From here, we can either define the Abstract APIs for **Hierarchical / Non-Linear Structures (Trees & Graphs)** or proceed to concrete Layer 2/3 compositions.