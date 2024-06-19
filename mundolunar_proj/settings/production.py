from decouple import config
import dj_database_url
from dj_database_url import parse as db_url
from .base import *

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DEBUG = config('DEBUG', True)

ALLOWED_HOSTS = ['.mundolunar.art.br']

DATABASES = {}
#DATABASES['default'] = dj_database_url.config(conn_max_age=600)
DATABASES['default'] = config('DATABASE_URL',cast=db_url)

STATIC_URL = '/static/'
STATIC_ROOT = '/home/mundolunar/www/static'

MEDIA_URL = 'media/'
MEDIA_ROOT = '/home/mundolunar/www/media'

try:
    from .local import *
except ImportError:
    pass