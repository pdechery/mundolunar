# Generated by Django 4.0.2 on 2022-03-01 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_songpage_options_songpage_song_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='songpage',
            old_name='date',
            new_name='data_gravacao',
        ),
        migrations.RenameField(
            model_name='songpage',
            old_name='song_id',
            new_name='soundcloud_id',
        ),
        migrations.AddField(
            model_name='songpage',
            name='autoria',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='songpage',
            name='clima',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='songpage',
            name='equipamentos',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='songpage',
            name='instrumentos',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
