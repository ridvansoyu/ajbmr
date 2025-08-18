from django.db import migrations


def seed_roles_and_permissions(apps, schema_editor):
    Role = apps.get_model('users', 'Role')
    Permission = apps.get_model('users', 'Permission')
    RolePermission = apps.get_model('users', 'RolePermission')

    roles = {
        'Administrator': 'Manage users, roles, permissions, and system configuration',
        'Technical Admin': 'Manage infrastructure, backups, security, and server settings',
        'Editor-in-Chief': 'Oversee all submissions and make final decisions',
        'Managing Editor': 'Oversee editorial workflow, deadlines, and policies',
        'Section Editor': 'Assign reviewers and recommend decisions',
        'Associate Editor': 'Support editorial decisions and manage reviewers',
        'Guest Editor': 'Manage special issues or themed sections',
        'Editor': 'Manage editorial workflows',
        'Reviewer': 'Perform peer reviews and submit feedback',
        'Author': 'Submit manuscripts and revisions',
        'Copyeditor / Proofreader': 'Edit accepted manuscripts for language and formatting',
        'Production Editor': 'Prepare publication-ready files and manage final formatting',
        'Finance / Payment Manager': 'Manage invoices, payments, subscriptions',
        'Staff': 'Back-office operational tasks',
        'Visitor / Reader': 'Browse and read published articles',
    }

    permissions = {
        # System and admin
        'manage_users': 'Create/update users and assign roles',
        'manage_roles_permissions': 'Create/update roles and grant permissions',
        'manage_settings': 'Change system/application settings',
        'view_dashboard': 'View system and editorial dashboards',
        'manage_infrastructure': 'Manage servers, deployments, and infrastructure',
        'manage_backups_security': 'Manage backups and security policies',

        # Journal and workflow
        'manage_journals': 'Create/update journals and sections',
        'view_submissions': 'View manuscript submissions and statuses',
        'assign_editors': 'Assign editors to manuscripts',
        'assign_reviewers': 'Assign reviewers to manuscripts',
        'recommend_decision': 'Recommend accept/reject decisions',
        'make_final_decision': 'Make final accept/reject decisions',
        'publish_issue': 'Publish issues and articles',

        # Manuscripts and reviews
        'submit_manuscript': 'Submit manuscripts and revisions',
        'review_manuscripts': 'Provide peer reviews and recommendations',
        'upload_files': 'Upload and manage related files',
        'manage_special_issues': 'Manage special issues/themed sections',

        # Production
        'copyedit_content': 'Copyedit/proofread accepted manuscripts',
        'manage_production': 'Manage production and formatting for publication',

        # Finance
        'manage_payments': 'Manage invoices, payments, and subscriptions',
        'view_financials': 'View financial reports and analytics',

        # Public
        'view_published_articles': 'View published content',
    }

    role_objects = {}
    for name, desc in roles.items():
        role, _ = Role.objects.get_or_create(name=name, defaults={'description': desc})
        role_objects[name] = role

    permission_objects = {}
    for code, desc in permissions.items():
        p, _ = Permission.objects.get_or_create(code=code, defaults={'description': desc})
        permission_objects[code] = p

    grants = {
        'Administrator': [
            'manage_users','manage_roles_permissions','manage_settings','view_dashboard',
            'manage_journals','assign_editors','assign_reviewers','make_final_decision',
            'publish_issue','manage_payments','view_financials','manage_infrastructure',
            'manage_backups_security','manage_production','copyedit_content','view_submissions',
        ],
        'Technical Admin': [
            'manage_settings','view_dashboard','manage_infrastructure','manage_backups_security',
        ],
        'Editor-in-Chief': [
            'view_submissions','assign_editors','assign_reviewers','make_final_decision',
            'publish_issue','view_dashboard','manage_journals',
        ],
        'Managing Editor': [
            'view_submissions','assign_reviewers','recommend_decision','publish_issue','view_dashboard','manage_journals',
        ],
        'Section Editor': [
            'view_submissions','assign_reviewers','recommend_decision',
        ],
        'Associate Editor': [
            'view_submissions','assign_reviewers','recommend_decision',
        ],
        'Guest Editor': [
            'view_submissions','manage_special_issues','assign_reviewers','recommend_decision',
        ],
        'Editor': [
            'view_submissions','assign_reviewers','recommend_decision',
        ],
        'Reviewer': [
            'review_manuscripts','upload_files','view_submissions',
        ],
        'Author': [
            'submit_manuscript','upload_files','view_submissions',
        ],
        'Copyeditor / Proofreader': [
            'copyedit_content','view_submissions',
        ],
        'Production Editor': [
            'manage_production','publish_issue','upload_files','view_submissions',
        ],
        'Finance / Payment Manager': [
            'manage_payments','view_financials','view_dashboard',
        ],
        'Staff': [
            'upload_files','view_dashboard','view_submissions',
        ],
        'Visitor / Reader': [
            'view_published_articles',
        ],
    }

    for role_name, perm_codes in grants.items():
        role = role_objects[role_name]
        for code in perm_codes:
            RolePermission.objects.get_or_create(role=role, permission=permission_objects[code])


def unseed_roles_and_permissions(apps, schema_editor):
    Role = apps.get_model('users', 'Role')
    Permission = apps.get_model('users', 'Permission')
    RolePermission = apps.get_model('users', 'RolePermission')
    UserRole = apps.get_model('users', 'UserRole')

    UserRole.objects.all().delete()
    RolePermission.objects.all().delete()
    Permission.objects.all().delete()
    Role.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_roles_and_permissions, unseed_roles_and_permissions),
    ]


