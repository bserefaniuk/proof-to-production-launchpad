#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const root = path.resolve(__dirname, '..');
const changelogPath = path.join(root, 'docs', 'contracts', 'changelog.md');

if (!fs.existsSync(changelogPath)) {
  console.log(chalk.red('Contract changelog not found at docs/contracts/changelog.md'));
  process.exit(1);
}

const changelog = fs.readFileSync(changelogPath, 'utf8');
const latestEntry = changelog.split(/\n## /)[1];

console.log(chalk.green('Latest contract update:'));
console.log(chalk.gray('----------------------------------------'));
console.log(latestEntry ? `## ${latestEntry.trim()}` : 'No entries recorded yet.');
console.log(chalk.gray('----------------------------------------'));
console.log(
  chalk.cyan(
    'Share this update with consumers (Slack, email, release notes) and archive signed-off versions in docs/contracts.'
  )
);
