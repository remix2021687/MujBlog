from rest_framework import serializers
from django.contrib.auth.models import User

from blog.models import Post


class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class AdminProfileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PostListSerializer(serializers.ModelSerializer):
    author = AdminProfileSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'photo', 'name', 'display_description', 'pin_post', 'text', 'author', 'date_created')


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('photo', 'name', 'display_description', 'pin_post', 'text', 'author')


class PostEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("id", 'photo', 'name', 'display_description', 'pin_post', 'text', 'date_created')
        extra_kwargs = {
            'photo': {'required': False},
        }
