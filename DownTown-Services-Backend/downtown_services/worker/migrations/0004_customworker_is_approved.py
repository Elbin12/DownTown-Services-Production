# Generated by Django 5.1.1 on 2024-10-09 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worker', '0003_customworker_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='customworker',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
