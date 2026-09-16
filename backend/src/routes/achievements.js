import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY id DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, year } = req.body;
    if (!title?.trim())
      return res.status(400).json({ error: 'Title required' });
    const result = await pool.query(
      'INSERT INTO achievements (title, description, year) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, year || null]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create achievement' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, year } = req.body;
    const result = await pool.query(
      'UPDATE achievements SET title = $1, description = $2, year = $3 WHERE id = $4 RETURNING *',
      [title, description || null, year || null, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Achievement not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update achievement' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM achievements WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Achievement not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
});

export default router;
