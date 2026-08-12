Here is your **Act 2** document fully expanded and armored in the same style as Act 1. I kept your structure, archetypes, diagrams, and voice, and layered in the process-level theater that interviewers actually score.

---

```markdown
Act 2: The System Design Round (The Box-and-Arrow Script)

System Design isn't about how you would *actually* build a system in production.  
It is about whether you hit the interviewer’s hidden, predefined **Standard Architecture Template** for that problem class, while performing the expected 45–60 minute script.

```text
┌────────────────────────────────────────────────────────┐
│  THE MANDATORY 45–60 MINUTE SYSTEM DESIGN CHECKLIST    │
├────────────────────────────────────────────────────────┤
│  Min 0–5:   Scope Requirements (Functional + Non-Func) │
│  Min 5–12:  Back-of-the-Envelope Math (QPS, Storage,   │
│             Bandwidth, Peak vs Average)                │
│  Min 12–18: High-level API + Core Data Model           │
│  Min 18–35: Draw the High-Level Boxes (the Archetype)  │
│  Min 35–50: Deep Dive the Core Bottleneck(s)           │
│  Min 50–60: Trade-offs, Failure Modes, Extensions      │
└────────────────────────────────────────────────────────┘
```

If the interviewer’s internal grading sheet for “Design Twitter” expects a Message Queue + Fan-out Workers + Redis Timeline Cache, it does not matter if you can prove a well-tuned Postgres setup could handle the load. If those specific boxes are missing, you lose points for “lacking scale vision.”

The entire System Design interview landscape is governed by **7 Archetype Master Architectures**. When an interviewer asks you to design *any* system, they are testing your ability to map the prompt onto one (or a combination) of these 7 blueprints and then fill in the expected components.

---

## The Performance Script (How the Round Is Actually Scored)

**Minute 0–5: Requirements Gathering (Lead the conversation)**
- Restate the problem.
- Explicitly separate **Functional** vs **Non-Functional** requirements.
- Ask clarifying questions (scale targets, read/write ratio, consistency needs, latency goals, expected growth).
- Prioritize: “For the core of this interview I will focus on X and Y; we can extend to Z if time allows.”
- Do **not** start drawing yet.

**Minute 5–12: Back-of-the-Envelope Estimation**
- Calculate QPS (average + peak), storage, bandwidth.
- Show your assumptions out loud. Round numbers aggressively (10M users, 5% DAU, etc.).
- State the conclusions: “This is a read-heavy system at ~50k QPS peak, so caching and read replicas will be critical.”

**Minute 12–18: API & Data Model**
- Define 3–6 key API endpoints with rough request/response shapes.
- Sketch the core entities and relationships (or document structure if NoSQL).
- Mention partitioning/sharding key early if relevant.

**Minute 18–35: High-Level Architecture (The Boxes)**
- Draw the standard archetype diagram.
- Name every major component and why it is there.
- Explicitly call out the **Core Problem** of the archetype (celebrity fan-out, double-booking, geospatial indexing, etc.).

**Minute 35–50: Deep Dive**
- Pick the 1–2 hardest parts of the system and go deep (sharding strategy, cache invalidation, conflict resolution, exact fan-out logic, etc.).
- Discuss consistency model, failure modes, and how the system degrades.

**Minute 50–60: Trade-offs, Extensibility, Monitoring**
- Proactively discuss trade-offs you made.
- Mention monitoring, alerting, and how you would evolve the system for 10x scale.
- Ask if the interviewer wants to explore any particular area further.

**Handling interviewer hints & redirects**
- Treat every hint as high-signal. Acknowledge it and incorporate it immediately.
- If the interviewer says “What about the celebrity problem?” they are telling you the archetype’s core bottleneck is missing from your diagram.

**If you finish the core design early**
- Dive deeper into one component.
- Discuss failure scenarios and mitigations.
- Talk about multi-region, data migration, or cost optimization.
- Never go silent or start free-styling unrelated features.

**What “Strong Hire” looks like in System Design**
- Candidate drives the conversation instead of waiting to be told what to do.
- Correct archetype is identified early.
- All mandatory boxes for that archetype appear.
- Core bottleneck is named and addressed.
- Numbers are reasonable and used to justify decisions.
- Trade-offs are discussed without prompting.
- Calm, structured, collaborative communication.

---

## The 7 Master Archetypes of System Design

```text
                             SYSTEM DESIGN ARCHETYPES
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Content Feed & Social Network    (Twitter / Instagram / News Feed)       │
│ 2. Real-Time Streaming & Messaging (WhatsApp / Discord)                    │
│ 3. Heavy Media Upload & Video      (YouTube / Netflix / TikTok)             │
│ 4. Read-Heavy Key-Value Lookup     (URL Shortener / Rate Limiter)          │
│ 5. Geospatial & Matchmaking        (Uber / Lyft / Tinder)                   │
│ 6. High-Concurrency Transactional  (Ticketmaster / Booking.com / Flash Sale)│
│ 7. Distributed Search & Analytics  (Typeahead / Google Analytics / Web Log) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Archetype 1: Content Feed & Social Networks

* **Example Prompts:** Design Twitter, Instagram, Facebook Newsfeed, LinkedIn Feed.
* **Core Problem:** **The Celebrity Bottleneck (Fan-out on Write vs. Read)**. When a user posts, millions of followers need to see it instantly.

```text
[Client] ──► [API Gateway] ──► [Post Service] ──► [Kafka] ──► [Fanout Worker]
                                                                  │
                                                                  ▼
                                                      [Redis Timeline Cache]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Hybrid Fan-out Architecture:**
     - **Push Model (Write-Side):** Normal users → Kafka → Fanout Workers → write post ID into each follower’s **Redis Timeline Cache** (usually a Redis Sorted Set).
     - **Pull Model (Read-Side):** Celebrities bypass the push path. On read, merge the celebrity’s recent posts into the timeline on the fly.
  2. **In-Memory Cache (Redis):** Recent timelines stored in Redis `ZSET` (timestamp as score).
  3. **NoSQL Database (Cassandra / DynamoDB):** Source-of-truth posts, partitioned by `user_id` or `post_id`.

* **Process Note:** Explicitly say “I’m using hybrid fan-out because pure push dies on celebrity accounts and pure pull is too slow for normal users.” This sentence is almost always expected.

---

### Archetype 2: Real-Time Messaging & Presence

* **Example Prompts:** Design WhatsApp, Slack, Discord, Facebook Messenger.
* **Core Problem:** Maintaining low-latency, bidirectional persistent connections across millions of concurrent users.

```text
[Client] ◄──(WebSocket)──► [Gateway Pool] ──► [Presence Service (Redis)]
                                │
                                ▼
                       [Message Store (Cassandra)]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Stateful Connection Gateway Pool:** WebSockets or gRPC streams behind a Layer-4 load balancer.
  2. **Session / Presence Map (Redis Cluster):** Maps `user_id` → which gateway holds the live connection.
  3. **Distributed Message Store (Cassandra / ScyllaDB):** High write throughput, ordered by `(conversation_id, message_id)`.

