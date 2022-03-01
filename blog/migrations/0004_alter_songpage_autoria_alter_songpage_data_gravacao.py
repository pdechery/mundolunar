# Generated by Django 4.0.2 on 2022-03-01 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_rename_date_songpage_data_gravacao_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songpage',
            name='autoria',
            field=models.CharField(default='Pierre Dechery', max_length=255),
        ),
        migrations.AlterField(
            model_name='songpage',
            name='data_gravacao',
            field=models.DateField(verbose_name='Data Gravação'),
        ),
    ]
