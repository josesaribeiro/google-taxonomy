const { loadCsvToDb } = require('./service');

const requiredArgs = ['env', 'execute'];

const fs = require('fs');

async function run({ load }) {  
  try {
    if (load || process.argv.some(arg => arg === '--load')) {
      const result = await loadCsvToDb(load)
      console.log(result);
    }
  } catch (error) {
    console.log('error', error.message);
  }
}

module.exports = { run, requiredArgs };
