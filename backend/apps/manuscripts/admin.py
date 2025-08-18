from django.contrib import admin
from .models import (
    Manuscript,
    ManuscriptVersion,
    ManuscriptStatusHistory,
    EditorAssignment,
    Decision,
)


@admin.register(Manuscript)
class ManuscriptAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "submitted_at")
    search_fields = ("title",)


@admin.register(ManuscriptVersion)
class ManuscriptVersionAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "version_number", "created_at")


@admin.register(ManuscriptStatusHistory)
class ManuscriptStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "state", "changed_at")


@admin.register(EditorAssignment)
class EditorAssignmentAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "editor", "role")


@admin.register(Decision)
class DecisionAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "decision", "decided_at")


