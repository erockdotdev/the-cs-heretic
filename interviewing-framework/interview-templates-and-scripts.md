**Full Scripts & Templates – All Sections**

Here is a complete, ready-to-use set of scripts and templates for every major part of the system (excluding negotiation, which you already have).

---

### 1. Coding Interview – Narration Scripts

**Opening (first 20–30 seconds)**
> “I’m going to start by restating the problem to make sure I understand it correctly…  
> The inputs are ___, the expected output is ___, and the main constraints are ___.  
> I’d like to begin with a brute-force approach so we have a baseline, then optimize.”

**Pattern Recognition**
> “This looks like a classic [Sliding Window / Two Pointers / Binary Search / BFS] problem because of [trigger].”

**While coding**
> “I’m defining a left and right pointer here…  
> I’ll expand the window while the condition holds, and shrink it when it breaks…  
> I’m using a hash map to track frequency so I can check the condition in O(1).”

**When stuck**
> “I’m considering two approaches right now. Approach A is ___ which would be O(___). Approach B is ___ which trades ___ for ___. I’m leaning toward A because ___. Does that direction make sense, or would you like me to explore B?”

**After writing the solution**
> “Let me walk through an example to verify…  
> Time complexity is O(___) because ___. Space is O(___).  
> I can also discuss how this would change if the constraints were ___.”

**When they give a hint or change a constraint**
> “Got it — so we’re now optimizing for [new constraint]. That changes the trade-off. I’ll adjust by ___.”

---

### 2. System Design – Full Structure Script

**1. Clarify Requirements (2–4 min)**
> “Before I start designing, I want to make sure I understand the requirements.  
> Functional: …  
> Non-functional: What is the expected scale (DAU/QPS)? Read/write ratio? Latency targets? Consistency requirements? Availability goals?”

**2. Back-of-envelope**
> “Let me do some quick estimates.  
> Assuming ___ users and ___ requests per user per day, we’re looking at roughly ___ QPS.  
> Storage will be approximately ___.”

**3. High-level design**
> “I’ll start with a high-level design.  
> Clients talk to a load balancer, which distributes traffic to a fleet of stateless application servers.  
> We’ll have a cache layer in front of the database, a message queue for async work, and object storage for media/files.”

**4. Deep dive transition**
> “I’d like to go deeper on the part that feels most critical — [data model / scaling the write path / fan-out / search index]. Would you prefer I focus there, or is there another area you want to prioritize?”

**5. Trade-off language (use repeatedly)**
> “The main trade-off here is between ___ and ___.  
> I chose ___ because ___.  
> If we prioritized ___ instead, I would switch to ___.”

**6. Closing**
> “To summarize: we have [core components]. The main bottlenecks would be ___, and we handle them by ___.  
> Happy to go deeper on any part or discuss failure scenarios.”

---

### 3. Behavioral – STAR Templates

**Universal STAR Skeleton**
> “In [timeframe] at [Company], we were facing [Situation – 1–2 sentences max].  
> I was responsible for [Task].  
> I first [Action 1]. Then I [Action 2]. I also [Action 3].  
> As a result, we [quantified Result]. I also learned [optional short learning].”

**Ownership / Impact Template**
> “In Q___ of ___, our ___ was experiencing [problem + metric].  
> I owned reducing/improving that metric.  
> I started by diagnosing the root cause… I then designed and implemented… I coordinated with… I monitored and iterated…  
> We improved the metric from X to Y, which resulted in [business impact].”

**Conflict Template**
> “I disagreed with [person/team] about [decision].  
> I believed [my position] because [data/reasoning].  
> I scheduled a conversation, presented the data, listened to their concerns, and proposed [compromise or alternative].  
> We aligned on ___, and the outcome was [result]. The relationship remained strong because I focused on the problem rather than the person.”

**Failure / Ambiguity Template**
> “We were operating under high ambiguity around ___.  
> I took ownership of clarifying the problem by…  
> I made the call to… even though we didn’t have perfect information.  
> The initial approach didn’t fully work because ___. I then adjusted by…  
> Final result was ___. The main learning was ___.”

