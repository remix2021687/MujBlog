from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import MethodNotAllowed

from blog.models import Post
from .serializer import PostListSerializer, PostDetailSerializer

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