from django.conf import settings
from django.urls import include, path
from . import views

urlpatterns = [
    path('song/<slug:slug>', views.get_links),
]