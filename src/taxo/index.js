const { readCsv, search, listLevel } = require('./service');

const requiredArgs = ['env', 'execute'];

const fs = require('fs');

function printBranch(id, name, counter) {
  console.log(
    ' '.repeat(counter),
    '==>',
    `${id}: ${name}`
  );
}

function printResult(result) {
  const { item, tree, children } = result;

  console.log('Item Result from Search/Get Task:');
  console.log( JSON.stringify(item, null, 2), '\n');

  console.log('Parent Chain:');
  let counter = 1;
  for (const branch of tree) {
    const { id, name } = branch.parent;
    printBranch(id, name, counter);
    counter++;
  }
  printBranch(item.id, item.name, counter);

  console.log(`\nChildren of ${item.name}:`)
  for (const child of children) {
    const { id, name } = child;
    console.log(`${id}: ${name}`);
  }  
}

async function run({ read, id, name, list }) {  
  try {
    console.log(`Reading ${read} Taxonomy file`, '\n');

    let data = {};
    const result = await readCsv(read);
    data = result;

    if (id || name) {
      const result = await search(data, id, name);

      if (result.error) {
        console.log('Error:', result.error);
        return;
      }
      printResult(result);
    }

    if (list) {
      const result = await listLevel(data, list);

      console.log(`\nList of all items in the level ${list}:`)
      for (const item of result) {
        const { id, name } = item;
        console.log(`${id}: ${name}`);
      }
    }
  } catch (error) {
    console.log('error', error.message);
  }
}

module.exports = { run, requiredArgs };
