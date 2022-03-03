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
        'NAME': 'mundolunar',
        'PASSWORD': 'postgres',
        'PORT': '5432',
        'USER': 'postgres'
    }
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-&clhlnl+ku92c&#in-4f(z$u)+pt%(byc(lvd0c6a2h%sjw(p%'

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
