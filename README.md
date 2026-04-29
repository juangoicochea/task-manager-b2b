# Task Manager B2B

A B2B task management system built for teams, with role-based access control, team collaboration, and a clean enterprise-ready UI.

---

## Live Demo

> Coming soon

---

## Screenshots

> Coming soon

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), MUI, TypeScript |
| Backend | NestJS, TypeScript, REST API |
| Database | PostgreSQL, TypeORM |
| Auth | Auth0 (OAuth 2.0 / OIDC), JWT |
| Cloud | GCP Cloud Run, Cloud SQL |
| Deploy (FE) | Vercel |

---

## Features

- Role-based access control — admins and members have different permissions
- Team management — create teams and invite members
- Task management — create, assign, update and track tasks with priority and status
- Protected routes — unauthenticated users are redirected to login
- API documentation — auto-generated Swagger docs at `/api`

---

## Project Structure

```
task-manager-b2b/
├── backend/        # NestJS API
├── frontend/       # Next.js 14 app
├── docker-compose.yml
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- Docker Desktop

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/juangoicochea/task-manager-b2b.git
cd task-manager-b2b

# 2. Start the database
docker-compose up -d

# 3. Start the backend
cd backend
cp .env.example .env   # fill in your Auth0 credentials
npm install
npm run start:dev

# 4. Start the frontend (new terminal)
cd frontend
cp .env.example .env.local   # fill in your Auth0 credentials
npm install
npm run dev
```

Backend runs on `http://localhost:3000`
Frontend runs on `http://localhost:3001`
Swagger docs at `http://localhost:3000/api`

---

## Environment Variables

### Backend (`/backend/.env`)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
PORT=3000
```

### Frontend (`/frontend/.env.local`)

```env
AUTH0_SECRET=your-long-random-secret
AUTH0_BASE_URL=http://localhost:3001
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Author

**Juan Goicochea** — Full Stack Developer
[LinkedIn](https://www.linkedin.com/in/juan-goicochea/) · [GitHub](https://github.com/juangoicochea)
