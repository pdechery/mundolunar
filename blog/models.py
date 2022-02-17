from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from django.http import JsonResponse


# Home
class HomePage(Page):
    thumbnail = models.ImageField(upload_to='uploads',blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('thumbnail', classname="full"),
    ]

    subpage_types = ['TextPage','SongPage']

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        context['sobre'] = TextPage.objects.filter(slug='bagaca').first()
        context['destaque'] = SongPage.objects.first()
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

    date = models.DateField("Post date")
    body = RichTextField(null=True,blank=True)
    song_id = models.IntegerField(null=True,blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('body', classname="full"),
        FieldPanel('song_id'),
    ]

    def serve(self, request):
        return JsonResponse({
            'title': self.title,
            'body': self.body,
            'date': self.date,
            'song_id':self.song_id
        })
