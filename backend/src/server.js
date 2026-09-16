import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pool, { initDB } from './db.js';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import courseRoutes from './routes/courses.js';
import teacherRoutes from './routes/teachers.js';
import newsRoutes from './routes/news.js';
import galleryRoutes from './routes/gallery.js';
import testimonialRoutes from './routes/testimonials.js';
import achievementRoutes from './routes/achievements.js';
import settingsRoutes from './routes/settings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8000;

initDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
