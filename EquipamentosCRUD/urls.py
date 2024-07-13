from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include("website.url")),
    path('api/equipamentos/', include("api.urls"))
]