* **Process Note:** Call out why HTTP long-polling is insufficient and why the gateways must be stateful. Mention how a message is routed to the correct gateway via the presence service.

---

### Archetype 3: Heavy Media Upload & Processing

* **Example Prompts:** Design YouTube, TikTok, Netflix, Google Photos.
* **Core Problem:** Large file uploads, storage cost, and heavy asynchronous compute (transcoding).

```text
[Client] ──(Presigned URL)──► [S3 / Blob Storage] ──► [S3 Event / Kafka]
                                                            │
                                                            ▼
                                                   [Transcoding Workers]
                                                            │
                                                            ▼
[CDN] ◄──────────────────────────────────────────── [Transcoded Variants]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Presigned URLs:** Client uploads directly to object storage so API servers are not saturated.
  2. **CDN:** Edge caching of video segments.
  3. **Asynchronous Transcoding Pipeline:** Object storage event → queue → worker pool (FFmpeg) producing multiple resolutions / codecs.

* **Process Note:** Emphasize that the upload path and the processing path are deliberately decoupled. Mention adaptive bitrate streaming (HLS/DASH) if the prompt is video-heavy.

---

### Archetype 4: Read-Heavy Key-Value Lookup

* **Example Prompts:** Design TinyURL/Bitly, Rate Limiter, Pastebin, Distributed Cache.
* **Core Problem:** Extreme read-to-write ratio and very low latency lookups.

```text
[Client] ──► [API Gateway / Rate Limiter] ──► [Redis] ──► (miss) ──► [DB]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **ID Generation / Base62 (or similar) service.**
  2. **Cache-Aside (Cache-on-Read) layer** with Redis or Memcached.
  3. **Primary store** (usually relational or simple NoSQL) with proper indexing on the short key.

* **Process Note:** State the cache TTL and invalidation strategy. For rate limiters, name the algorithm (token bucket, sliding window, etc.).

---

### Archetype 5: Geospatial & Location-Based Matchmaking

* **Example Prompts:** Design Uber, Lyft, Yelp, DoorDash, Tinder.
* **Core Problem:** High-frequency location updates + efficient “nearby” queries.

```text
[Driver] ──► [Location Ingestion] ──► [Geospatial Index (Redis / H3 / S2 / QuadTree)]
[Rider]  ──► [Match Service] ─────────────────────────────────────────────────────┘
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Spatial Index** (explicitly name QuadTree, Geohash, Google S2, or H3).
  2. **In-memory or specialized geospatial store** for live locations (locations are ephemeral).
  3. **Matchmaking / Dispatch component** (often event-driven).

* **Process Note:** Say why a normal relational `WHERE lat BETWEEN …` query will not scale. Mention how often locations are updated and how stale data is handled.

---

### Archetype 6: High-Concurrency Transactional Booking

* **Example Prompts:** Design Ticketmaster, Booking.com, Flash Sale, Inventory Reservation.
* **Core Problem:** Preventing overselling / double-booking under extreme contention.

```text
[Client] ──► [Reservation Service] ──► [Distributed Lock or SELECT FOR UPDATE]
                                              │
                                              ▼
                                    [ACID Relational DB]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Concurrency control**: Redis distributed lock, ZooKeeper, or DB-level `SELECT FOR UPDATE`.
  2. **Reservation state machine + TTL** (AVAILABLE → RESERVED → PAID, with automatic release).
  3. **Strongly consistent relational store** for the inventory and payment records.

* **Process Note:** Explicitly discuss the race condition and how your locking or transactional approach prevents it. Mention what happens when payment fails or the user abandons the flow.

---

### Archetype 7: Distributed Search & Analytics

* **Example Prompts:** Design Typeahead/Autocomplete, Log Ingestion (Datadog), Google Analytics, Metrics system.
* **Core Problem:** High-volume writes of events/logs + low-latency search or aggregation.

```text
[Events] ──► [Kafka] ──► [Stream Processor] ──► [Elasticsearch / ClickHouse / Druid / Trie]
```

* **The Mandatory Boxes You MUST Draw:**
  1. **Durable, high-throughput ingestion** (Kafka or equivalent).
  2. **Stream processing or batch aggregation layer**.
  3. **Search / OLAP store** (Elasticsearch for search, columnar store for analytics). For pure typeahead, an in-memory Trie or prefix index is often expected.

* **Process Note:** Distinguish between the write path (durable, eventually consistent) and the read path (optimized for the specific query pattern).

---

## How Strong Candidates Actually Play the Round

1. **Map the prompt to one or more archetypes within the first 2–3 minutes.**  
   “Design Airbnb” → Geospatial (search) + Transactional Booking (reservations).

2. **Execute the timed script** rather than free-styling.

3. **Name the core problem of the archetype out loud** before or while drawing the boxes.

4. **Sprinkle the expected vocabulary** naturally:
   - Load balancer (L4 vs L7 when relevant)
   - CDN
   - Sharding / partitioning key
   - Cache invalidation strategy
   - Eventual vs strong consistency
   - Message queue for decoupling
   - Rate limiting / back-pressure

5. **Treat the deep dive as the real test.** High-level boxes get you to “Hire.” The quality of the bottleneck discussion separates “Hire” from “Strong Hire.”

---

## The Reality of Act 2

System Design interviews are not open-ended architecture exercises. They are pattern-matching performances against a relatively small set of expected templates. The candidates who consistently clear them are not necessarily the best real-world architects; they are the ones who have internalized the 7 archetypes, the mandatory components for each, and the 45–60 minute script that interviewers are trained to evaluate.

Master the mapping + the script + the core-bottleneck deep dives, and the round becomes highly predictable.
````

---

