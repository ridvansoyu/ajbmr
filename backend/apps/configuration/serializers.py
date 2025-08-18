from rest_framework import serializers
from .models import JournalSetting, EmailTemplate

class JournalSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalSetting
        fields = '__all__'

class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailTemplate
        fields = '__all__'
