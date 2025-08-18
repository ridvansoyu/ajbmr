from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, UserProfile
from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"id": user.id, "email": user.email}, status=status.HTTP_201_CREATED)


class ProfileMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        profile_data = UserProfileSerializer(profile).data
        data = {
            "email": request.user.email,
            "first_name": getattr(request.user, "first_name", ""),
            "last_name": getattr(request.user, "last_name", ""),
            **profile_data,
        }
        return Response(data)

    def put(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        # Update user basic fields if provided
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        changed = False
        if isinstance(first_name, str):
            request.user.first_name = first_name
            changed = True
        if isinstance(last_name, str):
            request.user.last_name = last_name
            changed = True
        if changed:
            request.user.save()

        serializer = UserProfileSerializer(instance=profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "email": request.user.email,
            "first_name": getattr(request.user, "first_name", ""),
            "last_name": getattr(request.user, "last_name", ""),
            **serializer.data,
        }
        return Response(data)