This version is now maximally armored for Act 2. It contains both the content (the 7 archetypes and mandatory boxes) and the full performance theater that determines the score. Ready for Act 3 whenever you want to drop it.


---



Here is the fully updated Act 2 document with every missing piece integrated.

---

```markdown
Act 2: The System Design Round (The Box-and-Arrow Script)

System Design is not about how you would actually build a system in production.  
It is about whether you can rapidly map the prompt onto the interviewer’s expected template, hit the mandatory components, and perform the 45–60 minute ritual while sounding structured and collaborative.

The round selects for template fluency and performance under observation. It is only weakly related to real architectural judgment.

```text
┌────────────────────────────────────────────────────────┐
│  THE MANDATORY 45–60 MINUTE SYSTEM DESIGN CHECKLIST    │
├────────────────────────────────────────────────────────┤
│  Min 0–5:   Scope Requirements (Functional + Non-Func) │
│  Min 5–12:  Back-of-the-Envelope Math (directional)    │
│  Min 12–18: High-level API + Core Data Model           │
│  Min 18–35: Draw the High-Level Boxes (the Archetype)  │
│  Min 35–50: Deep Dive the Core Bottleneck(s)           │
│  Min 50–60: Trade-offs, Failure Modes, Ops, Extensions │
└────────────────────────────────────────────────────────┘
```

If the interviewer’s internal checklist for “Design Twitter” expects a Message Queue + Fan-out Workers + Redis Timeline Cache, a technically reasonable Postgres-heavy design that omits those boxes will still be scored as lacking scale vision.

---

## Variance by Level and Company

| Level  | Large Company (FAANG-style)                                                           | Mid-size / Scale-up                     | Startup / Non-traditional                      |
| ------ | ------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| Mid    | Classic archetypes + full script expected                                             | Mix of classic + more practical prompts | Often lighter or more conversational           |
| Senior | Archetypes still used, deeper ops/cost/failure focus                                  | More realistic constraints              | Frequently less template-driven                |
| Staff+ | Less pure “Design Twitter”, more depth on trade-offs, multi-region, cost, operability | Varies widely                           | Often replaced by real architecture discussion |

Adjust depth accordingly. The 7-archetype script is the safest default for mid-to-senior loops at large companies.

---

## The Performance Script (Candidate Side)

**Minute 0–5: Requirements Gathering (Lead)**
- Restate the problem.
- Separate Functional vs Non-Functional requirements.
- Ask about scale, read/write ratio, consistency, latency, growth.
- Prioritize scope out loud: “I’ll focus on X and Y for the core of this interview.”
- Do not draw yet.

**Minute 5–12: Back-of-the-Envelope (Keep it light)**
- Produce directional numbers only (QPS, storage, bandwidth).
- Round aggressively and state assumptions.
- Use the numbers to justify decisions (“this QPS means caching is required”).
- Do not burn time on precise calculations.

**Minute 12–18: API & Data Model**
- 3–6 key endpoints with rough shapes.
- Core entities or document structure.
- Call out partitioning/sharding key early if relevant.

**Minute 18–35: High-Level Architecture**
- Map to the correct archetype(s) and say it.
- Draw the expected boxes.
- **Name the Core Problem of the archetype out loud** (celebrity fan-out, double-booking, geospatial indexing, etc.). This is a high-leverage scoring moment.

**Minute 35–50: Deep Dive**
- Go deep on the 1–2 hardest parts.
- Cover consistency, failure modes, and degradation behavior.
- At senior levels, include cost, monitoring, deployment, and rollback considerations.

**Minute 50–60: Trade-offs & Extensibility**
- Proactively discuss trade-offs.
- Mention monitoring, alerting, 10x scaling path.
- Ask what the interviewer wants to explore further.

---

## Interviewer Dark Patterns & Scoring Logic

What interviewers are actually doing:

- Staying quiet early to force you to drive the conversation.
- Redirecting with pointed questions (“What about the celebrity problem?”) when a mandatory box is missing. This is a strong signal you skipped something expected.
- Using the deep-dive segment as the primary differentiator between Hire and Strong Hire.
- Scoring structure, communication, and whether you hit the expected components as heavily as (often more than) pure technical quality.
- Treating a clean, expected template with good narration as safer than a more original but non-standard design.

Hard truth: A design that is reasonable in the real world but misses the expected boxes usually scores worse than a more “standard” design that hits every checkbox.

---

## Recovery Scripts

**Wrong archetype mid-way**  
“I think I initially under-weighted X. Let me adjust the design to properly address [core problem] by adding [missing components].”

**Interviewer pushes on a weak area**  
Acknowledge immediately, then deepen or correct that part of the diagram and explanation.

**Running out of time before deep dive**  
“I want to make sure we cover the core bottleneck. Let me focus the remaining time on [specific hard part].”

**Hint or redirect received**  
Treat it as high-signal. Incorporate it at once and restate the updated plan.

**Finished core design early**  
Go deeper on failure modes, multi-region, cost, or operational concerns. Never go silent.

---

## The 7 Master Archetypes

```text
1. Content Feed & Social Network    (Twitter / Instagram / News Feed)
2. Real-Time Streaming & Messaging (WhatsApp / Discord)
3. Heavy Media Upload & Video      (YouTube / Netflix / TikTok)
4. Read-Heavy Key-Value Lookup     (URL Shortener / Rate Limiter)
5. Geospatial & Matchmaking        (Uber / Lyft / Tinder)
6. High-Concurrency Transactional  (Ticketmaster / Booking.com / Flash Sale)
7. Distributed Search & Analytics  (Typeahead / Google Analytics / Web Log)
```

### Archetype 1: Content Feed & Social Networks
- **Core Problem:** Celebrity bottleneck (fan-out on write vs read).
- **Mandatory boxes:** Hybrid fan-out (push for normal users via Kafka + workers, pull for celebrities), Redis timeline cache (ZSET), NoSQL source of truth (Cassandra/DynamoDB).
- **Must-say:** “I’m using hybrid fan-out because pure push dies on celebrity accounts and pure pull is too slow for normal users.”

### Archetype 2: Real-Time Messaging & Presence
- **Core Problem:** Low-latency bidirectional connections at scale.
- **Mandatory boxes:** Stateful WebSocket/gRPC gateway pool, Presence service (Redis), high-write message store (Cassandra/ScyllaDB).
- **Must-say:** Why long-polling is insufficient and how presence routing works.

### Archetype 3: Heavy Media Upload & Processing
- **Core Problem:** Large uploads + expensive async compute.
- **Mandatory boxes:** Presigned URLs to object storage, CDN, async transcoding pipeline (event → queue → workers).
- **Must-say:** Upload path and processing path are deliberately decoupled.

### Archetype 4: Read-Heavy Key-Value Lookup
- **Core Problem:** Extreme read/write ratio + very low latency.
- **Mandatory boxes:** ID generation (Base62 etc.), cache-aside layer (Redis), primary store with proper indexing.
- **Must-say:** Cache TTL and invalidation strategy. Name the rate-limiting algorithm if relevant.

### Archetype 5: Geospatial & Matchmaking
- **Core Problem:** High-frequency location updates + efficient “nearby” queries.
- **Mandatory boxes:** Spatial index (H3 / S2 / QuadTree / Geohash), in-memory or specialized location store, matchmaking/dispatch component.
- **Must-say:** Why a normal relational range query will not scale.

### Archetype 6: High-Concurrency Transactional Booking
- **Core Problem:** Preventing double-booking under contention.
- **Mandatory boxes:** Concurrency control (distributed lock or SELECT FOR UPDATE), reservation state machine + TTL, strongly consistent relational store.
- **Must-say:** Explicitly describe the race condition and how it is prevented. Cover payment failure / abandonment.

### Archetype 7: Distributed Search & Analytics
- **Core Problem:** High-volume writes + low-latency search or aggregation.
- **Mandatory boxes:** Durable ingestion (Kafka), stream/batch processing layer, search or OLAP store (Elasticsearch / columnar / Trie for typeahead).
- **Must-say:** Distinguish write path vs read path characteristics.

---

## Modern Senior-Level Additions (Frequently Scored)

- Cost awareness (storage, compute, data transfer)
- Monitoring, alerting, and observability
- Deployment and rollback strategy
- Graceful degradation and failure isolation
- Multi-region considerations when scale implies it

These do not replace the archetypes; they are layered on top during the deep-dive and closing segments.

---

## How Strong Candidates Play the Round

1. Map to archetype(s) in the first 2–3 minutes and say it.
2. Run the timed script instead of free-styling.
3. Name the core problem early and explicitly.
4. Hit every mandatory box for the archetype.
5. Use directional numbers only to justify decisions.
6. Treat the deep dive as the real scoring surface.
7. Sprinkle expected vocabulary naturally (sharding key, cache invalidation, consistency model, back-pressure, etc.).
8. Stay adaptive when redirected.

---

## The Reality of Act 2 (External View)

This round is a pattern-matching performance against a small set of approved templates.  

It rewards candidates who have internalized the 7 archetypes, the mandatory components, the timed ritual, and the ability to name the hard part out loud. It does not reliably measure the ability to design systems that work well in production over time.

A clean execution of the expected script with the right boxes and a solid deep dive on the core bottleneck will consistently outperform a more original or realistic design that misses the template.

The goal is not to become a better architect.  
The goal is to make the facade read correctly from the front.
````

---

This version now includes interviewer dark patterns, level/company variance, stronger core-problem emphasis, recovery scripts, estimation realism, modern senior expectations, and the full external framing. Act 2 is fully armored.


---

**Act 2 Reference Materials**  
*(Explicit scripts and matrices)*

---

### 1. Timed Performance Script

| Time      | What You Do                                                                                  | Key Signal You Must Hit                  |
| --------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 0–5 min   | Restate problem → Functional vs Non-Functional → clarifying questions → scope prioritization | You drive; no drawing yet                |
| 5–12 min  | Directional estimates only (QPS, storage, bandwidth). State assumptions and conclusions      | Numbers justify decisions, not precision |
| 12–18 min | 3–6 key APIs + core data model + sharding/partition key if relevant                          | Clear entities and interfaces            |
| 18–35 min | Map to archetype(s) → draw mandatory boxes → **name the Core Problem out loud**              | Correct template + core bottleneck named |
| 35–50 min | Deep dive on 1–2 hardest parts (consistency, failure modes, degradation)                     | Depth on the real bottleneck             |
| 50–60 min | Trade-offs, monitoring, 10x path, cost/ops if senior                                         | Proactive, not prompted                  |

---

### 2. Recovery Scripts

**Wrong archetype mid-way**  
“I think I initially under-weighted [core problem]. Let me adjust by adding [missing mandatory components].”

**Interviewer redirects (“What about the celebrity problem?”)**  
“You’re right — that is the key bottleneck. Let me properly address it with [hybrid fan-out / required boxes].”

**Running out of time**  
“I want to make sure we cover the core bottleneck. I’ll focus the remaining time on [specific hard part].”

**Hint received**  
Acknowledge → incorporate immediately → restate the updated plan.

**Finished early**  
Push into failure modes, multi-region, cost, monitoring, or rollback. Never go silent.

---

### 3. Level × Company Variance Matrix

| Level  | Large Company (FAANG-style)                                                | Mid-size / Scale-up                | Startup / Non-traditional          |
| ------ | -------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------- |
| Mid    | Full classic script + archetypes expected                                  | Mix of classic + practical prompts | Often lighter or conversational    |
| Senior | Archetypes still used; deeper ops, cost, failure focus                     | More realistic constraints         | Less template-driven               |
| Staff+ | Less pure “Design Twitter”; heavy on trade-offs, multi-region, operability | Highly variable                    | Often real architecture discussion |

---

### 4. Archetype Quick-Reference Matrix

| #   | Archetype                       | Core Problem                             | Mandatory Boxes                                                  | Must-Say Line                                                                                      |
| --- | ------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Content Feed / Social           | Celebrity fan-out                        | Hybrid fan-out, Redis timeline (ZSET), NoSQL posts               | “Hybrid fan-out because pure push dies on celebrities and pure pull is too slow for normal users.” |
| 2   | Real-Time Messaging & Presence  | Persistent low-latency connections       | Stateful gateway pool, Presence (Redis), high-write store        | Why long-polling fails + how presence routing works                                                |
| 3   | Heavy Media Upload & Processing | Large uploads + expensive compute        | Presigned URLs, CDN, async transcoding pipeline                  | Upload path and processing path are decoupled                                                      |
| 4   | Read-Heavy Key-Value            | Extreme read/write ratio + low latency   | ID generation, Cache-aside, indexed primary store                | Cache TTL + invalidation strategy                                                                  |
| 5   | Geospatial & Matchmaking        | High-frequency location + nearby queries | Spatial index (H3/S2/QuadTree), live location store, matchmaking | Why relational range queries don’t scale                                                           |
| 6   | High-Concurrency Transactional  | Double-booking under contention          | Locking / SELECT FOR UPDATE, state machine + TTL, ACID store     | Explicitly describe the race and how it is prevented                                               |
| 7   | Distributed Search & Analytics  | High-volume writes + fast search/agg     | Kafka (or equiv), stream/batch layer, search/OLAP store          | Distinguish write path vs read path                                                                |

---

### 5. Interviewer Dark Patterns (What They Actually Do)

- Stay silent early → force you to lead.
- Pointed redirect when a mandatory box is missing (“What about the celebrity problem?”).
- Use the deep-dive segment as the main Hire vs Strong Hire differentiator.
- Score structure + hitting expected components as heavily as technical quality.
- Prefer a clean standard template over a more original but non-matching design.

---

### 6. Strong Hire Checklist (Quick Self-Audit)

- Drove the conversation from the start
- Mapped to correct archetype(s) early
- Named the Core Problem out loud
- Hit every mandatory box
- Used numbers only to justify decisions
- Deep-dived the real bottleneck
- Discussed trade-offs, failure modes, and (at senior) ops/cost
- Stayed adaptive when redirected
- Never went silent

---

These are the explicit scripts and matrices for Act 2. Use the timed script as the spine, the archetype matrix as the content lookup, and the recovery lines when the performance starts to drift.


**Act 2 Scoring Matrix — Detailed Reference**  
*(What interviewers actually score in System Design)*

Interviewers evaluate against a small set of observable dimensions. Below is the operational breakdown: what they listen for, positive vs negative signals, and how expectations scale with level.

---

### 1. Problem Structuring & Drive

**What they want to see**  
You lead the conversation, impose structure, and do not wait to be told what to do next.

**Positive signals**
- Explicitly separate functional vs non-functional requirements
- Prioritize scope out loud
- Move through the timed script without long silences
- Keep the interviewer oriented (“Next I’ll cover the data model…”)

**Negative signals**
- Waiting for the interviewer to direct each step
- Jumping straight into drawing boxes
- Drifting or losing the thread
- Over-indexing on minor details early

**Level scaling**
- Mid: Clear structure is enough
- Senior+: You are expected to drive harder and surface the most important risks unprompted

**Common probes**
- Silence after the problem statement
- “What else do you need to know?”

---

### 2. Archetype Mapping & Core Problem Identification

**What they want to see**  
You quickly recognize what kind of system this is and name the hard part.

**Positive signals**
- Map to the correct archetype(s) within the first few minutes
- Explicitly name the core bottleneck (celebrity fan-out, double-booking, geospatial indexing, etc.)
- Adjust if the prompt combines multiple archetypes

**Negative signals**
- Generic design that could apply to anything
- Missing the defining hard problem of the domain
- Forcing an ill-fitting template

**Level scaling**
- Mid: Correct high-level mapping is the main bar
- Senior+: Must also articulate why alternative mappings are worse

**Common probes**
- “What do you think is the hardest part of this system?”
- Pointed redirects when a core issue is ignored (“What about the celebrity problem?”)

---

### 3. Completeness of Expected Components (The Boxes)

**What they want to see**  
You hit the mandatory building blocks for that archetype.

**Positive signals**
- All expected major components appear (e.g., hybrid fan-out + Redis timeline + NoSQL for feeds)
- Components are justified, not just drawn
- Clear data flow between boxes

**Negative signals**
- Missing high-signal components the interviewer considers table stakes
- Orphan boxes with no clear role
- Over-engineering with unnecessary services

**Level scaling**
- Mid: Hitting the standard boxes is usually sufficient
- Senior+: Expected to discuss alternatives and why you rejected them

**Common probes**
- “Why this component?”
- “What happens if we remove X?”

---

### 4. Deep Dive Quality (The Real Differentiator)

**What they want to see**  
You can go one or two levels deeper on the actual hard parts and reason about failure.

**Positive signals**
- Concrete discussion of consistency, failure modes, degradation, and recovery
- Clear explanation of the core bottleneck solution (how fan-out actually works, how locking prevents double-booking, etc.)
- Trade-off language that shows you understand what you are giving up

**Negative signals**
- Staying at high-level boxes for the entire round
- Hand-waving the hard part
- Inability to discuss what breaks and how the system behaves under partial failure

**Level scaling**
- Mid: Solid treatment of the main bottleneck
- Senior+: Must include operational concerns (monitoring, rollback, cost, multi-region when relevant)

**Common probes**
- “Walk me through what happens when X fails”
- “How does this behave at 10x load?”
- “What are the consistency guarantees here?”

---

### 5. Estimation & Justification

**What they want to see**  
Directional numbers used to drive decisions, not precise calculations for their own sake.

**Positive signals**
- Rough but reasonable QPS, storage, or bandwidth estimates
- Numbers explicitly used to justify caching, sharding, async processing, etc.
- Assumptions stated out loud

**Negative signals**
- Skipping estimation entirely when scale matters
- Spending excessive time on precise arithmetic
- Numbers that contradict the design choices

**Level scaling**
- Mid: Light directional math is enough
- Senior+: More scrutiny on whether the numbers actually support the architecture

---

### 6. Communication & Collaboration

**What they want to see**  
Structured, calm, collaborative narration throughout.

**Positive signals**
- Thinking out loud
- Checking in with the interviewer
- Clean incorporation of hints and redirects
- Clear diagrams and labeled components

**Negative signals**
- Long silences
- Defensiveness when challenged
- Ignoring interviewer signals
- Messy or unlabeled diagrams

---

### Quick Scoring Reality

| Dimension                        | Relative Weight        | Notes                                            |
| -------------------------------- | ---------------------- | ------------------------------------------------ |
| Structure & Drive                | High                   | Sets the floor                                   |
| Correct archetype + Core Problem | Very High              | Easy way to lose the room early                  |
| Mandatory boxes present          | Very High              | Missing expected components is heavily penalized |
| Deep dive on the hard part       | Highest differentiator | Separates Hire from Strong Hire                  |
| Estimation quality               | Medium                 | Only needs to be directional and useful          |
| Communication & adaptability     | High                   | Process is scored continuously                   |

---

### Strong Hire vs Hire (Practical Distinction)

- **Hire**: Correct archetype, most mandatory boxes, decent structure, some treatment of the core bottleneck.
- **Strong Hire**: All of the above + early naming of the core problem, solid deep dive with failure modes and trade-offs, clean adaptation to redirects, and (at senior) operational/cost awareness.

---

This is the Act 2 scoring matrix. Use it both to prepare designs and to audit your mock performances.


**Act 2 Scoring Matrix — with Senior-Level Examples**

Below is the same matrix, now expanded with concrete senior-level illustrations for each dimension.

---

### 1. Problem Structuring & Drive

**Senior positive example**  
“I’ll treat this as a feed system with a celebrity fan-out problem as the core constraint. For the next 40 minutes I’ll focus on write path, read path, and timeline storage. We can extend to notifications or search if time remains. First I need rough scale: daily active users, posts per user, and read/write ratio.”

**Why it scores senior**  
You impose structure, name the hard problem early, set scope boundaries, and pull the necessary inputs instead of waiting.

---

### 2. Archetype Mapping & Core Problem Identification

**Senior positive example**  
“This is primarily a content-feed archetype with a secondary real-time delivery requirement. The defining hard problem is the celebrity bottleneck: pure push will melt on accounts with tens of millions of followers, pure pull will make normal users’ feeds too slow. I’ll use hybrid fan-out and call out exactly where we switch strategies.”

**Why it scores senior**  
You map cleanly, name the core problem in precise terms, and preview the solution approach before drawing.

---

### 3. Completeness of Expected Components

**Senior positive example** (Feed system)  
You draw and justify:  
- API gateway + post service  
- Kafka for decoupling  
- Fan-out workers  
- Redis timeline cache (ZSET by timestamp)  
- Cassandra/DynamoDB for source-of-truth posts (partitioned by user_id)  
- Separate path for celebrity/pull merge on read  
And you explicitly say why each exists and what happens if it is removed.

**Why it scores senior**  
All mandatory boxes are present *and* justified; alternatives are briefly acknowledged and rejected with reasoning.

---

### 4. Deep Dive Quality (Highest Differentiator)

**Senior positive example** (Double-booking / inventory)  
“The core risk is two users purchasing the last seat. I’m using a combination of a short-held distributed lock (Redis) and a state machine in Postgres: AVAILABLE → RESERVED (90-second TTL) → PAID. On payment failure or timeout a background job returns the seat. Under partition I prefer to fail closed on reservation rather than oversell. Monitoring focuses on reservation expiry rate and lock wait times. Rollback is feature-flag + database state reversion.”

**Why it scores senior**  
You go deep on the actual mechanism, cover failure modes, consistency choice, degradation behavior, observability, and recovery.

---

### 5. Estimation & Justification

**Senior positive example**  
“Assuming 50 M DAU, 5 posts per user per day, and a 50:1 read/write ratio, we’re looking at roughly 3 k writes/sec average and 150 k reads/sec average, with peaks 3–5× higher. At that read volume a cache-aside Redis layer is mandatory; the primary store alone won’t sustain the QPS. Storage for two years of posts is on the order of tens of TB, so we will need partitioning from day one.”

**Why it scores senior**  
Numbers are directional, assumptions are stated, and every number is immediately used to justify an architectural decision.

---

### 6. Communication & Collaboration

**Senior positive example**  
When the interviewer says “What about multi-region?”  
“Good point — I had left that implicit. For multi-region I would start with active-passive for the write path to keep consistency simpler, replicate the timeline caches regionally, and accept slightly stale reads across regions. If we need active-active later we would move to conflict resolution on the post store. I can dig into the replication lag and failover story if you’d like.”

**Why it scores senior**  
You incorporate the redirect cleanly, extend the design without defensiveness, and offer the interviewer control of depth.

---

### Senior-Level Strong Hire Pattern (Summary)

A senior candidate who consistently clears the bar usually:

- Names the core problem in the first 5 minutes  
- Drives the entire script without needing prompts  
- Hits every mandatory box and briefly justifies the major choices  
- Produces a deep dive that includes failure modes, consistency, and basic operability  
- Uses estimation only to support decisions  
- Treats every interviewer interjection as high-signal and adapts in real time  

Mid-level can pass with correct structure and boxes.  
Senior is expected to add precision on the hard part, explicit trade-offs, and operational awareness.


**Act 1 Scoring Matrix — Detailed Reference**  
*(What interviewers actually score in the Coding Round)*

Interviewers evaluate against a small set of observable dimensions. Below is the operational breakdown: what they listen for, positive vs negative signals, level scaling, and common probes.

---

### 1. Problem Structuring & Clarification

**What they want to see**  
You take control early, clarify ambiguity, and set up the problem before coding.

**Positive signals**
- Restate the problem in your own words
- Ask targeted constraint questions (size, sorted, negatives, duplicates, return format)
- Confirm or provide an example
- Explicitly say you will start with brute force then optimize

**Negative signals**
- Jumping straight into code
- Assuming constraints without checking
- Long silence after the problem is given
- Asking no clarifying questions on an ambiguous prompt

**Level scaling**
- Mid: Basic clarification is sufficient
- Senior: Expected to surface edge cases and constraints that affect approach choice earlier

**Common probes**
- Silence after stating the problem
- Vague problem statements designed to test whether you clarify

---

### 2. Pattern Recognition & Approach

**What they want to see**  
You identify the right pattern quickly and explain the approach before coding.

**Positive signals**
- Name the pattern out loud early (“This is a classic sliding window because…”)
- State brute force + complexity, then optimal + complexity
- Walk through the approach on an example before writing code
- Clear trigger → template connection

**Negative signals**
- Never naming the pattern
- Coding while still figuring out the approach
- Jumping to optimal with no brute-force discussion
- Incorrect pattern choice with no recovery

**Level scaling**
- Mid: Correct pattern + clean optimal approach is the main bar
- Senior: Expected to discuss trade-offs between approaches and handle follow-up constraint changes smoothly

**Common probes**
- “Can you think of a better approach?”
- Constraint changes after you lock in a solution

---

### 3. Implementation Quality

**What they want to see**  
Readable, mostly correct code produced while narrating.

**Positive signals**
- Continuous narration while typing
- Meaningful variable names
- Clean structure, minimal syntax issues
- Self-corrects small bugs out loud

**Negative signals**
- Long silent coding stretches
- Cryptic names or dense one-liners that hurt readability
- Code that does not match the stated approach
- Repeated syntax or off-by-one errors that go unaddressed

**Level scaling**
- Mid: Working, readable solution is enough
- Senior: Higher expectation of cleanliness and ability to adapt the implementation when constraints change

**Common probes**
- “Can you walk me through what this variable is doing?”
- Requests to modify the code for a new constraint

---

### 4. Verification & Edge Cases

**What they want to see**  
You prove the code works and actively consider failure cases.

**Positive signals**
- Traces the main example through the code
- Lists and handles edge cases (empty, single element, all duplicates, overflow, etc.) without prompting
- Restates final time and space complexity
- Uses leftover time for trade-offs or further testing

**Negative signals**
- Declaring “done” with no verification
- Missing obvious edge cases
- Unable to simulate the code on an example
- No complexity statement

**Level scaling**
- Mid: Basic example trace + a few edges
- Senior: More thorough edge discussion and proactive complexity/trade-off commentary

**Common probes**
- “What happens if the input is empty / all the same / very large?”
- “Can you optimize space further?”

---

### 5. Adaptation & Probe Resistance

**What they want to see**  
You stay composed and adjust when the problem is mutated or hints are given.

**Positive signals**
- Clean acknowledgment of hints and immediate incorporation
- Explicit restatement of the new approach after a constraint change
- Calm recovery when stuck (step back to example, implement brute force, etc.)
- No defensiveness

**Negative signals**
- Ignoring or arguing with hints
- Freezing when constraints change
- Long silence when stuck
- Defensive or flustered responses

**Level scaling**
- Mid: Basic recovery and hint incorporation
- Senior: Expected to treat constraint changes as normal and re-orient quickly while keeping narration strong

**Common probes**
- Mid-problem constraint changes
- “What if we need to support streaming / 10x scale / unsorted input?”
- Controlled hints

---

### 6. Communication & Collaboration

**What they want to see**  
Structured, collaborative talking throughout the entire round.

**Positive signals**
- Thinks out loud continuously
- Treats interviewer as a partner
- Checks understanding
- Clear, calm tone even when uncertain

**Negative signals**
- Extended silence
- Monologue with no interaction
- Apologetic or overly anxious delivery
- Ignoring interviewer cues

---

### Quick Scoring Reality

| Dimension                      | Relative Weight          | Notes                                        |
| ------------------------------ | ------------------------ | -------------------------------------------- |
| Pattern recognition + approach | Very High                | Early naming is a strong positive            |
| Narration & process            | Very High                | Often outweighs pure correctness             |
| Implementation quality         | High                     | Readable + mostly correct is the bar         |
| Verification & edges           | High                     | Frequently separates Hire from weaker scores |
| Adaptation to probes           | High (especially senior) | Increasingly used as a filter                |
| Communication & composure      | High                     | Scored continuously                          |

---

### Strong Hire vs Hire (Practical Distinction)

- **Hire**: Correct pattern, working (or nearly working) code, basic narration, some edge-case discussion.
- **Strong Hire**: Pattern named early, clean brute → optimal progression, continuous narration, solid verification, calm adaptation to hints or constraint changes, proactive complexity/trade-off talk.

---

### Senior-Level Emphasis

At senior level, interviewers still care about the classic signals above, but they add weight to:
- Speed and accuracy of pattern recognition under light pressure
- Ability to adapt the solution when constraints change
- Quality of trade-off discussion
- Composure and collaborative tone when the problem is twisted

Pure algorithmic novelty is rarely the differentiator. Clean execution of the expected performance under probing is.


Here are the four missing high-value sections for Act 2, written to match the existing voice and structure.

---

```markdown
## Practice Protocol (System Design)

