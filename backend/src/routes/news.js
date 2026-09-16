import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news ORDER BY published_date DESC, id DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'News not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, published_date } = req.body;
    if (!title?.trim() || !content?.trim())
      return res.status(400).json({ error: 'Title and content required' });
    const imageUrl = req.file ? `/uploads/photos/${req.file.filename}` : null;
    const result = await pool.query(
      'INSERT INTO news (title, content, image_url, published_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageUrl, published_date || null]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, published_date } = req.body;
    const imageUrl = req.file ? `/uploads/photos/${req.file.filename}` : null;
    let query, params;
    if (imageUrl) {
      query = 'UPDATE news SET title = $1, content = $2, image_url = $3, published_date = $4 WHERE id = $5 RETURNING *';
      params = [title, content, imageUrl, published_date || null, req.params.id];
    } else {
      query = 'UPDATE news SET title = $1, content = $2, published_date = $3 WHERE id = $4 RETURNING *';
      params = [title, content, published_date || null, req.params.id];
    }
    const result = await pool.query(query, params);
    if (result.rows.length === 0) return res.status(404).json({ error: 'News not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM news WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'News not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

export default router;
