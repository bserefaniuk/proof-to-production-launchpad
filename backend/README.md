# LaunchPad Backend (Nest.js)

This Nest.js service powers the LaunchPad readiness tracker that accompanies the “Proof to Production: Shipping Confident Software Solo” series. The codebase leans on Domain-Driven Design boundaries so we can evolve the PoC into a production-ready architecture over the course of the articles.

## Project Layout

```
src/
  domain/           # Entities, aggregates, repository contracts
  application/      # Use-case services and command DTOs
  infrastructure/   # Adapter implementations (in-memory persistence for now)
  interfaces/       # HTTP DTOs and controllers
  modules/          # Nest.js modules wiring dependencies together
```

We start with an in-memory repository and a small seed dataset so that the frontend renders meaningful data even before persistence is introduced. Upcoming installments will swap the adapters for real infrastructure.

## Getting Started

```bash
npm install
cp .env.example .env
npm run start:dev
```

The API listens on `http://localhost:3000/api` by default.

### Useful Scripts

- `npm run start:dev` – start the service with hot reload
- `npm run test:e2e` – run the API smoke test suite
- `npm run lint` – static analysis (will evolve as coding standards tighten)

## Current Capabilities (v0.1.0 PoC)

- Create projects, checklists, and tasks in-memory via the REST API.
- Toggle task status to illustrate workflow progression.
- Validation, DTOs, and architecture boundaries ready for the production hardening journey.

## Next Steps in the Series

Future articles will:

- Replace the in-memory adapter with PostgreSQL and migrations.
- Add authentication/authorization and multi-tenant concerns.
- Layer in observability, background jobs, and security guardrails.
- Provide AWS-friendly deployment scripts (CloudFormation CDK/CLI for EC2 rollouts).

Refer back to the article repository notes for progress checkpoints and tagged releases.
