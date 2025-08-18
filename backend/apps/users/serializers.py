from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, UserProfile, Role, UserRole


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "is_active", "is_staff", "is_superuser")


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, write_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    organization = serializers.CharField(required=False, allow_blank=True)
    biography = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    def validate(self, attrs):
        password = attrs.get('password', '')
        # Enforce stronger password rules
        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters."})
        if password.islower() or password.isupper():
            raise serializers.ValidationError({"password": "Password must include both upper and lower case letters."})
        if not any(ch.isdigit() for ch in password):
            raise serializers.ValidationError({"password": "Password must include at least one digit."})
        return attrs

    def create(self, validated_data):
        email = validated_data["email"].lower()
        user = User(
            username=email,
            email=email,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        user.set_password(validated_data["password"])
        user.save()

        # ensure a profile row exists and store initial data
        profile, _ = UserProfile.objects.get_or_create(
            user=user,
            defaults={}
        )
        profile.affiliation = validated_data.get("organization", "")
        profile.bio = validated_data.get("biography", "")
        profile.save()

        try:
            role = Role.objects.get(name='Visitor / Reader')
            UserRole.objects.get_or_create(user=user, role=role)
        except Role.DoesNotExist:
            pass

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, write_only=True)
    last_name = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'affiliation', 'orcid', 'bio', 'mobile_phone', 'work_phone', 'gender', 'birth_date', 'title',
            'first_name', 'last_name'
        ]


