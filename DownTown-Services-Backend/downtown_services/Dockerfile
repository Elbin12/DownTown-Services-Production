FROM python:3.12.3-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app/

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "downtown_services.asgi:application"]