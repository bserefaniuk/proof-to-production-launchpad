# Terraform snippet to provision Parameter Store entries for LaunchPad

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  description = "AWS region to store the secrets in"
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Environment name (e.g. staging, production)"
  type        = string
}

locals {
  prefix = "/launchpad/${var.environment}"
}

resource "aws_ssm_parameter" "app_secret" {
  name        = "${local.prefix}/APP_SECRET"
  description = "Application secret used for signing tokens"
  type        = "SecureString"
  value       = random_password.app_secret.result
}

resource "aws_ssm_parameter" "database_url" {
  name        = "${local.prefix}/DATABASE_URL"
  description = "Postgres database connection string"
  type        = "SecureString"
  value       = var.database_url
}

resource "aws_ssm_parameter" "queue_url" {
  name        = "${local.prefix}/QUEUE_URL"
  description = "Redis/BullMQ connection string"
  type        = "SecureString"
  value       = var.queue_url
}

resource "random_password" "app_secret" {
  length  = 48
  special = true
}

provider "random" {}

variable "database_url" {
  description = "Connection string to the Postgres instance"
  type        = string
}

variable "queue_url" {
  description = "Connection string to the queue backend"
  type        = string
  default     = ""
}
