from django.urls import path
from . import views

urlpatterns = [
    path('', views.manager_list_all_add_new, name='read_create'),
    path('<int:pk>/', views.manager_read_update_delete, name='read_update_delete'),
]
