from rest_framework import viewsets
from apps.users.permissions import require_permission
from .models import (
    Manuscript,
    ManuscriptVersion,
    ManuscriptStatusHistory,
    EditorAssignment,
    Decision
)
from .serializers import (
    ManuscriptSerializer,
    ManuscriptVersionSerializer,
    ManuscriptStatusHistorySerializer,
    EditorAssignmentSerializer,
    DecisionSerializer
)

class ManuscriptViewSet(viewsets.ModelViewSet):
    queryset = Manuscript.objects.all()
    serializer_class = ManuscriptSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        elif self.action in ["create"]:
            perm = require_permission('submit_manuscript')
        elif self.action in ["update", "partial_update"]:
            perm = require_permission('assign_editors')
        elif self.action in ["destroy"]:
            perm = require_permission('make_final_decision')
        else:
            perm = require_permission('view_submissions')
        return [perm()]

class ManuscriptVersionViewSet(viewsets.ModelViewSet):
    queryset = ManuscriptVersion.objects.all()
    serializer_class = ManuscriptVersionSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            perm = require_permission('upload_files')
        else:
            perm = require_permission('view_submissions')
        return [perm()]

class ManuscriptStatusHistoryViewSet(viewsets.ModelViewSet):
    queryset = ManuscriptStatusHistory.objects.all()
    serializer_class = ManuscriptStatusHistorySerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('assign_editors')
        return [perm()]

## Review-related viewsets were moved to backend/apps/reviews/views.py

class EditorAssignmentViewSet(viewsets.ModelViewSet):
    queryset = EditorAssignment.objects.all()
    serializer_class = EditorAssignmentSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('assign_editors')
        return [perm()]

class DecisionViewSet(viewsets.ModelViewSet):
    queryset = Decision.objects.all()
    serializer_class = DecisionSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            perm = require_permission('view_submissions')
        else:
            perm = require_permission('make_final_decision')
        return [perm()]
