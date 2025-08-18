# Django Configuration Guide

This guide explains how to configure the Django backend for both local development and production deployment.

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the `backend/` directory for local development.

### Required Environment Variables

| Variable | Description | Local Example | Production Example |
|----------|-------------|---------------|-------------------|
| `DJANGO_SECRET_KEY` | Django secret key for security | Generated automatically | Set in Render dashboard |
| `POSTGRES_DB` | Database name | `ajbmrdb` | Render DB name |
| `POSTGRES_USER` | Database username | `journal_admin` | Render DB username |
| `POSTGRES_PASSWORD` | Database password | `Journal!2025` | Render DB password |
| `POSTGRES_HOST` | Database host | `127.0.0.1` | Render DB hostname |
| `POSTGRES_PORT` | Database port | `5432` | `5432` |
| `DATABASE_URL` | Complete database URL (alternative) | `postgres://user:pass@host:port/db` | `postgres://user:pass@host:port/db` |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated allowed hosts | `127.0.0.1,localhost` | `ajbmr-paj1.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:3000` | `https://your-frontend-domain.com` |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated CSRF origins | `http://localhost:3000` | `https://your-frontend-domain.com` |

## Local Development Setup

### 1. Create `.env` file

Create `backend/.env` with the following content:

```bash
# Django Settings
DJANGO_SECRET_KEY=$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost

# PostgreSQL Database Configuration (Local Development)
POSTGRES_DB=ajbmrdb
POSTGRES_USER=journal_admin
POSTGRES_PASSWORD=Journal!2025
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432

# CORS Settings (Local Development)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 2. PostgreSQL Setup

#### Option A: Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create database and user:
```sql
CREATE DATABASE ajbmrdb;
CREATE USER journal_admin WITH PASSWORD 'Journal!2025';
GRANT ALL PRIVILEGES ON DATABASE ajbmrdb TO journal_admin;
```

#### Option B: Docker PostgreSQL

Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ajbmrdb
      POSTGRES_USER: journal_admin
      POSTGRES_PASSWORD: Journal!2025
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Then update your `.env`:
```bash
POSTGRES_HOST=localhost  # or 127.0.0.1
```

### 3. Run Django

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Production Deployment (Render)

### 1. Environment Variables in Render

Set these environment variables in your Render service dashboard:

**Option A: Individual Database Variables**
```bash
DJANGO_SETTINGS_MODULE=core.settings.prod
DJANGO_SECRET_KEY=$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x
POSTGRES_DB=your_render_db_name
POSTGRES_USER=your_render_db_user
POSTGRES_PASSWORD=your_render_db_password
POSTGRES_HOST=your_render_db_hostname
POSTGRES_PORT=5432
DJANGO_ALLOWED_HOSTS=ajbmr-paj1.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.com
```

**Option B: DATABASE_URL (Recommended for Render)**
```bash
DJANGO_SETTINGS_MODULE=core.settings.prod
DJANGO_SECRET_KEY=$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x
DATABASE_URL=postgres://your_user:your_password@your_host:5432/your_db_name
DJANGO_ALLOWED_HOSTS=ajbmr-paj1.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.com
```

### 2. Database Connection

- Use the PostgreSQL connection details provided by Render
- The hostname will be something like `dpg-xxxxx-a.oregon-postgres.render.com`
- Username and password are provided in the Render database dashboard

### 3. Build Command

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

### 4. Start Command

```bash
gunicorn core.wsgi:application
```

## Security Notes

1. **Never commit `.env` files** - they contain sensitive information
2. **Use strong passwords** - especially for database and admin accounts
3. **Rotate SECRET_KEY** - generate a new one for production
4. **Restrict CORS** - only allow your frontend domain in production
5. **Use HTTPS** - always in production

## Troubleshooting

### Database Connection Issues

1. Check if PostgreSQL is running
2. Verify connection details in `.env`
3. Test connection: `psql -h HOST -U USER -d DB`

### Migration Issues

1. Ensure database exists
2. Check user permissions
3. Run: `python manage.py migrate --run-syncdb`

### Static Files Issues

1. Run: `python manage.py collectstatic`
2. Check `STATIC_ROOT` path
3. Verify WhiteNoise configuration in production

## Generating New SECRET_KEY

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Database URL Alternative

If you prefer using `DATABASE_URL`, install `dj-database-url`:

```bash
pip install dj-database-url
```

Then update `base.py`:

```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=60
    )
}
```

And use `DATABASE_URL` in your environment:
```bash
DATABASE_URL=postgres://user:password@host:port/dbname
```
