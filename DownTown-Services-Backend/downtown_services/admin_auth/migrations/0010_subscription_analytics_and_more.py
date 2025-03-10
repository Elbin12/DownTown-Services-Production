# Generated by Django 5.1.1 on 2024-12-14 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_auth', '0009_rename_service_add_count_subscriptionfeatures_service_add_limit_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='analytics',
            field=models.CharField(choices=[('no_analytics', 'No Analytics'), ('basic', 'Basic'), ('advanced', 'Advanced')], default='no_analytics', max_length=20),
        ),
        migrations.AddField(
            model_name='subscription',
            name='platform_fee_perc',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='subscription',
            name='service_add_limit',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='subscription',
            name='service_update_limit',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.AddField(
            model_name='subscription',
            name='user_requests_limit',
            field=models.CharField(default='0', max_length=20),
        ),
        migrations.DeleteModel(
            name='SubscriptionFeatures',
        ),
    ]
