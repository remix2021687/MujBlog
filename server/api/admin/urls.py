from django.urls import path, include
from rest_framework import routers
from .resourceview import PostListAdminViewSet, PostViewSet

router = routers.DefaultRouter()
router.register('posts', PostListAdminViewSet, basename='admin_posts')
router.register('edit', PostViewSet, basename='admin_post_edit')

urlpatterns = [
    path('', include(router.urls)),
]