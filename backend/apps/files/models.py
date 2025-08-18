from django.db import models
from django.conf import settings as django_settings
from apps.manuscripts.models import Manuscript, ManuscriptVersion

class FileCategory(models.Model):
    name = models.CharField(max_length=50)

class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    category = models.ForeignKey(FileCategory, on_delete=models.SET_NULL, null=True)
    uploaded_by = models.ForeignKey(django_settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class ManuscriptFile(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    version = models.ForeignKey(ManuscriptVersion, on_delete=models.CASCADE, null=True, blank=True)
