# Use the official Python image from the Docker Hub
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the Django project into the working directory
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Run the Django development server
CMD ["gunicorn", "server.wsgi:application", "--bind", "127.0.0.1:8000"]
