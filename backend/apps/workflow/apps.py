from django.apps import AppConfig


class WorkflowConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.workflow'
    label = 'workflow'

    def ready(self):
        # Place for workflow signals/hooks if needed later
        return super().ready()
