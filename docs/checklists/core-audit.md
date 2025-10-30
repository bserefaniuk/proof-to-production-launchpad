# Core Hardening Audit Checklist

Use this worksheet during the first pass of hardening your prototype. Print it, copy it into Notion, or track it in your issue board.

Run `npm run diagnose:core` to generate `tmp/diagnostics/core.json` with automated findings, then annotate the checklist below with manual follow-ups.

## Architecture Boundaries

- [ ] HTTP handlers delegate to application/services layer (no direct repository calls)
- [ ] Domain rules live in entities/value objects (not controllers)
- [ ] Shared utilities have a single home (no copy/paste helpers)
- [ ] Bounded contexts are documented in `docs/architecture.md`

## Configuration & Secrets

- [ ] `.env.example` lists every required setting
- [ ] Runtime configuration validated via `EnvSchema`
- [ ] No production secrets checked into git
- [ ] Secrets rotation policy documented in `docs/ops/secrets-rotation.md`

## Data Touchpoints

- [ ] Sensitive fields tagged in `docs/data/classification.yaml`
- [ ] Encryption in transit and at rest confirmed
- [ ] Backups configured and restore drill completed
- [ ] Migration process documented and automated

## Operational Fitness

- [ ] Health endpoint covers database, queue, and config drift
- [ ] Alert routes defined in `docs/ops/alert-routing.md`
- [ ] Runbooks scoped for common incidents
- [ ] Error budget and latency SLIs recorded in `README.md`

## Follow-Up Notes

- Architecture adjustments needed:
- Configuration gaps to address:
- Data governance blockers:
- Operational debt to schedule:
