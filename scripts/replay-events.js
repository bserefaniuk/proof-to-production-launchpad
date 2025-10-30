#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

const args = process.argv.slice(2);
const fileFlagIndex = args.indexOf('--file');
if (fileFlagIndex === -1 || !args[fileFlagIndex + 1]) {
  console.error(chalk.red('Usage: node scripts/replay-events.js --file <event-log.jsonl>'));
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), args[fileFlagIndex + 1]);
if (!fs.existsSync(filePath)) {
  console.error(chalk.red(`File not found: ${filePath}`));
  process.exit(1);
}

(async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let processed = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch (error) {
      console.error(chalk.yellow(`Skipping invalid JSON: ${line}`));
      continue;
    }

    processed += 1;
    const summary = `${event.type || 'unknown'} @ ${event.occurred_at || 'n/a'}`;
    console.log(chalk.green(`Replaying event ${processed}: ${summary}`));
    console.log(chalk.gray(JSON.stringify(event.payload || {}, null, 2)));
    // TODO: replace with actual persistence call once Postgres adapter is in place.
  }

  console.log(chalk.cyan(`Processed ${processed} events from ${filePath}`));
})();
