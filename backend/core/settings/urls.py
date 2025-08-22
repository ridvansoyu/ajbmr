from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({"status": "backend running"})

urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('core.urls')),
    path('api/', include('journals.urls')),
    path('api/', include('submissions.urls')),
    path('api/', include('reviews.urls')),
    path('api/', include('status.urls')),
]


