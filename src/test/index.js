const { test } = require('./service');

async function run({ execute, env }) {
  env = env || 'local';
  execute = execute || 'test'
  try {

    console.log(`Executing ${execute} for ${env} Environment`);

    if (execute === 'test') {
      await test();

      console.log(`Async Test Executed Successfully`);
    }

  } catch (error) {
    console.log('error', error.message);
  }
}

module.exports = { run };
