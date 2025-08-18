## Dockerizing Backend and Database (Keep local workflow too)

This guide lets you run:
- Local (no Docker): Django + local Postgres
- Hybrid: Django locally + Postgres in Docker (persistent volume)
- Full Docker: Django in Docker + Postgres in Docker
- Optional: Frontend (Next.js) locally; add Docker later for production deploys (Render)

### 1) Backend env

Create `backend/.env`:
```
DJANGO_SECRET_KEY=change-me
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
POSTGRES_DB=ajbmrdb
POSTGRES_USER=journal_admin
POSTGRES_PASSWORD=Journal!2025
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
```
- Local DB: keep `POSTGRES_HOST=127.0.0.1`.
- Docker DB (compose): set `POSTGRES_HOST=postgres` when the DB service is named `postgres`.

Django reads this file automatically (see `backend/core/settings/base.py`).

### 2) Frontend env

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```
Restart Next dev server after editing.

### 3) Docker Compose for dev DB only (hybrid mode)

We already have `docker-compose.dev.yml` with a `postgres` service + volume:
- Start DB only:
```
docker compose -f docker-compose.dev.yml up -d postgres
```
- Use in Django by switching `POSTGRES_HOST=postgres` in `backend/.env`, or leave it at `127.0.0.1` and rely on published port 5432.

Data persists in volume `postgres_data`.

### 4) Full Docker for backend + DB

Create `backend/Dockerfile`:
```
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY backend /app
ENV DJANGO_SETTINGS_MODULE=core.settings.dev

# Entrypoint script for migrate + run
CMD [\"sh\", \"-c\", \"python manage.py migrate --settings=core.settings.dev && python manage.py runserver 0.0.0.0:8000\"]
```

Create `docker-compose.backend.yml`:
```
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: ajbmr-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-ajbmrdb}
      POSTGRES_USER: ${POSTGRES_USER:-journal_admin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-Journal!2025}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    container_name: ajbmr-backend
    depends_on:
      - postgres
    environment:
      DJANGO_SECRET_KEY: ${DJANGO_SECRET_KEY:-change-me}
      DJANGO_ALLOWED_HOSTS: ${DJANGO_ALLOWED_HOSTS:-127.0.0.1,localhost}
      POSTGRES_DB: ${POSTGRES_DB:-ajbmrdb}
      POSTGRES_USER: ${POSTGRES_USER:-journal_admin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-Journal!2025}
      POSTGRES_HOST: postgres
      POSTGRES_PORT: "5432"
    ports:
      - "8000:8000"

volumes:
  postgres_data:
```

Run full stack:
```
docker compose -f docker-compose.backend.yml up --build
```

### 5) Keep non-Docker workflows

Local DB (psql installed locally):
- Ensure `backend/.env` points to local DB host/port.
- Migrate:
```
python backend/manage.py makemigrations --settings=core.settings.dev
python backend/manage.py migrate --settings=core.settings.dev
python backend/manage.py runserver --settings=core.settings.dev
```

Hybrid (Docker DB + local Django):
- Start DB `docker compose -f docker-compose.dev.yml up -d postgres`
- In `backend/.env`, either:
  - POSTGRES_HOST=127.0.0.1 (use published 5432), or
  - POSTGRES_HOST=postgres and run Django inside the compose network (via `backend` service). For local Django, prefer 127.0.0.1.

### 6) Frontend (Next.js)

Local dev:
```
cd frontend
npm install
npm run dev
```
- It calls backend at `${NEXT_PUBLIC_API_BASE_URL}`.

Optional Docker for frontend (production image):
Create `frontend/Dockerfile` (later):
```
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD [\"npm\", \"run\", \"start\", \"--\", \"-p\", \"3000\"]
```
Compose add:
```
  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://backend:8000
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### 7) Render deployment notes

- Backend:
  - Use a Render Web Service for Django (Gunicorn/ASGI) or Background Worker if you split.
  - Set environment variables from `backend/.env` in Render dashboard.
  - Use Render PostgreSQL add-on or your own Postgres service; update `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`.
  - Set `DJANGO_ALLOWED_HOSTS` to your Render domain.

- Frontend:
  - If deploying Next.js, use a separate Render Web Service; set `NEXT_PUBLIC_API_BASE_URL` to the backend URL.

### 8) Switch DB modes quickly

- Local DB: `POSTGRES_HOST=127.0.0.1` in backend/.env
- Docker DB: `POSTGRES_HOST=postgres` when using compose with the `postgres` service
- Both modes persist data in Postgres; Docker uses the `postgres_data` volume.

### 9) Health checks / troubleshooting

- DB ready check: `docker logs ajbmr-postgres`, `pg_isready -h 127.0.0.1 -p 5432 -U journal_admin`
- Django logs: `docker logs ajbmr-backend`
- Common errors:
  - `connection refused`: DB not started; wait for Postgres health.
  - `password authentication failed`: env vars mismatch; confirm USER/PASSWORD/DB.
  - `UndefinedTable`: run migrations before use.

```

Notes:
- I saw legacy Docker files at repo root for a Vite build. They won’t break this plan; treat them as legacy until we switch to Next’s Docker.
- There’s no root `.env` switch in use by Django; Django reads `backend/.env`. Adjust per mode as shown.

If you want, I can add the `backend/Dockerfile` and `docker-compose.backend.yml` to the repo now.

