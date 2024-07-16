from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', views.EquipamentoList.as_view(), name='read_create'),
    path('<int:pk>/', views.EquipamentoDetail.as_view(), name='read_update_delete'),
]


urlpatterns = format_suffix_patterns(urlpatterns)
