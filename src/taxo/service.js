const fs = require('fs');
const path = require('path');
const { config } = require('../../config');

function getParents(data, item, result = []) {
  const { items, relations } = data;
  const relation = relations.find(r => r.childId === item.id) || {};
  const parent = items.find(i => i.id === relation.parentId);
  const record = { parent, relation };
  if (relation && parent) {
    result.push(record);
  }

  return relation.level > 2 ?
    getParents(data, parent, result) :
    result.reverse();
}

async function listLevel(data, level = 1) {
  const relations = data.relations.filter(r => r.level === +level + 1);
  const items = data.items
    .filter(i => relations.some(r => r.parentId === i.id))
    .sort((a, b) => a.id - b.id);
  return items;
}

async function search(data, id = 0, name = '') {
  const item = data.items.find(i =>
    id ?
      i.id === +id :
      i.name === name
  );

  if (!item) {
    return {
      error: 'Item Not Found'
    };
  }
  const tree = getParents(data, item);

  const childrenRelations = data.relations.filter(r => r.parentId === item.id);
  const children = data.items.filter(i => childrenRelations.some(r => r.childId === i.id));
  
  return {
    item,
    tree,
    children
  };
}

async function readCsv(language = '') {

  language = config.language.loaded.includes(language) ?
    language :
    config.language.default;

  const csvPath = path.resolve(__dirname, `data/${language}.taxo.csv`);
  const csv = fs.readFileSync(csvPath, 'utf-8');
  const lines = csv.split('\n');
  console.log(`Taxonomy ${language} file read successfully with ${lines.length} items\n`);

  const items = [];
  const relations = [];

  for (const line of lines) {
    const record = line
      .split(';')
      .filter(i => !!i.trim());
    const level = record.length -1;

    const item = {
      id : +record[0],
      name : record[level]
    };
    items.push(item);

    if (level > 1) {
      const parentLevel = level - 1;
      const parent = items.find(item => item.name === record[parentLevel]);
      const relation = {
        parentId : parent.id,
        childId : item.id,
        level
      };
      relations.push(relation);
    }
  }
  return { items, relations };
}

module.exports = {
  listLevel,
  readCsv,
  search
};
