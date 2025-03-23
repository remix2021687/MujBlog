from django.urls import path, include
from rest_framework import routers
from .resourceview import PostListAdminViewSet, AdminPostViewSet, AdminProfileViewSet

router = routers.DefaultRouter()
router.register('profile', AdminProfileViewSet, basename='admin_profile')
router.register('posts', PostListAdminViewSet, basename='admin_posts')
router.register('edit', AdminPostViewSet, basename='admin_post_edit')

urlpatterns = [
    path('', include(router.urls)),
]