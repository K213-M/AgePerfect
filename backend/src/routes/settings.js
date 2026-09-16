import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    res.json(settings);
  } catch {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await pool.query(
        `INSERT INTO settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = $2`,
        [key, String(value)]
      );
    }
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    for (const row of result.rows) settings[row.key] = row.value;
    res.json(settings);
  } catch (err) {
    console.error('Settings update error:', err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