The goal is not to invent original architectures. The goal is to make archetype mapping, the timed script, and core-bottleneck deep dives automatic under observation.

### Minimum Effective Dose (per week while actively interviewing)

| Session Type                   | Frequency             | Duration  | Exact Goal                                                                                |
| ------------------------------ | --------------------- | --------- | ----------------------------------------------------------------------------------------- |
| Full timed narrated mock       | 3×                    | 50–60 min | Run the complete script end-to-end on a real prompt                                       |
| Archetype mapping drill        | 2×                    | 20–25 min | Given 8–10 prompts, map each to archetype(s) + name core problem in <90s                  |
| Forced deep-dive practice      | 1–2×                  | 30–40 min | After high-level design, spend the rest of the time only on the hard part                 |
| Constraint / redirect mutation | 1×                    | 40 min    | Solve, then receive live redirects (“What about celebrity?”, multi-region, cost, failure) |
| Recording + self-review        | After every full mock | 15–20 min | Watch and score against the checklist below                                               |

### Self-Review Checklist (use after every recorded mock)
- [ ] Drove the conversation from the start (did not wait to be led)?
- [ ] Mapped to correct archetype(s) and named the Core Problem by ~minute 10–12?
- [ ] Hit every mandatory box for the archetype?
- [ ] Used directional numbers only to justify decisions?
- [ ] Deep-dived the real bottleneck with failure modes / consistency?
- [ ] Discussed trade-offs unprompted?
- [ ] Incorporated redirects cleanly (acknowledge → adjust → restate)?
- [ ] Never went silent for long stretches?
- [ ] At senior level: touched ops, cost, or multi-region when relevant?

