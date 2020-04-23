const { config } = require('../../config');
const pg = require('pg');

const connect = async () => {
  const conn = new pg.Client({
    user,
    host,
    password,
    database,
    port,
  } = config.db.settings);
  await conn.connect();
  return conn;
};

const encloseSingleQuotes = value =>
  value.includes(`'`) ?
    `E'${value.replace(/'/, `''`)}'` :
    `'${value}'`;

const querier = async (conn, query) => {
  const result = await conn.query(query);
  return result.rows || [];
}

const createLanguageTableQuery = `
  DROP TABLE IF EXISTS "TaxoLanguage";
  CREATE TABLE "TaxoLanguage"(
    id serial PRIMARY KEY,
    code CHAR (5) UNIQUE NOT NULL
  );`;
const createLanguageTable = async conn => await querier(conn, createLanguageTableQuery);

const createItemTableQuery = `
  DROP TABLE IF EXISTS "TaxoItem";
  CREATE TABLE "TaxoItem"(
    TaxoLanguageId integer NOT NULL,
    id integer NOT NULL,
    name VARCHAR (255) NOT NULL,
    CONSTRAINT language_id PRIMARY KEY(TaxoLanguageId,id)
  );`;
const createItemTable = async conn => await querier(conn, createItemTableQuery);

const createRelationTableQuery = `
  DROP TABLE IF EXISTS "TaxoRelation";
  CREATE TABLE "TaxoRelation"(
    id serial PRIMARY KEY,
    TaxoLanguageId integer NOT NULL,
    parentId integer NOT NULL,
    childId integer NOT NULL
  );`;
const createRelationable = async conn => await querier(conn, createRelationTableQuery);

const resetDB = async conn => {
  await createLanguageTable(conn);
  await createItemTable(conn);
  await createRelationable(conn);
}

const getAddLanguageQuery = (id, code) => `
  INSERT INTO "TaxoLanguage"
    ( id, code )
  VALUES
    ( ${id}, '${code}')`;
const addLanguage = async (conn, language) =>
  await querier(conn, getAddLanguageQuery(language.id, language.code));

const getAddItemQuery = (language, item) =>
`
  INSERT INTO "TaxoItem"
    (TaxoLanguageId, id, name)
  VALUES
    (
      ${language.id},
      ${item.id},
      ${encloseSingleQuotes(item.name)}
    )
`;

const getAddRelationQuery = (language, relation) =>
  `
    INSERT INTO "TaxoRelation"
      (
        TaxoLanguageId,
        parentId,
        childId
      )
    VALUES
      (
        ${language.id},
        ${relation.parentId},
        ${relation.childId}
      )
  `;

module.exports = {
  addLanguage,
  connect,
  createLanguageTable,
  createItemTable,
  createRelationable,
  getAddItemQuery,
  getAddRelationQuery,
  querier,
  resetDB
};
