import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teachers ORDER BY id');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

router.post('/', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    const { name, designation, bio } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Teacher name required' });
    const photoUrl = req.file ? `/uploads/photos/${req.file.filename}` : null;
    const result = await pool.query(
      'INSERT INTO teachers (name, designation, bio, photo_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, designation || null, bio || null, photoUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create teacher' });
  }
});

router.put('/:id', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    const { name, designation, bio } = req.body;
    const photoUrl = req.file ? `/uploads/photos/${req.file.filename}` : null;
    let query, params;
    if (photoUrl) {
      query = 'UPDATE teachers SET name = $1, designation = $2, bio = $3, photo_url = $4 WHERE id = $5 RETURNING *';
      params = [name, designation || null, bio || null, photoUrl, req.params.id];
    } else {
      query = 'UPDATE teachers SET name = $1, designation = $2, bio = $3 WHERE id = $4 RETURNING *';
      params = [name, designation || null, bio || null, req.params.id];
    }
    const result = await pool.query(query, params);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Teacher not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update teacher' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM teachers WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});

export default router;
