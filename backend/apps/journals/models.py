from django.db import models


class Journal(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    issn_print = models.CharField(max_length=20, blank=True)
    issn_online = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class Section(models.Model):
    journal = models.ForeignKey(Journal, related_name='sections', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)

    class Meta:
        unique_together = ("journal", "slug")

    def __str__(self) -> str:
        return f"{self.journal.name} / {self.name}"


