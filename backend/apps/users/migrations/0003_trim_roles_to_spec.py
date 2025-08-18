from django.db import migrations


UNWANTED = [
    'Associate Editor',
    'Editor',
    'Staff',
]


def trim_roles(apps, schema_editor):
    Role = apps.get_model('users', 'Role')
    RolePermission = apps.get_model('users', 'RolePermission')
    UserRole = apps.get_model('users', 'UserRole')

    for name in UNWANTED:
        try:
            role = Role.objects.get(name=name)
        except Role.DoesNotExist:
            continue
        UserRole.objects.filter(role=role).delete()
        RolePermission.objects.filter(role=role).delete()
        role.delete()


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0002_seed_roles_permissions'),
    ]

    operations = [
        migrations.RunPython(trim_roles, noop),
    ]