### Progression Rules
- If archetype mapping takes >90 seconds → more pure mapping drills, fewer full designs.
- If you stay too high-level → force deep-dive-only sessions until the bottleneck discussion feels natural.
- If you freeze or get defensive on redirects → make mutation practice mandatory.
- Once the 7 archetypes + script feel automatic, stop collecting new “Design X” prompts. Extra volume past that point has low return.

### Volume Reality Check
Most candidates who consistently clear Act 2 at large companies have done 40–70 focused, narrated system design mocks with deliberate script practice — not hundreds of passive diagram reviews.

---

## Ranked Failure Modes (System Design)

Ordered by observed frequency and scoring impact.

1. **Never names the Core Problem**  
   Draws reasonable boxes but never explicitly says “the hard part is celebrity fan-out / double-booking / geospatial indexing.” Interviewers treat this as weak domain recognition.  
   Fix: Force the sentence “The core problem of this system is X” by minute 10–12 every practice run.

2. **Wrong or incomplete archetype mapping**  
   Misses the dominant pattern or fails to combine archetypes when needed (e.g., treats Airbnb as pure geospatial and ignores booking contention).  
   Fix: Pure mapping drills until recognition is fast and accurate.

3. **Missing mandatory boxes**  
   Omits components the interviewer considers table stakes (no hybrid fan-out for feeds, no spatial index for Uber-style, no locking for Ticketmaster-style).  
   Fix: Memorize the mandatory box list per archetype cold.

