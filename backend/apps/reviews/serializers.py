from rest_framework import serializers
from .models import ReviewRound, Review, ReviewAssignment, ReviewFile, ReviewComment, ReviewRating


class ReviewRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRound
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewAssignment
        fields = '__all__'

class ReviewFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewFile
        fields = '__all__'

class ReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewComment
        fields = '__all__'

class ReviewRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRating
        fields = '__all__'
