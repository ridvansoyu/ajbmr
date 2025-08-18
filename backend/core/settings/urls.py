from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({"status": "backend running"})

urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),
]


