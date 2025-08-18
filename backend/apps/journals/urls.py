from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalViewSet, SectionViewSet

router = DefaultRouter()
router.register(r'journals', JournalViewSet, basename='journal')
router.register(r'sections', SectionViewSet, basename='section')

urlpatterns = [
    path('', include(router.urls)),
]


