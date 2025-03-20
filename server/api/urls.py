from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.blog.resourceview import PostViewSet, PostGalleryViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('gallery', PostGalleryViewSet, basename='gallery')

urlpatterns = [
    path('admin/', include('api.admin.urls')),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
