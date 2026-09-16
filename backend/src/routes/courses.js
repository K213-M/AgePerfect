import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Course name required' });
    const result = await pool.query(
      'INSERT INTO courses (name, description, duration) VALUES ($1, $2, $3) RETURNING *',
      [name, description || null, duration || null]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const result = await pool.query(
      'UPDATE courses SET name = $1, description = $2, duration = $3 WHERE id = $4 RETURNING *',
      [name, description || null, duration || null, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Course not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Course not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
