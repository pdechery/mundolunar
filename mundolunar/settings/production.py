from .base import *

DEBUG = False

DATABASES = {
  'default': {
    'CONN_MAX_AGE': 0,
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'HOST': '172.19.0.2',
    'NAME': 'mundolunar',
    'PASSWORD': 'abc123',
    'PORT': '5432',
    'USER': 'mundolunar'
  }
}

try:
    from .local import *
except ImportError:
    pass
