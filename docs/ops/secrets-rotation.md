# Secrets Rotation Policy

## Cadence

- Rotate application secrets (JWT signing keys, API keys) every 90 days.
- Rotate database credentials every 180 days or immediately after personnel changes.
- Rotate third-party credentials following any security advisory.

## Process

1. Generate new secrets using AWS Parameter Store or Vault.
2. Update the staging environment first and run `npm run smoke`.
3. Promote secrets to production during a low-traffic window.
4. Invalidate old secrets and remove from all systems.
5. Record rotation in the change log with operator and timestamp.

## Responsibilities

- Primary engineer initiates rotation and validates deployment.
- Security champion audits rotations quarterly.
- Automation backlog includes adding drift detection for expired secrets.

## References

- `docs/infrastructure/parameter-store.tf`
- `scripts/config-drift.js`
- `README.md#North-Star-Scorecard`
