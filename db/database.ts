import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "data");
fs.mkdirSync(dir, { recursive: true });

const db = new Database(path.join(dir, "app.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS Inscricoes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    curso_id   INTEGER NOT NULL,
    nome       TEXT NOT NULL,
    email      TEXT NOT NULL,
    telefone   TEXT NOT NULL,
    cidade     TEXT NOT NULL,
    criado_em  TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (curso_id, email)
  )
`);

export default db;