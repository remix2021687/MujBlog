from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import MethodNotAllowed
from  django.contrib.auth.models import User

from blog.models import Post
from .serializer import PostListSerializer, PostDetailSerializer, AdminProfileSerializer, AdminProfileListSerializer


class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action == 'list':
            return AdminProfileListSerializer
        return AdminProfileSerializer

class PostListAdminViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAdminUser]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed("POST")
