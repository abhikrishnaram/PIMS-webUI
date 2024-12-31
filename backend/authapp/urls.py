from django.urls import path
from .views import UserLoginView, GroupAPIKeyView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='api_login'),
    path('group-api-key/', GroupAPIKeyView.as_view(), name='group_api_key'),
]
