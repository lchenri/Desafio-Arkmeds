from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.EquipamentoList.as_view(), name='read_create'),
    path('<int:pk>/', views.EquipamentoDetail.as_view(), name='read_update_delete'),
]

