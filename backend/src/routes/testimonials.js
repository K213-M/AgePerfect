import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { student_name, course, testimonial, rating } = req.body;
    if (!student_name?.trim() || !testimonial?.trim())
      return res.status(400).json({ error: 'Student name and testimonial required' });
    const result = await pool.query(
      'INSERT INTO testimonials (student_name, course, testimonial, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_name, course || null, testimonial, rating || 5]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { student_name, course, testimonial, rating } = req.body;
    const result = await pool.query(
      'UPDATE testimonials SET student_name = $1, course = $2, testimonial = $3, rating = $4 WHERE id = $5 RETURNING *',
      [student_name, course || null, testimonial, rating || 5, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
