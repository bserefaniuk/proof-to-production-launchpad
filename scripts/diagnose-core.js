#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'tmp', 'diagnostics');
const outputFile = path.join(outputDir, 'core.json');

const findings = {
  config: [],
  boundaries: [],
  data: [],
};

const requirePaths = [
  {
    check: path.join(root, 'backend', 'src', 'infrastructure', 'config', 'env.schema.ts'),
    message: 'Missing env schema (backend/src/infrastructure/config/env.schema.ts)',
    bucket: 'config',
  },
  {
    check: path.join(root, 'backend', 'src', 'application', 'support', 'retry.ts'),
    message: 'Retry helper not found (backend/src/application/support/retry.ts)',
    bucket: 'boundaries',
  },
  {
    check: path.join(root, 'docs', 'data', 'classification.yaml'),
    message: 'Data classification template missing (docs/data/classification.yaml)',
    bucket: 'data',
  },
];

for (const item of requirePaths) {
  if (!fs.existsSync(item.check)) {
    findings[item.bucket].push(item.message);
  }
}

const controllerPath = path.join(root, 'backend', 'src', 'interfaces', 'http', 'project.controller.ts');
if (fs.existsSync(controllerPath)) {
  const controllerSource = fs.readFileSync(controllerPath, 'utf8');
  if (controllerSource.includes("InMemoryProjectRepository")) {
    findings.boundaries.push(
      'Controller still references in-memory repository directly; ensure dependency inversion via module providers.'
    );
  }
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(findings, null, 2), 'utf8');

console.log(chalk.green('✓ Core diagnostics written to'), outputFile);
console.log(chalk.yellow('Review outstanding findings:'), findings);
