# Generated by Django 5.1.1 on 2024-12-30 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worker', '0032_subscriptionusage'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerprofile',
            name='subscription_status',
            field=models.CharField(choices=[('active', 'Active'), ('canceled', 'Canceled'), ('expired', 'Expired'), ('past_due', 'Past Due')], default='expired', max_length=20),
        ),
    ]
