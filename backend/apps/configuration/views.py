from rest_framework import viewsets
from .models import JournalSetting, EmailTemplate
from .serializers import JournalSettingSerializer, EmailTemplateSerializer

class JournalSettingViewSet(viewsets.ModelViewSet):
    queryset = JournalSetting.objects.all()
    serializer_class = JournalSettingSerializer

class EmailTemplateViewSet(viewsets.ModelViewSet):
    queryset = EmailTemplate.objects.all()
    serializer_class = EmailTemplateSerializer
