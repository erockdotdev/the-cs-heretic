**Act 2 – System Design (Compressed)**

### Approved Architecture Archetypes (the ones that actually get asked)

These are the high-frequency “shapes” interviewers expect you to map almost every problem onto. Master these and you can handle 90%+ of system design interviews.

| #   | Archetype                         | Typical Question Triggers                | Core Shape                                            |
| --- | --------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| 1   | **URL Shortener**                 | TinyURL, bit.ly, pastebin                | Hash → short key, redirect service, analytics         |
| 2   | **News Feed / Timeline**          | Twitter/X, Instagram, Facebook feed      | Fan-out (write or read), ranking, caching             |
| 3   | **Chat / Messaging**              | WhatsApp, Slack, Messenger               | Real-time delivery, presence, message storage, groups |
| 4   | **Video / Media Streaming**       | YouTube, Netflix, Twitch                 | Upload → processing → CDN delivery, adaptive bitrate  |
| 5   | **Ride-Hailing / Matching**       | Uber, Lyft, DoorDash                     | Geospatial matching, real-time location, dispatch     |
| 6   | **File Storage / Sync**           | Dropbox, Google Drive, iCloud            | Chunking, dedup, sync protocol, metadata vs blob      |
| 7   | **Search / Autocomplete**         | Google search, typeahead, product search | Inverted index, ranking, prefix trees, sharding       |
| 8   | **Notification System**           | Push, email, SMS, in-app                 | Priority queues, fan-out, multi-channel delivery      |
| 9   | **Rate Limiter**                  | API gateway, abuse prevention            | Token bucket / sliding window, distributed counters   |
| 10  | **E-commerce / Booking**          | Amazon cart, Ticketmaster, Airbnb        | Inventory, reservations, payments, consistency        |
| 11  | **Web Crawler**                   | Googlebot-style, link discovery          | Frontier queue, politeness, dedup, storage            |
| 12  | **Distributed Key-Value / Cache** | Redis-like, Dynamo-style                 | Partitioning, replication, consistency trade-offs     |

Most real questions are one of these or a light combination of two.

---

### Mandatory Components + Expected Order

Interviewers expect you to follow a predictable sequence. Deviating too much looks unprepared.

**Standard Order (stick to this unless the interviewer steers you):**

1. **Clarify Requirements** (2–4 min)  
   Functional + Non-functional (scale, latency, consistency, availability). Ask about read/write ratio, data size, users, peak QPS.

2. **Back-of-envelope Estimates** (2–3 min)  
   QPS, storage, bandwidth. Show you can do quick math.

3. **API Design** (optional but often expected)  
   Core endpoints with request/response shapes.

4. **High-Level Design** (the box diagram)  
   Draw the major boxes first.

5. **Deep Dive** into the hard parts  
   Data model, scaling strategy, critical flows.

6. **Bottlenecks, Trade-offs & Failure Modes**  
   What breaks, how you handle it, consistency vs availability choices.

**Mandatory Components that almost always appear (in roughly this order on the board):**

| Order | Component                   | Why it’s expected                     |
| ----- | --------------------------- | ------------------------------------- |
| 1     | Clients (Web/Mobile)        | Starting point                        |
| 2     | Load Balancer / API Gateway | Entry point + traffic distribution    |
| 3     | Application / Service Layer | Stateless servers                     |
| 4     | Cache (Redis / Memcached)   | Almost every design needs one         |
| 5     | Primary Database            | SQL or NoSQL + reason for choice      |
| 6     | Object / Blob Storage (S3)  | For media, files, large objects       |
| 7     | Message Queue (Kafka/SQS)   | Async work, decoupling                |
| 8     | CDN                         | Static assets & media delivery        |
| 9     | Search Index (if needed)    | Elasticsearch / custom inverted index |
| 10    | Monitoring / Logging        | Usually mentioned at the end          |

**Extra components that appear by archetype:**
- Geospatial index / quadtree → Ride-hailing
- Fan-out service + ranking service → News Feed
- Chunk servers + metadata DB → File Storage
- Transcoding workers → Video Streaming
- Presence service + WebSocket tier → Chat

---

**Key operating rule for Act 2**  
Interviewers score you more on **hitting the expected shape + talking through trade-offs cleanly** than on inventing something novel. Map the problem to one of the 12 archetypes above as early as possible, then fill in the mandatory components in the standard order.

Want the next layer (exact talking scripts / trade-off phrases for the most common archetypes), or should we move to Act 3 Behavioral?