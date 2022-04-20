from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from django.http import JsonResponse


# Home
class HomePage(Page):
    thumbnail = models.ImageField(upload_to='uploads', blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('thumbnail', classname="full"),
    ]

    subpage_types = ['TextPage','SongPage']

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        context['sobre'] = TextPage.objects.filter(slug='sobre').first()
        context['destaque'] = SongPage.objects.get(is_destaque=True)
        context['songs'] = [song for song in self.get_children() if song.content_type.name == "song"]
        return context

# Posts
class TextPage(Page):
    date = models.DateField("Post date")
    body = RichTextField(null=True,blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('body', classname="full"),
    ]

# Músicas
class SongPage(Page):

    class Meta:
        verbose_name = "song"

    data_gravacao = models.DateField("Data Gravação")
    body = RichTextField(null=True,blank=True) # pode ser usado pra letra
    soundcloud_id = models.IntegerField(null=True, blank=True)
    is_destaque = models.BooleanField(default=False, verbose_name="Destaque")

    autoria = models.CharField(max_length=255, default="Pierre Dechery")
    equipamentos = models.CharField(max_length=255, null=True,blank=True)
    instrumentos = models.CharField(max_length=255, null=True,blank=True)
    clima = models.CharField(max_length=255, null=True, blank=True) # como tags do rate your music

    content_panels = Page.content_panels + [
        FieldPanel('data_gravacao'),
        FieldPanel('body', classname="full"),
        FieldPanel('soundcloud_id'),
        FieldPanel('autoria'),
        FieldPanel('equipamentos'),
        FieldPanel('instrumentos'),
        FieldPanel('clima'),
        FieldPanel('is_destaque')
    ]
