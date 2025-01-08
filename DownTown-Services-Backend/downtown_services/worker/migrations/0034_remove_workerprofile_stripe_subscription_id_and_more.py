# Generated by Django 5.1.1 on 2024-12-30 07:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worker', '0033_workerprofile_subscription_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workerprofile',
            name='stripe_subscription_id',
        ),
        migrations.RemoveField(
            model_name='workerprofile',
            name='subscription_end_date',
        ),
        migrations.RemoveField(
            model_name='workerprofile',
            name='subscription_status',
        ),
        migrations.CreateModel(
            name='WorkerSubscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripe_subscription_id', models.CharField(blank=True, max_length=100, null=True)),
                ('stripe_price_id', models.CharField(max_length=255, null=True, unique=True)),
                ('stripe_product_id', models.CharField(max_length=255, null=True, unique=True)),
                ('tier_name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('platform_fee_perc', models.IntegerField(default=1)),
                ('analytics', models.CharField(max_length=20)),
                ('service_add_limit', models.IntegerField(default=0)),
                ('service_update_limit', models.IntegerField(default=0)),
                ('user_requests_limit', models.IntegerField(default=0)),
                ('subscription_status', models.CharField(choices=[('active', 'Active'), ('canceled', 'Canceled'), ('expired', 'Expired'), ('past_due', 'Past Due')], default='expired', max_length=20)),
                ('subscription_start_date', models.DateTimeField(auto_now_add=True)),
                ('subscription_end_date', models.DateTimeField(blank=True, null=True)),
                ('services_added', models.IntegerField(default=0)),
                ('services_updated', models.IntegerField(default=0)),
                ('user_requests_handled', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('worker_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='worker_subscription', to='worker.workerprofile')),
            ],
        ),
        migrations.DeleteModel(
            name='SubscriptionUsage',
        ),
    ]
