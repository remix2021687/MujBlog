from rest_framework import serializers

from blog.models import Post


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'photo', 'name', 'display_description')


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"