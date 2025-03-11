from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.blog.resourceview import PostViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet, basename='posts')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
