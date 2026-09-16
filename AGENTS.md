# Sindh Academy Nabsir Road — Base44 Dev Environment

## Overview
Full-stack academy website + online admission system. React (Vite) frontend, Express.js backend, PostgreSQL database.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS, served on port 3000. Vite proxies `/api` and `/uploads` to the backend.
- **Backend**: Express.js API on port 8000 (internal). Uses `node --watch` for live reload.
- **Database**: PostgreSQL 16. Schema auto-initializes on first boot via `backend/src/migrations/init.sql`.
- **Single-origin**: The Vite dev server proxies API calls, so no CORS configuration is needed for the preview.

## Services (docker-compose.base44.yml)
- `db` — PostgreSQL, health-checked, data persists in named volume.
- `backend` — Node 22, bind-mounted source, `node --watch src/server.js`.
- `frontend` — Node 22, bind-mounted source, `vite --host 0.0.0.0 --port 3000`.

## Secrets
- `JWT_SECRET` — required at boot for admin auth. Development placeholder generated; user should replace with a real value.

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`
- Created automatically on first DB init. Change after first login.

## Verification
1. `docker compose -f docker-compose.base44.yml up -d --build`
2. Check `docker compose ps` — all 3 services should be healthy/running.
3. `curl localhost:3000` — should return the React app HTML.
4. `curl localhost:8000/api/health` — should return `{"status":"ok"}`.
5. Admin login at `/admin/login` with default credentials.

## Key Files
- `backend/src/server.js` — Express app entry, route registration.
- `backend/src/db.js` — PostgreSQL pool + auto-init (schema + default admin).
- `backend/src/migrations/init.sql` — full database schema + seed data.
- `backend/src/middleware/auth.js` — JWT auth middleware.
- `backend/src/middleware/upload.js` — Multer file upload config.
- `frontend/src/App.jsx` — React Router configuration.
- `frontend/src/lib/api.js` — API client (all endpoints).
- `frontend/src/pages/admin/` — Admin dashboard with tab components.
