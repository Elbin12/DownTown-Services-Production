# Generated by Django 5.1.1 on 2024-10-16 15:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worker', '0007_services'),
    ]

    operations = [
        migrations.AddField(
            model_name='services',
            name='worker',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='services', to='worker.customworker'),
        ),
    ]
