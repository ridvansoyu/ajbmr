from rest_framework import viewsets
from apps.users.permissions import require_permission
from .models import ReviewRound, Review, ReviewAssignment, ReviewFile, ReviewComment, ReviewRating
from .serializers import ReviewRoundSerializer, ReviewSerializer, ReviewAssignmentSerializer, ReviewFileSerializer, ReviewCommentSerializer, ReviewRatingSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            perm = require_permission('review_manuscripts')
        else:
            perm = require_permission('view_submissions')
        return [perm()]

class ReviewRoundViewSet(viewsets.ModelViewSet):
    queryset = ReviewRound.objects.all()
    serializer_class = ReviewRoundSerializer

    def get_permissions(self):
        return [require_permission('assign_reviewers')()]

class ReviewAssignmentViewSet(viewsets.ModelViewSet):
    queryset = ReviewAssignment.objects.all()
    serializer_class = ReviewAssignmentSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('assign_reviewers')
        return [perm()]

class ReviewFileViewSet(viewsets.ModelViewSet):
    queryset = ReviewFile.objects.all()
    serializer_class = ReviewFileSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('review_manuscripts')
        return [perm()]

class ReviewCommentViewSet(viewsets.ModelViewSet):
    queryset = ReviewComment.objects.all()
    serializer_class = ReviewCommentSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('review_manuscripts')
        return [perm()]

class ReviewRatingViewSet(viewsets.ModelViewSet):
    queryset = ReviewRating.objects.all()
    serializer_class = ReviewRatingSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('review_manuscripts')
        return [perm()]
