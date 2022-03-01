from wagtail.core.models import Page
from .models import HomePage
from django.shortcuts import render
from django.http import JsonResponse

def get_links(request, slug):

	'''
	1) recebe o nome da música
	2) localiza esse nome num array de nomes de músicas
	3) retorna o próximo nome e o nome anterior ao passado
	'''

	home_page = HomePage.objects.first()
	song_list = [song.slug for song in home_page.get_children() if song.content_type.name == "song"]

	slug_index = song_list.index(slug)
	proximas = song_list[slug_index:]
	anteriores = song_list[:slug_index]

	proxima = anterior = 0

	if(len(proximas) > 0):
		proxima = proximas[1]

	if(len(anteriores) >= 2):
		anterior = anteriores[len(anteriores) - 1]

	song = Page.objects.filter(slug=slug).first()

	return JsonResponse({
		'song_id': song.specific.song_id,
		'title': song.title,
		'proxima': proxima,
		'anterior': anterior,
		'date':song.specific.date
	}, safe=False)





