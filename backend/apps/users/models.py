from django.db import models
from django.contrib.auth.models import AbstractUser

# --------------------
# User & Roles
# --------------------
class User(AbstractUser):
    pass

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Permission(models.Model):
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.code

class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.role} → {self.permission}"

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} → {self.role}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    affiliation = models.CharField(max_length=255, blank=True)
    orcid = models.CharField(max_length=19, blank=True)
    bio = models.TextField(blank=True)
    mobile_phone = models.CharField(max_length=32, blank=True)
    work_phone = models.CharField(max_length=32, blank=True)
    gender = models.CharField(max_length=16, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    title = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f"Profile({self.user})"
