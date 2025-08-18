from django.contrib import admin
from .models import WorkflowState, WorkflowTransition


@admin.register(WorkflowState)
class WorkflowStateAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(WorkflowTransition)
class WorkflowTransitionAdmin(admin.ModelAdmin):
    list_display = ("id", "from_state", "to_state")


