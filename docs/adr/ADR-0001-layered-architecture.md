# ADR-0001 Adopt Layered Architecture with Nest Modules

- Status: Accepted
- Date: 2025-01-01

## Context

The initial PoC exposed controller logic directly to in-memory storage and duplicated domain rules across HTTP handlers. As we harden the service, we need seams for testing, auditing, and future adapters (Postgres, queues, background workers).

## Decision

Adopt a layered architecture with four explicit layers: interfaces (HTTP/controllers), application services, domain entities/policies, and infrastructure adapters. Each layer depends inward only. Nest modules configure the wiring so that controllers consume services via dependency injection and repositories are registered through tokens.

## Consequences

- Clear seams for unit and contract testing.
- Onboarding engineers can reason about boundaries quickly.
- Requires ongoing discipline to avoid leaking infrastructure concerns into controllers or domain models.
