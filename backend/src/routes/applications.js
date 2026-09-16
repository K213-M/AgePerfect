import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

function generateApplicationId() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `SA-${year}-${random}`;
}

// Public: submit application
router.post('/', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documents', maxCount: 5 },
]), async (req, res) => {
  try {
    const b = req.body;
    const required = ['student_name', 'father_name', 'date_of_birth', 'gender', 'parent_mobile', 'address', 'course_applied', 'academic_session'];
    for (const f of required) {
      if (!b[f] || !String(b[f]).trim())
        return res.status(400).json({ error: `Missing required field: ${f}` });
    }

    // Prevent duplicate submissions (same name + parent mobile within 10 min)
    const dupCheck = await pool.query(
      `SELECT id FROM applications
       WHERE student_name = $1 AND parent_mobile = $2
       AND created_at > NOW() - INTERVAL '10 minutes'`,
      [b.student_name, b.parent_mobile]
    );
    if (dupCheck.rows.length > 0)
      return res.status(409).json({ error: 'A recent application with this name and mobile number already exists. Please wait a few minutes before submitting again.' });

    // Generate unique application ID
    let applicationId = generateApplicationId();
    let idExists = true;
    let attempts = 0;
    while (idExists && attempts < 10) {
      const check = await pool.query('SELECT id FROM applications WHERE application_id = $1', [applicationId]);
      if (check.rows.length === 0) {
        idExists = false;
      } else {
        applicationId = generateApplicationId();
        attempts++;
      }
    }

    const photoPath = req.files?.photo?.[0] ? `/uploads/photos/${req.files.photo[0].filename}` : null;
    const docPaths = req.files?.documents ? req.files.documents.map(f => `/uploads/documents/${f.filename}`).join(', ') : null;

    const result = await pool.query(
      `INSERT INTO applications
       (application_id, student_name, father_name, date_of_birth, gender,
        parent_mobile, student_mobile, address, previous_school,
        course_applied, academic_session, previous_marks, photo_path, documents_path)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING application_id`,
      [applicationId, b.student_name, b.father_name, b.date_of_birth, b.gender,
       b.parent_mobile, b.student_mobile || null, b.address, b.previous_school || null,
       b.course_applied, b.academic_session, b.previous_marks || null, photoPath, docPaths]
    );

    res.status(201).json({
      message: 'Application Submitted Successfully',
      applicationId: result.rows[0].application_id,
    });
  } catch (err) {
    console.error('Application submission error:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
});

// Public: check application status by application ID
router.get('/status/:applicationId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT application_id, student_name, status, course_applied, created_at FROM applications WHERE application_id = $1',
      [req.params.applicationId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Application not found. Please check your Application ID.' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to check status' });
  }
});

// Admin: list all applications with search and filter
router.get('/', requireAuth, async (req, res) => {
  try {
    const { search, course, status, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (search) {
      conditions.push(`(student_name ILIKE $${paramIdx} OR application_id ILIKE $${paramIdx})`);
      params.push(`%${search}%`);
      paramIdx++;
    }
    if (course) {
      conditions.push(`course_applied = $${paramIdx}`);
      params.push(course);
      paramIdx++;
    }
    if (status) {
      conditions.push(`status = $${paramIdx}`);
      params.push(status);
      paramIdx++;
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const countResult = await pool.query(`SELECT COUNT(*) FROM applications ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(parseInt(limit));
    params.push(offset);
    const result = await pool.query(
      `SELECT * FROM applications ${where} ORDER BY created_at DESC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      params
    );

    res.json({ applications: result.rows, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error('List applications error:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Admin: get single application
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Application not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Admin: update status
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });
    const result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Application not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Admin: update notes
router.patch('/:id/notes', requireAuth, async (req, res) => {
  try {
    const { notes } = req.body;
    const result = await pool.query(
      'UPDATE applications SET admin_notes = $1 WHERE id = $2 RETURNING *',
      [notes || null, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Application not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to update notes' });
  }
});

// Admin: export CSV
router.get('/export/csv', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    const rows = result.rows;
    const headers = ['Application ID', 'Student Name', 'Father Name', 'DOB', 'Gender', 'Parent Mobile', 'Student Mobile', 'Address', 'Previous School', 'Course', 'Session', 'Previous Marks', 'Status', 'Notes', 'Submitted At'];
    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const vals = [
        r.application_id, r.student_name, r.father_name,
        r.date_of_birth ? new Date(r.date_of_birth).toISOString().split('T')[0] : '',
        r.gender, r.parent_mobile, r.student_mobile || '',
        `"${(r.address || '').replace(/"/g, '""')}"`,
        r.previous_school || '', r.course_applied, r.academic_session,
        r.previous_marks || '', r.status,
        `"${(r.admin_notes || '').replace(/"/g, '""')}"`,
        new Date(r.created_at).toISOString(),
      ];
      csvLines.push(vals.join(','));
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');
    res.send(csvLines.join('\n'));
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Failed to export applications' });
  }
});

export default router;
