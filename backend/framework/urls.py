from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),                # Admin panel at /api/admin/
    path('api/', include('controller.urls')),           # Controller URLs directly accessible
    path('api/', include('authapp.urls')),              # AuthApp URLs directly accessible
]
