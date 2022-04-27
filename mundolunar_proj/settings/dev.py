from decouple import config
from .base import *

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'sqlite': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'default': {
        'CONN_MAX_AGE': 0,
        "ENGINE": 'django.db.backends.postgresql',
        'HOST': 'localhost',
        'NAME': config('DATABASE_NAME'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'PORT': '5432',
        'USER': config('DATABASE_USER')
    }
}

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
