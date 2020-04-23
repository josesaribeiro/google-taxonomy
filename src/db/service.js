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

function saveDataScript() {
  return {
    error : 'not implemented'
  };
}

module.exports = {
  loadCsvToDb,
  saveDataScript
};
