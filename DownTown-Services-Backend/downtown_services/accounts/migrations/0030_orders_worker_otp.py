# Generated by Django 5.1.1 on 2025-01-02 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0029_userprofile_is_any_pending_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='worker_otp',
            field=models.IntegerField(default=8756),
        ),
    ]
