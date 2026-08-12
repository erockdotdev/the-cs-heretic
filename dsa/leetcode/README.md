# GUIDE TO DSA FRAMEWORK


## Why naive grinding is worse than O(n) per concept

Naive grinding treats every problem as an independent unit. There's no persistent index connecting "I've seen this failure trigger before" across problems, so recognition has to be rebuilt from near-scratch each time a familiar idea shows up in unfamiliar clothing — that's the "same concept, different frame, another pass" tax you're describing. Worse: because techniques aren't taught with their boundary conditions, each *edge case* is also learned independently, as if it were its own fact, instead of as an instance of "this technique's assumption just broke." That's why it compounds past O(n) rather than staying at it.

The system we've built has exactly two structures capable of collapsing that: the **topology-first diagnostic** (so recognition transfers across surface-different problems) and the **failure-driven chain** (so edge cases become predictable pivots instead of new facts). The progression below exists to make sure those two structures actually get exercised, not just read.

## The core rule this progression is built around

**Attempt every problem cold before reading its walkthrough — no exceptions.** Reading the LC-XXX doc first and then "solving" it isn't a rep, it's comprehension, and comprehension alone is exactly the illusion-of-competence risk from before. The walkthrough is for *after* you've failed or succeeded, not instead of trying.

---

## Phase 0 — Orientation (~30 min, once)

Read **00** only. Skim **02** and **03** once, don't try to retain them — you're building a map you'll return to, not memorizing a syllabus. Do not read 04, 05, or anything in the Lattice track yet.

## Phase 1 — Per-Family Loop (the bulk of the work, one pass per family, in Core's locked order: 1 → 2 → 3 → 4 → 5)

For each family:

1. **Read that family's taxonomy section in 02** (definitions + failure chain) and the family's README/overview. ~20–30 min.
2. **Skip the narrative/metaphor doc unless you're stuck** — it's scaffolding for when the abstract version isn't landing, not required reading.
3. **Do not read the full Micro-Systems variant matrix (05) up front.** Treat it as a lookup table you dip into mid-problem, the way you'd check documentation — reading it cover-to-cover before touching a problem is exactly the front-loading that inflates hours without building the reflex.
4. **Work a curated set of problems, not the full grind list** — one problem per major link in that family's failure chain, plus one deliberately harder variant per link. For Family 1 that's roughly: one Frame problem, one Frame-fails-to-Ledger problem, one pure Ledger problem, one Ledger-fails-to-Vise problem, one Vise-hits-the-wall problem — maybe 8–12 problems total, not 40.
5. **For every problem: attempt cold, then read the walkthrough, then run the Curveball drill even if you solved it correctly the first time.** The curveball is where the failure-trigger reflex actually gets built — skipping it because you already got the right answer defeats the purpose.
6. **Keep a running log, one line per problem: "Trigger → Pivot."** e.g. *"negatives appeared → Frame died → moved to Ledger."* This is the single mechanism that turns disconnected edge-case memorization into a reusable index — by the time you've logged 8–10 of these, you're not learning new facts anymore, you're confirming a pattern you already expect.
7. **Close the family with a small interleaved capstone** — 4–5 problems from that family in random order, unlabeled, timed. This is the checkpoint that tells you whether recognition is real or you're pattern-matching off the section header. Don't move to the next family until this goes reasonably smoothly.

## Phase 2 — Cross-Family Capstone (after all five families)

A mixed set, unlabeled, drawn from all five families at once — 15–20 problems, timed. This is the first point where the "one machine, not five toolboxes" claim actually gets tested, because the *first* decision (which family is this even in) has never been exercised in isolation until now. If Phase 1 was solid, this phase is mostly about speed; if it's rough, it tells you which family's recognition didn't actually stick, and you go back to that family's capstone, not the whole system.

## Phase 3 — Lattice Track (optional, only after Phase 2 feels fluent)

This is depth, not speed — read it for the "why five, why not six" argument and for the Hard-Problems Mechanics section specifically, since that's the one part with no Core equivalent. Skip it entirely if you're optimizing for time-to-interview-ready.

## Phase 4 — Maintenance (ongoing, low-effort)

Periodically re-run the Curveball drill on problems you already solved weeks ago, but apply a constraint you haven't tried on that specific problem before. This keeps the reflex sharp without needing a constant stream of new problems — it's spaced retrieval on the *pivot*, which is the actual skill, rather than spaced retrieval on the *problem*, which is just memorization with a delay.

---

## Why this should actually beat the grind, not just feel more organized

The mechanism is specific: **step 6's trigger log is the thing doing the compression.** Every new problem gets checked against an existing, growing index of triggers instead of being evaluated from zero — so the marginal cost of the *n*-th problem within a family should trend down, not stay flat, once the chain is internalized. That's the sublinear-after-warmup shape you're after, and it's not automatic — it only happens if the log actually gets kept and the capstones actually get used as gates rather than skipped. The framework gives you the structure; steps 5–7 are what make it load-bearing instead of decorative.