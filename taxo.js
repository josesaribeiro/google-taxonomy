//CMD and ENV parsers
const cmd = require('./src/args');
const env = require('./src/env');
const help = require('./src/help');

// Operation strategies
const request = require('./src/request');
const test = require('./src/test');
const csv = require('./src/csv');
const db = require('./src/db');

// Setup and run operation strategy
(async function run({ operation, args }) {
  const op = { request, test, csv, db }[operation];

  // Merge args with the settings on the config file in case there's any missing arg on the CMD
  const mergedArgs = env.mergeDefaultSettings(args);
  if (!checkArgs(op.requiredArgs, mergedArgs)) {
    help.usage();
  }

  return await op.run(mergedArgs);
})(cmd.parse());

function checkArgs(requiredArgs, args) {
  return requiredArgs.every(a => !!args[a]);
}
