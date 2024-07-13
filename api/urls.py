from django.urls import path
from . import views

urlpatterns = [
    path('', views.equipamentos_get_post, name='equipamentos'),
    path('<int:pk>/', views.equipamentos_read, name='detalhes'),
    path('<int:pk>/', views.equipamentos_edit, name='atualizar'),
    path('<int:pk>/', views.equipamentos_delete, name='deletar'),
]
