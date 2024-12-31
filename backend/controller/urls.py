
from rest_framework.routers import DefaultRouter
from .views import GroupViewSet, ValveViewSet, TaskViewSet, LogViewSet

router = DefaultRouter()
router.register(r'groups', GroupViewSet)
router.register(r'valves', ValveViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'logs', LogViewSet)

urlpatterns = router.urls