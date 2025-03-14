from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.blog.resourceview import PostViewSet, PostGalleryViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('gallery', PostGalleryViewSet, basename='gallery')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
