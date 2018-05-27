import Database from 'better-sqlite3';

const dbFilePath = './.data/sqlite.db';

const db = new Database(dbFilePath);

export default db;
