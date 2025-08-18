from django.db import models
from apps.manuscripts.models import Manuscript

class Issue(models.Model):
    volume = models.IntegerField()
    number = models.IntegerField()
    year = models.IntegerField()

class PublishedArticle(models.Model):
    manuscript = models.OneToOneField(Manuscript, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.SET_NULL, null=True)
    doi = models.CharField(max_length=255, blank=True)

class DOIRequest(models.Model):
    article = models.OneToOneField(PublishedArticle, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)

class LicenseAgreement(models.Model):
    article = models.ForeignKey(PublishedArticle, on_delete=models.CASCADE)
    signed_at = models.DateTimeField(auto_now_add=True)