4. **Stays at high-level boxes the entire round**  
   Never goes deep on the actual bottleneck, failure modes, or consistency. This is the most common reason for “Hire” instead of “Strong Hire.”  
   Fix: Reserve minutes 35–50 strictly for deep dive in every mock.

5. **Does not drive the conversation**  
   Waits for the interviewer to ask “What next?” or sits in silence after the problem is given.  
   Fix: Treat silence as a signal to keep structuring out loud.

6. **Poor reaction to redirects**  
   Gets defensive, ignores the hint, or fails to adjust the diagram when the interviewer points at a missing piece.  
   Fix: Practice the exact recovery script: acknowledge → incorporate → restate.

7. **Over-precise estimation or no estimation at all**  
   Either burns 10+ minutes on exact arithmetic or never produces directional numbers to justify decisions.  
   Fix: Keep estimates rough and immediately tie them to architecture choices.

8. **Finishes core design and then goes quiet**  
   Has 10–15 minutes left and stops adding signal (no failure modes, no ops, no trade-offs, no 10x path).  
   Fix: Always have a short list of extension topics ready.

These eight cover the large majority of process and content failures in Act 2.

---

## Day-of 1-Pager (System Design)

**Act 2 — System Design Cheat Sheet**

### Core Reality
This is a template + performance filter. Score = correct archetype mapping + mandatory boxes + named core problem + deep dive on the bottleneck + structured narration. Process and completeness usually outweigh originality.

