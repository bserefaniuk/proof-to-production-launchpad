# LaunchPad Architecture Overview (v0.1.0)

The initial proof of concept keeps the architecture intentionally lightweight while establishing the boundaries we will evolve in later installments.

## Bounded Contexts & Modules

- **Projects context** – encapsulates projects, checklists, and tasks; exposed via REST endpoints.
- Future contexts (auth, reporting, automation) will slot into the same DDD structure without rewriting the core.

## Layering

- `domain/` – entities (`Project`, `Checklist`, `Task`) and repository contracts.
- `application/` – orchestration logic and command DTOs.
- `infrastructure/` – adapters (currently in-memory) bridging the domain to storage/transport.
- `interfaces/` – HTTP DTOs and controllers.
- `modules/` – dependency wiring for Nest.js.

## Data Flow

```
React form ➜ REST controller ➜ Application service ➜ Repository interface ➜ In-memory adapter
```

Upcoming posts will replace the adapter with Postgres, introduce background jobs for reminders, and add observability instrumentation.
