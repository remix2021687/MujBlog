from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import IsAdminUser

from blog.models import Post
from .serializer import PostListSerializer, PostEditSerializer, PostCreateSerializer, AdminProfileSerializer, \
    AdminProfileListSerializer


class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminProfileSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user.username)


class AdminProfileListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminProfileListSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return self.queryset.filter(is_staff=True)


class PostListAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAdminUser]


class AdminPostCreateViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        raise MethodNotAllowed(request.method)

    def list(self, request, *args, **kwargs):
        raise MethodNotAllowed(request.method)


class AdminEditViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostEditSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed("POST")
