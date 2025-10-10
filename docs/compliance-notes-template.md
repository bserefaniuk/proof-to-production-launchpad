# Compliance Notes – Template

Use this worksheet to track the regulatory posture of the LaunchPad service. Keep it updated as the product evolves.

## Snapshot

- **Last reviewed:** _(date)_
- **Next review:** _(date or milestone – e.g. “Beta launch”, “First paying customer”)_
- **Owner:** _(person responsible for updates)_

## Data Inventory

| Data Category | Source | Storage Location | Retention Policy | Access Roles |
| --- | --- | --- | --- | --- |
| Example: Customer email | Signup form | Postgres `customers` table | Delete inactive records after 12 months | Support, Admin |
|  |  |  |  |  |

## Regulatory Triggers

| Standard / Law | Why It Applies (or Not) | Required Controls | Status / Notes |
| --- | --- | --- | --- |
| Example: GDPR | EU residents can sign up for beta | Data processing agreement, consent capture | DPA template drafted; need legal review |
|  |  |  |  |

## Vendors & Integrations

| Vendor | Data Shared | Compliance Status Verified? | Action Items |
| --- | --- | --- | --- |
| Example: Payment Processor | Billing metadata (no card numbers) | ✅ SOC 2 report reviewed | Re-check annually |
|  |  |  |  |

## Controls & Follow-Ups

- Immediate safeguards in place (HTTPS, MFA, encrypted storage):
  - [ ] HTTPS enforced across environments
  - [ ] MFA enabled for admin consoles
  - [ ] Secrets stored outside the repo
  - [ ] Database encryption (at rest + in transit)
- Open tasks / risks:
  - _(add bullets here)_

## Review History

| Date | Reviewer | Key Changes / Findings |
| --- | --- | --- |
| Example: 2026‑01‑01 | Bohdan | Logged GDPR trigger; scheduled DPA signing |
|  |  |  |
