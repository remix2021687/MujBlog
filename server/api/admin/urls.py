from django.urls import path, include
from rest_framework import routers
from .resourceview import PostListAdminViewSet, AdminEditViewSet, AdminPostCreateViewSet,  AdminProfileViewSet

router = routers.DefaultRouter()
router.register('profile', AdminProfileViewSet, basename='admin_profile')
router.register('posts', PostListAdminViewSet, basename='admin_posts')
router.register('create', AdminPostCreateViewSet, basename='admin_post_create')
router.register('edit', AdminEditViewSet, basename='admin_post_edit')

urlpatterns = [
    path('', include(router.urls)),
]