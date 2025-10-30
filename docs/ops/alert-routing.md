# Alert Routing Playbook

## Alert Channels

- **Critical** (pager escalation)  
  - Channel: `#launchpad-incidents` (Slack)  
  - Escalation: rotate primary engineer, backup engineer, engineering manager  
  - Sources: Health check failures, error budget exhaustion, database connectivity loss

- **Warning** (asynchronous)  
  - Channel: `#launchpad-alerts`  
  - Sources: Config drift warnings, queue latency spikes, cache saturation

- **Informational**  
  - Channel: `#launchpad-ops`  
  - Sources: Successful deploys, secrets rotation reminders, ADR updates

## Escalation Matrix

1. Primary on-call acknowledges within 10 minutes.
2. If unacknowledged after 10 minutes, backup receives alert.
3. After 20 minutes, engineering manager is notified.
4. Incident commander opens Zoom bridge if impact is customer-facing.

## Alert Hygiene

- Review alert noise weekly; remove or tune alerts that triggered >3 times without action.
- Track all alerts in the incident log with root cause and resolution notes.
- Ensure runbooks exist for every critical alert path (`docs/runbooks/` directory).
