CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  duration VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  designation VARCHAR(200),
  bio TEXT,
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  application_id VARCHAR(20) UNIQUE NOT NULL,
  student_name VARCHAR(200) NOT NULL,
  father_name VARCHAR(200) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  parent_mobile VARCHAR(20) NOT NULL,
  student_mobile VARCHAR(20),
  address TEXT NOT NULL,
  previous_school VARCHAR(200),
  course_applied VARCHAR(200) NOT NULL,
  academic_session VARCHAR(100) NOT NULL,
  previous_marks VARCHAR(50),
  photo_path VARCHAR(500),
  documents_path VARCHAR(500),
  status VARCHAR(20) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  published_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(200) NOT NULL,
  course VARCHAR(200),
  testimonial TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  year VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT
);

INSERT INTO settings (key, value) VALUES
  ('admission_open', 'true'),
  ('academy_name', 'Sindh Academy Nabsir Road'),
  ('academy_location', 'Nabsir Road, Sindh, Pakistan'),
  ('founder_name', 'Sir Dasrat'),
  ('contact_phone', ''),
  ('contact_email', ''),
  ('contact_address', 'Nabsir Road, Sindh, Pakistan'),
  ('whatsapp_number', '')
ON CONFLICT (key) DO NOTHING;

INSERT INTO courses (name, description, duration) VALUES
  ('Class 1-5 (Primary)', 'Primary education covering core subjects with strong foundations.', '1 year per class'),
  ('Class 6-8 (Middle)', 'Middle school education with a comprehensive curriculum.', '1 year per class'),
  ('Class 9-10 (Matric)', 'Secondary school certificate preparation with expert guidance.', '2 years'),
  ('Class 11-12 (Intermediate)', 'Higher secondary education in Science and Arts groups.', '2 years')
ON CONFLICT DO NOTHING;

INSERT INTO teachers (name, designation, bio, photo_url) VALUES
  ('Sir Dasrat Kumaras', 'Biology Specialist', 'Expert in Biology, Botany and Zoology. Experienced Biology educator who helps students prepare for board exams and entrance tests.', '/uploads/photos/dasrat-kumaras.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (student_name, course, testimonial, rating) VALUES
  ('Student Name 1', 'Class 10', 'Placeholder testimonial — update with real student feedback from the admin dashboard.', 5),
  ('Student Name 2', 'Class 12', 'Placeholder testimonial — update with real student feedback from the admin dashboard.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO achievements (title, description, year) VALUES
  ('Placeholder Achievement 1', 'Update with real academy achievements from the admin dashboard.', '2024'),
  ('Placeholder Achievement 2', 'Update with real academy achievements from the admin dashboard.', '2024')
ON CONFLICT DO NOTHING;
