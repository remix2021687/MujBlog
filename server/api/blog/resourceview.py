from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets

from api.blog.serializer import PostSerializer, PostSerializerList
from blog.models import Post


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostSerializerList
        return PostSerializer
