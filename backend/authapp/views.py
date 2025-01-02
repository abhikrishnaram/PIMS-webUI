from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from rest_framework_simplejwt.views import TokenObtainPairView

from .authentication import set_token_cookies
from controller.models import Group


class UserLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token_data = response.data
        print(response.data)
        access_token = token_data['access']
        refresh_token = token_data['refresh']
        response = Response(status=HTTP_200_OK)
        set_token_cookies(response, access_token, refresh_token)
        response.data = {'message': 'Login successfully'}
        return response


class GroupAPIKeyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        group_id = kwargs.get('group_id')
        try:
            group = Group.objects.get(id=group_id)
            return Response({"api_key": group.api_key}, status=HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({"error": "Group not found"}, status=HTTP_403_FORBIDDEN)
