# Generated by Django 4.2.17 on 2025-01-02 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controller', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='valve',
            name='controller',
            field=models.TextField(blank=True, null=True),
        ),
    ]
