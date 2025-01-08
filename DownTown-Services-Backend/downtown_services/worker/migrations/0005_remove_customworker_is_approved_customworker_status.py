# Generated by Django 5.1.1 on 2024-10-09 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worker', '0004_customworker_is_approved'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customworker',
            name='is_approved',
        ),
        migrations.AddField(
            model_name='customworker',
            name='status',
            field=models.CharField(choices=[('in_review', 'In Review'), ('rejected', 'Rejected'), ('verified', 'Verified')], default='in_review', max_length=20),
        ),
    ]
