from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
import requests

from .models import Group, Valve, Task, Log
from .serializers import GroupSerializer, ValveSerializer, TaskSerializer, LogSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    @action(detail=True, methods=['get'])
    def valves(self, request, pk=None):
        """
        Custom action to get valves for a specific group
        """
        group = self.get_object()
        valves = Valve.objects.filter(group=group)
        serializer = ValveSerializer(valves, many=True)
        return Response(serializer.data)


class ValveViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Valve.objects.all()
    serializer_class = ValveSerializer


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class LogViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class ValveControlViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=True, methods=['get'])
    def open(self, request, pk=None):
        """
        Custom action to open a valve
        """
        try:
            valve = Valve.objects.get(id=pk)
            valve.set_open()
            return Response({"valve_status": valve.is_open}, status=HTTP_200_OK)
        except Valve.DoesNotExist:
            return Response({"error": "Valve not found"}, status=HTTP_404_NOT_FOUND)


    @action(detail=True, methods=['get'])
    def close(self, request, pk=None):
        """
        Custom action to close a valve
        """
        try:
            valve = Valve.objects.get(id=pk)
            valve.set_close()
            return Response({"valve_status": valve.status}, status=HTTP_200_OK)
        except Valve.DoesNotExist:
            return Response({"error": "Valve not found"}, status=HTTP_404_NOT_FOUND)


    @action(detail=True, methods=['get'])
    def toggle(self, request, pk=None):
        """
        Custom action to toggle a valve
        """
        try:
            valve = Valve.objects.get(id=pk)
            if valve.status == 'on':
                valve.set_close()

                if valve.controller is not None:
                    response = requests.get(valve.controller + '/0')
                    if response.status_code != 200:
                        valve.set_fault()
                        return Response({"error": "Failed to toggle valve"}, status=HTTP_500_INTERNAL_SERVER_ERROR)

                return Response({"valve_status": valve.status}, status=HTTP_200_OK)
            else:
                valve.set_open()
                if valve.controller is not None:
                    response = requests.get(valve.controller + "/1")
                    if response.status_code != 200:
                        valve.set_fault()
                        return Response({"error": "Failed to toggle valve"}, status=HTTP_500_INTERNAL_SERVER_ERROR)
                    
            return Response({"valve_status": valve.status}, status=HTTP_200_OK)
        except Valve.DoesNotExist:
            return Response({"error": "Valve not found"}, status=HTTP_404_NOT_FOUND)