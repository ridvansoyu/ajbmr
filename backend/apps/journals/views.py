from rest_framework import viewsets, mixins
from apps.users.permissions import require_permission
from .models import Journal, Section
from .serializers import JournalSerializer, SectionSerializer


class JournalViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer

    def get_permissions(self):
        return [require_permission('view_published_articles')()]


class SectionViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    def get_permissions(self):
        return [require_permission('view_published_articles')()]


