
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import GroupViewSet, ValveViewSet, TaskViewSet, LogViewSet, ValveControlViewSet

router = DefaultRouter()
router.register(r'groups', GroupViewSet)
router.register(r'valves', ValveViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'logs', LogViewSet)

valve_control = ValveControlViewSet.as_view({
    'get': 'open',  # Map 'GET' requests to the 'open' action
    'get': 'close',  # Map 'GET' requests to the 'close' action
    'get': 'toggle',  # Map 'GET' requests to the 'toggle' action
})

# URL patterns
urlpatterns = [
    path('', include(router.urls)),  # Include all router URLs
    path('valves/<int:pk>/open/', valve_control, name='valve-open'),
    path('valves/<int:pk>/close/', valve_control, name='valve-close'),
    path('valves/<int:pk>/toggle/', valve_control, name='valve-toggle'),
]
