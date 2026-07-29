import os

DEBUG = False

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost 127.0.0.1").split(" ")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': f'{os.environ.get('DB_NAME')}',
        'USER': f'{os.environ.get('DB_USER')}',
        'PASSWORD': f'{os.environ.get('DB_PASSWORD')}',
        'HOST': f"{os.environ.get('DB_HOST')}",
        'PORT': f"{os.environ.get('DB_PORT', '5432')}",
    }
}

CORS_ALLOWED_ORIGINS = [
    f"{os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')}"
]

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True