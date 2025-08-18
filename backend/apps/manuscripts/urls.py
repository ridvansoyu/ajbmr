from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ManuscriptViewSet,
    ManuscriptVersionViewSet,
    ManuscriptStatusHistoryViewSet,
    EditorAssignmentViewSet,
    DecisionViewSet,
)

router = DefaultRouter()
router.register(r'manuscripts', ManuscriptViewSet, basename='manuscript')
router.register(r'versions', ManuscriptVersionViewSet, basename='manuscript-version')
router.register(r'status-history', ManuscriptStatusHistoryViewSet, basename='manuscript-status-history')
router.register(r'editor-assignments', EditorAssignmentViewSet, basename='editor-assignment')
router.register(r'decisions', DecisionViewSet, basename='decision')

urlpatterns = [
    path('', include(router.urls)),
]


