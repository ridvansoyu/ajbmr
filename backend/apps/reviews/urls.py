from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ReviewRoundViewSet,
    ReviewViewSet,
    ReviewAssignmentViewSet,
    ReviewFileViewSet,
    ReviewCommentViewSet,
    ReviewRatingViewSet,
)

router = DefaultRouter()
router.register(r'rounds', ReviewRoundViewSet, basename='review-round')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'assignments', ReviewAssignmentViewSet, basename='review-assignment')
router.register(r'files', ReviewFileViewSet, basename='review-file')
router.register(r'comments', ReviewCommentViewSet, basename='review-comment')
router.register(r'ratings', ReviewRatingViewSet, basename='review-rating')

urlpatterns = [
    path('', include(router.urls)),
]


