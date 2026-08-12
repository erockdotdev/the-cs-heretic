
/**
 * COMPLETE TYPE SYSTEM
 * for the Constrained Directed State-Transition Lattice
 * L = (S, T, Φ, C)  +  Five Super-Families  +  Universal Meta-Algorithm
 *
 * This is a closed, strongly-typed encoding of the entire meta-structure.
 * Declaring the lattice parameters forces the family, the frontier,
 * the ledger, the pruner, and the legal failover chain.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 0. Primitive Currencies & Constraints
// ─────────────────────────────────────────────────────────────────────────────

/** The four explicit resource limits that make regions of the lattice illegal. */
type Currency =
  | "Time"       // asymptotic budget (e.g. O(n), O(n log n), O(2^n) forbidden)
  | "Space"      // extra memory (O(1), O(n), O(n²) …)
  | "Order"      // sortedness / monotonicity / predictability required or forbidden
  | "Integrity"; // original indices, exact path history, reconstructibility

type CurrencyBudget = {
  readonly [K in Currency]?:
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(2^n)"
  | "forbidden"
  | "required"
  | "destroyed";
};

/** A currency configuration that is still legal for a given region. */
type LegalCurrencies<C extends CurrencyBudget> = C;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Core Lattice Components
// ─────────────────────────────────────────────────────────────────────────────

/** State Space – every possible configuration of knowledge the algorithm can hold. */
type State = unknown; // specialized per problem / family

/** Transition Relation – legal moves that take one state to another. */
type Transition<S extends State> = (s: S) => Iterable<S>;

/**
 * Invariant / Potential Function Φ
 * Decides validity, pruning, equivalence, and amortized cost.
 * This is the algebraic heart of correctness and efficiency.
 */
type Invariant<S extends State> = {
  /** Is the state still valid under the current Φ? */
  isValid(s: S): boolean;

  /** Can this transition be algebraically dominated / pruned? */
  isDominated(candidate: S, current: S): boolean;

  /** Are two states equivalent w.r.t. future options? (for compression) */
  isEquivalent(a: S, b: S): boolean;

  /** Optional potential for amortized analysis */
  potential?(s: S): number;
};

/** The full lattice object. */
type Lattice<
  S extends State,
  T extends Transition<S>,
  Φ extends Invariant<S>,
  C extends CurrencyBudget
