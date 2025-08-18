from rest_framework.permissions import BasePermission
from apps.users.models import RolePermission


def require_permission(code: str):
    class _HasPermission(BasePermission):
        def has_permission(self, request, view):
            user = request.user
            if not user or not user.is_authenticated:
                return False
            if getattr(user, 'is_superuser', False):
                return True
            return RolePermission.objects.filter(
                role__userrole__user=user,
                permission__code=code
            ).exists()

    _HasPermission.__name__ = f"HasPermission_{code}"
    return _HasPermission

