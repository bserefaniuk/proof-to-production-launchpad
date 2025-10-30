# API Contract Changelog

Document every user-visible change to the API surface. Use semantic versioning when possible.

## 0.2.0 - Core Hardening

- Added POST `/projects/{projectId}/checklists/{checklistId}/tasks`.
- Tightened validation on `CreateProjectDto` (name length 3-50).
- Introduced UUID requirement for project and checklist identifiers.

## 0.1.0 - PoC Baseline

- Initial list/create endpoints for projects and checklists.
- No validation on payloads.
