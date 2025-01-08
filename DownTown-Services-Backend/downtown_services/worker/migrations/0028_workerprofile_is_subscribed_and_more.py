# Generated by Django 5.1.1 on 2024-12-16 03:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_auth', '0010_subscription_analytics_and_more'),
        ('worker', '0027_wallet_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerprofile',
            name='is_subscribed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='subscription',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='worker_profile', to='admin_auth.subscription'),
        ),
    ]
