# Runbook: Restore Task Ledger

## When to Use

Triggered when task writes are lost or corrupted due to database failure, faulty deployment, or operator error.

## Preconditions

- Access to the AWS account that hosts backups.
- `psql` or migration tooling installed locally.
- Latest application container image available.

## Steps

1. **Announce Incident**  
   - Post in `#launchpad-incidents` with current impact and ETA.
   - Assign a communications owner if you're not the one updating stakeholders.

2. **Snapshot Verification**  
   - Locate the latest S3 snapshot in `s3://launchpad-backups/<environment>/postgres/`.
   - Download the snapshot and validate checksum.

3. **Restore to Staging Buffer**  
   - Provision a temporary Postgres instance.  
   - Apply the snapshot using `pg_restore`.  
   - Run `npm run db:plan` to confirm schema drift (wire this command to your migration diff tool once Postgres is integrated).  
   - Execute smoke queries to ensure checklist/task counts look reasonable.

4. **Replay Event Log**  
   - Fetch the append-only event log from `s3://launchpad-backups/<environment>/event-log/`.  
   - For each JSONL file newer than the snapshot timestamp, run `node scripts/replay-events.js --file <path>` to reapply changes.  
   - If the script fails, fall back to manual SQL by ordering events by `occurred_at` and executing the stored procedure `select task_replay_event(jsonb)` for each payload.

5. **Promote to Production**  
   - Put the application into maintenance mode.  
   - Replace the production database with the restored copy.  
   - Run migrations (`npm run db:migrate`).  
   - Bring the app back online and monitor `p95 project.create`.

6. **Post-Restore Clean Up**  
   - Decommission the temporary instance.  
   - Rotate credentials used during the recovery.  
   - Create an ADR summarizing root cause and fixes.

## Validation

- Health endpoint (`/health`) returns `200`.
- Error budget report shows no increase in failed writes.
- Stakeholders receive a summary with recovery timeline and follow-up actions.

## Follow-Up Tasks

- [ ] Automate event replay tooling.
- [ ] Schedule next restore drill.
- [ ] Update `docs/data/classification.yaml` if new fields were introduced.
