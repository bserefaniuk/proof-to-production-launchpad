#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const root = path.resolve(__dirname, '..');
const envExample = path.join(root, 'backend', '.env.example');
const envLocal = path.join(root, 'backend', '.env.local');

const expectedKeys = ['NODE_ENV', 'APP_PORT', 'DATABASE_URL', 'APP_SECRET', 'QUEUE_URL'];

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const entries = {};
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const [key, ...rest] = line.split('=');
    if (key) entries[key.trim()] = rest.join('=').trim();
  }
  return entries;
}

const exampleEntries = loadEnv(envExample);
const localEntries = loadEnv(envLocal);

const missingInExample = expectedKeys.filter((key) => !(key in exampleEntries));
const missingInLocal = expectedKeys.filter((key) => !(key in localEntries));

if (missingInExample.length === 0 && missingInLocal.length === 0) {
  console.log(chalk.green('✓ Environment configuration matches expected schema.'));
  process.exit(0);
}

if (missingInExample.length > 0) {
  console.log(chalk.red('Missing keys in backend/.env.example:'), missingInExample);
}
if (missingInLocal.length > 0) {
  console.log(chalk.yellow('Missing keys in backend/.env.local:'), missingInLocal);
}

process.exit(1);