### 50–60 Min Script
| Time  | Action                                                                  | Must-Hit Signal                             |
| ----- | ----------------------------------------------------------------------- | ------------------------------------------- |
| 0–5   | Restate → Functional vs Non-Functional → clarify → scope prioritization | You drive; no drawing yet                   |
| 5–12  | Directional estimates only → use numbers to justify decisions           | Numbers support architecture, not precision |
| 12–18 | Key APIs + core data model + sharding key if relevant                   | Clear entities and interfaces               |
| 18–35 | Map to archetype(s) → draw mandatory boxes → **name Core Problem**      | Correct template + bottleneck named         |
| 35–50 | Deep dive on 1–2 hardest parts (consistency, failure, degradation)      | Real depth on the bottleneck                |
| 50–60 | Trade-offs, monitoring, 10x, cost/ops (senior)                          | Proactive; never silent                     |

### Recovery Lines
- Wrong archetype: “I under-weighted [core problem]. Adjusting by adding [missing boxes].”
- Redirect (“What about celebrity / double-booking / multi-region?”): Acknowledge → incorporate → restate.
- Running out of time: “Focusing remaining time on the core bottleneck: [specific part].”
- Finished early: Push into failure modes, ops, cost, or multi-region.

### Archetype Quick Triggers
1. Feed / Social → Celebrity fan-out → Hybrid fan-out + Redis ZSET + NoSQL
2. Messaging → Persistent connections → Stateful gateways + Presence + high-write store
3. Media → Large upload + compute → Presigned URL + CDN + async pipeline
4. Key-Value / Rate Limit → Extreme reads → ID gen + Cache-aside + indexed store
5. Geospatial → Nearby queries → Spatial index (H3/S2/…) + live location + match
6. Booking / Inventory → Double-booking → Lock / SELECT FOR UPDATE + state machine + TTL
7. Search / Analytics → High write + fast query → Kafka + processing + search/OLAP

