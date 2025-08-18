# Quick Start Guide

Get your local development environment up and running in minutes!

## Prerequisites

- Python 3.12+
- Node.js 18+ (for frontend)
- PostgreSQL (or Docker)

## Option 1: Automated Setup (Recommended)

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Run the setup script:**
   ```bash
   python setup_local.py
   ```

3. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

## Option 2: Manual Setup

### Backend Setup

1. **Create environment file:**
   ```bash
   cd backend
   # Copy the content below to .env file
   ```

   ```bash
   # Django Settings
   DJANGO_SECRET_KEY=$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x
   DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost

   # PostgreSQL Database Configuration
   POSTGRES_DB=ajbmrdb
   POSTGRES_USER=journal_admin
   POSTGRES_PASSWORD=Journal!2025
   POSTGRES_HOST=127.0.0.1
   POSTGRES_PORT=5432

   # CORS Settings
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

2. **Set up PostgreSQL:**

   **Option A: Docker (Easiest)**
   ```bash
   # From project root
   docker-compose up -d postgres
   ```

   **Option B: Local Installation**
   ```sql
   CREATE DATABASE ajbmrdb;
   CREATE USER journal_admin WITH PASSWORD 'Journal!2025';
   GRANT ALL PRIVILEGES ON DATABASE ajbmrdb TO journal_admin;
   ```

3. **Install dependencies and run migrations:**
   ```bash
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file:**
   ```bash
   # Create frontend/.env.local
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Access Your Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://127.0.0.1:8000/api/
- **Django Admin:** http://127.0.0.1:8000/admin/
- **pgAdmin (if using Docker):** http://localhost:5050

## Database Management

### Using pgAdmin (Docker)
- URL: http://localhost:5050
- Email: admin@example.com
- Password: admin123
- Server: postgres (hostname)
- Database: ajbmrdb
- Username: journal_admin
- Password: Journal!2025

### Using psql
```bash
psql -h 127.0.0.1 -U journal_admin -d ajbmrdb
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -h 127.0.0.1 -U journal_admin -d ajbmrdb -c "SELECT 1;"
```

### Migration Issues
```bash
python manage.py migrate --run-syncdb
```

### Frontend API Issues
- Check `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local`
- Ensure backend is running on http://127.0.0.1:8000

## Next Steps

1. **Create a superuser** (if not done during setup):
   ```bash
   python manage.py createsuperuser
   ```

2. **Add a Journal** in Django admin:
   - Go to http://127.0.0.1:8000/admin/
   - Navigate to Journals → Journals
   - Add a new journal with name, slug, and description

3. **Test the API:**
   ```bash
   curl http://127.0.0.1:8000/api/journals/
   ```

4. **Register a user** at http://localhost:3000/register

## Production Deployment

See `docs/ConfigurationGuide.md` for detailed production setup instructions.
