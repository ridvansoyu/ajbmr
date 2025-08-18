from django.db import models
from django.conf import settings as django_settings

class Notification(models.Model):
    recipient = models.ForeignKey(django_settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class NotificationType(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