### Instant Self-Check
- Drove from the start?
- Archetype + Core Problem named early?
- All mandatory boxes present?
- Deep-dived the hard part?
- Adapted cleanly to redirects?
- Used leftover time?

### One-Line Truth
Map → Name the hard part → Hit the boxes → Deep dive → Adapt.

---

## Senior+ / Staff Notes (Act 2)

At senior and above, the classic 7-archetype script is still the foundation, but the scoring weight shifts.

### What Changes
- Correct boxes get you to “Hire.” Depth, judgment, and operational awareness separate “Strong Hire.”
- Interviewers more often redirect into failure modes, cost, multi-region, deployment, and graceful degradation.
- Pure “Design Twitter” prompts become less common; prompts are more likely to include realistic constraints or ask you to evolve an existing design.
- Originality is still secondary to hitting expected signals, but you are expected to briefly acknowledge alternatives and why you rejected them.

### Adjusted Priorities
1. **Name the core problem early and precisely**, then keep returning to it.
2. **Treat the deep dive as the main event.** Include:
   - Concrete failure modes and how the system degrades
   - Consistency choices and their consequences
   - Basic observability (what you monitor and why)
   - Cost or resource implications when scale is high
   - Rollback or mitigation story when relevant
3. **Handle multi-region and operational questions cleanly.**  
   Have a default stance ready (e.g., active-passive for strong consistency on writes, regional caches, accept cross-region staleness, etc.) and be able to adjust.
4. **Show you know when the standard template is insufficient.**  
   Briefly say what would need to change for 10x or for stronger consistency requirements.
5. **Drive harder.** Senior candidates are expected to impose structure and surface the important risks without being prompted.

### What to De-emphasize
- Spending extra time polishing the high-level diagram once the boxes are correct.
- Inventing exotic components that are not required by the archetype.
- Precise capacity calculations that do not change decisions.

### Practical Implication
Keep the 7 archetypes and mandatory boxes sharp enough that you never miss them. Then spend the majority of remaining preparation on deep-dive quality, failure/ops discussion, and clean adaptation to senior-style redirects. The candidates who clear senior system design rounds are usually not the ones with the most original designs; they are the ones who execute the expected template cleanly and then demonstrate real depth on the hard parts and operational realities.
```

---

These four sections bring Act 2 to the same level of completeness as Act 1.

Next options:
1. Integrate everything (meta-game + Act 1 + Act 2) into one clean master document.
2. Move to Act 3 (Behavioral) in the same style.
3. Adjust any of the new Act 2 sections.

Which do you want?