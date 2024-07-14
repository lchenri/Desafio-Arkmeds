from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    path('', views.home, name='home'),
    path('adicionar-equipamento', views.add_equipamento, name='add_equipamento'),
]
