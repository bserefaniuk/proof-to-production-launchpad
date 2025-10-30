# LaunchPad – Proof to Production Series Workspace

This repository hosts the evolving PoC for the “Proof to Production: Shipping Confident Software Solo” Hashnode series. It captures the full journey from a scrappy prototype to a production-ready platform with clear milestones that readers can follow release by release.

## Repository Structure

```
proof-to-production-launchpad/
  backend/      # Nest.js service with DDD boundaries and in-memory persistence
  frontend/     # React + Vite client application
  docs/         # Architecture notes, ADRs, checklists, and runbooks
  infra/        # Terraform configuration for AWS infrastructure
  scripts/      # Utility scripts for diagnostics, migrations, and drift detection
```

Each article in the series will tag a release (e.g. `v0.2.0-core-hardened`) so you can diff the changes and replay the upgrade path.

## Getting Started Locally

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

# Frontend (in a new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173` to interact with the seeded launch-readiness dashboard. The frontend will hit the backend at `http://localhost:3000/api` unless overridden via environment variables.

## Current Milestone – v0.2.0-core-hardened

Building on the initial PoC baseline, this release focuses on bulletproofing the core system with production-ready scaffolding:

- **Architecture Decision Records (ADRs)** – Documented rationale for layered architecture and persistence choices.
- **API Contracts** – OpenAPI specification with versioned changelog in `docs/contracts/`.
- **Data Classification** – Sensitive field tagging and governance policies in `docs/data/classification.yaml`.
- **Infrastructure as Code** – Terraform templates for AWS Parameter Store and backup configuration.
- **Observability Foundation** – Loki dashboard template and alert routing policies.
- **Operational Runbooks** – Recovery procedures and secrets rotation guidelines in `docs/ops/` and `docs/runbooks/`.
- **Hardening Utilities** – Diagnostic scripts (`npm run diagnose:core`), config drift detection, and event replay tooling.

Use the **Core Hardening Audit Checklist** in `docs/checklists/core-audit.md` to systematically assess architecture boundaries, configuration hygiene, data governance, and operational fitness.

## Roadmap Highlights

The upcoming installments will:

- Swap the in-memory adapters for Postgres and background jobs.
- Introduce authentication, multi-tenancy, and domain validations.
- Layer in observability, security guardrails, and AWS EC2 rollout guides (free-tier friendly).
- Provide checklist-driven quality gates so you can replicate the upgrade path.

Track progress via the `docs/` folder and release notes linked from each article.

## North Star Scorecard

The readiness metrics referenced throughout the series live in `docs/observability/loki-dashboard.json` and `docs/ops/secrets-rotation.md`. Record your latest reliability, security, observability, and supportability scores here so stakeholders can track improvement over time.

## Utility Scripts

Run these from the repository root:

- `npm run diagnose:core` – generate `tmp/diagnostics/core.json` with architecture, config, and data findings.
- `npm run config:drift` – compare `.env.local` against `.env.example` to flag missing keys.
- `npm run notify:contracts` – surface the latest API contract changes for consumers.
- `npm run replay:events -- --file <path>` – replay JSONL event logs during recovery drills.
- `npm run db:migrate` / `npm run db:plan` – placeholders wired once the Postgres adapter lands.
