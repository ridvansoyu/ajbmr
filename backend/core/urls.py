from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/manuscripts/', include('apps.manuscripts.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('api/workflow/', include('apps.workflow.urls')),
    path('api/files/', include('apps.files.urls')),
    path('api/journals/', include('apps.journals.urls')),
    path('api/taxonomy/', include('apps.taxonomy.urls')),
]


