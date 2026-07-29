import multiprocessing
import os

bind = f"0.0.0.0:{os.getenv('PORT', '8000')}"

workers = int(os.getenv('WEB_CONCURRENCY', multiprocessing.cpu_count() * 2 + 1))

worker_class = 'sync'

timeout = 120

max_requests = 1000
max_requests_jitter = 50

loglevel = 'info'
accesslog = '-'  # Вывод логов доступа в stdout
errorlog = '-'   # Вывод ошибок в stderr