from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'www.mundolunar.art.br']

DATABASES = {
  'default': {
    'CONN_MAX_AGE': 0,
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'HOST': 'ec2-3-220-222-72.compute-1.amazonaws.com',
    'NAME': 'd4anc537lg5ruu',
    'PASSWORD': '500334bfce12d8103da9a9b395754fb859ea61a112903b098a55690f338cb13f',
    'PORT': '5432',
    'USER': 'wbmcinujmjabtk'
  }
}

try:
    from .local import *
except ImportError:
    pass
