from django.urls import path, include
from rest_framework import routers
from .resourceview import PostListAdminViewSet, PostViewSet, AdminProfileViewSet

router = routers.DefaultRouter()
router.register('profile', AdminProfileViewSet, basename='admin_profile')
router.register('posts', PostListAdminViewSet, basename='admin_posts')
router.register('edit', PostViewSet, basename='admin_post_edit')

urlpatterns = [
    path('', include(router.urls)),
]