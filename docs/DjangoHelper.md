## Django backend helper (AJBMR)

This cheat sheet collects the most useful commands for your Django backend in this project.

### Project facts
- **Settings module**: `core.settings.dev` (already set in `backend/manage.py`)
- **Database engine**: PostgreSQL
- **Database name**: `ajbmrdb`
- **Database host/port**: `127.0.0.1:5432`
- **DB user (default)**: `journal_admin`
- **Apps (labels)**: `users`, `journals`, `manuscripts`, `reviews`, `publishing`, `notifications`, `payments`, `configuration`, `files`, `security`, `workflow`, `taxonomy`
- **Custom user model**: `users.User` (set via `AUTH_USER_MODEL`)

Tip: Run all commands from the project root using `python backend/manage.py ...` unless noted.

---

## Environment and configuration

### .env file (backend/.env)
Set/override these environment variables as needed:

```bash
DJANGO_SECRET_KEY=replace-with-a-strong-secret
POSTGRES_DB=ajbmrdb
POSTGRES_USER=journal_admin
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
```

### Verify settings/DB at runtime
```bash
python backend/manage.py shell -c "from django.conf import settings; print(settings.DATABASES['default']['NAME'])"
python backend/manage.py shell -c "from django.conf import settings; print(settings.INSTALLED_APPS)"
```

---

## Migrations

### Create migrations for all apps
```bash
python backend/manage.py makemigrations
```

### Create migrations for a single app (example: journals)
```bash
python backend/manage.py makemigrations journals
```

### Apply migrations to the database
```bash
python backend/manage.py migrate
```

### See what would run (plan) before applying
```bash
python backend/manage.py migrate --plan
```

### List migrations (all apps)
```bash
python backend/manage.py showmigrations
```

### List migrations for a single app
```bash
python backend/manage.py showmigrations journals
```

### If migrations folder is missing in an app
Normally Django creates it automatically. If needed, ensure `backend/apps/<app>/migrations/__init__.py` exists, then re-run `makemigrations`.

---

## Database inspection (PostgreSQL)

### Using Django DB shell
```bash
python backend/manage.py dbshell
```
Inside psql:
```sql
\dt
-- or
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
```

### Quick table list via Python
```bash
python backend/manage.py shell -c "from django.db import connection; print(sorted(connection.introspection.table_names()))"
```

### Using psql directly (PostgreSQL CLI)

Connect (interactive):
```bash
# PowerShell (Windows): optionally set password for this session
$env:PGPASSWORD = 'your_password'
psql -h 127.0.0.1 -p 5432 -U journal_admin -d ajbmrdb
```

Common meta-commands inside psql:
```sql
\?           -- help for psql commands
\conninfo    -- show current connection
\l           -- list databases
\c ajbmrdb   -- connect to database
\du          -- list roles/users
\dn          -- list schemas
\dt          -- list tables in current schema
\d table     -- describe table
\d+ table    -- describe table with storage/size
\q           -- quit
```

Create database/user and grant (run as a superuser, e.g., postgres):
```sql
CREATE USER journal_admin WITH PASSWORD 'your_password';
CREATE DATABASE ajbmrdb OWNER journal_admin;
GRANT ALL PRIVILEGES ON DATABASE ajbmrdb TO journal_admin;
```

Grant privileges on all existing tables/sequences (useful after migrations):
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO journal_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO journal_admin;
```

Change user password:
```sql
ALTER USER journal_admin WITH PASSWORD 'new_password';
```

Run a one-off SQL without entering interactive mode:
```bash
psql -h 127.0.0.1 -p 5432 -U journal_admin -d ajbmrdb -c "SELECT NOW();"
```

See Django migration records:
```sql
SELECT app, name, applied FROM django_migrations ORDER BY app, applied DESC;
```

Backup and restore (optional):
```bash
# Backup
pg_dump -h 127.0.0.1 -p 5432 -U journal_admin -d ajbmrdb -Fc -f ajbmrdb.dump

# Restore (drops/recreates objects in target DB)
pg_restore -h 127.0.0.1 -p 5432 -U journal_admin -d ajbmrdb --clean --if-exists ajbmrdb.dump
```

Windows path tip: if `psql` is not found, use the full path (example):
```bash
"C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe" -h 127.0.0.1 -p 5432 -U journal_admin -d ajbmrdb
```

---

## Running the server and admin

### Run dev server
```bash
python backend/manage.py runserver
```
Optional (explicit host/port):
```bash
python backend/manage.py runserver 0.0.0.0:8000
```

### Create a superuser (for admin login)
```bash
python backend/manage.py createsuperuser
```

### Basic health checks
```bash
python backend/manage.py check
python backend/manage.py shell -c "import django; print(django.get_version())"
```

---

## Common tasks

- **Reset a single app’s migrations (advanced)**: delete that app’s migration files (keep `__init__.py`), then run `makemigrations` and `migrate`. Do this only when safe (team alignment, no prod data).
- **Target a specific migration**: `python backend/manage.py migrate journals 0001` (or `zero` to unapply all for that app).
- **Show SQL for a migration**: `python backend/manage.py sqlmigrate journals 0001`.

---

## Troubleshooting

- 500 on admin (e.g., adding Journal):
  - Ensure tables exist: `python backend/manage.py showmigrations journals` (should show `[X] 0001_initial`).
  - Apply migrations: `python backend/manage.py migrate`.

- Cannot connect to DB (OperationalError):
  - Verify credentials/host/port in `backend/.env` match your PostgreSQL setup.
  - Confirm PostgreSQL is running and accepts connections on `127.0.0.1:5432`.

- Module/path errors when running commands from the repo root:
  - Always prefix with `backend/manage.py`: `python backend/manage.py <command>` (the manage script sets `DJANGO_SETTINGS_MODULE=core.settings.dev`).

- App label vs DB name:
  - `journals` is an app label used in commands like `showmigrations journals`.
  - `ajbmrdb` is the PostgreSQL database name; it is configured in settings and used automatically by Django.

---

## Reference: key files
- `backend/manage.py`
- `backend/core/settings/base.py`, `backend/core/settings/dev.py`
- `backend/apps/<app>/models.py`
- `backend/apps/<app>/migrations/`

This file is safe to copy to other environments for quick reference.


