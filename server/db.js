import Database from 'better-sqlite3';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const isPg = Boolean(process.env.DATABASE_URL);

let sqliteDb = null;
let pgPool = null;

if (isPg) {
  pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  console.log('🐘 PostgreSQL client initialized for Render production deployment.');
} else {
  const dbPath = path.join(__dirname, '../database.sqlite');
  sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.pragma('foreign_keys = ON');
  console.log('📁 SQLite client initialized for local development.');
}

// Database query abstraction supporting both PostgreSQL & SQLite
export async function queryDb(sql, params = []) {
  if (isPg) {
    // Convert ? to $1, $2, $3 for PostgreSQL
    let paramIdx = 1;
    const pgSql = sql.replace(/\?/g, () => `$${paramIdx++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows;
  } else {
    const stmt = sqliteDb.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return stmt.all(...params);
    } else {
      const info = stmt.run(...params);
      return [{ id: info.lastInsertRowid, changes: info.changes }];
    }
  }
}

export async function queryOne(sql, params = []) {
  const rows = await queryDb(sql, params);
  return rows[0] || null;
}

// Initialize All 5 Required Tables (PostgreSQL & SQLite compatible)
export async function initDb() {
  if (isPg) {
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS STAFF_COORDINATORS (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        role VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS VOLUNTEERS (
        id SERIAL PRIMARY KEY,
        volunteer_id VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        department VARCHAR(255),
        year VARCHAR(50),
        team VARCHAR(100),
        role VARCHAR(100),
        profile_image_url TEXT,
        linkedin_url TEXT,
        instagram_url TEXT,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS EVENTS (
        id VARCHAR(50) PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        event_date VARCHAR(50),
        event_time VARCHAR(50),
        venue VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS VOLUNTEER_EVENT_ASSIGNMENTS (
        id SERIAL PRIMARY KEY,
        volunteer_id VARCHAR(50) NOT NULL REFERENCES VOLUNTEERS(volunteer_id) ON DELETE CASCADE,
        event_id VARCHAR(50) NOT NULL REFERENCES EVENTS(id) ON DELETE CASCADE,
        assigned_role TEXT,
        assigned_by VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS QR_CODES (
        id SERIAL PRIMARY KEY,
        volunteer_id VARCHAR(50) UNIQUE NOT NULL REFERENCES VOLUNTEERS(volunteer_id) ON DELETE CASCADE,
        qr_url TEXT NOT NULL,
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ PostgreSQL Schema & 5 Tables Ready.');
  } else {
    // 1. STAFF_COORDINATORS
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS STAFF_COORDINATORS (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        role TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. VOLUNTEERS
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS VOLUNTEERS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        volunteer_id TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        department TEXT,
        year TEXT,
        team TEXT,
        role TEXT,
        profile_image_url TEXT,
        linkedin_url TEXT,
        instagram_url TEXT,
        status TEXT DEFAULT 'ACTIVE',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. EVENTS
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS EVENTS (
        id TEXT PRIMARY KEY,
        event_name TEXT NOT NULL,
        event_date TEXT,
        event_time TEXT,
        venue TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. VOLUNTEER_EVENT_ASSIGNMENTS
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS VOLUNTEER_EVENT_ASSIGNMENTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        volunteer_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        assigned_role TEXT,
        assigned_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (volunteer_id) REFERENCES VOLUNTEERS(volunteer_id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES EVENTS(id) ON DELETE CASCADE
      );
    `);

    // 5. QR_CODES
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS QR_CODES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        volunteer_id TEXT UNIQUE NOT NULL,
        qr_url TEXT NOT NULL,
        generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (volunteer_id) REFERENCES VOLUNTEERS(volunteer_id) ON DELETE CASCADE
      );
    `);

    console.log('✅ SQLite Schema & 5 Tables Ready.');
  }
}

export default sqliteDb;
