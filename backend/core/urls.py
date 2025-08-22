from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', include('apps.users.urls')),
    path('api/manuscripts/', include('apps.manuscripts.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('api/workflow/', include('apps.workflow.urls')),
    path('api/files/', include('apps.files.urls')),
    path('api/journals/', include('apps.journals.urls')),
    path('api/taxonomy/', include('apps.taxonomy.urls')),
]


