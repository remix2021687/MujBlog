from rest_framework import serializers
from django.contrib.auth.models import User
from blog.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_name', 'first_name')


class PostPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'photo', 'name')


class PostSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'photo',  'name', 'display_description')


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'name', 'photo', 'text', 'display_description', 'author', 'date_created')
