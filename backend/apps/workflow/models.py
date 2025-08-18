from django.db import models


class WorkflowState(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class WorkflowTransition(models.Model):
    from_state = models.ForeignKey(WorkflowState, related_name='from_transitions', on_delete=models.CASCADE)
    to_state = models.ForeignKey(WorkflowState, related_name='to_transitions', on_delete=models.CASCADE)
    label = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ("from_state", "to_state")

