from rest_framework import serializers
from .models import (
    Manuscript,
    ManuscriptVersion,
    ManuscriptStatusHistory,
    EditorAssignment,
    Decision
)

class ManuscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manuscript
        fields = '__all__'

class ManuscriptVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManuscriptVersion
        fields = '__all__'

class ManuscriptStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ManuscriptStatusHistory
        fields = '__all__'

## Review-related serializers were moved to backend/apps/reviews/serializers.py

class EditorAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorAssignment
        fields = '__all__'

class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = '__all__'
