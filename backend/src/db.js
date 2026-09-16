import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDB() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT to_regclass('public.admin_users')"
    );
    if (!rows[0].to_regclass) {
      const sql = fs.readFileSync(
        path.join(__dirname, 'migrations/init.sql'),
        'utf-8'
      );
      await client.query(sql);
      console.log('Database schema initialized');
    }

    // Create default admin if none exists
    const { rows: admins } = await client.query(
      'SELECT COUNT(*) FROM admin_users'
    );
    if (parseInt(admins[0].count) === 0) {
      const bcrypt = (await import('bcryptjs')).default;
      const hash = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
        ['admin', hash]
      );
      console.log('Default admin created — username: admin, password: admin123');
    }
  } finally {
    client.release();
  }
}

export default pool;
