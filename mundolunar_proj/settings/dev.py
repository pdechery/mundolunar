from decouple import config
import dj_database_url
from dj_database_url import parse as db_url
from .base import *

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {}

DATABASES['sqlite'] = {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
}

DATABASES['default'] = config('DATABASE_URL',cast=db_url)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', True)

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*'] 

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INTERNAL_IPS = [
    "127.0.0.1",
]

try:
    from .local import *
except ImportError:
    pass
