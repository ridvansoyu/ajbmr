# Backend environment variables (Django)

Create a `.env` file in the `backend/` directory with the following keys:

- DJANGO_SECRET_KEY
- DJANGO_ALLOWED_HOSTS
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_HOST
- POSTGRES_PORT

Example `.env` content:

DJANGO_SECRET_KEY=change-me
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
POSTGRES_DB=journal
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-strong-password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432

Notes:
- Do not commit your real `.env` values to source control.
- In production, set these as real environment variables or via your hosting provider’s secrets manager.
