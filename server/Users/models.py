from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default="user")
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "users"
