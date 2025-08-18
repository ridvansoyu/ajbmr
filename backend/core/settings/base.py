import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# Point BASE_DIR to the 'backend' folder
BASE_DIR = Path(__file__).resolve().parents[2]

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / '.env', override=True)

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', '$y5ib+k(a@4_dvb)u!fq&$xf9^9b%=42(&klab!hn6t2hc+65x')
DEBUG = False

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    # Local apps
    'apps.users.apps.UsersConfig',
    'apps.manuscripts.apps.ManuscriptsConfig',
    'apps.reviews.apps.ReviewsConfig',
    'apps.publishing.apps.PublishingConfig',
    'apps.notifications.apps.NotificationsConfig',
    'apps.payments.apps.PaymentsConfig',
    'apps.configuration.apps.ConfigurationConfig',
    'apps.files.apps.FilesConfig',
    'apps.security.apps.SecurityConfig',
    'apps.workflow.apps.WorkflowConfig',
    'apps.journals.apps.JournalsConfig',
    'apps.taxonomy.apps.TaxonomyConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.settings.wsgi.application'
ASGI_APPLICATION = 'core.settings.asgi.application'

# Database configuration - supports both DATABASE_URL and individual env vars
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    # Use DATABASE_URL if provided (common in production)
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=60
        )
    }
else:
    # Use individual environment variables (common in development)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB', 'ajbmrdb'),
            'USER': os.getenv('POSTGRES_USER', 'journal_admin'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'Journal!2025'),
            'HOST': os.getenv('POSTGRES_HOST', '127.0.0.1'),
            'PORT': os.getenv('POSTGRES_PORT', '5432'),
            'CONN_MAX_AGE': 60,
        }
    }

AUTH_USER_MODEL = 'users.User'

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator' },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_ROOT = BASE_DIR / 'uploads'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

CORS_ALLOW_ALL_ORIGINS = True


