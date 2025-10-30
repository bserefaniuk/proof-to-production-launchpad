#!/usr/bin/env node
const chalk = require('chalk');

console.log(chalk.cyan('Planning database drift...'));
console.log(
  chalk.yellow(
    'Schema diffing is not available until the relational adapter lands. Track this item in the roadmap and wire migration preview tooling when ready.'
  )
);
