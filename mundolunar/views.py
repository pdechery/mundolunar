from wagtail.models import Page
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

	index = song_list.index(slug)
	proximas = song_list[index+1:]
	anteriores = song_list[:index]

	proxima = anterior = 0

	if(len(proximas) >= 2):
		proxima = proximas[1]

	if(len(anteriores) >= 1):
		anterior = anteriores[len(anteriores) - 1]

	song = Page.objects.filter(slug=slug).first()
	data = song.specific.data_gravacao

	return JsonResponse({
		'soundcloud_id': song.specific.soundcloud_id,
		'title': song.title,
		'proxima': proxima,
		'anterior': anterior,
		'data_gravacao':data.strftime("%d/%m/%Y"),
		'equipamentos':song.specific.equipamentos,
		'instrumentos':song.specific.instrumentos,
		'autoria':song.specific.autoria,
		'clima':song.specific.clima,
	}, safe=False)