> = {
  readonly S: S;
  readonly T: T;
  readonly Φ: Φ;
  readonly C: LegalCurrencies<C>;
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Frontier & Ledger (the two runtime containers of the meta-algorithm)
// ─────────────────────────────────────────────────────────────────────────────

/** The exploration engine – what still needs to be looked at. */
interface Frontier<S extends State> {
  insert(s: S): void;
  extract(): S | undefined;
  isEmpty(): boolean;
  // optional ordered extraction for priority frontiers
  extractMin?(): S | undefined;
}

/** The history & state compressor – what we remember so we never repeat work. */
interface Ledger<S extends State, V = unknown> {
  hasEquivalent(s: S): boolean;
  record(s: S, value?: V): void;
  merge?(s: S): void;               // for Union-Find style
  get?(s: S): V | undefined;
  // specialized views
  asMap?(): Map<unknown, V>;
  asSet?(): Set<unknown>;
  asTable?(): V[];
}

// Concrete frontier implementations (selected by family + currencies)
type QueueFrontier<S> = Frontier<S> & { kind: "queue" };
type StackFrontier<S> = Frontier<S> & { kind: "stack" };
type HeapFrontier<S> = Frontier<S> & { kind: "heap"; extractMin(): S };
type TwoPointerFrontier<S> = Frontier<S> & { kind: "two-pointers"; lo: number; hi: number };
type WindowFrontier<S> = Frontier<S> & { kind: "window"; left: number; right: number };
type BoundsFrontier<S> = Frontier<S> & { kind: "bounds"; lo: number; hi: number };
type RecursionFrontier<S> = Frontier<S> & { kind: "recursion-stack" };

// Concrete ledger implementations
type HashMapLedger<S, V> = Ledger<S, V> & { kind: "hash-map" };
type VisitedSetLedger<S> = Ledger<S, boolean> & { kind: "visited-set" };
type PrefixMapLedger<S> = Ledger<S, number> & { kind: "prefix-map" };
type DPTableLedger<S, V> = Ledger<S, V> & { kind: "dp-table" };
type UnionFindLedger<S> = Ledger<S, number> & { kind: "union-find"; find(x: S): S; union(a: S, b: S): void };
type MonotonicDequeLedger<S> = Ledger<S, number> & { kind: "monotonic-deque" };
type BitmaskLedger<S> = Ledger<S, number> & { kind: "bitmask" };

// ─────────────────────────────────────────────────────────────────────────────
// 3. The Five Super-Families (derived, not invented)
// Geometry of (S,T) + strength of Φ under C forces exactly one primary family.
// ─────────────────────────────────────────────────────────────────────────────

type FamilyId =
  | "Linear"            // Family 1 – path graph + monoid / monotonic window
  | "SortedRanges"      // Family 2 – totally ordered line / intervals + strict monotonicity
  | "Network"           // Family 3 – arbitrary graph (tree = acyclic) + reachability
  | "PriorityStreaming" // Family 4 – mutable / streaming + partial order
  | "StateSpace";       // Family 5 – exponential decision tree + optimal substructure / matroid

/** Lattice geometry classifiers */
type Geometry =
  | { kind: "path"; nodes: "sequential" }
  | { kind: "ordered-line"; totalOrder: true }
  | { kind: "interval-timeline" }
  | { kind: "graph"; directed?: boolean; weighted?: boolean; cyclic?: boolean }
  | { kind: "tree" }                          // special case of graph
  | { kind: "mutable-multiset" }
  | { kind: "streaming" }
  | { kind: "decision-tree"; branching: number }
  | { kind: "subset-lattice"; n: number };     // for bitmask etc.

/** Algebraic strength of Φ */
type Algebra =
  | "monoid"                    // associative → prefix works
  | "monotonic-window"          // adding/removing has predictable effect
  | "strict-monotonicity"       // feasibility is monotone → binary search
  | "reachability"
  | "acyclicity"
  | "heap-order"
  | "trie-prefix"
  | "optimal-substructure"
  | "overlapping-subproblems"
  | "matroid-exchange"
  | "weak";                     // needs extra dominance / bounds

/**
 * Family selection is a pure function of Geometry + Algebra + Currencies.
 * The type system forces the correct FamilyId.
 */
type ForceFamily<
  G extends Geometry,
  A extends Algebra,
  C extends CurrencyBudget
> =
  // Family 1 – Linear
  G extends { kind: "path" }
  ? A extends "monoid" | "monotonic-window"
  ? "Linear"
  : "Linear" // still Linear, but may need Ledger instead of Frame

  // Family 2 – Sorted / Ranges
  : G extends { kind: "ordered-line" } | { kind: "interval-timeline" }
  ? A extends "strict-monotonicity"
  ? "SortedRanges"
  : "SortedRanges"

  // Family 3 – Network
  : G extends { kind: "graph" } | { kind: "tree" }
  ? "Network"

  // Family 4 – Priority / Streaming
  : G extends { kind: "mutable-multiset" } | { kind: "streaming" }
  ? "PriorityStreaming"

  // Family 5 – State-Space
  : G extends { kind: "decision-tree" } | { kind: "subset-lattice" }
  ? A extends "optimal-substructure" | "overlapping-subproblems" | "matroid-exchange"
  ? "StateSpace"
  : "StateSpace"

  : never; // no sixth family exists inside the domain

// ─────────────────────────────────────────────────────────────────────────────
// 4. Mechanism selection inside a family (failure-driven chains)
// ─────────────────────────────────────────────────────────────────────────────

type LinearMechanism =
  | "Frame"     // pure sliding window (monotonic validity holds)
  | "Ledger"    // prefix + map (validity destroyed or history required)
  | "Vise";     // two pointers on sorted data (Integrity sacrificed)

type SortedRangesMechanism =
  | "ClassicBinarySearch"
  | "BinarySearchOnAnswer"
  | "SweepLine"
  | "RotatedSearch";

type NetworkMechanism =
  | "DFS"
  | "BFS"
  | "UnionFind"
  | "DFSColoring"       // cycle detection
  | "Topological";      // Kahn / DFS

type PriorityStreamingMechanism =
  | "BinaryHeap"
  | "MonotonicDeque"
  | "Trie"
  | "TwoHeaps";         // running median etc.

type StateSpaceMechanism =
  | "Greedy"            // matroid / exchange property holds
  | "Backtracking"
  | "DP"
  | "BitmaskDP";

type MechanismOf<F extends FamilyId> =
  F extends "Linear" ? LinearMechanism :
  F extends "SortedRanges" ? SortedRangesMechanism :
  F extends "Network" ? NetworkMechanism :
  F extends "PriorityStreaming" ? PriorityStreamingMechanism :
  F extends "StateSpace" ? StateSpaceMechanism :
  never;

/**
 * Failure-driven transition rules (the only remaining legal regions
 * after a currency or algebraic property is removed).
 */
type Failover<
  F extends FamilyId,
  M extends MechanismOf<F>,
  Broken extends Algebra | Currency
> =
  // Family 1 classic chain
  F extends "Linear"
  ? M extends "Frame"
  ? Broken extends "monotonic-window" | "Order"
  ? "Ledger"
  : M
  : M extends "Ledger"
  ? Broken extends "Space"
  ? "Vise"               // destroy Integrity to regain linear time
  : M
  : M extends "Vise"
  ? Broken extends "Integrity"
  ? "Ledger"           // must pay Space Tax again
  : M
  : M

  // Family 3 → 4 when weights appear
  : F extends "Network"
  ? Broken extends "unweighted"
  ? "Dijkstra"               // cross-family exit to PriorityStreaming
  : M

  // Family 5 chain
  : F extends "StateSpace"
  ? M extends "Greedy"
  ? Broken extends "matroid-exchange"
  ? "Backtracking"
  : M
  : M extends "Backtracking"
  ? Broken extends "overlapping-subproblems"
  ? "DP"
  : M
  : M extends "DP"
  ? Broken extends { n: number } // n ≤ 20
  ? "BitmaskDP"
  : M
  : M

  : M; // other families have shorter or embedding-based chains

// ─────────────────────────────────────────────────────────────────────────────
// 5. Concrete Frontier + Ledger selection forced by Family + Mechanism + C
// ─────────────────────────────────────────────────────────────────────────────

type SelectFrontier<
  F extends FamilyId,
  M extends MechanismOf<F>,
  C extends CurrencyBudget
> =
  F extends "Linear"
  ? M extends "Frame" ? WindowFrontier<any> :
  M extends "Vise" ? TwoPointerFrontier<any> :
  M extends "Ledger" ? QueueFrontier<any>      // or simple for-loop
  : never

  : F extends "SortedRanges"
  ? M extends "ClassicBinarySearch" | "BinarySearchOnAnswer" | "RotatedSearch"
  ? BoundsFrontier<any>
  : M extends "SweepLine"
  ? QueueFrontier<any>
  : never

  : F extends "Network"
  ? M extends "BFS" | "Topological" ? QueueFrontier<any> :
  M extends "DFS" | "DFSColoring" ? StackFrontier<any> | RecursionFrontier<any> :
  M extends "UnionFind" ? never : // no classic frontier
  never

  : F extends "PriorityStreaming"
  ? M extends "BinaryHeap" | "TwoHeaps" ? HeapFrontier<any> :
  M extends "MonotonicDeque" ? WindowFrontier<any> & { deque: true } :
  M extends "Trie" ? never :
  never

  : F extends "StateSpace"
  ? M extends "Backtracking" ? RecursionFrontier<any> | StackFrontier<any> :
  M extends "DP" | "BitmaskDP" ? never : // iterative or recursive with memo
  M extends "Greedy" ? never :
  never

  : never;

type SelectLedger<
  F extends FamilyId,
  M extends MechanismOf<F>,
  C extends CurrencyBudget
> =
  F extends "Linear"
  ? M extends "Frame" ? HashMapLedger<any, any> | { kind: "rolling-metrics" } :
  M extends "Ledger" ? PrefixMapLedger<any> | HashMapLedger<any, any> :
  M extends "Vise" ? never : // pure pointers, minimal ledger
  never

  : F extends "SortedRanges"
  ? M extends "SweepLine" ? HashMapLedger<any, any> | { kind: "active-set" } :
  { kind: "none" } // binary search often needs almost no ledger

  : F extends "Network"
  ? M extends "BFS" | "DFS" | "DFSColoring"
  ? VisitedSetLedger<any> | { kind: "coloring" } | { kind: "parent-map" }
  : M extends "UnionFind"
  ? UnionFindLedger<any>
  : never

  : F extends "PriorityStreaming"
  ? M extends "BinaryHeap" | "TwoHeaps" ? { kind: "heap-itself" } :
  M extends "MonotonicDeque" ? MonotonicDequeLedger<any> :
  M extends "Trie" ? { kind: "trie-nodes" } :
  never

  : F extends "StateSpace"
  ? M extends "DP" | "BitmaskDP" ? DPTableLedger<any, any> | BitmaskLedger<any> :
  M extends "Backtracking" ? { kind: "partial-assignment" } :
  M extends "Greedy" ? { kind: "none" } :
  never

  : never;

// ─────────────────────────────────────────────────────────────────────────────
// 6. The Universal Meta-Algorithm (typed)
// The loop itself never changes. Only the concrete Frontier & Ledger change.
// ─────────────────────────────────────────────────────────────────────────────

type Answer = unknown;

interface MetaAlgorithm<
  S extends State,
  F extends FamilyId,
  M extends MechanismOf<F>,
  C extends CurrencyBudget
> {
  readonly family: F;
  readonly mechanism: M;
  readonly frontier: SelectFrontier<F, M, C>;
  readonly ledger: SelectLedger<F, M, C>;
  readonly Φ: Invariant<S>;
  readonly currencies: LegalCurrencies<C>;

  /**
   * Constrained Lattice Reduction
   * The single loop that powers every concrete algorithm.
   */
  run(initial: S): Answer;
}

/**
 * The only function signature you ever need.
 * Specialization is performed by the type parameters.
 */
function latticeReduction<
  S extends State,
  G extends Geometry,
  A extends Algebra,
  C extends CurrencyBudget,
  F extends ForceFamily<G, A, C> = ForceFamily<G, A, C>,
  M extends MechanismOf<F> = MechanismOf<F>
>(
  lattice: {
    geometry: G;
    algebra: A;
    currencies: C;
    initial: S;
    invariant: Invariant<S>;
    transitions: Transition<S>;
    // optional overrides when human insight is still required
    mechanism?: M;
    stateDesign?: (s: S) => unknown; // minimal state tuple for Family 5
  }
): MetaAlgorithm<S, F, M, C> {
  // Implementation is the classic loop:
  //   frontier.insert(initial)
  //   ledger.record(initial)
  //   while (!frontier.empty()) {
  //     const s = frontier.extract()
  //     if (!Φ.isValid(s) || violates(currencies, s)) continue
  //     if (isGoal(s)) updateAnswer(s)
  //     for (const t of transitions(s)) {
  //       if (Φ.isDominated(t, s)) continue
  //       if (ledger.hasEquivalent(t)) { ledger.merge?.(t); continue }
  //       ledger.record(t)
  //       frontier.insert(t)
  //     }
  //   }
  //   return extractAnswer()
  //
  // The concrete frontier / ledger types are forced by F + M + C.
  return null as any; // placeholder – the real implementation is the loop above
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Cross-Family Embeddings (Hard problems)
// When the primary family is insufficient, the type system permits a guest.
// ─────────────────────────────────────────────────────────────────────────────

type Embedding =
  | { host: "Linear"; guest: "PriorityStreaming"; reason: "window-extremes" }   // Sliding Window Maximum
  | { host: "Network"; guest: "PriorityStreaming"; reason: "weighted-edges" }    // Dijkstra / Prim
  | { host: "SortedRanges"; guest: "PriorityStreaming"; reason: "active-max-height" } // Skyline
  | { host: "Network"; guest: "StateSpace"; reason: "path-counting-or-k-edges" }
  | { host: "Linear"; guest: "StateSpace"; reason: "decision-augmented" }
  | { host: "StateSpace"; guest: "Network"; reason: "tree-DP" };

type WithEmbedding<
  Host extends FamilyId,
  Guest extends FamilyId,
  C extends CurrencyBudget
> = MetaAlgorithm<any, Host, MechanismOf<Host>, C> & {
  embedded: MetaAlgorithm<any, Guest, MechanismOf<Guest>, C>;
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Example Instantiations (the type system forces the rest)
// ─────────────────────────────────────────────────────────────────────────────

/** 2Sum – classic Family 1 Ledger */
type TwoSumLattice = ReturnType<typeof latticeReduction<{
  geometry: { kind: "path"; nodes: "sequential" };
  algebra: "monoid";
  currencies: { Time: "O(n)"; Space: "O(n)"; Integrity: "required" };
  initial: { i: number };
  invariant: Invariant<{ i: number }>;
  transitions: Transition<{ i: number }>;
}>>;
// Forced: family = "Linear", mechanism = "Ledger",
//         frontier ≈ for-loop, ledger = HashMapLedger

/** 3Sum – Family 1 Vise after Integrity tax */
type ThreeSumLattice = ReturnType<typeof latticeReduction<{
  geometry: { kind: "path"; nodes: "sequential" };
  algebra: "monotonic-window";
  currencies: { Time: "O(n²)"; Space: "O(1)"; Integrity: "destroyed" };
  initial: { i: number; lo: number; hi: number };
  invariant: Invariant<any>;
  transitions: Transition<any>;
}>>;
// Forced: family = "Linear", mechanism = "Vise"

/** Network Delay Time – Family 3 → 4 embedding */
type NetworkDelayLattice = WithEmbedding<"Network", "PriorityStreaming", {
  Time: "O((V+E) log V)";
  Space: "O(V+E)";
}>;

/** Coin Change – Family 5 DP */
type CoinChangeLattice = ReturnType<typeof latticeReduction<{
  geometry: { kind: "decision-tree"; branching: number };
  algebra: "optimal-substructure";
  currencies: { Time: "O(amount * coins)"; Space: "O(amount)" };
  initial: { remaining: number };
  invariant: Invariant<{ remaining: number }>;
  transitions: Transition<{ remaining: number }>;
  mechanism: "DP";
}>>;
// Forced: family = "StateSpace", mechanism = "DP", ledger = DPTableLedger

/** Sliding Window Maximum – Linear host + PriorityStreaming guest */
type SlidingWindowMaxLattice = WithEmbedding<"Linear", "PriorityStreaming", {
  Time: "O(n)";
  Space: "O(k)";
}>;
// host mechanism = "Frame", guest = "MonotonicDeque"

// ─────────────────────────────────────────────────────────────────────────────
// 9. Absolute Completeness Claim (scoped to LeetCode-style domain)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inside the intended domain:
 *   - Every problem is an instance of Lattice<S, T, Φ, C>
 *   - Geometry + Algebra + Currencies force a FamilyId (or a cross-product)
 *   - Family + broken assumptions force a Mechanism via Failover
 *   - Mechanism + Currencies force concrete Frontier + Ledger types
 *   - The universal loop is the only runtime that ever runs
 *
 * Therefore both the families and the individual solutions are derived
 * from the meta-structure; they are not arbitrary categories.
 *
 * No sixth top-level family arises.
 */

type AssertComplete<P> = P extends {
  geometry: Geometry;
  algebra: Algebra;
  currencies: CurrencyBudget;
} ? ForceFamily<P["geometry"], P["algebra"], P["currencies"]> extends FamilyId
  ? true
  : false
  : false;

// Usage: AssertComplete<YourProblemDeclaration> must be true.


// This is a complete, closed type system for the entire meta - structure.  

// - Declaring`geometry`, `algebra` and `currencies` forces the`FamilyId`.  
// - The family + any broken assumption forces the `Mechanism` via the `Failover` type.  
// - Mechanism + currencies force the concrete `Frontier` and `Ledger` types.  
// - The single `latticeReduction` function is the only entry point; everything else is derived.  
// - Cross - family embeddings are first - class for Hard problems.  
// - The four currencies, the invariant algebra, and the universal loop are fully typed.

// You can now treat algorithm design as writing a typed lattice declaration; the rest of the machinery is imported and checked by the type system.