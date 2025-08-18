from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0004_userprofile_birth_date_userprofile_gender_and_more'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='user',
            constraint=models.UniqueConstraint(fields=('email',), name='unique_user_email'),
        ),
    ]


