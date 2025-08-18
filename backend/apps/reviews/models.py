from django.db import models
from django.conf import settings as django_settings
from apps.manuscripts.models import Manuscript

class ReviewRound(models.Model):
    manuscript = models.ForeignKey(Manuscript, related_name='review_rounds', on_delete=models.CASCADE)
    round_number = models.PositiveIntegerField(default=1)
    started_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("manuscript", "round_number")


class Review(models.Model):
    manuscript = models.ForeignKey(Manuscript, related_name='reviews', on_delete=models.CASCADE)
    review_round = models.ForeignKey(ReviewRound, related_name='reviews', on_delete=models.CASCADE)
    reviewer = models.ForeignKey(django_settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comments = models.TextField()
    score = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Pending')  # Pending, Submitted, Completed
    submitted_at = models.DateTimeField(null=True, blank=True)

class ReviewAssignment(models.Model):
    review_round = models.ForeignKey(ReviewRound, related_name='assignments', on_delete=models.CASCADE)
    reviewer = models.ForeignKey(django_settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

class ReviewFile(models.Model):
    review = models.ForeignKey(Review, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/reviews/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class ReviewComment(models.Model):
    review = models.ForeignKey(ReviewAssignment, on_delete=models.CASCADE)
    commenter = models.ForeignKey(django_settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class ReviewRating(models.Model):
    review = models.ForeignKey(ReviewAssignment, on_delete=models.CASCADE)
    criterion = models.CharField(max_length=100)
    rating = models.IntegerField()  # e.g., 1-5 scale
    created_at = models.DateTimeField(auto_now_add=True)
