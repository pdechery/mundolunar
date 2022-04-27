from decouple import config
import dj_database_url
from .base import *

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DEBUG = config('DEBUG', False)

ALLOWED_HOSTS = ['.mundolunar.art.br']

DATABASES = {}
DATABASES['default'] = dj_database_url.config(conn_max_age=600)

try:
    from .local import *
except ImportError:
    pass
