from django.db import models
from django.conf import settings
from apps.workflow.models import WorkflowState
from apps.journals.models import Journal, Section

User = settings.AUTH_USER_MODEL

# --------------------
# Manuscript & Versions
# --------------------
class Manuscript(models.Model):
    journal = models.ForeignKey(Journal, related_name='manuscripts', on_delete=models.CASCADE)
    section = models.ForeignKey(Section, related_name='manuscripts', on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    corresponding_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='corresponding_manuscripts')
    current_state = models.ForeignKey(WorkflowState, on_delete=models.SET_NULL, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

class ManuscriptVersion(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE, related_name='versions')
    version_number = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class ManuscriptStatusHistory(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE, related_name='status_history')
    state = models.ForeignKey(WorkflowState, on_delete=models.CASCADE)
    changed_at = models.DateTimeField(auto_now_add=True)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

# --------------------
# Editors & Decisions
# --------------------
class EditorAssignment(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE, related_name='editor_assignments')
    editor = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)  # Section Editor, Editor-in-Chief

class Decision(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE, related_name='decisions')
    decision = models.CharField(max_length=50)  # Accept, Reject, etc.
    decided_by = models.ForeignKey(User, on_delete=models.CASCADE)
    decided_at = models.DateTimeField(auto_now_add=True)
