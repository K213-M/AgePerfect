import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery ORDER BY id DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image required' });
    const imageUrl = `/uploads/photos/${req.file.filename}`;
    const result = await pool.query(
      'INSERT INTO gallery (title, image_url, category) VALUES ($1, $2, $3) RETURNING *',
      [title || null, imageUrl, category || null]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM gallery WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

export default router;
