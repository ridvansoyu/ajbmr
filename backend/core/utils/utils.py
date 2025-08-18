import uuid
from django.utils import timezone
from django.core.files.base import ContentFile

# -------------------------
# General Utilities
# -------------------------

def generate_uuid():
    """Generate a unique UUID string."""
    return str(uuid.uuid4())

def get_timestamp():
    """Return current timestamp."""
    return timezone.now()

def save_uploaded_file(file, path):
    """
    Save a file to a given path.
    Returns the saved file path.
    """
    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return path

def model_to_dict(instance, exclude_fields=None):
    """
    Convert a Django model instance to dict.
    """
    from django.forms.models import model_to_dict as django_model_to_dict
    exclude_fields = exclude_fields or []
    return django_model_to_dict(instance, exclude=exclude_fields)

def soft_delete(instance):
    """
    Mark a model instance as deleted (if 'is_deleted' field exists).
    """
    if hasattr(instance, 'is_deleted'):
        instance.is_deleted = True
        instance.save()
    else:
        raise AttributeError("Instance has no 'is_deleted' field.")
# core/utils.py

from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db.models import Max

# -------------------------
# Manuscript & Review Utils
# -------------------------

def get_latest_manuscript_version(manuscript):
    """
    Returns the latest version number of a manuscript.
    """
    latest = manuscript.manuscriptversion_set.aggregate(Max('version_number'))['version_number__max']
    return latest if latest else 0

def add_manuscript_version(manuscript):
    """
    Creates a new version of a manuscript.
    """
    version_number = get_latest_manuscript_version(manuscript) + 1
    from apps.manuscripts.models import ManuscriptVersion
    return ManuscriptVersion.objects.create(manuscript=manuscript, version_number=version_number)

def record_manuscript_status(manuscript, state, user=None):
    """
    Logs a new status for a manuscript.
    """
    from apps.manuscripts.models import ManuscriptStatusHistory
    return ManuscriptStatusHistory.objects.create(
        manuscript=manuscript,
        state=state,
        changed_by=user
    )

def assign_reviewer(review_round, reviewer):
    """
    Assigns a reviewer to a review round.
    """
    from apps.reviews.models import ReviewAssignment
    assignment, created = ReviewAssignment.objects.get_or_create(
        review_round=review_round,
        reviewer=reviewer
    )
    return assignment

def submit_review(review_instance, comments, recommendation=None, score=None):
    """
    Submits a review, updating relevant fields and timestamps.
    Works for both Manuscript Review and Review App Review.
    """
    review_instance.comments = comments
    if hasattr(review_instance, 'recommendation') and recommendation:
        review_instance.recommendation = recommendation
    if hasattr(review_instance, 'score') and score is not None:
        review_instance.score = score
    if hasattr(review_instance, 'submitted_at'):
        review_instance.submitted_at = timezone.now()
    review_instance.save()
    return review_instance

# -------------------------
# File & Upload Utils
# -------------------------

def handle_uploaded_file(file_instance, path='uploads/'):
    """
    Generic file handling utility. Saves file to the path.
    """
    import os
    from django.core.files.storage import default_storage
    file_name = os.path.join(path, file_instance.name)
    saved_path = default_storage.save(file_name, file_instance)
    return saved_path

# -------------------------
# Reviewer Utils
# -------------------------

def mark_assignment_completed(assignment):
    """
    Marks a reviewer assignment as completed.
    """
    assignment.completed = True
    assignment.save()
    return assignment

def validate_score(score, min_val=1, max_val=5):
    """
    Validates a score against a numeric range.
    """
    if score is not None and (score < min_val or score > max_val):
        raise ValidationError(f"Score must be between {min_val} and {max_val}.")
    return True
