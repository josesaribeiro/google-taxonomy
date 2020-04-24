const fs = require('fs');
const path = require('path');
const { config } = require('../../config');
const { readCsv } = require('../csv/service');
const db = require('./db');

async function loadAllLanguages() {
  const languages = config.language.loaded;
  const conn = await db.connect();
  await db.resetDB(conn);
  conn.end();

  const result = {};
  for (const language of languages) {
    await loadCsvToDb(language.code, false);
    result[language.code] = 'Ok';
  }

  return {
    status : 'Ok',
    ...result
  };
}

async function loadCsvToDb(languageCode, reset = true) {
  if (['all', '*'].includes(languageCode)) {
    return await loadAllLanguages();
  }

  languageCode = config.language.loaded.some(l => l.code === languageCode) ?
    languageCode :
    config.language.default;
  
  const language = config.language.loaded.find(l => l.code === languageCode);

  const conn = await db.connect();
  if (reset) {
    await db.resetDB(conn);
  }

  await db.addLanguage(conn, language);

  const data = await readCsv(languageCode);

  const itemsBulkQuery = data
    .items
      .map(item => db.getAddItemQuery(language, item))
      .join(';\n')
  await db.querier(conn, itemsBulkQuery);

  const relationsBulkQuery = data
    .relations
      .map(relation => db.getAddRelationQuery(language, relation))
      .join(';\n')
  await db.querier(conn, relationsBulkQuery);

  conn.end();

  return {
    status: 'Ok'
  };
}

async function saveDataScript() {
  let stream = fs.createWriteStream('taxoG.sql', { flags: 'w' });
  await stream.write(db.concatResetDBQueries);

  const data = await db.readFullDBData();

  for (const language of data.languages) {
    await stream.write(
      db.getAddLanguageQuery(
        language.id, language.code));
  }

  for (const item of data.items) {
    await stream.write(
      db.getAddItemQuery(
        { id : item.TaxoLanguageId },
        item));
  }

  for (const relation of data.relations) {
    await stream.write(
      db.getAddRelationQuery(
        { id : relation.TaxoLanguageId },
        relation));
  }

  stream.end();
  
  return {
    status: 'Script generated Successfully'
  };
}

module.exports = {
  loadCsvToDb,
  saveDataScript
};
