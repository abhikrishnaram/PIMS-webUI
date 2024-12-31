from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Group, Valve, Task, Log
from .serializers import GroupSerializer, ValveSerializer, TaskSerializer, LogSerializer


class GroupViewSet(viewsets.ModelViewSet):
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
    queryset = Valve.objects.all()
    serializer_class = ValveSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
