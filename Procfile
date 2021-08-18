release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn hng_resume.wsgi --log-file -