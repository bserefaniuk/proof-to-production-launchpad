# ADR-0002 Maintain In-Memory Repository Until Postgres Upgrade

- Status: Accepted
- Date: 2025-01-01

## Context

The series launches with an in-memory repository to keep the PoC accessible without database setup. Moving to Postgres is part of the roadmap but will land alongside migrations, backups, and queue processing in a later release.

## Decision

Retain the in-memory repository for the `v0.2.0-core-hardened` release while scaffolding the interfaces needed for a future Postgres implementation. Expose repository interactions through the `ProjectRepository` port so swapping adapters remains low-risk.

## Consequences

- Readers can clone the repo and run examples without provisioning infrastructure.
- Persistence-specific scripts (`db:migrate`, `db:plan`) remain stubs until Postgres integration lands.
- We must document the limitation clearly so teams know when to add a real database adapter.
