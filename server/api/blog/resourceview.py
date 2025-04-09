from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets

from api.blog.serializer import PostSerializer, PostSerializerList, PostPhotoSerializer
from blog.models import Post


class PostGalleryViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostPhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostPinViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return self.queryset.filter(pin_post=True)


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostSerializerList
        return PostSerializer
