# Production Readiness Scorecard – Template

Use this worksheet to track how close your prototype is to production-ready across the four core pillars. Update it at the start of the series (Day 0) and after each major improvement.

## How to Use

1. Review the pillar definitions in Article 1 to align on what “done” means for your product.
2. Score each pillar from **1 (nonexistent)** to **5 (rock solid)** based on current evidence, not gut feel alone.
3. Capture the specific proof or gaps in the “Evidence / Notes” column so you can spot regressions later.
4. Set a target score and next checkpoint date to make progress measurable.

| Pillar | Current Score (1‑5) | Target Score | Evidence / Notes | Owner | Next Checkpoint |
| --- | --- | --- | --- | --- | --- |
| Reliability | 2 | 4 | One happy-path integration test passes; no retry/backoff logic yet. | Bohdan | 2026‑01‑01 |
| Security | 1 | 4 | API keys stored in `.env`; secrets not rotated; no dependency scanning. | Bohdan | 2026‑01‑01 |
| Observability | 1 | 4 | `console.log` only; no structured logs or dashboards. | Bohdan | 2026‑01‑01 |
| Supportability | 2 | 4 | README covers setup; no runbooks; onboarding doc is stale. | Bohdan | 2026‑01‑01 |
|  |  |  |  |  |  |

**Legend**

- **1** – Nonexistent: nothing in place yet.  
- **2** – Nascent: ad-hoc effort, unreliable.  
- **3** – Emerging: repeatable for core paths, fragile under stress.  
- **4** – Mature: consistent, documented, monitored.  
- **5** – Operationalized: battle-tested, continuously improved.

Re-score after each release and link to the diff or evidence (tests, dashboards, docs) that justify the new rating.
