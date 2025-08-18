Next steps I can wire:
accounts app: custom User model, role enums, DRF permissions
JWT login endpoints under api/accounts/
Per-app urls.py mounted in core/settings/urls.py

Next steps (recommended)
Ensure backend/apps/users/models.py defines User (since AUTH_USER_MODEL = 'users.User').
Implement workflow.models (has WorkflowState referenced by manuscripts).
Add admin registrations and migrations:
$env:DJANGO_SETTINGS_MODULE='backend.core.settings.dev'
python backend/manage.py makemigrations
python backend/manage.py migrate
Fill app urls.py with endpoints, or remove mounts until ready.
If you want, I can scaffold minimal workflow models and users admin, then run migrations.

What you need to do
Apply migrations:
$env:DJANGO_SETTINGS_MODULE='backend.core.settings.dev'
python backend/manage.py makemigrations
python backend/manage.py migrate
Create a superuser:
python backend/manage.py createsuperuser
Run server:
python backend/manage.py runserver
Visit: http://127.0.0.1:8000/admin/
Model registrations added
backend/apps/users/admin.py: Registers custom User with a proper UserAdmin.
backend/apps/manuscripts/admin.py: Registers Manuscript, ManuscriptVersion, ManuscriptStatusHistory, EditorAssignment, Decision.
backend/apps/reviews/admin.py: Registers ReviewRound, Review, ReviewAssignment, ReviewFile, ReviewComment, ReviewRating.
backend/core/admin.py: Sets admin site titles.
Production considerations
Set DEBUG=False and set ALLOWED_HOSTS.
Collect static files:
python backend/manage.py collectstatic
Configure a static files server (e.g., Nginx) to serve STATIC_ROOT.
Secure admin with strong passwords, HTTPS, and possibly IP allowlists.
Optional improvements
Add search, filters, and list displays (already included for key models).
Register any additional models you want visible in admin.
Create custom admin actions for bulk operations.
Summary:
Admin is configured and URLs are wired.
I registered your main models for immediate use in /admin.
Next: run migrations, create a superuser, and log in.


Use one of these clean options
Directly pass settings to Django (most robust):
Or set the env var for the current session, then run normally:
If you haven’t installed dependencies yet:
Django will create migrations/ folders automatically for apps with models during makemigrations; no extra config is required.


Migrations packages: Django will create migrations/ automatically when you run makemigrations; no extra files needed.
Next steps to apply:
Install deps: pip install -r backend/requirements.txt
Migrate:
python backend/manage.py makemigrations --settings=backend.core.settings.dev
python backend/manage.py migrate --settings=backend.core.settings.dev
Create admin: python backend/manage.py createsuperuser --settings=backend.core.settings.dev
Run: python backend/manage.py runserver --settings=backend.core.settings.dev
Notes:

rbac/object-permissions: if you need per-object access, consider django-guardian or a dedicated roles app.

es, it’s ready. You can log in as an admin through:
Django Admin UI: browser login at /admin
API (JWT): POST to /api/users/token/ to get access/refresh tokens
Follow these steps in PowerShell:
1) Install dependencies
pip install -r backend/requirements.txt
2) Configure settings for commands
Option A (recommended per-call): append --settings=backend.core.settings.dev to each manage.py command
Option B (session env var): $env:DJANGO_SETTINGS_MODULE='backend.core.settings.dev'
3) Make and apply migrations
python backend/manage.py makemigrations --settings=backend.core.settings.dev
python backend/manage.py migrate --settings=backend.core.settings.dev
4) Create a superuser (admin)
python backend/manage.py createsuperuser --settings=backend.core.settings.dev
Provide email/username and password when prompted
5) Run the server
python backend/manage.py runserver --settings=backend.core.settings.dev
Visit http://127.0.0.1:8000/admin and log in with the superuser
6) Optional: Log in via API (JWT)
POST http://127.0.0.1:8000/api/users/token/
JSON body:
{ "username": "<your-admin-username>", "password": "<your-password>" }
You’ll receive:
{ "access": "<jwt>", "refresh": "<jwt>" }
Use the access token for authenticated API calls:
Authorization: Bearer <access>
Notes:
Since you added multi-journal, create at least one Journal in /admin before creating manuscripts.

cd backend
pip install -r requirements.txt
python manage.py makemigrations --settings=backend.core.settings.dev
python manage.py migrate --settings=backend.core.settings.dev
python manage.py createsuperuser --settings=backend.core.settings.dev
python manage.py runserver --settings=backend.core.settings.dev
Login options:
Admin UI: open http://127.0.0.1:8000/admin and sign in with the superuser you created.
API (JWT):
POST http://127.0.0.1:8000/api/users/token/
Body:
{ "username": "YOUR_ADMIN_USERNAME", "password": "YOUR_PASSWORD" }
Use the returned access token as: Authorization: Bearer <access>

After login, add at least one Journal in /admin before creating manuscri

Why no migration files after “migrate”?
migrate applies existing migrations; it does not create new ones. You must run makemigrations to generate migration files per app first.