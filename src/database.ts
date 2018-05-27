import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';

const DATA_DIR = './.data';
const FILENAME = 'sqlite.db';

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR);
}

const db = new Database(`${DATA_DIR}/${FILENAME}`);

export default db;
