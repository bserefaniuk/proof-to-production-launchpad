# Placeholder backup job definition. Replace with your preferred IaC tooling when wiring real backups.

resource "aws_backup_plan" "launchpad" {
  name = "launchpad-backups"

  rule {
    rule_name         = "daily-backup"
    target_vault_name = aws_backup_vault.launchpad.name
    schedule          = "cron(0 3 * * ? *)"
    lifecycle {
      delete_after = 30
    }
  }
}

resource "aws_backup_vault" "launchpad" {
  name = "launchpad-backup-vault"
}