**Leadership / Influence Template**
> “I needed to get [people/teams] aligned on ___ without having direct authority.  
> I first built context by… I then created a clear proposal with trade-offs… I socialized it with key stakeholders… I addressed concerns by…  
> We got buy-in and delivered ___, which resulted in ___.”

---

### 4. Delivery & Calibration – Key Phrases

**Collaborative tone**
- “One approach I’m considering is…”
- “Would it be useful if I walked through the trade-offs here?”
- “I can go deeper on X or Y — which is more interesting right now?”
- “Does this direction match what you had in mind?”

**Confidence without arrogance**
- “I would do X because…”
- “My preference is X for these reasons… I’m open to Y if we value Z more.”

**Handling pushback**
- “That’s a fair point. The reason I chose this is ___. If we prioritize ___ instead, then I’d switch to ___.”
- “Good catch — let me adjust.”

**When thinking**
- “Give me a moment to think through this…”
- “I’m weighing two options right now…”

---

### 5. Signal Management – Resume Bullet Templates

**High-signal formula**
> [Action Verb] + [what you owned] + [how/technical approach] + [quantified result]

**Examples**
- “Owned end-to-end redesign of ___ using ___, reducing ___ by ___% and saving approximately $___ annually.”
- “Led migration of ___ to ___, improving p99 latency from ___ to ___ and increasing throughput by ___x.”
- “Drove cross-team initiative to ___, resulting in ___ and adoption by ___ teams.”
- “Designed and implemented ___, which decreased error rate from ___% to ___% during peak traffic.”

---

### 6. Preparation Loop – Weekly Checklist Template

**Weekly targets**
- [ ] 4–6 timed coding problems with full out-loud narration
- [ ] 1 full system design (45–60 min) + 1 deep-dive only
- [ ] Record and review 2–3 behavioral stories
- [ ] 1 mock with deliberate interruptions / constraint changes
- [ ] Update or re-map 1–2 stories to a target company’s language
- [ ] Review one weak pattern or archetype

**Pre-Interview Checklist (night before)**
- [ ] Review the 4 master stories and which competencies they hit
- [ ] Skim the key coding patterns and system design order
- [ ] Note 3–4 company-specific phrases/values
- [ ] Confirm level-appropriate scope for stories and designs
- [ ] Sleep

---

### 7. Mindset – Short Internal Scripts

**After a rejection**
> “This measures how well I performed the meta-game today, not my value as an engineer.  
> What specific part of the performance was weak? That’s what I improve next.”

**Before an interview**
> “My job is to execute the prepared system cleanly.  
> Stay calm, narrate, collaborate, and recover when needed.”

**When energy is low**
> “I don’t need to be perfect. I need to be fluent and composed.”

---

These templates cover the full system.

Would you like me to now compile **everything** (all sections + all scripts) into one single clean Markdown document you can save and use as the complete pragmatic guide?

Yes — that covers the full set of practical scripts and templates for every major section of the guide:

| Section                    | What was provided                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Coding**                 | Opening, pattern recognition, while-coding narration, stuck recovery, hint handling, closing                     |
| **System Design**          | Full end-to-end talking structure (requirements → estimates → high-level → deep dive → trade-offs → close)       |
| **Behavioral**             | Universal STAR skeleton + specific templates for Ownership, Conflict, Failure/Ambiguity, Leadership              |
| **Delivery & Calibration** | Collaborative phrases, confidence phrasing, pushback handling, thinking-out-loud lines                           |
| **Signal Management**      | High-signal resume bullet formula + examples                                                                     |
| **Preparation Loop**       | Weekly checklist + night-before checklist                                                                        |
| **Mindset**                | Internal scripts for rejection, pre-interview, low energy                                                        |
| **Negotiation**            | Full set (initial response, core ask, competing offer, base/equity/sign-on/level, counters, acceptance, decline) |

That is the complete working toolkit.

If you want any section expanded with more variations (e.g. more behavioral story examples, more system design deep-dive phrases, junior vs senior versions, or company-specific flavors), just say which one. Otherwise, we can compile the entire guide into one clean document.