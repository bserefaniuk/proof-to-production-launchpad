# North Star Alignment – Template

Use this doc to capture the production “north star” before upgrading the LaunchPad PoC. Copy the table below and update the rows as your understanding evolves.

## How to Use

1. Schedule a 30-minute checkpoint with yourself or your stakeholders.
2. Fill in one row per major outcome or initiative.
3. Revisit the table after each major decision (architecture changes, new compliance findings, etc.).

| Goal / Outcome | Success Metric | Deadline / Guardrail | Stakeholders | Risks & Mitigations |
| --- | --- | --- | --- | --- |
| Example: Keep onboarding API reliable during beta | 99% of requests succeed; p95 < 400 ms | Beta launch in 6 weeks; hosting budget €150/month | Customer success, sales pilot lead | Risk: integration spikes traffic unexpectedly → Mitigation: add synthetic monitoring & rate limits |
|  |  |  |  |  |

**Tip:** Link to supporting artifacts (dashboards, runbooks, regulatory checklists) in the “Stakeholders” or “Risks & Mitigations” column so everything lives in one place.
